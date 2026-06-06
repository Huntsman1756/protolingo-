import type { CEFRLevel } from '@/data/grammar'

export type Register = 'formal' | 'neutral' | 'informal'

export interface Phrase {
  english: string
  context: string
  register: Register
  unit_ref?: string
}

export interface PhrasebookCategory {
  id: string
  level: CEFRLevel
  situation: string
  icon: string
  phrases: Phrase[]
}

// ─── A1 Categories ────────────────────────────────────────────────────────────

const greetings: PhrasebookCategory = {
  id: 'greetings',
  level: 'A1',
  situation: 'Saluti e presentazioni',
  icon: '👋',
  phrases: [
    { english: 'Ciao!', context: 'Saluto informale', register: 'informal' },
    {
      english: 'Buongiorno.',
      context: 'Saluto formale prima di mezzogiorno',
      register: 'formal',
    },
    {
      english: 'Buon pomeriggio.',
      context: 'Saluto tra mezzogiorno e le 18',
      register: 'formal',
    },
    { english: 'Buonasera.', context: 'Saluto dopo le 18', register: 'formal' },
    {
      english: 'Come stai?',
      context: 'Chiedere come sta qualcuno (informale)',
      register: 'informal',
    },
    {
      english: 'Come sta?',
      context: 'Chiedere come sta qualcuno (formale)',
      register: 'formal',
    },
    {
      english: 'Sto bene, grazie. E tu?',
      context: 'Rispondere e ricambiare (informale)',
      register: 'neutral',
    },
    {
      english: 'Sto bene, grazie. E Lei?',
      context: 'Rispondere e ricambiare (formale)',
      register: 'formal',
    },
    {
      english: 'Piacere di conoscerti.',
      context: 'Al primo incontro (informale)',
      register: 'neutral',
    },
    {
      english: 'Piacere di conoscerLa.',
      context: 'Al primo incontro (formale)',
      register: 'formal',
    },
    {
      english: 'Mi chiamo Marco.',
      context: 'Presentarsi',
      register: 'neutral',
    },
    {
      english: 'Di dove sei?',
      context: 'Chiedere la provenienza (informale)',
      register: 'informal',
    },
    {
      english: 'Sono italiano / italiana.',
      context: 'Indicare la nazionalità',
      register: 'neutral',
    },
    { english: 'Arrivederci!', context: 'Congedo formale', register: 'formal' },
    {
      english: 'A presto!',
      context: 'Congedo informale',
      register: 'informal',
    },
  ],
}

const basicRequests: PhrasebookCategory = {
  id: 'basic_requests',
  level: 'A1',
  situation: 'Richieste di base e cortesia',
  icon: '🙏',
  phrases: [
    {
      english: 'Per favore.',
      context: 'Chiedere qualcosa educatamente',
      register: 'neutral',
    },
    { english: 'Grazie.', context: 'Ringraziare', register: 'neutral' },
    {
      english: 'Grazie mille!',
      context: 'Ringraziare con enfasi',
      register: 'neutral',
    },
    {
      english: 'Prego.',
      context: 'Rispondere a un ringraziamento',
      register: 'neutral',
    },
    {
      english: 'Scusa.',
      context: 'Chiedere scusa (informale)',
      register: 'informal',
    },
    {
      english: 'Mi scusi.',
      context: 'Chiedere scusa (formale)',
      register: 'formal',
    },
    {
      english: 'Mi dispiace.',
      context: 'Esprimere dispiacere',
      register: 'neutral',
    },
    {
      english: "Non c'è problema.",
      context: 'Rassicurare dopo delle scuse',
      register: 'neutral',
    },
    {
      english: 'Puoi aiutarmi?',
      context: 'Chiedere aiuto (informale)',
      register: 'informal',
    },
    {
      english: 'Può aiutarmi?',
      context: 'Chiedere aiuto (formale)',
      register: 'formal',
    },
    {
      english: 'Posso...?',
      context: 'Chiedere il permesso (es: Posso entrare?)',
      register: 'neutral',
    },
    {
      english: 'Non capisco.',
      context: 'Indicare che non si capisce',
      register: 'neutral',
    },
  ],
}

const numbersTimeA1: PhrasebookCategory = {
  id: 'numbers_time_a1',
  level: 'A1',
  situation: 'Numeri e ora',
  icon: '🕒',
  phrases: [
    { english: 'Che ora è?', context: "Chiedere l'ora", register: 'neutral' },
    {
      english: 'Sono le tre.',
      context: "Dire l'ora esatta",
      register: 'neutral',
    },
    {
      english: "È l'una.",
      context: "Dire l'una (singolare)",
      register: 'neutral',
    },
    {
      english: 'Sono le tre e mezza.',
      context: "Dire la mezz'ora",
      register: 'neutral',
    },
    {
      english: 'Sono le quattro meno un quarto.',
      context: 'Dire l\'ora con "meno"',
      register: 'neutral',
    },
    {
      english: 'A che ora parte?',
      context: "Chiedere l'orario di partenza",
      register: 'neutral',
    },
    {
      english: 'Quanto costa?',
      context: 'Chiedere il prezzo',
      register: 'neutral',
    },
    {
      english: 'Costa dieci euro.',
      context: 'Indicare il prezzo',
      register: 'neutral',
    },
    {
      english: 'Quanti anni hai?',
      context: "Chiedere l'età (informale)",
      register: 'informal',
    },
    {
      english: 'Che ora è? — Sono le [ora].',
      context: "Chiedere e dire l'ora",
      register: 'neutral',
    },
  ],
}

