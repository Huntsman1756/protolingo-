---
description: "FreeLingo Phase 3: real-time voice conversation. Complete WebSocket pipeline: VAD (vad-web/ONNX single-threaded) in the browser → STT (Whisper WAV) → LLM streaming (configured provider via LLMAdapter) → sentence splitter → TTS (Kokoro) → gapless AudioContext playback. Barge-in support. Session timeout (max duration + inactivity) configurable per-user from /settings. ConversationPipeline backend, ConversationMode frontend (dynamic SSR=false), ~800ms–1.3s latency with GPU."
---

# Phase 3 — Real-Time Conversation

## Objective

Fully local voice conversation mode: the user speaks, the AI responds
in audio with conversational latency (~800ms–1.3s end to end). No send
buttons: VAD automatically detects when the user has finished speaking.

Sessions have configurable timeout (max duration + inactivity), set by
each user from `/settings`.

---

## Complete Pipeline

```
┌─────────────────────────────────────────────────────────────┐
│ BROWSER                                                     │
│                                                             │
│  Mic → VAD (vad-web, ONNX single-threaded)                  │
│    onSpeechEnd → float32ToWav() → WS.send(wav bytes)        │
│                                                             │
│  AudioContext ←── WS.send(mp3 bytes) ←── TTS per sentence   │
└─────────────────────────────────────────────────────────────┘
                              │  ↑
                    audio     │  │ audio
                    WAV       │  │ MP3 chunks
                              ↓  │
┌─────────────────────────────────────────────────────────────┐
│ BACKEND  WS /ws/conversation?token=<access_token>           │
│                                                             │
│  Auth: JWT decoded from query param on connect              │
│  Guard: TTS_ENABLED and STT_ENABLED must both be true       │
│                                                             │
│  1. Receives WAV audio bytes from browser                   │
│  2. STT (Whisper) → text                                    │
│  3. LLM (LLMAdapter, any configured provider) → streaming   │
│  4. Sentence splitter → complete sentences                  │
│  5. TTS (Kokoro) → MP3 chunk per sentence                   │
│  6. Sends MP3 chunk to browser                              │
│                                                             │
│  Timers (per connection):                                   │
│  - Inactivity: reset on each audio chunk; fires after N min │
│  - Max duration: fires after M min from connection open     │
│  Both send warning at T-60s then session_end                │
│                                                             │
│  Barge-in:                                                  │
│  Browser sends {type:"interrupt"} → cancels LLM+TTS task   │
└─────────────────────────────────────────────────────────────┘
```

**Estimated latency with GPU (any fast LLM + Kokoro + Whisper medium):**
- STT transcription: ~300–400ms
- LLM TTFT (Time To First Token): ~200–400ms
- TTS first sentence: ~150–250ms
- **Total until first audio**: ~650ms–1050ms

---

## User Model — New Columns

Two columns added to `app/models/user.py` and a new Alembic migration:

```python
conversation_max_duration: Mapped[int] = mapped_column(
    Integer, nullable=False, default=1800   # 1800=30min, options: 900|1800
)
conversation_inactivity_timeout: Mapped[int] = mapped_column(
    Integer, nullable=False, default=180    # 180=3min, options: 60|180|300
)
```

These are exposed in `UserResponse` and accepted in `UserUpdateRequest`:

```python
# schemas/auth.py additions
class UserResponse(BaseModel):
    # ... existing fields ...
    conversation_max_duration: int
    conversation_inactivity_timeout: int

class UserUpdateRequest(BaseModel):
    # ... existing fields ...
    conversation_max_duration: Optional[Literal[900, 1800]] = None
    conversation_inactivity_timeout: Optional[Literal[60, 180, 300]] = None
```

`PATCH /api/auth/me` already handles optional field updates — just add the
two fields to the update block in `routers/auth.py`.

---

## STTService — WAV support

`app/services/stt_service.py` receives WAV audio from the pipeline.
Add `mime_type` parameter (backward-compatible — existing `/api/stt` router
passes `"audio/webm"` as before):

