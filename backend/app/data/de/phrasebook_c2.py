"""German phrasebook — C2 categories."""

from app.data._types import PhrasebookCategory, PhrasebookEntry

C2_CATEGORIES: list[PhrasebookCategory] = [
    PhrasebookCategory(
        id="nuance_de_c2",
        level="C2",
        situation="Meisterhafte Nuancierung",
        icon="\U0001f48e",
        phrases=[
            PhrasebookEntry(
                text="Es wäre vermessen zu behaupten, dass...",
                context="einräumen, dass es vermessen wäre zu behaupten...",
                register="formal",
            ),
            PhrasebookEntry(
                text="Mit der gebotenen Vorsicht wäre anzumerken, dass...",
                context="einen Vorbehalt mit gebotener Vorsicht hinzufügen (sehr formell)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Das greift zu kurz.",
                context="eine Erklärung als zu kurz greifend / zu simpel kritisieren",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich möchte keinesfalls den Eindruck erwecken, dass...",
                context="präventiv klarstellen, dass man keinen falschen Eindruck erwecken will",
                register="formal",
            ),
            PhrasebookEntry(
                text="Es handelt sich hierbei um eine durchaus ambivalente Entwicklung.",
                context="eine durchaus ambivalente Entwicklung beschreiben",
                register="formal",
            ),
            PhrasebookEntry(
                text="Nicht von der Hand zu weisen ist jedoch...",
                context="einen Punkt anerkennen, der nicht von der Hand zu weisen ist",
                register="formal",
            ),
            PhrasebookEntry(
                text="Unter diesem Gesichtspunkt betrachtet...",
                context="die Diskussion aus einem bestimmten Blickwinkel neu einordnen",
                register="formal",
            ),
            PhrasebookEntry(
                text="Ich erlaube mir, eine Gegenposition zu formulieren.",
                context="diplomatisch eine Gegenposition einführen",
                register="formal",
            ),
            PhrasebookEntry(
                text="Wohlwollend könnte man unterstellen, dass...",
                context="eine wohlwollende Interpretation vorbringen",
                register="formal",
            ),
            PhrasebookEntry(
                text="Dies bedarf einer erheblichen Differenzierung.",
                context="feststellen, dass eine Behauptung erheblicher Differenzierung bedarf",
                register="formal",
            ),
            PhrasebookEntry(
                text="Ohne der Sache vorgreifen zu wollen...",
                context="sich ein Urteil vorbehalten, bevor die vollständige Analyse vorliegt",
                register="formal",
            ),
        ],
    ),
    PhrasebookCategory(
        id="literarisch_de_c2",
        level="C2",
        situation="Literarische & Poetische Sprache",
        icon="\U0001f4da",
        phrases=[
            PhrasebookEntry(
                text="Die Welt, wie wir sie kannten, versank in den Fluten der Zeit.",
                context="Nostalgie und das Vergehen einer Ära heraufbeschwören",
                register="formal",
            ),
            PhrasebookEntry(
                text="Sein Blick verfinsterte sich schlagartig.",
                context="eine plötzliche Verdüsterung der Stimmung beschreiben",
                register="formal",
            ),
            PhrasebookEntry(
                text="In den Dämmerstunden des Lebens...",
                context="poetische Umschreibung für die Abenddämmerung des Lebens",
                register="formal",
            ),
            PhrasebookEntry(
                text="Eine unerklärliche Schwermut hatte sich ihrer bemächtigt.",
                context="eine unerklärliche Schwermut beschreiben, die von jemandem Besitz ergreift",
                register="formal",
            ),
            PhrasebookEntry(
                text="Das Zwielicht warf gespenstische Schatten an die Wand.",
                context="eine gespenstische, spannungsgeladene Atmosphäre schaffen",
                register="formal",
            ),
            PhrasebookEntry(
                text="Von einer unbändigen Sehnsucht getrieben...",
                context="von unbändiger Sehnsucht angetrieben sein",
                register="formal",
            ),
            PhrasebookEntry(
                text="So vergingen die Tage, einer wie der andere.",
                context="monotonen Zeitablauf beschreiben (ein Tag wie der andere)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Welch ein unbeschreiblicher Anblick!",
                context="bei einem unbeschreiblichen Anblick ausrufen",
                register="formal",
            ),
            PhrasebookEntry(
                text="Die Vergänglichkeit allen Seins lastete schwer auf ihm.",
                context="existentielle Schwere ausdrücken (die Vergänglichkeit allen Seins)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Ein Schauer der Erinnerung durchfuhr sie.",
                context="einen plötzlichen Erinnerungsschauer beschreiben",
                register="formal",
            ),
            PhrasebookEntry(
                text="Es liegt ein Zauber in diesen Worten.",
                context="ausdrücken, dass ein Zauber in bestimmten Worten liegt",
                register="formal",
            ),
        ],
    ),
    PhrasebookCategory(
        id="mediation_de_c2",
        level="C2",
        situation="Sprachmittlung, Paraphrasierung & Dolmetschen",
        icon="\U0001f91d",
        phrases=[
            PhrasebookEntry(
                text="Wenn ich Sie richtig verstehe, geht es Ihnen vor allem um...",
                context="das Kernanliegen in einer Vermittlungssituation klären (formell)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Darf ich kurz zusammenfassen, was Sie gesagt haben?",
                context="die Aussage von jemandem zusammenfassen, um Verständnis zu sichern (formell)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Auf Deutsch würde man das so ausdrücken: ...",
                context="eine deutsche Entsprechung für einen fremdsprachlichen Ausdruck anbieten",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Das ist schwer zu übersetzen, aber sinngemäß bedeutet es...",
                context="die Bedeutung erklären, wenn eine direkte Übersetzung schwierig ist",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Der Unterton suggeriert, dass...",
                context="Subtext interpretieren (der Unterton suggeriert, dass...)",
                register="neutral",
            ),
            PhrasebookEntry(
                text='Im Deutschen sagt man dazu: "...".',
                context="die idiomatisch deutsche Art anbieten, etwas zu sagen",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Diese Redewendung hat im Deutschen keine eins-zu-eins-Entsprechung.",
                context="erklären, dass eine Redewendung keine exakte deutsche Entsprechung hat",
                register="formal",
            ),
            PhrasebookEntry(
                text="Gemeint ist damit...",
                context="klären, was mit einer Aussage gemeint ist",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Lassen Sie mich das näher ausführen.",
                context="anbieten, einen Punkt näher auszuführen (formell)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Um auf den Kern der Aussage zurückzukommen...",
                context="nach einer Abschweifung zum Kern der Sache zurückkehren",
                register="formal",
            ),
            PhrasebookEntry(
                text="Zwischen den Zeilen lese ich heraus, dass...",
                context="zwischen den Zeilen lesen, um implizite Bedeutung zu deuten",
                register="neutral",
            ),
        ],
    ),
    PhrasebookCategory(
        id="fachsprachen_de_c2",
        level="C2",
        situation="Fachsprachen — Recht, Medizin & Verwaltung",
        icon="\U0001f4dc",
        phrases=[
            PhrasebookEntry(
                text="Gemäß § 433 BGB ist der Verkäufer verpflichtet, ...",
                context="das BGB im juristischen Kontext zitieren",
                register="formal",
            ),
            PhrasebookEntry(
                text="Dies stellt einen Verstoß gegen die guten Sitten dar (§ 138 BGB).",
                context="juristisches Konzept des Verstoßes gegen die guten Sitten / Sittenwidrigkeit",
                register="formal",
            ),
            PhrasebookEntry(
                text="Der Kläger beantragt, den Beklagten zu verurteilen.",
                context="formelles juristisches Plädoyer (Kläger gegen Beklagten)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Die Diagnose lautet auf eine akute Appendizitis.",
                context="medizinische Diagnose in formellem klinischem Deutsch",
                register="formal",
            ),
            PhrasebookEntry(
                text="Der Patient ist über die Risiken des Eingriffs aufgeklärt worden.",
                context="Dokumentation der medizinischen Aufklärung",
                register="formal",
            ),
            PhrasebookEntry(
                text="Bescheid ergeht gebührenfrei.",
                context="Behördendeutsch: 'der Bescheid ergeht gebührenfrei'",
                register="formal",
            ),
            PhrasebookEntry(
                text="Die zuständige Behörde hat den Antrag abschlägig beschieden.",
                context="Verwaltungssprache: die Behörde hat den Antrag abgelehnt",
                register="formal",
            ),
            PhrasebookEntry(
                text="Gegen diesen Bescheid kann innerhalb eines Monats Widerspruch eingelegt werden.",
                context="übliche Rechtsbehelfsbelehrung",
                register="formal",
            ),
            PhrasebookEntry(
                text="Die Eintragung erfolgt von Amts wegen.",
                context="Verwaltungssprache: die Eintragung erfolgt automatisch / ex officio",
                register="formal",
            ),
            PhrasebookEntry(
                text="Im Eilverfahren wurde eine einstweilige Verfügung erlassen.",
                context="Juristisch: im Eilverfahren wurde eine einstweilige Verfügung erlassen",
                register="formal",
            ),
            PhrasebookEntry(
                text="Die Befundung ergab keinerlei Auffälligkeiten.",
                context="Medizinisch: die Befundung ergab keine Auffälligkeiten",
                register="formal",
            ),
        ],
    ),
    PhrasebookCategory(
        id="politik_de_c2",
        level="C2",
        situation="Politische Debatte & Diplomatie",
        icon="\U0001f3db",
        phrases=[
            PhrasebookEntry(
                text="Ich möchte dem Hohen Hause zu bedenken geben, dass...",
                context="formelle Ansprache an den Bundestag (zum Hohen Haus sprechen)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Die Position der Bundesregierung lässt sich wie folgt skizzieren: ...",
                context="die offizielle Position der Bundesregierung skizzieren",
                register="formal",
            ),
            PhrasebookEntry(
                text="Es herrscht ein breiter parteiübergreifender Konsens.",
                context="auf parteiübergreifenden Konsens im Parlament verweisen",
                register="formal",
            ),
            PhrasebookEntry(
                text="Diese Entwicklung ist mit großer Sorge zu betrachten.",
                context="diplomatische Besorgnis ohne direkte Anschuldigung ausdrücken",
                register="formal",
            ),
            PhrasebookEntry(
                text="Ich möchte der Gegenseite keinesfalls die Worte im Munde herumdrehen.",
                context="darauf bestehen, dass man das Argument des Gegners nicht verfälscht",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Es geht hier nicht um Parteipolitik, sondern um das Gemeinwohl.",
                context="ein Thema als überparteilich umreißen",
                register="formal",
            ),
            PhrasebookEntry(
                text="Das wäre ein Präzedenzfall mit unabsehbaren Konsequenzen.",
                context="vor der Präzedenzwirkung einer Entscheidung warnen",
                register="formal",
            ),
            PhrasebookEntry(
                text="Meiner Überzeugung nach ist der einzig gangbare Weg, ...",
                context="behaupten, dass nur ein Weg gangbar ist",
                register="formal",
            ),
            PhrasebookEntry(
                text="Die Bedenken der Abgeordneten sind durchaus nachvollziehbar.",
                context="die Bedenken der Abgeordneten diplomatisch anerkennen",
                register="formal",
            ),
            PhrasebookEntry(
                text="Das verstieße eklatant gegen den Geist des Grundgesetzes.",
                context="nachdrücklich einen Verstoß gegen den Geist des Grundgesetzes argumentieren",
                register="formal",
            ),
            PhrasebookEntry(
                text="Ein Abwägen der widerstreitenden Interessen ergibt, dass...",
                context="widerstreitende Verfassungsinteressen abwägen (Güterabwägung)",
                register="formal",
            ),
        ],
    ),
]
