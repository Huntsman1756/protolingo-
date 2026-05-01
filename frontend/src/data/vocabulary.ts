/**
 * FreeLingo — Vocabulary Hub data layer.
 *
 * All vocabulary sets are keyed by `id` and mapped to curriculum units via
 * `unit_ref`. This file is static — no backend calls needed for browsing.
 *
 * Target coverage:
 *  A1: ~600 words (Oxford 5000 ranks 1–600)
 *  A2: ~600 new words (ranks ~600–1200)
 *  B1: ~600 new words (ranks ~1200–1800)
 */

import type { CEFRLevel } from './grammar'

// ─── Types ────────────────────────────────────────────────────────────────────

export type PartOfSpeech =
  | 'noun'
  | 'verb'
  | 'adjective'
  | 'adverb'
  | 'phrase'
  | 'conjunction'
  | 'preposition'
  | 'numeral'
  | 'pronoun'

export interface VocabularyEntry {
  word: string
  pos: PartOfSpeech
  definition: string
  example: string
  ipa?: string
  frequency_rank?: number
}

export interface VocabularySet {
  id: string
  level: CEFRLevel
  topic: string
  unit_ref: string
  words: VocabularyEntry[]
}

// ─── A1 Vocabulary Sets ───────────────────────────────────────────────────────

const identity_a1: VocabularySet = {
  id: 'identity_a1',
  level: 'A1',
  topic: 'Identity & Personal Information',
  unit_ref: 'a1-unit-1',
  words: [
    { word: 'name', pos: 'noun', definition: 'The word used to identify a person or thing.', example: 'My name is Alex.', ipa: '/neɪm/', frequency_rank: 68 },
    { word: 'age', pos: 'noun', definition: 'How old a person is.', example: 'My age is 25.', ipa: '/eɪdʒ/', frequency_rank: 245 },
    { word: 'country', pos: 'noun', definition: 'A nation with its own government and territory.', example: 'I am from Spain. It is my country.', ipa: '/ˈkʌntri/', frequency_rank: 142 },
    { word: 'city', pos: 'noun', definition: 'A large town where many people live and work.', example: 'I live in a big city.', ipa: '/ˈsɪti/', frequency_rank: 165 },
    { word: 'language', pos: 'noun', definition: 'A system of communication used by people.', example: 'English is a global language.', ipa: '/ˈlæŋɡwɪdʒ/', frequency_rank: 188 },
    { word: 'student', pos: 'noun', definition: 'A person who studies at a school or university.', example: 'She is a student at university.', ipa: '/ˈstjuːdənt/', frequency_rank: 212 },
    { word: 'teacher', pos: 'noun', definition: 'A person who teaches others.', example: 'My teacher is very helpful.', ipa: '/ˈtiːtʃər/', frequency_rank: 298 },
    { word: 'email', pos: 'noun', definition: 'A message sent electronically over the internet.', example: 'Please send me an email.', ipa: '/ˈiːmeɪl/', frequency_rank: 389 },
    { word: 'address', pos: 'noun', definition: 'The details of where a person lives or works.', example: 'What is your address?', ipa: '/əˈdres/', frequency_rank: 301 },
    { word: 'nationality', pos: 'noun', definition: 'The country a person belongs to legally.', example: 'Her nationality is French.', ipa: '/ˌnæʃəˈnælɪti/', frequency_rank: 512 },
    { word: 'profession', pos: 'noun', definition: 'A person\'s job or occupation.', example: 'His profession is engineering.', ipa: '/prəˈfeʃən/', frequency_rank: 487 },
    { word: 'married', pos: 'adjective', definition: 'Having a husband or wife.', example: 'Are you married?', ipa: '/ˈmærid/', frequency_rank: 420 },
    { word: 'single', pos: 'adjective', definition: 'Not married or in a relationship.', example: 'She is single and lives alone.', ipa: '/ˈsɪŋɡəl/', frequency_rank: 215 },
    { word: 'spell', pos: 'verb', definition: 'To say or write the letters of a word.', example: 'Can you spell your surname?', ipa: '/spel/', frequency_rank: 534 },
    { word: 'introduce', pos: 'verb', definition: 'To present yourself or someone else to others.', example: 'Let me introduce myself.', ipa: '/ˌɪntrəˈdjuːs/', frequency_rank: 468 },
  ],
}

const greetings_a1: VocabularySet = {
  id: 'greetings_a1',
  level: 'A1',
  topic: 'Greetings & Farewells',
  unit_ref: 'a1-unit-1',
  words: [
    { word: 'hello', pos: 'phrase', definition: 'Used when meeting someone.', example: 'Hello! Nice to meet you.', ipa: '/həˈloʊ/', frequency_rank: 580 },
    { word: 'goodbye', pos: 'phrase', definition: 'Used when leaving.', example: 'Goodbye! See you tomorrow.', ipa: '/ˌɡʊdˈbaɪ/', frequency_rank: 590 },
    { word: 'please', pos: 'adverb', definition: 'Used to make a polite request.', example: 'Can you help me, please?', ipa: '/pliːz/', frequency_rank: 180 },
    { word: 'thank you', pos: 'phrase', definition: 'Words used to show gratitude.', example: 'Thank you for your help.', ipa: '/ˈθæŋk juː/', frequency_rank: 60 },
    { word: 'sorry', pos: 'phrase', definition: 'Used to apologise.', example: 'Sorry, I am late.', ipa: '/ˈsɒri/', frequency_rank: 280 },
    { word: 'excuse me', pos: 'phrase', definition: 'Used to politely interrupt or get attention.', example: 'Excuse me, where is the station?', ipa: '/ɪkˈskjuːz miː/' },
    { word: 'welcome', pos: 'phrase', definition: 'Used to greet someone who arrives.', example: 'Welcome to England!', ipa: '/ˈwelkəm/', frequency_rank: 350 },
    { word: 'nice', pos: 'adjective', definition: 'Pleasant or enjoyable.', example: 'Nice to meet you.', ipa: '/naɪs/', frequency_rank: 175 },
    { word: 'meet', pos: 'verb', definition: 'To come together with someone.', example: 'I am happy to meet you.', ipa: '/miːt/', frequency_rank: 125 },
    { word: 'fine', pos: 'adjective', definition: 'In good health or satisfactory.', example: 'I am fine, thank you.', ipa: '/faɪn/', frequency_rank: 210 },
    { word: 'morning', pos: 'noun', definition: 'The early part of the day.', example: 'Good morning! How are you?', ipa: '/ˈmɔːrnɪŋ/', frequency_rank: 190 },
    { word: 'evening', pos: 'noun', definition: 'The part of the day after afternoon.', example: 'Good evening, everyone.', ipa: '/ˈiːvnɪŋ/', frequency_rank: 310 },
  ],
}

const numbers_1_20_a1: VocabularySet = {
  id: 'numbers_1_20_a1',
  level: 'A1',
  topic: 'Numbers 1–20',
  unit_ref: 'a1-unit-1',
  words: [
    { word: 'one', pos: 'numeral', definition: 'The number 1.', example: 'I have one sister.', ipa: '/wʌn/' },
    { word: 'two', pos: 'numeral', definition: 'The number 2.', example: 'There are two cats.', ipa: '/tuː/' },
    { word: 'three', pos: 'numeral', definition: 'The number 3.', example: 'I need three tickets.', ipa: '/θriː/' },
    { word: 'four', pos: 'numeral', definition: 'The number 4.', example: 'She has four books.', ipa: '/fɔːr/' },
    { word: 'five', pos: 'numeral', definition: 'The number 5.', example: 'We have five minutes.', ipa: '/faɪv/' },
    { word: 'six', pos: 'numeral', definition: 'The number 6.', example: 'He is six years old.', ipa: '/sɪks/' },
    { word: 'seven', pos: 'numeral', definition: 'The number 7.', example: 'The week has seven days.', ipa: '/ˈsevən/' },
    { word: 'eight', pos: 'numeral', definition: 'The number 8.', example: 'I wake up at eight.', ipa: '/eɪt/' },
    { word: 'nine', pos: 'numeral', definition: 'The number 9.', example: 'There are nine players.', ipa: '/naɪn/' },
    { word: 'ten', pos: 'numeral', definition: 'The number 10.', example: 'Count to ten slowly.', ipa: '/ten/' },
    { word: 'eleven', pos: 'numeral', definition: 'The number 11.', example: 'The bus leaves at eleven.', ipa: '/ɪˈlevən/' },
    { word: 'twelve', pos: 'numeral', definition: 'The number 12.', example: 'A year has twelve months.', ipa: '/twelv/' },
    { word: 'fifteen', pos: 'numeral', definition: 'The number 15.', example: 'I am fifteen years old.', ipa: '/ˌfɪfˈtiːn/' },
    { word: 'twenty', pos: 'numeral', definition: 'The number 20.', example: 'She scored twenty points.', ipa: '/ˈtwenti/' },
    { word: 'hundred', pos: 'numeral', definition: 'The number 100.', example: 'A hundred people came.', ipa: '/ˈhʌndrəd/', frequency_rank: 127 },
    { word: 'number', pos: 'noun', definition: 'A mathematical value used for counting.', example: 'What is your phone number?', ipa: '/ˈnʌmbər/', frequency_rank: 80 },
  ],
}

