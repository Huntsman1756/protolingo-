"""Tests for POST /api/lessons/{id}/start."""
from __future__ import annotations

import pytest


async def _create_lesson_with_plan(db_session, user_id: int):
    """Helper: create a StudyPlan + Lesson owned by the given user."""
    from app.models.lesson import Lesson
    from app.models.study_plan import StudyPlan

    plan = StudyPlan(
        user_id=user_id,
        cefr_level="A2",
        goals=["grammar"],
        duration_weeks=4,
        days_per_week=4,
        current_unit="",
        generated_plan={},
        is_active=True,
    )
    db_session.add(plan)
    await db_session.flush()

    lesson = Lesson(
        study_plan_id=plan.id,
        title="Start Me",
        lesson_type="vocabulary",
        cefr_level="A2",
        week_number=1,
        day_number=1,
        content={},
    )
    db_session.add(lesson)
    await db_session.commit()
    await db_session.refresh(lesson)
    return lesson


# ── POST /api/lessons/{id}/start ─────────────────────────────────────────────

@pytest.mark.asyncio
async def test_start_lesson_success(client, test_user, db_session):
    """POST /start returns 200 with the lesson data."""
    user, headers = test_user
    lesson = await _create_lesson_with_plan(db_session, user.id)

    response = await client.post(
        f"/api/lessons/{lesson.id}/start",
        headers=headers,
    )
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == lesson.id
    assert data["title"] == "Start Me"


@pytest.mark.asyncio
async def test_start_lesson_not_found(client, test_user):
    """POST /start on a non-existent lesson returns 404."""
    _, headers = test_user
    response = await client.post("/api/lessons/99999/start", headers=headers)
    assert response.status_code == 404


@pytest.mark.asyncio
async def test_start_lesson_requires_auth(client):
    """POST /start without a valid token returns 401."""
    response = await client.post(
        "/api/lessons/1/start",
        headers={"Authorization": "Bearer invalid"},
    )
    assert response.status_code == 401


@pytest.mark.asyncio
async def test_start_lesson_other_user_forbidden(client, test_user, db_session):
    """A user cannot start a lesson that belongs to a different user's plan."""
    from app.core.security import create_access_token, hash_password
    from app.models.user import User

    # Create the lesson owner
    owner = User(
        username="lessonowner",
        email="lessonowner@example.com",
        display_name="Lesson Owner",
        hashed_password=hash_password("ownerpass"),
        role="user",
        native_language="es",
        is_active=True,
    )
    db_session.add(owner)
    await db_session.commit()
    await db_session.refresh(owner)

    lesson = await _create_lesson_with_plan(db_session, owner.id)

    # Try to start it as a different user
    _, headers_other = test_user
    response = await client.post(
        f"/api/lessons/{lesson.id}/start",
        headers=headers_other,
    )
    assert response.status_code == 404
