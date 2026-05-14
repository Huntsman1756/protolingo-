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

| # | Milestone | What is built |
|---|-----------|---------------|
| 1 | DB models & migration | `listening_exercises` + `listening_attempts` tables |
| 2 | Backend service & router | LLM generation, TTS synthesis, audio serving, answer evaluation |
| 3 | Frontend page & components | Exercise card, audio player, question form, results panel, history |
| 4 | Navigation & i18n | Sidebar entry, translations in all 10 locale files |

---

## Exercise types

| Type | Description | CEFR range |
|------|-------------|------------|
| `monologue` | First-person narrative or personal account | A1–B1 |
| `announcement` | Public announcement (airport, shop, office) | A1–B2 |
| `voicemail` | Someone leaving a recorded message | A2–B2 |
| `story` | Short narrative with characters and plot | B1–C2 |
| `podcast` | Informal presentation or opinion piece | B2–C2 |

The LLM selects the most appropriate type for the requested level, or one is chosen at
random from the level-appropriate subset.

---

## Text length by CEFR level

| Level | Target word count |
|-------|------------------|
| A1    | ~80 words        |
| A2    | ~120 words       |
| B1    | ~180 words       |
| B2    | ~250 words       |
| C1    | ~350 words       |
| C2    | ~450 words       |

---

## Milestone 1 — Database

### 1.1 `app/models/listening.py`

Two new SQLAlchemy 2.0 models.

**`ListeningExercise`** — one row per generated exercise, shared across users:

```python
class ListeningExercise(Base):
    __tablename__ = "listening_exercises"

    id: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid.uuid4)
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

    id: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid.uuid4)
    user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    exercise_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("listening_exercises.id", ondelete="CASCADE"), nullable=False)
    answers: Mapped[dict] = mapped_column(JSON, nullable=False)   # { "0": "B", "1": "A", ... }
    score: Mapped[int] = mapped_column(Integer, nullable=False)   # 0–5
    xp_earned: Mapped[int] = mapped_column(Integer, nullable=False)
    completed_at: Mapped[datetime] = mapped_column(DateTime, nullable=False, default=datetime.utcnow)

    user: Mapped["User"] = relationship(back_populates="listening_attempts")
    exercise: Mapped["ListeningExercise"] = relationship(back_populates="attempts")
```

Add `listening_attempts` relationship to `User` model:
```python
listening_attempts: Mapped[list["ListeningAttempt"]] = relationship(back_populates="user", cascade="all, delete-orphan")
```

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
    llm: LLMAdapter,
    tts: TTSService,
    storage_path: str,
) -> ListeningExercise:
    """
    Calls LLM → generates text + questions.
    Calls TTS → receives MP3 bytes.
    Saves MP3 to {storage_path}/listening/{exercise_id}.mp3.
    Saves ListeningExercise row to DB.
    Returns the new exercise.
    """

async def submit_attempt(
    exercise_id: UUID,
    user_id: UUID,
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
    user_id: UUID,
    db: AsyncSession,
    skip: int = 0,
    limit: int = 20,
) -> list[ListeningAttemptWithExercise]:
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

| Method | Path | Rate limit | Description |
|--------|------|------------|-------------|
| GET | `/api/listening/next` | 10/min | Returns the next available uncompleted exercise for the user's level, **without text or correct answers**. If none exists returns `{ "available": false }`. |
| POST | `/api/listening/generate` | 5/min | Triggers on-demand generation for the user's level + language variant. Returns the new exercise (without text/correct answers) or `{ "status": "generating" }` if a generation is already in progress. |
| GET | `/api/listening/audio/{exercise_id}` | 60/min | Streams the MP3 file for the exercise. Returns 404 if the file is missing. Sets `Content-Type: audio/mpeg` and `Accept-Ranges: bytes` for browser seek support. |
| POST | `/api/listening/attempt` | 20/min | Submits answers. Returns score, XP, correct answers, and the exercise transcript. |
| GET | `/api/listening/history` | 30/min | Returns paginated list of the user's past attempts with exercise metadata. |

### 2.5 Schemas (`app/schemas/listening.py`)

**`ListeningExerciseOut`** — safe response (no text, no correct answers):
```python
class QuestionOut(BaseModel):
    index: int
    question: str
    options: dict[str, str]   # { "A": ..., "B": ..., "C": ..., "D": ... }
    # correct is omitted

class ListeningExerciseOut(BaseModel):
    id: UUID
    level: str
    target_language: str
    exercise_type: str
    topic: str
    duration_seconds: int
    questions: list[QuestionOut]
```

