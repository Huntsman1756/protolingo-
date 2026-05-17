---
description: Development roadmap and completion status for FreeLingo.
applyTo: "backend/**, frontend/**, docker-compose.yml"
---

# Roadmap — FreeLingo

This document records what was built and the completion criteria met.

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

---

## Phase 4 — Multi-Language Support

✅ Status: Complete (v1.3.0)

> Expands the platform from English-only to a multi-target-language architecture.
> Initial launch supports American English (`en-US`) and British English (`en-GB`),
> with the data model and service layer ready for additional languages.

| # | Milestone | Status |
|---|-----------|--------|
| 1 | DB migration — `english_variant` → `target_language` (BCP-47); backfill existing rows to `en-US` | ✅ |
| 2 | Backend model + schema — `User.target_language`, `StudyPlan.target_language`, `SUPPORTED_TARGET_LANGUAGES`, `RegisterResponse` | ✅ |
| 3 | Auto-login on register — `POST /register` returns `access_token` + sets refresh cookie; frontend redirects to `/onboarding` | ✅ |
| 4 | Service layer — `language_helpers.py`; `target_language` propagated to lesson generator, flashcards, chat, conversation pipeline, STT, assessment | ✅ |
| 5 | Frontend — `TargetLanguageSelector` component, `/onboarding` page, auth store updated, settings cleaned up | ✅ |
| 6 | i18n — `targetLanguages` + `onboarding` namespaces added to all 6 locales; old `englishVariant` keys removed | ✅ |
| 7 | Additional target languages beyond English variants | ⬜ |

**Completion criteria:**
- [x] Migration runs cleanly; `downgrade` restores previous schema
- [x] `POST /register` returns `access_token` and sets `refresh_token` cookie
- [x] New user is redirected to `/onboarding` and selects a target language before accessing the app
- [x] All services (LLM prompts, flashcard generation, STT) receive and respect `target_language`
- [x] `target_language` stored on `study_plans` rows
- [x] `PATCH /me` with an unsupported `target_language` returns 422
- [x] `TargetLanguageSelector` renders flags and correct translated labels
- [x] All 6 locales contain `targetLanguages` and `onboarding` namespaces
- [x] `tsc --noEmit` and `python3 -m compileall` pass clean
- [x] No regressions in Phases 1–3

---

## Phase 5 — Stripe Subscriptions & Paywall

✅ Status: **Complete (v1.4.0)**

> Optional subscription layer backed by Stripe. Fully gated by `STRIPE_ENABLED` env var — self-hosted deployments are unaffected when set to `false`.

| # | Milestone | Status |
|---|-----------|--------|
| 1 | Config + env vars + `docker-compose.yml` + `requirements.txt` | ✅ |
| 2 | User model fields (`stripe_customer_id`, `subscription_status`, `subscription_ends_at`) | ✅ |
| 3 | Alembic migration `0016_stripe_subscription` | ✅ |
| 4 | `subscription_service.py` — `is_subscribed()` + `apply_subscription_quotas()` | ✅ |
| 5 | `require_subscription` FastAPI dependency | ✅ |
| 6 | `GET /api/config` public endpoint | ✅ |
| 7 | `POST /api/billing/checkout` — Stripe Checkout Session | ✅ |
| 8 | `POST /api/billing/portal` — Stripe Customer Portal | ✅ |
| 9 | `POST /api/billing/webhook` — 4 Stripe events | ✅ |
| 10 | Apply `require_subscription` to all AI endpoints | ✅ |
| 11 | Admin schema: expose + override subscription status | ✅ |
| 12 | Frontend config store (`stripeEnabled`) | ✅ |
| 13 | `PaywallBanner` component | ✅ |
| 14 | Paywall applied to 6 protected pages | ✅ |
| 15 | Billing section in settings/profile | ✅ |
| 16 | Pricing section in landing page | ✅ |
| 17 | `/billing/success` and `/billing/canceled` pages | ✅ |
| 18 | i18n — `billing` namespace in 10 locales | ✅ |
| 19 | Tests — `test_billing.py` with Stripe SDK mocks | ✅ |

**Plans:**
- Monthly: 14.95 €/month (temporal) · 7-day trial (card required)
- Yearly: 149.50 €/year (temporal, 2 months free) · 7-day trial (card required)

**Completion criteria:**
- [x] `STRIPE_ENABLED=false` → no paywall, no billing UI, all endpoints accessible
- [x] `STRIPE_ENABLED=true` → unsubscribed users see `PaywallBanner` on all AI pages
- [x] Stripe Checkout Session created correctly for monthly and yearly plans
- [x] Webhook verifies Stripe signature; rejects invalid signatures with 400
- [x] All 4 webhook events update `subscription_status` correctly
- [x] `require_subscription` returns 402 for unsubscribed users when enabled
- [x] Admin can manually override `subscription_status`
- [x] Pricing section visible on landing only when `STRIPE_ENABLED=true`
- [x] `tsc --noEmit` and `python3 -m compileall` pass clean
- [x] No regressions in Phases 1–4

