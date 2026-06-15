from app.data.curriculum import get_curriculum
from app.schemas.lessons import (
    FillBlankEvaluation,
    FreeWriteEvaluation,
    LessonContent,
    PronunciationEvaluation,
)
from app.services.language_helpers import get_language_name
from app.services.llm_adapter import llm_adapter


def get_valid_grammar_slugs(target_language: str = "en-GB") -> set[str]:
    """Return the set of valid grammar slugs for a given target language."""
    curriculum = get_curriculum(target_language)
    return {slug for units in curriculum.values() for unit in units for slug in unit.grammar_points}


LESSON_GENERATION_PROMPT = """
You are an expert {target_language_name} teacher creating a structured lesson.

Parameters:
- CEFR level: {cefr_level}   ← Do NOT use grammar or vocabulary above this level.
- Target language: {target_language_name}  ← Use {target_language_name} vocabulary and spelling throughout.
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
   Only use slugs from this list: {valid_slugs}.
6. For "multiple_choice" exercises: options MUST NOT include letter or number prefixes
   (no "A.", "B.", "1.", "2."). Each option must be plain answer text only.
   Example — WRONG: "options": ["A. works", "B. is working"]
   Example — CORRECT: "options": ["works", "is working"]

━━━ CRITICAL RULE FOR fill_blank EXERCISES ━━━
The "question" field MUST contain the gapped sentence with ___ marking the blank.
NEVER put an instruction like "Complete the sentence with..." in "question".
ALWAYS put the actual sentence with the gap in "question". Use "explanation" for hints only.

WRONG (question has no sentence, no ___):
  "question": "Complete with the correct possessive adjective: my / your / his",
  "explanation": "Her name is Maria. Fill in the blank."

WRONG (instruction in question, sentence buried in explanation):
  "question": "Fill in the blank:",
  "explanation": "___ name is Maria. (she)"

CORRECT:
  "question": "___ name is Maria. (she)",
  "explanation": "Use the possessive adjective for 'she'."
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The lesson should take about 20-30 minutes. Include 3-5 exercises of mixed types
(multiple_choice, fill_blank, free_write, pronunciation).

For pronunciation exercises use this exact structure:
{{
  "type": "pronunciation",
  "question": "A short instruction in {target_language_name} (e.g. 'Repeat the following phrase:')",
  "options": ["Hint in {target_language_name} about the specific sound or pattern to focus on"],
  "correct": "The exact {target_language_name} phrase the student must pronounce.",
  "explanation": "What phonetic aspect this practices (describe in {target_language_name})."
}}

Return a JSON object using this exact schema:
{{
  "lesson_type": "{lesson_type}",
  "title": "[lesson title in {target_language_name}]",
  "cefr_level": "{cefr_level}",
  "unit_id": "{unit_id}",
  "explanation": {{
    "text": "[clear grammatical/vocabulary explanation in {target_language_name}]",
    "key_points": [
      "[first key takeaway in {target_language_name}]",
      "[second key takeaway]"
    ],
    "examples": [
      {{"sentence": "[natural example sentence in {target_language_name}]", "note": "[what this example shows]"}}
    ]
  }},
  "exercises": [
    {{
      "type": "multiple_choice",
      "question": "[sentence in {target_language_name} with a gap, or a direct question]",
      "options": ["[option 1]", "[option 2]", "[option 3]", "[option 4]"],
      "correct": "[the one correct option, copied exactly as written above]",
      "explanation": "[why this is correct, in {target_language_name}]"
    }},
    {{
      "type": "fill_blank",
      "question": "[sentence in {target_language_name} with ___ marking the blank] [hint in parentheses]",
      "options": null,
      "correct": "[the word or phrase that fills the blank]",
      "explanation": "[grammar rule behind the answer, in {target_language_name}]"
    }},
    {{
      "type": "free_write",
      "question": "[writing prompt in {target_language_name} with a specific task and requirements]",
      "options": [
        "[guideline or constraint for the student]",
        "[another guideline]"
      ],
      "correct": "[model answer in {target_language_name}]",
      "explanation": "[which skill or grammar point this exercise evaluates]"
    }}
  ],
  "vocabulary": [
    {{"word": "[word or phrase in {target_language_name}]", "definition": "[definition in target language]", "example": "[example sentence in {target_language_name}]"}}
  ],
  "grammar_refs": ["[slug from valid_slugs list]", "[another slug]"]
}}

IMPORTANT — all content (explanations, questions, options, correct answers, vocabulary)
must be entirely in {target_language_name}. Only this meta-prompt is in English.

Before returning, verify:
- Every fill_blank exercise has ___ inside the "question" field (not in "explanation").
- No multiple_choice option starts with a letter or number prefix (A., B., 1., 2.).
- All text visible to the student is in {target_language_name}.
"""

FILL_BLANK_EVAL_PROMPT = """
Student level: {cefr_level}
Target language: {target_language_name}
Sentence with blank: {question}
Expected answer: {correct_answer}
Student's answer: {student_answer}

The student had to fill in the blank in the sentence above. Evaluate whether the answer is correct
in {target_language_name}. Be lenient with minor spelling variation and case. Treat contractions as
equivalent to their full forms (e.g. "isn't" = "is not", "I'm" = "I am", "doesn't" = "does not").

Return JSON:
{{
  "is_correct": true,
  "score": 1.0,
  "feedback": "Correct! Brief positive reinforcement."
}}

If incorrect:
{{
  "is_correct": false,
  "score": 0.0,
  "feedback": "The correct answer is '{correct_answer}'. Brief explanation of why."
}}
"""