**`ListeningNextResponse`**:
```python
class ListeningNextResponse(BaseModel):
    available: bool
    exercise: ListeningExerciseOut | None = None
```

**`ListeningSubmitRequest`**:
```python
class ListeningSubmitRequest(BaseModel):
    exercise_id: UUID
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
    id: UUID
    score: int
    xp_earned: int
    completed_at: datetime
    exercise: ListeningExerciseOut
    text: str           # transcript is included in history view
    answers: dict[str, str]
```

### 2.6 `app/main.py`

Register the router:
```python
from app.routers import listening
app.include_router(listening.router, prefix="/api/listening", tags=["listening"])
```

---

## Milestone 3 — Frontend

### 3.1 Page — `frontend/src/app/(app)/listening/page.tsx`

Two UI states controlled by local state:

**State A — `idle`:** No exercise loaded yet. Calls `GET /api/listening/next`.
- If `available: true` → transition to state **B** with the exercise data.
- If `available: false` → show empty state card with "Generate exercise" button.

**State B — `ready`:** Exercise card visible with audio player. Questions visible but
disabled. "I'm ready" button becomes active once the audio has been played at least once.
Clicking "I'm ready" enables the question form.

**State C — `answering`:** All 5 questions enabled. User selects one option per question.
"Submit" button activates only when all 5 questions have a selection.

**State D — `results`:** After `POST /api/listening/attempt`:
- Score badge (e.g. "4 / 5").
- XP badge (e.g. "+40 XP").
- Correct/incorrect feedback per question (green tick / red cross + correct answer shown).
- Exercise transcript revealed in a collapsible panel (expanded by default).
- "Next exercise" button → calls `GET /api/listening/next` again.

**History tab:** Renders `HistoryList` component. Accessible from a tab at the top of the
page ("Practice" / "History"). Each history entry shows: topic, type badge, level badge,
date, score chip, and a "Review" button that expands inline to show the transcript and
the user's original answers vs correct answers.

### 3.2 Components

| Component | Path | Purpose |
|-----------|------|---------|
| `ListeningCard` | `components/listening/ListeningCard.tsx` | Outer card: topic, type badge, level badge, duration |
| `ListeningAudioPlayer` | `components/listening/ListeningAudioPlayer.tsx` | Play / Pause / Stop, progress bar (0–100%), time display. Uses `<audio>` element pointing to `/api/listening/audio/{id}` via the Next.js route handler proxy. Fires `onPlayed` callback when played at least once. |
| `QuestionsList` | `components/listening/QuestionsList.tsx` | Renders 5 `QuestionCard` items. Accepts `disabled` prop (before "I'm ready"). |
| `QuestionCard` | `components/listening/QuestionCard.tsx` | Single question with A/B/C/D radio options. |
| `ResultsPanel` | `components/listening/ResultsPanel.tsx` | Score, XP, per-question feedback, transcript collapsible. |
| `HistoryList` | `components/listening/HistoryList.tsx` | Paginated list of past attempts. |
| `GeneratingSpinner` | `components/listening/GeneratingSpinner.tsx` | Shown during on-demand generation (polls `GET /api/listening/next` every 1 s until available). |

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

Add `"listening": "Listening"` under the `nav` key in **all 10 locale files**:

```
messages/en.json
messages/es.json
messages/fr.json
messages/de.json
messages/it.json
messages/nl.json
messages/pl.json
messages/pt.json
messages/ro.json
messages/ru.json
```

The label is "Listening" across all locales (the term is internationally understood in
language learning contexts and does not need translation).

Also add the page-level strings for buttons, labels, and status messages. Example keys
under a new `listening` namespace:

