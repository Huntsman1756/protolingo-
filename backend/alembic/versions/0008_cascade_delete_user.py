"""Add ondelete=CASCADE to FK constraints for user-owned tables

Revision ID: 0008_cascade_delete_user
Revises: 0007_target_language
Create Date: 2026-05-04
"""

from collections.abc import Sequence

from alembic import op

revision: str = "0008_cascade_delete_user"
down_revision: str | None = "0007_target_language"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    # ── flashcards.user_id ────────────────────────────────────────────────
    op.drop_constraint("flashcards_user_id_fkey", "flashcards", type_="foreignkey")
    op.create_foreign_key(
        "flashcards_user_id_fkey",
        "flashcards",
        "users",
        ["user_id"],
        ["id"],
        ondelete="CASCADE",
    )

    # ── study_plans.user_id ───────────────────────────────────────────────
    op.drop_constraint("study_plans_user_id_fkey", "study_plans", type_="foreignkey")
    op.create_foreign_key(
        "study_plans_user_id_fkey",
        "study_plans",
        "users",
        ["user_id"],
        ["id"],
        ondelete="CASCADE",
    )

    # ── progress.user_id ──────────────────────────────────────────────────
    op.drop_constraint("progress_user_id_fkey", "progress", type_="foreignkey")
    op.create_foreign_key(
        "progress_user_id_fkey",
        "progress",
        "users",
        ["user_id"],
        ["id"],
        ondelete="CASCADE",
    )

    # ── chat_history.user_id ──────────────────────────────────────────────
    op.drop_constraint("chat_history_user_id_fkey", "chat_history", type_="foreignkey")
    op.create_foreign_key(
        "chat_history_user_id_fkey",
        "chat_history",
        "users",
        ["user_id"],
        ["id"],
        ondelete="CASCADE",
    )

    # ── lessons.study_plan_id ─────────────────────────────────────────────
    op.drop_constraint("lessons_study_plan_id_fkey", "lessons", type_="foreignkey")
    op.create_foreign_key(
        "lessons_study_plan_id_fkey",
        "lessons",
        "study_plans",
        ["study_plan_id"],
        ["id"],
        ondelete="CASCADE",
    )

    # ── exercises.lesson_id ───────────────────────────────────────────────
    op.drop_constraint("exercises_lesson_id_fkey", "exercises", type_="foreignkey")
    op.create_foreign_key(
        "exercises_lesson_id_fkey",
        "exercises",
        "lessons",
        ["lesson_id"],
        ["id"],
        ondelete="CASCADE",
    )


def downgrade() -> None:
    op.drop_constraint("exercises_lesson_id_fkey", "exercises", type_="foreignkey")
    op.create_foreign_key(
        "exercises_lesson_id_fkey",
        "exercises",
        "lessons",
        ["lesson_id"],
        ["id"],
    )

    op.drop_constraint("lessons_study_plan_id_fkey", "lessons", type_="foreignkey")
    op.create_foreign_key(
        "lessons_study_plan_id_fkey",
        "lessons",
        "study_plans",
        ["study_plan_id"],
        ["id"],
    )

    op.drop_constraint("chat_history_user_id_fkey", "chat_history", type_="foreignkey")
    op.create_foreign_key(
        "chat_history_user_id_fkey",
        "chat_history",
        "users",
        ["user_id"],
        ["id"],
    )

    op.drop_constraint("progress_user_id_fkey", "progress", type_="foreignkey")
    op.create_foreign_key(
        "progress_user_id_fkey",
        "progress",
        "users",
        ["user_id"],
        ["id"],
    )

    op.drop_constraint("study_plans_user_id_fkey", "study_plans", type_="foreignkey")
    op.create_foreign_key(
        "study_plans_user_id_fkey",
        "study_plans",
        "users",
        ["user_id"],
        ["id"],
    )

    op.drop_constraint("flashcards_user_id_fkey", "flashcards", type_="foreignkey")
    op.create_foreign_key(
        "flashcards_user_id_fkey",
        "flashcards",
        "users",
        ["user_id"],
        ["id"],
    )
