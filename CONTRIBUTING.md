# Contributing to FreeLingo

Thank you for your interest in contributing. Please read these guidelines before opening issues or pull requests.

## Code of Conduct

Be respectful and constructive. Harassment of any kind is not tolerated.

## How to contribute

### Reporting bugs

Open an issue with:
- A clear title describing the problem
- Steps to reproduce
- Expected vs actual behaviour
- FreeLingo version / commit hash

### Suggesting features

Open an issue with the `enhancement` label. Describe the use case, not just the feature. Check the [roadmap](specs/roadmap.instructions.md) first — the feature may already be planned.

### Submitting a pull request

1. Fork the repository and create a branch from `main`:
   ```bash
   git checkout -b feat/short-description
   ```
2. Follow the coding standards below.
3. Add or update tests. Coverage must remain ≥ 70 %.
4. Run linting before pushing:
   ```bash
   # Backend
   ruff check --fix backend/ && black backend/
   # Frontend
   npx eslint src/ --ext .ts,.tsx && npx prettier --write src/
   ```
5. Open a pull request against `main`. Fill in the PR template.

## Coding standards

| Layer | Standard |
|-------|----------|
| Python | ruff (`E, W, F, I, UP, B, S, ANN`, ANN101 ignored), Black (line-length 100) |
| TypeScript | No semicolons, single quotes, 2-space indent, trailing commas (es5), `prettier-plugin-tailwindcss` |

S and ANN rules are disabled in `tests/`.

## Running tests locally

```bash
# Backend (requires Docker services running)
cd backend && pytest

# Frontend unit tests
cd frontend && npm test

# Run a single backend test file
pytest tests/test_auth.py -v
```

## DB migrations

If you change a SQLAlchemy model, generate a migration:

```bash
docker compose exec backend alembic revision --autogenerate -m "short description"
docker compose exec backend alembic upgrade head
```

## License

By contributing you agree that your contributions will be licensed under the [GNU Affero General Public License v3](LICENSE).