---

## Phase 6 — Listening

✅ Status: Complete

> LLM-generated audio comprehension exercises. Text and MP3 are generated on demand and
> cached on disk so subsequent users at the same CEFR level share the same content at no
> extra cost. The user listens, answers 5 multiple-choice questions, then the transcript
> is revealed together with score and XP.

| # | Milestone | Status |
|---|-----------|--------|
| 1 | DB models — `listening_exercises` + `listening_attempts` + migration `0018` | ✅ |
| 2 | Backend service — LLM generation, TTS synthesis, MP3 storage, Redis generation lock | ✅ |
| 3 | Backend router — 5 endpoints: next, generate, audio, attempt, history | ✅ |
| 4 | Frontend page — 6 UI states: loading → generating → idle → exercise → results → history | ✅ |
| 5 | Frontend components — ExerciseAudioPlayer (blob URL via apiFetch), question cards, result reveal | ✅ |
| 6 | Audio served directly via `GET /api/listening/audio/{id}` (FileResponse, auth header via apiFetch) | ✅ |
| 7 | Sidebar nav entry (between Conversation and Assessment) | ✅ |
| 8 | i18n — `nav.listening` + `listening.*` (27 keys) in all 10 locale files | ✅ |
| 9 | `PaywallGate` on all AI endpoints (`require_subscription` dep) | ✅ |

**Completion criteria:**
- [x] `GET /api/listening/next` returns an uncompleted exercise for the user's level, or `{ "available": false }`
- [x] `POST /api/listening/generate` creates text + MP3 via LLM + TTS; Redis lock prevents duplicates
- [x] MP3 file persisted in Docker named volume and served via `GET /api/listening/audio/{id}`
- [x] Exercise cached and reused for all subsequent users at the same level + language
- [x] Completed exercises are not shown again as "new" for the same user
- [x] History tab shows past attempts with transcript and original answers
- [x] Replaying from history awards no additional XP
- [x] Score 0–5, XP 0–50 (10 per correct answer) saved correctly
- [x] Paywall returns 403 on AI endpoints when `STRIPE_ENABLED=true` and user is unsubscribed
- [x] `tsc --noEmit` and `python3 -m compileall` pass clean
- [x] No regressions in Phases 1–5

---

## Phase 7 — Reading

✅ Status: Complete (v1.5.2)

> LLM-generated reading comprehension exercises. Text is shown immediately alongside 5
> multiple-choice questions (no audio, no "I'm ready" gate). Exercises are cached per
> CEFR level and target language so multiple users share the same content. Score and XP
> are awarded on submission; completed exercises move to a personal history tab where
> they can be replayed without earning additional XP.

| # | Milestone | Status |
|---|-----------|--------|
| 1 | DB models — `reading_exercises` + `reading_attempts` + migration `0019` | ✅ |
| 2 | Backend service — LLM generation (no TTS), 7 exercise types, 6 topic sets, Redis generation lock | ✅ |
| 3 | Backend router — 4 endpoints: next, generate, attempt, history | ✅ |
| 4 | `parse_llm_json` refactored from `listening_service.py` → `llm_adapter.py` (shared utility) | ✅ |
| 5 | Frontend page — 6 UI states: loading → generating → idle → exercise → results → history | ✅ |
| 6 | Two-column layout (passage 55% / questions 45%) on desktop; stacked on mobile | ✅ |
| 7 | Sidebar nav entry (immediately after Listening) | ✅ |
| 8 | i18n — `nav.reading` + `reading.*` namespace in all 10 locale files | ✅ |
| 9 | `PaywallGate` on AI endpoints; history accessible without subscription | ✅ |
| 10 | Answer count validation (`field_validator` — exactly 5 answers required) | ✅ |

**Completion criteria:**
- [x] `GET /api/reading/next` returns exercise with `text` included immediately, or `{ "available": false }`
- [x] `POST /api/reading/generate` enqueues background LLM task; Redis lock prevents duplicate generation
- [x] Exercise cached and reused for all users at the same level + language
- [x] `correct` field omitted from `QuestionOut`; only revealed after `POST /attempt`
- [x] Completed exercises excluded from "new" pool; accessible via history
- [x] `replay=true` scores correctly but forces `xp_earned = 0`
- [x] Score 0–5, XP 0–50 (10 per correct answer) saved correctly
- [x] History paginated (`skip` / `limit`, max 50); returns `total` count
- [x] Paywall returns 403 on AI endpoints when `STRIPE_ENABLED=true` and user is unsubscribed
- [x] `POST /attempt` with ≠ 5 answers returns 422 (Pydantic `field_validator`)
- [x] `tsc --noEmit` and `python3 -m compileall` pass clean
- [x] No regressions in Phases 1–6