"""Unit tests for listening service functions (DB-interacting layer)."""

from __future__ import annotations

import pytest
import pytest_asyncio

from sqlalchemy import select

from app.models.listening import ListeningAttempt, ListeningExercise
from app.models.study_plan import StudyPlan
from app.models.user_language import UserLanguage

_QUESTIONS = [
    {
        "index": i,
        "question": f"Q{i}?",
        "options": {"A": "a", "B": "b", "C": "c", "D": "d"},
        "correct": "B",
    }
    for i in range(5)
]


@pytest_asyncio.fixture
async def exercise(db_session, test_user):
    user, _headers = test_user
    ex = ListeningExercise(
        level="A1",
        target_language="en-US",
        exercise_type="monologue",
        topic="Greetings",
        text="Hello and welcome.",
        audio_path="/tmp/test.mp3",
        questions=_QUESTIONS,
    )
    db_session.add(ex)
    await db_session.commit()
    await db_session.refresh(ex)
    return ex, user.id


@pytest_asyncio.fixture
async def study_plan(db_session, exercise):
    """Create a study plan for the test user so submit_attempt has a study_plan_id."""
    _ex, user_id = exercise
    ul_result = await db_session.execute(
        select(UserLanguage).where(
            UserLanguage.user_id == user_id,
            UserLanguage.target_language == "en-US",
        )
    )
    ul = ul_result.scalar_one()
    plan = StudyPlan(
        user_id=user_id,
        user_language_id=ul.id,
        cefr_level="A1",
        target_language="en-US",
        goals=["listening"],
        duration_weeks=4,
        days_per_week=4,
        current_unit="",
        generated_plan={},
        is_active=True,
    )
    db_session.add(plan)
    await db_session.commit()
    await db_session.refresh(plan)
    return plan


class TestGetAvailableExercise:
    @pytest.mark.asyncio
    async def test_returns_none_when_no_exercises(self, db_session, test_user):
        from app.services.listening_service import get_available_exercise

        user, _headers = test_user
        result = await get_available_exercise("A1", "en-US", user.id, db_session)
        assert result is None

    @pytest.mark.asyncio
    async def test_returns_uncompleted_exercise(self, db_session, exercise):
        from app.services.listening_service import get_available_exercise

        ex, user_id = exercise
        result = await get_available_exercise("A1", "en-US", user_id, db_session)
        assert result is not None
        assert result.id == ex.id

    @pytest.mark.asyncio
    async def test_skips_completed_exercise(self, db_session, exercise, study_plan):
        from app.services.listening_service import get_available_exercise

        ex, user_id = exercise
        attempt = ListeningAttempt(
            user_id=user_id,
            exercise_id=ex.id,
            study_plan_id=study_plan.id,
            answers={"0": "B"},
            score=1,
            xp_earned=10,
        )
        db_session.add(attempt)
        await db_session.commit()

        result = await get_available_exercise("A1", "en-US", user_id, db_session)
        assert result is None


