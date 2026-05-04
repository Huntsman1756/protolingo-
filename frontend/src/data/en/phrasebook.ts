/**
 * FreeLingo — Phrasebook data layer.
 *
 * Situational phrases from A1–B2. Content is 100% static — no API calls
 * needed for the phrasebook page. Each category maps to a real-world
 * situation and is tied to a CEFR level.
 */

import type { CEFRLevel } from './grammar'

// ─── Types ────────────────────────────────────────────────────────────────────

export type Register = 'formal' | 'neutral' | 'informal'

export interface Phrase {
  english: string
  context: string       // Short description of when to use it
  register: Register
  unit_ref?: string     // Optional link to a curriculum unit
}

export interface PhrasebookCategory {
  id: string
  level: CEFRLevel
  situation: string
  icon: string          // Emoji used as visual marker
  phrases: Phrase[]
}

// ─── A1 Categories ────────────────────────────────────────────────────────────

const greetings: PhrasebookCategory = {
  id: 'greetings',
  level: 'A1',
  situation: 'Greetings & Introductions',
  icon: '👋',
  phrases: [
    { english: 'Hello! / Hi!', context: 'Casual greeting', register: 'neutral' },
    { english: 'Good morning.', context: 'Greeting before noon', register: 'formal' },
    { english: 'Good afternoon.', context: 'Greeting between noon and 6 pm', register: 'formal' },
    { english: 'Good evening.', context: 'Greeting after 6 pm', register: 'formal' },
    { english: 'How are you?', context: 'Asking about well-being', register: 'neutral' },
    { english: 'I\'m fine, thank you. And you?', context: 'Polite reply to "How are you?"', register: 'neutral' },
    { english: 'Nice to meet you.', context: 'First meeting', register: 'neutral' },
    { english: 'Nice to meet you too.', context: 'Replying to "Nice to meet you"', register: 'neutral' },
    { english: 'My name is [Name].', context: 'Introducing yourself', register: 'neutral' },
    { english: 'I\'m from [Country].', context: 'Saying where you are from', register: 'neutral' },
    { english: 'See you later!', context: 'Informal farewell', register: 'informal' },
    { english: 'Goodbye!', context: 'Formal farewell', register: 'formal' },
    { english: 'Bye! / Bye-bye!', context: 'Informal farewell', register: 'informal' },
    { english: 'Take care!', context: 'Warm farewell', register: 'neutral' },
    { english: 'Have a good day!', context: 'Polite farewell', register: 'neutral' },
  ],
}

const basic_requests: PhrasebookCategory = {
  id: 'basic_requests',
  level: 'A1',
  situation: 'Basic Requests & Polite Phrases',
  icon: '🙏',
  phrases: [
    { english: 'Can you help me, please?', context: 'Asking for assistance', register: 'neutral' },
    { english: 'Could you repeat that, please?', context: 'When you didn\'t understand', register: 'neutral' },
    { english: 'I don\'t understand.', context: 'Saying you don\'t understand', register: 'neutral' },
    { english: 'Can you speak more slowly, please?', context: 'When someone speaks too fast', register: 'neutral' },
    { english: 'How do you say [word] in English?', context: 'Asking for a translation', register: 'neutral' },
    { english: 'What does [word] mean?', context: 'Asking for a definition', register: 'neutral' },
    { english: 'Sorry, I don\'t know.', context: 'Saying you don\'t know something', register: 'neutral' },
    { english: 'Excuse me.', context: 'Getting someone\'s attention', register: 'neutral' },
    { english: 'I\'m sorry.', context: 'Apologising', register: 'neutral' },
    { english: 'That\'s OK. / No problem.', context: 'Accepting an apology', register: 'neutral' },
    { english: 'Thank you very much.', context: 'Expressing strong gratitude', register: 'neutral' },
    { english: 'You\'re welcome.', context: 'Responding to thanks', register: 'neutral' },
  ],
}

const numbers_time_a1: PhrasebookCategory = {
  id: 'numbers_time_a1',
  level: 'A1',
  situation: 'Numbers & Telling the Time',
  icon: '🕒',
  phrases: [
    { english: 'What time is it?', context: 'Asking for the time', register: 'neutral' },
    { english: 'It\'s [time] o\'clock.', context: 'Telling the time on the hour', register: 'neutral' },
    { english: 'It\'s half past [hour].', context: 'Telling the time at :30', register: 'neutral' },
    { english: 'It\'s quarter past [hour].', context: 'Telling the time at :15', register: 'neutral' },
    { english: 'It\'s quarter to [hour].', context: 'Telling the time at :45', register: 'neutral' },
    { english: 'The meeting is at [time].', context: 'Stating a scheduled time', register: 'neutral' },
    { english: 'How much is it?', context: 'Asking the price', register: 'neutral' },
    { english: 'It\'s [price] pounds/euros.', context: 'Stating a price', register: 'neutral' },
    { english: 'Can I have the bill, please?', context: 'Asking for the bill at a café', register: 'neutral' },
  ],
}

