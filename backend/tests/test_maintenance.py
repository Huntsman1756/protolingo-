"""Tests for maintenance mode — admin toggle, config exposure, and subscription guard."""

import pytest


@pytest.mark.asyncio
async def test_maintenance_default_off(client, admin_user):
    """GET /api/admin/maintenance returns false when Redis has no value."""
    _, headers = admin_user
    response = await client.get("/api/admin/maintenance", headers=headers)
    assert response.status_code == 200
    assert response.json() == {"maintenance_mode": False}


@pytest.mark.asyncio
async def test_maintenance_toggle_on(client, admin_user):
    """PATCH /api/admin/maintenance toggles from off → on."""
    _, headers = admin_user
    response = await client.patch("/api/admin/maintenance", headers=headers)
    assert response.status_code == 200
    assert response.json() == {"maintenance_mode": True}


@pytest.mark.asyncio
async def test_maintenance_toggle_off(client, admin_user):
    """PATCH toggles from on → off."""
    _, headers = admin_user
    # Turn on first
    await client.patch("/api/admin/maintenance", headers=headers)
    # Turn off
    response = await client.patch("/api/admin/maintenance", headers=headers)
    assert response.status_code == 200
    assert response.json() == {"maintenance_mode": False}


@pytest.mark.asyncio
async def test_maintenance_non_admin_gets_403(client, test_user):
    """Non-admin user cannot access maintenance endpoints."""
    _, headers = test_user
    r_get = await client.get("/api/admin/maintenance", headers=headers)
    assert r_get.status_code == 403
    r_patch = await client.patch("/api/admin/maintenance", headers=headers)
    assert r_patch.status_code == 403


@pytest.mark.asyncio
async def test_maintenance_unauthenticated_gets_401(client):
    """Unauthenticated requests are rejected."""
    r_get = await client.get("/api/admin/maintenance")
    assert r_get.status_code == 401
    r_patch = await client.patch("/api/admin/maintenance")
    assert r_patch.status_code == 401


@pytest.mark.asyncio
async def test_maintenance_mode_returns_503_on_subscription_endpoint(
    client, admin_user, test_user, db_session
):
    """When maintenance mode is ON, subscription-gated endpoints return 503."""
    from app.models.study_plan import StudyPlan

    user, user_headers = test_user
    plan = StudyPlan(
        user_id=user.id,
        cefr_level="A1",
        target_language="en-US",
        goals=["grammar"],
        duration_weeks=4,
        days_per_week=4,
        current_unit="",
        generated_plan={},
        is_active=True,
    )
    db_session.add(plan)
    await db_session.commit()

    # Turn maintenance on
    admin, admin_headers = admin_user
    await client.patch("/api/admin/maintenance", headers=admin_headers)

    # Chat — require_subscription
    r = await client.get("/api/chat/conversations", headers=user_headers)
    assert r.status_code == 503
    assert "maintenance" in r.json()["detail"].lower()

    # Listening — require_subscription
    r = await client.get("/api/listening/next", headers=user_headers)
    assert r.status_code == 503

    # Reading — require_subscription
    r = await client.get("/api/reading/next", headers=user_headers)
    assert r.status_code == 503

    # Turn maintenance off
    await client.patch("/api/admin/maintenance", headers=admin_headers)


@pytest.mark.asyncio
async def test_maintenance_off_endpoints_work(client, admin_user, test_user_with_plan):
    """When maintenance mode is OFF, subscription endpoints behave normally."""
    # Ensure off
    admin, admin_headers = admin_user
    # Turn off if on (idempotent — we don't know the state)
    current = await client.get("/api/admin/maintenance", headers=admin_headers)
    if current.json()["maintenance_mode"]:
        await client.patch("/api/admin/maintenance", headers=admin_headers)

    _, headers = test_user_with_plan

    r = await client.get("/api/chat/conversations", headers=headers)
    # Without STRIPE_ENABLED, subscription check never fires → 200 OK
    assert r.status_code == 200


@pytest.mark.asyncio
async def test_config_exposes_maintenance_mode(client, admin_user):
    """GET /api/config includes maintenance_mode in its response."""
    # Default off
    r = await client.get("/api/config")
    assert r.status_code == 200
    data = r.json()
    assert "maintenance_mode" in data
    assert data["maintenance_mode"] is False

    # Turn on
    _, admin_headers = admin_user
    await client.patch("/api/admin/maintenance", headers=admin_headers)

    r = await client.get("/api/config")
    assert r.json()["maintenance_mode"] is True

    # Turn off
    await client.patch("/api/admin/maintenance", headers=admin_headers)


@pytest.mark.asyncio
async def test_maintenance_does_not_block_free_endpoints(client, admin_user, test_user):
    """Free endpoints (lessons, progress, etc.) are never blocked by maintenance."""
    _, admin_headers = admin_user
    _, user_headers = test_user

    # Turn maintenance on
    await client.patch("/api/admin/maintenance", headers=admin_headers)

    # Progress — free (get_current_user only)
    r = await client.get("/api/progress/summary", headers=user_headers)
    assert r.status_code == 200

    # Config — public
    r = await client.get("/api/config")
    assert r.status_code == 200

    # Turn off
    await client.patch("/api/admin/maintenance", headers=admin_headers)


@pytest.mark.asyncio
async def test_maintenance_admin_can_still_access_admin(client, admin_user):
    """Admin panel itself is not blocked by maintenance mode."""
    _, headers = admin_user

    # Turn on
    await client.patch("/api/admin/maintenance", headers=headers)

    # Admin list should still work
    r = await client.get("/api/admin/users", headers=headers)
    assert r.status_code == 200

    # Turn off
    await client.patch("/api/admin/maintenance", headers=headers)
