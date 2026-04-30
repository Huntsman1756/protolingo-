# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-04-30

### Added
- Docker Compose setup with PostgreSQL 16, Redis 7, backend, and frontend services
- `.env.example` with all configuration variables for phases 1–3
- FastAPI backend with async SQLAlchemy engine and asyncpg driver
- JWT access token (15 min, HS256) and opaque refresh token (30 days, httpOnly cookie) auth flow
- Refresh token rotation with replay detection via Redis
- User registration with optional single-use invite token support
- First registered user is automatically assigned the admin role when `FIRST_USER_IS_ADMIN=true`
- `ALLOW_REGISTRATION` flag to gate public signups
- Admin panel API: full user CRUD and single-use invite link generation (48 h TTL in Redis)
- LLM adapter singleton supporting Ollama, OpenAI, Anthropic, and DeepSeek providers
- LLM retry logic with exponential backoff and structured output with JSON fallback
- CEFR assessment: 20-question quiz generation and answer evaluation via LLM structured output
- Study plan generation from CEFR level and user goals, with active-plan management
- Lesson generation with multiple exercise types (MCQ, fill-in-the-blank, free-write)
- Free-write exercise evaluation with LLM-generated feedback and score
- Flashcard SM-2 spaced-repetition algorithm with quality score 0–5
- Flashcard generation via LLM with translations in the user's native language
- SSE streaming chat with progress-aware tutor system prompt and persistent history
- Chat history persisted in `chat_history` table, loaded per user (last 30 messages)
- Progress tracking: XP, streak, accuracy, skills breakdown, and 90-day history
- Alembic initial migration covering all Phase 1 models
- Next.js 14 App Router frontend with login, register, dashboard, assessment, chat, flashcards, lesson, settings, and admin pages
- Zustand stores for auth (access token, user) and progress (streak, XP, today's lessons)
- `apiFetch` utility with silent 401 → refresh → retry interceptor and redirect on failure
- Next.js middleware protecting all routes via `refresh_token` cookie check
- `CONTRIBUTING.md` with contribution workflow, coding standards, and test requirements
