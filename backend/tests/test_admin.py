import pytest


@pytest.mark.asyncio
async def test_list_users_as_admin(client, admin_user):
    admin, headers = admin_user

    response = await client.get("/api/admin/users", headers=headers)
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert any(u["username"] == "admin" for u in data)


@pytest.mark.asyncio
async def test_list_users_as_non_admin(client, test_user):
    user, headers = test_user

    response = await client.get("/api/admin/users", headers=headers)
    assert response.status_code == 403


@pytest.mark.asyncio
async def test_list_users_unauthenticated(client):
    response = await client.get("/api/admin/users")
    assert response.status_code == 401


@pytest.mark.asyncio
async def test_create_user_as_admin(client, admin_user):
    admin, headers = admin_user

    response = await client.post(
        "/api/admin/users",
        headers=headers,
        json={
            "username": "newadminuser",
            "password": "newpassword",
            "display_name": "New Admin User",
            "native_language": "es",
            "role": "user",
        },
    )
    assert response.status_code == 200
    data = response.json()
    assert data["username"] == "newadminuser"
    assert data["role"] == "user"


@pytest.mark.asyncio
async def test_create_user_duplicate_username(client, admin_user):
    admin, headers = admin_user

    await client.post(
        "/api/admin/users",
        headers=headers,
        json={
            "username": "dupuser",
            "password": "newpassword",
            "display_name": "Dup",
            "native_language": "es",
        },
    )
    response = await client.post(
        "/api/admin/users",
        headers=headers,
        json={
            "username": "dupuser",
            "password": "newpassword",
            "display_name": "Dup2",
            "native_language": "fr",
        },
    )
    assert response.status_code == 409


@pytest.mark.asyncio
async def test_get_user_as_admin(client, admin_user, test_user):
    admin, headers = admin_user
    user, _ = test_user

    response = await client.get(f"/api/admin/users/{user.id}", headers=headers)
    assert response.status_code == 200
    data = response.json()
    assert data["username"] == "testuser"


@pytest.mark.asyncio
async def test_get_user_not_found(client, admin_user):
    admin, headers = admin_user

    response = await client.get("/api/admin/users/99999", headers=headers)
    assert response.status_code == 404


@pytest.mark.asyncio
async def test_update_user_as_admin(client, admin_user, test_user):
    admin, headers = admin_user
    user, _ = test_user

    response = await client.patch(
        f"/api/admin/users/{user.id}",
        headers=headers,
        json={"display_name": "Updated by Admin"},
    )
    assert response.status_code == 200
    assert response.json()["display_name"] == "Updated by Admin"


@pytest.mark.asyncio
async def test_update_user_not_found(client, admin_user):
    admin, headers = admin_user

    response = await client.patch(
        "/api/admin/users/99999",
        headers=headers,
        json={"display_name": "Ghost"},
    )
    assert response.status_code == 404


@pytest.mark.asyncio
async def test_delete_user_as_admin(client, admin_user, test_user):
    admin, headers = admin_user
    user, _ = test_user

    response = await client.delete(f"/api/admin/users/{user.id}", headers=headers)
    assert response.status_code == 200
    assert response.json()["detail"] == "User deleted"


@pytest.mark.asyncio
async def test_delete_self_forbidden(client, admin_user):
    admin, headers = admin_user

    response = await client.delete(f"/api/admin/users/{admin.id}", headers=headers)
    assert response.status_code == 400


@pytest.mark.asyncio
async def test_delete_user_not_found(client, admin_user):
    admin, headers = admin_user

    response = await client.delete("/api/admin/users/99999", headers=headers)
    assert response.status_code == 404


@pytest.mark.asyncio
async def test_create_invite_as_admin(client, admin_user, mock_redis):
    admin, headers = admin_user

    response = await client.post("/api/admin/invite", headers=headers)
    assert response.status_code == 200
    data = response.json()
    assert "invite_url" in data
    assert "/register?invite=" in data["invite_url"]


@pytest.mark.asyncio
async def test_create_invite_as_non_admin(client, test_user):
    user, headers = test_user

    response = await client.post("/api/admin/invite", headers=headers)
    assert response.status_code == 403
