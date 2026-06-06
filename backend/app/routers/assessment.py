from __future__ import annotations

import json
from uuid import uuid4

from fastapi import APIRouter, Depends, HTTPException, Query, status
from pydantic import BaseModel
from redis.asyncio import Redis
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.deps import get_current_user, get_redis
from app.models.study_plan import StudyPlan
from app.models.user import User
from app.models.user_language import UserLanguage
from app.schemas.assessment import (
    AssessmentCompleteRequest,
    AssessmentResult,
    AssessmentSubmitRequest,
    FreeWriteEvalRequest,
    LevelTestResult,
    LevelTestSubmitRequest,
)
from app.schemas.study_plan import GenerateStudyPlanRequest
from app.services.assessment import (
    END_OF_LEVEL_TEST_PROMPT,  # noqa: F401 (kept for potential reuse)
    evaluate_adaptive_quiz,
    evaluate_free_write,
    generate_level_test_questions,
)
from app.services.language_helpers import get_language_name
from app.services.llm_adapter import (
    LLMError,
    LLMTimeoutError,
    LLMUnavailableError,
    llm_adapter,
)
from app.services.study_plan_generator import generate_study_plan
from app.services.user_language_service import ensure_user_language

router = APIRouter(prefix="/api/assessment", tags=["assessment"])

_ASSESSMENT_TTL = 1800  # 30 minutes

_ANSWER_FIELDS = frozenset({"correct_answer", "correct"})


def _strip_answers(quiz: dict) -> dict:
    """Remove correct-answer fields from quiz questions before sending to the client.

    B-03: prevents exposing correct answers in the API response, which would
    allow users to cheat by inspecting network traffic.
    """
    questions = [
        {k: v for k, v in q.items() if k not in _ANSWER_FIELDS} for q in quiz.get("questions", [])
    ]
    return {**quiz, "questions": questions}


class LegacyAnswerItem(BaseModel):
    question_id: str | int
    answer: str


class LegacyAssessmentSubmitRequest(BaseModel):
    answers: list[LegacyAnswerItem]
    target_language: str | None = None  # Phase 10: used to resolve the scoped Redis key


class LegacyQuizQuestion(BaseModel):
    id: str | int
    type: str = "multiple_choice"
    difficulty: str
    question: str
    options: list[str]
    correct_answer: str | None = None
    correct: str | None = None


class LegacyQuizResponse(BaseModel):
    questions: list[LegacyQuizQuestion]


class LegacyEvalResponse(BaseModel):
    cefr_level: str
    score: float
    analysis: str = ""
    strengths: list[str] = []
    weaknesses: list[str] = []


# Backward-compatible session store backed by Redis.
_sessions = None  # kept as sentinel so conftest import doesn't break


@router.get("/start", response_model=dict)
async def start_assessment(
    language: str | None = Query(None),
    current_user: User = Depends(get_current_user),
    redis: Redis = Depends(get_redis),
    db: AsyncSession = Depends(get_db),
):
    # Resolve the target language for this assessment
    if language:
        target_language = language
        target_language_name = get_language_name(target_language)
    else:
        from app.services.user_language_service import get_active_language  # noqa: PLC0415

        active_lang = await get_active_language(db, current_user.id)
        target_language = (
            active_lang.target_language if active_lang else current_user.target_language
        )
        target_language_name = get_language_name(target_language)

    try:
        quiz_payload = await llm_adapter.structured_output(
            [
                {
                    "role": "system",
                    "content": (
                        f"Generate an adaptive CEFR quiz with 20 questions "
                        f"for {target_language_name} language proficiency."
                    ),
                }
            ],
            LegacyQuizResponse,
        )
    except LLMTimeoutError:
        raise HTTPException(
            status_code=status.HTTP_504_GATEWAY_TIMEOUT,
            detail="LLM timed out generating assessment quiz.",
        )
    except LLMUnavailableError as e:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="ai_service_unavailable"
        )
    except LLMError as e:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY, detail="ai_service_error"
        )

    quiz = quiz_payload.model_dump() if isinstance(quiz_payload, BaseModel) else quiz_payload
    session_id = str(uuid4())
    redis_key = f"assessment:{current_user.id}:{target_language}"
    # Remove any legacy single-key session so old clients that call /submit
    # without target_language don't accidentally pick up a stale session.
    await redis.delete(f"assessment:{current_user.id}")
    await redis.setex(
        redis_key,
        _ASSESSMENT_TTL,
        json.dumps({"session_id": session_id, "quiz": quiz, "target_language": target_language}),
    )
    return {"quiz": _strip_answers(quiz), "session_id": session_id}


