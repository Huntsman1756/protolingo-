import httpx
import openai


class KokoroTTSService:
    def __init__(self, base_url: str, voice: str) -> None:
        self.base_url = base_url
        self.voice = voice

    async def health(self) -> None:
        """Raise if Kokoro is unreachable."""
        async with httpx.AsyncClient() as client:
            r = await client.get(f"{self.base_url}/v1/models", timeout=5.0)
            r.raise_for_status()

    async def synthesize(
        self, text: str, voice: str | None = None, language: str | None = None
    ) -> bytes:
        """Call Kokoro-FastAPI and return MP3 audio bytes."""
        _ = language  # Kokoro handles language via the voice model itself
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


class OpenAITTSService:
    def __init__(self, api_key: str, model: str, voice: str, speed: float = 1.0) -> None:
        self._client = openai.AsyncOpenAI(api_key=api_key)
        self.model = model
        self.voice = voice
        self.speed = speed

    async def health(self) -> None:
        """Raise if OpenAI TTS is unreachable (lightweight models list call)."""
        await self._client.models.list()

    async def synthesize(
        self, text: str, voice: str | None = None, language: str | None = None
    ) -> bytes:
        """Call OpenAI TTS API and return MP3 audio bytes."""
        _ = language
        response = await self._client.audio.speech.create(
            model=self.model,
            voice=voice or self.voice,
            input=text,
            response_format="mp3",
            speed=self.speed,
            timeout=30.0,
        )
        return response.content
