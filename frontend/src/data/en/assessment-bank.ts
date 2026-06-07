import type { CEFRLevel } from './grammar'
import { CEFR_LEVELS } from '../curriculum'

export interface AssessmentQuestion {
  id: string // e.g. "g-a1-001"
  skill: 'grammar' | 'vocabulary' | 'reading'
  difficulty: CEFRLevel
  question: string
  options: string[] // exactly 4
  correct: string // must match one option exactly
  grammar_slug?: string // links to grammar reference
}

// ── Grammar — A1 (10 questions) ──────────────────────────────────────────────
const grammarA1: AssessmentQuestion[] = [
  {
    id: 'g-a1-001',
    skill: 'grammar',
    difficulty: 'A1',
    question: 'Choose the correct form: She ___ a doctor.',
    options: ['am', 'is', 'are', 'be'],
    correct: 'is',
    grammar_slug: 'to-be',
  },
  {
    id: 'g-a1-002',
    skill: 'grammar',
    difficulty: 'A1',
    question: 'Which sentence is correct?',
    options: [
      'I are happy.',
      'He am happy.',
      'They is happy.',
      'We are happy.',
    ],
    correct: 'We are happy.',
    grammar_slug: 'to-be',
  },
  {
    id: 'g-a1-003',
    skill: 'grammar',
    difficulty: 'A1',
    question: 'Fill in: ___ you a student?',
    options: ['Am', 'Is', 'Are', 'Be'],
    correct: 'Are',
    grammar_slug: 'questions-yes-no',
  },
  {
    id: 'g-a1-004',
    skill: 'grammar',
    difficulty: 'A1',
    question: 'She ___ to school every day.',
    options: ['go', 'goes', 'going', 'goed'],
    correct: 'goes',
    grammar_slug: 'present-simple',
  },
  {
    id: 'g-a1-005',
    skill: 'grammar',
    difficulty: 'A1',
    question: 'Choose the correct article: I have ___ apple.',
    options: ['a', 'an', 'the', '—'],
    correct: 'an',
    grammar_slug: 'articles',
  },
  {
    id: 'g-a1-006',
    skill: 'grammar',
    difficulty: 'A1',
    question: 'Which is the correct negative?',
    options: [
      "He don't work here.",
      "He doesn't works here.",
      "He doesn't work here.",
      'He not work here.',
    ],
    correct: "He doesn't work here.",
    grammar_slug: 'present-simple',
  },
  {
    id: 'g-a1-007',
    skill: 'grammar',
    difficulty: 'A1',
    question: 'Select the subject pronoun: ___ is my sister.',
    options: ['Her', 'Him', 'She', 'Them'],
    correct: 'She',
    grammar_slug: 'subject-pronouns',
  },
  {
    id: 'g-a1-008',
    skill: 'grammar',
    difficulty: 'A1',
    question: 'Choose the possessive: This is ___ book. (belonging to him)',
    options: ['he', 'him', 'his', 'her'],
    correct: 'his',
    grammar_slug: 'possessive-adjectives',
  },
  {
    id: 'g-a1-009',
    skill: 'grammar',
    difficulty: 'A1',
    question: '___ they like football?',
    options: ['Does', 'Do', 'Is', 'Are'],
    correct: 'Do',
    grammar_slug: 'questions-yes-no',
  },
  {
    id: 'g-a1-010',
    skill: 'grammar',
    difficulty: 'A1',
    question: 'The cat lost ___ collar.',
    options: ["it's", 'its', 'their', 'his'],
    correct: 'its',
    grammar_slug: 'possessive-adjectives',
  },
]

