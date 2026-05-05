---
description: "Docker Compose specification for FreeLingo — all services (PostgreSQL, Redis, backend, frontend, Ollama, Kokoro TTS, Whisper STT), environment variables, operational notes, and deployment guidance."
applyTo: "docker-compose.yml, .env*, **/Dockerfile"
---

# Docker Compose — FreeLingo

## Service inventory

| Service | Image | Ports | Phase | Notes |
|---------|-------|-------|-------|-------|
| `postgres` | `postgres:16-alpine` | 5432 (internal) | 1 | Health check via `pg_isready` |
| `redis` | `redis:7-alpine` | 6379 (internal) | 1 | Password-protected, health check via `redis-cli ping` |
| `backend` | Built from `backend/Dockerfile` | 8000 | 1 | Python 3.14, Uvicorn, depends on postgres+redis |
| `frontend` | Built from `frontend/Dockerfile` | 3000 | 1 | Next.js 16, built with `NEXT_PUBLIC_API_URL` as build arg |
| `kokoro` | `ghcr.io/remsky/kokoro-fastapi-gpu:latest` | 8880 | 2 | TTS, GPU via NVIDIA deploy block |
| `whisper` | `onerahmet/openai-whisper-asr-webservice:latest-gpu` | 9000 | 2 | STT, GPU via NVIDIA deploy block |

Ollama is assumed to run on the host machine for GPU access, accessed via `host.docker.internal:11434`. It can alternatively run as a Docker service with its own GPU deploy block.

---

## Docker Compose structure

The compose file defines 6 services (plus optional Ollama) and 2 named volumes (`postgres_data`, `redis_data`).

### PostgreSQL

- Alpine-based image for minimal footprint
- Database name, user, and password from environment variables
- Health check ensures backend waits for database readiness (`depends_on: condition: service_healthy`)
- Data persisted in named volume

### Redis

- Alpine-based image
- Password from `REDIS_PASSWORD` environment variable
- Health check via authenticated ping
- Data persisted in named volume

### Backend

- Built from `backend/Dockerfile` (Python 3.14 slim)
- Receives all configuration via environment variables (passed from `.env`)
- Binds `./backend:/app` volume for live development
- Startup command: `uvicorn app.main:app --host 0.0.0.0 --port 8000`
- Depends on healthy PostgreSQL and Redis

### Frontend

- Built from `frontend/Dockerfile` (multi-stage: npm 11 → next build)
- `NEXT_PUBLIC_API_URL` passed as Docker build ARG and baked at build time (required for WebSocket URL resolution on separate-subdomain deployments)
- Serves built output on port 3000
- Depends on backend

### Kokoro TTS (Phase 2)

- GPU image by default (`kokoro-fastapi-gpu`)
- Exposes port 8880
- NVIDIA GPU via `deploy.resources.reservations.devices` block
- No environment variables needed (uses defaults)

### Whisper STT (Phase 2)

- GPU image by default (`latest-gpu`)
- Exposes port 9000
- Environment: `ASR_MODEL` (from `${STT_MODEL:-large-v3-turbo}`), `ASR_ENGINE` (from `${STT_ENGINE:-faster_whisper}`)
- NVIDIA GPU via `deploy.resources.reservations.devices` block

---

## Environment variables (`.env`)

All required variables with their defaults:

```env
# ─── Database ────────────────────────────────────────────
POSTGRES_DB=freelingo
POSTGRES_USER=freelingo
POSTGRES_PASSWORD=CHANGE_ME_DB_PASSWORD

# ─── Redis ───────────────────────────────────────────────
REDIS_PASSWORD=CHANGE_ME_REDIS_PASSWORD

# ─── Auth ────────────────────────────────────────────────
# Generate with: openssl rand -hex 32
SECRET_KEY=CHANGE_ME_SECRET_KEY
ACCESS_TOKEN_EXPIRE_MINUTES=15
REFRESH_TOKEN_EXPIRE_DAYS=30
ALLOW_REGISTRATION=true
FIRST_USER_IS_ADMIN=true

# ─── LLM ─────────────────────────────────────────────────
# Options: ollama | openai | anthropic | deepseek
LLM_PROVIDER=ollama
OLLAMA_BASE_URL=http://host.docker.internal:11434
OLLAMA_MODEL=gemma3:12b
OPENAI_API_KEY=
OPENAI_MODEL=gpt-4o-mini
ANTHROPIC_API_KEY=
ANTHROPIC_MODEL=claude-3-5-haiku-latest
DEEPSEEK_API_KEY=
DEEPSEEK_MODEL=deepseek-chat

# ─── Frontend ────────────────────────────────────────────
NEXT_PUBLIC_API_URL=http://localhost:8000

# ─── TTS ─────────────────────────────────────────────────
TTS_ENABLED=false
TTS_BASE_URL=http://kokoro:8880
TTS_VOICE=af_heart

# ─── STT ─────────────────────────────────────────────────
STT_ENABLED=false
STT_BASE_URL=http://whisper:9000
STT_MODEL=large-v3-turbo
STT_ENGINE=faster_whisper

# ─── Rate Limiting ───────────────────────────────────────
RATE_LIMIT_ENABLED=true
RATE_LIMIT_STORAGE=memory

# ─── CORS ────────────────────────────────────────────────
CORS_ORIGINS=*

# ─── Logging ─────────────────────────────────────────────
LOG_LEVEL=INFO

# ─── Cookie ──────────────────────────────────────────────
COOKIE_SECURE=true
```

---

## Operational notes

### Run order (first deployment)

1. Copy `.env.example` to `.env` and fill in `CHANGE_ME_*` values
2. `docker compose up -d` — start all services
3. `docker compose exec backend alembic upgrade head` — run DB migrations

### Ollama on host (recommended for GPU)

If Ollama runs directly on the host with GPU access, the backend accesses it via `host.docker.internal:11434`.

On **Linux**, `host.docker.internal` requires adding to the backend service:
```yaml
extra_hosts:
  - "host.docker.internal:host-gateway"
```

On macOS and Windows, `host.docker.internal` resolves automatically.

### Ollama in Docker with GPU

Alternative: run Ollama as a Docker service with its own GPU deploy block. In that case, set `OLLAMA_BASE_URL=http://ollama:11434` in `.env`.

### Database migrations

```bash
# Run all pending migrations
docker compose exec backend alembic upgrade head

# Create a new migration after model changes
docker compose exec backend alembic revision --autogenerate -m "description"
docker compose exec backend alembic upgrade head
```

### Logs

```bash
# All services
docker compose logs -f

# Specific service
docker compose logs -f backend

# Check GPU utilization
docker compose exec whisper nvidia-smi
docker compose exec kokoro nvidia-smi
```

### Updating images

```bash
docker compose pull kokoro whisper
docker compose up -d kokoro whisper
```

---

## GPU vs CPU

Both TTS and STT services default to GPU images with CUDA support (`*-gpu:latest`). For CPU-only hosts:

| Service | GPU image | CPU image | Additional changes |
|---------|-----------|-----------|-------------------|
| Kokoro TTS | `ghcr.io/remsky/kokoro-fastapi-gpu:latest` | `ghcr.io/remsky/kokoro-fastapi-cpu:latest` | Remove the entire `deploy` block |
| Whisper STT | `onerahmet/openai-whisper-asr-webservice:latest-gpu` | `onerahmet/openai-whisper-asr-webservice:latest` | Remove the `deploy` block; set `STT_MODEL=tiny.en` or `small` for acceptable performance |

The `deploy.resources.reservations.devices` block references NVIDIA GPUs via the Docker NVIDIA runtime. If this runtime is not installed on the host, Docker will error on startup. Remove these blocks entirely for CPU-only deployments.

---

## Application-level TTS/STT toggling

Even when Kokoro and Whisper services are running in Docker Compose, the application-level TTS and STT features are disabled by default:

- `TTS_ENABLED=false`: the `/api/tts` endpoint returns 503, audio buttons are hidden
- `STT_ENABLED=false`: the `/api/stt` endpoint returns 503, voice recording is hidden
- Both must be `true` for the Phase 3 WebSocket voice conversation endpoint to accept connections

This allows deploying the full stack while enabling features gradually or for specific users.

---

## STT service API

**Important**: The Whisper service (`onerahmet/openai-whisper-asr-webservice`) does **not** implement the OpenAI API format. The actual endpoint is:

```
POST /asr?output=json&language=en&task=transcribe
Content-Type: multipart/form-data
Field: audio_file (the audio binary)
```

The backend's `STTService` correctly calls this endpoint. Earlier versions of this spec incorrectly documented the OpenAI-compatible `/v1/audio/transcriptions` endpoint, which does not exist in this service.