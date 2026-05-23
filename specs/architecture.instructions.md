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
│   └── tests/                   # pytest suite (25 test files)
│
├── frontend/                    # Next.js 16 App Router
│   ├── src/
│   │   ├── app/
│   │   │   ├── (auth)/          # Public routes: login, register, onboarding, verify-email, forgot-password, reset-password — no sidebar
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
│   │   │   ├── conversation/    # ConversationMode, MicButton, StatusIndicator, TranscriptBubble, SessionTimeoutBanner
│   │   │   ├── plan/            # LevelTestBanner, UnitCard, UnitDrawer
│   │   │   ├── ui/              # shadcn/ui + custom: AudioPlayer, VoiceRecorder, confirm-dialog, loading-bar, ...
│   │   │   ├── TargetLanguageSelector.tsx
│   │   │   └── ThemeProvider.tsx
│   │   ├── data/                # Static content: curriculum, grammar, vocab, phrasebook, assessment-bank (+ en/ subfolder)
│   │   ├── store/               # Zustand stores: auth, theme, progress, loading
│   │   ├── lib/                 # Utilities: apiFetch, conversation-ws, audio, target-languages, utils
│   │   ├── i18n/                # next-intl locale resolver
│   │   └── middleware.ts        # Auth guard + locale detection
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
| target_language | string | BCP-47 tag, e.g. `"en-US"` (default) or `"en-GB"` — the language the user is learning |
| is_active | boolean | False = account disabled by admin |
| is_verified | boolean | False until email verified (default False; existing users set to True on migration) |
| conversation_max_duration | integer | Max voice session duration in seconds (default 1800) |
| conversation_inactivity_timeout | integer | Seconds of silence before disconnect (default 180) |
| conversation_weekly_sessions | integer | Counter reset each week (default 0) |
| conversation_daily_minutes | integer | Limit in minutes per day (default 30) |
| conversation_weekly_minutes | integer | Limit in minutes per week (default 90) |
| monthly_tokens_limit | integer | Max LLM tokens per billing period (default 1 000 000) |
| stripe_customer_id | string (nullable) | Stripe customer ID (set when subscription is created) |
| subscription_status | string | Subscription state: `none` (default), `trialing`, `active`, `past_due`, `canceled` |
| subscription_ends_at | datetime (nullable) | When the current subscription period ends |
| avatar | text (nullable) | Base64-encoded avatar image |
| bio | text (nullable) | User-written profile bio |
| learning_goals | text (nullable) | JSON-encoded array of learning goal strings |
| created_at | datetime | Auto-set on creation |
| last_login | datetime (nullable) | Updated on each successful login |

**Registration rules:**
- First registered user becomes admin automatically when `FIRST_USER_IS_ADMIN=true` (default).
- `ALLOW_REGISTRATION=false` blocks public signups; admin creates users or generates single-use invite links (48h expiry in Redis).
- `BLOCKED_EMAIL_DOMAINS` is a JSON array of lowercase domain strings (e.g. `["yopmail.com","mailinator.com"]`). Registrations using an email from any listed domain are rejected with HTTP 422 before any DB access. Defaults to `[]` (no blocking).
- `POST /register` returns an `access_token` + sets the refresh token cookie so the frontend can redirect directly to `/onboarding` without an intermediate login.
- On `/onboarding` the user chooses their `target_language`; the choice is saved via `PATCH /me` before accessing the app.

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
| target_language | string | BCP-47 tag copied from user at plan creation (e.g. `"en-US"`) |
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

Grouping of chat messages (text and voice) into named conversations.

| Column | Type | Notes |
|--------|------|-------|
| id | integer | Primary key |
| user_id | integer | FK → users (CASCADE) |
| title | string | Auto-generated or user-set |
| source | string | `'chat'` or `'voice'` (default `'chat'`) |
| created_at | datetime | |
| updated_at | datetime | |

### ChatHistory (`chat_history`)

Individual messages within text chat and voice conversations.

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

### ListeningExercise (`listening_exercises`)

AI-generated listening comprehension exercises (Phase 6). Shared across all users at the same CEFR level and target language.