const shoppingBasicA1: PhrasebookCategory = {
  id: 'shopping_basic_a1',
  level: 'A1',
  situation: 'Fare acquisti',
  icon: '🛍️',
  phrases: [
    {
      english: 'Quanto costa?',
      context: 'Chiedere il prezzo',
      register: 'neutral',
    },
    {
      english: 'È troppo caro.',
      context: 'Dire che qualcosa è costoso',
      register: 'neutral',
    },
    {
      english: 'Avete qualcosa di più economico?',
      context: "Chiedere un'alternativa meno cara",
      register: 'neutral',
    },
    {
      english: 'Posso pagare con la carta?',
      context: 'Chiedere se accettano carte',
      register: 'neutral',
    },
    {
      english: 'Pago in contanti.',
      context: 'Indicare pagamento in contanti',
      register: 'neutral',
    },
    {
      english: 'Mi dà uno scontrino, per favore?',
      context: 'Chiedere lo scontrino',
      register: 'formal',
    },
    {
      english: 'Che taglia porta?',
      context: 'Chiedere la taglia (negozio abbigliamento)',
      register: 'neutral',
    },
    {
      english: 'Posso provarlo?',
      context: 'Chiedere di provare un capo',
      register: 'neutral',
    },
    {
      english: 'Avete questo in un altro colore?',
      context: 'Chiedere varianti di colore',
      register: 'neutral',
    },
    {
      english: 'Prendo questo, grazie.',
      context: "Confermare l'acquisto",
      register: 'neutral',
    },
  ],
}

const askingDirectionsA1: PhrasebookCategory = {
  id: 'asking_directions_a1',
  level: 'A1',
  situation: 'Chiedere indicazioni',
  icon: '🗺️',
  phrases: [
    {
      english: "Scusi, dov'è la stazione?",
      context: 'Chiedere dove si trova un luogo',
      register: 'formal',
    },
    {
      english: 'È lontano?',
      context: 'Chiedere se un luogo è distante',
      register: 'neutral',
    },
    {
      english: 'È qui vicino.',
      context: 'Rispondere che è vicino',
      register: 'neutral',
    },
    {
      english: 'Gira a destra.',
      context: 'Dare indicazione: destra',
      register: 'neutral',
    },
    {
      english: 'Gira a sinistra.',
      context: 'Dare indicazione: sinistra',
      register: 'neutral',
    },
    {
      english: "Va' sempre dritto.",
      context: 'Dare indicazione: dritto',
      register: 'informal',
    },
    {
      english: "È all'angolo.",
      context: "Indicare la posizione all'angolo",
      register: 'neutral',
    },
    {
      english: "Dov'è il bagno?",
      context: 'Chiedere del bagno',
      register: 'neutral',
    },
    {
      english: "C'è una farmacia qui vicino?",
      context: 'Chiedere di un servizio specifico',
      register: 'neutral',
    },
    {
      english: 'Mi sono perso / persa.',
      context: 'Dire che ci si è persi',
      register: 'neutral',
    },
  ],
}

// ─── A2 Categories ────────────────────────────────────────────────────────────

const restaurantA2: PhrasebookCategory = {
  id: 'restaurant_a2',
  level: 'A2',
  situation: 'Al ristorante',
  icon: '🍽️',
  phrases: [
    {
      english: 'Avete un tavolo per due?',
      context: 'Chiedere un tavolo',
      register: 'neutral',
    },
    {
      english: 'Ho prenotato a nome Rossi.',
      context: 'Dire di aver prenotato',
      register: 'neutral',
    },
    {
      english: 'Posso vedere il menù?',
      context: 'Chiedere il menù',
      register: 'neutral',
    },
    {
      english: 'Cosa mi consiglia?',
      context: 'Chiedere un consiglio al cameriere',
      register: 'neutral',
    },
    {
      english: 'Prendo gli spaghetti al pomodoro.',
      context: 'Ordinare un piatto',
      register: 'neutral',
    },
    {
      english: "Da bere prendo un'acqua naturale.",
      context: 'Ordinare da bere',
      register: 'neutral',
    },
    {
      english: 'Il conto, per favore.',
      context: 'Chiedere il conto',
      register: 'neutral',
    },
    {
      english: 'È tutto buonissimo!',
      context: 'Fare un complimento al cuoco',
      register: 'neutral',
    },
    {
      english: 'Sono allergico/a a...',
      context: "Avvisare di un'allergia",
      register: 'neutral',
    },
    {
      english: "Potrebbe portarmi dell'altro pane?",
      context: 'Chiedere qualcosa in più',
      register: 'formal',
    },
    {
      english: 'Avete piatti vegetariani?',
      context: 'Chiedere opzioni vegetariane',
      register: 'neutral',
    },
    {
      english: 'Il coperto è incluso?',
      context: 'Chiedere informazioni sul coperto',
      register: 'neutral',
    },
    {
      english: 'Possiamo dividere il conto?',
      context: 'Chiedere di dividere il conto',
      register: 'neutral',
    },
  ],
}

const transportBookingA2: PhrasebookCategory = {
  id: 'transport_booking_a2',
  level: 'A2',
  situation: 'Viaggi e trasporti',
  icon: '🚆',
  phrases: [
    {
      english: 'Un biglietto per Milano, per favore.',
      context: 'Comprare un biglietto del treno',
      register: 'neutral',
    },
    {
      english: 'Solo andata o andata e ritorno?',
      context: 'Chiedere tipo di biglietto',
      register: 'neutral',
    },
    {
      english: 'Da quale binario parte?',
      context: 'Chiedere il binario',
      register: 'neutral',
    },
    {
      english: 'Il treno è in ritardo.',
      context: 'Informare di un ritardo',
      register: 'neutral',
    },
    {
      english: "Dov'è la fermata dell'autobus?",
      context: 'Chiedere della fermata',
      register: 'neutral',
    },
    {
      english: 'Quanto tempo ci vuole?',
      context: 'Chiedere la durata del viaggio',
      register: 'neutral',
    },
    {
      english: 'Vorrei noleggiare una macchina.',
      context: "Noleggiare un'auto",
      register: 'formal',
    },
    {
      english: "C'è un autobus per l'aeroporto?",
      context: "Chiedere trasporto per l'aeroporto",
      register: 'neutral',
    },
    {
      english: 'A che ora parte il prossimo treno?',
      context: 'Chiedere orario del prossimo treno',
      register: 'neutral',
    },
    {
      english: 'Devo cambiare treno?',
      context: 'Chiedere coincidenze',
      register: 'neutral',
    },
    {
      english: 'Dove posso comprare i biglietti?',
      context: 'Chiedere dove comprare biglietti',
      register: 'neutral',
    },
  ],
}