const family_a1: VocabularySet = {
  id: 'family_a1',
  level: 'A1',
  topic: 'Family & Relationships',
  unit_ref: 'a1-unit-2',
  words: [
    { word: 'mother', pos: 'noun', definition: 'A female parent.', example: 'My mother is a doctor.', ipa: '/ˈmʌðər/', frequency_rank: 115 },
    { word: 'father', pos: 'noun', definition: 'A male parent.', example: 'My father works in a bank.', ipa: '/ˈfɑːðər/', frequency_rank: 120 },
    { word: 'sister', pos: 'noun', definition: 'A female sibling.', example: 'I have two sisters.', ipa: '/ˈsɪstər/', frequency_rank: 230 },
    { word: 'brother', pos: 'noun', definition: 'A male sibling.', example: 'My brother is tall.', ipa: '/ˈbrʌðər/', frequency_rank: 225 },
    { word: 'grandmother', pos: 'noun', definition: 'The mother of your parent.', example: 'My grandmother is 75 years old.', ipa: '/ˈɡrænmʌðər/', frequency_rank: 380 },
    { word: 'grandfather', pos: 'noun', definition: 'The father of your parent.', example: 'My grandfather tells great stories.', ipa: '/ˈɡrænfɑːðər/', frequency_rank: 385 },
    { word: 'son', pos: 'noun', definition: 'A male child.', example: 'They have one son.', ipa: '/sʌn/', frequency_rank: 185 },
    { word: 'daughter', pos: 'noun', definition: 'A female child.', example: 'Their daughter is a student.', ipa: '/ˈdɔːtər/', frequency_rank: 192 },
    { word: 'husband', pos: 'noun', definition: 'A male marriage partner.', example: 'Her husband is a teacher.', ipa: '/ˈhʌzbənd/', frequency_rank: 270 },
    { word: 'wife', pos: 'noun', definition: 'A female marriage partner.', example: 'His wife is a nurse.', ipa: '/waɪf/', frequency_rank: 260 },
    { word: 'friend', pos: 'noun', definition: 'A person you like and trust.', example: 'She is my best friend.', ipa: '/frend/', frequency_rank: 130 },
    { word: 'family', pos: 'noun', definition: 'A group of related people.', example: 'I love my family.', ipa: '/ˈfæməli/', frequency_rank: 106 },
    { word: 'parents', pos: 'noun', definition: 'A mother and father together.', example: 'My parents are from Italy.', ipa: '/ˈpeərənts/', frequency_rank: 200 },
    { word: 'children', pos: 'noun', definition: 'Young people; plural of child.', example: 'They have three children.', ipa: '/ˈtʃɪldrən/', frequency_rank: 103 },
    { word: 'uncle', pos: 'noun', definition: 'The brother of your parent.', example: 'My uncle lives in London.', ipa: '/ˈʌŋkəl/', frequency_rank: 420 },
    { word: 'aunt', pos: 'noun', definition: 'The sister of your parent.', example: 'My aunt is very funny.', ipa: '/ɑːnt/', frequency_rank: 430 },
  ],
}

const colours_a1: VocabularySet = {
  id: 'colours_a1',
  level: 'A1',
  topic: 'Colours',
  unit_ref: 'a1-unit-2',
  words: [
    { word: 'red', pos: 'adjective', definition: 'The colour of blood or fire.', example: 'She is wearing a red dress.', ipa: '/red/', frequency_rank: 295 },
    { word: 'blue', pos: 'adjective', definition: 'The colour of a clear sky.', example: 'The sky is blue today.', ipa: '/bluː/', frequency_rank: 310 },
    { word: 'green', pos: 'adjective', definition: 'The colour of leaves and grass.', example: 'The trees are green in spring.', ipa: '/ɡriːn/', frequency_rank: 320 },
    { word: 'yellow', pos: 'adjective', definition: 'The colour of the sun or a banana.', example: 'The sun is yellow.', ipa: '/ˈjeloʊ/', frequency_rank: 380 },
    { word: 'white', pos: 'adjective', definition: 'The colour of snow or milk.', example: 'She has a white cat.', ipa: '/waɪt/', frequency_rank: 200 },
    { word: 'black', pos: 'adjective', definition: 'The darkest colour; the colour of night.', example: 'He is wearing a black jacket.', ipa: '/blæk/', frequency_rank: 195 },
    { word: 'orange', pos: 'adjective', definition: 'A colour between red and yellow.', example: 'I love orange juice.', ipa: '/ˈɒrɪndʒ/', frequency_rank: 450 },
    { word: 'pink', pos: 'adjective', definition: 'A light red colour.', example: 'Her bedroom walls are pink.', ipa: '/pɪŋk/', frequency_rank: 490 },
    { word: 'purple', pos: 'adjective', definition: 'A colour between red and blue.', example: 'She has a purple umbrella.', ipa: '/ˈpɜːrpəl/', frequency_rank: 510 },
    { word: 'brown', pos: 'adjective', definition: 'The colour of wood or earth.', example: 'The dog has brown eyes.', ipa: '/braʊn/', frequency_rank: 340 },
    { word: 'grey', pos: 'adjective', definition: 'A colour between black and white.', example: 'The sky is grey and cloudy.', ipa: '/ɡreɪ/', frequency_rank: 360 },
    { word: 'colour', pos: 'noun', definition: 'The property produced by light of different wavelengths; e.g. red, blue.', example: 'What is your favourite colour?', ipa: '/ˈkʌlər/', frequency_rank: 280 },
  ],
}

const adjectives_basic_a1: VocabularySet = {
  id: 'adjectives_basic_a1',
  level: 'A1',
  topic: 'Basic Adjectives',
  unit_ref: 'a1-unit-2',
  words: [
    { word: 'big', pos: 'adjective', definition: 'Large in size.', example: 'They live in a big house.', ipa: '/bɪɡ/', frequency_rank: 105 },
    { word: 'small', pos: 'adjective', definition: 'Little in size.', example: 'She has a small dog.', ipa: '/smɔːl/', frequency_rank: 140 },
    { word: 'tall', pos: 'adjective', definition: 'Of great height.', example: 'He is very tall.', ipa: '/tɔːl/', frequency_rank: 310 },
    { word: 'short', pos: 'adjective', definition: 'Not tall; brief in time.', example: 'She has short hair.', ipa: '/ʃɔːrt/', frequency_rank: 180 },
    { word: 'old', pos: 'adjective', definition: 'Having lived or existed for a long time.', example: 'This is an old building.', ipa: '/oʊld/', frequency_rank: 80 },
    { word: 'young', pos: 'adjective', definition: 'Having lived for only a short time.', example: 'She is a young teacher.', ipa: '/jʌŋ/', frequency_rank: 130 },
    { word: 'happy', pos: 'adjective', definition: 'Feeling pleasure or satisfaction.', example: 'I am very happy today.', ipa: '/ˈhæpi/', frequency_rank: 170 },
    { word: 'sad', pos: 'adjective', definition: 'Unhappy; feeling sorrow.', example: 'He looks sad today.', ipa: '/sæd/', frequency_rank: 265 },
    { word: 'good', pos: 'adjective', definition: 'Of high quality or pleasant.', example: 'She is a good student.', ipa: '/ɡʊd/', frequency_rank: 30 },
    { word: 'bad', pos: 'adjective', definition: 'Of poor quality; unpleasant.', example: 'The weather is bad today.', ipa: '/bæd/', frequency_rank: 95 },
    { word: 'fast', pos: 'adjective', definition: 'Moving quickly.', example: 'He is a fast runner.', ipa: '/fæst/', frequency_rank: 190 },
    { word: 'slow', pos: 'adjective', definition: 'Not moving quickly.', example: 'The internet is slow today.', ipa: '/sloʊ/', frequency_rank: 280 },
    { word: 'hot', pos: 'adjective', definition: 'Having a high temperature.', example: 'It is very hot today.', ipa: '/hɒt/', frequency_rank: 220 },
    { word: 'cold', pos: 'adjective', definition: 'Having a low temperature.', example: 'The water is cold.', ipa: '/koʊld/', frequency_rank: 215 },
    { word: 'new', pos: 'adjective', definition: 'Recently made or discovered.', example: 'She has a new phone.', ipa: '/njuː/', frequency_rank: 40 },
    { word: 'beautiful', pos: 'adjective', definition: 'Very pleasant to look at.', example: 'What a beautiful city!', ipa: '/ˈbjuːtɪfəl/', frequency_rank: 340 },
  ],
}

const daily_routines_a1: VocabularySet = {
  id: 'daily_routines_a1',
  level: 'A1',
  topic: 'Daily Routines',
  unit_ref: 'a1-unit-3',
  words: [
    { word: 'wake up', pos: 'verb', definition: 'To stop sleeping.', example: 'I wake up at 7 every morning.', ipa: '/weɪk ʌp/' },
    { word: 'get up', pos: 'verb', definition: 'To get out of bed.', example: 'She gets up at 6:30.', ipa: '/ɡet ʌp/' },
    { word: 'have breakfast', pos: 'phrase', definition: 'To eat the first meal of the day.', example: 'I always have breakfast before work.', ipa: '/hæv ˈbrekfəst/' },
    { word: 'go to work', pos: 'phrase', definition: 'To travel to your place of employment.', example: 'He goes to work by train.', ipa: '/ɡoʊ tə wɜːrk/' },
    { word: 'have lunch', pos: 'phrase', definition: 'To eat the midday meal.', example: 'We usually have lunch at 1 pm.', ipa: '/hæv lʌntʃ/' },
    { word: 'go home', pos: 'phrase', definition: 'To travel back to where you live.', example: 'She goes home at 6 pm.', ipa: '/ɡoʊ hoʊm/' },
    { word: 'have dinner', pos: 'phrase', definition: 'To eat the evening meal.', example: 'We have dinner at 8 pm.', ipa: '/hæv ˈdɪnər/' },
    { word: 'go to bed', pos: 'phrase', definition: 'To lie down to sleep.', example: 'I go to bed at 11 pm.', ipa: '/ɡoʊ tə bed/' },
    { word: 'brush teeth', pos: 'phrase', definition: 'To clean your teeth with a toothbrush.', example: 'I brush my teeth twice a day.', ipa: '/brʌʃ tiːθ/' },
    { word: 'take a shower', pos: 'phrase', definition: 'To wash your body under running water.', example: 'He takes a shower every morning.', ipa: '/teɪk ə ˈʃaʊər/' },
    { word: 'commute', pos: 'verb', definition: 'To travel regularly to work or school.', example: 'She commutes by bus.', ipa: '/kəˈmjuːt/', frequency_rank: 580 },
    { word: 'work', pos: 'verb', definition: 'To do a job or task.', example: 'He works from 9 to 5.', ipa: '/wɜːrk/', frequency_rank: 20 },
    { word: 'study', pos: 'verb', definition: 'To learn by reading or practising.', example: 'She studies English every day.', ipa: '/ˈstʌdi/', frequency_rank: 295 },
    { word: 'cook', pos: 'verb', definition: 'To prepare food using heat.', example: 'I cook dinner every evening.', ipa: '/kʊk/', frequency_rank: 360 },
    { word: 'clean', pos: 'verb', definition: 'To remove dirt from something.', example: 'I clean the house on Saturdays.', ipa: '/kliːn/', frequency_rank: 280 },
  ],
}

