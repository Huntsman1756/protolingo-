import os

os.environ["DATABASE_URL"] = "sqlite+aiosqlite:///:memory:"
os.environ["SECRET_KEY"] = "test-secret-key-for-pytest"
os.environ["RATE_LIMIT_ENABLED"] = "false"

import pytest
import pytest_asyncio
from httpx import ASGITransport, AsyncClient
from sqlalchemy import event
from sqlalchemy.ext.asyncio import async_sessionmaker, create_async_engine

from app.core.database import Base, get_db
from app.core.security import create_access_token
from app.main import app


def _set_sqlite_pragma(dbapi_connection, connection_record):
    """Enable foreign key support on SQLite connections."""
    cursor = dbapi_connection.cursor()
    cursor.execute("PRAGMA foreign_keys = ON")
    cursor.close()


@pytest.fixture(scope="session")
def test_engine():
    engine = create_async_engine(os.environ["DATABASE_URL"], echo=False)
    event.listen(engine.sync_engine, "connect", _set_sqlite_pragma)
    return engine


@pytest_asyncio.fixture(autouse=True)
async def setup_db(test_engine):
    async with test_engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield
    async with test_engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)


@pytest_asyncio.fixture(autouse=True)
async def clear_sessions():
    # Sessions are now stored in Redis (per-test mock_redis starts empty).
    yield


@pytest_asyncio.fixture
async def db_session(test_engine, setup_db):
    TestSessionLocal = async_sessionmaker(test_engine, expire_on_commit=False)
    async with TestSessionLocal() as session:
        yield session


@pytest.fixture
def mock_redis():
    store = {}

    class MockRedis:
        async def setex(self, key, ttl, value):
            store[key] = value

        async def set(self, key, value, *args, **kwargs):
            store[key] = value

        async def get(self, key):
            return store.get(key)

        async def delete(self, key):
            store.pop(key, None)

        async def getex(self, key):
            return store.get(key)

    return MockRedis()


@pytest_asyncio.fixture
async def client(db_session, mock_redis):
    async def override_get_db():
        yield db_session

    app.dependency_overrides[get_db] = override_get_db

    # Override Redis in auth, admin and assessment routers
    from app.routers.admin import get_redis as admin_get_redis
    from app.routers.assessment import get_redis as assessment_get_redis
    from app.routers.auth import get_redis as auth_get_redis

    app.dependency_overrides[auth_get_redis] = lambda: mock_redis
    app.dependency_overrides[admin_get_redis] = lambda: mock_redis
    app.dependency_overrides[assessment_get_redis] = lambda: mock_redis

    # Override centralized get_redis from deps.py (used by require_subscription, etc.)
    from app.core.deps import get_redis as deps_get_redis

    app.dependency_overrides[deps_get_redis] = lambda: mock_redis

    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        yield ac
    app.dependency_overrides.clear()


@pytest_asyncio.fixture
async def test_user(db_session):
    from app.core.security import hash_password
    from app.models.user import User

    user = User(
        username="testuser",
        email="test@example.com",
        display_name="Test User",
        hashed_password=hash_password("testpass"),
        role="user",
        native_language="es",
        is_active=True,
    )
    db_session.add(user)
    await db_session.commit()
    await db_session.refresh(user)

    token = create_access_token(user.id, user.role)
    return user, {"Authorization": f"Bearer {token}"}


@pytest_asyncio.fixture
async def admin_user(db_session):
    from app.core.security import hash_password
    from app.models.user import User

    user = User(
        username="admin",
        email="admin@example.com",
        display_name="Admin",
        hashed_password=hash_password("adminpass"),
        role="admin",
        native_language="en",
        is_active=True,
    )
    db_session.add(user)
    await db_session.commit()
    await db_session.refresh(user)

    token = create_access_token(user.id, user.role)
    return user, {"Authorization": f"Bearer {token}"}