FREE_WRITE_EVAL_PROMPT = """
Student level: {cefr_level}
Target language: {target_language_name}
Exercise prompt: {prompt}
Evaluation criteria: {criteria}
Student's answer: {answer}

Evaluate the {target_language_name} writing sample and return JSON:
{{
  "score": 0.8,
  "feedback": "Good use of present continuous. Watch out for...",
  "corrections": [
    {{"original": "I am go", "corrected": "I am going", "explanation": "Use gerund after 'to be'"}}
  ]
}}
"""

PRONUNCIATION_EVAL_PROMPT = """
Student level: {cefr_level}
Target language: {target_language_name}
Target phrase: {target}
Transcribed speech: {transcription}

The student was asked to repeat the {target_language_name} phrase aloud. The speech was
transcribed by STT. Evaluate how accurately they pronounced the phrase and return JSON:
{{
  "score": 0.85,
  "feedback": "Good pronunciation. The word 'working' was slightly unclear.",
  "is_correct": true
}}

Scoring guidelines:
- 1.0 = perfect match
- 0.7–0.9 = minor transcription artifacts, main content correct
- 0.4–0.6 = partial match, key words present but several missing
- 0.0–0.3 = mostly wrong or completely different

If the transcription captures the main content of the target phrase, score >= 0.7.
Consider minor STT artifacts (e.g. missing punctuation, extra filler words) as correct.
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
    target_language: str = "en-GB",
) -> LessonContent:
    gp_str = ", ".join(grammar_points) if grammar_points else "none specified"
    vs_str = ", ".join(vocabulary_set_ids) if vocabulary_set_ids else "general"
    target_language_name = get_language_name(target_language)
    valid_slugs = get_valid_grammar_slugs(target_language)
    valid_slugs_str = ", ".join(sorted(valid_slugs))
    prompt = LESSON_GENERATION_PROMPT.format(
        cefr_level=cefr_level,
        target_language_name=target_language_name,
        lesson_type=lesson_type,
        topic=topic,
        unit_id=unit_id or "—",
        grammar_points=gp_str,
        vocabulary_set_ids=vs_str,
        week=week,
        day=day,
        valid_slugs=valid_slugs_str,
    )

    lesson = await llm_adapter.structured_output(
        [{"role": "system", "content": prompt}],
        LessonContent,
    )
    lesson.grammar_refs = [s for s in lesson.grammar_refs if s in valid_slugs]
    # Sanitize fill_blank exercises: question MUST contain ___ (the gapped sentence).
    # If the LLM put the instruction in question and the actual sentence in explanation,
    # swap them so the user always sees the gapped sentence in the UI.
    for ex in lesson.exercises:
        if ex.type == "fill_blank" and "___" not in ex.question:
            if ex.explanation and "___" in ex.explanation:
                ex.question, ex.explanation = ex.explanation, ex.question
    return lesson


async def evaluate_free_write(
    cefr_level: str,
    prompt: str,
    criteria: list[str],
    answer: str,
    target_language: str = "en-GB",
) -> FreeWriteEvaluation:
    from app.services.language_helpers import get_language_name

    target_language_name = get_language_name(target_language)
    eval_prompt = FREE_WRITE_EVAL_PROMPT.format(
        cefr_level=cefr_level,
        target_language_name=target_language_name,
        prompt=prompt,
        criteria=", ".join(criteria),
        answer=answer,
    )

    result = await llm_adapter.structured_output(
        [{"role": "system", "content": eval_prompt}],
        FreeWriteEvaluation,
    )
    return result


async def evaluate_pronunciation(
    cefr_level: str,
    target: str,
    transcription: str,
    target_language: str = "en-GB",
) -> PronunciationEvaluation:
    from app.services.language_helpers import get_language_name

    target_language_name = get_language_name(target_language)
    eval_prompt = PRONUNCIATION_EVAL_PROMPT.format(
        cefr_level=cefr_level,
        target_language_name=target_language_name,
        target=target,
        transcription=transcription,
    )
    result = await llm_adapter.structured_output(
        [{"role": "system", "content": eval_prompt}],
        PronunciationEvaluation,
    )
    return result


async def evaluate_fill_blank(
    cefr_level: str,
    question: str,
    correct_answer: str,
    student_answer: str,
    target_language: str = "en-GB",
) -> FillBlankEvaluation:
    from app.services.language_helpers import get_language_name

    target_language_name = get_language_name(target_language)
    eval_prompt = FILL_BLANK_EVAL_PROMPT.format(
        cefr_level=cefr_level,
        target_language_name=target_language_name,
        question=question,
        correct_answer=correct_answer,
        student_answer=student_answer,
    )
    result = await llm_adapter.structured_output(
        [{"role": "system", "content": eval_prompt}],
        FillBlankEvaluation,
    )
    return result
