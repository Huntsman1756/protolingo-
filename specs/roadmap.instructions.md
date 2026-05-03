---
description: Development roadmap and completion status for FreeLingo.
applyTo: "backend/**, frontend/**, docker-compose.yml"
---

# Roadmap — FreeLingo

All phases are complete as of **v1.2.1** (2026-05-02). This document records what was built and the completion criteria met.

**Legend**: ⬜ Pending · 🔄 In progress · ✅ Done

---

## Phase 1 — Learning Platform

✅ Status: Complete (v1.0.0 – v1.1.1)

| # | Milestone | Status |
|---|-----------|--------|
| 1 | Scaffolding — project structure, Docker Compose, CI | ✅ |
| 2 | Backend core — async DB, JWT+Redis auth, LLM adapter | ✅ |
| 3 | Assessment — 3-step onboarding (BeginnerGate → adaptive quiz → duration/goals) | ✅ |
| 4 | Study plan — Deterministic curriculum-driven plan using `curriculum.py` | ✅ |
| 5 | Lessons — LLM-generated content within CEFR constraints, free-write evaluation | ✅ |
| 6 | Flashcards — SM-2 spaced repetition with LLM generation and native-language translations | ✅ |
| 7 | Chat — AI tutor with SSE streaming, progress-aware system prompt | ✅ |
| 8 | Frontend — All screens connected: login, assessment, plan, lessons, flashcards, chat, settings | ✅ |

**Completion criteria:**
- [x] `docker compose up -d` starts all services without errors
- [x] First registration creates admin user automatically
- [x] Login returns access_token + refresh_token in httpOnly cookie
- [x] Auto-refresh works without user noticing token expiration
- [x] Logout invalidates refresh token in Redis
- [x] `ALLOW_REGISTRATION=false` blocks public signups
- [x] Single-use invites work (48h expiry)
- [x] Admin panel only accessible to `role=admin`
- [x] Assessment completed and CEFR level returned
- [x] Study plan generated correctly
- [x] Lesson completed with exercises and feedback
- [x] SM-2 flashcards reviewed and updated correctly
- [x] Streaming chat works without UI glitches
- [x] Progress persists across sessions (PostgreSQL)

---

## Phase 1+ — Learning Resources Hub

✅ Status: Complete (v1.1.0)

> Delivered alongside Phase 1. All data is static TypeScript; no new infrastructure required.

| # | Milestone | Status |
|---|-----------|--------|
| 1 | Grammar Reference — data layer + `/grammar` index + `/grammar/[slug]` detail pages | ✅ |
| 2 | Vocabulary Hub — `vocabulary.ts` + `/vocabulary` + set detail pages with flashcard integration | ✅ |
| 3 | Phrasebook — `phrasebook.ts` + `/phrasebook` with level and register filters | ✅ |
| 4 | Skills Tracker — `/progress` competency checklist + vocabulary stats | ✅ |
| 5 | Level Completion Test — `/assessment/level-test` + result + recommendation (advance/extend/repeat) | ✅ |
| 6 | Nav + routing — RESOURCES nav group, curriculum-driven `/plan` roadmap | ✅ |

**Completion criteria:**
- [x] `/grammar` renders all topics with no API calls
- [x] `/grammar/[slug]` renders full detail; unknown slugs return 404
- [x] `/vocabulary` lists all sets grouped by level with flashcard-progress badges
- [x] `/vocabulary/[setId]` shows words + "Add to flashcards" button
- [x] `/phrasebook` lists situations with level and register filters
- [x] `/progress` shows per-unit competency checklist with scores
- [x] `/progress` shows vocabulary progress bars per set
- [x] Level test available only after all units in a level are completed
- [x] Level test recommendation: advance >= 75% / extend 55-74% / repeat < 55%
- [x] RESOURCES nav group works on desktop and mobile
- [x] `/plan` visual roadmap linked from dashboard
- [x] No regressions in Phase 1

---

## Phase 2 — Local TTS + STT

✅ Status: Complete (v1.1.0 – v1.2.0)

| # | Milestone | Status |
|---|-----------|--------|
| 1 | Kokoro TTS service + `/api/tts` proxy | ✅ |
| 2 | Whisper STT service + `/api/stt` proxy (`POST /asr`, not OpenAI API) | ✅ |
| 3 | Audio playback (`AudioPlayer` component) and voice recording (`VoiceRecorder`) | ✅ |
| 4 | Pronunciation evaluation via STT transcription | ✅ |
| 5 | Pronunciation exercise type in lessons | ✅ |
| 6 | Speaking mode in flashcards | ✅ |

**Completion criteria:**
- [x] Kokoro returns audio correctly from backend
- [x] Whisper transcribes browser-recorded audio correctly
- [x] Audio button functional in flashcards and lessons
- [x] Pronunciation recording and evaluation operational
- [x] GPU used by both services (CPU-only hosts supported via compose changes)
- [x] STT endpoint corrected to `POST /asr?output=json&language=en&task=transcribe` (not OpenAI API)
- [x] Default STT model upgraded to `large-v3-turbo`
- [x] `STT_ENGINE` variable added for engine selection
- [x] No regressions in Phase 1 features

---

## Phase 3 — Real-Time Voice Conversation

✅ Status: Complete (v1.2.0 – v1.2.1)

| # | Milestone | Status |
|---|-----------|--------|
| 1 | WebSocket `/ws/conversation` endpoint with TTS+STT guard | ✅ |
| 2 | Conversation pipeline (STT → LLM streaming → TTS chunking) | ✅ |
| 3 | Sentence boundary detection for TTS flushing | ✅ |
| 4 | Frontend `ConversationMode` with VAD (`@ricky0123/vad-react`) | ✅ |
| 5 | Gapless `AudioQueue` playback via Web Audio API | ✅ |
| 6 | Barge-in / interrupt support | ✅ |
| 7 | Configurable session timeouts (max duration + inactivity, 60s warnings) | ✅ |
| 8 | Structured logging across the pipeline | ✅ |

**Completion criteria:**
- [x] WebSocket accepts connections and full pipeline works
- [x] Barge-in functional: user can interrupt AI by speaking
- [x] Gapless audio without gaps between sentences
- [x] Automatic VAD operational with onnxruntime-web threaded WASM (COOP+COEP headers)
- [x] Conversation history maintained correctly during session
- [x] Session timeout watchers (max duration + inactivity) with 60s warning
- [x] `TTS_ENABLED=true` and `STT_ENABLED=true` required for WebSocket endpoint
- [x] `LOG_LEVEL` controls pipeline logging verbosity
- [x] No regressions in Phase 1 and 2