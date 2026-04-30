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
