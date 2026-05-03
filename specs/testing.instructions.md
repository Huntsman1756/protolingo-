---
description: "Testing strategy for FreeLingo: backend pytest suite (10 test files with SQLite in-memory DB and Redis mocking), frontend unit/E2E plan (Vitest + Playwright, pending implementation), CI integration, and coverage requirements."
applyTo: "**/*.test.*, **/*.spec.*, **/tests/**, **/__tests__/**"
---

# Testing — FreeLingo

## Overview

| Layer | Framework | Scope | Coverage | Status |
|-------|-----------|-------|----------|--------|
| Backend unit + integration | pytest + pytest-asyncio | API endpoints, services, SM-2 algorithm, data integrity | >= 70% | Implemented |
| Frontend unit | Vitest + Testing Library | Stores, utils, apiFetch interceptor | >= 60% | Pending |
| Frontend component | Vitest + Testing Library | UI components, forms | Smoke | Pending |
| E2E | Playwright | Critical user flows | Smoke | Pending |

All tests pass on every push. Coverage thresholds are enforced via `pytest --cov-fail-under=70`.

---

## Backend tests (pytest)

### Test infrastructure

- **Database**: SQLite in-memory (`sqlite+aiosqlite:///:memory:`) for fast, isolated tests — no PostgreSQL dependency. Tables are auto-created/dropped per test via `setup_db` fixture.
- **Redis**: mocked with an in-memory dict-based mock (implements `setex`, `get`, `delete`, `getex` with same interface as `redis.asyncio.Redis`). No Redis server needed.
- **LLM**: always mocked at the service layer. Tests never call real Ollama, OpenAI, Anthropic, or DeepSeek.
- **HTTP client**: `httpx.AsyncClient` with `ASGITransport` for FastAPI app testing, database and Redis dependencies overridden via `app.dependency_overrides`.
- **Async**: `asyncio_mode = "auto"` — no `@pytest.mark.asyncio` decorators needed.

### Test file inventory

| File | Lines | What it covers |
|------|-------|---------------|
| `conftest.py` | — | Shared fixtures: in-memory SQLite engine, test DB session, mock Redis, HTTP client, test user and admin creation |
| `test_auth.py` | 278 | Registration (success, duplicate, invite gating), login, refresh (rotation, replay detection), logout, me, update-profile |
| `test_admin.py` | 164 | CRUD users, role enforcement (403 for non-admin), invite creation with 48h expiry |
| `test_assessment.py` | 132 | Quiz start (mocked LLM), submit and deterministic evaluation, legacy endpoints, LLM error handling |
| `test_study_plan.py` | 98 | Plan generation, today's lessons, auto-generation on access |
| `test_lessons.py` | 237 | Lesson CRUD, exercise answering (multiple_choice, free_write, pronunciation), completion flow, progress update on complete |
| `test_flashcards.py` | 135 | SM-2 algorithm (all quality levels 0–5, interval and ease_factor transitions, edge cases), card CRUD |
| `test_chat.py` | 52 | SSE streaming chunks, conversation creation and messaging |
| `test_progress.py` | 48 | Progress summary and history with empty and populated data |
| `test_conversation.py` | 247 | WebSocket authentication, TTS/STT disabled rejection, pipeline lifecycle |
| `test_frontend_data_integrity.py` | 195 | Cross-reference validation: curriculum.ts vs grammar.ts, vocabulary.ts — ensures all referenced slugs and IDs exist |

### Test patterns

**Mocking LLM**: Mock `llm_adapter.LLMAdapter` as a singleton. Three pattern variants:
- `chat()` → returns a deterministic string (used in assessment, flashcards, chat tests)
- `chat(stream=True)` → returns an async generator yielding token chunks (used in chat SSE tests)
- `structured_output()` → returns a pre-built Pydantic model (used in assessment and lesson tests)

**Mocking Redis**: Mock `get_redis` dependency. The in-memory mock stores `refresh:{token}` → user_id mappings and `invite:{token}` → "1" for invite tokens, matching the real Redis interface.

**Test user creation**: The `test_user` and `admin_user` fixtures create users directly in the test database and return them with pre-built JWT Authorization headers. Each test gets a fresh database via the `setup_db` fixture's autouse create/drop cycle.

### Key test cases

**Auth**:
- Register success, duplicate username rejection, ALLOW_REGISTRATION=false returns 403, first user becomes admin
- Login success sets httpOnly cookie, invalid credentials return 401, inactive user returns 401
- Refresh rotates token (deletes old, creates new), missing cookie returns 401, replayed token returns 401
- Logout deletes refresh token from Redis and clears cookie
- PATCH /me updates display_name, email, password, english_variant, conversation settings

**Flashcards (SM-2)**:
- New card has default values: ease_factor=2.5, interval=0, repetitions=0, next_review=today
- Quality 0 resets repetitions to 0, sets interval to 1
- Quality 3: first review interval=1, second=6, subsequent=interval × ease_factor
- Ease factor increases with quality 5, decreases with quality < 3, floor at 1.3
- Next review date calculated correctly as today + interval days

