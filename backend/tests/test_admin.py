import pytest


@pytest.mark.asyncio
async def test_list_users_as_admin(client, admin_user):
    admin, headers = admin_user

    response = await client.get("/api/admin/users", headers=headers)
    assert response.status_code == 200
    data = response.json()
    assert "items" in data
    assert "total" in data
    assert data["total"] >= 1
    assert any(u["username"] == "admin" for u in data["items"])


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
                "password": "Test1234!@",
                "display_name": "New Admin User",
                "native_language": "es",
                "target_language": "en",
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
            "password": "Test1234!@",
            "display_name": "Dup",
            "native_language": "es",
            "target_language": "en",
        },
    )
    response = await client.post(
        "/api/admin/users",
        headers=headers,
        json={
            "username": "dupuser",
            "password": "Test1234!@",
            "display_name": "Dup2",
            "native_language": "fr",
            "target_language": "en",
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


@pytest.mark.asyncio
async def test_create_user_invalid_language(client, admin_user):
    """M-04: AdminUserCreate should reject unsupported native_language codes."""
    admin, headers = admin_user

    response = await client.post(
        "/api/admin/users",
        headers=headers,
        json={
            "username": "langtest",
            "password": "Test1234!@",
            "display_name": "Lang Test",
            "native_language": "xx",  # unsupported
            "role": "user",
        },
    )
    assert response.status_code == 422


@pytest.mark.asyncio
async def test_create_user_invalid_email(client, admin_user):
    """M-04: AdminUserCreate should reject malformed email addresses."""
    admin, headers = admin_user

    response = await client.post(
        "/api/admin/users",
        headers=headers,
        json={
            "username": "emailtest",
            "password": "Test1234!@",
            "display_name": "Email Test",
            "native_language": "es",
            "email": "not-an-email",
            "role": "user",
        },
    )
    assert response.status_code == 422


@pytest.mark.asyncio
async def test_list_users_pagination(client, admin_user, db_session):
    """M-07: GET /api/admin/users should support skip/limit pagination."""
    from app.core.security import hash_password
    from app.models.user import User

    admin, headers = admin_user

    for i in range(5):
        db_session.add(
            User(
                username=f"paguser{i}",
                email=f"paguser{i}@test.com",
                display_name=f"Pag {i}",
                hashed_password=hash_password("pass1234"),
                role="user",
                native_language="es",
                is_active=True,
            )
        )
    await db_session.commit()

    resp_page1 = await client.get("/api/admin/users?skip=0&limit=3", headers=headers)
    assert resp_page1.status_code == 200
    data1 = resp_page1.json()
    assert len(data1["items"]) == 3
    assert data1["total"] >= 6  # 1 admin + 5 extra
    assert data1["limit"] == 3

    resp_page2 = await client.get("/api/admin/users?skip=3&limit=3", headers=headers)
    assert resp_page2.status_code == 200
    data2 = resp_page2.json()
    assert len(data2["items"]) >= 1

    # Usernames across pages must be disjoint
    names1 = {u["username"] for u in data1["items"]}
    names2 = {u["username"] for u in data2["items"]}
    assert names1.isdisjoint(names2)
