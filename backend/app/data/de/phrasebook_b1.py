"""German phrasebook — B1 categories."""

from app.data._types import PhrasebookCategory, PhrasebookEntry

B1_CATEGORIES: list[PhrasebookCategory] = [
    PhrasebookCategory(
        id="meinungen_de_b1",
        level="B1",
        situation="Expressing Opinions",
        icon="\U0001f4ad",
        phrases=[
            PhrasebookEntry(
                text="Meiner Meinung nach...",
                context="Introducing a personal opinion",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich finde, dass...",
                context="Expressing what you think / find",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich glaube, dass...",
                context="Expressing a belief",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich bin der Ansicht, dass...",
                context="Stating a formal opinion (I am of the view that)",
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
                context="Asking someone's opinion (formal)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Es kommt darauf an.",
                context="Saying 'it depends'",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Auf der einen Seite..., auf der anderen Seite...",
                context="Weighing two sides (on the one hand... on the other...)",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Das überzeugt mich nicht.",
                context="Saying something doesn't convince you",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Für mich steht fest, dass...",
                context="Stating a firm belief",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich würde sagen, dass...",
                context="Softening an opinion (I would say that)",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich bin hin- und hergerissen.",
                context="Expressing indecision (I'm torn)",
                register="informal",
            ),
        ],
    ),
    PhrasebookCategory(
        id="beschwerden_de_b1",
        level="B1",
        situation="Complaints & Voicing Displeasure",
        icon="\U0001f624",
        phrases=[
            PhrasebookEntry(
                text="Ich möchte mich beschweren.",
                context="Opening a formal complaint",
                register="formal",
            ),
            PhrasebookEntry(
                text="Das ist nicht in Ordnung.",
                context="Stating something is unacceptable",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich bin sehr unzufrieden mit...",
                context="Expressing dissatisfaction with something",
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
                context="Asking for an explanation of an issue (formal)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Das lässt zu wünschen übrig.",
                context="Saying something leaves a lot to be desired",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich verlange eine Entschädigung.",
                context="Demanding compensation",
                register="formal",
            ),
            PhrasebookEntry(
                text="So kann das nicht weitergehen.",
                context="Insisting that things must change",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich möchte mit dem Geschäftsführer sprechen.",
                context="Asking to speak to the manager",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Das ist eine Frechheit!",
                context="Expressing outrage (that's outrageous)",
                register="informal",
            ),
            PhrasebookEntry(
                text="Hier stimmt etwas nicht.",
                context="Pointing out something is wrong",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich fühle mich ungerecht behandelt.",
                context="Saying you feel treated unfairly",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Darauf werde ich nicht sitzen bleiben.",
                context="Vowing not to let something slide",
                register="informal",
            ),
            PhrasebookEntry(
                text="Hier muss sich etwas ändern.",
                context="Stating that change is necessary",
                register="neutral",
            ),
        ],
    ),
    PhrasebookCategory(
        id="beruf_de_b1",
        level="B1",
        situation="Professional Life & Work",
        icon="\U0001f4bc",
        phrases=[
            PhrasebookEntry(
                text="Ich arbeite in der ...-Branche.",
                context="Saying which industry you work in",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich bin für ... zuständig.",
                context="Saying what you are responsible for",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Wir haben ein Meeting um...",
                context="Saying there is a meeting at a specific time",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Könnten Sie mir das bitte per E-Mail schicken?",
                context="Asking someone to send something by email (formal)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Ich muss noch den Bericht fertigstellen.",
                context="Saying you still need to finish a report",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Wie läuft das Projekt?",
                context="Asking how the project is going",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Wir sind im Zeitplan.",
                context="Saying you are on schedule",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich brauche mehr Zeit dafür.",
                context="Asking for more time on a task",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Das gehört nicht zu meinen Aufgaben.",
                context="Saying something is not part of your job",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Wann ist die Frist?",
                context="Asking when the deadline is",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich möchte gerne ein paar Tage Urlaub nehmen.",
                context="Saying you'd like to take a few days off",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Können Sie mich vertreten?",
                context="Asking a colleague to stand in for you (formal)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Ich habe nächste Woche eine Fortbildung.",
                context="Saying you have a training course next week",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Wie sieht es mit einer Gehaltserhöhung aus?",
                context="Broaching the topic of a pay rise",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Wir sollten das im Team besprechen.",
                context="Suggesting discussing something as a team",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich bin mit meiner Arbeit zufrieden.",
                context="Saying you are satisfied with your work",
                register="neutral",
            ),
        ],
    ),
    PhrasebookCategory(
        id="sozial_de_b1",
        level="B1",
        situation="Social Life & Making Plans",
        icon="\U0001f389",
        phrases=[
            PhrasebookEntry(
                text="Hast du Lust, am Wochenende etwas zu unternehmen?",
                context="Asking a friend if they fancy doing something at the weekend",
                register="informal",
            ),
            PhrasebookEntry(
                text="Wollen wir uns auf einen Kaffee treffen?",
                context="Inviting someone to meet for a coffee",
                register="informal",
            ),
            PhrasebookEntry(
                text="Ich lade dich ein.",
                context="Offering to pay / it's my treat",
                register="informal",
            ),
            PhrasebookEntry(
                text="Es war schön, dich wiederzusehen!",
                context="Saying it was nice to see someone again",
                register="informal",
            ),
            PhrasebookEntry(
                text="Das müssen wir unbedingt wiederholen.",
                context="Suggesting doing something again soon",
                register="informal",
            ),
            PhrasebookEntry(
                text="Wie war dein Wochenende?",
                context="Asking a friend about their weekend",
                register="informal",
            ),
            PhrasebookEntry(
                text="Ich kenne einen tollen Ort.",
                context="Recommending a nice place to go",
                register="informal",
            ),
            PhrasebookEntry(
                text="Kommst du zu meiner Party?",
                context="Inviting a friend to your party",
                register="informal",
            ),
            PhrasebookEntry(
                text="Das ist aber eine schöne Überraschung!",
                context="Reacting to a nice surprise",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Wie läuft's bei dir?",
                context="Casually asking a friend how things are going",
                register="informal",
            ),
            PhrasebookEntry(
                text="Ich wünsche dir alles Gute!",
                context="Wishing someone all the best",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Herzlichen Glückwunsch!",
                context="Offering congratulations",
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
                context="Suggesting a rain check",
                register="neutral",
            ),
        ],
    ),
    PhrasebookCategory(
        id="debatten_de_b1",
        level="B1",
        situation="Debates & Discussions",
        icon="\U0001f5e3\ufe0f",
        phrases=[
            PhrasebookEntry(
                text="Lassen Sie mich ausreden.",
                context="Asking to be allowed to finish speaking (formal)",
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
                context="Interrupting politely",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Das Argument zieht nicht.",
                context="Saying an argument doesn't hold water",
                register="informal",
            ),
            PhrasebookEntry(
                text="Lassen Sie uns beim Thema bleiben.",
                context="Keeping the discussion on track (formal)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Einen Punkt möchte ich noch ansprechen.",
                context="Raising an additional point",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Das ist doch nicht Ihr Ernst!",
                context="Expressing disbelief (you can't be serious!)",
                register="informal",
            ),
            PhrasebookEntry(
                text="Sie sehen das zu schwarz-weiß.",
                context="Accusing someone of seeing things too black and white",
                register="informal",
            ),
            PhrasebookEntry(
                text="Sie drehen mir die Worte im Mund um.",
                context="Accusing someone of twisting your words",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Das ist ein starkes Argument.",
                context="Acknowledging a strong argument",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Wir sollten sachlich bleiben.",
                context="Calling for objectivity in a heated debate",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ich verstehe Ihren Punkt, aber...",
                context="Acknowledging then countering (formal)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Das ist doch Haarspalterei!",
                context="Dismissing nitpicking (that's splitting hairs)",
                register="informal",
            ),
            PhrasebookEntry(
                text="Davon war doch gar nicht die Rede.",
                context="Pointing out a topic shift (that's not what we were talking about)",
                register="informal",
            ),
        ],
    ),
]
