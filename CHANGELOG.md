# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.4] - 2026-05-03

### Security
- Rate limit 5/min added to `POST /api/auth/register` to prevent account enumeration and resource abuse (A-01)
- WebSocket authentication token now sent as first JSON message after `accept()` instead of as URL query parameter, preventing token exposure in server logs and browser history (A-02)
- Audio uploads to STT endpoint capped at 50 MB; requests exceeding the limit return HTTP 413 (A-03)
- `max_length=5000` enforced on TTS text and chat message fields via Pydantic (A-04)
- `RATE_LIMIT_STORAGE=redis` set as default in `docker-compose.yml` and `.env.example` so rate limit counters are shared across workers in production (M-01)
- `Content-Security-Policy: default-src 'self'; object-src 'none'; base-uri 'self'` header added to backend middleware and Next.js config (M-02)
- `PATCH /api/auth/me` now returns HTTP 409 instead of 500 when the requested email is already used by another account (M-03)
- `AdminUserCreate` schema validates email with `EmailStr` and restricts `native_language` to the `SUPPORTED_LANGUAGES` whitelist (M-04)
- Assessment quiz sessions migrated from in-process dict (`_sessions`) to Redis with 30-minute TTL, fixing multi-worker inconsistency and memory leak (M-05)
- Rate limit 20/min added to `POST /api/auth/refresh` (M-06)
- `GET /api/admin/users` supports `skip`/`limit` pagination (default 20/page) with `total` count; frontend renders Previous/Next controls (M-07)
- Rate limiter `key_func` updated to read `X-Real-IP` header set by nginx before falling back to socket address, ensuring per-client limits work correctly behind a reverse proxy (B-01)
- `correct_answer` and `correct` fields stripped from assessment quiz responses before sending to the client (B-03)
- `bcrypt` version constraint relaxed to `>=4.0.0` (removed `<4.0.0` upper bound) to allow security patches in future major versions (B-04)
- CORS `allow_methods` restricted to explicit list (`GET POST PUT PATCH DELETE OPTIONS`) instead of `"*"` (I-04)

### Added
- Pagination controls (Previous / Next) on the admin users page
- `prevPage` and `nextPage` i18n keys added to all six translation files (en, es, fr, pt, de, it)
- `PaginatedAdminUsersResponse` schema with `items`, `total`, `skip`, `limit` fields

### Fixed
- `RATE_LIMIT_ENABLED=false` set in test conftest so rate limits do not interfere with integration tests running under the same IP
- `test_list_users_as_admin` updated to assert on paginated response shape (`items`, `total`) instead of a flat list

## [1.2.3] - 2026-05-03

### Fixed
- WebSocket URL now always derived from `window.location` (same-origin) — `NEXT_PUBLIC_API_URL` removed from CI build args, Dockerfile, and `next.config.ts`; the variable was being baked into the public Docker image with a private domain, breaking WebSocket connections for all external users
- `NEXT_PUBLIC_API_URL` removed from `.env.example` — it is no longer a configurable variable

## [1.2.2] - 2026-05-03

### Added
- Author section in Settings page (between Appearance and Logout) showing "Arturo Carretero Calvo" with GitHub link to `github.com/artcc`
- Version display (`v1.2.2`) in sidebar (desktop + mobile) above the logout button
- `specs/version.md` — canonical version file with sync rules (must match CHANGELOG and sidebar)
- `specs/version.md` listed in AGENTS.md spec files table

