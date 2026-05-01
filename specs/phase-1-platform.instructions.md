---
description: "Phase 1 of FreeLingo: learning platform. Scaffolding, backend core (config, JWT+Redis auth, async database, LLM adapter), CEFR assessment (20-question quiz, evaluation prompts), weekly study plan generation, interactive lessons with exercises (multiple_choice, fill_blank, free_write), SM-2 flashcards, AI tutor chat with SSE streaming, Next.js frontend (screens, Zustand, refresh interceptor, route middleware, SSE chat). Includes phase completion criteria."
---

# Phase 1 — Learning Platform

## Objective

A functional platform that evaluates the user's CEFR level, generates a personalized
study plan with Ollama, and presents interactive grammar, vocabulary, reading
comprehension, and writing lessons, with SM-2 review flashcards.

---

## Milestones

1. **Scaffolding** — Project structure, base Docker Compose, minimal CI
2. **Backend core** — DB, auth, LLM adapter
3. **Assessment** — Level quiz and CEFR evaluation
4. **Study plan** — Weekly plan generation
5. **Lessons** — Lesson generation and display with exercises
6. **Flashcards** — SM-2 with LLM generation
7. **Chat** — AI tutor with progress context
8. **Complete frontend** — All screens connected to the backend

---

## Milestone 1 — Scaffolding

### Backend dependencies

```
# requirements.txt
fastapi>=0.111
uvicorn[standard]
sqlalchemy[asyncio]>=2.0
asyncpg
alembic
pydantic-settings
pydantic[email]
python-jose[cryptography]
passlib[bcrypt]
httpx
redis[asyncio]
openai>=1.30
anthropic>=0.25
```

### Frontend dependencies

```bash
npx create-next-app@latest frontend --typescript --tailwind --app --src-dir
cd frontend
npx shadcn@latest init
npx shadcn@latest add button card input progress badge separator sheet tabs
npm install zustand
```

---

## Milestone 2 — Backend core

### `app/core/config.py`
```python
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str
    REDIS_URL: str
    SECRET_KEY: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 15
    REFRESH_TOKEN_EXPIRE_DAYS: int = 30
    ALLOW_REGISTRATION: bool = True
    FIRST_USER_IS_ADMIN: bool = True
    LLM_PROVIDER: str = "ollama"        # ollama | openai | anthropic | deepseek
    OLLAMA_BASE_URL: str = "http://ollama:11434"
    OLLAMA_MODEL: str = "gemma3:12b"
    OPENAI_API_KEY: str = ""
    OPENAI_MODEL: str = "gpt-4o-mini"
    ANTHROPIC_API_KEY: str = ""
    ANTHROPIC_MODEL: str = "claude-3-5-haiku-latest"
    DEEPSEEK_API_KEY: str = ""
    DEEPSEEK_MODEL: str = "deepseek-chat"

    class Config:
        env_file = ".env"

settings = Settings()
```

### Authentication system

| Token | Duration | Where stored |
|---|---|---|
| `access_token` (JWT) | 15 min | JS memory (Zustand store) |
| `refresh_token` (opaque, UUID4) | 30 days | httpOnly cookie + Redis |

The `refresh_token` is stored in Redis with key `refresh:{token}` → `user_id`.

### `app/core/security.py`
```python
from datetime import datetime, timedelta, timezone
from jose import jwt, JWTError
from passlib.context import CryptContext
import secrets

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)

def create_access_token(user_id: int, role: str) -> str:
    expire = datetime.now(timezone.utc) + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    return jwt.encode(
        {"sub": str(user_id), "role": role, "exp": expire},
        settings.SECRET_KEY,
        algorithm="HS256",
    )

def decode_access_token(token: str) -> dict:
    return jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])

def create_refresh_token() -> str:
    return secrets.token_urlsafe(64)
```

