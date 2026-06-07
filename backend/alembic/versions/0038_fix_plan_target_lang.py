"""Fix study_plans.target_language from user_languages where mismatched

Revision ID: 0038_fix_plan_target_lang
Revises: 0037_backfill_chat_history_spid
Create Date: 2026-06-06
"""

from collections.abc import Sequence

from alembic import op

revision: str = "0038_fix_plan_target_lang"
down_revision: str | None = "0037_backfill_chat_history_spid"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.execute("""
        UPDATE study_plans sp
        SET target_language = ul.target_language
        FROM user_languages ul
        WHERE sp.user_language_id = ul.id
          AND sp.target_language != ul.target_language
    """)


def downgrade() -> None:
    pass  # data fix — no schema change to revert
