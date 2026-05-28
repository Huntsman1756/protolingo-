"""Tests for the Memory feature — service layer and API endpoints."""

from unittest.mock import AsyncMock, patch

import pytest
from sqlalchemy import select

from app.models.memory import Memory
from app.services.memory_service import (
    build_memory_context,
    clear_all_memories,
    delete_memory,
    get_user_memories,
    parse_memory_marker,
    save_memories,
    strip_memory_marker,
)

# ── Service layer unit tests ────────────────────────────────────────────────


class TestParseMemoryMarker:
    def test_extracts_single_item(self):
        text = 'Hello student!\n\n<<MEMORY>>{"items":["User is a teacher"]}<<ENDMEMORY>>'
        items = parse_memory_marker(text)
        assert items == ["User is a teacher"]

    def test_extracts_multiple_items(self):
        text = 'Reply.<<MEMORY>>{"items":["Fact 1","Fact 2"]}<<ENDMEMORY>>'
        items = parse_memory_marker(text)
        assert items == ["Fact 1", "Fact 2"]

    def test_returns_empty_when_no_marker(self):
        items = parse_memory_marker("Just a normal response.")
        assert items == []

    def test_returns_empty_on_invalid_json(self):
        text = "<<MEMORY>>not valid json<<ENDMEMORY>>"
        items = parse_memory_marker(text)
        assert items == []

    def test_returns_empty_on_missing_items_key(self):
        text = '<<MEMORY>>{"other": []}<<ENDMEMORY>>'
        items = parse_memory_marker(text)
        assert items == []

    def test_truncates_items_to_max_chars(self):
        long = "A" * 300
        text = f'<<MEMORY>>{{"items":["{long}"]}}<<ENDMEMORY>>'
        items = parse_memory_marker(text)
        assert len(items[0]) == 200

    def test_handles_marker_with_newlines(self):
        text = 'Reply.\n<<MEMORY>>\n{"items":["Fact"]}\n<<ENDMEMORY>>'
        items = parse_memory_marker(text)
        assert items == ["Fact"]

    def test_filters_empty_items(self):
        text = '<<MEMORY>>{"items":["", "Valid"]}<<ENDMEMORY>>'
        items = parse_memory_marker(text)
        assert items == ["Valid"]


class TestStripMemoryMarker:
    def test_removes_marker_from_end(self):
        text = 'Hello student!<<MEMORY>>{"items":["f"]}<<ENDMEMORY>>'
        result = strip_memory_marker(text)
        assert result == "Hello student!"

    def test_returns_unchanged_when_no_marker(self):
        text = "Hello student!"
        result = strip_memory_marker(text)
        assert result == "Hello student!"

    def test_handles_multiline_marker(self):
        text = 'Line 1.\nLine 2.\n<<MEMORY>>\n{"items":["f"]}\n<<ENDMEMORY>>'
        result = strip_memory_marker(text)
        assert result == "Line 1.\nLine 2."


class TestBuildMemoryContext:
    def test_returns_empty_for_no_memories(self):
        assert build_memory_context([]) == ""

    def test_formats_memories(self, db_session):
        m1 = Memory(id=1, user_id=1, content="User is a teacher", source="chat")
        m2 = Memory(id=2, user_id=1, content="Likes hiking", source="voice")
        result = build_memory_context([m1, m2])
        assert "User is a teacher" in result
        assert "Likes hiking" in result
        assert "Saved memories about the student" in result

    def test_limits_to_last_20(self):
        memories = [
            Memory(id=i, user_id=1, content=f"Fact #{i:02d}", source="chat") for i in range(1, 26)
        ]
        result = build_memory_context(memories)
        assert "Fact #06" in result  # oldest kept (memories[5])
        assert "Fact #25" in result  # newest
        assert "Fact #05" not in result  # oldest dropped (memories[4])


# ── API endpoint tests ──────────────────────────────────────────────────────


