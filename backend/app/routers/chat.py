import json
import logging
from datetime import date, datetime, timezone

from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import StreamingResponse
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.deps import get_current_user
from app.models.chat_history import ChatHistory
from app.models.conversation import Conversation
from app.models.llm_usage import LLMUsage
from app.models.progress import Progress
from app.models.study_plan import StudyPlan
from app.models.user import User
from app.schemas.chat import (
    ChatHistoryResponse,
    ChatRequest,
    ConversationCreate,
    ConversationResponse,
)
from app.services.language_helpers import get_english_variant
from app.services.llm_adapter import (
    LLMError,
    LLMStream,
    LLMTimeoutError,
    LLMUnavailableError,
    llm_adapter,
)

router = APIRouter(prefix="/api/chat", tags=["chat"])

logger = logging.getLogger(__name__)

TUTOR_SYSTEM_PROMPT = """
You are an encouraging and patient English language tutor named FreeLingo.
You are talking with {student_name}.
Your student is at {cefr_level} level.
Their native language is {native_language}.
Use {english_variant} English spelling and vocabulary consistently.

Student progress:
- Total XP earned: {total_xp}
- Current streak: {streak} days
- Lessons completed today: {lessons_today}
- Skills: {skills}
{user_context}
Guidelines:
- Adapt your vocabulary and complexity to the student's level
- When the student makes a grammar mistake, gently correct it
- You may briefly explain corrections in {native_language} if it helps clarity,
  but always keep the main conversation in English
- Keep responses concise (2–4 sentences unless explaining grammar)
- NEVER use emojis, emoticons, or any Unicode pictographic symbols in your responses.
  They are strictly forbidden because responses may be read aloud by a text-to-speech
  engine and emoticons produce unnatural noise (e.g. "face with tears of joy").
  Plain text only.
- CONTENT POLICY (mandatory, no exceptions): Never produce, discuss, or engage with
  sexual, violent, hateful, or otherwise inappropriate content. If the student requests
  or introduces such topics, politely decline and redirect: suggest a language-learning
  topic you can help with instead. Do not explain the restriction in detail; simply
  steer the conversation back to English learning.
"""

MAX_HISTORY = 30


# ── Conversations ────────────────────────────────────────────────────────────

@router.get("/conversations", response_model=list[ConversationResponse])
async def list_conversations(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(Conversation)
        .where(Conversation.user_id == current_user.id)
        .order_by(Conversation.updated_at.desc())
    )
    return result.scalars().all()