### `app/routers/auth.py`
```python
@router.post("/register")
async def register(data: RegisterRequest, db: AsyncSession = Depends(get_db)):
    if not settings.ALLOW_REGISTRATION:
        raise HTTPException(403, "Registration is closed")

    existing = await db.execute(
        select(User).where((User.username == data.username) | (User.email == data.email))
    )
    if existing.scalar_one_or_none():
        raise HTTPException(409, "Username or email already taken")

    user_count = await db.scalar(select(func.count(User.id)))
    role = "admin" if (user_count == 0 and settings.FIRST_USER_IS_ADMIN) else "user"

    user = User(
        username=data.username,
        email=data.email,
        display_name=data.display_name or data.username,
        hashed_password=hash_password(data.password),
        native_language=data.native_language,
        role=role,
        is_active=True,
    )
    db.add(user)
    await db.commit()
    await db.refresh(user)
    return {"id": user.id, "username": user.username, "role": user.role}


@router.post("/login")
async def login(data: LoginRequest, response: Response, db, redis):
    user = await authenticate_user(db, data.username, data.password)
    if not user or not user.is_active:
        raise HTTPException(401, "Invalid credentials")

    access_token = create_access_token(user.id, user.role)
    refresh_token = create_refresh_token()

    ttl = settings.REFRESH_TOKEN_EXPIRE_DAYS * 86400
    await redis.setex(f"refresh:{refresh_token}", ttl, str(user.id))

    response.set_cookie(
        "refresh_token", refresh_token,
        httponly=True, secure=True, samesite="lax",
        max_age=ttl,
    )
    return {"access_token": access_token, "token_type": "bearer"}


@router.post("/refresh")
async def refresh(request: Request, response: Response, redis):
    token = request.cookies.get("refresh_token")
    if not token:
        raise HTTPException(401, "Missing refresh token")

    user_id = await redis.get(f"refresh:{token}")
    if not user_id:
        raise HTTPException(401, "Invalid or expired refresh token")

    await redis.delete(f"refresh:{token}")
    new_refresh = create_refresh_token()
    ttl = settings.REFRESH_TOKEN_EXPIRE_DAYS * 86400
    await redis.setex(f"refresh:{new_refresh}", ttl, user_id)

    response.set_cookie("refresh_token", new_refresh, httponly=True, secure=True,
                        samesite="lax", max_age=ttl)
    user = await get_user_by_id(int(user_id))
    return {"access_token": create_access_token(user.id, user.role), "token_type": "bearer"}


@router.post("/logout")
async def logout(request: Request, response: Response, redis):
    token = request.cookies.get("refresh_token")
    if token:
        await redis.delete(f"refresh:{token}")
    response.delete_cookie("refresh_token")
    return {"detail": "Logged out"}
```

### `app/core/deps.py`
```python
async def get_current_user(token: str = Depends(oauth2_scheme), db = Depends(get_db)) -> User:
    try:
        payload = decode_access_token(token)
        user_id = int(payload["sub"])
    except (JWTError, KeyError):
        raise HTTPException(401, "Invalid token")
    user = await db.get(User, user_id)
    if not user or not user.is_active:
        raise HTTPException(401, "User not found or inactive")
    return user

async def require_admin(current_user: User = Depends(get_current_user)) -> User:
    if current_user.role != "admin":
        raise HTTPException(403, "Admin access required")
    return current_user
```

### `app/routers/admin.py`
```python
@router.post("/invite")
async def create_invite(redis):
    """
    Generates a single-use invite token valid for 48h.
    Link: /register?invite=<token>
    If ALLOW_REGISTRATION=false, invites are the only way in.
    """
    token = secrets.token_urlsafe(32)
    await redis.setex(f"invite:{token}", 172800, "1")   # 48h
    return {"invite_url": f"/register?invite={token}"}
```

### `app/core/database.py`
```python
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from sqlalchemy.orm import DeclarativeBase

engine = create_async_engine(settings.DATABASE_URL, echo=False)
AsyncSessionLocal = async_sessionmaker(engine, expire_on_commit=False)

class Base(DeclarativeBase):
    pass

async def get_db() -> AsyncSession:
    async with AsyncSessionLocal() as session:
        yield session
```

