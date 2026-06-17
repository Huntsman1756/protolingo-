---
description: "Phase 6 specification for FreeLingo: Listening section — LLM-generated audio exercises with comprehension questions, on-demand MP3 caching, per-user attempt tracking, XP rewards, and history replay."
applyTo: "backend/**, frontend/**, messages/**"
---

# Phase 6 — Listening

## Objective

Add a dedicated Listening section where users practice English audio comprehension.
The backend generates a text via LLM, converts it to MP3 via the existing TTS service,
and stores both the text and the audio file on disk so subsequent users at the same level
receive the cached version at zero extra cost. The user listens to the audio, answers 5
multiple-choice comprehension questions graded to their CEFR level, and only then sees
the transcript. Progress is saved as an attempt with a score and XP reward. Completed
exercises are not shown again as "new", but remain accessible in a personal history tab.

---

## Milestones

| #   | Milestone                  | What is built                                                      |
| --- | -------------------------- | ------------------------------------------------------------------ |
| 1   | DB models & migration      | `listening_exercises` + `listening_attempts` tables                |
| 2   | Backend service & router   | LLM generation, TTS synthesis, audio serving, answer evaluation    |
| 3   | Frontend page & components | Exercise card, audio player, question form, results panel, history |
| 4   | Navigation & i18n          | Sidebar entry, translations in all 10 locale files                 |

---

## Exercise types

| Type           | Description                                    | CEFR range   |
| -------------- | ---------------------------------------------- | ------------ |
| `monologue`    | First-person narrative or personal account     | A1–A2, C1–C2 |
| `announcement` | Public announcement (airport, shop, office)    | A1–B1        |
| `voicemail`    | Someone leaving a recorded message             | A1–B2        |
| `dialogue`     | Short informal conversation between two people | A1–B1        |
| `story`        | Short narrative with characters and plot       | A1–C2        |
| `podcast`      | Informal presentation or opinion piece         | B1–C2        |
| `interview`    | Structured Q&A between a host and a guest      | B2–C2        |
| `news`         | Short news broadcast or report segment         | B2–C2        |

Each level has exactly 5 types (`_TYPES_BY_LEVEL` in `listening_service.py`):

| Level | Available types                                               |
| ----- | ------------------------------------------------------------- |
| A1    | `monologue`, `announcement`, `voicemail`, `dialogue`, `story` |
| A2    | `monologue`, `announcement`, `voicemail`, `dialogue`, `story` |
| B1    | `announcement`, `voicemail`, `story`, `dialogue`, `podcast`   |
| B2    | `voicemail`, `story`, `podcast`, `interview`, `news`          |
| C1    | `story`, `podcast`, `interview`, `news`, `monologue`          |
| C2    | `story`, `podcast`, `interview`, `news`, `monologue`          |

One type is selected at random from the level-appropriate subset. Types may repeat across levels.

---

## Text length by CEFR level

| Level | Target word count |
| ----- | ----------------- |
| A1    | ~80 words         |
| A2    | ~120 words        |
| B1    | ~180 words        |
| B2    | ~250 words        |
| C1    | ~350 words        |
| C2    | ~450 words        |

---

## Milestone 1 — Database

### 1.1 `app/models/listening.py`

Two new SQLAlchemy 2.0 models.

**`ListeningExercise`** — one row per generated exercise, shared across users:

```python
class ListeningExercise(Base):
    __tablename__ = "listening_exercises"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    level: Mapped[str] = mapped_column(String(2), nullable=False, index=True)          # A1–C2
    target_language: Mapped[str] = mapped_column(String(10), nullable=False, index=True)  # BCP-47
    exercise_type: Mapped[str] = mapped_column(String(20), nullable=False)             # see table above
    topic: Mapped[str] = mapped_column(String(200), nullable=False)                    # brief topic label shown to user
    text: Mapped[str] = mapped_column(Text, nullable=False)                            # transcript (NOT sent until after submit)
    audio_path: Mapped[str] = mapped_column(String(500), nullable=False)               # absolute path to MP3 on disk
    duration_seconds: Mapped[int] = mapped_column(Integer, nullable=False, default=0)  # filled after synthesis (metadata)
    questions: Mapped[dict] = mapped_column(JSON, nullable=False)                      # see Questions JSON schema below
    play_count: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    created_at: Mapped[datetime] = mapped_column(DateTime, nullable=False, default=datetime.utcnow)

    attempts: Mapped[list["ListeningAttempt"]] = relationship(back_populates="exercise")
```

