"""Unit tests for the rate limiter _get_real_ip helper."""

from __future__ import annotations

from unittest.mock import MagicMock

from app.core.limiter import _get_real_ip, limiter


class TestGetRealIp:
    def test_x_real_ip_header(self):
        request = MagicMock()
        request.headers = {"X-Real-IP": "10.0.0.1"}
        request.client = None

        assert _get_real_ip(request) == "10.0.0.1"

    def test_x_forwarded_for_single_ip(self):
        request = MagicMock()
        request.headers = {"X-Forwarded-For": "192.168.1.100"}
        request.client = None

        assert _get_real_ip(request) == "192.168.1.100"

    def test_x_forwarded_for_multiple_ips(self):
        request = MagicMock()
        request.headers = {"X-Forwarded-For": "192.168.1.100, 10.0.0.2, 172.16.0.1"}
        request.client = None

        assert _get_real_ip(request) == "192.168.1.100"

    def test_x_forwarded_for_with_spaces(self):
        request = MagicMock()
        request.headers = {"X-Forwarded-For": "  10.0.0.1 , 192.168.1.1  "}
        request.client = None

        assert _get_real_ip(request) == "10.0.0.1"

    def test_falls_back_to_client_host(self):
        request = MagicMock()
        request.headers = {}
        request.client.host = "127.0.0.1"

        assert _get_real_ip(request) == "127.0.0.1"

    def test_x_real_ip_takes_priority_over_x_forwarded_for(self):
        request = MagicMock()
        request.headers = {"X-Real-IP": "10.0.0.1", "X-Forwarded-For": "192.168.1.1"}
        request.client = None

        assert _get_real_ip(request) == "10.0.0.1"

    def test_no_client_and_no_headers_returns_unknown(self):
        request = MagicMock()
        request.headers = {}
        request.client = None

        assert _get_real_ip(request) == "unknown"


class TestLimiterConstruction:
    def test_limiter_created_with_real_ip_key_func(self):
        assert limiter._key_func is _get_real_ip

    def test_limiter_is_disabled_for_testing(self):
        assert limiter.enabled is False
