import json

from fastapi import APIRouter, Depends
from fastapi.responses import StreamingResponse
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.deps import get_current_user
from app.models.chat_history import ChatHistory
from app.models.study_plan import StudyPlan
from app.models.user import User
from app.schemas.chat import ChatHistoryResponse, ChatRequest
from app.services.llm_adapter import (
    LLMError,
    LLMTimeoutError,
    LLMUnavailableError,
    llm_adapter,
)

router = APIRouter(prefix="/api/chat", tags=["chat"])

TUTOR_SYSTEM_PROMPT = """
You are an encouraging and patient English language tutor named FreeLingo.
Your student is at {cefr_level} level.
Their native language is {native_language}.

Guidelines:
- Adapt your vocabulary and complexity to the student's level
- When the student makes a grammar mistake, gently correct it
- You may briefly explain corrections in {native_language} if it helps clarity,
  but always keep the main conversation in English
- Keep responses concise (2–4 sentences unless explaining grammar)
"""

MAX_HISTORY = 30


@router.post("")
async def chat(
    request: ChatRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
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

    system_prompt = TUTOR_SYSTEM_PROMPT.format(
        cefr_level=cefr_level,
        native_language=current_user.native_language,
    )

    db.add(ChatHistory(user_id=current_user.id, role="user", content=request.message))
    await db.commit()

    result = await db.execute(
        select(ChatHistory)
        .where(ChatHistory.user_id == current_user.id)
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
            stream = await llm_adapter.chat(messages, stream=True)
            async for chunk in stream:
                if chunk.choices[0].delta.content:
                    token = chunk.choices[0].delta.content
                    full_response += token
                    yield f"data: {json.dumps({'token': token})}\n\n"
            db.add(
                ChatHistory(
                    user_id=current_user.id, role="assistant", content=full_response
                )
            )
            await db.commit()
            yield f"data: {json.dumps({'done': True})}\n\n"
        except LLMTimeoutError:
            yield f"data: {json.dumps({'error': 'The AI model took too long. Please try again.'})}\n\n"
        except LLMUnavailableError:
            yield f"data: {json.dumps({'error': 'The AI service is currently unavailable.'})}\n\n"
        except LLMError:
            yield f"data: {json.dumps({'error': 'Something went wrong. Please try again.'})}\n\n"

    return StreamingResponse(
        event_stream(),
        media_type="text/event-stream",
        headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"},
    )


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
