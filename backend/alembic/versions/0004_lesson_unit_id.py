"""Add unit_id to lessons table.

Revision ID: 0004_lesson_unit_id
Revises: 0003_curriculum_studyplan
Create Date: 2026-05-01
"""

from __future__ import annotations

import sqlalchemy as sa

from alembic import op

revision = "0004_lesson_unit_id"
down_revision = "0003_curriculum_studyplan"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.add_column(
        "lessons",
        sa.Column("unit_id", sa.String(50), nullable=True),
    )
    op.create_index("ix_lessons_unit_id", "lessons", ["unit_id"])


def downgrade() -> None:
    op.drop_index("ix_lessons_unit_id", table_name="lessons")
    op.drop_column("lessons", "unit_id")
