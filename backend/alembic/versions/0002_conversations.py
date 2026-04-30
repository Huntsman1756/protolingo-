"""Add conversations table and conversation_id to chat_history

Revision ID: 0002_conversations
Revises: 0001_initial
Create Date: 2026-04-30
"""
from typing import Sequence, Union

import sqlalchemy as sa
from alembic import op

revision: str = "0002_conversations"
down_revision: Union[str, None] = "0001_initial"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "conversations",
        sa.Column("id", sa.Integer(), autoincrement=True, nullable=False),
        sa.Column("user_id", sa.Integer(), nullable=False),
        sa.Column("title", sa.String(length=200), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.Column("updated_at", sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(["user_id"], ["users.id"], ondelete="CASCADE"),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index("ix_conversations_user_id", "conversations", ["user_id"])

    op.add_column(
        "chat_history",
        sa.Column("conversation_id", sa.Integer(), nullable=True),
    )
    op.create_foreign_key(
        "fk_chat_history_conversation_id",
        "chat_history",
        "conversations",
        ["conversation_id"],
        ["id"],
        ondelete="CASCADE",
    )
    op.create_index("ix_chat_history_conversation_id", "chat_history", ["conversation_id"])


def downgrade() -> None:
    op.drop_index("ix_chat_history_conversation_id", table_name="chat_history")
    op.drop_constraint("fk_chat_history_conversation_id", "chat_history", type_="foreignkey")
    op.drop_column("chat_history", "conversation_id")
    op.drop_index("ix_conversations_user_id", table_name="conversations")
    op.drop_table("conversations")
