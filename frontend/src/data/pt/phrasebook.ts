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
  situation: 'Saudações e apresentações',
  icon: '👋',
  phrases: [
    { english: 'Olá!', context: 'Saudação informal', register: 'informal' },
    {
      english: 'Bom dia.',
      context: 'Saudação formal antes do meio-dia',
      register: 'formal',
    },
    {
      english: 'Boa tarde.',
      context: 'Saudação entre o meio-dia e as 18h',
      register: 'formal',
    },
    {
      english: 'Boa noite.',
      context: 'Saudação depois das 18h',
      register: 'formal',
    },
    {
      english: 'Como estás?',
      context: 'Perguntar como está alguém (informal)',
      register: 'informal',
    },
    {
      english: 'Como está?',
      context: 'Perguntar como está alguém (formal)',
      register: 'formal',
    },
    {
      english: 'Estou bem, obrigado. E tu?',
      context: 'Responder e retribuir (informal)',
      register: 'neutral',
    },
    {
      english: 'Estou bem, obrigado. E o senhor?',
      context: 'Responder e retribuir (formal)',
      register: 'formal',
    },
    {
      english: 'Muito prazer em conhecer-te.',
      context: 'No primeiro encontro (informal)',
      register: 'neutral',
    },
    {
      english: 'Muito prazer em conhecê-lo.',
      context: 'No primeiro encontro (formal)',
      register: 'formal',
    },
    {
      english: 'Chamo-me João.',
      context: 'Apresentar-se',
      register: 'neutral',
    },
    {
      english: 'De onde és?',
      context: 'Perguntar a proveniência (informal)',
      register: 'informal',
    },
    {
      english: 'Sou português / portuguesa.',
      context: 'Indicar a nacionalidade',
      register: 'neutral',
    },
    { english: 'Adeus!', context: 'Despedida formal', register: 'formal' },
    {
      english: 'Até logo!',
      context: 'Despedida informal',
      register: 'informal',
    },
  ],
}

const basicRequests: PhrasebookCategory = {
  id: 'basic_requests',
  level: 'A1',
  situation: 'Pedidos básicos e cortesia',
  icon: '🙏',
  phrases: [
    {
      english: 'Por favor.',
      context: 'Pedir algo educadamente',
      register: 'neutral',
    },
    {
      english: 'Obrigado.',
      context: 'Agradecer (masculino)',
      register: 'neutral',
    },
    {
      english: 'Muito obrigado!',
      context: 'Agradecer com ênfase',
      register: 'neutral',
    },
    {
      english: 'De nada.',
      context: 'Responder a um agradecimento',
      register: 'neutral',
    },
    {
      english: 'Desculpa.',
      context: 'Pedir desculpa (informal)',
      register: 'informal',
    },
    {
      english: 'Desculpe.',
      context: 'Pedir desculpa (formal)',
      register: 'formal',
    },
    { english: 'Lamento.', context: 'Exprimir pesar', register: 'neutral' },
    {
      english: 'Não há problema.',
      context: 'Tranquilizar após um pedido de desculpas',
      register: 'neutral',
    },
    {
      english: 'Podes ajudar-me?',
      context: 'Pedir ajuda (informal)',
      register: 'informal',
    },
    {
      english: 'Pode ajudar-me?',
      context: 'Pedir ajuda (formal)',
      register: 'formal',
    },
    {
      english: 'Posso...?',
      context: 'Pedir autorização (ex: Posso entrar?)',
      register: 'neutral',
    },
    {
      english: 'Não percebo.',
      context: 'Indicar que não se entende',
      register: 'neutral',
    },
  ],
}

const numbersTimeA1: PhrasebookCategory = {
  id: 'numbers_time_a1',
  level: 'A1',
  situation: 'Números e horas',
  icon: '🕒',
  phrases: [
    {
      english: 'Que horas são?',
      context: 'Perguntar as horas',
      register: 'neutral',
    },
    {
      english: 'São três horas.',
      context: 'Dizer a hora exata',
      register: 'neutral',
    },
    {
      english: 'É uma hora.',
      context: 'Dizer uma hora (singular)',
      register: 'neutral',
    },
    {
      english: 'São três e meia.',
      context: 'Dizer a meia hora',
      register: 'neutral',
    },
    {
      english: 'São quinze para as quatro.',
      context: 'Dizer a hora com "para"',
      register: 'neutral',
    },
    {
      english: 'A que horas parte?',
      context: 'Perguntar a hora de partida',
      register: 'neutral',
    },
    {
      english: 'Quanto custa?',
      context: 'Perguntar o preço',
      register: 'neutral',
    },
    {
      english: 'Custa dez euros.',
      context: 'Indicar o preço',
      register: 'neutral',
    },
    {
      english: 'Quantos anos tens?',
      context: 'Perguntar a idade (informal)',
      register: 'informal',
    },
  ],
}

