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

    mock_plan = {
        "title": "English A2 Plan",
        "weekly_plan": [
            {
                "week": 1,
                "theme": "Present Tenses",
                "days": [
                    {
                        "day": 1,
                        "lesson_type": "grammar",
                        "title": "Simple Present",
                        "objectives": ["Understand simple present"],
                        "estimated_minutes": 25,
                    },
                ],
            }
        ],
    }

    with patch(
        "app.services.study_plan_generator.llm_adapter.structured_output",
        return_value=mock_plan,
    ):
        response = await client.post(
            "/api/study-plan/generate",
            headers=headers,
            json={
                "cefr_level": "A2",
                "goals": ["grammar", "vocabulary"],
                "weeks": 4,
                "minutes_per_day": 30,
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

    mock_plan = {
        "title": "Test Plan",
        "weekly_plan": [
            {
                "week": 1,
                "theme": "Basics",
                "days": [
                    {
                        "day": 1,
                        "lesson_type": "vocabulary",
                        "title": "Greetings",
                        "objectives": ["Learn greetings"],
                        "estimated_minutes": 20,
                    },
                ],
            }
        ],
    }

    with patch(
        "app.services.study_plan_generator.llm_adapter.structured_output",
        return_value=mock_plan,
    ):
        await client.post(
            "/api/study-plan/generate",
            headers=headers,
            json={
                "cefr_level": "A1",
                "goals": ["vocabulary"],
                "weeks": 2,
                "minutes_per_day": 20,
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

    mock_plan = {
        "title": "Test Plan",
        "weekly_plan": [
            {
                "week": 1,
                "theme": "Basics",
                "days": [
                    {
                        "day": 1,
                        "lesson_type": "vocabulary",
                        "title": "Greetings",
                        "objectives": ["Learn greetings"],
                        "estimated_minutes": 20,
                    },
                    {
                        "day": 2,
                        "lesson_type": "grammar",
                        "title": "Verb to be",
                        "objectives": ["Understand verb to be"],
                        "estimated_minutes": 25,
                    },
                ],
            }
        ],
    }

    with patch(
        "app.services.study_plan_generator.llm_adapter.structured_output",
        return_value=mock_plan,
    ):
        await client.post(
            "/api/study-plan/generate",
            headers=headers,
            json={
                "cefr_level": "A1",
                "goals": ["vocabulary"],
                "weeks": 4,
                "minutes_per_day": 20,
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
async def test_generate_handles_llm_timeout(client, test_user):
    user, headers = test_user

    from app.services.llm_adapter import LLMTimeoutError

    with patch(
        "app.services.study_plan_generator.llm_adapter.structured_output",
        side_effect=LLMTimeoutError("timeout"),
    ):
        response = await client.post(
            "/api/study-plan/generate",
            headers=headers,
            json={
                "cefr_level": "A1",
                "goals": ["grammar"],
                "weeks": 4,
                "minutes_per_day": 30,
            },
        )
        assert response.status_code == 504
