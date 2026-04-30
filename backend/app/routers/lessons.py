from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.deps import get_current_user
from app.models.lesson import Exercise, Lesson
from app.models.user import User
from app.schemas.lessons import (
    ExerciseAnswerRequest,
    ExerciseAnswerResponse,
    LessonDetailResponse,
    LessonResponse,
)
from app.services.lesson_generator import evaluate_free_write, generate_lesson
from app.services.llm_adapter import (
    LLMError,
    LLMTimeoutError,
    LLMUnavailableError,
)

router = APIRouter(prefix="/api/lessons", tags=["lessons"])


@router.get("/{lesson_id}", response_model=LessonDetailResponse)
async def get_lesson(
    lesson_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    lesson = await db.get(Lesson, lesson_id)
    if not lesson:
        raise HTTPException(status_code=404, detail="Lesson not found")

    result = await db.execute(
        select(Exercise).where(Exercise.lesson_id == lesson_id).order_by(Exercise.id)
    )
    exercises = result.scalars().all()

    return LessonDetailResponse(lesson=lesson, exercises=exercises)


@router.post("/{lesson_id}/start", response_model=LessonResponse)
async def start_lesson(
    lesson_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    lesson = await db.get(Lesson, lesson_id)
    if not lesson:
        raise HTTPException(status_code=404, detail="Lesson not found")
    return lesson


@router.post("/{lesson_id}/complete", response_model=LessonResponse)
async def complete_lesson(
    lesson_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    lesson = await db.get(Lesson, lesson_id)
    if not lesson:
        raise HTTPException(status_code=404, detail="Lesson not found")

    lesson.is_completed = True
    lesson.completed_at = datetime.now(timezone.utc)
    await db.commit()
    await db.refresh(lesson)
    return lesson


@router.post("/exercises/{exercise_id}/answer", response_model=ExerciseAnswerResponse)
async def answer_exercise(
    exercise_id: int,
    data: ExerciseAnswerRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    exercise = await db.get(Exercise, exercise_id)
    if not exercise:
        raise HTTPException(status_code=404, detail="Exercise not found")

    lesson = await db.get(Lesson, exercise.lesson_id)
    if not lesson:
        raise HTTPException(status_code=404, detail="Lesson not found")

    user_answer = data.answer.strip().lower() if data.answer else ""
    correct = exercise.correct_answer.strip().lower()

    if exercise.exercise_type == "free_write":
        prompt = exercise.question
        criteria = ["grammar", "spelling", "coherence"]
        try:
            eval_result = await evaluate_free_write(
                cefr_level=lesson.cefr_level,
                prompt=prompt,
                criteria=criteria,
                answer=data.answer,
            )
            sco = eval_result.score if hasattr(eval_result, "score") else eval_result["score"]
            fb = eval_result.feedback if hasattr(eval_result, "feedback") else eval_result["feedback"]
            exercise.score = sco
            exercise.feedback = fb
        except (LLMTimeoutError, LLMUnavailableError, LLMError):
            exercise.score = 0.5
            exercise.feedback = "Could not evaluate free-write answer at this time."
    else:
        is_correct = user_answer == correct
        exercise.score = 1.0 if is_correct else 0.0
        exercise.feedback = "Correct!" if is_correct else f"The correct answer is: {exercise.correct_answer}"

    exercise.user_answer = data.answer
    exercise.answered_at = datetime.now(timezone.utc)
    await db.commit()
    await db.refresh(exercise)

    return ExerciseAnswerResponse(
        id=exercise.id,
        score=exercise.score,
        feedback=exercise.feedback,
        correct_answer=exercise.correct_answer,
    )