### `app/services/llm_adapter.py`
```python
from openai import AsyncOpenAI

class LLMAdapter:
    def __init__(self, settings):
        self.provider = settings.LLM_PROVIDER
        if self.provider == "ollama":
            self.client = AsyncOpenAI(
                base_url=f"{settings.OLLAMA_BASE_URL}/v1",
                api_key="ollama",
            )
            self.model = settings.OLLAMA_MODEL
        elif self.provider == "openai":
            self.client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY)
            self.model = settings.OPENAI_MODEL
        elif self.provider == "deepseek":
            self.client = AsyncOpenAI(
                base_url="https://api.deepseek.com/v1",
                api_key=settings.DEEPSEEK_API_KEY,
            )
            self.model = settings.DEEPSEEK_MODEL
        elif self.provider == "anthropic":
            import anthropic as _anthropic
            self._anthropic = _anthropic.AsyncAnthropic(api_key=settings.ANTHROPIC_API_KEY)
            self.client = None
            self.model = settings.ANTHROPIC_MODEL

    async def chat(self, messages: list[dict], stream: bool = False):
        if self.provider == "anthropic":
            return await self._anthropic_chat(messages, stream)
        response = await self.client.chat.completions.create(
            model=self.model,
            messages=messages,
            stream=stream,
        )
        if stream:
            return response
        return response.choices[0].message.content

    async def structured_output(self, messages: list[dict], schema: type):
        if self.provider in ("anthropic",):
            raw = await self._anthropic_chat(messages, stream=False)
            import json
            return schema.model_validate(json.loads(raw))
        response = await self.client.beta.chat.completions.parse(
            model=self.model,
            messages=messages,
            response_format=schema,
        )
        return response.choices[0].message.parsed
```

---

## Milestone 3 — Assessment (CEFR level evaluation)

### Onboarding flow (before the quiz)

The assessment is a 3-step onboarding, not a direct quiz:

```
Step 1 — Entry question
  "Have you studied English before?"
  → [I am a complete beginner] → skip quiz → cefr_level = "A1", skill_profile all 0
  → [Yes, I have some experience]  → Step 2

Step 2 — Adaptive quiz (10–15 questions from a static bank)
  Algorithm: start at A2 difficulty. If 2 correct in a row → move up.
             If 2 wrong in a row → move down. Stop after 12 questions
             or when confidence is high enough.
  Questions come from frontend/src/data/assessment-bank.ts (static, curated).
  One optional free-write question at the end (LLM-evaluated).

Step 3 — Duration & intensity selection
  "How many weeks do you want to dedicate to this level?"
  ● 4 weeks  (intensive  — 5 days/week, ~20 lessons)
  ● 8 weeks  (standard   — 5 days/week, ~40 lessons)
  ● 12 weeks (relaxed    — 4 days/week, ~48 lessons) ← DEFAULT
  ● 16 weeks (very slow  — 3 days/week, ~48 lessons)

  "What are your main goals?" (multi-select)
  ☐ Grammar  ☐ Vocabulary  ☐ Reading  ☐ Writing  ☐ Conversation
```

### Static question bank (`frontend/src/data/assessment-bank.ts`)

Questions are **not** generated by the LLM. They are curated at build time.
Each question maps to a `skill` and `difficulty` so the adaptive algorithm
can track the profile by domain.

```typescript
export interface AssessmentQuestion {
  id: string             // "g-a1-001"
  skill: 'grammar' | 'vocabulary' | 'reading'
  difficulty: CEFRLevel
  question: string
  options: string[]      // exactly 4
  correct: string        // must match one option exactly
  grammar_slug?: string  // links result to grammar reference
}

// Minimum bank size: 30 grammar + 30 vocabulary + 20 reading = 80 questions
// Quiz draws 12 questions adaptively (never repeats within a session)
```

### CEFR evaluation (backend service)

The LLM is **not** used to evaluate quiz answers — a deterministic algorithm does:

```python
def evaluate_adaptive_quiz(answers: list[AnswerRecord]) -> AssessmentResult:
    """
    answers: list of {question_id, skill, difficulty, correct: bool}
    Returns skill_profile (0–1 per skill) and overall CEFR level.
    """
    level_scores = {level: {"correct": 0, "total": 0} for level in CEFR_LEVELS}
    skill_scores = {"grammar": [], "vocabulary": [], "reading": []}

    for a in answers:
        level_scores[a.difficulty]["total"] += 1
        skill_scores[a.skill].append(1 if a.correct else 0)
        if a.correct:
            level_scores[a.difficulty]["correct"] += 1

    # Determine CEFR: highest level where score >= 0.6
    cefr_level = "A1"
    for level in ["A1", "A2", "B1", "B2", "C1", "C2"]:
        s = level_scores[level]
        if s["total"] >= 2 and s["correct"] / s["total"] >= 0.6:
            cefr_level = level

    skill_profile = {
        skill: round(sum(scores) / len(scores), 2) if scores else 0.0
        for skill, scores in skill_scores.items()
    }
    strengths = [s for s, v in skill_profile.items() if v >= 0.65]
    weaknesses = [s for s, v in skill_profile.items() if v < 0.45]

    return AssessmentResult(
        cefr_level=cefr_level,
        score=sum(skill_profile.values()) / len(skill_profile),
        skill_profile=skill_profile,
        strengths=strengths,
        weaknesses=weaknesses,
        analysis="",   # filled by LLM only for the optional free-write answer
    )
```

