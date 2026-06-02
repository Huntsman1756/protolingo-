from __future__ import annotations

from app.data.curriculum import CEFR_LEVELS
from app.schemas.assessment import (
    AnswerRecord,
    AssessmentResult,
    FreeWriteEvalRequest,
)
from app.services.language_helpers import get_language_name
from app.services.llm_adapter import (
    LLMError,
    LLMResponseError,
    llm_adapter,
)

FREE_WRITE_ASSESSMENT_PROMPT = """
You are evaluating a short {target_language_name} writing sample for CEFR placement.
The student's apparent level based on grammar/vocabulary questions: {preliminary_level}

Writing prompt given to student: "{prompt}"
Student's answer: "{answer}"

Assess vocabulary range, grammar accuracy, and coherence.
Return JSON:
{{
  "adjusted_level": "{preliminary_level}",
  "writing_score": 0.5,
  "analysis": "2–3 sentence summary of strengths and gaps",
  "strengths": [],
  "weaknesses": []
}}
"""

END_OF_LEVEL_TEST_PROMPT = """
You are assessing whether a student has mastered CEFR level {cefr_level}.

Generate a 20-question test covering ALL grammar points and vocabulary sets
studied during {cefr_level}. Questions must come exclusively from:
Grammar: {grammar_points_studied}
Vocabulary: {vocabulary_sets_studied}

Use the same question schema as the placement test (multiple_choice, 4 options, correct field).
Do NOT include content from {next_level}.

Return JSON:
{{
  "questions": [
    {{
      "id": "lt-001",
      "skill": "grammar",
      "difficulty": "{cefr_level}",
      "question": "...",
      "options": ["...", "...", "...", "..."],
      "correct": "..."
    }}
  ]
}}
"""


def evaluate_adaptive_quiz(answers: list[AnswerRecord]) -> AssessmentResult:
    """
    Deterministic CEFR evaluation — no LLM calls.

    answers: list of AnswerRecord(question_id, skill, difficulty, correct)
    Returns: AssessmentResult with skill_profile and overall CEFR level.

    Algorithm:
    - Group answers by CEFR difficulty level.
    - Determine highest level where score >= 0.6 with at least 2 questions.
    - Build per-skill profile (grammar, vocabulary, reading).
    """
    level_scores: dict[str, dict] = {level: {"correct": 0, "total": 0} for level in CEFR_LEVELS}
    skill_scores: dict[str, list[int]] = {
        "grammar": [],
        "vocabulary": [],
        "reading": [],
    }

    for a in answers:
        level = a.difficulty.upper()
        if level in level_scores:
            level_scores[level]["total"] += 1
            if a.correct:
                level_scores[level]["correct"] += 1

        skill = a.skill.lower()
        if skill in skill_scores:
            skill_scores[skill].append(1 if a.correct else 0)

    # Determine CEFR: highest level with >= 2 questions and >= 60% correct
    cefr_level = "A1"
    for level in CEFR_LEVELS:
        s = level_scores[level]
        if s["total"] >= 2 and s["correct"] / s["total"] >= 0.6:
            cefr_level = level

    skill_profile = {
        skill: round(sum(scores) / len(scores), 2) if scores else 0.0
        for skill, scores in skill_scores.items()
    }
    overall_score = round(sum(skill_profile.values()) / len(skill_profile), 2)
    strengths = [s for s, v in skill_profile.items() if v >= 0.65]
    weaknesses = [s for s, v in skill_profile.items() if v < 0.45]

    return AssessmentResult(
        cefr_level=cefr_level,
        score=overall_score,
        skill_profile=skill_profile,
        strengths=strengths,
        weaknesses=weaknesses,
        analysis="",  # filled only when optional free-write is submitted
    )


async def evaluate_free_write(
    req: FreeWriteEvalRequest,
    target_language: str = "en-US",
) -> dict:
    """Optional LLM call for the single free-write question at the end of the quiz."""
    target_language_name = get_language_name(target_language)
    prompt = FREE_WRITE_ASSESSMENT_PROMPT.format(
        preliminary_level=req.preliminary_level,
        prompt=req.writing_prompt,
        answer=req.student_answer,
        target_language_name=target_language_name,
    )
    try:
        raw = await llm_adapter.chat(
            [{"role": "system", "content": prompt}],
        )
        import json  # noqa: PLC0415

        return json.loads(raw)
    except LLMResponseError as e:
        raise LLMError(f"Free-write evaluation failed: {e}") from e
    except Exception as e:  # noqa: BLE001
        # Catches json.JSONDecodeError (not a subclass of LLMResponseError).
        # LLMTimeoutError / LLMUnavailableError are re-raised as-is since they
        # are already LLMError subclasses and the router handles them specifically.
        if isinstance(e, LLMError):
            raise
        raise LLMError(f"Free-write evaluation failed: malformed JSON response: {e}") from e


async def generate_level_test_questions(
    cefr_level: str,
    grammar_points_studied: list[str],
    vocabulary_sets_studied: list[str],
) -> list[dict]:
    """
    LLM-generated 20-question level completion test.
    Questions are exclusive to the studied grammar/vocabulary at cefr_level.
    """
    import json  # noqa: PLC0415

    idx = CEFR_LEVELS.index(cefr_level) if cefr_level in CEFR_LEVELS else 0
    next_level = CEFR_LEVELS[idx + 1] if idx + 1 < len(CEFR_LEVELS) else "higher levels"

    prompt = END_OF_LEVEL_TEST_PROMPT.format(
        cefr_level=cefr_level,
        grammar_points_studied=", ".join(grammar_points_studied) or "all grammar for this level",
        vocabulary_sets_studied=", ".join(vocabulary_sets_studied)
        or "all vocabulary for this level",
        next_level=next_level,
    )
    try:
        raw = await llm_adapter.chat([{"role": "system", "content": prompt}])
        data = json.loads(raw)
        return data.get("questions", [])
    except LLMResponseError as e:
        raise LLMError(f"Level test generation failed: {e}") from e
    except Exception as e:  # noqa: BLE001
        # Catches json.JSONDecodeError (not a subclass of LLMResponseError).
        # LLMTimeoutError / LLMUnavailableError are re-raised as-is.
        if isinstance(e, LLMError):
            raise
        raise LLMError(f"Level test generation failed: malformed JSON response: {e}") from e