const shoppingBasicA1: PhrasebookCategory = {
  id: 'shopping_basic_a1',
  level: 'A1',
  situation: 'Fazer compras',
  icon: '🛍️',
  phrases: [
    {
      english: 'Quanto custa?',
      context: 'Perguntar o preço',
      register: 'neutral',
    },
    {
      english: 'É muito caro.',
      context: 'Dizer que algo é caro',
      register: 'neutral',
    },
    {
      english: 'Tem algo mais barato?',
      context: 'Pedir uma alternativa mais barata',
      register: 'neutral',
    },
    {
      english: 'Posso pagar com cartão?',
      context: 'Perguntar se aceitam cartão',
      register: 'neutral',
    },
    {
      english: 'Pago em dinheiro.',
      context: 'Indicar pagamento em dinheiro',
      register: 'neutral',
    },
    {
      english: 'Dá-me um recibo, por favor?',
      context: 'Pedir o recibo',
      register: 'formal',
    },
    {
      english: 'Que tamanho usa?',
      context: 'Perguntar o tamanho (loja de roupa)',
      register: 'neutral',
    },
    {
      english: 'Posso experimentar?',
      context: 'Pedir para experimentar uma peça',
      register: 'neutral',
    },
    {
      english: 'Tem isto noutra cor?',
      context: 'Perguntar por variantes de cor',
      register: 'neutral',
    },
    {
      english: 'Levo este, obrigado.',
      context: 'Confirmar a compra (masculino)',
      register: 'neutral',
    },
  ],
}

const askingDirectionsA1: PhrasebookCategory = {
  id: 'asking_directions_a1',
  level: 'A1',
  situation: 'Pedir informações',
  icon: '🗺️',
  phrases: [
    {
      english: 'Desculpe, onde fica a estação?',
      context: 'Perguntar onde fica um lugar',
      register: 'formal',
    },
    {
      english: 'Fica longe?',
      context: 'Perguntar se um lugar é distante',
      register: 'neutral',
    },
    {
      english: 'Fica aqui perto.',
      context: 'Responder que é perto',
      register: 'neutral',
    },
    {
      english: 'Vire à direita.',
      context: 'Dar indicação: direita',
      register: 'neutral',
    },
    {
      english: 'Vire à esquerda.',
      context: 'Dar indicação: esquerda',
      register: 'neutral',
    },
    {
      english: 'Siga sempre em frente.',
      context: 'Dar indicação: em frente',
      register: 'neutral',
    },
    {
      english: 'Fica na esquina.',
      context: 'Indicar a posição na esquina',
      register: 'neutral',
    },
    {
      english: 'Onde fica a casa de banho?',
      context: 'Perguntar pela casa de banho',
      register: 'neutral',
    },
    {
      english: 'Há uma farmácia aqui perto?',
      context: 'Perguntar por um serviço específico',
      register: 'neutral',
    },
    {
      english: 'Estou perdido / perdida.',
      context: 'Dizer que se está perdido',
      register: 'neutral',
    },
  ],
}

// ─── A2 Categories ────────────────────────────────────────────────────────────

const restaurantA2: PhrasebookCategory = {
  id: 'restaurant_a2',
  level: 'A2',
  situation: 'No restaurante',
  icon: '🍽️',
  phrases: [
    {
      english: 'Tem uma mesa para dois?',
      context: 'Pedir uma mesa',
      register: 'neutral',
    },
    {
      english: 'Reservei em nome Silva.',
      context: 'Dizer que se reservou',
      register: 'neutral',
    },
    {
      english: 'Posso ver a ementa?',
      context: 'Pedir a ementa',
      register: 'neutral',
    },
    {
      english: 'O que me recomenda?',
      context: 'Pedir um conselho ao empregado',
      register: 'neutral',
    },
    {
      english: 'Quero o bacalhau à Brás.',
      context: 'Pedir um prato',
      register: 'neutral',
    },
    {
      english: 'Para beber quero uma água sem gás.',
      context: 'Pedir uma bebida',
      register: 'neutral',
    },
    {
      english: 'A conta, por favor.',
      context: 'Pedir a conta',
      register: 'neutral',
    },
    {
      english: 'Está tudo ótimo!',
      context: 'Fazer um elogio ao cozinheiro',
      register: 'neutral',
    },
    {
      english: 'Sou alérgico/a a...',
      context: 'Avisar de uma alergia',
      register: 'neutral',
    },
    {
      english: 'Pode trazer-me mais pão?',
      context: 'Pedir algo mais',
      register: 'formal',
    },
    {
      english: 'Têm pratos vegetarianos?',
      context: 'Perguntar por opções vegetarianas',
      register: 'neutral',
    },
    {
      english: 'O couvert está incluído?',
      context: 'Perguntar sobre o couvert',
      register: 'neutral',
    },
    {
      english: 'Podemos dividir a conta?',
      context: 'Pedir para dividir a conta',
      register: 'neutral',
    },
  ],
}

const transportBookingA2: PhrasebookCategory = {
  id: 'transport_booking_a2',
  level: 'A2',
  situation: 'Viagens e transportes',
  icon: '🚆',
  phrases: [
    {
      english: 'Um bilhete para Lisboa, por favor.',
      context: 'Comprar um bilhete de comboio',
      register: 'neutral',
    },
    {
      english: 'Só ida ou ida e volta?',
      context: 'Perguntar o tipo de bilhete',
      register: 'neutral',
    },
    {
      english: 'De que linha parte?',
      context: 'Perguntar a linha',
      register: 'neutral',
    },
    {
      english: 'O comboio está atrasado.',
      context: 'Informar de um atraso',
      register: 'neutral',
    },
    {
      english: 'Onde fica a paragem do autocarro?',
      context: 'Perguntar pela paragem',
      register: 'neutral',
    },
    {
      english: 'Quanto tempo demora?',
      context: 'Perguntar a duração da viagem',
      register: 'neutral',
    },
    {
      english: 'Gostaria de alugar um carro.',
      context: 'Alugar um carro',
      register: 'formal',
    },
    {
      english: 'Há um autocarro para o aeroporto?',
      context: 'Perguntar transporte para o aeroporto',
      register: 'neutral',
    },
    {
      english: 'A que horas parte o próximo comboio?',
      context: 'Perguntar horário do próximo comboio',
      register: 'neutral',
    },
    {
      english: 'Tenho de fazer transbordo?',
      context: 'Perguntar por transbordos',
      register: 'neutral',
    },
    {
      english: 'Onde posso comprar os bilhetes?',
      context: 'Perguntar onde comprar bilhetes',
      register: 'neutral',
    },
  ],
}