### Changed
- All spec files in `specs/` rewritten as proper specifications — removed embedded implementation code (~60-70% reduction), corrected outdated information, and aligned with the actual v1.2.1 codebase
- `AGENTS.md`: removed "Planning stage — zero source code", updated to reflect v1.2.1 with all phases complete, Next.js 16, Python 3.12, simplified TTS/STT section
- `architecture.instructions.md`: complete rewrite — lists all 9 models (was 6), all 11 routers (was 9), all 9 services, all endpoints, correct STT API (`/asr` not OpenAI), environment variables
- `roadmap.instructions.md`: all phases marked as ✅ Complete (Phase 1, 1+, 2, 3 were all frozen as ⬜ Planned), updated Phase 3 milestones to include structured logging
- `phase-1-platform.instructions.md`: rewritten from 880 to ~280 lines — removed all Python/TypeScript implementation code, kept architectural description and design decisions
- `phase-1-plus.instructions.md`: rewritten from 1082 to ~300 lines — removed ~600 lines of embedded grammar/vocabulary data code, kept data model descriptions
- `phase-2-tts-stt.instructions.md`: corrected STT endpoint to `POST /asr?output=json&language=en&task=transcribe` (was wrong OpenAI API), default model to `large-v3-turbo`, added `STT_ENGINE` variable, removed all implementation code
- `phase-3-conversation.instructions.md`: corrected VAD library to `@ricky0123/vad-react` (was `vad-web`), corrected COOP/COEP headers (were documented as "not needed" but are actually required), added structured logging and `LOG_LEVEL`, removed all implementation code
- `docker.instructions.md`: uncommented kokoro/whisper services, corrected STT endpoint, added `LOG_LEVEL`, `STT_ENGINE`, `COOKIE_SECURE` to .env example, removed "no Docker locally" contradiction
- `testing.instructions.md`: removed Docker commands (no Docker locally), documented SQLite in-memory DB for tests (not PostgreSQL), updated test file list to match actual 10 test files, marked frontend/E2E tests as "pending"
- `llm-error-handling.instructions.md` and `rate-limiting.instructions.md`: removed all implementation code blocks, kept strategy descriptions, error taxonomies, and HTTP status mappings

## [1.2.1] - 2026-05-02

### Added
- Structured logging across the voice conversation pipeline (`[conversation]`, `[pipeline]`, `[stt]` prefixes) at INFO / DEBUG / ERROR levels
- `LOG_LEVEL` configuration variable (default `INFO`) in `config.py`, `docker-compose.yml`, and `.env.example`; applied via `logging.basicConfig` at startup
- `STT_ENGINE` variable in `.env.example` and `docker-compose.yml` (`${STT_ENGINE:-faster_whisper}`) so the Whisper inference engine is configurable without editing the compose file
- TTS voice reference table and STT model/engine reference table added to README

### Changed
- `STT_MODEL` in `docker-compose.yml` now reads from `.env` via `${STT_MODEL:-large-v3-turbo}` instead of being hardcoded
- Default STT model upgraded from `tiny.en` / `medium` to `large-v3-turbo` — best speed/accuracy ratio on GPU (≥6 GB VRAM), ~8× faster than `large-v3` with near-identical accuracy
- Conversation system prompt: added explicit prohibition on emojis and emoticons (same rule as chat tutor — TTS reads them aloud)
- README "Enabling TTS & STT" notes updated to reflect that `STT_MODEL` and `STT_ENGINE` are now controlled from `.env`

## [1.2.0] - 2026-05-02

### Added
- Phase 3 voice conversation mode: WebSocket pipeline orchestrating VAD → STT → LLM → TTS with barge-in support and gapless audio streaming
- `ConversationMode` frontend component (dynamic, SSR disabled) using `@ricky0123/vad-react` for in-browser voice activity detection
- COOP + COEP headers globally in Next.js config (`same-origin` / `credentialless`) to enable `SharedArrayBuffer` required by onnxruntime-web 1.25.1 threaded WASM
- `copy-vad-models.js` postinstall script copies ORT WASM + VAD model files (`.wasm` and `.mjs`) to `public/vad/`; re-run in Docker builder stage after `COPY frontend/` to preserve generated files
- `NEXT_PUBLIC_API_URL` passed as Docker build ARG and baked at `next build` so WebSocket connections resolve correctly on separate-subdomain deployments
- `NEXT_PUBLIC_API_URL` CI secret wired into GitHub Actions `docker-publish.yml` frontend build step
- Session timeout watchers: configurable `CONVERSATION_MAX_DURATION` and `CONVERSATION_INACTIVITY_TIMEOUT` per user, with 60 s warning messages before disconnect
- Structured logging across the voice conversation pipeline (`[conversation]`, `[pipeline]`, `[stt]` prefixes) at INFO / DEBUG / ERROR levels
- `LOG_LEVEL` configuration variable (default `INFO`) in `config.py`, `.env.example`, and `docker-compose.yml`; applied via `logging.basicConfig` at startup

### Changed
- `STTService` endpoint corrected from `/v1/audio/transcriptions` (OpenAI API, unsupported) to `POST /asr?output=json&language=en&task=transcribe` with `audio_file` form field, matching the actual `onerahmet/openai-whisper-asr-webservice` API
- Conversation system prompt: added explicit prohibition on emojis and emoticons (same rule as chat tutor — TTS reads them aloud)
- `ConversationPipeline.run()` loop now catches `RuntimeError` from `ws.receive()` on client disconnect (triggered when the frontend auto-closes the WS after receiving an error message)
- Settings page section order: Perfil → Conversación → Apariencia → Cerrar sesión

