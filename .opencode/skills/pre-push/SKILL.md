---
name: pre-push
description: Use when the user asks to check before pushing, pre-push, verificar antes de pushear, run all checks, or quiere validar que todo pasa antes de hacer push. Auto-formats code then runs the same checks as CI (pytest, eslint, tsc).
---

# Pre-Push Checks — FreeLingo

Auto-formats code, then validates everything CI enforces on `develop`. Mirrors `.github/workflows/pr-develop-checks.yml`.

## Order

Run in this sequence, stopping on first failure:

### 0. Auto-format (always run first)

```bash
source .venv/bin/activate && cd backend && ruff check --fix . && black . && cd ../frontend && npx eslint src/ --ext .ts,.tsx --fix && npx prettier --write src/
```

Fixes what can be fixed automatically: Python lint + format, JS/TS lint + format.

### 1. Backend tests

```bash
source .venv/bin/activate && cd backend && pytest -v
```

341 tests, >= 60% coverage required. SQLite in-memory, no Docker needed.

### 2. Frontend lint + typecheck + tests

```bash
cd frontend && npm run lint && npx tsc --noEmit && npm run test:run
```

## What each step does

| Step | Tool | Action |
|------|------|--------|
| 0 | ruff --fix | Auto-fix Python lint issues |
| 0 | black | Auto-format Python code |
| 0 | eslint --fix | Auto-fix JS/TS lint issues |
| 0 | prettier --write | Auto-format JS/TS/CSS code |
| 1 | pytest | 341 backend tests, SQLite in-memory |
| 2 | eslint | Verify no remaining JS/TS errors |
| 2 | tsc --noEmit | TypeScript type checking |
| 2 | vitest | 54 frontend tests |

**Note:** CI does not run ruff/black checks — only pytest, eslint, tsc, and vitest. Backend lint (ruff/black) is kept in step 0 as auto-format only.

## Requirements

- `.venv/` at project root (create once: `python3 -m venv .venv && source .venv/bin/activate && pip install -r backend/requirements.txt`)
- `frontend/node_modules` exists (install once: `cd frontend && npm install`)

## If something fails

1. If step 0 fails, fix manually — it means auto-fix couldn't handle something
2. If steps 1-2 fail after step 0 passed, the issue needs manual fix
3. Re-run **only the failing step** (no need to restart from step 0)
4. Once all pass, the branch is safe to push