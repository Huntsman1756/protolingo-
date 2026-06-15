"""German phrasebook — A1 categories."""

from app.data._types import PhrasebookCategory, PhrasebookEntry

A1_CATEGORIES: list[PhrasebookCategory] = [
    PhrasebookCategory(
        id="begruessung_de_a1",
        level="A1",
        situation="Greetings & Introductions",
        icon="\U0001f44b",
        phrases=[
            PhrasebookEntry(
                text="Hallo!",
                context="Informal greeting at any time of day",
                register="informal",
            ),
            PhrasebookEntry(
                text="Guten Tag!",
                context="Standard daytime greeting, also on the phone",
                register="formal",
            ),
            PhrasebookEntry(
                text="Guten Morgen!",
                context="Morning greeting, until about 11 am",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Guten Abend!",
                context="Evening greeting, from about 6 pm onwards",
                register="formal",
            ),
            PhrasebookEntry(
                text="Wie geht's?",
                context="Casual way to ask how someone is",
                register="informal",
            ),
            PhrasebookEntry(
                text="Wie geht es Ihnen?",
                context="Formal way to ask how someone is",
                register="formal",
            ),
            PhrasebookEntry(
                text="Danke, gut.",
                context="Standard reply to 'how are you'",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Und Ihnen?",
                context="Asking back politely (formal)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Und dir?",
                context="Asking back casually (informal)",
                register="informal",
            ),
            PhrasebookEntry(
                text="Tschüss!",
                context="Casual goodbye among friends or peers",
                register="informal",
            ),
            PhrasebookEntry(
                text="Auf Wiedersehen!",
                context="Formal goodbye in any setting",
                register="formal",
            ),
            PhrasebookEntry(
                text="Ich heiße...",
                context="Introducing yourself by name",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Wie heißen Sie?",
                context="Asking someone's name formally",
                register="formal",
            ),
            PhrasebookEntry(
                text="Freut mich.",
                context="Saying 'nice to meet you' when introduced",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Woher kommen Sie?",
                context="Asking where someone is from (formal)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Ich komme aus...",
                context="Saying which country or city you are from",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Bis bald!",
                context="Saying 'see you soon' to acquaintances",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Mach's gut!",
                context="Casual take-care farewell to a friend",
                register="informal",
            ),
        ],
    ),
    PhrasebookCategory(
        id="hoeflichkeit_de_a1",
        level="A1",
        situation="Politeness & Courtesy",
        icon="\U0001f64f",
        phrases=[
            PhrasebookEntry(
                text="Bitte.",
                context="Means 'please' or 'you're welcome'; used in both directions",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Danke schön.",
                context="Polite way to say thank you",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Vielen Dank.",
                context="Slightly more emphatic thank you",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Gern geschehen.",
                context="Common reply to 'thank you' (you're welcome)",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Entschuldigung.",
                context="Getting someone's attention or a light apology",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Es tut mir leid.",
                context="Sincere apology (I'm sorry)",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Kein Problem.",
                context="Casual 'no problem' after an apology or request",
                register="informal",
            ),
            PhrasebookEntry(
                text="In Ordnung.",
                context="Saying 'okay / alright' to accept something",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ja, gerne.",
                context="Accepting an offer gladly",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Nein, danke.",
                context="Politely declining an offer",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Vielleicht.",
                context="Non-committal 'maybe'",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Nichts zu danken.",
                context="Formal 'don't mention it' in response to thanks",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Bitte schön.",
                context="Handing something over or replying to thanks",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Darf ich?",
                context="Asking 'may I?' before taking or doing something",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Verzeihung.",
                context="More formal 'pardon me' when bumping into someone",
                register="formal",
            ),
            PhrasebookEntry(
                text="Keine Ursache.",
                context="Alternative reply to 'thank you' (no cause/not at all)",
                register="neutral",
            ),
        ],
    ),
    PhrasebookCategory(
        id="persoenliches_de_a1",
        level="A1",
        situation="Personal Questions & Getting to Know Someone",
        icon="\u2139\ufe0f",
        phrases=[
            PhrasebookEntry(
                text="Wie heißen Sie?",
                context="Asking someone's name (formal)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Wie alt sind Sie?",
                context="Asking someone's age (formal)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Ich bin ... Jahre alt.",
                context="Stating your age",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Wo wohnen Sie?",
                context="Asking where someone lives (formal)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Ich wohne in...",
                context="Saying which city/district you live in",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Was machen Sie beruflich?",
                context="Asking what someone does for a living (formal)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Ich bin... von Beruf.",
                context="Stating your profession",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Sprechen Sie Deutsch?",
                context="Asking if someone speaks German (formal)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Ich spreche ein bisschen Deutsch.",
                context="Explaining you speak a little German",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich verstehe nicht.",
                context="Saying you don't understand",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Können Sie das wiederholen?",
                context="Asking someone to repeat what they said (formal)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Langsamer bitte.",
                context="Asking someone to speak more slowly",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Sind Sie verheiratet?",
                context="Asking if someone is married (formal)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Haben Sie Kinder?",
                context="Asking if someone has children (formal)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Ich lerne Deutsch.",
                context="Explaining you are currently learning German",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Wie bitte?",
                context="Asking someone to repeat (pardon?)",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Was bedeutet das?",
                context="Asking the meaning of a word or phrase",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Können Sie mir helfen?",
                context="Asking for help (formal)",
                register="formal",
            ),
        ],
    ),
    PhrasebookCategory(
        id="alltag_de_a1",
        level="A1",
        situation="Daily Life & Routines",
        icon="\U0001f3e0",
        phrases=[
            PhrasebookEntry(
                text="Wie spät ist es?",
                context="Asking what time it is",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Es ist ... Uhr.",
                context="Stating the time (e.g. Es ist drei Uhr.)",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich stehe um ... auf.",
                context="Saying what time you get up",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich frühstücke.",
                context="Saying you eat/have breakfast",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich gehe zur Arbeit.",
                context="Saying you go to work",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich esse zu Mittag.",
                context="Saying you eat/have lunch",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich komme nach Hause.",
                context="Saying you come/arrive home",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich sehe fern.",
                context="Saying you watch TV",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich gehe um ... schlafen.",
                context="Saying what time you go to bed",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich arbeite von zu Hause.",
                context="Saying you work from home",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich mache Sport.",
                context="Saying you do sport / exercise",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich koche das Abendessen.",
                context="Saying you cook dinner",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich gehe einkaufen.",
                context="Saying you go shopping",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich treffe Freunde.",
                context="Saying you meet up with friends",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich lese ein Buch.",
                context="Saying you read a book",
                register="neutral",
            ),
        ],
    ),
    PhrasebookCategory(
        id="einkaufen_de_a1",
        level="A1",
        situation="Shopping & Paying",
        icon="\U0001f6d2",
        phrases=[
            PhrasebookEntry(
                text="Was kostet das?",
                context="Asking the price of an item",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Wie viel kostet...?",
                context="Asking the price of something specific",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich möchte...",
                context="Saying 'I would like...' to the shop assistant",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich suche...",
                context="Saying you are looking for something in a shop",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Haben Sie...?",
                context="Asking if the shop has a certain item (formal)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Das ist zu teuer.",
                context="Saying something is too expensive",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich nehme...",
                context="Saying 'I'll take it' when buying",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Sonst noch etwas?",
                context="'Anything else?' — asked by the shop assistant",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Das ist alles.",
                context="Saying 'that's all' when you have everything",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Bar oder mit Karte?",
                context="'Cash or card?' — asked at the checkout",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Die Quittung bitte.",
                context="Asking for the receipt",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Welche Größe ist das?",
                context="Asking what size an item is",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Haben Sie das in einer anderen Farbe?",
                context="Asking if an item comes in another colour",
                register="formal",
            ),
            PhrasebookEntry(
                text="Ich möchte das umtauschen.",
                context="Saying you want to exchange an item",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich bezahle bar.",
                context="Saying you'll pay with cash",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Danke, ich schaue mich nur um.",
                context="Telling the assistant you're just browsing",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Wo ist die Umkleidekabine?",
                context="Asking where the fitting room is",
                register="neutral",
            ),
        ],
    ),
]
