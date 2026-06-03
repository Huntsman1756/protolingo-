from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import delete, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.deps import require_subscription
from app.models.progress import Progress
from app.models.study_plan import StudyPlan
from app.models.user import User
from app.schemas.language import (
    LanguageAddRequest,
    LanguagePlanInfo,
    LanguageProgressInfo,
    LanguageSwitchRequest,
    UserLanguageListResponse,
    UserLanguageOut,
)
from app.services.user_language_service import (
    add_language,
    get_active_language,
    get_user_languages,
    remove_language,
    switch_language,
)

router = APIRouter(prefix="/api/languages", tags=["languages"])


async def _build_plan_info(
    db: AsyncSession, user_id: int, target_language: str
) -> LanguagePlanInfo | None:
    result = await db.execute(
        select(StudyPlan)
        .where(
            StudyPlan.user_id == user_id,
            StudyPlan.target_language == target_language,
            StudyPlan.is_active.is_(True),
        )
        .order_by(StudyPlan.created_at.desc())
        .limit(1)
    )
    plan = result.scalar_one_or_none()
    if not plan:
        return None

    total_days = plan.duration_weeks * plan.days_per_week
    completion_pct = round((plan.progress_day / total_days) * 100, 1) if total_days > 0 else 0.0

    return LanguagePlanInfo(
        id=plan.id,
        cefr_level=plan.cefr_level,
        progress_day=plan.progress_day,
        total_days=total_days,
        completion_pct=completion_pct,
    )


async def _build_progress_info(
    db: AsyncSession, user_id: int, target_language: str
) -> LanguageProgressInfo | None:
    # Find the active plan for this language to filter progress
    plan_res = await db.execute(
        select(StudyPlan.id).where(
            StudyPlan.user_id == user_id,
            StudyPlan.target_language == target_language,
            StudyPlan.is_active.is_(True),
        )
    )
    plan_row = plan_res.first()
    if not plan_row:
        return None

    plan_id = plan_row[0]

    entries_res = await db.execute(
        select(Progress).where(Progress.study_plan_id == plan_id).order_by(Progress.date.desc())
    )
    entries = entries_res.scalars().all()

    total_xp = sum(e.xp_earned for e in entries)
    current_streak = entries[0].streak_day if entries else 0
    lessons_completed = sum(e.lessons_completed for e in entries)

    return LanguageProgressInfo(
        total_xp=total_xp,
        current_streak=current_streak,
        lessons_completed=lessons_completed,
    )


@router.get("", response_model=UserLanguageListResponse)
async def list_languages(
    current_user: User = Depends(require_subscription),
    db: AsyncSession = Depends(get_db),
):
    from app.schemas.auth import get_available_languages

    rows = await get_user_languages(db, current_user.id)

    languages: list[UserLanguageOut] = []
    for lang in rows:
        plan = await _build_plan_info(db, current_user.id, lang.target_language)
        progress = (
            await _build_progress_info(db, current_user.id, lang.target_language) if plan else None
        )
        languages.append(
            UserLanguageOut(
                target_language=lang.target_language,
                is_active=lang.is_active,
                plan=plan,
                progress=progress,
            )
        )

    return UserLanguageListResponse(
        languages=languages,
        all_supported_languages=get_available_languages(),
    )


@router.get("/active")
async def get_active(
    current_user: User = Depends(require_subscription),
    db: AsyncSession = Depends(get_db),
):
    active = await get_active_language(db, current_user.id)
    if not active:
        raise HTTPException(status_code=404, detail="No active language set")
    return {"target_language": active.target_language, "is_active": active.is_active}


@router.post("", status_code=status.HTTP_201_CREATED)
async def add_new_language(
    data: LanguageAddRequest,
    current_user: User = Depends(require_subscription),
    db: AsyncSession = Depends(get_db),
):
    entry = await add_language(db, current_user.id, data.target_language)
    return {"target_language": entry.target_language, "is_active": entry.is_active}


@router.put("/active")
async def switch_active_language(
    data: LanguageSwitchRequest,
    current_user: User = Depends(require_subscription),
    db: AsyncSession = Depends(get_db),
):
    entry = await switch_language(db, current_user.id, data.target_language)
    # Also update the user's target_language field for backward compatibility
    current_user.target_language = data.target_language
    await db.commit()
    return {"target_language": entry.target_language, "is_active": entry.is_active}


@router.delete("/{target_language}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_language(
    target_language: str,
    current_user: User = Depends(require_subscription),
    db: AsyncSession = Depends(get_db),
):
    # Delete all study plans for this language first (cascade handles progress etc.)
    await db.execute(
        delete(StudyPlan).where(
            StudyPlan.user_id == current_user.id,
            StudyPlan.target_language == target_language,
        )
    )
    await db.flush()

    await remove_language(db, current_user.id, target_language)
