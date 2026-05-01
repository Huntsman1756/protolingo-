"""
Static curriculum data — Python mirror of frontend/src/data/curriculum.ts.
This is the authoritative learning sequence. The LLM never designs the sequence.
"""
from __future__ import annotations

from dataclasses import dataclass, field
from typing import Literal, Optional

CEFRLevel = Literal["A1", "A2", "B1", "B2", "C1", "C2"]
LessonType = Literal["grammar", "vocabulary", "reading", "writing", "review"]

CEFR_LEVELS: list[str] = ["A1", "A2", "B1", "B2", "C1", "C2"]

INTENSITY_CONFIG: dict[str, dict] = {
    "intensive":    {"duration_weeks": 4,  "days_per_week": 5},
    "standard":     {"duration_weeks": 8,  "days_per_week": 5},
    "relaxed":      {"duration_weeks": 12, "days_per_week": 4},  # default
    "very_relaxed": {"duration_weeks": 16, "days_per_week": 3},
}


@dataclass
class CurriculumUnit:
    id: str                            # e.g. "a1-unit-1"
    level: str
    unit_number: int
    title: str
    grammar_points: list[str]          # grammar slugs from grammar.ts
    vocabulary_set_ids: list[str]      # slugs from vocabulary.ts
    lesson_types: list[LessonType]
    competency_checklist: list[str]    # observable outcomes
    default_weeks: int                 # weeks this unit takes at default intensity
    prerequisite_unit: Optional[str] = None


# ── A1 ───────────────────────────────────────────────────────────────────────

A1_UNITS: list[CurriculumUnit] = [
    CurriculumUnit(
        id="a1-unit-1",
        level="A1",
        unit_number=1,
        title="Identity & Greetings",
        grammar_points=["to-be", "subject-pronouns", "questions-yes-no"],
        vocabulary_set_ids=["identity_a1", "greetings_a1"],
        lesson_types=["grammar", "vocabulary", "reading", "writing", "review"],
        competency_checklist=[
            "Introduce yourself (name, age, nationality)",
            "Ask and answer simple personal questions",
            "Understand basic greeting phrases",
        ],
        default_weeks=2,
        prerequisite_unit=None,
    ),
    CurriculumUnit(
        id="a1-unit-2",
        level="A1",
        unit_number=2,
        title="My World",
        grammar_points=["articles", "possessive-adjectives", "present-simple"],
        vocabulary_set_ids=["family_a1", "colours_a1", "adjectives_basic_a1"],
        lesson_types=["grammar", "vocabulary", "reading", "writing", "review"],
        competency_checklist=[
            "Describe family members and possessions",
            "Use a/an/the correctly in simple sentences",
            "Name common colours and basic adjectives",
        ],
        default_weeks=2,
        prerequisite_unit="a1-unit-1",
    ),
    CurriculumUnit(
        id="a1-unit-3",
        level="A1",
        unit_number=3,
        title="Daily Life",
        grammar_points=["present-simple", "questions-yes-no"],
        vocabulary_set_ids=["daily_routines_a1", "time_expressions_a1", "verbs_basic_a1"],
        lesson_types=["grammar", "vocabulary", "reading", "writing", "review"],
        competency_checklist=[
            "Talk about daily routines using present simple",
            "Tell the time and use time expressions",
            "Ask and answer yes/no questions about daily life",
        ],
        default_weeks=2,
        prerequisite_unit="a1-unit-2",
    ),
    CurriculumUnit(
        id="a1-unit-4",
        level="A1",
        unit_number=4,
        title="Places & Location",
        grammar_points=["there-is-are", "prepositions-place"],
        vocabulary_set_ids=["home_a1", "city_places_a1", "prepositions_a1"],
        lesson_types=["grammar", "vocabulary", "reading", "writing", "review"],
        competency_checklist=[
            "Describe where things are using prepositions",
            "Use there is/are to describe places",
            "Name rooms in a house and places in a city",
        ],
        default_weeks=1,
        prerequisite_unit="a1-unit-3",
    ),
    CurriculumUnit(
        id="a1-unit-5",
        level="A1",
        unit_number=5,
        title="Actions Right Now",
        grammar_points=["present-continuous"],
        vocabulary_set_ids=["action_verbs_a1", "clothes_a1"],
        lesson_types=["grammar", "vocabulary", "reading", "writing", "review"],
        competency_checklist=[
            "Describe what is happening right now",
            "Distinguish present simple from present continuous",
            "Name clothes and common actions",
        ],
        default_weeks=1,
        prerequisite_unit="a1-unit-4",
    ),
    CurriculumUnit(
        id="a1-unit-6",
        level="A1",
        unit_number=6,
        title="Yesterday",
        grammar_points=["past-simple"],
        vocabulary_set_ids=["past_time_expressions_a1", "regular_verbs_past_a1", "irregular_verbs_basic_a1"],
        lesson_types=["grammar", "vocabulary", "reading", "writing", "review"],
        competency_checklist=[
            "Talk about completed actions in the past",
            "Use regular and common irregular past forms",
            "Use past time expressions (yesterday, last week, ago)",
        ],
        default_weeks=2,
        prerequisite_unit="a1-unit-5",
    ),
    CurriculumUnit(
        id="a1-unit-7",
        level="A1",
        unit_number=7,
        title="Abilities & Wishes",
        grammar_points=["can-cant"],
        vocabulary_set_ids=["abilities_a1", "free_time_a1"],
        lesson_types=["grammar", "vocabulary", "reading", "writing", "review"],
        competency_checklist=[
            "Express ability and inability with can/can't",
            "Ask for and give permission",
            "Talk about hobbies and free-time activities",
        ],
        default_weeks=1,
        prerequisite_unit="a1-unit-6",
    ),
    CurriculumUnit(
        id="a1-unit-8",
        level="A1",
        unit_number=8,
        title="A1 Consolidation",
        grammar_points=[
            "to-be", "subject-pronouns", "articles", "possessive-adjectives",
            "present-simple", "present-continuous", "past-simple", "can-cant",
            "questions-yes-no",
        ],
        vocabulary_set_ids=["food_drinks_a1"],
        lesson_types=["grammar", "vocabulary", "reading", "writing", "review"],
        competency_checklist=[
            "Consolidate all A1 grammar with mixed practice",
            "Read and understand simple everyday texts",
            "Write a short paragraph about yourself",
        ],
        default_weeks=1,
        prerequisite_unit="a1-unit-7",
    ),
]