const shopping_basic_a1: PhrasebookCategory = {
  id: 'shopping_basic_a1',
  level: 'A1',
  situation: 'Shopping (Basics)',
  icon: '🛍️',
  phrases: [
    { english: 'I\'d like [item], please.', context: 'Ordering or buying something', register: 'neutral' },
    { english: 'How much does this cost?', context: 'Asking the price', register: 'neutral' },
    { english: 'Do you have this in [size/colour]?', context: 'Asking about stock', register: 'neutral' },
    { english: 'I\'ll take it.', context: 'Deciding to buy something', register: 'neutral' },
    { english: 'I\'m just looking, thank you.', context: 'Telling a shop assistant you\'re browsing', register: 'neutral' },
    { english: 'Can I try this on?', context: 'Asking to try on clothes', register: 'neutral' },
    { english: 'It\'s too big / small / expensive.', context: 'Explaining a problem', register: 'neutral' },
    { english: 'Can I pay by card?', context: 'Asking about payment methods', register: 'neutral' },
    { english: 'Can I have a bag, please?', context: 'Asking for a shopping bag', register: 'neutral' },
    { english: 'Could I have a receipt?', context: 'Asking for a receipt', register: 'neutral' },
  ],
}

const asking_directions_a1: PhrasebookCategory = {
  id: 'asking_directions_a1',
  level: 'A1',
  situation: 'Asking for Directions',
  icon: '🗺️',
  phrases: [
    { english: 'Excuse me, where is [place]?', context: 'Asking for a location', register: 'neutral' },
    { english: 'How do I get to [place]?', context: 'Asking for directions', register: 'neutral' },
    { english: 'Is it far from here?', context: 'Asking about distance', register: 'neutral' },
    { english: 'Turn left / right.', context: 'Giving a direction', register: 'neutral' },
    { english: 'Go straight ahead.', context: 'Giving a direction', register: 'neutral' },
    { english: 'It\'s on the left / right.', context: 'Describing a location', register: 'neutral' },
    { english: 'It\'s next to / opposite [landmark].', context: 'Describing a location', register: 'neutral' },
    { english: 'It\'s about [number] minutes on foot.', context: 'Describing distance', register: 'neutral' },
    { english: 'Take the [number] bus.', context: 'Giving transport advice', register: 'neutral' },
    { english: 'Sorry, I don\'t know this area.', context: 'Unable to help', register: 'neutral' },
  ],
}

// ─── A2 Categories ────────────────────────────────────────────────────────────

const restaurant_a2: PhrasebookCategory = {
  id: 'restaurant_a2',
  level: 'A2',
  situation: 'At a Restaurant',
  icon: '🍽️',
  phrases: [
    { english: 'A table for two, please.', context: 'Arriving at a restaurant', register: 'neutral' },
    { english: 'Can I see the menu, please?', context: 'Asking for the menu', register: 'neutral' },
    { english: 'What do you recommend?', context: 'Asking the waiter for advice', register: 'neutral' },
    { english: 'I\'ll have [dish], please.', context: 'Ordering food', register: 'neutral' },
    { english: 'Could I have [dish] instead of [dish]?', context: 'Changing your order', register: 'neutral' },
    { english: 'I\'m allergic to [ingredient].', context: 'Informing about allergies', register: 'neutral' },
    { english: 'Is [dish] vegetarian / vegan?', context: 'Asking about dietary options', register: 'neutral' },
    { english: 'Excuse me, we\'ve been waiting for a while.', context: 'Polite complaint', register: 'neutral' },
    { english: 'The food is delicious!', context: 'Complimenting the food', register: 'neutral' },
    { english: 'Could we have the bill, please?', context: 'Asking for the bill', register: 'neutral' },
    { english: 'Do you accept credit cards?', context: 'Asking about payment', register: 'neutral' },
    { english: 'Could we split the bill?', context: 'Paying separately', register: 'neutral' },
    { english: 'Is service included?', context: 'Asking about the tip', register: 'neutral' },
  ],
}

