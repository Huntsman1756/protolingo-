"""Add monthly_tokens_limit to users

Revision ID: 0014
Revises: 0013
Create Date: 2026-05-09
"""
from __future__ import annotations

from alembic import op
import sqlalchemy as sa

revision = "0014_monthly_token_quota"
down_revision = "0013_email_verification"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.add_column(
        "users",
        sa.Column(
            "monthly_tokens_limit",
            sa.Integer(),
            nullable=False,
            server_default="0",
        ),
    )


def downgrade() -> None:
    op.drop_column("users", "monthly_tokens_limit")
