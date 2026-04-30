---
description: "FreeLingo Phase 3: real-time voice conversation. Complete WebSocket pipeline: VAD (vad-web) in the browser → STT (Whisper) → LLM streaming (Ollama/gemma3:12b) → sentence splitter → TTS (Kokoro) → gapless AudioContext playback. Barge-in support. ConversationPipeline backend, ConversationMode frontend, ~800ms–1s latency with GPU, optional optimizations."
---

# Phase 3 — Real-Time Conversation

## Objective

Fully local voice conversation mode: the user speaks, the AI responds
in audio with conversational latency (~800ms–1.3s end to end). No send
buttons: VAD automatically detects when the user has finished speaking.

---

## Complete Pipeline

```
┌─────────────────────────────────────────────────────────────┐
│ BROWSER                                                     │
│                                                             │
│  Mic → VAD (vad-web) ─────→ WebSocket (audio chunk)        │
│                                                             │
│  AudioContext ←── WebSocket (audio chunk) ←── TTS stream   │
└─────────────────────────────────────────────────────────────┘
                              │  ↑
                    audio     │  │ audio
                    stream    │  │ chunks
                              ↓  │
┌─────────────────────────────────────────────────────────────┐
│ BACKEND (WebSocket /ws/conversation)                        │
│                                                             │
│  1. Receives audio chunk from the browser                  │
│  2. STT (Whisper) → text                                   │
│  3. LLM (Ollama) → streaming response                      │
│  4. Sentence splitter → complete sentences                 │
│  5. TTS (Kokoro) → audio chunk per sentence                │
│  6. Sends audio chunk to the browser                       │
│                                                             │
│  Interruption handling:                                    │
│  Browser sends {type: "interrupt"} → cancels LLM + TTS     │
└─────────────────────────────────────────────────────────────┘
```

**Estimated local latency with GPU (gemma3:12b + Kokoro + Whisper medium):**
- STT transcription: ~300–400ms
- LLM TTFT (Time To First Token): ~200–400ms
- TTS first sentence: ~150–250ms
- **Total until first audio**: ~650ms–1050ms

---

## Backend Implementation

### `app/routers/conversation.py` (WebSocket)

```python
from fastapi import WebSocket, WebSocketDisconnect
import asyncio, json

@router.websocket("/ws/conversation")
async def conversation_ws(websocket: WebSocket, ...):
    await websocket.accept()
    pipeline = ConversationPipeline(llm_adapter, tts_service, stt_service)

    try:
        while True:
            data = await websocket.receive()

            if "bytes" in data:
                # Audio from user's microphone
                await pipeline.handle_audio(data["bytes"], websocket)

            elif "text" in data:
                msg = json.loads(data["text"])
                if msg.get("type") == "interrupt":
                    await pipeline.cancel_current()
                elif msg.get("type") == "config":
                    pipeline.update_config(msg)

    except WebSocketDisconnect:
        await pipeline.cleanup()
```

### `app/services/conversation_pipeline.py`

```python
import asyncio
import re

class ConversationPipeline:
    """
    Orchestrates STT → LLM → TTS streaming with barge-in support.
    """
    def __init__(self, llm, tts, stt):
        self.llm = llm
        self.tts = tts
        self.stt = stt
        self.current_task: asyncio.Task | None = None
        self.history: list[dict] = []
        self.system_prompt = CONVERSATION_SYSTEM_PROMPT

    async def handle_audio(self, audio_bytes: bytes, ws):
        # Cancel ongoing response if new audio arrives (barge-in)
        if self.current_task and not self.current_task.done():
            self.current_task.cancel()
            await ws.send_json({"type": "interrupted"})

        self.current_task = asyncio.create_task(
            self._process(audio_bytes, ws)
        )

    async def _process(self, audio_bytes: bytes, ws):
        # 1. STT
        await ws.send_json({"type": "status", "value": "transcribing"})
        user_text = await self.stt.transcribe(audio_bytes)
        await ws.send_json({"type": "transcript", "text": user_text})

        # 2. Streaming LLM
        self.history.append({"role": "user", "content": user_text})
        messages = [{"role": "system", "content": self.system_prompt}] + self.history

        await ws.send_json({"type": "status", "value": "thinking"})
        full_response = ""
        sentence_buffer = ""

        async for chunk in await self.llm.chat(messages, stream=True):
            token = chunk.choices[0].delta.content or ""
            full_response += token
            sentence_buffer += token

            # 3. When we have a complete sentence → immediate TTS
            if re.search(r'[.!?]\s*$', sentence_buffer.strip()):
                sentence = sentence_buffer.strip()
                sentence_buffer = ""
                await self._synthesize_and_send(sentence, ws)

        # Send remaining buffer if it didn't end with punctuation
        if sentence_buffer.strip():
            await self._synthesize_and_send(sentence_buffer.strip(), ws)

        self.history.append({"role": "assistant", "content": full_response})
        await ws.send_json({"type": "turn_complete"})

    async def _synthesize_and_send(self, text: str, ws):
        audio_bytes = await self.tts.synthesize(text)
        await ws.send_bytes(audio_bytes)

    async def cancel_current(self):
        if self.current_task:
            self.current_task.cancel()
            if self.history and self.history[-1]["role"] == "user":
                self.history.pop()

    async def cleanup(self):
        await self.cancel_current()
```

