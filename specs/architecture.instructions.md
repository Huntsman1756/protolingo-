---
description: "General architecture overview: repository structure, data flows, auth design, and test summary. Backend-specific detail lives in architecture-backend.instructions.md; frontend-specific detail in architecture-frontend.instructions.md."
applyTo: "backend/**, frontend/**"
---

# Architecture — FreeLingo

This is the general architecture reference — the project "organigram". For backend-specific architecture (models, services, routers, env vars, Python standards) see [architecture-backend.instructions.md](architecture-backend.instructions.md). For frontend-specific architecture (pages, components, stores, TypeScript standards) see [architecture-frontend.instructions.md](architecture-frontend.instructions.md).

> API endpoints are documented separately in [api-endpoints.instructions.md](api-endpoints.instructions.md).

## Repository structure

```
freelingo/
├── backend/                     # Python 3.14 FastAPI
│   ├── app/
│   │   ├── core/                # Config, DB engine, security, deps, rate limiter (7 modules)
│   │   ├── models/              # SQLAlchemy 2.0 ORM models (14 files, 20 model classes)
│   │   ├── schemas/             # Pydantic v2 request/response schemas (14 modules)
│   │   ├── routers/             # 22 routers (21 REST + 1 WebSocket)
│   │   ├── services/            # Business logic + external service clients (17 modules)
│   │   └── data/                # Static curriculum and content data (4 languages)
│   │       ├── en/              # English curriculum (A1–C2)
│   │       ├── es/              # Spanish curriculum (A1–C2)
│   │       ├── it/              # Italian curriculum (A1–C2)
│   │       └── pt/              # Portuguese curriculum (A1–C2)
│   ├── alembic/
│   │   └── versions/            # DB migrations (31)
│   └── tests/                   # pytest suite (33 test files, 705 tests)
│
├── frontend/                    # Next.js 16 App Router
│   ├── src/
│   │   ├── app/
│   │   │   ├── (auth)/          # Public routes: login, register, onboarding, verify-email, forgot-password, reset-password, billing (7 pages)
│   │   │   ├── (app)/           # Authenticated routes (17 pages) — sidebar layout
│   │   │   │   ├── admin/users/ # User management (admin only)
│   │   │   │   ├── admin/feedback/ # Feedback board admin panel (admin only)
│   │   │   │   ├── assessment/  # Level test entry + adaptive quiz
│   │   │   │   ├── chat/        # AI tutor chat (SSE streaming, conversation history)
│   │   │   │   ├── conversation/ # Real-time voice conversation (WebSocket + VAD)
│   │   │   │   ├── dashboard/   # Home with XP, streak, plan summary
│   │   │   │   ├── faq/         # Frequently asked questions
│   │   │   │   ├── feedback/    # Feature requests & bug reports board
│   │   │   │   ├── flashcards/  # Spaced-repetition flashcard review
│   │   │   │   ├── grammar/     # Grammar reference (index + [slug] detail)
│   │   │   │   ├── lesson/[id]/ # Lesson player
│   │   │   │   ├── listening/   # AI-generated listening exercises
│   │   │   │   ├── phrasebook/  # Phrasebook
│   │   │   │   ├── plan/        # Study plan + unit drawer
│   │   │   │   ├── progress/    # Skills tracker
│   │   │   │   ├── reading/     # AI-generated reading exercises
│   │   │   │   ├── settings/    # Profile, avatar, conversation settings
│   │   │   │   └── vocabulary/  # Vocabulary hub (index + [setId] detail)
│   │   │   ├── (legal)/         # Terms and Privacy pages — minimal layout
│   │   │   └── api/             # Next.js Route Handlers: chat (SSE), tts, stt proxies
│   │   ├── components/          # 11 component directories + 4 standalone files
│   │   ├── data/                # Data access layer (API-backed for curriculum, vocab, phrasebook; static for grammar)
│   │   ├── store/               # Zustand stores: auth, config, language, loading, progress, theme (6)
│   │   ├── lib/                 # Utilities: api, audio, conversation-ws, locales, mappers, target-languages, utils (7)
│   │   ├── i18n/                # next-intl locale resolver
│   │   └── middleware.ts        # Auth guard + locale detection
│   ├── tests/                   # Vitest suite (16 test files, 325 tests)
│   ├── public/                  # Static assets (flags/, vad/ WASM models)
│   └── scripts/                 # Postinstall helpers (copy-vad-models.js)
│
├── messages/                    # i18n bundles (en, es, fr, pt, de, it, nl, pl, ro, ru)
├── specs/                       # Architecture and phase specification files
├── docs/                        # Documentation site
├── assets/                      # Logo and branding
├── .github/                     # CI/CD workflows (GitHub Actions)
├── docker-compose.yml
├── .env.example
├── AGENTS.md                    # Agent instructions for AI assistants
├── CHANGELOG.md
└── README.md
```

