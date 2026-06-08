from fastapi import APIRouter, Depends, HTTPException, Query, status

from app.core.deps import get_current_user
from app.data._types import PhrasebookCategory
from app.data.phrasebook import (
    get_phrasebook_by_level,
    get_phrasebook_categories,
    get_phrasebook_category,
)
from app.models.user import User
from app.schemas.phrasebook import (
    PhrasebookCategoriesResponse,
    PhrasebookCategoryDetailResponse,
    PhrasebookCategoryResponse,
    PhrasebookEntryResponse,
)

router = APIRouter(prefix="/api/phrasebook", tags=["phrasebook"])


def _category_to_response(c: PhrasebookCategory) -> PhrasebookCategoryResponse:
    return PhrasebookCategoryResponse(
        id=c.id,
        level=c.level,
        situation=c.situation,
        icon=c.icon,
        phrases=[
            PhrasebookEntryResponse(
                text=p.text,
                context=p.context,
                register=p.register,
                unit_ref=p.unit_ref,
            )
            for p in c.phrases
        ],
    )


@router.get("", response_model=PhrasebookCategoriesResponse)
def list_phrasebook_categories(
    language: str = Query("en-US", description="BCP-47 target language code"),
    _current_user: User = Depends(get_current_user),
):
    """Return all phrasebook categories for the given target language."""
    categories = get_phrasebook_categories(language)
    return PhrasebookCategoriesResponse(categories=[_category_to_response(c) for c in categories])


@router.get("/level/{level}", response_model=PhrasebookCategoriesResponse)
def list_phrasebook_by_level(
    level: str,
    language: str = Query("en-US", description="BCP-47 target language code"),
    _current_user: User = Depends(get_current_user),
):
    """Return phrasebook categories for a specific CEFR level."""
    valid_levels = {"A1", "A2", "B1", "B2", "C1", "C2"}
    upper = level.upper()
    if upper not in valid_levels:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid CEFR level. Must be one of: {', '.join(sorted(valid_levels))}",
        )
    categories = get_phrasebook_by_level(upper, language)  # type: ignore[arg-type]
    return PhrasebookCategoriesResponse(categories=[_category_to_response(c) for c in categories])


@router.get("/{category_id}", response_model=PhrasebookCategoryDetailResponse)
def get_phrasebook_category_detail(
    category_id: str,
    language: str = Query("en-US", description="BCP-47 target language code"),
    _current_user: User = Depends(get_current_user),
):
    """Return a single phrasebook category by ID."""
    c = get_phrasebook_category(category_id, language)
    if not c:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Phrasebook category not found",
        )
    return PhrasebookCategoryDetailResponse(category=_category_to_response(c))
