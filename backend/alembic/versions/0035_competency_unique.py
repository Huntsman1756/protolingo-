"""Add unique constraint on user_competencies to prevent duplicates per plan

Revision ID: 0035_competency_unique
Revises: 0034_user_language_id_fk
Create Date: 2026-06-05
"""

from collections.abc import Sequence

from alembic import op

revision: str = "0035_competency_unique"
down_revision: str | None = "0034_user_language_id_fk"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    # Deduplicate: keep the row with the highest id (most recent) per group,
    # deleting older duplicates so the unique constraint can be created.
    op.execute("""
        DELETE FROM user_competencies
        WHERE id NOT IN (
            SELECT MAX(id)
            FROM user_competencies
            GROUP BY user_id, study_plan_id, unit_id, competency_text
        )
    """)

    op.create_unique_constraint(
        "uq_competency_user_plan_unit_text",
        "user_competencies",
        ["user_id", "study_plan_id", "unit_id", "competency_text"],
    )


def downgrade() -> None:
    op.drop_constraint("uq_competency_user_plan_unit_text", "user_competencies", type_="unique")
