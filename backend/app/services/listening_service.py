from __future__ import annotations

import json
import logging
import os
import random
import re
from typing import Any, Literal

from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.listening import ListeningAttempt, ListeningExercise
from app.services.language_helpers import get_language_name
from app.services.llm_adapter import LLMResponseError, llm_adapter, parse_llm_json
from app.services.progress_service import update_daily_progress

logger = logging.getLogger(__name__)

XP_PER_CORRECT_ANSWER = 10
LISTENING_QUESTIONS = 5

ListeningSkill = Literal["literal", "inference", "vocab", "other"]

_QUESTION_SKILL_BY_INDEX: dict[int, ListeningSkill] = {
    0: "literal",
    1: "literal",
    2: "inference",
    3: "inference",
    4: "vocab",
}

# Valid exercise types per CEFR level — exactly 5 per level, may repeat across levels
_TYPES_BY_LEVEL: dict[str, list[str]] = {
    "A1": ["monologue", "announcement", "voicemail", "dialogue", "story"],
    "A2": ["monologue", "announcement", "voicemail", "dialogue", "story"],
    "B1": ["announcement", "voicemail", "story", "dialogue", "podcast"],
    "B2": ["voicemail", "story", "podcast", "interview", "news"],
    "C1": ["story", "podcast", "interview", "news", "monologue"],
    "C2": ["story", "podcast", "interview", "news", "monologue"],
}

_WORD_COUNT_BY_LEVEL: dict[str, int] = {
    "A1": 80,
    "A2": 120,
    "B1": 180,
    "B2": 250,
    "C1": 350,
    "C2": 450,
}

_TYPE_DESCRIPTIONS: dict[str, str] = {
    "monologue": "a first-person narrative or personal account",
    "announcement": "a public announcement (e.g. at an airport, shop, or office)",
    "voicemail": "someone leaving a recorded voice message",
    "story": "a short narrative with characters and plot",
    "podcast": "an informal presentation or opinion piece by a single speaker",
    "dialogue": "a short informal conversation between two people",
    "interview": "a structured interview or Q&A between a host and a guest",
    "news": "a short news broadcast or report segment",
}

_GENERATION_PROMPT = """\
You are a {target_language_name} language content creator. Generate a listening comprehension exercise \
for a {level} learner. Target language: {target_language_name}.

Requirements:
- Exercise type: {exercise_type} ({exercise_type_desc})
- Length: approximately {word_count} words
- Use {target_language_name} vocabulary and spelling conventions
- Write naturally, as if it will be read aloud
- Do not use headers, markdown, lists, or formatting — plain flowing prose only

Return ONLY valid JSON with no prose, no code fences, no extra text:
{{
  "topic": "<brief topic label, max 10 words>",
  "text": "<exercise text as flowing prose>",
  "questions": [
  {{
    "index": 0,
    "question": "<question text>",
    "options": {{ "A": "<option>", "B": "<option>", "C": "<option>", "D": "<option>" }},
    "correct": "<A|B|C|D>",
    "skill": "literal|inference|vocab"
  }}
  ]
}}

Include exactly 5 questions ordered by cognitive demand:
- Q0-Q1: literal comprehension (directly stated information)
- Q2-Q3: inference (implied meaning, tone, or purpose)
- Q4: vocabulary or register (word meaning in context or formality level)

The "skill" field is optional — if omitted, infer it from the index rule above."""


async def get_available_exercise(
    level: str,
    target_language: str,
    user_id: int,
    db: AsyncSession,
) -> ListeningExercise | None:
    """Return an uncompleted exercise for this user at the given level, or None."""
    completed_subq = (
        select(ListeningAttempt.exercise_id)
        .where(ListeningAttempt.user_id == user_id)
        .scalar_subquery()
    )
    result = await db.execute(
        select(ListeningExercise)
        .where(
            ListeningExercise.level == level,
            ListeningExercise.target_language == target_language,
            ListeningExercise.id.not_in(completed_subq),
        )
        .order_by(ListeningExercise.created_at.asc())
        .limit(1)
    )
    return result.scalar_one_or_none()


