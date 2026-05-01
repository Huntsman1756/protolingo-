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

## Phase 4 — Grammar Reference

⬜ Status: Planned

| # | Milestone | Status |
|---|-----------|--------|
| 1 | Data layer — `frontend/src/data/grammar.ts` with all topics A1–C2 | ⬜ |
| 2 | Index page `/grammar` grouped by level, with search and category filter | ⬜ |
| 3 | Detail page `/grammar/[slug]` with explanations, examples, mistakes | ⬜ |
| 4 | Lesson integration — related grammar links on lesson pages | ⬜ |
| 5 | Nav + routing — GRAMMAR entry in sidebar and mobile menu | ⬜ |

**Completion criteria:**
- [ ] `/grammar` renders all topics with no API calls
- [ ] Search and category filter work client-side
- [ ] `/grammar/[slug]` renders full detail for every slug
- [ ] Non-existent slugs return 404
- [ ] Lesson page shows related grammar links when `grammar_refs` is populated
- [ ] Backend validates grammar slugs against `VALID_GRAMMAR_SLUGS`
- [ ] GRAMMAR in sidebar nav and mobile dropdown
- [ ] No regressions in Phase 1–3