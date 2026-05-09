from __future__ import annotations

from datetime import datetime
from typing import Optional

from pydantic import BaseModel, EmailStr, Field, field_serializer, field_validator

SUPPORTED_LANGUAGES = {
    "en", "es", "fr", "pt", "de", "it", "zh", "ja", "ko", "ar", "ru", "nl", "pl", "ro",
}

SUPPORTED_TARGET_LANGUAGES: set[str] = {"en-US", "en-GB"}


class RegisterRequest(BaseModel):
    username: str = Field(min_length=3, max_length=50, pattern=r"^[\w.-]+$")
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)
    display_name: Optional[str] = Field(default=None, max_length=100)
    native_language: str = Field(min_length=2, max_length=5)
    target_language: str = "en-US"
    invite_token: Optional[str] = None

    @field_validator("native_language")
    @classmethod
    def validate_language(cls, v: str) -> str:
        if v not in SUPPORTED_LANGUAGES:
            raise ValueError(f"Unsupported language code: {v}")
        return v

    @field_validator("target_language")
    @classmethod
    def validate_target_language(cls, v: str) -> str:
        if v not in SUPPORTED_TARGET_LANGUAGES:
            raise ValueError(f"Unsupported target language. Choose from: {SUPPORTED_TARGET_LANGUAGES}")
        return v


class LoginRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=1, max_length=128)


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"  # noqa: S105


class RegisterResponse(BaseModel):
    id: int
    username: str
    role: str
    access_token: str


class UserResponse(BaseModel):
    id: int
    username: str
    email: Optional[str]
    display_name: str
    role: str
    native_language: str
    target_language: str
    is_active: bool
    conversation_max_duration: int
    conversation_inactivity_timeout: int
    avatar: Optional[str] = None
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
    target_language: Optional[str] = None
    conversation_max_duration: Optional[int] = None
    conversation_inactivity_timeout: Optional[int] = None

    @field_validator("target_language")
    @classmethod
    def validate_target_language(cls, v: Optional[str]) -> Optional[str]:
        if v is not None and v not in SUPPORTED_TARGET_LANGUAGES:
            raise ValueError(f"Unsupported target language. Choose from: {SUPPORTED_TARGET_LANGUAGES}")
        return v

    @field_validator("conversation_max_duration")
    @classmethod
    def validate_max_duration(cls, v: Optional[int]) -> Optional[int]:
        if v is not None and v not in (900, 1800):
            raise ValueError("conversation_max_duration must be 900 or 1800")
        return v

    @field_validator("conversation_inactivity_timeout")
    @classmethod
    def validate_inactivity_timeout(cls, v: Optional[int]) -> Optional[int]:
        if v is not None and v not in (60, 180, 300):
            raise ValueError("conversation_inactivity_timeout must be 60, 180, or 300")
        return v