const time_expressions_a1: VocabularySet = {
  id: 'time_expressions_a1',
  level: 'A1',
  topic: 'Time Expressions',
  unit_ref: 'a1-unit-3',
  words: [
    { word: 'today', pos: 'adverb', definition: 'On this current day.', example: 'What are you doing today?', ipa: '/təˈdeɪ/', frequency_rank: 90 },
    { word: 'tomorrow', pos: 'adverb', definition: 'On the day after today.', example: 'I will see you tomorrow.', ipa: '/təˈmɒroʊ/', frequency_rank: 260 },
    { word: 'yesterday', pos: 'adverb', definition: 'On the day before today.', example: 'I was at home yesterday.', ipa: '/ˈjestərdeɪ/', frequency_rank: 290 },
    { word: 'always', pos: 'adverb', definition: 'At all times; on every occasion.', example: 'She always arrives on time.', ipa: '/ˈɔːlweɪz/', frequency_rank: 150 },
    { word: 'usually', pos: 'adverb', definition: 'In most cases; most of the time.', example: 'I usually have coffee in the morning.', ipa: '/ˈjuːʒuəli/', frequency_rank: 240 },
    { word: 'often', pos: 'adverb', definition: 'Many times; frequently.', example: 'He often works late.', ipa: '/ˈɒfən/', frequency_rank: 160 },
    { word: 'sometimes', pos: 'adverb', definition: 'On some occasions, but not always.', example: 'I sometimes go to the gym.', ipa: '/ˈsʌmtaɪmz/', frequency_rank: 195 },
    { word: 'never', pos: 'adverb', definition: 'Not at any time; not ever.', example: 'She never eats meat.', ipa: '/ˈnevər/', frequency_rank: 145 },
    { word: 'every day', pos: 'phrase', definition: 'Each day without exception.', example: 'I exercise every day.', ipa: '/ˈevri deɪ/' },
    { word: 'week', pos: 'noun', definition: 'A period of seven days.', example: 'I work five days a week.', ipa: '/wiːk/', frequency_rank: 110 },
    { word: 'month', pos: 'noun', definition: 'One of the twelve periods a year is divided into.', example: 'My birthday is next month.', ipa: '/mʌnθ/', frequency_rank: 120 },
    { word: 'year', pos: 'noun', definition: 'A period of 365 days.', example: 'I study English every year.', ipa: '/jɪər/', frequency_rank: 75 },
    { word: 'morning', pos: 'noun', definition: 'The early part of the day (before noon).', example: 'I run every morning.', ipa: '/ˈmɔːrnɪŋ/', frequency_rank: 190 },
    { word: 'afternoon', pos: 'noun', definition: 'The part of the day between noon and evening.', example: 'She naps every afternoon.', ipa: '/ˌɑːftərˈnuːn/', frequency_rank: 360 },
    { word: 'night', pos: 'noun', definition: 'The part of the day when it is dark.', example: 'I study at night.', ipa: '/naɪt/', frequency_rank: 100 },
  ],
}

const verbs_basic_a1: VocabularySet = {
  id: 'verbs_basic_a1',
  level: 'A1',
  topic: 'Basic Verbs',
  unit_ref: 'a1-unit-3',
  words: [
    { word: 'be', pos: 'verb', definition: 'To exist; am/is/are.', example: 'I am a teacher.', ipa: '/biː/', frequency_rank: 1 },
    { word: 'have', pos: 'verb', definition: 'To own or possess.', example: 'I have two cats.', ipa: '/hæv/', frequency_rank: 5 },
    { word: 'do', pos: 'verb', definition: 'To perform an action.', example: 'What do you do?', ipa: '/duː/', frequency_rank: 8 },
    { word: 'go', pos: 'verb', definition: 'To move or travel.', example: 'I go to school by bus.', ipa: '/ɡoʊ/', frequency_rank: 12 },
    { word: 'come', pos: 'verb', definition: 'To move towards a place.', example: 'Come here, please!', ipa: '/kʌm/', frequency_rank: 15 },
    { word: 'see', pos: 'verb', definition: 'To perceive with the eyes.', example: 'I can see a bird.', ipa: '/siː/', frequency_rank: 18 },
    { word: 'get', pos: 'verb', definition: 'To obtain or receive.', example: 'I get the bus at 8.', ipa: '/ɡet/', frequency_rank: 10 },
    { word: 'say', pos: 'verb', definition: 'To speak words.', example: 'What did she say?', ipa: '/seɪ/', frequency_rank: 7 },
    { word: 'know', pos: 'verb', definition: 'To have information or understanding.', example: 'I know the answer.', ipa: '/noʊ/', frequency_rank: 14 },
    { word: 'think', pos: 'verb', definition: 'To use your mind to consider something.', example: 'I think it is correct.', ipa: '/θɪŋk/', frequency_rank: 22 },
    { word: 'like', pos: 'verb', definition: 'To enjoy or be fond of.', example: 'I like reading books.', ipa: '/laɪk/', frequency_rank: 35 },
    { word: 'want', pos: 'verb', definition: 'To wish for or desire.', example: 'I want a coffee.', ipa: '/wɒnt/', frequency_rank: 40 },
    { word: 'use', pos: 'verb', definition: 'To employ for a purpose.', example: 'Do you use a dictionary?', ipa: '/juːz/', frequency_rank: 25 },
    { word: 'give', pos: 'verb', definition: 'To hand something to someone.', example: 'She gives flowers to her friend.', ipa: '/ɡɪv/', frequency_rank: 30 },
    { word: 'live', pos: 'verb', definition: 'To have your home in a place.', example: 'I live in Madrid.', ipa: '/lɪv/', frequency_rank: 45 },
  ],
}

const home_a1: VocabularySet = {
  id: 'home_a1',
  level: 'A1',
  topic: 'Home & Furniture',
  unit_ref: 'a1-unit-4',
  words: [
    { word: 'house', pos: 'noun', definition: 'A building people live in.', example: 'They live in a small house.', ipa: '/haʊs/', frequency_rank: 95 },
    { word: 'flat', pos: 'noun', definition: 'An apartment in a building (British English).', example: 'She rents a flat in London.', ipa: '/flæt/', frequency_rank: 310 },
    { word: 'room', pos: 'noun', definition: 'A separate area inside a building.', example: 'There are five rooms in our house.', ipa: '/ruːm/', frequency_rank: 120 },
    { word: 'kitchen', pos: 'noun', definition: 'The room used for cooking.', example: 'She is cooking in the kitchen.', ipa: '/ˈkɪtʃɪn/', frequency_rank: 360 },
    { word: 'bedroom', pos: 'noun', definition: 'The room used for sleeping.', example: 'My bedroom is on the first floor.', ipa: '/ˈbedruːm/', frequency_rank: 390 },
    { word: 'bathroom', pos: 'noun', definition: 'The room with a bath or shower and toilet.', example: 'The bathroom is next to the bedroom.', ipa: '/ˈbæθruːm/', frequency_rank: 420 },
    { word: 'living room', pos: 'noun', definition: 'The main room in a house for relaxing.', example: 'We watch TV in the living room.', ipa: '/ˈlɪvɪŋ ruːm/', frequency_rank: 430 },
    { word: 'garden', pos: 'noun', definition: 'An outdoor area with plants next to a house.', example: 'They grow vegetables in the garden.', ipa: '/ˈɡɑːrdən/', frequency_rank: 380 },
    { word: 'table', pos: 'noun', definition: 'A flat surface with legs used for eating or working.', example: 'The books are on the table.', ipa: '/ˈteɪbəl/', frequency_rank: 195 },
    { word: 'chair', pos: 'noun', definition: 'A seat with a back for one person.', example: 'Please sit on that chair.', ipa: '/tʃer/', frequency_rank: 280 },
    { word: 'bed', pos: 'noun', definition: 'A piece of furniture for sleeping.', example: 'I sleep in a big bed.', ipa: '/bed/', frequency_rank: 130 },
    { word: 'sofa', pos: 'noun', definition: 'A long comfortable seat for several people.', example: 'The cat is sleeping on the sofa.', ipa: '/ˈsoʊfə/', frequency_rank: 490 },
    { word: 'window', pos: 'noun', definition: 'An opening in a wall covered with glass.', example: 'Please open the window.', ipa: '/ˈwɪndoʊ/', frequency_rank: 220 },
    { word: 'door', pos: 'noun', definition: 'A movable barrier used to close an entrance.', example: 'Close the door, please.', ipa: '/dɔːr/', frequency_rank: 150 },
    { word: 'floor', pos: 'noun', definition: 'The bottom surface of a room.', example: 'The cat is sitting on the floor.', ipa: '/flɔːr/', frequency_rank: 160 },
  ],
}

const city_places_a1: VocabularySet = {
  id: 'city_places_a1',
  level: 'A1',
  topic: 'City & Places',
  unit_ref: 'a1-unit-4',
  words: [
    { word: 'school', pos: 'noun', definition: 'A place where children go to learn.', example: 'She goes to school every day.', ipa: '/skuːl/', frequency_rank: 135 },
    { word: 'hospital', pos: 'noun', definition: 'A place where sick people are treated.', example: 'He works in a hospital.', ipa: '/ˈhɒspɪtəl/', frequency_rank: 270 },
    { word: 'supermarket', pos: 'noun', definition: 'A large shop selling food and household goods.', example: 'I go to the supermarket on Fridays.', ipa: '/ˈsuːpərmɑːrkɪt/', frequency_rank: 480 },
    { word: 'restaurant', pos: 'noun', definition: 'A place where people pay to eat meals.', example: 'We went to a nice restaurant.', ipa: '/ˈrestərɒnt/', frequency_rank: 340 },
    { word: 'bank', pos: 'noun', definition: 'A place that keeps money and provides financial services.', example: 'I need to go to the bank.', ipa: '/bæŋk/', frequency_rank: 175 },
    { word: 'park', pos: 'noun', definition: 'A large public area with grass and trees.', example: 'We have lunch in the park.', ipa: '/pɑːrk/', frequency_rank: 245 },
    { word: 'station', pos: 'noun', definition: 'A place where trains or buses stop.', example: 'The station is near the hotel.', ipa: '/ˈsteɪʃən/', frequency_rank: 290 },
    { word: 'airport', pos: 'noun', definition: 'A place where planes land and take off.', example: 'The airport is 30 km away.', ipa: '/ˈerˌpɔːrt/', frequency_rank: 400 },
    { word: 'hotel', pos: 'noun', definition: 'A building where people stay when travelling.', example: 'We stayed in a great hotel.', ipa: '/hoʊˈtel/', frequency_rank: 320 },
    { word: 'shop', pos: 'noun', definition: 'A place where things are sold.', example: 'There is a new shop near my house.', ipa: '/ʃɒp/', frequency_rank: 195 },
    { word: 'library', pos: 'noun', definition: 'A place where books are kept for people to borrow.', example: 'I borrow books from the library.', ipa: '/ˈlaɪbrəri/', frequency_rank: 380 },
    { word: 'street', pos: 'noun', definition: 'A public road in a town or city.', example: 'The café is on this street.', ipa: '/striːt/', frequency_rank: 160 },
    { word: 'road', pos: 'noun', definition: 'A hard path used by vehicles.', example: 'The main road is closed.', ipa: '/roʊd/', frequency_rank: 110 },
    { word: 'centre', pos: 'noun', definition: 'The middle area of a town or city.', example: 'We live in the city centre.', ipa: '/ˈsentər/', frequency_rank: 170 },
    { word: 'near', pos: 'preposition', definition: 'Not far from something.', example: 'The hotel is near the station.', ipa: '/nɪər/', frequency_rank: 118 },
  ],
}

