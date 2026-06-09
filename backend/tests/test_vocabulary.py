"""Tests for the vocabulary API endpoints."""

from __future__ import annotations

import pytest

# ── GET /api/vocabulary ──────────────────────────────────────────────────────


@pytest.mark.asyncio
async def test_list_vocabulary_sets_default_language(client, test_user):
    """GET /api/vocabulary without language query returns English sets."""
    _, headers = test_user
    response = await client.get("/api/vocabulary", headers=headers)
    assert response.status_code == 200
    data = response.json()
    assert "sets" in data
    assert isinstance(data["sets"], list)
    assert len(data["sets"]) > 0
    # English sets use standard IDs (no language prefix)
    assert any("_a1" in s["id"] or "_a2" in s["id"] for s in data["sets"])
    # Verify set structure
    for s in data["sets"]:
        assert "id" in s
        assert "level" in s
        assert "topic" in s
        assert "unit_ref" in s
        assert "words" in s
        assert isinstance(s["words"], list)
        assert len(s["words"]) > 0
        for w in s["words"]:
            assert "word" in w
            assert "pos" in w
            assert "definition" in w
            assert "example" in w


@pytest.mark.asyncio
async def test_list_vocabulary_sets_spanish_language(client, test_user):
    """GET /api/vocabulary?language=es-ES returns Spanish sets."""
    _, headers = test_user
    response = await client.get("/api/vocabulary?language=es-ES", headers=headers)
    assert response.status_code == 200
    data = response.json()
    assert len(data["sets"]) > 0
    # Spanish sets may use IDs with language prefix like "saludos_es_a1" or plain "saludos_a1"
    assert any("_a1" in s["id"] for s in data["sets"])


@pytest.mark.asyncio
async def test_list_vocabulary_requires_auth(client):
    """GET /api/vocabulary without auth returns 401."""
    response = await client.get("/api/vocabulary")
    assert response.status_code == 401


# ── GET /api/vocabulary/level/{level} ─────────────────────────────────────────


@pytest.mark.asyncio
async def test_list_vocabulary_by_level_a1(client, test_user):
    """GET /api/vocabulary/level/A1 returns only A1 sets."""
    _, headers = test_user
    response = await client.get("/api/vocabulary/level/A1", headers=headers)
    assert response.status_code == 200
    data = response.json()
    assert len(data["sets"]) > 0
    for s in data["sets"]:
        assert s["level"] == "A1"


@pytest.mark.asyncio
async def test_list_vocabulary_by_level_case_insensitive(client, test_user):
    """GET /api/vocabulary/level/a1 (lowercase) also works."""
    _, headers = test_user
    response = await client.get("/api/vocabulary/level/a1", headers=headers)
    assert response.status_code == 200
    data = response.json()
    assert len(data["sets"]) > 0
    for s in data["sets"]:
        assert s["level"] == "A1"


@pytest.mark.asyncio
async def test_list_vocabulary_by_level_invalid(client, test_user):
    """GET /api/vocabulary/level/INVALID returns 400."""
    _, headers = test_user
    response = await client.get("/api/vocabulary/level/X9", headers=headers)
    assert response.status_code == 400
    assert "Invalid CEFR level" in response.json()["detail"]


@pytest.mark.asyncio
async def test_list_vocabulary_by_level_spanish(client, test_user):
    """GET /api/vocabulary/level/A2?language=es-ES returns Spanish A2 sets."""
    _, headers = test_user
    response = await client.get("/api/vocabulary/level/A2?language=es-ES", headers=headers)
    assert response.status_code == 200
    data = response.json()
    assert len(data["sets"]) > 0
    for s in data["sets"]:
        assert s["level"] == "A2"


@pytest.mark.asyncio
async def test_list_vocabulary_by_level_requires_auth(client):
    """GET /api/vocabulary/level/A1 without auth returns 401."""
    response = await client.get("/api/vocabulary/level/A1")
    assert response.status_code == 401


# ── GET /api/vocabulary/{set_id} ──────────────────────────────────────────────


@pytest.mark.asyncio
async def test_get_vocabulary_set_detail_exists(client, test_user):
    """GET /api/vocabulary/{set_id} returns the set when it exists."""
    _, headers = test_user
    # First get all sets to find a valid ID
    list_res = await client.get("/api/vocabulary", headers=headers)
    sets = list_res.json()["sets"]
    assert len(sets) > 0
    set_id = sets[0]["id"]

    response = await client.get(f"/api/vocabulary/{set_id}", headers=headers)
    assert response.status_code == 200
    data = response.json()
    assert "set" in data
    assert data["set"]["id"] == set_id
    assert data["set"]["level"] == sets[0]["level"]
    assert data["set"]["topic"] == sets[0]["topic"]
    assert len(data["set"]["words"]) == len(sets[0]["words"])


@pytest.mark.asyncio
async def test_get_vocabulary_set_detail_not_found(client, test_user):
    """GET /api/vocabulary/{set_id} returns 404 for non-existent set."""
    _, headers = test_user
    response = await client.get("/api/vocabulary/nonexistent_set_id_123", headers=headers)
    assert response.status_code == 404
    assert response.json()["detail"] == "Vocabulary set not found"


@pytest.mark.asyncio
async def test_get_vocabulary_set_detail_spanish(client, test_user):
    """GET /api/vocabulary/{set_id}?language=es-ES returns Spanish set."""
    _, headers = test_user
    # Get a Spanish set ID first
    list_res = await client.get("/api/vocabulary?language=es-ES", headers=headers)
    sets = list_res.json()["sets"]
    assert len(sets) > 0
    set_id = sets[0]["id"]

    response = await client.get(f"/api/vocabulary/{set_id}?language=es-ES", headers=headers)
    assert response.status_code == 200
    assert response.json()["set"]["id"] == set_id


@pytest.mark.asyncio
async def test_get_vocabulary_set_detail_requires_auth(client):
    """GET /api/vocabulary/{set_id} without auth returns 401."""
    response = await client.get("/api/vocabulary/some_id")
    assert response.status_code == 401


# ── Language switching ────────────────────────────────────────────────────────


@pytest.mark.asyncio
async def test_different_languages_return_different_sets(client, test_user):
    """English and Spanish vocabulary should return different set IDs."""
    _, headers = test_user

    en_res = await client.get("/api/vocabulary?language=en-US", headers=headers)
    es_res = await client.get("/api/vocabulary?language=es-ES", headers=headers)

    en_ids = {s["id"] for s in en_res.json()["sets"]}
    es_ids = {s["id"] for s in es_res.json()["sets"]}

    # They should have different content (different set IDs)
    assert en_ids != es_ids, "English and Spanish vocabulary sets should differ"


@pytest.mark.asyncio
async def test_unknown_language_falls_back_to_english(client, test_user):
    """An unknown language code should fall back to English sets."""
    _, headers = test_user

    en_res = await client.get("/api/vocabulary?language=en-GB", headers=headers)
    unknown_res = await client.get("/api/vocabulary?language=ja-JP", headers=headers)

    en_ids = {s["id"] for s in en_res.json()["sets"]}
    unknown_ids = {s["id"] for s in unknown_res.json()["sets"]}

    assert en_ids == unknown_ids, "Unknown language should fall back to English"
