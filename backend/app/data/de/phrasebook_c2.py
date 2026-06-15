"""German phrasebook — C2 categories."""

from app.data._types import PhrasebookCategory, PhrasebookEntry

C2_CATEGORIES: list[PhrasebookCategory] = [
    PhrasebookCategory(
        id="nuance_de_c2",
        level="C2",
        situation="Mastery of Nuance",
        icon="\U0001f48e",
        phrases=[
            PhrasebookEntry(
                text="Es wäre vermessen zu behaupten, dass...",
                context="Conceding it would be presumptuous to claim...",
                register="formal",
            ),
            PhrasebookEntry(
                text="Mit der gebotenen Vorsicht wäre anzumerken, dass...",
                context="Adding a caveat with due caution (very formal hedging)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Das greift zu kurz.",
                context="Criticising an explanation as falling short / too simplistic",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich möchte keinesfalls den Eindruck erwecken, dass...",
                context="Preemptively clarifying you don't want to give a wrong impression",
                register="formal",
            ),
            PhrasebookEntry(
                text="Es handelt sich hierbei um eine durchaus ambivalente Entwicklung.",
                context="Describing a thoroughly ambivalent development",
                register="formal",
            ),
            PhrasebookEntry(
                text="Nicht von der Hand zu weisen ist jedoch...",
                context="Acknowledging a point that cannot be dismissed",
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
                context="Stating that a claim requires substantial differentiation",
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
        situation="Literary & Poetic Language",
        icon="\U0001f4da",
        phrases=[
            PhrasebookEntry(
                text="Die Welt, wie wir sie kannten, versank in den Fluten der Zeit.",
                context="Evoking nostalgia and the passing of an era",
                register="formal",
            ),
            PhrasebookEntry(
                text="Sein Blick verfinsterte sich schlagartig.",
                context="Describing a sudden darkening of someone's mood",
                register="formal",
            ),
            PhrasebookEntry(
                text="In den Dämmerstunden des Lebens...",
                context="Poetic reference to the twilight of life",
                register="formal",
            ),
            PhrasebookEntry(
                text="Eine unerklärliche Schwermut hatte sich ihrer bemächtigt.",
                context="Describing an inexplicable melancholy gripping someone",
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
                context="Describing monotonous passage of time (one day like the other)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Welch ein unbeschreiblicher Anblick!",
                context="Exclaiming at an indescribable sight",
                register="formal",
            ),
            PhrasebookEntry(
                text="Die Vergänglichkeit allen Seins lastete schwer auf ihm.",
                context="Expressing existential weight (the transience of all being)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Ein Schauer der Erinnerung durchfuhr sie.",
                context="Describing a sudden shiver of a memory",
                register="formal",
            ),
            PhrasebookEntry(
                text="Es liegt ein Zauber in diesen Worten.",
                context="Expressing that there is a magic / enchantment in certain words",
                register="formal",
            ),
        ],
    ),
    PhrasebookCategory(
        id="mediation_de_c2",
        level="C2",
        situation="Mediation, Paraphrasing & Interpreting",
        icon="\U0001f91d",
        phrases=[
            PhrasebookEntry(
                text="Wenn ich Sie richtig verstehe, geht es Ihnen vor allem um...",
                context="Clarifying the core concern in a mediation setting (formal)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Darf ich kurz zusammenfassen, was Sie gesagt haben?",
                context="Summarising someone's statement to ensure understanding (formal)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Auf Deutsch würde man das so ausdrücken: ...",
                context="Offering a German equivalent of a foreign-language expression",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Das ist schwer zu übersetzen, aber sinngemäß bedeutet es...",
                context="Explaining the meaning when a direct translation is hard",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Der Unterton suggeriert, dass...",
                context="Interpreting subtext (the undertone suggests that...)",
                register="neutral",
            ),
            PhrasebookEntry(
                text='Im Deutschen sagt man dazu: "...".',
                context="Providing the idiomatic German way of saying something",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Diese Redewendung hat im Deutschen keine eins-zu-eins-Entsprechung.",
                context="Explaining an idiom has no exact one-to-one German equivalent",
                register="formal",
            ),
            PhrasebookEntry(
                text="Gemeint ist damit...",
                context="Clarifying what is meant by a statement (what's meant is...)",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Lassen Sie mich das näher ausführen.",
                context="Offering to elaborate further on a point (formal)",
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
]
