"""German phrasebook — B1 categories."""

from app.data._types import PhrasebookCategory, PhrasebookEntry

B1_CATEGORIES: list[PhrasebookCategory] = [
    PhrasebookCategory(
        id="meinungen_de_b1",
        level="B1",
        situation="Meinungen äußern",
        icon="\U0001f4ad",
        phrases=[
            PhrasebookEntry(
                text="Meiner Meinung nach...",
                context="eine persönliche Meinung einleiten",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich finde, dass...",
                context="ausdrücken, was man denkt / findet",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich glaube, dass...",
                context="eine Überzeugung ausdrücken",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich bin der Ansicht, dass...",
                context="eine formelle Meinung äußern (ich bin der Ansicht, dass)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Meiner Erfahrung nach...",
                context="aus persönlicher Erfahrung sprechen",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Das sehe ich anders.",
                context="direkt widersprechen (ich sehe das anders)",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Da bin ich ganz Ihrer Meinung.",
                context="voll zustimmen (formell: ganz Ihrer Meinung)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Ich stimme Ihnen zu.",
                context="formell zustimmen",
                register="formal",
            ),
            PhrasebookEntry(
                text="Da muss ich widersprechen.",
                context="widersprechen (da muss ich widersprechen)",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Was halten Sie davon?",
                context="formell nach der Meinung fragen",
                register="formal",
            ),
            PhrasebookEntry(
                text="Es kommt darauf an.",
                context="sagen 'es kommt darauf an'",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Auf der einen Seite..., auf der anderen Seite...",
                context="zwei Seiten abwägen (einerseits..., andererseits...)",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Das überzeugt mich nicht.",
                context="sagen, dass einen etwas nicht überzeugt",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Für mich steht fest, dass...",
                context="eine feste Überzeugung äußern",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich würde sagen, dass...",
                context="eine Meinung vorsichtig äußern (ich würde sagen, dass)",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich bin hin- und hergerissen.",
                context="Unentschlossenheit ausdrücken (ich bin hin- und hergerissen)",
                register="informal",
            ),
        ],
    ),
    PhrasebookCategory(
        id="beschwerden_de_b1",
        level="B1",
        situation="Beschwerden & Unmutsäußerung",
        icon="\U0001f624",
        phrases=[
            PhrasebookEntry(
                text="Ich möchte mich beschweren.",
                context="eine formelle Beschwerde eröffnen",
                register="formal",
            ),
            PhrasebookEntry(
                text="Das ist nicht in Ordnung.",
                context="sagen, dass etwas nicht akzeptabel ist",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich bin sehr unzufrieden mit...",
                context="Unzufriedenheit mit etwas ausdrücken",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Das ist nicht das, was ich bestellt habe.",
                context="sich beschweren, dass man den falschen Artikel bekommen hat",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich warte schon seit einer halben Stunde.",
                context="sich über lange Wartezeit beschweren",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Können Sie mir bitte erklären, warum...?",
                context="formell um Erklärung eines Problems bitten",
                register="formal",
            ),
            PhrasebookEntry(
                text="Das lässt zu wünschen übrig.",
                context="sagen, dass etwas viel zu wünschen übrig lässt",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich verlange eine Entschädigung.",
                context="Entschädigung fordern",
                register="formal",
            ),
            PhrasebookEntry(
                text="So kann das nicht weitergehen.",
                context="darauf bestehen, dass sich etwas ändern muss",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich möchte mit dem Geschäftsführer sprechen.",
                context="darum bitten, mit dem Geschäftsführer sprechen zu können",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Das ist eine Frechheit!",
                context="Empörung ausdrücken (das ist eine Frechheit!)",
                register="informal",
            ),
            PhrasebookEntry(
                text="Hier stimmt etwas nicht.",
                context="darauf hinweisen, dass etwas nicht stimmt",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich fühle mich ungerecht behandelt.",
                context="sagen, dass man sich ungerecht behandelt fühlt",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Darauf werde ich nicht sitzen bleiben.",
                context="geloben, etwas nicht auf sich sitzen zu lassen",
                register="informal",
            ),
            PhrasebookEntry(
                text="Hier muss sich etwas ändern.",
                context="feststellen, dass Veränderung notwendig ist",
                register="neutral",
            ),
        ],
    ),
    PhrasebookCategory(
        id="beruf_de_b1",
        level="B1",
        situation="Berufsleben & Arbeit",
        icon="\U0001f4bc",
        phrases=[
            PhrasebookEntry(
                text="Ich arbeite in der ...-Branche.",
                context="sagen, in welcher Branche man arbeitet",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich bin für ... zuständig.",
                context="sagen, wofür man zuständig ist",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Wir haben ein Meeting um...",
                context="sagen, dass um eine bestimmte Uhrzeit ein Meeting ist",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Könnten Sie mir das bitte per E-Mail schicken?",
                context="formell darum bitten, etwas per E-Mail zu schicken",
                register="formal",
            ),
            PhrasebookEntry(
                text="Ich muss noch den Bericht fertigstellen.",
                context="sagen, dass man noch einen Bericht fertigstellen muss",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Wie läuft das Projekt?",
                context="nach dem Stand des Projekts fragen",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Wir sind im Zeitplan.",
                context="sagen, dass man im Zeitplan liegt",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich brauche mehr Zeit dafür.",
                context="um mehr Zeit für eine Aufgabe bitten",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Das gehört nicht zu meinen Aufgaben.",
                context="sagen, dass etwas nicht zu den eigenen Aufgaben gehört",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Wann ist die Frist?",
                context="nach der Frist fragen",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich möchte gerne ein paar Tage Urlaub nehmen.",
                context="sagen, dass man ein paar Tage Urlaub nehmen möchte",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Können Sie mich vertreten?",
                context="einen Kollegen formell um Vertretung bitten",
                register="formal",
            ),
            PhrasebookEntry(
                text="Ich habe nächste Woche eine Fortbildung.",
                context="sagen, dass man nächste Woche eine Fortbildung hat",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Wie sieht es mit einer Gehaltserhöhung aus?",
                context="das Thema Gehaltserhöhung ansprechen",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Wir sollten das im Team besprechen.",
                context="vorschlagen, etwas im Team zu besprechen",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich bin mit meiner Arbeit zufrieden.",
                context="sagen, dass man mit seiner Arbeit zufrieden ist",
                register="neutral",
            ),
        ],
    ),
    PhrasebookCategory(
        id="sozial_de_b1",
        level="B1",
        situation="Sozialleben & Pläne schmieden",
        icon="\U0001f389",
        phrases=[
            PhrasebookEntry(
                text="Hast du Lust, am Wochenende etwas zu unternehmen?",
                context="einen Freund fragen, ob er am Wochenende etwas unternehmen möchte",
                register="informal",
            ),
            PhrasebookEntry(
                text="Wollen wir uns auf einen Kaffee treffen?",
                context="jemanden auf einen Kaffee einladen",
                register="informal",
            ),
            PhrasebookEntry(
                text="Ich lade dich ein.",
                context="anbieten zu zahlen (ich lade dich ein)",
                register="informal",
            ),
            PhrasebookEntry(
                text="Es war schön, dich wiederzusehen!",
                context="sagen, dass es schön war, jemanden wiederzusehen",
                register="informal",
            ),
            PhrasebookEntry(
                text="Das müssen wir unbedingt wiederholen.",
                context="vorschlagen, etwas bald wieder zu machen",
                register="informal",
            ),
            PhrasebookEntry(
                text="Wie war dein Wochenende?",
                context="einen Freund nach seinem Wochenende fragen",
                register="informal",
            ),
            PhrasebookEntry(
                text="Ich kenne einen tollen Ort.",
                context="einen schönen Ort empfehlen",
                register="informal",
            ),
            PhrasebookEntry(
                text="Kommst du zu meiner Party?",
                context="einen Freund zur eigenen Party einladen",
                register="informal",
            ),
            PhrasebookEntry(
                text="Das ist aber eine schöne Überraschung!",
                context="auf eine schöne Überraschung reagieren",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Wie läuft's bei dir?",
                context="einen Freund beiläufig fragen, wie es ihm geht",
                register="informal",
            ),
            PhrasebookEntry(
                text="Ich wünsche dir alles Gute!",
                context="jemandem alles Gute wünschen",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Herzlichen Glückwunsch!",
                context="jemandem gratulieren",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Wir haben uns so viel zu erzählen!",
                context="begeistert sagen, dass man sich viel zu erzählen hat",
                register="informal",
            ),
            PhrasebookEntry(
                text="Tut mir leid, ich kann leider nicht.",
                context="eine Einladung höflich ablehnen",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Vielleicht ein anderes Mal.",
                context="einen Alternativtermin vorschlagen (vielleicht ein anderes Mal)",
                register="neutral",
            ),
        ],
    ),
    PhrasebookCategory(
        id="debatten_de_b1",
        level="B1",
        situation="Debatten & Diskussionen",
        icon="\U0001f5e3\ufe0f",
        phrases=[
            PhrasebookEntry(
                text="Lassen Sie mich ausreden.",
                context="formell darum bitten, ausreden zu dürfen",
                register="formal",
            ),
            PhrasebookEntry(
                text="Verstehe ich Sie richtig, dass...?",
                context="in einer Debatte Verständnis prüfen (formell)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Es geht nicht um die Person, sondern um die Sache.",
                context="die Debatte sachlich halten, nicht persönlich werden",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich will nicht unterbrechen, aber...",
                context="höflich unterbrechen",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Das Argument zieht nicht.",
                context="sagen, dass ein Argument nicht stichhaltig ist",
                register="informal",
            ),
            PhrasebookEntry(
                text="Lassen Sie uns beim Thema bleiben.",
                context="die Diskussion beim Thema halten (formell)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Einen Punkt möchte ich noch ansprechen.",
                context="einen weiteren Punkt aufwerfen",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Das ist doch nicht Ihr Ernst!",
                context="Unglauben ausdrücken (das kann doch nicht Ihr Ernst sein!)",
                register="informal",
            ),
            PhrasebookEntry(
                text="Sie sehen das zu schwarz-weiß.",
                context="jemandem vorwerfen, zu schwarz-weiß zu denken",
                register="informal",
            ),
            PhrasebookEntry(
                text="Sie drehen mir die Worte im Mund um.",
                context="jemandem vorwerfen, einem die Worte zu verdrehen",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Das ist ein starkes Argument.",
                context="ein starkes Argument anerkennen",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Wir sollten sachlich bleiben.",
                context="in einer hitzigen Debatte um Sachlichkeit bitten",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich verstehe Ihren Punkt, aber...",
                context="anerkennen und dann entgegnen (formell)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Das ist doch Haarspalterei!",
                context="Wortklauberei abweisen (das ist doch Haarspalterei!)",
                register="informal",
            ),
            PhrasebookEntry(
                text="Davon war doch gar nicht die Rede.",
                context="auf einen Themenwechsel hinweisen (davon war gar nicht die Rede)",
                register="informal",
            ),
        ],
    ),
]
