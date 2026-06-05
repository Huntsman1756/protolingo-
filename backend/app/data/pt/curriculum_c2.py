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
        title="Domínio da Gramática Avançada",
        grammar_points=["revisão-subjuntivo", "revisão-condicional", "concordância-avançada"],
        vocabulary_set_ids=["excelência_c2"],
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
        title="Estilística e Registo Literário",
        grammar_points=["estilo-literário", "voz-narrativa", "recursos-estilísticos"],
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
        title="Tradução e Mediação Linguística",
        grammar_points=["equivalência", "nuances-tradução", "falsos-amigos"],
        vocabulary_set_ids=["tradução_c2", "mediação_c2"],
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
        title="Cultura e História da Língua Portuguesa",
        grammar_points=["evolução-linguística", "arabismos", "tupinismos"],
        vocabulary_set_ids=["história_c2", "cultura_c2"],
        lesson_types=["grammar", "vocabulary", "reading", "writing", "review"],
        competency_checklist=[
            "Understand language evolution",
            "Recognise Arabic influences in Portuguese",
            "Identify indigenous loanwords",
        ],
        default_weeks=2,
        prerequisite_unit="c2-unit-3",
    ),
    CurriculumUnit(
        id="c2-unit-5",
        level="C2",
        unit_number=5,
        title="Criação de Conteúdo Avançado",
        grammar_points=["géneros-textuais", "criatividade-linguística", "edição"],
        vocabulary_set_ids=["criação_c2", "publicação_c2"],
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
        title="C2 Consolidação e Maestria",
        grammar_points=["todos-os-temas", "integração", "fluência-nativa"],
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
