"""
Static curriculum data — Python mirror of frontend/src/data/curriculum.ts.
This is the authoritative learning sequence. The LLM never designs the sequence.

This module is the orchestrator: it re-exports shared types and assembles the
full CURRICULUM dict from the per-level modules.
"""

from __future__ import annotations

# Re-export shared types so existing consumers importing from this module
# (via the app.data.curriculum proxy) continue to work unchanged.
from app.data._types import (  # noqa: F401
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

CURRICULUM: dict[str, list[CurriculumUnit]] = {
    "A1": A1_UNITS,
    "A2": A2_UNITS,
    "B1": B1_UNITS,
    "B2": B2_UNITS,
    "C1": C1_UNITS,
    "C2": C2_UNITS,
}
