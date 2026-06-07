"""Clean up duplicate English variants (en-US / en-GB) with no user activity.

When a user registered with en-GB but the old listening/reading code hardcoded
"en-US" as the fallback target_language, the Phase 10 migration chain (0032 →
0034) could create a second UserLanguage row and a fallback study plan for the
unwanted variant.  This migration detects those phantom rows and removes them,
but only when the unwanted language has absolutely zero user data attached.

Revision ID: 0036_cleanup_orphan_en_variants
Revises: 0035_competency_unique
Create Date: 2026-06-06
"""

from collections.abc import Sequence

from alembic import op

revision: str = "0036_cleanup_orphan_en_variants"
down_revision: str | None = "0035_competency_unique"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    # ── 1. Delete orphan study plans whose language has zero activity ────────
    #     Scope: only plans for en-US or en-GB where the SAME user has BOTH
    #     languages and the plan belongs to the inactive variant.
    #
    #     A plan is "empty" when it has zero rows in progress, flashcards,
    #     user_competencies, lessons, listening_attempts, reading_attempts,
    #     chat_history, and conversations.
    op.execute("""
        DELETE FROM study_plans
        WHERE id IN (
            SELECT sp.id
            FROM study_plans sp
            JOIN user_languages ul ON ul.id = sp.user_language_id
            WHERE ul.target_language IN ('en-US', 'en-GB')
              AND ul.is_active = false
              -- The same user also has the OTHER English variant
              AND EXISTS (
                SELECT 1 FROM user_languages ul2
                WHERE ul2.user_id = ul.user_id
                  AND ul2.target_language IN ('en-US', 'en-GB')
                  AND ul2.target_language != ul.target_language
              )
              -- Zero data in every related table
              AND NOT EXISTS (
                SELECT 1 FROM progress p
                WHERE p.study_plan_id = sp.id
              )
              AND NOT EXISTS (
                SELECT 1 FROM flashcards f
                WHERE f.study_plan_id = sp.id
              )
              AND NOT EXISTS (
                SELECT 1 FROM user_competencies uc
                WHERE uc.study_plan_id = sp.id
              )
              AND NOT EXISTS (
                SELECT 1 FROM lessons l
                WHERE l.study_plan_id = sp.id
              )
              AND NOT EXISTS (
                SELECT 1 FROM listening_attempts la
                WHERE la.study_plan_id = sp.id
              )
              AND NOT EXISTS (
                SELECT 1 FROM reading_attempts ra
                WHERE ra.study_plan_id = sp.id
              )
              AND NOT EXISTS (
                SELECT 1 FROM chat_history ch
                WHERE ch.study_plan_id = sp.id
              )
              AND NOT EXISTS (
                SELECT 1 FROM conversations c
                WHERE c.study_plan_id = sp.id
              )
        )
    """)

    # ── 2. Delete orphan UserLanguage rows that now have zero study plans ────
    #     After step 1, some inactive en-US/en-GB rows may have no plans left.
    #     Remove them so the user sees only their real language.
    op.execute("""
        DELETE FROM user_languages
        WHERE id IN (
            SELECT ul.id
            FROM user_languages ul
            WHERE ul.target_language IN ('en-US', 'en-GB')
              AND ul.is_active = false
              -- Same user has the other English variant
              AND EXISTS (
                SELECT 1 FROM user_languages ul2
                WHERE ul2.user_id = ul.user_id
                  AND ul2.target_language IN ('en-US', 'en-GB')
                  AND ul2.target_language != ul.target_language
              )
              -- No study plans remain for this language
              AND NOT EXISTS (
                SELECT 1 FROM study_plans sp
                WHERE sp.user_language_id = ul.id
              )
        )
    """)


def downgrade() -> None:
    # Data cleanup has no meaningful downgrade — the rows are already gone.
    # Recreating phantom entries would be incorrect.
    pass
