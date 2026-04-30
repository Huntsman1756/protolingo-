# FreeLingo

![License](https://img.shields.io/badge/license-Apache%202.0-green?style=flat-square)
![Self-hosted](https://img.shields.io/badge/self--hosted-yes-orange?style=flat-square)
![Python](https://img.shields.io/badge/python-3.12-blue?style=flat-square)
![Next.js](https://img.shields.io/badge/next.js-16-black?style=flat-square)
![Status](https://img.shields.io/badge/status-phase--1-brightgreen?style=flat-square)

<p align="left">
  <img src="assets/logo.png" alt="FreeLingo logo" width="200" />
</p>

Open source, self-hosted, Dockerized web application for learning languages with AI.
A local language model (Ollama) evaluates your CEFR level, generates a personalized
study plan, and guides you through grammar, vocabulary, reading comprehension,
and writing lessons.

## Architecture

Monorepo: `backend/` (Python FastAPI) + `frontend/` (Next.js 14 App Router)
deployed via Docker Compose with PostgreSQL 16 and Redis 7.
The backend proxies all external services (Ollama, Kokoro, Whisper) —
the frontend never calls them directly.

## Repository

```
freelingo/
├── assets/             # Logos and static assets
├── backend/            # FastAPI (Python)
├── frontend/           # Next.js (React)
├── specs/              # Specification files
├── docker-compose.yml
├── .env.example
├── CONTRIBUTING.md
├── CHANGELOG.md
├── LICENSE
└── README.md
```

## Stack

| Layer      | Technology                                             |
|------------|--------------------------------------------------------|
| Frontend   | Next.js 14+, shadcn/ui, Tailwind CSS, Zustand          |
| Backend    | FastAPI, SQLAlchemy async, Alembic, Pydantic v2        |
| Database   | PostgreSQL 16                                          |
| Cache      | Redis 7                                                |
| LLM        | Ollama (local) · OpenAI · Anthropic · DeepSeek         |
| TTS (P2)   | Kokoro-FastAPI                                         |
| STT (P2)   | faster-whisper                                         |
| Auth       | JWT (access + refresh), multi-user, roles (admin/user) |
| Deploy     | Docker Compose                                         |

## Phases

| Phase | Name                   | Status       |
|-------|------------------------|--------------|
| 1     | Learning platform      | ✅ Complete  |
| 2     | Local TTS + STT        | ⏳ Planned   |
| 3     | Real-time conversation | ⏳ Planned   |

## Quick start (Phase 1)
```bash
cp .env.example .env
# Edit .env with your Ollama configuration
docker compose up -d
```

Access at `http://localhost:3000`. The first registered user will be admin automatically.

## Internal documentation

- [architecture.instructions.md](specs/architecture.instructions.md) — DB models, API endpoints, LLM adapter, auth design, code standards, test config
- [docker.instructions.md](specs/docker.instructions.md) — Docker Compose by phase, `.env.example`, DB migrations, operational notes
- [phase-1-platform.instructions.md](specs/phase-1-platform.instructions.md) — Phase 1: scaffolding through frontend, prompts, SM-2, SSE chat
- [phase-2-tts-stt.instructions.md](specs/phase-2-tts-stt.instructions.md) — Phase 2: Kokoro TTS, faster-whisper STT, pronunciation exercises
- [phase-3-conversation.instructions.md](specs/phase-3-conversation.instructions.md) — Phase 3: WebSocket voice pipeline, VAD, barge-in
- [roadmap.instructions.md](specs/roadmap.instructions.md) — Development roadmap with milestones and completion criteria
- [changelog.instructions.md](specs/changelog.instructions.md) — Changelog format, entry style, and update rules
- [CHANGELOG.md](CHANGELOG.md) — Project changelog
- [readme.instructions.md](specs/readme.instructions.md) — README structure, badges, and update guidelines
- [testing.instructions.md](specs/testing.instructions.md) — Testing strategy: pytest, Vitest, Playwright, mocks, CI
- [llm-error-handling.instructions.md](specs/llm-error-handling.instructions.md) — LLM failures: malformed JSON, timeouts, retries, context overflow
- [rate-limiting.instructions.md](specs/rate-limiting.instructions.md) — slowapi-based rate limits per-endpoint, self-hosted defaults

## Operational notes

- The recommended model for Ollama is `gemma3:12b`. It can be changed in `.env`.
- The backend acts as a proxy for Ollama/TTS/STT calls so the frontend never talks directly to those services.
- The `LLM_PROVIDER` field controls the LLM provider: `ollama` (local, recommended), `openai`, `anthropic`, or `deepseek`.
- The target language is always **English**. During registration, the user's native language is asked for flashcard translations and tutor feedback.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on reporting bugs, suggesting features, and submitting pull requests.

## License

Distributed under the [Apache 2.0 License](LICENSE).

## Author

**Arturo Carretero Calvo** — [@artcc](https://github.com/artcc)