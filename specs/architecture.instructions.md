---
description: "Core architecture reference for FreeLingo: repository structure, database models, service layer, LLM adapter, auth design, data flow, code standards, and test configuration. API endpoints are documented in api-endpoints.instructions.md."
applyTo: "backend/**, frontend/**"
---

# Architecture — FreeLingo

> API endpoints are documented separately in [api-endpoints.instructions.md](api-endpoints.instructions.md).

## Repository structure

```
freelingo/
├── backend/                     # Python 3.14 FastAPI
│   ├── app/
│   │   ├── core/                # Config, DB engine, security, deps, rate limiter
│   │   ├── models/              # SQLAlchemy 2.0 ORM models (18 model classes)
│   │   ├── schemas/             # Pydantic v2 request/response schemas
│   │   ├── routers/             # 18 routers (17 REST + 1 WebSocket)
│   │   └── services/            # Business logic + external service clients (16 modules)
│   │   └── data/
│   │       └── en/              # Static curriculum and content data
│   ├── alembic/
│   │   └── versions/            # DB migrations (22)
│   └── tests/                   # pytest suite (26 test files)
│
├── frontend/                    # Next.js 16 App Router
│   ├── src/
│   │   ├── app/
│   │   │   ├── (auth)/          # Public routes: login, register, onboarding, verify-email...
│   │   │   ├── (app)/           # Authenticated routes (16 pages) — sidebar layout
│   │   │   │   ├── admin/users/ # User management (admin only)
│   │   │   │   ├── admin/feedback/ # Feedback board admin panel (admin only)
│   │   │   │   ├── assessment/  # Level test entry + adaptive quiz
│   │   │   │   ├── chat/        # AI tutor chat (SSE streaming, conversation history)
│   │   │   │   ├── conversation/ # Real-time voice conversation (WebSocket + VAD)
│   │   │   │   ├── dashboard/   # Home with XP, streak, plan summary
│   │   │   │   ├── faq/
│   │   │   │   ├── feedback/    # Feature requests & bug reports board
│   │   │   │   ├── flashcards/
│   │   │   │   ├── grammar/     # Grammar reference (index + [slug] detail)
│   │   │   │   ├── lesson/[id]/ # Lesson player
│   │   │   │   ├── phrasebook/
│   │   │   │   ├── plan/        # Study plan + unit drawer
│   │   │   │   ├── progress/    # Skills tracker
│   │   │   │   ├── settings/    # Profile, avatar, conversation settings
│   │   │   │   └── vocabulary/  # Vocabulary hub (index + [setId] detail)
│   │   │   ├── (legal)/         # Terms and Privacy pages — minimal layout
│   │   │   └── api/             # Next.js Route Handlers: chat (SSE), tts, stt proxies
│   │   ├── components/
│   │   │   ├── assessment/      # AdaptiveQuizCard, BeginnerGate, DurationSelector
│   │   │   ├── conversation/    # ConversationMode, MicButton, StatusIndicator, TranscriptBubble...
│   │   │   ├── plan/            # LevelTestBanner, UnitCard, UnitDrawer
│   │   │   ├── ui/              # shadcn/ui + custom: AudioPlayer, VoiceRecorder, confirm-dialog...
│   │   │   ├── TargetLanguageSelector.tsx
│   │   │   └── ThemeProvider.tsx
│   │   ├── data/                # Static content: curriculum, grammar, vocab, phrasebook...
│   │   ├── store/               # Zustand stores: auth, theme, progress, loading
│   │   ├── lib/                 # Utilities: apiFetch, conversation-ws, audio, target-languages, utils
│   │   ├── i18n/                # next-intl locale resolver
│   │   └── middleware.ts        # Auth guard + locale detection
│   ├── tests/                   # Vitest suite (7 test files, critical logic only)
│   │   ├── setup.ts             # Global mocks: localStorage, next/navigation
│   │   ├── lib/                 # Tests for lib/ utilities
│   │   ├── store/               # Tests for Zustand stores
│   │   └── middleware.test.ts
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

## Database models

The application uses 18 SQLAlchemy ORM models organized into 5 domains:

- **Core**: User (authentication, preferences, quotas), Progress (daily XP/streak/skills)
- **Study plan**: StudyPlan, Lesson, Exercise, UserCompetency (curriculum tracking)
- **Spaced repetition**: Flashcard (SM-2 algorithm)
- **Conversations**: Conversation, ChatHistory (text and voice transcripts)
- **AI-generated content**: ListeningExercise, ListeningAttempt, ReadingExercise, ReadingAttempt (shared exercise pools)
- **Community**: FeedbackEntry, FeedbackVote, FeedbackComment (feature requests and bug reports)
- **LLM**: Memory (persistent context), LLMUsage (token audit trail)

All models use SQLAlchemy 2.0 declarative style with `Mapped[T]` type annotations. PostgreSQL JSON columns store structured content for lessons, plans, exercises, and skill scores.

For complete schema details, relationships, constraints, and business rules, see [database-models.instructions.md](database-models.instructions.md).

---

## Service layer

All external dependencies are accessed through the service layer. The frontend never calls Ollama, Kokoro, or Whisper directly — the backend is the single gateway.

The application uses 16 services organized into 5 domains:

- **LLM & AI**: LLM Adapter (multi-provider), Assessment, Study Plan Generator, Lesson Generator, Flashcard SM-2
- **Media**: TTS Service, STT Service, Conversation Pipeline (WebSocket voice orchestrator)
- **Content**: Listening Service, Reading Service (AI-generated exercises with caching)
- **User**: Progress Service, Memory Service, Quota Service, Subscription Service
- **Infrastructure**: Language Helpers, Email Service, Logging & Observability

Key architectural decisions:
- **LLM Adapter** is a singleton with provider-agnostic interface (Ollama, OpenAI, Anthropic, DeepSeek)
- **Study Plan Generator** and **Lesson Generator** are deterministic within curriculum constraints
- **TTS/STT services** abstract local (Kokoro/Whisper) and cloud (OpenAI) providers behind common interfaces
- **Conversation Pipeline** orchestrates real-time voice: STT → LLM streaming → sentence splitting → TTS → barge-in support

For complete service details, APIs, and implementation notes, see [services.instructions.md](services.instructions.md).

---

## Data flow — Complete assessment → study

```
User visits /assessment
    ↓
