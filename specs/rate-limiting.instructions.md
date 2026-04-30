---
description: "Rate limiting strategy for FreeLingo. Uses slowapi (Rust-based) with in-memory storage by default, suitable for self-hosted single-node deployments. Per-IP and per-user limits for auth and LLM endpoints."
applyTo: "backend/app/main.py, backend/app/core/config.py"
---

# Rate Limiting — FreeLingo

## Approach

Uses [**slowapi**](https://github.com/laurentS/slowapi) (built on `limits`, Rust backend). Default storage is in-memory — adequate for self-hosted single-node deployments. No Redis dependency for rate limiting.

For multi-node setups, switch to Redis backend via `RATE_LIMIT_STORAGE=redis` env var.

---

## Endpoint limits

| Endpoint Group | Limit | Rationale |
|---------------|-------|-----------|
| Auth (`/api/auth/register`, `/api/auth/login`) | 5 requests / minute / IP | Prevent brute-force on credentials |
| Refresh (`/api/auth/refresh`) | 10 requests / minute / IP | Rotation calls are lightweight, but guard abuse |
| LLM-heavy (`/api/assessment/*`, `/api/study-plan/generate`, `/api/flashcards/generate`) | 10 requests / minute / user | These hit Ollama; prevent queue saturation |
| LLM-light (`/api/lessons/*`, `/api/exercises/*`, `/api/chat`) | 30 requests / minute / user | Interactive, should feel responsive |
| Flashcards review (`/api/flashcards/*/review`) | 60 requests / minute / user | Rapid swipes during review sessions |
| Admin (`/api/admin/*`) | 60 requests / minute / user | Admin UI responsiveness |
| General read (`/api/auth/me`, `/api/progress/*`, `/api/study-plan/current`) | 120 requests / minute / user | Light reads, high rate acceptable |
| TTS/STT (`/api/tts`, `/api/stt`) | 20 requests / minute / user | Audio generation/transcription |

---

## Implementation

### `app/core/config.py` — Add rate limit settings

```python
class Settings(BaseSettings):
    # ... existing fields ...

    # Rate limiting
    RATE_LIMIT_ENABLED: bool = True
    RATE_LIMIT_STORAGE: str = "memory"  # "memory" | "redis"
```

### `app/main.py` — Wire up slowapi

```python
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

limiter = Limiter(
    key_func=get_remote_address,
    default_limits=["200/minute"],
    storage_uri="memory://" if settings.RATE_LIMIT_STORAGE == "memory" else settings.REDIS_URL,
)

app = FastAPI()
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)
```

### `app/core/deps.py` — Per-user rate limit key

```python
from slowapi.util import get_remote_address

async def get_user_key(request: Request, current_user: User = Depends(get_current_user)) -> str:
    """Use user ID as rate-limit key for authenticated endpoints."""
    return str(current_user.id)
```

### Per-endpoint decorators

```python
from slowapi import Limiter
from fastapi import Request

limiter = Limiter(key_func=get_remote_address)

# Auth: IP-based
@router.post("/register")
@limiter.limit("5/minute")
async def register(request: Request, ...):
    ...

# LLM-heavy: user-based
@router.post("/assessment/start")
@limiter.limit("10/minute", key_func=get_user_key)
async def start_assessment(request: Request, ...):
    ...

# LLM-light: user-based
@router.post("/chat")
@limiter.limit("30/minute", key_func=get_user_key)
async def chat(request: Request, ...):
    ...
```

### Error response format

```json
{
  "detail": "Rate limit exceeded: 5 per 1 minute"
}
```

HTTP 429 with `Retry-After` header.

---

## Frontend handling

```typescript
// lib/api.ts
async function apiFetch(url: string, options: RequestInit = {}) {
  // ... existing token logic ...

  if (res.status === 429) {
    const retryAfter = res.headers.get('Retry-After')
    throw new RateLimitError(
      'Too many requests. Please slow down.',
      parseInt(retryAfter || '5', 10)
    )
  }
  // ...
}

// Show a toast notification in the UI
class RateLimitError extends Error {
  constructor(message: string, public retryAfterSeconds: number) {
    super(message)
    this.name = 'RateLimitError'
  }
}
```

---

## Self-hosted considerations

Since FreeLingo is self-hosted (typically single admin + few users):

- **Defaults are generous** — limits prevent abuse, not normal usage.
- **In-memory storage** — no extra infrastructure. Process restart loses counters (acceptable for self-hosted).
- **Redis backend optional** — set `RATE_LIMIT_STORAGE=redis` if running multi-node.
- **Disable fully** — set `RATE_LIMIT_ENABLED=false` if not needed.
- Limits are configurable per environment, not hardcoded — adjust in `.env` if needed.