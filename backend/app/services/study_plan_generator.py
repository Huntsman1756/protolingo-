from __future__ import annotations

from app.data.curriculum import distribute_units, get_curriculum_units
from app.schemas.study_plan import DayPlan, GeneratedPlan, GenerateStudyPlanRequest, WeekPlan


async def generate_study_plan(request: GenerateStudyPlanRequest) -> GeneratedPlan:
    """
    Build a curriculum-driven study plan skeleton.
    No LLM call — purely deterministic from the static curriculum.
    LLM is called separately per-lesson when the user opens one for the first time.
    """
    units = get_curriculum_units(request.cefr_level)
    lesson_slots = distribute_units(
        units=units,
        total_weeks=request.duration_weeks,
        days_per_week=request.days_per_week,
    )

    # Group slots into weekly buckets
    weeks_map: dict[int, list[dict]] = {}
    for slot in lesson_slots:
        w = slot["week"]
        weeks_map.setdefault(w, []).append(slot)

    weekly_plan: list[WeekPlan] = []
    for week_num in sorted(weeks_map):
        slots_in_week = weeks_map[week_num]
        # Use the first unit title of the week as theme
        theme = slots_in_week[0]["unit_title"] if slots_in_week else ""
        days = [
            DayPlan(
                day=s["day"],
                lesson_type=s["lesson_type"],
                title=s["title"],
                objectives=s["objectives"],
                estimated_minutes=s["estimated_minutes"],
                unit_id=s["unit_id"],
                grammar_points=s.get("grammar_points", []),
                vocabulary_set_ids=s.get("vocabulary_set_ids", []),
            )
            for s in slots_in_week
        ]
        weekly_plan.append(WeekPlan(week=week_num, theme=theme, days=days))

    return GeneratedPlan(
        title=f"English {request.cefr_level} — {request.duration_weeks}-week programme",
        cefr_level=request.cefr_level,
        duration_weeks=request.duration_weeks,
        days_per_week=request.days_per_week,
        ends_with_test=True,
        weekly_plan=weekly_plan,
    )

