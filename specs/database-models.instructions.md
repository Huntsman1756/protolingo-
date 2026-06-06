---
description: "Database models reference for FreeLingo: 19 SQLAlchemy ORM models with full schema details, relationships, constraints, and business rules."
applyTo: "backend/app/models/**, backend/alembic/**"
---

# Database Models — FreeLingo

All models use SQLAlchemy 2.0 declarative style with `Mapped[T]` type annotations and async engine (`asyncpg` driver). PostgreSQL JSON columns store structured content for lessons, plans, exercises, and skill scores.

## User (`users`)

Registration, authentication, and user preferences.

| Column | Type | Notes |
|--------|------|-------|
| id | integer | Primary key |
| username | string | Unique, used for login |
| email | string | Unique, nullable, for account recovery |
| display_name | string | Shown in UI |
| hashed_password | string | bcrypt hash |
| role | string | `"admin"` or `"user"` |
| native_language | string | e.g. `"es"`, `"fr"` — used for flashcard translations and tutor feedback |
| target_language | string | BCP-47 tag, e.g. `"en-US"` (default) or `"en-GB"` — the language the user is learning |
| is_active | boolean | False = account disabled by admin |
| is_verified | boolean | False until email verified (default False; existing users set to True on migration) |
| conversation_max_duration | integer | Max voice session duration in seconds (default 1800) |
| conversation_inactivity_timeout | integer | Seconds of silence before disconnect (default 180) |
| conversation_weekly_sessions | integer | Counter reset each week (default 0) |
| conversation_daily_minutes | integer | Limit in minutes per day (default 30) |
| conversation_weekly_minutes | integer | Limit in minutes per week (default 90) |
| monthly_tokens_limit | integer | Max LLM tokens per billing period (default 1 000 000) |
| stripe_customer_id | string (nullable) | Stripe customer ID (set when subscription is created) |
| subscription_status | string | Subscription state: `none` (default), `trialing`, `active`, `past_due`, `canceled` |
| subscription_ends_at | datetime (nullable) | When the current subscription period ends |
| trial_used | boolean | `true` once the user has started or completed a trial; prevents repeated free trials (default `false`) |
| avatar | text (nullable) | Base64-encoded avatar image |
| bio | text (nullable) | User-written profile bio |
| learning_goals | text (nullable) | JSON-encoded array of learning goal strings |
| created_at | datetime | Auto-set on creation |
| last_login | datetime (nullable) | Updated on each successful login |

**Registration rules:**
- First registered user becomes admin automatically when `FIRST_USER_IS_ADMIN=true` (default).
- `ALLOW_REGISTRATION=false` blocks public signups; admin creates users or generates single-use invite links (48h expiry in Redis).
- `BLOCKED_EMAIL_DOMAINS` is a JSON array of lowercase domain strings (e.g. `["yopmail.com","mailinator.com"]`). Registrations using an email from any listed domain are rejected with HTTP 422 before any DB access. Defaults to `[]` (no blocking).
- `POST /register` returns an `access_token` + sets the refresh token cookie so the frontend can redirect directly to `/onboarding` without an intermediate login.
- On `/onboarding` the user chooses their `target_language`; the choice is saved via `PATCH /me` before accessing the app.

## UserLanguage (`user_languages`)

Relates users to the languages they are learning. One row per user per language. Added in Phase 10.

| Column | Type | Notes |
|--------|------|-------|
| id | integer | Primary key, autoincrement |
| user_id | integer | FK → users (CASCADE), NOT NULL |
| target_language | string(10) | BCP-47 tag, NOT NULL |
| is_active | boolean | `true` = current active language. Only one `true` per user. Default `true`. |
| created_at | datetime | Auto-set |

**Constraints:**
- `UNIQUE(user_id, target_language)` — a user cannot have the same language duplicated.
- Composite index `ix_user_language_user_active` on `(user_id, is_active)` for fast active language lookups.

## StudyPlan (`study_plans`)

One active plan per user per language. Generated after CEFR assessment. Added in Phase 4 (`target_language`), updated in Phase 10 (`user_language_id`, partial unique index).

