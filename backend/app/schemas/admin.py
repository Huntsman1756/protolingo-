from __future__ import annotations

from datetime import datetime
from typing import Literal, Optional

from pydantic import BaseModel, Field, field_serializer


class AdminUserCreate(BaseModel):
    username: str = Field(min_length=3, max_length=50, pattern=r"^[\w.-]+$")
    email: Optional[str] = None
    password: str = Field(min_length=8, max_length=128)
    display_name: str = Field(max_length=100)
    native_language: str = Field(min_length=2, max_length=5)
    role: Literal["user", "admin"] = "user"


class AdminUserUpdate(BaseModel):
    display_name: Optional[str] = Field(default=None, max_length=100)
    role: Optional[Literal["user", "admin"]] = None
    is_active: Optional[bool] = None


class AdminUserResponse(BaseModel):
    id: int
    username: str
    email: Optional[str]
    display_name: str
    role: str
    native_language: str
    is_active: bool
    created_at: datetime
    last_login: Optional[datetime]

    model_config = {"from_attributes": True}

    @field_serializer("created_at", "last_login")
    def serialize_datetime(self, v: Optional[datetime], _info):
        return v.isoformat() if v else None


class InviteResponse(BaseModel):
    invite_url: str
