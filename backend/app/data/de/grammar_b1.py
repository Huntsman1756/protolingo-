"""German grammar topics — B1."""

from app.data._types import GrammarExample, GrammarMistake, GrammarTopic

B1_GRAMMAR_TOPICS: list[GrammarTopic] = [
    GrammarTopic(
        slug="konjunktiv-ii-wuerde",
        title='Konjunktiv II mit "würde"',
        level="B1",
        category="Modi",
        summary="The Konjunktiv II with 'würde' + infinitive — the standard way to express hypothetical situations.",
        explanation="""Der **Konjunktiv II mit würde** ist die häufigste Form für hypothetische Situationen, Wünsche und höfliche Bitten: **würde** (konjugiert) + **Infinitiv** (am Satzende).
ich würde gehen · du würdest gehen · er würde gehen · wir würden gehen · ihr würdet gehen · sie würden gehen

Hypothetisch: *An deiner Stelle **würde** ich mehr lernen.*
Höflich: ***Würden** Sie mir bitte helfen?*
Ratschlag: *Du **solltest** mehr schlafen.* (sollte = Konjunktiv II von sollen)

Bei **sein, haben, Modalverben** und einigen häufigen Verben verwendet man die **echte** Konjunktiv II-Form (wäre, hätte, könnte). Für die meisten anderen Verben ist würde + Infinitiv die natürliche Wahl. Im wenn-Satz verwendet man den echten Konjunktiv II, nicht würde.""",
        structure="würde/würdest/würden/würdet + Infinitiv (am Satzende)",
        rules=[
            "Würde + Infinitiv ist die Standardform des Konjunktiv II für die meisten Verben.",
            "Für sein, haben, Modalverben benutzt man die echten Konjunktiv II-Formen (wäre, hätte, könnte...).",
            'Der Infinitiv steht am Satzende: "Ich würde gern mitkommen."',
            'Höfliche Bitten werden oft mit "würden Sie" formuliert.',
            '"Würde" wird von "werden" abgeleitet und folgt dessen Konjunktiv II-Muster.',
        ],
        examples=[
            GrammarExample(
                text="Ich würde gern nach Berlin reisen.",
                translation="I would like to travel to Berlin.",
            ),
            GrammarExample(
                text="Würdest du mir bitte helfen?", translation="Would you please help me?"
            ),
            GrammarExample(
                text="An deiner Stelle würde ich mehr lernen.",
                translation="If I were you, I would study more.",
            ),
            GrammarExample(
                text="Wir würden gern einen Tisch reservieren.",
                translation="We would like to reserve a table.",
            ),
            GrammarExample(
                text="Was würden Sie tun?", translation="What would you do?", note="formell"
            ),
            GrammarExample(
                text="Ich würde sagen, das ist richtig.", translation="I would say that is correct."
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Ich würde arbeiten, wenn ich würde mehr Zeit haben.",
                correct="Ich würde arbeiten, wenn ich mehr Zeit hätte.",
                note='Im wenn-Satz verwendet man den Konjunktiv II ohne "würde". Nur im Hauptsatz mit würde.',
            ),
            GrammarMistake(
                wrong="Ich würde gern ein Bier haben.",
                correct="Ich hätte gern ein Bier.",
                note='Bei "haben" ist die echte Konjunktiv II-Form ("hätte") natürlicher als "würde haben".',
            ),
        ],
        related=[
            "konjunktiv-ii-haette-waere",
            "konjunktiv-ii-hoeflichkeit",
            "konjunktiv-ii-wunsch",
            "modalverben",
        ],
    ),
    GrammarTopic(
        slug="konjunktiv-ii-haette-waere",
        title="Konjunktiv II: hätte, wäre, könnte",
        level="B1",
        category="Modi",
        summary="The 'real' Konjunktiv II forms — hätte, wäre, and the modal verbs.",
        explanation="""Die **echten Konjunktiv II-Formen** werden bei den wichtigsten Verben verwendet:

sein → ich wäre, du wär(e)st, er wäre, wir wären, ihr wär(e)t, sie wären
haben → ich hätte, du hättest, er hätte, wir hätten, ihr hättet, sie hätten

Modalverben im Konjunktiv II: können → könnte, müssen → müsste, dürfen → dürfte, wollen → wollte, sollen → sollte, mögen → möchte

*Ich **wäre** gern reich.* / ***Hättest** du Zeit für mich?* / *Das **könnte** klappen.* / *Du **solltest** mehr Sport machen.*

⚠️ **sollte** (Konjunktiv II) = Ratschlag vs **sollte** (Präteritum) = Verpflichtung in der Vergangenheit""",
        structure="wäre (sein) · hätte (haben) · könnte (können) · müsste (müssen) · dürfte (dürfen) · sollte (sollen) · wollte (wollen) · möchte (mögen)",
        rules=[
            "Die echten Konjunktiv II-Formen werden für sein, haben und Modalverben verwendet.",
            '"Wäre" = Konjunktiv II von sein, "hätte" = Konjunktiv II von haben.',
            '"Möchte" ist der Konjunktiv II von mögen und bedeutet "would like".',
            '"Sollte" im Konjunktiv II drückt einen Ratschlag oder eine Empfehlung aus.',
            "Für alle anderen Verben: würde + Infinitiv.",
        ],
        examples=[
            GrammarExample(
                text="Ich wäre gern in Urlaub.", translation="I would like to be on vacation."
            ),
            GrammarExample(
                text="Hättest du morgen Zeit?", translation="Would you have time tomorrow?"
            ),
            GrammarExample(
                text="Das könnte schwierig werden.", translation="That could become difficult."
            ),
            GrammarExample(
                text="Du solltest mehr Wasser trinken.",
                translation="You should drink more water.",
                note="Ratschlag",
            ),
            GrammarExample(text="Ich möchte gern bezahlen.", translation="I would like to pay."),
            GrammarExample(
                text="An deiner Stelle wäre ich vorsichtiger.",
                translation="If I were you, I would be more careful.",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Ich würde gern mehr Zeit haben.",
                correct="Ich hätte gern mehr Zeit.",
                note='Bei "haben" ist "hätte" die natürliche und bevorzugte Form.',
            ),
            GrammarMistake(
                wrong="Du solltest mehr lernen. = Du musstest mehr lernen. (falsch!)",
                correct='"Du solltest mehr lernen" = Ratschlag. "Du musstest mehr lernen" = Zwang in der Vergangenheit.',
                note='"Sollte" (Konjunktiv II) ist ein Ratschlag, "musste" (Präteritum) ist ein Zwang.',
            ),
        ],
        related=["konjunktiv-ii-wuerde", "konjunktiv-ii-hoeflichkeit", "modalverben"],
    ),
    GrammarTopic(
        slug="konjunktiv-ii-hoeflichkeit",
        title="Konjunktiv II für Höflichkeit",
        level="B1",
        category="Modi",
        summary="Using Konjunktiv II for polite requests, offers, and softening statements.",
        explanation="""Der **Konjunktiv II** wird sehr häufig für **Höflichkeit** verwendet. Er macht Aussagen weicher und respektvoller.

Direkt vs höflich: Hilf mir! → **Würdest** du mir helfen? / Gib mir das Salz! → **Könnten** Sie mir das Salz geben?

Höfliche Wünsche: *Ich **hätte** gern einen Kaffee.* (statt: Ich will einen Kaffee.)
Erlaubnis: ***Dürfte** ich das Fenster öffnen?* (sehr höflich)
Vorsicht: *Das **könnte** ein Problem sein.* (statt: Das ist ein Problem.)

Im Deutschen wird Höflichkeit nicht nur über *bitte* und *danke* ausgedrückt, sondern vor allem durch den Konjunktiv II.""",
        structure="könnte(n) + Infinitiv · würden + Infinitiv · hätte gern · dürfte + Infinitiv · möchte + Infinitiv",
        rules=[
            '"Könnten Sie..." und "Würden Sie..." sind die häufigsten höflichen Bitten.',
            '"Hätte gern" ist die höfliche Variante von "will".',
            '"Dürfte ich..." ist sehr formell für Erlaubnis.',
            '"Sollte" drückt einen weichen, indirekten Ratschlag aus.',
            '"Möchte" ist immer höflicher als "will".',
        ],
        examples=[
            GrammarExample(
                text="Könnten Sie mir bitte helfen?",
                translation="Could you please help me?",
                note="höfliche Bitte",
            ),
            GrammarExample(
                text="Ich hätte gern ein Glas Wasser.", translation="I would like a glass of water."
            ),
            GrammarExample(
                text="Würdest du bitte das Fenster schließen?",
                translation="Would you please close the window?",
            ),
            GrammarExample(
                text="Dürfte ich kurz stören?",
                translation="May I interrupt briefly?",
                note="sehr formell",
            ),
            GrammarExample(
                text="Das wäre alles, danke.",
                translation="That would be all, thank you.",
                note="in Restaurant/Kaufhaus",
            ),
            GrammarExample(
                text="Könnten Sie das bitte wiederholen?",
                translation="Could you please repeat that?",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Ich will einen Kaffee, bitte.",
                correct="Ich hätte gern einen Kaffee. / Ich möchte gern einen Kaffee.",
                note="Ich will klingt im Deutschen oft unhöflich. Im Restaurant immer hätte gern oder möchte.",
            ),
            GrammarMistake(
                wrong="Kannst du mir bitte helfen?",
                correct="Könntest du mir bitte helfen?",
                note="Der Konjunktiv II macht die Bitte höflicher und indirekter als der Indikativ.",
            ),
        ],
        related=["konjunktiv-ii-wuerde", "konjunktiv-ii-haette-waere", "modalverben", "imperativ"],
    ),
    GrammarTopic(
        slug="konjunktiv-ii-wunsch",
        title="Irreale Wünsche mit Konjunktiv II",
        level="B1",
        category="Modi",
        summary="Unreal wishes with Konjunktiv II — expressing desires that are not (yet) reality.",
        explanation="""**Irreale Wünsche** drücken etwas aus, das nicht der Realität entspricht.

Wenn + Konjunktiv II: *Wenn ich reich **wäre**, würde ich eine Weltreise machen.*
Ich wünschte: *Ich wünschte, ich **hätte** mehr Zeit.*

Wünsche mit **doch** / **nur** verstärken den Wunschcharakter:
***Hätte** ich **doch** besser aufgepasst!* (If only I had paid more attention!)
***Wäre** ich **nur** früher gekommen!* (If only I had come earlier!)

**Irreale Vergleichssätze:** *Er tut so, **als ob** er alles **wüsste**.* / *Sie sieht aus, **als wäre** sie krank.*

Irreale Wünsche für die Gegenwart: Konjunktiv II Präsens (wäre, hätte, würde). Für die Vergangenheit: hätte/wäre + Partizip II.""",
        structure="Wenn + Konjunktiv II, (dann) Konjunktiv II · Hätte/Wäre + Subjekt + doch/nur ...!",
        rules=[
            'Irreale Wünsche verwenden Konjunktiv II, oft mit "wenn".',
            '"Doch" und "nur" verstärken den Wunsch: "Hätte ich doch...!"',
            '"Ich wünschte" ist selbst Konjunktiv II und leitet einen irrealen Wunschsatz ein.',
            '"Als ob" + Konjunktiv II drückt einen irrealen Vergleich aus.',
            "Für Gegenwartswünsche: Konjunktiv II Präsens (wäre, hätte, würde).",
        ],
        examples=[
            GrammarExample(
                text="Wenn ich mehr Zeit hätte, würde ich reisen.",
                translation="If I had more time, I would travel.",
            ),
            GrammarExample(
                text="Ich wünschte, ich könnte fliegen.", translation="I wish I could fly."
            ),
            GrammarExample(
                text="Hätte ich doch auf meine Eltern gehört!",
                translation="If only I had listened to my parents!",
            ),
            GrammarExample(
                text="Wäre es doch schon Sommer!", translation="If only it were already summer!"
            ),
            GrammarExample(
                text="Er tut so, als ob er alles wüsste.",
                translation="He acts as though he knew everything.",
            ),
            GrammarExample(
                text="Wenn ich du wäre, würde ich den Job annehmen.",
                translation="If I were you, I would take the job.",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Wenn ich reich bin, würde ich reisen.",
                correct="Wenn ich reich wäre, würde ich reisen.",
                note="Irreale Bedingung braucht Konjunktiv II, nicht Präsens Indikativ (bin).",
            ),
            GrammarMistake(
                wrong="Ich wünsche, ich habe mehr Zeit.",
                correct="Ich wünschte, ich hätte mehr Zeit.",
                note='Irreale Wünsche brauchen Konjunktiv II. "Wünschte" ist die Konjunktiv II-Form von "wünschen".',
            ),
        ],
        related=["konjunktiv-ii-wuerde", "konjunktiv-ii-haette-waere", "nebensatz-wenn"],
    ),
    GrammarTopic(
        slug="passiv-werden",
        title='Vorgangspassiv mit "werden"',
        level="B1",
        category="Passiv",
        summary="The process passive (Vorgangspassiv) with 'werden' + Partizip II — focusing on the action.",
        explanation="""Das **Vorgangspassiv** beschreibt eine Handlung oder einen Prozess. Der Fokus liegt auf der Aktion, nicht auf dem Handelnden: **werden** (konjugiert) + **Partizip II** (am Satzende).

| Zeit | Aktiv | Vorgangspassiv |
|------|-------|---------------|
| Präsens | Der Bäcker backt das Brot. | Das Brot **wird** gebacken. |
| Präteritum | Der Bäcker backte das Brot. | Das Brot **wurde** gebacken. |
| Perfekt | Der Bäcker hat das Brot gebacken. | Das Brot **ist** gebacken **worden**. |

⚠️ Perfekt Passiv: *ist ... worden* (nicht: geworden!)

**Mit Agens**: *Die Tür wird **von dem Hausmeister** geschlossen.*
**Mit Mittel**: *Die Stadt wurde **durch ein Erdbeben** zerstört.*""",
        structure="werden (konjugiert) + ... + Partizip II / Perfekt: sein + ... + Partizip II + worden",
        rules=[
            "Vorgangspassiv = werden + Partizip II. Es beschreibt eine Handlung/einen Prozess.",
            'Perfekt Passiv: "ist ... gemacht worden" (worden, nicht geworden!).',
            'Der Handelnde kann mit "von + Dativ" (Person) oder "durch + Akkusativ" (Sache/Ursache) genannt werden.',
            'Präteritum Passiv: "wurde gemacht" wird in schriftlichen Texten verwendet.',
            "Das Passiv wird häufiger im Deutschen verwendet als in vielen anderen Sprachen.",
        ],
        examples=[
            GrammarExample(
                text="Das Haus wird gerade gebaut.", translation="The house is being built."
            ),
            GrammarExample(
                text="Mein Fahrrad wurde gestern gestohlen.",
                translation="My bike was stolen yesterday.",
            ),
            GrammarExample(
                text="Die Rechnung ist schon bezahlt worden.",
                translation="The bill has already been paid.",
            ),
            GrammarExample(
                text="Das Museum wird von vielen Touristen besucht.",
                translation="The museum is visited by many tourists.",
                note="mit Agens",
            ),
            GrammarExample(
                text="Die Stadt wurde durch ein Erdbeben zerstört.",
                translation="The city was destroyed by an earthquake.",
                note="mit durch + Ursache",
            ),
            GrammarExample(
                text="Hier wird Deutsch gesprochen.", translation="German is spoken here."
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Das Haus ist gebaut geworden.",
                correct="Das Haus ist gebaut worden.",
                note='Im Perfekt Passiv sagt man "worden", nicht "geworden".',
            ),
            GrammarMistake(
                wrong="Mein Auto ist gestohlen.",
                correct="Mein Auto ist gestohlen worden. / Mein Auto wurde gestohlen.",
                note='"Mein Auto ist gestohlen" beschreibt den Zustand (Zustandspassiv), nicht die Handlung.',
            ),
        ],
        related=["passiv-zustand", "passiv-modalverben", "partizip-ii", "werden-futur"],
    ),
    GrammarTopic(
        slug="passiv-zustand",
        title="Zustandspassiv",
        level="B1",
        category="Passiv",
        summary="The state passive (Zustandspassiv) with 'sein' + Partizip II — describing the result.",
        explanation="""Das **Zustandspassiv** beschreibt das **Ergebnis** einer Handlung (einen Zustand), nicht die Handlung selbst.

| Vorgangspassiv (Prozess) | Zustandspassiv (Resultat) |
|--------------------------|---------------------------|
| Die Tür **wird** geschlossen. | Die Tür **ist** geschlossen. |
| Das Haus **wurde** gebaut. | Das Haus **war** gebaut. |
| Das Essen **wird** gekocht. | Das Essen **ist** gekocht. |

Bildung: **sein** (konjugiert) + **Partizip II** — Das Fenster **ist** geöffnet. / Das Geschäft **war** geschlossen.

⚠️ **Nur transitive Verben** können ein Zustandspassiv bilden (Verben mit Akkusativobjekt). Intransitive Verben: kein Zustandspassiv.""",
        structure="sein (konjugiert) + Partizip II (Ergebniszustand)",
        rules=[
            "Das Zustandspassiv beschreibt das Ergebnis/Resultat einer Handlung.",
            "Sein + Partizip II = Zustandspassiv. Werden + Partizip II = Vorgangspassiv.",
            "Das Zustandspassiv kann von den meisten transitiven Verben gebildet werden.",
            "Intransitive Verben bilden kein Zustandspassiv.",
            "Perfekt Zustandspassiv (ist ... gewesen) ist sehr selten und meist unnatürlich.",
        ],
        examples=[
            GrammarExample(
                text="Die Tür ist geschlossen.",
                translation="The door is closed.",
                note="Zustand jetzt",
            ),
            GrammarExample(
                text="Das Geschäft war gestern geschlossen.",
                translation="The shop was closed yesterday.",
            ),
            GrammarExample(
                text="Die Hausaufgaben sind gemacht.", translation="The homework is done."
            ),
            GrammarExample(
                text="Ist der Tisch schon reserviert?", translation="Is the table already reserved?"
            ),
            GrammarExample(
                text="Alle Probleme sind gelöst.", translation="All problems are solved."
            ),
            GrammarExample(text="Das Auto ist repariert.", translation="The car is repaired."),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Die Tür ist geöffnet. vs Die Tür wird geöffnet. (Verwechslung)",
                correct="Die Tür ist geöffnet. = The door is open (Zustand). Die Tür wird geöffnet. = The door is being opened (Vorgang).",
                note="Beide sind korrekt, haben aber unterschiedliche Bedeutungen.",
            ),
            GrammarMistake(
                wrong="Der Brief ist geschrieben geworden.",
                correct="Der Brief ist geschrieben. / Der Brief wurde geschrieben.",
                note='"Geschrieben geworden" ist falsch.',
            ),
        ],
        related=["passiv-werden", "passiv-modalverben", "partizip-ii", "verb-sein"],
    ),
    GrammarTopic(
        slug="passiv-modalverben",
        title="Passiv mit Modalverben",
        level="B1",
        category="Passiv",
        summary="Passive voice with modal verbs — combining müssen, können, sollen with the passive.",
        explanation="""Das **Passiv mit Modalverben** drückt Notwendigkeit, Möglichkeit oder Erlaubnis im Passiv aus:
**Modalverb** (konjugiert) + **Partizip II** + **werden** (am Satzende)

*Das Auto **muss repariert werden**.*
*Das Problem **kann gelöst werden**.*
*Der Raum **darf nicht betreten werden**.*

| Modalverb | Beispiel |
|-----------|----------|
| müssen | Die Rechnung muss bezahlt werden. |
| können | Der Termin kann verschoben werden. |
| dürfen | Hier darf nicht geraucht werden. |
| sollen | Die Aufgabe soll gemacht werden. |

Im Nebensatz steht das Modalverb am Ende: *..., dass das Auto repariert werden muss.*""",
        structure="Modalverb (konjugiert, Position 2) + ... + Partizip II + werden (Satzende)",
        rules=[
            "Passiv mit Modalverb: Modalverb + Partizip II + werden (am Satzende).",
            '"Werden" bleibt im Infinitiv — es wird nicht konjugiert.',
            "Die Bedeutung folgt dem Modalverb: müssen (Notwendigkeit), können (Möglichkeit), dürfen (Erlaubnis), sollen (Empfehlung).",
            "Im Nebensatz steht das Modalverb am Ende: ..., dass das Auto repariert werden muss.",
            '"Wollen" wird im Passiv mit Modalverb fast nie verwendet.',
        ],
        examples=[
            GrammarExample(
                text="Das Auto muss repariert werden.", translation="The car must be repaired."
            ),
            GrammarExample(
                text="Der Termin kann verschoben werden.",
                translation="The appointment can be postponed.",
            ),
            GrammarExample(
                text="Hier darf nicht geraucht werden.", translation="Smoking is not allowed here."
            ),
            GrammarExample(
                text="Die Rechnung soll bis Freitag bezahlt werden.",
                translation="The bill should be paid by Friday.",
            ),
            GrammarExample(
                text="Ich weiß, dass der Fehler korrigiert werden muss.",
                translation="I know that the mistake must be corrected.",
                note="Nebensatz",
            ),
            GrammarExample(
                text="Die Fenster können nicht geöffnet werden.",
                translation="The windows cannot be opened.",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Das Auto muss repariert wird.",
                correct="Das Auto muss repariert werden.",
                note='Nach dem Modalverb steht "werden" im Infinitiv, nicht konjugiert.',
            ),
            GrammarMistake(
                wrong="Das Auto muss werden repariert.",
                correct="Das Auto muss repariert werden.",
                note="Die Reihenfolge ist fest: Partizip II + werden am Satzende.",
            ),
        ],
        related=["passiv-werden", "passiv-zustand", "modalverben"],
    ),
    GrammarTopic(
        slug="plusquamperfekt",
        title="Das Plusquamperfekt",
        level="B1",
        category="Zeitformen",
        summary="The past perfect — expressing actions that happened before another past action.",
        explanation="""Das **Plusquamperfekt** (past perfect) beschreibt eine Handlung, die **vor einer anderen Handlung in der Vergangenheit** stattfand: **haben/sein im Präteritum** + **Partizip II**

*Nachdem ich gegessen **hatte**, ging ich spazieren.*
*Er **war** schon eingeschlafen, als sie nach Hause kam.*

**Signalwörter:** nachdem, bevor, als

**nachdem + Plusquamperfekt**, Hauptsatz im Präteritum: *Nachdem er gegessen **hatte**, **ging** er schlafen.*""",
        structure="haben/sein im Präteritum + Partizip II (für Vorzeitigkeit in der Vergangenheit)",
        rules=[
            "Das Plusquamperfekt drückt Vorzeitigkeit in der Vergangenheit aus.",
            '"Nachdem" + Plusquamperfekt, Hauptsatz im Präteritum.',
            "Gleiche Hilfsverb-Regeln wie beim Perfekt: die meisten mit haben, Bewegung mit sein.",
            "Das Plusquamperfekt wird fast nur in Nebensätzen oder in Kombination mit Präteritum verwendet.",
            "Im gesprochenen Deutsch wird das Plusquamperfekt oft durch Perfekt ersetzt.",
        ],
        examples=[
            GrammarExample(
                text="Nachdem ich gegessen hatte, ging ich ins Kino.",
                translation="After I had eaten, I went to the cinema.",
            ),
            GrammarExample(
                text="Er war schon gegangen, als ich ankam.",
                translation="He had already left when I arrived.",
            ),
            GrammarExample(
                text="Ich hatte den Film schon gesehen, deshalb bin ich nicht mitgekommen.",
                translation="I had already seen the film.",
            ),
            GrammarExample(
                text="Bevor sie nach Berlin zog, hatte sie in München gewohnt.",
                translation="Before she moved to Berlin, she had lived in Munich.",
            ),
            GrammarExample(
                text="Wir hatten die Tickets schon gekauft, als das Konzert abgesagt wurde.",
                translation="We had already bought the tickets.",
            ),
            GrammarExample(
                text="Nachdem er das Buch gelesen hatte, schrieb er eine Rezension.",
                translation="After he had read the book, he wrote a review.",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Nachdem ich gegessen habe, ging ich ins Kino.",
                correct="Nachdem ich gegessen hatte, ging ich ins Kino.",
                note='Nach "nachdem" steht in der Vergangenheit das Plusquamperfekt, nicht das Perfekt.',
            ),
            GrammarMistake(
                wrong="Ich habe den Film schon gesehen gehabt.",
                correct="Ich hatte den Film schon gesehen.",
                note='Doppelte Hilfsverben ("haben gehabt") sind falsch.',
            ),
        ],
        related=[
            "perfekt-mit-haben",
            "perfekt-mit-sein",
            "praeteritum-sein-haben",
            "temporale-konnektoren",
        ],
    ),
    GrammarTopic(
        slug="temporale-konnektoren",
        title="Temporale Konnektoren",
        level="B1",
        category="Syntax",
        summary="Time connectors — als, wenn, nachdem, bevor, während, seitdem and their word order.",
        explanation="""**Temporale Konnektoren** verbinden Sätze und drücken zeitliche Beziehungen aus:

| Konnektor | Bedeutung | Zeitenfolge |
|-----------|-----------|-------------|
| **als** | when (once, past) | Präteritum |
| **wenn** | when/whenever (repeated, future) | Präsens/Futur |
| **nachdem** | after | + Plusquamperfekt, HS: Präteritum |
| **bevor** | before | gleiche Zeit |
| **während** | while, during | gleiche Zeit (Gleichzeitigkeit) |
| **seitdem** | since (time) | Präsens |
| **bis** | until | gleiche/future Zeit |
| **sobald** | as soon as | gleiche Zeit |

**als vs wenn:** *Als ich ein Kind war...* (einmalig, Vergangenheit) vs *Wenn ich Zeit habe...* (wiederholt/Zukunft)""",
        structure="Temporaler Konnektor + Subjekt + ... + Verb (am Ende), Hauptsatz",
        rules=[
            '"Als" für einmalige Ereignisse in der Vergangenheit.',
            '"Wenn" für wiederholte Ereignisse oder Zukunft.',
            '"Nachdem" + Plusquamperfekt, Hauptsatz im Präteritum.',
            '"Während" drückt Gleichzeitigkeit aus (zwei parallele Handlungen).',
            "Alle temporalen Konnektoren leiten Nebensätze mit Verb am Ende ein.",
        ],
        examples=[
            GrammarExample(
                text="Als ich ein Kind war, wohnte ich in Köln.",
                translation="When I was a child, I lived in Cologne.",
                note="einmalig, Vergangenheit",
            ),
            GrammarExample(
                text="Wenn ich nach Berlin komme, besuche ich dich.",
                translation="When(ever) I come to Berlin, I visit you.",
                note="wiederholt/Zukunft",
            ),
            GrammarExample(
                text="Nachdem sie gefrühstückt hatte, ging sie zur Arbeit.",
                translation="After she had breakfast, she went to work.",
            ),
            GrammarExample(
                text="Bevor du gehst, mach bitte das Fenster zu.",
                translation="Before you leave, please close the window.",
            ),
            GrammarExample(
                text="Während ich koche, kannst du den Tisch decken.",
                translation="While I cook, you can set the table.",
            ),
            GrammarExample(
                text="Seitdem er in Berlin wohnt, ist er glücklicher.",
                translation="Since he has been living in Berlin, he is happier.",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Als ich nach Hause komme, koche ich.",
                correct="Wenn ich nach Hause komme, koche ich.",
                note='"Als" nur für Vergangenheit. Gegenwart/Zukunft: "wenn".',
            ),
            GrammarMistake(
                wrong="Nachdem ich esse, sehe ich fern.",
                correct="Nachdem ich gegessen habe, sehe ich fern.",
                note='"Nachdem" drückt Vorzeitigkeit aus → Perfekt/Plusquamperfekt.',
            ),
        ],
        related=["nebensatz-wenn", "wortstellung-nebensatz", "plusquamperfekt", "nebensatz-weil"],
    ),
    GrammarTopic(
        slug="infinitiv-mit-zu",
        title='Infinitiv mit "zu"',
        level="B1",
        category="Verben",
        summary="Infinitive clauses with 'zu' — when and how to use zu + Infinitiv.",
        explanation="""Der **Infinitiv mit zu** wird in Infinitivsätzen verwendet: *Ich habe vor, morgen nach Berlin **zu fahren**.*

**Nach bestimmten Verben**: anfangen, aufhören, versuchen, vergessen, hoffen, planen, vorhaben, empfehlen, bitten, erlauben — *Ich habe versucht, dich anzurufen.*

**Nach Adjektiven + sein**: *Es ist wichtig, genug **zu schlafen**.* / *Es ist schwer, Deutsch **zu lernen**.*

**Mit um/ohne/statt**: *Ich lerne, **um** die Prüfung **zu bestehen**.* (Zweck) / *Er ging, **ohne** sich **zu verabschieden**.* / *Statt zu arbeiten, sah er fern.*

**Trennbarkeit**: Bei trennbaren Verben steht **zu** zwischen Präfix und Stamm: *aufzustehen, zuzumachen, kennenzulernen*

**Kein zu bei**: Modalverben, werden (Futur), lassen""",
        structure="Hauptsatz, ... zu + Infinitiv (am Ende) / Trennbare Verben: Präfix + zu + Stamm",
        rules=[
            '"Zu" steht vor dem Infinitiv, außer bei trennbaren Verben (dazwischen).',
            'Kein "zu" nach Modalverben, "werden" (Futur) und "lassen".',
            'Bei zweiteiligen Infinitiv-Konstruktionen: "zu machen", "aufzustehen".',
            "Infinitivsätze werden mit Komma abgetrennt.",
            '"Um ... zu" drückt einen Zweck aus, "ohne ... zu" das Fehlen einer Handlung.',
        ],
        examples=[
            GrammarExample(
                text="Ich versuche, mehr zu schlafen.", translation="I try to sleep more."
            ),
            GrammarExample(
                text="Es ist wichtig, jeden Tag zu üben.",
                translation="It is important to practice every day.",
            ),
            GrammarExample(
                text="Er hat vergessen, die Tür zuzumachen.",
                translation="He forgot to close the door.",
                note="trennbar: zuzumachen",
            ),
            GrammarExample(
                text="Ich hoffe, dich bald wiederzusehen.",
                translation="I hope to see you again soon.",
            ),
            GrammarExample(
                text="Sie bat mich, das Fenster zu öffnen.",
                translation="She asked me to open the window.",
            ),
            GrammarExample(
                text="Es freut mich, dich kennenzulernen.",
                translation="I'm pleased to meet you.",
                note="trennbar: kennenzulernen",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Ich muss zu gehen.",
                correct="Ich muss gehen.",
                note='Nach Modalverben steht der Infinitiv ohne "zu".',
            ),
            GrammarMistake(
                wrong="Ich versuche, aufzustehen um 7 Uhr.",
                correct="Ich versuche, um 7 Uhr aufzustehen.",
                note="Der Infinitiv mit zu steht am Satzende.",
            ),
        ],
        related=["final-um-zu", "modalverben", "trennbare-verben", "wortstellung-nebensatz"],
    ),
    GrammarTopic(
        slug="final-um-zu",
        title='Finalsätze mit "um ... zu" und "damit"',
        level="B1",
        category="Syntax",
        summary="Final clauses — expressing purpose with um ... zu (same subject) and damit (different subject).",
        explanation="""**Finalsätze** drücken einen Zweck oder ein Ziel aus.

**um ... zu + Infinitiv** (gleiches Subjekt): *Ich lerne Deutsch, **um** in Berlin **zu studieren**.* (Ich lerne. Ich studiere.)

**damit + Nebensatz** (verschiedene Subjekte): *Ich erkläre es dir, **damit** du es verstehst.* (Ich erkläre. Du verstehst.)

| Gleiches Subjekt | Verschiedene Subjekte |
|-----------------|----------------------|
| Er spart, um ein Auto zu kaufen. | Er spart, damit seine Kinder studieren können. |
| Ich mache Sport, um fit zu bleiben. | Ich mache Sport, damit mein Arzt zufrieden ist. |""",
        structure="Gleiches Subjekt: um + ... + zu + Infinitiv / Verschiedene Subjekte: damit + Subjekt + ... + Verb (am Ende)",
        rules=[
            '"Um ... zu" bei gleichem Subjekt in Haupt- und Nebensatz.',
            '"Damit" bei verschiedenen Subjekten.',
            'Bei "um ... zu" steht die gesamte Infinitivgruppe am Satzende.',
            'Mit "damit" steht das konjugierte Verb am Ende (Nebensatz).',
            '"Um ... zu" kann nicht mit Modalverben kombiniert werden, "damit" schon.',
        ],
        examples=[
            GrammarExample(
                text="Ich lerne Deutsch, um in Berlin zu arbeiten.",
                translation="I learn German to work in Berlin.",
                note="gleiches Subjekt",
            ),
            GrammarExample(
                text="Er spart Geld, damit seine Kinder studieren können.",
                translation="He saves money so that his children can study.",
                note="verschiedene Subjekte",
            ),
            GrammarExample(
                text="Sie macht Sport, um fit zu bleiben.",
                translation="She does sports to stay fit.",
            ),
            GrammarExample(
                text="Ich schreibe es auf, damit du es nicht vergisst.",
                translation="I write it down so that you don't forget it.",
            ),
            GrammarExample(
                text="Wir fahren früher los, um den Stau zu vermeiden.",
                translation="We leave earlier to avoid the traffic jam.",
            ),
            GrammarExample(
                text="Er erklärt alles langsam, damit alle ihn verstehen.",
                translation="He explains everything slowly so that everyone understands him.",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Ich lerne Deutsch, damit in Berlin zu arbeiten.",
                correct="Ich lerne Deutsch, um in Berlin zu arbeiten.",
                note='Gleiches Subjekt → "um ... zu". "Damit" braucht ein Subjekt im Nebensatz.',
            ),
            GrammarMistake(
                wrong="Ich erkläre es dir, um du zu verstehen.",
                correct="Ich erkläre es dir, damit du es verstehst.",
                note='Verschiedene Subjekte → "damit". "Um ... zu" funktioniert nur bei gleichem Subjekt.',
            ),
        ],
        related=["infinitiv-mit-zu", "nebensatz-dass", "wortstellung-nebensatz", "final-um-zu"],
    ),
    GrammarTopic(
        slug="genitiv",
        title="Der Genitiv",
        level="B1",
        category="Kasus",
        summary="The genitive case — expressing possession and relationships between nouns.",
        explanation="""Der **Genitiv** drückt Besitz oder Zugehörigkeit aus (the X of the Y).

| Genus | Bestimmt | Unbestimmt |
|-------|----------|------------|
| maskulin | **des** + Nomen + **-s** | **eines** + Nomen + **-s** |
| feminin | **der** | **einer** |
| neutral | **des** + Nomen + **-s** | **eines** + Nomen + **-s** |
| Plural | **der** | — |

*Das Auto **des Mannes** ist neu.* / *Die Tasche **meiner Frau** ist teuer.*

Im gesprochenen Deutsch wird der Genitiv zunehmend durch **von + Dativ** ersetzt: *Das Auto **von meinem Vater**.*

Einsilbige Nomen bekommen oft **-es**: *des Mann**es**, des Jahr**es***. Mehrsilbige Nomen bekommen meist **-s**: *des Lehrer**s**.*""",
        structure="des/eines + Nomen (m/n) + -(e)s · der/einer + Nomen (f) · der + Nomen (Pl.)",
        rules=[
            "Der Genitiv drückt Besitz oder Zugehörigkeit aus und steht oft zwischen zwei Nomen.",
            "Maskuline und neutrale Nomen bekommen im Genitiv ein -(e)s: des Mannes, des Kindes.",
            "Feminine Nomen und Plural bleiben im Genitiv unverändert.",
            'In der gesprochenen Sprache wird der Genitiv oft durch "von + Dativ" ersetzt.',
            'Nach den Präpositionen "wegen", "trotz", "während", "statt" steht Genitiv.',
        ],
        examples=[
            GrammarExample(
                text="Das Auto meines Bruders ist kaputt.",
                translation="My brother's car is broken.",
            ),
            GrammarExample(
                text="Die Farbe des Himmels ist blau.", translation="The color of the sky is blue."
            ),
            GrammarExample(
                text="Wegen des Regens bleiben wir zu Hause.",
                translation="Because of the rain we are staying at home.",
            ),
            GrammarExample(
                text="Die Hauptstadt Deutschlands ist Berlin.",
                translation="The capital of Germany is Berlin.",
                note="Genitiv mit -(e)s",
            ),
            GrammarExample(
                text="Das Fahrrad der Nachbarin wurde gestohlen.",
                translation="The neighbor's bike was stolen.",
                note="feminin Genitiv",
            ),
            GrammarExample(
                text="Trotz der Kälte gingen wir spazieren.",
                translation="Despite the cold we went for a walk.",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Das Auto von meines Bruders.",
                correct="Das Auto meines Bruders.",
                note='Keine Mischung: entweder Genitiv ("meines Bruders") oder Dativ mit "von" ("von meinem Bruder").',
            ),
            GrammarMistake(
                wrong="Wegen dem Regen bleiben wir zu Hause.",
                correct="Wegen des Regens bleiben wir zu Hause.",
                note='"Wegen" verlangt Genitiv.',
            ),
        ],
        related=["genitiv-praepositionen", "dativ-basic", "akkusativ"],
    ),
    GrammarTopic(
        slug="genitiv-praepositionen",
        title="Präpositionen mit Genitiv",
        level="B1",
        category="Präpositionen",
        summary="Prepositions that govern the genitive case — wegen, trotz, während, statt, innerhalb, außerhalb.",
        explanation="""Einige Präpositionen verlangen den **Genitiv**: **wegen** (because of), **trotz** (despite), **während** (during), **statt** (instead of), **innerhalb** (within), **außerhalb** (outside), **aufgrund** (due to), **mithilfe** (with the help of), **bezüglich** (regarding)

*Wegen **des** Wetters fällt das Fest aus.* / *Trotz **der** Kälte gingen sie schwimmen.* / *Während **des** Films bitte nicht sprechen.*

In der gesprochenen Sprache wird oft **Dativ** statt Genitiv verwendet: *Wegen dem Wetter* (umgangssprachlich) vs *Wegen des Wetters* (standardsprachlich). In formellen Kontexten und schriftlichen Arbeiten ist der Genitiv Pflicht.

**wegen + Personalpronomen**: *wegen mir / deinetwegen / seinetwegen / unseretwegen*""",
        structure="Präposition + Genitiv (des/der/eines/einer + Nomen)",
        rules=[
            '"Wegen", "trotz", "während", "statt", "aufgrund" verlangen standardsprachlich den Genitiv.',
            "Umgangssprachlich wird oft Dativ verwendet, in formellen Texten ist das inkorrekt.",
            'Maskuline und neutrale Nomen bekommen Genitiv-s: "während des Tages".',
            "Personalpronomen mit Genitiv: meinetwegen, deinetwegen, seinetwegen...",
            '"Wegen" kann ausnahmsweise mit Dativ stehen, wenn der Genitiv nicht erkennbar ist.',
        ],
        examples=[
            GrammarExample(
                text="Wegen des Wetters fällt das Fest aus.",
                translation="Because of the weather the party is cancelled.",
            ),
            GrammarExample(
                text="Trotz der Kälte gingen sie schwimmen.",
                translation="Despite the cold, they went swimming.",
            ),
            GrammarExample(
                text="Während des Films bitte nicht sprechen.",
                translation="Please do not talk during the film.",
            ),
            GrammarExample(
                text="Statt eines Autos kaufte er ein Fahrrad.",
                translation="Instead of a car, he bought a bicycle.",
            ),
            GrammarExample(
                text="Innerhalb eines Jahres hat sie Deutsch gelernt.",
                translation="Within a year she learned German.",
            ),
            GrammarExample(
                text="Aufgrund der hohen Nachfrage ist das Produkt ausverkauft.",
                translation="Due to high demand, the product is sold out.",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Wegen dem Stau kam ich zu spät.",
                correct="Wegen des Staus kam ich zu spät.",
                note="Standardsprachlich: Genitiv nach wegen.",
            ),
            GrammarMistake(
                wrong="Trotz das Wetter gingen wir raus.",
                correct="Trotz des Wetters gingen wir raus.",
                note='"Trotz" verlangt Genitiv.',
            ),
        ],
        related=["genitiv", "dativ-basic"],
    ),
    GrammarTopic(
        slug="konjunktiv-i",
        title="Konjunktiv I",
        level="B1",
        category="Modi",
        summary="The Konjunktiv I — forms and primary use for reported speech in formal German.",
        explanation="""Der **Konjunktiv I** wird hauptsächlich für **indirekte Rede** in formellen Kontexten verwendet.

Infinitivstamm + Endungen: ich mache, du machest, er/sie/es mache, wir machen, ihr machet, sie/Sie machen

Bei **sein** sind alle Formen unregelmäßig: ich sei, du seiest, er sei, wir seien, ihr seiet, sie seien.

Wenn die Form mit dem Indikativ identisch ist (z.B. *wir machen*), wird **Konjunktiv II** oder **würde + Infinitiv** als Ersatz verwendet:
*Er sagt, sie **machten** gute Arbeit.* (Konjunktiv II) / *Er sagt, sie **würden** gute Arbeit **machen**.* (würde-Ersatz)""",
        structure="Infinitivstamm + -e, -est, -e, -en, -et, -en",
        rules=[
            "Der Konjunktiv I wird vom Infinitivstamm abgeleitet, ohne Vokalwechsel.",
            "Die 1. und 3. Person Singular sind identisch (ich mache / er mache).",
            '"Sein" ist der einzige völlig unregelmäßige Konjunktiv I: ich sei, du seiest, er sei.',
            'Wenn Konjunktiv I = Indikativ, verwendet man Konjunktiv II oder "würde" als Ersatz.',
            "Konjunktiv I wird fast ausschließlich in der indirekten Rede verwendet.",
        ],
        examples=[
            GrammarExample(
                text="Er sagte, er sei krank.",
                translation="He said he was sick.",
                note="Konjunktiv I von sein",
            ),
            GrammarExample(
                text="Sie behauptet, sie habe nichts gewusst.",
                translation="She claims she knew nothing.",
                note="Konjunktiv I von haben",
            ),
            GrammarExample(
                text="Der Politiker erklärte, die Lage sei stabil.",
                translation="The politician explained the situation was stable.",
            ),
            GrammarExample(text="Man sagt, er lese viel.", translation="They say he reads a lot."),
            GrammarExample(
                text="Der Arzt sagte, ich solle mehr Sport machen.",
                translation="The doctor said I should do more sport.",
            ),
            GrammarExample(
                text="Sie meint, das Wetter werde besser.",
                translation="She thinks the weather will get better.",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Er sagt, er ist krank.",
                correct="Er sagt, er sei krank.",
                note='In formeller indirekter Rede muss Konjunktiv I verwendet werden: "sei", nicht "ist".',
            ),
            GrammarMistake(
                wrong="Sie sagte, sie machet das.",
                correct="Sie sagte, sie mache das.",
                note="Die 3. Person Singular Konjunktiv I endet auf -e, nicht auf -et.",
            ),
        ],
        related=["indirekte-rede", "konjunktiv-ii-wuerde"],
    ),
    GrammarTopic(
        slug="indirekte-rede",
        title="Indirekte Rede",
        level="B1",
        category="Modi",
        summary="Reported speech — transforming direct speech into indirect speech with Konjunktiv I.",
        explanation="""Die **indirekte Rede** gibt wieder, was eine andere Person gesagt hat, ohne wörtlich zu zitieren.

Aussagesätze → dass-Satz oder uneingeleiteter Nebensatz: *Er sagte, dass er krank sei. / Er sagte, er sei krank.*
Ja/Nein-Fragen → ob: *Sie fragte, ob ich Zeit hätte.*
W-Fragen → Fragewort: *Er wollte wissen, wo ich wohne.*
Aufforderungen → sollen/mögen + Infinitiv: *Er forderte mich auf, ich solle leise sein.*

In der gesprochenen Sprache wird die indirekte Rede meist mit Indikativ verwendet: *Er sagte, er ist krank.*""",
        structure="Einleitungssatz + dass/ob/Fragewort + Subjekt + ... + Konjunktiv I (am Ende)",
        rules=[
            "In formeller indirekter Rede steht das Verb im Konjunktiv I.",
            "Aussagesätze: dass oder uneingeleiteter Nebensatz.",
            "Ja/Nein-Fragen: ob. W-Fragen: Fragewort.",
            'Aufforderungen werden mit "sollen"/"mögen" im Konjunktiv I wiedergegeben.',
            "Falls Konjunktiv I = Indikativ, Ersatz durch Konjunktiv II.",
        ],
        examples=[
            GrammarExample(text="Er sagt, er sei müde.", translation="He says he is tired."),
            GrammarExample(
                text="Sie fragte, ob ich kommen könne.",
                translation="She asked whether I could come.",
            ),
            GrammarExample(
                text="Der Chef meinte, wir sollten mehr arbeiten.",
                translation="The boss thought we should work more.",
                note="sollen als Ersatzform",
            ),
            GrammarExample(
                text="Er wollte wissen, wo ich wohne.",
                translation="He wanted to know where I lived.",
            ),
            GrammarExample(
                text="Sie behauptet, sie habe ihn nicht gesehen.",
                translation="She claims she didn't see him.",
            ),
            GrammarExample(
                text="Der Arzt riet ihm, er solle mit dem Rauchen aufhören.",
                translation="The doctor advised him to stop smoking.",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Er sagte, dass er ist krank.",
                correct="Er sagte, dass er krank sei.",
                note="In der formellen indirekten Rede: Konjunktiv I und Verb am Ende im dass-Satz.",
            ),
            GrammarMistake(
                wrong="Sie fragte, ob er kommt.",
                correct="Sie fragte, ob er komme.",
                note="In der geschriebenen, formellen indirekten Rede sollte Konjunktiv I verwendet werden.",
            ),
        ],
        related=["konjunktiv-i", "nebensatz-dass", "indirekte-fragen"],
    ),
    GrammarTopic(
        slug="zweiteilige-konnektoren",
        title="Zweiteilige Konnektoren",
        level="B1",
        category="Syntax",
        summary="Two-part connectors — sowohl...als auch, entweder...oder, zwar...aber, weder...noch.",
        explanation="""**Zweiteilige Konnektoren** verbinden zwei Elemente und bestehen aus zwei Teilen:

**sowohl ... als auch** (both ... and): *Er spricht sowohl Deutsch **als auch** Englisch.*
**entweder ... oder** (either ... or): *Du kannst entweder mitkommen **oder** hierbleiben.*
**weder ... noch** (neither ... nor): *Ich habe weder Zeit **noch** Geld.*
**zwar ... aber** (indeed ... but): *Er ist zwar jung, **aber** sehr erfahren.*
**nicht nur ..., sondern auch** (not only ... but also): *Sie ist **nicht nur** intelligent, **sondern** auch sehr nett.*
**je ..., desto/umso** (the more ..., the more): ***Je** mehr ich lerne, **desto** besser verstehe ich.*""",
        structure="sowohl + A + als auch + B · entweder + A + oder + B · weder + A + noch + B · zwar + A + aber + B",
        rules=[
            '"Sowohl ... als auch" verbindet zwei positive Elemente.',
            '"Entweder ... oder" drückt eine Alternative aus (nur eine Option).',
            '"Weder ... noch" verneint beide Elemente.',
            '"Zwar ... aber" drückt eine Einschränkung oder einen Gegensatz aus.',
            'Bei Satzverbindung mit "entweder ... oder" behält jeder Teil seine normale Satzstellung.',
        ],
        examples=[
            GrammarExample(
                text="Er spricht sowohl Deutsch als auch Französisch.",
                translation="He speaks both German and French.",
            ),
            GrammarExample(
                text="Du kannst entweder mit dem Bus oder mit der Bahn fahren.",
                translation="You can go either by bus or by train.",
            ),
            GrammarExample(
                text="Ich trinke weder Kaffee noch Alkohol.",
                translation="I drink neither coffee nor alcohol.",
            ),
            GrammarExample(
                text="Sie ist zwar klein, aber sehr stark.",
                translation="She is small, but very strong.",
            ),
            GrammarExample(
                text="Das Konzert war nicht nur laut, sondern auch unglaublich gut.",
                translation="The concert was not only loud but also incredibly good.",
            ),
            GrammarExample(
                text="Je mehr ich lerne, desto sicherer werde ich.",
                translation="The more I learn, the more confident I become.",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Ich mag sowohl Hunde und Katzen.",
                correct="Ich mag sowohl Hunde als auch Katzen.",
                note='Der zweite Teil von "sowohl" ist immer "als auch", nicht "und".',
            ),
            GrammarMistake(
                wrong="Weder habe ich Zeit noch Geld.",
                correct="Ich habe weder Zeit noch Geld.",
                note='"Weder ... noch" sollte parallele Satzglieder verbinden, nicht das Verb spalten.',
            ),
        ],
        related=["nebensatz-dass", "nebensatz-obwohl"],
    ),
    GrammarTopic(
        slug="brauchen-zu",
        title='"brauchen + zu"',
        level="B1",
        category="Verben",
        summary="The special construction 'nicht brauchen zu' — expressing don't need to.",
        explanation="""Das Verb **brauchen** hat eine besondere Verwendung mit **zu + Infinitiv** in der Verneinung:

*Du **brauchst nicht zu** kommen.* = You don't need to come.
*Ihr **braucht** das nicht **zu** machen.* = You don't need to do that.

**brauchen vs müssen vs dürfen:**
Du **musst** nicht kommen. = Keine Verpflichtung (don't have to)
Du **brauchst** nicht **zu** kommen. = Keine Notwendigkeit (don't need to)
Du **darfst** nicht kommen. = Verbot (must not)

Mit **nur** ist es auch möglich: *Du brauchst **nur** anzurufen.* (You only need to call.)

Ohne Verneinung oder *nur* funktioniert die Konstruktion standardsprachlich nicht: *Du brauchst zu kommen.* ❌""",
        structure="nicht/nur + brauchen + ... + zu + Infinitiv (am Satzende)",
        rules=[
            '"Brauchen + zu + Infinitiv" wird fast ausschließlich verneint oder mit "nur" verwendet.',
            '"Nicht brauchen + zu" = keine Notwendigkeit.',
            '"Nicht müssen" = keine Verpflichtung. "Nicht dürfen" = Verbot.',
            'Ohne Negation oder "nur" funktioniert die Konstruktion nicht.',
            '"Brauchen" wird in dieser Konstruktion wie ein Modalverb verwendet.',
        ],
        examples=[
            GrammarExample(
                text="Du brauchst heute nicht zu arbeiten.",
                translation="You don't need to work today.",
            ),
            GrammarExample(
                text="Ihr braucht keine Angst zu haben.", translation="You don't need to be afraid."
            ),
            GrammarExample(
                text="Er braucht nicht mitzukommen.",
                translation="He doesn't need to come along.",
                note="trennbar: mitzukommen",
            ),
            GrammarExample(
                text="Sie brauchen nur den Knopf zu drücken.",
                translation="You only need to press the button.",
            ),
            GrammarExample(
                text="Das brauchst du nicht zu verstehen.",
                translation="You don't need to understand that.",
            ),
            GrammarExample(
                text="Wir brauchen uns nicht zu beeilen.", translation="We don't need to hurry."
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Du brauchst zu kommen.",
                correct="Du musst kommen. / Du brauchst nicht zu kommen.",
                note='Ohne Verneinung oder "nur" ist "brauchen + zu" nicht standardsprachlich.',
            ),
            GrammarMistake(
                wrong="Du brauchst nicht das machen.",
                correct="Du brauchst das nicht zu machen.",
                note='Nach "brauchen" steht "zu" + Infinitiv. "Zu" nicht vergessen.',
            ),
        ],
        related=["modalverben", "infinitiv-mit-zu", "verneinung", "lassen"],
    ),
    GrammarTopic(
        slug="lassen",
        title='Das Verb "lassen"',
        level="B1",
        category="Verben",
        summary="The verb 'lassen' — its three meanings: to let, to have something done, and to leave.",
        explanation="""Das Verb **lassen** ist sehr vielseitig:

1. Lassen = to let, to allow: *Meine Eltern **lassen** mich ins Kino gehen.*
2. Lassen = to have something done: *Ich **lasse** mein Auto reparieren.*
3. Lassen = to leave: *Ich habe mein Handy zu Hause **gelassen**.* / *Lass die Tür offen!*

Konjugation Präsens: ich lasse, du lässt, er/es/sie lässt, wir lassen, ihr lasst, sie/Sie lassen

Wie Modalverben kann **lassen** mit einem zweiten Infinitiv ohne **zu** stehen.

**Passiversatz: sich lassen + Infinitiv** = kann gemacht werden:
*Das Problem **lässt sich** lösen.* = Das Problem kann gelöst werden.
*Das Fenster **lässt sich** nicht öffnen.* = Das Fenster kann nicht geöffnet werden.

Im Perfekt mit Doppelinfinitiv: *Er hat sein Auto reparieren lassen.* (nicht: gelassen)""",
        structure="lassen + Infinitiv (ohne zu) · sich lassen + Infinitiv (Passiversatz)",
        rules=[
            'Lassen + Infinitiv ohne "zu" (wie Modalverben).',
            "Drei Hauptbedeutungen: erlauben, veranlassen, zurücklassen.",
            '"Sich lassen" + Infinitiv = Passiversatz: "Das lässt sich machen."',
            'Im Perfekt: "Er hat sein Auto reparieren lassen." (Doppelinfinitiv).',
            "Trennbare Verben werden mit lassen nicht getrennt.",
        ],
        examples=[
            GrammarExample(
                text="Meine Eltern lassen mich lange aufbleiben.",
                translation="My parents let me stay up late.",
            ),
            GrammarExample(
                text="Ich lasse mein Auto reparieren.",
                translation="I am having my car repaired.",
                note="Veranlassung",
            ),
            GrammarExample(text="Lass mich in Ruhe!", translation="Leave me alone!"),
            GrammarExample(
                text="Das Problem lässt sich leicht lösen.",
                translation="The problem can be easily solved.",
                note="Passiversatz",
            ),
            GrammarExample(
                text="Hast du deine Tasche im Zug gelassen?",
                translation="Did you leave your bag on the train?",
            ),
            GrammarExample(
                text="Er hat sich einen neuen Anzug machen lassen.",
                translation="He had a new suit made.",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Ich lasse mein Auto zu reparieren.",
                correct="Ich lasse mein Auto reparieren.",
                note='Nach "lassen" steht der Infinitiv ohne "zu" (wie bei Modalverben).',
            ),
            GrammarMistake(
                wrong="Er hat sein Auto reparieren gelassen.",
                correct="Er hat sein Auto reparieren lassen.",
                note="Im Perfekt mit zweitem Infinitiv: lassen bleibt im Infinitiv (Doppelinfinitiv).",
            ),
        ],
        related=["modalverben", "infinitiv-mit-zu", "brauchen-zu"],
    ),
    GrammarTopic(
        slug="artikel-deklination",
        title="Artikeldeklination",
        level="B1",
        category="Artikel",
        summary="Complete article declension table — all articles in all cases.",
        explanation="""Komplette Artikeldeklination für alle Fälle:

**Bestimmter Artikel:** der/die/das (Nom.) → den/die/das (Akk.) → dem/der/dem/den+n (Dat.) → des+s/der/des+s/der (Gen.)

**Unbestimmter Artikel:** ein/eine/ein → einen/eine/ein → einem/einer/einem → eines+s/einer/eines+s

**Negativartikel (kein) und Possessivartikel (mein):** folgen dem Muster des unbestimmten Artikels, haben aber auch Plural.

Dativ Plural: Artikel endet auf -en und das Nomen bekommt -n (wenn nicht schon vorhanden): *mit den Kindern, mit meinen Freunden*.
Genitiv maskulin/neutral: Nomen bekommt -(e)s: *des Lehrers, meines Autos*.""",
        structure="Vollständige Artikeltabelle für bestimmte, unbestimmte, negative und Possessivartikel",
        rules=[
            "Dativ Plural: Artikel endet auf -en und das Nomen bekommt -n (wenn nicht schon vorhanden).",
            "Genitiv maskulin und neutral: Artikel + Nomen mit -(e)s.",
            'Der unbestimmte Artikel "ein" hat keinen Plural.',
            "Possessivartikel folgen dem Muster des unbestimmten Artikels.",
            'In der Umgangssprache wird Genitiv oft durch Dativ mit "von" ersetzt.',
        ],
        examples=[
            GrammarExample(
                text="Ich gebe dem Mann den Schlüssel.",
                translation="I give the man the key.",
                note="Dat. + Akk.",
            ),
            GrammarExample(
                text="Das Auto meines Vaters ist neu.",
                translation="My father's car is new.",
                note="Genitiv + -s",
            ),
            GrammarExample(
                text="Ich habe keinen Hunger und keine Zeit.",
                translation="I am not hungry and have no time.",
                note="Negativartikel Akk.",
            ),
            GrammarExample(
                text="Sie spricht mit ihren Kindern.",
                translation="She speaks with her children.",
                note="Possessiv Dativ Plural + -n",
            ),
            GrammarExample(
                text="Wegen eines Unfalls kam es zu Verspätungen.",
                translation="Due to an accident there were delays.",
                note="Genitiv + -s",
            ),
            GrammarExample(
                text="Zu Beginn des Jahres fahren wir in Urlaub.",
                translation="At the beginning of the year we go on vacation.",
                note="Genitiv",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Das Buch des Lehrer ist langweilig.",
                correct="Das Buch des Lehrers ist langweilig.",
                note='Genitiv maskulin braucht -(e)s am Nomen: "des Lehrers".',
            ),
            GrammarMistake(
                wrong="Ich fahre mit meiner Freunden.",
                correct="Ich fahre mit meinen Freunden.",
                note='Dativ Plural: "meinen" + Nomen mit -n (Freunden).',
            ),
        ],
        related=[
            "bestimmte-artikel",
            "unbestimmte-artikel",
            "genus",
            "genitiv",
            "dativ-basic",
            "akkusativ",
        ],
    ),
    GrammarTopic(
        slug="reflexivverben",
        title="Reflexive Verben",
        level="B1",
        category="Verben",
        summary="Reflexive verbs — sich freuen, sich ärgern, sich interessieren and their accusative/dative pronouns.",
        explanation="""**Reflexive Verben** werden mit einem Reflexivpronomen verwendet, das sich auf das Subjekt zurückbezieht.

Reflexivpronomen: mich/mir, dich/dir, sich/sich, uns/uns, euch/euch, sich/sich

Akkusativ: sich freuen, sich ärgern, sich interessieren, sich erinnern, sich setzen, sich fühlen, sich beeilen — *Ich freue **mich**.*
Dativ: sich etwas anziehen, sich etwas waschen, sich etwas vorstellen, sich etwas merken, sich etwas kaufen — *Ich wasche **mir** die Hände.*

**Echte reflexive Verben**: existieren NUR reflexiv (sich beeilen, sich erholen, sich verabschieden). Man kann nicht sagen: *Ich beeile.* ❌
**Unechte reflexive Verben**: können reflexiv oder nicht reflexiv sein: *Ich wasche **mich**. / Ich wasche **das Auto**.*""",
        structure="sich + Verb (Reflexivpronomen im Akk. oder Dat. + Verb)",
        rules=[
            "Die Reflexivpronomen richten sich nach dem Subjekt: ich → mich/mir, du → dich/dir, er → sich...",
            "Die meisten reflexiven Verben verwenden Akkusativ (mich, dich, sich...).",
            "Reflexive Verben mit Dativ (mir, dir, sich...) haben ein zusätzliches Akkusativobjekt.",
            "Echte reflexive Verben existieren nur reflexiv (sich beeilen, sich erholen).",
            "Im Nebensatz steht das Reflexivpronomen direkt nach der Subjunktion.",
        ],
        examples=[
            GrammarExample(
                text="Ich freue mich auf den Urlaub.",
                translation="I'm looking forward to the vacation.",
            ),
            GrammarExample(
                text="Er interessiert sich für Geschichte.",
                translation="He is interested in history.",
            ),
            GrammarExample(
                text="Ich wasche mir die Hände.",
                translation="I wash my hands.",
                note="Dativ: wem? → mir",
            ),
            GrammarExample(
                text="Kannst du dir das vorstellen?",
                translation="Can you imagine that?",
                note="Dativ",
            ),
            GrammarExample(
                text="Wir haben uns gestern im Park getroffen.",
                translation="We met yesterday in the park.",
                note="Perfekt",
            ),
            GrammarExample(
                text="Beeil dich! Der Bus kommt gleich.",
                translation="Hurry up! The bus is coming soon.",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Ich wasche mich die Hände.",
                correct="Ich wasche mir die Hände.",
                note='Wenn es ein direktes Objekt gibt (die Hände), steht das Reflexivpronomen im Dativ: "mir".',
            ),
            GrammarMistake(
                wrong="Er freut über das Geschenk.",
                correct="Er freut sich über das Geschenk.",
                note='"Sich freuen" ist ein reflexives Verb — das Reflexivpronomen "sich" ist obligatorisch.',
            ),
        ],
        related=["personalpronomen-akk-dat", "akkusativ", "dativ-objekt", "lassen"],
    ),
]
