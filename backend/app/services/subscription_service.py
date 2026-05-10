"""Subscription helpers for Phase 5 Stripe integration.

These functions are the single source of truth for subscription access control.
When STRIPE_ENABLED=false every user is considered subscribed (self-hosted mode).
"""
from __future__ import annotations

from sqlalchemy.ext.asyncio import AsyncSession

from app.models.user import User


def is_subscribed(user: User, stripe_enabled: bool) -> bool:
    """Return True if the user has full access to AI features.

    - stripe_enabled=False  → always True (self-hosted / no paywall)
    - stripe_enabled=True   → only "trialing" or "active" subscriptions pass
    """
    if not stripe_enabled:
        return True
    return user.subscription_status in ("trialing", "active")


async def apply_subscription_quotas(user: User, db: AsyncSession) -> None:
    """Set default quotas when a subscription becomes active or trialing."""
    user.conversation_weekly_sessions = 3
    user.conversation_weekly_minutes = 90
    user.conversation_daily_minutes = 30
    user.monthly_tokens_limit = 1_000_000
    await db.commit()