// ── Grammar — A2 (10 questions) ──────────────────────────────────────────────
const grammarA2: AssessmentQuestion[] = [
  {
    id: 'g-a2-001',
    skill: 'grammar',
    difficulty: 'A2',
    question: 'I ___ to Paris last summer.',
    options: ['go', 'went', 'gone', 'have gone'],
    correct: 'went',
    grammar_slug: 'past-simple',
  },
  {
    id: 'g-a2-002',
    skill: 'grammar',
    difficulty: 'A2',
    question: 'She ___ TV when I arrived.',
    options: ['watches', 'watched', 'was watching', 'has watched'],
    correct: 'was watching',
    grammar_slug: 'present-continuous',
  },
  {
    id: 'g-a2-003',
    skill: 'grammar',
    difficulty: 'A2',
    question: 'Mount Everest is ___ mountain in the world.',
    options: ['the higher', 'highest', 'the highest', 'more high'],
    correct: 'the highest',
    grammar_slug: 'comparatives-superlatives',
  },
  {
    id: 'g-a2-004',
    skill: 'grammar',
    difficulty: 'A2',
    question: 'She ___ speak three languages.',
    options: ['cans', 'can to', 'can', 'is can'],
    correct: 'can',
    grammar_slug: 'can-cant',
  },
  {
    id: 'g-a2-005',
    skill: 'grammar',
    difficulty: 'A2',
    question: 'They ___ football yesterday.',
    options: ["didn't played", "didn't play", "don't played", "doesn't play"],
    correct: "didn't play",
    grammar_slug: 'past-simple',
  },
  {
    id: 'g-a2-006',
    skill: 'grammar',
    difficulty: 'A2',
    question: 'He is ___ than his brother.',
    options: ['more tall', 'tallest', 'taller', 'the taller'],
    correct: 'taller',
    grammar_slug: 'comparatives-superlatives',
  },
  {
    id: 'g-a2-007',
    skill: 'grammar',
    difficulty: 'A2',
    question: 'Look at those clouds. It ___ rain.',
    options: ['will to', 'is going to', 'goes to', 'going to'],
    correct: 'is going to',
    grammar_slug: 'future-going-to',
  },
  {
    id: 'g-a2-008',
    skill: 'grammar',
    difficulty: 'A2',
    question: 'I ___ her since Monday.',
    options: ["haven't see", "didn't see", "haven't seen", "don't see"],
    correct: "haven't seen",
    grammar_slug: 'present-perfect',
  },
  {
    id: 'g-a2-009',
    skill: 'grammar',
    difficulty: 'A2',
    question: 'There ___ some milk in the fridge.',
    options: ['are', 'have', 'is', 'be'],
    correct: 'is',
    grammar_slug: 'countable-uncountable',
  },
  {
    id: 'g-a2-010',
    skill: 'grammar',
    difficulty: 'A2',
    question: 'Could you ___ the door, please?',
    options: ['to close', 'closing', 'close', 'closed'],
    correct: 'close',
    grammar_slug: 'can-cant',
  },
]

// ── Grammar — B1 (10 questions) ──────────────────────────────────────────────
const grammarB1: AssessmentQuestion[] = [
  {
    id: 'g-b1-001',
    skill: 'grammar',
    difficulty: 'B1',
    question: 'If it rains tomorrow, we ___ the match.',
    options: ['would cancel', 'will cancel', 'cancel', 'cancelled'],
    correct: 'will cancel',
    grammar_slug: 'first-conditional',
  },
  {
    id: 'g-b1-002',
    skill: 'grammar',
    difficulty: 'B1',
    question: 'The report ___ every week by the manager.',
    options: ['writes', 'is written', 'has written', 'wrote'],
    correct: 'is written',
    grammar_slug: 'passive-voice-simple',
  },
  {
    id: 'g-b1-003',
    skill: 'grammar',
    difficulty: 'B1',
    question: 'The man ___ lives next door is a chef.',
    options: ['which', 'whose', 'who', 'whom'],
    correct: 'who',
    grammar_slug: 'relative-clauses',
  },
  {
    id: 'g-b1-004',
    skill: 'grammar',
    difficulty: 'B1',
    question: 'She told me that she ___ tired.',
    options: ['is', 'was', 'were', 'has been'],
    correct: 'was',
    grammar_slug: 'reported-speech',
  },
  {
    id: 'g-b1-005',
    skill: 'grammar',
    difficulty: 'B1',
    question: 'I ___ never eaten sushi before.',
    options: ['did', 'have', 'had', 'was'],
    correct: 'have',
    grammar_slug: 'present-perfect',
  },
  {
    id: 'g-b1-006',
    skill: 'grammar',
    difficulty: 'B1',
    question: 'You ___ see a doctor — that cough sounds bad.',
    options: ['must to', 'should to', 'should', 'ought'],
    correct: 'should',
    grammar_slug: 'modal-verbs',
  },
  {
    id: 'g-b1-007',
    skill: 'grammar',
    difficulty: 'B1',
    question: 'By the time she arrived, he ___ already left.',
    options: ['has', 'had', 'was', 'did'],
    correct: 'had',
    grammar_slug: 'past-perfect',
  },
  {
    id: 'g-b1-008',
    skill: 'grammar',
    difficulty: 'B1',
    question: 'The letter ___ by her grandmother.',
    options: ['was written', 'wrote', 'has written', 'is write'],
    correct: 'was written',
    grammar_slug: 'passive-voice-simple',
  },
  {
    id: 'g-b1-009',
    skill: 'grammar',
    difficulty: 'B1',
    question: 'He asked me where I ___.',
    options: ['live', 'lived', 'am living', 'have lived'],
    correct: 'lived',
    grammar_slug: 'reported-speech',
  },
  {
    id: 'g-b1-010',
    skill: 'grammar',
    difficulty: 'B1',
    question: 'It ___ be true — I saw it myself.',
    options: ['might not', 'must', 'should', 'could not'],
    correct: 'must',
    grammar_slug: 'modal-verbs',
  },
]

