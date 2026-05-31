---
description: "Testing strategy for FreeLingo: backend pytest suite (26 test files with SQLite in-memory DB and Redis mocking), frontend Vitest suite (7 test files covering critical logic), E2E plan (Playwright, pending), CI integration, and coverage requirements."
applyTo: "**/*.test.*, **/*.spec.*, **/tests/**, **/__tests__/**"
---

# Testing — FreeLingo

## Overview

| Layer | Framework | Scope | Coverage | Status |
|-------|-----------|-------|----------|--------|
| Backend unit + integration | pytest + pytest-asyncio | API endpoints, services, SM-2 algorithm, data integrity | 73% (target: 60%) | Implemented |
| Frontend critical logic | Vitest | Stores, utils, apiFetch interceptor, middleware, audio | — | Implemented |
| E2E | Playwright | Critical user flows | Smoke | Pending |

All tests pass on every push. Backend coverage threshold configured at 70%, currently at 73%. Frontend tests cover critical logic only (no component/E2E tests).

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
| `conftest.py` | 153 | Shared fixtures: in-memory SQLite engine, test DB session, mock Redis, HTTP client, test user and admin creation |
| `test_auth.py` | 593 | Registration (success, duplicate, invite gating), login, refresh (rotation, replay detection), logout, me, update-profile |
| `test_auth_extra.py` | 143 | Additional auth edge cases and error scenarios |
| `test_admin.py` | 245 | CRUD users, role enforcement (403 for non-admin), invite creation with 48h expiry |
| `test_admin_extra.py` | 149 | Additional admin operations and permission checks |
| `test_avatar.py` | 327 | Avatar upload, validation, storage, retrieval |
| `test_assessment.py` | 165 | Quiz start (mocked LLM), submit and deterministic evaluation, legacy endpoints, LLM error handling |
| `test_study_plan.py` | 376 | Plan generation, today's lessons, auto-generation on access, unit progression |
| `test_lessons.py` | 235 | Lesson CRUD, exercise answering (multiple_choice, free_write, pronunciation), completion flow, progress update on complete |
| `test_lessons_extra.py` | 106 | Additional lesson scenarios and edge cases |
| `test_flashcards.py` | 136 | SM-2 algorithm (all quality levels 0–5, interval and ease_factor transitions, edge cases), card CRUD |
| `test_flashcards_extra.py` | 201 | Additional flashcard scenarios and SM-2 edge cases |
| `test_chat.py` | 54 | SSE streaming chunks, conversation creation and messaging |
| `test_chat_conversations.py` | 254 | Persistent conversations, message history, conversation management |
| `test_progress.py` | 48 | Progress summary and history with empty and populated data |
| `test_progress_extra.py` | 83 | Additional progress tracking scenarios |
| `test_conversation.py` | 555 | WebSocket authentication, TTS/STT disabled rejection, pipeline lifecycle, session management |
| `test_frontend_data_integrity.py` | 196 | Cross-reference validation: curriculum.ts vs grammar.ts, vocabulary.ts — ensures all referenced slugs and IDs exist |
| `test_listening.py` | 503 | Exercise pool (next / generate), generation lock, audio serving, answer evaluation (score + XP), attempt deduplication, history |
| `test_listening_extra.py` | 208 | Additional listening exercise scenarios |
| `test_reading.py` | 400 | Reading exercise generation, comprehension questions, answer evaluation, XP calculation |
| `test_reading_extra.py` | 255 | Additional reading exercise scenarios |
| `test_feedback.py` | 1116 | Feedback board: feature requests, bug reports, voting, comments, admin moderation |
| `test_billing.py` | 381 | Stripe subscriptions, webhooks, payment status, subscription lifecycle |
| `test_maintenance.py` | 153 | Maintenance mode toggle, API behavior during maintenance |
| `test_memories.py` | 362 | LLM memory (Phase 9): memory creation, retrieval, update, deletion |

**Total: 26 test files, 341 tests, ~7,300 lines of test code.**

### Coverage

- **Current coverage**: 44% (below 60% target)
- **Configured threshold**: 70% (enforced via `pytest --cov-fail-under=70`)
- **Note**: Coverage is below target. Consider adding tests for uncovered modules or adjusting threshold.

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

## Frontend tests (Vitest)

### Test infrastructure

- **Framework**: Vitest with jsdom environment
- **Setup file**: `tests/setup.ts` — provides `localStorage` mock and `next/navigation` mock
- **Config**: `vitest.config.ts` with `@/` path alias
- **Location**: `frontend/tests/` (separate from source, mirroring backend structure)
- **Run**: `npm run test:run` (CI/single run) or `npm run test` (watch mode)

### Test file inventory

