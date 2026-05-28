"""Tests for avatar upload, replacement, and deletion (POST/DELETE /api/auth/me/avatar)."""

import io
from unittest.mock import patch

import pytest

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

# Minimal bytes that satisfy the backend's content-type check (the backend does
# NOT validate the actual image bytes, only content_type and size).
FAKE_JPEG = b"\xff\xd8\xff" + b"\x00" * 16  # starts with JPEG magic bytes
FAKE_PNG = b"\x89PNG\r\n\x1a\n" + b"\x00" * 16


def _jpeg_file(data: bytes = FAKE_JPEG) -> tuple:
    """Return a files-dict entry for an httpx multipart upload."""
    return ("avatar.jpg", io.BytesIO(data), "image/jpeg")


def _png_file(data: bytes = FAKE_PNG) -> tuple:
    return ("avatar.png", io.BytesIO(data), "image/png")


# ---------------------------------------------------------------------------
# Fixture: redirect _AVATARS_DIR to a temp directory for each test
# ---------------------------------------------------------------------------


@pytest.fixture
def avatars_dir(tmp_path):
    """Patch the module-level _AVATARS_DIR constant to a temporary directory."""
    d = tmp_path / "avatars"
    d.mkdir()
    with patch("app.routers.auth._AVATARS_DIR", str(d)):
        yield d


# ---------------------------------------------------------------------------
# Upload tests
# ---------------------------------------------------------------------------


class TestAvatarUpload:
    @pytest.mark.asyncio
    async def test_upload_jpeg_returns_200(self, client, test_user, avatars_dir):
        user, headers = test_user
        resp = await client.post(
            "/api/auth/me/avatar",
            headers=headers,
            files={"file": _jpeg_file()},
        )
        assert resp.status_code == 200

    @pytest.mark.asyncio
    async def test_upload_jpeg_avatar_url_stored_in_db(self, client, test_user, avatars_dir):
        user, headers = test_user
        resp = await client.post(
            "/api/auth/me/avatar",
            headers=headers,
            files={"file": _jpeg_file()},
        )
        data = resp.json()
        assert data["avatar"].startswith(f"/api/avatars/{user.id}.jpg")

    @pytest.mark.asyncio
    async def test_upload_jpeg_url_contains_cache_buster(self, client, test_user, avatars_dir):
        user, headers = test_user
        resp = await client.post(
            "/api/auth/me/avatar",
            headers=headers,
            files={"file": _jpeg_file()},
        )
        assert "?v=" in resp.json()["avatar"]

    @pytest.mark.asyncio
    async def test_upload_jpeg_file_written_to_disk(self, client, test_user, avatars_dir):
        user, headers = test_user
        await client.post(
            "/api/auth/me/avatar",
            headers=headers,
            files={"file": _jpeg_file()},
        )
        assert (avatars_dir / f"{user.id}.jpg").exists()

    @pytest.mark.asyncio
    async def test_upload_jpeg_file_content_matches(self, client, test_user, avatars_dir):
        user, headers = test_user
        await client.post(
            "/api/auth/me/avatar",
            headers=headers,
            files={"file": _jpeg_file(FAKE_JPEG)},
        )
        saved = (avatars_dir / f"{user.id}.jpg").read_bytes()
        assert saved == FAKE_JPEG

    @pytest.mark.asyncio
    async def test_upload_png_returns_200(self, client, test_user, avatars_dir):
        user, headers = test_user
        resp = await client.post(
            "/api/auth/me/avatar",
            headers=headers,
            files={"file": _png_file()},
        )
        assert resp.status_code == 200

    @pytest.mark.asyncio
    async def test_upload_png_stores_png_url(self, client, test_user, avatars_dir):
        user, headers = test_user
        resp = await client.post(
            "/api/auth/me/avatar",
            headers=headers,
            files={"file": _png_file()},
        )
        assert f"/api/avatars/{user.id}.png" in resp.json()["avatar"]

    @pytest.mark.asyncio
    async def test_upload_png_file_written_to_disk(self, client, test_user, avatars_dir):
        user, headers = test_user
        await client.post(
            "/api/auth/me/avatar",
            headers=headers,
            files={"file": _png_file()},
        )
        assert (avatars_dir / f"{user.id}.png").exists()

    @pytest.mark.asyncio
    async def test_upload_invalid_type_rejected(self, client, test_user, avatars_dir):
        user, headers = test_user
        resp = await client.post(
            "/api/auth/me/avatar",
            headers=headers,
            files={"file": ("avatar.gif", io.BytesIO(b"GIF89a"), "image/gif")},
        )
        assert resp.status_code == 400
        assert "JPEG" in resp.json()["detail"] or "PNG" in resp.json()["detail"]

    @pytest.mark.asyncio
    async def test_upload_too_large_rejected(self, client, test_user, avatars_dir):
        user, headers = test_user
        big = b"x" * (2 * 1024 * 1024 + 1)
        resp = await client.post(
            "/api/auth/me/avatar",
            headers=headers,
            files={"file": ("big.jpg", io.BytesIO(big), "image/jpeg")},
        )
        assert resp.status_code == 400
        assert "2 MB" in resp.json()["detail"]

    @pytest.mark.asyncio
    async def test_upload_requires_auth(self, client, avatars_dir):
        resp = await client.post(
            "/api/auth/me/avatar",
            files={"file": _jpeg_file()},
        )
        assert resp.status_code == 401

    # --- Re-upload behaviour ---

    @pytest.mark.asyncio
    async def test_reupload_same_format_replaces_file(self, client, test_user, avatars_dir):
        user, headers = test_user
        await client.post(
            "/api/auth/me/avatar",
            headers=headers,
            files={"file": _jpeg_file(b"\xff\xd8\xff" + b"\xaa" * 16)},
        )
        await client.post(
            "/api/auth/me/avatar",
            headers=headers,
            files={"file": _jpeg_file(b"\xff\xd8\xff" + b"\xbb" * 16)},
        )
        saved = (avatars_dir / f"{user.id}.jpg").read_bytes()
        assert saved == b"\xff\xd8\xff" + b"\xbb" * 16

    @pytest.mark.asyncio
    async def test_reupload_different_format_deletes_old_file(self, client, test_user, avatars_dir):
        user, headers = test_user
        # Upload JPEG first
        await client.post(
            "/api/auth/me/avatar",
            headers=headers,
            files={"file": _jpeg_file()},
        )
        old_path = avatars_dir / f"{user.id}.jpg"
        assert old_path.exists()

        # Re-upload as PNG
        await client.post(
            "/api/auth/me/avatar",
            headers=headers,
            files={"file": _png_file()},
        )
        assert not old_path.exists(), "Old JPEG should have been deleted"
        assert (avatars_dir / f"{user.id}.png").exists()

    @pytest.mark.asyncio
    async def test_reupload_returns_new_url(self, client, test_user, avatars_dir):
        user, headers = test_user
        await client.post(
            "/api/auth/me/avatar",
            headers=headers,
            files={"file": _jpeg_file()},
        )
        resp2 = await client.post(
            "/api/auth/me/avatar",
            headers=headers,
            files={"file": _jpeg_file()},
        )
        # Both are valid avatar URLs; the cache-buster may differ
        assert resp2.json()["avatar"].startswith(f"/api/avatars/{user.id}.jpg")

    @pytest.mark.asyncio
    async def test_upload_over_legacy_base64_avatar(
        self, client, test_user, db_session, avatars_dir
    ):
        """Uploading when the existing avatar is a legacy base64 data URI should not crash."""
        user, headers = test_user
        # Inject a legacy base64 avatar directly into the DB
        user.avatar = "data:image/jpeg;base64,/9j/fakebase64=="
        await db_session.commit()

        resp = await client.post(
            "/api/auth/me/avatar",
            headers=headers,
            files={"file": _jpeg_file()},
        )
        assert resp.status_code == 200
        avatar_url = resp.json()["avatar"]
        assert avatar_url.startswith(f"/api/avatars/{user.id}.jpg")