### LLM evaluation (only for optional free-write at end of quiz)

```python
FREE_WRITE_ASSESSMENT_PROMPT = """
You are evaluating a short English writing sample for CEFR placement.
The student's apparent level based on grammar/vocabulary questions: {preliminary_level}

Writing prompt given to student: "{prompt}"
Student's answer: "{answer}"

Assess vocabulary range, grammar accuracy, and coherence.
Return JSON:
{{
  "adjusted_level": "B1",   # may confirm or adjust the preliminary_level by ±1 step
  "writing_score": 0.6,     # 0.0–1.0
  "analysis": "2–3 sentence summary of strengths and gaps",
  "strengths": [...],
  "weaknesses": [...]
}}
"""
```

---

## Milestone 4 — Study Plan Generator

### How the plan is built (curriculum-driven, not free-form LLM)

The study plan no longer asks the LLM to invent a week-by-week schedule.
Instead, it reads the **canonical curriculum** from `frontend/src/data/curriculum.ts`
(or a Python mirror at `backend/app/data/curriculum.py`) and maps each
`CurriculumUnit` into the chosen number of weeks at the chosen intensity.

```
duration_weeks=12, days_per_week=4 → 48 lesson-days across 8 curriculum units for A1
= ~6 lesson-days per unit (each unit has 5 lesson types: grammar, vocabulary, reading, writing + review)
```

The LLM is only called **once per lesson**, when the user opens it for the
first time — to generate the actual content and exercises for that specific
curriculum unit and lesson type. The plan skeleton is always deterministic.

### Plan generation service (`app/services/study_plan_generator.py`)

```python
async def generate_study_plan(request: GenerateStudyPlanRequest) -> GeneratedPlan:
    curriculum_units = get_curriculum_units(request.cefr_level)   # reads static data
    lesson_days = distribute_units(
        units=curriculum_units,
        total_weeks=request.duration_weeks,
        days_per_week=request.days_per_week,
    )
    # lesson_days: list of {week, day, unit_id, lesson_type, title, objectives}
    # No LLM call here — skeleton is deterministic
    return GeneratedPlan(
        title=f"English {request.cefr_level} — {request.duration_weeks}-week programme",
        cefr_level=request.cefr_level,
        duration_weeks=request.duration_weeks,
        days_per_week=request.days_per_week,
        weekly_plan=build_weekly_plan(lesson_days),
        # Last slot in the plan is always the end-of-level test
        ends_with_test=True,
    )
```

### LLM lesson content generation (`app/services/lesson_generator.py`)

```python
LESSON_CONTENT_PROMPT = """
You are an expert English teacher generating a single lesson for a {cefr_level} student.

Curriculum unit: {unit_title}
Lesson type: {lesson_type}  (grammar | vocabulary | reading | writing)
Grammar focus: {grammar_points}
Vocabulary set: {vocabulary_set}
Student weaknesses to address: {weaknesses}

Level constraints for {cefr_level}:
- A1: max 8 words per sentence, high-frequency vocabulary only, present/past simple only
- A2: max 12 words per sentence, introduce comparatives/past/can
- B1: complex sentences allowed, introduce perfect tenses and conditionals
- B2+: no sentence length restriction

Generate content with:
- A clear explanation (Markdown, 100–200 words)
- 2–3 worked examples
- 3–5 exercises mixing: multiple_choice, fill_blank, free_write (≥1 free_write)
- 4–6 vocabulary items from the vocabulary set with definitions and examples
- 1–3 grammar_refs (slugs from the known grammar reference)

Return strict JSON matching the LessonContent schema.
"""
```

### Completion test at the end of a level

When `current_unit` advances past the last unit of a level, the dashboard
offers an **end-of-level test** instead of a regular lesson.

