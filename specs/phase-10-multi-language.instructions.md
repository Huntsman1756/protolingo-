---
description: "Phase 10 spec — Multi-language support: users can learn multiple languages, each with its own independent study plan, progress, flashcards, conversations, and memories."
applyTo: "backend/**, frontend/**, messages/**, specs/**"
---

# Phase 10 — Multi-Language Support

## Overview

FreeLingo moves from "one user = one language = one study plan" to an architecture where **each user can have multiple active study plans, one per language**, with progress, flashcards, conversations, memories, and competencies completely isolated by language.

### User flow

1. **Registration**: the user chooses their target language (`target_language`) during onboarding (same as now).
2. **Normal use**: the entire interface (dashboard, plan, lessons, flashcards, chat, exercises, etc.) corresponds to the active plan.
3. **Switch language**: a quick selector in the sidebar (flag + language name) allows switching between the languages the user is learning with a single click. When switching, the entire experience pivots to that language's plan. If the user only has one language, the selector is not shown.
4. **Add new language**: from Settings → "My Languages", the user sees a dedicated page with per-language cards (summarised progress) and an "Add new language" button that starts the language selection flow to create a new study plan. If the user accepts the new language, the flow continues with the assessment for that language as it works now. If they cancel, no new plan is created and they return to the languages page.
5. **Settings management**: the "My Languages" page shows all the user's languages with their CEFR level, streak, % completed, and allows switching the active language. It also allows deleting a language (with confirmation), which removes all progress associated with that language. The current active language cannot be deleted (the user must switch to another first). The last language cannot be deleted (if the user has only one, no delete button is shown).
6. **Change confirmation**: toast "Switching to Italian (A2)..." because the entire UI changes and the user must know what happened.
7. **Language-isolated data**: each language has its own progress, flashcards, conversations, memories, competencies, etc. There is no overlap between languages.
8. **Language-specific curriculum**: the curriculum for each language is different and adapted to that language (not just a literal translation of English).
9. **Adapted prompts**: system prompts (lesson generation, flashcards, conversations, exercises) are adapted to the target language using its name in English and in its own language.
10. **Supported languages**: initially 3 new languages are added (Spanish, Italian, Portuguese from Portugal) in addition to the existing English variants.

### Initially supported languages

**3 new languages** are added and displayed alphabetically in the selector according to the interface language:

| BCP-47 Code | Language |
|-------------|----------|
| `en-US` | English (American) — already exists |
| `en-GB` | English (British) — already exists |
| `es-ES` | Spanish (Spain) — **new** |
| `it-IT` | Italian — **new** |
| `pt-PT` | Portuguese (Portugal) — **new** |

Total supported BCP-47 codes: 5 (`en-US`, `en-GB`, `es-ES`, `it-IT`, `pt-PT`).

---

## Phase 10.1 — Database: migrations and new models

### 10.1.1 New table: `user_languages`

Relates users to the languages they are learning. Each row represents "user X is learning language Y".

| Column | Type | Notes |
|--------|------|-------|
| id | integer | PK, autoincrement |
| user_id | integer | FK → users (CASCADE), NOT NULL |
| target_language | string(10) | BCP-47, NOT NULL |
| is_active | boolean | `true` = current active language. Only one `true` per user. Default `true`. |
| created_at | datetime | Auto-set |

**Constraints:**
- `UNIQUE(user_id, target_language)` — a user cannot have the same language duplicated.
- Index on `(user_id, is_active)` for fast active language lookups.
- When inserting a new `user_language` with `is_active=true`, any other active language for that user must be deactivated (`is_active=false`) — logic in the service.

### 10.1.2 Migration of existing models

The migration `00XX_multi_language.py` modifies the following existing tables by adding the `target_language` (or `study_plan_id`) column:

#### Table `study_plans`

**Already has** `target_language` (added in Phase 4). No structural changes.

**New constraint:** partial `UNIQUE(user_id, target_language, is_active)` — only one active plan per user per language. Implemented as a partial unique index in PostgreSQL:

```sql
CREATE UNIQUE INDEX uq_active_plan_per_lang
ON study_plans (user_id, target_language)
WHERE is_active = true;
```

This replaces the current logic of "one active plan per user" with "one active plan per user per language".

#### Table `progress`

| Change | Detail |
|--------|--------|
| Add `study_plan_id` | integer, FK → study_plans (CASCADE), initially nullable, with index |
| Backfill | Assign `study_plan_id` from each user's active plan (the one with `is_active=true`) |
| Make NOT NULL | After backfill |

#### Table `flashcards`

| Change | Detail |
|--------|--------|
| Add `study_plan_id` | integer, FK → study_plans (CASCADE), initially nullable, with index |
| Backfill | Assign `study_plan_id` from each user's active plan |
| Make NOT NULL | After backfill |

#### Table `conversations`

