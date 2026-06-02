---
description: "Phase 10 spec — Multi-language support (index). See individual phase-10.X files for implementation details."
applyTo: "backend/**, frontend/**, messages/**, specs/**"
---

# Phase 10 — Multi-Language Support (Index)

This is the index file for Phase 10. Each sub-phase has its own dedicated spec file with full implementation details.

---

## Overview

FreeLingo moves from "one user = one language = one study plan" to an architecture where **each user can have multiple active study plans, one per language**, with progress, flashcards, conversations, memories, and competencies completely isolated by language.

### User flow

1. **Registration**: the user chooses their target language (`target_language`) during onboarding (same as now).
2. **Normal use**: the entire interface (dashboard, plan, lessons, flashcards, chat, exercises, etc.) corresponds to the active plan.
3. **Switch language**: a quick selector in the sidebar (flag + language name) allows switching between the languages the user is learning with a single click. When switching, the entire experience pivots to that language's plan. If the user only has one language, the selector is not shown.
4. **Add new language**: from Settings → "My Languages", the user sees a dedicated page with per-language cards (summarised progress) and an "Add new language" button that starts the language selection flow to create a new study plan.
5. **Settings management**: the "My Languages" page shows all the user's languages with their CEFR level, streak, % completed, and allows switching the active language. The current active language and the last language cannot be deleted.
6. **Change confirmation**: toast "Switching to Italian (A2)..." so the user always knows what changed.
7. **Language-isolated data**: each language has its own progress, flashcards, conversations, memories, and competencies.
8. **Language-specific curriculum**: curriculum for each language is different and adapted to that language.
9. **Adapted prompts**: system prompts use the target language name and never hardcode "English".
10. **Supported languages**: 3 new languages added (Spanish, Italian, Portuguese) in addition to existing English variants.

### Initially supported languages

| BCP-47 Code | Language |
|-------------|----------|
| `en-US` | English (American) — existing |
| `en-GB` | English (British) — existing |
| `es-ES` | Spanish (Spain) — **new** |
| `it-IT` | Italian — **new** |
| `pt-PT` | Portuguese (Portugal) — **new** |

---

## Sub-phase index

| Sub-phase | Title | Spec file |
|-----------|-------|-----------|
| **10.1** | Database: migrations and new models | [phase-10.1-multi-language.instructions.md](phase-10.1-multi-language.instructions.md) |
| **10.2** | Backend: services and multi-language prompts | [phase-10.2-multi-language.instructions.md](phase-10.2-multi-language.instructions.md) |
| **10.3** | API: new endpoints and refactor of existing ones | [phase-10.3-multi-language.instructions.md](phase-10.3-multi-language.instructions.md) |
| **10.4** | Frontend: core infrastructure | [phase-10.4-multi-language.instructions.md](phase-10.4-multi-language.instructions.md) |
| **10.5** | Frontend: pages | [phase-10.5-multi-language.instructions.md](phase-10.5-multi-language.instructions.md) |
| **10.6** | Curriculum and language data | [phase-10.6-multi-language.instructions.md](phase-10.6-multi-language.instructions.md) |
| **10.7** | i18n: new translation keys | [phase-10.7-multi-language.instructions.md](phase-10.7-multi-language.instructions.md) |
| **10.8** | Pydantic schemas (see Phase 10.3) | [phase-10.8-multi-language.instructions.md](phase-10.8-multi-language.instructions.md) |
| **10.9** | Tests | [phase-10.9-multi-language.instructions.md](phase-10.9-multi-language.instructions.md) |
| **10.10** | Finalisation, docs, version bump | [phase-10.10-multi-language.instructions.md](phase-10.10-multi-language.instructions.md) |

---

## New files summary

