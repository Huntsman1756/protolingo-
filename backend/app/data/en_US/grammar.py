"""English grammar topics — assembler module."""

from app.data._types import GrammarTopic
from app.data.en_US.grammar_base import BASE_GRAMMAR_TOPICS
from app.data.en_US.grammar_extras_a1_a2 import A1_A2_GRAMMAR_TOPICS
from app.data.en_US.grammar_extras_b1 import B1_GRAMMAR_TOPICS
from app.data.en_US.grammar_extras_b2 import B2_GRAMMAR_TOPICS
from app.data.en_US.grammar_extras_c1 import C1_GRAMMAR_TOPICS
from app.data.en_US.grammar_extras_c2 import C2_GRAMMAR_TOPICS

GRAMMAR_TOPICS: list[GrammarTopic] = (
    BASE_GRAMMAR_TOPICS
    + A1_A2_GRAMMAR_TOPICS
    + B1_GRAMMAR_TOPICS
    + B2_GRAMMAR_TOPICS
    + C1_GRAMMAR_TOPICS
    + C2_GRAMMAR_TOPICS
)
