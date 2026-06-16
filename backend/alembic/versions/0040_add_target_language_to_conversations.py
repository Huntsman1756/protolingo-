"""Add target_language column to conversations and chat_history

Revision ID: 0040_add_target_language
Revises: 0039_backfill_conversations_spid
Create Date: 2026-06-15
"""

from collections.abc import Sequence

import sqlalchemy as sa

from alembic import op

revision: str = "0040_add_target_language"
down_revision: str | None = "0039_backfill_conversations_spid"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    # Add columns as nullable first
    op.add_column("conversations", sa.Column("target_language", sa.String(10), nullable=True))
    op.add_column("chat_history", sa.Column("target_language", sa.String(10), nullable=True))

    # Create indexes
    op.create_index("ix_conversations_target_language", "conversations", ["target_language"])
    op.create_index("ix_chat_history_target_language", "chat_history", ["target_language"])

    # Backfill conversations: resolve target_language from study_plan → user_languages
    op.execute("""
        UPDATE conversations c
        SET target_language = (
            SELECT ul.target_language
            FROM study_plans sp
            JOIN user_languages ul ON ul.id = sp.user_language_id
            WHERE sp.id = c.study_plan_id
        )
        WHERE c.target_language IS NULL
    """)

    # Backfill chat_history: resolve target_language from study_plan → user_languages
    op.execute("""
        UPDATE chat_history ch
        SET target_language = (
            SELECT ul.target_language
            FROM study_plans sp
            JOIN user_languages ul ON ul.id = sp.user_language_id
            WHERE sp.id = ch.study_plan_id
        )
        WHERE ch.target_language IS NULL
    """)


def downgrade() -> None:
    op.drop_index("ix_chat_history_target_language", table_name="chat_history")
    op.drop_index("ix_conversations_target_language", table_name="conversations")
    op.drop_column("chat_history", "target_language")
    op.drop_column("conversations", "target_language")
