"""English grammar topics — C1 additional."""

from app.data._types import GrammarExample, GrammarMistake, GrammarTopic

C1_GRAMMAR_TOPICS: list[GrammarTopic] = [
    GrammarTopic(
        slug="subjunctive-mood",
        title="The Subjunctive Mood (I suggest that he go, It is vital that she be)",
        level="C1",
        category="Advanced",
        summary="Use the subjunctive in formal contexts after verbs of suggestion, demand, and necessity.",
        structure="Verb of suggestion/demand + that + subject + base verb (no -s, no tense change)",
        explanation="The **subjunctive mood** is used in formal English after certain verbs and expressions to express that something is important, necessary, or desirable:\n\n**Structure:** verb + that + subject + base verb (always the base form, even for he/she/it)\n\n- *I suggest that he go to the doctor.* (not 'goes')\n- *It is vital that she be informed immediately.* (not 'is')\n- *The judge ordered that the prisoner be released.*\n\n**Common verbs:** suggest, recommend, insist, demand, request, propose, advise, urge\n**Common expressions:** it is essential/vital/important/necessary/crucial that...\n\n**Note:** In British English, 'should + base verb' is often preferred: *I suggest that he should go.*",
        rules=[
            "Use the base verb form for all subjects (no -s for he/she/it).",
            "The subjunctive has no tense — it expresses a wish or requirement.",
            "Most common in formal writing, legal documents, and official recommendations.",
            "In everyday British English, 'should + base verb' is more common.",
        ],
        examples=[
            GrammarExample(text="The report recommends that the company reduce its emissions."),
            GrammarExample(text="It is essential that every student be present for the exam."),
            GrammarExample(text="She insisted that he stay for dinner."),
            GrammarExample(text="The board proposed that the meeting be postponed."),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="I suggest that he goes to the doctor.",
                correct="I suggest that he go to the doctor.",
                note="In the subjunctive, use the base verb, never '-s' for he/she/it.",
            ),
            GrammarMistake(
                wrong="It is important that she is on time.",
                correct="It is important that she be on time.",
                note="In formal subjunctive, use 'be', not 'is'.",
            ),
        ],
        related=["distancing-language", "hedging-language", "reported-speech-reporting-verbs"],
    ),
    GrammarTopic(
        slug="conditionals-alternatives",
        title="Conditional Alternatives (unless, provided that, supposing, as long as)",
        level="C1",
        category="Conditionals",
        summary="Expand your conditional repertoire beyond 'if' with a range of alternative conjunctions.",
        explanation="Several conjunctions can replace 'if' to add nuance:\n\n| Conjunction | Meaning | Example |\n|-------------|---------|--------|\n| **unless** | if not, except if | *You won't pass unless you study.* |\n| **provided that / providing** | only if (strong condition) | *I will go, provided that you come too.* |\n| **as long as / so long as** | only if (condition with assurance) | *You can stay as long as you are quiet.* |\n| **supposing / suppose** | what if (hypothetical) | *Supposing you won the lottery, what would you do?* |\n| **on condition that** | only if (formal) | *She was released on condition that she report weekly.* |\n| **in case** | because something might happen | *Take an umbrella in case it rains.* |\n| **otherwise / or else** | if not (negative result) | *Hurry up, otherwise we will miss the train.* |",
        rules=[
            "'Unless' is equivalent to 'if not' but is generally preferred when the condition is negative.",
            "'Provided that' and 'as long as' mean 'only if' — they set a strict condition.",
            "'In case' is NOT a conditional — it means 'because something might happen'.",
            "All these conjunctions can be used with any conditional pattern.",
        ],
        examples=[
            GrammarExample(
                text="Unless you start now, you won't finish on time.", note="if you don't start"
            ),
            GrammarExample(text="You can borrow the car provided that you fill it up afterwards."),
            GrammarExample(
                text="Supposing you lost your job, what would you do?", note="hypothetical"
            ),
            GrammarExample(
                text="Take your phone in case you get lost.", note="precaution, not condition"
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="I will go unless if it rains.",
                correct="I will go unless it rains.",
                note="Don't use 'if' after 'unless' — 'unless' already means 'if not'.",
            ),
            GrammarMistake(
                wrong="Take a coat in case it will be cold.",
                correct="Take a coat in case it is cold.",
                note="After 'in case', use present simple, not 'will'.",
            ),
        ],
        related=["first-conditional", "second-conditional", "conditionals-without-if"],
    ),
    GrammarTopic(
        slug="distancing-language",
        title="Distancing Language (appear to, seem to, be said to, allegedly)",
        level="C1",
        category="Advanced",
        summary="Distance yourself from statements to show that they are not your own claim, especially in journalism and academic writing.",
        explanation="Distancing language allows you to report claims without endorsing them:\n\n**Verbs:** appear to, seem to, be thought to, be believed to, be alleged to\n- *The company appears to be in financial difficulty.*\n- *The suspect is alleged to have stolen the documents.*\n\n**Adverbs:** apparently, seemingly, supposedly, allegedly, reportedly\n- *Apparently, the deal has fallen through.*\n- *The minister has reportedly resigned.*\n\n**Phrases:** it appears that, it seems that, there are claims that\n- *It appears that the data was manipulated.*\n\nThis is essential in journalism, academic writing, and diplomatic language.",
        rules=[
            "Use distancing language when you are not certain or do not want to take responsibility for a claim.",
            "'Allegedly' is used when something is claimed but not proven (often legal contexts).",
            "Distancing verbs in passive: 'is said to', 'is thought to', 'is believed to'.",
            "Overuse can make writing sound evasive — balance with direct statements when appropriate.",
        ],
        examples=[
            GrammarExample(text="The economy appears to be recovering slowly."),
            GrammarExample(text="Allegedly, the documents were falsified."),
            GrammarExample(text="The missing painting is believed to have been destroyed."),
            GrammarExample(text="It seems that the original plan was never approved."),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="It is appeared that the project failed.",
                correct="It appears that the project failed.",
                note="Don't use 'appear' in the passive when it means 'seem'.",
            ),
            GrammarMistake(
                wrong="Allegedly, he did it.",
                correct="He allegedly did it. (or) Allegedly, he committed the crime.",
                note="'Allegedly' usually modifies the verb, not the whole sentence as a standalone.",
            ),
        ],
        related=["passive-reporting-verbs", "hedging-language", "reported-speech-reporting-verbs"],
    ),
    GrammarTopic(
        slug="coherence-cohesion",
        title="Cohesion & Coherence in Writing",
        level="C1",
        category="Advanced",
        summary="Make your writing flow logically using cohesive devices and clear paragraph structure.",
        explanation="**Coherence** = the logical flow of ideas (does it make sense?).\n**Cohesion** = the grammatical links between sentences (how are they connected?).\n\n**Cohesive devices:**\n1. **Reference:** pronouns referring back (*this, that, these, it, they*)\n2. **Substitution:** replacing a phrase (*I think so. / Do it if you can.*)\n3. **Ellipsis:** omitting repeated words (*She can sing better than I can [sing].*)\n4. **Lexical cohesion:** repeating key words or using synonyms\n5. **Transition signals:** however, therefore, furthermore, in contrast\n\n**Paragraph structure:** topic sentence → supporting sentences → concluding/transition sentence",
        rules=[
            "Each paragraph should have one clear main idea.",
            "Use a variety of cohesive devices — don't overuse transition words.",
            "Reference words (this, these, such) should clearly point to a specific earlier idea.",
            "Good writing uses a mix of explicit connectors and implicit logical flow.",
        ],
        examples=[
            GrammarExample(
                text="The first solution is cheaper. However, it is less reliable in the long term."
            ),
            GrammarExample(
                text="Many cities have introduced bike-sharing schemes. These have proven popular with commuters.",
                note="reference: 'these' → 'bike-sharing schemes'",
            ),
            GrammarExample(
                text="She asked me to help, and I did so willingly.",
                note="substitution: 'did so' = 'helped'",
            ),
            GrammarExample(
                text="The findings were unexpected. Further research is needed to confirm them."
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="The policy was unpopular. This meant the government lost support.",
                correct="The policy was unpopular. This unpopularity meant the government lost support.",
                note="Make sure 'this' has a clear antecedent — don't let it refer vaguely to a whole situation.",
            ),
            GrammarMistake(
                wrong="I like coffee, however I don't drink it after 6.",
                correct="I like coffee. However, I don't drink it after 6.",
                note="Start a new sentence with 'However' — or use 'but' within the same sentence.",
            ),
        ],
        related=["discourse-connectors-b1", "discourse-markers", "ellipsis-substitution"],
    ),
    GrammarTopic(
        slug="parallelism",
        title="Parallelism in Writing",
        level="C1",
        category="Advanced",
        summary="Use parallel structures to make writing balanced, clear, and rhetorically powerful.",
        structure="Items in a series or paired structures should use the same grammatical form.",
        explanation="**Parallelism** means using the same grammatical structure for items in a list or comparison:\n\n**Series:**\n- ✓ *She likes swimming, running, and cycling.* (all -ing)\n- ✗ *She likes swimming, to run, and cycling.* (mixed forms)\n\n**Paired conjunctions:** not only...but also, either...or, neither...nor, both...and\n- ✓ *He is not only intelligent but also hard-working.* (adjective + adjective)\n- ✗ *He is not only intelligent but also works hard.* (adjective + clause)\n\n**Comparisons:**\n- ✓ *Writing a report is easier than giving a presentation.* (gerund + gerund)\n- ✗ *Writing a report is easier than to give a presentation.* (gerund + infinitive)\n\nParallelism makes writing more professional, persuasive, and easier to read.",
        rules=[
            "All items in a series must share the same grammatical form.",
            "After paired conjunctions (both...and, either...or), the structures must match.",
            "In comparisons with 'than' or 'as', keep the same form on both sides.",
            "Parallelism is especially important in CVs, presentations, and formal writing.",
        ],
        examples=[
            GrammarExample(
                text="The job involves taking calls, replying to emails, and managing the team."
            ),
            GrammarExample(
                text="She is not only a talented writer but also a skilled musician.",
                note="noun + noun",
            ),
            GrammarExample(
                text="Asking for help is better than struggling alone.", note="gerund + gerund"
            ),
            GrammarExample(
                text="The proposal is ambitious, innovative, and cost-effective.",
                note="adjective + adjective + adjective",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="I enjoy reading, to cook, and watching films.",
                correct="I enjoy reading, cooking, and watching films.",
                note="All items in the series should use the -ing form.",
            ),
            GrammarMistake(
                wrong="He is both a doctor and works as a researcher.",
                correct="He is both a doctor and a researcher.",
                note="After 'both...and', parallel noun phrases are expected.",
            ),
        ],
        related=["cleft-sentences", "emphatic-structures-b2", "syntactic-variety"],
    ),
    GrammarTopic(
        slug="passive-constructions-advanced",
        title="Passive Voice: Advanced Constructions (get-passive, double passive)",
        level="C1",
        category="Passive Voice",
        summary="Master the get-passive for informal contexts and understand complex passive patterns.",
        explanation="**Get-passive** — used in informal English instead of 'be' passive:\n- *He got fired.* (instead of 'He was fired')\n- *My phone got stolen.*\n\nThe get-passive often implies something negative or unexpected, but not always:\n- *She got promoted!* (positive)\n\n**Double passive** — two passive verbs in sequence (very formal):\n- *The documents are expected to be signed tomorrow.*\n- *The project was ordered to be completed by Friday.*\n\n**Passive with prepositions:**\n- *His work has been commented on by many critics.*\n- *Her request was turned down.* (phrasal verb in passive)",
        rules=[
            "'Get-passive' is informal and common in spoken English.",
            "'Get-passive' often (but not always) implies something unexpected or undesirable.",
            "Double passives are formal and should be used sparingly.",
            "Phrasal verbs can go into the passive: the whole verb stays together.",
        ],
        examples=[
            GrammarExample(
                text="I got caught in the rain without an umbrella.", note="informal, negative"
            ),
            GrammarExample(
                text="She got promoted after only six months.", note="informal, positive"
            ),
            GrammarExample(
                text="The contract is expected to be signed by the end of the week.",
                note="double passive",
            ),
            GrammarExample(
                text="His proposal was turned down by the committee.", note="phrasal verb passive"
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="He was gotten fired.",
                correct="He got fired. (or) He was fired.",
                note="Don't mix 'be' and 'get' passives. Use one or the other.",
            ),
            GrammarMistake(
                wrong="She got promote last month.",
                correct="She got promoted last month.",
                note="After 'got' in the passive, use the past participle.",
            ),
        ],
        related=["passive-voice-simple", "passive-modals", "passive-reporting-verbs"],
    ),
    GrammarTopic(
        slug="reported-speech-patterns",
        title="Reported Speech: Advanced Reporting Patterns",
        level="C1",
        category="Reported Speech",
        summary="Handle complex reporting situations: embedded reports, multiple layers, and free indirect speech.",
        explanation="Advanced reported speech goes beyond single-level backshifting:\n\n**Embedded reporting** — reporting what someone reported:\n- *She told me that he had said he was leaving.*\n\n**Multiple backshifts across layers:**\nDirect: *John said, 'I told her, \"I will help you.\"'*\nReported: *John said that he had told her that he would help her.*\n\n**Free indirect speech** — blending narrator's voice with character's thoughts (literary):\n- *She looked at the clock. Was it really midnight already? How had the time passed so quickly?* (the questions are her thoughts)\n\n**Maintaining register across reported speech:**\n- Match the formality of the original in your reporting verb choice.",
        rules=[
            "Each layer of reporting requires its own backshift.",
            "Free indirect speech drops 'she thought that...' and presents thoughts directly.",
            "Use a variety of reporting verbs appropriate to the register.",
            "In long reported passages, you can sometimes stop backshifting if the time reference is clear.",
        ],
        examples=[
            GrammarExample(
                text="She explained that the manager had told her that the project was behind schedule.",
                note="two-layer backshift",
            ),
            GrammarExample(
                text="He stood at the window. Why had she not called? Something must have happened.",
                note="free indirect speech",
            ),
            GrammarExample(
                text="The witness maintained that she had seen the suspect leave the building."
            ),
            GrammarExample(
                text="The article alleged that the minister had known about the payments all along."
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="He said that he told her that he will help.",
                correct="He said that he had told her that he would help.",
                note="Each layer of reporting needs its own backshift.",
            ),
        ],
        related=["reported-speech", "reported-speech-reporting-verbs", "distancing-language"],
    ),
    GrammarTopic(
        slug="complex-prepositional-phrases",
        title="Complex Prepositional Phrases (in accordance with, on behalf of)",
        level="C1",
        category="Prepositions",
        summary="Use multi-word prepositional phrases for formal and precise expression.",
        explanation="Complex prepositions consist of two or more words and are typical of formal and academic English:\n\n| Phrase | Meaning | Example |\n|--------|---------|--------|\n| in accordance with | following (rules) | *in accordance with the regulations* |\n| on behalf of | representing | *on behalf of the company* |\n| in relation to | about, concerning | *in relation to your enquiry* |\n| with regard to | about | *with regard to the proposal* |\n| by means of | using | *communicate by means of email* |\n| in terms of | from the perspective of | *in terms of cost* |\n| in spite of / despite | although (something happened) | *in spite of the rain* |\n| as a result of | because of | *as a result of the strike* |\n| in addition to | also, besides | *in addition to her salary* |\n| with the exception of | except | *with the exception of Mondays* |",
        rules=[
            "Complex prepositions are more formal — use them in academic, professional, and legal writing.",
            "They are followed by a noun, noun phrase, or -ing form.",
            "Many can be replaced by simpler alternatives in everyday English (about, because of, despite).",
            "Be careful not to confuse similar-sounding phrases (in regard to / with regard to).",
        ],
        examples=[
            GrammarExample(text="The work was carried out in accordance with safety guidelines."),
            GrammarExample(text="I am writing on behalf of the residents' association."),
            GrammarExample(text="In terms of customer satisfaction, this has been our best year."),
            GrammarExample(
                text="The event was canceled as a result of the severe weather warning."
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="In regards to your question...",
                correct="With regard to your question... (or) Regarding your question...",
                note="It is 'with regard to' (singular), not 'in regards to'.",
            ),
            GrammarMistake(
                wrong="Despite of the difficulties, we succeeded.",
                correct="Despite the difficulties, we succeeded. (or) In spite of the difficulties...",
                note="'Despite' is not followed by 'of'. 'In spite of' is.",
            ),
        ],
        related=["prepositions-place", "dependent-prepositions", "complex-prepositions-c2"],
    ),
    GrammarTopic(
        slug="articles-subtle-distinctions",
        title="Articles: Subtle Distinctions (a/an vs the vs zero in context)",
        level="C1",
        category="Articles",
        summary="Master the subtle article choices that change meaning in nuanced ways.",
        explanation="At advanced levels, article choice can subtly shift meaning:\n\n**a/an vs the — first mention vs shared knowledge:**\n- *I saw a film last night.* (first mention — you don't know which one)\n- *The film was terrible.* (now we both know which one)\n\n**a/an vs zero — job titles and roles:**\n- *She is a teacher.* (one of many)\n- *She is head of department.* (unique role → no article)\n\n**the vs zero — specific vs general:**\n- *I love the music of Beethoven.* (specific composer's music)\n- *I love music.* (music in general)\n\n**the with proper nouns:**\n- No article: *England, London, Mount Everest*\n- 'The': *the United Kingdom, the Netherlands, the Alps, the River Thames*",
        rules=[
            "Unique roles in an organisation take no article: 'She is CEO', 'He was elected president'.",
            "'The' with plural country names: the Philippines, the United States, the Maldives.",
            "'The' with rivers, seas, oceans, mountain ranges: the Thames, the Atlantic, the Alps.",
            "No article for individual mountains, lakes, or most countries: Lake Geneva, Mount Fuji, France.",
        ],
        examples=[
            GrammarExample(
                text="She was appointed chair of the committee.", note="unique role — no article"
            ),
            GrammarExample(text="We sailed across the Atlantic in a small boat."),
            GrammarExample(
                text="I visited Lake Como last summer.", note="individual lake — no article"
            ),
            GrammarExample(text="The United Arab Emirates is a federation of seven emirates."),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="I visited the France last year.",
                correct="I visited France last year.",
                note="Most country names take no article.",
            ),
            GrammarMistake(
                wrong="She is a head of marketing.",
                correct="She is head of marketing.",
                note="Unique job titles in an organisation take no article.",
            ),
        ],
        related=["articles", "articles-advanced-b1", "articles-specific-generic"],
    ),
    GrammarTopic(
        slug="complex-noun-phrases",
        title="Complex Noun Phrases (pre-modification & post-modification)",
        level="C1",
        category="Nouns",
        summary="Build sophisticated noun phrases with multiple layers of modification before and after the head noun.",
        explanation="Complex noun phrases pack a lot of information around a head noun:\n\n**Pre-modification** (before the noun):\n- Determiners + adjectives + nouns used as adjectives\n- *the three large wooden dining tables*\n- *a rapidly growing technology sector*\n\n**Post-modification** (after the noun):\n- Prepositional phrases: *the house on the corner*\n- Relative clauses: *the woman who lives next door*\n- Participle clauses: *the data collected during the survey*\n- Infinitive clauses: *the first person to arrive*\n\n**Combining both:**\n- *The recently published government report on climate change, which has been widely debated*\n\nThis is essential for academic and professional writing.",
        rules=[
            "Pre-modifiers come before the noun; post-modifiers come after.",
            "Limit pre-modification to 3-4 elements for readability.",
            "Use post-modification (especially relative clauses) for longer descriptions.",
            "Varied use of pre- and post-modification makes writing more sophisticated.",
        ],
        examples=[
            GrammarExample(text="The newly elected chair of the board announced her resignation."),
            GrammarExample(
                text="Students experiencing financial difficulties may apply for a grant.",
                note="post-modification with participle clause",
            ),
            GrammarExample(
                text="A detailed analysis of the data collected during the three-year study",
                note="pre + post modification",
            ),
            GrammarExample(
                text="The first person to solve the puzzle wins a prize.",
                note="post-modification with infinitive",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="The people living in the village which is near the river that flows to the sea...",
                correct="The people living in the village near the river that flows to the sea...",
                note="Avoid excessive relative clause nesting — simplify where possible.",
            ),
        ],
        related=["order-of-adjectives", "relative-clauses", "advanced-relative-clauses"],
    ),
    GrammarTopic(
        slug="phrasal-verbs-c1",
        title="Phrasal Verbs: Advanced Patterns (bring about, come across as)",
        level="C1",
        category="Phrasal Verbs",
        summary="Master advanced and formal phrasal verbs for academic and professional contexts.",
        explanation="Beyond everyday phrasal verbs, English has many that are formal or academic:\n\n| Phrasal Verb | Meaning | Register |\n|-------------|---------|----------|\n| bring about | cause to happen | formal |\n| carry out | conduct, perform | formal |\n| come across as | appear to be | neutral |\n| draw on | use as a resource | academic |\n| factor in | include in calculations | business |\n| phase out | gradually stop using | business |\n| rule out | exclude as a possibility | formal |\n| set out (to) | aim, intend | formal |\n| stem from | originate from | formal |\n| map out | plan in detail | business |\n\n**Verb + adverb + preposition (four-part):**\n- *We need to face up to the challenge.*\n- *She looks down on people without degrees.*",
        rules=[
            "Advanced phrasal verbs are often one-word Latin equivalents in informal → formal transitions.",
            "Pay attention to whether the verb is separable or inseparable.",
            "Four-part phrasal verbs are always inseparable.",
            "The register of phrasal verbs varies widely — from very informal to very formal.",
        ],
        examples=[
            GrammarExample(
                text="The new policy brought about significant changes in the industry."
            ),
            GrammarExample(text="Researchers carried out a series of experiments."),
            GrammarExample(text="He comes across as confident, but he is actually quite shy."),
            GrammarExample(
                text="Most of the current problems stem from poor planning in the early stages.",
                note="formal",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="The changes were brought by the new management.",
                correct="The changes were brought about by the new management.",
                note="Don't drop the particle — 'bring about' is a fixed meaning.",
            ),
            GrammarMistake(
                wrong="She carried the experiment out.",
                correct="She carried out the experiment.",
                note="With long objects, keep the verb and particle together.",
            ),
        ],
        related=["phrasal-verbs-b2", "phrasal-verbs-c2", "dependent-prepositions"],
    ),
    GrammarTopic(
        slug="adverbial-clauses-advanced",
        title="Adverbial Clauses (Advanced)",
        level="C1",
        category="Clauses",
        summary="Use sophisticated conjunctions to express concession, condition, and contrast at an advanced level.",
        explanation="Advanced adverbial clauses go beyond 'because' and 'when':\n\n**Concessive clauses** (acknowledging an opposing point):\n- *Much as I admire her work, I disagree with this decision.*\n- *Hard as he tried, he could not convince them.*\n- *While the plan has merits, it is too expensive.*\n\n**Conditional-concessive clauses** (even if):\n- *Even if you disagree, please listen to the end.*\n- *However hard you study, some exams are unpredictable.*\n\n**Clauses of manner (with unreal meaning):**\n- *He spoke as though he were the expert.* (he is not)\n\n**Inversion in adverbial clauses:**\n- *Try as I might, I cannot understand the problem.*",
        rules=[
            "'Much as' and 'adjective + as/though + subject + verb' are formal concessive patterns.",
            "'Even if' is stronger than 'although' — it means the condition doesn't matter.",
            "'As though' + past tense = unreal meaning.",
            "Inversion in concessive clauses is advanced and formal.",
        ],
        examples=[
            GrammarExample(text="Much as I would like to help, I simply don't have the time."),
            GrammarExample(text="Hard though she worked, she didn't get the promotion."),
            GrammarExample(text="Even if we leave now, we will still be late."),
            GrammarExample(
                text="Try as he might, he could not open the door.", note="inversion in concessive"
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="As much I like it, I can't afford it.",
                correct="Much as I like it, I can't afford it.",
                note="The pattern is 'Much as...', not 'As much...'.",
            ),
            GrammarMistake(
                wrong="However hard you will try...",
                correct="However hard you try...",
                note="After 'however', use present simple, not 'will'.",
            ),
        ],
        related=["adverbial-clauses", "advanced-concessive-structures", "inversion"],
    ),
    GrammarTopic(
        slug="modals-speculation-advanced",
        title="Modals: Speculation & Deduction (Advanced)",
        level="C1",
        category="Modals",
        summary="Express nuanced degrees of certainty about past, present, and future using advanced modal patterns.",
        explanation="At C1, speculation becomes more precise:\n\n**Past speculation continuum (most to least certain):**\n- *must have + past participle* — almost certain: *He must have left early.*\n- *will have + past participle* — confident assumption: *You will have heard the news by now.*\n- *may/might well have* — good possibility: *She may well have forgotten.*\n- *could have* — theoretical possibility: *He could have taken the wrong train.*\n- *might have* — weak possibility: *She might have misunderstood.*\n- *can't/couldn't have* — almost certain it didn't happen: *He can't have said that.*\n\n**Continuous forms for deduction in progress:**\n- *She must be working late.* (present)\n- *He must have been sleeping.* (past)\n\n**Future speculation:**\n- *should/ought to* — expectation: *The train should arrive on time.*\n- *may/might well* — probability: *It may well rain later.*",
        rules=[
            "'Must have' = strong positive deduction; 'can't have' = strong negative deduction.",
            "'Will have' expresses a confident assumption about the past or present.",
            "Use continuous forms when the speculated action is/was in progress.",
            "'Could have' can express both past possibility and past opportunity not taken.",
        ],
        examples=[
            GrammarExample(text="She must have been sleeping — she didn't hear the phone."),
            GrammarExample(
                text="You will have noticed the new system by now.", note="confident assumption"
            ),
            GrammarExample(
                text="He may well have decided not to come. It is typical of him.",
                note="good possibility",
            ),
            GrammarExample(
                text="They can't have received the invitation — they would have replied."
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="He must has forgotten.",
                correct="He must have forgotten.",
                note="After modals, use 'have' (not 'has') + past participle.",
            ),
            GrammarMistake(
                wrong="She mustn't be at work — it's Sunday.",
                correct="She can't be at work — it's Sunday.",
                note="For present negative deduction (it's impossible), use 'can't', not 'mustn't'. 'Mustn't' expresses prohibition.",
            ),
        ],
        related=["modals-deduction", "modal-perfects", "distancing-language"],
    ),
    GrammarTopic(
        slug="collocations",
        title="Collocations & Fixed Expressions",
        level="C1",
        category="Advanced",
        summary="Sound more natural by using words that commonly go together in English.",
        explanation="Collocations are pairs or groups of words that frequently occur together. Using them makes speech and writing sound natural:\n\n**Types of collocations:**\n\n| Type | Example |\n|------|--------|\n| Adjective + noun | *strong coffee* (not 'powerful coffee') |\n| Verb + noun | *make a decision* (not 'do a decision') |\n| Verb + adverb | *deeply regret* (not 'strongly regret') |\n| Adverb + adjective | *highly likely* (not 'strongly likely') |\n| Noun + noun | *a surge of anger* (not 'a jump of anger') |\n| Verb + preposition | *depend on* (not 'depend of') |\n\n**Common collocation pairs:**\n- do → homework, business, your best, the shopping\n- make → a decision, a mistake, progress, an effort\n- take → a break, a risk, responsibility, advantage of\n- have → a meal, a chat, a problem, an idea",
        rules=[
            "Collocations are arbitrary — they must be learned rather than deduced from logic.",
            "Mistakes in collocation often mark a speaker as non-native, even if grammar is perfect.",
            "Use a collocations dictionary or corpus to check natural word combinations.",
            "Pay special attention to 'do' vs 'make' and common verb + noun pairs.",
        ],
        examples=[
            GrammarExample(text="We need to make a decision by Friday.", note="make + decision"),
            GrammarExample(text="She did her best to finish on time.", note="do + best"),
            GrammarExample(
                text="There is a strong possibility of rain tomorrow.", note="strong + possibility"
            ),
            GrammarExample(
                text="He has a deep understanding of the subject.", note="deep + understanding"
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="We need to do a decision.",
                correct="We need to make a decision.",
                note="It is always 'make a decision', never 'do a decision'.",
            ),
            GrammarMistake(
                wrong="She has a big knowledge of history.",
                correct="She has a broad knowledge of history.",
                note="With 'knowledge', use 'broad', 'extensive', or 'deep', not 'big'.",
            ),
        ],
        related=["discourse-connectors-b1", "discourse-markers", "phrasal-verbs-c1"],
    ),
    GrammarTopic(
        slug="gradable-non-gradable",
        title="Gradable & Non-Gradable Adjectives",
        level="C1",
        category="Adjectives & Adverbs",
        summary="Know which adjectives can be modified by 'very' and which require stronger intensifiers.",
        explanation="**Gradable adjectives** describe qualities that can vary in degree. They work with 'very', 'quite', 'a bit':\n- *very cold, quite interesting, a bit tired*\n\n**Non-gradable adjectives** describe extreme or absolute qualities. They do NOT work with 'very':\n\n| Type | Intensifier | Example |\n|------|------------|--------|\n| Extreme | absolutely, completely, utterly | *absolutely furious* (not 'very furious') |\n| Absolute | completely, totally, entirely | *completely wrong* (not 'very wrong') |\n| Classifying | — (no intensifier) | *a wooden table* (not 'very wooden') |\n\n**Common non-gradable adjectives:** furious (= very angry), boiling (= very hot), freezing (= very cold), exhausted (= very tired), starving (= very hungry), delighted (= very pleased), terrified (= very scared), impossible, unique, dead, perfect\n\n**Note:** 'Very unique' is incorrect — something is either unique or it isn't.",
        rules=[
            "Gradable adjectives: use 'very', 'quite', 'a bit', 'extremely'.",
            "Non-gradable/extreme adjectives: use 'absolutely', 'completely', 'utterly', 'totally'.",
            "Absolute adjectives (perfect, unique, impossible, dead) cannot be modified by degree adverbs.",
            "Some adjectives can be both gradable and non-gradable depending on context.",
        ],
        examples=[
            GrammarExample(
                text="It is absolutely freezing outside.", note="freezing = non-gradable"
            ),
            GrammarExample(text="She was utterly exhausted after the marathon."),
            GrammarExample(
                text="The film was very good, but not perfect.", note="gradable + absolute"
            ),
            GrammarExample(text="This vase is completely unique — there is nothing else like it."),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="It is very boiling in here.",
                correct="It is absolutely boiling in here.",
                note="'Boiling' is non-gradable — use 'absolutely', not 'very'.",
            ),
            GrammarMistake(
                wrong="This is a very unique opportunity.",
                correct="This is a unique opportunity. (or) This is a very rare opportunity.",
                note="'Unique' means one of a kind — it cannot be 'very unique'.",
            ),
        ],
        related=["intensifiers-downtoners", "so-such", "too-enough"],
    ),
    GrammarTopic(
        slug="intensifiers-downtoners",
        title="Intensifiers & Downtoners (utterly, fairly, somewhat)",
        level="C1",
        category="Adjectives & Adverbs",
        summary="Control the strength of adjectives and adverbs with a range of intensifying and softening words.",
        explanation="Intensifiers increase and downtoners decrease the strength:\n\n**Intensifiers (making stronger):**\n| Weak | Strong | Example |\n|------|--------|--------|\n| very | extremely, incredibly, exceptionally | *incredibly talented* |\n| — | utterly, completely, totally | *completely wrong* |\n| — | remarkably, strikingly, astonishingly | *remarkably calm* |\n\n**Downtoners (making weaker):**\n| Word | Meaning | Example |\n|------|---------|--------|\n| fairly, quite | moderately | *fairly good* |\n| rather | more than expected | *rather difficult* |\n| somewhat | a little | *somewhat surprised* |\n| slightly, a bit | a small amount | *slightly different* |\n| relatively, comparatively | compared to others | *relatively easy* |\n\n**Note:** In British English, 'quite' can mean both 'fairly' and 'completely' depending on context: *quite good* (fairly good) vs. *quite impossible* (completely impossible).",
        rules=[
            "Use stronger intensifiers with non-gradable adjectives.",
            "'Rather' often implies something unexpected or a personal opinion.",
            "'Quite' has different meanings with gradable (fairly) and non-gradable (completely) adjectives.",
            "Downtoners are useful for making criticism more polite.",
        ],
        examples=[
            GrammarExample(text="The results were remarkably consistent across all groups."),
            GrammarExample(
                text="I was somewhat disappointed by the ending.", note="polite criticism"
            ),
            GrammarExample(
                text="It is rather cold today, don't you think?", note="more than expected"
            ),
            GrammarExample(text="The task was relatively straightforward, given the instructions."),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="It was slightly amazing.",
                correct="It was fairly amazing. (or) It was somewhat impressive.",
                note="'Slightly' weakens — it doesn't work well with extreme positive words like 'amazing'.",
            ),
            GrammarMistake(
                wrong="The movie was very impossible to understand.",
                correct="The movie was quite impossible to understand.",
                note="With non-gradable adjectives like 'impossible', use 'quite' (= completely) rather than 'very'.",
            ),
        ],
        related=["gradable-non-gradable", "adverbs-manner", "so-such"],
    ),
    GrammarTopic(
        slug="noun-clauses",
        title="Noun Clauses (that-clauses, wh-clauses as subject/object)",
        level="C1",
        category="Clauses",
        summary="Use entire clauses as subjects, objects, or complements within sentences.",
        explanation="A noun clause is a clause that functions as a noun within a sentence:\n\n**That-clauses:**\n- As subject: *That she resigned surprised everyone.*\n- As object: *I believe that he is innocent.*\n- As complement: *The problem is that we have no money.*\n\n**Wh-clauses:**\n- As subject: *What she said was shocking.*\n- As object: *I don't know where he went.*\n- As complement: *The question is why he left.*\n\n**If/whether clauses:**\n- *I wonder whether she will come.*\n- *It doesn't matter if you don't know.*\n\n**Note:** That-clauses as subjects are formal — it is more common to use 'It' as a dummy subject: *It surprised everyone that she resigned.*",
        rules=[
            "Noun clauses can function as subject, object, or complement.",
            "That-clauses as subjects sound formal; use 'It' + that-clause for a more natural style.",
            "After prepositions, only wh-clauses and whether-clauses are possible, not that-clauses.",
            "Question word order is NOT used in wh-noun clauses: 'I don't know where he is' (not 'where is he').",
        ],
        examples=[
            GrammarExample(
                text="What the report reveals is deeply concerning.", note="wh-clause as subject"
            ),
            GrammarExample(text="I am not sure whether the figures are accurate."),
            GrammarExample(
                text="That the project was completed on time is a testament to the team's effort."
            ),
            GrammarExample(
                text="It is widely accepted that climate change requires urgent action.",
                note="dummy 'it'",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="I don't know where is she.",
                correct="I don't know where she is.",
                note="Noun clauses use normal word order, not question word order.",
            ),
            GrammarMistake(
                wrong="I am not sure about that he is telling the truth.",
                correct="I am not sure that he is telling the truth. (or) I am not sure about whether he is telling the truth.",
                note="'About' + that-clause is not possible; drop the preposition or use 'whether'.",
            ),
        ],
        related=["indirect-questions", "cleft-sentences", "complex-noun-phrases"],
    ),
    GrammarTopic(
        slug="possessive-s-advanced",
        title="Possessive 's: Advanced Uses (time expressions, double genitive)",
        level="C1",
        category="Nouns",
        summary="Use the possessive 's beyond ownership — for time, place, measurement, and the double genitive.",
        explanation="The possessive 's has many uses beyond ownership:\n\n**Time expressions:**\n- *a week's vacation, three hours' delay, yesterday's news*\n\n**Place and organisations:**\n- *London's transport system, the company's policy*\n\n**Measurement:**\n- *a kilo's worth of apples, a stone's throw away*\n\n**Double genitive (of + possessive):**\n- *a friend of mine* (= one of my friends)\n- *a colleague of Sarah's* (= one of Sarah's colleagues)\n- *that idea of yours* (= that idea you had)\n\nThe double genitive is used when the noun is indefinite (a/an/some/that + noun + of + possessive).\n\n**With 's or of?**\n- People and animals → preferably 's: *John's car*\n- Things and abstract concepts → preferably of: *the roof of the house*",
        rules=[
            "Use 's for people, animals, time expressions, and organisations.",
            "Use 'of' for inanimate objects and abstract concepts.",
            "The double genitive (a friend of mine) is required with 'a/an/some/that + noun' when it is one of several.",
            "Time expressions with numbers always use 's: two weeks' notice, ten minutes' walk.",
        ],
        examples=[
            GrammarExample(text="I have three weeks' vacation this year.", note="time expression"),
            GrammarExample(text="She is a colleague of my father's.", note="double genitive"),
            GrammarExample(text="That idea of yours is brilliant!", note="double genitive"),
            GrammarExample(
                text="The roof of the building needs repairing.", note="of for inanimate objects"
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="She is a friend of me.",
                correct="She is a friend of mine.",
                note="After 'a friend of', use a possessive pronoun, not an object pronoun.",
            ),
            GrammarMistake(
                wrong="I have two week's vacation.",
                correct="I have two weeks' vacation.",
                note="With plural time expressions, the apostrophe goes after the 's'.",
            ),
        ],
        related=["possessive-adjectives", "possessive-pronouns", "complex-noun-phrases"],
    ),
    GrammarTopic(
        slug="word-formation",
        title="Word Formation (Prefixes, Suffixes & Conversion)",
        level="C1",
        category="Vocabulary",
        summary="Expand your vocabulary systematically by understanding how words are built from prefixes, suffixes, and conversion.",
        structure="prefix + root · root + suffix · conversion (zero derivation)",
        explanation=(
            "**Word formation** allows you to derive new words from existing ones.\n\n"
            "**1. Prefixes** (added to the front):\n\n"
            "| Prefix | Meaning | Examples |\n"
            "|--------|---------|----------|\n"
            "| un-, in-, im-, ir-, il- | not | *unhappy, incomplete, impossible* |\n"
            "| re- | again | *rewrite, reconsider, rebuild* |\n"
            "| over-, under- | too much / too little | *overestimate, underfund* |\n"
            "| mis- | wrongly | *misunderstand, mislead* |\n"
            "| pre-, post- | before / after | *predate, postwar* |\n"
            "| co-, inter- | together / between | *cooperate, international* |\n\n"
            "**2. Suffixes** (added to the end):\n\n"
            "| Suffix | Creates | Examples |\n"
            "|--------|---------|----------|\n"
            "| -tion/-sion | noun | *communication, decision* |\n"
            "| -ment | noun | *development, achievement* |\n"
            "| -ity/-ness | noun | *complexity, happiness* |\n"
            "| -ive/-ful/-less | adjective | *creative, useful, careless* |\n"
            "| -ize/-ify | verb | *modernize, simplify* |\n"
            "| -ly | adverb | *significantly, carefully* |\n\n"
            "**3. Conversion (zero derivation):** Using a word as a different part of speech:\n"
            "- *to text* (verb from noun), *to Google* (verb from proper noun)\n"
            "- *a must* (noun from modal), *a download* (noun from verb)"
        ),
        rules=[
            "Prefixes change meaning but not word class; suffixes typically change word class.",
            "Watch for spelling changes: happy → happiness (y→i), advise → advisory.",
            "Some prefixes change form: in- → im- (impossible), il- (illegal), ir- (irregular).",
            "Conversion is productive in English — most nouns can become verbs informally.",
            "American English uses -ize (organize, realize) while British uses -ise.",
        ],
        examples=[
            GrammarExample(text="The mismanagement of resources led to the project's failure.", note="mis- prefix + -ment suffix"),
            GrammarExample(text="The government has decided to decriminalize possession of small quantities.", note="de- + criminalize"),
            GrammarExample(text="The unpredictability of the outcome caused considerable anxiety.", note="un- + predict + -ability"),
            GrammarExample(text="She emailed the report. / Can you text me the address?", note="conversion: noun → verb"),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="The situation is completly impossibe.",
                correct="The situation is completely impossible.",
                note="Adverb suffix is -ly (completely); negative prefix in- becomes im- before p (impossible).",
            ),
            GrammarMistake(
                wrong="She is very knowledgable about the subject.",
                correct="She is very knowledgeable about the subject.",
                note="The e is retained before -able in 'knowledgeable'.",
            ),
        ],
        related=["nominalization", "collocations", "american-spelling"],
    ),
]