from datetime import date, timedelta

from app.models.flashcard import Flashcard
from app.schemas.flashcards import FlashcardCreate, FlashcardGenerateResponse
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


FLASHCARD_GEN_PROMPT = """
Generate {count} {target_language_name} vocabulary flashcards for a {cefr_level} student
about the topic: "{topic}". Use {target_language_name} vocabulary and spelling.

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
    topic: str, count: int, cefr_level: str, native_language: str, target_language: str = "en-US"
) -> FlashcardGenerateResponse:
    target_language_name = get_language_name(target_language)
    prompt = FLASHCARD_GEN_PROMPT.format(
        topic=topic,
        count=count,
        cefr_level=cefr_level,
        native_language=native_language,
        target_language_name=target_language_name,
    )

    result = await llm_adapter.structured_output(
        [{"role": "system", "content": prompt}],
        FlashcardGenerateResponse,
    )
    return result


WORD_LOOKUP_PROMPT = """
A {cefr_level} {target_language_name} student selected the word "{word}" while reading.
Context sentence: "{context}"

Generate a flashcard for this word. Use {target_language_name} vocabulary and spelling.

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
    target_language: str = "en-US",
) -> FlashcardCreate:
    target_language_name = get_language_name(target_language)
    prompt = WORD_LOOKUP_PROMPT.format(
        word=word,
        context=context or word,
        cefr_level=cefr_level,
        native_language=native_language,
        target_language_name=target_language_name,
    )
    result = await llm_adapter.structured_output(
        [{"role": "system", "content": prompt}],
        FlashcardCreate,
    )
    return result
