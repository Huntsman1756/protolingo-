"""Add user_language_id FK to study_plans for referential integrity

Revision ID: 0034_user_language_id_fk
Revises: 0033_progress_unique_constraint
Create Date: 2026-06-05
"""

from collections.abc import Sequence

import sqlalchemy as sa

from alembic import op

revision: str = "0034_user_language_id_fk"
down_revision: str | None = "0033_progress_unique_constraint"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    # ── 1. Add nullable user_language_id column ─────────────────────────────
    op.add_column(
        "study_plans",
        sa.Column("user_language_id", sa.Integer(), nullable=True),
    )
    op.create_foreign_key(
        "fk_study_plans_user_language",
        "study_plans",
        "user_languages",
        ["user_language_id"],
        ["id"],
        ondelete="CASCADE",
    )
    op.create_index(
        "ix_study_plans_user_language_id",
        "study_plans",
        ["user_language_id"],
    )

    # ── 2. Create UserLanguage rows for orphan study plans ──────────────────
    #     (fallback plans from migration 0032 may have no matching row)
    op.execute("""
        INSERT INTO user_languages (user_id, target_language, is_active, created_at)
        SELECT sp.user_id, sp.target_language, false, NOW()
        FROM study_plans sp
        WHERE NOT EXISTS (
            SELECT 1 FROM user_languages ul
            WHERE ul.user_id = sp.user_id AND ul.target_language = sp.target_language
        )
        ON CONFLICT (user_id, target_language) DO NOTHING
    """)

    # ── 3. Backfill user_language_id ────────────────────────────────────────
    op.execute("""
        UPDATE study_plans sp
        SET user_language_id = ul.id
        FROM user_languages ul
        WHERE ul.user_id = sp.user_id AND ul.target_language = sp.target_language
    """)

    # ── 4. Replace the partial unique index ─────────────────────────────────
    #     Old: (user_id, target_language) WHERE is_active=true
    #     New: (user_language_id) WHERE is_active=true
    #     Equivalent because UserLanguage already has UNIQUE(user_id, target_language)
    op.drop_index("uq_active_plan_per_lang", table_name="study_plans")
    op.create_index(
        "uq_active_plan_per_lang",
        "study_plans",
        ["user_language_id"],
        unique=True,
        postgresql_where=sa.text("is_active = true"),
    )

    # ── 5. Make user_language_id NOT NULL ───────────────────────────────────
    op.alter_column("study_plans", "user_language_id", nullable=False)


def downgrade() -> None:
    op.drop_index("ix_study_plans_user_language_id", table_name="study_plans")
    op.drop_constraint("fk_study_plans_user_language", "study_plans", type_="foreignkey")
    op.drop_column("study_plans", "user_language_id")

    # Restore original partial unique index
    op.create_index(
        "uq_active_plan_per_lang",
        "study_plans",
        ["user_id", "target_language"],
        unique=True,
        postgresql_where=sa.text("is_active = true"),
    )
