---
description: "Phase 10.9 spec — Multi-language: backend tests (new test file + updates to existing tests)."
applyTo: "backend/tests/**"
---

# Phase 10.9 — Tests

## Goal

Ensure full test coverage of the multi-language feature and update all existing tests that are impacted by the schema changes (new `study_plan_id` column, new `UserLanguage` model, partial unique index).

**Prerequisite:** All previous phases (10.1–10.7) must be merged before writing tests that cover the full feature.

---

## 10.9.1 New test file

**File:** `backend/tests/test_multi_language.py`

| Test | Description |
|------|-------------|
| `test_add_new_language` | `POST /api/languages` creates `UserLanguage` row and marks it active |
| `test_add_duplicate_language` | `POST` with an already-existing language → 409 |
| `test_switch_language` | `PUT /api/languages/active` switches the active language correctly |
| `test_list_languages` | `GET /api/languages` returns all languages with summarised progress |
| `test_remove_language_cascades` | `DELETE /api/languages/{code}` removes plan, lessons, flashcards, progress, etc. in cascade |
| `test_cannot_remove_last_language` | `DELETE` when user has only 1 language → 400 |
| `test_cannot_remove_active_language` | `DELETE` on the currently active language → 400 |
| `test_active_plan_per_language` | Two simultaneously active languages with fully independent plans |
| `test_progress_isolated_by_language` | XP and streak are independent per language (updating one does not affect the other) |
| `test_flashcards_isolated_by_language` | Flashcards filtered by `study_plan_id` — no cross-language leakage |
| `test_conversations_isolated_by_language` | Conversations filtered by active language |
| `test_memories_isolated_by_language` | Memories filtered by `study_plan_id` |
| `test_curriculum_per_language` | `get_curriculum()` returns the correct curriculum for each language |
| `test_prompt_language_agnostic` | System prompts include the correct language name (not hardcoded "English") |
| `test_onboarding_creates_user_language` | Registration + completing assessment automatically creates `UserLanguage` row |
| `test_supported_languages_validation` | `POST /api/languages` with unsupported language → 422 |
| `test_assessment_language_param` | `GET /api/assessment/start?language=es-ES` generates questions in Spanish |
| `test_assessment_redis_key_isolation` | Two simultaneous assessments in different languages do not overwrite each other in Redis |
| `test_plan_deactivation_scoped_by_language` | Creating a Spanish plan does not deactivate the active English plan |
| `test_unique_index_prevents_duplicate_active_plans` | Attempting to create two active plans for the same user+language raises a constraint error |
| `test_chat_prompt_uses_target_language` | `TUTOR_SYSTEM_PROMPT` uses the active plan's language, not always English |

---

## 10.9.2 Updates to existing tests

All tests that create users, study plans, flashcards, progress, or competencies must be updated to:

1. **Create a `UserLanguage` row** for the test user (or assert the fixture does it).
2. **Pass `study_plan_id`** when creating `Progress`, `Flashcard`, or `UserCompetency` rows directly in the DB.
3. **Not create two active plans for the same user+language** (the partial unique index now enforces this — tests that did so will fail).

### `backend/tests/conftest.py`

Shared fixtures that create `StudyPlan` rows must either:
- Always deactivate any existing active plan for the same user+language before creating a new one, or
- Use a different language per fixture to avoid conflicts.

Also add a shared `user_language` fixture that creates the `UserLanguage` row alongside the user fixture.

### Affected test files

| File | Required changes |
|------|-----------------|
| `backend/tests/test_auth.py` | Add `UserLanguage` creation to user setup; `study_plan_id` in related rows |
| `backend/tests/test_study_plan.py` | Scope plan deactivation; add `UserLanguage` fixture |
| `backend/tests/test_flashcards.py` | Set `study_plan_id` on created flashcards |
| `backend/tests/test_lessons.py` | Set `study_plan_id` on progress/competency rows |
| `backend/tests/test_chat.py` | Set `study_plan_id` on conversations/chat_history rows |
| `backend/tests/test_conversation.py` | Set `study_plan_id` on conversation rows |
| `backend/tests/test_listening.py` | Verify active plan is retrieved correctly |
| `backend/tests/test_reading.py` | Verify active plan is retrieved correctly |
| `backend/tests/test_progress.py` | Set `study_plan_id`; verify isolation |
| `backend/tests/test_memories.py` | Set `study_plan_id`; verify filtering |
| `backend/tests/test_assessment.py` | Scope plan deactivation; add `UserLanguage` fixture; test Redis key isolation |

---

## New files in this phase

| File | Type |
|------|------|
| `backend/tests/test_multi_language.py` | New test file |

## Modified files in this phase

All affected test files listed in 10.9.2.