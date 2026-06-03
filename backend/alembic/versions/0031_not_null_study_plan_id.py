"""Apply NOT NULL to study_plan_id (all callers now pass it)

Revision ID: 0031_not_null_study_plan_id
Revises: 0030_not_null_study_plan_id
Create Date: 2026-06-02
"""

from collections.abc import Sequence

from alembic import op

revision: str = "0031_not_null_study_plan_id"
down_revision: str | None = "0030_not_null_study_plan_id"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.alter_column("progress", "study_plan_id", nullable=False)
    op.alter_column("flashcards", "study_plan_id", nullable=False)
    op.alter_column("user_competencies", "study_plan_id", nullable=False)


def downgrade() -> None:
    op.alter_column("user_competencies", "study_plan_id", nullable=True)
    op.alter_column("flashcards", "study_plan_id", nullable=True)
    op.alter_column("progress", "study_plan_id", nullable=True)
