---
description: "Backend architecture reference for FreeLingo: directory structure, database models, service layer, routers, schemas, core modules, code standards, environment variables, and test configuration."
applyTo: "backend/**"
---

# Architecture — Backend

> The general architecture overview (repository structure, data flows, auth design) lives in [architecture.instructions.md](architecture.instructions.md). Frontend-specific architecture lives in [architecture-frontend.instructions.md](architecture-frontend.instructions.md).
>
> API endpoints are documented separately in [api-endpoints.instructions.md](api-endpoints.instructions.md).
> Database model details are in [database-models.instructions.md](database-models.instructions.md).
> Service details are in [services.instructions.md](services.instructions.md).

## Directory structure

```
backend/
├── app/
│   ├── core/                    # Config, DB engine, security, deps, rate limiter
│   │   ├── __init__.py
│   │   ├── config.py            # Pydantic Settings — all env vars defined here
│   │   ├── database.py          # SQLAlchemy async engine + session factory
│   │   ├── deps.py              # FastAPI dependencies: get_redis, get_current_user, check_maintenance_mode, require_subscription
│   │   ├── security.py          # JWT encode/decode, password hashing
│   │   ├── app_logger.py        # Structured logging (structlog)
│   │   └── limiter.py           # slowapi rate limiter setup
│   │
│   ├── models/                  # SQLAlchemy 2.0 ORM models (19 model classes)
│   │   ├── __init__.py
│   │   ├── user.py              # User, UserPreferences, user quotas, avatar
│   │   ├── user_language.py     # UserLanguage (phase 10: multi-language learning)
│   │   ├── progress.py          # Progress (daily XP, streak, skills JSON)
│   │   ├── study_plan.py        # StudyPlan, DayPlan (week-by-week JSON)
│   │   ├── lesson.py            # Lesson + Exercise
│   │   ├── competency.py        # UserCompetency (curriculum tracking)
│   │   ├── flashcard.py         # Flashcard (SM-2 algorithm)
│   │   ├── conversation.py      # Conversation (voice sessions)
│   │   ├── chat_history.py      # ChatHistory (text chat messages)
│   │   ├── listening.py         # ListeningExercise, ListeningAttempt
│   │   ├── reading.py           # ReadingExercise, ReadingAttempt
│   │   ├── feedback.py          # FeedbackEntry, FeedbackVote, FeedbackComment
│   │   ├── memory.py            # Memory (persistent LLM context)
│   │   └── llm_usage.py         # LLMUsage (token audit trail)
│   │
│   ├── schemas/                 # Pydantic v2 request/response schemas (13 modules)
│   │   ├── __init__.py
│   │   ├── auth.py
│   │   ├── admin.py
│   │   ├── assessment.py
│   │   ├── chat.py
│   │   ├── feedback.py
│   │   ├── flashcards.py
│   │   ├── language.py
│   │   ├── lessons.py
│   │   ├── listening.py
│   │   ├── progress.py
│   │   ├── reading.py
│   │   ├── study_plan.py
│   │   └── tts_stt.py
│   │
│   ├── routers/                 # FastAPI routers (19 REST + 1 WebSocket = 20 total)
│   │   ├── __init__.py
│   │   ├── admin.py             # User management, maintenance toggle, system config
│   │   ├── assessment.py        # Level assessment quiz + completion
│   │   ├── auth.py              # Register, login, refresh, logout, verify-email, reset-password
│   │   ├── billing.py           # Stripe checkout, customer portal, webhook
│   │   ├── chat.py              # SSE chat streaming
│   │   ├── config.py            # Public config endpoint (maintenance mode, features)
│   │   ├── contact.py           # Contact form submission
│   │   ├── conversation.py      # WebSocket voice conversation
│   │   ├── feedback.py          # Feedback board CRUD
│   │   ├── flashcards.py        # Spaced-repetition flashcard CRUD + review
│   │   ├── health.py            # Health check
│   │   ├── languages.py         # Available target languages
│   │   ├── lessons.py           # Lesson content + exercise submission
│   │   ├── listening.py         # AI-generated listening exercises
│   │   ├── memories.py          # LLM memory management
│   │   ├── progress.py          # User progress, XP, streak, skills
│   │   ├── reading.py           # AI-generated reading exercises
│   │   ├── stt.py               # Speech-to-text proxy
│   │   ├── study_plan.py        # Study plan generation + today's lessons
│   │   └── tts.py               # Text-to-speech proxy
│   │
│   ├── services/                # Business logic + external service clients (17 modules)
│   │   ├── __init__.py
│   │   ├── assessment.py        # Adaptive quiz logic, CEFR level estimation
│   │   ├── conversation_pipeline.py  # WebSocket voice orchestrator: STT → LLM → TTS
│   │   ├── email_service.py     # SMTP email (verification, password reset, contact)
│   │   ├── flashcard_sm2.py     # SM-2 spaced repetition algorithm
│   │   ├── language_helpers.py  # Language code parsing, voice/engine selection
│   │   ├── lesson_generator.py  # LLM-powered lesson content generation
│   │   ├── listening_service.py # AI listening exercise generation + caching
│   │   ├── llm_adapter.py       # Multi-provider LLM interface (Ollama, OpenAI, Anthropic, DeepSeek)
│   │   ├── memory_service.py    # Autonomous LLM memory management
│   │   ├── progress_service.py  # XP calculation, streak logic, skill scoring
│   │   ├── quota_service.py     # Token quota tracking and enforcement
│   │   ├── reading_service.py   # AI reading exercise generation + caching
│   │   ├── stt_service.py       # Speech-to-text abstraction (local Whisper / OpenAI)
│   │   ├── study_plan_generator.py  # Deterministic unit distribution from curriculum
│   │   ├── subscription_service.py  # Stripe subscription management
│   │   ├── tts_service.py       # Text-to-speech abstraction (local Kokoro / OpenAI)
│   │   └── user_language_service.py # Multi-language study plan management (phase 10)
│   │
│   └── data/                    # Static curriculum and assessment content (4 languages)
│       ├── __init__.py
│       ├── _types.py             # Shared types (CEFRLevel, CurriculumUnit, AssessmentQuestion)
│       ├── curriculum.py         # Language-aware curriculum dispatcher
│       ├── assessment_bank.py    # Language-aware assessment bank dispatcher
│       ├── en/                   # English curriculum (46 units, A1–C2) + assessment bank (~100 questions)
│       ├── es/                   # Spanish curriculum (46 units, A1–C2) + assessment bank (~100 questions)
│       ├── it/                   # Italian curriculum (46 units, A1–C2) + assessment bank (~100 questions)
│       └── pt/                   # Portuguese curriculum (46 units, A1–C2) + assessment bank (~100 questions)
│
├── alembic/
│   └── versions/                # DB migrations (31 migrations)
│
└── tests/                       # pytest suite (31 test files, 677 tests)
```