// ── Vocabulary — A1 (10 questions) ───────────────────────────────────────────
const vocabularyA1: AssessmentQuestion[] = [
  {
    id: 'v-a1-001',
    skill: 'vocabulary',
    difficulty: 'A1',
    question: 'What is the opposite of "big"?',
    options: ['tall', 'small', 'heavy', 'fast'],
    correct: 'small',
  },
  {
    id: 'v-a1-002',
    skill: 'vocabulary',
    difficulty: 'A1',
    question: 'What do you say when you meet someone for the first time?',
    options: ['Goodbye', 'See you later', 'Nice to meet you', 'Good night'],
    correct: 'Nice to meet you',
  },
  {
    id: 'v-a1-003',
    skill: 'vocabulary',
    difficulty: 'A1',
    question: 'Which is a family member?',
    options: ['neighbour', 'sister', 'doctor', 'teacher'],
    correct: 'sister',
  },
  {
    id: 'v-a1-004',
    skill: 'vocabulary',
    difficulty: 'A1',
    question: 'What colour is the sky on a clear day?',
    options: ['green', 'red', 'blue', 'yellow'],
    correct: 'blue',
  },
  {
    id: 'v-a1-005',
    skill: 'vocabulary',
    difficulty: 'A1',
    question: '"I work in a hospital and help sick people." What is my job?',
    options: ['teacher', 'driver', 'nurse', 'cook'],
    correct: 'nurse',
  },
  {
    id: 'v-a1-006',
    skill: 'vocabulary',
    difficulty: 'A1',
    question: 'Which word means "the meal in the morning"?',
    options: ['lunch', 'dinner', 'snack', 'breakfast'],
    correct: 'breakfast',
  },
  {
    id: 'v-a1-007',
    skill: 'vocabulary',
    difficulty: 'A1',
    question: 'What room do you sleep in?',
    options: ['kitchen', 'bathroom', 'bedroom', 'living room'],
    correct: 'bedroom',
  },
  {
    id: 'v-a1-008',
    skill: 'vocabulary',
    difficulty: 'A1',
    question: 'Which number comes after nineteen?',
    options: ['eighteen', 'twenty', 'eleven', 'fifteen'],
    correct: 'twenty',
  },
  {
    id: 'v-a1-009',
    skill: 'vocabulary',
    difficulty: 'A1',
    question: 'What do you wear on your feet?',
    options: ['hat', 'gloves', 'shoes', 'scarf'],
    correct: 'shoes',
  },
  {
    id: 'v-a1-010',
    skill: 'vocabulary',
    difficulty: 'A1',
    question: '"I am very ___." — choose the adjective for feeling very happy.',
    options: ['tired', 'hungry', 'excited', 'bored'],
    correct: 'excited',
  },
]

