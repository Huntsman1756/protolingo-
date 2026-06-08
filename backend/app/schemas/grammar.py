from __future__ import annotations

from pydantic import BaseModel


class GrammarExampleResponse(BaseModel):
    text: str
    translation: str | None = None
    note: str | None = None


class GrammarMistakeResponse(BaseModel):
    wrong: str
    correct: str
    note: str


class GrammarTopicResponse(BaseModel):
    slug: str
    title: str
    level: str
    category: str
    summary: str
    explanation: str
    structure: str | None = None
    rules: list[str]
    examples: list[GrammarExampleResponse]
    common_mistakes: list[GrammarMistakeResponse]
    related: list[str]


class GrammarTopicsResponse(BaseModel):
    topics: list[GrammarTopicResponse]


class GrammarTopicDetailResponse(BaseModel):
    topic: GrammarTopicResponse
