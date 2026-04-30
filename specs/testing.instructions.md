---
description: "Testing strategy for FreeLingo: backend unit/integration tests (pytest, async fixtures, LLM mocking), frontend component/E2E tests (Vitest, Testing Library, Playwright), API integration tests, test data management, CI test flow, and coverage requirements."
applyTo: "**/*.test.*, **/*.spec.*, **/tests/**, **/__tests__/**"
---

# Testing — FreeLingo

## Overview

| Layer | Framework | Scope | Coverage |
|-------|-----------|-------|----------|
| Backend unit | pytest + pytest-asyncio | Services, models, SM-2 algorithm | ≥ 70% |
| Backend integration | pytest + httpx (TestClient) | API endpoints, DB transactions | ≥ 70% |
| Frontend unit | Vitest | Utils, stores, hooks | ≥ 60% |
| Frontend component | Vitest + Testing Library | UI components, forms, modals | smoke tests |
| E2E | Playwright | Critical user flows | smoke tests |

All tests must pass on every push. Coverage thresholds are enforced in CI.

---

## Backend Tests

### Setup

`backend/pyproject.toml` (already in architecture spec):
```toml
[tool.pytest.ini_options]
asyncio_mode = "auto"
testpaths = ["tests"]
addopts = "--cov=app --cov-report=term-missing --cov-fail-under=70"
```

### Test structure

```
backend/tests/
├── conftest.py              # Shared fixtures
├── test_auth.py             # Register, login, refresh, logout, expired tokens
├── test_admin.py            # User CRUD, invite generation, permission enforcement
├── test_assessment.py       # Quiz generation, CEFR evaluation, scoring
├── test_study_plan.py       # Plan generation (mock LLM), persistence
├── test_flashcards.py       # SM-2: ease_factor, interval, next_review
├── test_llm_adapter.py      # Chat, structured_output (per-provider mock)
├── test_progress.py         # XP, streaks, skills update
├── test_chat.py             # SSE streaming chunks, history
├── test_lessons.py          # Lesson CRUD, exercise answers, free-write eval
└── test_tts_stt.py          # Phase 2: proxy endpoints (mock downstream)
```

### `conftest.py` — Shared fixtures

```python
import pytest
import pytest_asyncio
from httpx import AsyncClient, ASGITransport
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from unittest.mock import AsyncMock, patch

from app.main import app
from app.core.database import Base, get_db
from app.core.security import create_access_token


@pytest.fixture(scope="session")
def test_engine():
    """In-memory SQLite engine for test isolation."""
    engine = create_async_engine("sqlite+aiosqlite:///:memory:", echo=False)
    return engine


@pytest_asyncio.fixture(autouse=True)
async def setup_db(test_engine):
    """Create tables before each test, drop after."""
    async with test_engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield
    async with test_engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)


@pytest_asyncio.fixture
async def db_session(test_engine, setup_db):
    """Fresh session per test, rolled back after."""
    TestSessionLocal = async_sessionmaker(test_engine, expire_on_commit=False)
    async with TestSessionLocal() as session:
        yield session
        await session.rollback()


@pytest_asyncio.fixture
async def client(db_session: AsyncSession):
    """Async HTTP client with test DB override."""
    async def override_get_db():
        yield db_session

    app.dependency_overrides[get_db] = override_get_db
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        yield ac
    app.dependency_overrides.clear()


@pytest.fixture
def mock_redis():
    """Mock Redis client for auth tests."""
    with patch("app.routers.auth.get_redis") as mock:
        mock.return_value = AsyncMock()
        mock.return_value.setex = AsyncMock()
        mock.return_value.get = AsyncMock(return_value="1")
        mock.return_value.delete = AsyncMock()
        yield mock.return_value


@pytest_asyncio.fixture
async def test_user(db_session: AsyncSession, mock_redis):
    """Create a test user, return user + auth headers."""
    from app.core.security import hash_password
    from app.models.user import User

    user = User(
        username="testuser",
        email="test@example.com",
        display_name="Test User",
        hashed_password=hash_password("testpass"),
        role="user",
        native_language="es",
        is_active=True,
    )
    db_session.add(user)
    await db_session.commit()
    await db_session.refresh(user)

    token = create_access_token(user.id, user.role)
    return user, {"Authorization": f"Bearer {token}"}


@pytest_asyncio.fixture
async def admin_user(db_session: AsyncSession, mock_redis):
    """Create an admin user, return user + auth headers."""
    from app.core.security import hash_password
    from app.models.user import User

    user = User(
        username="admin",
        email="admin@example.com",
        display_name="Admin",
        hashed_password=hash_password("adminpass"),
        role="admin",
        native_language="en",
        is_active=True,
    )
    db_session.add(user)
    await db_session.commit()
    await db_session.refresh(user)

    token = create_access_token(user.id, user.role)
    return user, {"Authorization": f"Bearer {token}"}


@pytest.fixture
def mock_llm():
    """Mock LLM adapter for deterministic test responses."""
    with patch("app.services.llm_adapter.LLMAdapter") as mock:
        adapter = AsyncMock()
        adapter.chat = AsyncMock(return_value='{"cefr_level": "B1", "score": 0.65}')
        adapter.structured_output = AsyncMock(return_value=None)
        adapter.chat_stream = AsyncMock(return_value=[])
        mock.return_value = adapter
        yield adapter
```