async def generate_and_save_exercise(
    level: str,
    target_language: str,
    db: AsyncSession,
    tts_service: Any,
    storage_path: str,
    voice: str = "",
) -> ListeningExercise:
    """
    Generate exercise text via LLM, synthesise audio via TTS, persist both.

    Raises ValueError on LLM JSON failure after 2 attempts.
    Raises any exception from tts_service.synthesize on TTS failure.
    """
    exercise_type = random.choice(_TYPES_BY_LEVEL.get(level, ["monologue", "story"]))
    word_count = _WORD_COUNT_BY_LEVEL.get(level, 200)

    prompt = _GENERATION_PROMPT.format(
        level=level,
        target_language_name=get_language_name(target_language),
        exercise_type=exercise_type,
        exercise_type_desc=_TYPE_DESCRIPTIONS[exercise_type],
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
            logger.warning("listening: LLM JSON parse failed on attempt 1, retrying")

    topic: str = parsed["topic"]  # type: ignore[index]
    text: str = parsed["text"]  # type: ignore[index]
    questions: list[dict[str, Any]] = parsed["questions"]  # type: ignore[index]

    # TTS synthesis — use the voice of the user who triggered generation
    audio_bytes: bytes = await tts_service.synthesize(text, voice or None)

    # Prepare audio directory
    audio_dir = os.path.join(storage_path, "listening")
    os.makedirs(audio_dir, exist_ok=True)

    # Flush to DB first so exercise.id is assigned by PostgreSQL sequence
    exercise = ListeningExercise(
        level=level,
        target_language=target_language,
        exercise_type=exercise_type,
        topic=topic,
        text=text,
        audio_path="",  # set after ID is known
        questions=questions,
    )
    db.add(exercise)
    await db.flush()  # assigns exercise.id without committing the transaction

    # Write MP3 with the exercise ID as filename
    audio_path = os.path.join(audio_dir, f"{exercise.id}.mp3")
    with open(audio_path, "wb") as fh:
        fh.write(audio_bytes)

    exercise.audio_path = audio_path
    await db.commit()
    await db.refresh(exercise)
    return exercise


def _normalize_skill(raw: object) -> ListeningSkill:
    if not isinstance(raw, str):
        return "other"
    value = raw.lower().strip()
    if value in {"literal", "inference", "vocab"}:
        return value
    return "other"


def _coerce_skill(index: int, question: dict[str, Any] | None) -> ListeningSkill:
    if question is None:
        return _QUESTION_SKILL_BY_INDEX.get(index, "other")
    skill = _normalize_skill(question.get("skill"))
    if skill != "other":
        return skill
    return _QUESTION_SKILL_BY_INDEX.get(index, "other")


def _normalize_answer(raw: str | None) -> str:
    return re.sub(r"\s+", " ", raw.strip().lower()) if raw else ""


def calculate_score_with_breakdown(
    questions: list[dict[str, Any]], answers: dict[str, str]
) -> tuple[int, int, list[dict[str, Any]]]:
    """Return (score, xp_earned, skill breakdown)."""
    score = 0
    tally: dict[ListeningSkill, tuple[int, int]] = {
        "literal": (0, 0),
        "inference": (0, 0),
        "vocab": (0, 0),
        "other": (0, 0),
    }

    for q in questions:
        index = int(q["index"])
        correct = _normalize_answer(str(q.get("correct", "")).upper())
        selected = _normalize_answer(answers.get(str(index), "")).upper()
        is_correct = selected == correct

        if is_correct:
            score += 1

        skill = _coerce_skill(index, q)
        correct_count, total_count = tally[skill]
        tally[skill] = (correct_count + (1 if is_correct else 0), total_count + 1)

    xp = score * XP_PER_CORRECT_ANSWER
    max_score = min(len(questions), LISTENING_QUESTIONS)
    breakdown = [
        {
            "skill": skill,
            "correct": values[0],
            "total": values[1],
            "accuracy": round((values[0] / values[1]) * 100, 1) if values[1] else 0.0,
        }
        for skill, values in tally.items()
        if values[1]
    ]
    return score, xp, breakdown


def calculate_score(questions: list[dict[str, Any]], answers: dict[str, str]) -> tuple[int, int]:
    """Backward-compatible helper."""
    score, xp, _ = calculate_score_with_breakdown(questions, answers)
    return score, xp


def max_score(questions: list[dict[str, Any]]) -> int:
    return min(len(questions), LISTENING_QUESTIONS)


def score_percentage(score: int, maximum: int) -> int:
    if maximum <= 0:
        return 0
    return round((score / maximum) * 100)


async def submit_attempt(
    exercise_id: int,
    user_id: int,
    answers: dict[str, str],
    db: AsyncSession,
    is_replay: bool = False,
    study_plan_id: int | None = None,
) -> tuple[ListeningAttempt, ListeningExercise]:
    """
    Score answers, persist attempt, increment play_count, award XP.
    Returns (attempt, exercise).
    Raises ValueError("exercise_not_found") if exercise_id is invalid.
    Raises ValueError("already_attempted") if user already submitted for this exercise
    and is_replay is False.
    When is_replay=True the duplicate guard is skipped and xp_earned is forced to 0
    (spec: replaying an exercise from history awards no additional XP).
    """
    exercise = await db.get(ListeningExercise, exercise_id)
    if exercise is None:
        raise ValueError("exercise_not_found")

    if not is_replay:
        # Guard against duplicate submissions on first attempt
        existing = await db.execute(
            select(ListeningAttempt).where(
                ListeningAttempt.user_id == user_id,
                ListeningAttempt.exercise_id == exercise_id,
            )
        )
        if existing.scalar_one_or_none() is not None:
            raise ValueError("already_attempted")

    score, xp_earned = calculate_score(exercise.questions, answers)
    if is_replay:
        xp_earned = 0  # replays never award XP

    attempt = ListeningAttempt(
        user_id=user_id,
        exercise_id=exercise_id,
        study_plan_id=study_plan_id,
        answers=answers,
        score=score,
        xp_earned=xp_earned,
    )
    db.add(attempt)

    exercise.play_count += 1

    await db.commit()
    await db.refresh(attempt)

    # Award XP and update daily progress metrics (skill signal).
    if not is_replay:
        max_score_value = max_score(exercise.questions)
        score_ratio = score / max_score_value if max_score_value > 0 else 0.0
        await update_daily_progress(
            db,
            user_id,
            exercise_correct=score_ratio >= 0.5,
            flashcard_reviewed=False,
            skill="listening",
            skill_score=round(score_ratio, 3),
            xp=xp_earned,
            study_plan_id=study_plan_id,
        )

    return attempt, exercise


async def get_user_history(
    user_id: int,
    db: AsyncSession,
    skip: int = 0,
    limit: int = 10,
    *,
    target_language: str | None = None,
) -> tuple[list[tuple[ListeningAttempt, ListeningExercise]], int]:
    """Return (rows, total) for paginated attempt history, newest first."""
    base_where = [ListeningAttempt.user_id == user_id]
    if target_language is not None:
        base_where.append(ListeningExercise.target_language == target_language)

    total_result = await db.execute(
        select(func.count(ListeningAttempt.id))
        .join(ListeningExercise, ListeningAttempt.exercise_id == ListeningExercise.id)
        .where(*base_where)
    )
    total: int = total_result.scalar_one()

    rows_result = await db.execute(
        select(ListeningAttempt, ListeningExercise)
        .join(ListeningExercise, ListeningAttempt.exercise_id == ListeningExercise.id)
        .where(*base_where)
        .order_by(ListeningAttempt.completed_at.desc())
        .offset(skip)
        .limit(limit)
    )
    return list(rows_result.all()), total
