from __future__ import annotations

import asyncio
import json
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
        llm: object,
        tts: object,
        stt: object,
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
        self._inactivity_warning_sent = False

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
        self._inactivity_warning_sent = False  # reset on new activity
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
            await ws.send_json({"type": "transcript", "role": "user", "text": user_text, "final": True})
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
        await ws.send_json({"type": "transcript", "role": "assistant", "text": full_response, "final": True})
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
                "remaining_seconds": WARNING_ADVANCE_SECONDS,
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

            if 0 < remaining <= WARNING_ADVANCE_SECONDS and not self._inactivity_warning_sent:
                self._inactivity_warning_sent = True
                await ws.send_json({
                    "type": "session_warning",
                    "reason": "inactivity",
                    "remaining_seconds": int(remaining),
                })

            if elapsed >= self.inactivity_timeout:
                await ws.send_json({"type": "session_end", "reason": "inactivity"})
                await ws.close(code=1000)
                return
