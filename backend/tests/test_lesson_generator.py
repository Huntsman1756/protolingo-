"""Unit tests for lesson generator service helpers and LLM-backed functions."""

from __future__ import annotations

from unittest.mock import AsyncMock, patch

import pytest

from app.schemas.lessons import (
    ExerciseContent,
    FillBlankEvaluation,
    FreeWriteEvaluation,
    LessonContent,
    PronunciationEvaluation,
)


class TestGetValidGrammarSlugs:
    def test_english_returns_non_empty_set(self):
        from app.services.lesson_generator import get_valid_grammar_slugs

        slugs = get_valid_grammar_slugs("en-GB")
        assert isinstance(slugs, set)
        assert len(slugs) > 0

    def test_spanish_returns_non_empty_set(self):
        from app.services.lesson_generator import get_valid_grammar_slugs

        slugs = get_valid_grammar_slugs("es-ES")
        assert isinstance(slugs, set)
        assert len(slugs) > 0

    def test_french_returns_non_empty_set(self):
        from app.services.lesson_generator import get_valid_grammar_slugs

        slugs = get_valid_grammar_slugs("fr")
        assert isinstance(slugs, set)
        assert len(slugs) > 0


class TestGenerateLesson:
    @pytest.mark.asyncio
    async def test_generates_lesson_with_mocked_llm(self):
        from app.services.lesson_generator import generate_lesson

        mock_lesson = LessonContent(
            lesson_type="grammar",
            title="Present Simple",
            cefr_level="A1",
            unit_id="a1_unit_1",
            explanation={
                "text": "The present simple is used for habits.",
                "key_points": ["It describes routines.", "It uses base form."],
                "examples": [{"sentence": "I walk every day.", "note": "Habitual action"}],
            },
            exercises=[
                ExerciseContent(
                    type="multiple_choice",
                    question="She ___ to school.",
                    options=["go", "goes", "going", "went"],
                    correct="goes",
                    explanation="Third person singular uses -es.",
                ),
                ExerciseContent(
                    type="fill_blank",
                    question="I ___ to the park every Sunday.",
                    options=None,
                    correct="go",
                    explanation="Use base form after 'I'.",
                ),
            ],
            vocabulary=[{"word": "walk", "definition": "caminar", "example": "I walk to school."}],
            grammar_refs=["present-simple"],
        )

        with patch(
            "app.services.lesson_generator.llm_adapter.structured_output",
            AsyncMock(return_value=mock_lesson),
        ):
            result = await generate_lesson(
                cefr_level="A1",
                lesson_type="grammar",
                topic="Present Simple",
                week=1,
                day=1,
                unit_id="a1_unit_1",
                grammar_points=["present-simple"],
                target_language="en-GB",
            )

        assert result.lesson_type == "grammar"
        assert result.title == "Present Simple"
        assert len(result.exercises) == 2
        assert result.grammar_refs == ["present-simple"]

    @pytest.mark.asyncio
    async def test_sanitizes_fill_blank_when_question_missing_blank(self):
        from app.services.lesson_generator import generate_lesson

        mock_lesson = LessonContent(
            lesson_type="grammar",
            title="Fill Blank",
            cefr_level="A1",
            unit_id="a1_unit_1",
            explanation={"text": "test", "key_points": ["test"], "examples": []},
            exercises=[
                ExerciseContent(
                    type="fill_blank",
                    question="Choose the correct word:",
                    options=None,
                    correct="is",
                    explanation="___ a cat. (to be)",
                ),
            ],
            vocabulary=[],
            grammar_refs=[],
        )

        with patch(
            "app.services.lesson_generator.llm_adapter.structured_output",
            AsyncMock(return_value=mock_lesson),
        ):
            result = await generate_lesson(
                cefr_level="A1",
                lesson_type="grammar",
                topic="Test",
                week=1,
                day=1,
                target_language="en-GB",
            )

        question = result.exercises[0].question
        assert "___" in question
        assert "a cat" in question

    @pytest.mark.asyncio
    async def test_filters_invalid_grammar_refs(self):
        from app.services.lesson_generator import generate_lesson, get_valid_grammar_slugs

        _ = get_valid_grammar_slugs("en-GB")

        mock_lesson = LessonContent(
            lesson_type="grammar",
            title="Test",
            cefr_level="A1",
            unit_id="a1_unit_1",
            explanation={"text": "test", "key_points": ["test"], "examples": []},
            exercises=[],
            vocabulary=[],
            grammar_refs=["valid-slug", "made-up-slug-xyz-123"],
        )

        with patch(
            "app.services.lesson_generator.llm_adapter.structured_output",
            AsyncMock(return_value=mock_lesson),
        ):
            result = await generate_lesson(
                cefr_level="A1",
                lesson_type="grammar",
                topic="Test",
                week=1,
                day=1,
                target_language="en-GB",
            )

        assert "made-up-slug-xyz-123" not in result.grammar_refs