# ---------------------------------------------------------------------------
# Delete tests
# ---------------------------------------------------------------------------


class TestAvatarDelete:
    @pytest.mark.asyncio
    async def test_delete_returns_200(self, client, test_user, avatars_dir):
        user, headers = test_user
        # Upload first
        await client.post(
            "/api/auth/me/avatar",
            headers=headers,
            files={"file": _jpeg_file()},
        )
        resp = await client.delete("/api/auth/me/avatar", headers=headers)
        assert resp.status_code == 200

    @pytest.mark.asyncio
    async def test_delete_clears_avatar_field(self, client, test_user, avatars_dir):
        user, headers = test_user
        await client.post(
            "/api/auth/me/avatar",
            headers=headers,
            files={"file": _jpeg_file()},
        )
        resp = await client.delete("/api/auth/me/avatar", headers=headers)
        assert resp.json()["avatar"] is None

    @pytest.mark.asyncio
    async def test_delete_removes_file_from_disk(self, client, test_user, avatars_dir):
        user, headers = test_user
        await client.post(
            "/api/auth/me/avatar",
            headers=headers,
            files={"file": _jpeg_file()},
        )
        file_path = avatars_dir / f"{user.id}.jpg"
        assert file_path.exists()

        await client.delete("/api/auth/me/avatar", headers=headers)
        assert not file_path.exists()

    @pytest.mark.asyncio
    async def test_delete_when_no_avatar_is_ok(self, client, test_user, avatars_dir):
        """DELETE with no existing avatar should not error."""
        _, headers = test_user
        resp = await client.delete("/api/auth/me/avatar", headers=headers)
        assert resp.status_code == 200
        assert resp.json()["avatar"] is None

    @pytest.mark.asyncio
    async def test_delete_legacy_base64_does_not_crash(
        self, client, test_user, db_session, avatars_dir
    ):
        """Deleting a legacy base64 avatar should succeed without touching the filesystem."""
        user, headers = test_user
        user.avatar = "data:image/jpeg;base64,/9j/fakebase64=="
        await db_session.commit()

        resp = await client.delete("/api/auth/me/avatar", headers=headers)
        assert resp.status_code == 200
        assert resp.json()["avatar"] is None

    @pytest.mark.asyncio
    async def test_delete_requires_auth(self, client, avatars_dir):
        resp = await client.delete("/api/auth/me/avatar")
        assert resp.status_code == 401

    # --- GET /api/auth/me reflects avatar state ---

    @pytest.mark.asyncio
    async def test_get_me_reflects_uploaded_avatar(self, client, test_user, avatars_dir):
        user, headers = test_user
        await client.post(
            "/api/auth/me/avatar",
            headers=headers,
            files={"file": _jpeg_file()},
        )
        me = await client.get("/api/auth/me", headers=headers)
        assert me.json()["avatar"].startswith(f"/api/avatars/{user.id}.jpg")

    @pytest.mark.asyncio
    async def test_get_me_reflects_deleted_avatar(self, client, test_user, avatars_dir):
        user, headers = test_user
        await client.post(
            "/api/auth/me/avatar",
            headers=headers,
            files={"file": _jpeg_file()},
        )
        await client.delete("/api/auth/me/avatar", headers=headers)
        me = await client.get("/api/auth/me", headers=headers)
        assert me.json()["avatar"] is None