**`ListeningAttempt`** — one row per user completion:

```python
class ListeningAttempt(Base):
    __tablename__ = "listening_attempts"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    exercise_id: Mapped[int] = mapped_column(Integer, ForeignKey("listening_exercises.id", ondelete="CASCADE"), nullable=False, index=True)
    answers: Mapped[dict] = mapped_column(JSON, nullable=False)   # { "0": "B", "1": "A", ... }
    score: Mapped[int] = mapped_column(Integer, nullable=False)   # 0–5
    xp_earned: Mapped[int] = mapped_column(Integer, nullable=False)
    completed_at: Mapped[datetime] = mapped_column(DateTime, nullable=False, default=...)
```

No ORM relationships are defined on these models — queries use explicit JOINs.

### Questions JSON schema

Stored in `listening_exercises.questions`:

```json
[
  {
    "index": 0,
    "question": "What is the main topic of the announcement?",
    "options": {
      "A": "A flight delay",
      "B": "A gate change",
      "C": "A lost item",
      "D": "A boarding call"
    },
    "correct": "B"
  }
]
```

5 questions ordered by cognitive demand:

- Q0–Q1: literal comprehension (explicit information from the text)
- Q2–Q3: inference (implied meaning, tone, purpose)
- Q4: vocabulary or register (word meaning in context or formality level)

### 1.2 Alembic migration `0018_listening.py`

```
revision = "0018_listening"
down_revision = "0017_fix_tokens_default"
```

Creates tables `listening_exercises` and `listening_attempts` with all columns and
a composite index on `(level, target_language)` for the pool lookup query.

---

## Milestone 2 — Backend

### 2.1 Environment variable

Add to `app/core/config.py`:

```python
AUDIO_STORAGE_PATH: str = "/data/audio"
```

Add to `docker-compose.yml` under `backend.environment`:

```yaml
AUDIO_STORAGE_PATH: ${AUDIO_STORAGE_PATH:-/data/audio}
```

Add to `.env.example`:

```env
# Absolute path where generated audio files are stored.
# A named Docker volume or a bind mount must cover this path.
AUDIO_STORAGE_PATH=/data/audio
```

Add a named volume `audio_data` in `docker-compose.yml` (mounted at `/data/audio` in the
backend service), so files survive container restarts.

### 2.2 LLM prompt (`app/services/listening_service.py`)

The generation prompt instructs the LLM to return a strict JSON object:

```
You are an English language content creator. Generate a listening exercise for a {level}
learner. Target language variant: {target_language}.

Requirements:
- Exercise type: {exercise_type}
- Length: approximately {word_count} words
- Use {target_language} vocabulary and spelling conventions
- Write naturally, as if it will be read aloud
- Do not use headers, markdown, or lists — plain flowing text only

Return ONLY valid JSON, no prose, no code fences:
{
  "topic": "<brief topic label, max 10 words>",
  "text": "<exercise text>",
  "questions": [
    {
      "index": 0,
      "question": "<question text>",
      "options": { "A": "...", "B": "...", "C": "...", "D": "..." },
      "correct": "<A|B|C|D>"
    }
    // ... 5 questions total
  ]
}
```

Error handling: if JSON parsing fails, retry once. If still invalid, raise
`ListeningGenerationError` (HTTP 503 upstream). Follow the same retry pattern
established in `specs/llm-error-handling.instructions.md`.

### 2.3 Service (`app/services/listening_service.py`)