### LLM Mocking Strategy

Always mock the LLM in tests — never call real Ollama/OpenAI. Three mock patterns:

```python
# Pattern 1: Return structured JSON (assessment, study plan, flashcards)
mock_llm.structured_output.return_value = SomePydanticModel(...)

# Pattern 2: Return plain text (chat, feedback)
mock_llm.chat.return_value = "This is a response from the tutor."

# Pattern 3: Return streaming chunks (SSE chat)
async def mock_stream():
    for token in ["Hello", ", ", "how ", "are ", "you?"]:
        yield type('Chunk', (), {'choices': [type('Choice', (), {'delta': type('Content', (), {'content': token})})]})()
mock_llm.chat.return_value = mock_stream()
```

### Redis Mocking

All Redis calls must be mocked in tests — the test runner has no Redis running:

```python
# In fixture or per-test decorator
@patch("app.routers.auth.get_redis")
async def test_login(mock_get_redis, client, db_session):
    mock_redis = AsyncMock()
    mock_redis.setex = AsyncMock()
    mock_get_redis.return_value = mock_redis
    # ... test
```

### Key Backend Test Cases

**Auth (`test_auth.py`):**
```python
# Registration
async def test_register_success(client, db_session, mock_redis)
async def test_register_duplicate_username(client, db_session, mock_redis)
async def test_register_when_closed(client, db_session, mock_redis)  # ALLOW_REGISTRATION=false → 403
async def test_first_user_becomes_admin(client, db_session, mock_redis)

# Login
async def test_login_success(client, db_session, mock_redis)
async def test_login_invalid_credentials(client, mock_redis)
async def test_login_inactive_user(client, db_session, mock_redis)
async def test_login_sets_httponly_cookie(client, db_session, mock_redis)

# Refresh
async def test_refresh_rotates_token(client, mock_redis)
async def test_refresh_missing_cookie(client)
async def test_refresh_replayed_token(client, mock_redis)  # Reuse = 401
async def test_refresh_expired_token(client, mock_redis)

# Logout
async def test_logout_deletes_refresh_token(client, mock_redis)
async def test_logout_clears_cookie(client, mock_redis)
```

**Flashcards SM-2 (`test_flashcards.py`):**
```python
async def test_new_card_default_values()
async def test_quality_0_resets_interval()
async def test_quality_3_basic_progression()  # 0→1→6→15...
async def test_ease_factor_decreases_on_fail()
async def test_ease_factor_floor_1_3()
async def test_next_review_date_correct()
async def test_quality_5_perfect_progression()
```

**LLM Adapter (`test_llm_adapter.py`):**
```python
async def test_ollama_chat_non_stream()
async def test_ollama_chat_stream()
async def test_openai_chat()
async def test_anthropic_chat()
async def test_structured_output_ollama()
async def test_structured_output_anthropic()
async def test_deepseek_base_url()
```

**Admin (`test_admin.py`):**
```python
async def test_list_users_admin_only(client, test_user, admin_user)
async def test_create_user_by_admin(client, admin_user, mock_redis)
async def test_create_user_by_non_admin(client, test_user)
async def test_edit_user_role(client, admin_user, db_session)
async def test_deactivate_user(client, admin_user, db_session)
async def test_generate_invite(client, admin_user, mock_redis)
async def test_invite_expires_48h(client, admin_user, mock_redis)
```

---

## Frontend Tests

### Setup

