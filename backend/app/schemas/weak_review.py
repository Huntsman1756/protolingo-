from __future__ import annotations

from datetime import date, datetime
from typing import Optional

from pydantic import BaseModel, field_serializer


class WeakReviewItemCreate(BaseModel):
    source_type: str
    source_id: Optional[str] = None
    prompt: str
    correct_answer: str
    user_wrong_answer: Optional[str] = None
    context: Optional[str] = None


class WeakReviewResponse(BaseModel):
    id: int
    user_id: int
    study_plan_id: int
    source_type: str
    source_id: Optional[str] = None
    prompt: str
    correct_answer: str
    user_wrong_answer: Optional[str] = None
    context: Optional[str] = None
    language: str
    ease_factor: float
    interval: int
    repetitions: int
    next_review: date
    consecutive_failures: int
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}

    @field_serializer("next_review")
    def serialize_next_review(self, v: date, _info):
        return v.isoformat()

    @field_serializer("created_at", "updated_at")
    def serialize_datetime(self, v: datetime, _info):
        return v.isoformat()


class WeakReviewListResponse(BaseModel):
    due: list[WeakReviewResponse]
    total: int
    stats: dict


class WeakReviewStatsResponse(BaseModel):
    total: int
    due: int
    breakdown: dict[str, int]


class WeakReviewReviewRequest(BaseModel):
    quality: int


class WeakReviewReviewResponse(BaseModel):
    item: WeakReviewResponse
    quality: int
