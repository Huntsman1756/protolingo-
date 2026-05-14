"""Billing endpoints — Stripe Checkout, Customer Portal, and webhook handler.

This router is only registered in main.py when STRIPE_ENABLED=true.
The webhook endpoint verifies the Stripe signature before processing any event.
"""
from __future__ import annotations

from datetime import datetime
from typing import Literal

import stripe
from fastapi import APIRouter, Depends, HTTPException, Request
from pydantic import BaseModel
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.app_logger import get_logger
from app.core.config import settings
from app.core.database import get_db
from app.core.deps import get_current_user
from app.core.limiter import limiter
from app.models.user import User
from app.services.subscription_service import apply_subscription_quotas

router = APIRouter(prefix="/api/billing", tags=["billing"])
logger = get_logger(__name__)


def _stripe_client() -> None:
    """Set the Stripe API key (called once at router registration time)."""
    stripe.api_key = settings.STRIPE_SECRET_KEY


def _sget(obj: object, key: str, default=None):
    """Get a field from a Stripe event object or a plain dict (test mocks).

    In production, Stripe SDK v15+ returns StripeObject instances that no longer
    inherit from dict — use getattr(). In tests, construct_event is mocked to
    return plain Python dicts — use .get(). This helper handles both.
    """
    if isinstance(obj, dict):
        return obj.get(key, default)
    return getattr(obj, key, default)


# ── Request schemas ──────────────────────────────────────────────────────────

class CheckoutRequest(BaseModel):
    plan: Literal["monthly", "yearly"]


# ── Endpoints ────────────────────────────────────────────────────────────────

@router.post("/checkout")
@limiter.limit("10/minute")
async def create_checkout_session(
    request: Request,
    body: CheckoutRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> dict:
    """Create a Stripe Checkout Session for the selected plan.

    Uses get_current_user (not require_subscription) so unsubscribed users
    can start a new subscription.
    """
    price_id = (
        settings.STRIPE_PRICE_MONTHLY
        if body.plan == "monthly"
        else settings.STRIPE_PRICE_YEARLY
    )
    if not price_id:
        raise HTTPException(status_code=503, detail="Stripe prices not configured")

    # Get or create Stripe Customer
    customer_id = current_user.stripe_customer_id
    if not customer_id:
        customer = stripe.Customer.create(
            email=current_user.email or "",
            name=current_user.display_name,
            metadata={"user_id": str(current_user.id)},
        )
        customer_id = customer.id
        current_user.stripe_customer_id = customer_id
        await db.commit()

    subscription_data: dict = {"metadata": {"user_id": str(current_user.id)}}
    if settings.STRIPE_TRIAL_DAYS > 0:
        subscription_data["trial_period_days"] = settings.STRIPE_TRIAL_DAYS

    session = stripe.checkout.Session.create(
        customer=customer_id,
        line_items=[{"price": price_id, "quantity": 1}],
        mode="subscription",
        allow_promotion_codes=True,
        subscription_data=subscription_data,
        success_url=f"{settings.STRIPE_BASE_URL}/billing/success",
        cancel_url=f"{settings.STRIPE_BASE_URL}/billing/canceled",
    )
    return {"url": session.url}


@router.post("/portal")
@limiter.limit("10/minute")
async def create_portal_session(
    request: Request,
    current_user: User = Depends(get_current_user),
) -> dict:
    """Create a Stripe Customer Portal session for subscription management."""
    if not current_user.stripe_customer_id:
        raise HTTPException(status_code=400, detail="No active subscription found")

    session = stripe.billing_portal.Session.create(
        customer=current_user.stripe_customer_id,
        return_url=f"{settings.STRIPE_BASE_URL}/settings",
    )
    return {"url": session.url}


@router.post("/webhook")
@limiter.limit("200/minute")
async def stripe_webhook(
    request: Request,
    db: AsyncSession = Depends(get_db),
) -> dict:
    """Handle Stripe webhook events.

    Security: Stripe signature is verified before any event data is processed.
    Returns HTTP 200 on all successfully handled events to prevent Stripe retries.
    """
    payload = await request.body()
    sig_header = request.headers.get("stripe-signature", "")

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, settings.STRIPE_WEBHOOK_SECRET
        )
    except ValueError:
        logger.warning("[billing] Webhook invalid payload")
        raise HTTPException(status_code=400, detail="Invalid payload")
    except stripe.SignatureVerificationError:
        logger.warning("[billing] Webhook invalid signature")
        raise HTTPException(status_code=400, detail="Invalid signature")

    event_type: str = event["type"]
    logger.info("[billing] Stripe event received: %s", event_type)

    try:
        if event_type == "checkout.session.completed":
            await _handle_checkout_completed(db, event["data"]["object"])
        elif event_type == "customer.subscription.updated":
            await _handle_subscription_updated(db, event["data"]["object"])
        elif event_type == "customer.subscription.deleted":
            await _handle_subscription_deleted(db, event["data"]["object"])
        elif event_type == "invoice.payment_failed":
            await _handle_payment_failed(db, event["data"]["object"])
        else:
            logger.debug("[billing] Unhandled event type: %s", event_type)
    except Exception as exc:  # noqa: BLE001
        # Log but return 200 to prevent Stripe from retrying non-transient errors
        logger.error("[billing] Error processing event %s: %s", event_type, exc)

    return {"received": True}