const prepositions_a1: VocabularySet = {
  id: 'prepositions_a1',
  level: 'A1',
  topic: 'Prepositions of Place',
  unit_ref: 'a1-unit-4',
  words: [
    { word: 'in', pos: 'preposition', definition: 'Inside a space or area.', example: 'The key is in the drawer.', ipa: '/ɪn/', frequency_rank: 4 },
    { word: 'on', pos: 'preposition', definition: 'On the surface of something.', example: 'The book is on the table.', ipa: '/ɒn/', frequency_rank: 6 },
    { word: 'at', pos: 'preposition', definition: 'At a specific location or time.', example: 'I am at the office.', ipa: '/æt/', frequency_rank: 9 },
    { word: 'under', pos: 'preposition', definition: 'Below or beneath something.', example: 'The cat is under the bed.', ipa: '/ˈʌndər/', frequency_rank: 130 },
    { word: 'next to', pos: 'preposition', definition: 'Beside; very close to.', example: 'The bank is next to the school.', ipa: '/nekst tuː/' },
    { word: 'behind', pos: 'preposition', definition: 'At the back of something.', example: 'The car is behind the house.', ipa: '/bɪˈhaɪnd/', frequency_rank: 250 },
    { word: 'in front of', pos: 'preposition', definition: 'Facing something; before it.', example: 'She is standing in front of the door.', ipa: '/ɪn frʌnt əv/' },
    { word: 'between', pos: 'preposition', definition: 'In the space separating two things.', example: 'The shop is between the bank and the café.', ipa: '/bɪˈtwiːn/', frequency_rank: 175 },
    { word: 'above', pos: 'preposition', definition: 'At a higher position than.', example: 'The clock is above the door.', ipa: '/əˈbʌv/', frequency_rank: 210 },
    { word: 'opposite', pos: 'preposition', definition: 'Directly facing; on the other side.', example: 'The park is opposite the hotel.', ipa: '/ˈɒpəzɪt/', frequency_rank: 350 },
    { word: 'outside', pos: 'preposition', definition: 'Not inside; beyond the boundaries.', example: 'The children are playing outside.', ipa: '/ˌaʊtˈsaɪd/', frequency_rank: 265 },
    { word: 'inside', pos: 'preposition', definition: 'Within a space or building.', example: 'It is warm inside the house.', ipa: '/ˈɪnsaɪd/', frequency_rank: 275 },
  ],
}

const action_verbs_a1: VocabularySet = {
  id: 'action_verbs_a1',
  level: 'A1',
  topic: 'Action Verbs',
  unit_ref: 'a1-unit-5',
  words: [
    { word: 'run', pos: 'verb', definition: 'To move quickly on foot.', example: 'She runs every morning.', ipa: '/rʌn/', frequency_rank: 95 },
    { word: 'walk', pos: 'verb', definition: 'To move on foot at a normal speed.', example: 'I walk to school every day.', ipa: '/wɔːk/', frequency_rank: 130 },
    { word: 'eat', pos: 'verb', definition: 'To put food in your mouth and swallow it.', example: 'We eat dinner at 7 pm.', ipa: '/iːt/', frequency_rank: 105 },
    { word: 'drink', pos: 'verb', definition: 'To swallow a liquid.', example: 'I drink coffee every morning.', ipa: '/drɪŋk/', frequency_rank: 190 },
    { word: 'read', pos: 'verb', definition: 'To look at and understand written words.', example: 'He reads a book every evening.', ipa: '/riːd/', frequency_rank: 80 },
    { word: 'write', pos: 'verb', definition: 'To form letters or words on paper.', example: 'She is writing a letter.', ipa: '/raɪt/', frequency_rank: 75 },
    { word: 'talk', pos: 'verb', definition: 'To speak; to have a conversation.', example: 'They are talking on the phone.', ipa: '/tɔːk/', frequency_rank: 112 },
    { word: 'listen', pos: 'verb', definition: 'To pay attention to a sound.', example: 'I listen to music on the bus.', ipa: '/ˈlɪsən/', frequency_rank: 175 },
    { word: 'watch', pos: 'verb', definition: 'To look at something for a period of time.', example: 'We watch TV after dinner.', ipa: '/wɒtʃ/', frequency_rank: 125 },
    { word: 'play', pos: 'verb', definition: 'To take part in a game or activity for fun.', example: 'The children are playing in the park.', ipa: '/pleɪ/', frequency_rank: 90 },
    { word: 'swim', pos: 'verb', definition: 'To move through water using your body.', example: 'He swims twice a week.', ipa: '/swɪm/', frequency_rank: 350 },
    { word: 'dance', pos: 'verb', definition: 'To move your body rhythmically to music.', example: 'She loves to dance.', ipa: '/dæns/', frequency_rank: 380 },
    { word: 'sing', pos: 'verb', definition: 'To make musical sounds with your voice.', example: 'He sings in the shower.', ipa: '/sɪŋ/', frequency_rank: 355 },
    { word: 'drive', pos: 'verb', definition: 'To control and steer a vehicle.', example: 'She drives to work.', ipa: '/draɪv/', frequency_rank: 175 },
    { word: 'carry', pos: 'verb', definition: 'To hold and move something.', example: 'He carries a heavy bag.', ipa: '/ˈkæri/', frequency_rank: 195 },
  ],
}

const clothes_a1: VocabularySet = {
  id: 'clothes_a1',
  level: 'A1',
  topic: 'Clothes & Appearance',
  unit_ref: 'a1-unit-5',
  words: [
    { word: 'shirt', pos: 'noun', definition: 'A piece of clothing worn on the upper body with a collar and buttons.', example: 'He is wearing a white shirt.', ipa: '/ʃɜːrt/', frequency_rank: 410 },
    { word: 'trousers', pos: 'noun', definition: 'Clothing covering both legs from the waist down.', example: 'These trousers are too long.', ipa: '/ˈtraʊzərz/', frequency_rank: 490 },
    { word: 'dress', pos: 'noun', definition: 'A one-piece garment worn by women.', example: 'She is wearing a blue dress.', ipa: '/dres/', frequency_rank: 310 },
    { word: 'jacket', pos: 'noun', definition: 'A short coat worn over other clothing.', example: 'He is wearing a leather jacket.', ipa: '/ˈdʒækɪt/', frequency_rank: 420 },
    { word: 'shoes', pos: 'noun', definition: 'Coverings for the feet.', example: 'I need new shoes.', ipa: '/ʃuːz/', frequency_rank: 310 },
    { word: 'socks', pos: 'noun', definition: 'Short fabric coverings for the feet worn inside shoes.', example: 'Where are my socks?', ipa: '/sɒks/', frequency_rank: 560 },
    { word: 'hat', pos: 'noun', definition: 'A covering worn on the head.', example: 'She wears a hat in summer.', ipa: '/hæt/', frequency_rank: 350 },
    { word: 'coat', pos: 'noun', definition: 'A long warm outer garment.', example: 'Wear your coat, it\'s cold.', ipa: '/koʊt/', frequency_rank: 295 },
    { word: 'jumper', pos: 'noun', definition: 'A warm knitted garment worn on the upper body.', example: 'She is wearing a red jumper.', ipa: '/ˈdʒʌmpər/', frequency_rank: 540 },
    { word: 'skirt', pos: 'noun', definition: 'A garment hanging from the waist.', example: 'She wears a skirt to work.', ipa: '/skɜːrt/', frequency_rank: 480 },
    { word: 'wear', pos: 'verb', definition: 'To have clothing on your body.', example: 'What are you wearing today?', ipa: '/wer/', frequency_rank: 175 },
    { word: 'size', pos: 'noun', definition: 'The measurement of how big something is.', example: 'What size do you wear?', ipa: '/saɪz/', frequency_rank: 190 },
  ],
}

const sports_a1: VocabularySet = {
  id: 'sports_a1',
  level: 'A1',
  topic: 'Sports & Hobbies',
  unit_ref: 'a1-unit-5',
  words: [
    { word: 'football', pos: 'noun', definition: 'A team sport played with a round ball kicked into a goal.', example: 'I play football every Saturday.', ipa: '/ˈfʊtbɔːl/', frequency_rank: 390 },
    { word: 'tennis', pos: 'noun', definition: 'A sport played by hitting a ball over a net with a racket.', example: 'She plays tennis twice a week.', ipa: '/ˈtenɪs/', frequency_rank: 490 },
    { word: 'basketball', pos: 'noun', definition: 'A sport where players throw a ball into a high basket.', example: 'He plays basketball after school.', ipa: '/ˈbɑːskɪtbɔːl/', frequency_rank: 510 },
    { word: 'swimming', pos: 'noun', definition: 'The sport of moving through water.', example: 'Swimming is good exercise.', ipa: '/ˈswɪmɪŋ/', frequency_rank: 450 },
    { word: 'cycling', pos: 'noun', definition: 'The activity of riding a bicycle.', example: 'I go cycling in the park.', ipa: '/ˈsaɪklɪŋ/', frequency_rank: 560 },
    { word: 'yoga', pos: 'noun', definition: 'A system of physical exercises and breathing techniques.', example: 'She does yoga every morning.', ipa: '/ˈjoʊɡə/' },
    { word: 'gym', pos: 'noun', definition: 'A place with equipment for physical exercise.', example: 'I go to the gym three times a week.', ipa: '/dʒɪm/', frequency_rank: 580 },
    { word: 'team', pos: 'noun', definition: 'A group of people who play or work together.', example: 'Our team won the match.', ipa: '/tiːm/', frequency_rank: 155 },
    { word: 'match', pos: 'noun', definition: 'A sports game or contest.', example: 'The football match starts at 8.', ipa: '/mætʃ/', frequency_rank: 275 },
    { word: 'win', pos: 'verb', definition: 'To be first or best in a competition.', example: 'Our team always wins.', ipa: '/wɪn/', frequency_rank: 140 },
    { word: 'lose', pos: 'verb', definition: 'To not win a game or competition.', example: 'They lost the match 2–1.', ipa: '/luːz/', frequency_rank: 145 },
    { word: 'hobby', pos: 'noun', definition: 'An activity done for enjoyment in free time.', example: 'My hobby is photography.', ipa: '/ˈhɒbi/', frequency_rank: 520 },
  ],
}

