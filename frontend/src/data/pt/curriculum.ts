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
    title: 'Beginner Portuguese',
    description:
      'Greetings, introductions, basic grammar and everyday vocabulary.',
    default_duration_weeks: 8,
    units: [
      {
        id: 'a1-unit-1',
        level: 'A1',
        unit_number: 1,
        title: 'Saudações e Apresentações',
        default_weeks: [1, 2],
        grammar_points: [
          'ser',
          'estar',
          'pronomes-sujeito',
          'artigos-definidos',
        ],
        vocabulary_set_ids: ['saudações_pt_a1', 'apresentações_pt_a1'],
        lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
        prerequisite_unit: undefined,
        competency_checklist: [
          'Apresenta-se usando ser e estar: Chamo-me Inês, sou portuguesa, tenho 28 anos, estou bem — e usa o tratamento tu/você apropriadamente para pt-PT (tu para informal, o senhor/a senhora para formal)',
          'Cumprimenta e despede-se com o registo correto: olá, bom dia, boa tarde, boa noite, adeus, até logo, tchau (informal)',
          'Usa os artigos definidos o/a/os/as corretamente com os substantivos, aplicando a concordância de género: o livro, a casa, os alunos, as aulas',
          'Distingue ser (identidade, origem, profissão, qualidade inerente) de estar (estado, localização, progressivo) desde o início — uma distinção fundamental do português: Sou de Lisboa vs Estou em Lisboa',
        ],
      },
      {
        id: 'a1-unit-2',
        level: 'A1',
        unit_number: 2,
        title: 'Nacionalidades e Profissões',
        default_weeks: [1, 2],
        grammar_points: [
          'ser-nacionalidade',
          'género-substantivos',
          'artigos-indefinidos',
        ],
        vocabulary_set_ids: ['nacionalidades_pt_a1', 'profissões_pt_a1'],
        lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
        prerequisite_unit: 'a1-unit-1',
        competency_checklist: [
          'Indica nacionalidade e profissão usando ser com a forma masculina/feminina correta: sou inglês/inglesa, sou médico/médica',
          'Aplica a concordância de género: os substantivos portugueses em -o são tipicamente masculinos, -a tipicamente femininos, -e ou consoante podem ser de ambos — e verifica com o artigo',
          'Usa um/uma/uns/umas corretamente: um médico, uma professora, uns amigos, umas casas',
          'Produz uma breve apresentação (4–5 frases) combinando ser, estar, nacionalidade, profissão e idade (com ter: tenho X anos)',
        ],
      },
      {
        id: 'a1-unit-3',
        level: 'A1',
        unit_number: 3,
        title: 'A Família e Descrições',
        default_weeks: [1, 2],
        grammar_points: [
          'ter',
          'adjetivos-possessivos',
          'adjetivos-descritivos',
        ],
        vocabulary_set_ids: ['família_pt_a1', 'descrições_pt_a1'],
        lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
        prerequisite_unit: 'a1-unit-2',
        competency_checklist: [
          'Nomeia os membros da família e usa ter para posse e idade: Tenho dois irmãos, A minha mãe tem 55 anos',
          'Usa os adjetivos possessivos (meu/minha/meus/minhas, teu/tua, seu/sua, nosso/nossa) que em português concordam com o nome possuído, não com o possuidor — e levam sempre o artigo: o meu carro, a minha família',
          'Descreve a aparência física e a personalidade com adjetivos em concordância de género e número: alto/alta/altos/altas, simpático/simpática',
          'Escreve um parágrafo curto (40–50 palavras) descrevendo um familiar usando ser, estar, ter e adjetivos descritivos',
        ],
      },
      {
        id: 'a1-unit-4',
        level: 'A1',
        unit_number: 4,
        title: 'Rotina Diária e Verbos Presente',
        default_weeks: [1, 2],
        grammar_points: ['presente-regular', 'verbos-reflexivos', 'horas'],
        vocabulary_set_ids: ['rotina_pt_a1', 'horas_pt_a1'],
        lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
        prerequisite_unit: 'a1-unit-3',
        competency_checklist: [
          'Conjuga os verbos regulares -ar (falar), -er (comer) e -ir (partir) no presente para as seis pessoas',
          'Usa os verbos reflexivos com o pronome correto, aplicando a ênclise do PE (depois do verbo) como padrão nas frases afirmativas: levanto-me, lavo-me, deito-me',
          'Diz as horas: São duas horas, É uma hora, São três e meia, São quatro menos um quarto — e usa de manhã, de tarde, de noite, à noite',
          'Descreve a rotina diária em 5–6 frases conectadas usando expressões temporais: primeiro, depois, a seguir, por fim',
        ],
      },
      {
        id: 'a1-unit-5',
        level: 'A1',
        unit_number: 5,
        title: 'Gostos e Preferências',
        default_weeks: [1, 2],
        grammar_points: ['gostar-de', 'também-tampouco', 'muito-pouco'],
        vocabulary_set_ids: ['comida_pt_a1', 'atividades_pt_a1'],
        lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
        prerequisite_unit: 'a1-unit-4',
        competency_checklist: [
          'Usa gostar de corretamente: gostar tem uma estrutura sujeito-verbo regular (Eu gosto de pizza) — ao contrário do espanhol gustar ou do italiano piacere, não há inversão de sujeito e objeto em português',
          'Usa gostar de + infinitivo para atividades (Gosto de ler, Não gosto de acordar cedo) e gostar de + nome com a contração obrigatória de + artigo: Gosto do café, Gosto da música',
          'Exprime grau: gosto muito de, gosto bastante de, gosto um pouco de, não gosto nada de',
          'Concorda e discorda: Eu também, Eu também não, Eu sim, Eu não — no PE as formas de resposta são mais diretas do que em algumas outras línguas românicas',
        ],
      },
      {
        id: 'a1-unit-6',
        level: 'A1',
        unit_number: 6,
        title: 'Lugares e Direções',
        default_weeks: [1, 2],
        grammar_points: [
          'estar',
          'haver',
          'preposições-lugar',
          'contrações-preposicionais',
        ],
        vocabulary_set_ids: ['lugares_pt_a1', 'direções_pt_a1'],
        lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
        prerequisite_unit: 'a1-unit-5',
        competency_checklist: [
          'Usa as contrações preposicionais obrigatórias do português: de+o=do, de+a=da, de+os=dos, de+as=das; em+o=no, em+a=na; a+o=ao, a+a=à; por+o=pelo, por+a=pela — estas contrações são obrigatórias e não podem ser evitadas',
          'Distingue há (haver impessoal) para existência de estar para localização: Há um banco aqui perto vs O banco está na esquina',
          'Usa há em expressões temporais exclusivas do português: Há três anos que estudo português',
          'Dá indicações simples: vire à direita/à esquerda, siga em frente, atravesse a rua, tome a primeira rua — usando o imperativo formal',
        ],
      },
      {
        id: 'a1-unit-7',
        level: 'A1',
        unit_number: 7,
        title: 'Planos e Futuro Próximo',
        default_weeks: [1, 2],
        grammar_points: [
          'ir-futuro',
          'querer-poder',
          'dias-semana',
          'estar-a-infinitivo',
        ],
        vocabulary_set_ids: ['transporte_pt_a1', 'clima_pt_a1'],
        lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
        prerequisite_unit: 'a1-unit-6',
        competency_checklist: [
          'Forma ir a + infinitivo para ações planeadas (Vou estudar amanhã, O que vais fazer?) — e compreende que esta é a expressão de futuro mais comum no discurso informal',
          'Usa querer + infinitivo para desejos e poder + infinitivo para capacidade/permissão: Quero ir ao cinema, Não posso vir hoje',
          'Usa estar a + infinitivo para uma ação em progresso — o progressivo do português europeu: Estou a trabalhar, Estás a ouvir música — notando que isto contrasta com o português brasileiro, que usa o gerúndio (estou trabalhando)',
          'Nomeia os dias da semana (segunda-feira, terça-feira, quarta-feira, quinta-feira, sexta-feira, sábado, domingo) e usa-os com preposições: na segunda-feira, ao sábado, aos domingos',
        ],
      },
      {
        id: 'a1-unit-8',
        level: 'A1',
        unit_number: 8,
        title: 'A1 Consolidação',
        default_weeks: [1, 1],
        grammar_points: [
          'ser',
          'estar',
          'ter',
          'presente-regular',
          'verbos-reflexivos',
          'gostar-de',
          'ir-futuro',
          'estar-a-infinitivo',
          'artigos-definidos',
          'contrações-preposicionais',
        ],
        vocabulary_set_ids: ['revisão_pt_a1'],
        lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
        prerequisite_unit: 'a1-unit-7',
        competency_checklist: [
          'Mantém um intercâmbio oral ou escrito simples sobre temas familiares usando ser, estar e o presente sem interrupções importantes',
          'Usa as contrações preposicionais obrigatórias corretamente e aplica a ênclise do PE nas frases afirmativas',
          'Distingue ser de estar nos seus contextos A1 principais e usa estar a + infinitivo para ações em progresso',
          'Lê e compreende um texto quotidiano simples de 60–80 palavras e responde a perguntas factuais',
        ],
      },
    ],
  },
  A2: {
    level: 'A2',
    title: 'Elementary Portuguese',
    description:
      'Past tenses, object pronouns, comparisons and basic conversation.',
    default_duration_weeks: 8,
    units: [
      {
        id: 'a2-unit-1',
        level: 'A2',
        unit_number: 1,
        title: 'Pretérito Perfeito Simples',
        default_weeks: [1, 2],
        grammar_points: [
          'pretérito-perfeito-regular',
          'marcadores-temporais',
          'pretérito-perfeito-irregular',
        ],
        vocabulary_set_ids: ['viagens_pt_a2', 'experiências_pt_a2'],
        lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
        prerequisite_unit: undefined,
        competency_checklist: [
          'Conjuga os verbos regulares -ar (falei, falaste, falou, falámos, falaram), -er (comi, comeste, comeu, comemos, comeram) e -ir (parti, partiste, partiu, partimos, partiram) no pretérito perfeito simples',
          'Usa as formas irregulares mais comuns: ser E ir partilham as mesmas formas (fui, foste, foi, fomos, foram) — uma característica exclusiva do português; ter (tive), estar (estive), fazer (fiz), poder (pude), vir (vim), ver (vi), dar (dei), saber (soube), trazer (trouxe)',
          'Situa ações passadas completadas no tempo usando: ontem, a semana passada, há três dias, em 2020, no ano passado, há bocado (coloquial do PE para há pouco tempo)',
          'Narra uma sequência breve de eventos passados completados em ordem lógica num parágrafo de 60–80 palavras',
        ],
      },
      {
        id: 'a2-unit-2',
        level: 'A2',
        unit_number: 2,
        title: 'Pretérito Imperfeito e Narração',
        default_weeks: [1, 2],
        grammar_points: [
          'pretérito-imperfeito',
          'perfeito-vs-imperfeito',
          'costumava',
        ],
        vocabulary_set_ids: ['infância_pt_a2', 'descrições_pt_a2'],
        lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
        prerequisite_unit: 'a2-unit-1',
        competency_checklist: [
          'Conjuga o imperfeito para todas as pessoas: regular -ar (falava), -er (comia), -ir (partia) e os três verbos irregulares ser (era/eras/era/éramos/eram), ter (tinha), vir (vinha)',
          'Usa o imperfeito para estados passados em curso, descrições de cenas e ações habituais passadas: Quando era criança, brincava todos os dias na rua',
          'Usa costumava + infinitivo para hábitos passados: Costumava ir à praia todos os verões — uma perífrase própria do português',
          'Distingue pretérito perfeito (evento completado em primeiro plano) do imperfeito (descrição de fundo, hábito): Quando cheguei a casa, ela estava a dormir',
        ],
      },
      {
        id: 'a2-unit-3',
        level: 'A2',
        unit_number: 3,
        title: 'Pronomes de Objeto Direto e Indireto',
        default_weeks: [1, 2],
        grammar_points: [
          'pronomes-objeto-direto',
          'pronomes-objeto-indireto',
          'colocação-pronominal',
        ],
        vocabulary_set_ids: ['compras_pt_a2', 'presentes_pt_a2'],
        lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
        prerequisite_unit: 'a2-unit-2',
        competency_checklist: [
          'Usa os pronomes de objeto direto o/a/os/as e os pronomes de objeto indireto me/te/lhe/nos/vos/lhes',
          'Aplica a regra fundamental da colocação pronominal do PE: ênclise (depois do verbo) é o padrão nas orações principais afirmativas (Vi-o, Deram-me o livro), mas a próclise (antes do verbo) é usada após negação (Não o vi), em orações subordinadas (Quando o encontrei...) e após certos advérbios (Sempre me disseram...)',
          'Aplica as alterações fonológicas aos pronomes de objeto direto após formas verbais terminadas em -r, -s ou nasal: comprar → comprá-lo, compramos → comprámo-lo, compram → compram-no',
          'Usa os pronomes combinados indireto+direto: mo (me+o), ta (te+a), lho (lhe+o), no-lo (nos+o)',
        ],
      },
      {
        id: 'a2-unit-4',
        level: 'A2',
        unit_number: 4,
        title: 'Comparações e Superlativos',
        default_weeks: [1, 2],
        grammar_points: ['comparativos', 'superlativos', 'tão-como'],
        vocabulary_set_ids: ['cidades_pt_a2', 'cultura_pt_a2'],
        lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
        prerequisite_unit: 'a2-unit-3',
        competency_checklist: [
          'Compara usando mais/menos + adjetivo/advérbio + do que (antes de nome/pronome) ou que (noutros contextos): Lisboa é mais cara do que o Porto',
          'Exprime igualdade com tão + adjetivo/advérbio + como e tanto/a/os/as + nome + como: É tão bom como eu, Come tanto como eu',
          'Forma o superlativo relativo: o/a/os/as + mais/menos + adjetivo + de: É o restaurante mais caro da cidade',
          'Usa comparativos irregulares: bom → melhor/o melhor, mau → pior/o pior, grande → maior/o maior, pequeno → menor/o menor — sem acrescentar mais/menos antes deles',
        ],
      },
      {
        id: 'a2-unit-5',
        level: 'A2',
        unit_number: 5,
        title: 'Imperativo e Conselhos',
        default_weeks: [1, 2],
        grammar_points: [
          'imperativo-afirmativo',
          'imperativo-negativo',
          'imperativo-irregular',
        ],
        vocabulary_set_ids: ['saúde_pt_a2', 'conselhos_pt_a2'],
        lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
        prerequisite_unit: 'a2-unit-4',
        competency_checklist: [
          'Forma o imperativo afirmativo de tu a partir da terceira pessoa do singular do presente do indicativo (fala!, come!, parte!) — e o imperativo afirmativo de você/o senhor a partir da terceira pessoa do presente do conjuntivo (fale!, coma!, parta!)',
          'Forma o imperativo negativo de tu usando não + presente do conjuntivo segunda pessoa: não fales!, não comas!, não partas!',
          'Usa os imperativos irregulares principais: vai/vá, sê/seja, tem/tenha, faz/faça, põe/ponha, diz/diga, traz/traga',
          'Une pronomes aos imperativos afirmativos seguindo a regra da ênclise do PE: Diz-me! Dá-me isso! Faz-o! — e coloca-os antes dos imperativos negativos: Não me digas, Não o faças',
        ],
      },
      {
        id: 'a2-unit-6',
        level: 'A2',
        unit_number: 6,
        title: 'Futuro do Presente e Condicional',
        default_weeks: [1, 2],
        grammar_points: [
          'futuro-do-presente',
          'condicional',
          'futuro-composto',
        ],
        vocabulary_set_ids: ['trabalho_pt_a2', 'planos_pt_a2'],
        lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
        prerequisite_unit: 'a2-unit-5',
        competency_checklist: [
          'Conjuga o futuro do presente para todas as pessoas usando o infinitivo como radical (falarei, falarás, falará, falaremos, falarão) com radicais irregulares: dir-, far-, irei, poderei, quererei, saberei, trarei, valerei, virei',
          'Usa o futuro do presente para previsões futuras e para exprimir probabilidade no presente: Que horas serão? Serão três horas',
          'Conjuga o condicional (falaria, falarias) e usa-o para pedidos corteses, situações hipotéticas e discurso indireto: Gostaria de reservar uma mesa, Poderia ajudar-me?',
          'Forma o futuro composto (vou ter + particípio passado) para uma ação completada antes de um momento futuro: Quando chegares, já vou ter terminado',
        ],
      },
      {
        id: 'a2-unit-7',
        level: 'A2',
        unit_number: 7,
        title: 'Histórias e Narrações',
        default_weeks: [1, 2],
        grammar_points: [
          'conectores-narrativos',
          'sequência-temporal',
          'discurso-indireto',
        ],
        vocabulary_set_ids: ['histórias_pt_a2', 'anedotas_pt_a2'],
        lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
        prerequisite_unit: 'a2-unit-6',
        competency_checklist: [
          'Liga eventos em sequência usando: primeiro, depois, a seguir, mais tarde, entretanto, por fim, finalmente, de repente, nesse momento',
          'Combina pretérito perfeito (ações completadas em primeiro plano) e imperfeito (descrições de fundo) num parágrafo narrativo sustentado de 80–100 palavras',
          'Reporta o que alguém disse aplicando a mudança temporal necessária: disse que + imperfeito para presente original (Disse que estava cansado), disse que + mais-que-perfeito para passado original',
          'Escreve uma anedota pessoal de 80–100 palavras usando conectores narrativos e ambos os tempos passados corretamente',
        ],
      },
      {
        id: 'a2-unit-8',
        level: 'A2',
        unit_number: 8,
        title: 'A2 Consolidação',
        default_weeks: [1, 1],
        grammar_points: [
          'pretérito-perfeito-regular',
          'pretérito-imperfeito',
          'pronomes-objeto-direto',
          'pronomes-objeto-indireto',
          'colocação-pronominal',
          'comparativos',
          'futuro-do-presente',
          'condicional',
        ],
        vocabulary_set_ids: ['revisão_pt_a2'],
        lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
        prerequisite_unit: 'a2-unit-7',
        competency_checklist: [
          'Lida com situações sociais de rotina (compras, reservas, pedir informações) usando os tempos passados corretos, futuro e formas condicionais de cortesia',
          'Aplica as regras de colocação pronominal do PE (ênclise nas orações principais afirmativas, próclise após negação e em subordinadas) sem erro sistemático',
          'Produz um texto conectado de 80–100 palavras usando pretérito perfeito, imperfeito e futuro do presente',
          'Lê e compreende um texto factual de 150–200 palavras sobre um tema familiar e responde a perguntas de compreensão',
        ],
      },
    ],
  },
  B1: {
    level: 'B1',
    title: 'Intermediate Portuguese',
    description:
      'Subjunctive mood, compound tenses, relative clauses and opinion expression.',
    default_duration_weeks: 8,
    units: [
      {
        id: 'b1-unit-1',
        level: 'B1',
        unit_number: 1,
        title: 'Presente do Conjuntivo',
        default_weeks: [1, 2],
        grammar_points: ['presente-conjuntivo', 'expressões-desejo', 'talvez'],
        vocabulary_set_ids: ['emoções_pt_b1', 'desejos_pt_b1'],
        lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
        prerequisite_unit: undefined,
        competency_checklist: [
          'Forma o presente do conjuntivo a partir da primeira pessoa do singular do presente do indicativo trocando a vogal temática: falar → falo → fale, beber → bebo → beba, partir → parto → parta — e formas irregulares: ser (seja), estar (esteja), ter (tenha), haver (haja), ir (vá), poder (possa), querer (queira), saber (saiba), vir (venha), fazer (faça)',
          'Usa o conjuntivo após verbos de desejo com mudança de sujeito: quero que venhas, espero que chegues a tempo, prefiro que fiques',
          'Usa o conjuntivo após expressões emocionais: alegro-me de que estejas aqui, tenho medo de que não chegues a tempo, é uma pena que não possas vir',
          'Usa talvez + conjuntivo para possibilidades incertas: Talvez venha amanhã, Talvez seja verdade — talvez desencadeia o conjuntivo no PE, ao contrário do espanhol tal vez',
          'Distingue quando + indicativo (facto habitual presente: Quando estou em Lisboa, vou sempre ao Tejo) de quando + futuro do conjuntivo (para eventos futuros)',
        ],
      },
      {
        id: 'b1-unit-2',
        level: 'B1',
        unit_number: 2,
        title: 'Subjuntivo em Contexto',
        default_weeks: [1, 2],
        grammar_points: [
          'subjuntivo-recomendação',
          'subjuntivo-dúvida',
          'subjuntivo-avaliação',
        ],
        vocabulary_set_ids: ['trabalho_pt_b1', 'estudos_pt_b1'],
        lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
        prerequisite_unit: 'b1-unit-1',
        competency_checklist: [
          'Usa o conjuntivo após verbos de recomendação: recomendo que, aconselho que, sugiro que, proponho que + conjuntivo',
          'Usa o conjuntivo após expressões de dúvida e negação: não acredito que, duvido que, não tenho a certeza de que, é improvável que',
          'Usa o conjuntivo após juízos de valor impessoais: é importante que, é necessário que, é preciso que, é melhor que, é fundamental que, convém que + conjuntivo',
          'Contrasta: acredito que tem razão (certeza, indicativo) vs não acredito que tenha razão (dúvida, conjuntivo)',
          'Escreve um parágrafo dando conselhos e exprimindo opiniões usando indicativo e conjuntivo corretamente',
        ],
      },
      {
        id: 'b1-unit-3',
        level: 'B1',
        unit_number: 3,
        title: 'Pretérito Perfeito Composto e Mais-que-perfeito',
        default_weeks: [1, 2],
        grammar_points: [
          'pretérito-perfeito-composto',
          'mais-que-perfeito',
          'marcadores-composto',
        ],
        vocabulary_set_ids: ['experiências_pt_b1', 'realizações_pt_b1'],
        lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
        prerequisite_unit: 'b1-unit-2',
        competency_checklist: [
          'Forma o pretérito perfeito composto (ter + particípio passado: tenho falado, tens comido, tem partido) e compreende o seu significado exclusivamente português: ação repetida ou habitual que começou no passado e continua no presente — Tenho estudado muito este mês',
          'Distingue o pretérito perfeito composto do pretérito perfeito simples: fui (ação completada única) vs tenho ido (tenho ido repetidamente). Em português, o composto e o simples têm significados DIFERENTES, ao contrário do espanhol',
          'Usa o pretérito perfeito composto com marcadores: nos últimos dias/meses, ultimamente, recentemente',
          'Forma o mais-que-perfeito composto (tinha + particípio passado): tinha falado, tinha chegado — para uma ação completada antes de outro momento passado',
          'Reconhece o mais-que-perfeito simples literário (falara, comera, partira) em textos literários, embora tenha sido amplamente substituído por tinha + particípio no PE falado',
        ],
      },
      {
        id: 'b1-unit-4',
        level: 'B1',
        unit_number: 4,
        title: 'Voz Passiva e Construções Impessoais',
        default_weeks: [1, 2],
        grammar_points: ['voz-passiva', 'se-impessoal', 'se-passivo'],
        vocabulary_set_ids: ['notícias_pt_b1', 'sociedade_pt_b1'],
        lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
        prerequisite_unit: 'b1-unit-3',
        competency_checklist: [
          'Forma a voz passiva com ser + particípio passado em todos os tempos, fazendo o particípio concordar com o sujeito: O livro foi escrito por Saramago, As cartas foram enviadas ontem',
          'Usa se passivo para processos e regras onde nenhum agente é mencionado: Alugam-se apartamentos, Fala-se português aqui, Vende-se casa',
          'Usa se impessoal para ações com um agente geral não especificado: Come-se bem neste restaurante, Trabalha-se muito em Portugal',
          'Distingue o se passivo (verbo concorda com o nome: Vendem-se carros) do se impessoal (verbo sempre no singular: Come-se bem): esta é uma distinção que os aprendentes de português confundem regularmente',
          'Lê um artigo de notícias e identifica construções passivas e impessoais; escreve um breve relatório usando ambas',
        ],
      },
      {
        id: 'b1-unit-5',
        level: 'B1',
        unit_number: 5,
        title: 'Orações Relativas',
        default_weeks: [1, 2],
        grammar_points: ['que-relativo', 'onde-quando-relativo', 'cujo'],
        vocabulary_set_ids: ['descrições_pt_b1', 'pessoas_pt_b1'],
        lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
        prerequisite_unit: 'b1-unit-4',
        competency_checklist: [
          'Forma orações relativas restritivas com que para sujeito e objeto direto: o livro que comprei, a pessoa que veio ontem',
          'Usa onde para lugares e quando para tempos em orações relativas: o café onde nos conhecemos, o dia quando chegaste',
          'Usa cujo/cuja/cujos/cujas para posse em orações relativas, concordando com o nome possuído: o autor cujo livro li, a empresa cujas regras são claras',
          'Usa de que/do qual/da qual/dos quais/das quais como alternativas a cujo em registos mais coloquiais ou informais: o homem de quem te falei, a cidade na qual vivi',
        ],
      },
      {
        id: 'b1-unit-6',
        level: 'B1',
        unit_number: 6,
        title: 'Condicionais, Futuro do Conjuntivo e Suposições',
        default_weeks: [1, 2],
        grammar_points: [
          'condicional-composto',
          'se-imperfeito-subjuntivo',
          'futuro-do-conjuntivo',
        ],
        vocabulary_set_ids: ['viagens_pt_b1', 'situações_pt_b1'],
        lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
        prerequisite_unit: 'b1-unit-5',
        competency_checklist: [
          'Forma e usa a condicional tipo 2: se + imperfeito do conjuntivo + condicional para condições irreais no presente/futuro: Se tivesse dinheiro, viajaria pelo mundo',
          'Forma e usa o futuro do conjuntivo — uma forma exclusivamente ativa em português mas largamente extinta nas outras línguas românicas: quando + futuro do conjuntivo em orações temporais: Quando chegares, liga-me; Se puderes, vem jantar; Logo que terminares, avisa-me',
          'Distingue quando usar futuro do conjuntivo vs presente do conjuntivo: referência futura em orações temporais/condicionais → futuro do conjuntivo (Quando chegar vs *Quando chegue que é incorreto no PE); incerteza presente → presente do conjuntivo (Espero que venha)',
          'Usa o futuro do presente para probabilidade sobre o presente: Onde estará o João? Estará em casa — um uso comum do PE',
        ],
      },
      {
        id: 'b1-unit-7',
        level: 'B1',
        unit_number: 7,
        title: 'Discurso Indireto e Conectores',
        default_weeks: [1, 2],
        grammar_points: [
          'discurso-indireto-passado',
          'conectores-argumentativos',
          'mudanças-temporais',
        ],
        vocabulary_set_ids: ['opiniões_pt_b1', 'debates_pt_b1'],
        lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
        prerequisite_unit: 'b1-unit-6',
        competency_checklist: [
          'Reporta o discurso aplicando a mudança temporal necessária: disse que + imperfeito para presente original (Disse que estava cansado), disse que + mais-que-perfeito para passado original (Disse que tinha saído)',
          'Reporta perguntas usando se para perguntas de sim/não (Perguntou-me se eu estava bem) e palavras interrogativas com ordem não invertida para perguntas qu- (Perguntou-me onde eu morava)',
          'Aplica as mudanças de expressões temporais no discurso indireto: hoje → nesse dia, amanhã → no dia seguinte, ontem → no dia anterior, agora → naquele momento, aqui → ali/lá',
          'Usa conectores argumentativos: no entanto, contudo, todavia (contraste); além disso, ainda por cima (adição); portanto, por isso, logo (consequência); uma vez que, visto que, dado que, como (causa)',
        ],
      },
      {
        id: 'b1-unit-8',
        level: 'B1',
        unit_number: 8,
        title: 'B1 Consolidação',
        default_weeks: [1, 1],
        grammar_points: [
          'presente-conjuntivo',
          'pretérito-perfeito-composto',
          'mais-que-perfeito',
          'voz-passiva',
          'futuro-do-conjuntivo',
          'se-imperfeito-subjuntivo',
          'discurso-indireto-passado',
        ],
        vocabulary_set_ids: ['revisão_pt_b1'],
        lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
        prerequisite_unit: 'b1-unit-7',
        competency_checklist: [
          'Lida com a maioria das situações quotidianas (viagens, trabalho, eventos sociais) com relativa facilidade, exprimindo opiniões e reagindo às dos outros',
          'Usa o presente do conjuntivo corretamente nos seus contextos B1 principais e aplica o futuro do conjuntivo em orações temporais com referência futura — uma marca distintiva do PE proficiente',
          'Distingue pretérito perfeito simples (ação completada única) de pretérito perfeito composto (relevância repetida/contínua) sem erro sistemático',
          'Produz um texto conectado (100–150 palavras) integrando tempos passados, conjuntivo, passiva e conectores argumentativos',
        ],
      },
    ],
  },
  B2: {
    level: 'B2',
    title: 'Upper Intermediate Portuguese',
    description:
      'Advanced subjunctive, idiomatic expressions, argumentation and media.',
    default_duration_weeks: 8,
    units: [
      {
        id: 'b2-unit-1',
        level: 'B2',
        unit_number: 1,
        title: 'Subjuntivo Avançado',
        default_weeks: [1, 2],
        grammar_points: [
          'imperfeito-conjuntivo',
          'mais-que-perfeito-conjuntivo',
          'concordância-temporal',
        ],
        vocabulary_set_ids: ['sentimentos_pt_b2', 'hipóteses_pt_b2'],
        lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
        prerequisite_unit: undefined,
        competency_checklist: [
          'Forma o imperfeito do conjuntivo para todos os verbos tomando a terceira pessoa do plural do pretérito perfeito simples e substituindo -ram por -sse: falaram → falasse; fossem → fosse; tivessem → tivesse; viessem → viesse — todos os verbos seguem esta regra única sem exceções',
          'Usa o imperfeito do conjuntivo nas condicionais tipo 2 (Se tivesse tempo, faria isso), após verbos na oração principal no passado (Queria que viesse, Pedia que ficasse) e após conjunções concessivas + significado passado: Embora estivesse cansado, continuou',
          'Forma o mais-que-perfeito do conjuntivo (tivesse/fosse + particípio passado) para condicionais tipo 3 e hipóteses passadas',
          'Aplica concordância temporal: oração principal presente/futuro → presente do conjuntivo; oração principal passado/condicional → imperfeito do conjuntivo; desejo/hipótese passada → mais-que-perfeito do conjuntivo',
          'Usa oxalá + conjuntivo (em todos os tempos) para desejos: Oxalá venhas amanhã, Oxalá tivesse ficado',
        ],
      },
      {
        id: 'b2-unit-2',
        level: 'B2',
        unit_number: 2,
        title: 'Perífrases Verbais e Infinitivo Pessoal',
        default_weeks: [1, 2],
        grammar_points: [
          'perífrases-aspetuais',
          'perífrases-modais',
          'andar-a-estar-a',
          'infinitivo-pessoal',
        ],
        vocabulary_set_ids: ['hábitos_pt_b2', 'mudanças_pt_b2'],
        lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
        prerequisite_unit: 'b2-unit-1',
        competency_checklist: [
          'Usa estar a + infinitivo para uma ação em progresso num dado momento (progressivo do PE): Estou a trabalhar, Estava a dormir — e andar a + infinitivo para uma ação habitual repetida com um tom ligeiramente crítico ou enfático: Anda sempre a reclamar, Ando a ler um livro interessante',
          'Usa começar a + infinitivo, deixar de + infinitivo, voltar a + infinitivo, continuar a + infinitivo, acabar de + infinitivo — perífrases aspetuais portuguesas que cobrem o espetro completo do Aktionsart',
          'Usa o infinitivo pessoal — uma característica exclusivamente portuguesa em que o infinitivo é flexionado para pessoa: eu falar, tu falares, ele falar, nós falarmos, vós falardes, eles falarem — usado após preposições, em orações finais com sujeito diferente e após expressões impessoais: É preciso nós falarmos, Para eles terem sucesso, Antes de tu saíres',
          'Aplica a regra de quando o infinitivo pessoal é preferido em vez do conjuntivo: após preposições com sujeito explícito (para eu fazer vs para que eu faça)',
          'Seleciona a perífrase mais adequada ou o infinitivo pessoal para transmitir aspeto, modalidade ou estrutura oracional num determinado contexto',
        ],
      },
      {
        id: 'b2-unit-3',
        level: 'B2',
        unit_number: 3,
        title: 'Conectores e Coerência Textual',
        default_weeks: [1, 2],
        grammar_points: [
          'conectores-avançados',
          'coesão-textual',
          'registo-formal',
        ],
        vocabulary_set_ids: ['ensaios_pt_b2', 'académico_pt_b2'],
        lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
        prerequisite_unit: 'b2-unit-2',
        competency_checklist: [
          'Usa conjunções concessivas com conjuntivo corretamente: embora + conjuntivo (Embora chovesse, saímos), ainda que + conjuntivo, mesmo que + conjuntivo, por mais que + conjuntivo',
          'Usa conectores causais com registo e posição corretos: porque (neutro, subordinado), uma vez que/visto que/dado que (formal, pode iniciar a frase), como (causal, sempre no início da frase em português: Como estava cansado, fui dormir)',
          'Mantém a coesão textual usando referência pronominal, substituição demonstrativa, substituição lexical e elipse em textos escritos de vários parágrafos',
          'Adapta o registo ao contexto: estruturas nominalizadas (a realização vs realizar) e construções impessoais na escrita académica formal vs estruturas mais diretas na primeira pessoa em textos pessoais',
          'Produz um ensaio argumentativo estruturado de 200+ palavras usando uma variedade de conectores, mantendo a consistência de registo e incluindo tese, pontos de apoio e conclusão',
        ],
      },
      {
        id: 'b2-unit-4',
        level: 'B2',
        unit_number: 4,
        title: 'Expressões Idiomáticas Portuguesas',
        default_weeks: [1, 2],
        grammar_points: [
          'expressões-idiomáticas',
          'expressões-coloquiais',
          'provérbios',
        ],
        vocabulary_set_ids: ['idiomas_pt_b2', 'cultura_pt_b2'],
        lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
        prerequisite_unit: 'b2-unit-3',
        competency_checklist: [
          'Compreende e usa 20+ expressões idiomáticas portuguesas de alta frequência: estar com água pela barba, fazer das tripas coração, deitar água na fervura, ficar de pedra e cal, dar a volta por cima',
          'Interpreta expressões coloquiais do português europeu sem tradução literal: está bem, com certeza, pois (partícula afirmativa do PE sem equivalente direto), não é? (tag question invariável no PE)',
          'Compreende e interpreta provérbios portugueses: Quem não arrisca, não petisca; Água mole em pedra dura tanto bate até que fura; Em casa de ferreiro, espeto de pau',
          'Reconhece que muitas expressões idiomáticas do PE diferem significativamente das equivalentes do português brasileiro',
          'Evita usar expressões idiomáticas inadequadamente em registos escritos formais e identifica o equivalente neutro para cada uma',
        ],
      },
      {
        id: 'b2-unit-5',
        level: 'B2',
        unit_number: 5,
        title: 'Argumentação e Debate',
        default_weeks: [1, 2],
        grammar_points: [
          'estrutura-argumentativa',
          'contra-argumentação',
          'matizadores',
        ],
        vocabulary_set_ids: ['debates_pt_b2', 'temas-sociais_pt_b2'],
        lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
        prerequisite_unit: 'b2-unit-4',
        competency_checklist: [
          'Apresenta uma tese clara e desenvolve-a com pontos de apoio usando: em primeiro lugar, em segundo lugar, além disso, a este respeito, importa salientar que, cabe referir que',
          'Introduz e refuta um contra-argumento: é certo que..., no entanto; embora seja verdade que..., não se pode ignorar que; poder-se-ia argumentar que..., mas na realidade',
          'Usa expressões de atenuação e matização para calibrar a força da afirmação: ao que parece, considera-se que + conjuntivo, parece ser que, segundo alguns especialistas, é provável que + conjuntivo',
          'Participa num debate estruturado usando frases apropriadas de tomada de turno em português: se me permite acrescentar, retomando o que foi dito por..., gostaria de discordar de..., permitam-me precisar que',
          'Escreve um texto argumentativo de 200 palavras com uma posição clara, concessão à visão oposta, refutação e conclusão',
        ],
      },
      {
        id: 'b2-unit-6',
        level: 'B2',
        unit_number: 6,
        title: 'Literatura Portuguesa e Textos Narrativos',
        default_weeks: [1, 2],
        grammar_points: [
          'tempos-narrativos',
          'descrição-literária',
          'pretérito-mais-que-perfeito',
        ],
        vocabulary_set_ids: ['literatura_pt_b2', 'leitura_pt_b2'],
        lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
        prerequisite_unit: 'b2-unit-5',
        competency_checklist: [
          'Usa pretérito perfeito simples, imperfeito e mais-que-perfeito composto juntos numa narrativa literária: perfeito simples para eventos completados em primeiro plano, imperfeito para descrições de fundo, mais-que-perfeito para eventos anteriores ao momento narrativo',
          'Reconhece o mais-que-perfeito simples literário (falara, comera, fora, viera) em textos literários clássicos portugueses',
          'Identifica os principais recursos literários em português: metáfora, símile, hipérbole, ironia, personificação, aliteração — e reconhece-os em passagens breves da literatura portuguesa (Eça de Queirós, Fernando Pessoa, José Saramago, António Lobo Antunes)',
          'Lê um excerto literário curto e identifica o ponto de vista narrativo, o registo e o tom — aplicando o metalinguagem português: narrador, protagonista, enredo, desfecho, ponto de vista',
          'Escreve um parágrafo narrativo descritivo (80–100 palavras) usando a gama completa de tempos narrativos e pelo menos um recurso literário',
        ],
      },
      {
        id: 'b2-unit-7',
        level: 'B2',
        unit_number: 7,
        title: 'Média e Atualidade',
        default_weeks: [1, 2],
        grammar_points: [
          'linguagem-jornalística',
          'títulos',
          'discurso-reportado',
        ],
        vocabulary_set_ids: ['notícias_pt_b2', 'atualidade_pt_b2'],
        lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
        prerequisite_unit: 'b2-unit-6',
        competency_checklist: [
          'Identifica características do estilo jornalístico do português europeu: construções nominalizadas, voz passiva, se passivo, se impessoal, conectores formais e estruturas frásicas mais longas e complexas',
          "Interpreta a gramática dos títulos dos jornais portugueses: formas verbais truncadas, presente para eventos passados recentes, infinitivos para referência futura, elipse de cópulas: 'Governo aprova novo orçamento; Manifestantes a protestar no centro de Lisboa'",
          'Resume um artigo de notícias de 250 palavras usando discurso indireto com mudanças temporais completas e verbos de atribuição variados: afirmar, declarar, referir, salientar, sublinhar, acrescentar, desmentir',
          'Exprime acordo, acordo parcial e desacordo com um artigo de opinião jornalístico: concordo inteiramente com..., não estou totalmente convencido/a de que..., parece-me, no entanto, que + conjuntivo',
          'Escreve um comentário estruturado de 150 palavras sobre um tema social ou político atual usando vocabulário jornalístico e conectores apropriados',
        ],
      },
      {
        id: 'b2-unit-8',
        level: 'B2',
        unit_number: 8,
        title: 'B2 Consolidação',
        default_weeks: [1, 1],
        grammar_points: [
          'imperfeito-conjuntivo',
          'mais-que-perfeito-conjuntivo',
          'perífrases-aspetuais',
          'infinitivo-pessoal',
          'conectores-avançados',
          'estrutura-argumentativa',
          'tempos-narrativos',
          'discurso-reportado',
        ],
        vocabulary_set_ids: ['revisão_pt_b2'],
        lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
        prerequisite_unit: 'b2-unit-7',
        competency_checklist: [
          'Escreve um ensaio formal de 200 palavras integrando imperfeito do conjuntivo, embora + conjuntivo, conectores avançados e uma estrutura argumentativa clara',
          'Usa o infinitivo pessoal corretamente em orações finais e após preposições — demonstrando domínio de uma característica exclusiva do português',
          'Produz um texto narrativo literário usando a gama completa de tempos narrativos e pelo menos um recurso literário',
          'Lê um texto de 300 palavras sobre um tema social ou cultural complexo e responde corretamente a perguntas de compreensão inferencial',
          'Conversa espontaneamente sobre temas abstratos com domínio evidente do vocabulário B2, do conjuntivo, das perífrases verbais portuguesas e das estratégias discursivas',
        ],
      },
    ],
  },
  C1: {
    level: 'C1',
    title: 'Advanced Portuguese',
    description:
      'Specialised vocabulary, formal register, regional varieties and rhetoric.',
    default_duration_weeks: 8,
    units: [
      {
        id: 'c1-unit-1',
        level: 'C1',
        unit_number: 1,
        title: 'Nuances do Subjuntivo',
        default_weeks: [1, 2],
        grammar_points: [
          'subjuntivo-concessivo',
          'subjuntivo-final',
          'subjuntivo-relativo',
        ],
        vocabulary_set_ids: ['nuances_pt_c1', 'formalidade_pt_c1'],
        lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
        prerequisite_unit: undefined,
        competency_checklist: [
          'Usa conjunções concessivas com conjuntivo nos quatro tempos: embora, ainda que, mesmo que, por mais que, por muito que + conjuntivo — compreendendo que em português estas exigem SEMPRE o conjuntivo',
          'Usa conjunções finais: para que + conjuntivo (mudança de sujeito) vs para + infinitivo pessoal (frequentemente preferido no PE formal), a fim de que, de modo a que, de forma a que + conjuntivo',
          'Aplica o conjuntivo em orações relativas restritivas com antecedentes negativos, indefinidos e superlativos: Não há ninguém que saiba responder, Procuro alguém que fale mandarim, É o melhor livro que já tenha lido',
          'Usa o conjuntivo após como se: Fala como se soubesse tudo, Comportou-se como se não tivesse acontecido nada',
          'Controla a concordância de tempos completa do conjuntivo em frases complexas de várias orações com indicativo e conjuntivo mistos no português escrito formal',
        ],
      },
      {
        id: 'c1-unit-2',
        level: 'C1',
        unit_number: 2,
        title: 'Registo Formal e Académico',
        default_weeks: [1, 2],
        grammar_points: ['passiva-reflexa', 'nominalização', 'impessoalidade'],
        vocabulary_set_ids: ['académico_pt_c1', 'investigação_pt_c1'],
        lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
        prerequisite_unit: 'c1-unit-1',
        competency_checklist: [
          'Usa a passiva reflexa (se + 3ª pessoa) com fluência no português formal e académico: considera-se que, verifica-se que, observa-se que, comprova-se que',
          'Converte frases verbais em frases nominais através da nominalização — central no estilo académico português: desenvolver → o desenvolvimento, analisar → a análise, aumentar → o aumento, recorrer → o recurso, realizar → a realização',
          'Constrói frases académicas impessoais: considera-se que, importa referir que, cabe salientar que, torna-se necessário, é de notar que, constata-se que',
          'Mantém um registo formal consistente ao longo de um texto académico de 400+ palavras: evita vocabulário coloquial, uso excessivo de fazer, tratamento direto e conectores informais',
          'Identifica e corrige violações de registo em textos académicos de estudantes: vocabulário inadequado, perda de impessoalidade, conectores informais',
        ],
      },
      {
        id: 'c1-unit-3',
        level: 'C1',
        unit_number: 3,
        title: 'Léxico Especializado',
        default_weeks: [1, 2],
        grammar_points: ['campos-semânticos', 'derivação', 'precisão-léxica'],
        vocabulary_set_ids: ['profissional_pt_c1', 'técnico_pt_c1'],
        lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
        prerequisite_unit: 'c1-unit-2',
        competency_checklist: [
          'Deriva novas palavras sistematicamente usando sufixos produtivos do português: -ção/-são (produção, expansão), -dade/-tade/-idade (qualidade, liberdade, capacidade), -eza/-ura/-ice (beleza, leitura, tolice), -vel (realizável), -mente — e prefixos: in-/im-, re-, sub-, inter-, ante-, pré-, pós-',
          'Identifica relações de campo semântico e colocações formais em português: cometer um erro (não *fazer), tomar uma decisão (não *fazer), formular uma hipótese, apresentar uma proposta, exercer uma função',
          'Escolhe o sinónimo preciso na escrita profissional: indicar vs dizer, empregar vs usar, obter vs conseguir, efetuar vs fazer, proceder a vs fazer',
          'Reconhece as mudanças do Acordo Ortográfico de 1990 (implementado em Portugal a partir de 2009) e aplica consistentemente as convenções ortográficas atuais do português europeu',
          'Explica termos especializados em português simples, demonstrando tanto a compreensão como a capacidade de mediar entre registos especializados e não especializados',
        ],
      },
      {
        id: 'c1-unit-4',
        level: 'C1',
        unit_number: 4,
        title: 'Ironia, Humor e Duplo Sentido',
        default_weeks: [1, 2],
        grammar_points: ['ironia', 'humor-português', 'duplo-sentido'],
        vocabulary_set_ids: ['humor_pt_c1', 'cultura_pt_c1'],
        lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
        prerequisite_unit: 'c1-unit-3',
        competency_checklist: [
          'Reconhece a ironia verbal e o sarcasmo em português prestando atenção à entoação, ao contexto e à incongruência lexical: Que bela ideia! (dito quando algo correu mal); Muito bem! (sarcasticamente)',
          'Compreende o sentido de humor português — caracterizado pela saudade, auto-depreciação e eufemismo — e interpreta o humor baseado em fenómenos culturais portugueses: o desenrascanço, o fado, o futebol, a burocracia',
          'Interpreta jogos de palavras, trocadilhos e duplos sentidos encontrados na publicidade, televisão e fala quotidiana portuguesa',
          'Compreende o conceito de saudade tanto como tema cultural como elemento linguístico-pragmático no discurso irónico ou nostálgico',
          'Produz um breve texto satírico ou irónico sobre um tema social usando recursos portugueses apropriados sem causar ofensa involuntária',
        ],
      },
      {
        id: 'c1-unit-5',
        level: 'C1',
        unit_number: 5,
        title: 'Discurso Persuasivo e Retórica',
        default_weeks: [1, 2],
        grammar_points: [
          'recursos-retóricos',
          'persuasão',
          'figuras-literárias',
        ],
        vocabulary_set_ids: ['oratória_pt_c1', 'apresentações_pt_c1'],
        lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
        prerequisite_unit: 'c1-unit-4',
        competency_checklist: [
          'Usa anáfora, epífora, quiasmo e perguntas retóricas (Não temos o direito de...? Será que...?) para aumentar a força persuasiva de um discurso ou ensaio em português',
          'Usa padrões concessivos: por mais que + conjuntivo, ainda que + conjuntivo, mesmo admitindo que + conjuntivo — integrando-os naturalmente numa argumentação alargada',
          'Abre e fecha discursos formais portugueses com as convenções apropriadas: Exmo./Exma. Senhor/a..., estimada audiência...; Em jeito de conclusão..., Para terminar..., Em suma...',
          'Integra dados, citações e opiniões de especialistas num argumento escrito com atribuição correta: segundo um estudo de..., como afirma X na sua obra..., de acordo com dados fornecidos por...',
          'Profere um argumento oral de 3 minutos sobre uma questão social, ética ou política complexa com estrutura coerente, recursos retóricos e hesitação mínima em português europeu formal',
        ],
      },
      {
        id: 'c1-unit-6',
        level: 'C1',
        unit_number: 6,
        title: 'Variedades do Português',
        default_weeks: [1, 2],
        grammar_points: [
          'português-brasileiro',
          'português-europeu',
          'diferenças-regionais',
        ],
        vocabulary_set_ids: ['variedades_pt_c1', 'dialetos_pt_c1'],
        lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
        prerequisite_unit: 'c1-unit-5',
        competency_checklist: [
          "Identifica as principais diferenças fonológicas entre o português europeu (PE) e o português brasileiro (PB): o PE reduz drasticamente as vogais átonas (leite soa como 'LAYT', fazer soa como 'fzER') vs o PB que pronuncia todas as vogais claramente",
          'Distingue as principais diferenças gramaticais: o PE usa estar a + infinitivo para o progressivo (Estou a trabalhar), o PB usa estar + gerúndio (Estou trabalhando); o PE coloca os pronomes depois do verbo (ênclise) como padrão, o PB coloca-os antes (próclise); o PE usa tu como 2ª pessoa informal, o PB usa amplamente você',
          'Reconhece diferenças lexicais significativas entre PE e PB: autocarro/ônibus, casa de banho/banheiro, telemóvel/celular, comboio/trem, frigorífico/geladeira, sumo/suco, pequeno-almoço/café da manhã',
          'Compreende o significado sociolinguístico da CPLP (Comunidade dos Países de Língua Portuguesa) e reconhece que as variedades africanas do português (PALOP) têm características próprias distintas tanto do PE como do PB',
          'Discute o Acordo Ortográfico e a sua adoção desigual no mundo lusófono, e o debate político e cultural em curso em torno da estandardização vs diversidade linguística',
        ],
      },
      {
        id: 'c1-unit-7',
        level: 'C1',
        unit_number: 7,
        title: 'Análise Crítica e Síntese',
        default_weeks: [1, 2],
        grammar_points: [
          'síntese-textual',
          'crítica-construtiva',
          'reformulação',
        ],
        vocabulary_set_ids: ['análise_pt_c1', 'síntese_pt_c1'],
        lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
        prerequisite_unit: 'c1-unit-6',
        competency_checklist: [
          'Sintetiza informação de duas ou três fontes num resumo coerente e atribuído: Segundo X..., Por seu turno, Y argumenta que..., No entanto, é necessário considerar que...',
          'Avalia a consistência interna, a fiabilidade e os potenciais vieses de um argumento num texto português, usando vocabulário crítico: parte do pressuposto de que, baseia-se na hipótese de que, carece de evidências concretas',
          'Reformula uma ideia complexa com palavras diferentes (reformulação/paráfrase) sem perda de precisão, usando expressões de reformulação portuguesas: isto é, ou seja, por outras palavras, o que equivale a dizer, dito de outra forma',
          'Escreve uma análise crítica estruturada (300–400 palavras) com tese claramente assinalada, provas de apoio, contra-provas e uma conclusão de síntese',
          'Distingue entre resumir (relatar o que o autor diz) e avaliar criticamente (avaliar a qualidade, a lógica e as provas do argumento)',
        ],
      },
      {
        id: 'c1-unit-8',
        level: 'C1',
        unit_number: 8,
        title: 'C1 Consolidação',
        default_weeks: [1, 1],
        grammar_points: [
          'subjuntivo-concessivo',
          'subjuntivo-final',
          'subjuntivo-relativo',
          'passiva-reflexa',
          'nominalização',
          'recursos-retóricos',
          'português-brasileiro',
          'síntese-textual',
        ],
        vocabulary_set_ids: ['revisão_pt_c1'],
        lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
        prerequisite_unit: 'c1-unit-7',
        competency_checklist: [
          'Produz um texto formal de 400 palavras integrando todas as estruturas gramaticais de C1 — conjuntivo em todos os seus contextos, nominalização, construções passivas — com controlo evidente e fluência natural',
          'Exprime ideias complexas e matizadas espontaneamente sem procurar visivelmente estruturas ou vocabulário',
          'Demonstra controlo completo do conjuntivo em todos os contextos C1: concessivo, final, relativo e construções com como se',
          'Lê e avalia criticamente um texto de 400 palavras sobre um tema abstrato ou especializado, identificando a estrutura argumentativa, as estratégias retóricas e os pressupostos implícitos',
          'Tem um desempenho consistente com o CAPLE C1 (Centro de Avaliação de Português Língua Estrangeira, Universidade de Lisboa) numa tarefa de exame simulada que cobre as quatro competências',
        ],
      },
    ],
  },
  C2: {
    level: 'C2',
    title: 'Proficient Portuguese',
    description: 'Mastery, literary style, translation and cultural depth.',
    default_duration_weeks: 6,
    units: [
      {
        id: 'c2-unit-1',
        level: 'C2',
        unit_number: 1,
        title: 'Domínio da Gramática Avançada',
        default_weeks: [1, 2],
        grammar_points: [
          'revisão-conjuntivo',
          'revisão-condicional',
          'mesóclise',
        ],
        vocabulary_set_ids: ['excelência_pt_c2'],
        lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
        prerequisite_unit: undefined,
        competency_checklist: [
          'Controla todos os tempos do conjuntivo e a sua concordância sem erro sistemático: presente, imperfeito, perfeito e mais-que-perfeito do conjuntivo — incluindo usos autónomos do conjuntivo (Que venha! Deus queira que..., Oxalá fosse assim!)',
          'Forma e interpreta estruturas condicionais mistas: Se tivesse estudado, teria passado (hipótese passada → consequência passada) e Se tivesse estudado, seria melhor aluno agora (hipótese passada → consequência presente)',
          'Reconhece e usa corretamente a mesóclise — a posição intermédia distintivamente portuguesa dos pronomes de objeto no futuro e condicional: dar-te-ei, fá-lo-ia, trazê-lo-emos — compreendendo que é uma característica de registo formal/literário não usada na fala quotidiana mas presente em documentos oficiais, textos jurídicos e correspondência formal',
          'Identifica e corrige erros subtis de aprendentes avançados: conjuntivo incorreto após que quando é necessário o indicativo (Sei que ele está — não *Sei que ele esteja), uso incorreto do pretérito perfeito composto vs simples e colocação pronominal incorreta no PE',
          'Demonstra uma extensão e precisão gramatical comparável à de um falante nativo culto do português europeu nos registos escritos formais e orais semiformal',
        ],
      },
      {
        id: 'c2-unit-2',
        level: 'C2',
        unit_number: 2,
        title: 'Estilística e Registo Literário',
        default_weeks: [1, 2],
        grammar_points: [
          'estilo-literário',
          'voz-narrativa',
          'recursos-estilísticos',
        ],
        vocabulary_set_ids: ['literatura_pt_c2', 'estilo_pt_c2'],
        lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
        prerequisite_unit: 'c2-unit-1',
        competency_checklist: [
          'Controla o ponto de vista narrativo — primeira pessoa, terceira onisciente, terceira limitada — na escrita criativa original em português, fazendo escolhas consistentes e deliberadas',
          'Usa assíndeto e polissíndeto para efeito rítmico e estilístico deliberado: acumulação rápida (assíndeto) vs abrandamento enfático (polissíndeto) na prosa portuguesa',
          'Utiliza anáfora, epífora, quiasmo, clímax, anticlímax e outras figuras retóricas como ferramentas estilísticas conscientes em ensaios, discursos e prosa literária',
          'Lê um excerto literário do cânone português (Camões, Eça de Queirós, Fernando Pessoa, José Saramago, Sophia de Mello Breyner) e analisa estilo, sintaxe, técnica narrativa e registo',
          'Escreve um texto literário ou ensaio literário de 300 palavras em português demonstrando controlo consciente do registo estilístico, da voz narrativa e dos recursos literários apropriados ao género escolhido',
        ],
      },
      {
        id: 'c2-unit-3',
        level: 'C2',
        unit_number: 3,
        title: 'Tradução e Mediação Linguística',
        default_weeks: [1, 2],
        grammar_points: ['equivalência', 'matizes-tradução', 'falsos-amigos'],
        vocabulary_set_ids: ['tradução_pt_c2', 'mediação_pt_c2'],
        lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
        prerequisite_unit: 'c2-unit-2',
        competency_checklist: [
          'Identifica e evita falsos amigos entre português e outras línguas que induzem em erro os aprendentes avançados: esquisito (strange/odd, not exquisite), atualmente (currently, not actually), pretender (to intend, not to pretend), realizar (to carry out, not to realise), sensible → sensato (sensible) vs sensível (sensitive)',
          'Medeia entre dois interlocutores com diferentes origens linguísticas — parafraseando, resumindo e esclarecendo sem distorcer o significado ou alterar involuntariamente o registo',
          'Produz uma paráfrase fluida em português de um texto complexo num português mais simples, mantendo o registo e a intenção comunicativa do original',
          'Explica as dimensões culturais e pragmáticas das expressões portuguesas que resistem à tradução direta: saudade, desenrascanço, fado, bairrismo',
          'Traduz um parágrafo complexo do português para a L1 do aprendente e vice-versa, resolvendo expressões idiomáticas através de equivalentes funcionais e explicando as implicações culturais na língua de chegada',
        ],
      },
      {
        id: 'c2-unit-4',
        level: 'C2',
        unit_number: 4,
        title: 'Cultura e História da Língua Portuguesa',
        default_weeks: [1, 2],
        grammar_points: [
          'evolução-linguística',
          'latinismos',
          'arabismos-portugueses',
        ],
        vocabulary_set_ids: ['história_pt_c2', 'cultura_pt_c2'],
        lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
        prerequisite_unit: 'c2-unit-3',
        competency_checklist: [
          'Traça as grandes etapas do desenvolvimento histórico do português: do latim vulgar ao galego-português medieval, ao português clássico dos Descobrimentos e à língua contemporânea — compreendendo a origem galega comum do português e do galego',
          'Reconhece arabismos no vocabulário português: açúcar, alface, almofada, azeite, oxalá, álcool, alfândega, arroz, açougue, algarismo — explicando a sua origem no período de ocupação moura da Península Ibérica',
          'Identifica tupinismos e africanismos que entraram no português através dos Descobrimentos e da colonização: abacaxi, mandioca, jacarandá, caju, tanga, samba, macaco',
          "Lê um texto do século XVI (um fragmento d'Os Lusíadas de Camões ou da Peregrinação de Fernão Mendes Pinto) e identifica arcaísmos, reconhecendo a continuidade com o português moderno",
          'Discute o papel das instituições linguísticas (Academia das Ciências de Lisboa, CPLP, Instituto Camões) e os debates sobre a lusofonia, o Acordo Ortográfico e a identidade linguística no espaço lusófono contemporâneo',
        ],
      },
      {
        id: 'c2-unit-5',
        level: 'C2',
        unit_number: 5,
        title: 'Criação de Conteúdos Avançados',
        default_weeks: [1, 2],
        grammar_points: [
          'géneros-textuais',
          'criatividade-linguística',
          'edição',
        ],
        vocabulary_set_ids: ['criação_pt_c2', 'publicação_pt_c2'],
        lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
        prerequisite_unit: 'c2-unit-4',
        competency_checklist: [
          'Produz um texto de 500 palavras em diferentes géneros textuais — artigo de opinião, ensaio pessoal, conto breve, relatório formal — adaptando vocabulário, tom e estrutura às convenções de cada género',
          'Edita um rascunho ao nível de um revisor experiente: reestrutura para maior clareza, elimina redundâncias, eleva o registo e corrige defeitos gramaticais e estilísticos subtis',
          'Emprega consciência metalinguística para explicar e justificar escolhas estilísticas na sua própria escrita, demonstrando autorreflexão crítica sobre o ofício de escrever em português',
          'Cria textos concisos e impactantes para o discurso público (abertura de um discurso político, um slogan de marketing, um texto de campanha para redes sociais) usando economia linguística e precisão retórica',
          'Demonstra criatividade linguística através de jogos de palavras, neologismos, mistura deliberada de registos e metáforas originais, mantendo a clareza comunicativa',
        ],
      },
      {
        id: 'c2-unit-6',
        level: 'C2',
        unit_number: 6,
        title: 'C2 Consolidação e Maestria',
        default_weeks: [1, 1],
        grammar_points: [
          'expressão-matizada',
          'integração-gramatical',
          'fluência-nativa',
        ],
        vocabulary_set_ids: ['maestria_pt_c2'],
        lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
        prerequisite_unit: 'c2-unit-5',
        competency_checklist: [
          'Exprime matizes subtis de significado — dúvida, ironia, provisoriedade, ênfase — através da seleção precisa da estrutura gramatical e do vocabulário em vez de atenuadores explícitos',
          'Reconstrói um argumento complexo de uma perspetiva ideológica ou cultural diferente, demonstrando controlo flexível do ponto de vista e do registo',
          'Demonstra precisão gramatical quase nativa na escrita e fala espontâneas extensas, com apenas erros ocasionais não sistemáticos que não impedem a comunicação',
          'Diferencia matizes finos de significado entre palavras quase sinónimas e variantes de registo: objetivo/propósito/fim/meta, embora/não obstante/todavia, indicar/assinalar/apontar/sublinhar',
          'Atinge uma pontuação consistente com o CAPLE C2 / Certificado de Maestria em tarefas de leitura, escrita, compreensão oral e interação oral',
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
