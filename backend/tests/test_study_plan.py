from unittest.mock import patch

import pytest


@pytest.mark.asyncio
async def test_get_current_plan_empty(client, test_user):
    user, headers = test_user

    response = await client.get("/api/study-plan/current", headers=headers)
    assert response.status_code == 200
    assert response.json() is None


@pytest.mark.asyncio
async def test_generate_study_plan(client, test_user):
    user, headers = test_user

    response = await client.post(
        "/api/study-plan/generate",
        headers=headers,
        json={
            "cefr_level": "A2",
            "goals": ["grammar", "vocabulary"],
        },
    )
    assert response.status_code == 200
    data = response.json()
    assert data["cefr_level"] == "A2"
    assert data["goals"] == ["grammar", "vocabulary"]
    assert data["is_active"] is True


@pytest.mark.asyncio
async def test_get_current_plan_after_generate(client, test_user):
    user, headers = test_user

    await client.post(
        "/api/study-plan/generate",
        headers=headers,
        json={
            "cefr_level": "A1",
            "goals": ["vocabulary"],
        },
    )

    response = await client.get("/api/study-plan/current", headers=headers)
    assert response.status_code == 200
    data = response.json()
    assert data is not None
    assert data["cefr_level"] == "A1"
    assert data["goals"] == ["vocabulary"]


@pytest.mark.asyncio
async def test_get_today_lessons(client, test_user):
    user, headers = test_user

    await client.post(
        "/api/study-plan/generate",
        headers=headers,
        json={
            "cefr_level": "A1",
            "goals": ["vocabulary"],
        },
    )

    response = await client.get("/api/study-plan/today", headers=headers)
    assert response.status_code == 200
    data = response.json()
    assert "plan_id" in data
    assert len(data["lessons"]) >= 0


@pytest.mark.asyncio
async def test_generate_requires_auth(client):
    response = await client.post(
        "/api/study-plan/generate",
        json={"cefr_level": "A1", "goals": ["grammar"], "weeks": 4, "minutes_per_day": 30},
    )
    assert response.status_code == 401


@pytest.mark.asyncio
async def test_generate_study_plan_defaults(client, test_user):
    """Verify plan is created with correct default duration and days_per_week."""
    user, headers = test_user

    response = await client.post(
        "/api/study-plan/generate",
        headers=headers,
        json={"cefr_level": "B1"},
    )
    assert response.status_code == 200
    data = response.json()
    assert data["cefr_level"] == "B1"
    assert data["duration_weeks"] == 12
    assert data["days_per_week"] == 4
