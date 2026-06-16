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
                context="eine wissenschaftliche Arbeit eröffnen (die vorliegende Arbeit befasst sich mit)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Im Folgenden soll untersucht werden, inwiefern...",
                context="den Umfang einer Untersuchung ankündigen",
                register="formal",
            ),
            PhrasebookEntry(
                text="Vor diesem Hintergrund stellt sich die Frage, ob...",
                context="eine Forschungsfrage vor dem gegebenen Hintergrund aufwerfen",
                register="formal",
            ),
            PhrasebookEntry(
                text="Diese Annahme bedarf einer näheren Betrachtung.",
                context="sagen, dass eine Annahme näher betrachtet werden muss",
                register="formal",
            ),
            PhrasebookEntry(
                text="Es lässt sich konstatieren, dass...",
                context="ein Ergebnis feststellen (es lässt sich konstatieren, dass)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Daraus ergibt sich die Schlussfolgerung, dass...",
                context="zu einer Schlussfolgerung lenken (daraus ergibt sich die Schlussfolgerung)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Zusammenfassend lässt sich festhalten, dass...",
                context="Ergebnisse zusammenfassen (zusammenfassend lässt sich festhalten)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Die Daten legen nahe, dass...",
                context="Daten interpretieren (die Daten legen nahe, dass)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Dies wirft weiterführende Fragen auf.",
                context="feststellen, dass ein Thema weiterführende Fragen aufwirft",
                register="formal",
            ),
            PhrasebookEntry(
                text="In der Fachliteratur herrscht Einigkeit darüber, dass...",
                context="wissenschaftlichen Konsens zitieren",
                register="formal",
            ),
            PhrasebookEntry(
                text="Es sei an dieser Stelle angemerkt, dass...",
                context="eine wichtige Randbemerkung hinzufügen (es sei hier angemerkt)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Ein nicht zu vernachlässigender Aspekt ist...",
                context="einen nicht zu vernachlässigenden Aspekt hervorheben",
                register="formal",
            ),
            PhrasebookEntry(
                text="In Anbetracht der bisherigen Erkenntnisse...",
                context="bisherige Erkenntnisse anerkennen, bevor man fortfährt",
                register="formal",
            ),
            PhrasebookEntry(
                text="Abschließend sei erwähnt, dass...",
                context="mit einer abschließenden Bemerkung schließen",
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
                context="sehr formelle Eröffnung vor Publikum",
                register="formal",
            ),
            PhrasebookEntry(
                text="Ich möchte Ihre Aufmerksamkeit auf ... lenken.",
                context="die Aufmerksamkeit des Publikums auf einen Punkt lenken",
                register="formal",
            ),
            PhrasebookEntry(
                text="Lassen Sie mich dies anhand eines Beispiels verdeutlichen.",
                context="ein veranschaulichendes Beispiel einleiten",
                register="formal",
            ),
            PhrasebookEntry(
                text="Der entscheidende Punkt ist...",
                context="das Kernargument umreißen (der entscheidende Punkt ist)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Wie Sie sehen werden...",
                context="andeuten, was das Publikum beobachten wird",
                register="formal",
            ),
            PhrasebookEntry(
                text="An dieser Stelle möchte ich kurz innehalten.",
                context="für Betonung oder Reflexion in einer Rede innehalten",
                register="formal",
            ),
            PhrasebookEntry(
                text="Ich komme nun zum Kern meiner Ausführungen.",
                context="zum Kern der Rede überleiten",
                register="formal",
            ),
            PhrasebookEntry(
                text="Wenn Sie mir diesen kleinen Exkurs gestatten...",
                context="um Erlaubnis für eine kurze Abschweifung bitten",
                register="formal",
            ),
            PhrasebookEntry(
                text="Wenngleich ..., so ist doch...",
                context="konzessive Struktur (wenngleich ..., so ist doch)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Erlauben Sie mir, eine Schlussfolgerung zu ziehen.",
                context="signalisieren, dass man im Begriff ist, eine Schlussfolgerung zu ziehen",
                register="formal",
            ),
            PhrasebookEntry(
                text="Ich danke Ihnen für Ihre Aufmerksamkeit.",
                context="dem Publikum am Ende einer Rede danken",
                register="formal",
            ),
            PhrasebookEntry(
                text="Einwände sind selbstverständlich willkommen.",
                context="Einwände während der Fragerunde begrüßen",
                register="formal",
            ),
            PhrasebookEntry(
                text="Dem möchte ich noch hinzufügen...",
                context="einen ergänzenden Punkt hinzufügen",
                register="formal",
            ),
            PhrasebookEntry(
                text="Dass dies nicht ohne Folgen bleiben kann, liegt auf der Hand.",
                context="die offensichtliche Tragweite einer Situation feststellen",
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
                context="respektvoll auf etwas hinweisen (mit Verlaub)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Das wirft die grundsätzliche Frage auf, ob...",
                context="eine grundsätzliche Frage aufwerfen",
                register="formal",
            ),
            PhrasebookEntry(
                text="Man sollte sich vor voreiligen Schlüssen hüten.",
                context="vor voreiligen Schlüssen warnen",
                register="formal",
            ),
            PhrasebookEntry(
                text="Es wäre ein Trugschluss zu glauben, dass...",
                context="auf einen Trugschluss hinweisen (es wäre ein Trugschluss zu glauben)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Lassen Sie uns das Problem von einer anderen Seite angehen.",
                context="einen anderen Lösungsansatz vorschlagen",
                register="neutral",
            ),
            PhrasebookEntry(
                text="In diesem Punkt herrscht weitgehend Konsens.",
                context="feststellen, dass breiter Konsens zu einem Punkt herrscht",
                register="formal",
            ),
            PhrasebookEntry(
                text="Ich kann mich des Eindrucks nicht erwehren, dass...",
                context="sagen, dass man den Eindruck nicht loswird",
                register="formal",
            ),
            PhrasebookEntry(
                text="Dem liegt die Annahme zugrunde, dass...",
                context="eine zugrundeliegende Annahme aufdecken",
                register="formal",
            ),
            PhrasebookEntry(
                text="Mir scheint, dass hier ein Denkfehler vorliegt.",
                context="höflich auf einen Denkfehler hinweisen",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Die Crux der Sache liegt darin, dass...",
                context="den Kern des Problems identifizieren",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Man könnte dem entgegnen, dass...",
                context="ein Gegenargument vorwegnehmen (man könnte entgegnen)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Ich kann Ihre Bedenken durchaus nachvollziehen.",
                context="die Bedenken anderer bestätigen (ich kann Ihre Bedenken durchaus nachvollziehen)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Das soll nicht heißen, dass...",
                context="klarstellen, was man NICHT sagt",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Die Beweislast liegt bei demjenigen, der die Behauptung aufstellt.",
                context="sich auf die Beweislast berufen",
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
                context="üblicher Gruß in Österreich und Bayern (wörtlich 'grüß Gott')",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Servus!",
                context="informeller Gruß/Abschied in Österreich und Bayern",
                register="informal",
            ),
            PhrasebookEntry(
                text="Pfiat di!",
                context="österreichischer/bayerischer Abschiedsgruß (wörtlich 'behüt dich Gott')",
                register="informal",
            ),
            PhrasebookEntry(
                text="Das ist leiwand.",
                context="österreichisch für 'das ist cool / toll'",
                register="informal",
            ),
            PhrasebookEntry(
                text="Das geht sich aus.",
                context="österreichisch für 'das geht sich aus / das passt'",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Grüezi!",
                context="übliche schweizerdeutsche Begrüßung (formell)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Merci vielmal!",
                context="schweizerdeutsch 'vielen Dank' (aus dem Französischen entlehnt)",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Uf Wiederluege!",
                context="schweizerdeutscher Abschiedsgruß (wörtlich 'auf Wiedersehen')",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Das ist ein Schmafu.",
                context="österreichisch für 'das ist Unsinn / Blödsinn'",
                register="informal",
            ),
            PhrasebookEntry(
                text="Es isch schön gsi.",
                context="Schweizer Dialekt für 'es war schön' — informeller Abschied",
                register="informal",
            ),
            PhrasebookEntry(
                text="Ein Kracherl, bitte.",
                context="österreichisch für 'eine Limonade, bitte'",
                register="informal",
            ),
            PhrasebookEntry(
                text="Passt schon.",
                context="bayerisch/österreichisch für 'ist in Ordnung / passt schon'",
                register="informal",
            ),
            PhrasebookEntry(
                text="Das Velo abstellen.",
                context="schweizerdeutsch: 'das Fahrrad abstellen' (Velo = Fahrrad in der Schweiz)",
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
                context="formell auf Entscheidungen der Bundesregierung verweisen",
                register="formal",
            ),
            PhrasebookEntry(
                text="Dies wirft die grundsätzliche Frage nach der Verhältnismäßigkeit auf.",
                context="die Verhältnismäßigkeitsfrage in der politischen Debatte aufwerfen",
                register="formal",
            ),
            PhrasebookEntry(
                text="Im Grundgesetz ist verankert, dass...",
                context="das Grundgesetz zitieren",
                register="formal",
            ),
            PhrasebookEntry(
                text="Die Opposition wirft der Regierung vor, ...",
                context="der Regierung Vorwürfe machen (übliche politische Darstellung)",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Darüber hinaus besteht dringender Handlungsbedarf.",
                context="dringenden Handlungsbedarf zu einem Thema feststellen",
                register="formal",
            ),
            PhrasebookEntry(
                text="Dem stehen allerdings erhebliche verfassungsrechtliche Bedenken entgegen.",
                context="einem politischen Vorschlag mit verfassungsrechtlichen Bedenken entgegnen",
                register="formal",
            ),
            PhrasebookEntry(
                text="Die Fraktion hat einen entsprechenden Antrag eingebracht.",
                context="auf einen parlamentarischen Antrag verweisen (Bundestagskontext)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Die Zivilgesellschaft fordert mehr Transparenz.",
                context="auf Forderungen der Zivilgesellschaft nach Transparenz verweisen",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Dieses Thema ist Gegenstand einer kontroversen öffentlichen Debatte.",
                context="anerkennen, dass ein Thema öffentlich kontrovers ist",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Der Gesetzentwurf sieht vor, dass...",
                context="Bestimmungen eines Gesetzentwurfs erörtern",
                register="formal",
            ),
            PhrasebookEntry(
                text="Das verstößt gegen das Diskriminierungsverbot.",
                context="einen Verstoß gegen das Diskriminierungsverbot behaupten",
                register="formal",
            ),
            PhrasebookEntry(
                text="Langfristig betrachtet ist diese Politik nicht nachhaltig.",
                context="langfristige Kritik an einer Politikrichtung",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Die Mehrheitsverhältnisse im Bundestag lassen dies derzeit nicht zu.",
                context="politische Machbarkeit anhand der Mehrheitsverhältnisse im Bundestag einschätzen",
                register="formal",
            ),
        ],
    ),
]
