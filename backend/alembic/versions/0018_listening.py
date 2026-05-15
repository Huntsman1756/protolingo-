"""Add listening_exercises and listening_attempts tables

Revision ID: 0018_listening
Revises: 0017_fix_tokens_default
Create Date: 2026-05-15
"""
from typing import Sequence, Union

import sqlalchemy as sa
from alembic import op

revision: str = "0018_listening"
down_revision: Union[str, None] = "0017_fix_tokens_default"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "listening_exercises",
        sa.Column("id", sa.Integer(), autoincrement=True, nullable=False),
        sa.Column("level", sa.String(length=2), nullable=False),
        sa.Column("target_language", sa.String(length=10), nullable=False),
        sa.Column("exercise_type", sa.String(length=20), nullable=False),
        sa.Column("topic", sa.String(length=200), nullable=False),
        sa.Column("text", sa.Text(), nullable=False),
        sa.Column("audio_path", sa.String(length=500), nullable=False),
        sa.Column("duration_seconds", sa.Integer(), nullable=False, server_default="0"),
        sa.Column("questions", sa.JSON(), nullable=False),
        sa.Column("play_count", sa.Integer(), nullable=False, server_default="0"),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index("ix_listening_exercises_level", "listening_exercises", ["level"])
    op.create_index(
        "ix_listening_exercises_target_language", "listening_exercises", ["target_language"]
    )
    # Composite index for pool lookup: find exercises by (level, target_language)
    op.create_index(
        "ix_listening_exercises_level_lang",
        "listening_exercises",
        ["level", "target_language"],
    )

    op.create_table(
        "listening_attempts",
        sa.Column("id", sa.Integer(), autoincrement=True, nullable=False),
        sa.Column("user_id", sa.Integer(), nullable=False),
        sa.Column("exercise_id", sa.Integer(), nullable=False),
        sa.Column("answers", sa.JSON(), nullable=False),
        sa.Column("score", sa.Integer(), nullable=False),
        sa.Column("xp_earned", sa.Integer(), nullable=False),
        sa.Column("completed_at", sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(["exercise_id"], ["listening_exercises.id"], ondelete="CASCADE"),
        sa.ForeignKeyConstraint(["user_id"], ["users.id"], ondelete="CASCADE"),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index("ix_listening_attempts_user_id", "listening_attempts", ["user_id"])
    op.create_index("ix_listening_attempts_exercise_id", "listening_attempts", ["exercise_id"])


def downgrade() -> None:
    op.drop_index("ix_listening_attempts_exercise_id", table_name="listening_attempts")
    op.drop_index("ix_listening_attempts_user_id", table_name="listening_attempts")
    op.drop_table("listening_attempts")

    op.drop_index("ix_listening_exercises_level_lang", table_name="listening_exercises")
    op.drop_index("ix_listening_exercises_target_language", table_name="listening_exercises")
    op.drop_index("ix_listening_exercises_level", table_name="listening_exercises")
    op.drop_table("listening_exercises")
