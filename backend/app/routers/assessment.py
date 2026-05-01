from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.deps import get_current_user
from app.models.study_plan import StudyPlan
from app.models.user import User
from app.schemas.assessment import (
    AnswerRecord,
    AssessmentCompleteRequest,
    AssessmentResult,
    AssessmentSubmitRequest,
    FreeWriteEvalRequest,
    LevelTestResult,
    LevelTestSubmitRequest,
)
from app.services.assessment import (
    END_OF_LEVEL_TEST_PROMPT,  # noqa: F401 (kept for potential reuse)
    evaluate_adaptive_quiz,
    evaluate_free_write,
    generate_level_test_questions,
)
from app.services.llm_adapter import (
    LLMError,
    LLMTimeoutError,
    LLMUnavailableError,
)
from app.services.study_plan_generator import generate_study_plan
from app.schemas.study_plan import GenerateStudyPlanRequest

router = APIRouter(prefix="/api/assessment", tags=["assessment"])


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
    _current_user: User = Depends(get_current_user),
):
    """Optional LLM evaluation of the single free-write question."""
    try:
        return await evaluate_free_write(data)
    except LLMTimeoutError:
        raise HTTPException(status_code=504, detail="LLM timed out evaluating free-write.")
    except LLMUnavailableError as e:
        raise HTTPException(status_code=503, detail=f"AI service unavailable: {e}")
    except LLMError as e:
        raise HTTPException(status_code=502, detail=f"Free-write evaluation failed: {e}")


@router.post("/complete", response_model=dict)
async def complete_assessment(
    data: AssessmentCompleteRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """
    Persist the assessment result and generate the initial study plan.
    Called after Step 3 (duration selector) is submitted.
    """
    # Deactivate any existing active plans
    old_result = await db.execute(
        select(StudyPlan).where(
            StudyPlan.user_id == current_user.id, StudyPlan.is_active.is_(True)
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
    generated = await generate_study_plan(plan_request)
    plan_dict = generated.model_dump()

    from app.data.curriculum import get_curriculum_units  # noqa: PLC0415

    units = get_curriculum_units(data.cefr_level)
    first_unit_id = units[0].id if units else ""

    plan = StudyPlan(
        user_id=current_user.id,
        cefr_level=data.cefr_level,
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
        select(StudyPlan).where(
            StudyPlan.id == plan_id,
            StudyPlan.user_id == current_user.id,
        )
    )
    plan = result.scalar_one_or_none()
    if not plan:
        raise HTTPException(status_code=404, detail="Study plan not found.")

    # Collect all grammar points and vocabulary sets from the curriculum
    from app.data.curriculum import get_curriculum_units  # noqa: PLC0415

    units = get_curriculum_units(plan.cefr_level)
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
        )
    except LLMTimeoutError:
        raise HTTPException(status_code=504, detail="LLM timed out generating level test.")
    except LLMUnavailableError as e:
        raise HTTPException(status_code=503, detail=f"AI service unavailable: {e}")
    except LLMError as e:
        raise HTTPException(status_code=502, detail=f"Level test generation failed: {e}")

    return {"plan_id": plan_id, "cefr_level": plan.cefr_level, "questions": questions}


@router.post("/level-test/submit", response_model=LevelTestResult)
async def submit_level_test(
    data: LevelTestSubmitRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Evaluate the end-of-level test and save the result to the study plan."""
    result = await db.execute(
        select(StudyPlan).where(
            StudyPlan.id == data.plan_id,
            StudyPlan.user_id == current_user.id,
        )
    )
    plan = result.scalar_one_or_none()
    if not plan:
        raise HTTPException(status_code=404, detail="Study plan not found.")

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
        select(StudyPlan).where(
            StudyPlan.id == plan_id,
            StudyPlan.user_id == current_user.id,
        )
    )
    plan = result.scalar_one_or_none()
    if not plan or not plan.completion_test_taken:
        raise HTTPException(status_code=404, detail="Level test result not found.")

    from app.data.curriculum import CEFR_LEVELS  # noqa: PLC0415

    current_idx = CEFR_LEVELS.index(plan.cefr_level) if plan.cefr_level in CEFR_LEVELS else 0
    next_level = CEFR_LEVELS[current_idx + 1] if current_idx + 1 < len(CEFR_LEVELS) else None

    return LevelTestResult(
        score=plan.completion_test_score or 0.0,
        recommendation=plan.completion_test_recommendation or "repeat",
        next_level=next_level if plan.completion_test_recommendation == "advance" else None,
    )

