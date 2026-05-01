---
description: "Complete architecture of FreeLingo: repository structure, database models (User, StudyPlan, Lesson, Exercise, Flashcard, Progress), all REST and WebSocket API endpoints, lesson generation flow, LLM Adapter design, architecture decisions, code standards (ruff, black, ESLint, Prettier) and test configuration with pytest."
applyTo: "backend/**, frontend/**"
---

# Architecture — FreeLingo

## Repository structure

```
freelingo/
├── backend/
│   ├── app/
│   │   ├── main.py                  # FastAPI entry point, router registration
│   │   ├── core/
│   │   │   ├── config.py            # Settings via pydantic-settings (.env)
│   │   │   ├── database.py          # Async engine, SessionLocal
│   │   │   └── security.py          # JWT encode/decode, password hash
│   │   ├── models/                  # SQLAlchemy ORM models
│   │   │   ├── user.py
│   │   │   ├── study_plan.py
│   │   │   ├── lesson.py
│   │   │   ├── exercise.py
│   │   │   ├── flashcard.py
│   │   │   └── progress.py
│   │   ├── schemas/                 # Pydantic v2 schemas (request/response)
│   │   ├── routers/                 # Endpoints grouped by domain
│   │   │   ├── auth.py
│   │   │   ├── admin.py             # User management (admin role only)
│   │   │   ├── assessment.py
│   │   │   ├── study_plan.py
│   │   │   ├── lessons.py
│   │   │   ├── flashcards.py
│   │   │   ├── progress.py
│   │   │   ├── chat.py
│   │   │   ├── tts.py               # Phase 2
│   │   │   └── stt.py               # Phase 2
│   │   └── services/
│   │       ├── llm_adapter.py       # Ollama/OpenAI abstraction
│   │       ├── assessment.py
│   │       ├── study_plan_generator.py
│   │       ├── lesson_generator.py
│   │       ├── flashcard_sm2.py
│   │       ├── tts_service.py       # Phase 2
│   │       └── stt_service.py       # Phase 2
│   ├── alembic/                     # DB migrations
│   ├── tests/
│   ├── Dockerfile
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── app/                     # Next.js App Router
│   │   │   ├── (auth)/login/
│   │   │   ├── assessment/
│   │   │   ├── dashboard/
│   │   │   ├── lesson/[id]/
│   │   │   ├── flashcards/
│   │   │   ├── chat/
│   │   │   ├── conversation/        # Phase 3
│   │   │   └── settings/
│   │   ├── components/
│   │   │   ├── ui/                  # shadcn/ui components
│   │   │   ├── assessment/
│   │   │   ├── lesson/
│   │   │   ├── flashcard/
│   │   │   ├── chat/
│   │   │   └── conversation/        # Phase 3
│   │   ├── lib/
│   │   │   ├── api.ts               # Fetch wrapper with auth headers
│   │   │   └── utils.ts
│   │   └── store/                   # Zustand stores
│   │       ├── auth.ts
│   │       └── progress.ts
│   ├── Dockerfile
│   └── package.json
│
├── docker-compose.yml
└── .env.example
```

## Database models

### User
```python
class User(Base):
    id: int
    username: str           # unique, used for login
    email: str              # unique, optional (for account recovery)
    display_name: str       # name shown in the UI
    hashed_password: str
    role: str               # "admin" | "user"
    native_language: str    # User's native language (e.g. "es", "fr", "pt")
                            # Used for flashcard translations and feedback
    is_active: bool         # False = account disabled by admin
    created_at: datetime
    last_login: datetime
```

> **First registered user**: if `FIRST_USER_IS_ADMIN=true` (default), the first
> registration automatically creates an account with `role="admin"`.

> **Open vs closed registration**: controlled by `ALLOW_REGISTRATION=true|false`
> in `.env`. With `false`, only the admin can create new accounts from the panel.

### StudyPlan
```python
class StudyPlan(Base):
    id: int
    user_id: int            # FK User
    cefr_level: str         # A1, A2, B1, B2, C1, C2
    goals: list[str]        # JSON: ["grammar", "vocabulary", "speaking"]
    duration_weeks: int     # 4 | 8 | 12 (default) | 16
    days_per_week: int      # derived from intensity: 5 | 5 | 4 | 3
    generated_plan: dict    # JSON with the week-by-week plan (curriculum-driven)
    current_unit: str       # curriculum unit id, e.g. "a1-unit-3"
    is_active: bool
    created_at: datetime
    # Level completion test
    completion_test_taken: bool         # False until end-of-level test done
    completion_test_score: float | None  # 0.0 – 1.0
    completion_test_recommendation: str | None  # "advance" | "extend" | "repeat"
```