const past_time_expressions_a1: VocabularySet = {
  id: 'past_time_expressions_a1',
  level: 'A1',
  topic: 'Past Time Expressions',
  unit_ref: 'a1-unit-6',
  words: [
    { word: 'yesterday', pos: 'adverb', definition: 'On the day before today.', example: 'I called her yesterday.', ipa: '/ˈjestərdeɪ/', frequency_rank: 290 },
    { word: 'last night', pos: 'phrase', definition: 'During the previous evening or night.', example: 'I watched a film last night.', ipa: '/lɑːst naɪt/' },
    { word: 'last week', pos: 'phrase', definition: 'During the week before this one.', example: 'I started a new job last week.', ipa: '/lɑːst wiːk/' },
    { word: 'last year', pos: 'phrase', definition: 'During the year before this one.', example: 'We moved here last year.', ipa: '/lɑːst jɪər/' },
    { word: 'ago', pos: 'adverb', definition: 'Used after a time expression to mean "before now".', example: 'I moved here two years ago.', ipa: '/əˈɡoʊ/', frequency_rank: 320 },
    { word: 'in 2020', pos: 'phrase', definition: 'A pattern for referring to a specific year.', example: 'The pandemic started in 2020.', ipa: '/ɪn ˌtuːˈθaʊzənd ˌtwentiː/' },
    { word: 'at that time', pos: 'phrase', definition: 'During a particular moment in the past.', example: 'At that time, I was a student.', ipa: '/æt ðæt taɪm/' },
    { word: 'then', pos: 'adverb', definition: 'At that time; after that.', example: 'We had lunch, then went for a walk.', ipa: '/ðen/', frequency_rank: 60 },
    { word: 'before', pos: 'preposition', definition: 'Earlier than a time or event.', example: 'I always stretch before I run.', ipa: '/bɪˈfɔːr/', frequency_rank: 75 },
    { word: 'after', pos: 'preposition', definition: 'Later than a time or event.', example: 'I went to bed after midnight.', ipa: '/ˈɑːftər/', frequency_rank: 65 },
    { word: 'when', pos: 'conjunction', definition: 'At the time that something happened.', example: 'When I was young, I loved swimming.', ipa: '/wen/', frequency_rank: 32 },
  ],
}

const regular_verbs_past_a1: VocabularySet = {
  id: 'regular_verbs_past_a1',
  level: 'A1',
  topic: 'Regular Past Verbs',
  unit_ref: 'a1-unit-6',
  words: [
    { word: 'walked', pos: 'verb', definition: 'Past tense of "walk".', example: 'She walked to school yesterday.', ipa: '/wɔːkt/' },
    { word: 'talked', pos: 'verb', definition: 'Past tense of "talk".', example: 'We talked for two hours.', ipa: '/tɔːkt/' },
    { word: 'played', pos: 'verb', definition: 'Past tense of "play".', example: 'The children played in the park.', ipa: '/pleɪd/' },
    { word: 'watched', pos: 'verb', definition: 'Past tense of "watch".', example: 'I watched a film last night.', ipa: '/wɒtʃt/' },
    { word: 'cooked', pos: 'verb', definition: 'Past tense of "cook".', example: 'He cooked dinner for everyone.', ipa: '/kʊkt/' },
    { word: 'worked', pos: 'verb', definition: 'Past tense of "work".', example: 'She worked late yesterday.', ipa: '/wɜːrkt/' },
    { word: 'studied', pos: 'verb', definition: 'Past tense of "study".', example: 'I studied all morning.', ipa: '/ˈstʌdid/' },
    { word: 'listened', pos: 'verb', definition: 'Past tense of "listen".', example: 'They listened to music.', ipa: '/ˈlɪsənd/' },
    { word: 'called', pos: 'verb', definition: 'Past tense of "call".', example: 'I called my mum last night.', ipa: '/kɔːld/' },
    { word: 'cleaned', pos: 'verb', definition: 'Past tense of "clean".', example: 'She cleaned the house.', ipa: '/kliːnd/' },
    { word: 'visited', pos: 'verb', definition: 'Past tense of "visit".', example: 'We visited Rome last summer.', ipa: '/ˈvɪzɪtɪd/' },
    { word: 'finished', pos: 'verb', definition: 'Past tense of "finish".', example: 'He finished work at 5.', ipa: '/ˈfɪnɪʃt/' },
    { word: 'started', pos: 'verb', definition: 'Past tense of "start".', example: 'The film started at 8.', ipa: '/ˈstɑːrtɪd/' },
    { word: 'waited', pos: 'verb', definition: 'Past tense of "wait".', example: 'I waited for 20 minutes.', ipa: '/ˈweɪtɪd/' },
    { word: 'helped', pos: 'verb', definition: 'Past tense of "help".', example: 'She helped me with my homework.', ipa: '/helpt/' },
  ],
}

const irregular_verbs_basic_a1: VocabularySet = {
  id: 'irregular_verbs_basic_a1',
  level: 'A1',
  topic: 'Common Irregular Past Verbs',
  unit_ref: 'a1-unit-6',
  words: [
    { word: 'went', pos: 'verb', definition: 'Past tense of "go".', example: 'I went to the cinema yesterday.', ipa: '/went/' },
    { word: 'came', pos: 'verb', definition: 'Past tense of "come".', example: 'She came home late.', ipa: '/keɪm/' },
    { word: 'saw', pos: 'verb', definition: 'Past tense of "see".', example: 'I saw a great film.', ipa: '/sɔː/' },
    { word: 'had', pos: 'verb', definition: 'Past tense of "have".', example: 'We had a great time.', ipa: '/hæd/' },
    { word: 'got', pos: 'verb', definition: 'Past tense of "get".', example: 'She got a new job.', ipa: '/ɡɒt/' },
    { word: 'made', pos: 'verb', definition: 'Past tense of "make".', example: 'He made a cake.', ipa: '/meɪd/' },
    { word: 'said', pos: 'verb', definition: 'Past tense of "say".', example: 'She said she was tired.', ipa: '/sed/' },
    { word: 'took', pos: 'verb', definition: 'Past tense of "take".', example: 'I took the bus to work.', ipa: '/tʊk/' },
    { word: 'ate', pos: 'verb', definition: 'Past tense of "eat".', example: 'We ate pizza last night.', ipa: '/eɪt/' },
    { word: 'drank', pos: 'verb', definition: 'Past tense of "drink".', example: 'She drank three glasses of water.', ipa: '/dræŋk/' },
    { word: 'knew', pos: 'verb', definition: 'Past tense of "know".', example: 'I knew the answer.', ipa: '/njuː/' },
    { word: 'bought', pos: 'verb', definition: 'Past tense of "buy".', example: 'He bought a new car.', ipa: '/bɔːt/' },
    { word: 'thought', pos: 'verb', definition: 'Past tense of "think".', example: 'I thought it was funny.', ipa: '/θɔːt/' },
    { word: 'found', pos: 'verb', definition: 'Past tense of "find".', example: 'She found her keys.', ipa: '/faʊnd/' },
    { word: 'left', pos: 'verb', definition: 'Past tense of "leave".', example: 'He left at 8 o\'clock.', ipa: '/left/' },
  ],
}

const abilities_a1: VocabularySet = {
  id: 'abilities_a1',
  level: 'A1',
  topic: 'Abilities & Skills',
  unit_ref: 'a1-unit-7',
  words: [
    { word: 'speak', pos: 'verb', definition: 'To use language to communicate.', example: 'She can speak three languages.', ipa: '/spiːk/', frequency_rank: 105 },
    { word: 'drive', pos: 'verb', definition: 'To operate a car or vehicle.', example: 'Can you drive?', ipa: '/draɪv/', frequency_rank: 175 },
    { word: 'cook', pos: 'verb', definition: 'To prepare food.', example: 'He can cook Italian food.', ipa: '/kʊk/', frequency_rank: 360 },
    { word: 'draw', pos: 'verb', definition: 'To create pictures with a pen or pencil.', example: 'She can draw really well.', ipa: '/drɔː/', frequency_rank: 245 },
    { word: 'sing', pos: 'verb', definition: 'To make music with your voice.', example: 'Can you sing?', ipa: '/sɪŋ/', frequency_rank: 355 },
    { word: 'play an instrument', pos: 'phrase', definition: 'To perform music on a musical instrument.', example: 'I can play the guitar.', ipa: '/pleɪ ən ˈɪnstrəmənt/' },
    { word: 'ride a bike', pos: 'phrase', definition: 'To use a bicycle for transport.', example: 'Can you ride a bike?', ipa: '/raɪd ə baɪk/' },
    { word: 'use a computer', pos: 'phrase', definition: 'To operate a computer.', example: 'Most children can use a computer.', ipa: '/juːz ə kəmˈpjuːtər/' },
    { word: 'swim', pos: 'verb', definition: 'To move through water.', example: 'I can\'t swim very well.', ipa: '/swɪm/', frequency_rank: 350 },
    { word: 'dance', pos: 'verb', definition: 'To move rhythmically to music.', example: 'He can dance salsa.', ipa: '/dæns/', frequency_rank: 380 },
    { word: 'ability', pos: 'noun', definition: 'The skill or power to do something.', example: 'She has a great ability to learn languages.', ipa: '/əˈbɪlɪti/', frequency_rank: 285 },
    { word: 'skill', pos: 'noun', definition: 'An ability acquired through practice.', example: 'Reading is an important skill.', ipa: '/skɪl/', frequency_rank: 305 },
  ],
}

