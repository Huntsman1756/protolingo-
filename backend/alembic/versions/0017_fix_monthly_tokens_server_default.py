"""Fix monthly_tokens_limit server default to 1000000 (was 0)

Revision ID: 0017_fix_monthly_tokens_server_default
Revises: 0016_stripe_subscription
Create Date: 2026-05-11
"""
from typing import Sequence, Union

import sqlalchemy as sa
from alembic import op

revision: str = "0017_fix_monthly_tokens_server_default"
down_revision: Union[str, None] = "0016_stripe_subscription"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.alter_column(
        "users",
        "monthly_tokens_limit",
        existing_type=sa.Integer(),
        server_default="1000000",
        existing_nullable=False,
    )


def downgrade() -> None:
    op.alter_column(
        "users",
        "monthly_tokens_limit",
        existing_type=sa.Integer(),
        server_default="0",
        existing_nullable=False,
    )
