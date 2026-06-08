"""
Language-aware phrasebook dispatcher.

Mirrors the vocabulary dispatcher pattern: resolves the correct
per-language phrasebook module by ISO 639-1 prefix.
"""

from __future__ import annotations

import sys

from app.data._types import CEFRLevel, PhrasebookCategory, PhrasebookEntry  # noqa: F401

_LANG_MODULES: dict[str, str] = {
    "en": "app.data.en.phrasebook",
    "es": "app.data.es.phrasebook",
    "it": "app.data.it.phrasebook",
    "pt": "app.data.pt.phrasebook",
}

_CACHE: dict[str, list[PhrasebookCategory]] = {}


def _resolve_categories(target_language: str) -> list[PhrasebookCategory]:
    iso = target_language.split("-")[0]
    module_name = _LANG_MODULES.get(iso, "app.data.en.phrasebook")

    if module_name not in _CACHE:
        __import__(module_name)
        _CACHE[module_name] = sys.modules[module_name].PHRASEBOOK_CATEGORIES

    return _CACHE[module_name]


def get_phrasebook_categories(target_language: str = "en-US") -> list[PhrasebookCategory]:
    """Return all phrasebook categories for the given target language."""
    return _resolve_categories(target_language)


def get_phrasebook_category(
    category_id: str, target_language: str = "en-US"
) -> PhrasebookCategory | None:
    """Return a single phrasebook category by ID for the given target language."""
    categories = _resolve_categories(target_language)
    for c in categories:
        if c.id == category_id:
            return c
    return None


def get_phrasebook_by_level(
    level: CEFRLevel, target_language: str = "en-US"
) -> list[PhrasebookCategory]:
    """Return all phrasebook categories for a specific CEFR level."""
    categories = _resolve_categories(target_language)
    return [c for c in categories if c.level == level]