const weatherTalkA2: PhrasebookCategory = {
  id: 'weather_talk_a2',
  level: 'A2',
  situation: 'Parlare del tempo',
  icon: '🌤️',
  phrases: [
    {
      english: 'Che tempo fa oggi?',
      context: 'Chiedere del meteo',
      register: 'neutral',
    },
    {
      english: "C'è il sole.",
      context: 'Dire che è soleggiato',
      register: 'neutral',
    },
    {
      english: 'Sta piovendo.',
      context: 'Dire che piove',
      register: 'neutral',
    },
    {
      english: 'Fa molto caldo oggi.',
      context: 'Commentare il caldo',
      register: 'neutral',
    },
    {
      english: 'Che freddo fa!',
      context: 'Commentare il freddo',
      register: 'neutral',
    },
    {
      english: 'È nuvoloso.',
      context: 'Descrivere cielo nuvoloso',
      register: 'neutral',
    },
    {
      english: 'Che bella giornata!',
      context: 'Commentare una bella giornata',
      register: 'neutral',
    },
    {
      english: 'Domani dovrebbe nevicare.',
      context: 'Previsione neve',
      register: 'neutral',
    },
    {
      english: "C'è vento oggi.",
      context: "Dire che c'è vento",
      register: 'neutral',
    },
    {
      english: 'Che tempo fa domani?',
      context: 'Chiedere le previsioni del tempo',
      register: 'neutral',
    },
  ],
}

const makingPlansA2: PhrasebookCategory = {
  id: 'making_plans_a2',
  level: 'A2',
  situation: 'Fare programmi',
  icon: '📅',
  phrases: [
    {
      english: 'Sei libero stasera?',
      context: 'Chiedere disponibilità (informale)',
      register: 'informal',
    },
    {
      english: 'Ti va di andare al cinema?',
      context: 'Invitare qualcuno (informale)',
      register: 'informal',
    },
    {
      english: 'A che ora ci vediamo?',
      context: "Accordarsi sull'orario",
      register: 'neutral',
    },
    {
      english: 'Ci vediamo in piazza alle otto.',
      context: 'Fissare luogo e ora',
      register: 'neutral',
    },
    {
      english: 'Mi dispiace, non posso.',
      context: 'Rifiutare un invito',
      register: 'neutral',
    },
    {
      english: 'Volentieri! / Con piacere!',
      context: 'Accettare un invito',
      register: 'neutral',
    },
    {
      english: 'Che ne dici di prendere un caffè?',
      context: "Proporre un'attività",
      register: 'informal',
    },
    {
      english: 'Possiamo rimandare a domani?',
      context: 'Chiedere di posticipare',
      register: 'neutral',
    },
    {
      english: 'A più tardi!',
      context: 'Salutare dandosi appuntamento',
      register: 'informal',
    },
    {
      english: 'Ti passo a prendere alle sette.',
      context: 'Offrire un passaggio',
      register: 'informal',
    },
    {
      english: 'Dove ci incontriamo?',
      context: "Chiedere il luogo dell'incontro",
      register: 'neutral',
    },
  ],
}

const feelingsA2: PhrasebookCategory = {
  id: 'feelings_a2',
  level: 'A2',
  situation: 'Esprimere emozioni',
  icon: '😊',
  phrases: [
    {
      english: 'Sono felice.',
      context: 'Esprimere felicità',
      register: 'neutral',
    },
    {
      english: 'Sono triste.',
      context: 'Esprimere tristezza',
      register: 'neutral',
    },
    {
      english: 'Sono stanco / stanca.',
      context: 'Esprimere stanchezza',
      register: 'neutral',
    },
    { english: 'Ho fame.', context: 'Esprimere fame', register: 'neutral' },
    { english: 'Ho sete.', context: 'Esprimere sete', register: 'neutral' },
    { english: 'Ho paura.', context: 'Esprimere paura', register: 'neutral' },
    {
      english: 'Sono arrabbiato / arrabbiata.',
      context: 'Esprimere rabbia',
      register: 'neutral',
    },
    {
      english: 'Sono preoccupato / preoccupata.',
      context: 'Esprimere preoccupazione',
      register: 'neutral',
    },
    {
      english: 'Sono emozionato / emozionata!',
      context: 'Esprimere emozione positiva',
      register: 'neutral',
    },
    {
      english: 'Sono annoiato / annoiata.',
      context: 'Esprimere noia',
      register: 'neutral',
    },
    {
      english: 'Che stress!',
      context: 'Esprimere stress',
      register: 'informal',
    },
  ],
}

// ─── B1 Categories ────────────────────────────────────────────────────────────

const phoneCallsB1: PhrasebookCategory = {
  id: 'phone_calls_b1',
  level: 'B1',
  situation: 'Telefonate',
  icon: '📞',
  phrases: [
    {
      english: 'Pronto?',
      context: 'Rispondere al telefono',
      register: 'neutral',
    },
    {
      english: 'Parlo con il signor Rossi?',
      context: 'Chiedere di parlare con qualcuno (formale)',
      register: 'formal',
    },
    {
      english: "C'è Maria?",
      context: 'Chiedere di qualcuno (informale)',
      register: 'informal',
    },
    {
      english: 'Un attimo, te la passo.',
      context: 'Passare la chiamata (informale)',
      register: 'informal',
    },
    {
      english: 'Può richiamare più tardi?',
      context: 'Chiedere di richiamare',
      register: 'formal',
    },
    {
      english: 'Non prende bene.',
      context: 'Segnalare problemi di linea',
      register: 'informal',
    },
    {
      english: 'Mi sente?',
      context: "Verificare che l'interlocutore senta",
      register: 'neutral',
    },
    {
      english: 'Ha sbagliato numero.',
      context: 'Informare di un numero sbagliato',
      register: 'neutral',
    },
    {
      english: 'Posso lasciare un messaggio?',
      context: 'Offrire di lasciare un messaggio',
      register: 'neutral',
    },
    {
      english: 'La richiamo appena posso.',
      context: 'Promettere di richiamare',
      register: 'neutral',
    },
    {
      english: 'Pronto, chi parla?',
      context: 'Chiedere chi sta chiamando',
      register: 'neutral',
    },
  ],
}