## Database models

The application uses 19 SQLAlchemy ORM models organized into 5 domains:

- **Core**: User (authentication, preferences, quotas), Progress (daily XP/streak/skills)
- **Study plan**: StudyPlan, Lesson, Exercise, UserCompetency (curriculum tracking)
- **Spaced repetition**: Flashcard (SM-2 algorithm)
- **Conversations**: Conversation, ChatHistory (text and voice transcripts)
- **AI-generated content**: ListeningExercise, ListeningAttempt, ReadingExercise, ReadingAttempt (shared exercise pools)
- **Community**: FeedbackEntry, FeedbackVote, FeedbackComment (feature requests and bug reports)
- **LLM**: Memory (persistent context), LLMUsage (token audit trail)
- **Multi-language**: UserLanguage (phase 10 — enables learning multiple target languages per user)

All models use SQLAlchemy 2.0 declarative style with `Mapped[T]` type annotations. PostgreSQL JSON columns store structured content for lessons, plans, exercises, and skill scores.

For complete schema details, relationships, constraints, and business rules, see [database-models.instructions.md](database-models.instructions.md).

---

## Service layer

All external dependencies are accessed through the service layer. The frontend never calls Ollama, Kokoro, or Whisper directly — the backend is the single gateway.

The application uses 17 services organized into 5 domains:

- **LLM & AI**: LLM Adapter (multi-provider), Assessment, Study Plan Generator, Lesson Generator, Flashcard SM-2
- **Media**: TTS Service, STT Service, Conversation Pipeline (WebSocket voice orchestrator)
- **Content**: Listening Service, Reading Service (AI-generated exercises with caching)
- **User**: Progress Service, Memory Service, Quota Service, Subscription Service, User Language Service
- **Infrastructure**: Language Helpers, Email Service

Key architectural decisions:
- **LLM Adapter** is a singleton with provider-agnostic interface (Ollama, OpenAI, Anthropic, DeepSeek)
- **Study Plan Generator** and **Lesson Generator** are deterministic within curriculum constraints
- **TTS/STT services** abstract local (Kokoro/Whisper) and cloud (OpenAI) providers behind common interfaces
- **Conversation Pipeline** orchestrates real-time voice: STT → LLM streaming → sentence splitting → TTS → barge-in support

For complete service details, APIs, and implementation notes, see [services.instructions.md](services.instructions.md).

---

## Code standards (Python 3.14)

| Tool | Purpose |
|------|---------|
| ruff | Linting + isort + pyupgrade (rules: E, W, F, I, UP, B, S, ANN) |
| black | Code formatting (line-length 100) |

- ANN101 (missing self type annotation) ignored globally.
- S and ANN rules disabled in `tests/` directory.

---

## Tests

Testing infrastructure and strategy are documented in [testing.instructions.md](testing.instructions.md).

**Summary:**
- **Framework**: pytest + pytest-asyncio + httpx AsyncClient
- **Test files**: 31 (plus conftest.py for shared fixtures)
- **Tests**: 677
- **Coverage**: 83% (target: ≥70%)
- **Key fixtures**: async database session, test client with auth headers, Redis mock, user_language fixture

---

## Environment variables

All configuration is environment-driven. Variables are defined in `app/core/config.py` (Pydantic Settings). 49 variables total — the complete list below.

### Core

| Variable | Default | Purpose |
|----------|---------|---------|
| DATABASE_URL | — | asyncpg connection string |
| REDIS_URL | redis://localhost:6379/0 | Redis connection string |
| SECRET_KEY | — | JWT signing key (HS256) |
| ACCESS_TOKEN_EXPIRE_MINUTES | 15 | JWT lifetime |
| REFRESH_TOKEN_EXPIRE_DAYS | 30 | Refresh token TTL |
| CORS_ORIGINS | ["http://localhost:3000"] | Allowed CORS origins (JSON array) |
| COOKIE_SECURE | false | Set `Secure` flag on cookies |
| LOG_LEVEL | INFO | Application log level (`DEBUG`, `INFO`, `WARNING`, `ERROR`) |

### Auth & registration

| Variable | Default | Purpose |
|----------|---------|---------|
| ALLOW_REGISTRATION | true | Enables/disables public signups |
| FIRST_USER_IS_ADMIN | true | Auto-admin for first user |
| BLOCKED_EMAIL_DOMAINS | [] | JSON array of blocked email domains (disposable/temporary providers) |

### LLM

| Variable | Default | Purpose |
|----------|---------|---------|
| LLM_PROVIDER | ollama | `ollama` / `openai` / `anthropic` / `deepseek` |
| OLLAMA_BASE_URL | http://host.docker.internal:11434 | Ollama API endpoint |
| OLLAMA_MODEL | gemma4:e4b | Model tag to use with Ollama |
| OPENAI_API_KEY | `` | OpenAI API key (also reused for TTS/STT when provider is `openai`) |
| OPENAI_MODEL | gpt-4o-mini | OpenAI chat model |
| ANTHROPIC_API_KEY | `` | Anthropic API key |
| ANTHROPIC_MODEL | claude-3-5-haiku-latest | Anthropic chat model |
| DEEPSEEK_API_KEY | `` | DeepSeek API key |
| DEEPSEEK_MODEL | deepseek-chat | DeepSeek chat model |

