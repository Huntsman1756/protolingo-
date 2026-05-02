# FreeLingo

![License](https://img.shields.io/badge/license-Apache%202.0-green?style=flat-square)
![Next.js](https://img.shields.io/badge/next.js-16-black?style=flat-square)
![Python](https://img.shields.io/badge/python-3.12-blue?style=flat-square)
![Self-hosted](https://img.shields.io/badge/self--hosted-yes-orange?style=flat-square)

<p align="left">
  <img src="assets/logo.png" alt="FreeLingo logo" width="200" />
</p>

Open source, self-hosted, Dockerized web application for learning languages with AI.
A local language model (Ollama) evaluates your CEFR level, generates a personalized
study plan, and guides you through grammar, vocabulary, reading comprehension,
and writing lessons.

The study plan follows a CEFR-aligned curriculum (A1-C2) organized into units with
clear competencies and prerequisites. After a deterministic placement assessment,
FreeLingo creates a weekly roadmap based on your selected intensity (4, 8, 12, or
16 weeks), then unlocks lessons in sequence: grammar, vocabulary, reading, writing,
and review.

The platform combines structure and adaptation: lessons are generated within
curriculum boundaries, flashcards use SM-2 spaced repetition, and the AI tutor
provides contextual streaming feedback in English (with optional brief support in
the learner's native language). Progress tracking includes XP, streaks, skill
scores, unit competencies, and an end-of-level completion test.

## Architecture

Monorepo: `backend/` (Python FastAPI) + `frontend/` (Next.js 16 App Router)
deployed via Docker Compose with PostgreSQL 16 and Redis 7.
The backend proxies all external services (Ollama, Kokoro, Whisper) —
the frontend never calls them directly.

## Repository

```
freelingo/
├── assets/             # Logos and static assets
├── backend/            # FastAPI (Python)
├── docker/             # Custom Dockerfiles (e.g. Kokoro with Blackwell GPU support)
├── docs/               # GitHub Pages landing site
├── frontend/           # Next.js (React)
├── messages/           # i18n translation files (en, es, fr, pt, de, it)
├── specs/              # Specification files
├── AGENTS.md
├── CHANGELOG.md
├── CONTRIBUTING.md
├── LICENSE
├── README.md
└── docker-compose.yml
```

## Stack

| Layer      | Technology                                               |
|------------|----------------------------------------------------------|
| Frontend   | Next.js 16+, shadcn/ui, Tailwind CSS, Zustand, next-intl |
| Backend    | FastAPI, SQLAlchemy async, Alembic, Pydantic v2          |
| Database   | PostgreSQL 16                                            |
| Cache      | Redis 7                                                  |
| LLM        | Ollama (local) · OpenAI · Anthropic · DeepSeek           |
| TTS (P2)   | Kokoro-FastAPI                                           |
| STT (P2)   | faster-whisper                                           |
| Auth       | JWT (access + refresh), multi-user, roles (admin/user).  |
| Deploy     | Docker Compose                                           |

## Phases

| Phase | Name                   | Status         |
|-------|------------------------|----------------|
| 1     | Learning platform      | ✅ Complete    |
| 1+    | Learning Resources Hub | ✅ Complete    |
| 2     | Local TTS + STT        | ✅ Complete    |
| 3     | Real-time conversation | ✅ Complete    |

## Quick start

### Option A — Git clone + Docker Compose

**Requirements:** Docker, Docker Compose, Git, and [Ollama](https://ollama.com) running on the host.

```bash
# 1. Clone the repository
git clone https://github.com/artcc/freelingo.git
cd freelingo

# 2. Configure environment
cp .env.example .env
# Edit .env: set OLLAMA_BASE_URL, choose your model, and review other settings

# 3. Pull the recommended model (run on the host, not inside Docker)
ollama pull gemma3:12b

# 4. Start all services (migrations run automatically on first start)
docker compose up -d
```

Access at `http://localhost:3000` (or `http://<server-ip>:3000`).  
The first registered user becomes admin automatically.

---

### Option B — Portainer (Stack)

1. Open Portainer → **Stacks** → **Add stack**.
2. Choose **Repository** and enter the repo URL, or paste the contents of `docker-compose.yml` directly into the Web editor.
3. Scroll down to **Environment variables** and add the variables from `.env.example` (at minimum: `SECRET_KEY`, `OLLAMA_BASE_URL`, `POSTGRES_PASSWORD`).
4. Click **Deploy the stack**.
5. Access the app at `http://<server-ip>:3000`. Database migrations run automatically when the backend starts.

> **Tip:** If Ollama runs on the same host as Portainer, set `OLLAMA_BASE_URL=http://host.docker.internal:11434`. On Linux you may need to add the `extra_hosts` entry in the compose file (already included by default).

## Internal documentation

- [architecture.instructions.md](specs/architecture.instructions.md) — DB models, API endpoints, LLM adapter, auth design, code standards, test config
- [CHANGELOG.md](CHANGELOG.md) — Project changelog
- [changelog.instructions.md](specs/changelog.instructions.md) — Changelog format, entry style, and update rules
- [docker.instructions.md](specs/docker.instructions.md) — Docker Compose by phase, `.env.example`, DB migrations, operational notes
- [llm-error-handling.instructions.md](specs/llm-error-handling.instructions.md) — LLM failures: malformed JSON, timeouts, retries, context overflow
- [phase-1-platform.instructions.md](specs/phase-1-platform.instructions.md) — Phase 1: scaffolding through frontend, prompts, SM-2, SSE chat
- [phase-1-plus.instructions.md](specs/phase-1-plus.instructions.md) — Phase 1+: Learning Resources Hub — Grammar Reference, Vocabulary Hub, Phrasebook, Skills Tracker, Level Completion Test
- [phase-2-tts-stt.instructions.md](specs/phase-2-tts-stt.instructions.md) — Phase 2: Kokoro TTS, faster-whisper STT, pronunciation exercises
- [phase-3-conversation.instructions.md](specs/phase-3-conversation.instructions.md) — Phase 3: WebSocket voice pipeline, VAD, barge-in
- [phase-4-grammar-reference.instructions.md](specs/phase-4-grammar-reference.instructions.md) — Phase 4: extended grammar reference and content pipeline
- [rate-limiting.instructions.md](specs/rate-limiting.instructions.md) — slowapi-based rate limits per-endpoint, self-hosted defaults
- [readme.instructions.md](specs/readme.instructions.md) — README structure, badges, and update guidelines
- [roadmap.instructions.md](specs/roadmap.instructions.md) — Development roadmap with milestones and completion criteria
- [testing.instructions.md](specs/testing.instructions.md) — Testing strategy: pytest, Vitest, Playwright, mocks, CI

## Operational notes

- The recommended model for Ollama is `gemma3:12b`. It can be changed in `.env`.
- The backend acts as a proxy for Ollama/TTS/STT calls so the frontend never talks directly to those services.
- The `LLM_PROVIDER` field controls the LLM provider: `ollama` (local, recommended), `openai`, `anthropic`, or `deepseek`.
- The target language is always **English**. During registration, the user's native language is asked for flashcard translations and tutor feedback.

## Enabling TTS & STT

TTS (Kokoro) and STT (faster-whisper) are disabled by default. Both services are already defined in `docker-compose.yml` (commented out) and can be activated on either a GPU or a CPU host.

### GPU host (NVIDIA)

1. The `kokoro` and `whisper` services are already configured in `docker-compose.yml` with the NVIDIA `deploy` block.
2. The Kokoro image (`ghcr.io/artcc/kokoro-fastapi-gpu`) ships with PyTorch 2.7+ (cu128), supporting all NVIDIA architectures including **Blackwell (RTX 5000 series, sm_120)**.
3. Add to `.env`:
   ```env
   TTS_ENABLED=true
   STT_ENABLED=true
   ```
4. Restart the stack: `docker compose up -d`.

### CPU-only host

1. Uncomment the `kokoro` and `whisper` services in `docker-compose.yml`.
2. Replace the image tags and remove the `deploy` block for each service:

   **Kokoro (TTS):**
   ```yaml
   kokoro:
     image: ghcr.io/remsky/kokoro-fastapi-cpu:latest
     restart: unless-stopped
     ports:
       - "8880:8880"
   ```

   **Whisper (STT):**
   ```yaml
   whisper:
     image: onerahmet/openai-whisper-asr-webservice:latest
     restart: unless-stopped
     ports:
       - "9000:9000"
     environment:
       - ASR_MODEL=base
       - ASR_ENGINE=faster_whisper
   ```
   > Use `ASR_MODEL=base` or `small` on CPU. Larger models (`medium`, `large`) are very slow without a GPU.

3. Add to `.env`:
   ```env
   TTS_ENABLED=true
   STT_ENABLED=true
   ```
4. Restart the stack: `docker compose up -d`.

### Notes

- If TTS or STT is disabled, the backend returns `503` on those endpoints. The frontend gracefully degrades: the listen/record buttons are not rendered.
- The TTS voice can be changed via `TTS_VOICE` in `.env` (default: `af_heart`). Available voices: `af_heart`, `af_sky` (American), `bf_emma`, `bm_george` (British).
- The STT model is controlled by `ASR_MODEL` inside the whisper container environment variable, not from `.env`.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on reporting bugs, suggesting features, and submitting pull requests.

## License

Distributed under the [Apache 2.0 License](LICENSE).

## Author

**Arturo Carretero Calvo** — [@artcc](https://github.com/artcc)