## Data flow — Complete assessment → study

```
User visits /assessment
    ↓
Step 1: BeginnerGate ("Have you studied English before?")
    ↓ No → skip to A1, create plan directly
    ↓ Yes → continue
    ↓
Step 2: Adaptive quiz (15 questions, fetched from GET /api/assessment/bank)
    ↓
Step 3: Duration selector (4/8/12/16 weeks) + goals selection
    ↓
POST /api/assessment/complete → creates StudyPlan
    ↓
POST /api/study-plan/generate
    ↓
StudyPlanGenerator: distribute_units() from curriculum.py
    ↓ (deterministic — no LLM)
Persists StudyPlan with week-by-week DayPlan structure
    ↓
GET /api/study-plan/today → returns lessons for current day
    ↓ (auto-generates lesson content via LLM on first access)
LessonGenerator → LLM Adapter → structured lesson content
    ↓
Persists Lesson + Exercises in PostgreSQL
    ↓
Frontend ← Lesson content + exercises
```

## Data flow — Voice conversation

```
User opens /conversation
    ↓
Frontend: ConversationMode loads VAD (onnxruntime-web WASM)
    ↓
WebSocket connects to /ws/conversation?token=<jwt>
    ↓
Backend validates TTS_ENABLED && STT_ENABLED
    ↓
User speaks → VAD detects speech → sends WAV chunks via WS
    ↓
ConversationPipeline:
  STT Service: WAV → text
  LLM Adapter: text → streaming response (sentence-by-sentence)
  TTS Service: each sentence → MP3
    ↓
MP3 chunks sent back via WebSocket
  Frontend: AudioQueue schedules gapless playback
    ↓
Barge-in: user speaks again → cancel current generation
```

## Auth design

| Token | Type | Algorithm | Duration | Storage |
|-------|------|-----------|----------|---------|
| access_token | JWT | HS256 | 15 min | Zustand store (JS memory) |
| refresh_token | Opaque UUID4 | random | 30 days | httpOnly cookie + Redis: `refresh:{token}` → user_id |
| email verification | Opaque UUID4 | random | 24 h | Redis: `verify_email:{token}` → user_id |
| password reset | Opaque UUID4 | random | 1 h | Redis: `reset_password:{token}` → user_id |
| maintenance mode | bool flag | — | indefinite | Redis: `maintenance_mode` → `"1"` or `"0"` |

**Design rationale:**
- **Access token**: verified without DB hit (JWT decode only). Short lifetime limits damage if leaked.
- **Refresh token**: stored in Redis with native TTL for auto-expiry. Opaque (not JWT) so no sensitive data in the cookie.
- **Token rotation**: on refresh, old token is deleted from Redis and a new one is created — prevents replay attacks.
- **Logout**: deletes the refresh token from Redis and clears the cookie.
- **Frontend interceptor** (`apiFetch`): on 401 response, silently refreshes the access token and retries the request. On refresh failure, redirects to `/login`.

### Maintenance mode

Stored as a simple Redis flag (`maintenance_mode` = `"1"` / `"0"`). Toggled by the admin at runtime via `PATCH /api/admin/maintenance` — no restart required.

**Backend guard** (`app/core/deps.py`):
- `get_redis()` — centralized async Redis dependency.
- `check_maintenance_mode()` — raises HTTP 503 when `maintenance_mode == "1"`. Swallows Redis errors to fail open.
- `require_subscription` — calls `check_maintenance_mode` before the subscription check. Both HTTP endpoints (chat, listening, reading) and the WebSocket (`/ws/conversation`) are protected.

**Frontend**: `MaintenanceGate` component renders a static banner when `maintenance_mode` is true. Applied on top of `PaywallGate` in the four subscription-gated pages: `/chat`, `/conversation`, `/listening`, `/reading`.

**Public exposure**: `GET /api/config` returns `maintenance_mode: bool` so the frontend can read the state without an authenticated request.

---

## Tests

Testing infrastructure and strategy are documented in [testing.instructions.md](testing.instructions.md).

**Summary:**
- **Backend**: pytest + pytest-asyncio, 33 test files, 705 tests, 83% coverage (target: 70%)
- **Frontend**: Vitest, 16 test files, 325 tests covering stores, components, lib, and middleware
- **E2E**: Playwright (planned, not yet implemented)