@router.post("/submit", response_model=AssessmentResult)
async def submit_assessment(
    data: LegacyAssessmentSubmitRequest,
    current_user: User = Depends(get_current_user),
    redis: Redis = Depends(get_redis),
    db: AsyncSession = Depends(get_db),
):
    # Resolve the Redis key in priority order:
    # 1. Scoped key built from the target_language in the request body (new clients)
    # 2. Scoped key built from the user's active language (fallback for new-format sessions)
    # 3. Legacy single key assessment:{user_id} (backward compat for in-flight sessions)
    redis_key: str | None = None
    session_raw: str | bytes | None = None

    if data.target_language:
        candidate = f"assessment:{current_user.id}:{data.target_language}"
        session_raw = await redis.get(candidate)
        if session_raw:
            redis_key = candidate

    if not session_raw:
        # Try scoped key using active language
        from app.services.user_language_service import get_active_language  # noqa: PLC0415

        active_lang = await get_active_language(db, current_user.id)
        if active_lang:
            candidate = f"assessment:{current_user.id}:{active_lang.target_language}"
            session_raw = await redis.get(candidate)
            if session_raw:
                redis_key = candidate

    if not session_raw:
        # Legacy fallback — sessions created before the scoped-key migration
        candidate = f"assessment:{current_user.id}"
        session_raw = await redis.get(candidate)
        if session_raw:
            redis_key = candidate

    if not session_raw or not redis_key:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="No active assessment session."
        )
    session = json.loads(session_raw)

    try:
        eval_payload = await llm_adapter.structured_output(
            [
                {
                    "role": "system",
                    "content": "Evaluate assessment answers and return CEFR placement result as JSON.",
                },
                {
                    "role": "user",
                    "content": (
                        f"Session: {session['session_id']}\n"
                        f"Quiz: {session['quiz']}\n"
                        f"Answers: {data.model_dump()}"
                    ),
                },
            ],
            LegacyEvalResponse,
        )
    except LLMTimeoutError:
        raise HTTPException(
            status_code=status.HTTP_504_GATEWAY_TIMEOUT,
            detail="LLM timed out evaluating assessment.",
        )
    except LLMUnavailableError as e:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="ai_service_unavailable"
        )
    except LLMError as e:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY, detail="ai_service_error"
        )
    finally:
        await redis.delete(redis_key)

    result = eval_payload.model_dump() if isinstance(eval_payload, BaseModel) else eval_payload
    return AssessmentResult(
        cefr_level=result.get("cefr_level", "A1"),
        score=float(result.get("score", 0.0)),
        skill_profile={},
        strengths=result.get("strengths", []),
        weaknesses=result.get("weaknesses", []),
        analysis=result.get("analysis", ""),
    )


@router.post("/evaluate", response_model=AssessmentResult)
async def evaluate_quiz(
    data: AssessmentSubmitRequest,
    _current_user: User = Depends(get_current_user),
):
    """
    Deterministic CEFR evaluation of the adaptive quiz answers.
    No LLM involved — pure algorithm.
    """
    return evaluate_adaptive_quiz(data.answers)


