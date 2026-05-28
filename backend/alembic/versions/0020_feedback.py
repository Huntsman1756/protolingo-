"""Add feedback_entries, feedback_votes, and feedback_comments tables

Revision ID: 0020_feedback
Revises: 0019_reading
Create Date: 2026-05-22
"""

from collections.abc import Sequence

import sqlalchemy as sa

from alembic import op

revision: str = "0020_feedback"
down_revision: str | None = "0019_reading"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.create_table(
        "feedback_entries",
        sa.Column("id", sa.Integer(), autoincrement=True, nullable=False),
        sa.Column("type", sa.String(length=10), nullable=False),
        sa.Column("title", sa.String(length=200), nullable=False),
        sa.Column("description", sa.Text(), nullable=False),
        sa.Column("status", sa.String(length=20), nullable=False, server_default="pending"),
        sa.Column("author_id", sa.Integer(), nullable=False),
        sa.Column("vote_count", sa.Integer(), nullable=False, server_default="0"),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(["author_id"], ["users.id"], ondelete="CASCADE"),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index("ix_feedback_entries_type", "feedback_entries", ["type"])
    op.create_index("ix_feedback_entries_status", "feedback_entries", ["status"])
    op.create_index("ix_feedback_entries_author_id", "feedback_entries", ["author_id"])
    op.create_index("ix_feedback_entries_created_at", "feedback_entries", ["created_at"])

    op.create_table(
        "feedback_votes",
        sa.Column("id", sa.Integer(), autoincrement=True, nullable=False),
        sa.Column("entry_id", sa.Integer(), nullable=False),
        sa.Column("user_id", sa.Integer(), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(["entry_id"], ["feedback_entries.id"], ondelete="CASCADE"),
        sa.ForeignKeyConstraint(["user_id"], ["users.id"], ondelete="CASCADE"),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("entry_id", "user_id", name="uq_feedback_vote"),
    )
    op.create_index("ix_feedback_votes_entry_id", "feedback_votes", ["entry_id"])
    op.create_index("ix_feedback_votes_user_id", "feedback_votes", ["user_id"])

    op.create_table(
        "feedback_comments",
        sa.Column("id", sa.Integer(), autoincrement=True, nullable=False),
        sa.Column("entry_id", sa.Integer(), nullable=False),
        sa.Column("author_id", sa.Integer(), nullable=False),
        sa.Column("body", sa.Text(), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(["entry_id"], ["feedback_entries.id"], ondelete="CASCADE"),
        sa.ForeignKeyConstraint(["author_id"], ["users.id"], ondelete="CASCADE"),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index("ix_feedback_comments_entry_id", "feedback_comments", ["entry_id"])
    op.create_index("ix_feedback_comments_author_id", "feedback_comments", ["author_id"])


def downgrade() -> None:
    op.drop_index("ix_feedback_comments_author_id", table_name="feedback_comments")
    op.drop_index("ix_feedback_comments_entry_id", table_name="feedback_comments")
    op.drop_table("feedback_comments")

    op.drop_index("ix_feedback_votes_user_id", table_name="feedback_votes")
    op.drop_index("ix_feedback_votes_entry_id", table_name="feedback_votes")
    op.drop_table("feedback_votes")

    op.drop_index("ix_feedback_entries_created_at", table_name="feedback_entries")
    op.drop_index("ix_feedback_entries_author_id", table_name="feedback_entries")
    op.drop_index("ix_feedback_entries_status", table_name="feedback_entries")
    op.drop_index("ix_feedback_entries_type", table_name="feedback_entries")
    op.drop_table("feedback_entries")
