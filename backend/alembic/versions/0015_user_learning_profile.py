"""Add bio and learning_goals to users

Revision ID: 0015_user_learning_profile
Revises: 0014_monthly_token_quota
Create Date: 2026-05-10
"""

from collections.abc import Sequence

import sqlalchemy as sa

from alembic import op

revision: str = "0015_user_learning_profile"
down_revision: str | None = "0014_monthly_token_quota"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.add_column("users", sa.Column("bio", sa.Text(), nullable=True))
    op.add_column("users", sa.Column("learning_goals", sa.Text(), nullable=True))


def downgrade() -> None:
    op.drop_column("users", "learning_goals")
    op.drop_column("users", "bio")
