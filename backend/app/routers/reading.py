from __future__ import annotations

import asyncio
import logging
from typing import Any

from fastapi import APIRouter, BackgroundTasks, Depends, HTTPException, Request, status
from redis.asyncio import Redis
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.deps import get_active_study_plan, get_redis, require_subscription
from app.core.limiter import limiter
from app.models.study_plan import StudyPlan
from app.models.user import User
from app.schemas.reading import (
    CorrectAnswerOut,
    QuestionOut,
    ReadingAttemptOut,
    ReadingExerciseOut,
    ReadingGeneratingResponse,
    ReadingHistoryResponse,
    ReadingNextResponse,
    ReadingSubmitRequest,
    ReadingSubmitResponse,
)
from app.services.reading_service import (
    generate_and_save_exercise,
    get_available_exercise,
    get_user_history,
    submit_attempt,
)
from app.services.weak_review_service import create_or_update_weak_item
from app.utils.db import db_session
from app.utils.redis import redis_client as _redis_client

router = APIRouter(prefix="/api/reading", tags=["reading"])
logger = logging.getLogger(__name__)


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------


def _question_index(raw: dict[str, Any], fallback_index: int) -> int:
    try:
        return int(raw.get("index", fallback_index))
    except (TypeError, ValueError):
        return fallback_index


def _build_question_out(raw: dict[str, Any], fallback_index: int) -> QuestionOut:
    raw_options = raw.get("options", {})
    if isinstance(raw_options, dict):
        options = {str(k): str(v) for k, v in raw_options.items()}
    elif isinstance(raw_options, list):
        labels = ("A", "B", "C", "D")
        options = {label: str(value) for label, value in zip(labels, raw_options)}
    else:
        options = {}

    return QuestionOut(
        index=_question_index(raw, fallback_index),
        question=str(raw.get("question", f"Question {fallback_index + 1}")),
        options=options,
    )


def _build_exercise_out(exercise) -> ReadingExerciseOut:  # noqa: ANN001
    """Convert ORM model to schema — text IS included for reading."""
    raw_questions = exercise.questions
    if isinstance(raw_questions, dict):
        raw_questions = raw_questions.get("questions", [])
    if not isinstance(raw_questions, list):
        raw_questions = []

    return ReadingExerciseOut(
        id=exercise.id,
        level=str(exercise.level),
        target_language=str(exercise.target_language),
        exercise_type=str(exercise.exercise_type),
        topic=str(exercise.topic),
        text=str(exercise.text or ""),
        questions=[
            _build_question_out(q, index)
            for index, q in enumerate(raw_questions)
            if isinstance(q, dict)
        ],
    )


def _question_dicts(raw_questions: Any) -> list[dict[str, Any]]:
    if isinstance(raw_questions, dict):
        raw_questions = raw_questions.get("questions", [])
    if not isinstance(raw_questions, list):
        return []
    return [q for q in raw_questions if isinstance(q, dict)]


# ---------------------------------------------------------------------------
# Background task for exercise generation (no TTS)
# ---------------------------------------------------------------------------


async def _background_generate(
    level: str,
    target_language: str,
    lock_key: str,
) -> None:
    """
    Runs after the HTTP response is sent.
    Creates its own DB session and Redis client (request resources are already closed).
    Releases the Redis lock in all cases (success or failure).
    """
    async with _redis_client() as redis_conn:
        try:
            async with db_session() as db:
                await generate_and_save_exercise(level, target_language, db)
        except Exception:
            logger.exception("reading: generation failed level=%s lang=%s", level, target_language)
        finally:
            await redis_conn.delete(lock_key)


# ---------------------------------------------------------------------------
# Endpoints
# ---------------------------------------------------------------------------


@router.get("/next", response_model=ReadingNextResponse)
@limiter.limit("10/minute")
async def get_next_exercise(
    request: Request,
    wait: bool = False,
    plan: StudyPlan = Depends(get_active_study_plan),
    current_user: User = Depends(require_subscription),
    db: AsyncSession = Depends(get_db),
    redis: Redis = Depends(get_redis),
) -> ReadingNextResponse:
    """
    Return the next uncompleted reading exercise for the user's CEFR level.

    When ``wait=true`` the endpoint blocks (async) until an exercise becomes
    available or the generation lock disappears (max 90 s).
    """
    level, target_language = plan.cefr_level, plan.target_language
    exercise = await get_available_exercise(level, target_language, current_user.id, db)
    if exercise is not None:
        return ReadingNextResponse(available=True, exercise=_build_exercise_out(exercise))

    if not wait:
        return ReadingNextResponse(available=False)

    # Long-poll: wait up to 90 s for background generation to finish.
    lock_key = f"reading:generating:{level}:{target_language}"
    for _ in range(90):
        await asyncio.sleep(1)
        exercise = await get_available_exercise(level, target_language, current_user.id, db)
        if exercise is not None:
            return ReadingNextResponse(available=True, exercise=_build_exercise_out(exercise))
        if not await redis.exists(lock_key):
            break

    # Final check after lock disappears
    exercise = await get_available_exercise(level, target_language, current_user.id, db)
    if exercise is not None:
        return ReadingNextResponse(available=True, exercise=_build_exercise_out(exercise))

    return ReadingNextResponse(available=False)


