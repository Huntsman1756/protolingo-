"""English grammar topics — B1 additional."""

from app.data._types import GrammarExample, GrammarMistake, GrammarTopic

B1_GRAMMAR_TOPICS: list[GrammarTopic] = [
    GrammarTopic(
        slug="modals-deduction",
        title="Modals for Deduction (must, might, can't)",
        level="B1",
        category="Modals",
        summary="Use must, might, may, could, and can't to express how sure you are about something.",
        structure="Subject + must/might/may/could/can't + base verb",
        explanation="Modals of deduction express how certain we are:\n\n| Modal | Certainty | Use |\n|-------|-----------|-----|\n| **must** | ~95% sure (positive) | *She must be at home — the lights are on.* |\n| **might/may/could** | ~50% sure | *He might be in a meeting. I'm not sure.* |\n| **can't** | ~99% sure (negative) | *That can't be true — I checked it myself.* |\n\nFor past deductions, use: modal + have + past participle:\n- *She must have forgotten.* / *He can't have seen us.* / *They might have left already.*",
        rules=[
            "Use 'must' when you are almost certain something is true.",
            "Use 'might', 'may', or 'could' for possibility (not certainty).",
            "Use 'can't' (not 'mustn't') to say you're almost certain something is NOT true.",
            "For the past: modal + have + past participle.",
        ],
        examples=[
            GrammarExample(text="He must be tired — he has been working all day."),
            GrammarExample(text="She might be at the gym. I'm not sure."),
            GrammarExample(text="That can't be her car — it's a different color."),
            GrammarExample(text="They must have taken the wrong train.", note="past deduction"),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="She mustn't be at home.",
                correct="She can't be at home.",
                note="Use 'can't' for negative deduction, not 'mustn't'.",
            ),
            GrammarMistake(
                wrong="He might is busy.",
                correct="He might be busy.",
                note="Modals are always followed by the base verb, never by another auxiliary.",
            ),
        ],
        related=["modal-verbs", "modal-perfects", "should-ought-to"],
    ),
    GrammarTopic(
        slug="question-tags",
        title="Question Tags",
        level="B1",
        category="Questions",
        summary="Add a short question at the end of a sentence to check or confirm information.",
        structure="Positive statement + negative tag · Negative statement + positive tag",
        explanation="Question tags turn a statement into a question. They are very common in spoken English.\n\n**Rule:** If the statement is positive, the tag is negative. If negative, the tag is positive:\n\n| Statement | Tag |\n|-----------|-----|\n| It is cold, | isn't it? |\n| She can swim, | can't she? |\n| You don't like coffee, | do you? |\n| They haven't arrived, | have they? |\n\n**Special cases:**\n- *I am* → *aren't I?* (not amn't I)\n- *Let's go* → *shall we?*\n- Imperatives → *will you?* (*Open the window, will you?*)\n- *There is/are* → *isn't there? / aren't there?*",
        rules=[
            "Positive statement → negative tag; negative statement → positive tag.",
            "Use the same auxiliary in the tag as in the statement.",
            "For present/past simple without auxiliary, use do/does/did: 'You like tea, don't you?'",
            "Intonation: falling = you expect agreement; rising = you are really asking.",
        ],
        examples=[
            GrammarExample(text="You are coming to the party, aren't you?"),
            GrammarExample(text="She doesn't eat meat, does she?"),
            GrammarExample(text="It is a beautiful day, isn't it?"),
            GrammarExample(text="You haven't seen my keys, have you?", note="present perfect tag"),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="You like pizza, isn't it?",
                correct="You like pizza, don't you?",
                note="Use 'do/does/did' in tags for present/past simple, not 'be'.",
            ),
            GrammarMistake(
                wrong="I am right, amn't I?",
                correct="I am right, aren't I?",
                note="The tag for 'I am' is always 'aren't I'.",
            ),
        ],
        related=["questions-yes-no", "indirect-questions", "modal-verbs"],
    ),
    GrammarTopic(
        slug="indirect-questions",
        title="Indirect / Embedded Questions",
        level="B1",
        category="Questions",
        summary="Ask questions more politely by embedding them inside another phrase.",
        structure="Introductory phrase + question word + subject + verb (no inversion)",
        explanation="Indirect questions are more polite and formal than direct questions.\n\n**Direct:** *Where is the station?*\n**Indirect:** *Could you tell me where the station is?*\n\n**Key change:** After the introductory phrase, use normal word order (subject + verb), NOT question word order:\n- ✗ *Do you know what time is it?*\n- ✓ *Do you know what time it is?*\n\n**Common introductory phrases:**\n- *Can/Could you tell me...*\n- *Do you know...*\n- *Do you have any idea...*\n- *I wonder...*\n- *I'd like to know...*",
        rules=[
            "After the introductory phrase, use subject + verb order (no auxiliary inversion).",
            "No question mark if the introductory phrase is a statement: 'I wonder where she is.'",
            "For yes/no indirect questions, use 'if' or 'whether'.",
            "No 'do/does/did' auxiliary in the embedded clause.",
        ],
        examples=[
            GrammarExample(text="Could you tell me where the nearest bank is?"),
            GrammarExample(text="Do you know if the museum is open on Sundays?"),
            GrammarExample(
                text="I wonder what she is doing right now.", note="statement, not question"
            ),
            GrammarExample(text="Do you have any idea how much this costs?"),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Do you know where is the station?",
                correct="Do you know where the station is?",
                note="In indirect questions, the subject comes before the verb.",
            ),
            GrammarMistake(
                wrong="Can you tell me what does this mean?",
                correct="Can you tell me what this means?",
                note="No 'do/does' auxiliary in the embedded clause.",
            ),
        ],
        related=["questions-yes-no", "question-tags", "question-words"],
    ),
    GrammarTopic(
        slug="defining-non-defining-clauses",
        title="Defining vs. Non-Defining Relative Clauses",
        level="B1",
        category="Clauses",
        summary="Know when to use commas and whether the information is essential or extra.",
        structure="Defining: noun + who/which/that + clause · Non-defining: noun, who/which + clause,",
        explanation="**Defining relative clauses** give essential information — without them, we don't know who or what:\n- *The man who lives next door is a doctor.* (which man? the one who lives next door)\n\n**Non-defining relative clauses** give extra information — the sentence makes sense without them. They use commas:\n- *My brother, who lives in Paris, is visiting.* (I only have one brother, so 'in Paris' is extra info)\n\n**Key differences:**\n| Defining | Non-Defining |\n|----------|-------------|\n| No commas | Commas required |\n| 'That' allowed | 'That' not allowed |\n| Object pronoun can be omitted | Object pronoun cannot be omitted |",
        rules=[
            "Defining clauses: no commas, give essential information.",
            "Non-defining clauses: use commas, give extra information.",
            "Never use 'that' in non-defining clauses.",
            "Non-defining clauses are more common in written English.",
        ],
        examples=[
            GrammarExample(
                text="The students who passed the exam were very happy.", note="defining"
            ),
            GrammarExample(
                text="My mother, who is 65, still works full-time.", note="non-defining"
            ),
            GrammarExample(
                text="The car which I bought last year has already broken down.", note="defining"
            ),
            GrammarExample(
                text="Paris, which is the capital of France, is a beautiful city.",
                note="non-defining",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="My sister, that lives in London, is a teacher.",
                correct="My sister, who lives in London, is a teacher.",
                note="Never use 'that' in non-defining relative clauses.",
            ),
            GrammarMistake(
                wrong="London which is the capital is expensive.",
                correct="London, which is the capital, is expensive.",
                note="Non-defining clauses need commas before and after.",
            ),
        ],
        related=["relative-clauses", "advanced-relative-clauses"],
    ),
    GrammarTopic(
        slug="both-either-neither",
        title="Both, Either, Neither",
        level="B1",
        category="Nouns",
        summary="Talk about two things together (both), one or the other (either), or none (neither).",
        structure="both + plural · either/neither + singular · both...and / either...or / neither...nor",
        explanation="These words refer to two people or things:\n\n| Word | Meaning | Verb form |\n|------|---------|-----------|\n| **both** | the two together | plural |\n| **either** | one or the other | singular |\n| **neither** | not one and not the other | singular |\n\n**Paired structures:**\n- *Both...and...* — *Both my sister and my brother live abroad.*\n- *Either...or...* — *We can go either today or tomorrow.*\n- *Neither...nor...* — *Neither John nor Mary was at the meeting.*\n\nWith 'neither...nor', the verb agrees with the nearest subject.",
        rules=[
            "'Both' takes a plural verb: 'Both options are good.'",
            "'Either' and 'neither' take a singular verb: 'Neither answer is correct.'",
            "With 'neither...nor', the verb agrees with the closest subject.",
            "Use 'both of', 'either of', 'neither of' before 'the/these/those/my/your...' + plural noun.",
        ],
        examples=[
            GrammarExample(text="Both restaurants are excellent."),
            GrammarExample(text="Either day works for me — I'm free all week."),
            GrammarExample(text="Neither candidate has enough experience."),
            GrammarExample(
                text="Neither the teacher nor the students were ready.",
                note="verb agrees with 'students'",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Both of them is wrong.",
                correct="Both of them are wrong.",
                note="'Both' takes a plural verb, not singular.",
            ),
            GrammarMistake(
                wrong="Neither of the options are good.",
                correct="Neither of the options is good.",
                note="'Neither' is singular — use 'is', not 'are'.",
            ),
        ],
        related=["some-any-much-many", "countable-uncountable", "indefinite-pronouns"],
    ),
    GrammarTopic(
        slug="so-such",
        title="So & Such",
        level="B1",
        category="Adjectives & Adverbs",
        summary="Intensify descriptions using so and such to mean 'very' or 'to this degree'.",
        structure="so + adjective/adverb · such + (article) + adjective + noun",
        explanation="**So** and **such** make descriptions stronger.\n\n**So** is used:\n- Before adjectives (no noun): *It is so beautiful.*\n- Before adverbs: *She speaks so quickly.*\n- Before much/many + noun: *so much money, so many people*\n\n**Such** is used:\n- Before a noun phrase (with or without adjective): *It was such a nice day. / She has such patience.*\n\nBoth can be followed by 'that' to show result: *It was so cold that the pipes froze. / It was such a good movie that I watched it twice.*",
        rules=[
            "'So' + adjective/adverb (no noun): 'so tired', 'so quickly'.",
            "'Such' + (a/an) + (adjective) + noun: 'such a good idea', 'such beautiful weather'.",
            "Use 'so much/many' with uncountable/countable nouns.",
            "Add 'that' to show consequence: 'so...that', 'such...that'.",
        ],
        examples=[
            GrammarExample(text="The exam was so difficult that hardly anyone passed."),
            GrammarExample(text="She is such a talented musician."),
            GrammarExample(text="There were so many people that we couldn't get in."),
            GrammarExample(text="It happened so quickly that I didn't see it.", note="so + adverb"),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="It was a so good movie.",
                correct="It was such a good movie.",
                note="With an adjective + noun, use 'such', not 'so'.",
            ),
            GrammarMistake(
                wrong="She is such intelligent.",
                correct="She is so intelligent.",
                note="When there is no noun, use 'so', not 'such'.",
            ),
        ],
        related=["too-enough", "comparatives-superlatives", "adverbs-manner"],
    ),
    GrammarTopic(
        slug="order-of-adjectives",
        title="Order of Adjectives",
        level="B1",
        category="Adjectives & Adverbs",
        summary="Put multiple adjectives in the correct order before a noun.",
        explanation="When using more than one adjective before a noun, they usually follow this order:\n\n**Opinion → Size → Age → Shape → Color → Origin → Material → Purpose**\n\n- *a beautiful big old round red Italian wooden dining table*\n\nIn practice, 2-3 adjectives is more typical:\n- *a lovely small cottage*\n- *an expensive Italian leather bag*\n- *a tall young woman*\n\nUse commas between adjectives of the same category, but not between different categories:\n- *a cold, rainy day* (both opinion/description)\n- *a beautiful old house* (opinion + age — no comma)",
        rules=[
            "General order: opinion → size → age → shape → color → origin → material → purpose.",
            "Limit to 2-3 adjectives before a noun in most cases.",
            "Use commas between adjectives from the same category.",
            "No commas between adjectives from different categories.",
        ],
        examples=[
            GrammarExample(text="She bought a gorgeous little black dress."),
            GrammarExample(text="He lives in a charming old stone cottage."),
            GrammarExample(text="It was a cold, wet, miserable day."),
            GrammarExample(
                text="I found an ancient Chinese porcelain vase.", note="age → origin → material"
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="a red big car",
                correct="a big red car",
                note="Size goes before color.",
            ),
            GrammarMistake(
                wrong="a French old beautiful painting",
                correct="a beautiful old French painting",
                note="Opinion → age → origin.",
            ),
        ],
        related=["comparatives-superlatives", "adverbs-manner", "so-such"],
    ),
    GrammarTopic(
        slug="reported-questions-commands",
        title="Reported Speech: Questions & Commands",
        level="B1",
        category="Reported Speech",
        summary="Report questions and commands using ask, tell, and order.",
        explanation="**Reported questions** use 'ask' and normal word order (no inversion, no question mark):\n\n| Direct | Reported |\n|--------|----------|\n| 'Where do you live?' | He asked me where I lived. |\n| 'Are you married?' | She asked if/whether I was married. |\n\n**Reported commands/requests** use 'tell' or 'ask' + object + (not) to + infinitive:\n\n| Direct | Reported |\n|--------|----------|\n| 'Sit down.' | He told me to sit down. |\n| 'Don't be late.' | She told us not to be late. |\n| 'Could you help me?' | She asked me to help her. |",
        rules=[
            "Reported questions: use 'ask' + normal word order (subject before verb).",
            "For yes/no questions: use 'if' or 'whether'.",
            "Reported commands: use 'tell/ask' + object + (not) to + infinitive.",
            "Remember to shift tenses and pronouns back.",
        ],
        examples=[
            GrammarExample(text='She asked me where I worked. (Direct: "Where do you work?")'),
            GrammarExample(text='He wanted to know if I could swim. (Direct: "Can you swim?")'),
            GrammarExample(
                text='The teacher told us to open our books. (Direct: "Open your books.")'
            ),
            GrammarExample(
                text='She warned us not to touch the wire. (Direct: "Don\'t touch the wire.")'
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="He asked me where did I live.",
                correct="He asked me where I lived.",
                note="Reported questions use normal word order, not question word order.",
            ),
            GrammarMistake(
                wrong="She told to sit down.",
                correct="She told me to sit down.",
                note="'Tell' must have an object (me, him, us) before the infinitive.",
            ),
        ],
        related=["reported-speech-basics", "reported-speech", "indirect-questions"],
    ),
    GrammarTopic(
        slug="be-used-to-get-used-to",
        title="Be Used To / Get Used To",
        level="B1",
        category="Tenses",
        summary="Distinguish between 'used to' (past habit), 'be used to' (accustomed now), and 'get used to' (becoming accustomed).",
        structure="be used to + noun/-ing · get used to + noun/-ing · used to + base verb (past habit)",
        explanation="These three structures look similar but have different meanings:\n\n**1. Used to + base verb** — past habit that is no longer true:\n*I used to smoke.* (I don't anymore)\n\n**2. Be used to + noun/-ing** — something is normal, not strange:\n*I am used to the noise.* / *She is used to waking up early.*\n\n**3. Get used to + noun/-ing** — the process of becoming accustomed:\n*I am getting used to the new job.* / *You will get used to it.*\n\nKey: 'be/get used to' is followed by a gerund (-ing) or noun, NOT a base verb.",
        rules=[
            "'Used to + base verb' = past habit (only for past).",
            "'Be used to + noun/-ing' = it is familiar/normal now.",
            "'Get used to + noun/-ing' = becoming familiar over time.",
            "Both 'be used to' and 'get used to' can be used in any tense.",
        ],
        examples=[
            GrammarExample(
                text="I used to live in Chicago. Now I live in Austin.", note="past habit"
            ),
            GrammarExample(text="She is used to working long hours.", note="it is normal for her"),
            GrammarExample(text="It took me a while to get used to driving on freeways."),
            GrammarExample(text="Don't worry — you will soon get used to it."),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="I am used to wake up early.",
                correct="I am used to waking up early.",
                note="After 'be used to', use the -ing form, not the base verb.",
            ),
            GrammarMistake(
                wrong="I used to waking up early when I was a child.",
                correct="I used to wake up early when I was a child.",
                note="Past habits use 'used to + base verb', not -ing.",
            ),
        ],
        related=["used-to-would", "past-simple", "gerunds-infinitives"],
    ),
    GrammarTopic(
        slug="passive-continuous",
        title="Passive Voice: Continuous Tenses",
        level="B1",
        category="Passive Voice",
        summary="Use the passive in present continuous and past continuous forms.",
        structure="am/is/are/was/were + being + past participle",
        explanation="The passive voice can also be used with continuous tenses when the action is in progress:\n\n**Present continuous passive:**\n- Active: *They are repairing the bridge.*\n- Passive: *The bridge is being repaired.*\n\n**Past continuous passive:**\n- Active: *They were building a new hospital.*\n- Passive: *A new hospital was being built.*\n\n**Form:** be (conjugated) + being + past participle\n\nUse the continuous passive when the action itself is what matters and is still ongoing.",
        rules=[
            "Form: be + being + past participle.",
            "Conjugate 'be' to match the tense (is/are = present, was/were = past).",
            "Use when the action is ongoing and the focus is on the action, not the doer.",
            "The agent (by + person) is often omitted.",
        ],
        examples=[
            GrammarExample(text="The road is being widened at the moment."),
            GrammarExample(text="My car was being repaired when I called."),
            GrammarExample(text="The documents are being reviewed by the manager."),
            GrammarExample(text="A new school is being built in our neighborhood."),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="The house is been painted.",
                correct="The house is being painted.",
                note="Continuous passive uses 'being', not 'been'.",
            ),
            GrammarMistake(
                wrong="The project was being complete on time.",
                correct="The project was being completed on time.",
                note="After 'being', use the past participle (-ed form).",
            ),
        ],
        related=["passive-voice-simple", "passive-voice-perfect", "present-continuous"],
    ),
    GrammarTopic(
        slug="dependent-prepositions",
        title="Dependent Prepositions (adjective + preposition, verb + preposition)",
        level="B1",
        category="Prepositions",
        summary="Learn which prepositions follow specific adjectives, verbs, and nouns.",
        explanation="Many words are followed by a fixed preposition. These combinations must be memorised:\n\n**Adjective + preposition:**\n- *afraid of, interested in, good at, worried about, angry with, famous for, proud of, keen on, tired of*\n\n**Verb + preposition:**\n- *depend on, belong to, listen to, wait for, pay for, apply for, think about, agree with*\n\n**Noun + preposition:**\n- *an increase in, a reason for, a solution to, an advantage of, a relationship with*\n\nThere is no logical rule — these are collocations that come from usage.",
        rules=[
            "Many adjective-preposition and verb-preposition pairs are fixed and must be learned.",
            "The preposition does not change based on the tense of the verb.",
            "In questions, the preposition usually stays at the end: 'What are you afraid of?'",
            "Some verbs change meaning with different prepositions: think about (consider) vs. think of (have an idea).",
        ],
        examples=[
            GrammarExample(text="She is really good at math."),
            GrammarExample(text="It depends on the weather."),
            GrammarExample(text="What are you worried about?"),
            GrammarExample(text="There has been an increase in prices recently."),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="I am interested for learning Spanish.",
                correct="I am interested in learning Spanish.",
                note="'Interested' always takes 'in', not 'for'.",
            ),
            GrammarMistake(
                wrong="It depends of the situation.",
                correct="It depends on the situation.",
                note="'Depend' always takes 'on', not 'of'.",
            ),
        ],
        related=["prepositions-place", "prepositions-time", "phrasal-verbs-b1"],
    ),
    GrammarTopic(
        slug="articles-advanced-b1",
        title="Articles: Zero Article, Generic & Institutional Use",
        level="B1",
        category="Articles",
        summary="Go beyond basic a/an/the rules: when to use no article and how to talk about things in general.",
        explanation="At B1 level, article use becomes more nuanced:\n\n**Zero article (no article)** — used with:\n- Plural countable nouns in general: *Dogs are loyal.*\n- Uncountable nouns in general: *Music is universal.*\n- Institutions (when thinking about their purpose):\n  *She goes to school. / They are at church.*\n- Meals: *What time is lunch?*\n- Transport: *by car, by bus, on foot*\n\n**Important American English note:** Unlike British English, American English uses **the** with hospital when referring to a patient: *He is in **the** hospital.* (not 'in hospital'). School, church, and prison follow the zero-article pattern in both varieties.\n\nCompare:\n- *I went to the school.* (the building — maybe for a meeting)\n- *I went to school.* (as a student — the institution's purpose)\n\n**Generic use of 'the':**\n- Inventions: *The telephone was invented by Bell.*\n- Species: *The tiger is endangered.*",
        rules=[
            "No article for general statements with plural and uncountable nouns.",
            "No article for school, church, and prison when referring to their purpose.",
            "American English requires 'the' with hospital: 'She is in the hospital' (as a patient).",
            "Use 'the' for inventions and species when referring to them generically.",
            "No article for meals, sports, and languages: 'I play tennis', 'She speaks French'.",
        ],
        examples=[
            GrammarExample(text="I love coffee in the morning.", note="general, uncountable"),
            GrammarExample(
                text="Children need a lot of sleep.", note="general, plural — no article"
            ),
            GrammarExample(
                text="She has been in the hospital for a week.",
                note="American English — always uses 'the' with hospital",
            ),
            GrammarExample(text="The smartphone has changed our lives.", note="invention, generic"),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="The dogs are the best pets.",
                correct="Dogs are the best pets.",
                note="For general statements about plural nouns, use no article.",
            ),
            GrammarMistake(
                wrong="She is studying the French.",
                correct="She is studying French.",
                note="No article before language names.",
            ),
        ],
        related=["articles", "countable-uncountable", "articles-specific-generic"],
    ),
    GrammarTopic(
        slug="phrasal-verbs-b1",
        title="Phrasal Verbs: Common Patterns (get up, give up, take off)",
        level="B1",
        category="Phrasal Verbs",
        summary="Understand separable and inseparable phrasal verbs and how to use them correctly.",
        structure="Verb + particle (up, down, on, off, in, out, away, back, over)",
        explanation="Phrasal verbs consist of a verb + a particle (preposition or adverb). They often have a meaning different from the individual words.\n\n**Separable phrasal verbs** — the object can go between the verb and particle:\n- *Turn off the light.* / *Turn the light off.*\n- BUT if the object is a pronoun, it MUST go in the middle:\n  *Turn it off.* (NOT *Turn off it.*)\n\n**Inseparable phrasal verbs** — the object always goes after:\n- *Look after your sister.* (NOT *Look your sister after.*)\n- *Run into a friend.*\n\n**Common A2-B1 phrasal verbs:**\nget up, wake up, give up, take off, put on, turn on/off, pick up, look after, look for, run out of, come back, go on, find out, set up, bring up",
        rules=[
            "With separable phrasal verbs, pronouns must go between verb and particle: 'turn it on'.",
            "With long objects, it is more natural to keep the verb and particle together: 'turn on the light in the kitchen'.",
            "Inseparable phrasal verbs always keep verb and particle together.",
            "Phrasal verbs are much more common in spoken and informal English.",
        ],
        examples=[
            GrammarExample(text="Please turn off the TV when you leave."),
            GrammarExample(text="I can't find my glasses. Can you help me look for them?"),
            GrammarExample(text="She gave up smoking last year."),
            GrammarExample(
                text="We ran out of milk, so I went to the shop.", note="three-part phrasal"
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Turn off it!",
                correct="Turn it off!",
                note="Pronouns must go between the verb and the particle.",
            ),
            GrammarMistake(
                wrong="I look my keys for.",
                correct="I look for my keys.",
                note="'Look for' is inseparable — the object always goes after.",
            ),
        ],
        related=["prepositions-movement", "dependent-prepositions", "phrasal-verbs-b2"],
    ),
    GrammarTopic(
        slug="present-perfect-vs-past-simple",
        title="Present Perfect vs. Past Simple",
        level="B1",
        category="Tenses",
        summary="Know when to use present perfect (connection to now) versus past simple (finished past).",
        explanation="The choice between present perfect and past simple depends on the relationship with the present:\n\n**Present perfect** — the past action has a connection to or relevance in the present:\n- No specific past time: *I have visited Japan.* (in my life, the exact time doesn't matter)\n- Recent events with present result: *I have lost my keys.* (I can't find them now)\n- With 'for' and 'since' for unfinished time: *I have lived here for five years.* (I still live here)\n\n**Past simple** — the action is finished and separate from the present:\n- Specific past time: *I visited Japan in 2019.*\n- Completed action: *I lost my keys but found them later.*\n- Finished time period: *I lived there for five years.* (I don't live there anymore)",
        rules=[
            "Present perfect: no specific past time mentioned; the result is relevant now.",
            "Past simple: specific past time mentioned (yesterday, in 2010, last week).",
            "With 'for' and 'since': present perfect if still true; past simple if finished.",
            "Key time markers for present perfect: ever, never, just, already, yet, so far, recently.",
        ],
        examples=[
            GrammarExample(text="I have lost my wallet. (I still can't find it.)"),
            GrammarExample(text="I lost my wallet yesterday. (specific time in the past)"),
            GrammarExample(text="She has worked here since 2015. (she still works here)"),
            GrammarExample(text="She worked here from 2015 to 2020. (finished period)"),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="I have seen that movie yesterday.",
                correct="I saw that movie yesterday.",
                note="With a specific past time (yesterday), use past simple.",
            ),
            GrammarMistake(
                wrong="I didn't finish my homework yet.",
                correct="I haven't finished my homework yet.",
                note="'Yet' requires present perfect, not past simple.",
            ),
        ],
        related=["present-perfect", "past-simple", "present-perfect-continuous"],
    ),
    GrammarTopic(
        slug="comparative-superlative-adverbs",
        title="Comparative & Superlative Adverbs",
        level="B1",
        category="Adjectives & Adverbs",
        summary="Compare how actions are performed using comparative and superlative adverbs.",
        structure="Adverb + -er/-est (short) · more/less + adverb (long) · Irregular: well → better → best",
        explanation="Just as adjectives have comparative and superlative forms, so do adverbs:\n\n**Short adverbs (one syllable):** add -er/-est\n- *fast → faster → fastest*\n- *hard → harder → hardest*\n- *soon → sooner → soonest*\n\n**Long adverbs (two+ syllables):** use more/most\n- *carefully → more carefully → most carefully*\n- *frequently → more frequently → most frequently*\n\n**Irregular adverbs:**\n| Base | Comparative | Superlative |\n|------|-------------|-------------|\n| well | better | best |\n| badly | worse | worst |\n| far | farther/further | farthest/furthest |\n| little | less | least |\n| much | more | most |",
        rules=[
            "Short adverbs (early, fast, hard, late, soon): add -er/-est.",
            "Long adverbs (ending in -ly): use more/most.",
            "Use 'less' and 'least' to mean the opposite: 'less often', 'the least carefully'.",
            "The irregular adverbs (well, badly, far) must be memorised.",
        ],
        examples=[
            GrammarExample(text="She arrived earlier than expected."),
            GrammarExample(text="He drives more carefully than his brother."),
            GrammarExample(text="Of all the students, Maria speaks the most fluently."),
            GrammarExample(text="I play tennis worse than I used to.", note="irregular"),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="She speaks English more good than me.",
                correct="She speaks English better than me.",
                note="The adverb form of 'good' is 'well'; comparative is 'better'.",
            ),
            GrammarMistake(
                wrong="He runs more fast than I do.",
                correct="He runs faster than I do.",
                note="Short adverbs take -er, not 'more'.",
            ),
        ],
        related=["comparatives-superlatives", "adverbs-manner", "comparative-as-as"],
    ),
    GrammarTopic(
        slug="quantifiers-few-little",
        title="Few / A Few, Little / A Little",
        level="B1",
        category="Nouns",
        summary="Understand the difference between 'few' (negative) and 'a few' (positive), and 'little' (negative) and 'a little' (positive).",
        structure="few / a few + countable plural · little / a little + uncountable",
        explanation=(
            "These quantifiers look similar but carry opposite meanings:\n\n"
            "**With countable nouns (few / a few):**\n\n"
            "| Form | Meaning | Example |\n"
            "|------|---------|--------|\n"
            "| *few* | almost none — negative connotation | *She has few friends.* (= not many, a problem) |\n"
            "| *a few* | some — positive connotation | *She has a few friends.* (= some, enough) |\n\n"
            "**With uncountable nouns (little / a little):**\n\n"
            "| Form | Meaning | Example |\n"
            "|------|---------|--------|\n"
            "| *little* | almost none — negative connotation | *There is little hope.* (= almost none) |\n"
            "| *a little* | some — positive connotation | *There is a little time left.* (= some, enough for now) |\n\n"
            "**The key:** the article 'a' changes a negative meaning to a positive one."
        ),
        rules=[
            "'Few' and 'a few' are used with countable plural nouns.",
            "'Little' and 'a little' are used with uncountable nouns.",
            "'Few' (no article) = negative: almost none, not enough.",
            "'A few' = positive: some, a small but sufficient number.",
            "'A little' = positive: some, a small but sufficient amount.",
        ],
        examples=[
            GrammarExample(
                text="I have a few minutes — shall we talk?", note="a few = some, enough"
            ),
            GrammarExample(
                text="She has few options in this situation.", note="few = almost none, concerning"
            ),
            GrammarExample(text="Add a little salt to taste.", note="a little = some, sufficient"),
            GrammarExample(
                text="There is little evidence to support this claim.", note="little = almost none"
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="I have few money left.",
                correct="I have a little money left. (or) I have little money left.",
                note="'Money' is uncountable — use 'a little' or 'little', not 'few'.",
            ),
            GrammarMistake(
                wrong="There are a little mistakes.",
                correct="There are a few mistakes.",
                note="'Mistakes' is countable — use 'a few', not 'a little'.",
            ),
        ],
        related=["some-any-much-many", "countable-uncountable", "both-either-neither"],
    ),
]
