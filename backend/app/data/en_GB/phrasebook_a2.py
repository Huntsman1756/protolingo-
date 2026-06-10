"""British English phrasebook — A2 categories."""

from app.data._types import PhrasebookCategory, PhrasebookEntry

A2_CATEGORIES: list[PhrasebookCategory] = [
    PhrasebookCategory(
        id="restaurant_a2",
        level="A2",
        situation="At a Restaurant",
        icon="\U0001f37d\ufe0f",
        phrases=[
            PhrasebookEntry(
                text="A table for two, please.",
                context="Arriving at a restaurant",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Can I see the menu, please?",
                context="Asking for the menu",
                register="neutral",
            ),
            PhrasebookEntry(
                text="What do you recommend?",
                context="Asking the waiter for advice",
                register="neutral",
            ),
            PhrasebookEntry(
                text="I'll have [dish], please.", context="Ordering food", register="neutral"
            ),
            PhrasebookEntry(
                text="Could I have [dish] instead of [dish]?",
                context="Changing your order",
                register="neutral",
            ),
            PhrasebookEntry(
                text="I'm allergic to [ingredient].",
                context="Informing about allergies",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Is [dish] vegetarian / vegan?",
                context="Asking about dietary options",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Excuse me, we've been waiting for a while.",
                context="Polite complaint",
                register="neutral",
            ),
            PhrasebookEntry(
                text="The food is delicious!", context="Complimenting the food", register="neutral"
            ),
            PhrasebookEntry(
                text="Could we have the bill, please?",
                context="Asking for the bill",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Do you accept credit cards?",
                context="Asking about payment",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Could we split the bill?", context="Paying separately", register="neutral"
            ),
            PhrasebookEntry(
                text="Could I have some tap water, please?",
                context="Requesting free tap water — licensed premises in the UK are legally required to provide it",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Is service included?", context="Asking about the tip", register="neutral"
            ),
        ],
    ),
    PhrasebookCategory(
        id="transport_booking_a2",
        level="A2",
        situation="Travel & Transport",
        icon="\U0001f686",
        phrases=[
            PhrasebookEntry(
                text="One ticket to [destination], please.",
                context="Buying a ticket",
                register="neutral",
            ),
            PhrasebookEntry(
                text="A return ticket to [destination], please.",
                context="Buying a return ticket",
                register="neutral",
            ),
            PhrasebookEntry(
                text="What time does the next train leave?",
                context="Asking about departure times",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Which platform does it leave from?",
                context="Asking about the platform",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Is there a direct train to [destination]?",
                context="Asking about connections",
                register="neutral",
            ),
            PhrasebookEntry(
                text="I'd like to book a seat.", context="Reserving a seat", register="neutral"
            ),
            PhrasebookEntry(
                text="I've missed my train / flight.",
                context="Explaining a missed connection",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Is there a delay?", context="Asking about delays", register="neutral"
            ),
            PhrasebookEntry(
                text="Where is gate [number]?", context="At an airport", register="neutral"
            ),
            PhrasebookEntry(
                text="I have a connecting flight at [time].",
                context="Informing about a connection",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Is there a tourist pass available?",
                context="Asking about city transport",
                register="neutral",
            ),
        ],
    ),
    PhrasebookCategory(
        id="weather_talk_a2",
        level="A2",
        situation="Talking About Weather",
        icon="\U0001f324\ufe0f",
        phrases=[
            PhrasebookEntry(
                text="What's the weather like today?",
                context="Asking about current weather",
                register="neutral",
            ),
            PhrasebookEntry(
                text="It's sunny / cloudy / rainy.",
                context="Describing current weather",
                register="neutral",
            ),
            PhrasebookEntry(
                text="It's quite warm / cold today.",
                context="Describing temperature",
                register="neutral",
            ),
            PhrasebookEntry(
                text="It's going to rain later.", context="Predicting weather", register="neutral"
            ),
            PhrasebookEntry(
                text="What's the forecast for tomorrow?",
                context="Asking about tomorrow's weather",
                register="neutral",
            ),
            PhrasebookEntry(
                text="I love this kind of weather.",
                context="Expressing preference",
                register="informal",
            ),
            PhrasebookEntry(
                text="I hate it when it's this cold!",
                context="Expressing dislike",
                register="informal",
            ),
            PhrasebookEntry(
                text="You should bring an umbrella.",
                context="Giving weather advice",
                register="neutral",
            ),
            PhrasebookEntry(
                text="The weather is much better than yesterday.",
                context="Comparing weather",
                register="neutral",
            ),
            PhrasebookEntry(
                text="There's a chance of [rain/snow] later.",
                context="Talking about weather forecast",
                register="neutral",
            ),
            PhrasebookEntry(
                text="The forecast says it'll clear up by [time].",
                context="Discussing weather forecast",
                register="neutral",
            ),
        ],
    ),
    PhrasebookCategory(
        id="making_plans_a2",
        level="A2",
        situation="Making Plans & Arrangements",
        icon="\U0001f4c5",
        phrases=[
            PhrasebookEntry(
                text="What are you doing this weekend?",
                context="Asking about plans",
                register="informal",
            ),
            PhrasebookEntry(
                text="Would you like to [do something]?",
                context="Inviting someone",
                register="neutral",
            ),
            PhrasebookEntry(
                text="I'd love to!", context="Accepting an invitation", register="neutral"
            ),
            PhrasebookEntry(
                text="I'm afraid I can't. I have other plans.",
                context="Declining an invitation",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Maybe another time.", context="Polite decline", register="neutral"
            ),
            PhrasebookEntry(
                text="What time shall we meet?",
                context="Arranging a meeting time",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Let's meet at [time] at [place].",
                context="Confirming arrangements",
                register="neutral",
            ),
            PhrasebookEntry(
                text="I'll be there at [time].", context="Confirming attendance", register="neutral"
            ),
            PhrasebookEntry(
                text="Can we change the time / date?",
                context="Requesting a change",
                register="neutral",
            ),
            PhrasebookEntry(
                text="I'm running late.", context="Warning you will be late", register="informal"
            ),
            PhrasebookEntry(
                text="I'll be there in about 10 minutes.",
                context="Estimating your arrival time",
                register="neutral",
            ),
        ],
    ),
    PhrasebookCategory(
        id="feelings_a2",
        level="A2",
        situation="Expressing Feelings",
        icon="\U0001f60a",
        phrases=[
            PhrasebookEntry(
                text="I'm really excited about [it].",
                context="Showing enthusiasm",
                register="neutral",
            ),
            PhrasebookEntry(
                text="I'm a bit nervous.", context="Expressing nervousness", register="neutral"
            ),
            PhrasebookEntry(
                text="I'm so tired.", context="Expressing fatigue", register="informal"
            ),
            PhrasebookEntry(
                text="That's great news!", context="Reacting positively to news", register="neutral"
            ),
            PhrasebookEntry(
                text="I'm sorry to hear that.", context="Expressing sympathy", register="neutral"
            ),
            PhrasebookEntry(
                text="Are you OK?", context="Checking if someone is alright", register="neutral"
            ),
            PhrasebookEntry(
                text="Don't worry about it.", context="Reassuring someone", register="informal"
            ),
            PhrasebookEntry(
                text="I'm not feeling well.", context="Saying you feel ill", register="neutral"
            ),
            PhrasebookEntry(
                text="I feel much better now.",
                context="Saying your health improved",
                register="neutral",
            ),
            PhrasebookEntry(
                text="I can't wait for [event]!",
                context="Expressing anticipation",
                register="informal",
            ),
            PhrasebookEntry(
                text="What a shame! / What a pity!",
                context="Expressing disappointment",
                register="neutral",
            ),
        ],
    ),
]