```python
async def transcribe(
    self,
    audio_bytes: bytes,
    filename: str = "audio.webm",
    mime_type: str = "audio/webm",
) -> str:
    async with httpx.AsyncClient() as client:
        response = await client.post(
            f"{self.base_url}/v1/audio/transcriptions",
            files={"file": (filename, audio_bytes, mime_type)},
            data={"model": "whisper-1", "language": "en"},
            timeout=60.0,
        )
        response.raise_for_status()
        return response.json()["text"]
```

The pipeline calls:
```python
user_text = await self.stt.transcribe(audio_bytes, "audio.wav", "audio/wav")
```

---

## Backend Implementation

### `app/routers/conversation.py` (WebSocket)

```python
from fastapi import WebSocket, WebSocketDisconnect, Query
from jwt.exceptions import PyJWTError
from sqlalchemy import select
import asyncio, json

from app.core.security import decode_access_token
from app.core.database import get_db
from app.models.user import User
from app.models.study_plan import StudyPlan
from app.services.conversation_pipeline import ConversationPipeline

router = APIRouter(tags=["conversation"])


@router.websocket("/ws/conversation")
async def conversation_ws(
    websocket: WebSocket,
    token: str = Query(...),
):
    # --- Auth ---
    try:
        payload = decode_access_token(token)
        user_id = int(payload["sub"])
    except (PyJWTError, KeyError, ValueError):
        await websocket.close(code=1008)   # Policy violation
        return

    async with get_db_context() as db:
        user = await db.get(User, user_id)
        if not user or not user.is_active:
            await websocket.close(code=1008)
            return

        # --- Guard: TTS and STT must be enabled ---
        tts_service = getattr(websocket.app.state, "tts_service", None)
        stt_service = getattr(websocket.app.state, "stt_service", None)
        if tts_service is None or stt_service is None:
            await websocket.accept()
            await websocket.send_json({
                "type": "error",
                "code": "services_disabled",
                "message": "TTS and STT must be enabled for conversation mode.",
            })
            await websocket.close(code=1011)
            return

        # --- CEFR level from active StudyPlan, fallback B1 ---
        result = await db.execute(
            select(StudyPlan)
            .where(StudyPlan.user_id == user_id, StudyPlan.is_active == True)
            .order_by(StudyPlan.created_at.desc())
            .limit(1)
        )
        plan = result.scalar_one_or_none()
        cefr_level = plan.cefr_level if plan else "B1"

        llm_adapter = websocket.app.state.llm_adapter

        await websocket.accept()

        pipeline = ConversationPipeline(
            llm=llm_adapter,
            tts=tts_service,
            stt=stt_service,
            cefr_level=cefr_level,
            max_duration=user.conversation_max_duration,
            inactivity_timeout=user.conversation_inactivity_timeout,
        )

        try:
            await pipeline.run(websocket)
        except WebSocketDisconnect:
            await pipeline.cleanup()
```

### `app/services/conversation_pipeline.py`

