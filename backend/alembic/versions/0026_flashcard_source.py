"""Add source column to flashcards

Revision ID: 0026_flashcard_source
Revises: 0025_plan_progress_day
Create Date: 2026-06-01
"""

from collections.abc import Sequence

import sqlalchemy as sa

from alembic import op

revision: str = "0026_flashcard_source"
down_revision: str | None = "0025_plan_progress_day"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.add_column(
        "flashcards",
        sa.Column("source", sa.String(length=20), nullable=True),
    )


def downgrade() -> None:
    op.drop_column("flashcards", "source")