const free_time_a1: VocabularySet = {
  id: 'free_time_a1',
  level: 'A1',
  topic: 'Free Time & Hobbies',
  unit_ref: 'a1-unit-7',
  words: [
    { word: 'film', pos: 'noun', definition: 'A movie shown at a cinema or on TV.', example: 'I love watching films at home.', ipa: '/fɪlm/', frequency_rank: 260 },
    { word: 'music', pos: 'noun', definition: 'Organised sound used for entertainment.', example: 'He listens to music every day.', ipa: '/ˈmjuːzɪk/', frequency_rank: 195 },
    { word: 'book', pos: 'noun', definition: 'A written work that can be read.', example: 'I read a new book every month.', ipa: '/bʊk/', frequency_rank: 90 },
    { word: 'game', pos: 'noun', definition: 'An activity you do for fun, often with rules.', example: 'I like video games.', ipa: '/ɡeɪm/', frequency_rank: 175 },
    { word: 'TV', pos: 'noun', definition: 'Television; a device for watching programmes.', example: 'We watch TV after dinner.', ipa: '/ˌtiːˈviː/' },
    { word: 'internet', pos: 'noun', definition: 'The global computer network.', example: 'I use the internet to learn English.', ipa: '/ˈɪntərnet/', frequency_rank: 430 },
    { word: 'walk', pos: 'noun', definition: 'A journey on foot.', example: 'We went for a walk in the park.', ipa: '/wɔːk/', frequency_rank: 130 },
    { word: 'travel', pos: 'verb', definition: 'To go to different places.', example: 'I love to travel in summer.', ipa: '/ˈtrævəl/', frequency_rank: 200 },
    { word: 'relax', pos: 'verb', definition: 'To rest and enjoy yourself.', example: 'At weekends I like to relax.', ipa: '/rɪˈlæks/', frequency_rank: 420 },
    { word: 'enjoy', pos: 'verb', definition: 'To get pleasure from something.', example: 'I enjoy cooking for friends.', ipa: '/ɪnˈdʒɔɪ/', frequency_rank: 235 },
    { word: 'favourite', pos: 'adjective', definition: 'Most liked; preferred above others.', example: 'What is your favourite film?', ipa: '/ˈfeɪvərɪt/', frequency_rank: 320 },
    { word: 'weekend', pos: 'noun', definition: 'Saturday and Sunday.', example: 'I relax at the weekend.', ipa: '/ˈwiːkend/', frequency_rank: 370 },
  ],
}

const food_drinks_a1: VocabularySet = {
  id: 'food_drinks_a1',
  level: 'A1',
  topic: 'Food & Drinks',
  unit_ref: 'a1-unit-7',
  words: [
    { word: 'bread', pos: 'noun', definition: 'A basic food made from flour and water.', example: 'I eat bread for breakfast.', ipa: '/bred/', frequency_rank: 310 },
    { word: 'milk', pos: 'noun', definition: 'A white liquid produced by cows.', example: 'She drinks a glass of milk every morning.', ipa: '/mɪlk/', frequency_rank: 350 },
    { word: 'coffee', pos: 'noun', definition: 'A hot drink made from roasted beans.', example: 'I drink two coffees a day.', ipa: '/ˈkɒfi/', frequency_rank: 380 },
    { word: 'tea', pos: 'noun', definition: 'A hot drink made by pouring water over tea leaves.', example: 'Would you like tea or coffee?', ipa: '/tiː/', frequency_rank: 340 },
    { word: 'water', pos: 'noun', definition: 'A clear liquid used for drinking.', example: 'I drink eight glasses of water a day.', ipa: '/ˈwɔːtər/', frequency_rank: 42 },
    { word: 'juice', pos: 'noun', definition: 'A drink made from crushed fruit.', example: 'She drinks orange juice every morning.', ipa: '/dʒuːs/', frequency_rank: 470 },
    { word: 'fruit', pos: 'noun', definition: 'The sweet edible part of a plant (e.g. apple, banana).', example: 'I eat fruit every day.', ipa: '/fruːt/', frequency_rank: 360 },
    { word: 'vegetable', pos: 'noun', definition: 'A plant or part of a plant used as food.', example: 'I eat vegetables with every meal.', ipa: '/ˈvedʒtəbəl/', frequency_rank: 440 },
    { word: 'meat', pos: 'noun', definition: 'The flesh of animals used as food.', example: 'She doesn\'t eat meat.', ipa: '/miːt/', frequency_rank: 290 },
    { word: 'rice', pos: 'noun', definition: 'A common grain grown in warm climates.', example: 'We have rice with our dinner.', ipa: '/raɪs/', frequency_rank: 400 },
    { word: 'chicken', pos: 'noun', definition: 'A common bird; its meat used as food.', example: 'I love grilled chicken.', ipa: '/ˈtʃɪkɪn/', frequency_rank: 380 },
    { word: 'salad', pos: 'noun', definition: 'A mixture of raw vegetables.', example: 'I had a salad for lunch.', ipa: '/ˈsæləd/', frequency_rank: 490 },
    { word: 'meal', pos: 'noun', definition: 'An occasion when food is eaten.', example: 'Lunch is my favourite meal of the day.', ipa: '/miːl/', frequency_rank: 285 },
    { word: 'hungry', pos: 'adjective', definition: 'Needing or wanting food.', example: 'I am very hungry!', ipa: '/ˈhʌŋɡri/', frequency_rank: 390 },
    { word: 'delicious', pos: 'adjective', definition: 'Having a very pleasant taste.', example: 'This soup is delicious!', ipa: '/dɪˈlɪʃəs/', frequency_rank: 510 },
  ],
}

// ─── A2 Vocabulary Sets (reduced to key sets) ─────────────────────────────────

const irregular_verbs_a2: VocabularySet = {
  id: 'irregular_verbs_a2',
  level: 'A2',
  topic: 'Irregular Past Verbs (Extended)',
  unit_ref: 'a2-unit-1',
  words: [
    { word: 'began', pos: 'verb', definition: 'Past tense of "begin".', example: 'The film began at 8 pm.', ipa: '/bɪˈɡæn/' },
    { word: 'broke', pos: 'verb', definition: 'Past tense of "break".', example: 'She broke her arm skiing.', ipa: '/broʊk/' },
    { word: 'brought', pos: 'verb', definition: 'Past tense of "bring".', example: 'He brought flowers to the party.', ipa: '/brɔːt/' },
    { word: 'caught', pos: 'verb', definition: 'Past tense of "catch".', example: 'I caught the bus just in time.', ipa: '/kɔːt/' },
    { word: 'chose', pos: 'verb', definition: 'Past tense of "choose".', example: 'She chose the blue dress.', ipa: '/tʃoʊz/' },
    { word: 'fell', pos: 'verb', definition: 'Past tense of "fall".', example: 'He fell off his bike.', ipa: '/fel/' },
    { word: 'felt', pos: 'verb', definition: 'Past tense of "feel".', example: 'She felt tired after work.', ipa: '/felt/' },
    { word: 'flew', pos: 'verb', definition: 'Past tense of "fly".', example: 'We flew to New York.', ipa: '/fluː/' },
    { word: 'forgot', pos: 'verb', definition: 'Past tense of "forget".', example: 'I forgot my umbrella.', ipa: '/fərˈɡɒt/' },
    { word: 'grew', pos: 'verb', definition: 'Past tense of "grow".', example: 'She grew up in Italy.', ipa: '/ɡruː/' },
    { word: 'heard', pos: 'verb', definition: 'Past tense of "hear".', example: 'Did you hear that noise?', ipa: '/hɜːrd/' },
    { word: 'kept', pos: 'verb', definition: 'Past tense of "keep".', example: 'She kept all his letters.', ipa: '/kept/' },
    { word: 'ran', pos: 'verb', definition: 'Past tense of "run".', example: 'He ran five kilometres.', ipa: '/ræn/' },
    { word: 'slept', pos: 'verb', definition: 'Past tense of "sleep".', example: 'I slept for 8 hours.', ipa: '/slept/' },
    { word: 'spent', pos: 'verb', definition: 'Past tense of "spend".', example: 'They spent the weekend in Rome.', ipa: '/spent/' },
    { word: 'stood', pos: 'verb', definition: 'Past tense of "stand".', example: 'We stood in a queue for an hour.', ipa: '/stʊd/' },
    { word: 'told', pos: 'verb', definition: 'Past tense of "tell".', example: 'She told me the truth.', ipa: '/toʊld/' },
    { word: 'wore', pos: 'verb', definition: 'Past tense of "wear".', example: 'He wore a suit to the interview.', ipa: '/wɔːr/' },
    { word: 'won', pos: 'verb', definition: 'Past tense of "win".', example: 'Our team won the match.', ipa: '/wʌn/' },
    { word: 'wrote', pos: 'verb', definition: 'Past tense of "write".', example: 'She wrote a long email.', ipa: '/roʊt/' },
  ],
}

const past_time_a2: VocabularySet = {
  id: 'past_time_a2',
  level: 'A2',
  topic: 'Narrating the Past',
  unit_ref: 'a2-unit-1',
  words: [
    { word: 'suddenly', pos: 'adverb', definition: 'Unexpectedly; very quickly.', example: 'Suddenly it started to rain.', ipa: '/ˈsʌdənli/', frequency_rank: 280 },
    { word: 'immediately', pos: 'adverb', definition: 'At once; without delay.', example: 'I immediately called the doctor.', ipa: '/ɪˈmiːdiətli/', frequency_rank: 320 },
    { word: 'eventually', pos: 'adverb', definition: 'In the end; after a long time.', example: 'We eventually found the hotel.', ipa: '/ɪˈventʃuəli/', frequency_rank: 370 },
    { word: 'meanwhile', pos: 'adverb', definition: 'At the same time as something else.', example: 'Meanwhile, he waited outside.', ipa: '/ˈmiːnˌwaɪl/', frequency_rank: 410 },
    { word: 'at first', pos: 'phrase', definition: 'At the beginning of a period.', example: 'At first, I was nervous.', ipa: '/æt fɜːrst/' },
    { word: 'in the end', pos: 'phrase', definition: 'Finally; as a conclusion.', example: 'In the end, she got the job.', ipa: '/ɪn ðə end/' },
    { word: 'later', pos: 'adverb', definition: 'At a time after the present.', example: 'I\'ll call you later.', ipa: '/ˈleɪtər/', frequency_rank: 195 },
    { word: 'next', pos: 'adverb', definition: 'Immediately after; following.', example: 'Next, he opened the letter.', ipa: '/nekst/', frequency_rank: 60 },
    { word: 'after that', pos: 'phrase', definition: 'Following that event.', example: 'After that, we went home.', ipa: '/ˈɑːftər ðæt/' },
  ],
}

const future_plans_a2: VocabularySet = {
  id: 'future_plans_a2',
  level: 'A2',
  topic: 'Future Plans & Intentions',
  unit_ref: 'a2-unit-2',
  words: [
    { word: 'plan', pos: 'noun', definition: 'An intention or arrangement for the future.', example: 'I have a plan for this weekend.', ipa: '/plæn/', frequency_rank: 145 },
    { word: 'hope', pos: 'verb', definition: 'To want something to happen.', example: 'I hope to visit Japan next year.', ipa: '/hoʊp/', frequency_rank: 155 },
    { word: 'expect', pos: 'verb', definition: 'To think something is likely to happen.', example: 'I expect to be home by 7.', ipa: '/ɪkˈspekt/', frequency_rank: 175 },
    { word: 'intend', pos: 'verb', definition: 'To have a purpose or plan.', example: 'I intend to finish the project today.', ipa: '/ɪnˈtend/', frequency_rank: 290 },
    { word: 'book', pos: 'verb', definition: 'To arrange in advance.', example: 'I\'m going to book a table.', ipa: '/bʊk/', frequency_rank: 90 },
    { word: 'appointment', pos: 'noun', definition: 'An arranged time to meet someone.', example: 'I have a doctor\'s appointment tomorrow.', ipa: '/əˈpɔɪntmənt/', frequency_rank: 380 },
    { word: 'decision', pos: 'noun', definition: 'A choice made after thinking.', example: 'I made a big decision last week.', ipa: '/dɪˈsɪʒən/', frequency_rank: 185 },
    { word: 'soon', pos: 'adverb', definition: 'In a short time from now.', example: 'I will call you soon.', ipa: '/suːn/', frequency_rank: 170 },
  ],
}

