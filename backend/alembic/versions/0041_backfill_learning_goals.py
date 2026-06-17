"""Backfill learning_goals to '[]' for onboarded users who skipped the goals step

Revision ID: 0041_backfill_learning_goals
Revises: 0040_add_target_language_to_conversations
Create Date: 2026-06-17
"""

from collections.abc import Sequence

from alembic import op

revision: str = "0041_backfill_learning_goals"
down_revision: str | None = "0040_add_target_language_to_conversations"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.execute("""
        UPDATE users
        SET learning_goals = '[]'
        WHERE learning_goals IS NULL
          AND id IN (SELECT DISTINCT user_id FROM user_languages)
    """)


def downgrade() -> None:
    """No structural change — no downgrade needed."""
    pass
