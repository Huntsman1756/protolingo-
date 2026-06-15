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
                context="um einen Tisch für zwei Personen bitten",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich habe reserviert.",
                context="sagen, dass man reserviert hat",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Die Speisekarte, bitte.",
                context="um die Speisekarte bitten",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Was können Sie empfehlen?",
                context="formell nach einer Empfehlung fragen",
                register="formal",
            ),
            PhrasebookEntry(
                text="Ich nehme das Tagesgericht.",
                context="das Tagesgericht bestellen",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Als Vorspeise hätte ich gern...",
                context="eine Vorspeise bestellen",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Zum Hauptgericht nehme ich...",
                context="das Hauptgericht bestellen",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Und zum Nachtisch...",
                context="den Nachtisch bestellen",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Das schmeckt sehr gut!",
                context="das Essen loben",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich möchte bezahlen, bitte.",
                context="darum bitten, bezahlen zu können",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Die Rechnung, bitte.",
                context="um die Rechnung bitten",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Das stimmt so.",
                context="der Bedienung sagen, dass das Wechselgeld behalten werden kann",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Guten Appetit!",
                context="jemandem 'guten Appetit' wünschen",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Bringen Sie uns bitte...",
                context="die Bedienung formell um etwas bitten",
                register="formal",
            ),
            PhrasebookEntry(
                text="Ich bin allergisch gegen...",
                context="auf eine Lebensmittelallergie hinweisen",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Darf ich mit Karte bezahlen?",
                context="fragen, ob man mit Karte bezahlen kann",
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
                context="nach der Abfahrtszeit des nächsten Zuges fragen",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ein Ticket nach..., bitte.",
                context="eine Fahrkarte kaufen",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Einfach oder hin und zurück?",
                context="Frage am Schalter nach einfacher oder Hin- und Rückfahrt",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Auf welchem Gleis fährt der Zug ab?",
                context="nach dem Abfahrtsgleis fragen",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Wo ist der Bahnhof?",
                context="nach dem Weg zum Bahnhof fragen",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Wann kommen wir an?",
                context="nach der Ankunftszeit fragen",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich hätte gern ein Einzelzimmer.",
                context="im Hotel nach einem Einzelzimmer fragen",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ist das Frühstück inklusive?",
                context="fragen, ob Frühstück inbegriffen ist",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Um wie viel Uhr ist Check-out?",
                context="nach der Check-out-Zeit fragen",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Wo ist die nächste Bushaltestelle?",
                context="nach der nächsten Bushaltestelle fragen",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Gibt es hier eine Touristeninformation?",
                context="fragen, ob es eine Touristeninformation in der Nähe gibt",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich möchte ein Auto mieten.",
                context="sagen, dass man ein Auto mieten möchte",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Haben Sie einen Stadtplan?",
                context="formell nach einem Stadtplan fragen",
                register="formal",
            ),
            PhrasebookEntry(
                text="Wo kann ich Geld wechseln?",
                context="fragen, wo man Geld wechseln kann",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Wie weit ist es zum Stadtzentrum?",
                context="nach der Entfernung zum Stadtzentrum fragen",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich habe mich verlaufen.",
                context="sagen, dass man sich zu Fuß verlaufen hat",
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
                context="sagen, dass man einen Arzttermin vereinbaren muss",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich fühle mich nicht wohl.",
                context="sagen, dass man sich unwohl fühlt",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Mir tut der Kopf weh.",
                context="sagen, dass man Kopfschmerzen hat",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich habe Bauchschmerzen.",
                context="sagen, dass man Bauchschmerzen hat",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich habe Fieber.",
                context="sagen, dass man Fieber hat",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich bin erkältet.",
                context="sagen, dass man erkältet ist",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Wo ist die nächste Apotheke?",
                context="nach der nächsten Apotheke fragen",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich brauche ein Rezept.",
                context="sagen, dass man ein Rezept braucht",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Wie oft muss ich das Medikament nehmen?",
                context="nach der Einnahmehäufigkeit des Medikaments fragen",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich bin gegen Penicillin allergisch.",
                context="auf eine Penicillinallergie hinweisen",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Das tut weh.",
                context="bei einer Untersuchung sagen, dass etwas wehtut",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Können Sie mir etwas dagegen geben?",
                context="formell um ein Medikament gegen ein Symptom bitten",
                register="formal",
            ),
            PhrasebookEntry(
                text="Ich möchte mich krankschreiben lassen.",
                context="sagen, dass man eine Krankschreibung für die Arbeit möchte",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Haben Sie die Tabletten vorrätig?",
                context="in der Apotheke nach Verfügbarkeit der Tabletten fragen",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Gute Besserung!",
                context="jemandem 'gute Besserung' wünschen",
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
                context="sich am Telefon mit Namen vorstellen",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Kann ich bitte mit Herrn ... sprechen?",
                context="darum bitten, mit jemandem zu sprechen (männlich, formell)",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Am Apparat.",
                context="'am Apparat' sagen, wenn jemand nach einem fragt",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Einen Moment bitte.",
                context="jemanden am Telefon bitten, kurz zu warten",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich verbinde Sie.",
                context="jemanden durchstellen (formell)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Leider ist er/sie nicht da.",
                context="sagen, dass die Person nicht verfügbar ist",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Soll ich etwas ausrichten?",
                context="anbieten, eine Nachricht aufzunehmen",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich rufe später noch mal an.",
                context="sagen, dass man später noch einmal anruft",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Die Verbindung ist schlecht.",
                context="sagen, dass die Leitung schlecht ist",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Können Sie mich bitte zurückrufen?",
                context="formell um Rückruf bitten",
                register="formal",
            ),
            PhrasebookEntry(
                text="Wie ist Ihre Telefonnummer?",
                context="formell nach der Telefonnummer fragen",
                register="formal",
            ),
            PhrasebookEntry(
                text="Bitte hinterlassen Sie eine Nachricht.",
                context="übliche Mailbox-Ansage (formell)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Ich habe Sie nicht verstanden.",
                context="sagen, dass man jemanden nicht verstanden hat (formell)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Auf Wiederhören!",
                context="Verabschiedung am Telefon (wörtlich 'bis zum Wiederhören')",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Danke für Ihren Anruf.",
                context="jemandem für seinen Anruf danken (formell)",
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
                context="eine Geschichte einleiten, die letzte Woche spielt",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Gestern bin ich...",
                context="eine Geschichte einleiten, die gestern spielt",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Es war ein schöner Tag.",
                context="einen schönen Tag in der Vergangenheit beschreiben",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Zuerst sind wir...",
                context="eine Abfolge von Ereignissen beginnen (zuerst sind wir...)",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Danach haben wir...",
                context="eine Abfolge fortsetzen (danach haben wir...)",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Plötzlich hat es angefangen zu regnen.",
                context="eine plötzliche Veränderung beschreiben (es fing plötzlich an zu regnen)",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Zum Glück...",
                context="eine glückliche Wendung einleiten (zum Glück...)",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Leider hat das nicht geklappt.",
                context="sagen, dass etwas leider nicht funktioniert hat",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Am Ende des Tages...",
                context="eine Geschichte abschließen (am Ende des Tages...)",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Das war wirklich lustig!",
                context="sagen, dass es wirklich lustig war",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Früher habe ich oft...",
                context="über vergangene Gewohnheiten sprechen (früher habe ich oft...)",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Als ich ein Kind war...",
                context="eine persönliche Kindheitsgeschichte einleiten",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Weißt du, was mir passiert ist?",
                context="eine persönliche Anekdote auf lockere Weise einleiten",
                register="informal",
            ),
            PhrasebookEntry(
                text="Es war einmal...",
                context="klassischer Märchenanfang (es war einmal...)",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Und dann ist das Unglaubliche passiert.",
                context="Spannung in einer Geschichte aufbauen",
                register="neutral",
            ),
        ],
    ),
]