const weatherTalkA2: PhrasebookCategory = {
  id: 'weather_talk_a2',
  level: 'A2',
  situation: 'Falar do tempo',
  icon: '🌤️',
  phrases: [
    {
      english: 'Como está o tempo hoje?',
      context: 'Perguntar sobre o tempo',
      register: 'neutral',
    },
    {
      english: 'Está sol.',
      context: 'Dizer que está sol',
      register: 'neutral',
    },
    {
      english: 'Está a chover.',
      context: 'Dizer que está a chover',
      register: 'neutral',
    },
    {
      english: 'Está muito calor hoje.',
      context: 'Comentar o calor',
      register: 'neutral',
    },
    {
      english: 'Que frio que está!',
      context: 'Comentar o frio',
      register: 'neutral',
    },
    {
      english: 'Está nublado.',
      context: 'Descrever céu nublado',
      register: 'neutral',
    },
    {
      english: 'Que dia tão bonito!',
      context: 'Comentar um dia bonito',
      register: 'neutral',
    },
    {
      english: 'Amanhã deve nevar.',
      context: 'Previsão de neve',
      register: 'neutral',
    },
    {
      english: 'Está vento hoje.',
      context: 'Dizer que está vento',
      register: 'neutral',
    },
  ],
}

const makingPlansA2: PhrasebookCategory = {
  id: 'making_plans_a2',
  level: 'A2',
  situation: 'Fazer planos',
  icon: '📅',
  phrases: [
    {
      english: 'Estás livre esta noite?',
      context: 'Perguntar disponibilidade (informal)',
      register: 'informal',
    },
    {
      english: 'Apetece-te ir ao cinema?',
      context: 'Convidar alguém (informal)',
      register: 'informal',
    },
    {
      english: 'A que horas nos encontramos?',
      context: 'Combinar a hora',
      register: 'neutral',
    },
    {
      english: 'Encontramo-nos na praça às oito.',
      context: 'Combinar lugar e hora',
      register: 'neutral',
    },
    {
      english: 'Lamento, não posso.',
      context: 'Recusar um convite',
      register: 'neutral',
    },
    {
      english: 'Com certeza! / Com muito gosto!',
      context: 'Aceitar um convite',
      register: 'neutral',
    },
    {
      english: 'Que tal irmos tomar um café?',
      context: 'Propor uma atividade',
      register: 'informal',
    },
    {
      english: 'Podemos adiar para amanhã?',
      context: 'Pedir para adiar',
      register: 'neutral',
    },
    {
      english: 'Até logo!',
      context: 'Despedir-se marcando encontro',
      register: 'informal',
    },
    {
      english: 'Passo por ti às sete.',
      context: 'Oferecer boleia',
      register: 'informal',
    },
    {
      english: 'Onde nos encontramos?',
      context: 'Perguntar o lugar do encontro',
      register: 'neutral',
    },
  ],
}

const feelingsA2: PhrasebookCategory = {
  id: 'feelings_a2',
  level: 'A2',
  situation: 'Exprimir emoções',
  icon: '😊',
  phrases: [
    {
      english: 'Estou feliz.',
      context: 'Exprimir felicidade',
      register: 'neutral',
    },
    {
      english: 'Estou triste.',
      context: 'Exprimir tristeza',
      register: 'neutral',
    },
    {
      english: 'Estou cansado / cansada.',
      context: 'Exprimir cansaço',
      register: 'neutral',
    },
    { english: 'Tenho fome.', context: 'Exprimir fome', register: 'neutral' },
    { english: 'Tenho sede.', context: 'Exprimir sede', register: 'neutral' },
    { english: 'Tenho medo.', context: 'Exprimir medo', register: 'neutral' },
    {
      english: 'Estou zangado / zangada.',
      context: 'Exprimir raiva',
      register: 'neutral',
    },
    {
      english: 'Estou preocupado / preocupada.',
      context: 'Exprimir preocupação',
      register: 'neutral',
    },
    {
      english: 'Estou entusiasmado / entusiasmada!',
      context: 'Exprimir entusiasmo',
      register: 'neutral',
    },
    {
      english: 'Estou aborrecido / aborrecida.',
      context: 'Exprimir aborrecimento',
      register: 'neutral',
    },
    {
      english: 'Que stress!',
      context: 'Exprimir stress',
      register: 'informal',
    },
  ],
}

// ─── B1 Categories ────────────────────────────────────────────────────────────

