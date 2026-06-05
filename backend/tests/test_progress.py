import pytest


@pytest.mark.asyncio
async def test_progress_summary_empty(client, test_user):
    user, headers = test_user

    response = await client.get("/api/progress/summary", headers=headers)
    assert response.status_code == 200
    data = response.json()
    assert data["total_xp"] == 0
    assert data["current_streak"] == 0


@pytest.mark.asyncio
async def test_progress_history_empty(client, test_user):
    user, headers = test_user

    response = await client.get("/api/progress/history", headers=headers)
    assert response.status_code == 200
    data = response.json()
    assert data["entries"] == []


@pytest.mark.asyncio
async def test_progress_with_data(client, test_user, db_session):
    user, headers = test_user

    from app.models.progress import Progress
    from tests.conftest import make_study_plan

    plan = await make_study_plan(
        db_session,
        user_id=user.id,
        cefr_level="A1",
        target_language="en-US",
        goals=["grammar"],
        duration_weeks=4,
        days_per_week=4,
        current_unit="",
        generated_plan={},
        is_active=True,
    )

    progress = Progress(
        user_id=user.id,
        study_plan_id=plan.id,
        xp_earned=50,
        lessons_completed=2,
        exercises_correct=8,
        exercises_total=10,
        streak_day=3,
        skills={"grammar": 0.6, "vocabulary": 0.4},
    )
    db_session.add(progress)
    await db_session.commit()

    response = await client.get("/api/progress/summary", headers=headers)
    assert response.status_code == 200
    data = response.json()
    assert data["total_xp"] == 50
    assert data["current_streak"] == 3
    assert data["accuracy"] == 0.8
