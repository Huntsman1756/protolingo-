---
name: run-tests
description: Use when the user asks to run tests, ejecutar tests, lanzar tests, pytest, vitest, check types, typecheck, lint, or verify the codebase. Runs backend pytest, frontend vitest, frontend tsc/eslint/prettier, and backend ruff/black.
---

# Run Tests — FreeLingo

## Backend tests (pytest)

The project does NOT use Docker for local tests. Tests are fully isolated:

- SQLite in-memory (no PostgreSQL needed)
- Redis mocked in-memory (no Redis server needed)
- LLM always mocked (no external API calls)

### Prerequisites

```bash
python3 -m venv .venv && source .venv/bin/activate && pip install -r backend/requirements.txt
```

`.venv/` is already in `.gitignore`. Create it once, activate before each session.

### Run

```bash
cd backend && pytest
```

Options:
- Single file: `pytest tests/test_auth.py -v`
- Single test: `pytest tests/test_flashcards.py::test_quality_3_basic_progression -v`
- Coverage HTML: `pytest --cov-report=html`

## Frontend tests (vitest)

```bash
cd frontend && npm run test:run
```

332 tests covering stores, components, lib, middleware, and API interceptor:
- `lib/api.ts` — auth interceptor, 401 refresh, retry
- `store/auth.ts` — isSubscribed(), logout
- `lib/audio.ts` — float32ToWav WAV encoding
- `lib/conversation-ws.ts` — WebSocket URL builder
- `middleware.ts` — route protection, locale detection
- `store/config.ts` — config loading, idempotency
- `store/language.ts` — language CRUD, switching
- `store/progress.ts` — XP, streak, unit progress, level test
- `lib/mappers.ts` — mapUser transformation
- `lib/target-languages.ts` — language code resolution
- `data/curriculum.ts` — curriculum data integrity
- `components/LanguageSwitcher.tsx` — sidebar dropdown
- `components/TargetLanguageSelector.tsx` — language grid
- `components/VoiceRecorder.tsx` — STT recorder states
- `components/AudioPlayer.tsx` — TTS player states
- `components/ProfileSection.tsx` — profile CRUD, avatar
- `components/UnitCard.tsx` + `UnitDrawer.tsx` — plan units

Options:
- Watch mode: `npm run test`
- Single file: `npx vitest run tests/lib/api.test.ts`

## Frontend checks

```bash
npx tsc --noEmit                 # TypeScript type checking
npx eslint src/ --ext .ts,.tsx   # Lint
npx prettier --check src/        # Format check
```

## Backend lint

```bash
cd backend && ruff check . && black --check .
```