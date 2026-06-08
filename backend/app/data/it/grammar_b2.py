"""Italian grammar topics — B2."""

from app.data._types import GrammarExample, GrammarMistake, GrammarTopic

B2_GRAMMAR_TOPICS: list[GrammarTopic] = [
    GrammarTopic(
        slug="congiuntivo-imperfetto",
        title="Congiuntivo imperfetto",
        level="B2",
        category="Congiuntivo",
        summary="Il congiuntivo imperfetto: formazione e uso nel passato.",
        explanation="Il **congiuntivo imperfetto** si usa:\n- Nel periodo ipotetico del 2 tipo: *Se potessi, verrei.*\n- Dopo verbi al passato + che: *Pensavo che fosse vero.*\n- Dopo vorrei che: *Vorrei che tu venissi.*\n\nEssere e irregolare: fossi, fossi, fosse, fossimo, foste, fossero.",
        structure="-are: -assi/-assi/-asse/-assimo/-aste/-assero\n-ere: -essi/-essi/-esse/-essimo/-este/-essero\n-ire: -issi/-issi/-isse/-issimo/-iste/-issero",
        rules=[
            "Usato nella protasi del periodo ipotetico (2 tipo).",
            "Usato dopo verbi al passato + che (concordanza).",
            "Dopo vorrei che: Vorrei che tu venissi.",
            "Essere: fossi, fossi, fosse...",
        ],
        examples=[
            GrammarExample(
                text="Se potessi, viaggerei in tutto il mondo.",
                translation="If I could, I would travel the world.",
            ),
            GrammarExample(
                text="Pensavo che tu fossi gia partito.",
                translation="I thought you had already left.",
            ),
            GrammarExample(
                text="Vorrei che fosse sempre estate.", translation="I wish it were always summer."
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Se potrei, viaggerei.",
                correct="Se potessi, viaggerei.",
                note="Dopo se mai il condizionale; si usa congiuntivo imperfetto.",
            ),
            GrammarMistake(
                wrong="Pensavo che tu eri partito.",
                correct="Pensavo che tu fossi partito.",
                note="Verbo principale al passato: congiuntivo imperfetto.",
            ),
        ],
        related=[
            "congiuntivo-presente",
            "congiuntivo-trapassato",
            "concordanza-congiuntivo",
            "periodo-ipotetico-2",
        ],
    ),
    GrammarTopic(
        slug="congiuntivo-trapassato",
        title="Congiuntivo trapassato",
        level="B2",
        category="Congiuntivo",
        summary="Il congiuntivo trapassato: periodo ipotetico del 3 tipo (irrealta).",
        explanation="**Congiuntivo trapassato** = congiuntivo imperfetto di avere/essere + participio passato.\n\n- avere: avessi, avessi, avesse, avessimo, aveste, avessero + participio.\n- essere: fossi... + participio (concordato).\n\nUsi:\n- Periodo ipotetico 3 tipo: *Se avessi studiato, avresti passato l esame.*\n- Concordanza: *Pensavo che fosse gia arrivato.*",
        structure="congiuntivo imperfetto di avere/essere + participio passato",
        rules=[
            "Congiuntivo imperfetto di avere/essere + participio passato.",
            "Periodo ipotetico 3 tipo (irrealta nel passato).",
            "Concordanza: anteriorita rispetto a un passato.",
            "Con essere il participio concorda col soggetto.",
        ],
        examples=[
            GrammarExample(
                text="Se avessi saputo, sarei venuto prima.",
                translation="If I had known, I would have come earlier.",
            ),
            GrammarExample(
                text="Credevo che fossero gia partiti.",
                translation="I thought they had already left.",
            ),
            GrammarExample(
                text="Se avessi studiato, avresti passato l esame.",
                translation="If you had studied, you would have passed the exam.",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Se avrei saputo, sarei venuto.",
                correct="Se avessi saputo, sarei venuto.",
                note="Dopo se mai il condizionale; congiuntivo trapassato.",
            ),
            GrammarMistake(
                wrong="Credevo che hanno finito.",
                correct="Credevo che avessero finito.",
                note="Verbo principale al passato + anteriorita = congiuntivo trapassato.",
            ),
        ],
        related=[
            "congiuntivo-imperfetto",
            "periodo-ipotetico-2",
            "se-congiuntivo",
            "concordanza-congiuntivo",
        ],
    ),
    GrammarTopic(
        slug="concordanza-congiuntivo",
        title="Concordanza del congiuntivo",
        level="B2",
        category="Congiuntivo",
        summary="Coordinare correttamente i tempi del congiuntivo con la principale.",
        explanation="**Principale al presente:**\n- Contemporaneita: congiuntivo presente. *Penso che sia vero.*\n- Anteriorita: congiuntivo passato. *Penso che sia stato vero.*\n\n**Principale al passato:**\n- Contemporaneita: congiuntivo imperfetto. *Pensavo che fosse vero.*\n- Anteriorita: congiuntivo trapassato. *Pensavo che fosse stato vero.*",
        rules=[
            "Princ. presente + contemporaneita = congiuntivo presente.",
            "Princ. presente + anteriorita = congiuntivo passato.",
            "Princ. passato + contemporaneita = congiuntivo imperfetto.",
            "Princ. passato + anteriorita = congiuntivo trapassato.",
        ],
        examples=[
            GrammarExample(
                text="Penso che lui dica la verita.", translation="I think he is telling the truth."
            ),
            GrammarExample(
                text="Penso che lui abbia detto la verita.",
                translation="I think he told the truth.",
            ),
            GrammarExample(
                text="Pensavo che lui dicesse la verita.",
                translation="I thought he was telling the truth.",
            ),
            GrammarExample(
                text="Pensavo che lui avesse detto la verita.",
                translation="I thought he had told the truth.",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Penso che lui dicesse la verita.",
                correct="Penso che lui dica la verita.",
                note="Presente + contemporaneita = presente.",
            ),
            GrammarMistake(
                wrong="Pensavo che lui dica la verita.",
                correct="Pensavo che lui dicesse la verita.",
                note="Passato + contemporaneita = imperfetto.",
            ),
        ],
        related=[
            "congiuntivo-presente",
            "congiuntivo-imperfetto",
            "congiuntivo-trapassato",
            "concordanza-tempi",
        ],
    ),
    GrammarTopic(
        slug="stare-gerundio",
        title="Stare + gerundio",
        level="B2",
        category="Tempi verbali",
        summary="Esprimere azioni in corso con la perifrasi progressiva stare + gerundio.",
        explanation="**Stare + gerundio** = azione in corso.\n- Presente: *Sto mangiando.*\n- Imperfetto: *Stavo mangiando.*\n\nGerundio: -are → -ando, -ere/-ire → -endo.\n\nDiverso da stare per: *Sto per mangiare* (imminenza) vs *Sto mangiando* (in corso).",
        structure="stare + gerundio",
        rules=[
            "Stare + gerundio = azione in corso.",
            "Gerundio: -ando (-are), -endo (-ere, -ire).",
            "Non confondere con stare per + infinito.",
            "Si puo usare al presente e all imperfetto.",
        ],
        examples=[
            GrammarExample(
                text="Sto leggendo un libro interessante.",
                translation="I'm reading an interesting book.",
            ),
            GrammarExample(
                text="Cosa stavi facendo quando ti ho chiamato?",
                translation="What were you doing when I called you?",
            ),
            GrammarExample(text="Stanno arrivando!", translation="They are arriving!"),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Sto per mangiando.",
                correct="Sto per mangiare. (o: Sto mangiando.)",
                note="Stare per + infinito vs stare + gerundio.",
            ),
            GrammarMistake(
                wrong="Sono mangiando.",
                correct="Sto mangiando.",
                note="La perifrasi progressiva usa stare, non essere.",
            ),
        ],
        related=["andare-gerundio", "venire-gerundio", "stare-per"],
    ),
    GrammarTopic(
        slug="andare-gerundio",
        title="Andare + gerundio",
        level="B2",
        category="Tempi verbali",
        summary="Esprimere azioni graduali e progressive con andare + gerundio.",
        explanation="**Andare + gerundio** esprime:\n- Processo graduale: *La situazione va migliorando.*\n- Sviluppo lento: *Va facendo progressi.*\n- Azione continuativa: *Vado dicendo a tutti che...*\n\nDiverso da stare + gerundio (puntuale): sottolinea l evoluzione nel tempo.",
        structure="andare + gerundio",
        rules=[
            "Andare + gerundio = processo graduale/progressivo.",
            "Sottolinea evoluzione nel tempo.",
            "Diverso da stare + gerundio (piu puntuale).",
            "Spesso con verbi di cambiamento.",
        ],
        examples=[
            GrammarExample(
                text="La situazione va migliorando.", translation="The situation is getting better."
            ),
            GrammarExample(
                text="Il tempo andava peggiorando.", translation="The weather was getting worse."
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Vado a migliorando.",
                correct="Vado migliorando.",
                note="Andare + gerundio senza preposizione.",
            ),
        ],
        related=["stare-gerundio", "venire-gerundio", "imperfetto"],
    ),
    GrammarTopic(
        slug="venire-gerundio",
        title="Venire + gerundio",
        level="B2",
        category="Tempi verbali",
        summary="Esprimere azioni progressive con enfasi tramite venire + gerundio.",
        explanation="**Venire + gerundio** e simile a stare + gerundio ma con enfasi sul processo.\n- *Ti vengo dicendo da tempo che...* (enfasi)\n- *Vengono arrivando notizie.* (ripetizione)\n\nMeno comune, piu formale/letterario.",
        structure="venire + gerundio",
        rules=[
            "Venire + gerundio = azione progressiva con enfasi.",
            "Simile a stare + gerundio ma meno comune.",
            "Uso piu formale o letterario.",
            "Sottolinea continuita o ripetizione.",
        ],
        examples=[
            GrammarExample(
                text="Ti vengo dicendo da mesi di fare attenzione.",
                translation="I've been telling you for months to be careful.",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Vengo a dicendo.",
                correct="Vengo dicendo.",
                note="Venire + gerundio senza preposizione.",
            ),
        ],
        related=["stare-gerundio", "andare-gerundio", "imperfetto"],
    ),
    GrammarTopic(
        slug="connettivi-avanzati",
        title="Connettivi avanzati",
        level="B2",
        category="Avanzato",
        summary="Nondimeno, ciononostante, peraltro, bensi, eppure e altri connettivi complessi.",
        explanation="Connettivi avanzati:\n- **Nondimeno / ciononostante**: tuttavia.\n- **Bensi**: ma piuttosto. *Non e cattivo, bensi timido.*\n- **Eppure**: e tuttavia. *Sembrava facile, eppure ho sbagliato.*\n- **Anzi**: al contrario. *Non e brutto, anzi e bellissimo.*\n- **Ovvero / ossia**: cioe.",
        rules=[
            "Bensi dopo negazione per correggere: non X, bensi Y.",
            "Anzi per rafforzare o correggere.",
            "Eppure per contrasto con aspettativa delusa.",
            "Ovvero/ossia per spiegare o ridefinire.",
        ],
        examples=[
            GrammarExample(
                text="Non e pigro, bensi molto metodico.",
                translation="He's not lazy, but rather very methodical.",
            ),
            GrammarExample(
                text="Avevo studiato molto, eppure non ho passato l'esame.",
                translation="I'd studied a lot, yet I didn't pass.",
            ),
            GrammarExample(
                text="Non mi piace, anzi lo detesto.",
                translation="I don't like it, on the contrary I hate it.",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Non e rosso ma bensi blu.",
                correct="Non e rosso, bensi blu.",
                note="Bensi sostituisce ma, non si usano insieme.",
            ),
        ],
        related=["connettivi-argomentativi", "controargomentazione", "struttura-argomentativa"],
    ),
    GrammarTopic(
        slug="coesione-testuale",
        title="Coesione testuale",
        level="B2",
        category="Avanzato",
        summary="Strategie per rendere un testo coeso: anafora, catafora, connettivi.",
        explanation="Meccanismi di coesione:\n- **Anafora:** riprendere un elemento. *Marco e arrivato. Lui era stanco.*\n- **Catafora:** anticipare. *Lo vedo che sei triste.*\n- **Ellissi:** omettere elementi recuperabili.\n- **Coesione lessicale:** sinonimi, iperonimi.\n- **Connettivi:** relazioni logiche tra frasi.",
        rules=[
            "Anafora: pronomi, sinonimi per riprendere elementi.",
            "Catafora: anticipare con pronomi o avverbi.",
            "Ellissi: omettere cio che e recuperabile.",
            "Coesione lessicale: ripetizione, sinonimia, iperonimia.",
        ],
        examples=[
            GrammarExample(
                text="Ho comprato un libro. L'ho letto in due giorni.",
                translation="I bought a book. I read it in two days.",
                note="anafora",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Marco ha comprato un libro. Il quaderno era interessante.",
                correct="Marco ha comprato un libro. Il libro era interessante.",
                note="Mancanza di coesione.",
            ),
        ],
        related=["connettivi-avanzati", "struttura-argomentativa", "sintesi-testuale"],
    ),
    GrammarTopic(
        slug="registro-formale",
        title="Registro formale",
        level="B2",
        category="Avanzato",
        summary="Padroneggiare il registro formale: Lei, congiuntivo, lessico elevato.",
        explanation="Caratteristiche del registro formale:\n- **Pronomi:** Lei di cortesia.\n- **Congiuntivo:** uso rigoroso.\n- **Lessico:** evitare colloquialismi.\n- **Sintassi:** frasi complesse, subordinate implicite.\n- **Fraseologia:** *La ringrazio, Le porgo i miei saluti.*",
        rules=[
            "Usare il Lei con verbo alla 3a singolare.",
            "Congiuntivo obbligatorio nelle subordinate.",
            "Evitare colloquialismi e dislocazioni.",
            "Formule di apertura e chiusura appropriate.",
        ],
        examples=[
            GrammarExample(
                text="La ringrazio per la Sua disponibilita.",
                translation="I thank you for your availability.",
            ),
            GrammarExample(
                text="Le sarei grato se volesse rispondermi.",
                translation="I would be grateful if you would reply.",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Ti ringrazio (in mail formale).",
                correct="La ringrazio.",
                note="Contesto formale = Lei, non tu.",
            ),
        ],
        related=["congiuntivo-presente", "pronomi-soggetto", "discorso-indiretto"],
    ),
    GrammarTopic(
        slug="modi-di-dire",
        title="Modi di dire italiani",
        level="B2",
        category="Avanzato",
        summary="Espressioni idiomatiche italiane comuni e il loro significato.",
        explanation="Modi di dire comuni:\n- *In bocca al lupo!* = Buona fortuna!\n- *Acqua in bocca!* = Non dire niente.\n- *Essere al verde* = Non avere soldi.\n- *Non vedere l'ora* = Aspettare con impazienza.\n- *Piovere a catinelle* = Piovere forte.\n- *Avere un chiodo fisso* = Avere un'ossessione.",
        rules=[
            "I modi di dire sono espressioni fisse, non si modificano.",
            "Il significato e metaforico, non letterale.",
            "Variano da regione a regione.",
            "Usarli rende il discorso piu naturale.",
        ],
        examples=[
            GrammarExample(
                text="In bocca al lupo per l'esame!", translation="Good luck for the exam!"
            ),
            GrammarExample(text="Sono al verde questo mese.", translation="I'm broke this month."),
            GrammarExample(
                text="Non vedo l'ora di vederti!", translation="I can't wait to see you!"
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="In bocca di lupo!",
                correct="In bocca al lupo!",
                note="Espressione fissa: al lupo, non di lupo.",
            ),
        ],
        related=["espressioni-colloquiali", "proverbi-italiani", "linguaggio-giornalistico"],
    ),
    GrammarTopic(
        slug="espressioni-colloquiali",
        title="Espressioni colloquiali",
        level="B2",
        category="Avanzato",
        summary="Il linguaggio di tutti i giorni: dai, insomma, figurati, magari, boh.",
        explanation="Espressioni tipiche del parlato informale:\n- **Dai!**: suvvia, forza (incoraggiamento o incredulita).\n- **Insomma**: in conclusione.\n- **Figurati!**: non preoccuparti, di niente.\n- **Magari!**: sarebbe bello, lo spero tanto.\n- **Boh!**: non lo so.\n- **Mica**: rafforza la negazione. *Mica male!*\n- **Ci sta**: e accettabile, ha senso.\n- **Va be'**: va bene (rassegnazione).",
        rules=[
            "Usare solo in contesti informali.",
            "Dai puo esprimere incoraggiamento o incredulita.",
            "Magari esprime desiderio o possibilita remota.",
            "Mica rafforza la negazione nel parlato.",
        ],
        examples=[
            GrammarExample(
                text="Dai, andiamo al cinema!", translation="Come on, let's go to the cinema!"
            ),
            GrammarExample(
                text="Hai visto la partita? — Magari! Ero al lavoro.",
                translation="Did you see the match? — I wish! I was at work.",
            ),
            GrammarExample(
                text="— Grazie mille! — Figurati!",
                translation="— Thank you so much! — Don't mention it!",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Figurati! (a un professore)",
                correct="Si figuri! (o: Di niente.)",
                note="Con il Lei formale si usa si figuri.",
            ),
            GrammarMistake(
                wrong="Magari piove. (per dire forse)",
                correct="Forse piove.",
                note="Magari = sarebbe bello se, non = forse.",
            ),
        ],
        related=["modi-di-dire", "registro-formale", "proverbi-italiani"],
    ),
    GrammarTopic(
        slug="proverbi-italiani",
        title="Proverbi italiani",
        level="B2",
        category="Avanzato",
        summary="I proverbi italiani piu famosi e il loro significato culturale.",
        explanation="Proverbi celebri:\n- *Chi dorme non piglia pesci.* = L'impegno porta risultati.\n- *Il mattino ha l'oro in bocca.* = Le prime ore sono produttive.\n- *Chi va piano va sano e va lontano.* = Costanza > fretta.\n- *Tra il dire e il fare c'e di mezzo il mare.* = Tra parole e azioni c'e molta differenza.\n- *Non tutto il male viene per nuocere.* = Aspetti positivi dalle avversita.\n- *Meglio tardi che mai.*\n- *Paese che vai, usanza che trovi.*",
        rules=[
            "I proverbi sono espressioni fisse e immutabili.",
            "Spesso contengono rime o assonanze.",
            "Riflettono la cultura e la storia italiana.",
            "Si usano per dare autorevolezza a un discorso.",
        ],
        examples=[
            GrammarExample(
                text="Chi dorme non piglia pesci: alzati presto e mettiti a studiare!",
                translation="The early bird catches the worm!",
            ),
            GrammarExample(
                text="Non preoccuparti: non tutto il male viene per nuocere.",
                translation="Don't worry: every cloud has a silver lining.",
            ),
            GrammarExample(
                text="Ho consegnato il progetto in ritardo, ma meglio tardi che mai!",
                translation="I handed in the project late, but better late than never!",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Chi non dorme piglia pesci.",
                correct="Chi dorme non piglia pesci.",
                note="Il proverbio e fisso.",
            ),
            GrammarMistake(
                wrong="Meglio mai che tardi.",
                correct="Meglio tardi che mai.",
                note="L'ordine e importante nel proverbio.",
            ),
        ],
        related=["modi-di-dire", "espressioni-colloquiali", "italiano-regionale"],
    ),
    GrammarTopic(
        slug="struttura-argomentativa",
        title="Struttura argomentativa",
        level="B2",
        category="Avanzato",
        summary="Costruire un testo argomentativo: tesi, antitesi, prove, conclusione.",
        explanation="Struttura del testo argomentativo:\n1. **Introduzione:** tema e tesi.\n2. **Argomenti a favore:** prove, esempi, dati.\n3. **Antitesi:** obiezioni.\n4. **Confutazione:** rispondere alle obiezioni.\n5. **Conclusione:** riaffermare la tesi.\n\nConnettivi: *innanzitutto, inoltre, infatti, d'altra parte, tuttavia, quindi, in conclusione.*",
        rules=[
            "Tesi chiara all'inizio del testo.",
            "Ogni paragrafo sviluppa un argomento.",
            "Antitesi e confutazione rafforzano la posizione.",
            "Conclusione che riprende la tesi senza ripetere.",
        ],
        examples=[
            GrammarExample(
                text="In questo saggio sosterrò che lo studio delle lingue straniere è fondamentale. Innanzitutto... Inoltre... Tuttavia alcuni obiettano che... Ma queste obiezioni non tengono conto di...",
                translation="In this essay I will argue that studying foreign languages is essential. First of all... Furthermore...",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Tesi confusa o assente all'inizio.",
                correct="Esplicitare la tesi nel primo paragrafo.",
                note="Un testo argomentativo deve far capire subito la posizione dell'autore.",
            ),
            GrammarMistake(
                wrong="Saltare dalla tesi alla conclusione senza argomenti.",
                correct="Sviluppare almeno 2-3 argomenti a favore.",
                note="La parte argomentativa e il cuore del testo.",
            ),
        ],
        related=["controargomentazione", "connettivi-avanzati", "coesione-testuale"],
    ),
    GrammarTopic(
        slug="controargomentazione",
        title="Tecniche di controargomentazione",
        level="B2",
        category="Avanzato",
        summary="Rispondere alle obiezioni in modo strutturato ed efficace.",
        explanation="Tecniche di controargomentazione:\n- **Concessione limitata:** *E vero che... tuttavia...*\n- **Confutazione diretta:** *Si potrebbe obiettare che... ma in realta...*\n- **Ribaltamento:** *Alcuni dicono che... al contrario...*\n- **Riduzione all'assurdo:** *Se fosse vero che... allora...*\n\nConnettivi: *certamente, e vero che, si potrebbe pensare che, ciononostante.*",
        rules=[
            "Riconoscere il punto di vista avversario.",
            "Usare connettivi concessivi: benche, sebbene, anche se.",
            "Ribattere con argomenti piu forti.",
            "Mantenere un tono rispettoso anche nel dissenso.",
        ],
        examples=[
            GrammarExample(
                text="E vero che l'intelligenza artificiale puo sostituire alcuni lavori, tuttavia ne creera di nuovi.",
                translation="It's true that AI can replace some jobs, however it will create new ones.",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Ignorare completamente le obiezioni.",
                correct="Affrontare le obiezioni principali e confutarle.",
                note="Una buona argomentazione considera anche i punti deboli.",
            ),
        ],
        related=["struttura-argomentativa", "connettivi-avanzati", "coesione-testuale"],
    ),
    GrammarTopic(
        slug="sfumature",
        title="Sfumature di significato",
        level="B2",
        category="Avanzato",
        summary="Distinguere sinonimi con sfumature diverse e scegliere la parola giusta.",
        explanation="Sinonimi con sfumature:\n- Vedere / Guardare / Osservare: generico / volontario / attento.\n- Dire / Affermare / Dichiarare: intensita crescente.\n- Contento / Felice / Euforico: intensita crescente.\n- Casa / Abitazione / Dimora: registro crescente.\n- Fare / Realizzare / Effettuare: da generico a formale.",
        rules=[
            "Preferire il termine piu preciso al generico.",
            "Adeguare il lessico al registro (formale/informale).",
            "Considerare l'intensita della parola.",
            "Usare il dizionario dei sinonimi per esplorare opzioni.",
        ],
        examples=[
            GrammarExample(
                text="Ho osservato il quadro per ore.",
                translation="I observed the painting for hours.",
                note="osservare = guardare con attenzione",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Ho visto il panorama con attenzione.",
                correct="Ho osservato/ammirato il panorama con attenzione.",
                note="Vedere e generico; per attenzione si usa osservare.",
            ),
        ],
        related=["precisione-lessicale", "registro-formale", "campi-semantici"],
    ),
    GrammarTopic(
        slug="tempi-narrativi",
        title="Tempi narrativi",
        level="B2",
        category="Tempi verbali",
        summary="Usare imperfetto, passato remoto e trapassato per narrare eventi.",
        explanation="Nella narrazione letteraria:\n- **Imperfetto:** sfondo, descrizioni. *Era una notte buia.*\n- **Passato remoto:** azioni che avanzano la trama. *Entro, si guardo intorno.*\n- **Trapassato prossimo:** flashback. *Aveva gia deciso di partire.*\n\nL'alternanza crea profondita narrativa.",
        rules=[
            "Imperfetto = sfondo, descrizione, atmosfera.",
            "Passato remoto = azioni principali, avanzamento trama.",
            "Trapassato prossimo = flashback, anteriorita.",
            "Alternare i tempi per creare ritmo narrativo.",
        ],
        examples=[
            GrammarExample(
                text="Era una notte buia e tempestosa. All'improvviso, un lampo illumino la stanza. Qualcuno era entrato.",
                translation="It was a dark and stormy night. Suddenly, a flash lit up the room. Someone had entered.",
                note="imperfetto + pass. remoto + trapassato",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Usare solo passato prossimo per narrare.",
                correct="Alternare imperfetto, passato remoto e trapassato.",
                note="Il passato remoto e il tempo della narrazione per eccellenza.",
            ),
        ],
        related=["imperfetto", "passato-remoto", "trapassato-prossimo", "descrizione-letteraria"],
    ),
    GrammarTopic(
        slug="descrizione-letteraria",
        title="Descrizione letteraria",
        level="B2",
        category="Avanzato",
        summary="Tecniche per descrizioni efficaci nella scrittura creativa e letteraria.",
        explanation="Tecniche di descrizione letteraria:\n- **Cinque sensi:** vista, udito, olfatto, tatto, gusto.\n- **Aggettivazione mirata:** pochi aggettivi ma precisi.\n- **Similitudini e metafore:** *Il cielo era come un mare di fuoco.*\n- **Personificazione:** *Il vento sussurrava tra gli alberi.*\n- **Sinestesia:** mescolare i sensi. *Un profumo dolce.*",
        rules=[
            "Coinvolgere tutti e cinque i sensi.",
            "Usare aggettivi specifici, non generici.",
            "Similitudini e metafore per descrizioni vivide.",
            "Mostrare, non dire (show, don't tell).",
        ],
        examples=[
            GrammarExample(
                text="Il sole al tramonto tingeva il cielo di arancione e viola. Un vento tiepido portava il profumo del mare.",
                translation="The setting sun dyed the sky orange and purple. A warm wind carried the scent of the sea.",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Era bello. (descrizione generica)",
                correct="Il panorama era mozzafiato: colline verdi si estendevano a perdita d'occhio.",
                note="Mostrare con dettagli concreti invece di dire solo che e bello.",
            ),
        ],
        related=["tempi-narrativi", "voce-narrativa", "figure-stilistiche"],
    ),
    GrammarTopic(
        slug="passato-remoto",
        title="Passato remoto",
        level="B2",
        category="Tempi verbali",
        summary="Il passato remoto: formazione e uso nella narrazione e nel Sud Italia.",
        explanation="Il **passato remoto** esprime azioni concluse in un passato lontano, senza legami col presente.\n\n**Formazione:**\n- parlare: parlai, parlasti, parlo, parlammo, parlaste, parlarono.\n- leggere: lessi, leggesti, lesse, leggemmo, leggeste, lessero.\n- dormire: dormii, dormisti, dormi, dormimmo, dormiste, dormirono.\n\nMolti verbi hanno il passato remoto irregolare (spesso nella 1a e 3a singolare e 3a plurale).\n\nNell'Italia settentrionale si usa poco, sostituito dal passato prossimo; al Sud e in letteratura e vivo.",
        structure="-are → -ai/-asti/-o/-ammo/-aste/-arono\n-ere → -ei/-esti/-e/-emmo/-este/-erono\n-ire → -ii/-isti/-i/-immo/-iste/-irono",
        rules=[
            "Passato remoto = azione conclusa in passato lontano.",
            "Molti verbi irregolari: essere (fui), avere (ebbi), fare (feci), dire (dissi), scrivere (scrissi).",
            "Uso vivo al Sud; al Nord spesso sostituito dal passato prossimo.",
            "E il tempo narrativo per eccellenza.",
        ],
        examples=[
            GrammarExample(
                text="Dante nacque a Firenze nel 1265.",
                translation="Dante was born in Florence in 1265.",
            ),
            GrammarExample(
                text="Lessi quel libro l'estate scorsa. (Sud)",
                translation="I read that book last summer.",
            ),
            GrammarExample(
                text="Fecero tutto il possibile per aiutarci.",
                translation="They did everything possible to help us.",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Ieri andiedi al cinema.",
                correct="Ieri andai al cinema. (o: sono andato)",
                note="Andare: passato remoto irregolare → andai.",
            ),
            GrammarMistake(
                wrong="Usare il passato remoto per eventi recenti (al Nord).",
                correct="Preferire il passato prossimo per eventi recenti al Nord.",
                note="Al Nord il passato remoto e sentito come formale/letterario.",
            ),
        ],
        related=["imperfetto", "tempi-narrativi", "trapassato-prossimo", "concordanza-tempi"],
    ),
    GrammarTopic(
        slug="linguaggio-giornalistico",
        title="Linguaggio giornalistico",
        level="B2",
        category="Avanzato",
        summary="Caratteristiche del linguaggio dei giornali italiani.",
        explanation="Il linguaggio giornalistico italiano ha caratteristiche proprie:\n- **Titoli:** spesso senza articolo, con ellissi verbale. *Governo in crisi, elezioni anticipate.*\n- **Stile nominale:** *Allarme rosso per l'economia.*\n- **Participi assoluti:** *Concluso il vertice, il premier ha parlato.*\n- **Lessico tecnico-politico:** *vertice, crisi, manovra, decreto.*\n- **Neologismi e anglicismi:** *spread, spending review, Jobs Act.*\n- **Ripetizioni evitare:** ampio uso di sinonimi e perifrasi.",
        rules=[
            "Titoli stringati, spesso senza verbo o articolo.",
            "Stile nominale: sostantivi invece di verbi.",
            "Participi assoluti per esprimere anteriorita.",
            "Lessico specifico del settore trattato.",
        ],
        examples=[
            GrammarExample(
                text="Crisi di governo: il Presidente sale al Quirinale.",
                translation="Government crisis: the President goes to the Quirinale.",
            ),
            GrammarExample(
                text="Firmato l'accordo, le parti hanno rilasciato dichiarazioni.",
                translation="Having signed the agreement, the parties released statements.",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Usare linguaggio colloquiale in un articolo formale.",
                correct="Mantenere un registro formale e oggettivo.",
                note="Il giornalismo richiede un registro piu elevato.",
            ),
        ],
        related=["titoli", "registro-formale", "discorso-riportato"],
    ),
    GrammarTopic(
        slug="titoli",
        title="Titoli giornalistici",
        level="B2",
        category="Avanzato",
        summary="Come sono costruiti i titoli nei giornali italiani.",
        explanation="I titoli giornalistici italiani seguono regole precise:\n- **Ellissi dell'articolo:** *Borsa in rialzo* (non: La borsa in rialzo).\n- **Presente storico:** *Crolla il governo.*\n- **Stile nominale:** *Paura per il terremoto.*\n- **Ellissi verbale:** *Scontri a Roma.*\n\nI titoli a effetto usano anche metafore, giochi di parole e riferimenti culturali.",
        rules=[
            "Spesso senza articolo iniziale.",
            "Presente storico per eventi passati.",
            "Stile nominale senza verbo.",
            "Metafore e giochi di parole per attirare l'attenzione.",
        ],
        examples=[
            GrammarExample(
                text="Crolla la Borsa: persi 50 miliardi.",
                translation="Stock market crashes: 50 billion lost.",
            ),
            GrammarExample(
                text="Mafia, maxi-operazione: 50 arresti.",
                translation="Mafia, major operation: 50 arrests.",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Titolo troppo lungo e descrittivo.",
                correct="Titolo breve, incisivo, spesso senza verbo o articolo.",
                note="I titoli italiani sono stringati e d'effetto.",
            ),
        ],
        related=["linguaggio-giornalistico", "discorso-riportato", "registro-formale"],
    ),
    GrammarTopic(
        slug="discorso-riportato",
        title="Discorso riportato nei media",
        level="B2",
        category="Discorso indiretto",
        summary="Come i media italiani riportano le dichiarazioni altrui.",
        explanation="Il discorso riportato nei media:\n- **Condizionale di dissociazione:** il giornalista prende le distanze. *Il ministro avrebbe dichiarato...*\n- **Virgolettato:** citazione diretta.\n- **Discorso indiretto libero:** mescola diretto e indiretto.\n\nIl condizionale di dissociazione e tipico: segnala che la notizia non e confermata.",
        rules=[
            "Condizionale di dissociazione per notizie non confermate.",
            "Virgolettato per citazioni testuali.",
            "Indiretto libero per fluidita narrativa.",
            "Verbi dichiarativi: affermare, dichiarare, sostenere, riferire.",
        ],
        examples=[
            GrammarExample(
                text="Secondo fonti vicine al governo, il premier si dimetterebbe entro domani.",
                translation="According to sources close to the government, the PM would resign by tomorrow.",
                note="condizionale di dissociazione",
            ),
            GrammarExample(
                text='"Non abbiamo nulla da nascondere", ha dichiarato il portavoce.',
                translation="'We have nothing to hide,' stated the spokesperson.",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Il ministro ha detto che si dimettera. (senza fonte certa)",
                correct="Il ministro si dimetterebbe. (condizionale di dissociazione)",
                note="Se la notizia non e confermata, si usa il condizionale.",
            ),
        ],
        related=[
            "linguaggio-giornalistico",
            "titoli",
            "discorso-indiretto",
            "condizionale-presente",
        ],
    ),
]