// ── Vocabulary — A2 (10 questions) ───────────────────────────────────────────
const vocabularyA2: AssessmentQuestion[] = [
  {
    id: 'v-a2-001',
    skill: 'vocabulary',
    difficulty: 'A2',
    question: 'Which word means "to go from one country to live in another"?',
    options: ['travel', 'immigrate', 'commute', 'visit'],
    correct: 'immigrate',
  },
  {
    id: 'v-a2-002',
    skill: 'vocabulary',
    difficulty: 'A2',
    question: 'What is the opposite of "cheap"?',
    options: ['small', 'old', 'expensive', 'heavy'],
    correct: 'expensive',
  },
  {
    id: 'v-a2-003',
    skill: 'vocabulary',
    difficulty: 'A2',
    question: 'You feel this in your stomach when you need to eat.',
    options: ['thirsty', 'sleepy', 'hungry', 'dizzy'],
    correct: 'hungry',
  },
  {
    id: 'v-a2-004',
    skill: 'vocabulary',
    difficulty: 'A2',
    question:
      '"Turn left at the ___ and you will see the bank." (a crossing of roads)',
    options: ['roundabout', 'crossroads', 'bridge', 'tunnel'],
    correct: 'crossroads',
  },
  {
    id: 'v-a2-005',
    skill: 'vocabulary',
    difficulty: 'A2',
    question: 'Which word describes the weather when it is very hot and sunny?',
    options: ['foggy', 'freezing', 'boiling', 'cloudy'],
    correct: 'boiling',
  },
  {
    id: 'v-a2-006',
    skill: 'vocabulary',
    difficulty: 'A2',
    question: 'You use this to pay without cash.',
    options: ['receipt', 'invoice', 'card', 'coin'],
    correct: 'card',
  },
  {
    id: 'v-a2-007',
    skill: 'vocabulary',
    difficulty: 'A2',
    question: 'What does "annual" mean?',
    options: ['every day', 'every month', 'every year', 'every week'],
    correct: 'every year',
  },
  {
    id: 'v-a2-008',
    skill: 'vocabulary',
    difficulty: 'A2',
    question:
      'Which word means "a person who writes articles for a newspaper"?',
    options: ['editor', 'journalist', 'novelist', 'author'],
    correct: 'journalist',
  },
  {
    id: 'v-a2-009',
    skill: 'vocabulary',
    difficulty: 'A2',
    question: 'What do you call a list of dishes in a restaurant?',
    options: ['bill', 'recipe', 'menu', 'order'],
    correct: 'menu',
  },
  {
    id: 'v-a2-010',
    skill: 'vocabulary',
    difficulty: 'A2',
    question: '"He was ___ to get the job." (very pleased about something)',
    options: ['relieved', 'delighted', 'confused', 'worried'],
    correct: 'delighted',
  },
]

// ── Vocabulary — B1 (10 questions) ───────────────────────────────────────────
const vocabularyB1: AssessmentQuestion[] = [
  {
    id: 'v-b1-001',
    skill: 'vocabulary',
    difficulty: 'B1',
    question: 'Choose the word closest in meaning to "significant".',
    options: ['tiny', 'beautiful', 'important', 'old'],
    correct: 'important',
  },
  {
    id: 'v-b1-002',
    skill: 'vocabulary',
    difficulty: 'B1',
    question:
      '"The government ___ a new tax." (officially announced and enforced)',
    options: ['suggested', 'introduced', 'cancelled', 'discussed'],
    correct: 'introduced',
  },
  {
    id: 'v-b1-003',
    skill: 'vocabulary',
    difficulty: 'B1',
    question: 'What does "reluctant" mean?',
    options: ['very happy', 'not willing', 'very tired', 'quite certain'],
    correct: 'not willing',
  },
  {
    id: 'v-b1-004',
    skill: 'vocabulary',
    difficulty: 'B1',
    question: 'Which word collocates with "make"? "Make a ___"',
    options: ['work', 'decision', 'business', 'travel'],
    correct: 'decision',
  },
  {
    id: 'v-b1-005',
    skill: 'vocabulary',
    difficulty: 'B1',
    question: '"The deadline is ___." (approaching and cannot be changed)',
    options: ['flexible', 'firm', 'optional', 'vague'],
    correct: 'firm',
  },
  {
    id: 'v-b1-006',
    skill: 'vocabulary',
    difficulty: 'B1',
    question: 'Choose the opposite of "optimistic".',
    options: ['realistic', 'pessimistic', 'enthusiastic', 'idealistic'],
    correct: 'pessimistic',
  },
  {
    id: 'v-b1-007',
    skill: 'vocabulary',
    difficulty: 'B1',
    question: '"He ___ to help but never did." (said he would but didn\'t)',
    options: ['offered', 'promised', 'refused', 'agreed'],
    correct: 'promised',
  },
  {
    id: 'v-b1-008',
    skill: 'vocabulary',
    difficulty: 'B1',
    question: 'What is a "colleague"?',
    options: [
      'a family member',
      'a person you work with',
      'a close friend',
      'a neighbour',
    ],
    correct: 'a person you work with',
  },
  {
    id: 'v-b1-009',
    skill: 'vocabulary',
    difficulty: 'B1',
    question: '"The results were ___." (better than expected, very good)',
    options: ['adequate', 'disappointing', 'outstanding', 'acceptable'],
    correct: 'outstanding',
  },
  {
    id: 'v-b1-010',
    skill: 'vocabulary',
    difficulty: 'B1',
    question:
      'Choose the correct preposition: "She is responsible ___ the project."',
    options: ['for', 'of', 'to', 'about'],
    correct: 'for',
  },
]

