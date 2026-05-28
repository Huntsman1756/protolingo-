from __future__ import annotations

import re
from datetime import datetime
from typing import Literal

from pydantic import BaseModel, EmailStr, Field, field_serializer, field_validator

SUPPORTED_LANGUAGES = {
    "en",
    "es",
    "fr",
    "pt",
    "de",
    "it",
    "zh",
    "ja",
    "ko",
    "ar",
    "ru",
    "nl",
    "pl",
    "ro",
}


_PASSWORD_PATTERN = re.compile(r"^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{10,25}$")


class AdminUserCreate(BaseModel):
    username: str = Field(min_length=3, max_length=50, pattern=r"^[\w.-]+$")
    email: EmailStr | None = None
    password: str = Field(min_length=10, max_length=25)
    display_name: str = Field(max_length=100)
    native_language: str = Field(min_length=2, max_length=5)
    role: Literal["user", "admin"] = "user"

    @field_validator("password")
    @classmethod
    def check_password(cls, v: str) -> str:
        if not _PASSWORD_PATTERN.match(v):
            raise ValueError(
                "Password must be 10-25 characters and include at least "
                "one uppercase letter, one number, and one symbol"
            )
        return v

    @field_validator("native_language")
    @classmethod
    def validate_language(cls, v: str) -> str:
        if v not in SUPPORTED_LANGUAGES:
            raise ValueError(f"Unsupported language code: {v}")
        return v


class AdminUserUpdate(BaseModel):
    display_name: str | None = Field(default=None, max_length=100)
    role: Literal["user", "admin"] | None = None
    is_active: bool | None = None
    is_verified: bool | None = None
    conversation_weekly_sessions: int | None = Field(default=None, ge=0)
    conversation_daily_minutes: int | None = Field(default=None, ge=0)
    conversation_weekly_minutes: int | None = Field(default=None, ge=0)
    monthly_tokens_limit: int | None = Field(default=None, ge=0)
    subscription_status: Literal["none", "trialing", "active", "past_due", "canceled"] | None = None
    subscription_ends_at: datetime | None = None


class AdminUserResponse(BaseModel):
    id: int
    username: str
    email: str | None
    display_name: str
    role: str
    native_language: str
    is_active: bool
    is_verified: bool
    conversation_weekly_sessions: int = 0
    conversation_daily_minutes: int = 0
    conversation_weekly_minutes: int = 90
    monthly_tokens_limit: int = 0
    stripe_customer_id: str | None = None
    subscription_status: str = "none"
    subscription_ends_at: datetime | None = None
    created_at: datetime
    last_login: datetime | None

    model_config = {"from_attributes": True}

    @field_serializer("created_at", "last_login", "subscription_ends_at")
    def serialize_datetime(self, v: datetime | None, _info):  # noqa: ANN001
        return v.isoformat() if v else None


class InviteResponse(BaseModel):
    invite_url: str


class PaginatedAdminUsersResponse(BaseModel):
    items: list[AdminUserResponse]
    total: int
    skip: int
    limit: int


class AdminUserStatsResponse(BaseModel):
    """Aggregated stats for a single user, shown in the admin panel."""

    user_id: int

    # Active study plan
    current_cefr: str | None = None
    current_unit: str | None = None
    plan_duration_weeks: int | None = None
    completion_test_score: float | None = None

    # Progress aggregates
    xp_total: int = 0
    streak_current: int = 0
    active_days: int = 0
    lessons_completed: int = 0
    exercises_correct: int = 0
    exercises_total: int = 0

    # Tutor chat
    chat_messages_sent: int = 0

    # Token consumption (None means provider never returned usage data)
    tokens_total: int = 0
    tokens_chat: int = 0
    tokens_conversation: int = 0
