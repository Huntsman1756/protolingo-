"""German phrasebook — B2 categories."""

from app.data._types import PhrasebookCategory, PhrasebookEntry

B2_CATEGORIES: list[PhrasebookCategory] = [
    PhrasebookCategory(
        id="argumentation_de_b2",
        level="B2",
        situation="Structured Argumentation",
        icon="\U0001f9e0",
        phrases=[
            PhrasebookEntry(
                text="Zunächst einmal ist festzuhalten, dass...",
                context="Opening a formal argument (first of all, it should be noted that...)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Dem lässt sich entgegenhalten, dass...",
                context="Introducing a counter-argument (one could counter that...)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Ein weiterer Aspekt, der berücksichtigt werden muss, ist...",
                context="Adding another aspect that must be considered",
                register="formal",
            ),
            PhrasebookEntry(
                text="Man darf nicht außer Acht lassen, dass...",
                context="Warning not to overlook a key fact",
                register="formal",
            ),
            PhrasebookEntry(
                text="Diese Schlussfolgerung ist nicht zwingend.",
                context="Challenging a conclusion as not logically compelling",
                register="formal",
            ),
            PhrasebookEntry(
                text="Das führt uns zu der Frage, ob...",
                context="Guiding the discussion to a central question",
                register="formal",
            ),
            PhrasebookEntry(
                text="Aus diesem Grund bin ich der festen Überzeugung, dass...",
                context="Stating a firm conviction after reasoning",
                register="formal",
            ),
            PhrasebookEntry(
                text="Hierbei handelt es sich um eine gravierende Vereinfachung.",
                context="Calling out a serious oversimplification",
                register="formal",
            ),
            PhrasebookEntry(
                text="Ich möchte noch einen Punkt ins Feld führen.",
                context="Bringing forward an additional point",
                register="formal",
            ),
            PhrasebookEntry(
                text="Das ist insofern problematisch, als...",
                context="Explaining why something is problematic",
                register="formal",
            ),
            PhrasebookEntry(
                text="Es wäre verfehlt, daraus zu schließen, dass...",
                context="Rejecting a wrong conclusion (it would be wrong to conclude that)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Nicht zuletzt spricht dafür, dass...",
                context="Adding a final weighty argument in favour",
                register="formal",
            ),
            PhrasebookEntry(
                text="Zusammenfassend lässt sich sagen, dass...",
                context="Summarising the argument",
                register="formal",
            ),
            PhrasebookEntry(
                text="Die Kehrseite der Medaille ist jedoch...",
                context="Pointing out the downside (the flip side of the coin)",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Das wirft ein ganz anderes Licht auf die Sache.",
                context="Saying a new fact radically changes how we see things",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Die aktuelle Studienlage belegt eindeutig, dass...",
                context="Citing research evidence",
                register="formal",
            ),
        ],
    ),
    PhrasebookCategory(
        id="formell_email_de_b2",
        level="B2",
        situation="Formal Email & Written Correspondence",
        icon="\U0001f4e7",
        phrases=[
            PhrasebookEntry(
                text="Sehr geehrte Damen und Herren,",
                context="Standard formal salutation (Dear Sir or Madam)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Sehr geehrter Herr ...,",
                context="Salutation to a named male recipient",
                register="formal",
            ),
            PhrasebookEntry(
                text="ich wende mich an Sie bezüglich...",
                context="Opening line stating the subject (I'm writing to you regarding)...",
                register="formal",
            ),
            PhrasebookEntry(
                text="Vielen Dank für Ihre Rückmeldung.",
                context="Thanking someone for their reply",
                register="formal",
            ),
            PhrasebookEntry(
                text="Ich nehme Bezug auf Ihr Schreiben vom...",
                context="Referring to a previous letter (I refer to your letter of...)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Bezug nehmend auf unser Telefonat...",
                context="Referring to a previous phone call",
                register="formal",
            ),
            PhrasebookEntry(
                text="Anbei finden Sie die angeforderten Dokumente.",
                context="'Please find attached the requested documents.'",
                register="formal",
            ),
            PhrasebookEntry(
                text="Für Rückfragen stehe ich Ihnen gerne zur Verfügung.",
                context="Offering availability for follow-up questions",
                register="formal",
            ),
            PhrasebookEntry(
                text="Ich bitte um Verständnis für die Verspätung.",
                context="Asking for understanding for a delay",
                register="formal",
            ),
            PhrasebookEntry(
                text="Mit freundlichen Grüßen,",
                context="Standard formal closing (yours sincerely / kind regards)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Ich möchte einen Termin vereinbaren.",
                context="Requesting to arrange an appointment",
                register="formal",
            ),
            PhrasebookEntry(
                text="Vielen Dank im Voraus für Ihre Bemühungen.",
                context="Thanking someone in advance for their efforts",
                register="formal",
            ),
            PhrasebookEntry(
                text="Leider muss ich Ihnen mitteilen, dass...",
                context="Delivering bad news politely (I regret to inform you that...)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Ich hoffe auf eine positive Rückmeldung.",
                context="Expressing hope for a favourable reply",
                register="formal",
            ),
            PhrasebookEntry(
                text="Ich wäre Ihnen dankbar, wenn Sie...",
                context="Making a polite request (I would be grateful if you...)",
                register="formal",
            ),
        ],
    ),
    PhrasebookCategory(
        id="nuancen_de_b2",
        level="B2",
        situation="Nuance & Disambiguation",
        icon="\u2696\ufe0f",
        phrases=[
            PhrasebookEntry(
                text="Das ist nicht ganz falsch, aber...",
                context="Partially conceding before correcting",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Es kommt auf den Zusammenhang an.",
                context="Saying it depends on the context",
                register="neutral",
            ),
            PhrasebookEntry(
                text="So pauschal kann man das nicht sagen.",
                context="Refusing to generalise (you can't say that so broadly)",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich würde das etwas differenzierter betrachten.",
                context="Suggesting a more nuanced view",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Grundsätzlich stimme ich zu, jedoch...",
                context="Agreeing in principle but adding a caveat",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Man muss zwischen ... und ... unterscheiden.",
                context="Pointing out a necessary distinction",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Unter bestimmten Umständen mag das zutreffen.",
                context="Conceding that it could be true in certain circumstances",
                register="formal",
            ),
            PhrasebookEntry(
                text="Das ist eine Frage der Perspektive.",
                context="Saying it is a matter of perspective",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Auf den ersten Blick scheint es so, aber...",
                context="Appearing to agree before disagreeing (at first glance...)",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Das ist nur die halbe Wahrheit.",
                context="Saying someone is not telling the whole truth",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Nicht unbedingt.",
                context="Gentle disagreement (not necessarily)",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Es wäre übertrieben zu behaupten, dass...",
                context="Softening an exaggerated claim",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Gewissermaßen ja, aber...",
                context="Partial agreement with reservation (in a sense yes, but)",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Man sollte die Kirche im Dorf lassen.",
                context="Admonishing not to exaggerate (let's not get carried away)",
                register="informal",
            ),
            PhrasebookEntry(
                text="Das ist Ansichtssache.",
                context="Saying it's a matter of opinion",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich möchte nicht in Abrede stellen, dass..., aber...",
                context="Conceding a point before arguing against it (formal)",
                register="formal",
            ),
        ],
    ),
    PhrasebookCategory(
        id="medien_de_b2",
        level="B2",
        situation="Media & News",
        icon="\U0001f4f0",
        phrases=[
            PhrasebookEntry(
                text="Laut einem Bericht der...",
                context="Citing a report (according to a report by...)",
                register="neutral",
            ),
            PhrasebookEntry(
                text="In den Nachrichten wurde berichtet, dass...",
                context="Referring to a news report",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Die Schlagzeilen heute Morgen besagen, dass...",
                context="Referring to this morning's headlines",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Das ist eine vertrauenswürdige Quelle.",
                context="Vouching for a source's reliability",
                register="neutral",
            ),
            PhrasebookEntry(
                text="In den sozialen Medien geht gerade das Gerücht um, dass...",
                context="Reporting a rumour on social media",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Der Artikel stellt die Fakten verdreht dar.",
                context="Criticising biased or distorted reporting",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich lese regelmäßig die Online-Ausgabe der...",
                context="Saying you regularly read the online edition of a newspaper",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Was hältst du von der Berichterstattung über...?",
                context="Asking someone's opinion on news coverage (informal)",
                register="informal",
            ),
            PhrasebookEntry(
                text="Das wurde von den Medien völlig aufgebauscht.",
                context="Saying the media completely hyped something up",
                register="informal",
            ),
            PhrasebookEntry(
                text="Man sollte immer mehrere Quellen prüfen.",
                context="Advice to cross-check sources",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Die Sendung läuft jeden Donnerstag um 20:15 Uhr.",
                context="Giving the schedule of a TV show",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich habe das im Radio gehört.",
                context="Saying you heard something on the radio",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Da gab es eine interessante Dokumentation über...",
                context="Mentioning an interesting documentary",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Der Kommentar war sehr einseitig.",
                context="Criticising a one-sided commentary",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Fake News sind ein zunehmendes Problem.",
                context="Commenting on the growing problem of fake news",
                register="neutral",
            ),
        ],
    ),
    PhrasebookCategory(
        id="redewendungen_de_b2",
        level="B2",
        situation="Idiomatic Expressions & Colloquialisms",
        icon="\U0001f3ad",
        phrases=[
            PhrasebookEntry(
                text="Da ist der Wurm drin.",
                context="Saying something is wrong / there's a hitch",
                register="informal",
            ),
            PhrasebookEntry(
                text="Ich drücke dir die Daumen!",
                context="Wishing someone luck (I'll keep my fingers crossed for you)",
                register="informal",
            ),
            PhrasebookEntry(
                text="Das ist nicht mein Bier.",
                context="Saying it's not my problem (not my beer)",
                register="informal",
            ),
            PhrasebookEntry(
                text="Da haben wir den Salat.",
                context="Lamenting a mess (now we're in a fine mess)",
                register="informal",
            ),
            PhrasebookEntry(
                text="Das Leben ist kein Ponyhof.",
                context="Life's not a bed of roses / life isn't all sunshine",
                register="informal",
            ),
            PhrasebookEntry(
                text="In der Kürze liegt die Würze.",
                context="Brevity is the soul of wit",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Alles in Butter.",
                context="Everything's fine / all good",
                register="informal",
            ),
            PhrasebookEntry(
                text="Ich verstehe nur Bahnhof.",
                context="Saying you don't understand a thing (I only understand train station)",
                register="informal",
            ),
            PhrasebookEntry(
                text="Das ist mir Wurst.",
                context="Saying you don't care (it's sausage to me)",
                register="informal",
            ),
            PhrasebookEntry(
                text="Jetzt mal Butter bei die Fische.",
                context="Let's get down to brass tacks / let's be frank",
                register="informal",
            ),
            PhrasebookEntry(
                text="Da liegt der Hund begraben.",
                context="That's the crux of the matter (there lies the dog buried)",
                register="informal",
            ),
            PhrasebookEntry(
                text="Aus der Haut fahren.",
                context="To fly off the handle / lose one's temper",
                register="informal",
            ),
            PhrasebookEntry(
                text="Das Kind beim Namen nennen.",
                context="To call a spade a spade (to name the child)",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Etwas auf die lange Bank schieben.",
                context="To put something off / procrastinate (to push onto the long bench)",
                register="neutral",
            ),
        ],
    ),
]
