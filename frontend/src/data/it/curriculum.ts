import type { CEFRLevel } from '@/data/grammar'

export type LessonType =
  | 'grammar'
  | 'vocabulary'
  | 'reading'
  | 'writing'
  | 'review'

export type Intensity = 'intensive' | 'standard' | 'relaxed' | 'very_relaxed'

export interface IntensityConfig {
  label: string
  description: string
  weeks: number
  days_per_week: number
  recommended?: boolean
}

export interface CurriculumUnit {
  id: string
  level: CEFRLevel
  unit_number: number
  title: string
  default_weeks: [number, number]
  grammar_points: string[]
  vocabulary_set_ids: string[]
  lesson_types: LessonType[]
  prerequisite_unit?: string
  competency_checklist: string[]
}

export interface LevelCurriculum {
  level: CEFRLevel
  title: string
  description: string
  default_duration_weeks: number
  units: CurriculumUnit[]
}

export const CEFR_LEVELS: CEFRLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']

export const INTENSITY_OPTIONS: Record<Intensity, IntensityConfig> = {
  intensive: {
    label: 'Intensive',
    description: '~20 lessons · 5 days/week',
    weeks: 4,
    days_per_week: 5,
  },
  standard: {
    label: 'Standard',
    description: '~40 lessons · 5 days/week',
    weeks: 8,
    days_per_week: 5,
  },
  relaxed: {
    label: 'Relaxed',
    description: '~48 lessons · 4 days/week',
    weeks: 12,
    days_per_week: 4,
    recommended: true,
  },
  very_relaxed: {
    label: 'Very relaxed',
    description: '~48 lessons · 3 days/week',
    weeks: 16,
    days_per_week: 3,
  },
}

