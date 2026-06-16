"""Italian phrasebook — C2 categories."""

from app.data._types import PhrasebookCategory, PhrasebookEntry

C2_CATEGORIES: list[PhrasebookCategory] = [
    PhrasebookCategory(
        id="rhetoric_c2",
        level="C2",
        situation="Retorica e persuasione",
        icon="\u2696\ufe0f",
        phrases=[
            PhrasebookEntry(
                text="Non vi \u00e8 ombra di dubbio che le evidenze parlino da sole.",
                context="Rafforzare un'affermazione con forza retorica",
                register="formal",
            ),
            PhrasebookEntry(
                text="Chi oserebbe affermare il contrario?",
                context="Domanda retorica per rafforzare la tesi",
                register="formal",
            ),
            PhrasebookEntry(
                text="\u00c8 giunto il momento di affrontare la verit\u00e0, per quanto scomoda possa essere.",
                context="Appello emotivo alla verit\u00e0",
                register="formal",
            ),
            PhrasebookEntry(
                text="Non possiamo restare inerti di fronte a una simile ingiustizia.",
                context="Chiamata all'azione",
                register="formal",
            ),
            PhrasebookEntry(
                text="Le conseguenze di una mancata azione sarebbero catastrofiche.",
                context="Avvertimento sulle conseguenze",
                register="formal",
            ),
            PhrasebookEntry(
                text="Invoco il vostro senso di responsabilit\u00e0 verso le generazioni future.",
                context="Appello alle generazioni future",
                register="formal",
            ),
            PhrasebookEntry(
                text="Questa non \u00e8 una questione di destra o di sinistra, ma di buonsenso.",
                context="Superare divisioni politiche",
                register="formal",
            ),
            PhrasebookEntry(
                text="Lasciate che vi racconti una storia che illustra meglio di mille parole ci\u00f2 che intendo.",
                context="Usare una narrazione persuasiva",
                register="formal",
            ),
            PhrasebookEntry(
                text="Siamo a un bivio storico, e la scelta che faremo oggi definir\u00e0 il nostro futuro.",
                context="Creare urgenza storica",
                register="formal",
            ),
            PhrasebookEntry(
                text="Non illudiamoci: la strada \u00e8 in salita, ma \u00e8 percorribile.",
                context="Riconoscere difficolt\u00e0 ma infondere speranza",
                register="formal",
            ),
            PhrasebookEntry(
                text="Chi non \u00e8 parte della soluzione \u00e8 parte del problema.",
                context="Dicotomia retorica",
                register="formal",
            ),
            PhrasebookEntry(
                text="Concedetemi di sognare per un istante un mondo in cui...",
                context="Apertura visionaria",
                register="formal",
            ),
        ],
    ),
    PhrasebookCategory(
        id="nuanced_discourse_c2",
        level="C2",
        situation="Discorso sfumato e hedging",
        icon="\U0001f52c",
        phrases=[
            PhrasebookEntry(
                text="A mio modesto parere, la questione \u00e8 assai pi\u00f9 complessa di quanto appaia a prima vista.",
                context="Sminuire la propria opinione per diplomazia",
                register="formal",
            ),
            PhrasebookEntry(
                text="Non si pu\u00f2 escludere a priori che vi siano state delle incomprensioni.",
                context="Aprire a possibilit\u00e0 alternative",
                register="formal",
            ),
            PhrasebookEntry(
                text="Tenderei a credere che le cose stiano diversamente, ma sono pronto/a a ricredermi.",
                context="Esprimere opinione con apertura al cambiamento",
                register="formal",
            ),
            PhrasebookEntry(
                text="Sarebbe azzardato trarre conclusioni definitive sulla base dei dati attuali.",
                context="Mettere in guardia da conclusioni affrettate",
                register="formal",
            ),
            PhrasebookEntry(
                text="Per quanto mi riguarda, non vi sarebbero obiezioni di principio, ma andrebbero valutati i dettagli operativi.",
                context="Accordo condizionato",
                register="formal",
            ),
            PhrasebookEntry(
                text="Ammesso e non concesso che la premessa sia corretta, la conclusione non \u00e8 scontata.",
                context="Accettare ipoteticamente una premessa",
                register="formal",
            ),
            PhrasebookEntry(
                text="Non vorrei che le mie parole venissero interpretate come una critica, quanto piuttosto come uno spunto di riflessione.",
                context="Attenuare una potenziale critica",
                register="formal",
            ),
            PhrasebookEntry(
                text="\u00c8 verosimile che la situazione evolva in una direzione diversa da quella prevista.",
                context="Esprimere probabilit\u00e0 con cautela",
                register="formal",
            ),
            PhrasebookEntry(
                text="Lungi da me l'idea di voler imporre la mia visione.",
                context="Prevenire accuse di arroganza",
                register="formal",
            ),
            PhrasebookEntry(
                text="Si potrebbe forse azzardare l'ipotesi che le cause siano pi\u00f9 profonde.",
                context="Proporre ipotesi con cautela",
                register="formal",
            ),
            PhrasebookEntry(
                text="\u00c8 innegabilmente un passo avanti, bench\u00e9 permangano alcune criticit\u00e0.",
                context="Bilanciare elogio e critica",
                register="formal",
            ),
            PhrasebookEntry(
                text="Sarei cauto/a nell'attribuire tout court la responsabilit\u00e0 a un singolo fattore.",
                context="Mettere in guardia da attribuzioni semplicistiche",
                register="formal",
            ),
        ],
    ),
    PhrasebookCategory(
        id="legal_contractual_c2",
        level="C2",
        situation="Linguaggio legale e contrattuale",
        icon="\U0001f4dc",
        phrases=[
            PhrasebookEntry(
                text="Ai sensi dell'articolo 3 del presente contratto, le parti convengono quanto segue.",
                context="Riferimento a una clausola contrattuale",
                register="formal",
            ),
            PhrasebookEntry(
                text="Il presente accordo \u00e8 regolato dalla legge italiana.",
                context="Specificare la giurisdizione",
                register="formal",
            ),
            PhrasebookEntry(
                text="Fatto salvo quanto previsto al comma precedente.",
                context="Fare una riserva legale",
                register="formal",
            ),
            PhrasebookEntry(
                text="La presente scrittura costituisce l'intero accordo tra le parti.",
                context="Clausola di completezza contrattuale",
                register="formal",
            ),
            PhrasebookEntry(
                text="Ogni modifica dovr\u00e0 essere apportata per iscritto e sottoscritta da entrambe le parti.",
                context="Clausola di modifica",
                register="formal",
            ),
            PhrasebookEntry(
                text="La parte inadempiente sar\u00e0 tenuta al risarcimento del danno.",
                context="Clausola di inadempienza",
                register="formal",
            ),
            PhrasebookEntry(
                text="Le parti eleggono domicilio presso le rispettive sedi legali.",
                context="Elezione di domicilio",
                register="formal",
            ),
            PhrasebookEntry(
                text="Il contratto \u00e8 nullo ove in contrasto con norme imperative.",
                context="Clausola di nullit\u00e0",
                register="formal",
            ),
            PhrasebookEntry(
                text="In fede, le parti sottoscrivono il presente atto.",
                context="Formula di chiusura legale",
                register="formal",
            ),
            PhrasebookEntry(
                text="Il presente atto \u00e8 soggetto a registrazione presso l'Agenzia delle Entrate.",
                context="Obbligo di registrazione",
                register="formal",
            ),
            PhrasebookEntry(
                text="Le controversie saranno deferite al foro competente di Roma.",
                context="Clausola del foro competente",
                register="formal",
            ),
        ],
    ),
    PhrasebookCategory(
        id="social_commentary_c2",
        level="C2",
        situation="Commento sociale e dibattito",
        icon="\U0001f5de\ufe0f",
        phrases=[
            PhrasebookEntry(
                text="La societ\u00e0 contemporanea si trova ad affrontare sfide senza precedenti.",
                context="Apertura di un commento sociale",
                register="formal",
            ),
            PhrasebookEntry(
                text="Il divario tra ricchi e poveri si sta ampliando in modo allarmante.",
                context="Denuncia di disuguaglianza",
                register="formal",
            ),
            PhrasebookEntry(
                text="\u00c8 indispensabile un cambio di paradigma se vogliamo garantire un futuro sostenibile.",
                context="Chiamata al cambiamento",
                register="formal",
            ),
            PhrasebookEntry(
                text="Non possiamo pi\u00f9 permetterci di ignorare le conseguenze delle nostre azioni sul pianeta.",
                context="Appello ecologico",
                register="formal",
            ),
            PhrasebookEntry(
                text="La crisi che stiamo attraversando non \u00e8 solo economica, ma anche valoriale.",
                context="Analisi multidimensionale",
                register="formal",
            ),
            PhrasebookEntry(
                text="Le nuove tecnologie offrono opportunit\u00e0 straordinarie, ma pongono anche interrogativi etici inquietanti.",
                context="Bilanciare progresso e rischi",
                register="formal",
            ),
            PhrasebookEntry(
                text="Assistiamo a una progressiva erosione della fiducia nelle istituzioni democratiche.",
                context="Analisi politica",
                register="formal",
            ),
            PhrasebookEntry(
                text="\u00c8 nostro dovere morale impegnarci per una societ\u00e0 pi\u00f9 giusta e inclusiva.",
                context="Appello morale",
                register="formal",
            ),
            PhrasebookEntry(
                text="Il dibattito pubblico \u00e8 stato inquinato da un'ondata di disinformazione senza precedenti.",
                context="Critica dei media",
                register="formal",
            ),
            PhrasebookEntry(
                text="La cultura, intesa nel suo senso pi\u00f9 ampio, \u00e8 l'unico vero antidoto contro l'intolleranza.",
                context="Elogio della cultura",
                register="formal",
            ),
            PhrasebookEntry(
                text="Senza un'istruzione di qualit\u00e0, ogni discorso sul progresso sociale \u00e8 destinato a rimanere lettera morta.",
                context="Difesa dell'istruzione",
                register="formal",
            ),
        ],
    ),
    PhrasebookCategory(
        id="italofonia_contemporanea_it_c2",
        level="C2",
        situation="Italofonia e sfide contemporanee",
        icon="\U0001f30d",
        phrases=[
            PhrasebookEntry(
                text="L'italofonia non si esaurisce nei confini nazionali: dalla Svizzera italiana all'Istria, dall'Argentina all'Australia, l'italiano è una lingua globale.",
                context="Introdurre il concetto di italofonia globale in un discorso formale",
                register="formal",
                unit_ref="c2-unit-7",
            ),
            PhrasebookEntry(
                text="L'Accademia della Crusca, da custode della purezza linguistica, si è trasformata in osservatorio privilegiato dell'italiano contemporaneo.",
                context="Descrivere l'evoluzione del ruolo della Crusca",
                register="formal",
                unit_ref="c2-unit-7",
            ),
            PhrasebookEntry(
                text="Non esiste un italiano, ma tanti italiani: dalle varietà regionali della penisola alle comunità italofone all'estero, ciascuna con le proprie norme endogene.",
                context="Sostenere il riconoscimento di più varietà dell'italiano in ambito accademico",
                register="formal",
                unit_ref="c2-unit-7",
            ),
            PhrasebookEntry(
                text="La diglossia italiano-dialetto, lungi dall'essere un ostacolo, rappresenta un patrimonio culturale di inestimabile valore.",
                context="Difendere la coesistenza di italiano standard e dialetti come ricchezza culturale",
                register="formal",
                unit_ref="c2-unit-7",
            ),
            PhrasebookEntry(
                text="I social media stanno accelerando l'evoluzione lessicale dell'italiano a un ritmo senza precedenti nella storia della lingua.",
                context="Commentare l'impatto dei social media sull'evoluzione linguistica",
                register="formal",
                unit_ref="c2-unit-7",
            ),
            PhrasebookEntry(
                text="Gli anglicismi nel linguaggio digitale non rappresentano una minaccia, ma un fenomeno fisiologico di contatto linguistico che l'italiano ha sempre saputo metabolizzare.",
                context="Adottare un approccio equilibrato al dibattito sugli anglicismi",
                register="formal",
                unit_ref="c2-unit-7",
            ),
            PhrasebookEntry(
                text="La tutela delle minoranze linguistiche storiche, sancita dalla legge 482/1999, è un dovere costituzionale ancora parzialmente inattuato.",
                context="Valutare l'attuazione della legge sulle minoranze linguistiche",
                register="formal",
                unit_ref="c2-unit-7",
            ),
            PhrasebookEntry(
                text="Nell'era dell'intelligenza artificiale, la sovranità linguistica digitale dell'italiano diventa una questione di politica culturale.",
                context="Inquadrare la sovranità linguistica digitale come priorità culturale",
                register="formal",
                unit_ref="c2-unit-7",
            ),
            PhrasebookEntry(
                text="Tra purismo anacronistico e resa incondizionata all'inglese, esiste una terza via: un'apertura consapevole che arricchisca senza snaturare.",
                context="Proporre una posizione equilibrata tra purismo e aperturismo",
                register="formal",
                unit_ref="c2-unit-7",
            ),
            PhrasebookEntry(
                text="La Società Dante Alighieri rappresenta il principale strumento di diplomazia culturale italiana, con oltre cinquecento comitati nel mondo.",
                context="Evidenziare il ruolo della Dante Alighieri nella diffusione dell'italiano",
                register="formal",
                unit_ref="c2-unit-7",
            ),
            PhrasebookEntry(
                text="Non si può dissociare la lingua dai rapporti di potere che la attraversano: la politica linguistica è sempre politica tout court.",
                context="Sostenere che la lingua è intrinsecamente legata alle dinamiche di potere — prospettiva sociolinguistica critica",
                register="formal",
                unit_ref="c2-unit-7",
            ),
            PhrasebookEntry(
                text="Le comunità italofone all'estero sono custodi di un italiano spesso più conservativo di quello parlato nella penisola.",
                context="Analizzare il carattere conservativo dell'italiano delle diaspore",
                register="formal",
                unit_ref="c2-unit-7",
            ),
        ],
    ),
]
