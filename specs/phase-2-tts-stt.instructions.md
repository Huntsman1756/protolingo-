---
description: "Phase 2 specification for FreeLingo: local TTS (Kokoro-FastAPI) and STT (faster-whisper) integration with pronunciation exercises, flashcard speaking mode, and frontend audio components."
---

# Phase 2 — Local TTS and STT

## Objective

Add fully local voice synthesis (TTS) and speech recognition (STT) with no external API dependencies. Users can listen to natural-sounding English pronunciation and practice speaking by recording their voice — all processed by self-hosted Docker services behind backend proxies.

---

## Service architecture

```
Browser                          Backend                      Docker services
┌──────────┐    HTTP    ┌──────────────────────┐   HTTP    ┌───────────────┐
│AudioPlayer│ ────────→ │ POST /api/tts        │ ────────→ │ Kokoro-FastAPI│
│          │ ←──────── │ (audio/mpeg binary)   │ ←──────── │ :8880         │
└──────────┘            │                      │           └───────────────┘
                        │ apps/core/tts_service│
┌──────────┐    HTTP    │                      │   HTTP    ┌───────────────┐
│VoiceRec- │ ────────→ │ POST /api/stt        │ ────────→ │ Whisper ASR   │
│ order    │ ←──────── │ (multipart/form-data) │ ←──────── │ :9000         │
└──────────┘            └──────────────────────┘           └───────────────┘
```

The backend acts as the sole gateway — the frontend never calls Kokoro or Whisper directly. Both services are disabled at the application level by default (`TTS_ENABLED=false`, `STT_ENABLED=false`) and must be explicitly enabled in `.env`.

---

## TTS Service — Kokoro-FastAPI

### Docker service

- **Image**: `ghcr.io/remsky/kokoro-fastapi-gpu:latest` (default, CUDA GPU)
- **CPU image**: `ghcr.io/remsky/kokoro-fastapi-cpu:latest` (remove `deploy` block for CPU hosts)
- **API**: OpenAI TTS-compatible (`POST /v1/audio/speech`)
- **Parameters**: `model`, `input` (text), `voice`, `response_format` (mp3)
- **Available voices**: `af_heart`, `af_sky`, `bf_emma`, `bm_george`, and others
- **Audio format**: MP3 return
- **Performance**: GPU strongly recommended; CPU fallback works but with significant speed degradation

### Backend integration (`app/services/tts_service.py`)

The `TTSService` class wraps the Kokoro HTTP API:

- `synthesize(text, voice)` → returns raw MP3 bytes
- HTTP POST to `{base_url}/v1/audio/speech` with JSON body
- 30-second timeout
- Raises on non-2xx responses

### Backend router (`app/routers/tts.py`)

- **Endpoint**: `POST /api/tts`
- **Rate limit**: 20 requests/minute
- **Request**: `{ "text": string, "voice": string? }`
- **Response**: `audio/mpeg` binary content
- **Auth**: Requires valid access token
- **Guard**: Returns 503 if `TTS_ENABLED=false`

---

## STT Service — Whisper ASR

### Docker service

- **Image**: `onerahmet/openai-whisper-asr-webservice:latest-gpu` (default, CUDA GPU)
- **CPU image**: `onerahmet/openai-whisper-asr-webservice:latest` (remove `deploy` block; use smaller model)
- **API**: **NOT** OpenAI-compatible — uses custom endpoint `POST /asr?output=json&language=en&task=transcribe`
- **Form field**: `audio_file` (multipart file upload with filename)
- **Default model**: `large-v3-turbo` (best speed/accuracy ratio, ~8× faster than `large-v3`)
- **Engine**: `faster_whisper` or `ctranslate2`, controlled via `STT_ENGINE` env variable

> **Important**: The STT endpoint was corrected in v1.2.0 from the nonexistent OpenAI-compatible `/v1/audio/transcriptions` to the actual `/asr` endpoint of the `onerahmet/openai-whisper-asr-webservice` image. The OpenAI API format is not supported by this service.

### Backend integration (`app/services/stt_service.py`)

The `STTService` class wraps the Whisper HTTP API:

- `transcribe(audio_bytes, filename)` → returns transcribed text string
- HTTP POST to `POST /asr?output=json&language=en&task=transcribe`
- Multipart upload with `audio_file` field
- 60-second timeout
- Raises on non-2xx responses

### Backend router (`app/routers/stt.py`)

- **Endpoint**: `POST /api/stt`
- **Rate limit**: 20 requests/minute
- **Request**: `multipart/form-data` with `audio` field (binary audio file)
- **Response**: `{ "text": string }`
- **Auth**: Requires valid access token
- **Guard**: Returns 503 if `STT_ENABLED=false`

---

## Environment variables (`.env` additions)

| Variable       | Default               | Purpose                                                        |
| -------------- | --------------------- | -------------------------------------------------------------- |
| `TTS_ENABLED`  | `false`               | Enable Kokoro TTS proxy                                        |
| `TTS_BASE_URL` | `http://kokoro:8880`  | Kokoro service URL                                             |
| `TTS_VOICE`    | `af_heart`            | Default TTS voice                                              |
| `STT_ENABLED`  | `false`               | Enable Whisper STT proxy                                       |
| `STT_BASE_URL` | `http://whisper:9000` | Whisper service URL                                            |
| `STT_MODEL`    | `large-v3-turbo`      | Whisper model (also: `tiny.en`, `small`, `medium`, `large-v3`) |
| `STT_ENGINE`   | `faster_whisper`      | Inference engine (`faster_whisper` or `ctranslate2`)           |