```python
END_OF_LEVEL_TEST_PROMPT = """
You are assessing whether a student has mastered CEFR level {cefr_level}.

Generate a 20-question test covering ALL grammar points and vocabulary sets
studied during {cefr_level}. Questions must come exclusively from:
Grammar: {grammar_points_studied}
Vocabulary: {vocabulary_sets_studied}

Use the same question schema as the placement test.
Do NOT include content from {next_level}.
"""
```

Scoring thresholds:
| Score | Recommendation | Action |
|-------|---------------|--------|
| ≥ 0.75 | `"advance"` | Unlock next CEFR level plan |
| 0.55 – 0.74 | `"extend"` | Recommend 4-week extension on weak units |
| < 0.55 | `"repeat"` | Recommend repeating the full level |

---

## Milestone 5 — Lesson Generator

### Lesson content structure (JSON)

```json
{
  "lesson_type": "grammar",
  "title": "Simple Present vs Present Continuous",
  "cefr_level": "A2",
  "explanation": {
    "text": "...",
    "key_points": ["...", "..."],
    "examples": [
      {"sentence": "I work every day.", "note": "habitual action"},
      {"sentence": "I am working now.", "note": "action in progress"}
    ]
  },
  "exercises": [
    {
      "type": "multiple_choice",
      "question": "She ___ (work) at the moment.",
      "options": ["works", "is working", "worked", "has worked"],
      "correct": "is working",
      "explanation": "We use present continuous for actions happening now."
    },
    {
      "type": "fill_blank",
      "question": "Every morning, he ___ (drink) coffee.",
      "correct": "drinks",
      "explanation": "Simple present for routines."
    },
    {
      "type": "free_write",
      "prompt": "Write 3 sentences about what you usually do vs what you are doing today.",
      "evaluation_criteria": ["correct tense usage", "subject-verb agreement"]
    }
  ],
  "vocabulary": [
    {"word": "currently", "definition": "at the present time", "example": "She is currently studying."}
  ]
}
```

### Free writing evaluation
```python
FREE_WRITE_EVAL_PROMPT = """
Student level: {cefr_level}
Exercise prompt: {prompt}
Evaluation criteria: {criteria}
Student's answer: {answer}

Evaluate the answer and return JSON:
{
  "score": 0.8,
  "feedback": "Good use of present continuous. Watch out for...",
  "corrections": [
    {"original": "I am go", "corrected": "I am going", "explanation": "..."}
  ]
}
"""
```

---

## Milestone 6 — Flashcards with SM-2

### SM-2 algorithm
```python
def sm2_update(card: Flashcard, quality: int) -> Flashcard:
    """
    quality: 0 = blackout, 1 = wrong, 2 = wrong but remembered,
             3 = correct (hard), 4 = correct, 5 = perfect
    """
    if quality < 3:
        card.repetitions = 0
        card.interval = 1
    else:
        if card.repetitions == 0:
            card.interval = 1
        elif card.repetitions == 1:
            card.interval = 6
        else:
            card.interval = round(card.interval * card.ease_factor)
        card.repetitions += 1

    card.ease_factor = max(
        1.3,
        card.ease_factor + 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)
    )
    card.next_review = date.today() + timedelta(days=card.interval)
    return card
```

### LLM flashcard generation
```python
FLASHCARD_GEN_PROMPT = """
Generate {count} English vocabulary flashcards for a {cefr_level} student
about the topic: "{topic}".

Return JSON:
{
  "flashcards": [
    {
      "word": "...",
      "definition": "Simple definition in English",
      "example_sentence": "Natural example sentence",
      "translation": "Translation in the student's native language ({native_language})"
    }
  ]
}
"""
```

---

## Milestone 7 — Chat with AI Tutor

### Tutor system prompt
```python
TUTOR_SYSTEM_PROMPT = """
You are an encouraging and patient English language tutor named FreeLingo.
Your student is at {cefr_level} level.
Their native language is {native_language}.
Current focus areas: {current_topics}.
Recent mistakes to address: {recent_errors}.

Guidelines:
- Adapt your vocabulary and complexity to the student's level
- When the student makes a grammar mistake, gently correct it
- You may briefly explain corrections in {native_language} if it helps clarity,
  but always keep the main conversation in English
- Keep responses concise (2–4 sentences unless explaining grammar)
"""
```

