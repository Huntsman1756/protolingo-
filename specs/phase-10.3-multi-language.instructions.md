---
description: "Phase 10.3 spec — Multi-language: new API endpoints and refactor of existing ones."
applyTo: "backend/**"
---

# Phase 10.3 — API: new endpoints and refactor of existing ones

## Goal

Expose the multi-language functionality via REST endpoints and wire the existing endpoints to the active language plan. After this phase the full backend API is multi-language aware.

**Prerequisite:** Phase 10.2 must be merged before starting this phase.

---

## 10.3.1 Language validation

**File:** `backend/app/schemas/auth.py`

Expand `SUPPORTED_TARGET_LANGUAGES`:

```python
SUPPORTED_TARGET_LANGUAGES: set[str] = {
    "en-US", "en-GB",
    "es-ES",
    "it-IT",
    "pt-PT",
}
```

---

## 10.3.2 New Pydantic schemas

**File:** `backend/app/schemas/language.py` (new)

```python
from pydantic import BaseModel, field_validator

from app.schemas.auth import SUPPORTED_TARGET_LANGUAGES


class LanguageAddRequest(BaseModel):
    target_language: str

    @field_validator("target_language")
    @classmethod
    def validate_target_language(cls, v: str) -> str:
        if v not in SUPPORTED_TARGET_LANGUAGES:
            raise ValueError(f"Unsupported target language. Choose from: {SUPPORTED_TARGET_LANGUAGES}")
        return v


class LanguageSwitchRequest(BaseModel):
    target_language: str

    @field_validator("target_language")
    @classmethod
    def validate_target_language(cls, v: str) -> str:
        if v not in SUPPORTED_TARGET_LANGUAGES:
            raise ValueError(f"Unsupported target language. Choose from: {SUPPORTED_TARGET_LANGUAGES}")
        return v


class LanguagePlanInfo(BaseModel):
    id: int
    cefr_level: str | None
    progress_day: int
    total_days: int
    completion_pct: float


class LanguageProgressInfo(BaseModel):
    total_xp: int
    current_streak: int
    lessons_completed: int


class UserLanguageOut(BaseModel):
    target_language: str
    is_active: bool
    plan: LanguagePlanInfo | None
    progress: LanguageProgressInfo | None


class UserLanguageListResponse(BaseModel):
    languages: list[UserLanguageOut]
    all_supported_languages: list[str]
```

### Update `GenerateStudyPlanRequest`

**File:** `backend/app/schemas/study_plan.py`

```python
class GenerateStudyPlanRequest(BaseModel):
    cefr_level: str
    goals: list[str]
    duration_weeks: int
    days_per_week: int
    target_language: str | None = None  # NEW: if not provided, uses the active language
```

---

## 10.3.3 New router: `languages.py`

