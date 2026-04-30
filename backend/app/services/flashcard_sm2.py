from datetime import date, timedelta

from app.models.flashcard import Flashcard
from app.schemas.flashcards import FlashcardGenerateResponse
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
Generate {count} English vocabulary flashcards for a {cefr_level} student
about the topic: "{topic}".

Return JSON:
{{
  "flashcards": [
    {{
      "word": "...",
      "definition": "Simple definition in English",
      "example_sentence": "Natural example sentence",
      "translation": "Translation in the student's native language ({native_language})"
    }}
  ]
}}
"""


async def generate_flashcards(
    topic: str, count: int, cefr_level: str, native_language: str
) -> FlashcardGenerateResponse:
    prompt = FLASHCARD_GEN_PROMPT.format(
        topic=topic,
        count=count,
        cefr_level=cefr_level,
        native_language=native_language,
    )

    result = await llm_adapter.structured_output(
        [{"role": "system", "content": prompt}],
        FlashcardGenerateResponse,
    )
    return result
