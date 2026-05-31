import secrets
from datetime import UTC, datetime, timedelta

import bcrypt
import jwt

from app.core.config import settings

# Pre-computed dummy hash used in login to prevent user-enumeration via timing.
# Computed once at startup so bcrypt is initialized before any request.
_DUMMY_HASH: bytes = bcrypt.hashpw(b"freelingo_dummy_placeholder", bcrypt.gensalt())


def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()


def verify_password(plain: str, hashed: str) -> bool:
    return bcrypt.checkpw(plain.encode(), hashed.encode())


def dummy_verify() -> None:
    """Run a no-op bcrypt verify to keep constant timing when user is not found."""
    bcrypt.checkpw(b"freelingo_dummy_placeholder", _DUMMY_HASH)


def create_access_token(user_id: int, role: str) -> str:
    expire = datetime.now(UTC) + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    return jwt.encode(
        {"sub": str(user_id), "role": role, "exp": expire},
        settings.SECRET_KEY,
        algorithm="HS256",
    )


def decode_access_token(token: str) -> dict:
    return jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])


def create_refresh_token() -> str:
    return secrets.token_urlsafe(64)
