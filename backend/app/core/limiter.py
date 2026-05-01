from slowapi import Limiter
from slowapi.util import get_remote_address

from app.core.config import settings

limiter = Limiter(
    key_func=get_remote_address,
    default_limits=["200/minute"] if settings.RATE_LIMIT_ENABLED else [],
    enabled=settings.RATE_LIMIT_ENABLED,
    storage_uri="memory://" if settings.RATE_LIMIT_STORAGE == "memory" else settings.REDIS_URL,
)