```python
import asyncio
import re
import time
from typing import TYPE_CHECKING

from app.services.llm_adapter import LLMError, LLMTimeoutError, LLMUnavailableError

if TYPE_CHECKING:
    from fastapi import WebSocket

SENTENCE_END = re.compile(r'[.!?]["\'\)\]]?\s*$')
MAX_BUFFER_CHARS = 150

CONVERSATION_SYSTEM_PROMPT = """\
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

WARNING_ADVANCE_SECONDS = 60   # How many seconds before timeout to send the warning


class ConversationPipeline:
    """
    Orchestrates STT → LLM → TTS streaming with barge-in and session timeout.
    """

    def __init__(
        self,
        llm,
        tts,
        stt,
        cefr_level: str = "B1",
        max_duration: int = 1800,
        inactivity_timeout: int = 180,
    ) -> None:
        self.llm = llm
        self.tts = tts
        self.stt = stt
        self.system_prompt = CONVERSATION_SYSTEM_PROMPT.format(cefr_level=cefr_level)
        self.max_duration = max_duration
        self.inactivity_timeout = inactivity_timeout

        self.current_task: asyncio.Task | None = None
        self.history: list[dict] = []
        self._session_start = time.monotonic()
        self._last_activity = time.monotonic()
        self._timer_tasks: list[asyncio.Task] = []

    async def run(self, ws: "WebSocket") -> None:
        """Main loop: starts timeout watchers then handles incoming messages."""
        self._timer_tasks = [
            asyncio.create_task(self._max_duration_watcher(ws)),
            asyncio.create_task(self._inactivity_watcher(ws)),
        ]
        try:
            while True:
                data = await ws.receive()
                if "bytes" in data:
                    await self.handle_audio(data["bytes"], ws)
                elif "text" in data:
                    msg = json.loads(data["text"])
                    if msg.get("type") == "interrupt":
                        await self.cancel_current()
                        await ws.send_json({"type": "interrupted"})
        finally:
            for t in self._timer_tasks:
                t.cancel()

    async def handle_audio(self, audio_bytes: bytes, ws: "WebSocket") -> None:
        self._last_activity = time.monotonic()
        # Barge-in: cancel ongoing response if a new audio chunk arrives
        if self.current_task and not self.current_task.done():
            self.current_task.cancel()
            await ws.send_json({"type": "interrupted"})
        self.current_task = asyncio.create_task(self._process(audio_bytes, ws))

    async def _process(self, audio_bytes: bytes, ws: "WebSocket") -> None:
        # 1. STT
        try:
            await ws.send_json({"type": "status", "value": "transcribing"})
            user_text = await self.stt.transcribe(audio_bytes, "audio.wav", "audio/wav")
            await ws.send_json({"type": "transcript", "text": user_text})
        except Exception as exc:
            await ws.send_json({"type": "error", "code": "stt_failed", "message": str(exc)})
            return

        # 2. Streaming LLM
        self.history.append({"role": "user", "content": user_text})
        messages = [{"role": "system", "content": self.system_prompt}] + self.history[-20:]

        try:
            await ws.send_json({"type": "status", "value": "thinking"})
            full_response = ""
            sentence_buffer = ""

            async for chunk in await self.llm.chat(messages, stream=True):
                token = chunk.choices[0].delta.content or ""
                full_response += token
                sentence_buffer += token

                # 3. Flush complete sentence to TTS immediately
                if SENTENCE_END.search(sentence_buffer.strip()) or len(sentence_buffer) > MAX_BUFFER_CHARS:
                    sentence = sentence_buffer.strip()
                    sentence_buffer = ""
                    await self._synthesize_and_send(sentence, ws)

            # Flush remaining buffer
            if sentence_buffer.strip():
                await self._synthesize_and_send(sentence_buffer.strip(), ws)

        except (LLMTimeoutError, LLMUnavailableError, LLMError) as exc:
            await ws.send_json({"type": "error", "code": "llm_failed", "message": str(exc)})
            if self.history and self.history[-1]["role"] == "user":
                self.history.pop()
            return

        self.history.append({"role": "assistant", "content": full_response})
        await ws.send_json({"type": "turn_complete"})

    async def _synthesize_and_send(self, text: str, ws: "WebSocket") -> None:
        try:
            await ws.send_json({"type": "status", "value": "speaking"})
            audio_bytes = await self.tts.synthesize(text)
            await ws.send_bytes(audio_bytes)
        except Exception as exc:
            await ws.send_json({"type": "error", "code": "tts_failed", "message": str(exc)})

    async def cancel_current(self) -> None:
        if self.current_task and not self.current_task.done():
            self.current_task.cancel()
            try:
                await self.current_task
            except asyncio.CancelledError:
                pass
        if self.history and self.history[-1]["role"] == "user":
            self.history.pop()

    async def cleanup(self) -> None:
        await self.cancel_current()
        for t in self._timer_tasks:
            t.cancel()

    # --- Timeout watchers ---

    async def _max_duration_watcher(self, ws: "WebSocket") -> None:
        """Closes session after max_duration seconds, with a 60s warning."""
        warn_at = self.max_duration - WARNING_ADVANCE_SECONDS
        if warn_at > 0:
            await asyncio.sleep(warn_at)
            await ws.send_json({
                "type": "session_warning",
                "reason": "max_duration",
                "seconds_remaining": WARNING_ADVANCE_SECONDS,
            })
            await asyncio.sleep(WARNING_ADVANCE_SECONDS)
        else:
            await asyncio.sleep(self.max_duration)
        await ws.send_json({"type": "session_end", "reason": "max_duration"})
        await ws.close(code=1000)

    async def _inactivity_watcher(self, ws: "WebSocket") -> None:
        """Closes session if user is silent for inactivity_timeout seconds."""
        while True:
            await asyncio.sleep(5)   # check every 5 seconds
            elapsed = time.monotonic() - self._last_activity
            remaining = self.inactivity_timeout - elapsed

            if remaining <= WARNING_ADVANCE_SECONDS and remaining > 0:
                await ws.send_json({
                    "type": "session_warning",
                    "reason": "inactivity",
                    "seconds_remaining": int(remaining),
                })

            if elapsed >= self.inactivity_timeout:
                await ws.send_json({"type": "session_end", "reason": "inactivity"})
                await ws.close(code=1000)
                return
```

