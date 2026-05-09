import httpx
import openai


class KokoroTTSService:
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


class OpenAITTSService:
    def __init__(self, api_key: str, model: str, voice: str) -> None:
        self._client = openai.AsyncOpenAI(api_key=api_key)
        self.model = model
        self.voice = voice

    async def synthesize(self, text: str, voice: str | None = None) -> bytes:
        """Call OpenAI TTS API and return MP3 audio bytes."""
        response = await self._client.audio.speech.create(
            model=self.model,
            voice=voice or self.voice,
            input=text,
            response_format="mp3",
        )
        return response.content
