"""Initial migration: users, study_plans, lessons, exercises, flashcards, progress

Revision ID: 0001_initial
Revises: None
Create Date: 2026-04-30
"""

from collections.abc import Sequence

import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

from alembic import op

revision: str = "0001_initial"
down_revision: str | None = None
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.create_table(
        "users",
        sa.Column("id", sa.Integer(), autoincrement=True, nullable=False),
        sa.Column("username", sa.String(length=50), nullable=False),
        sa.Column("email", sa.String(length=255), nullable=True),
        sa.Column("display_name", sa.String(length=100), nullable=False),
        sa.Column("hashed_password", sa.String(length=255), nullable=False),
        sa.Column("role", sa.String(length=10), nullable=False),
        sa.Column("native_language", sa.String(length=10), nullable=False),
        sa.Column("is_active", sa.Boolean(), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.Column("last_login", sa.DateTime(), nullable=True),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("username"),
        sa.UniqueConstraint("email"),
    )
    op.create_index(op.f("ix_users_username"), "users", ["username"])

    op.create_table(
        "study_plans",
        sa.Column("id", sa.Integer(), autoincrement=True, nullable=False),
        sa.Column("user_id", sa.Integer(), nullable=False),
        sa.Column("cefr_level", sa.String(length=10), nullable=False),
        sa.Column("goals", postgresql.JSON(), nullable=False),
        sa.Column("weeks_planned", sa.Integer(), nullable=False),
        sa.Column("generated_plan", postgresql.JSON(), nullable=False),
        sa.Column("is_active", sa.Boolean(), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(["user_id"], ["users.id"]),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_study_plans_user_id"), "study_plans", ["user_id"])

    op.create_table(
        "flashcards",
        sa.Column("id", sa.Integer(), autoincrement=True, nullable=False),
        sa.Column("user_id", sa.Integer(), nullable=False),
        sa.Column("word", sa.String(length=100), nullable=False),
        sa.Column("definition", sa.Text(), nullable=False),
        sa.Column("example_sentence", sa.Text(), nullable=False),
        sa.Column("translation", sa.String(length=255), nullable=False),
        sa.Column("ease_factor", sa.Float(), nullable=False),
        sa.Column("interval", sa.Integer(), nullable=False),
        sa.Column("repetitions", sa.Integer(), nullable=False),
        sa.Column("next_review", sa.Date(), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(["user_id"], ["users.id"]),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_flashcards_user_id"), "flashcards", ["user_id"])

    op.create_table(
        "progress",
        sa.Column("id", sa.Integer(), autoincrement=True, nullable=False),
        sa.Column("user_id", sa.Integer(), nullable=False),
        sa.Column("date", sa.Date(), nullable=False),
        sa.Column("xp_earned", sa.Integer(), nullable=False),
        sa.Column("lessons_completed", sa.Integer(), nullable=False),
        sa.Column("exercises_correct", sa.Integer(), nullable=False),
        sa.Column("exercises_total", sa.Integer(), nullable=False),
        sa.Column("streak_day", sa.Integer(), nullable=False),
        sa.Column("skills", postgresql.JSON(), nullable=False),
        sa.ForeignKeyConstraint(["user_id"], ["users.id"]),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_progress_user_id"), "progress", ["user_id"])

    op.create_table(
        "lessons",
        sa.Column("id", sa.Integer(), autoincrement=True, nullable=False),
        sa.Column("study_plan_id", sa.Integer(), nullable=False),
        sa.Column("title", sa.String(length=255), nullable=False),
        sa.Column("lesson_type", sa.String(length=50), nullable=False),
        sa.Column("cefr_level", sa.String(length=10), nullable=False),
        sa.Column("week_number", sa.Integer(), nullable=False),
        sa.Column("day_number", sa.Integer(), nullable=False),
        sa.Column("content", postgresql.JSON(), nullable=False),
        sa.Column("is_completed", sa.Boolean(), nullable=False),
        sa.Column("completed_at", sa.DateTime(), nullable=True),
        sa.ForeignKeyConstraint(["study_plan_id"], ["study_plans.id"]),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_lessons_study_plan_id"), "lessons", ["study_plan_id"])

    op.create_table(
        "exercises",
        sa.Column("id", sa.Integer(), autoincrement=True, nullable=False),
        sa.Column("lesson_id", sa.Integer(), nullable=False),
        sa.Column("exercise_type", sa.String(length=50), nullable=False),
        sa.Column("question", sa.Text(), nullable=False),
        sa.Column("options", postgresql.JSON(), nullable=True),
        sa.Column("correct_answer", sa.Text(), nullable=False),
        sa.Column("user_answer", sa.Text(), nullable=True),
        sa.Column("score", sa.Float(), nullable=True),
        sa.Column("feedback", sa.Text(), nullable=True),
        sa.Column("answered_at", sa.DateTime(), nullable=True),
        sa.ForeignKeyConstraint(["lesson_id"], ["lessons.id"]),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_exercises_lesson_id"), "exercises", ["lesson_id"])

    op.create_table(
        "chat_history",
        sa.Column("id", sa.Integer(), autoincrement=True, nullable=False),
        sa.Column("user_id", sa.Integer(), nullable=False),
        sa.Column("role", sa.String(length=20), nullable=False),
        sa.Column("content", sa.Text(), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(["user_id"], ["users.id"]),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_chat_history_user_id"), "chat_history", ["user_id"])


def downgrade() -> None:
    op.drop_index(op.f("ix_chat_history_user_id"), table_name="chat_history")
    op.drop_table("chat_history")
    op.drop_index(op.f("ix_exercises_lesson_id"), table_name="exercises")
    op.drop_table("exercises")
    op.drop_index(op.f("ix_lessons_study_plan_id"), table_name="lessons")
    op.drop_table("lessons")
    op.drop_index(op.f("ix_progress_user_id"), table_name="progress")
    op.drop_table("progress")
    op.drop_index(op.f("ix_flashcards_user_id"), table_name="flashcards")
    op.drop_table("flashcards")
    op.drop_index(op.f("ix_study_plans_user_id"), table_name="study_plans")
    op.drop_table("study_plans")
    op.drop_index(op.f("ix_users_username"), table_name="users")
    op.drop_table("users")
