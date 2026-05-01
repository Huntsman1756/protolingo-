from app.schemas.lessons import FreeWriteEvaluation, LessonContent
from app.services.llm_adapter import llm_adapter

VALID_GRAMMAR_SLUGS: set[str] = {
    "present-simple", "to-be", "articles", "questions-yes-no",
    "subject-pronouns", "possessive-adjectives",
    "past-simple", "present-continuous", "comparatives-superlatives",
    "can-cant",
    "present-perfect", "first-conditional", "passive-voice-simple",
    "relative-clauses", "modal-verbs",
    "second-conditional", "third-conditional", "reported-speech", "past-perfect",
    "mixed-conditionals", "inversion", "cleft-sentences",
    "discourse-markers", "nominalisation",
}

LESSON_GENERATION_PROMPT = """
You are an expert English teacher creating a structured lesson.

Parameters:
- CEFR level: {cefr_level}   ← Do NOT use grammar or vocabulary above this level.
- English variant: {english_variant} English  ← Use {english_variant} English spelling and vocabulary throughout.
- Lesson type: {lesson_type}
- Topic / unit title: {topic}
- Curriculum unit id: {unit_id}
- Grammar points to cover (focus ONLY on these): {grammar_points}
- Vocabulary sets relevant to this unit: {vocabulary_set_ids}
- Week: {week}, Day: {day}

STRICT CONSTRAINTS:
1. Every grammar structure used must be at or below {cefr_level}.
2. If grammar_points is non-empty, at least 70% of exercises must target one of those points.
3. Vocabulary must come from the vocabulary_set_ids listed or be common {cefr_level} words.
4. Do NOT introduce structures from higher levels.
5. In "grammar_refs", return 1–3 grammar topic slugs that are most relevant to this lesson.
   Only use slugs from this list: present-simple, to-be, articles, questions-yes-no,
   subject-pronouns, possessive-adjectives, past-simple, present-continuous,
   comparatives-superlatives, can-cant, present-perfect, first-conditional,
   passive-voice-simple, relative-clauses, modal-verbs, second-conditional,
   third-conditional, reported-speech, past-perfect, mixed-conditionals,
   inversion, cleft-sentences, discourse-markers, nominalisation.

The lesson should take about 20-30 minutes. Include 3-5 exercises of mixed types
(multiple_choice, fill_blank, free_write).

Return a JSON object:
{{
  "lesson_type": "{lesson_type}",
  "title": "Descriptive lesson title",
  "cefr_level": "{cefr_level}",
  "unit_id": "{unit_id}",
  "explanation": {{
    "text": "Clear explanation targeted at {cefr_level}",
    "key_points": ["point 1", "point 2"],
    "examples": [
      {{"sentence": "I work every day.", "note": "habitual action"}}
    ]
  }},
  "exercises": [
    {{
      "type": "multiple_choice",
      "question": "She ___ (work) at the moment.",
      "options": ["works", "is working", "worked", "has worked"],
      "correct": "is working",
      "explanation": "We use present continuous for actions happening now."
    }}
  ],
  "vocabulary": [
    {{"word": "currently", "definition": "at the present time", "example": "She is currently studying."}}
  ],
  "grammar_refs": ["present-continuous", "present-simple"]
}}
"""

FREE_WRITE_EVAL_PROMPT = """
Student level: {cefr_level}
Exercise prompt: {prompt}
Evaluation criteria: {criteria}
Student's answer: {answer}

Evaluate the answer and return JSON:
{{
  "score": 0.8,
  "feedback": "Good use of present continuous. Watch out for...",
  "corrections": [
    {{"original": "I am go", "corrected": "I am going", "explanation": "Use gerund after 'to be'"}}
  ]
}}
"""


async def generate_lesson(
    cefr_level: str,
    lesson_type: str,
    topic: str,
    week: int,
    day: int,
    unit_id: str = "",
    grammar_points: list[str] | None = None,
    vocabulary_set_ids: list[str] | None = None,
    english_variant: str = "american",
) -> LessonContent:
    gp_str = ", ".join(grammar_points) if grammar_points else "none specified"
    vs_str = ", ".join(vocabulary_set_ids) if vocabulary_set_ids else "general"
    prompt = LESSON_GENERATION_PROMPT.format(
        cefr_level=cefr_level,
        english_variant=english_variant,
        lesson_type=lesson_type,
        topic=topic,
        unit_id=unit_id or "—",
        grammar_points=gp_str,
        vocabulary_set_ids=vs_str,
        week=week,
        day=day,
    )

    lesson = await llm_adapter.structured_output(
        [{"role": "system", "content": prompt}],
        LessonContent,
    )
    # Validate grammar_refs — strip any slugs not in the known set
    lesson.grammar_refs = [s for s in lesson.grammar_refs if s in VALID_GRAMMAR_SLUGS]
    return lesson


async def evaluate_free_write(
    cefr_level: str,
    prompt: str,
    criteria: list[str],
    answer: str,
) -> FreeWriteEvaluation:
    eval_prompt = FREE_WRITE_EVAL_PROMPT.format(
        cefr_level=cefr_level,
        prompt=prompt,
        criteria=", ".join(criteria),
        answer=answer,
    )

    result = await llm_adapter.structured_output(
        [{"role": "system", "content": eval_prompt}],
        FreeWriteEvaluation,
    )
    return result
