from fastapi import APIRouter, Depends, HTTPException

from app.core.deps import get_current_user
from app.models.user import User
from app.schemas.assessment import (
    AssessmentResult,
    AssessmentStartResponse,
    AssessmentSubmitRequest,
)
from app.services.assessment import evaluate_answers, generate_quiz
from app.services.llm_adapter import (
    LLMError,
    LLMTimeoutError,
    LLMUnavailableError,
)

router = APIRouter(prefix="/api/assessment", tags=["assessment"])

_sessions: dict[str, dict] = {}


@router.get("/start", response_model=AssessmentStartResponse)
async def start_assessment(
    current_user: User = Depends(get_current_user),
):
    try:
        quiz, session_id = await generate_quiz()
        _sessions[session_id] = {"quiz": quiz, "user_id": current_user.id}
        return AssessmentStartResponse(quiz=quiz, session_id=session_id)
    except LLMTimeoutError:
        raise HTTPException(
            status_code=504,
            detail="The AI model took too long to respond. Try again or check your Ollama instance.",
        )
    except LLMUnavailableError as e:
        raise HTTPException(
            status_code=503,
            detail=f"AI service unavailable: {str(e)}",
        )
    except LLMError as e:
        raise HTTPException(
            status_code=502,
            detail=f"Failed to generate quiz: {str(e)}",
        )


@router.post("/submit", response_model=AssessmentResult)
async def submit_assessment(
    data: AssessmentSubmitRequest,
    current_user: User = Depends(get_current_user),
):
    session_id = None
    quiz = None
    for sid, session in _sessions.items():
        if session["user_id"] == current_user.id:
            session_id = sid
            quiz = session["quiz"]
            break

    if not quiz:
        raise HTTPException(
            status_code=404,
            detail="No active quiz session found. Start a new assessment.",
        )

    try:
        result = await evaluate_answers(quiz, data)
        if session_id:
            del _sessions[session_id]
        return result
    except LLMTimeoutError:
        raise HTTPException(
            status_code=504,
            detail="The AI model took too long. Please try submitting again.",
        )
    except LLMUnavailableError as e:
        raise HTTPException(
            status_code=503,
            detail=f"AI service unavailable: {str(e)}",
        )
    except LLMError as e:
        raise HTTPException(
            status_code=502,
            detail=f"Failed to evaluate answers: {str(e)}",
        )