@pytest.mark.asyncio
async def test_list_memories_empty(client, test_user):
    _user, headers = test_user
    response = await client.get("/api/memories", headers=headers)
    assert response.status_code == 200
    data = response.json()
    assert data["memories"] == []


@pytest.mark.asyncio
async def test_list_memories_with_items(client, test_user, db_session):
    user, headers = test_user
    db_session.add(Memory(user_id=user.id, content="Fact 1", source="chat"))
    db_session.add(Memory(user_id=user.id, content="Fact 2", source="voice"))
    await db_session.commit()

    response = await client.get("/api/memories", headers=headers)
    assert response.status_code == 200
    data = response.json()
    assert len(data["memories"]) == 2
    assert data["memories"][0]["content"] == "Fact 1"
    assert data["memories"][1]["source"] == "voice"


@pytest.mark.asyncio
async def test_delete_memory(client, test_user, db_session):
    user, headers = test_user
    memory = Memory(user_id=user.id, content="Delete me", source="chat")
    db_session.add(memory)
    await db_session.commit()
    await db_session.refresh(memory)

    response = await client.delete(f"/api/memories/{memory.id}", headers=headers)
    assert response.status_code == 204

    # Verify it's gone
    result = await db_session.execute(select(Memory).where(Memory.id == memory.id))
    assert result.scalar_one_or_none() is None


@pytest.mark.asyncio
async def test_delete_memory_not_found(client, test_user):
    _user, headers = test_user
    response = await client.delete("/api/memories/99999", headers=headers)
    assert response.status_code == 404


@pytest.mark.asyncio
async def test_delete_memory_wrong_user(client, test_user, admin_user, db_session):
    user, _ = test_user
    admin, _ = admin_user

    memory = Memory(user_id=admin.id, content="Admin's memory", source="chat")
    db_session.add(memory)
    await db_session.commit()
    await db_session.refresh(memory)

    # Regular user tries to delete admin's memory
    response = await client.delete(f"/api/memories/{memory.id}", headers={**test_user[1]})
    assert response.status_code == 404


@pytest.mark.asyncio
async def test_clear_all_memories(client, test_user, db_session):
    user, headers = test_user
    db_session.add(Memory(user_id=user.id, content="Fact 1", source="chat"))
    db_session.add(Memory(user_id=user.id, content="Fact 2", source="voice"))
    await db_session.commit()

    response = await client.delete("/api/memories", headers=headers)
    assert response.status_code == 200
    data = response.json()
    assert data["deleted"] == 2

    # Verify all gone
    result = await db_session.execute(select(Memory).where(Memory.user_id == user.id))
    assert len(result.scalars().all()) == 0


@pytest.mark.asyncio
async def test_memories_require_subscription(client, test_user):
    """Memories endpoint is accessible in self-hosted mode (STRIPE_ENABLED=false)."""
    # In the test environment STRIPE_ENABLED defaults to false, so require_subscription
    # lets every authenticated user through. The endpoint must return 200.
    _user, headers = test_user
    response = await client.get("/api/memories", headers=headers)
    assert response.status_code == 200
    assert "memories" in response.json()


@pytest.mark.asyncio
async def test_memories_blocked_without_stripe_subscription(client, test_user, monkeypatch):
    """With STRIPE_ENABLED=true and no subscription the endpoint returns 402."""
    from app.core import config as _cfg

    monkeypatch.setattr(_cfg.settings, "STRIPE_ENABLED", True)
    _user, headers = test_user
    response = await client.get("/api/memories", headers=headers)
    assert response.status_code == 402


# ── Memory service DB tests ─────────────────────────────────────────────────


@pytest.fixture
async def memory_user(db_session):
    """Create a user for memory service tests."""
    from app.core.security import hash_password
    from app.models.user import User

    user = User(
        username="memuser",
        email="mem@test.com",
        display_name="Mem User",
        hashed_password=hash_password("testpass"),
        role="user",
        native_language="es",
        is_active=True,
    )
    db_session.add(user)
    await db_session.commit()
    await db_session.refresh(user)
    return user