const jobInterviewB1: PhrasebookCategory = {
  id: 'job_interview_b1',
  level: 'B1',
  situation: 'Colloqui di lavoro',
  icon: '💼',
  phrases: [
    {
      english: 'Buongiorno, ho un colloquio alle dieci.',
      context: 'Presentarsi alla reception',
      register: 'formal',
    },
    {
      english: "Ho studiato economia all'università.",
      context: 'Parlare del proprio percorso di studi',
      register: 'neutral',
    },
    {
      english: 'Ho esperienza nel settore.',
      context: "Parlare dell'esperienza lavorativa",
      register: 'neutral',
    },
    {
      english: 'Parlo tre lingue: italiano, inglese e spagnolo.',
      context: 'Elencare le competenze linguistiche',
      register: 'neutral',
    },
    {
      english: 'Sono una persona precisa e affidabile.',
      context: 'Descrivere le proprie qualità',
      register: 'neutral',
    },
    {
      english: 'Mi piace lavorare in gruppo.',
      context: 'Parlare del lavoro di squadra',
      register: 'neutral',
    },
    {
      english: 'Quali sono gli orari di lavoro?',
      context: "Chiedere informazioni sull'orario",
      register: 'neutral',
    },
    {
      english: 'Che tipo di contratto offrite?',
      context: 'Chiedere del contratto',
      register: 'formal',
    },
    {
      english: "Quando saprò l'esito del colloquio?",
      context: 'Chiedere tempi di risposta',
      register: 'formal',
    },
    {
      english: "Grazie per l'opportunità.",
      context: 'Ringraziare a fine colloquio',
      register: 'formal',
    },
    {
      english: "Com'è l'ambiente di lavoro qui?",
      context: 'Chiedere informazioni sulla cultura aziendale',
      register: 'neutral',
    },
  ],
}

const givingOpinionsB1: PhrasebookCategory = {
  id: 'giving_opinions_b1',
  level: 'B1',
  situation: 'Dare opinioni',
  icon: '💬',
  phrases: [
    {
      english: 'Secondo me è una buona idea.',
      context: 'Esprimere la propria opinione',
      register: 'neutral',
    },
    {
      english: "Non sono d'accordo.",
      context: 'Esprimere disaccordo',
      register: 'neutral',
    },
    {
      english: 'Hai ragione.',
      context: 'Dare ragione a qualcuno',
      register: 'neutral',
    },
    {
      english: 'Forse hai torto.',
      context: 'Esprimere disaccordo gentile',
      register: 'neutral',
    },
    {
      english: 'Non ne sono sicuro/a.',
      context: 'Esprimere incertezza',
      register: 'neutral',
    },
    {
      english: 'Dipende.',
      context: 'Evitare una risposta categorica',
      register: 'neutral',
    },
    {
      english: 'Dal mio punto di vista...',
      context: 'Introdurre la propria prospettiva',
      register: 'neutral',
    },
    {
      english: 'Che ne pensi?',
      context: "Chiedere un'opinione (informale)",
      register: 'informal',
    },
    {
      english: 'Cosa ne pensa?',
      context: "Chiedere un'opinione (formale)",
      register: 'formal',
    },
    {
      english: 'Sono assolutamente contrario/a.',
      context: 'Esprimere forte disaccordo',
      register: 'formal',
    },
    {
      english: 'In effetti, hai proprio ragione.',
      context: "Ammetttere che l'altro ha ragione",
      register: 'neutral',
    },
    {
      english: 'Permettimi di dissentire.',
      context: 'Introdurre educatamente un disaccordo',
      register: 'formal',
    },
  ],
}

const healthAppointmentsB1: PhrasebookCategory = {
  id: 'health_appointments_b1',
  level: 'B1',
  situation: 'Salute e visite mediche',
  icon: '🏥',
  phrases: [
    {
      english: 'Vorrei prendere un appuntamento.',
      context: 'Prenotare una visita',
      register: 'formal',
    },
    {
      english: 'Ho mal di testa da due giorni.',
      context: 'Descrivere un sintomo',
      register: 'neutral',
    },
    {
      english: 'Mi fa male qui.',
      context: 'Indicare dove si sente dolore',
      register: 'neutral',
    },
    {
      english: 'Ho la febbre.',
      context: 'Dire di avere la febbre',
      register: 'neutral',
    },
    {
      english: 'Sono allergico/a alla penicillina.',
      context: "Dichiarare un'allergia",
      register: 'neutral',
    },
    {
      english: 'Devo fare una ricetta?',
      context: 'Chiedere della prescrizione',
      register: 'neutral',
    },
    {
      english: 'Prenda questa medicina due volte al giorno.',
      context: 'Ricevere istruzioni sul farmaco',
      register: 'formal',
    },
    {
      english: 'Quando posso venire?',
      context: 'Chiedere disponibilità',
      register: 'neutral',
    },
    {
      english: 'Ho bisogno di un certificato medico.',
      context: 'Richiedere un certificato',
      register: 'formal',
    },
    {
      english: 'È urgente.',
      context: 'Segnalare urgenza',
      register: 'neutral',
    },
  ],
}

// ─── B2 Categories ────────────────────────────────────────────────────────────