# ── Event handlers ───────────────────────────────────────────────────────────

def _subscription_period_end(sub: object) -> datetime | None:
    """Extract current_period_end from a Stripe Subscription object.

    In Stripe API >=2025-03-31 (SDK v12+), current_period_end moved from the
    Subscription root to each SubscriptionItem. We try both locations.
    Uses _sget so it works with both StripeObject (production) and plain dicts
    (test mocks).
    """
    period_end = _sget(sub, "current_period_end")
    if period_end is None:
        items = _sget(sub, "items")
        if items is not None:
            data = _sget(items, "data") or []
            if data:
                period_end = _sget(data[0], "current_period_end")
    if period_end is not None:
        return datetime.utcfromtimestamp(int(period_end))
    return None


async def _get_user_by_customer_id(db: AsyncSession, customer_id: str) -> User | None:
    result = await db.execute(
        select(User).where(User.stripe_customer_id == customer_id)
    )
    return result.scalar_one_or_none()


async def _handle_checkout_completed(db: AsyncSession, session: object) -> None:
    customer_id: str | None = _sget(session, "customer")
    subscription_id: str | None = _sget(session, "subscription")
    if not customer_id:
        return

    user = await _get_user_by_customer_id(db, customer_id)
    if not user:
        # Try to link by metadata (customer may have been created before storing the ID)
        metadata = _sget(session, "metadata") or {}
        user_id_str: str | None = _sget(metadata, "user_id")
        if user_id_str:
            user = await db.get(User, int(user_id_str))
            if user:
                user.stripe_customer_id = customer_id

    if not user:
        logger.warning(
            "[billing] checkout.session.completed — no user found for customer %s", customer_id
        )
        return

    # Determine current status and period end from the Stripe Subscription object
    status = "trialing"
    ends_at: datetime | None = None
    if subscription_id:
        try:
            sub = stripe.Subscription.retrieve(subscription_id)
            status = getattr(sub, "status", "trialing")  # "trialing" | "active"
            ends_at = _subscription_period_end(sub)
        except Exception as exc:  # noqa: BLE001
            logger.warning(
                "[billing] Could not retrieve subscription %s: %s", subscription_id, exc
            )

    user.subscription_status = status
    user.subscription_ends_at = ends_at
    await apply_subscription_quotas(user, db)
    logger.info(
        "[billing] User %s subscription activated — status=%s", user.id, status
    )


async def _handle_subscription_updated(db: AsyncSession, subscription: object) -> None:
    customer_id: str | None = _sget(subscription, "customer")
    if not customer_id:
        return

    user = await _get_user_by_customer_id(db, customer_id)
    if not user:
        return

    user.subscription_status = _sget(subscription, "status") or user.subscription_status
    ends_at = _subscription_period_end(subscription)
    if ends_at is not None:
        user.subscription_ends_at = ends_at

    await db.commit()
    logger.info(
        "[billing] User %s subscription updated — status=%s", user.id, user.subscription_status
    )


async def _handle_subscription_deleted(db: AsyncSession, subscription: object) -> None:
    customer_id: str | None = _sget(subscription, "customer")
    if not customer_id:
        return

    user = await _get_user_by_customer_id(db, customer_id)
    if not user:
        return

    user.subscription_status = "canceled"
    await db.commit()
    logger.info("[billing] User %s subscription canceled", user.id)


async def _handle_payment_failed(db: AsyncSession, invoice: object) -> None:
    customer_id: str | None = _sget(invoice, "customer")
    if not customer_id:
        return

    user = await _get_user_by_customer_id(db, customer_id)
    if not user:
        return

    user.subscription_status = "past_due"
    await db.commit()
    logger.info("[billing] User %s payment failed — marked past_due", user.id)