class TestEvaluateFreeWrite:
    @pytest.mark.asyncio
    async def test_evaluates_free_write(self):
        from app.services.lesson_generator import evaluate_free_write

        mock_eval = FreeWriteEvaluation(
            score=0.85,
            feedback="Good job!",
            corrections=[
                {
                    "original": "I goes",
                    "corrected": "I go",
                    "explanation": "Use base form.",
                }
            ],
        )

        with patch(
            "app.services.lesson_generator.llm_adapter.structured_output",
            AsyncMock(return_value=mock_eval),
        ):
            result = await evaluate_free_write(
                cefr_level="A1",
                prompt="Describe your day.",
                criteria=["use present simple", "at least 3 sentences"],
                answer="I go to school. I study. I play.",
                target_language="en-GB",
            )

        assert result.score == 0.85
        assert len(result.corrections) == 1
        assert result.corrections[0]["corrected"] == "I go"


class TestEvaluatePronunciation:
    @pytest.mark.asyncio
    async def test_evaluates_pronunciation(self):
        from app.services.lesson_generator import evaluate_pronunciation

        mock_eval = PronunciationEvaluation(
            score=0.9,
            feedback="Great pronunciation!",
            is_correct=True,
        )

        with patch(
            "app.services.lesson_generator.llm_adapter.structured_output",
            AsyncMock(return_value=mock_eval),
        ):
            result = await evaluate_pronunciation(
                cefr_level="A1",
                target="Hello, how are you?",
                transcription="Hello, how are you?",
                target_language="en-GB",
            )

        assert result.is_correct is True
        assert result.score == 0.9

    @pytest.mark.asyncio
    async def test_evaluates_pronunciation_incorrect(self):
        from app.services.lesson_generator import evaluate_pronunciation

        mock_eval = PronunciationEvaluation(
            score=0.3,
            feedback="Try again.",
            is_correct=False,
        )

        with patch(
            "app.services.lesson_generator.llm_adapter.structured_output",
            AsyncMock(return_value=mock_eval),
        ):
            result = await evaluate_pronunciation(
                cefr_level="B1",
                target="Where is the station?",
                transcription="Where is station",
                target_language="en-GB",
            )

        assert result.is_correct is False
        assert result.score == 0.3


class TestEvaluateFillBlank:
    @pytest.mark.asyncio
    async def test_evaluates_fill_blank_correct(self):
        from app.services.lesson_generator import evaluate_fill_blank

        mock_eval = FillBlankEvaluation(
            is_correct=True,
            score=1.0,
            feedback="Correct!",
        )

        with patch(
            "app.services.lesson_generator.llm_adapter.structured_output",
            AsyncMock(return_value=mock_eval),
        ):
            result = await evaluate_fill_blank(
                cefr_level="A1",
                question="I ___ a student.",
                correct_answer="am",
                student_answer="am",
                target_language="en-GB",
            )

        assert result.is_correct is True
        assert result.score == 1.0

    @pytest.mark.asyncio
    async def test_evaluates_fill_blank_incorrect(self):
        from app.services.lesson_generator import evaluate_fill_blank

        mock_eval = FillBlankEvaluation(
            is_correct=False,
            score=0.0,
            feedback="The correct answer is 'am'.",
        )

        with patch(
            "app.services.lesson_generator.llm_adapter.structured_output",
            AsyncMock(return_value=mock_eval),
        ):
            result = await evaluate_fill_blank(
                cefr_level="A1",
                question="I ___ a student.",
                correct_answer="am",
                student_answer="is",
                target_language="en-GB",
            )

        assert result.is_correct is False
        assert result.score == 0.0
