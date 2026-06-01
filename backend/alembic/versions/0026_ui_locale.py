"""Add ui_locale column to users table

Revision ID: 0026_ui_locale
Revises: 0025_plan_progress_day
Create Date: 2026-06-01
"""

from collections.abc import Sequence

import sqlalchemy as sa

from alembic import op

revision: str = "0026_ui_locale"
down_revision: str | None = "0025_plan_progress_day"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.add_column("users", sa.Column("ui_locale", sa.String(10), nullable=True))
    op.execute("UPDATE users SET ui_locale = native_language WHERE ui_locale IS NULL")


def downgrade() -> None:
    op.drop_column("users", "ui_locale")