```json
"listening": {
  "title": "Listening",
  "tabPractice": "Practice",
  "tabHistory": "History",
  "generateButton": "Generate exercise",
  "generatingMessage": "Generating your exercise…",
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
|-------|-----------|
| 0/5   | 0 XP      |
| 1/5   | 10 XP     |
| 2/5   | 20 XP     |
| 3/5   | 30 XP     |
| 4/5   | 40 XP     |
| 5/5   | 50 XP     |

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
    ├── <exercise_uuid>.mp3
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

| Endpoint | Limit |
|----------|-------|
| `GET /api/listening/next` | 10/min |
| `POST /api/listening/generate` | 5/min |
| `GET /api/listening/audio/{id}` | 60/min |
| `POST /api/listening/attempt` | 20/min |
| `GET /api/listening/history` | 30/min |

---

## Testing

### Backend — `backend/tests/test_listening.py`

Follows the same infrastructure as the rest of the test suite: SQLite in-memory DB,
dict-based mock Redis, mocked LLM and TTS, `httpx.AsyncClient` via `ASGITransport`.
Audio file I/O is redirected to a `tmp_path` pytest fixture by overriding
`settings.AUDIO_STORAGE_PATH` via `monkeypatch`.

#### Mocks

| Dependency | Mock strategy |
|------------|---------------|
| `LLMAdapter.chat()` | Returns deterministic JSON string with topic, text, and 5 questions |
| `TTSService.synthesize()` | Returns `b"FAKEMP3DATA"` (fake MP3 bytes) |
| `settings.AUDIO_STORAGE_PATH` | `monkeypatch` → pytest `tmp_path` |
| Redis generation lock | Mock Redis `set`/`get`/`delete` (already mocked in `conftest.py`) |

#### Test cases

**`GET /api/listening/next`**
- Returns `{ "available": false }` when no exercise exists for the user's level
- Returns exercise (without `text` or `correct` answers) when a cached exercise exists for the user's level
- Does not return an exercise the requesting user has already completed
- Returns an exercise created by a different user at the same level (shared pool)
- Returns 401 without a valid access token

**`POST /api/listening/generate`**
- Calls LLM mock and TTS mock, saves `ListeningExercise` row and MP3 file, returns exercise without `text`/`correct`
- Response does not include `text` or any `correct` field in `questions`
- Returns 202 with `{ "status": "generating" }` when Redis generation lock is already held
- Returns 503 when LLM returns invalid JSON on both attempts (malformed response simulation)
- Returns 401 without a valid access token
- Calling generate twice in quick succession: second call returns 202 (lock held by first)

**`GET /api/listening/audio/{exercise_id}`**
- Returns 200 with `Content-Type: audio/mpeg` and the MP3 bytes when file exists
- Returns 404 with `{ "detail": "Audio file not found" }` when file is missing from disk
- Returns 404 for a non-existent `exercise_id`
- Returns 401 without a valid access token

**`POST /api/listening/attempt`**
- All 5 correct answers → `score: 5`, `xp_earned: 50`, transcript in response
- Mixed answers (3 correct) → `score: 3`, `xp_earned: 30`
- All 5 wrong answers → `score: 0`, `xp_earned: 0`
- `text` field is present in response (transcript revealed)
- `correct_answers` list contains all 5 entries with correct letters
- User `xp` is incremented in the DB by `xp_earned` after submission
- `exercise.play_count` is incremented by 1 after submission
- Submitting again for the same exercise returns 409 (attempt already exists)
- Returns 404 when `exercise_id` does not exist
- Returns 401 without a valid access token

**`GET /api/listening/history`**
- Returns empty list when user has no attempts
- Returns paginated list of attempts with exercise data (`topic`, `type`, `level`, `score`, `completed_at`)
- `text` is included in each history entry (transcript accessible after completion)
- `answers` contains the user's original submitted answers
- Default pagination: `skip=0`, `limit=20`
- Returns 401 without a valid access token

**Score / XP calculation**
- Unit-level tests on the scoring logic: given `questions` JSON and `answers` dict, verify `score` and `xp_earned` for all boundary cases (0/5, 3/5, 5/5)

#### Fixture: pre-built exercise

A shared `listening_exercise` fixture creates a `ListeningExercise` row in the test DB
with a known `questions` JSON (5 questions, correct answers `A, B, C, D, A`) and writes
a fake MP3 file to `tmp_path`. This avoids triggering LLM/TTS in tests that only need an
existing exercise.

```python
@pytest.fixture
async def listening_exercise(db_session, tmp_path, monkeypatch):
    monkeypatch.setattr(settings, "AUDIO_STORAGE_PATH", str(tmp_path))
    audio_dir = tmp_path / "listening"
    audio_dir.mkdir()
    exercise = ListeningExercise(
        level="B1",
        target_language="en-US",
        exercise_type="monologue",
        topic="A day at the market",
        text="It was a bright morning when Sarah decided to visit the local market...",
        audio_path=str(audio_dir / "<id>.mp3"),  # set after insert
        questions=[
            {"index": 0, "question": "Where did Sarah go?", "options": {"A": "The market", "B": "The park", "C": "The school", "D": "The office"}, "correct": "A"},
            {"index": 1, "question": "When did she go?", "options": {"A": "Evening", "B": "Morning", "C": "Afternoon", "D": "Night"}, "correct": "B"},
            {"index": 2, "question": "What was the weather like?", "options": {"A": "Rainy", "B": "Cloudy", "C": "Bright", "D": "Snowy"}, "correct": "C"},
            {"index": 3, "question": "What does 'local' mean here?", "options": {"A": "Far away", "B": "Nearby", "C": "Famous", "D": "Large"}, "correct": "D"},
            {"index": 4, "question": "What is the main purpose of the text?", "options": {"A": "To advertise", "B": "To inform", "C": "To entertain", "D": "To warn"}, "correct": "A"},
        ],
    )
    db_session.add(exercise)
    await db_session.commit()
    await db_session.refresh(exercise)
    audio_path = audio_dir / f"{exercise.id}.mp3"
    audio_path.write_bytes(b"FAKEMP3DATA")
    exercise.audio_path = str(audio_path)
    await db_session.commit()
    return exercise