```bash
cd frontend
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event
npm install -D @vitejs/plugin-react jsdom
```

`frontend/vitest.config.ts`:
```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./test-setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

`frontend/test-setup.ts`:
```typescript
import '@testing-library/jest-dom'
```

### Frontend test structure

```
frontend/src/
├── lib/
│   ├── api.test.ts            # apiFetch interceptor, retry on 401
│   └── utils.test.ts          # Pure utility functions
├── store/
│   ├── auth.test.ts           # Zustand auth store actions
│   └── progress.test.ts       # Zustand progress store actions
├── components/
│   ├── ui/
│   │   └── ErrorAlert.test.tsx
│   ├── auth/
│   │   └── LoginForm.test.tsx
│   ├── assessment/
│   │   └── QuizCard.test.tsx
│   ├── flashcard/
│   │   └── FlashCard.test.tsx
│   └── chat/
│       └── ChatBubble.test.tsx
└── app/
    └── (auth)/login/
        └── page.test.tsx
```

### Zustand Store Test Example

```typescript
// store/auth.test.ts
import { describe, it, expect, beforeEach } from 'vitest'
import { useAuthStore } from './auth'

describe('useAuthStore', () => {
  beforeEach(() => {
    useAuthStore.setState({ accessToken: null, user: null })
  })

  it('sets access token and user on login', () => {
    useAuthStore.getState().setTokens('test-token')
    expect(useAuthStore.getState().accessToken).toBe('test-token')
  })

  it('clears state on logout', () => {
    useAuthStore.getState().setTokens('test-token')
    useAuthStore.getState().logout()
    expect(useAuthStore.getState().accessToken).toBeNull()
    expect(useAuthStore.getState().user).toBeNull()
  })
})
```

### API Interceptor Test

```typescript
// lib/api.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest'

describe('apiFetch', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('adds Authorization header with access token', async () => {
    useAuthStore.getState().setTokens('test-token')
    const mockFetch = vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response('{}'))

    await apiFetch('/api/auth/me')
    expect(mockFetch).toHaveBeenCalledWith('/api/auth/me', expect.objectContaining({
      headers: expect.objectContaining({ Authorization: 'Bearer test-token' })
    }))
  })

  it('refreshes token on 401 and retries', async () => {
    useAuthStore.getState().setTokens('expired-token')
    const mockFetch = vi.spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce(new Response(null, { status: 401 }))
      .mockResolvedValueOnce(new Response(JSON.stringify({ access_token: 'new-token' })))
      .mockResolvedValueOnce(new Response('{}'))

    await apiFetch('/api/auth/me')
    expect(mockFetch).toHaveBeenCalledTimes(3)
  })

  it('redirects to login if refresh also fails', async () => {
    const mockFetch = vi.spyOn(globalThis, 'fetch')
      .mockResolvedValue(new Response(null, { status: 401 }))

    // Should trigger logout + redirect to /login
    // ... test implementation depends on router mock
  })
})
```

### Component Test Example

```typescript
// components/flashcard/FlashCard.test.tsx
import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FlashCard } from './FlashCard'