### Sentence boundary for TTS chunking

```python
SENTENCE_END = re.compile(r'[.!?]["\')\]]?\s*$')
MAX_BUFFER_CHARS = 150

if SENTENCE_END.search(buffer) or len(buffer) > MAX_BUFFER_CHARS:
    # → send to TTS
```

### Conversation mode prompt
```python
CONVERSATION_SYSTEM_PROMPT = """
You are an English conversation partner for language learning.
Student level: {cefr_level}.

Rules:
- Speak naturally, as in a real conversation
- Keep responses short (1–3 sentences) unless the student asks for explanation
- If the student makes a grammar mistake, correct it gently at the end of your reply
- Use vocabulary appropriate for their level
- Ask follow-up questions to keep the conversation going
- Never break character or mention you are an AI unless directly asked
"""
```

---

## Frontend Implementation

### New dependencies

```bash
npm install @ricky0123/vad-web
```

### `components/conversation/ConversationMode.tsx`

```typescript
import { useMicVAD } from "@ricky0123/vad-web"

export function ConversationMode() {
  const wsRef = useRef<WebSocket | null>(null)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const [status, setStatus] = useState<"idle" | "listening" | "thinking" | "speaking">("idle")
  const [transcript, setTranscript] = useState("")

  const vad = useMicVAD({
    onSpeechEnd: (audio: Float32Array) => {
      if (!wsRef.current) return
      wsRef.current.send(float32ToWav(audio))
      setStatus("thinking")
    },
    onSpeechStart: () => {
      setStatus("listening")
      if (status === "speaking") {
        wsRef.current?.send(JSON.stringify({ type: "interrupt" }))
        stopAudioQueue()
      }
    },
  })

  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:8000/ws/conversation`)
    wsRef.current = ws
    audioCtxRef.current = new AudioContext()

    ws.onmessage = async (event) => {
      if (event.data instanceof Blob) {
        const buffer = await event.data.arrayBuffer()
        enqueueAudio(buffer)
        setStatus("speaking")
      } else {
        const msg = JSON.parse(event.data)
        if (msg.type === "transcript") setTranscript(msg.text)
        if (msg.type === "turn_complete") setStatus("idle")
        if (msg.type === "status") setStatus(msg.value)
      }
    }

    return () => ws.close()
  }, [])

  return (
    <div className="flex flex-col items-center gap-6 p-8">
      <StatusIndicator status={status} />
      <TranscriptBubble text={transcript} />
      <MicButton active={vad.listening} onClick={() => vad.toggle()} />
    </div>
  )
}
```

### Gapless audio playback with AudioContext

```typescript
let nextAudioTime = 0

async function enqueueAudio(buffer: ArrayBuffer) {
  const ctx = audioCtxRef.current!
  const decoded = await ctx.decodeAudioData(buffer.slice(0))
  const source = ctx.createBufferSource()
  source.buffer = decoded
  source.connect(ctx.destination)

  const startAt = Math.max(nextAudioTime, ctx.currentTime + 0.05)
  source.start(startAt)
  nextAudioTime = startAt + decoded.duration
}

function stopAudioQueue() {
  audioCtxRef.current?.suspend()
  audioCtxRef.current?.resume()
  nextAudioTime = 0
}
```

### Float32 → WAV conversion to send to the backend

```typescript
function float32ToWav(pcm: Float32Array, sampleRate = 16000): ArrayBuffer {
  const buffer = new ArrayBuffer(44 + pcm.length * 2)
  const view = new DataView(buffer)
  const writeString = (v: DataView, o: number, s: string) =>
    s.split('').forEach((c, i) => v.setUint8(o + i, c.charCodeAt(0)))

  writeString(view, 0, 'RIFF')
  view.setUint32(4, 36 + pcm.length * 2, true)
  writeString(view, 8, 'WAVE')
  writeString(view, 12, 'fmt ')
  view.setUint32(16, 16, true)
  view.setUint16(20, 1, true)   // PCM
  view.setUint16(22, 1, true)   // mono
  view.setUint32(24, sampleRate, true)
  view.setUint32(28, sampleRate * 2, true)
  view.setUint16(32, 2, true)
  view.setUint16(34, 16, true)
  writeString(view, 36, 'data')
  view.setUint32(40, pcm.length * 2, true)
  const pcmOut = new Int16Array(buffer, 44)
  for (let i = 0; i < pcm.length; i++) {
    pcmOut[i] = Math.max(-32768, Math.min(32767, pcm[i] * 32768))
  }
  return buffer
}
```

---

## Optional Optimizations (post-launch)

- **Warm-up**: Preload the Whisper model into memory on service startup
- **TTS Cache**: Cache very common short phrases in Redis (greetings, farewells)
- **Context window**: Limit history to the last 10 interactions to avoid overloading the Gemma 3 12B context
- **Parallel TTS**: Generate the audio for sentence 2 while sentence 1 is playing

---

## Phase 3 Completion Criteria

- [ ] WebSocket accepts connections and the complete pipeline works without errors
- [ ] End-to-end latency < 1.5s locally with GPU
- [ ] Barge-in functional: the user can interrupt the AI by speaking
- [ ] Gapless audio without cuts between sentences
- [ ] Automatic VAD operational with < 2% false positives under normal conditions
- [ ] Conversation history is correctly maintained during the session
- [ ] No regressions in Phases 1 and 2