const transport_booking_a2: PhrasebookCategory = {
  id: 'transport_booking_a2',
  level: 'A2',
  situation: 'Travel & Transport',
  icon: '🚆',
  phrases: [
    { english: 'One ticket to [destination], please.', context: 'Buying a ticket', register: 'neutral' },
    { english: 'A return ticket to [destination], please.', context: 'Buying a return ticket', register: 'neutral' },
    { english: 'What time does the next train leave?', context: 'Asking about departure times', register: 'neutral' },
    { english: 'Which platform does it leave from?', context: 'Asking about the platform', register: 'neutral' },
    { english: 'Is there a direct train to [destination]?', context: 'Asking about connections', register: 'neutral' },
    { english: 'I\'d like to book a seat.', context: 'Reserving a seat', register: 'neutral' },
    { english: 'I\'ve missed my train / flight.', context: 'Explaining a missed connection', register: 'neutral' },
    { english: 'Is there a delay?', context: 'Asking about delays', register: 'neutral' },
    { english: 'Where is gate [number]?', context: 'At an airport', register: 'neutral' },
    { english: 'I have a connecting flight at [time].', context: 'Informing about a connection', register: 'neutral' },
    { english: 'Is there a tourist pass available?', context: 'Asking about city transport', register: 'neutral' },
  ],
}

const weather_talk_a2: PhrasebookCategory = {
  id: 'weather_talk_a2',
  level: 'A2',
  situation: 'Talking About Weather',
  icon: '🌤️',
  phrases: [
    { english: 'What\'s the weather like today?', context: 'Asking about current weather', register: 'neutral' },
    { english: 'It\'s sunny / cloudy / rainy.', context: 'Describing current weather', register: 'neutral' },
    { english: 'It\'s quite warm / cold today.', context: 'Describing temperature', register: 'neutral' },
    { english: 'It\'s going to rain later.', context: 'Predicting weather', register: 'neutral' },
    { english: 'What\'s the forecast for tomorrow?', context: 'Asking about tomorrow\'s weather', register: 'neutral' },
    { english: 'I love this kind of weather.', context: 'Expressing preference', register: 'informal' },
    { english: 'I hate it when it\'s this cold!', context: 'Expressing dislike', register: 'informal' },
    { english: 'You should bring an umbrella.', context: 'Giving weather advice', register: 'neutral' },
    { english: 'The weather is much better than yesterday.', context: 'Comparing weather', register: 'neutral' },
  ],
}

const making_plans_a2: PhrasebookCategory = {
  id: 'making_plans_a2',
  level: 'A2',
  situation: 'Making Plans & Arrangements',
  icon: '📅',
  phrases: [
    { english: 'What are you doing this weekend?', context: 'Asking about plans', register: 'informal' },
    { english: 'Would you like to [do something]?', context: 'Inviting someone', register: 'neutral' },
    { english: 'I\'d love to!', context: 'Accepting an invitation', register: 'neutral' },
    { english: 'I\'m afraid I can\'t. I have other plans.', context: 'Declining an invitation', register: 'neutral' },
    { english: 'Maybe another time.', context: 'Polite decline', register: 'neutral' },
    { english: 'What time shall we meet?', context: 'Arranging a meeting time', register: 'neutral' },
    { english: 'Let\'s meet at [time] at [place].', context: 'Confirming arrangements', register: 'neutral' },
    { english: 'I\'ll be there at [time].', context: 'Confirming attendance', register: 'neutral' },
    { english: 'Can we change the time / date?', context: 'Requesting a change', register: 'neutral' },
    { english: 'I\'m running late.', context: 'Warning you will be late', register: 'informal' },
    { english: 'I\'ll be there in about 10 minutes.', context: 'Estimating your arrival time', register: 'neutral' },
  ],
}

const feelings_a2: PhrasebookCategory = {
  id: 'feelings_a2',
  level: 'A2',
  situation: 'Expressing Feelings',
  icon: '😊',
  phrases: [
    { english: 'I\'m really excited about [it].', context: 'Showing enthusiasm', register: 'neutral' },
    { english: 'I\'m a bit nervous.', context: 'Expressing nervousness', register: 'neutral' },
    { english: 'I\'m so tired.', context: 'Expressing fatigue', register: 'informal' },
    { english: 'That\'s great news!', context: 'Reacting positively to news', register: 'neutral' },
    { english: 'I\'m sorry to hear that.', context: 'Expressing sympathy', register: 'neutral' },
    { english: 'Are you OK?', context: 'Checking if someone is alright', register: 'neutral' },
    { english: 'Don\'t worry about it.', context: 'Reassuring someone', register: 'informal' },
    { english: 'I\'m not feeling well.', context: 'Saying you feel ill', register: 'neutral' },
    { english: 'I feel much better now.', context: 'Saying your health improved', register: 'neutral' },
    { english: 'I can\'t wait for [event]!', context: 'Expressing anticipation', register: 'informal' },
    { english: 'What a shame! / What a pity!', context: 'Expressing disappointment', register: 'neutral' },
  ],
}

