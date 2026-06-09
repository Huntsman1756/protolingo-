---
description: "Phase 1+ specification for FreeLingo: Learning Resources Hub with Grammar Reference, Vocabulary Hub, Phrasebook, Skills Tracker, and Level Completion Test — all static content, integrated with the curriculum and ai tutor."
applyTo: "frontend/src/**"
---

# Phase 1+ — Learning Resources Hub

## Objective

A unified resource centre delivering five complementary features: a grammar reference, vocabulary explorer, situational phrasebook, skills tracker with competency monitoring, and end-of-level completion tests. All reference content is static TypeScript — no database, no API calls needed for content browsing. The hub is tightly integrated with the curriculum roadmap, lessons, flashcards, and the AI tutor.

---

## Milestones

| # | Milestone | What was built |
|---|-----------|----------------|
| 1 | Grammar Reference | Static grammar data file + `/grammar` index + `/grammar/[slug]` detail pages |
| 2 | Vocabulary Hub | Backend vocabulary data per language + `/vocabulary` index via API + set detail pages with flashcard integration |
| 3 | Phrasebook | Static phrasebook data file + `/phrasebook` page with level and register filters |
| 4 | Skills Tracker | `/progress` page showing unit competencies, vocabulary progress, XP history |
| 5 | Level Completion Test | End-of-level exam at `/assessment/level-test` with auto-generated questions and scoring |
| 6 | Navigation & routing | RESOURCES nav group in sidebar, curriculum-driven `/plan` roadmap |

---

## Milestone 1 — Grammar Reference

### Data model (`frontend/src/data/grammar.ts`)

A single static TypeScript file containing approximately 50+ grammar topics spanning A1 through C2. No backend endpoint needed — all content ships with the JS bundle and is tree-shakeable.

Each grammar topic has:

| Field | Type | Description |
|-------|------|-------------|
| `slug` | string | URL-safe identifier (e.g. `"present-simple"`, `"past-continuous"`) |
| `title` | string | Display title |
| `level` | CEFRLevel | A1, A2, B1, B2, C1, C2 |
| `category` | GrammarCategory | One of 14 categories (Tenses, Questions, Nouns, Pronouns, Adjectives & Adverbs, Modals, Conditionals, Passive Voice, Reported Speech, Clauses, Articles, Prepositions, Phrasal Verbs, Advanced) |
| `summary` | string | One-line description for index cards |
| `explanation` | string | Full explanation in Markdown-lite format |
| `structure` | string (optional) | Formula/pattern (e.g. "Subject + base verb + s/es") |
| `rules` | string[] | Key rules as bullet points |
| `examples` | array | Objects with `english`, optional `translation` (rendered in user's native language), and optional `note` |
| `common_mistakes` | array | Objects with `wrong`, `correct`, and `note` fields |
| `related` | string[] | Slugs of related grammar topics for cross-linking |

**Categories**: 14 categories provide structure for the index page, allowing users to filter by grammatical category in addition to CEFR level.

### Grammar index page (`/grammar`)

Renders all grammar topics organized by CEFR level. Each topic appears as a card showing:
- Title and category badge
- Summary paragraph
- "View details →" link

Features a search bar that filters topics by title and content. Category filter tabs allow narrowing by grammatical category.

### Grammar detail page (`/grammar/[slug]`)

Dynamic route rendering a single grammar topic. The `[slug]` parameter maps directly to a `GrammarTopic.slug`:
- Unknown slugs return a 404 page (Next.js `notFound()`)
- Renders: title, level badge, explanation (formatted Markdown-lite), structure pattern, rules list, example sentences with optional translations, common mistakes table, and related topics links
- Related topics are linked to their own detail pages
- The AI tutor's system prompt references the current grammar slug to provide contextual corrections during chat

### Integration with other features

- **Lessons**: lesson content includes `grammar_refs` — slugs from this data file for cross-linking
- **Assessment**: quiz questions have optional `grammar_slug` to map wrong answers to grammar topics
- **Curriculum**: each `CurriculumUnit` declares `grammar_points` — the set of slugs covered
- **Level test**: questions are constrained to grammar slugs studied during the level
- **Validation**: the backend validates that LLM-generated grammar slugs belong to a known set of 24 slugs (`VALID_GRAMMAR_SLUGS`)

---

## Milestone 2 — Vocabulary Hub

### Data model (`backend/app/data/_types.py` + per-language `vocabulary.py`)

> **Migrated to backend in v1.7.4.** Originally static TypeScript (`frontend/src/data/vocabulary.ts`); now served via `GET /api/vocabulary` from Python dataclasses organized per CEFR level (A1–C2) across 4 languages (en, es, it, pt). The frontend vocabulary hub and set detail pages consume the API instead of importing static data.

**VocabularyEntry** (per word):

| Field | Type | Description |
|-------|------|-------------|
| `word` | string | English word |
| `pos` | PartOfSpeech | Noun, verb, adjective, adverb, phrase, conjunction, preposition, numeral, pronoun |
| `definition` | string | Simple English definition |
| `example` | string | Natural usage example |
| `ipa` | string (optional) | IPA pronunciation |
| `frequency_rank` | number (optional) | Usage frequency ranking |

**VocabularySet** (per topic):

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique identifier (e.g. `"identity"`, `"greetings"`) |
| `level` | CEFRLevel | CEFR level |
| `topic` | string | Human-readable topic name |
| `unit_ref` | string | Curriculum unit this set belongs to (e.g. `"a1-unit-1"`) |
| `words` | VocabularyEntry[] | The vocabulary items |

### Vocabulary index page (`/vocabulary`)

Lists all vocabulary sets grouped by CEFR level. Each set card shows:
- Topic name and level badge
- Word count (e.g. "15 words")
- Flashcard progress: how many words from this set the user has as flashcards ("3/15 in flashcards")

Search bar filters sets by topic name or words within.

### Vocabulary set detail page (`/vocabulary/[setId]`)

Dynamic route for a single vocabulary set. The `[setId]` parameter maps to a `VocabularySet.id`. Shows:
- Topic title, level badge, word count
- Full word table: word, part of speech badge, definition, example, IPA pronunciation, frequency rank
- "Add to flashcards" button: sends the word to the flashcards API for SM-2 review

### Integration with flashcards

The vocabulary hub and flashcard system are connected:
- Users can add individual words or whole sets to their flashcards
- The progress page shows per-set flashcard coverage
- When the LLM generates flashcards, it can draw from the user's current vocabulary set

---

## Milestone 3 — Phrasebook

### Data model (`frontend/src/data/phrasebook.ts`)

Static TypeScript file containing approximately 20 phrasebook categories from A1 to B2/C1, organized by real-world situations.

**Phrase** (per entry):

| Field | Type | Description |
|-------|------|-------------|
| `english` | string | The English phrase |
| `context` | string | When/where to use the phrase |
| `register` | Register | `"formal"`, `"neutral"`, or `"informal"` |
| `unit_ref` | string (optional) | Curriculum unit this phrase relates to |

**PhrasebookCategory** (per situation):

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique identifier |
| `level` | CEFRLevel | Minimum level for this situation |
| `situation` | string | Real-world scenario (e.g. "At the restaurant") |
| `icon` | string | Emoji representing the situation (for visual indexing) |
| `phrases` | Phrase[] | The phrases for this situation |

### Phrasebook page (`/phrasebook`)

Lists all phrasebook categories. Filterable by:
- **CEFR level**: checkboxes or tabs for A1, A2, B1, B2, C1
- **Register**: formal, neutral, informal

Each category card shows:
- Icon (emoji) and situation name
- Level badge
- Phrase count
- Expand to see all phrases with context and register badges
- Phrase entries are selectable (tap to copy to clipboard)

### Usage

The phrasebook is designed as a quick reference for real-world English. It complements the grammar and vocabulary references by focusing on complete, usable expressions rather than isolated words or rules.

---

## Milestone 4 — Skills Tracker

### Progress page (`/progress`)

A comprehensive skills dashboard replacing the simpler progress summary. Shows three main sections:

**Unit Competency Checklist**

Per-unit progress derived from `UserCompetency` records (Phase 1+ backend model). Each unit displays:
- Unit name and CEFR level
- List of competencies with individual scores (0.0–1.0) and mastery status (>= 0.80)
- Overall unit percentage (average of competency scores)
- Progress bar with color coding: red (< 0.40), yellow (0.40–0.79), green (>= 0.80)

Competencies are updated via exponential moving average each time a related lesson is completed. The EMA formula: `new_score = (0.7 × previous_score) + (0.3 × latest_score)`.

**Vocabulary Progress**

Per-set vocabulary progress:
- Which vocabulary sets have been added to flashcards
- How many words from each set are in the user's flashcard deck
- Progress bars showing coverage per set

**XP and Streak History**

- Current streak (consecutive active days)
- Total XP
- Daily XP breakdown (last 90 days)
- Skill scores: grammar, vocabulary, reading, writing (also EMA-based)

### Backend endpoint

`GET /api/progress/competencies` — returns per-unit competency data from `user_competencies` table, aggregated by unit and ordered by curriculum sequence.

---

## Milestone 5 — Level Completion Test

### Purpose

When a user completes all curriculum units in their current CEFR level, an end-of-level test becomes available. This test evaluates whether the student has truly mastered the level's content before advancing.

### Trigger

- The `LevelTestBanner` component appears on the dashboard when `current_unit` surpasses the last unit of the level
- The `/plan` roadmap shows a gold "Level Test" node at the end of the timeline
- Both are only clickable after ALL units in the level are completed

### Question generation

Test questions are generated by the LLM (backend) and constrained to:
- Grammar points studied during the level (from the curriculum unit's `grammar_points`)
- Vocabulary sets studied during the level (from `vocabulary_set_ids`)
- 20 questions total, mixing grammar, vocabulary, and reading comprehension
- No content from the next CEFR level

The prompt (`END_OF_LEVEL_TEST_PROMPT` in `services/assessment.py`) instructs the LLM to generate questions using the same schema as the placement test but strictly scoped to studied material.

### Scoring and recommendations

| Score | Recommendation | Action |
|-------|---------------|--------|
| >= 0.75 | `"advance"` | Unlock next CEFR level, create new study plan |
| 0.55 – 0.74 | `"extend"` | Recommend 4-week extension focusing on weak units |
| < 0.55 | `"repeat"` | Recommend repeating the full level |

The recommendation is stored in the StudyPlan model (`completion_test_score`, `completion_test_recommendation`) and displayed in the `TestResultSummary` component.

### User flow

```
Dashboard → LevelTestBanner ("You've completed all A1 units!")
    ↓
/assessment/level-test → 20 questions (LLM-generated, curriculum-constrained)
    ↓
Submission → Backend scores → returns result + recommendation
    ↓
TestResultSummary: score, competency breakdown, recommendation
    ↓
If "advance": unlock next level plan creation
If "extend": extend current plan by 4 weeks, focus on weak units
If "repeat": archive current plan, enable creating a new plan for same level
```

---

## Milestone 6 — Navigation & Routing

### Sidebar navigation

The sidebar nav groups routes under logical sections:

```
┌─────────────────────┐
│ 📊 LEARNING          │
│   Dashboard          │
│   Study Plan         │
│   Progress           │
│                      │
│ 📚 RESOURCES         │
│   Grammar            │
│   Vocabulary         │
│   Phrasebook         │
│                      │
│ 🎯 PRACTICE          │
│   Lessons            │
│   Flashcards         │
│   Chat with Tutor    │
│   Conversation       │
│                      │
│ ⚙️ SETTINGS          │
│   Settings           │
│   FAQ                │
│   Admin Panel        │ ← admin only
└─────────────────────┘
```

The RESOURCES nav group was added in Phase 1+ to give grammar, vocabulary, and phrasebook prominent placement.

### Mobile navigation

On mobile (below `md` breakpoint), the sidebar collapses into a hamburger menu. The chat sidebar (conversation list) opens as a fixed overlay with a semi-transparent backdrop rather than a side-by-side column.

### Route protection

Next.js middleware at `src/middleware.ts`:
- Detects `refresh_token` cookie for auth gating
- Redirects unauthenticated users to `/login`
- Handles locale detection via `next-intl` (cookie-based, falls back to Accept-Language header)
- Matcher excludes static assets, `_next`, and API routes

---

## Technical design decisions

### Static content

Grammar topics and phrasebook entries remain static TypeScript constants in the frontend. **Vocabulary and assessment data were migrated to the backend in v1.7.4** — they are now served via API endpoints (`/api/vocabulary`, `/api/assessment/bank`) from Python dataclasses. Curriculum data (unit definitions, grammar points, vocabulary set IDs) lives in both backend Python files and a lightweight frontend `curriculum.ts` that fetches units via the `/api/curriculum` endpoint.

Reasons for the mixed approach:
1. **Grammar/phrasebook (frontend static)**: zero latency, offline-capable, tree-shakeable, no DB migrations
2. **Vocabulary/assessment (backend API)**: large datasets (~330 sets, ~3,940 words across 4 languages; ~400 questions across 4 languages) benefit from server-side serving and language-aware dispatching without bloating the client bundle
3. **Curriculum (both)**: lightweight unit definitions in frontend for quick rendering; full data in backend for plan generation

### Cross-referencing

A data integrity test (`test_frontend_data_integrity.py`) validates that:
- Every `grammar_slug` referenced in curriculum units exists in `grammar.ts`
- Every `vocabulary_set_id` referenced in each language's curriculum exists in that language's backend vocabulary data (validated for all 4 languages: en, es, it, pt)
- Every `related` slug in grammar topics points to an existing topic

### Dual data files (frontend + backend)

Some data exists in both frontend and backend:
- `frontend/src/data/curriculum.ts` — full curriculum with all metadata for the roadmap UI
- `backend/app/data/curriculum.py` — canonical curriculum data for plan generation and lesson constraints

This duplication is intentional: the frontend needs the data for instant rendering of the roadmap, and the backend needs it for plan generation and LLM constraint validation. Both are kept in sync, validated by the data integrity test.

---

## Phase 1+ completion criteria (all met in v1.1.0)

- [x] `/grammar` renders all topics with no API calls (static TypeScript data)
- [x] `/grammar/[slug]` renders full detail; unknown slugs return 404
- [x] `/vocabulary` lists all sets grouped by level with flashcard-progress badges (fetches via `/api/vocabulary`)
- [x] `/vocabulary/[setId]` shows words + "Add to flashcards" button that integrates with the flashcard API
- [x] `/phrasebook` lists situations with level and register filters
- [x] `/progress` shows per-unit competency checklist with scores
- [x] `/progress` shows vocabulary progress bars per set (fetches via `/api/vocabulary`)
- [x] Level test available only after all units in a level are completed
- [x] Level test generates 20 curriculum-constrained questions via LLM
- [x] Level test recommendation thresholds: advance >= 75% / extend 55-74% / repeat < 55%
- [x] RESOURCES nav group works on desktop and mobile
- [x] `/plan` visual roadmap linked from dashboard
- [x] Data integrity test validates cross-references between curriculum, grammar, and vocabulary files
- [x] No regressions in Phase 1 features