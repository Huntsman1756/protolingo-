"""Public configuration endpoint.

Returns runtime flags the frontend needs to decide UI behaviour
(e.g. whether to show the pricing/billing section).
No sensitive information is exposed.
"""
from __future__ import annotations

from fastapi import APIRouter, Request

from app.core.config import settings
from app.core.limiter import limiter

router = APIRouter(tags=["config"])


@router.get("/api/config")
@limiter.limit("60/minute")
async def get_config(request: Request) -> dict:  # noqa: ANN001
    """Return public runtime configuration flags."""
    return {
        "stripe_enabled": settings.STRIPE_ENABLED,
        "stripe_trial_days": settings.STRIPE_TRIAL_DAYS,
        "tts_provider": settings.TTS_PROVIDER,
        "openai_tts_voice": settings.OPENAI_TTS_VOICE,
    }
