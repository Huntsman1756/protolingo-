"""Add conversation timeout columns to users

Revision ID: 0006_conversation_timeouts
Revises: 0005_english_variant
Create Date: 2026-05-02
"""

from collections.abc import Sequence

import sqlalchemy as sa

from alembic import op

revision: str = "0006_conversation_timeouts"
down_revision: str | None = "0005_english_variant"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.add_column(
        "users",
        sa.Column(
            "conversation_max_duration",
            sa.Integer(),
            nullable=False,
            server_default="1800",
        ),
    )
    op.add_column(
        "users",
        sa.Column(
            "conversation_inactivity_timeout",
            sa.Integer(),
            nullable=False,
            server_default="180",
        ),
    )


def downgrade() -> None:
    op.drop_column("users", "conversation_inactivity_timeout")
    op.drop_column("users", "conversation_max_duration")