---

## Frontend Implementation

### Dependencies

```bash
npm install @ricky0123/vad-web
```

After install, copy ONNX model files to `public/` so they are served
without external CDN dependencies:

```json
// package.json — add to scripts
"postinstall": "node scripts/copy-vad-models.js"
```

```js
// scripts/copy-vad-models.js
const fs = require('fs')
const path = require('path')
const src = path.join(__dirname, '../node_modules/@ricky0123/vad-web/dist')
const dst = path.join(__dirname, '../public/vad')
if (!fs.existsSync(dst)) fs.mkdirSync(dst, { recursive: true })
fs.readdirSync(src)
  .filter(f => f.endsWith('.onnx') || f.endsWith('.wasm') || f.endsWith('.js'))
  .forEach(f => fs.copyFileSync(path.join(src, f), path.join(dst, f)))
```

### `next.config.ts` — NEXT_PUBLIC_API_URL

Add the public env var (used only for the WebSocket URL — HTTP rewrites
continue using the server-side `BACKEND_URL`):

```typescript
// No COOP/COEP headers needed: vad-web runs in single-threaded ONNX mode
// (ortConfig below), which does not require SharedArrayBuffer.
const nextConfig: NextConfig = {
  // ... existing config ...
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  },
}
```

`.env.example` addition:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### `src/lib/audio.ts` (new)

```typescript
export function float32ToWav(pcm: Float32Array, sampleRate = 16000): ArrayBuffer {
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

export interface AudioQueue {
  enqueue: (buffer: ArrayBuffer) => Promise<void>
  stop: () => void
}

export function createAudioQueue(ctx: AudioContext): AudioQueue {
  // nextStartTime lives inside the closure — not a module variable,
  // not a React state. Safe across re-renders.
  let nextStartTime = 0

  return {
    async enqueue(buffer: ArrayBuffer) {
      const decoded = await ctx.decodeAudioData(buffer.slice(0))
      const source = ctx.createBufferSource()
      source.buffer = decoded
      source.connect(ctx.destination)
      const startAt = Math.max(nextStartTime, ctx.currentTime + 0.05)
      source.start(startAt)
      nextStartTime = startAt + decoded.duration
    },
    stop() {
      ctx.suspend().then(() => ctx.resume())
      nextStartTime = 0
    },
  }
}
```

### `src/lib/conversation-ws.ts` (new)

