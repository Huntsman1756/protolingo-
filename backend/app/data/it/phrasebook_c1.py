"""Italian phrasebook — C1 categories."""

from app.data._types import PhrasebookCategory, PhrasebookEntry

C1_CATEGORIES: list[PhrasebookCategory] = [
    PhrasebookCategory(
        id="presentations_c1",
        level="C1",
        situation="Presentazioni e public speaking",
        icon="\U0001f3a4",
        phrases=[
            PhrasebookEntry(
                text="Signore e signori, buongiorno.",
                context="Apertura formale di una presentazione",
                register="formal",
            ),
            PhrasebookEntry(
                text="Oggi vorrei parlarvi di un tema che mi sta molto a cuore.",
                context="Introdurre il tema con coinvolgimento emotivo",
                register="formal",
            ),
            PhrasebookEntry(
                text="La mia presentazione si articola in tre parti.",
                context="Illustrare la struttura",
                register="formal",
            ),
            PhrasebookEntry(
                text="Come potete vedere da questa diapositiva...",
                context="Commentare una slide",
                register="formal",
            ),
            PhrasebookEntry(
                text="Per approfondire questo aspetto...",
                context="Approfondire un punto",
                register="formal",
            ),
            PhrasebookEntry(
                text="Vorrei richiamare la vostra attenzione su questo grafico.",
                context="Attirare l'attenzione su un dato visivo",
                register="formal",
            ),
            PhrasebookEntry(
                text="Consentitemi di aprire una breve parentesi.",
                context="Fare una digressione",
                register="formal",
            ),
            PhrasebookEntry(
                text="In conclusione, ritengo fondamentale sottolineare che...",
                context="Concludere con enfasi",
                register="formal",
            ),
            PhrasebookEntry(
                text="Vi ringrazio per l'attenzione.",
                context="Ringraziare alla fine",
                register="formal",
            ),
            PhrasebookEntry(
                text="Se ci sono domande, sono a vostra disposizione.",
                context="Aprire alle domande",
                register="formal",
            ),
            PhrasebookEntry(
                text="Per riassumere quanto detto finora...",
                context="Riassumere a met\u00e0 presentazione",
                register="formal",
            ),
            PhrasebookEntry(
                text="Vorrei concludere con una citazione di...",
                context="Chiudere con una citazione",
                register="formal",
            ),
            PhrasebookEntry(
                text="Passo ora alla seconda parte.",
                context="Transizione tra sezioni",
                register="formal",
            ),
        ],
    ),
    PhrasebookCategory(
        id="complex_arguments_c1",
        level="C1",
        situation="Argomentazioni complesse",
        icon="\U0001f9e0",
        phrases=[
            PhrasebookEntry(
                text="Pur riconoscendo la validit\u00e0 delle sue osservazioni, dissentirei.",
                context="Concessione seguita da obiezione",
                register="formal",
            ),
            PhrasebookEntry(
                text="\u00c8 innegabile che i dati mostrino una tendenza preoccupante.",
                context="Affermare un fatto indiscutibile",
                register="formal",
            ),
            PhrasebookEntry(
                text="Tuttavia, va considerato anche il contesto in cui questi eventi si sono verificati.",
                context="Introdurre una controargomentazione",
                register="formal",
            ),
            PhrasebookEntry(
                text="A mio avviso, il punto cruciale della questione risiede nel fatto che...",
                context="Identificare il punto centrale",
                register="formal",
            ),
            PhrasebookEntry(
                text="Non si pu\u00f2 prescindere dalle implicazioni etiche di questa scelta.",
                context="Sollevare questioni etiche",
                register="formal",
            ),
            PhrasebookEntry(
                text="Bench\u00e9 la proposta sia allettante, comporta dei rischi non trascurabili.",
                context="Usare concessiva con congiuntivo",
                register="formal",
            ),
            PhrasebookEntry(
                text="Si potrebbe obiettare che i costi siano eccessivi.",
                context="Presentare una possibile obiezione",
                register="formal",
            ),
            PhrasebookEntry(
                text="Sarebbe riduttivo limitarsi a una sola interpretazione del fenomeno.",
                context="Criticare una visione limitata",
                register="formal",
            ),
            PhrasebookEntry(
                text="La questione merita di essere esaminata da una prospettiva pi\u00f9 ampia.",
                context="Chiedere una visione pi\u00f9 ampia",
                register="formal",
            ),
            PhrasebookEntry(
                text="\u00c8 una tesi affascinante, ma a mio parere non regge a un'analisi approfondita.",
                context="Confutare con eleganza",
                register="formal",
            ),
            PhrasebookEntry(
                text="Se \u00e8 vero che X, non ne consegue necessariamente Y.",
                context="Smontare una fallacia logica",
                register="formal",
            ),
            PhrasebookEntry(
                text="Ritengo si tratti di una semplificazione eccessiva.",
                context="Criticare una semplificazione",
                register="formal",
            ),
        ],
    ),
    PhrasebookCategory(
        id="professional_networking_c1",
        level="C1",
        situation="Networking professionale",
        icon="\U0001f91d",
        phrases=[
            PhrasebookEntry(
                text="Piacere di conoscerLa. Ho seguito con interesse il Suo lavoro.",
                context="Presentarsi con un complimento professionale",
                register="formal",
            ),
            PhrasebookEntry(
                text="Sarei lieto/a di approfondire una possibile collaborazione.",
                context="Proporre una collaborazione",
                register="formal",
            ),
            PhrasebookEntry(
                text="Opero nel settore da oltre dieci anni.",
                context="Descrivere l'esperienza professionale",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Mi occupo prevalentemente di sviluppo internazionale.",
                context="Descrivere il proprio ruolo",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Posso lasciarLe il mio biglietto da visita?",
                context="Offrire il biglietto da visita",
                register="formal",
            ),
            PhrasebookEntry(
                text="Sarebbe un piacere rimanere in contatto.",
                context="Esprimere desiderio di restare in contatto",
                register="formal",
            ),
            PhrasebookEntry(
                text="La nostra azienda \u00e8 interessata a esplorare nuove partnership.",
                context="Accennare a opportunit\u00e0 di business",
                register="formal",
            ),
            PhrasebookEntry(
                text="Ho apprezzato molto il Suo intervento al convegno.",
                context="Fare un complimento specifico",
                register="formal",
            ),
            PhrasebookEntry(
                text="Potremmo fissare un incontro per discuterne pi\u00f9 a fondo.",
                context="Proporre un incontro futuro",
                register="formal",
            ),
            PhrasebookEntry(
                text="Se posso permettermi, Le suggerirei di contattare il nostro ufficio.",
                context="Dare un suggerimento professionale",
                register="formal",
            ),
        ],
    ),
    PhrasebookCategory(
        id="conflict_resolution_c1",
        level="C1",
        situation="Risoluzione dei conflitti",
        icon="\U0001f54a\ufe0f",
        phrases=[
            PhrasebookEntry(
                text="Capisco il Suo punto di vista, ma vorrei chiarire meglio la nostra posizione.",
                context="Mostrare comprensione prima di dissentire",
                register="formal",
            ),
            PhrasebookEntry(
                text="\u00c8 possibile che ci sia stato un malinteso.",
                context="Ipotizzare un equivoco",
                register="neutral",
            ),
            PhrasebookEntry(
                text="L'obiettivo comune dovrebbe essere trovare una soluzione che soddisfi entrambi.",
                context="Ricordare l'obiettivo comune",
                register="formal",
            ),
            PhrasebookEntry(
                text="Sono disposto/a a riconsiderare la mia posizione se...",
                context="Mostrare flessibilit\u00e0 condizionata",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ritengo che la trasparenza sia fondamentale per risolvere la questione.",
                context="Invocare trasparenza",
                register="formal",
            ),
            PhrasebookEntry(
                text="Non era mia intenzione mancare di rispetto.",
                context="Scusarsi per un'offesa involontaria",
                register="formal",
            ),
            PhrasebookEntry(
                text="Propongo di fare un passo indietro e ripartire dai punti su cui concordiamo.",
                context="Proporre un reset della discussione",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Sono certo/a che riusciremo a trovare un'intesa.",
                context="Esprimere ottimismo costruttivo",
                register="formal",
            ),
            PhrasebookEntry(
                text="Le chiedo scusa se le mie parole sono state fraintese.",
                context="Scusarsi per un fraintendimento",
                register="formal",
            ),
            PhrasebookEntry(
                text="Coinvolgiamo un mediatore se riteniamo di non riuscire a risolvere da soli.",
                context="Proporre mediazione esterna",
                register="formal",
            ),
        ],
    ),
]