const phoneCallsB1: PhrasebookCategory = {
  id: 'phone_calls_b1',
  level: 'B1',
  situation: 'Chamadas telefónicas',
  icon: '📞',
  phrases: [
    {
      english: 'Estou? / Está lá?',
      context: 'Atender o telefone',
      register: 'neutral',
    },
    {
      english: 'Posso falar com o senhor Silva?',
      context: 'Pedir para falar com alguém (formal)',
      register: 'formal',
    },
    {
      english: 'Está a Maria?',
      context: 'Perguntar por alguém (informal)',
      register: 'informal',
    },
    {
      english: 'Um momento, vou chamá-la.',
      context: 'Passar a chamada (informal)',
      register: 'informal',
    },
    {
      english: 'Pode ligar mais tarde?',
      context: 'Pedir para ligar mais tarde',
      register: 'formal',
    },
    {
      english: 'Não se ouve bem.',
      context: 'Indicar problemas de linha',
      register: 'informal',
    },
    {
      english: 'Está a ouvir-me?',
      context: 'Verificar se o interlocutor ouve',
      register: 'neutral',
    },
    {
      english: 'É engano.',
      context: 'Informar que é um número errado',
      register: 'neutral',
    },
    {
      english: 'Posso deixar uma mensagem?',
      context: 'Oferecer para deixar mensagem',
      register: 'neutral',
    },
    {
      english: 'Ligo-lhe assim que puder.',
      context: 'Prometer voltar a ligar',
      register: 'neutral',
    },
    {
      english: 'Quem fala?',
      context: 'Perguntar quem está a ligar',
      register: 'neutral',
    },
  ],
}

const jobInterviewB1: PhrasebookCategory = {
  id: 'job_interview_b1',
  level: 'B1',
  situation: 'Entrevistas de emprego',
  icon: '💼',
  phrases: [
    {
      english: 'Bom dia, tenho uma entrevista às dez.',
      context: 'Apresentar-se na receção',
      register: 'formal',
    },
    {
      english: 'Estudei economia na universidade.',
      context: 'Falar do percurso académico',
      register: 'neutral',
    },
    {
      english: 'Tenho experiência no setor.',
      context: 'Falar da experiência profissional',
      register: 'neutral',
    },
    {
      english: 'Falo três línguas: português, inglês e espanhol.',
      context: 'Listar as competências linguísticas',
      register: 'neutral',
    },
    {
      english: 'Sou uma pessoa organizada e responsável.',
      context: 'Descrever as próprias qualidades',
      register: 'neutral',
    },
    {
      english: 'Gosto de trabalhar em equipa.',
      context: 'Falar do trabalho em equipa',
      register: 'neutral',
    },
    {
      english: 'Quais são os horários de trabalho?',
      context: 'Perguntar sobre o horário',
      register: 'neutral',
    },
    {
      english: 'Que tipo de contrato oferecem?',
      context: 'Perguntar sobre o contrato',
      register: 'formal',
    },
    {
      english: 'Quando saberei o resultado da entrevista?',
      context: 'Perguntar prazos de resposta',
      register: 'formal',
    },
    {
      english: 'Obrigado pela oportunidade.',
      context: 'Agradecer no final da entrevista',
      register: 'formal',
    },
  ],
}

const givingOpinionsB1: PhrasebookCategory = {
  id: 'giving_opinions_b1',
  level: 'B1',
  situation: 'Dar opiniões',
  icon: '💬',
  phrases: [
    {
      english: 'Na minha opinião é uma boa ideia.',
      context: 'Exprimir a própria opinião',
      register: 'neutral',
    },
    {
      english: 'Não concordo.',
      context: 'Exprimir desacordo',
      register: 'neutral',
    },
    {
      english: 'Tens razão.',
      context: 'Dar razão a alguém',
      register: 'neutral',
    },
    {
      english: 'Talvez estejas enganado.',
      context: 'Exprimir desacordo suave',
      register: 'neutral',
    },
    {
      english: 'Não tenho a certeza.',
      context: 'Exprimir incerteza',
      register: 'neutral',
    },
    {
      english: 'Depende.',
      context: 'Evitar uma resposta categórica',
      register: 'neutral',
    },
    {
      english: 'Do meu ponto de vista...',
      context: 'Introduzir a própria perspetiva',
      register: 'neutral',
    },
    {
      english: 'O que achas?',
      context: 'Pedir uma opinião (informal)',
      register: 'informal',
    },
    {
      english: 'O que acha?',
      context: 'Pedir uma opinião (formal)',
      register: 'formal',
    },
    {
      english: 'Discordo completamente.',
      context: 'Exprimir forte desacordo',
      register: 'formal',
    },
    {
      english: 'De facto, tens toda a razão.',
      context: 'Admitir que o outro tem razão',
      register: 'neutral',
    },
    {
      english: 'Permita-me discordar.',
      context: 'Introduzir educadamente um desacordo',
      register: 'formal',
    },
  ],
}

const healthAppointmentsB1: PhrasebookCategory = {
  id: 'health_appointments_b1',
  level: 'B1',
  situation: 'Saúde e consultas médicas',
  icon: '🏥',
  phrases: [
    {
      english: 'Gostaria de marcar uma consulta.',
      context: 'Marcar uma consulta',
      register: 'formal',
    },
    {
      english: 'Tenho dores de cabeça há dois dias.',
      context: 'Descrever um sintoma',
      register: 'neutral',
    },
    {
      english: 'Dói-me aqui.',
      context: 'Indicar onde se sente dor',
      register: 'neutral',
    },
    {
      english: 'Tenho febre.',
      context: 'Dizer que se tem febre',
      register: 'neutral',
    },
    {
      english: 'Sou alérgico/a à penicilina.',
      context: 'Declarar uma alergia',
      register: 'neutral',
    },
    {
      english: 'Preciso de uma receita?',
      context: 'Perguntar sobre a prescrição',
      register: 'neutral',
    },
    {
      english: 'Tome este medicamento duas vezes ao dia.',
      context: 'Receber instruções sobre o medicamento',
      register: 'formal',
    },
    {
      english: 'Quando posso vir?',
      context: 'Perguntar por disponibilidade',
      register: 'neutral',
    },
    {
      english: 'Preciso de um atestado médico.',
      context: 'Pedir um atestado',
      register: 'formal',
    },
    { english: 'É urgente.', context: 'Indicar urgência', register: 'neutral' },
  ],
}

