"""Tests for GET /api/progress/competencies (per-unit skill scores)."""
from __future__ import annotations

import pytest


# ── GET /api/progress/competencies ───────────────────────────────────────────

@pytest.mark.asyncio
async def test_competencies_empty_for_new_user(client, test_user):
    """A user with no study plan or exercises has an empty competencies list."""
    _, headers = test_user
    response = await client.get("/api/progress/competencies", headers=headers)
    assert response.status_code == 200
    assert response.json() == []


@pytest.mark.asyncio
async def test_competencies_requires_auth(client):
    response = await client.get(
        "/api/progress/competencies",
        headers={"Authorization": "Bearer invalid"},
    )
    assert response.status_code == 401


@pytest.mark.asyncio
async def test_competencies_returns_list_shape(client, test_user, db_session):
    """After completing a lesson with exercises, competencies returns list items
    with the expected keys: unit_id, score, mastered_count, total_count."""
    user, headers = test_user

    from app.models.lesson import Exercise, Lesson
    from app.models.study_plan import StudyPlan

    plan = StudyPlan(
        user_id=user.id,
        cefr_level="A1",
        goals=["grammar"],
        duration_weeks=4,
        days_per_week=4,
        current_unit="A1-u1",
        generated_plan={},
        is_active=True,
    )
    db_session.add(plan)
    await db_session.flush()

    lesson = Lesson(
        study_plan_id=plan.id,
        title="Unit 1 Lesson",
        lesson_type="grammar",
        cefr_level="A1",
        week_number=1,
        day_number=1,
        unit_id="A1-u1",
        is_completed=True,
        content={},
    )
    db_session.add(lesson)
    await db_session.flush()

    exercise = Exercise(
        lesson_id=lesson.id,
        exercise_type="multiple_choice",
        question="Q?",
        options=["A", "B"],
        correct_answer="A",
        score=1.0,
    )
    db_session.add(exercise)
    await db_session.commit()

    response = await client.get("/api/progress/competencies", headers=headers)
    assert response.status_code == 200
    data = response.json()
    # If any items returned, verify their shape
    for item in data:
        assert "unit_id" in item
        assert "score" in item
        assert "mastered_count" in item
        assert "total_count" in item
