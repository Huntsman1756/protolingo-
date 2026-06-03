from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.deps import get_current_user
from app.models.progress import Progress
from app.models.study_plan import StudyPlan
from app.models.user import User
from app.schemas.progress import ProgressHistoryResponse, ProgressSummary
from app.services.progress_service import get_unit_competencies
from app.services.user_language_service import get_active_language

router = APIRouter(prefix="/api/progress", tags=["progress"])


async def _get_active_plan_or_none(db: AsyncSession, user_id: int) -> StudyPlan | None:
    """Return the active study plan for the user's active language, or None if not set up yet."""
    active_lang = await get_active_language(db, user_id)
    if not active_lang:
        return None
    from sqlalchemy import select

    result = await db.execute(
        select(StudyPlan).where(
            StudyPlan.user_id == user_id,
            StudyPlan.is_active.is_(True),
            StudyPlan.target_language == active_lang.target_language,
        )
    )
    return result.scalar_one_or_none()


@router.get("/summary", response_model=ProgressSummary)
async def get_summary(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    plan = await _get_active_plan_or_none(db, current_user.id)
    if plan is None:
        return ProgressSummary(
            total_xp=0,
            current_streak=0,
            total_lessons=0,
            total_exercises=0,
            exercises_correct=0,
            accuracy=0.0,
            skills={},
        )

    result = await db.execute(
        select(Progress).where(Progress.study_plan_id == plan.id).order_by(Progress.date.desc())
    )
    all_entries = result.scalars().all()

    if not all_entries:
        return ProgressSummary(
            total_xp=0,
            current_streak=0,
            total_lessons=0,
            total_exercises=0,
            exercises_correct=0,
            accuracy=0.0,
            skills={},
        )

    total_xp = sum(e.xp_earned for e in all_entries)
    total_lessons = sum(e.lessons_completed for e in all_entries)
    total_exercises = sum(e.exercises_total for e in all_entries)
    exercises_correct = sum(e.exercises_correct for e in all_entries)
    accuracy = exercises_correct / total_exercises if total_exercises > 0 else 0.0

    latest_skills = all_entries[0].skills if all_entries else {}

    return ProgressSummary(
        total_xp=total_xp,
        current_streak=all_entries[0].streak_day,
        total_lessons=total_lessons,
        total_exercises=total_exercises,
        exercises_correct=exercises_correct,
        accuracy=round(accuracy, 2),
        skills=latest_skills,
    )


@router.get("/history", response_model=ProgressHistoryResponse)
async def get_history(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    plan = await _get_active_plan_or_none(db, current_user.id)
    if plan is None:
        return ProgressHistoryResponse(entries=[])

    result = await db.execute(
        select(Progress)
        .where(Progress.study_plan_id == plan.id)
        .order_by(Progress.date.desc())
        .limit(90)
    )
    entries = result.scalars().all()
    return ProgressHistoryResponse(entries=entries)


@router.get("/competencies", response_model=list)
async def get_competencies(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    return await get_unit_competencies(db, current_user.id)
