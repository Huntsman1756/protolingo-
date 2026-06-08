from __future__ import annotations

from pydantic import BaseModel


class VocabularyEntryResponse(BaseModel):
    word: str
    pos: str
    definition: str
    example: str
    ipa: str | None = None
    frequency_rank: int | None = None


class VocabularySetResponse(BaseModel):
    id: str
    level: str
    topic: str
    unit_ref: str
    words: list[VocabularyEntryResponse]


class VocabularySetsResponse(BaseModel):
    sets: list[VocabularySetResponse]


class VocabularySetDetailResponse(BaseModel):
    set: VocabularySetResponse