Endpoint with **SSE streaming**:
```python
@router.post("/chat")
async def chat(request: ChatRequest, ...):
    async def event_stream():
        async for chunk in llm_adapter.chat(messages, stream=True):
            if chunk.choices[0].delta.content:
                yield f"data: {chunk.choices[0].delta.content}\n\n"
        yield "data: [DONE]\n\n"
    return StreamingResponse(event_stream(), media_type="text/event-stream")
```

---

## Milestone 8 — Frontend

### Key screens and components

| Route | Key components |
|------|------------------|
| `/login` | `LoginForm`, `ErrorAlert` |
| `/register` | `RegisterForm` (username, email, password, native language selector), `InviteGate` |
| `/assessment` | `BeginnerGate`, `AdaptiveQuizCard`, `ProgressBar`, `AssessmentResultScreen` |
| `/assessment/setup` | `DurationSelector`, `GoalsSelector`, `IntensitySummary` |
| `/dashboard` | `LearningPathView`, `DailyMissions`, `StreakBadge`, `SkillRadarChart`, `XPCounter` |
| `/plan` | `LearningRoadmap` (visual timeline), `UnitCard`, `LevelTestBanner` |
| `/lesson/[id]` | `LessonContent`, `ExerciseCard`, `FeedbackModal`, `VocabHighlight` |
| `/lesson/level-test` | `LevelCompletionTest`, `TestResultSummary`, `RecommendationCard` |
| `/flashcards` | `FlashCard` (flip animation), `ReviewControls` (0–5), `DueCount` |
| `/chat` | `ChatBubble`, `MessageInput`, `StreamingText` |
| `/settings` | `ProfileForm`, `LLMProviderForm`, `ModelSelector` |
| `/admin/users` | `UserTable`, `EditUserModal`, `InviteLinkButton` (role=admin only) |

### `LearningRoadmap` — visual learning path (`/plan`)

This is the primary navigation screen. Shows the user's complete route through
the current CEFR level in a horizontal timeline (desktop) or vertical scroll (mobile).

```
Timeline example for A1 — 12 weeks
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Wk 1–2      Wk 2–3      Wk 3–4      Wk 5–6      Wk 7–8
 ┌──────┐    ┌──────┐    ┌──────┐    ┌──────┐    ┌──────┐
 │ U1 ✓ │ ── │ U2 ✓ │ ── │ U3 🔄│ ── │ U4 🔒│ ── │ U5 🔒│  ...
 │      │    │      │    │ 3/5  │    │      │    │      │
 └──────┘    └──────┘    └──────┘    └──────┘    └──────┘
Identity   My World   Daily Life    My Place   Actions Now
                                                              ... [🏆 Level Test]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

Unit card states:
- `completed` — green, shows unit score (e.g. 87%)
- `active` — accent color, shows `day X / total` progress
- `unlocked` — grey with border, clickable (prerequisite met but not started)
- `locked` — grey with lock icon, not clickable (prerequisite not met)
- `level-test` — gold/special at end of roadmap, only clickable after all units done

Clicking an active or completed unit expands a drawer with the list of its
lessons (each showing completion state, score, and a "review" option).

```typescript
// store/progress.ts (extended)
interface ProgressStore {
  streak: number
  xp: number
  skills: Record<string, number>        // grammar, vocabulary, reading, writing
  todayLessons: Lesson[]
  completedToday: number[]
  currentUnitId: string | null          // "a1-unit-3"
  currentPlanDurationWeeks: number      // 12
  unitProgress: Record<string, {        // keyed by unit id
    completed_lessons: number
    total_lessons: number
    score: number                       // avg score across exercises
    is_completed: boolean
  }>
  levelTestUnlocked: boolean            // true when all units in level completed
  levelTestResult: {
    score: number
    recommendation: 'advance' | 'extend' | 'repeat'
  } | null
}
```

### `DurationSelector` component (`/assessment/setup`)

```tsx
const INTENSITY_OPTIONS = [
  { weeks: 4,  label: 'Intensive',   days: 5, description: '~20 lessons · 5 days/week' },
  { weeks: 8,  label: 'Standard',    days: 5, description: '~40 lessons · 5 days/week' },
  { weeks: 12, label: 'Relaxed',     days: 4, description: '~48 lessons · 4 days/week', recommended: true },
  { weeks: 16, label: 'Very relaxed',days: 3, description: '~48 lessons · 3 days/week' },
]
```

Selected option persists to `POST /api/study-plan/create` in the request body.

### `LevelTestBanner` — end-of-level prompt

When all curriculum units are completed, the dashboard shows a banner:

```
╔══════════════════════════════════════════════════════╗
║  🏆  You've completed all A1 units!                  ║
║  Take the final A1 test to unlock A2.                ║
║  20 questions · ~30 min · covers all A1 content      ║
║                          [ Start Level Test → ]      ║
╚══════════════════════════════════════════════════════╝
```

After the test, `TestResultSummary` shows:
- Score, CEFR competency checklist (pass/fail per grammar point)
- `RecommendationCard`: advance to A2 / extend 4 weeks / repeat A1

### Automatic refresh interceptor (`lib/api.ts`)

```typescript
async function apiFetch(url: string, options: RequestInit = {}) {
  const token = useAuthStore.getState().accessToken
  const res = await fetch(url, {
    ...options,
    headers: { ...options.headers, Authorization: `Bearer ${token}` },
  })

  if (res.status === 401) {
    const refreshRes = await fetch('/api/auth/refresh', { method: 'POST', credentials: 'include' })
    if (!refreshRes.ok) {
      useAuthStore.getState().logout()
      redirect('/login')
      return
    }
    const { access_token } = await refreshRes.json()
    useAuthStore.getState().setTokens(access_token)
    return fetch(url, {
      ...options,
      headers: { ...options.headers, Authorization: `Bearer ${access_token}` },
    })
  }
  return res
}
```

### Route protection (Next.js middleware)

```typescript
// middleware.ts
const PUBLIC_ROUTES = ['/login', '/register']

