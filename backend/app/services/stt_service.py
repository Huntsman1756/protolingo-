import httpx


class STTService:
    def __init__(self, base_url: str) -> None:
        self.base_url = base_url

    async def transcribe(
        self,
        audio_bytes: bytes,
        filename: str = "audio.webm",
        mime_type: str = "audio/webm",
    ) -> str:
        """Send audio to Whisper ASR and return the transcribed text."""
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{self.base_url}/v1/audio/transcriptions",
                files={"file": (filename, audio_bytes, mime_type)},
                data={"model": "whisper-1", "language": "en"},
                timeout=60.0,
            )
            response.raise_for_status()
            return response.json()["text"]
