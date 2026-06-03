from __future__ import annotations

from datetime import UTC, datetime

from sqlalchemy import DateTime, ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base


class LLMUsage(Base):
    """Tracks token consumption per user per LLM call.

    Rows are written best-effort — if the provider does not return usage
    (old Ollama versions, network issues, etc.) the row is simply not created.
    Never block normal application flow on this table.
    """

    __tablename__ = "llm_usage"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    user_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True
    )
    # "chat" (tutor chat) or "conversation" (real-time voice pipeline)
    source: Mapped[str] = mapped_column(String(20), nullable=False, index=True)
    prompt_tokens: Mapped[int | None] = mapped_column(Integer, nullable=True)
    completion_tokens: Mapped[int | None] = mapped_column(Integer, nullable=True)
    total_tokens: Mapped[int | None] = mapped_column(Integer, nullable=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        nullable=False,
        default=lambda: datetime.now(UTC).replace(tzinfo=None),
    )
    study_plan_id: Mapped[int | None] = mapped_column(
        Integer, ForeignKey("study_plans.id", ondelete="SET NULL"), nullable=True, index=True
    )
