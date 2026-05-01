# AGENTS.md — FreeLingo

## Project state

**Planning stage — zero source code.** The repo contains detailed specs in `specs/` but no `backend/`, `frontend/`, `docker-compose.yml`, or `.env.example` have been created yet. All work starts from scaffolding.

## Architecture at a glance

Monorepo: `backend/` (Python FastAPI) + `frontend/` (Next.js 14 App Router) deployed via Docker Compose with PostgreSQL 16 and Redis 7. The backend proxies all external services (Ollama, Kokoro, Whisper) — the frontend never calls them directly.

## Key constraints

- **Target language is always English.** User's native language (asked at registration) is used only for flashcard translations and tutor feedback.
- **First registered user becomes admin automatically** when `FIRST_USER_IS_ADMIN=true` (default).
- **Registration gating**: `ALLOW_REGISTRATION=false` blocks public signups; admin creates users or generates single-use invite links (48h expiry in Redis).
- **Ollama should run on the host for GPU access**, accessed via `host.docker.internal:11434`. On Linux, the backend service needs `extra_hosts: ["host.docker.internal:host-gateway"]`.

## Spec files (authoritative)

Read these before implementing — they are the source of truth:

| File | Covers |
|------|--------|
| `specs/architecture.instructions.md` | DB models, API endpoints, LLM adapter, auth design, code standards, test config |
| `specs/docker.instructions.md` | docker-compose.yml (all phases), `.env.example`, DB migrations, operational notes |
| `specs/phase-1-platform.instructions.md` | Phase 1: scaffolding through frontend, prompts, SM-2, SSE chat, frontend components |
| `specs/phase-2-tts-stt.instructions.md` | Phase 2: Kokoro TTS, faster-whisper STT, pronunciation exercises |
| `specs/phase-1-plus.instructions.md` | Phase 1+: Learning Resources Hub — Grammar Reference, Vocabulary Hub, Phrasebook, Skills Tracker, Level Completion Test |
| `specs/phase-3-conversation.instructions.md` | Phase 3: WebSocket voice pipeline, VAD, barge-in, gapless audio |
| `specs/roadmap.instructions.md` | Development roadmap with milestones and completion criteria per phase |
| `specs/changelog.instructions.md` | Changelog format, entry style, and update rules |
| `specs/readme.instructions.md` | README structure, badges, and update guidelines |
| `specs/testing.instructions.md` | Testing strategy: pytest, Vitest, Playwright, fixtures, mocks, CI (pending) |
| `specs/llm-error-handling.instructions.md` | LLM failure modes: malformed JSON, timeouts, retries, context overflow |
| `specs/rate-limiting.instructions.md` | slowapi-based rate limits per-endpoint, self-hosted defaults |

## Phase 1 development order

1. **Scaffolding** — Create `backend/`, `frontend/`, `docker-compose.yml`, `.env.example`
2. **Backend core** — `core/config.py`, `core/database.py` (async SQLAlchemy + asyncpg), `core/security.py` (JWT + bcrypt), `core/deps.py`, LLM adapter singleton
3. **Auth** — `routers/auth.py` (register, login, refresh, logout, me), `routers/admin.py`
4. **Models** — User, StudyPlan, Lesson, Exercise, Flashcard, Progress (SQLAlchemy async ORM)
5. **Assessment** — Adaptive quiz (static bank) + deterministic CEFR evaluation + duration selector
6. **Study plan** — Curriculum-driven plan from `data/curriculum.py` + `data/curriculum.ts`
7. **Lessons** — LLM lesson content generation within curriculum constraints, free-write evaluation
8. **Flashcards** — SM-2 implementation, LLM generation with native-language translations
9. **Chat** — SSE streaming tutor with progress-aware system prompt
10. **Frontend Phase 1** — Auth, assessment, `/plan` roadmap, lesson, flashcards, chat screens
11. **Frontend Phase 1+** — Grammar Reference, Vocabulary Hub, Phrasebook, Skills Tracker, Level Test

Run migrations after first backend startup: `docker compose exec backend alembic upgrade head`

## Development environment constraints

- **No Docker locally.** The development machine does not have Docker installed. Never suggest `docker` or `docker compose` commands to run locally.
- **Not deployed locally.** The application runs in a remote server; the dev machine is used only for editing and pushing code. CI/CD (GitHub Actions) builds and publishes the Docker images.
- **Cannot test the running app locally.** Validation is limited to static checks: `npx tsc --noEmit` (frontend) and `python3 -m compileall app/ alembic/ -q` (backend).
- **package-lock.json must be generated with npm 11** (the version installed locally). The Dockerfile upgrades npm to v11 before `npm ci` to stay in sync.

## Commands

```bash
# Lint & format backend
ruff check --fix backend/ && black backend/

# Lint & format frontend
npx eslint src/ --ext .ts,.tsx && npx prettier --write src/

# Run all backend tests (coverage must be ≥70%)
cd backend && pytest

# Run single test file
pytest tests/test_auth.py -v

# DB migrations (run on the remote server, not locally)
docker compose exec backend alembic revision --autogenerate -m "description"
docker compose exec backend alembic upgrade head
```

## Auth design (do not deviate)

| Token | Type | Duration | Storage |
|-------|------|----------|---------|
| `access_token` | JWT HS256 | 15 min | Zustand store (JS memory) |
| `refresh_token` | Opaque UUID4 | 30 days | httpOnly cookie + Redis (`refresh:{token}` → user_id) |

- Access token verified without DB hit (JWT decode only).
- Refresh tokens stored in Redis with native TTL for auto-expiry.
- **On refresh: old token deleted, new token created** (rotation + replay detection).
- Logout deletes the refresh token from Redis and clears the cookie.
- Frontend interceptor: on 401, silent refresh → retry. Redirect to `/login` if refresh fails.

## Code standards (non-default choices)

- **Python**: ruff with rules `E, W, F, I, UP, B, S, ANN` (ANN101 ignored). Black line-length 100. S and ANN rules disabled in `tests/`.
- **TypeScript**: no semicolons, single quotes, 2-space tabs, trailing commas es5. `prettier-plugin-tailwindcss` required.
- **shadcn/ui** components must be installed: `button card input progress badge separator sheet tabs`.

## Phase 2+ services (commented out until needed)

`kokoro` (TTS) and `whisper` (STT) services are commented out in `docker-compose.yml`. Uncomment and set `TTS_ENABLED=true` / `STT_ENABLED=true` in `.env` when reaching Phase 2. Both require `deploy.resources.reservations.devices` with `driver: nvidia` for GPU.