"""German grammar topics — C1."""

from app.data._types import GrammarExample, GrammarMistake, GrammarTopic

C1_GRAMMAR_TOPICS: list[GrammarTopic] = [
    GrammarTopic(
        slug="modalverben-subjektiv",
        title="Subjektive Modalverben",
        level="C1",
        category="Verben",
        summary="Subjektive Modalverben auf fortgeschrittenem Niveau – Hörensagen, Wahrscheinlichkeit und epistemische Modalität.",
        explanation="""Auf C1-Niveau werden subjektive Modalverben in ihrer ganzen Tiefe behandelt. Gewissheitsgrade: müssen ≈95%, dürfte ≈75%, können ≈50%, mögen ≈30%. sollen zitiert Quellen neutral, wollen mit Skepsis.
Vergangenheit: Er muss krank gewesen sein. Sie will ihn gesehen haben.
sollen: unpersönliches Gerücht (Der Politiker soll zurücktreten). wollen: Behauptung des Subjekts selbst, oft zweifelhaft (Er will nichts gewusst haben).""",
        structure="Modalverb (subjektiv) + Infinitiv (Gegenwart) / Partizip II + haben/sein (Vergangenheit)",
        rules=[
            "Subjektive Modalverben drücken unterschiedliche Gewissheitsgrade aus.",
            "Müssen subjektiv = höchster Gewissheitsgrad.",
            "Dürfte = moderate Wahrscheinlichkeit.",
            "Sollen zitiert fremde Quelle neutral, wollen mit Skepsis.",
            "Vergangenheit: Modalverb + Partizip II + haben/sein.",
        ],
        examples=[
            GrammarExample(
                text="Der Chef muss Bescheid wissen.",
                translation=None,
                note="sichere Vermutung",
            ),
            GrammarExample(
                text="Der Angeklagte soll das Geld gestohlen haben.",
                translation=None,
                note="Gerücht",
            ),
            GrammarExample(
                text="Sie will bereits dreimal in Japan gewesen sein.",
                translation=None,
                note="zweifelhafte Behauptung",
            ),
            GrammarExample(
                text="Das dürfte die Lösung unseres Problems sein.",
                translation=None,
                note="vorsichtige Vermutung",
            ),
            GrammarExample(
                text="Das mag ja alles stimmen, aber was hilft uns das?",
                translation=None,
                note="einräumend",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Er will krank sein. = Er soll krank sein. (gleichgesetzt)",
                correct="wollen = Behauptung des Subjekts, sollen = Behauptung Dritter",
                note="Subjektive Modalverben haben unterschiedliche Quellenbezüge.",
            ),
        ],
        related=["subjektive-modalverben", "konjunktiv-i", "indirekte-rede", "modalverben"],
    ),
    GrammarTopic(
        slug="gehobene-sprache",
        title="Gehobene Sprache",
        level="C1",
        category="Stil",
        summary="Gehobenes Register – Konjunktiv I in formellen Texten, Nominalstil, anspruchsvolle Syntax.",
        explanation="""Die gehobene Sprache zeichnet sich aus durch: Konjunktiv I für indirekte Rede, Nominalstil und Funktionsverbgefüge, Genitiv-Präpositionen (bezüglich, hinsichtlich, angesichts), unpersönliche Konstruktionen (Es ist davon auszugehen, dass...), komplexe Hypotaxe.
Registerwechsel (Code-Switching): Im Freundeskreis: Hast du Bock auf Kino? Im Büro: Hätten Sie Interesse an einem Kinobesuch? In einer Rede: Es wäre mir eine Freude, Sie einladen zu dürfen.""",
        structure="Konjunktiv I · Nominalstil · Genitiv-Präpositionen · unpersönliche Passiv-Konstruktionen · komplexe Hypotaxe",
        rules=[
            "Gehobenes Register verwendet Konjunktiv I für indirekte Rede.",
            "Nominalstil und Funktionsverbgefüge sind typisch für formelle Texte.",
            "Genitiv-Präpositionen ersetzen einfachere Dativ-Konstruktionen.",
            "Unpersönliche Konstruktionen erhöhen Formalität.",
            "Die Wahl des Registers hängt von Situation, Medium und Beziehung ab.",
        ],
        examples=[
            GrammarExample(
                text="Es ist darauf hinzuweisen, dass die Frist morgen endet.",
                translation=None,
            ),
            GrammarExample(
                text="Bezüglich Ihrer Anfrage teilen wir Ihnen mit, dass...",
                translation=None,
                note="Genitiv + formell",
            ),
            GrammarExample(
                text="Der Minister äußerte, er sei zuversichtlich.",
                translation=None,
                note="Konjunktiv I",
            ),
            GrammarExample(
                text="Angesichts der Umstände bleibt uns keine andere Wahl.",
                translation=None,
                note="Genitiv-Präposition",
            ),
            GrammarExample(
                text="Es gilt, die richtigen Schlüsse zu ziehen.",
                translation=None,
                note="unpersönlich",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Gemischte Register: Bezüglich deiner Anfrage sag ich mal so: Nee.",
                correct="Konsistent formell ODER informell schreiben.",
                note="Einheitliches Register durchhalten.",
            ),
        ],
        related=[
            "konjunktiv-i",
            "indirekte-rede",
            "nominalstil",
            "funktionsverbgefuege",
            "textkonnektoren",
        ],
    ),
    GrammarTopic(
        slug="nominalstil",
        title="Nominalstil",
        level="C1",
        category="Stil",
        summary="Nominalstil – komplexe Nominalphrasen und Funktionsverbgefüge.",
        explanation="""Der Nominalstil verdichtet Informationen in komplexen Nominalphrasen. Von verbal zu nominal: Weil die Preise steigen → Aufgrund der steigenden Preise. Nachdem das Gesetz verabschiedet wurde → Nach der Verabschiedung des Gesetzes.
Bausteine: Nominalisierung (steigen → der Anstieg), Komposita (Preisanstieg), Funktionsverbgefüge (zur Durchführung bringen), präpositionale Genitivkonstruktionen (unter Berücksichtigung), Partizipialattribute (das zu lösende Problem).
Vorteil: Informationsdichte. Nachteil: Schwerfälligkeit bei Übergebrauch.""",
        structure="Verb/Adjektiv → Nomen · Satz → Nominalphrase · Funktionsverbgefüge · Genitivkette · Partizipialattribut",
        rules=[
            "Verben und Adjektive werden durch Suffixe zu Nomen.",
            "Zeitliche/kausale Zusammenhänge durch Präpositionen ausgedrückt.",
            "Funktionsverbgefüge ersetzen einfache Verben.",
            "Lange Genitivketten sind typisch (aber schwer verständlich).",
        ],
        examples=[
            GrammarExample(
                text="Die zunehmende Digitalisierung der Arbeitswelt",
                translation=None,
            ),
            GrammarExample(
                text="trotz der schwierigen wirtschaftlichen Rahmenbedingungen",
                translation=None,
            ),
            GrammarExample(
                text="nach Abschluss der seit Monaten andauernden Verhandlungen",
                translation=None,
            ),
            GrammarExample(
                text="Die Durchführung des Projekts erfolgte planmäßig.",
                translation=None,
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Übermäßige Nominalisierung (Substantivitis).",
                correct="Stilistisch ausgewogene Mischung: Kernaussagen nominal, Beispiele verbal.",
                note="Zu viel Nominalstil macht Texte unlesbar.",
            ),
        ],
        related=[
            "nominalisierung",
            "verbalisierung",
            "funktionsverbgefuege",
            "genitiv",
            "wissenschaftssprache",
        ],
    ),
    GrammarTopic(
        slug="funktionsverbgefuege",
        title="Funktionsverbgefüge",
        level="C1",
        category="Stil",
        summary="Funktionsverbgefüge – erweiterte Liste mit stilistischen Feinheiten.",
        explanation="""Funktionsverbgefüge (FVGs): feste Verbindungen aus Nomen + bedeutungsarmem Verb.
Mit bringen: zur Anwendung bringen (anwenden), zur Sprache bringen (ansprechen), zum Ausdruck bringen (ausdrücken), in Erfahrung bringen (erfahren), in Gefahr bringen (gefährden).
Mit ziehen: in Betracht ziehen (betrachten), in Erwägung ziehen (erwägen), in Zweifel ziehen (bezweifeln), zur Rechenschaft ziehen (belangen).
Mit stehen: zur Verfügung stehen (verfügbar sein), zur Debatte stehen (diskutiert werden), außer Frage stehen (sicher sein).
Mit treffen: eine Entscheidung treffen (entscheiden), eine Vereinbarung treffen (vereinbaren), Maßnahmen treffen (handeln).
FVGs machen Sprache formeller, präziser und distanzierter.""",
        structure="Nomen + Funktionsverb (bringen, ziehen, stehen, treffen, nehmen...) = formellere Variante eines einfachen Verbs",
        rules=[
            "FVGs bestehen aus bedeutungsarmem Verb + bedeutungstragendem Nomen.",
            "Das Nomen kann oft durch ein einfaches Verb ersetzt werden.",
            "FVGs erhöhen Formalität.",
            "Die Wahl des Funktionsverbs ist idiomatisch festgelegt.",
        ],
        examples=[
            GrammarExample(
                text="Wir müssen diese Möglichkeit in Betracht ziehen.",
                translation=None,
            ),
            GrammarExample(
                text="Das neue Verfahren wurde zur Anwendung gebracht.",
                translation=None,
            ),
            GrammarExample(
                text="Diese Behauptung muss ich in Zweifel ziehen.",
                translation=None,
            ),
            GrammarExample(
                text="Stehen Ihnen die Unterlagen zur Verfügung?",
                translation=None,
            ),
            GrammarExample(
                text="Das Komitee traf eine einstimmige Entscheidung.",
                translation=None,
            ),
            GrammarExample(
                text="Er wurde für den Schaden zur Rechenschaft gezogen.",
                translation=None,
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="in Betracht nehmen / zur Verfügung bringen",
                correct="in Betracht ziehen / zur Verfügung stellen",
                note="Die Verben in FVGs sind fest und dürfen nicht ausgetauscht werden.",
            ),
        ],
        related=[
            "nomen-verb-verbindungen",
            "nominalisierung",
            "nominalstil",
            "wissenschaftssprache",
        ],
    ),
    GrammarTopic(
        slug="wortbildung",
        title="Wortbildung",
        level="C1",
        category="Wortbildung",
        summary="Wortbildung – Präfixe, Suffixe und Komposita als System.",
        explanation="""Die deutsche Wortbildung umfasst: Komposition (Haustürschlüssel = Haus+Tür+Schlüssel — Grundwort rechts bestimmt Genus), Derivation (Präfixe: be-, er-, ver-, zer-, ent-, miss-; Suffixe: -ung, -heit, -keit, -bar, -lich, -los), Konversion (laufen → das Laufen, blau → das Blau), Kurzwortbildung (LKW, Uni, Kripo).
Fugenelemente: -s-, -en-, -es- zwischen Kompositionsteilen: Arbeit**s**platz, Hunde**h**ütte.""",
        structure="Komposition: Bestimmungswort + (Fuge) + Grundwort / Derivation: Präfix + Stamm + Suffix / Konversion: Wortartwechsel ohne Formänderung",
        rules=[
            "In Komposita bestimmt das letzte Element Genus und Kernbedeutung.",
            "Fugenelemente können zwischen Teilen eines Kompositums stehen.",
            "Präfixe verändern die Bedeutung des Basisworts.",
            "Suffixe bestimmen die Wortart: -ung → Nomen, -bar → Adjektiv, -ieren → Verb.",
        ],
        examples=[
            GrammarExample(
                text="die Haustür = das Haus + die Tür",
                translation=None,
                note="Komposition",
            ),
            GrammarExample(
                text="die Kindheit = das Kind + -heit", translation=None, note="Derivation"
            ),
            GrammarExample(
                text="das Essen (vom Verb essen)",
                translation=None,
                note="Konversion",
            ),
            GrammarExample(text="unmöglich = un- + möglich", translation=None, note="Präfix"),
            GrammarExample(
                text="das Autobahnkreuz = Auto + Bahn + Kreuz",
                translation=None,
                note="dreiteilig",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Der Wortbildung (falsches Genus)",
                correct="Die Wortbildung",
                note="Das Grundwort bestimmt das Genus.",
            ),
        ],
        related=["praefixe", "nominalisierung", "genus"],
    ),
    GrammarTopic(
        slug="praefixe",
        title="Verbpräfixe und ihre Bedeutungen",
        level="C1",
        category="Wortbildung",
        summary="Verbpräfixe – be-, er-, ver-, zer-, ent-, miss- und ihre systematischen Bedeutungen.",
        explanation="""Untrennbare Verbpräfixe mit systematischen Bedeutungen:
be-: macht transitiv, zielgerichtet (antworten → beantworten, treten → betreten)
er-: Resultat, Erkennung, Beginn (kennen → erkennen, öffnen → eröffnen)
ver-: falsch machen (verlaufen), verbrauchen (verbrennen), verschwinden (vergehen), weggeben (verkaufen)
zer-: Zerstörung (brechen → zerbrechen, stören → zerstören)
ent-: Entfernung, Gegenteil, Beginn (kommen → entkommen, decken → entdecken)
miss-: falsch, schlecht (verstehen → missverstehen, trauen → misstrauen)""",
        structure="Präfix + Basisverb = neues Verb mit modifizierter Bedeutung",
        rules=[
            '"Be-" macht intransitive Verben transitiv.',
            '"Er-" drückt Resultat oder Beginn aus.',
            '"Ver-" ist vielseitig: falsch machen, verbrauchen, verschwinden.',
            '"Zer-" bedeutet Zerstörung.',
            '"Ent-" bedeutet Entfernung oder Gegenteil.',
            '"Miss-" drückt Negatives oder Falsches aus.',
        ],
        examples=[
            GrammarExample(
                text="Er beantwortete die Frage.",
                translation=None,
                note="be-: transitiv",
            ),
            GrammarExample(
                text="Ich habe mich im Wald verlaufen.",
                translation=None,
                note="ver-: falsch laufen",
            ),
            GrammarExample(
                text="Das Glas zerbrach in tausend Stücke.",
                translation=None,
                note="zer-: Zerstörung",
            ),
            GrammarExample(
                text="Kolumbus entdeckte Amerika.",
                translation=None,
                note="ent-: die Decke wegnehmen",
            ),
            GrammarExample(
                text="Du hast mich missverstanden.",
                translation=None,
                note="miss-: falsch verstehen",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Ich antworte die Frage.",
                correct="Ich beantworte die Frage.",
                note='Intransitives "antworten auf" → transitives "beantworten".',
            ),
        ],
        related=["wortbildung", "trennbare-verben", "partizip-ii"],
    ),
    GrammarTopic(
        slug="ironie",
        title="Ironie im Deutschen",
        level="C1",
        category="Stil",
        summary="Ironie im Deutschen – sprachliche Marker, rhetorische Mittel und kulturelle Konventionen.",
        explanation="""Ironie als Stilmittel: Modalpartikeln (Das hast du ja toll gemacht!), Übertreibung (Das hat nur drei Stunden gedauert!), Untertreibung/Litotes (Das war nicht schlecht = sehr gut), Konjunktiv II (Das könnte ja vielleicht etwas schneller gehen!).
Berliner Schnauze (direkt, sarkastisch), Wiener Schmäh (charmant-subtil), Rheinischer Humor (lebensbejahend).
Gefahr: Ironie kann von Nicht-Muttersprachlern leicht missverstanden werden. Besonders in formellen Kontexten ist Vorsicht geboten.""",
        structure="Ironische Signale: Modalpartikeln + Übertreibung/Untertreibung + Konjunktiv II + spezifische Intonation",
        rules=[
            "Modalpartikeln (ja, wohl, vielleicht) können Ironie markieren.",
            'Untertreibung ("nicht schlecht" = sehr gut) ist ein typisch deutsches Ironiesignal.',
            "Konjunktiv II in Aufforderungen kann ironisch-passiv-aggressiv sein.",
            "Schriftliche Ironie ohne Kontext wird oft missverstanden.",
        ],
        examples=[
            GrammarExample(
                text="Das hast du ja mal wieder super hingekriegt!",
                translation=None,
                note="ja + Übertreibung",
            ),
            GrammarExample(
                text="Der Vortrag war nicht ganz langweilig.",
                translation=None,
                note="Litotes",
            ),
            GrammarExample(
                text="Du könntest vielleicht beim nächsten Mal etwas pünktlicher sein.",
                translation=None,
            ),
            GrammarExample(
                text="Ach, wirklich? Das hätte ich ja nie gedacht!",
                translation=None,
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Ironie in formellen E-Mails ohne Emojis.",
                correct="In formellen Kontexten Ironie vermeiden.",
                note="Schriftliche Ironie ohne nonverbale Signale ist riskant.",
            ),
        ],
        related=["konnotationen", "rhetorische-mittel", "konjunktiv-ii-hoeflichkeit"],
    ),
    GrammarTopic(
        slug="konnotationen",
        title="Konnotationen und Nuancen",
        level="C1",
        category="Wortschatz",
        summary="Konnotationen und Nuancen – feine Unterschiede zwischen bedeutungsähnlichen Wörtern verstehen.",
        explanation="""Konnotationen sind emotionale Nebenbedeutungen: dünn (negativ) vs schlank (positiv), billig (schlechte Qualität) vs preiswert (gutes Preis-Leistungs-Verhältnis), Gesicht (neutral) vs Antlitz (poetisch) vs Visage (abwertend).
Register-Ebenen: vulgär (kotzen) → umgangssprachlich (sich übergeben) → standard (erbrechen) → gehoben (sich übergeben) → fachsprachlich (vomieren).
C1-Sprecher wählen Wörter nach Konnotation und Register — und erkennen die stilistische Wirkung von Wortwahl bei anderen.""",
        structure="Synonym erkennen + Konnotation (positiv/negativ/neutral) + Register (vulgär-gehoben-fachsprachlich) bestimmen",
        rules=[
            "Fast jedes Wort hat neben der Grundbedeutung emotionale Assoziationen.",
            "Synonyme unterscheiden sich meist in Konnotation oder Register.",
            "Register reichen von vulgär bis fachsprachlich.",
            "Die Kenntnis von Konnotationen ist entscheidend für idiomatisches Deutsch.",
        ],
        examples=[
            GrammarExample(
                text="Sie hat eine schlanke Figur.",
                translation=None,
                note="positiv",
            ),
            GrammarExample(
                text="Das ist ein sehr preiswertes Hotel.",
                translation=None,
                note="positiv",
            ),
            GrammarExample(
                text="Er äußerte Bedenken gegen den Plan.",
                translation=None,
                note="formell, neutral",
            ),
            GrammarExample(
                text="Sie behauptete, ihn zu kennen.",
                translation=None,
                note="behaupten = Zweifel impliziert",
            ),
            GrammarExample(
                text="Diese Ansicht ist obsolet.",
                translation=None,
                note="fachsprachlich",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Meine Chefin ist ein dünnes Weib.",
                correct="Meine Chefin ist eine schlanke Frau.",
                note="Dünn und Weib können abwertend klingen.",
            ),
        ],
        related=["gehobene-sprache", "ironie", "rhetorische-mittel"],
    ),
    GrammarTopic(
        slug="rhetorische-mittel",
        title="Rhetorische Mittel",
        level="C1",
        category="Stil",
        summary="Rhetorische Mittel – Metapher, Alliteration, rhetorische Frage, Chiasmus.",
        explanation="""Wichtige Stilfiguren:
Wiederholung: Anapher (gleicher Satzanfang), Alliteration (Milch macht müde Männer munter)
Gegensatz: Antithese (Der Worte sind genug gewechselt...), Chiasmus (Die Kunst ist lang, und kurz ist das Leben), Oxymoron (beredtes Schweigen)
Bildlichkeit: Metapher (Sturm der Gefühle), Personifikation (Die Sonne lacht), Vergleich (stark wie ein Bär)
Hervorhebung: Rhetorische Frage (Wer will schon ewig leben?), Hyperbel (tausendmal gesagt), Litotes (nicht schlecht = sehr gut)""",
        structure="Stilfiguren: Wiederholung · Gegensatz · Bildlichkeit · Hervorhebung",
        rules=[
            "Rhetorische Mittel steigern die Wirkung von Texten.",
            "Stilfiguren müssen zur Textsorte passen.",
            "Häufung von Stilfiguren kann manieriert wirken.",
            "Rhetorische Fragen und Litotes sind im Alltagsdeutsch besonders häufig.",
        ],
        examples=[
            GrammarExample(
                text="Das ist der Anfang vom Ende.",
                translation=None,
                note="Paradoxon",
            ),
            GrammarExample(
                text="Reden ist Silber, Schweigen ist Gold.",
                translation=None,
                note="Antithese",
            ),
            GrammarExample(
                text="Wer ist schon perfekt?",
                translation=None,
                note="rhetorische Frage",
            ),
            GrammarExample(
                text="Das habe ich dir schon hundertmal gesagt!",
                translation=None,
                note="Hyperbel",
            ),
            GrammarExample(text="Der Himmel weinte.", translation=None, note="Personifikation"),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Stilmittel um ihrer selbst willen einsetzen.",
                correct="Jedes Stilmittel sollte eine bewusste Funktion haben.",
                note="Ornament ohne Funktion wirkt hohl.",
            ),
        ],
        related=["ironie", "konnotationen", "textanalyse", "gehobene-sprache"],
    ),
    GrammarTopic(
        slug="argumentation",
        title="Argumentationsstruktur",
        level="C1",
        category="Stil",
        summary="Argumentationsstruktur – logische Argumente mit Konnektoren, These-Antithese-Synthese.",
        explanation="""Klassischer Dreischritt: These → Antithese → Synthese. Aufbau eines Arguments: Behauptung → Begründung (weil, denn, da) → Beispiel (zum Beispiel, etwa) → Folgerung (deshalb, daher, also).
Sprachliche Mittel: hinzufügen (außerdem, darüber hinaus), gewichten (vor allem, insbesondere), einschränken (allerdings, jedoch, dennoch), schlussfolgern (daher, folglich, somit).
Typische Phrasen: Es stellt sich die Frage, ob... / Man muss jedoch bedenken, dass... / Zusammenfassend lässt sich sagen...""",
        structure="These → Begründung → Beispiel → Folgerung",
        rules=[
            "Jedes Argument braucht Begründung und wenn möglich ein Beispiel.",
            "Konnektoren wie daher, deshalb, folglich strukturieren den Gedankengang.",
            "Eine gute Argumentation berücksichtigt auch Gegenargumente.",
            "Die deutsche Argumentationskultur ist direkt und sachorientiert.",
        ],
        examples=[
            GrammarExample(
                text="Einerseits bietet die Digitalisierung viele Chancen. Andererseits birgt sie Risiken.",
                translation=None,
            ),
            GrammarExample(
                text="Es stimmt zwar, dass die Mieten steigen. Allerdings muss man auch die Einkommensentwicklung berücksichtigen.",
                translation=None,
            ),
            GrammarExample(
                text="Daraus folgt, dass wir unser Verhalten ändern müssen.",
                translation=None,
            ),
            GrammarExample(
                text="Zusammenfassend lässt sich feststellen, dass beide Ansätze ihre Berechtigung haben.",
                translation=None,
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Behauptung ohne Begründung.",
                correct="Immer Begründung liefern: weil oder denn.",
                note="Im Deutschen wird Unbegründetes schnell als unüberzeugend abgetan.",
            ),
        ],
        related=["textkonnektoren", "zweiteilige-konnektoren", "synthese", "wissenschaftssprache"],
    ),
    GrammarTopic(
        slug="oesterreich-schweiz",
        title="Varietäten: Österreich, Schweiz",
        level="C1",
        category="Varietäten",
        summary="Österreichisches und Schweizer Standarddeutsch – wichtiger Wortschatz, grammatische Unterschiede.",
        explanation="""Plurizentrische Sprache mit drei Standardvarietäten.
Österreich: Jänner (Januar), Paradeiser (Tomaten), Topfen (Quark), Semmel (Brötchen), Sackerl (Tüte), Bankomat (Geldautomat). Grammatik: Perfekt statt Präteritum auch schriftlich. Ich bin gesessen (statt habe gesessen). Diminutiv -erl/-el.
Schweiz: Velo (Fahrrad), Trottoir (Bürgersteig), Natel (Handy), Rahm (Sahne). Orthographie: Kein ß, immer ss (Strasse, gross). Relativsätze mit welcher/welche/welches sind häufiger.""",
        structure="Deutschland-Österreich-Schweiz: Wortschatz, Grammatik, Orthographie",
        rules=[
            "Alle drei Varietäten sind standardsprachlich korrekt.",
            "Austriazismen/Helvetismen sind im jeweiligen Land Standard.",
            "In der Schweiz wird generell kein ß geschrieben.",
            "Österreich bevorzugt Perfekt auch in schriftlichen Texten.",
        ],
        examples=[
            GrammarExample(
                text="Ich kaufe eine Semmel und ein Sackerl.",
                translation=None,
                note="Österreich",
            ),
            GrammarExample(
                text="Er fährt mit dem Velo auf dem Trottoir.",
                translation=None,
                note="Schweiz",
            ),
            GrammarExample(
                text="Das ist eine grosse Strasse.",
                translation=None,
                note="Schweizer Orthographie: kein ß",
            ),
            GrammarExample(
                text="Ich bin am Sofa gesessen.",
                translation=None,
                note="Österreich: sein + gesessen",
            ),
            GrammarExample(
                text="Das ist der Mann, welcher das gesagt hat.",
                translation=None,
                note="Schweiz: welcher als Relativpronomen",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Schweizer schreiben falsch, weil sie kein ß verwenden.",
                correct="Schweizer Standarddeutsch verwendet kein ß — das ist korrekt.",
                note="Das Fehlen des ß ist ein orthographisches Merkmal, kein Fehler.",
            ),
        ],
        related=["regionale-unterschiede", "gehobene-sprache", "konnotationen"],
    ),
    GrammarTopic(
        slug="regionale-unterschiede",
        title="Regionale Unterschiede im Deutschen",
        level="C1",
        category="Varietäten",
        summary="Regionale Unterschiede – lexikalische Nord-Süd-Teilungen und dialektaler Einfluss.",
        explanation="""Nord-Süd-Gefälle: Brötchen (Nord) / Semmel (Süd), Sonnabend / Samstag, Sahne / Rahm, Junge / Bub, Hallo / Grüß Gott.
Grammatik: Norden mehr Präteritum, Süden fast ausschließlich Perfekt (oberdeutscher Präteritumschwund). Süden: Genitiv bleibt länger erhalten als possessiver Dativ (dem Peter sein Haus).
Phonetik: Norden ich [ɪç], Süden i(ch) [iː]. In Norddeutschland ist Standardsprache näher an der Umgangssprache, im Süden sind Dialekte im Alltag präsenter.""",
        structure="Norddeutsch vs. süddeutsch vs. ost-/westdeutsch: Wortschatz, Grammatik, Aussprache",
        rules=[
            "Regionale Varianten des Standarddeutschen sind korrekt.",
            "Im Süden ist Perfekt die dominante Vergangenheitsform.",
            "Im Norden ist Präteritum in der gesprochenen Sprache häufiger.",
            "Dialekt beeinflusst das Standarddeutsch stärker im Süden.",
        ],
        examples=[
            GrammarExample(
                text="Ich möchte ein Brötchen / eine Semmel.",
                translation=None,
                note="Nord / Süd",
            ),
            GrammarExample(
                text="Grüß Gott! (Süd) / Moin! (Nord) / Tach! (West)",
                translation=None,
                note="regionale Begrüßung",
            ),
            GrammarExample(text="Samstag / Sonnabend", translation=None, note="Süd / Nord"),
            GrammarExample(
                text="ein Viertel vor acht (allg.) / drei Viertel acht (Ost)",
                translation=None,
                note="Uhrzeit regional",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Semmel ist ein Fehler für Brötchen.",
                correct="Semmel ist in Süddeutschland und Österreich korrekt.",
                note="Regionale Varianten sind keine Fehler.",
            ),
        ],
        related=["oesterreich-schweiz", "perfekt-vs-praeteritum", "konnotationen"],
    ),
    GrammarTopic(
        slug="textanalyse",
        title="Textanalyse",
        level="C1",
        category="Stil",
        summary="Textanalyse – systematischer Ansatz zur Analyse deutscher Texte.",
        explanation="""Textanalyse auf C1-Niveau umfasst: Textsorte und Kontext → Inhalt/Thema → Struktur/Aufbau → Sprachliche Analyse (Wortwahl, Satzbau, rhetorische Mittel, grammatische Besonderheiten) → Argumentationsstruktur → Wirkung und Intention.
Typische Formulierungen: Der Autor bedient sich einer bildhaften Sprache... / Der Text ist geprägt von... / Die Argumentation erfolgt auf mehreren Ebenen... / Auffällig ist die Verwendung von...
Wichtig: Analyse ist objektiv, eigene Meinung gehört nicht hinein. Belege aus dem Text (Zitate) sind Pflicht.""",
        structure="Textsorte → Inhalt → Aufbau → Sprache → Argumentation → Wirkung",
        rules=[
            "Immer mit Textsorte und Kontext beginnen.",
            "Inhaltliche und sprachliche Analyse klar trennen.",
            "Belege aus dem Text sind Pflicht.",
            "Die Analyse ist objektiv, keine eigene Meinung.",
        ],
        examples=[
            GrammarExample(
                text="Der Artikel ist im Stil eines Kommentars verfasst.",
                translation=None,
            ),
            GrammarExample(
                text="Der Autor argumentiert auf zwei Ebenen: emotional und sachlich.",
                translation=None,
            ),
            GrammarExample(
                text="Die sprachliche Gestaltung ist durch den Nominalstil geprägt.",
                translation=None,
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Eigene Meinung in die Analyse einfließen lassen.",
                correct="Analyse ist objektiv. Eigene Bewertung gehört in einen Kommentar.",
                note="Textanalyse ≠ Textkritik.",
            ),
        ],
        related=["rhetorische-mittel", "argumentation", "synthese", "reformulierung"],
    ),
    GrammarTopic(
        slug="synthese",
        title="Synthese und Paraphrase",
        level="C1",
        category="Stil",
        summary="Synthese und Paraphrase – Quellen kombinieren und in eigenen Worten wiedergeben.",
        explanation="""Paraphrase: Fremden Text in eigenen Worten wiedergeben. Techniken: Synonyme, Satzbau ändern, Perspektive wechseln.
Synthese: Mehrere Quellen zu neuer, eigenständiger Aussage verarbeiten. Kernaussagen identifizieren, Gemeinsamkeiten/Unterschiede finden, in kohärente Argumentation einbetten.
Formulierungen: Sowohl Müller als auch Schmidt argumentieren... / Im Gegensatz zu X vertritt Y... / Die Studien kommen übereinstimmend zu dem Ergebnis... / Während A den Fokus auf ... legt, betont B...""",
        structure="Paraphrase: Synonym + Umstrukturierung + Perspektivwechsel / Synthese: Quelle A + Quelle B → integrierte Aussage",
        rules=[
            "Paraphrasen müssen den Sinn exakt wiedergeben.",
            "Synthesen integrieren mehrere Quellen in neue Argumentation.",
            "Bei Paraphrasen muss die Quelle angegeben werden.",
            "Aktiv-Passiv-Wechsel und Nominalisierung sind mächtige Paraphrasenwerkzeuge.",
        ],
        examples=[
            GrammarExample(
                text="Laut Müller stellt der Klimawandel die größte Herausforderung dar.",
                translation=None,
                note="Paraphrase",
            ),
            GrammarExample(
                text="Während Autor A die Vorteile betont, hebt Autor B die Kosten hervor.",
                translation=None,
                note="Synthese",
            ),
            GrammarExample(
                text="Die Ergebnisse beider Studien deuten übereinstimmend darauf hin, dass...",
                translation=None,
                note="Synthese",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Paraphrase mit denselben Satzstrukturen.",
                correct="Echte Paraphrasen verändern Wortwahl und Satzbau grundlegend.",
                note="Zu viel vom Original = kein Paraphrase.",
            ),
        ],
        related=["indirekte-rede", "konjunktiv-i", "reformulierung", "textanalyse"],
    ),
    GrammarTopic(
        slug="reformulierung",
        title="Reformulierungstechniken",
        level="C1",
        category="Stil",
        summary="Reformulierungstechniken – umformulieren, erklären, komplexe Ideen vereinfachen.",
        explanation="""Reformulierung ist die Fähigkeit, einen Gedanken auf verschiedene Weise auszudrücken. Techniken: Synonyme, Aktiv↔Passiv, Nominalisierung↔Verbalisierung, Perspektivwechsel (Ich gebe dir → Du bekommst von mir), Konkretisierung vs Abstraktion.
Markierungen: Das heißt, ... / Anders gesagt, ... / Mit anderen Worten: ... / Um es einfacher auszudrücken: ... / Oder andersherum: ...
Eine gute Reformulierung bewahrt die Kernaussage, variiert aber die sprachliche Form.""",
        structure="Reformulierung = Synonym + Grammatik-Transformation + Paraphrase + Perspektivwechsel",
        rules=[
            "Reformulierung bedeutet, das Gleiche anders zu sagen.",
            "Techniken: Synonym, Aktiv/Passiv, Nominal-/Verbalstil, Perspektivwechsel.",
            "Reformulierungsmarker machen die Reformulierung transparent.",
            "Vereinfachung ist wichtig für Kommunikation mit unterschiedlichen Niveaus.",
        ],
        examples=[
            GrammarExample(
                text="Die Inflation steigt rapide an. Das heißt, das Geld verliert schnell an Wert.",
                translation=None,
                note="Vereinfachung",
            ),
            GrammarExample(
                text="Man könnte auch sagen, dass diese Maßnahme kontraproduktiv ist.",
                translation=None,
            ),
            GrammarExample(
                text="Anders formuliert: Wir brauchen eine grundlegende Neuausrichtung.",
                translation=None,
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Reformulierung die Bedeutung verändert.",
                correct="Reformulierung muss den Inhalt exakt bewahren.",
                note="Sonst ist es eine Fehlinterpretation.",
            ),
        ],
        related=["synthese", "nominalisierung", "verbalisierung", "passiv-werden"],
    ),
    GrammarTopic(
        slug="wissenschaftssprache",
        title="Wissenschaftssprache",
        level="C1",
        category="Stil",
        summary="Wissenschaftssprache – Konventionen wissenschaftlichen Schreibens: unpersönlich, hedgend, fachspezifisch.",
        explanation="""Wissenschaftssprache: Passiv (Die Proben wurden untersucht), unpersönliche Konstruktionen (Es ist festzustellen, dass...), Nominalstil (Die Durchführung der Untersuchung), Konjunktiv I (Der Autor stellt fest, dies sei...).
Hedging: Dies dürfte zutreffen. / Die Ergebnisse deuten darauf hin... / Die Daten legen nahe... / Es scheint, dass...
Wissenschaftliche Phrasen: Die vorliegende Arbeit untersucht... / Zusammenfassend lässt sich festhalten... / Diesen Ergebnissen zufolge...
Vermeiden: Ich/Wir (außer in manchen Fachkulturen), Umgangssprache, Übertreibungen ohne Beleg, direkte Aufforderungen.""",
        structure="Passiv + Nominalstil + Konjunktiv I + Hedging + Fachvokabular",
        rules=[
            "Passiv und unpersönliche Konstruktionen sind Standard.",
            "Hedging ist zentral: Daten deuten hin, nicht Daten beweisen.",
            "Konjunktiv I für fremde Positionen.",
            "Ich und subjektive Wertungen werden vermieden.",
        ],
        examples=[
            GrammarExample(
                text="Es konnte gezeigt werden, dass die Hypothese zutrifft.",
                translation=None,
            ),
            GrammarExample(
                text="Die Ergebnisse legen nahe, dass ein Zusammenhang besteht.",
                translation=None,
                note="Hedging",
            ),
            GrammarExample(
                text="Zusammenfassend lässt sich festhalten, dass die These bestätigt wurde.",
                translation=None,
            ),
            GrammarExample(
                text="Dem ist entgegenzuhalten, dass die Stichprobe klein war.",
                translation=None,
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Absolute Behauptungen: Die Ergebnisse beweisen eindeutig...",
                correct="Hedging: Die Ergebnisse weisen darauf hin...",
                note="In der Wissenschaft wird kaum etwas 'bewiesen'.",
            ),
        ],
        related=[
            "nominalstil",
            "passiv-werden",
            "konjunktiv-i",
            "funktionsverbgefuege",
            "indirekte-rede",
        ],
    ),
    GrammarTopic(
        slug="redewendungen",
        title="Fortgeschrittene Redewendungen",
        level="C1",
        category="Wortschatz",
        summary="Fortgeschrittene Redewendungen – idiomatische, bildhafte und kulturspezifische deutsche Ausdrücke.",
        explanation="""Redewendungen auf C1-Niveau: sich ins Zeug legen (to put in effort), Nägel mit Köpfen machen (to do things properly), den Nagel auf den Kopf treffen (to hit the nail on the head), vom Regen in die Traufe kommen (from bad to worse), die Flinte ins Korn werfen (to throw in the towel).
Kommunikation: etwas durch die Blume sagen (indirectly), kein Blatt vor den Mund nehmen (to speak one's mind), mit der Tür ins Haus fallen (to be too blunt).
Emotionen: die Nase voll haben (fed up), auf Wolke sieben schweben (on cloud nine), sich wie gerädert fühlen (completely exhausted).
Redensart vs Sprichwort: Redensart ist satzintegriert, Sprichwort ist vollständiger Satz (Wer zuerst kommt, mahlt zuerst.).""",
        structure="Feste Wendung mit idiomatischer (nicht wörtlicher) Bedeutung",
        rules=[
            "Redewendungen sind idiomatisch.",
            "Viele stammen aus Handwerk oder Landwirtschaft.",
            "Sie machen Sprache lebendig und muttersprachlich.",
            "In formellen Kontexten sparsam einsetzen.",
        ],
        examples=[
            GrammarExample(
                text="Du hast den Nagel auf den Kopf getroffen!",
                translation=None,
            ),
            GrammarExample(
                text="Ich habe die Nase voll von dieser Diskussion.",
                translation=None,
            ),
            GrammarExample(text="Er nimmt kein Blatt vor den Mund.", translation=None),
            GrammarExample(
                text="Wir müssen Nägel mit Köpfen machen.",
                translation=None,
            ),
            GrammarExample(
                text="Nach der Wanderung fühle ich mich wie gerädert.",
                translation=None,
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Du hast den Hammer auf den Nagel getroffen.",
                correct="Du hast den Nagel auf den Kopf getroffen.",
                note="Redewendung ist fest — Wörter können nicht ausgetauscht werden.",
            ),
        ],
        related=["konnotationen", "nomen-verb-verbindungen", "funktionsverbgefuege"],
    ),
    GrammarTopic(
        slug="orthotypographie",
        title="Deutsche Orthotypographie",
        level="C1",
        category="Orthographie",
        summary="Deutsche Orthotypographie – Anführungszeichen, ß/ss-Regeln, Kommaregeln.",
        explanation="""Anführungszeichen: Deutsch „…" (99 unten, 66 oben), Schweiz «…» (Guillemets nach innen). Falsch: Englische "…".
ß vs ss: ß nach langem Vokal/Diphthong (Straße, heißen), ss nach kurzem Vokal (Kuss, Fluss, muss).
Kommaregeln: Immer vor Nebensätzen, vor Infinitivgruppen mit zu, bei Aufzählungen, vor aber/sondern/jedoch/doch.
Kein Apostroph bei Genitiv: Peters Auto (nicht: Peter's Auto). Apostroph nur bei Auslassungen: Wie geht's?""",
        structure='„..." (Doppel) · ß nach langem Vokal/Diphthong, ss nach kurzem · Komma vor Nebensätzen, Infinitivgruppen mit zu, Aufzählungen',
        rules=[
            'Anführungszeichen: „..." (deutsch), «...» (Schweiz).',
            "ß nach langem Vokal, ss nach kurzem.",
            "Kein Apostroph beim Genitiv.",
            "Infinitivgruppen mit zu werden mit Komma abgetrennt.",
        ],
        examples=[
            GrammarExample(
                text='Er sagte: „Ich komme morgen."',
                translation=None,
                note="korrekte Anführungszeichen",
            ),
            GrammarExample(
                text="Die Straße ist lang. — Der Fluss ist kurz.", translation=None, note="ß vs ss"
            ),
            GrammarExample(
                text="Peters Auto, nicht: Peter's Auto",
                translation=None,
                note="kein Apostroph bei Genitiv",
            ),
            GrammarExample(
                text="Wie geht's dir?", translation=None, note="Apostroph nur bei Auslassung"
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong='Englische Anführungszeichen: "Das ist falsch."',
                correct='„So ist es richtig."',
                note="Deutsche Anführungszeichen: 99 unten, 66 oben.",
            ),
        ],
        related=["wissenschaftssprache", "gehobene-sprache"],
    ),
]