// ── Reading — A1/A2 (10 questions) ───────────────────────────────────────────
const readingA1A2: AssessmentQuestion[] = [
  {
    id: 'r-a1-001',
    skill: 'reading',
    difficulty: 'A1',
    question:
      'Read: "My name is Tom. I am 25 years old. I live in London." — How old is Tom?',
    options: ['20', '25', '30', '35'],
    correct: '25',
  },
  {
    id: 'r-a1-002',
    skill: 'reading',
    difficulty: 'A1',
    question:
      'Read: "The shop opens at 9am and closes at 6pm." — When does the shop close?',
    options: ['8pm', '5pm', '6pm', '9pm'],
    correct: '6pm',
  },
  {
    id: 'r-a1-003',
    skill: 'reading',
    difficulty: 'A1',
    question:
      'Read: "Do not use a phone in the library." — What must you NOT do?',
    options: ['Read books', 'Use a phone', 'Sit down', 'Borrow books'],
    correct: 'Use a phone',
  },
  {
    id: 'r-a2-001',
    skill: 'reading',
    difficulty: 'A2',
    question:
      'Read: "Anna moved to Berlin two years ago. She works as a nurse and likes her job, but she misses her family in Spain." — Why does Anna feel homesick?',
    options: [
      "She doesn't like her job.",
      'She moved recently.',
      'Her family is in Spain.',
      'Berlin is far.',
    ],
    correct: 'Her family is in Spain.',
  },
  {
    id: 'r-a2-002',
    skill: 'reading',
    difficulty: 'A2',
    question:
      'Read: "Sale! Everything is 30% off this weekend only." — When does the sale end?',
    options: [
      'At the end of the month',
      'After the weekend',
      'On Friday',
      'At midnight',
    ],
    correct: 'After the weekend',
  },
  {
    id: 'r-a2-003',
    skill: 'reading',
    difficulty: 'A2',
    question:
      'Read: "Passengers must show a valid ticket before boarding. No exceptions." — What do passengers need?',
    options: ['A passport', 'A boarding card', 'A valid ticket', 'An ID card'],
    correct: 'A valid ticket',
  },
]

// ── Reading — B1/B2 (10 questions) ───────────────────────────────────────────
const readingB1B2: AssessmentQuestion[] = [
  {
    id: 'r-b1-001',
    skill: 'reading',
    difficulty: 'B1',
    question:
      'Read: "Although the project was delivered on time, the client was not fully satisfied with the quality of the final report." — What is the main problem?',
    options: [
      'The project was late.',
      'The report quality was poor.',
      'The client refused to pay.',
      'The team was too small.',
    ],
    correct: 'The report quality was poor.',
  },
  {
    id: 'r-b1-002',
    skill: 'reading',
    difficulty: 'B1',
    question:
      'Read: "The council has decided to reduce funding for public libraries by 15%, citing budget constraints." — What does "citing" mean here?',
    options: ['ignoring', 'giving as a reason', 'criticising', 'calculating'],
    correct: 'giving as a reason',
  },
  {
    id: 'r-b1-003',
    skill: 'reading',
    difficulty: 'B1',
    question:
      'Read: "Renewable energy sources, such as solar and wind, are becoming increasingly cost-competitive with fossil fuels." — What is the main point of the sentence?',
    options: [
      'Solar is cheaper than wind.',
      'Fossil fuels are getting more expensive.',
      'Renewable energy is becoming more affordable.',
      'Wind is the best renewable source.',
    ],
    correct: 'Renewable energy is becoming more affordable.',
  },
  {
    id: 'r-b2-001',
    skill: 'reading',
    difficulty: 'B2',
    question:
      'Read: "The study revealed a statistically significant correlation between sleep deprivation and impaired cognitive performance, though causality could not be established." — What does this mean?',
    options: [
      'Poor sleep definitely causes poor thinking.',
      'There is a link between poor sleep and poor thinking, but cause and effect is not proven.',
      'The study had no useful results.',
      'Cognitive performance causes sleep deprivation.',
    ],
    correct:
      'There is a link between poor sleep and poor thinking, but cause and effect is not proven.',
  },
]