const formalEmailsB2: PhrasebookCategory = {
  id: 'formal_emails_b2',
  level: 'B2',
  situation: 'Email formali e corrispondenza',
  icon: '📧',
  phrases: [
    {
      english: 'Gentile Dottor Rossi,',
      context: 'Apertura email formale (uomo)',
      register: 'formal',
    },
    {
      english: 'Gentile Professoressa Bianchi,',
      context: 'Apertura email formale (donna)',
      register: 'formal',
    },
    {
      english: 'In allegato Le invio il documento richiesto.',
      context: 'Inviare un allegato',
      register: 'formal',
    },
    {
      english: 'La ringrazio per la Sua disponibilità.',
      context: 'Ringraziare per la disponibilità',
      register: 'formal',
    },
    {
      english: 'Resto in attesa di un Suo gentile riscontro.',
      context: 'Chiedere una risposta educatamente',
      register: 'formal',
    },
    {
      english: 'Con riferimento alla Sua email del...',
      context: 'Fare riferimento a una comunicazione precedente',
      register: 'formal',
    },
    {
      english: 'Le scrivo per richiedere informazioni riguardo a...',
      context: "Introdurre lo scopo dell'email",
      register: 'formal',
    },
    {
      english: 'Cordiali saluti,',
      context: 'Chiusura formale standard',
      register: 'formal',
    },
    {
      english: 'Distinti saluti,',
      context: 'Chiusura molto formale',
      register: 'formal',
    },
    {
      english: 'La prego di scusarmi per il ritardo nella risposta.',
      context: 'Scusarsi per il ritardo',
      register: 'formal',
    },
    {
      english: 'Mi permetto di sollecitare un riscontro.',
      context: 'Sollecitare una risposta',
      register: 'formal',
    },
  ],
}

const negotiationsB2: PhrasebookCategory = {
  id: 'negotiations_b2',
  level: 'B2',
  situation: 'Discussioni e negoziazioni',
  icon: '🤝',
  phrases: [
    {
      english: 'Propongo un compromesso.',
      context: 'Proporre un compromesso',
      register: 'formal',
    },
    {
      english: 'Cerchiamo di trovare un accordo.',
      context: 'Invitare a negoziare',
      register: 'neutral',
    },
    {
      english: 'Qual è la vostra proposta?',
      context: 'Chiedere una proposta',
      register: 'neutral',
    },
    {
      english: "Mi sembra un'offerta ragionevole.",
      context: 'Valutare positivamente',
      register: 'neutral',
    },
    {
      english: 'Purtroppo non possiamo accettare queste condizioni.',
      context: 'Rifiutare educatamente',
      register: 'formal',
    },
    {
      english: 'Potremmo rivedere i termini del contratto?',
      context: 'Chiedere di rinegoziare',
      register: 'formal',
    },
    {
      english: 'Siamo disposti a trattare sul prezzo.',
      context: 'Mostrare flessibilità sul prezzo',
      register: 'neutral',
    },
    {
      english: 'Vorrei avere il tempo di valutare.',
      context: 'Prendere tempo per decidere',
      register: 'neutral',
    },
    {
      english: 'Possiamo trovare una soluzione vantaggiosa per entrambi.',
      context: 'Proporre soluzione win-win',
      register: 'formal',
    },
    {
      english: 'Mettiamolo per iscritto.',
      context: 'Richiedere conferma scritta',
      register: 'neutral',
    },
  ],
}

const academicDiscussionB2: PhrasebookCategory = {
  id: 'academic_discussion_b2',
  level: 'B2',
  situation: 'Discussioni accademiche',
  icon: '🎓',
  phrases: [
    {
      english: 'Secondo la mia ricerca...',
      context: 'Introdurre i propri risultati',
      register: 'formal',
    },
    {
      english: "Questo dato supporta l'ipotesi iniziale.",
      context: 'Collegare dati e ipotesi',
      register: 'formal',
    },
    {
      english: 'Al contrario, gli studi di Rossi suggeriscono che...',
      context: 'Contrapporre ricerche diverse',
      register: 'formal',
    },
    {
      english: 'È importante sottolineare che...',
      context: 'Enfatizzare un punto',
      register: 'formal',
    },
    {
      english: 'La metodologia utilizzata presenta alcuni limiti.',
      context: 'Riconoscere limiti della ricerca',
      register: 'formal',
    },
    {
      english: 'Questa conclusione è supportata da evidenze empiriche.',
      context: "Rafforzare un'affermazione",
      register: 'formal',
    },
    {
      english: 'Potrebbe chiarire meglio questo punto?',
      context: 'Chiedere chiarimenti accademici',
      register: 'formal',
    },
    {
      english: "L'argomento è stato ampiamente dibattuto in letteratura.",
      context: 'Riferirsi a letteratura esistente',
      register: 'formal',
    },
    {
      english: 'Ritengo che questa interpretazione sia discutibile.',
      context: 'Esprimere disaccordo accademico',
      register: 'formal',
    },
    {
      english: 'In sintesi, i risultati indicano che...',
      context: 'Riassumere conclusioni',
      register: 'formal',
    },
    {
      english: 'Quali sono le implicazioni di questo studio?',
      context: 'Discutere le conseguenze di una ricerca',
      register: 'formal',
    },
  ],
}

// ─── C1 Categories ────────────────────────────────────────────────────────────

