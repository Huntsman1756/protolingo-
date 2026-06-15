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
                context="Morgengruß, bis ca. 11 Uhr",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Guten Abend!",
                context="Abendgruß, ab ca. 18 Uhr",
                register="formal",
            ),
            PhrasebookEntry(
                text="Wie geht's?",
                context="lockere Art, nach dem Befinden zu fragen",
                register="informal",
            ),
            PhrasebookEntry(
                text="Wie geht es Ihnen?",
                context="formelle Frage nach dem Befinden",
                register="formal",
            ),
            PhrasebookEntry(
                text="Danke, gut.",
                context="übliche Antwort auf die Frage nach dem Befinden",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Und Ihnen?",
                context="höfliche Rückfrage (formell)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Und dir?",
                context="lockere Rückfrage (informell)",
                register="informal",
            ),
            PhrasebookEntry(
                text="Tschüss!",
                context="lockerer Abschied unter Freunden",
                register="informal",
            ),
            PhrasebookEntry(
                text="Auf Wiedersehen!",
                context="formelle Verabschiedung in jedem Kontext",
                register="formal",
            ),
            PhrasebookEntry(
                text="Ich heiße...",
                context="sich mit Namen vorstellen",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Wie heißen Sie?",
                context="formell nach dem Namen fragen",
                register="formal",
            ),
            PhrasebookEntry(
                text="Freut mich.",
                context="nach einer Vorstellung Freude ausdrücken",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Woher kommen Sie?",
                context="formell nach der Herkunft fragen",
                register="formal",
            ),
            PhrasebookEntry(
                text="Ich komme aus...",
                context="Land oder Stadt der Herkunft nennen",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Bis bald!",
                context="Bekannten 'bis bald' sagen",
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
                context="etwas nachdrücklicheres Dankeschön",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Gern geschehen.",
                context="übliche Antwort auf 'danke' (gern geschehen)",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Entschuldigung.",
                context="Aufmerksamkeit erregen oder leichte Entschuldigung",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Es tut mir leid.",
                context="aufrichtige Entschuldigung",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Kein Problem.",
                context="lockeres 'kein Problem' nach Entschuldigung oder Bitte",
                register="informal",
            ),
            PhrasebookEntry(
                text="In Ordnung.",
                context="Zustimmung zu etwas ausdrücken (okay / einverstanden)",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ja, gerne.",
                context="ein Angebot gerne annehmen",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Nein, danke.",
                context="ein Angebot höflich ablehnen",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Vielleicht.",
                context="unverbindliches 'vielleicht'",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Nichts zu danken.",
                context="formelle Antwort auf Dank (keine Ursache)",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Bitte schön.",
                context="etwas überreichen oder auf Dank antworten",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Darf ich?",
                context="um Erlaubnis fragen, bevor man etwas tut",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Verzeihung.",
                context="formellere Entschuldigung bei versehentlichem Kontakt",
                register="formal",
            ),
            PhrasebookEntry(
                text="Keine Ursache.",
                context="alternative Antwort auf 'danke' (keine Ursache, nicht der Rede wert)",
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
                context="formell nach dem Alter fragen",
                register="formal",
            ),
            PhrasebookEntry(
                text="Ich bin ... Jahre alt.",
                context="das eigene Alter nennen",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Wo wohnen Sie?",
                context="formell nach dem Wohnort fragen",
                register="formal",
            ),
            PhrasebookEntry(
                text="Ich wohne in...",
                context="Stadt oder Stadtteil nennen, in dem man wohnt",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Was machen Sie beruflich?",
                context="formell nach dem Beruf fragen",
                register="formal",
            ),
            PhrasebookEntry(
                text="Ich bin... von Beruf.",
                context="den eigenen Beruf nennen",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Sprechen Sie Deutsch?",
                context="formell nach Deutschkenntnissen fragen",
                register="formal",
            ),
            PhrasebookEntry(
                text="Ich spreche ein bisschen Deutsch.",
                context="erklären, dass man etwas Deutsch spricht",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich verstehe nicht.",
                context="sagen, dass man nicht versteht",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Können Sie das wiederholen?",
                context="formell um Wiederholung bitten",
                register="formal",
            ),
            PhrasebookEntry(
                text="Langsamer bitte.",
                context="um langsameres Sprechen bitten",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Sind Sie verheiratet?",
                context="formell nach dem Familienstand fragen",
                register="formal",
            ),
            PhrasebookEntry(
                text="Haben Sie Kinder?",
                context="formell nach Kindern fragen",
                register="formal",
            ),
            PhrasebookEntry(
                text="Ich lerne Deutsch.",
                context="erklären, dass man gerade Deutsch lernt",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Wie bitte?",
                context="um Wiederholung bitten (wie bitte?)",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Was bedeutet das?",
                context="nach der Bedeutung eines Wortes oder Satzes fragen",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Können Sie mir helfen?",
                context="formell um Hilfe bitten",
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
                context="die Uhrzeit nennen (z. B. Es ist drei Uhr.)",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich stehe um ... auf.",
                context="sagen, wann man aufsteht",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich frühstücke.",
                context="sagen, dass man frühstückt",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich gehe zur Arbeit.",
                context="sagen, dass man zur Arbeit geht",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich esse zu Mittag.",
                context="sagen, dass man zu Mittag isst",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich komme nach Hause.",
                context="sagen, dass man nach Hause kommt",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich sehe fern.",
                context="sagen, dass man fernsieht",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich gehe um ... schlafen.",
                context="sagen, wann man schlafen geht",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich arbeite von zu Hause.",
                context="sagen, dass man von zu Hause arbeitet",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich mache Sport.",
                context="sagen, dass man Sport macht",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich koche das Abendessen.",
                context="sagen, dass man Abendessen kocht",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich gehe einkaufen.",
                context="sagen, dass man einkaufen geht",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich treffe Freunde.",
                context="sagen, dass man Freunde trifft",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich lese ein Buch.",
                context="sagen, dass man ein Buch liest",
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
                context="nach dem Preis von etwas Bestimmtem fragen",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich möchte...",
                context="dem Verkäufer einen Wunsch mitteilen",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich suche...",
                context="im Geschäft nach etwas fragen, das man sucht",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Haben Sie...?",
                context="formell nach einem Artikel fragen",
                register="formal",
            ),
            PhrasebookEntry(
                text="Das ist zu teuer.",
                context="sagen, dass etwas zu teuer ist",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich nehme...",
                context="beim Kauf sagen, dass man es nimmt",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Sonst noch etwas?",
                context="Frage des Verkäufers nach weiteren Wünschen",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Das ist alles.",
                context="sagen, dass man alles hat",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Bar oder mit Karte?",
                context="Frage an der Kasse nach der Zahlungsart",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Die Quittung bitte.",
                context="nach dem Kassenbon fragen",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Welche Größe ist das?",
                context="nach der Größe eines Artikels fragen",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Haben Sie das in einer anderen Farbe?",
                context="nach einer anderen Farbe fragen",
                register="formal",
            ),
            PhrasebookEntry(
                text="Ich möchte das umtauschen.",
                context="sagen, dass man einen Artikel umtauschen möchte",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich bezahle bar.",
                context="sagen, dass man bar bezahlt",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Danke, ich schaue mich nur um.",
                context="dem Verkäufer sagen, dass man sich nur umschaut",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Wo ist die Umkleidekabine?",
                context="nach der Umkleidekabine fragen",
                register="neutral",
            ),
        ],
    ),
]
