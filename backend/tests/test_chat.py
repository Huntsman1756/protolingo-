from unittest.mock import AsyncMock, patch

import pytest


@pytest.mark.asyncio
async def test_chat_returns_sse_stream(client, test_user, db_session):
    user, headers = test_user

    from app.models.study_plan import StudyPlan

    plan = StudyPlan(
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
    db_session.add(plan)
    await db_session.commit()

    class FakeChunk:
        class Choice:
            class Delta:
                content = "Hello"

            delta = Delta()

        choices = [Choice()]

    async def fake_stream():
        yield FakeChunk()

    with patch(
        "app.routers.chat.llm_adapter.chat",
        new_callable=AsyncMock,
        return_value=fake_stream(),
    ):
        response = await client.post(
            "/api/chat",
            headers=headers,
            json={"message": "Hi"},
        )
        assert response.status_code == 200
        body = response.text
        assert "token" in body or "Hello" in body


@pytest.mark.asyncio
async def test_chat_requires_auth(client):
    response = await client.post(
        "/api/chat",
        headers={"Authorization": "Bearer invalid"},
        json={"message": "Hi"},
    )
    assert response.status_code == 401


@pytest.mark.asyncio
async def test_chat_history_empty(client, test_user_with_plan):
    user, headers = test_user_with_plan

    response = await client.get("/api/chat/history", headers=headers)
    assert response.status_code == 200
    data = response.json()
    assert data["messages"] == []
