---
description: "LLM error handling strategy: malformed JSON responses, timeouts, retries, fallback logic, and user-facing error messages for all LLM providers (Ollama, OpenAI, Anthropic, DeepSeek)."
applyTo: "backend/app/services/llm_adapter.py, backend/app/services/*.py"
---

# LLM Error Handling — FreeLingo

## Failure scenarios

The LLM can fail in multiple ways. Every endpoint that calls the LLM must handle these:

| Scenario | Likelihood | Impact |
|----------|-----------|--------|
| **Malformed JSON** — LLM returns invalid JSON for `structured_output` | High (especially Ollama with small models) | Blocks quiz/plan/lesson generation |
| **Timeout** — Ollama takes > 30s on CPU | Medium (CPU-only Ollama) | Blocks any LLM request |
| **Empty response** — LLM returns no content | Low | Blocks generation |
| **Hallucinated schema** — response has wrong structure or missing fields | Medium | Causes Pydantic validation error |
| **Context overflow** — prompt exceeds model limit (esp. Gemma 12B) | Medium (long conversations) | Blocks chat |
| **Service unavailable** — Ollama down or unreachable | Low (local) / Medium (API) | Blocks everything |
| **Rate limited** — OpenAI/Anthropic quota exceeded | Medium (external APIs) | Blocks requests temporarily |

---

## Implementation

### `app/services/llm_adapter.py` — Resilient adapter

```python
import json
import asyncio
from typing import AsyncGenerator
from openai import AsyncOpenAI, APIError, APIConnectionError, RateLimitError, APITimeoutError

MAX_RETRIES = 2
RETRY_DELAY_SECONDS = 2
REQUEST_TIMEOUT = 60.0  # seconds


class LLMError(Exception):
    """Base for all LLM errors."""
    pass


class LLMTimeoutError(LLMError):
    pass


class LLMUnavailableError(LLMError):
    pass


class LLMResponseError(LLMError):
    """Malformed response, missing fields, or invalid JSON."""
    def __init__(self, message: str, raw_response: str | None = None):
        super().__init__(message)
        self.raw_response = raw_response


class LLMContextOverflowError(LLMError):
    pass


class LLMAdapter:
    # ... (existing __init__) ...

    async def _call_with_retry(self, fn, *args, **kwargs):
        """Call fn with exponential backoff on transient errors."""
        last_error = None
        for attempt in range(MAX_RETRIES + 1):
            try:
                return await fn(*args, **kwargs)
            except APITimeoutError:
                last_error = LLMTimeoutError(
                    f"{self.provider} timed out after {REQUEST_TIMEOUT}s"
                )
            except APIConnectionError:
                last_error = LLMUnavailableError(
                    f"{self.provider} is unreachable. Check that the service is running."
                )
            except RateLimitError:
                last_error = LLMUnavailableError(
                    f"{self.provider} rate limit exceeded. Try again later."
                )
            except Exception as e:
                last_error = LLMError(f"{self.provider} error: {str(e)}")

            if attempt < MAX_RETRIES:
                await asyncio.sleep(RETRY_DELAY_SECONDS * (attempt + 1))

        raise last_error

    async def chat(
        self, messages: list[dict], stream: bool = False
    ) -> str | AsyncGenerator:
        """Chat with retry on transient errors."""
        return await self._call_with_retry(self._do_chat, messages, stream)

    async def _do_chat(self, messages: list[dict], stream: bool = False):
        if self.provider == "anthropic":
            return await self._anthropic_chat(messages, stream)

        response = await self.client.chat.completions.create(
            model=self.model,
            messages=messages,
            stream=stream,
            timeout=REQUEST_TIMEOUT,
        )
        if stream:
            return response

        content = response.choices[0].message.content
        if not content:
            raise LLMResponseError("LLM returned empty response")
        return content

    async def structured_output(
        self, messages: list[dict], schema: type
    ) -> BaseModel:
        """Parse structured output with retry and fallback."""
        if self.provider in ("ollama", "deepseek"):
            # Ollama/DeepSeek don't support beta.chat.completions.parse natively
            return await self._structured_via_json(messages, schema)
        else:
            return await self._call_with_retry(
                self._do_structured_output, messages, schema
            )

    async def _do_structured_output(self, messages: list[dict], schema: type):
        response = await self.client.beta.chat.completions.parse(
            model=self.model,
            messages=messages,
            response_format=schema,
            timeout=REQUEST_TIMEOUT,
        )
        parsed = response.choices[0].message.parsed
        if parsed is None:
            raise LLMResponseError(
                "LLM refused to generate structured output",
                raw_response=str(response.choices[0].message.refusal or ""),
            )
        return parsed

    async def _structured_via_json(
        self, messages: list[dict], schema: type
    ) -> BaseModel:
        """For providers without native structured output, parse from JSON.
        Retries once with a correction prompt on failure."""
        messages_with_format = messages + [{
            "role": "system",
            "content": "IMPORTANT: Respond with ONLY a valid JSON object. "
                       "No markdown, no code fences, no extra text.",
        }]

        raw = await self._call_with_retry(self._do_chat, messages_with_format, False)

        try:
            # Strip markdown code fences if present
            cleaned = raw.strip()
            if cleaned.startswith("```"):
                cleaned = cleaned.split("\n", 1)[1] if "\n" in cleaned else cleaned[3:]
            if cleaned.endswith("```"):
                cleaned = cleaned[:-3]
            cleaned = cleaned.strip()
            return schema.model_validate(json.loads(cleaned))
        except (json.JSONDecodeError, ValueError, Exception) as e:
            # One retry with explicit error feedback
            retry_messages = messages_with_format + [
                {"role": "user", "content": f"That response was not valid JSON. Error: {str(e)}. Please return ONLY the JSON object."}
            ]
            try:
                raw2 = await self._call_with_retry(
                    self._do_chat, retry_messages, False
                )
                cleaned2 = raw2.strip().removeprefix("```json").removeprefix("```").removesuffix("```").strip()
                return schema.model_validate(json.loads(cleaned2))
            except Exception as e2:
                raise LLMResponseError(
                    f"Failed to parse JSON after retry: {str(e2)}",
                    raw_response=raw2 if 'raw2' in locals() else raw,
                )

    async def _anthropic_chat(self, messages: list[dict], stream: bool = False):
        """Anthropic-specific chat with retry wrapper."""
        async def call():
            system = next((m["content"] for m in messages if m["role"] == "system"), None)
            user_messages = [m for m in messages if m["role"] != "system"]

            response = await self._anthropic.messages.create(
                model=self.model,
                system=system,
                messages=user_messages,
                max_tokens=4096,
                stream=stream,
            )
            if stream:
                return response
            content = response.content[0].text if response.content else ""
            if not content:
                raise LLMResponseError("Anthropic returned empty response")
            return content

        return await self._call_with_retry(call)
