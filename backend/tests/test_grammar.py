"""Tests for the grammar API endpoints."""

import pytest

# ── GET /api/grammar ──────────────────────────────────────────────────────────


@pytest.mark.asyncio
async def test_list_grammar_topics_default_language(client, test_user):
    """GET /api/grammar without language query returns English topics."""
    _, headers = test_user
    response = await client.get("/api/grammar", headers=headers)
    assert response.status_code == 200
    data = response.json()
    assert "topics" in data
    assert isinstance(data["topics"], list)
    assert len(data["topics"]) > 0
    for t in data["topics"]:
        assert "slug" in t
        assert "title" in t
        assert "level" in t
        assert "category" in t
        assert "summary" in t
        assert "explanation" in t
        assert "rules" in t
        assert isinstance(t["rules"], list)
        assert "examples" in t
        assert isinstance(t["examples"], list)
        for e in t["examples"]:
            assert "text" in e
            assert "english" not in e
        assert "common_mistakes" in t
        assert "related" in t


@pytest.mark.asyncio
async def test_list_grammar_topics_spanish_language(client, test_user):
    """GET /api/grammar?language=es-ES returns Spanish topics."""
    _, headers = test_user
    response = await client.get("/api/grammar?language=es-ES", headers=headers)
    assert response.status_code == 200
    data = response.json()
    assert len(data["topics"]) > 0
    titles = [t["title"] for t in data["topics"]]
    assert any(
        "Pretérito" in title or "pretérito" in title or "sido" in title or "haber" in title
        for title in titles
    )


@pytest.mark.asyncio
async def test_list_grammar_requires_auth(client):
    """GET /api/grammar without auth returns 401."""
    response = await client.get("/api/grammar")
    assert response.status_code == 401


# ── GET /api/grammar/{slug} ───────────────────────────────────────────────────


@pytest.mark.asyncio
async def test_get_grammar_topic_detail_exists(client, test_user):
    """GET /api/grammar/{slug} returns the topic when it exists."""
    _, headers = test_user
    list_res = await client.get("/api/grammar", headers=headers)
    topics = list_res.json()["topics"]
    assert len(topics) > 0
    slug = topics[0]["slug"]

    response = await client.get(f"/api/grammar/{slug}", headers=headers)
    assert response.status_code == 200
    data = response.json()
    assert "topic" in data
    assert data["topic"]["slug"] == slug
    assert data["topic"]["title"] == topics[0]["title"]
    assert data["topic"]["level"] == topics[0]["level"]
    assert len(data["topic"]["rules"]) == len(topics[0]["rules"])


@pytest.mark.asyncio
async def test_get_grammar_topic_detail_not_found(client, test_user):
    """GET /api/grammar/{slug} returns 404 for non-existent topic."""
    _, headers = test_user
    response = await client.get("/api/grammar/nonexistent-topic-slug-xyz", headers=headers)
    assert response.status_code == 404
    assert response.json()["detail"] == "Grammar topic not found"


@pytest.mark.asyncio
async def test_get_grammar_topic_detail_spanish(client, test_user):
    """GET /api/grammar/{slug}?language=es-ES returns Spanish topic."""
    _, headers = test_user
    list_res = await client.get("/api/grammar?language=es-ES", headers=headers)
    topics = list_res.json()["topics"]
    assert len(topics) > 0
    slug = topics[0]["slug"]

    response = await client.get(f"/api/grammar/{slug}?language=es-ES", headers=headers)
    assert response.status_code == 200
    assert response.json()["topic"]["slug"] == slug


@pytest.mark.asyncio
async def test_get_grammar_topic_detail_requires_auth(client):
    """GET /api/grammar/{slug} without auth returns 401."""
    response = await client.get("/api/grammar/some-slug")
    assert response.status_code == 401


# ── Language switching ────────────────────────────────────────────────────────


@pytest.mark.asyncio
async def test_different_languages_return_different_topics(client, test_user):
    """English and Spanish grammar should return different topics."""
    _, headers = test_user

    en_res = await client.get("/api/grammar?language=en-US", headers=headers)
    es_res = await client.get("/api/grammar?language=es-ES", headers=headers)

    en_slugs = {t["slug"] for t in en_res.json()["topics"]}
    es_slugs = {t["slug"] for t in es_res.json()["topics"]}

    assert en_slugs != es_slugs, "English and Spanish grammar topics should differ"


@pytest.mark.asyncio
async def test_unknown_language_falls_back_to_english(client, test_user):
    """An unknown language code should fall back to English topics."""
    _, headers = test_user

    en_res = await client.get("/api/grammar?language=en-GB", headers=headers)
    unknown_res = await client.get("/api/grammar?language=ja-JP", headers=headers)

    en_slugs = {t["slug"] for t in en_res.json()["topics"]}
    unknown_slugs = {t["slug"] for t in unknown_res.json()["topics"]}

    assert en_slugs == unknown_slugs, "Unknown language should fall back to English"
