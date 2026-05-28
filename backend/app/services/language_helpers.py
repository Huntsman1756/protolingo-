"""Helpers for converting BCP-47 target_language codes to legacy strings.

Used by service layer to translate the generic target_language field into
the format expected by LLM prompts (english_variant) and STT APIs (ISO 639-1).
"""

from __future__ import annotations

from datetime import datetime, timezone

_ENGLISH_VARIANTS: dict[str, str] = {
    "en-US": "american",
    "en-GB": "british",
}

_VOICE_SESSION_TITLES: dict[str, str] = {
    "es": "Sesión de voz",
    "fr": "Session vocale",
    "pt": "Sessão de voz",
    "de": "Sprachsitzung",
    "it": "Sessione vocale",
    "pl": "Sesja głosowa",
    "nl": "Spraaksessie",
    "ro": "Sesiune vocală",
    "ru": "Голосовая сессия",
}

_MONTH_NAMES: dict[str, list[str]] = {
    "es": [
        "enero",
        "febrero",
        "marzo",
        "abril",
        "mayo",
        "junio",
        "julio",
        "agosto",
        "septiembre",
        "octubre",
        "noviembre",
        "diciembre",
    ],
    "fr": [
        "janvier",
        "février",
        "mars",
        "avril",
        "mai",
        "juin",
        "juillet",
        "août",
        "septembre",
        "octobre",
        "novembre",
        "décembre",
    ],
    "pt": [
        "janeiro",
        "fevereiro",
        "março",
        "abril",
        "maio",
        "junho",
        "julho",
        "agosto",
        "setembro",
        "outubro",
        "novembro",
        "dezembro",
    ],
    "de": [
        "Januar",
        "Februar",
        "März",
        "April",
        "Mai",
        "Juni",
        "Juli",
        "August",
        "September",
        "Oktober",
        "November",
        "Dezember",
    ],
    "it": [
        "gennaio",
        "febbraio",
        "marzo",
        "aprile",
        "maggio",
        "giugno",
        "luglio",
        "agosto",
        "settembre",
        "ottobre",
        "novembre",
        "dicembre",
    ],
    "pl": [
        "stycznia",
        "lutego",
        "marca",
        "kwietnia",
        "maja",
        "czerwca",
        "lipca",
        "sierpnia",
        "września",
        "października",
        "listopada",
        "grudnia",
    ],
    "nl": [
        "januari",
        "februari",
        "maart",
        "april",
        "mei",
        "juni",
        "juli",
        "augustus",
        "september",
        "oktober",
        "november",
        "december",
    ],
    "ro": [
        "ianuarie",
        "februarie",
        "martie",
        "aprilie",
        "mai",
        "iunie",
        "iulie",
        "august",
        "septembrie",
        "octombrie",
        "noiembrie",
        "decembrie",
    ],
    "ru": [
        "января",
        "февраля",
        "марта",
        "апреля",
        "мая",
        "июня",
        "июля",
        "августа",
        "сентября",
        "октября",
        "ноября",
        "декабря",
    ],
}


def get_english_variant(target_language: str) -> str:
    """Return 'american' or 'british' for English variants; empty string otherwise."""
    return _ENGLISH_VARIANTS.get(target_language, "")


def get_iso639(target_language: str) -> str:
    """'en-US' → 'en', 'it-IT' → 'it'"""
    return target_language.split("-")[0].lower()


def voice_session_title(native_language: str) -> str:
    """Return a localized 'Voice session - date' title for a conversation.

    Falls back to English if the native language is not supported.
    """
    label = _VOICE_SESSION_TITLES.get(native_language, "Voice session")
    now = datetime.now(timezone.utc).replace(tzinfo=None)
    months = _MONTH_NAMES.get(native_language)
    if months:
        month_name = months[now.month - 1]
        if native_language in ("es", "pt"):
            return f"{label} — {now.day} de {month_name} de {now.year}"
        return f"{label} — {now.day} {month_name} {now.year}"
    return f"{label} — {now.strftime('%B %d, %Y')}"
