---
description: "Complete API reference for FreeLingo: all REST endpoints and the WebSocket voice conversation endpoint, grouped by router."
applyTo: "backend/**"
---

# API Endpoints — FreeLingo

All REST endpoints are prefixed under `/api`. The WebSocket endpoint is at `/ws/conversation`.

---

## Auth — `/api/auth`

| Method | Path | Rate limit | Description |
|--------|------|------------|-------------|
| POST | `/register` | 5/min (+ invite-gated) | Creates account (respects `ALLOW_REGISTRATION`, invite token, and `BLOCKED_EMAIL_DOMAINS`). Password policy: 10–25 chars, at least one uppercase letter, one number, and one symbol. Returns `access_token` + sets httpOnly refresh cookie — no separate login step needed. Rejects blocked domains or invalid password with HTTP 422. |
| POST | `/login` | 10/min | Returns access_token (JWT, 15 min) + refresh_token in httpOnly cookie (30 days) |
| POST | `/refresh` | 20/min | Rotates refresh token, returns new access_token |
| POST | `/logout` | None | Deletes refresh token from Redis, clears cookie |
| GET | `/me` | None | Returns authenticated user profile |
| PATCH | `/me` | None | Updates display_name, email, password, target_language, conversation settings |
| POST | `/me/avatar` | None | Uploads profile avatar (JPEG/PNG, max 2 MB). Stores as base64 data URL on the user record. |
| DELETE | `/me/avatar` | None | Removes profile avatar (sets to null) |
| DELETE | `/me` | None | Deletes own account and all associated data (CASCADE). Forbidden for admin accounts. |
| GET | `/quota` | None | Returns live conversation quota status for the authenticated user (sessions this week, minutes today, minutes this week) |
| GET | `/verify-email` | None | Verifies email via one-time token (query param `token`, TTL 24h in Redis) |
| POST | `/resend-verification` | 3/min | Sends a new verification email to the authenticated user |
| POST | `/forgot-password` | 5/min | Sends password reset link to the given email. Always returns 200 (anti-enumeration). |
| POST | `/reset-password` | 5/min | Resets password using one-time token (TTL 1h in Redis) |

---

## Admin — `/api/admin`

Requires `role="admin"`. All endpoints return 403 for non-admin users.

| Method | Path | Description |
|--------|------|-------------|
| GET | `/users` | Lists users (paginated). Query params: `skip` (default 0), `limit` (default 20, max 100), `q` (search by username or email). Returns `{items, total, skip, limit}`. |
| POST | `/users` | Creates user directly (bypasses `ALLOW_REGISTRATION`) — sends verification email if `EMAIL_ENABLED=true` |
| GET | `/users/{id}` | User detail |
| PATCH | `/users/{id}` | Edit role, is_active, is_verified, display_name, conversation quotas |
| DELETE | `/users/{id}` | Deletes account and all associated data (CASCADE) |
| GET | `/users/{id}/stats` | Usage statistics: XP, streak, lessons, exercises, tokens |
| GET | `/users/{id}/quota` | Live quota status from Redis (sessions this week, minutes today, minutes this week) |
| POST | `/invite` | Generates single-use invite link (48h Redis TTL) |
| GET | `/maintenance` | Returns `{"maintenance_mode": bool}` — current maintenance mode state |
| PATCH | `/maintenance` | Toggles maintenance mode on/off in Redis. Returns `{"maintenance_mode": bool}` |

---

## Assessment — `/api/assessment`

3-step onboarding flow plus end-of-level testing.

| Method | Path | Description |
|--------|------|-------------|
| GET | `/start` | Begins adaptive quiz (LLM-generated questions, static fallback) |
| POST | `/submit` | Legacy: submits answers for CEFR evaluation |
| POST | `/evaluate` | Deterministic CEFR evaluation (no LLM — groups by difficulty) |
| POST | `/free-write` | Evaluates free-write text for CEFR placement (LLM) |
| POST | `/complete` | Persists results, creates StudyPlan |
| GET | `/level-test/questions/{plan_id}` | Generates 20-question level test (LLM, constrained to studied content) |
| POST | `/level-test/submit` | Submits level test answers → score + recommendation |
| GET | `/level-test/result/{plan_id}` | Returns test result and recommendation (`"advance"`, `"extend"`, or `"repeat"`) |

