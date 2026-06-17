"""Feedback endpoint tests: list, create, detail, delete, vote, status, comments."""

from __future__ import annotations

import pytest

# ── GET /api/feedback — list ──────────────────────────────────────────────────


@pytest.mark.asyncio
async def test_list_feedback_empty(client, test_user):
    """An empty list is returned when no entries exist."""
    _, headers = test_user
    response = await client.get("/api/feedback", headers=headers)
    assert response.status_code == 200
    data = response.json()
    assert data["items"] == []
    assert data["total"] == 0
    assert data["skip"] == 0


@pytest.mark.asyncio
async def test_list_feedback_requires_auth(client):
    """Unauthenticated requests are rejected."""
    response = await client.get("/api/feedback")
    assert response.status_code == 401


@pytest.mark.asyncio
async def test_list_feedback_pagination(client, test_user, db_session):
    """Multiple entries are paginated correctly."""
    from datetime import datetime, timezone

    from app.models.feedback import FeedbackEntry

    user, headers = test_user

    now = datetime.now(timezone.utc).replace(tzinfo=None)
    for i in range(5):
        db_session.add(
            FeedbackEntry(
                type="feature",
                title=f"Feature {i}",
                description=f"Desc {i}",
                status="pending",
                author_id=user.id,
                vote_count=10 - i,
                created_at=now,
            )
        )
    await db_session.commit()

    # Page 1: 3 items
    resp = await client.get("/api/feedback?skip=0&limit=3", headers=headers)
    assert resp.status_code == 200
    data = resp.json()
    assert len(data["items"]) == 3
    assert data["total"] == 5
    assert data["limit"] == 3

    # Page 2: 2 items (disjoint from page 1)
    resp2 = await client.get("/api/feedback?skip=3&limit=3", headers=headers)
    assert resp2.status_code == 200
    data2 = resp2.json()
    assert len(data2["items"]) == 2

    ids1 = {e["id"] for e in data["items"]}
    ids2 = {e["id"] for e in data2["items"]}
    assert ids1.isdisjoint(ids2)


@pytest.mark.asyncio
async def test_list_feedback_filter_by_type(client, test_user, db_session):
    """Filtering by type=feature or type=bug works."""
    from datetime import datetime, timezone

    from app.models.feedback import FeedbackEntry

    user, headers = test_user
    now = datetime.now(timezone.utc).replace(tzinfo=None)

    db_session.add(
        FeedbackEntry(
            type="feature",
            title="F1",
            description="d",
            status="pending",
            author_id=user.id,
            created_at=now,
        )
    )
    db_session.add(
        FeedbackEntry(
            type="bug",
            title="B1",
            description="d",
            status="pending",
            author_id=user.id,
            created_at=now,
        )
    )
    await db_session.commit()

    resp_feat = await client.get("/api/feedback?type=feature", headers=headers)
    assert resp_feat.status_code == 200
    items_f = resp_feat.json()["items"]
    assert all(e["type"] == "feature" for e in items_f)

    resp_bug = await client.get("/api/feedback?type=bug", headers=headers)
    assert resp_bug.status_code == 200
    items_b = resp_bug.json()["items"]
    assert all(e["type"] == "bug" for e in items_b)


@pytest.mark.asyncio
async def test_list_feedback_filter_by_status(client, test_user, db_session):
    """Filtering by status works."""
    from datetime import datetime, timezone

    from app.models.feedback import FeedbackEntry

    user, headers = test_user
    now = datetime.now(timezone.utc).replace(tzinfo=None)

    db_session.add(
        FeedbackEntry(
            type="feature",
            title="Done",
            description="d",
            status="done",
            author_id=user.id,
            created_at=now,
        )
    )
    db_session.add(
        FeedbackEntry(
            type="feature",
            title="Pending",
            description="d",
            status="pending",
            author_id=user.id,
            created_at=now,
        )
    )
    await db_session.commit()

    resp = await client.get("/api/feedback?status=done", headers=headers)
    assert resp.status_code == 200
    items = resp.json()["items"]
    assert len(items) == 1
    assert items[0]["status"] == "done"