```

---

## Service-layer error handling

### Assessment / Study Plan / Lesson generation

```python
async def generate_assessment_quiz() -> dict:
    try:
        quiz = await llm_adapter.structured_output(
            [{"role": "system", "content": ASSESSMENT_PROMPT}],
            QuizResponse,
        )
        return quiz.model_dump()
    except LLMResponseError as e:
        # Log raw response for debugging
        logger.error(f"Assessment quiz generation failed: {e}", extra={"raw": e.raw_response})
        raise HTTPException(
            status_code=502,
            detail="The AI model returned an invalid response. Please try again.",
        )
    except LLMTimeoutError:
        raise HTTPException(
            status_code=504,
            detail="The AI model took too long to respond. Try again or check your Ollama instance.",
        )
    except LLMUnavailableError as e:
        raise HTTPException(
            status_code=503,
            detail=f"AI service unavailable: {str(e)}",
        )
    except LLMError as e:
        logger.exception(f"Unexpected LLM error during assessment: {e}")
        raise HTTPException(
            status_code=502,
            detail="An unexpected error occurred with the AI model.",
        )
```

### Chat endpoint (SSE streaming)

```python
@router.post("/chat")
async def chat(request: ChatRequest, ...):
    try:
        async def event_stream():
            try:
                async for chunk in llm_adapter.chat(messages, stream=True):
                    if chunk.choices[0].delta.content:
                        yield f"data: {chunk.choices[0].delta.content}\n\n"
                yield "data: [DONE]\n\n"
            except LLMTimeoutError:
                yield "data: [ERROR] The AI model took too long. Please try again.\n\n"
            except LLMUnavailableError:
                yield "data: [ERROR] The AI service is currently unavailable.\n\n"
            except LLMError:
                yield "data: [ERROR] Something went wrong. Please try again.\n\n"

        return StreamingResponse(event_stream(), media_type="text/event-stream")
    # ... (existing auth/deps) ...
```

---

## Context overflow handling

When token count exceeds the model's context window, truncate conversation history:

```python
MAX_CONTEXT_TOKENS = {
    "openai": 128000,
    "anthropic": 200000,
    "deepseek": 128000,
    "ollama": 8192,  # gemma3:12b default — adjust per model
}

def trim_messages(messages: list[dict], max_tokens: int, min_keep: int = 2) -> list[dict]:
    """Trim oldest messages to fit within max_tokens.
    Always keeps system message + last `min_keep` messages."""
    system = [m for m in messages if m["role"] == "system"]
    rest = [m for m in messages if m["role"] != "system"]

    # Estimate tokens: ~4 chars per token for English
    def estimate_tokens(msg: dict) -> int:
        return len(msg["content"]) // 4

    total = sum(estimate_tokens(m) for m in messages)
    if total <= max_tokens:
        return messages

    # Drop oldest messages first, keeping min_keep
    while len(rest) > min_keep and sum(estimate_tokens(m) for m in system + rest) > max_tokens:
        rest.pop(0)

    return system + rest
```

Apply trimming before every chat and structured output call:

```python
trimmed = trim_messages(messages, MAX_CONTEXT_TOKENS[self.provider])
```

---

## User-facing error messages

| Situation | HTTP Status | User Message |
|-----------|-------------|-------------|
| Malformed JSON | 502 | "The AI returned an invalid response. Please try again." |
| Timeout (>60s) | 504 | "The AI took too long. Check that Ollama is running or try a smaller model." |
| Unreachable | 503 | "AI service is not reachable. Make sure Ollama is running." |
| Rate limited | 429 | "Too many requests. Please wait a moment." |
| Context overflow | 413 | "The conversation is too long. Start a new session." |
| Empty response | 502 | "The AI returned no content. Try rephrasing your request." |

---

## Validation

In `backend/tests/test_llm_adapter.py`:

```python
async def test_structured_output_retry_on_malformed_json(mock_llm_response):
    """LLM returns invalid JSON on first call, valid on second."""
    # ...

async def test_structured_output_strips_markdown_fences():
    """```json ...``` is stripped before parsing."""
    # ...

async def test_chat_timeout_raises_llm_timeout():
    """Timeout triggers LLMTimeoutError after max retries."""
    # ...

async def test_chat_empty_response_raises_llm_response_error():
    """Empty content raises LLMResponseError."""
    # ...

async def test_trim_messages_context_overflow():
    """Oldest messages are trimmed when context overflows."""
    # ...
```