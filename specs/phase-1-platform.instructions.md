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

### Quiz generation prompt
```python
ASSESSMENT_PROMPT = """
You are an English language assessment expert.
Generate a placement test with exactly 20 questions covering:
- 5 grammar questions (across A1–C1 difficulty)
- 5 vocabulary questions (across A1–C1 difficulty)
- 5 reading comprehension questions (short text + questions)
- 5 mixed questions (error correction, sentence transformation)

Each question must have a `difficulty` field: A1, A2, B1, B2, or C1.

Return a JSON object with this exact structure:
{
  "questions": [
    {
      "id": 1,
      "type": "multiple_choice",
      "difficulty": "A1",
      "question": "...",
      "options": ["A. ...", "B. ...", "C. ...", "D. ..."],
      "correct_answer": "A"
    }
  ]
}
"""
```

### CEFR evaluation prompt
```python
EVALUATION_PROMPT = """
You are a CEFR language assessment expert.
Below are 20 questions and the user's answers.
Analyze the pattern of correct and incorrect answers,
paying attention to the difficulty level of each question.

{questions_and_answers}

Return a JSON object:
{
  "cefr_level": "B1",
  "score": 0.65,
  "analysis": "Short explanation of strengths and weaknesses",
  "strengths": ["present tenses", "basic vocabulary"],
  "weaknesses": ["conditional sentences", "advanced prepositions"]
}
"""
```

---

## Milestone 4 — Study Plan Generator

### Plan generation prompt
```python
STUDY_PLAN_PROMPT = """
You are an expert English teacher creating a personalized study plan.

Student profile:
- CEFR level: {cefr_level}
- Weaknesses: {weaknesses}
- Goals: {goals}
- Available time per day: {minutes_per_day} minutes
- Plan duration: {weeks} weeks

Create a structured {weeks}-week study plan with daily lessons.
Each lesson should take 20–30 minutes.

Return a JSON object:
{
  "title": "...",
  "weekly_plan": [
    {
      "week": 1,
      "theme": "Present Tenses & Basic Conversation",
      "days": [
        {
          "day": 1,
          "lesson_type": "grammar",
          "title": "Simple Present vs Present Continuous",
          "objectives": ["..."],
          "estimated_minutes": 25
        }
      ]
    }
  ]
}
"""
```

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
| `/assessment` | `QuizCard`, `ProgressBar`, `ResultScreen` |
| `/dashboard` | `DailyPlan`, `StreakBadge`, `SkillRadarChart`, `XPCounter` |
| `/lesson/[id]` | `LessonContent`, `ExerciseCard`, `FeedbackModal`, `VocabHighlight` |
| `/flashcards` | `FlashCard` (flip animation), `ReviewControls` (0–5), `DueCount` |
| `/chat` | `ChatBubble`, `MessageInput`, `StreamingText` |
| `/settings` | `ProfileForm`, `LLMProviderForm`, `ModelSelector` |
| `/admin/users` | `UserTable`, `EditUserModal`, `InviteLinkButton` (role=admin only) |

### Global state (Zustand)

```typescript
// store/auth.ts
interface AuthStore {
  accessToken: string | null
  user: { id: number; username: string; displayName: string; role: "admin" | "user" } | null
  setTokens: (access: string) => void
  logout: () => void
}
// The refresh token lives in an httpOnly cookie, never in JS.

// store/progress.ts
interface ProgressStore {
  streak: number
  xp: number
  skills: Record<string, number>  // grammar, vocabulary, reading, writing
  todayLessons: Lesson[]
  completedToday: number[]
}
```

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
- [ ] The assessment can be completed and a CEFR level obtained
- [ ] The study plan is generated correctly with local Ollama
- [ ] A lesson with exercises can be completed and feedback received
- [ ] SM-2 flashcards are reviewed and updated correctly
- [ ] Streaming chat works without UI freezes
- [ ] Progress persists across sessions (PostgreSQL)