@pytest.mark.asyncio
async def test_list_feedback_search_by_title_and_description(client, test_user, db_session):
    """Filtering by q searches title and description."""
    from datetime import datetime, timezone

    from app.models.feedback import FeedbackEntry

    user, headers = test_user
    now = datetime.now(timezone.utc).replace(tzinfo=None)
    db_session.add(
        FeedbackEntry(
            type="feature",
            title="Calendar practice mode",
            description="Unrelated body",
            status="pending",
            author_id=user.id,
            created_at=now,
        )
    )
    db_session.add(
        FeedbackEntry(
            type="bug",
            title="Generic title",
            description="Audio calendar playback fails",
            status="pending",
            author_id=user.id,
            created_at=now,
        )
    )
    db_session.add(
        FeedbackEntry(
            type="feature",
            title="Vocabulary export",
            description="Download words as CSV",
            status="pending",
            author_id=user.id,
            created_at=now,
        )
    )
    await db_session.commit()

    resp = await client.get("/api/feedback?q=calendar", headers=headers)
    assert resp.status_code == 200
    titles = {entry["title"] for entry in resp.json()["items"]}
    assert titles == {"Calendar practice mode", "Generic title"}


@pytest.mark.asyncio
async def test_list_feedback_search_by_author(client, test_user, db_session):
    """Filtering by q searches author username and display name."""
    from datetime import datetime, timezone

    from app.core.security import hash_password
    from app.models.feedback import FeedbackEntry
    from app.models.user import User

    user, headers = test_user
    author = User(
        username="feedbackauthor",
        email="feedbackauthor@test.com",
        display_name="Special Author",
        hashed_password=hash_password("pass1234"),
        role="user",
        native_language="es",
        is_active=True,
    )
    db_session.add(author)
    await db_session.flush()

    now = datetime.now(timezone.utc).replace(tzinfo=None)
    db_session.add(
        FeedbackEntry(
            type="feature",
            title="Author match",
            description="Matches by display name",
            status="pending",
            author_id=author.id,
            created_at=now,
        )
    )
    db_session.add(
        FeedbackEntry(
            type="feature",
            title="Other author",
            description="Does not match",
            status="pending",
            author_id=user.id,
            created_at=now,
        )
    )
    await db_session.commit()

    resp = await client.get("/api/feedback?q=special", headers=headers)
    assert resp.status_code == 200
    items = resp.json()["items"]
    assert len(items) == 1
    assert items[0]["title"] == "Author match"
    assert items[0]["author"]["username"] == "feedbackauthor"


@pytest.mark.asyncio
async def test_list_feedback_sorted_by_votes(client, test_user, db_session):
    """Default sort is by votes descending."""
    from datetime import datetime, timezone

    from app.models.feedback import FeedbackEntry

    user, headers = test_user
    now = datetime.now(timezone.utc).replace(tzinfo=None)

    db_session.add(
        FeedbackEntry(
            type="feature",
            title="Low",
            description="d",
            status="pending",
            author_id=user.id,
            vote_count=1,
            created_at=now,
        )
    )
    db_session.add(
        FeedbackEntry(
            type="feature",
            title="High",
            description="d",
            status="pending",
            author_id=user.id,
            vote_count=5,
            created_at=now,
        )
    )
    db_session.add(
        FeedbackEntry(
            type="feature",
            title="Mid",
            description="d",
            status="pending",
            author_id=user.id,
            vote_count=3,
            created_at=now,
        )
    )
    await db_session.commit()

    resp = await client.get("/api/feedback?sort=votes&order=desc", headers=headers)
    assert resp.status_code == 200
    items = resp.json()["items"]
    votes = [e["vote_count"] for e in items]
    assert votes == sorted(votes, reverse=True)


@pytest.mark.asyncio
async def test_list_feedback_sorted_by_date(client, test_user, db_session):
    """Sorting by date works."""
    from datetime import datetime, timezone

    from app.models.feedback import FeedbackEntry

    user, headers = test_user
    now = datetime.now(timezone.utc).replace(tzinfo=None)

    from datetime import timedelta

    db_session.add(
        FeedbackEntry(
            type="feature",
            title="Old",
            description="d",
            status="pending",
            author_id=user.id,
            vote_count=0,
            created_at=now - timedelta(days=2),
        )
    )
    db_session.add(
        FeedbackEntry(
            type="feature",
            title="New",
            description="d",
            status="pending",
            author_id=user.id,
            vote_count=0,
            created_at=now,
        )
    )
    await db_session.commit()

    resp = await client.get("/api/feedback?sort=date&order=desc", headers=headers)
    assert resp.status_code == 200
    items = resp.json()["items"]
    assert items[0]["title"] == "New"


