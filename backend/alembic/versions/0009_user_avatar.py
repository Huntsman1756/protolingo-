"""Add avatar column to users table

Revision ID: 0009_user_avatar
Revises: 0008_cascade_delete_user
Create Date: 2026-05-04
"""

from collections.abc import Sequence

import sqlalchemy as sa

from alembic import op

revision: str = "0009_user_avatar"
down_revision: str | None = "0008_cascade_delete_user"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.add_column("users", sa.Column("avatar", sa.Text(), nullable=True))


def downgrade() -> None:
    op.drop_column("users", "avatar")