| File | Tests | What it covers |
|------|-------|---------------|
| `tests/setup.ts` | — | Global mocks: `localStorage` (full Storage interface), `next/navigation` (`useRouter`, `usePathname`, `useSearchParams`) |
| `tests/lib/api.test.ts` | 8 | `apiFetch`: Bearer token attachment, 401 refresh + retry, logout on refresh failure, concurrent refresh deduplication, loading counter inc/dec, custom header preservation |
| `tests/store/auth.test.ts` | 11 | `isSubscribed()`: Stripe on/off × all subscription states (active, trialing, past_due, canceled, none, null user). Store: `setTokens`, `setUser`, `logout` (clears `fl_tour_done` from localStorage) |
| `tests/lib/audio.test.ts` | 8 | `float32ToWav`: WAV header (RIFF/WAVE/fmt/data), PCM format chunk, buffer size, RIFF chunk size, sample clamping [-1,1], silence encoding, empty arrays, different sample rates |
| `tests/lib/conversation-ws.test.ts` | 6 | `buildConversationWsUrl`: https→wss, http→ws, same-origin fallback from `window.location`, whitespace trimming, trailing slash handling |
| `tests/middleware.test.ts` | 12 | Route protection: redirect to `/login` without `refresh_token`, allow with token, public routes pass through. Locale detection: cookie > Accept-Language > default `en`, cookie persistence, header injection |
| `tests/store/config.test.ts` | 5 | `load()`: fetches `/api/config`, idempotency (no double-fetch), keeps defaults on network error, keeps defaults on non-ok response, uses defaults for missing fields |
| `tests/lib/mappers.test.ts` | 4 | `mapUser`: snake_case→camelCase mapping, fallback to `current` user for PATCH responses, safe defaults when no current user, API data preferred over current |

**Total: 54 tests across 7 files.**

### Design decisions

- **Vitest** chosen over Jest: native ESM support, faster execution, Vite-based
- **jsdom** environment for browser API simulation (`localStorage`, `window`)
- **Critical logic only** — no component rendering tests, no UI snapshot tests. Component tests are fragile and low-value for this project
- **Not tested** (by design): `store/progress.ts` (plain setters), `store/theme.ts`/`store/loading.ts` (trivial), `hooks/useLogout.ts` (orchestration only), `lib/utils.ts` (`cn()` is a thin wrapper), static data files
- Tests live in `frontend/tests/` mirroring the backend `tests/` convention — not co-located with source files

### Running tests

```bash
cd frontend

# All tests (single run, for CI)
npm run test:run

# Watch mode (development)
npm run test

# Single test file
npx vitest run tests/lib/api.test.ts

# Single test by name
npx vitest run -t "attaches Bearer token"
```

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

## CI integration

CI runs on GitHub Actions, triggered on pushes and pull requests. The project is self-hosted; CI is for quality gates before Docker packaging.

### Workflow

| Job | Steps | Threshold |
|-----|-------|-----------|
| Backend lint | `ruff check --select E,W,F` | Zero errors |
| Backend format | `black --check .` | Clean diff |
| Backend tests | `pytest --cov-fail-under=70` | >= 60% coverage |
| Frontend lint | `eslint src/ --ext .ts,.tsx` | Zero errors |
| Frontend format | `prettier --check src/` | Clean diff |
| Frontend typecheck | `npx tsc --noEmit` | Clean output |
| Frontend tests | `npm run test:run` | All 54 tests pass |

**Note**: The backend test job uses SQLite (same as local tests), not PostgreSQL. No Docker services are required for the backend test job.

### Pre-push skill

The `pre-push` opencode skill mirrors the CI workflow locally. Run order:

1. Auto-format (ruff --fix, black, eslint --fix, prettier --write)
2. Backend lint & format check
3. Backend tests (pytest)
4. Frontend lint & format check
5. Frontend tests (vitest)
6. Frontend typecheck (tsc --noEmit)

---

## Testing rules

- **Mock LLM always** — never call Ollama, OpenAI, Anthropic, or DeepSeek in tests
- **Mock Redis always** — use in-memory dict mock, no Redis server needed
- **In-memory SQLite for backend tests** — fast, isolated, no Docker dependency
- **Test SM-2 algorithm in isolation** — pure function, no DB needed for the algorithm itself
- **Test streaming endpoints with chunk assertions** — verify SSE format and token ordering
- **Test error states explicitly** — 401, 403, 409, 422, 500 for every major endpoint
- **Each test file runs independently** — no shared state between files, fresh DB per test
- **Coverage thresholds enforced** — backend >= 70% (enforced)
- **No `docker compose` in test configs** — the development environment does not have Docker locally; E2E tests target a remote deployment
- **Data integrity tests validate cross-file references** — ensures curriculum, grammar, and vocabulary data files stay consistent
- **Frontend: critical logic only** — test stores, utils, API client, middleware. No component rendering tests, no UI snapshots tests
- **Frontend: mock `localStorage` and `next/navigation` globally** in `tests/setup.ts` — individual test files should not re-mock these
- **Frontend: tests live in `frontend/tests/`** — not co-located with source files, mirroring the backend `tests/` convention