# ── POST /api/feedback — create ───────────────────────────────────────────────


@pytest.mark.asyncio
async def test_create_feature_request(client, test_user):
    """A feature request can be created and returned."""
    _, headers = test_user
    resp = await client.post(
        "/api/feedback",
        headers=headers,
        json={
            "type": "feature",
            "title": "Dark mode",
            "description": "Please add dark mode support.",
        },
    )
    assert resp.status_code == 201
    data = resp.json()
    assert data["type"] == "feature"
    assert data["title"] == "Dark mode"
    assert data["status"] == "pending"
    assert data["vote_count"] == 0
    assert data["voted_by_me"] is False
    assert data["comment_count"] == 0
    assert "author" in data


@pytest.mark.asyncio
async def test_create_bug_report(client, test_user):
    """A bug report can be created."""
    _, headers = test_user
    resp = await client.post(
        "/api/feedback",
        headers=headers,
        json={
            "type": "bug",
            "title": "Crash on login",
            "description": "App crashes when I click login.",
        },
    )
    assert resp.status_code == 201
    assert resp.json()["type"] == "bug"


@pytest.mark.asyncio
async def test_create_feedback_requires_auth(client):
    """Unauthenticated create is rejected."""
    resp = await client.post(
        "/api/feedback",
        json={"type": "feature", "title": "X", "description": "Y"},
    )
    assert resp.status_code == 401


@pytest.mark.asyncio
async def test_create_feedback_invalid_type(client, test_user):
    """Invalid type returns 422."""
    _, headers = test_user
    resp = await client.post(
        "/api/feedback",
        headers=headers,
        json={"type": "invalid", "title": "X", "description": "Y"},
    )
    assert resp.status_code == 422


@pytest.mark.asyncio
async def test_create_feedback_empty_title(client, test_user):
    """Empty title returns 422."""
    _, headers = test_user
    resp = await client.post(
        "/api/feedback",
        headers=headers,
        json={"type": "feature", "title": "", "description": "Y"},
    )
    assert resp.status_code == 422


@pytest.mark.asyncio
async def test_create_feedback_empty_description(client, test_user):
    """Empty description returns 422."""
    _, headers = test_user
    resp = await client.post(
        "/api/feedback",
        headers=headers,
        json={"type": "feature", "title": "X", "description": ""},
    )
    assert resp.status_code == 422


# ── GET /api/feedback/{id} — detail ───────────────────────────────────────────


@pytest.mark.asyncio
async def test_get_feedback_detail(client, test_user, db_session):
    """Detail returns the entry with empty comments list."""
    from datetime import datetime, timezone

    from app.models.feedback import FeedbackEntry

    user, headers = test_user
    entry = FeedbackEntry(
        type="feature",
        title="Detail test",
        description="Full desc",
        status="pending",
        author_id=user.id,
        created_at=datetime.now(timezone.utc).replace(tzinfo=None),
    )
    db_session.add(entry)
    await db_session.commit()
    await db_session.refresh(entry)

    resp = await client.get(f"/api/feedback/{entry.id}", headers=headers)
    assert resp.status_code == 200
    data = resp.json()
    assert data["id"] == entry.id
    assert data["title"] == "Detail test"
    assert data["comments"] == []


@pytest.mark.asyncio
async def test_get_feedback_not_found(client, test_user):
    """Non-existent entry returns 404."""
    _, headers = test_user
    resp = await client.get("/api/feedback/99999", headers=headers)
    assert resp.status_code == 404


@pytest.mark.asyncio
async def test_get_feedback_requires_auth(client):
    """Unauthenticated detail is rejected."""
    resp = await client.get("/api/feedback/1")
    assert resp.status_code == 401


# ── DELETE /api/feedback/{id} ─────────────────────────────────────────────────


