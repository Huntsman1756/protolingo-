"""German phrasebook — A2 categories."""

from app.data._types import PhrasebookCategory, PhrasebookEntry

A2_CATEGORIES: list[PhrasebookCategory] = [
    PhrasebookCategory(
        id="restaurant_de_a2",
        level="A2",
        situation="Im Restaurant",
        icon="\U0001f37d\ufe0f",
        phrases=[
            PhrasebookEntry(
                text="Einen Tisch für zwei, bitte.",
                context="Fragen for a table for two",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich habe reserviert.",
                context="Sagen you have a reservation",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Die Speisekarte, bitte.",
                context="Fragen for the menu",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Was können Sie empfehlen?",
                context="Fragen for a recommendation (formal)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Ich nehme das Tagesgericht.",
                context="Bestellt das Tagesgericht",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Als Vorspeise hätte ich gern...",
                context="Bestellt eine Vorspeise",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Zum Hauptgericht nehme ich...",
                context="Bestellt das Hauptgericht",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Und zum Nachtisch...",
                context="Bestellt den Nachtisch",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Das schmeckt sehr gut!",
                context="Praising the food (this tastes great)",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich möchte bezahlen, bitte.",
                context="Fragen to pay the bill",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Die Rechnung, bitte.",
                context="Fragen for the bill",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Das stimmt so.",
                context="Telling the waiter to keep the change",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Guten Appetit!",
                context="Wünschen someone 'enjoy your meal'",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Bringen Sie uns bitte...",
                context="Requesting something from the waiter (formal)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Ich bin allergisch gegen...",
                context="Informing about a food allergy",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Darf ich mit Karte bezahlen?",
                context="Fragen if you can pay by card",
                register="neutral",
            ),
        ],
    ),
    PhrasebookCategory(
        id="reisen_de_a2",
        level="A2",
        situation="Reisen & Fortbewegung",
        icon="\u2708\ufe0f",
        phrases=[
            PhrasebookEntry(
                text="Wann fährt der nächste Zug nach...?",
                context="Fragen when the next train to ... leaves",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ein Ticket nach..., bitte.",
                context="Buying a ticket to...",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Einfach oder hin und zurück?",
                context="'Single or return?' — asked at the ticket office",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Auf welchem Gleis fährt der Zug ab?",
                context="Fragen which platform the train leaves from",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Wo ist der Bahnhof?",
                context="Fragen where the train station is",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Wann kommen wir an?",
                context="Fragen when we arrive at the destination",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich hätte gern ein Einzelzimmer.",
                context="Fragen for a single room at a hotel",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ist das Frühstück inklusive?",
                context="Fragen whether breakfast is included",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Um wie viel Uhr ist Check-out?",
                context="Fragen when check-out time is",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Wo ist die nächste Bushaltestelle?",
                context="Fragen where the nearest bus stop is",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Gibt es hier eine Touristeninformation?",
                context="Fragen whether there is a tourist information nearby",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich möchte ein Auto mieten.",
                context="Sagen you want to rent a car",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Haben Sie einen Stadtplan?",
                context="Fragen for a city map (formal)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Wo kann ich Geld wechseln?",
                context="Fragen where you can change money",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Wie weit ist es zum Stadtzentrum?",
                context="Fragen how far it is to the city centre",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich habe mich verlaufen.",
                context="Sagen you got lost on foot",
                register="neutral",
            ),
        ],
    ),
    PhrasebookCategory(
        id="gesundheit_de_a2",
        level="A2",
        situation="Gesundheit & Arztbesuche",
        icon="\U0001f3e5",
        phrases=[
            PhrasebookEntry(
                text="Ich muss einen Termin beim Arzt ausmachen.",
                context="Sagen you need to book a doctor's appointment",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich fühle mich nicht wohl.",
                context="Sagen you don't feel well",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Mir tut der Kopf weh.",
                context="Sagen you have a headache",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich habe Bauchschmerzen.",
                context="Sagen you have a stomach ache",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich habe Fieber.",
                context="Sagen you have a fever",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich bin erkältet.",
                context="Sagen you have a cold",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Wo ist die nächste Apotheke?",
                context="Fragen where the nearest pharmacy is",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich brauche ein Rezept.",
                context="Sagen you need a prescription",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Wie oft muss ich das Medikament nehmen?",
                context="Fragen how often to take the medicine",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich bin gegen Penicillin allergisch.",
                context="Informing about a penicillin allergy",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Das tut weh.",
                context="Sagen 'that hurts' during an examination",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Können Sie mir etwas dagegen geben?",
                context="Fragen for medicine for a symptom (formal)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Ich möchte mich krankschreiben lassen.",
                context="Sagen you want a sick note for work",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Haben Sie die Tabletten vorrätig?",
                context="Fragen if the pharmacy has the tablets in stock",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Gute Besserung!",
                context="Wünschen someone 'get well soon'",
                register="neutral",
            ),
        ],
    ),
    PhrasebookCategory(
        id="telefon_de_a2",
        level="A2",
        situation="Am Telefon",
        icon="\U0001f4f1",
        phrases=[
            PhrasebookEntry(
                text="Guten Tag, mein Name ist...",
                context="Einleiten yourself on the phone",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Kann ich bitte mit Herrn ... sprechen?",
                context="Fragen to speak to someone (male, formal)",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Am Apparat.",
                context="Sagen 'speaking' when someone asks for you",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Einen Moment bitte.",
                context="Fragen someone to wait on the phone",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich verbinde Sie.",
                context="Putting someone through (formal)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Leider ist er/sie nicht da.",
                context="Sagen the person is not available",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Soll ich etwas ausrichten?",
                context="Anbieten to take a message",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich rufe später noch mal an.",
                context="Sagen you'll call again later",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Die Verbindung ist schlecht.",
                context="Sagen the line/connection is bad",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Können Sie mich bitte zurückrufen?",
                context="Fragen someone to call you back (formal)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Wie ist Ihre Telefonnummer?",
                context="Fragen for someone's phone number (formal)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Bitte hinterlassen Sie eine Nachricht.",
                context="Common voicemail instruction (formal)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Ich habe Sie nicht verstanden.",
                context="Sagen you didn't understand someone (formal)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Auf Wiederhören!",
                context="Goodbye on the phone (literally 'until we hear again')",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Danke für Ihren Anruf.",
                context="Danken someone for their call (formal)",
                register="formal",
            ),
        ],
    ),
    PhrasebookCategory(
        id="erzaehlen_de_a2",
        level="A2",
        situation="Geschichten erzählen & Vergangenes schildern",
        icon="\U0001f4d6",
        phrases=[
            PhrasebookEntry(
                text="Letzte Woche habe ich...",
                context="Starting a story set last week",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Gestern bin ich...",
                context="Starting a story set yesterday",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Es war ein schöner Tag.",
                context="Beschreiben a nice day in the past",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Zuerst sind wir...",
                context="Beginning a sequence of events (first we...)",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Danach haben wir...",
                context="Continuing a sequence (after that we...)",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Plötzlich hat es angefangen zu regnen.",
                context="Beschreiben a sudden change (it suddenly started raining)",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Zum Glück...",
                context="Einleiten a fortunate turn (luckily...)",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Leider hat das nicht geklappt.",
                context="Sagen something unfortunately didn't work out",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Am Ende des Tages...",
                context="Wrapping up a story (at the end of the day...)",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Das war wirklich lustig!",
                context="Sagen it was really funny",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Früher habe ich oft...",
                context="Talking about past habits (I used to often...)",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Als ich ein Kind war...",
                context="Starting a personal story from childhood",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Weißt du, was mir passiert ist?",
                context="Einleiten a personal anecdote lockerly",
                register="informal",
            ),
            PhrasebookEntry(
                text="Es war einmal...",
                context="Classic fairy-tale opening (once upon a time)",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Und dann ist das Unglaubliche passiert.",
                context="Building suspense in a story",
                register="neutral",
            ),
        ],
    ),
]
