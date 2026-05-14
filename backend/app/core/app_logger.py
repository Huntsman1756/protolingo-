import logging
from typing import Any


def _fmt_fields(fields: dict[str, Any]) -> str:
    """Render key=value pairs in a stable order for easier log parsing."""
    if not fields:
        return ""
    parts: list[str] = []
    for key in sorted(fields.keys()):
        value = fields[key]
        parts.append(f"{key}={value!r}")
    return " ".join(parts)


class AppLogger:
    """Small wrapper over stdlib logging for consistent event-style logs."""

    def __init__(self, name: str) -> None:
        self._logger = logging.getLogger(name)

    def debug(self, message: str, *args: Any, **fields: Any) -> None:
        if args:
            self._logger.debug(message, *args)
            return
        if fields:
            payload = _fmt_fields(fields)
            self._logger.debug("[%s] %s", message, payload)
            return
        self._logger.debug(message)

    def info(self, message: str, *args: Any, **fields: Any) -> None:
        if args:
            self._logger.info(message, *args)
            return
        if fields:
            payload = _fmt_fields(fields)
            self._logger.info("[%s] %s", message, payload)
            return
        self._logger.info(message)

    def warning(self, message: str, *args: Any, **fields: Any) -> None:
        if args:
            self._logger.warning(message, *args)
            return
        if fields:
            payload = _fmt_fields(fields)
            self._logger.warning("[%s] %s", message, payload)
            return
        self._logger.warning(message)

    def error(self, message: str, *args: Any, **fields: Any) -> None:
        if args:
            self._logger.error(message, *args)
            return
        if fields:
            payload = _fmt_fields(fields)
            self._logger.error("[%s] %s", message, payload)
            return
        self._logger.error(message)

    def exception(self, message: str, *args: Any, **fields: Any) -> None:
        if args:
            self._logger.exception(message, *args)
            return
        if fields:
            payload = _fmt_fields(fields)
            self._logger.exception("[%s] %s", message, payload)
            return
        self._logger.exception(message)


def get_logger(name: str) -> AppLogger:
    return AppLogger(name)
