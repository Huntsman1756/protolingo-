from app.data.curriculum import CURRICULUM
from app.schemas.lessons import FillBlankEvaluation, FreeWriteEvaluation, LessonContent, PronunciationEvaluation
from app.services.language_helpers import get_english_variant
from app.services.llm_adapter import llm_adapter

# Derived from the canonical curriculum — never edit this manually.
# Any slug added to curriculum.py is automatically recognised here.
VALID_GRAMMAR_SLUGS: set[str] = {
    slug
    for units in CURRICULUM.values()
    for unit in units
    for slug in unit.grammar_points
}

_VALID_SLUGS_STR: str = ", ".join(sorted(VALID_GRAMMAR_SLUGS))

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
   Only use slugs from this list: {valid_slugs}.
6. For "fill_blank" exercises: the "question" field MUST be the sentence with the blank (use ___ for the gap),
   NOT a general instruction like "Complete the sentence with...". Put any instructions in "explanation" only.
   Example — WRONG: "question": "Complete with the correct possessive adjective: my / your / his"
   Example — CORRECT: "question": "___ name is Maria. (she)"
7. For "multiple_choice" exercises: options MUST NOT include letter or number prefixes
   (no "A.", "B.", "1.", "2."). Each option must be plain answer text only.
   Example — WRONG: "options": ["A. works", "B. is working"]
   Example — CORRECT: "options": ["works", "is working"]

The lesson should take about 20-30 minutes. Include 3-5 exercises of mixed types
(multiple_choice, fill_blank, free_write, pronunciation).

For pronunciation exercises use this exact structure:
{{
  "type": "pronunciation",
  "question": "Listen and repeat:",
  "options": ["Hint: focus on the specific sound or pattern"],
  "correct": "The exact English phrase the student must pronounce.",
  "explanation": "What phonetic aspect this practices (e.g. -ing endings, linking sounds)"
}}

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
    }},
    {{
      "type": "fill_blank",
      "question": "___ name is Maria. (she)",
      "options": null,
      "correct": "Her",
      "explanation": "We use 'her' as the possessive adjective for she/her."
    }},
    {{
      "type": "free_write",
      "question": "Write 2-3 sentences describing what you do every morning. Use the present simple.",
      "options": ["Use at least two different verbs.", "Write complete sentences."],
      "correct": "Sample: I wake up at 7. I eat breakfast and drink coffee.",
      "explanation": "Evaluates use of present simple for routines."
    }}
  ],
  "vocabulary": [
    {{"word": "currently", "definition": "at the present time", "example": "She is currently studying."}}
  ],
  "grammar_refs": ["present-continuous", "present-simple"]
}}
"""

FILL_BLANK_EVAL_PROMPT = """
Student level: {cefr_level}
Sentence with blank: {question}
Expected answer: {correct_answer}
Student's answer: {student_answer}

The student had to fill in the blank in the sentence above. Evaluate whether the answer is correct.
Be lenient with minor spelling variation and case. Treat contractions as equivalent to their full forms
(e.g. "isn't" = "is not", "I'm" = "I am", "doesn't" = "does not").

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

PRONUNCIATION_EVAL_PROMPT = """
Student level: {cefr_level}
Target phrase: {target}
Transcribed speech: {transcription}

The student was asked to repeat the target phrase aloud. The speech was transcribed by STT.
Evaluate how accurately they pronounced the phrase and return JSON:
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
    target_language: str = "en-US",
) -> LessonContent:
    gp_str = ", ".join(grammar_points) if grammar_points else "none specified"
    vs_str = ", ".join(vocabulary_set_ids) if vocabulary_set_ids else "general"
    english_variant = get_english_variant(target_language)
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
        valid_slugs=_VALID_SLUGS_STR,
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


async def evaluate_pronunciation(
    cefr_level: str,
    target: str,
    transcription: str,
) -> PronunciationEvaluation:
    eval_prompt = PRONUNCIATION_EVAL_PROMPT.format(
        cefr_level=cefr_level,
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
) -> FillBlankEvaluation:
    eval_prompt = FILL_BLANK_EVAL_PROMPT.format(
        cefr_level=cefr_level,
        question=question,
        correct_answer=correct_answer,
        student_answer=student_answer,
    )
    result = await llm_adapter.structured_output(
        [{"role": "system", "content": eval_prompt}],
        FillBlankEvaluation,
    )
    return result
