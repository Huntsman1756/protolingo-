from pydantic import BaseModel, field_validator

from app.schemas.auth import get_available_languages


class LanguageAddRequest(BaseModel):
    target_language: str

    @field_validator("target_language")
    @classmethod
    def validate_target_language(cls, v: str) -> str:
        available = get_available_languages()
        if v not in available:
            raise ValueError(f"Language not available. Choose from: {available}")
        return v


class LanguageSwitchRequest(BaseModel):
    target_language: str

    @field_validator("target_language")
    @classmethod
    def validate_target_language(cls, v: str) -> str:
        available = get_available_languages()
        if v not in available:
            raise ValueError(f"Language not available. Choose from: {available}")
        return v


class LanguagePlanInfo(BaseModel):
    id: int
    cefr_level: str | None
    progress_day: int
    total_days: int
    completion_pct: float


class LanguageProgressInfo(BaseModel):
    total_xp: int
    current_streak: int
    lessons_completed: int


class UserLanguageOut(BaseModel):
    target_language: str
    is_active: bool
    plan: LanguagePlanInfo | None
    progress: LanguageProgressInfo | None


class UserLanguageListResponse(BaseModel):
    languages: list[UserLanguageOut]
    all_supported_languages: list[str]