> **Intensity / duration mapping**:
> | Label | Weeks | Days/week | Total lessons |
> |-------|-------|-----------|---------------|
> | Intensive | 4 | 5 | ~20 |
> | Standard | 8 | 5 | ~40 |
> | Relaxed (default) | 12 | 4 | ~48 |
> | Very relaxed | 16 | 3 | ~48 |

### Lesson
```python
class Lesson(Base):
    id: int
    study_plan_id: int      # FK StudyPlan
    title: str
    lesson_type: str        # grammar | vocabulary | reading | writing | speaking
    cefr_level: str
    week_number: int
    day_number: int
    content: dict           # Structured JSON generated by LLM
    is_completed: bool
    completed_at: datetime
```

### Exercise
```python
class Exercise(Base):
    id: int
    lesson_id: int          # FK Lesson
    exercise_type: str      # multiple_choice | fill_blank | translation | free_write
    question: str
    options: list[str]      # JSON, for multiple_choice
    correct_answer: str
    user_answer: str
    score: float            # 0.0 – 1.0
    feedback: str           # LLM feedback
    answered_at: datetime
```

### Flashcard
```python
class Flashcard(Base):
    id: int
    user_id: int            # FK User
    word: str
    definition: str
    example_sentence: str
    translation: str        # Translation to the user's native language (user.native_language)
    # SM-2 fields
    ease_factor: float      # Default 2.5
    interval: int           # Days until next review
    repetitions: int        # Consecutive correct reviews
    next_review: date
    created_at: datetime
```

### Progress
```python
class Progress(Base):
    id: int
    user_id: int            # FK User
    date: date
    xp_earned: int
    lessons_completed: int
    exercises_correct: int
    exercises_total: int
    streak_day: int
    skills: dict            # JSON: {"grammar": 0.6, "vocabulary": 0.4, ...}
```

## API Endpoints

### Auth
```
POST /api/auth/register       → Creates account (respects ALLOW_REGISTRATION)
POST /api/auth/login          → Returns access_token (15min) + refresh_token (30d, httpOnly cookie)
POST /api/auth/refresh        → Rotates refresh_token and returns new access_token
POST /api/auth/logout         → Invalidates refresh_token in Redis
GET  /api/auth/me             → Authenticated user profile
PATCH /api/auth/me            → Updates display_name, email, password
```

### Admin (requires role="admin")
```
GET  /api/admin/users              → Lists all users
POST /api/admin/users              → Creates user directly (bypasses ALLOW_REGISTRATION)
GET  /api/admin/users/{id}         → User detail
PATCH /api/admin/users/{id}        → Edits role, is_active, display_name
DELETE /api/admin/users/{id}       → Deletes account and all its data
POST /api/admin/invite             → Generates single-use invite link
```

### Assessment
```
GET  /api/assessment/start    → Generates 20-question quiz (LLM)
POST /api/assessment/submit   → Submits answers → evaluates CEFR level
```

### Study Plan
```
GET  /api/study-plan/current  → User's active plan
POST /api/study-plan/generate → Generates new plan from CEFR level
GET  /api/study-plan/today    → Today's lessons
```

### Lessons
```
GET  /api/lessons/{id}        → Lesson detail + exercises
POST /api/lessons/{id}/start  → Marks as started
POST /api/lessons/{id}/complete → Marks as completed
POST /api/exercises/{id}/answer → Submits answer, receives score + feedback
```

### Flashcards
```
GET  /api/flashcards/due      → Flashcards pending review today (SM-2)
GET  /api/flashcards/all      → All user's flashcards
POST /api/flashcards          → Creates flashcard manually
POST /api/flashcards/{id}/review → Records result (0=fail, 3=good, 5=perfect)
POST /api/flashcards/generate → Generates N flashcards on a topic via LLM
```

### Chat
```
POST /api/chat                → Message to AI tutor (SSE streaming)
GET  /api/chat/history        → Conversation history
```

### Progress
```
GET  /api/progress/summary    → General summary (streak, XP, level per skill)
GET  /api/progress/history    → History by date
```

### TTS / STT (Phase 2)
```
POST /api/tts                 → text → audio (proxy to Kokoro)
POST /api/stt                 → audio → text (proxy to Whisper)
```

### WebSocket (Phase 3)
```
WS   /ws/conversation         → Real-time voice pipeline
```

## Data flow — Lesson generation

```
Frontend → POST /api/study-plan/generate
    ↓
AssessmentService evaluates user's CEFR level
    ↓
StudyPlanGenerator → LLM Adapter → Ollama/OpenAI
    ↓ structured prompt + level
    ↓ JSON response with weekly plan
    ↓
Persists StudyPlan in PostgreSQL
    ↓
LessonGenerator → LLM Adapter (for each lesson in the plan)
    ↓
Persists Lessons + Exercises in PostgreSQL
    ↓
Frontend ← Generated plan with week 1 lessons
```

## LLM Adapter — Design

