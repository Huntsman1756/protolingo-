import type { CEFRLevel } from '@/data/grammar'

export type Skill = 'grammar' | 'vocabulary' | 'reading'

export interface AssessmentQuestion {
  id: string
  skill: Skill
  difficulty: CEFRLevel
  question: string
  options: string[]
  correct: string
  grammar_slug?: string
}

// ─── Assessment bank ──────────────────────────────────────────────────────────

export const assessmentBank: AssessmentQuestion[] = [
  // ─── A1 Grammar ──────────────────────────────────────────────────────────
  {
    id: 'g-a1-001',
    skill: 'grammar',
    difficulty: 'A1',
    question: 'Completa: Io ___ italiano.',
    options: ['sono', 'è', 'siamo', 'sei'],
    correct: 'sono',
    grammar_slug: 'essere',
  },
  {
    id: 'g-a1-002',
    skill: 'grammar',
    difficulty: 'A1',
    question: 'Completa: Maria ___ una studentessa.',
    options: ['è', 'sono', 'siamo', 'sono'],
    correct: 'è',
    grammar_slug: 'essere',
  },
  {
    id: 'g-a1-003',
    skill: 'grammar',
    difficulty: 'A1',
    question: 'Completa: Io ___ venti anni.',
    options: ['ho', 'ha', 'hanno', 'siamo'],
    correct: 'ho',
    grammar_slug: 'avere',
  },
  {
    id: 'g-a1-004',
    skill: 'grammar',
    difficulty: 'A1',
    question: 'Completa: Loro ___ due gatti.',
    options: ['hanno', 'ha', 'ho', 'avete'],
    correct: 'hanno',
    grammar_slug: 'avere',
  },
  {
    id: 'g-a1-005',
    skill: 'grammar',
    difficulty: 'A1',
    question: 'Quale articolo è corretto? ___ libro.',
    options: ['Il', 'La', 'Le', 'I'],
    correct: 'Il',
    grammar_slug: 'articoli-determinativi',
  },
  {
    id: 'g-a1-006',
    skill: 'grammar',
    difficulty: 'A1',
    question: 'Quale articolo è corretto? ___ studente.',
    options: ['Lo', 'Il', 'La', 'Le'],
    correct: 'Lo',
    grammar_slug: 'articoli-determinativi',
  },
  {
    id: 'g-a1-007',
    skill: 'grammar',
    difficulty: 'A1',
    question: 'Completa: ___ chiamo Marco.',
    options: ['Mi', 'Ti', 'Si', 'Ci'],
    correct: 'Mi',
    grammar_slug: 'presente-are',
  },
  {
    id: 'g-a1-008',
    skill: 'grammar',
    difficulty: 'A1',
    question: 'Completa: Noi ___ in Italia.',
    options: ['viviamo', 'vivo', 'vive', 'vivete'],
    correct: 'viviamo',
    grammar_slug: 'presente-ire',
  },
  {
    id: 'g-a1-009',
    skill: 'grammar',
    difficulty: 'A1',
    question: 'Completa: ___ una mela.',
    options: ['Mangio', 'Mangi', 'Mangia', 'Mangiamo'],
    correct: 'Mangio',
    grammar_slug: 'presente-are',
  },
  {
    id: 'g-a1-010',
    skill: 'grammar',
    difficulty: 'A1',
    question: 'Quale frase è corretta?',
    options: [
      "C'è un libro sul tavolo.",
      'Cè un libro sul tavolo.',
      'Ci è un libro sul tavolo.',
      'Ce un libro sul tavolo.',
    ],
    correct: "C'è un libro sul tavolo.",
    grammar_slug: 'ce-ci-sono',
  },

  // ─── A1 Vocabulary ────────────────────────────────────────────────────────
  {
    id: 'v-a1-001',
    skill: 'vocabulary',
    difficulty: 'A1',
    question: 'Qual è il contrario di "grande"?',
    options: ['Piccolo', 'Alto', 'Lungo', 'Basso'],
    correct: 'Piccolo',
  },
  {
    id: 'v-a1-002',
    skill: 'vocabulary',
    difficulty: 'A1',
    question: 'Come si dice "thank you" in italiano?',
    options: ['Grazie', 'Prego', 'Scusa', 'Ciao'],
    correct: 'Grazie',
  },
  {
    id: 'v-a1-003',
    skill: 'vocabulary',
    difficulty: 'A1',
    question: 'Quale parola indica un colore?',
    options: ['Rosso', 'Tavolo', 'Correre', 'Felice'],
    correct: 'Rosso',
  },
  {
    id: 'v-a1-004',
    skill: 'vocabulary',
    difficulty: 'A1',
    question: '"Madre" significa:',
    options: ['Mamma', 'Papà', 'Fratello', 'Sorella'],
    correct: 'Mamma',
  },
  {
    id: 'v-a1-005',
    skill: 'vocabulary',
    difficulty: 'A1',
    question: 'Quale parola è un saluto?',
    options: ['Buongiorno', 'Tavolo', 'Libro', 'Acqua'],
    correct: 'Buongiorno',
  },
  {
    id: 'v-a1-006',
    skill: 'vocabulary',
    difficulty: 'A1',
    question: '"Acqua" in italiano è:',
    options: [
      'Un liquido trasparente',
      'Un cibo solido',
      'Un animale',
      'Un colore',
    ],
    correct: 'Un liquido trasparente',
  },
  {
    id: 'v-a1-007',
    skill: 'vocabulary',
    difficulty: 'A1',
    question: 'Quale parola indica un animale?',
    options: ['Cane', 'Sedia', 'Finestra', 'Scuola'],
    correct: 'Cane',
  },
  {
    id: 'v-a1-008',
    skill: 'vocabulary',
    difficulty: 'A1',
    question: 'Come si dice "goodbye" in italiano?',
    options: ['Arrivederci', 'Buongiorno', 'Grazie', 'Prego'],
    correct: 'Arrivederci',
  },
  {
    id: 'v-a1-009',
    skill: 'vocabulary',
    difficulty: 'A1',
    question: 'Quale di questi è un numero?',
    options: ['Cinque', 'Giallo', 'Mela', 'Casa'],
    correct: 'Cinque',
  },
  {
    id: 'v-a1-010',
    skill: 'vocabulary',
    difficulty: 'A1',
    question: 'Quale parola significa "amico" al femminile?',
    options: ['Amica', 'Amico', 'Amici', 'Amiche'],
    correct: 'Amica',
  },

  // ─── A1 Reading ───────────────────────────────────────────────────────────
  {
    id: 'r-a1-001',
    skill: 'reading',
    difficulty: 'A1',
    question:
      'Leggi: "Mi chiamo Sofia. Ho 22 anni. Sono italiana. Vivo a Roma." — Quanti anni ha Sofia?',
    options: ['22', '25', '30', '20'],
    correct: '22',
  },
  {
    id: 'r-a1-002',
    skill: 'reading',
    difficulty: 'A1',
    question:
      'Leggi: "Oggi fa caldo. C\'è il sole e non ci sono nuvole. La temperatura è di 28 gradi." — Che tempo fa?',
    options: ["C'è il sole", 'Piove', 'Nevica', "C'è vento"],
    correct: "C'è il sole",
  },
  {
    id: 'r-a1-003',
    skill: 'reading',
    difficulty: 'A1',
    question:
      'Leggi: "Marco va al supermercato. Compra pane, latte e due mele." — Cosa NON compra Marco?',
    options: ['Pesce', 'Pane', 'Latte', 'Mele'],
    correct: 'Pesce',
  },

  // ─── A2 Grammar ──────────────────────────────────────────────────────────
  {
    id: 'g-a2-001',
    skill: 'grammar',
    difficulty: 'A2',
    question: 'Completa: Ieri io ___ al cinema.',
    options: ['sono andato', 'ho andato', 'andavo', 'andrò'],
    correct: 'sono andato',
    grammar_slug: 'passato-prossimo-essere',
  },
  {
    id: 'g-a2-002',
    skill: 'grammar',
    difficulty: 'A2',
    question: 'Completa: Lei ___ la lettera.',
    options: ['ha scritto', 'è scritta', 'ha scrivere', 'è scrivere'],
    correct: 'ha scritto',
    grammar_slug: 'passato-prossimo-avere',
  },
  {
    id: 'g-a2-003',
    skill: 'grammar',
    difficulty: 'A2',
    question: 'Completa: Da bambino, ___ sempre al parco.',
    options: ['giocavo', 'ho giocato', 'giocherò', 'gioco'],
    correct: 'giocavo',
    grammar_slug: 'imperfetto',
  },
  {
    id: 'g-a2-004',
    skill: 'grammar',
    difficulty: 'A2',
    question: 'Completa: Mentre ___, ha squillato il telefono.',
    options: ['dormivo', 'ho dormito', 'dormirò', 'dormo'],
    correct: 'dormivo',
    grammar_slug: 'passato-prossimo-vs-imperfetto',
  },
  {
    id: 'g-a2-005',
    skill: 'grammar',
    difficulty: 'A2',
    question: 'Completa con il pronome: ___ vedo domani.',
    options: ['Ti', 'Tu', 'Te', 'A te'],
    correct: 'Ti',
    grammar_slug: 'pronomi-diretti',
  },
  {
    id: 'g-a2-006',
    skill: 'grammar',
    difficulty: 'A2',
    question: 'Completa: ___ ho dato il regalo.',
    options: ['Gli', 'Lo', 'La', 'Il'],
    correct: 'Gli',
    grammar_slug: 'pronomi-indiretti',
  },
  {
    id: 'g-a2-007',
    skill: 'grammar',
    difficulty: 'A2',
    question: 'Quale frase è corretta?',
    options: [
      'Roma è più grande di Milano.',
      'Roma è più grande che Milano.',
      'Roma è più grande da Milano.',
      'Roma è grande più di Milano.',
    ],
    correct: 'Roma è più grande di Milano.',
    grammar_slug: 'comparativi',
  },
  {
    id: 'g-a2-008',
    skill: 'grammar',
    difficulty: 'A2',
    question: 'Completa: ___ un caffè, per favore.',
    options: ['Vorrei', 'Voglio', 'Vorresti', 'Vorrebbero'],
    correct: 'Vorrei',
    grammar_slug: 'vorrei',
  },
  {
    id: 'g-a2-009',
    skill: 'grammar',
    difficulty: 'A2',
    question: "Completa l'imperativo: ___ la finestra!",
    options: ['Apri', 'Aprite', 'Aprire', 'Aperto'],
    correct: 'Apri',
    grammar_slug: 'imperativo-affermativo',
  },
  {
    id: 'g-a2-010',
    skill: 'grammar',
    difficulty: 'A2',
    question: 'Completa: Se ___, verrei volentieri.',
    options: ['potessi', 'posso', 'potevo', 'potrei'],
    correct: 'potessi',
    grammar_slug: 'condizionale-presente',
  },

  // ─── A2 Vocabulary ────────────────────────────────────────────────────────
  {
    id: 'v-a2-001',
    skill: 'vocabulary',
    difficulty: 'A2',
    question: 'Cosa significa "prenotare"?',
    options: ['Riservare in anticipo', 'Pagare', 'Cancellare', 'Viaggiare'],
    correct: 'Riservare in anticipo',
  },
  {
    id: 'v-a2-002',
    skill: 'vocabulary',
    difficulty: 'A2',
    question: 'Quale parola significa "infanzia"?',
    options: ['Childhood', 'Adolescenza', 'Vecchiaia', 'Maturità'],
    correct: 'Childhood',
  },
  {
    id: 'v-a2-003',
    skill: 'vocabulary',
    difficulty: 'A2',
    question: 'Completa: Ho ___ la valigia per le vacanze.',
    options: ['preparato', 'comprato', 'mangiato', 'bevuto'],
    correct: 'preparato',
  },
  {
    id: 'v-a2-004',
    skill: 'vocabulary',
    difficulty: 'A2',
    question: 'Qual è il sinonimo di "contento"?',
    options: ['Felice', 'Triste', 'Arrabbiato', 'Stanco'],
    correct: 'Felice',
  },
  {
    id: 'v-a2-005',
    skill: 'vocabulary',
    difficulty: 'A2',
    question: 'Cosa significa "sconto"?',
    options: [
      'Riduzione del prezzo',
      'Aumento del prezzo',
      'Tassa',
      'Pagamento',
    ],
    correct: 'Riduzione del prezzo',
  },
  {
    id: 'v-a2-006',
    skill: 'vocabulary',
    difficulty: 'A2',
    question: 'Quale di queste parole indica un mezzo di trasporto?',
    options: ['Treno', 'Casa', 'Libro', 'Cena'],
    correct: 'Treno',
  },
  {
    id: 'v-a2-007',
    skill: 'vocabulary',
    difficulty: 'A2',
    question: 'Completa: Mi piace ___ in bicicletta.',
    options: ['andare', 'fare', 'prendere', 'avere'],
    correct: 'andare',
  },
  {
    id: 'v-a2-008',
    skill: 'vocabulary',
    difficulty: 'A2',
    question: 'Cosa significa "sorpresa"?',
    options: [
      'Qualcosa di inaspettato',
      'Qualcosa di programmato',
      'Un problema',
      'Una soluzione',
    ],
    correct: 'Qualcosa di inaspettato',
  },
  {
    id: 'v-a2-009',
    skill: 'vocabulary',
    difficulty: 'A2',
    question: 'Quale parola è legata al "compleanno"?',
    options: ['Torta', 'Cappello', 'Giornale', 'Borsa'],
    correct: 'Torta',
  },
  {
    id: 'v-a2-010',
    skill: 'vocabulary',
    difficulty: 'A2',
    question: 'Completa: Domani ___ un colloquio di lavoro.',
    options: ['ho', 'faccio', 'prendo', 'porto'],
    correct: 'ho',
  },

  // ─── A2 Reading ───────────────────────────────────────────────────────────
  {
    id: 'r-a2-001',
    skill: 'reading',
    difficulty: 'A2',
    question:
      'Leggi: "Ieri sera sono andato al ristorante con i miei amici. Abbiamo mangiato pizza e bevuto vino rosso. Il conto era di 60 euro e abbiamo diviso." — Cosa hanno bevuto?',
    options: ['Vino rosso', 'Acqua', 'Birra', 'Caffè'],
    correct: 'Vino rosso',
  },
  {
    id: 'r-a2-002',
    skill: 'reading',
    difficulty: 'A2',
    question:
      'Leggi: "Prendo il treno delle 8:30 per Milano. Devo cambiare a Bologna e arrivo alle 11:15." — A che ora parte il treno?',
    options: ['8:30', '11:15', '9:00', '7:00'],
    correct: '8:30',
  },
  {
    id: 'r-a2-003',
    skill: 'reading',
    difficulty: 'A2',
    question:
      'Leggi: "Da bambino abitavo in un piccolo paese. Giocavo sempre con i miei cugini nel giardino della nonna." — Dove giocava?',
    options: [
      'Nel giardino della nonna',
      'Al parco',
      'A scuola',
      'In spiaggia',
    ],
    correct: 'Nel giardino della nonna',
  },

  // ─── B1 Grammar ──────────────────────────────────────────────────────────
  {
    id: 'g-b1-001',
    skill: 'grammar',
    difficulty: 'B1',
    question: 'Completa: Penso che tu ___ ragione.',
    options: ['abbia', 'hai', 'avrai', 'avevi'],
    correct: 'abbia',
    grammar_slug: 'congiuntivo-presente',
  },
  {
    id: 'g-b1-002',
    skill: 'grammar',
    difficulty: 'B1',
    question: 'Completa: È importante che voi ___ in orario.',
    options: ['arriviate', 'arrivate', 'arriverete', 'arrivavate'],
    correct: 'arriviate',
    grammar_slug: 'congiuntivo-presente',
  },
  {
    id: 'g-b1-003',
    skill: 'grammar',
    difficulty: 'B1',
    question: 'Completa: Spero che Maria ___ presto.',
    options: ['guarisca', 'guarisce', 'guarirà', 'guariva'],
    correct: 'guarisca',
    grammar_slug: 'congiuntivo-volonta',
  },
  {
    id: 'g-b1-004',
    skill: 'grammar',
    difficulty: 'B1',
    question: 'Completa: Quando ___ arrivato, ero già partito.',
    options: ['sei', 'hai', 'avrai', 'eri'],
    correct: 'sei',
    grammar_slug: 'trapassato-prossimo-b1',
  },
  {
    id: 'g-b1-005',
    skill: 'grammar',
    difficulty: 'B1',
    question: 'Trasforma in passivo: "Il cuoco prepara la pizza."',
    options: [
      'La pizza è preparata dal cuoco.',
      'La pizza prepara dal cuoco.',
      'La pizza ha preparato dal cuoco.',
      'La pizza viene prepara dal cuoco.',
    ],
    correct: 'La pizza è preparata dal cuoco.',
    grammar_slug: 'forma-passiva',
  },
  {
    id: 'g-b1-006',
    skill: 'grammar',
    difficulty: 'B1',
    question: 'Completa: In Italia ___ mangia bene.',
    options: ['si', 'ci', 'vi', 'lo'],
    correct: 'si',
    grammar_slug: 'si-impersonale',
  },
  {
    id: 'g-b1-007',
    skill: 'grammar',
    difficulty: 'B1',
    question: 'Quale frase è corretta?',
    options: [
      'La persona di cui ti ho parlato è qui.',
      'La persona che ti ho parlato è qui.',
      'La persona chi ti ho parlato è qui.',
      'La persona cui di ti ho parlato è qui.',
    ],
    correct: 'La persona di cui ti ho parlato è qui.',
    grammar_slug: 'cui',
  },
  {
    id: 'g-b1-008',
    skill: 'grammar',
    difficulty: 'B1',
    question: 'Completa: Se domani ___ bel tempo, andrò al mare.',
    options: ['farà', 'fa', 'farebbe', 'facesse'],
    correct: 'farà',
    grammar_slug: 'periodo-ipotetico-1',
  },
  {
    id: 'g-b1-009',
    skill: 'grammar',
    difficulty: 'B1',
    question: 'Completa: Se ___ ricco, viaggerei in tutto il mondo.',
    options: ['fossi', 'ero', 'sarei', 'sia'],
    correct: 'fossi',
    grammar_slug: 'periodo-ipotetico-2',
  },
  {
    id: 'g-b1-010',
    skill: 'grammar',
    difficulty: 'B1',
    question: 'Trasforma in discorso indiretto: "Marco dice: \'Sono stanco.\'"',
    options: [
      'Marco ha detto che era stanco.',
      'Marco ha detto che è stanco.',
      'Marco ha detto che sarà stanco.',
      'Marco ha detto che fosse stanco.',
    ],
    correct: 'Marco ha detto che era stanco.',
    grammar_slug: 'discorso-indiretto-passato',
  },

  // ─── B1 Vocabulary ────────────────────────────────────────────────────────
  {
    id: 'v-b1-001',
    skill: 'vocabulary',
    difficulty: 'B1',
    question: 'Cosa significa "delusione"?',
    options: [
      "Amarezza per un'aspettativa non realizzata",
      'Gioia improvvisa',
      'Rabbia intensa',
      'Indifferenza',
    ],
    correct: "Amarezza per un'aspettativa non realizzata",
  },
  {
    id: 'v-b1-002',
    skill: 'vocabulary',
    difficulty: 'B1',
    question: 'Quale verbo significa "supporre"?',
    options: ['Ipotizzare', 'Dimostrare', 'Realizzare', 'Descrivere'],
    correct: 'Ipotizzare',
  },
  {
    id: 'v-b1-003',
    skill: 'vocabulary',
    difficulty: 'B1',
    question: 'Completa: Ha molta ___ nel suo lavoro.',
    options: ['esperienza', 'soldi', 'tempo', 'fame'],
    correct: 'esperienza',
  },
  {
    id: 'v-b1-004',
    skill: 'vocabulary',
    difficulty: 'B1',
    question: 'Cosa significa "cambiamento"?',
    options: [
      'Modifica significativa',
      'Situazione stabile',
      'Problema irrisolto',
      'Risultato positivo',
    ],
    correct: 'Modifica significativa',
  },
  {
    id: 'v-b1-005',
    skill: 'vocabulary',
    difficulty: 'B1',
    question: 'Quale parola è sinonimo di "importante"?',
    options: ['Rilevante', 'Piccolo', 'Strano', 'Lontano'],
    correct: 'Rilevante',
  },
  {
    id: 'v-b1-006',
    skill: 'vocabulary',
    difficulty: 'B1',
    question: 'Completa: Ho bisogno di ___ il modulo.',
    options: ['compilare', 'mangiare', 'correre', 'dormire'],
    correct: 'compilare',
  },
  {
    id: 'v-b1-007',
    skill: 'vocabulary',
    difficulty: 'B1',
    question: 'Cosa significa "sciopero"?',
    options: [
      'Astensione dal lavoro',
      'Festa nazionale',
      'Aumento di stipendio',
      'Contratto di lavoro',
    ],
    correct: 'Astensione dal lavoro',
  },
  {
    id: 'v-b1-008',
    skill: 'vocabulary',
    difficulty: 'B1',
    question: 'Quale aggettivo descrive una persona che non dice la verità?',
    options: ['Disonesto', 'Generoso', 'Paziente', 'Timido'],
    correct: 'Disonesto',
  },
  {
    id: 'v-b1-009',
    skill: 'vocabulary',
    difficulty: 'B1',
    question: 'Completa: Dobbiamo trovare una ___ al problema.',
    options: ['soluzione', 'domanda', 'difficoltà', 'opinione'],
    correct: 'soluzione',
  },
  {
    id: 'v-b1-010',
    skill: 'vocabulary',
    difficulty: 'B1',
    question: 'Cosa significa "conseguenza"?',
    options: [
      "Effetto di un'azione",
      'Causa di un evento',
      'Un imprevisto',
      'Una soluzione',
    ],
    correct: "Effetto di un'azione",
  },

  // ─── B1 Reading ───────────────────────────────────────────────────────────
  {
    id: 'r-b1-001',
    skill: 'reading',
    difficulty: 'B1',
    question:
      "Leggi: \"Il governo ha annunciato una nuova riforma della scuola. Secondo il ministro, l'obiettivo è migliorare la qualità dell'istruzione e ridurre l'abbandono scolastico.\" — Qual è l'obiettivo della riforma?",
    options: [
      "Migliorare la qualità dell'istruzione",
      'Aumentare le tasse',
      'Chiudere le scuole',
      'Assumere più insegnanti',
    ],
    correct: "Migliorare la qualità dell'istruzione",
  },
  {
    id: 'r-b1-002',
    skill: 'reading',
    difficulty: 'B1',
    question:
      'Leggi: "Nonostante avesse studiato molto, Marco non ha superato l\'esame. Era deluso ma ha deciso di riprovare il mese prossimo." — Cosa farà Marco?',
    options: [
      "Riproverà l'esame",
      'Cambierà materia',
      'Abbandonerà gli studi',
      "Andrà all'estero",
    ],
    correct: "Riproverà l'esame",
  },
  {
    id: 'r-b1-003',
    skill: 'reading',
    difficulty: 'B1',
    question:
      'Leggi: "Se avessi saputo del traffico, sarei partito prima. Purtroppo sono arrivato in ritardo alla riunione e il capo era arrabbiato." — Perché è arrivato in ritardo?',
    options: [
      'Per il traffico',
      'Perché ha dormito troppo',
      'Perché si è perso',
      'Perché la riunione era annullata',
    ],
    correct: 'Per il traffico',
  },

  // ─── B2 Grammar ──────────────────────────────────────────────────────────
  {
    id: 'g-b2-001',
    skill: 'grammar',
    difficulty: 'B2',
    question: 'Completa: Vorrei che tu ___ di più.',
    options: ['studiassi', 'studi', 'studieresti', 'studiavi'],
    correct: 'studiassi',
    grammar_slug: 'congiuntivo-imperfetto',
  },
  {
    id: 'g-b2-002',
    skill: 'grammar',
    difficulty: 'B2',
    question: 'Completa: Se ___ i soldi, avrei comprato quella casa.',
    options: ['avessi avuto', 'avevo', 'ho avuto', 'avrei avuto'],
    correct: 'avessi avuto',
    grammar_slug: 'congiuntivo-trapassato',
  },
  {
    id: 'g-b2-003',
    skill: 'grammar',
    difficulty: 'B2',
    question:
      'Completa con la perifrasi corretta: La situazione ___ migliorando.',
    options: ['va', 'sta', 'è', 'viene'],
    correct: 'va',
    grammar_slug: 'andare-gerundio',
  },
  {
    id: 'g-b2-004',
    skill: 'grammar',
    difficulty: 'B2',
    question: 'Completa con il passato remoto: Dante ___ la Divina Commedia.',
    options: ['scrisse', 'ha scritto', 'scriveva', 'scriverà'],
    correct: 'scrisse',
    grammar_slug: 'passato-remoto',
  },

  // ─── B2 Vocabulary ────────────────────────────────────────────────────────
  {
    id: 'v-b2-001',
    skill: 'vocabulary',
    difficulty: 'B2',
    question: 'Cosa significa l\'espressione "essere al verde"?',
    options: [
      'Non avere soldi',
      'Essere in un parco',
      'Essere invidioso',
      'Essere vegetariano',
    ],
    correct: 'Non avere soldi',
  },
  {
    id: 'v-b2-002',
    skill: 'vocabulary',
    difficulty: 'B2',
    question: 'Cosa significa "in bocca al lupo"?',
    options: [
      'Buona fortuna',
      'Stai zitto',
      'Attenzione al cane',
      'Mangia bene',
    ],
    correct: 'Buona fortuna',
  },
  {
    id: 'v-b2-003',
    skill: 'vocabulary',
    difficulty: 'B2',
    question: 'Quale parola significa "cambiamento radicale e rapido"?',
    options: ['Rivoluzione', 'Evoluzione', 'Tradizione', 'Situazione'],
    correct: 'Rivoluzione',
  },
  {
    id: 'v-b2-004',
    skill: 'vocabulary',
    difficulty: 'B2',
    question: 'Completa: La ___ ambientale è fondamentale per il futuro.',
    options: ['sostenibilità', 'velocità', 'quantità', 'povertà'],
    correct: 'sostenibilità',
  },

  // ─── B2 Reading ───────────────────────────────────────────────────────────
  {
    id: 'r-b2-001',
    skill: 'reading',
    difficulty: 'B2',
    question:
      'Leggi: "Sebbene il governo avesse promesso una riduzione delle tasse, l\'ultima manovra finanziaria ha introdotto nuove imposte. I cittadini si sentono traditi." — Qual è il sentimento dei cittadini?',
    options: [
      'Si sentono traditi',
      'Sono soddisfatti',
      'Sono indifferenti',
      'Sono felici',
    ],
    correct: 'Si sentono traditi',
  },
  {
    id: 'r-b2-002',
    skill: 'reading',
    difficulty: 'B2',
    question:
      'Leggi: "La globalizzazione ha portato vantaggi economici innegabili, ma ha anche ampliato il divario tra ricchi e poveri. È necessario un ripensamento del modello attuale." — Qual è la tesi dell\'autore?',
    options: [
      'Bisogna ripensare il modello di globalizzazione.',
      'La globalizzazione è solo negativa.',
      'La globalizzazione va abolita.',
      'La globalizzazione è perfetta.',
    ],
    correct: 'Bisogna ripensare il modello di globalizzazione.',
  },
  {
    id: 'r-b2-003',
    skill: 'reading',
    difficulty: 'B2',
    question:
      'Leggi: "Benché piovesse a dirotto, migliaia di manifestanti sono scesi in piazza per difendere i propri diritti. La protesta si è svolta pacificamente." — Com\'è stata la protesta?',
    options: ['Pacifica', 'Violenta', 'Breve', 'Disorganizzata'],
    correct: 'Pacifica',
  },

  // ─── C1 Grammar ──────────────────────────────────────────────────────────
  {
    id: 'g-c1-001',
    skill: 'grammar',
    difficulty: 'C1',
    question: 'Completa: Benché ___ tardi, uscirò lo stesso.',
    options: ['faccia', 'fa', 'farà', 'faceva'],
    correct: 'faccia',
    grammar_slug: 'congiuntivo-concessivo',
  },
  {
    id: 'g-c1-002',
    skill: 'grammar',
    difficulty: 'C1',
    question:
      "Completa con nominalizzazione: L'___ dei dati ha richiesto settimane.",
    options: ['analisi', 'analizzare', 'analizzando', 'analizzato'],
    correct: 'analisi',
    grammar_slug: 'nominalizzazione',
  },
  {
    id: 'g-c1-003',
    skill: 'grammar',
    difficulty: 'C1',
    question:
      'Completa: Affinché il progetto ___ approvato, servono più firme.',
    options: ['sia', 'è', 'sarà', 'era'],
    correct: 'sia',
    grammar_slug: 'congiuntivo-finale',
  },
  {
    id: 'g-c1-004',
    skill: 'grammar',
    difficulty: 'C1',
    question: 'Quale frase usa correttamente una figura retorica?',
    options: [
      'Ho un mare di cose da fare.',
      'Devo fare molte cose.',
      'Ho tante cose da fare.',
      'Faccio molte cose.',
    ],
    correct: 'Ho un mare di cose da fare.',
    grammar_slug: 'figure-retoriche',
  },

  // ─── C1 Vocabulary ────────────────────────────────────────────────────────
  {
    id: 'v-c1-001',
    skill: 'vocabulary',
    difficulty: 'C1',
    question: 'Cosa significa "lapalissiano"?',
    options: [
      'Talmente ovvio da risultare inutile dirlo',
      'Molto elegante',
      'Estremamente complicato',
      'Poco chiaro',
    ],
    correct: 'Talmente ovvio da risultare inutile dirlo',
  },
  {
    id: 'v-c1-002',
    skill: 'vocabulary',
    difficulty: 'C1',
    question: 'Cosa significa "magniloquente"?',
    options: [
      'Che usa un linguaggio ampolloso e solenne',
      'Che parla poco',
      'Che è molto bello',
      'Che è gentile',
    ],
    correct: 'Che usa un linguaggio ampolloso e solenne',
  },
  {
    id: 'v-c1-003',
    skill: 'vocabulary',
    difficulty: 'C1',
    question:
      'Quale termine indica un "linguaggio specialistico di un gruppo"?',
    options: ['Gergo', 'Dialetto', 'Idioma', 'Lingua'],
    correct: 'Gergo',
  },
  {
    id: 'v-c1-004',
    skill: 'vocabulary',
    difficulty: 'C1',
    question: 'Cosa significa "obsoleto"?',
    options: [
      'Superato, non più in uso',
      'Molto moderno',
      'Molto costoso',
      'Molto raro',
    ],
    correct: 'Superato, non più in uso',
  },

  // ─── C1 Reading ───────────────────────────────────────────────────────────
  {
    id: 'r-c1-001',
    skill: 'reading',
    difficulty: 'C1',
    question:
      'Leggi: "La questione della lingua, che ha animato il dibattito intellettuale italiano per secoli, rappresenta un unicum nel panorama europeo. La soluzione manzoniana, basata sul fiorentino parlato dalle classi colte, ha plasmato l\'italiano che conosciamo oggi." — Su cosa si basava la soluzione manzoniana?',
    options: [
      'Sul fiorentino parlato dalle classi colte',
      'Sul latino classico',
      'Sul dialetto milanese',
      'Sul francese',
    ],
    correct: 'Sul fiorentino parlato dalle classi colte',
  },
  {
    id: 'r-c1-002',
    skill: 'reading',
    difficulty: 'C1',
    question:
      'Leggi: "Pur riconoscendo il valore del progresso tecnologico, non si può ignorare il crescente divario digitale che penalizza le fasce più deboli della popolazione." — Qual è la posizione dell\'autore?',
    options: [
      'Riconosce i benefici della tecnologia ma ne nota i limiti sociali',
      'È completamente contrario alla tecnologia',
      'È entusiasta e non vede problemi',
      'Propone di abolire la tecnologia',
    ],
    correct:
      'Riconosce i benefici della tecnologia ma ne nota i limiti sociali',
  },

  // ─── C2 Grammar ──────────────────────────────────────────────────────────
  {
    id: 'g-c2-001',
    skill: 'grammar',
    difficulty: 'C2',
    question: 'Completa: Magari ___ vero!',
    options: ['fosse', 'è', 'era', 'sarà'],
    correct: 'fosse',
    grammar_slug: 'ripasso-congiuntivo',
  },
  {
    id: 'g-c2-002',
    skill: 'grammar',
    difficulty: 'C2',
    question: 'Completa: Se ___ di più, oggi saprei rispondere.',
    options: ['avessi studiato', 'ho studiato', 'studiavo', 'studio'],
    correct: 'avessi studiato',
    grammar_slug: 'ripasso-condizionale',
  },
  {
    id: 'g-c2-003',
    skill: 'grammar',
    difficulty: 'C2',
    question: 'Quale plurale è corretto?',
    options: ['Le braccia', 'I bracci', 'Le braccie', 'I braccia'],
    correct: 'Le braccia',
    grammar_slug: 'concordanza-di-genere',
  },
  {
    id: 'g-c2-004',
    skill: 'grammar',
    difficulty: 'C2',
    question: 'Completa con la forma letteraria: Ei ___ solo e pensoso.',
    options: ['fu', 'è stato', 'era', 'sarà'],
    correct: 'fu',
    grammar_slug: 'stile-letterario',
  },

  // ─── C2 Vocabulary ────────────────────────────────────────────────────────
  {
    id: 'v-c2-001',
    skill: 'vocabulary',
    difficulty: 'C2',
    question: 'Cosa significa "acribia"?',
    options: [
      'Precisione filologica e attenzione ai dettagli',
      'Mancanza di precisione',
      'Creatività artistica',
      'Velocità di esecuzione',
    ],
    correct: 'Precisione filologica e attenzione ai dettagli',
  },
  {
    id: 'v-c2-002',
    skill: 'vocabulary',
    difficulty: 'C2',
    question: 'Cosa significa "polimatia"?',
    options: [
      'Conoscenza approfondita in molteplici campi',
      'Conoscenza di una sola materia',
      'Mancanza di cultura',
      'Amnesia selettiva',
    ],
    correct: 'Conoscenza approfondita in molteplici campi',
  },
  {
    id: 'v-c2-003',
    skill: 'vocabulary',
    difficulty: 'C2',
    question:
      'Quale termine descrive il fenomeno delle parole simili in due lingue ma con significati diversi?',
    options: ['Falsi amici', 'Sinonimi', 'Omonimi', 'Neologismi'],
    correct: 'Falsi amici',
  },
  {
    id: 'v-c2-004',
    skill: 'vocabulary',
    difficulty: 'C2',
    question: 'Cosa significa "inappuntabile"?',
    options: [
      'Perfetto, senza il minimo difetto',
      'Che non si può fissare',
      'Che arriva in ritardo',
      'Che non si può scrivere',
    ],
    correct: 'Perfetto, senza il minimo difetto',
  },

  // ─── C2 Reading ───────────────────────────────────────────────────────────
  {
    id: 'r-c2-001',
    skill: 'reading',
    difficulty: 'C2',
    question:
      'Leggi: "La diglossia italiana, caratterizzata dalla coesistenza di italiano standard e dialetti, rappresenta un patrimonio culturale di inestimabile valore, benché taluni paventino che possa ostacolare la piena padronanza dell\'italiano formale." — Qual è la preoccupazione espressa?',
    options: [
      "Che i dialetti ostacolino la padronanza dell'italiano formale",
      "Che l'italiano standard scompaia",
      'Che i dialetti vengano dimenticati',
      'Che non ci siano abbastanza scuole',
    ],
    correct: "Che i dialetti ostacolino la padronanza dell'italiano formale",
  },
  {
    id: 'r-c2-002',
    skill: 'reading',
    difficulty: 'C2',
    question:
      'Leggi: "Lungi dall\'essere un mero esercizio accademico, la traduzione letteraria si configura come un atto di ri-creazione linguistica che trascende i confini della mera equivalenza semantica, addentrandosi nelle pieghe più recondite della sensibilità culturale di un popolo." — Come viene descritta la traduzione letteraria?',
    options: [
      'Come un atto di ri-creazione linguistica',
      'Come un semplice esercizio scolastico',
      'Come un lavoro meccanico',
      "Come un'attività di poco valore",
    ],
    correct: 'Come un atto di ri-creazione linguistica',
  },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function pickNextQuestion(
  usedIds: Set<string>,
  currentLevel: CEFRLevel,
  preferSkill?: Skill
): AssessmentQuestion | null {
  const available = assessmentBank.filter(
    (q) => !usedIds.has(q.id) && q.difficulty === currentLevel
  )
  if (available.length === 0) return null

  if (preferSkill) {
    const bySkill = available.filter((q) => q.skill === preferSkill)
    if (bySkill.length > 0)
      return bySkill[Math.floor(Math.random() * bySkill.length)]
  }

  return available[Math.floor(Math.random() * available.length)]
}

export function adjustLevel(
  current: CEFRLevel,
  direction: 'up' | 'down'
): CEFRLevel {
  const levels: CEFRLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']
  const idx = levels.indexOf(current)
  if (direction === 'up' && idx < levels.length - 1) return levels[idx + 1]
  if (direction === 'down' && idx > 0) return levels[idx - 1]
  return current
}