# ── A2 ───────────────────────────────────────────────────────────────────────

A2_UNITS: list[CurriculumUnit] = [
    CurriculumUnit(
        id="a2-unit-1",
        level="A2",
        unit_number=1,
        title="The Recent Past",
        grammar_points=["present-perfect", "past-simple"],
        vocabulary_set_ids=["life_events_a2", "past_collocations_a2"],
        lesson_types=["grammar", "vocabulary", "reading", "writing", "review"],
        competency_checklist=[
            "Distinguish present perfect from past simple",
            "Use ever/never with life experiences",
            "Write about recent personal events",
        ],
        default_weeks=2,
        prerequisite_unit=None,
    ),
    CurriculumUnit(
        id="a2-unit-2",
        level="A2",
        unit_number=2,
        title="Plans & Future",
        grammar_points=["future-going-to", "future-will", "present-continuous"],
        vocabulary_set_ids=["future_time_a2", "travel_plans_a2"],
        lesson_types=["grammar", "vocabulary", "reading", "writing", "review"],
        competency_checklist=[
            "Talk about future plans with going to / will",
            "Use present continuous for future arrangements",
            "Discuss travel and holiday plans",
        ],
        default_weeks=2,
        prerequisite_unit="a2-unit-1",
    ),
    CurriculumUnit(
        id="a2-unit-3",
        level="A2",
        unit_number=3,
        title="Comparisons",
        grammar_points=["comparatives-superlatives"],
        vocabulary_set_ids=["adjectives_comparison_a2", "places_comparison_a2"],
        lesson_types=["grammar", "vocabulary", "reading", "writing", "review"],
        competency_checklist=[
            "Compare two or more people, places, or things",
            "Use -er/-est and more/most correctly",
            "Describe places using superlatives",
        ],
        default_weeks=1,
        prerequisite_unit="a2-unit-2",
    ),
    CurriculumUnit(
        id="a2-unit-4",
        level="A2",
        unit_number=4,
        title="Ability & Permission",
        grammar_points=["can-cant", "could-past-ability", "may-permission"],
        vocabulary_set_ids=["abilities_a2", "permissions_a2"],
        lesson_types=["grammar", "vocabulary", "reading", "writing", "review"],
        competency_checklist=[
            "Express past ability using could",
            "Ask for and grant permission politely",
            "Use may/can/could in requests",
        ],
        default_weeks=1,
        prerequisite_unit="a2-unit-3",
    ),
    CurriculumUnit(
        id="a2-unit-5",
        level="A2",
        unit_number=5,
        title="Quantity & Shopping",
        grammar_points=["countable-uncountable", "some-any-much-many"],
        vocabulary_set_ids=["shopping_a2", "food_quantity_a2"],
        lesson_types=["grammar", "vocabulary", "reading", "writing", "review"],
        competency_checklist=[
            "Use some/any/much/many with countable and uncountable nouns",
            "Follow a shopping conversation",
            "Write a simple shopping list or order",
        ],
        default_weeks=1,
        prerequisite_unit="a2-unit-4",
    ),
    CurriculumUnit(
        id="a2-unit-6",
        level="A2",
        unit_number=6,
        title="Health & Body",
        grammar_points=["present-simple", "modal-verbs"],
        vocabulary_set_ids=["body_parts_a2", "health_symptoms_a2", "health_advice_a2"],
        lesson_types=["grammar", "vocabulary", "reading", "writing", "review"],
        competency_checklist=[
            "Name parts of the body and common symptoms",
            "Give and understand health advice using should",
            "Describe a health problem to a doctor",
        ],
        default_weeks=1,
        prerequisite_unit="a2-unit-5",
    ),
    CurriculumUnit(
        id="a2-unit-7",
        level="A2",
        unit_number=7,
        title="Travel & Transport",
        grammar_points=["past-simple", "questions-wh"],
        vocabulary_set_ids=["transport_a2", "directions_a2", "travel_vocabulary_a2"],
        lesson_types=["grammar", "vocabulary", "reading", "writing", "review"],
        competency_checklist=[
            "Ask for and give directions",
            "Talk about a past trip or journey",
            "Name common transport types and travel vocabulary",
        ],
        default_weeks=1,
        prerequisite_unit="a2-unit-6",
    ),
    CurriculumUnit(
        id="a2-unit-8",
        level="A2",
        unit_number=8,
        title="A2 Consolidation",
        grammar_points=[
            "present-perfect", "comparatives-superlatives", "can-cant",
            "could-past-ability", "some-any-much-many", "future-going-to",
        ],
        vocabulary_set_ids=["consolidation_a2"],
        lesson_types=["grammar", "vocabulary", "reading", "writing", "review"],
        competency_checklist=[
            "Consolidate all A2 grammar in mixed exercises",
            "Read and understand simple informational texts",
            "Write a short email or message (50–80 words)",
        ],
        default_weeks=1,
        prerequisite_unit="a2-unit-7",
    ),
]