| Column | Type | Notes |
|--------|------|-------|
| id | integer | Primary key |
| level | string | CEFR level: A1–C2 |
| target_language | string | BCP-47 tag, e.g. `"en-US"` |
| exercise_type | string | E.g. `"story"`, `"dialogue"`, `"news_report"` — varies by level |
| topic | string | Short topic description |
| text | text | Full transcript (never returned to client before submission) |
| audio_path | string | Absolute path to MP3 on disk, e.g. `/data/audio/listening/42.mp3` |
| duration_seconds | integer | Audio length in seconds |
| questions | JSON | List of `{question, options: [str×4], correct}` objects (5 questions per exercise) |
| play_count | integer | How many times this exercise has been served (server default 0) |
| created_at | datetime | Auto-set on creation |

Composite index: `ix_listening_exercises_level_lang` on `(level, target_language)`.

### ListeningAttempt (`listening_attempts`)

Records each user submission for a listening exercise.

| Column | Type | Notes |
|--------|------|-------|
| id | integer | Primary key |
| user_id | integer | FK → users (CASCADE DELETE) |
| exercise_id | integer | FK → listening_exercises (CASCADE DELETE) |
| answers | JSON | List of strings — the user's selected option per question |
| score | integer | 0–5 (number of correct answers) |
| xp_earned | integer | 0–50 (10 per correct answer) |
| completed_at | datetime | Auto-set on creation |

Unique constraint: one attempt per `(user_id, exercise_id)` — enforced at service level (409 on duplicate).

### ReadingExercise (`reading_exercises`)

AI-generated reading comprehension exercises (Phase 7). Shared across all users at the same CEFR level and target language. Unlike listening, no audio is produced — the text is served directly to the client.

| Column | Type | Notes |
|--------|------|-------|
| id | integer | Primary key |
| level | string | CEFR level: A1–C2 |
| target_language | string | BCP-47 tag, e.g. `"en-US"` |
| exercise_type | string | `notice`, `email`, `article`, `news`, `blog_post`, `review`, `essay` |
| topic | string | Short topic description |
| text | text | Full passage text — **included in exercise response** (unlike listening) |
| questions | JSON | List of `{index, question, options: {A,B,C,D}, correct}` objects (5 per exercise) |
| view_count | integer | How many times this exercise has been served (server default 0) |
| created_at | datetime | Auto-set on creation |

Composite index: `ix_reading_exercises_level_lang` on `(level, target_language)`.

### ReadingAttempt (`reading_attempts`)

Records each user submission for a reading exercise.

| Column | Type | Notes |
|--------|------|-------|
| id | integer | Primary key |
| user_id | integer | FK → users (CASCADE DELETE) |
| exercise_id | integer | FK → reading_exercises (CASCADE DELETE) |
| answers | JSON | `{ "0": "B", "1": "A", ... }` — the user's selected option per question |
| score | integer | 0–5 (number of correct answers) |
| xp_earned | integer | 0–50 (10 per correct answer) |
| completed_at | datetime | Auto-set on creation |

Unique constraint: one attempt per `(user_id, exercise_id)` — enforced at service level (409 on duplicate).

### FeedbackEntry (`feedback_entries`)

A feature request or bug report submitted by a user.

| Column | Type | Notes |
|--------|------|-------|
| id | integer | Primary key |
| type | string(10) | `"feature"` or `"bug"` |
| title | string(200) | Short title |
| description | text | Full description (max 5000 chars via schema) |
| status | string(20) | `pending` (default) \| `planned` \| `in_progress` \| `done` \| `declined` |
| author_id | integer | FK → users (CASCADE DELETE) |
| vote_count | integer | Denormalised sum of votes (default 0) |
| created_at | datetime | Auto-set on creation |

Indexes: `type`, `status`, `author_id`, `created_at`.

### FeedbackVote (`feedback_votes`)

One vote per user per feature request. Bugs are not voteable.

| Column | Type | Notes |
|--------|------|-------|
| id | integer | Primary key |
| entry_id | integer | FK → feedback_entries (CASCADE DELETE) |
| user_id | integer | FK → users (CASCADE DELETE) |
| created_at | datetime | Auto-set on creation |

Unique constraint: `UNIQUE(entry_id, user_id)` — enforced at DB level (`uq_feedback_vote`).

