"""Multi-language support: user_languages table, study_plan_id columns, partial unique index

Revision ID: 0029_multi_language
Revises: 0028_trial_used
Create Date: 2026-06-02
"""

from collections.abc import Sequence

import sqlalchemy as sa

from alembic import op

revision: str = "0029_multi_language"
down_revision: str | None = "0028_trial_used"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    # ── 1. Create user_languages table ──────────────────────────────────────
    op.create_table(
        "user_languages",
        sa.Column("id", sa.Integer(), autoincrement=True, nullable=False),
        sa.Column("user_id", sa.Integer(), nullable=False),
        sa.Column("target_language", sa.String(10), nullable=False),
        sa.Column("is_active", sa.Boolean(), nullable=False, server_default=sa.true()),
        sa.Column(
            "created_at",
            sa.DateTime(),
            nullable=False,
            server_default=sa.func.now(),
        ),
        sa.ForeignKeyConstraint(["user_id"], ["users.id"], ondelete="CASCADE"),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("user_id", "target_language", name="uq_user_language"),
    )
    op.create_index("ix_user_languages_user_id", "user_languages", ["user_id"])
    op.create_index(
        "ix_user_language_user_active",
        "user_languages",
        ["user_id", "is_active"],
    )

    # ── 2. Add study_plan_id columns to 7 tables ────────────────────────────

    # CASCADE tables (nullable for now — NOT NULL deferred to Phase 10.2)
    op.add_column("progress", sa.Column("study_plan_id", sa.Integer(), nullable=True))
    op.create_foreign_key(
        "fk_progress_study_plan",
        "progress",
        "study_plans",
        ["study_plan_id"],
        ["id"],
        ondelete="CASCADE",
    )
    op.create_index("ix_progress_study_plan_id", "progress", ["study_plan_id"])

    op.add_column("flashcards", sa.Column("study_plan_id", sa.Integer(), nullable=True))
    op.create_foreign_key(
        "fk_flashcards_study_plan",
        "flashcards",
        "study_plans",
        ["study_plan_id"],
        ["id"],
        ondelete="CASCADE",
    )
    op.create_index("ix_flashcards_study_plan_id", "flashcards", ["study_plan_id"])

    op.add_column("user_competencies", sa.Column("study_plan_id", sa.Integer(), nullable=True))
    op.create_foreign_key(
        "fk_user_competencies_study_plan",
        "user_competencies",
        "study_plans",
        ["study_plan_id"],
        ["id"],
        ondelete="CASCADE",
    )
    op.create_index("ix_user_competencies_study_plan_id", "user_competencies", ["study_plan_id"])

    # SET NULL tables (permanently nullable)
    op.add_column("conversations", sa.Column("study_plan_id", sa.Integer(), nullable=True))
    op.create_foreign_key(
        "fk_conversations_study_plan",
        "conversations",
        "study_plans",
        ["study_plan_id"],
        ["id"],
        ondelete="SET NULL",
    )
    op.create_index("ix_conversations_study_plan_id", "conversations", ["study_plan_id"])

    op.add_column("chat_history", sa.Column("study_plan_id", sa.Integer(), nullable=True))
    op.create_foreign_key(
        "fk_chat_history_study_plan",
        "chat_history",
        "study_plans",
        ["study_plan_id"],
        ["id"],
        ondelete="SET NULL",
    )
    op.create_index("ix_chat_history_study_plan_id", "chat_history", ["study_plan_id"])

    op.add_column("memories", sa.Column("study_plan_id", sa.Integer(), nullable=True))
    op.create_foreign_key(
        "fk_memories_study_plan",
        "memories",
        "study_plans",
        ["study_plan_id"],
        ["id"],
        ondelete="SET NULL",
    )
    op.create_index("ix_memories_study_plan_id", "memories", ["study_plan_id"])

    op.add_column("llm_usage", sa.Column("study_plan_id", sa.Integer(), nullable=True))
    op.create_foreign_key(
        "fk_llm_usage_study_plan",
        "llm_usage",
        "study_plans",
        ["study_plan_id"],
        ["id"],
        ondelete="SET NULL",
    )
    op.create_index("ix_llm_usage_study_plan_id", "llm_usage", ["study_plan_id"])

    # ── 3. Partial unique index on study_plans ──────────────────────────────
    op.create_index(
        "uq_active_plan_per_lang",
        "study_plans",
        ["user_id", "target_language"],
        unique=True,
        postgresql_where=sa.text("is_active = true"),
    )

    # ── 4. Data operations ──────────────────────────────────────────────────

    # 4a. Backfill user_languages from existing users
    op.execute("""
        INSERT INTO user_languages (user_id, target_language, is_active, created_at)
        SELECT id, target_language, true, NOW()
        FROM users
        """)

    # 4b. Backfill study_plan_id for CASCADE tables
    op.execute("""
        UPDATE progress p
        SET study_plan_id = (
            SELECT id FROM study_plans sp
            WHERE sp.user_id = p.user_id AND sp.is_active = true
            LIMIT 1
        )
        """)
    op.execute("""
        UPDATE flashcards f
        SET study_plan_id = (
            SELECT id FROM study_plans sp
            WHERE sp.user_id = f.user_id AND sp.is_active = true
            LIMIT 1
        )
        """)
    op.execute("""
        UPDATE user_competencies uc
        SET study_plan_id = (
            SELECT id FROM study_plans sp
            WHERE sp.user_id = uc.user_id AND sp.is_active = true
            LIMIT 1
        )
        """)

    # 4c. Purge orphan rows (user had no active plan → semantically meaningless)
    op.execute("DELETE FROM progress WHERE study_plan_id IS NULL")
    op.execute("DELETE FROM flashcards WHERE study_plan_id IS NULL")
    op.execute("DELETE FROM user_competencies WHERE study_plan_id IS NULL")