const weather_a2: VocabularySet = {
  id: 'weather_a2',
  level: 'A2',
  topic: 'Weather',
  unit_ref: 'a2-unit-2',
  words: [
    { word: 'sunny', pos: 'adjective', definition: 'Bright with sunshine.', example: 'It is sunny and warm today.', ipa: '/ˈsʌni/', frequency_rank: 490 },
    { word: 'cloudy', pos: 'adjective', definition: 'Covered with clouds.', example: 'It was cloudy all day.', ipa: '/ˈklaʊdi/', frequency_rank: 530 },
    { word: 'rainy', pos: 'adjective', definition: 'Having a lot of rain.', example: 'It\'s a rainy day.', ipa: '/ˈreɪni/', frequency_rank: 540 },
    { word: 'windy', pos: 'adjective', definition: 'With strong winds.', example: 'It\'s very windy today.', ipa: '/ˈwɪndi/', frequency_rank: 560 },
    { word: 'snowy', pos: 'adjective', definition: 'With snow falling or on the ground.', example: 'It\'s a snowy morning.', ipa: '/ˈsnoʊi/' },
    { word: 'temperature', pos: 'noun', definition: 'A measure of how hot or cold something is.', example: 'The temperature is 25°C.', ipa: '/ˈtemprɪtʃər/', frequency_rank: 320 },
    { word: 'forecast', pos: 'noun', definition: 'A prediction of future weather.', example: 'The forecast says it will rain.', ipa: '/ˈfɔːrkæst/', frequency_rank: 450 },
    { word: 'degrees', pos: 'noun', definition: 'A unit used to measure temperature.', example: 'It\'s 10 degrees today.', ipa: '/dɪˈɡriːz/', frequency_rank: 310 },
    { word: 'storm', pos: 'noun', definition: 'Severe weather with strong winds and rain.', example: 'There is a storm coming.', ipa: '/stɔːrm/', frequency_rank: 380 },
    { word: 'fog', pos: 'noun', definition: 'Thick cloud close to the ground that makes it hard to see.', example: 'There is fog on the motorway.', ipa: '/fɒɡ/', frequency_rank: 460 },
  ],
}

const adjectives_a2: VocabularySet = {
  id: 'adjectives_a2',
  level: 'A2',
  topic: 'Descriptive Adjectives',
  unit_ref: 'a2-unit-3',
  words: [
    { word: 'expensive', pos: 'adjective', definition: 'Costing a lot of money.', example: 'This restaurant is very expensive.', ipa: '/ɪkˈspensɪv/', frequency_rank: 340 },
    { word: 'cheap', pos: 'adjective', definition: 'Not costing much money.', example: 'These shoes are really cheap.', ipa: '/tʃiːp/', frequency_rank: 365 },
    { word: 'modern', pos: 'adjective', definition: 'Relating to the present time; up-to-date.', example: 'The office is very modern.', ipa: '/ˈmɒdərn/', frequency_rank: 295 },
    { word: 'traditional', pos: 'adjective', definition: 'Following customs of the past.', example: 'She cooks traditional food.', ipa: '/trəˈdɪʃənəl/', frequency_rank: 310 },
    { word: 'popular', pos: 'adjective', definition: 'Liked by many people.', example: 'This café is very popular.', ipa: '/ˈpɒpjələr/', frequency_rank: 255 },
    { word: 'comfortable', pos: 'adjective', definition: 'Physically relaxing or pleasant.', example: 'This sofa is very comfortable.', ipa: '/ˈkʌmftəbəl/', frequency_rank: 370 },
    { word: 'exciting', pos: 'adjective', definition: 'Causing great enthusiasm or interest.', example: 'The trip was really exciting.', ipa: '/ɪkˈsaɪtɪŋ/', frequency_rank: 390 },
    { word: 'boring', pos: 'adjective', definition: 'Not interesting; dull.', example: 'The film was a bit boring.', ipa: '/ˈbɔːrɪŋ/', frequency_rank: 420 },
    { word: 'friendly', pos: 'adjective', definition: 'Kind and pleasant to others.', example: 'The staff were very friendly.', ipa: '/ˈfrendli/', frequency_rank: 345 },
    { word: 'dangerous', pos: 'adjective', definition: 'Likely to cause harm.', example: 'That road is very dangerous.', ipa: '/ˈdeɪndʒərəs/', frequency_rank: 340 },
    { word: 'safe', pos: 'adjective', definition: 'Not dangerous; protected from harm.', example: 'This neighbourhood is very safe.', ipa: '/seɪf/', frequency_rank: 250 },
    { word: 'crowded', pos: 'adjective', definition: 'Full of people or things.', example: 'The city centre was very crowded.', ipa: '/ˈkraʊdɪd/', frequency_rank: 450 },
  ],
}

const food_shopping_a2: VocabularySet = {
  id: 'food_shopping_a2',
  level: 'A2',
  topic: 'Food & Shopping',
  unit_ref: 'a2-unit-5',
  words: [
    { word: 'price', pos: 'noun', definition: 'The amount of money needed to buy something.', example: 'What is the price of this jacket?', ipa: '/praɪs/', frequency_rank: 180 },
    { word: 'receipt', pos: 'noun', definition: 'A paper showing what you bought and how much you paid.', example: 'Can I have a receipt, please?', ipa: '/rɪˈsiːt/', frequency_rank: 510 },
    { word: 'basket', pos: 'noun', definition: 'A container used to carry shopping.', example: 'She put the vegetables in the basket.', ipa: '/ˈbɑːskɪt/', frequency_rank: 420 },
    { word: 'trolley', pos: 'noun', definition: 'A large wheeled basket used in supermarkets.', example: 'We need a trolley for all this shopping.', ipa: '/ˈtrɒli/', frequency_rank: 580 },
    { word: 'queue', pos: 'noun', definition: 'A line of people waiting for something.', example: 'There was a long queue at the checkout.', ipa: '/kjuː/', frequency_rank: 490 },
    { word: 'cash', pos: 'noun', definition: 'Money in the form of coins or notes.', example: 'Do you pay by cash or card?', ipa: '/kæʃ/', frequency_rank: 295 },
    { word: 'change', pos: 'noun', definition: 'Money returned when you pay more than the price.', example: 'Here is your change.', ipa: '/tʃeɪndʒ/', frequency_rank: 80 },
    { word: 'sale', pos: 'noun', definition: 'A period when prices are reduced.', example: 'The shop has a big sale today.', ipa: '/seɪl/', frequency_rank: 210 },
    { word: 'discount', pos: 'noun', definition: 'A reduction in the price of something.', example: 'Students get a 10% discount.', ipa: '/ˈdɪskaʊnt/', frequency_rank: 410 },
    { word: 'afford', pos: 'verb', definition: 'To have enough money for something.', example: 'I can\'t afford a new car.', ipa: '/əˈfɔːrd/', frequency_rank: 330 },
    { word: 'brand', pos: 'noun', definition: 'A company\'s name used to identify its products.', example: 'Which brand do you prefer?', ipa: '/brænd/', frequency_rank: 265 },
    { word: 'packaging', pos: 'noun', definition: 'Material used to wrap or contain products.', example: 'We prefer products with less packaging.', ipa: '/ˈpækɪdʒɪŋ/', frequency_rank: 560 },
  ],
}

const transport_a2: VocabularySet = {
  id: 'transport_a2',
  level: 'A2',
  topic: 'Transport',
  unit_ref: 'a2-unit-7',
  words: [
    { word: 'bus', pos: 'noun', definition: 'A large vehicle used for public transport.', example: 'I take the bus to work.', ipa: '/bʌs/', frequency_rank: 275 },
    { word: 'train', pos: 'noun', definition: 'A vehicle that travels on rails.', example: 'The train to London leaves at 9.', ipa: '/treɪn/', frequency_rank: 235 },
    { word: 'plane', pos: 'noun', definition: 'An aircraft used for flying.', example: 'We took a plane to Madrid.', ipa: '/pleɪn/', frequency_rank: 280 },
    { word: 'taxi', pos: 'noun', definition: 'A car hired with a driver.', example: 'Let\'s take a taxi to the hotel.', ipa: '/ˈtæksi/', frequency_rank: 390 },
    { word: 'underground', pos: 'noun', definition: 'An urban railway system built below ground.', example: 'The underground is faster than the bus.', ipa: '/ˈʌndərɡraʊnd/', frequency_rank: 420 },
    { word: 'timetable', pos: 'noun', definition: 'A schedule showing when transport departs and arrives.', example: 'Check the timetable on the app.', ipa: '/ˈtaɪmteɪbəl/', frequency_rank: 510 },
    { word: 'ticket', pos: 'noun', definition: 'A piece of paper or card allowing you to travel.', example: 'I bought a return ticket.', ipa: '/ˈtɪkɪt/', frequency_rank: 290 },
    { word: 'platform', pos: 'noun', definition: 'The area in a station where passengers board trains.', example: 'The train leaves from platform 3.', ipa: '/ˈplætfɔːrm/', frequency_rank: 360 },
    { word: 'departure', pos: 'noun', definition: 'The act of leaving a place.', example: 'Departure is at 6:30 am.', ipa: '/dɪˈpɑːrtʃər/', frequency_rank: 420 },
    { word: 'arrival', pos: 'noun', definition: 'The act of reaching a destination.', example: 'The expected arrival time is 9 pm.', ipa: '/əˈraɪvəl/', frequency_rank: 400 },
    { word: 'delay', pos: 'noun', definition: 'When something happens later than planned.', example: 'There is a 30-minute delay.', ipa: '/dɪˈleɪ/', frequency_rank: 380 },
    { word: 'rush hour', pos: 'noun', definition: 'The busiest time for traffic, usually morning and evening.', example: 'Avoid travelling during rush hour.', ipa: '/rʌʃ aʊər/' },
  ],
}