```python
async def get_available_exercise(
    level: str,
    target_language: str,
    user_id: UUID,
    db: AsyncSession,
) -> ListeningExercise | None:
    """
    Returns an exercise for this level/language that the user has NOT yet completed.
    Returns None if no cached exercise is available.
    """

async def generate_and_save_exercise(
    level: str,
    target_language: str,
    db: AsyncSession,
    tts_service: TTSService,
    storage_path: str,
) -> ListeningExercise:
    """
    Uses the global llm_adapter singleton (no injection).
    Calls LLM → generates text + 5 questions (retries once on bad JSON).
    Calls TTS → receives MP3 bytes.
    Flushes DB to get the integer exercise ID.
    Saves MP3 to {storage_path}/listening/{id}.mp3.
    Commits. Returns the new ListeningExercise.
    """

async def submit_attempt(
    exercise_id: int,
    user_id: int,
    answers: dict[str, str],   # {"0": "B", "1": "A", ...}
    db: AsyncSession,
) -> ListeningAttempt:
    """
    Validates answers against exercise.questions[i].correct.
    Calculates score (0–5) and xp_earned (score × 10).
    Awards XP to user (same mechanism as lessons: update users.xp).
    Saves and returns ListeningAttempt row.
    Increments exercise.play_count.
    """

async def get_user_history(
    user_id: int,
    db: AsyncSession,
    skip: int = 0,
    limit: int = 10,
) -> tuple[list[tuple[ListeningAttempt, ListeningExercise]], int]:
    """
    Returns past attempts ordered by completed_at DESC, joined with exercise data.
    """
```

A Redis lock key `listening:generating:{level}:{target_language}` (TTL 60 s) prevents
two simultaneous generation requests from creating duplicate exercises. If the lock is
held, the endpoint returns HTTP 202 with `{ "status": "generating" }` and the frontend
polls once per second up to 60 seconds.

### 2.4 Router (`app/routers/listening.py`)

All endpoints require a valid access token. Listening is an AI-powered feature and
therefore subject to the Stripe paywall when `STRIPE_ENABLED=true`.

- **GET `/api/listening/next`** — Rate limit: 10/min. Returns the next available uncompleted exercise for the user's level, **without text or correct answers**. If none exists returns `{ "available": false }`.
- **POST `/api/listening/generate`** — Rate limit: 5/min. Triggers on-demand generation for the user's level + language variant. Returns the new exercise (without text/correct answers) or `{ "status": "generating" }` if a generation is already in progress.
- **GET `/api/listening/audio/{exercise_id}`** — Rate limit: 60/min. Streams the MP3 file for the exercise. Returns 404 if the file is missing. Sets `Content-Type: audio/mpeg` and `Accept-Ranges: bytes` for browser seek support.
- **POST `/api/listening/attempt`** — Rate limit: 20/min. Submits answers. Returns score, XP, correct answers, and the exercise transcript.
- **GET `/api/listening/history`** — Rate limit: 30/min. Returns paginated list of the user's past attempts with exercise metadata.

### 2.5 Schemas (`app/schemas/listening.py`)

**`ListeningExerciseOut`** — safe response (no text, no correct answers):

```python
class QuestionOut(BaseModel):
    index: int
    question: str
    options: dict[str, str]   # { "A": ..., "B": ..., "C": ..., "D": ... }
    # correct is intentionally omitted

class ListeningExerciseOut(BaseModel):
    id: int
    level: str
    target_language: str
    exercise_type: str
    topic: str
    duration_seconds: int
    questions: list[QuestionOut]

    model_config = {"from_attributes": True}
```

**`ListeningNextResponse`**:

```python
class ListeningNextResponse(BaseModel):
    available: bool
    exercise: ListeningExerciseOut | None = None

class ListeningGeneratingResponse(BaseModel):
    status: str  # "generating"
```

**`ListeningSubmitRequest`**:

```python
class ListeningSubmitRequest(BaseModel):
    exercise_id: int
    answers: dict[str, str]   # {"0": "A", "1": "C", ...} — keys "0"–"4"
```

**`ListeningSubmitResponse`**:

```python
class CorrectAnswerOut(BaseModel):
    index: int
    correct: str

class ListeningSubmitResponse(BaseModel):
    score: int          # 0–5
    xp_earned: int
    correct_answers: list[CorrectAnswerOut]
    text: str           # transcript revealed here for the first time
```

**`ListeningAttemptOut`** — used in history:

```python
class ListeningAttemptOut(BaseModel):
    id: int
    score: int
    xp_earned: int
    completed_at: datetime   # serialised as ISO-8601 string via field_serializer
    exercise: ListeningExerciseOut
    text: str           # transcript is included in history view
    answers: dict[str, str]

class ListeningHistoryResponse(BaseModel):
    items: list[ListeningAttemptOut]
    total: int
    skip: int
    limit: int
```

### 2.6 `app/main.py`

Register the router (prefix already declared inside the router module):

```python
from app.routers import listening
app.include_router(listening.router)  # prefix="/api/listening" set in router
```

---

## Milestone 3 — Frontend

### 3.1 Page — `frontend/src/app/(app)/listening/page.tsx`

Single file — all logic and UI inline, wrapped in `PaywallGate`.

Six UI states controlled by local `PageState` type:

| State        | Description                                                                                       |
| ------------ | ------------------------------------------------------------------------------------------------- |
| `loading`    | Initial fetch of `GET /api/listening/next` in progress                                            |
| `generating` | `POST /api/listening/generate` sent; polls `GET /next` every 3 s until available                  |
| `idle`       | No exercise available and no generation in progress; shows "Generate" button                      |
| `exercise`   | Exercise card + `ExerciseAudioPlayer` + question form; "Submit" activates when all 5 answered     |
| `results`    | Score, XP, per-question feedback, transcript, "Next exercise" / "View history" buttons            |
| `history`    | Paginated list of past attempts; each row shows topic, score, date, "Review" (expands transcript) |

**`ExerciseAudioPlayer`** — inline component within the same file:

- Fetches audio via `apiFetch('/api/listening/audio/{id}')` (carries `Authorization` header) → creates a blob URL → HTML `<audio>` element.
- Custom scrubber bar (SVG/div), progress %, error state for failed loads.

### 3.2 Components

- **`ListeningCard`** — Path: `components/listening/ListeningCard.tsx`. Purpose: Outer card: topic, type badge, level badge, duration
- **`ListeningAudioPlayer`** — Path: `components/listening/ListeningAudioPlayer.tsx`. Purpose: Play / Pause / Stop, progress bar (0–100%), time display. Uses `<audio>` element pointing to `/api/listening/audio/{id}` via the Next.js route handler proxy. Fires `onPlayed` callback when played at least once.
- **`QuestionsList`** — Path: `components/listening/QuestionsList.tsx`. Purpose: Renders 5 `QuestionCard` items. Accepts `disabled` prop (before "I'm ready").
- **`QuestionCard`** — Path: `components/listening/QuestionCard.tsx`. Purpose: Single question with A/B/C/D radio options.
- **`ResultsPanel`** — Path: `components/listening/ResultsPanel.tsx`. Purpose: Score, XP, per-question feedback, transcript collapsible.
- **`HistoryList`** — Path: `components/listening/HistoryList.tsx`. Purpose: Paginated list of past attempts.
- **`GeneratingSpinner`** — Path: `components/listening/GeneratingSpinner.tsx`. Purpose: Shown during on-demand generation (polls `GET /api/listening/next` every 1 s until available).

### 3.3 Next.js route handler proxy — audio

`frontend/src/app/api/listening/audio/[exerciseId]/route.ts`

Proxies `GET /api/listening/audio/{exerciseId}` to the backend and pipes the MP3 stream
through, forwarding `Content-Type: audio/mpeg`, `Content-Length`, and `Accept-Ranges`
headers. This keeps the backend URL internal and attaches the user's access token.

### 3.4 Zustand store (optional, lightweight)

No new store needed. The page manages all transient state locally with `useState`.
Auth token is read from the existing `useAuthStore`.

---

## Milestone 4 — Navigation & i18n

### 4.1 Sidebar — `frontend/src/app/(app)/layout.tsx`

Add to `mainNavItems` between `tutor` (chat) and `conversation`:

```typescript
{ href: '/listening', label: tNav('listening') },
```

### 4.2 i18n keys

Add `"listening": "..."` under the `nav` key in **all 10 locale files**. The label is
translated per locale (not kept in English):

| Locale | `nav.listening` |
| ------ | --------------- |
| en     | Listening       |
| es     | Escucha         |
| de     | Hören           |
| fr     | Écoute          |
| it     | Ascolto         |
| nl     | Luisteren       |
| pl     | Słuchanie       |
| pt     | Audição         |
| ro     | Ascultare       |
| ru     | Аудирование     |

