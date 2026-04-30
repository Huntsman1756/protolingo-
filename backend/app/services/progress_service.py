from __future__ import annotations

from datetime import date, timedelta

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.progress import Progress

XP_LESSON_COMPLETE = 20
XP_EXERCISE_CORRECT = 5
XP_EXERCISE_WRONG = 1
XP_FLASHCARD_REVIEW = 2


async def update_daily_progress(
    db: AsyncSession,
    user_id: int,
    *,
    lesson_completed: bool = False,
    exercise_correct: bool | None = None,
    flashcard_reviewed: bool = False,
    skill: str | None = None,
    skill_score: float | None = None,
) -> Progress:
    today = date.today()

    result = await db.execute(
        select(Progress).where(Progress.user_id == user_id, Progress.date == today)
    )
    entry = result.scalar_one_or_none()

    if not entry:
        yesterday = today - timedelta(days=1)
        yest_result = await db.execute(
            select(Progress).where(Progress.user_id == user_id, Progress.date == yesterday)
        )
        yest = yest_result.scalar_one_or_none()
        streak = (yest.streak_day + 1) if yest else 1

        entry = Progress(
            user_id=user_id,
            date=today,
            xp_earned=0,
            lessons_completed=0,
            exercises_correct=0,
            exercises_total=0,
            streak_day=streak,
            skills={},
        )
        db.add(entry)
        await db.flush()

    if lesson_completed:
        entry.lessons_completed += 1
        entry.xp_earned += XP_LESSON_COMPLETE

    if exercise_correct is not None:
        entry.exercises_total += 1
        if exercise_correct:
            entry.exercises_correct += 1
            entry.xp_earned += XP_EXERCISE_CORRECT
        else:
            entry.xp_earned += XP_EXERCISE_WRONG

    if flashcard_reviewed:
        entry.xp_earned += XP_FLASHCARD_REVIEW

    if skill and skill_score is not None:
        skills = dict(entry.skills or {})
        old = skills.get(skill, skill_score)
        skills[skill] = round(old * 0.7 + skill_score * 0.3, 3)
        entry.skills = skills

    await db.commit()
    await db.refresh(entry)
    return entry