@pytest.mark.asyncio
async def test_delete_own_entry(client, test_user, db_session):
    """Author can delete their own entry."""
    from datetime import datetime, timezone

    from app.models.feedback import FeedbackEntry

    user, headers = test_user
    entry = FeedbackEntry(
        type="feature",
        title="To delete",
        description="d",
        status="pending",
        author_id=user.id,
        created_at=datetime.now(timezone.utc).replace(tzinfo=None),
    )
    db_session.add(entry)
    await db_session.commit()
    await db_session.refresh(entry)

    resp = await client.delete(f"/api/feedback/{entry.id}", headers=headers)
    assert resp.status_code == 204


@pytest.mark.asyncio
async def test_delete_entry_by_admin(client, admin_user, test_user, db_session):
    """Admin can delete any entry."""
    from datetime import datetime, timezone

    from app.models.feedback import FeedbackEntry

    user, _ = test_user
    _, admin_headers = admin_user
    entry = FeedbackEntry(
        type="bug",
        title="Admin delete",
        description="d",
        status="pending",
        author_id=user.id,
        created_at=datetime.now(timezone.utc).replace(tzinfo=None),
    )
    db_session.add(entry)
    await db_session.commit()
    await db_session.refresh(entry)

    resp = await client.delete(f"/api/feedback/{entry.id}", headers=admin_headers)
    assert resp.status_code == 204


@pytest.mark.asyncio
async def test_delete_entry_not_author(client, test_user, db_session):
    """A non-author, non-admin user cannot delete another user's entry."""
    from datetime import datetime, timezone

    from app.core.security import hash_password
    from app.models.feedback import FeedbackEntry
    from app.models.user import User

    _, headers = test_user

    other = User(
        username="otheruser",
        email="other@test.com",
        display_name="Other",
        hashed_password=hash_password("pass"),
        role="user",
        native_language="en",
        is_active=True,
    )
    db_session.add(other)
    await db_session.commit()
    await db_session.refresh(other)

    now = datetime.now(timezone.utc).replace(tzinfo=None)
    entry = FeedbackEntry(
        type="feature",
        title="Not mine",
        description="d",
        status="pending",
        author_id=other.id,
        created_at=now,
    )
    db_session.add(entry)
    await db_session.commit()
    await db_session.refresh(entry)

    resp = await client.delete(f"/api/feedback/{entry.id}", headers=headers)
    assert resp.status_code == 403


@pytest.mark.asyncio
async def test_delete_entry_not_found(client, test_user):
    """Deleting a non-existent entry returns 404."""
    _, headers = test_user
    resp = await client.delete("/api/feedback/99999", headers=headers)
    assert resp.status_code == 404


@pytest.mark.asyncio
async def test_delete_entry_cascades_votes_and_comments(client, test_user, db_session):
    """Deleting an entry removes its votes and comments."""
    from datetime import datetime, timezone

    from sqlalchemy import func, select

    from app.models.feedback import FeedbackComment, FeedbackEntry, FeedbackVote

    user, headers = test_user
    now = datetime.now(timezone.utc).replace(tzinfo=None)
    entry = FeedbackEntry(
        type="feature",
        title="Cascade",
        description="d",
        status="pending",
        author_id=user.id,
        created_at=now,
    )
    db_session.add(entry)
    await db_session.commit()
    await db_session.refresh(entry)

    vote = FeedbackVote(entry_id=entry.id, user_id=user.id, created_at=now)
    comment = FeedbackComment(entry_id=entry.id, author_id=user.id, body="C", created_at=now)
    db_session.add_all([vote, comment])
    await db_session.commit()

    resp = await client.delete(f"/api/feedback/{entry.id}", headers=headers)
    assert resp.status_code == 204

    # Verify cascade: votes and comments are removed
    vote_count = await db_session.scalar(
        select(func.count()).select_from(FeedbackVote).where(FeedbackVote.entry_id == entry.id)
    )
    assert vote_count == 0

    comment_count = await db_session.scalar(
        select(func.count())
        .select_from(FeedbackComment)
        .where(FeedbackComment.entry_id == entry.id)
    )
    assert comment_count == 0


# ── POST /api/feedback/{id}/vote — toggle vote ───────────────────────────────


