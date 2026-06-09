from __future__ import annotations

from pydantic import BaseModel


class PhrasebookEntryResponse(BaseModel):
    text: str
    context: str
    register: str
    unit_ref: str | None = None


class PhrasebookCategoryResponse(BaseModel):
    id: str
    level: str
    situation: str
    icon: str
    phrases: list[PhrasebookEntryResponse]


class PhrasebookCategoriesResponse(BaseModel):
    categories: list[PhrasebookCategoryResponse]


class PhrasebookCategoryDetailResponse(BaseModel):
    category: PhrasebookCategoryResponse
