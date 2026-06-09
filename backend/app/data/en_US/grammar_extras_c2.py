"""English grammar topics — C2 additional."""

from app.data._types import GrammarExample, GrammarMistake, GrammarTopic

C2_GRAMMAR_TOPICS: list[GrammarTopic] = [
    GrammarTopic(
        slug="complex-prepositions-c2",
        title="Complex Prepositions (in light of, with regard to, by virtue of)",
        level="C2",
        category="Prepositions",
        summary="Master formal multi-word prepositions for sophisticated academic and professional writing.",
        explanation="C2-level complex prepositions express precise logical relationships:\n\n| Phrase | Meaning | Example |\n|--------|---------|--------|\n| in light of | considering (new information) | *In light of recent events, we are reviewing our policy.* |\n| by virtue of | because of (a quality or position) | *She was invited by virtue of her expertise.* |\n| at the expense of | harming or sacrificing something | *Growth at the expense of the environment is unsustainable.* |\n| in the wake of | following (usually something bad) | *In the wake of the scandal, several ministers resigned.* |\n| with a view to | with the intention of | *We met with a view to resolving the dispute.* |\n| in lieu of | instead of | *She took extra vacation in lieu of overtime pay.* |\n| on the grounds of | because of (a stated reason) | *He was dismissed on the grounds of gross misconduct.* |\n| in pursuance of | in order to achieve (legal) | *in pursuance of the objectives set out in the treaty* |",
        rules=[
            "Complex prepositions are characteristic of very formal, academic, and legal writing.",
            "They express precise logical and causal relationships.",
            "Many have near-synonyms among simpler prepositions but carry more specific connotations.",
            "Avoid overusing them — too many complex prepositions can make text feel heavy.",
        ],
        examples=[
            GrammarExample(text="In light of the new evidence, the case was reopened."),
            GrammarExample(
                text="By virtue of his position, he had access to confidential information."
            ),
            GrammarExample(text="In the wake of the crisis, new regulations were introduced."),
            GrammarExample(text="The meeting was arranged with a view to finding a compromise."),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="At the light of the new data...",
                correct="In light of the new data...",
                note="The fixed phrase is 'in light of', not 'at the light of'.",
            ),
            GrammarMistake(
                wrong="By virtue of he was the boss...",
                correct="By virtue of being the boss... (or) By virtue of his position as boss...",
                note="After complex prepositions, use a noun phrase or -ing form, not a clause.",
            ),
        ],
        related=["complex-prepositional-phrases", "dependent-prepositions", "register-and-style"],
    ),
    GrammarTopic(
        slug="syntactic-variety",
        title="Syntactic Variety & Sentence Craft",
        level="C2",
        category="Advanced",
        summary="Vary sentence structure deliberately for rhythm, emphasis, and reader engagement at the highest level.",
        explanation="At C2, sentence structure becomes a conscious stylistic choice:\n\n**Sentence types to vary:**\n1. **Simple:** for impact and clarity: *The experiment failed.*\n2. **Compound:** for balance: *The experiment failed, but the team learned from it.*\n3. **Complex:** for nuance: *Although the experiment failed, the data proved invaluable.*\n4. **Compound-complex:** for layered reasoning.\n\n**Techniques for variety:**\n- **Fronting:** moving elements to the start for emphasis: *Never before had she felt so alive.*\n- **Periodic sentences:** building suspense until the main clause at the end.\n- **Cumulative sentences:** starting with the main clause and adding details.\n- **Fragments:** for dramatic effect (use sparingly): *A complete disaster.*\n\n**Sentence length:** alternate long, detailed sentences with short, punchy ones for rhythm.",
        rules=[
            "Vary sentence openings — don't start every sentence with the subject.",
            "Use short sentences for impact after a series of longer ones.",
            "Match sentence structure to content: complex ideas → layered sentences; strong opinions → short, direct sentences.",
            "Read your writing aloud to check rhythm and flow.",
        ],
        examples=[
            GrammarExample(
                text="The data was clear. The board was unanimous. The decision was made.",
                note="short sentences for impact",
            ),
            GrammarExample(
                text="Only after months of negotiation, countless setbacks, and one last-minute breakthrough did the deal finally succeed.",
                note="periodic sentence building suspense",
            ),
            GrammarExample(
                text="The project collapsed — a victim of poor planning, inadequate funding, and a fundamental misunderstanding of the market.",
                note="cumulative sentence adding detail",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="The report was long. The report was boring. The report was ignored.",
                correct="Long, boring, and ultimately ignored, the report failed to make any impact.",
                note="Vary structure instead of repeating the same sentence pattern.",
            ),
        ],
        related=["fronting-emphasis", "inversion", "parallelism", "coherence-cohesion"],
    ),
    GrammarTopic(
        slug="idiomatic-expressions",
        title="Idiomatic Expressions in Formal Contexts",
        level="C2",
        category="Advanced",
        summary="Navigate the fine line between idiomatic fluency and appropriate register in formal settings.",
        explanation="At C2, you must judge when idioms enhance and when they undermine your message:\n\n**Idioms suitable for formal/professional use:**\n- *The elephant in the room* — an obvious problem nobody wants to discuss\n- *A double-edged sword* — something with both advantages and disadvantages\n- *To level the playing field* — to make things fair\n- *To take stock of* — to assess or review the situation\n- *A tipping point* — the moment of critical change\n- *To hold water* — to be valid or logical (usually negative: doesn't hold water)\n- *Par for the course* — what is normal or expected\n\n**Idioms to avoid in formal writing:**\n- Very informal: *a piece of cake, over the moon, drive me up the wall*\n- Clichéd: *at the end of the day, when all is said and done*",
        rules=[
            "In formal writing, use idioms sparingly and only those that are widely understood.",
            "Avoid clichés — they weaken your argument and suggest lazy thinking.",
            "Business English tolerates some idioms; academic English tolerates very few.",
            "When in doubt, opt for plain, precise language over an idiom.",
        ],
        examples=[
            GrammarExample(
                text="The report highlighted the elephant in the room: our declining market share.",
                note="acceptable in business",
            ),
            GrammarExample(
                text="Social media is a double-edged sword for political campaigns.",
                note="widely accepted",
            ),
            GrammarExample(
                text="The argument doesn't hold water when you examine the data closely.",
                note="common in analysis",
            ),
            GrammarExample(
                text="It is time to take stock of our achievements and set new goals.",
                note="professional context",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="At the end of the day, the results speak for themselves.",
                correct="Ultimately, the results speak for themselves.",
                note="'At the end of the day' is an overused cliché — avoid it in formal writing.",
            ),
        ],
        related=["register-and-style", "metaphorical-language", "rhetorical-devices"],
    ),
    GrammarTopic(
        slug="metaphorical-language",
        title="Metaphorical & Figurative Language",
        level="C2",
        category="Advanced",
        summary="Use metaphor, simile, and analogy to make abstract ideas concrete and persuasive.",
        explanation="Figurative language makes writing more vivid and memorable:\n\n**Metaphor** — saying one thing IS another:\n- *The housing market is a bubble waiting to burst.*\n- *She has a heart of stone.*\n\n**Simile** — comparing with 'like' or 'as':\n- *The information spread like wildfire.*\n- *He was as cool as a cucumber under pressure.*\n\n**Extended metaphor** — a metaphor developed over multiple sentences or paragraphs:\n- *The company was a ship in stormy seas. The CEO was the captain, the staff were the crew, and the new strategy was their compass.*\n\n**Analogy** — explaining something by comparing it to something more familiar:\n- *The human brain is like a computer — it processes information, stores memories, and can be 'programd' through learning.*",
        rules=[
            "Use metaphor to make abstract or complex ideas more accessible.",
            "Avoid mixed metaphors: 'We need to grasp the nettle and run with it.' (grasping a nettle and running don't mix).",
            "Extended metaphors need consistent imagery throughout — don't switch images halfway.",
            "In formal writing, use metaphor deliberately and sparingly — one well-chosen metaphor is powerful; many are distracting.",
        ],
        examples=[
            GrammarExample(
                text="The investigation opened a Pandora's box of corruption allegations.",
                note="classical allusion / metaphor",
            ),
            GrammarExample(
                text="Her words cut through the tension in the room like a knife through butter.",
                note="simile",
            ),
            GrammarExample(
                text="Education is the key that unlocks the door to opportunity, but that key must be forged in well-funded schools by dedicated teachers.",
                note="extended metaphor",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="We need to grab the bull by the horns and not rock the boat.",
                correct="We need to grab the bull by the horns. (or) We need to be careful not to rock the boat.",
                note="Mixed metaphor — grabbing a bull doesn't mix with boats. Pick one image.",
            ),
        ],
        related=["rhetorical-devices", "idiomatic-expressions", "syntactic-variety"],
    ),
    GrammarTopic(
        slug="irony-understatement",
        title="Irony, Understatement & Litotes",
        level="C2",
        category="Advanced",
        summary="Master ironic and understated expression — essential for truly native-like communication.",
        explanation="These devices say one thing but mean another, often for humor, politeness, or rhetorical effect:\n\n**Verbal irony** — saying the opposite of what you mean:\n- *What a beautiful day!* (during a thunderstorm)\n\n**Understatement** — making something seem less important than it is:\n- *The Atlantic is quite a big pond.* (deliberately trivial)\n- *Einstein had a decent brain.*\n\n**Litotes** — using a negative to express a positive, usually for understatement:\n- *She is not unkind.* (= She is actually kind)\n- *The results are not insignificant.* (= They are very significant)\n- *He was not a little annoyed.* (= He was very annoyed)\n\n**Sarcasm** — irony intended to mock or hurt:\n- *Oh brilliant, another meeting. Just what I needed.*",
        rules=[
            "Irony relies heavily on tone of voice — be careful in writing where tone is ambiguous.",
            "Understatement and litotes are characteristic of British English style.",
            "Litotes ('not unkind') is less direct than a positive statement — it can sound more diplomatic.",
            "Sarcasm in professional writing is almost always inappropriate.",
        ],
        examples=[
            GrammarExample(
                text="The CEO's salary is not exactly modest.", note="litotes = it is very high"
            ),
            GrammarExample(
                text="Winning the World Cup was a not inconsiderable achievement.",
                note="litotes = a huge achievement",
            ),
            GrammarExample(
                text="He is not the most punctual person I know.",
                note="understatement = he is always late",
            ),
            GrammarExample(
                text="The test was challenging, to put it mildly.", note="understatement for effect"
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="She is not not beautiful.",
                correct="She is not unattractive. (or simply) She is beautiful.",
                note="A double negative (not + not) is confusing. Litotes uses 'not + negative adjective'.",
            ),
        ],
        related=["hedging-stance-advanced", "rhetorical-devices", "register-and-style"],
    ),
    GrammarTopic(
        slug="phrasal-verbs-c2",
        title="Phrasal Verbs: Idiomatic & Polysemous Usage",
        level="C2",
        category="Phrasal Verbs",
        summary="Master phrasal verbs with multiple meanings and idiomatic uses that only become clear in context.",
        explanation="At C2, many phrasal verbs have multiple, often unrelated meanings:\n\n**take off**\n1. Remove clothing: *Take off your coat.*\n2. Depart (plane): *The flight took off on time.*\n3. Become successful: *Her career really took off.*\n4. Imitate humorously: *He can take off the president perfectly.*\n\n**come across**\n1. Find by chance: *I came across an old photo.*\n2. Make an impression: *She comes across as very confident.*\n\n**get through**\n1. Finish: *I got through a lot of work today.*\n2. Survive: *We got through the crisis together.*\n3. Make contact: *I couldn't get through to her on the phone.*\n4. Pass an exam: *She got through the test easily.*\n\n**break down**\n1. Stop working: *The car broke down.*\n2. Analyse: *Let me break down the figures for you.*\n3. Lose emotional control: *She broke down in tears.*\n4. Decompose: *The material breaks down over time.*",
        rules=[
            "Context determines the meaning of polysemous phrasal verbs.",
            "Listen for the surrounding words and the overall situation to disambiguate.",
            "One phrasal verb can have both literal and idiomatic meanings.",
            "The particle often gives a clue: 'off' = removal/departure, 'through' = completion/survival, 'down' = failure/collapse.",
        ],
        examples=[
            GrammarExample(
                text="The business took off after they secured their first major client.",
                note="became successful",
            ),
            GrammarExample(
                text="I came across this article while I was researching the topic.",
                note="found by chance",
            ),
            GrammarExample(
                text="She broke down the complex problem into manageable steps.", note="analyzed"
            ),
            GrammarExample(
                text="We got through the recession by cutting costs and diversifying.",
                note="survived",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="I couldn't understand what he was trying to say — he broke down.",
                correct="I couldn't understand — his explanation broke down at several points.",
                note="'Break down' can mean 'cease to function logically', but not 'become incomprehensible' directly.",
            ),
        ],
        related=["phrasal-verbs-c1", "phrasal-verbs-b2", "collocations"],
    ),
    GrammarTopic(
        slug="text-level-cohesion",
        title="Text-Level Cohesion & Thematic Progression",
        level="C2",
        category="Advanced",
        summary="Control how information flows across paragraphs using thematic progression patterns.",
        explanation="At text level, cohesion means how sentences and paragraphs link together across a whole document:\n\n**Thematic progression patterns:**\n\n1. **Linear progression** — the new information of one sentence becomes the topic of the next:\n*The company launched a new product. The product was developed over two years. Those two years involved...*\n\n2. **Constant topic** — the same topic is maintained across sentences:\n*The government announced new measures. It also revealed plans for tax reform. The government further pledged...*\n\n3. **Derived topics** — topics are derived from a superordinate theme:\n*The university has three faculties. The Faculty of Arts offers... The Faculty of Science specializes in...*\n\n**Cohesive ties across paragraphs:**\n- Opening sentences should link back to the previous paragraph.\n- Closing sentences should point forward or summarize.\n- Transition paragraphs can explicitly bridge two sections.",
        rules=[
            "Each paragraph opening should connect to what came before.",
            "Use a mix of progression patterns — constant topic for clarity, linear for narrative.",
            "Avoid sudden topic shifts without a transition.",
            "In long texts, signpost the structure: 'Having discussed X, we now turn to Y.'",
        ],
        examples=[
            GrammarExample(
                text="The article analyzes three key economic trends. The first of these is rising inflation. This trend has been...",
                note="derived topic progression",
            ),
            GrammarExample(
                text="The experiment produced unexpected results. These results challenge the prevailing theory. That theory had been widely accepted for decades.",
                note="linear progression",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Coffee production is declining. The government announced new measures. My neighbor grows tomatoes.",
                correct="Coffee production is declining. This decline has prompted the government to announce new measures to support farmers.",
                note="Each sentence should connect to the previous one — avoid non-sequiturs.",
            ),
        ],
        related=["coherence-cohesion", "discourse-markers", "syntactic-variety"],
    ),
    GrammarTopic(
        slug="allusion-reference",
        title="Allusion & Cultural Reference",
        level="C2",
        category="Advanced",
        summary="Use references to shared cultural knowledge to add depth and resonance to your writing.",
        explanation="Allusions are indirect references to well-known cultural elements — literature, history, mythology, the Bible, Shakespeare, pop culture:\n\n**Literary:** *This is his Achilles' heel.* (= a fatal weakness — from Greek mythology)\n**Historical:** *Avoiding another Munich.* (= avoiding appeasement that leads to war)\n**Biblical:** *a David and Goliath battle* (= an underdog fighting a giant)\n**Shakespeare:** *a pound of flesh* (= a cruel or unreasonable demand — from The Merchant of Venice)\n**Modern cultural:** *the Holy Grail of physics* (= the ultimate goal)\n\nAllusions assume shared knowledge. They add richness but can exclude readers unfamiliar with the reference.",
        rules=[
            "Use allusions that your audience will likely understand.",
            "An allusion should enhance meaning, not obscure it.",
            "Avoid overusing allusions — one or two well-placed ones are more effective.",
            "In international communication, be aware that cultural references may not translate.",
        ],
        examples=[
            GrammarExample(
                text="The new policy proved to be the company's Achilles' heel.",
                note="fatal weakness",
            ),
            GrammarExample(
                text="It was a David and Goliath struggle between the startup and the tech giant."
            ),
            GrammarExample(
                text="Finding a cure for the disease has become something of a Holy Grail for medical researchers.",
                note="ultimate, elusive goal",
            ),
            GrammarExample(
                text="The negotiations have become a Catch-22: you need experience to get the job, but a job to get experience."
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="This is her Achilles's heel.",
                correct="This is her Achilles' heel. (or) This is her Achilles heel.",
                note="The possessive is 'Achilles'' (pronounced like 'Achilles heel', no extra 's').",
            ),
        ],
        related=["idiomatic-expressions", "metaphorical-language", "register-and-style"],
    ),
    GrammarTopic(
        slug="hedging-stance-advanced",
        title="Hedging & Stance: Advanced Nuance",
        level="C2",
        category="Advanced",
        summary="Balance confidence and caution with precise hedging to convey your exact degree of certainty.",
        explanation="At C2, hedging is not about avoiding commitment — it is about precision:\n\n**Degrees of hedging (most certain to least):**\n- No hedge: *The results prove the hypothesis.*\n- Slight hedge: *The results strongly suggest that...*\n- Moderate hedge: *The results appear to indicate that...*\n- Strong hedge: *The results may tentatively be interpreted as...*\n\n**Advanced hedging techniques:**\n1. **Modal verbs:** might, could, may, would\n2. **Lexical verbs:** seem, appear, tend, suggest, indicate\n3. **Adverbs:** arguably, presumably, ostensibly, purportedly\n4. **Impersonal constructions:** *It could be argued that..., There is a case for...*\n5. **Attribution:** *According to..., As X argues...*\n\n**Stance** — expressing your attitude:\n- *Interestingly, surprisingly, worryingly*\n- *Fortunately, unfortunately, regrettably*\n- *Rightly or wrongly, paradoxically*",
        rules=[
            "Choose your hedge to match your actual certainty — don't over-hedge or under-hedge.",
            "In academic writing, hedge claims unless they are established facts.",
            "Stance adverbs at the start of a sentence signal your attitude to what follows.",
            "Over-hedging weakens writing; combine hedged claims with confident statements for balance.",
        ],
        examples=[
            GrammarExample(
                text="The data strongly suggests a correlation between the two variables."
            ),
            GrammarExample(
                text="It could be argued that the policy has had unintended consequences."
            ),
            GrammarExample(text="Arguably, this is the most significant discovery of the decade."),
            GrammarExample(
                text="Paradoxically, the measures intended to increase stability have had the opposite effect.",
                note="stance",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="The data definitely proves beyond any shadow of doubt that...",
                correct="The data provides strong evidence for the conclusion that...",
                note="Academic writing rarely uses absolute language — even strong evidence is not 'proof beyond doubt'.",
            ),
        ],
        related=["hedging-language", "distancing-language", "register-and-style"],
    ),
    GrammarTopic(
        slug="pragmatic-competence",
        title="Pragmatic Competence & Implicature",
        level="C2",
        category="Advanced",
        summary="Understand what is meant beyond what is literally said — reading between the lines in English.",
        explanation="**Pragmatic competence** is the ability to understand implied meaning (implicature) and use language appropriately in context:\n\n**Conversational implicature** — what is suggested but not stated:\n- A: *Are you coming to the party?*\n- B: *I have to work late.*\n  (Implicature: No, I can't come — but B never directly says 'no')\n\n**The Cooperative Principle** (Grice's Maxims):\n- Be informative, truthful, relevant, and clear.\n- When someone deliberately breaks a maxim, they are implying something.\n\n**Politeness strategies:**\n- Indirect requests: *It's a bit cold in here.* (= Please close the window)\n- Hedged criticism: *Perhaps next time we could consider a different approach.* (= That was wrong)\n\n**Context-dependent meaning:**\n- *Nice weather we're having.* (= This conversation is awkward — let's talk about something safe)",
        rules=[
            "English speakers often imply rather than state directly — learn to recognize indirectness.",
            "Indirectness is not dishonesty — it is often politeness.",
            "Consider the context: who is speaking, the relationship, and the situation.",
            "If unsure, respond to both the literal and implied meaning.",
        ],
        examples=[
            GrammarExample(
                text="A: 'Did you like the presentation?' B: 'The slides were very colorful.'",
                note="implicature: B didn't like the content but is being polite",
            ),
            GrammarExample(
                text="A: 'Shall we go for a walk?' B: 'It's raining.'",
                note="implicature: B doesn't want to go — the rain is an excuse or genuine reason",
            ),
            GrammarExample(
                text="'I was wondering if you might possibly have a moment to look at this.'",
                note="extremely polite indirect request",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="A: 'Can you pass the salt?' B: 'Yes.' (and does nothing)",
                correct="B should pass the salt — 'Can you pass the salt?' is a request, not a question about ability.",
                note="Take indirect requests as requests, not as literal questions.",
            ),
        ],
        related=["hedging-stance-advanced", "irony-understatement", "distancing-language"],
    ),
    GrammarTopic(
        slug="rhetorical-devices",
        title="Rhetorical Devices & Persuasion",
        level="C2",
        category="Advanced",
        summary="Deploy classical rhetorical techniques to make your arguments more compelling and memorable.",
        explanation="Rhetorical devices are tools of persuasion used in speeches, essays, and advertising:\n\n**Anaphora** — repeating words at the start of successive clauses:\n*We shall fight on the beaches. We shall fight on the landing grounds. We shall never surrender.*\n\n**Tricolon** — groups of three:\n*Life, liberty, and the pursuit of happiness.*\n*Veni, vidi, vici.* (I came, I saw, I conquered.)\n\n**Antithesis** — contrasting ideas in parallel structure:\n*It was the best of times, it was the worst of times.*\n*One small step for a man, one giant leap for mankind.*\n\n**Rhetorical questions** — questions asked for effect, not answers:\n*If not now, when? If not us, who?*\n\n**Chiasmus** — reversing the order of words:\n*Ask not what your country can do for you — ask what you can do for your country.*",
        rules=[
            "Use rhetorical devices intentionally — they should serve your argument, not decorate it.",
            "Tricolons are the most versatile: use them for conclusions, key points, and memorable phrases.",
            "Rhetorical questions engage the audience but should not be overused.",
            "Match the device to the occasion: anaphora for inspiration, antithesis for contrast, tricolons for emphasis.",
        ],
        examples=[
            GrammarExample(
                text="We need action, not words; solutions, not excuses; progress, not delay.",
                note="tricolon + antithesis",
            ),
            GrammarExample(
                text="Is this the future we want for our children? Is this the legacy we wish to leave?",
                note="anaphora + rhetorical questions",
            ),
            GrammarExample(text="To err is human; to forgive, divine.", note="antithesis"),
            GrammarExample(
                text="It is not the strongest of the species that survives, nor the most intelligent, but the one most responsive to change.",
                note="tricolon",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="We need to change, adapt, and we must evolve.",
                correct="We need to change, to adapt, and to evolve.",
                note="Rhetorical devices need parallel structure to be effective.",
            ),
        ],
        related=["syntactic-variety", "parallelism", "coherence-cohesion", "metaphorical-language"],
    ),
    GrammarTopic(
        slug="advanced-concessive-structures",
        title="Advanced Concessive Structures (Much as..., Adjective + though...)",
        level="C2",
        category="Advanced",
        summary="Concede a point with sophistication using inverted and formal concessive patterns.",
        explanation="Advanced concessive structures acknowledge an opposing view with elegance:\n\n**Inverted concession:**\n- *Much as I respect her opinion, I must disagree.* (= Although I respect her opinion a lot...)\n- *Hard as it is to believe, the story is true.*\n- *Try as he might, he could not solve the puzzle.*\n\n**Adjective/Adverb + as/though + subject + verb:**\n- *Talented though she is, she remains remarkably humble.*\n- *Strange as it may seem, I have never been to Paris.*\n- *Quickly though he ran, he missed the train.*\n\n**For all + noun phrase:**\n- *For all his wealth, he is deeply unhappy.* (= Despite his wealth...)\n- *For all the criticism, the policy has had some success.*\n\n**Be that as it may** — set phrase meaning 'despite that':\n- *Be that as it may, we must move forward.*",
        rules=[
            "'Much as' + clause = 'Although...very much'.",
            "Adjective/as/though patterns are formal and literary.",
            "'For all + noun' is idiomatic and should not be taken literally.",
            "'Be that as it may' is a fossilised phrase — do not change its form.",
        ],
        examples=[
            GrammarExample(text="Much as I sympathise with your position, the decision is final."),
            GrammarExample(text="Brilliant though the plan was, it failed in practice."),
            GrammarExample(text="For all his experience, he made a basic error."),
            GrammarExample(text="Be that as it may, we cannot ignore the evidence."),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="As much I like it...",
                correct="Much as I like it...",
                note="The correct pattern is 'Much as...', not 'As much...'.",
            ),
            GrammarMistake(
                wrong="For all that he is rich...",
                correct="For all his wealth... (or) Rich as he is...",
                note="After 'For all', use a noun phrase, not a clause with 'that'.",
            ),
        ],
        related=["adverbial-clauses-advanced", "inversion", "concession-contrast-b2"],
    ),
]
