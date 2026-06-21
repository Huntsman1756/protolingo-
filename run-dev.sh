#!/bin/bash
set -euo pipefail

if [ ! -f .env.dev ]; then
  cp .env.dev.example .env.dev
  echo "Created .env.dev from .env.dev.example. Review it if you need local defaults."
fi

# Sensitive vars read from macOS Keychain — never commit them to disk.
read_secret() {
  security find-generic-password -a "$1" -s freelingo -w 2>/dev/null || true
}

export NAN_API_KEY="${NAN_API_KEY:-$(read_secret nan)}"
export OPENAI_API_KEY="${OPENAI_API_KEY:-$(read_secret openai)}"
export POSTGRES_PASSWORD="${POSTGRES_PASSWORD:-$(read_secret postgres)}"
export REDIS_PASSWORD="${REDIS_PASSWORD:-$(read_secret redis)}"
export SECRET_KEY="${SECRET_KEY:-$(read_secret secretkey)}"

missing=false
for var in NAN_API_KEY POSTGRES_PASSWORD REDIS_PASSWORD SECRET_KEY; do
  eval "val=\$$var"
  if [ -z "$val" ]; then
    echo "MISSING: $var not found in Keychain."
    missing=true
  fi
done

if [ "$missing" = true ]; then
  echo ""
  echo "Save them first:"
  echo "  security add-generic-password -a nan       -s freelingo -w \"tu-nan-key\""
  echo "  security add-generic-password -a postgres  -s freelingo -w \"devpass\""
  echo "  security add-generic-password -a redis     -s freelingo -w \"devpass\""
  echo "  security add-generic-password -a secretkey -s freelingo -w \"\$(openssl rand -hex 32)\""
  exit 1
fi

docker compose -f docker-compose.dev.yml --env-file .env.dev up -d
