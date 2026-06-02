---
description: "Phase 10.2 spec — Multi-language: backend services, multi-language LLM prompts, and new FastAPI dependency."
applyTo: "backend/**"
---

# Phase 10.2 — Backend: services and multi-language prompts

## Goal

Adapt all backend services to be language-agnostic and introduce the `user_language_service` and `get_active_study_plan` dependency. After this phase the backend resolves every request against the user's active language plan, not a hardcoded English assumption.

**Prerequisite:** Phase 10.1 must be merged and the migration applied before starting this phase.

---

## 10.2.0 Migration: apply NOT NULL to `study_plan_id`

**File:** `backend/alembic/versions/0030_not_null_study_plan_id.py`  
**Revision ID:** `0030_not_null_study_plan_id`  
**Down revision:** `0029_multi_language`

Phase 10.1 left `study_plan_id` nullable on `progress`, `flashcards`, and `user_competencies` so that the unmodified services could keep running without errors. Now that the services in this phase always populate `study_plan_id` on every INSERT, we can apply the constraint.

**This migration is deployed together with the Phase 10.2 service changes** — not before.

```python
def upgrade() -> None:
    op.alter_column("progress", "study_plan_id", nullable=False)
    op.alter_column("flashcards", "study_plan_id", nullable=False)
    op.alter_column("user_competencies", "study_plan_id", nullable=False)


def downgrade() -> None:
    op.alter_column("user_competencies", "study_plan_id", nullable=True)
    op.alter_column("flashcards", "study_plan_id", nullable=True)
    op.alter_column("progress", "study_plan_id", nullable=True)
```

> **Deploy order for 10.2:** code changes first (services updated), then `alembic upgrade head`. Do NOT run the migration before the code — the services must populate `study_plan_id` before the column becomes NOT NULL.

---

## 10.2.1 Refactor of `language_helpers.py`

**File:** `backend/app/services/language_helpers.py`

Expanded to support any language, not just English:

```python
_LANGUAGE_INFO: dict[str, dict[str, str]] = {
    "en-US": {"name": "English (US)", "self_name": "English (US)", "iso639": "en", "flag": "🇺🇸"},
    "en-GB": {"name": "English (UK)", "self_name": "English (UK)", "iso639": "en", "flag": "🇬🇧"},
    "es-ES": {"name": "Spanish",    "self_name": "Español",       "iso639": "es", "flag": "🇪🇸"},
    "it-IT": {"name": "Italian",    "self_name": "Italiano",      "iso639": "it", "flag": "🇮🇹"},
    "pt-PT": {"name": "Portuguese", "self_name": "Português",     "iso639": "pt", "flag": "🇵🇹"},
}
```

**New / updated functions:**

| Function | Signature | Description |
|----------|-----------|-------------|
| `get_language_name(target_language)` | `str → str` | Returns `"Italian"`, `"Spanish"`, etc. |
| `get_language_self_name(target_language)` | `str → str` | Returns `"Italiano"`, `"Español"`, etc. |
| `get_iso639(target_language)` | `str → str` | `"it-IT" → "it"` (unchanged) |
| `get_language_flag(target_language)` | `str → str` | Flag emoji |

`get_english_variant()` is **removed** (obsolete). All callers must be updated to use `get_language_name()` and `get_language_self_name()`.

---

## 10.2.2 Multi-language LLM prompts

All system prompts must be parameterised to be language-agnostic. Replace every hardcoded `"English"` occurrence with `{target_language_name}` (e.g. `"Italian"`, `"Spanish"`).

### `lesson_generator.py`

```
BEFORE: "You are an expert English teacher..."
NOW:    "You are an expert {target_language_name} teacher..."
```

The lesson is generated entirely in the target language. The prompt receives `target_language_name` and `iso639`.

**Note — `VALID_GRAMMAR_SLUGS`:** this constant is currently built at import time from the English curriculum. With multi-language it must be computed dynamically per language: replace the global constant with `get_valid_grammar_slugs(target_language)` that calls `get_curriculum(target_language)`.

### `flashcard_sm2.py`

```
BEFORE: "Generate {count} English vocabulary flashcards..."
NOW:    "Generate {count} {target_language_name} vocabulary flashcards..."
```

Flashcards contain the word in the target language and the translation in the user's `native_language`.

### `conversation_pipeline.py`

```
BEFORE: "You are an encouraging and patient English conversation partner named FreeLingo..."
        "ALWAYS respond in English, regardless of the language the student uses..."
NOW:    "You are an encouraging and patient {target_language_name} conversation partner named FreeLingo..."
        "ALWAYS respond in {target_language_name}, regardless of the language the student uses..."
```

**Important:** the `ALWAYS respond in English` rule is hardcoded — it must be generalised. `target_language_name` is obtained from the active plan.

### `chat.py` (TUTOR_SYSTEM_PROMPT)

```
BEFORE: "You are an encouraging and patient English language tutor named FreeLingo..."
        "ALWAYS respond in English, regardless of the language the student writes in..."
NOW:    "You are an encouraging and patient {target_language_name} language tutor named FreeLingo..."
        "ALWAYS respond in {target_language_name}, regardless of the language the student writes in..."
```

