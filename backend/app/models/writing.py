from __future__ import annotations

from datetime import UTC, datetime

from sqlalchemy import DateTime, ForeignKey, Index, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base


class WritingExercise(Base):
    """One row per generated exercise — shared across all users at the same level."""

    __tablename__ = "writing_exercises"

    __table_args__ = (Index("ix_writing_exercises_level_lang", "level", "target_language"),)

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    level: Mapped[str] = mapped_column(String(2), nullable=False, index=True)
    target_language: Mapped[str] = mapped_column(String(10), nullable=False, index=True)
    exercise_type: Mapped[str] = mapped_column(String(30), nullable=False)
    # email | short_story | opinion | description | diary_entry | forum_post | review
    topic: Mapped[str] = mapped_column(String(200), nullable=False)
    prompt: Mapped[str] = mapped_column(Text, nullable=False)
    # The prompt given to the student
    word_count_min: Mapped[int] = mapped_column(Integer, nullable=False, default=30)
    word_count_max: Mapped[int] = mapped_column(Integer, nullable=False, default=150)
    view_count: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    created_at: Mapped[datetime] = mapped_column(
        DateTime, nullable=False, default=lambda: datetime.now(UTC).replace(tzinfo=None)
    )


class WritingAttempt(Base):
    """One row per user completion of a WritingExercise."""

    __tablename__ = "writing_attempts"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    user_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True
    )
    exercise_id: Mapped[int] = mapped_column(
        Integer,
        ForeignKey("writing_exercises.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    study_plan_id: Mapped[int] = mapped_column(
        Integer,
        ForeignKey("study_plans.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    student_text: Mapped[str] = mapped_column(Text, nullable=False)
    # The student's written response
    score: Mapped[int] = mapped_column(Integer, nullable=False)  # 0–5
    xp_earned: Mapped[int] = mapped_column(Integer, nullable=False)
    feedback: Mapped[str] = mapped_column(Text, nullable=False)
    # LLM-generated feedback on strengths and areas to improve
    completed_at: Mapped[datetime] = mapped_column(
        DateTime, nullable=False, default=lambda: datetime.now(UTC).replace(tzinfo=None)
    )
