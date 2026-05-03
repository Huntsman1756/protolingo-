---
description: "Complete architecture reference for FreeLingo: repository structure, database models, API endpoints (REST + WebSocket), service layer, LLM adapter, auth design, data flow, code standards, and test configuration."
applyTo: "backend/**, frontend/**"
---

# Architecture — FreeLingo

## Repository structure

```
freelingo/
├── backend/                     # Python 3.12 FastAPI
│   ├── app/
│   │   ├── main.py              # FastAPI app, lifespan, middleware, router mounting
│   │   ├── core/
│   │   │   ├── config.py        # Settings via pydantic-settings (.env)
│   │   │   ├── database.py      # Async SQLAlchemy engine, session factory
│   │   │   ├── security.py      # JWT encode/decode (HS256), bcrypt password hashing
│   │   │   ├── deps.py          # Dependency injection: get_current_user, require_admin
│   │   │   └── limiter.py       # slowapi rate limiter (200/min default)
│   │   ├── models/              # 9 SQLAlchemy 2.0 async ORM models
│   │   │   ├── user.py          # User
│   │   │   ├── study_plan.py    # StudyPlan
│   │   │   ├── lesson.py        # Lesson + Exercise
│   │   │   ├── flashcard.py     # Flashcard (SM-2 fields)
│   │   │   ├── progress.py      # Progress (daily XP/streak/skills)
│   │   │   ├── conversation.py  # Conversation
│   │   │   ├── chat_history.py  # ChatHistory
│   │   │   └── competency.py    # UserCompetency (unit-level)
│   │   ├── schemas/             # Pydantic v2 request/response models
│   │   ├── routers/             # 11 routers (10 REST + 1 WebSocket)
│   │   │   ├── auth.py          # /api/auth/*
│   │   │   ├── admin.py         # /api/admin/* (admin-only)
│   │   │   ├── assessment.py    # /api/assessment/*
│   │   │   ├── study_plan.py    # /api/study-plan/*
│   │   │   ├── lessons.py       # /api/lessons/*
│   │   │   ├── flashcards.py    # /api/flashcards/*
│   │   │   ├── chat.py          # /api/chat/* (SSE streaming)
│   │   │   ├── progress.py      # /api/progress/*
│   │   │   ├── tts.py           # /api/tts (proxied to Kokoro)
│   │   │   ├── stt.py           # /api/stt (proxied to Whisper)
│   │   │   └── conversation.py  # /ws/conversation (WebSocket)
│   │   ├── services/            # 9 service modules
│   │   │   ├── llm_adapter.py           # Multi-provider LLM client
│   │   │   ├── assessment.py            # Deterministic CEFR evaluation + LLM helpers
│   │   │   ├── study_plan_generator.py  # Curriculum-driven plan (no LLM)
│   │   │   ├── lesson_generator.py      # LLM lesson content generation
│   │   │   ├── flashcard_sm2.py         # SM-2 algorithm + LLM flashcard gen
│   │   │   ├── progress_service.py      # XP, streaks, skills, unit competency
│   │   │   ├── tts_service.py           # Kokoro HTTP client
│   │   │   ├── stt_service.py           # Whisper HTTP client
│   │   │   └── conversation_pipeline.py # WebSocket STT→LLM→TTS pipeline
│   │   └── data/
│   │       └── curriculum.py    # CEFR curriculum A1-C2 (24 units), intensity config
│   ├── alembic/                 # Async DB migrations (6 migrations)
│   ├── tests/                   # 10 test files (pytest + pytest-asyncio)
│   ├── pyproject.toml           # ruff, black, pytest config
│   └── requirements.txt         # 20+ dependencies
│
├── frontend/                    # Next.js 16 App Router
│   ├── src/
│   │   ├── app/                 # Routes (page.tsx files)
│   │   │   ├── (auth)/          # Public routes (login, register) — no sidebar
│   │   │   ├── (app)/           # Authenticated routes — sidebar layout
│   │   │   │   ├── dashboard/      # Main dashboard
│   │   │   │   ├── assessment/     # 3-step onboarding (beginner gate → quiz → plan)
│   │   │   │   ├── assessment/level-test/  # End-of-level test
│   │   │   │   ├── plan/           # Curriculum roadmap
│   │   │   │   ├── lesson/[id]/    # Lesson content + exercises
│   │   │   │   ├── flashcards/     # SM-2 review, generate, speaking mode
│   │   │   │   ├── chat/           # AI tutor (SSE streaming)
│   │   │   │   ├── conversation/   # Voice conversation (WebSocket + VAD)
│   │   │   │   ├── grammar/        # Grammar reference index
│   │   │   │   ├── grammar/[slug]/ # Grammar topic detail
│   │   │   │   ├── vocabulary/     # Vocabulary hub index
│   │   │   │   ├── vocabulary/[setId]/  # Vocabulary set detail
│   │   │   │   ├── phrasebook/     # Phrasebook with filters
│   │   │   │   ├── progress/       # Skills tracker
│   │   │   │   ├── settings/       # User profile + admin
│   │   │   │   ├── faq/            # FAQ page
│   │   │   │   └── admin/users/    # Admin user management
│   │   │   └── api/            # Next.js Route Handlers (SSE/binary proxies)
│   │   ├── components/         # React components (shadcn/ui + custom)
│   │   ├── data/               # Static data (5 files: curriculum, grammar, vocab, phrasebook, assessment-bank)
│   │   ├── store/              # Zustand stores (auth, theme, progress, loading)
│   │   ├── lib/                # Utilities (api fetch, WS builder, audio queue)
│   │   ├── i18n/               # next-intl locale resolver
│   │   └── middleware.ts       # Auth guard + locale detection
│   ├── public/                 # Static assets (flags, VAD WASM models)
│   └── scripts/
│       └── copy-vad-models.js  # Postinstall: VAD models → public/
│
├── messages/                   # i18n message bundles (en, es, fr, pt, de, it)
├── docker-compose.yml
├── .env.example
├── docker/                     # Custom Dockerfiles (optional overrides)
├── docs/                       # Documentation
├── assets/                     # Logo, branding
├── .github/                    # CI/CD workflows (GitHub Actions)
├── AGENTS.md                   # Agent instructions for AI assistants
├── CHANGELOG.md                # Version history
└── README.md
```