// ─── B1 Categories ────────────────────────────────────────────────────────────

const phone_calls_b1: PhrasebookCategory = {
  id: 'phone_calls_b1',
  level: 'B1',
  situation: 'Phone Calls',
  icon: '📞',
  phrases: [
    { english: 'Hello, this is [Name] speaking.', context: 'Introducing yourself on the phone', register: 'formal' },
    { english: 'Could I speak to [Name], please?', context: 'Asking to speak to someone', register: 'formal' },
    { english: 'I\'m afraid [Name] isn\'t available.', context: 'Saying someone isn\'t there', register: 'formal' },
    { english: 'Can I take a message?', context: 'Offering to take a message', register: 'formal' },
    { english: 'Could you ask [Name] to call me back?', context: 'Leaving a message', register: 'formal' },
    { english: 'I\'ll call back later.', context: 'Saying you\'ll call again', register: 'neutral' },
    { english: 'I\'m calling about [topic].', context: 'Stating the reason for your call', register: 'neutral' },
    { english: 'I\'m sorry, you\'re breaking up.', context: 'Poor signal', register: 'neutral' },
    { english: 'Could you speak up, please?', context: 'Asking someone to speak louder', register: 'neutral' },
    { english: 'I\'ll put you on hold for a moment.', context: 'Asking someone to wait', register: 'formal' },
    { english: 'Thank you for calling. Goodbye.', context: 'Ending a professional call', register: 'formal' },
  ],
}

const job_interview_b1: PhrasebookCategory = {
  id: 'job_interview_b1',
  level: 'B1',
  situation: 'Job Interviews',
  icon: '💼',
  phrases: [
    { english: 'Thank you for the opportunity.', context: 'Thanking the interviewer', register: 'formal' },
    { english: 'I\'m very interested in this position.', context: 'Expressing interest', register: 'formal' },
    { english: 'In my previous role, I was responsible for…', context: 'Describing past experience', register: 'formal' },
    { english: 'I have experience in [field/skill].', context: 'Mentioning a skill', register: 'formal' },
    { english: 'My greatest strength is [strength].', context: 'Answering a strengths question', register: 'formal' },
    { english: 'I am a team player and also enjoy working independently.', context: 'Describing work style', register: 'formal' },
    { english: 'I\'m a quick learner.', context: 'Describing learning ability', register: 'formal' },
    { english: 'What does a typical day look like in this role?', context: 'Asking about the job', register: 'formal' },
    { english: 'When can I expect to hear from you?', context: 'Asking about next steps', register: 'formal' },
    { english: 'I look forward to hearing from you.', context: 'Closing the conversation', register: 'formal' },
  ],
}

const giving_opinions_b1: PhrasebookCategory = {
  id: 'giving_opinions_b1',
  level: 'B1',
  situation: 'Giving Opinions & Agreeing/Disagreeing',
  icon: '💬',
  phrases: [
    { english: 'In my opinion, …', context: 'Introducing your view', register: 'neutral' },
    { english: 'Personally, I think that…', context: 'Emphasising a personal view', register: 'neutral' },
    { english: 'I agree with you completely.', context: 'Full agreement', register: 'neutral' },
    { english: 'I partially agree, but…', context: 'Partial agreement', register: 'neutral' },
    { english: 'I\'m afraid I don\'t agree.', context: 'Polite disagreement', register: 'neutral' },
    { english: 'That\'s a good point, but…', context: 'Acknowledging then disagreeing', register: 'neutral' },
    { english: 'I see your point, however…', context: 'Countering an argument', register: 'neutral' },
    { english: 'It depends on…', context: 'Qualified answer', register: 'neutral' },
    { english: 'I\'m not sure about that.', context: 'Expressing doubt', register: 'neutral' },
    { english: 'Could you clarify what you mean?', context: 'Asking for clarification', register: 'neutral' },
    { english: 'As far as I know, …', context: 'Limited certainty', register: 'neutral' },
    { english: 'I\'d like to add that…', context: 'Adding to the conversation', register: 'neutral' },
  ],
}

