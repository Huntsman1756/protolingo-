from __future__ import annotations

from datetime import datetime
from typing import Optional

from pydantic import BaseModel, field_serializer


class ExerciseContent(BaseModel):
    type: str
    question: str
    options: Optional[list[str]] = None
    correct: str
    explanation: str


class LessonContent(BaseModel):
    lesson_type: str
    title: str
    cefr_level: str
    explanation: dict
    exercises: list[dict]
    vocabulary: Optional[list[dict]] = None
    grammar_refs: list[str] = []
    unit_id: Optional[str] = None


class LessonResponse(BaseModel):
    id: int
    study_plan_id: int
    title: str
    lesson_type: str
    cefr_level: str
    week_number: int
    day_number: int
    content: dict
    is_completed: bool
    completed_at: Optional[datetime] = None

    model_config = {"from_attributes": True}

    @field_serializer("completed_at")
    def serialize_completed_at(self, v: Optional[datetime], _info):
        return v.isoformat() if v else None


class ExerciseResponse(BaseModel):
    id: int
    lesson_id: int
    exercise_type: str
    question: str
    options: Optional[list] = None
    correct_answer: str
    user_answer: Optional[str] = None
    score: Optional[float] = None
    feedback: Optional[str] = None
    answered_at: Optional[datetime] = None

    model_config = {"from_attributes": True}

    @field_serializer("answered_at")
    def serialize_answered_at(self, v: Optional[datetime], _info):
        return v.isoformat() if v else None


class LessonDetailResponse(BaseModel):
    lesson: LessonResponse
    exercises: list[ExerciseResponse]


class ExerciseAnswerRequest(BaseModel):
    answer: str


class ExerciseAnswerResponse(BaseModel):
    id: int
    score: float
    feedback: str
    correct_answer: str


class FreeWriteEvaluation(BaseModel):
    score: float
    feedback: str
    corrections: list[dict]


class PronunciationEvaluation(BaseModel):
    score: float
    feedback: str
    is_correct: bool