## Database models

All models use SQLAlchemy 2.0 declarative style with `Mapped[T]` type annotations and async engine (`asyncpg` driver). PostgreSQL JSON columns store structured content for lessons, plans, exercises, and skill scores.

### User (`users`)

Registration, authentication, and user preferences.

| Column | Type | Notes |
|--------|------|-------|
| id | integer | Primary key |
| username | string | Unique, used for login |
| email | string | Unique, nullable, for account recovery |
| display_name | string | Shown in UI |
| hashed_password | string | bcrypt hash |
| role | string | `"admin"` or `"user"` |
| native_language | string | e.g. `"es"`, `"fr"` — used for flashcard translations and tutor feedback |
| english_variant | string | `"american"` (default) or `"british"` — controls grammar/spelling |
| is_active | boolean | False = account disabled by admin |
| conversation_max_duration | integer | Max voice session duration in seconds (default 1800) |
| conversation_inactivity_timeout | integer | Seconds of silence before disconnect (default 180) |
| created_at | datetime | Auto-set on creation |
| last_login | datetime | Updated on each login |

**Registration rules:**
- First registered user becomes admin automatically when `FIRST_USER_IS_ADMIN=true` (default).
- `ALLOW_REGISTRATION=false` blocks public signups; admin creates users or generates single-use invite links (48h expiry in Redis).
- Target language is always English. User's native language is used only for flashcard translations and tutor feedback.

### StudyPlan (`study_plans`)

One active plan per user. Generated after CEFR assessment.

| Column | Type | Notes |
|--------|------|-------|
| id | integer | Primary key |
| user_id | integer | FK → users |
| cefr_level | string | A1, A2, B1, B2, C1, C2 |
| goals | JSON | List of goal strings (grammar, vocabulary, reading, writing, conversation) |
| duration_weeks | integer | 4, 8, 12, or 16 (maps to intensity) |
| days_per_week | integer | Derived: 5, 5, 4, or 3 |
| current_unit | string | Curriculum unit ID, e.g. `"a1-unit-3"` |
| generated_plan | JSON | Full week-by-week plan (WeekPlan → DayPlan → Unit assignments) |
| is_active | boolean | True for the current plan |
| completion_test_taken | boolean | Whether end-of-level test was completed |
| completion_test_score | float (nullable) | 0.0 – 1.0 |
| completion_test_recommendation | string (nullable) | `"advance"`, `"extend"`, or `"repeat"` |
| created_at | datetime | Auto-set |

