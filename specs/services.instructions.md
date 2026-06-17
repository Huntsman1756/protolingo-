---
description: "Service layer reference for FreeLingo: 16 backend services covering LLM, TTS/STT, study plan, lessons, flashcards, listening, reading, memory, progress, quotas, subscriptions, and voice conversation pipeline."
applyTo: "backend/app/services/**, backend/app/core/app_logger.py"
---

# Service Layer — FreeLingo

All external dependencies are accessed through the service layer. The frontend never calls Ollama, Kokoro, or Whisper directly — the backend is the single gateway.

## LLM Adapter (`llm_adapter.py`)

Singleton providing provider-agnostic LLM access. Supports four providers selectable via `LLM_PROVIDER` env variable:

| Provider  | Client                         | Max tokens | Notes                                        |
| --------- | ------------------------------ | ---------- | -------------------------------------------- |
| ollama    | AsyncOpenAI (openai SDK)       | 8192       | Local, openai-compatible endpoint            |
| openai    | AsyncOpenAI                    | 128K       |                                              |
| deepseek  | AsyncOpenAI                    | 128K       | openai-compatible endpoint                   |
| anthropic | AsyncAnthropic (anthropic SDK) | 200K       | Separate code path; system message extracted |

**Key capabilities:**

- `chat(messages, stream=False)` — returns string or async generator
- `structured_output(messages, schema)` — returns validated Pydantic model (JSON mode + retry on parse failure)
- `parse_llm_json(raw)` — module-level utility; strips optional code fences and parses JSON from LLM output. Shared by `listening_service.py` and `reading_service.py`.
- 2 automatic retries with exponential backoff, 60 s timeout
- Custom exception hierarchy: `LLMError`, `LLMTimeoutError`, `LLMUnavailableError`, `LLMResponseError`, `LLMContextOverflowError`

## Assessment Service (`assessment.py`)

- Deterministic CEFR evaluation (no LLM): groups quiz answers by difficulty, finds highest level with >=2 questions and >=60% correct
- LLM-powered: free-write evaluation, end-of-level test generation (constrained to studied grammar/vocabulary)

## Study Plan Generator (`study_plan_generator.py`)

Fully deterministic — no LLM. Uses static curriculum data from `curriculum.py` to distribute units across weeks/days. The `distribute_units()` function maps curriculum units onto lesson slots based on duration and intensity, cycling lesson types (grammar → vocabulary → reading → writing → review). The last slot is always reserved for the end-of-level completion test.

## Lesson Generator (`lesson_generator.py`)

LLM-powered lesson content generation with strict constraints:

- Grammar constrained to a validated set of 24 grammar slugs
- CEFR level and target language adherence (`en-US` / `en-GB`; BCP-47 tag converted to english variant via `language_helpers.get_english_variant`)
- Generates 3-5 exercises per lesson (multiple_choice, fill_blank, free_write)
- Separately evaluates free_write answers and pronunciation (scored 0.0–1.0 with feedback)

## Flashcard SM-2 (`flashcard_sm2.py`)

Full SM-2 spaced repetition algorithm:

- `sm2_update(card, quality)`: modifies ease_factor, interval, repetitions, and next_review based on 0–5 quality rating
- LLM-powered `generate_flashcards`: creates flashcards with native-language translations; `native_language` is always sourced from the authenticated user's profile (not from the request body)

## Language Helpers (`language_helpers.py`)

Shared BCP-47 conversion utilities used across the service layer:

- `get_english_variant(target_language)` — converts `"en-US"` → `"american"`, `"en-GB"` → `"british"` for LLM prompts
- `get_iso639(target_language)` — strips region subtag: `"en-US"` → `"en"` for Whisper
- `voice_session_title(native_language)` — localised "Voice session — date" strings for all 9 supported languages

## Memory Service (`memory_service.py`)

Handles LLM-driven persistent context across conversations:

- `parse_memory_marker(text)` — extracts items from `<<MEMORY>>{"items":[...]}<<ENDMEMORY>>` blocks in LLM responses
- `strip_memory_marker(text)` — removes the marker block before the response reaches the user
- `build_memory_context(memories)` — formats up to 20 memories × 200 chars for injection into system prompts
- `save_memories(db, user_id, items, source)` — persists new items, skipping exact duplicates
- Zero-cost design: the LLM includes the marker in its normal response; no extra API calls needed.

