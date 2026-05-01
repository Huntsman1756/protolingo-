from unittest.mock import patch

import pytest
from app.services.llm_adapter import LLMTimeoutError, LLMUnavailableError


@pytest.mark.asyncio
async def test_start_assessment_returns_quiz(client, test_user):
    user, headers = test_user

    mock_quiz = {
        "questions": [
            {
                "id": 1,
                "type": "multiple_choice",
                "difficulty": "A1",
                "question": "What is the capital of France?",
                "options": ["A. London", "B. Paris", "C. Berlin", "D. Madrid"],
                "correct_answer": "B",
            },
            {
                "id": 2,
                "type": "multiple_choice",
                "difficulty": "A2",
                "question": "Which word is a verb?",
                "options": ["A. happy", "B. run", "C. blue", "D. house"],
                "correct_answer": "B",
            },
        ]
    }

    with patch(
        "app.routers.assessment.llm_adapter.structured_output",
        return_value=mock_quiz,
    ):
        response = await client.get("/api/assessment/start", headers=headers)
        assert response.status_code == 200
        data = response.json()
        assert "quiz" in data
        assert "session_id" in data
        assert len(data["quiz"]["questions"]) == 2


@pytest.mark.asyncio
async def test_start_assessment_requires_auth(client):
    response = await client.get(
        "/api/assessment/start", headers={"Authorization": "Bearer invalid"}
    )
    assert response.status_code == 401


@pytest.mark.asyncio
async def test_submit_assessment_returns_cefr_level(client, test_user):
    user, headers = test_user

    mock_quiz = {
        "questions": [
            {
                "id": 1,
                "type": "multiple_choice",
                "difficulty": "A1",
                "question": "What is the capital of France?",
                "options": ["A. London", "B. Paris", "C. Berlin", "D. Madrid"],
                "correct_answer": "B",
            },
        ]
    }

    mock_eval = {
        "cefr_level": "A2",
        "score": 0.65,
        "analysis": "Good basics, needs work on vocabulary.",
        "strengths": ["present tenses"],
        "weaknesses": ["prepositions"],
    }

    with patch(
        "app.routers.assessment.llm_adapter.structured_output",
        side_effect=[mock_quiz, mock_eval],
    ):
        start_resp = await client.get("/api/assessment/start", headers=headers)
        session_id = start_resp.json()["session_id"]

        submit_resp = await client.post(
            "/api/assessment/submit",
            headers=headers,
            json={
                "answers": [{"question_id": 1, "answer": "B"}],
            },
        )
        assert submit_resp.status_code == 200
        result = submit_resp.json()
        assert result["cefr_level"] == "A2"
        assert result["score"] == 0.65
        assert len(result["strengths"]) == 1
        assert len(result["weaknesses"]) == 1


@pytest.mark.asyncio
async def test_submit_without_active_session(client, test_user):
    user, headers = test_user

    response = await client.post(
        "/api/assessment/submit",
        headers=headers,
        json={"answers": [{"question_id": 1, "answer": "B"}]},
    )
    assert response.status_code == 404


@pytest.mark.asyncio
async def test_start_assessment_handles_llm_timeout(client, test_user):
    user, headers = test_user

    with patch(
        "app.routers.assessment.llm_adapter.structured_output",
        side_effect=LLMTimeoutError("timeout"),
    ):
        response = await client.get("/api/assessment/start", headers=headers)
        assert response.status_code == 504


@pytest.mark.asyncio
async def test_start_assessment_handles_llm_unavailable(client, test_user):
    user, headers = test_user

    with patch(
        "app.routers.assessment.llm_adapter.structured_output",
        side_effect=LLMUnavailableError("unreachable"),
    ):
        response = await client.get("/api/assessment/start", headers=headers)
        assert response.status_code == 503
