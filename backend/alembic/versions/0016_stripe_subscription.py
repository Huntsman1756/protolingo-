"""Add Stripe subscription fields to users

Revision ID: 0016_stripe_subscription
Revises: 0015_user_learning_profile
Create Date: 2026-05-10
"""

from collections.abc import Sequence

import sqlalchemy as sa

from alembic import op

revision: str = "0016_stripe_subscription"
down_revision: str | None = "0015_user_learning_profile"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.add_column("users", sa.Column("stripe_customer_id", sa.String(255), nullable=True))
    op.add_column(
        "users",
        sa.Column(
            "subscription_status",
            sa.String(20),
            nullable=False,
            server_default="none",
        ),
    )
    op.add_column("users", sa.Column("subscription_ends_at", sa.DateTime(), nullable=True))


def downgrade() -> None:
    op.drop_column("users", "subscription_ends_at")
    op.drop_column("users", "subscription_status")
    op.drop_column("users", "stripe_customer_id")