**Intensity / duration mapping:**

| Intensity | Weeks | Days/week | Total lessons |
|-----------|-------|-----------|---------------|
| Intensive | 4 | 5 | ~20 |
| Standard | 8 | 5 | ~40 |
| Relaxed (default) | 12 | 4 | ~48 |
| Very relaxed | 16 | 3 | ~48 |

### Lesson (`lessons`)

One lesson per day slot in the study plan.

| Column | Type | Notes |
|--------|------|-------|
| id | integer | Primary key |
| study_plan_id | integer | FK → study_plans |
| title | string | Lesson title |
| lesson_type | string | `grammar`, `vocabulary`, `reading`, `writing`, `review` |
| cefr_level | string | CEFR level |
| week_number | integer | Week in the plan |
| day_number | integer | Day in the week |
| unit_id | string (nullable) | Curriculum unit this lesson belongs to |
| content | JSON | Structured lesson content generated by LLM |
| is_completed | boolean | |
| completed_at | datetime | |

### Exercise (`exercises`)

Exercises belong to a lesson (1 lesson → many exercises).

| Column | Type | Notes |
|--------|------|-------|
| id | integer | Primary key |
| lesson_id | integer | FK → lessons |
| exercise_type | string | `multiple_choice`, `fill_blank`, `free_write`, `pronunciation` |
| question | text | Exercise prompt |
| options | JSON | Array of options (for multiple_choice) |
| correct_answer | text | Expected answer |
| user_answer | text (nullable) | User's submitted answer |
| score | float (nullable) | 0.0 – 1.0 |
| feedback | text (nullable) | LLM-generated feedback |
| answered_at | datetime | |

### Flashcard (`flashcards`)

SM-2 spaced repetition cards, per user.

| Column | Type | Notes |
|--------|------|-------|
| id | integer | Primary key |
| user_id | integer | FK → users |
| word | string | English word/phrase |
| definition | text | English definition |
| example_sentence | text | Usage example |
| translation | text | Translation to user's native language |
| ease_factor | float | SM-2 ease factor (default 2.5) |
| interval | integer | Days until next review (default 0) |
| repetitions | integer | Consecutive correct reviews (default 0) |
| next_review | date | Date of next review (default today) |
| created_at | datetime | |

### Progress (`progress`)

Daily progress record, one row per user per day.

| Column | Type | Notes |
|--------|------|-------|
| id | integer | Primary key |
| user_id | integer | FK → users |
| date | date | |
| xp_earned | integer | XP gained that day |
| lessons_completed | integer | |
| exercises_correct | integer | |
| exercises_total | integer | |
| streak_day | integer | Consecutive day count |
| skills | JSON | Skill scores: `{"grammar": 0.6, "vocabulary": 0.4, ...}` |

### Conversation (`conversations`)

Grouping of chat messages into named conversations.

| Column | Type | Notes |
|--------|------|-------|
| id | integer | Primary key |
| user_id | integer | FK → users (CASCADE) |
| title | string | Auto-generated or user-set |
| created_at | datetime | |
| updated_at | datetime | |

### ChatHistory (`chat_history`)

Individual messages within text chat conversations.

| Column | Type | Notes |
|--------|------|-------|
| id | integer | Primary key |
| user_id | integer | FK → users |
| conversation_id | integer (nullable) | FK → conversations (CASCADE) |
| role | string | `"user"` or `"assistant"` |
| content | text | Message body |
| created_at | datetime | |

### UserCompetency (`user_competencies`)

Per-unit competency tracking (Phase 1+).

| Column | Type | Notes |
|--------|------|-------|
| id | integer | Primary key |
| user_id | integer | FK → users (CASCADE) |
| unit_id | string | Curriculum unit ID (indexed) |
| competency_text | text | Name of the competency |
| score | float | 0.0 – 1.0, exponential moving average |
| mastered | boolean | True when score >= 0.80 |
| updated_at | datetime | |

---

## API Endpoints

### Auth — `/api/auth`