| Column | Type | Notes |
|--------|------|-------|
| id | integer | Primary key |
| user_id | integer | FK → users |
| user_language_id | integer | FK → user_languages (CASCADE). Added in Phase 10. |
| cefr_level | string | A1, A2, B1, B2, C1, C2 |
| goals | JSON | List of goal strings (grammar, vocabulary, reading, writing, conversation) |
| duration_weeks | integer | 4, 8, 12, or 16 (maps to intensity) |
| days_per_week | integer | Derived: 5, 5, 4, or 3 |
| current_unit | string | Curriculum unit ID, e.g. `"a1-unit-3"` |
| progress_day | integer | 0-indexed count of days completed. `N` means N days done; user is on day index N. Default 0. See `specs/study-plan.instructions.md` for full semantics. |
| generated_plan | JSON | Full week-by-week plan (WeekPlan → DayPlan → Unit assignments) |
| is_active | boolean | True for the current plan |
| completion_test_taken | boolean | Whether end-of-level test was completed |
| completion_test_score | float (nullable) | 0.0 – 1.0 |
| completion_test_recommendation | string (nullable) | `"advance"`, `"extend"`, or `"repeat"` |
| target_language | string | BCP-47 tag at plan creation (e.g. `"en-US"`). Denormalised from `user_languages`. |
| created_at | datetime | Auto-set |

**Constraints:**
- Partial unique index `uq_active_plan_per_lang` on `(user_language_id)` WHERE `is_active = true` — enforces one active plan per user per language.

**Intensity / duration mapping:**

| Intensity | Weeks | Days/week | Total lessons |
|-----------|-------|-----------|---------------|
| Intensive | 4 | 5 | ~20 |
| Standard | 8 | 5 | ~40 |
| Relaxed (default) | 12 | 4 | ~48 |
| Very relaxed | 16 | 3 | ~48 |

## Lesson (`lessons`)

One lesson per day slot in the study plan.

| Column | Type | Notes |
|--------|------|-------|
| id | integer | Primary key |
| study_plan_id | integer | FK → study_plans |
| title | string | Lesson title |
| lesson_type | string | `grammar`, `vocabulary`, `reading`, `writing`, `review` |
| cefr_level | string | CEFR level |
| week_number | integer | Week in the plan |
| day_number | integer | Day in the week |
| unit_id | string (nullable) | Curriculum unit this lesson belongs to |
| content | JSON | Structured lesson content generated by LLM |
| is_completed | boolean | |
| completed_at | datetime | |

## Exercise (`exercises`)

Exercises belong to a lesson (1 lesson → many exercises).

| Column | Type | Notes |
|--------|------|-------|
| id | integer | Primary key |
| lesson_id | integer | FK → lessons |
| exercise_type | string | `multiple_choice`, `fill_blank`, `free_write`, `pronunciation` |
| question | text | Exercise prompt |
| options | JSON | Array of options (for multiple_choice) |
| correct_answer | text | Expected answer |
| user_answer | text (nullable) | User's submitted answer |
| score | float (nullable) | 0.0 – 1.0 |
| feedback | text (nullable) | LLM-generated feedback |
| answered_at | datetime | |

## Flashcard (`flashcards`)

SM-2 spaced repetition cards, per user per language.

| Column | Type | Notes |
|--------|------|-------|
| id | integer | Primary key |
| user_id | integer | FK → users |
| study_plan_id | integer | FK → study_plans (CASCADE), NOT NULL, indexed. Added in Phase 10. |
| word | string | Target language word/phrase |
| definition | text | English definition |
| example_sentence | text | Usage example |
| translation | text | Translation to user's native language |
| source | varchar(20) | Origin of the card: `NULL` (generated), `"from_text"` (saved from reading exercise) |
| ease_factor | float | SM-2 ease factor (default 2.5) |
| interval | integer | Days until next review (default 0) |
| repetitions | integer | Consecutive correct reviews (default 0) |
| next_review | date | Date of next review (default today) |
| created_at | datetime | |

## Progress (`progress`)

Daily progress record, one row per user per day per plan. Added `study_plan_id` in Phase 10.

| Column | Type | Notes |
|--------|------|-------|
| id | integer | Primary key |
| user_id | integer | FK → users |
| study_plan_id | integer | FK → study_plans (CASCADE), NOT NULL, indexed |
| date | date | |
| xp_earned | integer | XP gained that day |
| lessons_completed | integer | |
| exercises_correct | integer | |
| exercises_total | integer | |
| streak_day | integer | Consecutive day count |
| skills | JSON | Skill scores: `{"grammar": 0.6, "vocabulary": 0.4, ...}` |

