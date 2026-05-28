"""Add explanation column to exercises table

Revision ID: 0023_exercise_explanation
Revises: 0022_memory
Create Date: 2026-05-24
"""

from collections.abc import Sequence

import sqlalchemy as sa

from alembic import op

revision: str = "0023_exercise_explanation"
down_revision: str | None = "0022_memory"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.add_column("exercises", sa.Column("explanation", sa.Text(), nullable=True))


def downgrade() -> None:
    op.drop_column("exercises", "explanation")
