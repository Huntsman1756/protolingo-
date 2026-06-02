"""Placeholder — NOT NULL on study_plan_id moved to Phase 10.3

The callers that populate study_plan_id (routers/lessons.py, routers/flashcards.py,
listening_service.py, reading_service.py) are not updated until Phase 10.3, when
get_active_study_plan is wired into those endpoints. Enforcing NOT NULL here would
break every lesson completion, flashcard review, and listening/reading exercise.

The actual ALTER COLUMN ... NOT NULL statements live in the Phase 10.3 migration.

Revision ID: 0030_not_null_study_plan_id
Revises: 0029_multi_language
Create Date: 2026-06-02
"""

from collections.abc import Sequence

revision: str = "0030_not_null_study_plan_id"
down_revision: str | None = "0029_multi_language"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    pass  # NOT NULL enforced in Phase 10.3 migration


def downgrade() -> None:
    pass  # nothing to revert