**Admin**:
- List/create/get/update/delete users requires admin role; non-admin returns 403
- Invite token created with 48-hour TTL, returned as URL `/register?invite=<token>`

**Assessment**:
- Deterministic evaluation finds highest level with >= 2 questions and >= 60% correct
- Free-write evaluation (mocked LLM) returns adjusted_level, score, analysis
- Level test generation (mocked LLM) constrained to grammar/vocabulary from curriculum

**WebSocket conversation**:
- Connection with valid JWT succeeds
- Connection rejected with 4001 close code when TTS_ENABLED=false or STT_ENABLED=false
- Pipeline lifecycle: connect → auth → audio receive → STT → LLM → TTS → send → disconnect

**Data integrity**:
- Every grammar_slug in curriculum.ts referenced by curriculum units exists in grammar.ts
- Every vocabulary_set_id in curriculum.ts referenced by curriculum units exists in vocabulary.ts
- Every related grammar slug in grammar topics points to an existing topic

### Running tests

```bash
cd backend

# All tests with coverage
pytest

# Single test file
pytest tests/test_auth.py -v

# Single test function
pytest tests/test_flashcards.py::test_quality_3_basic_progression -v

# With HTML coverage report
pytest --cov-report=html
```

---

## Frontend tests (Vitest — pending)

### Planned test structure

Frontend testing is planned but not yet implemented. The intended structure uses:

| Area | Tools | What to test |
|------|-------|-------------|
| Stores | Vitest | Zustand store actions: auth login/logout, progress calculations |
| Utils | Vitest | Pure functions: `cn()` class merging, `float32ToWav()` encoding |
| API client | Vitest + fetch mock | `apiFetch`: auth header attachment, 401 refresh + retry, logout on refresh failure |
| Components | Vitest + Testing Library | Key components: LoginForm, FlashCard, ChatBubble, UnitCard |
| E2E | Playwright | Critical flows: register → assessment → dashboard, lesson completion, flashcard review |

### Design decisions

- **Vitest** chosen over Jest: native ESM support, faster execution, Vite-based
- **jsdom** environment for component tests (browser API simulation)
- **@testing-library/react** for component rendering and queries (prefer `getByRole`, `getByText` over test IDs)
- Playwright E2E tests will not use `docker compose` as a web server command — instead, tests will run against a separately deployed instance
- Frontend tests are not included in the CI/CD pipeline until implemented

---

## E2E tests (Playwright — pending)

### Planned critical flows

```
frontend/e2e/
├── auth.spec.ts            # Register → login → logout, protected routes
├── assessment.spec.ts      # Complete placement test, view results
├── study-plan.spec.ts      # Generate plan, view today's lessons
├── lesson.spec.ts          # Complete a full lesson with exercises
├── flashcards.spec.ts      # Review session, SM-2 progression
├── chat.spec.ts            # Send message, receive streaming response
└── admin.spec.ts           # Create user, generate invite, edit roles
```

### Design notes

- E2E tests run against a deployed instance (remote server), not a local Docker Compose stack
- The web server is started separately — Playwright config uses `reuseExistingServer: true` with a target URL
- Tests use `data-testid` attributes on key interactive elements (buttons, inputs, status indicators)
- Each spec is independent — tests within a spec are isolated by fresh browser contexts

---

## CI integration (pending)

CI will run on GitHub Actions, triggered on pushes and pull requests. The project is self-hosted; CI is for quality gates before Docker packaging.

### Planned workflow

| Job | Steps | Threshold |
|-----|-------|-----------|
| Backend lint | `ruff check --select E,W,F` | Zero errors |
| Backend format | `black --check .` | Clean diff |
| Backend tests | `pytest --cov-fail-under=70` | >= 70% coverage |
| Frontend lint | `eslint src/ --ext .ts,.tsx` | Zero errors |
| Frontend format | `prettier --check src/` | Clean diff |
| Frontend typecheck | `npx tsc --noEmit` | Clean output |
| Frontend tests | `npx vitest run --coverage` | >= 60% coverage (when implemented) |

**Note**: The backend test job uses SQLite (same as local tests), not PostgreSQL. No Docker services are required for the backend test job.

---

## Testing rules

- **Mock LLM always** — never call Ollama, OpenAI, Anthropic, or DeepSeek in tests
- **Mock Redis always** — use in-memory dict mock, no Redis server needed
- **In-memory SQLite for backend tests** — fast, isolated, no Docker dependency
- **Test SM-2 algorithm in isolation** — pure function, no DB needed for the algorithm itself
- **Test streaming endpoints with chunk assertions** — verify SSE format and token ordering
- **Test error states explicitly** — 401, 403, 409, 422, 500 for every major endpoint
- **Each test file runs independently** — no shared state between files, fresh DB per test
- **Coverage thresholds enforced** — backend >= 70% (enforced), frontend >= 60% (planned)
- **No `docker compose` in test configs** — the development environment does not have Docker locally; E2E tests target a remote deployment
- **Data integrity tests validate cross-file references** — ensures curriculum, grammar, and vocabulary data files stay consistent