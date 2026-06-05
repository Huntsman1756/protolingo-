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
        title="Dominio de la Gramática Avanzada",
        grammar_points=["repaso-subjuntivo", "repaso-condicional", "concordancia-avanzada"],
        vocabulary_set_ids=["excelencia_c2"],
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
        title="Estilística y Registro Literario",
        grammar_points=["estilo-literario", "voz-narrativa", "recursos-estilisticos"],
        vocabulary_set_ids=["literatura_c2", "estilo_c2"],
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
        title="Traducción y Mediación Lingüística",
        grammar_points=["equivalencia", "matices-traduccion", "falsos-amigos"],
        vocabulary_set_ids=["traducción_c2", "mediación_c2"],
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
        title="Cultura e Historia del Español",
        grammar_points=["evolución-lingüística", "arabismos", "indigenismos"],
        vocabulary_set_ids=["historia_c2", "cultura_c2"],
        lesson_types=["grammar", "vocabulary", "reading", "writing", "review"],
        competency_checklist=[
            "Understand historical language evolution",
            "Recognise Arabic influences in Spanish",
            "Identify indigenous loanwords",
        ],
        default_weeks=2,
        prerequisite_unit="c2-unit-3",
    ),
    CurriculumUnit(
        id="c2-unit-5",
        level="C2",
        unit_number=5,
        title="Creación de Contenido Avanzado",
        grammar_points=["géneros-textuales", "creatividad-lingüística", "edición"],
        vocabulary_set_ids=["creación_c2", "publicación_c2"],
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
        title="C2 Consolidación y Maestría",
        grammar_points=["todos-los-temas", "integración", "fluidez-nativa"],
        vocabulary_set_ids=["maestría_c2"],
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
