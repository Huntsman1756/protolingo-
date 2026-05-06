"""Add llm_usage table for token tracking

Revision ID: 0010_llm_usage
Revises: 0009_user_avatar
Create Date: 2026-05-06
"""
from typing import Sequence, Union

import sqlalchemy as sa
from alembic import op

revision: str = "0010_llm_usage"
down_revision: Union[str, None] = "0009_user_avatar"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "llm_usage",
        sa.Column("id", sa.Integer(), autoincrement=True, nullable=False),
        sa.Column("user_id", sa.Integer(), nullable=False),
        sa.Column("source", sa.String(length=20), nullable=False),
        sa.Column("prompt_tokens", sa.Integer(), nullable=True),
        sa.Column("completion_tokens", sa.Integer(), nullable=True),
        sa.Column("total_tokens", sa.Integer(), nullable=True),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(["user_id"], ["users.id"], ondelete="CASCADE"),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index("ix_llm_usage_user_id", "llm_usage", ["user_id"])
    op.create_index("ix_llm_usage_source", "llm_usage", ["source"])


def downgrade() -> None:
    op.drop_index("ix_llm_usage_source", table_name="llm_usage")
    op.drop_index("ix_llm_usage_user_id", table_name="llm_usage")
    op.drop_table("llm_usage")
