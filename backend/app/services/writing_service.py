from __future__ import annotations

import json
import logging
import random
from typing import Any

from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.writing import WritingAttempt, WritingExercise
from app.services.language_helpers import get_language_name
from app.services.llm_adapter import LLMResponseError, llm_adapter, parse_llm_json
from app.services.progress_service import update_daily_progress

logger = logging.getLogger(__name__)

XP_PER_CORRECT_SCORE = 10

# Valid exercise types per CEFR level
_TYPES_BY_LEVEL: dict[str, list[str]] = {
    "A1": ["short_story", "description", "diary_entry", "email", "forum_post"],
    "A2": ["email", "short_story", "opinion", "description", "diary_entry"],
    "B1": ["email", "opinion", "short_story", "forum_post", "review"],
    "B2": ["opinion", "essay", "forum_post", "review", "email"],
    "C1": ["essay", "opinion", "review", "forum_post", "proposal"],
    "C2": ["essay", "opinion", "proposal", "review", "debate"],
}

_WORD_COUNT_BY_LEVEL: dict[str, tuple[int, int]] = {
    "A1": (30, 60),
    "A2": (50, 100),
    "B1": (80, 150),
    "B2": (120, 250),
    "C1": (150, 350),
    "C2": (200, 450),
}

_TYPE_DESCRIPTIONS: dict[str, str] = {
    "email": "a formal or informal email to a friend or colleague",
    "short_story": "a short narrative with a beginning, middle, and end",
    "opinion": "expressing your opinion on a topic with reasons",
    "description": "describing a person, place, object, or experience",
    "diary_entry": "a personal diary or journal entry about your day",
    "forum_post": "a post on an online forum or social media",
    "review": "reviewing a book, movie, restaurant, or experience",
    "essay": "a structured argumentative or discursive essay",
    "proposal": "a proposal suggesting changes or improvements",
    "debate": "a structured argument presenting both sides of an issue",
    "feedback": "giving constructive feedback on a topic",
}

_GENERATION_PROMPT = """\
You are a {target_language_name} language exercise creator. Generate a writing \
exercise for a {level} learner. Target language: {target_language_name}.

Requirements:
- Exercise type: {exercise_type} ({exercise_type_desc})
- Word count: between {word_count_min} and {word_count_max} words
- Use {target_language_name} vocabulary and spelling conventions appropriate for {level}
- The prompt should be clear, engaging, and culturally relevant

Return ONLY valid JSON with no prose, no code fences, no extra text:
{{
  "topic": "<brief topic label, max 10 words>",
  "prompt": "<the writing prompt given to the student>",
  "word_count_min": <minimum word count>,
  "word_count_max": <maximum word count>
}}"""

_EVALUATION_PROMPT = """\
You are a {target_language_name} language teacher evaluating a writing exercise \
for a student at {level} CEFR level.

Student's text:
"{student_text}"

Evaluate based on:
1. Grammar and accuracy
2. Vocabulary range and appropriateness
3. Relevance to the prompt
4. Coherence and organization

Give a score from 0 to 5 (5 = excellent, 0 = very poor).
Then provide constructive feedback in {native_language} (max 150 words), highlighting strengths and areas to improve.

Return ONLY valid JSON:
{{
  "score": <0-5>,
  "feedback": "<constructive feedback in {native_language}>"
}}"""


async def get_available_exercise(
    level: str,
    target_language: str,
    user_id: int,
    db: AsyncSession,
) -> WritingExercise | None:
    """Return an uncompleted exercise for this user at the given level, or None."""
    completed_subq = (
        select(WritingAttempt.exercise_id)
        .where(WritingAttempt.user_id == user_id)
        .scalar_subquery()
    )
    result = await db.execute(
        select(WritingExercise)
        .where(
            WritingExercise.level == level,
            WritingExercise.target_language == target_language,
            WritingExercise.id.not_in(completed_subq),
        )
        .order_by(WritingExercise.created_at.asc())
        .limit(1)
    )
    return result.scalar_one_or_none()


