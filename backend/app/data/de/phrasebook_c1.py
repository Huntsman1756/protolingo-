"""German phrasebook — C1 categories."""

from app.data._types import PhrasebookCategory, PhrasebookEntry

C1_CATEGORIES: list[PhrasebookCategory] = [
    PhrasebookCategory(
        id="akademisch_de_c1",
        level="C1",
        situation="Akademisches Schreiben & Diskurs",
        icon="\U0001f4dd",
        phrases=[
            PhrasebookEntry(
                text="Die vorliegende Arbeit befasst sich mit...",
                context="Eröffnen an academic paper (the present paper deals with...)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Im Folgenden soll untersucht werden, inwiefern...",
                context="Ankündigen the scope of an investigation",
                register="formal",
            ),
            PhrasebookEntry(
                text="Vor diesem Hintergrund stellt sich die Frage, ob...",
                context="Aufwerfen a research question against the background given",
                register="formal",
            ),
            PhrasebookEntry(
                text="Diese Annahme bedarf einer näheren Betrachtung.",
                context="Sagen an assumption requires closer examination",
                register="formal",
            ),
            PhrasebookEntry(
                text="Es lässt sich konstatieren, dass...",
                context="Feststellen a finding (it can be stated / observed that)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Daraus ergibt sich die Schlussfolgerung, dass...",
                context="Lenken a conclusion (from this follows the conclusion that)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Zusammenfassend lässt sich festhalten, dass...",
                context="Zusammenfassen findings (in summary it can be held that)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Die Daten legen nahe, dass...",
                context="Interpretieren data (the data suggest that)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Dies wirft weiterführende Fragen auf.",
                context="Feststellen that an issue raises further questions",
                register="formal",
            ),
            PhrasebookEntry(
                text="In der Fachliteratur herrscht Einigkeit darüber, dass...",
                context="Zitieren academic consensus",
                register="formal",
            ),
            PhrasebookEntry(
                text="Es sei an dieser Stelle angemerkt, dass...",
                context="Adding an important side note (it should be noted here that)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Ein nicht zu vernachlässigender Aspekt ist...",
                context="Hervorheben an aspect that cannot be neglected",
                register="formal",
            ),
            PhrasebookEntry(
                text="In Anbetracht der bisherigen Erkenntnisse...",
                context="Anerkennen prior findings before proceeding",
                register="formal",
            ),
            PhrasebookEntry(
                text="Abschließend sei erwähnt, dass...",
                context="Abschließen with a final remark (in closing, it should be mentioned that)",
                register="formal",
            ),
        ],
    ),
    PhrasebookCategory(
        id="rhetorik_de_c1",
        level="C1",
        situation="Rhetorik & Öffentliches Reden",
        icon="\U0001f3a4",
        phrases=[
            PhrasebookEntry(
                text="Meine sehr verehrten Damen und Herren,",
                context="Highly formal opening to an audience",
                register="formal",
            ),
            PhrasebookEntry(
                text="Ich möchte Ihre Aufmerksamkeit auf ... lenken.",
                context="Lenken the audience's attention to a point",
                register="formal",
            ),
            PhrasebookEntry(
                text="Lassen Sie mich dies anhand eines Beispiels verdeutlichen.",
                context="Einleiten an illustrative example",
                register="formal",
            ),
            PhrasebookEntry(
                text="Der entscheidende Punkt ist...",
                context="Umreißen the key argument (the decisive point is)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Wie Sie sehen werden...",
                context="Andeuten what the audience will observe",
                register="formal",
            ),
            PhrasebookEntry(
                text="An dieser Stelle möchte ich kurz innehalten.",
                context="Innehalten in a speech for emphasis or reflection",
                register="formal",
            ),
            PhrasebookEntry(
                text="Ich komme nun zum Kern meiner Ausführungen.",
                context="Überleiten to the heart of the speech",
                register="formal",
            ),
            PhrasebookEntry(
                text="Wenn Sie mir diesen kleinen Exkurs gestatten...",
                context="Fragen permission for a brief digression",
                register="formal",
            ),
            PhrasebookEntry(
                text="Wenngleich ..., so ist doch...",
                context="Concessive structure (although ..., nevertheless)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Erlauben Sie mir, eine Schlussfolgerung zu ziehen.",
                context="Signalisieren you are about to draw a conclusion",
                register="formal",
            ),
            PhrasebookEntry(
                text="Ich danke Ihnen für Ihre Aufmerksamkeit.",
                context="Danken the audience at the end of a speech",
                register="formal",
            ),
            PhrasebookEntry(
                text="Einwände sind selbstverständlich willkommen.",
                context="Begrüßen objections during a Q&A session",
                register="formal",
            ),
            PhrasebookEntry(
                text="Dem möchte ich noch hinzufügen...",
                context="Adding a supplementary point",
                register="formal",
            ),
            PhrasebookEntry(
                text="Dass dies nicht ohne Folgen bleiben kann, liegt auf der Hand.",
                context="Feststellen the obvious gravity of a situation",
                register="formal",
            ),
        ],
    ),
    PhrasebookCategory(
        id="intellektuell_de_c1",
        level="C1",
        situation="Intellektuelle Diskussion & Kritisches Denken",
        icon="\U0001f52c",
        phrases=[
            PhrasebookEntry(
                text="Mit Verlaub möchte ich darauf hinweisen, dass...",
                context="Respectfully pointing something out (with your leave)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Das wirft die grundsätzliche Frage auf, ob...",
                context="Aufwerfen a fundamental question",
                register="formal",
            ),
            PhrasebookEntry(
                text="Man sollte sich vor voreiligen Schlüssen hüten.",
                context="Warnen against jumping to conclusions",
                register="formal",
            ),
            PhrasebookEntry(
                text="Es wäre ein Trugschluss zu glauben, dass...",
                context="Bezeichnen out a fallacy (it would be a fallacy to believe that)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Lassen Sie uns das Problem von einer anderen Seite angehen.",
                context="Vorschlagen a different approach to a problem",
                register="neutral",
            ),
            PhrasebookEntry(
                text="In diesem Punkt herrscht weitgehend Konsens.",
                context="Feststellen that there is broad consensus on a point",
                register="formal",
            ),
            PhrasebookEntry(
                text="Ich kann mich des Eindrucks nicht erwehren, dass...",
                context="Sagen you can't shake the impression that",
                register="formal",
            ),
            PhrasebookEntry(
                text="Dem liegt die Annahme zugrunde, dass...",
                context="Uncovering an underlying assumption",
                register="formal",
            ),
            PhrasebookEntry(
                text="Mir scheint, dass hier ein Denkfehler vorliegt.",
                context="Politely suggesting a logical error",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Die Crux der Sache liegt darin, dass...",
                context="Identifying the crux of the matter",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Man könnte dem entgegnen, dass...",
                context="Anticipating a counter-argument (one could counter that)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Ich kann Ihre Bedenken durchaus nachvollziehen.",
                context="Validating someone's reservations (I can well understand your concerns)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Das soll nicht heißen, dass...",
                context="Clarifying what you are NOT saying",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Die Beweislast liegt bei demjenigen, der die Behauptung aufstellt.",
                context="Invoking the burden of proof",
                register="formal",
            ),
        ],
    ),
    PhrasebookCategory(
        id="varietaeten_de_c1",
        level="C1",
        situation="Deutsche Varietäten — Österreichische & Schweizer Ausdrücke",
        icon="\U0001f30d",
        phrases=[
            PhrasebookEntry(
                text="Grüß Gott!",
                context="Common greeting in Austria and Bavaria (literally 'greet God')",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Servus!",
                context="Informal hi/bye in Austria and Bavaria",
                register="informal",
            ),
            PhrasebookEntry(
                text="Pfiat di!",
                context="Austrian/Bavarian goodbye (literally 'may God keep you')",
                register="informal",
            ),
            PhrasebookEntry(
                text="Das ist leiwand.",
                context="Austrian for 'that's cool / awesome'",
                register="informal",
            ),
            PhrasebookEntry(
                text="Das geht sich aus.",
                context="Austrian for 'that works out / that fits'",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Grüezi!",
                context="Standard Swiss-German greeting (formal)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Merci vielmal!",
                context="Swiss-German 'thank you very much' (borrowed from French)",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Uf Wiederluege!",
                context="Swiss-German goodbye (literally 'on seeing again')",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Das ist ein Schmafu.",
                context="Austrian for 'that's nonsense / rubbish'",
                register="informal",
            ),
            PhrasebookEntry(
                text="Es isch schön gsi.",
                context="Swiss-German dialect for 'it was nice' — informell farewell",
                register="informal",
            ),
            PhrasebookEntry(
                text="Ein Kracherl, bitte.",
                context="Austrian for 'a lemonade / soft drink, please'",
                register="informal",
            ),
            PhrasebookEntry(
                text="Passt schon.",
                context="Bavarian/Austrian for 'it's fine / no worries'",
                register="informal",
            ),
            PhrasebookEntry(
                text="Das Velo abstellen.",
                context="Swiss-German: 'park the bicycle' (Velo = bicycle in Switzerland)",
                register="neutral",
            ),
        ],
    ),
    PhrasebookCategory(
        id="politik_de_c1",
        level="C1",
        situation="Politik & Gesellschaft",
        icon="\U0001f3db",
        phrases=[
            PhrasebookEntry(
                text="Die Bundesregierung hat beschlossen, dass...",
                context="Formell reference to federal government decisions",
                register="formal",
            ),
            PhrasebookEntry(
                text="Dies wirft die grundsätzliche Frage nach der Verhältnismäßigkeit auf.",
                context="Aufwerfen the proportionality question in political debate",
                register="formal",
            ),
            PhrasebookEntry(
                text="Im Grundgesetz ist verankert, dass...",
                context="Zitieren the German Basic Law (constitution)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Die Opposition wirft der Regierung vor, ...",
                context="Beschuldigen the government (Standard political framing)",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Darüber hinaus besteht dringender Handlungsbedarf.",
                context="Feststellen urgent need for action on an issue",
                register="formal",
            ),
            PhrasebookEntry(
                text="Dem stehen allerdings erhebliche verfassungsrechtliche Bedenken entgegen.",
                context="Entgegnen a political proposal with constitutional concerns",
                register="formal",
            ),
            PhrasebookEntry(
                text="Die Fraktion hat einen entsprechenden Antrag eingebracht.",
                context="Verweisen to a parliamentary motion (Bundestag context)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Die Zivilgesellschaft fordert mehr Transparenz.",
                context="Referencing civil society demands for transparency",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Dieses Thema ist Gegenstand einer kontroversen öffentlichen Debatte.",
                context="Anerkennen a topic is publicly controversial",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Der Gesetzentwurf sieht vor, dass...",
                context="Discussing provisions of a draft law",
                register="formal",
            ),
            PhrasebookEntry(
                text="Das verstößt gegen das Diskriminierungsverbot.",
                context="Alleging a violation of anti-discrimination law",
                register="formal",
            ),
            PhrasebookEntry(
                text="Langfristig betrachtet ist diese Politik nicht nachhaltig.",
                context="Long-term criticism of a policy direction",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Die Mehrheitsverhältnisse im Bundestag lassen dies derzeit nicht zu.",
                context="Assessing political feasibility based on parliamentary arithmetic",
                register="formal",
            ),
        ],
    ),
]
