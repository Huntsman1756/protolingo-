from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from jwt.exceptions import PyJWTError as JWTError
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.core.database import get_db
from app.core.security import decode_access_token
from app.models.user import User
from app.services.subscription_service import is_subscribed

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")


async def get_current_user(
    token: str = Depends(oauth2_scheme), db: AsyncSession = Depends(get_db)
) -> User:
    try:
        payload = decode_access_token(token)
        user_id = int(payload["sub"])
    except (JWTError, KeyError, ValueError):
        raise HTTPException(status_code=401, detail="Invalid token") from None

    user = await db.get(User, user_id)
    if not user or not user.is_active:
        raise HTTPException(status_code=401, detail="User not found or inactive")
    return user


async def require_admin(current_user: User = Depends(get_current_user)) -> User:
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    return current_user


async def require_subscription(current_user: User = Depends(get_current_user)) -> User:
    """Dependency for AI-powered endpoints gated by subscription.

    Returns the user unchanged when STRIPE_ENABLED=false (self-hosted mode).
    Raises HTTP 402 when STRIPE_ENABLED=true and user has no active subscription.
    """
    if not is_subscribed(current_user, settings.STRIPE_ENABLED):
        raise HTTPException(status_code=402, detail="subscription_required")
    return current_user
