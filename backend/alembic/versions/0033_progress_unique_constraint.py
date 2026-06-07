"""Add unique constraint on progress (user_id, study_plan_id, date)

Revision ID: 0033_progress_unique_constraint
Revises: 0032_attempts_study_plan_id
Create Date: 2026-06-05
"""

from collections.abc import Sequence

from alembic import op

revision: str = "0033_progress_unique_constraint"
down_revision: str | None = "0032_attempts_study_plan_id"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    # ── 1. Merge duplicate (user_id, study_plan_id, date) rows ──────────────
    # Counters are additive (SUM), streak_day takes the maximum.
    # Skills (JSONB) are merged with || — unique keys from all rows are
    # preserved; for conflicting keys the last row (highest id) wins.
    op.execute("""
        DO $$
        DECLARE
            dup_record RECORD;
            kept_row    RECORD;
            total_xp       int;
            total_lessons  int;
            total_correct  int;
            total_exercises int;
            max_streak     int;
            merged_skills  jsonb;
            row_skills     jsonb;
        BEGIN
            FOR dup_record IN
                SELECT user_id, study_plan_id, date
                FROM progress
                GROUP BY user_id, study_plan_id, date
                HAVING COUNT(*) > 1
            LOOP
                -- Keep the row with the lowest id
                SELECT * INTO kept_row
                FROM progress
                WHERE user_id        = dup_record.user_id
                  AND study_plan_id  = dup_record.study_plan_id
                  AND date           = dup_record.date
                ORDER BY id
                LIMIT 1;

                -- Sum additive counters across all duplicate rows
                SELECT SUM(xp_earned),
                       SUM(lessons_completed),
                       SUM(exercises_correct),
                       SUM(exercises_total),
                       MAX(streak_day)
                INTO total_xp, total_lessons, total_correct,
                     total_exercises, max_streak
                FROM progress
                WHERE user_id        = dup_record.user_id
                  AND study_plan_id  = dup_record.study_plan_id
                  AND date           = dup_record.date;

                -- Merge skills: overlay each row's skills in id order
                -- (later rows override earlier rows on key conflict)
                merged_skills := '{}'::jsonb;
                FOR row_skills IN
                    SELECT COALESCE(skills::jsonb, '{}'::jsonb) AS sk
                    FROM progress
                    WHERE user_id        = dup_record.user_id
                      AND study_plan_id  = dup_record.study_plan_id
                      AND date           = dup_record.date
                    ORDER BY id
                LOOP
                    merged_skills := merged_skills || row_skills;
                END LOOP;

                -- Update the kept row with merged values
                UPDATE progress
                SET xp_earned         = total_xp,
                    lessons_completed = total_lessons,
                    exercises_correct = total_correct,
                    exercises_total   = total_exercises,
                    streak_day        = max_streak,
                    skills            = merged_skills
                WHERE id = kept_row.id;

                -- Remove all other duplicate rows
                DELETE FROM progress
                WHERE user_id        = dup_record.user_id
                  AND study_plan_id  = dup_record.study_plan_id
                  AND date           = dup_record.date
                  AND id            != kept_row.id;
            END LOOP;
        END $$;
    """)

    # ── 2. Add the unique constraint ─────────────────────────────────────────
    op.create_unique_constraint(
        "uq_progress_user_plan_date",
        "progress",
        ["user_id", "study_plan_id", "date"],
    )


def downgrade() -> None:
    op.drop_constraint("uq_progress_user_plan_date", "progress", type_="unique")