// ── Grammar — B2 (4 questions) ──────────────────────────────────────────────
const grammarB2: AssessmentQuestion[] = [
  {
    id: 'g-b2-001',
    skill: 'grammar',
    difficulty: 'B2',
    question: 'If I ___ harder at school, I would have a better job now.',
    options: ['had studied', 'studied', 'have studied', 'was studying'],
    correct: 'had studied',
    grammar_slug: 'mixed-conditionals',
  },
  {
    id: 'g-b2-002',
    skill: 'grammar',
    difficulty: 'B2',
    question: 'Not only ___ late, but he also forgot the report.',
    options: ['he arrived', 'arrived he', 'did he arrive', 'had he arrived'],
    correct: 'did he arrive',
    grammar_slug: 'inversion',
  },
  {
    id: 'g-b2-003',
    skill: 'grammar',
    difficulty: 'B2',
    question: 'The error ___ by the system before it caused any damage.',
    options: [
      'should detect',
      'should have detected',
      'should have been detected',
      'should be detecting',
    ],
    correct: 'should have been detected',
    grammar_slug: 'passive-modal-perfect',
  },
  {
    id: 'g-b2-004',
    skill: 'grammar',
    difficulty: 'B2',
    question: 'She wishes she ___ so much time on social media.',
    options: ["doesn't waste", "didn't waste", "hadn't wasted", "won't waste"],
    correct: "hadn't wasted",
    grammar_slug: 'wish-regret',
  },
]

// ── Vocabulary — B2 (4 questions) ────────────────────────────────────────────
const vocabularyB2: AssessmentQuestion[] = [
  {
    id: 'v-b2-001',
    skill: 'vocabulary',
    difficulty: 'B2',
    question: 'The new policy has ___ mixed reactions from the public.',
    options: ['made', 'done', 'drawn', 'brought'],
    correct: 'drawn',
  },
  {
    id: 'v-b2-002',
    skill: 'vocabulary',
    difficulty: 'B2',
    question: 'Choose the word closest in meaning to "ambiguous".',
    options: ['clear', 'uncertain', 'dangerous', 'boring'],
    correct: 'uncertain',
  },
  {
    id: 'v-b2-003',
    skill: 'vocabulary',
    difficulty: 'B2',
    question:
      'The company decided to ___ its losses and close the unprofitable branch.',
    options: ['cut', 'accept', 'mitigate', 'write off'],
    correct: 'write off',
  },
  {
    id: 'v-b2-004',
    skill: 'vocabulary',
    difficulty: 'B2',
    question: 'What does "prevalent" mean?',
    options: ['rare', 'unusual', 'widespread', 'powerful'],
    correct: 'widespread',
  },
]

// ── Reading — B2 (2 questions) ────────────────────────────────────────────────
const readingB2: AssessmentQuestion[] = [
  {
    id: 'r-b2-002',
    skill: 'reading',
    difficulty: 'B2',
    question:
      'Read: "Despite initial opposition from several board members, the proposal was eventually ratified after significant amendments were made. The outcome, while not ideal for any single party, was viewed as an acceptable compromise." — What can be inferred about the final decision?',
    options: [
      'Everyone was fully satisfied.',
      'The proposal failed.',
      'The result was a middle-ground solution.',
      'One party got everything they wanted.',
    ],
    correct: 'The result was a middle-ground solution.',
  },
  {
    id: 'r-b2-003',
    skill: 'reading',
    difficulty: 'B2',
    question:
      'Read: "The government\'s latest initiative on housing has been lauded by some as a bold step forward, while others dismiss it as a superficial gesture that fails to address the root causes of the crisis." — What is the overall tone of this passage?',
    options: [
      'Fully supportive',
      'Fully critical',
      'Neutral and balanced',
      'Sarcastic',
    ],
    correct: 'Neutral and balanced',
  },
]

// ── Grammar — C1 (4 questions) ──────────────────────────────────────────────
const grammarC1: AssessmentQuestion[] = [
  {
    id: 'g-c1-001',
    skill: 'grammar',
    difficulty: 'C1',
    question: '___ the manager who approved the decision. (cleft sentence)',
    options: ['It was', 'It is', 'There was', 'What was'],
    correct: 'It was',
    grammar_slug: 'cleft-sentences',
  },
  {
    id: 'g-c1-002',
    skill: 'grammar',
    difficulty: 'C1',
    question: 'Rarely ___ such a convincing performance.',
    options: ['I have seen', 'have I seen', 'I had seen', 'do I see'],
    correct: 'have I seen',
    grammar_slug: 'inversion',
  },
  {
    id: 'g-c1-003',
    skill: 'grammar',
    difficulty: 'C1',
    question: 'The committee recommended that the proposal ___ immediately.',
    options: ['is reviewed', 'was reviewed', 'be reviewed', 'will be reviewed'],
    correct: 'be reviewed',
    grammar_slug: 'subjunctive-formal',
  },
  {
    id: 'g-c1-004',
    skill: 'grammar',
    difficulty: 'C1',
    question:
      '___ all the evidence, the judge returned a verdict of not guilty.',
    options: [
      'Having considered',
      'Considering to',
      'To have considered',
      'Being considered',
    ],
    correct: 'Having considered',
    grammar_slug: 'participle-clauses',
  },
]

