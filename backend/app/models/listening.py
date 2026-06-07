from __future__ import annotations

from datetime import UTC, datetime

from sqlalchemy import DateTime, ForeignKey, Index, Integer, String, Text
from sqlalchemy.dialects.postgresql import JSON
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base


class ListeningExercise(Base):
    """One row per generated exercise — shared across all users at the same level."""

    __tablename__ = "listening_exercises"

    __table_args__ = (Index("ix_listening_exercises_level_lang", "level", "target_language"),)

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    level: Mapped[str] = mapped_column(String(2), nullable=False, index=True)
    target_language: Mapped[str] = mapped_column(String(10), nullable=False, index=True)
    exercise_type: Mapped[str] = mapped_column(String(20), nullable=False)
    # monologue | announcement | voicemail | story | podcast
    topic: Mapped[str] = mapped_column(String(200), nullable=False)
    text: Mapped[str] = mapped_column(Text, nullable=False)  # NOT sent to client until after submit
    audio_path: Mapped[str] = mapped_column(String(500), nullable=False)
    duration_seconds: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    questions: Mapped[dict] = mapped_column(JSON, nullable=False)
    # [{"index": 0, "question": "...", "options": {"A":...,"B":...,"C":...,"D":...}, "correct": "B"}, ...]
    play_count: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    created_at: Mapped[datetime] = mapped_column(
        DateTime, nullable=False, default=lambda: datetime.now(UTC).replace(tzinfo=None)
    )


class ListeningAttempt(Base):
    """One row per user completion of a ListeningExercise."""

    __tablename__ = "listening_attempts"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    user_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True
    )
    exercise_id: Mapped[int] = mapped_column(
        Integer,
        ForeignKey("listening_exercises.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    study_plan_id: Mapped[int] = mapped_column(
        Integer,
        ForeignKey("study_plans.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    answers: Mapped[dict] = mapped_column(JSON, nullable=False)
    # {"0": "B", "1": "A", "2": "C", "3": "D", "4": "A"}
    score: Mapped[int] = mapped_column(Integer, nullable=False)  # 0–5
    xp_earned: Mapped[int] = mapped_column(Integer, nullable=False)
    completed_at: Mapped[datetime] = mapped_column(
        DateTime, nullable=False, default=lambda: datetime.now(UTC).replace(tzinfo=None)
    )
