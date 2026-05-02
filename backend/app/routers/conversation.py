from __future__ import annotations

import asyncio

from fastapi import APIRouter, Query, WebSocket, WebSocketDisconnect
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
    token: str = Query(...),
) -> None:
    # --- Auth ---
    try:
        payload = decode_access_token(token)
        user_id = int(payload["sub"])
    except (PyJWTError, KeyError, ValueError):
        await websocket.close(code=1008)   # Policy violation
        return

    async with AsyncSessionLocal() as db:
        user = await db.get(User, user_id)
        if not user or not user.is_active:
            await websocket.close(code=1008)
            return

        # --- Guard: TTS and STT must be enabled ---
        tts_service = getattr(websocket.app.state, "tts_service", None)
        stt_service = getattr(websocket.app.state, "stt_service", None)
        if tts_service is None or stt_service is None:
            await websocket.accept()
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

    await websocket.accept()

    pipeline = ConversationPipeline(
        llm=llm_adapter,
        tts=tts_service,
        stt=stt_service,
        cefr_level=cefr_level,
        max_duration=user.conversation_max_duration,
        inactivity_timeout=user.conversation_inactivity_timeout,
    )

    try:
        await pipeline.run(websocket)
    except WebSocketDisconnect:
        await pipeline.cleanup()
    except asyncio.CancelledError:
        await pipeline.cleanup()
