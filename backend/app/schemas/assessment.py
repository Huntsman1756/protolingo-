from pydantic import BaseModel


class QuizQuestion(BaseModel):
    id: int
    type: str
    difficulty: str
    question: str
    options: list[str]
    correct_answer: str


class QuizResponse(BaseModel):
    questions: list[QuizQuestion]


class AnswerSubmit(BaseModel):
    question_id: int
    answer: str


class AssessmentSubmitRequest(BaseModel):
    answers: list[AnswerSubmit]


class AssessmentResult(BaseModel):
    cefr_level: str
    score: float
    analysis: str
    strengths: list[str]
    weaknesses: list[str]


class AssessmentStartResponse(BaseModel):
    quiz: QuizResponse
    session_id: str