const presentationsC1: PhrasebookCategory = {
  id: 'presentations_c1',
  level: 'C1',
  situation: 'Presentazioni e public speaking',
  icon: '🎤',
  phrases: [
    {
      english: 'Signore e signori, buongiorno.',
      context: 'Apertura formale di una presentazione',
      register: 'formal',
    },
    {
      english: 'Oggi vorrei parlarvi di un tema che mi sta molto a cuore.',
      context: 'Introdurre il tema con coinvolgimento emotivo',
      register: 'formal',
    },
    {
      english: 'La mia presentazione si articola in tre parti.',
      context: 'Illustrare la struttura',
      register: 'formal',
    },
    {
      english: 'Come potete vedere da questa diapositiva...',
      context: 'Commentare una slide',
      register: 'formal',
    },
    {
      english: 'Per approfondire questo aspetto...',
      context: 'Approfondire un punto',
      register: 'formal',
    },
    {
      english: 'Vorrei richiamare la vostra attenzione su questo grafico.',
      context: "Attirare l'attenzione su un dato visivo",
      register: 'formal',
    },
    {
      english: 'Consentitemi di aprire una breve parentesi.',
      context: 'Fare una digressione',
      register: 'formal',
    },
    {
      english: 'In conclusione, ritengo fondamentale sottolineare che...',
      context: 'Concludere con enfasi',
      register: 'formal',
    },
    {
      english: "Vi ringrazio per l'attenzione.",
      context: 'Ringraziare alla fine',
      register: 'formal',
    },
    {
      english: 'Se ci sono domande, sono a vostra disposizione.',
      context: 'Aprire alle domande',
      register: 'formal',
    },
    {
      english: 'Per riassumere quanto detto finora...',
      context: 'Riassumere a metà presentazione',
      register: 'formal',
    },
    {
      english: 'Vorrei concludere con una citazione di...',
      context: 'Chiudere con una citazione',
      register: 'formal',
    },
    {
      english: 'Passo ora alla seconda parte.',
      context: 'Transizione tra sezioni',
      register: 'formal',
    },
  ],
}

const complexArgumentsC1: PhrasebookCategory = {
  id: 'complex_arguments_c1',
  level: 'C1',
  situation: 'Argomentazioni complesse',
  icon: '🧠',
  phrases: [
    {
      english:
        'Pur riconoscendo la validità delle sue osservazioni, dissentirei.',
      context: 'Concessione seguita da obiezione',
      register: 'formal',
    },
    {
      english: 'È innegabile che i dati mostrino una tendenza preoccupante.',
      context: 'Affermare un fatto indiscutibile',
      register: 'formal',
    },
    {
      english:
        'Tuttavia, va considerato anche il contesto in cui questi eventi si sono verificati.',
      context: 'Introdurre una controargomentazione',
      register: 'formal',
    },
    {
      english:
        'A mio avviso, il punto cruciale della questione risiede nel fatto che...',
      context: 'Identificare il punto centrale',
      register: 'formal',
    },
    {
      english:
        'Non si può prescindere dalle implicazioni etiche di questa scelta.',
      context: 'Sollevare questioni etiche',
      register: 'formal',
    },
    {
      english:
        'Benché la proposta sia allettante, comporta dei rischi non trascurabili.',
      context: 'Usare concessiva con congiuntivo',
      register: 'formal',
    },
    {
      english: 'Si potrebbe obiettare che i costi siano eccessivi.',
      context: 'Presentare una possibile obiezione',
      register: 'formal',
    },
    {
      english:
        'Sarebbe riduttivo limitarsi a una sola interpretazione del fenomeno.',
      context: 'Criticare una visione limitata',
      register: 'formal',
    },
    {
      english:
        'La questione merita di essere esaminata da una prospettiva più ampia.',
      context: 'Chiedere una visione più ampia',
      register: 'formal',
    },
    {
      english:
        "È una tesi affascinante, ma a mio parere non regge a un'analisi approfondita.",
      context: 'Confutare con eleganza',
      register: 'formal',
    },
    {
      english: 'Se è vero che X, non ne consegue necessariamente Y.',
      context: 'Smontare una fallacia logica',
      register: 'formal',
    },
    {
      english: 'Ritengo si tratti di una semplificazione eccessiva.',
      context: 'Criticare una semplificazione',
      register: 'formal',
    },
  ],
}

const professionalNetworkingC1: PhrasebookCategory = {
  id: 'professional_networking_c1',
  level: 'C1',
  situation: 'Networking professionale',
  icon: '🤝',
  phrases: [
    {
      english: 'Piacere di conoscerLa. Ho seguito con interesse il Suo lavoro.',
      context: 'Presentarsi con un complimento professionale',
      register: 'formal',
    },
    {
      english: 'Sarei lieto/a di approfondire una possibile collaborazione.',
      context: 'Proporre una collaborazione',
      register: 'formal',
    },
    {
      english: 'Opero nel settore da oltre dieci anni.',
      context: "Descrivere l'esperienza professionale",
      register: 'neutral',
    },
    {
      english: 'Mi occupo prevalentemente di sviluppo internazionale.',
      context: 'Descrivere il proprio ruolo',
      register: 'neutral',
    },
    {
      english: 'Posso lasciarLe il mio biglietto da visita?',
      context: 'Offrire il biglietto da visita',
      register: 'formal',
    },
    {
      english: 'Sarebbe un piacere rimanere in contatto.',
      context: 'Esprimere desiderio di restare in contatto',
      register: 'formal',
    },
    {
      english: 'La nostra azienda è interessata a esplorare nuove partnership.',
      context: 'Accennare a opportunità di business',
      register: 'formal',
    },
    {
      english: 'Ho apprezzato molto il Suo intervento al convegno.',
      context: 'Fare un complimento specifico',
      register: 'formal',
    },
    {
      english: 'Potremmo fissare un incontro per discuterne più a fondo.',
      context: 'Proporre un incontro futuro',
      register: 'formal',
    },
    {
      english:
        'Se posso permettermi, Le suggerirei di contattare il nostro ufficio.',
      context: 'Dare un suggerimento professionale',
      register: 'formal',
    },
  ],
}

