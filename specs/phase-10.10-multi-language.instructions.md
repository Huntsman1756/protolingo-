---
description: "Phase 10.10 spec — Multi-language: finalisation, documentation updates, version bump and changelog."
applyTo: "specs/**, AGENTS.md, CHANGELOG.md, README.md"
---

# Phase 10.10 — Finalisation

## Goal

Bring all spec files, AGENTS.md, README, and CHANGELOG in sync with everything implemented in Phases 10.1–10.9, and bump the version to 1.7.0.

**Prerequisite:** All previous phases (10.1–10.9) must be complete and validated in develop before starting this phase.

---

## 10.10.1 Spec documentation updates

| File | Change |
|------|--------|
| `specs/database-models.instructions.md` | Add `UserLanguage` model documentation; document new `study_plan_id` columns in all 7 tables |
| `specs/api-endpoints.instructions.md` | Document new `/api/languages` router (5 endpoints) and all changes to existing endpoints from Phase 10.3 |
| `specs/services.instructions.md` | Document `user_language_service.py`; update `language_helpers.py`, `progress_service.py`, `memory_service.py` entries |
| `specs/architecture.instructions.md` | Update data flow to reflect multi-plan architecture; document `get_active_study_plan` dependency; update env vars if any were added |
| `specs/study-plan.instructions.md` | Update: one active plan per user per language (not one per user); document `uq_active_plan_per_lang` constraint |
| `specs/phase-4-target-language.instructions.md` | Add note: "Phase 10 extends this to multi-language per user — see phase-10-multi-language.instructions.md" |
| `specs/rate-limiting.instructions.md` | Add rate limits for the 5 new `/api/languages` endpoints if applicable |

---

## 10.10.2 AGENTS.md update

- Update `## Project state` section: bump to v1.7.0, add "Phase 10 (Multi-Language)" to the completed phases list.
- Update the spec files table to include the 10 new `phase-10.X-multi-language.instructions.md` files.
- Update the `## Architecture at a glance` section if the multi-language architecture warrants a description change.

---

## 10.10.3 Version bump

**File:** `specs/version.md`

```
1.7.0
```

**File:** `frontend/src/app/(app)/layout.tsx`

Update the sidebar version string to `v1.7.0`.

---

## 10.10.4 CHANGELOG entry

**File:** `CHANGELOG.md`

Add at the top:

```markdown
## [1.7.0] — 2026-XX-XX

### Added
- **Phase 10 — Multi-Language Support**: users can now learn multiple languages simultaneously, each with its own independent study plan, progress, flashcards, conversations, and memories.
- New supported languages: Spanish (es-ES), Italian (it-IT), Portuguese Portugal (pt-PT), in addition to the existing English variants.
- Language Switcher in the sidebar to switch the active language with a single click.
- "My Languages" settings page (`/settings/languages`) to manage, add, and delete languages.
- New API router `/api/languages` with 5 endpoints (list, active, add, switch, delete).
- `user_languages` table: tracks which languages each user is learning.
- `study_plan_id` column added to `progress`, `flashcards`, `user_competencies`, `conversations`, `chat_history`, `memories`, and `llm_usage` tables for full language isolation.
- All LLM prompts (lesson, flashcard, chat, conversation, listening, reading, memory) are now language-agnostic.
- Curriculum data for Spanish, Italian, and Portuguese (backend + frontend).

### Changed
- Assessment flow now accepts a `?language=` parameter for multi-language CEFR evaluation.
- Study plan generation scopes plan deactivation to the specific language (prevents destroying plans for other languages).
- Progress, flashcards, competencies, and conversations are now filtered by `study_plan_id` (language-isolated).
- Redis assessment key now includes the language: `assessment:{user_id}:{target_language}`.
- `alembic/env.py` now imports all models via `app.models` package (single import, always complete).

### Fixed
- `models/__init__.py` was missing `ReadingExercise` — Alembic could not detect changes to the reading table.
- `POST /api/study-plan/generate` was not correctly saving `target_language` to the new plan.
```

---

## 10.10.5 Roadmap update

**File:** `specs/roadmap.instructions.md`

Add Phase 10 section with milestones and mark it complete.

---

## Modified files in this phase

| File | Change |
|------|--------|
| `specs/database-models.instructions.md` | Document new model and columns |
| `specs/api-endpoints.instructions.md` | Document new and updated endpoints |
| `specs/services.instructions.md` | Document new and updated services |
| `specs/architecture.instructions.md` | Update data flow |
| `specs/study-plan.instructions.md` | Update plan semantics |
| `specs/phase-4-target-language.instructions.md` | Add Phase 10 reference note |
| `specs/rate-limiting.instructions.md` | Add limits for new endpoints |
| `specs/roadmap.instructions.md` | Mark Phase 10 complete |
| `specs/version.md` | Bump to 1.7.0 |
| `AGENTS.md` | Update project state and spec table |
| `CHANGELOG.md` | Add 1.7.0 entry |
| `README.md` | Update if architecture section needs changes |
| `frontend/src/app/(app)/layout.tsx` | Update version string to v1.7.0 |