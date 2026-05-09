from __future__ import annotations

from datetime import datetime
from typing import Literal, Optional

from pydantic import BaseModel, EmailStr, Field, field_serializer, field_validator

SUPPORTED_LANGUAGES = {
    "en", "es", "fr", "pt", "de", "it", "zh", "ja", "ko", "ar", "ru", "nl", "pl", "ro",
}


class AdminUserCreate(BaseModel):
    username: str = Field(min_length=3, max_length=50, pattern=r"^[\w.-]+$")
    email: Optional[EmailStr] = None
    password: str = Field(min_length=8, max_length=128)
    display_name: str = Field(max_length=100)
    native_language: str = Field(min_length=2, max_length=5)
    role: Literal["user", "admin"] = "user"

    @field_validator("native_language")
    @classmethod
    def validate_language(cls, v: str) -> str:
        if v not in SUPPORTED_LANGUAGES:
            raise ValueError(f"Unsupported language code: {v}")
        return v


class AdminUserUpdate(BaseModel):
    display_name: Optional[str] = Field(default=None, max_length=100)
    role: Optional[Literal["user", "admin"]] = None
    is_active: Optional[bool] = None
    conversation_weekly_sessions: Optional[int] = Field(default=None, ge=0)
    conversation_daily_minutes: Optional[int] = Field(default=None, ge=0)
    conversation_weekly_minutes: Optional[int] = Field(default=None, ge=0)


class AdminUserResponse(BaseModel):
    id: int
    username: str
    email: Optional[str]
    display_name: str
    role: str
    native_language: str
    is_active: bool
    conversation_weekly_sessions: int = 0
    conversation_daily_minutes: int = 0
    conversation_weekly_minutes: int = 90
    created_at: datetime
    last_login: Optional[datetime]

    model_config = {"from_attributes": True}

    @field_serializer("created_at", "last_login")
    def serialize_datetime(self, v: Optional[datetime], _info):
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
    current_cefr: Optional[str] = None
    current_unit: Optional[str] = None
    plan_duration_weeks: Optional[int] = None
    completion_test_score: Optional[float] = None

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