### FeedbackComment (`feedback_comments`)

A flat comment on a feedback entry. No nesting.

| Column | Type | Notes |
|--------|------|-------|
| id | integer | Primary key |
| entry_id | integer | FK → feedback_entries (CASCADE DELETE) |
| author_id | integer | FK → users (CASCADE DELETE) |
| body | text | Comment body (max 2000 chars via schema) |
| created_at | datetime | Auto-set on creation |

### Memory (`memories`)

User-specific context persisted by the LLM during conversations. The AI tutor autonomously decides what to remember.

| Column | Type | Notes |
|--------|------|-------|
| id | integer | Primary key |
| user_id | integer | FK → users (CASCADE DELETE) |
| content | text | Memory text, max 200 chars enforced at service layer |
| source | varchar(10) | `"chat"` or `"voice"` |
| created_at | datetime | Auto-set on creation |

### LLMUsage (`llm_usage`)

Token-usage audit trail, one row per LLM call. Used to track consumption against `monthly_tokens_limit`.

| Column | Type | Notes |
|--------|------|-------|
| id | integer | Primary key |
| user_id | integer | FK → users (CASCADE DELETE), indexed |
| source | varchar(20) | Feature that triggered the call: `"chat"`, `"lesson"`, `"assessment"`, etc. |
| prompt_tokens | integer (nullable) | Input token count |
| completion_tokens | integer (nullable) | Output token count |
| total_tokens | integer (nullable) | Total tokens (may differ from prompt + completion for some providers) |
| created_at | datetime | Auto-set on creation |

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
- `parse_llm_json(raw)` — module-level utility; strips optional code fences and parses JSON from LLM output. Shared by `listening_service.py` and `reading_service.py`.
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
- CEFR level and target language adherence (`en-US` / `en-GB`; BCP-47 tag converted to english variant via `language_helpers.get_english_variant`)
- Generates 3-5 exercises per lesson (multiple_choice, fill_blank, free_write)
- Separately evaluates free_write answers and pronunciation (scored 0.0–1.0 with feedback)

### Flashcard SM-2 (`flashcard_sm2.py`)

Full SM-2 spaced repetition algorithm:
- `sm2_update(card, quality)`: modifies ease_factor, interval, repetitions, and next_review based on 0–5 quality rating
- LLM-powered `generate_flashcards`: creates flashcards with native-language translations; `native_language` is always sourced from the authenticated user's profile (not from the request body)

### Language Helpers (`language_helpers.py`)

Shared BCP-47 conversion utilities used across the service layer:
- `get_english_variant(target_language)` — converts `"en-US"` → `"american"`, `"en-GB"` → `"british"` for LLM prompts
- `get_iso639(target_language)` — strips region subtag: `"en-US"` → `"en"` for Whisper
- `voice_session_title(native_language)` — localised "Voice session — date" strings for all 9 supported languages

### Memory Service (`memory_service.py`)

Handles LLM-driven persistent context across conversations:
- `parse_memory_marker(text)` — extracts items from `<<MEMORY>>{"items":[...]}<<ENDMEMORY>>` blocks in LLM responses
- `strip_memory_marker(text)` — removes the marker block before the response reaches the user
- `build_memory_context(memories)` — formats up to 20 memories × 200 chars for injection into system prompts
- `save_memories(db, user_id, items, source)` — persists new items, skipping exact duplicates
- Zero-cost design: the LLM includes the marker in its normal response; no extra API calls needed.

### Progress Service (`progress_service.py`)

- Atomic daily progress updates: XP (20 per lesson, 5 per correct exercise, 1 per wrong, 2 per flashcard)
- Streak calculation: counts consecutive days with activity
- Skill scoring: 0.7/0.3 exponential moving average per skill
- Unit competency tracking: per-competency EMA, marked mastered at >=0.80

### TTS Service (`tts_service.py`)

Abstracts TTS behind a common `synthesise(text, voice) → bytes` interface. Provider selected via `TTS_PROVIDER`:

- **`local`**: HTTP client to Kokoro-FastAPI — `POST /v1/audio/speech`. Returns MP3 audio bytes.
- **`openai`**: OpenAI TTS API (`tts-1` model, configurable via `OPENAI_TTS_MODEL` / `OPENAI_TTS_VOICE`).

