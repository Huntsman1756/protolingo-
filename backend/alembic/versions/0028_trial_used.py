"""Add trial_used flag to users to prevent repeated free trials

Revision ID: 0028_trial_used
Revises: 0027_flashcard_source
Create Date: 2026-06-02
"""

from collections.abc import Sequence

import sqlalchemy as sa

from alembic import op

revision: str = "0028_trial_used"
down_revision: str | None = "0027_flashcard_source"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.add_column(
        "users",
        sa.Column("trial_used", sa.Boolean(), nullable=False, server_default=sa.false()),
    )
    # Backfill: users who are currently trialing or were once subscribed have used their trial.
    # Covers users who canceled after trialing so they cannot get a second free trial.
    op.execute(
        "UPDATE users SET trial_used = TRUE "
        "WHERE subscription_status IN ('trialing', 'active', 'past_due', 'canceled')"
    )


def downgrade() -> None:
    op.drop_column("users", "trial_used")