const conflictResolutionC1: PhrasebookCategory = {
  id: 'conflict_resolution_c1',
  level: 'C1',
  situation: 'Risoluzione dei conflitti',
  icon: '🕊️',
  phrases: [
    {
      english:
        'Capisco il Suo punto di vista, ma vorrei chiarire meglio la nostra posizione.',
      context: 'Mostrare comprensione prima di dissentire',
      register: 'formal',
    },
    {
      english: 'È possibile che ci sia stato un malinteso.',
      context: 'Ipotizzare un equivoco',
      register: 'neutral',
    },
    {
      english:
        "L'obiettivo comune dovrebbe essere trovare una soluzione che soddisfi entrambi.",
      context: "Ricordare l'obiettivo comune",
      register: 'formal',
    },
    {
      english: 'Sono disposto/a a riconsiderare la mia posizione se...',
      context: 'Mostrare flessibilità condizionata',
      register: 'neutral',
    },
    {
      english:
        'Ritengo che la trasparenza sia fondamentale per risolvere la questione.',
      context: 'Invocare trasparenza',
      register: 'formal',
    },
    {
      english: 'Non era mia intenzione mancare di rispetto.',
      context: "Scusarsi per un'offesa involontaria",
      register: 'formal',
    },
    {
      english:
        'Propongo di fare un passo indietro e ripartire dai punti su cui concordiamo.',
      context: 'Proporre un reset della discussione',
      register: 'neutral',
    },
    {
      english: "Sono certo/a che riusciremo a trovare un'intesa.",
      context: 'Esprimere ottimismo costruttivo',
      register: 'formal',
    },
    {
      english: 'Le chiedo scusa se le mie parole sono state fraintese.',
      context: 'Scusarsi per un fraintendimento',
      register: 'formal',
    },
    {
      english:
        'Coinvolgiamo un mediatore se riteniamo di non riuscire a risolvere da soli.',
      context: 'Proporre mediazione esterna',
      register: 'formal',
    },
  ],
}

// ─── C2 Categories ────────────────────────────────────────────────────────────

const rhetoricC2: PhrasebookCategory = {
  id: 'rhetoric_c2',
  level: 'C2',
  situation: 'Retorica e persuasione',
  icon: '⚖️',
  phrases: [
    {
      english: 'Non vi è ombra di dubbio che le evidenze parlino da sole.',
      context: "Rafforzare un'affermazione con forza retorica",
      register: 'formal',
    },
    {
      english: 'Chi oserebbe affermare il contrario?',
      context: 'Domanda retorica per rafforzare la tesi',
      register: 'formal',
    },
    {
      english:
        'È giunto il momento di affrontare la verità, per quanto scomoda possa essere.',
      context: 'Appello emotivo alla verità',
      register: 'formal',
    },
    {
      english:
        'Non possiamo restare inerti di fronte a una simile ingiustizia.',
      context: "Chiamata all'azione",
      register: 'formal',
    },
    {
      english: 'Le conseguenze di una mancata azione sarebbero catastrofiche.',
      context: 'Avvertimento sulle conseguenze',
      register: 'formal',
    },
    {
      english:
        'Invoco il vostro senso di responsabilità verso le generazioni future.',
      context: 'Appello alle generazioni future',
      register: 'formal',
    },
    {
      english:
        'Questa non è una questione di destra o di sinistra, ma di buonsenso.',
      context: 'Superare divisioni politiche',
      register: 'formal',
    },
    {
      english:
        'Lasciate che vi racconti una storia che illustra meglio di mille parole ciò che intendo.',
      context: 'Usare una narrazione persuasiva',
      register: 'formal',
    },
    {
      english:
        'Siamo a un bivio storico, e la scelta che faremo oggi definirà il nostro futuro.',
      context: 'Creare urgenza storica',
      register: 'formal',
    },
    {
      english: 'Non illudiamoci: la strada è in salita, ma è percorribile.',
      context: 'Riconoscere difficoltà ma infondere speranza',
      register: 'formal',
    },
    {
      english: 'Chi non è parte della soluzione è parte del problema.',
      context: 'Dicotomia retorica',
      register: 'formal',
    },
    {
      english: 'Concedetemi di sognare per un istante un mondo in cui...',
      context: 'Apertura visionaria',
      register: 'formal',
    },
  ],
}

const nuancedDiscourseC2: PhrasebookCategory = {
  id: 'nuanced_discourse_c2',
  level: 'C2',
  situation: 'Discorso sfumato e hedging',
  icon: '🔬',
  phrases: [
    {
      english:
        'A mio modesto parere, la questione è assai più complessa di quanto appaia a prima vista.',
      context: 'Sminuire la propria opinione per diplomazia',
      register: 'formal',
    },
    {
      english:
        'Non si può escludere a priori che vi siano state delle incomprensioni.',
      context: 'Aprire a possibilità alternative',
      register: 'formal',
    },
    {
      english:
        'Tenderei a credere che le cose stiano diversamente, ma sono pronto/a a ricredermi.',
      context: 'Esprimere opinione con apertura al cambiamento',
      register: 'formal',
    },
    {
      english:
        'Sarebbe azzardato trarre conclusioni definitive sulla base dei dati attuali.',
      context: 'Mettere in guardia da conclusioni affrettate',
      register: 'formal',
    },
    {
      english:
        'Per quanto mi riguarda, non vi sarebbero obiezioni di principio, ma andrebbero valutati i dettagli operativi.',
      context: 'Accordo condizionato',
      register: 'formal',
    },
    {
      english:
        'Ammesso e non concesso che la premessa sia corretta, la conclusione non è scontata.',
      context: 'Accettare ipoteticamente una premessa',
      register: 'formal',
    },
    {
      english:
        'Non vorrei che le mie parole venissero interpretate come una critica, quanto piuttosto come uno spunto di riflessione.',
      context: 'Attenuare una potenziale critica',
      register: 'formal',
    },
    {
      english:
        'È verosimile che la situazione evolva in una direzione diversa da quella prevista.',
      context: 'Esprimere probabilità con cautela',
      register: 'formal',
    },
    {
      english: "Lungi da me l'idea di voler imporre la mia visione.",
      context: 'Prevenire accuse di arroganza',
      register: 'formal',
    },
    {
      english:
        "Si potrebbe forse azzardare l'ipotesi che le cause siano più profonde.",
      context: 'Proporre ipotesi con cautela',
      register: 'formal',
    },
    {
      english:
        'È innegabilmente un passo avanti, benché permangano alcune criticità.',
      context: 'Bilanciare elogio e critica',
      register: 'formal',
    },
    {
      english:
        "Sarei cauto/a nell'attribuire tout court la responsabilità a un singolo fattore.",
      context: 'Mettere in guardia da attribuzioni semplicistiche',
      register: 'formal',
    },
  ],
}

