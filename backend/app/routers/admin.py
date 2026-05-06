import secrets

from fastapi import APIRouter, Depends, HTTPException, Query
from redis.asyncio import Redis
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.core.database import get_db
from app.core.deps import require_admin
from app.core.security import hash_password
from app.models.chat_history import ChatHistory
from app.models.lesson import Lesson
from app.models.llm_usage import LLMUsage
from app.models.progress import Progress
from app.models.study_plan import StudyPlan
from app.models.user import User
from app.schemas.admin import (
    AdminUserCreate,
    AdminUserResponse,
    AdminUserStatsResponse,
    AdminUserUpdate,
    InviteResponse,
    PaginatedAdminUsersResponse,
)

router = APIRouter(prefix="/api/admin", tags=["admin"])


async def get_redis():
    redis = Redis.from_url(settings.REDIS_URL, decode_responses=True)
    try:
        yield redis
    finally:
        await redis.aclose()


@router.get("/users", response_model=PaginatedAdminUsersResponse)
async def list_users(
    admin: User = Depends(require_admin),
    db: AsyncSession = Depends(get_db),
    skip: int = Query(default=0, ge=0),
    limit: int = Query(default=20, ge=1, le=100),
    q: str = Query(default="", max_length=100),
):
    base = select(User)
    if q.strip():
        pattern = f"%{q.strip()}%"
        base = base.where(
            User.username.ilike(pattern) | User.email.ilike(pattern)
        )
    total = await db.scalar(select(func.count()).select_from(base.subquery()))
    result = await db.execute(
        base.order_by(User.username.asc()).offset(skip).limit(limit)
    )
    return PaginatedAdminUsersResponse(
        items=result.scalars().all(),
        total=total or 0,
        skip=skip,
        limit=limit,
    )


@router.post("/users", response_model=AdminUserResponse)
async def create_user(
    data: AdminUserCreate,
    admin: User = Depends(require_admin),
    db: AsyncSession = Depends(get_db),
):
    existing = await db.execute(
        select(User).where(User.username == data.username)
    )
    if existing.scalar_one_or_none():
        raise HTTPException(status_code=409, detail="Username already taken")

    user = User(
        username=data.username,
        email=data.email,
        display_name=data.display_name,
        hashed_password=hash_password(data.password),
        native_language=data.native_language,
        role=data.role,
        is_active=True,
    )
    db.add(user)
    await db.commit()
    await db.refresh(user)
    return user


@router.get("/users/{user_id}/stats", response_model=AdminUserStatsResponse)
async def get_user_stats(
    user_id: int,
    admin: User = Depends(require_admin),
    db: AsyncSession = Depends(get_db),
):
    user = await db.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Active study plan
    plan_result = await db.execute(
        select(StudyPlan)
        .where(StudyPlan.user_id == user_id, StudyPlan.is_active.is_(True))
        .order_by(StudyPlan.created_at.desc())
        .limit(1)
    )
    plan = plan_result.scalar_one_or_none()

    # Lessons completed across all study plans of this user
    lessons_done = await db.scalar(
        select(func.count(Lesson.id))
        .join(StudyPlan, Lesson.study_plan_id == StudyPlan.id)
        .where(StudyPlan.user_id == user_id, Lesson.is_completed.is_(True))
    ) or 0

    # XP total, streak, active days, exercises
    progress_agg = await db.execute(
        select(
            func.coalesce(func.sum(Progress.xp_earned), 0).label("xp_total"),
            func.coalesce(func.max(Progress.streak_day), 0).label("streak"),
            func.count(Progress.id).label("active_days"),
            func.coalesce(func.sum(Progress.exercises_correct), 0).label("ex_correct"),
            func.coalesce(func.sum(Progress.exercises_total), 0).label("ex_total"),
        ).where(Progress.user_id == user_id)
    )
    prog = progress_agg.one()

    # Tutor chat messages sent by the user (role="user")
    chat_count = await db.scalar(
        select(func.count(ChatHistory.id)).where(
            ChatHistory.user_id == user_id, ChatHistory.role == "user"
        )
    ) or 0

    # Token consumption grouped by source
    token_rows = await db.execute(
        select(
            LLMUsage.source,
            func.coalesce(func.sum(LLMUsage.total_tokens), 0).label("total"),
        )
        .where(LLMUsage.user_id == user_id)
        .group_by(LLMUsage.source)
    )
    tokens_by_source: dict[str, int] = {row.source: row.total for row in token_rows}

    return AdminUserStatsResponse(
        user_id=user_id,
        current_cefr=plan.cefr_level if plan else None,
        current_unit=plan.current_unit if plan else None,
        plan_duration_weeks=plan.duration_weeks if plan else None,
        completion_test_score=plan.completion_test_score if plan else None,
        xp_total=prog.xp_total,
        streak_current=prog.streak,
        active_days=prog.active_days,
        lessons_completed=lessons_done,
        exercises_correct=prog.ex_correct,
        exercises_total=prog.ex_total,
        chat_messages_sent=chat_count,
        tokens_total=sum(tokens_by_source.values()),
        tokens_chat=tokens_by_source.get("chat", 0),
        tokens_conversation=tokens_by_source.get("conversation", 0),
    )


@router.get("/users/{user_id}", response_model=AdminUserResponse)
async def get_user(
    user_id: int,
    admin: User = Depends(require_admin),
    db: AsyncSession = Depends(get_db),
):
    user = await db.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@router.patch("/users/{user_id}", response_model=AdminUserResponse)
async def update_user(
    user_id: int,
    data: AdminUserUpdate,
    admin: User = Depends(require_admin),
    db: AsyncSession = Depends(get_db),
):
    user = await db.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if data.display_name is not None:
        user.display_name = data.display_name
    if data.role is not None:
        user.role = data.role
    if data.is_active is not None:
        user.is_active = data.is_active

    await db.commit()
    await db.refresh(user)
    return user


@router.delete("/users/{user_id}")
async def delete_user(
    user_id: int,
    admin: User = Depends(require_admin),
    db: AsyncSession = Depends(get_db),
):
    user = await db.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    if user.id == admin.id:
        raise HTTPException(status_code=400, detail="Cannot delete yourself")

    await db.delete(user)
    await db.commit()
    return {"detail": "User deleted"}


@router.post("/invite", response_model=InviteResponse)
async def create_invite(
    admin: User = Depends(require_admin),
    redis: Redis = Depends(get_redis),
):
    token = secrets.token_urlsafe(32)
    await redis.setex(f"invite:{token}", 172800, "1")
    return {"invite_url": f"/register?invite={token}"}