| Method | Path | Rate limit | Description |
|--------|------|------------|-------------|
| POST | `/register` | 5/min (+ invite-gated) | Creates account (respects `ALLOW_REGISTRATION` and invite token) |
| POST | `/login` | 10/min | Returns access_token (JWT, 15 min) + refresh_token in httpOnly cookie (30 days) |
| POST | `/refresh` | 20/min | Rotates refresh token, returns new access_token |
| POST | `/logout` | None | Deletes refresh token from Redis, clears cookie |
| GET | `/me` | None | Returns authenticated user profile |
| PATCH | `/me` | None | Updates display_name, email, password, english_variant, conversation settings |

### Admin — `/api/admin` (requires `role="admin"`)

| Method | Path | Description |
|--------|------|-------------|
| GET | `/users` | Lists users (paginated). Query params: `skip` (default 0) and `limit` (default 20, max 100). Returns `{items, total, skip, limit}`. |
| POST | `/users` | Creates user directly (bypasses `ALLOW_REGISTRATION`) |
| GET | `/users/{id}` | User detail |
| PATCH | `/users/{id}` | Edit role, is_active, display_name |
| DELETE | `/users/{id}` | Deletes account and all associated data |
| POST | `/invite` | Generates single-use invite link (48h Redis TTL) |

### Assessment — `/api/assessment`

3-step new user onboarding plus end-of-level testing.

| Method | Path | Description |
|--------|------|-------------|
| GET | `/start` | Begins adaptive quiz (LLM-generated questions, static fallback) |
| POST | `/submit` | Legacy: submits answers for CEFR evaluation |
| POST | `/evaluate` | Deterministic CEFR evaluation (no LLM — groups by difficulty) |
| POST | `/free-write` | Evaluates free-write text for CEFR placement (LLM) |
| POST | `/complete` | Persists results, creates StudyPlan |
| GET | `/level-test/questions/{plan_id}` | Generates 20-question level test (LLM, constrained to studied content) |
| POST | `/level-test/submit` | Submits level test answers → score + recommendation |
| GET | `/level-test/result/{plan_id}` | Returns test result and recommendation |

### Study Plan — `/api/study-plan`

| Method | Path | Description |
|--------|------|-------------|
| GET | `/current` | User's active plan with curriculum progress |
| POST | `/generate` | Creates new plan from CEFR level, goals, and duration |
| GET | `/today` | Today's lessons (auto-generates missing) |

### Lessons — `/api/lessons`

| Method | Path | Description |
|--------|------|-------------|
| GET | `/{lesson_id}` | Lesson detail with exercises |
| POST | `/{lesson_id}/start` | Marks lesson as in-progress |
| POST | `/{lesson_id}/complete` | Marks as completed, updates progress and competencies |
| POST | `/exercises/{id}/answer` | Submits answer → evaluates (MC, fill, free_write, pronunciation) → returns score + feedback |

### Flashcards — `/api/flashcards`

| Method | Path | Description |
|--------|------|-------------|
| GET | `/due` | Cards pending review today (SM-2 ordering) |
| GET | `/all` | All user's flashcards |
| POST | `/` | Creates flashcard manually |
| POST | `/{card_id}/review` | Records SM-2 review (quality 0–5) |
| POST | `/generate` | Generates N flashcards via LLM with native-language translations |

### Chat — `/api/chat`

| Method | Path | Description |
|--------|------|-------------|
| GET | `/conversations` | Lists user's text chat conversations |
| POST | `/conversations` | Creates new conversation |
| DELETE | `/conversations/{id}` | Deletes conversation and its messages (CASCADE) |
| GET | `/conversations/{id}/messages` | Returns messages for a conversation |
| POST | `/` | Sends message → streams AI tutor response (SSE) |
| GET | `/history` | All chat history (legacy) |

### Progress — `/api/progress`

| Method | Path | Description |
|--------|------|-------------|
| GET | `/summary` | Streak, XP, skills breakdown |
| GET | `/history` | Daily progress for last 90 days |
| GET | `/competencies` | Per-unit competency scores and mastery status |

### TTS — `/api/tts` (Phase 2)

| Method | Path | Rate limit | Description |
|--------|------|------------|-------------|
| POST | `/tts` | 20/min | Text → MP3 audio via Kokoro TTS proxy |

### STT — `/api/stt` (Phase 2)

| Method | Path | Rate limit | Description |
|--------|------|------------|-------------|
| POST | `/stt` | 20/min | Audio → transcribed text via Whisper proxy |

### WebSocket — `/ws/conversation` (Phase 3)