const legalContractualC2: PhrasebookCategory = {
  id: 'legal_contractual_c2',
  level: 'C2',
  situation: 'Linguaggio legale e contrattuale',
  icon: '📜',
  phrases: [
    {
      english:
        "Ai sensi dell'articolo 3 del presente contratto, le parti convengono quanto segue.",
      context: 'Riferimento a una clausola contrattuale',
      register: 'formal',
    },
    {
      english: 'Il presente accordo è regolato dalla legge italiana.',
      context: 'Specificare la giurisdizione',
      register: 'formal',
    },
    {
      english: 'Fatto salvo quanto previsto al comma precedente.',
      context: 'Fare una riserva legale',
      register: 'formal',
    },
    {
      english:
        "La presente scrittura costituisce l'intero accordo tra le parti.",
      context: 'Clausola di completezza contrattuale',
      register: 'formal',
    },
    {
      english:
        'Ogni modifica dovrà essere apportata per iscritto e sottoscritta da entrambe le parti.',
      context: 'Clausola di modifica',
      register: 'formal',
    },
    {
      english: 'La parte inadempiente sarà tenuta al risarcimento del danno.',
      context: 'Clausola di inadempienza',
      register: 'formal',
    },
    {
      english: 'Le parti eleggono domicilio presso le rispettive sedi legali.',
      context: 'Elezione di domicilio',
      register: 'formal',
    },
    {
      english: 'Il contratto è nullo ove in contrasto con norme imperative.',
      context: 'Clausola di nullità',
      register: 'formal',
    },
    {
      english: 'In fede, le parti sottoscrivono il presente atto.',
      context: 'Formula di chiusura legale',
      register: 'formal',
    },
    {
      english:
        "Il presente atto è soggetto a registrazione presso l'Agenzia delle Entrate.",
      context: 'Obbligo di registrazione',
      register: 'formal',
    },
    {
      english: 'Le controversie saranno deferite al foro competente di Roma.',
      context: 'Clausola del foro competente',
      register: 'formal',
    },
  ],
}

const socialCommentaryC2: PhrasebookCategory = {
  id: 'social_commentary_c2',
  level: 'C2',
  situation: 'Commento sociale e dibattito',
  icon: '🗞️',
  phrases: [
    {
      english:
        'La società contemporanea si trova ad affrontare sfide senza precedenti.',
      context: 'Apertura di un commento sociale',
      register: 'formal',
    },
    {
      english:
        'Il divario tra ricchi e poveri si sta ampliando in modo allarmante.',
      context: 'Denuncia di disuguaglianza',
      register: 'formal',
    },
    {
      english:
        'È indispensabile un cambio di paradigma se vogliamo garantire un futuro sostenibile.',
      context: 'Chiamata al cambiamento',
      register: 'formal',
    },
    {
      english:
        'Non possiamo più permetterci di ignorare le conseguenze delle nostre azioni sul pianeta.',
      context: 'Appello ecologico',
      register: 'formal',
    },
    {
      english:
        'La crisi che stiamo attraversando non è solo economica, ma anche valoriale.',
      context: 'Analisi multidimensionale',
      register: 'formal',
    },
    {
      english:
        'Le nuove tecnologie offrono opportunità straordinarie, ma pongono anche interrogativi etici inquietanti.',
      context: 'Bilanciare progresso e rischi',
      register: 'formal',
    },
    {
      english:
        'Assistiamo a una progressiva erosione della fiducia nelle istituzioni democratiche.',
      context: 'Analisi politica',
      register: 'formal',
    },
    {
      english:
        'È nostro dovere morale impegnarci per una società più giusta e inclusiva.',
      context: 'Appello morale',
      register: 'formal',
    },
    {
      english:
        "Il dibattito pubblico è stato inquinato da un'ondata di disinformazione senza precedenti.",
      context: 'Critica dei media',
      register: 'formal',
    },
    {
      english:
        "La cultura, intesa nel suo senso più ampio, è l'unico vero antidoto contro l'intolleranza.",
      context: 'Elogio della cultura',
      register: 'formal',
    },
    {
      english:
        "Senza un'istruzione di qualità, ogni discorso sul progresso sociale è destinato a rimanere lettera morta.",
      context: "Difesa dell'istruzione",
      register: 'formal',
    },
  ],
}

// ─── Phrasebook index ─────────────────────────────────────────────────────────

export const phrasebookCategories: PhrasebookCategory[] = [
  // A1
  greetings,
  basicRequests,
  numbersTimeA1,
  shoppingBasicA1,
  askingDirectionsA1,
  // A2
  restaurantA2,
  transportBookingA2,
  weatherTalkA2,
  makingPlansA2,
  feelingsA2,
  // B1
  phoneCallsB1,
  jobInterviewB1,
  givingOpinionsB1,
  healthAppointmentsB1,
  // B2
  formalEmailsB2,
  negotiationsB2,
  academicDiscussionB2,
  // C1
  presentationsC1,
  complexArgumentsC1,
  professionalNetworkingC1,
  conflictResolutionC1,
  // C2
  rhetoricC2,
  nuancedDiscourseC2,
  legalContractualC2,
  socialCommentaryC2,
]

export function getPhrasebookByLevel(level: CEFRLevel): PhrasebookCategory[] {
  return phrasebookCategories.filter((c) => c.level === level)
}

export function getPhrasebookByRegister(
  register: Register
): PhrasebookCategory[] {
  return phrasebookCategories.filter((c) =>
    c.phrases.some((p) => p.register === register)
  )
}

export function getAllSituations(): string[] {
  return phrasebookCategories.map((c) => c.situation)
}