@pytest.mark.asyncio
async def test_add_vote(client, test_user, db_session):
    """Voting on a feature adds the vote and increments the counter."""
    from datetime import datetime, timezone

    from app.models.feedback import FeedbackEntry

    user, headers = test_user
    entry = FeedbackEntry(
        type="feature",
        title="Votable",
        description="d",
        status="pending",
        author_id=user.id,
        vote_count=0,
        created_at=datetime.now(timezone.utc).replace(tzinfo=None),
    )
    db_session.add(entry)
    await db_session.commit()
    await db_session.refresh(entry)

    resp = await client.post(f"/api/feedback/{entry.id}/vote", headers=headers)
    assert resp.status_code == 200
    data = resp.json()
    assert data["voted"] is True
    assert data["vote_count"] == 1


@pytest.mark.asyncio
async def test_remove_vote_toggle(client, test_user, db_session):
    """Voting twice toggles the vote off."""
    from datetime import datetime, timezone

    from app.models.feedback import FeedbackEntry, FeedbackVote

    user, headers = test_user
    now = datetime.now(timezone.utc).replace(tzinfo=None)
    entry = FeedbackEntry(
        type="feature",
        title="Toggle",
        description="d",
        status="pending",
        author_id=user.id,
        vote_count=1,
        created_at=now,
    )
    db_session.add(entry)
    await db_session.commit()
    await db_session.refresh(entry)

    db_session.add(FeedbackVote(entry_id=entry.id, user_id=user.id, created_at=now))
    await db_session.commit()

    resp = await client.post(f"/api/feedback/{entry.id}/vote", headers=headers)
    assert resp.status_code == 200
    data = resp.json()
    assert data["voted"] is False
    assert data["vote_count"] == 0


@pytest.mark.asyncio
async def test_vote_on_bug_rejected(client, test_user, db_session):
    """Voting on a bug report returns 400."""
    from datetime import datetime, timezone

    from app.models.feedback import FeedbackEntry

    user, headers = test_user
    entry = FeedbackEntry(
        type="bug",
        title="Not votable",
        description="d",
        status="pending",
        author_id=user.id,
        created_at=datetime.now(timezone.utc).replace(tzinfo=None),
    )
    db_session.add(entry)
    await db_session.commit()
    await db_session.refresh(entry)

    resp = await client.post(f"/api/feedback/{entry.id}/vote", headers=headers)
    assert resp.status_code == 400
    assert resp.json()["detail"] == "only_features_are_voteable"


@pytest.mark.asyncio
async def test_vote_requires_auth(client):
    """Unauthenticated vote is rejected."""
    resp = await client.post("/api/feedback/1/vote")
    assert resp.status_code == 401


# ── PATCH /api/feedback/{id}/status — admin status update ─────────────────────


@pytest.mark.asyncio
async def test_admin_updates_status(client, admin_user, test_user, db_session):
    """Admin can change an entry's status."""
    from datetime import datetime, timezone

    from app.models.feedback import FeedbackEntry

    user, _ = test_user
    _, admin_headers = admin_user
    entry = FeedbackEntry(
        type="feature",
        title="Status change",
        description="d",
        status="pending",
        author_id=user.id,
        created_at=datetime.now(timezone.utc).replace(tzinfo=None),
    )
    db_session.add(entry)
    await db_session.commit()
    await db_session.refresh(entry)

    resp = await client.patch(
        f"/api/feedback/{entry.id}/status",
        headers=admin_headers,
        json={"status": "planned"},
    )
    assert resp.status_code == 200
    assert resp.json()["status"] == "planned"


@pytest.mark.asyncio
async def test_non_admin_cannot_update_status(client, test_user, db_session):
    """Regular user cannot change status."""
    from datetime import datetime, timezone

    from app.models.feedback import FeedbackEntry

    user, headers = test_user
    entry = FeedbackEntry(
        type="feature",
        title="No status",
        description="d",
        status="pending",
        author_id=user.id,
        created_at=datetime.now(timezone.utc).replace(tzinfo=None),
    )
    db_session.add(entry)
    await db_session.commit()
    await db_session.refresh(entry)

    resp = await client.patch(
        f"/api/feedback/{entry.id}/status",
        headers=headers,
        json={"status": "done"},
    )
    assert resp.status_code == 403


