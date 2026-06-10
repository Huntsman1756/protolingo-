"""Italian phrasebook — B2 categories."""

from app.data._types import PhrasebookCategory, PhrasebookEntry

B2_CATEGORIES: list[PhrasebookCategory] = [
    PhrasebookCategory(
        id="formal_emails_b2",
        level="B2",
        situation="Email formali e corrispondenza",
        icon="\U0001f4e7",
        phrases=[
            PhrasebookEntry(
                text="Gentile Dottor Rossi,",
                context="Apertura email formale (uomo)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Gentile Professoressa Bianchi,",
                context="Apertura email formale (donna)",
                register="formal",
            ),
            PhrasebookEntry(
                text="In allegato Le invio il documento richiesto.",
                context="Inviare un allegato",
                register="formal",
            ),
            PhrasebookEntry(
                text="La ringrazio per la Sua disponibilit\u00e0.",
                context="Ringraziare per la disponibilit\u00e0",
                register="formal",
            ),
            PhrasebookEntry(
                text="Resto in attesa di un Suo gentile riscontro.",
                context="Chiedere una risposta educatamente",
                register="formal",
            ),
            PhrasebookEntry(
                text="Con riferimento alla Sua email del...",
                context="Fare riferimento a una comunicazione precedente",
                register="formal",
            ),
            PhrasebookEntry(
                text="Le scrivo per richiedere informazioni riguardo a...",
                context="Introdurre lo scopo dell'email",
                register="formal",
            ),
            PhrasebookEntry(
                text="Cordiali saluti,", context="Chiusura formale standard", register="formal"
            ),
            PhrasebookEntry(
                text="Distinti saluti,", context="Chiusura molto formale", register="formal"
            ),
            PhrasebookEntry(
                text="La prego di scusarmi per il ritardo nella risposta.",
                context="Scusarsi per il ritardo",
                register="formal",
            ),
            PhrasebookEntry(
                text="Mi permetto di sollecitare un riscontro.",
                context="Sollecitare una risposta",
                register="formal",
            ),
        ],
    ),
    PhrasebookCategory(
        id="negotiations_b2",
        level="B2",
        situation="Discussioni e negoziazioni",
        icon="\U0001f91d",
        phrases=[
            PhrasebookEntry(
                text="Propongo un compromesso.",
                context="Proporre un compromesso",
                register="formal",
            ),
            PhrasebookEntry(
                text="Cerchiamo di trovare un accordo.",
                context="Invitare a negoziare",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Qual \u00e8 la vostra proposta?",
                context="Chiedere una proposta",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Mi sembra un'offerta ragionevole.",
                context="Valutare positivamente",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Purtroppo non possiamo accettare queste condizioni.",
                context="Rifiutare educatamente",
                register="formal",
            ),
            PhrasebookEntry(
                text="Potremmo rivedere i termini del contratto?",
                context="Chiedere di rinegoziare",
                register="formal",
            ),
            PhrasebookEntry(
                text="Siamo disposti a trattare sul prezzo.",
                context="Mostrare flessibilit\u00e0 sul prezzo",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Vorrei avere il tempo di valutare.",
                context="Prendere tempo per decidere",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Possiamo trovare una soluzione vantaggiosa per entrambi.",
                context="Proporre soluzione win-win",
                register="formal",
            ),
            PhrasebookEntry(
                text="Mettiamolo per iscritto.",
                context="Richiedere conferma scritta",
                register="neutral",
            ),
        ],
    ),
    PhrasebookCategory(
        id="academic_discussion_b2",
        level="B2",
        situation="Discussioni accademiche",
        icon="\U0001f393",
        phrases=[
            PhrasebookEntry(
                text="Secondo la mia ricerca...",
                context="Introdurre i propri risultati",
                register="formal",
            ),
            PhrasebookEntry(
                text="Questo dato supporta l'ipotesi iniziale.",
                context="Collegare dati e ipotesi",
                register="formal",
            ),
            PhrasebookEntry(
                text="Al contrario, gli studi di Rossi suggeriscono che...",
                context="Contrapporre ricerche diverse",
                register="formal",
            ),
            PhrasebookEntry(
                text="\u00c8 importante sottolineare che...",
                context="Enfatizzare un punto",
                register="formal",
            ),
            PhrasebookEntry(
                text="La metodologia utilizzata presenta alcuni limiti.",
                context="Riconoscere limiti della ricerca",
                register="formal",
            ),
            PhrasebookEntry(
                text="Questa conclusione \u00e8 supportata da evidenze empiriche.",
                context="Rafforzare un'affermazione",
                register="formal",
            ),
            PhrasebookEntry(
                text="Potrebbe chiarire meglio questo punto?",
                context="Chiedere chiarimenti accademici",
                register="formal",
            ),
            PhrasebookEntry(
                text="L'argomento \u00e8 stato ampiamente dibattuto in letteratura.",
                context="Riferirsi a letteratura esistente",
                register="formal",
            ),
            PhrasebookEntry(
                text="Ritengo che questa interpretazione sia discutibile.",
                context="Esprimere disaccordo accademico",
                register="formal",
            ),
            PhrasebookEntry(
                text="In sintesi, i risultati indicano che...",
                context="Riassumere conclusioni",
                register="formal",
            ),
            PhrasebookEntry(
                text="Quali sono le implicazioni di questo studio?",
                context="Discutere le conseguenze di una ricerca",
                register="formal",
            ),
        ],
    ),
    PhrasebookCategory(
        id="customer_service_b2",
        level="B2",
        situation="Reclami e assistenza clienti",
        icon="🛠️",
        phrases=[
            PhrasebookEntry(
                text="Desidero presentare un reclamo formale riguardo al servizio ricevuto.",
                context="Aprire un reclamo in modo formale",
                register="formal",
            ),
            PhrasebookEntry(
                text="Il prodotto è arrivato danneggiato e non conforme alla descrizione.",
                context="Segnalare un problema di conformità",
                register="formal",
            ),
            PhrasebookEntry(
                text="Potrei parlare con un responsabile, per favore?",
                context="Chiedere escalation del caso",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Gradirei un rimborso completo entro i termini previsti.",
                context="Richiedere rimborso",
                register="formal",
            ),
            PhrasebookEntry(
                text="In alternativa, accetterei una sostituzione immediata.",
                context="Proporre soluzione alternativa",
                register="formal",
            ),
            PhrasebookEntry(
                text="Le allego la ricevuta e la documentazione fotografica.",
                context="Inviare prove documentali",
                register="formal",
            ),
            PhrasebookEntry(
                text="Resto in attesa di un riscontro entro cinque giorni lavorativi.",
                context="Fissare una scadenza ragionevole",
                register="formal",
            ),
            PhrasebookEntry(
                text="Vorrei capire come intendete procedere per risolvere la situazione.",
                context="Chiedere un piano di risoluzione",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Apprezzo la disponibilità, ma ho bisogno di una conferma scritta.",
                context="Richiedere tracciabilità",
                register="formal",
            ),
            PhrasebookEntry(
                text="Grazie per l'assistenza: il problema risulta finalmente risolto.",
                context="Chiudere positivamente il reclamo",
                register="neutral",
            ),
        ],
    ),
    PhrasebookCategory(
        id="work_meetings_b2",
        level="B2",
        situation="Riunioni di lavoro e coordinamento",
        icon="📊",
        phrases=[
            PhrasebookEntry(
                text="Prima di iniziare, allineiamoci sugli obiettivi della riunione.",
                context="Aprire la riunione con focus",
                register="formal",
            ),
            PhrasebookEntry(
                text="Propongo di dare priorità ai punti più urgenti dell'ordine del giorno.",
                context="Gestire priorità",
                register="formal",
            ),
            PhrasebookEntry(
                text="Mi sembra che ci sia un rischio operativo da mitigare subito.",
                context="Segnalare rischio",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Condivido in parte, ma suggerirei un approccio più graduale.",
                context="Dissentire con tatto",
                register="formal",
            ),
            PhrasebookEntry(
                text="Possiamo definire responsabilità e scadenze prima di chiudere?",
                context="Chiarire ownership",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Mi incarico io della bozza e ve la inoltro entro domani.",
                context="Assumersi un task",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Per evitare ambiguità, riepilogo brevemente le decisioni prese.",
                context="Fare recap finale",
                register="formal",
            ),
            PhrasebookEntry(
                text="Se siete d'accordo, fissiamo già il prossimo punto di controllo.",
                context="Pianificare follow-up",
                register="neutral",
            ),
            PhrasebookEntry(
                text="È un'osservazione pertinente: la includiamo nel piano d'azione.",
                context="Validare contributo altrui",
                register="formal",
            ),
            PhrasebookEntry(
                text="Chiuderei qui: grazie a tutti per il contributo.",
                context="Chiudere la riunione",
                register="formal",
            ),
        ],
    ),
]
