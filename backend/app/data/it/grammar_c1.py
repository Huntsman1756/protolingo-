"""Italian grammar topics — C1."""

from app.data._types import GrammarExample, GrammarMistake, GrammarTopic

C1_GRAMMAR_TOPICS: list[GrammarTopic] = [
    GrammarTopic(
        slug="congiuntivo-concessivo",
        title="Congiuntivo concessivo",
        level="C1",
        category="Congiuntivo",
        summary="Benche, sebbene, nonostante, malgrado + congiuntivo per esprimere concessione.",
        explanation="Le congiunzioni concessive richiedono il congiuntivo.\n\n- **Benche** / **Sebbene** + congiuntivo: *Benche piovesse, uscimmo.*\n- **Nonostante** / **Malgrado** + congiuntivo: *Nonostante fosse tardi, continuarono.*\n- **Anche se** + indicativo (eccezione): *Anche se pioveva, uscimmo.*\n\nLa scelta del tempo del congiuntivo segue la concordanza.",
        rules=[
            "Benche, sebbene, nonostante, malgrado + congiuntivo.",
            "Anche se + indicativo (eccezione nelle concessive).",
            "Concordanza: presente → cong. presente; passato → cong. imperfetto.",
            "Registro formale richiede il congiuntivo.",
        ],
        examples=[
            GrammarExample(
                text="Benche fosse stanco, continuo a lavorare.",
                translation="Although he was tired, he kept working.",
            ),
            GrammarExample(
                text="Nonostante abbia studiato molto, non ha passato l esame.",
                translation="Despite having studied a lot, he didn't pass the exam.",
            ),
            GrammarExample(
                text="Sebbene sia tardi, resto ancora un po.",
                translation="Although it's late, I'll stay a little longer.",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Benche era stanco, continuo.",
                correct="Benche fosse stanco, continuo.",
                note="Benche richiede sempre il congiuntivo.",
            ),
            GrammarMistake(
                wrong="Anche se fosse tardi... (non necessario)",
                correct="Anche se era tardi...",
                note="Anche se regge l'indicativo, non il congiuntivo.",
            ),
        ],
        related=["congiuntivo-presente", "congiuntivo-imperfetto", "connettivi-argomentativi"],
    ),
    GrammarTopic(
        slug="congiuntivo-finale",
        title="Congiuntivo finale (scopo)",
        level="C1",
        category="Congiuntivo",
        summary="Affinche, perche (scopo) + congiuntivo per esprimere lo scopo di un'azione.",
        explanation="Le proposizioni finali esprimono lo scopo e richiedono il congiuntivo.\n\n- **Affinche** + congiuntivo: *Parlo lentamente affinche tu capisca.*\n- **Perche** + congiuntivo: *Te lo dico perche tu lo sappia.*\n- **Acciocche** (letterario) + congiuntivo.\n\nCon lo stesso soggetto si usa per + infinito: *Studio per imparare.*",
        rules=[
            "Affinche, perche (scopo) + congiuntivo.",
            "Stesso soggetto: per + infinito.",
            "Tempo del congiuntivo secondo concordanza.",
            "Registro formale: affinche; colloquiale: perche.",
        ],
        examples=[
            GrammarExample(
                text="Ti scrivo affinche tu sia informato.",
                translation="I'm writing so that you are informed.",
            ),
            GrammarExample(
                text="Parlo ad alta voce perche tutti sentano.",
                translation="I speak loudly so that everyone can hear.",
            ),
            GrammarExample(
                text="Studio ogni giorno per migliorare. (stesso soggetto)",
                translation="I study every day to improve.",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Ti scrivo affinche sei informato.",
                correct="Ti scrivo affinche tu sia informato.",
                note="Affinche richiede il congiuntivo.",
            ),
            GrammarMistake(
                wrong="Studio per che imparo.",
                correct="Studio per imparare. (o: Studio affinche io impari.)",
                note="Stesso soggetto → per + infinito.",
            ),
        ],
        related=["congiuntivo-presente", "congiuntivo-concessivo", "connettivi-argomentativi"],
    ),
    GrammarTopic(
        slug="congiuntivo-relativo",
        title="Congiuntivo nelle relative",
        level="C1",
        category="Congiuntivo",
        summary="Uso del congiuntivo nelle proposizioni relative per esprimere carattere restrittivo o eventuale.",
        explanation="Il congiuntivo nelle relative esprime:\n- **Carattere eventuale/ipotetico:** *Cerco una persona che parli inglese.* (non so se esista)\n- **Con superlativo relativo:** *E il libro piu bello che io abbia mai letto.*\n- **Dopo negazione o restrizione:** *Non c'e nessuno che possa aiutarmi.*\n\nL'indicativo si usa per fatti certi: *Conosco una persona che parla inglese.*",
        rules=[
            "Congiuntivo = ipotetico/non certo.",
            "Indicativo = fatto certo/reale.",
            "Dopo superlativo relativo si usa il congiuntivo.",
            "Dopo espressioni negative restrittive: nessuno che, niente che.",
        ],
        examples=[
            GrammarExample(
                text="Cerco un libro che spieghi bene la grammatica. (non so se esiste)",
                translation="I'm looking for a book that explains grammar well.",
                note="ipotetico",
            ),
            GrammarExample(
                text="E il film piu emozionante che io abbia mai visto.",
                translation="It's the most exciting film I've ever seen.",
                note="superlativo",
            ),
            GrammarExample(
                text="Conosco un libro che spiega bene la grammatica.",
                translation="I know a book that explains grammar well.",
                note="certo → indicativo",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Cerco una persona che parla inglese. (ma non so se esista)",
                correct="Cerco una persona che parli inglese.",
                note="Se la persona non e certa, si usa il congiuntivo.",
            ),
            GrammarMistake(
                wrong="E il piu bello che ho mai visto.",
                correct="E il piu bello che abbia mai visto.",
                note="Dopo superlativo relativo serve il congiuntivo.",
            ),
        ],
        related=["che-relativo", "cui", "congiuntivo-presente", "superlativi"],
    ),
    GrammarTopic(
        slug="nominalizzazione",
        title="Nominalizzazione",
        level="C1",
        category="Avanzato",
        summary="Trasformare verbi e aggettivi in nomi per uno stile piu formale e denso.",
        explanation="La nominalizzazione trasforma verbi/aggettivi in sostantivi, tipica dello stile formale e accademico.\n\n- Verbo → nome: *costruire → la costruzione; analizzare → l'analisi.*\n- Aggettivo → nome: *rapido → la rapidita; bello → la bellezza.*\n\nVantaggi: concisione, oggettivita, formalita.\nSvantaggi: puo rendere il testo pesante e astratto.",
        rules=[
            "Verbi in -zione, -mento, -aggio: costruzione, cambiamento, atterraggio.",
            "Aggettivi in -(e)zza, -ita: bellezza, rapidita.",
            "Utile nello stile accademico, giuridico, tecnico.",
            "Evitare accumulo eccessivo di nominalizzazioni.",
        ],
        examples=[
            GrammarExample(
                text="L'analisi dei dati ha richiesto tre mesi. (invece di: Abbiamo analizzato i dati per tre mesi.)",
                translation="The analysis of the data took three months.",
            ),
            GrammarExample(
                text="La costruzione del ponte fu completata nel 2010.",
                translation="The construction of the bridge was completed in 2010.",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Eccesso di nominalizzazioni: 'L'effettuazione della verifica della documentazione...'",
                correct="Verificare la documentazione...",
                note="Troppe nominalizzazioni appesantiscono il testo.",
            ),
        ],
        related=["registro-formale", "sintesi-testuale", "impersonalita"],
    ),
    GrammarTopic(
        slug="impersonalita",
        title="Impersonalita e distacco",
        level="C1",
        category="Avanzato",
        summary="Tecniche per esprimere impersonalita e distacco nel registro formale.",
        explanation="Strategie per l'impersonalita:\n- **Si impersonale/passivante:** *Si ritiene che...*\n- **Forma passiva:** *E stato dimostrato che...*\n- **Costruzioni impersonali:** *Bisogna, occorre, e necessario.*\n- **Soggetto generico:** *Uno, taluni, certi.*\n- **Infinito sostantivato:** *Il fare, il dire.*",
        rules=[
            "Si impersonale per affermazioni generali.",
            "Forma passiva per mettere in risalto l'azione.",
            "Evitare prima persona (io, noi) in testi formali.",
            "Costruzioni con va + participio: va notato, va detto.",
        ],
        examples=[
            GrammarExample(
                text="Si ritiene che la situazione sia migliorata.",
                translation="It is believed that the situation has improved.",
            ),
            GrammarExample(
                text="E stato osservato un aumento dei prezzi.",
                translation="An increase in prices has been observed.",
            ),
            GrammarExample(
                text="Va notato che i risultati sono preliminari.",
                translation="It should be noted that the results are preliminary.",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Io penso che... (in un testo accademico)",
                correct="Si ritiene che... / E opinione diffusa che...",
                note="In testi formali evitare la prima persona.",
            ),
        ],
        related=["si-impersonale", "forma-passiva", "registro-formale"],
    ),
    GrammarTopic(
        slug="campi-semantici",
        title="Campi semantici",
        level="C1",
        category="Avanzato",
        summary="Raggruppare e organizzare il lessico per campi semantici.",
        explanation="Un campo semantico e un insieme di parole legate da significato comune.\n\nEsempi:\n- **Meteorologia:** pioggia, neve, grandine, vento, nuvola, temporale.\n- **Emozioni:** gioia, tristezza, rabbia, paura, sorpresa, disgusto.\n- **Politica:** governo, parlamento, elezioni, partito, riforma.\n\nL'organizzazione in campi semantici facilita l'apprendimento del lessico.",
        rules=[
            "Organizzare il lessico per aree tematiche.",
            "Riconoscere iponimi e iperonimi.",
            "Espandere il vocabolario per singolo campo.",
            "Utile per la scrittura tematica e traduzione.",
        ],
        examples=[
            GrammarExample(
                text="Nel campo semantico del cibo: pasta, pizza, risotto, insalata, formaggio, vino.",
                translation="In the semantic field of food: pasta, pizza, risotto, salad, cheese, wine.",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Imparare liste di parole isolate.",
                correct="Imparare parole organizzate per campi semantici.",
                note="Il cervello memorizza meglio parole collegate tra loro.",
            ),
        ],
        related=["precisione-lessicale", "derivazione", "sfumature"],
    ),
    GrammarTopic(
        slug="derivazione",
        title="Derivazione delle parole",
        level="C1",
        category="Avanzato",
        summary="Prefissi e suffissi per creare nuove parole italiane.",
        explanation="La derivazione crea parole nuove con prefissi e suffissi.\n\n**Prefissi:**\n- ri- (ripetizione): *rifare, rileggere.*\n- s- (negazione/contrario): *scomodo, sfortunato.*\n- dis- (negazione): *disordinato, disonesto.*\n- pre- (prima): *prevedere, preistoria.*\n\n**Suffissi:**\n- -zione (azione): *costruzione, traduzione.*\n- -tore/-trice (agente): *lavoratore, scrittrice.*\n- -bile (possibilita): *leggibile, mangiabile.*\n- -ezza/-ita (qualita): *bellezza, rapidita.*",
        rules=[
            "Prefissi modificano il significato della radice.",
            "Suffissi cambiano la categoria grammaticale.",
            "I suffissi alterativi (-ino, -one, -accio) esprimono sfumature.",
            "Attenzione ai falsi derivati.",
        ],
        examples=[
            GrammarExample(
                text="Rileggere il testo aiuta a trovare errori.",
                translation="Rereading the text helps find errors.",
                note="ri- = di nuovo",
            ),
            GrammarExample(
                text="La situazione e migliorabile.",
                translation="The situation can be improved.",
                note="-bile = che puo essere",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Usare suffissi in modo arbitrario.",
                correct="Conoscere i suffissi produttivi per ogni categoria.",
                note="Non tutti i verbi formano nomi con -zione.",
            ),
        ],
        related=["campi-semantici", "precisione-lessicale", "prestiti-linguistici"],
    ),
    GrammarTopic(
        slug="precisione-lessicale",
        title="Precisione lessicale",
        level="C1",
        category="Avanzato",
        summary="Scegliere la parola esatta: evitare genericità e approssimazioni.",
        explanation="La precisione lessicale distingue un parlante C1.\n\nTecniche:\n- Sostituire parole generiche con termini specifici.\n- *Cosa → oggetto, elemento, fenomeno, questione.*\n- *Fare → realizzare, effettuare, compiere, eseguire.*\n- *Bello → splendido, incantevole, affascinante, suggestivo.*\n- Usare collocazioni appropriate (combinazioni tipiche di parole).",
        rules=[
            "Preferire il termine specifico a quello generico.",
            "Consultare dizionari dei sinonimi e collocazioni.",
            "Adeguare la scelta al registro e contesto.",
            "Evitare il verbo generico fare quando possibile.",
        ],
        examples=[
            GrammarExample(
                text="Il governo ha adottato misure per contrastare l'inflazione. (non: ha fatto cose)",
                translation="The government adopted measures to fight inflation.",
            ),
            GrammarExample(
                text="Il tramonto dipingeva il cielo di sfumature purpuree. (non: era bello)",
                translation="The sunset painted the sky with purple hues.",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Ho fatto una bella esperienza.",
                correct="Ho vissuto un'esperienza entusiasmante/formativa/indimenticabile.",
                note="Bello e generico; scegliere aggettivo piu preciso.",
            ),
        ],
        related=["sfumature", "campi-semantici", "registro-formale"],
    ),
    GrammarTopic(
        slug="ironia-italiana",
        title="Ironia e sarcasmo all'italiana",
        level="C1",
        category="Avanzato",
        summary="Capire e usare l'ironia italiana: sfumature culturali e linguistiche.",
        explanation="L'ironia italiana si basa spesso su:\n- **Antifrasi:** dire il contrario di cio che si pensa. *Che bella giornata!* (quando piove).\n- **Iperbole:** esagerazione. *Ci metto un secondo!* (in realta 10 minuti).\n- **Understatement:** minimizzare. *Non e niente, solo un graffietto.* (ferita grave).\n- **Tono:** fondamentale per distinguere ironia da affermazione seria.",
        rules=[
            "L'ironia si basa sul contrasto tra detto e inteso.",
            "Il tono di voce e cruciale per segnalare ironia.",
            "Nello scritto si usano punti esclamativi, virgolette.",
            "Attenzione: l'ironia puo non essere capita da non nativi.",
        ],
        examples=[
            GrammarExample(
                text="Ma figurati, non vedevo l'ora di passare tre ore in coda alla posta!",
                translation="Oh sure, I couldn't wait to spend three hours in line at the post office!",
                note="ironia antifrastica",
            ),
            GrammarExample(
                text="Ah, sei riuscito ad arrivare in orario! Miracolo!",
                translation="Oh, you managed to arrive on time! A miracle!",
                note="ironia bonaria",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Prendere l'ironia alla lettera.",
                correct="Riconoscere l'ironia dal contesto e dal tono.",
                note="L'ironia italiana puo essere sottile e confondere.",
            ),
        ],
        related=["umorismo", "doppio-senso", "modi-di-dire"],
    ),
    GrammarTopic(
        slug="umorismo",
        title="Umorismo italiano",
        level="C1",
        category="Avanzato",
        summary="L'umorismo nella cultura italiana: tipologie e caratteristiche.",
        explanation="L'umorismo italiano e variegato:\n- **Giochi di parole:** basati su doppi sensi (*La volpe e l'uva*).\n- **Barzellette:** brevi storie a sorpresa.\n- **Autoironia:** prendere in giro se stessi o la propria citta/regione.\n- **Satira:** critica sociale e politica mascherata da umorismo.\n- **Commedia dell'arte:** maschere e stereotipi regionali.",
        rules=[
            "L'umorismo varia per regione e generazione.",
            "I giochi di parole sono molto apprezzati.",
            "L'autoironia e segno di intelligenza e umilta.",
            "La satira politica e molto diffusa (giornali, TV).",
        ],
        examples=[
            GrammarExample(
                text="Non capisco perche tutti dicano che gli italiani gesticolano... (mentre gesticola vistosamente)",
                translation="I don't understand why everyone says Italians gesture... (while gesturing emphatically)",
                note="autoironia",
            ),
            GrammarExample(
                text="Il milanese e il napoletano si incontrano... (tipica barzelletta regionale)",
                translation="A Milanese and a Neapolitan meet... (typical regional joke)",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Non capire l'umorismo regionale.",
                correct="Conoscere gli stereotipi regionali per capire le barzellette.",
                note="Molto umorismo italiano si basa su rivalita regionali.",
            ),
        ],
        related=["ironia-italiana", "doppio-senso", "italiano-regionale"],
    ),
    GrammarTopic(
        slug="doppio-senso",
        title="Doppi sensi e giochi di parole",
        level="C1",
        category="Avanzato",
        summary="Parole e frasi a doppio senso: capire l'ambiguita linguistica italiana.",
        explanation="Il doppio senso si basa su parole con piu significati:\n- **Omonimia:** stessa forma, significato diverso. *Il riso* (cereale o azione di ridere).\n- **Polisemia:** stesso termine con accezioni diverse. *La chiave* (strumento o concetto).\n- **Ambiguita sintattica:** *Ho visto un uomo con il binocolo.* (chi aveva il binocolo?)\n\nMolto usato nella pubblicita, nei titoli e nell'umorismo.",
        rules=[
            "Riconoscere parole polisemiche e omonimi.",
            "L'ambiguita puo essere voluta (umorismo) o involontaria.",
            "Il contesto di solito chiarisce il significato.",
            "Attenzione ai double entendre involontari in traduzione.",
        ],
        examples=[
            GrammarExample(
                text="Il riso abbonda sulla bocca degli sciocchi. (riso = ridere, ma anche cereale)",
                translation="Laughter/rice abounds in the mouths of fools.",
                note="doppio senso voluto",
            ),
            GrammarExample(
                text="Ho lasciato la chiave sotto lo zerbino. (chiave fisica o soluzione?)",
                translation="I left the key under the doormat.",
                note="polisemia",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Non cogliere il doppio senso in un titolo o barzelletta.",
                correct="Considerare tutti i significati possibili di una parola nel contesto.",
                note="I doppi sensi sono onnipresenti nella comunicazione italiana.",
            ),
        ],
        related=["ironia-italiana", "umorismo", "figure-retoriche"],
    ),
    GrammarTopic(
        slug="figure-retoriche",
        title="Figure retoriche",
        level="C1",
        category="Avanzato",
        summary="Metafora, metonimia, sineddoche, iperbole e altre figure retoriche.",
        explanation="Principali figure retoriche italiane:\n- **Metafora:** sostituzione per analogia. *Quell'uomo e un leone.*\n- **Metonimia:** sostituzione per contiguita. *Bere un bicchiere.* (il contenuto per il contenitore).\n- **Sineddoche:** parte per il tutto. *Tetto* per casa.\n- **Iperbole:** esagerazione. *Te l'ho detto un milione di volte.*\n- **Litote:** negazione del contrario. *Non e male* = e buono.\n- **Eufemismo:** attenuazione. *E passato a miglior vita.*",
        rules=[
            "Metafora: confronto implicito senza come.",
            "Metonimia: relazione di contiguita logica.",
            "Iperbole: esagerazione a effetto.",
            "Litote ed eufemismo attenuano o ammorbidiscono.",
        ],
        examples=[
            GrammarExample(
                text="Ha un cuore d'oro.", translation="He has a heart of gold.", note="metafora"
            ),
            GrammarExample(
                text="Non e affatto stupido. (litote per: e molto intelligente)",
                translation="He's not stupid at all.",
                note="litote",
            ),
            GrammarExample(
                text="Ci vediamo tra due secondi! (iperbole)",
                translation="See you in two seconds!",
                note="iperbole",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Confondere metonimia e metafora.",
                correct="Metafora = somiglianza; metonimia = contiguita.",
                note="Bere un bicchiere = metonimia (contenuto x contenitore).",
            ),
        ],
        related=["figure-stilistiche", "doppio-senso", "descrizione-letteraria"],
    ),
    GrammarTopic(
        slug="persuasione",
        title="Tecniche di persuasione",
        level="C1",
        category="Avanzato",
        summary="Strategie linguistiche per persuadere: retorica classica e moderna.",
        explanation="Tecniche persuasive in italiano:\n- **Ethos:** credibilita dell'oratore. *Da esperto del settore, posso affermare che...*\n- **Pathos:** appello alle emozioni. *Pensate ai vostri figli, al loro futuro.*\n- **Logos:** argomentazione logica. *I dati dimostrano che...*\n- **Domanda retorica:** *Vogliamo davvero continuare cosi?*\n- **Ripetizione (anafora):** *Noi crediamo... Noi vogliamo... Noi possiamo...*",
        rules=[
            "Ethos: stabilire la propria autorita e credibilita.",
            "Pathos: coinvolgere emotivamente l'uditorio.",
            "Logos: usare dati, statistiche, ragionamenti logici.",
            "Domanda retorica e anafora rafforzano il messaggio.",
        ],
        examples=[
            GrammarExample(
                text="Avete mai pensato a cosa significhi per i nostri figli crescere in un mondo senza rispetto per l'ambiente?",
                translation="Have you ever thought about what it means for our children to grow up in a world without respect for the environment?",
                note="pathos + domanda retorica",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Usare solo pathos senza dati.",
                correct="Bilanciare ethos, pathos e logos.",
                note="Un discorso persuasivo efficace combina tutte e tre le componenti.",
            ),
        ],
        related=["struttura-argomentativa", "controargomentazione", "tecniche-oratorie"],
    ),
    GrammarTopic(
        slug="tecniche-oratorie",
        title="Tecniche oratorie",
        level="C1",
        category="Avanzato",
        summary="L'arte del discorso pubblico in italiano: struttura, ritmo e figure.",
        explanation="Tecniche per un discorso efficace:\n- **Exordium:** catturare l'attenzione. Aneddoto, citazione, domanda.\n- **Narratio/Argumentatio:** esporre fatti e argomenti.\n- **Peroratio:** conclusione appassionata.\n- **Pause strategiche:** dare peso alle parole.\n- **Variazione di ritmo:** accelerare per entusiasmo, rallentare per solennita.\n- **Tricolon:** tre elementi in parallelo (*Veni, vidi, vici*).",
        rules=[
            "Apertura forte per catturare l'attenzione.",
            "Struttura chiara in tre parti.",
            "Pause e ritmo per enfatizzare.",
            "Conclusione memorabile.",
        ],
        examples=[
            GrammarExample(
                text="Amici, romani, connazionali... prestatemi orecchio. (Shakespeare in italiano)",
                translation="Friends, Romans, countrymen... lend me your ears.",
                note="tricolon + invocazione",
            ),
            GrammarExample(
                text="Una domanda semplice: siete soddisfatti di come vanno le cose? (pausa) Io no. E credo nemmeno voi.",
                translation="One simple question: are you satisfied with how things are going? (pause) I'm not. And I think you aren't either.",
                note="domanda retorica + pausa",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Leggere un discorso senza pause ne enfasi.",
                correct="Provare il discorso ad alta voce, segnare le pause.",
                note="L'oratoria e performance, non solo testo.",
            ),
        ],
        related=["persuasione", "struttura-argomentativa", "registro-formale"],
    ),
    GrammarTopic(
        slug="italiano-regionale",
        title="Italiano regionale",
        level="C1",
        category="Avanzato",
        summary="Le varieta regionali dell'italiano: differenze lessicali e grammaticali.",
        explanation="L'italiano regionale varia in:\n- **Lessico:** *anguria* (Nord) vs *cocomero* (Centro) vs *melone d'acqua* (Sud).\n- **Fonetica:** apertura vocali, pronuncia di s e z.\n- **Sintassi:** uso di passato prossimo (Nord) vs passato remoto (Sud).\n- **Geosinonimi:** *papà* vs *babbo*, *ora* vs *adesso*.\n\nLe differenze sono accettate e contribuiscono alla ricchezza dell'italiano.",
        rules=[
            "L'italiano standard e influenzato dalla regione di provenienza.",
            "Geosinonimi: termini diversi per lo stesso oggetto.",
            "Alcune costruzioni regionali sono considerate errori in contesti formali.",
            "La scuola insegna l'italiano standard, ma le varieta regionali persistono.",
        ],
        examples=[
            GrammarExample(
                text="A Milano prendo un caffe, a Napoli prendo un caffe. (pronuncia e preparazione diversa)",
                translation="In Milan I have a coffee, in Naples I have a coffee.",
                note="differenza culturale + linguistica",
            ),
            GrammarExample(
                text="Al Nord: 'Ho visto Marco ieri.' Al Sud: 'Vidi Marco ieri.'",
                translation="North: 'I saw Marco yesterday.' South: 'I saw Marco yesterday.'",
                note="passato prossimo vs remoto",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Pensare che l'italiano sia uniforme in tutta Italia.",
                correct="Riconoscere e apprezzare le varieta regionali.",
                note="L'Italia ha una straordinaria diversita linguistica interna.",
            ),
        ],
        related=["dialetti", "italiano-standard", "modi-di-dire"],
    ),
    GrammarTopic(
        slug="dialetti",
        title="Dialetti italiani",
        level="C1",
        category="Avanzato",
        summary="Conoscere i principali dialetti italiani e il loro rapporto con l'italiano standard.",
        explanation="I dialetti italiani non sono varianti dell'italiano ma lingue sorelle derivate dal latino.\n\nGruppi principali:\n- **Gallo-italici:** piemontese, lombardo, ligure, emiliano-romagnolo.\n- **Veneti:** veneziano, veronese.\n- **Toscani:** fiorentino (base dell'italiano standard).\n- **Mediani:** romanesco, umbro, marchigiano.\n- **Meridionali:** napoletano, pugliese, calabrese, siciliano.\n- **Sardo:** considerato lingua a se.\n\nMolti italiani sono bilingui (italiano + dialetto).",
        rules=[
            "I dialetti sono lingue autonome, non varianti degradate.",
            "L'italiano standard deriva dal fiorentino del Trecento.",
            "In contesti formali si usa l'italiano; in famiglia spesso il dialetto.",
            "Il dialetto e patrimonio culturale protetto.",
        ],
        examples=[
            GrammarExample(
                text="In veneto: 'Come xeo che la va?' (Come va?)",
                translation="In Veneto: 'How's it going?'",
            ),
            GrammarExample(
                text="A Napoli: 'Sto buono, guaglio!' (Stai bene, ragazzo!)",
                translation="In Naples: 'I'm good, boy!'",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Confondere dialetto con italiano sgrammaticato.",
                correct="Il dialetto ha regole grammaticali proprie e una storia antica.",
                note="I dialetti italiani sono lingue romanze con pari dignita.",
            ),
        ],
        related=["italiano-regionale", "italiano-standard", "evoluzione-linguistica"],
    ),
    GrammarTopic(
        slug="italiano-standard",
        title="Italiano standard e neostandard",
        level="C1",
        category="Avanzato",
        summary="L'evoluzione dell'italiano standard verso un neostandard piu flessibile.",
        explanation="L'italiano standard tradizionale e quello normativo (grammatiche, Accademia della Crusca).\n\nL'italiano **neostandard** (o dell'uso medio) accetta:\n- **gli** per a loro (invece di loro).\n- **lui/lei** soggetto (invece di egli/ella).\n- **che** polivalente (temporale, causale).\n- **ci** con avere: *c'ho fame* (colloquiale).\n- **dislocazioni:** *Il caffe, lo prendo dopo.*\n\nQueste forme, un tempo considerate errori, sono ora accettate nell'uso comune.",
        rules=[
            "L'italiano standard e quello delle grammatiche.",
            "Il neostandard accoglie fenomeni del parlato.",
            "Alcune forme neostandard sono ancora evitate nello scritto formale.",
            "La lingua evolve: oggi e normale cio che ieri era errore.",
        ],
        examples=[
            GrammarExample(
                text="Standard: Ho telefonato loro. / Neostandard: Gli ho telefonato.",
                translation="Standard: I called them. / Neo-standard: I called them.",
            ),
            GrammarExample(
                text="Standard: Il libro che ho comprato. / Neostandard: Il libro che l'ho comprato.",
                translation="Standard: The book I bought. / Neo-standard: The book that I bought it.",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Considerare sempre errore le forme neostandard.",
                correct="Distinguere tra registri: accettabile nel parlato, evitare nello scritto formale.",
                note="Il confine tra errore e innovazione linguistica e fluido.",
            ),
        ],
        related=["italiano-regionale", "registro-formale", "evoluzione-linguistica"],
    ),
    GrammarTopic(
        slug="sintesi-testuale",
        title="Sintesi testuale",
        level="C1",
        category="Avanzato",
        summary="Tecniche per riassumere e sintetizzare testi complessi in italiano.",
        explanation="Per una buona sintesi:\n1. **Lettura analitica:** individuare tesi, argomenti, conclusione.\n2. **Gerarchizzare:** distinguere essenziale da accessorio.\n3. **Parafrasare:** riformulare con parole proprie.\n4. **Eliminare:** esempi ridondanti, digressioni, ripetizioni.\n5. **Unificare:** fondere concetti simili.\n6. **Mantenere il registro e lo stile originale.**",
        rules=[
            "Identificare la struttura del testo originale.",
            "Isolare le idee principali.",
            "Riformulare senza tradire il significato.",
            "Mantenere coesione e coerenza.",
        ],
        examples=[
            GrammarExample(
                text="Riassunto di 300 parole: il testo originale analizza le cause del declino economico italiano identificando tre fattori: demografia, produttivita e debito pubblico.",
                translation="300-word summary: the original text analyzes the causes of Italy's economic decline identifying three factors: demographics, productivity, and public debt.",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Copiare frasi intere dall'originale.",
                correct="Riformulare con parole proprie, condensando.",
                note="La sintesi non e un collage di citazioni.",
            ),
        ],
        related=["coesione-testuale", "riformulazione", "critica-costruttiva"],
    ),
    GrammarTopic(
        slug="critica-costruttiva",
        title="Critica costruttiva",
        level="C1",
        category="Avanzato",
        summary="Esprimere critiche in modo costruttivo e diplomatico in italiano.",
        explanation="Per esprimere critiche costruttive:\n- **Ammorbidire:** *Forse si potrebbe...*\n- **Condizionale:** *Sarebbe meglio se...*\n- **Domanda invece di affermazione:** *Hai considerato la possibilita di...?*\n- **Sandwich feedback:** positivo - critica - positivo.\n- **Evitare assoluti:** mai dire *sempre* o *mai*.",
        rules=[
            "Usare il condizionale per attenuare.",
            "Evitare toni accusatori.",
            "Concentrarsi sul problema, non sulla persona.",
            "Proporre alternative, non solo criticare.",
        ],
        examples=[
            GrammarExample(
                text="Il tuo lavoro e molto interessante. Forse si potrebbe approfondire la parte sui dati. Nel complesso, ottimo lavoro!",
                translation="Your work is very interesting. Perhaps the data section could be explored further. Overall, great job!",
                note="sandwich feedback",
            ),
            GrammarExample(
                text="Hai considerato di strutturare diversamente questa sezione? Renderebbe il tutto piu chiaro.",
                translation="Have you considered structuring this section differently? It would make it clearer.",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Questo lavoro e sbagliato. Devi rifarlo.",
                correct="Questo lavoro ha alcuni punti da rivedere. Vediamoli insieme per migliorarlo.",
                note="La critica costruttiva offre soluzioni, non solo giudizi.",
            ),
        ],
        related=["riformulazione", "condizionale-cortesia", "registro-formale"],
    ),
    GrammarTopic(
        slug="riformulazione",
        title="Riformulazione e parafrasi",
        level="C1",
        category="Avanzato",
        summary="Tecniche per riformulare concetti in modo chiaro e preciso.",
        explanation="Riformulare significa esprimere lo stesso concetto con parole diverse.\n\nTecniche:\n- **Sinonimi:** *l'edificio → la costruzione, lo stabile.*\n- **Cambio di categoria:** *Analizzare → fare un'analisi.*\n- **Da attivo a passivo:** *Il governo ha approvato → E stata approvata dal governo.*\n- **Da specifico a generale:** *Il gatto → l'animale domestico.*\n- **Definizione:** *Un cardiologo → un medico specializzato nel cuore.*",
        rules=[
            "Mantenere il significato originale.",
            "Variare lessico e struttura sintattica.",
            "Adeguare il registro al nuovo contesto.",
            "Utile per evitare ripetizioni nella scrittura.",
        ],
        examples=[
            GrammarExample(
                text="Originale: La crisi economica ha colpito duramente le famiglie. Riformulato: I nuclei familiari hanno subito pesantemente gli effetti della recessione.",
                translation="Original: The economic crisis hit families hard. Reformulated: Households suffered heavily from the effects of the recession.",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Cambiare il significato durante la riformulazione.",
                correct="Verificare che il messaggio originale sia preservato.",
                note="La riformulazione non deve alterare il contenuto.",
            ),
        ],
        related=["sintesi-testuale", "precisione-lessicale", "sfumature"],
    ),
    GrammarTopic(
        slug="passivo-accademico",
        title="Il passivo nel registro accademico e formale",
        level="C1",
        category="Avanzato",
        summary="Uso della forma passiva per conferire oggettività e impersonalità alla scrittura accademica.",
        explanation="Nel registro accademico e formale, la **forma passiva** è ampiamente utilizzata per conferire oggettività e impersonalità al discorso.\n\n- **Si passivante**: *Si analizzeranno i dati raccolti.* → equivalente a *I dati raccolti saranno analizzati.*\n- **Passivo con essere/venire**: *Il fenomeno è stato osservato / venne studiato.*\n- **Andare + participio** (obbligo): *I risultati vanno interpretati con cautela.*\n\n**Strategie di impersonalità accademica:**\n- Uso del *si* impersonale: *Si ritiene che...*\n- Costruzioni con *è/sembra/risulta + aggettivo + che*: *È evidente che..., Risulta chiaro che...*\n- Forme nominali: *L'analisi dei dati mostra...* piuttosto che *Abbiamo analizzato i dati...*\n\nIl passivo accademico permette di mettere in primo piano il contenuto della ricerca piuttosto che il ricercatore.",
        rules=[
            "Il passivo sposta il focus dall'agente all'azione o al risultato.",
            "Alternare forme: si passivante, essere/venire + participio, andare + participio.",
            "Costruzioni impersonali con si: si osserva, si nota, si evince.",
            "Evitare la prima persona (io/noi) nella scrittura accademica formale.",
            'Usare forme nominali per oggettività: "l\'analisi rivela" invece di "abbiamo analizzato".',
        ],
        examples=[
            GrammarExample(
                text="I dati sono stati raccolti mediante un questionario anonimo.",
                translation="Data were collected through an anonymous questionnaire.",
                note="passivo con essere",
            ),
            GrammarExample(
                text="Si è osservato un aumento significativo dei casi.",
                translation="A significant increase in cases was observed.",
                note="si passivante",
            ),
            GrammarExample(
                text="I risultati vanno interpretati alla luce del contesto storico.",
                translation="The results must be interpreted in light of the historical context.",
                note="andare + participio (obbligo)",
            ),
            GrammarExample(
                text="È emerso che la maggioranza degli intervistati preferisce...",
                translation="It emerged that the majority of respondents prefer...",
                note="costruzione impersonale",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Abbiamo scoperto che il fenomeno è frequente.",
                correct="È emerso che il fenomeno risulta frequente.",
                note="Evitare la prima persona nel registro accademico.",
            ),
            GrammarMistake(
                wrong="Si è analizzato i dati.",
                correct="Si sono analizzati i dati.",
                note="Il si passivante richiede accordo col soggetto.",
            ),
        ],
        related=["nominalizzazione", "si-passivante", "impersonalita"],
    ),
]
