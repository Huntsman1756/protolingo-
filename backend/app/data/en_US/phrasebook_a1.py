"""English phrasebook — A1 categories."""

from app.data._types import PhrasebookCategory, PhrasebookEntry

A1_CATEGORIES: list[PhrasebookCategory] = [
    PhrasebookCategory(
        id="greetings",
        level="A1",
        situation="Greetings & Introductions",
        icon="\U0001f44b",
        phrases=[
            PhrasebookEntry(text="Hello! / Hi!", context="Casual greeting", register="neutral"),
            PhrasebookEntry(
                text="Good morning.", context="Greeting before noon", register="formal"
            ),
            PhrasebookEntry(
                text="Good afternoon.", context="Greeting between noon and 6 pm", register="formal"
            ),
            PhrasebookEntry(text="Good evening.", context="Greeting after 6 pm", register="formal"),
            PhrasebookEntry(
                text="How are you?", context="Asking about well-being", register="neutral"
            ),
            PhrasebookEntry(
                text="I'm fine, thank you. And you?",
                context='Polite reply to "How are you?"',
                register="neutral",
            ),
            PhrasebookEntry(text="Nice to meet you.", context="First meeting", register="neutral"),
            PhrasebookEntry(
                text="Nice to meet you too.",
                context='Replying to "Nice to meet you"',
                register="neutral",
            ),
            PhrasebookEntry(
                text="My name is [Name].", context="Introducing yourself", register="neutral"
            ),
            PhrasebookEntry(
                text="I'm from [Country].", context="Saying where you are from", register="neutral"
            ),
            PhrasebookEntry(
                text="See you later!", context="Informal farewell", register="informal"
            ),
            PhrasebookEntry(text="Goodbye!", context="Formal farewell", register="formal"),
            PhrasebookEntry(
                text="Bye! / Bye-bye!", context="Informal farewell", register="informal"
            ),
            PhrasebookEntry(text="Take care!", context="Warm farewell", register="neutral"),
            PhrasebookEntry(text="Have a good day!", context="Polite farewell", register="neutral"),
        ],
    ),
    PhrasebookCategory(
        id="basic_requests",
        level="A1",
        situation="Basic Requests & Polite Phrases",
        icon="\U0001f64f",
        phrases=[
            PhrasebookEntry(
                text="Can you help me, please?", context="Asking for assistance", register="neutral"
            ),
            PhrasebookEntry(
                text="Could you repeat that, please?",
                context="When you didn't understand",
                register="neutral",
            ),
            PhrasebookEntry(
                text="I don't understand.",
                context="Saying you don't understand",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Can you speak more slowly, please?",
                context="When someone speaks too fast",
                register="neutral",
            ),
            PhrasebookEntry(
                text="How do you say [word] in English?",
                context="Asking for a translation",
                register="neutral",
            ),
            PhrasebookEntry(
                text="What does [word] mean?", context="Asking for a definition", register="neutral"
            ),
            PhrasebookEntry(
                text="Sorry, I don't know.",
                context="Saying you don't know something",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Excuse me.", context="Getting someone's attention", register="neutral"
            ),
            PhrasebookEntry(text="I'm sorry.", context="Apologising", register="neutral"),
            PhrasebookEntry(
                text="That's OK. / No problem.", context="Accepting an apology", register="neutral"
            ),
            PhrasebookEntry(
                text="Thank you very much.",
                context="Expressing strong gratitude",
                register="neutral",
            ),
            PhrasebookEntry(
                text="You're welcome.", context="Responding to thanks", register="neutral"
            ),
        ],
    ),
    PhrasebookCategory(
        id="numbers_time_a1",
        level="A1",
        situation="Numbers & Telling the Time",
        icon="\U0001f552",
        phrases=[
            PhrasebookEntry(
                text="What time is it?", context="Asking for the time", register="neutral"
            ),
            PhrasebookEntry(
                text="It's [time] o'clock.",
                context="Telling the time on the hour",
                register="neutral",
            ),
            PhrasebookEntry(
                text="It's half past [hour].", context="Telling the time at :30", register="neutral"
            ),
            PhrasebookEntry(
                text="It's quarter past [hour].",
                context="Telling the time at :15",
                register="neutral",
            ),
            PhrasebookEntry(
                text="It's quarter to [hour].",
                context="Telling the time at :45",
                register="neutral",
            ),
            PhrasebookEntry(
                text="The meeting is at [time].",
                context="Stating a scheduled time",
                register="neutral",
            ),
            PhrasebookEntry(text="How much is it?", context="Asking the price", register="neutral"),
            PhrasebookEntry(
                text="It's [price] pounds/euros.", context="Stating a price", register="neutral"
            ),
            PhrasebookEntry(
                text="Can I have the bill, please?",
                context="Asking for the bill at a caf\u00e9",
                register="neutral",
            ),
            PhrasebookEntry(
                text="What's the date today?",
                context="Asking for the current date",
                register="neutral",
            ),
            PhrasebookEntry(
                text="My birthday is on [date].", context="Stating a date", register="neutral"
            ),
        ],
    ),
    PhrasebookCategory(
        id="shopping_basic_a1",
        level="A1",
        situation="Shopping (Basics)",
        icon="\U0001f6cd\ufe0f",
        phrases=[
            PhrasebookEntry(
                text="I'd like [item], please.",
                context="Ordering or buying something",
                register="neutral",
            ),
            PhrasebookEntry(
                text="How much does this cost?", context="Asking the price", register="neutral"
            ),
            PhrasebookEntry(
                text="Do you have this in [size/color]?",
                context="Asking about stock",
                register="neutral",
            ),
            PhrasebookEntry(
                text="I'll take it.", context="Deciding to buy something", register="neutral"
            ),
            PhrasebookEntry(
                text="I'm just looking, thank you.",
                context="Telling a shop assistant you're browsing",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Can I try this on?", context="Asking to try on clothes", register="neutral"
            ),
            PhrasebookEntry(
                text="It's too big / small / expensive.",
                context="Explaining a problem",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Can I pay by card?",
                context="Asking about payment methods",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Can I have a bag, please?",
                context="Asking for a shopping bag",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Could I have a receipt?", context="Asking for a receipt", register="neutral"
            ),
        ],
    ),
    PhrasebookCategory(
        id="asking_directions_a1",
        level="A1",
        situation="Asking for Directions",
        icon="\U0001f5fa\ufe0f",
        phrases=[
            PhrasebookEntry(
                text="Excuse me, where is [place]?",
                context="Asking for a location",
                register="neutral",
            ),
            PhrasebookEntry(
                text="How do I get to [place]?", context="Asking for directions", register="neutral"
            ),
            PhrasebookEntry(
                text="Is it far from here?", context="Asking about distance", register="neutral"
            ),
            PhrasebookEntry(
                text="Turn left / right.", context="Giving a direction", register="neutral"
            ),
            PhrasebookEntry(
                text="Go straight ahead.", context="Giving a direction", register="neutral"
            ),
            PhrasebookEntry(
                text="It's on the left / right.",
                context="Describing a location",
                register="neutral",
            ),
            PhrasebookEntry(
                text="It's next to / opposite [landmark].",
                context="Describing a location",
                register="neutral",
            ),
            PhrasebookEntry(
                text="It's about [number] minutes on foot.",
                context="Describing distance",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Take the [number] bus.", context="Giving transport advice", register="neutral"
            ),
            PhrasebookEntry(
                text="Sorry, I don't know this area.", context="Unable to help", register="neutral"
            ),
        ],
    ),
]