@router.post("/free-write", response_model=dict)
async def evaluate_free_write_endpoint(
    data: FreeWriteEvalRequest,
    current_user: User = Depends(get_current_user),
    redis: Redis = Depends(get_redis),
    db: AsyncSession = Depends(get_db),
):
    """Optional LLM evaluation of the single free-write question."""
    # Resolve target_language in priority order:
    # 1. Scoped Redis session keyed by active language (new format, most accurate)
    # 2. Scoped Redis session keyed by users.target_language (covers same-language retakes)
    # 3. Legacy Redis session assessment:{user_id} (backward compat for in-flight sessions)
    # 4. Active language from user_languages table
    # 5. users.target_language (final fallback)
    target_language: str = current_user.target_language

    from app.services.user_language_service import get_active_language  # noqa: PLC0415

    active_lang = await get_active_language(db, current_user.id)
    if active_lang:
        target_language = active_lang.target_language

    # Try to get the authoritative language from the active Redis session
    session_raw: str | bytes | None = None
    for candidate_key in [
        f"assessment:{current_user.id}:{target_language}",
        f"assessment:{current_user.id}:{current_user.target_language}",
        f"assessment:{current_user.id}",  # legacy key
    ]:
        session_raw = await redis.get(candidate_key)
        if session_raw:
            break

    if session_raw:
        session = json.loads(session_raw)
        target_language = session.get("target_language", target_language)

    try:
        return await evaluate_free_write(data, target_language=target_language)
    except LLMTimeoutError:
        raise HTTPException(
            status_code=status.HTTP_504_GATEWAY_TIMEOUT,
            detail="LLM timed out evaluating free-write.",
        )
    except LLMUnavailableError as e:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="ai_service_unavailable"
        )
    except LLMError as e:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY, detail="ai_service_error"
        )


@router.post("/complete", response_model=dict)
async def complete_assessment(
    data: AssessmentCompleteRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
    redis: Redis = Depends(get_redis),
):
    """
    Persist the assessment result and generate the initial study plan.
    Called after Step 3 (duration selector) is submitted.
    """
    # Resolve target_language in priority order:
    # 1. Explicit field in the request body (new frontend always sends this)
    # 2. Scoped Redis session: assessment:{user_id}:{body_lang}
    # 3. Scoped Redis session: assessment:{user_id}:{users.target_language}
    # 4. Legacy Redis session: assessment:{user_id}
    # 5. users.target_language (final fallback — always safe for the normal frontend flow)
    target_language: str = data.target_language or current_user.target_language

    # Try to find a Redis session that confirms the language
    session_raw: str | bytes | None = None
    for candidate_key in [
        f"assessment:{current_user.id}:{target_language}",
        f"assessment:{current_user.id}:{current_user.target_language}",
        f"assessment:{current_user.id}",  # legacy key
    ]:
        session_raw = await redis.get(candidate_key)
        if session_raw:
            break

    if session_raw:
        session = json.loads(session_raw)
        # The session's target_language is the most authoritative source when present
        target_language = session.get("target_language", target_language)

    # Ensure a UserLanguage row exists for this language
    user_lang = await ensure_user_language(db, current_user.id, target_language)

    # Deactivate existing active plans — scoped to this language only
    old_result = await db.execute(
        select(StudyPlan).where(
            StudyPlan.user_language_id == user_lang.id,
            StudyPlan.is_active.is_(True),
        )
    )
    for old in old_result.scalars().all():
        old.is_active = False

    # Generate curriculum-driven plan
    plan_request = GenerateStudyPlanRequest(
        cefr_level=data.cefr_level,
        goals=data.goals,
        duration_weeks=data.duration_weeks,
        days_per_week=data.days_per_week,
        weaknesses=data.weaknesses,
        strengths=data.strengths,
    )
    generated = await generate_study_plan(plan_request, target_language=target_language)
    plan_dict = generated.model_dump()

    from app.data.curriculum import get_curriculum_units  # noqa: PLC0415

    units = get_curriculum_units(data.cefr_level, target_language)
    first_unit_id = units[0].id if units else ""

    plan = StudyPlan(
        user_id=current_user.id,
        user_language_id=user_lang.id,
        cefr_level=data.cefr_level,
        target_language=target_language,
        goals=data.goals,
        duration_weeks=data.duration_weeks,
        days_per_week=data.days_per_week,
        current_unit=first_unit_id,
        generated_plan=plan_dict,
        is_active=True,
    )
    db.add(plan)
    await db.commit()
    await db.refresh(plan)
    return {"plan_id": plan.id, "cefr_level": plan.cefr_level}