---

## Study Plan — `/api/study-plan`

| Method | Path | Description |
|--------|------|-------------|
| GET | `/current` | User's active plan with curriculum progress |
| POST | `/generate` | Creates new plan from CEFR level, goals, and duration |
| GET | `/today` | Today's lessons; auto-generates missing content via LLM on first access; auto-advances `progress_day` when all lessons for the current day are complete. Returns `plan_id`, `cefr_level`, `lessons`, `progress_day`, `total_days`, `pending_count`. |
| POST | `/skip-day` | Increments `progress_day` by 1 (capped at `total_days`). Returns `{progress_day, total_days}`. |
| GET | `/pending-lessons` | Returns incomplete lessons from days before `progress_day` (generated but not completed). |

---

## Lessons — `/api/lessons`

| Method | Path | Description |
|--------|------|-------------|
| GET | `/{lesson_id}` | Lesson detail with exercises |
| POST | `/{lesson_id}/start` | Marks lesson as in-progress |
| POST | `/{lesson_id}/complete` | Marks as completed, updates progress and competencies |
| POST | `/exercises/{id}/answer` | Submits answer → evaluates (MC, fill, free_write, pronunciation) → returns score + feedback |

---

## Flashcards — `/api/flashcards`

| Method | Path | Description |
|--------|------|-------------|
| GET | `/due` | Cards pending review today (SM-2 ordering) |
| GET | `/all` | All user's flashcards |
| POST | `/` | Creates flashcard manually |
| POST | `/{card_id}/review` | Records SM-2 review (quality 0–5) |
| POST | `/generate` | Generates N flashcards via LLM with native-language translations |

---

## Chat — `/api/chat`

| Method | Path | Description |
|--------|------|-------------|
| GET | `/conversations` | Lists user's conversations (text + voice), ordered by `updated_at` desc. Response includes `source` (`chat` or `voice`). |
| POST | `/conversations` | Creates new conversation |
| DELETE | `/conversations/{id}` | Deletes conversation and its messages (CASCADE) |
| GET | `/conversations/{id}/messages` | Returns messages for a conversation |
| POST | `/` | Sends message → streams AI tutor response (SSE) |
| GET | `/history` | All chat history (legacy) |

---

## Progress — `/api/progress`

| Method | Path | Description |
|--------|------|-------------|
| GET | `/summary` | Streak, XP, skills breakdown |
| GET | `/history` | Daily progress for last 90 days |
| GET | `/competencies` | Per-unit competency scores and mastery status |

---

## TTS — `/api/tts`

| Method | Path | Rate limit | Description |
|--------|------|------------|-------------|
| POST | `/tts` | 20/min | Text → MP3 audio. Uses Kokoro TTS (local) or OpenAI TTS, controlled by `TTS_PROVIDER`. Supports optional trace correlation via request header `X-TTS-Trace-ID`. Returns diagnostic headers: `X-TTS-Trace-ID`, `X-TTS-Backend-Synth-Ms`, `X-TTS-Backend-Total-Ms` (and, when passing through the Next.js proxy, `X-TTS-Proxy-Fetch-Ms`, `X-TTS-Proxy-Buffer-Ms`, `X-TTS-Proxy-Total-Ms`). |

---

## STT — `/api/stt`

| Method | Path | Rate limit | Description |
|--------|------|------------|-------------|
| POST | `/stt` | 20/min | Audio → transcribed text. Uses faster-whisper (local) or OpenAI Whisper, controlled by `STT_PROVIDER`. |

---

## Contact — `/api/contact`

