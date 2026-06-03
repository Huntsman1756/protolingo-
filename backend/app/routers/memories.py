"""Memories router — user-persisted context from LLM conversations."""

from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException, Request, status
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.deps import get_active_study_plan, require_subscription
from app.core.limiter import limiter
from app.models.study_plan import StudyPlan
from app.models.user import User
from app.services.memory_service import (
    clear_all_memories,
    delete_memory,
    get_user_memories,
)

router = APIRouter(prefix="/api/memories", tags=["memories"])


class MemoryOut(BaseModel):
    id: int
    content: str
    source: str
    created_at: str

    model_config = {"from_attributes": True}


class MemoryListResponse(BaseModel):
    memories: list[MemoryOut]


class ClearAllResponse(BaseModel):
    deleted: int


@router.get("", response_model=MemoryListResponse)
@limiter.limit("30/minute")
async def list_memories(
    request: Request,
    plan: StudyPlan = Depends(get_active_study_plan),
    current_user: User = Depends(require_subscription),
    db: AsyncSession = Depends(get_db),
):
    memories = await get_user_memories(db, current_user.id, study_plan_id=plan.id)
    return MemoryListResponse(
        memories=[
            MemoryOut(
                id=m.id,
                content=m.content,
                source=m.source,
                created_at=m.created_at.isoformat() if m.created_at else "",
            )
            for m in memories
        ]
    )


@router.delete("/{memory_id}", status_code=status.HTTP_204_NO_CONTENT)
@limiter.limit("30/minute")
async def delete_one_memory(
    request: Request,
    memory_id: int,
    current_user: User = Depends(require_subscription),
    db: AsyncSession = Depends(get_db),
):
    deleted = await delete_memory(db, memory_id, current_user.id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Memory not found")


@router.delete("", response_model=ClearAllResponse)
@limiter.limit("10/minute")
async def clear_memories(
    request: Request,
    plan: StudyPlan = Depends(get_active_study_plan),
    current_user: User = Depends(require_subscription),
    db: AsyncSession = Depends(get_db),
):
    count = await clear_all_memories(db, current_user.id, study_plan_id=plan.id)
    return ClearAllResponse(deleted=count)
