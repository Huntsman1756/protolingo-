import pytest


@pytest.mark.asyncio
async def test_register_success(client):
    response = await client.post(
        "/api/auth/register",
        json={
            "username": "newuser",
            "email": "new@test.com",
            "password": "securepass",
            "display_name": "New User",
            "native_language": "es",
        },
    )
    assert response.status_code == 200
    data = response.json()
    assert data["username"] == "newuser"
    assert data["role"] == "admin"
    assert "access_token" in data
    assert "refresh_token" in response.cookies


@pytest.mark.asyncio
async def test_register_duplicate_username(client):
    await client.post(
        "/api/auth/register",
        json={
            "username": "dup",
            "email": "dup@test.com",
            "password": "pass1234",
            "display_name": "Dup",
            "native_language": "es",
        },
    )
    response = await client.post(
        "/api/auth/register",
        json={
            "username": "dup",
            "email": "dup2@test.com",
            "password": "pass5678",
            "display_name": "Dup2",
            "native_language": "fr",
        },
    )
    assert response.status_code == 409


@pytest.mark.asyncio
async def test_register_when_closed_without_invite(client):
    from app.core.config import settings

    original = settings.ALLOW_REGISTRATION
    settings.ALLOW_REGISTRATION = False
    try:
        response = await client.post(
            "/api/auth/register",
            json={
                "username": "locked",
                "email": "locked@test.com",
                "password": "pass1234",
                "display_name": "Locked",
                "native_language": "es",
            },
        )
        assert response.status_code == 403
    finally:
        settings.ALLOW_REGISTRATION = original


@pytest.mark.asyncio
async def test_first_user_is_admin(client):
    response = await client.post(
        "/api/auth/register",
        json={
            "username": "first",
            "email": "first@test.com",
            "password": "pass1234",
            "display_name": "First",
            "native_language": "en",
        },
    )
    assert response.status_code == 200
    data = response.json()
    assert data["role"] == "admin"


@pytest.mark.asyncio
async def test_second_user_is_not_admin(client):
    await client.post(
        "/api/auth/register",
        json={
            "username": "admin_first",
            "email": "adminfirst@test.com",
            "password": "pass1234",
            "display_name": "Admin",
            "native_language": "en",
        },
    )
    response = await client.post(
        "/api/auth/register",
        json={
            "username": "regular",
            "email": "regular@test.com",
            "password": "pass1234",
            "display_name": "Regular",
            "native_language": "es",
        },
    )
    assert response.status_code == 200
    data = response.json()
    assert data["role"] == "user"


@pytest.mark.asyncio
async def test_login_success_and_sets_cookie(client):
    await client.post(
        "/api/auth/register",
        json={
            "username": "loginuser",
            "email": "loginuser@test.com",
            "password": "testpass",
            "display_name": "Login",
            "native_language": "es",
        },
    )
    response = await client.post(
        "/api/auth/login",
        json={"email": "loginuser@test.com", "password": "testpass"},
    )
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"
    assert "refresh_token" in response.cookies


@pytest.mark.asyncio
async def test_login_invalid_credentials(client):
    response = await client.post(
        "/api/auth/login",
        json={"email": "nobody@test.com", "password": "wrong"},
    )
    assert response.status_code == 401


@pytest.mark.asyncio
async def test_login_inactive_user(client, db_session):
    from app.models.user import User
    from app.core.security import hash_password

    user = User(
        username="inactive",
        email="inactive@test.com",
        display_name="Inactive",
        hashed_password=hash_password("testpass"),
        role="user",
        native_language="es",
        is_active=False,
    )
    db_session.add(user)
    await db_session.commit()

    response = await client.post(
        "/api/auth/login",
        json={"email": "inactive@test.com", "password": "testpass"},
    )
    assert response.status_code == 401