| Method | Path | Rate limit | Description |
|--------|------|------------|-------------|
| POST | `/contact` | 5/hour | Submits a contact form. Body: `{ email, subject, description }`. Forwards the message to `CONTACT_EMAIL` via SMTP. Returns 204 on success, 502 if email sending fails. No auth required. |

---

## WebSocket — `/ws/conversation`

Full-duplex voice conversation pipeline.

**Authentication**: After the WebSocket handshake is accepted, the client must send a JSON message `{"type": "auth", "token": "<access_token>"}` within 10 seconds. If missing, malformed, or invalid, the server closes the connection with code 1008.

**Message flow**: Client sends audio chunks → STT transcription → LLM generates response (streamed) → sentence-level TTS → MP3 audio chunks returned.

**Client → Server message types:**

| Type | Payload | Description |
|------|---------|-------------|
| `auth` | `{"token": "<jwt>"}` | First message — authenticates the session |
| binary frame | raw audio bytes | WAV audio chunk from VAD |

**Server → Client message types:**

| Type | Payload | Description |
|------|---------|-------------|
| `transcript` | `{"text": "..."}` | STT result for the user's speech |
| `text_chunk` | `{"text": "..."}` | Streamed LLM response fragment |
| `audio_chunk` | binary | MP3 audio for a TTS sentence |
| `timeout_warning` | `{"seconds_remaining": N, "type": "inactivity"|"max_duration"}` | Timeout warning at 60 s |
| `session_end` | `{"reason": "..."}` | Session closed by server |

**Features:**
- **Barge-in**: new audio input cancels ongoing TTS playback
- **VAD**: browser-level voice activity detection (`@ricky0123/vad-react` + onnxruntime-web threaded WASM)
- **Gapless playback**: `AudioQueue` schedules consecutive `AudioBufferSourceNode`s
- **Session timeouts**: max duration (default 30 min) and inactivity (default 3 min), each with 60 s warning
- **In-memory history**: last 20 messages kept for LLM context during session (not persisted to DB)
- **Warmup**: `POST /api/conversation/warmup` pre-heats TTS and STT models before opening the WebSocket

---

## Listening — `/api/listening`

All endpoints require `require_subscription` (or `get_current_user` where noted). Audio file path is built from the integer exercise ID — never from a DB string — to prevent path traversal.

| Method | Path | Rate limit | Auth | Description |
|--------|------|------------|------|-------------|
| GET | `/next` | 10/min | require_subscription | Returns the oldest unplayed `ListeningExercise` for the user's current CEFR level and target language (questions included, **text and correct answers omitted**). Returns `{"available": false, "generating": false}` when the pool is empty, or `{"available": false, "generating": true}` while generation is in progress (Redis lock held). |
| POST | `/generate` | 5/min | require_subscription | Acquires a per-(level, language) Redis lock (`nx=True, ex=60`) and enqueues a `BackgroundTask` that calls LLM + TTS, saves the exercise and MP3. Returns HTTP 202. Returns 409 if a generation job is already running. |
| GET | `/audio/{exercise_id}` | 60/min | get_current_user | Serves the MP3 for the given exercise as a `FileResponse` (`audio/mpeg`). Returns 404 if the exercise or its audio file does not exist. |
| POST | `/attempt` | 20/min | require_subscription | Submits answers (`{exercise_id, answers: [str]}`) for scoring. Returns score (0–5), XP earned (0–50), correct answers, and the full transcript. Returns 404 (exercise not found), 409 (already attempted), 400 (wrong number of answers). |
| GET | `/history` | 30/min | get_current_user | Returns paginated list of the user's past attempts with scores, XP, and transcripts. Query params: `skip` (default 0), `limit` (default 10, max 50). |

## Reading — `/api/reading`

All endpoints require `require_subscription` (or `get_current_user` where noted). Unlike Listening, exercise text is included in the exercise response — there is no audio endpoint and no transcript reveal on submit.

