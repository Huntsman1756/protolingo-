"""German phrasebook — B2 categories."""

from app.data._types import PhrasebookCategory, PhrasebookEntry

B2_CATEGORIES: list[PhrasebookCategory] = [
    PhrasebookCategory(
        id="argumentation_de_b2",
        level="B2",
        situation="Strukturierte Argumentation",
        icon="\U0001f9e0",
        phrases=[
            PhrasebookEntry(
                text="Zunächst einmal ist festzuhalten, dass...",
                context="ein formelles Argument eröffnen (zunächst ist festzuhalten, dass)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Dem lässt sich entgegenhalten, dass...",
                context="ein Gegenargument einleiten (dem lässt sich entgegenhalten, dass)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Ein weiterer Aspekt, der berücksichtigt werden muss, ist...",
                context="einen weiteren zu beachtenden Aspekt hinzufügen",
                register="formal",
            ),
            PhrasebookEntry(
                text="Man darf nicht außer Acht lassen, dass...",
                context="davor warnen, eine wichtige Tatsache zu übersehen",
                register="formal",
            ),
            PhrasebookEntry(
                text="Diese Schlussfolgerung ist nicht zwingend.",
                context="eine Schlussfolgerung als nicht logisch zwingend anfechten",
                register="formal",
            ),
            PhrasebookEntry(
                text="Das führt uns zu der Frage, ob...",
                context="die Diskussion zu einer zentralen Frage lenken",
                register="formal",
            ),
            PhrasebookEntry(
                text="Aus diesem Grund bin ich der festen Überzeugung, dass...",
                context="nach Abwägung eine feste Überzeugung äußern",
                register="formal",
            ),
            PhrasebookEntry(
                text="Hierbei handelt es sich um eine gravierende Vereinfachung.",
                context="auf eine gravierende Vereinfachung hinweisen",
                register="formal",
            ),
            PhrasebookEntry(
                text="Ich möchte noch einen Punkt ins Feld führen.",
                context="einen weiteren Punkt vorbringen",
                register="formal",
            ),
            PhrasebookEntry(
                text="Das ist insofern problematisch, als...",
                context="erklären, warum etwas problematisch ist",
                register="formal",
            ),
            PhrasebookEntry(
                text="Es wäre verfehlt, daraus zu schließen, dass...",
                context="eine falsche Schlussfolgerung zurückweisen (es wäre verfehlt, daraus zu schließen)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Nicht zuletzt spricht dafür, dass...",
                context="ein letztes gewichtiges Argument dafür anführen",
                register="formal",
            ),
            PhrasebookEntry(
                text="Zusammenfassend lässt sich sagen, dass...",
                context="das Argument zusammenfassen",
                register="formal",
            ),
            PhrasebookEntry(
                text="Die Kehrseite der Medaille ist jedoch...",
                context="auf die Kehrseite hinweisen (die Kehrseite der Medaille)",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Das wirft ein ganz anderes Licht auf die Sache.",
                context="sagen, dass eine neue Tatsache die Sache völlig anders aussehen lässt",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Die aktuelle Studienlage belegt eindeutig, dass...",
                context="Forschungsergebnisse zitieren",
                register="formal",
            ),
        ],
    ),
    PhrasebookCategory(
        id="formell_email_de_b2",
        level="B2",
        situation="Formelle E-Mails & Schriftverkehr",
        icon="\U0001f4e7",
        phrases=[
            PhrasebookEntry(
                text="Sehr geehrte Damen und Herren,",
                context="übliche formelle Anrede (Sehr geehrte Damen und Herren)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Sehr geehrter Herr ...,",
                context="Anrede an einen namentlich bekannten männlichen Empfänger",
                register="formal",
            ),
            PhrasebookEntry(
                text="ich wende mich an Sie bezüglich...",
                context="Betreffzeile einleiten (ich wende mich an Sie bezüglich)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Vielen Dank für Ihre Rückmeldung.",
                context="jemandem für seine Rückmeldung danken",
                register="formal",
            ),
            PhrasebookEntry(
                text="Ich nehme Bezug auf Ihr Schreiben vom...",
                context="sich auf ein vorheriges Schreiben beziehen",
                register="formal",
            ),
            PhrasebookEntry(
                text="Bezug nehmend auf unser Telefonat...",
                context="sich auf ein vorheriges Telefonat beziehen",
                register="formal",
            ),
            PhrasebookEntry(
                text="Anbei finden Sie die angeforderten Dokumente.",
                context="'anbei finden Sie die angeforderten Dokumente'",
                register="formal",
            ),
            PhrasebookEntry(
                text="Für Rückfragen stehe ich Ihnen gerne zur Verfügung.",
                context="Verfügbarkeit für Rückfragen anbieten",
                register="formal",
            ),
            PhrasebookEntry(
                text="Ich bitte um Verständnis für die Verspätung.",
                context="um Verständnis für eine Verspätung bitten",
                register="formal",
            ),
            PhrasebookEntry(
                text="Mit freundlichen Grüßen,",
                context="übliche formelle Grußformel (mit freundlichen Grüßen)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Ich möchte einen Termin vereinbaren.",
                context="um einen Termin bitten",
                register="formal",
            ),
            PhrasebookEntry(
                text="Vielen Dank im Voraus für Ihre Bemühungen.",
                context="jemandem im Voraus für seine Bemühungen danken",
                register="formal",
            ),
            PhrasebookEntry(
                text="Leider muss ich Ihnen mitteilen, dass...",
                context="schlechte Nachrichten höflich überbringen (leider muss ich Ihnen mitteilen)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Ich hoffe auf eine positive Rückmeldung.",
                context="Hoffnung auf eine positive Rückmeldung ausdrücken",
                register="formal",
            ),
            PhrasebookEntry(
                text="Ich wäre Ihnen dankbar, wenn Sie...",
                context="eine höfliche Bitte formulieren (ich wäre Ihnen dankbar, wenn)",
                register="formal",
            ),
        ],
    ),
    PhrasebookCategory(
        id="nuancen_de_b2",
        level="B2",
        situation="Nuancen & Begriffsklärung",
        icon="\u2696\ufe0f",
        phrases=[
            PhrasebookEntry(
                text="Das ist nicht ganz falsch, aber...",
                context="teilweise einräumen, bevor man widerspricht",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Es kommt auf den Zusammenhang an.",
                context="sagen, dass es auf den Zusammenhang ankommt",
                register="neutral",
            ),
            PhrasebookEntry(
                text="So pauschal kann man das nicht sagen.",
                context="sich weigern zu pauschalisieren (so pauschal kann man das nicht sagen)",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich würde das etwas differenzierter betrachten.",
                context="eine differenziertere Sichtweise vorschlagen",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Grundsätzlich stimme ich zu, jedoch...",
                context="im Prinzip zustimmen, mit Einschränkung",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Man muss zwischen ... und ... unterscheiden.",
                context="auf eine notwendige Unterscheidung hinweisen",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Unter bestimmten Umständen mag das zutreffen.",
                context="einräumen, dass es unter bestimmten Umständen zutreffen könnte",
                register="formal",
            ),
            PhrasebookEntry(
                text="Das ist eine Frage der Perspektive.",
                context="sagen, dass es eine Frage der Perspektive ist",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Auf den ersten Blick scheint es so, aber...",
                context="scheinbar zustimmen, bevor man widerspricht (auf den ersten Blick...)",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Das ist nur die halbe Wahrheit.",
                context="sagen, dass jemand nicht die ganze Wahrheit sagt",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Nicht unbedingt.",
                context="sanfter Widerspruch (nicht unbedingt)",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Es wäre übertrieben zu behaupten, dass...",
                context="eine übertriebene Behauptung entschärfen",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Gewissermaßen ja, aber...",
                context="teilweise zustimmen mit Vorbehalt (gewissermaßen ja, aber)",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Man sollte die Kirche im Dorf lassen.",
                context="ermahnen, nicht zu übertreiben (die Kirche im Dorf lassen)",
                register="informal",
            ),
            PhrasebookEntry(
                text="Das ist Ansichtssache.",
                context="sagen, dass es Ansichtssache ist",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich möchte nicht in Abrede stellen, dass..., aber...",
                context="einen Punkt einräumen, bevor man dagegen argumentiert (formell)",
                register="formal",
            ),
        ],
    ),
    PhrasebookCategory(
        id="medien_de_b2",
        level="B2",
        situation="Medien & Nachrichten",
        icon="\U0001f4f0",
        phrases=[
            PhrasebookEntry(
                text="Laut einem Bericht der...",
                context="einen Bericht zitieren (laut einem Bericht der...)",
                register="neutral",
            ),
            PhrasebookEntry(
                text="In den Nachrichten wurde berichtet, dass...",
                context="auf einen Nachrichtenbericht verweisen",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Die Schlagzeilen heute Morgen besagen, dass...",
                context="auf die Schlagzeilen von heute Morgen verweisen",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Das ist eine vertrauenswürdige Quelle.",
                context="für die Zuverlässigkeit einer Quelle bürgen",
                register="neutral",
            ),
            PhrasebookEntry(
                text="In den sozialen Medien geht gerade das Gerücht um, dass...",
                context="über ein Gerücht in den sozialen Medien berichten",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Der Artikel stellt die Fakten verdreht dar.",
                context="voreingenommene oder verdrehte Berichterstattung kritisieren",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich lese regelmäßig die Online-Ausgabe der...",
                context="sagen, dass man regelmäßig die Online-Ausgabe einer Zeitung liest",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Was hältst du von der Berichterstattung über...?",
                context="jemanden nach seiner Meinung zur Berichterstattung fragen (informell)",
                register="informal",
            ),
            PhrasebookEntry(
                text="Das wurde von den Medien völlig aufgebauscht.",
                context="sagen, dass die Medien etwas völlig aufgebauscht haben",
                register="informal",
            ),
            PhrasebookEntry(
                text="Man sollte immer mehrere Quellen prüfen.",
                context="den Rat geben, Quellen gegenzuprüfen",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Die Sendung läuft jeden Donnerstag um 20:15 Uhr.",
                context="die Sendezeit einer Fernsehsendung nennen",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich habe das im Radio gehört.",
                context="sagen, dass man etwas im Radio gehört hat",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Da gab es eine interessante Dokumentation über...",
                context="eine interessante Dokumentation erwähnen",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Der Kommentar war sehr einseitig.",
                context="einen einseitigen Kommentar kritisieren",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Fake News sind ein zunehmendes Problem.",
                context="das zunehmende Problem von Fake News kommentieren",
                register="neutral",
            ),
        ],
    ),
    PhrasebookCategory(
        id="redewendungen_de_b2",
        level="B2",
        situation="Redewendungen & Umgangssprache",
        icon="\U0001f3ad",
        phrases=[
            PhrasebookEntry(
                text="Da ist der Wurm drin.",
                context="sagen, dass etwas nicht stimmt / ein Haken dran ist",
                register="informal",
            ),
            PhrasebookEntry(
                text="Ich drücke dir die Daumen!",
                context="jemandem Glück wünschen (ich drücke dir die Daumen)",
                register="informal",
            ),
            PhrasebookEntry(
                text="Das ist nicht mein Bier.",
                context="sagen, dass es nicht das eigene Problem ist (nicht mein Bier)",
                register="informal",
            ),
            PhrasebookEntry(
                text="Da haben wir den Salat.",
                context="ein Durcheinander beklagen (da haben wir den Salat)",
                register="informal",
            ),
            PhrasebookEntry(
                text="Das Leben ist kein Ponyhof.",
                context="das Leben ist kein Zuckerschlecken (das Leben ist kein Ponyhof)",
                register="informal",
            ),
            PhrasebookEntry(
                text="In der Kürze liegt die Würze.",
                context="in der Kürze liegt die Würze",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Alles in Butter.",
                context="alles in Ordnung / alles bestens",
                register="informal",
            ),
            PhrasebookEntry(
                text="Ich verstehe nur Bahnhof.",
                context="sagen, dass man gar nichts versteht (ich verstehe nur Bahnhof)",
                register="informal",
            ),
            PhrasebookEntry(
                text="Das ist mir Wurst.",
                context="sagen, dass es einem egal ist (das ist mir Wurst)",
                register="informal",
            ),
            PhrasebookEntry(
                text="Jetzt mal Butter bei die Fische.",
                context="jetzt mal Klartext / lass uns ehrlich sein",
                register="informal",
            ),
            PhrasebookEntry(
                text="Da liegt der Hund begraben.",
                context="das ist der Kern des Problems (da liegt der Hund begraben)",
                register="informal",
            ),
            PhrasebookEntry(
                text="Aus der Haut fahren.",
                context="die Fassung verlieren / ausrasten",
                register="informal",
            ),
            PhrasebookEntry(
                text="Das Kind beim Namen nennen.",
                context="die Dinge beim Namen nennen",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Etwas auf die lange Bank schieben.",
                context="etwas aufschieben / prokrastinieren (auf die lange Bank schieben)",
                register="neutral",
            ),
        ],
    ),
]