// ── Vocabulary — C1 (4 questions) ────────────────────────────────────────────
const vocabularyC1: AssessmentQuestion[] = [
  {
    id: 'v-c1-001',
    skill: 'vocabulary',
    difficulty: 'C1',
    question: 'Choose the word closest in meaning to "ostensibly".',
    options: ['genuinely', 'apparently', 'secretly', 'occasionally'],
    correct: 'apparently',
  },
  {
    id: 'v-c1-002',
    skill: 'vocabulary',
    difficulty: 'C1',
    question:
      '"She managed to ___ the criticism by addressing each point carefully." (to counter or disprove)',
    options: ['avoid', 'rebut', 'distract', 'dismiss'],
    correct: 'rebut',
  },
  {
    id: 'v-c1-003',
    skill: 'vocabulary',
    difficulty: 'C1',
    question: 'What does "pernicious" mean?',
    options: ['harmless', 'beneficial', 'having a harmful effect', 'temporary'],
    correct: 'having a harmful effect',
  },
  {
    id: 'v-c1-004',
    skill: 'vocabulary',
    difficulty: 'C1',
    question:
      '"The politician\'s speech was full of ___." (inflated language designed to impress rather than inform)',
    options: ['rhetoric', 'irony', 'satire', 'metaphor'],
    correct: 'rhetoric',
  },
]

// ── Reading — C1 (2 questions) ────────────────────────────────────────────────
const readingC1: AssessmentQuestion[] = [
  {
    id: 'r-c1-001',
    skill: 'reading',
    difficulty: 'C1',
    question:
      'Read: "The relentless pursuit of economic growth, predicated on the assumption that prosperity and wellbeing are synonymous, has increasingly come under scrutiny. Critics argue that this conflation obscures the very real costs borne by communities and ecosystems alike." — What do the critics argue?',
    options: [
      'Economic growth is always beneficial.',
      'Wellbeing and prosperity are the same thing.',
      'The focus on growth ignores its negative impacts.',
      'Communities benefit the most from growth.',
    ],
    correct: 'The focus on growth ignores its negative impacts.',
  },
  {
    id: 'r-c1-002',
    skill: 'reading',
    difficulty: 'C1',
    question:
      'Read: "She answered every question with the kind of careful precision that suggested she had anticipated them all in advance." — What does the passage imply about her?',
    options: [
      'She was nervous.',
      'She was unprepared.',
      'She had prepared thoroughly.',
      'She misunderstood the questions.',
    ],
    correct: 'She had prepared thoroughly.',
  },
]

// ── Grammar — C2 (4 questions) ──────────────────────────────────────────────
const grammarC2: AssessmentQuestion[] = [
  {
    id: 'g-c2-001',
    skill: 'grammar',
    difficulty: 'C2',
    question:
      '"The ___ of new regulations has significantly impacted small businesses." — Choose the correct nominalization of "implement".',
    options: ['implementation', 'implementing', 'implemented', 'implements'],
    correct: 'implementation',
    grammar_slug: 'nominalization',
  },
  {
    id: 'g-c2-002',
    skill: 'grammar',
    difficulty: 'C2',
    question:
      '___ he known about the risks, he would never have agreed. (formal conditional without "if")',
    options: ['Had', 'Should', 'Were', 'Did'],
    correct: 'Had',
    grammar_slug: 'inversion-conditional',
  },
  {
    id: 'g-c2-003',
    skill: 'grammar',
    difficulty: 'C2',
    question:
      'It is essential that every delegate ___ present for the vote. (formal/subjunctive)',
    options: ['is', 'are', 'be', 'will be'],
    correct: 'be',
    grammar_slug: 'subjunctive-formal',
  },
  {
    id: 'g-c2-004',
    skill: 'grammar',
    difficulty: 'C2',
    question: 'The findings ___ to be inconclusive by the review board.',
    options: [
      'were considered',
      'are considered',
      'have been considering',
      'had considered',
    ],
    correct: 'were considered',
    grammar_slug: 'passive-reporting-verbs',
  },
]

