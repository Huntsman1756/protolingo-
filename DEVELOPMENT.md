# Development

## Requirements

- [OrbStack](https://orbstack.dev/) or [Colima](https://github.com/abiosoft/colima) + Docker CLI
- Node.js and Python are **not** required locally — everything runs in containers

## Setup (one time)

### 0. Create the local development env file

```bash
cp .env.dev.example .env.dev
```

Fill in only non-secret local defaults in `.env.dev`. Keep real secrets out of Git and provide them via macOS Keychain or your shell environment. `.env.dev` is intentionally ignored by Git.

### 1. Store secrets in macOS Keychain

```bash
security add-generic-password -a nan       -s freelingo -w "your-nan-key"
security add-generic-password -a openai    -s freelingo -w "sk-your-key"
security add-generic-password -a postgres  -s freelingo -w "devpass"
security add-generic-password -a redis     -s freelingo -w "devpass"
security add-generic-password -a secretkey -s freelingo -w "$(openssl rand -hex 32)"
```

### 2. Start the stack

```bash
./run-dev.sh
```

This launches 4 containers with hot-reload:

| Service    | URL                    | Source mounted |
|------------|------------------------|----------------|
| Frontend   | http://localhost:48888 | `./frontend`   |
| Backend    | http://localhost:8000  | `./backend`    |
| PostgreSQL | `localhost:5432`       | —              |
| Redis      | `localhost:6379`       | —              |

## How it works

- `run-dev.sh` reads secrets from Keychain, exports them as env vars, and runs `docker compose -f docker-compose.dev.yml --env-file .env.dev up -d`
- `.env.dev` holds non-sensitive config (LLM provider, TTS/STT mode, etc.). Secret values are left empty — the script or shell environment provides them at runtime.
- `docker-compose.dev.yml` builds backend and frontend locally with development Dockerfiles and mounts source code as volumes. Backend uses `uvicorn --reload`, frontend uses `npm run dev`.
- The frontend keeps its own `frontend/messages` JSON bundle copy so Next.js/Turbopack resolves i18n files inside `/app` in both host and Docker development.
- `./data/` stores PostgreSQL and Redis data persistently across restarts.

## TTS / STT

Both can be set to `nan` or `openai` in `.env.dev`. When using hosted providers, no Kokoro or Whisper containers are needed.

## Stopping

```bash
docker compose -f docker-compose.dev.yml down
```
