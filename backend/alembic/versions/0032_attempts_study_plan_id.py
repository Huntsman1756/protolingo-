"""Add study_plan_id to listening_attempts and reading_attempts

Revision ID: 0032_attempts_study_plan_id
Revises: 0031_not_null_study_plan_id
Create Date: 2026-06-05
"""

from collections.abc import Sequence

import sqlalchemy as sa

from alembic import op

revision: str = "0032_attempts_study_plan_id"
down_revision: str | None = "0031_not_null_study_plan_id"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    # ── 1. Add nullable study_plan_id columns with FK and index ──────────────
    op.add_column("listening_attempts", sa.Column("study_plan_id", sa.Integer(), nullable=True))
    op.create_foreign_key(
        "fk_listening_attempts_study_plan",
        "listening_attempts",
        "study_plans",
        ["study_plan_id"],
        ["id"],
        ondelete="CASCADE",
    )
    op.create_index(
        "ix_listening_attempts_study_plan_id",
        "listening_attempts",
        ["study_plan_id"],
    )

    op.add_column("reading_attempts", sa.Column("study_plan_id", sa.Integer(), nullable=True))
    op.create_foreign_key(
        "fk_reading_attempts_study_plan",
        "reading_attempts",
        "study_plans",
        ["study_plan_id"],
        ["id"],
        ondelete="CASCADE",
    )
    op.create_index(
        "ix_reading_attempts_study_plan_id",
        "reading_attempts",
        ["study_plan_id"],
    )

    # ── 2. Backfill — match attempts to study plans via exercise target_language ─
    op.execute("""
        UPDATE listening_attempts la
        SET study_plan_id = (
            SELECT sp.id FROM study_plans sp
            JOIN listening_exercises le ON le.id = la.exercise_id
            WHERE sp.user_id = la.user_id
              AND sp.target_language = le.target_language
              AND sp.is_active = true
            LIMIT 1
        )
        """)
    op.execute("""
        UPDATE reading_attempts ra
        SET study_plan_id = (
            SELECT sp.id FROM study_plans sp
            JOIN reading_exercises re ON re.id = ra.exercise_id
            WHERE sp.user_id = ra.user_id
              AND sp.target_language = re.target_language
              AND sp.is_active = true
            LIMIT 1
        )
        """)

    # ── 3. Fallback plans for orphan attempts (same pattern as 0029) ────────
    op.execute("""
        INSERT INTO study_plans (user_id, cefr_level, target_language, goals,
            duration_weeks, days_per_week, current_unit, progress_day,
            generated_plan, is_active, completion_test_taken, created_at)
        SELECT DISTINCT ON (la.user_id, le.target_language)
            la.user_id, 'A1', le.target_language, '[]'::json,
            12, 4, '', 0, '{}'::json, true, false, NOW()
        FROM listening_attempts la
        JOIN listening_exercises le ON le.id = la.exercise_id
        WHERE la.study_plan_id IS NULL
          AND NOT EXISTS (
            SELECT 1 FROM study_plans sp
            WHERE sp.user_id = la.user_id
              AND sp.target_language = le.target_language
              AND sp.is_active = true
          )
        """)
    op.execute("""
        INSERT INTO study_plans (user_id, cefr_level, target_language, goals,
            duration_weeks, days_per_week, current_unit, progress_day,
            generated_plan, is_active, completion_test_taken, created_at)
        SELECT DISTINCT ON (ra.user_id, re.target_language)
            ra.user_id, 'A1', re.target_language, '[]'::json,
            12, 4, '', 0, '{}'::json, true, false, NOW()
        FROM reading_attempts ra
        JOIN reading_exercises re ON re.id = ra.exercise_id
        WHERE ra.study_plan_id IS NULL
          AND NOT EXISTS (
            SELECT 1 FROM study_plans sp
            WHERE sp.user_id = ra.user_id
              AND sp.target_language = re.target_language
              AND sp.is_active = true
          )
        """)

    # ── 4. Re-run backfill for rows now covered by fallback plans ───────────
    op.execute("""
        UPDATE listening_attempts la
        SET study_plan_id = (
            SELECT sp.id FROM study_plans sp
            JOIN listening_exercises le ON le.id = la.exercise_id
            WHERE sp.user_id = la.user_id
              AND sp.target_language = le.target_language
              AND sp.is_active = true
            LIMIT 1
        )
        WHERE la.study_plan_id IS NULL
        """)
    op.execute("""
        UPDATE reading_attempts ra
        SET study_plan_id = (
            SELECT sp.id FROM study_plans sp
            JOIN reading_exercises re ON re.id = ra.exercise_id
            WHERE sp.user_id = ra.user_id
              AND sp.target_language = re.target_language
              AND sp.is_active = true
            LIMIT 1
        )
        WHERE ra.study_plan_id IS NULL
        """)

    # ── 5. Apply NOT NULL (all callers already pass study_plan_id) ──────────
    op.alter_column("listening_attempts", "study_plan_id", nullable=False)
    op.alter_column("reading_attempts", "study_plan_id", nullable=False)


def downgrade() -> None:
    op.drop_index("ix_reading_attempts_study_plan_id", table_name="reading_attempts")
    op.drop_constraint("fk_reading_attempts_study_plan", "reading_attempts", type_="foreignkey")
    op.drop_column("reading_attempts", "study_plan_id")

    op.drop_index("ix_listening_attempts_study_plan_id", table_name="listening_attempts")
    op.drop_constraint("fk_listening_attempts_study_plan", "listening_attempts", type_="foreignkey")
    op.drop_column("listening_attempts", "study_plan_id")
