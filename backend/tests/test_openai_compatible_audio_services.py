from __future__ import annotations


def test_tts_service_accepts_custom_base_url() -> None:
    from app.services.tts_service import OpenAITTSService

    service = OpenAITTSService(
        api_key="sk-nan",
        model="kokoro",
        voice="af_heart",
        base_url="https://api.nan.builders/v1",
    )

    assert str(service._client.base_url) == "https://api.nan.builders/v1/"
    assert service.model == "kokoro"
    assert service.voice == "af_heart"


def test_stt_service_accepts_custom_base_url() -> None:
    from app.services.stt_service import OpenAISTTService

    service = OpenAISTTService(
        api_key="sk-nan",
        model="whisper",
        base_url="https://api.nan.builders/v1",
    )

    assert str(service._client.base_url) == "https://api.nan.builders/v1/"
    assert service.model == "whisper"
