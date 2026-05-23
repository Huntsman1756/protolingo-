"""Add source column to conversations table

Revision ID: 0021_conversation_source
Revises: 0020_feedback
Create Date: 2026-05-23
"""
from typing import Sequence, Union

import sqlalchemy as sa
from alembic import op

revision: str = "0021_conversation_source"
down_revision: Union[str, None] = "0020_feedback"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column(
        "conversations",
        sa.Column(
            "source",
            sa.String(length=10),
            nullable=False,
            server_default="chat",
        ),
    )


def downgrade() -> None:
    op.drop_column("conversations", "source")
