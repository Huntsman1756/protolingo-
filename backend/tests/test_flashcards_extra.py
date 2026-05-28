"""Extra flashcard tests: GET /all and POST /generate (LLM bulk generation)."""

from __future__ import annotations

from unittest.mock import AsyncMock, patch

import pytest

from app.schemas.flashcards import FlashcardGenerateResponse, GeneratedFlashcard

# ── GET /api/flashcards/all ───────────────────────────────────────────────────


@pytest.mark.asyncio
async def test_get_all_flashcards_empty(client, test_user):
    """New user has no flashcards."""
    _, headers = test_user
    response = await client.get("/api/flashcards/all", headers=headers)
    assert response.status_code == 200
    assert response.json() == []


@pytest.mark.asyncio
async def test_get_all_flashcards_returns_non_due_cards(client, test_user, db_session):
    """GET /all returns cards even if they are not yet due for review."""
    user, headers = test_user

    from datetime import date, timedelta

    from app.models.flashcard import Flashcard

    # Card with a future review date (not "due" yet)
    future_card = Flashcard(
        user_id=user.id,
        word="serendipity",
        definition="finding something nice while not looking for it",
        example_sentence="It was serendipity that we met.",
        translation="serendipia",
        next_review=date.today() + timedelta(days=10),
        interval=10,
        repetitions=2,
    )
    db_session.add(future_card)
    await db_session.commit()

    response = await client.get("/api/flashcards/all", headers=headers)
    assert response.status_code == 200
    words = [c["word"] for c in response.json()]
    assert "serendipity" in words


@pytest.mark.asyncio
async def test_get_all_excludes_other_users_cards(client, test_user, db_session):
    """GET /all only returns the current user's own flashcards."""
    user, headers = test_user

    from app.core.security import hash_password
    from app.models.flashcard import Flashcard
    from app.models.user import User

    # Create a second user with their own card
    other = User(
        username="other2",
        email="other2@example.com",
        display_name="Other 2",
        hashed_password=hash_password("pass"),
        role="user",
        native_language="es",
        is_active=True,
    )
    db_session.add(other)
    await db_session.flush()

    db_session.add(
        Flashcard(
            user_id=other.id,
            word="foreignword",
            definition="def",
            example_sentence="ex.",
            translation="t",
        )
    )
    await db_session.commit()

    response = await client.get("/api/flashcards/all", headers=headers)
    assert response.status_code == 200
    words = [c["word"] for c in response.json()]
    assert "foreignword" not in words


@pytest.mark.asyncio
async def test_get_all_requires_auth(client):
    response = await client.get(
        "/api/flashcards/all",
        headers={"Authorization": "Bearer invalid"},
    )
    assert response.status_code == 401


# ── POST /api/flashcards/generate ────────────────────────────────────────────

_FAKE_GENERATED = FlashcardGenerateResponse(
    flashcards=[
        GeneratedFlashcard(
            word="ubiquitous",
            definition="present, appearing, or found everywhere",
            example_sentence="Mobile phones are ubiquitous nowadays.",
            translation="ubicuo",
        ),
        GeneratedFlashcard(
            word="ephemeral",
            definition="lasting for a very short time",
            example_sentence="Social media trends are ephemeral.",
            translation="efímero",
        ),
    ]
)


@pytest.mark.asyncio
async def test_generate_flashcards_success(client, test_user, db_session):
    """POST /generate calls the LLM and persists the returned cards."""
    user, headers = test_user

    with patch(
        "app.routers.flashcards.generate_flashcards",
        new_callable=AsyncMock,
        return_value=_FAKE_GENERATED,
    ):
        response = await client.post(
            "/api/flashcards/generate",
            headers=headers,
            json={"topic": "technology", "count": 2, "cefr_level": "B2", "native_language": "es"},
        )

    assert response.status_code == 200
    data = response.json()
    assert len(data["flashcards"]) == 2
    words = [c["word"] for c in data["flashcards"]]
    assert "ubiquitous" in words

    # Verify cards were persisted
    from sqlalchemy import select

    from app.models.flashcard import Flashcard

    result = await db_session.execute(select(Flashcard).where(Flashcard.user_id == user.id))
    saved = result.scalars().all()
    assert len(saved) == 2


@pytest.mark.asyncio
async def test_generate_flashcards_llm_timeout(client, test_user):
    """POST /generate returns 504 when the LLM times out."""
    _, headers = test_user

    from app.services.llm_adapter import LLMTimeoutError

    with patch(
        "app.routers.flashcards.generate_flashcards",
        new_callable=AsyncMock,
        side_effect=LLMTimeoutError("timeout"),
    ):
        response = await client.post(
            "/api/flashcards/generate",
            headers=headers,
            json={"topic": "animals", "count": 3, "cefr_level": "A2", "native_language": "es"},
        )

    assert response.status_code == 504


@pytest.mark.asyncio
async def test_generate_flashcards_llm_unavailable(client, test_user):
    """POST /generate returns 503 when the LLM service is unavailable."""
    _, headers = test_user

    from app.services.llm_adapter import LLMUnavailableError

    with patch(
        "app.routers.flashcards.generate_flashcards",
        new_callable=AsyncMock,
        side_effect=LLMUnavailableError("down"),
    ):
        response = await client.post(
            "/api/flashcards/generate",
            headers=headers,
            json={"topic": "sports", "count": 3, "cefr_level": "B1", "native_language": "es"},
        )

    assert response.status_code == 503


@pytest.mark.asyncio
async def test_generate_flashcards_requires_auth(client):
    response = await client.post(
        "/api/flashcards/generate",
        headers={"Authorization": "Bearer invalid"},
        json={"topic": "food", "count": 2, "cefr_level": "A1", "native_language": "es"},
    )
    assert response.status_code == 401