| Change | Detail |
|--------|--------|
| Add `study_plan_id` | integer, FK → study_plans (SET NULL), nullable (old conversations remain without a plan) |
| No backfill | Existing conversations remain with `study_plan_id=NULL` |

#### Table `chat_history`

| Change | Detail |
|--------|--------|
| Add `study_plan_id` | integer, FK → study_plans (SET NULL), nullable |
| No backfill | Existing rows remain with `study_plan_id=NULL` |

#### Table `user_competencies`

| Change | Detail |
|--------|--------|
| Add `study_plan_id` | integer, FK → study_plans (CASCADE), initially nullable |
| Backfill | Assign `study_plan_id` from each user's active plan |
| Make NOT NULL | After backfill |

#### Table `memories`

| Change | Detail |
|--------|--------|
| Add `study_plan_id` | integer, FK → study_plans (SET NULL), nullable |
| No backfill | Existing memories remain without an assigned plan (shared across languages) |

#### Table `llm_usage`

| Change | Detail |
|--------|--------|
| Add `study_plan_id` | integer, FK → study_plans (SET NULL), nullable |
| No backfill | Existing usage records remain without an assigned plan |

### 10.1.3 `target_language` column in `User`

The `target_language` column in `users` is **kept** as the **preferred/default language**. Its purpose changes:

- During registration/onboarding: set to the first language chosen.
- When switching the active language: automatically updated to the new active plan's language.
- It is NOT the source of truth for the active language — `user_languages.is_active=true` is. It exists for backward compatibility and as a fallback.

### 10.1.4 SQLAlchemy model: `UserLanguage`

**File:** `backend/app/models/user_language.py`

```python
from __future__ import annotations

from datetime import UTC, datetime

from sqlalchemy import Boolean, DateTime, ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base


class UserLanguage(Base):
    __tablename__ = "user_languages"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    user_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True
    )
    target_language: Mapped[str] = mapped_column(String(10), nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime, nullable=False, default=lambda: datetime.now(UTC).replace(tzinfo=None)
    )
```

### 10.1.5 Changes to existing SQLAlchemy models

Each model listed in 10.1.2 receives the corresponding new column. Example for `Progress`:

```python
# Progress — add:
study_plan_id: Mapped[int] = mapped_column(
    Integer, ForeignKey("study_plans.id", ondelete="CASCADE"), nullable=False, index=True
)
```

Same pattern for `Flashcard`, `Conversation`, `ChatHistory`, `UserCompetency`, `Memory`, `LLMUsage`.

### 10.1.6 Alembic migration

**File:** `backend/alembic/versions/00XX_multi_language.py`

Sequential revision ID. Down revision: the latest existing migration (currently `0028_trial_used`).

The migration:
1. Creates the `user_languages` table.
2. Adds `study_plan_id` columns to the 7 listed tables.
3. Backfills `study_plan_id` using each user's active plan.
4. Adds `NOT NULL` where applicable.
5. Creates the partial index `uq_active_plan_per_lang`.

---

## Phase 10.2 — Backend: services and multi-language prompts

### 10.2.1 Refactor of `language_helpers.py`

**File:** `backend/app/services/language_helpers.py`

Expanded to support any language, not just English:

```python
# Diccionario de idioma BCP-47 → nombre en el propio idioma + nombre en inglés
_LANGUAGE_INFO: dict[str, dict[str, str]] = {
    "en-US": {"name": "English (US)", "self_name": "English (US)", "iso639": "en", "flag": "🇺🇸"},
    "en-GB": {"name": "English (UK)", "self_name": "English (UK)", "iso639": "en", "flag": "🇬🇧"},
    "es-ES": {"name": "Spanish", "self_name": "Español", "iso639": "es", "flag": "🇪🇸"},
    "it-IT": {"name": "Italian", "self_name": "Italiano", "iso639": "it", "flag": "🇮🇹"},
    "pt-PT": {"name": "Portuguese", "self_name": "Português", "iso639": "pt", "flag": "🇵🇹"},
}
```

**New functions:**

| Function | Signature | Description |
|----------|-----------|-------------|
| `get_language_name(target_language)` | `str → str` | Returns `"Italian"`, `"Spanish"`, etc. |
| `get_language_self_name(target_language)` | `str → str` | Returns `"Italiano"`, `"Español"`, etc. |
| `get_iso639(target_language)` | `str → str` | `"it-IT" → "it"` (unchanged) |
| `get_language_flag(target_language)` | `str → str` | Flag emoji |

`get_english_variant()` is removed (obsolete). Prompts will use `get_language_name()` and `get_language_self_name()`.

### 10.2.2 Multi-language LLM prompts

All system prompts are parameterised to be language-agnostic. `{target_language_name}` (e.g. "Italian", "Spanish") and `{target_language_self_name}` (e.g. "Italiano", "Español") are used.

#### `lesson_generator.py`