describe('FlashCard', () => {
  const card = {
    id: 1,
    word: 'currently',
    definition: 'at the present time',
    example_sentence: 'She is currently studying.',
    translation: 'actualmente',
    ease_factor: 2.5,
    interval: 1,
    repetitions: 0,
    next_review: '2026-01-01',
  }

  it('shows word on front face by default', () => {
    render(<FlashCard card={card} onReview={() => {}} />)
    expect(screen.getByText('currently')).toBeInTheDocument()
  })

  it('flips to show definition on click', async () => {
    render(<FlashCard card={card} onReview={() => {}} />)
    await userEvent.click(screen.getByText('currently'))
    expect(screen.getByText('at the present time')).toBeInTheDocument()
  })

  it('calls onReview with quality 5 on perfect button', async () => {
    const onReview = vi.fn()
    render(<FlashCard card={card} onReview={onReview} />)
    await userEvent.click(screen.getByText('Perfect'))
    expect(onReview).toHaveBeenCalledWith(1, 5)
  })
})
```

### SSE Chat Stream Test

```typescript
// lib/chat.test.ts
describe('streamChat', () => {
  it('yields tokens from SSE stream', async () => {
    const mockReader = {
      read: vi.fn()
        .mockResolvedValueOnce({
          done: false,
          value: new TextEncoder().encode('data: Hello\n\ndata: world\n\n'),
        })
        .mockResolvedValueOnce({
          done: false,
          value: new TextEncoder().encode('data: [DONE]\n\n'),
        })
        .mockResolvedValueOnce({ done: true }),
    }

    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      body: { getReader: () => mockReader },
    } as any)

    const tokens: string[] = []
    for await (const token of streamChat('Hello')) {
      tokens.push(token)
    }

    expect(tokens).toEqual(['Hello', 'world'])
  })
})
```

---

## E2E Tests (Playwright)

### Setup

```bash
cd frontend
npm install -D @playwright/test
npx playwright install chromium
```

`frontend/playwright.config.ts`:
```typescript
import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'docker compose up -d',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
})
```

### Critical E2E Flows to Test

```
frontend/e2e/
├── auth.spec.ts            # Register, login, logout, protected routes
├── assessment.spec.ts      # Complete placement test, view results
├── study-plan.spec.ts      # Generate plan, view today's lessons
├── lesson.spec.ts          # Complete a full lesson with exercises
├── flashcards.spec.ts      # Review session, SM-2 progression
├── chat.spec.ts            # Send message, receive streaming response
└── admin.spec.ts           # Create user, generate invite, edit roles
```

**Example E2E test:**
```typescript
// e2e/auth.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Authentication', () => {
  test('full register → login → logout flow', async ({ page }) => {
    // Register
    await page.goto('/register')
    await page.fill('[name="username"]', 'e2euser')
    await page.fill('[name="email"]', 'e2e@test.com')
    await page.fill('[name="password"]', 'testpass123')
    await page.selectOption('[name="native_language"]', 'es')
    await page.click('button[type="submit"]')
    await expect(page).toHaveURL('/dashboard')

    // Logout
    await page.click('[data-testid="logout-button"]')
    await expect(page).toHaveURL('/login')

    // Login back
    await page.fill('[name="username"]', 'e2euser')
    await page.fill('[name="password"]', 'testpass123')
    await page.click('button[type="submit"]')
    await expect(page).toHaveURL('/dashboard')
  })

  test('redirects to /login when unauthenticated', async ({ page }) => {
    await page.goto('/dashboard')
    await expect(page).toHaveURL('/login')
  })

  test('admin-only routes return 403 for regular user', async ({ page }) => {
    // Login as regular user first...
    await page.goto('/admin/users')
    await expect(page.locator('[data-testid="forbidden"]')).toBeVisible()
  })
})
```

---

## CI Integration (pending)

> ⬜ **Pending** — CI will run on GitHub Actions, triggered on every push to the Docker image build pipeline. The project is self-hosted; CI is only for quality gates before Docker packaging.

### GitHub Actions test workflow (planned)

`.github/workflows/test.yml`:
```yaml
name: Tests

on: [push, pull_request]

jobs:
  backend:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:16-alpine
        env:
          POSTGRES_DB: freelingo_test
          POSTGRES_USER: freelingo
          POSTGRES_PASSWORD: testpass
        ports:
          - 5432:5432
      redis:
        image: redis:7-alpine
        ports:
          - 6379:6379

    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: '3.11'
      - run: pip install -r backend/requirements.txt
      - run: cd backend && ruff check --select E,W,F
      - run: cd backend && pytest --cov-fail-under=70

  frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: cd frontend && npm ci
      - run: cd frontend && npx eslint src/ --ext .ts,.tsx
      - run: cd frontend && npx vitest run --coverage
```

---

## Testing Rules

- **Mock LLM always** — never hit Ollama/OpenAI/Anthropic in tests. Use `mock_llm` fixture.
- **Mock Redis always** — no Redis in test runner. Use `mock_redis` fixture.
- **In-memory SQLite for unit tests** — fast, isolated, no Docker dependency.
- **Use real PostgreSQL only in integration/E2E** — via Docker service in CI.
- **Test SM-2 algorithm in isolation** — pure function, no DB needed.
- **Test streaming endpoints with chunk-by-chunk assertions** — verify SSE format and token ordering.
- **Test error states explicitly** — 401, 403, 409, 422, 500 for every endpoint.
- **Each test file must run independently** — no shared state between test files.
- **Coverage thresholds enforced in CI** — backend ≥ 70%, frontend ≥ 60%.
- **E2E tests run only in CI or `npx playwright test`** — not part of `pytest` or `vitest` suite.