**File:** `backend/app/routers/languages.py`  
**Prefix:** `/api/languages`  
**Tag:** `languages`  
**Auth:** all endpoints require `require_subscription`.

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/languages` | Lists the languages the user is learning, with summarised progress |
| GET | `/api/languages/active` | Returns the user's current active language |
| POST | `/api/languages` | Adds a new language (`{ target_language: "it-IT" }`) |
| PUT | `/api/languages/active` | Switches the active language (`{ target_language: "it-IT" }`) |
| DELETE | `/api/languages/{target_language}` | Removes a language and its associated plans |

**`GET /api/languages` response:**

```json
{
  "languages": [
    {
      "target_language": "en-US",
      "is_active": true,
      "plan": {
        "id": 1,
        "cefr_level": "B1",
        "progress_day": 42,
        "total_days": 48,
        "completion_pct": 87.5
      },
      "progress": {
        "total_xp": 12500,
        "current_streak": 23,
        "lessons_completed": 38
      }
    },
    {
      "target_language": "it-IT",
      "is_active": false,
      "plan": null
    }
  ],
  "all_supported_languages": ["en-US", "en-GB", "es-ES", "it-IT", "pt-PT"]
}
```

`all_supported_languages` always returns all 5 system-supported languages. The frontend filters out those already in `languages[]` for the "Add new language" modal.

Register the new router in `backend/app/main.py`.

---

## 10.3.4 Refactor of existing endpoints

### `GET /api/study-plan/current`

- Use `get_active_study_plan` dependency instead of looking up the first active plan.
- Accept optional query param `?language=it-IT` to retrieve a specific language's plan (used by the frontend to preview before switching).

### `POST /api/study-plan/generate`

- Accept `target_language` in the body (from `GenerateStudyPlanRequest`). If not provided, use the active language.
- **Bug fix:** ensure `target_language` is correctly saved to the new `StudyPlan`.
- **Multi-language fix:** scope plan deactivation to the specific language (see critical fix below).

### `GET /api/study-plan/today`

- Use `get_active_study_plan` instead of reading `current_user.target_language`.

### `GET /api/flashcards/*` and `POST /api/flashcards/generate`

- Filter by `study_plan_id` of the active plan instead of just `user_id`.
- `POST /api/flashcards/generate`: assign the active plan's `study_plan_id` to generated flashcards.

### `GET /api/progress/*` and `GET /api/progress/competencies`

- Filter by `study_plan_id` of the active plan.

### `GET/POST /api/chat` and `/ws/conversation`

Use the active plan's `study_plan_id` to:
- Determine `target_language` for the system prompt.
- Store `study_plan_id` in `conversations` and `chat_history` rows.
- Filter `memories` by `study_plan_id`.

### `GET /api/listening/*` and `GET /api/reading/*`

Already used `target_language` from the plan. Update to retrieve it from the active plan via `get_active_study_plan`.

### `PATCH /api/auth/me`

When updating `target_language`:
- If the user already has that language in `user_languages`, activate it (without creating a new plan).
- If not, add a row to `user_languages` but **do not create a `StudyPlan`** — the user must go through the assessment flow.

### `POST /api/assessment/complete` and `POST /api/study-plan/generate` — critical multi-language fix

Both endpoints currently deactivate **all** active plans for the user before creating a new one. This destroys the English plan when creating a Spanish plan. **Must be scoped to the specific language:**

```python
# CURRENT CODE — BREAKS MULTI-LANGUAGE
old_result = await db.execute(
    select(StudyPlan).where(
        StudyPlan.user_id == current_user.id,
        StudyPlan.is_active.is_(True),
    )
)

# CORRECT — scope to target_language
old_result = await db.execute(
    select(StudyPlan).where(
        StudyPlan.user_id == current_user.id,
        StudyPlan.is_active.is_(True),
        StudyPlan.target_language == target_language,
    )
)
```

### `GET /api/assessment/start` and `POST /api/assessment/submit`

- `GET /api/assessment/start` must accept `?language=es-ES` query param (default `en-US`).
- LLM prompt: `"Generate an adaptive CEFR quiz with 20 questions for {target_language_name} language proficiency."`.
- Redis key must include the language to avoid collisions: `assessment:{user_id}:{target_language}` instead of `assessment:{user_id}`.

### `GET /api/assessment/level-test/questions/{plan_id}`

Replace `get_curriculum_units(plan.cefr_level)` with `get_curriculum(plan.target_language)` to retrieve the correct language's curriculum.

---

## New files in this phase

| File | Type |
|------|------|
| `backend/app/schemas/language.py` | New Pydantic schemas |
| `backend/app/routers/languages.py` | New router (5 endpoints) |

## Modified files in this phase

| File | Change |
|------|--------|
| `backend/app/schemas/auth.py` | Expand `SUPPORTED_TARGET_LANGUAGES` |
| `backend/app/schemas/study_plan.py` | Add `target_language` to `GenerateStudyPlanRequest` |
| `backend/app/routers/study_plan.py` | Use `get_active_study_plan`, scope deactivation, `target_language` param |
| `backend/app/routers/flashcards.py` | Filter by `study_plan_id` |
| `backend/app/routers/progress.py` | Filter by `study_plan_id` |
| `backend/app/routers/chat.py` | Use active plan, store `study_plan_id` |
| `backend/app/routers/conversation.py` | Use active plan, store `study_plan_id` |
| `backend/app/routers/listening.py` | Use `get_active_study_plan` |
| `backend/app/routers/reading.py` | Use `get_active_study_plan` |
| `backend/app/routers/auth.py` | Update `PATCH /me` for `user_languages` |
| `backend/app/routers/assessment.py` | Language param, scoped Redis key, scoped curriculum |
| `backend/app/main.py` | Register `languages` router |