## [1.1.1] - 2026-05-02

### Added
- Theme mode selector in Settings: three explicit options — Auto (system), Dark, Light — replacing the previous toggle; Auto is the default and follows the OS `prefers-color-scheme` preference in real time

### Fixed
- Chat tutor system prompt: added instruction to never use emojis or emoticons (TTS reads them aloud)
- Chat sidebar on mobile and narrow viewports: sidebar now hidden by default on screens below `md` breakpoint; opens as a fixed overlay with a semi-transparent backdrop instead of a side-by-side column, preventing the chat area from becoming unusably narrow

## [1.1.0] - 2026-05-02

### Added
- TTS (Kokoro-FastAPI) integration: `AudioPlayer` component reads flashcard words, lesson exercise sentences, correct answers, and tutor chat responses aloud
- STT (faster-whisper) integration: `VoiceRecorder` component allows dictating answers in flashcards and lesson exercises
- `POST /api/tts` backend proxy to Kokoro-FastAPI service (returns `audio/mpeg`)
- `POST /api/stt` backend proxy to faster-whisper service (returns transcription text)
- `TTS_ENABLED` and `STT_ENABLED` feature flags in `.env` — both services are disabled by default
- Kokoro and Whisper services defined in `docker-compose.yml` with NVIDIA GPU `deploy` block
- Custom `docker/kokoro.Dockerfile` upgrading PyTorch to 2.7+ (cu128) for Blackwell GPU support (RTX 5000 series, sm_120), compatible with all previous NVIDIA architectures (sm_50+)
- `docker-compose.yml` updated to use fork image `ghcr.io/artcc/kokoro-fastapi-gpu` with full Blackwell support
- `AudioPlayer` added to tutor chat messages — button appears after streaming completes

### Fixed
- Kokoro container crash on NVIDIA Blackwell GPUs (`CUDA error: no kernel image is available`) caused by PyTorch ≤ 2.5 lacking sm_120 support

## [1.0.0] - 2026-05-01

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
- Grammar Reference hub: searchable index page with CEFR-level grouping and category filters
- Grammar topic detail pages with structure formula, key rules, examples, common mistakes, and related topics
- Vocabulary Hub: level-filtered word set index with word count per set
- Vocabulary set detail pages with IPA, POS, definitions, examples, and "Add All to Flashcards" bulk action
- Phrasebook with level and register (formal / neutral / informal) filters and one-click clipboard copy
- Skills Tracker page showing XP, streak, accuracy stats, per-unit competency checklist, and skill accuracy bars
- Level Completion Test: LLM-generated adaptive quiz per study-plan unit, with skill breakdown and level recommendation on completion
- `grammar_refs` field on lesson content, populated by LLM and validated against 24 known CEFR grammar slugs
- Related Grammar section on lesson pages linking to Grammar Reference topic detail pages
- `GET /api/progress/competencies` endpoint returning per-unit competency scores for the active study plan
- Unit competency upsert endpoint and `unit_competencies` table migration
- Sidebar navigation reorganised into MAIN and collapsible RESOURCES groups (desktop and mobile)
- i18n infrastructure via `next-intl` v4: cookie-based locale (`NEXT_LOCALE`) derived from `native_language`, no URL routing changes
- Translation files for 6 locales: `en`, `es`, `fr`, `pt`, `de`, `it` under `messages/` with 16 namespaces (common, nav, auth, settings, dashboard, assessment, plan, lesson, flashcards, chat, progress, grammar, vocabulary, phrasebook, admin, errors)
- `src/i18n/request.ts` server-side locale resolver reading `NEXT_LOCALE` cookie
- `NextIntlClientProvider` wrapping the root layout to hydrate all client components
- `english_variant` preference (`american` / `british`) on the User model, surfaced in Settings with flag selector
- `english_variant` propagated to lesson generator, flashcard generator, and chat tutor system prompt
- Alembic migration `0005_english_variant` adding `english_variant VARCHAR(10) NOT NULL DEFAULT 'american'`
- Amber accent colour design token (`--fl-accent: #C9943A` dark / `#B07E28` light) applied to all CTA buttons, selected states, nav active indicators, and progress bars

### Fixed
- Alembic migration chain broken by mismatched revision IDs in `0004_lesson_unit_id` (`"0003"` → `"0003_curriculum_studyplan"`)
- Backend container no longer requires a manual `alembic upgrade head` step — migrations run automatically in the container `command`