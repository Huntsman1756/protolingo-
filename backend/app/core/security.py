import secrets
from datetime import datetime, timedelta, timezone

import jwt
from passlib.context import CryptContext

from app.core.config import settings

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Pre-computed dummy hash used in login to prevent user-enumeration via timing.
# Computed once at startup so bcrypt backend is initialized before any request.
_DUMMY_HASH: str = pwd_context.hash("freelingo_dummy_placeholder")


def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)


def dummy_verify() -> None:
    """Run a no-op bcrypt verify to keep constant timing when user is not found."""
    pwd_context.verify("freelingo_dummy_placeholder", _DUMMY_HASH)


def create_access_token(user_id: int, role: str) -> str:
    expire = datetime.now(timezone.utc) + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    return jwt.encode(
        {"sub": str(user_id), "role": role, "exp": expire},
        settings.SECRET_KEY,
        algorithm="HS256",
    )


def decode_access_token(token: str) -> dict:
    return jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])


def create_refresh_token() -> str:
    return secrets.token_urlsafe(64)
