"""Add progress_day to study_plans with data backfill from completed lessons

Revision ID: 0025_plan_progress_day
Revises: 0024_lessons_unique
Create Date: 2026-05-24
"""

from collections.abc import Sequence

import sqlalchemy as sa

from alembic import op

revision: str = "0025_plan_progress_day"
down_revision: str | None = "0024_lessons_unique"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    # 1. Add column as nullable to allow data backfill
    op.add_column("study_plans", sa.Column("progress_day", sa.Integer(), nullable=True))

    # 2. Backfill: set progress_day to the day index AFTER the highest completed lesson.
    #    absolute_day = (week_number - 1) * days_per_week + (day_number - 1)
    #    If no completed lessons, default to 0.
    op.execute("""
        UPDATE study_plans sp
        SET progress_day = COALESCE((
            SELECT MAX((l.week_number - 1) * sp.days_per_week + (l.day_number - 1)) + 1
            FROM lessons l
            WHERE l.study_plan_id = sp.id AND l.is_completed = TRUE
        ), 0)
        """)

    # 3. Make NOT NULL now that all rows have a value
    op.alter_column("study_plans", "progress_day", nullable=False)


def downgrade() -> None:
    op.drop_column("study_plans", "progress_day")
