"""Add conversation quota fields to users

Revision ID: 0011_quota_fields
Revises: 0010_llm_usage
Create Date: 2026-05-09
"""

from collections.abc import Sequence

import sqlalchemy as sa

from alembic import op

revision: str = "0011_quota_fields"
down_revision: str | None = "0010_llm_usage"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.add_column(
        "users",
        sa.Column(
            "conversation_weekly_sessions",
            sa.Integer(),
            nullable=False,
            server_default="3",
        ),
    )
    op.add_column(
        "users",
        sa.Column(
            "conversation_daily_minutes",
            sa.Integer(),
            nullable=False,
            server_default="30",
        ),
    )


def downgrade() -> None:
    op.drop_column("users", "conversation_daily_minutes")
    op.drop_column("users", "conversation_weekly_sessions")
