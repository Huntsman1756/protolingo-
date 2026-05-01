from fastapi import APIRouter, Depends, HTTPException, Request
from fastapi.responses import Response

from app.core.deps import get_current_user
from app.core.limiter import limiter
from app.models.user import User
from app.schemas.tts_stt import TTSRequest

router = APIRouter(prefix="/api", tags=["tts"])


@router.post("/tts")
@limiter.limit("20/minute")
async def text_to_speech(
    request: Request,
    body: TTSRequest,
    current_user: User = Depends(get_current_user),
) -> Response:
    """Proxy TTS request to Kokoro service. Returns audio/mpeg."""
    tts_service = getattr(request.app.state, "tts_service", None)
    if tts_service is None:
        raise HTTPException(status_code=503, detail="TTS service is not enabled")
    audio = await tts_service.synthesize(body.text, body.voice)
    return Response(content=audio, media_type="audio/mpeg")
