"""Tests for the phrasebook API endpoints."""

from __future__ import annotations

import pytest

# ── GET /api/phrasebook ───────────────────────────────────────────────────────


@pytest.mark.asyncio
async def test_list_phrasebook_categories_default_language(client, test_user):
    """GET /api/phrasebook without language query returns English categories."""
    _, headers = test_user
    response = await client.get("/api/phrasebook", headers=headers)
    assert response.status_code == 200
    data = response.json()
    assert "categories" in data
    assert isinstance(data["categories"], list)
    assert len(data["categories"]) > 0
    for c in data["categories"]:
        assert "id" in c
        assert "level" in c
        assert "situation" in c
        assert "icon" in c
        assert "phrases" in c
        assert isinstance(c["phrases"], list)
        assert len(c["phrases"]) > 0
        for p in c["phrases"]:
            assert "text" in p
            assert "context" in p
            assert "register" in p
            # "english" must not exist (migrated to "text")
            assert "english" not in p


@pytest.mark.asyncio
async def test_list_phrasebook_categories_spanish_language(client, test_user):
    """GET /api/phrasebook?language=es-ES returns Spanish categories."""
    _, headers = test_user
    response = await client.get("/api/phrasebook?language=es-ES", headers=headers)
    assert response.status_code == 200
    data = response.json()
    assert len(data["categories"]) > 0
    # Spanish categories have Spanish situation names
    situations = [c["situation"] for c in data["categories"]]
    assert any("Saludos" in s for s in situations)


@pytest.mark.asyncio
async def test_list_phrasebook_requires_auth(client):
    """GET /api/phrasebook without auth returns 401."""
    response = await client.get("/api/phrasebook")
    assert response.status_code == 401


# ── GET /api/phrasebook/level/{level} ──────────────────────────────────────────


@pytest.mark.asyncio
async def test_list_phrasebook_by_level_a1(client, test_user):
    """GET /api/phrasebook/level/A1 returns only A1 categories."""
    _, headers = test_user
    response = await client.get("/api/phrasebook/level/A1", headers=headers)
    assert response.status_code == 200
    data = response.json()
    assert len(data["categories"]) > 0
    for c in data["categories"]:
        assert c["level"] == "A1"


@pytest.mark.asyncio
async def test_list_phrasebook_by_level_case_insensitive(client, test_user):
    """GET /api/phrasebook/level/a1 (lowercase) also works."""
    _, headers = test_user
    response = await client.get("/api/phrasebook/level/a1", headers=headers)
    assert response.status_code == 200
    data = response.json()
    assert len(data["categories"]) > 0
    for c in data["categories"]:
        assert c["level"] == "A1"


@pytest.mark.asyncio
async def test_list_phrasebook_by_level_invalid(client, test_user):
    """GET /api/phrasebook/level/X9 returns 400."""
    _, headers = test_user
    response = await client.get("/api/phrasebook/level/X9", headers=headers)
    assert response.status_code == 400
    assert "Invalid CEFR level" in response.json()["detail"]


@pytest.mark.asyncio
async def test_list_phrasebook_by_level_spanish(client, test_user):
    """GET /api/phrasebook/level/A2?language=es-ES returns Spanish A2 categories."""
    _, headers = test_user
    response = await client.get("/api/phrasebook/level/A2?language=es-ES", headers=headers)
    assert response.status_code == 200
    data = response.json()
    assert len(data["categories"]) > 0
    for c in data["categories"]:
        assert c["level"] == "A2"


@pytest.mark.asyncio
async def test_list_phrasebook_by_level_requires_auth(client):
    """GET /api/phrasebook/level/A1 without auth returns 401."""
    response = await client.get("/api/phrasebook/level/A1")
    assert response.status_code == 401


# ── GET /api/phrasebook/{category_id} ──────────────────────────────────────────


@pytest.mark.asyncio
async def test_get_phrasebook_category_detail_exists(client, test_user):
    """GET /api/phrasebook/{category_id} returns the category when it exists."""
    _, headers = test_user
    list_res = await client.get("/api/phrasebook", headers=headers)
    categories = list_res.json()["categories"]
    assert len(categories) > 0
    category_id = categories[0]["id"]

    response = await client.get(f"/api/phrasebook/{category_id}", headers=headers)
    assert response.status_code == 200
    data = response.json()
    assert "category" in data
    assert data["category"]["id"] == category_id
    assert data["category"]["level"] == categories[0]["level"]
    assert data["category"]["situation"] == categories[0]["situation"]
    assert len(data["category"]["phrases"]) == len(categories[0]["phrases"])


@pytest.mark.asyncio
async def test_get_phrasebook_category_detail_not_found(client, test_user):
    """GET /api/phrasebook/{category_id} returns 404 for non-existent category."""
    _, headers = test_user
    response = await client.get("/api/phrasebook/nonexistent_category_id_123", headers=headers)
    assert response.status_code == 404
    assert response.json()["detail"] == "Phrasebook category not found"


@pytest.mark.asyncio
async def test_get_phrasebook_category_detail_spanish(client, test_user):
    """GET /api/phrasebook/{category_id}?language=es-ES returns Spanish category."""
    _, headers = test_user
    list_res = await client.get("/api/phrasebook?language=es-ES", headers=headers)
    categories = list_res.json()["categories"]
    assert len(categories) > 0
    category_id = categories[0]["id"]

    response = await client.get(f"/api/phrasebook/{category_id}?language=es-ES", headers=headers)
    assert response.status_code == 200
    assert response.json()["category"]["id"] == category_id


@pytest.mark.asyncio
async def test_get_phrasebook_category_detail_requires_auth(client):
    """GET /api/phrasebook/{category_id} without auth returns 401."""
    response = await client.get("/api/phrasebook/some_id")
    assert response.status_code == 401


# ── Language switching ─────────────────────────────────────────────────────────


@pytest.mark.asyncio
async def test_different_languages_return_different_categories(client, test_user):
    """English and Spanish phrasebooks should return different category content."""
    _, headers = test_user

    en_res = await client.get("/api/phrasebook?language=en-US", headers=headers)
    es_res = await client.get("/api/phrasebook?language=es-ES", headers=headers)

    en_situations = {c["situation"] for c in en_res.json()["categories"]}
    es_situations = {c["situation"] for c in es_res.json()["categories"]}

    assert en_situations != es_situations, "English and Spanish phrasebook situations should differ"


@pytest.mark.asyncio
async def test_unknown_language_falls_back_to_english(client, test_user):
    """An unknown language code should fall back to English categories."""
    _, headers = test_user

    en_res = await client.get("/api/phrasebook?language=en-US", headers=headers)
    unknown_res = await client.get("/api/phrasebook?language=ja-JP", headers=headers)

    en_ids = {c["id"] for c in en_res.json()["categories"]}
    unknown_ids = {c["id"] for c in unknown_res.json()["categories"]}

    assert en_ids == unknown_ids, "Unknown language should fall back to English"
