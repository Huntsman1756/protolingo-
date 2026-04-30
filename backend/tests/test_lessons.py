from unittest.mock import patch

import pytest


@pytest.fixture
def sample_lesson(db_session):
    async def _create(db):
        from app.models.lesson import Exercise, Lesson

        lesson = Lesson(
            study_plan_id=1,
            title="Test Lesson",
            lesson_type="grammar",
            cefr_level="A2",
            week_number=1,
            day_number=1,
            content={
                "explanation": {"text": "Some grammar"},
                "exercises": [{"type": "multiple_choice", "question": "Test Q"}],
            },
        )
        db.add(lesson)
        await db.flush()

        exercise = Exercise(
            lesson_id=lesson.id,
            exercise_type="multiple_choice",
            question="What is the answer?",
            options=["A", "B", "C", "D"],
            correct_answer="B",
        )
        db.add(exercise)
        await db.flush()

        await db.commit()
        return lesson, exercise

    return _create


@pytest.mark.asyncio
async def test_get_lesson_not_found(client, test_user):
    user, headers = test_user
    response = await client.get("/api/lessons/999", headers=headers)
    assert response.status_code == 404


@pytest.mark.asyncio
async def test_get_lesson_with_exercises(client, test_user, db_session):
    user, headers = test_user

    from app.models.lesson import Exercise, Lesson

    lesson = Lesson(
        study_plan_id=1,
        title="Test Lesson",
        lesson_type="grammar",
        cefr_level="A2",
        week_number=1,
        day_number=1,
        content={},
    )
    db_session.add(lesson)
    await db_session.flush()

    exercise = Exercise(
        lesson_id=lesson.id,
        exercise_type="multiple_choice",
        question="What is the answer?",
        options=["A", "B", "C", "D"],
        correct_answer="B",
    )
    db_session.add(exercise)
    await db_session.commit()

    response = await client.get(f"/api/lessons/{lesson.id}", headers=headers)
    assert response.status_code == 200
    data = response.json()
    assert data["lesson"]["title"] == "Test Lesson"
    assert len(data["exercises"]) == 1


@pytest.mark.asyncio
async def test_complete_lesson(client, test_user, db_session):
    user, headers = test_user

    from app.models.lesson import Lesson

    lesson = Lesson(
        study_plan_id=1,
        title="Test Lesson",
        lesson_type="grammar",
        cefr_level="A2",
        week_number=1,
        day_number=1,
        content={},
    )
    db_session.add(lesson)
    await db_session.commit()

    response = await client.post(f"/api/lessons/{lesson.id}/complete", headers=headers)
    assert response.status_code == 200
    assert response.json()["is_completed"] is True


@pytest.mark.asyncio
async def test_answer_exercise_multiple_choice_correct(client, test_user, db_session):
    user, headers = test_user

    from app.models.lesson import Exercise, Lesson

    lesson = Lesson(
        study_plan_id=1,
        title="Test",
        lesson_type="grammar",
        cefr_level="A2",
        week_number=1,
        day_number=1,
        content={},
    )
    db_session.add(lesson)
    await db_session.flush()

    exercise = Exercise(
        lesson_id=lesson.id,
        exercise_type="multiple_choice",
        question="What?",
        options=["A", "B"],
        correct_answer="B",
    )
    db_session.add(exercise)
    await db_session.commit()

    response = await client.post(
        f"/api/lessons/exercises/{exercise.id}/answer",
        headers=headers,
        json={"answer": "B"},
    )
    assert response.status_code == 200
    data = response.json()
    assert data["score"] == 1.0


@pytest.mark.asyncio
async def test_answer_exercise_multiple_choice_wrong(client, test_user, db_session):
    user, headers = test_user

    from app.models.lesson import Exercise, Lesson

    lesson = Lesson(
        study_plan_id=1,
        title="Test",
        lesson_type="grammar",
        cefr_level="A2",
        week_number=1,
        day_number=1,
        content={},
    )
    db_session.add(lesson)
    await db_session.flush()

    exercise = Exercise(
        lesson_id=lesson.id,
        exercise_type="multiple_choice",
        question="What?",
        options=["A", "B"],
        correct_answer="B",
    )
    db_session.add(exercise)
    await db_session.commit()

    response = await client.post(
        f"/api/lessons/exercises/{exercise.id}/answer",
        headers=headers,
        json={"answer": "A"},
    )
    assert response.status_code == 200
    data = response.json()
    assert data["score"] == 0.0
    assert "A" not in data.get("feedback", "").lower()
