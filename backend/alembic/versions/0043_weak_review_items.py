"""add weak_review_items table (SM-2 review loop for errors)

Revision ID: 0043
Revises: 0042
Create Date: 2026-06-20

"""
from collections.abc import Sequence

import sqlalchemy as sa

from alembic import op

# revision identifiers, used by Alembic.
revision: str = '0043_weak_review_items'
down_revision: str | None = '0042_add_writing_exercises'
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.create_table(
        'weak_review_items',
        sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
        sa.Column('user_id', sa.Integer(), sa.ForeignKey('users.id', ondelete='CASCADE'), nullable=False, index=True),
        sa.Column('study_plan_id', sa.Integer(), sa.ForeignKey('study_plans.id', ondelete='CASCADE'), nullable=False, index=True),
        sa.Column('source_type', sa.String(20), nullable=False, server_default='lesson_exercise'),
        sa.Column('source_id', sa.String(255), nullable=True),
        sa.Column('prompt', sa.Text(), nullable=False),
        sa.Column('correct_answer', sa.Text(), nullable=False),
        sa.Column('user_wrong_answer', sa.Text(), nullable=True),
        sa.Column('context', sa.Text(), nullable=True),
        sa.Column('language', sa.String(10), nullable=False, server_default='en-GB'),
        sa.Column('ease_factor', sa.Float(), nullable=False, server_default='2.5'),
        sa.Column('interval', sa.Integer(), nullable=False, server_default='0'),
        sa.Column('repetitions', sa.Integer(), nullable=False, server_default='0'),
        sa.Column('next_review', sa.Date(), nullable=False, server_default=sa.text('CURRENT_DATE')),
        sa.Column('consecutive_failures', sa.Integer(), nullable=False, server_default='0'),
        sa.Column('created_at', sa.DateTime(), nullable=False, server_default=sa.text('now()')),
        sa.Column('updated_at', sa.DateTime(), nullable=False, server_default=sa.text('now()')),
    )


def downgrade() -> None:
    op.drop_table('weak_review_items')
