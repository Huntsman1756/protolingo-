"""
Language-aware curriculum dispatcher.

For backward compatibility, CEFR_LEVELS remains a module-level constant.
All curriculum queries accept a ``target_language`` parameter (e.g. "en-US",
"es-ES", "it-IT", "pt-PT") to resolve the correct language module.
"""

from __future__ import annotations

import sys

from app.data._types import CEFRLevel, CurriculumUnit  # noqa: F401

CEFR_LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"]

_LANG_MODULES: dict[str, str] = {
    "en": "app.data.en.curriculum",
    "es": "app.data.es.curriculum",
    "it": "app.data.it.curriculum",
    "pt": "app.data.pt.curriculum",
}

_CACHE: dict[str, object] = {}


def _resolve_module(target_language: str) -> object:
    iso = target_language.split("-")[0]
    module_name = _LANG_MODULES.get(iso, "app.data.en.curriculum")

    if module_name not in _CACHE:
        __import__(module_name)
        _CACHE[module_name] = sys.modules[module_name]

    return _CACHE[module_name]


def get_curriculum(target_language: str) -> dict:
    """Return the full CURRICULUM dict for the given target language."""
    mod = _resolve_module(target_language)
    return mod.CURRICULUM


def get_curriculum_units(level: str, target_language: str = "en-US") -> list:
    """Return curriculum units for a CEFR level in the given target language."""
    curriculum = get_curriculum(target_language)
    return curriculum.get(level, [])


def distribute_units(
    units: list[CurriculumUnit],
    total_weeks: int,
    days_per_week: int,
) -> list[dict]:
    """Distribute curriculum units across lesson slots."""
    total_slots = total_weeks * days_per_week
    lesson_slots = max(1, total_slots - 1)

    lesson_types_per_unit = [lt for u in units for lt in u.lesson_types]

    if not lesson_types_per_unit:
        return []

    slots: list[dict] = []
    unit_index = 0
    type_index = 0

    for slot in range(lesson_slots):
        unit = units[min(unit_index, len(units) - 1)]
        lt_list = unit.lesson_types
        lt = lt_list[type_index % len(lt_list)] if lt_list else "grammar"

        slots.append(
            {
                "week": slot // days_per_week + 1,
                "day": slot % days_per_week + 1,
                "unit_id": unit.id,
                "unit_title": unit.title,
                "lesson_type": lt,
                "title": f"{unit.title} - Lesson {type_index + 1}",
                "objectives": unit.competency_checklist[:2] if unit.competency_checklist else [],
                "estimated_minutes": 25,
                "grammar_points": unit.grammar_points[:2] if unit.grammar_points else [],
                "vocabulary_set_ids": (
                    unit.vocabulary_set_ids[:1] if unit.vocabulary_set_ids else []
                ),
            }
        )

        type_index += 1
        if type_index % len(lt_list) == 0 and unit_index < len(units) - 1:
            remaining_slots = lesson_slots - slot - 1
            remaining_units = len(units) - unit_index - 1
            if remaining_slots <= remaining_units * len(units[unit_index + 1].lesson_types):
                unit_index += 1

    last_unit = units[-1]
    slots.append(
        {
            "week": total_weeks,
            "day": days_per_week,
            "unit_id": "completion-test",
            "unit_title": f"Level {units[0].level} Completion Test",
            "lesson_type": "review",
            "title": f"Level {units[0].level} Completion Test",
            "objectives": [
                "Review all grammar topics from this level",
                "Complete the assessment to unlock the next level",
            ],
            "estimated_minutes": 45,
            "grammar_points": last_unit.grammar_points,
            "vocabulary_set_ids": [],
        }
    )

    return slots
