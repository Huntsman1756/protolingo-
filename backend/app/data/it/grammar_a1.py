"""Italian grammar topics — A1."""

from app.data._types import GrammarExample, GrammarMistake, GrammarTopic

A1_GRAMMAR_TOPICS: list[GrammarTopic] = [
    GrammarTopic(
        slug="essere",
        title="Il verbo essere",
        level="A1",
        category="Tempi verbali",
        summary="Il verbo più fondamentale della lingua italiana.",
        explanation="Il verbo **essere** è usato per descrivere persone, luoghi, cose e stati.\n\nSi usa per:\n- Identità: *Io sono Marco.*\n- Nazionalità: *Lei è italiana.*\n- Professioni: *Lui è medico.*\n- Descrizioni: *La casa è grande.*\n- Stati d'animo: *Noi siamo felici.*",
        structure="io sono · tu sei · lui/lei è · noi siamo · voi siete · loro sono",
        rules=[
            "Essere è irregolare e va memorizzato in tutte le sue forme.",
            "Si usa senza articolo davanti a professioni non modificate.",
            "Essere funge anche da ausiliare per i tempi composti di alcuni verbi.",
            "Nelle domande, l'intonazione cambia ma l'ordine delle parole rimane lo stesso.",
        ],
        examples=[
            GrammarExample(text="Io sono uno studente.", translation="I am a student."),
            GrammarExample(text="Lei è molto simpatica.", translation="She is very nice."),
            GrammarExample(text="Noi siamo a Roma.", translation="We are in Rome."),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Io sono medico.",
                correct="Sono medico.",
                note="Il pronome soggetto è spesso omesso in italiano.",
            ),
            GrammarMistake(
                wrong="Lui è un medico.",
                correct="Lui è medico.",
                note="Davanti a professioni si omette l'articolo.",
            ),
        ],
        related=["avere", "essere-nazionalita", "pronomi-soggetto"],
    ),
    GrammarTopic(
        slug="avere",
        title="Il verbo avere",
        level="A1",
        category="Tempi verbali",
        summary="Esprime possesso e funge da ausiliare per i tempi composti.",
        explanation="Il verbo **avere** indica possesso, relazioni e sensazioni fisiche.\n\nSi usa per:\n- Possesso: *Ho una macchina.*\n- Età: *Quanti anni hai? — Ho vent'anni.*\n- Sensazioni: *Ho fame / sete / caldo / freddo / sonno.*\n- Ausiliare per il passato prossimo: *Ho mangiato, ho dormito.*",
        structure="io ho · tu hai · lui/lei ha · noi abbiamo · voi avete · loro hanno",
        rules=[
            "Avere è irregolare e va memorizzato.",
            "L'età in italiano si esprime con avere, non con essere.",
            "Le sensazioni fisiche usano avere + nome, non aggettivi.",
            "La H iniziale è muta ma obbligatoria nella scrittura: distinguere 'ho' da 'o'.",
        ],
        examples=[
            GrammarExample(text="Ho due fratelli.", translation="I have two brothers."),
            GrammarExample(text="Quanti anni hai?", translation="How old are you?"),
            GrammarExample(
                text="Ho fame. Andiamo a mangiare?", translation="I'm hungry. Shall we go eat?"
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Sono 20 anni.",
                correct="Ho 20 anni.",
                note="L'età si esprime con avere, non essere.",
            ),
            GrammarMistake(
                wrong="O mangiato la pizza.",
                correct="Ho mangiato la pizza.",
                note="Non dimenticare la H: 'ho' è verbo, 'o' è congiunzione.",
            ),
        ],
        related=["essere", "passato-prossimo-avere", "passato-prossimo-essere"],
    ),
    GrammarTopic(
        slug="pronomi-soggetto",
        title="I pronomi soggetto",
        level="A1",
        category="Pronomi",
        summary="Io, tu, lui, lei, noi, voi, loro — ma spesso si possono omettere.",
        explanation="I pronomi soggetto in italiano sono:\n- **io**, **tu**, **lui**, **lei**, **noi**, **voi**, **loro**.\n\nA differenza dell'inglese, il pronome soggetto è spesso omesso perché la desinenza del verbo indica già la persona. Si usa solo per enfasi o contrasto.\n\n**Lei** (con la L maiuscola) è la forma di cortesia, usata per rivolgersi formalmente a chiunque.",
        structure="io · tu · lui/lei/Lei · noi · voi · loro",
        rules=[
            "Il pronome soggetto si omette di norma: *Parlo italiano*.",
            "Si usa per contrasto: *Io vado al cinema, tu resti a casa.*",
            "Si usa per enfasi: *Io non ho detto niente!*",
            "Lei formale richiede il verbo alla terza persona singolare.",
        ],
        examples=[
            GrammarExample(
                text="Parlo italiano.", translation="I speak Italian.", note="pronome omesso"
            ),
            GrammarExample(
                text="Io preferisco il caffè, lei preferisce il tè.",
                translation="I prefer coffee, she prefers tea.",
                note="contrasto",
            ),
            GrammarExample(
                text="Lei come si chiama?",
                translation="What is your name? (formal)",
                note="Lei di cortesia",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Io parlo italiano ogni volta.",
                correct="Parlo italiano.",
                note="L'uso eccessivo dei pronomi suona innaturale in italiano.",
            ),
            GrammarMistake(
                wrong="Tu come ti chiami? (a un professore)",
                correct="Lei come si chiama?",
                note="Con estranei o superiori si usa il Lei di cortesia.",
            ),
        ],
        related=["essere", "avere", "pronomi-diretti", "pronomi-indiretti"],
    ),
    GrammarTopic(
        slug="articoli-determinativi",
        title="Articoli determinativi",
        level="A1",
        category="Articoli",
        summary="Il, lo, la, i, gli, le — quando indicare qualcosa di specifico.",
        explanation="Gli articoli determinativi variano per genere, numero e lettera iniziale:\n\n**Maschile singolare:**\n- **il**: davanti a consonante semplice: *il libro*\n- **lo**: davanti a s+cons, z, gn, ps, x, y: *lo studente*\n- **l'**: davanti a vocale: *l'amico*\n\n**Maschile plurale:**\n- **i**: *i libri*\n- **gli**: *gli studenti, gli amici*\n\n**Femminile:**\n- **la** / **l'** (sing.): *la casa, l'amica*\n- **le** (plur.): *le case, le amiche*",
        structure="il / lo / l' / la · i / gli / le",
        rules=[
            "Il / i per maschile davanti a consonante semplice.",
            "Lo / gli per maschile davanti a s+cons, z, gn, ps, x, y.",
            "L' per maschile e femminile davanti a vocale.",
            "La / le per femminile.",
        ],
        examples=[
            GrammarExample(text="Il libro è sul tavolo.", translation="The book is on the table."),
            GrammarExample(text="Lo studente è italiano.", translation="The student is Italian."),
            GrammarExample(
                text="Gli amici arrivano domani.", translation="The friends arrive tomorrow."
            ),
            GrammarExample(
                text="L'amica di Maria è francese.", translation="Maria's friend is French."
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Il studente",
                correct="Lo studente",
                note="Davanti a s+consonante si usa lo, non il.",
            ),
            GrammarMistake(
                wrong="I amici",
                correct="Gli amici",
                note="Davanti a vocale il plurale maschile è gli.",
            ),
        ],
        related=["articoli-indeterminativi", "genere-nomi", "preposizioni-luogo"],
    ),
    GrammarTopic(
        slug="essere-nazionalita",
        title="Essere + nazionalità",
        level="A1",
        category="Aggettivi e avverbi",
        summary="Come esprimere la propria provenienza e nazionalità.",
        explanation="Per esprimere la nazionalità si usa il verbo **essere** seguito dall'aggettivo di nazionalità, che concorda in genere e numero con il soggetto.\n\nIn italiano **non** si usa l'articolo indeterminativo prima della nazionalità.\n\nAggettivi comuni: *italiano/a, spagnolo/a, francese, inglese, tedesco/a, americano/a, cinese, giapponese.*",
        rules=[
            "Essere + aggettivo di nazionalità.",
            "L'aggettivo concorda con il soggetto in genere e numero.",
            "Non usare l'articolo: *Sono italiano*, non *Sono un italiano*.",
            "Aggettivi in -ese sono invariabili al femminile: francese, inglese.",
        ],
        examples=[
            GrammarExample(text="Sono spagnolo.", translation="I am Spanish."),
            GrammarExample(text="Lei è francese.", translation="She is French."),
            GrammarExample(text="Loro sono tedeschi.", translation="They are German."),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Sono un italiano.",
                correct="Sono italiano.",
                note="Non si usa l'articolo con le nazionalità.",
            ),
            GrammarMistake(
                wrong="Lei è francesa.",
                correct="Lei è francese.",
                note="Gli aggettivi in -ese sono invariabili: francese, inglese, cinese.",
            ),
        ],
        related=["essere", "aggettivi-descrittivi", "articoli-indeterminativi"],
    ),
    GrammarTopic(
        slug="genere-nomi",
        title="Il genere dei nomi",
        level="A1",
        category="Sostantivi",
        summary="Maschile e femminile: le regole base per capire il genere dei sostantivi.",
        explanation="In italiano tutti i sostantivi hanno un genere: **maschile** o **femminile**.\n\nRegole generali:\n- **-o** → generalmente maschili: *il libro, il tavolo.*\n- **-a** → generalmente femminili: *la casa, la scuola.*\n- **-e** → maschili o femminili: *il fiore* (m), *la notte* (f).\n- **-tà, -tù, -zione, -sione** → femminili: *la città, la lezione.*\n- **-ore** → maschili: *il dottore, il colore.*\n\nParole di origine greca in **-ma** e **-ta** sono maschili: *il problema, il pianeta.*",
        rules=[
            "Nomi in -o → generalmente maschili (eccezioni: la mano, la radio).",
            "Nomi in -a → generalmente femminili (eccezioni: il problema, il tema, il poeta).",
            "Nomi in -e → possono essere maschili o femminili.",
            "Parole greche in -ma e -ta sono maschili: il problema, il pianeta.",
        ],
        examples=[
            GrammarExample(
                text="Il libro è interessante.",
                translation="The book is interesting.",
                note="-o → maschile",
            ),
            GrammarExample(
                text="La pizza è buona.", translation="The pizza is good.", note="-a → femminile"
            ),
            GrammarExample(
                text="Il problema è difficile.",
                translation="The problem is difficult.",
                note="-ma → maschile (eccezione)",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="La problema",
                correct="Il problema",
                note="I nomi di origine greca in -ma sono maschili.",
            ),
            GrammarMistake(
                wrong="Il mano",
                correct="La mano",
                note="Mano è femminile nonostante la desinenza in -o.",
            ),
        ],
        related=["articoli-determinativi", "articoli-indeterminativi", "aggettivi-descrittivi"],
    ),
    GrammarTopic(
        slug="articoli-indeterminativi",
        title="Articoli indeterminativi",
        level="A1",
        category="Articoli",
        summary="Un, uno, una, un' — quando parlare di qualcosa di non specifico.",
        explanation="Gli articoli indeterminativi si usano per indicare una cosa o persona non specifica.\n\n**Maschile:**\n- **un**: davanti a consonante e vocale: *un libro, un amico.*\n- **uno**: davanti a s+consonante, z, gn, ps, x, y: *uno studente, uno zaino.*\n\n**Femminile:**\n- **una**: davanti a consonante: *una casa.*\n- **un'**: davanti a vocale: *un'amica.*",
        structure="un / uno · una / un'",
        rules=[
            "Un per maschile davanti a consonante semplice e vocale.",
            "Uno per maschile davanti a s+cons, z, gn, ps, x, y.",
            "Una per femminile davanti a consonante.",
            "Un' con apostrofo per femminile davanti a vocale.",
        ],
        examples=[
            GrammarExample(text="Ho un cane.", translation="I have a dog."),
            GrammarExample(text="È uno studente bravo.", translation="He is a good student."),
            GrammarExample(
                text="Cerco un'amica per uscire.",
                translation="I'm looking for a friend to go out with.",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Ho uno libro.",
                correct="Ho un libro.",
                note="Uno solo davanti a s+cons, z, gn, ps, x, y.",
            ),
            GrammarMistake(
                wrong="Cerco una amica.",
                correct="Cerco un'amica.",
                note="Davanti a vocale femminile si usa un'.",
            ),
        ],
        related=["articoli-determinativi", "genere-nomi"],
    ),
    GrammarTopic(
        slug="aggettivi-possessivi",
        title="Aggettivi possessivi",
        level="A1",
        category="Aggettivi e avverbi",
        summary="Mio, tuo, suo, nostro, vostro, loro — esprimere appartenenza.",
        explanation="Gli aggettivi possessivi indicano a chi appartiene qualcosa. Concordano in genere e numero con il nome, non con il possessore.\n\n- **mio, tuo, suo, nostro, vostro**: quattro forme ciascuno.\n- **loro**: invariabile.\n\nNormalmente preceduti dall'articolo: *la mia casa*. L'articolo si omette con i nomi di parentela al singolare: *mio padre, tua madre*.",
        rules=[
            "Il possessivo concorda con la cosa posseduta, non con il possessore.",
            "Di solito è preceduto dall'articolo: la mia macchina.",
            "Con parentela singolare non modificata si omette l'articolo: mio padre.",
            "Loro è invariabile e vuole sempre l'articolo: la loro casa.",
        ],
        examples=[
            GrammarExample(text="La mia casa è grande.", translation="My house is big."),
            GrammarExample(
                text="Mio padre è medico.",
                translation="My father is a doctor.",
                note="parentela → no articolo",
            ),
            GrammarExample(
                text="Il loro cane è simpatico.",
                translation="Their dog is nice.",
                note="loro richiede articolo",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Il mio padre è alto.",
                correct="Mio padre è alto.",
                note="Con parentela singolare non si usa l'articolo.",
            ),
            GrammarMistake(
                wrong="La sua sorella si chiama Anna.",
                correct="Sua sorella si chiama Anna.",
                note="Anche qui si omette l'articolo.",
            ),
        ],
        related=["essere", "articoli-determinativi", "genere-nomi"],
    ),
    GrammarTopic(
        slug="aggettivi-descrittivi",
        title="Aggettivi descrittivi",
        level="A1",
        category="Aggettivi e avverbi",
        summary="Descrivere persone, luoghi e cose con gli aggettivi qualificativi.",
        explanation="Gli aggettivi descrittivi esprimono qualità e concordano in **genere** e **numero** con il nome.\n\n**Posizione:**\n- Di solito dopo il nome: *una casa bella.*\n- Alcuni comuni prima: *un bel libro, una buona idea.*\n\n**Concordanza:**\n- -o/-a/-i/-e: *bello, bella, belli, belle.*\n- -e/-i: *grande, grandi* (uguale per maschile e femminile).",
        rules=[
            "L'aggettivo concorda in genere e numero con il nome.",
            "Di norma segue il nome.",
            "Bello, buono, grande, piccolo, nuovo, vecchio spesso precedono.",
            "Aggettivi in -e: stessa forma per maschile e femminile singolare.",
        ],
        examples=[
            GrammarExample(
                text="Una casa bella e luminosa.", translation="A beautiful and bright house."
            ),
            GrammarExample(
                text="Un buon ristorante.",
                translation="A good restaurant.",
                note="buono prima del nome",
            ),
            GrammarExample(
                text="Le macchine rosse sono veloci.", translation="The red cars are fast."
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Una casa bello.",
                correct="Una casa bella.",
                note="L'aggettivo deve concordare in genere e numero.",
            ),
            GrammarMistake(
                wrong="Il cane simpatica.",
                correct="Il cane simpatico.",
                note="Cane è maschile → aggettivo maschile.",
            ),
        ],
        related=["genere-nomi", "comparativi", "superlativi"],
    ),
    GrammarTopic(
        slug="ce-ci-sono",
        title="C'è / Ci sono",
        level="A1",
        category="Tempi verbali",
        summary="Esprimere esistenza e presenza con c'è e ci sono.",
        explanation="**C'è** e **ci sono** = *there is / there are*.\n\n- **C'è** + singolare: *C'è un gatto in giardino.*\n- **Ci sono** + plurale: *Ci sono tre libri sul tavolo.*\n\nNegativo: **non c'è / non ci sono**: *Non c'è tempo, non ci sono problemi.*",
        structure="c'è + singolare · ci sono + plurale",
        rules=[
            "C'è = ci + è (singolare).",
            "Ci sono = ci + sono (plurale).",
            "Differenza tra c'è (esistenza) ed è (identità).",
            "Domande: *C'è un bagno qui?*",
        ],
        examples=[
            GrammarExample(
                text="C'è un gatto sul divano.", translation="There is a cat on the sofa."
            ),
            GrammarExample(
                text="Ci sono molte persone in piazza.",
                translation="There are many people in the square.",
            ),
            GrammarExample(text="Non c'è problema.", translation="There is no problem."),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="C'è tre libri.",
                correct="Ci sono tre libri.",
                note="Con i plurali si usa ci sono, non c'è.",
            ),
            GrammarMistake(
                wrong="È un gatto.",
                correct="C'è un gatto.",
                note="È = identità; c'è = esistenza/presenza.",
            ),
        ],
        related=["essere", "preposizioni-luogo", "articoli-indeterminativi"],
    ),
    GrammarTopic(
        slug="presente-are",
        title="Presente indicativo: verbi in -are",
        level="A1",
        category="Tempi verbali",
        summary="Coniugare i verbi regolari che finiscono in -are.",
        explanation="I verbi in **-are** sono la prima coniugazione, la più numerosa.\n\n**parlare**: io parlo, tu parli, lui/lei parla, noi parliamo, voi parlate, loro parlano.\n\n**Ortografia:**\n- -care/-gare: aggiungono H davanti a -i, -iamo: *cerco, cerchi, cerchiamo*.\n- -ciare/-giare: perdono la I: *comincio, cominciamo; mangio, mangiamo*.\n\nVerbi comuni: *mangiare, studiare, lavorare, abitare, comprare, ascoltare, guardare.*",
        structure="io -o · tu -i · lui/lei -a · noi -iamo · voi -ate · loro -ano",
        rules=[
            "Togliere -are e aggiungere -o, -i, -a, -iamo, -ate, -ano.",
            "Verbi in -care/-gare: aggiungere H prima di -i e -iamo.",
            "Verbi in -ciare/-giare: la I cade prima di -i e -iamo.",
            "Il presente italiano traduce simple present, present continuous e present perfect.",
        ],
        examples=[
            GrammarExample(text="Io parlo italiano.", translation="I speak Italian."),
            GrammarExample(text="Tu mangi la pizza?", translation="Do you eat pizza?"),
            GrammarExample(text="Noi abitiamo a Milano.", translation="We live in Milan."),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Io parla italiano.",
                correct="Io parlo italiano.",
                note="La prima persona finisce in -o, non in -a.",
            ),
            GrammarMistake(
                wrong="Noi cerciamo il libro.",
                correct="Noi cerchiamo il libro.",
                note="Con cercare si aggiunge H prima di -iamo.",
            ),
        ],
        related=["presente-ere", "presente-ire", "pronomi-soggetto"],
    ),
    GrammarTopic(
        slug="presente-ere",
        title="Presente indicativo: verbi in -ere",
        level="A1",
        category="Tempi verbali",
        summary="Coniugare i verbi regolari che finiscono in -ere.",
        explanation="I verbi in **-ere** sono la seconda coniugazione.\n\n**leggere**: io leggo, tu leggi, lui/lei legge, noi leggiamo, voi leggete, loro leggono.\n\nVerbi comuni: *scrivere, vivere, credere, vedere, chiedere, prendere, rispondere, correre, vendere.*",
        structure="io -o · tu -i · lui/lei -e · noi -iamo · voi -ete · loro -ono",
        rules=[
            "Togliere -ere e aggiungere -o, -i, -e, -iamo, -ete, -ono.",
            "Molti verbi in -ere hanno participio passato irregolare.",
            "La seconda persona plurale (voi) finisce sempre in -ete.",
            "Non confondere la 3ª singolare in -e con l'imperativo.",
        ],
        examples=[
            GrammarExample(text="Io leggo un libro.", translation="I read a book."),
            GrammarExample(text="Lui scrive una lettera.", translation="He writes a letter."),
            GrammarExample(text="Voi correte ogni mattina.", translation="You run every morning."),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Io legge un libro.",
                correct="Io leggo un libro.",
                note="La prima persona di leggere è leggo, non legge.",
            ),
            GrammarMistake(
                wrong="Voi leggi.",
                correct="Voi leggete.",
                note="La seconda persona plurale di -ere è -ete.",
            ),
        ],
        related=["presente-are", "presente-ire", "passato-prossimo-avere"],
    ),
    GrammarTopic(
        slug="presente-ire",
        title="Presente indicativo: verbi in -ire",
        level="A1",
        category="Tempi verbali",
        summary="Coniugare i verbi regolari in -ire, compresi quelli che prendono -isc-.",
        explanation="I verbi in **-ire** si dividono in due gruppi:\n\n**Senza -isc-:** dormire → dormo, dormi, dorme, dormiamo, dormite, dormono.\nAnche: *aprire, partire, sentire, servire, seguire, soffrire.*\n\n**Con -isc-:** finire → finisco, finisci, finisce, finiamo, finite, finiscono.\nAnche: *capire, preferire, pulire, spedire, unire, costruire.*\n\nL'infisso -isc- appare solo nelle tre persone singolari e nella 3ª plurale.",
        rules=[
            "Molti verbi in -ire prendono -isc-: capire → capisco, capisci, capisce, capiscono.",
            "Noi e voi non prendono mai -isc-: capiamo, capite.",
            "Senza -isc-: dormire, aprire, partire, sentire.",
            "Alcuni verbi ammettono entrambi i modelli: applaudo/applaudisco.",
        ],
        examples=[
            GrammarExample(text="Io dormo otto ore.", translation="I sleep eight hours."),
            GrammarExample(text="Lui capisce tutto.", translation="He understands everything."),
            GrammarExample(text="Noi partiamo domani.", translation="We leave tomorrow."),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Io capo tutto.",
                correct="Io capisco tutto.",
                note="Capire prende -isc-: capisco, non capo.",
            ),
            GrammarMistake(
                wrong="Loro dormiscono.",
                correct="Loro dormono.",
                note="Dormire non prende -isc-. La 3ª plurale è dormono.",
            ),
        ],
        related=["presente-are", "presente-ere", "verbi-riflessivi"],
    ),
    GrammarTopic(
        slug="verbi-riflessivi",
        title="Verbi riflessivi",
        level="A1",
        category="Tempi verbali",
        summary="Azioni che il soggetto compie su sé stesso.",
        explanation="I verbi riflessivi indicano un'azione su sé stessi. Pronomi: **mi, ti, si, ci, vi, si**.\n\n**lavarsi**: mi lavo, ti lavi, si lava, ci laviamo, vi lavate, si lavano.\n\nComuni: *alzarsi, svegliarsi, vestirsi, lavarsi, chiamarsi, divertirsi, sedersi, sentirsi, preoccuparsi.*",
        structure="mi · ti · si · ci · vi · si + verbo",
        rules=[
            "Il pronome riflessivo precede il verbo: mi, ti, si, ci, vi, si.",
            "Alcuni verbi sono solo riflessivi: pentirsi, accorgersi.",
            "Con i modali il pronome può attaccarsi all'infinito: Devo alzarmi / Mi devo alzare.",
            "Al passato prossimo i riflessivi usano sempre essere.",
        ],
        examples=[
            GrammarExample(text="Mi chiamo Marco.", translation="My name is Marco."),
            GrammarExample(text="A che ora ti alzi?", translation="What time do you get up?"),
            GrammarExample(text="Ci divertiamo molto.", translation="We have a lot of fun."),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Io lavo le mani.",
                correct="Mi lavo le mani.",
                note="Lavarsi le mani richiede il pronome riflessivo in italiano.",
            ),
            GrammarMistake(
                wrong="Chiamo Marco.",
                correct="Mi chiamo Marco.",
                note="Chiamare senza pronome = telefonare. Per presentarsi serve chiamarsi.",
            ),
        ],
        related=["presente-are", "presente-ire", "verbi-modali"],
    ),
    GrammarTopic(
        slug="piacere",
        title="Il verbo piacere",
        level="A1",
        category="Tempi verbali",
        summary="Esprimere gusti e preferenze con la costruzione particolare di piacere.",
        explanation="Il verbo **piacere** funziona al contrario dell'inglese: la cosa che piace è il soggetto.\n\n- **Mi piace** il gelato. (il gelato piace a me)\n- **Ti piacciono** i cani? (i cani piacciono a te)\n\n**piace** = singolare / infinito; **piacciono** = plurale.\n\nCon gli infiniti si usa sempre piace: *Mi piace cantare e ballare.*",
        rules=[
            "Piacere concorda con la cosa che piace (soggetto logico).",
            "La persona usa il pronome indiretto (mi, ti, gli, le, ci, vi, gli).",
            "Con infiniti si usa sempre piace al singolare.",
            "Negativo: non mi piace / non mi piacciono.",
        ],
        examples=[
            GrammarExample(text="Mi piace la pizza.", translation="I like pizza."),
            GrammarExample(text="Ti piacciono i gatti?", translation="Do you like cats?"),
            GrammarExample(text="Non ci piace aspettare.", translation="We don't like waiting."),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Io piace la pizza.",
                correct="Mi piace la pizza.",
                note="Non si dice 'io piace'. La costruzione è 'a me piace' → mi piace.",
            ),
            GrammarMistake(
                wrong="Mi piace i gatti.",
                correct="Mi piacciono i gatti.",
                note="Con soggetti plurali si usa piacciono, non piace.",
            ),
        ],
        related=["pronomi-indiretti", "verbi-modali", "condizionale-cortesia"],
    ),
    GrammarTopic(
        slug="verbi-modali",
        title="Verbi modali: dovere, potere, volere",
        level="A1",
        category="Verbi modali",
        summary="Esprimere necessità, possibilità e desiderio.",
        explanation="I verbi modali esprimono obbligo, possibilità e volontà. Seguiti dall'infinito senza preposizione.\n\n- **Dovere**: obbligo. *Devo studiare.*\n- **Potere**: possibilità. *Posso entrare?*\n- **Volere**: desiderio. *Voglio imparare l'italiano.*\n\nPresente irregolare:\n- dovere: devo, devi, deve, dobbiamo, dovete, devono.\n- potere: posso, puoi, può, possiamo, potete, possono.\n- volere: voglio, vuoi, vuole, vogliamo, volete, vogliono.",
        structure="dovere/potere/volere + infinito",
        rules=[
            "I modali sono sempre seguiti dall'infinito senza preposizione.",
            "Con riflessivi: Devo alzarmi / Mi devo alzare.",
            "Nei tempi composti prendono l'ausiliare dell'infinito.",
            "Potere non ha l'imperativo.",
        ],
        examples=[
            GrammarExample(text="Devo andare a lavoro.", translation="I have to go to work."),
            GrammarExample(text="Puoi aiutarmi?", translation="Can you help me?"),
            GrammarExample(
                text="Voglio imparare l'italiano.", translation="I want to learn Italian."
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Posso di entrare?",
                correct="Posso entrare?",
                note="I verbi modali non vogliono la preposizione di.",
            ),
            GrammarMistake(
                wrong="Devo mi alzare.",
                correct="Devo alzarmi. (o: Mi devo alzare.)",
                note="Il pronome va prima del modale o dopo l'infinito.",
            ),
        ],
        related=["presente-are", "verbi-riflessivi", "condizionale-presente"],
    ),
    GrammarTopic(
        slug="anche-neanche",
        title="Anche / neanche",
        level="A1",
        category="Avanzato",
        summary="Esprimere accordo o disaccordo in italiano.",
        explanation="**Anche** e **neanche** esprimono accordo/disaccordo.\n\n- **Anche io** = me too (accordo positivo): *Anche a me piace la pizza.*\n- **Neanche io** = me neither (accordo negativo): *Neanche a me piace il calcio.*\n\nAttenzione: *anche a me* (non *anche mi*), *anche a te*, *anche a lui*, ecc.",
        rules=[
            "Anche = accordo positivo; neanche/nemmeno/neppure = accordo negativo.",
            "Con pronomi indiretti si usa a: anche a me, neanche a te.",
            "Neanche contiene già la negazione: non serve 'non'.",
            "Risposta breve: Neanche io. / Anche a me.",
        ],
        examples=[
            GrammarExample(
                text="Anch'io vado al cinema.", translation="I'm going to the cinema too."
            ),
            GrammarExample(text="Anche a me piace il mare.", translation="I like the sea too."),
            GrammarExample(text="Neanch'io lo so.", translation="I don't know either."),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Anche mi piace.",
                correct="Anche a me piace.",
                note="Con piacere si usa anche a me, non anche mi.",
            ),
            GrammarMistake(
                wrong="Non neanche io.",
                correct="Neanche io.",
                note="Neanche ha già la negazione; non serve 'non'.",
            ),
        ],
        related=["piacere", "comparativi", "pronomi-indiretti"],
    ),
    GrammarTopic(
        slug="preposizioni-luogo",
        title="Preposizioni di luogo",
        level="A1",
        category="Preposizioni",
        summary="A, in, da, su, sotto, tra/fra e le preposizioni articolate per descrivere luoghi.",
        explanation="Preposizioni di luogo principali:\n\n- **a**: città e piccole isole: *Vivo a Roma. Vado a casa.*\n- **in**: paesi, regioni, luoghi chiusi: *Vivo in Italia. Sono in ufficio.*\n- **da**: persona, professionista: *Vado dal dottore.*\n- **su**: sopra: *Il libro è sul tavolo.*\n- **sotto**: al di sotto: *sotto il letto.*\n- **tra / fra**: in mezzo: *tra il bar e la banca.*\n\nPreposizioni articolate: *al, allo, alla, ai, agli, alle, del, nel, sul, dal.*",
        rules=[
            "A per città e isole piccole; in per nazioni e regioni.",
            "Da + articolo per persone: dal medico, dalla nonna.",
            "Su, sotto, tra/fra sono semplici.",
            "Mezzi di trasporto: in macchina, in autobus; ma: a piedi.",
        ],
        examples=[
            GrammarExample(text="Vivo a Firenze.", translation="I live in Florence."),
            GrammarExample(text="Andiamo in Spagna.", translation="We are going to Spain."),
            GrammarExample(text="Il libro è sul tavolo.", translation="The book is on the table."),
            GrammarExample(text="Vado dal dentista.", translation="I go to the dentist."),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Vivo in Roma.", correct="Vivo a Roma.", note="Con le città si usa a, non in."
            ),
            GrammarMistake(
                wrong="Andiamo a Italia.",
                correct="Andiamo in Italia.",
                note="Con i paesi si usa in.",
            ),
        ],
        related=["articoli-determinativi", "ce-ci-sono", "articoli-indeterminativi"],
    ),
    GrammarTopic(
        slug="imperativo-informale",
        title="Imperativo informale",
        level="A1",
        category="Tempi verbali",
        summary="Dare ordini e istruzioni in modo informale (tu).",
        explanation="L'imperativo informale dà ordini a persone in confidenza.\n\n**Formazione:**\n- -are: tu parl**a**, noi parl**iamo**, voi parl**ate**\n- -ere: tu legg**i**, noi legg**iamo**, voi legg**ete**\n- -ire: tu dorm**i** / fin**isci**, noi dormiamo / finiamo, voi dormite / finite\n\n**Negativo (tu):** non + infinito: *Non parlare! Non dormire!*",
        structure="Tu: -a (-are) / -i (-ere, -ire) · Noi: -iamo · Voi: -ate/ete/ite",
        rules=[
            "Il tu dei verbi in -are finisce in -a: Parla! Guarda! Ascolta!",
            "Il tu dei verbi in -ere e -ire finisce in -i: Leggi! Dormi!",
            "L'imperativo negativo del tu = non + infinito.",
            "Irregolari: essere → sii; avere → abbi; sapere → sappi.",
        ],
        examples=[
            GrammarExample(text="Ascolta questa canzone!", translation="Listen to this song!"),
            GrammarExample(text="Non parlare così in fretta!", translation="Don't speak so fast!"),
            GrammarExample(text="Finiamo il lavoro!", translation="Let's finish the work!"),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Non parli così!",
                correct="Non parlare così!",
                note="L'imperativo negativo del tu usa l'infinito, non il presente.",
            ),
            GrammarMistake(
                wrong="Guardi il film! (a un amico)",
                correct="Guarda il film!",
                note="Agli amici si dà del tu; guardi è la forma di cortesia (Lei).",
            ),
        ],
        related=[
            "presente-are",
            "imperativo-affermativo",
            "imperativo-negativo",
            "imperativo-pronomi",
        ],
    ),
    GrammarTopic(
        slug="numeri-ordinali",
        title="Numeri ordinali",
        level="A1",
        category="Aggettivi e avverbi",
        summary="Primo, secondo, terzo — ordinare e classificare in italiano.",
        explanation="I numeri ordinali concordano in genere e numero con il nome.\n\n- primo/a, secondo/a, terzo/a, quarto/a, quinto/a, sesto/a, settimo/a, ottavo/a, nono/a, decimo/a.\n- Dall'11: undicesimo, dodicesimo, ventesimo, centesimo.\n\nAbbreviazioni: 1º (m), 1ª (f).\n\nUso: *il primo libro, la seconda porta a destra, il terzo piano.*",
        rules=[
            "I primi dieci ordinali hanno forme irregolari.",
            "Dall'11 in poi: numero + -esimo: undicesimo, dodicesimo.",
            "Vanno prima del nome con l'articolo: il primo giorno.",
            "Con re e papi senza articolo: Carlo quinto, Giovanni ventitreesimo.",
        ],
        examples=[
            GrammarExample(
                text="È la prima volta che vengo in Italia.",
                translation="It's the first time I come to Italy.",
            ),
            GrammarExample(text="Abito al terzo piano.", translation="I live on the third floor."),
            GrammarExample(
                text="Il mio secondo figlio si chiama Luca.",
                translation="My second son is called Luca.",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="La uno volta",
                correct="La prima volta",
                note="L'ordinale di uno è primo, non uno.",
            ),
            GrammarMistake(
                wrong="Abito al tre piano.",
                correct="Abito al terzo piano.",
                note="Tre è cardinale; terzo è ordinale.",
            ),
        ],
        related=["aggettivi-descrittivi", "articoli-determinativi", "giorni-settimana"],
    ),
    GrammarTopic(
        slug="futuro-semplice",
        title="Il futuro semplice",
        level="A1",
        category="Tempi verbali",
        summary="Parlare di eventi futuri e fare previsioni.",
        explanation="Il futuro semplice si usa per eventi futuri, previsioni, promesse e ipotesi.\n\n**Formazione:**\n- -are: la A diventa E: parlerò, parlerai, parlerà, parleremo, parlerete, parleranno.\n- -ere: leggerò, leggerai...\n- -ire: dormirò, dormirai...\n\n**Irregolari principali:** essere (sarò), avere (avrò), andare (andrò), fare (farò), venire (verrò), volere (vorrò), potere (potrò), dovere (dovrò), sapere (saprò), vedere (vedrò), vivere (vivrò).",
        rules=[
            "I verbi in -are cambiano la a in e: parlare → parlerò.",
            "I verbi in -ere mantengono la e: leggere → leggerò.",
            "I verbi in -ire mantengono la i: dormire → dormirò.",
            "-ciare/-giare perdono la i: comincerò, mangerò.",
            "-care/-gare aggiungono h: cercherò, pagherò.",
        ],
        examples=[
            GrammarExample(
                text="Domani parlerò con il direttore.",
                translation="Tomorrow I will speak with the director.",
            ),
            GrammarExample(
                text="La prossima settimana andremo al mare.",
                translation="Next week we will go to the beach.",
            ),
            GrammarExample(
                text="Sarà molto felice di vederti.",
                translation="He will be very happy to see you.",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Domani parlarò con lui.",
                correct="Domani parlerò con lui.",
                note="Per i verbi in -are la a diventa e al futuro.",
            ),
            GrammarMistake(
                wrong="La settimana prossima vado al mare.",
                correct="La settimana prossima andrò al mare.",
                note="Per eventi futuri certi si usa il futuro semplice.",
            ),
        ],
        related=["stare-per", "condizionale-presente", "presente-are"],
    ),
    GrammarTopic(
        slug="stare-per",
        title="Stare per + infinito",
        level="A1",
        category="Tempi verbali",
        summary="Esprimere un'azione imminente, sul punto di accadere.",
        explanation="La costruzione **stare per + infinito** esprime un'azione imminente.\n\n- *Sto per uscire.* = I'm about to go out.\n- *Stavo per chiamarti.* = I was about to call you.\n\nATTENZIONE: non corrisponde al present continuous! Per azioni in corso si usa **stare + gerundio**: *Sto mangiando*.",
        structure="stare (coniugato) + per + infinito",
        rules=[
            "Stare per + infinito = azione imminente.",
            "Stare + gerundio = azione in corso (non confondere).",
            "Si può usare anche al passato: Stavo per uscire quando ha chiamato.",
            "Non si usa per piani futuri generici.",
        ],
        examples=[
            GrammarExample(text="Sto per partire.", translation="I'm about to leave."),
            GrammarExample(
                text="Il film sta per cominciare.", translation="The movie is about to start."
            ),
            GrammarExample(
                text="Stavamo per arrivare quando si è rotta la macchina.",
                translation="We were about to arrive when the car broke down.",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Sto per studiando.",
                correct="Sto per studiare. (o: Sto studiando.)",
                note="Stare per vuole l'infinito, non il gerundio.",
            ),
            GrammarMistake(
                wrong="Sto per andare al cinema stasera.",
                correct="Stasera vado al cinema.",
                note="Stare per si usa solo per azioni veramente imminenti.",
            ),
        ],
        related=["futuro-semplice", "stare-gerundio"],
    ),
    GrammarTopic(
        slug="giorni-settimana",
        title="Giorni della settimana",
        level="A1",
        category="Sostantivi",
        summary="I giorni della settimana: uso con e senza articolo.",
        explanation="Giorni: lunedì, martedì, mercoledì, giovedì, venerdì, sabato, domenica.\n\nTutti maschili tranne **domenica** (femminile).\n\n**Senza articolo:** giorno specifico. *Venerdì vado al cinema.*\n**Con articolo:** azione abituale. *Il lunedì vado in palestra.*\n\nNon prendono la maiuscola in italiano.",
        rules=[
            "Tutti i giorni sono maschili tranne domenica.",
            "Senza articolo: giorno specifico.",
            "Con articolo: azione abituale o ripetuta.",
            "Non si scrivono con la lettera maiuscola.",
        ],
        examples=[
            GrammarExample(
                text="Lunedì vado dal dentista.", translation="On Monday I'm going to the dentist."
            ),
            GrammarExample(
                text="Il sabato dormo fino a tardi.", translation="On Saturdays I sleep late."
            ),
            GrammarExample(
                text="La domenica andiamo a messa.", translation="On Sundays we go to church."
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Lunedì vado in palestra. (intendendo ogni lunedì)",
                correct="Il lunedì vado in palestra.",
                note="Senza articolo indica un giorno specifico; per l'abitudine serve l'articolo.",
            ),
            GrammarMistake(
                wrong="Il Domenica vado a messa.",
                correct="La domenica vado a messa.",
                note="Domenica è femminile: la domenica.",
            ),
        ],
        related=["numeri-ordinali", "preposizioni-luogo", "articoli-determinativi"],
    ),
    GrammarTopic(
        slug="dimostrativi",
        title="I dimostrativi: questo e quello",
        level="A1",
        category="Aggettivi e avverbi",
        summary="Uso degli aggettivi e pronomi dimostrativi per indicare la distanza di ciò a cui ci si riferisce.",
        explanation="I **dimostrativi** servono a indicare la posizione nello spazio o nel tempo di ciò a cui ci si riferisce.\n\n- **Questo/questa/questi/queste** → qualcosa vicino a chi parla: *Questo libro è mio.*\n- **Quello/quella/quelli/quelle** → qualcosa lontano da chi parla e da chi ascolta: *Quella casa laggiù è antica.*\n\n**Quello** segue le stesse regole dell'articolo determinativo:\n- *quello studente* (come *lo studente*)\n- *quell'amico* (come *l'amico*)\n- *quel libro* (come *il libro*)\n- *quegli zaini* (come *gli zaini*)\n- *quei libri* (come *i libri*)\n\nLa forma neutra **ciò** si usa per riferirsi a un'idea o a qualcosa di non specificato:\n- *Ciò che dici è vero.*\n- *Non capisco ciò.*\n\n**Come aggettivi**, precedono il nome e concordano in genere e numero: *questo ragazzo, questa ragazza, questi ragazzi, queste ragazze.*\n\n**Come pronomi**, sostituiscono il nome: *—Quale maglietta vuoi? —Questa.*",
        structure="questo/questa/questi/queste (vicino) · quello/quella/quelli/quelle (lontano) · ciò (neutro)",
        rules=[
            '"Questo" indica qualcosa vicino a chi parla.',
            '"Quello" indica qualcosa lontano da chi parla e da chi ascolta.',
            'Le forme di "quello" seguono le stesse regole dell\'articolo determinativo.',
            '"Ciò" è la forma neutra e si usa per idee o concetti astratti.',
            "I dimostrativi concordano in genere e numero con il nome.",
        ],
        examples=[
            GrammarExample(
                text="Questo libro è molto interessante.",
                translation="This book is very interesting.",
                note="vicino a chi parla",
            ),
            GrammarExample(
                text="Quella casa in fondo alla strada è di mia zia.",
                translation="That house at the end of the street is my aunt's.",
                note="lontano",
            ),
            GrammarExample(
                text="Ciò che mi hai detto è incredibile.",
                translation="What you told me is incredible.",
                note="forma neutra",
            ),
            GrammarExample(
                text="Quello studente è tedesco.",
                translation="That student is German.",
                note="quello + s+consonante",
            ),
            GrammarExample(
                text="Questi biscotti sono buonissimi.",
                translation="These biscuits are delicious.",
                note="plurale vicino",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Quello libro è interessante.",
                correct="Quel libro è interessante.",
                note='Davanti a consonante semplice si usa "quel", non "quello".',
            ),
            GrammarMistake(
                wrong="Questo è bello.",
                correct="Ciò è bello.",
                note='Per un\'idea astratta si usa "ciò", non "questo".',
            ),
            GrammarMistake(
                wrong="La questa casa è grande.",
                correct="Questa casa è grande.",
                note="Il dimostrativo non vuole l'articolo davanti.",
            ),
        ],
        related=["aggettivi-descrittivi", "aggettivi-possessivi", "articoli-determinativi"],
    ),
    GrammarTopic(
        slug="preposizioni-articolate",
        title="Le preposizioni articolate",
        level="A1",
        category="Preposizioni",
        summary="Fusione di preposizioni semplici con gli articoli determinativi.",
        explanation="Le **preposizioni articolate** nascono dalla fusione di una preposizione semplice con l'articolo determinativo.\n\n| Preposizione | + il | + lo | + la | + l' | + i | + gli | + le |\n|-------------|------|------|------|-----|-----|------|------|\n| **di** | del | dello | della | dell' | dei | degli | delle |\n| **a** | al | allo | alla | all' | ai | agli | alle |\n| **da** | dal | dallo | dalla | dall' | dai | dagli | dalle |\n| **in** | nel | nello | nella | nell' | nei | negli | nelle |\n| **su** | sul | sullo | sulla | sull' | sui | sugli | sulle |\n\n- *Il libro **del** professore.* (di + il)\n- *Vado **al** cinema.* (a + il)\n- *Vengo **dalla** stazione.* (da + la)\n- *Sono **nella** mia stanza.* (in + la)\n- *Il gatto è **sul** tavolo.* (su + il)\n\n**Con** è particolare: *con + il = col, con + i = coi* ma oggi sono forme meno usate.",
        structure="di + il = del · a + il = al · da + il = dal · in + il = nel · su + il = sul · con + il = col",
        rules=[
            "Le preposizioni articolate fondono preposizione + articolo.",
            "Si usano obbligatoriamente davanti ai nomi che richiedono l'articolo.",
            "Le preposizioni Di, A, Da, In, Su formano articolate.",
            "Con forma articolate meno comuni (col, coi) oggi spesso sostituite da con + articolo separato.",
            "La scelta della forma dipende dal genere e numero del nome che segue.",
        ],
        examples=[
            GrammarExample(
                text="Il libro è sul tavolo.",
                translation="The book is on the table.",
                note="su + il = sul",
            ),
            GrammarExample(
                text="Andiamo al ristorante stasera.",
                translation="We go to the restaurant tonight.",
                note="a + il = al",
            ),
            GrammarExample(
                text="Le chiavi sono nella borsa.",
                translation="The keys are in the bag.",
                note="in + la = nella",
            ),
            GrammarExample(
                text="Il cane dei vicini abbaia sempre.",
                translation="The neighbours' dog always barks.",
                note="di + i = dei",
            ),
            GrammarExample(
                text="La macchina è degli amici di Marco.",
                translation="The car belongs to Marco's friends.",
                note="di + gli = degli",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Vado a il cinema.",
                correct="Vado al cinema.",
                note="Si usa sempre la preposizione articolata, non separata.",
            ),
            GrammarMistake(
                wrong="Il libro di il ragazzo.",
                correct="Il libro del ragazzo.",
                note="di + il = del",
            ),
            GrammarMistake(
                wrong="Sono in la cucina.", correct="Sono nella cucina.", note="in + la = nella"
            ),
        ],
        related=["articoli-determinativi", "preposizioni-luogo", "articoli-indeterminativi"],
    ),
]