Both `TTS_ENABLED` and `STT_ENABLED` must be `true` for the Phase 3 voice conversation WebSocket to accept connections.

---

## Frontend components

### AudioPlayer (`components/ui/AudioPlayer.tsx`)

Reusable button component for TTS playback:

- Calls `POST /api/tts` with text and optional voice override
- Receives `audio/mpeg` binary
- Plays via browser `Audio` API (`new Audio(blobUrl).play()`)
- Cleans up `ObjectURL` on playback end
- Shows loading spinner during TTS generation

Used in:

- **Flashcards**: 🔊 button on each card for word pronunciation
- **Lessons**: 🔊 button on example sentences and vocabulary items
- **Pronunciation exercises**: the target sentence always has audio

### VoiceRecorder (`components/ui/VoiceRecorder.tsx`)

Reusable button component for STT recording:

- Requests microphone via `navigator.mediaDevices.getUserMedia({ audio: true })`
- Records audio using `MediaRecorder` API (codec: `audio/webm`)
- Maximum recording length: configurable via `maxSeconds` prop (default 5 s for exercises, unlimited for conversation)
- Stops automatically after max duration
- Uploads via `POST /api/stt` as multipart/form-data
- Returns transcribed text to parent component
- Shows recording indicator (animated red dot)

---

## Pronunciation exercises

### New exercise type: `pronunciation`

Added to the exercise mix in lesson content. Properties:

- `target_sentence`: the English text to pronounce
- `hint`: guidance about the sound or pattern to practice (e.g. "Focus on the 'th' sound")

User flow:

1. Student sees the target sentence
2. Presses 🔊 to hear the correct pronunciation (TTS)
3. Presses microphone button to record their own pronunciation
4. Recording is sent to `/api/stt` for transcription
5. Transcribed text is compared to the target sentence by the LLM
6. Score (0.0–1.0) and detailed feedback are returned

The pronunciation evaluation prompt (`PRONUNCIATION_EVAL_PROMPT` in `services/lesson_generator.py`) instructs the LLM to assess the match between expected and transcribed text, accounting for phonetic similarity and common pronunciation errors for the student's native language.

### Scoring guidelines

| Score    | Meaning    | Criteria                                        |
| -------- | ---------- | ----------------------------------------------- |
| 0.9–1.0  | Excellent  | Near-native pronunciation, all phonemes correct |
| 0.7–0.89 | Good       | Minor errors, understandable                    |
| 0.4–0.69 | Needs work | Several phoneme errors, still intelligible      |
| 0.0–0.39 | Poor       | Mostly unintelligible or no speech detected     |

---

## Flashcards speaking mode

An additional review mode on the `/flashcards` page:

- Shows the English definition (not the word)
- User speaks the word aloud
- STT transcribes the audio
- Transcription is compared to the correct word
- SM-2 quality rating derived from the match: `5` for exact match, `2` for incorrect
- Works alongside standard mode (written recall)

---

## Frontend API proxies

Both TTS and STT use dedicated Next.js Route Handlers to avoid issues with Next.js rewrites buffering or transforming binary/multipart data:

| Proxy | Route Handler              | Purpose                                                 |
| ----- | -------------------------- | ------------------------------------------------------- |
| TTS   | `src/app/api/tts/route.ts` | Forwards binary audio without transformation            |
| STT   | `src/app/api/stt/route.ts` | Forwards multipart form-data preserving file attachment |

Both proxies attach the `Authorization` header from the auth store and forward the response body unchanged.

---

## GPU vs CPU

Both services default to GPU images with CUDA support. For CPU-only hosts:

| Service     | CPU image                                        | Additional changes                                                                       |
| ----------- | ------------------------------------------------ | ---------------------------------------------------------------------------------------- |
| Kokoro TTS  | `ghcr.io/remsky/kokoro-fastapi-cpu:latest`       | Remove the `deploy.resources.reservations.devices` block                                 |
| Whisper STT | `onerahmet/openai-whisper-asr-webservice:latest` | Remove the `deploy` block; set `STT_MODEL=tiny.en` or `small` for acceptable performance |

The `deploy` block must be removed entirely on CPU hosts — Docker will error if it references NVIDIA devices without the NVIDIA runtime installed.

---

## Phase 2 completion criteria (all met by v1.2.0)

- [x] Kokoro returns audio correctly from the backend (`POST /api/tts`)
- [x] Whisper transcribes browser-recorded audio correctly (`POST /api/stt`)
- [x] STT endpoint uses correct API: `POST /asr?output=json&language=en&task=transcribe` (not OpenAI API)
- [x] Audio button functional in flashcards and lessons
- [x] Pronunciation recording and evaluation operational
- [x] Flashcard speaking mode functional
- [x] Frontend API proxies handle binary and multipart correctly
- [x] `TTS_ENABLED` and `STT_ENABLED` guard endpoints (503 when disabled)
- [x] GPU used by both services (CPU-only hosts supported with compose changes)
- [x] No regressions in Phase 1 features