### STT Service (`stt_service.py`)

Abstracts STT behind a common `transcribe(audio_bytes, language) → str` interface. Provider selected via `STT_PROVIDER`:

- **`local`**: HTTP client to Whisper ASR — `POST /asr?output=json&language=<lang>&task=transcribe` (multipart). Uses `onerahmet/openai-whisper-asr-webservice` image (not OpenAI-compatible endpoint).
- **`openai`**: OpenAI Whisper API (`whisper-1` model, configurable via `OPENAI_STT_MODEL`).

### Logging & Observability (`core/app_logger.py`)

Backend modules now use a shared logging wrapper:

- `get_logger(__name__)` returns an `AppLogger` instance used across routers and services.
- `AppLogger` supports both styles:
    - classic stdlib-style messages with positional placeholders (`%s`)
    - event-style structured logs (`logger.info("event", key=value, ...)`)
- Effective verbosity is still controlled globally by `LOG_LEVEL` from `.env` (`DEBUG`, `INFO`, `WARNING`, `ERROR`) and configured in `main.py` via `logging.basicConfig(...)`.

For TTS diagnostics, `/api/tts` emits per-request trace and latency fields in logs and response headers so frontend, proxy, and backend timings can be correlated end-to-end.

The `language` parameter is derived dynamically from `target_language` via `language_helpers.get_iso639` (e.g. `"en-US"` → `"en"`).

### Email Service (`email_service.py`)

SMTP email dispatch via **fastapi-mail 1.4.1** (async, `aiosmtplib` backend). Only active when `EMAIL_ENABLED=true`.

- `send_verification_email(to, display_name, token, locale)` — sends a verification link valid 24 h.
- `send_reset_password_email(to, display_name, token, locale)` — sends a password-reset link valid 1 h.
- `send_contact_email(sender_email, subject, description)` — forwards a contact-form submission to `CONTACT_EMAIL`. Sets `Reply-To` to the sender's address. Raises on SMTP failure (the router converts this to HTTP 502).

Both `send_verification_email` and `send_reset_password_email` accept a `locale` parameter (BCP-47 language tag, e.g. `"es"`) and render fully translated email bodies using internal `_VERIFY_I18N` / `_RESET_I18N` dicts covering the 10 supported UI languages. HTML templates are in `backend/app/templates/email/`.

### Listening Service (`listening_service.py`)

Manages AI-generated listening exercises end-to-end (Phase 6):

- `get_available_exercise(level, target_language, user_id, db)` — returns the oldest unplayed exercise for the user's level/language, excluding already-attempted ones. Returns `None` if pool is empty.
- `generate_and_save_exercise(level, target_language, db, tts_service, storage_path)` — calls LLM (with one retry on malformed JSON), extracts topic + text + 5 questions, synthesises MP3 via TTS service, flushes to DB to get the ID, writes audio to `{storage_path}/listening/{id}.mp3`, then commits.
- `calculate_score(questions, answers) → (score, xp_earned)` — pure function, case-insensitive comparison, 10 XP per correct answer.
- `submit_attempt(exercise_id, user_id, answers, db)` — checks for duplicate (raises 409), calculates score, awards XP via Progress service, increments `play_count`.
- `get_user_history(user_id, db, skip, limit)` — JOIN query returning `(list[tuple[ListeningAttempt, ListeningExercise]], total)`.

**Exercise types by CEFR level** (`_TYPES_BY_LEVEL`):

| Level | Types |
|-------|-------|
| A1, A2 | `story`, `conversation` |
| B1, B2 | `story`, `dialogue`, `interview` |
| C1, C2 | `news_report`, `lecture`, `debate` |

### Reading Service (`reading_service.py`)

Manages AI-generated reading comprehension exercises end-to-end (Phase 7):