| File | Phase |
|------|-------|
| `backend/app/models/user_language.py` | 10.1 |
| `backend/alembic/versions/0029_multi_language.py` | 10.1 |
| `backend/app/services/user_language_service.py` | 10.2 |
| `backend/app/routers/languages.py` | 10.3 |
| `backend/app/schemas/language.py` | 10.3 |
| `backend/tests/test_multi_language.py` | 10.9 |
| `backend/app/data/es/` (8 files) | 10.6 |
| `backend/app/data/it/` (8 files) | 10.6 |
| `backend/app/data/pt/` (8 files) | 10.6 |
| `frontend/src/config/target-languages.ts` | 10.4 |
| `frontend/src/store/language.ts` | 10.4 |
| `frontend/src/components/LanguageSwitcher.tsx` | 10.4 |
| `frontend/src/app/(app)/settings/languages/page.tsx` | 10.5 |
| `frontend/src/data/es/` (5 files) | 10.6 |
| `frontend/src/data/it/` (5 files) | 10.6 |
| `frontend/src/data/pt/` (5 files) | 10.6 |
| `frontend/public/flags/spain.jpeg` | 10.6 (already exists ✅) |
| `frontend/public/flags/italy.jpeg` | 10.6 (already exists ✅) |
| `frontend/public/flags/portugal.jpeg` | 10.6 (already exists ✅) |

---

## Modified files summary

| File | Phase(s) |
|------|----------|
| `backend/app/models/__init__.py` | 10.1 |
| `backend/alembic/env.py` | 10.1 |
| `backend/app/models/study_plan.py` | 10.1 |
| `backend/app/models/progress.py` | 10.1 |
| `backend/app/models/flashcard.py` | 10.1 |
| `backend/app/models/conversation.py` | 10.1 |
| `backend/app/models/chat_history.py` | 10.1 |
| `backend/app/models/user_competency.py` | 10.1 |
| `backend/app/models/memory.py` | 10.1 |
| `backend/app/models/llm_usage.py` | 10.1 |
| `backend/app/services/llm_service.py` | 10.2 |
| `backend/app/services/progress_service.py` | 10.2 |
| `backend/app/services/memory_service.py` | 10.2 |
| `backend/app/services/language_helpers.py` | 10.2 |
| `backend/app/routers/assessment.py` | 10.3 |
| `backend/app/routers/study_plan.py` | 10.3 |
| `backend/app/schemas/study_plan.py` | 10.3 |
| `backend/app/schemas/auth.py` | 10.3 |
| `backend/app/main.py` | 10.3 |
| `frontend/src/data/curriculum.ts` | 10.6 |
| `frontend/src/app/(app)/layout.tsx` | 10.4, 10.10 |
| `frontend/src/app/(auth)/onboarding/page.tsx` | 10.5 |
| `frontend/src/app/(app)/plan/page.tsx` | 10.5 |
| `frontend/src/app/(app)/dashboard/page.tsx` | 10.5 |
| `frontend/src/app/(app)/chat/page.tsx` | 10.5 |
| `frontend/src/app/(app)/flashcards/page.tsx` | 10.5 |
| `frontend/src/app/(app)/progress/page.tsx` | 10.5 |
| `messages/*.json` (all 10 locale files) | 10.7 |
| `backend/tests/conftest.py` | 10.9 |
| `backend/tests/test_auth.py` | 10.9 |
| `backend/tests/test_study_plan.py` | 10.9 |
| `backend/tests/test_flashcards.py` | 10.9 |
| `backend/tests/test_assessment.py` | 10.9 |
| `specs/database-models.instructions.md` | 10.10 |
| `specs/api-endpoints.instructions.md` | 10.10 |
| `specs/services.instructions.md` | 10.10 |
| `specs/architecture.instructions.md` | 10.10 |
| `specs/study-plan.instructions.md` | 10.10 |
| `specs/phase-4-target-language.instructions.md` | 10.10 |
| `specs/version.md` | 10.10 |
| `AGENTS.md` | 10.10 |
| `CHANGELOG.md` | 10.10 |
| `README.md` | 10.10 |