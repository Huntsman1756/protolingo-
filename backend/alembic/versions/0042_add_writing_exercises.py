"""add writing_exercises and writing_attempts tables

Revision ID: 0042
Revises: 0041
Create Date: 2026-06-20

"""
from collections.abc import Sequence

import sqlalchemy as sa

from alembic import op

# revision identifiers, used by Alembic.
revision: str = '0042_add_writing_exercises'
down_revision: str | None = '0041_backfill_learning_goals'
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    # === writing_exercises ===
    op.create_table(
        'writing_exercises',
        sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
        sa.Column('level', sa.String(2), nullable=False),
        sa.Column('target_language', sa.String(10), nullable=False),
        sa.Column('exercise_type', sa.String(30), nullable=False),
        sa.Column('topic', sa.String(200), nullable=False),
        sa.Column('prompt', sa.Text(), nullable=False),
        sa.Column('word_count_min', sa.Integer(), nullable=False, server_default='30'),
        sa.Column('word_count_max', sa.Integer(), nullable=False, server_default='150'),
        sa.Column('view_count', sa.Integer(), nullable=False, server_default='0'),
        sa.Column('created_at', sa.DateTime(), nullable=False,
                  server_default=sa.func.now()),
        sa.PrimaryKeyConstraint('id'),
    )
    op.create_index('ix_writing_exercises_level_lang', 'writing_exercises', ['level', 'target_language'])
    op.create_index('ix_writing_exercises_level', 'writing_exercises', ['level'])
    op.create_index('ix_writing_exercises_target_language', 'writing_exercises', ['target_language'])

    # === writing_attempts ===
    op.create_table(
        'writing_attempts',
        sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
        sa.Column('user_id', sa.Integer(), nullable=False),
        sa.Column('exercise_id', sa.Integer(), nullable=False),
        sa.Column('study_plan_id', sa.Integer(), nullable=False),
        sa.Column('student_text', sa.Text(), nullable=False),
        sa.Column('score', sa.Integer(), nullable=False, server_default='0'),
        sa.Column('xp_earned', sa.Integer(), nullable=False, server_default='0'),
        sa.Column('feedback', sa.Text(), nullable=False, server_default=''),
        sa.Column('completed_at', sa.DateTime(), nullable=False,
                  server_default=sa.func.now()),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ondelete='CASCADE'),
        sa.ForeignKeyConstraint(['exercise_id'], ['writing_exercises.id'], ondelete='CASCADE'),
        sa.ForeignKeyConstraint(['study_plan_id'], ['study_plans.id'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('id'),
    )
    op.create_index('ix_writing_attempts_user_id', 'writing_attempts', ['user_id'])
    op.create_index('ix_writing_attempts_exercise_id', 'writing_attempts', ['exercise_id'])
    op.create_index('ix_writing_attempts_study_plan_id', 'writing_attempts', ['study_plan_id'])


def downgrade() -> None:
    op.drop_index('ix_writing_attempts_study_plan_id', table_name='writing_attempts')
    op.drop_index('ix_writing_attempts_exercise_id', table_name='writing_attempts')
    op.drop_index('ix_writing_attempts_user_id', table_name='writing_attempts')
    op.drop_table('writing_attempts')
    op.drop_index('ix_writing_exercises_target_language', table_name='writing_exercises')
    op.drop_index('ix_writing_exercises_level', table_name='writing_exercises')
    op.drop_index('ix_writing_exercises_level_lang', table_name='writing_exercises')
    op.drop_table('writing_exercises')