const body_health_a2: VocabularySet = {
  id: 'body_health_a2',
  level: 'A2',
  topic: 'Body & Health',
  unit_ref: 'a2-unit-6',
  words: [
    { word: 'head', pos: 'noun', definition: 'The top part of the body containing the brain and face.', example: 'She has a headache.', ipa: '/hed/', frequency_rank: 90 },
    { word: 'arm', pos: 'noun', definition: 'The upper limb from shoulder to wrist.', example: 'He broke his arm playing football.', ipa: '/ɑːrm/', frequency_rank: 155 },
    { word: 'leg', pos: 'noun', definition: 'The limb used for walking.', example: 'She hurt her leg at the gym.', ipa: '/leɡ/', frequency_rank: 145 },
    { word: 'back', pos: 'noun', definition: 'The rear part of the body from neck to bottom.', example: 'My back hurts from sitting all day.', ipa: '/bæk/', frequency_rank: 50 },
    { word: 'stomach', pos: 'noun', definition: 'The organ in the body that digests food.', example: 'I have a stomach ache.', ipa: '/ˈstʌmək/', frequency_rank: 310 },
    { word: 'throat', pos: 'noun', definition: 'The passage inside the neck.', example: 'I have a sore throat.', ipa: '/θroʊt/', frequency_rank: 395 },
    { word: 'hurt', pos: 'verb', definition: 'To feel pain or cause pain.', example: 'My knee hurts after running.', ipa: '/hɜːrt/', frequency_rank: 200 },
    { word: 'pain', pos: 'noun', definition: 'An unpleasant physical sensation.', example: 'The pain in my back is gone.', ipa: '/peɪn/', frequency_rank: 185 },
    { word: 'medicine', pos: 'noun', definition: 'A drug or treatment used to cure illness.', example: 'Take this medicine twice a day.', ipa: '/ˈmedɪsɪn/', frequency_rank: 310 },
    { word: 'doctor', pos: 'noun', definition: 'A person trained to treat medical conditions.', example: 'I need to see a doctor.', ipa: '/ˈdɒktər/', frequency_rank: 185 },
    { word: 'appointment', pos: 'noun', definition: 'A scheduled meeting with a doctor.', example: 'I have a doctor\'s appointment at 3.', ipa: '/əˈpɔɪntmənt/', frequency_rank: 380 },
    { word: 'healthy', pos: 'adjective', definition: 'In good physical condition.', example: 'Eat healthy food.', ipa: '/ˈhelθi/', frequency_rank: 320 },
  ],
}

// ─── B1 Vocabulary Sets (key sets) ────────────────────────────────────────────

const experiences_b1: VocabularySet = {
  id: 'experiences_b1',
  level: 'B1',
  topic: 'Experiences & Life Events',
  unit_ref: 'b1-unit-1',
  words: [
    { word: 'experience', pos: 'noun', definition: 'Something that has happened to you.', example: 'That was a great experience.', ipa: '/ɪkˈspɪərɪəns/', frequency_rank: 185 },
    { word: 'achievement', pos: 'noun', definition: 'Something difficult done successfully.', example: 'Getting the job was a great achievement.', ipa: '/əˈtʃiːvmənt/', frequency_rank: 340 },
    { word: 'challenge', pos: 'noun', definition: 'Something difficult that tests your abilities.', example: 'Learning a language is a real challenge.', ipa: '/ˈtʃælɪndʒ/', frequency_rank: 280 },
    { word: 'opportunity', pos: 'noun', definition: 'A chance to do something.', example: 'This is a great opportunity.', ipa: '/ˌɒpərˈtjuːnɪti/', frequency_rank: 225 },
    { word: 'memorable', pos: 'adjective', definition: 'Worth remembering; special.', example: 'It was a memorable trip.', ipa: '/ˈmemərəbəl/', frequency_rank: 480 },
    { word: 'unforgettable', pos: 'adjective', definition: 'So special it cannot be forgotten.', example: 'The concert was unforgettable.', ipa: '/ˌʌnfərˈɡetəbəl/' },
    { word: 'benefit', pos: 'noun', definition: 'An advantage or gain.', example: 'Travel has many benefits.', ipa: '/ˈbenɪfɪt/', frequency_rank: 230 },
    { word: 'manage', pos: 'verb', definition: 'To succeed in doing something difficult.', example: 'Did you manage to finish on time?', ipa: '/ˈmænɪdʒ/', frequency_rank: 175 },
    { word: 'improve', pos: 'verb', definition: 'To become or make better.', example: 'My English has improved a lot.', ipa: '/ɪmˈpruːv/', frequency_rank: 195 },
    { word: 'succeed', pos: 'verb', definition: 'To achieve a goal or desired result.', example: 'If you work hard, you will succeed.', ipa: '/səkˈsiːd/', frequency_rank: 280 },
  ],
}

const technology_b1: VocabularySet = {
  id: 'technology_b1',
  level: 'B1',
  topic: 'Technology',
  unit_ref: 'b1-unit-4',
  words: [
    { word: 'device', pos: 'noun', definition: 'A machine or tool made for a specific purpose.', example: 'A smartphone is a useful device.', ipa: '/dɪˈvaɪs/', frequency_rank: 290 },
    { word: 'software', pos: 'noun', definition: 'Programs used to operate computers.', example: 'This software is easy to use.', ipa: '/ˈsɒftweər/', frequency_rank: 340 },
    { word: 'download', pos: 'verb', definition: 'To copy data from a network to a device.', example: 'I downloaded the app yesterday.', ipa: '/ˈdaʊnloʊd/', frequency_rank: 480 },
    { word: 'upload', pos: 'verb', definition: 'To send data from a device to a network.', example: 'Please upload the file to the cloud.', ipa: '/ˈʌploʊd/' },
    { word: 'wireless', pos: 'adjective', definition: 'Using radio waves instead of cables.', example: 'Is there wireless internet here?', ipa: '/ˈwaɪərləs/', frequency_rank: 510 },
    { word: 'search', pos: 'verb', definition: 'To look for information, especially online.', example: 'I searched for the answer online.', ipa: '/sɜːrtʃ/', frequency_rank: 195 },
    { word: 'password', pos: 'noun', definition: 'A secret word or code used for security.', example: 'Change your password regularly.', ipa: '/ˈpæswɜːrd/', frequency_rank: 490 },
    { word: 'update', pos: 'verb', definition: 'To add new information or install a new version.', example: 'Update your phone regularly.', ipa: '/ˈʌpdeɪt/', frequency_rank: 330 },
    { word: 'screen', pos: 'noun', definition: 'The flat surface on a phone, TV, or computer.', example: 'The screen is cracked.', ipa: '/skriːn/', frequency_rank: 255 },
    { word: 'artificial intelligence', pos: 'noun', definition: 'Computer systems that mimic human intelligence.', example: 'Artificial intelligence is changing many industries.', ipa: '/ˌɑːrtɪˈfɪʃəl ɪnˈtelɪdʒəns/' },
  ],
}

const opinion_phrases_b1: VocabularySet = {
  id: 'opinion_phrases_b1',
  level: 'B1',
  topic: 'Expressing Opinions',
  unit_ref: 'b1-unit-7',
  words: [
    { word: 'in my opinion', pos: 'phrase', definition: 'Used to introduce your personal view.', example: 'In my opinion, this is the best solution.', ipa: '/ɪn maɪ əˈpɪnjən/' },
    { word: 'I think', pos: 'phrase', definition: 'Used to express a thought or belief.', example: 'I think we should leave early.', ipa: '/aɪ θɪŋk/' },
    { word: 'I believe', pos: 'phrase', definition: 'Used to express a strong conviction.', example: 'I believe climate change is serious.', ipa: '/aɪ bɪˈliːv/' },
    { word: 'as far as I know', pos: 'phrase', definition: 'Based on the information you have.', example: 'As far as I know, the shop is open.', ipa: '/æz fɑːr æz aɪ noʊ/' },
    { word: 'personally', pos: 'adverb', definition: 'Speaking for yourself specifically.', example: 'Personally, I prefer the original.', ipa: '/ˈpɜːrsənəli/', frequency_rank: 370 },
    { word: 'honestly', pos: 'adverb', definition: 'In a frank and truthful way.', example: 'Honestly, I didn\'t like it.', ipa: '/ˈɒnɪstli/', frequency_rank: 420 },
    { word: 'apparently', pos: 'adverb', definition: 'Based on what it seems or what you heard.', example: 'Apparently, the event is cancelled.', ipa: '/əˈpærəntli/', frequency_rank: 355 },
    { word: 'tend to', pos: 'phrase', definition: 'To usually do or be a certain way.', example: 'I tend to agree with you.', ipa: '/tend tə/' },
    { word: 'point out', pos: 'phrase', definition: 'To draw attention to something.', example: 'I\'d like to point out that this is wrong.', ipa: '/pɔɪnt aʊt/' },
    { word: 'argue', pos: 'verb', definition: 'To give reasons for or against something.', example: 'She argued that the plan was too risky.', ipa: '/ˈɑːrɡjuː/', frequency_rank: 265 },
  ],
}

// ─── Vocabulary index ─────────────────────────────────────────────────────────

export const vocabularySets: VocabularySet[] = [
  // A1
  identity_a1,
  greetings_a1,
  numbers_1_20_a1,
  family_a1,
  colours_a1,
  adjectives_basic_a1,
  daily_routines_a1,
  time_expressions_a1,
  verbs_basic_a1,
  home_a1,
  city_places_a1,
  prepositions_a1,
  action_verbs_a1,
  clothes_a1,
  sports_a1,
  past_time_expressions_a1,
  regular_verbs_past_a1,
  irregular_verbs_basic_a1,
  abilities_a1,
  free_time_a1,
  food_drinks_a1,
  // A2
  irregular_verbs_a2,
  past_time_a2,
  future_plans_a2,
  weather_a2,
  adjectives_a2,
  food_shopping_a2,
  transport_a2,
  body_health_a2,
  // B1
  experiences_b1,
  technology_b1,
  opinion_phrases_b1,
]

/** Look up a VocabularySet by id */
export function getVocabularySet(id: string): VocabularySet | undefined {
  return vocabularySets.find((s) => s.id === id)
}

/** Return all vocabulary sets for a given CEFR level */
export function getVocabularySetsForLevel(level: CEFRLevel): VocabularySet[] {
  return vocabularySets.filter((s) => s.level === level)
}

/** Return vocabulary sets referenced by a curriculum unit */
export function getVocabularySetsForUnit(unitRef: string): VocabularySet[] {
  return vocabularySets.filter((s) => s.unit_ref === unitRef)
}
