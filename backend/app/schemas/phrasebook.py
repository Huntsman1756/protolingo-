from __future__ import annotations

import warnings

from pydantic import BaseModel

warnings.filterwarnings(
    "ignore",
    message=r'Field name "register" in "PhrasebookEntryResponse" shadows.*',
    category=UserWarning,
)


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