@pytest.mark.asyncio
async def test_update_status_invalid_value(client, admin_user, test_user, db_session):
    """Invalid status value returns 422."""
    from datetime import datetime, timezone

    from app.models.feedback import FeedbackEntry

    user, _ = test_user
    _, admin_headers = admin_user
    entry = FeedbackEntry(
        type="feature",
        title="Bad status",
        description="d",
        status="pending",
        author_id=user.id,
        created_at=datetime.now(timezone.utc).replace(tzinfo=None),
    )
    db_session.add(entry)
    await db_session.commit()
    await db_session.refresh(entry)

    resp = await client.patch(
        f"/api/feedback/{entry.id}/status",
        headers=admin_headers,
        json={"status": "imaginary"},
    )
    assert resp.status_code == 422


# ── Comments: add, list, delete ───────────────────────────────────────────────


@pytest.mark.asyncio
async def test_add_comment(client, test_user, db_session):
    """A comment can be added to an entry."""
    from datetime import datetime, timezone

    from app.models.feedback import FeedbackEntry

    user, headers = test_user
    entry = FeedbackEntry(
        type="feature",
        title="Commentable",
        description="d",
        status="pending",
        author_id=user.id,
        created_at=datetime.now(timezone.utc).replace(tzinfo=None),
    )
    db_session.add(entry)
    await db_session.commit()
    await db_session.refresh(entry)

    resp = await client.post(
        f"/api/feedback/{entry.id}/comments",
        headers=headers,
        json={"body": "Nice idea!"},
    )
    assert resp.status_code == 201
    data = resp.json()
    assert data["body"] == "Nice idea!"
    assert data["entry_id"] == entry.id
    assert "author" in data


@pytest.mark.asyncio
async def test_list_comments(client, test_user, db_session):
    """Comments are listed in chronological order."""
    from datetime import datetime, timezone

    from app.models.feedback import FeedbackComment, FeedbackEntry

    user, headers = test_user
    now = datetime.now(timezone.utc).replace(tzinfo=None)
    entry = FeedbackEntry(
        type="feature",
        title="Thread",
        description="d",
        status="pending",
        author_id=user.id,
        created_at=now,
    )
    db_session.add(entry)
    await db_session.commit()
    await db_session.refresh(entry)

    db_session.add(
        FeedbackComment(entry_id=entry.id, author_id=user.id, body="First", created_at=now)
    )
    db_session.add(
        FeedbackComment(entry_id=entry.id, author_id=user.id, body="Second", created_at=now)
    )
    await db_session.commit()

    resp = await client.get(f"/api/feedback/{entry.id}/comments", headers=headers)
    assert resp.status_code == 200
    data = resp.json()
    assert data["total"] == 2
    assert data["items"][0]["body"] == "First"


@pytest.mark.asyncio
async def test_delete_own_comment(client, test_user, db_session):
    """Author can delete their own comment."""
    from datetime import datetime, timezone

    from app.models.feedback import FeedbackComment, FeedbackEntry

    user, headers = test_user
    now = datetime.now(timezone.utc).replace(tzinfo=None)
    entry = FeedbackEntry(
        type="feature",
        title="Del comment",
        description="d",
        status="pending",
        author_id=user.id,
        created_at=now,
    )
    db_session.add(entry)
    await db_session.commit()
    await db_session.refresh(entry)

    comment = FeedbackComment(
        entry_id=entry.id, author_id=user.id, body="Delete me", created_at=now
    )
    db_session.add(comment)
    await db_session.commit()
    await db_session.refresh(comment)

    resp = await client.delete(f"/api/feedback/{entry.id}/comments/{comment.id}", headers=headers)
    assert resp.status_code == 204