Full-duplex voice conversation pipeline. Requires `TTS_ENABLED=true` and `STT_ENABLED=true` — rejects connections otherwise.

**Authentication**: After the WebSocket handshake is accepted, the client must send a JSON message `{"type": "auth", "token": "<access_token>"}` within 10 seconds. If the message is missing, malformed, or the token is invalid, the server closes the connection with code 1008.

**Message flow**: Client sends audio chunks → STT transcription → LLM generates response (streamed) → sentence-level TTS → MP3 audio chunks returned.

Features:
- **Barge-in**: new audio input cancels ongoing TTS playback
- **VAD**: browser-level voice activity detection (`@ricky0123/vad-react` + onnxruntime-web threaded WASM)
- **Gapless playback**: `AudioQueue` schedules consecutive `AudioBufferSourceNode`s
- **Session timeouts**: max duration (default 30 min) and inactivity (default 3 min), each with 60 s warning
- **In-memory history**: last 20 messages kept for context during session (not persisted)

---

## Service layer

All external dependencies are accessed through the service layer. The frontend never calls Ollama, Kokoro, or Whisper directly — the backend is the single gateway.

### LLM Adapter (`llm_adapter.py`)

Singleton providing provider-agnostic LLM access. Supports four providers selectable via `LLM_PROVIDER` env variable:

| Provider | Client | Max tokens | Notes |
|----------|--------|------------|-------|
| ollama | AsyncOpenAI (openai SDK) | 8192 | Local, openai-compatible endpoint |
| openai | AsyncOpenAI | 128K | |
| deepseek | AsyncOpenAI | 128K | openai-compatible endpoint |
| anthropic | AsyncAnthropic (anthropic SDK) | 200K | Separate code path; system message extracted |

**Key capabilities:**
- `chat(messages, stream=False)` — returns string or async generator
- `structured_output(messages, schema)` — returns validated Pydantic model (JSON mode + retry on parse failure)
- 2 automatic retries with exponential backoff, 60 s timeout
- Custom exception hierarchy: `LLMError`, `LLMTimeoutError`, `LLMUnavailableError`, `LLMResponseError`, `LLMContextOverflowError`

### Assessment Service (`assessment.py`)

- Deterministic CEFR evaluation (no LLM): groups quiz answers by difficulty, finds highest level with >=2 questions and >=60% correct
- LLM-powered: free-write evaluation, end-of-level test generation (constrained to studied grammar/vocabulary)

### Study Plan Generator (`study_plan_generator.py`)

Fully deterministic — no LLM. Uses static curriculum data from `curriculum.py` to distribute units across weeks/days. The `distribute_units()` function maps curriculum units onto lesson slots based on duration and intensity, cycling lesson types (grammar → vocabulary → reading → writing → review). The last slot is always reserved for the end-of-level completion test.

### Lesson Generator (`lesson_generator.py`)

LLM-powered lesson content generation with strict constraints:
- Grammar constrained to a validated set of 24 grammar slugs
- CEFR level and English variant (american/british) adherence
- Generates 3-5 exercises per lesson (multiple_choice, fill_blank, free_write)
- Separately evaluates free_write answers and pronunciation (scored 0.0–1.0 with feedback)

### Flashcard SM-2 (`flashcard_sm2.py`)

Full SM-2 spaced repetition algorithm:
- `sm2_update(card, quality)`: modifies ease_factor, interval, repetitions, and next_review based on 0–5 quality rating
- LLM-powered `generate_flashcards`: creates flashcards with native-language translations

### Progress Service (`progress_service.py`)

- Atomic daily progress updates: XP (20 per lesson, 5 per correct exercise, 1 per wrong, 2 per flashcard)
- Streak calculation: counts consecutive days with activity
- Skill scoring: 0.7/0.3 exponential moving average per skill
- Unit competency tracking: per-competency EMA, marked mastered at >=0.80

### TTS Service (`tts_service.py`)

HTTP client to Kokoro-FastAPI: `POST /v1/audio/speech` with text, voice, and format parameters. Returns MP3 audio bytes.

### STT Service (`stt_service.py`)

HTTP client to Whisper ASR: `POST /asr?output=json&language=en&task=transcribe` with multipart audio upload. Returns transcribed text.

