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
]