class TestSubmitAttempt:
    @pytest.mark.asyncio
    async def test_submit_scores_correctly(self, db_session, exercise, study_plan):
        from app.services.listening_service import submit_attempt

        ex, user_id = exercise
        attempt, returned_ex = await submit_attempt(
            exercise_id=ex.id,
            user_id=user_id,
            answers={"0": "B", "1": "B", "2": "B", "3": "B", "4": "B"},
            db=db_session,
            is_replay=False,
            study_plan_id=study_plan.id,
        )

        assert attempt.score == 5
        assert attempt.xp_earned == 50
        assert returned_ex.play_count == 1

    @pytest.mark.asyncio
    async def test_submit_partial_score(self, db_session, exercise, study_plan):
        from app.services.listening_service import submit_attempt

        ex, user_id = exercise
        attempt, _ = await submit_attempt(
            exercise_id=ex.id,
            user_id=user_id,
            answers={"0": "B", "1": "B", "2": "A", "3": "A", "4": "A"},
            db=db_session,
            is_replay=False,
            study_plan_id=study_plan.id,
        )

        assert attempt.score == 2
        assert attempt.xp_earned == 20

    @pytest.mark.asyncio
    async def test_duplicate_attempt_raises(self, db_session, exercise, study_plan):
        from app.services.listening_service import submit_attempt

        ex, user_id = exercise
        await submit_attempt(
            exercise_id=ex.id,
            user_id=user_id,
            answers={"0": "B", "1": "B", "2": "B", "3": "B", "4": "B"},
            db=db_session,
            is_replay=False,
            study_plan_id=study_plan.id,
        )

        with pytest.raises(ValueError, match="already_attempted"):
            await submit_attempt(
                exercise_id=ex.id,
                user_id=user_id,
                answers={"0": "B", "1": "B", "2": "B", "3": "B", "4": "B"},
                db=db_session,
                is_replay=False,
                study_plan_id=study_plan.id,
            )

    @pytest.mark.asyncio
    async def test_replay_awards_no_xp(self, db_session, exercise, study_plan):
        from app.services.listening_service import submit_attempt

        ex, user_id = exercise
        attempt, _ = await submit_attempt(
            exercise_id=ex.id,
            user_id=user_id,
            answers={"0": "B", "1": "B", "2": "B", "3": "B", "4": "B"},
            db=db_session,
            is_replay=True,
            study_plan_id=study_plan.id,
        )

        assert attempt.xp_earned == 0
        assert attempt.score == 5

    @pytest.mark.asyncio
    async def test_exercise_not_found_raises(self, db_session, test_user):
        from app.services.listening_service import submit_attempt

        user, _headers = test_user
        with pytest.raises(ValueError, match="exercise_not_found"):
            await submit_attempt(
                exercise_id=9999,
                user_id=user.id,
                answers={"0": "B"},
                db=db_session,
            )


class TestGetUserHistory:
    @pytest.mark.asyncio
    async def test_history_empty(self, db_session, test_user):
        from app.services.listening_service import get_user_history

        user, _headers = test_user
        rows, total = await get_user_history(user.id, db_session)
        assert rows == []
        assert total == 0

    @pytest.mark.asyncio
    async def test_history_returns_attempts(self, db_session, exercise, study_plan):
        from app.services.listening_service import submit_attempt, get_user_history

        ex, user_id = exercise
        await submit_attempt(
            exercise_id=ex.id,
            user_id=user_id,
            answers={"0": "B", "1": "B", "2": "B", "3": "B", "4": "B"},
            db=db_session,
            study_plan_id=study_plan.id,
        )

        rows, total = await get_user_history(user_id, db_session)
        assert total == 1
        assert len(rows) == 1
        attempt, _ = rows[0]
        assert attempt.score == 5

    @pytest.mark.asyncio
    async def test_history_respects_limit(self, db_session, exercise, study_plan):
        from app.services.listening_service import get_user_history, submit_attempt

        ex, user_id = exercise
        await submit_attempt(
            exercise_id=ex.id,
            user_id=user_id,
            answers={"0": "B", "1": "B", "2": "B", "3": "B", "4": "B"},
            db=db_session,
            study_plan_id=study_plan.id,
        )

        rows, total = await get_user_history(user_id, db_session, limit=0)
        assert total == 1
        assert len(rows) == 0

    @pytest.mark.asyncio
    async def test_history_filters_by_language(self, db_session, exercise, study_plan):
        from app.services.listening_service import get_user_history, submit_attempt

        ex, user_id = exercise
        await submit_attempt(
            exercise_id=ex.id,
            user_id=user_id,
            answers={"0": "B", "1": "B", "2": "B", "3": "B", "4": "B"},
            db=db_session,
            study_plan_id=study_plan.id,
        )

        rows_en, total_en = await get_user_history(user_id, db_session, target_language="en-US")
        assert total_en == 1

        rows_es, total_es = await get_user_history(user_id, db_session, target_language="es-ES")
        assert total_es == 0
