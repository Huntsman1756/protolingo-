from __future__ import annotations

from fastapi import HTTPException
from sqlalchemy import select, update
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.user_language import UserLanguage


async def get_active_language(db: AsyncSession, user_id: int) -> UserLanguage | None:
    result = await db.execute(
        select(UserLanguage).where(
            UserLanguage.user_id == user_id,
            UserLanguage.is_active.is_(True),
        )
    )
    return result.scalar_one_or_none()


async def get_user_languages(db: AsyncSession, user_id: int) -> list[UserLanguage]:
    result = await db.execute(
        select(UserLanguage)
        .where(UserLanguage.user_id == user_id)
        .order_by(UserLanguage.created_at.asc())
    )
    return list(result.scalars().all())


async def add_language(db: AsyncSession, user_id: int, target_language: str) -> UserLanguage:
    existing = await db.execute(
        select(UserLanguage).where(
            UserLanguage.user_id == user_id,
            UserLanguage.target_language == target_language,
        )
    )
    if existing.scalar_one_or_none():
        raise HTTPException(status_code=409, detail="Language already added")

    await db.execute(
        update(UserLanguage)
        .where(UserLanguage.user_id == user_id, UserLanguage.is_active.is_(True))
        .values(is_active=False)
    )

    entry = UserLanguage(user_id=user_id, target_language=target_language, is_active=True)
    db.add(entry)
    await db.commit()
    await db.refresh(entry)
    return entry


async def switch_language(db: AsyncSession, user_id: int, target_language: str) -> UserLanguage:
    target = await db.execute(
        select(UserLanguage).where(
            UserLanguage.user_id == user_id,
            UserLanguage.target_language == target_language,
        )
    )
    row = target.scalar_one_or_none()
    if not row:
        raise HTTPException(status_code=404, detail="Language not found for user")

    if row.is_active:
        return row

    await db.execute(
        update(UserLanguage)
        .where(UserLanguage.user_id == user_id, UserLanguage.is_active.is_(True))
        .values(is_active=False)
    )

    row.is_active = True
    await db.commit()
    await db.refresh(row)
    return row


async def remove_language(db: AsyncSession, user_id: int, target_language: str) -> bool:
    rows = await get_user_languages(db, user_id)
    if len(rows) <= 1:
        raise HTTPException(status_code=400, detail="Cannot delete the only language")

    target = next((r for r in rows if r.target_language == target_language), None)
    if not target:
        raise HTTPException(status_code=404, detail="Language not found for user")

    if target.is_active:
        raise HTTPException(status_code=400, detail="Cannot delete the active language")

    await db.delete(target)
    await db.commit()
    return True
