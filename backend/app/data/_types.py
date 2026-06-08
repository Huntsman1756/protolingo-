"""
Shared types for the curriculum data layer.
Used by all language curriculum modules.
"""

from __future__ import annotations

from dataclasses import dataclass
from typing import Literal

CEFRLevel = Literal["A1", "A2", "B1", "B2", "C1", "C2"]
LessonType = Literal["grammar", "vocabulary", "reading", "writing", "review"]


@dataclass
class CurriculumUnit:
    id: str  # e.g. "a1-unit-1"
    level: str
    unit_number: int
    title: str
    grammar_points: list[str]
    vocabulary_set_ids: list[str]
    lesson_types: list[LessonType]
    competency_checklist: list[str]
    default_weeks: int
    prerequisite_unit: str | None = None


Skill = Literal["grammar", "vocabulary", "reading"]


@dataclass
class AssessmentQuestion:
    id: str  # e.g. "g-a1-001", "v-b2-003", "r-c1-001"
    skill: Skill
    difficulty: CEFRLevel
    question: str
    options: list[str]  # exactly 4
    correct: str  # must match one option exactly
    grammar_slug: str | None = None
