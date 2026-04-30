from __future__ import annotations

import asyncio
import json
from collections.abc import AsyncGenerator

import anthropic as _anthropic
from openai import AsyncOpenAI
from pydantic import BaseModel

from app.core.config import settings

MAX_RETRIES = 2
RETRY_DELAY_SECONDS = 2
REQUEST_TIMEOUT = 60.0

MAX_CONTEXT_TOKENS = {
    "openai": 128000,
    "anthropic": 200000,
    "deepseek": 128000,
    "ollama": 8192,
}


class LLMError(Exception):
    pass


class LLMTimeoutError(LLMError):
    pass


class LLMUnavailableError(LLMError):
    pass


class LLMResponseError(LLMError):
    def __init__(self, message: str, raw_response: str | None = None):
        super().__init__(message)
        self.raw_response = raw_response


class LLMContextOverflowError(LLMError):
    pass


class LLMAdapter:
    def __init__(self):
        self.provider = settings.LLM_PROVIDER
        if self.provider == "ollama":
            self.client = AsyncOpenAI(
                base_url=f"{settings.OLLAMA_BASE_URL}/v1",
                api_key="ollama",
            )
            self.model = settings.OLLAMA_MODEL
        elif self.provider == "openai":
            self.client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY)
            self.model = settings.OPENAI_MODEL
        elif self.provider == "deepseek":
            self.client = AsyncOpenAI(
                base_url="https://api.deepseek.com/v1",
                api_key=settings.DEEPSEEK_API_KEY,
            )
            self.model = settings.DEEPSEEK_MODEL
        elif self.provider == "anthropic":
            self._anthropic = _anthropic.AsyncAnthropic(api_key=settings.ANTHROPIC_API_KEY)
            self.client = None
            self.model = settings.ANTHROPIC_MODEL

    async def _call_with_retry(self, fn, *args, **kwargs):
        last_error = None
        for attempt in range(MAX_RETRIES + 1):
            try:
                return await fn(*args, **kwargs)
            except TimeoutError:
                last_error = LLMTimeoutError(f"{self.provider} timed out after {REQUEST_TIMEOUT}s")
            except Exception as e:
                error_msg = str(e)
                if "connection" in error_msg.lower():
                    last_error = LLMUnavailableError(
                        f"{self.provider} is unreachable. Check that the service is running."
                    )
                elif "rate" in error_msg.lower():
                    last_error = LLMUnavailableError(
                        f"{self.provider} rate limit exceeded. Try again later."
                    )
                else:
                    last_error = LLMError(f"{self.provider} error: {error_msg}")

            if attempt < MAX_RETRIES:
                await asyncio.sleep(RETRY_DELAY_SECONDS * (attempt + 1))

        raise last_error

    async def chat(
        self, messages: list[dict], stream: bool = False
    ) -> str | AsyncGenerator:
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
        self, messages: list[dict], schema: type[BaseModel]
    ) -> BaseModel:
        # Use JSON mode for all providers — more reliable across versions
        if self.provider == "anthropic":
            return await self._call_with_retry(self._do_structured_output, messages, schema)
        return await self._structured_via_json(messages, schema)

    async def _do_structured_output(self, messages: list[dict], schema: type[BaseModel]):
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
        self, messages: list[dict], schema: type[BaseModel]
    ) -> BaseModel:
        messages_with_format = messages + [{
            "role": "system",
            "content": (
                "IMPORTANT: Respond with ONLY a valid JSON object. "
                "No markdown, no code fences, no extra text."
            ),
        }]

        raw = await self._call_with_retry(self._do_chat, messages_with_format, False)

        cleaned = raw.strip()
        if cleaned.startswith("```"):
            cleaned = cleaned.split("\n", 1)[1] if "\n" in cleaned else cleaned[3:]
        if cleaned.endswith("```"):
            cleaned = cleaned[:-3]
        cleaned = cleaned.strip()

        try:
            return schema.model_validate(json.loads(cleaned))
        except (json.JSONDecodeError, ValueError) as e:
            retry_messages = messages_with_format + [{
                "role": "user",
                "content": (
                    f"That response was not valid JSON. Error: {str(e)}. "
                    "Please return ONLY the JSON object."
                ),
            }]
            try:
                raw2 = await self._call_with_retry(self._do_chat, retry_messages, False)
                cleaned2 = (
                    raw2.strip()
                    .removeprefix("```json")
                    .removeprefix("```")
                    .removesuffix("```")
                    .strip()
                )
                return schema.model_validate(json.loads(cleaned2))
            except Exception as e2:
                raise LLMResponseError(
                    f"Failed to parse JSON after retry: {str(e2)}",
                    raw_response=raw2 if 'raw2' in locals() else raw,
                ) from e2

    async def _anthropic_chat(self, messages: list[dict], stream: bool = False):
        async def call():
            system = next(
                (m["content"] for m in messages if m["role"] == "system"), None
            )
            user_messages = [
                m for m in messages if m["role"] != "system"
            ]

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


llm_adapter = LLMAdapter()