@router.get("/level-test/questions/{plan_id}", response_model=dict)
async def get_level_test_questions(
    plan_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """
    Generate 20 level-completion test questions using the LLM.
    Questions are constrained to grammar/vocabulary studied in the plan's CEFR level.
    """
    result = await db.execute(
        select(StudyPlan)
        .join(UserLanguage, StudyPlan.user_language_id == UserLanguage.id)
        .where(
            StudyPlan.id == plan_id,
            UserLanguage.user_id == current_user.id,
        )
    )
    plan = result.scalar_one_or_none()
    if not plan:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Study plan not found.")

    # Collect all grammar points and vocabulary sets from the curriculum
    from app.data.curriculum import get_curriculum_units  # noqa: PLC0415

    units = get_curriculum_units(plan.cefr_level, plan.target_language)
    grammar_points: list[str] = []
    vocab_sets: list[str] = []
    for u in units:
        grammar_points.extend(u.grammar_points)
        vocab_sets.extend(u.vocabulary_set_ids)

    try:
        questions = await generate_level_test_questions(
            cefr_level=plan.cefr_level,
            grammar_points_studied=list(dict.fromkeys(grammar_points)),  # dedup, preserve order
            vocabulary_sets_studied=list(dict.fromkeys(vocab_sets)),
            target_language=plan.target_language,
        )
    except LLMTimeoutError:
        raise HTTPException(
            status_code=status.HTTP_504_GATEWAY_TIMEOUT,
            detail="LLM timed out generating level test.",
        )
    except LLMUnavailableError as e:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="ai_service_unavailable"
        )
    except LLMError as e:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY, detail="ai_service_error"
        )

    return {"plan_id": plan_id, "cefr_level": plan.cefr_level, "questions": questions}


@router.post("/level-test/submit", response_model=LevelTestResult)
async def submit_level_test(
    data: LevelTestSubmitRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Evaluate the end-of-level test and save the result to the study plan."""
    result = await db.execute(
        select(StudyPlan)
        .join(UserLanguage, StudyPlan.user_language_id == UserLanguage.id)
        .where(
            StudyPlan.id == data.plan_id,
            UserLanguage.user_id == current_user.id,
        )
    )
    plan = result.scalar_one_or_none()
    if not plan:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Study plan not found.")

    # Use the same deterministic evaluator — treat all answers as one skill bucket
    assessment = evaluate_adaptive_quiz(data.answers)
    score = assessment.score

    if score >= 0.75:
        recommendation = "advance"
    elif score >= 0.55:
        recommendation = "extend"
    else:
        recommendation = "repeat"

    from app.data.curriculum import CEFR_LEVELS  # noqa: PLC0415

    current_idx = CEFR_LEVELS.index(plan.cefr_level) if plan.cefr_level in CEFR_LEVELS else 0
    next_level = CEFR_LEVELS[current_idx + 1] if current_idx + 1 < len(CEFR_LEVELS) else None

    plan.completion_test_taken = True
    plan.completion_test_score = score
    plan.completion_test_recommendation = recommendation
    await db.commit()
    await db.refresh(plan)

    return LevelTestResult(
        score=score,
        recommendation=recommendation,
        next_level=next_level if recommendation == "advance" else None,
    )


@router.get("/level-test/result/{plan_id}", response_model=LevelTestResult)
async def get_level_test_result(
    plan_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(StudyPlan)
        .join(UserLanguage, StudyPlan.user_language_id == UserLanguage.id)
        .where(
            StudyPlan.id == plan_id,
            UserLanguage.user_id == current_user.id,
        )
    )
    plan = result.scalar_one_or_none()
    if not plan or not plan.completion_test_taken:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Level test result not found."
        )

    from app.data.curriculum import CEFR_LEVELS  # noqa: PLC0415

    current_idx = CEFR_LEVELS.index(plan.cefr_level) if plan.cefr_level in CEFR_LEVELS else 0
    next_level = CEFR_LEVELS[current_idx + 1] if current_idx + 1 < len(CEFR_LEVELS) else None

    return LevelTestResult(
        score=plan.completion_test_score or 0.0,
        recommendation=plan.completion_test_recommendation or "repeat",
        next_level=next_level if plan.completion_test_recommendation == "advance" else None,
    )