`target_language_name` is obtained via `get_language_name(plan.target_language)` and injected when building the system prompt.

### `listening_service.py` / `reading_service.py`

```
BEFORE: "You are an English language content creator..."
NOW:    "You are a {target_language_name} language content creator..."
```

Content (texts, questions) is generated in the target language.

### `memory_service.py`

`MEMORY_SYSTEM_INSTRUCTION` currently contains `"struggles with English, or anything that would help personalise future lessons"`. It must become a function (not a module-level constant) that accepts `target_language_name`:

```python
def get_memory_system_instruction(target_language_name: str) -> str:
    return (
        f"... struggles with {target_language_name}, "
        "or anything that would help personalise future lessons ..."
    )
```

---

## 10.2.3 `study_plan_generator.py`

The plan title becomes dynamic:

```python
# BEFORE
title = f"English {cefr_level} — {duration_weeks}-week programme"

# NOW
title = f"{get_language_name(target_language)} {cefr_level} — {duration_weeks}-week programme"
```

`generate_study_plan()` receives a new `target_language: str` parameter.

---

## 10.2.4 `progress_service.py`

All functions accept `study_plan_id: int` as a parameter. Filtering is done by plan instead of by user:

```python
# BEFORE
async def update_daily_progress(db: AsyncSession, user_id: int, ...)

# NOW
async def update_daily_progress(db: AsyncSession, user_id: int, study_plan_id: int, ...)
```

**Note — `upsert_unit_competency`:** this function also operates on `user_competencies`, which now has `study_plan_id`. It must accept and use it to avoid mixing competencies from different languages:

```python
# BEFORE
async def upsert_unit_competency(db, user_id, unit_id, ...)

# NOW
async def upsert_unit_competency(db, user_id, study_plan_id, unit_id, ...)
```

---

## 10.2.5 `memory_service.py`

`get_user_memories()` accepts an optional `study_plan_id`. If `None`, returns all user memories (backward compatibility). If provided, filters by plan.

---

## 10.2.6 New service: `user_language_service.py`

**File:** `backend/app/services/user_language_service.py`

| Function | Description |
|----------|-------------|
| `get_active_language(db, user_id) → UserLanguage \| None` | Returns the user's active language row |
| `get_user_languages(db, user_id) → list[UserLanguage]` | All user language rows |
| `add_language(db, user_id, target_language) → UserLanguage` | Adds a new language (creates `UserLanguage` row + deactivates others) |
| `switch_language(db, user_id, target_language) → UserLanguage` | Switches the active language (deactivates current, activates target) |
| `remove_language(db, user_id, target_language) → bool` | Removes a language row (associated plans cascade) |

**Business rules enforced in this service:**
- `add_language`: raises `409` if the language already exists for the user.
- `switch_language`: raises `404` if the user does not have that language.
- `remove_language`: raises `400` if the user only has one language (cannot delete the last one).
- `remove_language`: raises `400` if trying to delete the currently active language (user must switch first).

---

## 10.2.7 New FastAPI dependency: `get_active_study_plan`

**File:** `backend/app/core/deps.py` (add alongside existing dependencies; do **not** create a new file)

```python
async def get_active_study_plan(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> StudyPlan:
    """Returns the active study plan for the user's active language."""
    from app.services.user_language_service import get_active_language

    active_lang = await get_active_language(db, current_user.id)
    if not active_lang:
        raise HTTPException(status_code=404, detail="No active language set")
    result = await db.execute(
        select(StudyPlan).where(
            StudyPlan.user_id == current_user.id,
            StudyPlan.target_language == active_lang.target_language,
            StudyPlan.is_active == True,
        )
    )
    plan = result.scalar_one_or_none()
    if not plan:
        raise HTTPException(status_code=404, detail="No active study plan found")
    return plan
```

---

## Modified files in this phase

| File | Change |
|------|--------|
| `backend/app/services/language_helpers.py` | Expand to 5 languages, remove `get_english_variant()` |
| `backend/app/services/lesson_generator.py` | Language-agnostic prompt, dynamic grammar slugs |
| `backend/app/services/flashcard_sm2.py` | Language-agnostic prompt |
| `backend/app/services/conversation_pipeline.py` | Language-agnostic prompt |
| `backend/app/services/chat.py` | Language-agnostic `TUTOR_SYSTEM_PROMPT` |
| `backend/app/services/listening_service.py` | Language-agnostic prompt |
| `backend/app/services/reading_service.py` | Language-agnostic prompt |
| `backend/app/services/memory_service.py` | `MEMORY_SYSTEM_INSTRUCTION` → function, `study_plan_id` filter |
| `backend/app/services/study_plan_generator.py` | Dynamic title, `target_language` param |
| `backend/app/services/progress_service.py` | Add `study_plan_id` to all functions |
| `backend/app/core/deps.py` | Add `get_active_study_plan` dependency |

## New files in this phase

| File | Type |
|------|------|
| `backend/app/services/user_language_service.py` | New service |
| `backend/alembic/versions/0030_not_null_study_plan_id.py` | Alembic migration (NOT NULL) |