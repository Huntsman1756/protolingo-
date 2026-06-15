"""German phrasebook — A1 categories."""

from app.data._types import PhrasebookCategory, PhrasebookEntry

A1_CATEGORIES: list[PhrasebookCategory] = [
    PhrasebookCategory(
        id="begruessung_de_a1",
        level="A1",
        situation="Begrüßungen & Vorstellungen",
        icon="\U0001f44b",
        phrases=[
            PhrasebookEntry(
                text="Hallo!",
                context="informeller Gruß zu jeder Tageszeit",
                register="informal",
            ),
            PhrasebookEntry(
                text="Guten Tag!",
                context="üblicher Tagesgruß, auch am Telefon",
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
                context="lockere Art, nach dem Befinden zu fragen",
                register="informal",
            ),
            PhrasebookEntry(
                text="Wie geht es Ihnen?",
                context="Formell way to ask how someone is",
                register="formal",
            ),
            PhrasebookEntry(
                text="Danke, gut.",
                context="übliche Antwort auf die Frage nach dem Befinden",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Und Ihnen?",
                context="Fragen back höflichly (formal)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Und dir?",
                context="Fragen back lockerly (informell)",
                register="informal",
            ),
            PhrasebookEntry(
                text="Tschüss!",
                context="lockerer Abschied unter Freunden",
                register="informal",
            ),
            PhrasebookEntry(
                text="Auf Wiedersehen!",
                context="Formell goodbye in any setting",
                register="formal",
            ),
            PhrasebookEntry(
                text="Ich heiße...",
                context="Einleiten yourself by name",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Wie heißen Sie?",
                context="Fragen someone's name formally",
                register="formal",
            ),
            PhrasebookEntry(
                text="Freut mich.",
                context="Sagen 'nice to meet you' when introduced",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Woher kommen Sie?",
                context="Fragen where someone is from (formal)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Ich komme aus...",
                context="Sagen which country or city you are from",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Bis bald!",
                context="Sagen 'see you soon' to acquaintances",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Mach's gut!",
                context="lockerer Abschied mit fürsorglichem Unterton",
                register="informal",
            ),
        ],
    ),
    PhrasebookCategory(
        id="hoeflichkeit_de_a1",
        level="A1",
        situation="Höflichkeit & Anstand",
        icon="\U0001f64f",
        phrases=[
            PhrasebookEntry(
                text="Bitte.",
                context="bedeutet 'bitte' oder 'gern geschehen'",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Danke schön.",
                context="höfliche Art, Danke zu sagen",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Vielen Dank.",
                context="Slightly more emphatic thank you",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Gern geschehen.",
                context="übliche Antwort auf 'danke' (gern geschehen)",
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
                context="lockeres 'kein Problem' nach Entschuldigung oder Bitte",
                register="informal",
            ),
            PhrasebookEntry(
                text="In Ordnung.",
                context="Sagen 'okay / alright' to accept something",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ja, gerne.",
                context="ein Angebot gerne annehmen",
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
                context="Formell 'don't mention it' in response to thanks",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Bitte schön.",
                context="etwas überreichen oder auf Dank antworten",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Darf ich?",
                context="Fragen 'may I?' before taking or doing something",
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
        situation="Persönliche Fragen & Kennenlernen",
        icon="\u2139\ufe0f",
        phrases=[
            PhrasebookEntry(
                text="Wie heißen Sie?",
                context="nach dem Namen fragen (formell)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Wie alt sind Sie?",
                context="Fragen someone's age (formal)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Ich bin ... Jahre alt.",
                context="Feststellen your age",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Wo wohnen Sie?",
                context="Fragen where someone lives (formal)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Ich wohne in...",
                context="Sagen which city/district you live in",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Was machen Sie beruflich?",
                context="Fragen what someone does for a living (formal)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Ich bin... von Beruf.",
                context="Feststellen your profession",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Sprechen Sie Deutsch?",
                context="Fragen if someone speaks German (formal)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Ich spreche ein bisschen Deutsch.",
                context="Erklären you speak a little German",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich verstehe nicht.",
                context="Sagen you don't understand",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Können Sie das wiederholen?",
                context="Fragen someone to repeat what they said (formal)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Langsamer bitte.",
                context="um langsameres Sprechen bitten",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Sind Sie verheiratet?",
                context="Fragen if someone is married (formal)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Haben Sie Kinder?",
                context="Fragen if someone has children (formal)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Ich lerne Deutsch.",
                context="Erklären you are currently learning German",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Wie bitte?",
                context="Fragen someone to repeat (pardon?)",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Was bedeutet das?",
                context="Fragen the meaning of a word or phrase",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Können Sie mir helfen?",
                context="Fragen for help (formal)",
                register="formal",
            ),
        ],
    ),
    PhrasebookCategory(
        id="alltag_de_a1",
        level="A1",
        situation="Alltag & Routinen",
        icon="\U0001f3e0",
        phrases=[
            PhrasebookEntry(
                text="Wie spät ist es?",
                context="nach der Uhrzeit fragen",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Es ist ... Uhr.",
                context="Feststellen the time (e.g. Es ist drei Uhr.)",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich stehe um ... auf.",
                context="Sagen what time you get up",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich frühstücke.",
                context="Sagen you eat/have breakfast",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich gehe zur Arbeit.",
                context="Sagen you go to work",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich esse zu Mittag.",
                context="Sagen you eat/have lunch",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich komme nach Hause.",
                context="Sagen you come/arrive home",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich sehe fern.",
                context="Sagen you watch TV",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich gehe um ... schlafen.",
                context="Sagen what time you go to bed",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich arbeite von zu Hause.",
                context="Sagen you work from home",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich mache Sport.",
                context="Sagen you do sport / exercise",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich koche das Abendessen.",
                context="Sagen you cook dinner",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich gehe einkaufen.",
                context="Sagen you go shopping",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich treffe Freunde.",
                context="Sagen you meet up with friends",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich lese ein Buch.",
                context="Sagen you read a book",
                register="neutral",
            ),
        ],
    ),
    PhrasebookCategory(
        id="einkaufen_de_a1",
        level="A1",
        situation="Einkaufen & Bezahlen",
        icon="\U0001f6d2",
        phrases=[
            PhrasebookEntry(
                text="Was kostet das?",
                context="nach dem Preis fragen",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Wie viel kostet...?",
                context="Fragen the price of something specific",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich möchte...",
                context="Sagen 'I would like...' to the shop assistant",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich suche...",
                context="Sagen you are looking for something in a shop",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Haben Sie...?",
                context="Fragen if the shop has a certain item (formal)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Das ist zu teuer.",
                context="Sagen something is too expensive",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich nehme...",
                context="Sagen 'I'll take it' when buying",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Sonst noch etwas?",
                context="'Anything else?' — asked by the shop assistant",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Das ist alles.",
                context="Sagen 'that's all' when you have everything",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Bar oder mit Karte?",
                context="'Cash or card?' — asked at the checkout",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Die Quittung bitte.",
                context="Fragen for the receipt",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Welche Größe ist das?",
                context="Fragen what size an item is",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Haben Sie das in einer anderen Farbe?",
                context="Fragen if an item comes in another colour",
                register="formal",
            ),
            PhrasebookEntry(
                text="Ich möchte das umtauschen.",
                context="Sagen you want to exchange an item",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich bezahle bar.",
                context="Sagen you'll pay with cash",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Danke, ich schaue mich nur um.",
                context="Sagt dem Verkäufer, dass man sich nur umschaut",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Wo ist die Umkleidekabine?",
                context="Fragen where the fitting room is",
                register="neutral",
            ),
        ],
    ),
]