// ─── B2 Categories ────────────────────────────────────────────────────────────

const formalEmailsB2: PhrasebookCategory = {
  id: 'formal_emails_b2',
  level: 'B2',
  situation: 'Emails formais e correspondência',
  icon: '📧',
  phrases: [
    {
      english: 'Exmo. Sr. Dr. Silva,',
      context: 'Abertura de email formal (homem)',
      register: 'formal',
    },
    {
      english: 'Exma. Sra. Professora Sousa,',
      context: 'Abertura de email formal (mulher)',
      register: 'formal',
    },
    {
      english: 'Em anexo envio o documento solicitado.',
      context: 'Enviar um anexo',
      register: 'formal',
    },
    {
      english: 'Agradeço a sua disponibilidade.',
      context: 'Agradecer a disponibilidade',
      register: 'formal',
    },
    {
      english: 'Fico a aguardar a sua resposta.',
      context: 'Pedir uma resposta educadamente',
      register: 'formal',
    },
    {
      english: 'Na sequência do seu email de...',
      context: 'Referir uma comunicação anterior',
      register: 'formal',
    },
    {
      english: 'Escrevo para solicitar informações sobre...',
      context: 'Introduzir o objetivo do email',
      register: 'formal',
    },
    {
      english: 'Com os melhores cumprimentos,',
      context: 'Fecho formal padrão',
      register: 'formal',
    },
    {
      english: 'Atenciosamente,',
      context: 'Fecho muito formal',
      register: 'formal',
    },
    {
      english: 'Peço desculpa pela demora na resposta.',
      context: 'Desculpar-se pela demora',
      register: 'formal',
    },
    {
      english: 'Permito-me solicitar uma resposta.',
      context: 'Solicitar uma resposta',
      register: 'formal',
    },
  ],
}

const negotiationsB2: PhrasebookCategory = {
  id: 'negotiations_b2',
  level: 'B2',
  situation: 'Discussões e negociações',
  icon: '🤝',
  phrases: [
    {
      english: 'Proponho um compromisso.',
      context: 'Propor um compromisso',
      register: 'formal',
    },
    {
      english: 'Vamos tentar chegar a um acordo.',
      context: 'Convidar a negociar',
      register: 'neutral',
    },
    {
      english: 'Qual é a vossa proposta?',
      context: 'Pedir uma proposta',
      register: 'neutral',
    },
    {
      english: 'Parece-me uma oferta razoável.',
      context: 'Avaliar positivamente',
      register: 'neutral',
    },
    {
      english: 'Infelizmente não podemos aceitar estas condições.',
      context: 'Recusar educadamente',
      register: 'formal',
    },
    {
      english: 'Poderíamos rever os termos do contrato?',
      context: 'Pedir para renegociar',
      register: 'formal',
    },
    {
      english: 'Estamos dispostos a negociar o preço.',
      context: 'Mostrar flexibilidade no preço',
      register: 'neutral',
    },
    {
      english: 'Gostaria de ter tempo para avaliar.',
      context: 'Ganhar tempo para decidir',
      register: 'neutral',
    },
    {
      english: 'Podemos encontrar uma solução vantajosa para ambos.',
      context: 'Propor solução win-win',
      register: 'formal',
    },
    {
      english: 'Vamos pôr por escrito.',
      context: 'Pedir confirmação escrita',
      register: 'neutral',
    },
  ],
}

const academicDiscussionB2: PhrasebookCategory = {
  id: 'academic_discussion_b2',
  level: 'B2',
  situation: 'Discussões académicas',
  icon: '🎓',
  phrases: [
    {
      english: 'Segundo a minha investigação...',
      context: 'Introduzir os próprios resultados',
      register: 'formal',
    },
    {
      english: 'Este dado apoia a hipótese inicial.',
      context: 'Relacionar dados e hipótese',
      register: 'formal',
    },
    {
      english: 'Pelo contrário, os estudos de Silva sugerem que...',
      context: 'Contrapor investigações diferentes',
      register: 'formal',
    },
    {
      english: 'É importante sublinhar que...',
      context: 'Enfatizar um ponto',
      register: 'formal',
    },
    {
      english: 'A metodologia utilizada apresenta algumas limitações.',
      context: 'Reconhecer limites da investigação',
      register: 'formal',
    },
    {
      english: 'Esta conclusão é apoiada por evidências empíricas.',
      context: 'Reforçar uma afirmação',
      register: 'formal',
    },
    {
      english: 'Poderia esclarecer melhor este ponto?',
      context: 'Pedir esclarecimentos académicos',
      register: 'formal',
    },
    {
      english: 'O tema foi amplamente debatido na literatura.',
      context: 'Referir literatura existente',
      register: 'formal',
    },
    {
      english: 'Considero que esta interpretação é discutível.',
      context: 'Exprimir desacordo académico',
      register: 'formal',
    },
    {
      english: 'Em síntese, os resultados indicam que...',
      context: 'Resumir conclusões',
      register: 'formal',
    },
  ],
}

// ─── C1 Categories ────────────────────────────────────────────────────────────

