"""Add conversation_weekly_minutes, reset weekly_sessions default to 0

Revision ID: 0012_weekly_minutes
Revises: 0011_quota_fields
Create Date: 2026-05-09
"""
from typing import Sequence, Union

import sqlalchemy as sa
from alembic import op

revision: str = "0012_weekly_minutes"
down_revision: Union[str, None] = "0011_quota_fields"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Reset weekly_sessions to 0 (unlimited) for users still on the old default of 3
    op.execute("UPDATE users SET conversation_weekly_sessions = 0 WHERE conversation_weekly_sessions = 3")
    op.alter_column("users", "conversation_weekly_sessions", server_default="0")

    op.add_column(
        "users",
        sa.Column(
            "conversation_weekly_minutes",
            sa.Integer(),
            nullable=False,
            server_default="90",
        ),
    )


def downgrade() -> None:
    op.drop_column("users", "conversation_weekly_minutes")
    op.alter_column("users", "conversation_weekly_sessions", server_default="3")