// ── Vocabulary — C2 (4 questions) ────────────────────────────────────────────
const vocabularyC2: AssessmentQuestion[] = [
  {
    id: 'v-c2-001',
    skill: 'vocabulary',
    difficulty: 'C2',
    question:
      '"He remained ___ about the outcome despite the setbacks." — Which word fits? (meaning calmly optimistic)',
    options: ['pessimistic', 'sanguine', 'indifferent', 'anxious'],
    correct: 'sanguine',
  },
  {
    id: 'v-c2-002',
    skill: 'vocabulary',
    difficulty: 'C2',
    question:
      "The author's prose is notable for being ___: she uses far more words than necessary.",
    options: ['laconic', 'verbose', 'eloquent', 'terse'],
    correct: 'verbose',
  },
  {
    id: 'v-c2-003',
    skill: 'vocabulary',
    difficulty: 'C2',
    question:
      '"The new law was designed to ___ the growing power of monopolies." (to limit or cut back something undesirable)',
    options: ['encourage', 'circumvent', 'curtail', 'expedite'],
    correct: 'curtail',
  },
  {
    id: 'v-c2-004',
    skill: 'vocabulary',
    difficulty: 'C2',
    question: 'What does "equivocate" mean?',
    options: [
      'to speak clearly and directly',
      'to use vague language to avoid commitment',
      'to exaggerate the facts',
      'to repeat the same point',
    ],
    correct: 'to use vague language to avoid commitment',
  },
]

// ── Reading — C2 (2 questions) ────────────────────────────────────────────────
const readingC2: AssessmentQuestion[] = [
  {
    id: 'r-c2-001',
    skill: 'reading',
    difficulty: 'C2',
    question:
      'Read: "It would be tempting to describe the author\'s silence on this matter as mere oversight; tempting, but ultimately untenable." — What does the writer suggest about the author\'s silence?',
    options: [
      'It was accidental.',
      'It was deliberate and significant.',
      'It was understandable.',
      'It was irrelevant to the argument.',
    ],
    correct: 'It was deliberate and significant.',
  },
  {
    id: 'r-c2-002',
    skill: 'reading',
    difficulty: 'C2',
    question:
      "Read: \"The novel's narrator is, by turns, unreliable, self-contradictory, and yet strangely compelling — a figure whose distortions of truth ultimately reveal more about the human condition than any straightforward account could.\" — What is the writer's main point about the narrator's unreliability?",
    options: [
      'It makes the novel confusing and hard to read.',
      "It undermines the novel's credibility.",
      'It is a flaw that the author should have corrected.',
      "It paradoxically enhances the novel's insight into human nature.",
    ],
    correct: "It paradoxically enhances the novel's insight into human nature.",
  },
]

// ── Full bank ─────────────────────────────────────────────────────────────────
export const assessmentBank: AssessmentQuestion[] = [
  ...grammarA1,
  ...grammarA2,
  ...grammarB1,
  ...grammarB2,
  ...grammarC1,
  ...grammarC2,
  ...vocabularyA1,
  ...vocabularyA2,
  ...vocabularyB1,
  ...vocabularyB2,
  ...vocabularyC1,
  ...vocabularyC2,
  ...readingA1A2,
  ...readingB1B2,
  ...readingB2,
  ...readingC1,
  ...readingC2,
]

// ── Adaptive quiz helpers ─────────────────────────────────────────────────────

const LEVEL_ORDER = CEFR_LEVELS

/**
 * Pick the next question for the adaptive quiz.
 * Returns null when the quiz should stop.
 */
export function pickNextQuestion(
  usedIds: Set<string>,
  currentLevel: CEFRLevel,
  preferSkill?: 'grammar' | 'vocabulary' | 'reading'
): AssessmentQuestion | null {
  const candidates = assessmentBank.filter(
    (q) =>
      !usedIds.has(q.id) &&
      q.difficulty === currentLevel &&
      (preferSkill == null || q.skill === preferSkill)
  )
  if (candidates.length === 0) {
    // Try without skill filter
    const fallback = assessmentBank.filter(
      (q) => !usedIds.has(q.id) && q.difficulty === currentLevel
    )
    return fallback[Math.floor(Math.random() * fallback.length)] ?? null
  }
  return candidates[Math.floor(Math.random() * candidates.length)]
}

/**
 * Determine next difficulty level after a streak.
 */
export function adjustLevel(
  current: CEFRLevel,
  direction: 'up' | 'down'
): CEFRLevel {
  const idx = LEVEL_ORDER.indexOf(current)
  if (direction === 'up')
    return LEVEL_ORDER[Math.min(idx + 1, LEVEL_ORDER.length - 1)]
  return LEVEL_ORDER[Math.max(idx - 1, 0)]
}