@pytest.mark.asyncio
async def test_refresh_rotates_token(client):
    await client.post(
        "/api/auth/register",
        json={
            "username": "refreshuser",
            "email": "refreshuser@test.com",
            "password": "testpass",
            "display_name": "Refresh",
            "native_language": "en",
        },
    )
    login_resp = await client.post(
        "/api/auth/login",
        json={"email": "refreshuser@test.com", "password": "testpass"},
    )
    refresh_cookie = login_resp.cookies.get("refresh_token")

    client.cookies.set("refresh_token", refresh_cookie)
    response = await client.post("/api/auth/refresh")
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data


@pytest.mark.asyncio
async def test_refresh_missing_cookie(client):
    response = await client.post("/api/auth/refresh")
    assert response.status_code == 401


@pytest.mark.asyncio
async def test_refresh_replayed_token(client):
    await client.post(
        "/api/auth/register",
        json={
            "username": "replayuser",
            "email": "replayuser@test.com",
            "password": "testpass1",
            "display_name": "Replay",
            "native_language": "en",
        },
    )
    login_resp = await client.post(
        "/api/auth/login",
        json={"email": "replayuser@test.com", "password": "testpass1"},
    )
    refresh_cookie = login_resp.cookies.get("refresh_token")

    client.cookies.set("refresh_token", refresh_cookie)
    await client.post("/api/auth/refresh")

    client.cookies.set("refresh_token", refresh_cookie)
    response = await client.post("/api/auth/refresh")
    assert response.status_code == 401


@pytest.mark.asyncio
async def test_logout(client):
    await client.post(
        "/api/auth/register",
        json={
            "username": "logoutuser",
            "email": "logoutuser@test.com",
            "password": "testpass1",
            "display_name": "Logout",
            "native_language": "en",
        },
    )
    login_resp = await client.post(
        "/api/auth/login",
        json={"email": "logoutuser@test.com", "password": "testpass1"},
    )
    refresh_cookie = login_resp.cookies.get("refresh_token")

    client.cookies.set("refresh_token", refresh_cookie)
    response = await client.post("/api/auth/logout")
    assert response.status_code == 200
    assert response.json()["detail"] == "Logged out"


@pytest.mark.asyncio
async def test_get_me_authenticated(client, test_user):
    user, headers = test_user

    response = await client.get("/api/auth/me", headers=headers)
    assert response.status_code == 200
    data = response.json()
    assert data["username"] == "testuser"
    assert data["role"] == "user"


@pytest.mark.asyncio
async def test_get_me_unauthenticated(client):
    response = await client.get("/api/auth/me")
    assert response.status_code == 401


@pytest.mark.asyncio
async def test_patch_me(client, test_user):
    user, headers = test_user

    response = await client.patch(
        "/api/auth/me",
        headers=headers,
        json={"display_name": "Updated Name"},
    )
    assert response.status_code == 200
    data = response.json()
    assert data["display_name"] == "Updated Name"


@pytest.mark.asyncio
async def test_patch_me_duplicate_email(client, db_session):
    """M-03: PATCH /me should reject an email already used by another user."""
    from app.models.user import User
    from app.core.security import hash_password, create_access_token

    user_a = User(
        username="user_a",
        email="user_a@test.com",
        display_name="A",
        hashed_password=hash_password("pass1234"),
        role="user",
        native_language="es",
        is_active=True,
    )
    user_b = User(
        username="user_b",
        email="user_b@test.com",
        display_name="B",
        hashed_password=hash_password("pass1234"),
        role="user",
        native_language="en",
        is_active=True,
    )
    db_session.add(user_a)
    db_session.add(user_b)
    await db_session.commit()
    await db_session.refresh(user_b)

    token = create_access_token(user_b.id, user_b.role)
    headers = {"Authorization": f"Bearer {token}"}

    response = await client.patch(
        "/api/auth/me",
        headers=headers,
        json={"email": "user_a@test.com"},
    )
    assert response.status_code == 409


@pytest.mark.asyncio
async def test_patch_me_same_email_allowed(client, test_user):
    """M-03: PATCH /me with the user's own current email should succeed."""
    user, headers = test_user

    response = await client.patch(
        "/api/auth/me",
        headers=headers,
        json={"email": "test@example.com"},
    )
    assert response.status_code == 200
