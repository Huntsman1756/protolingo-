"""Helpers for BCP-47 target_language codes.

Used by service layer to translate the generic target_language field into
human-readable names, self-names, ISO 639-1 codes, and flag emojis.
"""

from __future__ import annotations

from datetime import UTC, datetime

_LANGUAGE_INFO: dict[str, dict[str, str]] = {
    "en-US": {"name": "English (US)", "self_name": "English (US)", "iso639": "en", "flag": "🇺🇸"},
    "en-GB": {"name": "English (UK)", "self_name": "English (UK)", "iso639": "en", "flag": "🇬🇧"},
    "es-ES": {"name": "Spanish", "self_name": "Español", "iso639": "es", "flag": "🇪🇸"},
    "fr-FR": {"name": "French", "self_name": "Français", "iso639": "fr", "flag": "🇫🇷"},
    "it-IT": {"name": "Italian", "self_name": "Italiano", "iso639": "it", "flag": "🇮🇹"},
    "pt-PT": {"name": "Portuguese", "self_name": "Português", "iso639": "pt", "flag": "🇵🇹"},
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


def get_language_name(target_language: str) -> str:
    """'it-IT' → 'Italian', 'en-US' → 'English (US)'"""
    info = _LANGUAGE_INFO.get(target_language)
    return info["name"] if info else target_language


def get_language_self_name(target_language: str) -> str:
    """'it-IT' → 'Italiano', 'es-ES' → 'Español'"""
    info = _LANGUAGE_INFO.get(target_language)
    return info["self_name"] if info else target_language


def get_iso639(target_language: str) -> str:
    """'en-US' → 'en', 'it-IT' → 'it'"""
    info = _LANGUAGE_INFO.get(target_language)
    return info["iso639"] if info else target_language.split("-")[0].lower()


def get_language_flag(target_language: str) -> str:
    """'es-ES' → '🇪🇸', 'it-IT' → '🇮🇹'"""
    info = _LANGUAGE_INFO.get(target_language)
    return info["flag"] if info else ""


def voice_session_title(native_language: str) -> str:
    """Return a localized 'Voice session - date' title for a conversation.

    Falls back to English if the native language is not supported.
    """
    label = _VOICE_SESSION_TITLES.get(native_language, "Voice session")
    now = datetime.now(UTC).replace(tzinfo=None)
    months = _MONTH_NAMES.get(native_language)
    if months:
        month_name = months[now.month - 1]
        if native_language in ("es", "pt"):
            return f"{label} — {now.day} de {month_name} de {now.year}"
        return f"{label} — {now.day} {month_name} {now.year}"
    return f"{label} — {now.strftime('%B %d, %Y')}"
