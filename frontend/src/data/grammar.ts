export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'

export type GrammarCategory =
  | 'Tenses'
  | 'Questions'
  | 'Nouns'
  | 'Pronouns'
  | 'Adjectives & Adverbs'
  | 'Modals'
  | 'Conditionals'
  | 'Passive Voice'
  | 'Reported Speech'
  | 'Clauses'
  | 'Articles'
  | 'Prepositions'
  | 'Phrasal Verbs'
  | 'Advanced'

export interface GrammarExample {
  english: string
  translation?: string // in user's native language — interpolated at render time
  note?: string
}

export interface GrammarMistake {
  wrong: string
  correct: string
  note: string
}

export interface GrammarTopic {
  slug: string
  title: string
  level: CEFRLevel
  category: GrammarCategory
  summary: string       // one-liner for the index card
  explanation: string   // full explanation in Markdown
  structure?: string    // formula/pattern, e.g. "Subject + verb + object"
  rules: string[]       // bullet-point key rules
  examples: GrammarExample[]
  common_mistakes: GrammarMistake[]
  related: string[]     // slugs of related topics
}

export const grammarTopics: GrammarTopic[] = [
  /* ── A1 ─────────────────────────────────────────────────── */
  {
    slug: 'present-simple',
    title: 'Present Simple',
    level: 'A1',
    category: 'Tenses',
    summary: 'Express habits, routines, and permanent facts.',
    structure: 'Subject + base verb (+ s/es for he/she/it)',
    explanation: `Use the **present simple** for:\n- Daily routines and habits: *I drink coffee every morning.*\n- Permanent states and facts: *Water boils at 100°C.*\n- Schedules: *The train leaves at 8.*\n\nFor the third person singular (he/she/it), add **-s** or **-es** to the verb.`,
    rules: [
      'Add -s or -es for he/she/it: "She works", "He watches".',
      'Use do/does in negatives and questions.',
      'Use for routines, facts, and schedules — not for things happening right now.',
    ],
    examples: [
      { english: 'I work from home every day.', note: 'routine' },
      { english: "She doesn't like coffee.", note: 'negative with does + not' },
      { english: 'Does he speak French?', note: 'question with does' },
    ],
    common_mistakes: [
      { wrong: 'She work here.', correct: 'She works here.', note: 'Missing -s for third person.' },
      { wrong: "He don't know.", correct: "He doesn't know.", note: "Use doesn't, not don't, for he/she/it." },
    ],
    related: ['present-continuous', 'past-simple', 'questions-yes-no'],
  },
  {
    slug: 'to-be',
    title: 'To Be (am / is / are)',
    level: 'A1',
    category: 'Tenses',
    summary: 'The most fundamental verb in English.',
    structure: 'I am · You/We/They are · He/She/It is',
    explanation: `**To be** is used to describe people, places, things, and states.\n\nContractions: *I'm, you're, he's, she's, it's, we're, they're*.\n\nNegative: *I'm not, you aren't / you're not, he isn't / he's not.*`,
    rules: [
      'I am / He is / You are — three different forms.',
      'Contractions are very common in spoken English.',
      'Never add -s or -ed: there is no "he bes" or "she beed".',
    ],
    examples: [
      { english: 'I am a student.' },
      { english: 'She is from Spain.' },
      { english: 'They are not ready yet.', note: 'negative' },
    ],
    common_mistakes: [
      { wrong: 'She is very nice person.', correct: 'She is a very nice person.', note: "Don't forget the article before a singular noun." },
      { wrong: 'I am agree.', correct: 'I agree.', note: '"Agree" is a verb, not an adjective. Don\'t use "be" with it.' },
    ],
    related: ['articles', 'present-simple'],
  },
  {
    slug: 'articles',
    title: 'Articles (a / an / the)',
    level: 'A1',
    category: 'Articles',
    summary: 'When to use a, an, or the before a noun.',
    explanation: `- **a / an** (indefinite): for something mentioned for the first time or non-specific. Use *an* before vowel sounds.\n- **the** (definite): for something already known or unique.\n- **no article**: for plural/uncountable nouns in general statements.`,
    rules: [
      'Use a/an for singular countable nouns mentioned for the first time.',
      'Use the when both speaker and listener know what is being referred to.',
      'Use an before a vowel sound (an apple, an hour — the h is silent).',
      'No article for general plurals: "Dogs are loyal." (not "The dogs are loyal.")',
    ],
    examples: [
      { english: 'I saw a dog in the park.', note: 'a = first mention; the = specific park' },
      { english: 'She is an engineer.' },
      { english: 'The sun rises in the east.', note: 'unique nouns use "the"' },
    ],
    common_mistakes: [
      { wrong: 'I am engineer.', correct: 'I am an engineer.', note: 'Always use an article before a singular countable noun.' },
      { wrong: 'The life is beautiful.', correct: 'Life is beautiful.', note: 'No article for abstract nouns used in a general sense.' },
    ],
    related: ['nouns-countable-uncountable', 'to-be'],
  },
  {
    slug: 'questions-yes-no',
    title: 'Yes/No Questions',
    level: 'A1',
    category: 'Questions',
    summary: 'Form questions that can be answered with yes or no.',
    structure: 'Do/Does/Is/Are + subject + base verb?',
    explanation: `Yes/no questions expect a yes or no answer. The key is **inverting** the auxiliary verb and the subject:\n\n- *You are tired.* → *Are you tired?*\n- *She works here.* → *Does she work here?*`,
    rules: [
      'Invert subject and auxiliary (be/do/does/did).',
      'Use do for I/you/we/they in present simple.',
      'Use does for he/she/it in present simple.',
      'Do not add -s to the main verb when using does: "Does she work?" not "Does she works?"',
    ],
    examples: [
      { english: 'Are you a student?' },
      { english: 'Does he live in London?' },
      { english: 'Do they speak English?' },
    ],
    common_mistakes: [
      { wrong: 'Does she works here?', correct: 'Does she work here?', note: 'After does, use the base form of the verb.' },
      { wrong: 'You are tired?', correct: 'Are you tired?', note: 'Invert subject and verb in questions.' },
    ],
    related: ['wh-questions', 'present-simple', 'to-be'],
  },
  {
    slug: 'subject-pronouns',
    title: 'Subject Pronouns',
    level: 'A1',
    category: 'Pronouns',
    summary: 'I, you, he, she, it, we, they — who is doing the action.',
    explanation: `Subject pronouns replace the noun that performs the action in a sentence.\n\n| Singular | Plural |\n|----------|--------|\n| I | we |\n| you | you |\n| he / she / it | they |`,
    rules: [
      'Use subject pronouns before the verb.',
      '"It" is used for things, animals (when gender is unknown), and impersonal subjects (It is raining).',
      '"You" is both singular and plural in English.',
    ],
    examples: [
      { english: 'She loves music.' },
      { english: 'We are going to the park.' },
      { english: 'It is raining outside.' },
    ],
    common_mistakes: [
      { wrong: 'Me and my friend went.', correct: 'My friend and I went.', note: 'Use "I", not "me", as the subject. And put yourself last.' },
    ],
    related: ['object-pronouns', 'possessive-adjectives'],
  },
  {
    slug: 'possessive-adjectives',
    title: 'Possessive Adjectives',
    level: 'A1',
    category: 'Pronouns',
    summary: 'my, your, his, her, its, our, their — showing ownership.',
    explanation: `Possessive adjectives come before a noun to show who something belongs to.\n\n| Subject | Possessive |\n|---------|------------|\n| I | my |\n| you | your |\n| he | his |\n| she | her |\n| it | its |\n| we | our |\n| they | their |`,
    rules: [
      'Possessive adjectives agree with the owner, not the noun.',
      '"Its" (no apostrophe) = possessive. "It\'s" = it is.',
      'Do not confuse "their" (possessive), "there" (place), and "they\'re" (they are).',
    ],
    examples: [
      { english: 'This is my book.' },
      { english: 'She loves her cat.' },
      { english: 'The dog wagged its tail.' },
    ],
    common_mistakes: [
      { wrong: "The cat lost it's collar.", correct: 'The cat lost its collar.', note: '"its" without apostrophe is possessive.' },
      { wrong: 'Their going to the park.', correct: "They're going to the park.", note: '"Their" is possessive; "they\'re" = they are.' },
    ],
    related: ['subject-pronouns', 'object-pronouns'],
  },

  /* ── A2 ─────────────────────────────────────────────────── */
  {
    slug: 'past-simple',
    title: 'Past Simple',
    level: 'A2',
    category: 'Tenses',
    summary: 'Describe completed actions in the past.',
    structure: 'Subject + verb-ed / irregular past form',
    explanation: `Use the **past simple** for:\n- Completed actions at a specific time: *I went to Paris last year.*\n- A sequence of past events: *She arrived, sat down, and opened her bag.*\n\nRegular verbs add **-ed**. Irregular verbs have unique forms (go → went, see → saw).`,
    rules: [
      'Add -ed to regular verbs (work → worked, play → played).',
      'Irregular verbs must be memorised (go → went, buy → bought).',
      "Negative: did not (didn't) + base verb.",
      'Question: Did + subject + base verb?',
    ],
    examples: [
      { english: 'She worked late yesterday.' },
      { english: "They didn't come to the party." },
      { english: 'Did you see that film?' },
    ],
    common_mistakes: [
      { wrong: "He didn't went home.", correct: "He didn't go home.", note: "After did/didn't use the base form, not past tense." },
      { wrong: 'I have went to school yesterday.', correct: 'I went to school yesterday.', note: 'With specific past time markers (yesterday, last week), use simple past, not present perfect.' },
    ],
    related: ['present-simple', 'present-perfect', 'past-continuous'],
  },
  {
    slug: 'present-continuous',
    title: 'Present Continuous',
    level: 'A2',
    category: 'Tenses',
    summary: 'Describe actions happening right now or temporary situations.',
    structure: 'Subject + am/is/are + verb-ing',
    explanation: `Use the **present continuous** for:\n- Actions happening at this moment: *I am writing an email right now.*\n- Temporary situations: *She is staying with friends this week.*\n- Future plans: *We are meeting tomorrow at 10.*`,
    rules: [
      'Always use am/is/are + -ing form.',
      'Stative verbs (know, love, want, believe) are NOT used in continuous tenses.',
      'Spelling: double the final consonant for short vowel verbs (run → running, sit → sitting).',
    ],
    examples: [
      { english: 'He is reading a book.' },
      { english: 'They are not watching TV.' },
      { english: 'What are you doing?' },
    ],
    common_mistakes: [
      { wrong: 'I am knowing the answer.', correct: 'I know the answer.', note: '"Know" is a stative verb — it does not take continuous form.' },
      { wrong: 'She is work right now.', correct: 'She is working right now.', note: 'Use the -ing form after is/am/are.' },
    ],
    related: ['present-simple', 'past-continuous', 'stative-verbs'],
  },
  {
    slug: 'comparatives-superlatives',
    title: 'Comparatives & Superlatives',
    level: 'A2',
    category: 'Adjectives & Adverbs',
    summary: 'Compare two things or rank within a group.',
    structure: 'adj-er than / more adj than · the adj-est / the most adj',
    explanation: `**Comparative**: compare two things.\n- Short adjectives: add -er (*faster, bigger*).\n- Long adjectives: use more (*more interesting*).\n\n**Superlative**: rank one among many.\n- Short: add -est (*the fastest*).\n- Long: use most (*the most beautiful*).\n\nIrregulars: good → better → the best · bad → worse → the worst.`,
    rules: [
      'One-syllable adjectives: -er / -est (fast → faster → fastest).',
      'Two-syllable adjectives ending in -y: -ier / -iest (happy → happier).',
      'Three+ syllable adjectives: more / most.',
      'Double the final consonant for short vowel adjectives: big → bigger.',
    ],
    examples: [
      { english: 'This road is longer than I expected.' },
      { english: 'She is more patient than her brother.' },
      { english: "This is the best coffee I've ever had." },
    ],
    common_mistakes: [
      { wrong: 'She is more tall than me.', correct: 'She is taller than me.', note: 'Short adjectives take -er, not "more".' },
      { wrong: 'He is the most fast runner.', correct: 'He is the fastest runner.', note: 'Short adjectives take -est, not "most".' },
    ],
    related: ['adjectives-order', 'as-as-comparisons'],
  },
  {
    slug: 'can-cant',
    title: "Can / Can't",
    level: 'A2',
    category: 'Modals',
    summary: 'Express ability and permission.',
    structure: "Subject + can/can't + base verb",
    explanation: `**Can** expresses:\n- Ability: *I can swim.*\n- Permission: *Can I leave early?*\n- Possibility: *It can be very cold here in winter.*\n\n**Cannot / can't** is the negative form.`,
    rules: [
      'Can never changes form — no -s for he/she/it.',
      'Always followed by the base verb (no "to"): "can go", not "can to go".',
      'For past ability, use could.',
    ],
    examples: [
      { english: 'She can speak three languages.' },
      { english: 'Can you help me, please?' },
      { english: "I can't find my keys." },
    ],
    common_mistakes: [
      { wrong: 'She cans drive.', correct: 'She can drive.', note: 'Modal verbs never take -s.' },
      { wrong: 'I can to swim.', correct: 'I can swim.', note: 'Do not use "to" after modal verbs.' },
    ],
    related: ['modal-verbs', 'could-past-ability'],
  },

  /* ── B1 ─────────────────────────────────────────────────── */
  {
    slug: 'present-perfect',
    title: 'Present Perfect',
    level: 'B1',
    category: 'Tenses',
    summary: 'Connect past experiences or recent events to the present.',
    structure: 'Subject + have/has + past participle',
    explanation: `Use the **present perfect** for:\n- Life experiences (no specific time): *I have visited Japan.*\n- Recent events with present relevance: *She has just finished the report.*\n- Unfinished situations: *I have lived here for five years.*\n\nKey time markers: **ever, never, just, already, yet, since, for**.`,
    rules: [
      'Use have for I/you/we/they; has for he/she/it.',
      'Use the past participle (not simple past): gone, seen, done, been.',
      'With "for" + duration; with "since" + starting point.',
      'Do NOT use with specific past time markers (yesterday, in 2010 → use past simple).',
    ],
    examples: [
      { english: 'Have you ever eaten sushi?', note: 'life experience' },
      { english: 'She has just left the office.', note: 'recent, relevant now' },
      { english: "I haven't seen him since Monday." },
    ],
    common_mistakes: [
      { wrong: 'I have seen her yesterday.', correct: 'I saw her yesterday.', note: '"Yesterday" is specific → past simple.' },
      { wrong: 'He has went to the store.', correct: 'He has gone to the store.', note: 'Use the past participle (gone), not simple past (went).' },
    ],
    related: ['past-simple', 'present-perfect-continuous', 'past-perfect'],
  },
  {
    slug: 'first-conditional',
    title: 'First Conditional',
    level: 'B1',
    category: 'Conditionals',
    summary: 'Real and likely future situations.',
    structure: 'If + present simple, will + base verb',
    explanation: `The **first conditional** expresses real, possible situations in the future.\n\n*If it rains, we will cancel the match.*\n\nThe if-clause uses **present simple** (not will); the result clause uses **will**.`,
    rules: [
      'If-clause: present simple (never will in the if-clause).',
      "Main clause: will/won't + base verb.",
      'The clauses can be reversed: "We will cancel if it rains."',
      'Can also use other modals in main clause: might, could, should.',
    ],
    examples: [
      { english: 'If you study hard, you will pass the exam.' },
      { english: "I won't go if it's too cold." },
      { english: "If she calls, tell her I'm busy." },
    ],
    common_mistakes: [
      { wrong: 'If it will rain, we will stay.', correct: 'If it rains, we will stay.', note: 'Do not use "will" in the if-clause.' },
    ],
    related: ['zero-conditional', 'second-conditional', 'future-will'],
  },
  {
    slug: 'passive-voice-simple',
    title: 'Passive Voice (Simple)',
    level: 'B1',
    category: 'Passive Voice',
    summary: 'Focus on the action or object, not the doer.',
    structure: 'Subject + be (conjugated) + past participle (+ by + agent)',
    explanation: `Use the **passive voice** when:\n- The doer is unknown: *The window was broken.*\n- The doer is obvious: *The suspect was arrested.*\n- You want to focus on the action or receiver.\n\nPresent: *The report is written every week.*\nPast: *The report was written yesterday.*`,
    rules: [
      'Be must be conjugated to match the tense and subject.',
      'The agent (by + person) is often omitted.',
      'Not all verbs can be passive — intransitive verbs (arrive, sleep) cannot.',
    ],
    examples: [
      { english: 'English is spoken all over the world.' },
      { english: 'The letter was written by her grandmother.' },
      { english: 'The results will be announced tomorrow.' },
    ],
    common_mistakes: [
      { wrong: 'The cake was ate by the children.', correct: 'The cake was eaten by the children.', note: 'Use the past participle (eaten), not simple past (ate).' },
    ],
    related: ['passive-voice-advanced', 'past-simple'],
  },
  {
    slug: 'relative-clauses',
    title: 'Relative Clauses',
    level: 'B1',
    category: 'Clauses',
    summary: 'Add information about a noun using who, which, or that.',
    structure: 'Noun + who/which/that + clause',
    explanation: `**Defining relative clauses** identify which person or thing:\n*The man who lives next door is a doctor.*\n\n**Non-defining** add extra info (comma required — NOT used with "that"):\n*My brother, who lives in Paris, is visiting next week.*\n\n- **who/that** → people\n- **which/that** → things\n- **whose** → possession`,
    rules: [
      'Who for people, which for things, that for both (defining only).',
      'Non-defining clauses: use commas and never "that".',
      'The relative pronoun can be omitted when it is the object: "The book (that) I read was great."',
    ],
    examples: [
      { english: 'The girl who won the prize is my sister.', note: 'defining' },
      { english: 'London, which is the capital of England, is very expensive.', note: 'non-defining' },
      { english: 'The bag whose strap is broken needs to be repaired.', note: 'possession' },
    ],
    common_mistakes: [
      { wrong: 'The woman which works here is called Anna.', correct: 'The woman who works here is called Anna.', note: 'Use "who" for people, not "which".' },
    ],
    related: ['clauses-overview', 'noun-clauses'],
  },
  {
    slug: 'modal-verbs',
    title: 'Modal Verbs',
    level: 'B1',
    category: 'Modals',
    summary: 'must, should, could, might, would — expressing obligation, advice, and probability.',
    explanation: `Modal verbs modify the main verb to express:\n\n| Modal | Use |\n|-------|-----|\n| must | strong obligation / deduction |\n| should | advice / expectation |\n| could | past ability / polite request / possibility |\n| might | weak possibility |\n| would | conditional / polite request |\n\nAll modals: no -s, followed by base verb, no "to".`,
    rules: [
      'No -s for third person: "she must", not "she musts".',
      'No "to" after modals: "should go", not "should to go".',
      'For past modals: modal + have + past participle (should have done).',
    ],
    examples: [
      { english: 'You should see a doctor.' },
      { english: 'It might rain later.' },
      { english: 'Could you pass the salt, please?' },
    ],
    common_mistakes: [
      { wrong: 'She musts leave now.', correct: 'She must leave now.', note: 'Modals never take -s.' },
      { wrong: 'You should to call him.', correct: 'You should call him.', note: 'No "to" after modals.' },
    ],
    related: ['can-cant', 'second-conditional', 'past-modals'],
  },

  /* ── B2 ─────────────────────────────────────────────────── */
  {
    slug: 'second-conditional',
    title: 'Second Conditional',
    level: 'B2',
    category: 'Conditionals',
    summary: 'Unreal or hypothetical present/future situations.',
    structure: 'If + past simple, would + base verb',
    explanation: `The **second conditional** expresses hypothetical situations that are unlikely or contrary to current reality.\n\n*If I won the lottery, I would travel the world.*\n(I haven't won — this is imaginary.)\n\nNote: use **were** (not was) for all subjects in formal/written English:\n*If I were you, I would apologise.*`,
    rules: [
      'If-clause: past simple (never would).',
      'Main clause: would/could/might + base verb.',
      '"If I were you" is a fixed expression (not "if I was you" in formal English).',
    ],
    examples: [
      { english: 'If she had more time, she would study abroad.' },
      { english: "I wouldn't do that if I were you." },
      { english: 'What would you do if you lost your phone?' },
    ],
    common_mistakes: [
      { wrong: 'If I would have money, I would travel.', correct: 'If I had money, I would travel.', note: 'Do not use "would" in the if-clause.' },
    ],
    related: ['first-conditional', 'third-conditional', 'mixed-conditionals'],
  },
  {
    slug: 'third-conditional',
    title: 'Third Conditional',
    level: 'B2',
    category: 'Conditionals',
    summary: 'Imagining a different outcome for a past situation.',
    structure: 'If + past perfect, would have + past participle',
    explanation: `The **third conditional** refers to situations in the past that did NOT happen and their imaginary results.\n\n*If I had studied harder, I would have passed the exam.*\n(I didn't study hard — and I didn't pass.)`,
    rules: [
      'If-clause: past perfect (had + past participle).',
      'Main clause: would have + past participle.',
      'Can use could have / might have instead of would have.',
    ],
    examples: [
      { english: "If she had left earlier, she wouldn't have missed the train." },
      { english: 'He might have got the job if he had prepared better.' },
    ],
    common_mistakes: [
      { wrong: 'If I would have known, I would have helped.', correct: 'If I had known, I would have helped.', note: 'No "would" in the if-clause of the third conditional.' },
    ],
    related: ['second-conditional', 'mixed-conditionals', 'past-perfect'],
  },
  {
    slug: 'reported-speech',
    title: 'Reported Speech',
    level: 'B2',
    category: 'Reported Speech',
    summary: 'Report what someone said without quoting them directly.',
    explanation: `When reporting speech, the tense usually shifts back (**backshift**):\n\n| Direct | Reported |\n|--------|----------|\n| "I am tired." | She said she was tired. |\n| "I worked." | He said he had worked. |\n| "I will go." | She said she would go. |\n| "I can help." | He said he could help. |\n\nTime and place words also change: *today → that day, here → there, yesterday → the day before.*`,
    rules: [
      'Say vs tell: "She said (that)…" / "She told me (that)…"',
      'Backshift: present → past, past → past perfect, will → would.',
      'Questions in reported speech use normal word order (no inversion): "She asked where I lived."',
    ],
    examples: [
      { english: '"I love this city." → She said she loved that city.' },
      { english: '"Will you come?" → He asked if I would come.' },
      { english: '"Where do you work?" → She asked where I worked.' },
    ],
    common_mistakes: [
      { wrong: 'She told that she was tired.', correct: 'She said that she was tired. / She told me that she was tired.', note: '"Tell" needs an object (me/him/her).' },
    ],
    related: ['past-perfect', 'modal-verbs'],
  },
  {
    slug: 'past-perfect',
    title: 'Past Perfect',
    level: 'B2',
    category: 'Tenses',
    summary: 'Express the earlier of two past events.',
    structure: 'Subject + had + past participle',
    explanation: `The **past perfect** is used for an action that happened **before** another past action.\n\n*When I arrived, she had already left.*\n(First she left — then I arrived.)\n\nOften used with: already, just, never, before, by the time, when.`,
    rules: [
      'Had + past participle for all subjects (no had/have split).',
      'Only use past perfect when you need to show which event happened first.',
      'If the sequence is clear from context or "before/after", simple past is often fine.',
    ],
    examples: [
      { english: 'I had never eaten Thai food before I visited Bangkok.' },
      { english: 'By the time she called, he had already left.' },
    ],
    common_mistakes: [
      { wrong: 'When I arrived, she already left.', correct: 'When I arrived, she had already left.', note: 'Use past perfect for the earlier action.' },
    ],
    related: ['present-perfect', 'third-conditional', 'reported-speech'],
  },

  /* ── C1 ─────────────────────────────────────────────────── */
  {
    slug: 'mixed-conditionals',
    title: 'Mixed Conditionals',
    level: 'C1',
    category: 'Conditionals',
    summary: 'Combine different time frames in one conditional sentence.',
    explanation: `**Mixed conditionals** blend the second and third conditional to connect different time frames.\n\n**Past condition → present result** (most common):\n*If I had studied medicine, I would be a doctor now.*\n(I didn't study medicine in the past → I'm not a doctor now.)\n\n**Present condition → past result**:\n*If she weren't so stubborn, she would have apologised.*\n(She is stubborn → she didn't apologise in the past.)`,
    rules: [
      'Past → present: If + past perfect, would + base verb.',
      'Present → past: If + past simple, would have + past participle.',
      'The key is that the time frames differ between the two clauses.',
    ],
    examples: [
      { english: 'If I had taken that job, I would be living in Tokyo now.' },
      { english: "If you weren't so afraid of flying, you would have come with us." },
    ],
    common_mistakes: [
      { wrong: 'Confusing with 2nd or 3rd conditional', correct: 'Identify the time frame of each clause separately', note: 'Ask: is the condition past or present? Is the result past or present?' },
    ],
    related: ['second-conditional', 'third-conditional'],
  },
  {
    slug: 'inversion',
    title: 'Inversion',
    level: 'C1',
    category: 'Advanced',
    summary: 'Place the auxiliary before the subject for emphasis or formality.',
    explanation: `**Inversion** reverses the usual subject-verb order. It is used:\n\n1. After negative/restrictive adverbs at the start of a sentence:\n*Never have I seen such a mess.*\n*Not only did she arrive late, but she also forgot her notes.*\n\n2. After "so/such… that" structures:\n*So tired was he that he fell asleep immediately.*\n\n3. In formal conditionals (replacing if):\n*Had I known, I would have acted differently.* (= If I had known…)`,
    rules: [
      'After negative adverbials: auxiliary + subject + main verb.',
      'If there is no auxiliary, use do/does/did.',
      'Inversion is formal; rarely used in everyday conversation.',
    ],
    examples: [
      { english: 'Rarely does she make mistakes.' },
      { english: 'Not until he read the letter did he understand.' },
      { english: 'Should you need help, please contact us.', note: 'formal conditional' },
    ],
    common_mistakes: [
      { wrong: 'Never I have seen this.', correct: 'Never have I seen this.', note: 'The auxiliary must come before the subject.' },
    ],
    related: ['mixed-conditionals', 'cleft-sentences'],
  },
  {
    slug: 'cleft-sentences',
    title: 'Cleft Sentences',
    level: 'C1',
    category: 'Advanced',
    summary: 'Emphasise a particular part of a sentence.',
    explanation: `**It-cleft**: emphasise almost any part of a sentence.\n*It was John who broke the window.*\n(Focus: John — not someone else.)\n\n**Wh-cleft (pseudo-cleft)**: especially for actions.\n*What I need is a long holiday.*\n*What surprised me was his attitude.*`,
    rules: [
      '"It is/was + focus + relative clause" is the it-cleft structure.',
      'Use who for people, that/which for things.',
      'Wh-clefts start with what/where/when/why.',
    ],
    examples: [
      { english: 'It was the noise that woke me up.' },
      { english: 'What bothers me is his attitude.' },
      { english: "It's honesty that I admire most in people." },
    ],
    common_mistakes: [
      { wrong: 'It was the noise which woke me up.', correct: 'It was the noise that woke me up.', note: '"That" is preferred (not "which") in it-cleft sentences.' },
    ],
    related: ['inversion', 'relative-clauses'],
  },

  /* ── C2 ─────────────────────────────────────────────────── */
  {
    slug: 'discourse-markers',
    title: 'Discourse Markers',
    level: 'C2',
    category: 'Advanced',
    summary: 'Words and phrases that structure and connect ideas in speech and writing.',
    explanation: `Discourse markers signal the relationship between ideas.\n\n| Function | Examples |\n|----------|----------|\n| Adding | furthermore, in addition, what is more |\n| Contrasting | nevertheless, however, that said, even so |\n| Conceding | admittedly, granted, to be fair |\n| Exemplifying | namely, in particular, to illustrate |\n| Concluding | ultimately, in short, to sum up |\n| Hedging | arguably, to some extent, it could be said that |`,
    rules: [
      'Discourse markers are not interchangeable — each has a specific logical role.',
      'Overuse makes text sound mechanical; use them selectively.',
      'Formal markers (furthermore, nevertheless) are appropriate in essays, not chat.',
    ],
    examples: [
      { english: 'The plan has merits; nevertheless, the cost is prohibitive.' },
      { english: 'Admittedly, the research is limited, but the findings are promising.' },
      { english: 'To sum up, climate action requires political will, not just technology.' },
    ],
    common_mistakes: [
      { wrong: 'However I agree with you.', correct: 'However, I agree with you.', note: 'Discourse markers at the start of a clause are followed by a comma.' },
    ],
    related: ['inversion', 'advanced-passive'],
  },
  {
    slug: 'nominalisation',
    title: 'Nominalisation',
    level: 'C2',
    category: 'Advanced',
    summary: 'Turn verbs and adjectives into nouns to create a formal, dense style.',
    explanation: `**Nominalisation** converts verbs or adjectives into nouns:\n\n- *decide* → *decision* (*The decision was made…* instead of *They decided…*)\n- *fail* → *failure*\n- *significant* → *significance*\n\nCommon in academic, legal, and business English. It creates distance, formality, and allows complex ideas to become the subject of the sentence.`,
    rules: [
      'Common suffixes: -tion/-sion, -ment, -ance/-ence, -ity, -ness.',
      'Do not overuse it in spoken English — it sounds unnatural.',
      'Nominalisation can make writing feel impersonal and abstract.',
    ],
    examples: [
      { english: 'The implementation of the strategy proved difficult.' },
      { english: 'There was a significant improvement in results.' },
      { english: 'His failure to respond caused confusion.', note: 'failure = he failed; confusion = people were confused' },
    ],
    common_mistakes: [
      { wrong: 'Using nominalisation in casual speech', correct: 'Reserve it for formal writing contexts', note: 'In everyday speech, prefer active verbs.' },
    ],
    related: ['discourse-markers', 'advanced-passive'],
  },
]
