"""Rename english_variant to target_language (BCP-47); add study_plans.target_language

Revision ID: 0007_target_language
Revises: 0006_conversation_timeouts
Create Date: 2026-05-04
"""
from typing import Sequence, Union

import sqlalchemy as sa
from alembic import op

revision: str = "0007_target_language"
down_revision: Union[str, None] = "0006_conversation_timeouts"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ── users table ──────────────────────────────────────────────────────────
    # 1. Add new column (nullable temporarily to allow back-fill)
    op.add_column(
        "users",
        sa.Column("target_language", sa.String(10), nullable=True),
    )
    # 2. Back-fill from english_variant
    op.execute(
        """
        UPDATE users
        SET target_language = CASE
            WHEN english_variant = 'british' THEN 'en-GB'
            ELSE 'en-US'
        END
        """
    )
    # 3. Make NOT NULL with default
    op.alter_column("users", "target_language", nullable=False, server_default="en-US")
    # 4. Drop old column
    op.drop_column("users", "english_variant")

    # ── study_plans table ────────────────────────────────────────────────────
    op.add_column(
        "study_plans",
        sa.Column("target_language", sa.String(10), nullable=True),
    )
    op.execute("UPDATE study_plans SET target_language = 'en-US'")
    op.alter_column("study_plans", "target_language", nullable=False, server_default="en-US")


def downgrade() -> None:
    # ── study_plans table ────────────────────────────────────────────────────
    op.drop_column("study_plans", "target_language")

    # ── users table ──────────────────────────────────────────────────────────
    op.add_column(
        "users",
        sa.Column("english_variant", sa.String(10), nullable=True),
    )
    op.execute(
        """
        UPDATE users
        SET english_variant = CASE
            WHEN target_language = 'en-GB' THEN 'british'
            ELSE 'american'
        END
        """
    )
    op.alter_column("users", "english_variant", nullable=False, server_default="american")
    op.drop_column("users", "target_language")
