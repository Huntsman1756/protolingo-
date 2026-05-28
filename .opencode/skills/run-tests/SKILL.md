---
name: run-tests
description: Use when the user asks to run tests, ejecutar tests, lanzar tests, pytest, check types, typecheck, lint, or verify the codebase. Covers backend pytest (with venv), frontend tsc --noEmit, and ruff/black/eslint/prettier checks.
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

## Frontend checks

```bash
npx tsc --noEmit                 # TypeScript type checking
npx eslint src/ --ext .ts,.tsx   # Lint
npx prettier --check src/        # Format check
```

## Backend lint

```bash
cd backend && ruff check --select E,W,F . && black --check .
```