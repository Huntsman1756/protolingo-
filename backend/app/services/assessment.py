import uuid

from app.schemas.assessment import (
    AssessmentResult,
    AssessmentSubmitRequest,
    QuizQuestion,
    QuizResponse,
)
from app.services.llm_adapter import (
    LLMError,
    LLMResponseError,
    LLMTimeoutError,
    LLMUnavailableError,
    llm_adapter,
)

ASSESSMENT_PROMPT = """
You are an English language assessment expert.
Generate a placement test with exactly 20 questions covering:
- 5 grammar questions (across A1–C1 difficulty)
- 5 vocabulary questions (across A1–C1 difficulty)
- 5 reading comprehension questions (short text + questions)
- 5 mixed questions (error correction, sentence transformation)

Each question must have a `difficulty` field: A1, A2, B1, B2, or C1.

Return a JSON object with this exact structure:
{
  "questions": [
    {
      "id": 1,
      "type": "multiple_choice",
      "difficulty": "A1",
      "question": "...",
      "options": ["A. ...", "B. ...", "C. ...", "D. ..."],
      "correct_answer": "A"
    }
  ]
}
"""

EVALUATION_PROMPT = """
You are a CEFR language assessment expert.
Below are 20 questions and the user's answers.
Analyze the pattern of correct and incorrect answers,
paying attention to the difficulty level of each question.

{questions_and_answers}

Return a JSON object:
{{
  "cefr_level": "B1",
  "score": 0.65,
  "analysis": "Short explanation of strengths and weaknesses",
  "strengths": ["present tenses", "basic vocabulary"],
  "weaknesses": ["conditional sentences", "advanced prepositions"]
}}
"""


async def generate_quiz() -> tuple[QuizResponse, str]:
    session_id = uuid.uuid4().hex
    try:
        quiz = await llm_adapter.structured_output(
            [{"role": "system", "content": ASSESSMENT_PROMPT}],
            QuizResponse,
        )
        return quiz, session_id
    except LLMResponseError as e:
        raise LLMError(
            f"Quiz generation returned invalid response: {str(e)}"
        ) from e


async def evaluate_answers(
    quiz: QuizResponse, submission: AssessmentSubmitRequest
) -> AssessmentResult:
    questions = quiz.questions if hasattr(quiz, "questions") else quiz["questions"]

    questions_and_answers = ""
    for q in questions:
        q_id = q.id if hasattr(q, "id") else q["id"]
        user_answer = next(
            (a.answer for a in submission.answers if a.question_id == q_id),
            "(no answer)",
        )
        q_difficulty = q.difficulty if hasattr(q, "difficulty") else q["difficulty"]
        q_question = q.question if hasattr(q, "question") else q["question"]
        q_correct = q.correct_answer if hasattr(q, "correct_answer") else q["correct_answer"]
        questions_and_answers += (
            f"Q{q_id} [{q_difficulty}]: {q_question}\n"
            f"Correct: {q_correct}\n"
            f"User answered: {user_answer}\n\n"
        )

    prompt = EVALUATION_PROMPT.format(questions_and_answers=questions_and_answers)

    try:
        result = await llm_adapter.structured_output(
            [{"role": "system", "content": prompt}],
            AssessmentResult,
        )
        return result
    except LLMResponseError as e:
        raise LLMError(
            f"CEFR evaluation returned invalid response: {str(e)}"
        ) from e