export function middleware(req: NextRequest) {
  const hasRefreshToken = req.cookies.has('refresh_token')
  const isPublic = PUBLIC_ROUTES.some(r => req.nextUrl.pathname.startsWith(r))

  if (!hasRefreshToken && !isPublic) {
    return NextResponse.redirect(new URL('/login', req.url))
  }
  return NextResponse.next()
}

export const config = { matcher: ['/((?!_next|favicon.ico|api).*)'] }
```

### SSE streaming in the chat

```typescript
export async function* streamChat(message: string): AsyncGenerator<string> {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ message }),
  })
  const reader = response.body!.getReader()
  const decoder = new TextDecoder()
  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    const chunk = decoder.decode(value)
    const lines = chunk.split('\n').filter(l => l.startsWith('data: '))
    for (const line of lines) {
      const data = line.slice(6)
      if (data !== '[DONE]') yield data
    }
  }
}
```

---

## Phase 1 completion criteria

- [ ] `docker compose up -d` starts all services without errors
- [ ] First registration creates a user with `role=admin` automatically
- [ ] Login returns `access_token` + `refresh_token` in httpOnly cookie
- [ ] Automatic refresh works without the user noticing the expiration
- [ ] Logout invalidates the refresh token in Redis
- [ ] With `ALLOW_REGISTRATION=false`, public registration returns 403
- [ ] Single-use invites work (expire after 48h or on use)
- [ ] The `/admin/users` panel is only accessible for `role=admin`
- [ ] "I'm a beginner" shortcut sets cefr_level=A1 and skips the quiz
- [ ] Adaptive quiz draws from the static bank (no LLM quiz generation)
- [ ] CEFR level is determined by the deterministic algorithm, not the LLM
- [ ] Duration selector shows 4 options; default 12 weeks is pre-selected
- [ ] Study plan is generated from the curriculum tree (not free-form LLM)
- [ ] `/plan` shows the visual roadmap with all units and their states
- [ ] Unit cards show correct state: completed / active / unlocked / locked
- [ ] Active unit shows day-by-day progress (e.g. "Day 3 / 5")
- [ ] Lesson content is generated by LLM on first open, then cached
- [ ] A lesson with exercises can be completed and feedback received
- [ ] SM-2 flashcards are reviewed and updated correctly
- [ ] Streaming chat works without UI freezes
- [ ] After all units in a level: level test banner appears on dashboard
- [ ] Level test score ≥ 0.75 unlocks next level (advance)
- [ ] Level test score 0.55–0.74 shows "extend" recommendation
- [ ] Level test score < 0.55 shows "repeat" recommendation
- [ ] Progress persists across sessions (PostgreSQL)