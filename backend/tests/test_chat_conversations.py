"""Tests for chat conversation CRUD: list, create, delete, get messages."""

from __future__ import annotations

import pytest
import pytest_asyncio

from app.core.security import create_access_token, hash_password
from app.models.user import User

# ── Helper: create a second user for ownership tests ─────────────────────────


@pytest_asyncio.fixture
async def other_user(db_session):
    user = User(
        username="otheruser",
        email="other@example.com",
        display_name="Other User",
        hashed_password=hash_password("otherpass"),
        role="user",
        native_language="fr",
        is_active=True,
    )
    db_session.add(user)
    await db_session.commit()
    await db_session.refresh(user)
    token = create_access_token(user.id, user.role)
    return user, {"Authorization": f"Bearer {token}"}


# ── GET /api/chat/conversations ───────────────────────────────────────────────


@pytest.mark.asyncio
async def test_list_conversations_empty(client, test_user):
    """A new user has no conversations."""
    _, headers = test_user
    response = await client.get("/api/chat/conversations", headers=headers)
    assert response.status_code == 200
    assert response.json() == []


@pytest.mark.asyncio
async def test_list_conversations_requires_auth(client):
    response = await client.get(
        "/api/chat/conversations",
        headers={"Authorization": "Bearer invalid"},
    )
    assert response.status_code == 401


# ── POST /api/chat/conversations ──────────────────────────────────────────────


@pytest.mark.asyncio
async def test_create_conversation_with_title(client, test_user):
    """POST creates a conversation with the given title."""
    _, headers = test_user
    response = await client.post(
        "/api/chat/conversations",
        headers=headers,
        json={"title": "My conversation"},
    )
    assert response.status_code == 200
    data = response.json()
    assert data["title"] == "My conversation"
    assert "id" in data


@pytest.mark.asyncio
async def test_create_conversation_default_title(client, test_user):
    """POST without a title falls back to 'New conversation'."""
    _, headers = test_user
    response = await client.post(
        "/api/chat/conversations",
        headers=headers,
        json={},
    )
    assert response.status_code == 200
    data = response.json()
    assert data["title"] == "New conversation"


@pytest.mark.asyncio
async def test_create_conversation_source_defaults_to_chat(client, test_user):
    """Conversations created via the API always have source='chat'."""
    _, headers = test_user
    response = await client.post(
        "/api/chat/conversations",
        headers=headers,
        json={"title": "Source test"},
    )
    assert response.status_code == 200
    data = response.json()
    assert data["source"] == "chat"


@pytest.mark.asyncio
async def test_list_conversations_includes_source_field(client, test_user):
    """The list endpoint returns the 'source' field for every conversation."""
    _, headers = test_user
    await client.post(
        "/api/chat/conversations",
        headers=headers,
        json={"title": "Has source"},
    )
    response = await client.get("/api/chat/conversations", headers=headers)
    assert response.status_code == 200
    for conv in response.json():
        assert "source" in conv, f"Missing 'source' in conversation {conv}"


@pytest.mark.asyncio
async def test_voice_conversation_visible_in_list(client, test_user, db_session):
    """A voice-sourced conversation inserted directly in the DB appears in the
    chat list with source='voice', making it reviewable from the tutor sidebar."""
    user, headers = test_user
    from app.models.conversation import Conversation

    conv = Conversation(
        user_id=user.id,
        title="Voice session — 23 de mayo de 2026",
        source="voice",
    )
    db_session.add(conv)
    await db_session.commit()

    response = await client.get("/api/chat/conversations", headers=headers)
    assert response.status_code == 200
    voice_convs = [c for c in response.json() if c["source"] == "voice"]
    assert len(voice_convs) == 1
    assert voice_convs[0]["title"] == "Voice session — 23 de mayo de 2026"


@pytest.mark.asyncio
async def test_list_conversations_after_create(client, test_user):
    """Created conversation appears in the list."""
    _, headers = test_user
    await client.post(
        "/api/chat/conversations",
        headers=headers,
        json={"title": "Visible conversation"},
    )
    response = await client.get("/api/chat/conversations", headers=headers)
    assert response.status_code == 200
    titles = [c["title"] for c in response.json()]
    assert "Visible conversation" in titles


# ── DELETE /api/chat/conversations/{id} ───────────────────────────────────────


@pytest.mark.asyncio
async def test_delete_conversation_removes_it(client, test_user):
    """DELETE removes the conversation; subsequent list is empty."""
    _, headers = test_user
    create_resp = await client.post(
        "/api/chat/conversations",
        headers=headers,
        json={"title": "To delete"},
    )
    conv_id = create_resp.json()["id"]

    del_resp = await client.delete(f"/api/chat/conversations/{conv_id}", headers=headers)
    assert del_resp.status_code == 204

    list_resp = await client.get("/api/chat/conversations", headers=headers)
    assert list_resp.status_code == 200
    assert all(c["id"] != conv_id for c in list_resp.json())


@pytest.mark.asyncio
async def test_delete_conversation_not_found(client, test_user):
    """DELETE on a non-existent ID returns 404."""
    _, headers = test_user
    response = await client.delete("/api/chat/conversations/99999", headers=headers)
    assert response.status_code == 404


@pytest.mark.asyncio
async def test_delete_other_users_conversation(client, test_user, other_user, db_session):
    """A user cannot delete a conversation that belongs to someone else."""
    _, headers_owner = test_user
    _, headers_other = other_user

    # Owner creates a conversation
    create_resp = await client.post(
        "/api/chat/conversations",
        headers=headers_owner,
        json={"title": "Owner's conv"},
    )
    conv_id = create_resp.json()["id"]

    # Other user tries to delete it
    response = await client.delete(
        f"/api/chat/conversations/{conv_id}",
        headers=headers_other,
    )
    assert response.status_code == 404


# ── GET /api/chat/conversations/{id}/messages ─────────────────────────────────


@pytest.mark.asyncio
async def test_get_conversation_messages_empty(client, test_user):
    """Messages endpoint returns empty list for a new conversation."""
    _, headers = test_user
    create_resp = await client.post(
        "/api/chat/conversations",
        headers=headers,
        json={"title": "Empty conv"},
    )
    conv_id = create_resp.json()["id"]

    response = await client.get(
        f"/api/chat/conversations/{conv_id}/messages",
        headers=headers,
    )
    assert response.status_code == 200
    data = response.json()
    assert data["messages"] == []


@pytest.mark.asyncio
async def test_get_conversation_messages_not_found(client, test_user):
    """Messages endpoint returns 404 for a non-existent conversation."""
    _, headers = test_user
    response = await client.get(
        "/api/chat/conversations/99999/messages",
        headers=headers,
    )
    assert response.status_code == 404


@pytest.mark.asyncio
async def test_get_other_users_conversation_messages(client, test_user, other_user):
    """A user cannot read messages from another user's conversation."""
    _, headers_owner = test_user
    _, headers_other = other_user

    create_resp = await client.post(
        "/api/chat/conversations",
        headers=headers_owner,
        json={"title": "Private"},
    )
    conv_id = create_resp.json()["id"]

    response = await client.get(
        f"/api/chat/conversations/{conv_id}/messages",
        headers=headers_other,
    )
    assert response.status_code == 404
