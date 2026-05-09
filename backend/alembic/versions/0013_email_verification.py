"""Add is_verified to users

Revision ID: 0013_email_verification
Revises: 0012_weekly_minutes
Create Date: 2026-05-09
"""
from typing import Sequence, Union

import sqlalchemy as sa
from alembic import op

revision: str = "0013_email_verification"
down_revision: Union[str, None] = "0012_weekly_minutes"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column(
        "users",
        sa.Column(
            "is_verified",
            sa.Boolean(),
            nullable=False,
            server_default="false",
        ),
    )
    # Existing users are considered already verified so they don't get a banner unexpectedly.
    op.execute("UPDATE users SET is_verified = true")


def downgrade() -> None:
    op.drop_column("users", "is_verified")
