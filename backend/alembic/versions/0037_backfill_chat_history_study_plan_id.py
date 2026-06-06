"""Backfill study_plan_id for existing chat_history rows

Revision ID: 0037_backfill_chat_history_study_plan_id
Revises: 0036_cleanup_orphan_en_variants
Create Date: 2026-06-06
"""

from collections.abc import Sequence

from alembic import op

revision: str = "0037_backfill_chat_history_study_plan_id"
down_revision: str | None = "0036_cleanup_orphan_en_variants"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.execute("""
        UPDATE chat_history ch
        SET study_plan_id = (
            SELECT sp.id
            FROM study_plans sp
            WHERE sp.user_id = ch.user_id
              AND sp.is_active = true
            LIMIT 1
        )
        WHERE ch.study_plan_id IS NULL
    """)


def downgrade() -> None:
    pass  # data backfill — no schema change to revert