- `get_available_exercise(level, target_language, user_id, db)` — returns the oldest unread exercise for the user’s level/language, excluding already-attempted ones. Returns `None` if pool is empty.
- `generate_and_save_exercise(level, target_language, db)` — calls LLM (with one retry on malformed JSON), extracts topic + text + 5 questions. No audio — text is served directly to the client.
- `calculate_score(questions, answers) → (score, xp_earned)` — pure function, case-insensitive option comparison, 10 XP per correct answer.
- `submit_attempt(exercise_id, user_id, answers, db)` — checks for duplicate (raises 409), calculates score, awards XP via Progress service, increments `view_count`.
- `get_user_history(user_id, db, skip, limit)` — JOIN query returning `(list[tuple[ReadingAttempt, ReadingExercise]], total)`.

**Exercise types by CEFR level** (`_TYPES_BY_LEVEL`):

| Level | Types |
|-------|-------|
| A1, A2 | `notice`, `email` |
| B1 | `email`, `article`, `news` |
| B2 | `article`, `news`, `blog_post`, `review` |
| C1 | `news`, `blog_post`, `review`, `essay` |
| C2 | `review`, `essay` |

### Quota Service (`quota_service.py`)

Enforces per-user voice conversation quotas stored on the `users` table:

- `conversation_daily_minutes`: max minutes of voice conversation per calendar day.
- `conversation_weekly_minutes`: max minutes per calendar week (Mon–Sun).
- `conversation_weekly_sessions`: session count for the current week.

Called by the conversation router before opening a WebSocket session.

### Subscription Service (`subscription_service.py`)

Single source of truth for subscription-based access control (Phase 5):

- `is_subscribed(user, stripe_enabled) → bool` — returns `True` unconditionally when `stripe_enabled=False` (self-hosted mode, default); otherwise requires `subscription_status` to be `"trialing"` or `"active"`.
- `apply_subscription_quotas(user, db)` — resets conversation and token quotas to defaults when a subscription becomes active or enters trial.

Used by `require_subscription` in `core/deps.py`, which gates all chat, listening, reading, conversation, and memory endpoints.

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

### Backend: pytest + pytest-asyncio

Located in `backend/tests/` with 25 test files:

| File | Covers |
|------|--------|
| `conftest.py` | Fixtures: SQLite in-memory DB, mock Redis (dict-based), HTTP test client, test user/admin |
| `test_auth.py` | Register, login, refresh, logout, me, update-profile |
| `test_auth_extra.py` | Email verification, password reset, blocked-domain rejection, invite-link flow |
| `test_admin.py` | CRUD users, role enforcement (403 for non-admin), invite creation |
| `test_admin_extra.py` | Admin pagination, maintenance mode toggle, edge cases |
| `test_assessment.py` | Quiz start/submit, deterministic CEFR evaluation, LLM error handling |
| `test_study_plan.py` | Generate plan, today’s lessons, auto-generation |
| `test_lessons.py` | Lesson CRUD, exercise answering (MC, free_write, pronunciation), completion flow |
| `test_lessons_extra.py` | Lesson edge cases: repeat answers, invalid exercise type, scoring boundaries |
| `test_flashcards.py` | SM-2 algorithm (quality 0–5, interval/ease_factor logic) |
| `test_flashcards_extra.py` | Flashcard edge cases: bulk create, due-date filtering |
| `test_chat.py` | SSE streaming, conversation CRUD |
| `test_chat_conversations.py` | Conversation rename, delete, history pagination |
| `test_progress.py` | Summary, history, competencies |
| `test_progress_extra.py` | XP edge cases, streak boundaries, skill score updates |
| `test_conversation.py` | WebSocket auth, TTS/STT disabled rejection, pipeline lifecycle |
| `test_listening.py` | Listening exercise generation, retrieval, attempt submission, history |
| `test_listening_extra.py` | Pool exhaustion, duplicate-attempt rejection, score/XP calculation |
| `test_reading.py` | Reading exercise generation, retrieval, attempt submission, history |
| `test_reading_extra.py` | Pool exhaustion, duplicate-attempt rejection, score/XP calculation |
| `test_feedback.py` | Feedback board: create, vote, comment, status update (admin), pagination |
| `test_billing.py` | Stripe Checkout, Customer Portal, webhook event handling |
| `test_maintenance.py` | Maintenance mode: toggle, 503 guard, Redis-fail-open behaviour |
| `test_avatar.py` | Avatar upload, Base64 validation, delete |
| `test_memories.py` | Memory CRUD, marker parsing, FIFO eviction, subscription gate |
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