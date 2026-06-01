from datetime import date, timedelta

import pytest

from app.services.flashcard_sm2 import sm2_update


class MockCard:
    def __init__(self, ease_factor=2.5, interval=0, repetitions=0):
        self.ease_factor = ease_factor
        self.interval = interval
        self.repetitions = repetitions
        self.next_review = date.today()


def test_sm2_quality_0_resets():
    card = MockCard(ease_factor=2.5, interval=10, repetitions=3)
    card = sm2_update(card, 0)
    assert card.repetitions == 0
    assert card.interval == 1


def test_sm2_quality_3_first_correct():
    card = MockCard()
    card = sm2_update(card, 3)
    assert card.repetitions == 1
    assert card.interval == 1


def test_sm2_quality_3_second_correct():
    card = MockCard(repetitions=1, interval=1)
    card = sm2_update(card, 3)
    assert card.repetitions == 2
    assert card.interval == 6


def test_sm2_quality_3_progression():
    card = MockCard(ease_factor=2.5, interval=6, repetitions=2)
    card = sm2_update(card, 3)
    assert card.repetitions == 3
    assert card.interval == 15


def test_sm2_ease_factor_decreases_on_fail():
    card = MockCard(ease_factor=2.5)
    card = sm2_update(card, 2)
    assert card.ease_factor < 2.5


def test_sm2_ease_factor_increases_on_perfect():
    card = MockCard(ease_factor=2.5)
    card = sm2_update(card, 5)
    assert card.ease_factor > 2.5


def test_sm2_ease_factor_floor():
    card = MockCard(ease_factor=1.3)
    card = sm2_update(card, 1)
    assert card.ease_factor == 1.3


def test_sm2_next_review_is_future():
    card = MockCard(interval=3)
    card = sm2_update(card, 4)
    assert card.next_review == date.today() + timedelta(days=card.interval)


@pytest.mark.asyncio
async def test_create_flashcard(client, test_user):
    user, headers = test_user

    response = await client.post(
        "/api/flashcards",
        headers=headers,
        json={
            "word": "hello",
            "definition": "a greeting",
            "example_sentence": "Hello, how are you?",
            "translation": "hola",
        },
    )
    assert response.status_code == 200
    data = response.json()
    assert data["word"] == "hello"
    assert data["ease_factor"] == 2.5
    assert data["interval"] == 0


@pytest.mark.asyncio
async def test_get_due_flashcards(client, test_user, db_session):
    user, headers = test_user

    from app.models.flashcard import Flashcard

    card = Flashcard(
        user_id=user.id,
        word="test",
        definition="a test",
        example_sentence="This is a test.",
        translation="prueba",
    )
    db_session.add(card)
    await db_session.commit()

    response = await client.get("/api/flashcards/due", headers=headers)
    assert response.status_code == 200
    data = response.json()
    assert len(data["due"]) == 1
    assert data["total"] == 1


@pytest.mark.asyncio
async def test_review_flashcard(client, test_user, db_session):
    user, headers = test_user

    from app.models.flashcard import Flashcard

    card = Flashcard(
        user_id=user.id,
        word="test",
        definition="a test",
        example_sentence="Test.",
        translation="prueba",
    )
    db_session.add(card)
    await db_session.commit()

    response = await client.post(
        f"/api/flashcards/{card.id}/review",
        headers=headers,
        json={"quality": 4},
    )
    assert response.status_code == 200
    data = response.json()
    assert data["repetitions"] == 1
    assert data["interval"] == 1


@pytest.mark.asyncio
async def test_get_vocabulary_flashcards(client, test_user, db_session):
    user, headers = test_user

    from app.models.flashcard import Flashcard

    # from_text card
    card_vocab = Flashcard(
        user_id=user.id,
        word="ephemeral",
        definition="lasting a very short time",
        example_sentence="The joy was ephemeral.",
        translation="efímero",
        source="from_text",
    )
    # regular card (should not appear in vocabulary endpoint)
    card_regular = Flashcard(
        user_id=user.id,
        word="run",
        definition="to move fast",
        example_sentence="I run every day.",
        translation="correr",
    )
    db_session.add(card_vocab)
    db_session.add(card_regular)
    await db_session.commit()

    response = await client.get("/api/flashcards/vocabulary", headers=headers)
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1
    assert data[0]["word"] == "ephemeral"
    assert data[0]["source"] == "from_text"


@pytest.mark.asyncio
async def test_delete_flashcard(client, test_user, db_session):
    user, headers = test_user

    from app.models.flashcard import Flashcard

    card = Flashcard(
        user_id=user.id,
        word="obsolete",
        definition="no longer in use",
        example_sentence="This word is obsolete.",
        translation="obsoleto",
        source="from_text",
    )
    db_session.add(card)
    await db_session.commit()

    response = await client.delete(f"/api/flashcards/{card.id}", headers=headers)
    assert response.status_code == 204

    # Confirm deletion
    response = await client.get("/api/flashcards/vocabulary", headers=headers)
    assert response.status_code == 200
    assert response.json() == []


@pytest.mark.asyncio
async def test_delete_flashcard_not_found(client, test_user):
    _, headers = test_user
    response = await client.delete("/api/flashcards/99999", headers=headers)
    assert response.status_code == 404


@pytest.mark.asyncio
async def test_delete_flashcard_other_user(client, test_user, db_session):
    user, headers = test_user

    from app.core.security import hash_password
    from app.models.flashcard import Flashcard
    from app.models.user import User

    other_user = User(
        username="other",
        email="other@example.com",
        display_name="Other",
        hashed_password=hash_password("pass"),
        role="user",
        native_language="es",
        is_active=True,
    )
    db_session.add(other_user)
    await db_session.commit()
    await db_session.refresh(other_user)

    card = Flashcard(
        user_id=other_user.id,
        word="word",
        definition="def",
        example_sentence="example",
        translation="traducción",
    )
    db_session.add(card)
    await db_session.commit()

    response = await client.delete(f"/api/flashcards/{card.id}", headers=headers)
    assert response.status_code == 404


@pytest.mark.asyncio
async def test_create_flashcard_from_word(client, test_user, monkeypatch):
    _, headers = test_user

    from app.schemas.flashcards import FlashcardCreate

    async def mock_lookup_word(**kwargs):  # noqa: ANN002
        return FlashcardCreate(
            word=kwargs["word"],
            definition="lasting a very short time",
            example_sentence="The fame was fleeting.",
            translation="efímero",
        )

    import app.routers.flashcards as fc_router
    monkeypatch.setattr(fc_router, "lookup_word", mock_lookup_word)

    response = await client.post(
        "/api/flashcards/from-word",
        headers=headers,
        json={"word": "fleeting", "context": "The fame was fleeting.", "cefr_level": "B2"},
    )
    assert response.status_code == 200
    data = response.json()
    assert data["word"] == "fleeting"
    assert data["source"] == "from_text"
    assert data["definition"] == "lasting a very short time"

