from __future__ import annotations

import json
import logging
import random
from typing import Any

from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.reading import ReadingAttempt, ReadingExercise
from app.services.language_helpers import get_language_name
from app.services.llm_adapter import LLMResponseError, llm_adapter, parse_llm_json
from app.services.progress_service import update_daily_progress

logger = logging.getLogger(__name__)

XP_PER_CORRECT_ANSWER = 10

# Valid exercise types per CEFR level
_TYPES_BY_LEVEL: dict[str, list[str]] = {
    "A1": ["notice", "email"],
    "A2": ["notice", "email"],
    "B1": ["email", "article", "news"],
    "B2": ["article", "news", "blog_post", "review"],
    "C1": ["news", "blog_post", "review", "essay"],
    "C2": ["review", "essay"],
}

_WORD_COUNT_BY_LEVEL: dict[str, int] = {
    "A1": 80,
    "A2": 120,
    "B1": 200,
    "B2": 280,
    "C1": 380,
    "C2": 480,
}

_TYPE_DESCRIPTIONS: dict[str, str] = {
    "notice": "a short public notice, sign, or instruction",
    "email": "a short informal or formal email message",
    "article": "a short informational or educational article",
    "news": "a news report on a current or recent event",
    "blog_post": "an informal blog-style opinion or personal piece",
    "review": "a review of a book, film, restaurant, or product",
    "essay": "a formal argumentative or discursive essay",
}

_TOPICS_BY_LEVEL: dict[str, list[str]] = {
    "A1": ["daily_routine", "family", "shopping", "home", "animals"],
    "A2": ["travel", "food", "weather", "hobbies", "school"],
    "B1": ["health", "work", "environment", "sports", "friendship"],
    "B2": ["technology", "culture", "education", "media", "money"],
    "C1": ["politics", "science", "literature", "psychology", "urban_life"],
    "C2": ["philosophy", "history", "global_affairs", "ethics", "economics"],
}

_GENERATION_PROMPT = """\
You are a {target_language_name} language content creator. Generate a reading comprehension exercise \
for a {level} learner. Target language: {target_language_name}.

Requirements:
- Exercise type: {exercise_type} ({exercise_type_desc})
- Topic area: {topic}
- Length: approximately {word_count} words
- Use {target_language_name} vocabulary and spelling conventions
- Write in the natural register appropriate for the exercise type
- Do not use headers, markdown, or lists — plain flowing prose only
  (exception: emails may include a greeting and sign-off)

Return ONLY valid JSON with no prose, no code fences, no extra text:
{{
  "topic": "<brief topic label, max 10 words>",
  "text": "<exercise text as flowing prose>",
  "questions": [
    {{
      "index": 0,
      "question": "<question text>",
      "options": {{ "A": "<option>", "B": "<option>", "C": "<option>", "D": "<option>" }},
      "correct": "<A|B|C|D>"
    }}
  ]
}}

Include exactly 5 questions ordered by cognitive demand:
- Q0-Q1: literal comprehension (directly stated information)
- Q2-Q3: inference (implied meaning, tone, or purpose)
- Q4: vocabulary or register (word meaning in context or formality level)"""


async def get_available_exercise(
    level: str,
    target_language: str,
    user_id: int,
    db: AsyncSession,
) -> ReadingExercise | None:
    """Return an uncompleted exercise for this user at the given level, or None."""
    completed_subq = (
        select(ReadingAttempt.exercise_id)
        .where(ReadingAttempt.user_id == user_id)
        .scalar_subquery()
    )
    result = await db.execute(
        select(ReadingExercise)
        .where(
            ReadingExercise.level == level,
            ReadingExercise.target_language == target_language,
            ReadingExercise.id.not_in(completed_subq),
        )
        .order_by(ReadingExercise.created_at.asc())
        .limit(1)
    )
    return result.scalar_one_or_none()


