from __future__ import annotations

from datetime import UTC, datetime, timedelta
from datetime import date as date_type
from typing import Optional

from sqlalchemy import Integer, cast, func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.weak_review import WeakReviewItem
from app.services.progress_service import update_daily_progress

# Loop order for alternation — speaking always last because it's fastest
LOOP_ORDER: list[str] = ["grammar", "reading", "listening", "lesson_exercise", "speaking"]


def sm2_update_weak(item: WeakReviewItem, quality: int) -> WeakReviewItem:
    if quality < 3:
        item.repetitions = 0
        item.interval = 1
        item.consecutive_failures += 1
    else:
        if item.repetitions == 0:
            item.interval = 1
        elif item.repetitions == 1:
            item.interval = 6
        else:
            item.interval = round(item.interval * item.ease_factor)
        item.repetitions += 1
        item.consecutive_failures = 0

    item.ease_factor = max(
        1.3,
        item.ease_factor + 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02),
    )
    item.next_review = date_type.today() + timedelta(days=item.interval)
    item.updated_at = datetime.now(UTC).replace(tzinfo=None)
    return item


async def create_or_update_weak_item(
    db: AsyncSession,
    user_id: int,
    study_plan_id: int,
    source_type: str,
    prompt: str,
    correct_answer: str,
    language: str = "en-GB",
    *,
    source_id: Optional[str] = None,
    user_wrong_answer: Optional[str] = None,
    context: Optional[str] = None,
) -> WeakReviewItem:
    result = await db.execute(
        select(WeakReviewItem).where(
            WeakReviewItem.user_id == user_id,
            WeakReviewItem.study_plan_id == study_plan_id,
            WeakReviewItem.source_type == source_type,
            WeakReviewItem.prompt == prompt,
        )
    )
    item = result.scalar_one_or_none()

    now = datetime.now(UTC).replace(tzinfo=None)

    if item:
        item.consecutive_failures += 1
        item.user_wrong_answer = user_wrong_answer
        item.context = context or item.context
        item.updated_at = now
    else:
        item = WeakReviewItem(
            user_id=user_id,
            study_plan_id=study_plan_id,
            source_type=source_type,
            source_id=source_id,
            prompt=prompt,
            correct_answer=correct_answer,
            user_wrong_answer=user_wrong_answer,
            context=context,
            language=language,
            consecutive_failures=1,
            created_at=now,
            updated_at=now,
        )
        db.add(item)

    await db.flush()
    return item


async def get_due_items(
    db: AsyncSession,
    user_id: int,
    study_plan_id: int,
    limit: int = 20,
) -> list[WeakReviewItem]:
    result = await db.execute(
        select(WeakReviewItem).where(
            WeakReviewItem.user_id == user_id,
            WeakReviewItem.study_plan_id == study_plan_id,
            WeakReviewItem.next_review <= date_type.today(),
        ).order_by(WeakReviewItem.next_review)
    )
    items = result.scalars().all()

    grouped: dict[str, list[WeakReviewItem]] = {}
    for item in items:
        grouped.setdefault(item.source_type, []).append(item)

    interleaved: list[WeakReviewItem] = []
    for source_type in LOOP_ORDER:
        if source_type in grouped:
            interleaved.extend(grouped[source_type])

    for remaining_type, remaining_items in grouped.items():
        if remaining_type not in LOOP_ORDER:
            interleaved.extend(remaining_items)

    return interleaved[:limit]


async def review_weak_item(
    db: AsyncSession,
    user_id: int,
    item_id: int,
    quality: int,
    *,
    study_plan_id: int,
) -> WeakReviewItem | None:
    item = await db.get(WeakReviewItem, item_id)
    if not item or item.user_id != user_id:
        return None

    item = sm2_update_weak(item, quality)
    await db.commit()
    await db.refresh(item)

    await update_daily_progress(
        db,
        user_id,
        flashcard_reviewed=True,
        skill="weak_review",
        skill_score=min(quality / 5.0, 1.0),
        study_plan_id=study_plan_id,
    )
    return item


async def get_weak_review_stats(
    db: AsyncSession,
    user_id: int,
    study_plan_id: int,
) -> dict:
    today = date_type.today()
    result = await db.execute(
        select(
            func.count(WeakReviewItem.id).label("total"),
            func.sum(
                cast(WeakReviewItem.next_review <= today, Integer)
            ).label("due"),
        ).where(
            WeakReviewItem.user_id == user_id,
            WeakReviewItem.study_plan_id == study_plan_id,
        )
    )
    row = result.one()
    total = row.total or 0
    due = row.due or 0

    type_result = await db.execute(
        select(
            WeakReviewItem.source_type,
            func.count(WeakReviewItem.id).label("cnt"),
        ).where(
            WeakReviewItem.user_id == user_id,
            WeakReviewItem.study_plan_id == study_plan_id,
            WeakReviewItem.next_review <= today,
        ).group_by(WeakReviewItem.source_type)
    )
    breakdown = {row.source_type: row.cnt for row in type_result.all()}

    return {
        "total": total,
        "due": due,
        "breakdown": breakdown,
    }
