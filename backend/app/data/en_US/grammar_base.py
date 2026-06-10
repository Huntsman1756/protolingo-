"""English grammar topics — original 55 topics from static data."""

from app.data._types import GrammarExample, GrammarMistake, GrammarTopic

BASE_GRAMMAR_TOPICS: list[GrammarTopic] = [
    GrammarTopic(
        slug="present-simple",
        title="Present Simple",
        level="A1",
        category="Tenses",
        summary="Express habits, routines, and permanent facts.",
        explanation="Use the **present simple** for:\\n- Daily routines and habits: *I drink coffee every morning.*\\n- Permanent states and facts: *Water boils at 100°C.*\\n- Schedules: *The train leaves at 8.*\\n\\nFor the third person singular (he/she/it), add **-s** or **-es** to the verb.",
        structure="Subject + base verb (+ s/es for he/she/it)",
        rules=[
            'Add -s or -es for he/she/it: "She works", "He watches".',
            "Use do/does in negatives and questions.",
            "Use for routines, facts, and schedules — not for things happening right now.",
        ],
        examples=[
            GrammarExample(text="I work from home every day.", note="routine"),
            GrammarExample(text="She doesn't like coffee.", note="negative with does + not"),
            GrammarExample(text="Does he speak French?", note="question with does"),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="She work here.",
                correct="She works here.",
                note="Missing -s for third person.",
            ),
            GrammarMistake(
                wrong="He don't know.",
                correct="He doesn't know.",
                note="Use doesn't, not don't, for he/she/it.",
            ),
        ],
        related=["present-continuous", "past-simple", "questions-yes-no"],
    ),
    GrammarTopic(
        slug="to-be",
        title="To Be (am / is / are)",
        level="A1",
        category="Tenses",
        summary="The most fundamental verb in English.",
        explanation="**To be** is used to describe people, places, things, and states.\\n\\nContractions: *I'm, you're, he's, she's, it's, we're, they're*.\\n\\nNegative: *I'm not, you aren't / you're not, he isn't / he's not.*",
        structure="I am · You/We/They are · He/She/It is",
        rules=[
            "I am / He is / You are — three different forms.",
            "Contractions are very common in spoken English.",
            'Never add -s or -ed: there is no "he bes" or "she beed".',
        ],
        examples=[
            GrammarExample(text="I am a student."),
            GrammarExample(text="She is from Spain."),
            GrammarExample(text="They are not ready yet.", note="negative"),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="She is very nice person.",
                correct="She is a very nice person.",
                note="Don't forget the article before a singular noun.",
            ),
            GrammarMistake(
                wrong="I am agree.",
                correct="I agree.",
                note='"Agree" is a verb, not an adjective. Don\'t use "be" with it.',
            ),
        ],
        related=["articles", "present-simple"],
    ),
    GrammarTopic(
        slug="articles",
        title="Articles (a / an / the)",
        level="A1",
        category="Articles",
        summary="When to use a, an, or the before a noun.",
        explanation="- **a / an** (indefinite): for something mentioned for the first time or non-specific. Use *an* before vowel sounds.\\n- **the** (definite): for something already known or unique.\\n- **no article**: for plural/uncountable nouns in general statements.",
        rules=[
            "Use a/an for singular countable nouns mentioned for the first time.",
            "Use the when both speaker and listener know what is being referred to.",
            "Use an before a vowel sound (an apple, an hour — the h is silent).",
            'No article for general plurals: "Dogs are loyal." (not "The dogs are loyal.")',
        ],
        examples=[
            GrammarExample(
                text="I saw a dog in the park.", note="a = first mention; the = specific park"
            ),
            GrammarExample(text="She is an engineer."),
            GrammarExample(text="The sun rises in the east.", note='unique nouns use "the"'),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="I am engineer.",
                correct="I am an engineer.",
                note="Always use an article before a singular countable noun.",
            ),
            GrammarMistake(
                wrong="The life is beautiful.",
                correct="Life is beautiful.",
                note="No article for abstract nouns used in a general sense.",
            ),
        ],
        related=["countable-uncountable", "to-be"],
    ),
    GrammarTopic(
        slug="questions-yes-no",
        title="Yes/No Questions",
        level="A1",
        category="Questions",
        summary="Form questions that can be answered with yes or no.",
        explanation="Yes/no questions expect a yes or no answer. The key is **inverting** the auxiliary verb and the subject:\\n\\n- *You are tired.* → *Are you tired?*\\n- *She works here.* → *Does she work here?*",
        structure="Do/Does/Is/Are + subject + base verb?",
        rules=[
            "Invert subject and auxiliary (be/do/does/did).",
            "Use do for I/you/we/they in present simple.",
            "Use does for he/she/it in present simple.",
            'Do not add -s to the main verb when using does: "Does she work?" not "Does she works?"',
        ],
        examples=[
            GrammarExample(text="Are you a student?"),
            GrammarExample(text="Does he live in London?"),
            GrammarExample(text="Do they speak English?"),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Does she works here?",
                correct="Does she work here?",
                note="After does, use the base form of the verb.",
            ),
            GrammarMistake(
                wrong="You are tired?",
                correct="Are you tired?",
                note="Invert subject and verb in questions.",
            ),
        ],
        related=["present-simple", "to-be"],
    ),
    GrammarTopic(
        slug="subject-pronouns",
        title="Subject Pronouns",
        level="A1",
        category="Pronouns",
        summary="I, you, he, she, it, we, they — who is doing the action.",
        explanation="Subject pronouns replace the noun that performs the action in a sentence.\\n\\n| Singular | Plural |\\n|----------|--------|\\n| I | we |\\n| you | you |\\n| he / she / it | they |",
        rules=[
            "Use subject pronouns before the verb.",
            '"It" is used for things, animals (when gender is unknown), and impersonal subjects (It is raining).',
            '"You" is both singular and plural in English.',
        ],
        examples=[
            GrammarExample(text="She loves music."),
            GrammarExample(text="We are going to the park."),
            GrammarExample(text="It is raining outside."),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Me and my friend went.",
                correct="My friend and I went.",
                note='Use "I", not "me", as the subject. And put yourself last.',
            ),
        ],
        related=["possessive-adjectives"],
    ),
    GrammarTopic(
        slug="possessive-adjectives",
        title="Possessive Adjectives",
        level="A1",
        category="Pronouns",
        summary="my, your, his, her, its, our, their — showing ownership.",
        explanation="Possessive adjectives come before a noun to show who something belongs to.\\n\\n| Subject | Possessive |\\n|---------|------------|\\n| I | my |\\n| you | your |\\n| he | his |\\n| she | her |\\n| it | its |\\n| we | our |\\n| they | their |",
        rules=[
            "Possessive adjectives agree with the owner, not the noun.",
            '"Its" (no apostrophe) = possessive. "It\'s" = it is.',
            'Do not confuse "their" (possessive), "there" (place), and "they\'re" (they are).',
        ],
        examples=[
            GrammarExample(text="This is my book."),
            GrammarExample(text="She loves her cat."),
            GrammarExample(text="The dog wagged its tail."),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="The cat lost it's collar.",
                correct="The cat lost its collar.",
                note='"its" without apostrophe is possessive.',
            ),
            GrammarMistake(
                wrong="Their going to the park.",
                correct="They're going to the park.",
                note='"Their" is possessive; "they\'re" = they are.',
            ),
        ],
        related=["subject-pronouns"],
    ),
    GrammarTopic(
        slug="there-is-are",
        title="There is / There are",
        level="A1",
        category="Sentence Structure",
        summary='Describe what exists in a place using "there is" and "there are".',
        explanation="Use **there is** (singular/uncountable) and **there are** (plural) to say that something exists or is located somewhere.\\n\\n- *There is a park near my house.*\\n- *There are three bedrooms in my apartment.*\\n\\nNegative: *There isn't a café here.* / *There aren't any shops nearby.*\\n\\nQuestion: *Is there a bank near here?* / *Are there any seats?*",
        structure="There is + singular noun · There are + plural noun",
        rules=[
            'Use "there is" for singular countable and uncountable nouns.',
            'Use "there are" for plural nouns.',
            "Negative: there isn't / there aren't.",
            "Question: Is there...? / Are there...?",
            '"Any" is used in negatives and questions: "There aren\'t any eggs."',
        ],
        examples=[
            GrammarExample(text="There is a supermarket on the corner."),
            GrammarExample(text="There are two windows in the room."),
            GrammarExample(text="Is there a bus stop near here?", note="question"),
            GrammarExample(text="There aren't any hotels in this village.", note="negative plural"),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="There is two books on the table.",
                correct="There are two books on the table.",
                note='Use "there are" with plural nouns.',
            ),
            GrammarMistake(
                wrong="It is a park near here.",
                correct="There is a park near here.",
                note='Use "there is/are" to say something exists, not "it is".',
            ),
        ],
        related=["to-be", "articles", "prepositions-place"],
    ),
    GrammarTopic(
        slug="prepositions-place",
        title="Prepositions of Place",
        level="A1",
        category="Prepositions",
        summary="Use in, on, at, under, next to, behind and more to describe location.",
        explanation="Prepositions of place tell us where something is.\\n\\n| Preposition | Use | Example |\\n|-------------|-----|---------|\\n| in | inside a space | *in the room, in London* |\\n| on | on a surface | *on the table, on the wall* |\\n| at | at a specific point | *at the door, at school* |\\n| under | below | *under the bed* |\\n| next to | beside | *next to the bank* |\\n| behind | at the back | *behind the sofa* |\\n| in front of | facing | *in front of the building* |",
        rules=[
            '"In" for enclosed spaces, cities, and countries.',
            '"On" for surfaces, floors, and roads.',
            '"At" for specific points, addresses, and set locations (at school, at work).',
            "Do not confuse in/on/at — each has a specific range of uses.",
        ],
        examples=[
            GrammarExample(text="The keys are in the drawer."),
            GrammarExample(text="The picture is on the wall."),
            GrammarExample(text="She is at the office."),
            GrammarExample(text="The cat is under the table."),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="She is in the school.",
                correct="She is at school.",
                note='Use "at school" (no article) as a set phrase.',
            ),
            GrammarMistake(
                wrong="The book is in the table.",
                correct="The book is on the table.",
                note='Use "on" for surfaces, not "in".',
            ),
        ],
        related=["there-is-are", "articles"],
    ),
    GrammarTopic(
        slug="past-simple",
        title="Past Simple",
        level="A2",
        category="Tenses",
        summary="Describe completed actions in the past.",
        explanation="Use the **past simple** for:\\n- Completed actions at a specific time: *I went to Paris last year.*\\n- A sequence of past events: *She arrived, sat down, and opened her bag.*\\n\\nRegular verbs add **-ed**. Irregular verbs have unique forms (go → went, see → saw).",
        structure="Subject + verb-ed / irregular past form",
        rules=[
            "Add -ed to regular verbs (work → worked, play → played).",
            "Irregular verbs must be memorised (go → went, buy → bought).",
            "Negative: did not (didn't) + base verb.",
            "Question: Did + subject + base verb?",
        ],
        examples=[
            GrammarExample(text="She worked late yesterday."),
            GrammarExample(text="They didn't come to the party."),
            GrammarExample(text="Did you see that movie?"),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="He didn't went home.",
                correct="He didn't go home.",
                note="After did/didn't use the base form, not past tense.",
            ),
            GrammarMistake(
                wrong="I have went to school yesterday.",
                correct="I went to school yesterday.",
                note="With specific past time markers (yesterday, last week), use simple past, not present perfect.",
            ),
        ],
        related=["present-simple", "present-perfect"],
    ),
    GrammarTopic(
        slug="present-continuous",
        title="Present Continuous",
        level="A2",
        category="Tenses",
        summary="Describe actions happening right now or temporary situations.",
        explanation="Use the **present continuous** for:\\n- Actions happening at this moment: *I am writing an email right now.*\\n- Temporary situations: *She is staying with friends this week.*\\n- Future plans: *We are meeting tomorrow at 10.*",
        structure="Subject + am/is/are + verb-ing",
        rules=[
            "Always use am/is/are + -ing form.",
            "Stative verbs (know, love, want, believe) are NOT used in continuous tenses.",
            "Spelling: double the final consonant for short vowel verbs (run → running, sit → sitting).",
        ],
        examples=[
            GrammarExample(text="He is reading a book."),
            GrammarExample(text="They are not watching TV."),
            GrammarExample(text="What are you doing?"),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="I am knowing the answer.",
                correct="I know the answer.",
                note='"Know" is a stative verb — it does not take continuous form.',
            ),
            GrammarMistake(
                wrong="She is work right now.",
                correct="She is working right now.",
                note="Use the -ing form after is/am/are.",
            ),
        ],
        related=["present-simple", "past-simple"],
    ),
    GrammarTopic(
        slug="comparatives-superlatives",
        title="Comparatives & Superlatives",
        level="A2",
        category="Adjectives & Adverbs",
        summary="Compare two things or rank within a group.",
        explanation="**Comparative**: compare two things.\\n- Short adjectives: add -er (*faster, bigger*).\\n- Long adjectives: use more (*more interesting*).\\n\\n**Superlative**: rank one among many.\\n- Short: add -est (*the fastest*).\\n- Long: use most (*the most beautiful*).\\n\\nIrregulars: good → better → the best · bad → worse → the worst.",
        structure="adj-er than / more adj than · the adj-est / the most adj",
        rules=[
            "One-syllable adjectives: -er / -est (fast → faster → fastest).",
            "Two-syllable adjectives ending in -y: -ier / -iest (happy → happier).",
            "Three+ syllable adjectives: more / most.",
            "Double the final consonant for short vowel adjectives: big → bigger.",
        ],
        examples=[
            GrammarExample(text="This road is longer than I expected."),
            GrammarExample(text="She is more patient than her brother."),
            GrammarExample(text="This is the best coffee I've ever had."),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="She is more tall than me.",
                correct="She is taller than me.",
                note='Short adjectives take -er, not "more".',
            ),
            GrammarMistake(
                wrong="He is the most fast runner.",
                correct="He is the fastest runner.",
                note='Short adjectives take -est, not "most".',
            ),
        ],
        related=["adverbs-manner"],
    ),
    GrammarTopic(
        slug="can-cant",
        title="Can / Can't",
        level="A2",
        category="Modals",
        summary="Express ability and permission.",
        explanation="**Can** expresses:\\n- Ability: *I can swim.*\\n- Permission: *Can I leave early?*\\n- Possibility: *It can be very cold here in winter.*\\n\\n**Cannot / can't** is the negative form.",
        structure="Subject + can/can't + base verb",
        rules=[
            "Can never changes form — no -s for he/she/it.",
            'Always followed by the base verb (no "to"): "can go", not "can to go".',
            "For past ability, use could.",
        ],
        examples=[
            GrammarExample(text="She can speak three languages."),
            GrammarExample(text="Can you help me, please?"),
            GrammarExample(text="I can't find my keys."),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="She cans drive.", correct="She can drive.", note="Modal verbs never take -s."
            ),
            GrammarMistake(
                wrong="I can to swim.",
                correct="I can swim.",
                note='Do not use "to" after modal verbs.',
            ),
        ],
        related=["modal-verbs", "could-past-ability"],
    ),
    GrammarTopic(
        slug="going-to-future",
        title="Going to (Future Plans)",
        level="A2",
        category="Tenses",
        summary="Talk about planned intentions and predictions based on evidence.",
        explanation="Use **going to** for:\\n- **Planned intentions**: something you have already decided.\\n *I am going to start a new course next month.*\\n- **Predictions with evidence**: you can see a result coming.\\n *Look at those clouds — it is going to rain.*",
        structure="Subject + am/is/are + going to + base verb",
        rules=[
            "Use am/is/are + going to + base verb.",
            "The form of be must match the subject (I am, she is, they are).",
            "Use for plans already decided, not spontaneous decisions.",
            '"Going to" is different from "will" (spontaneous) and present continuous (fixed arrangements).',
        ],
        examples=[
            GrammarExample(
                text="We are going to visit Rome next summer.", note="planned intention"
            ),
            GrammarExample(text="She is going to start her new job on Monday."),
            GrammarExample(
                text="Look at the traffic — we're going to be late!",
                note="prediction with evidence",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="I am going to went home.",
                correct="I am going to go home.",
                note='Use the base verb after "going to", not the past form.',
            ),
            GrammarMistake(
                wrong="She going to call you.",
                correct="She is going to call you.",
                note='Do not forget the verb "be" before "going to".',
            ),
        ],
        related=["will-future", "present-continuous"],
    ),
    GrammarTopic(
        slug="will-future",
        title="Will (Future)",
        level="A2",
        category="Tenses",
        summary="Make spontaneous decisions, offers, promises, and predictions.",
        explanation="Use **will** for:\\n- **Spontaneous decisions** made at the moment of speaking:\\n *I will help you with that.*\\n- **Predictions** (opinions about the future):\\n *I think it will be a great year.*\\n- **Promises and offers**:\\n *I will always remember this.*",
        structure="Subject + will + base verb",
        rules=[
            "Will never changes form — no -s for he/she/it.",
            "Negative: will not / won't.",
            'Always followed by the base verb (no "to").',
            '"Will" is for decisions made at the moment of speaking, not pre-planned.',
        ],
        examples=[
            GrammarExample(text="I'll call you tomorrow.", note="promise"),
            GrammarExample(text="I think she will pass the exam.", note="prediction"),
            GrammarExample(
                text="A: The phone is ringing. B: I'll get it!", note="spontaneous decision"
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="She wills be there.",
                correct="She will be there.",
                note="Will never takes -s.",
            ),
            GrammarMistake(
                wrong="I will to call you.",
                correct="I will call you.",
                note='Do not use "to" after will.',
            ),
        ],
        related=["going-to-future", "first-conditional", "present-continuous"],
    ),
    GrammarTopic(
        slug="could-past-ability",
        title="Could (Past Ability & Polite Requests)",
        level="A2",
        category="Modals",
        summary='Use "could" to talk about past ability and make polite requests.',
        explanation='**Could** has two main uses at A2:\\n\\n**1. Past ability** (the past of "can"):\\n*When I was young, I could run very fast.*\\n*She couldn\'t swim before she took lessons.*\\n\\n**2. Polite requests** (more formal than "can"):\\n*Could you pass the salt, please?*',
        structure="Subject + could/couldn't + base verb",
        rules=[
            "Could never changes form — no -s for he/she/it.",
            "Always followed by the base verb.",
            "Negative: could not / couldn't.",
            'For a specific one-time achievement in the past, use "was/were able to", not "could".',
        ],
        examples=[
            GrammarExample(
                text="I could speak a little French when I was a child.", note="past ability"
            ),
            GrammarExample(text="She couldn't drive until she was 25.", note="past inability"),
            GrammarExample(text="Could you help me with this, please?", note="polite request"),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Yesterday I could finish the project.",
                correct="Yesterday I was able to finish the project.",
                note='For a specific one-time achievement, use "was/were able to".',
            ),
        ],
        related=["can-cant", "modal-verbs"],
    ),
    GrammarTopic(
        slug="countable-uncountable",
        title="Countable & Uncountable Nouns",
        level="A2",
        category="Nouns",
        summary="Understand the difference between nouns you can count and those you cannot.",
        explanation='**Countable nouns** have singular and plural forms:\\n*one apple → two apples · a book → three books*\\n\\n**Uncountable nouns** have no plural and cannot be used with "a/an":\\n*water, money, information, bread, rice, advice*\\n\\nTo express quantity with uncountable nouns, use **a piece of**, **a glass of**, **a kilo of**, etc.',
        rules=[
            "Countable: can use a/an and plurals (a dog, three dogs).",
            'Uncountable: no plural, no a/an (water, not "a water" or "waters").',
            'Some nouns can be both: "a coffee" (one cup) vs "I love coffee" (the substance).',
            'Use "much" with uncountable; "many" with countable.',
        ],
        examples=[
            GrammarExample(
                text="Can I have a glass of water?", note='uncountable — use "a glass of"'
            ),
            GrammarExample(
                text="She gave me some useful information.",
                note="information is always uncountable",
            ),
            GrammarExample(
                text="I need two kilos of rice.", note="quantity expression for uncountable noun"
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Can you give me an advice?",
                correct="Can you give me some advice?",
                note='"Advice" is uncountable — no a/an.',
            ),
            GrammarMistake(
                wrong="I have many homeworks.",
                correct="I have a lot of homework.",
                note='"Homework" is uncountable — no plural.',
            ),
        ],
        related=["articles", "some-any-much-many"],
    ),
    GrammarTopic(
        slug="some-any-much-many",
        title="Some, Any, Much, Many, A lot of",
        level="A2",
        category="Nouns",
        summary="Express quantities with countable and uncountable nouns.",
        explanation="| Quantifier | Use | Example |\\n|------------|-----|---------|\\n| some | positive statements | *I have some milk.* |\\n| any | negatives and questions | *I don't have any milk. Do you have any?* |\\n| much | uncountable (questions/negatives) | *How much water?* |\\n| many | countable (questions/negatives) | *How many eggs?* |\\n| a lot of | positive (both) | *There is a lot of traffic.* |",
        rules=[
            'Use "some" in positive sentences; "any" in negatives and questions.',
            'Use "much" with uncountable nouns; "many" with countable nouns.',
            '"A lot of" works with both in positive sentences.',
            'In offers and requests, use "some" in questions: "Would you like some tea?"',
        ],
        examples=[
            GrammarExample(text="There is some bread on the table."),
            GrammarExample(text="There aren't any oranges left."),
            GrammarExample(text="How many students are in the class?"),
            GrammarExample(text="How much money do you have?"),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="I don't have some sugar.",
                correct="I don't have any sugar.",
                note='Use "any" in negative sentences.',
            ),
            GrammarMistake(
                wrong="How many water do you drink?",
                correct="How much water do you drink?",
                note='"Water" is uncountable — use "much".',
            ),
        ],
        related=["countable-uncountable", "articles"],
    ),
    GrammarTopic(
        slug="imperatives",
        title="Imperatives",
        level="A2",
        category="Verb Forms",
        summary="Give instructions, orders, advice, and warnings.",
        explanation="**Imperatives** use the base form of the verb without a subject.\\n\\n- **Affirmative**: *Open the door. Sit down. Call me later.*\\n- **Negative**: *Don't touch that. Don't be late.*\\n- **Polite**: add \"please\" at the start or end: *Please come in. / Sit down, please.*\\n\\nImperatives are used for instructions, recipes, signs, warnings, and requests.",
        structure="Base verb (+ object) · Don't + base verb",
        rules=[
            "Use the base verb with no subject.",
            "Negative: don't + base verb.",
            'Adding "please" makes imperatives polite.',
            'The subject is always "you" (implied), but not stated.',
        ],
        examples=[
            GrammarExample(text="Turn off your phone.", note="instruction"),
            GrammarExample(text="Don't park here.", note="prohibition"),
            GrammarExample(text="Take two tablets twice a day.", note="medical instruction"),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="You open the window please.",
                correct="Open the window, please.",
                note='Imperatives have no subject — remove "you".',
            ),
            GrammarMistake(
                wrong="Don't to run!",
                correct="Don't run!",
                note="No 'to' after don't in imperatives.",
            ),
        ],
        related=["modal-verbs", "present-simple"],
    ),
    GrammarTopic(
        slug="prepositions-time",
        title="Prepositions of Time (at, on, in)",
        level="A2",
        category="Prepositions",
        summary="Use at, on, and in correctly with times, days, and periods.",
        explanation="| Preposition | Used for | Examples |\\n|-------------|----------|-----------|\\n| **at** | clock times, specific times | *at 7 pm, at midnight, at Christmas* |\\n| **on** | days and dates | *on Monday, on 5th March, on my birthday* |\\n| **in** | months, years, seasons, longer periods | *in July, in 2020, in summer, in the morning* |\\n\\n**No preposition** with: *today, yesterday, tomorrow, last/next week, this morning*.",
        rules=[
            '"At" for clock times: at 3 pm, at noon, at midnight.',
            '"On" for days and dates: on Saturday, on 1st January.',
            '"In" for months, years, seasons, and parts of the day (except "at night").',
            'No preposition before "last", "next", "this", "every".',
        ],
        examples=[
            GrammarExample(text="The meeting is at 9 am on Monday."),
            GrammarExample(text="She was born in March 1995."),
            GrammarExample(text="I usually study in the evening."),
            GrammarExample(text="I saw him last week.", note='no preposition with "last"'),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="She arrived in Monday.",
                correct="She arrived on Monday.",
                note='Use "on" for days of the week.',
            ),
            GrammarMistake(
                wrong="I was born on 1990.",
                correct="I was born in 1990.",
                note='Use "in" for years.',
            ),
        ],
        related=["prepositions-place", "past-simple", "present-simple"],
    ),
    GrammarTopic(
        slug="adverbs-manner",
        title="Adverbs of Manner",
        level="A2",
        category="Adjectives & Adverbs",
        summary="Describe how an action is done using adverbs ending in -ly.",
        explanation='Adverbs of manner answer the question *"How?"*\\n\\nMost are formed by adding **-ly** to an adjective:\\n- *slow → slowly · careful → carefully · quiet → quietly*\\n\\nIrregular forms:\\n- *good → well · fast → fast · hard → hard · early → early*\\n\\nPosition: usually **after the verb** or verb + object.\\n*She speaks clearly. / He drives fast.*',
        structure="Verb + adverb (or adverb + adjective)",
        rules=[
            "Most adjectives → adverb: + ly (quick → quickly).",
            "Adjectives ending in -y: change y to i + ly (happy → happily).",
            "Adjectives ending in -ic: + ally (dramatic → dramatically).",
            "Irregular: good → well, hard → hard, fast → fast.",
            "Place the adverb after the verb (and its object if there is one).",
        ],
        examples=[
            GrammarExample(text="She sings beautifully."),
            GrammarExample(
                text="He worked hard all day.", note='"hard" is the same as adjective and adverb'
            ),
            GrammarExample(text="Please speak slowly.", note="after the verb"),
            GrammarExample(text="She plays the piano well.", note="irregular: good → well"),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="She speaks good English.",
                correct="She speaks English well.",
                note='"Good" is an adjective; the adverb is "well".',
            ),
            GrammarMistake(
                wrong="He drives fastly.",
                correct="He drives fast.",
                note='"Fast" is its own adverb — no -ly.',
            ),
        ],
        related=["comparatives-superlatives", "present-simple"],
    ),
    GrammarTopic(
        slug="present-perfect",
        title="Present Perfect",
        level="B1",
        category="Tenses",
        summary="Connect past experiences or recent events to the present.",
        explanation="Use the **present perfect** for:\\n- Life experiences (no specific time): *I have visited Japan.*\\n- Recent events with present relevance: *She has just finished the report.*\\n- Unfinished situations: *I have lived here for five years.*\\n\\nKey time markers: **ever, never, just, already, yet, since, for**.",
        structure="Subject + have/has + past participle",
        rules=[
            "Use have for I/you/we/they; has for he/she/it.",
            "Use the past participle (not simple past): gone, seen, done, been.",
            'With "for" + duration; with "since" + starting point.',
            "Do NOT use with specific past time markers (yesterday, in 2010 → use past simple).",
        ],
        examples=[
            GrammarExample(text="Have you ever eaten sushi?", note="life experience"),
            GrammarExample(text="She has just left the office.", note="recent, relevant now"),
            GrammarExample(text="I haven't seen him since Monday."),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="I have seen her yesterday.",
                correct="I saw her yesterday.",
                note='"Yesterday" is specific → past simple.',
            ),
            GrammarMistake(
                wrong="He has went to the store.",
                correct="He has gone to the store.",
                note="Use the past participle (gone), not simple past (went).",
            ),
        ],
        related=["past-simple", "past-perfect"],
    ),
    GrammarTopic(
        slug="first-conditional",
        title="First Conditional",
        level="B1",
        category="Conditionals",
        summary="Real and likely future situations.",
        explanation="The **first conditional** expresses real, possible situations in the future.\\n\\n*If it rains, we will cancel the match.*\\n\\nThe if-clause uses **present simple** (not will); the result clause uses **will**.",
        structure="If + present simple, will + base verb",
        rules=[
            "If-clause: present simple (never will in the if-clause).",
            "Main clause: will/won't + base verb.",
            'The clauses can be reversed: "We will cancel if it rains."',
            "Can also use other modals in main clause: might, could, should.",
        ],
        examples=[
            GrammarExample(text="If you study hard, you will pass the exam."),
            GrammarExample(text="I won't go if it's too cold."),
            GrammarExample(text="If she calls, tell her I'm busy."),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="If it will rain, we will stay.",
                correct="If it rains, we will stay.",
                note='Do not use "will" in the if-clause.',
            ),
        ],
        related=["zero-conditional", "second-conditional", "will-future"],
    ),
    GrammarTopic(
        slug="passive-voice-simple",
        title="Passive Voice (Simple)",
        level="B1",
        category="Passive Voice",
        summary="Focus on the action or object, not the doer.",
        explanation="Use the **passive voice** when:\\n- The doer is unknown: *The window was broken.*\\n- The doer is obvious: *The suspect was arrested.*\\n- You want to focus on the action or receiver.\\n\\nPresent: *The report is written every week.*\\nPast: *The report was written yesterday.*",
        structure="Subject + be (conjugated) + past participle (+ by + agent)",
        rules=[
            "Be must be conjugated to match the tense and subject.",
            "The agent (by + person) is often omitted.",
            "Not all verbs can be passive — intransitive verbs (arrive, sleep) cannot.",
        ],
        examples=[
            GrammarExample(text="English is spoken all over the world."),
            GrammarExample(text="The letter was written by her grandmother."),
            GrammarExample(text="The results will be announced tomorrow."),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="The cake was ate by the children.",
                correct="The cake was eaten by the children.",
                note="Use the past participle (eaten), not simple past (ate).",
            ),
        ],
        related=["advanced-passive", "past-simple"],
    ),
    GrammarTopic(
        slug="relative-clauses",
        title="Relative Clauses — Relative Pronouns (who, which, that, whose)",
        level="B1",
        category="Clauses",
        summary="Add information about a noun using the right relative pronoun: who, which, that, or whose.",
        explanation="Relative clauses follow a noun and give more information about it. The choice of relative pronoun depends on what the clause refers to:\n\n| Pronoun | Refers to | Example |\n|---------|-----------|--------|\n| **who** | people | *The man who lives next door is a chef.* |\n| **which** | things | *The book which I bought is great.* |\n| **that** | people or things | *The car that broke down was new.* |\n| **whose** | possession (people or things) | *The student whose essay won is here.* |\n\n**When can you omit the pronoun?**\nWhen the relative pronoun is the **object** of the clause, it can be left out:\n- *The book (that) I read was excellent.* (that = object — omissible)\n- *The man who called me was polite.* (who = subject — cannot omit)\n\n**Defining vs. non-defining:** Relative clauses can be defining (no commas, essential) or non-defining (commas, extra info). See the topic *Defining vs. Non-Defining Relative Clauses* for the full treatment.",
        structure="Noun + who/which/that + clause · Noun + whose + noun + clause",
        rules=[
            "Who for people, which for things, that for both (in defining clauses only).",
            "Whose shows possession for people and things.",
            "The relative pronoun can be omitted when it is the object of the clause.",
            "Never use 'that' in non-defining (comma) clauses — see defining-non-defining-clauses.",
        ],
        examples=[
            GrammarExample(text="The girl who won the prize is my sister.", note="who — people"),
            GrammarExample(
                text="New York, which is the largest city in the United States, is very expensive.",
                note="which — non-defining",
            ),
            GrammarExample(
                text="The bag whose strap is broken needs to be repaired.",
                note="whose — possession",
            ),
            GrammarExample(
                text="The movie (that) I watched last night was great.",
                note="that/omitted — object position",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="The woman which works here is called Anna.",
                correct="The woman who works here is called Anna.",
                note='Use "who" for people, not "which".',
            ),
            GrammarMistake(
                wrong="The man who he lives next door is a doctor.",
                correct="The man who lives next door is a doctor.",
                note="Don't repeat the subject pronoun inside the relative clause.",
            ),
        ],
        related=[
            "defining-non-defining-clauses",
            "advanced-relative-clauses",
            "discourse-connectors-b1",
        ],
    ),
    GrammarTopic(
        slug="modal-verbs",
        title="Modal Verbs",
        level="B1",
        category="Modals",
        summary="must, should, could, might, would — expressing obligation, advice, and probability.",
        explanation='Modal verbs modify the main verb to express:\\n\\n| Modal | Use |\\n|-------|-----|\\n| must | strong obligation / deduction |\\n| should | advice / expectation |\\n| could | past ability / polite request / possibility |\\n| might | weak possibility |\\n| would | conditional / polite request |\\n\\nAll modals: no -s, followed by base verb, no "to".',
        rules=[
            'No -s for third person: "she must", not "she musts".',
            'No "to" after modals: "should go", not "should to go".',
            "For past modals: modal + have + past participle (should have done).",
        ],
        examples=[
            GrammarExample(text="You should see a doctor."),
            GrammarExample(text="It might rain later."),
            GrammarExample(text="Could you pass the salt, please?"),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="She musts leave now.",
                correct="She must leave now.",
                note="Modals never take -s.",
            ),
            GrammarMistake(
                wrong="You should to call him.",
                correct="You should call him.",
                note='No "to" after modals.',
            ),
        ],
        related=["can-cant", "second-conditional", "modal-perfects"],
    ),
    GrammarTopic(
        slug="zero-conditional",
        title="Zero Conditional",
        level="B1",
        category="Conditionals",
        summary="Express facts and general truths that are always true.",
        explanation='The **zero conditional** is used for things that are always true — scientific facts, general rules, and habits.\\n\\n*If you heat water to 100°C, it boils.*\\n*If I miss breakfast, I feel tired.*\\n\\nBoth clauses use the **present simple**. Note: "when" can replace "if" in zero conditionals without changing the meaning.',
        structure="If + present simple, present simple",
        rules=[
            "Both clauses use present simple.",
            "The result always happens — it is a fact or general truth.",
            '"When" can replace "if": "When water freezes, it expands."',
            "Different from first conditional (real future possibility).",
        ],
        examples=[
            GrammarExample(text="If you mix red and blue, you get purple.", note="scientific fact"),
            GrammarExample(
                text="If she stays up late, she feels tired the next day.",
                note="habit/general truth",
            ),
            GrammarExample(text="If it rains, the ground gets wet.", note="natural fact"),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="If you heat water, it will boil.",
                correct="If you heat water, it boils.",
                note="Zero conditional uses present simple in both clauses, not will.",
            ),
        ],
        related=["first-conditional", "present-simple"],
    ),
    GrammarTopic(
        slug="reported-speech-basics",
        title="Reported Speech (Basics)",
        level="B1",
        category="Reported Speech",
        summary="Report what someone said using tense backshift.",
        explanation='**Reported speech** (indirect speech) reports what someone said without quoting them directly.\\n\\nThe tense shifts back:\\n\\n| Direct speech | Reported speech |\\n|--------------|-----------------|\\n| "I am tired." | She said she **was** tired. |\\n| "I work here." | He said he **worked** there. |\\n| "I will help." | She said she **would** help. |\\n\\n**Reporting verbs**: say, tell, explain, add, reply.\\n- **say**: she said (that)...\\n- **tell**: she told me/him/her (that)...',
        rules=[
            "Present simple → past simple in reported speech.",
            "Will → would; can → could; must → had to.",
            '"Tell" must have an object (me, him, her): "She told me that..."',
            '"Say" does not need an object: "She said that..."',
            "Time/place words change: today → that day, here → there, now → then.",
        ],
        examples=[
            GrammarExample(
                text='"I live in Paris." → He said he lived in Paris.', note="tense backshift"
            ),
            GrammarExample(text='"I will call you." → She said she would call me.'),
            GrammarExample(text="\"I can't come.\" → He told me he couldn't come."),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="She said me she was tired.",
                correct="She told me she was tired.",
                note='"Said" takes no object. Use "told me".',
            ),
            GrammarMistake(
                wrong="He said that he will come.",
                correct="He said that he would come.",
                note='"Will" becomes "would" in reported speech.',
            ),
        ],
        related=["past-simple", "modal-verbs"],
    ),
    GrammarTopic(
        slug="used-to-would",
        title="Used To & Would (Past Habits)",
        level="B1",
        category="Tenses",
        summary="Describe past habits, repeated actions, and states that no longer exist using *used to* and *would*.",
        explanation='**Used to** describes past habits, repeated actions, or states that are no longer true.\\n\\n**Structure:** *subject + used to + base verb*\\n- *I used to play soccer every weekend.* (past habit)\\n- *She used to live in Madrid.* (past state)\\n\\n**Would** describes past repeated actions or habits (NOT states).\\n\\n**Structure:** *subject + would + base verb*\\n- *Every summer, we would visit my grandparents.* (past habit)\\n- ❌ *She would live in Madrid.* (wrong — states need "used to", not "would")\\n\\n**Key differences:**\\n| | used to | would |\\n|---|---|---|\\n| Habits | ✓ | ✓ |\\n| States | ✓ | ✗ |\\n| Single past events | ✗ | ✗ |\\n\\n**Negatives and questions use "used to":**\\n- *I didn\'t use to like coffee.* (note: "use to", not "used to", after "did")\\n- *Did you use to play chess?*',
        rules=[
            'Use "used to" for past habits AND past states that are no longer true.',
            'Use "would" only for past repeated actions — never for past states (know, believe, live, be, etc.).',
            'After "did/didn\'t", write "use to" (no -d): "Did you use to...?" / "I didn\'t use to..."',
            'Neither "used to" nor "would" can describe a single, one-off past event — use the past simple.',
            "Both imply contrast with the present: the situation has changed.",
        ],
        examples=[
            GrammarExample(
                text="I used to hate vegetables, but now I love them.",
                note='past state — use "used to", not "would"',
            ),
            GrammarExample(
                text="Every Friday, we would go to the movies together.",
                note='past repeated action — "would" is fine',
            ),
            GrammarExample(
                text="She didn't use to speak English very well.",
                note='negative form — "use to" after "didn\'t"',
            ),
            GrammarExample(
                text="Did you use to have long hair?", note='question form — "use to" after "did"'
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="He would live in Paris when he was young.",
                correct="He used to live in Paris when he was young.",
                note='"Would" cannot describe past states — use "used to".',
            ),
            GrammarMistake(
                wrong="I didn't used to like jazz.",
                correct="I didn't use to like jazz.",
                note='The -d is carried by "did" — "use to" has no -d after auxiliaries.',
            ),
        ],
        related=["past-simple", "past-perfect", "reported-speech-basics"],
    ),
    GrammarTopic(
        slug="expressing-opinions",
        title="Expressing & Defending Opinions",
        level="B1",
        category="Advanced",
        summary="Give, support, and respond to opinions in English.",
        explanation="At B1 level, expressing opinions goes beyond \"I think\" — it includes:\\n\\n**Introducing opinions:**\\n- *In my opinion... / As far as I'm concerned...*\\n- *I believe... / It seems to me that...*\\n\\n**Agreeing:**\\n- *I agree with you. / That's a good point. / Exactly!*\\n\\n**Disagreeing politely:**\\n- *I see your point, but... / I'm not sure I agree.*\\n\\n**Giving reasons:**\\n- *because / since / as / due to / given that*",
        rules=[
            'Use a range of opinion phrases, not just "I think".',
            "Support opinions with reasons using because, since, as.",
            'Acknowledge the other view before disagreeing: "I see your point, but..."',
            'Avoid absolute statements — hedge with "might", "tend to", "generally".',
        ],
        examples=[
            GrammarExample(
                text="In my opinion, social media has more disadvantages than advantages."
            ),
            GrammarExample(text="I see your point, but I think the benefits outweigh the risks."),
            GrammarExample(text="As far as I'm concerned, the most important issue is education."),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="I am agree with you.",
                correct="I agree with you.",
                note='"Agree" is a verb, not an adjective — no "am" needed.',
            ),
            GrammarMistake(
                wrong="In my opinion, I think...",
                correct="In my opinion, ... (or) I think...",
                note="Don't use both phrases together — they are synonyms.",
            ),
        ],
        related=["discourse-connectors-b1", "modal-verbs"],
    ),
    GrammarTopic(
        slug="discourse-connectors-b1",
        title="Discourse Connectors (B1)",
        level="B1",
        category="Advanced",
        summary="Link ideas in sentences and paragraphs with connectors.",
        explanation="Discourse connectors link ideas between clauses and sentences.\\n\\n| Function | Connectors |\\n|----------|------------|\\n| Adding | also, moreover, in addition, besides |\\n| Contrasting | but, however, although, even though, despite |\\n| Giving reason | because, since, as, due to |\\n| Showing result | so, therefore, as a result, consequently |\\n| Exemplifying | for example, for instance, such as |",
        rules=[
            '"However" and "therefore" usually start a new clause followed by a comma.',
            '"Although/even though" connect two clauses in one sentence.',
            '"Despite/in spite of" are followed by a noun or noun phrase, not a clause.',
            'Vary connectors — do not repeat "but" or "and" too often.',
        ],
        examples=[
            GrammarExample(
                text="I was tired. However, I finished the report.",
                note='"However" at sentence start',
            ),
            GrammarExample(
                text="Although it was raining, we went for a walk.", note='"Although" mid-sentence'
            ),
            GrammarExample(
                text="Despite the rain, we enjoyed ourselves.", note='"Despite" + noun phrase'
            ),
            GrammarExample(
                text="She studied hard; therefore, she passed.", note="cause and result"
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Despite it was raining, we went out.",
                correct="Although it was raining, we went out.",
                note='"Despite" cannot be followed by a clause; use "although".',
            ),
            GrammarMistake(
                wrong="However I agree.",
                correct="However, I agree.",
                note='Use a comma after "however" at the start of a clause.',
            ),
        ],
        related=["expressing-opinions"],
    ),
    GrammarTopic(
        slug="present-perfect-continuous",
        title="Present Perfect Continuous",
        level="B1",
        category="Tenses",
        summary="Actions that started in the past and continue to the present, or have just finished with visible results.",
        explanation="Use the **present perfect continuous** for:\n\n1. Actions that started in the past and are still continuing:\n   *I have been studying English for three years.*\n2. Actions that have recently stopped but have visible results now:\n   *She is tired because she has been working all day.*\n3. Emphasising the duration of an activity:\n   *We have been waiting for over an hour.*\n\nCompare with present perfect simple:\n- *I have read the book.* (completed action, result: I know the story)\n- *I have been reading the book.* (ongoing activity, may not be finished)",
        structure="have/has + been + verb(-ing)",
        rules=[
            "Form: have/has + been + present participle (-ing).",
            "Used for continuing actions or recently finished actions with present results.",
            "Emphasises duration or ongoing nature of the activity.",
            'Do not use with stative verbs: "I have been knowing him" → "I have known him".',
        ],
        examples=[
            GrammarExample(text="I have been learning English for two years.", note="continuing"),
            GrammarExample(
                text="He is out of breath because he has been running.", note="recent result"
            ),
            GrammarExample(text="It has been raining all day.", note="duration emphasis"),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="I have been knowing her since 2010.",
                correct="I have known her since 2010.",
                note="Stative verbs (know, like, believe) are not used in continuous form.",
            ),
            GrammarMistake(
                wrong="I am working here for five years.",
                correct="I have been working here for five years.",
                note="Use present perfect continuous for past-to-present duration, not present continuous.",
            ),
        ],
        related=["present-perfect", "present-continuous", "past-perfect"],
    ),
    GrammarTopic(
        slug="passive-voice-perfect",
        title="Passive Voice — Perfect Tenses",
        level="B1",
        category="Passive Voice",
        summary="Using the passive voice with present perfect, past perfect, and future perfect.",
        explanation="**Perfect passive** forms follow the same pattern as active perfect tenses:\n\n| Active | Passive |\n|--------|---------|\n| They have completed the project. | The project has been completed. |\n| They had finished the work. | The work had been finished. |\n| They will have solved it. | It will have been solved. |\n\nUse the perfect passive when the focus is on the completion or result of an action, and the agent is unknown or unimportant.",
        structure="have/has/had/will have + been + past participle",
        rules=[
            "Form: have/has/had/will have + been + past participle.",
            "Used when the completion or result of the action matters more than the agent.",
            "Present perfect passive emphasises a completed action with present relevance.",
            "Past perfect passive for actions completed before another past point.",
        ],
        examples=[
            GrammarExample(text="The report has been submitted.", note="present perfect passive"),
            GrammarExample(
                text="The decision had been made before the meeting.", note="past perfect passive"
            ),
            GrammarExample(
                text="All tasks will have been completed by Friday.", note="future perfect passive"
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="The work has been did.",
                correct="The work has been done.",
                note='"Been" is always followed by the past participle.',
            ),
            GrammarMistake(
                wrong="The package has been delivered yesterday.",
                correct="The package was delivered yesterday.",
                note="With a specific past time, use past simple passive, not present perfect.",
            ),
        ],
        related=["passive-voice-simple", "advanced-passive"],
    ),
    GrammarTopic(
        slug="should-ought-to",
        title="Should, Ought to — Advice and Expectation",
        level="B1",
        category="Modals",
        summary="Giving advice, making recommendations, and expressing obligation or expectation.",
        explanation="**Should** and **ought to** are used to give advice, make recommendations, and express what is right or expected.\n\n- **Should**: more common, general advice. *You should see a doctor.*\n- **Ought to**: slightly more formal, often implies a moral duty or strong expectation. *You ought to apologize.*\n\n| Use | Example |\n|-----|---------|\n| Advice | You should study more. |\n| Expectation | The train should arrive at 3. |\n| Past regret | You should have called me. |\n\nIn negative: *should not* (shouldn't), *ought not to*.",
        structure="should / ought to + base verb",
        rules=[
            '"Should" is more common in everyday English; "ought to" is more formal.',
            "Both are followed by the base form of the verb.",
            '"Should" + have + past participle expresses regret about the past.',
            'Questions with "ought": Ought I to...? (rare; "should I...?" is preferred).',
        ],
        examples=[
            GrammarExample(text="You should eat more vegetables.", note="advice"),
            GrammarExample(text="She ought to arrive by noon.", note="expectation"),
            GrammarExample(text="I should have studied harder.", note="past regret"),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="You should to go now.",
                correct="You should go now.",
                note='"Should" is followed directly by the base verb, not "to".',
            ),
            GrammarMistake(
                wrong="You ought study.",
                correct="You ought to study.",
                note='"Ought" is always followed by "to".',
            ),
        ],
        related=["modal-verbs", "must-have-to", "could-past-ability"],
    ),
    GrammarTopic(
        slug="must-have-to",
        title="Must, Have to — Obligation and Necessity",
        level="B1",
        category="Modals",
        summary="Expressing obligation, necessity, and prohibition with must and have to.",
        explanation="**Must** and **have to** both express obligation, but with subtle differences:\n\n- **Must**: internal obligation (the speaker feels it is necessary). *I must call my mom.*\n- **Have to**: external obligation (rules, laws, other people). *I have to wear a uniform.*\n\n| Use | Internal | External |\n|-----|----------|----------|\n| Present | must | have to |\n| Past | had to | had to |\n| Future | must | will have to |\n\nNegative:\n- **Must not** (mustn't): prohibition. *You mustn't smoke here.*\n- **Don't have to**: no obligation. *You don't have to come.*",
        structure="must / have to + base verb",
        rules=[
            '"Must" expresses the speaker\'s personal feeling of obligation.',
            '"Have to" expresses obligation from rules, laws, or external circumstances.',
            '"Must not" = prohibition. "Don\'t have to" = no obligation.',
            'Only "have to" has past and future forms (had to, will have to).',
        ],
        examples=[
            GrammarExample(text="I must finish this report today.", note="internal obligation"),
            GrammarExample(text="Employees have to wear an ID badge.", note="external rule"),
            GrammarExample(text="You mustn't touch that — it's dangerous.", note="prohibition"),
            GrammarExample(text="I had to wait for two hours.", note="past obligation"),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="I musted go.",
                correct="I had to go.",
                note='"Must" has no past form; use "had to".',
            ),
            GrammarMistake(
                wrong="You mustn't to be late.",
                correct="You mustn't be late.",
                note='No "to" after "must".',
            ),
        ],
        related=["modal-verbs", "should-ought-to", "can-cant"],
    ),
    GrammarTopic(
        slug="wish-if-only",
        title="Wish / If Only — Introduction (Present & Past Regrets)",
        level="B1",
        category="Conditionals",
        summary="Introduce wish and if only to express what you would like to be different now or in the past.",
        explanation="Use **wish** and **if only** to talk about things we would like to be different:\n\n| Situation | Structure | Example |\n|-----------|-----------|---------|\n| Present regret | wish + past simple | *I wish I spoke French.* |\n| Past regret | wish + past perfect | *I wish I had studied harder.* |\n\n**If only** is more emphatic than **wish** — it carries a stronger emotional weight:\n- *If only I had more time.* (stronger than 'I wish I had more time')\n- *If only I hadn't said that!*\n\n**Note:** The past simple after 'wish' is not truly past — it describes an unreal present situation.\n*I wish I was/were taller.* = I am not tall (now). Both 'was' and 'were' are accepted; 'were' is more formal.",
        structure="wish / if only + past simple (present regret) · wish / if only + past perfect (past regret)",
        rules=[
            "Wish + past simple → regret about the present (not truly past).",
            "Wish + past perfect → regret about the past.",
            '"If only" is more emphatic than "I wish" — use it for stronger feelings.',
            'Never use "wish" + present or future simple: ✗ "I wish I am taller".',
            '"Was" and "were" are both accepted after "wish"; "were" is more formal.',
        ],
        examples=[
            GrammarExample(text="I wish I had more free time.", note="present regret"),
            GrammarExample(text="I wish I had gone to the concert.", note="past regret"),
            GrammarExample(
                text="If only she would listen to me.", note="emphatic — see B2 for wish+would"
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="I wish I am taller.",
                correct="I wish I was/were taller.",
                note='Use past simple after "wish" for present regrets — never present simple.',
            ),
            GrammarMistake(
                wrong="I wish I would have known.",
                correct="I wish I had known.",
                note='Use past perfect for past regrets, not "would have".',
            ),
        ],
        related=["wishes-regrets", "third-conditional", "second-conditional"],
    ),
    GrammarTopic(
        slug="second-conditional",
        title="Second Conditional",
        level="B2",
        category="Conditionals",
        summary="Unreal or hypothetical present/future situations.",
        explanation="The **second conditional** expresses hypothetical situations that are unlikely or contrary to current reality.\\n\\n*If I won the lottery, I would travel the world.*\\n(I haven't won — this is imaginary.)\\n\\nNote: use **were** (not was) for all subjects in formal/written English:\\n*If I were you, I would apologize.*",
        structure="If + past simple, would + base verb",
        rules=[
            "If-clause: past simple (never would).",
            "Main clause: would/could/might + base verb.",
            '"If I were you" is a fixed expression (not "if I was you" in formal English).',
        ],
        examples=[
            GrammarExample(text="If she had more time, she would study abroad."),
            GrammarExample(text="I wouldn't do that if I were you."),
            GrammarExample(text="What would you do if you lost your phone?"),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="If I would have money, I would travel.",
                correct="If I had money, I would travel.",
                note='Do not use "would" in the if-clause.',
            ),
        ],
        related=["first-conditional", "third-conditional", "mixed-conditionals"],
    ),
    GrammarTopic(
        slug="third-conditional",
        title="Third Conditional",
        level="B2",
        category="Conditionals",
        summary="Imagining a different outcome for a past situation.",
        explanation="The **third conditional** refers to situations in the past that did NOT happen and their imaginary results.\\n\\n*If I had studied harder, I would have passed the exam.*\\n(I didn't study hard — and I didn't pass.)",
        structure="If + past perfect, would have + past participle",
        rules=[
            "If-clause: past perfect (had + past participle).",
            "Main clause: would have + past participle.",
            "Can use could have / might have instead of would have.",
        ],
        examples=[
            GrammarExample(text="If she had left earlier, she wouldn't have missed the train."),
            GrammarExample(text="He might have got the job if he had prepared better."),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="If I would have known, I would have helped.",
                correct="If I had known, I would have helped.",
                note='No "would" in the if-clause of the third conditional.',
            ),
        ],
        related=["second-conditional", "mixed-conditionals", "past-perfect"],
    ),
    GrammarTopic(
        slug="reported-speech",
        title="Reported Speech",
        level="B2",
        category="Reported Speech",
        summary="Report what someone said without quoting them directly.",
        explanation='When reporting speech, the tense usually shifts back (**backshift**):\\n\\n| Direct | Reported |\\n|--------|----------|\\n| "I am tired." | She said she was tired. |\\n| "I worked." | He said he had worked. |\\n| "I will go." | She said she would go. |\\n| "I can help." | He said he could help. |\\n\\nTime and place words also change: *today → that day, here → there, yesterday → the day before.*',
        rules=[
            'Say vs tell: "She said (that)..." / "She told me (that)..."',
            "Backshift: present → past, past → past perfect, will → would.",
            'Questions in reported speech use normal word order (no inversion): "She asked where I lived."',
        ],
        examples=[
            GrammarExample(text='"I love this city." → She said she loved that city.'),
            GrammarExample(text='"Will you come?" → He asked if I would come.'),
            GrammarExample(text='"Where do you work?" → She asked where I worked.'),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="She told that she was tired.",
                correct="She said that she was tired. / She told me that she was tired.",
                note='"Tell" needs an object (me/him/her).',
            ),
        ],
        related=["past-perfect", "modal-verbs"],
    ),
    GrammarTopic(
        slug="past-perfect",
        title="Past Perfect",
        level="B2",
        category="Tenses",
        summary="Express the earlier of two past events.",
        explanation="The **past perfect** is used for an action that happened **before** another past action.\\n\\n*When I arrived, she had already left.*\\n(First she left — then I arrived.)\\n\\nOften used with: already, just, never, before, by the time, when.",
        structure="Subject + had + past participle",
        rules=[
            "Had + past participle for all subjects (no had/have split).",
            "Only use past perfect when you need to show which event happened first.",
            'If the sequence is clear from context or "before/after", simple past is often fine.',
        ],
        examples=[
            GrammarExample(text="I had never eaten Thai food before I visited Bangkok."),
            GrammarExample(text="By the time she called, he had already left."),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="When I arrived, she already left.",
                correct="When I arrived, she had already left.",
                note="Use past perfect for the earlier action.",
            ),
        ],
        related=["present-perfect", "third-conditional", "reported-speech"],
    ),
    GrammarTopic(
        slug="wishes-regrets",
        title="Wishes & Regrets (Advanced) — Wish + Would/Could & Nuance",
        level="B2",
        category="Conditionals",
        summary="Deepen your use of wish and if only: wish + would for complaints, wish + could for ability, and the emotional register of regret.",
        explanation="Building on the B1 introduction, this topic covers the more nuanced uses of **wish**:\n\n**Wish + would** — expressing annoyance at someone else's behavior or wanting a change:\n- *I wish you would stop interrupting me.* (complaint about behavior)\n- *I wish the government would do something about it.* (desire for change)\n\n**Note — wish + would vs wish + could:**\n- *I wish I could drive.* → regret about your own **ability** (I can't drive)\n- *I wish you would drive.* → you **want someone else** to do something\n- ✗ *I wish I would drive* — you cannot use 'wish + would' for your own actions\n\n**Wish + could have** — past ability regret:\n- *I wish I could have attended the ceremony.* (it wasn't possible)\n\n**If only — intensifying the emotion:**\n'If only' carries stronger emotional weight, common in informal American speech and literature:\n- *If only I had known sooner!*\n- *If only she hadn't left so early!*\n\n**Connection to mixed conditionals:**\nWish structures mirror conditional logic:\n- *I wish I had studied medicine.* ≈ *If I had studied medicine, I would be a doctor now.*",
        structure="wish + would (other's behavior) · wish + could (ability regret) · if only + past perfect (emphatic)",
        rules=[
            "Wish + would → annoyance at someone else's behavior or desire for external change.",
            "Wish + could → regret about your own lack of ability (present or past).",
            "Never use 'wish + would' for your own actions: ✗ 'I wish I would go.' → ✓ 'I wish I could go.'",
            "'If only' is more emphatic and emotional than 'I wish'.",
            "Wish + past perfect = same as third conditional: regret about a past action that didn't happen.",
        ],
        examples=[
            GrammarExample(
                text="I wish you would put your phone away during dinner.",
                note="wish + would — annoyance at behavior",
            ),
            GrammarExample(
                text="I wish I could speak Japanese.",
                note="wish + could — ability regret",
            ),
            GrammarExample(
                text="I wish I hadn't eaten so much.",
                note="past regret — same as B1 but more nuanced",
            ),
            GrammarExample(
                text="If only we had left earlier — we'd have avoided the traffic.",
                note="if only + past perfect — emphatic",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="I wish I would study harder.",
                correct="I wish I studied harder. (or) I wish I could study harder.",
                note="Don't use 'wish + would' for your own actions. Use past simple or 'wish + could'.",
            ),
            GrammarMistake(
                wrong="I wish I studied harder yesterday.",
                correct="I wish I had studied harder yesterday.",
                note="For past regrets, use past perfect after 'wish', not past simple.",
            ),
        ],
        related=["wish-if-only", "second-conditional", "third-conditional", "mixed-conditionals"],
    ),
    GrammarTopic(
        slug="advanced-passive",
        title="Advanced Passive: Causative Have/Get & Passive Infinitives",
        level="B2",
        category="Passive Voice",
        summary="Use have/get + object + past participle to describe services done for you, and passive infinitives after want, hope, expect.",
        explanation="**Causative have/get**: say that someone else performs an action for you (usually a service).\n\n*I had my car repaired.* (Someone repaired it for me.)\n*She got her hair cut at the salon.*\n\n**Structure:** have/get + object + past participle\n\n- *I'm having the apartment repainted.* (currently in progress)\n- *Can you get this document printed?*\n\n**Have vs. Get:**\n- *Have* is slightly more formal.\n- *Get* is more informal and common in everyday American English.\n\n**Passive infinitives**: used after verbs like want, hope, expect, like, need:\n- *He wants to be promoted.*\n- *She hoped to be chosen for the role.*\n- *The results are expected to be announced tomorrow.*\n\n**Note on modal passives:** For combining modals with the passive (*must be done, should be submitted, can be downloaded*), see the topic *Passive Voice with Modal Verbs*.",
        structure="have/get + object + past participle · to be + past participle (passive infinitive)",
        rules=[
            "Causative: have/get + object + past participle.",
            'The object comes BETWEEN the verb and the past participle: "I had my car repaired" (not "I had repaired my car").',
            '"Get" is more informal than "have" in causative structures.',
            "Passive infinitives: to be + past participle, used after want, hope, expect, need, like.",
        ],
        examples=[
            GrammarExample(text="We had the office repainted last month.", note="causative have"),
            GrammarExample(
                text="She got her phone fixed for free.", note="causative get (informal)"
            ),
            GrammarExample(
                text="He wants to be considered for the promotion.", note="passive infinitive"
            ),
            GrammarExample(
                text="The contract is expected to be signed by the end of the week.",
                note="passive infinitive (formal)",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="I had repaired my car.",
                correct="I had my car repaired.",
                note='In causative "have", the object comes before the past participle.',
            ),
            GrammarMistake(
                wrong="She wants be promoted.",
                correct="She wants to be promoted.",
                note="Passive infinitives need 'to be', not just 'be'.",
            ),
        ],
        related=["passive-voice-simple", "passive-modals", "gerunds-infinitives"],
    ),
    GrammarTopic(
        slug="gerunds-infinitives",
        title="Gerunds & Infinitives",
        level="B2",
        category="Verb Forms",
        summary="Know which verbs take a gerund (-ing) or an infinitive (to + verb).",
        explanation="Some verbs are followed by a **gerund** (-ing), others by an **infinitive** (to + base verb), and some take both.\\n\\n**Gerund only** (enjoy, avoid, consider, deny, finish, mind, miss, suggest, admit, risk):\\n*She enjoys reading. / He avoided speaking to her.*\\n\\n**Infinitive only** (want, decide, plan, promise, manage, refuse, hope, agree):\\n*They decided to leave. / She refused to answer.*\\n\\n**Both — different meaning**:\\n- *remember doing* (past action) vs *remember to do* (future obligation)\\n- *stop doing* (end an activity) vs *stop to do* (pause in order to)\\n- *try doing* (experiment) vs *try to do* (attempt)",
        structure="Verb + gerund (enjoy doing) · Verb + infinitive (want to do)",
        rules=[
            "Verbs like enjoy, avoid, finish, deny → gerund.",
            "Verbs like want, decide, plan, manage, refuse → infinitive.",
            'Prepositions are always followed by a gerund: "interested in doing".',
            'After "make" and "let": bare infinitive (no "to"): "She made me laugh."',
            'Gerund as subject: "Swimming is healthy."',
        ],
        examples=[
            GrammarExample(text="I enjoy cooking on the weekend.", note="gerund after enjoy"),
            GrammarExample(text="She decided to study medicine.", note="infinitive after decide"),
            GrammarExample(
                text="I remember locking the door.",
                note="remember + gerund = it happened in the past",
            ),
            GrammarExample(
                text="Remember to lock the door!", note="remember + infinitive = future action"
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="I enjoy to cook.",
                correct="I enjoy cooking.",
                note='"Enjoy" always takes a gerund.',
            ),
            GrammarMistake(
                wrong="She suggested to leave early.",
                correct="She suggested leaving early.",
                note='"Suggest" takes a gerund, not an infinitive.',
            ),
        ],
        related=["present-continuous", "modal-verbs"],
    ),
    GrammarTopic(
        slug="modal-perfects",
        title="Modal Perfects (Past Modals)",
        level="B2",
        category="Modals",
        summary="Talk about past deductions, obligations, and missed opportunities.",
        explanation="**Modal perfects** use *modal + have + past participle* to speculate about, criticize, or deduce past events.\\n\\n| Form | Meaning | Example |\\n|------|---------|----------|\\n| must have | past deduction (certain) | *She must have left already.* |\\n| can't have | past deduction (impossible) | *He can't have done it.* |\\n| could have | past possibility (but didn't) | *I could have helped you.* |\\n| should have | past obligation not fulfilled | *You should have called.* |\\n| might have | past possibility (uncertain) | *She might have forgotten.* |",
        structure="Modal + have + past participle",
        rules=[
            'Structure: modal + have + past participle (never "of").',
            '"Must have" = almost certain it happened.',
            '"Can\'t have" = almost certain it did not happen.',
            '"Should have / shouldn\'t have" = criticism or regret about the past.',
            '"Could have" = opportunity existed but was not taken.',
        ],
        examples=[
            GrammarExample(
                text="She must have taken the wrong train.", note="past deduction — almost certain"
            ),
            GrammarExample(
                text="He can't have known about it.",
                note="past deduction — certain it did not happen",
            ),
            GrammarExample(text="I should have left earlier — sorry I'm late.", note="past regret"),
            GrammarExample(
                text="You could have called me!", note="missed opportunity / mild reproach"
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="She should of called.",
                correct="She should have called.",
                note='"Should of" is a spelling error. Always write "should have".',
            ),
            GrammarMistake(
                wrong="He must have be there.",
                correct="He must have been there.",
                note='The past participle of "be" is "been".',
            ),
        ],
        related=["modal-verbs", "past-perfect", "wishes-regrets"],
    ),
    GrammarTopic(
        slug="concession-contrast-b2",
        title="Concession & Contrast (B2)",
        level="B2",
        category="Advanced",
        summary="Express nuanced ideas using concession and contrast structures.",
        explanation="**Concession** acknowledges an opposing point before introducing your main argument.\\n\\n| Structure | Usage | Example |\\n|-----------|-------|---------|\\n| Although / Even though | + clause | *Although it was expensive, it was worth it.* |\\n| Despite / In spite of | + noun or gerund | *Despite the rain, we continued.* |\\n| However / Nevertheless | starts new sentence | *It was expensive. However, it was worth it.* |\\n| Whereas / While | contrasts two facts | *Whereas she is outgoing, he is shy.* |",
        rules=[
            '"Although/even though" connect two clauses in one sentence.',
            '"Despite/in spite of" are followed by a noun or -ing form, never a full clause.',
            '"However" starts a new clause; place a comma directly after it.',
            '"Whereas" contrasts two equal and opposite facts.',
            '"Nevertheless" is more formal and emphatic than "however".',
        ],
        examples=[
            GrammarExample(
                text="Even though the exam was difficult, most students passed.",
                note='"even though" + clause',
            ),
            GrammarExample(
                text="Despite studying hard, she failed the test.", note='"despite" + gerund'
            ),
            GrammarExample(
                text="The project was expensive. Nevertheless, it was approved.",
                note="formal contrast",
            ),
            GrammarExample(
                text="Whereas the north is industrial, the south is agricultural.",
                note='"whereas" for equal contrast',
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Despite it was raining, we went out.",
                correct="Despite the rain, we went out.",
                note='"Despite" cannot be followed by a subject + verb clause.',
            ),
            GrammarMistake(
                wrong="However it was cold, we enjoyed it.",
                correct="Although it was cold, we enjoyed it.",
                note='"However" cannot join two clauses directly like a conjunction.',
            ),
        ],
        related=["discourse-connectors-b1", "discourse-markers", "expressing-opinions"],
    ),
    GrammarTopic(
        slug="mixed-conditionals",
        title="Mixed Conditionals",
        level="C1",
        category="Conditionals",
        summary="Combine different time frames in one conditional sentence.",
        explanation="**Mixed conditionals** blend the second and third conditional to connect different time frames.\\n\\n**Past condition → present result** (most common):\\n*If I had studied medicine, I would be a doctor now.*\\n(I didn't study medicine in the past → I'm not a doctor now.)\\n\\n**Present condition → past result**:\\n*If she weren't so stubborn, she would have apologized.*\\n(She is stubborn → she didn't apologize in the past.)",
        rules=[
            "Past → present: If + past perfect, would + base verb.",
            "Present → past: If + past simple, would have + past participle.",
            "The key is that the time frames differ between the two clauses.",
        ],
        examples=[
            GrammarExample(text="If I had taken that job, I would be living in Tokyo now."),
            GrammarExample(text="If you weren't so afraid of flying, you would have come with us."),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="If I would have taken that job, I would be living in Seattle now.",
                correct="If I had taken that job, I would be living in Seattle now.",
                note="The if-clause uses past perfect (had taken), never 'would have' — even in mixed conditionals.",
            ),
            GrammarMistake(
                wrong="If she wasn't so stubborn, she would have apologized.",
                correct="If she weren't so stubborn, she would have apologized.",
                note="In formal English, use 'were' (not 'was') for all subjects in hypothetical clauses.",
            ),
        ],
        related=["second-conditional", "third-conditional"],
    ),
    GrammarTopic(
        slug="inversion",
        title="Inversion",
        level="C1",
        category="Advanced",
        summary="Place the auxiliary before the subject for emphasis or formality.",
        explanation='**Inversion** reverses the usual subject-verb order. It is used:\\n\\n1. After negative/restrictive adverbs at the start of a sentence:\\n*Never have I seen such a mess.*\\n*Not only did she arrive late, but she also forgot her notes.*\\n\\n2. After "so/such... that" structures:\\n*So tired was he that he fell asleep immediately.*\\n\\n3. In formal conditionals (replacing if):\\n*Had I known, I would have acted differently.* (= If I had known...)',
        rules=[
            "After negative adverbials: auxiliary + subject + main verb.",
            "If there is no auxiliary, use do/does/did.",
            "Inversion is formal; rarely used in everyday conversation.",
        ],
        examples=[
            GrammarExample(text="Rarely does she make mistakes."),
            GrammarExample(text="Not until he read the letter did he understand."),
            GrammarExample(
                text="Should you need help, please contact us.", note="formal conditional"
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Never I have seen this.",
                correct="Never have I seen this.",
                note="The auxiliary must come before the subject.",
            ),
        ],
        related=["mixed-conditionals", "cleft-sentences"],
    ),
    GrammarTopic(
        slug="cleft-sentences",
        title="Cleft Sentences",
        level="C1",
        category="Advanced",
        summary="Emphasise a particular part of a sentence.",
        explanation="**It-cleft**: emphasise almost any part of a sentence.\\n*It was John who broke the window.*\\n(Focus: John — not someone else.)\\n\\n**Wh-cleft (pseudo-cleft)**: especially for actions.\\n*What I need is a long vacation.*\\n*What surprised me was his attitude.*",
        rules=[
            '"It is/was + focus + relative clause" is the it-cleft structure.',
            "Use who for people, that/which for things.",
            "Wh-clefts start with what/where/when/why.",
        ],
        examples=[
            GrammarExample(text="It was the noise that woke me up."),
            GrammarExample(text="What bothers me is his attitude."),
            GrammarExample(text="It's honesty that I admire most in people."),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="It was the noise which woke me up.",
                correct="It was the noise that woke me up.",
                note='"That" is preferred (not "which") in it-cleft sentences.',
            ),
        ],
        related=["inversion", "relative-clauses"],
    ),
    GrammarTopic(
        slug="participle-clauses",
        title="Participle Clauses",
        level="C1",
        category="Advanced",
        summary="Use -ing and -ed participial phrases to replace subordinate clauses concisely.",
        explanation="Participle clauses reduce subordinate clauses for concise, formal writing.\\n\\n**-ing clause** (active; simultaneous or causal):\\n*Turning the corner, she saw the building.* (= As she turned...)\\n\\n**-ed clause** (passive meaning):\\n*Surrounded by trees, the house was hard to find.* (= Because it was surrounded...)\\n\\n**Having + past participle** (completed prior action):\\n*Having finished the report, he went home.* (= After he had finished...)",
        structure="-ing clause (active) · -ed clause (passive) · Having + past participle",
        rules=[
            "The subject of the participle clause must be the same as the main clause subject.",
            "-ing clause expresses an active, simultaneous, or causal action.",
            "-ed clause expresses a passive or completed state.",
            '"Having + past participle" shows the action completed before the main verb.',
            "Dangling participles (different subjects) are a serious error.",
        ],
        examples=[
            GrammarExample(
                text="Walking to work, she noticed a new café had opened.",
                note="-ing clause (simultaneous)",
            ),
            GrammarExample(
                text="Shocked by the news, he sat down in silence.",
                note="-ed clause (passive state)",
            ),
            GrammarExample(
                text="Having read the contract, she signed it.",
                note="having + past participle (prior action)",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Walking home, it started to rain.",
                correct="Walking home, she got caught in the rain.",
                note="The subject of the participle must match the main clause subject.",
            ),
        ],
        related=["relative-clauses", "advanced-relative-clauses", "gerunds-infinitives"],
    ),
    GrammarTopic(
        slug="hedging-language",
        title="Hedging Language",
        level="C1",
        category="Advanced",
        summary="Express claims tentatively to avoid overgeneralization in academic and professional contexts.",
        explanation="**Hedging** indicates caution, uncertainty, or a limited claim. Essential in academic writing.\\n\\n**Modal verbs**: *may, might, could, would*\\n*This may suggest that...*\\n\\n**Epistemic phrases**: *It seems that... / It appears that... / It is possible that...*\\n\\n**Limiting adverbs**: *generally, largely, typically, to some extent, in most cases*\\n\\n**Passive + reporting verb**: *It has been argued that... / It is widely believed that...*",
        rules=[
            "Use hedging to avoid absolute claims in academic writing.",
            '"May/might/could" reduce the certainty of a statement.',
            '"Tend to" hedges generalizations: "Learners tend to overuse..."',
            '"Arguably" signals a debatable claim without full commitment.',
            "Do not hedge factual statements where certainty is appropriate.",
        ],
        examples=[
            GrammarExample(
                text="The results may suggest a correlation between the two variables.",
                note='"may" hedges the interpretation',
            ),
            GrammarExample(
                text="It appears that the policy has had limited impact.",
                note='"it appears" avoids overclaiming',
            ),
            GrammarExample(
                text="This approach tends to be more effective in formal contexts.",
                note='"tends to" limits the generalization',
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="The results prove that X causes Y.",
                correct="The results suggest that X may cause Y.",
                note='"Prove" overclaims in research contexts. Hedge with "suggest" + modal.',
            ),
        ],
        related=["expressing-opinions", "modal-perfects", "discourse-markers"],
    ),
    GrammarTopic(
        slug="ellipsis-substitution",
        title="Ellipsis & Substitution",
        level="C1",
        category="Advanced",
        summary="Avoid repetition by omitting (ellipsis) or replacing (substitution) recoverable elements.",
        explanation="These devices create natural, cohesive text by reducing unnecessary repetition.\\n\\n**Ellipsis**: omitting words understood from context.\\n*She can play piano and he can too.* (= and he can play piano too.)\\n\\n**Substitution**: replacing a word or clause with a pro-form.\\n- **so** (clausal, positive): *I think so.*\\n- **not** (clausal, negative): *I hope not.*\\n- **do so** (formal verb-phrase substitute): *She promised to help and she did so.*\\n- **one/ones** (noun substitute): *Which one do you prefer?*",
        rules=[
            "Ellipsis omits recoverable information to avoid repetition.",
            '"So/not" substitute a whole clause after: think, hope, believe, expect, say.',
            '"Do so" is a formal substitute for a repeated verb phrase.',
            '"One/ones" substitute countable nouns.',
            "Do not omit information that would cause ambiguity.",
        ],
        examples=[
            GrammarExample(
                text="I have read the report and you should too.",
                note="ellipsis of repeated verb phrase",
            ),
            GrammarExample(
                text="Will it rain? I hope not.",
                note='"not" substitutes the full clause negatively',
            ),
            GrammarExample(
                text="He was asked to submit the form and he did so promptly.",
                note='"did so" = submitted the form',
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="I think so it will work.",
                correct="I think so.",
                note='"So" replaces the whole clause — do not add extra pronouns.',
            ),
        ],
        related=["discourse-markers", "cleft-sentences"],
    ),
    GrammarTopic(
        slug="advanced-relative-clauses",
        title="Advanced Relative Clauses",
        level="C1",
        category="Advanced",
        summary="Use preposition + which/whom, whereby, and reduced relative clauses for formal precision.",
        explanation="At C1, relative clauses extend beyond basic who/which/that.\\n\\n**Preposition + which/whom** (formal):\\n*The policy, about which much has been written, was controversial.*\\n*The person to whom I spoke was very helpful.*\\n\\n**Whereby / wherein** (formal connectors):\\n*A system whereby users can opt out.* (= by which)\\n\\n**Reduced relative clauses** (drop who/which is/are):\\n*The man sitting in the corner is my colleague.* (= who is sitting)\\n*The report published last year was influential.* (= which was published)",
        rules=[
            'Formal English places the preposition before "which/whom", not at the end.',
            '"Whereby" = by which (used with systems, methods, agreements).',
            '"Whom" (not "who") follows prepositions.',
            'Reduced relatives: drop "who/which is/are" and keep the participle or adjective.',
            "Non-defining clauses require commas; defining clauses do not.",
        ],
        examples=[
            GrammarExample(
                text="The contract, under which both parties agreed, was signed in 2023.",
                note="preposition + which",
            ),
            GrammarExample(
                text="The process whereby data is collected must be transparent.",
                note='"whereby" = by which',
            ),
            GrammarExample(
                text="The documents required for the application must be certified.",
                note="reduced relative",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="The person which I spoke to was helpful.",
                correct="The person to whom I spoke was helpful.",
                note='Use "whom" (not "which") for people in formal relative clauses.',
            ),
        ],
        related=["relative-clauses", "participle-clauses", "cleft-sentences"],
    ),
    GrammarTopic(
        slug="discourse-markers",
        title="Discourse Markers",
        level="C2",
        category="Advanced",
        summary="Words and phrases that structure and connect ideas in speech and writing.",
        explanation="Discourse markers signal the relationship between ideas.\\n\\n| Function | Examples |\\n|----------|----------|\\n| Adding | furthermore, in addition, what is more |\\n| Contrasting | nevertheless, however, that said, even so |\\n| Conceding | admittedly, granted, to be fair |\\n| Exemplifying | namely, in particular, to illustrate |\\n| Concluding | ultimately, in short, to sum up |\\n| Hedging | arguably, to some extent, it could be said that |",
        rules=[
            "Discourse markers are not interchangeable — each has a specific logical role.",
            "Overuse makes text sound mechanical; use them selectively.",
            "Formal markers (furthermore, nevertheless) are appropriate in essays, not chat.",
        ],
        examples=[
            GrammarExample(text="The plan has merits; nevertheless, the cost is prohibitive."),
            GrammarExample(
                text="Admittedly, the research is limited, but the findings are promising."
            ),
            GrammarExample(
                text="To sum up, climate action requires political will, not just technology."
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="However I agree with you.",
                correct="However, I agree with you.",
                note="Discourse markers at the start of a clause are followed by a comma.",
            ),
        ],
        related=["inversion", "advanced-passive"],
    ),
    GrammarTopic(
        slug="nominalization",
        title="Nominalization",
        level="C2",
        category="Advanced",
        summary="Turn verbs and adjectives into nouns to create a formal, dense style.",
        explanation="**Nominalisation** converts verbs or adjectives into nouns:\\n\\n- *decide* → *decision* (*The decision was made...* instead of *They decided...*)\\n- *fail* → *failure*\\n- *significant* → *significance*\\n\\nCommon in academic, legal, and business English. It creates distance, formality, and allows complex ideas to become the subject of the sentence.",
        rules=[
            "Common suffixes: -tion/-sion, -ment, -ance/-ence, -ity, -ness.",
            "Do not overuse it in spoken English — it sounds unnatural.",
            "Nominalisation can make writing feel impersonal and abstract.",
        ],
        examples=[
            GrammarExample(text="The implementation of the strategy proved difficult."),
            GrammarExample(text="There was a significant improvement in results."),
            GrammarExample(
                text="His failure to respond caused confusion.",
                note="failure = he failed; confusion = people were confused",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="We decided to do a nominalization of the process.",
                correct="We decided to nominalize the process. (or) We described the nominalization of the process.",
                note="'Nominalization' is a noun — you cannot 'do a nominalization'. Use the verb 'nominalize' or restructure.",
            ),
        ],
        related=["discourse-markers", "advanced-passive"],
    ),
    GrammarTopic(
        slug="fronting-emphasis",
        title="Fronting for Emphasis",
        level="C2",
        category="Advanced",
        summary="Move a sentence element to the front position to create emphasis or contrast.",
        explanation="**Fronting** places a non-subject element at the start of the sentence for rhetorical effect.\\n\\n**Object fronting**:\\n*This I cannot accept.* (= I cannot accept this.)\\n\\n**Adjective fronting + concession**:\\n*Remarkable as it may seem, she refused.*\\n\\n**Place/direction adverbial fronting** (often triggers inversion):\\n*On the table lay a single letter.*\\n*Down the stairs came the children.*\\n\\nFronting signals contrast, emphasis, and literary voice.",
        rules=[
            "Object fronting: move the object to the front for contrast or emphasis.",
            'Fronted concession: "adjective/adverb as + clause".',
            "After fronted place/direction adverbials, inversion is common.",
            "Use fronting for rhetorical effect, not as a default structure.",
            '"Rarely/never/seldom" + inversion is a subset of adverbial fronting.',
        ],
        examples=[
            GrammarExample(
                text="This kind of behavior I will not tolerate.",
                note="object fronting for emphasis",
            ),
            GrammarExample(
                text="Strange as it may seem, she felt relieved.",
                note="fronted adjective + concession",
            ),
            GrammarExample(
                text="Outside the door stood a tall figure.", note="place adverbial + inversion"
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Strange as it may seem, she was very feeling relieved.",
                correct="Strange as it may seem, she felt relieved.",
                note="Keep verb forms crisp in formal/literary style.",
            ),
        ],
        related=["inversion", "cleft-sentences", "discourse-markers"],
    ),
    GrammarTopic(
        slug="register-and-style",
        title="Register & Stylistic Variation",
        level="C2",
        category="Advanced",
        summary="Make conscious choices of formality, voice, and tone to suit any audience and purpose.",
        explanation="**Register** is the level of formality; **style** covers vocabulary, syntax, and rhythm.\\n\\n**Formal register**: Latinate vocabulary, passive voice, nominalization, no contractions, complex sentences, hedged claims.\\n\\n**Neutral/semi-formal**: mixed vocabulary, active and passive, moderate sentence complexity.\\n\\n**Informal register**: phrasal verbs, idioms, contractions, direct address, simple syntax.\\n\\nA C2 writer switches register deliberately: academic argument, professional correspondence, narrative prose, and persuasive rhetoric each require distinct stylistic choices.",
        rules=[
            "Match register to purpose: academic, professional, journalistic, creative, conversational.",
            "Formal: long noun phrases, passive, nominalization, no contractions.",
            "Informal: phrasal verbs, contractions, direct address.",
            "Avoid register mixing (formal structure + informal slang).",
            "Stylistic choices convey authority, stance, and voice.",
        ],
        examples=[
            GrammarExample(
                text="The implementation of the policy was met with considerable resistance.",
                note="formal — nominalization + passive",
            ),
            GrammarExample(
                text="The policy didn't go down well at all.",
                note="informal — phrasal verb + contraction",
            ),
            GrammarExample(
                text="We regret to inform you that your application was unsuccessful.",
                note="professional — hedged, impersonal",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="We'd like to let you know your app didn't make it. (formal business email)",
                correct="We regret to inform you that your application was unsuccessful.",
                note="Business correspondence requires formal register.",
            ),
        ],
        related=["nominalization", "advanced-passive", "fronting-emphasis", "discourse-markers"],
    ),
]