```
BEFORE: "You are an expert English teacher..."
NOW:    "You are an expert {target_language_name} teacher..."
```

The lesson is generated entirely in the target language. The prompt receives `target_language_name` and `iso639`.

**Note — `VALID_GRAMMAR_SLUGS`**: this constant is built at import time from the English curriculum and passed to the prompt as a list of valid slugs. With different languages, the grammar slugs in the curriculum will differ. It must be computed dynamically per language when invoking generation: `get_valid_grammar_slugs(target_language)` instead of the global constant, using `get_curriculum(target_language)`.

#### `flashcard_sm2.py`

```
BEFORE: "Generate {count} English vocabulary flashcards..."
NOW:    "Generate {count} {target_language_name} vocabulary flashcards..."
```

Flashcards contain the word in the target language and the translation in the user's `native_language`.

#### `conversation_pipeline.py`

```
BEFORE: "You are an encouraging and patient English conversation partner named FreeLingo..."
        "ALWAYS respond in English, regardless of the language the student uses..."
NOW:    "You are an encouraging and patient {target_language_name} conversation partner named FreeLingo..."
        "ALWAYS respond in {target_language_name}, regardless of the language the student uses..."
```

The conversation takes place in the target language. **Important**: the `ALWAYS respond in English` rule hardcoded in the prompt must be generalised to `ALWAYS respond in {target_language_name}`.

#### `chat.py` (TUTOR_SYSTEM_PROMPT)

```
BEFORE: "You are an encouraging and patient English language tutor named FreeLingo..."
        "ALWAYS respond in English, regardless of the language the student writes in..."
NOW:    "You are an encouraging and patient {target_language_name} language tutor named FreeLingo..."
        "ALWAYS respond in {target_language_name}, regardless of the language the student writes in..."
```

The chat tutor adapts the language to the active plan. Without this change, the tutor would always respond in English even if the active language were Spanish or Italian. `target_language_name` is obtained from the active plan via `get_language_name(plan.target_language)` and passed when building the prompt.

#### `listening_service.py` / `reading_service.py`

```
BEFORE: "You are an English language content creator..."
NOW:    "You are a {target_language_name} language content creator..."
```

Content (texts, questions) is generated in the target language.

### 10.2.3 `study_plan_generator.py`

The plan title becomes dynamic:

```python
# BEFORE
title = f"English {cefr_level} — {duration_weeks}-week programme"

# NOW
title = f"{get_language_name(target_language)} {cefr_level} — {duration_weeks}-week programme"
```

The generator accepts a new `target_language: str` parameter in `generate_study_plan()`.

### 10.2.4 `progress_service.py`

All functions accept `study_plan_id: int` as a parameter. Filtering is done by plan instead of by global user:

```python
# BEFORE
async def update_daily_progress(db: AsyncSession, user_id: int, ...)

# NOW
async def update_daily_progress(db: AsyncSession, user_id: int, study_plan_id: int, ...)
```

**Note — `upsert_unit_competency`**: this function also operates on `user_competencies`, which now has `study_plan_id`. It must accept and use that parameter to avoid mixing competencies from different languages:

```python
# BEFORE
async def upsert_unit_competency(db, user_id, unit_id, ...)

# NOW
async def upsert_unit_competency(db, user_id, study_plan_id, unit_id, ...)
```

### 10.2.5 `memory_service.py`

`get_user_memories()` accepts an optional `study_plan_id`. If `None`, returns all user memories (backward compatibility). If provided, filters by plan.

`MEMORY_SYSTEM_INSTRUCTION` currently contains `"struggles with English, or anything that would help personalise future lessons"`. It must be updated to be language-agnostic: `"struggles with {target_language_name}, or anything that would help personalise future lessons"`. The instruction text becomes a function that accepts `target_language_name` when building the system prompt, instead of being a module-level constant.

### 10.2.6 New service: `user_language_service.py`

**File:** `backend/app/services/user_language_service.py`

| Function | Description |
|----------|-------------|
| `get_active_language(db, user_id) → UserLanguage \| None` | Returns the user's active language |
| `get_user_languages(db, user_id) → list[UserLanguage]` | All user languages |
| `add_language(db, user_id, target_language) → UserLanguage` | Adds a new language (creates `UserLanguage` + deactivates others) |
| `switch_language(db, user_id, target_language) → UserLanguage` | Switches the active language |
| `remove_language(db, user_id, target_language) → bool` | Removes a language (and its associated plans in cascade) |

### 10.2.7 New FastAPI dependency: `get_active_study_plan`

**File:** `backend/app/core/deps.py` (add alongside existing dependencies in that module; do **not** create a new `dependencies.py`)