const presentationsC1: PhrasebookCategory = {
  id: 'presentations_c1',
  level: 'C1',
  situation: 'Apresentações e public speaking',
  icon: '🎤',
  phrases: [
    {
      english: 'Senhoras e senhores, bom dia.',
      context: 'Abertura formal de uma apresentação',
      register: 'formal',
    },
    {
      english: 'Hoje gostaria de vos falar de um tema que me é muito caro.',
      context: 'Introduzir o tema com envolvimento emotivo',
      register: 'formal',
    },
    {
      english: 'A minha apresentação está dividida em três partes.',
      context: 'Ilustrar a estrutura',
      register: 'formal',
    },
    {
      english: 'Como podem ver neste diapositivo...',
      context: 'Comentar um slide',
      register: 'formal',
    },
    {
      english: 'Para aprofundar este aspeto...',
      context: 'Aprofundar um ponto',
      register: 'formal',
    },
    {
      english: 'Gostaria de chamar a vossa atenção para este gráfico.',
      context: 'Atrair a atenção para um dado visual',
      register: 'formal',
    },
    {
      english: 'Permitam-me abrir um breve parêntesis.',
      context: 'Fazer uma digressão',
      register: 'formal',
    },
    {
      english: 'Em conclusão, considero fundamental sublinhar que...',
      context: 'Concluir com ênfase',
      register: 'formal',
    },
    {
      english: 'Agradeço a vossa atenção.',
      context: 'Agradecer no final',
      register: 'formal',
    },
    {
      english: 'Se houver perguntas, estou à vossa disposição.',
      context: 'Abrir às perguntas',
      register: 'formal',
    },
    {
      english: 'Para resumir o que foi dito até agora...',
      context: 'Resumir a meio da apresentação',
      register: 'formal',
    },
    {
      english: 'Gostaria de concluir com uma citação de...',
      context: 'Fechar com uma citação',
      register: 'formal',
    },
    {
      english: 'Passo agora à segunda parte.',
      context: 'Transição entre secções',
      register: 'formal',
    },
  ],
}

const complexArgumentsC1: PhrasebookCategory = {
  id: 'complex_arguments_c1',
  level: 'C1',
  situation: 'Argumentações complexas',
  icon: '🧠',
  phrases: [
    {
      english:
        'Reconhecendo embora a validade das suas observações, discordaria.',
      context: 'Concessão seguida de objeção',
      register: 'formal',
    },
    {
      english: 'É inegável que os dados mostram uma tendência preocupante.',
      context: 'Afirmar um facto indiscutível',
      register: 'formal',
    },
    {
      english:
        'Contudo, há que considerar também o contexto em que estes eventos ocorreram.',
      context: 'Introduzir um contra-argumento',
      register: 'formal',
    },
    {
      english: 'A meu ver, o ponto crucial da questão reside no facto de...',
      context: 'Identificar o ponto central',
      register: 'formal',
    },
    {
      english: 'Não se pode prescindir das implicações éticas desta escolha.',
      context: 'Levantar questões éticas',
      register: 'formal',
    },
    {
      english:
        'Embora a proposta seja aliciante, comporta riscos não negligenciáveis.',
      context: 'Usar concessiva com conjuntivo',
      register: 'formal',
    },
    {
      english: 'Poder-se-ia objetar que os custos são excessivos.',
      context: 'Apresentar uma possível objeção',
      register: 'formal',
    },
    {
      english:
        'Seria redutor limitarmo-nos a uma só interpretação do fenómeno.',
      context: 'Criticar uma visão limitada',
      register: 'formal',
    },
    {
      english: 'A questão merece ser examinada de uma perspetiva mais ampla.',
      context: 'Pedir uma visão mais ampla',
      register: 'formal',
    },
    {
      english:
        'É uma tese fascinante, mas a meu ver não resiste a uma análise aprofundada.',
      context: 'Refutar com elegância',
      register: 'formal',
    },
    {
      english: 'Se é verdade que X, daí não decorre necessariamente Y.',
      context: 'Desmontar uma falácia lógica',
      register: 'formal',
    },
    {
      english: 'Considero que se trata de uma simplificação excessiva.',
      context: 'Criticar uma simplificação',
      register: 'formal',
    },
  ],
}

const professionalNetworkingC1: PhrasebookCategory = {
  id: 'professional_networking_c1',
  level: 'C1',
  situation: 'Networking profissional',
  icon: '🤝',
  phrases: [
    {
      english:
        'Muito prazer em conhecê-lo. Tenho acompanhado com interesse o seu trabalho.',
      context: 'Apresentar-se com um elogio profissional',
      register: 'formal',
    },
    {
      english: 'Teria muito gosto em aprofundar uma possível colaboração.',
      context: 'Propor uma colaboração',
      register: 'formal',
    },
    {
      english: 'Trabalho no setor há mais de dez anos.',
      context: 'Descrever a experiência profissional',
      register: 'neutral',
    },
    {
      english: 'Ocupo-me sobretudo de desenvolvimento internacional.',
      context: 'Descrever o próprio cargo',
      register: 'neutral',
    },
    {
      english: 'Posso deixar-lhe o meu cartão de visita?',
      context: 'Oferecer o cartão de visita',
      register: 'formal',
    },
    {
      english: 'Seria um prazer manter o contacto.',
      context: 'Exprimir desejo de manter contacto',
      register: 'formal',
    },
    {
      english: 'A nossa empresa está interessada em explorar novas parcerias.',
      context: 'Aludir a oportunidades de negócio',
      register: 'formal',
    },
    {
      english: 'Apreciei muito a sua intervenção no congresso.',
      context: 'Fazer um elogio específico',
      register: 'formal',
    },
    {
      english: 'Poderíamos marcar uma reunião para discutir mais a fundo.',
      context: 'Propor um encontro futuro',
      register: 'formal',
    },
    {
      english:
        'Se me permite, sugerir-lhe-ia que contactasse o nosso escritório.',
      context: 'Dar uma sugestão profissional',
      register: 'formal',
    },
  ],
}

