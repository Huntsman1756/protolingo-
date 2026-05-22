---
description: "Phase 8 spec — Feedback board: feature requests, bug reports, voting, comments, and admin management."
applyTo: "backend/**, frontend/**"
---

# Phase 8 — Feedback Board

## Overview

A community feedback board where users can submit feature requests and bug reports, vote on suggestions, and discuss entries via flat comment threads. Admins manage entry status and can delete any entry or comment.

---

## Database models

### `feedback_entries`

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | integer | PK, autoincrement | |
| type | string(10) | NOT NULL, index | `"feature"` or `"bug"` |
| title | string(200) | NOT NULL | |
| description | text | NOT NULL | Max 5000 chars enforced by schema |
| status | string(20) | NOT NULL, default `"pending"`, index | `pending` \| `planned` \| `in_progress` \| `done` \| `declined` |
| author_id | integer | NOT NULL, FK → users(CASCADE), index | |
| vote_count | integer | NOT NULL, default 0 | Denormalised; updated atomically on vote toggle |
| created_at | datetime | NOT NULL, index | UTC, tz-naive |

### `feedback_votes`

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | integer | PK, autoincrement | |
| entry_id | integer | NOT NULL, FK → feedback_entries(CASCADE), index | |
| user_id | integer | NOT NULL, FK → users(CASCADE), index | |
| created_at | datetime | NOT NULL | |

`UNIQUE(entry_id, user_id)` — `uq_feedback_vote`. Only feature entries can receive votes; the router rejects vote attempts on bugs with HTTP 400.

### `feedback_comments`

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | integer | PK, autoincrement | |
| entry_id | integer | NOT NULL, FK → feedback_entries(CASCADE), index | |
| author_id | integer | NOT NULL, FK → users(CASCADE), index | |
| body | text | NOT NULL | Max 2000 chars enforced by schema |
| created_at | datetime | NOT NULL | |

Cascade behaviour: deleting a `FeedbackEntry` cascades to all its `FeedbackVote` and `FeedbackComment` rows at the DB level (`ondelete="CASCADE"`).

---

## Alembic migration

`backend/alembic/versions/0020_feedback.py` — revision `0020_feedback`, down_revision `0019_reading`.

Creates `feedback_entries`, `feedback_votes`, `feedback_comments` with all indexes and the unique vote constraint. Fully reversible via `downgrade()`.

---

## Backend router

**File:** `backend/app/routers/feedback.py`  
**Prefix:** `/api/feedback`  
**Tag:** `feedback`

### Helpers

- `_utcnow()` — returns tz-naive UTC datetime (consistent with all other models).
- `_get_entry_or_404(entry_id, db)` — fetches `FeedbackEntry` by PK or raises HTTP 404.
- `_build_entry_out(entry, current_user, db)` — enriches an ORM entry with `FeedbackAuthor` (fetched by PK), `voted_by_me` (scalar query), and `comment_count` (count query with `select_from`).

### Endpoints

| Method | Path | Rate limit | Auth | Notes |
|--------|------|------------|------|-------|
| GET | `/` | 60/min | get_current_user | Accepts `type`, `status` (alias for `status_filter`), `sort` (votes\|date), `order` (asc\|desc), `skip`, `limit`. Count runs against `stmt.subquery()` for accurate filtered totals. |
| POST | `/` | 10/hour | get_current_user | Creates entry with status `pending`. Returns HTTP 201. |
| GET | `/{id}` | 60/min | get_current_user | Returns `FeedbackEntryDetail` with comments list (ordered by `created_at ASC`). |
| DELETE | `/{id}` | 20/min | get_current_user | Allowed if `author_id == current_user.id` OR `current_user.role == "admin"`. Returns HTTP 204. |
| POST | `/{id}/vote` | 30/min | get_current_user | Toggle: if vote exists → delete + decrement `vote_count`; else → insert + increment. `max(0, ...)` guard prevents negative counts. Returns `{voted, vote_count}`. |
| PATCH | `/{id}/status` | 30/min | require_admin | Updates `status` field. Returns updated `FeedbackEntryOut`. |
| GET | `/{id}/comments` | 60/min | get_current_user | Returns `FeedbackCommentsResponse` with `total = len(items)`. |
| POST | `/{id}/comments` | 20/hour | get_current_user | Creates comment, returns HTTP 201 + `FeedbackCommentOut`. |
| DELETE | `/{id}/comments/{cid}` | 20/min | get_current_user | Validates `comment.entry_id == entry_id` to prevent cross-entry deletions. Allowed if author or admin. Returns HTTP 204. |

