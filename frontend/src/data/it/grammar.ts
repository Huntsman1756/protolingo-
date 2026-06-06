export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'

export type GrammarCategory =
  | 'Tempi verbali'
  | 'Sostantivi'
  | 'Pronomi'
  | 'Aggettivi e avverbi'
  | 'Verbi modali'
  | 'Condizionali'
  | 'Voce passiva'
  | 'Discorso indiretto'
  | 'Proposizioni'
  | 'Articoli'
  | 'Preposizioni'
  | 'Congiuntivo'
  | 'Avanzato'

export interface GrammarExample {
  english: string
  translation?: string
  note?: string
}

export interface GrammarMistake {
  wrong: string
  correct: string
  note: string
}

export interface GrammarTopic {
  slug: string
  title: string
  level: CEFRLevel
  category: GrammarCategory
  summary: string
  explanation: string
  structure?: string
  rules: string[]
  examples: GrammarExample[]
  common_mistakes: GrammarMistake[]
  related: string[]
}

export const grammarTopics: GrammarTopic[] = [
  {
    slug: 'essere',
    title: 'Il verbo essere',
    level: 'A1',
    category: 'Tempi verbali',
    summary: 'Il verbo più fondamentale della lingua italiana.',
    structure:
      'io sono · tu sei · lui/lei è · noi siamo · voi siete · loro sono',
    explanation:
      "Il verbo **essere** è usato per descrivere persone, luoghi, cose e stati.\n\nSi usa per:\n- Identità: *Io sono Marco.*\n- Nazionalità: *Lei è italiana.*\n- Professioni: *Lui è medico.*\n- Descrizioni: *La casa è grande.*\n- Stati d'animo: *Noi siamo felici.*",
    rules: [
      'Essere è irregolare e va memorizzato in tutte le sue forme.',
      'Si usa senza articolo davanti a professioni non modificate.',
      'Essere funge anche da ausiliare per i tempi composti di alcuni verbi.',
      "Nelle domande, l'intonazione cambia ma l'ordine delle parole rimane lo stesso.",
    ],
    examples: [
      { english: 'Io sono uno studente.', translation: 'I am a student.' },
      { english: 'Lei è molto simpatica.', translation: 'She is very nice.' },
      { english: 'Noi siamo a Roma.', translation: 'We are in Rome.' },
    ],
    common_mistakes: [
      {
        wrong: 'Io sono medico.',
        correct: 'Sono medico.',
        note: 'Il pronome soggetto è spesso omesso in italiano.',
      },
      {
        wrong: 'Lui è un medico.',
        correct: 'Lui è medico.',
        note: "Davanti a professioni si omette l'articolo.",
      },
    ],
    related: ['avere', 'essere-nazionalita', 'pronomi-soggetto'],
  },
  {
    slug: 'avere',
    title: 'Il verbo avere',
    level: 'A1',
    category: 'Tempi verbali',
    summary: 'Esprime possesso e funge da ausiliare per i tempi composti.',
    structure:
      'io ho · tu hai · lui/lei ha · noi abbiamo · voi avete · loro hanno',
    explanation:
      "Il verbo **avere** indica possesso, relazioni e sensazioni fisiche.\n\nSi usa per:\n- Possesso: *Ho una macchina.*\n- Età: *Quanti anni hai? — Ho vent'anni.*\n- Sensazioni: *Ho fame / sete / caldo / freddo / sonno.*\n- Ausiliare per il passato prossimo: *Ho mangiato, ho dormito.*",
    rules: [
      'Avere è irregolare e va memorizzato.',
      "L'età in italiano si esprime con avere, non con essere.",
      'Le sensazioni fisiche usano avere + nome, non aggettivi.',
      "La H iniziale è muta ma obbligatoria nella scrittura: distinguere 'ho' da 'o'.",
    ],
    examples: [
      { english: 'Ho due fratelli.', translation: 'I have two brothers.' },
      { english: 'Quanti anni hai?', translation: 'How old are you?' },
      {
        english: 'Ho fame. Andiamo a mangiare?',
        translation: "I'm hungry. Shall we go eat?",
      },
    ],
    common_mistakes: [
      {
        wrong: 'Sono 20 anni.',
        correct: 'Ho 20 anni.',
        note: "L'età si esprime con avere, non essere.",
      },
      {
        wrong: 'O mangiato la pizza.',
        correct: 'Ho mangiato la pizza.',
        note: "Non dimenticare la H: 'ho' è verbo, 'o' è congiunzione.",
      },
    ],
    related: ['essere', 'passato-prossimo-avere', 'passato-prossimo-essere'],
  },
  {
    slug: 'pronomi-soggetto',
    title: 'I pronomi soggetto',
    level: 'A1',
    category: 'Pronomi',
    summary:
      'Io, tu, lui, lei, noi, voi, loro — ma spesso si possono omettere.',
    structure: 'io · tu · lui/lei/Lei · noi · voi · loro',
    explanation:
      "I pronomi soggetto in italiano sono:\n- **io**, **tu**, **lui**, **lei**, **noi**, **voi**, **loro**.\n\nA differenza dell'inglese, il pronome soggetto è spesso omesso perché la desinenza del verbo indica già la persona. Si usa solo per enfasi o contrasto.\n\n**Lei** (con la L maiuscola) è la forma di cortesia, usata per rivolgersi formalmente a chiunque.",
    rules: [
      'Il pronome soggetto si omette di norma: *Parlo italiano*.',
      'Si usa per contrasto: *Io vado al cinema, tu resti a casa.*',
      'Si usa per enfasi: *Io non ho detto niente!*',
      'Lei formale richiede il verbo alla terza persona singolare.',
    ],
    examples: [
      {
        english: 'Parlo italiano.',
        translation: 'I speak Italian.',
        note: 'pronome omesso',
      },
      {
        english: 'Io preferisco il caffè, lei preferisce il tè.',
        translation: 'I prefer coffee, she prefers tea.',
        note: 'contrasto',
      },
      {
        english: 'Lei come si chiama?',
        translation: 'What is your name? (formal)',
        note: 'Lei di cortesia',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Io parlo italiano ogni volta.',
        correct: 'Parlo italiano.',
        note: "L'uso eccessivo dei pronomi suona innaturale in italiano.",
      },
      {
        wrong: 'Tu come ti chiami? (a un professore)',
        correct: 'Lei come si chiama?',
        note: 'Con estranei o superiori si usa il Lei di cortesia.',
      },
    ],
    related: ['essere', 'avere', 'pronomi-diretti', 'pronomi-indiretti'],
  },
  {
    slug: 'articoli-determinativi',
    title: 'Articoli determinativi',
    level: 'A1',
    category: 'Articoli',
    summary: 'Il, lo, la, i, gli, le — quando indicare qualcosa di specifico.',
    structure: "il / lo / l' / la · i / gli / le",
    explanation:
      "Gli articoli determinativi variano per genere, numero e lettera iniziale:\n\n**Maschile singolare:**\n- **il**: davanti a consonante semplice: *il libro*\n- **lo**: davanti a s+cons, z, gn, ps, x, y: *lo studente*\n- **l'**: davanti a vocale: *l'amico*\n\n**Maschile plurale:**\n- **i**: *i libri*\n- **gli**: *gli studenti, gli amici*\n\n**Femminile:**\n- **la** / **l'** (sing.): *la casa, l'amica*\n- **le** (plur.): *le case, le amiche*",
    rules: [
      'Il / i per maschile davanti a consonante semplice.',
      'Lo / gli per maschile davanti a s+cons, z, gn, ps, x, y.',
      "L' per maschile e femminile davanti a vocale.",
      'La / le per femminile.',
    ],
    examples: [
      {
        english: 'Il libro è sul tavolo.',
        translation: 'The book is on the table.',
      },
      {
        english: 'Lo studente è italiano.',
        translation: 'The student is Italian.',
      },
      {
        english: 'Gli amici arrivano domani.',
        translation: 'The friends arrive tomorrow.',
      },
      {
        english: "L'amica di Maria è francese.",
        translation: "Maria's friend is French.",
      },
    ],
    common_mistakes: [
      {
        wrong: 'Il studente',
        correct: 'Lo studente',
        note: 'Davanti a s+consonante si usa lo, non il.',
      },
      {
        wrong: 'I amici',
        correct: 'Gli amici',
        note: 'Davanti a vocale il plurale maschile è gli.',
      },
    ],
    related: ['articoli-indeterminativi', 'genere-nomi', 'preposizioni-luogo'],
  },
  {
    slug: 'essere-nazionalita',
    title: 'Essere + nazionalità',
    level: 'A1',
    category: 'Aggettivi e avverbi',
    summary: 'Come esprimere la propria provenienza e nazionalità.',
    explanation:
      "Per esprimere la nazionalità si usa il verbo **essere** seguito dall'aggettivo di nazionalità, che concorda in genere e numero con il soggetto.\n\nIn italiano **non** si usa l'articolo indeterminativo prima della nazionalità.\n\nAggettivi comuni: *italiano/a, spagnolo/a, francese, inglese, tedesco/a, americano/a, cinese, giapponese.*",
    rules: [
      'Essere + aggettivo di nazionalità.',
      "L'aggettivo concorda con il soggetto in genere e numero.",
      "Non usare l'articolo: *Sono italiano*, non *Sono un italiano*.",
      'Aggettivi in -ese sono invariabili al femminile: francese, inglese.',
    ],
    examples: [
      { english: 'Sono spagnolo.', translation: 'I am Spanish.' },
      { english: 'Lei è francese.', translation: 'She is French.' },
      { english: 'Loro sono tedeschi.', translation: 'They are German.' },
    ],
    common_mistakes: [
      {
        wrong: 'Sono un italiano.',
        correct: 'Sono italiano.',
        note: "Non si usa l'articolo con le nazionalità.",
      },
      {
        wrong: 'Lei è francesa.',
        correct: 'Lei è francese.',
        note: 'Gli aggettivi in -ese sono invariabili: francese, inglese, cinese.',
      },
    ],
    related: ['essere', 'aggettivi-descrittivi', 'articoli-indeterminativi'],
  },
  {
    slug: 'genere-nomi',
    title: 'Il genere dei nomi',
    level: 'A1',
    category: 'Sostantivi',
    summary:
      'Maschile e femminile: le regole base per capire il genere dei sostantivi.',
    explanation:
      'In italiano tutti i sostantivi hanno un genere: **maschile** o **femminile**.\n\nRegole generali:\n- **-o** → generalmente maschili: *il libro, il tavolo.*\n- **-a** → generalmente femminili: *la casa, la scuola.*\n- **-e** → maschili o femminili: *il fiore* (m), *la notte* (f).\n- **-tà, -tù, -zione, -sione** → femminili: *la città, la lezione.*\n- **-ore** → maschili: *il dottore, il colore.*\n\nParole di origine greca in **-ma** e **-ta** sono maschili: *il problema, il pianeta.*',
    rules: [
      'Nomi in -o → generalmente maschili (eccezioni: la mano, la radio).',
      'Nomi in -a → generalmente femminili (eccezioni: il problema, il tema, il poeta).',
      'Nomi in -e → possono essere maschili o femminili.',
      'Parole greche in -ma e -ta sono maschili: il problema, il pianeta.',
    ],
    examples: [
      {
        english: 'Il libro è interessante.',
        translation: 'The book is interesting.',
        note: '-o → maschile',
      },
      {
        english: 'La pizza è buona.',
        translation: 'The pizza is good.',
        note: '-a → femminile',
      },
      {
        english: 'Il problema è difficile.',
        translation: 'The problem is difficult.',
        note: '-ma → maschile (eccezione)',
      },
    ],
    common_mistakes: [
      {
        wrong: 'La problema',
        correct: 'Il problema',
        note: 'I nomi di origine greca in -ma sono maschili.',
      },
      {
        wrong: 'Il mano',
        correct: 'La mano',
        note: 'Mano è femminile nonostante la desinenza in -o.',
      },
    ],
    related: [
      'articoli-determinativi',
      'articoli-indeterminativi',
      'aggettivi-descrittivi',
    ],
  },
  {
    slug: 'articoli-indeterminativi',
    title: 'Articoli indeterminativi',
    level: 'A1',
    category: 'Articoli',
    summary: "Un, uno, una, un' — quando parlare di qualcosa di non specifico.",
    structure: "un / uno · una / un'",
    explanation:
      "Gli articoli indeterminativi si usano per indicare una cosa o persona non specifica.\n\n**Maschile:**\n- **un**: davanti a consonante e vocale: *un libro, un amico.*\n- **uno**: davanti a s+consonante, z, gn, ps, x, y: *uno studente, uno zaino.*\n\n**Femminile:**\n- **una**: davanti a consonante: *una casa.*\n- **un'**: davanti a vocale: *un'amica.*",
    rules: [
      'Un per maschile davanti a consonante semplice e vocale.',
      'Uno per maschile davanti a s+cons, z, gn, ps, x, y.',
      'Una per femminile davanti a consonante.',
      "Un' con apostrofo per femminile davanti a vocale.",
    ],
    examples: [
      { english: 'Ho un cane.', translation: 'I have a dog.' },
      {
        english: 'È uno studente bravo.',
        translation: 'He is a good student.',
      },
      {
        english: "Cerco un'amica per uscire.",
        translation: "I'm looking for a friend to go out with.",
      },
    ],
    common_mistakes: [
      {
        wrong: 'Ho uno libro.',
        correct: 'Ho un libro.',
        note: 'Uno solo davanti a s+cons, z, gn, ps, x, y.',
      },
      {
        wrong: 'Cerco una amica.',
        correct: "Cerco un'amica.",
        note: "Davanti a vocale femminile si usa un'.",
      },
    ],
    related: ['articoli-determinativi', 'genere-nomi'],
  },
  {
    slug: 'aggettivi-possessivi',
    title: 'Aggettivi possessivi',
    level: 'A1',
    category: 'Aggettivi e avverbi',
    summary: 'Mio, tuo, suo, nostro, vostro, loro — esprimere appartenenza.',
    explanation:
      "Gli aggettivi possessivi indicano a chi appartiene qualcosa. Concordano in genere e numero con il nome, non con il possessore.\n\n- **mio, tuo, suo, nostro, vostro**: quattro forme ciascuno.\n- **loro**: invariabile.\n\nNormalmente preceduti dall'articolo: *la mia casa*. L'articolo si omette con i nomi di parentela al singolare: *mio padre, tua madre*.",
    rules: [
      'Il possessivo concorda con la cosa posseduta, non con il possessore.',
      "Di solito è preceduto dall'articolo: la mia macchina.",
      "Con parentela singolare non modificata si omette l'articolo: mio padre.",
      "Loro è invariabile e vuole sempre l'articolo: la loro casa.",
    ],
    examples: [
      { english: 'La mia casa è grande.', translation: 'My house is big.' },
      {
        english: 'Mio padre è medico.',
        translation: 'My father is a doctor.',
        note: 'parentela → no articolo',
      },
      {
        english: 'Il loro cane è simpatico.',
        translation: 'Their dog is nice.',
        note: 'loro richiede articolo',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Il mio padre è alto.',
        correct: 'Mio padre è alto.',
        note: "Con parentela singolare non si usa l'articolo.",
      },
      {
        wrong: 'La sua sorella si chiama Anna.',
        correct: 'Sua sorella si chiama Anna.',
        note: "Anche qui si omette l'articolo.",
      },
    ],
    related: ['essere', 'articoli-determinativi', 'genere-nomi'],
  },
  {
    slug: 'aggettivi-descrittivi',
    title: 'Aggettivi descrittivi',
    level: 'A1',
    category: 'Aggettivi e avverbi',
    summary:
      'Descrivere persone, luoghi e cose con gli aggettivi qualificativi.',
    explanation:
      'Gli aggettivi descrittivi esprimono qualità e concordano in **genere** e **numero** con il nome.\n\n**Posizione:**\n- Di solito dopo il nome: *una casa bella.*\n- Alcuni comuni prima: *un bel libro, una buona idea.*\n\n**Concordanza:**\n- -o/-a/-i/-e: *bello, bella, belli, belle.*\n- -e/-i: *grande, grandi* (uguale per maschile e femminile).',
    rules: [
      "L'aggettivo concorda in genere e numero con il nome.",
      'Di norma segue il nome.',
      'Bello, buono, grande, piccolo, nuovo, vecchio spesso precedono.',
      'Aggettivi in -e: stessa forma per maschile e femminile singolare.',
    ],
    examples: [
      {
        english: 'Una casa bella e luminosa.',
        translation: 'A beautiful and bright house.',
      },
      {
        english: 'Un buon ristorante.',
        translation: 'A good restaurant.',
        note: 'buono prima del nome',
      },
      {
        english: 'Le macchine rosse sono veloci.',
        translation: 'The red cars are fast.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Una casa bello.',
        correct: 'Una casa bella.',
        note: "L'aggettivo deve concordare in genere e numero.",
      },
      {
        wrong: 'Il cane simpatica.',
        correct: 'Il cane simpatico.',
        note: 'Cane è maschile → aggettivo maschile.',
      },
    ],
    related: ['genere-nomi', 'comparativi', 'superlativi'],
  },
  {
    slug: 'ce-ci-sono',
    title: "C'è / Ci sono",
    level: 'A1',
    category: 'Tempi verbali',
    summary: "Esprimere esistenza e presenza con c'è e ci sono.",
    structure: "c'è + singolare · ci sono + plurale",
    explanation:
      "**C'è** e **ci sono** = *there is / there are*.\n\n- **C'è** + singolare: *C'è un gatto in giardino.*\n- **Ci sono** + plurale: *Ci sono tre libri sul tavolo.*\n\nNegativo: **non c'è / non ci sono**: *Non c'è tempo, non ci sono problemi.*",
    rules: [
      "C'è = ci + è (singolare).",
      'Ci sono = ci + sono (plurale).',
      "Differenza tra c'è (esistenza) ed è (identità).",
      "Domande: *C'è un bagno qui?*",
    ],
    examples: [
      {
        english: "C'è un gatto sul divano.",
        translation: 'There is a cat on the sofa.',
      },
      {
        english: 'Ci sono molte persone in piazza.',
        translation: 'There are many people in the square.',
      },
      { english: "Non c'è problema.", translation: 'There is no problem.' },
    ],
    common_mistakes: [
      {
        wrong: "C'è tre libri.",
        correct: 'Ci sono tre libri.',
        note: "Con i plurali si usa ci sono, non c'è.",
      },
      {
        wrong: 'È un gatto.',
        correct: "C'è un gatto.",
        note: "È = identità; c'è = esistenza/presenza.",
      },
    ],
    related: ['essere', 'preposizioni-luogo', 'articoli-indeterminativi'],
  },
  {
    slug: 'presente-are',
    title: 'Presente indicativo: verbi in -are',
    level: 'A1',
    category: 'Tempi verbali',
    summary: 'Coniugare i verbi regolari che finiscono in -are.',
    structure: 'io -o · tu -i · lui/lei -a · noi -iamo · voi -ate · loro -ano',
    explanation:
      'I verbi in **-are** sono la prima coniugazione, la più numerosa.\n\n**parlare**: io parlo, tu parli, lui/lei parla, noi parliamo, voi parlate, loro parlano.\n\n**Ortografia:**\n- -care/-gare: aggiungono H davanti a -i, -iamo: *cerco, cerchi, cerchiamo*.\n- -ciare/-giare: perdono la I: *comincio, cominciamo; mangio, mangiamo*.\n\nVerbi comuni: *mangiare, studiare, lavorare, abitare, comprare, ascoltare, guardare.*',
    rules: [
      'Togliere -are e aggiungere -o, -i, -a, -iamo, -ate, -ano.',
      'Verbi in -care/-gare: aggiungere H prima di -i e -iamo.',
      'Verbi in -ciare/-giare: la I cade prima di -i e -iamo.',
      'Il presente italiano traduce simple present, present continuous e present perfect.',
    ],
    examples: [
      { english: 'Io parlo italiano.', translation: 'I speak Italian.' },
      { english: 'Tu mangi la pizza?', translation: 'Do you eat pizza?' },
      { english: 'Noi abitiamo a Milano.', translation: 'We live in Milan.' },
    ],
    common_mistakes: [
      {
        wrong: 'Io parla italiano.',
        correct: 'Io parlo italiano.',
        note: 'La prima persona finisce in -o, non in -a.',
      },
      {
        wrong: 'Noi cerciamo il libro.',
        correct: 'Noi cerchiamo il libro.',
        note: 'Con cercare si aggiunge H prima di -iamo.',
      },
    ],
    related: ['presente-ere', 'presente-ire', 'pronomi-soggetto'],
  },
  {
    slug: 'presente-ere',
    title: 'Presente indicativo: verbi in -ere',
    level: 'A1',
    category: 'Tempi verbali',
    summary: 'Coniugare i verbi regolari che finiscono in -ere.',
    structure: 'io -o · tu -i · lui/lei -e · noi -iamo · voi -ete · loro -ono',
    explanation:
      'I verbi in **-ere** sono la seconda coniugazione.\n\n**leggere**: io leggo, tu leggi, lui/lei legge, noi leggiamo, voi leggete, loro leggono.\n\nVerbi comuni: *scrivere, vivere, credere, vedere, chiedere, prendere, rispondere, correre, vendere.*',
    rules: [
      'Togliere -ere e aggiungere -o, -i, -e, -iamo, -ete, -ono.',
      'Molti verbi in -ere hanno participio passato irregolare.',
      'La seconda persona plurale (voi) finisce sempre in -ete.',
      "Non confondere la 3ª singolare in -e con l'imperativo.",
    ],
    examples: [
      { english: 'Io leggo un libro.', translation: 'I read a book.' },
      {
        english: 'Lui scrive una lettera.',
        translation: 'He writes a letter.',
      },
      {
        english: 'Voi correte ogni mattina.',
        translation: 'You run every morning.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Io legge un libro.',
        correct: 'Io leggo un libro.',
        note: 'La prima persona di leggere è leggo, non legge.',
      },
      {
        wrong: 'Voi leggi.',
        correct: 'Voi leggete.',
        note: 'La seconda persona plurale di -ere è -ete.',
      },
    ],
    related: ['presente-are', 'presente-ire', 'passato-prossimo-avere'],
  },
  {
    slug: 'presente-ire',
    title: 'Presente indicativo: verbi in -ire',
    level: 'A1',
    category: 'Tempi verbali',
    summary:
      'Coniugare i verbi regolari in -ire, compresi quelli che prendono -isc-.',
    explanation:
      "I verbi in **-ire** si dividono in due gruppi:\n\n**Senza -isc-:** dormire → dormo, dormi, dorme, dormiamo, dormite, dormono.\nAnche: *aprire, partire, sentire, servire, seguire, soffrire.*\n\n**Con -isc-:** finire → finisco, finisci, finisce, finiamo, finite, finiscono.\nAnche: *capire, preferire, pulire, spedire, unire, costruire.*\n\nL'infisso -isc- appare solo nelle tre persone singolari e nella 3ª plurale.",
    rules: [
      'Molti verbi in -ire prendono -isc-: capire → capisco, capisci, capisce, capiscono.',
      'Noi e voi non prendono mai -isc-: capiamo, capite.',
      'Senza -isc-: dormire, aprire, partire, sentire.',
      'Alcuni verbi ammettono entrambi i modelli: applaudo/applaudisco.',
    ],
    examples: [
      { english: 'Io dormo otto ore.', translation: 'I sleep eight hours.' },
      {
        english: 'Lui capisce tutto.',
        translation: 'He understands everything.',
      },
      { english: 'Noi partiamo domani.', translation: 'We leave tomorrow.' },
    ],
    common_mistakes: [
      {
        wrong: 'Io capo tutto.',
        correct: 'Io capisco tutto.',
        note: 'Capire prende -isc-: capisco, non capo.',
      },
      {
        wrong: 'Loro dormiscono.',
        correct: 'Loro dormono.',
        note: 'Dormire non prende -isc-. La 3ª plurale è dormono.',
      },
    ],
    related: ['presente-are', 'presente-ere', 'verbi-riflessivi'],
  },
  {
    slug: 'verbi-riflessivi',
    title: 'Verbi riflessivi',
    level: 'A1',
    category: 'Tempi verbali',
    summary: 'Azioni che il soggetto compie su sé stesso.',
    structure: 'mi · ti · si · ci · vi · si + verbo',
    explanation:
      "I verbi riflessivi indicano un'azione su sé stessi. Pronomi: **mi, ti, si, ci, vi, si**.\n\n**lavarsi**: mi lavo, ti lavi, si lava, ci laviamo, vi lavate, si lavano.\n\nComuni: *alzarsi, svegliarsi, vestirsi, lavarsi, chiamarsi, divertirsi, sedersi, sentirsi, preoccuparsi.*",
    rules: [
      'Il pronome riflessivo precede il verbo: mi, ti, si, ci, vi, si.',
      'Alcuni verbi sono solo riflessivi: pentirsi, accorgersi.',
      "Con i modali il pronome può attaccarsi all'infinito: Devo alzarmi / Mi devo alzare.",
      'Al passato prossimo i riflessivi usano sempre essere.',
    ],
    examples: [
      { english: 'Mi chiamo Marco.', translation: 'My name is Marco.' },
      {
        english: 'A che ora ti alzi?',
        translation: 'What time do you get up?',
      },
      { english: 'Ci divertiamo molto.', translation: 'We have a lot of fun.' },
    ],
    common_mistakes: [
      {
        wrong: 'Io lavo le mani.',
        correct: 'Mi lavo le mani.',
        note: 'Lavarsi le mani richiede il pronome riflessivo in italiano.',
      },
      {
        wrong: 'Chiamo Marco.',
        correct: 'Mi chiamo Marco.',
        note: 'Chiamare senza pronome = telefonare. Per presentarsi serve chiamarsi.',
      },
    ],
    related: ['presente-are', 'presente-ire', 'verbi-modali'],
  },
  {
    slug: 'piacere',
    title: 'Il verbo piacere',
    level: 'A1',
    category: 'Tempi verbali',
    summary:
      'Esprimere gusti e preferenze con la costruzione particolare di piacere.',
    explanation:
      "Il verbo **piacere** funziona al contrario dell'inglese: la cosa che piace è il soggetto.\n\n- **Mi piace** il gelato. (il gelato piace a me)\n- **Ti piacciono** i cani? (i cani piacciono a te)\n\n**piace** = singolare / infinito; **piacciono** = plurale.\n\nCon gli infiniti si usa sempre piace: *Mi piace cantare e ballare.*",
    rules: [
      'Piacere concorda con la cosa che piace (soggetto logico).',
      'La persona usa il pronome indiretto (mi, ti, gli, le, ci, vi, gli).',
      'Con infiniti si usa sempre piace al singolare.',
      'Negativo: non mi piace / non mi piacciono.',
    ],
    examples: [
      { english: 'Mi piace la pizza.', translation: 'I like pizza.' },
      { english: 'Ti piacciono i gatti?', translation: 'Do you like cats?' },
      {
        english: 'Non ci piace aspettare.',
        translation: "We don't like waiting.",
      },
    ],
    common_mistakes: [
      {
        wrong: 'Io piace la pizza.',
        correct: 'Mi piace la pizza.',
        note: "Non si dice 'io piace'. La costruzione è 'a me piace' → mi piace.",
      },
      {
        wrong: 'Mi piace i gatti.',
        correct: 'Mi piacciono i gatti.',
        note: 'Con soggetti plurali si usa piacciono, non piace.',
      },
    ],
    related: ['pronomi-indiretti', 'verbi-modali', 'condizionale-cortesia'],
  },
  {
    slug: 'verbi-modali',
    title: 'Verbi modali: dovere, potere, volere',
    level: 'A1',
    category: 'Verbi modali',
    summary: 'Esprimere necessità, possibilità e desiderio.',
    structure: 'dovere/potere/volere + infinito',
    explanation:
      "I verbi modali esprimono obbligo, possibilità e volontà. Seguiti dall'infinito senza preposizione.\n\n- **Dovere**: obbligo. *Devo studiare.*\n- **Potere**: possibilità. *Posso entrare?*\n- **Volere**: desiderio. *Voglio imparare l'italiano.*\n\nPresente irregolare:\n- dovere: devo, devi, deve, dobbiamo, dovete, devono.\n- potere: posso, puoi, può, possiamo, potete, possono.\n- volere: voglio, vuoi, vuole, vogliamo, volete, vogliono.",
    rules: [
      "I modali sono sempre seguiti dall'infinito senza preposizione.",
      'Con riflessivi: Devo alzarmi / Mi devo alzare.',
      "Nei tempi composti prendono l'ausiliare dell'infinito.",
      "Potere non ha l'imperativo.",
    ],
    examples: [
      {
        english: 'Devo andare a lavoro.',
        translation: 'I have to go to work.',
      },
      { english: 'Puoi aiutarmi?', translation: 'Can you help me?' },
      {
        english: "Voglio imparare l'italiano.",
        translation: 'I want to learn Italian.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Posso di entrare?',
        correct: 'Posso entrare?',
        note: 'I verbi modali non vogliono la preposizione di.',
      },
      {
        wrong: 'Devo mi alzare.',
        correct: 'Devo alzarmi. (o: Mi devo alzare.)',
        note: "Il pronome va prima del modale o dopo l'infinito.",
      },
    ],
    related: ['presente-are', 'verbi-riflessivi', 'condizionale-presente'],
  },
  {
    slug: 'anche-neanche',
    title: 'Anche / neanche',
    level: 'A1',
    category: 'Avanzato',
    summary: 'Esprimere accordo o disaccordo in italiano.',
    explanation:
      '**Anche** e **neanche** esprimono accordo/disaccordo.\n\n- **Anche io** = me too (accordo positivo): *Anche a me piace la pizza.*\n- **Neanche io** = me neither (accordo negativo): *Neanche a me piace il calcio.*\n\nAttenzione: *anche a me* (non *anche mi*), *anche a te*, *anche a lui*, ecc.',
    rules: [
      'Anche = accordo positivo; neanche/nemmeno/neppure = accordo negativo.',
      'Con pronomi indiretti si usa a: anche a me, neanche a te.',
      "Neanche contiene già la negazione: non serve 'non'.",
      'Risposta breve: Neanche io. / Anche a me.',
    ],
    examples: [
      {
        english: "Anch'io vado al cinema.",
        translation: "I'm going to the cinema too.",
      },
      {
        english: 'Anche a me piace il mare.',
        translation: 'I like the sea too.',
      },
      { english: "Neanch'io lo so.", translation: "I don't know either." },
    ],
    common_mistakes: [
      {
        wrong: 'Anche mi piace.',
        correct: 'Anche a me piace.',
        note: 'Con piacere si usa anche a me, non anche mi.',
      },
      {
        wrong: 'Non neanche io.',
        correct: 'Neanche io.',
        note: "Neanche ha già la negazione; non serve 'non'.",
      },
    ],
    related: ['piacere', 'comparativi', 'pronomi-indiretti'],
  },
  {
    slug: 'preposizioni-luogo',
    title: 'Preposizioni di luogo',
    level: 'A1',
    category: 'Preposizioni',
    summary:
      'A, in, da, su, sotto, tra/fra e le preposizioni articolate per descrivere luoghi.',
    explanation:
      'Preposizioni di luogo principali:\n\n- **a**: città e piccole isole: *Vivo a Roma. Vado a casa.*\n- **in**: paesi, regioni, luoghi chiusi: *Vivo in Italia. Sono in ufficio.*\n- **da**: persona, professionista: *Vado dal dottore.*\n- **su**: sopra: *Il libro è sul tavolo.*\n- **sotto**: al di sotto: *sotto il letto.*\n- **tra / fra**: in mezzo: *tra il bar e la banca.*\n\nPreposizioni articolate: *al, allo, alla, ai, agli, alle, del, nel, sul, dal.*',
    rules: [
      'A per città e isole piccole; in per nazioni e regioni.',
      'Da + articolo per persone: dal medico, dalla nonna.',
      'Su, sotto, tra/fra sono semplici.',
      'Mezzi di trasporto: in macchina, in autobus; ma: a piedi.',
    ],
    examples: [
      { english: 'Vivo a Firenze.', translation: 'I live in Florence.' },
      { english: 'Andiamo in Spagna.', translation: 'We are going to Spain.' },
      {
        english: 'Il libro è sul tavolo.',
        translation: 'The book is on the table.',
      },
      { english: 'Vado dal dentista.', translation: 'I go to the dentist.' },
    ],
    common_mistakes: [
      {
        wrong: 'Vivo in Roma.',
        correct: 'Vivo a Roma.',
        note: 'Con le città si usa a, non in.',
      },
      {
        wrong: 'Andiamo a Italia.',
        correct: 'Andiamo in Italia.',
        note: 'Con i paesi si usa in.',
      },
    ],
    related: [
      'articoli-determinativi',
      'ce-ci-sono',
      'articoli-indeterminativi',
    ],
  },
  {
    slug: 'imperativo-informale',
    title: 'Imperativo informale',
    level: 'A1',
    category: 'Tempi verbali',
    summary: 'Dare ordini e istruzioni in modo informale (tu).',
    structure:
      'Tu: -a (-are) / -i (-ere, -ire) · Noi: -iamo · Voi: -ate/ete/ite',
    explanation:
      "L'imperativo informale dà ordini a persone in confidenza.\n\n**Formazione:**\n- -are: tu parl**a**, noi parl**iamo**, voi parl**ate**\n- -ere: tu legg**i**, noi legg**iamo**, voi legg**ete**\n- -ire: tu dorm**i** / fin**isci**, noi dormiamo / finiamo, voi dormite / finite\n\n**Negativo (tu):** non + infinito: *Non parlare! Non dormire!*",
    rules: [
      'Il tu dei verbi in -are finisce in -a: Parla! Guarda! Ascolta!',
      'Il tu dei verbi in -ere e -ire finisce in -i: Leggi! Dormi!',
      "L'imperativo negativo del tu = non + infinito.",
      'Irregolari: essere → sii; avere → abbi; sapere → sappi.',
    ],
    examples: [
      {
        english: 'Ascolta questa canzone!',
        translation: 'Listen to this song!',
      },
      {
        english: 'Non parlare così in fretta!',
        translation: "Don't speak so fast!",
      },
      { english: 'Finiamo il lavoro!', translation: "Let's finish the work!" },
    ],
    common_mistakes: [
      {
        wrong: 'Non parli così!',
        correct: 'Non parlare così!',
        note: "L'imperativo negativo del tu usa l'infinito, non il presente.",
      },
      {
        wrong: 'Guardi il film! (a un amico)',
        correct: 'Guarda il film!',
        note: 'Agli amici si dà del tu; guardi è la forma di cortesia (Lei).',
      },
    ],
    related: [
      'presente-are',
      'imperativo-affermativo',
      'imperativo-negativo',
      'imperativo-pronomi',
    ],
  },
  {
    slug: 'numeri-ordinali',
    title: 'Numeri ordinali',
    level: 'A1',
    category: 'Aggettivi e avverbi',
    summary: 'Primo, secondo, terzo — ordinare e classificare in italiano.',
    explanation:
      "I numeri ordinali concordano in genere e numero con il nome.\n\n- primo/a, secondo/a, terzo/a, quarto/a, quinto/a, sesto/a, settimo/a, ottavo/a, nono/a, decimo/a.\n- Dall'11: undicesimo, dodicesimo, ventesimo, centesimo.\n\nAbbreviazioni: 1º (m), 1ª (f).\n\nUso: *il primo libro, la seconda porta a destra, il terzo piano.*",
    rules: [
      'I primi dieci ordinali hanno forme irregolari.',
      "Dall'11 in poi: numero + -esimo: undicesimo, dodicesimo.",
      "Vanno prima del nome con l'articolo: il primo giorno.",
      'Con re e papi senza articolo: Carlo quinto, Giovanni ventitreesimo.',
    ],
    examples: [
      {
        english: 'È la prima volta che vengo in Italia.',
        translation: "It's the first time I come to Italy.",
      },
      {
        english: 'Abito al terzo piano.',
        translation: 'I live on the third floor.',
      },
      {
        english: 'Il mio secondo figlio si chiama Luca.',
        translation: 'My second son is called Luca.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'La uno volta',
        correct: 'La prima volta',
        note: "L'ordinale di uno è primo, non uno.",
      },
      {
        wrong: 'Abito al tre piano.',
        correct: 'Abito al terzo piano.',
        note: 'Tre è cardinale; terzo è ordinale.',
      },
    ],
    related: [
      'aggettivi-descrittivi',
      'articoli-determinativi',
      'giorni-settimana',
    ],
  },
  {
    slug: 'futuro-semplice',
    title: 'Il futuro semplice',
    level: 'A1',
    category: 'Tempi verbali',
    summary: 'Parlare di eventi futuri e fare previsioni.',
    explanation:
      'Il futuro semplice si usa per eventi futuri, previsioni, promesse e ipotesi.\n\n**Formazione:**\n- -are: la A diventa E: parlerò, parlerai, parlerà, parleremo, parlerete, parleranno.\n- -ere: leggerò, leggerai...\n- -ire: dormirò, dormirai...\n\n**Irregolari principali:** essere (sarò), avere (avrò), andare (andrò), fare (farò), venire (verrò), volere (vorrò), potere (potrò), dovere (dovrò), sapere (saprò), vedere (vedrò), vivere (vivrò).',
    rules: [
      'I verbi in -are cambiano la a in e: parlare → parlerò.',
      'I verbi in -ere mantengono la e: leggere → leggerò.',
      'I verbi in -ire mantengono la i: dormire → dormirò.',
      '-ciare/-giare perdono la i: comincerò, mangerò.',
      '-care/-gare aggiungono h: cercherò, pagherò.',
    ],
    examples: [
      {
        english: 'Domani parlerò con il direttore.',
        translation: 'Tomorrow I will speak with the director.',
      },
      {
        english: 'La prossima settimana andremo al mare.',
        translation: 'Next week we will go to the beach.',
      },
      {
        english: 'Sarà molto felice di vederti.',
        translation: 'He will be very happy to see you.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Domani parlarò con lui.',
        correct: 'Domani parlerò con lui.',
        note: 'Per i verbi in -are la a diventa e al futuro.',
      },
      {
        wrong: 'La settimana prossima vado al mare.',
        correct: 'La settimana prossima andrò al mare.',
        note: 'Per eventi futuri certi si usa il futuro semplice.',
      },
    ],
    related: ['stare-per', 'condizionale-presente', 'presente-are'],
  },
  {
    slug: 'stare-per',
    title: 'Stare per + infinito',
    level: 'A1',
    category: 'Tempi verbali',
    summary: "Esprimere un'azione imminente, sul punto di accadere.",
    structure: 'stare (coniugato) + per + infinito',
    explanation:
      "La costruzione **stare per + infinito** esprime un'azione imminente.\n\n- *Sto per uscire.* = I'm about to go out.\n- *Stavo per chiamarti.* = I was about to call you.\n\nATTENZIONE: non corrisponde al present continuous! Per azioni in corso si usa **stare + gerundio**: *Sto mangiando*.",
    rules: [
      'Stare per + infinito = azione imminente.',
      'Stare + gerundio = azione in corso (non confondere).',
      'Si può usare anche al passato: Stavo per uscire quando ha chiamato.',
      'Non si usa per piani futuri generici.',
    ],
    examples: [
      { english: 'Sto per partire.', translation: "I'm about to leave." },
      {
        english: 'Il film sta per cominciare.',
        translation: 'The movie is about to start.',
      },
      {
        english: 'Stavamo per arrivare quando si è rotta la macchina.',
        translation: 'We were about to arrive when the car broke down.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Sto per studiando.',
        correct: 'Sto per studiare. (o: Sto studiando.)',
        note: "Stare per vuole l'infinito, non il gerundio.",
      },
      {
        wrong: 'Sto per andare al cinema stasera.',
        correct: 'Stasera vado al cinema.',
        note: 'Stare per si usa solo per azioni veramente imminenti.',
      },
    ],
    related: ['futuro-semplice', 'stare-gerundio'],
  },
  {
    slug: 'giorni-settimana',
    title: 'Giorni della settimana',
    level: 'A1',
    category: 'Sostantivi',
    summary: 'I giorni della settimana: uso con e senza articolo.',
    explanation:
      'Giorni: lunedì, martedì, mercoledì, giovedì, venerdì, sabato, domenica.\n\nTutti maschili tranne **domenica** (femminile).\n\n**Senza articolo:** giorno specifico. *Venerdì vado al cinema.*\n**Con articolo:** azione abituale. *Il lunedì vado in palestra.*\n\nNon prendono la maiuscola in italiano.',
    rules: [
      'Tutti i giorni sono maschili tranne domenica.',
      'Senza articolo: giorno specifico.',
      'Con articolo: azione abituale o ripetuta.',
      'Non si scrivono con la lettera maiuscola.',
    ],
    examples: [
      {
        english: 'Lunedì vado dal dentista.',
        translation: "On Monday I'm going to the dentist.",
      },
      {
        english: 'Il sabato dormo fino a tardi.',
        translation: 'On Saturdays I sleep late.',
      },
      {
        english: 'La domenica andiamo a messa.',
        translation: 'On Sundays we go to church.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Lunedì vado in palestra. (intendendo ogni lunedì)',
        correct: 'Il lunedì vado in palestra.',
        note: "Senza articolo indica un giorno specifico; per l'abitudine serve l'articolo.",
      },
      {
        wrong: 'Il Domenica vado a messa.',
        correct: 'La domenica vado a messa.',
        note: 'Domenica è femminile: la domenica.',
      },
    ],
    related: [
      'numeri-ordinali',
      'preposizioni-luogo',
      'articoli-determinativi',
    ],
  },
  {
    slug: 'passato-prossimo-avere',
    title: 'Passato prossimo con avere',
    level: 'A2',
    category: 'Tempi verbali',
    summary: "Esprimere azioni passate con l'ausiliare avere.",
    structure:
      'avere (presente) + participio passato\nho / hai / ha / abbiamo / avete / hanno + participio',
    explanation:
      'Il **passato prossimo** esprime azioni passate concluse e rilevanti nel presente.\n\nLa maggior parte dei verbi transitivi usa **avere**:\n- *Ho mangiato la pizza.*\n- *Hai visto quel film?*\n\n**Participio passato regolare:**\n- -are → -ato: parlato\n- -ere → -uto: creduto\n- -ire → -ito: dormito\n\nCon avere, il participio di solito resta invariato (maschile singolare).',
    rules: [
      'Avere + participio passato per la maggior parte dei verbi transitivi.',
      'Participio passato regolare: -ato, -uto, -ito.',
      'Con avere, il participio di solito rimane invariato.',
      "Con pronomi diretti lo, la, li, le, il participio concorda: L'ho vista.",
    ],
    examples: [
      {
        english: 'Ho mangiato una pizza buonissima.',
        translation: 'I ate a delicious pizza.',
      },
      {
        english: 'Hai finito i compiti?',
        translation: 'Have you finished your homework?',
      },
      {
        english: "Abbiamo visitato Roma l'anno scorso.",
        translation: 'We visited Rome last year.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Io ho andato al cinema.',
        correct: 'Sono andato al cinema.',
        note: 'Andare usa essere, non avere.',
      },
      {
        wrong: 'Ho vista la ragazza.',
        correct: 'Ho visto la ragazza.',
        note: 'Con avere il participio non concorda con il soggetto.',
      },
    ],
    related: ['passato-prossimo-essere', 'participi-irregolari', 'imperfetto'],
  },
  {
    slug: 'passato-prossimo-essere',
    title: 'Passato prossimo con essere',
    level: 'A2',
    category: 'Tempi verbali',
    summary:
      "Esprimere azioni passate con l'ausiliare essere e la concordanza del participio.",
    structure:
      'essere (presente) + participio passato (concordato)\nsono/sei/è/siamo/siete/sono + participio (-o/-a/-i/-e)',
    explanation:
      'Alcuni verbi usano **essere**. Con essere, il participio concorda in genere e numero con il soggetto.\n\nUsano essere:\n- Movimento: *andare, venire, arrivare, partire, tornare, entrare, uscire.*\n- Stato: *essere, stare, restare, rimanere.*\n- Cambiamento: *diventare, nascere, morire, crescere.*\n- Riflessivi: *alzarsi, svegliarsi, lavarsi.*\n- Impersonali: *piacere, sembrare, succedere.*',
    rules: [
      'Con essere, il participio concorda con il soggetto in genere e numero.',
      'I verbi riflessivi usano sempre essere.',
      'Verbi intransitivi di movimento e stato → essere.',
      'Al femminile: sono andata, sei arrivata, si è svegliata.',
    ],
    examples: [
      {
        english: 'Sono andato al mercato.',
        translation: 'I went to the market.',
      },
      {
        english: 'Maria è arrivata ieri.',
        translation: 'Maria arrived yesterday.',
        note: 'arrivata: femminile',
      },
      { english: 'Ci siamo alzati presto.', translation: 'We got up early.' },
    ],
    common_mistakes: [
      {
        wrong: 'Ho andato a casa.',
        correct: 'Sono andato a casa.',
        note: 'Andare usa essere come ausiliare.',
      },
      {
        wrong: 'Maria è arrivato.',
        correct: 'Maria è arrivata.',
        note: 'Con essere il participio deve concordare con il soggetto femminile.',
      },
    ],
    related: [
      'passato-prossimo-avere',
      'participi-irregolari',
      'verbi-riflessivi',
    ],
  },
  {
    slug: 'participi-irregolari',
    title: 'Participi passati irregolari',
    level: 'A2',
    category: 'Tempi verbali',
    summary: 'I principali participi passati irregolari da memorizzare.',
    explanation:
      'Molti verbi italiani hanno il participio passato irregolare:\n\n- aprire → aperto\n- bere → bevuto\n- chiedere → chiesto\n- chiudere → chiuso\n- correre → corso\n- decidere → deciso\n- dire → detto\n- fare → fatto\n- leggere → letto\n- mettere → messo\n- morire → morto\n- nascere → nato\n- prendere → preso\n- ridere → riso\n- rimanere → rimasto\n- rispondere → risposto\n- rompere → rotto\n- scegliere → scelto\n- scendere → sceso\n- scrivere → scritto\n- vedere → visto (o veduto)\n- venire → venuto\n- vincere → vinto\n- vivere → vissuto',
    rules: [
      'I verbi in -ere hanno le maggiori irregolarità.',
      'Molti participi irregolari finiscono in -so, -to, -sto.',
      "Serve memorizzarli insieme all'infinito.",
      'Alcuni verbi hanno doppio participio: visto/veduto, perso/perduto.',
    ],
    examples: [
      { english: 'Ho letto un bel libro.', translation: 'I read a nice book.' },
      {
        english: 'Hai visto quel film?',
        translation: 'Have you seen that movie?',
      },
      { english: 'Che cosa hai detto?', translation: 'What did you say?' },
    ],
    common_mistakes: [
      {
        wrong: 'Ho leggito un libro.',
        correct: 'Ho letto un libro.',
        note: 'Il participio di leggere è letto, non leggito.',
      },
      {
        wrong: 'Ho apruto la finestra.',
        correct: 'Ho aperto la finestra.',
        note: 'Aprire ha il participio irregolare aperto.',
      },
    ],
    related: [
      'passato-prossimo-avere',
      'passato-prossimo-essere',
      'imperfetto',
    ],
  },
  {
    slug: 'imperfetto',
    title: "L'imperfetto",
    level: 'A2',
    category: 'Tempi verbali',
    summary: 'Descrivere azioni abituali, descrizioni e contesti nel passato.',
    structure:
      '-are → -avo/-avi/-ava/-avamo/-avate/-avano\n-ere → -evo/-evi/-eva/-evamo/-evate/-evano\n-ire → -ivo/-ivi/-iva/-ivamo/-ivate/-ivano',
    explanation:
      "L'**imperfetto** si usa per:\n- Azioni abituali: *Da bambino giocavo a calcio.*\n- Descrizioni: *La casa era grande.*\n- Contesto: *Mentre mangiavo, è arrivato Marco.*\n- Stati d'animo: *Avevo fame. Faceva freddo.*\n\nFormazione regolarissima; solo essere è irregolare: ero, eri, era, eravamo, eravate, erano.",
    rules: [
      "L'imperfetto è il più regolare dei tempi italiani.",
      'Si usa per azioni ripetute, descrizioni e contesto.',
      'Non si usa per azioni puntuali e concluse (passato prossimo).',
      'Essere è irregolare: ero, eri, era...',
    ],
    examples: [
      {
        english: 'Da piccola giocavo con le bambole.',
        translation: 'As a child I used to play with dolls.',
      },
      {
        english: 'Era una giornata bellissima.',
        translation: 'It was a beautiful day.',
      },
      {
        english: 'Mentre studiavo, ha squillato il telefono.',
        translation: 'While I was studying, the phone rang.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Ieri andavo al cinema.',
        correct: 'Ieri sono andato al cinema.',
        note: "Per azione puntuale conclusa si usa il passato prossimo, non l'imperfetto.",
      },
      {
        wrong: 'Eravamo andati a Roma.',
        correct: 'Eravamo a Roma.',
        note: 'Non confondere imperfetto e trapassato prossimo.',
      },
    ],
    related: [
      'passato-prossimo-vs-imperfetto',
      'marcatori-temporali',
      'passato-prossimo-avere',
    ],
  },
  {
    slug: 'passato-prossimo-vs-imperfetto',
    title: 'Passato prossimo vs imperfetto',
    level: 'A2',
    category: 'Tempi verbali',
    summary: "Capire quando usare il passato prossimo e quando l'imperfetto.",
    explanation:
      "Una delle distinzioni più difficili dell'italiano.\n\n**Passato prossimo:** azione puntuale, conclusa: *Ieri ho comprato un libro.*\n\n**Imperfetto:** azione abituale, descrizione, contesto: *Da bambino compravo caramelle.*\n\nEsempio classico:\n*Mentre **leggevo** (imperfetto — contesto), **è entrato** (passato prossimo — azione) mio padre.*",
    rules: [
      'Passato prossimo: che cosa è successo? (evento).',
      "Imperfetto: com'era la situazione? (descrizione/contesto).",
      "Con 'mentre' quasi sempre imperfetto.",
      'Indicatori: ieri → pass. prossimo; da bambino, sempre → imperfetto.',
    ],
    examples: [
      {
        english: 'Ieri ho visto un film bellissimo.',
        translation: 'Yesterday I saw a wonderful film.',
        note: 'pass. prossimo: evento',
      },
      {
        english: 'Da giovane andavo sempre al mare.',
        translation: 'When I was young I always went to the beach.',
        note: 'imperfetto: abitudine',
      },
      {
        english: 'Mentre pioveva, sono uscito.',
        translation: 'While it was raining, I went out.',
        note: 'imperfetto + pass. prossimo',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Ieri mangiavo la pizza con gli amici.',
        correct: 'Ieri ho mangiato la pizza con gli amici.',
        note: '"Ieri" indica evento concluso → passato prossimo.',
      },
      {
        wrong: 'Quando ero piccolo, ho giocato a calcio ogni giorno.',
        correct: 'Quando ero piccolo, giocavo a calcio ogni giorno.',
        note: '"Ogni giorno" indica abitudine → imperfetto.',
      },
    ],
    related: [
      'passato-prossimo-avere',
      'passato-prossimo-essere',
      'imperfetto',
      'marcatori-temporali',
    ],
  },
  {
    slug: 'marcatori-temporali',
    title: 'Marcatori temporali',
    level: 'A2',
    category: 'Avanzato',
    summary:
      'Usare gli indicatori di tempo corretti con i diversi tempi verbali.',
    explanation:
      "I marcatori temporali suggeriscono il tempo verbale da usare.\n\n**Passato prossimo:** ieri, l'altro ieri, ... fa, la settimana scorsa, il mese scorso, l'anno scorso, stamattina, poco fa, appena.\n\n**Imperfetto:** da bambino/a, da giovane, a quell'epoca, negli anni '90, ogni giorno, sempre, spesso, di solito, mentre, tutti i giorni.\n\n**Futuro:** domani, dopodomani, la settimana prossima, il mese prossimo, l'anno prossimo, tra poco, stasera.",
    rules: [
      'Ieri, la settimana scorsa → passato prossimo.',
      'Da bambino, sempre, ogni giorno → imperfetto.',
      'Domani, la settimana prossima → futuro semplice.',
      'Appena, poco fa → passato prossimo (prossimità).',
    ],
    examples: [
      {
        english: 'Due giorni fa ho visto Carlo.',
        translation: 'Two days ago I saw Carlo.',
      },
      {
        english: "Negli anni '90 vivevo a Milano.",
        translation: "In the '90s I lived in Milan.",
      },
      {
        english: 'La settimana prossima andremo a Parigi.',
        translation: 'Next week we will go to Paris.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Ieri andavo al supermercato.',
        correct: 'Ieri sono andato al supermercato.',
        note: 'Ieri indica evento puntuale, non abitudine.',
      },
      {
        wrong: 'Da bambino ho giocato sempre fuori.',
        correct: 'Da bambino giocavo sempre fuori.',
        note: 'Da bambino + sempre → abitudine passata = imperfetto.',
      },
    ],
    related: [
      'passato-prossimo-vs-imperfetto',
      'passato-prossimo-avere',
      'imperfetto',
      'futuro-semplice',
    ],
  },
  {
    slug: 'pronomi-diretti',
    title: 'Pronomi diretti',
    level: 'A2',
    category: 'Pronomi',
    summary:
      'Mi, ti, lo, la, ci, vi, li, le — sostituire il complemento oggetto.',
    structure: 'mi · ti · lo/la · ci · vi · li/le (La formale)',
    explanation:
      "I pronomi diretti sostituiscono il complemento oggetto (*chi? che cosa?*).\n\n- **mi** = me, **ti** = te, **lo** = lui, **la** = lei, **ci** = noi, **vi** = voi, **li** = loro (m), **le** = loro (f).\n\n*Vedi Marco? — Sì, **lo** vedo.*\n\nPosizione: di solito prima del verbo. Con infinito/imperativo possono seguire: *Voglio vederlo.* Con passato prossimo il participio concorda con lo/la/li/le: *L'ho vista.*",
    rules: [
      'I pronomi diretti di solito precedono il verbo coniugato.',
      "Con l'infinito e l'imperativo: possono seguire il verbo.",
      'Con passato prossimo, il participio concorda con lo, la, li, le.',
      "Lo e la si apostrofano davanti a vocale o H: l'ho visto.",
    ],
    examples: [
      {
        english: 'Conosci Luca? — Sì, lo conosco.',
        translation: 'Do you know Luca? — Yes, I know him.',
      },
      {
        english: "Hai visto la partita? — No, non l'ho vista.",
        translation: "Did you see the match? — No, I didn't see it.",
      },
      {
        english: "Dov'è il libro? — L'ho messo sul tavolo.",
        translation: 'Where is the book? — I put it on the table.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Conosci Maria? — Sì, conosco lei.',
        correct: 'Conosci Maria? — Sì, la conosco.',
        note: 'Invece di ripetere il nome si usa il pronome diretto.',
      },
      {
        wrong: 'Hai visto le ragazze? — Sì, li ho viste.',
        correct: 'Hai visto le ragazze? — Sì, le ho viste.',
        note: 'Le per femminile plurale; li è maschile plurale.',
      },
    ],
    related: ['pronomi-indiretti', 'pronomi-combinati', 'imperativo-pronomi'],
  },
  {
    slug: 'pronomi-indiretti',
    title: 'Pronomi indiretti',
    level: 'A2',
    category: 'Pronomi',
    summary: 'Mi, ti, gli, le, ci, vi, gli — il complemento di termine.',
    structure: 'mi · ti · gli/le · ci · vi · gli (Le formale)',
    explanation:
      'I pronomi indiretti rispondono a *a chi? a che cosa?*\n\n- **mi** = a me, **ti** = a te, **gli** = a lui, **le** = a lei, **ci** = a noi, **vi** = a voi, **gli** = a loro.\n\n*Do il libro a Marco → **Gli** do il libro.*\n*Scrivo a Maria → **Le** scrivo.*',
    rules: [
      'I pronomi indiretti precedono il verbo coniugato.',
      "Gli per 'a lui' e 'a loro' (uso moderno).",
      "Le per 'a lei' e 'a Lei' (formale).",
      'Con piacere e verbi simili si usano i pronomi indiretti: Mi piace.',
    ],
    examples: [
      {
        english: 'Gli ho dato il mio numero.',
        translation: 'I gave him my number.',
      },
      {
        english: 'Che cosa le hai detto?',
        translation: 'What did you say to her?',
      },
      {
        english: 'Vi porto un regalo.',
        translation: "I'll bring you a present.",
      },
    ],
    common_mistakes: [
      {
        wrong: 'Ho dato a lui il libro.',
        correct: 'Gli ho dato il libro.',
        note: 'Si usa il pronome indiretto gli invece di a lui.',
      },
      {
        wrong: 'A Maria le ho detto tutto.',
        correct: 'A Maria ho detto tutto. (o: Le ho detto tutto.)',
        note: 'Non si può usare insieme il nome e il pronome (dislocazione).',
      },
    ],
    related: ['pronomi-diretti', 'pronomi-combinati', 'piacere'],
  },
  {
    slug: 'pronomi-combinati',
    title: 'Pronomi combinati',
    level: 'A2',
    category: 'Pronomi',
    summary: 'Unire pronomi diretti e indiretti: me lo, te la, glielo, ecc.',
    structure:
      'me lo/la/li/le · te lo/la/li/le · glielo/gliela/glieli/gliele · ce lo/la/li/le · ve lo/la/li/le',
    explanation:
      'Pronome indiretto + diretto = pronome combinato.\n\n- mi + lo → **me lo**: *Me lo dai?*\n- ti + la → **te la**: *Te la porto.*\n- gli/le + lo → **glielo**: *Glielo dico.*\n- ci + li → **ce li**: *Ce li ha portati.*\n- vi + le → **ve le**: *Ve le mando.*',
    rules: [
      'Il pronome indiretto cambia: mi→me, ti→te, gli→glie, ci→ce, vi→ve.',
      'Glielo si scrive tutto attaccato.',
      "Con tempi composti il participio concorda con il diretto: Gliel'ho data.",
      'Con imperativo e infinito seguono il verbo: Dammelo, Voglio dartelo.',
    ],
    examples: [
      {
        english: 'Me lo presti il libro?',
        translation: 'Can you lend me the book?',
      },
      {
        english: "Gliel'ho detto ieri.",
        translation: 'I told him/her yesterday.',
      },
      {
        english: 'Ce li ha portati Maria.',
        translation: 'Maria brought them to us.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Mi lo dai?',
        correct: 'Me lo dai?',
        note: 'Mi diventa me quando è seguito da un altro pronome.',
      },
      {
        wrong: 'Gli lo dico.',
        correct: 'Glielo dico.',
        note: 'Gli + lo diventa sempre glielo, tutto unito.',
      },
    ],
    related: ['pronomi-diretti', 'pronomi-indiretti', 'imperativo-pronomi'],
  },
  {
    slug: 'comparativi',
    title: 'Comparativi',
    level: 'A2',
    category: 'Aggettivi e avverbi',
    summary: 'Confrontare persone, cose e azioni in italiano.',
    structure: 'più/meno + aggettivo + di/che',
    explanation:
      '**Maggioranza:** più + agg + **di** (nomi) / **che** (verbi, agg): *più alto di Luca / più bello viaggiare che restare.*\n\n**Minoranza:** meno + agg + di/che.\n\n**Uguaglianza:** (così) + agg + **come** / (tanto) + agg + **quanto**: *alto come te / tanto alto quanto te.*\n\n**Irregolari:** buono → migliore, cattivo → peggiore, grande → maggiore, piccolo → minore.',
    rules: [
      'Più... di per confrontare due nomi diversi.',
      'Più... che per confrontare due aggettivi, verbi o avverbi.',
      "Così... come / tanto... quanto per l'uguaglianza.",
      'Comparativi irregolari: buono → migliore, cattivo → peggiore.',
    ],
    examples: [
      {
        english: 'Roma è più grande di Firenze.',
        translation: 'Rome is bigger than Florence.',
      },
      {
        english: 'È meno caro che veloce.',
        translation: "It's less expensive than it is fast.",
      },
      { english: 'Sono alto come te.', translation: "I'm as tall as you." },
    ],
    common_mistakes: [
      {
        wrong: 'Sono più alto che te.',
        correct: 'Sono più alto di te.',
        note: 'Tra due pronomi personali si usa di, non che.',
      },
      {
        wrong: 'Lei è più buona di me.',
        correct: 'Lei è migliore di me.',
        note: 'Buono ha il comparativo irregolare migliore.',
      },
    ],
    related: ['superlativi', 'cosi-come', 'aggettivi-descrittivi'],
  },
  {
    slug: 'superlativi',
    title: 'Superlativi',
    level: 'A2',
    category: 'Aggettivi e avverbi',
    summary: 'Esprimere il massimo o minimo grado di una qualità.',
    structure:
      'Articolo + più/meno + aggettivo (+ di + gruppo)\nAggettivo + -issimo/a/i/e',
    explanation:
      '**Superlativo relativo:** il più/meno + agg + di: *il più alto della classe.*\n\n**Superlativo assoluto:**\n- -issimo: *bellissimo, grandissimo.*\n- molto, estremamente + agg: *molto bello.*\n- prefissi super-, stra-, ultra-: *superveloce, stracolmo.*\n\n**Forme irregolari:** buono → ottimo/migliore, cattivo → pessimo/peggiore, grande → massimo/maggiore, piccolo → minimo/minore.',
    rules: [
      'Superlativo relativo: articolo + più/meno + aggettivo + di.',
      'Superlativo assoluto: -issimo, molto + aggettivo, prefissi.',
      'Aggettivi in -co/-go aggiungono H: stanchissimo, larghissimo.',
      'Forme irregolari: buono → ottimo; cattivo → pessimo.',
    ],
    examples: [
      {
        english: 'È il ristorante più famoso di Milano.',
        translation: "It's the most famous restaurant in Milan.",
      },
      {
        english: 'Questo gelato è buonissimo!',
        translation: 'This ice cream is really good!',
      },
      {
        english: 'È la meno cara delle tre.',
        translation: "It's the least expensive of the three.",
      },
    ],
    common_mistakes: [
      {
        wrong: 'È il più migliore.',
        correct: 'È il migliore.',
        note: 'Migliore è già superlativo; non si dice più migliore.',
      },
      {
        wrong: 'Questo caffè è molto ottimo.',
        correct: 'Questo caffè è ottimo.',
        note: 'Ottimo è già superlativo assoluto; non si rafforza.',
      },
    ],
    related: ['comparativi', 'cosi-come', 'aggettivi-descrittivi'],
  },
  {
    slug: 'cosi-come',
    title: 'Così... come / tanto... quanto',
    level: 'A2',
    category: 'Aggettivi e avverbi',
    summary: 'Costruzioni comparative di uguaglianza in italiano.',
    structure:
      '(così) + aggettivo/avverbio + come\n(tanto) + aggettivo/avverbio + quanto\n(tanto) + nome + quanto',
    explanation:
      'Comparativo di uguaglianza:\n\n- **(così) + agg/avv + come**: *Sei (così) alto come me.*\n- **(tanto) + agg/avv + quanto**: *Sei (tanto) alto quanto me.*\n- **tanto + nome + quanto**: *Ho tanti soldi quanto te.*\n\nCosì e tanto possono essere omessi nel parlato.',
    rules: [
      'Così... come e tanto... quanto sono intercambiabili.',
      'Così e tanto possono essere omessi.',
      'Con i nomi si usa solo tanto... quanto.',
      "Non si usa 'più come' o 'meno come'.",
    ],
    examples: [
      {
        english: 'Sei intelligente come tua sorella.',
        translation: "You're as intelligent as your sister.",
      },
      {
        english: 'Ho tanto lavoro quanto te.',
        translation: 'I have as much work as you.',
      },
      {
        english: 'Parla italiano bene quanto un madrelingua.',
        translation: 'He speaks Italian as well as a native speaker.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Sono alto tanto come te.',
        correct: 'Sono alto come te. (o: tanto alto quanto te.)',
        note: 'Non mischiare le costruzioni: come con così, quanto con tanto.',
      },
      {
        wrong: 'È bravo così quanto lui.',
        correct: 'È bravo come lui.',
        note: 'Così si usa con come, non con quanto.',
      },
    ],
    related: ['comparativi', 'superlativi', 'aggettivi-descrittivi'],
  },
  {
    slug: 'imperativo-affermativo',
    title: 'Imperativo affermativo',
    level: 'A2',
    category: 'Tempi verbali',
    summary:
      'Dare comandi, istruzioni e consigli in modo diretto e affermativo.',
    structure:
      'Tu: -a (-are) / -i (-ere, -ire)\nLei: -i (-are) / -a (-ere, -ire)\nNoi: -iamo\nVoi: -ate / -ete / -ite\nLoro: -ino (-are) / -ano (-ere, -ire)',
    explanation:
      "L'imperativo affermativo dà ordini e consigli.\n\n**Forme regolari:**\n- Tu: parl**a**! legg**i**! dorm**i**! fin**isci**!\n- Lei: parl**i**! legg**a**! dorm**a**! fin**isca**!\n- Noi: parl**iamo**! legg**iamo**!\n- Voi: parl**ate**! legg**ete**! dorm**ite**!\n\n**Irregolari comuni:** essere (sii), avere (abbi), andare (va'/vai), fare (fa'/fai), dire (di'), dare (da'/dai), stare (sta'/stai).",
    rules: [
      'Il tu dei verbi in -are prende -a.',
      'Il tu dei verbi in -ere e -ire prende -i.',
      'La forma di cortesia Lei inverte le vocali: -are→-i, -ere/-ire→-a.',
      'Con i pronomi, questi si attaccano alla fine: Dimmelo! Prendilo!',
    ],
    examples: [
      { english: 'Parla più lentamente!', translation: 'Speak more slowly!' },
      {
        english: "Scusi, dov'è la stazione?",
        translation: 'Excuse me, where is the station?',
        note: 'Lei formale',
      },
      { english: 'Prendiamo un caffè!', translation: "Let's have a coffee!" },
    ],
    common_mistakes: [
      {
        wrong: "Scusa, dov'è il bagno? (a uno sconosciuto)",
        correct: "Scusi, dov'è il bagno?",
        note: 'Con sconosciuti si usa la forma di cortesia Lei.',
      },
      {
        wrong: 'Aspetta! (tu) — da aspettare',
        correct: 'Aspetta!',
        note: "L'imperativo tu di aspettare è aspetta (regolare in -a).",
      },
    ],
    related: [
      'imperativo-informale',
      'imperativo-negativo',
      'imperativo-pronomi',
    ],
  },
  {
    slug: 'imperativo-negativo',
    title: 'Imperativo negativo',
    level: 'A2',
    category: 'Tempi verbali',
    summary: 'Vietare o sconsigliare qualcosa: non + infinito per il tu.',
    structure: 'Tu: non + infinito\nLei/Noi/Voi/Loro: non + imperativo',
    explanation:
      "L'imperativo negativo:\n\n- **Tu informale:** **non + infinito**. *Non parlare! Non uscire!*\n- **Altre persone:** non + imperativo affermativo. *Non parli! Non usciamo!*\n\nCon i pronomi:\n- Tu: *Non farlo! / Non lo fare!*\n- Voi: *Non fatelo!*",
    rules: [
      'Il tu negativo si forma con non + infinito.',
      'Lei, noi, voi, loro: non + forma imperativa.',
      'Con i pronomi: tu → non + infinito + pronome o non + pronome + infinito.',
      'Non confondere tu negativo con Lei: Non parlare! (tu) vs Non parli! (Lei).',
    ],
    examples: [
      { english: 'Non preoccuparti!', translation: "Don't worry!" },
      { english: 'Non dite niente!', translation: "Don't say anything!" },
      {
        english: 'Signora, non si preoccupi!',
        translation: "Ma'am, don't worry!",
      },
    ],
    common_mistakes: [
      {
        wrong: 'Non parli così! (a un amico)',
        correct: 'Non parlare così!',
        note: "Il tu negativo usa l'infinito; non parli è Lei.",
      },
      {
        wrong: 'Non ti preoccupa!',
        correct: 'Non preoccuparti! (o: Non ti preoccupare!)',
        note: 'Preoccuparsi è riflessivo; il pronome va dopo infinito o prima.',
      },
    ],
    related: [
      'imperativo-affermativo',
      'imperativo-informale',
      'imperativo-pronomi',
    ],
  },
  {
    slug: 'imperativo-pronomi',
    title: "L'imperativo con i pronomi",
    level: 'A2',
    category: 'Pronomi',
    summary: "Attaccare i pronomi all'imperativo: posizione e forme speciali.",
    explanation:
      "Con l'imperativo, i pronomi si attaccano **dopo** il verbo (tu, noi, voi).\n\n- Tu: *Prendi**lo**! Mangia**la**!*\n- Noi: *Prendia**molo**!* (la -mo perde la o)\n- Voi: *Prende**telo**!*\n\nCon l'imperativo troncato (da', di', fa', sta', va'), la consonante del pronome raddoppia: *dammi, dimmi, fallo, stacci, vattene.*\n\nForma negativa (tu): *Non lo prendere!* o *Non prenderlo!*",
    rules: [
      'Con tu, noi, voi: il pronome si attacca dopo.',
      'Con noi, la -mo perde la o: mangiamo + lo → mangiamolo.',
      "Con imperativo troncato, raddoppia la consonante: da' + mi → dammi.",
      'Con il Lei formale, il pronome di solito precede: Lo prenda!',
    ],
    examples: [
      { english: 'Prendilo!', translation: 'Take it!' },
      { english: 'Dammi una mano!', translation: 'Give me a hand!' },
      {
        english: 'Mangiamola subito!',
        translation: "Let's eat it right away!",
      },
      { english: 'Signore, lo guardi!', translation: 'Sir, look at it!' },
    ],
    common_mistakes: [
      {
        wrong: 'Da mi il libro.',
        correct: 'Dammi il libro.',
        note: "Con imperativo troncato (da') la consonante raddoppia: da' + mi → dammi.",
      },
      {
        wrong: 'Prendiamolo! (da prendiamo + lo)',
        correct: 'Prendiamolo!',
        note: 'Con il noi la -mo perde la vocale prima del pronome.',
      },
    ],
    related: [
      'imperativo-affermativo',
      'imperativo-negativo',
      'pronomi-combinati',
    ],
  },
  {
    slug: 'condizionale-presente',
    title: 'Condizionale presente',
    level: 'A2',
    category: 'Condizionali',
    summary: 'Esprimere desideri, richieste cortesi e situazioni ipotetiche.',
    structure:
      '-are/-ere → -erei/-eresti/-erebbe/-eremmo/-ereste/-erebbero\n-ire → -irei/-iresti/-irebbe/-iremmo/-ireste/-irebbero',
    explanation:
      'Il condizionale presente esprime desideri, cortesia, consigli.\n\n- Desideri: *Mi piacerebbe andare in Italia.*\n- Cortesia: *Potresti aiutarmi?*\n- Consigli: *Dovresti studiare di più.*\n\n**Formazione:**\n- -are: parlerei, parleresti...\n- -ere: leggerei...\n- -ire: dormirei...\n\n**Irregolari:** essere (sarei), avere (avrei), andare (andrei), fare (farei), dovere (dovrei), potere (potrei), volere (vorrei), sapere (saprei), vedere (vedrei), vivere (vivrei).',
    rules: [
      'I verbi in -are cambiano la a in e: parlerei.',
      'I verbi in -ere e -ire mantengono la vocale tematica.',
      'Desideri, cortesia, consigli.',
      'Con periodo ipotetico (2º tipo) si abbina al congiuntivo imperfetto.',
    ],
    examples: [
      {
        english: 'Vorrei un caffè, per favore.',
        translation: 'I would like a coffee, please.',
      },
      {
        english: 'Potresti chiudere la finestra?',
        translation: 'Could you close the window?',
      },
      {
        english: 'Mi piacerebbe visitare Venezia.',
        translation: 'I would like to visit Venice.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Vorrei che tu mi aiuti.',
        correct: 'Vorrei che tu mi aiutassi.',
        note: 'Dopo vorrei che si usa il congiuntivo imperfetto.',
      },
      {
        wrong: 'Io volerei un caffè.',
        correct: 'Io vorrei un caffè.',
        note: 'Volere ha il condizionale irregolare: vorrei, non volerei.',
      },
    ],
    related: [
      'condizionale-cortesia',
      'vorrei',
      'congiuntivo-imperfetto',
      'periodo-ipotetico-1',
    ],
  },
  {
    slug: 'condizionale-cortesia',
    title: 'Condizionale di cortesia',
    level: 'A2',
    category: 'Condizionali',
    summary:
      'Usare il condizionale per fare richieste educate e ammorbidire il tono.',
    explanation:
      "Il condizionale ammorbidisce le richieste.\n\n- Ordinare: *Prenderei un antipasto.*\n- Informazioni: *Saprebbe dirmi dov'è la stazione?*\n- Proposte: *Ti andrebbe di uscire?*\n- Opinioni caute: *Direi che è meglio aspettare.*\n\nVerbi più usati: vorrei, potresti, piacerebbe, dispiacerebbe.",
    rules: [
      'Il condizionale rende le richieste più gentili.',
      'Vorrei è la forma più comune di richiesta cortese.',
      'Potresti + infinito = could you...?',
      'Ti andrebbe? / Andrebbe bene? sono forme colloquiali cortesi.',
    ],
    examples: [
      {
        english: 'Vorrei un tavolo per due, per favore.',
        translation: 'I would like a table for two, please.',
      },
      {
        english: 'Mi potrebbe portare il conto?',
        translation: 'Could you bring me the bill?',
      },
      {
        english: 'Ti andrebbe di prendere un caffè?',
        translation: 'Would you like to have a coffee?',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Voglio un caffè. (in modo brusco)',
        correct: 'Vorrei un caffè, per favore.',
        note: 'Voglio è diretto e può suonare maleducato. Vorrei è sempre meglio.',
      },
      {
        wrong: 'Posso avere un caffè?',
        correct: 'Potrei avere un caffè? (o: Vorrei un caffè.)',
        note: 'Posso è più diretto; potrei o vorrei è più educato.',
      },
    ],
    related: ['condizionale-presente', 'vorrei', 'verbi-modali'],
  },
  {
    slug: 'vorrei',
    title: 'Vorrei: il condizionale di volere',
    level: 'A2',
    category: 'Condizionali',
    summary:
      'La parola magica per chiedere educatamente qualsiasi cosa in italiano.',
    structure: 'vorrei + nome/infinito · vorrei + che + congiuntivo imperfetto',
    explanation:
      "**Vorrei** è la forma più utile del condizionale:\n\n1. **Ordinare:** *Vorrei un caffè.*\n2. **Desiderio:** *Vorrei imparare l'italiano.*\n3. **Desiderio per altri** (congiuntivo!): *Vorrei che tu venissi.*\n\nDifferenza fondamentale:\n- *Vorrei* + nome/infinito = desiderio semplice.\n- *Vorrei che* + congiuntivo imperfetto = soggetti diversi.",
    rules: [
      'Vorrei + nome: Vorrei un gelato.',
      'Vorrei + infinito: Vorrei andare al mare.',
      'Vorrei che + congiuntivo imperfetto (soggetti diversi).',
      'Non usare vorrei con se ipotetico: Se potessi, andrei (non: Se potrei, vorrei).',
    ],
    examples: [
      {
        english: "Vorrei un bicchiere d'acqua.",
        translation: 'I would like a glass of water.',
      },
      {
        english: 'Vorrei visitare Firenze un giorno.',
        translation: 'I would like to visit Florence one day.',
      },
      {
        english: 'Vorrei che facesse più caldo.',
        translation: 'I wish it were warmer.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Vorrei che tu vieni.',
        correct: 'Vorrei che tu venissi.',
        note: 'Dopo vorrei che ci vuole il congiuntivo imperfetto.',
      },
      {
        wrong: 'Se vorrei, andrei.',
        correct: 'Se volessi, andrei.',
        note: 'Nel periodo ipotetico il se non vuole mai il condizionale.',
      },
    ],
    related: [
      'condizionale-presente',
      'condizionale-cortesia',
      'congiuntivo-imperfetto',
    ],
  },
  {
    slug: 'connettivi-narrativi',
    title: 'Connettivi narrativi',
    level: 'A2',
    category: 'Avanzato',
    summary:
      'Collegare eventi in una storia: poi, dopo, infine, prima, mentre, quando.',
    explanation:
      "Per raccontare una storia:\n\n- **prima (di)**: *Prima di uscire, chiudi la porta.*\n- **dopo (di)**: *Dopo cena, guardiamo un film.*\n- **poi**: *Ho fatto la spesa e poi sono tornato.*\n- **infine / alla fine**: *Infine, abbiamo preso il treno.*\n- **mentre**: *Mentre cucinavo, ascoltavo musica.*\n- **quando**: *Quando sono arrivato, era tardi.*\n- **all'inizio**: *All'inizio non capivo niente.*\n- **improvvisamente**: *All'improvviso ha iniziato a piovere.*",
    rules: [
      'Prima di + infinito: Prima di mangiare, lavati le mani.',
      'Dopo + nome o dopo + che + verbo: Dopo pranzo / Dopo che ho mangiato.',
      'Poi collega due azioni consecutive.',
      "Mentre regge l'imperfetto: Mentre mangiavo...",
    ],
    examples: [
      {
        english: 'Prima di uscire, ho chiuso tutte le finestre.',
        translation: 'Before going out, I closed all the windows.',
      },
      {
        english: 'Siamo andati al ristorante e poi al cinema.',
        translation: 'We went to the restaurant and then to the cinema.',
      },
      {
        english: "All'improvviso è apparso un gatto.",
        translation: 'Suddenly a cat appeared.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Prima uscire, mangio.',
        correct: 'Prima di uscire, mangio.',
        note: 'Prima richiede la preposizione di quando seguito da un verbo.',
      },
      {
        wrong: 'Dopo ho mangiato, sono uscito.',
        correct: 'Dopo aver mangiato, sono uscito.',
        note: 'Con lo stesso soggetto: dopo + infinito passato.',
      },
    ],
    related: [
      'connettivi-argomentativi',
      'marcatori-temporali',
      'passato-prossimo-vs-imperfetto',
    ],
  },
  {
    slug: 'trapassato-prossimo',
    title: 'Trapassato prossimo',
    level: 'A2',
    category: 'Tempi verbali',
    summary:
      "Esprimere un'azione passata precedente a un'altra azione passata.",
    structure: 'imperfetto di avere/essere + participio passato',
    explanation:
      "Il **trapassato prossimo** esprime un'azione passata avvenuta **prima** di un'altra azione passata.\n\n- *Quando sono arrivato, Maria era già uscita.* (Maria uscita → io arrivato)\n- *Avevo già mangiato quando mi hai chiamato.*\n\nFormazione: imperfetto di avere (avevo...) o essere (ero...) + participio passato.",
    rules: [
      "Azione passata precedente a un'altra azione passata.",
      'Si usa spesso con già, non ancora, appena.',
      'Con essere il participio concorda: Lei era già partita.',
      "Non si usa da solo; serve un'altra azione passata di riferimento.",
    ],
    examples: [
      {
        english: 'Quando sono arrivato, il film era già cominciato.',
        translation: 'When I arrived, the film had already started.',
      },
      {
        english: 'Avevo già visto quel film.',
        translation: 'I had already seen that film.',
      },
      {
        english: 'Non avevamo mai mangiato la pizza prima di allora.',
        translation: 'We had never eaten pizza before then.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Quando ho arrivato, il film era cominciato.',
        correct: 'Quando sono arrivato, il film era già cominciato.',
        note: 'Arrivare usa essere; trapassato: ero arrivato/a.',
      },
      {
        wrong: 'Ero già mangiato.',
        correct: 'Avevo già mangiato.',
        note: 'Mangiare usa avere; trapassato: avevo mangiato.',
      },
    ],
    related: [
      'passato-prossimo-avere',
      'passato-prossimo-essere',
      'imperfetto',
      'connettivi-narrativi',
    ],
  },
  {
    slug: 'discorso-indiretto',
    title: 'Discorso indiretto al presente',
    level: 'A2',
    category: 'Discorso indiretto',
    summary:
      'Riferire ciò che qualcuno ha detto adattando i pronomi e i tempi verbali.',
    explanation:
      'Il **discorso indiretto** riferisce le parole altrui senza citazione diretta.\n\nQuando il verbo principale è al presente, il tempo della subordinata **non cambia**:\n- Diretto: *Marco dice: "Vado al cinema."*\n- Indiretto: *Marco dice che **va** al cinema.*\n\nCambiamenti:\n- Si usa **che** per introdurre.\n- Pronomi e possessivi si adattano al nuovo punto di vista.\n- Indicatori di spazio/tempo: *qui → lì, oggi → quel giorno.*',
    rules: [
      'Con verbo principale al presente, il tempo verbale non cambia.',
      'I pronomi personali e possessivi cambiano secondo il nuovo soggetto.',
      'Qui / qua → lì / là; questo / questa → quello / quella.',
      "Le domande perdono l'inversione e usano se: Mi ha chiesto se volevo uscire.",
    ],
    examples: [
      {
        english: 'Dice che è stanco.',
        translation: 'He says (that) he is tired.',
      },
      {
        english: 'Anna dice che domani partirà.',
        translation: 'Anna says that she will leave tomorrow.',
      },
      {
        english: 'Mi ha chiesto se mi piaceva il film.',
        translation: 'He asked me if I liked the film.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Marco ha detto che vado al cinema.',
        correct: 'Marco ha detto che andava al cinema.',
        note: 'Se il verbo principale è al passato, la subordinata cambia tempo.',
      },
      {
        wrong: 'Lei dice che lei è stanca.',
        correct: 'Lei dice che è stanca.',
        note: 'Nel discorso indiretto il soggetto non si ripete.',
      },
    ],
    related: [
      'discorso-indiretto-passato',
      'discorso-riportato',
      'connettivi-narrativi',
    ],
  },
  {
    slug: 'congiuntivo-presente',
    title: 'Congiuntivo presente',
    level: 'B1',
    category: 'Congiuntivo',
    summary: 'Il modo della soggettività: dubbi, opinioni, desideri, emozioni.',
    structure:
      '-are → -i/-i/-i/-iamo/-iate/-ino\n-ere → -a/-a/-a/-iamo/-iate/-ano\n-ire → -a/-a/-a/-iamo/-iate/-ano (o -isca)',
    explanation:
      'Il **congiuntivo** è il modo della soggettività.\n\n**Formazione regolare:**\n- parlare: parli, parli, parli, parliamo, parliate, parlino.\n- leggere: legga, legga, legga, leggiamo, leggiate, leggano.\n- dormire: dorma, dorma, dorma, dormiamo, dormiate, dormano.\n- finire (-isc-): finisca, finisca, finisca, finiamo, finiate, finiscano.\n\n**Irregolari:** essere (sia), avere (abbia), andare (vada), fare (faccia), volere (voglia), potere (possa), dovere (debba), sapere (sappia), venire (venga), uscire (esca), dire (dica), bere (beva), stare (stia), dare (dia).',
    rules: [
      'Il congiuntivo si usa dopo verbi di opinione, desiderio, dubbio, emozione.',
      'Dopo espressioni impersonali: è importante che, bisogna che.',
      'Le tre persone singolari sono identiche.',
      '-are → -i; -ere/-ire → -a per le prime tre persone.',
    ],
    examples: [
      {
        english: 'Penso che lui sia bravissimo.',
        translation: 'I think he is very good.',
      },
      {
        english: 'Spero che tu possa venire alla festa.',
        translation: 'I hope you can come to the party.',
      },
      {
        english: 'È importante che voi parliate italiano.',
        translation: "It's important that you speak Italian.",
      },
    ],
    common_mistakes: [
      {
        wrong: 'Penso che lui è bravo.',
        correct: 'Penso che lui sia bravo.',
        note: "Dopo pensare che si usa il congiuntivo, non l'indicativo.",
      },
      {
        wrong: 'Credo che hai ragione.',
        correct: 'Credo che tu abbia ragione.',
        note: 'Dopo credere che serve il congiuntivo.',
      },
    ],
    related: [
      'verbi-opinione',
      'espressioni-impersonali',
      'congiuntivo-volonta',
      'congiuntivo-emozioni',
    ],
  },
  {
    slug: 'verbi-opinione',
    title: 'Verbi di opinione + congiuntivo',
    level: 'B1',
    category: 'Congiuntivo',
    summary: 'Pensare, credere, ritenere, sembrare e il congiuntivo.',
    explanation:
      "I verbi di opinione richiedono il **congiuntivo** nella subordinata.\n\n- pensare che: *Penso che sia tardi.*\n- credere che: *Credo che tu abbia ragione.*\n- ritenere che, sembrare che, avere l'impressione che, supporre che.\n\n**Eccezione:** stesso soggetto → di + infinito: *Penso **di** avere ragione.* (NON: Penso che io abbia ragione.)",
    rules: [
      'Verbi di opinione + che + congiuntivo (soggetti diversi).',
      'Verbi di opinione + di + infinito (stesso soggetto).',
      'Sembrare impersonale: Sembra che + congiuntivo.',
      "Con certezza oggettiva alcuni ammettono l'indicativo.",
    ],
    examples: [
      {
        english: 'Penso che questo film sia molto bello.',
        translation: 'I think this movie is very good.',
      },
      {
        english: 'Credo di aver capito tutto.',
        translation: 'I think I understood everything.',
        note: 'stesso soggetto',
      },
      {
        english: 'Sembra che domani piova.',
        translation: 'It seems like it will rain tomorrow.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Penso di che tu abbia ragione.',
        correct: 'Penso che tu abbia ragione.',
        note: 'Di solo con stesso soggetto; altrimenti che.',
      },
      {
        wrong: 'Penso che io ho ragione.',
        correct: 'Penso di avere ragione.',
        note: 'Stesso soggetto → di + infinito.',
      },
    ],
    related: [
      'congiuntivo-presente',
      'espressioni-impersonali',
      'congiuntivo-dubbi',
    ],
  },
  {
    slug: 'espressioni-impersonali',
    title: 'Espressioni impersonali + congiuntivo',
    level: 'B1',
    category: 'Congiuntivo',
    summary:
      'È importante che, bisogna che, è necessario che e le frasi impersonali.',
    explanation:
      'Espressioni impersonali di necessità/possibilità/importanza richiedono il congiuntivo.\n\n**Con congiuntivo:** è importante che, è necessario che, bisogna che, è meglio che, è possibile che, è probabile che, può darsi che, vale la pena che.\n\n**Senza congiuntivo** (certezza oggettiva): è vero che, è certo che, è sicuro che, è evidente che, è ovvio che → indicativo.',
    rules: [
      'Espressioni di necessità/possibilità → congiuntivo.',
      'Espressioni di certezza → indicativo.',
      'Bisogna che, occorre che, conviene che → congiuntivo.',
      'Stesso soggetto: è importante + infinito.',
    ],
    examples: [
      {
        english: 'È importante che tu mangi sano.',
        translation: "It's important that you eat healthy.",
      },
      {
        english: 'Bisogna che arriviamo in orario.',
        translation: 'We need to arrive on time.',
      },
      {
        english: 'Può darsi che loro non lo sappiano.',
        translation: 'They might not know it.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'È importante che tu mangi sano. (indicativo)',
        correct: 'È importante che tu mangi sano.',
        note: "Mangi è congiuntivo (prima persona -are è uguale all'indicativo).",
      },
      {
        wrong: 'È possibile che lui arriva tardi.',
        correct: 'È possibile che lui arrivi tardi.',
        note: 'Con è possibile che si usa il congiuntivo.',
      },
    ],
    related: ['congiuntivo-presente', 'verbi-opinione', 'si-impersonale'],
  },
  {
    slug: 'congiuntivo-volonta',
    title: 'Congiuntivo di volontà',
    level: 'B1',
    category: 'Congiuntivo',
    summary: 'Volere, desiderare, preferire che + congiuntivo.',
    explanation:
      'I verbi di volontà/desiderio richiedono il congiuntivo (soggetti diversi).\n\n- volere che: *Voglio che tu venga.*\n- desiderare che, preferire che, pretendere che, esigere che, augurarsi che, sperare che.\n\n**Stesso soggetto → infinito:** *Voglio venire.* (non: Voglio che io venga.)\n\nIn frasi indipendenti il congiuntivo esprime augurio: *Che tu possa essere felice!*',
    rules: [
      'Volontà + che + congiuntivo (soggetti diversi).',
      'Volontà + di + infinito (stesso soggetto).',
      'Sperare che regge il congiuntivo.',
      'Frasi indipendenti: Che tu possa essere felice! (augurio).',
    ],
    examples: [
      {
        english: 'Voglio che tu sia felice.',
        translation: 'I want you to be happy.',
      },
      {
        english: 'Preferisco che andiamo domani.',
        translation: 'I prefer that we go tomorrow.',
      },
      {
        english: 'Spero che abbiate fatto buon viaggio.',
        translation: 'I hope you had a good trip.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Voglio che tu vai.',
        correct: 'Voglio che tu vada.',
        note: 'Dopo volere che ci vuole il congiuntivo.',
      },
      {
        wrong: 'Voglio che io parto.',
        correct: 'Voglio partire.',
        note: 'Stesso soggetto → infinito.',
      },
    ],
    related: [
      'congiuntivo-presente',
      'verbi-opinione',
      'congiuntivo-emozioni',
      'vorrei',
    ],
  },
  {
    slug: 'congiuntivo-emozioni',
    title: 'Congiuntivo di emozione',
    level: 'B1',
    category: 'Congiuntivo',
    summary: 'Esprimere sentimenti e reazioni emotive con il congiuntivo.',
    explanation:
      'Emozioni e sentimenti richiedono il congiuntivo.\n\n- essere contento/felice/triste/arrabbiato che: *Sono contento che tu sia qui.*\n- avere paura che, dispiacere che, preoccuparsi che, sorprendere che.\n- è un peccato che, che peccato che, è strano che.\n\nA differenza di volontà e opinione, le emozioni richiedono sempre il congiuntivo (anche con stesso soggetto: Sono felice di essere qui).',
    rules: [
      'Emozioni + che + congiuntivo.',
      'Le emozioni richiedono sempre il congiuntivo nella lingua standard.',
      'Stesso soggetto: Sono felice di essere qui.',
      "Nella lingua parlata informale si può sentire l'indicativo, ma non è corretto.",
    ],
    examples: [
      {
        english: 'Sono felice che tu sia venuto.',
        translation: "I'm happy that you came.",
      },
      {
        english: 'Mi dispiace che non possiate restare.',
        translation: "I'm sorry that you can't stay.",
      },
      {
        english: 'Ho paura che lui si perda.',
        translation: "I'm afraid he might get lost.",
      },
    ],
    common_mistakes: [
      {
        wrong: 'Sono contento che tu sei qui.',
        correct: 'Sono contento che tu sia qui.',
        note: 'Le emozioni richiedono il congiuntivo.',
      },
      {
        wrong: 'Mi dispiace che non puoi venire.',
        correct: 'Mi dispiace che tu non possa venire.',
        note: 'Dopo dispiacere che serve il congiuntivo.',
      },
    ],
    related: [
      'congiuntivo-presente',
      'congiuntivo-volonta',
      'congiuntivo-dubbi',
    ],
  },
  {
    slug: 'congiuntivo-dubbi',
    title: 'Congiuntivo di dubbio',
    level: 'B1',
    category: 'Congiuntivo',
    summary: 'Dubitare, non sapere, non essere sicuro che + congiuntivo.',
    explanation:
      "Il dubbio e l'incertezza richiedono il congiuntivo.\n\n- dubitare che: *Dubito che lui dica la verità.*\n- non sapere che, non essere sicuro che, non credere che, non pensare che.\n\n**Attenzione:** l'affermazione opposta usa l'indicativo:\n- *So che è vero. Sono sicuro che funziona.*",
    rules: [
      'Dubitare, non sapere, non essere sicuro, non credere → congiuntivo.',
      'Sapere, essere sicuro, essere certo → indicativo.',
      'Dopo "non so se" si può usare indicativo o congiuntivo.',
      "La negazione trasforma l'indicativo in congiuntivo.",
    ],
    examples: [
      {
        english: 'Dubito che lui arrivi in orario.',
        translation: 'I doubt he will arrive on time.',
      },
      {
        english: 'Non sono sicuro che questa sia la strada giusta.',
        translation: "I'm not sure this is the right way.",
      },
      {
        english: 'Non credo che loro vogliano venire.',
        translation: "I don't think they want to come.",
      },
    ],
    common_mistakes: [
      {
        wrong: 'Dubito che lui arriva.',
        correct: 'Dubito che lui arrivi.',
        note: 'Dubitare richiede il congiuntivo.',
      },
      {
        wrong: 'Non so se lui è a casa. (formale)',
        correct: 'Non so se lui sia a casa.',
        note: 'Nel registro formale, dopo non so se si preferisce il congiuntivo.',
      },
    ],
    related: [
      'congiuntivo-presente',
      'verbi-opinione',
      'espressioni-impersonali',
    ],
  },
  {
    slug: 'trapassato-prossimo-b1',
    title: 'Trapassato prossimo (B1)',
    level: 'B1',
    category: 'Tempi verbali',
    summary:
      'Approfondimento del trapassato prossimo con congiuntivo e concordanza.',
    explanation:
      "Ripasso e approfondimento del trapassato prossimo:\n\n- Azione passata precedente: *Era già uscito quando ho chiamato.*\n- Dopo dopo che, quando (anteriorità): *Dopo che ebbe finito, uscì.*\n- Nel periodo ipotetico dell'irrealtà (3º tipo): *Se avessi saputo, sarei venuto.*",
    rules: [
      'Trapassato prossimo = imperfetto ausiliare + participio.',
      'Esprime anteriorità rispetto a un passato.',
      'Nel periodo ipotetico del 3º tipo con congiuntivo trapassato.',
      'Non confondere con il trapassato remoto (ebbi fatto).',
    ],
    examples: [
      {
        english: 'Quando arrivai, erano già partiti tutti.',
        translation: 'When I arrived, everyone had already left.',
      },
      {
        english: "Se avessi studiato, avresti passato l'esame.",
        translation: 'If you had studied, you would have passed the exam.',
      },
      {
        english: 'Non avevo mai visto niente di simile.',
        translation: 'I had never seen anything like it.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Se avevo soldi, compravo la casa.',
        correct: 'Se avessi avuto soldi, avrei comprato la casa.',
        note: 'Periodo ipotetico 3º tipo: congiuntivo trapassato + condizionale passato.',
      },
      {
        wrong: 'Dopo che ho mangiato, sono uscito.',
        correct: 'Dopo aver mangiato, sono uscito.',
        note: 'Con lo stesso soggetto: dopo + infinito passato.',
      },
    ],
    related: [
      'trapassato-prossimo',
      'concordanza-tempi',
      'periodo-ipotetico-2',
    ],
  },
  {
    slug: 'futuro-anteriore',
    title: 'Futuro anteriore',
    level: 'B1',
    category: 'Tempi verbali',
    summary:
      "Esprimere un'azione futura che sarà completata prima di un'altra.",
    structure: 'futuro di avere/essere + participio passato',
    explanation:
      "Il **futuro anteriore** esprime un'azione futura anteriore a un'altra futura.\n\n- *Quando avrò finito, ti chiamerò.*\n- *Appena sarà arrivato, cominceremo.*\n\nSi usa anche per ipotesi/supposizioni nel passato:\n- *Sarà già partito?* (Do you think he has already left?)\n- *Non ha risposto: avrà dimenticato.* (He must have forgotten.)",
    rules: [
      'Futuro semplice di avere/essere + participio passato.',
      'Anteriorità rispetto a un futuro semplice.',
      'Ipotesi/supposizioni sul passato: Sarà già arrivato.',
      'Con espressioni temporali: quando, appena, dopo che + futuro anteriore.',
    ],
    examples: [
      {
        english: 'Quando avrò finito i compiti, uscirò.',
        translation: 'When I have finished my homework, I will go out.',
      },
      {
        english: 'Saranno già partiti? Non rispondono.',
        translation: "Do you think they have already left? They don't answer.",
      },
      {
        english: "Avrà dimenticato l'appuntamento.",
        translation: 'He must have forgotten the appointment.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Quando finirò, ti chiamo.',
        correct: 'Quando avrò finito, ti chiamerò.',
        note: 'Dopo quando + futuro si usa il futuro anteriore per anteriorità, poi futuro semplice.',
      },
      {
        wrong: 'Sarà arrivato ieri? (supposizione)',
        correct: 'Sarà arrivato ieri.',
        note: 'OK! Il futuro anteriore può esprimere supposizione sul passato.',
      },
    ],
    related: ['futuro-semplice', 'concordanza-tempi', 'condizionale-presente'],
  },
  {
    slug: 'concordanza-tempi',
    title: 'La concordanza dei tempi',
    level: 'B1',
    category: 'Avanzato',
    summary: 'Coordinare i tempi verbali tra principale e subordinata.',
    explanation:
      'La concordanza dei tempi (consecutio temporum) regola il rapporto temporale tra principale e subordinata.\n\n**Principale al presente:** subordinata al tempo richiesto dal significato.\n- *Penso che sia / sia stato / sarà vero.*\n\n**Principale al passato:** la subordinata deve adattarsi:\n- Presente → imperfetto: *Pensavo che fosse vero.*\n- Passato → trapassato: *Pensavo che fosse stato vero.*\n- Futuro → condizionale passato: *Pensavo che sarebbe stato vero.*',
    rules: [
      'Principale al presente: libertà nella scelta del tempo.',
      'Principale al passato: la subordinata va al passato.',
      'Presente → imperfetto congiuntivo.',
      'Futuro → condizionale passato.',
    ],
    examples: [
      {
        english: 'Penso che Marco sia malato.',
        translation: 'I think Marco is sick.',
      },
      {
        english: 'Pensavo che Marco fosse malato.',
        translation: 'I thought Marco was sick.',
      },
      {
        english: 'Speravo che sarebbe venuto.',
        translation: 'I hoped he would come.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Pensavo che Marco sia malato.',
        correct: 'Pensavo che Marco fosse malato.',
        note: 'Principale al passato → subordinata al passato.',
      },
      {
        wrong: 'Credevo che verrà.',
        correct: 'Credevo che sarebbe venuto.',
        note: 'Futuro nel passato → condizionale passato.',
      },
    ],
    related: [
      'congiuntivo-presente',
      'congiuntivo-imperfetto',
      'discorso-indiretto-passato',
    ],
  },
  {
    slug: 'forma-passiva',
    title: 'La forma passiva',
    level: 'B1',
    category: 'Voce passiva',
    summary: 'Costruire la forma passiva con essere, venire e andare.',
    structure: 'essere/venire + participio passato (+ da + agente)',
    explanation:
      "La forma passiva sposta il focus sull'oggetto che subisce l'azione.\n\n- **Essere + participio**: *Il libro è stato scritto da Eco.*\n- **Venire + participio** (solo tempi semplici): *Il libro viene letto da molti.*\n- **Andare + participio** (necessità/obbligo): *Questo lavoro va fatto subito.*\n\nIl participio concorda in genere e numero con il soggetto.\n\nL'agente è introdotto da **da**: *La torta è stata preparata dalla nonna.*",
    rules: [
      'Essere + participio per tutti i tempi.',
      'Venire + participio solo per tempi semplici (alternativa a essere).',
      'Andare + participio = dover essere (obbligo/necessità).',
      'Participio concorda con il soggetto in genere e numero.',
      'Agente introdotto da da.',
    ],
    examples: [
      {
        english: 'La lettera è stata spedita ieri.',
        translation: 'The letter was sent yesterday.',
      },
      {
        english: 'Il museo viene visitato da molti turisti.',
        translation: 'The museum is visited by many tourists.',
      },
      {
        english: 'Queste regole vanno rispettate.',
        translation: 'These rules must be respected.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'La lettera ha stata spedita.',
        correct: 'La lettera è stata spedita.',
        note: 'La forma passiva usa essere, non avere.',
      },
      {
        wrong: 'Il libro viene essendo letto.',
        correct: 'Il libro viene letto.',
        note: 'Venire + participio; non serve essere.',
      },
    ],
    related: ['si-passivante', 'passato-prossimo-essere', 'concordanza-tempi'],
  },
  {
    slug: 'si-impersonale',
    title: 'Si impersonale',
    level: 'B1',
    category: 'Pronomi',
    summary: 'Usare il si per esprimere azioni impersonali e generali.',
    structure: 'si + verbo (3ª persona singolare)',
    explanation:
      "Il **si impersonale** si usa per frasi generali senza soggetto specifico.\n\n- *In Italia si mangia bene.* = People eat well in Italy.\n- *Si dice che...* = It is said that...\n\nCon verbi che hanno già il si riflessivo, si usa **ci si**: *Ci si alza presto.*\n\nCon aggettivi, il verbo è sempre singolare ma l'aggettivo va al plurale: *Si è stanchi.* (one is tired).",
    rules: [
      'Si + verbo 3ª singolare: azione generale.',
      'Con verbi riflessivi: ci si + 3ª singolare.',
      'Con aggettivi: verbo singolare, aggettivo plurale.',
      'Il si impersonale non indica una persona specifica.',
    ],
    examples: [
      {
        english: 'In Italia si mangia bene.',
        translation: 'In Italy people eat well.',
      },
      {
        english: 'Come si dice "casa" in inglese?',
        translation: 'How do you say "casa" in English?',
      },
      {
        english: 'Quando si è giovani, si fanno molti errori.',
        translation: 'When one is young, one makes many mistakes.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Si mangiano bene in Italia.',
        correct: 'In Italia si mangia bene.',
        note: 'Il si impersonale usa la 3ª singolare, non plurale.',
      },
      {
        wrong: 'Ci si alziamo presto.',
        correct: 'Ci si alza presto.',
        note: 'Ci si + 3ª singolare (non plurale).',
      },
    ],
    related: ['si-passivante', 'verbi-riflessivi', 'pronomin-indiretti'],
  },
  {
    slug: 'si-passivante',
    title: 'Si passivante',
    level: 'B1',
    category: 'Voce passiva',
    summary: 'Il si usato per formare la voce passiva impersonale.',
    structure: 'si + verbo (3ª singolare o plurale) + soggetto',
    explanation:
      'Il **si passivante** è simile alla forma passiva ma con il soggetto che segue il verbo e ne determina il numero.\n\n- *Si vendono libri.* = Books are sold. (libri è soggetto)\n- *Si vende la casa.* = The house is sold.\n\nDifferenza dal si impersonale:\n- Si passivante: soggetto espresso, verbo concorda col soggetto.\n- Si impersonale: nessun soggetto, verbo sempre 3ª singolare.',
    rules: [
      'Si + verbo + soggetto: il verbo concorda col soggetto.',
      'Soggetto singolare → verbo singolare.',
      'Soggetto plurale → verbo plurale.',
      'Usato per regole, divieti, istruzioni: Qui si parla italiano.',
    ],
    examples: [
      {
        english: 'Qui si vendono biglietti.',
        translation: 'Tickets are sold here.',
      },
      {
        english: 'Si affitta appartamento.',
        translation: 'Apartment for rent.',
      },
      {
        english: 'Non si accettano carte di credito.',
        translation: 'Credit cards are not accepted.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Si vende libri.',
        correct: 'Si vendono libri.',
        note: 'Libri è plurale → si vendono.',
      },
      {
        wrong: 'Si affittano appartamento.',
        correct: 'Si affitta appartamento.',
        note: 'Appartamento è singolare → si affitta.',
      },
    ],
    related: ['si-impersonale', 'forma-passiva', 'verbi-riflessivi'],
  },
  {
    slug: 'che-relativo',
    title: 'Che relativo',
    level: 'B1',
    category: 'Proposizioni',
    summary: 'Il pronome relativo che come soggetto e complemento oggetto.',
    explanation:
      '**Che** è il pronome relativo più comune. Sostituisce il soggetto o il complemento oggetto.\n\n- Soggetto: *La ragazza **che** parla è mia sorella.* (che = la ragazza, soggetto di parla)\n- Oggetto: *Il libro **che** ho letto è interessante.* (che = il libro, oggetto di ho letto)\n\nChe è invariabile (non cambia per genere o numero).\n\nNon si usa mai la preposizione prima di che: *La ragazza **con cui** parlo* (NON: con che).',
    rules: [
      'Che sostituisce soggetto o complemento oggetto.',
      'Che è invariabile.',
      'Non si usa preposizione prima di che (usare cui).',
      'Che non può essere omesso come in inglese (that).',
    ],
    examples: [
      {
        english: 'La donna che parla è mia zia.',
        translation: 'The woman who is speaking is my aunt.',
      },
      {
        english: 'Il film che abbiamo visto era bello.',
        translation: 'The film that we saw was good.',
      },
      {
        english: 'La cosa che mi piace di più è viaggiare.',
        translation: 'The thing that I like most is traveling.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'La ragazza con che parlo.',
        correct: 'La ragazza con cui parlo.',
        note: 'Dopo preposizione si usa cui, non che.',
      },
      {
        wrong: 'Il film abbiamo visto era bello.',
        correct: 'Il film che abbiamo visto era bello.',
        note: 'In italiano il pronome relativo non si può omettere.',
      },
    ],
    related: ['cui', 'il-quale', 'pronomi-diretti'],
  },
  {
    slug: 'cui',
    title: 'Cui: il complemento indiretto relativo',
    level: 'B1',
    category: 'Proposizioni',
    summary: 'Il pronome relativo cui per i complementi indiretti.',
    explanation:
      '**Cui** si usa come pronome relativo dopo preposizioni.\n\n- *La ragazza **a cui** ho dato il libro.*\n- *Il paese **in cui** vivo.*\n- *La persona **di cui** ti parlavo.*\n\nCui può anche esprimere possesso: *La ragazza **il cui** padre è medico.* (la ragazza, il padre della quale...)\n\nCui è invariabile.',
    rules: [
      'Cui si usa dopo preposizione: a cui, di cui, con cui, da cui, in cui, su cui.',
      'Il cui / la cui / i cui / le cui = possesso.',
      'Cui è invariabile.',
      'Non confondere cui (relativo) con qui (luogo).',
    ],
    examples: [
      {
        english: 'La città in cui vivo è Roma.',
        translation: 'The city where I live is Rome.',
      },
      {
        english: "L'amico di cui ti parlavo è arrivato.",
        translation: 'The friend I was telling you about has arrived.',
      },
      {
        english: 'La ragazza il cui fratello è attore si chiama Anna.',
        translation: 'The girl whose brother is an actor is called Anna.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'La città in che vivo.',
        correct: 'La città in cui vivo.',
        note: 'Dopo preposizione si usa cui, mai che.',
      },
      {
        wrong: "L'amico cui ti parlavo.",
        correct: "L'amico di cui ti parlavo.",
        note: 'Cui ha bisogno della preposizione esplicita.',
      },
    ],
    related: ['che-relativo', 'il-quale', 'pronomi-indiretti'],
  },
  {
    slug: 'il-quale',
    title: 'Il quale / la quale / i quali / le quali',
    level: 'B1',
    category: 'Proposizioni',
    summary: 'I pronomi relativi variabili per chiarezza e registro formale.',
    explanation:
      '**Il quale** (variabile: la quale, i quali, le quali) può sostituire che e cui, specialmente per evitare ambiguità o in contesti formali.\n\n- *La madre di Marco, la quale è insegnante...* (chiarisce: la madre è insegnante)\n- Dopo preposizione: *La persona alla quale mi riferivo.* (più formale di cui)\n\nSi usa spesso dopo preposizioni articolate: *del quale, al quale, sul quale*, ecc.',
    rules: [
      'Variabile: il quale, la quale, i quali, le quali.',
      'Utile per evitare ambiguità su chi sia il referente.',
      'Dopo preposizioni articolate: del quale, al quale.',
      'Registro più formale rispetto a che/cui.',
    ],
    examples: [
      {
        english: 'Il fratello di Maria, il quale vive a Londra, è medico.',
        translation: "Maria's brother, who lives in London, is a doctor.",
      },
      {
        english: 'La persona alla quale mi sono rivolto è stata gentile.',
        translation: 'The person to whom I turned was kind.',
      },
      {
        english: 'I motivi per i quali ho deciso di partire sono molti.',
        translation: 'The reasons for which I decided to leave are many.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'La madre di Marco, che è insegnante... (ambiguo)',
        correct: 'La madre di Marco, la quale è insegnante...',
        note: 'Con che non si capisce se è la madre o Marco a essere insegnante.',
      },
      {
        wrong: 'Il quale che ho visto.',
        correct: 'Il quale ho visto. (o: che ho visto.)',
        note: 'Non si combina il quale con che.',
      },
    ],
    related: ['che-relativo', 'cui', 'connettivi-avanzati'],
  },
  {
    slug: 'periodo-ipotetico-1',
    title: 'Periodo ipotetico: 1º tipo (realtà)',
    level: 'B1',
    category: 'Condizionali',
    summary: 'Se + indicativo presente/futuro + indicativo presente/futuro.',
    structure:
      'se + presente/futuro indicativo → presente/futuro indicativo (o imperativo)',
    explanation:
      "Il **periodo ipotetico del 1º tipo** esprime un'ipotesi reale o molto probabile.\n\n- *Se piove, prendo l'ombrello.* (reale)\n- *Se studierai, passerai l'esame.* (probabile)\n- *Se hai fame, mangia qualcosa!* (imperativo)\n\nSi usa il modo indicativo sia nella protasi (se) che nell'apodosi (conseguenza).",
    rules: [
      'Protasi (se): indicativo presente o futuro.',
      'Apodosi: indicativo presente, futuro o imperativo.',
      'Esprime ipotesi reali o molto probabili.',
      'Non si usa mai il congiuntivo in questo tipo.',
    ],
    examples: [
      {
        english: 'Se piove, resto a casa.',
        translation: 'If it rains, I will stay home.',
      },
      {
        english: 'Se avrò tempo, ti aiuterò.',
        translation: 'If I have time, I will help you.',
      },
      {
        english: 'Se hai fame, prendi una mela.',
        translation: 'If you are hungry, take an apple.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Se pioverei, resterei a casa.',
        correct: 'Se piove, resto a casa.',
        note: 'Nel 1º tipo non si usa mai il condizionale nella protasi.',
      },
      {
        wrong: 'Se piove, resterei a casa.',
        correct: 'Se piove, resto a casa. (o: Se piovesse, resterei a casa.)',
        note: 'Non mischiare protasi reale con apodosi ipotetica.',
      },
    ],
    related: ['periodo-ipotetico-2', 'se-congiuntivo', 'condizionale-presente'],
  },
  {
    slug: 'periodo-ipotetico-2',
    title: 'Periodo ipotetico: 2º tipo (possibilità)',
    level: 'B1',
    category: 'Condizionali',
    summary: 'Se + congiuntivo imperfetto + condizionale presente.',
    structure: 'se + congiuntivo imperfetto → condizionale presente',
    explanation:
      "Il **periodo ipotetico del 2º tipo** esprime un'ipotesi possibile ma non certa.\n\n- *Se avessi soldi, comprerei una casa.* (possibilità)\n- *Se potessi, verrei alla festa.*\n\nProtasi: congiuntivo imperfetto.\nApodosi: condizionale presente.",
    rules: [
      'Protasi: se + congiuntivo imperfetto.',
      'Apodosi: condizionale presente.',
      'Ipotesi possibili ma incerte.',
      'Mai il condizionale nella protasi.',
    ],
    examples: [
      {
        english: 'Se avessi tempo, viaggerei di più.',
        translation: 'If I had time, I would travel more.',
      },
      {
        english: 'Se facesse bel tempo, andrei al mare.',
        translation: 'If the weather were nice, I would go to the beach.',
      },
      {
        english: 'Se potessi parlare italiano, vivrei a Roma.',
        translation: 'If I could speak Italian, I would live in Rome.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Se avrei soldi, comprerei una casa.',
        correct: 'Se avessi soldi, comprerei una casa.',
        note: 'Dopo se mai il condizionale; si usa il congiuntivo imperfetto.',
      },
      {
        wrong: 'Se avessi soldi, compravo una casa.',
        correct: 'Se avessi soldi, comprerei una casa.',
        note: "L'apodosi vuole il condizionale presente, non l'imperfetto indicativo.",
      },
    ],
    related: [
      'periodo-ipotetico-1',
      'se-congiuntivo',
      'congiuntivo-imperfetto',
      'condizionale-presente',
    ],
  },
  {
    slug: 'se-congiuntivo',
    title: 'Se + congiuntivo: regole generali',
    level: 'B1',
    category: 'Congiuntivo',
    summary:
      'La regola fondamentale: dopo "se" non si usa mai il condizionale.',
    explanation:
      "La regola più importante del periodo ipotetico italiano:\n\n**Dopo \"se\" non si usa MAI il condizionale.**\n\n- 1º tipo (realtà): *Se piove, prendo l'ombrello.*\n- 2º tipo (possibilità): *Se piovesse, prenderei l'ombrello.*\n- 3º tipo (irrealtà): *Se avesse piovuto, avrei preso l'ombrello.*\n\nIl condizionale va solo nell'apodosi (conseguenza), mai nella protasi (se).",
    rules: [
      'Dopo se mai il condizionale.',
      '1º tipo: se + indicativo.',
      '2º tipo: se + congiuntivo imperfetto → condizionale presente.',
      '3º tipo: se + congiuntivo trapassato → condizionale passato.',
    ],
    examples: [
      {
        english: 'Se potessi, lo farei.',
        translation: 'If I could, I would do it.',
      },
      {
        english: 'Se avessi saputo, sarei venuto.',
        translation: 'If I had known, I would have come.',
      },
      {
        english: 'Se vuoi, possiamo uscire.',
        translation: 'If you want, we can go out.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Se potrei, lo farei.',
        correct: 'Se potessi, lo farei.',
        note: 'Errore classico: mai condizionale dopo se.',
      },
      {
        wrong: 'Se avrei saputo, sarei venuto.',
        correct: 'Se avessi saputo, sarei venuto.',
        note: 'Dopo se si usa congiuntivo trapassato, non condizionale passato.',
      },
    ],
    related: [
      'periodo-ipotetico-1',
      'periodo-ipotetico-2',
      'congiuntivo-imperfetto',
      'congiuntivo-trapassato',
    ],
  },
  {
    slug: 'discorso-indiretto-passato',
    title: 'Discorso indiretto al passato',
    level: 'B1',
    category: 'Discorso indiretto',
    summary:
      'Riferire al passato: trasformazione dei tempi verbali e indicatori.',
    explanation:
      'Quando il verbo principale è al passato, i tempi della subordinata cambiano:\n\n- Presente → imperfetto: *Dice che è stanco → Disse che era stanco.*\n- Passato prossimo → trapassato: *Dice che ha mangiato → Disse che aveva mangiato.*\n- Futuro → condizionale passato: *Dice che verrà → Disse che sarebbe venuto.*\n- Imperfetto: resta uguale.\n\nAnche gli indicatori di tempo/luogo cambiano: qui → lì, oggi → quel giorno, domani → il giorno dopo.',
    rules: [
      'Presente → imperfetto.',
      'Passato prossimo → trapassato prossimo.',
      'Futuro → condizionale passato.',
      'Imperfetto e trapassato restano invariati.',
      'Indicatori temporali: oggi → quel giorno, qui → lì.',
    ],
    examples: [
      {
        english: 'Ha detto che era stanco.',
        translation: 'He said that he was tired.',
      },
      {
        english: 'Disse che sarebbe arrivato il giorno dopo.',
        translation: 'He said that he would arrive the following day.',
      },
      {
        english: 'Mi spiegò che aveva già finito il lavoro.',
        translation: 'He explained that he had already finished the work.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Ha detto che è stanco. (ieri)',
        correct: 'Ha detto che era stanco.',
        note: 'Verbo principale al passato → subordinata al passato.',
      },
      {
        wrong: 'Ha detto che verrà domani.',
        correct: 'Ha detto che sarebbe venuto il giorno dopo.',
        note: 'Futuro nel passato → condizionale passato.',
      },
    ],
    related: [
      'discorso-indiretto',
      'concordanza-tempi',
      'trasformazioni-temporali',
    ],
  },
  {
    slug: 'connettivi-argomentativi',
    title: 'Connettivi argomentativi',
    level: 'B1',
    category: 'Avanzato',
    summary:
      'Perciò, quindi, infatti, tuttavia, benché, purché per argomentare.',
    explanation:
      'I connettivi argomentativi strutturano un discorso logico:\n\n- **Causa:** perché, poiché, dato che, siccome, visto che.\n- **Conseguenza:** quindi, perciò, dunque, di conseguenza.\n- **Contrasto:** ma, però, tuttavia, eppure, invece, mentre.\n- **Concessione:** benché, sebbene, nonostante, malgrado (+ congiuntivo).\n- **Scopo:** affinché, perché (+ congiuntivo).\n- **Condizione:** purché, a patto che, a condizione che (+ congiuntivo).',
    rules: [
      'Causa: perché, poiché, siccome + indicativo.',
      'Conseguenza: quindi, perciò, dunque + indicativo.',
      'Concessione: benché, sebbene + congiuntivo.',
      'Condizione: purché, a patto che + congiuntivo.',
    ],
    examples: [
      {
        english: 'Siccome pioveva, siamo rimasti a casa.',
        translation: 'Since it was raining, we stayed home.',
      },
      {
        english: "Non ho studiato, quindi non ho passato l'esame.",
        translation: "I didn't study, therefore I didn't pass the exam.",
      },
      {
        english: 'Benché fosse tardi, abbiamo continuato.',
        translation: 'Although it was late, we continued.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Benché era tardi, siamo usciti.',
        correct: 'Benché fosse tardi, siamo usciti.',
        note: 'Benché richiede il congiuntivo.',
      },
      {
        wrong: 'Siccome pioveva, perciò siamo rimasti a casa.',
        correct: 'Siccome pioveva, siamo rimasti a casa.',
        note: 'Non usare due connettivi causali/consecutivi insieme.',
      },
    ],
    related: [
      'connettivi-narrativi',
      'congiuntivo-presente',
      'connettivi-avanzati',
    ],
  },
  {
    slug: 'trasformazioni-temporali',
    title: 'Trasformazioni temporali nel discorso indiretto',
    level: 'B1',
    category: 'Discorso indiretto',
    summary:
      'Come cambiano oggi, domani, qui e altri indicatori nel discorso indiretto.',
    explanation:
      'Nel discorso indiretto al passato, gli indicatori di tempo e luogo cambiano:\n\n- oggi → quel giorno\n- ieri → il giorno prima\n- domani → il giorno dopo / il giorno seguente\n- adesso → in quel momento / allora\n- qui / qua → lì / là\n- questo/a → quello/a\n- tra due giorni → due giorni dopo\n- ... fa → ... prima\n- la settimana prossima → la settimana seguente',
    rules: [
      'Oggi → quel giorno; ieri → il giorno prima.',
      'Domani → il giorno dopo/seguente.',
      'Qui → lì; questo → quello.',
      'Tempo fa → tempo prima.',
    ],
    examples: [
      {
        english: 'Disse che quel giorno era stanco. (oggi)',
        translation: 'He said that that day he was tired.',
      },
      {
        english: 'Mi disse che sarebbe partito il giorno dopo. (domani)',
        translation: 'He told me that he would leave the next day.',
      },
      {
        english: 'Disse che era stato lì il giorno prima. (qui / ieri)',
        translation: 'He said that he had been there the day before.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Disse che oggi era stanco.',
        correct: 'Disse che quel giorno era stanco.',
        note: 'Con verbo principale al passato, oggi → quel giorno.',
      },
      {
        wrong: 'Ieri ha detto che domani partirà.',
        correct: 'Ieri ha detto che oggi sarebbe partito. (o: il giorno dopo)',
        note: 'Adattare il riferimento temporale al momento del discorso indiretto.',
      },
    ],
    related: [
      'discorso-indiretto-passato',
      'discorso-indiretto',
      'marcatori-temporali',
    ],
  },
  {
    slug: 'congiuntivo-imperfetto',
    title: 'Congiuntivo imperfetto',
    level: 'B2',
    category: 'Congiuntivo',
    summary: 'Il congiuntivo imperfetto: formazione e uso nel passato.',
    structure:
      '-are: -assi/-assi/-asse/-assimo/-aste/-assero\n-ere: -essi/-essi/-esse/-essimo/-este/-essero\n-ire: -issi/-issi/-isse/-issimo/-iste/-issero',
    explanation:
      'Il **congiuntivo imperfetto** si usa:\n- Nel periodo ipotetico del 2 tipo: *Se potessi, verrei.*\n- Dopo verbi al passato + che: *Pensavo che fosse vero.*\n- Dopo vorrei che: *Vorrei che tu venissi.*\n\nEssere e irregolare: fossi, fossi, fosse, fossimo, foste, fossero.',
    rules: [
      'Usato nella protasi del periodo ipotetico (2 tipo).',
      'Usato dopo verbi al passato + che (concordanza).',
      'Dopo vorrei che: Vorrei che tu venissi.',
      'Essere: fossi, fossi, fosse...',
    ],
    examples: [
      {
        english: 'Se potessi, viaggerei in tutto il mondo.',
        translation: 'If I could, I would travel the world.',
      },
      {
        english: 'Pensavo che tu fossi gia partito.',
        translation: 'I thought you had already left.',
      },
      {
        english: 'Vorrei che fosse sempre estate.',
        translation: 'I wish it were always summer.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Se potrei, viaggerei.',
        correct: 'Se potessi, viaggerei.',
        note: 'Dopo se mai il condizionale; si usa congiuntivo imperfetto.',
      },
      {
        wrong: 'Pensavo che tu eri partito.',
        correct: 'Pensavo che tu fossi partito.',
        note: 'Verbo principale al passato: congiuntivo imperfetto.',
      },
    ],
    related: [
      'congiuntivo-presente',
      'congiuntivo-trapassato',
      'concordanza-congiuntivo',
      'periodo-ipotetico-2',
    ],
  },
  {
    slug: 'congiuntivo-trapassato',
    title: 'Congiuntivo trapassato',
    level: 'B2',
    category: 'Congiuntivo',
    summary:
      'Il congiuntivo trapassato: periodo ipotetico del 3 tipo (irrealta).',
    structure: 'congiuntivo imperfetto di avere/essere + participio passato',
    explanation:
      '**Congiuntivo trapassato** = congiuntivo imperfetto di avere/essere + participio passato.\n\n- avere: avessi, avessi, avesse, avessimo, aveste, avessero + participio.\n- essere: fossi... + participio (concordato).\n\nUsi:\n- Periodo ipotetico 3 tipo: *Se avessi studiato, avresti passato l esame.*\n- Concordanza: *Pensavo che fosse gia arrivato.*',
    rules: [
      'Congiuntivo imperfetto di avere/essere + participio passato.',
      'Periodo ipotetico 3 tipo (irrealta nel passato).',
      'Concordanza: anteriorita rispetto a un passato.',
      'Con essere il participio concorda col soggetto.',
    ],
    examples: [
      {
        english: 'Se avessi saputo, sarei venuto prima.',
        translation: 'If I had known, I would have come earlier.',
      },
      {
        english: 'Credevo che fossero gia partiti.',
        translation: 'I thought they had already left.',
      },
      {
        english: 'Se avessi studiato, avresti passato l esame.',
        translation: 'If you had studied, you would have passed the exam.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Se avrei saputo, sarei venuto.',
        correct: 'Se avessi saputo, sarei venuto.',
        note: 'Dopo se mai il condizionale; congiuntivo trapassato.',
      },
      {
        wrong: 'Credevo che hanno finito.',
        correct: 'Credevo che avessero finito.',
        note: 'Verbo principale al passato + anteriorita = congiuntivo trapassato.',
      },
    ],
    related: [
      'congiuntivo-imperfetto',
      'periodo-ipotetico-2',
      'se-congiuntivo',
      'concordanza-congiuntivo',
    ],
  },
  {
    slug: 'concordanza-congiuntivo',
    title: 'Concordanza del congiuntivo',
    level: 'B2',
    category: 'Congiuntivo',
    summary:
      'Coordinare correttamente i tempi del congiuntivo con la principale.',
    explanation:
      '**Principale al presente:**\n- Contemporaneita: congiuntivo presente. *Penso che sia vero.*\n- Anteriorita: congiuntivo passato. *Penso che sia stato vero.*\n\n**Principale al passato:**\n- Contemporaneita: congiuntivo imperfetto. *Pensavo che fosse vero.*\n- Anteriorita: congiuntivo trapassato. *Pensavo che fosse stato vero.*',
    rules: [
      'Princ. presente + contemporaneita = congiuntivo presente.',
      'Princ. presente + anteriorita = congiuntivo passato.',
      'Princ. passato + contemporaneita = congiuntivo imperfetto.',
      'Princ. passato + anteriorita = congiuntivo trapassato.',
    ],
    examples: [
      {
        english: 'Penso che lui dica la verita.',
        translation: 'I think he is telling the truth.',
      },
      {
        english: 'Penso che lui abbia detto la verita.',
        translation: 'I think he told the truth.',
      },
      {
        english: 'Pensavo che lui dicesse la verita.',
        translation: 'I thought he was telling the truth.',
      },
      {
        english: 'Pensavo che lui avesse detto la verita.',
        translation: 'I thought he had told the truth.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Penso che lui dicesse la verita.',
        correct: 'Penso che lui dica la verita.',
        note: 'Presente + contemporaneita = presente.',
      },
      {
        wrong: 'Pensavo che lui dica la verita.',
        correct: 'Pensavo che lui dicesse la verita.',
        note: 'Passato + contemporaneita = imperfetto.',
      },
    ],
    related: [
      'congiuntivo-presente',
      'congiuntivo-imperfetto',
      'congiuntivo-trapassato',
      'concordanza-tempi',
    ],
  },
  {
    slug: 'stare-gerundio',
    title: 'Stare + gerundio',
    level: 'B2',
    category: 'Tempi verbali',
    summary:
      'Esprimere azioni in corso con la perifrasi progressiva stare + gerundio.',
    structure: 'stare + gerundio',
    explanation:
      '**Stare + gerundio** = azione in corso.\n- Presente: *Sto mangiando.*\n- Imperfetto: *Stavo mangiando.*\n\nGerundio: -are → -ando, -ere/-ire → -endo.\n\nDiverso da stare per: *Sto per mangiare* (imminenza) vs *Sto mangiando* (in corso).',
    rules: [
      'Stare + gerundio = azione in corso.',
      'Gerundio: -ando (-are), -endo (-ere, -ire).',
      'Non confondere con stare per + infinito.',
      'Si puo usare al presente e all imperfetto.',
    ],
    examples: [
      {
        english: 'Sto leggendo un libro interessante.',
        translation: "I'm reading an interesting book.",
      },
      {
        english: 'Cosa stavi facendo quando ti ho chiamato?',
        translation: 'What were you doing when I called you?',
      },
      { english: 'Stanno arrivando!', translation: 'They are arriving!' },
    ],
    common_mistakes: [
      {
        wrong: 'Sto per mangiando.',
        correct: 'Sto per mangiare. (o: Sto mangiando.)',
        note: 'Stare per + infinito vs stare + gerundio.',
      },
      {
        wrong: 'Sono mangiando.',
        correct: 'Sto mangiando.',
        note: 'La perifrasi progressiva usa stare, non essere.',
      },
    ],
    related: ['andare-gerundio', 'venire-gerundio', 'stare-per'],
  },
  {
    slug: 'andare-gerundio',
    title: 'Andare + gerundio',
    level: 'B2',
    category: 'Tempi verbali',
    summary: 'Esprimere azioni graduali e progressive con andare + gerundio.',
    structure: 'andare + gerundio',
    explanation:
      '**Andare + gerundio** esprime:\n- Processo graduale: *La situazione va migliorando.*\n- Sviluppo lento: *Va facendo progressi.*\n- Azione continuativa: *Vado dicendo a tutti che...*\n\nDiverso da stare + gerundio (puntuale): sottolinea l evoluzione nel tempo.',
    rules: [
      'Andare + gerundio = processo graduale/progressivo.',
      'Sottolinea evoluzione nel tempo.',
      'Diverso da stare + gerundio (piu puntuale).',
      'Spesso con verbi di cambiamento.',
    ],
    examples: [
      {
        english: 'La situazione va migliorando.',
        translation: 'The situation is getting better.',
      },
      {
        english: 'Il tempo andava peggiorando.',
        translation: 'The weather was getting worse.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Vado a migliorando.',
        correct: 'Vado migliorando.',
        note: 'Andare + gerundio senza preposizione.',
      },
    ],
    related: ['stare-gerundio', 'venire-gerundio', 'imperfetto'],
  },
  {
    slug: 'venire-gerundio',
    title: 'Venire + gerundio',
    level: 'B2',
    category: 'Tempi verbali',
    summary:
      'Esprimere azioni progressive con enfasi tramite venire + gerundio.',
    structure: 'venire + gerundio',
    explanation:
      '**Venire + gerundio** e simile a stare + gerundio ma con enfasi sul processo.\n- *Ti vengo dicendo da tempo che...* (enfasi)\n- *Vengono arrivando notizie.* (ripetizione)\n\nMeno comune, piu formale/letterario.',
    rules: [
      'Venire + gerundio = azione progressiva con enfasi.',
      'Simile a stare + gerundio ma meno comune.',
      'Uso piu formale o letterario.',
      'Sottolinea continuita o ripetizione.',
    ],
    examples: [
      {
        english: 'Ti vengo dicendo da mesi di fare attenzione.',
        translation: "I've been telling you for months to be careful.",
      },
    ],
    common_mistakes: [
      {
        wrong: 'Vengo a dicendo.',
        correct: 'Vengo dicendo.',
        note: 'Venire + gerundio senza preposizione.',
      },
    ],
    related: ['stare-gerundio', 'andare-gerundio', 'imperfetto'],
  },
  {
    slug: 'connettivi-avanzati',
    title: 'Connettivi avanzati',
    level: 'B2',
    category: 'Avanzato',
    summary:
      'Nondimeno, ciononostante, peraltro, bensi, eppure e altri connettivi complessi.',
    explanation:
      'Connettivi avanzati:\n- **Nondimeno / ciononostante**: tuttavia.\n- **Bensi**: ma piuttosto. *Non e cattivo, bensi timido.*\n- **Eppure**: e tuttavia. *Sembrava facile, eppure ho sbagliato.*\n- **Anzi**: al contrario. *Non e brutto, anzi e bellissimo.*\n- **Ovvero / ossia**: cioe.',
    rules: [
      'Bensi dopo negazione per correggere: non X, bensi Y.',
      'Anzi per rafforzare o correggere.',
      'Eppure per contrasto con aspettativa delusa.',
      'Ovvero/ossia per spiegare o ridefinire.',
    ],
    examples: [
      {
        english: 'Non e pigro, bensi molto metodico.',
        translation: "He's not lazy, but rather very methodical.",
      },
      {
        english: "Avevo studiato molto, eppure non ho passato l'esame.",
        translation: "I'd studied a lot, yet I didn't pass.",
      },
      {
        english: 'Non mi piace, anzi lo detesto.',
        translation: "I don't like it, on the contrary I hate it.",
      },
    ],
    common_mistakes: [
      {
        wrong: 'Non e rosso ma bensi blu.',
        correct: 'Non e rosso, bensi blu.',
        note: 'Bensi sostituisce ma, non si usano insieme.',
      },
    ],
    related: [
      'connettivi-argomentativi',
      'controargomentazione',
      'struttura-argomentativa',
    ],
  },
  {
    slug: 'coesione-testuale',
    title: 'Coesione testuale',
    level: 'B2',
    category: 'Avanzato',
    summary:
      'Strategie per rendere un testo coeso: anafora, catafora, connettivi.',
    explanation:
      'Meccanismi di coesione:\n- **Anafora:** riprendere un elemento. *Marco e arrivato. Lui era stanco.*\n- **Catafora:** anticipare. *Lo vedo che sei triste.*\n- **Ellissi:** omettere elementi recuperabili.\n- **Coesione lessicale:** sinonimi, iperonimi.\n- **Connettivi:** relazioni logiche tra frasi.',
    rules: [
      'Anafora: pronomi, sinonimi per riprendere elementi.',
      'Catafora: anticipare con pronomi o avverbi.',
      'Ellissi: omettere cio che e recuperabile.',
      'Coesione lessicale: ripetizione, sinonimia, iperonimia.',
    ],
    examples: [
      {
        english: "Ho comprato un libro. L'ho letto in due giorni.",
        translation: 'I bought a book. I read it in two days.',
        note: 'anafora',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Marco ha comprato un libro. Il quaderno era interessante.',
        correct: 'Marco ha comprato un libro. Il libro era interessante.',
        note: 'Mancanza di coesione.',
      },
    ],
    related: [
      'connettivi-avanzati',
      'struttura-argomentativa',
      'sintesi-testuale',
    ],
  },
  {
    slug: 'registro-formale',
    title: 'Registro formale',
    level: 'B2',
    category: 'Avanzato',
    summary:
      'Padroneggiare il registro formale: Lei, congiuntivo, lessico elevato.',
    explanation:
      'Caratteristiche del registro formale:\n- **Pronomi:** Lei di cortesia.\n- **Congiuntivo:** uso rigoroso.\n- **Lessico:** evitare colloquialismi.\n- **Sintassi:** frasi complesse, subordinate implicite.\n- **Fraseologia:** *La ringrazio, Le porgo i miei saluti.*',
    rules: [
      'Usare il Lei con verbo alla 3a singolare.',
      'Congiuntivo obbligatorio nelle subordinate.',
      'Evitare colloquialismi e dislocazioni.',
      'Formule di apertura e chiusura appropriate.',
    ],
    examples: [
      {
        english: 'La ringrazio per la Sua disponibilita.',
        translation: 'I thank you for your availability.',
      },
      {
        english: 'Le sarei grato se volesse rispondermi.',
        translation: 'I would be grateful if you would reply.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Ti ringrazio (in mail formale).',
        correct: 'La ringrazio.',
        note: 'Contesto formale = Lei, non tu.',
      },
    ],
    related: ['congiuntivo-presente', 'pronomi-soggetto', 'discorso-indiretto'],
  },
  {
    slug: 'modi-di-dire',
    title: 'Modi di dire italiani',
    level: 'B2',
    category: 'Avanzato',
    summary: 'Espressioni idiomatiche italiane comuni e il loro significato.',
    explanation:
      "Modi di dire comuni:\n- *In bocca al lupo!* = Buona fortuna!\n- *Acqua in bocca!* = Non dire niente.\n- *Essere al verde* = Non avere soldi.\n- *Non vedere l'ora* = Aspettare con impazienza.\n- *Piovere a catinelle* = Piovere forte.\n- *Avere un chiodo fisso* = Avere un'ossessione.",
    rules: [
      'I modi di dire sono espressioni fisse, non si modificano.',
      'Il significato e metaforico, non letterale.',
      'Variano da regione a regione.',
      'Usarli rende il discorso piu naturale.',
    ],
    examples: [
      {
        english: "In bocca al lupo per l'esame!",
        translation: 'Good luck for the exam!',
      },
      {
        english: 'Sono al verde questo mese.',
        translation: "I'm broke this month.",
      },
      {
        english: "Non vedo l'ora di vederti!",
        translation: "I can't wait to see you!",
      },
    ],
    common_mistakes: [
      {
        wrong: 'In bocca di lupo!',
        correct: 'In bocca al lupo!',
        note: 'Espressione fissa: al lupo, non di lupo.',
      },
    ],
    related: [
      'espressioni-colloquiali',
      'proverbi-italiani',
      'linguaggio-giornalistico',
    ],
  },
  {
    slug: 'espressioni-colloquiali',
    title: 'Espressioni colloquiali',
    level: 'B2',
    category: 'Avanzato',
    summary:
      'Il linguaggio di tutti i giorni: dai, insomma, figurati, magari, boh.',
    explanation:
      "Espressioni tipiche del parlato informale:\n- **Dai!**: suvvia, forza (incoraggiamento o incredulita).\n- **Insomma**: in conclusione.\n- **Figurati!**: non preoccuparti, di niente.\n- **Magari!**: sarebbe bello, lo spero tanto.\n- **Boh!**: non lo so.\n- **Mica**: rafforza la negazione. *Mica male!*\n- **Ci sta**: e accettabile, ha senso.\n- **Va be'**: va bene (rassegnazione).",
    rules: [
      'Usare solo in contesti informali.',
      'Dai puo esprimere incoraggiamento o incredulita.',
      'Magari esprime desiderio o possibilita remota.',
      'Mica rafforza la negazione nel parlato.',
    ],
    examples: [
      {
        english: 'Dai, andiamo al cinema!',
        translation: "Come on, let's go to the cinema!",
      },
      {
        english: 'Hai visto la partita? — Magari! Ero al lavoro.',
        translation: 'Did you see the match? — I wish! I was at work.',
      },
      {
        english: '— Grazie mille! — Figurati!',
        translation: "— Thank you so much! — Don't mention it!",
      },
    ],
    common_mistakes: [
      {
        wrong: 'Figurati! (a un professore)',
        correct: 'Si figuri! (o: Di niente.)',
        note: 'Con il Lei formale si usa si figuri.',
      },
      {
        wrong: 'Magari piove. (per dire forse)',
        correct: 'Forse piove.',
        note: 'Magari = sarebbe bello se, non = forse.',
      },
    ],
    related: ['modi-di-dire', 'registro-formale', 'proverbi-italiani'],
  },
  {
    slug: 'proverbi-italiani',
    title: 'Proverbi italiani',
    level: 'B2',
    category: 'Avanzato',
    summary: 'I proverbi italiani piu famosi e il loro significato culturale.',
    explanation:
      "Proverbi celebri:\n- *Chi dorme non piglia pesci.* = L'impegno porta risultati.\n- *Il mattino ha l'oro in bocca.* = Le prime ore sono produttive.\n- *Chi va piano va sano e va lontano.* = Costanza > fretta.\n- *Tra il dire e il fare c'e di mezzo il mare.* = Tra parole e azioni c'e molta differenza.\n- *Non tutto il male viene per nuocere.* = Aspetti positivi dalle avversita.\n- *Meglio tardi che mai.*\n- *Paese che vai, usanza che trovi.*",
    rules: [
      'I proverbi sono espressioni fisse e immutabili.',
      'Spesso contengono rime o assonanze.',
      'Riflettono la cultura e la storia italiana.',
      'Si usano per dare autorevolezza a un discorso.',
    ],
    examples: [
      {
        english:
          'Chi dorme non piglia pesci: alzati presto e mettiti a studiare!',
        translation: 'The early bird catches the worm!',
      },
      {
        english: 'Non preoccuparti: non tutto il male viene per nuocere.',
        translation: "Don't worry: every cloud has a silver lining.",
      },
      {
        english:
          'Ho consegnato il progetto in ritardo, ma meglio tardi che mai!',
        translation:
          'I handed in the project late, but better late than never!',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Chi non dorme piglia pesci.',
        correct: 'Chi dorme non piglia pesci.',
        note: 'Il proverbio e fisso.',
      },
      {
        wrong: 'Meglio mai che tardi.',
        correct: 'Meglio tardi che mai.',
        note: "L'ordine e importante nel proverbio.",
      },
    ],
    related: ['modi-di-dire', 'espressioni-colloquiali', 'italiano-regionale'],
  },
  {
    slug: 'struttura-argomentativa',
    title: 'Struttura argomentativa',
    level: 'B2',
    category: 'Avanzato',
    summary:
      'Costruire un testo argomentativo: tesi, antitesi, prove, conclusione.',
    explanation:
      "Struttura del testo argomentativo:\n1. **Introduzione:** tema e tesi.\n2. **Argomenti a favore:** prove, esempi, dati.\n3. **Antitesi:** obiezioni.\n4. **Confutazione:** rispondere alle obiezioni.\n5. **Conclusione:** riaffermare la tesi.\n\nConnettivi: *innanzitutto, inoltre, infatti, d'altra parte, tuttavia, quindi, in conclusione.*",
    rules: [
      "Tesi chiara all'inizio del testo.",
      'Ogni paragrafo sviluppa un argomento.',
      'Antitesi e confutazione rafforzano la posizione.',
      'Conclusione che riprende la tesi senza ripetere.',
    ],
    examples: [
      {
        english:
          'In questo saggio sosterrò che lo studio delle lingue straniere è fondamentale. Innanzitutto... Inoltre... Tuttavia alcuni obiettano che... Ma queste obiezioni non tengono conto di...',
        translation:
          'In this essay I will argue that studying foreign languages is essential. First of all... Furthermore...',
      },
    ],
    common_mistakes: [
      {
        wrong: "Tesi confusa o assente all'inizio.",
        correct: 'Esplicitare la tesi nel primo paragrafo.',
        note: "Un testo argomentativo deve far capire subito la posizione dell'autore.",
      },
      {
        wrong: 'Saltare dalla tesi alla conclusione senza argomenti.',
        correct: 'Sviluppare almeno 2-3 argomenti a favore.',
        note: 'La parte argomentativa e il cuore del testo.',
      },
    ],
    related: [
      'controargomentazione',
      'connettivi-avanzati',
      'coesione-testuale',
    ],
  },
  {
    slug: 'controargomentazione',
    title: 'Tecniche di controargomentazione',
    level: 'B2',
    category: 'Avanzato',
    summary: 'Rispondere alle obiezioni in modo strutturato ed efficace.',
    explanation:
      "Tecniche di controargomentazione:\n- **Concessione limitata:** *E vero che... tuttavia...*\n- **Confutazione diretta:** *Si potrebbe obiettare che... ma in realta...*\n- **Ribaltamento:** *Alcuni dicono che... al contrario...*\n- **Riduzione all'assurdo:** *Se fosse vero che... allora...*\n\nConnettivi: *certamente, e vero che, si potrebbe pensare che, ciononostante.*",
    rules: [
      'Riconoscere il punto di vista avversario.',
      'Usare connettivi concessivi: benche, sebbene, anche se.',
      'Ribattere con argomenti piu forti.',
      'Mantenere un tono rispettoso anche nel dissenso.',
    ],
    examples: [
      {
        english:
          "E vero che l'intelligenza artificiale puo sostituire alcuni lavori, tuttavia ne creera di nuovi.",
        translation:
          "It's true that AI can replace some jobs, however it will create new ones.",
      },
    ],
    common_mistakes: [
      {
        wrong: 'Ignorare completamente le obiezioni.',
        correct: 'Affrontare le obiezioni principali e confutarle.',
        note: 'Una buona argomentazione considera anche i punti deboli.',
      },
    ],
    related: [
      'struttura-argomentativa',
      'connettivi-avanzati',
      'coesione-testuale',
    ],
  },
  {
    slug: 'sfumature',
    title: 'Sfumature di significato',
    level: 'B2',
    category: 'Avanzato',
    summary:
      'Distinguere sinonimi con sfumature diverse e scegliere la parola giusta.',
    explanation:
      'Sinonimi con sfumature:\n- Vedere / Guardare / Osservare: generico / volontario / attento.\n- Dire / Affermare / Dichiarare: intensita crescente.\n- Contento / Felice / Euforico: intensita crescente.\n- Casa / Abitazione / Dimora: registro crescente.\n- Fare / Realizzare / Effettuare: da generico a formale.',
    rules: [
      'Preferire il termine piu preciso al generico.',
      'Adeguare il lessico al registro (formale/informale).',
      "Considerare l'intensita della parola.",
      'Usare il dizionario dei sinonimi per esplorare opzioni.',
    ],
    examples: [
      {
        english: 'Ho osservato il quadro per ore.',
        translation: 'I observed the painting for hours.',
        note: 'osservare = guardare con attenzione',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Ho visto il panorama con attenzione.',
        correct: 'Ho osservato/ammirato il panorama con attenzione.',
        note: 'Vedere e generico; per attenzione si usa osservare.',
      },
    ],
    related: ['precisione-lessicale', 'registro-formale', 'campi-semantici'],
  },
  {
    slug: 'tempi-narrativi',
    title: 'Tempi narrativi',
    level: 'B2',
    category: 'Tempi verbali',
    summary:
      'Usare imperfetto, passato remoto e trapassato per narrare eventi.',
    explanation:
      "Nella narrazione letteraria:\n- **Imperfetto:** sfondo, descrizioni. *Era una notte buia.*\n- **Passato remoto:** azioni che avanzano la trama. *Entro, si guardo intorno.*\n- **Trapassato prossimo:** flashback. *Aveva gia deciso di partire.*\n\nL'alternanza crea profondita narrativa.",
    rules: [
      'Imperfetto = sfondo, descrizione, atmosfera.',
      'Passato remoto = azioni principali, avanzamento trama.',
      'Trapassato prossimo = flashback, anteriorita.',
      'Alternare i tempi per creare ritmo narrativo.',
    ],
    examples: [
      {
        english:
          "Era una notte buia e tempestosa. All'improvviso, un lampo illumino la stanza. Qualcuno era entrato.",
        translation:
          'It was a dark and stormy night. Suddenly, a flash lit up the room. Someone had entered.',
        note: 'imperfetto + pass. remoto + trapassato',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Usare solo passato prossimo per narrare.',
        correct: 'Alternare imperfetto, passato remoto e trapassato.',
        note: 'Il passato remoto e il tempo della narrazione per eccellenza.',
      },
    ],
    related: [
      'imperfetto',
      'passato-remoto',
      'trapassato-prossimo',
      'descrizione-letteraria',
    ],
  },
  {
    slug: 'descrizione-letteraria',
    title: 'Descrizione letteraria',
    level: 'B2',
    category: 'Avanzato',
    summary:
      'Tecniche per descrizioni efficaci nella scrittura creativa e letteraria.',
    explanation:
      'Tecniche di descrizione letteraria:\n- **Cinque sensi:** vista, udito, olfatto, tatto, gusto.\n- **Aggettivazione mirata:** pochi aggettivi ma precisi.\n- **Similitudini e metafore:** *Il cielo era come un mare di fuoco.*\n- **Personificazione:** *Il vento sussurrava tra gli alberi.*\n- **Sinestesia:** mescolare i sensi. *Un profumo dolce.*',
    rules: [
      'Coinvolgere tutti e cinque i sensi.',
      'Usare aggettivi specifici, non generici.',
      'Similitudini e metafore per descrizioni vivide.',
      "Mostrare, non dire (show, don't tell).",
    ],
    examples: [
      {
        english:
          'Il sole al tramonto tingeva il cielo di arancione e viola. Un vento tiepido portava il profumo del mare.',
        translation:
          'The setting sun dyed the sky orange and purple. A warm wind carried the scent of the sea.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Era bello. (descrizione generica)',
        correct:
          "Il panorama era mozzafiato: colline verdi si estendevano a perdita d'occhio.",
        note: 'Mostrare con dettagli concreti invece di dire solo che e bello.',
      },
    ],
    related: ['tempi-narrativi', 'voce-narrativa', 'figure-stilistiche'],
  },
  {
    slug: 'passato-remoto',
    title: 'Passato remoto',
    level: 'B2',
    category: 'Tempi verbali',
    summary:
      'Il passato remoto: formazione e uso nella narrazione e nel Sud Italia.',
    structure:
      '-are → -ai/-asti/-o/-ammo/-aste/-arono\n-ere → -ei/-esti/-e/-emmo/-este/-erono\n-ire → -ii/-isti/-i/-immo/-iste/-irono',
    explanation:
      "Il **passato remoto** esprime azioni concluse in un passato lontano, senza legami col presente.\n\n**Formazione:**\n- parlare: parlai, parlasti, parlo, parlammo, parlaste, parlarono.\n- leggere: lessi, leggesti, lesse, leggemmo, leggeste, lessero.\n- dormire: dormii, dormisti, dormi, dormimmo, dormiste, dormirono.\n\nMolti verbi hanno il passato remoto irregolare (spesso nella 1a e 3a singolare e 3a plurale).\n\nNell'Italia settentrionale si usa poco, sostituito dal passato prossimo; al Sud e in letteratura e vivo.",
    rules: [
      'Passato remoto = azione conclusa in passato lontano.',
      'Molti verbi irregolari: essere (fui), avere (ebbi), fare (feci), dire (dissi), scrivere (scrissi).',
      'Uso vivo al Sud; al Nord spesso sostituito dal passato prossimo.',
      'E il tempo narrativo per eccellenza.',
    ],
    examples: [
      {
        english: 'Dante nacque a Firenze nel 1265.',
        translation: 'Dante was born in Florence in 1265.',
      },
      {
        english: "Lessi quel libro l'estate scorsa. (Sud)",
        translation: 'I read that book last summer.',
      },
      {
        english: 'Fecero tutto il possibile per aiutarci.',
        translation: 'They did everything possible to help us.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Ieri andiedi al cinema.',
        correct: 'Ieri andai al cinema. (o: sono andato)',
        note: 'Andare: passato remoto irregolare → andai.',
      },
      {
        wrong: 'Usare il passato remoto per eventi recenti (al Nord).',
        correct: 'Preferire il passato prossimo per eventi recenti al Nord.',
        note: 'Al Nord il passato remoto e sentito come formale/letterario.',
      },
    ],
    related: [
      'imperfetto',
      'tempi-narrativi',
      'trapassato-prossimo',
      'concordanza-tempi',
    ],
  },
  {
    slug: 'linguaggio-giornalistico',
    title: 'Linguaggio giornalistico',
    level: 'B2',
    category: 'Avanzato',
    summary: 'Caratteristiche del linguaggio dei giornali italiani.',
    explanation:
      "Il linguaggio giornalistico italiano ha caratteristiche proprie:\n- **Titoli:** spesso senza articolo, con ellissi verbale. *Governo in crisi, elezioni anticipate.*\n- **Stile nominale:** *Allarme rosso per l'economia.*\n- **Participi assoluti:** *Concluso il vertice, il premier ha parlato.*\n- **Lessico tecnico-politico:** *vertice, crisi, manovra, decreto.*\n- **Neologismi e anglicismi:** *spread, spending review, Jobs Act.*\n- **Ripetizioni evitare:** ampio uso di sinonimi e perifrasi.",
    rules: [
      'Titoli stringati, spesso senza verbo o articolo.',
      'Stile nominale: sostantivi invece di verbi.',
      'Participi assoluti per esprimere anteriorita.',
      'Lessico specifico del settore trattato.',
    ],
    examples: [
      {
        english: 'Crisi di governo: il Presidente sale al Quirinale.',
        translation: 'Government crisis: the President goes to the Quirinale.',
      },
      {
        english: "Firmato l'accordo, le parti hanno rilasciato dichiarazioni.",
        translation:
          'Having signed the agreement, the parties released statements.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Usare linguaggio colloquiale in un articolo formale.',
        correct: 'Mantenere un registro formale e oggettivo.',
        note: 'Il giornalismo richiede un registro piu elevato.',
      },
    ],
    related: ['titoli', 'registro-formale', 'discorso-riportato'],
  },
  {
    slug: 'titoli',
    title: 'Titoli giornalistici',
    level: 'B2',
    category: 'Avanzato',
    summary: 'Come sono costruiti i titoli nei giornali italiani.',
    explanation:
      "I titoli giornalistici italiani seguono regole precise:\n- **Ellissi dell'articolo:** *Borsa in rialzo* (non: La borsa in rialzo).\n- **Presente storico:** *Crolla il governo.*\n- **Stile nominale:** *Paura per il terremoto.*\n- **Ellissi verbale:** *Scontri a Roma.*\n\nI titoli a effetto usano anche metafore, giochi di parole e riferimenti culturali.",
    rules: [
      'Spesso senza articolo iniziale.',
      'Presente storico per eventi passati.',
      'Stile nominale senza verbo.',
      "Metafore e giochi di parole per attirare l'attenzione.",
    ],
    examples: [
      {
        english: 'Crolla la Borsa: persi 50 miliardi.',
        translation: 'Stock market crashes: 50 billion lost.',
      },
      {
        english: 'Mafia, maxi-operazione: 50 arresti.',
        translation: 'Mafia, major operation: 50 arrests.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Titolo troppo lungo e descrittivo.',
        correct: 'Titolo breve, incisivo, spesso senza verbo o articolo.',
        note: "I titoli italiani sono stringati e d'effetto.",
      },
    ],
    related: [
      'linguaggio-giornalistico',
      'discorso-riportato',
      'registro-formale',
    ],
  },
  {
    slug: 'discorso-riportato',
    title: 'Discorso riportato nei media',
    level: 'B2',
    category: 'Discorso indiretto',
    summary: 'Come i media italiani riportano le dichiarazioni altrui.',
    explanation:
      'Il discorso riportato nei media:\n- **Condizionale di dissociazione:** il giornalista prende le distanze. *Il ministro avrebbe dichiarato...*\n- **Virgolettato:** citazione diretta.\n- **Discorso indiretto libero:** mescola diretto e indiretto.\n\nIl condizionale di dissociazione e tipico: segnala che la notizia non e confermata.',
    rules: [
      'Condizionale di dissociazione per notizie non confermate.',
      'Virgolettato per citazioni testuali.',
      'Indiretto libero per fluidita narrativa.',
      'Verbi dichiarativi: affermare, dichiarare, sostenere, riferire.',
    ],
    examples: [
      {
        english:
          'Secondo fonti vicine al governo, il premier si dimetterebbe entro domani.',
        translation:
          'According to sources close to the government, the PM would resign by tomorrow.',
        note: 'condizionale di dissociazione',
      },
      {
        english:
          '"Non abbiamo nulla da nascondere", ha dichiarato il portavoce.',
        translation: "'We have nothing to hide,' stated the spokesperson.",
      },
    ],
    common_mistakes: [
      {
        wrong: 'Il ministro ha detto che si dimettera. (senza fonte certa)',
        correct: 'Il ministro si dimetterebbe. (condizionale di dissociazione)',
        note: 'Se la notizia non e confermata, si usa il condizionale.',
      },
    ],
    related: [
      'linguaggio-giornalistico',
      'titoli',
      'discorso-indiretto',
      'condizionale-presente',
    ],
  },
  {
    slug: 'congiuntivo-concessivo',
    title: 'Congiuntivo concessivo',
    level: 'C1',
    category: 'Congiuntivo',
    summary:
      'Benche, sebbene, nonostante, malgrado + congiuntivo per esprimere concessione.',
    explanation:
      'Le congiunzioni concessive richiedono il congiuntivo.\n\n- **Benche** / **Sebbene** + congiuntivo: *Benche piovesse, uscimmo.*\n- **Nonostante** / **Malgrado** + congiuntivo: *Nonostante fosse tardi, continuarono.*\n- **Anche se** + indicativo (eccezione): *Anche se pioveva, uscimmo.*\n\nLa scelta del tempo del congiuntivo segue la concordanza.',
    rules: [
      'Benche, sebbene, nonostante, malgrado + congiuntivo.',
      'Anche se + indicativo (eccezione nelle concessive).',
      'Concordanza: presente → cong. presente; passato → cong. imperfetto.',
      'Registro formale richiede il congiuntivo.',
    ],
    examples: [
      {
        english: 'Benche fosse stanco, continuo a lavorare.',
        translation: 'Although he was tired, he kept working.',
      },
      {
        english: 'Nonostante abbia studiato molto, non ha passato l esame.',
        translation: "Despite having studied a lot, he didn't pass the exam.",
      },
      {
        english: 'Sebbene sia tardi, resto ancora un po.',
        translation: "Although it's late, I'll stay a little longer.",
      },
    ],
    common_mistakes: [
      {
        wrong: 'Benche era stanco, continuo.',
        correct: 'Benche fosse stanco, continuo.',
        note: 'Benche richiede sempre il congiuntivo.',
      },
      {
        wrong: 'Anche se fosse tardi... (non necessario)',
        correct: 'Anche se era tardi...',
        note: "Anche se regge l'indicativo, non il congiuntivo.",
      },
    ],
    related: [
      'congiuntivo-presente',
      'congiuntivo-imperfetto',
      'connettivi-argomentativi',
    ],
  },
  {
    slug: 'congiuntivo-finale',
    title: 'Congiuntivo finale (scopo)',
    level: 'C1',
    category: 'Congiuntivo',
    summary:
      "Affinche, perche (scopo) + congiuntivo per esprimere lo scopo di un'azione.",
    explanation:
      'Le proposizioni finali esprimono lo scopo e richiedono il congiuntivo.\n\n- **Affinche** + congiuntivo: *Parlo lentamente affinche tu capisca.*\n- **Perche** + congiuntivo: *Te lo dico perche tu lo sappia.*\n- **Acciocche** (letterario) + congiuntivo.\n\nCon lo stesso soggetto si usa per + infinito: *Studio per imparare.*',
    rules: [
      'Affinche, perche (scopo) + congiuntivo.',
      'Stesso soggetto: per + infinito.',
      'Tempo del congiuntivo secondo concordanza.',
      'Registro formale: affinche; colloquiale: perche.',
    ],
    examples: [
      {
        english: 'Ti scrivo affinche tu sia informato.',
        translation: "I'm writing so that you are informed.",
      },
      {
        english: 'Parlo ad alta voce perche tutti sentano.',
        translation: 'I speak loudly so that everyone can hear.',
      },
      {
        english: 'Studio ogni giorno per migliorare. (stesso soggetto)',
        translation: 'I study every day to improve.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Ti scrivo affinche sei informato.',
        correct: 'Ti scrivo affinche tu sia informato.',
        note: 'Affinche richiede il congiuntivo.',
      },
      {
        wrong: 'Studio per che imparo.',
        correct: 'Studio per imparare. (o: Studio affinche io impari.)',
        note: 'Stesso soggetto → per + infinito.',
      },
    ],
    related: [
      'congiuntivo-presente',
      'congiuntivo-concessivo',
      'connettivi-argomentativi',
    ],
  },
  {
    slug: 'congiuntivo-relativo',
    title: 'Congiuntivo nelle relative',
    level: 'C1',
    category: 'Congiuntivo',
    summary:
      'Uso del congiuntivo nelle proposizioni relative per esprimere carattere restrittivo o eventuale.',
    explanation:
      "Il congiuntivo nelle relative esprime:\n- **Carattere eventuale/ipotetico:** *Cerco una persona che parli inglese.* (non so se esista)\n- **Con superlativo relativo:** *E il libro piu bello che io abbia mai letto.*\n- **Dopo negazione o restrizione:** *Non c'e nessuno che possa aiutarmi.*\n\nL'indicativo si usa per fatti certi: *Conosco una persona che parla inglese.*",
    rules: [
      'Congiuntivo = ipotetico/non certo.',
      'Indicativo = fatto certo/reale.',
      'Dopo superlativo relativo si usa il congiuntivo.',
      'Dopo espressioni negative restrittive: nessuno che, niente che.',
    ],
    examples: [
      {
        english:
          'Cerco un libro che spieghi bene la grammatica. (non so se esiste)',
        translation: "I'm looking for a book that explains grammar well.",
        note: 'ipotetico',
      },
      {
        english: 'E il film piu emozionante che io abbia mai visto.',
        translation: "It's the most exciting film I've ever seen.",
        note: 'superlativo',
      },
      {
        english: 'Conosco un libro che spiega bene la grammatica.',
        translation: 'I know a book that explains grammar well.',
        note: 'certo → indicativo',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Cerco una persona che parla inglese. (ma non so se esista)',
        correct: 'Cerco una persona che parli inglese.',
        note: 'Se la persona non e certa, si usa il congiuntivo.',
      },
      {
        wrong: 'E il piu bello che ho mai visto.',
        correct: 'E il piu bello che abbia mai visto.',
        note: 'Dopo superlativo relativo serve il congiuntivo.',
      },
    ],
    related: ['che-relativo', 'cui', 'congiuntivo-presente', 'superlativi'],
  },
  {
    slug: 'nominalizzazione',
    title: 'Nominalizzazione',
    level: 'C1',
    category: 'Avanzato',
    summary:
      'Trasformare verbi e aggettivi in nomi per uno stile piu formale e denso.',
    explanation:
      "La nominalizzazione trasforma verbi/aggettivi in sostantivi, tipica dello stile formale e accademico.\n\n- Verbo → nome: *costruire → la costruzione; analizzare → l'analisi.*\n- Aggettivo → nome: *rapido → la rapidita; bello → la bellezza.*\n\nVantaggi: concisione, oggettivita, formalita.\nSvantaggi: puo rendere il testo pesante e astratto.",
    rules: [
      'Verbi in -zione, -mento, -aggio: costruzione, cambiamento, atterraggio.',
      'Aggettivi in -(e)zza, -ita: bellezza, rapidita.',
      'Utile nello stile accademico, giuridico, tecnico.',
      'Evitare accumulo eccessivo di nominalizzazioni.',
    ],
    examples: [
      {
        english:
          "L'analisi dei dati ha richiesto tre mesi. (invece di: Abbiamo analizzato i dati per tre mesi.)",
        translation: 'The analysis of the data took three months.',
      },
      {
        english: 'La costruzione del ponte fu completata nel 2010.',
        translation: 'The construction of the bridge was completed in 2010.',
      },
    ],
    common_mistakes: [
      {
        wrong:
          "Eccesso di nominalizzazioni: 'L'effettuazione della verifica della documentazione...'",
        correct: 'Verificare la documentazione...',
        note: 'Troppe nominalizzazioni appesantiscono il testo.',
      },
    ],
    related: ['registro-formale', 'sintesi-testuale', 'impersonalita'],
  },
  {
    slug: 'impersonalita',
    title: 'Impersonalita e distacco',
    level: 'C1',
    category: 'Avanzato',
    summary:
      'Tecniche per esprimere impersonalita e distacco nel registro formale.',
    explanation:
      "Strategie per l'impersonalita:\n- **Si impersonale/passivante:** *Si ritiene che...*\n- **Forma passiva:** *E stato dimostrato che...*\n- **Costruzioni impersonali:** *Bisogna, occorre, e necessario.*\n- **Soggetto generico:** *Uno, taluni, certi.*\n- **Infinito sostantivato:** *Il fare, il dire.*",
    rules: [
      'Si impersonale per affermazioni generali.',
      "Forma passiva per mettere in risalto l'azione.",
      'Evitare prima persona (io, noi) in testi formali.',
      'Costruzioni con va + participio: va notato, va detto.',
    ],
    examples: [
      {
        english: 'Si ritiene che la situazione sia migliorata.',
        translation: 'It is believed that the situation has improved.',
      },
      {
        english: 'E stato osservato un aumento dei prezzi.',
        translation: 'An increase in prices has been observed.',
      },
      {
        english: 'Va notato che i risultati sono preliminari.',
        translation: 'It should be noted that the results are preliminary.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Io penso che... (in un testo accademico)',
        correct: 'Si ritiene che... / E opinione diffusa che...',
        note: 'In testi formali evitare la prima persona.',
      },
    ],
    related: ['si-impersonale', 'forma-passiva', 'registro-formale'],
  },
  {
    slug: 'campi-semantici',
    title: 'Campi semantici',
    level: 'C1',
    category: 'Avanzato',
    summary: 'Raggruppare e organizzare il lessico per campi semantici.',
    explanation:
      "Un campo semantico e un insieme di parole legate da significato comune.\n\nEsempi:\n- **Meteorologia:** pioggia, neve, grandine, vento, nuvola, temporale.\n- **Emozioni:** gioia, tristezza, rabbia, paura, sorpresa, disgusto.\n- **Politica:** governo, parlamento, elezioni, partito, riforma.\n\nL'organizzazione in campi semantici facilita l'apprendimento del lessico.",
    rules: [
      'Organizzare il lessico per aree tematiche.',
      'Riconoscere iponimi e iperonimi.',
      'Espandere il vocabolario per singolo campo.',
      'Utile per la scrittura tematica e traduzione.',
    ],
    examples: [
      {
        english:
          'Nel campo semantico del cibo: pasta, pizza, risotto, insalata, formaggio, vino.',
        translation:
          'In the semantic field of food: pasta, pizza, risotto, salad, cheese, wine.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Imparare liste di parole isolate.',
        correct: 'Imparare parole organizzate per campi semantici.',
        note: 'Il cervello memorizza meglio parole collegate tra loro.',
      },
    ],
    related: ['precisione-lessicale', 'derivazione', 'sfumature'],
  },
  {
    slug: 'derivazione',
    title: 'Derivazione delle parole',
    level: 'C1',
    category: 'Avanzato',
    summary: 'Prefissi e suffissi per creare nuove parole italiane.',
    explanation:
      'La derivazione crea parole nuove con prefissi e suffissi.\n\n**Prefissi:**\n- ri- (ripetizione): *rifare, rileggere.*\n- s- (negazione/contrario): *scomodo, sfortunato.*\n- dis- (negazione): *disordinato, disonesto.*\n- pre- (prima): *prevedere, preistoria.*\n\n**Suffissi:**\n- -zione (azione): *costruzione, traduzione.*\n- -tore/-trice (agente): *lavoratore, scrittrice.*\n- -bile (possibilita): *leggibile, mangiabile.*\n- -ezza/-ita (qualita): *bellezza, rapidita.*',
    rules: [
      'Prefissi modificano il significato della radice.',
      'Suffissi cambiano la categoria grammaticale.',
      'I suffissi alterativi (-ino, -one, -accio) esprimono sfumature.',
      'Attenzione ai falsi derivati.',
    ],
    examples: [
      {
        english: 'Rileggere il testo aiuta a trovare errori.',
        translation: 'Rereading the text helps find errors.',
        note: 'ri- = di nuovo',
      },
      {
        english: 'La situazione e migliorabile.',
        translation: 'The situation can be improved.',
        note: '-bile = che puo essere',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Usare suffissi in modo arbitrario.',
        correct: 'Conoscere i suffissi produttivi per ogni categoria.',
        note: 'Non tutti i verbi formano nomi con -zione.',
      },
    ],
    related: [
      'campi-semantici',
      'precisione-lessicale',
      'prestiti-linguistici',
    ],
  },
  {
    slug: 'precisione-lessicale',
    title: 'Precisione lessicale',
    level: 'C1',
    category: 'Avanzato',
    summary:
      'Scegliere la parola esatta: evitare genericità e approssimazioni.',
    explanation:
      'La precisione lessicale distingue un parlante C1.\n\nTecniche:\n- Sostituire parole generiche con termini specifici.\n- *Cosa → oggetto, elemento, fenomeno, questione.*\n- *Fare → realizzare, effettuare, compiere, eseguire.*\n- *Bello → splendido, incantevole, affascinante, suggestivo.*\n- Usare collocazioni appropriate (combinazioni tipiche di parole).',
    rules: [
      'Preferire il termine specifico a quello generico.',
      'Consultare dizionari dei sinonimi e collocazioni.',
      'Adeguare la scelta al registro e contesto.',
      'Evitare il verbo generico fare quando possibile.',
    ],
    examples: [
      {
        english:
          "Il governo ha adottato misure per contrastare l'inflazione. (non: ha fatto cose)",
        translation: 'The government adopted measures to fight inflation.',
      },
      {
        english:
          'Il tramonto dipingeva il cielo di sfumature purpuree. (non: era bello)',
        translation: 'The sunset painted the sky with purple hues.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Ho fatto una bella esperienza.',
        correct:
          "Ho vissuto un'esperienza entusiasmante/formativa/indimenticabile.",
        note: 'Bello e generico; scegliere aggettivo piu preciso.',
      },
    ],
    related: ['sfumature', 'campi-semantici', 'registro-formale'],
  },
  {
    slug: 'ironia-italiana',
    title: "Ironia e sarcasmo all'italiana",
    level: 'C1',
    category: 'Avanzato',
    summary:
      "Capire e usare l'ironia italiana: sfumature culturali e linguistiche.",
    explanation:
      "L'ironia italiana si basa spesso su:\n- **Antifrasi:** dire il contrario di cio che si pensa. *Che bella giornata!* (quando piove).\n- **Iperbole:** esagerazione. *Ci metto un secondo!* (in realta 10 minuti).\n- **Understatement:** minimizzare. *Non e niente, solo un graffietto.* (ferita grave).\n- **Tono:** fondamentale per distinguere ironia da affermazione seria.",
    rules: [
      "L'ironia si basa sul contrasto tra detto e inteso.",
      'Il tono di voce e cruciale per segnalare ironia.',
      'Nello scritto si usano punti esclamativi, virgolette.',
      "Attenzione: l'ironia puo non essere capita da non nativi.",
    ],
    examples: [
      {
        english:
          "Ma figurati, non vedevo l'ora di passare tre ore in coda alla posta!",
        translation:
          "Oh sure, I couldn't wait to spend three hours in line at the post office!",
        note: 'ironia antifrastica',
      },
      {
        english: 'Ah, sei riuscito ad arrivare in orario! Miracolo!',
        translation: 'Oh, you managed to arrive on time! A miracle!',
        note: 'ironia bonaria',
      },
    ],
    common_mistakes: [
      {
        wrong: "Prendere l'ironia alla lettera.",
        correct: "Riconoscere l'ironia dal contesto e dal tono.",
        note: "L'ironia italiana puo essere sottile e confondere.",
      },
    ],
    related: ['umorismo', 'doppio-senso', 'modi-di-dire'],
  },
  {
    slug: 'umorismo',
    title: 'Umorismo italiano',
    level: 'C1',
    category: 'Avanzato',
    summary: "L'umorismo nella cultura italiana: tipologie e caratteristiche.",
    explanation:
      "L'umorismo italiano e variegato:\n- **Giochi di parole:** basati su doppi sensi (*La volpe e l'uva*).\n- **Barzellette:** brevi storie a sorpresa.\n- **Autoironia:** prendere in giro se stessi o la propria citta/regione.\n- **Satira:** critica sociale e politica mascherata da umorismo.\n- **Commedia dell'arte:** maschere e stereotipi regionali.",
    rules: [
      "L'umorismo varia per regione e generazione.",
      'I giochi di parole sono molto apprezzati.',
      "L'autoironia e segno di intelligenza e umilta.",
      'La satira politica e molto diffusa (giornali, TV).',
    ],
    examples: [
      {
        english:
          'Non capisco perche tutti dicano che gli italiani gesticolano... (mentre gesticola vistosamente)',
        translation:
          "I don't understand why everyone says Italians gesture... (while gesturing emphatically)",
        note: 'autoironia',
      },
      {
        english:
          'Il milanese e il napoletano si incontrano... (tipica barzelletta regionale)',
        translation:
          'A Milanese and a Neapolitan meet... (typical regional joke)',
      },
    ],
    common_mistakes: [
      {
        wrong: "Non capire l'umorismo regionale.",
        correct:
          'Conoscere gli stereotipi regionali per capire le barzellette.',
        note: 'Molto umorismo italiano si basa su rivalita regionali.',
      },
    ],
    related: ['ironia-italiana', 'doppio-senso', 'italiano-regionale'],
  },
  {
    slug: 'doppio-senso',
    title: 'Doppi sensi e giochi di parole',
    level: 'C1',
    category: 'Avanzato',
    summary:
      "Parole e frasi a doppio senso: capire l'ambiguita linguistica italiana.",
    explanation:
      "Il doppio senso si basa su parole con piu significati:\n- **Omonimia:** stessa forma, significato diverso. *Il riso* (cereale o azione di ridere).\n- **Polisemia:** stesso termine con accezioni diverse. *La chiave* (strumento o concetto).\n- **Ambiguita sintattica:** *Ho visto un uomo con il binocolo.* (chi aveva il binocolo?)\n\nMolto usato nella pubblicita, nei titoli e nell'umorismo.",
    rules: [
      'Riconoscere parole polisemiche e omonimi.',
      "L'ambiguita puo essere voluta (umorismo) o involontaria.",
      'Il contesto di solito chiarisce il significato.',
      'Attenzione ai double entendre involontari in traduzione.',
    ],
    examples: [
      {
        english:
          'Il riso abbonda sulla bocca degli sciocchi. (riso = ridere, ma anche cereale)',
        translation: 'Laughter/rice abounds in the mouths of fools.',
        note: 'doppio senso voluto',
      },
      {
        english:
          'Ho lasciato la chiave sotto lo zerbino. (chiave fisica o soluzione?)',
        translation: 'I left the key under the doormat.',
        note: 'polisemia',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Non cogliere il doppio senso in un titolo o barzelletta.',
        correct:
          'Considerare tutti i significati possibili di una parola nel contesto.',
        note: 'I doppi sensi sono onnipresenti nella comunicazione italiana.',
      },
    ],
    related: ['ironia-italiana', 'umorismo', 'figure-retoriche'],
  },
  {
    slug: 'figure-retoriche',
    title: 'Figure retoriche',
    level: 'C1',
    category: 'Avanzato',
    summary:
      'Metafora, metonimia, sineddoche, iperbole e altre figure retoriche.',
    explanation:
      "Principali figure retoriche italiane:\n- **Metafora:** sostituzione per analogia. *Quell'uomo e un leone.*\n- **Metonimia:** sostituzione per contiguita. *Bere un bicchiere.* (il contenuto per il contenitore).\n- **Sineddoche:** parte per il tutto. *Tetto* per casa.\n- **Iperbole:** esagerazione. *Te l'ho detto un milione di volte.*\n- **Litote:** negazione del contrario. *Non e male* = e buono.\n- **Eufemismo:** attenuazione. *E passato a miglior vita.*",
    rules: [
      'Metafora: confronto implicito senza come.',
      'Metonimia: relazione di contiguita logica.',
      'Iperbole: esagerazione a effetto.',
      'Litote ed eufemismo attenuano o ammorbidiscono.',
    ],
    examples: [
      {
        english: "Ha un cuore d'oro.",
        translation: 'He has a heart of gold.',
        note: 'metafora',
      },
      {
        english: 'Non e affatto stupido. (litote per: e molto intelligente)',
        translation: "He's not stupid at all.",
        note: 'litote',
      },
      {
        english: 'Ci vediamo tra due secondi! (iperbole)',
        translation: 'See you in two seconds!',
        note: 'iperbole',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Confondere metonimia e metafora.',
        correct: 'Metafora = somiglianza; metonimia = contiguita.',
        note: 'Bere un bicchiere = metonimia (contenuto x contenitore).',
      },
    ],
    related: ['figure-stilistiche', 'doppio-senso', 'descrizione-letteraria'],
  },
  {
    slug: 'persuasione',
    title: 'Tecniche di persuasione',
    level: 'C1',
    category: 'Avanzato',
    summary:
      'Strategie linguistiche per persuadere: retorica classica e moderna.',
    explanation:
      "Tecniche persuasive in italiano:\n- **Ethos:** credibilita dell'oratore. *Da esperto del settore, posso affermare che...*\n- **Pathos:** appello alle emozioni. *Pensate ai vostri figli, al loro futuro.*\n- **Logos:** argomentazione logica. *I dati dimostrano che...*\n- **Domanda retorica:** *Vogliamo davvero continuare cosi?*\n- **Ripetizione (anafora):** *Noi crediamo... Noi vogliamo... Noi possiamo...*",
    rules: [
      'Ethos: stabilire la propria autorita e credibilita.',
      "Pathos: coinvolgere emotivamente l'uditorio.",
      'Logos: usare dati, statistiche, ragionamenti logici.',
      'Domanda retorica e anafora rafforzano il messaggio.',
    ],
    examples: [
      {
        english:
          "Avete mai pensato a cosa significhi per i nostri figli crescere in un mondo senza rispetto per l'ambiente?",
        translation:
          'Have you ever thought about what it means for our children to grow up in a world without respect for the environment?',
        note: 'pathos + domanda retorica',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Usare solo pathos senza dati.',
        correct: 'Bilanciare ethos, pathos e logos.',
        note: 'Un discorso persuasivo efficace combina tutte e tre le componenti.',
      },
    ],
    related: [
      'struttura-argomentativa',
      'controargomentazione',
      'tecniche-oratorie',
    ],
  },
  {
    slug: 'tecniche-oratorie',
    title: 'Tecniche oratorie',
    level: 'C1',
    category: 'Avanzato',
    summary:
      "L'arte del discorso pubblico in italiano: struttura, ritmo e figure.",
    explanation:
      "Tecniche per un discorso efficace:\n- **Exordium:** catturare l'attenzione. Aneddoto, citazione, domanda.\n- **Narratio/Argumentatio:** esporre fatti e argomenti.\n- **Peroratio:** conclusione appassionata.\n- **Pause strategiche:** dare peso alle parole.\n- **Variazione di ritmo:** accelerare per entusiasmo, rallentare per solennita.\n- **Tricolon:** tre elementi in parallelo (*Veni, vidi, vici*).",
    rules: [
      "Apertura forte per catturare l'attenzione.",
      'Struttura chiara in tre parti.',
      'Pause e ritmo per enfatizzare.',
      'Conclusione memorabile.',
    ],
    examples: [
      {
        english:
          'Amici, romani, connazionali... prestatemi orecchio. (Shakespeare in italiano)',
        translation: 'Friends, Romans, countrymen... lend me your ears.',
        note: 'tricolon + invocazione',
      },
      {
        english:
          'Una domanda semplice: siete soddisfatti di come vanno le cose? (pausa) Io no. E credo nemmeno voi.',
        translation:
          "One simple question: are you satisfied with how things are going? (pause) I'm not. And I think you aren't either.",
        note: 'domanda retorica + pausa',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Leggere un discorso senza pause ne enfasi.',
        correct: 'Provare il discorso ad alta voce, segnare le pause.',
        note: "L'oratoria e performance, non solo testo.",
      },
    ],
    related: ['persuasione', 'struttura-argomentativa', 'registro-formale'],
  },
  {
    slug: 'italiano-regionale',
    title: 'Italiano regionale',
    level: 'C1',
    category: 'Avanzato',
    summary:
      "Le varieta regionali dell'italiano: differenze lessicali e grammaticali.",
    explanation:
      "L'italiano regionale varia in:\n- **Lessico:** *anguria* (Nord) vs *cocomero* (Centro) vs *melone d'acqua* (Sud).\n- **Fonetica:** apertura vocali, pronuncia di s e z.\n- **Sintassi:** uso di passato prossimo (Nord) vs passato remoto (Sud).\n- **Geosinonimi:** *papà* vs *babbo*, *ora* vs *adesso*.\n\nLe differenze sono accettate e contribuiscono alla ricchezza dell'italiano.",
    rules: [
      "L'italiano standard e influenzato dalla regione di provenienza.",
      'Geosinonimi: termini diversi per lo stesso oggetto.',
      'Alcune costruzioni regionali sono considerate errori in contesti formali.',
      "La scuola insegna l'italiano standard, ma le varieta regionali persistono.",
    ],
    examples: [
      {
        english:
          'A Milano prendo un caffe, a Napoli prendo un caffe. (pronuncia e preparazione diversa)',
        translation: 'In Milan I have a coffee, in Naples I have a coffee.',
        note: 'differenza culturale + linguistica',
      },
      {
        english: "Al Nord: 'Ho visto Marco ieri.' Al Sud: 'Vidi Marco ieri.'",
        translation:
          "North: 'I saw Marco yesterday.' South: 'I saw Marco yesterday.'",
        note: 'passato prossimo vs remoto',
      },
    ],
    common_mistakes: [
      {
        wrong: "Pensare che l'italiano sia uniforme in tutta Italia.",
        correct: 'Riconoscere e apprezzare le varieta regionali.',
        note: "L'Italia ha una straordinaria diversita linguistica interna.",
      },
    ],
    related: ['dialetti', 'italiano-standard', 'modi-di-dire'],
  },
  {
    slug: 'dialetti',
    title: 'Dialetti italiani',
    level: 'C1',
    category: 'Avanzato',
    summary:
      "Conoscere i principali dialetti italiani e il loro rapporto con l'italiano standard.",
    explanation:
      "I dialetti italiani non sono varianti dell'italiano ma lingue sorelle derivate dal latino.\n\nGruppi principali:\n- **Gallo-italici:** piemontese, lombardo, ligure, emiliano-romagnolo.\n- **Veneti:** veneziano, veronese.\n- **Toscani:** fiorentino (base dell'italiano standard).\n- **Mediani:** romanesco, umbro, marchigiano.\n- **Meridionali:** napoletano, pugliese, calabrese, siciliano.\n- **Sardo:** considerato lingua a se.\n\nMolti italiani sono bilingui (italiano + dialetto).",
    rules: [
      'I dialetti sono lingue autonome, non varianti degradate.',
      "L'italiano standard deriva dal fiorentino del Trecento.",
      "In contesti formali si usa l'italiano; in famiglia spesso il dialetto.",
      'Il dialetto e patrimonio culturale protetto.',
    ],
    examples: [
      {
        english: "In veneto: 'Come xeo che la va?' (Come va?)",
        translation: "In Veneto: 'How's it going?'",
      },
      {
        english: "A Napoli: 'Sto buono, guaglio!' (Stai bene, ragazzo!)",
        translation: "In Naples: 'I'm good, boy!'",
      },
    ],
    common_mistakes: [
      {
        wrong: 'Confondere dialetto con italiano sgrammaticato.',
        correct:
          'Il dialetto ha regole grammaticali proprie e una storia antica.',
        note: 'I dialetti italiani sono lingue romanze con pari dignita.',
      },
    ],
    related: [
      'italiano-regionale',
      'italiano-standard',
      'evoluzione-linguistica',
    ],
  },
  {
    slug: 'italiano-standard',
    title: 'Italiano standard e neostandard',
    level: 'C1',
    category: 'Avanzato',
    summary:
      "L'evoluzione dell'italiano standard verso un neostandard piu flessibile.",
    explanation:
      "L'italiano standard tradizionale e quello normativo (grammatiche, Accademia della Crusca).\n\nL'italiano **neostandard** (o dell'uso medio) accetta:\n- **gli** per a loro (invece di loro).\n- **lui/lei** soggetto (invece di egli/ella).\n- **che** polivalente (temporale, causale).\n- **ci** con avere: *c'ho fame* (colloquiale).\n- **dislocazioni:** *Il caffe, lo prendo dopo.*\n\nQueste forme, un tempo considerate errori, sono ora accettate nell'uso comune.",
    rules: [
      "L'italiano standard e quello delle grammatiche.",
      'Il neostandard accoglie fenomeni del parlato.',
      'Alcune forme neostandard sono ancora evitate nello scritto formale.',
      'La lingua evolve: oggi e normale cio che ieri era errore.',
    ],
    examples: [
      {
        english:
          'Standard: Ho telefonato loro. / Neostandard: Gli ho telefonato.',
        translation: 'Standard: I called them. / Neo-standard: I called them.',
      },
      {
        english:
          "Standard: Il libro che ho comprato. / Neostandard: Il libro che l'ho comprato.",
        translation:
          'Standard: The book I bought. / Neo-standard: The book that I bought it.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Considerare sempre errore le forme neostandard.',
        correct:
          'Distinguere tra registri: accettabile nel parlato, evitare nello scritto formale.',
        note: 'Il confine tra errore e innovazione linguistica e fluido.',
      },
    ],
    related: [
      'italiano-regionale',
      'registro-formale',
      'evoluzione-linguistica',
    ],
  },
  {
    slug: 'sintesi-testuale',
    title: 'Sintesi testuale',
    level: 'C1',
    category: 'Avanzato',
    summary:
      'Tecniche per riassumere e sintetizzare testi complessi in italiano.',
    explanation:
      'Per una buona sintesi:\n1. **Lettura analitica:** individuare tesi, argomenti, conclusione.\n2. **Gerarchizzare:** distinguere essenziale da accessorio.\n3. **Parafrasare:** riformulare con parole proprie.\n4. **Eliminare:** esempi ridondanti, digressioni, ripetizioni.\n5. **Unificare:** fondere concetti simili.\n6. **Mantenere il registro e lo stile originale.**',
    rules: [
      'Identificare la struttura del testo originale.',
      'Isolare le idee principali.',
      'Riformulare senza tradire il significato.',
      'Mantenere coesione e coerenza.',
    ],
    examples: [
      {
        english:
          'Riassunto di 300 parole: il testo originale analizza le cause del declino economico italiano identificando tre fattori: demografia, produttivita e debito pubblico.',
        translation:
          "300-word summary: the original text analyzes the causes of Italy's economic decline identifying three factors: demographics, productivity, and public debt.",
      },
    ],
    common_mistakes: [
      {
        wrong: "Copiare frasi intere dall'originale.",
        correct: 'Riformulare con parole proprie, condensando.',
        note: 'La sintesi non e un collage di citazioni.',
      },
    ],
    related: ['coesione-testuale', 'riformulazione', 'critica-costruttiva'],
  },
  {
    slug: 'critica-costruttiva',
    title: 'Critica costruttiva',
    level: 'C1',
    category: 'Avanzato',
    summary:
      'Esprimere critiche in modo costruttivo e diplomatico in italiano.',
    explanation:
      'Per esprimere critiche costruttive:\n- **Ammorbidire:** *Forse si potrebbe...*\n- **Condizionale:** *Sarebbe meglio se...*\n- **Domanda invece di affermazione:** *Hai considerato la possibilita di...?*\n- **Sandwich feedback:** positivo - critica - positivo.\n- **Evitare assoluti:** mai dire *sempre* o *mai*.',
    rules: [
      'Usare il condizionale per attenuare.',
      'Evitare toni accusatori.',
      'Concentrarsi sul problema, non sulla persona.',
      'Proporre alternative, non solo criticare.',
    ],
    examples: [
      {
        english:
          'Il tuo lavoro e molto interessante. Forse si potrebbe approfondire la parte sui dati. Nel complesso, ottimo lavoro!',
        translation:
          'Your work is very interesting. Perhaps the data section could be explored further. Overall, great job!',
        note: 'sandwich feedback',
      },
      {
        english:
          'Hai considerato di strutturare diversamente questa sezione? Renderebbe il tutto piu chiaro.',
        translation:
          'Have you considered structuring this section differently? It would make it clearer.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Questo lavoro e sbagliato. Devi rifarlo.',
        correct:
          'Questo lavoro ha alcuni punti da rivedere. Vediamoli insieme per migliorarlo.',
        note: 'La critica costruttiva offre soluzioni, non solo giudizi.',
      },
    ],
    related: ['riformulazione', 'condizionale-cortesia', 'registro-formale'],
  },
  {
    slug: 'riformulazione',
    title: 'Riformulazione e parafrasi',
    level: 'C1',
    category: 'Avanzato',
    summary: 'Tecniche per riformulare concetti in modo chiaro e preciso.',
    explanation:
      "Riformulare significa esprimere lo stesso concetto con parole diverse.\n\nTecniche:\n- **Sinonimi:** *l'edificio → la costruzione, lo stabile.*\n- **Cambio di categoria:** *Analizzare → fare un'analisi.*\n- **Da attivo a passivo:** *Il governo ha approvato → E stata approvata dal governo.*\n- **Da specifico a generale:** *Il gatto → l'animale domestico.*\n- **Definizione:** *Un cardiologo → un medico specializzato nel cuore.*",
    rules: [
      'Mantenere il significato originale.',
      'Variare lessico e struttura sintattica.',
      'Adeguare il registro al nuovo contesto.',
      'Utile per evitare ripetizioni nella scrittura.',
    ],
    examples: [
      {
        english:
          'Originale: La crisi economica ha colpito duramente le famiglie. Riformulato: I nuclei familiari hanno subito pesantemente gli effetti della recessione.',
        translation:
          'Original: The economic crisis hit families hard. Reformulated: Households suffered heavily from the effects of the recession.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Cambiare il significato durante la riformulazione.',
        correct: 'Verificare che il messaggio originale sia preservato.',
        note: 'La riformulazione non deve alterare il contenuto.',
      },
    ],
    related: ['sintesi-testuale', 'precisione-lessicale', 'sfumature'],
  },
  {
    slug: 'ripasso-congiuntivo',
    title: 'Ripasso avanzato del congiuntivo',
    level: 'C2',
    category: 'Congiuntivo',
    summary: 'Dominio completo del congiuntivo in tutti i contesti e registri.',
    explanation:
      'A livello C2 il congiuntivo deve essere usato con sicurezza in ogni contesto:\n- Concordanze complesse.\n- Congiuntivo indipendente (augurativo, esortativo, dubitativo).\n- Sfumature tra indicativo e congiuntivo dove entrambi sono possibili.\n- Uso letterario e arcaico del congiuntivo.\n\n*Che la festa abbia inizio!* (esortativo)\n*Non so se sia il caso.* (dubitativo)',
    rules: [
      'Congiuntivo in frasi indipendenti: Che tu sia maledetto!',
      'Scelta tra indicativo/congiuntivo con verbi come immaginare, sospettare.',
      'Congiuntivo nelle comparative ipotetiche: Come se fosse...',
      'Uso del congiuntivo nella prosa letteraria contemporanea.',
    ],
    examples: [
      {
        english: 'Che la forza sia con te!',
        translation: 'May the force be with you!',
        note: 'ottativo/desiderativo',
      },
      {
        english: 'Non sapevo che avesse gia pubblicato tre romanzi.',
        translation: "I didn't know he had already published three novels.",
      },
      {
        english: 'Comportati come se niente fosse successo.',
        translation: 'Act as if nothing had happened.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Evitare sempre il congiuntivo nel parlato.',
        correct:
          'Usare il congiuntivo con naturalezza, anche nel parlato informale dove appropriato.',
        note: 'Il vero C2 usa il congiuntivo senza sforzo, non lo evita.',
      },
    ],
    related: [
      'congiuntivo-presente',
      'congiuntivo-imperfetto',
      'congiuntivo-trapassato',
      'concordanza-congiuntivo',
    ],
  },
  {
    slug: 'ripasso-condizionale',
    title: 'Ripasso avanzato del condizionale',
    level: 'C2',
    category: 'Condizionali',
    summary:
      'Uso avanzato del condizionale: dissociazione, futuro nel passato, cortesia.',
    explanation:
      'Usi avanzati del condizionale:\n- **Dissociazione giornalistica:** *Il premier si dimetterebbe.*\n- **Futuro nel passato:** *Disse che sarebbe venuto.*\n- **Cortesia estrema:** *Le sarei immensamente grato se volesse...*\n- **Condizionale di modestia:** *Direi che...*\n- **Ipotesi non realizzata:** *Avrei voluto dirtelo prima.*',
    rules: [
      'Condizionale composto per azioni non realizzate nel passato.',
      'Condizionale di dissociazione solo in contesti formali/giornalistici.',
      'Futuro nel passato sempre con condizionale passato.',
      'Sfumature tra condizionale e congiuntivo nelle ipotetiche.',
    ],
    examples: [
      {
        english:
          'Secondo indiscrezioni, il ministro rassegnerebbe le dimissioni.',
        translation: 'According to rumors, the minister would resign.',
        note: 'dissociazione',
      },
      {
        english: 'Avrei tanto voluto conoscerti prima.',
        translation: 'I would have really liked to meet you earlier.',
        note: 'desiderio irrealizzato',
      },
      {
        english: 'Promisero che avrebbero fatto tutto il possibile.',
        translation: 'They promised they would do everything possible.',
        note: 'futuro nel passato',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Ha detto che verra.',
        correct: 'Ha detto che sarebbe venuto.',
        note: 'Futuro nel passato = condizionale passato.',
      },
      {
        wrong: 'Sarei dovuto andare. (senza concordare)',
        correct: 'Sarei dovuto/a andare.',
        note: 'Concordanza del participio con il soggetto.',
      },
    ],
    related: [
      'condizionale-presente',
      'condizionale-cortesia',
      'discorso-riportato',
    ],
  },
  {
    slug: 'concordanza-di-genere',
    title: 'Concordanza avanzata di genere e numero',
    level: 'C2',
    category: 'Avanzato',
    summary: 'Padroneggiare casi complessi di concordanza in italiano.',
    explanation:
      'Casi complessi di concordanza:\n- **Plurali doppi:** *il braccio → i bracci / le braccia* (significato diverso).\n- **Accordo a senso:** *La maggior parte degli studenti sono arrivati.*\n- **Plurali di nomi composti:** *il capostazione → i capistazione.*\n- **Participio con verbi servili:** *Non ho potuto andarci / Non sono potuto andarci.*\n- **Accordo del participio con ne:** *Ne ho comprate tre.*',
    rules: [
      'Plurali doppi: il muro (i muri / le mura).',
      'Accordo a senso: la maggior parte + plurale.',
      'Plurale dei nomi composti: capo- + -stazione → capistazione.',
      'Con verbi servili + essere: sono dovuto/a andare.',
    ],
    examples: [
      {
        english: 'Le mura della citta sono antiche. (mura = mura difensive)',
        translation: 'The city walls are ancient.',
        note: 'mura vs muri',
      },
      {
        english:
          'La maggior parte degli invitati erano contenti. (accordo a senso)',
        translation: 'Most of the guests were happy.',
        note: 'accordo a senso',
      },
      {
        english: 'Non sono potuta venire ieri. (femminile)',
        translation: "I couldn't come yesterday.",
        note: 'accordo con essere',
      },
    ],
    common_mistakes: [
      {
        wrong: 'I muri della citta.',
        correct: 'Le mura della citta.',
        note: 'Mura = mura difensive/di cinta; muri = pareti.',
      },
      {
        wrong: 'Non ho potuta andare.',
        correct: 'Non sono potuta andare.',
        note: "Con verbi che richiedono essere all'infinito, il servile prende essere.",
      },
    ],
    related: ['genere-nomi', 'passato-prossimo-essere', 'concordanza-tempi'],
  },
  {
    slug: 'stile-letterario',
    title: 'Stile letterario',
    level: 'C2',
    category: 'Avanzato',
    summary:
      'Analizzare e riprodurre lo stile letterario italiano classico e moderno.',
    explanation:
      'Lo stile letterario italiano si caratterizza per:\n- **Ipotassi:** frasi lunghe con molte subordinate.\n- **Lessico ricercato:** arcaismi, latinismi, termini rari.\n- **Figure retoriche:** metafore, similitudini, anafore.\n- **Ritmo e musicalita:** attenzione alla sonorita delle parole.\n\nAutori di riferimento: Dante, Boccaccio, Manzoni, Calvino, Eco.',
    rules: [
      'Ipotassi: uso esteso di subordinate implicite ed esplicite.',
      'Lessico elevato e preciso.',
      'Attenzione al ritmo e alla cadenza della frase.',
      'Variatio: variare strutture per evitare monotonia.',
    ],
    examples: [
      {
        english:
          "Ed ecco, quasi al cominciar de l'erta, una lonza leggera e presta molto, che di pel macolato era coverta. (Dante)",
        translation:
          'And behold, almost at the start of the slope, a leopard light and very swift, covered with spotted fur.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Scrivere in modo artificiosamente complesso.',
        correct:
          'La complessita deve essere al servizio del significato, non fine a se stessa.',
        note: 'Lo stile elevato non e accumulo di parole difficili.',
      },
    ],
    related: ['voce-narrativa', 'figure-stilistiche', 'tempi-narrativi'],
  },
  {
    slug: 'voce-narrativa',
    title: 'Voce narrativa',
    level: 'C2',
    category: 'Avanzato',
    summary: 'Sviluppare una voce narrativa personale in italiano.',
    explanation:
      'La voce narrativa e la personalita che emerge dal testo.\n\nElementi:\n- **Punto di vista:** prima persona (io narrante), terza persona (onnisciente o limitato).\n- **Tono:** ironico, serio, malinconico, distaccato.\n- **Distanza:** vicinanza emotiva o distacco critico.\n- **Registro:** formale, colloquiale, lirico.\n\nSviluppare una voce propria richiede lettura, pratica e consapevolezza stilistica.',
    rules: [
      'Scegliere un punto di vista coerente.',
      'Mantenere tono e registro uniformi.',
      "La voce narrativa riflette la personalita dell'autore.",
      'Leggere molto per sviluppare orecchio stilistico.',
    ],
    examples: [
      {
        english:
          "Non so perche quel giorno decisi di prendere il treno invece dell'autobus. Forse fu il cielo grigio, forse la voglia di cambiare qualcosa, qualsiasi cosa.",
        translation:
          "I don't know why that day I decided to take the train instead of the bus. Maybe it was the gray sky, maybe the desire to change something, anything.",
        note: 'prima persona, tono riflessivo',
      },
    ],
    common_mistakes: [
      {
        wrong: "Cambiare punto di vista all'interno dello stesso testo.",
        correct: 'Mantenere coerenza nel punto di vista scelto.',
        note: 'Salti di punto di vista confondono il lettore.',
      },
    ],
    related: ['stile-letterario', 'descrizione-letteraria', 'tempi-narrativi'],
  },
  {
    slug: 'figure-stilistiche',
    title: 'Figure stilistiche avanzate',
    level: 'C2',
    category: 'Avanzato',
    summary:
      'Anafora, epifora, chiasmo, climax, anticlimax e altre figure di stile.',
    explanation:
      "Figure stilistiche per la scrittura avanzata:\n- **Anafora:** ripetere all'inizio. *Senza di te... Senza di te...*\n- **Epifora:** ripetere alla fine.\n- **Chiasmo:** incrocio. *Mangio per vivere, non vivo per mangiare.*\n- **Climax:** crescendo. *Spero, credo, so.*\n- **Anticlimax:** decrescendo.\n- **Asindeto:** senza congiunzioni. *Veni, vidi, vici.*\n- **Polisindeto:** con molte congiunzioni. *E mangio e bevve e dormi.*",
    rules: [
      'Anafora enfatizza un concetto ripetendolo.',
      'Chiasmo crea simmetria e contrasto.',
      'Climax/anticlimax creano tensione.',
      'Usare con moderazione per non appesantire.',
    ],
    examples: [
      {
        english:
          'Non chiedermi di restare. Non chiedermi di capire. Non chiedermi niente.',
        translation:
          "Don't ask me to stay. Don't ask me to understand. Don't ask me anything.",
        note: 'anafora',
      },
      {
        english: 'Veni, vidi, vici. (asindeto)',
        translation: 'I came, I saw, I conquered.',
        note: 'asindeto',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Abusare delle figure retoriche.',
        correct: 'Usare le figure con parsimonia per creare effetto.',
        note: 'Troppe figure retoriche rendono il testo artificioso.',
      },
    ],
    related: ['figure-retoriche', 'stile-letterario', 'voce-narrativa'],
  },
  {
    slug: 'equivalenza',
    title: 'Equivalenza traduttiva',
    level: 'C2',
    category: 'Avanzato',
    summary:
      "Strategie per tradurre mantenendo significato, tono e stile dell'originale.",
    explanation:
      'Principi di equivalenza traduttiva:\n- **Equivalenza semantica:** mantenere il significato esatto.\n- **Equivalenza pragmatica:** stesso effetto sul destinatario.\n- **Equivalenza stilistica:** stesso registro e tono.\n\nStrategie:\n- **Traduzione letterale:** quando possibile.\n- **Adattamento:** quando il concetto non esiste.\n- **Compensazione:** perdere una sfumatura qui, recuperarla li.',
    rules: [
      "Fedelta al significato dell'originale.",
      'Naturalezza nella lingua di arrivo.',
      'Adattare riferimenti culturali quando necessario.',
      'La traduzione perfetta spesso non esiste: scegliere la soluzione migliore.',
    ],
    examples: [
      {
        english:
          "EN: It's raining cats and dogs. IT: Piove a catinelle. (non: Piovono cani e gatti)",
        translation:
          "EN: It's raining cats and dogs. IT: Piove a catinelle. (not literal)",
      },
    ],
    common_mistakes: [
      {
        wrong: 'Tradurre letteralmente espressioni idiomatiche.',
        correct: "Cercare l'equivalente idiomatico nella lingua d'arrivo.",
        note: 'Le espressioni idiomatiche raramente si traducono parola per parola.',
      },
    ],
    related: ['sfumature-traduzione', 'falsi-amici', 'precisione-lessicale'],
  },
  {
    slug: 'sfumature-traduzione',
    title: 'Sfumature nella traduzione',
    level: 'C2',
    category: 'Avanzato',
    summary:
      'Cogliere e rendere le sfumature di significato nel passaggio tra lingue.',
    explanation:
      'Sfumature critiche nella traduzione IT-EN:\n- **Tu vs Lei vs Voi:** in inglese sempre you.\n- **Passato prossimo vs remoto:** entrambi simple past/present perfect.\n- **Congiuntivo:** spesso perso in inglese.\n- **Diminutivi/accrescitivi:** -ino, -one non hanno equivalenti fissi.\n- **Regionali e dialettali:** difficili da rendere.',
    rules: [
      'Il congiuntivo italiano spesso non ha equivalente inglese.',
      'Diminutivi e accrescitivi richiedono perifrasi.',
      'Lei di cortesia: in inglese si perde la distinzione formale/informale.',
      'Il passato remoto letterario puo essere reso con il simple past.',
    ],
    examples: [
      {
        english:
          "IT: Ti presento la mia sorellina. EN: I'd like you to meet my little sister.",
        translation:
          "IT: Ti presento la mia sorellina. EN: I'd like you to meet my little sister.",
        note: '-ina → little',
      },
      {
        english:
          "IT: Penso che sia vero. EN: I think it's true. (congiuntivo perso)",
        translation: "IT: Penso che sia vero. EN: I think it's true.",
        note: 'congiuntivo -> indicativo',
      },
    ],
    common_mistakes: [
      {
        wrong:
          'Tradurre ogni parola senza considerare la perdita di sfumature.',
        correct: 'Compensare le perdite con altre strategie traduttive.',
        note: 'La traduzione e sempre un compromesso.',
      },
    ],
    related: ['equivalenza', 'falsi-amici', 'congiuntivo-presente'],
  },
  {
    slug: 'falsi-amici',
    title: 'Falsi amici italiano-inglese',
    level: 'C2',
    category: 'Avanzato',
    summary: 'Parole simili ma con significato diverso tra italiano e inglese.',
    explanation:
      'Falsi amici comuni:\n- **Actually** ≠ attualmente (attualmente = currently).\n- **Sensible** ≠ sensibile (sensibile = sensitive; sensato = sensible).\n- **Library** ≠ libreria (libreria = bookstore; biblioteca = library).\n- **Parents** ≠ parenti (parenti = relatives; genitori = parents).\n- **Education** ≠ educazione (educazione = manners; istruzione = education).\n- **Firm** ≠ firma (firma = signature; azienda = firm).',
    rules: [
      'Verificare sempre il significato di parole simili.',
      'Attenzione ai falsi amici in contesti professionali.',
      'Molti falsi amici derivano da evoluzioni divergenti dal latino.',
      'Lista sempre aggiornata di falsi amici da consultare.',
    ],
    examples: [
      {
        english:
          "Actually, I disagree. ≠ Attualmente, non sono d'accordo. (SBAGLIATO: significa In realta, non sono d'accordo.)",
        translation: 'Actually, I disagree. (NOT: Currently, I disagree.)',
        note: 'actually ≠ attualmente',
      },
      {
        english:
          'She is very sensible. ≠ Lei e molto sensibile. (SBAGLIATO: significa Lei e molto ragionevole.)',
        translation: 'She is very sensible. (NOT: She is very sensitive.)',
        note: 'sensible ≠ sensibile',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Tradurre attualmente con actually.',
        correct: 'Attualmente = currently; actually = in realta.',
        note: 'Uno dei falsi amici piu comuni e pericolosi.',
      },
    ],
    related: ['sfumature-traduzione', 'equivalenza', 'precisione-lessicale'],
  },
  {
    slug: 'evoluzione-linguistica',
    title: 'Evoluzione della lingua italiana',
    level: 'C2',
    category: 'Avanzato',
    summary: "Come l'italiano e cambiato dal latino a oggi.",
    explanation:
      "Tappe dell'evoluzione:\n- **Latino volgare (I-IX sec):** dal latino classico alle lingue romanze.\n- **Primi documenti (IX-X sec):** Placito Capuano (960) primo documento in volgare.\n- **Dante e il Trecento:** il fiorentino diventa modello letterario.\n- **Questione della lingua (XVI sec):** Bembo codifica il modello petrarchesco-boccacciano.\n- **Manzoni e i Promessi Sposi:** avvicina la lingua scritta al parlato fiorentino.\n- **Italiano moderno:** TV, media, diffusione dell'italiano standard.",
    rules: [
      "L'italiano deriva dal latino volgare, non da quello classico.",
      "Il fiorentino del Trecento e la base dell'italiano standard.",
      'La lingua letteraria ha influenzato fortemente la lingua parlata.',
      "L'italiano e in continua evoluzione (neostandard, anglicismi).",
    ],
    examples: [
      {
        english:
          'Latino: Illa mulier pulchra est. Italiano: Quella donna e bella.',
        translation:
          'Latin: That woman is beautiful. Italian: That woman is beautiful.',
        note: "evoluzione dal latino all'italiano",
      },
      {
        english:
          'Dai Promessi Sposi: Quel ramo del lago di Como... (incipit celebre)',
        translation: 'From The Betrothed: That branch of Lake Como...',
        note: "L'italiano manzoniano",
      },
    ],
    common_mistakes: [
      {
        wrong: "Pensare che l'italiano sia sempre stato uguale.",
        correct: "Conoscere le tappe principali dell'evoluzione linguistica.",
        note: 'La lingua e un organismo vivo in costante cambiamento.',
      },
    ],
    related: ['latinismi', 'prestiti-linguistici', 'italiano-standard'],
  },
  {
    slug: 'latinismi',
    title: 'Latinismi nella lingua italiana',
    level: 'C2',
    category: 'Avanzato',
    summary: "Parole ed espressioni latine ancora vive nell'italiano colto.",
    explanation:
      "Latinismi comuni:\n- **Ex aequo:** a pari merito.\n- **Sui generis:** del suo genere, unico.\n- **Curriculum vitae:** percorso di vita (CV).\n- **Ad hoc:** per questo scopo.\n- **In extremis:** all'ultimo momento.\n- **Una tantum:** una volta soltanto.\n- **Pro capite:** a persona.\n- **Conditio sine qua non:** condizione indispensabile.\n- **De facto:** di fatto.\n- **Iter:** procedura, percorso.",
    rules: [
      'I latinismi sono usati nel linguaggio colto e formale.',
      'Molti latinismi sono nel linguaggio giuridico e burocratico.',
      "Attenzione alla pronuncia: in italiano si pronunciano all'italiana.",
      'Alcuni latinismi suonano antiquati o pretenziosi se abusati.',
    ],
    examples: [
      {
        english: 'Il candidato e stato assunto dopo un lungo iter burocratico.',
        translation:
          'The candidate was hired after a long bureaucratic process.',
        note: 'iter = procedura',
      },
      {
        english:
          "La riunione e stata aggiornata ad hoc per discutere l'emergenza.",
        translation: 'The meeting was called ad hoc to discuss the emergency.',
        note: 'ad hoc = appositamente',
      },
    ],
    common_mistakes: [
      {
        wrong:
          'Pronunciare i latinismi alla latina (specie in contesti italiani).',
        correct:
          'In italiano i latinismi si pronunciano secondo la fonetica italiana.',
        note: "Curriculum vitae si pronuncia curricolum vite (all'italiana).",
      },
    ],
    related: [
      'prestiti-linguistici',
      'evoluzione-linguistica',
      'registro-formale',
    ],
  },
  {
    slug: 'prestiti-linguistici',
    title: 'Prestiti linguistici e anglicismi',
    level: 'C2',
    category: 'Avanzato',
    summary: "L'influenza di altre lingue sull'italiano contemporaneo.",
    explanation:
      "Prestiti in italiano:\n- **Francese:** garage, menù, blu, peluche, cabaret.\n- **Spagnolo:** flamenco, siesta, fiesta, tango.\n- **Arabo:** algebra, algoritmo, zucchero, arancia.\n- **Tedesco:** kitsch, kaputt, strudel.\n- **Giapponese:** sushi, origami, tsunami.\n\n**Anglicismi moderni:** computer, mouse, smartphone, social media, meeting, deadline.\n\nL'Accademia della Crusca cerca di proporre alternative italiane, non sempre con successo.",
    rules: [
      'I prestiti antichi sono integrati (zucchero).',
      'I prestiti moderni spesso restano invariati (computer).',
      'Alcuni prestiti sviluppano significati diversi in italiano.',
      "L'italiano ha sempre assorbito parole da altre lingue.",
    ],
    examples: [
      {
        english:
          'Ho comprato un computer nuovo. (nessun equivalente italiano accettato)',
        translation: 'I bought a new computer.',
        note: 'anglicismo',
      },
      {
        english: "Lo zucchero viene dall'arabo sukkar.",
        translation: 'Sugar comes from the Arabic sukkar.',
        note: 'prestito arabo antico',
      },
      {
        english: "C'e chi dice smart working e chi dice lavoro agile.",
        translation: 'Some say smart working and others say agile work.',
        note: 'anglicismo vs alternativa italiana',
      },
    ],
    common_mistakes: [
      {
        wrong:
          'Usare anglicismi inutili quando esiste un equivalente italiano preciso.',
        correct: "Preferire l'equivalente italiano se disponibile e naturale.",
        note: 'Non tutti gli anglicismi sono necessari.',
      },
    ],
    related: ['latinismi', 'evoluzione-linguistica', 'italiano-standard'],
  },
  {
    slug: 'generi-testuali',
    title: 'Generi testuali',
    level: 'C2',
    category: 'Avanzato',
    summary:
      'Padroneggiare diversi generi testuali: saggio, relazione, articolo, recensione.',
    explanation:
      'Principali generi testuali:\n- **Saggio argomentativo:** tesi, argomenti, conclusione.\n- **Relazione tecnica:** dati, analisi, raccomandazioni.\n- **Articolo di opinione:** punto di vista personale, stile brillante.\n- **Recensione:** descrizione, valutazione, consiglio.\n- **Lettera formale:** formule standard, registro elevato.\n- **Racconto breve:** narrativa, descrizione, dialogo.',
    rules: [
      'Ogni genere ha convenzioni specifiche.',
      'Il registro varia a seconda del genere e del pubblico.',
      'La struttura e parte integrante del genere.',
      'Leggere esempi del genere prima di scrivere.',
    ],
    examples: [
      {
        english:
          "Saggio: In questo saggio si intende dimostrare che... Relazione: Dati alla mano, si evince che... Recensione: L'ultimo film di Sorrentino e un capolavoro visivo...",
        translation:
          "Essay: This essay aims to demonstrate that... Report: Based on the data, it appears that... Review: Sorrentino's latest film is a visual masterpiece...",
      },
    ],
    common_mistakes: [
      {
        wrong: 'Mescolare le convenzioni di generi diversi.',
        correct: 'Rispettare le caratteristiche specifiche di ogni genere.',
        note: 'Una relazione tecnica non e un saggio personale.',
      },
    ],
    related: [
      'struttura-argomentativa',
      'registro-formale',
      'sintesi-testuale',
    ],
  },
  {
    slug: 'creativita-linguistica',
    title: 'Creativita linguistica',
    level: 'C2',
    category: 'Avanzato',
    summary:
      'Giocare con la lingua: neologismi, metafore originali, invenzioni lessicali.',
    explanation:
      'La creativita linguistica a livello C2:\n- **Neologismi:** creare parole nuove per concetti nuovi.\n- **Metafore originali:** non quelle cristallizzate, ma immagini nuove.\n- **Giochi di parole consapevoli:** calembour, doppi sensi.\n- **Scrittura creativa:** rompere le regole dopo averle padroneggiate.\n\nEsempi di creativita: *petaloso* (neologismo di un bambino, entrato nei dizionari); *buonista* (dispregiativo moderno).',
    rules: [
      'La creativita funziona quando le regole sono gia padroneggiate.',
      'I neologismi efficaci colgono un bisogno espressivo reale.',
      'Le metafore fresche sorprendono e illuminano.',
      'La lingua e plastica: le regole descrivono, non prescrivono.',
    ],
    examples: [
      {
        english:
          'Era un tramonto petaloso, di quelli che ti restano negli occhi per giorni.',
        translation:
          'It was a petal-filled sunset, the kind that stays in your eyes for days.',
        note: 'neologismo',
      },
      {
        english:
          'Le sue parole erano coltelli di vetro: trasparenti, affilati, invisibili fino al colpo.',
        translation:
          'His words were glass knives: transparent, sharp, invisible until the blow.',
        note: 'metafora originale',
      },
    ],
    common_mistakes: [
      {
        wrong:
          'Creare neologismi senza conoscere le regole di formazione delle parole.',
        correct:
          'I neologismi devono rispettare la morfologia italiana per essere accettati.',
        note: 'La creativita e libertà nella regola, non ignoranza della regola.',
      },
    ],
    related: ['derivazione', 'precisione-lessicale', 'stile-letterario'],
  },
  {
    slug: 'editing',
    title: 'Editing e revisione testuale',
    level: 'C2',
    category: 'Avanzato',
    summary: 'Tecniche per revisionare e migliorare testi propri e altrui.',
    explanation:
      'Processo di editing professionale:\n1. **Revisione strutturale:** organizzazione, flusso logico.\n2. **Revisione stilistica:** tono, registro, chiarezza.\n3. **Revisione linguistica:** grammatica, sintassi, ortografia.\n4. **Editing finale:** refusi, formattazione.\n\nTecniche:\n- Leggere ad alta voce.\n- Distanziamento temporale prima di rileggere.\n- Checklist di controllo.\n- Editing a strati (un aspetto alla volta).',
    rules: [
      'Editing strutturale prima di quello linguistico.',
      'Leggere ad alta voce rivela problemi di ritmo.',
      'Prendere distanza dal testo prima di revisionarlo.',
      "Un buon editing migliora senza stravolgere la voce dell'autore.",
    ],
    examples: [
      {
        english:
          "Prima: L'azienda ha fatto un sacco di cose per migliorare la situazione. Dopo: L'azienda ha implementato diverse strategie per ottimizzare i processi interni.",
        translation:
          'Before: The company did a lot of things to improve the situation. After: The company implemented several strategies to optimize internal processes.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Limitarsi alla correzione dei refusi.',
        correct: 'Revisionare a tutti i livelli: struttura, stile, lingua.',
        note: "L'editing efficace va oltre la grammatica.",
      },
    ],
    related: ['sintesi-testuale', 'riformulazione', 'precisione-lessicale'],
  },
  {
    slug: 'espressione-sfumata',
    title: 'Espressione sfumata e diplomatica',
    level: 'C2',
    category: 'Avanzato',
    summary:
      'Esprimersi con sfumature e diplomazia nel discorso professionale e sociale.',
    explanation:
      "Tecniche di espressione sfumata:\n- **Attenuatori:** *forse, magari, un po', piuttosto, alquanto.*\n- **Condizionale di cortesia:** *Vorrei, potrei, mi piacerebbe.*\n- **Domande invece di affermazioni:** *Non crede che...?*\n- **Understatement:** *Non e il massimo* (invece di *e orribile*).\n- **Formule di cautela:** *A mio modesto parere, se non sbaglio, mi sembra che.*",
    rules: [
      'Attenuare affermazioni categoriche.',
      'Preferire domande a imposizioni.',
      'Riconoscere punti di vista diversi: Capisco la sua posizione, tuttavia...',
      'Il linguaggio diplomatico evita conflitti e mantiene relazioni.',
    ],
    examples: [
      {
        english:
          'Mi sembra che forse ci sia un piccolo margine di miglioramento in questa sezione.',
        translation:
          'It seems to me that perhaps there is a small margin for improvement in this section.',
        note: 'attenuazione diplomatica',
      },
      {
        english:
          'Non e esattamente quello che avevamo in mente. (invece di: E completamente sbagliato.)',
        translation:
          "It's not exactly what we had in mind. (instead of: It's completely wrong.)",
        note: 'understatement',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Questo e inaccettabile! (in contesto professionale)',
        correct:
          'Ho alcune perplessita su questo aspetto. Potremmo valutare delle alternative?',
        note: 'La diplomazia preserva la relazione professionale.',
      },
    ],
    related: [
      'critica-costruttiva',
      'registro-formale',
      'condizionale-cortesia',
    ],
  },
  {
    slug: 'integrazione-grammaticale',
    title: 'Integrazione grammaticale completa',
    level: 'C2',
    category: 'Avanzato',
    summary:
      'Usare simultaneamente tutte le strutture grammaticali con fluidita e precisione.',
    explanation:
      "A livello C2 tutte le strutture grammaticali devono integrarsi naturalmente:\n- Congiuntivo + condizionale + periodo ipotetico.\n- Subordinate implicite ed esplicite alternate.\n- Pronomi combinati in contesti complessi.\n- Dislocazioni e frasi marcate con consapevolezza.\n- Passaggio fluido tra registri.\n\nL'obiettivo e la *fluidita nativa*, dove la grammatica non e piu un ostacolo ma uno strumento trasparente.",
    rules: [
      'Alternare strutture semplici e complesse per il ritmo.',
      'Usare il congiuntivo senza pensarci.',
      'Scegliere il registro appropriato al contesto.',
      "La grammatica e al servizio dell'espressione, non viceversa.",
    ],
    examples: [
      {
        english:
          'Se avessi saputo che sarebbe stato cosi difficile, ci avrei pensato due volte prima di accettare, ma ormai quel che e fatto e fatto.',
        translation:
          "If I had known it would be so difficult, I would have thought twice before accepting, but what's done is done.",
        note: 'periodo ipotetico 3 tipo + connettivo',
      },
      {
        english:
          'Benche non condivida pienamente la sua posizione, devo ammettere che le sue argomentazioni, per quanto provocatorie, non sono prive di fondamento.',
        translation:
          "Although I don't fully share his position, I must admit that his arguments, however provocative, are not without foundation.",
      },
    ],
    common_mistakes: [
      {
        wrong: "Evitare strutture complesse per paura dell'errore.",
        correct:
          "Usare strutture complesse con sicurezza, accettando che l'errore occasionale e normale.",
        note: 'La fluidita C2 non significa perfezione assoluta, ma naturalezza.',
      },
    ],
    related: ['fluidita-nativa', 'ripasso-congiuntivo', 'ripasso-condizionale'],
  },
  {
    slug: 'fluidita-nativa',
    title: 'Fluidita nativa',
    level: 'C2',
    category: 'Avanzato',
    summary:
      'Raggiungere una fluidita indistinguibile da quella di un madrelingua.',
    explanation:
      'La fluidita nativa si caratterizza per:\n- **Automatismo:** strutture grammaticali usate senza sforzo cosciente.\n- **Intuito linguistico:** sapere cosa suona naturale senza sapere perche.\n- **Prosodia e intonazione:** ritmo, pause, accenti naturali.\n- **Competenza pragmatica:** capire impliciti, ironia, allusioni.\n- **Competenza culturale:** riferimenti condivisi da madrelingua.\n\nSi raggiunge con immersione prolungata, lettura estensiva e pratica costante.',
    rules: [
      'Immersione: vivere la lingua, non solo studiarla.',
      'Leggere di tutto: giornali, romanzi, saggistica.',
      'Parlare con madrelingua di argomenti vari.',
      'Accettare che ci sara sempre qualcosa da imparare.',
    ],
    examples: [
      {
        english:
          "Mah, insomma, non e che mi entusiasmi l'idea, pero tutto sommato si potrebbe anche fare, dai.",
        translation:
          "Well, I mean, it's not that the idea excites me, but all in all it could be done, come on.",
        note: 'parlato naturale con segnali discorsivi',
      },
      {
        english:
          'Certe volte basta uno sguardo per capirsi, senza bisogno di tante parole.',
        translation:
          'Sometimes a look is enough to understand each other, without needing many words.',
        note: 'fluidita espressiva',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Cercare la perfezione assoluta.',
        correct:
          'Cercare la naturalezza: anche i madrelingua fanno errori nel parlato.',
        note: 'La fluidita e comunicazione efficace, non perfezione grammaticale.',
      },
    ],
    related: [
      'integrazione-grammaticale',
      'espressione-sfumata',
      'italiano-standard',
    ],
  },
]
