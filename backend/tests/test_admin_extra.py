"""Extra admin tests: overview stats, user stats and quota."""

from __future__ import annotations

import pytest

# ── GET /api/admin/stats ─────────────────────────────────────────────────────


@pytest.mark.asyncio
async def test_admin_overview_stats_base_counts(client, admin_user, test_user):
    """Overview stats include base user counts for an admin request."""
    _, admin_headers = admin_user

    response = await client.get("/api/admin/stats", headers=admin_headers)
    assert response.status_code == 200
    data = response.json()
    assert data["users_total"] == 2
    assert data["users_active"] == 2
    assert data["users_inactive"] == 0
    assert data["subscriptions_active"] == 0
    assert data["subscriptions_trialing"] == 0
    assert data["subscriptions_past_due"] == 0
    assert data["feedback_total"] == 0
    assert data["feedback_pending"] == 0
    assert data["feedback_bug_pending"] == 0


@pytest.mark.asyncio
async def test_admin_overview_stats_counts_operational_signals(
    client, admin_user, test_user, db_session
):
    """Overview stats count subscriptions and feedback triage signals."""
    from datetime import datetime, timezone

    from app.core.security import hash_password
    from app.models.feedback import FeedbackEntry
    from app.models.user import User

    admin, admin_headers = admin_user
    user, _ = test_user

    user.subscription_status = "active"
    db_session.add(
        User(
            username="trial-stats-user",
            email="trial-stats-user@test.com",
            display_name="Trial Stats User",
            hashed_password=hash_password("pass1234"),
            role="user",
            native_language="es",
            is_active=True,
            subscription_status="trialing",
        )
    )
    db_session.add(
        User(
            username="past-due-stats-user",
            email="past-due-stats-user@test.com",
            display_name="Past Due Stats User",
            hashed_password=hash_password("pass1234"),
            role="user",
            native_language="es",
            is_active=False,
            subscription_status="past_due",
        )
    )
    now = datetime.now(timezone.utc).replace(tzinfo=None)
    db_session.add(
        FeedbackEntry(
            type="bug",
            title="Pending bug",
            description="Needs triage",
            status="pending",
            author_id=user.id,
            created_at=now,
        )
    )
    db_session.add(
        FeedbackEntry(
            type="feature",
            title="Pending feature",
            description="Needs planning",
            status="pending",
            author_id=admin.id,
            created_at=now,
        )
    )
    db_session.add(
        FeedbackEntry(
            type="bug",
            title="Done bug",
            description="Already fixed",
            status="done",
            author_id=user.id,
            created_at=now,
        )
    )
    await db_session.commit()

    response = await client.get("/api/admin/stats", headers=admin_headers)
    assert response.status_code == 200
    data = response.json()
    assert data["users_total"] == 4
    assert data["users_active"] == 3
    assert data["users_inactive"] == 1
    assert data["subscriptions_active"] == 1
    assert data["subscriptions_trialing"] == 1
    assert data["subscriptions_past_due"] == 1
    assert data["feedback_total"] == 3
    assert data["feedback_pending"] == 2
    assert data["feedback_bug_pending"] == 1


@pytest.mark.asyncio
async def test_admin_overview_stats_requires_admin(client, test_user):
    """Regular users cannot access overview stats."""
    _, headers = test_user
    response = await client.get("/api/admin/stats", headers=headers)
    assert response.status_code == 403


@pytest.mark.asyncio
async def test_admin_overview_stats_requires_auth(client):
    """Unauthenticated requests cannot access overview stats."""
    response = await client.get("/api/admin/stats")
    assert response.status_code == 401


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
async def test_admin_user_stats_reflects_completed_lesson(
    client, admin_user, test_user, db_session
):
    """After completing a lesson, lessons_completed increments to 1."""
    _, admin_headers = admin_user
    user, _ = test_user

    from app.models.lesson import Lesson
    from tests.conftest import make_study_plan

    plan = await make_study_plan(
        db_session,
        user_id=user.id,
        cefr_level="B1",
        goals=["speaking"],
        duration_weeks=4,
        days_per_week=4,
        current_unit="",
        generated_plan={},
        is_active=True,
    )

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
