# Contributing to FreeLingo

Thank you for your interest in contributing. Please read these guidelines before opening issues or pull requests.

> **Note:** **External code contributions (pull requests) are temporarily not being accepted.** Bug reports and feature suggestions via issues are still welcome. This is a temporary measure — check back later for updates.

## Code of Conduct

This project follows the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). By participating you agree to abide by its terms. Report unacceptable behavior to [contacto@arturocarreterocalvo.com](mailto:contacto@arturocarreterocalvo.com).

## How to contribute

### Reporting bugs

Open an issue with:
- A clear title describing the problem
- Steps to reproduce
- Expected vs actual behaviour
- FreeLingo version / commit hash

### Suggesting features

Open an issue with the `enhancement` label. Describe the use case, not just the feature. Check the [roadmap](specs/roadmap.instructions.md) first — the feature may already be planned.

### Branch workflow

- **`develop`** — integration branch. All PRs target this branch. CI runs tests and lint on every PR.
- **`main`** — production branch. Merges from `develop` trigger Docker image publishing and releases.

Do not open PRs directly against `main`.

### Submitting a pull request

1. Fork the repository and create a branch from `develop`:
   ```bash
   git checkout -b feat/short-description
   ```
2. Follow the coding standards below.
3. Add or update tests. Coverage must remain ≥ 70 %.
4. Run static validation before pushing:
   ```bash
   # Backend — compile check
   python3 -m compileall app/ alembic/ -q
   # Backend — lint
   ruff check --fix backend/ && black backend/
   # Frontend — type check
   npx tsc --noEmit
   # Frontend — lint
   npx eslint src/ --ext .ts,.tsx && npx prettier --write src/
   ```
5. Open a pull request against `develop`. CI will run the full test suite automatically.

## Coding standards

| Layer | Standard |
|-------|----------|
| Python | ruff (`E, W, F, I, UP, B, S, ANN`, ANN101 ignored), Black (line-length 100) |
| TypeScript | No semicolons, single quotes, 2-space indent, trailing commas (es5), `prettier-plugin-tailwindcss` |

S and ANN rules are disabled in `tests/`.

## Running tests locally

The test suite uses SQLite in-memory and mocked Redis — no Docker services required.

```bash
# Backend
cd backend && pytest

# Run a single backend test file
cd backend && pytest tests/test_auth.py -v
```

Frontend tests run in CI. For a quick local check, use the type checker:

```bash
cd frontend && npx tsc --noEmit
```

> **Note:** `package-lock.json` must be generated with **npm 11**. If you update frontend dependencies, make sure you are using npm 11 locally before committing the lockfile.

## DB migrations

If you change a SQLAlchemy model, generate a migration. These commands must be run on the remote server where Docker is available:

```bash
docker compose exec backend alembic revision --autogenerate -m "short description"
docker compose exec backend alembic upgrade head
```

## Contributor License Agreement

By opening a pull request you accept the [Contributor License Agreement](CONTRIBUTOR_LICENSE_AGREEMENT.md). In essence, you grant Arturo Carretero Calvo permission to license your contributions under any terms deemed appropriate, which preserves the option to offer the project under commercial licences in addition to AGPL-3.0.