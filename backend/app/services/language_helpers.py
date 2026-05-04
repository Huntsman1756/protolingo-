"""Helpers for converting BCP-47 target_language codes to legacy strings.

Used by service layer to translate the generic target_language field into
the format expected by LLM prompts (english_variant) and STT APIs (ISO 639-1).
"""
from __future__ import annotations

_ENGLISH_VARIANTS: dict[str, str] = {
    "en-US": "american",
    "en-GB": "british",
}


def get_english_variant(target_language: str) -> str:
    """Return 'american' or 'british' for English variants; empty string otherwise."""
    return _ENGLISH_VARIANTS.get(target_language, "")


def get_iso639(target_language: str) -> str:
    """'en-US' → 'en', 'it-IT' → 'it'"""
    return target_language.split("-")[0].lower()