@pytest.mark.asyncio
async def test_admin_can_delete_any_comment(client, admin_user, test_user, db_session):
    """Admin can delete any user's comment."""
    from datetime import datetime, timezone

    from app.models.feedback import FeedbackComment, FeedbackEntry

    user, _ = test_user
    _, admin_headers = admin_user
    now = datetime.now(timezone.utc).replace(tzinfo=None)
    entry = FeedbackEntry(
        type="feature",
        title="Admin del",
        description="d",
        status="pending",
        author_id=user.id,
        created_at=now,
    )
    db_session.add(entry)
    await db_session.commit()
    await db_session.refresh(entry)

    comment = FeedbackComment(
        entry_id=entry.id, author_id=user.id, body="Admin can", created_at=now
    )
    db_session.add(comment)
    await db_session.commit()
    await db_session.refresh(comment)

    resp = await client.delete(
        f"/api/feedback/{entry.id}/comments/{comment.id}", headers=admin_headers
    )
    assert resp.status_code == 204


@pytest.mark.asyncio
async def test_delete_comment_not_author(client, test_user, db_session):
    """Non-author, non-admin cannot delete another user's comment."""
    from datetime import datetime, timezone

    from app.core.security import hash_password
    from app.models.feedback import FeedbackComment, FeedbackEntry
    from app.models.user import User

    _, headers = test_user
    now = datetime.now(timezone.utc).replace(tzinfo=None)

    other = User(
        username="otherc",
        email="otherc@test.com",
        display_name="Other",
        hashed_password=hash_password("pass"),
        role="user",
        native_language="en",
        is_active=True,
    )
    db_session.add(other)
    await db_session.commit()
    await db_session.refresh(other)

    entry = FeedbackEntry(
        type="feature",
        title="Comment guard",
        description="d",
        status="pending",
        author_id=other.id,
        created_at=now,
    )
    db_session.add(entry)
    await db_session.commit()
    await db_session.refresh(entry)

    comment = FeedbackComment(
        entry_id=entry.id, author_id=other.id, body="Other user", created_at=now
    )
    db_session.add(comment)
    await db_session.commit()
    await db_session.refresh(comment)

    resp = await client.delete(f"/api/feedback/{entry.id}/comments/{comment.id}", headers=headers)
    assert resp.status_code == 403


@pytest.mark.asyncio
async def test_delete_comment_wrong_entry(client, test_user, db_session):
    """Deleting a comment with a mismatched entry_id returns 404."""
    from datetime import datetime, timezone

    from app.models.feedback import FeedbackComment, FeedbackEntry

    user, headers = test_user
    now = datetime.now(timezone.utc).replace(tzinfo=None)

    e1 = FeedbackEntry(
        type="feature",
        title="E1",
        description="d",
        status="pending",
        author_id=user.id,
        created_at=now,
    )
    e2 = FeedbackEntry(
        type="bug", title="E2", description="d", status="pending", author_id=user.id, created_at=now
    )
    db_session.add_all([e1, e2])
    await db_session.commit()
    await db_session.refresh(e1)
    await db_session.refresh(e2)

    comment = FeedbackComment(entry_id=e1.id, author_id=user.id, body="On e1", created_at=now)
    db_session.add(comment)
    await db_session.commit()
    await db_session.refresh(comment)

    # Try to delete comment from e1 but using e2's id as entry_id
    resp = await client.delete(f"/api/feedback/{e2.id}/comments/{comment.id}", headers=headers)
    assert resp.status_code == 404


@pytest.mark.asyncio
async def test_add_comment_requires_auth(client):
    """Unauthenticated comment creation is rejected."""
    resp = await client.post(
        "/api/feedback/1/comments",
        json={"body": "Test"},
    )
    assert resp.status_code == 401


@pytest.mark.asyncio
async def test_add_comment_not_found(client, test_user):
    """Comment on a non-existent entry returns 404."""
    _, headers = test_user
    resp = await client.post(
        "/api/feedback/99999/comments",
        headers=headers,
        json={"body": "Ghost"},
    )
    assert resp.status_code == 404


# ── Response shape assertions ─────────────────────────────────────────────────