const health_appointments_b1: PhrasebookCategory = {
  id: 'health_appointments_b1',
  level: 'B1',
  situation: 'Health & Doctor Appointments',
  icon: '🏥',
  phrases: [
    { english: 'I\'d like to make an appointment.', context: 'Booking a medical appointment', register: 'formal' },
    { english: 'I haven\'t been feeling well lately.', context: 'Describing general illness', register: 'neutral' },
    { english: 'I have a pain in my [body part].', context: 'Describing pain location', register: 'neutral' },
    { english: 'The pain started [time] ago.', context: 'Describing when symptoms began', register: 'neutral' },
    { english: 'I have a temperature of [degrees].', context: 'Reporting a fever', register: 'neutral' },
    { english: 'I\'ve been having trouble sleeping.', context: 'Reporting sleep problems', register: 'neutral' },
    { english: 'What do you recommend?', context: 'Asking for medical advice', register: 'neutral' },
    { english: 'Do I need a prescription?', context: 'Asking about medication', register: 'neutral' },
    { english: 'How often should I take this?', context: 'Asking about dosage', register: 'neutral' },
    { english: 'When should I come back?', context: 'Asking about follow-up', register: 'neutral' },
  ],
}

// ─── B2 Categories ────────────────────────────────────────────────────────────

const formal_emails_b2: PhrasebookCategory = {
  id: 'formal_emails_b2',
  level: 'B2',
  situation: 'Formal Emails & Letters',
  icon: '📧',
  phrases: [
    { english: 'I am writing to enquire about…', context: 'Opening — asking for information', register: 'formal' },
    { english: 'I am writing with reference to…', context: 'Opening — referencing something', register: 'formal' },
    { english: 'Thank you for your email of [date].', context: 'Acknowledging a received email', register: 'formal' },
    { english: 'Further to our conversation, …', context: 'Following up after a meeting/call', register: 'formal' },
    { english: 'I would like to draw your attention to…', context: 'Highlighting important information', register: 'formal' },
    { english: 'Please find attached [document].', context: 'Mentioning an attachment', register: 'formal' },
    { english: 'I would appreciate it if you could…', context: 'Making a formal request', register: 'formal' },
    { english: 'Should you require any further information, please do not hesitate to contact me.', context: 'Offering further help', register: 'formal' },
    { english: 'I look forward to your reply.', context: 'Closing — awaiting response', register: 'formal' },
    { english: 'Yours faithfully, / Yours sincerely,', context: 'Formal sign-off', register: 'formal' },
    { english: 'Kind regards, / Best regards,', context: 'Semi-formal sign-off', register: 'neutral' },
  ],
}

const negotiations_b2: PhrasebookCategory = {
  id: 'negotiations_b2',
  level: 'B2',
  situation: 'Discussions & Negotiations',
  icon: '🤝',
  phrases: [
    { english: 'Could we come to a compromise?', context: 'Proposing a middle ground', register: 'formal' },
    { english: 'I see your point, but from our perspective…', context: 'Presenting your side', register: 'neutral' },
    { english: 'We\'d be willing to [offer], provided that…', context: 'Making a conditional offer', register: 'formal' },
    { english: 'That doesn\'t quite work for us because…', context: 'Politely rejecting a proposal', register: 'neutral' },
    { english: 'What if we were to [suggest alternative]?', context: 'Proposing an alternative', register: 'neutral' },
    { english: 'We need to consider all the options.', context: 'Stalling for time', register: 'neutral' },
    { english: 'I\'ll need to discuss this with my team.', context: 'Deferring a decision', register: 'neutral' },
    { english: 'Can we revisit this point later?', context: 'Postponing a topic', register: 'neutral' },
    { english: 'That seems fair.', context: 'Agreeing to a proposal', register: 'neutral' },
    { english: 'We have a deal.', context: 'Finalising an agreement', register: 'neutral' },
  ],
}

const academic_discussion_b2: PhrasebookCategory = {
  id: 'academic_discussion_b2',
  level: 'B2',
  situation: 'Academic & Formal Discussions',
  icon: '🎓',
  phrases: [
    { english: 'Evidence suggests that…', context: 'Presenting evidence', register: 'formal' },
    { english: 'According to [source], …', context: 'Citing a source', register: 'formal' },
    { english: 'It could be argued that…', context: 'Presenting an argument objectively', register: 'formal' },
    { english: 'On the other hand, …', context: 'Presenting a contrasting view', register: 'formal' },
    { english: 'To a certain extent, …', context: 'Qualified agreement', register: 'formal' },
    { english: 'This raises the question of…', context: 'Introducing a question', register: 'formal' },
    { english: 'There is no denying that…', context: 'Stating an undeniable fact', register: 'formal' },
    { english: 'The implications of this are significant.', context: 'Highlighting consequences', register: 'formal' },
    { english: 'In summary, …', context: 'Summarising a point', register: 'formal' },
    { english: 'This leads me to conclude that…', context: 'Drawing a conclusion', register: 'formal' },
  ],
}

// ─── C1 Categories ────────────────────────────────────────────────────────────