@router.post("/conversations", response_model=ConversationResponse)
async def create_conversation(
    data: ConversationCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    conv = Conversation(
        user_id=current_user.id,
        title=data.title or "New conversation",
    )
    db.add(conv)
    await db.commit()
    await db.refresh(conv)
    return conv


@router.delete("/conversations/{conversation_id}", status_code=204)
async def delete_conversation(
    conversation_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    conv = await db.get(Conversation, conversation_id)
    if not conv or conv.user_id != current_user.id:
        raise HTTPException(status_code=404, detail="Conversation not found")
    await db.delete(conv)
    await db.commit()


@router.get("/conversations/{conversation_id}/messages", response_model=ChatHistoryResponse)
async def get_conversation_messages(
    conversation_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    conv = await db.get(Conversation, conversation_id)
    if not conv or conv.user_id != current_user.id:
        raise HTTPException(status_code=404, detail="Conversation not found")
    result = await db.execute(
        select(ChatHistory)
        .where(
            ChatHistory.conversation_id == conversation_id,
            ChatHistory.user_id == current_user.id,
        )
        .order_by(ChatHistory.created_at.asc())
        .limit(MAX_HISTORY)
    )
    messages = [{"role": m.role, "content": m.content} for m in result.scalars().all()]
    return ChatHistoryResponse(messages=messages)


# ── Chat (streaming) ─────────────────────────────────────────────────────────

@router.post("")
async def chat(
    request: ChatRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    # ── Monthly token quota check ────────────────────────────────────────────
    if current_user.monthly_tokens_limit > 0:
        from app.services.quota_service import check_monthly_tokens  # noqa: PLC0415
        allowed, tokens_used, token_limit = await check_monthly_tokens(
            db, current_user.id, current_user.monthly_tokens_limit
        )
        if not allowed:
            raise HTTPException(
                status_code=429,
                detail=f"Monthly token limit reached ({tokens_used}/{token_limit} tokens). Chat is unavailable until next month.",
            )

    # Resolve or create conversation
    if request.conversation_id:
        conv = await db.get(Conversation, request.conversation_id)
        if not conv or conv.user_id != current_user.id:
            raise HTTPException(status_code=404, detail="Conversation not found")
    else:
        # Auto-create a conversation titled with the first 60 chars of the message
        title = request.message[:60].strip()
        if len(request.message) > 60:
            title += "…"
        conv = Conversation(user_id=current_user.id, title=title)
        db.add(conv)
        await db.commit()
        await db.refresh(conv)

    conversation_id = conv.id

    cefr_level = "B1"
    result = await db.execute(
        select(StudyPlan)
        .where(StudyPlan.user_id == current_user.id, StudyPlan.is_active.is_(True))
        .order_by(StudyPlan.created_at.desc())
        .limit(1)
    )
    plan = result.scalar_one_or_none()
    if plan:
        cefr_level = plan.cefr_level

    prog_result = await db.execute(
        select(Progress).where(
            Progress.user_id == current_user.id,
            Progress.date == date.today(),
        )
    )
    prog = prog_result.scalar_one_or_none()
    total_xp_result = await db.execute(
        select(Progress).where(Progress.user_id == current_user.id)
    )
    total_xp = sum(p.xp_earned for p in total_xp_result.scalars().all())
    skills_str = ", ".join(
        f"{k}: {round(v * 100)}%" for k, v in (prog.skills or {}).items()
    ) if prog and prog.skills else "none yet"

    # Build user context section from bio and learning goals
    _ctx_parts: list[str] = []
    if current_user.learning_goals:
        try:
            import json as _json  # noqa: PLC0415
            goals = _json.loads(current_user.learning_goals)
            if goals:
                _ctx_parts.append(f"Learning goals: {', '.join(goals)}")
        except (ValueError, TypeError):
            pass
    if current_user.bio and current_user.bio.strip():
        _ctx_parts.append(f"About the student: {current_user.bio.strip()}")
    user_context = ("\nStudent context:\n" + "\n".join(f"- {p}" for p in _ctx_parts) + "\n") if _ctx_parts else ""

    system_prompt = TUTOR_SYSTEM_PROMPT.format(
        student_name=current_user.display_name,
        cefr_level=cefr_level,
        native_language=current_user.native_language,
        english_variant=get_english_variant(current_user.target_language),
        total_xp=total_xp,
        streak=prog.streak_day if prog else 0,
        lessons_today=prog.lessons_completed if prog else 0,
        skills=skills_str,
        user_context=user_context,
    )

    db.add(
        ChatHistory(
            user_id=current_user.id,
            conversation_id=conversation_id,
            role="user",
            content=request.message,
        )
    )
    await db.commit()

    result = await db.execute(
        select(ChatHistory)
        .where(
            ChatHistory.user_id == current_user.id,
            ChatHistory.conversation_id == conversation_id,
        )
        .order_by(ChatHistory.created_at.desc())
        .limit(MAX_HISTORY)
    )
    db_messages = list(result.scalars().all())
    db_messages.reverse()

    messages = [{"role": "system", "content": system_prompt}] + [
        {"role": m.role, "content": m.content} for m in db_messages
    ]

    async def event_stream():
        full_response = ""
        try:
            # Send conversation_id first so frontend can associate the new conv
            yield f"data: {json.dumps({'conversation_id': conversation_id})}\n\n"
            stream = await llm_adapter.chat(messages, stream=True)
            async for chunk in stream:
                if chunk.choices[0].delta.content:
                    token = chunk.choices[0].delta.content
                    full_response += token
                    yield f"data: {json.dumps({'token': token})}\n\n"
            db.add(
                ChatHistory(
                    user_id=current_user.id,
                    conversation_id=conversation_id,
                    role="assistant",
                    content=full_response,
                )
            )
            # Update conversation updated_at and commit chat history first.
            # This is intentionally done before the token usage save so that
            # a failure in LLMUsage never prevents the chat message being stored.
            conv.updated_at = datetime.now(timezone.utc).replace(tzinfo=None)
            await db.commit()
            yield f"data: {json.dumps({'done': True})}\n\n"
            # Persist token usage best-effort in a separate transaction so that
            # any failure (table missing, FK issue, etc.) is fully isolated.
            if isinstance(stream, LLMStream) and (
                stream.prompt_tokens is not None or stream.completion_tokens is not None
            ):
                try:
                    db.add(
                        LLMUsage(
                            user_id=current_user.id,
                            source="chat",
                            prompt_tokens=stream.prompt_tokens,
                            completion_tokens=stream.completion_tokens,
                            total_tokens=stream.total_tokens,
                        )
                    )
                    await db.commit()
                except Exception:
                    await db.rollback()
                    logger.debug("Failed to save LLM usage — ignored")
        except LLMTimeoutError:
            logger.warning("LLM timeout for user %s conversation %s", current_user.id, conversation_id)
            yield f"data: {json.dumps({'error': 'The AI model took too long. Please try again.'})}\n\n"
        except LLMUnavailableError:
            logger.error("LLM unavailable for user %s", current_user.id)
            yield f"data: {json.dumps({'error': 'The AI service is currently unavailable.'})}\n\n"
        except LLMError:
            logger.exception("LLM error for user %s conversation %s", current_user.id, conversation_id)
            yield f"data: {json.dumps({'error': 'Something went wrong. Please try again.'})}\n\n"

    return StreamingResponse(
        event_stream(),
        media_type="text/event-stream",
        headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"},
    )


# ── Legacy history endpoint (kept for backwards compat) ──────────────────────

@router.get("/history", response_model=ChatHistoryResponse)
async def get_history(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(ChatHistory)
        .where(ChatHistory.user_id == current_user.id)
        .order_by(ChatHistory.created_at.asc())
        .limit(MAX_HISTORY)
    )
    messages = [
        {"role": m.role, "content": m.content} for m in result.scalars().all()
    ]
    return ChatHistoryResponse(messages=messages)