**Constraint:** `UNIQUE(user_id, study_plan_id, date)` — one progress row per user per plan per day.

## Conversation (`conversations`)

Grouping of chat messages (text and voice) into named conversations. Added `study_plan_id` in Phase 10.

| Column | Type | Notes |
|--------|------|-------|
| id | integer | Primary key |
| user_id | integer | FK → users (CASCADE) |
| study_plan_id | integer (nullable) | FK → study_plans (SET NULL), indexed |
| title | string | Auto-generated or user-set |
| source | string | `'chat'` or `'voice'` (default `'chat'`) |
| created_at | datetime | |
| updated_at | datetime | |

## ChatHistory (`chat_history`)

Individual messages within text chat and voice conversations. Added `study_plan_id` in Phase 10.

| Column | Type | Notes |
|--------|------|-------|
| id | integer | Primary key |
| user_id | integer | FK → users |
| conversation_id | integer (nullable) | FK → conversations (CASCADE) |
| study_plan_id | integer (nullable) | FK → study_plans (SET NULL), indexed |
| role | string | `"user"` or `"assistant"` |
| content | text | Message body |
| created_at | datetime | |

## UserCompetency (`user_competencies`)

Per-unit competency tracking (Phase 1+). Added `study_plan_id` in Phase 10.

| Column | Type | Notes |
|--------|------|-------|
| id | integer | Primary key |
| user_id | integer | FK → users (CASCADE) |
| study_plan_id | integer | FK → study_plans (CASCADE), NOT NULL, indexed |
| unit_id | string | Curriculum unit ID (indexed) |
| competency_text | text | Name of the competency |
| score | float | 0.0 – 1.0, exponential moving average |
| mastered | boolean | True when score >= 0.80 |
| updated_at | datetime | |

**Constraint:** `UNIQUE(user_id, study_plan_id, unit_id, competency_text)`.

## ListeningExercise (`listening_exercises`)

AI-generated listening comprehension exercises (Phase 6). Shared across all users at the same CEFR level and target language.

| Column | Type | Notes |
|--------|------|-------|
| id | integer | Primary key |
| level | string | CEFR level: A1–C2 |
| target_language | string | BCP-47 tag, e.g. `"en-US"` |
| exercise_type | string | E.g. `"story"`, `"dialogue"`, `"news_report"` — varies by level |
| topic | string | Short topic description |
| text | text | Full transcript (never returned to client before submission) |
| audio_path | string | Absolute path to MP3 on disk, e.g. `/data/audio/listening/42.mp3` |
| duration_seconds | integer | Audio length in seconds |
| questions | JSON | List of `{question, options: [str×4], correct}` objects (5 questions per exercise) |
| play_count | integer | How many times this exercise has been served (server default 0) |
| created_at | datetime | Auto-set on creation |

Composite index: `ix_listening_exercises_level_lang` on `(level, target_language)`.

## ListeningAttempt (`listening_attempts`)

Records each user submission for a listening exercise. Added `study_plan_id` in Phase 10.

| Column | Type | Notes |
|--------|------|-------|
| id | integer | Primary key |
| user_id | integer | FK → users (CASCADE DELETE) |
| exercise_id | integer | FK → listening_exercises (CASCADE DELETE) |
| study_plan_id | integer | FK → study_plans (CASCADE), NOT NULL, indexed |
| answers | JSON | List of strings — the user's selected option per question |
| score | integer | 0–5 (number of correct answers) |
| xp_earned | integer | 0–50 (10 per correct answer) |
| completed_at | datetime | Auto-set on creation |

Unique constraint: one attempt per `(user_id, exercise_id)` — enforced at service level (409 on duplicate).

## ReadingExercise (`reading_exercises`)

AI-generated reading comprehension exercises (Phase 7). Shared across all users at the same CEFR level and target language. Unlike listening, no audio is produced — the text is served directly to the client.

