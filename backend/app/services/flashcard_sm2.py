import re
from datetime import date, timedelta

from app.models.flashcard import Flashcard
from app.schemas.flashcards import (
    FlashcardCreate,
    FlashcardGenerateResponse,
    GeneratedFlashcard,
)
from app.services.language_helpers import get_language_name
from app.services.llm_adapter import llm_adapter


def sm2_update(card: Flashcard, quality: int) -> Flashcard:
    if quality < 3:
        card.repetitions = 0
        card.interval = 1
    else:
        if card.repetitions == 0:
            card.interval = 1
        elif card.repetitions == 1:
            card.interval = 6
        else:
            card.interval = round(card.interval * card.ease_factor)
        card.repetitions += 1

    card.ease_factor = max(
        1.3,
        card.ease_factor + 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02),
    )
    card.next_review = date.today() + timedelta(days=card.interval)
    return card


_LANG_HINTS: dict[str, str] = {
    "de": ("Use standard German spelling and vocabulary."),
    "fr": "Use standard French spelling and vocabulary.",
    "es": "Use standard Spanish spelling and vocabulary.",
    "it": "Use standard Italian spelling and vocabulary.",
    "pt": "Use standard Portuguese spelling and vocabulary.",
    "en-US": ("Use American English spelling and vocabulary (e.g. color, center, organize)."),
    "en-GB": ("Use British English spelling and vocabulary (e.g. colour, centre, organise)."),
}


def _clean_generated_word(value: str) -> str:
    cleaned = value.strip().strip("\"'")
    cleaned = re.sub(r"\s*\([^)]*\)", "", cleaned)
    return re.sub(r"\s+", " ", cleaned).strip()


def _get_lang_hint(target_language: str) -> str:
    hint = _LANG_HINTS.get(target_language)
    if hint is not None:
        return hint
    iso = target_language.split("-")[0].lower()
    return _LANG_HINTS.get(iso, "")


FLASHCARD_GEN_PROMPT = """
Generate {count} {target_language_name} vocabulary flashcards for a {cefr_level} student
about the topic: "{topic}". Use {target_language_name} vocabulary and spelling.
Word rules:
- word must be only the core vocabulary term.
- never include articles, gender markers, plural notes, qualifiers, parentheses, numbering, or prefixes/suffixes.
- use lowercase, no trailing punctuation, and no extra metadata.
{lang_hint}
Return JSON:
{{
  "flashcards": [
    {{
      "word": "...",
      "definition": "Simple definition in {native_language}",
      "example_sentence": "Natural example sentence",
      "translation": "Translation in the student's native language ({native_language})"
    }}
  ]
}}
"""


async def generate_flashcards(
    topic: str, count: int, cefr_level: str, native_language: str, target_language: str = "en-GB"
) -> FlashcardGenerateResponse:
    target_language_name = get_language_name(target_language)
    lang_hint = _get_lang_hint(target_language)
    prompt = FLASHCARD_GEN_PROMPT.format(
        topic=topic,
        count=count,
        cefr_level=cefr_level,
        native_language=native_language,
        target_language_name=target_language_name,
        lang_hint=lang_hint,
    )

    result = await llm_adapter.structured_output(
        [{"role": "system", "content": prompt}],
        FlashcardGenerateResponse,
    )
    result.flashcards = [
        GeneratedFlashcard(
            word=_clean_generated_word(card.word),
            definition=card.definition,
            example_sentence=card.example_sentence,
            translation=card.translation,
        )
        for card in result.flashcards
    ]
    return result


WORD_LOOKUP_PROMPT = """
A {cefr_level} {target_language_name} student selected the word "{word}" while reading.
Context sentence: "{context}"

Generate a flashcard for this word. Use {target_language_name} vocabulary and spelling.
Word output must be only the target-language term without articles, gender markers, parentheses, qualifiers, prefixes, suffixes, or metadata.
{lang_hint}
Return JSON:
{{
  "word": "{word}",
  "definition": "Simple definition in {native_language} (max 20 words)",
  "example_sentence": "A natural example sentence using the word",
  "translation": "Translation in the student's native language ({native_language})"
}}
"""


async def lookup_word(
    word: str,
    context: str,
    cefr_level: str,
    native_language: str,
    target_language: str = "en-GB",
) -> FlashcardCreate:
    target_language_name = get_language_name(target_language)
    lang_hint = _get_lang_hint(target_language)
    prompt = WORD_LOOKUP_PROMPT.format(
        word=word,
        context=context or word,
        cefr_level=cefr_level,
        native_language=native_language,
        target_language_name=target_language_name,
        lang_hint=lang_hint,
    )
    result = await llm_adapter.structured_output(
        [{"role": "system", "content": prompt}],
        FlashcardCreate,
    )
    result.word = _clean_generated_word(result.word)
    return result
