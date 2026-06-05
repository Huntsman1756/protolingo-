"""
CEFR C2 curriculum units.
"""

from __future__ import annotations

from app.data._types import CurriculumUnit

C2_UNITS = [
    CurriculumUnit(
        id="c2-unit-1",
        level="C2",
        unit_number=1,
        title="Padronanza della Grammatica Avanzata",
        grammar_points=["ripasso-congiuntivo", "ripasso-condizionale", "concordanza-avanzata"],
        vocabulary_set_ids=["eccellenza_c2"],
        lesson_types=["grammar", "vocabulary", "reading", "writing", "review"],
        competency_checklist=[
            "Demonstrate mastery of all subjunctive forms",
            "Use conditional constructions flawlessly",
            "Apply advanced agreement rules",
        ],
        default_weeks=2,
        prerequisite_unit=None,
    ),
    CurriculumUnit(
        id="c2-unit-2",
        level="C2",
        unit_number=2,
        title="Stilistica e Registro Letterario",
        grammar_points=["stile-letterario", "voce-narrativa", "figure-stilistiche"],
        vocabulary_set_ids=["letteratura_c2", "stile_c2"],
        lesson_types=["grammar", "vocabulary", "reading", "writing", "review"],
        competency_checklist=[
            "Write with literary style",
            "Control narrative voice",
            "Deploy advanced stylistic devices",
        ],
        default_weeks=2,
        prerequisite_unit="c2-unit-1",
    ),
    CurriculumUnit(
        id="c2-unit-3",
        level="C2",
        unit_number=3,
        title="Traduzione e Mediazione Linguistica",
        grammar_points=["equivalenza", "sfumature-traduzione", "falsi-amici"],
        vocabulary_set_ids=["traduzione_c2", "mediazione_c2"],
        lesson_types=["grammar", "vocabulary", "reading", "writing", "review"],
        competency_checklist=[
            "Translate nuanced texts",
            "Mediate between languages",
            "Navigate false friends",
        ],
        default_weeks=2,
        prerequisite_unit="c2-unit-2",
    ),
    CurriculumUnit(
        id="c2-unit-4",
        level="C2",
        unit_number=4,
        title="Cultura e Storia della Lingua Italiana",
        grammar_points=["evoluzione-linguistica", "latinismi", "prestiti-linguistici"],
        vocabulary_set_ids=["storia_c2", "cultura_c2"],
        lesson_types=["grammar", "vocabulary", "reading", "writing", "review"],
        competency_checklist=[
            "Understand language evolution",
            "Recognise Latin influences",
            "Identify loanwords",
        ],
        default_weeks=2,
        prerequisite_unit="c2-unit-3",
    ),
    CurriculumUnit(
        id="c2-unit-5",
        level="C2",
        unit_number=5,
        title="Creazione di Contenuti Avanzati",
        grammar_points=["generi-testuali", "creatività-linguistica", "revisione"],
        vocabulary_set_ids=["creazione_c2", "pubblicazione_c2"],
        lesson_types=["grammar", "vocabulary", "reading", "writing", "review"],
        competency_checklist=[
            "Create content across genres",
            "Demonstrate linguistic creativity",
            "Edit and refine complex texts",
        ],
        default_weeks=2,
        prerequisite_unit="c2-unit-4",
    ),
    CurriculumUnit(
        id="c2-unit-6",
        level="C2",
        unit_number=6,
        title="C2 Consolidamento e Maestria",
        grammar_points=["tutti-gli-argomenti", "integrazione", "fluidità-nativa"],
        vocabulary_set_ids=["maestria_c2"],
        lesson_types=["grammar", "vocabulary", "reading", "writing", "review"],
        competency_checklist=[
            "Reconstruct arguments coherently",
            "Express yourself spontaneously at native level",
            "Differentiate finer shades of meaning",
        ],
        default_weeks=1,
        prerequisite_unit="c2-unit-5",
    ),
]
