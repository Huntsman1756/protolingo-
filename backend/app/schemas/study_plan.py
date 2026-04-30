from __future__ import annotations

from datetime import datetime
from typing import Optional

from pydantic import BaseModel, field_serializer


class StudyPlanGoal(BaseModel):
    goal: str


class GenerateStudyPlanRequest(BaseModel):
    cefr_level: str
    goals: list[str] = ["grammar", "vocabulary", "reading", "writing"]
    weeks: int = 4
    minutes_per_day: int = 30


class DayPlan(BaseModel):
    day: int
    lesson_type: str
    title: str
    objectives: list[str]
    estimated_minutes: int


class WeekPlan(BaseModel):
    week: int
    theme: str
    days: list[DayPlan]


class GeneratedPlan(BaseModel):
    title: str
    weekly_plan: list[WeekPlan]


class StudyPlanResponse(BaseModel):
    id: int
    user_id: int
    cefr_level: str
    goals: list[str]
    weeks_planned: int
    generated_plan: dict
    is_active: bool
    created_at: datetime

    model_config = {"from_attributes": True}

    @field_serializer("created_at")
    def serialize_created_at(self, v: datetime, _info):
        return v.isoformat()


class TodayLesson(BaseModel):
    id: Optional[int] = None
    title: str
    lesson_type: str
    week: int
    day: int
    objectives: list[str]
    estimated_minutes: int


class TodayResponse(BaseModel):
    plan_id: int
    lessons: list[TodayLesson]
