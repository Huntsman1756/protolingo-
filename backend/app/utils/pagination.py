from __future__ import annotations

from dataclasses import dataclass
from typing import TypeVar

from fastapi import Query
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.sql import Select

T = TypeVar("T")


@dataclass
class PaginationParams:
    skip: int
    limit: int


def pagination_deps(
    skip: int = Query(default=0, ge=0),
    limit: int = Query(default=20, ge=1, le=100),
) -> PaginationParams:
    return PaginationParams(skip=skip, limit=limit)


async def paginate(
    db: AsyncSession,
    stmt: Select,
    skip: int,
    limit: int,
) -> tuple[list, int]:
    total = await db.scalar(select(func.count()).select_from(stmt.subquery()))
    result = await db.execute(stmt.offset(skip).limit(limit))
    rows = result.scalars().all()
    return rows, total or 0