Step 1: BeginnerGate ("Have you studied English before?")
    ↓ No → skip to A1, create plan directly
    ↓ Yes → continue
    ↓
Step 2: Adaptive quiz (12 questions, drawn from static assessment-bank.ts)
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

---

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
- `require_subscription` — calls `check_maintenance_mode` before the subscription check. Both the HTTP endpoints (chat, listening, reading) and the WebSocket (`/ws/conversation`) are protected.

**Frontend**: `MaintenanceGate` component renders a static banner when `maintenance_mode` is true. Applied on top of `PaywallGate` in the four subscription-gated pages: `/chat`, `/conversation`, `/listening`, `/reading`.

**Public exposure**: `GET /api/config` returns `maintenance_mode: bool` so the frontend can read the state without an authenticated request.

---

## Code standards

### Backend (Python 3.14)

| Tool | Purpose |
|------|---------|
| ruff | Linting + isort + pyupgrade (rules: E, W, F, I, UP, B, S, ANN) |
| black | Code formatting (line-length 100) |

- ANN101 (missing self type annotation) ignored globally.
- S and ANN rules disabled in `tests/` directory.

### Frontend (TypeScript / Next.js 16)

| Tool | Purpose |
|------|---------|
| ESLint | TypeScript linting + Next.js rules |
| Prettier | Code formatting + `prettier-plugin-tailwindcss` |

- No semicolons, single quotes, 2-space tabs, trailing commas "es5".
- shadcn/ui components installed: `button card input progress badge separator sheet tabs`.

#### Page content width convention

Every page wrapper uses `mx-auto` plus one of three canonical widths. Do not use other sizes:

| Class | Width | Use for |
|-------|-------|---------|
| `max-w-4xl` | 896 px | Index/overview pages with grids or card layouts (dashboard, grammar, vocabulary, phrasebook, progress) |
| `max-w-3xl` | 768 px | Admin list pages (admin/users, admin/feedback) |
| `max-w-2xl` | 672 px | Detail pages, forms, long-form content (lesson, grammar detail, settings, feedback, flashcards, faq, plan) |

Full-screen interactive experiences (conversation, chat, listening, reading, assessment) are exempt — they manage their own layout internally.

---

## Tests

Testing infrastructure and strategy are documented in [testing.instructions.md](testing.instructions.md).

**Summary:**
- **Backend**: pytest + pytest-asyncio, 26 test files, 341 tests, 73% coverage (target: 60%)
- **Frontend**: Vitest, 7 test files, 54 tests covering critical logic only
- **E2E**: Playwright (planned, not yet implemented)

