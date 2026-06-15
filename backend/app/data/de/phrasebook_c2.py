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
                context="Einräumen it would be presumptuous to claim...",
                register="formal",
            ),
            PhrasebookEntry(
                text="Mit der gebotenen Vorsicht wäre anzumerken, dass...",
                context="Adding a caveat with due caution (very formal hedging)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Das greift zu kurz.",
                context="Kritisieren an explanation as falling short / too simplistic",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich möchte keinesfalls den Eindruck erwecken, dass...",
                context="Preemptively clarifying you don't want to give a wrong impression",
                register="formal",
            ),
            PhrasebookEntry(
                text="Es handelt sich hierbei um eine durchaus ambivalente Entwicklung.",
                context="Beschreiben a thoroughly ambivalent development",
                register="formal",
            ),
            PhrasebookEntry(
                text="Nicht von der Hand zu weisen ist jedoch...",
                context="Anerkennen a point that cannot be dismissed",
                register="formal",
            ),
            PhrasebookEntry(
                text="Unter diesem Gesichtspunkt betrachtet...",
                context="Reframing the discussion from a specific angle",
                register="formal",
            ),
            PhrasebookEntry(
                text="Ich erlaube mir, eine Gegenposition zu formulieren.",
                context="Diplomatically introducing a counter-position",
                register="formal",
            ),
            PhrasebookEntry(
                text="Wohlwollend könnte man unterstellen, dass...",
                context="Giving a charitable interpretation",
                register="formal",
            ),
            PhrasebookEntry(
                text="Dies bedarf einer erheblichen Differenzierung.",
                context="Feststellen that a claim requires substantial differentiation",
                register="formal",
            ),
            PhrasebookEntry(
                text="Ohne der Sache vorgreifen zu wollen...",
                context="Reserving judgement before full analysis (without wanting to preempt)",
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
                context="Evoking nostalgia and the passing of an era",
                register="formal",
            ),
            PhrasebookEntry(
                text="Sein Blick verfinsterte sich schlagartig.",
                context="Beschreiben a sudden darkening of someone's mood",
                register="formal",
            ),
            PhrasebookEntry(
                text="In den Dämmerstunden des Lebens...",
                context="Poetic reference to the twilight of life",
                register="formal",
            ),
            PhrasebookEntry(
                text="Eine unerklärliche Schwermut hatte sich ihrer bemächtigt.",
                context="Beschreiben an inexplicable melancholy gripping someone",
                register="formal",
            ),
            PhrasebookEntry(
                text="Das Zwielicht warf gespenstische Schatten an die Wand.",
                context="Setting a ghostly, suspenseful atmosphere",
                register="formal",
            ),
            PhrasebookEntry(
                text="Von einer unbändigen Sehnsucht getrieben...",
                context="Motivated by irrepressible longing",
                register="formal",
            ),
            PhrasebookEntry(
                text="So vergingen die Tage, einer wie der andere.",
                context="Beschreiben monotonous passage of time (one day like the other)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Welch ein unbeschreiblicher Anblick!",
                context="Exclaiming at an indescribable sight",
                register="formal",
            ),
            PhrasebookEntry(
                text="Die Vergänglichkeit allen Seins lastete schwer auf ihm.",
                context="Ausdrücken existential weight (the transience of all being)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Ein Schauer der Erinnerung durchfuhr sie.",
                context="Beschreiben a sudden shiver of a memory",
                register="formal",
            ),
            PhrasebookEntry(
                text="Es liegt ein Zauber in diesen Worten.",
                context="Ausdrücken that there is a magic / enchantment in certain words",
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
                context="Clarifying the core concern in a mediation setting (formal)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Darf ich kurz zusammenfassen, was Sie gesagt haben?",
                context="Zusammenfassen someone's statement to ensure understanding (formal)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Auf Deutsch würde man das so ausdrücken: ...",
                context="Anbieten a German equivalent of a foreign-language expression",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Das ist schwer zu übersetzen, aber sinngemäß bedeutet es...",
                context="Erklären the meaning when a direct translation is hard",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Der Unterton suggeriert, dass...",
                context="Interpretieren subtext (the undertone suggests that...)",
                register="neutral",
            ),
            PhrasebookEntry(
                text='Im Deutschen sagt man dazu: "...".',
                context="Providing the idiomatic German way of saying something",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Diese Redewendung hat im Deutschen keine eins-zu-eins-Entsprechung.",
                context="Erklären an idiom has no exact one-to-one German equivalent",
                register="formal",
            ),
            PhrasebookEntry(
                text="Gemeint ist damit...",
                context="Clarifying what is meant by a statement (what's meant is...)",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Lassen Sie mich das näher ausführen.",
                context="Anbieten to elaborate further on a point (formal)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Um auf den Kern der Aussage zurückzukommen...",
                context="Returning to the heart of the matter after a tangent",
                register="formal",
            ),
            PhrasebookEntry(
                text="Zwischen den Zeilen lese ich heraus, dass...",
                context="Reading between the lines to interpret implicit meaning",
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
                context="Zitieren German Civil Code (BGB) in legal context",
                register="formal",
            ),
            PhrasebookEntry(
                text="Dies stellt einen Verstoß gegen die guten Sitten dar (§ 138 BGB).",
                context="Legal concept of contra bonos mores / immorality clause",
                register="formal",
            ),
            PhrasebookEntry(
                text="Der Kläger beantragt, den Beklagten zu verurteilen.",
                context="Formell legal pleading (plaintiff vs defendant)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Die Diagnose lautet auf eine akute Appendizitis.",
                context="Medical diagnosis in formal clinical German",
                register="formal",
            ),
            PhrasebookEntry(
                text="Der Patient ist über die Risiken des Eingriffs aufgeklärt worden.",
                context="Medical informed consent documentation",
                register="formal",
            ),
            PhrasebookEntry(
                text="Bescheid ergeht gebührenfrei.",
                context="Bureaucratic: 'notification is issued free of charge'",
                register="formal",
            ),
            PhrasebookEntry(
                text="Die zuständige Behörde hat den Antrag abschlägig beschieden.",
                context="Administrative: the authority rejected the application",
                register="formal",
            ),
            PhrasebookEntry(
                text="Gegen diesen Bescheid kann innerhalb eines Monats Widerspruch eingelegt werden.",
                context="Standard Rechtsbehelfsbelehrung (legal remedy instruction)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Die Eintragung erfolgt von Amts wegen.",
                context="Administrative: registration is made ex officio / automatically",
                register="formal",
            ),
            PhrasebookEntry(
                text="Im Eilverfahren wurde eine einstweilige Verfügung erlassen.",
                context="Legal: a preliminary injunction was issued in expedited proceedings",
                register="formal",
            ),
            PhrasebookEntry(
                text="Die Befundung ergab keinerlei Auffälligkeiten.",
                context="Medical: the findings showed no abnormalities",
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
                context="Formell Bundestag address (speaking to parliament)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Die Position der Bundesregierung lässt sich wie folgt skizzieren: ...",
                context="Outlining the federal government's official position",
                register="formal",
            ),
            PhrasebookEntry(
                text="Es herrscht ein breiter parteiübergreifender Konsens.",
                context="Verweisen to cross-party consensus in parliament",
                register="formal",
            ),
            PhrasebookEntry(
                text="Diese Entwicklung ist mit großer Sorge zu betrachten.",
                context="Diplomatic expression of concern without direct accusation",
                register="formal",
            ),
            PhrasebookEntry(
                text="Ich möchte der Gegenseite keinesfalls die Worte im Munde herumdrehen.",
                context="Bestehen you're not misrepresenting the opponent's argument",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Es geht hier nicht um Parteipolitik, sondern um das Gemeinwohl.",
                context="Umreißen an issue as above partisan interests",
                register="formal",
            ),
            PhrasebookEntry(
                text="Das wäre ein Präzedenzfall mit unabsehbaren Konsequenzen.",
                context="Warnen about the precedent-setting nature of a decision",
                register="formal",
            ),
            PhrasebookEntry(
                text="Meiner Überzeugung nach ist der einzig gangbare Weg, ...",
                context="Behaupten the only viable path forward in a debate",
                register="formal",
            ),
            PhrasebookEntry(
                text="Die Bedenken der Abgeordneten sind durchaus nachvollziehbar.",
                context="Anerkennen parliamentarians' concerns diplomatically",
                register="formal",
            ),
            PhrasebookEntry(
                text="Das verstieße eklatant gegen den Geist des Grundgesetzes.",
                context="Forcefully arguing a violation of constitutional spirit",
                register="formal",
            ),
            PhrasebookEntry(
                text="Ein Abwägen der widerstreitenden Interessen ergibt, dass...",
                context="Balancing competing constitutional interests (Güterabwägung)",
                register="formal",
            ),
        ],
    ),
]