### TTS

| Variable | Default | Purpose |
|----------|---------|---------|
| TTS_PROVIDER | local | `local` (Kokoro) or `openai` |
| TTS_BASE_URL | http://kokoro:8880 | Kokoro-FastAPI endpoint (local provider) |
| TTS_VOICE | af_heart | Kokoro voice ID (local provider) |
| OPENAI_TTS_MODEL | tts-1 | OpenAI TTS model (openai provider) |
| OPENAI_TTS_VOICE | nova | OpenAI TTS voice (openai provider) |
| OPENAI_TTS_SPEED | 1.0 | OpenAI TTS playback speed (openai provider) |

### STT

| Variable | Default | Purpose |
|----------|---------|---------|
| STT_PROVIDER | local | `local` (faster-whisper) or `openai` |
| STT_BASE_URL | http://whisper:9000 | Whisper ASR endpoint (local provider) |
| OPENAI_STT_MODEL | whisper-1 | OpenAI STT model (openai provider) |

> `STT_MODEL` and `STT_ENGINE` are Docker-level variables passed to the Whisper container — they are **not** consumed by the Python backend.

### Stripe

| Variable | Default | Purpose |
|----------|---------|---------|
| STRIPE_ENABLED | false | Enable Stripe paywall; `false` = all active users have full access |
| STRIPE_SECRET_KEY | `` | Stripe secret key |
| STRIPE_WEBHOOK_SECRET | `` | Stripe webhook signing secret |
| STRIPE_PRICE_MONTHLY | `` | Stripe Price ID for monthly plan |
| STRIPE_PRICE_YEARLY | `` | Stripe Price ID for yearly plan |
| STRIPE_TRIAL_DAYS | 7 | Free trial duration in days |
| STRIPE_BASE_URL | http://localhost:3000 | Frontend base URL used in Stripe redirect URLs |

### Email

| Variable | Default | Purpose |
|----------|---------|---------|
| EMAIL_ENABLED | false | Enable SMTP email (verification + password reset + contact form) |
| CONTACT_EMAIL | `` | Destination address for contact form submissions |
| SMTP_HOST | localhost | SMTP server hostname |
| SMTP_PORT | 587 | SMTP server port |
| SMTP_USER | `` | SMTP username |
| SMTP_PASSWORD | `` | SMTP password |
| SMTP_FROM | noreply@freelingo.app | From address for outgoing emails |
| SMTP_TLS | true | Use STARTTLS |
| SMTP_SSL | false | Use implicit SSL (port 465) |
| APP_BASE_URL | http://localhost:3000 | Public frontend URL (used in email links) |

### Other

| Variable | Default | Purpose |
|----------|---------|---------|
| RATE_LIMIT_ENABLED | true | Enable slowapi rate limiting |
| AUDIO_STORAGE_PATH | /data/audio | Docker volume path for generated listening MP3 files |
| AVAILABLE_TARGET_LANGUAGES | ["en-US","en-GB","es-ES","it-IT","pt-PT"] | BCP-47 codes of supported target languages |

### Docker-level variables (not consumed by Python backend)

| Variable | Default | Consumed by |
|----------|---------|-------------|
| POSTGRES_DB | freelingo | PostgreSQL container + DATABASE_URL composition |
| POSTGRES_USER | freelingo | PostgreSQL container + DATABASE_URL composition |
| POSTGRES_PASSWORD | — | PostgreSQL container + DATABASE_URL composition |
| DATA_PATH | /opt/docker/freelingo | Docker bind mounts for persistent data |
| REDIS_PASSWORD | — | Redis container + REDIS_URL composition |
| STT_MODEL | large-v3-turbo | Whisper Docker container (ASR_MODEL) |
| STT_ENGINE | faster_whisper | Whisper Docker container (ASR_ENGINE) |
| UVICORN_WORKERS | 4 | Docker entrypoint command |

For Docker configuration details, see [docker.instructions.md](docker.instructions.md).