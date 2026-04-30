---
description: "Phase 2 of FreeLingo: local TTS and STT integration. Kokoro-FastAPI for voice synthesis (TTS, compatible with OpenAI TTS API), faster-whisper for speech recognition (STT, compatible with OpenAI STT API). Docker services with CUDA GPU support. Implementation of TTSService, STTService, routers /api/tts and /api/stt, AudioPlayer and VoiceRecorder in the frontend, pronunciation exercises and speaking mode in flashcards."
---

# Phase 2 — Local TTS and STT

## Objective

Add voice synthesis (TTS) and speech recognition (STT) fully locally,
with no external dependencies. The user can listen to words and phrases pronounced
with native quality, and practice pronunciation by recording their own voice.

---

## New services

### Kokoro-FastAPI (TTS)

- **Image**: `ghcr.io/remsky/kokoro-fastapi:latest`
- **Compatible API**: OpenAI TTS (`POST /v1/audio/speech`)
- **Available voices**: `af_heart`, `af_sky`, `bf_emma`, `bm_george`
- **GPU**: supports CUDA; without GPU uses CPU (slower but functional)
- **Languages**: native English, high pronunciation quality

### faster-whisper / Whisper ASR (STT)

- **Image**: `onerahmet/openai-whisper-asr-webservice:latest-gpu`
- **Compatible API**: OpenAI STT (`POST /v1/audio/transcriptions`)
- **Recommended models**: `medium` (good accuracy, fast on GPU), `large-v3` (maximum accuracy)
- **GPU**: CUDA-accelerated

---

## Changes in docker-compose.yml

```yaml
  kokoro:
    image: ghcr.io/remsky/kokoro-fastapi:latest
    restart: unless-stopped
    ports:
      - "8880:8880"
    environment:
      - PYTHONUNBUFFERED=1
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: 1
              capabilities: [gpu]

  whisper:
    image: onerahmet/openai-whisper-asr-webservice:latest-gpu
    restart: unless-stopped
    ports:
      - "9000:9000"
    environment:
      - ASR_MODEL=medium
      - ASR_ENGINE=faster_whisper
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: 1
              capabilities: [gpu]
```

New variables in `.env`:
```env
TTS_ENABLED=true
TTS_BASE_URL=http://kokoro:8880
TTS_VOICE=af_heart

STT_ENABLED=true
STT_BASE_URL=http://whisper:9000
STT_MODEL=medium
```

---

## Changes in the backend

### `app/services/tts_service.py`
```python
import httpx

class TTSService:
    def __init__(self, base_url: str, voice: str):
        self.base_url = base_url
        self.voice = voice

    async def synthesize(self, text: str, voice: str | None = None) -> bytes:
        """Returns audio in mp3 format."""
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
```

### `app/services/stt_service.py`
```python
import httpx

class STTService:
    def __init__(self, base_url: str):
        self.base_url = base_url

    async def transcribe(self, audio_bytes: bytes, filename: str = "audio.webm") -> str:
        """Transcribes audio to text. Returns the recognized text."""
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{self.base_url}/v1/audio/transcriptions",
                files={"file": (filename, audio_bytes, "audio/webm")},
                data={"model": "whisper-1", "language": "en"},
                timeout=60.0,
            )
            response.raise_for_status()
            return response.json()["text"]
```

### `app/routers/tts.py`
```python
@router.post("/tts")
async def text_to_speech(request: TTSRequest, ...):
    """TTS proxy to Kokoro service. Returns audio/mpeg."""
    audio = await tts_service.synthesize(request.text, request.voice)
    return Response(content=audio, media_type="audio/mpeg")
```

### `app/routers/stt.py`
```python
@router.post("/stt")
async def speech_to_text(audio: UploadFile = File(...), ...):
    """STT proxy to Whisper service. Returns transcribed text."""
    audio_bytes = await audio.read()
    text = await stt_service.transcribe(audio_bytes, audio.filename)
    return {"text": text}
```

---

## Changes in the frontend

### Audio player for TTS (`components/ui/AudioPlayer.tsx`)

```typescript
async function playTTS(text: string, voice?: string) {
  const response = await fetch('/api/tts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ text, voice }),
  })
  const blob = await response.blob()
  const url = URL.createObjectURL(blob)
  const audio = new Audio(url)
  await audio.play()
  audio.onended = () => URL.revokeObjectURL(url)
}
```

Integrate in:
- **Flashcards**: 🔊 button on each card to listen to pronunciation
- **Lessons**: 🔊 button on example sentences
- **Pronunciation exercises**: the prompt always has audio

### Voice recording for STT (`components/ui/VoiceRecorder.tsx`)

```typescript
async function recordAndTranscribe(): Promise<string> {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
  const recorder = new MediaRecorder(stream, { mimeType: 'audio/webm' })
  const chunks: Blob[] = []

  recorder.ondataavailable = (e) => chunks.push(e.data)

  await new Promise<void>((resolve) => {
    recorder.onstop = () => resolve()
    recorder.start()
    setTimeout(() => recorder.stop(), 5000)  // max 5s
  })

  stream.getTracks().forEach(t => t.stop())

  const blob = new Blob(chunks, { type: 'audio/webm' })
  const formData = new FormData()
  formData.append('audio', blob, 'recording.webm')

  const res = await fetch('/api/stt', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  })
  return (await res.json()).text
}
```

### New exercise type: Pronunciation

```typescript
interface PronunciationExercise {
  target_sentence: string
  hint: string           // Hint about the sound or pattern to practice
}
// Flow:
// 1. The student sees the sentence
// 2. Presses 🔊 to listen (TTS)
// 3. Presses the microphone to record their repetition
// 4. STT transcribes and the LLM compares expected vs transcribed pronunciation
// 5. Score and feedback
```

### `/flashcards` — Speaking mode

Additional mode on the flashcards page:
- Shows the definition in English
- The user says the word out loud
- STT transcribes → compares with the correct word
- Scored as SM-2 quality: `5` if correct, `2` if incorrect

---

## Phase 2 completion criteria

- [ ] Kokoro returns audio correctly from the backend
- [ ] Whisper correctly transcribes audio recorded in the browser
- [ ] Audio button functional in flashcards and lessons
- [ ] Pronunciation recording and evaluation operational
- [ ] GPU used by both services (verify with `nvidia-smi`)
- [ ] No regressions in Phase 1 functionality