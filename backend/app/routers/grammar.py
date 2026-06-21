from fastapi import APIRouter, Depends, HTTPException, Query, Request, status

from app.core.deps import get_current_user
from app.core.limiter import limiter
from app.data._types import GrammarTopic
from app.data.assessment_bank import get_assessment_bank
from app.data.curriculum import CEFR_LEVELS
from app.data.grammar import get_grammar_topic, get_grammar_topics
from app.models.user import User
from app.schemas.grammar import (
    GrammarDrillQuestion,
    GrammarDrillResponse,
    GrammarExampleResponse,
    GrammarMistakeResponse,
    GrammarTopicDetailResponse,
    GrammarTopicResponse,
    GrammarTopicsResponse,
)

router = APIRouter(prefix="/api/grammar", tags=["grammar"])


def _cefr_level_position(level: str) -> int:
    normalized = (level or "").upper()
    try:
        return CEFR_LEVELS.index(normalized)
    except ValueError:
        return len(CEFR_LEVELS)


def _drill_questions_for_slug(language: str, slug: str, limit: int) -> list[GrammarDrillQuestion]:
    from app.data._types import AssessmentQuestion  # noqa: PLC0415

    topic = get_grammar_topic(slug, language)
    if not topic:
        return []

    bank = get_assessment_bank(language)
    target_level_position = _cefr_level_position(topic.level)

    def _distance(question: AssessmentQuestion) -> tuple[int, int]:
        level_position = _cefr_level_position(question.difficulty)
        return (abs(level_position - target_level_position), level_position)

    candidate_questions = [
        q
        for q in bank
        if q.skill == "grammar" and q.grammar_slug == slug
    ]
    if not candidate_questions:
        candidate_questions = [q for q in bank if q.skill == "grammar"]

    candidate_questions.sort(key=_distance)
    selected = candidate_questions[:limit]

    return [
        GrammarDrillQuestion(
            index=i,
            question=q.question,
            options=q.options,
            correct=q.correct,
            explanation=None,
        )
        for i, q in enumerate(selected)
    ]


def _topic_to_response(t: GrammarTopic) -> GrammarTopicResponse:
    return GrammarTopicResponse(
        slug=t.slug,
        title=t.title,
        level=t.level,
        category=t.category,
        summary=t.summary,
        explanation=t.explanation,
        structure=t.structure,
        rules=t.rules,
        examples=[
            GrammarExampleResponse(
                text=e.text,
                translation=e.translation,
                note=e.note,
            )
            for e in t.examples
        ],
        common_mistakes=[
            GrammarMistakeResponse(
                wrong=m.wrong,
                correct=m.correct,
                note=m.note,
            )
            for m in t.common_mistakes
        ],
        related=t.related,
    )


@router.get("", response_model=GrammarTopicsResponse)
@limiter.limit("60/minute")
def list_grammar_topics(
    request: Request,
    language: str = Query("en-GB", description="BCP-47 target language code"),
    _current_user: User = Depends(get_current_user),
):
    """Return all grammar topics for the given target language."""
    topics = get_grammar_topics(language)
    return GrammarTopicsResponse(topics=[_topic_to_response(t) for t in topics])


@router.get("/{slug}", response_model=GrammarTopicDetailResponse)
@limiter.limit("60/minute")
def get_grammar_topic_detail(
    request: Request,
    slug: str,
    language: str = Query("en-GB", description="BCP-47 target language code"),
    _current_user: User = Depends(get_current_user),
):
    """Return a single grammar topic by slug."""
    t = get_grammar_topic(slug, language)
    if not t:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Grammar topic not found",
        )
    return GrammarTopicDetailResponse(topic=_topic_to_response(t))


@router.get("/{slug}/drills", response_model=GrammarDrillResponse)
@limiter.limit("60/minute")
def get_grammar_drills(
    request: Request,
    slug: str,
    language: str = Query("en-GB", description="BCP-47 target language code"),
    limit: int = Query(10, ge=1, le=25, description="Maximum number of drills"),
    _current_user: User = Depends(get_current_user),
):
    """Return grammar drills for a topic using the static assessment bank."""
    t = get_grammar_topic(slug, language)
    if not t:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Grammar topic not found",
        )

    questions = _drill_questions_for_slug(language, slug, limit)
    if not questions:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No drills found for this grammar topic",
        )

    return GrammarDrillResponse(
        slug=t.slug,
        title=t.title,
        level=t.level,
        questions=questions,
    )