Also add the page-level strings for buttons, labels, and status messages. Example keys
under a new `listening` namespace:

```json
"listening": {
  "title": "Listening",
  "tabPractice": "Practice",
  "tabHistory": "History",
  "generateButton": "Generate exercise",
  "generatingMessage": "Generating your exercise...",
  "readyButton": "I'm ready",
  "submitButton": "Submit answers",
  "nextButton": "Next exercise",
  "score": "{score} / 5",
  "xpEarned": "+{xp} XP",
  "transcriptLabel": "Transcript",
  "noHistory": "No exercises completed yet.",
  "reviewButton": "Review",
  "typeMonologue": "Monologue",
  "typeAnnouncement": "Announcement",
  "typeVoicemail": "Voicemail",
  "typeStory": "Story",
  "typePodcast": "Podcast",
  "emptyState": "No exercises available for your level yet.",
  "errorGenerate": "Could not generate exercise. Please try again.",
  "errorSubmit": "Could not submit answers. Please try again."
}
```

---

## XP rewards

| Score | XP awarded |
| ----- | ---------- |
| 0/5   | 0 XP       |
| 1/5   | 10 XP      |
| 2/5   | 20 XP      |
| 3/5   | 30 XP      |
| 4/5   | 40 XP      |
| 5/5   | 50 XP      |

XP is added to `users.xp` using the same mechanism as lesson completion.
Replaying an exercise from history awards **no additional XP**.

---

## Stripe paywall

Listening is an AI-powered feature. When `STRIPE_ENABLED=true`:

- `GET /api/listening/next` → 403 if user is not `active` or `trialing`
- `POST /api/listening/generate` → 403 if user is not `active` or `trialing`
- `POST /api/listening/attempt` → 403 if user is not `active` or `trialing`
- `GET /api/listening/history` → accessible regardless (no AI cost)
- `GET /api/listening/audio/{id}` → 403 if user is not `active` or `trialing`

The frontend must show the paywall banner (same component as other gated features) when
the backend returns 403 on these endpoints.

Add Listening to the access rules table in `specs/phase-5-stripe-subscriptions.instructions.md`.

---

## Audio file storage

```
/data/audio/
└── listening/
    ├── 1.mp3
    ├── 2.mp3
    └── ...
```

- The `/data/audio` directory is mounted as a named Docker volume (`audio_data`) shared
  by the backend service so files persist across restarts and deployments.
- File naming: `{exercise.id}.mp3` — deterministic, no collisions.
- No CDN or object storage required for self-hosted deployments. The backend streams the
  file directly via `FileResponse` (FastAPI).
- If a file is missing on disk (e.g. volume not mounted), `GET /api/listening/audio/{id}`
  returns HTTP 404 with `{ "detail": "Audio file not found" }`.

---

## Rate limiting summary

| Endpoint                        | Limit  |
| ------------------------------- | ------ |
| `GET /api/listening/next`       | 10/min |
| `POST /api/listening/generate`  | 5/min  |
| `GET /api/listening/audio/{id}` | 60/min |
| `POST /api/listening/attempt`   | 20/min |
| `GET /api/listening/history`    | 30/min |

---

## Testing

### Backend — `backend/tests/test_listening.py`

20 tests using SQLite in-memory DB, a custom `_MockRedis` class (supports `set(nx, ex)` for lock semantics), mocked LLM and TTS, and `httpx.AsyncClient` via `ASGITransport`. Audio files use `tmp_path`; `settings.AUDIO_STORAGE_PATH` is overridden via `monkeypatch` in the `listening_client` fixture.

#### Mocks

| Dependency                    | Mock strategy                                                            |
| ----------------------------- | ------------------------------------------------------------------------ |
| `llm_adapter.chat()`          | `AsyncMock` returning deterministic JSON (topic + text + 5 questions)    |
| `tts_service.synthesise()`    | `AsyncMock` returning `b"FAKEMP3DATA"`                                   |
| `settings.AUDIO_STORAGE_PATH` | `monkeypatch` on the `listening_client` fixture → `tmp_path`             |
| Redis generation lock         | Custom `_MockRedis` class defined in the test file (not shared conftest) |