```

### Update `specs/testing.instructions.md`

Add `test_listening.py` to the test file inventory table:

| File | Lines (est.) | What it covers |
|------|-------------|----------------|
| `test_listening.py` | ~200 | Exercise pool (next / generate), generation lock, audio serving, answer evaluation (score + XP), attempt deduplication, history |

### Frontend — Vitest (pending)

Status: **pending implementation**, consistent with the rest of frontend tests.

Tests to implement when frontend testing is set up:

| Component / util | What to test |
|------------------|-------------|
| `QuestionCard` | Renders question text and 4 options; selection updates state correctly; disabled prop prevents interaction |
| `QuestionsList` | Renders 5 questions; submit button disabled until all answered; passes answers array to callback |
| `ResultsPanel` | Renders correct score badge; XP badge; marks correct/incorrect per question; shows transcript text |
| `ListeningAudioPlayer` | `onPlayed` callback fires after play; pause/stop controls update playback state |
| `HistoryList` | Renders empty state when no attempts; renders attempt rows with score chip and "Review" button |
| Page state machine | `idle` → `ready` after exercise load; `ready` → `answering` after "I'm ready"; `answering` → `results` after submit response |

---

## Files created / modified

| Action | File |
|--------|------|
| Create | `backend/app/models/listening.py` |
| Create | `backend/app/schemas/listening.py` |
| Create | `backend/app/services/listening_service.py` |
| Create | `backend/app/routers/listening.py` |
| Create | `backend/alembic/versions/0018_listening.py` |
| Create | `backend/tests/test_listening.py` |
| Modify | `backend/app/models/user.py` — add `listening_attempts` relationship |
| Modify | `backend/app/main.py` — register listening router |
| Modify | `backend/app/core/config.py` — add `AUDIO_STORAGE_PATH` |
| Modify | `docker-compose.yml` — add `AUDIO_STORAGE_PATH` env var + `audio_data` volume |
| Modify | `.env.example` — add `AUDIO_STORAGE_PATH` |
| Create | `frontend/src/app/(app)/listening/page.tsx` |
| Create | `frontend/src/app/api/listening/audio/[exerciseId]/route.ts` |
| Create | `frontend/src/components/listening/ListeningCard.tsx` |
| Create | `frontend/src/components/listening/ListeningAudioPlayer.tsx` |
| Create | `frontend/src/components/listening/QuestionsList.tsx` |
| Create | `frontend/src/components/listening/QuestionCard.tsx` |
| Create | `frontend/src/components/listening/ResultsPanel.tsx` |
| Create | `frontend/src/components/listening/HistoryList.tsx` |
| Create | `frontend/src/components/listening/GeneratingSpinner.tsx` |
| Modify | `frontend/src/app/(app)/layout.tsx` — add Listening nav item |
| Modify | `messages/*.json` (all 10) — add `nav.listening` + `listening.*` keys |
| Modify | `specs/phase-5-stripe-subscriptions.instructions.md` — add Listening to access rules |
| Modify | `specs/api-endpoints.instructions.md` — add Listening endpoints |
| Modify | `specs/architecture.instructions.md` — add new models and service |
| Modify | `specs/rate-limiting.instructions.md` — add Listening rate limits |
| Modify | `AGENTS.md` — update phase table |
| Modify | `CHANGELOG.md` + `specs/version.md` — version bump |