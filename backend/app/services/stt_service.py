import httpx


class STTService:
    def __init__(self, base_url: str) -> None:
        self.base_url = base_url.rstrip("/")

    async def transcribe(
        self,
        audio_bytes: bytes,
        filename: str = "audio.wav",
        mime_type: str = "audio/wav",
    ) -> str:
        """Send audio to Whisper ASR and return the transcribed text.

        Compatible with onerahmet/openai-whisper-asr-webservice which exposes
        POST /asr?output=json&language=en (not the OpenAI /v1/audio/transcriptions path).
        """
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{self.base_url}/asr",
                params={"output": "json", "language": "en", "task": "transcribe"},
                files={"audio_file": (filename, audio_bytes, mime_type)},
                timeout=60.0,
            )
            response.raise_for_status()
            data = response.json()
            # Response: {"text": "...", ...}
            return data.get("text", "").strip()