---

## Schemas (`backend/app/schemas/feedback.py`)

- `FeedbackAuthor` — embedded author info: `id`, `username`, `display_name`. `from_attributes=True`.
- `FeedbackEntryCreate` — validates `type` pattern `^(feature|bug)$`, title 1–200, description 1–5000.
- `FeedbackCommentOut` — **defined before** `FeedbackEntryDetail` to avoid forward reference issues with Pydantic.
- `FeedbackEntryOut` — includes `voted_by_me: bool = False` and `comment_count: int = 0` (injected server-side, not from ORM).
- `FeedbackEntryDetail(FeedbackEntryOut)` — adds `comments: list[FeedbackCommentOut] = []`. Built with `FeedbackEntryOut.model_dump()` + comment list.
- `PaginatedFeedbackResponse` — `{items, total, skip, limit}` — identical pattern to `PaginatedAdminUsersResponse`.
- `FeedbackVoteResponse` — `{voted: bool, vote_count: int}`.
- `FeedbackCommentCreate` — `body` 1–2000 chars.
- `FeedbackStatusUpdate` — validates `status` pattern `^(pending|planned|in_progress|done|declined)$`.

---

## Frontend

### `/feedback` (`frontend/src/app/(app)/feedback/page.tsx`)

**State:** `tab` (feature|bug), `sort` (votes|date), `statusFilter`, `entries[]`, `total`, `page`, `loading`, `error`, `showCreate`, `selectedEntry`, `deletePending`.

**Two views controlled by `selectedEntry`:**

1. **List view** — tabs, sort toggles, status dropdown filter, paginated card list, create modal trigger.
2. **Detail view** (`DetailView` component) — full description, vote button, delete button (author or admin), flat comment thread with add/delete, back button.

**Key design decisions:**
- Vote toggle is available both inline on list cards (without navigating to detail) and in the detail view.
- `getStatusLabel(status)` uses a lookup object (`{ pending: t('statusPending'), ... }`) — **not** string template manipulation — to avoid runtime errors with underscored keys like `in_progress`.
- `DetailView` receives `isAdmin` and `getStatusLabel` as props from the parent to avoid re-deriving them.
- `CreateModal` calls `onCreated()` with no arguments after a successful POST; the parent reloads with `loadEntries(0, tab, sort, statusFilter)`.
- Pagination: identical two-effect pattern as `admin/users/page.tsx` — one effect on `page`, one debounced effect on filters.
- Admin users see delete button on all entries in both list and detail views; regular users only see it on their own entries.

**Status badge colours (consistent with admin users page):**

| Status | Border | Text |
|--------|--------|------|
| pending | `border-fl-border` | `text-fl-muted-2` |
| planned | `border-blue-500/40` | `text-blue-400` |
| in_progress | `border-yellow-500/40` | `text-yellow-400` |
| done | `border-green-500/40` | `text-green-400` |
| declined | `border-fl-error/30` | `text-fl-error-fg` |

### `/admin/feedback` (`frontend/src/app/(app)/admin/feedback/page.tsx`)

Paginated table of all entries (admin only). Filters: type (all/feature/bug) and status. Status can be changed inline — clicking the status badge opens a `<select>`, changing the value triggers `PATCH /{id}/status` and closes. Delete with `ConfirmDialog`. Pagination identical to admin users list. Breadcrumb: `Admin / Users / Feedback`.

---

## Navigation

- `/feedback` added to `bottomNavItems` in `frontend/src/app/(app)/layout.tsx` (alongside Settings and FAQ).
- `/feedback` added to `PROTECTED_ROUTES` in `frontend/src/middleware.ts`.
- `/admin/feedback` is protected by the `/admin` prefix already in `PROTECTED_ROUTES`.

---

## i18n

`feedback` namespace (44 keys) added to all 10 locale files: `en`, `es`, `fr`, `de`, `it`, `nl`, `pl`, `pt`, `ro`, `ru`. `nav.feedback` key added to all 10 locales. All non-English locales have full native translations for UI strings and status labels.