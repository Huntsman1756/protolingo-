---
description: Roadmap and development phases for FreeLingo. Update as the project progresses.
applyTo: "backend/**, frontend/**, docker-compose.yml"
---

# Roadmap — FreeLingo

Development phases. Update this file as the project progresses.

**Legend**: ⬜ Pending · 🔄 In progress · ✅ Done

---

## Phase 1 — Learning Platform

⬜ Status: Planned

| # | Milestone | Status |
|---|-----------|--------|
| 1 | Scaffolding — project structure, Docker Compose, CI | ⬜ |
| 2 | Backend core — DB, auth, LLM adapter | ⬜ |
| 3 | Assessment — CEFR placement quiz + evaluation | ⬜ |
| 4 | Study plan — Weekly plan generation from CEFR level | ⬜ |
| 5 | Lessons — Generation and interactive exercises | ⬜ |
| 6 | Flashcards — SM-2 with LLM generation | ⬜ |
| 7 | Chat — AI tutor with SSE streaming | ⬜ |
| 8 | Frontend — All screens connected to backend | ⬜ |

**Completion criteria:**
- [ ] `docker compose up -d` starts all services without errors
- [ ] First registration creates admin user automatically
- [ ] Login returns access_token + refresh_token in httpOnly cookie
- [ ] Auto-refresh works without user noticing token expiration
- [ ] Logout invalidates refresh token in Redis
- [ ] `ALLOW_REGISTRATION=false` blocks public signups
- [ ] Single-use invites work (48h expiry)
- [ ] Admin panel only accessible to `role=admin`
- [ ] Assessment completed and CEFR level returned
- [ ] Study plan generated correctly with local Ollama
- [ ] Lesson completed with exercises and feedback
- [ ] SM-2 flashcards reviewed and updated correctly
- [ ] Streaming chat works without UI glitches
- [ ] Progress persists across sessions (PostgreSQL)

---

## Phase 2 — Local TTS + STT

⬜ Status: Planned

| # | Milestone | Status |
|---|-----------|--------|
| 1 | Kokoro TTS service + `/api/tts` proxy | ⬜ |
| 2 | Whisper STT service + `/api/stt` proxy | ⬜ |
| 3 | Audio playback in flashcards and lessons | ⬜ |
| 4 | Voice recording and pronunciation evaluation | ⬜ |
| 5 | Pronunciation exercise type | ⬜ |
| 6 | Speaking mode in flashcards | ⬜ |

**Completion criteria:**
- [ ] Kokoro returns audio correctly from backend
- [ ] Whisper transcribes browser-recorded audio correctly
- [ ] Audio button functional in flashcards and lessons
- [ ] Pronunciation recording and evaluation operational
- [ ] GPU used by both services
- [ ] No regressions in Phase 1 features

---

## Phase 3 — Real-Time Conversation

⬜ Status: Planned

| # | Milestone | Status |
|---|-----------|--------|
| 1 | WebSocket `/ws/conversation` endpoint | ⬜ |
| 2 | ConversationPipeline (STT → LLM → TTS streaming) | ⬜ |
| 3 | Sentence boundary detection for TTS chunking | ⬜ |
| 4 | Frontend ConversationMode with VAD (vad-web) | ⬜ |
| 5 | Gapless AudioContext playback | ⬜ |
| 6 | Barge-in / interrupt support | ⬜ |

**Completion criteria:**
- [ ] WebSocket accepts connections and full pipeline works
- [ ] End-to-end latency < 1.5s locally with GPU
- [ ] Barge-in functional: user can interrupt AI by speaking
- [ ] Gapless audio without gaps between sentences
- [ ] Automatic VAD operational with < 2% false positives
- [ ] Conversation history maintained correctly during session
- [ ] No regressions in Phase 1 and 2

---

## Phase 1+ — Learning Resources Hub

⬜ Status: Planned

> Delivered alongside Phase 1. These features are core to the learning experience
> and should ship before Phase 2 (TTS/STT). No new infrastructure required —
> all data is static TypeScript, all computation is frontend-only or reuses
> the existing backend.

| # | Milestone | Status |
|---|-----------|--------|
| 1 | Grammar Reference — data layer + `/grammar` index + `/grammar/[slug]` | ⬜ |
| 2 | Vocabulary Hub — `vocabulary.ts` + `/vocabulary` + set detail pages | ⬜ |
| 3 | Phrasebook — `phrasebook.ts` + `/phrasebook` with register filter | ⬜ |
| 4 | Skills Tracker — `/progress` competency checklist + vocabulary stats | ⬜ |
| 5 | Level Completion Test — `/lesson/level-test` + result + recommendation | ⬜ |
| 6 | Nav + routing — RESOURCES nav group, update middleware | ⬜ |

**Completion criteria:**
- [ ] `/grammar` renders all topics with no API calls
- [ ] `/grammar/[slug]` renders full detail; unknown slugs return 404
- [ ] `/vocabulary` lists all sets grouped by level with flashcard-progress badges
- [ ] `/vocabulary/[setId]` shows words + "Add to flashcards" button
- [ ] `/phrasebook` lists situations with level and register filters
- [ ] `/progress` shows per-unit competency checklist with scores
- [ ] `/progress` shows vocabulary progress bars per set
- [ ] Level test available only after all units in a level are completed
- [ ] Level test recommendation: advance ≥ 75% / extend 55–74% / repeat < 55%
- [ ] RESOURCES nav group works on desktop and mobile
- [ ] `/plan` visual roadmap linked from dashboard
- [ ] No regressions in Phase 1