# ── B1 ───────────────────────────────────────────────────────────────────────

B1_UNITS: list[CurriculumUnit] = [
    CurriculumUnit(
        id="b1-unit-1",
        level="B1",
        unit_number=1,
        title="Perfect Aspects",
        grammar_points=["present-perfect", "present-perfect-continuous", "past-perfect"],
        vocabulary_set_ids=["time_expressions_b1", "life_changes_b1"],
        lesson_types=["grammar", "vocabulary", "reading", "writing", "review"],
        competency_checklist=[
            "Use present perfect simple vs continuous correctly",
            "Describe events leading up to a past moment with past perfect",
            "Choose the correct perfect aspect in context",
        ],
        default_weeks=2,
        prerequisite_unit=None,
    ),
    CurriculumUnit(
        id="b1-unit-2",
        level="B1",
        unit_number=2,
        title="Conditionals 1 & 2",
        grammar_points=["first-conditional", "second-conditional", "zero-conditional"],
        vocabulary_set_ids=["conditionals_vocab_b1", "hypothetical_b1"],
        lesson_types=["grammar", "vocabulary", "reading", "writing", "review"],
        competency_checklist=[
            "Form and use zero, first, and second conditionals correctly",
            "Distinguish real from hypothetical conditions",
            "Write sentences speculating about the future or imagined situations",
        ],
        default_weeks=2,
        prerequisite_unit="b1-unit-1",
    ),
    CurriculumUnit(
        id="b1-unit-3",
        level="B1",
        unit_number=3,
        title="Passive Voice",
        grammar_points=["passive-voice-simple", "passive-voice-perfect"],
        vocabulary_set_ids=["processes_b1", "news_events_b1"],
        lesson_types=["grammar", "vocabulary", "reading", "writing", "review"],
        competency_checklist=[
            "Form passive sentences in present and past tenses",
            "Choose when to use passive over active voice",
            "Describe processes and news events using the passive",
        ],
        default_weeks=2,
        prerequisite_unit="b1-unit-2",
    ),
    CurriculumUnit(
        id="b1-unit-4",
        level="B1",
        unit_number=4,
        title="Relative Clauses & Connectors",
        grammar_points=["relative-clauses", "discourse-connectors-b1"],
        vocabulary_set_ids=["connectors_b1", "descriptions_b1"],
        lesson_types=["grammar", "vocabulary", "reading", "writing", "review"],
        competency_checklist=[
            "Use defining and non-defining relative clauses",
            "Connect ideas with although/however/therefore/as a result",
            "Write a structured paragraph with clear links between ideas",
        ],
        default_weeks=2,
        prerequisite_unit="b1-unit-3",
    ),
    CurriculumUnit(
        id="b1-unit-5",
        level="B1",
        unit_number=5,
        title="Modals & Advice",
        grammar_points=["modal-verbs", "should-ought-to", "must-have-to"],
        vocabulary_set_ids=["advice_b1", "obligation_b1"],
        lesson_types=["grammar", "vocabulary", "reading", "writing", "review"],
        competency_checklist=[
            "Use must/have to/should/ought to correctly",
            "Give and respond to advice",
            "Express obligation, prohibition, and recommendation",
        ],
        default_weeks=1,
        prerequisite_unit="b1-unit-4",
    ),
    CurriculumUnit(
        id="b1-unit-6",
        level="B1",
        unit_number=6,
        title="Reported Speech",
        grammar_points=["reported-speech"],
        vocabulary_set_ids=["reporting_verbs_b1", "news_b1"],
        lesson_types=["grammar", "vocabulary", "reading", "writing", "review"],
        competency_checklist=[
            "Report what someone said with correct tense backshift",
            "Use reporting verbs (say, tell, ask, explain)",
            "Summarise a short news item or conversation",
        ],
        default_weeks=1,
        prerequisite_unit="b1-unit-5",
    ),
    CurriculumUnit(
        id="b1-unit-7",
        level="B1",
        unit_number=7,
        title="Wishes & Regrets",
        grammar_points=["wish-if-only", "third-conditional"],
        vocabulary_set_ids=["feelings_regret_b1", "hypothetical_past_b1"],
        lesson_types=["grammar", "vocabulary", "reading", "writing", "review"],
        competency_checklist=[
            "Express wishes about present and past using wish/if only",
            "Use third conditional to talk about regrets",
            "Write about a decision you would change",
        ],
        default_weeks=2,
        prerequisite_unit="b1-unit-6",
    ),
    CurriculumUnit(
        id="b1-unit-8",
        level="B1",
        unit_number=8,
        title="B1 Consolidation",
        grammar_points=[
            "present-perfect", "first-conditional", "second-conditional",
            "passive-voice-simple", "relative-clauses", "modal-verbs", "reported-speech",
        ],
        vocabulary_set_ids=["consolidation_b1"],
        lesson_types=["grammar", "vocabulary", "reading", "writing", "review"],
        competency_checklist=[
            "Consolidate all B1 grammar in mixed tasks",
            "Read and understand intermediate informational texts",
            "Write a coherent piece of 100–150 words",
        ],
        default_weeks=1,
        prerequisite_unit="b1-unit-7",
    ),
]

# ── B2 / C1 / C2 — structure declared, units to be populated in future sprints

B2_UNITS: list[CurriculumUnit] = []
C1_UNITS: list[CurriculumUnit] = []
C2_UNITS: list[CurriculumUnit] = []

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
    Map curriculum units onto lesson slots across the chosen programme duration.

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
                    "estimated_minutes": 25,
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
