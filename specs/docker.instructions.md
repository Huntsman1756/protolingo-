---
description: "Complete FreeLingo Docker Compose by phases, .env.example environment variables, operational notes: Ollama on host vs Docker with GPU, Alembic migrations, logs, image updates."
applyTo: "docker-compose.yml, .env*,**/Dockerfile"
---

# Docker Compose — FreeLingo

## Reference

Complete Compose with all three phases. Phase 2 and 3 services are included
but commented out; they are activated when reaching that phase.

## docker-compose.yml

```yaml
services:

  # ─── CORE ────────────────────────────────────────────────

  postgres:
    image: postgres:16-alpine
    restart: unless-stopped
    environment:
      POSTGRES_DB: ${POSTGRES_DB}
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${POSTGRES_USER} -d ${POSTGRES_DB}"]
      interval: 10s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    restart: unless-stopped
    command: redis-server --requirepass ${REDIS_PASSWORD}
    volumes:
      - redis_data:/data
    healthcheck:
      test: ["CMD", "redis-cli", "--pass", "${REDIS_PASSWORD}", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5

  # ─── BACKEND ─────────────────────────────────────────────

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    restart: unless-stopped
    environment:
      DATABASE_URL: postgresql+asyncpg://${POSTGRES_USER}:${POSTGRES_PASSWORD}@postgres:5432/${POSTGRES_DB}
      REDIS_URL: redis://:${REDIS_PASSWORD}@redis:6379/0
      SECRET_KEY: ${SECRET_KEY}
      LLM_PROVIDER: ${LLM_PROVIDER}
      OLLAMA_BASE_URL: ${OLLAMA_BASE_URL}
      OLLAMA_MODEL: ${OLLAMA_MODEL}
      OPENAI_API_KEY: ${OPENAI_API_KEY}
      OPENAI_MODEL: ${OPENAI_MODEL}
      ANTHROPIC_API_KEY: ${ANTHROPIC_API_KEY}
      ANTHROPIC_MODEL: ${ANTHROPIC_MODEL}
      DEEPSEEK_API_KEY: ${DEEPSEEK_API_KEY}
      DEEPSEEK_MODEL: ${DEEPSEEK_MODEL}
      # Phase 2
      TTS_ENABLED: ${TTS_ENABLED:-false}
      TTS_BASE_URL: ${TTS_BASE_URL:-http://kokoro:8880}
      TTS_VOICE: ${TTS_VOICE:-af_heart}
      STT_ENABLED: ${STT_ENABLED:-false}
      STT_BASE_URL: ${STT_BASE_URL:-http://whisper:9000}
    ports:
      - "8000:8000"
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy
    volumes:
      - ./backend:/app

  # ─── FRONTEND ────────────────────────────────────────────

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    restart: unless-stopped
    environment:
      NEXT_PUBLIC_API_URL: ${NEXT_PUBLIC_API_URL:-http://localhost:8000}
      NEXT_PUBLIC_WS_URL: ${NEXT_PUBLIC_WS_URL:-ws://localhost:8000}
    ports:
      - "3000:3000"
    depends_on:
      - backend

  # ─── PHASE 2: TTS + STT (uncomment when implementing) ────

  # kokoro:
  #   image: ghcr.io/remsky/kokoro-fastapi:latest
  #   restart: unless-stopped
  #   ports:
  #     - "8880:8880"
  #   deploy:
  #     resources:
  #       reservations:
  #         devices:
  #           - driver: nvidia
  #             count: 1
  #             capabilities: [gpu]

  # whisper:
  #   image: onerahmet/openai-whisper-asr-webservice:latest-gpu
  #   restart: unless-stopped
  #   ports:
  #     - "9000:9000"
  #   environment:
  #     ASR_MODEL: ${STT_MODEL:-medium}
  #     ASR_ENGINE: faster_whisper
  #   deploy:
  #     resources:
  #       reservations:
  #         devices:
  #           - driver: nvidia
  #             count: 1
  #             capabilities: [gpu]

volumes:
  postgres_data:
  redis_data:
```

## `.env.example`

> Copy to `.env` and fill in the values marked with `CHANGE_ME_*` before starting up.

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

# true  = anyone can register
# false = only admin can create accounts or generate invites
ALLOW_REGISTRATION=true
# First registered user automatically becomes admin
FIRST_USER_IS_ADMIN=true

# ─── LLM ─────────────────────────────────────────────────
# Options: ollama | openai | anthropic | deepseek
LLM_PROVIDER=ollama

# Ollama (if LLM_PROVIDER=ollama)
OLLAMA_BASE_URL=http://host.docker.internal:11434
OLLAMA_MODEL=gemma3:12b

# OpenAI (if LLM_PROVIDER=openai)
OPENAI_API_KEY=
OPENAI_MODEL=gpt-4o-mini

# Anthropic (if LLM_PROVIDER=anthropic)
ANTHROPIC_API_KEY=
ANTHROPIC_MODEL=claude-3-5-haiku-latest

# DeepSeek (if LLM_PROVIDER=deepseek)
DEEPSEEK_API_KEY=
DEEPSEEK_MODEL=deepseek-chat

# ─── Frontend ────────────────────────────────────────────
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_WS_URL=ws://localhost:8000

# ─── Phase 2: TTS + STT ─────────────────────────────────
TTS_ENABLED=false
TTS_BASE_URL=http://kokoro:8880
TTS_VOICE=af_heart

STT_ENABLED=false
STT_BASE_URL=http://whisper:9000
STT_MODEL=medium
```

## Operational notes

### Ollama on host (recommended)

If Ollama runs outside Docker (directly on the host with GPU):

```env
OLLAMA_BASE_URL=http://host.docker.internal:11434
```

On Linux, `host.docker.internal` requires adding to the `backend` service:

```yaml
extra_hosts:
  - "host.docker.internal:host-gateway"
```

### Ollama in Docker with GPU

```yaml
  ollama:
    image: ollama/ollama:latest
    restart: unless-stopped
    ports:
      - "11434:11434"
    volumes:
      - ollama_data:/root/.ollama
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: 1
              capabilities: [gpu]
```

```env
OLLAMA_BASE_URL=http://ollama:11434
```

### Database migrations

```bash
# First time
docker compose exec backend alembic upgrade head

# Create a new migration after model changes
docker compose exec backend alembic revision --autogenerate -m "description"
docker compose exec backend alembic upgrade head
```

### Logs

```bash
# All services
docker compose logs -f

# Backend only
docker compose logs -f backend

# Check GPU in Whisper/Kokoro
docker compose exec whisper nvidia-smi
```

### Image updates (Phase 2)

```bash
docker compose pull kokoro whisper
docker compose up -d kokoro whisper
```