| Method | Path | Rate limit | Auth | Description |
|--------|------|------------|------|-------------|
| GET | `/next` | 10/min | require_subscription | Returns the oldest uncompleted `ReadingExercise` for the user's current CEFR level and target language. **Text and questions are included immediately.** Returns `{"available": false}` when the pool is empty. Supports `?wait=true` for long-polling (max 90 s) while generation is in progress. |
| POST | `/generate` | 5/min | require_subscription | Acquires a per-(level, language) Redis lock (`nx=True, ex=60`) and enqueues a `BackgroundTask` that calls LLM and saves the exercise. Returns HTTP 202 with `{"status": "generating"}`. Returns 202 (no-op) if a generation job is already running. |
| POST | `/attempt` | 20/min | require_subscription | Submits answers (`{exercise_id, answers: dict[str,str], replay: bool}`) for scoring. Returns score (0–5), XP earned (0–50), and correct answers. Returns 404 (exercise not found), 409 (already attempted), 400 (wrong number of answers). |
| GET | `/history` | 30/min | get_current_user | Returns paginated list of the user's past attempts with scores, XP, exercise text, and correct answers. Query params: `skip` (default 0), `limit` (default 10, max 50). |

---

## Feedback — `/api/feedback`

All endpoints require `get_current_user`. Status update requires `require_admin`.

| Method | Path | Rate limit | Auth | Description |
|--------|------|------------|------|-------------|
| GET | `` | 60/min | get_current_user | Returns paginated list of feedback entries. Query params: `type` (`feature`\|`bug`), `status` (`pending`\|`planned`\|`in_progress`\|`done`\|`declined`), `sort` (`votes`\|`date`, default `votes`), `order` (`asc`\|`desc`, default `desc`), `skip` (default 0), `limit` (default 20, max 100). Response: `{items, total, skip, limit}`. Each item includes `voted_by_me` and `comment_count` fields injected server-side. |
| POST | `` | 10/hour | get_current_user | Creates a new feature request or bug report. Body: `{type, title, description}`. Returns HTTP 201 + the created entry. |
| GET | `/{id}` | 60/min | get_current_user | Returns a single entry with its full comment thread ordered by `created_at ASC`. |
| DELETE | `/{id}` | 20/min | get_current_user | Deletes an entry. Author can delete their own; admin can delete any. Cascade-deletes all votes and comments. Returns HTTP 204. |
| POST | `/{id}/vote` | 30/min | get_current_user | Toggles the authenticated user's vote on a feature request. Returns `{voted: bool, vote_count: int}`. Returns 400 if entry type is `bug`. |
| PATCH | `/{id}/status` | 30/min | require_admin | Updates the entry status. Body: `{status}`. Valid values: `pending`, `planned`, `in_progress`, `done`, `declined`. Returns the updated entry. |
| GET | `/{id}/comments` | 60/min | get_current_user | Returns all comments for an entry ordered by date ASC. Response: `{items, total}`. |
| POST | `/{id}/comments` | 20/hour | get_current_user | Adds a comment to an entry. Body: `{body}` (max 2000 chars). Returns HTTP 201 + the created comment. |
| DELETE | `/{id}/comments/{cid}` | 20/min | get_current_user | Deletes a comment. Author can delete their own; admin can delete any. Returns HTTP 204. |

## Memories — `/api/memories`

All endpoints require `require_subscription`.

| Method | Path | Rate limit | Auth | Description |
|--------|------|------------|------|-------------|
| GET | `` | 30/min | require_subscription | Returns all memories for the authenticated user. Response: `{memories: [{id, content, source, created_at}]}`. |
| DELETE | `/{id}` | 30/min | require_subscription | Deletes a single memory by ID. Returns HTTP 204. Returns 404 if not found or not owned by the user. |
| DELETE | `` | 10/min | require_subscription | Clears all memories for the authenticated user. Response: `{deleted: int}`. |