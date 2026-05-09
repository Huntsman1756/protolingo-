from __future__ import annotations

from datetime import datetime, timezone
from typing import Optional

from sqlalchemy import Boolean, DateTime, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    username: Mapped[str] = mapped_column(String(50), unique=True, nullable=False, index=True)
    email: Mapped[Optional[str]] = mapped_column(String(255), unique=True, nullable=True)
    display_name: Mapped[str] = mapped_column(String(100), nullable=False)
    hashed_password: Mapped[str] = mapped_column(String(255), nullable=False)
    role: Mapped[str] = mapped_column(String(10), nullable=False, default="user")
    native_language: Mapped[str] = mapped_column(String(10), nullable=False)
    target_language: Mapped[str] = mapped_column(String(10), nullable=False, default="en-US")
    is_active: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True)
    is_verified: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)
    conversation_max_duration: Mapped[int] = mapped_column(
        Integer, nullable=False, default=1800   # 1800=30min, options: 900|1800
    )
    conversation_inactivity_timeout: Mapped[int] = mapped_column(
        Integer, nullable=False, default=180    # 180=3min, options: 60|180|300
    )
    conversation_weekly_sessions: Mapped[int] = mapped_column(
        Integer, nullable=False, default=0
    )
    conversation_daily_minutes: Mapped[int] = mapped_column(
        Integer, nullable=False, default=30
    )
    conversation_weekly_minutes: Mapped[int] = mapped_column(
        Integer, nullable=False, default=90
    )
    monthly_tokens_limit: Mapped[int] = mapped_column(
        Integer, nullable=False, default=0   # 0 = unlimited
    )
    avatar: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime, nullable=False, default=lambda: datetime.now(timezone.utc).replace(tzinfo=None)
    )
    last_login: Mapped[Optional[datetime]] = mapped_column(DateTime, nullable=True)