#### Test cases (20 total)

**`calculate_score` — unit (4)**

- All 5 correct → score 5, xp 50
- All 5 wrong → score 0, xp 0
- Partial (3 correct) → score 3, xp 30
- Case-insensitive matching

**`GET /api/listening/next` (5)**

- Returns 401 without token
- Returns 404 when user has no study plan
- Returns `available: false` when pool is empty
- Returns exercise without `text` or `correct` fields when one exists
- Skips exercises already completed by the user

**`POST /api/listening/generate` (3)**

- Returns 202 on success
- Returns 404 when user has no study plan
- Returns 409 when Redis lock is already held

**`POST /api/listening/attempt` (4)**

- Returns 404 for unknown exercise
- Scores correctly and reveals transcript
- Returns `score: 0, xp_earned: 0` for all-wrong answers
- Returns 409 on duplicate submission

**`GET /api/listening/audio` (3)**

- Returns 404 for unknown exercise
- Returns 404 when MP3 file is missing from disk
- Returns 200 with `audio/mpeg` content-type when file exists (`tmp_path`)

**`GET /api/listening/history` (3 + 1 auth)**

- Returns empty list when user has no attempts
- Returns paginated attempts with exercise data
- Caps limit at 50
- Returns 401 without token

### `specs/testing.instructions.md`

Add `test_listening.py` to the test file inventory table:

- **`test_listening.py`** — Lines (est.): ~350. What it covers: `calculate_score` unit tests, exercise pool (`next` / `generate`), generation lock, audio serving, answer evaluation (score + XP), attempt deduplication, history

### Frontend — Vitest (pending)

Status: **pending implementation**, consistent with the rest of frontend tests.

---

## Files created / modified

| Action | File                                                                                 |
| ------ | ------------------------------------------------------------------------------------ |
| Create | `backend/app/models/listening.py`                                                    |
| Create | `backend/app/schemas/listening.py`                                                   |
| Create | `backend/app/services/listening_service.py`                                          |
| Create | `backend/app/routers/listening.py`                                                   |
| Create | `backend/alembic/versions/0018_listening.py`                                         |
| Create | `backend/tests/test_listening.py`                                                    |
| Modify | `backend/app/models/user.py` — add `listening_attempts` relationship                 |
| Modify | `backend/app/main.py` — register listening router                                    |
| Modify | `backend/app/core/config.py` — add `AUDIO_STORAGE_PATH`                              |
| Modify | `docker-compose.yml` — add `AUDIO_STORAGE_PATH` env var + `audio_data` volume        |
| Modify | `.env.example` — add `AUDIO_STORAGE_PATH`                                            |
| Create | `frontend/src/app/(app)/listening/page.tsx`                                          |
| Create | `frontend/src/app/api/listening/audio/[exerciseId]/route.ts`                         |
| Create | `frontend/src/components/listening/ListeningCard.tsx`                                |
| Create | `frontend/src/components/listening/ListeningAudioPlayer.tsx`                         |
| Create | `frontend/src/components/listening/QuestionsList.tsx`                                |
| Create | `frontend/src/components/listening/QuestionCard.tsx`                                 |
| Create | `frontend/src/components/listening/ResultsPanel.tsx`                                 |
| Create | `frontend/src/components/listening/HistoryList.tsx`                                  |
| Create | `frontend/src/components/listening/GeneratingSpinner.tsx`                            |
| Modify | `frontend/src/app/(app)/layout.tsx` — add Listening nav item                         |
| Modify | `messages/*.json` (all 10) — add `nav.listening` + `listening.*` keys                |
| Modify | `specs/phase-5-stripe-subscriptions.instructions.md` — add Listening to access rules |
| Modify | `specs/api-endpoints.instructions.md` — add Listening endpoints                      |
| Modify | `specs/architecture-backend.instructions.md` — add new models and service            |
| Modify | `specs/rate-limiting.instructions.md` — add Listening rate limits                    |
| Modify | `AGENTS.md` — update phase table                                                     |
| Modify | `CHANGELOG.md` + `specs/version.md` — version bump                                   |