async def generate_and_save_exercise(
    level: str,
    target_language: str,
    db: AsyncSession,
) -> ReadingExercise:
    """
    Generate exercise text via LLM and persist.

    Raises ValueError on LLM JSON failure after 2 attempts.
    """
    exercise_type = random.choice(_TYPES_BY_LEVEL.get(level, ["article"]))
    topic_area = random.choice(_TOPICS_BY_LEVEL.get(level, ["daily_routine"]))
    word_count = _WORD_COUNT_BY_LEVEL.get(level, 200)

    prompt = _GENERATION_PROMPT.format(
        level=level,
        target_language_name=get_language_name(target_language),
        exercise_type=exercise_type,
        exercise_type_desc=_TYPE_DESCRIPTIONS[exercise_type],
        topic=topic_area,
        word_count=word_count,
    )
    messages = [{"role": "user", "content": prompt}]

    # LLM generation — one retry on JSON parse failure
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
            logger.warning("reading: LLM JSON parse failed on attempt 1, retrying")

    topic: str = parsed["topic"]  # type: ignore[index]
    text: str = parsed["text"]  # type: ignore[index]
    questions: list[dict[str, Any]] = parsed["questions"]  # type: ignore[index]

    exercise = ReadingExercise(
        level=level,
        target_language=target_language,
        exercise_type=exercise_type,
        topic=topic,
        text=text,
        questions=questions,
    )
    db.add(exercise)
    await db.commit()
    await db.refresh(exercise)
    return exercise


def calculate_score(
    questions: list[dict[str, Any]],
    answers: dict[str, str],
) -> tuple[int, int]:
    """Return (score 0–5, xp_earned). Pure function — no DB access."""
    score = sum(
        1 for q in questions if answers.get(str(q["index"]), "").upper() == q["correct"].upper()
    )
    return score, score * XP_PER_CORRECT_ANSWER


async def submit_attempt(
    exercise_id: int,
    user_id: int,
    answers: dict[str, str],
    db: AsyncSession,
    is_replay: bool = False,
    study_plan_id: int | None = None,
) -> tuple[ReadingAttempt, ReadingExercise]:
    """
    Score answers, persist attempt, increment view_count, award XP.
    Returns (attempt, exercise).
    Raises ValueError("exercise_not_found") if exercise_id is invalid.
    Raises ValueError("already_attempted") if user already submitted for this exercise
    and is_replay is False.
    When is_replay=True the duplicate guard is skipped and xp_earned is forced to 0
    (spec: replaying an exercise from history awards no additional XP).
    """
    exercise = await db.get(ReadingExercise, exercise_id)
    if exercise is None:
        raise ValueError("exercise_not_found")

    if not is_replay:
        # Guard against duplicate submissions on first attempt
        existing = await db.execute(
            select(ReadingAttempt).where(
                ReadingAttempt.user_id == user_id,
                ReadingAttempt.exercise_id == exercise_id,
            )
        )
        if existing.scalar_one_or_none() is not None:
            raise ValueError("already_attempted")

    score, xp_earned = calculate_score(exercise.questions, answers)
    if is_replay:
        xp_earned = 0  # replays never award XP

    attempt = ReadingAttempt(
        user_id=user_id,
        exercise_id=exercise_id,
        answers=answers,
        score=score,
        xp_earned=xp_earned,
    )
    db.add(attempt)

    exercise.view_count += 1

    await db.commit()
    await db.refresh(attempt)

    # Award XP via the shared progress service (creates today's row if missing)
    if xp_earned > 0:
        await update_daily_progress(db, user_id, xp=xp_earned, study_plan_id=study_plan_id)

    return attempt, exercise


async def get_user_history(
    user_id: int,
    db: AsyncSession,
    skip: int = 0,
    limit: int = 10,
) -> tuple[list[tuple[ReadingAttempt, ReadingExercise]], int]:
    """Return (rows, total) for paginated attempt history, newest first."""
    total_result = await db.execute(
        select(func.count(ReadingAttempt.id)).where(ReadingAttempt.user_id == user_id)
    )
    total: int = total_result.scalar_one()

    rows_result = await db.execute(
        select(ReadingAttempt, ReadingExercise)
        .join(ReadingExercise, ReadingAttempt.exercise_id == ReadingExercise.id)
        .where(ReadingAttempt.user_id == user_id)
        .order_by(ReadingAttempt.completed_at.desc())
        .offset(skip)
        .limit(limit)
    )
    return list(rows_result.all()), total
