from fastapi import Request
from slowapi import Limiter

from app.core.config import settings


def _get_real_ip(request: Request) -> str:
    """Return the real client IP, trusting X-Real-IP set by a trusted reverse proxy.

    nginx should be configured with:  proxy_set_header X-Real-IP $remote_addr;
    This header cannot be spoofed by clients because nginx overwrites it with
    the socket-level remote address.
    """
    x_real_ip = request.headers.get("X-Real-IP")
    if x_real_ip:
        return x_real_ip
    # Fallback: first IP in X-Forwarded-For (may be spoofable without trusted proxy)
    forwarded_for = request.headers.get("X-Forwarded-For", "")
    if forwarded_for:
        return forwarded_for.split(",")[0].strip()
    return request.client.host if request.client else "unknown"


limiter = Limiter(
    key_func=_get_real_ip,
    default_limits=["200/minute"] if settings.RATE_LIMIT_ENABLED else [],
    enabled=settings.RATE_LIMIT_ENABLED,
    storage_uri="memory://" if settings.RATE_LIMIT_STORAGE == "memory" else settings.REDIS_URL,
)
