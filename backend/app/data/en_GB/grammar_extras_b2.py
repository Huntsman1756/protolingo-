"""English grammar topics — B2 additional."""

from app.data._types import GrammarExample, GrammarMistake, GrammarTopic

B2_GRAMMAR_TOPICS: list[GrammarTopic] = [
    GrammarTopic(
        slug="past-perfect-continuous",
        title="Past Perfect Continuous",
        level="B2",
        category="Tenses",
        summary="Emphasise the duration of an action that was in progress before another past event.",
        structure="Subject + had + been + verb-ing",
        explanation="The **past perfect continuous** emphasises how long an action had been happening before another point in the past:\n\n- *I had been waiting for an hour when she finally arrived.*\n- *They had been living there for ten years before they moved.*\n\nCompare with past perfect simple:\n- Past perfect continuous → focus on duration/process: *I had been studying all day, so I was exhausted.*\n- Past perfect simple → focus on completion/result: *I had studied the material, so I passed the exam.*",
        rules=[
            "Form: had + been + present participle (-ing).",
            "Use when emphasising the duration of a past action before another past event.",
            "Often used with 'for' + duration to show how long.",
            "Stative verbs are not used in continuous form.",
        ],
        examples=[
            GrammarExample(text="Her eyes were red because she had been crying."),
            GrammarExample(text="They had been travelling for months when they ran out of money."),
            GrammarExample(text="The ground was wet. It had been raining all night."),
            GrammarExample(text="I had been hoping to see her before she left.", note="past hope"),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="I had waiting for you since 3 pm.",
                correct="I had been waiting for you since 3 pm.",
                note="Past perfect continuous requires 'had been + -ing', not just 'had'.",
            ),
            GrammarMistake(
                wrong="I had been knowing her for years.",
                correct="I had known her for years.",
                note="Stative verbs like 'know' do not use continuous form.",
            ),
        ],
        related=["past-perfect", "past-continuous", "narrative-tenses"],
    ),
    GrammarTopic(
        slug="future-continuous",
        title="Future Continuous",
        level="B2",
        category="Tenses",
        summary="Describe actions that will be in progress at a specific time in the future.",
        structure="Subject + will + be + verb-ing",
        explanation="The **future continuous** describes an action that will be ongoing at a particular moment in the future:\n\n- *This time tomorrow, I will be flying to Paris.*\n- *Don't call at 8 — I will be having dinner.*\n\n**Uses:**\n1. Action in progress at a future time.\n2. Something that will happen as part of a normal routine: *I will be passing your office anyway.*\n3. Polite enquiries about plans: *Will you be using the car tonight?*",
        rules=[
            "Form: will + be + present participle (-ing).",
            "Use for actions that will be in progress at a specific future moment.",
            "Often used with future time markers: at this time tomorrow, at 8 pm, next week.",
            "More polite than 'will' alone for asking about plans.",
        ],
        examples=[
            GrammarExample(text="At 10 am tomorrow, I will be sitting in a meeting."),
            GrammarExample(text="This time next week, we will be lying on the beach."),
            GrammarExample(
                text="Will you be going to the party on Saturday?", note="polite enquiry"
            ),
            GrammarExample(text="I will be working late tonight, so don't wait up."),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Tomorrow at 5 I will worked.",
                correct="Tomorrow at 5 I will be working.",
                note="Future continuous needs 'will be + -ing', not past form.",
            ),
            GrammarMistake(
                wrong="I will sleeping when you arrive.",
                correct="I will be sleeping when you arrive.",
                note="Don't forget 'be' after 'will' in the continuous form.",
            ),
        ],
        related=["future-perfect", "present-continuous", "will-future"],
    ),
    GrammarTopic(
        slug="future-perfect",
        title="Future Perfect",
        level="B2",
        category="Tenses",
        summary="Talk about actions that will be completed before a specific time in the future.",
        structure="Subject + will + have + past participle",
        explanation="The **future perfect** describes an action that will be finished before a certain point in the future:\n\n- *By the end of this year, I will have saved enough money.*\n- *She will have finished the report by Monday.*\n\n**Time markers:** by + time, by the time, by then, before, in (duration)\n\nCompare future continuous vs. future perfect:\n- *At 6 pm I will be working.* (the action is in progress at that time)\n- *By 6 pm I will have finished.* (the action is completed before that time)",
        rules=[
            "Form: will + have + past participle.",
            "Used with 'by' + a future time to set a deadline.",
            "Describes completion before a future reference point.",
            "Can also be used to express certainty about a past event: 'You will have heard the news by now.'",
        ],
        examples=[
            GrammarExample(text="By 2030, we will have reduced emissions by 50%."),
            GrammarExample(text="I will have finished university by the time I turn 22."),
            GrammarExample(text="Don't worry — they will have arrived by now."),
            GrammarExample(text="In three years, she will have paid off her student loans."),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="By Friday I will finish the report.",
                correct="By Friday I will have finished the report.",
                note="With 'by + deadline', use future perfect, not future simple.",
            ),
            GrammarMistake(
                wrong="He will has completed the course.",
                correct="He will have completed the course.",
                note="Future perfect uses 'will have', never 'will has'.",
            ),
        ],
        related=["future-continuous", "future-perfect-continuous", "present-perfect"],
    ),
    GrammarTopic(
        slug="future-perfect-continuous",
        title="Future Perfect Continuous",
        level="B2",
        category="Tenses",
        summary="Emphasise the duration of an action that will be ongoing up to a future point.",
        structure="Subject + will + have + been + verb-ing",
        explanation="The **future perfect continuous** emphasises how long an action will have been in progress by a future time:\n\n- *By next month, I will have been working here for ten years.*\n- *When the marathon ends, she will have been running for over four hours.*\n\nIt combines the duration emphasis of continuous with the completion idea of perfect. This is a less common tense, used when duration really matters.",
        rules=[
            "Form: will + have + been + present participle (-ing).",
            "Use to emphasise the length of time an action will have been ongoing.",
            "Almost always used with 'for' + duration.",
            "Stative verbs are not used in continuous form.",
        ],
        examples=[
            GrammarExample(text="By June, I will have been studying English for five years."),
            GrammarExample(text="When we land, we will have been flying for twelve hours."),
            GrammarExample(
                text="She will have been waiting for over an hour by the time you arrive."
            ),
            GrammarExample(text="Next week, they will have been living here for a decade."),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="By next year I will have worked here for 20 years.",
                correct="By next year I will have been working here for 20 years.",
                note="Use the continuous form to emphasise duration.",
            ),
            GrammarMistake(
                wrong="I will have been knowing him for 30 years.",
                correct="I will have known him for 30 years.",
                note="Stative verbs like 'know' do not use continuous form.",
            ),
        ],
        related=["future-perfect", "past-perfect-continuous", "present-perfect-continuous"],
    ),
    GrammarTopic(
        slug="future-in-the-past",
        title="Future in the Past",
        level="B2",
        category="Tenses",
        summary="Express actions that were in the future from a past perspective.",
        structure="was/were + going to / was/were + about to / would + base verb",
        explanation="Future in the past describes something that was expected to happen (but may or may not have happened). It is commonly used in reported speech and narrative:\n\n**was/were going to** — intentions:\n- *I was going to call you, but I forgot.*\n\n**was/were about to** — immediate future in the past:\n- *I was about to leave when the phone rang.*\n\n**would** — future from a past perspective (often in reported speech):\n- *She said she would arrive by noon.*",
        rules=[
            "Use 'was/were going to' for past intentions (often unfulfilled).",
            "Use 'was/were about to' for something that was imminent.",
            "Use 'would' in reported speech for future from a past perspective.",
            "Common in storytelling and narratives to show what was about to happen.",
        ],
        examples=[
            GrammarExample(text="I was going to cook dinner, but we decided to eat out instead."),
            GrammarExample(text="She was about to leave when the doorbell rang."),
            GrammarExample(
                text="He promised he would call me the next day.", note="reported speech"
            ),
            GrammarExample(text="Little did I know what was going to happen next."),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="I was going to called you.",
                correct="I was going to call you.",
                note="After 'going to', always use the base verb.",
            ),
            GrammarMistake(
                wrong="I about was to go.",
                correct="I was about to go.",
                note="Word order: was/were + about to, not 'about was to'.",
            ),
        ],
        related=["going-to-future", "past-continuous", "reported-speech"],
    ),
    GrammarTopic(
        slug="narrative-tenses",
        title="Narrative Tenses",
        level="B2",
        category="Tenses",
        summary="Combine past simple, past continuous, and past perfect to tell stories effectively.",
        explanation="In storytelling, three past tenses work together:\n\n**Past simple** — the main events in sequence:\n*I woke up, got dressed, and left the house.*\n\n**Past continuous** — the background scene, actions in progress:\n*The sun was shining and the birds were singing.*\n\n**Past perfect** — events that happened before the main story:\n*I had forgotten my keys, so I had to go back inside.*\n\n**Narrative structure:**\n1. Set the scene with past continuous.\n2. Tell the main events in past simple.\n3. Use past perfect for flashbacks or earlier events.",
        rules=[
            "Past simple: the main story events — what happened next.",
            "Past continuous: background and atmosphere — what was happening at the time.",
            "Past perfect: flashbacks — what had already happened.",
            "Vary the tenses to make storytelling more engaging and clear.",
        ],
        examples=[
            GrammarExample(
                text="The rain was pouring down. I had forgotten my umbrella, so I ran to the nearest caf\u00e9 and ordered a coffee.",
                note="background → flashback → main events",
            ),
            GrammarExample(
                text="By the time the police arrived, the thief had already escaped.",
                note="past perfect for earlier event",
            ),
            GrammarExample(
                text="She was walking home when she noticed someone following her.",
                note="past continuous interrupted by past simple",
            ),
            GrammarExample(
                text="I realised I had left my wallet at home, so I borrowed money from a friend.",
                note="past perfect flashback → past simple action",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="I was walking home, I saw a fox.",
                correct="I was walking home when I saw a fox.",
                note="Link the background (past continuous) and main event (past simple) with 'when'.",
            ),
            GrammarMistake(
                wrong="I went out after the rain was stopping.",
                correct="I went out after the rain had stopped.",
                note="Use past perfect for an event completed before another past event.",
            ),
        ],
        related=["past-simple", "past-continuous", "past-perfect", "past-perfect-continuous"],
    ),
    GrammarTopic(
        slug="need-gerund",
        title="Need + Gerund (The car needs washing)",
        level="B2",
        category="Verb Forms",
        summary="Use 'need + -ing' to express a passive meaning — something needs to be done.",
        structure="Subject + need(s) + verb-ing (passive meaning)",
        explanation="A special structure in English uses 'need + gerund (-ing)' with a passive meaning:\n\n- *The car needs washing.* = The car needs to be washed.\n- *The garden needs weeding.* = The garden needs to be weeded.\n- *Your hair needs cutting.* = Your hair needs to be cut.\n\nThis structure always has a passive sense — the subject receives the action, it doesn't do it. It is very common in everyday spoken English.\n\n**Note:** 'Need + infinitive' means the subject needs to do something: *I need to wash the car.*",
        rules=[
            "Need + gerund = passive meaning (something needs to be done to the subject).",
            "Need + infinitive = active meaning (the subject needs to do something).",
            "Only used with transitive verbs (verbs that take an object).",
            "Very common in British English for household tasks and repairs.",
        ],
        examples=[
            GrammarExample(
                text="The windows need cleaning — they are very dirty.",
                note="passive: need to be cleaned",
            ),
            GrammarExample(text="These clothes need ironing before the wedding."),
            GrammarExample(text="My bike needs fixing. The chain is broken."),
            GrammarExample(text="I need to fix my bike.", note="active: I will do it"),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="The floor needs to clean.",
                correct="The floor needs cleaning. (or) The floor needs to be cleaned.",
                note="Need + to + base verb is active. For passive, use need + -ing or need to be + participle.",
            ),
        ],
        related=["gerunds-infinitives", "passive-voice-simple", "imperatives"],
    ),
    GrammarTopic(
        slug="clauses-purpose-reason",
        title="Clauses of Purpose, Reason & Result",
        level="B2",
        category="Clauses",
        summary="Express why something happens (reason), what it is for (purpose), and what happens as a result.",
        explanation="**Purpose** (why you do something):\n- *to + infinitive: I went to the shop to buy milk.*\n- *in order to / so as to: She arrived early in order to get a good seat.*\n- *so that + clause: I left a note so that they would know where I was.*\n\n**Reason** (why something happens):\n- *because / since / as: I stayed home because it was raining.*\n- *because of / due to / owing to + noun: The match was cancelled due to bad weather.*\n\n**Result** (what happens as a consequence):\n- *so / therefore / as a result: It rained, so we stayed inside.*\n- *such...that / so...that: It was such a good book that I read it twice.*",
        rules=[
            "Use 'to + infinitive' for the most common purpose expressions.",
            "Use 'so that' + subject + modal (can/could/will/would) for purpose with a different subject.",
            "Use 'because of/due to' + noun phrase for reasons; 'because/since/as' + clause.",
            "With negative purpose, use 'so as not to' or 'in order not to', NOT 'to not'.",
        ],
        examples=[
            GrammarExample(
                text="I took a taxi so that I wouldn't be late.", note="purpose + different subject"
            ),
            GrammarExample(text="The flight was delayed due to thick fog.", note="reason"),
            GrammarExample(
                text="He spoke quietly so as not to wake the baby.", note="negative purpose"
            ),
            GrammarExample(
                text="The traffic was terrible; therefore, we missed the start.", note="result"
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="I went to the shop for to buy milk.",
                correct="I went to the shop to buy milk.",
                note="Use 'to + verb', not 'for to + verb', for purpose.",
            ),
            GrammarMistake(
                wrong="It was cancelled due to it rained.",
                correct="It was cancelled due to the rain. (or) because it rained.",
                note="After 'due to', use a noun phrase; after 'because', use a clause.",
            ),
        ],
        related=["so-such", "discourse-connectors-b1", "adverbial-clauses"],
    ),
    GrammarTopic(
        slug="passive-reporting-verbs",
        title="Passive with Reporting Verbs (It is said that..., He is believed to...)",
        level="B2",
        category="Passive Voice",
        summary="Use the passive to report what people say, think, or believe, especially in formal contexts.",
        structure="It + passive + that-clause · Subject + passive + to + infinitive",
        explanation="Passive reporting structures are common in news and formal writing when the source is unknown or unimportant:\n\n**Pattern 1: It + passive + that...**\n- *It is said that the company will close.*\n- *It is believed that the suspect has left the country.*\n\n**Pattern 2: Subject + passive + to + infinitive**\n- *The company is said to be closing.*\n- *The suspect is believed to have left the country.*\n\n**Common reporting verbs in passive:** say, think, believe, know, report, expect, consider, understand",
        rules=[
            "Pattern 1: 'It + passive reporting verb + that + clause'.",
            "Pattern 2: 'Subject + passive reporting verb + to + infinitive'.",
            "Pattern 2 is more formal and concise than Pattern 1.",
            "Use the perfect infinitive (to have + past participle) for past events: 'He is said to have left.'",
        ],
        examples=[
            GrammarExample(text="It is thought that the painting is worth over a million pounds."),
            GrammarExample(
                text="The painting is thought to be worth over a million pounds.",
                note="same meaning, pattern 2",
            ),
            GrammarExample(
                text="She is known to have helped many people during the crisis.",
                note="perfect infinitive",
            ),
            GrammarExample(text="The meeting is expected to last about two hours."),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="He is said that he is rich.",
                correct="It is said that he is rich. (or) He is said to be rich.",
                note="Don't mix both patterns in the same sentence.",
            ),
            GrammarMistake(
                wrong="The film is believed it is a masterpiece.",
                correct="The film is believed to be a masterpiece.",
                note="Pattern 2 doesn't need an extra clause.",
            ),
        ],
        related=["passive-voice-simple", "reported-speech", "advanced-passive"],
    ),
    GrammarTopic(
        slug="reported-speech-reporting-verbs",
        title="Reported Speech: Reporting Verbs (claim, insist, deny, admit)",
        level="B2",
        category="Reported Speech",
        summary="Go beyond 'say' and 'tell' — use a variety of reporting verbs with correct grammatical patterns.",
        explanation="Different reporting verbs require different grammatical structures:\n\n**Verb + that + clause:** *admit, agree, claim, complain, explain, insist, mention, promise, suggest*\n- *She admitted that she had made a mistake.*\n\n**Verb + object + to + infinitive:** *advise, encourage, invite, remind, tell, warn*\n- *He warned us not to drive in the snow.*\n\n**Verb + -ing:** *admit, deny, recommend, suggest*\n- *He denied stealing the money.*\n\n**Verb + preposition + -ing:** *apologise for, insist on, accuse of, blame for*\n- *She apologised for being late.*",
        rules=[
            "'Suggest' and 'recommend' can be followed by that + subject + base verb (subjunctive) or -ing.",
            "'Deny' is always followed by -ing, never by an infinitive.",
            "Different patterns change the meaning and formality of reported speech.",
            "Use a variety of reporting verbs to make writing more precise.",
        ],
        examples=[
            GrammarExample(text="He admitted that he had been wrong.", note="verb + that-clause"),
            GrammarExample(
                text="She suggested going earlier to avoid the traffic.", note="verb + -ing"
            ),
            GrammarExample(
                text="The doctor advised me to get more rest.", note="verb + object + to-infinitive"
            ),
            GrammarExample(
                text="He apologised for not calling sooner.", note="verb + preposition + -ing"
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="He suggested to go earlier.",
                correct="He suggested going earlier. (or) He suggested that we go earlier.",
                note="'Suggest' is followed by -ing or that-clause, never by 'to + infinitive'.",
            ),
            GrammarMistake(
                wrong="She denied to steal the money.",
                correct="She denied stealing the money.",
                note="'Deny' is always followed by -ing, never by an infinitive.",
            ),
        ],
        related=["reported-speech-basics", "reported-speech", "gerunds-infinitives"],
    ),
    GrammarTopic(
        slug="articles-specific-generic",
        title="Articles: Specific vs. Generic Reference",
        level="B2",
        category="Articles",
        summary="Distinguish between referring to a class in general and referring to a specific instance.",
        explanation="At B2, article choice depends on whether you are talking about something specific or something in general:\n\n**Generic reference** (talking about the whole class):\nThree ways — all correct but with different registers:\n1. Zero article + plural: *Tigers are endangered.* (most common)\n2. The + singular: *The tiger is endangered.* (formal/scientific)\n3. A + singular: *A tiger is a dangerous animal.* (definition)\n\n**Specific reference:**\n- *The tigers in this zoo look well cared for.*\n\n**Articles with abstract nouns:**\n- No article for general meaning: *Love is important.*\n- 'The' for specific instance: *The love she felt was overwhelming.*",
        rules=[
            "Generic: three patterns — zero + plural (neutral), 'the' + singular (formal), 'a' + singular (definition).",
            "Specific: use 'the' when both speaker and listener know which one.",
            "With abstract nouns: no article for general; 'the' for specific or defined.",
            "The three generic patterns are NOT interchangeable in all contexts.",
        ],
        examples=[
            GrammarExample(text="Whales are the largest mammals on Earth.", note="generic, plural"),
            GrammarExample(
                text="The whale is an endangered species.", note="generic, formal/scientific"
            ),
            GrammarExample(
                text="A whale can hold its breath for over an hour.", note="generic, definition"
            ),
            GrammarExample(text="The whales we saw in Iceland were magnificent.", note="specific"),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="The dogs are the most popular pets in the UK.",
                correct="Dogs are the most popular pets in the UK.",
                note="For a general statement, use no article with plural nouns.",
            ),
            GrammarMistake(
                wrong="A life is beautiful.",
                correct="Life is beautiful.",
                note="Abstract nouns used in a general sense take no article.",
            ),
        ],
        related=["articles", "articles-advanced-b1", "countable-uncountable"],
    ),
    GrammarTopic(
        slug="conditionals-without-if",
        title="Conditionals Without 'If' (Had I known, Should you need)",
        level="B2",
        category="Conditionals",
        summary="Form conditionals without 'if' by inverting subject and auxiliary — formal and elegant.",
        structure="Had/Should/Were + subject + (not) + past participle/base verb..., main clause",
        explanation="In formal English, conditionals can be formed without 'if' by inverting the subject and auxiliary verb. This is more concise and elegant:\n\n**Third conditional:**\n- *If I had known...* → *Had I known...*\n- *Had I known the truth, I would have acted differently.*\n\n**Second conditional:**\n- *If I were...* → *Were I...*\n- *Were I in your position, I would accept the offer.*\n\n**First conditional (formal):**\n- *If you should need...* → *Should you need...*\n- *Should you require assistance, please do not hesitate to ask.*",
        rules=[
            "Invert the auxiliary and subject, and drop 'if'.",
            "Most common in formal writing and formal speeches.",
            "Only works with 'had', 'were', and 'should' — not with other modals.",
            "The negative 'not' comes after the subject: 'Had I not seen it myself, I wouldn't have believed it.'",
        ],
        examples=[
            GrammarExample(text="Had I known about the traffic, I would have left earlier."),
            GrammarExample(text="Were she to win the prize, she would donate it to charity."),
            GrammarExample(
                text="Should you have any questions, please contact our support team.",
                note="formal business",
            ),
            GrammarExample(text="Had it not been for her help, I would have failed."),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="If I would have known, I would have come.",
                correct="Had I known, I would have come.",
                note="Use either 'if + had' or 'had + subject', not 'if + would'.",
            ),
            GrammarMistake(
                wrong="Should you to need help...",
                correct="Should you need help...",
                note="After 'should', use the base verb — no 'to'.",
            ),
        ],
        related=["second-conditional", "third-conditional", "mixed-conditionals"],
    ),
    GrammarTopic(
        slug="unreal-past",
        title="Unreal Past (I'd rather, It's time, As if/though)",
        level="B2",
        category="Conditionals",
        summary="Use past tenses to talk about hypothetical, desired, or imagined present/future situations.",
        explanation="Several expressions use a past tense form to refer to an unreal present or future:\n\n**I'd rather + subject + past simple** — preference for a different reality:\n- *I'd rather you didn't smoke in here.* (present/future wish)\n- *I'd rather she arrived earlier tomorrow.* (future preference)\n\n**It's (high/about) time + subject + past simple** — something should already be happening:\n- *It's time we left.* / *It's about time you started studying.*\n\n**As if / as though + past simple/past perfect** — an apparent but untrue situation:\n- *He talks as if he knew everything.* (but he doesn't)\n- *She looks as though she had seen a ghost.* (past unreal)",
        rules=[
            "'I'd rather' + subject + past simple = present/future preference.",
            "'It's time' + subject + past simple = something should happen now.",
            "'As if/though' + past = situation appears true but is probably not.",
            "All these structures express unreality — the situation is not actually true.",
        ],
        examples=[
            GrammarExample(text="I'd rather you told me the truth."),
            GrammarExample(text="It's high time we started thinking about the future."),
            GrammarExample(text="He acts as if he owned the place.", note="but he doesn't"),
            GrammarExample(text="She looked as though she hadn't slept for days."),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="I'd rather you to go.",
                correct="I'd rather you went.",
                note="After 'I'd rather + subject', use the past simple, not an infinitive.",
            ),
            GrammarMistake(
                wrong="It's time we go.",
                correct="It's time we went.",
                note="After 'It's time', use past simple, not present.",
            ),
        ],
        related=["wish-if-only", "second-conditional", "wishes-regrets"],
    ),
    GrammarTopic(
        slug="adverbial-clauses",
        title="Adverbial Clauses (time, place, manner, reason)",
        level="B2",
        category="Clauses",
        summary="Use adverbial clauses to add information about time, place, manner, and reason to sentences.",
        explanation="Adverbial clauses function as adverbs — they modify the main clause:\n\n**Time:** *when, while, as, before, after, until, as soon as, once, whenever, by the time*\n- *Call me when you arrive.*\n\n**Place:** *where, wherever, anywhere, everywhere*\n- *Sit wherever you like.*\n\n**Manner:** *as, like, as if, as though, the way*\n- *Do it as I showed you.*\n\n**Reason:** *because, since, as, now that*\n- *Since you are here, let's start.*\n\n**Important:** In time clauses about the future, use present tense (not will):\n- *I will call you when I arrive.* (NOT when I will arrive)",
        rules=[
            "In future time clauses, use present simple/present perfect, never 'will'.",
            "Adverbial clauses can go at the beginning or end of a sentence.",
            "Use a comma when the adverbial clause comes first.",
            "Different conjunctions have different nuances: 'when' (at that moment) vs 'while' (during that period).",
        ],
        examples=[
            GrammarExample(text="As soon as I get home, I will call you."),
            GrammarExample(text="She goes wherever her work takes her."),
            GrammarExample(
                text="He speaks as if he knew everything.", note="manner + unreal meaning"
            ),
            GrammarExample(text="Now that the exams are over, we can relax.", note="reason"),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="I will call you when I will arrive.",
                correct="I will call you when I arrive.",
                note="In future time clauses, use present simple, not 'will'.",
            ),
            GrammarMistake(
                wrong="Wherever you will go, I will follow.",
                correct="Wherever you go, I will follow.",
                note="Future time/place clauses use present simple.",
            ),
        ],
        related=["clauses-purpose-reason", "relative-clauses", "adverbial-clauses-advanced"],
    ),
    GrammarTopic(
        slug="phrasal-verbs-b2",
        title="Phrasal Verbs: Three-Part Verbs (look forward to, get on with)",
        level="B2",
        category="Phrasal Verbs",
        summary="Master phrasal verbs with two particles and understand their fixed patterns.",
        explanation="Three-part phrasal verbs have a verb + two particles. They are always inseparable and are followed by a noun or -ing form:\n\n**Common three-part phrasal verbs:**\n\n| Verb | Meaning | Example |\n|------|---------|--------|\n| look forward to | anticipate with pleasure | *I look forward to meeting you.* |\n| get on with | have a good relationship | *She gets on with her colleagues.* |\n| put up with | tolerate | *I can't put up with the noise.* |\n| come up with | invent, think of | *He came up with a brilliant idea.* |\n| run out of | have none left | *We have run out of bread.* |\n| cut down on | reduce | *I need to cut down on sugar.* |\n| face up to | accept a difficult truth | *You need to face up to the facts.* |\n| get away with | escape punishment | *He got away with cheating.* |\n| live up to | meet expectations | *The film didn't live up to the hype.* |\n| make up for | compensate | *How can I make up for being late?* |",
        rules=[
            "All three-part phrasal verbs are inseparable — the object always goes at the end.",
            "Most are followed by a noun, pronoun, or -ing form.",
            "The meaning is idiomatic and cannot be guessed from the individual words.",
            "Very common in informal and semi-formal English.",
        ],
        examples=[
            GrammarExample(text="I am really looking forward to the weekend."),
            GrammarExample(text="We have run out of coffee — can you buy some?"),
            GrammarExample(text="How do you put up with all that noise?"),
            GrammarExample(
                text="She came up with a solution that satisfied everyone.",
                note="invented/thought of",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="I look forward to see you.",
                correct="I look forward to seeing you.",
                note="After 'look forward to', use the -ing form, not the infinitive.",
            ),
            GrammarMistake(
                wrong="I can't put up the noise.",
                correct="I can't put up with the noise.",
                note="'Put up with' is a fixed three-word expression; don't drop 'with'.",
            ),
        ],
        related=["phrasal-verbs-b1", "phrasal-verbs-c1", "dependent-prepositions"],
    ),
    GrammarTopic(
        slug="emphatic-structures-b2",
        title="Emphatic Structures (do/did for emphasis, what-clauses)",
        level="B2",
        category="Advanced",
        summary="Add emphasis and contrast using auxiliary do/did and what-clauses.",
        structure="do/does/did + base verb · What + clause + is/was + focus",
        explanation="Several structures add emphasis in English:\n\n**1. Emphatic do/does/did:** used in positive sentences to add emphasis or contrast:\n- *I do like your new haircut!* (emphasis)\n- *He didn't enjoy the film, but I did think the ending was good.* (contrast)\n- *She does work hard, I assure you.* (contradicting a doubt)\n\n**2. What-clauses (cleft sentences — basic):**\n- Normal: *I need a holiday.*\n- Emphatic: *What I need is a holiday.*\n- Normal: *She dislikes rudeness.*\n- Emphatic: *What she dislikes is rudeness.*\n\n**3. It-clefts (basic):**\n- *It was John who broke the vase. / It was on Tuesday that she arrived.*",
        rules=[
            "'Do/does/did' for emphasis is only used in positive statements.",
            "The emphatic 'do' carries strong stress in spoken English.",
            "What-clauses focus attention on a specific part of the sentence.",
            "Use these structures sparingly — overuse sounds unnatural.",
        ],
        examples=[
            GrammarExample(text="I do understand how you feel, but try to stay positive."),
            GrammarExample(text="What really annoys me is when people are late."),
            GrammarExample(
                text="It was because of the weather that we cancelled the trip.", note="it-cleft"
            ),
            GrammarExample(text="She didn't say much, but she did seem interested."),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="I did went to the party.",
                correct="I did go to the party.",
                note="After emphatic 'did', use the base verb, not the past form.",
            ),
            GrammarMistake(
                wrong="What I need it is a rest.",
                correct="What I need is a rest.",
                note="Don't repeat the subject with a pronoun — just 'is'.",
            ),
        ],
        related=["cleft-sentences", "fronting-emphasis", "inversion"],
    ),
    GrammarTopic(
        slug="comparative-the-the",
        title="Comparative Structures: The...The...",
        level="B2",
        category="Adjectives & Adverbs",
        summary="Express how one thing changes in relation to another using the...the...",
        structure="The + comparative, the + comparative",
        explanation="The **the...the...** structure shows that two things change together — as one increases or decreases, the other does too:\n\n- *The more you practise, the better you become.*\n- *The sooner we leave, the earlier we will arrive.*\n- *The harder I try, the more frustrated I get.*\n\nBoth parts use 'the' + comparative form. The structure can be reduced in conversation:\n- *The more, the merrier.*\n- *The bigger, the better.*",
        rules=[
            "Both clauses use 'the' + comparative form.",
            "Shows a proportional relationship: one thing depends on the other.",
            "The first clause is the condition; the second is the result.",
            "Can be reduced to just the two comparatives in set phrases.",
        ],
        examples=[
            GrammarExample(text="The more you study, the higher your chances of passing."),
            GrammarExample(text="The longer we waited, the more impatient we became."),
            GrammarExample(text="The less you worry, the happier you will be."),
            GrammarExample(text="The sooner, the better.", note="reduced form"),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="More you practise, better you become.",
                correct="The more you practise, the better you become.",
                note="Both parts need 'the' before the comparative.",
            ),
            GrammarMistake(
                wrong="The more hard you work, the more successful you will be.",
                correct="The harder you work, the more successful you will be.",
                note="Short adjectives use -er, not 'more'.",
            ),
        ],
        related=["comparatives-superlatives", "comparative-as-as", "adverbs-manner"],
    ),
    GrammarTopic(
        slug="passive-modals",
        title="Passive Voice with Modal Verbs",
        level="B2",
        category="Passive Voice",
        summary="Combine modals with the passive to express obligation, possibility, and advice about actions.",
        structure="modal + be + past participle",
        explanation="Modal verbs can be combined with the passive voice:\n\n**Present/Future passive with modals:**\n- *must be done, should be told, can be seen, might be cancelled*\n\n- *The report must be submitted by Friday.* (obligation)\n- *The rules should be followed at all times.* (advice)\n- *The documents can be downloaded from the website.* (possibility)\n\n**Past passive with modals:**\n- modal + have been + past participle\n- *The letter should have been sent last week.*\n- *The mistake could have been avoided.*",
        rules=[
            "Form: modal + be + past participle (present/future).",
            "Form: modal + have been + past participle (past reference).",
            "The modal carries the meaning (obligation, advice, possibility); the passive shifts focus to the action.",
            "Common in formal instructions, rules, and reports.",
        ],
        examples=[
            GrammarExample(text="All applications must be received by 31st March."),
            GrammarExample(text="The window can be opened for fresh air."),
            GrammarExample(text="The project should have been completed by now."),
            GrammarExample(
                text="This letter might have been sent to the wrong address.",
                note="past possibility + passive",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="The form must be fill by the applicant.",
                correct="The form must be filled by the applicant.",
                note="After 'be', always use the past participle.",
            ),
            GrammarMistake(
                wrong="The work should be did by lunch.",
                correct="The work should be done by lunch.",
                note="Use the past participle (done), not the past simple (did).",
            ),
        ],
        related=["advanced-passive", "passive-constructions-advanced", "modal-verbs"],
    ),
    GrammarTopic(
        slug="be-to-future",
        title="Be + To-Infinitive (The PM is to address Parliament)",
        level="B2",
        category="Tenses",
        summary="Use 'be + to-infinitive' for formal announcements, official plans, and instructions.",
        structure="Subject + am/is/are + to + base verb",
        explanation=(
            "The **be-to** construction uses *be + to-infinitive* to express formal plans, "
            "announcements, or instructions. It is very common in British news and formal writing.\n\n"
            "**Main uses:**\n\n"
            "1. **Official plans / announcements** (formal future):\n"
            "   - *The Prime Minister is to address Parliament this afternoon.*\n"
            "   - *A new hospital is to be built in the town centre.*\n\n"
            "2. **Instructions / orders** (what someone must do):\n"
            "   - *You are to report to the head office by 9 am.*\n"
            "   - *No one is to leave the building.*\n\n"
            "3. **Destiny or fate** (literary / narrative):\n"
            "   - *They were never to meet again.*\n"
            "   - *Little did he know what was to come.*\n\n"
            "**Register:** Formal and journalistic. Rare in casual conversation."
        ),
        rules=[
            "Form: am/is/are + to + base verb (present); was/were + to + base verb (past).",
            "Used for formal announcements, instructions, and scheduled events.",
            "Very common in British news writing and official communication.",
            "Negative: 'is not to' or 'are not to' = prohibition.",
        ],
        examples=[
            GrammarExample(
                text="The Chancellor is to deliver his Budget speech next Tuesday.",
                note="official plan",
            ),
            GrammarExample(
                text="All staff are to complete the training by Friday.", note="instruction"
            ),
            GrammarExample(
                text="The two leaders were to meet in Geneva, but the summit was cancelled.",
                note="past plan unfulfilled",
            ),
            GrammarExample(
                text="She was to become one of the greatest writers of her generation.",
                note="destiny/narrative",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="The minister is to will speak later.",
                correct="The minister is to speak later.",
                note="'Be to' already expresses future meaning — do not add 'will'.",
            ),
            GrammarMistake(
                wrong="I am to going the conference.",
                correct="I am to attend the conference.",
                note="After 'be to', use the base verb, not the -ing form.",
            ),
        ],
        related=["will-future", "going-to-future", "future-in-the-past"],
    ),
]
