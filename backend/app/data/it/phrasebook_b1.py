"""Italian phrasebook — B1 categories."""

from app.data._types import PhrasebookCategory, PhrasebookEntry

B1_CATEGORIES: list[PhrasebookCategory] = [
    PhrasebookCategory(
        id="phone_calls_b1",
        level="B1",
        situation="Telefonate",
        icon="\U0001f4de",
        phrases=[
            PhrasebookEntry(text="Pronto?", context="Rispondere al telefono", register="neutral"),
            PhrasebookEntry(
                text="Parlo con il signor Rossi?",
                context="Chiedere di parlare con qualcuno (formale)",
                register="formal",
            ),
            PhrasebookEntry(
                text="C'\u00e8 Maria?",
                context="Chiedere di qualcuno (informale)",
                register="informal",
            ),
            PhrasebookEntry(
                text="Un attimo, te la passo.",
                context="Passare la chiamata (informale)",
                register="informal",
            ),
            PhrasebookEntry(
                text="Pu\u00f2 richiamare pi\u00f9 tardi?",
                context="Chiedere di richiamare",
                register="formal",
            ),
            PhrasebookEntry(
                text="Non prende bene.", context="Segnalare problemi di linea", register="informal"
            ),
            PhrasebookEntry(
                text="Mi sente?", context="Verificare che l'interlocutore senta", register="neutral"
            ),
            PhrasebookEntry(
                text="Ha sbagliato numero.",
                context="Informare di un numero sbagliato",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Posso lasciare un messaggio?",
                context="Offrire di lasciare un messaggio",
                register="neutral",
            ),
            PhrasebookEntry(
                text="La richiamo appena posso.",
                context="Promettere di richiamare",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Pronto, chi parla?", context="Chiedere chi sta chiamando", register="neutral"
            ),
        ],
    ),
    PhrasebookCategory(
        id="job_interview_b1",
        level="B1",
        situation="Colloqui di lavoro",
        icon="\U0001f4bc",
        phrases=[
            PhrasebookEntry(
                text="Buongiorno, ho un colloquio alle dieci.",
                context="Presentarsi alla reception",
                register="formal",
            ),
            PhrasebookEntry(
                text="Ho studiato economia all'universit\u00e0.",
                context="Parlare del proprio percorso di studi",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ho esperienza nel settore.",
                context="Parlare dell'esperienza lavorativa",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Parlo tre lingue: italiano, inglese e spagnolo.",
                context="Elencare le competenze linguistiche",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Sono una persona precisa e affidabile.",
                context="Descrivere le proprie qualit\u00e0",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Mi piace lavorare in gruppo.",
                context="Parlare del lavoro di squadra",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Quali sono gli orari di lavoro?",
                context="Chiedere informazioni sull'orario",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Che tipo di contratto offrite?",
                context="Chiedere del contratto",
                register="formal",
            ),
            PhrasebookEntry(
                text="Quando sapr\u00f2 l'esito del colloquio?",
                context="Chiedere tempi di risposta",
                register="formal",
            ),
            PhrasebookEntry(
                text="Grazie per l'opportunit\u00e0.",
                context="Ringraziare a fine colloquio",
                register="formal",
            ),
            PhrasebookEntry(
                text="Com'\u00e8 l'ambiente di lavoro qui?",
                context="Chiedere informazioni sulla cultura aziendale",
                register="neutral",
            ),
        ],
    ),
    PhrasebookCategory(
        id="giving_opinions_b1",
        level="B1",
        situation="Dare opinioni",
        icon="\U0001f4ac",
        phrases=[
            PhrasebookEntry(
                text="Secondo me \u00e8 una buona idea.",
                context="Esprimere la propria opinione",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Non sono d'accordo.", context="Esprimere disaccordo", register="neutral"
            ),
            PhrasebookEntry(
                text="Hai ragione.", context="Dare ragione a qualcuno", register="neutral"
            ),
            PhrasebookEntry(
                text="Forse hai torto.", context="Esprimere disaccordo gentile", register="neutral"
            ),
            PhrasebookEntry(
                text="Non ne sono sicuro/a.", context="Esprimere incertezza", register="neutral"
            ),
            PhrasebookEntry(
                text="Dipende.", context="Evitare una risposta categorica", register="neutral"
            ),
            PhrasebookEntry(
                text="Dal mio punto di vista...",
                context="Introdurre la propria prospettiva",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Che ne pensi?",
                context="Chiedere un'opinione (informale)",
                register="informal",
            ),
            PhrasebookEntry(
                text="Cosa ne pensa?", context="Chiedere un'opinione (formale)", register="formal"
            ),
            PhrasebookEntry(
                text="Sono assolutamente contrario/a.",
                context="Esprimere forte disaccordo",
                register="formal",
            ),
            PhrasebookEntry(
                text="In effetti, hai proprio ragione.",
                context="Ammettere che l'altro ha ragione",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Permettimi di dissentire.",
                context="Introdurre educatamente un disaccordo",
                register="formal",
            ),
        ],
    ),
    PhrasebookCategory(
        id="health_appointments_b1",
        level="B1",
        situation="Salute e visite mediche",
        icon="\U0001f3e5",
        phrases=[
            PhrasebookEntry(
                text="Vorrei prendere un appuntamento.",
                context="Prenotare una visita",
                register="formal",
            ),
            PhrasebookEntry(
                text="Ho mal di testa da due giorni.",
                context="Descrivere un sintomo",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Mi fa male qui.", context="Indicare dove si sente dolore", register="neutral"
            ),
            PhrasebookEntry(
                text="Ho la febbre.", context="Dire di avere la febbre", register="neutral"
            ),
            PhrasebookEntry(
                text="Sono allergico/a alla penicillina.",
                context="Dichiarare un'allergia",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Devo fare una ricetta?",
                context="Chiedere della prescrizione",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Prenda questa medicina due volte al giorno.",
                context="Ricevere istruzioni sul farmaco",
                register="formal",
            ),
            PhrasebookEntry(
                text="Quando posso venire?",
                context="Chiedere disponibilit\u00e0",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ho bisogno di un certificato medico.",
                context="Richiedere un certificato",
                register="formal",
            ),
            PhrasebookEntry(
                text="\u00c8 urgente.", context="Segnalare urgenza", register="neutral"
            ),
        ],
    ),
]
