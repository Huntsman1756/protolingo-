"""Feedback router — feature requests and bug reports with voting and comments."""

from __future__ import annotations

import asyncio
from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException, Query, Request, status
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.deps import get_current_user, require_admin
from app.core.limiter import limiter
from app.models.feedback import FeedbackComment, FeedbackEntry, FeedbackVote
from app.models.user import User
from app.schemas.feedback import (
    FeedbackAuthor,
    FeedbackCommentCreate,
    FeedbackCommentOut,
    FeedbackCommentsResponse,
    FeedbackEntryCreate,
    FeedbackEntryDetail,
    FeedbackEntryOut,
    FeedbackStatusUpdate,
    FeedbackVoteResponse,
    PaginatedFeedbackResponse,
)
from app.services import email_service
from app.utils.pagination import paginate

router = APIRouter(prefix="/api/feedback", tags=["feedback"])


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------


def _utcnow() -> datetime:
    return datetime.now(timezone.utc).replace(tzinfo=None)


async def _get_entry_or_404(entry_id: int, db: AsyncSession) -> FeedbackEntry:
    entry = await db.get(FeedbackEntry, entry_id)
    if not entry:
        raise HTTPException(status_code=404, detail="feedback_entry_not_found")
    return entry


async def _build_entry_out(
    entry: FeedbackEntry,
    current_user: User,
    db: AsyncSession,
) -> FeedbackEntryOut:
    """Enrich a FeedbackEntry ORM object with author info, vote status, and comment count."""
    author = await db.get(User, entry.author_id)
    voted = await db.scalar(
        select(FeedbackVote).where(
            FeedbackVote.entry_id == entry.id,
            FeedbackVote.user_id == current_user.id,
        )
    )
    comment_count = await db.scalar(
        select(func.count())
        .select_from(FeedbackComment)
        .where(FeedbackComment.entry_id == entry.id)
    )
    return FeedbackEntryOut(
        id=entry.id,
        type=entry.type,
        title=entry.title,
        description=entry.description,
        status=entry.status,
        author=FeedbackAuthor(
            id=author.id,
            username=author.username,
            display_name=author.display_name,
        ),
        vote_count=entry.vote_count,
        voted_by_me=voted is not None,
        comment_count=comment_count or 0,
        created_at=entry.created_at,
    )


# ---------------------------------------------------------------------------
# GET /api/feedback — list entries (paginated, filtered, sorted)
# ---------------------------------------------------------------------------


