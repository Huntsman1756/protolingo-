"""StudyPlan curriculum fields + UserCompetency table

Revision ID: 0003_curriculum_studyplan
Revises: 0002_conversations
Create Date: 2026-05-01
"""
from typing import Sequence, Union

import sqlalchemy as sa
from alembic import op

revision: str = "0003_curriculum_studyplan"
down_revision: Union[str, None] = "0002_conversations"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ── study_plans: replace weeks_planned with curriculum-aware fields ──────
    op.add_column("study_plans", sa.Column("duration_weeks", sa.Integer(), nullable=True))
    op.add_column("study_plans", sa.Column("days_per_week", sa.Integer(), nullable=True))
    op.add_column("study_plans", sa.Column("current_unit", sa.String(length=50), nullable=True))
    op.add_column("study_plans", sa.Column("completion_test_taken", sa.Boolean(), nullable=True))
    op.add_column("study_plans", sa.Column("completion_test_score", sa.Float(), nullable=True))
    op.add_column(
        "study_plans",
        sa.Column("completion_test_recommendation", sa.String(length=20), nullable=True),
    )

    # Backfill nulls before setting NOT NULL
    op.execute("UPDATE study_plans SET duration_weeks = weeks_planned WHERE duration_weeks IS NULL")
    op.execute("UPDATE study_plans SET days_per_week = 4 WHERE days_per_week IS NULL")
    op.execute("UPDATE study_plans SET current_unit = '' WHERE current_unit IS NULL")
    op.execute(
        "UPDATE study_plans SET completion_test_taken = false WHERE completion_test_taken IS NULL"
    )

    op.alter_column("study_plans", "duration_weeks", nullable=False)
    op.alter_column("study_plans", "days_per_week", nullable=False)
    op.alter_column("study_plans", "current_unit", nullable=False)
    op.alter_column("study_plans", "completion_test_taken", nullable=False)

    op.drop_column("study_plans", "weeks_planned")

    # ── user_competencies table ───────────────────────────────────────────────
    op.create_table(
        "user_competencies",
        sa.Column("id", sa.Integer(), autoincrement=True, nullable=False),
        sa.Column("user_id", sa.Integer(), nullable=False),
        sa.Column("unit_id", sa.String(length=50), nullable=False),
        sa.Column("competency_text", sa.String(length=300), nullable=False),
        sa.Column("score", sa.Float(), nullable=False),
        sa.Column("mastered", sa.Boolean(), nullable=False),
        sa.Column("updated_at", sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(["user_id"], ["users.id"], ondelete="CASCADE"),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index("ix_user_competencies_user_id", "user_competencies", ["user_id"])
    op.create_index("ix_user_competencies_unit_id", "user_competencies", ["unit_id"])


def downgrade() -> None:
    op.drop_index("ix_user_competencies_unit_id", table_name="user_competencies")
    op.drop_index("ix_user_competencies_user_id", table_name="user_competencies")
    op.drop_table("user_competencies")

    op.add_column(
        "study_plans", sa.Column("weeks_planned", sa.Integer(), nullable=True)
    )
    op.execute("UPDATE study_plans SET weeks_planned = duration_weeks WHERE weeks_planned IS NULL")
    op.alter_column("study_plans", "weeks_planned", nullable=False)

    op.drop_column("study_plans", "completion_test_recommendation")
    op.drop_column("study_plans", "completion_test_score")
    op.drop_column("study_plans", "completion_test_taken")
    op.drop_column("study_plans", "current_unit")
    op.drop_column("study_plans", "days_per_week")
    op.drop_column("study_plans", "duration_weeks")
