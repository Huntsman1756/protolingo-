"""add error_message column to documents table

Revision ID: 0045
Revises: 0044
Create Date: 2026-06-21

"""
from collections.abc import Sequence

import sqlalchemy as sa

from alembic import op

# revision identifiers, used by Alembic.
revision: str = '0045_add_document_error_message'
down_revision: str | None = '0044_add_documents'
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.add_column(
        'documents',
        sa.Column('error_message', sa.Text(), nullable=True),
    )


def downgrade() -> None:
    op.drop_column('documents', 'error_message')
