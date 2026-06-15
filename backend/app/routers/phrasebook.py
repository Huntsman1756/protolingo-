import hashlib
import os

from fastapi import APIRouter, Depends, HTTPException, Query, Request, status
from fastapi.responses import FileResponse

from app.core.app_logger import get_logger
from app.core.config import settings
from app.core.deps import get_current_user
from app.core.limiter import limiter
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
logger = get_logger(__name__)


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
@limiter.limit("60/minute")
def list_phrasebook_categories(
    request: Request,
    language: str = Query("en-GB", description="BCP-47 target language code"),
    _current_user: User = Depends(get_current_user),
):
    """Return all phrasebook categories for the given target language."""
    categories = get_phrasebook_categories(language)
    return PhrasebookCategoriesResponse(categories=[_category_to_response(c) for c in categories])


@router.get("/level/{level}", response_model=PhrasebookCategoriesResponse)
@limiter.limit("60/minute")
def list_phrasebook_by_level(
    request: Request,
    level: str,
    language: str = Query("en-GB", description="BCP-47 target language code"),
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
@limiter.limit("60/minute")
def get_phrasebook_category_detail(
    request: Request,
    category_id: str,
    language: str = Query("en-GB", description="BCP-47 target language code"),
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


@router.get("/audio/{category_id}/{phrase_index}")
@limiter.limit("30/minute")
async def get_phrase_audio(
    request: Request,
    category_id: str,
    phrase_index: int,
    language: str = Query("en-GB", description="BCP-47 target language code"),
    _current_user: User = Depends(get_current_user),
) -> FileResponse:
    """Return cached TTS audio for a phrase. Generates and caches on first request."""
    category = get_phrasebook_category(category_id, language)
    if not category:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Phrasebook category not found",
        )

    if phrase_index < 0 or phrase_index >= len(category.phrases):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Phrase not found",
        )

    phrase = category.phrases[phrase_index]

    iso = language.split("-")[0]
    cache_key = hashlib.sha256(
        f"{language}:{category_id}:{phrase_index}:{phrase.text}".encode()
    ).hexdigest()[:16]
    audio_dir = os.path.join(settings.AUDIO_STORAGE_PATH, "phrasebook", iso)
    cache_path = os.path.join(audio_dir, f"{cache_key}.mp3")

    if not os.path.isfile(cache_path):
        tts_service = getattr(request.app.state, "tts_service", None)
        if tts_service is None:
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail="TTS service is not enabled",
            )

        os.makedirs(audio_dir, exist_ok=True)
        audio = await tts_service.synthesize(phrase.text)
        tmp_path = cache_path + ".tmp"
        with open(tmp_path, "wb") as fh:  # noqa: PTH123
            fh.write(audio)
        os.replace(tmp_path, cache_path)
        logger.info(
            "phrasebook_audio_cached",
            language=language,
            category_id=category_id,
            phrase_index=phrase_index,
            cache_key=cache_key,
            bytes=len(audio),
        )

    return FileResponse(
        path=cache_path,
        media_type="audio/mpeg",
        headers={"Cache-Control": "public, max-age=86400"},
    )
