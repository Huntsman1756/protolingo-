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
| `backend` | `ghcr.io/artcc/freelingo-backend:latest` | 8000 (internal) | 1 | Runs Alembic migrations automatically before Uvicorn. Depends on healthy postgres + redis. |
| `frontend` | `ghcr.io/artcc/freelingo-frontend:latest` | 3000 (host) | 1 | Receives `BACKEND_URL` as runtime env var. Depends on backend. |
| `kokoro` | `ghcr.io/remsky/kokoro-fastapi-gpu:latest-cu128` | 8880 (internal) | 2 | TTS — upstream image (0.4.0+), cu128 variant for Blackwell/RTX 50-series. Only needed when `TTS_PROVIDER=local`. |
| `whisper` | `onerahmet/openai-whisper-asr-webservice:latest-gpu` | 9000 (internal) | 2 | STT — GPU via NVIDIA deploy block. Only needed when `STT_PROVIDER=local`. |

Ollama is assumed to run on the host machine for GPU access, reached from containers via `host.docker.internal:11434`.

---

## Image channels

| Channel | Branch | Backend image | Frontend image |
|---------|--------|---------------|----------------|
| Production | `main` | `ghcr.io/artcc/freelingo-backend` | `ghcr.io/artcc/freelingo-frontend` |
| Develop | `develop` | `ghcr.io/artcc/freelingo-backend-develop` | `ghcr.io/artcc/freelingo-frontend-develop` |

Both channels publish `:latest` and a short SHA tag on every push. The compose file uses production images by default.

---

## Docker Compose structure

### Named volumes

Two named volumes: `postgres_data` and `redis_data`. Both services also accept bind mounts via `DATA_PATH` for easier backup and access outside Docker.

### PostgreSQL

- Alpine-based; credentials from env vars (`POSTGRES_DB`, `POSTGRES_USER`, `POSTGRES_PASSWORD`)
- Health check ensures the backend waits for readiness before starting (`condition: service_healthy`)

### Redis

- Alpine-based; password-protected via `REDIS_PASSWORD`
- Health check via authenticated ping

### Backend

- Pulled with `pull_policy: always`; no bind mounts for source code
- Startup command: `alembic upgrade head` then `uvicorn` — no manual migration step ever needed
- Receives all configuration exclusively via environment variables
- Bind mounts only for user-generated content: `avatars/` and `audio/`
- Worker count controlled by `UVICORN_WORKERS` (default: 4)

### Frontend

- Pulled with `pull_policy: always`
- Single runtime env var: `BACKEND_URL=http://backend:8000` (used by Next.js Route Handlers; not exposed to the browser)
- Only service exposing a port to the host (3000)

### Kokoro TTS

- Upstream image (`0.4.0+`). Cu128 variant (`:latest-cu128`) for Blackwell/RTX 50-series (sm_120).
- For Maxwell/Pascal/Turing/Ampere/Hopper (sm_50–sm_90): use `:latest` (cu126, confirmed Pascal support in pyproject.toml).
- Remove from stack entirely when `TTS_PROVIDER=openai`
- GPU assigned via `deploy.resources.reservations.devices`; remove this block for CPU-only hosts

### Whisper STT

- GPU image by default; model and engine set via `ASR_MODEL` / `ASR_ENGINE` (forwarded from `STT_MODEL` and `STT_ENGINE`)
- Remove from stack entirely when `STT_PROVIDER=openai`
- GPU assigned via `deploy.resources.reservations.devices`; remove for CPU-only hosts

---

## Environment variables

The canonical reference is `.env.example` at the repo root. The categories operators must review before first deployment:

| Category | Key variables | Notes |
|----------|---------------|-------|
| Database | `POSTGRES_DB`, `POSTGRES_USER`, `POSTGRES_PASSWORD` | All three must be set |
| Data path | `DATA_PATH` | Host path for bind mounts (postgres, redis, avatars, audio) |
| Cache | `REDIS_PASSWORD` | Must match in Redis command and backend URL |
| Auth | `SECRET_KEY` | Generate with `openssl rand -hex 32`; never commit |
| CORS / Cookie | `CORS_ORIGINS`, `COOKIE_SECURE` | Set `COOKIE_SECURE=true` when serving over HTTPS |
| Registration | `ALLOW_REGISTRATION`, `FIRST_USER_IS_ADMIN` | Restrict signups and promote first user automatically |
| Email / SMTP | `EMAIL_ENABLED`, `SMTP_*`, `APP_BASE_URL` | Required for email verification and password reset |
| LLM | `LLM_PROVIDER`, `OLLAMA_*`, `OPENAI_*`, `ANTHROPIC_*`, `DEEPSEEK_*` | Provider selected via `LLM_PROVIDER` |
| TTS | `TTS_PROVIDER`, `TTS_BASE_URL`, `TTS_VOICE`, `OPENAI_TTS_*` | `local` or `openai` |
| STT | `STT_PROVIDER`, `STT_BASE_URL`, `STT_MODEL`, `STT_ENGINE`, `OPENAI_STT_MODEL` | `local` or `openai` |
| Stripe | `STRIPE_ENABLED`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_PRICE_*` | Optional; disabled by default |
| Logging | `LOG_LEVEL` | Default: `INFO` |

---

## Operational notes

### First deployment

1. Copy `.env.example` → `.env` and fill in all `CHANGE_ME_*` values
2. `docker compose up -d` — the backend runs migrations automatically on first start

### Ollama on host (recommended)

Backend accesses Ollama via `host.docker.internal:11434`. On **Linux**, add `extra_hosts: ["host.docker.internal:host-gateway"]` to the backend service. On macOS and Windows, `host.docker.internal` resolves automatically.

Alternatively, Ollama can run as a Docker service with its own GPU deploy block; set `OLLAMA_BASE_URL=http://ollama:11434` accordingly.

### Database migrations

Run via the backend container after model changes. Migrations run automatically on every container startup (`alembic upgrade head`), so manual invocation is only needed when creating new revision files.

### GPU vs CPU

| Service | GPU image | CPU image | Change needed |
|---------|-----------|-----------|---------------|
| Kokoro TTS | `ghcr.io/remsky/kokoro-fastapi-gpu:latest-cu128` | `ghcr.io/remsky/kokoro-fastapi-cpu:latest` | Replace image; remove `deploy` block |
| Whisper STT | `*:latest-gpu` | `*:latest` | Replace tag; remove `deploy` block; use `STT_MODEL=small` |

The `deploy.resources.reservations.devices` block requires the Docker NVIDIA runtime. Remove it entirely for CPU-only hosts.

---

## TTS/STT provider selection

| Variable | Value | Behaviour |
|----------|-------|-----------|
| `TTS_PROVIDER` | `local` (default) | Routes TTS to the `kokoro` Docker service |
| `TTS_PROVIDER` | `openai` | Routes TTS to OpenAI TTS API — `kokoro` service not needed |
| `STT_PROVIDER` | `local` (default) | Routes STT to the `whisper` Docker service |
| `STT_PROVIDER` | `openai` | Routes STT to OpenAI Whisper API — `whisper` service not needed |

When using `openai` providers, the corresponding Docker service can be removed from the stack entirely.

---

## STT service API

The Whisper service (`onerahmet/openai-whisper-asr-webservice`) does **not** implement the OpenAI API format. The correct endpoint is:

```
POST /asr?output=json&language=en&task=transcribe
Content-Type: multipart/form-data
Field: audio_file
```

The backend's `STTService` calls this endpoint correctly. Do not confuse it with the OpenAI-compatible `/v1/audio/transcriptions` path, which does not exist in this service.