from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.deps import get_current_user
from app.core.limiter import limiter
from app.models.study_plan import StudyPlan
from app.models.user import User
from app.models.weak_review import WeakReviewItem
from app.schemas.weak_review import (
    WeakReviewListResponse,
    WeakReviewResponse,
    WeakReviewReviewRequest,
    WeakReviewReviewResponse,
    WeakReviewStatsResponse,
)
from app.services.weak_review_service import (
    get_due_items,
    get_weak_review_stats,
    review_weak_item,
)

router = APIRouter(prefix="/api/weak-review", tags=["weak_review"])


async def _get_active_plan(db: AsyncSession, user_id: int) -> StudyPlan | None:
    from sqlalchemy import select  # noqa: PLC0415

    from app.models.user_language import UserLanguage  # noqa: PLC0415

    result = await db.execute(
        select(StudyPlan).join(
            UserLanguage, StudyPlan.user_language_id == UserLanguage.id
        ).where(
            UserLanguage.user_id == user_id,
            StudyPlan.is_active.is_(True),
        )
    )
    return result.scalar_one_or_none()


@router.get("/due", response_model=WeakReviewListResponse)
@limiter.limit("60/minute")
async def get_due_weak_reviews(
    request: Request,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    plan = await _get_active_plan(db, current_user.id)
    if not plan:
        return WeakReviewListResponse(
            due=[],
            total=0,
            stats={"total": 0, "due": 0, "breakdown": {}},
        )
    items = await get_due_items(db, current_user.id, plan.id)

    stats = await get_weak_review_stats(db, current_user.id, plan.id)
    return WeakReviewListResponse(
        due=[WeakReviewResponse.model_validate(i) for i in items],
        total=len(items),
        stats=stats,
    )


@router.get("/stats", response_model=WeakReviewStatsResponse)
@limiter.limit("60/minute")
async def get_weak_review_stats_endpoint(
    request: Request,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    plan = await _get_active_plan(db, current_user.id)
    if not plan:
        return WeakReviewStatsResponse(total=0, due=0, breakdown={})
    stats = await get_weak_review_stats(db, current_user.id, plan.id)
    return WeakReviewStatsResponse(**stats)


@router.post("/{item_id}/review", response_model=WeakReviewReviewResponse)
@limiter.limit("60/minute")
async def review_weak_item_endpoint(
    request: Request,
    item_id: int,
    data: WeakReviewReviewRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    plan = await _get_active_plan(db, current_user.id)
    if not plan:
        raise HTTPException(status_code=404, detail="No active study plan found")
    item = await db.get(WeakReviewItem, item_id)
    if not item or item.user_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Item not found")

    item = await review_weak_item(
        db, current_user.id, item_id, data.quality, study_plan_id=plan.id
    )
    return WeakReviewReviewResponse(
        item=WeakReviewResponse.model_validate(item),
        quality=data.quality,
    )