**Note**: The STT endpoint is `/asr` (not OpenAI-compatible `/v1/audio/transcriptions`). This is the actual API of the `onerahmet/openai-whisper-asr-webservice` Docker image.

### Conversation Pipeline (`conversation_pipeline.py`)

WebSocket-based voice conversation orchestrator:
1. Receives audio chunks from client (WebSocket binary frames)
2. Sends to STT service for transcription
3. Builds prompt with system message + last 20 message history
4. Streams LLM response
5. Splits on sentence boundaries (regex `SENTENCE_END`)
6. Sends each sentence to TTS, returning MP3 back to client
7. Barge-in: new audio from client cancels current LLM+TTS generation
8. Timeout watchers: max duration (default 30 min) and inactivity (default 3 min) with 60 s warnings

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

**Design rationale:**
- **Access token**: verified without DB hit (JWT decode only). Short lifetime limits damage if leaked.
- **Refresh token**: stored in Redis with native TTL for auto-expiry. Opaque (not JWT) so no sensitive data in the cookie.
- **Token rotation**: on refresh, old token is deleted from Redis and a new one is created — prevents replay attacks.
- **Logout**: deletes the refresh token from Redis and clears the cookie.
- **Frontend interceptor** (`apiFetch`): on 401 response, silently refreshes the access token and retries the request. On refresh failure, redirects to `/login`.

---

## Code standards

### Backend (Python 3.12)

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

---

## Tests

### Backend: pytest + pytest-asyncio

Located in `backend/tests/` with 10 test files:

| File | Covers |
|------|--------|
| `conftest.py` | Fixtures: SQLite in-memory DB, mock Redis (dict-based), HTTP test client, test user/admin |
| `test_auth.py` | Register, login, refresh, logout, me, update-profile |
| `test_admin.py` | CRUD users, role enforcement (403 for non-admin), invite creation |
| `test_assessment.py` | Quiz start/submit, deterministic evaluation, LLM error handling |
| `test_study_plan.py` | Generate plan, today's lessons, auto-generation |
| `test_lessons.py` | Lesson CRUD, exercise answering (MC, free_write, pronunciation), completion flow |
| `test_flashcards.py` | SM-2 algorithm (quality 0–5, interval/ease_factor logic), edge cases |
| `test_chat.py` | SSE streaming, conversation CRUD |
| `test_progress.py` | Summary, history, competencies |
| `test_conversation.py` | WebSocket auth, TTS/STT disabled rejection, pipeline lifecycle |
| `test_frontend_data_integrity.py` | Cross-references frontend `curriculum.ts` against `grammar.ts`/`vocabulary.ts` |

**Key design choices for tests:**
- SQLite in-memory (`sqlite+aiosqlite:///:memory:`) for fast, isolated tests — no PostgreSQL dependency
- Redis mocked with in-memory dict (matching `setex`, `get`, `delete`, `getex` interface)
- LLM calls mocked at the service layer (no real LLM needed)
- `asyncio_mode = "auto"` for async test functions
- Coverage target: >= 70%

### Frontend

Tests planned with Vitest + Testing Library + Playwright (E2E). Not yet implemented.

---

## Environment variables

All configuration is environment-driven. Key variables:

| Variable | Default | Purpose |
|----------|---------|---------|
| DATABASE_URL | — | asyncpg connection string |
| REDIS_URL | — | Redis connection string |
| SECRET_KEY | — | JWT signing key (HS256) |
| ACCESS_TOKEN_EXPIRE_MINUTES | 15 | JWT lifetime |
| REFRESH_TOKEN_EXPIRE_DAYS | 30 | Refresh token TTL |
| ALLOW_REGISTRATION | true | Enables/disables public signups |
| FIRST_USER_IS_ADMIN | true | Auto-admin for first user |
| LLM_PROVIDER | ollama | ollama / openai / anthropic / deepseek |
| TTS_ENABLED | false | Enable Kokoro TTS proxy |
| STT_ENABLED | false | Enable Whisper STT proxy |
| STT_MODEL | large-v3-turbo | Whisper model size |
| STT_ENGINE | faster_whisper | Whisper engine (faster_whisper / ctranslate2) |
| RATE_LIMIT_ENABLED | true | Enable slowapi rate limiting |
| RATE_LIMIT_STORAGE | memory | memory or redis |
| CORS_ORIGINS | * | Allowed CORS origins |
| LOG_LEVEL | INFO | Application log level |