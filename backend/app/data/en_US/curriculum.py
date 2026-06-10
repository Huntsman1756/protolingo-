"""
Static curriculum data — Python mirror of frontend/src/data/curriculum.ts.
This is the authoritative learning sequence. The LLM never designs the sequence.

This module is the orchestrator: it re-exports shared types and assembles the
full CURRICULUM dict from the per-level modules.
"""

from __future__ import annotations

# Re-export shared types so existing consumers importing from this module
# (via the app.data.curriculum proxy) continue to work unchanged.
from app.data.en_US._types import (  # noqa: F401
    CEFRLevel,
    CurriculumUnit,
    LessonType,
)
from app.data.en_US.curriculum_a1 import A1_UNITS
from app.data.en_US.curriculum_a2 import A2_UNITS
from app.data.en_US.curriculum_b1 import B1_UNITS
from app.data.en_US.curriculum_b2 import B2_UNITS
from app.data.en_US.curriculum_c1 import C1_UNITS
from app.data.en_US.curriculum_c2 import C2_UNITS

CEFR_LEVELS: list[str] = ["A1", "A2", "B1", "B2", "C1", "C2"]

# Estimated lesson duration in minutes per CEFR level.
LEVEL_MINUTES: dict[str, int] = {
    "A1": 20,
    "A2": 25,
    "B1": 30,
    "B2": 35,
    "C1": 40,
    "C2": 45,
}

INTENSITY_CONFIG: dict[str, dict] = {
    "intensive": {"duration_weeks": 4, "days_per_week": 5},
    "standard": {"duration_weeks": 8, "days_per_week": 5},
    "relaxed": {"duration_weeks": 12, "days_per_week": 4},  # default
    "very_relaxed": {"duration_weeks": 16, "days_per_week": 3},
}

CURRICULUM: dict[str, list[CurriculumUnit]] = {
    "A1": A1_UNITS,
    "A2": A2_UNITS,
    "B1": B1_UNITS,
    "B2": B2_UNITS,
    "C1": C1_UNITS,
    "C2": C2_UNITS,
}


def get_curriculum_units(level: str) -> list[CurriculumUnit]:
    """Return the ordered list of curriculum units for a given CEFR level."""
    return CURRICULUM.get(level, [])


def distribute_units(
    units: list[CurriculumUnit],
    total_weeks: int,
    days_per_week: int,
) -> list[dict]:
    """
    Map curriculum units onto lesson slots across the chosen program duration.

    Returns a flat list of lesson-slot dicts:
        {week, day, unit_id, lesson_type, title, objectives, estimated_minutes}

    The last slot of the plan is always the end-of-level completion test.
    """
    if not units:
        return []

    total_days = total_weeks * days_per_week
    # Reserve last slot for the level completion test
    lesson_days = total_days - 1

    # Distribute lesson days proportionally across units
    unit_count = len(units)
    slots: list[dict] = []
    day_cursor = 0

    for i, unit in enumerate(units):
        # Remaining units get remaining days (greedy proportional split)
        remaining_units = unit_count - i
        remaining_days = lesson_days - day_cursor
        unit_days = max(1, round(remaining_days / remaining_units))
        if i == unit_count - 1:
            unit_days = lesson_days - day_cursor  # last unit gets all remaining

        # Cycle through lesson types for this unit
        lesson_types_cycle = unit.lesson_types
        for j in range(unit_days):
            lesson_type = lesson_types_cycle[j % len(lesson_types_cycle)]
            abs_day = day_cursor + j
            week = (abs_day // days_per_week) + 1
            day_in_week = (abs_day % days_per_week) + 1
            slots.append(
                {
                    "week": week,
                    "day": day_in_week,
                    "unit_id": unit.id,
                    "unit_title": unit.title,
                    "lesson_type": lesson_type,
                    "title": f"{unit.title} — {lesson_type.capitalize()}",
                    "objectives": unit.competency_checklist[:2],
                    "estimated_minutes": LEVEL_MINUTES.get(unit.level, 25),
                    "grammar_points": unit.grammar_points,
                    "vocabulary_set_ids": unit.vocabulary_set_ids,
                }
            )
        day_cursor += unit_days

    # Append level completion test as the final slot
    last_unit = units[-1]
    abs_day = total_days - 1
    week = (abs_day // days_per_week) + 1
    day_in_week = (abs_day % days_per_week) + 1
    slots.append(
        {
            "week": week,
            "day": day_in_week,
            "unit_id": "level-test",
            "unit_title": "Level Completion Test",
            "lesson_type": "level_test",
            "title": f"Level Completion Test — {last_unit.level}",
            "objectives": ["Demonstrate mastery of all units in this level"],
            "estimated_minutes": 45,
            "grammar_points": [],
            "vocabulary_set_ids": [],
        }
    )
    return slots
