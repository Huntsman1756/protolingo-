from __future__ import annotations

import asyncio
import logging

from fastapi import APIRouter, WebSocket, WebSocketDisconnect

logger = logging.getLogger(__name__)
from jwt.exceptions import PyJWTError
from sqlalchemy import select

from app.core.database import AsyncSessionLocal
from app.core.security import decode_access_token
from app.models.study_plan import StudyPlan
from app.models.user import User
from app.services.conversation_pipeline import ConversationPipeline
from app.services.llm_adapter import llm_adapter

router = APIRouter(tags=["conversation"])


@router.websocket("/ws/conversation")
async def conversation_ws(
    websocket: WebSocket,
) -> None:
    # --- Accept first, then authenticate via first JSON message ---
    await websocket.accept()

    initial_context_raw: list | None = None
    try:
        auth_msg = await asyncio.wait_for(websocket.receive_json(), timeout=10.0)
        token = auth_msg.get("token", "")
        initial_context_raw = auth_msg.get("context")  # optional chat history
        payload = decode_access_token(token)
        user_id = int(payload["sub"])
    except (asyncio.TimeoutError, PyJWTError, KeyError, ValueError, Exception):
        logger.warning("[conversation] Auth failed — closing WS 1008")
        await websocket.send_json({"type": "error", "code": "auth_failed", "message": "Authentication failed"})
        await websocket.close(code=1008)
        return

    async with AsyncSessionLocal() as db:
        user = await db.get(User, user_id)
        if not user or not user.is_active:
            logger.warning("[conversation] User %s not found or inactive — closing WS 1008", user_id)
            await websocket.close(code=1008)
            return

        # --- Guard: TTS and STT must be enabled ---
        tts_service = getattr(websocket.app.state, "tts_service", None)
        stt_service = getattr(websocket.app.state, "stt_service", None)
        if tts_service is None or stt_service is None:
            logger.warning("[conversation] TTS or STT disabled — rejecting WS for user %s", user_id)
            await websocket.send_json({
                "type": "error",
                "code": "services_disabled",
                "message": "TTS and STT must be enabled for conversation mode.",
            })
            await websocket.close(code=1011)
            return

        # --- CEFR level from active StudyPlan, fallback B1 ---
        result = await db.execute(
            select(StudyPlan)
            .where(StudyPlan.user_id == user_id, StudyPlan.is_active == True)  # noqa: E712
            .order_by(StudyPlan.created_at.desc())
            .limit(1)
        )
        plan = result.scalar_one_or_none()
        cefr_level = plan.cefr_level if plan else "B1"

        # Read user settings before session closes to avoid DetachedInstanceError
        max_duration = user.conversation_max_duration
        inactivity_timeout = user.conversation_inactivity_timeout
        native_language = user.native_language
        target_language = user.target_language

    # Validate and sanitize optional chat context passed from the tutor chat
    valid_context: list[dict] | None = None
    if isinstance(initial_context_raw, list):
        sanitized = [
            {"role": m["role"], "content": m["content"]}
            for m in initial_context_raw[:20]
            if isinstance(m, dict)
            and m.get("role") in ("user", "assistant")
            and isinstance(m.get("content"), str)
            and m["content"].strip()
        ]
        if sanitized:
            valid_context = sanitized

    logger.info("[conversation] Session started — user=%s cefr=%s max_duration=%ss inactivity=%ss context_turns=%s",
                user_id, cefr_level, max_duration, inactivity_timeout, len(valid_context) if valid_context else 0)
    # (already accepted at the top)

    pipeline = ConversationPipeline(
        llm=llm_adapter,
        tts=tts_service,
        stt=stt_service,
        cefr_level=cefr_level,
        native_language=native_language,
        target_language=target_language,
        max_duration=max_duration,
        inactivity_timeout=inactivity_timeout,
        initial_context=valid_context,
    )

    try:
        await pipeline.run(websocket)
    except WebSocketDisconnect:
        logger.info("[conversation] WebSocketDisconnect — user=%s", user_id)
        await pipeline.cleanup()
    except asyncio.CancelledError:
        logger.info("[conversation] CancelledError — user=%s", user_id)
        await pipeline.cleanup()
    finally:
        logger.info("[conversation] Session ended — user=%s", user_id)