---

## Environment variables

All configuration is environment-driven. Key variables:

| Variable | Default | Purpose |
|----------|---------|---------|
| DATABASE_URL | — | asyncpg connection string |
| REDIS_URL | redis://localhost:6379/0 | Redis connection string |
| SECRET_KEY | — | JWT signing key (HS256) |
| ACCESS_TOKEN_EXPIRE_MINUTES | 15 | JWT lifetime |
| REFRESH_TOKEN_EXPIRE_DAYS | 30 | Refresh token TTL |
| ALLOW_REGISTRATION | true | Enables/disables public signups |
| FIRST_USER_IS_ADMIN | true | Auto-admin for first user |
| BLOCKED_EMAIL_DOMAINS | [] | JSON array of blocked email domains (disposable/temporary providers) |
| COOKIE_SECURE | false | Set `Secure` flag on cookies (enable in production behind HTTPS) |
| LLM_PROVIDER | ollama | `ollama` / `openai` / `anthropic` / `deepseek` |
| OLLAMA_BASE_URL | http://host.docker.internal:11434 | Ollama API endpoint |
| OLLAMA_MODEL | gemma4:e4b | Model tag to use with Ollama |
| OPENAI_API_KEY | `` | OpenAI API key (also reused for TTS/STT when provider is `openai`) |
| OPENAI_MODEL | gpt-4o-mini | OpenAI chat model |
| ANTHROPIC_API_KEY | `` | Anthropic API key |
| ANTHROPIC_MODEL | claude-3-5-haiku-latest | Anthropic chat model |
| DEEPSEEK_API_KEY | `` | DeepSeek API key |
| DEEPSEEK_MODEL | deepseek-chat | DeepSeek chat model |
| TTS_PROVIDER | local | `local` (Kokoro) or `openai` |
| TTS_BASE_URL | http://kokoro:8880 | Kokoro-FastAPI endpoint (local provider) |
| TTS_VOICE | af_heart | Kokoro voice ID (local provider) |
| OPENAI_TTS_MODEL | tts-1 | OpenAI TTS model (openai provider) |
| OPENAI_TTS_VOICE | nova | OpenAI TTS voice (openai provider) |
| OPENAI_TTS_SPEED | 1.0 | OpenAI TTS playback speed (openai provider) |
| STT_PROVIDER | local | `local` (Whisper) or `openai` |
| STT_BASE_URL | http://whisper:9000 | Whisper ASR endpoint (local provider) |
| OPENAI_STT_MODEL | whisper-1 | OpenAI STT model (openai provider) |
| STRIPE_ENABLED | false | Enable Stripe paywall; `false` = all active users have full access |
| STRIPE_SECRET_KEY | `` | Stripe secret key |
| STRIPE_WEBHOOK_SECRET | `` | Stripe webhook signing secret |
| STRIPE_PRICE_MONTHLY | `` | Stripe Price ID for monthly plan |
| STRIPE_PRICE_YEARLY | `` | Stripe Price ID for yearly plan |
| STRIPE_TRIAL_DAYS | 7 | Free trial duration in days |
| STRIPE_BASE_URL | http://localhost:3000 | Frontend base URL used in Stripe redirect URLs |
| EMAIL_ENABLED | false | Enable SMTP email (verification + password reset + contact form) |
| CONTACT_EMAIL | — | Destination address for contact form submissions |
| SMTP_HOST | localhost | SMTP server hostname |
| SMTP_PORT | 587 | SMTP server port |
| SMTP_USER | — | SMTP username |
| SMTP_PASSWORD | — | SMTP password |
| SMTP_FROM | noreply@freelingo.app | From address for outgoing emails |
| SMTP_TLS | true | Use STARTTLS |
| SMTP_SSL | false | Use implicit SSL (port 465) |
| APP_BASE_URL | http://localhost:3000 | Public frontend URL (used in email links) |
| AUDIO_STORAGE_PATH | /data/audio | Docker volume path for generated listening MP3 files |
| RATE_LIMIT_ENABLED | true | Enable slowapi rate limiting |
| CORS_ORIGINS | ["http://localhost:3000"] | Allowed CORS origins (JSON array) |
| LOG_LEVEL | INFO | Application log level (`DEBUG`, `INFO`, `WARNING`, `ERROR`) |