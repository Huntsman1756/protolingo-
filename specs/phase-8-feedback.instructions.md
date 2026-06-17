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

| Column      | Type        | Constraints                          | Notes                                                           |
| ----------- | ----------- | ------------------------------------ | --------------------------------------------------------------- |
| id          | integer     | PK, autoincrement                    |                                                                 |
| type        | string(10)  | NOT NULL, index                      | `"feature"` or `"bug"`                                          |
| title       | string(200) | NOT NULL                             |                                                                 |
| description | text        | NOT NULL                             | Max 5000 chars enforced by schema                               |
| status      | string(20)  | NOT NULL, default `"pending"`, index | `pending` \| `planned` \| `in_progress` \| `done` \| `declined` |
| author_id   | integer     | NOT NULL, FK → users(CASCADE), index |                                                                 |
| vote_count  | integer     | NOT NULL, default 0                  | Denormalised; updated atomically on vote toggle                 |
| created_at  | datetime    | NOT NULL, index                      | UTC, tz-naive                                                   |

### `feedback_votes`

| Column     | Type     | Constraints                                     | Notes |
| ---------- | -------- | ----------------------------------------------- | ----- |
| id         | integer  | PK, autoincrement                               |       |
| entry_id   | integer  | NOT NULL, FK → feedback_entries(CASCADE), index |       |
| user_id    | integer  | NOT NULL, FK → users(CASCADE), index            |       |
| created_at | datetime | NOT NULL                                        |       |

`UNIQUE(entry_id, user_id)` — `uq_feedback_vote`. Only feature entries can receive votes; the router rejects vote attempts on bugs with HTTP 400.

### `feedback_comments`

| Column     | Type     | Constraints                                     | Notes                             |
| ---------- | -------- | ----------------------------------------------- | --------------------------------- |
| id         | integer  | PK, autoincrement                               |                                   |
| entry_id   | integer  | NOT NULL, FK → feedback_entries(CASCADE), index |                                   |
| author_id  | integer  | NOT NULL, FK → users(CASCADE), index            |                                   |
| body       | text     | NOT NULL                                        | Max 2000 chars enforced by schema |
| created_at | datetime | NOT NULL                                        |                                   |

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

- **GET `/`** — Rate limit: 60/min. Auth: get_current_user. Notes: Accepts `q` (title, description, username, or display name search; max 100 chars), `type`, `status` (alias for `status_filter`), `sort` (votes\|date), `order` (asc\|desc), `skip`, `limit`. Count runs against `stmt.subquery()` for accurate filtered totals.
- **POST `/`** — Rate limit: 10/hour. Auth: get_current_user. Notes: Creates entry with status `pending`. Returns HTTP 201. Fires an admin email notification (see below).
- **GET `/{id}`** — Rate limit: 60/min. Auth: get_current_user. Notes: Returns `FeedbackEntryDetail` with comments list (ordered by `created_at ASC`).
- **DELETE `/{id}`** — Rate limit: 20/min. Auth: get_current_user. Notes: Allowed if `author_id == current_user.id` OR `current_user.role == "admin"`. Returns HTTP 204.
- **POST `/{id}/vote`** — Rate limit: 30/min. Auth: get_current_user. Notes: Toggle: if vote exists → delete + decrement `vote_count`; else → insert + increment. `max(0, ...)` guard prevents negative counts. Returns `{voted, vote_count}`.
- **PATCH `/{id}/status`** — Rate limit: 30/min. Auth: require_admin. Notes: Updates `status` field. Returns updated `FeedbackEntryOut`.
- **GET `/{id}/comments`** — Rate limit: 60/min. Auth: get_current_user. Notes: Returns `FeedbackCommentsResponse` with `total = len(items)`.
- **POST `/{id}/comments`** — Rate limit: 20/hour. Auth: get_current_user. Notes: Creates comment, returns HTTP 201 + `FeedbackCommentOut`.
- **DELETE `/{id}/comments/{cid}`** — Rate limit: 20/min. Auth: get_current_user. Notes: Validates `comment.entry_id == entry_id` to prevent cross-entry deletions. Allowed if author or admin. Returns HTTP 204.

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
- Pagination: identical two-effect pattern as `admin/users/page.tsx` — one effect on `page`, one effect on filters that resets to page 0 before loading.
- Admin users see delete button on all entries in both list and detail views; regular users only see it on their own entries.

**Status badge colours (consistent with admin users page):**

| Status      | Border                 | Text               |
| ----------- | ---------------------- | ------------------ |
| pending     | `border-fl-border`     | `text-fl-muted-2`  |
| planned     | `border-blue-500/40`   | `text-blue-400`    |
| in_progress | `border-yellow-500/40` | `text-yellow-400`  |
| done        | `border-green-500/40`  | `text-green-400`   |
| declined    | `border-fl-error/30`   | `text-fl-error-fg` |

### `/admin/feedback` (`frontend/src/app/(app)/admin/feedback/page.tsx`)

Paginated feedback queue for admins. Filters: `q` search, type (all/feature/bug), status, and sort (date/votes). The page uses shared admin primitives (`AdminPageHeader`, `AdminPanel`, `AdminMetric`, `AdminBadge`) and renders a dense desktop table plus responsive mobile cards. Status changes use an inline `<select>` and trigger `PATCH /{id}/status`; delete uses `ConfirmDialog`. The page includes the shared `AdminNav` navigation alongside `/admin` and `/admin/users`.

---

## Navigation

- `/feedback` added to `bottomNavItems` in `frontend/src/app/(app)/layout.tsx` (alongside Settings and FAQ).
- `/feedback` added to `PROTECTED_ROUTES` in `frontend/src/middleware.ts`.
- `/admin/feedback` is protected by the `/admin` prefix already in `PROTECTED_ROUTES`.

---

## i18n

`feedback` namespace (44 keys) added to all 10 locale files: `en`, `es`, `fr`, `de`, `it`, `nl`, `pl`, `pt`, `ro`, `ru`. `nav.feedback` key added to all 10 locales. Admin feedback queue labels live in the `admin` namespace. All non-English locales have full native translations for UI strings and status labels.

---

## Admin email notifications

When a user creates a new feature request or bug report, an email is sent to `CONTACT_EMAIL` (if `EMAIL_ENABLED=true` and `CONTACT_EMAIL` is configured).

- **Triggered by:** `POST /api/feedback` only. Comments (`POST /{id}/comments`) do **not** send notifications.
- **Language:** English only (admin-facing, no i18n).
- **Subject:** `[Feature Request] <title>` or `[Bug Report] <title>`.
- **Template:** `backend/app/templates/email/feedback_submitted.html` — shows type badge, author username, title, description, and a direct link to `APP_BASE_URL/admin/feedback/{id}`.
- **Implementation:** `email_service.send_feedback_notification()`. Called via `asyncio.create_task()` after `db.commit()` to avoid blocking the HTTP response. Errors are logged but never re-raised — the entry is already persisted.
- **Config:** reuses existing `EMAIL_ENABLED` and `CONTACT_EMAIL` settings; no new env vars required.
