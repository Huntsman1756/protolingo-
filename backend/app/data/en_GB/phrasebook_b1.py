"""British English phrasebook — B1 categories."""

from app.data._types import PhrasebookCategory, PhrasebookEntry

B1_CATEGORIES: list[PhrasebookCategory] = [
    PhrasebookCategory(
        id="phone_calls_b1",
        level="B1",
        situation="Phone Calls",
        icon="\U0001f4de",
        phrases=[
            PhrasebookEntry(
                text="Hello, this is [Name] speaking.",
                context="Introducing yourself on the phone",
                register="formal",
            ),
            PhrasebookEntry(
                text="Could I speak to [Name], please?",
                context="Asking to speak to someone",
                register="formal",
            ),
            PhrasebookEntry(
                text="I'm afraid [Name] isn't available.",
                context="Saying someone isn't there",
                register="formal",
            ),
            PhrasebookEntry(
                text="Can I take a message?",
                context="Offering to take a message",
                register="formal",
            ),
            PhrasebookEntry(
                text="Could you ask [Name] to call me back?",
                context="Leaving a message",
                register="formal",
            ),
            PhrasebookEntry(
                text="I'll call back later.", context="Saying you'll call again", register="neutral"
            ),
            PhrasebookEntry(
                text="I'm calling about [topic].",
                context="Stating the reason for your call",
                register="neutral",
            ),
            PhrasebookEntry(
                text="I'm sorry, you're breaking up.", context="Poor signal", register="neutral"
            ),
            PhrasebookEntry(
                text="Could you speak up, please?",
                context="Asking someone to speak louder",
                register="neutral",
            ),
            PhrasebookEntry(
                text="I'll put you on hold for a moment.",
                context="Asking someone to wait",
                register="formal",
            ),
            PhrasebookEntry(
                text="Thank you for calling. Goodbye.",
                context="Ending a professional call",
                register="formal",
            ),
        ],
    ),
    PhrasebookCategory(
        id="job_interview_b1",
        level="B1",
        situation="Job Interviews",
        icon="\U0001f4bc",
        phrases=[
            PhrasebookEntry(
                text="Thank you for the opportunity.",
                context="Thanking the interviewer",
                register="formal",
            ),
            PhrasebookEntry(
                text="I'm very interested in this position.",
                context="Expressing interest",
                register="formal",
            ),
            PhrasebookEntry(
                text="In my previous role, I was responsible for...",
                context="Describing past experience",
                register="formal",
            ),
            PhrasebookEntry(
                text="I have experience in [field/skill].",
                context="Mentioning a skill",
                register="formal",
            ),
            PhrasebookEntry(
                text="My greatest strength is [strength].",
                context="Answering a strengths question",
                register="formal",
            ),
            PhrasebookEntry(
                text="I am a team player and also enjoy working independently.",
                context="Describing work style",
                register="formal",
            ),
            PhrasebookEntry(
                text="I'm a quick learner.",
                context="Describing learning ability",
                register="formal",
            ),
            PhrasebookEntry(
                text="What does a typical day look like in this role?",
                context="Asking about the job",
                register="formal",
            ),
            PhrasebookEntry(
                text="When can I expect to hear from you?",
                context="Asking about next steps",
                register="formal",
            ),
            PhrasebookEntry(
                text="I look forward to hearing from you.",
                context="Closing the conversation",
                register="formal",
            ),
        ],
    ),
    PhrasebookCategory(
        id="giving_opinions_b1",
        level="B1",
        situation="Giving Opinions & Agreeing/Disagreeing",
        icon="\U0001f4ac",
        phrases=[
            PhrasebookEntry(
                text="In my opinion, ...", context="Introducing your view", register="neutral"
            ),
            PhrasebookEntry(
                text="Personally, I think that...",
                context="Emphasising a personal view",
                register="neutral",
            ),
            PhrasebookEntry(
                text="I agree with you completely.", context="Full agreement", register="neutral"
            ),
            PhrasebookEntry(
                text="I partially agree, but...", context="Partial agreement", register="neutral"
            ),
            PhrasebookEntry(
                text="I'm afraid I don't agree.", context="Polite disagreement", register="neutral"
            ),
            PhrasebookEntry(
                text="That's a good point, but...",
                context="Acknowledging then disagreeing",
                register="neutral",
            ),
            PhrasebookEntry(
                text="I see your point, however...",
                context="Countering an argument",
                register="neutral",
            ),
            PhrasebookEntry(
                text="It depends on...", context="Qualified answer", register="neutral"
            ),
            PhrasebookEntry(
                text="I'm not sure about that.", context="Expressing doubt", register="neutral"
            ),
            PhrasebookEntry(
                text="Could you clarify what you mean?",
                context="Asking for clarification",
                register="neutral",
            ),
            PhrasebookEntry(
                text="As far as I know, ...", context="Limited certainty", register="neutral"
            ),
            PhrasebookEntry(
                text="I'd like to add that...",
                context="Adding to the conversation",
                register="neutral",
            ),
        ],
    ),
    PhrasebookCategory(
        id="health_appointments_b1",
        level="B1",
        situation="Health & Doctor Appointments",
        icon="\U0001f3e5",
        phrases=[
            PhrasebookEntry(
                text="I'd like to make an appointment.",
                context="Booking a medical appointment",
                register="formal",
            ),
            PhrasebookEntry(
                text="I haven't been feeling well lately.",
                context="Describing general illness",
                register="neutral",
            ),
            PhrasebookEntry(
                text="I have a pain in my [body part].",
                context="Describing pain location",
                register="neutral",
            ),
            PhrasebookEntry(
                text="The pain started [time] ago.",
                context="Describing when symptoms began",
                register="neutral",
            ),
            PhrasebookEntry(
                text="I have a temperature of [degrees].",
                context="Reporting a fever",
                register="neutral",
            ),
            PhrasebookEntry(
                text="I've been having trouble sleeping.",
                context="Reporting sleep problems",
                register="neutral",
            ),
            PhrasebookEntry(
                text="What would you suggest for this?",
                context="Asking the doctor for a treatment recommendation (distinct from restaurant 'What do you recommend?')",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Do I need a prescription?",
                context="Asking about medication",
                register="neutral",
            ),
            PhrasebookEntry(
                text="How often should I take this?",
                context="Asking about dosage",
                register="neutral",
            ),
            PhrasebookEntry(
                text="When should I come back?",
                context="Asking about follow-up",
                register="neutral",
            ),
            PhrasebookEntry(
                text="I'd like to register with a GP, please.",
                context="Registering with a doctor at an NHS surgery for the first time",
                register="formal",
            ),
            PhrasebookEntry(
                text="I need to make an appointment at the surgery.",
                context="Booking a GP appointment — 'surgery' is the British term for a GP's clinic",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Should I call NHS 111?",
                context="Asking whether to use the NHS non-emergency helpline (available 24/7 in the UK)",
                register="neutral",
            ),
        ],
    ),
    PhrasebookCategory(
        id="pub_social_b1",
        level="B1",
        situation="British Pub & Social Life",
        icon="\U0001f37a",
        phrases=[
            PhrasebookEntry(
                text="What are you having?",
                context="Asking someone what they want to drink — essential for buying a round",
                register="informal",
            ),
            PhrasebookEntry(
                text="It's my round.",
                context="Saying it is your turn to buy drinks for the group. Buying rounds is a core British social custom.",
                register="informal",
            ),
            PhrasebookEntry(
                text="Same again?",
                context="Asking if someone wants the same drink as before",
                register="informal",
            ),
            PhrasebookEntry(
                text="Cheers!",
                context="Toast used when drinking; also a casual way to say thank you",
                register="informal",
            ),
            PhrasebookEntry(
                text="A pint of [lager/bitter/ale], please.",
                context="Ordering beer measured in pints (568ml). A pint is the standard British beer measure.",
                register="neutral",
            ),
            PhrasebookEntry(
                text="This round's on me.",
                context="Telling the group you will pay for everyone's drinks",
                register="informal",
            ),
            PhrasebookEntry(
                text="Shall we head to the pub?",
                context="Suggesting going to a pub — the British pub is a central social institution",
                register="informal",
            ),
            PhrasebookEntry(
                text="Are you alright for drinks?",
                context="Checking if anyone in the group needs another drink",
                register="informal",
            ),
            PhrasebookEntry(
                text="Last orders, please!",
                context="The barman's announcement that the bar is about to stop serving — you must order your final drinks",
                register="neutral",
            ),
            PhrasebookEntry(
                text="I'll get these.",
                context="Saying you will pay for the current round or items",
                register="informal",
            ),
        ],
    ),
]
