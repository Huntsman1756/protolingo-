"""German grammar topics — C2."""

from app.data._types import GrammarExample, GrammarMistake, GrammarTopic

C2_GRAMMAR_TOPICS: list[GrammarTopic] = [
    GrammarTopic(
        slug="komplexe-satzgefuege",
        title="Komplexe Satzgefüge",
        level="C2",
        category="Syntax",
        summary="Komplexe Satzgefüge – mehrstufige Hypotaxe und syntaktische Architektur.",
        explanation="""Mehrstufige Hypotaxe mit bis zu 4-5 Nebensatzebenen: Hauptsatz → dass-Satz → Relativsatz → weil-Satz → dass-Satz. Kohäsion (grammatische Verknüpfung) und Kohärenz (logischer Zusammenhang) sind entscheidend.
Satzklammer-Management: nicht mehr als ~15 Wörter zwischen Klammerteilen. Rechtsverzweigung bevorzugen. Bei Überkomplexität aufteilen.""",
        structure="Hauptsatz [→ Nebensatz 1 [→ Nebensatz 2 [→ Nebensatz 3]]]",
        rules=[
            "Mehrstufige Hypotaxe bedeutet Verschachtelung von Nebensätzen.",
            "Kohärenz und Kohäsion sind entscheidend für Verständlichkeit.",
            "Die Satzklammer muss mental überschaubar bleiben.",
            "Rechtsverzweigung ist meist verständlicher als Linksverzweigung.",
        ],
        examples=[
            GrammarExample(
                text="Ich glaube, dass er, obwohl er wenig Erfahrung hat, die Aufgabe, die ihm gestellt wurde, gut lösen wird.",
                translation=None,
            ),
            GrammarExample(
                text="Die Frage, ob die Maßnahmen, die die Regierung ergriffen hat, ausreichen, wird kontrovers diskutiert.",
                translation=None,
            ),
            GrammarExample(
                text="Was immer auch geschehen mag — wir werden eine Lösung finden, die für alle tragbar ist.",
                translation=None,
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Zu viele Verschachtelungsebenen.",
                correct="Maximal 3 Ebenen in einem Satz.",
                note="Bei mehr Ebenen aufteilen.",
            ),
        ],
        related=[
            "wortstellung-nebensatz",
            "textkonnektoren",
            "alle-modi",
            "integration-grammatisch",
        ],
    ),
    GrammarTopic(
        slug="alle-modi",
        title="Alle Modi im Deutschen",
        level="C2",
        category="Modi",
        summary="Alle Modi – vollständige Beherrschung von Indikativ, Konjunktiv I/II, Imperativ in allen Zeitformen.",
        explanation="""Drei Modi in allen Zeitformen:
Indikativ: Präsens (gehe), Präteritum (ging), Perfekt (bin gegangen), Plusquamperfekt (war gegangen), Futur I (werde gehen), Futur II (werde gegangen sein)
Konjunktiv I: Präsens (er gehe), Perfekt (er sei gegangen), Futur I (er werde gehen), Futur II (er werde gegangen sein)
Konjunktiv II: Gegenwart (er ginge/würde gehen), Vergangenheit (er wäre gegangen/hätte gemacht), Plusquamperfekt (wäre gegangen gewesen — extrem selten)
Imperativ: du (Geh!), ihr (Geht!), Sie (Gehen Sie!), wir (Gehen wir!)
Modi-Mischung: Indikativ Hauptsatz + Konjunktiv I Nebensatz = ok. Konjunktiv II wenn-Satz + würde Hauptsatz = ok.""",
        structure="3 Modi × 6 Zeitformen = vollständiges Paradigma",
        rules=[
            "Beherrsche alle drei Modi in allen Zeitformen.",
            "Konjunktiv I: fast ausschließlich für indirekte Rede.",
            "Konjunktiv II: Irrealis, Höflichkeit, vorsichtige Aussagen.",
            "Imperativ: vier Formen (du, ihr, Sie, wir).",
        ],
        examples=[
            GrammarExample(
                text="Er sagte, er sei krank gewesen.",
                translation=None,
                note="Konjunktiv I Perfekt",
            ),
            GrammarExample(
                text="Wenn ich mehr Zeit gehabt hätte, wäre ich gekommen.",
                translation=None,
                note="Konjunktiv II Vergangenheit",
            ),
            GrammarExample(
                text="Man nehme 200g Mehl.",
                translation=None,
                note="Konjunktiv I als Aufforderung",
            ),
            GrammarExample(
                text="Gehen wir doch heute Abend ins Kino!",
                translation=None,
                note="Adhortativ",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Er sagte, er wäre krank.",
                correct="Er sagte, er sei krank.",
                note="Wäre = Konjunktiv II (Irrealis). Für indirekte Rede: sei (Konjunktiv I).",
            ),
        ],
        related=[
            "konjunktiv-i",
            "konjunktiv-ii-wuerde",
            "konjunktiv-ii-vergangenheit",
            "imperativ",
        ],
    ),
    GrammarTopic(
        slug="stilistik",
        title="Stilistik und Register",
        level="C2",
        category="Stil",
        summary="Stilistik und Register – vollständige Beherrschung aller Register, souveräner Registerwechsel.",
        explanation="""Register-Kontinuum: vulgär (Kraftausdrücke) → umgangssprachlich (Kurzsätze, Modalpartikeln) → standard (korrekte Grammatik, neutral) → gehoben (Nominalstil, Konjunktiv I) → literarisch (Stilfiguren, Archaismen) → fachsprachlich (Terminologie).
Code-Switching: Ey Alter, haste mal 'n Euro? (Freund) → Könntest du mir vielleicht einen Euro leihen? (Bekannter) → Dürfte ich Sie um einen Euro bitten? (Fremder) → Es wäre mir außerordentlich verbunden... (sehr formell/ironisch).
Stilbrüche: bewusst = Stilmittel, ungewollt = unprofessionell.""",
        structure="Registerwahl = f(Situation, Medium, Beziehung, Zweck)",
        rules=[
            "Registerwahl muss situativ, medial und sozial angemessen sein.",
            "Code-Switching ist Zeichen von Sprachbeherrschung.",
            "Stilbrüche nur akzeptabel wenn bewusst und funktional.",
            "Formell ist nicht per se besser — informell ist in informellen Kontexten richtig.",
        ],
        examples=[
            GrammarExample(text="Haste mal Feuer? (umgangssprachlich)", translation=None),
            GrammarExample(
                text="Könntest du mir bitte Feuer geben? (standard)",
                translation=None,
            ),
            GrammarExample(
                text="Dürfte ich Sie um Feuer bitten? (gehoben)",
                translation=None,
            ),
            GrammarExample(
                text="Es wäre mir eine Ehre, wenn Sie mir Feuer geben würden. (ironisch-gehoben)",
                translation=None,
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Im Bewerbungsschreiben: Hi, ich hab Bock auf den Job!",
                correct="Sehr geehrte Damen und Herren, hiermit bewerbe ich mich...",
                note="Register muss zum Kontext passen.",
            ),
        ],
        related=[
            "gehobene-sprache",
            "konnotationen",
            "ironie",
            "rhetorische-mittel",
            "wissenschaftssprache",
        ],
    ),
    GrammarTopic(
        slug="literarische-mittel",
        title="Literarische Mittel",
        level="C2",
        category="Stil",
        summary="Fortgeschrittene literarische Mittel – Metapher, Allegorie, Synekdoche, Metonymie.",
        explanation="""Bildliche Figuren: Metapher (Das Leben ist eine Reise), Allegorie (fortgeführte Metapher), Metonymie (Das Weiße Haus schweigt), Synekdoche (Dach über dem Kopf), Synästhesie (schreiende Farben), Personifikation (Die Zeit heilt), Symbol (Taube = Frieden).
Wiederholungsfiguren: Anapher, Epipher, Parallelismus, Chiasmus, Klimax.
Klangfiguren: Alliteration, Assonanz, Onomatopoesie (knistern, plumpsen).
Auf C2-Niveau werden Stilmittel aktiv im eigenen Schreiben eingesetzt.""",
        structure="Figur benennen → Funktion/Wirkung beschreiben (Analyse) / Figur wählen → bewusst einsetzen (Produktion)",
        rules=[
            "Jedes Stilmittel hat eine spezifische Wirkung und Funktion.",
            "Metaphern und Symbole sind die häufigsten Tropen.",
            "Klangfiguren sind besonders in Lyrik und Rhetorik von Bedeutung.",
            "Stilmittel müssen funktional sein, nicht ornamental.",
        ],
        examples=[
            GrammarExample(
                text="Der Wind heulte um das Haus wie ein verletztes Tier.",
                translation=None,
                note="Vergleich + Personifikation",
            ),
            GrammarExample(
                text="Das Weiße Haus dementierte die Vorwürfe.",
                translation=None,
                note="Metonymie",
            ),
            GrammarExample(
                text="Ich kam, sah und siegte.",
                translation=None,
                note="Parallelismus + Klimax",
            ),
            GrammarExample(
                text="O Freiheit, wie lange muss man noch auf dich warten?",
                translation=None,
                note="Apostrophe",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Metapher und Vergleich verwechseln.",
                correct="Vergleich: stark wie ein Bär (mit wie). Metapher: Er ist ein Bär an Stärke (ohne wie).",
                note="Vergleich nutzt wie/als. Metapher setzt gleich ohne Vergleichswort.",
            ),
        ],
        related=["rhetorische-mittel", "ironie", "erzaehlperspektiven", "stilistik"],
    ),
    GrammarTopic(
        slug="erzaehlperspektiven",
        title="Erzählperspektiven",
        level="C2",
        category="Stil",
        summary="Erzählperspektiven – Ich-Erzähler, auktorial, erlebte Rede, narrative Distanz.",
        explanation="""Ich-Erzähler (1. Person): Teil der Geschichte, kann zuverlässig oder unzuverlässig sein.
Er/Sie-Erzähler (3. Person): auktorial (allwissend, kommentiert, vorausdeutend), personal (nur was eine Figur weiß), neutral (reine Außensicht, behavioristisch).
Spezialtechniken: Stream of Consciousness (ungeordnete Gedankenfolge), Erlebte Rede (Gedanken in 3. Person Präteritum ohne Inquit-Formel: Das musste ein Traum sein.), Innerer Monolog (1. Person Präsens: Was soll ich tun?).
Narrative Distanz: nah (Innerer Monolog) → mittel (Erlebte Rede) → fern (neutraler Bericht).""",
        structure="Erzähler → Fokalisierung → Erzählverhalten (auktorial/personal/neutral) → narrative Distanz",
        rules=[
            "Die Erzählperspektive bestimmt, welche Informationen der Leser erhält.",
            "Auktorial: allwissend, kommentiert.",
            "Personal: auf Wissen einer Figur beschränkt.",
            "Erlebte Rede: Gedanken in 3. Person Präteritum ohne Ankündigung.",
        ],
        examples=[
            GrammarExample(
                text="Ich wusste sofort, dass etwas nicht stimmte.",
                translation=None,
                note="Ich-Erzähler",
            ),
            GrammarExample(
                text="Herr Meier wusste nicht, dass ihn eine Überraschung erwartete.",
                translation=None,
                note="auktorial, Vorausdeutung",
            ),
            GrammarExample(
                text="Er blickte aus dem Fenster. Wie lange sollte das noch so weitergehen?",
                translation=None,
                note="erlebte Rede",
            ),
            GrammarExample(
                text="Ein Mann in blauem Mantel betrat das Gebäude. Er trug keine Tasche.",
                translation=None,
                note="neutral",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Ungewollter Perspektivwechsel: Er betrat das Zimmer. Ich war müde.",
                correct="Perspektive einheitlich halten.",
                note="Unmarkierte Perspektivwechsel verwirren.",
            ),
        ],
        related=["literarische-mittel", "literarische-erzaehlung", "stilistik", "indirekte-rede"],
    ),
    GrammarTopic(
        slug="falsche-freunde",
        title="Falsche Freunde DE-EN",
        level="C2",
        category="Wortschatz",
        summary="Falsche Freunde zwischen Deutsch und Englisch – häufige Fallstricke.",
        explanation="""Klassische falsche Freunde DE-EN: aktuell = current (nicht: actual), also = therefore (nicht: also), bekommen = to receive (nicht: to become), brav = well-behaved (nicht: brave), Chef = boss (nicht: chef), dezent = discreet (nicht: decent), fast = almost (nicht: fast), Gift = poison (nicht: gift), Handy = mobile phone (nicht: handy), sensibel = sensitive (nicht: sensible), spenden = to donate (nicht: to spend), Wand = wall (nicht: wand), will = want (nicht: will).
Die Kenntnis falscher Freunde ist essentiell für akkurate Übersetzungen und idiomatisches Deutsch.""",
        structure="Ähnlich klingendes Wort → andere Bedeutung → richtige Übersetzung",
        rules=[
            "Aktuell = current, nicht actual.",
            "Bekommen = to receive, nicht to become.",
            "Sensibel = sensitive, nicht sensible.",
            "Gift = poison, nicht gift (Geschenk).",
        ],
        examples=[
            GrammarExample(
                text="Ich habe ein Geschenk bekommen.",
                translation=None,
                note="bekommen ≠ become",
            ),
            GrammarExample(
                text="Die aktuellen Nachrichten sind wichtig.",
                translation=None,
                note="aktuell ≠ actual",
            ),
            GrammarExample(
                text="Vorsicht, das ist Gift!",
                translation=None,
                note="Gift ≠ gift",
            ),
            GrammarExample(
                text="Sie ist sehr sensibel.",
                translation=None,
                note="sensibel ≠ sensible",
            ),
            GrammarExample(
                text="Das ist also die Lösung.",
                translation=None,
                note="also ≠ also",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="I have become a letter. (für: Ich habe einen Brief bekommen.)",
                correct="I received a letter.",
                note="Bekommen = to receive. To become = werden.",
            ),
        ],
        related=["konnotationen", "uebersetzung", "nuancen"],
    ),
    GrammarTopic(
        slug="uebersetzung",
        title="Übersetzungsäquivalente",
        level="C2",
        category="Wortschatz",
        summary="Übersetzungsäquivalente – wenn wörtliche Übersetzung scheitert und kommunikative Äquivalenz zählt.",
        explanation="""Kommunikative Äquivalenz statt wörtlicher Übersetzung:
Idiomatik: Das ist nicht mein Bier → That's not my problem. Ich verstehe nur Bahnhof → It's all Greek to me.
Modalpartikeln: Das ist doch klar! → But that's obvious! / Come on!
Kulturelle Konzepte: Feierabend → end of the workday. Fernweh → wanderlust (nicht exakt).
Funktionale Äquivalenz: Vielen Dank für Ihre Mühe! → Thank you so much for your help! (nicht: Thank you for your effort!). Guten Appetit! → Enjoy your meal! (nicht: Good appetite!).""",
        structure="Quelltext verstehen → Bedeutung extrahieren → Zieltext formulieren (kommunikativ äquivalent)",
        rules=[
            "Kommunikative Äquivalenz ist wichtiger als wörtliche Übereinstimmung.",
            "Redewendungen sinngemäß übertragen, nie wörtlich.",
            "Modalpartikeln durch Betonung oder andere Wörter ersetzen.",
            "Kulturelle Konzepte umschreiben wenn kein Äquivalent existiert.",
        ],
        examples=[
            GrammarExample(
                text="Das ist nicht mein Bier. → That's not my problem.",
                translation=None,
                note="kommunikativ äquivalent",
            ),
            GrammarExample(
                text="Das kannst du laut sagen. → You can say that again.",
                translation=None,
                note="nicht wörtlich",
            ),
            GrammarExample(
                text="Ich habe die Nase voll. → I'm fed up.", translation=None, note="idiomatisch"
            ),
            GrammarExample(
                text="Mach's gut! → Take care!", translation=None, note="nicht: Make it good!"
            ),
            GrammarExample(
                text="Guten Appetit! → Enjoy your meal!",
                translation=None,
                note="nicht: Good appetite!",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Guten Appetit als Good appetite übersetzen.",
                correct="Enjoy your meal!",
                note="Kein idiomatischer englischer Ausdruck.",
            ),
        ],
        related=["falsche-freunde", "konnotationen", "modalpartikeln", "nuancen"],
    ),
    GrammarTopic(
        slug="sprachwandel",
        title="Sprachwandel",
        level="C2",
        category="Sprachgeschichte",
        summary="Sprachwandel – vom Althochdeutschen zum modernen Deutsch.",
        explanation="""Perioden: Althochdeutsch (750-1050): erste Schriftzeugnisse, Zweite Lautverschiebung (p→pf, t→ts, k→ch).
Mittelhochdeutsch (1050-1350): höfische Dichtung, Nebensilbenabschwächung (taga → tage), Umlautphonemisierung.
Frühneuhochdeutsch (1350-1650): Luther als Katalysator, Diphthongierung (mîn → mein), Monophthongierung.
Neuhochdeutsch (1650-heute): Normierung, Reformen 1901/1996/2006.
Aktuelle Tendenzen: Genitivabbau, Anglizismen (downloaden, liken), gendergerechte Sprache, Präteritumschwund im Süden.""",
        structure="Althochdeutsch → Mittelhochdeutsch → Frühneuhochdeutsch → Neuhochdeutsch",
        rules=[
            "Die Zweite Lautverschiebung trennt Deutsch von anderen germanischen Sprachen.",
            "Luther und Buchdruck waren zentral für Standardisierung.",
            "Sprachwandel ist kontinuierlich und kein Sprachverfall.",
            "Aktuelle Tendenzen: Genitivabbau, Anglizismen, gendergerechte Sprache.",
        ],
        examples=[
            GrammarExample(
                text="Ahd. gast → gesti, Nhd. Gast → Gäste",
                translation=None,
                note="Umlaut als Pluralmarker",
            ),
            GrammarExample(
                text="Ahd. mîn → Nhd. mein, Ahd. hûs → Nhd. Haus",
                translation=None,
                note="Diphthongierung",
            ),
            GrammarExample(
                text="Luther (1545): Und Gott sprach / Es werde Liecht. → Heute: Es werde Licht.",
                translation=None,
                note="Orthographie-Wandel",
            ),
            GrammarExample(
                text="Heute: dem Peter sein Auto (ugs.) vs. Peters Auto (Standard)",
                translation=None,
                note="Dativ statt Genitiv",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Sprachwandel als Sprachverfall abwerten.",
                correct="Sprachwandel ist ein natürlicher Prozess.",
                note="Was heute falsch ist, kann morgen Standard sein.",
            ),
        ],
        related=["sprachgeschichte", "oesterreich-schweiz", "regionale-unterschiede"],
    ),
    GrammarTopic(
        slug="sprachgeschichte",
        title="Sprachgeschichte",
        level="C2",
        category="Sprachgeschichte",
        summary="Geschichte der deutschen Sprache – Luther, Grimm, Rechtschreibreformen, Weg zur Standardisierung.",
        explanation="""Schlüsselfiguren: Luther (Bibelübersetzung 1534, Grundlage der Schriftsprache), Jacob und Wilhelm Grimm (Deutsches Wörterbuch, Deutsche Grammatik), Konrad Duden (Orthographisches Wörterbuch 1880).
Etappen: 1901 erste verbindliche Rechtschreibung, 1996 Rechtschreibreform (ß/ss, Kommasetzung), 2006 Reform der Reform.
Entwicklung: 16. Jh. Luther → 17.-18. Jh. Sprachgesellschaften gegen Alamode-Sprache (Französisch-Dominanz) → 18. Jh. Gottsched/Adelung → 19. Jh. Nationalsprache → 20./21. Jh. plurizentrische Anerkennung.""",
        structure="Luther → Sprachgesellschaften → Grammatiker → Duden → Rechtschreibreformen → Plurizentrik",
        rules=[
            "Luthers Bibelübersetzung war der entscheidende Impuls.",
            "Jacob Grimm begründete die germanistische Linguistik.",
            "Duden normierte die Rechtschreibung erstmals einheitlich.",
            "Deutsch ist heute plurizentrisch mit drei Standardvarietäten.",
        ],
        examples=[
            GrammarExample(
                text="Vor 1996: Er wußte, daß es kalt war. → Heute: Er wusste, dass es kalt war.",
                translation=None,
                note="Rechtschreibreform",
            ),
            GrammarExample(
                text="Grimms Märchen: Es war einmal ein König, der hatte drei Töchter.",
                translation=None,
            ),
            GrammarExample(
                text="Duden (1880) legte 27.000 Wörter normiert fest.", translation=None
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Vor der Reform 1996 gab es keine Regeln.",
                correct="Die Regeln von 1901 waren verbindlich.",
                note="Die Reform hat Regeln geändert, nicht erst geschaffen.",
            ),
        ],
        related=[
            "sprachwandel",
            "oesterreich-schweiz",
            "regionale-unterschiede",
            "orthotypographie",
        ],
    ),
    GrammarTopic(
        slug="textsorten",
        title="Textsorten und Gattungen",
        level="C2",
        category="Stil",
        summary="Textsorten und Genres – Beherrschung einer breiten Palette von Textarten.",
        explanation="""Journalistisch: Nachricht (neutral, 7 W-Fragen), Bericht (Hintergrund), Kommentar (meinungsbetont), Reportage (szenisch), Glosse (satirisch).
Wissenschaftlich: Abstract (150-250 Wörter), Hausarbeit, Rezension, Protokoll, Exposé.
Literarisch: Kurzgeschichte (pointiert), Erzählung, Roman, Gedicht, Essay (subjektive Erörterung).
Gebrauchstexte: Formeller Brief (DIN 5008), E-Mail, Bewerbung, Leserbrief.
Jede Textsorte hat spezifische Konventionen für Aufbau, Stil und Register.""",
        structure="Textsorte → Konventionen (Aufbau, Stil, Register, Umfang) → Zielgruppe → Wirkungsabsicht",
        rules=[
            "Jede Textsorte hat eigene Konventionen.",
            "Nachricht und Kommentar strikt trennen.",
            "Wissenschaftliche Textsorten verlangen Präzision und Quellenangaben.",
            "Formelle Gebrauchstexte folgen DIN-Normen.",
        ],
        examples=[
            GrammarExample(
                text="Laut Polizeiangaben ereignete sich der Unfall gegen 18 Uhr.",
                translation=None,
                note="Nachricht",
            ),
            GrammarExample(
                text="Die vorliegende Arbeit untersucht den Einfluss von...",
                translation=None,
                note="wissenschaftlich",
            ),
            GrammarExample(
                text="TOP 3: Genehmigung des Protokolls. Einstimmig genehmigt.",
                translation=None,
                note="Protokoll",
            ),
            GrammarExample(
                text="Sehr geehrte Damen und Herren, hiermit bewerbe ich mich...",
                translation=None,
                note="formeller Brief",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="In Nachricht eigene Meinung äußern.",
                correct="Nachrichten sind neutral. Meinung in Kommentar.",
                note="Trennung von Nachricht und Kommentar ist journalistisches Grundprinzip.",
            ),
        ],
        related=[
            "wissenschaftssprache",
            "textanalyse",
            "argumentation",
            "stilistik",
            "gehobene-sprache",
        ],
    ),
    GrammarTopic(
        slug="akademisches-schreiben",
        title="Akademisches Schreiben",
        level="C2",
        category="Stil",
        summary="Akademisches Schreiben – Arbeit strukturieren, Argumente aufbauen, Zitierkonventionen.",
        explanation="""Aufbau: Einleitung (Forschungsfrage) → Theoretischer Rahmen/Literaturüberblick → Methodik → Ergebnisse (nur Deskription) → Diskussion (Interpretation) → Fazit/Ausblick.
Zitiertechniken: Direkt (Müller 2020: 45), indirekt/Paraphrase (Müller 2020 zufolge...), Harvard-Zitierweise.
Akademische Phrasen: Im Folgenden wird... untersucht. / Aus den Ergebnissen geht hervor... / Demgegenüber argumentiert Schmidt... / Zusammenfassend lässt sich konstatieren...
Hedging ist Pflicht: Daten deuten hin, nicht Daten beweisen. Ich vermeiden in den meisten Fächern.""",
        structure="Einleitung → Theorie → Methode → Ergebnisse → Diskussion → Fazit",
        rules=[
            "Klare Forschungsfrage ist essentiell.",
            "Ergebnisse und Diskussion sind getrennte Kapitel.",
            "Jede fremde Aussage muss zitiert werden.",
            "Hedging und unpersönliche Konstruktionen sind Standard.",
        ],
        examples=[
            GrammarExample(
                text="Die vorliegende Arbeit untersucht die Frage, inwiefern...",
                translation=None,
            ),
            GrammarExample(
                text="Wie Müller (2020) darlegt, ist dieser Zusammenhang signifikant.",
                translation=None,
            ),
            GrammarExample(
                text="Die Ergebnisse deuten darauf hin, dass ein Zusammenhang besteht (vgl. Abb. 3).",
                translation=None,
            ),
            GrammarExample(
                text="Zusammenfassend kann festgehalten werden, dass Hypothese 1 bestätigt wurde.",
                translation=None,
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Ergebnisse und Diskussion vermischen.",
                correct="Ergebnisse: Desktription. Diskussion: Interpretation.",
                note="Strikte Trennung ist akademisches Qualitätsmerkmal.",
            ),
        ],
        related=["wissenschaftssprache", "synthese", "argumentation", "textsorten"],
    ),
    GrammarTopic(
        slug="kreatives-schreiben",
        title="Kreatives Schreiben",
        level="C2",
        category="Stil",
        summary="Kreatives Schreiben – stilistisch anspruchsvolle Prosa und Lyrik auf Deutsch verfassen.",
        explanation="""Genres: Kurzgeschichte (pointiert, offenes Ende), Gedicht (Metrum: Jambus, Trochäus; Reimschema: Paarreim, Kreuzreim), Erzählung/Romanauszug (Präteritum).
Schreibtechniken: Show, don't tell: Nicht Er war wütend, sondern Seine Hände ballten sich zu Fäusten. Sinnliche Details. Variierende Satzlänge. Erlebte Rede.
Dialoge mit abwechslungsreichen Inquit-Formeln: flüsterte, murmelte, rief, seufzte, erwiderte.
Lyrik: bewusster Rhythmus, auch in freien Versen.""",
        structure="Genre wählen → Erzählperspektive festlegen → sprachliche Mittel einsetzen → Wirkung kontrollieren",
        rules=[
            "Show, don't tell ist zentrales erzählerisches Prinzip.",
            "Dialoge brauchen Variation der Inquit-Formeln.",
            "Gedichte folgen metrischen und klanglichen Prinzipien.",
            "Erzählperspektive und Tempus müssen einheitlich sein.",
        ],
        examples=[
            GrammarExample(
                text="Seine Hände zitterten, als er den Brief öffnete. Drinnen: nichts. Nur Stille.",
                translation=None,
                note="Kurzgeschichte",
            ),
            GrammarExample(
                text="Der Nebel hing schwer über den Feldern, als wäre die Welt in Watte gepackt.",
                translation=None,
                note="Literarische Prosa",
            ),
            GrammarExample(
                text="Das glaubst du doch selbst nicht, murmelte sie und wandte sich ab.",
                translation=None,
                note="Dialog",
            ),
            GrammarExample(
                text="Die Turmuhr schlug Mitternacht. Zwölf schwere Schläge. Und dann Stille.",
                translation=None,
                note="Atmosphäre, kurze Sätze",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Immer nur sagte er und fragte sie.",
                correct="Variieren: flüsterte, murmelte, rief, seufzte, erwiderte.",
                note="Abwechslungsreiche Inquit-Formeln machen Dialoge lebendig.",
            ),
        ],
        related=[
            "erzaehlperspektiven",
            "literarische-mittel",
            "literarische-erzaehlung",
            "stilistik",
        ],
    ),
    GrammarTopic(
        slug="nuancen",
        title="Fortgeschrittene Nuancen",
        level="C2",
        category="Wortschatz",
        summary="Fortgeschrittene Nuancen – feine semantische Unterschiede zwischen bedeutungsähnlichen Wörtern.",
        explanation="""Feine Unterschiede: anfangen (spontan, ugs.) vs beginnen (formell, geplant). mögen (allgemein) vs gefallen (ästhetisch) vs lieben (stark emotional). wissen (Fakten) vs kennen (Vertrautheit) vs können (Fähigkeit). lernen (Wissen aneignen) vs studieren (Uni) vs erfahren (erhalten durch Mitteilung). sehen (allgemein) vs schauen (süddt., bewusst) vs gucken (norddt., ugs.) vs blicken (intentional). nutzen (Vorteil ziehen) vs benutzen (Gegenstand) vs verwenden (formell) vs anwenden (Methode). reden (längerer Beitrag) vs sprechen (Fähigkeit) vs sagen (kurze Mitteilung) vs erzählen (Geschichte).""",
        structure="Synonympaare mit feinen Bedeutungs- oder Registernuancen",
        rules=[
            "Auf C2-Niveau feine Unterschiede zwischen Synonymen beherrschen.",
            "Wortwahl hängt von Kontext, Register und präziser Bedeutung ab.",
            "wissen/kennen/können und anfangen/beginnen sind typische C2-Unterscheidungen.",
            "Muttersprachliche Flüssigkeit zeigt sich im richtigen Gebrauch dieser Nuancen.",
        ],
        examples=[
            GrammarExample(
                text="Ich kenne ihn gut, aber ich weiß nicht, wo er wohnt.",
                translation=None,
                note="kennen vs wissen",
            ),
            GrammarExample(
                text="Der Film hat mir gut gefallen. — Ich mag Komödien. — Ich liebe dich.",
                translation=None,
                note="gefallen vs mögen vs lieben",
            ),
            GrammarExample(
                text="Sie studiert an der Humboldt-Universität. — Er lernt für die Prüfung.",
                translation=None,
                note="studieren vs lernen",
            ),
            GrammarExample(
                text="Das Handy kann ich gut gebrauchen! — Verwenden Sie bitte einen Kugelschreiber.",
                translation=None,
                note="gebrauchen vs verwenden",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Ich weiß ihn gut.",
                correct="Ich kenne ihn gut.",
                note="Wissen nur für Fakten. Personen und Orte: kennen.",
            ),
        ],
        related=["konnotationen", "falsche-freunde", "modalpartikeln", "uebersetzung"],
    ),
    GrammarTopic(
        slug="modalpartikeln",
        title="Deutsche Modalpartikeln",
        level="C2",
        category="Wortschatz",
        summary="Deutsche Modalpartikeln – doch, ja, eben, halt, wohl, denn, mal ... das Geheimnis, muttersprachlich zu klingen.",
        explanation="""Modalpartikeln (Abtönungspartikeln) sind der Schlüssel zu muttersprachlichem Deutsch: doch (Widerspruch, Erinnerung, freundliche Aufforderung), ja (Bekanntes, Überraschung), eben/halt (Unabänderlichkeit, Resignation), wohl (Vermutung), denn (Interesse in Fragen), mal (Abschwächung), eigentlich (Themenwechsel), etwa (negative Erwartung in Fragen), ruhig (Ermutigung), bloß/nur (Warnung), schon (Zuversicht).
Kombinationen: Das ist doch wohl nicht dein Ernst! Komm doch mal vorbei!
Abgrenzung: Gradpartikeln (sehr, besonders) vs Fokuspartikeln (nur, sogar) vs Modalpartikeln (doch, ja, halt).""",
        structure="Modalpartikel = unbetont, unflektierbar, drückt Sprechereinstellung aus",
        rules=[
            "Modalpartikeln sind der Schlüssel zu natürlichem Deutsch.",
            "Doch markiert Widerspruch, ja geteiltes Wissen.",
            "Eben/halt drückt Resignation aus.",
            "Mal macht Aufforderungen weicher.",
            "Denn in Fragen signalisiert freundliches Interesse.",
        ],
        examples=[
            GrammarExample(
                text="Das ist doch ganz einfach!",
                translation=None,
                note="doch = Widerspruch",
            ),
            GrammarExample(
                text="Was machst du denn da?",
                translation=None,
                note="denn = Interesse",
            ),
            GrammarExample(
                text="Komm mal her!", translation=None, note="mal = abschwächend"
            ),
            GrammarExample(
                text="Das ist ja wunderbar!",
                translation=None,
                note="ja = Überraschung",
            ),
            GrammarExample(
                text="Dann musst du eben Geduld haben.",
                translation=None,
                note="eben = Resignation",
            ),
            GrammarExample(
                text="Er wird wohl den Zug verpasst haben.",
                translation=None,
                note="wohl = Vermutung",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Denn in Aussagen: Ich gehe denn nach Hause.",
                correct="Denn als Modalpartikel nur in Fragen. Ich gehe dann nach Hause.",
                note="In Aussagen ist denn nur als Konjunktion verwendbar.",
            ),
        ],
        related=["ja-nein-doch", "nuancen", "konnotationen", "ironie", "uebersetzung"],
    ),
    GrammarTopic(
        slug="integration-grammatisch",
        title="Grammatische Integration",
        level="C2",
        category="Syntax",
        summary="Grammatische Integration – spontane Produktion komplexer Strukturen im freien Sprechen.",
        explanation="""Grammatische Integration: Fähigkeit, komplexe Strukturen spontan, flüssig und fehlerfrei in freie Rede zu integrieren. Automatisierte Kongruenz, Satzklammer-Management, Register-Flexibilität.
Herausforderungen: Satzklammer bei weiten Distanzen, Genus bei seltenen Wörtern, Rektion von Verben mit präpositionalem Objekt.
Strategien: Chunking (häufige Strukturen automatisieren), Monitoring (Eigensprechen überwachen), Shadowing, Reformulierung in Echtzeit.
Selbstmonitoring und Selbstkorrektur sind Zeichen hoher Kompetenz.""",
        structure="Automatisierung + Monitoring + Selbstkorrektur = integrierte grammatische Kompetenz",
        rules=[
            "Automatisierter, fehlerfreier Abruf in Echtzeit.",
            "Satzklammer bei großen Distanzen ist typische Herausforderung.",
            "Genus und Rektion müssen automatisiert sein.",
            "Selbstkorrektur ohne Kommunikationsabbruch.",
        ],
        examples=[
            GrammarExample(
                text="Ich hätte das, wenn ich ehrlich bin, nicht anders gemacht, auch wenn es vielleicht komplizierter gewesen wäre.",
                translation=None,
            ),
            GrammarExample(
                text="Das, was ich eigentlich sagen wollte, bevor du mich unterbrochen hast, ist, dass wir das Meeting verschieben müssen.",
                translation=None,
            ),
            GrammarExample(
                text="Worauf ich hinauswill, ist Folgendes: Wir brauchen einen neuen Ansatz.",
                translation=None,
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Bei langen Satzklammern den zweiten Teil vergessen.",
                correct="Satzklammer bewusst abschließen. Bei Unsicherheit: kürzere Sätze.",
                note="Vergessen des zweiten Klammerteils ist typisches Problem.",
            ),
        ],
        related=["komplexe-satzgefuege", "fluessigkeit", "alle-modi", "stilistik"],
    ),
    GrammarTopic(
        slug="fluessigkeit",
        title="Muttersprachliche Flüssigkeit",
        level="C2",
        category="Stil",
        summary="Muttersprachliche Flüssigkeit – Prosodie, Intonation, Rhythmus, ganzheitliche Integration.",
        explanation="""Dimensionen: Lexikalische Flüssigkeit (automatischer Wortabruf), grammatische Flüssigkeit (intuitive Grammatik), phonetische Flüssigkeit (Prosodie, Intonation), pragmatische Flüssigkeit (situativ angemessen), interaktionale Flüssigkeit (Turn-taking, Reparaturen).
Prosodie: Satzakzent (Ich habe das BUCH gelesen vs ICH habe das Buch gelesen), Wortakzent (verKAUfen, nicht VERkaufen), Sprechmelodie (fallend = Aussage, steigend = Frage), Pausen zwischen Sinnabschnitten.
C2 ≠ Perfektion: Auch C2-Sprecher machen Fehler. Entscheidend ist die Geschwindigkeit der Selbstkorrektur und die Seltenheit der Fehler.""",
        structure="Lexikalisch + grammatisch + phonetisch + pragmatisch + interaktional = holistische Flüssigkeit",
        rules=[
            "C2-Flüssigkeit ist Integration aller Teilkompetenzen.",
            "Prosodie und Intonation sind wesentlich.",
            "Selbstkorrektur ist Merkmal hoher Kompetenz.",
            "Fehler passieren — entscheidend ist Frequenz und Korrekturfähigkeit.",
        ],
        examples=[
            GrammarExample(
                text="Naja, das ist halt so — was will man machen?",
                translation=None,
                note="mit Modalpartikeln",
            ),
            GrammarExample(
                text="Ich würde sagen — also, wenn Sie mich fragen — dass wir den Termin besser verschieben sollten.",
                translation=None,
                note="flüssige Modifikation",
            ),
            GrammarExample(
                text="Also, um es kurz zu machen: Die Sache ist die...",
                translation=None,
                note="natürliche Diskurssteuerung",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Flüssigkeit mit Schnelligkeit verwechseln.",
                correct="Flüssigkeit ist mühelose, genaue Kommunikation, nicht bloße Geschwindigkeit.",
                note="Genauigkeit und Angemessenheit sind ebenso zentral.",
            ),
        ],
        related=["integration-grammatisch", "stilistik", "modalpartikeln", "nuancen", "alle-modi"],
    ),
]