export const curriculum: Record<CEFRLevel, LevelCurriculum> = {
  A1: {
    level: 'A1',
    title: 'Beginner Italian',
    description:
      'Greetings, introductions, basic grammar and everyday vocabulary.',
    default_duration_weeks: 8,
    units: [
      {
        id: 'a1-unit-1',
        level: 'A1',
        unit_number: 1,
        title: 'Saluti e Presentazioni',
        default_weeks: [1, 2],
        grammar_points: [
          'essere',
          'avere',
          'pronomi-soggetto',
          'articoli-determinativi',
        ],
        vocabulary_set_ids: ['saluti_it_a1', 'presentazioni_it_a1'],
        lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
        prerequisite_unit: undefined,
        competency_checklist: [
          'Si presenta usando essere e avere: nome, età, nazionalità — Sono Marco, ho 25 anni, sono italiano',
          'Saluta e si congeda con il registro corretto: ciao, buongiorno, buonasera, arrivederci, a presto',
          'Usa gli articoli determinativi il/lo/la/i/gli/le correttamente, inclusa la regola lo/gli prima di s+consonante, z, gn, ps, x: lo studente, gli zaini',
          'Chiede e risponde a Come ti chiami? / Di dove sei? in un breve scambio orale',
        ],
      },
      {
        id: 'a1-unit-2',
        level: 'A1',
        unit_number: 2,
        title: 'Nazionalità e Professioni',
        default_weeks: [1, 2],
        grammar_points: [
          'essere-nazionalità',
          'genere-nomi',
          'articoli-indeterminativi',
        ],
        vocabulary_set_ids: ['nazionalità_it_a1', 'professioni_it_a1'],
        lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
        prerequisite_unit: 'a1-unit-1',
        competency_checklist: [
          'Indica nazionalità e professione usando essere con la forma maschile/femminile corretta: sono inglese/inglesa, sono medico/medichessa',
          "Applica la concordanza di genere: i sostantivi italiani in -o sono tipicamente maschili, in -a tipicamente femminili, in -e possono essere di entrambi i generi — verifica il genere con l'articolo",
          "Usa un/uno/una/un' correttamente, incluso uno prima di s+consonante e z: uno studente, un amico, una pizza, un'amica",
          'Produce una breve presentazione (4–5 frasi) combinando essere, avere, nazionalità e professione',
        ],
      },
      {
        id: 'a1-unit-3',
        level: 'A1',
        unit_number: 3,
        title: 'La Famiglia e Descrizioni',
        default_weeks: [1, 2],
        grammar_points: [
          'aggettivi-possessivi',
          'aggettivi-descrittivi',
          "c'è-ci-sono",
        ],
        vocabulary_set_ids: ['famiglia_it_a1', 'descrizioni_it_a1'],
        lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
        prerequisite_unit: 'a1-unit-2',
        competency_checklist: [
          "Usa gli aggettivi possessivi (mio, tuo, suo, nostro, vostro, loro) con l'articolo nella maggior parte dei casi: la mia famiglia, il mio cane — ma omette l'articolo con i termini di famiglia singolari non modificati: mia madre, tuo fratello, sua sorella",
          "Descrive l'aspetto fisico e la personalità usando aggettivi che concordano in genere e numero: alto/alta/alti/alte, simpatico/simpatica",
          "Usa c'è e ci sono per descrivere ciò che esiste: C'è un parco vicino a casa, Ci sono due bambini",
          "Scrive un breve paragrafo (40–50 parole) descrivendo i membri della famiglia usando essere, avere, c'è/ci sono e aggettivi descrittivi",
        ],
      },
      {
        id: 'a1-unit-4',
        level: 'A1',
        unit_number: 4,
        title: 'Routine Quotidiana e Verbi al Presente',
        default_weeks: [1, 2],
        grammar_points: [
          'presente-are',
          'presente-ere',
          'presente-ire',
          'verbi-riflessivi',
        ],
        vocabulary_set_ids: ['routine_it_a1', 'orari_it_a1'],
        lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
        prerequisite_unit: 'a1-unit-3',
        competency_checklist: [
          'Coniuga i verbi regolari -are (parlare), -ere (leggere), e -ire in entrambi i modelli: dormire (dormo/dormi/dorme) e capire — che prende -isco: capisco, capisci, capisce, capiamo, capite, capiscono',
          'Usa i verbi riflessivi con il pronome corretto: mi alzo, ti lavi, si veste, ci svegliamo — e li mette in sequenza per descrivere la routine mattutina',
          "Dice l'ora: Sono le tre, È l'una, Sono le tre e mezza, Sono le quattro meno un quarto",
          'Descrive la routine quotidiana in un paragrafo connesso di 5–6 frasi usando espressioni di tempo: di mattina, a mezzogiorno, nel pomeriggio, di sera',
        ],
      },
      {
        id: 'a1-unit-5',
        level: 'A1',
        unit_number: 5,
        title: 'Gusti e Preferenze',
        default_weeks: [1, 2],
        grammar_points: ['piacere', 'verbi-modali', 'anche-neanche'],
        vocabulary_set_ids: ['cibo_it_a1', 'attività_it_a1'],
        lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
        prerequisite_unit: 'a1-unit-4',
        competency_checklist: [
          "Usa piacere correttamente: mi piace + nome singolare/infinito (Mi piace la pizza, Mi piace leggere) vs mi piacciono + nome plurale (Mi piacciono i libri) — invertendo i ruoli soggetto/oggetto rispetto all'inglese",
          'Usa dovere, potere, volere come verbi modali seguiti da infinito, coniugati per tutte le persone: devo studiare, puoi venire?, vuole mangiare',
          'Esprime accordo e disaccordo usando anche io, neanche io, (a me) sì/(a me) no per la contraddizione diretta',
          'Esprime preferenze con preferire + nome/infinito e piace di più/di meno in brevi scambi conversazionali',
        ],
      },
      {
        id: 'a1-unit-6',
        level: 'A1',
        unit_number: 6,
        title: 'Luoghi e Indicazioni',
        default_weeks: [1, 2],
        grammar_points: [
          'preposizioni-luogo',
          'imperativo-informale',
          'numeri-ordinali',
        ],
        vocabulary_set_ids: ['luoghi_it_a1', 'indicazioni_it_a1'],
        lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
        prerequisite_unit: 'a1-unit-5',
        competency_checklist: [
          'Usa le preposizioni articolate correttamente: nel, nello, nella, nei, negli, nelle; al, allo, alla, ai, agli, alle — queste fondono articolo e preposizione in un modo che non ha equivalente inglese',
          "Dà indicazioni usando l'imperativo informale dei verbi chiave: vai/va', gira, prendi, continua, attraversa, segui — e li combina con le preposizioni: gira a destra/sinistra, va' sempre dritto",
          'Usa i numeri ordinali primo, secondo, terzo... per indicare piani e ordine: al primo piano, la seconda strada a sinistra',
          'Comprende e segue un semplice insieme di indicazioni scritte per un percorso familiare in città',
        ],
      },
      {
        id: 'a1-unit-7',
        level: 'A1',
        unit_number: 7,
        title: 'Piani e Futuro',
        default_weeks: [1, 2],
        grammar_points: ['futuro-semplice', 'stare-per', 'giorni-settimana'],
        vocabulary_set_ids: ['trasporti_it_a1', 'meteo_it_a1'],
        lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
        prerequisite_unit: 'a1-unit-6',
        competency_checklist: [
          'Coniuga il futuro semplice per i verbi regolari: parlerò, leggerai, partirà — e le radici irregolari comuni: sar-, avrò, farò, andrò, verrò, dovrò, potrò, vorrò',
          "Usa stare per + infinito per esprimere un'azione che sta per accadere: Sto per uscire — una costruzione unicamente italiana senza equivalente diretto in inglese",
          'Nomina i giorni della settimana e usa lunedì/martedì... senza articolo per un giorno specifico (Arrivo lunedì) vs il/la + giorno per uno abituale (Il lunedì vado in palestra)',
          "Parla del tempo: c'è il sole, fa caldo/freddo, piove, nevica, è nuvoloso, c'è vento — e usa il futuro per le previsioni",
        ],
      },
      {
        id: 'a1-unit-8',
        level: 'A1',
        unit_number: 8,
        title: 'A1 Consolidamento',
        default_weeks: [1, 1],
        grammar_points: [
          'essere',
          'avere',
          'presente-are',
          'presente-ere',
          'presente-ire',
          'piacere',
          'verbi-modali',
          'futuro-semplice',
          'articoli-determinativi',
          'preposizioni-articolate',
        ],
        vocabulary_set_ids: ['ripasso_it_a1'],
        lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
        prerequisite_unit: 'a1-unit-7',
        competency_checklist: [
          'Sostiene un breve scambio orale o scritto su argomenti familiari usando essere, avere e il presente senza interruzioni importanti',
          "Usa le preposizioni articolate e la regola dell'articolo lo/gli in modo coerente senza errori sistematici",
          'Combina piacere, verbi modali e il futuro semplice in un breve testo connesso su piani e preferenze',
          'Legge e comprende un testo semplice di 60–80 parole su un argomento quotidiano e risponde a domande fattuali',
        ],
      },
    ],
  },
  A2: {
    level: 'A2',
    title: 'Elementary Italian',
    description:
      'Past tenses, object pronouns, comparisons and basic conversation.',
    default_duration_weeks: 8,
    units: [
      {
        id: 'a2-unit-1',
        level: 'A2',
        unit_number: 1,
        title: 'Passato Prossimo',
        default_weeks: [1, 2],
        grammar_points: [
          'passato-prossimo-avere',
          'passato-prossimo-essere',
          'participi-irregolari',
        ],
        vocabulary_set_ids: ['viaggi_it_a2', 'esperienze_it_a2'],
        lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
        prerequisite_unit: undefined,
        competency_checklist: [
          'Forma il passato prossimo con avere per i verbi transitivi: ho mangiato, hai letto, ha scritto — e sa che il participio passato NON cambia con avere a meno che non sia preceduto da un pronome oggetto diretto (Li ho visti)',
          'Forma il passato prossimo con essere per i verbi intransitivi di movimento e cambiamento di stato, facendo concordare il participio in genere e numero col soggetto: sono andato/andata, siamo partiti/partite',
          'Identifica quali verbi comuni prendono essere (andare, venire, partire, arrivare, nascere, morire, restare, diventare, essere, stare) vs avere',
          'Usa 20+ participi passati irregolari comuni: fatto, detto, scritto, letto, aperto, chiuso, messo, preso, visto, venuto, stato, rimasto, risposto',
        ],
      },
      {
        id: 'a2-unit-2',
        level: 'A2',
        unit_number: 2,
        title: 'Imperfetto e Narrazione',
        default_weeks: [1, 2],
        grammar_points: [
          'imperfetto',
          'passato-prossimo-vs-imperfetto',
          'marcatori-temporali',
        ],
        vocabulary_set_ids: ['infanzia_it_a2', 'storie_it_a2'],
        lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
        prerequisite_unit: 'a2-unit-1',
        competency_checklist: [
          "Coniuga l'imperfetto per tutte le persone: regolari -are (parlavo), -ere (leggevo), -ire (dormivo) e l'irregolare essere (ero/eri/era/eravamo/eravate/erano)",
          "Usa l'imperfetto per stati passati in corso, descrizioni di scene, azioni abituali passate ed età (Da bambino, avevo i capelli biondi; Di solito mangiavo alle otto)",
          "Distingue passato prossimo (azione completata, in primo piano) dall'imperfetto (sfondo, stato/abitudine in corso): Quando sono arrivato, mangiava già",
          "Scrive un ricordo d'infanzia o una storia semplice (60–80 parole) combinando entrambi i tempi con marcatori temporali: mentre, quando, di solito, spesso, sempre, una volta",
        ],
      },
      {
        id: 'a2-unit-3',
        level: 'A2',
        unit_number: 3,
        title: 'Pronomi Diretti e Indiretti',
        default_weeks: [1, 2],
        grammar_points: [
          'pronomi-diretti',
          'pronomi-indiretti',
          'pronomi-combinati',
        ],
        vocabulary_set_ids: ['acquisti_it_a2', 'regali_it_a2'],
        lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
        prerequisite_unit: 'a2-unit-2',
        competency_checklist: [
          'Sostituisce un oggetto diretto con lo/la/li/le posto prima del verbo coniugato: Compro il libro → Lo compro; ho visto le ragazze → Le ho viste — inclusa la concordanza obbligatoria del participio passato con li/la/le/lo',
          'Usa i pronomi oggetto indiretto mi/ti/gli/le/ci/vi/gli (loro) posti prima del verbo: Gli scrivo una lettera, Ti mando un messaggio',
          'Combina i pronomi diretti e indiretti, applicando la trasformazione a me lo, te lo, glielo, ce lo, ve lo, glielo',
          "Posiziona i pronomi correttamente: prima del verbo coniugato, attaccati all'infinito o gerundio, o attaccati all'imperativo (Dimmi! Dammelo!)",
        ],
      },
      {
        id: 'a2-unit-4',
        level: 'A2',
        unit_number: 4,
        title: 'Comparativi e Superlativi',
        default_weeks: [1, 2],
        grammar_points: ['comparativi', 'superlativi', 'così-come'],
        vocabulary_set_ids: ['città_it_a2', 'cultura_it_a2'],
        lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
        prerequisite_unit: 'a2-unit-3',
        competency_checklist: [
          'Forma comparativi di disuguaglianza usando più/meno + aggettivo + di (prima di un nome/pronome) o che (prima di due aggettivi, due nomi confrontati, o prima di infiniti): Roma è più grande di Milano; È più bello che utile',
          'Esprime uguaglianza con così...come o tanto...quanto: È così bravo come me, Mangia tanto quanto me',
          "Forma il superlativo relativo con il/la + più/meno + aggettivo + di: È il film più bello dell'anno",
          'Usa i comparativi e superlativi irregolari: buono → migliore/il migliore, cattivo → peggiore/il peggiore, grande → maggiore/il maggiore, piccolo → minore/il minore',
        ],
      },
      {
        id: 'a2-unit-5',
        level: 'A2',
        unit_number: 5,
        title: 'Imperativo e Consigli',
        default_weeks: [1, 2],
        grammar_points: [
          'imperativo-affermativo',
          'imperativo-negativo',
          'imperativo-pronomi',
        ],
        vocabulary_set_ids: ['salute_it_a2', 'consigli_it_a2'],
        lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
        prerequisite_unit: 'a2-unit-4',
        competency_checklist: [
          "Forma l'imperativo affermativo per tu (identico al presente indicativo per -are: parla!, -ere: prendi!, -ire: dormi!), voi (uguale al presente indicativo: parlate!, prendete!), e la forma formale Lei (uguale al congiuntivo presente: parli!, prenda!)",
          "Nota gli imperativi irregolari di tu: va'/vai, da'/dai, fa'/fai, sta'/stai, di' — e li usa in contesti pratici (Va' a dormire!, Di' la verità!)",
          "Forma l'imperativo negativo per tu con non + infinito: non parlare!, non prendere!, non dormire! — tutte le altre persone usano non + imperativo affermativo",
          'Attacca i pronomi agli imperativi affermativi (Dimmi!, Prendilo!, Alzati!) e raddoppia la consonante con le forme brevi: dammi, fallo, vacci, stammi',
        ],
      },
      {
        id: 'a2-unit-6',
        level: 'A2',
        unit_number: 6,
        title: 'Condizionale e Cortesia',
        default_weeks: [1, 2],
        grammar_points: [
          'condizionale-presente',
          'condizionale-cortesia',
          'vorrei',
        ],
        vocabulary_set_ids: ['lavoro_it_a2', 'richieste_it_a2'],
        lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
        prerequisite_unit: 'a2-unit-5',
        competency_checklist: [
          'Coniuga il condizionale presente per tutte le persone, notando la radice condivisa col futuro: parlerei, parleresti, parlerebbe, parleremmo, parlereste, parlerebbero — e le radici irregolari: sarei, avrei, farei, andrei, verrei, dovrei, potrei, vorrei',
          'Usa vorrei come forma standard di cortesia per richieste e ordinazioni in italiano: Vorrei un caffè, Vorrei prenotare un tavolo',
          'Fa richieste e suggerimenti cortesi usando potrebbe, dovrebbe, sarebbe meglio: Potrebbe aiutarmi? Sarebbe possibile...?',
          'Usa il condizionale per affermazioni ipotetiche ed espressione di desideri: Mangerei volentieri una pizza, Vivrei in Italia se potessi',
        ],
      },
      {
        id: 'a2-unit-7',
        level: 'A2',
        unit_number: 7,
        title: 'Racconti e Narrazioni',
        default_weeks: [1, 2],
        grammar_points: [
          'connettivi-narrativi',
          'trapassato-prossimo',
          'discorso-indiretto',
        ],
        vocabulary_set_ids: ['storie_it_a2', 'aneddoti_it_a2'],
        lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
        prerequisite_unit: 'a2-unit-6',
        competency_checklist: [
          'Collega gli eventi usando connettivi narrativi: prima, poi, dopo, quindi, allora, alla fine, nel frattempo, improvvisamente, a quel punto',
          "Forma il trapassato prossimo (aveva + participio / era + participio) per esprimere un'azione accaduta prima di un altro evento passato: Quando sono arrivato, aveva già mangiato",
          'Riporta ciò che qualcuno ha detto applicando lo spostamento temporale richiesto: dice → ha detto che; presente → imperfetto: Ha detto che era stanco; futuro → condizionale: Ha detto che sarebbe venuto',
          'Scrive un aneddoto personale di 80–100 parole combinando passato prossimo, imperfetto, trapassato prossimo e connettivi narrativi',
        ],
      },
      {
        id: 'a2-unit-8',
        level: 'A2',
        unit_number: 8,
        title: 'A2 Consolidamento',
        default_weeks: [1, 1],
        grammar_points: [
          'passato-prossimo-avere',
          'passato-prossimo-essere',
          'imperfetto',
          'pronomi-diretti',
          'pronomi-indiretti',
          'comparativi',
          'condizionale-presente',
          'imperativo-affermativo',
          'trapassato-prossimo',
        ],
        vocabulary_set_ids: ['ripasso_it_a2'],
        lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
        prerequisite_unit: 'a2-unit-7',
        competency_checklist: [
          'Gestisce situazioni sociali di routine (acquisti, prenotazioni, richiesta di informazioni) usando i tempi passati corretti e le forme condizionali di cortesia',
          'Usa i pronomi oggetto — diretti, indiretti e combinati — con precisione in brevi scambi senza errori sistematici',
          'Produce un testo connesso di 80–100 parole usando passato prossimo, imperfetto e condizionale',
          'Legge e comprende un testo fattuale di 150–200 parole su un argomento familiare e risponde a domande di comprensione',
        ],
      },
    ],
  },
  B1: {
    level: 'B1',
    title: 'Intermediate Italian',
    description:
      'Subjunctive mood, compound tenses, relative clauses and opinion expression.',
    default_duration_weeks: 8,
    units: [
      {
        id: 'b1-unit-1',
        level: 'B1',
        unit_number: 1,
        title: 'Congiuntivo Presente',
        default_weeks: [1, 2],
        grammar_points: [
          'congiuntivo-presente',
          'verbi-opinione',
          'espressioni-impersonali',
        ],
        vocabulary_set_ids: ['emozioni_it_b1', 'opinioni_it_b1'],
        lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
        prerequisite_unit: undefined,
        competency_checklist: [
          'Forma il congiuntivo presente per i verbi regolari e gli irregolari essenziali: sia, abbia, faccia, vada, venga, dica, esca, possa, voglia, sappia, tenga',
          'Usa il congiuntivo dopo i verbi di opinione e stato mentale con cambio di soggetto: pensare che, credere che, sperare che, temere che, dubitare che: Penso che venga domani',
          'Usa il congiuntivo dopo espressioni impersonali: è importante che, è necessario che, bisogna che, è possibile che, è strano che, è un peccato che + congiuntivo',
          "Distingue quando il congiuntivo è richiesto (cambio di soggetto, giudizio soggettivo) da quando si usa l'infinito (stesso soggetto): Spero di venire vs Spero che tu venga",
          "Nota che nell'italiano parlato informale il congiuntivo è spesso sostituito dall'indicativo dai parlanti nativi — ma comprende che la scrittura formale lo richiede",
        ],
      },
      {
        id: 'b1-unit-2',
        level: 'B1',
        unit_number: 2,
        title: 'Congiuntivo in Contesto',
        default_weeks: [1, 2],
        grammar_points: [
          'congiuntivo-volontà',
          'congiuntivo-emozioni',
          'congiuntivo-dubbi',
        ],
        vocabulary_set_ids: ['lavoro_it_b1', 'studio_it_b1'],
        lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
        prerequisite_unit: 'b1-unit-1',
        competency_checklist: [
          'Usa il congiuntivo dopo verbi di volontà e desiderio: volere che, desiderare che, preferire che, chiedere che, insistere che — Voglio che tu mi dica la verità',
          'Usa il congiuntivo dopo espressioni emotive: sono contento/a che, mi dispiace che, ho paura che, è un peccato che, mi stupisce che — Mi dispiace che tu non possa venire',
          'Usa il congiuntivo dopo espressioni di dubbio, negazione e incertezza: non credere che, non pensare che, negare che, non essere sicuro/a che — Non sono sicura che abbia capito',
          "Usa il congiuntivo dopo pronomi indefiniti e negativi: non c'è nessuno che, non conosco niente che, cerco qualcuno che",
          "Produce un paragrafo dando consigli ed esprimendo opinioni su una situazione lavorativa o di studio usando il congiuntivo correttamente in contrasto con l'indicativo",
        ],
      },
      {
        id: 'b1-unit-3',
        level: 'B1',
        unit_number: 3,
        title: 'Trapassato Prossimo e Futuro Anteriore',
        default_weeks: [1, 2],
        grammar_points: [
          'trapassato-prossimo',
          'futuro-anteriore',
          'concordanza-tempi',
        ],
        vocabulary_set_ids: ['esperienze_it_b1', 'progetti_it_b1'],
        lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
        prerequisite_unit: 'b1-unit-2',
        competency_checklist: [
          "Forma il trapassato prossimo (avevo/ero + participio passato) con la scelta corretta dell'ausiliare e concordanza del participio — si applica la stessa regola essere/avere del passato prossimo: era già partita, avevo già mangiato",
          "Usa il trapassato prossimo per sequenziare due eventi passati: il trapassato per l'evento precedente, passato prossimo o imperfetto per quello successivo: Quando ho chiamato, era già uscito",
          "Forma il futuro anteriore (avrò/sarò + participio passato) e lo usa per: un'azione futura completata prima di un altro evento futuro (Quando avrò finito, uscirò) e per la probabilità su un'azione passata (Avrà già mangiato = Probabilmente ha già mangiato)",
          'Applica il principio chiave della concordanza dei tempi italiana: quando il verbo principale è al futuro, una subordinata temporale usa il futuro anteriore o il presente, non il passato prossimo',
        ],
      },
      {
        id: 'b1-unit-4',
        level: 'B1',
        unit_number: 4,
        title: 'Forma Passiva e Costruzioni Impersonali',
        default_weeks: [1, 2],
        grammar_points: ['forma-passiva', 'si-impersonale', 'si-passivante'],
        vocabulary_set_ids: ['notizie_it_b1', 'società_it_b1'],
        lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
        prerequisite_unit: 'b1-unit-3',
        competency_checklist: [
          'Forma la voce passiva con essere + participio passato in tutti i tempi, facendo concordare il participio col soggetto: Il libro è stato scritto da Calvino, Le case vengono costruite velocemente',
          'Usa venire + participio passato come passiva alternativa nei tempi semplici (non composti) per processi dinamici: La pizza viene preparata con ingredienti freschi — e andare + participio passato per esprimere obbligo o necessità: La legge va rispettata',
          'Usa il si impersonale per azioni con agente umano non specificato: Si mangia bene in Italia, Si dice che sia difficile — il verbo è sempre alla terza persona singolare',
          'Usa il si passivante (si + terza persona singolare/plurale a seconda del nome): Si vendono appartamenti, Si cerca un collaboratore — e lo distingue dal si impersonale per la concordanza verbale',
          'Legge un articolo di giornale e identifica le costruzioni passive, si passivante e impersonali; scrive un breve rapporto o descrizione di processo usando queste forme',
        ],
      },
      {
        id: 'b1-unit-5',
        level: 'B1',
        unit_number: 5,
        title: 'Pronomi Relativi e Frasi Relative',
        default_weeks: [1, 2],
        grammar_points: ['che-relativo', 'cui', 'il-quale'],
        vocabulary_set_ids: ['descrizioni_it_b1', 'persone_it_b1'],
        lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
        prerequisite_unit: 'b1-unit-4',
        competency_checklist: [
          "Usa che come pronome relativo predefinito sia per il soggetto che per l'oggetto diretto nelle frasi relative italiane: il libro che ho comprato, la persona che è arrivata",
          'Usa cui dopo tutte le preposizioni per formare frasi relative: il libro di cui ti ho parlato, la città in cui vivo, la persona a cui ho scritto, il motivo per cui sono venuto — mai usando che dopo una preposizione',
          "Usa il quale/la quale/i quali/le quali come alternativa a che o cui per precisione e per evitare ambiguità quando l'antecedente non è chiaro: Ho parlato con la figlia del direttore, la quale lavora in banca",
          'Usa dove come avverbio relativo per i luoghi (equivalente a in cui): la città dove vivo, il ristorante dove abbiamo mangiato',
        ],
      },
      {
        id: 'b1-unit-6',
        level: 'B1',
        unit_number: 6,
        title: 'Periodo Ipotetico e Ipotesi',
        default_weeks: [1, 2],
        grammar_points: [
          'periodo-ipotetico-1',
          'periodo-ipotetico-2',
          'se-congiuntivo',
        ],
        vocabulary_set_ids: ['situazioni_it_b1', 'ipotesi_it_b1'],
        lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
        prerequisite_unit: 'b1-unit-5',
        competency_checklist: [
          "Forma e usa il tipo 1 (reale) condizionale: se + presente indicativo + futuro indicativo per condizioni che probabilmente si realizzeranno: Se studia, passerà l'esame",
          'Forma e usa il tipo 2 (irreale presente) condizionale: se + congiuntivo imperfetto + condizionale presente per condizioni irreali o improbabili presenti/future: Se avessi i soldi, viaggerei di più',
          "Usa il futuro semplice per probabilità e previsioni: Sarà in casa, Avrà trent'anni — un uso italiano molto comune",
          'Comprende che in italiano la frase con se non prende mai il condizionale (a differenza di alcuni errori degli apprendenti): *Se avrei → ERRATO; Se avessi → CORRETTO',
        ],
      },
      {
        id: 'b1-unit-7',
        level: 'B1',
        unit_number: 7,
        title: 'Discorso Indiretto e Connettivi',
        default_weeks: [1, 2],
        grammar_points: [
          'discorso-indiretto-passato',
          'connettivi-argomentativi',
          'trasformazioni-temporali',
        ],
        vocabulary_set_ids: ['opinioni_it_b1', 'dibattiti_it_b1'],
        lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
        prerequisite_unit: 'b1-unit-6',
        competency_checklist: [
          'Riporta il discorso con lo spostamento temporale richiesto quando il verbo principale è al passato: presente → imperfetto (Dice che è stanco → Ha detto che era stanco), futuro → condizionale (Dice che verrà → Ha detto che sarebbe venuto)',
          'Riporta le domande correttamente usando se per le domande sì/no (Mi ha chiesto se ero stanco) e parole interrogative con ordine non invertito per le domande wh- (Mi ha chiesto dove abitassi)',
          "Applica gli spostamenti delle espressioni temporali nel discorso indiretto: oggi → quel giorno, domani → il giorno dopo/l'indomani, ieri → il giorno prima, qui → lì",
          'Usa i connettivi argomentativi: tuttavia, però, invece (contrasto); inoltre, anche, perfino (aggiunta); quindi, perciò, di conseguenza (conseguenza); poiché, siccome, dato che (causa) — posizionati correttamente nella frase',
        ],
      },
      {
        id: 'b1-unit-8',
        level: 'B1',
        unit_number: 8,
        title: 'B1 Consolidamento',
        default_weeks: [1, 1],
        grammar_points: [
          'congiuntivo-presente',
          'trapassato-prossimo',
          'futuro-anteriore',
          'forma-passiva',
          'cui',
          'periodo-ipotetico-2',
          'discorso-indiretto-passato',
        ],
        vocabulary_set_ids: ['ripasso_it_b1'],
        lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
        prerequisite_unit: 'b1-unit-7',
        competency_checklist: [
          'Gestisce la maggior parte delle situazioni quotidiane (viaggi, lavoro, interazione sociale) con relativa facilità ed esprime opinioni con sfumature',
          'Usa il congiuntivo presente correttamente nei suoi contesti B1 principali: giudizio soggettivo, dubbio, volontà, emozione — e lo applica dopo le espressioni impersonali',
          'Produce un testo connesso (100–150 parole) integrando congiuntivo, passivo, frasi relative con cui e connettivi argomentativi',
          'Legge ed estrae le idee principali da un articolo di 200–250 parole su un argomento familiare',
        ],
      },
    ],
  },
  B2: {
    level: 'B2',
    title: 'Upper Intermediate Italian',
    description:
      'Advanced subjunctive, idiomatic expressions, argumentation and media.',
    default_duration_weeks: 8,
    units: [
      {
        id: 'b2-unit-1',
        level: 'B2',
        unit_number: 1,
        title: 'Congiuntivo Imperfetto e Trapassato',
        default_weeks: [1, 2],
        grammar_points: [
          'congiuntivo-imperfetto',
          'congiuntivo-trapassato',
          'concordanza-congiuntivo',
        ],
        vocabulary_set_ids: ['sentimenti_it_b2', 'ipotesi_it_b2'],
        lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
        prerequisite_unit: undefined,
        competency_checklist: [
          'Forma il congiuntivo imperfetto per i verbi regolari: parlassi/parlasse/parlassimo e le forme irregolari chiave: fossi (essere), avessi (avere), facessi, andassi, venissi, dicessi, potessi, volessi',
          'Usa il congiuntivo imperfetto quando la frase principale è al passato o condizionale: Speravo che venisse, Vorrei che studiasse di più — applicando il principio della concordanza dei tempi',
          "Forma il congiuntivo trapassato (avessi/fossi + participio passato) per ipotesi sul passato: Benché avesse studiato molto, non ha superato l'esame; Se fosse arrivato prima, avrebbe trovato posto",
          'Usa il condizionale tipo 3 correttamente: se + congiuntivo trapassato + condizionale passato — Se avessi avuto i soldi, avrei comprato quella casa — notando che il condizionale non appare mai nella frase con se',
          'Applica il quadro completo della concordanza dei tempi: verbo principale presente/futuro → congiuntivo presente/passato; verbo principale passato/condizionale → congiuntivo imperfetto/trapassato',
        ],
      },
      {
        id: 'b2-unit-2',
        level: 'B2',
        unit_number: 2,
        title: 'Perifrasi e Costruzioni Verbali',
        default_weeks: [1, 2],
        grammar_points: [
          'stare-gerundio',
          'andare-gerundio',
          'venire-gerundio',
        ],
        vocabulary_set_ids: ['abitudini_it_b2', 'cambiamenti_it_b2'],
        lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
        prerequisite_unit: 'b2-unit-1',
        competency_checklist: [
          "Usa stare + gerundio per un'azione in corso in un dato momento: Sto leggendo, Stava dormendo quando ho chiamato — e lo distingue dal presente indicativo per azioni abituali o generali",
          'Usa andare + gerundio per esprimere un processo graduale o progressivo, spesso con una sfumatura valutativa: La situazione va migliorando, Il progetto andava complicandosi — questa costruzione non ha equivalente in inglese o spagnolo',
          "Usa venire + participio passato come alternativa passiva a essere + participio passato nei tempi semplici (non composti), sottolineando la natura dinamica o ripetuta dell'azione: Il giornale viene pubblicato ogni giorno, Le regole vengono applicate rigorosamente",
          "Usa stare per + infinito per un'azione che sta per accadere: Sto per uscire, Stava per piovere",
          "Seleziona la costruzione verbale più appropriata per descrivere l'aspetto (progressivo, ingressivo, terminativo) o per variare la voce passiva nella scrittura formale",
        ],
      },
      {
        id: 'b2-unit-3',
        level: 'B2',
        unit_number: 3,
        title: 'Connettivi e Coerenza Testuale',
        default_weeks: [1, 2],
        grammar_points: [
          'connettivi-avanzati',
          'coesione-testuale',
          'registro-formale',
        ],
        vocabulary_set_ids: ['saggi_it_b2', 'accademico_it_b2'],
        lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
        prerequisite_unit: 'b2-unit-2',
        competency_checklist: [
          "Usa i connettivi concessivi correttamente: sebbene/benché/nonostante/malgrado + congiuntivo (anche se questi sono seguiti dal congiuntivo — un requisito unicamente italiano che l'inglese 'although' non ha): Sebbene faccia freddo, esco",
          'Usa i connettivi causali con registro appropriato: perché (neutro), poiché/siccome (formale, a inizio frase), dato che, visto che — ed evita di iniziare una frase con *siccome se la frase principale viene prima',
          'Mantiene la coesione testuale attraverso riferimento nominale e pronominale, sostituzione lessicale ed ellissi in un testo di più paragrafi',
          'Adatta il registro scritto: usa strutture nominalizzate e costruzioni impersonali nella prosa accademica formale vs strutture più dirette e personali nella scrittura informale',
          'Produce un saggio argomentativo strutturato di 200+ parole con una tesi chiara, corpo sviluppato, uso di connettivi avanzati e una conclusione',
        ],
      },
      {
        id: 'b2-unit-4',
        level: 'B2',
        unit_number: 4,
        title: 'Espressioni Idiomatiche Italiane',
        default_weeks: [1, 2],
        grammar_points: [
          'modi-di-dire',
          'espressioni-colloquiali',
          'proverbi-italiani',
        ],
        vocabulary_set_ids: ['idiomi_it_b2', 'cultura_it_b2'],
        lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
        prerequisite_unit: 'b2-unit-3',
        competency_checklist: [
          "Comprende e usa 20+ espressioni idiomatiche italiane di alta frequenza: non vedere l'ora di, avere le mani in pasta, fare il ponte, prendere due piccioni con una fava, costare un occhio della testa",
          'Interpreta le espressioni idiomatiche italiane dal contesto senza traduzione letterale: essere al verde, andare a rotoli, avere la coda di paglia',
          'Comprende e interpreta i proverbi italiani: Meglio tardi che mai, Chi dorme non piglia pesci, Non è tutto oro quello che luccica — spiegando sia il significato letterale che pragmatico',
          'Distingue quando il linguaggio idiomatico è inappropriato nei registri scritti formali e seleziona un equivalente neutro',
          'Riconosce i riferimenti culturali specificamente italiani incorporati nelle espressioni idiomatiche: riferimenti al cibo (non avere il becco di un quattrino), alla religione (mamma mia) e alle tradizioni regionali',
        ],
      },
      {
        id: 'b2-unit-5',
        level: 'B2',
        unit_number: 5,
        title: 'Argomentazione e Dibattito',
        default_weeks: [1, 2],
        grammar_points: [
          'struttura-argomentativa',
          'controargomentazione',
          'sfumature',
        ],
        vocabulary_set_ids: ['dibattiti_it_b2', 'temi-sociali_it_b2'],
        lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
        prerequisite_unit: 'b2-unit-4',
        competency_checklist: [
          'Presenta una tesi chiara e la sviluppa con punti di supporto usando: in primo luogo, in secondo luogo, inoltre, a tal proposito, a questo riguardo, vale la pena notare che',
          'Introduce e confuta una controargomentazione: è vero che..., tuttavia; pur riconoscendo che..., bisogna comunque; si potrebbe obiettare che..., ma in realtà',
          "Usa espressioni epistemiche e di attenuazione per calibrare la forza dell'affermazione: a quanto pare, si ritiene che + congiuntivo, sembrerebbe che + congiuntivo, secondo alcuni esperti, è probabile che",
          'Partecipa a un dibattito strutturato usando frasi appropriate di presa di turno in italiano: se posso aggiungere, tornando alla questione sollevata da..., mi permetta di dissentire, vorrei precisare che',
          'Scrive un testo argomentativo di 200 parole con introduzione, concessione alla visione opposta, confutazione e conclusione',
        ],
      },
      {
        id: 'b2-unit-6',
        level: 'B2',
        unit_number: 6,
        title: 'Letteratura Italiana e Testi Narrativi',
        default_weeks: [1, 2],
        grammar_points: [
          'tempi-narrativi',
          'descrizione-letteraria',
          'passato-remoto',
        ],
        vocabulary_set_ids: ['letteratura_it_b2', 'lettura_it_b2'],
        lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
        prerequisite_unit: 'b2-unit-5',
        competency_checklist: [
          "Forma il passato remoto per i verbi regolari e gli irregolari essenziali: fui, ebbi, feci, dissi, vidi, venni, conobbi, nacqui, morì — e comprende che il passato remoto è il tempo narrativo standard nell'italiano letterario e nell'Italia meridionale, mentre l'Italia settentrionale usa il passato prossimo negli stessi contesti",
          "Distingue la divisione regionale passato remoto/passato prossimo: nell'italiano letterario e scritto standard, il passato remoto si usa per azioni completate senza connessione col presente; nel parlato quotidiano dell'Italia settentrionale, il passato prossimo copre questa funzione",
          "Usa l'imperfetto accanto al passato remoto nella narrazione letteraria esattamente come con il passato prossimo: passato remoto per eventi completati in primo piano, imperfetto per lo sfondo in corso",
          'Identifica e nomina i principali espedienti letterari italiani: metafora, similitudine, iperbole, personificazione, allitterazione, ossimoro — e li riconosce in brevi passaggi letterari di autori come Calvino, Pavese, Morante',
          'Scrive un brano narrativo descrittivo (80–100 parole) usando passato remoto, imperfetto e almeno un espediente letterario',
        ],
      },
      {
        id: 'b2-unit-7',
        level: 'B2',
        unit_number: 7,
        title: 'Media e Attualità',
        default_weeks: [1, 2],
        grammar_points: [
          'linguaggio-giornalistico',
          'titoli',
          'discorso-riportato',
        ],
        vocabulary_set_ids: ['notizie_it_b2', 'attualità_it_b2'],
        lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
        prerequisite_unit: 'b2-unit-6',
        competency_checklist: [
          'Identifica le caratteristiche dello stile giornalistico italiano: costruzioni nominalizzate, voce passiva, si impersonale, connettivi formali e una sintassi più complessa rispetto al parlato quotidiano',
          "Interpreta la grammatica dei titoli nei giornali italiani: forme verbali troncate, presente per il passato recente, infinito per eventi futuri, sintagmi nominali senza articoli: 'Governo approva nuova legge, scontri in piazza'",
          'Riassume un articolo di giornale italiano di 250 parole usando il discorso indiretto con spostamenti temporali corretti e verbi di attribuzione: affermare, sostenere, dichiarare, precisare, aggiungere, smentire',
          "Esprime accordo, accordo parziale e disaccordo con un pezzo di opinione giornalistica: condivido pienamente l'opinione di..., non sono del tutto convinto che..., mi sembra però che + congiuntivo",
          'Scrive un commento di 150 parole su un tema sociale o politico attuale usando vocabolario giornalistico e connettivi argomentativi',
        ],
      },
      {
        id: 'b2-unit-8',
        level: 'B2',
        unit_number: 8,
        title: 'B2 Consolidamento',
        default_weeks: [1, 1],
        grammar_points: [
          'congiuntivo-imperfetto',
          'congiuntivo-trapassato',
          'stare-gerundio',
          'andare-gerundio',
          'venire-gerundio',
          'modi-di-dire',
          'struttura-argomentativa',
          'passato-remoto',
          'discorso-riportato',
        ],
        vocabulary_set_ids: ['ripasso_it_b2'],
        lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
        prerequisite_unit: 'b2-unit-7',
        competency_checklist: [
          'Scrive un saggio formale di 200 parole integrando congiuntivo imperfetto, connettivi avanzati (inclusi quelli che richiedono il congiuntivo: sebbene, nonostante) e una chiara struttura argomentativa',
          'Produce un brano narrativo letterario usando passato remoto e imperfetto con almeno un espediente letterario',
          'Riporta un dialogo o una notizia usando il discorso indiretto con spostamenti temporali completi e verbi di attribuzione variati',
          'Legge un testo di 300 parole su un argomento sociale o culturale complesso e risponde correttamente a domande di comprensione inferenziale',
          'Conversa spontaneamente su argomenti astratti dimostrando un dominio evidente del vocabolario B2, del congiuntivo, delle perifrasi verbali italiane e delle strategie discorsive',
        ],
      },
    ],
  },
  C1: {
    level: 'C1',
    title: 'Advanced Italian',
    description:
      'Specialised vocabulary, formal register, regional varieties and rhetoric.',
    default_duration_weeks: 8,
    units: [
      {
        id: 'c1-unit-1',
        level: 'C1',
        unit_number: 1,
        title: 'Sfumature del Congiuntivo',
        default_weeks: [1, 2],
        grammar_points: [
          'congiuntivo-concessivo',
          'congiuntivo-finale',
          'congiuntivo-relativo',
        ],
        vocabulary_set_ids: ['sfumature_it_c1', 'formalità_it_c1'],
        lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
        prerequisite_unit: undefined,
        competency_checklist: [
          "Usa le congiunzioni concessive con il congiuntivo: sebbene, benché, nonostante, malgrado + congiuntivo in tutti e quattro i tempi — comprendendo che anche se i loro equivalenti inglesi (although, even though) usano l'indicativo, l'italiano richiede il congiuntivo",
          'Usa le congiunzioni finali: affinché, perché (al fine di), a patto che, purché, a condizione che + congiuntivo — e le distingue da perché + indicativo (causa/ragione)',
          "Usa il congiuntivo nelle frasi relative restrittive con antecedenti negativi, indefiniti e superlativi: Non c'è nessuno che sappia rispondere, È la persona più intelligente che conosca, Cerco un appartamento che abbia il giardino",
          'Usa il congiuntivo dopo come se in tutti i tempi appropriati: Parla come se fosse italiano, Si è comportato come se non fosse successo niente',
          "Controlla la piena concordanza dei tempi in frasi complesse a più clausole che mescolano indicativo e congiuntivo nell'italiano scritto formale",
        ],
      },
      {
        id: 'c1-unit-2',
        level: 'C1',
        unit_number: 2,
        title: 'Registro Formale e Accademico',
        default_weeks: [1, 2],
        grammar_points: [
          'nominalizzazione',
          'impersonalità',
          'passivo-accademico',
        ],
        vocabulary_set_ids: ['accademico_it_c1', 'ricerca_it_c1'],
        lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
        prerequisite_unit: 'c1-unit-1',
        competency_checklist: [
          "Converte le frasi verbali in sintagmi nominali attraverso la nominalizzazione — una caratteristica fondamentale dello stile accademico italiano: analizzare → l'analisi, sviluppare → lo sviluppo, crescere → la crescita, approfondire → l'approfondimento",
          'Costruisce frasi accademiche impersonali usando: si ritiene che + congiuntivo, si è dimostrato che, è stato osservato che, risulta evidente che, appare necessario, va sottolineato che',
          'Usa la voce passiva con essere, venire e andare per diverse sfumature (stato/processo/obbligo) e in tutti i tempi composti nella prosa accademica: è stato analizzato, viene considerato, va rispettata la norma',
          "Mantiene un registro formale coerente in un testo accademico di 400+ parole: evita il vocabolario colloquiale, l'uso eccessivo di fare, l'indirizzo diretto al lettore e i connettivi informali",
          'Produce un paragrafo accademico strutturato con soggetto nominalizzato, predicato impersonale e connettivi formali tipici della scrittura accademica italiana',
        ],
      },
      {
        id: 'c1-unit-3',
        level: 'C1',
        unit_number: 3,
        title: 'Lessico Specializzato Italiano',
        default_weeks: [1, 2],
        grammar_points: [
          'campi-semantici',
          'derivazione',
          'precisione-lessicale',
        ],
        vocabulary_set_ids: ['professionale_it_c1', 'tecnico_it_c1'],
        lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
        prerequisite_unit: 'c1-unit-2',
        competency_checklist: [
          'Deriva nuove parole sistematicamente usando i suffissi produttivi italiani: -zione/-sione (produzione), -ità/-tà (qualità, libertà), -ezza/-ura (bellezza, scrittura), -oso (prezioso), -bile (realizzabile), -mente — e i prefissi: in-/im-, ri-, sub-, inter-, pre-, post-',
          'Usa le alterazioni italiane: diminutivi (-ino/-etto: libretto, casetta), accrescitivi (-one: librone, donnona), peggiorativi (-accio: ragazzaccio, tempaccio) e vezzeggiativi (-uccio/-uzzo: amoruccio) — un sistema morfologico molto più ricco che in spagnolo o inglese',
          'Identifica le relazioni di campo semantico e le collocazioni: commettere un errore (non *fare), prendere una decisione (non *fare), sostenere una tesi, condurre una ricerca — e distingue le collocazioni formali da quelle informali',
          'Sceglie il sinonimo preciso nella scrittura professionale: indicare vs dire, impiegare vs usare, ottenere vs avere, effettuare vs fare in contesti formali',
          'Spiega i termini specialistici in italiano semplice, dimostrando sia la comprensione che la capacità di mediare tra registri esperti e non esperti',
        ],
      },
      {
        id: 'c1-unit-4',
        level: 'C1',
        unit_number: 4,
        title: 'Ironia, Umorismo e Doppio Senso',
        default_weeks: [1, 2],
        grammar_points: ['ironia-italiana', 'umorismo', 'doppio-senso'],
        vocabulary_set_ids: ['umorismo_it_c1', 'cultura_it_c1'],
        lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
        prerequisite_unit: 'c1-unit-3',
        competency_checklist: [
          "Riconosce l'ironia verbale e il sarcasmo in italiano prestando attenzione all'intonazione, al contesto e all'incongruenza lessicale: Che bella giornata! (detto durante un temporale); Sei proprio in gamba! (detto sarcasticamente)",
          "Comprende i giochi di parole, i doppi sensi e l'umorismo culturalmente specifico incontrato nella TV, nella pubblicità e nel parlato quotidiano italiano — inclusi i riferimenti alla commedia dell'arte, agli stereotipi del Bel Paese e alla cultura regionale",
          "Interpreta l'umorismo basato sui fenomeni culturali italiani: il campanilismo, la mamma italiana, la burocrazia, la passione per il calcio — senza bisogno di spiegazioni esterne",
          'Produce un breve testo satirico o ironico su un argomento sociale usando espedienti appropriati: sottinteso, litote, iperbole — calibrando il registro per evitare offese involontarie',
          "Distingue le condizioni pragmatiche in cui l'ironia e il sarcasmo funzionano (conoscenza condivisa tra gli interlocutori) dalle affermazioni letterali",
        ],
      },
      {
        id: 'c1-unit-5',
        level: 'C1',
        unit_number: 5,
        title: 'Discorso Persuasivo e Retorica',
        default_weeks: [1, 2],
        grammar_points: [
          'figure-retoriche',
          'persuasione',
          'tecniche-oratorie',
        ],
        vocabulary_set_ids: ['oratoria_it_c1', 'presentazioni_it_c1'],
        lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
        prerequisite_unit: 'c1-unit-4',
        competency_checklist: [
          'Usa anafora, epifora, chiasmo e altre figure retoriche per aumentare la forza persuasiva di un discorso o saggio in italiano',
          "Usa i modelli concessivi per un'argomentazione sofisticata: pur ammettendo che + congiuntivo, anche se + congiuntivo, per quanto + congiuntivo: Per quanto si sforzi, non riesce a convincermi",
          'Apre e chiude i discorsi formali italiani con convenzioni appropriate: Signore e signori..., gentile pubblico...; In conclusione..., In definitiva..., Per riassumere..., Vorrei chiudere con...',
          'Integra dati, citazioni e opinioni di esperti in un argomento scritto con corretta attribuzione: secondo uno studio di..., come afferma X nella sua ricerca del..., stando ai dati forniti da...',
          'Pronuncia un argomento orale di 3 minuti su una questione sociale o etica complessa con struttura coerente, espedienti retorici e minima esitazione in italiano',
        ],
      },
      {
        id: 'c1-unit-6',
        level: 'C1',
        unit_number: 6,
        title: "Varietà dell'Italiano",
        default_weeks: [1, 2],
        grammar_points: ['italiano-regionale', 'dialetti', 'italiano-standard'],
        vocabulary_set_ids: ['varietà_it_c1', 'dialetti_it_c1'],
        lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
        prerequisite_unit: 'c1-unit-5',
        competency_checklist: [
          "Identifica le principali caratteristiche fonologiche delle principali varietà regionali italiane: la gorgia toscana (fricativizzazione delle occlusive intervocaliche), l'abbassamento vocalico romanesco, la desonorizzazione dell'italiano settentrionale e l'allungamento consonantico dell'italiano meridionale",
          "Comprende le differenze lessicali chiave tra italiano settentrionale e meridionale: parole dialettali integrate nelle varietà regionali (bagagli/roba, formaggio/cacio) e l'uso di diminutivi e alterazioni che variano per regione",
          "Riconosce che l'italiano ha un gran numero di dialetti attivi (dialetti) — napoletano, siciliano, veneto, romanesco, milanese — che sono sistemi linguistici distinti, non semplicemente italiano scorretto, e comprende il loro statuto sociolinguistico",
          "Distingue l'italiano standard (italiano standard, usato nei media formali, nell'istruzione e nella letteratura) dall'italiano parlato informale, dall'italiano regionale e dal dialetto su un continuum sociolinguistico",
          "Discute il ruolo storico del toscano letterario (Dante, Petrarca, Boccaccio) e dell'unificazione manzoniana nella creazione dell'italiano standard moderno",
        ],
      },
      {
        id: 'c1-unit-7',
        level: 'C1',
        unit_number: 7,
        title: 'Analisi Critica e Sintesi',
        default_weeks: [1, 2],
        grammar_points: [
          'sintesi-testuale',
          'critica-costruttiva',
          'riformulazione',
        ],
        vocabulary_set_ids: ['analisi_it_c1', 'sintesi_it_c1'],
        lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
        prerequisite_unit: 'c1-unit-6',
        competency_checklist: [
          "Sintetizza informazioni da due o tre fonti in un riassunto coerente e attribuito: Secondo X..., D'altra parte, Y sostiene che..., È necessario però considerare che...",
          "Valuta la coerenza interna, l'affidabilità e i potenziali pregiudizi di un argomento in un testo italiano, usando un vocabolario critico: presuppone che, si basa sull'ipotesi che, manca di evidenze concrete, è privo di fondamento",
          "Riformula un'idea complessa con parole diverse (riformulazione) senza perdere precisione, usando espressioni di riformulazione italiane: vale a dire, ovvero, in altri termini, con ciò si intende che",
          "Scrive un'analisi critica strutturata (300–400 parole) con una tesi chiaramente segnalata, prove a supporto, contro-prove e una conclusione di sintesi",
          "Distingue tra riassumere (riferire ciò che l'autore dice) e valutare criticamente (valutare la qualità, la logica e le prove dell'argomento)",
        ],
      },
      {
        id: 'c1-unit-8',
        level: 'C1',
        unit_number: 8,
        title: 'C1 Consolidamento',
        default_weeks: [1, 1],
        grammar_points: [
          'congiuntivo-concessivo',
          'congiuntivo-finale',
          'congiuntivo-relativo',
          'nominalizzazione',
          'figure-retoriche',
          'italiano-regionale',
          'sintesi-testuale',
        ],
        vocabulary_set_ids: ['ripasso_it_c1'],
        lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
        prerequisite_unit: 'c1-unit-7',
        competency_checklist: [
          'Produce un testo formale di 400 parole integrando tutte le strutture grammaticali C1 — congiuntivo in tutti i suoi contesti, nominalizzazione, varianti passive — con controllo evidente e fluidità naturale',
          'Esprime idee complesse e sfumate spontaneamente senza cercare visibilmente strutture o vocabolario',
          'Dimostra il pieno controllo del congiuntivo in tutti i suoi contesti C1: concessivo, finale, relativo e costruzioni con come se — sia nella produzione orale che scritta',
          'Legge e valuta criticamente un testo di 400 parole su un argomento astratto o specialistico, identificando la struttura argomentativa, le strategie retoriche e le assunzioni implicite',
          "Rende a un livello coerente con il CILS C1 o PLIDA C1 in un compito d'esame simulato che copre tutte e quattro le abilità",
        ],
      },
    ],
  },
  C2: {
    level: 'C2',
    title: 'Proficient Italian',
    description: 'Mastery, literary style, translation and cultural depth.',
    default_duration_weeks: 6,
    units: [
      {
        id: 'c2-unit-1',
        level: 'C2',
        unit_number: 1,
        title: 'Padronanza della Grammatica Avanzata',
        default_weeks: [1, 2],
        grammar_points: [
          'ripasso-congiuntivo',
          'ripasso-condizionale',
          'concordanza-di-genere',
        ],
        vocabulary_set_ids: ['eccellenza_it_c2'],
        lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
        prerequisite_unit: undefined,
        competency_checklist: [
          'Controlla tutti i tempi del congiuntivo e la loro sequenza senza errori sistematici: presente, imperfetto, passato e trapassato congiuntivo — sia negli usi innescati che in quelli autonomi (indipendenti) del congiuntivo come Che sia vero? Magari fosse così!',
          'Forma e interpreta strutture condizionali miste che combinano diversi quadri temporali: Se avessi studiato di più, oggi saprei rispondere — comprendendo che questo è distinto dal condizionale standard di tipo 3',
          "Applica correttamente la concordanza di genere e numero per le sfide specifiche dell'italiano: aggettivi con nomi invariabili, nomi composti (i capostazione), nomi con plurali irregolari (il braccio → le braccia, il paio → le paia) e nomi che cambiano genere al plurale (l'uovo → le uova)",
          "Identifica e corregge gli errori sottili degli apprendenti avanzati: congiuntivo scorretto dopo che quando è richiesto l'indicativo (non so se ha capito — non *abbia), uso errato del passato remoto vs passato prossimo per il contesto settentrionale/meridionale dell'apprendente",
          "Dimostra un'estensione grammaticale paragonabile a quella di un parlante nativo italiano istruito nei registri scritti sia formali che semi-formali",
        ],
      },
      {
        id: 'c2-unit-2',
        level: 'C2',
        unit_number: 2,
        title: 'Stilistica e Registro Letterario',
        default_weeks: [1, 2],
        grammar_points: [
          'stile-letterario',
          'voce-narrativa',
          'figure-stilistiche',
        ],
        vocabulary_set_ids: ['letteratura_it_c2', 'stile_it_c2'],
        lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
        prerequisite_unit: 'c2-unit-1',
        competency_checklist: [
          'Controlla il punto di vista narrativo — prima persona (narratore come personaggio), terza persona onnisciente, terza persona limitata — nella scrittura creativa originale in italiano, facendo scelte coerenti e deliberate',
          'Usa asindeto e polisindeto per un effetto ritmico e stilistico deliberato: accumulazione rapida (asindeto) vs rallentamento enfatico (polisindeto) nella prosa italiana',
          'Dispiega anafora, epifora, chiasmo, climax, anticlimax e altre figure retoriche come strumenti stilistici consapevoli in saggi, discorsi e prosa letteraria',
          'Legge un brano letterario dal canone italiano (Dante, Boccaccio, Manzoni, Calvino, Pasolini, Morante, Tabucchi) e analizza stile, sintassi, tecnica narrativa e registro',
          'Scrive un brano letterario o un saggio letterario di 300 parole in italiano dimostrando un controllo consapevole del registro stilistico, della voce narrativa e degli espedienti letterari appropriati al genere scelto',
        ],
      },
      {
        id: 'c2-unit-3',
        level: 'C2',
        unit_number: 3,
        title: 'Traduzione e Mediazione Linguistica',
        default_weeks: [1, 2],
        grammar_points: ['equivalenza', 'sfumature-traduzione', 'falsi-amici'],
        vocabulary_set_ids: ['traduzione_it_c2', 'mediazione_it_c2'],
        lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
        prerequisite_unit: 'c2-unit-2',
        competency_checklist: [
          'Identifica ed evita i falsi amici italiano-inglese che ingannano gli apprendenti avanzati: sensibile (sensitive, non sensible), romanzo (novel, non romance), manifesto (poster/programma, non manifest), eventuale (possible, non eventual), attuale (current, non actual), firma (signature, non firm)',
          'Media tra due interlocutori con diversi background linguistici — parafrasando, riassumendo e chiarendo senza distorcere il significato o spostare involontariamente il registro',
          "Produce una parafrasi italiana fluida di un testo complesso in un italiano più semplice, mantenendo il registro e l'intenzione comunicativa dell'originale",
          'Spiega le dimensioni culturali e pragmatiche delle espressioni italiane che resistono alla traduzione diretta: fare bella figura / fare brutta figura, campanilismo, dolce vita, sprezzatura, la mamma, il vizio',
          "Traduce un paragrafo italiano complesso nella L1 dell'apprendente e viceversa, risolvendo le espressioni idiomatiche attraverso equivalenti funzionali e spiegando le implicazioni culturali nella lingua di arrivo",
        ],
      },
      {
        id: 'c2-unit-4',
        level: 'C2',
        unit_number: 4,
        title: 'Cultura e Storia della Lingua Italiana',
        default_weeks: [1, 2],
        grammar_points: [
          'evoluzione-linguistica',
          'latinismi',
          'prestiti-linguistici',
        ],
        vocabulary_set_ids: ['storia_it_c2', 'cultura_it_c2'],
        lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
        prerequisite_unit: 'c2-unit-3',
        competency_checklist: [
          "Traccia le tappe principali dello sviluppo storico dell'italiano dal volgare al fiorentino del Trecento al toscano letterario fino all'italiano standard contemporaneo — comprendendo che l'italiano standard è basato sul fiorentino del Trecento elevato a lingua letteraria da Dante, Petrarca e Boccaccio",
          'Riconosce i latinismi e i grecismi nel vocabolario intellettuale italiano: parole che non hanno seguito il normale sviluppo fonetico: occhio (popolare) vs oculare (latinismo), orecchio vs auricolare, esempio vs esemplare',
          "Identifica i prestiti linguistici dalle lingue europee: francese (garage, menù), spagnolo (guerriglia, flamenco), inglese (computer, weekend) — e discute i dibattiti attuali sull'anglicizzazione dell'italiano contemporaneo",
          "Legge un testo medievale o rinascimentale (un frammento della Divina Commedia o del Decameron) in italiano moderno annotato e identifica le differenze grammaticali e lessicali rispetto all'italiano contemporaneo",
          "Discute il ruolo dell'Accademia della Crusca e i dibattiti contemporanei su prescrittivismo vs descrittivismo, italiano standard vs neostandard e l'influenza dei dialetti sull'italiano contemporaneo",
        ],
      },
      {
        id: 'c2-unit-5',
        level: 'C2',
        unit_number: 5,
        title: 'Creazione di Contenuti Avanzati',
        default_weeks: [1, 2],
        grammar_points: [
          'generi-testuali',
          'creatività-linguistica',
          'editing',
        ],
        vocabulary_set_ids: ['creazione_it_c2', 'pubblicazione_it_c2'],
        lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
        prerequisite_unit: 'c2-unit-4',
        competency_checklist: [
          'Produce un testo di 500 parole in diversi generi testuali — articolo di opinione, saggio personale, racconto breve, relazione formale — adattando vocabolario, tono e struttura alle convenzioni di ciascun genere',
          'Revisiona una bozza al livello di un editor esperto: ristruttura per chiarezza, elimina le ridondanze, eleva il registro e corregge i difetti grammaticali e stilistici sottili',
          "Impiega la consapevolezza metalinguistica per spiegare e giustificare le scelte stilistiche nella propria scrittura, dimostrando un'autoriflessione critica sull'artigianato della scrittura in italiano",
          "Crea testi concisi e d'impatto per il discorso pubblico (l'apertura di un discorso politico, uno slogan di marketing, un testo per una campagna sui social media) usando economia linguistica e precisione retorica",
          'Dimostra creatività linguistica attraverso giochi di parole, neologismi, mescolanza deliberata di registri e metafore originali, mantenendo la chiarezza comunicativa',
        ],
      },
      {
        id: 'c2-unit-6',
        level: 'C2',
        unit_number: 6,
        title: 'C2 Consolidamento e Maestria',
        default_weeks: [1, 1],
        grammar_points: [
          'espressione-sfumata',
          'integrazione-grammaticale',
          'fluidità-nativa',
        ],
        vocabulary_set_ids: ['maestria_it_c2'],
        lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
        prerequisite_unit: 'c2-unit-5',
        competency_checklist: [
          'Esprime sottili sfumature di significato — dubbio, ironia, provvisorietà, enfasi — attraverso la selezione precisa della struttura grammaticale e del vocabolario piuttosto che con attenuatori espliciti',
          'Ricostruisce un argomento complesso da una prospettiva ideologica o culturale diversa, dimostrando un controllo flessibile del punto di vista e del registro',
          "Dimostra un'accuratezza grammaticale quasi nativa nella scrittura e nel parlato spontanei estesi, con solo occasionali errori non sistematici che non impediscono la comunicazione",
          'Differenzia sottili sfumature di significato tra parole quasi sinonime e varianti di registro: scopo/obiettivo/fine/meta, sebbene/nonostante/tuttavia, indicare/segnalare/rilevare/sottolineare',
          'Raggiunge un punteggio coerente con il CILS C2 / Certificato di Maestria in compiti di lettura, scrittura, ascolto e interazione orale',
        ],
      },
    ],
  },
}

