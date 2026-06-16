from fastapi import APIRouter, Depends, HTTPException, Query, Request, status

from app.core.deps import get_current_user
from app.core.limiter import limiter
from app.data._types import GrammarTopic
from app.data.grammar import get_grammar_topic, get_grammar_topics
from app.models.user import User
from app.schemas.grammar import (
    GrammarExampleResponse,
    GrammarMistakeResponse,
    GrammarTopicDetailResponse,
    GrammarTopicResponse,
    GrammarTopicsResponse,
)

router = APIRouter(prefix="/api/grammar", tags=["grammar"])


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
