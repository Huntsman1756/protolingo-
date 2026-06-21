from __future__ import annotations

import asyncio
import logging

from fastapi import APIRouter, BackgroundTasks, Depends, HTTPException, Request, status
from redis.asyncio import Redis
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.deps import get_active_study_plan, get_redis, require_subscription
from app.core.limiter import limiter
from app.models.study_plan import StudyPlan
from app.models.user import User
from app.schemas.writing import (
    WritingGeneratingResponse,
    WritingHistoryResponse,
    WritingNextResponse,
    WritingSubmitRequest,
    WritingSubmitResponse,
)
from app.services.weak_review_service import create_or_update_weak_item
from app.services.writing_service import (
    evaluate_and_submit,
    generate_and_save_exercise,
    get_available_exercise,
    get_user_history,
)
from app.utils.db import db_session
from app.utils.redis import redis_client as _redis_client

router = APIRouter(prefix="/api/writing", tags=["writing"])
logger = logging.getLogger(__name__)


# ---------------------------------------------------------------------------
# Background task for exercise generation
# ---------------------------------------------------------------------------


async def _background_generate(
    level: str,
    target_language: str,
    lock_key: str,
) -> None:
    """
    Runs after the HTTP response is sent.
    Creates its own DB session and Redis client.
    Releases the Redis lock in all cases.
    """
    async with _redis_client() as redis_conn:
        try:
            async with db_session() as db:
                await generate_and_save_exercise(level, target_language, db)
        except Exception:
            logger.exception(
                "writing: generation failed level=%s lang=%s", level, target_language
            )
        finally:
            await redis_conn.delete(lock_key)


# ---------------------------------------------------------------------------
# Endpoints
# ---------------------------------------------------------------------------


@router.get("/next", response_model=WritingNextResponse)
@limiter.limit("10/minute")
async def get_next_exercise(
    request: Request,
    wait: bool = False,
    plan: StudyPlan = Depends(get_active_study_plan),
    current_user: User = Depends(require_subscription),
    db: AsyncSession = Depends(get_db),
    redis: Redis = Depends(get_redis),
) -> WritingNextResponse:
    """Return the next uncompleted writing exercise for the user's CEFR level and language."""
    level, target_language = plan.cefr_level, plan.target_language
    exercise = await get_available_exercise(level, target_language, current_user.id, db)
    if exercise is not None:
        return WritingNextResponse(available=True, exercise=exercise)

    if not wait:
        return WritingNextResponse(available=False)

    lock_key = f"writing:generating:{level}:{target_language}"
    for _ in range(90):
        await asyncio.sleep(1)
        exercise = await get_available_exercise(level, target_language, current_user.id, db)
        if exercise is not None:
            return WritingNextResponse(available=True, exercise=exercise)
        if not await redis.exists(lock_key):
            break

    exercise = await get_available_exercise(level, target_language, current_user.id, db)
    if exercise is not None:
        return WritingNextResponse(available=True, exercise=exercise)

    return WritingNextResponse(available=False)


@router.post(
    "/generate", response_model=WritingGeneratingResponse, status_code=status.HTTP_202_ACCEPTED
)
@limiter.limit("5/minute")
async def generate_exercise(
    request: Request,
    background_tasks: BackgroundTasks,
    plan: StudyPlan = Depends(get_active_study_plan),
    current_user: User = Depends(require_subscription),
    db: AsyncSession = Depends(get_db),
    redis: Redis = Depends(get_redis),
) -> WritingGeneratingResponse:
    """Trigger on-demand writing exercise generation."""
    level, target_language = plan.cefr_level, plan.target_language
    lock_key = f"writing:generating:{level}:{target_language}"

    acquired = await redis.set(lock_key, "1", nx=True, ex=60)
    if not acquired:
        return WritingGeneratingResponse(status="generating")

    background_tasks.add_task(
        _background_generate,
        level,
        target_language,
        lock_key,
    )
    return WritingGeneratingResponse(status="generating")


@router.post("/attempt", response_model=WritingSubmitResponse)
@limiter.limit("20/minute")
async def submit_writing_attempt(
    request: Request,
    body: WritingSubmitRequest,
    plan: StudyPlan = Depends(get_active_study_plan),
    current_user: User = Depends(require_subscription),
    db: AsyncSession = Depends(get_db),
) -> WritingSubmitResponse:
    """Submit writing and receive LLM evaluation with feedback."""
    native_language = "Spanish"
    try:
        attempt, exercise = await evaluate_and_submit(
            body.exercise_id,
            current_user.id,
            body.student_text,
            db,
            study_plan_id=plan.id,
            native_language=native_language,
            is_replay=body.replay,
        )
    except ValueError as exc:
        detail = str(exc)
        if detail == "exercise_not_found":
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="exercise_not_found"
            ) from exc
        if detail == "already_attempted":
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT, detail="already_attempted"
            ) from exc
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=detail) from exc

    if attempt.score < 3:
        await create_or_update_weak_item(
            db,
            current_user.id,
            plan.id,
            source_type="writing",
            prompt=exercise.prompt if hasattr(exercise, 'prompt') else "Writing exercise",
            correct_answer="",
            language=plan.target_language,
            user_wrong_answer=body.student_text,
            context=attempt.feedback,
        )

    return WritingSubmitResponse(
        score=attempt.score,
        xp_earned=attempt.xp_earned,
        feedback=attempt.feedback,
    )


@router.get("/history", response_model=WritingHistoryResponse)
@limiter.limit("60/minute")
async def get_writing_history(
    request: Request,
    skip: int = 0,
    limit: int = 10,
    plan: StudyPlan = Depends(get_active_study_plan),
    current_user: User = Depends(require_subscription),
    db: AsyncSession = Depends(get_db),
) -> WritingHistoryResponse:
    """Return paginated list of the user's past writing attempts."""
    limit = min(limit, 50)

    rows, total = await get_user_history(
        current_user.id, db, skip=skip, limit=limit, target_language=plan.target_language
    )
    return WritingHistoryResponse(
        items=[
            {
                "id": attempt.id,
                "score": attempt.score,
                "xp_earned": attempt.xp_earned,
                "completed_at": attempt.completed_at,
                "exercise": exercise,
                "student_text": attempt.student_text,
                "feedback": attempt.feedback,
            }
            for attempt, exercise in rows
        ],
        total=total,
        skip=skip,
        limit=limit,
    )
