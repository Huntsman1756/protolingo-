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
                context="Einleiten a personal opinion",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich finde, dass...",
                context="Ausdrücken what you think / find",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich glaube, dass...",
                context="Ausdrücken a belief",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich bin der Ansicht, dass...",
                context="Feststellen a formal opinion (I am of the view that)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Meiner Erfahrung nach...",
                context="Speaking from personal experience",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Das sehe ich anders.",
                context="Disagreeing plainly (I see it differently)",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Da bin ich ganz Ihrer Meinung.",
                context="Agreeing strongly (formal: I am entirely of your opinion)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Ich stimme Ihnen zu.",
                context="Agreeing formally (I agree with you — Sie form)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Da muss ich widersprechen.",
                context="Disagreeing (I have to disagree there)",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Was halten Sie davon?",
                context="Fragen someone's opinion (formal)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Es kommt darauf an.",
                context="Sagen 'it depends'",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Auf der einen Seite..., auf der anderen Seite...",
                context="Weighing two sides (on the one hand... on the other...)",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Das überzeugt mich nicht.",
                context="Sagen something doesn't convince you",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Für mich steht fest, dass...",
                context="Feststellen a firm belief",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich würde sagen, dass...",
                context="Softening an opinion (I would say that)",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich bin hin- und hergerissen.",
                context="Ausdrücken indecision (I'm torn)",
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
                context="Eröffnen a formal complaint",
                register="formal",
            ),
            PhrasebookEntry(
                text="Das ist nicht in Ordnung.",
                context="Feststellen something is unacceptable",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich bin sehr unzufrieden mit...",
                context="Ausdrücken dissatisfaction with something",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Das ist nicht das, was ich bestellt habe.",
                context="Complaining that you got the wrong item",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich warte schon seit einer halben Stunde.",
                context="Complaining about a long wait",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Können Sie mir bitte erklären, warum...?",
                context="Fragen for an explanation of an issue (formal)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Das lässt zu wünschen übrig.",
                context="Sagen something leaves a lot to be desired",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich verlange eine Entschädigung.",
                context="Fordern compensation",
                register="formal",
            ),
            PhrasebookEntry(
                text="So kann das nicht weitergehen.",
                context="Bestehen that things must change",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich möchte mit dem Geschäftsführer sprechen.",
                context="Fragen to speak to the manager",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Das ist eine Frechheit!",
                context="Ausdrücken outrage (that's outrageous)",
                register="informal",
            ),
            PhrasebookEntry(
                text="Hier stimmt etwas nicht.",
                context="Hinweisen out something is wrong",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich fühle mich ungerecht behandelt.",
                context="Sagen you feel treated unfairly",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Darauf werde ich nicht sitzen bleiben.",
                context="Geloben not to let something slide",
                register="informal",
            ),
            PhrasebookEntry(
                text="Hier muss sich etwas ändern.",
                context="Feststellen that change is necessary",
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
                context="Sagen which industry you work in",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich bin für ... zuständig.",
                context="Sagen what you are responsible for",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Wir haben ein Meeting um...",
                context="Sagen there is a meeting at a specific time",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Könnten Sie mir das bitte per E-Mail schicken?",
                context="Fragen someone to send something by email (formal)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Ich muss noch den Bericht fertigstellen.",
                context="Sagen you still need to finish a report",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Wie läuft das Projekt?",
                context="Fragen how the project is going",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Wir sind im Zeitplan.",
                context="Sagen you are on schedule",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich brauche mehr Zeit dafür.",
                context="Fragen for more time on a task",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Das gehört nicht zu meinen Aufgaben.",
                context="Sagen something is not part of your job",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Wann ist die Frist?",
                context="Fragen when the deadline is",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich möchte gerne ein paar Tage Urlaub nehmen.",
                context="Sagen you'd like to take a few days off",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Können Sie mich vertreten?",
                context="Fragen a colleague to stand in for you (formal)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Ich habe nächste Woche eine Fortbildung.",
                context="Sagen you have a training course next week",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Wie sieht es mit einer Gehaltserhöhung aus?",
                context="Ansprechen the topic of a pay rise",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Wir sollten das im Team besprechen.",
                context="Vorschlagen discussing something as a team",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich bin mit meiner Arbeit zufrieden.",
                context="Sagen you are satisfied with your work",
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
                context="Fragen a friend if they fancy doing something at the weekend",
                register="informal",
            ),
            PhrasebookEntry(
                text="Wollen wir uns auf einen Kaffee treffen?",
                context="Einladen someone to meet for a coffee",
                register="informal",
            ),
            PhrasebookEntry(
                text="Ich lade dich ein.",
                context="Anbieten to pay / it's my treat",
                register="informal",
            ),
            PhrasebookEntry(
                text="Es war schön, dich wiederzusehen!",
                context="Sagen it was nice to see someone again",
                register="informal",
            ),
            PhrasebookEntry(
                text="Das müssen wir unbedingt wiederholen.",
                context="Vorschlagen doing something again soon",
                register="informal",
            ),
            PhrasebookEntry(
                text="Wie war dein Wochenende?",
                context="Fragen a friend about their weekend",
                register="informal",
            ),
            PhrasebookEntry(
                text="Ich kenne einen tollen Ort.",
                context="Empfehlen a nice place to go",
                register="informal",
            ),
            PhrasebookEntry(
                text="Kommst du zu meiner Party?",
                context="Einladen a friend to your party",
                register="informal",
            ),
            PhrasebookEntry(
                text="Das ist aber eine schöne Überraschung!",
                context="Reagieren to a nice surprise",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Wie läuft's bei dir?",
                context="Casually asking a friend how things are going",
                register="informal",
            ),
            PhrasebookEntry(
                text="Ich wünsche dir alles Gute!",
                context="Wünschen someone all the best",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Herzlichen Glückwunsch!",
                context="Anbieten congratulations",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Wir haben uns so viel zu erzählen!",
                context="Excitedly saying you have lots to talk about",
                register="informal",
            ),
            PhrasebookEntry(
                text="Tut mir leid, ich kann leider nicht.",
                context="Politely declining an invitation",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Vielleicht ein anderes Mal.",
                context="Vorschlagen a rain check",
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
                context="Fragen to be allowed to finish speaking (formal)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Verstehe ich Sie richtig, dass...?",
                context="Checking understanding in a debate (formal)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Es geht nicht um die Person, sondern um die Sache.",
                context="Keeping the debate objective, not personal",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich will nicht unterbrechen, aber...",
                context="Interrupting höflichly",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Das Argument zieht nicht.",
                context="Sagen an argument doesn't hold water",
                register="informal",
            ),
            PhrasebookEntry(
                text="Lassen Sie uns beim Thema bleiben.",
                context="Keeping the discussion on track (formal)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Einen Punkt möchte ich noch ansprechen.",
                context="Aufwerfen an additional point",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Das ist doch nicht Ihr Ernst!",
                context="Ausdrücken disbelief (you can't be serious!)",
                register="informal",
            ),
            PhrasebookEntry(
                text="Sie sehen das zu schwarz-weiß.",
                context="Beschuldigen someone of seeing things too black and white",
                register="informal",
            ),
            PhrasebookEntry(
                text="Sie drehen mir die Worte im Mund um.",
                context="Beschuldigen someone of twisting your words",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Das ist ein starkes Argument.",
                context="Anerkennen a strong argument",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Wir sollten sachlich bleiben.",
                context="Bezeichnen for objectivity in a heated debate",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich verstehe Ihren Punkt, aber...",
                context="Anerkennen then countering (formal)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Das ist doch Haarspalterei!",
                context="Abweisen nitpicking (that's splitting hairs)",
                register="informal",
            ),
            PhrasebookEntry(
                text="Davon war doch gar nicht die Rede.",
                context="Hinweisen out a topic shift (that's not what we were talking about)",
                register="informal",
            ),
        ],
    ),
]