async def generate_and_save_exercise(
    level: str,
    target_language: str,
    db: AsyncSession,
) -> WritingExercise:
    """Generate exercise prompt via LLM and persist it."""
    exercise_type = random.choice(_TYPES_BY_LEVEL.get(level, ["email", "short_story"]))
    wc_min, wc_max = _WORD_COUNT_BY_LEVEL.get(level, (50, 100))

    prompt = _GENERATION_PROMPT.format(
        level=level,
        target_language_name=get_language_name(target_language),
        exercise_type=exercise_type,
        exercise_type_desc=_TYPE_DESCRIPTIONS[exercise_type],
        word_count_min=wc_min,
        word_count_max=wc_max,
    )
    messages = [{"role": "user", "content": prompt}]

    parsed: dict[str, Any] | None = None
    for attempt in range(2):
        try:
            raw = await llm_adapter.chat(messages)
            parsed = parse_llm_json(raw)
            break
        except (json.JSONDecodeError, LLMResponseError, KeyError) as exc:
            if attempt == 1:
                raise ValueError(
                    f"LLM failed to produce valid JSON after 2 attempts: {exc}"
                ) from exc
            logger.warning("writing: LLM JSON parse failed on attempt 1, retrying")

    topic: str = parsed["topic"]  # type: ignore[index]
    text: str = parsed["prompt"]  # type: ignore[index]
    wc_min: int = parsed["word_count_min"]  # type: ignore[index]
    wc_max: int = parsed["word_count_max"]  # type: ignore[index]

    exercise = WritingExercise(
        level=level,
        target_language=target_language,
        exercise_type=exercise_type,
        topic=topic,
        prompt=text,
        word_count_min=wc_min,
        word_count_max=wc_max,
    )
    db.add(exercise)
    await db.flush()
    await db.commit()
    await db.refresh(exercise)
    return exercise


async def evaluate_and_submit(
    exercise_id: int,
    user_id: int,
    student_text: str,
    db: AsyncSession,
    *,
    study_plan_id: int | None = None,
    native_language: str = "Spanish",
    is_replay: bool = False,
) -> tuple[WritingAttempt, WritingExercise]:
    """
    Evaluate student's writing via LLM, persist attempt, award XP.
    Returns (attempt, exercise).
    Raises ValueError("exercise_not_found") if exercise_id is invalid.
    Raises ValueError("already_attempted") if user already submitted.
    """
    exercise = await db.get(WritingExercise, exercise_id)
    if exercise is None:
        raise ValueError("exercise_not_found")

    if not is_replay:
        existing = await db.execute(
            select(WritingAttempt).where(
                WritingAttempt.user_id == user_id,
                WritingAttempt.exercise_id == exercise_id,
            )
        )
        if existing.scalar_one_or_none() is not None:
            raise ValueError("already_attempted")

    # LLM evaluation
    eval_prompt = _EVALUATION_PROMPT.format(
        target_language_name=get_language_name(exercise.target_language),
        level=exercise.level,
        student_text=student_text,
        native_language=native_language,
    )
    eval_messages = [{"role": "user", "content": eval_prompt}]

    evaluation: dict[str, Any] | None = None
    for attempt in range(2):
        try:
            raw = await llm_adapter.chat(eval_messages)
            evaluation = parse_llm_json(raw)
            break
        except (json.JSONDecodeError, LLMResponseError, KeyError) as exc:
            if attempt == 1:
                raise ValueError(
                    f"LLM evaluation failed after 2 attempts: {exc}"
                ) from exc
            logger.warning("writing: evaluation JSON parse failed on attempt 1, retrying")

    score: int = int(evaluation["score"])  # type: ignore[index]
    feedback: str = str(evaluation["feedback"])  # type: ignore[index]
    xp_earned = score * XP_PER_CORRECT_SCORE if not is_replay else 0

    attempt = WritingAttempt(
        user_id=user_id,
        exercise_id=exercise_id,
        study_plan_id=study_plan_id,
        student_text=student_text,
        score=score,
        xp_earned=xp_earned,
        feedback=feedback,
    )
    db.add(attempt)

    exercise.view_count += 1
    await db.commit()
    await db.refresh(attempt)

    if xp_earned > 0:
        await update_daily_progress(db, user_id, xp=xp_earned, study_plan_id=study_plan_id)

    return attempt, exercise


async def get_user_history(
    user_id: int,
    db: AsyncSession,
    skip: int = 0,
    limit: int = 10,
    *,
    target_language: str | None = None,
) -> tuple[list[tuple[WritingAttempt, WritingExercise]], int]:
    """Return (rows, total) for paginated attempt history, newest first."""
    base_where = [WritingAttempt.user_id == user_id]
    if target_language is not None:
        base_where.append(WritingExercise.target_language == target_language)

    total_result = await db.execute(
        select(func.count(WritingAttempt.id))
        .join(WritingExercise, WritingAttempt.exercise_id == WritingExercise.id)
        .where(*base_where)
    )
    total: int = total_result.scalar_one()

    rows_result = await db.execute(
        select(WritingAttempt, WritingExercise)
        .join(WritingExercise, WritingAttempt.exercise_id == WritingExercise.id)
        .where(*base_where)
        .order_by(WritingAttempt.completed_at.desc())
        .offset(skip)
        .limit(limit)
    )
    return list(rows_result.all()), total
