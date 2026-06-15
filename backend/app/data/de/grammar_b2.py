"""German grammar topics — B2."""

from app.data._types import GrammarExample, GrammarMistake, GrammarTopic

B2_GRAMMAR_TOPICS: list[GrammarTopic] = [
    GrammarTopic(
        slug="konjunktiv-ii-vergangenheit",
        title="Konjunktiv II Vergangenheit",
        level="B2",
        category="Modi",
        summary="Konjunktiv II der Vergangenheit – hätte gemacht, wäre gegangen für irreale Vergangenheit.",
        explanation="""Der **Konjunktiv II der Vergangenheit** drückt irreale Situationen in der Vergangenheit aus: **hätte/wäre + Partizip II**.
Ich hätte gelernt. / Ich wäre gegangen. / Er hätte angerufen. / Sie wäre geblieben.

Mit Modalverben: **hätte + Infinitiv + Modalverb** (Doppelinfinitiv) — *Ich hätte kommen können.* / *Er hätte das machen müssen.*

Vorwürfe mit sollen: *Du hättest früher kommen sollen!*
Verpasste Gelegenheiten: *Ich hätte gern mitgemacht, aber ich hatte keine Zeit.*
Irreale Vergleiche: *Er tut so, als hätte er nichts gewusst.*""",
        structure="hätte/wäre (Konjunktiv II) + Partizip II / Mit Modalverb: hätte + Infinitiv + Modalverb",
        rules=[
            "Konjunktiv II Vergangenheit: hätte/wäre + Partizip II.",
            "Bei Modalverben: hätte + Infinitiv + Modalverb (Doppelinfinitiv).",
            '"Hätte" für haben-Verben, "wäre" für sein-Verben.',
            "Drückt irreale Vergangenheit, Vorwürfe und verpasste Gelegenheiten aus.",
            'Im Nebensatz: "..., dass ich das hätte machen sollen."',
        ],
        examples=[
            GrammarExample(
                text="Ich hätte gern mehr Zeit gehabt.",
                translation=None,
            ),
            GrammarExample(
                text="Wenn ich das gewusst hätte, wäre ich zu Hause geblieben.",
                translation=None,
            ),
            GrammarExample(
                text="Du hättest mich anrufen sollen!",
                translation=None,
                note="Vorwurf",
            ),
            GrammarExample(
                text="Er tat so, als wäre nichts passiert.",
                translation=None,
            ),
            GrammarExample(
                text="Wir hätten früher losfahren müssen.",
                translation=None,
            ),
            GrammarExample(
                text="Das hätte ich nicht besser machen können.",
                translation=None,
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Wenn ich das gewusst würde, wäre ich zu Hause geblieben.",
                correct="Wenn ich das gewusst hätte, wäre ich zu Hause geblieben.",
                note='Irreale Vergangenheit braucht "hätte" + Partizip II, nicht "würde".',
            ),
            GrammarMistake(
                wrong="Ich hätte das machen gekonnt.",
                correct="Ich hätte das machen können.",
                note="Bei Modalverben: Doppelinfinitiv. Können bleibt im Infinitiv.",
            ),
        ],
        related=[
            "konjunktiv-ii-haette-waere",
            "irreale-bedingungen",
            "plusquamperfekt",
            "modalverben",
        ],
    ),
    GrammarTopic(
        slug="irreale-bedingungen",
        title="Irreale Bedingungen",
        level="B2",
        category="Modi",
        summary="Irreale Bedingungssätze – wenn-Sätze in Gegenwart und Vergangenheit mit Konjunktiv II.",
        explanation="""**Irreale Bedingungen** beschreiben hypothetische Situationen und ihre Konsequenzen.

Gegenwart/Zukunft: **Wenn + Konjunktiv II (Präsens), (dann) Konjunktiv II (Präsens)** — *Wenn ich reich **wäre**, **würde** ich ein Haus kaufen.*

Vergangenheit: **Wenn + Konjunktiv II (Vergangenheit), (dann) Konjunktiv II (Vergangenheit)** — *Wenn ich mehr gelernt **hätte**, **hätte** ich die Prüfung bestanden.*

Ohne wenn — Verb an Position 1: ***Hätte** ich mehr gelernt, (dann) hätte ich die Prüfung bestanden.* / ***Wäre** ich reich, würde ich ein Haus kaufen.*

**Reale vs irreale Bedingungen:**
Real: *Wenn ich Zeit habe, komme ich.*
Irreal: *Wenn ich Zeit hätte, würde ich kommen.*""",
        structure="Gegenwart: Wenn + Konjunktiv II, (dann) Konjunktiv II / Vergangenheit: Wenn + hätte/wäre + PII, (dann) hätte/wäre + PII / Ohne wenn: Verb (Konj. II) + Subjekt + ...",
        rules=[
            "Irreale Gegenwart: Konjunktiv II Präsens (wäre, hätte, würde + Infinitiv).",
            "Irreale Vergangenheit: hätte/wäre + Partizip II.",
            '"Wenn" kann weggelassen werden — dann steht das konjugierte Verb an Position 1.',
            'Im Hauptsatz steht "dann" (optional) oder das Verb direkt an Position 1.',
            "Mit Modalverben im Vergangenheits-Konjunktiv: hätte + Infinitiv + Modalverb.",
        ],
        examples=[
            GrammarExample(
                text="Wenn ich mehr Geld hätte, würde ich reisen.",
                translation=None,
            ),
            GrammarExample(
                text="Hätte ich mehr gelernt, hätte ich die Prüfung bestanden.",
                translation=None,
                note="ohne wenn",
            ),
            GrammarExample(
                text="Wenn du mich gefragt hättest, hätte ich dir geholfen.",
                translation=None,
            ),
            GrammarExample(
                text="An deiner Stelle würde ich das Angebot annehmen.",
                translation=None,
            ),
            GrammarExample(
                text="Wäre das Wetter besser, könnten wir rausgehen.",
                translation=None,
            ),
            GrammarExample(
                text="Wenn er kommen würde, wäre ich sehr froh.",
                translation=None,
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Wenn ich du wäre, würde ich das mache.",
                correct="Wenn ich du wäre, würde ich das machen.",
                note='Nach "würde" steht immer der Infinitiv: "machen".',
            ),
            GrammarMistake(
                wrong="Wenn ich Zeit hätte, ich würde kommen.",
                correct="Wenn ich Zeit hätte, würde ich kommen.",
                note="Nach dem wenn-Satz beginnt der Hauptsatz mit dem konjugierten Verb.",
            ),
        ],
        related=[
            "konjunktiv-ii-wuerde",
            "konjunktiv-ii-haette-waere",
            "konjunktiv-ii-vergangenheit",
            "nebensatz-wenn",
        ],
    ),
    GrammarTopic(
        slug="passiv-erweitert",
        title="Erweitertes Passiv",
        level="B2",
        category="Passiv",
        summary="Erweitertes Passiv – Passiv in allen Zeitformen inklusive Perfekt, Plusquamperfekt, Futur II.",
        explanation="""Das **erweiterte Passiv** umfasst das Vorgangspassiv in **allen Zeitformen**:

Präsens: Es wird gemacht. | Präteritum: Es wurde gemacht. | Perfekt: Es ist gemacht **worden**. | Plusquamperfekt: Es war gemacht **worden**. | Futur I: Es wird gemacht **werden**. | Futur II: Es wird gemacht **worden sein**.

**Unpersönliches Passiv:** Auch intransitive Verben können ein Passiv bilden (mit *es* als Platzhalter): *Es wurde getanzt. / Ihm wurde geholfen. / Heute wird nicht gearbeitet.*

Zustandspassiv — alle Zeiten: Präsens: Es ist gemacht. Präteritum: Es war gemacht. Futur I: Es wird gemacht sein.""",
        structure="Vorgangspassiv: werden + Partizip II / Zustandspassiv: sein + Partizip II / Passiv Modal: Modalverb + Partizip II + werden",
        rules=[
            'Im Perfekt Passiv: "ist ... worden" (nicht: geworden).',
            'Im Plusquamperfekt Passiv: "war ... worden".',
            'Futur II Passiv: "wird ... worden sein".',
            'Intransitive Verben können ein unpersönliches Passiv mit "es" bilden.',
            'Das unpersönliche Passiv wird oft ohne "es" verwendet: "Gestern wurde getanzt."',
        ],
        examples=[
            GrammarExample(
                text="Das Haus ist letztes Jahr gebaut worden.",
                translation=None,
                note="Perfekt",
            ),
            GrammarExample(
                text="Das Projekt war bereits abgeschlossen worden.",
                translation=None,
                note="Plusquamperfekt",
            ),
            GrammarExample(
                text="Es wurde viel gelacht und getanzt.",
                translation=None,
                note="unpersönliches Passiv",
            ),
            GrammarExample(
                text="Am Sonntag wird nicht gearbeitet.",
                translation=None,
                note="unpersönlich ohne es",
            ),
            GrammarExample(
                text="Ihm ist von allen Seiten geholfen worden.",
                translation=None,
                note="Dativ + Passiv",
            ),
            GrammarExample(
                text="Die Arbeit wird bis morgen erledigt worden sein.",
                translation=None,
                note="Futur II",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Es ist gemacht geworden.",
                correct="Es ist gemacht worden.",
                note='Perfekt Passiv: "worden", nicht "geworden".',
            ),
            GrammarMistake(
                wrong="Das Resultat ist untersucht geworden sein.",
                correct="Das Resultat wird untersucht worden sein.",
                note='Futur II Passiv: "wird ... worden sein".',
            ),
        ],
        related=["passiv-werden", "passiv-zustand", "passiv-modalverben", "passiv-ersatz"],
    ),
    GrammarTopic(
        slug="passiv-ersatz",
        title="Passiversatz",
        level="B2",
        category="Passiv",
        summary="Passiversatzformen – sein + zu + Infinitiv, sich lassen + Infinitiv, -bar-Adjektive.",
        explanation="""Alternativen zum Standard-Passiv:

1. **sein + zu + Infinitiv** (Notwendigkeit/Möglichkeit): *Das Problem **ist zu lösen**.* = Das Problem muss/kann gelöst werden.

2. **sich lassen + Infinitiv** (Möglichkeit): *Das Fenster **lässt sich öffnen**.* = Das Fenster kann geöffnet werden.

3. **Adjektiv auf -bar/-lich** (Möglichkeit): *Das Wasser **ist trinkbar**.* / *Der Fehler **ist unverzeihlich**.* / lösbar, erreichbar, sichtbar, hörbar

4. **bekommen/kriegen + Partizip II** (Rezipientenpassiv): *Er **bekam** das Buch **geschenkt**.* = Ihm wurde das Buch geschenkt.

5. **gehören + Partizip II** (regional, Notwendigkeit): *Diese Tür **gehört repariert**!*""",
        structure="sein + zu + Infinitiv = müssen/können + PII + werden / sich lassen + Infinitiv = können + PII + werden",
        rules=[
            '"Sein + zu + Infinitiv" drückt Notwendigkeit (müssen) oder Möglichkeit (können) aus.',
            '"Sich lassen + Infinitiv" drückt immer Möglichkeit (können) aus.',
            'Adjektive auf -bar und -lich sind Passiversatz für "kann gemacht werden".',
            '"Gehören + Partizip II" ist eine regionale Form für "muss gemacht werden".',
            '"Bekommen + Partizip II" ist das Rezipientenpassiv (Dativ-Passiv).',
        ],
        examples=[
            GrammarExample(
                text="Die Aufgabe ist bis morgen zu erledigen.",
                translation=None,
            ),
            GrammarExample(
                text="Dieses Problem lässt sich leicht lösen.",
                translation=None,
            ),
            GrammarExample(
                text="Der Text ist kaum lesbar.",
                translation=None,
                note="-bar",
            ),
            GrammarExample(
                text="Die Fehler sind unvermeidlich.",
                translation=None,
                note="-lich",
            ),
            GrammarExample(
                text="Er bekam ein Buch geschenkt.",
                translation=None,
                note="Rezipientenpassiv",
            ),
            GrammarExample(
                text="Das gehört sofort erledigt!",
                translation=None,
                note="regional",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Das Problem ist lösbar. vs Das Problem ist zu lösen.",
                correct="lösbar = allgemein möglich. zu lösen = Notwendigkeit: muss gelöst werden.",
                note='Achtung auf den Bedeutungsunterschied: "zu + Infinitiv" kann Möglichkeit oder Notwendigkeit bedeuten.',
            ),
            GrammarMistake(
                wrong="Das hat zu machen.",
                correct="Das ist zu machen. / Das muss gemacht werden.",
                note='"Sein + zu + Infinitiv", nicht "haben".',
            ),
        ],
        related=["passiv-werden", "lassen", "partizip-ii-adj", "infinitiv-mit-zu"],
    ),
    GrammarTopic(
        slug="nominalisierung",
        title="Nominalisierung",
        level="B2",
        category="Syntax",
        summary="Nominalisierung – Verben und Adjektive in Nomen umwandeln für formellen/akademischen Stil.",
        explanation="""Nominalisierung ist die Umwandlung von Verben oder Adjektiven in Substantive. Typische Suffixe: -ung (Entwicklung), -heit/-keit (Freiheit, Möglichkeit), -tion (Information), -schaft (Freundschaft).
Aus Nebensatz → Nominalphrase: Weil das Wetter schlecht war → Wegen des schlechten Wetters. Nachdem er angekommen war → Nach seiner Ankunft.""",
        structure="Verb/Adjektiv + Nominalsuffix (-ung, -heit, -keit, -tion) → Nomen / Satz → Nominalphrase mit Präposition + Genitiv",
        rules=[
            "Häufige Nominalsuffixe: -ung, -heit, -keit, -tion, -schaft.",
            "Nominalisierte Verben sind meist feminin oder neutral.",
            "Aus einem Satz kann eine Nominalphrase mit Genitiv werden.",
            "Nominalisierung macht Texte formeller und kompakter.",
        ],
        examples=[
            GrammarExample(
                text="wegen des schlechten Wetters", translation=None
            ),
            GrammarExample(text="nach seiner Ankunft", translation=None),
            GrammarExample(
                text="Die Entwicklung der Sprache dauert Jahrhunderte.",
                translation=None,
            ),
            GrammarExample(
                text="vor der Entscheidung des Gerichts", translation=None
            ),
            GrammarExample(
                text="trotz der Schwierigkeiten bei der Umsetzung",
                translation=None,
            ),
            GrammarExample(
                text="Die Richtigkeit der Aussage wurde bezweifelt.",
                translation=None,
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Wegen des schlechtes Wetter",
                correct="Wegen des schlechten Wetters",
                note="Genitiv: Adjektiv und Nomen müssen dekliniert werden.",
            ),
            GrammarMistake(
                wrong="Die Besprechung von die Lösung",
                correct="Die Besprechung der Lösung",
                note='Im Nominalstil wird Genitiv statt "von" verwendet.',
            ),
        ],
        related=["verbalisierung", "genitiv", "genitiv-praepositionen", "nomen-verb-verbindungen"],
    ),
    GrammarTopic(
        slug="verbalisierung",
        title="Verbalisierung",
        level="B2",
        category="Syntax",
        summary="Verbalisierung – Nomen in Verben umwandeln, um Sätze einfacher und direkter zu machen.",
        explanation="""Verbalisierung ist das Gegenteil der Nominalisierung: Nomen werden in Verben umgewandelt — macht Texte lebendiger.
Nominalstil → Verbalstil: Die Durchführung des Projekts erfolgte planmäßig → Das Projekt wurde planmäßig durchgeführt.
Funktionsverbgefüge → einfaches Verb: zur Anwendung bringen → anwenden, in Erwägung ziehen → erwägen.""",
        structure="Nomen (+ Funktionsverb) → Einfaches Verb / Nominalphrase → Nebensatz oder eigenständiger Satz",
        rules=[
            "Verbalisierung macht Texte lebendiger und dynamischer.",
            "Funktionsverbgefüge kann durch einfaches Verb ersetzt werden.",
            "Im Alltag ist Verbalstil zu bevorzugen.",
            "In Wissenschaft und formellen Texten dominiert Nominalstil.",
        ],
        examples=[
            GrammarExample(
                text="Nachdem er den Vertrag unterschrieben hatte...",
                translation=None,
                note="statt: Nach der Unterzeichnung...",
            ),
            GrammarExample(
                text="Wir müssen das Problem lösen.",
                translation=None,
                note="statt: Die Lösung des Problems ist notwendig.",
            ),
            GrammarExample(
                text="Das neue Gesetz wurde eingeführt.",
                translation=None,
                note="verbal, lebendig",
            ),
            GrammarExample(
                text="Er bewies seine Unschuld.",
                translation=None,
                note="statt: Er stellte seine Unschuld unter Beweis.",
            ),
        ],
        common_mistakes=[],
        related=["nominalisierung", "passiv-ersatz", "textkonnektoren"],
    ),
    GrammarTopic(
        slug="partizip-i-adj",
        title="Partizip I als Adjektiv",
        level="B2",
        category="Adjektive",
        summary="Das Partizip I als Adjektiv – der lachende Mann, das schreiende Kind.",
        explanation="""Das **Partizip I**: **Infinitiv + -d** → aktiv und gleichzeitig. lachen → lachend, weinen → weinend, schlafen → schlafend.
Attributiv: Das weinende Kind. Adverbial: Er kam lachend ins Zimmer. Substantiviert (groß): der Reisende, die Studierende.
Partizip I vs II: der schreibende Student (aktiv, gleichzeitig) vs der geschriebene Brief (passiv, vorzeitig).""",
        structure="Infinitiv + -d = Partizip I (aktiv, gleichzeitig, unvollendet)",
        rules=[
            "Partizip I = Infinitiv + -d. Immer aktiv und gleichzeitig.",
            "Als Adjektiv vor dem Nomen muss es dekliniert werden.",
            "Partizip I kann auch adverbial verwendet werden (ohne Endung).",
            "Substantivierte Partizip I werden großgeschrieben: der/die Reisende.",
        ],
        examples=[
            GrammarExample(
                text="Das lachende Kind spielt im Garten.",
                translation=None,
            ),
            GrammarExample(
                text="Eine wachsende Zahl von Menschen lernt Deutsch.",
                translation=None,
            ),
            GrammarExample(
                text="Er verließ singend das Haus.",
                translation=None,
                note="adverbial",
            ),
            GrammarExample(
                text="Die kommenden Wochen werden anstrengend.",
                translation=None,
            ),
            GrammarExample(
                text="Der Reisende wartet auf den Zug.",
                translation=None,
                note="substantiviert",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="der singene Mann",
                correct="der singende Mann",
                note="Das Partizip I endet auf -d, nicht auf -en.",
            ),
        ],
        related=["partizip-ii-adj", "partizipialattribute", "adjektivdeklination-best"],
    ),
    GrammarTopic(
        slug="partizip-ii-adj",
        title="Partizip II als Adjektiv",
        level="B2",
        category="Adjektive",
        summary="Das Partizip II als Adjektiv – das geschriebene Buch, der geöffnete Brief.",
        explanation="""Partizip II als Adjektiv: abgeschlossene Handlung, meist passiv: der geschriebene Brief (der Brief, der geschrieben wurde).
Bei sein-Verben (Perfekt mit sein): AKTIVE Bedeutung! der eingeschlafene Mann = der Mann, der eingeschlafen ist.
Substantiviert: der Angestellte, der Verletzte, die Geliebte. Muss vor dem Nomen dekliniert werden.""",
        structure="Partizip II + Adjektivdeklination = abgeschlossene, meist passive Eigenschaft",
        rules=[
            "Partizip II als Adjektiv hat meist passive Bedeutung.",
            "Bei sein-Verben hat das Partizip II aktive Bedeutung.",
            "Partizip II vor dem Nomen muss dekliniert werden.",
            "Substantivierte Partizipien werden großgeschrieben: der Angestellte.",
        ],
        examples=[
            GrammarExample(
                text="der geschriebene Brief", translation=None, note="passiv"
            ),
            GrammarExample(
                text="das verlassene Haus", translation=None, note="passiv"
            ),
            GrammarExample(
                text="der eingeschlafene Patient",
                translation=None,
                note="aktiv — sein-Verb!",
            ),
            GrammarExample(
                text="Der Verletzte wurde ins Krankenhaus gebracht.",
                translation=None,
                note="substantiviert",
            ),
            GrammarExample(
                text="die gerade angekommene E-Mail",
                translation=None,
                note="aktiv — sein-Verb!",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="der geschriebt Brief",
                correct="der geschriebene Brief",
                note="Partizip II muss als Adjektiv dekliniert werden.",
            ),
        ],
        related=[
            "partizip-i-adj",
            "partizipialattribute",
            "partizip-ii",
            "adjektivdeklination-best",
        ],
    ),
    GrammarTopic(
        slug="partizipialattribute",
        title="Erweiterte Partizipialattribute",
        level="B2",
        category="Adjektive",
        summary="Erweiterte Partizipialattribute – komplexe Nominalphrasen mit Partizipien.",
        explanation="""Erweiterte Partizipialattribute: [Erweiterung(en)] + Partizip + Nomen. Typisch für formelles Deutsch.
Der **gestern in der Zeitung veröffentlichte** Artikel. Die **seit Jahren ständig steigenden** Preise.
Lesestrategie: Finde Artikel → suche Partizip → finde Kernnomen. Alles dazwischen ist Erweiterung.
Kann in Relativsatz aufgelöst werden: Das von der Regierung geplante Gesetz → Das Gesetz, das von der Regierung geplant wurde.""",
        structure="Artikel + (Erweiterung) + Partizip I/II + Kernnomen",
        rules=[
            "Erweiterte Partizipialattribute stehen zwischen Artikel und Nomen.",
            "Das Partizip fungiert als Kopf des Attributs.",
            "Das Kernnomen steht direkt hinter dem Partizip.",
            "Diese Konstruktion kann in Relativsätze aufgelöst werden.",
        ],
        examples=[
            GrammarExample(
                text="der gestern in der Zeitung veröffentlichte Artikel",
                translation=None,
            ),
            GrammarExample(
                text="die seit Jahren steigenden Mieten",
                translation=None,
            ),
            GrammarExample(
                text="das von der Regierung geplante Gesetz",
                translation=None,
            ),
            GrammarExample(
                text="Die im letzten Jahr stark gestiegenen Kosten...",
                translation=None,
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Die steigenden seit Jahren Preise.",
                correct="Die seit Jahren steigenden Preise.",
                note="Die Erweiterung kommt VOR das Partizip, nicht danach.",
            ),
        ],
        related=["partizip-i-adj", "partizip-ii-adj", "relativsaetze", "relativsaetze-erweitert"],
    ),
    GrammarTopic(
        slug="textkonnektoren",
        title="Textverknüpfende Adverbien",
        level="B2",
        category="Syntax",
        summary="Textverbindende Adverbien – allerdings, demnach, folglich, insofern, dennoch.",
        explanation="""Textverknüpfende Adverbien (Konjunktionaladverbien) verbinden Sätze logisch. Sie sind Satzglieder im Hauptsatz — nach ihnen steht das konjugierte Verb auf Position 2.
allerdings (however), demnach (accordingly), folglich (consequently), dennoch (nevertheless), vielmehr (rather).
*Es regnet. Trotzdem gehe ich spazieren.* (nicht: trotzdem ich gehe)
Konsekutiv: also, daher, deshalb, folglich. Konzessiv: trotzdem, dennoch, allerdings. Adversativ: dagegen, hingegen.""",
        structure="Konjunktionaladverb (Position 1) + konjugiertes Verb (Position 2) + Subjekt + ...",
        rules=[
            "Konjunktionaladverbien sind Satzglieder, keine Subjunktionen.",
            "Sie stehen meist auf Position 1 → Verb auf Position 2.",
            "Anders als Subjunktionen verändern sie die Satzstellung nicht.",
            "Allerdings und dennoch drücken Einschränkung aus, daher und folglich Konsequenz.",
        ],
        examples=[
            GrammarExample(
                text="Der Test war schwer. Allerdings hatten alle genug Zeit.",
                translation=None,
            ),
            GrammarExample(
                text="Er hat wenig gelernt. Folglich hat er die Prüfung nicht bestanden.",
                translation=None,
            ),
            GrammarExample(
                text="Das Projekt ist riskant. Dennoch sollten wir es versuchen.",
                translation=None,
            ),
            GrammarExample(
                text="Das Wetter war schlecht. Nichtsdestoweniger gingen wir spazieren.",
                translation=None,
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Es regnet, trotzdem ich gehe spazieren.",
                correct="Es regnet. Trotzdem gehe ich spazieren.",
                note="Trotzdem ist ein Adverb, keine Subjunktion. Verb auf Position 2.",
            ),
        ],
        related=["zweiteilige-konnektoren", "nebensatz-obwohl", "nebensatz-weil"],
    ),
    GrammarTopic(
        slug="praepositionen-rektion",
        title="Präpositionen mit festem Kasus",
        level="B2",
        category="Präpositionen",
        summary="Systematischer Überblick über Präpositionen und die von ihnen regierten Fälle.",
        explanation="""Vollständige Systematik:
Nur Akkusativ: durch, für, gegen, ohne, um, bis, entlang (nachgestellt)
Nur Dativ: mit, nach, zu, bei, von, aus, seit, gegenüber, außer
Nur Genitiv: wegen, trotz, während, statt, innerhalb, außerhalb, aufgrund, bezüglich
Wechselpräpositionen: in, an, auf, hinter, neben, vor, unter, über, zwischen → Wo? Dativ / Wohin? Akkusativ
Besonderheit: entlang nachgestellt mit Akk, vorangestellt mit Gen/Dat.""",
        structure="Nur Akk: durch, für, gegen, ohne, um, bis / Nur Dat: mit, nach, zu, bei, von, aus, seit / Nur Gen: wegen, trotz, während, statt / Wechsel: in, an, auf, hinter, neben, vor, unter, über, zwischen",
        rules=[
            '"Durch, für, gegen, ohne, um, bis, entlang" regieren immer Akkusativ.',
            '"Mit, nach, zu, bei, von, aus, seit, gegenüber, außer" regieren immer Dativ.',
            "Wechselpräpositionen: Wo? = Dativ, Wohin? = Akkusativ.",
            '"Entlang" ist eine Besonderheit: nachgestellt Akk., vorangestellt Gen./Dat.',
        ],
        examples=[
            GrammarExample(
                text="Das Geschenk ist für meinen Bruder.",
                translation=None,
                note="Akkusativ",
            ),
            GrammarExample(
                text="Ich warte auf den Bus.",
                translation=None,
                note="Akkusativ nach auf",
            ),
            GrammarExample(
                text="Er wohnt bei seinen Großeltern.",
                translation=None,
                note="Dativ",
            ),
            GrammarExample(
                text="Wegen des Staus kamen wir zu spät.",
                translation=None,
                note="Genitiv",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Trotz das Wetter gingen wir raus.",
                correct="Trotz des Wetters gingen wir raus.",
                note='"Trotz" verlangt Genitiv.',
            ),
        ],
        related=[
            "akkusativ",
            "dativ-basic",
            "genitiv",
            "wechselpraepositionen",
            "lokalpraepositionen",
        ],
    ),
    GrammarTopic(
        slug="nomen-verb-verbindungen",
        title="Nomen-Verb-Verbindungen",
        level="B2",
        category="Syntax",
        summary="Nomen-Verb-Verbindungen – in Anspruch nehmen, zur Verfügung stellen.",
        explanation="""Nomen-Verb-Verbindungen (Funktionsverbgefüge): feste Kombinationen aus Nomen + bedeutungsarmem Verb.
in Anspruch nehmen (beanspruchen), zur Verfügung stellen (bereitstellen), in Erwägung ziehen (erwägen)
in Frage stellen (bezweifeln), unter Beweis stellen (beweisen), Abschied nehmen (sich verabschieden)
in Kauf nehmen (akzeptieren), zur Anwendung bringen (anwenden), eine Entscheidung treffen (entscheiden)
Typisch für formelles Deutsch. Das Verb verliert seine wörtliche Bedeutung.""",
        structure="Präposition + Nomen + Funktionsverb (feststehend) oder Nomen (Akk.) + Funktionsverb",
        rules=[
            "Nomen-Verb-Verbindungen sind feststehende idiomatische Kombinationen.",
            "Sie können oft durch ein einfaches Verb ersetzt werden.",
            "Der Kasus des Nomens ist fest vorgegeben.",
            "Das Funktionsverb verliert seine wörtliche Bedeutung.",
        ],
        examples=[
            GrammarExample(
                text="Wir müssen die Kosten in Kauf nehmen.",
                translation=None,
            ),
            GrammarExample(
                text="Die Firma stellt neue Software zur Verfügung.",
                translation=None,
            ),
            GrammarExample(
                text="Der Plan wurde in Frage gestellt.", translation=None
            ),
            GrammarExample(
                text="Er nahm von seinen Freunden Abschied.",
                translation=None,
            ),
            GrammarExample(
                text="Das Komitee traf eine schnelle Entscheidung.",
                translation=None,
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="in Anspruch ziehen",
                correct="in Anspruch nehmen / in Erwägung ziehen",
                note="Die Verben in FVGs sind fest und dürfen nicht ausgetauscht werden.",
            ),
        ],
        related=["nominalisierung", "verbalisierung", "genitiv"],
    ),
    GrammarTopic(
        slug="literarische-erzaehlung",
        title="Literarische Erzählung",
        level="B2",
        category="Stil",
        summary="Erzählstil – Präteritum für Geschichten, temporale Konnektoren, beschreibende Sprache.",
        explanation="""Literarische Erzählung: Präteritum als Haupterzählzeit. Plusquamperfekt für Vorzeitigkeit.
Temporale Konnektoren: dann, danach, plötzlich, auf einmal, kurz darauf, schließlich, endlich.
Erzählanfänge: Es war einmal... / An einem sonnigen Morgen... / Vor langer Zeit...
Starke Verben im Präteritum: gehen → ging, sehen → sah, geben → gab, kommen → kam, finden → fand.""",
        structure="Präteritum als Grundtempus · Plusquamperfekt für Vorzeitigkeit · Temporale Adverbien für Chronologie",
        rules=[
            "Das Präteritum ist das Grundtempus der schriftlichen Erzählung.",
            "Vorzeitiges wird im Plusquamperfekt ausgedrückt.",
            "Temporale Adverbien strukturieren die Handlung.",
            "Wörtliche Rede kann in indirekte Rede mit Konjunktiv I umgewandelt werden.",
        ],
        examples=[
            GrammarExample(
                text="Es war ein dunkler und stürmischer Abend. Plötzlich klopfte es an der Tür.",
                translation=None,
            ),
            GrammarExample(
                text="Sie hatte das ganze Haus durchsucht, aber den Schlüssel nicht gefunden.",
                translation=None,
                note="Plusquamperfekt + Präteritum",
            ),
            GrammarExample(
                text="Zuerst frühstückte er, dann las er die Zeitung, schließlich ging er zur Arbeit.",
                translation=None,
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Er ist nach Hause gegangen und hat ein Geräusch gehört.",
                correct="Er ging nach Hause und hörte ein Geräusch.",
                note="In schriftlichen Erzählungen verwendet man Präteritum, nicht Perfekt.",
            ),
        ],
        related=[
            "praeteritum-sein-haben",
            "plusquamperfekt",
            "temporale-konnektoren",
            "konjunktiv-i",
            "indirekte-rede",
        ],
    ),
    GrammarTopic(
        slug="medien-presse",
        title="Sprache der Medien",
        level="B2",
        category="Stil",
        summary="Sprache der Medien – Passiv, indirekte Rede, Nominalstil im Journalismus.",
        explanation="""Sprache der Medien (Presse, Nachrichten):
1. Passiv: Das Gesetz wurde gestern verabschiedet.
2. Indirekte Rede mit Konjunktiv I: Der Sprecher erklärte, die Lage sei unter Kontrolle.
3. Nominalstil: Die Verabschiedung des Gesetzes erfolgte gestern.
4. Erweiterte Partizipialattribute: Der von der Opposition kritisierte Gesetzentwurf...
5. Schlagzeilen (elliptisch): Bundestag beschließt neue Klimaziele. Vier Verletzte bei Unfall auf A3.""",
        structure="Passiv + Konjunktiv I + Nominalstil + Partizipialattribute = Mediensprache",
        rules=[
            "Nachrichten verwenden häufig Vorgangspassiv.",
            "Indirekte Rede mit Konjunktiv I zeigt journalistische Distanz.",
            "Nominalstil verdichtet Informationen.",
            "Schlagzeilen lassen Artikel und Hilfsverben oft weg.",
        ],
        examples=[
            GrammarExample(
                text="Der Minister erklärte, die Situation sei unter Kontrolle.",
                translation=None,
                note="Konjunktiv I",
            ),
            GrammarExample(
                text="Das Gesetz wurde mit großer Mehrheit verabschiedet.",
                translation=None,
                note="Passiv",
            ),
            GrammarExample(
                text="Aufgrund der angespannten Lage wurde der Flughafen gesperrt.",
                translation=None,
                note="Nominalstil",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Der Minister erklärte, dass die Lage ist unter Kontrolle.",
                correct="Der Minister erklärte, die Lage sei unter Kontrolle.",
                note="Indirekte Rede in Medien: Konjunktiv I.",
            ),
        ],
        related=[
            "passiv-werden",
            "konjunktiv-i",
            "indirekte-rede",
            "partizipialattribute",
            "nominalisierung",
        ],
    ),
    GrammarTopic(
        slug="n-deklination",
        title="N-Deklination",
        level="B2",
        category="Nomen",
        summary="Die N-Deklination – schwache maskuline Nomen, die in allen Fällen außer Nominativ -en erhalten.",
        explanation="""N-Deklination: maskuline Nomen bekommen im Akk./Dat./Gen. Singular -(e)n.
Maskuline Nomen auf -e (Personen/Tiere): der Junge → den Jungen, dem Jungen, des Jungen. der Kollege, der Kunde, der Löwe.
Auf -ent/-ant/-ist/-oge/-at/-it: der Student → den Studenten, der Elefant → den Elefanten.
Weitere: der Herr (den Herrn), der Mensch (den Menschen), der Nachbar (den Nachbarn).
Ausnahme: das Herz (neutral!) — des Herzens, dem Herzen, das Herz.""",
        structure="Nominativ Sg. (Grundform) → alle anderen Fälle + -(e)n",
        rules=[
            "Maskuline Nomen auf -e (Personen/Tiere) folgen meist der N-Deklination.",
            "Auch Nomen auf -ent, -ant, -ist, -oge, -at, -it.",
            "Im Akkusativ, Dativ und Genitiv Singular: -(e)n.",
            "'Das Herz' ist die einzige neutrale Ausnahme.",
        ],
        examples=[
            GrammarExample(
                text="Ich kenne den Jungen.", translation=None, note="Akkusativ: -n"
            ),
            GrammarExample(
                text="Er spricht mit dem Studenten.",
                translation=None,
                note="Dativ: -en",
            ),
            GrammarExample(
                text="Der Löwe schläft. Ich füttere den Löwen.",
                translation=None,
            ),
            GrammarExample(
                text="Das ist das Haus des Herrn Müller.",
                translation=None,
                note="Genitiv: Herrn",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Ich sehe der Junge.",
                correct="Ich sehe den Jungen.",
                note="Nomen nicht im Nominativ → -(e)n.",
            ),
        ],
        related=["genitiv", "akkusativ", "dativ-basic", "artikel-deklination"],
    ),
    GrammarTopic(
        slug="relativsaetze-erweitert",
        title="Relativsätze mit Präpositionen",
        level="B2",
        category="Syntax",
        summary="Relativsätze mit Präpositionen – auf den, mit dem, für die und Dativ-/Genitivpronomen.",
        explanation="""Relativsätze mit Präpositionen: Präposition + Relativpronomen im Kasus der Präposition.
Der Mann, mit dem ich gesprochen habe... (Dativ). Das Projekt, an dem wir arbeiten... (Dativ).
Genitiv-Relativpronomen: dessen (maskulin/neutral), deren (feminin/Plural).
Der Autor, dessen Buch ich gelesen habe... Die Frau, deren Kinder im Garten spielen...
Bei Sachen: wo(r) + Präposition — Das ist etwas, wovon ich nichts wusste. Das Thema, worüber wir gesprochen haben...""",
        structure="Bezugswort, Präposition + Relativpronomen + ... + Verb (am Ende) / dessen/deren + Nomen + ... + Verb (am Ende)",
        rules=[
            "Relativpronomen nach Präposition: Kasus richtet sich nach der Präposition.",
            "Bei Sachen kann 'wo(r) + Präposition' verwendet werden.",
            '"Dessen" ist Genitiv maskulin/neutral, "deren" Genitiv feminin/Plural.',
            "Das Verb steht im Relativsatz immer am Ende.",
        ],
        examples=[
            GrammarExample(
                text="Der Mann, mit dem ich gesprochen habe, ist mein Chef.",
                translation=None,
            ),
            GrammarExample(
                text="Das Projekt, an dem wir arbeiten, ist fast fertig.",
                translation=None,
            ),
            GrammarExample(
                text="Der Autor, dessen Buch ich gelesen habe, kommt aus Österreich.",
                translation=None,
                note="Genitiv",
            ),
            GrammarExample(
                text="Das ist etwas, wovon ich nichts wusste.",
                translation=None,
                note="wo(r)- + Präposition",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Die Frau, dessen Tasche gestohlen wurde...",
                correct="Die Frau, deren Tasche gestohlen wurde...",
                note="Deren für feminin/Plural, dessen für maskulin/neutral.",
            ),
        ],
        related=["relativsaetze", "praepositionen-rektion", "genitiv"],
    ),
    GrammarTopic(
        slug="subjektive-modalverben",
        title="Subjektive Bedeutung von Modalverben",
        level="B2",
        category="Verben",
        summary="Subjektiver Gebrauch von Modalverben – er soll reich sein, sie will es gesehen haben.",
        explanation="""Modalverben haben neben objektiver auch subjektive Bedeutung:
sollen (subjektiv): Gerücht — Er soll reich sein. (Man sagt, er sei reich.)
wollen (subjektiv): zweifelhafte Behauptung — Sie will es gesehen haben.
müssen (subjektiv): sichere Vermutung — Er muss zu Hause sein.
können (subjektiv): Möglichkeit — Das kann wahr sein.
dürfte (Konj. II): vorsichtige Vermutung — Er dürfte jetzt ankommen.
Vergangenheit: Modalverb + Partizip II + haben/sein — Er muss den Zug verpasst haben.""",
        structure="Modalverb + Infinitiv (Gegenwart) / Modalverb + Partizip II + haben/sein (Vergangenheit)",
        rules=[
            "Sollen subjektiv = Gerücht/Hörensagen.",
            "Wollen subjektiv = zweifelhafte Behauptung.",
            "Müssen subjektiv = sichere Schlussfolgerung.",
            "Dürfte (Konjunktiv II) = vorsichtige Vermutung.",
        ],
        examples=[
            GrammarExample(
                text="Er soll sehr reich sein.",
                translation=None,
                note="Gerücht",
            ),
            GrammarExample(
                text="Sie will den berühmten Schauspieler getroffen haben.",
                translation=None,
                note="zweifelhafte Behauptung",
            ),
            GrammarExample(
                text="Er muss den Zug verpasst haben.",
                translation=None,
                note="sichere Schlussfolgerung",
            ),
            GrammarExample(
                text="Das dürfte die Lösung sein.",
                translation=None,
                note="vorsichtige Vermutung",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Er soll reich sein. = Er muss reich sein. (gleichgesetzt)",
                correct="sollen = Gerücht, müssen = sichere Schlussfolgerung",
                note="Unterschiedliche Gewissheitsgrade.",
            ),
        ],
        related=["modalverben", "konjunktiv-i", "indirekte-rede"],
    ),
]
