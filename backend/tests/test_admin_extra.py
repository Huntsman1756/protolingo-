"""Extra admin tests: GET /users/{id}/stats and GET /users/{id}/quota."""
from __future__ import annotations

import pytest


# ── GET /api/admin/users/{id}/stats ──────────────────────────────────────────

@pytest.mark.asyncio
async def test_admin_user_stats_zero_for_new_user(client, admin_user, test_user):
    """Stats endpoint returns all-zero values for a brand-new user."""
    _, admin_headers = admin_user
    user, _ = test_user

    response = await client.get(
        f"/api/admin/users/{user.id}/stats",
        headers=admin_headers,
    )
    assert response.status_code == 200
    data = response.json()
    assert data["user_id"] == user.id
    assert data["xp_total"] == 0
    assert data["lessons_completed"] == 0
    assert data["chat_messages_sent"] == 0
    assert data["tokens_total"] == 0
    assert data["current_cefr"] is None


@pytest.mark.asyncio
async def test_admin_user_stats_reflects_completed_lesson(client, admin_user, test_user, db_session):
    """After completing a lesson, lessons_completed increments to 1."""
    _, admin_headers = admin_user
    user, _ = test_user

    from app.models.lesson import Lesson
    from app.models.study_plan import StudyPlan

    plan = StudyPlan(
        user_id=user.id,
        cefr_level="B1",
        goals=["speaking"],
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
        title="Completed Lesson",
        lesson_type="grammar",
        cefr_level="B1",
        week_number=1,
        day_number=1,
        is_completed=True,
        content={},
    )
    db_session.add(lesson)
    await db_session.commit()

    response = await client.get(
        f"/api/admin/users/{user.id}/stats",
        headers=admin_headers,
    )
    assert response.status_code == 200
    data = response.json()
    assert data["lessons_completed"] == 1
    assert data["current_cefr"] == "B1"


@pytest.mark.asyncio
async def test_admin_user_stats_not_found(client, admin_user):
    """Stats endpoint returns 404 for a non-existent user ID."""
    _, admin_headers = admin_user
    response = await client.get("/api/admin/users/99999/stats", headers=admin_headers)
    assert response.status_code == 404


@pytest.mark.asyncio
async def test_admin_user_stats_requires_admin(client, test_user):
    """Regular users cannot access the stats endpoint."""
    user, headers = test_user
    response = await client.get(
        f"/api/admin/users/{user.id}/stats",
        headers=headers,
    )
    assert response.status_code == 403


# ── GET /api/admin/users/{id}/quota ──────────────────────────────────────────

@pytest.mark.asyncio
async def test_admin_user_quota_returns_fields(client, admin_user, test_user):
    """Quota endpoint returns the expected quota structure for the target user."""
    _, admin_headers = admin_user
    user, _ = test_user

    response = await client.get(
        f"/api/admin/users/{user.id}/quota",
        headers=admin_headers,
    )
    assert response.status_code == 200
    data = response.json()
    assert "sessions_this_week" in data
    assert "sessions_limit" in data
    assert "minutes_today" in data
    assert "minutes_limit" in data


@pytest.mark.asyncio
async def test_admin_user_quota_initial_zero(client, admin_user, test_user):
    """Fresh user has zero usage in all quota counters."""
    _, admin_headers = admin_user
    user, _ = test_user

    response = await client.get(
        f"/api/admin/users/{user.id}/quota",
        headers=admin_headers,
    )
    assert response.status_code == 200
    data = response.json()
    assert data["sessions_this_week"] == 0
    assert data["minutes_today"] == 0


@pytest.mark.asyncio
async def test_admin_user_quota_not_found(client, admin_user):
    """Quota endpoint returns 404 for a non-existent user ID."""
    _, admin_headers = admin_user
    response = await client.get("/api/admin/users/99999/quota", headers=admin_headers)
    assert response.status_code == 404


@pytest.mark.asyncio
async def test_admin_user_quota_requires_admin(client, test_user):
    """Regular users cannot access the quota admin endpoint."""
    user, headers = test_user
    response = await client.get(
        f"/api/admin/users/{user.id}/quota",
        headers=headers,
    )
    assert response.status_code == 403
