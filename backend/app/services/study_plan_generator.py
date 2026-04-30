from app.schemas.study_plan import GeneratedPlan, GenerateStudyPlanRequest
from app.services.llm_adapter import llm_adapter

STUDY_PLAN_PROMPT = """
You are an expert English teacher creating a personalized study plan.

Student profile:
- CEFR level: {cefr_level}
- Goals: {goals}
- Weaknesses to address: {weaknesses}
- Strengths to build on: {strengths}
- Assessment analysis: {analysis}
- Available time per day: {minutes_per_day} minutes
- Study days per week: {days_per_week}
- Plan duration: {weeks} weeks

Use the weaknesses and assessment analysis to prioritize lesson content.
Only include {days_per_week} lesson days per week (not 7).
Create a structured {weeks}-week study plan with daily lessons.
Each lesson should take 20–30 minutes.

Return a JSON object:
{{
  "title": "...",
  "weekly_plan": [
    {{
      "week": 1,
      "theme": "Present Tenses & Basic Conversation",
      "days": [
        {{
          "day": 1,
          "lesson_type": "grammar",
          "title": "Simple Present vs Present Continuous",
          "objectives": ["..."],
          "estimated_minutes": 25
        }}
      ]
    }}
  ]
}}
"""


async def generate_study_plan(request: GenerateStudyPlanRequest) -> GeneratedPlan:
    weaknesses_str = ", ".join(request.weaknesses) if request.weaknesses else ", ".join(request.goals)
    strengths_str = ", ".join(request.strengths) if request.strengths else "none identified"
    goals_str = ", ".join(request.goals)
    analysis_str = request.analysis or "No additional analysis provided."

    prompt = STUDY_PLAN_PROMPT.format(
        cefr_level=request.cefr_level,
        weaknesses=weaknesses_str,
        strengths=strengths_str,
        goals=goals_str,
        analysis=analysis_str,
        days_per_week=request.days_per_week,
        minutes_per_day=request.minutes_per_day,
        weeks=request.weeks,
    )

    plan = await llm_adapter.structured_output(
        [{"role": "system", "content": prompt}],
        GeneratedPlan,
    )
    return plan