```typescript
export function buildConversationWsUrl(token: string): string {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
  // http → ws, https → wss
  const wsBase = apiUrl.replace(/^http/, 'ws')
  return `${wsBase}/ws/conversation?token=${encodeURIComponent(token)}`
}
```

### `components/conversation/ConversationMode.tsx`

```typescript
'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { useMicVAD } from '@ricky0123/vad-web'
import { useAuthStore } from '@/store/auth'
import { float32ToWav, createAudioQueue, type AudioQueue } from '@/lib/audio'
import { buildConversationWsUrl } from '@/lib/conversation-ws'
import { StatusIndicator } from './StatusIndicator'
import { TranscriptBubble } from './TranscriptBubble'
import { MicButton } from './MicButton'
import { SessionTimeoutBanner } from './SessionTimeoutBanner'

export type ConvStatus = 'idle' | 'listening' | 'transcribing' | 'thinking' | 'speaking' | 'error'

export function ConversationMode() {
  const accessToken = useAuthStore((s) => s.accessToken)
  const wsRef = useRef<WebSocket | null>(null)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const queueRef = useRef<AudioQueue | null>(null)
  const [status, setStatus] = useState<ConvStatus>('idle')
  const [transcript, setTranscript] = useState('')
  const [aiText, setAiText] = useState('')
  const [warning, setWarning] = useState<{ reason: string; secondsRemaining: number } | null>(null)
  const [sessionEnded, setSessionEnded] = useState<string | null>(null)

  // AudioContext is created on the first mic button click (user gesture required)
  const ensureAudioContext = useCallback(() => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContext()
      queueRef.current = createAudioQueue(audioCtxRef.current)
    }
  }, [])

  useEffect(() => {
    if (!accessToken) return
    const ws = new WebSocket(buildConversationWsUrl(accessToken))
    wsRef.current = ws

    ws.onmessage = async (event) => {
      if (event.data instanceof Blob) {
        const buffer = await event.data.arrayBuffer()
        queueRef.current?.enqueue(buffer)
        setStatus('speaking')
      } else {
        const msg = JSON.parse(event.data as string)
        switch (msg.type) {
          case 'status':      setStatus(msg.value); break
          case 'transcript':  setTranscript(msg.text); break
          case 'turn_complete': setStatus('idle'); break
          case 'interrupted': setStatus('idle'); break
          case 'session_warning':
            setWarning({ reason: msg.reason, secondsRemaining: msg.seconds_remaining })
            break
          case 'session_end':
            setSessionEnded(msg.reason)
            setStatus('idle')
            break
          case 'error':
            setStatus('error')
            break
        }
      }
    }

    ws.onerror = () => setStatus('error')
    ws.onclose = () => { if (status !== 'idle') setStatus('idle') }

    return () => ws.close()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken])

  const vad = useMicVAD({
    // Single-threaded ONNX — no COOP/COEP headers required
    ortConfig: (ort) => { ort.env.wasm.numThreads = 1 },
    workletURL: '/vad/vad.worklet.bundle.min.js',
    modelURL: '/vad/silero_vad.onnx',
    positiveSpeechThreshold: 0.8,
    negativeSpeechThreshold: 0.6,
    redemptionFrames: 8,
    minSpeechFrames: 3,
    preSpeechPadFrames: 1,
    onSpeechStart: () => {
      setStatus('listening')
      if (status === 'speaking') {
        wsRef.current?.send(JSON.stringify({ type: 'interrupt' }))
        queueRef.current?.stop()
      }
      setWarning(null)
    },
    onSpeechEnd: (audio: Float32Array) => {
      if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return
      wsRef.current.send(float32ToWav(audio))
    },
  })

  function handleMicClick() {
    ensureAudioContext()   // creates AudioContext on user gesture
    vad.toggle()
  }

  if (sessionEnded) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 p-8">
        <p className="font-mono text-sm text-fl-muted-2 tracking-widest uppercase">
          — session ended ({sessionEnded === 'inactivity' ? 'inactivity' : 'time limit'})
        </p>
        <button
          onClick={() => { setSessionEnded(null); window.location.reload() }}
          className="font-mono text-xs tracking-widest uppercase border border-fl-border px-6 py-3 text-fl-muted-2 hover:text-fl-fg hover:border-fl-border-2 transition-colors"
        >
          — start new session
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-6 p-8">
      {warning && <SessionTimeoutBanner warning={warning} />}
      <StatusIndicator status={status} />
      <TranscriptBubble userText={transcript} aiText={aiText} />
      <MicButton active={vad.listening} onClick={handleMicClick} />
    </div>
  )
}
```

