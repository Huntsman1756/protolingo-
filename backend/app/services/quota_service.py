"""Conversation quota helpers backed by Redis.

Three independent counters per user:
  - Weekly sessions:      conv_sessions:{user_id}:{YYYY-Www}        (resets each Monday)
  - Daily minutes:        conv_seconds:{user_id}:{YYYY-MM-DD}       (resets each midnight UTC)
  - Weekly minutes:       conv_weekly_seconds:{user_id}:{YYYY-Www}  (resets each Monday)

Monthly token quota is checked directly against the llm_usage DB table (no Redis counter needed —
tokens are already persisted there).

A limit of 0 means unlimited.
"""
from __future__ import annotations

from datetime import datetime, timedelta, timezone


# ── Key helpers ──────────────────────────────────────────────────────────────

def _week_key(user_id: int) -> str:
    now = datetime.now(timezone.utc)
    year, week, _ = now.isocalendar()
    return f"conv_sessions:{user_id}:{year}-W{week:02d}"


def _day_key(user_id: int) -> str:
    today = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    return f"conv_seconds:{user_id}:{today}"


def _weekly_seconds_key(user_id: int) -> str:
    now = datetime.now(timezone.utc)
    year, week, _ = now.isocalendar()
    return f"conv_weekly_seconds:{user_id}:{year}-W{week:02d}"


def _seconds_until_monday() -> int:
    now = datetime.now(timezone.utc)
    days_ahead = 7 - now.weekday()          # weekday: 0=Mon … 6=Sun
    next_monday = (now + timedelta(days=days_ahead)).replace(
        hour=0, minute=0, second=0, microsecond=0
    )
    return max(int((next_monday - now).total_seconds()), 1)


def _seconds_until_midnight() -> int:
    now = datetime.now(timezone.utc)
    tomorrow = (now + timedelta(days=1)).replace(
        hour=0, minute=0, second=0, microsecond=0
    )
    return max(int((tomorrow - now).total_seconds()), 1)


# ── Public API ────────────────────────────────────────────────────────────────

async def get_quota_status(
    redis: object,
    user_id: int,
    weekly_limit: int,
    daily_minutes_limit: int,
    weekly_minutes_limit: int = 0,
) -> dict:
    """Return current usage without modifying any counter."""
    sessions_used = int(await redis.get(_week_key(user_id)) or 0)  # type: ignore[attr-defined]
    seconds_used = int(await redis.get(_day_key(user_id)) or 0)  # type: ignore[attr-defined]
    weekly_seconds_used = int(await redis.get(_weekly_seconds_key(user_id)) or 0)  # type: ignore[attr-defined]
    minutes_used = seconds_used // 60
    weekly_minutes_used = weekly_seconds_used // 60

    return {
        "sessions_this_week": sessions_used,
        "sessions_limit": weekly_limit,
        "sessions_unlimited": weekly_limit == 0,
        "minutes_today": minutes_used,
        "minutes_limit": daily_minutes_limit,
        "time_unlimited": daily_minutes_limit == 0,
        "minutes_this_week": weekly_minutes_used,
        "weekly_minutes_limit": weekly_minutes_limit,
        "weekly_minutes_unlimited": weekly_minutes_limit == 0,
    }


async def check_and_increment_sessions(
    redis: object,
    user_id: int,
    weekly_limit: int,
) -> tuple[bool, int, int]:
    """Check weekly session quota and increment if allowed.

    Returns (allowed, sessions_used_before, limit).
    When limit == 0, always returns (True, current, 0).
    """
    week_key = _week_key(user_id)
    current = int(await redis.get(week_key) or 0)  # type: ignore[attr-defined]

    if weekly_limit > 0 and current >= weekly_limit:
        return False, current, weekly_limit

    new_val = await redis.incr(week_key)  # type: ignore[attr-defined]
    if new_val == 1:
        # First session of the week — set TTL
        await redis.expire(week_key, _seconds_until_monday())  # type: ignore[attr-defined]

    return True, current, weekly_limit


async def check_daily_minutes(
    redis: object,
    user_id: int,
    daily_minutes_limit: int,
) -> tuple[bool, int, int]:
    """Check whether the user has daily minutes remaining.

    Returns (allowed, minutes_used, limit).
    When limit == 0, always returns (True, current_minutes, 0).
    """
    seconds_used = int(await redis.get(_day_key(user_id)) or 0)  # type: ignore[attr-defined]
    minutes_used = seconds_used // 60

    if daily_minutes_limit == 0:
        return True, minutes_used, 0

    return minutes_used < daily_minutes_limit, minutes_used, daily_minutes_limit


async def check_weekly_minutes(
    redis: object,
    user_id: int,
    weekly_minutes_limit: int,
) -> tuple[bool, int, int]:
    """Check whether the user has weekly minutes remaining.

    Returns (allowed, minutes_used_this_week, limit).
    When limit == 0, always returns (True, current_minutes, 0).
    """
    weekly_seconds = int(await redis.get(_weekly_seconds_key(user_id)) or 0)  # type: ignore[attr-defined]
    weekly_minutes_used = weekly_seconds // 60

    if weekly_minutes_limit == 0:
        return True, weekly_minutes_used, 0

    return weekly_minutes_used < weekly_minutes_limit, weekly_minutes_used, weekly_minutes_limit


async def record_session_seconds(redis: object, user_id: int, seconds: int) -> None:
    """Accumulate seconds used today and this week. Safe to call multiple times (idempotent TTL)."""
    if seconds <= 0:
        return
    day_key = _day_key(user_id)
    week_key = _weekly_seconds_key(user_id)
    await redis.incrby(day_key, seconds)  # type: ignore[attr-defined]
    await redis.incrby(week_key, seconds)  # type: ignore[attr-defined]
    ttl = await redis.ttl(day_key)  # type: ignore[attr-defined]
    if ttl < 0:
        await redis.expire(day_key, _seconds_until_midnight())  # type: ignore[attr-defined]
    week_ttl = await redis.ttl(week_key)  # type: ignore[attr-defined]
    if week_ttl < 0:
        await redis.expire(week_key, _seconds_until_monday())  # type: ignore[attr-defined]


# ── Monthly token quota (DB-backed) ──────────────────────────────────────────

async def get_monthly_tokens_used(db: object, user_id: int) -> int:
    """Sum total_tokens consumed by user in the current calendar month."""
    from sqlalchemy import func, select  # noqa: PLC0415
    from app.models.llm_usage import LLMUsage  # noqa: PLC0415

    now = datetime.now(timezone.utc)
    month_start = now.replace(day=1, hour=0, minute=0, second=0, microsecond=0, tzinfo=None)
    result = await db.scalar(  # type: ignore[attr-defined]
        select(func.coalesce(func.sum(LLMUsage.total_tokens), 0)).where(
            LLMUsage.user_id == user_id,
            LLMUsage.created_at >= month_start,
        )
    )
    return int(result or 0)


async def check_monthly_tokens(
    db: object,
    user_id: int,
    monthly_limit: int,
) -> tuple[bool, int, int]:
    """Check whether the user is under their monthly token limit.

    Returns (allowed, tokens_used_this_month, limit).
    When limit == 0, always returns (True, tokens_used, 0) — unlimited.
    """
    tokens_used = await get_monthly_tokens_used(db, user_id)
    if monthly_limit == 0:
        return True, tokens_used, 0
    return tokens_used < monthly_limit, tokens_used, monthly_limit