const presentations_c1: PhrasebookCategory = {
  id: 'presentations_c1',
  level: 'C1',
  situation: 'Presentations & Public Speaking',
  icon: '🎤',
  phrases: [
    { english: 'Today I\'d like to talk to you about…', context: 'Opening a presentation', register: 'formal' },
    { english: 'I\'ll begin by outlining the key issues, then move on to…', context: 'Signposting the structure', register: 'formal' },
    { english: 'As you can see from this slide, …', context: 'Referring to a visual aid', register: 'formal' },
    { english: 'I\'d like to draw your attention to…', context: 'Highlighting an important point', register: 'formal' },
    { english: 'Building on this point, …', context: 'Developing an argument', register: 'formal' },
    { english: 'This brings me to my next point, which is…', context: 'Transitioning between sections', register: 'formal' },
    { english: 'What this essentially means is that…', context: 'Clarifying a complex idea', register: 'formal' },
    { english: 'I\'d like to take a step back and consider…', context: 'Broadening the perspective', register: 'formal' },
    { english: 'The data clearly indicates that…', context: 'Interpreting data', register: 'formal' },
    { english: 'To put it another way, …', context: 'Rephrasing for clarity', register: 'neutral' },
    { english: 'I\'m happy to take questions at the end.', context: 'Managing Q&A', register: 'formal' },
    { english: 'That\'s a very pertinent question.', context: 'Acknowledging a good question', register: 'formal' },
    { english: 'To summarise the key takeaways, …', context: 'Closing the presentation', register: 'formal' },
  ],
}

const complex_arguments_c1: PhrasebookCategory = {
  id: 'complex_arguments_c1',
  level: 'C1',
  situation: 'Complex Arguments & Critical Thinking',
  icon: '🧠',
  phrases: [
    { english: 'One might argue that…, however the evidence suggests…', context: 'Presenting a counterargument then rebutting', register: 'formal' },
    { english: 'The distinction between X and Y is crucial here.', context: 'Drawing an important distinction', register: 'formal' },
    { english: 'While I take your point, I would contend that…', context: 'Polite disagreement', register: 'formal' },
    { english: 'The issue is more nuanced than it first appears.', context: 'Suggesting complexity', register: 'formal' },
    { english: 'This argument fails to account for…', context: 'Identifying a flaw in reasoning', register: 'formal' },
    { english: 'Correlation does not necessarily imply causation.', context: 'Questioning a causal claim', register: 'formal' },
    { english: 'We should be cautious about generalising from a single case.', context: 'Raising methodological concern', register: 'formal' },
    { english: 'That notwithstanding, the broader trend is clear.', context: 'Acknowledging an exception while maintaining position', register: 'formal' },
    { english: 'The weight of evidence points convincingly to…', context: 'Summarising evidence', register: 'formal' },
    { english: 'I concede that…, but this does not undermine my overall point.', context: 'Partial concession', register: 'formal' },
    { english: 'What is often overlooked in this debate is…', context: 'Introducing a neglected angle', register: 'formal' },
    { english: 'The implications of this are far-reaching.', context: 'Stressing significance', register: 'formal' },
  ],
}

const professional_networking_c1: PhrasebookCategory = {
  id: 'professional_networking_c1',
  level: 'C1',
  situation: 'Professional Networking',
  icon: '🤝',
  phrases: [
    { english: 'I believe we have some mutual connections.', context: 'Breaking the ice at a professional event', register: 'formal' },
    { english: 'I\'ve been following your work on [topic] — it\'s really compelling.', context: 'Opening a conversation with a professional you admire', register: 'formal' },
    { english: 'I\'d love to pick your brain about [subject] sometime.', context: 'Proposing an informal knowledge exchange', register: 'neutral' },
    { english: 'Would you be open to a brief call to explore potential synergies?', context: 'Suggesting a follow-up meeting', register: 'formal' },
    { english: 'I\'m currently working on [project] — it might align with what you\'re doing.', context: 'Finding common ground', register: 'neutral' },
    { english: 'Could I connect you with [Name]? I think you\'d have a lot to discuss.', context: 'Making an introduction', register: 'formal' },
    { english: 'I\'d be happy to share some resources on that if it would be useful.', context: 'Offering to help', register: 'neutral' },
    { english: 'It was a pleasure speaking with you — let\'s stay in touch.', context: 'Closing a networking conversation', register: 'formal' },
    { english: 'I\'ll send you a LinkedIn request so we can keep the conversation going.', context: 'Following up after meeting', register: 'neutral' },
    { english: 'Do you have a card, or shall I find you on LinkedIn?', context: 'Exchanging contact details', register: 'neutral' },
  ],
}

