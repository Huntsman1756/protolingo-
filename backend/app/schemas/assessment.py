from __future__ import annotations

from typing import Optional

from pydantic import BaseModel


# ── Quiz question (static bank shape — mirrored from assessment-bank.ts) ──────

class QuizQuestion(BaseModel):
    id: str
    skill: str          # grammar | vocabulary | reading
    difficulty: str     # CEFRLevel
    question: str
    options: list[str]  # exactly 4
    correct: str        # matches one option exactly
    grammar_slug: Optional[str] = None


class QuizResponse(BaseModel):
    questions: list[QuizQuestion]


# ── Submission ─────────────────────────────────────────────────────────────────

class AnswerRecord(BaseModel):
    """One answered question from the adaptive quiz."""
    question_id: str
    skill: str       # grammar | vocabulary | reading
    difficulty: str  # CEFRLevel
    correct: bool


class AssessmentSubmitRequest(BaseModel):
    answers: list[AnswerRecord]


# ── Result ─────────────────────────────────────────────────────────────────────

class AssessmentResult(BaseModel):
    cefr_level: str
    score: float
    skill_profile: dict[str, float] = {}   # {grammar: 0.7, vocabulary: 0.5, reading: 0.6}
    strengths: list[str] = []
    weaknesses: list[str] = []
    analysis: str = ""


# ── Free-write evaluation ──────────────────────────────────────────────────────

class FreeWriteEvalRequest(BaseModel):
    preliminary_level: str
    writing_prompt: str
    student_answer: str


# ── Completion (saves result + creates plan) ───────────────────────────────────

class AssessmentCompleteRequest(BaseModel):
    cefr_level: str
    skill_profile: dict[str, float] = {}
    strengths: list[str] = []
    weaknesses: list[str] = []
    duration_weeks: int = 12
    days_per_week: int = 4
    goals: list[str] = ["grammar", "vocabulary", "reading", "writing"]


# ── Level test ─────────────────────────────────────────────────────────────────

class LevelTestSubmitRequest(BaseModel):
    plan_id: int
    answers: list[AnswerRecord]


class LevelTestResult(BaseModel):
    score: float
    recommendation: str   # advance | extend | repeat
    next_level: Optional[str] = None

