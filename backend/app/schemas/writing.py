from __future__ import annotations

from datetime import datetime

from pydantic import BaseModel, field_serializer


class WritingExerciseOut(BaseModel):
    """Exercise with prompt — no LLM evaluation or correct answers."""

    id: int
    level: str
    target_language: str
    exercise_type: str
    topic: str
    prompt: str
    word_count_min: int
    word_count_max: int

    model_config = {"from_attributes": True}


class WritingNextResponse(BaseModel):
    available: bool
    exercise: WritingExerciseOut | None = None


class WritingGeneratingResponse(BaseModel):
    status: str  # "generating"


class WritingSubmitRequest(BaseModel):
    exercise_id: int
    student_text: str
    replay: bool = False


class WritingSubmitResponse(BaseModel):
    score: int
    xp_earned: int
    feedback: str


class WritingAttemptOut(BaseModel):
    """Attempt + exercise data for history view."""

    id: int
    score: int
    xp_earned: int
    completed_at: datetime
    exercise: WritingExerciseOut
    student_text: str
    feedback: str

    @field_serializer("completed_at")
    def serialize_completed_at(self, v: datetime, _info: object) -> str:
        return v.isoformat()


class WritingHistoryResponse(BaseModel):
    items: list[WritingAttemptOut]
    total: int
    skip: int
    limit: int
