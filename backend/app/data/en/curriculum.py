"""
Static curriculum data — Python mirror of frontend/src/data/curriculum.ts.
This is the authoritative learning sequence. The LLM never designs the sequence.
"""

from __future__ import annotations

from dataclasses import dataclass
from typing import Literal

CEFRLevel = Literal["A1", "A2", "B1", "B2", "C1", "C2"]
LessonType = Literal["grammar", "vocabulary", "reading", "writing", "review"]

CEFR_LEVELS: list[str] = ["A1", "A2", "B1", "B2", "C1", "C2"]

INTENSITY_CONFIG: dict[str, dict] = {
    "intensive": {"duration_weeks": 4, "days_per_week": 5},
    "standard": {"duration_weeks": 8, "days_per_week": 5},
    "relaxed": {"duration_weeks": 12, "days_per_week": 4},  # default
    "very_relaxed": {"duration_weeks": 16, "days_per_week": 3},
}


@dataclass
class CurriculumUnit:
    id: str  # e.g. "a1-unit-1"
    level: str
    unit_number: int
    title: str
    grammar_points: list[str]  # grammar slugs from grammar.ts
    vocabulary_set_ids: list[str]  # slugs from vocabulary.ts
    lesson_types: list[LessonType]
    competency_checklist: list[str]  # observable outcomes
    default_weeks: int  # weeks this unit takes at default intensity
    prerequisite_unit: str | None = None


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
        vocabulary_set_ids=[
            "past_time_expressions_a1",
            "regular_verbs_past_a1",
            "irregular_verbs_basic_a1",
        ],
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
            "to-be",
            "subject-pronouns",
            "articles",
            "possessive-adjectives",
            "present-simple",
            "present-continuous",
            "past-simple",
            "can-cant",
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
        grammar_points=["past-simple"],
        vocabulary_set_ids=["irregular_verbs_a2", "past_time_a2"],
        lesson_types=["grammar", "vocabulary", "reading", "writing", "review"],
        competency_checklist=[
            "Uses 40+ common irregular past forms correctly",
            "Narrates a sequence of past events in a short paragraph",
            "Asks past questions using Did, Where did, When did",
        ],
        default_weeks=2,
        prerequisite_unit=None,
    ),
    CurriculumUnit(
        id="a2-unit-2",
        level="A2",
        unit_number=2,
        title="Plans & Future",
        grammar_points=["going-to-future", "will-future"],
        vocabulary_set_ids=["future_plans_a2", "weather_a2"],
        lesson_types=["grammar", "vocabulary", "reading", "writing", "review"],
        competency_checklist=[
            "Distinguishes going to (planned intention) from will (spontaneous decision)",
            "Makes predictions about the weather using will",
            "Describes personal plans for the week using going to",
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
        grammar_points=["can-cant", "could-past-ability"],
        vocabulary_set_ids=["abilities_sports_a2", "school_work_a2"],
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
        vocabulary_set_ids=["food_shopping_a2", "money_prices_a2"],
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
        grammar_points=["modal-verbs", "imperatives"],
        vocabulary_set_ids=["body_health_a2", "symptoms_a2"],
        lesson_types=["grammar", "vocabulary", "reading", "writing", "review"],
        competency_checklist=[
            "Uses should / shouldn't for advice",
            "Uses must / mustn't for obligation and prohibition",
            "Describes symptoms and gives health advice in a dialogue",
        ],
        default_weeks=1,
        prerequisite_unit="a2-unit-5",
    ),
    CurriculumUnit(
        id="a2-unit-7",
        level="A2",
        unit_number=7,
        title="Travel & Transport",
        grammar_points=["prepositions-time", "adverbs-manner"],
        vocabulary_set_ids=["transport_a2", "travel_a2", "directions_a2"],
        lesson_types=["grammar", "vocabulary", "reading", "writing", "review"],
        competency_checklist=[
            "Uses at, on, in for time expressions (at 3pm, on Monday, in June)",
            "Uses adverbs of manner correctly (quickly, carefully, loudly)",
            "Gives and follows directions using transport vocabulary",
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
            "past-simple",
            "going-to-future",
            "will-future",
            "comparatives-superlatives",
            "countable-uncountable",
            "modal-verbs",
        ],
        vocabulary_set_ids=[
            "irregular_verbs_a2",
            "adjectives_a2",
            "food_shopping_a2",
            "transport_a2",
            "body_health_a2",
        ],
        lesson_types=["reading", "writing", "review"],
        competency_checklist=[
            "Reads and understands a text (150–200 words) on a familiar topic",
            "Writes a short email or message (80–100 words) using past and future tenses",
            "Demonstrates all A2 grammar in a mixed-tense writing task",
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
            "present-perfect",
            "first-conditional",
            "second-conditional",
            "passive-voice-simple",
            "relative-clauses",
            "modal-verbs",
            "reported-speech",
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

# ── B2 ───────────────────────────────────────────────────────────────────────

B2_UNITS: list[CurriculumUnit] = [
    CurriculumUnit(
        id="b2-unit-1",
        level="B2",
        unit_number=1,
        title="Past Narratives & Sequencing",
        grammar_points=["past-perfect"],
        vocabulary_set_ids=["academic_vocabulary_b2", "narrative_time_b2"],
        lesson_types=["grammar", "vocabulary", "reading", "writing", "review"],
        competency_checklist=[
            "Uses the past perfect to sequence two past events correctly",
            "Does not use the past perfect when the sequence is already clear from context",
            "Uses time connectors (prior to, subsequently, meanwhile) to organise a narrative",
            "Writes a coherent 150-word past narrative with correct verb forms",
            "Distinguishes past simple (simple past action) from past perfect (earlier action)",
        ],
        default_weeks=1,
        prerequisite_unit=None,
    ),
    CurriculumUnit(
        id="b2-unit-2",
        level="B2",
        unit_number=2,
        title="Wishes & Regrets",
        grammar_points=["wishes-regrets"],
        vocabulary_set_ids=["emotions_b2"],
        lesson_types=["grammar", "vocabulary", "reading", "writing", "review"],
        competency_checklist=[
            'Uses "I wish + past simple" for present wishes correctly',
            'Uses "I wish + past perfect" for past regrets correctly',
            'Uses "I wish + would" to express a complaint about behaviour',
            'Uses "if only" for emphasis without changing the underlying structure',
            "Expresses nuanced emotions (remorse, yearning, nostalgia) in writing",
        ],
        default_weeks=1,
        prerequisite_unit="b2-unit-1",
    ),
    CurriculumUnit(
        id="b2-unit-3",
        level="B2",
        unit_number=3,
        title="Conditionals 2 & 3",
        grammar_points=["second-conditional", "third-conditional"],
        vocabulary_set_ids=["workplace_b2", "hypothetical_b2"],
        lesson_types=["grammar", "vocabulary", "reading", "writing", "review"],
        competency_checklist=[
            'Forms the second conditional without "would" in the if-clause',
            "Forms the third conditional with past perfect + would have correctly",
            'Uses "could/might" in the main clause as alternatives to "would"',
            "Speculates using hypothetical language (scenario, likelihood, presumably)",
            "Does not confuse second and third conditional time frames",
        ],
        default_weeks=2,
        prerequisite_unit="b2-unit-2",
    ),
    CurriculumUnit(
        id="b2-unit-4",
        level="B2",
        unit_number=4,
        title="Advanced Passive & Causative",
        grammar_points=["advanced-passive"],
        vocabulary_set_ids=["industries_b2"],
        lesson_types=["grammar", "vocabulary", "reading", "writing", "review"],
        competency_checklist=[
            'Forms causative "have/get + object + past participle" correctly',
            "Uses modal passive (must be, should be, can be + past participle)",
            "Uses passive infinitives (to be + past participle) after verbs like want, expect",
            "Describes industrial or manufacturing processes using the passive",
            'Selects "have" (formal) vs "get" (informal) appropriately in causative structures',
        ],
        default_weeks=1,
        prerequisite_unit="b2-unit-3",
    ),
    CurriculumUnit(
        id="b2-unit-5",
        level="B2",
        unit_number=5,
        title="Gerunds & Infinitives",
        grammar_points=["gerunds-infinitives"],
        vocabulary_set_ids=["media_society_b2"],
        lesson_types=["grammar", "vocabulary", "reading", "writing", "review"],
        competency_checklist=[
            "Correctly uses gerunds after enjoy, avoid, deny, suggest, consider",
            "Correctly uses infinitives after want, decide, manage, refuse, hope",
            'Identifies the meaning difference in "remember doing" vs "remember to do"',
            "Uses a gerund after prepositions (interested in doing, used to doing)",
            'Uses bare infinitive after "make" and "let"',
        ],
        default_weeks=1,
        prerequisite_unit="b2-unit-4",
    ),
    CurriculumUnit(
        id="b2-unit-6",
        level="B2",
        unit_number=6,
        title="Reported Speech & Modal Perfects",
        grammar_points=["reported-speech", "modal-perfects"],
        vocabulary_set_ids=["news_events_b2"],
        lesson_types=["grammar", "vocabulary", "reading", "writing", "review"],
        competency_checklist=[
            "Applies full tense backshift (past perfect, would, could) in reported speech",
            "Reports questions with if/whether and normal (non-inverted) word order",
            "Uses must have, can't have, should have, could have correctly",
            'Distinguishes "must have" (deduction) from "should have" (regret/criticism)',
            "Reports a news story using appropriate verbs (said, told, added, denied)",
        ],
        default_weeks=2,
        prerequisite_unit="b2-unit-5",
    ),
    CurriculumUnit(
        id="b2-unit-7",
        level="B2",
        unit_number=7,
        title="Concession, Contrast & Academic Discourse",
        grammar_points=["concession-contrast-b2"],
        vocabulary_set_ids=["academic_vocabulary_b2"],
        lesson_types=["grammar", "vocabulary", "reading", "writing", "review"],
        competency_checklist=[
            "Uses although/even though to link two contrasting clauses in one sentence",
            "Uses despite/in spite of with a noun or gerund (not a full clause)",
            "Uses however/nevertheless to start a new contrasting sentence with a comma",
            "Uses whereas to contrast two equal and opposite facts",
            "Writes a structured argument with concession phrases to acknowledge counter-views",
        ],
        default_weeks=1,
        prerequisite_unit="b2-unit-6",
    ),
    CurriculumUnit(
        id="b2-unit-8",
        level="B2",
        unit_number=8,
        title="B2 Consolidation",
        grammar_points=[
            "past-perfect",
            "second-conditional",
            "third-conditional",
            "gerunds-infinitives",
            "reported-speech",
            "modal-perfects",
        ],
        vocabulary_set_ids=["academic_vocabulary_b2", "workplace_b2", "media_society_b2"],
        lesson_types=["reading", "writing", "review"],
        competency_checklist=[
            "Writes a 200-word discursive essay with a clear thesis, concessions, and conclusion",
            "Demonstrates B2 grammar range: conditionals, passives, modal perfects, gerunds",
            "Reports a short news story correctly using reported speech and modal perfects",
            "Reads a 250-word text and correctly answers inferential comprehension questions",
        ],
        default_weeks=1,
        prerequisite_unit="b2-unit-7",
    ),
]

# ── C1 ───────────────────────────────────────────────────────────────────────

C1_UNITS: list[CurriculumUnit] = [
    CurriculumUnit(
        id="c1-unit-1",
        level="C1",
        unit_number=1,
        title="Mixed Conditionals & Speculation",
        grammar_points=["mixed-conditionals"],
        vocabulary_set_ids=["abstract_concepts_c1"],
        lesson_types=["grammar", "reading", "writing", "review"],
        competency_checklist=[
            "Construct mixed conditional sentences combining past and present time frames.",
            "Speculate about past events and their present consequences.",
            "Use abstract vocabulary to discuss hypothetical scenarios.",
            "Evaluate the appropriateness of conditional structures in formal writing.",
            "Identify mixed conditionals in authentic academic and literary texts.",
        ],
        default_weeks=1,
        prerequisite_unit="b2-unit-8",
    ),
    CurriculumUnit(
        id="c1-unit-2",
        level="C1",
        unit_number=2,
        title="Participle Clauses",
        grammar_points=["participle-clauses"],
        vocabulary_set_ids=["advanced_verbs_c1"],
        lesson_types=["grammar", "reading", "writing"],
        competency_checklist=[
            "Use present and past participle clauses to reduce relative clauses.",
            "Replace adverbial clauses with participial equivalents for conciseness.",
            "Apply perfect participle clauses to express sequence of events.",
            "Produce formal written texts using participle constructions naturally.",
            "Distinguish between correct and ambiguous participle clause usage.",
        ],
        default_weeks=1,
        prerequisite_unit="c1-unit-1",
    ),
    CurriculumUnit(
        id="c1-unit-3",
        level="C1",
        unit_number=3,
        title="Hedging & Formal Register",
        grammar_points=["hedging-language"],
        vocabulary_set_ids=["formal_writing_c1"],
        lesson_types=["grammar", "writing", "reading"],
        competency_checklist=[
            "Hedge claims appropriately in academic and professional writing.",
            "Use formal connectors and discourse phrases accurately.",
            "Distinguish between formal and informal register in written texts.",
            "Produce a paragraph of formal writing using hedging language throughout.",
            "Identify hedging devices in academic articles and reports.",
        ],
        default_weeks=1,
        prerequisite_unit="c1-unit-2",
    ),
    CurriculumUnit(
        id="c1-unit-4",
        level="C1",
        unit_number=4,
        title="Emphasis: Inversion & Cleft Sentences",
        grammar_points=["inversion", "cleft-sentences"],
        vocabulary_set_ids=["idioms_c1"],
        lesson_types=["grammar", "writing", "review"],
        competency_checklist=[
            "Use subject–auxiliary inversion after negative and restrictive adverbials.",
            "Construct it-cleft and wh-cleft sentences for emphasis.",
            "Employ advanced idiomatic expressions naturally in spoken interaction.",
            "Recognise and produce emphasis structures in formal speeches and essays.",
            "Correct common errors in inversion and cleft constructions.",
        ],
        default_weeks=1,
        prerequisite_unit="c1-unit-3",
    ),
    CurriculumUnit(
        id="c1-unit-5",
        level="C1",
        unit_number=5,
        title="Ellipsis, Substitution & Textual Cohesion",
        grammar_points=["ellipsis-substitution"],
        vocabulary_set_ids=["academic_discourse_c1"],
        lesson_types=["grammar", "reading", "writing"],
        competency_checklist=[
            "Apply ellipsis and substitution to avoid repetition in formal writing.",
            "Use academic cohesion vocabulary to link arguments across paragraphs.",
            "Analyse how cohesive devices contribute to text unity.",
            "Produce an academic paragraph demonstrating effective use of ellipsis and reference.",
            "Identify ellipsis and substitution in edited academic prose.",
        ],
        default_weeks=1,
        prerequisite_unit="c1-unit-4",
    ),
    CurriculumUnit(
        id="c1-unit-6",
        level="C1",
        unit_number=6,
        title="Advanced Relative Clauses & Critical Thinking",
        grammar_points=["advanced-relative-clauses"],
        vocabulary_set_ids=["critical_thinking_c1"],
        lesson_types=["grammar", "reading", "writing", "review"],
        competency_checklist=[
            "Use non-defining, sentential, and reduced relative clauses correctly.",
            "Express viewpoints using critical thinking vocabulary with precision.",
            "Evaluate the validity and bias of arguments encountered in texts.",
            "Integrate relative clauses fluidly into complex written sentences.",
            "Debate a topic using counterargument and concession language.",
        ],
        default_weeks=1,
        prerequisite_unit="c1-unit-5",
    ),
    CurriculumUnit(
        id="c1-unit-7",
        level="C1",
        unit_number=7,
        title="Argumentation & Rhetoric",
        grammar_points=["hedging-language", "inversion"],
        vocabulary_set_ids=["debate_rhetoric_c1"],
        lesson_types=["writing", "review", "grammar"],
        competency_checklist=[
            "Build a persuasive argument using assertion, evidence, and refutation.",
            "Employ rhetorical devices (inversion, concession, emphasis) in speeches.",
            "Use debate and rhetoric vocabulary to express agreement, challenge, and concession.",
            "Write a 300-word opinion essay at C1 standard.",
            "Deliver a 2-minute spoken argument on a complex topic.",
        ],
        default_weeks=1,
        prerequisite_unit="c1-unit-6",
    ),
    CurriculumUnit(
        id="c1-unit-8",
        level="C1",
        unit_number=8,
        title="C1 Consolidation",
        grammar_points=[
            "mixed-conditionals",
            "participle-clauses",
            "inversion",
            "cleft-sentences",
            "ellipsis-substitution",
            "advanced-relative-clauses",
            "hedging-language",
        ],
        vocabulary_set_ids=["abstract_concepts_c1", "academic_discourse_c1", "debate_rhetoric_c1"],
        lesson_types=["grammar", "reading", "writing", "review"],
        competency_checklist=[
            "Produce a sustained piece of formal writing integrating all C1 grammar structures.",
            "Demonstrate flexible control of register in both formal and semi-formal contexts.",
            "Discuss abstract and complex topics fluently with appropriate hedging.",
            "Identify and correct errors across all C1 grammar areas.",
            "Pass a C1-level CEFR assessment covering all four skills.",
        ],
        default_weeks=1,
        prerequisite_unit="c1-unit-7",
    ),
]

# ── C2 ───────────────────────────────────────────────────────────────────────

C2_UNITS: list[CurriculumUnit] = [
    CurriculumUnit(
        id="c2-unit-1",
        level="C2",
        unit_number=1,
        title="Discourse Markers & Text Cohesion",
        grammar_points=["discourse-markers"],
        vocabulary_set_ids=["nuanced_adjectives_c2"],
        lesson_types=["grammar", "reading", "writing"],
        competency_checklist=[
            "Use a wide range of discourse markers to organise arguments at paragraph and essay level.",
            "Identify how discourse markers signal logical relationships in sophisticated texts.",
            "Employ nuanced C2 adjectives to add precision and depth to writing.",
            "Produce a cohesive analytical essay of 400+ words using advanced connectors.",
            "Evaluate the rhetorical effect of discourse marker choices in published writing.",
        ],
        default_weeks=1,
        prerequisite_unit="c1-unit-8",
    ),
    CurriculumUnit(
        id="c2-unit-2",
        level="C2",
        unit_number=2,
        title="Nominalisation & Academic Style",
        grammar_points=["nominalisation"],
        vocabulary_set_ids=["formal_register_c2"],
        lesson_types=["grammar", "writing", "reading"],
        competency_checklist=[
            "Convert verb and adjective phrases into noun phrases using nominalisation.",
            "Produce academic writing with the impersonal, dense style characteristic of C2.",
            "Use formal register vocabulary accurately in professional correspondence.",
            "Identify and correct inappropriate register in academic texts.",
            "Write an abstract or executive summary using nominalisation throughout.",
        ],
        default_weeks=1,
        prerequisite_unit="c2-unit-1",
    ),
    CurriculumUnit(
        id="c2-unit-3",
        level="C2",
        unit_number=3,
        title="Idiomatic & Figurative Language",
        grammar_points=["fronting-emphasis"],
        vocabulary_set_ids=["idiomatic_expressions_c2"],
        lesson_types=["vocabulary", "review", "reading"],
        competency_checklist=[
            "Use a wide range of idiomatic expressions naturally in spoken and written English.",
            "Interpret figurative language in authentic literary and journalistic texts.",
            "Employ fronting for rhetorical emphasis in spoken and written contexts.",
            "Explain the meaning and cultural context of complex idioms.",
            "Avoid inappropriate use of idioms in formal written registers.",
        ],
        default_weeks=1,
        prerequisite_unit="c2-unit-2",
    ),
    CurriculumUnit(
        id="c2-unit-4",
        level="C2",
        unit_number=4,
        title="Fronting, Emphasis & Stylistic Devices",
        grammar_points=["fronting-emphasis", "register-and-style"],
        vocabulary_set_ids=["literary_devices_c2"],
        lesson_types=["grammar", "writing", "reading"],
        competency_checklist=[
            "Use object fronting, adverbial fronting, and concessive fronting for effect.",
            "Identify and deploy literary devices (metaphor, irony, juxtaposition) in writing.",
            "Adapt writing style consciously for different purposes and audiences.",
            "Analyse how stylistic choices shape meaning and tone in literary texts.",
            "Produce a piece of creative or journalistic writing demonstrating stylistic variation.",
        ],
        default_weeks=1,
        prerequisite_unit="c2-unit-3",
    ),
    CurriculumUnit(
        id="c2-unit-5",
        level="C2",
        unit_number=5,
        title="Critical Reading & Academic Writing",
        grammar_points=["register-and-style"],
        vocabulary_set_ids=["critical_analysis_c2"],
        lesson_types=["reading", "writing", "review"],
        competency_checklist=[
            "Read and critically evaluate complex academic and professional texts.",
            "Use critical analysis vocabulary (paradigm, empirical, discourse, posit) accurately.",
            "Construct a structured critical analysis essay of 500+ words.",
            "Interrogate the assumptions, bias, and methodology of academic arguments.",
            "Demonstrate near-native precision of vocabulary and grammar in academic prose.",
        ],
        default_weeks=1,
        prerequisite_unit="c2-unit-4",
    ),
    CurriculumUnit(
        id="c2-unit-6",
        level="C2",
        unit_number=6,
        title="C2 Consolidation",
        grammar_points=[
            "discourse-markers",
            "nominalisation",
            "fronting-emphasis",
            "register-and-style",
            "inversion",
            "cleft-sentences",
        ],
        vocabulary_set_ids=[
            "nuanced_adjectives_c2",
            "formal_register_c2",
            "idiomatic_expressions_c2",
            "literary_devices_c2",
            "critical_analysis_c2",
        ],
        lesson_types=["grammar", "reading", "writing", "review"],
        competency_checklist=[
            "Demonstrate mastery of all C2 grammar structures in extended writing tasks.",
            "Use the full range of C2 vocabulary with precision and appropriate register.",
            "Produce and deliver a coherent, sophisticated extended argument (spoken and written).",
            "Critically evaluate a complex text and respond with a counter-argument in writing.",
            "Achieve a score consistent with C2 proficiency on a Cambridge Proficiency-style assessment.",
        ],
        default_weeks=2,
        prerequisite_unit="c2-unit-5",
    ),
]

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
