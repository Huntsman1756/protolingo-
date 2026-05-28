from __future__ import annotations

from datetime import datetime

from pydantic import BaseModel, Field, field_serializer

# ---------------------------------------------------------------------------
# Shared author info embedded in responses
# ---------------------------------------------------------------------------


class FeedbackAuthor(BaseModel):
    id: int
    username: str
    display_name: str

    model_config = {"from_attributes": True}


# ---------------------------------------------------------------------------
# FeedbackEntry — request schemas
# ---------------------------------------------------------------------------


class FeedbackEntryCreate(BaseModel):
    type: str = Field(..., pattern="^(feature|bug)$")
    title: str = Field(..., min_length=1, max_length=200)
    description: str = Field(..., min_length=1, max_length=5000)


# ---------------------------------------------------------------------------
# FeedbackComment — defined before FeedbackEntryDetail which references it
# ---------------------------------------------------------------------------


class FeedbackCommentOut(BaseModel):
    id: int
    entry_id: int
    author: FeedbackAuthor
    body: str
    created_at: datetime

    @field_serializer("created_at")
    def serialize_created_at(self, v: datetime, _info: object) -> str:
        return v.isoformat()


class FeedbackCommentsResponse(BaseModel):
    items: list[FeedbackCommentOut]
    total: int


# ---------------------------------------------------------------------------
# FeedbackEntry — response schemas
# ---------------------------------------------------------------------------


class FeedbackEntryOut(BaseModel):
    id: int
    type: str
    title: str
    description: str
    status: str
    author: FeedbackAuthor
    vote_count: int
    voted_by_me: bool = False  # injected per-request, not from ORM directly
    comment_count: int = 0  # injected per-request
    created_at: datetime

    @field_serializer("created_at")
    def serialize_created_at(self, v: datetime, _info: object) -> str:
        return v.isoformat()


class FeedbackEntryDetail(FeedbackEntryOut):
    """Extended view with comments included."""

    comments: list[FeedbackCommentOut] = []


class PaginatedFeedbackResponse(BaseModel):
    items: list[FeedbackEntryOut]
    total: int
    skip: int
    limit: int


# ---------------------------------------------------------------------------
# FeedbackVote — response
# ---------------------------------------------------------------------------


class FeedbackVoteResponse(BaseModel):
    voted: bool  # True = vote added, False = vote removed
    vote_count: int  # updated count after the toggle


# ---------------------------------------------------------------------------
# FeedbackComment — request schema
# ---------------------------------------------------------------------------


class FeedbackCommentCreate(BaseModel):
    body: str = Field(..., min_length=1, max_length=2000)


# ---------------------------------------------------------------------------
# Admin — status update
# ---------------------------------------------------------------------------


class FeedbackStatusUpdate(BaseModel):
    status: str = Field(..., pattern="^(pending|planned|in_progress|done|declined)$")
