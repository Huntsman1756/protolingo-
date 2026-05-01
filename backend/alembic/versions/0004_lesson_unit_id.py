"""Add unit_id to lessons table.

Revision ID: 0004
Revises: 0003
Create Date: 2026-05-01
"""
from __future__ import annotations

from alembic import op
import sqlalchemy as sa

revision = "0004"
down_revision = "0003"
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
