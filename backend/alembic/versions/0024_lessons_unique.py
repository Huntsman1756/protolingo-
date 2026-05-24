"""Add unique constraint to lessons (study_plan_id, week_number, day_number, title)

Revision ID: 0024_lessons_unique
Revises: 0023_exercise_explanation
Create Date: 2026-05-24
"""
from typing import Sequence, Union

from alembic import op

revision: str = "0024_lessons_unique"
down_revision: Union[str, None] = "0023_exercise_explanation"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_unique_constraint(
        "uq_lessons_plan_week_day_title",
        "lessons",
        ["study_plan_id", "week_number", "day_number", "title"],
    )


def downgrade() -> None:
    op.drop_constraint("uq_lessons_plan_week_day_title", "lessons", type_="unique")