const conflict_resolution_c1: PhrasebookCategory = {
  id: 'conflict_resolution_c1',
  level: 'C1',
  situation: 'Conflict Resolution',
  icon: '🕊️',
  phrases: [
    { english: 'I sense there may be some tension around this issue — shall we address it openly?', context: 'Naming a conflict and inviting dialogue', register: 'formal' },
    { english: 'I understand this is a difficult situation for all parties involved.', context: 'Showing empathy before discussing solutions', register: 'formal' },
    { english: 'I\'d like to hear your perspective before I share mine.', context: 'Demonstrating willingness to listen', register: 'neutral' },
    { english: 'I think there may have been a misunderstanding — let me clarify my position.', context: 'Addressing a miscommunication', register: 'neutral' },
    { english: 'Our goal should be to find a solution that works for everyone.', context: 'Refocusing on shared interests', register: 'neutral' },
    { english: 'I\'m willing to reconsider my stance if you can walk me through your reasoning.', context: 'Showing openness to compromise', register: 'formal' },
    { english: 'Could we agree to set this point aside for now and return to it later?', context: 'De-escalating a heated point', register: 'formal' },
    { english: 'I want to be direct without being dismissive of your concerns.', context: 'Balancing honesty with respect', register: 'neutral' },
    { english: 'What would a satisfactory outcome look like from your perspective?', context: 'Inviting the other party to define success', register: 'formal' },
    { english: 'I think we\'re closer to agreement than it might appear.', context: 'Building bridges at a tense moment', register: 'neutral' },
  ],
}

// ─── C2 Categories ────────────────────────────────────────────────────────────

const rhetoric_c2: PhrasebookCategory = {
  id: 'rhetoric_c2',
  level: 'C2',
  situation: 'Rhetoric & Persuasion',
  icon: '⚖️',
  phrases: [
    { english: 'It would be remiss of us not to acknowledge that…', context: 'Formally recognising a point', register: 'formal' },
    { english: 'The crux of the matter is…', context: 'Getting to the heart of the issue', register: 'formal' },
    { english: 'Far from being a setback, this represents an opportunity.', context: 'Reframing a negative as a positive', register: 'formal' },
    { english: 'It stands to reason that…', context: 'Presenting something as logical', register: 'formal' },
    { english: 'One cannot overstate the importance of…', context: 'Emphasising significance', register: 'formal' },
    { english: 'The time has come to reconsider our approach.', context: 'Calling for change', register: 'formal' },
    { english: 'Not only does this fail to address the root cause, but it also…', context: 'Compounding criticism', register: 'formal' },
    { english: 'This begs the question: why has nothing been done?', context: 'Rhetorical challenge', register: 'formal' },
    { english: 'In the final analysis, …', context: 'Drawing a definitive conclusion', register: 'formal' },
    { english: 'We would do well to remember that…', context: 'Offering wise counsel', register: 'formal' },
    { english: 'There is an inescapable irony in the fact that…', context: 'Pointing out contradiction or irony', register: 'formal' },
    { english: 'The evidence speaks for itself.', context: 'Allowing evidence to make the argument', register: 'neutral' },
  ],
}

const nuanced_discourse_c2: PhrasebookCategory = {
  id: 'nuanced_discourse_c2',
  level: 'C2',
  situation: 'Nuanced Discourse & Hedging',
  icon: '🔬',
  phrases: [
    { english: 'It is worth noting, albeit with some caution, that…', context: 'Careful, hedged observation', register: 'formal' },
    { english: 'The picture is, of course, considerably more complex.', context: 'Signalling complexity', register: 'formal' },
    { english: 'Suffice it to say that…', context: 'Indicating something is enough without elaborating', register: 'formal' },
    { english: 'This is not to suggest that…, but rather…', context: 'Clarifying a potential misinterpretation', register: 'formal' },
    { english: 'The extent to which this holds true varies considerably.', context: 'Qualifying a generalisation', register: 'formal' },
    { english: 'I would be the first to admit that…', context: 'Honest concession', register: 'formal' },
    { english: 'Taken in isolation, this fact is misleading.', context: 'Warning about context', register: 'formal' },
    { english: 'There is a fine line between X and Y.', context: 'Drawing a subtle distinction', register: 'formal' },
    { english: 'The jury is still out on whether…', context: 'Saying something is not yet resolved', register: 'neutral' },
    { english: 'One is hard-pressed to find a compelling counter-argument.', context: 'Strong (but hedged) assertion', register: 'formal' },
    { english: 'This warrants further investigation.', context: 'Flagging something needs more research', register: 'formal' },
    { english: 'At the risk of oversimplifying, …', context: 'Pre-empting a reductionism critique', register: 'formal' },
  ],
}

