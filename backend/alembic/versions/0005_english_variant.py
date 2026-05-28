"""Add english_variant column to users

Revision ID: 0005_english_variant
Revises: 0004_lesson_unit_id
Create Date: 2026-05-01
"""

from collections.abc import Sequence

import sqlalchemy as sa

from alembic import op

revision: str = "0005_english_variant"
down_revision: str | None = "0004_lesson_unit_id"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.add_column(
        "users",
        sa.Column(
            "english_variant",
            sa.String(length=10),
            nullable=False,
            server_default="american",
        ),
    )


def downgrade() -> None:
    op.drop_column("users", "english_variant")
