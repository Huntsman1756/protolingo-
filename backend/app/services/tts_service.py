import httpx


class TTSService:
    def __init__(self, base_url: str, voice: str) -> None:
        self.base_url = base_url
        self.voice = voice

    async def synthesize(self, text: str, voice: str | None = None) -> bytes:
        """Call Kokoro-FastAPI and return MP3 audio bytes."""
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{self.base_url}/v1/audio/speech",
                json={
                    "model": "kokoro",
                    "input": text,
                    "voice": voice or self.voice,
                    "response_format": "mp3",
                },
                timeout=30.0,
            )
            response.raise_for_status()
            return response.content
