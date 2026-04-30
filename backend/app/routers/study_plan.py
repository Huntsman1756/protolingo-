from typing import Optional

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.deps import get_current_user
from app.models.study_plan import StudyPlan
from app.models.user import User
from app.schemas.study_plan import (
    GeneratedPlan,
    GenerateStudyPlanRequest,
    StudyPlanResponse,
    TodayLesson,
    TodayResponse,
)
from app.services.llm_adapter import (
    LLMError,
    LLMTimeoutError,
    LLMUnavailableError,
)
from app.services.study_plan_generator import generate_study_plan

router = APIRouter(prefix="/api/study-plan", tags=["study-plan"])


@router.get("/current", response_model=Optional[StudyPlanResponse])
async def get_current_plan(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(StudyPlan)
        .where(StudyPlan.user_id == current_user.id, StudyPlan.is_active.is_(True))
        .order_by(StudyPlan.created_at.desc())
        .limit(1)
    )
    plan = result.scalar_one_or_none()
    if not plan:
        return None
    return plan


@router.post("/generate", response_model=StudyPlanResponse)
async def create_study_plan(
    data: GenerateStudyPlanRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    # Deactivate old plans
    old_plans = await db.execute(
        select(StudyPlan).where(
            StudyPlan.user_id == current_user.id, StudyPlan.is_active.is_(True)
        )
    )
    for old in old_plans.scalars().all():
        old.is_active = False

    try:
        generated = await generate_study_plan(data)
    except LLMTimeoutError:
        raise HTTPException(
            status_code=504,
            detail="The AI model took too long. Try again or check your Ollama instance.",
        )
    except LLMUnavailableError as e:
        raise HTTPException(
            status_code=503,
            detail=f"AI service unavailable: {str(e)}",
        )
    except LLMError as e:
        raise HTTPException(
            status_code=502,
            detail=f"Failed to generate study plan: {str(e)}",
        )

    plan_dict = generated.model_dump() if hasattr(generated, "model_dump") else generated
    plan = StudyPlan(
        user_id=current_user.id,
        cefr_level=data.cefr_level,
        goals=data.goals,
        weeks_planned=data.weeks,
        generated_plan=plan_dict,
        is_active=True,
    )
    db.add(plan)
    await db.commit()
    await db.refresh(plan)
    return plan


@router.get("/today", response_model=TodayResponse)
async def get_today_lessons(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(StudyPlan)
        .where(StudyPlan.user_id == current_user.id, StudyPlan.is_active.is_(True))
        .order_by(StudyPlan.created_at.desc())
        .limit(1)
    )
    plan = result.scalar_one_or_none()
    if not plan:
        raise HTTPException(status_code=404, detail="No active study plan found")

    from datetime import date

    start_date = plan.created_at.date() if hasattr(plan.created_at, "date") else plan.created_at
    days_elapsed = (date.today() - start_date).days
    current_week = min((days_elapsed // 7) + 1, plan.weeks_planned)
    current_day = (days_elapsed % 7) + 1

    weekly_plan = (
        plan.generated_plan["weekly_plan"]
        if isinstance(plan.generated_plan, dict)
        else plan.generated_plan.weekly_plan
    )

    week = None
    for w in weekly_plan:
        w_week = w["week"] if isinstance(w, dict) else w.week
        if w_week == current_week:
            week = w
            break

    if not week:
        week = weekly_plan[0]

    days = week["days"] if isinstance(week, dict) else week.days
    today_lessons = []
    for d in days:
        d_day = d["day"] if isinstance(d, dict) else d.day
        if d_day == current_day:
            d_title = d["title"] if isinstance(d, dict) else d.title
            d_type = d["lesson_type"] if isinstance(d, dict) else d.lesson_type
            d_obj = d["objectives"] if isinstance(d, dict) else d.objectives
            d_min = d["estimated_minutes"] if isinstance(d, dict) else d.estimated_minutes
            today_lessons.append(
                TodayLesson(
                    title=d_title,
                    lesson_type=d_type,
                    week=current_week,
                    day=current_day,
                    objectives=d_obj,
                    estimated_minutes=d_min,
                )
            )

    return TodayResponse(plan_id=plan.id, lessons=today_lessons)
