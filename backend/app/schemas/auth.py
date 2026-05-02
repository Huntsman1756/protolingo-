from __future__ import annotations

from datetime import datetime
from typing import Literal, Optional

from pydantic import BaseModel, EmailStr, Field, field_serializer, field_validator

SUPPORTED_LANGUAGES = {
    "en", "es", "fr", "pt", "de", "it", "zh", "ja", "ko", "ar", "ru", "nl", "pl",
}


class RegisterRequest(BaseModel):
    username: str = Field(min_length=3, max_length=50, pattern=r"^[\w.-]+$")
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)
    display_name: Optional[str] = Field(default=None, max_length=100)
    native_language: str = Field(min_length=2, max_length=5)
    english_variant: Literal["american", "british"] = "american"
    invite_token: Optional[str] = None

    @field_validator("native_language")
    @classmethod
    def validate_language(cls, v: str) -> str:
        if v not in SUPPORTED_LANGUAGES:
            raise ValueError(f"Unsupported language code: {v}")
        return v


class LoginRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=1, max_length=128)


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"  # noqa: S105


class UserResponse(BaseModel):
    id: int
    username: str
    email: Optional[str]
    display_name: str
    role: str
    native_language: str
    english_variant: str
    is_active: bool
    conversation_max_duration: int
    conversation_inactivity_timeout: int
    created_at: datetime

    model_config = {"from_attributes": True}

    @field_serializer("created_at")
    def serialize_created_at(self, v: datetime, _info):
        return v.isoformat()


class UserUpdateRequest(BaseModel):
    display_name: Optional[str] = Field(default=None, max_length=100)
    email: Optional[EmailStr] = None
    password: Optional[str] = Field(default=None, min_length=8, max_length=128)
    native_language: Optional[str] = Field(default=None, min_length=2, max_length=5)
    english_variant: Optional[Literal["american", "british"]] = None
    conversation_max_duration: Optional[Literal[900, 1800]] = None
    conversation_inactivity_timeout: Optional[Literal[60, 180, 300]] = None