const legal_contractual_c2: PhrasebookCategory = {
  id: 'legal_contractual_c2',
  level: 'C2',
  situation: 'Legal & Contractual Language',
  icon: '📜',
  phrases: [
    { english: 'The terms set out herein are binding upon both parties.', context: 'Formal contract phrasing', register: 'formal' },
    { english: 'Notwithstanding the foregoing, …', context: 'Introducing a qualification to a prior statement', register: 'formal' },
    { english: 'The party of the first part hereby agrees to…', context: 'Initiating a formal obligation', register: 'formal' },
    { english: 'This agreement shall be governed by and construed in accordance with the laws of [jurisdiction].', context: 'Specifying governing law', register: 'formal' },
    { english: 'Any dispute arising out of or in connection with this contract shall be referred to arbitration.', context: 'Dispute resolution clause', register: 'formal' },
    { english: 'Time is of the essence with respect to delivery.', context: 'Stressing deadline importance', register: 'formal' },
    { english: 'The licensor grants a non-exclusive, non-transferable licence to use…', context: 'Licensing language', register: 'formal' },
    { english: 'Either party may terminate this agreement upon [n] days\' written notice.', context: 'Termination clause', register: 'formal' },
    { english: 'This clause shall survive the termination of the agreement.', context: 'Survival clause', register: 'formal' },
    { english: 'Without prejudice to any other rights or remedies available, …', context: 'Reserving additional rights', register: 'formal' },
    { english: 'Force majeure events shall excuse performance obligations.', context: 'Addressing unforeseeable circumstances', register: 'formal' },
  ],
}

const social_commentary_c2: PhrasebookCategory = {
  id: 'social_commentary_c2',
  level: 'C2',
  situation: 'Social Commentary & Debate',
  icon: '🗞️',
  phrases: [
    { english: 'The systemic nature of this problem demands a structural response, not a piecemeal one.', context: 'Arguing for root-cause solutions', register: 'formal' },
    { english: 'We risk conflating two very different phenomena if we treat them as equivalent.', context: 'Warning against false equivalence', register: 'formal' },
    { english: 'The dominant narrative obscures more than it reveals.', context: 'Challenging mainstream framing', register: 'formal' },
    { english: 'There is a troubling tendency to mistake complexity for ambiguity.', context: 'Distinguishing nuance from vagueness', register: 'formal' },
    { english: 'The discourse around this issue has been, at best, superficial.', context: 'Critiquing the quality of public debate', register: 'formal' },
    { english: 'What we are witnessing is the logical consequence of decades of policy neglect.', context: 'Tracing cause and effect', register: 'formal' },
    { english: 'Moral outrage, however justified, is not a substitute for analysis.', context: 'Calling for reason over emotion', register: 'formal' },
    { english: 'The question is not whether change is needed, but who bears the cost of that change.', context: 'Reframing a debate around equity', register: 'formal' },
    { english: 'History offers no shortage of cautionary tales on this front.', context: 'Invoking historical precedent', register: 'formal' },
    { english: 'We should resist the temptation to reduce a multifaceted issue to a single cause.', context: 'Opposing oversimplification', register: 'formal' },
    { english: 'The stakes could hardly be higher.', context: 'Emphasising urgency', register: 'formal' },
  ],
}

// ─── Full phrasebook ──────────────────────────────────────────────────────────

export const phrasebookCategories: PhrasebookCategory[] = [
  // A1
  greetings,
  basic_requests,
  numbers_time_a1,
  shopping_basic_a1,
  asking_directions_a1,
  // A2
  restaurant_a2,
  transport_booking_a2,
  weather_talk_a2,
  making_plans_a2,
  feelings_a2,
  // B1
  phone_calls_b1,
  job_interview_b1,
  giving_opinions_b1,
  health_appointments_b1,
  // B2
  formal_emails_b2,
  negotiations_b2,
  academic_discussion_b2,
  // C1
  presentations_c1,
  complex_arguments_c1,
  professional_networking_c1,
  conflict_resolution_c1,
  // C2
  rhetoric_c2,
  nuanced_discourse_c2,
  legal_contractual_c2,
  social_commentary_c2,
]

/** Return all categories for a given CEFR level */
export function getPhrasebookByLevel(level: CEFRLevel): PhrasebookCategory[] {
  return phrasebookCategories.filter((c) => c.level === level)
}

/** Return all categories matching a register filter */
export function getPhrasebookByRegister(register: Register): PhrasebookCategory[] {
  return phrasebookCategories
    .map((cat) => ({
      ...cat,
      phrases: cat.phrases.filter((p) => p.register === register),
    }))
    .filter((cat) => cat.phrases.length > 0)
}

/** Return all unique situation labels */
export function getAllSituations(): string[] {
  return phrasebookCategories.map((c) => c.situation)
}
