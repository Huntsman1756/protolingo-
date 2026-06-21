import os
import time
import uuid

from fastapi import APIRouter, Depends, HTTPException, Request, status
from fastapi.responses import FileResponse, Response

from app.core.app_logger import get_logger
from app.core.config import settings
from app.core.deps import get_current_user
from app.core.limiter import limiter
from app.models.user import User
from app.schemas.tts_stt import TTSRequest
from app.services.language_helpers import get_tts_voice

router = APIRouter(prefix="/api", tags=["tts"])
logger = get_logger(__name__)

_PREVIEW_DIR = "/app/tts_previews"
_OPENAI_VOICES = frozenset(
    {"alloy", "ash", "coral", "echo", "fable", "nova", "onyx", "sage", "shimmer"}
)
_NAN_KOKORO_VOICES = frozenset(
    {
        "af_heart",
        "bf_emma",
        "bm_george",
        "ef_dora",
        "em_alex",
        "ff_siwis",
        "if_sara",
        "im_nicola",
        "pf_dora",
        "pm_alex",
    }
)
_PREVIEW_TEXT = "Hello! I'm your FreeLingo tutor. This is how I sound — warm, clear, and ready to help you practise every day. Let's get started!"


@router.post("/tts")
@limiter.limit("20/minute")
async def text_to_speech(
    request: Request,
    body: TTSRequest,
    current_user: User = Depends(get_current_user),
) -> Response:
    """Proxy TTS request to Kokoro service. Returns audio/mpeg."""
    t0 = time.perf_counter()
    trace_id = request.headers.get("X-TTS-Trace-ID") or f"tts-{uuid.uuid4().hex[:12]}"

    tts_service = getattr(request.app.state, "tts_service", None)
    if tts_service is None:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="TTS service is not enabled"
        )

    synth_t0 = time.perf_counter()
    # Resolve voice: explicit from client > stored default > language-appropriate
    voice = body.voice or (
        None
        if settings.TTS_PROVIDER == "local"
        else (get_tts_voice(body.language or "en-GB") if body.language else None)
    )
    audio = await tts_service.synthesize(body.text, voice)
    synth_ms = (time.perf_counter() - synth_t0) * 1000
    total_ms = (time.perf_counter() - t0) * 1000

    logger.info(
        "tts",
        trace=trace_id,
        user_id=current_user.id,
        text_len=len(body.text),
        audio_bytes=len(audio),
        provider=type(tts_service).__name__,
        synth_ms=round(synth_ms, 1),
        total_ms=round(total_ms, 1),
    )

    return Response(
        content=audio,
        media_type="audio/mpeg",
        headers={
            "X-TTS-Trace-ID": trace_id,
            "X-TTS-Backend-Synth-Ms": f"{synth_ms:.1f}",
            "X-TTS-Backend-Total-Ms": f"{total_ms:.1f}",
        },
    )


@router.get("/tts/preview/{voice}")
@limiter.limit("60/minute")
async def voice_preview(
    request: Request,
    voice: str,
    current_user: User = Depends(get_current_user),
) -> FileResponse:
    """Return a cached preview audio clip for the given remote TTS voice.

    The MP3 is generated once and persisted to disk so subsequent requests
    are served from the local cache without incurring further API costs.
    Only available when TTS_PROVIDER=openai or TTS_PROVIDER=nan.
    """
    if settings.TTS_PROVIDER not in {"openai", "nan"}:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Voice preview is only available with remote TTS",
        )

    valid_voices = _NAN_KOKORO_VOICES if settings.TTS_PROVIDER == "nan" else _OPENAI_VOICES
    if voice not in valid_voices:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid voice name")

    tts_service = getattr(request.app.state, "tts_service", None)
    if tts_service is None:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="TTS service is not enabled"
        )

    cache_path = os.path.join(_PREVIEW_DIR, f"{settings.TTS_PROVIDER}-{voice}.mp3")

    if not os.path.exists(cache_path):
        os.makedirs(_PREVIEW_DIR, exist_ok=True)
        audio = await tts_service.synthesize(_PREVIEW_TEXT, voice)
        # Write atomically via a temp file to avoid partial reads
        tmp_path = cache_path + ".tmp"
        with open(tmp_path, "wb") as fh:  # noqa: PTH123
            fh.write(audio)
        os.replace(tmp_path, cache_path)
        logger.info("tts_preview_cached", voice=voice, bytes=len(audio))

    return FileResponse(cache_path, media_type="audio/mpeg")