@router.get("", response_model=PaginatedFeedbackResponse)
@limiter.limit("60/minute")
async def list_feedback(
    request: Request,
    type: str | None = Query(default=None, pattern="^(feature|bug)$"),
    status_filter: str | None = Query(
        default=None,
        alias="status",
        pattern="^(pending|planned|in_progress|done|declined)$",
    ),
    sort: str = Query(default="votes", pattern="^(votes|date)$"),
    order: str = Query(default="desc", pattern="^(asc|desc)$"),
    skip: int = Query(default=0, ge=0),
    limit: int = Query(default=20, ge=1, le=100),
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> PaginatedFeedbackResponse:
    """Return a paginated list of feedback entries."""
    stmt = select(FeedbackEntry)
    if type:
        stmt = stmt.where(FeedbackEntry.type == type)
    if status_filter:
        stmt = stmt.where(FeedbackEntry.status == status_filter)

    # Sorting
    if sort == "votes":
        sort_col = FeedbackEntry.vote_count
    else:
        sort_col = FeedbackEntry.created_at

    stmt = stmt.order_by(sort_col.desc() if order == "desc" else sort_col.asc())

    entries, total = await paginate(db, stmt, skip, limit)

    items = [await _build_entry_out(e, current_user, db) for e in entries]

    return PaginatedFeedbackResponse(items=items, total=total, skip=skip, limit=limit)


# ---------------------------------------------------------------------------
# POST /api/feedback — create entry
# ---------------------------------------------------------------------------


@router.post("", response_model=FeedbackEntryOut, status_code=status.HTTP_201_CREATED)
@limiter.limit("10/hour")
async def create_feedback(
    request: Request,
    body: FeedbackEntryCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> FeedbackEntryOut:
    """Create a new feature request or bug report."""
    entry = FeedbackEntry(
        type=body.type,
        title=body.title.strip(),
        description=body.description.strip(),
        status="pending",
        author_id=current_user.id,
        vote_count=0,
        created_at=_utcnow(),
    )
    db.add(entry)
    await db.commit()
    await db.refresh(entry)
    asyncio.create_task(
        email_service.send_feedback_notification(
            entry_type=entry.type,
            title=entry.title,
            description=entry.description,
            author_username=current_user.username,
            entry_id=entry.id,
        )
    )
    return await _build_entry_out(entry, current_user, db)


# ---------------------------------------------------------------------------
# GET /api/feedback/{entry_id} — entry detail with comments
# ---------------------------------------------------------------------------


@router.get("/{entry_id}", response_model=FeedbackEntryDetail)
@limiter.limit("60/minute")
async def get_feedback(
    request: Request,
    entry_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> FeedbackEntryDetail:
    """Return a single feedback entry with its full comment thread."""
    entry = await _get_entry_or_404(entry_id, db)
    base = await _build_entry_out(entry, current_user, db)

    # Fetch comments ordered by created_at ASC
    result = await db.execute(
        select(FeedbackComment)
        .where(FeedbackComment.entry_id == entry_id)
        .order_by(FeedbackComment.created_at.asc())
    )
    comments_raw = result.scalars().all()

    comments: list[FeedbackCommentOut] = []
    for c in comments_raw:
        author = await db.get(User, c.author_id)
        comments.append(
            FeedbackCommentOut(
                id=c.id,
                entry_id=c.entry_id,
                author=FeedbackAuthor(
                    id=author.id,
                    username=author.username,
                    display_name=author.display_name,
                ),
                body=c.body,
                created_at=c.created_at,
            )
        )

    return FeedbackEntryDetail(**base.model_dump(), comments=comments)


# ---------------------------------------------------------------------------
# DELETE /api/feedback/{entry_id} — delete entry (author or admin)
# ---------------------------------------------------------------------------


@router.delete("/{entry_id}", status_code=status.HTTP_204_NO_CONTENT)
@limiter.limit("20/minute")
async def delete_feedback(
    request: Request,
    entry_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> None:
    """Delete a feedback entry. Author can delete their own; admin can delete any."""
    entry = await _get_entry_or_404(entry_id, db)
    if entry.author_id != current_user.id and current_user.role != "admin":
        raise HTTPException(status_code=403, detail="forbidden")
    await db.delete(entry)
    await db.commit()


# ---------------------------------------------------------------------------
# POST /api/feedback/{entry_id}/vote — toggle vote (features only)
# ---------------------------------------------------------------------------


@router.post("/{entry_id}/vote", response_model=FeedbackVoteResponse)
@limiter.limit("30/minute")
async def toggle_vote(
    request: Request,
    entry_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> FeedbackVoteResponse:
    """Toggle the current user's vote on a feature request. Bugs cannot be voted."""
    entry = await _get_entry_or_404(entry_id, db)
    if entry.type != "feature":
        raise HTTPException(status_code=400, detail="only_features_are_voteable")

    existing = await db.scalar(
        select(FeedbackVote).where(
            FeedbackVote.entry_id == entry_id,
            FeedbackVote.user_id == current_user.id,
        )
    )

    if existing:
        # Remove vote
        await db.delete(existing)
        entry.vote_count = max(0, entry.vote_count - 1)
        voted = False
    else:
        # Add vote
        db.add(FeedbackVote(entry_id=entry_id, user_id=current_user.id, created_at=_utcnow()))
        entry.vote_count += 1
        voted = True

    await db.commit()
    await db.refresh(entry)
    return FeedbackVoteResponse(voted=voted, vote_count=entry.vote_count)


# ---------------------------------------------------------------------------
# PATCH /api/feedback/{entry_id}/status — update status (admin only)
# ---------------------------------------------------------------------------


@router.patch("/{entry_id}/status", response_model=FeedbackEntryOut)
@limiter.limit("30/minute")
async def update_status(
    request: Request,
    entry_id: int,
    body: FeedbackStatusUpdate,
    current_user: User = Depends(require_admin),
    db: AsyncSession = Depends(get_db),
) -> FeedbackEntryOut:
    """Update the status of a feedback entry. Admin only."""
    entry = await _get_entry_or_404(entry_id, db)
    entry.status = body.status
    await db.commit()
    await db.refresh(entry)
    return await _build_entry_out(entry, current_user, db)


# ---------------------------------------------------------------------------
# GET /api/feedback/{entry_id}/comments — list comments
# ---------------------------------------------------------------------------


@router.get("/{entry_id}/comments", response_model=FeedbackCommentsResponse)
@limiter.limit("60/minute")
async def list_comments(
    request: Request,
    entry_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> FeedbackCommentsResponse:
    """Return all comments for a feedback entry ordered by date ascending."""
    await _get_entry_or_404(entry_id, db)

    result = await db.execute(
        select(FeedbackComment)
        .where(FeedbackComment.entry_id == entry_id)
        .order_by(FeedbackComment.created_at.asc())
    )
    comments_raw = result.scalars().all()

    items: list[FeedbackCommentOut] = []
    for c in comments_raw:
        author = await db.get(User, c.author_id)
        items.append(
            FeedbackCommentOut(
                id=c.id,
                entry_id=c.entry_id,
                author=FeedbackAuthor(
                    id=author.id,
                    username=author.username,
                    display_name=author.display_name,
                ),
                body=c.body,
                created_at=c.created_at,
            )
        )

    return FeedbackCommentsResponse(items=items, total=len(items))


# ---------------------------------------------------------------------------
# POST /api/feedback/{entry_id}/comments — add comment
# ---------------------------------------------------------------------------


@router.post(
    "/{entry_id}/comments",
    response_model=FeedbackCommentOut,
    status_code=status.HTTP_201_CREATED,
)
@limiter.limit("20/hour")
async def add_comment(
    request: Request,
    entry_id: int,
    body: FeedbackCommentCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> FeedbackCommentOut:
    """Add a comment to a feedback entry."""
    await _get_entry_or_404(entry_id, db)

    comment = FeedbackComment(
        entry_id=entry_id,
        author_id=current_user.id,
        body=body.body.strip(),
        created_at=_utcnow(),
    )
    db.add(comment)
    await db.commit()
    await db.refresh(comment)

    return FeedbackCommentOut(
        id=comment.id,
        entry_id=comment.entry_id,
        author=FeedbackAuthor(
            id=current_user.id,
            username=current_user.username,
            display_name=current_user.display_name,
        ),
        body=comment.body,
        created_at=comment.created_at,
    )


# ---------------------------------------------------------------------------
# DELETE /api/feedback/{entry_id}/comments/{comment_id} — delete comment
# ---------------------------------------------------------------------------


@router.delete(
    "/{entry_id}/comments/{comment_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
@limiter.limit("20/minute")
async def delete_comment(
    request: Request,
    entry_id: int,
    comment_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> None:
    """Delete a comment. Author can delete their own; admin can delete any."""
    await _get_entry_or_404(entry_id, db)

    comment = await db.get(FeedbackComment, comment_id)
    if not comment or comment.entry_id != entry_id:
        raise HTTPException(status_code=404, detail="comment_not_found")
    if comment.author_id != current_user.id and current_user.role != "admin":
        raise HTTPException(status_code=403, detail="forbidden")

    await db.delete(comment)
    await db.commit()