@pytest.mark.asyncio
async def test_save_memories_persists_and_dedupes(db_session, memory_user):
    await save_memories(db_session, memory_user.id, ["Fact A", "Fact B"], "chat")

    result = await db_session.execute(
        select(Memory).where(Memory.user_id == memory_user.id).order_by(Memory.created_at.asc())
    )
    memories = result.scalars().all()
    assert len(memories) == 2
    assert memories[0].content == "Fact A"
    assert memories[1].source == "chat"

    saved = await save_memories(db_session, memory_user.id, ["Fact A", "Fact C"], "voice")
    assert saved == 1

    result = await db_session.execute(
        select(Memory).where(Memory.user_id == memory_user.id).order_by(Memory.created_at.asc())
    )
    memories = result.scalars().all()
    assert len(memories) == 3


@pytest.mark.asyncio
async def test_get_user_memories_ordered(db_session, memory_user):
    await save_memories(db_session, memory_user.id, ["First", "Second"], "chat")
    memories = await get_user_memories(db_session, memory_user.id)
    assert len(memories) == 2
    assert memories[0].content == "First"
    assert memories[1].content == "Second"


@pytest.mark.asyncio
async def test_delete_memory_service(db_session, memory_user):
    await save_memories(db_session, memory_user.id, ["Keep", "Remove"], "chat")
    memories = await get_user_memories(db_session, memory_user.id)
    target_id = memories[1].id

    deleted = await delete_memory(db_session, target_id, memory_user.id)
    assert deleted is True

    remaining = await get_user_memories(db_session, memory_user.id)
    assert len(remaining) == 1
    assert remaining[0].content == "Keep"


@pytest.mark.asyncio
async def test_delete_memory_wrong_user_service(db_session, memory_user):
    await save_memories(db_session, memory_user.id, ["Fact"], "chat")
    memories = await get_user_memories(db_session, memory_user.id)

    deleted = await delete_memory(db_session, memories[0].id, 999)
    assert deleted is False


@pytest.mark.asyncio
async def test_clear_all_memories_service(db_session, memory_user):
    # Create a second user
    from app.core.security import hash_password
    from app.models.user import User

    user2 = User(
        username="memuser2",
        email="mem2@test.com",
        display_name="Mem User 2",
        hashed_password=hash_password("testpass"),
        role="user",
        native_language="en",
        is_active=True,
    )
    db_session.add(user2)
    await db_session.commit()
    await db_session.refresh(user2)

    await save_memories(db_session, memory_user.id, ["A", "B", "C"], "chat")
    await save_memories(db_session, user2.id, ["Other"], "voice")

    count = await clear_all_memories(db_session, memory_user.id)
    assert count == 3

    remaining_user1 = await get_user_memories(db_session, memory_user.id)
    assert len(remaining_user1) == 0
    remaining_user2 = await get_user_memories(db_session, user2.id)
    assert len(remaining_user2) == 1


# ── Chat endpoint memory marker test ────────────────────────────────────────


@pytest.mark.asyncio
async def test_chat_strips_memory_marker_from_response(client, test_user):
    user, headers = test_user

    class FakeChunk:
        class Choice:
            class Delta:
                content = "Hi"

            delta = Delta()

        choices = [Choice()]

    class FakeMarkerChunk:
        class Choice:
            class Delta:
                content = '<<MEMORY>>{"items":["User likes cats"]}<<ENDMEMORY>>'

            delta = Delta()

        choices = [Choice()]

    async def fake_stream():
        yield FakeChunk()
        yield FakeMarkerChunk()

    with patch(
        "app.routers.chat.llm_adapter.chat",
        new_callable=AsyncMock,
        return_value=fake_stream(),
    ):
        response = await client.post(
            "/api/chat",
            headers=headers,
            json={"message": "I like cats"},
        )
        assert response.status_code == 200
        body = response.text
        # The marker should NOT appear in the streamed response
        assert "<<MEMORY>>" not in body
        # The clean text should appear
        assert "Hi" in body
        # memory_updated should fire
        assert "memory_updated" in body
