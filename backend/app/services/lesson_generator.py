from app.schemas.lessons import FreeWriteEvaluation, LessonContent
from app.services.llm_adapter import llm_adapter

LESSON_GENERATION_PROMPT = """
You are an expert English teacher creating a lesson.

Create a detailed lesson with the following parameters:
- CEFR level: {cefr_level}
- Lesson type: {lesson_type}
- Topic: {topic}
- Week: {week}, Day: {day}

The lesson should take about 20-30 minutes to complete.
Include 3-5 exercises of mixed types (multiple_choice, fill_blank, free_write).

Return a JSON object with this structure:
{{
  "lesson_type": "grammar",
  "title": "Simple Present vs Present Continuous",
  "cefr_level": "A2",
  "explanation": {{
    "text": "Explanation of the grammar point",
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
  ]
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
) -> LessonContent:
    prompt = LESSON_GENERATION_PROMPT.format(
        cefr_level=cefr_level,
        lesson_type=lesson_type,
        topic=topic,
        week=week,
        day=day,
    )

    lesson = await llm_adapter.structured_output(
        [{"role": "system", "content": prompt}],
        LessonContent,
    )
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
