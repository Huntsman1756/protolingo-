"""Extra listening tests: GET /history and GET /audio/{id} (not covered in test_listening.py)."""

from __future__ import annotations

import pytest
import pytest_asyncio
from httpx import ASGITransport, AsyncClient

from app.core.database import get_db
from app.core.security import create_access_token, hash_password
from app.main import app
from app.models.user import User

# ---------------------------------------------------------------------------
# Local Redis mock (matching the one in test_listening.py for consistency)
# ---------------------------------------------------------------------------


class _MockRedis:
    def __init__(self) -> None:
        self._store: dict[str, str] = {}

    async def set(self, key: str, value: str, *, nx: bool = False, ex: int | None = None):
        if nx and key in self._store:
            return None
        self._store[key] = value
        return True

    async def get(self, key: str):
        return self._store.get(key)

    async def delete(self, key: str) -> None:
        self._store.pop(key, None)

    async def setex(self, key: str, ttl: int, value: str) -> None:
        self._store[key] = value

    async def getex(self, key: str):
        return self._store.get(key)

    async def aclose(self) -> None:
        pass


# ---------------------------------------------------------------------------
# Fixtures
# ---------------------------------------------------------------------------


@pytest_asyncio.fixture
async def listening_client(db_session):
    """Client with listening Redis overridden (needed for /next and /generate).
    For /history and /audio the Redis override is irrelevant but kept for
    consistency with the rest of the listening test suite."""
    from app.routers.admin import get_redis as admin_get_redis
    from app.routers.assessment import get_redis as assessment_get_redis
    from app.routers.auth import get_redis as auth_get_redis
    from app.routers.listening import get_redis as listening_get_redis

    mock_redis = _MockRedis()

    async def override_db():
        yield db_session

    app.dependency_overrides[get_db] = override_db
    app.dependency_overrides[auth_get_redis] = lambda: mock_redis
    app.dependency_overrides[admin_get_redis] = lambda: mock_redis
    app.dependency_overrides[assessment_get_redis] = lambda: mock_redis
    app.dependency_overrides[listening_get_redis] = lambda: mock_redis

    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        yield ac

    app.dependency_overrides.clear()


@pytest_asyncio.fixture
async def listening_user(db_session):
    user = User(
        username="luser",
        email="luser@example.com",
        display_name="Listening User",
        hashed_password=hash_password("lpass"),
        role="user",
        native_language="es",
        is_active=True,
    )
    db_session.add(user)
    await db_session.commit()
    await db_session.refresh(user)
    token = create_access_token(user.id, user.role)
    return user, {"Authorization": f"Bearer {token}"}


# ---------------------------------------------------------------------------
# GET /api/listening/history
# ---------------------------------------------------------------------------


@pytest.mark.asyncio
async def test_listening_history_empty(listening_client, listening_user):
    """A user with no attempts has an empty history."""
    _, headers = listening_user
    response = await listening_client.get("/api/listening/history", headers=headers)
    assert response.status_code == 200
    data = response.json()
    assert data["items"] == []
    assert data["total"] == 0


@pytest.mark.asyncio
async def test_listening_history_pagination_fields(listening_client, listening_user):
    """History response includes skip and limit pagination metadata."""
    _, headers = listening_user
    response = await listening_client.get(
        "/api/listening/history?skip=0&limit=5",
        headers=headers,
    )
    assert response.status_code == 200
    data = response.json()
    assert "skip" in data
    assert "limit" in data
    assert data["skip"] == 0
    assert data["limit"] == 5


@pytest.mark.asyncio
async def test_listening_history_limit_capped_at_50(listening_client, listening_user):
    """Requesting limit=100 is silently capped to 50."""
    _, headers = listening_user
    response = await listening_client.get(
        "/api/listening/history?skip=0&limit=100",
        headers=headers,
    )
    assert response.status_code == 200
    data = response.json()
    assert data["limit"] <= 50


@pytest.mark.asyncio
async def test_listening_history_requires_auth(listening_client):
    response = await listening_client.get(
        "/api/listening/history",
        headers={"Authorization": "Bearer invalid"},
    )
    assert response.status_code == 401


# ---------------------------------------------------------------------------
# GET /api/listening/audio/{exercise_id}
# ---------------------------------------------------------------------------


@pytest.mark.asyncio
async def test_listening_audio_exercise_not_found(listening_client, listening_user):
    """Requesting audio for a non-existent exercise returns 404."""
    _, headers = listening_user
    response = await listening_client.get("/api/listening/audio/99999", headers=headers)
    assert response.status_code == 404
    assert response.json()["detail"] == "exercise_not_found"


@pytest.mark.asyncio
async def test_listening_audio_file_not_found(listening_client, listening_user, db_session):
    """If the exercise exists but the MP3 file is missing on disk, return 404."""
    from app.models.listening import ListeningExercise

    _, headers = listening_user
    exercise = ListeningExercise(
        level="B1",
        target_language="en-US",
        exercise_type="monologue",
        topic="test",
        text="Test audio text.",
        questions=[],
        audio_path="/nonexistent/path/999.mp3",
    )
    db_session.add(exercise)
    await db_session.commit()
    await db_session.refresh(exercise)

    response = await listening_client.get(
        f"/api/listening/audio/{exercise.id}",
        headers=headers,
    )
    assert response.status_code == 404
    assert response.json()["detail"] == "audio_not_found"


@pytest.mark.asyncio
async def test_listening_audio_requires_auth(listening_client):
    response = await listening_client.get(
        "/api/listening/audio/1",
        headers={"Authorization": "Bearer invalid"},
    )
    assert response.status_code == 401


@pytest.mark.asyncio
async def test_listening_audio_non_integer_id_rejected(listening_client, listening_user):
    """FastAPI path validation rejects non-integer exercise IDs before the handler runs."""
    _, headers = listening_user
    response = await listening_client.get(
        "/api/listening/audio/not-an-int",
        headers=headers,
    )
    assert response.status_code == 422
