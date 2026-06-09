"""English grammar topics — A1 additional."""

from app.data._types import GrammarExample, GrammarMistake, GrammarTopic

A1_GRAMMAR_TOPICS: list[GrammarTopic] = [
    GrammarTopic(
        slug="question-words",
        title="Question Words (What, Where, When, Who, Why, How)",
        level="A1",
        category="Questions",
        summary="Ask for information using wh- question words.",
        structure="Wh-word + auxiliary (do/does/is/are) + subject + verb?",
        explanation="Question words help you ask for specific information. Each word has a different purpose:\n\n| Word | Asks about | Example |\n|------|-----------|--------|\n| **What** | thing or action | *What is your name?* |\n| **Where** | place | *Where do you live?* |\n| **When** | time | *When is your birthday?* |\n| **Who** | person | *Who is she?* |\n| **Why** | reason | *Why are you late?* |\n| **How** | manner | *How do you spell that?* |\n\nFor yes/no answers use *do/does/is/are*. For information answers use a wh-word.",
        rules=[
            "Question word comes first in the sentence.",
            "After the question word, use the normal question word order (auxiliary + subject + verb).",
            "'Who' can be the subject: *Who lives here?* (no auxiliary needed).",
            "'How' combines with adjectives: *How old / How much / How many / How far*.",  # noqa: E501
        ],
        examples=[
            GrammarExample(text="What is your favourite colour?"),
            GrammarExample(text="Where do you work?"),
            GrammarExample(text="How do you get to school?", note="asking about method"),
            GrammarExample(text="Who is that man?", note="asking about a person"),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Where you live?",
                correct="Where do you live?",
                note="Don't forget the auxiliary do/does in present simple questions.",
            ),
            GrammarMistake(
                wrong="What you are doing?",
                correct="What are you doing?",
                note="Invert subject and be in questions.",
            ),
        ],
        related=["questions-yes-no", "present-simple", "to-be"],
    ),
    GrammarTopic(
        slug="demonstratives",
        title="This, That, These, Those",
        level="A1",
        category="Pronouns",
        summary="Use demonstratives to point to things near or far, singular or plural.",
        structure="This (near + singular) · That (far + singular) · These (near + plural) · Those (far + plural)",
        explanation="Demonstratives tell us which person or thing we are talking about.\n\n| | Singular | Plural |\n|---|----------|--------|\n| **Near** | this | these |\n| **Far** | that | those |\n\n- *This is my book.* (the book is close)\n- *That is your bag.* (the bag is far away)\n- *These are my friends.* (the friends are near)\n- *Those are beautiful flowers.* (the flowers are far)\n\nDemonstratives can be pronouns (stand alone) or determiners (before a noun):\n- Pronoun: *This is mine.*\n- Determiner: *This book is mine.*",
        rules=[
            "Use this/these for things that are near in space or time.",
            "Use that/those for things that are far in space or time.",
            "This/that go with singular nouns and uncountable nouns.",
            "These/those go with plural nouns.",
        ],
        examples=[
            GrammarExample(text="This is my desk."),
            GrammarExample(text="That building over there is the library."),
            GrammarExample(text="These shoes are very comfortable."),
            GrammarExample(text="I don't like those curtains.", note="far + plural"),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="This are my keys.",
                correct="These are my keys.",
                note="Use 'these' (not 'this') with plural nouns.",
            ),
            GrammarMistake(
                wrong="That is beautiful flowers.",
                correct="Those are beautiful flowers.",
                note="Use 'those' (not 'that') with plural nouns.",
            ),
        ],
        related=["subject-pronouns", "possessive-adjectives", "articles"],
    ),
    GrammarTopic(
        slug="object-pronouns",
        title="Object Pronouns (me, him, her, us, them)",
        level="A1",
        category="Pronouns",
        summary="Replace the object of a sentence — the person or thing receiving the action.",
        structure="Subject + verb + object pronoun",
        explanation="Object pronouns replace the person or thing that receives the action in a sentence.\n\n| Subject | Object |\n|---------|--------|\n| I | me |\n| you | you |\n| he | him |\n| she | her |\n| it | it |\n| we | us |\n| they | them |\n\nUse object pronouns:\n- After a verb: *She called me.*\n- After a preposition: *This present is for him.*",
        rules=[
            "Object pronouns come after the verb or preposition.",
            "Do not confuse subject and object pronouns: 'I' does the action, 'me' receives it.",
            "'You' and 'it' are the same in subject and object form.",
            "Put yourself last in a list: 'The teacher spoke to John and me' (not 'me and John').",
        ],
        examples=[
            GrammarExample(text="Can you help me?"),
            GrammarExample(text="I saw her at the station."),
            GrammarExample(text="Please give it to them."),
            GrammarExample(text="Sit next to us.", note="object after preposition"),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Me and Sarah went shopping.",
                correct="Sarah and I went shopping.",
                note="Use 'I' (subject) when you are doing the action.",
            ),
            GrammarMistake(
                wrong="The teacher gave I a book.",
                correct="The teacher gave me a book.",
                note="Use 'me' (object) after the verb.",
            ),
        ],
        related=["subject-pronouns", "possessive-adjectives"],
    ),
    GrammarTopic(
        slug="plural-nouns",
        title="Plural Nouns (Regular & Irregular)",
        level="A1",
        category="Nouns",
        summary="Form the plural of most nouns by adding -s or -es, but watch out for irregulars.",
        structure="Singular + -s / -es / -ies / irregular form",
        explanation="Most nouns become plural by adding **-s**:\n\n| Rule | Example |\n|------|--------|\n| Add -s | book → books, car → cars |\n| Add -es (after s, sh, ch, x, z) | bus → buses, watch → watches |\n| Change -y to -ies (consonant + y) | baby → babies, city → cities |\n| Add -s (vowel + y) | boy → boys, day → days |\n| Change -f/-fe to -ves | leaf → leaves, wife → wives |\n\n**Common irregular plurals:**\n- man → men, woman → women, child → children\n- person → people, foot → feet, tooth → teeth\n- mouse → mice, sheep → sheep (no change), fish → fish",
        rules=[
            "Most nouns: add -s.",
            "Ending in -s, -sh, -ch, -x, -z: add -es.",
            "Ending in consonant + y: change y to i and add -es.",
            "Some nouns have completely irregular plural forms that must be memorised.",
        ],
        examples=[
            GrammarExample(text="I have two cats."),
            GrammarExample(text="There are three boxes on the floor.", note="-es ending"),
            GrammarExample(text="The babies are sleeping.", note="consonant + y → ies"),
            GrammarExample(text="How many children are in the class?", note="irregular plural"),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="I have three childs.",
                correct="I have three children.",
                note="The plural of 'child' is irregular: 'children'.",
            ),
            GrammarMistake(
                wrong="She bought two watchs.",
                correct="She bought two watches.",
                note="Words ending in -ch add -es, not just -s.",
            ),
        ],
        related=["countable-uncountable", "articles", "some-any-much-many"],
    ),
    GrammarTopic(
        slug="adverbs-frequency",
        title="Adverbs of Frequency",
        level="A1",
        category="Adjectives & Adverbs",
        summary="Use words like always, usually, sometimes, and never to say how often something happens.",
        structure="Subject + adverb of frequency + main verb · Subject + be + adverb of frequency",
        explanation="Adverbs of frequency tell us how often something happens, from 100% to 0%:\n\n| Adverb | Meaning |\n|--------|--------|\n| always | 100% |\n| usually | ~80% |\n| often | ~60% |\n| sometimes | ~40% |\n| rarely | ~20% |\n| never | 0% |\n\n**Position:**\n- Before the main verb: *I always drink coffee.*\n- After the verb 'be': *She is never late.*\n- 'Sometimes' can also go at the beginning or end: *Sometimes I walk. / I walk sometimes.*",
        rules=[
            "Adverbs of frequency go before the main verb: 'I usually get up at 7.'",
            "After the verb 'be': 'He is always happy.'",
            "'Sometimes' is flexible: beginning, middle, or end of sentence.",
            "Use 'hardly ever' to mean very rarely.",
        ],
        examples=[
            GrammarExample(text="I always brush my teeth before bed."),
            GrammarExample(text="She is usually at home in the evening."),
            GrammarExample(
                text="We sometimes go to the cinema.", note="sometimes can start the sentence"
            ),
            GrammarExample(text="He never eats meat."),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="I drink always coffee.",
                correct="I always drink coffee.",
                note="Adverbs of frequency go BEFORE the main verb.",
            ),
            GrammarMistake(
                wrong="She never is late.",
                correct="She is never late.",
                note="After the verb 'be', not before it.",
            ),
        ],
        related=["present-simple", "adverbs-manner"],
    ),
    GrammarTopic(
        slug="past-continuous",
        title="Past Continuous",
        level="A2",
        category="Tenses",
        summary="Describe actions that were in progress at a specific moment in the past.",
        structure="Subject + was/were + verb-ing",
        explanation="Use the **past continuous** for:\n- An action that was in progress at a particular moment in the past:\n  *I was watching TV at 8 pm yesterday.*\n- An action that was interrupted by another action:\n  *I was cooking when she arrived.* (cooking = long action; arrived = short action)\n- Two simultaneous actions:\n  *She was reading while he was playing the piano.*\n\n**Form:**\n- I/he/she/it → was + -ing\n- You/we/they → were + -ing",
        rules=[
            "Use was/were + -ing form.",
            "Use for actions in progress at a specific past time (at 7 pm, when...).",
            "The interrupting action uses past simple (not past continuous).",
            "Stative verbs (know, love, believe) are not used in the continuous form.",
        ],
        examples=[
            GrammarExample(text="I was walking home when I met an old friend."),
            GrammarExample(text="They were playing tennis at 3 o'clock."),
            GrammarExample(text="While she was sleeping, the phone rang."),
            GrammarExample(text="We weren't listening to the instructions.", note="negative"),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="It was rained when I left.",
                correct="It was raining when I left.",
                note="Past continuous needs was/were + -ing, not past simple.",
            ),
            GrammarMistake(
                wrong="I was knowing the answer.",
                correct="I knew the answer.",
                note="Stative verbs do not use continuous form; use past simple.",
            ),
        ],
        related=["past-simple", "present-continuous", "narrative-tenses"],
    ),
    GrammarTopic(
        slug="prepositions-movement",
        title="Prepositions of Movement",
        level="A2",
        category="Prepositions",
        summary="Describe direction and movement using to, through, across, along, into, and more.",
        explanation="Prepositions of movement describe the direction something moves:\n\n| Preposition | Use | Example |\n|-------------|-----|--------|\n| **to** | towards a destination | *go to work* |\n| **into** | entering a space | *walk into the room* |\n| **out of** | leaving a space | *get out of the car* |\n| **through** | from one side to another | *walk through the tunnel* |\n| **across** | from one side to another (surface) | *swim across the river* |\n| **along** | following a line | *drive along the road* |\n| **over** | above and to the other side | *jump over the fence* |\n| **towards** | in the direction of | *run towards the exit* |\n| **past** | beyond a point | *walk past the shop* |\n| **up/down** | higher/lower | *climb up the stairs* |",
        rules=[
            "Use 'to' for destinations (go to school, travel to Paris).",
            "Use 'into' for entering enclosed spaces; 'out of' for leaving them.",
            "'Across' is for flat surfaces; 'through' is for three-dimensional spaces.",
            "Do not confuse movement prepositions with place prepositions (at the station vs. go to the station).",
        ],
        examples=[
            GrammarExample(text="She walked into the room and sat down."),
            GrammarExample(text="We drove through the tunnel."),
            GrammarExample(text="The cat jumped over the wall."),
            GrammarExample(text="He ran towards me with a big smile."),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="I went in the room.",
                correct="I went into the room.",
                note="Use 'into' for movement from outside to inside.",
            ),
            GrammarMistake(
                wrong="She got in her car and drove away.",
                correct="She got into her car and drove away.",
                note="Use 'into' for the action of entering.",
            ),
        ],
        related=["prepositions-place", "prepositions-time", "imperatives"],
    ),
    GrammarTopic(
        slug="too-enough",
        title="Too & Enough",
        level="A2",
        category="Adjectives & Adverbs",
        summary="Use too and enough to express excess or sufficiency.",
        structure="Too + adjective/adverb · Adjective/adverb + enough",
        explanation="**Too** means more than necessary or wanted (negative meaning):\n- *It is too cold outside.* (= colder than I want)\n- *He speaks too fast.* (= faster than I can understand)\n\n**Enough** means sufficient (the right amount):\n- *She is old enough to drive.* (= she has reached the required age)\n- *We have enough time.* (= sufficient time)\n\n**Word order:**\n- Too + adjective/adverb: *too big, too quickly*\n- Adjective/adverb + enough: *big enough, quickly enough*\n- Enough + noun: *enough money, enough chairs*",
        rules=[
            "'Too' comes BEFORE the adjective or adverb.",
            "'Enough' comes AFTER the adjective or adverb.",
            "'Enough' comes BEFORE a noun: 'enough water'.",
            "Use 'too much/many' with nouns: 'too much sugar', 'too many people'.",
        ],
        examples=[
            GrammarExample(text="This coffee is too hot to drink."),
            GrammarExample(text="She isn't tall enough to reach the top shelf."),
            GrammarExample(text="We don't have enough chairs for everyone."),
            GrammarExample(text="He drives too fast in the city.", note="too + adverb"),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="This bag is enough big.",
                correct="This bag is big enough.",
                note="Enough comes AFTER the adjective, not before.",
            ),
            GrammarMistake(
                wrong="She is too much tired.",
                correct="She is too tired.",
                note="Use 'too' directly before the adjective; 'too much' is for nouns.",
            ),
        ],
        related=["comparatives-superlatives", "so-such", "adverbs-manner"],
    ),
    GrammarTopic(
        slug="reflexive-pronouns",
        title="Reflexive Pronouns (myself, yourself, etc.)",
        level="A2",
        category="Pronouns",
        summary="Use -self/-selves pronouns when the subject and object are the same person or thing.",
        structure="by + reflexive pronoun = alone · verb + reflexive pronoun = action on self",
        explanation="Reflexive pronouns end in **-self** (singular) or **-selves** (plural):\n\n| Subject | Reflexive |\n|---------|-----------|\n| I | myself |\n| you | yourself / yourselves |\n| he | himself |\n| she | herself |\n| it | itself |\n| we | ourselves |\n| they | themselves |\n\nUse them when:\n1. The subject and object are the same: *I cut myself.*\n2. To emphasise who did something: *I made it myself.*\n3. With 'by' to mean 'alone': *She lives by herself.*",
        rules=[
            "Use reflexive pronouns when the subject and object are the same person.",
            "Do NOT use reflexive pronouns after prepositions of place (sit down, wake up).",
            "'By + reflexive' means alone or without help.",
            "Common verbs used with reflexives: enjoy yourself, hurt yourself, help yourself.",
        ],
        examples=[
            GrammarExample(text="I taught myself to play the guitar."),
            GrammarExample(text="Be careful — don't hurt yourself!"),
            GrammarExample(text="She lives by herself in a small flat."),
            GrammarExample(text="Help yourselves to more cake.", note="plural imperative"),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="I cut me with the knife.",
                correct="I cut myself with the knife.",
                note="When subject and object are the same, use a reflexive pronoun, not 'me'.",
            ),
            GrammarMistake(
                wrong="Myself and John went to the park.",
                correct="John and I went to the park.",
                note="Never use a reflexive as a subject. Use 'I'.",
            ),
        ],
        related=["subject-pronouns", "object-pronouns", "possessive-pronouns"],
    ),
    GrammarTopic(
        slug="indefinite-pronouns",
        title="Indefinite Pronouns (someone, anyone, no one)",
        level="A2",
        category="Pronouns",
        summary="Talk about people and things without saying exactly who or what.",
        explanation="Indefinite pronouns refer to unspecified people, things, or places:\n\n| | People | Things | Places |\n|---|--------|--------|--------|\n| some- | someone / somebody | something | somewhere |\n| any- | anyone / anybody | anything | anywhere |\n| no- | no one / nobody | nothing | nowhere |\n| every- | everyone / everybody | everything | everywhere |\n\n**Usage:**\n- **some-** in positive sentences: *Someone is at the door.*\n- **any-** in negatives and questions: *I can't find anything. Is anyone there?*\n- **no-** in positive sentences with negative meaning: *Nobody came to the party.*\n- **every-** means all: *Everyone enjoyed the film.*\n\nAll indefinite pronouns are singular and take a singular verb.",
        rules=[
            "Use some- in positive sentences; any- in negatives and questions.",
            "No- words make the verb positive: 'Nobody knows' (not 'Nobody doesn't know').",
            "All indefinite pronouns are grammatically singular: 'Everybody is here.'",
            "Write 'no one' as two words, or use 'nobody'.",
        ],
        examples=[
            GrammarExample(text="Someone left their umbrella here."),
            GrammarExample(text="Is there anything I can do to help?"),
            GrammarExample(text="Nobody knew the answer to the question."),
            GrammarExample(text="Everything is ready for the party."),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Everyone are happy.",
                correct="Everyone is happy.",
                note="Indefinite pronouns are singular — use 'is', not 'are'.",
            ),
            GrammarMistake(
                wrong="I didn't see nobody.",
                correct="I didn't see anybody.",
                note="In standard English, avoid double negatives. Use 'anybody' after 'didn't'.",
            ),
        ],
        related=["some-any-much-many", "subject-pronouns", "questions-yes-no"],
    ),
    GrammarTopic(
        slug="possessive-pronouns",
        title="Possessive Pronouns (mine, yours, his, hers, ours, theirs)",
        level="A2",
        category="Pronouns",
        summary="Replace a noun to show ownership without repeating it.",
        structure="possessive pronoun = possessive adjective + noun (implied)",
        explanation="Possessive pronouns replace a possessive adjective + noun to avoid repetition:\n\n| Subject | Possessive Adjective | Possessive Pronoun |\n|---------|---------------------|--------------------|\n| I | my | mine |\n| you | your | yours |\n| he | his | his |\n| she | her | hers |\n| it | its | — |\n| we | our | ours |\n| they | their | theirs |\n\n- *This is my book.* → *This book is mine.*\n- *That is your car.* → *That car is yours.*\n\nPossessive pronouns stand alone — they do NOT have a noun after them:\n- ✓ *It is mine.*\n- ✗ *It is mine book.*",
        rules=[
            "Possessive pronouns stand alone — no noun follows them.",
            "'His' is the same as adjective and pronoun.",
            "No apostrophe in possessive pronouns: 'yours', 'hers', 'ours', 'theirs'.",
            "There is no possessive pronoun for 'it' — do not use 'its' alone.",
        ],
        examples=[
            GrammarExample(text="This phone is mine. Yours is on the table."),
            GrammarExample(text="Is this pen yours or his?"),
            GrammarExample(text="Our house is smaller than theirs."),
            GrammarExample(
                text="I forgot my keys. Can I borrow hers?", note="'hers' refers to her keys"
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="This is your's.",
                correct="This is yours.",
                note="Never use an apostrophe in possessive pronouns.",
            ),
            GrammarMistake(
                wrong="That is mine book.",
                correct="That book is mine.",
                note="Possessive pronouns stand alone — no noun after them.",
            ),
        ],
        related=["possessive-adjectives", "subject-pronouns", "object-pronouns"],
    ),
    GrammarTopic(
        slug="comparative-as-as",
        title="Comparative Structures: As...As",
        level="A2",
        category="Adjectives & Adverbs",
        summary="Say that two things are equal using as + adjective/adverb + as.",
        structure="as + adjective/adverb + as (equality) · not as/so + adjective/adverb + as (inequality)",
        explanation="Use **as...as** to say two things are the same:\n- *She is as tall as her brother.* (= they are the same height)\n- *This film is as good as the first one.* (= same quality)\n\nUse **not as...as** (or not so...as) to say one thing is less:\n- *He is not as old as he looks.* (= he looks older)\n- *This book isn't as interesting as the other one.*\n\nCommon expressions:\n- *as soon as possible*\n- *as much as you want*\n- *as far as I know*",
        rules=[
            "Use 'as + adjective + as' to show things are equal.",
            "Use 'not as + adjective + as' to show one thing is less than another.",
            "The adjective stays in its base form (no -er).",
            "Use 'as much/many...as' with nouns: 'as much money as', 'as many friends as'.",
        ],
        examples=[
            GrammarExample(text="She runs as fast as her sister."),
            GrammarExample(text="This restaurant isn't as expensive as I expected."),
            GrammarExample(text="He has as many books as the library.", note="as many + noun + as"),
            GrammarExample(text="Can you get here as soon as possible?", note="fixed expression"),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="She is as taller as me.",
                correct="She is as tall as me.",
                note="Use the base adjective form after 'as', not the comparative.",
            ),
            GrammarMistake(
                wrong="This test was not as hard than I thought.",
                correct="This test was not as hard as I thought.",
                note="With 'as...as', use 'as' in both positions, never 'than'.",
            ),
        ],
        related=["comparatives-superlatives", "adverbs-manner", "too-enough"],
    ),
]
