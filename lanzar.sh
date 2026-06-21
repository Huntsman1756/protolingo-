#!/bin/bash
# lanzar FreeLingo — desarrollo local con Docker (hot reload)
# Frontend en http://localhost:48888 · Backend en http://localhost:8000
PROJECT="$HOME/Documents/GitHub/freelingo"
cd "$PROJECT"
exec docker compose -f docker-compose.dev.yml --env-file .env.dev up -d --build