def downgrade() -> None:
    # ── 1. Drop partial unique index ────────────────────────────────────────
    op.drop_index("uq_active_plan_per_lang", table_name="study_plans")

    # ── 2. Drop study_plan_id columns from all 7 tables ─────────────────────
    op.drop_index("ix_progress_study_plan_id", table_name="progress")
    op.drop_constraint("fk_progress_study_plan", "progress", type_="foreignkey")
    op.drop_column("progress", "study_plan_id")

    op.drop_index("ix_flashcards_study_plan_id", table_name="flashcards")
    op.drop_constraint("fk_flashcards_study_plan", "flashcards", type_="foreignkey")
    op.drop_column("flashcards", "study_plan_id")

    op.drop_index("ix_user_competencies_study_plan_id", table_name="user_competencies")
    op.drop_constraint("fk_user_competencies_study_plan", "user_competencies", type_="foreignkey")
    op.drop_column("user_competencies", "study_plan_id")

    op.drop_index("ix_conversations_study_plan_id", table_name="conversations")
    op.drop_constraint("fk_conversations_study_plan", "conversations", type_="foreignkey")
    op.drop_column("conversations", "study_plan_id")

    op.drop_index("ix_chat_history_study_plan_id", table_name="chat_history")
    op.drop_constraint("fk_chat_history_study_plan", "chat_history", type_="foreignkey")
    op.drop_column("chat_history", "study_plan_id")

    op.drop_index("ix_memories_study_plan_id", table_name="memories")
    op.drop_constraint("fk_memories_study_plan", "memories", type_="foreignkey")
    op.drop_column("memories", "study_plan_id")

    op.drop_index("ix_llm_usage_study_plan_id", table_name="llm_usage")
    op.drop_constraint("fk_llm_usage_study_plan", "llm_usage", type_="foreignkey")
    op.drop_column("llm_usage", "study_plan_id")

    # ── 3. Drop user_languages table ────────────────────────────────────────
    op.drop_index("ix_user_language_user_active", table_name="user_languages")
    op.drop_index("ix_user_languages_user_id", table_name="user_languages")
    op.drop_table("user_languages")