| Column | Type | Notes |
|--------|------|-------|
| id | integer | Primary key |
| level | string | CEFR level: A1–C2 |
| target_language | string | BCP-47 tag, e.g. `"en-US"` |
| exercise_type | string | `notice`, `email`, `article`, `news`, `blog_post`, `review`, `essay` |
| topic | string | Short topic description |
| text | text | Full passage text — **included in exercise response** (unlike listening) |
| questions | JSON | List of `{index, question, options: {A,B,C,D}, correct}` objects (5 per exercise) |
| view_count | integer | How many times this exercise has been served (server default 0) |
| created_at | datetime | Auto-set on creation |

Composite index: `ix_reading_exercises_level_lang` on `(level, target_language)`.

## ReadingAttempt (`reading_attempts`)

Records each user submission for a reading exercise. Added `study_plan_id` in Phase 10.

| Column | Type | Notes |
|--------|------|-------|
| id | integer | Primary key |
| user_id | integer | FK → users (CASCADE DELETE) |
| exercise_id | integer | FK → reading_exercises (CASCADE DELETE) |
| study_plan_id | integer | FK → study_plans (CASCADE), NOT NULL, indexed |
| answers | JSON | `{ "0": "B", "1": "A", ... }` — the user's selected option per question |
| score | integer | 0–5 (number of correct answers) |
| xp_earned | integer | 0–50 (10 per correct answer) |
| completed_at | datetime | Auto-set on creation |

Unique constraint: one attempt per `(user_id, exercise_id)` — enforced at service level (409 on duplicate).

## FeedbackEntry (`feedback_entries`)

A feature request or bug report submitted by a user.

| Column | Type | Notes |
|--------|------|-------|
| id | integer | Primary key |
| type | string(10) | `"feature"` or `"bug"` |
| title | string(200) | Short title |
| description | text | Full description (max 5000 chars via schema) |
| status | string(20) | `pending` (default) \| `planned` \| `in_progress` \| `done` \| `declined` |
| author_id | integer | FK → users (CASCADE DELETE) |
| vote_count | integer | Denormalised sum of votes (default 0) |
| created_at | datetime | Auto-set on creation |

Indexes: `type`, `status`, `author_id`, `created_at`.

## FeedbackVote (`feedback_votes`)

One vote per user per feature request. Bugs are not voteable.

| Column | Type | Notes |
|--------|------|-------|
| id | integer | Primary key |
| entry_id | integer | FK → feedback_entries (CASCADE DELETE) |
| user_id | integer | FK → users (CASCADE DELETE) |
| created_at | datetime | Auto-set on creation |

Unique constraint: `UNIQUE(entry_id, user_id)` — enforced at DB level (`uq_feedback_vote`).

## FeedbackComment (`feedback_comments`)

A flat comment on a feedback entry. No nesting.

| Column | Type | Notes |
|--------|------|-------|
| id | integer | Primary key |
| entry_id | integer | FK → feedback_entries (CASCADE DELETE) |
| author_id | integer | FK → users (CASCADE DELETE) |
| body | text | Comment body (max 2000 chars via schema) |
| created_at | datetime | Auto-set on creation |

## Memory (`memories`)

User-specific context persisted by the LLM during conversations. The AI tutor autonomously decides what to remember. Added `study_plan_id` in Phase 10.

| Column | Type | Notes |
|--------|------|-------|
| id | integer | Primary key |
| user_id | integer | FK → users (CASCADE DELETE) |
| study_plan_id | integer (nullable) | FK → study_plans (SET NULL), indexed |
| content | text | Memory text, max 200 chars enforced at service layer |
| source | varchar(10) | `"chat"` or `"voice"` |
| created_at | datetime | Auto-set on creation |

## LLMUsage (`llm_usage`)

Token-usage audit trail, one row per LLM call. Used to track consumption against `monthly_tokens_limit`. Added `study_plan_id` in Phase 10.

| Column | Type | Notes |
|--------|------|-------|
| id | integer | Primary key |
| user_id | integer | FK → users (CASCADE DELETE), indexed |
| study_plan_id | integer (nullable) | FK → study_plans (SET NULL), indexed |
| source | varchar(20) | Feature that triggered the call: `"chat"`, `"lesson"`, `"assessment"`, etc. |
| prompt_tokens | integer (nullable) | Input token count |
| completion_tokens | integer (nullable) | Output token count |
| total_tokens | integer (nullable) | Total tokens (may differ from prompt + completion for some providers) |
| created_at | datetime | Auto-set on creation |