```python
async def get_active_study_plan(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> StudyPlan:
    """Returns the active study plan according to the user's active language."""
    active_lang = await get_active_language(db, current_user.id)
    if not active_lang:
        raise HTTPException(status_code=404, detail="No active language set")
    plan = await db.execute(
        select(StudyPlan).where(
            StudyPlan.user_id == current_user.id,
            StudyPlan.target_language == active_lang.target_language,
            StudyPlan.is_active == True,
        )
    )
    plan = plan.scalar_one_or_none()
    if not plan:
        raise HTTPException(status_code=404, detail="No active study plan found")
    return plan
```

---

## Phase 10.3 — API: new endpoints and refactor of existing ones

### 10.3.1 Language validation

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

### 10.3.2 New router: `languages.py`

**File:** `backend/app/routers/languages.py`  
**Prefix:** `/api/languages`  
**Tag:** `languages`  
**Auth:** all endpoints require `require_subscription`.

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/languages` | Lists the languages the user is learning, with summarised progress |
| GET | `/api/languages/active` | Returns the user's current active language |
| POST | `/api/languages` | Adds a new language (`{ target_language: "it-IT" }`) and creates a `user_languages` entry |
| PUT | `/api/languages/active` | Switches the active language (`{ target_language: "it-IT" }`) |
| DELETE | `/api/languages/{target_language}` | Removes a language and its associated plans |

**`GET /api/languages` response schema:**

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

`all_supported_languages` always returns all 5 system-supported languages, regardless of which ones the user already has. The frontend filters out those already in `languages[]` for the "Add new language" modal.

### 10.3.3 Refactor of existing endpoints

#### `GET /api/study-plan/current`

Now uses `get_active_study_plan` instead of looking up the first active plan. Returns the active language's plan.

Accepts optional query param `?language=it-IT` to retrieve a specific language's plan (used by the frontend to preview before switching).

#### `POST /api/study-plan/generate`

**Bug fix included**: now correctly saves `target_language`.

Accepts `target_language` in the body. If not provided, uses the active language's `target_language`.

#### `GET /api/study-plan/today`

Uses `get_active_study_plan` instead of reading `current_user.target_language`.

#### `GET /api/flashcards/*`

Filters by `study_plan_id` of the active plan instead of just `user_id`.

#### `POST /api/flashcards/generate`

Assigns the active plan's `study_plan_id` to generated flashcards.

#### `GET /api/progress/*`

Filters by `study_plan_id` of the active plan. Progress is per language.

#### `GET /api/progress/competencies`

Filters by `study_plan_id`.

#### `GET/POST /api/chat`, `/ws/conversation`

Use the active plan's `study_plan_id` to:
- Determine `target_language` for the system prompt
- Store `study_plan_id` in `conversations` and `chat_history`
- Filter `memories` by `study_plan_id`

#### `GET /api/listening/*`, `GET /api/reading/*`

Already used `target_language` from the plan. Updated to retrieve it from the active plan.

#### `PATCH /api/auth/me`

When updating `target_language`, `user_languages` is also updated:
- If the user already has that language, it is activated (without creating a new plan).
- If not, an entry is added to `user_languages` but **no `StudyPlan` is created** — the user must go through the assessment flow for that language. This avoids creating empty plans from profile editing.

#### `POST /api/assessment/complete` and `POST /api/study-plan/generate` — deactivation scoped by language

Both endpoints currently deactivate **all** active plans for the user before creating a new one. With multi-language support, this would destroy the English plan when creating a Spanish plan. It must be scoped to the specific language:

```python
# CURRENT CODE — BREAKS MULTI-LANGUAGE
old_result = await db.execute(
    select(StudyPlan).where(StudyPlan.user_id == current_user.id, StudyPlan.is_active.is_(True))
)
for old in old_result.scalars().all():
    old.is_active = False

# CORRECT — also filter by target_language
old_result = await db.execute(
    select(StudyPlan).where(
        StudyPlan.user_id == current_user.id,
        StudyPlan.is_active.is_(True),
        StudyPlan.target_language == target_language,
    )
)
for old in old_result.scalars().all():
    old.is_active = False
```

#### `GET /api/assessment/start` and `POST /api/assessment/submit` — assessment language

Currently the assessment generates questions in English regardless of the target language. With multi-language support:

- `GET /api/assessment/start` must accept a `?language=es-ES` query param (default `en-US`) to know which language to evaluate the user in.
- The LLM prompt must specify the language: `"Generate an adaptive CEFR quiz with 20 questions for {target_language_name} language proficiency."`.
- The Redis key must include the language to avoid collisions if the user has two assessments in progress simultaneously: `assessment:{user_id}:{target_language}` (instead of `assessment:{user_id}`).

#### `GET /api/assessment/level-test/questions/{plan_id}` — curriculum per language

This endpoint calls `get_curriculum_units(plan.cefr_level)` to obtain grammar points and vocabulary sets for the active plan. It must use `get_curriculum(plan.target_language)` instead, to retrieve the correct language's curriculum and not always English.

---

## Phase 10.4 — Frontend: core infrastructure

### 10.4.1 Supported languages configuration

**File:** `frontend/src/lib/target-languages.ts`

```typescript
export interface TargetLanguage {
  code: string        // BCP-47
  name: string        // "Italiano", "Español"
  nameEn: string      // "Italian", "Spanish"
  flag: string        // Emoji flag
  flagPath: string    // Path under /public/flags/
  iso639: string      // "it", "es"
}

export const SUPPORTED_TARGET_LANGUAGES: TargetLanguage[] = [
  { code: 'en-US', name: 'English (US)', nameEn: 'English (US)', flag: '🇺🇸', flagPath: '/flags/usa.jpg', iso639: 'en' },
  { code: 'en-GB', name: 'English (UK)', nameEn: 'English (UK)', flag: '🇬🇧', flagPath: '/flags/uk.jpg', iso639: 'en' },
  { code: 'es-ES', name: 'Español', nameEn: 'Spanish', flag: '🇪🇸', flagPath: '/flags/spain.jpeg', iso639: 'es' },
  { code: 'it-IT', name: 'Italiano', nameEn: 'Italian', flag: '🇮🇹', flagPath: '/flags/italy.jpeg', iso639: 'it' },
  { code: 'pt-PT', name: 'Português', nameEn: 'Portuguese', flag: '🇵🇹', flagPath: '/flags/portugal.jpeg', iso639: 'pt' },
]

export function getLanguageByCode(code: string): TargetLanguage | undefined {
  return SUPPORTED_TARGET_LANGUAGES.find(l => l.code === code)
}
```

### 10.4.2 Auth store and Language store

**File:** `frontend/src/store/auth.ts`

- `target_language?: string` is kept in `User` (current active language).
- Added to the store:
  ```typescript
  activeLanguage: TargetLanguage | null
  userLanguages: UserLanguageInfo[]
  setActiveLanguage: (lang: TargetLanguage) => void
  setUserLanguages: (langs: UserLanguageInfo[]) => void
  fetchUserLanguages: () => Promise<void>
  switchLanguage: (code: string) => Promise<void>
  ```

**File:** `frontend/src/store/language.ts` (new)

Alternatively, a separate store for language logic. Contains:

```typescript
interface LanguageStore {
  activeLanguage: TargetLanguage | null       // Current active language
  userLanguages: UserLanguageInfo[]           // User's languages with progress
  supportedLanguages: TargetLanguage[]        // System-supported languages
  isSwitching: boolean                        // Switch animation
  fetchLanguages: () => Promise<void>
  switchLanguage: (code: string) => Promise<void>
  addLanguage: (code: string) => Promise<void>
  removeLanguage: (code: string) => Promise<void>
}
```

### 10.4.3 Language Switcher in sidebar

**File:** `frontend/src/app/(app)/layout.tsx`

A `LanguageSwitcher` component is added at the top of the sidebar (below the app logo/name, before the navigation items).

**Component:** `frontend/src/components/LanguageSwitcher.tsx`

```tsx
// Behaviour:
// - Shows the flag (emoji) + name of the active language
// - Dropdown with all user languages
// - On switch: calls PUT /api/languages/active → refreshes current page
// - Confirmation toast: "Switching to Italian (A2)..."
// - If only 1 language: no dropdown shown, only an indicator
// - Loading spinner during the switch
```

Visual design:
- Compact button with flag + name (`🇮🇹 Italiano`) and a chevron.
- Style: `text-fl-muted hover:text-fl-fg`, with a subtle hover background.
- Dropdown: list of languages with CEFR level indicator and a checkmark on the active one.

### 10.4.4 Updated mappers

**File:** `frontend/src/lib/mappers.ts`

Adds mapping of `UserLanguage` from the API to the frontend type, including summarised progress information.

---

## Phase 10.5 — Frontend: pages

### 10.5.1 Onboarding (update)

**File:** `frontend/src/app/(auth)/onboarding/page.tsx`

The `TargetLanguageSelector` is updated to show **all languages** (not just English variants):

```
Select the language you want to learn
┌──────────┐ ┌──────────┐ ┌──────────┐
│ �🇸       │ │ 🇬🇧       │ │ 🇪🇸       │
│ English  │ │ English  │ │ Español  │
│ (US)     │ │ (UK)     │ │ ...      │
└──────────┘ └──────────┘ └──────────┘
┌──────────┐ ┌──────────┐
│ 🇮🇹       │ │ 🇵🇹       │
│ Italiano │ │ Português│
│ ...      │ │ ...      │
└──────────┘ └──────────┘
```

Card grid (3 columns on desktop, 2 on tablet, 1 on mobile). Each card shows:
- Flag (JPG image from the `/flags/` directory)
- Language name (in its own language + in English below)
- Brief description

**Change in `TargetLanguageSelector`**: receives the full `SUPPORTED_TARGET_LANGUAGES` list as a prop or imports it directly.

### 10.5.2 "My Languages" Settings page

**File:** `frontend/src/app/(app)/settings/languages/page.tsx`

New settings sub-page accessible from `/settings/languages`. Same structure as `/settings/memories` (breadcrumb to `/settings`).

**Content:**

```
← Back to Settings

MY LANGUAGES                   [+ Add new language]

┌─────────────────────────────────────────────┐
│ 🇺🇸 English (US)                   [ACTIVE]  │
│ Level: B1 · 87% completed                   │
│ Total XP: 12,500 · Streak: 23 days          │
│ Lessons: 38/48 · Flashcards: 156            │
│                              [View details] │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ 🇮🇹 Italiano                         A1      │
│ Level: A1 · 12% completed                   │
│ Total XP: 850 · Streak: 3 days              │
│ Lessons: 3/40 · Flashcards: 24              │
│             [Switch to this] [Delete]       │
└─────────────────────────────────────────────┘
```

**"Add new language" button**: opens a modal with the language selector (same component as onboarding) showing only languages the user has not yet added. When one is selected:
1. `POST /api/languages` → creates the `UserLanguage`
2. Redirects to the assessment flow for that language (`/onboarding?language=it-IT&new=true`)
3. The assessment creates the `StudyPlan` with the appropriate `target_language`.

**"Switch to this" button**:
1. `PUT /api/languages/active` with `{ target_language }`
2. Refreshes the store and redirects to the new language's dashboard.
3. Toast: "Switched to Italian (A2)".

**"Delete" button**: confirmation modal → `DELETE /api/languages/{code}` → deletes in cascade: plan, lessons, flashcards, progress, etc.

### 10.5.3 Plan page (update)

**File:** `frontend/src/app/(app)/plan/page.tsx`

- Shows the language name and CEFR level in the header: "Italian — B1".
- All called endpoints already filter by the active plan's `study_plan_id` (transparent).

### 10.5.4 Dashboard (update)

**File:** `frontend/src/app/(app)/dashboard/page.tsx`

- The header includes the active language: "Hello, Maria — you are learning Italian (B1)".
- Stats (XP, streak, progress) correspond to the active language.
- If the user has multiple languages and the current one has 0 progress (just switched), a normal state with the new language's data is shown.

### 10.5.5 Chat page (update)

**File:** `frontend/src/app/(app)/chat/page.tsx`

- Conversations are filtered by the active plan's `study_plan_id`.
- The history shows only conversations from the active language.
- The system prompt includes the language name.

### 10.5.6 Conversation page (update)

**File:** `frontend/src/components/conversation/ConversationMode.tsx`

- Same as chat: filtered by active language.

### 10.5.7 Flashcard page (update)

**File:** `frontend/src/app/(app)/flashcards/page.tsx`

- Flashcards shown are only those from the active `study_plan_id`.
- Generation automatically assigns the correct `study_plan_id`.

### 10.5.8 Progress page (update)

**File:** `frontend/src/app/(app)/progress/page.tsx`

- Competencies and stats filtered by the active language's `study_plan_id`.
- Shows the language name in the header.

---

## Phase 10.6 — Curriculum and language data

### 10.6.1 Backend: curriculum data

**File:** `backend/app/data/curriculum.py` (update)

```python
# Imports the curriculum for the given target_language
def get_curriculum(target_language: str) -> list[CurriculumUnit]:
    iso = get_iso639(target_language)
    if iso == "en":
        from app.data.en.curriculum import CURRICULUM
        return CURRICULUM
    elif iso == "es":
        from app.data.es.curriculum import CURRICULUM
        return CURRICULUM
    elif iso == "it":
        from app.data.it.curriculum import CURRICULUM
        return CURRICULUM
    elif iso == "pt":
        from app.data.pt.curriculum import CURRICULUM
        return CURRICULUM
    # fallback
    from app.data.en.curriculum import CURRICULUM
    return CURRICULUM
```

### 10.6.2 New curriculum directories

A directory with the same structure as `backend/app/data/en/` is created for each new language:

- `backend/app/data/es/` — Spanish curriculum
- `backend/app/data/it/` — Italian curriculum
- `backend/app/data/pt/` — Portuguese curriculum

Each directory contains exactly the same files as `en/`:

| File | Description |
|------|-------------|
| `__init__.py` | Python package |
| `_types.py` | Shared types (can re-export from `en/_types.py` if identical) |
| `curriculum.py` | Entry point: imports and re-exports the assembled `CURRICULUM` |
| `curriculum_a1.py` | CEFR A1 units in the target language |
| `curriculum_a2.py` | CEFR A2 units in the target language |
| `curriculum_b1.py` | CEFR B1 units in the target language |
| `curriculum_b2.py` | CEFR B2 units in the target language |
| `curriculum_c1.py` | CEFR C1 units in the target language |
| `curriculum_c2.py` | CEFR C2 units in the target language |

The English curriculum (`backend/app/data/en/`) already exists and is not modified.

### 10.6.3 Frontend: static data per language

**File:** `frontend/src/data/curriculum.ts` (update)

Becomes a dynamic entry point that loads data according to the active language:

```typescript
export function getCurriculum(targetLanguage: string): CurriculumData {
  const iso = targetLanguage.split('-')[0]
  switch (iso) {
    case 'en': return enCurriculum
    case 'es': return esCurriculum
    case 'it': return itCurriculum
    case 'pt': return ptCurriculum
    default: return enCurriculum
  }
}
```

Parallel directories are created:
- `frontend/src/data/es/curriculum.ts`
- `frontend/src/data/es/grammar.ts`
- `frontend/src/data/es/vocabulary.ts`
- `frontend/src/data/es/phrasebook.ts`
- `frontend/src/data/es/assessment-bank.ts`

(Same for `it/` and `pt/`)

### 10.6.4 Flags

Already added to `frontend/public/flags/`:
- `spain.jpeg`
- `italy.jpeg`
- `portugal.jpeg`

(`usa.jpg` and `uk.jpg` already existed.)

---

## Phase 10.7 — i18n: new translation keys

### 10.7.1 `languages` namespace

Add to all 10 locale files (`messages/*.json`):

```json
"languages": {
  "myLanguages": "Mis Idiomas",
  "addLanguage": "Añadir nuevo idioma",
  "selectLanguage": "Selecciona qué idioma quieres aprender",
  "activeLanguage": "Activo",
  "switchTo": "Cambiar a este",
  "switching": "Cambiando a {language}...",
  "switched": "Cambiado a {language} ({level})",
  "removeLanguage": "Eliminar idioma",
  "removeConfirmTitle": "¿Eliminar {language}?",
  "removeConfirmMessage": "Se eliminará todo el progreso, lecciones, flashcards y datos asociados a este idioma. Esta acción no se puede deshacer.",
  "removeConfirmButton": "Eliminar",
  "noLanguages": "No tienes idiomas configurados.",
  "progressLabel": "Progreso",
  "levelLabel": "Nivel",
  "xpLabel": "XP total",
  "streakLabel": "Racha",
  "lessonsLabel": "Lecciones",
  "flashcardsLabel": "Flashcards",
  "viewDetails": "Ver detalles",
  "supportedLanguages": "Idiomas disponibles"
}
```

### 10.7.2 Update `onboarding`

```json
"onboarding": {
  "headline": "¿Qué idioma quieres aprender?",
  "subtitle": "Elige el idioma que quieres estudiar. Podrás añadir más idiomas después desde Ajustes.",
  "cta": "Empezar a aprender",
  "newLanguageHeadline": "¿Qué nuevo idioma quieres aprender?",
  "newLanguageSubtitle": "Se creará un nuevo plan de estudios para este idioma."
}
```

### 10.7.3 Update `nav` / sidebar

```json
"nav": {
  "switchLanguage": "Cambiar idioma"
}
```

### 10.7.4 Update `targetLanguages`

Add entries for the new languages:

```json
"targetLanguages": {
  "en-US": "Inglés (americano)",
  "en-US-description": "Inglés estándar de EE.UU., usado en negocios internacionales y medios.",
  "en-GB": "Inglés (británico)",
  "en-GB-description": "Inglés del Reino Unido, referencia para exámenes internacionales (IELTS, Cambridge).",
  "es-ES": "Español (España)",
  "es-ES-description": "Español de España, hablado por más de 500 millones de personas en el mundo.",
  "it-IT": "Italiano",
  "it-IT-description": "Italiano estándar, lengua de cultura, arte y gastronomía.",
  "pt-PT": "Portugués (Portugal)",
  "pt-PT-description": "Portugués de Portugal, lengua oficial en Portugal y Brasil."
}
```

---

## Phase 10.8 — Pydantic Schemas

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

Add optional `target_language` field:

```python
class GenerateStudyPlanRequest(BaseModel):
    cefr_level: str
    goals: list[str]
    duration_weeks: int
    days_per_week: int
    target_language: str | None = None  # NEW: if not provided, uses the active language
```

---

## Phase 10.9 — Tests

### 10.9.1 Backend tests

**File:** `backend/tests/test_multi_language.py` (new)

Test cases:

| Test | Description |
|------|-------------|
| `test_add_new_language` | POST /api/languages creates UserLanguage and marks it active |
| `test_add_duplicate_language` | POST with an existing language → 409 |
| `test_switch_language` | PUT /api/languages/active switches the active language |
| `test_list_languages` | GET /api/languages returns all languages with progress |
| `test_remove_language_cascades` | DELETE /api/languages/{code} removes plan, lessons, etc. |
| `test_active_plan_per_language` | Two simultaneously active languages with independent plans |
| `test_progress_isolated_by_language` | XP and streak are independent per language |
| `test_flashcards_isolated_by_language` | Flashcards filtered by study_plan_id |
| `test_conversations_isolated_by_language` | Conversations filtered by active language |
| `test_memories_isolated_by_language` | Memories filtered by study_plan_id |
| `test_curriculum_per_language` | get_curriculum() returns data for the correct language |
| `test_prompt_language_agnostic` | Prompts include the correct language name |
| `test_onboarding_creates_user_language` | Registration + onboarding automatically creates UserLanguage |
| `test_supported_languages_validation` | POST with unsupported language → 422 |
| `test_assessment_language_param` | GET /assessment/start?language=es-ES generates questions in Spanish |
| `test_assessment_redis_key_isolation` | Two ongoing assessments (different languages) do not overwrite each other |
| `test_plan_deactivation_scoped_by_language` | Creating a Spanish plan does not deactivate the active English plan |
| `test_chat_prompt_uses_target_language` | TUTOR_SYSTEM_PROMPT uses the plan's active language |

### 10.9.2 Update to existing tests

All tests that create users, study plans, flashcards, progress, etc. must be updated to include `study_plan_id` where applicable and create the associated `UserLanguage`.

**Affected files:**
- `backend/tests/test_auth.py`
- `backend/tests/test_study_plan.py`
- `backend/tests/test_flashcards.py`
- `backend/tests/test_lessons.py`
- `backend/tests/test_chat.py`
- `backend/tests/test_conversation.py`
- `backend/tests/test_listening.py`
- `backend/tests/test_reading.py`
- `backend/tests/test_progress.py`
- `backend/tests/test_memories.py`
- `backend/tests/test_assessment.py`

---

## Phase 10.10 — Finalisation

### 10.10.1 Documentation update

| File | Change |
|------|--------|
| `specs/database-models.instructions.md` | Add `user_languages`, document new `study_plan_id` columns |
| `specs/api-endpoints.instructions.md` | Document new `/api/languages` router (5 endpoints) and changes to existing endpoints |
| `specs/services.instructions.md` | Document `user_language_service.py`, changes to `language_helpers.py` and `progress_service.py` |
| `specs/architecture.instructions.md` | Update data flow: multi-plan, active language, `get_active_study_plan` dependency |
| `specs/study-plan.instructions.md` | Update: multiple active plans (one per language), `uq_active_plan_per_lang` constraint |
| `specs/phase-4-target-language.instructions.md` | Add note: "Phase 10 extends this to multi-language per user" |
| `AGENTS.md` | Update version, add reference to Phase 10 |

### 10.10.2 CHANGELOG and version

- **Version:** `1.7.0` (minor bump — major new feature)
- **CHANGELOG:** full entry documenting the phase

### 10.10.3 Roadmap update

**File:** `specs/roadmap.instructions.md`

Add the Phase 10 section with milestones and completion criteria.

---

## New files summary

| File | Type |
|------|------|
| `backend/app/models/user_language.py` | SQLAlchemy model |
| `backend/app/services/user_language_service.py` | Service |
| `backend/app/routers/languages.py` | Router (5 endpoints) |
| `backend/app/schemas/language.py` | Pydantic schemas |
| `backend/alembic/versions/00XX_multi_language.py` | Alembic migration |
| `backend/tests/test_multi_language.py` | Tests |
| `backend/app/data/es/__init__.py` | Python package |
| `backend/app/data/es/_types.py` | Types (can re-export from `en/`) |
| `backend/app/data/es/curriculum.py` | ES curriculum entry point |
| `backend/app/data/es/curriculum_a1.py` … `curriculum_c2.py` | CEFR A1–C2 units in Spanish (6 files) |
| `backend/app/data/it/` | Same for Italian (8 files) |
| `backend/app/data/pt/` | Same for Portuguese (8 files) |
| `frontend/src/store/language.ts` | Zustand store |
| `frontend/src/components/LanguageSwitcher.tsx` | Sidebar selector |
| `frontend/src/app/(app)/settings/languages/page.tsx` | My Languages page |
| `frontend/src/data/es/curriculum.ts` | ES frontend curriculum |
| `frontend/src/data/es/grammar.ts` | ES frontend grammar |
| `frontend/src/data/es/vocabulary.ts` | ES frontend vocabulary |
| `frontend/src/data/es/phrasebook.ts` | ES frontend phrasebook |
| `frontend/src/data/es/assessment-bank.ts` | ES frontend assessment bank |
| `frontend/src/data/it/` | Same for Italian (5 files) |
| `frontend/src/data/pt/` | Same for Portuguese (5 files) |
| `frontend/public/flags/spain.jpeg` | Spain flag ✅ |
| `frontend/public/flags/italy.jpeg` | Italy flag ✅ |
| `frontend/public/flags/portugal.jpeg` | Portugal flag ✅ |