"""Add reading_exercises and reading_attempts tables

Revision ID: 0019_reading
Revises: 0018_listening
Create Date: 2026-05-17
"""
from typing import Sequence, Union

import sqlalchemy as sa
from alembic import op

revision: str = "0019_reading"
down_revision: Union[str, None] = "0018_listening"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "reading_exercises",
        sa.Column("id", sa.Integer(), autoincrement=True, nullable=False),
        sa.Column("level", sa.String(length=2), nullable=False),
        sa.Column("target_language", sa.String(length=10), nullable=False),
        sa.Column("exercise_type", sa.String(length=20), nullable=False),
        sa.Column("topic", sa.String(length=200), nullable=False),
        sa.Column("text", sa.Text(), nullable=False),
        sa.Column("questions", sa.JSON(), nullable=False),
        sa.Column("view_count", sa.Integer(), nullable=False, server_default="0"),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index("ix_reading_exercises_level", "reading_exercises", ["level"])
    op.create_index(
        "ix_reading_exercises_target_language", "reading_exercises", ["target_language"]
    )
    # Composite index for pool lookup: find exercises by (level, target_language)
    op.create_index(
        "ix_reading_exercises_level_lang",
        "reading_exercises",
        ["level", "target_language"],
    )

    op.create_table(
        "reading_attempts",
        sa.Column("id", sa.Integer(), autoincrement=True, nullable=False),
        sa.Column("user_id", sa.Integer(), nullable=False),
        sa.Column("exercise_id", sa.Integer(), nullable=False),
        sa.Column("answers", sa.JSON(), nullable=False),
        sa.Column("score", sa.Integer(), nullable=False),
        sa.Column("xp_earned", sa.Integer(), nullable=False),
        sa.Column("completed_at", sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(["exercise_id"], ["reading_exercises.id"], ondelete="CASCADE"),
        sa.ForeignKeyConstraint(["user_id"], ["users.id"], ondelete="CASCADE"),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index("ix_reading_attempts_user_id", "reading_attempts", ["user_id"])
    op.create_index("ix_reading_attempts_exercise_id", "reading_attempts", ["exercise_id"])


def downgrade() -> None:
    op.drop_index("ix_reading_attempts_exercise_id", table_name="reading_attempts")
    op.drop_index("ix_reading_attempts_user_id", table_name="reading_attempts")
    op.drop_table("reading_attempts")

    op.drop_index("ix_reading_exercises_level_lang", table_name="reading_exercises")
    op.drop_index("ix_reading_exercises_target_language", table_name="reading_exercises")
    op.drop_index("ix_reading_exercises_level", table_name="reading_exercises")
    op.drop_table("reading_exercises")