const conflictResolutionC1: PhrasebookCategory = {
  id: 'conflict_resolution_c1',
  level: 'C1',
  situation: 'Resolução de conflitos',
  icon: '🕊️',
  phrases: [
    {
      english:
        'Compreendo o seu ponto de vista, mas gostaria de esclarecer melhor a nossa posição.',
      context: 'Mostrar compreensão antes de discordar',
      register: 'formal',
    },
    {
      english: 'É possível que tenha havido um mal-entendido.',
      context: 'Colocar a hipótese de um equívoco',
      register: 'neutral',
    },
    {
      english:
        'O objetivo comum deveria ser encontrar uma solução que satisfaça ambos.',
      context: 'Recordar o objetivo comum',
      register: 'formal',
    },
    {
      english: 'Estou disposto/a a reconsiderar a minha posição se...',
      context: 'Mostrar flexibilidade condicionada',
      register: 'neutral',
    },
    {
      english:
        'Considero que a transparência é fundamental para resolver a questão.',
      context: 'Invocar transparência',
      register: 'formal',
    },
    {
      english: 'Não era minha intenção faltar ao respeito.',
      context: 'Desculpar-se por uma ofensa involuntária',
      register: 'formal',
    },
    {
      english:
        'Proponho darmos um passo atrás e recomeçarmos pelos pontos em que concordamos.',
      context: 'Propor um reset da discussão',
      register: 'neutral',
    },
    {
      english: 'Estou certo/a de que conseguiremos chegar a um entendimento.',
      context: 'Exprimir otimismo construtivo',
      register: 'formal',
    },
    {
      english: 'Peço desculpa se as minhas palavras foram mal interpretadas.',
      context: 'Desculpar-se por um mal-entendido',
      register: 'formal',
    },
    {
      english:
        'Envolvamos um mediador se acharmos que não conseguimos resolver sozinhos.',
      context: 'Propor mediação externa',
      register: 'formal',
    },
  ],
}

// ─── C2 Categories ────────────────────────────────────────────────────────────

const rhetoricC2: PhrasebookCategory = {
  id: 'rhetoric_c2',
  level: 'C2',
  situation: 'Retórica e persuasão',
  icon: '⚖️',
  phrases: [
    {
      english: 'Não há sombra de dúvida de que as evidências falam por si.',
      context: 'Reforçar uma afirmação com força retórica',
      register: 'formal',
    },
    {
      english: 'Quem ousaria afirmar o contrário?',
      context: 'Pergunta retórica para reforçar a tese',
      register: 'formal',
    },
    {
      english:
        'Chegou o momento de enfrentar a verdade, por mais incómoda que seja.',
      context: 'Apelo emotivo à verdade',
      register: 'formal',
    },
    {
      english: 'Não podemos ficar inertes perante uma tão grande injustiça.',
      context: 'Apelo à ação',
      register: 'formal',
    },
    {
      english: 'As consequências de uma falta de ação seriam catastróficas.',
      context: 'Aviso sobre as consequências',
      register: 'formal',
    },
    {
      english:
        'Invoco o vosso sentido de responsabilidade para com as gerações futuras.',
      context: 'Apelo às gerações futuras',
      register: 'formal',
    },
    {
      english:
        'Isto não é uma questão de direita ou de esquerda, mas de bom senso.',
      context: 'Ultrapassar divisões políticas',
      register: 'formal',
    },
    {
      english:
        'Deixem-me contar-vos uma história que ilustra melhor do que mil palavras o que pretendo dizer.',
      context: 'Usar uma narrativa persuasiva',
      register: 'formal',
    },
    {
      english:
        'Estamos numa encruzilhada histórica, e a escolha que fizermos hoje definirá o nosso futuro.',
      context: 'Criar urgência histórica',
      register: 'formal',
    },
    {
      english: 'Não nos iludamos: a estrada é íngreme, mas é transitável.',
      context: 'Reconhecer dificuldades mas infundir esperança',
      register: 'formal',
    },
    {
      english: 'Quem não faz parte da solução faz parte do problema.',
      context: 'Dicotomia retórica',
      register: 'formal',
    },
    {
      english: 'Permitam-me sonhar por um instante com um mundo em que...',
      context: 'Abertura visionária',
      register: 'formal',
    },
  ],
}