## Progress Service (`progress_service.py`)

- Atomic daily progress updates: XP (20 per lesson, 5 per correct exercise, 1 per wrong, 2 per flashcard)
- Streak calculation: counts consecutive days with activity
- Skill scoring: 0.7/0.3 exponential moving average per skill
- Unit competency tracking: per-competency EMA, marked mastered at >=0.80

## TTS Service (`tts_service.py`)

Abstracts TTS behind a common `synthesise(text, voice) → bytes` interface. Provider selected via `TTS_PROVIDER`:

- **`local`**: HTTP client to Kokoro-FastAPI — `POST /v1/audio/speech`. Returns MP3 audio bytes.
- **`openai`**: OpenAI TTS API (`tts-1` model, configurable via `OPENAI_TTS_MODEL` / `OPENAI_TTS_VOICE`).

## STT Service (`stt_service.py`)

Abstracts STT behind a common `transcribe(audio_bytes, language) → str` interface. Provider selected via `STT_PROVIDER`:

- **`local`**: HTTP client to Whisper ASR — `POST /asr?output=json&language=<lang>&task=transcribe` (multipart). Uses `onerahmet/openai-whisper-asr-webservice` image (not OpenAI-compatible endpoint).
- **`openai`**: OpenAI Whisper API (`whisper-1` model, configurable via `OPENAI_STT_MODEL`).

## Logging & Observability (`core/app_logger.py`)

Backend modules now use a shared logging wrapper:

- `get_logger(__name__)` returns an `AppLogger` instance used across routers and services.
- `AppLogger` supports both styles:
  - classic stdlib-style messages with positional placeholders (`%s`)
  - event-style structured logs (`logger.info("event", key=value, ...)`)
- Effective verbosity is still controlled globally by `LOG_LEVEL` from `.env` (`DEBUG`, `INFO`, `WARNING`, `ERROR`) and configured in `main.py` via `logging.basicConfig(...)`.

For TTS diagnostics, `/api/tts` emits per-request trace and latency fields in logs and response headers so frontend, proxy, and backend timings can be correlated end-to-end.

The `language` parameter is derived dynamically from `target_language` via `language_helpers.get_iso639` (e.g. `"en-US"` → `"en"`).

## Email Service (`email_service.py`)

SMTP email dispatch via **fastapi-mail 1.4.1** (async, `aiosmtplib` backend). Only active when `EMAIL_ENABLED=true`.

- `send_verification_email(to, display_name, token, locale)` — sends a verification link valid 24 h.
- `send_reset_password_email(to, display_name, token, locale)` — sends a password-reset link valid 1 h.
- `send_contact_email(sender_email, subject, description)` — forwards a contact-form submission to `CONTACT_EMAIL`. Sets `Reply-To` to the sender's address. Raises on SMTP failure (the router converts this to HTTP 502).

Both `send_verification_email` and `send_reset_password_email` accept a `locale` parameter (BCP-47 language tag, e.g. `"es"`) and render fully translated email bodies using internal `_VERIFY_I18N` / `_RESET_I18N` dicts covering the 10 supported UI languages. HTML templates are in `backend/app/templates/email/`.

## Listening Service (`listening_service.py`)

Manages AI-generated listening exercises end-to-end (Phase 6):

- `get_available_exercise(level, target_language, user_id, db)` — returns the oldest unplayed exercise for the user's level/language, excluding already-attempted ones. Returns `None` if pool is empty.
- `generate_and_save_exercise(level, target_language, db, tts_service, storage_path)` — calls LLM (with one retry on malformed JSON), extracts topic + text + 5 questions, synthesises MP3 via TTS service, flushes to DB to get the ID, writes audio to `{storage_path}/listening/{id}.mp3`, then commits.
- `calculate_score(questions, answers) → (score, xp_earned)` — pure function, case-insensitive comparison, 10 XP per correct answer.
- `submit_attempt(exercise_id, user_id, answers, db)` — checks for duplicate (raises 409), calculates score, awards XP via Progress service, increments `play_count`.
- `get_user_history(user_id, db, skip, limit)` — JOIN query returning `(list[tuple[ListeningAttempt, ListeningExercise]], total)`.

