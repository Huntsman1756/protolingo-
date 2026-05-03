---
description: "Rate limiting strategy for FreeLingo: slowapi with in-memory storage by default, per-endpoint limits for auth, LLM-heavy/light operations, flashcards, admin, TTS/STT, and a default global limit."
applyTo: "backend/app/main.py, backend/app/core/config.py, backend/app/core/limiter.py"
---

# Rate Limiting — FreeLingo

## Approach

Uses [**slowapi**](https://github.com/laurentS/slowapi) (built on `limits`, Rust backend). Default storage is in-memory — adequate for self-hosted single-node deployments. No Redis dependency is required for rate limiting.

For multi-node setups, switch to Redis backend via `RATE_LIMIT_STORAGE=redis` in `.env`.

### Configuration

| Variable | Default | Purpose |
|----------|---------|---------|
| `RATE_LIMIT_ENABLED` | `true` | Enable/disable rate limiting entirely |
| `RATE_LIMIT_STORAGE` | `"memory"` | Storage backend: `"memory"` or `"redis"` |

The global default limit is 200 requests/minute for all unclassified endpoints.

### Key strategies

- **IP-based limiting**: used for unauthenticated endpoints (login, register) where no user context exists
- **User-based limiting**: used for authenticated endpoints, keyed by `user_id` from JWT. More precise than IP since multiple users may share an IP (self-hosted scenario)
- **Memory storage**: counters are lost on process restart. Acceptable for self-hosted single-node deployments
- **Disable option**: set `RATE_LIMIT_ENABLED=false` to remove all limits (for development or trusted environments)

---

## Per-endpoint limits

| Endpoint group | Limit | Key type | Rationale |
|---------------|-------|----------|-----------|
| Auth login | 10 requests / minute | IP | Prevent brute-force on credentials |
| Auth register | Invite-gated (no separate limit) | IP | Controlled by invite token expiry |
| Auth refresh | 10 requests / minute | IP | Token rotation, lightweight but guard abuse |
| LLM-heavy (`/api/assessment/start`, `/api/assessment/submit`, `/api/study-plan/generate`, `/api/flashcards/generate`) | 10 requests / minute | User | These call Ollama; prevent queue saturation |
| LLM-light (`/api/lessons/*`, `/api/exercises/*`, `/api/chat`) | 30 requests / minute | User | Interactive, should feel responsive |
| Flashcards review (`/api/flashcards/*/review`) | 60 requests / minute | User | Rapid swipes during review sessions |
| Admin (`/api/admin/*`) | 60 requests / minute | User | Admin UI responsiveness |
| General read (`/api/auth/me`, `/api/progress/*`, `/api/study-plan/current`, `/api/study-plan/today`) | 120 requests / minute | User | Light reads, high rate acceptable |
| TTS (`/api/tts`) | 20 requests / minute | User | Audio generation (computationally expensive) |
| STT (`/api/stt`) | 20 requests / minute | User | Audio transcription (computationally expensive) |
| Default (all other endpoints) | 200 requests / minute | IP | Catch-all for unclassified routes |

---

## Rate limit key selection

- **IP-based** (`get_remote_address`): used for public endpoints where no user is authenticated. Applied to: login, register, refresh, logout.
- **User-based** (`get_user_key` → `str(current_user.id)`): used for all authenticated endpoints. More granular than IP and survives IP changes.

The rate limiter is configured globally with `key_func=get_remote_address` as the default; user-based endpoints override this with `key_func=get_user_key` on each decorator.

---

## Error response format

On rate limit exceed, the response is:

- **HTTP status**: 429 Too Many Requests
- **Header**: `Retry-After: <seconds>`
- **Body**: `{ "detail": "Rate limit exceeded: 5 per 1 minute" }`

The `Retry-After` header allows clients to implement backoff automatically.

---

## Frontend handling

The `apiFetch` wrapper in `lib/api.ts` detects 429 responses and throws a `RateLimitError` with the `Retry-After` value. The UI should:

1. Show a toast notification: "Too many requests. Please slow down."
2. Display the retry-after duration (e.g. "Wait 5 seconds")
3. Disable the triggering button/input for the retry period
4. Not trigger the automatic token refresh (429 is not a 401)

---

## WebSocket rate limiting

The WebSocket conversation endpoint (`/ws/conversation`) is **not** rate-limited by slowapi (slowapi operates at the HTTP layer). Instead, protection is provided by:

- **JWT authentication**: only authenticated users can connect
- **Session timeouts**: max duration (30 min default) and inactivity (3 min default) prevent indefinite connections
- **Concurrent connections**: natural limit from user session timeouts

---

## Self-hosted considerations

Since FreeLingo is self-hosted (typically single admin + few users):

- **Defaults are generous** — limits prevent abuse, not normal usage. A single user doing flashcards review generates approximately 1-2 requests/second, well within limits.
- **In-memory storage** — no extra infrastructure needed. Process restart loses counters (acceptable for self-hosted — the application restarts infrequently).
- **Redis backend optional** — set `RATE_LIMIT_STORAGE=redis` if running multiple backend instances behind a load balancer.
- **Disable fully** — set `RATE_LIMIT_ENABLED=false` if rate limiting causes issues in a trusted environment.
- Limits are environment-configurable, not hardcoded — adjust in `.env` if the defaults don't match the deployment scale.