const nuancedDiscourseC2: PhrasebookCategory = {
  id: 'nuanced_discourse_c2',
  level: 'C2',
  situation: 'Discurso matizado e hedging',
  icon: '🔬',
  phrases: [
    {
      english:
        'Na minha modesta opinião, a questão é bem mais complexa do que parece à primeira vista.',
      context: 'Minimizar a própria opinião por diplomacia',
      register: 'formal',
    },
    {
      english: 'Não se pode excluir à partida que tenha havido mal-entendidos.',
      context: 'Abrir a possibilidades alternativas',
      register: 'formal',
    },
    {
      english:
        'Tenderia a crer que as coisas são diferentes, mas estou pronto/a a mudar de ideias.',
      context: 'Exprimir opinião com abertura à mudança',
      register: 'formal',
    },
    {
      english:
        'Seria arriscado tirar conclusões definitivas com base nos dados atuais.',
      context: 'Alertar contra conclusões precipitadas',
      register: 'formal',
    },
    {
      english:
        'No que me diz respeito, não haveria objeções de princípio, mas haveria que avaliar os detalhes operacionais.',
      context: 'Acordo condicionado',
      register: 'formal',
    },
    {
      english:
        'Admitindo, sem conceder, que a premissa seja correta, a conclusão não é evidente.',
      context: 'Aceitar hipoteticamente uma premissa',
      register: 'formal',
    },
    {
      english:
        'Não gostaria que as minhas palavras fossem interpretadas como uma crítica, mas antes como uma sugestão de reflexão.',
      context: 'Atenuar uma potencial crítica',
      register: 'formal',
    },
    {
      english:
        'É verosímil que a situação evolua numa direção diferente da prevista.',
      context: 'Exprimir probabilidade com cautela',
      register: 'formal',
    },
    {
      english: 'Longe de mim a ideia de querer impor a minha visão.',
      context: 'Prevenir acusações de arrogância',
      register: 'formal',
    },
    {
      english:
        'Poder-se-ia talvez arriscar a hipótese de as causas serem mais profundas.',
      context: 'Propor hipótese com cautela',
      register: 'formal',
    },
    {
      english:
        'É inegavelmente um passo em frente, embora subsistam algumas dificuldades.',
      context: 'Equilibrar elogio e crítica',
      register: 'formal',
    },
    {
      english:
        'Seria cauteloso/a em atribuir pura e simplesmente a responsabilidade a um único fator.',
      context: 'Alertar contra atribuições simplistas',
      register: 'formal',
    },
  ],
}

const legalContractualC2: PhrasebookCategory = {
  id: 'legal_contractual_c2',
  level: 'C2',
  situation: 'Linguagem jurídica e contratual',
  icon: '📜',
  phrases: [
    {
      english:
        'Nos termos do artigo 3.º do presente contrato, as partes acordam no seguinte.',
      context: 'Referência a uma cláusula contratual',
      register: 'formal',
    },
    {
      english: 'O presente acordo é regido pela lei portuguesa.',
      context: 'Especificar a jurisdição',
      register: 'formal',
    },
    {
      english: 'Sem prejuízo do disposto no número anterior.',
      context: 'Fazer uma reserva legal',
      register: 'formal',
    },
    {
      english:
        'O presente documento constitui a totalidade do acordo entre as partes.',
      context: 'Cláusula de integralidade contratual',
      register: 'formal',
    },
    {
      english:
        'Qualquer alteração deverá ser feita por escrito e assinada por ambas as partes.',
      context: 'Cláusula de alteração',
      register: 'formal',
    },
    {
      english:
        'A parte inadimplente será responsável pelo pagamento de perdas e danos.',
      context: 'Cláusula de incumprimento',
      register: 'formal',
    },
    {
      english: 'As partes elegem domicílio nas respetivas sedes sociais.',
      context: 'Eleição de domicílio',
      register: 'formal',
    },
    {
      english: 'O contrato é nulo quando contrário a normas imperativas.',
      context: 'Cláusula de nulidade',
      register: 'formal',
    },
    {
      english: 'Por ser verdade, as partes assinam o presente documento.',
      context: 'Fórmula de fecho legal',
      register: 'formal',
    },
    {
      english:
        'O presente ato está sujeito a registo na Autoridade Tributária.',
      context: 'Obrigação de registo',
      register: 'formal',
    },
    {
      english: 'Os litígios serão dirimidos no foro competente de Lisboa.',
      context: 'Cláusula do foro competente',
      register: 'formal',
    },
  ],
}

const socialCommentaryC2: PhrasebookCategory = {
  id: 'social_commentary_c2',
  level: 'C2',
  situation: 'Comentário social e debate',
  icon: '🗞️',
  phrases: [
    {
      english: 'A sociedade contemporânea enfrenta desafios sem precedentes.',
      context: 'Abertura de um comentário social',
      register: 'formal',
    },
    {
      english:
        'O fosso entre ricos e pobres está a aumentar de forma alarmante.',
      context: 'Denúncia de desigualdade',
      register: 'formal',
    },
    {
      english:
        'É indispensável uma mudança de paradigma se quisermos garantir um futuro sustentável.',
      context: 'Apelo à mudança',
      register: 'formal',
    },
    {
      english:
        'Já não podemos dar-nos ao luxo de ignorar as consequências das nossas ações no planeta.',
      context: 'Apelo ecológico',
      register: 'formal',
    },
    {
      english:
        'A crise que atravessamos não é apenas económica, mas também de valores.',
      context: 'Análise multidimensional',
      register: 'formal',
    },
    {
      english:
        'As novas tecnologias oferecem oportunidades extraordinárias, mas também levantam interrogações éticas inquietantes.',
      context: 'Equilibrar progresso e riscos',
      register: 'formal',
    },
    {
      english:
        'Assistimos a uma progressiva erosão da confiança nas instituições democráticas.',
      context: 'Análise política',
      register: 'formal',
    },
    {
      english:
        'É nosso dever moral empenharmo-nos por uma sociedade mais justa e inclusiva.',
      context: 'Apelo moral',
      register: 'formal',
    },
    {
      english:
        'O debate público foi contaminado por uma onda de desinformação sem precedentes.',
      context: 'Crítica dos media',
      register: 'formal',
    },
    {
      english:
        'A cultura, entendida no seu sentido mais amplo, é o único verdadeiro antídoto contra a intolerância.',
      context: 'Elogio da cultura',
      register: 'formal',
    },
    {
      english:
        'Sem uma educação de qualidade, qualquer discurso sobre progresso social está condenado a ser letra morta.',
      context: 'Defesa da educação',
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