```python
class LLMAdapter:
    """
    Abstracts Ollama and OpenAI behind a single interface.
    Instantiated as a singleton on app startup.
    """
    async def chat(self, messages: list[dict], stream: bool = False) -> str | AsyncGenerator
    async def structured_output(self, messages: list[dict], schema: type[BaseModel]) -> BaseModel
```

Configuration via `.env`:
```
LLM_PROVIDER=ollama           # ollama | openai | anthropic | deepseek
OLLAMA_BASE_URL=http://ollama:11434
OLLAMA_MODEL=gemma3:12b
OPENAI_API_KEY=               # Only if LLM_PROVIDER=openai
OPENAI_MODEL=gpt-4o-mini
ANTHROPIC_API_KEY=            # Only if LLM_PROVIDER=anthropic
ANTHROPIC_MODEL=claude-3-5-haiku-latest
DEEPSEEK_API_KEY=             # Only if LLM_PROVIDER=deepseek
DEEPSEEK_MODEL=deepseek-chat
```

## Design decisions

### Authentication: short access token + opaque refresh token in Redis

| Alternative | Problem |
|---|---|
| Single long-lived JWT | Impossible to invalidate a compromised token without a blocklist |
| DB-only sessions | DB query on every request, bottleneck |

**Decision**: 15-min JWT (no DB lookup) + opaque refresh in Redis (native TTL, O(1) invalidation on logout and rotation). When detecting reuse of an already-invalidated refresh token, the user's entire token family can be deleted.

### Async PostgreSQL with asyncpg

- `asyncpg` is the fastest native async driver for PostgreSQL.
- `sqlalchemy[asyncio]>=2.0` provides full ORM without blocking the event loop.
- PostgreSQL native JSON is used for `content` (lessons), `goals` (plans) and `skills` (progress) without needing extra tables.

### Redis for refresh tokens and invites

- Native TTL: no cleanup job needed, Redis expires automatically.
- `O(1)` reads (`GET refresh:{token}`): no JOIN or complex query.
- Clear separation: PostgreSQL for business data, Redis for ephemeral tokens.

### LLM Adapter with OpenAI SDK interface

Ollama, OpenAI and DeepSeek are all compatible with `openai.AsyncOpenAI` by just changing `base_url` and `api_key`. Anthropic requires its own client but is normalized with `_anthropic_chat()` internally. Result: the rest of the code (assessment, study plan, flashcards, chat) always calls `adapter.chat()` without knowing which provider is underneath.

### TTS: Kokoro-FastAPI

- OpenAI TTS-compatible API: same interface as `client.audio.speech.create()`.
- Better English quality than Coqui/Piper for natural voice in dialogues.
- GPU optional but recommended; CPU fallback possible with speed degradation.

### STT: faster-whisper `medium`

- `medium` offers the best speed/accuracy trade-off for English on a consumer GPU.
- `large-v3` is available as an upgrade via environment variable `STT_MODEL=large-v3`.
- The service exposes an OpenAI STT-compatible API, with no backend code changes.

## Code standards

### Backend (Python)

| Tool | Purpose |
|---|---|
| **ruff** | Linting + isort + pyupgrade |
| **black** | Code formatting |

`backend/pyproject.toml`:
```toml
[tool.ruff]
target-version = "py311"
line-length = 100
select = ["E", "W", "F", "I", "UP", "B", "S", "ANN"]
ignore = ["ANN101", "S101"]

[tool.ruff.per-file-ignores]
"tests/*" = ["S", "ANN"]

[tool.black]
line-length = 100
target-version = ["py311"]
```

```bash
ruff check --fix backend/
black backend/
```

### Frontend (TypeScript / Next.js)

| Tool | Purpose |
|---|---|
| **ESLint** | TypeScript linting + Next.js rules |
| **Prettier** | Code formatting |

`frontend/.prettierrc`:
```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

```bash
npx eslint src/ --ext .ts,.tsx
npx prettier --write src/
```

## Tests

### Backend

```
backend/tests/
├── conftest.py           # Fixtures: db, redis mock, app client, test user
├── test_auth.py          # Register, login, refresh, logout, expired tokens
├── test_admin.py         # User CRUD, invite generation, permissions
├── test_assessment.py    # Quiz generation, CEFR evaluation, scoring
├── test_study_plan.py    # Plan generation (mock LLM), persistence
├── test_flashcards.py    # SM-2: ease_factor, interval, next_review
├── test_llm_adapter.py   # Chat, structured_output (per-provider mock)
└── test_progress.py      # XP, streaks, skills update
```

`backend/pyproject.toml`:
```toml
[tool.pytest.ini_options]
asyncio_mode = "auto"
testpaths = ["tests"]
addopts = "--cov=app --cov-report=term-missing --cov-fail-under=70"
```

```bash
cd backend
pytest                          # all tests with coverage
pytest tests/test_auth.py -v    # auth only
pytest --cov-report=html        # HTML report in htmlcov/
```