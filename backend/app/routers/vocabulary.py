from fastapi import APIRouter, Depends, HTTPException, Query, status

from app.core.deps import get_current_user
from app.data._types import VocabularySet
from app.data.vocabulary import get_vocabulary_by_level, get_vocabulary_set, get_vocabulary_sets
from app.models.user import User
from app.schemas.vocabulary import (
    VocabularyEntryResponse,
    VocabularySetDetailResponse,
    VocabularySetResponse,
    VocabularySetsResponse,
)

router = APIRouter(prefix="/api/vocabulary", tags=["vocabulary"])


def _set_to_response(s: VocabularySet) -> VocabularySetResponse:
    return VocabularySetResponse(
        id=s.id,
        level=s.level,
        topic=s.topic,
        unit_ref=s.unit_ref,
        words=[
            VocabularyEntryResponse(
                word=w.word,
                pos=w.pos,
                definition=w.definition,
                example=w.example,
                ipa=w.ipa,
                frequency_rank=w.frequency_rank,
            )
            for w in s.words
        ],
    )


@router.get("", response_model=VocabularySetsResponse)
def list_vocabulary_sets(
    language: str = Query("en-US", description="BCP-47 target language code"),
    _current_user: User = Depends(get_current_user),
):
    """Return all vocabulary sets for the given target language."""
    sets = get_vocabulary_sets(language)
    return VocabularySetsResponse(sets=[_set_to_response(s) for s in sets])


@router.get("/level/{level}", response_model=VocabularySetsResponse)
def list_vocabulary_by_level(
    level: str,
    language: str = Query("en-US", description="BCP-47 target language code"),
    _current_user: User = Depends(get_current_user),
):
    """Return vocabulary sets for a specific CEFR level."""
    valid_levels = {"A1", "A2", "B1", "B2", "C1", "C2"}
    upper = level.upper()
    if upper not in valid_levels:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid CEFR level. Must be one of: {', '.join(sorted(valid_levels))}",
        )
    sets = get_vocabulary_by_level(upper, language)  # type: ignore[arg-type]
    return VocabularySetsResponse(sets=[_set_to_response(s) for s in sets])


@router.get("/{set_id}", response_model=VocabularySetDetailResponse)
def get_vocabulary_set_detail(
    set_id: str,
    language: str = Query("en-US", description="BCP-47 target language code"),
    _current_user: User = Depends(get_current_user),
):
    """Return a single vocabulary set by ID."""
    s = get_vocabulary_set(set_id, language)
    if not s:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Vocabulary set not found"
        )
    return VocabularySetDetailResponse(set=_set_to_response(s))
