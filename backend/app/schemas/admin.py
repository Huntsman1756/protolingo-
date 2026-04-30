from __future__ import annotations

from datetime import datetime
from typing import Optional

from pydantic import BaseModel, field_serializer


class AdminUserCreate(BaseModel):
    username: str
    email: Optional[str] = None
    password: str
    display_name: str
    native_language: str
    role: str = "user"


class AdminUserUpdate(BaseModel):
    display_name: Optional[str] = None
    role: Optional[str] = None
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