> **Dynamic import required** — in `app/(app)/conversation/page.tsx`:
> ```typescript
> import dynamic from 'next/dynamic'
> const ConversationMode = dynamic(
>   () => import('@/components/conversation/ConversationMode').then(m => m.ConversationMode),
>   { ssr: false }
> )
> ```

---

## Settings Page — Conversation Section

New section in `/settings` (below appearance), rendered as part of the
existing save form. Two new controlled fields:

```typescript
const SESSION_DURATION_OPTIONS = [
  { value: 900,  label: '15 min' },
  { value: 1800, label: '30 min' },
]
const INACTIVITY_OPTIONS = [
  { value: 60,  label: '1 min' },
  { value: 180, label: '3 min' },
  { value: 300, label: '5 min' },
]
```

Stored as `conversation_max_duration` and `conversation_inactivity_timeout`
in the User model, sent via `PATCH /api/auth/me` alongside other settings.

---

## WebSocket Message Protocol

| Direction | Type | Payload | Meaning |
|-----------|------|---------|---------|
| Browser → Backend | binary | WAV bytes | User speech |
| Browser → Backend | `{type:"interrupt"}` | — | Barge-in |
| Backend → Browser | binary | MP3 bytes | AI speech chunk |
| Backend → Browser | `{type:"status", value}` | transcribing\|thinking\|speaking | Pipeline state |
| Backend → Browser | `{type:"transcript", text}` | string | User's words |
| Backend → Browser | `{type:"turn_complete"}` | — | AI finished |
| Backend → Browser | `{type:"interrupted"}` | — | Barge-in confirmed |
| Backend → Browser | `{type:"session_warning", reason, seconds_remaining}` | — | ~60s before close |
| Backend → Browser | `{type:"session_end", reason}` | inactivity\|max_duration | Session closed |
| Backend → Browser | `{type:"error", code, message}` | stt_failed\|llm_failed\|tts_failed\|services_disabled | Non-fatal error |

---

## Optional Optimizations (post-launch)

- **Warm-up**: Preload the Whisper model into memory on service startup
- **TTS Cache**: Cache very common short phrases in Redis (greetings, farewells)
- **Context window**: History already trimmed to last 20 messages in pipeline
- **Parallel TTS**: Generate audio for sentence N+1 while sentence N is playing

---

## Phase 3 Completion Criteria

- [ ] WebSocket accepts connections and the full pipeline works without errors
- [ ] Auth: invalid/expired JWT → close with code 1008, no panic
- [ ] Guard: `TTS_ENABLED=false` or `STT_ENABLED=false` → error frame + close
- [ ] CEFR level injected from active StudyPlan; fallback to "B1"
- [ ] End-to-end latency < 1.5s locally with GPU
- [ ] Barge-in functional: user can interrupt AI by speaking
- [ ] Gapless audio without gaps between sentences
- [ ] Automatic VAD operational with < 2% false positives
- [ ] Inactivity timeout closes session after configured time
- [ ] Max duration timeout closes session after configured time
- [ ] Warning sent 60s before any session close
- [ ] Session timeout options visible and saveable in /settings
- [ ] Conversation history maintained correctly during the session (in-memory only)
- [ ] No DB persistence of conversation history
- [ ] No regressions in Phases 1 and 2
