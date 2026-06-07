from __future__ import annotations

from pydantic import BaseModel


class CurriculumUnitResponse(BaseModel):
    id: str
    level: str
    unit_number: int
    title: str
    default_weeks: int
    grammar_points: list[str]
    vocabulary_set_ids: list[str]
    lesson_types: list[str]
    prerequisite_unit: str | None = None
    competency_checklist: list[str]


class CurriculumResponse(BaseModel):
    A1: list[CurriculumUnitResponse]
    A2: list[CurriculumUnitResponse]
    B1: list[CurriculumUnitResponse]
    B2: list[CurriculumUnitResponse]
    C1: list[CurriculumUnitResponse]
    C2: list[CurriculumUnitResponse]
