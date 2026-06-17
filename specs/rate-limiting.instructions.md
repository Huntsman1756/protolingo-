---
description: "Rate limiting strategy for FreeLingo: slowapi with in-memory storage by default, per-endpoint limits for auth, LLM-heavy/light operations, flashcards, admin, TTS/STT, and a default global limit."
applyTo: "backend/app/main.py, backend/app/core/config.py, backend/app/core/limiter.py"
---

# Rate Limiting — FreeLingo

## Approach

Uses [**slowapi**](https://github.com/laurentS/slowapi) (built on `limits`, Rust backend). Storage is always **Redis** — the `storage_uri` is set directly to `settings.REDIS_URL`. Redis is already a required dependency (refresh tokens), so there is no additional infrastructure cost.

### Configuration

| Variable             | Default | Purpose                               |
| -------------------- | ------- | ------------------------------------- |
| `RATE_LIMIT_ENABLED` | `true`  | Enable/disable rate limiting entirely |

The global default limit is 200 requests/minute for all endpoints without an explicit `@limiter.limit()` decorator.

### Key strategies

- **IP-based limiting**: used for unauthenticated endpoints (login, register, email verification) where no user context exists
- **User-based limiting**: used for authenticated endpoints, keyed by `user_id` from JWT. More precise than IP since multiple users may share an IP (self-hosted scenario)
- **Redis storage**: counters persist across restarts and are shared across backend instances
- **Disable option**: set `RATE_LIMIT_ENABLED=false` to remove all limits (for development or trusted environments)

---

## Per-endpoint limits

Only endpoints with explicit `@limiter.limit()` decorators override the global default. Everything else falls back to 200 requests/minute.

| Endpoint                             | Limit        | Key type | Rationale                                                                                               |
| ------------------------------------ | ------------ | -------- | ------------------------------------------------------------------------------------------------------- |
| `POST /api/auth/register`            | 5 / minute   | IP       | Prevent account-creation abuse; invite token provides additional gating                                 |
| `POST /api/auth/login`               | 10 / minute  | IP       | Prevent brute-force on credentials                                                                      |
| `POST /api/auth/refresh`             | 20 / minute  | IP       | Token rotation — higher limit to avoid disrupting normal SPA refresh cycles                             |
| `GET /api/auth/verify-email`         | 10 / minute  | IP       | Prevent token-probing abuse                                                                             |
| `POST /api/auth/resend-verification` | 3 / minute   | IP       | Prevent email-sending abuse                                                                             |
| `POST /api/auth/forgot-password`     | 5 / minute   | IP       | Prevent email enumeration / spam                                                                        |
| `POST /api/auth/reset-password`      | 5 / minute   | IP       | Prevent token-brute-force                                                                               |
| `GET /api/admin/stats`               | 60 / minute  | IP       | Admin-only operational overview metrics                                                                 |
| `GET /api/admin/users`               | 60 / minute  | IP       | Admin-only paginated user management with search and filters (`q`, `subscription`, `role`, `is_active`) |
| `GET /api/feedback`                  | 60 / minute  | IP       | Authenticated feedback board listing with search and filters (`q`, `type`, `status`, `sort`, `order`)   |
| `POST /api/tts`                      | 20 / minute  | User     | Audio generation (computationally expensive)                                                            |
| `POST /api/stt`                      | 20 / minute  | User     | Audio transcription (computationally expensive)                                                         |
| All other endpoints                  | 200 / minute | IP       | Global default catch-all                                                                                |

---

## Rate limit key selection

- **IP-based** (`_get_real_ip`): used for public endpoints where no user is authenticated. Applied to: login, register, refresh, logout. The key function reads `X-Real-IP` first (set by a trusted reverse proxy), then `X-Forwarded-For`, then the socket address as a fallback. This ensures correct IP identification behind Traefik/nginx.
- **User-based** (`get_user_key` → `str(current_user.id)`): used for all authenticated endpoints. More granular than IP and survives IP changes.

The rate limiter is configured globally with `key_func=_get_real_ip` as the default; user-based endpoints override this with `key_func=get_user_key` on each decorator.

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

- **Defaults are generous** — limits prevent abuse, not normal usage.
- **Redis storage** — counters persist across restarts and are shared across backend instances. Redis is already required for auth (refresh tokens), so no extra infrastructure is needed.
- **Disable fully** — set `RATE_LIMIT_ENABLED=false` if rate limiting causes issues in a trusted environment.