**Exercise types by CEFR level** (`_TYPES_BY_LEVEL`):

| Level  | Types                              |
| ------ | ---------------------------------- |
| A1, A2 | `story`, `conversation`            |
| B1, B2 | `story`, `dialogue`, `interview`   |
| C1, C2 | `news_report`, `lecture`, `debate` |

## Reading Service (`reading_service.py`)

Manages AI-generated reading comprehension exercises end-to-end (Phase 7):

- `get_available_exercise(level, target_language, user_id, db)` — returns the oldest unread exercise for the user's level/language, excluding already-attempted ones. Returns `None` if pool is empty.
- `generate_and_save_exercise(level, target_language, db)` — calls LLM (with one retry on malformed JSON), extracts topic + text + 5 questions. No audio — text is served directly to the client.
- `calculate_score(questions, answers) → (score, xp_earned)` — pure function, case-insensitive option comparison, 10 XP per correct answer.
- `submit_attempt(exercise_id, user_id, answers, db)` — checks for duplicate (raises 409), calculates score, awards XP via Progress service, increments `view_count`.
- `get_user_history(user_id, db, skip, limit)` — JOIN query returning `(list[tuple[ReadingAttempt, ReadingExercise]], total)`.

**Exercise types by CEFR level** (`_TYPES_BY_LEVEL`):

| Level  | Types                                    |
| ------ | ---------------------------------------- |
| A1, A2 | `notice`, `email`                        |
| B1     | `email`, `article`, `news`               |
| B2     | `article`, `news`, `blog_post`, `review` |
| C1     | `news`, `blog_post`, `review`, `essay`   |
| C2     | `review`, `essay`                        |

## Quota Service (`quota_service.py`)

Enforces per-user voice conversation quotas stored on the `users` table:

- `conversation_daily_minutes`: max minutes of voice conversation per calendar day.
- `conversation_weekly_minutes`: max minutes per calendar week (Mon–Sun).
- `conversation_weekly_sessions`: session count for the current week.

Called by the conversation router before opening a WebSocket session.

## Subscription Service (`subscription_service.py`)

Single source of truth for subscription-based access control (Phase 5):

- `is_subscribed(user, stripe_enabled) → bool` — returns `True` unconditionally when `stripe_enabled=False` (self-hosted mode, default); otherwise requires `subscription_status` to be `"trialing"` or `"active"`.
- `apply_subscription_quotas(user, db)` — resets conversation and token quotas to defaults when a subscription becomes active or enters trial.

Used by `require_subscription` in `core/deps.py`, which gates all chat, listening, reading, conversation, and memory endpoints.

## Conversation Pipeline (`conversation_pipeline.py`)

WebSocket-based voice conversation orchestrator:

1. Starts the initial greeting as a cancellable task, then immediately enters the WebSocket receive loop.
2. Receives audio chunks from client (WebSocket binary frames) and resets inactivity state.
3. Barge-in protocol: explicit interrupts or new audio while a backend task is active can cancel the current greeting or LLM+TTS generation and send `barge_in` to the client. The current frontend disables automatic barge-in during assistant playback for stability.
4. Sends audio to STT service for transcription; empty/whitespace transcriptions are ignored and do not call the LLM.
5. Builds prompt with system message + last 20 message history.
6. Collects the LLM response, strips memory markers, and validates the speech text.
7. Synthesizes the complete assistant response through TTS.
8. Sends the MP3 binary frame to the client before publishing the assistant transcript, so the UI never shows a tutor text without an associated audio frame.
9. Emits the final assistant transcript, `status=listening`, and `turn_complete` only after successful audio generation/send.
10. Serializes all WebSocket writes through one send lock so audio, transcript/status messages, timeout watchers, and close frames do not race.
11. Timeout watchers: max duration (default 30 min) and inactivity (default 3 min) with 60 s warnings.