export function getCurriculumUnits(level: CEFRLevel): CurriculumUnit[] {
  return curriculum[level].units
}

export function distributeLessonsAcrossWeeks(
  level: CEFRLevel,
  durationWeeks: number,
  daysPerWeek: number
): Array<{
  week: number
  day: number
  unit_id: string
  lesson_type: LessonType
  title: string
}> {
  const units = getCurriculumUnits(level)
  const slots: Array<{
    week: number
    day: number
    unit_id: string
    lesson_type: LessonType
    title: string
  }> = []

  const totalDays = durationWeeks * daysPerWeek
  // Last day is reserved for the level completion test
  const lessonDays = totalDays - 1

  // Expand all unit lessons in order
  const allLessons = units.flatMap((unit) =>
    unit.lesson_types.map((lt) => ({
      unit_id: unit.id,
      lesson_type: lt,
      unit_title: unit.title,
    }))
  )

  // Distribute evenly; repeat review lessons if there is spare capacity
  const base = allLessons.slice(0, lessonDays)

  let dayCounter = 0
  for (const lesson of base) {
    const weekNum = Math.floor(dayCounter / daysPerWeek) + 1
    const dayNum = (dayCounter % daysPerWeek) + 1
    slots.push({
      week: weekNum,
      day: dayNum,
      unit_id: lesson.unit_id,
      lesson_type: lesson.lesson_type,
      title: `${lesson.unit_title} — ${lesson.lesson_type.charAt(0).toUpperCase() + lesson.lesson_type.slice(1)}`,
    })
    dayCounter++
  }

  // Final slot: level completion test
  const testWeek = durationWeeks
  const testDay = daysPerWeek + 1
  slots.push({
    week: testWeek,
    day: testDay,
    unit_id: `${level.toLowerCase()}-test`,
    lesson_type: 'review',
    title: `${level} Level Completion Test`,
  })

  return slots
}