@router.post(
    "/generate", response_model=ReadingGeneratingResponse, status_code=status.HTTP_202_ACCEPTED
)
@limiter.limit("5/minute")
async def generate_exercise(
    request: Request,
    background_tasks: BackgroundTasks,
    plan: StudyPlan = Depends(get_active_study_plan),
    current_user: User = Depends(require_subscription),
    db: AsyncSession = Depends(get_db),
    redis: Redis = Depends(get_redis),
) -> ReadingGeneratingResponse:
    """
    Trigger on-demand reading exercise generation.

    Acquires a Redis lock scoped to (level, target_language) with 60 s TTL.
    If the lock is already held, returns 202 immediately.
    Frontend calls GET /next?wait=true once and awaits the long-poll response.
    """
    level, target_language = plan.cefr_level, plan.target_language
    lock_key = f"reading:generating:{level}:{target_language}"

    acquired = await redis.set(lock_key, "1", nx=True, ex=60)
    if not acquired:
        return ReadingGeneratingResponse(status="generating")

    background_tasks.add_task(
        _background_generate,
        level,
        target_language,
        lock_key,
    )
    return ReadingGeneratingResponse(status="generating")


@router.post("/attempt", response_model=ReadingSubmitResponse)
@limiter.limit("20/minute")
async def submit_reading_attempt(
    request: Request,
    body: ReadingSubmitRequest,
    plan: StudyPlan = Depends(get_active_study_plan),
    current_user: User = Depends(require_subscription),
    db: AsyncSession = Depends(get_db),
) -> ReadingSubmitResponse:
    """Submit answers and receive score, XP, and correct answers."""
    try:
        attempt, exercise = await submit_attempt(
            body.exercise_id,
            current_user.id,
            body.answers,
            db,
            is_replay=body.replay,
            study_plan_id=plan.id,
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
    except Exception as exc:
        logger.exception("reading: submit failed")
        raise HTTPException(status_code=500, detail="reading_submit_failed") from exc

    try:
        correct_answers = [
            CorrectAnswerOut(
                index=_question_index(q, index),
                correct=str(q.get("correct", "")),
            )
            for index, q in enumerate(_question_dicts(exercise.questions))
        ]
    except Exception as exc:
        logger.exception("reading: failed to build correct answers")
        raise HTTPException(status_code=500, detail="reading_submit_failed") from exc

    try:
        weak_item_created = False
        for q in _question_dicts(exercise.questions):
            index = str(q.get("index", ""))
            selected = body.answers.get(index, "").upper().strip()
            correct = str(q.get("correct", "")).upper().strip()
            if selected and selected != correct:
                await create_or_update_weak_item(
                    db,
                    current_user.id,
                    plan.id,
                    source_type="reading",
                    prompt=str(q.get("question", f"Question {index}")),
                    correct_answer=str(q.get("correct", "")),
                    language=plan.target_language,
                    user_wrong_answer=selected,
                    context=exercise.text[:500] if exercise.text else None,
                )
                weak_item_created = True
        if weak_item_created:
            await db.commit()
    except Exception:
        await db.rollback()
        logger.exception("reading: failed to save weak review items")

    return ReadingSubmitResponse(
        score=attempt.score,
        xp_earned=attempt.xp_earned,
        correct_answers=correct_answers,
    )


@router.get("/history", response_model=ReadingHistoryResponse)
@limiter.limit("60/minute")
async def get_reading_history(
    request: Request,
    skip: int = 0,
    limit: int = 10,
    plan: StudyPlan = Depends(get_active_study_plan),
    current_user: User = Depends(require_subscription),
    db: AsyncSession = Depends(get_db),
) -> ReadingHistoryResponse:
    """Return paginated list of the user's past reading attempts."""
    limit = min(limit, 50)  # hard cap

    rows, total = await get_user_history(
        current_user.id, db, skip=skip, limit=limit, target_language=plan.target_language
    )
    items = [
        ReadingAttemptOut(
            id=attempt.id,
            score=attempt.score,
            xp_earned=attempt.xp_earned,
            completed_at=attempt.completed_at,
            exercise=_build_exercise_out(exercise),
            answers=attempt.answers,
            correct_answers=[
                CorrectAnswerOut(
                    index=_question_index(q, index),
                    correct=str(q.get("correct", "")),
                )
                for index, q in enumerate(_question_dicts(exercise.questions))
            ],
        )
        for attempt, exercise in rows
    ]
    return ReadingHistoryResponse(items=items, total=total, skip=skip, limit=limit)
