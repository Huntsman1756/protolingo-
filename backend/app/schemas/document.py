from __future__ import annotations

from datetime import datetime

from pydantic import BaseModel


class DocumentOut(BaseModel):
    id: int
    filename: str
    file_size: int
    file_type: str
    title: str
    status: str
    chunk_count: int
    error_message: str | None = None
    created_at: datetime


class DocumentListResponse(BaseModel):
    items: list[DocumentOut]
    total: int
    skip: int
    limit: int


class DocumentUploadResponse(BaseModel):
    id: int
    status: str
    title: str


class CitationOut(BaseModel):
    document_id: int | None = None
    document_title: str | None = None
    chunk_index: int
    content: str
    relevance_score: float


class QueryRequest(BaseModel):
    query: str


class QueryResponse(BaseModel):
    answer: str
    citations: list[CitationOut]
    document_id: int | None = None
    document_title: str | None = None