@pytest.mark.asyncio
async def test_feedback_entry_out_shape(client, test_user, db_session):
    """FeedbackEntryOut contains all expected fields."""
    from datetime import datetime, timezone

    from app.models.feedback import FeedbackEntry

    user, headers = test_user
    entry = FeedbackEntry(
        type="feature",
        title="Shape test",
        description="Check the schema",
        status="pending",
        author_id=user.id,
        created_at=datetime.now(timezone.utc).replace(tzinfo=None),
    )
    db_session.add(entry)
    await db_session.commit()

    resp = await client.get("/api/feedback", headers=headers)
    assert resp.status_code == 200
    item = resp.json()["items"][0]
    assert "id" in item
    assert "type" in item
    assert "title" in item
    assert "description" in item
    assert "status" in item
    assert "author" in item
    assert "id" in item["author"]
    assert "username" in item["author"]
    assert "display_name" in item["author"]
    assert "vote_count" in item
    assert "voted_by_me" in item
    assert "comment_count" in item
    assert "created_at" in item
    assert isinstance(item["created_at"], str)


@pytest.mark.asyncio
async def test_feedback_entry_detail_includes_comments(client, test_user, db_session):
    """Detail endpoint embeds the comment list."""
    from datetime import datetime, timezone

    from app.models.feedback import FeedbackComment, FeedbackEntry

    user, headers = test_user
    now = datetime.now(timezone.utc).replace(tzinfo=None)
    entry = FeedbackEntry(
        type="feature",
        title="With comments",
        description="d",
        status="pending",
        author_id=user.id,
        created_at=now,
    )
    db_session.add(entry)
    await db_session.commit()
    await db_session.refresh(entry)

    db_session.add(
        FeedbackComment(entry_id=entry.id, author_id=user.id, body="Hello", created_at=now)
    )
    await db_session.commit()

    resp = await client.get(f"/api/feedback/{entry.id}", headers=headers)
    assert resp.status_code == 200
    data = resp.json()
    assert len(data["comments"]) == 1
    assert data["comments"][0]["body"] == "Hello"
    assert data["comment_count"] == 1


# ── Admin email notification on feedback creation ─────────────────────────────


@pytest.mark.asyncio
async def test_create_feedback_sends_admin_email(client, test_user):
    """Creating a feature request triggers one admin notification email."""
    from unittest.mock import AsyncMock, patch

    _, headers = test_user
    with patch(
        "app.routers.feedback.email_service.send_feedback_notification",
        new_callable=AsyncMock,
    ) as mock_notify:
        resp = await client.post(
            "/api/feedback",
            headers=headers,
            json={
                "type": "feature",
                "title": "Admin notif test",
                "description": "Should email admin.",
            },
        )
    assert resp.status_code == 201
    mock_notify.assert_awaited_once()
    call_kwargs = mock_notify.call_args.kwargs
    assert call_kwargs["entry_type"] == "feature"
    assert call_kwargs["title"] == "Admin notif test"


@pytest.mark.asyncio
async def test_create_bug_sends_admin_email(client, test_user):
    """Creating a bug report also triggers one admin notification email."""
    from unittest.mock import AsyncMock, patch

    _, headers = test_user
    with patch(
        "app.routers.feedback.email_service.send_feedback_notification",
        new_callable=AsyncMock,
    ) as mock_notify:
        resp = await client.post(
            "/api/feedback",
            headers=headers,
            json={"type": "bug", "title": "Crash on login", "description": "App crashes."},
        )
    assert resp.status_code == 201
    mock_notify.assert_awaited_once()
    call_kwargs = mock_notify.call_args.kwargs
    assert call_kwargs["entry_type"] == "bug"


@pytest.mark.asyncio
async def test_add_comment_does_not_send_admin_email(client, test_user, db_session):
    """Adding a comment does NOT trigger any admin notification email."""
    from datetime import datetime, timezone
    from unittest.mock import AsyncMock, patch

    from app.models.feedback import FeedbackEntry

    user, headers = test_user
    now = datetime.now(timezone.utc).replace(tzinfo=None)
    entry = FeedbackEntry(
        type="feature",
        title="No email on comment",
        description="d",
        status="pending",
        author_id=user.id,
        created_at=now,
    )
    db_session.add(entry)
    await db_session.commit()
    await db_session.refresh(entry)

    with patch(
        "app.routers.feedback.email_service.send_feedback_notification",
        new_callable=AsyncMock,
    ) as mock_notify:
        resp = await client.post(
            f"/api/feedback/{entry.id}/comments",
            headers=headers,
            json={"body": "Just a comment"},
        )
    assert resp.status_code == 201
    mock_notify.assert_not_awaited()
