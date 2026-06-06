export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'

export type GrammarCategory =
  | 'Tempos verbais'
  | 'Substantivos'
  | 'Pronomes'
  | 'Adjetivos e adverbios'
  | 'Verbos'
  | 'Condicionais'
  | 'Voz passiva'
  | 'Discurso indireto'
  | 'Oracoes'
  | 'Artigos'
  | 'Preposicoes'
  | 'Conjuntivo'
  | 'Avancado'

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
    slug: 'ser',
    title: 'Ser (Verbo)',
    level: 'A1',
    category: 'Verbos',
    summary:
      'O verbo ser exprime identidade, características permanentes e origem.',
    explanation: `**Ser** é um dos verbos mais importantes do português. Usa-se para:\n\n- **Identidade**: *Eu sou o João.*\n- **Nacionalidade / origem**: *Ela é portuguesa.*\n- **Profissão**: *Sou professor.*\n- **Características permanentes**: *A casa é grande.*\n- **Horas e datas**: *São três horas.*\n- **Posse** (com *de*): *O livro é do Pedro.*`,
    rules: [
      'Usa ser para identidade, nacionalidade, profissão, características permanentes.',
      'Horas, datas e eventos usam sempre ser.',
      'Ser + de indica posse.',
      'Não se usa artigo definido antes de nomes próprios com ser, exceto em Portugal coloquial.',
    ],
    examples: [
      { english: 'Eu sou português.', translation: 'I am Portuguese.' },
      { english: 'Ela é médica.', translation: 'She is a doctor.' },
      { english: 'São duas horas.', translation: "It is two o'clock." },
      { english: 'O livro é do João.', translation: "The book is João's." },
    ],
    common_mistakes: [
      {
        wrong: 'Eu estar feliz.',
        correct: 'Eu estou feliz.',
        note: 'Usa-se estar para estados temporários, não ser.',
      },
      {
        wrong: 'Sou tarde.',
        correct: 'É tarde.',
        note: 'Expressões impessoais usam o verbo na 3.ª pessoa.',
      },
    ],
    related: ['estar', 'ser-nacionalidade', 'horas'],
  },
  {
    slug: 'estar',
    title: 'Estar (Verbo)',
    level: 'A1',
    category: 'Verbos',
    summary:
      'O verbo estar exprime estados temporários, localização e condições.',
    explanation: `**Estar** usa-se para:\n\n- **Estados temporários**: *Estou cansado.*\n- **Localização** (física): *O livro está na mesa.*\n- **Condições transitórias**: *A sopa está quente.*\n- **Tempo atmosférico**: *Está a chover.*\n- Em Portugal usa-se *estar a + infinitivo*: *Estou a estudar.*`,
    rules: [
      'Usa estar para localização, estados temporários e condições passageiras.',
      'Em português europeu, estar a + infinitivo expressa ação em curso.',
      'Estar + adjetivo descreve um estado momentâneo.',
      'Não usar estar para nacionalidade ou profissão — usa-se ser.',
    ],
    examples: [
      { english: 'Estou em Lisboa.', translation: 'I am in Lisbon.' },
      { english: 'Ela está cansada hoje.', translation: 'She is tired today.' },
      {
        english: 'Estamos a estudar português.',
        translation: 'We are studying Portuguese.',
        note: 'EP: estar a + infinitivo',
      },
      { english: 'Está frio lá fora.', translation: 'It is cold outside.' },
    ],
    common_mistakes: [
      {
        wrong: 'Sou em casa.',
        correct: 'Estou em casa.',
        note: 'Localização usa estar, nunca ser.',
      },
      {
        wrong: 'Estou português.',
        correct: 'Sou português.',
        note: 'Nacionalidade usa ser, não estar.',
      },
    ],
    related: ['ser', 'estar-a-infinitivo', 'preposicoes-lugar'],
  },
  {
    slug: 'pronomes-sujeito',
    title: 'Pronomes sujeito',
    level: 'A1',
    category: 'Pronomes',
    summary: 'Os pronomes pessoais que funcionam como sujeito da oração.',
    explanation: `Os pronomes sujeito em português europeu:\n\n| Singular | Plural |\n|----------|--------|\n| eu (I) | nós (we) |\n| tu (you, informal) | vocês (you, formal/plural) |\n| ele / ela / você (he/she/you formal) | eles / elas (they) |\n\nNotas importantes:\n- **Tu** é informal e usa-se com conjugação própria (2.ª pessoa).\n- **Você** é semi-formal e usa a conjugação da 3.ª pessoa.\n- **Vocês** é o plural de você.\n- **A gente** equivale a *nós* mas usa verbo na 3.ª singular.\n- Em Portugal, o pronome sujeito é frequentemente omitido (sujeito nulo).`,
    rules: [
      'Pronomes sujeito podem ser omitidos em português (língua de sujeito nulo).',
      'Tu usa-se com verbo na 2.ª pessoa.',
      'Você usa verbo na 3.ª pessoa do singular.',
      'Vocês usa verbo na 3.ª pessoa do plural.',
      'A gente + verbo na 3.ª singular.',
    ],
    examples: [
      { english: 'Eu falo português.', translation: 'I speak Portuguese.' },
      {
        english: 'Tu és muito simpático.',
        translation: 'You are very nice.',
        note: 'informal',
      },
      {
        english: 'Você mora em Lisboa?',
        translation: 'Do you live in Lisbon?',
        note: 'semi-formal',
      },
      {
        english: 'A gente gosta de café.',
        translation: 'We like coffee.',
        note: 'coloquial',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Nós vai ao cinema.',
        correct: 'Nós vamos ao cinema.',
        note: 'Nós concorda com verbo na 1.ª pessoa do plural.',
      },
      {
        wrong: 'Tu fala bem.',
        correct: 'Tu falas bem.',
        note: 'Tu exige verbo na 2.ª pessoa do singular.',
      },
    ],
    related: ['ser', 'estar', 'colocacao-pronominal'],
  },
  {
    slug: 'artigos-definidos',
    title: 'Artigos definidos',
    level: 'A1',
    category: 'Artigos',
    summary: 'O, a, os, as — artigos que determinam substantivos específicos.',
    explanation: `Os artigos definidos concordam em género e número com o substantivo:\n\n| | Masculino | Feminino |\n|---|-----------|----------|\n| **Singular** | o | a |\n| **Plural** | os | as |\n\nUsam-se para algo já conhecido, referências únicas, nomes próprios (EP), antes de possessivos (EP) e dias da semana.`,
    rules: [
      'Concordam em género e número com o substantivo.',
      'Em Portugal, usa-se artigo antes de nomes próprios e possessivos.',
      'Com dias da semana: na segunda-feira, no sábado.',
      'Com nomes de países: o Brasil, a França, mas Portugal sem artigo normalmente.',
    ],
    examples: [
      { english: 'O carro é azul.', translation: 'The car is blue.' },
      {
        english: 'A Maria está em casa.',
        translation: 'Maria is at home.',
        note: 'artigo com nome próprio (EP)',
      },
      {
        english: 'O meu irmão mora em Londres.',
        translation: 'My brother lives in London.',
        note: 'artigo + possessivo',
      },
      {
        english: 'Os alunos estão na sala.',
        translation: 'The students are in the classroom.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Meu livro é interessante.',
        correct: 'O meu livro é interessante.',
        note: 'Em EP usa-se artigo antes de possessivo.',
      },
      {
        wrong: 'O senhora Maria.',
        correct: 'A senhora Maria.',
        note: 'Artigo concorda com o género do substantivo.',
      },
    ],
    related: [
      'artigos-indefinidos',
      'contracoes-preposicionais',
      'adjetivos-possessivos',
    ],
  },
  {
    slug: 'ser-nacionalidade',
    title: 'Ser + nacionalidades',
    level: 'A1',
    category: 'Verbos',
    summary:
      'Como expressar nacionalidades e países de origem com o verbo ser.',
    explanation: `Para expressar nacionalidade usa-se o verbo **ser** seguido do adjetivo de nacionalidade. Os adjetivos concordam em género e número com o sujeito.\n\nAlgumas nacionalidades: português/portuguesa, espanhol/espanhola, francês/francesa, inglês/inglesa, alemão/alemã, italiano/italiana, brasileiro/brasileira.`,
    rules: [
      'O verbo ser exprime nacionalidade (permanente).',
      'O adjetivo de nacionalidade concorda em género e número.',
      'Em Portugal é comum usar artigo antes da nacionalidade (coloquial).',
      'Nomes de países têm género: a França, o Brasil, a Alemanha.',
    ],
    examples: [
      {
        english: 'Sou espanhol.',
        translation: 'I am Spanish.',
        note: 'masculino',
      },
      { english: 'Ela é portuguesa.', translation: 'She is Portuguese.' },
      {
        english: 'Nós somos franceses.',
        translation: 'We are French.',
        note: 'plural masculino',
      },
      { english: 'Eles são brasileiros.', translation: 'They are Brazilian.' },
    ],
    common_mistakes: [
      {
        wrong: 'Estou português.',
        correct: 'Sou português.',
        note: 'Nacionalidade é permanente: usa-se ser.',
      },
      {
        wrong: 'Sou Portuguesa.',
        correct: 'Sou portuguesa.',
        note: 'Adjetivos de nacionalidade escrevem-se com minúscula.',
      },
    ],
    related: ['ser', 'genero-substantivos', 'artigos-definidos'],
  },
  {
    slug: 'genero-substantivos',
    title: 'Género dos substantivos',
    level: 'A1',
    category: 'Substantivos',
    summary:
      'Regras gerais para identificar o género (masculino/feminino) dos substantivos.',
    explanation: `Em português, todos os substantivos têm género: masculino ou feminino.\n\n**Regras gerais:**\n- Palavras terminadas em **-o** são geralmente masculinas.\n- Palavras terminadas em **-a** são geralmente femininas.\n- Palavras terminadas em **-dade, -gem, -tude** são femininas.\n- Palavras terminadas em **-or, -l, -r, -s** são geralmente masculinas.\n\n**Exceções:** *O dia, a mão, o problema, o sistema, o tema* (origem grega).`,
    rules: [
      'Substantivos em -o são geralmente masculinos; em -a, femininos.',
      'Substantivos em -dade, -gem, -tude são sempre femininos.',
      'Substantivos de origem grega em -ma são masculinos.',
      'O artigo definido indica o género: memorize o artigo com o substantivo.',
    ],
    examples: [
      {
        english: 'O carro vermelho.',
        translation: 'The red car.',
        note: 'masculino',
      },
      {
        english: 'A casa branca.',
        translation: 'The white house.',
        note: 'feminino',
      },
      {
        english: 'A cidade é bonita.',
        translation: 'The city is beautiful.',
        note: '-dade, feminina',
      },
      {
        english: 'O problema é difícil.',
        translation: 'The problem is difficult.',
        note: 'origem grega, masculino',
      },
    ],
    common_mistakes: [
      {
        wrong: 'A problema.',
        correct: 'O problema.',
        note: 'Palavras gregas em -ma são masculinas.',
      },
      {
        wrong: 'O viagem.',
        correct: 'A viagem.',
        note: 'Palavras em -gem são femininas.',
      },
    ],
    related: [
      'artigos-definidos',
      'artigos-indefinidos',
      'adjetivos-descritivos',
    ],
  },
  {
    slug: 'artigos-indefinidos',
    title: 'Artigos indefinidos',
    level: 'A1',
    category: 'Artigos',
    summary: 'Um, uma, uns, umas — artigos para substantivos não específicos.',
    explanation: `| | Masculino | Feminino |\n|---|-----------|----------|\n| **Singular** | um | uma |\n| **Plural** | uns | umas |\n\nUsam-se para algo mencionado pela primeira vez, quantidade aproximada ou algo não específico.`,
    rules: [
      'Usa-se um/uma para singular; uns/umas para plural indefinido.',
      'Uns/umas + numeral indica aproximação.',
      'Não se usa artigo indefinido antes de profissão com ser, exceto com adjetivo.',
    ],
    examples: [
      { english: 'Comprei um livro.', translation: 'I bought a book.' },
      {
        english: 'Há uma árvore no jardim.',
        translation: 'There is a tree in the garden.',
      },
      {
        english: 'Ela tem uns trinta anos.',
        translation: 'She is about thirty years old.',
      },
      {
        english: 'Umas pessoas estão à espera.',
        translation: 'Some people are waiting.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Sou um professor.',
        correct: 'Sou professor.',
        note: 'Profissão com ser não leva artigo (a menos que tenha adjetivo).',
      },
      {
        wrong: 'Um outra pessoa.',
        correct: 'Uma outra pessoa.',
        note: 'Artigo concorda com o substantivo que segue.',
      },
    ],
    related: [
      'artigos-definidos',
      'genero-substantivos',
      'contracoes-preposicionais',
    ],
  },
  {
    slug: 'ter',
    title: 'Ter (Verbo)',
    level: 'A1',
    category: 'Verbos',
    summary: 'O verbo ter exprime posse, idade, existência e obrigação.',
    explanation: `**Ter** é um verbo irregular e essencial. Usa-se para:\n\n- **Posse**: *Tenho um carro.*\n- **Idade**: *Tenho vinte e cinco anos.*\n- **Obrigação**: *Tenho de estudar.*\n- **Sensações**: *Tenho fome / sede / sono / medo.*\n\nConjugação: eu tenho / tu tens / ele-você tem / nós temos / eles-vocês têm`,
    rules: [
      'Idade expressa-se com ter (NUNCA ser).',
      'Sensações usam ter: fome, sede, sono, frio, calor, medo, pressa.',
      'Ter de / ter que + infinitivo = obrigação.',
      'Em EP coloquial, ter substitui haver.',
    ],
    examples: [
      { english: 'Tenho dois irmãos.', translation: 'I have two siblings.' },
      {
        english: 'Ela tem vinte anos.',
        translation: 'She is twenty years old.',
        note: 'idade = ter',
      },
      {
        english: 'Tens fome?',
        translation: 'Are you hungry?',
        note: 'sensação',
      },
      {
        english: 'Tenho de ir ao médico.',
        translation: 'I have to go to the doctor.',
        note: 'obrigação',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Sou 25 anos.',
        correct: 'Tenho 25 anos.',
        note: 'Idade usa ter, nunca ser.',
      },
      {
        wrong: 'Estou fome.',
        correct: 'Tenho fome.',
        note: 'Sensações usam ter, não estar.',
      },
    ],
    related: ['haver', 'querer-poder', 'presente-regular'],
  },
  {
    slug: 'adjetivos-possessivos',
    title: 'Adjetivos possessivos',
    level: 'A1',
    category: 'Adjetivos e adverbios',
    summary: 'Meu, teu, seu, nosso — indicam posse ou relação.',
    explanation: `Os possessivos concordam em género e número com a **coisa possuída**:\n\n**Nota EP**: possessivos são quase sempre precedidos de artigo definido: *o meu livro, a tua casa*.`,
    rules: [
      'Em Portugal, usa-se artigo definido antes do possessivo.',
      'O possessivo concorda com a coisa possuída, não com o possuidor.',
      'Para evitar ambiguidade com seu/sua, usa-se dele/dela.',
      'Com nomes de parentesco próximos, o artigo pode ser omitido.',
    ],
    examples: [
      {
        english: 'O meu carro é azul.',
        translation: 'My car is blue.',
        note: 'EP: artigo + possessivo',
      },
      {
        english: 'A tua casa é bonita.',
        translation: 'Your house is beautiful.',
      },
      {
        english: 'Os nossos filhos estão na escola.',
        translation: 'Our children are at school.',
      },
      {
        english: 'O livro dela é interessante.',
        translation: 'Her book is interesting.',
        note: 'dele/dela evita ambiguidade',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Meu livro.',
        correct: 'O meu livro.',
        note: 'Em EP, o artigo é obrigatório antes do possessivo.',
      },
      {
        wrong: 'O seu livro do João.',
        correct: 'O livro do João.',
        note: 'Usa-se dele para evitar ambiguidade de seu.',
      },
    ],
    related: [
      'artigos-definidos',
      'pronomes-objeto-direto',
      'pronomes-objeto-indireto',
    ],
  },
  {
    slug: 'adjetivos-descritivos',
    title: 'Adjetivos descritivos',
    level: 'A1',
    category: 'Adjetivos e adverbios',
    summary:
      'Adjetivos que descrevem qualidades e concordam em género e número.',
    explanation: `Os adjetivos em português concordam em género e número com o substantivo.\n\n**Adjetivos uniformes**: terminados em **-e** (*grande, inteligente*), **-l** (*ágil*), **-ista** (*egoísta*).\n\n**Posição:** Geralmente depois; antes pode mudar o sentido (*grande amigo* vs *amigo grande*).\n\n**Bom/mau** são irregulares: bom→boa, bons, boas; mau→má, maus, más.`,
    rules: [
      'Adjetivos concordam em género e número com o substantivo.',
      'Adjetivos em -e e -l são uniformes.',
      'Posição normal: depois do substantivo.',
      'Bom/boa, mau/má são irregulares.',
    ],
    examples: [
      { english: 'Uma casa bonita.', translation: 'A beautiful house.' },
      {
        english: 'Um homem inteligente.',
        translation: 'An intelligent man.',
        note: 'adjetivo uniforme',
      },
      {
        english: 'Um grande escritor.',
        translation: 'A great writer.',
        note: 'grande antes = qualidade',
      },
      {
        english: 'As flores são bonitas.',
        translation: 'The flowers are beautiful.',
        note: 'concordância plural',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Umas flores bonito.',
        correct: 'Umas flores bonitas.',
        note: 'Adjetivo concorda em género e número.',
      },
      {
        wrong: 'Uma homem grande.',
        correct: 'Um homem grande.',
        note: 'Artigo e adjetivo devem concordar.',
      },
    ],
    related: ['genero-substantivos', 'comparativos', 'superlativos'],
  },
  {
    slug: 'presente-regular',
    title: 'Presente do indicativo (regulares)',
    level: 'A1',
    category: 'Tempos verbais',
    summary: 'Conjugação dos verbos regulares no presente em -ar, -er, -ir.',
    explanation: `| | fal**ar** | com**er** | abr**ir** |\n|---|-----------|-----------|----------|\n| eu | falo | como | abro |\n| tu | falas | comes | abres |\n| ele/você | fala | come | abre |\n| nós | falamos | comemos | abrimos |\n| eles/vocês | falam | comem | abrem |`,
    rules: [
      '-ar: -o, -as, -a, -amos, -am.',
      '-er: -o, -es, -e, -emos, -em.',
      '-ir: -o, -es, -e, -imos, -em.',
      'A conjugação nós é igual no presente e pretérito perfeito para -ar.',
    ],
    examples: [
      {
        english: 'Eu falo português todos os dias.',
        translation: 'I speak Portuguese every day.',
      },
      {
        english: 'Ela come fruta ao almoço.',
        translation: 'She eats fruit at lunch.',
      },
      {
        english: 'Nós abrimos a loja às nove.',
        translation: 'We open the shop at nine.',
      },
      {
        english: 'Eles vendem livros usados.',
        translation: 'They sell used books.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Eu falar português.',
        correct: 'Eu falo português.',
        note: 'O verbo deve ser conjugado.',
      },
      {
        wrong: 'Eles come muito.',
        correct: 'Eles comem muito.',
        note: 'Não se esqueça do -m no plural.',
      },
    ],
    related: ['ser', 'estar', 'ter', 'ir-futuro'],
  },
  {
    slug: 'verbos-reflexivos',
    title: 'Verbos reflexivos',
    level: 'A1',
    category: 'Verbos',
    summary: 'Verbos em que a ação recai sobre o próprio sujeito.',
    explanation: `Os verbos reflexivos:\n\n| Pessoa | Pronome |\n|--------|--------|\n| eu | me |\n| tu | te |\n| ele/você | se |\n| nós | nos |\n| eles/vocês | se |\n\nExemplos: *levantar-se, deitar-se, vestir-se, lembrar-se, esquecer-se, chamar-se*.\n\nEm Portugal, o pronome vai geralmente **depois** do verbo (ênclise).`,
    rules: [
      'O pronome concorda com o sujeito.',
      'Em EP, o pronome tende a ficar depois do verbo (ênclise).',
      'Com negação, o pronome vem antes (próclise).',
      'Muitos verbos são reflexivos em português mas não noutras línguas.',
    ],
    examples: [
      {
        english: 'Chamo-me Ricardo.',
        translation: 'My name is Ricardo.',
        note: 'ênclise (EP)',
      },
      {
        english: 'Levanto-me cedo todos os dias.',
        translation: 'I get up early every day.',
      },
      {
        english: 'Não me lembro do nome dele.',
        translation: "I don't remember his name.",
        note: 'negação → próclise',
      },
      {
        english: 'Ela senta-se à janela.',
        translation: 'She sits by the window.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Chamo João.',
        correct: 'Chamo-me João.',
        note: 'Chamar-se é reflexivo em português.',
      },
      {
        wrong: 'Eu levanto cedo.',
        correct: 'Eu levanto-me cedo.',
        note: 'Em EP, o pronome reflexivo é normalmente mantido.',
      },
    ],
    related: ['colocacao-pronominal', 'presente-regular', 'pronomes-sujeito'],
  },
  {
    slug: 'horas',
    title: 'As horas',
    level: 'A1',
    category: 'Substantivos',
    summary: 'Como perguntar e dizer as horas em português europeu.',
    explanation: `Para perguntar: *Que horas são?* / *Tem horas?* (coloquial)\n\nPara responder:\n- *É uma hora.* (1:00)\n- *São duas horas.* (2:00)\n- *São duas e um quarto.* (2:15)\n- *São duas e meia.* (2:30)\n- *São quinze para as três.* (2:45)\n- *É meio-dia./É meia-noite.*`,
    rules: [
      'Usa-se o verbo ser para as horas.',
      '1:00, meio-dia e meia-noite usam singular.',
      'E um quarto = 15 min, e meia = 30 min.',
      'Após a meia hora, usa-se para.',
    ],
    examples: [
      { english: 'Que horas são?', translation: 'What time is it?' },
      {
        english: 'São três e um quarto.',
        translation: 'It is quarter past three.',
      },
      { english: 'É meio-dia.', translation: 'It is noon.' },
      {
        english: 'São vinte para as seis.',
        translation: 'It is twenty to six.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Estão três horas.',
        correct: 'São três horas.',
        note: 'Horas usam ser, nunca estar.',
      },
      {
        wrong: 'São três e cinquenta.',
        correct: 'São dez para as quatro.',
        note: 'Após a meia hora, usa-se para.',
      },
    ],
    related: ['ser', 'dias-semana', 'numeros'],
  },
  {
    slug: 'gostar-de',
    title: 'Gostar de',
    level: 'A1',
    category: 'Verbos',
    summary: 'Expressar gostos e preferências com a preposição de.',
    explanation: `O verbo **gostar** exige sempre a preposição **de**:\n\n- *Gosto de café. / Gosto de cantar.*\n\nCom artigos, formam-se contrações: *Gosto do livro* (de+o), *Gosto da música* (de+a).`,
    rules: [
      'Gostar exige sempre a preposição de.',
      'De + artigo = contração: do, da, dos, das.',
      'Com infinitivo: gostar de + verbo no infinitivo.',
      'Para preferência: gostar mais de... do que...',
    ],
    examples: [
      { english: 'Gosto de chocolate.', translation: 'I like chocolate.' },
      {
        english: 'Ela gosta do cinema português.',
        translation: 'She likes Portuguese cinema.',
        note: 'de+o=do',
      },
      { english: 'Nós gostamos de viajar.', translation: 'We like to travel.' },
      {
        english: 'Não gosto de acordar cedo.',
        translation: "I don't like waking up early.",
        note: 'negação',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Gosto chocolate.',
        correct: 'Gosto de chocolate.',
        note: 'Gostar exige sempre a preposição de.',
      },
      {
        wrong: 'Gosto o livro.',
        correct: 'Gosto do livro.',
        note: 'de + o = do.',
      },
    ],
    related: ['contracoes-preposicionais', 'tambem-tampouco', 'muito-pouco'],
  },
  {
    slug: 'tambem-tampouco',
    title: 'Também e tampouco',
    level: 'A1',
    category: 'Adjetivos e adverbios',
    summary: 'Expressar concordância e discordância.',
    explanation: `**Também** = also (frases afirmativas).\n**Tampouco** = neither (formal).\n**Também não** = neither (coloquial, mais comum).`,
    rules: [
      'Também usa-se em frases afirmativas.',
      'Tampouco é formal.',
      'Também não é a forma coloquial mais comum.',
      'Também pode ir antes ou depois do verbo.',
    ],
    examples: [
      {
        english: 'Eu também gosto de praia.',
        translation: 'I also like the beach.',
      },
      {
        english: 'Não vi o filme. — Eu também não.',
        translation: "I didn't see the movie. — Me neither.",
        note: 'coloquial',
      },
      {
        english: 'Não fui à festa. — Eu tampouco.',
        translation: "I didn't go to the party. — Neither did I.",
        note: 'formal',
      },
      { english: 'Ela também quer ir.', translation: 'She also wants to go.' },
    ],
    common_mistakes: [
      {
        wrong: 'Também não gosto.',
        correct: 'Eu também não gosto.',
        note: 'A frase isolada precisa de sujeito.',
      },
    ],
    related: ['muito-pouco', 'gostar-de', 'comparativos'],
  },
  {
    slug: 'muito-pouco',
    title: 'Muito e pouco',
    level: 'A1',
    category: 'Adjetivos e adverbios',
    summary: 'Quantificadores que expressam quantidade ou intensidade.',
    explanation: `**Muito** e **pouco** como adjetivos (variam): *Tenho muitos livros.* / Como advérbios (invariáveis): *Ela é muito bonita.*`,
    rules: [
      'Como adjetivo, muito/pouco concordam em género e número.',
      'Como advérbio, muito/pouco são invariáveis.',
      'Muito antes de adjetivo/advérbio é invariável.',
      'Muito antes de substantivo varia.',
    ],
    examples: [
      {
        english: 'Tenho muito trabalho.',
        translation: 'I have a lot of work.',
      },
      {
        english: 'Ela tem muitos amigos.',
        translation: 'She has many friends.',
      },
      {
        english: 'Ele é muito alto.',
        translation: 'He is very tall.',
        note: 'invariável',
      },
      {
        english: 'Há poucas pessoas na rua.',
        translation: 'There are few people on the street.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Ela é muita bonita.',
        correct: 'Ela é muito bonita.',
        note: 'Antes de adjetivo, muito é invariável.',
      },
      {
        wrong: 'Tenho muito amigos.',
        correct: 'Tenho muitos amigos.',
        note: 'Antes de substantivo plural, varia.',
      },
    ],
    related: ['tambem-tampouco', 'adjetivos-descritivos', 'comparativos'],
  },
  {
    slug: 'haver',
    title: 'Haver (Impessoal)',
    level: 'A1',
    category: 'Verbos',
    summary:
      'Haver impessoal expressa existência, tempo decorrido e acontecimentos.',
    explanation: `**Haver** impessoal (sempre há):\n\n1. Existência: *Há um gato. / Há muitas pessoas.* (sempre singular!)\n2. Tempo decorrido: *Cheguei há duas horas.*\n3. Acontecimento: *Houve um acidente.*\n\nEP coloquial: *ter* substitui *haver*: *Tem um gato.*`,
    rules: [
      'Haver impessoal usa-se sempre no singular.',
      'Tempo decorrido: há + período de tempo.',
      'No coloquial EP, ter substitui haver.',
      'Haver pode conjugar-se: haverá, houve, havia.',
    ],
    examples: [
      {
        english: 'Há um supermercado perto daqui.',
        translation: 'There is a supermarket nearby.',
      },
      {
        english: 'Há muitas pessoas na fila.',
        translation: 'There are many people in line.',
      },
      {
        english: 'Cheguei há cinco minutos.',
        translation: 'I arrived five minutes ago.',
      },
      {
        english: 'Houve um problema na reunião.',
        translation: 'There was a problem at the meeting.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Hão muitas pessoas.',
        correct: 'Há muitas pessoas.',
        note: 'Haver impessoal é sempre singular.',
      },
      {
        wrong: 'Cheguei há duas horas atrás.',
        correct: 'Cheguei há duas horas.',
        note: 'Há já significa tempo decorrido; atrás é redundante.',
      },
    ],
    related: ['ter', 'preposicoes-lugar'],
  },
  {
    slug: 'preposicoes-lugar',
    title: 'Preposições de lugar',
    level: 'A1',
    category: 'Preposicoes',
    summary: 'Em, no, na, a, para, de — como indicar localização.',
    explanation: `Principais preposições:\n\n- em + artigo = no/na/nos/nas: *Estou na cozinha.*\n- a: direção: *Vou a Lisboa.*\n- para: destino final: *Vou para casa.*\n- de: origem: *Sou de Lisboa.*\n\nContrações: em+o=no, em+a=na, a+o=ao, de+o=do, por+a=pela.`,
    rules: [
      'Em + artigo = no, na, nos, nas.',
      'Estar + em = localização estática.',
      'Ir + a/para = movimento.',
      'Em Portugal, ir a é mais comum que ir para.',
    ],
    examples: [
      {
        english: 'O livro está na mesa.',
        translation: 'The book is on the table.',
      },
      { english: 'Moro em Lisboa.', translation: 'I live in Lisbon.' },
      {
        english: 'Vou ao cinema.',
        translation: "I'm going to the cinema.",
        note: 'a+o=ao',
      },
      {
        english: 'Ela veio do Porto.',
        translation: 'She came from Porto.',
        note: 'de+o=do',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Estou em o carro.',
        correct: 'Estou no carro.',
        note: 'em + o = no (contração obrigatória).',
      },
      {
        wrong: 'Vou no supermercado.',
        correct: 'Vou ao supermercado.',
        note: 'Destino usa a+artigo=ao, não em+artigo.',
      },
    ],
    related: ['contracoes-preposicionais', 'estar', 'ir-futuro'],
  },
  {
    slug: 'contracoes-preposicionais',
    title: 'Contrações preposicionais',
    level: 'A1',
    category: 'Preposicoes',
    summary: 'Combinações obrigatórias de preposições com artigos e pronomes.',
    explanation: `Contrações obrigatórias:\n\n**de:** de+o=do, de+a=da, de+os=dos, de+as=das\n**em:** em+o=no, em+a=na, em+os=nos, em+as=nas\n**a:** a+o=ao, a+os=aos\n**por:** por+o=pelo, por+a=pela, por+os=pelos, por+as=pelas`,
    rules: [
      'As contrações são obrigatórias na escrita padrão.',
      'de+artigo=do, da, dos, das.',
      'em+artigo=no, na, nos, nas.',
      'a+o=ao; por+artigo=pelo, pela.',
    ],
    examples: [
      {
        english: 'O carro do meu pai.',
        translation: "My father's car.",
        note: 'de+o=do',
      },
      {
        english: 'Ela está na escola.',
        translation: 'She is at school.',
        note: 'em+a=na',
      },
      {
        english: 'Vou ao médico amanhã.',
        translation: "I'm going to the doctor tomorrow.",
        note: 'a+o=ao',
      },
      {
        english: 'Passeamos pela cidade.',
        translation: 'We walked through the city.',
        note: 'por+a=pela',
      },
    ],
    common_mistakes: [
      {
        wrong: 'O livro de o Pedro.',
        correct: 'O livro do Pedro.',
        note: 'A contração é obrigatória.',
      },
      {
        wrong: 'Estou em a sala.',
        correct: 'Estou na sala.',
        note: 'em + a = na.',
      },
    ],
    related: [
      'preposicoes-lugar',
      'artigos-definidos',
      'adjetivos-possessivos',
    ],
  },
  {
    slug: 'ir-futuro',
    title: 'Ir + infinitivo (futuro próximo)',
    level: 'A1',
    category: 'Tempos verbais',
    summary: 'Expressar planos e futuro próximo com ir + infinitivo.',
    explanation: `O futuro próximo forma-se com o verbo **ir** no presente + infinitivo.\n\nConjugação de ir: eu vou / tu vais / ele-você vai / nós vamos / eles-vocês vão.\n\nNa fala portuguesa, esta construção é MUITO mais comum que o futuro simples.`,
    rules: [
      'Ir no presente + verbo principal no infinitivo.',
      'Não se usa preposição entre ir e o infinitivo.',
      'Uso comum para planos e intenções próximas.',
      'Em EP, o futuro simples é menos comum na fala.',
    ],
    examples: [
      {
        english: 'Vou visitar os meus pais no domingo.',
        translation: "I'm going to visit my parents on Sunday.",
      },
      {
        english: 'Ela vai começar um novo trabalho.',
        translation: 'She is going to start a new job.',
      },
      {
        english: 'Vamos viajar para o Algarve.',
        translation: 'We are going to travel to the Algarve.',
      },
      {
        english: 'O que é que vais fazer amanhã?',
        translation: 'What are you going to do tomorrow?',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Vou a estudar.',
        correct: 'Vou estudar.',
        note: 'Não se usa preposição entre ir e o infinitivo.',
      },
      {
        wrong: 'Eu ir estudar.',
        correct: 'Eu vou estudar.',
        note: 'O verbo ir deve ser conjugado.',
      },
    ],
    related: ['presente-regular', 'querer-poder', 'futuro-do-presente'],
  },
  {
    slug: 'querer-poder',
    title: 'Querer e poder',
    level: 'A1',
    category: 'Verbos',
    summary: 'Verbos irregulares que expressam desejo e capacidade.',
    explanation: `**Querer**: eu quero / tu queres / ele-você quer / nós queremos / eles-vocês querem\n**Poder**: eu posso / tu podes / ele-você pode / nós podemos / eles-vocês podem`,
    rules: [
      'Querer e Poder são irregulares na 1.ª pessoa (quero, posso).',
      'Querer + infinitivo = desejo.',
      'Poder + infinitivo = capacidade ou permissão.',
      'Em EP, ser capaz de é alternativa a poder.',
    ],
    examples: [
      {
        english: 'Quero um bilhete para Lisboa.',
        translation: 'I want a ticket to Lisbon.',
      },
      {
        english: 'Podes ajudar-me?',
        translation: 'Can you help me?',
        note: 'tu, informal',
      },
      { english: 'Não posso sair hoje.', translation: "I can't go out today." },
      {
        english: 'Ela quer ser médica.',
        translation: 'She wants to be a doctor.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Eu podo falar inglês.',
        correct: 'Eu posso falar inglês.',
        note: 'Poder→eu posso, não podo.',
      },
      {
        wrong: 'Queres que eu vou?',
        correct: 'Queres que eu vá?',
        note: 'Querer que + presente do conjuntivo.',
      },
    ],
    related: [
      'presente-regular',
      'gostar-de',
      'ir-futuro',
      'presente-conjuntivo',
    ],
  },
  {
    slug: 'dias-semana',
    title: 'Dias da semana',
    level: 'A1',
    category: 'Substantivos',
    summary: 'Os dias da semana e como usá-los com artigos e preposições.',
    explanation: `Dias da semana: segunda-feira, terça-feira, quarta-feira, quinta-feira, sexta-feira, sábado, domingo.\n\nNotas:\n- Dias úteis terminam em -feira.\n- Na fala, omite-se -feira: *na segunda, na terça*.\n- Com artigos: *na segunda-feira* (em+a); *no sábado* (em+o).`,
    rules: [
      'Dias podem usar-se com ou sem artigo.',
      'Com artigo: na segunda-feira.',
      'Sem artigo (mais formal): A reunião é segunda-feira.',
      'Na fala, omite-se -feira.',
      'Sábado e domingo usam artigo masculino.',
    ],
    examples: [
      {
        english: 'A aula é na terça-feira.',
        translation: 'The class is on Tuesday.',
      },
      {
        english: 'No sábado vou à praia.',
        translation: 'On Saturday I go to the beach.',
      },
      {
        english: 'O restaurante fecha à segunda.',
        translation: 'The restaurant is closed on Mondays.',
        note: 'omite -feira',
      },
      {
        english: 'Que dia é hoje? Hoje é quinta.',
        translation: 'What day is today? Today is Thursday.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'No segunda-feira.',
        correct: 'Na segunda-feira.',
        note: 'Segunda-feira é feminino: na, não no.',
      },
      {
        wrong: 'A reunião é em segunda.',
        correct: 'A reunião é na segunda.',
        note: 'em+a=na.',
      },
    ],
    related: ['horas', 'preposicoes-lugar', 'contracoes-preposicionais'],
  },
  {
    slug: 'estar-a-infinitivo',
    title: 'Estar a + infinitivo',
    level: 'A1',
    category: 'Tempos verbais',
    summary: 'A forma perifrástica do português europeu para ações em curso.',
    explanation: `Em **Português Europeu**, a ação em curso expressa-se com **estar a + infinitivo** — diferente do gerúndio usado no Brasil.\n\n- *Estou a ler um livro.* (EP) = *Estou lendo um livro.* (BP)\n\nO gerúndio em EP usa-se apenas em contextos específicos ou registo literário.`,
    rules: [
      'EP: estar a + infinitivo (nunca gerúndio para presente contínuo).',
      'O verbo estar conjuga-se no tempo desejado.',
      'Gerúndio em EP usa-se apenas em contextos específicos.',
      'Esta construção é uma das principais diferenças EP/BP.',
    ],
    examples: [
      {
        english: 'Estou a estudar português.',
        translation: 'I am studying Portuguese.',
        note: 'EP: a + infinitivo',
      },
      {
        english: 'Ela está a falar ao telefone.',
        translation: 'She is talking on the phone.',
      },
      {
        english: 'Estamos a pensar em comprar uma casa.',
        translation: 'We are thinking about buying a house.',
      },
      {
        english: 'O que é que estás a fazer?',
        translation: 'What are you doing?',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Estou estudando português.',
        correct: 'Estou a estudar português.',
        note: 'EP não usa gerúndio; usa estar a + infinitivo.',
      },
      {
        wrong: 'Estou em estudar.',
        correct: 'Estou a estudar.',
        note: 'A preposição é a, não em.',
      },
    ],
    related: ['estar', 'andar-a-estar-a'],
  },
  {
    slug: 'demonstrativos',
    title: 'Os demonstrativos: este, esse, aquele',
    level: 'A1',
    category: 'Adjetivos e adverbios',
    summary:
      'Uso dos pronomes e adjetivos demonstrativos para indicar a posição de algo em relação às pessoas do discurso.',
    structure:
      'este/esta/estes/estas (perto de quem fala) · esse/essa/esses/essas (perto de quem ouve) · aquele/aquela/aqueles/aquelas (longe) · isto/isso/aquilo (neutro)',
    explanation:
      'Os **demonstrativos** indicam a localização espacial ou temporal de algo em relação ao falante e ao ouvinte.\n\n- **Este/esta/estes/estas** → perto de quem fala: *Este livro é meu.*\n- **Esse/essa/esses/essas** → perto de quem ouve: *Essa caneta que tens na mão é bonita.*\n- **Aquele/aquela/aqueles/aquelas** → longe de ambos: *Aquele prédio ali é o museu.*\n\nAs formas **neutras** (isto, isso, aquilo) usam-se para referir ideias ou objetos não especificados:\n- *O que é isto?*\n- *Isso que disseste não é verdade.*\n\n**Como adjetivos**, precedem o nome e concordam em género e número: *este carro, esta casa, estes livros, estas flores.*\n\n**Como pronomes**, substituem o nome: *—Qual camisola queres? —Esta.*\n\nEm português europeu, as formas contraídas com preposições são comuns: *neste* (em+este), *desse* (de+esse), *àquele* (a+aquele).',
    rules: [
      '"Este/esta" indica o que está perto de quem fala (aqui).',
      '"Esse/essa" indica o que está perto de quem ouve (aí).',
      '"Aquele/aquela" indica o que está longe de ambos (ali/acolá).',
      'As formas neutras (isto, isso, aquilo) referem-se a ideias ou objetos não nomeados.',
      'Contraem-se com as preposições em e de: neste, desse, naquele, desta, daquela.',
    ],
    examples: [
      {
        english: 'Este livro é muito interessante.',
        translation: 'This book is very interesting.',
        note: 'perto de quem fala',
      },
      {
        english: 'Essa mochila que tens aí é nova?',
        translation: 'That backpack you have there is new?',
        note: 'perto de quem ouve',
      },
      {
        english: 'Aquele senhor ali é o meu avô.',
        translation: 'That gentleman over there is my grandfather.',
        note: 'longe de ambos',
      },
      {
        english: 'O que é isto?',
        translation: 'What is this?',
        note: 'forma neutra',
      },
      {
        english: 'Neste momento não posso falar.',
        translation: "At this moment I can't talk.",
        note: 'contração em+este',
      },
    ],
    common_mistakes: [
      {
        wrong: 'A este casa é bonita.',
        correct: 'Esta casa é bonita.',
        note: 'O demonstrativo não leva artigo.',
      },
      {
        wrong: 'Aquilo livro é meu.',
        correct: 'Aquele livro é meu.',
        note: '"Aquilo" é a forma neutra; para acompanhar "livro" usa-se "aquele".',
      },
    ],
    related: [
      'adjetivos-descritivos',
      'adjetivos-possessivos',
      'artigos-definidos',
    ],
  },
  {
    slug: 'numeros-ordinais',
    title: 'Números ordinais',
    level: 'A1',
    category: 'Adjetivos e adverbios',
    summary: 'Formação e uso dos números ordinais em português.',
    structure:
      'primeiro · segundo · terceiro · quarto · quinto · sexto · sétimo · oitavo · nono · décimo',
    explanation:
      'Os **números ordinais** indicam a ordem ou posição numa sequência.\n\n- 1.º — primeiro/primeira\n- 2.º — segundo/segunda\n- 3.º — terceiro/terceira\n- 4.º — quarto/quarta\n- 5.º — quinto/quinta\n- 6.º — sexto/sexta\n- 7.º — sétimo/sétima\n- 8.º — oitavo/oitava\n- 9.º — nono/nona\n- 10.º — décimo/décima\n\nUsam-se **antes do nome**: *o primeiro dia, a segunda aula.*\n\n**Abreviam-se** com ponto abreviativo e indicador de género:\n- 1.º (primeiro), 1.ª (primeira)\n- 2.º, 2.ª, etc.\n\nPara perguntar a posição: *Em que lugar ficaste? — Fiquei em terceiro.*',
    rules: [
      'Os ordinais concordam em género com o nome: primeiro/primeira, segundo/segunda.',
      'Usam-se antes do nome: o terceiro andar, a quinta sinfonia.',
      'Abreviam-se com .º (masculino) e .ª (feminino).',
      'Em português europeu usam-se ordinais para andares e reis: D. João II (segundo).',
    ],
    examples: [
      {
        english: 'Moro no terceiro andar.',
        translation: 'I live on the third floor.',
        note: 'ordinal antes do nome',
      },
      {
        english: 'É a primeira vez que visito Portugal.',
        translation: "It's the first time I visit Portugal.",
        note: 'primeira (feminino)',
      },
      {
        english: 'Ficou em segundo lugar na corrida.',
        translation: 'He came in second place in the race.',
        note: 'posição',
      },
      {
        english:
          'O meu aniversário é a 15.ª edição? Não, é o meu 15.º aniversário.',
        translation: 'My birthday is the 15th.',
        note: 'abreviatura',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Moro no andar terceiro.',
        correct: 'Moro no terceiro andar.',
        note: 'Em português, o ordinal vem antes do nome.',
      },
      {
        wrong: 'É a primeiro vez.',
        correct: 'É a primeira vez.',
        note: '"Vez" é feminino → primeira.',
      },
    ],
    related: ['horas', 'dias-semana'],
  },
  {
    slug: 'preterito-perfeito-regular',
    title: 'Pretérito perfeito simples (regulares)',
    level: 'A2',
    category: 'Tempos verbais',
    summary:
      'Conjugação do pretérito perfeito para verbos regulares em -ar, -er, -ir.',
    explanation: `| | fal**ar** | com**er** | abr**ir** |\n|---|-----------|-----------|----------|\n| eu | falei | comi | abri |\n| tu | falaste | comeste | abriste |\n| ele/você | falou | comeu | abriu |\n| nós | falamos | comemos | abrimos |\n| eles/vocês | falaram | comeram | abriram |`,
    rules: [
      '-ar: -ei, -aste, -ou, -ámos, -aram.',
      '-er: -i, -este, -eu, -emos, -eram.',
      '-ir: -i, -iste, -iu, -imos, -iram.',
      'Ação concluída e pontual no passado.',
      'A forma nós é igual no presente e pretérito para -ar.',
    ],
    examples: [
      {
        english: 'Ontem falei com a Maria.',
        translation: 'Yesterday I spoke with Maria.',
      },
      { english: 'Ela comeu tudo.', translation: 'She ate everything.' },
      {
        english: 'Nós abrimos a loja às oito.',
        translation: 'We opened the shop at eight.',
      },
      {
        english: 'Eles venderam a casa no ano passado.',
        translation: 'They sold the house last year.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Ontem eu falo com ela.',
        correct: 'Ontem eu falei com ela.',
        note: 'Ontem requer pretérito perfeito.',
      },
      {
        wrong: 'Nós falemos.',
        correct: 'Nós falamos.',
        note: 'Falemos é conjuntivo/imperativo, não pretérito.',
      },
    ],
    related: [
      'marcadores-temporais',
      'preterito-imperfeito',
      'perfeito-vs-imperfeito',
    ],
  },
  {
    slug: 'marcadores-temporais',
    title: 'Marcadores temporais',
    level: 'A2',
    category: 'Adjetivos e adverbios',
    summary: 'Palavras e expressões que situam ações no tempo.',
    explanation: `Marcadores por tempo:\n\n**Pretérito perfeito:** ontem, anteontem, a semana passada, há dois dias, já, ainda não, nunca.\n**Imperfeito:** todos os dias (no passado), antigamente, quando era criança, sempre, frequentemente.\n**Presente:** hoje, agora, atualmente, geralmente.\n**Futuro:** amanhã, na próxima semana, daqui a dois dias.`,
    rules: [
      'Ontem, há + tempo → pretérito perfeito.',
      'Antigamente, quando era..., todos os dias (passado) → imperfeito.',
      'Já = already; Ainda não = not yet (perfeito).',
      'Nunca pode usar-se com perfeito ou presente.',
    ],
    examples: [
      {
        english: 'Ontem fui ao cinema.',
        translation: 'Yesterday I went to the cinema.',
      },
      {
        english: 'Já leste o livro?',
        translation: 'Have you already read the book?',
      },
      {
        english: 'Ainda não terminei o trabalho.',
        translation: "I haven't finished the work yet.",
      },
      {
        english: 'Quando era criança, brincava na rua.',
        translation: 'When I was a child, I used to play in the street.',
        note: 'imperfeito',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Ontem eu vou ao cinema.',
        correct: 'Ontem eu fui ao cinema.',
        note: 'Ontem requer passado.',
      },
    ],
    related: [
      'preterito-perfeito-regular',
      'preterito-imperfeito',
      'perfeito-vs-imperfeito',
    ],
  },
  {
    slug: 'preterito-perfeito-irregular',
    title: 'Pretérito perfeito (irregulares)',
    level: 'A2',
    category: 'Tempos verbais',
    summary: 'Verbos irregulares mais comuns no pretérito perfeito.',
    explanation: `**Ser/Ir** (idênticos): fui, foste, foi, fomos, foram\n**Estar**: estive, estiveste, esteve, estivemos, estiveram\n**Ter**: tive, tiveste, teve, tivemos, tiveram\n**Fazer**: fiz, fizeste, fez, fizemos, fizeram\n**Querer**: quis, quiseste, quis, quisemos, quiseram\n**Poder**: pude, pudeste, pôde, pudemos, puderam\n**Saber**: soube, soubeste, soube, soubemos, souberam\n**Dar**: dei, deste, deu, demos, deram\n**Ver**: vi, viste, viu, vimos, viram\n**Vir**: vim, vieste, veio, viemos, vieram`,
    rules: [
      'Ser e Ir são idênticos no pretérito perfeito.',
      'Muitos irregulares têm raiz diferente.',
      'A 3.ª pl. termina em -ram.',
      'Memorizar estes verbos: são de uso diário.',
    ],
    examples: [
      {
        english: 'Eu fui ao médico ontem.',
        translation: 'I went to the doctor yesterday.',
        note: 'ir',
      },
      {
        english: 'A festa foi ótima.',
        translation: 'The party was great.',
        note: 'ser',
      },
      {
        english: 'Ela teve uma ideia brilhante.',
        translation: 'She had a brilliant idea.',
      },
      { english: 'Nós fizemos o jantar.', translation: 'We made dinner.' },
      { english: 'Eles vieram cedo.', translation: 'They came early.' },
    ],
    common_mistakes: [
      {
        wrong: 'Eu fazi o trabalho.',
        correct: 'Eu fiz o trabalho.',
        note: 'Fazer no pretérito: fiz, fizeste, fez...',
      },
    ],
    related: [
      'preterito-perfeito-regular',
      'marcadores-temporais',
      'perfeito-vs-imperfeito',
    ],
  },
  {
    slug: 'preterito-imperfeito',
    title: 'Pretérito imperfeito',
    level: 'A2',
    category: 'Tempos verbais',
    summary: 'Descrever ações habituais, contínuas ou descritivas no passado.',
    explanation: `| | fal**ar** | com**er** | abr**ir** |\n|---|-----------|-----------|----------|\n| eu | falava | comia | abria |\n| tu | falavas | comias | abrias |\n| ele | falava | comia | abria |\n| nós | falávamos | comíamos | abríamos |\n| eles | falavam | comiam | abriam |\n\nIrregulares (poucos!): ser (era), ter (tinha), vir (vinha), pôr (punha).`,
    rules: [
      '-ar: -ava; -er/-ir: -ia.',
      'Usa-se para hábitos passados, descrições e ações de fundo.',
      'Só quatro irregulares: ser, ter, vir, pôr.',
      'Imperfeito = cenário; perfeito = ação pontual.',
    ],
    examples: [
      {
        english: 'Quando era pequeno, morava no Porto.',
        translation: 'When I was little, I lived in Porto.',
      },
      {
        english: 'Ela cantava muito bem.',
        translation: 'She used to sing very well.',
      },
      {
        english: 'Estava a chover quando saí de casa.',
        translation: 'It was raining when I left home.',
      },
      {
        english: 'Eram cinco da tarde.',
        translation: 'It was five in the afternoon.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Quando era criança eu brinquei na rua.',
        correct: 'Quando era criança, brincava na rua.',
        note: 'Hábitos passados exigem imperfeito, não perfeito.',
      },
    ],
    related: ['perfeito-vs-imperfeito', 'costumava', 'marcadores-temporais'],
  },
  {
    slug: 'perfeito-vs-imperfeito',
    title: 'Perfeito vs imperfeito',
    level: 'A2',
    category: 'Tempos verbais',
    summary:
      'Quando usar o pretérito perfeito e quando usar o pretérito imperfeito.',
    explanation: `**Perfeito:** ação concluída, pontual. *Ontem fui ao cinema.*\n**Imperfeito:** ação habitual, contínua, descritiva. *Quando era criança, ia ao cinema.*\n\nRegra prática: imperfeito = CCTV (filme); perfeito = fotografia (momento).`,
    rules: [
      'Perfeito: ação concluída, contada como facto.',
      'Imperfeito: cenário, hábito, descrição.',
      'Com ontem, já, há → perfeito.',
      'Com todos os dias, quando... → imperfeito.',
      'Imperfeito pinta o fundo; perfeito avança a história.',
    ],
    examples: [
      {
        english: 'Estava a dormir quando o despertador tocou.',
        translation: 'I was sleeping when the alarm went off.',
        note: 'imperfeito + perfeito',
      },
      {
        english: 'Quando vivia em Lisboa, ia à praia todos os fins de semana.',
        translation:
          'When I lived in Lisbon, I used to go to the beach every weekend.',
      },
      {
        english: 'Ontem comi bacalhau.',
        translation: 'Yesterday I ate cod.',
        note: 'perfeito',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Ontem chovia muito.',
        correct: 'Ontem choveu muito.',
        note: 'Ontem refere-se a facto concluído → perfeito.',
      },
    ],
    related: [
      'preterito-perfeito-regular',
      'preterito-imperfeito',
      'costumava',
    ],
  },
  {
    slug: 'costumava',
    title: 'Costumar (hábitos passados)',
    level: 'A2',
    category: 'Tempos verbais',
    summary: 'Expressar hábitos passados com costumar + infinitivo.',
    explanation: `**Costumar** no imperfeito + infinitivo = hábitos passados:\n\n- *Costumava ir à praia.* (= I used to go)\n- *Ele costumava fumar, mas deixou.*\n\nConjugação: costumava, costumavas, costumava, costumávamos, costumavam.`,
    rules: [
      'Costumar no imperfeito + infinitivo = hábitos passados.',
      'Enfatiza que o hábito já não é atual.',
      'Alternativa: usar diretamente o imperfeito.',
      'Costumar no presente = hábito atual.',
    ],
    examples: [
      {
        english: 'Costumava acordar cedo.',
        translation: 'I used to wake up early.',
      },
      {
        english: 'Ela costumava cantar no coro.',
        translation: 'She used to sing in the choir.',
      },
      {
        english: 'Costumávamos jantar fora às sextas.',
        translation: 'We used to eat out on Fridays.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Costumei ir à praia.',
        correct: 'Costumava ir à praia.',
        note: 'Hábitos passados usam imperfeito, não perfeito.',
      },
    ],
    related: [
      'preterito-imperfeito',
      'perfeito-vs-imperfeito',
      'marcadores-temporais',
    ],
  },
  {
    slug: 'pronomes-objeto-direto',
    title: 'Pronomes de objeto direto',
    level: 'A2',
    category: 'Pronomes',
    summary:
      'O, a, os, as — pronomes átonos que substituem o complemento direto.',
    explanation: `Pronomes de objeto direto:\n\n- o (masc. sing.): *Comprei o livro → Comprei-o.*\n- a (fem. sing.): *Vi a Maria → Vi-a.*\n- os (masc. pl.) / as (fem. pl.)\n\nAdaptações: verbo -r/-s/-z → -lo/-la; verbo -m/-ão/-õe → -no/-na.`,
    rules: [
      'Pronomes o/a/os/as substituem o objeto direto.',
      'Após -r/-s/-z: lo, la, los, las.',
      'Após -m/-ão/-õe: no, na, nos, nas.',
      'Em EP, colocação enclítica.',
    ],
    examples: [
      { english: 'Comprei-o ontem.', translation: 'I bought it yesterday.' },
      {
        english: 'Vou comprá-lo.',
        translation: "I'm going to buy it.",
        note: '-r → -lo',
      },
      {
        english: 'Eles compraram-no.',
        translation: 'They bought it.',
        note: '-m → -no',
      },
      { english: 'Conheço-a.', translation: 'I know her.' },
    ],
    common_mistakes: [
      {
        wrong: 'Vou comprar-o.',
        correct: 'Vou comprá-lo.',
        note: 'Verbo em -r: pronome transforma-se em -lo.',
      },
      {
        wrong: 'Comprei ele.',
        correct: 'Comprei-o.',
        note: 'Ele é pronome sujeito, nunca objeto direto.',
      },
    ],
    related: ['pronomes-objeto-indireto', 'colocacao-pronominal'],
  },
  {
    slug: 'pronomes-objeto-indireto',
    title: 'Pronomes de objeto indireto',
    level: 'A2',
    category: 'Pronomes',
    summary:
      'Me, te, lhe, nos, lhes — pronomes que substituem o complemento indireto.',
    explanation: `| Pessoa | Pronome | Exemplo |\n|--------|---------|---------|\n| eu | me | *Deu-me o livro.* |\n| tu | te | *Ofereci-te um presente.* |\n| ele/você | lhe | *Disse-lhe a verdade.* |\n| nós | nos | *Emprestaram-nos o carro.* |\n| eles/vocês | lhes | *Expliquei-lhes a situação.* |`,
    rules: [
      'Me, te, lhe, nos, lhes substituem complemento com a.',
      'Lhe/lhes são para a 3.ª pessoa.',
      'Em EP, colocação enclítica é a regra geral.',
      'Podem combinar-se com OD: mo, to, lho.',
    ],
    examples: [
      {
        english: 'Dei-lhe o recado.',
        translation: 'I gave him/her the message.',
      },
      {
        english: 'A Maria emprestou-me o livro.',
        translation: 'Maria lent me the book.',
      },
      {
        english: 'Não te disse nada.',
        translation: "I didn't tell you anything.",
        note: 'negação → próclise',
      },
      {
        english: 'O professor explicou-lhes a matéria.',
        translation: 'The teacher explained the subject to them.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Dei para ele o livro.',
        correct: 'Dei-lhe o livro.',
        note: 'Usa-se pronome lhe em vez de para ele.',
      },
      {
        wrong: 'Eu lhe dei o livro.',
        correct: 'Eu dei-lhe o livro.',
        note: 'Frase afirmativa EP: pronome depois do verbo.',
      },
    ],
    related: ['pronomes-objeto-direto', 'colocacao-pronominal'],
  },
  {
    slug: 'colocacao-pronominal',
    title: 'Colocação pronominal (EP)',
    level: 'A2',
    category: 'Pronomes',
    summary: 'Regras de colocação dos pronomes átonos em português europeu.',
    explanation: `**1. Ênclise (depois do verbo) — regra geral:** *Chamo-me João.*\n**2. Próclise (antes) — com palavras atrativas:** negação, advérbios, pronomes relativos, interrogativos. *Não me digas. Já te disse.*\n**3. Mesóclise (no meio) — futuro e condicional:** *Dar-te-ei o livro.* (formal)`,
    rules: [
      'Ênclise é a regra geral em EP.',
      'Próclise obrigatória com negação, advérbios, relativos, interrogativos.',
      'Mesóclise com futuro e condicional (formal).',
      'Nunca se começa frase com pronome átono em EP.',
    ],
    examples: [
      {
        english: 'Chamo-me Ana.',
        translation: 'My name is Ana.',
        note: 'ênclise',
      },
      {
        english: 'Não te esqueças.',
        translation: "Don't forget.",
        note: 'próclise',
      },
      {
        english: 'Já lhe contei tudo.',
        translation: 'I already told him/her everything.',
        note: 'próclise com advérbio',
      },
      {
        english: 'Dar-te-ei uma resposta amanhã.',
        translation: 'I will give you an answer tomorrow.',
        note: 'mesóclise, formal',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Não esqueças-te.',
        correct: 'Não te esqueças.',
        note: 'Com negação, pronome vai antes do verbo.',
      },
      {
        wrong: 'Me chamo João.',
        correct: 'Chamo-me João.',
        note: 'EP não começa frase com pronome átono.',
      },
    ],
    related: [
      'pronomes-objeto-direto',
      'pronomes-objeto-indireto',
      'verbos-reflexivos',
    ],
  },
  {
    slug: 'comparativos',
    title: 'Comparativos',
    level: 'A2',
    category: 'Adjetivos e adverbios',
    summary: 'Mais... do que, menos... do que — expressar comparações.',
    explanation: `**Superioridade:** *mais + adj + do que*. **Inferioridade:** *menos + adj + do que*. **Igualdade:** *tão + adj + como*.\n\nIrregulares: bom→melhor, mau→pior, grande→maior, pequeno→menor.`,
    rules: [
      'Mais [adj] do que = superioridade.',
      'Menos [adj] do que = inferioridade.',
      'Tão [adj] como = igualdade.',
      'Bom/mau/grande/pequeno: melhor, pior, maior, menor.',
    ],
    examples: [
      {
        english: 'Lisboa é mais bonita do que Madrid.',
        translation: 'Lisbon is more beautiful than Madrid.',
      },
      {
        english: 'Este livro é melhor do que o filme.',
        translation: 'This book is better than the movie.',
        note: 'bom→melhor',
      },
      {
        english: 'Ela é tão inteligente como o irmão.',
        translation: 'She is as intelligent as her brother.',
      },
      {
        english: 'Hoje está menos frio do que ontem.',
        translation: 'Today is less cold than yesterday.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'É mais bom.',
        correct: 'É melhor.',
        note: 'Comparativo de bom é melhor.',
      },
    ],
    related: ['superlativos', 'tao-como', 'adjetivos-descritivos'],
  },
  {
    slug: 'superlativos',
    title: 'Superlativos',
    level: 'A2',
    category: 'Adjetivos e adverbios',
    summary: 'Expressar o grau máximo de uma qualidade.',
    explanation: `**Relativo:** *o/a mais + adj + de*. **Absoluto sintético:** adj + -íssimo (*bonitíssimo*). **Absoluto analítico:** *muito + adj*.\n\nIrregulares: bom→ótimo, mau→péssimo, grande→máximo, pequeno→mínimo.`,
    rules: [
      'Superlativo relativo: o mais + adj + de.',
      'Absoluto sintético: adj + -íssimo.',
      'Irregulares: ótimo, péssimo, máximo, mínimo.',
      'Na fala, muito + adjetivo é mais comum.',
    ],
    examples: [
      {
        english: 'Ela é a pessoa mais simpática que conheço.',
        translation: 'She is the nicest person I know.',
      },
      {
        english: 'Este restaurante é ótimo.',
        translation: 'This restaurant is excellent.',
      },
      {
        english: 'A torre é altíssima.',
        translation: 'The tower is very tall.',
        note: 'sintético',
      },
      {
        english: 'Este é o filme menos interessante do ano.',
        translation: 'This is the least interesting movie of the year.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'É a mais boa.',
        correct: 'É a melhor.',
        note: 'Superlativo de bom é melhor/ótima.',
      },
      {
        wrong: 'Este livro é muito ótimo.',
        correct: 'Este livro é ótimo.',
        note: 'Ótimo já é superlativo.',
      },
    ],
    related: ['comparativos', 'tao-como', 'adjetivos-descritivos'],
  },
  {
    slug: 'tao-como',
    title: 'Tão... como / tanto... como',
    level: 'A2',
    category: 'Adjetivos e adverbios',
    summary: 'Comparativos de igualdade com tão e tanto.',
    explanation: `**Tão... como** (qualidade): *É tão alto como o pai.*\n**Tanto/a/os/as... como** (quantidade): *Tenho tanto dinheiro como ele.*\n**Tanto como** (verbos): *Estudo tanto como tu.*\n**Tão... que** (consequência): *É tão caro que ninguém compra.*`,
    rules: [
      'Tão + adj/adv + como = igualdade de qualidade.',
      'Tanto/a/os/as + subst + como = igualdade de quantidade.',
      'Verbo + tanto como = igualdade de ação.',
      'Tão... que = consequência.',
    ],
    examples: [
      {
        english: 'É tão inteligente como tu.',
        translation: 'He is as intelligent as you.',
      },
      {
        english: 'Tenho tanto trabalho como na semana passada.',
        translation: 'I have as much work as last week.',
      },
      {
        english: 'Ela dorme tanto como eu.',
        translation: 'She sleeps as much as I do.',
      },
      {
        english: 'Estava tão cansada que adormeceu no sofá.',
        translation: 'She was so tired that she fell asleep on the sofa.',
        note: 'consequência',
      },
    ],
    common_mistakes: [
      {
        wrong: 'É tão alto do que tu.',
        correct: 'É tão alto como tu.',
        note: 'Tão... como, não tão... do que.',
      },
      {
        wrong: 'Tenho tão dinheiro como ele.',
        correct: 'Tenho tanto dinheiro como ele.',
        note: 'Com substantivo: tanto, não tão.',
      },
    ],
    related: ['comparativos', 'superlativos', 'adjetivos-descritivos'],
  },
  {
    slug: 'imperativo-afirmativo',
    title: 'Imperativo afirmativo',
    level: 'A2',
    category: 'Verbos',
    summary: 'Dar ordens, instruções e conselhos de forma afirmativa.',
    explanation: `**Tu**: radical do presente sem -s: *fala!, come!, abre!*\n**Você/Vocês**: presente do conjuntivo: *fale!, comam!*\n**Nós**: presente do conjuntivo: *falemos!*\n\nCom pronomes (ênclise): *Diz-me!, Senta-te!, Levantem-se!*`,
    rules: [
      'Tu: radical do presente sem -s.',
      'Você/vocês: presente do conjuntivo.',
      'Pronomes átonos seguem o verbo (ênclise).',
    ],
    examples: [
      {
        english: 'Fala mais devagar, por favor.',
        translation: 'Speak more slowly, please.',
        note: 'tu',
      },
      { english: 'Coma a sopa.', translation: 'Eat the soup.', note: 'você' },
      {
        english: 'Digam-me a verdade.',
        translation: 'Tell me the truth.',
        note: 'vocês + pronome',
      },
      { english: 'Senta-te.', translation: 'Sit down.', note: 'tu, reflexivo' },
    ],
    common_mistakes: [
      {
        wrong: 'Falas mais devagar!',
        correct: 'Fala mais devagar!',
        note: 'Imperativo tu perde o -s.',
      },
      {
        wrong: 'Senta-se! (para tu)',
        correct: 'Senta-te!',
        note: 'Para tu, o pronome é te.',
      },
    ],
    related: [
      'imperativo-negativo',
      'imperativo-irregular',
      'colocacao-pronominal',
    ],
  },
  {
    slug: 'imperativo-negativo',
    title: 'Imperativo negativo',
    level: 'A2',
    category: 'Verbos',
    summary: 'Dar ordens negativas, proibições e conselhos negativos.',
    explanation: `O imperativo negativo usa o **presente do conjuntivo** para **todas** as pessoas:\n- *Não fales alto!* (tu)\n- *Não fale alto!* (você)\n- *Não falemos alto!* (nós)\n- *Não falem alto!* (vocês)\n\nCom pronomes (próclise): *Não te esqueças!*`,
    rules: [
      'Imperativo negativo usa sempre o presente do conjuntivo.',
      'Para tu, a forma negativa é diferente da afirmativa.',
      'Com negação, pronomes vão antes do verbo (próclise).',
      'Você e vocês têm a mesma forma.',
    ],
    examples: [
      {
        english: 'Não fales tão alto.',
        translation: "Don't speak so loudly.",
        note: 'tu',
      },
      {
        english: 'Não coma isso.',
        translation: "Don't eat that.",
        note: 'você',
      },
      {
        english: 'Não se esqueçam do passaporte.',
        translation: "Don't forget your passports.",
        note: 'vocês + próclise',
      },
      {
        english: 'Não me interrompas.',
        translation: "Don't interrupt me.",
        note: 'tu, próclise',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Não fala alto! (para tu)',
        correct: 'Não fales alto!',
        note: 'Para tu, usa-se o conjuntivo.',
      },
      {
        wrong: 'Não esqueças-te!',
        correct: 'Não te esqueças!',
        note: 'Com negação, pronome vai antes do verbo.',
      },
    ],
    related: [
      'imperativo-afirmativo',
      'imperativo-irregular',
      'presente-conjuntivo',
    ],
  },
  {
    slug: 'imperativo-irregular',
    title: 'Imperativo irregular',
    level: 'A2',
    category: 'Verbos',
    summary: 'Formas irregulares do imperativo dos verbos mais comuns.',
    explanation: `| Verbo | tu | você |\n|-------|-----|------|\n| dizer | diz | diga |\n| fazer | faz | faça |\n| ser | sê | seja |\n| estar | está | esteja |\n| ir | vai | vá |\n| ter | tem | tenha |\n| pôr | põe | ponha |\n| vir | vem | venha |\n| ver | vê | veja |\n\nNegativo: sempre conjuntivo (*não digas, não faças*).`,
    rules: [
      'Cada verbo irregular deve ser memorizado.',
      'Tu: deriva do presente sem -s.',
      'Você/vocês: presente do conjuntivo.',
      'Negativo: sempre conjuntivo.',
    ],
    examples: [
      { english: 'Sê simpático.', translation: 'Be nice.', note: 'ser, tu' },
      {
        english: 'Faça o favor de entrar.',
        translation: 'Please come in.',
        note: 'fazer, você',
      },
      {
        english: 'Põe a mesa, por favor.',
        translation: 'Set the table, please.',
        note: 'pôr, tu',
      },
      {
        english: 'Não ponhas os pés em cima da mesa.',
        translation: "Don't put your feet on the table.",
        note: 'negativo, tu',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Seja feliz! (para tu)',
        correct: 'Sê feliz!',
        note: 'Para tu, imperativo de ser é sê.',
      },
      {
        wrong: 'Não faz isso!',
        correct: 'Não faças isso!',
        note: 'Negativo: não faças (tu).',
      },
    ],
    related: [
      'imperativo-afirmativo',
      'imperativo-negativo',
      'presente-conjuntivo',
    ],
  },
  {
    slug: 'futuro-do-presente',
    title: 'Futuro do presente',
    level: 'A2',
    category: 'Tempos verbais',
    summary: 'Conjugação do futuro simples do indicativo.',
    explanation: `Infinitivo + terminações: -ei, -ás, -á, -emos, -ão.\n\nIrregulares: dizer→direi, fazer→farei, trazer→trarei.\n\nNa fala, prefere-se *ir + infinitivo*. Com pronomes: mesóclise (*dir-te-ei*).`,
    rules: [
      'Forma-se com infinitivo + -ei, -ás, -á, -emos, -ão.',
      'Três irregulares: dizer, fazer, trazer.',
      'Na fala, pouco usado.',
      'Com pronomes: mesóclise (formal).',
    ],
    examples: [
      {
        english: 'Falaremos sobre isso amanhã.',
        translation: 'We will talk about it tomorrow.',
      },
      {
        english: 'O concerto realizar-se-á no sábado.',
        translation: 'The concert will take place on Saturday.',
        note: 'mesóclise',
      },
      {
        english: 'Direi a verdade.',
        translation: 'I will tell the truth.',
        note: 'irregular',
      },
      {
        english: 'Ela fará o jantar.',
        translation: 'She will make dinner.',
        note: 'irregular',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Nós fazeremos.',
        correct: 'Nós faremos.',
        note: 'Fazer no futuro é irregular: farei, farás...',
      },
    ],
    related: [
      'ir-futuro',
      'condicional',
      'futuro-composto',
      'futuro-do-conjuntivo',
    ],
  },
  {
    slug: 'condicional',
    title: 'Condicional simples',
    level: 'A2',
    category: 'Condicionais',
    summary:
      'Expressar hipóteses, desejos, pedidos cordiais e ações condicionadas.',
    explanation: `Infinitivo + -ia, -ias, -ia, -íamos, -iam. Irregulares: dizer→diria, fazer→faria, trazer→traria.\n\nUsos: hipóteses, desejos, pedidos cordiais, condicionais com se, futuro do pretérito.`,
    rules: [
      'Infinitivo + -ia, -ias, -ia, -íamos, -iam.',
      'Mesmos irregulares do futuro.',
      'Pedidos cordiais e hipóteses.',
      'Mesóclise (formal): dar-te-ia.',
    ],
    examples: [
      {
        english: 'Gostaria de um café, por favor.',
        translation: 'I would like a coffee, please.',
        note: 'pedido cordial',
      },
      {
        english: 'Se tivesse dinheiro, viajaria pelo mundo.',
        translation: 'If I had money, I would travel the world.',
      },
      {
        english: 'Ele disse que chegaria às três.',
        translation: 'He said he would arrive at three.',
      },
      { english: 'Poderia ajudar-me?', translation: 'Could you help me?' },
    ],
    common_mistakes: [
      {
        wrong: 'Se tivesse dinheiro, viajava pelo mundo.',
        correct: 'Se tivesse dinheiro, viajaria pelo mundo.',
        note: 'Se+imperfeito conj. → condicional.',
      },
      {
        wrong: 'Eu gostava de um café.',
        correct: 'Eu gostaria de um café.',
        note: 'Gostaria é mais cordial.',
      },
    ],
    related: [
      'futuro-do-presente',
      'condicional-composto',
      'se-imperfeito-subjuntivo',
    ],
  },
  {
    slug: 'futuro-composto',
    title: 'Futuro composto',
    level: 'A2',
    category: 'Tempos verbais',
    summary: 'Expressar ações que estarão concluídas num ponto futuro.',
    explanation: `Ter (futuro) + particípio passado.\n\nUsos: ação concluída antes de momento futuro, suposição sobre o passado (*Ele terá chegado atrasado?* = provavelmente).`,
    rules: [
      'Ter (futuro) + particípio passado.',
      'Ação concluída antes de momento futuro.',
      'Suposição/probabilidade sobre o passado.',
      'Particípio passado é invariável.',
    ],
    examples: [
      {
        english: 'Quando chegares, já terei terminado o trabalho.',
        translation: 'When you arrive, I will have already finished.',
      },
      {
        english: 'Ele ainda não chegou; terá havido trânsito.',
        translation: "He hasn't arrived; there must have been traffic.",
        note: 'suposição',
      },
      {
        english: 'Amanhã a esta hora já teremos partido.',
        translation: 'By this time tomorrow we will have already left.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Quando chegares, já vou ter jantado.',
        correct: 'Quando chegares, já terei jantado.',
        note: 'Não se usa ir+ter; usa-se ter no futuro.',
      },
    ],
    related: [
      'futuro-do-presente',
      'condicional',
      'preterito-perfeito-composto',
    ],
  },
  {
    slug: 'conectores-narrativos',
    title: 'Conectores narrativos',
    level: 'A2',
    category: 'Oracoes',
    summary: 'Palavras e expressões para organizar uma narrativa no tempo.',
    explanation: `**Início:** primeiro, no início. **Continuação:** depois, em seguida, então. **Simultaneidade:** enquanto, entretanto. **Conclusão:** por fim, finalmente. **Rutura:** de repente, contudo.`,
    rules: [
      'Primeiro/depois/em seguida/por fim para ordenar eventos.',
      'Enquanto/entretanto para ações simultâneas.',
      'De repente para eventos súbitos.',
      'Vírgula após conector no início em EP.',
    ],
    examples: [
      {
        english: 'Primeiro, tomei o pequeno-almoço. Depois, fui trabalhar.',
        translation: 'First, I had breakfast. Then I went to work.',
      },
      {
        english: 'Enquanto esperava, li um livro.',
        translation: 'While I was waiting, I read a book.',
      },
      {
        english: 'Por fim, conseguimos terminar o projeto.',
        translation: 'Finally, we managed to finish the project.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Enquanto que esperava.',
        correct: 'Enquanto esperava.',
        note: 'Enquanto é conjunção; não precisa de que.',
      },
    ],
    related: ['sequencia-temporal', 'conectores-argumentativos'],
  },
  {
    slug: 'sequencia-temporal',
    title: 'Sequência temporal',
    level: 'A2',
    category: 'Oracoes',
    summary: 'Expressões que indicam a ordem cronológica de eventos.',
    explanation: `**Anterioridade:** *Antes de + inf.* / *Antes que + conj.* **Posterioridade:** *Depois de + inf.* / *Mal + verbo.* **Simultaneidade:** *Ao + inf.* **Duração:** *Enquanto, Até que.*`,
    rules: [
      'Antes de/Depois de + inf. (sujeito igual).',
      'Antes que/Depois que + conj. (sujeito diferente).',
      'Ao + inf. = simultaneidade.',
      'Mal + verbo = assim que.',
    ],
    examples: [
      {
        english: 'Antes de sair, desliguei as luzes.',
        translation: 'Before leaving, I turned off the lights.',
      },
      {
        english: 'Depois de comer, lavámos a louça.',
        translation: 'After eating, we washed the dishes.',
      },
      {
        english: 'Mal entrei em casa, o telefone tocou.',
        translation: 'As soon as I got home, the phone rang.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Antes de que chegues.',
        correct: 'Antes que chegues.',
        note: 'Sem de com que + conjuntivo.',
      },
    ],
    related: ['conectores-narrativos', 'preterito-imperfeito'],
  },
  {
    slug: 'discurso-indireto',
    title: 'Discurso indireto',
    level: 'A2',
    category: 'Discurso indireto',
    summary: 'Relatar o que alguém disse sem citar textualmente.',
    explanation: `O discurso indireto faz ajustes de pronomes, tempos e referências:\n\n- Direto: *Estou cansada*, disse ela.\n- Indireto: *Ela disse que estava cansada.*\n\nTempos recuam: presente→imperfeito, perfeito→mais-que-perfeito, futuro→condicional.`,
    rules: [
      'Verbo introdutor (dizer, afirmar, perguntar) + que.',
      'Tempos recuam um grau.',
      'Pronomes e referências ajustam-se.',
      'Perguntas indiretas não usam interrogação.',
    ],
    examples: [
      {
        english: 'Ela disse que estava doente.',
        translation: 'She said she was sick.',
      },
      {
        english: 'Ele perguntou se eu queria café.',
        translation: 'He asked if I wanted coffee.',
        note: 'pergunta indireta com se',
      },
      {
        english: 'O professor explicou que a prova seria na sexta.',
        translation: 'The teacher explained that the test would be on Friday.',
      },
      {
        english: 'A Maria contou que tinha ido a Lisboa.',
        translation: 'Maria told me she had gone to Lisbon.',
        note: 'mais-que-perfeito',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Ela disse que está cansada.',
        correct: 'Ela disse que estava cansada.',
        note: 'Verbo no passado: tempo recua.',
      },
      {
        wrong: 'Ele perguntou que eu queria café.',
        correct: 'Ele perguntou se eu queria café.',
        note: 'Perguntas sim/não usam se.',
      },
    ],
    related: [
      'mudancas-temporais',
      'discurso-indireto-passado',
      'discurso-reportado',
    ],
  },
  {
    slug: 'mudancas-temporais',
    title: 'Mudanças temporais no discurso indireto',
    level: 'A2',
    category: 'Discurso indireto',
    summary: 'Transformações de tempo, lugar e pronomes ao relatar discurso.',
    explanation: `**Expressões temporais:** hoje→naquele dia, amanhã→no dia seguinte, ontem→no dia anterior, agora→naquele momento.\n**Lugar:** aqui→ali/lá.\n**Tempos:** presente→imperfeito, perfeito→mais-que-perfeito, futuro→condicional.`,
    rules: [
      'Hoje→naquele dia; amanhã→no dia seguinte; ontem→no dia anterior.',
      'Aqui→ali/lá; aí→ali/lá.',
      'Tempos verbais recuam um grau.',
      'Pronomes ajustam-se à perspetiva do narrador.',
    ],
    examples: [
      {
        english:
          'Ele disse que ia ao médico no dia seguinte. (direto: Vou ao médico amanhã.)',
        translation: 'He said he was going to the doctor the next day.',
      },
      {
        english: 'Ela disse que estava ali. (direto: Estou aqui.)',
        translation: 'She said she was there.',
      },
      {
        english:
          'Ela disse que tinha visto o filme no dia anterior. (direto: Vi o filme ontem.)',
        translation: 'She said she had seen the movie the day before.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Ele disse que vem amanhã. (discurso indireto)',
        correct: 'Ele disse que vinha no dia seguinte.',
        note: 'Vem e amanhã devem ser adaptados.',
      },
    ],
    related: ['discurso-indireto', 'discurso-indireto-passado'],
  },
  {
    slug: 'combinacao-pronominal',
    title: 'Combinação de pronomes: mo, to, lho',
    level: 'A2',
    category: 'Pronomes',
    summary:
      'Fusão dos pronomes de complemento direto e indireto numa só forma.',
    structure:
      'me+o → mo · te+o → to · lhe+o → lho · nos+o → no-lo · vos+o → vo-lo · lhes+o → lho',
    explanation:
      'Em português europeu, quando um pronome de **complemento indireto** (me, te, lhe, nos, vos, lhes) e um de **complemento direto** (o, a, os, as) aparecem juntos, fundem-se numa só forma.\n\n**Regras de combinação:**\n- me + o/a/os/as → mo/ma/mos/mas\n- te + o/a/os/as → to/ta/tos/tas\n- lhe + o/a/os/as → lho/lha/lhos/lhas\n- nos + o/a/os/as → no-lo/no-la/no-los/no-las\n- vos + o/a/os/as → vo-lo/vo-la/vo-los/vo-las\n- lhes + o/a/os/as → lho/lha/lhos/lhas (igual a lhe)\n\n**Posição:** em frases afirmativas, o pronome combinado coloca-se depois do verbo com hífen:\n- *Ele deu-mo.* (= Ele deu isso a mim)\n- *Vou explicar-to.* (= Vou explicar isso a ti)\n\nCom negação, coloca-se antes do verbo:\n- *Não mo deu.* (= Não me deu isso)\n\nNota: no Brasil, estas formas são raras e muitas vezes evitadas.',
    rules: [
      'A combinação é obrigatória no português europeu quando OD e OI coocorrem.',
      'A forma resultante concorda com o OD em género e número: mo/ma/mos/mas.',
      'O pronome combinado une o OI (1.ª parte) ao OD (2.ª parte).',
      'Após verbo conjugado, usa-se hífen: Deu-mo.',
      'Com negação, próclise: Não mo deu.',
    ],
    examples: [
      {
        english: 'Ele deu-mo ontem.',
        translation: 'He gave it to me yesterday.',
        note: 'me + o → mo',
      },
      {
        english: 'Quem te contou isso? — A Maria contou-to.',
        translation: 'Who told you that? — Maria told it to you.',
        note: 'te + o → to',
      },
      {
        english: 'O livro? Emprestei-lho na semana passada.',
        translation: 'The book? I lent it to him last week.',
        note: 'lhe + o → lho',
      },
      {
        english: 'Não no-lo entregaram a tempo.',
        translation: "They didn't deliver it to us on time.",
        note: 'nos + o → no-lo; próclise com negação',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Deu-me-o.',
        correct: 'Deu-mo.',
        note: 'Os pronomes devem fundir-se: me+o → mo.',
      },
      {
        wrong: 'Não deu-mo.',
        correct: 'Não mo deu.',
        note: 'Com negação, o pronome vai antes do verbo.',
      },
    ],
    related: [
      'pronomes-objeto-direto',
      'pronomes-objeto-indireto',
      'colocacao-pronominal',
    ],
  },
  {
    slug: 'presente-conjuntivo',
    title: 'Presente do conjuntivo',
    level: 'B1',
    category: 'Conjuntivo',
    summary: 'Formação e uso do presente do conjuntivo.',
    explanation: `| | falar | comer | abrir |\n|---|-------|-------|-------|\n| eu | fale | coma | abra |\n| tu | fales | comas | abras |\n| ele | fale | coma | abra |\n| nós | falemos | comamos | abramos |\n| eles | falem | comam | abram |\n\nIrregulares: ser (seja), estar (esteja), ter (tenha), ir (vá), saber (saiba), querer (queira), fazer (faça), pôr (ponha).`,
    rules: [
      'Forma-se a partir da 1.ª pessoa do presente.',
      'Substitui-se -o por -e (-ar) ou -a (-er/-ir).',
      'Usa-se após desejo, dúvida, necessidade, emoção.',
      'Muitos irregulares.',
    ],
    examples: [
      {
        english: 'Espero que fales com ela.',
        translation: 'I hope you talk to her.',
      },
      {
        english: 'Duvido que ele venha.',
        translation: 'I doubt he will come.',
        note: 'vir, irregular',
      },
      {
        english: 'É importante que tu estudes.',
        translation: 'It is important that you study.',
      },
      {
        english: 'Queres que eu vá contigo?',
        translation: 'Do you want me to go with you?',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Espero que tu falas com ela.',
        correct: 'Espero que tu fales com ela.',
        note: 'Depois de que, usa-se conjuntivo.',
      },
      {
        wrong: 'É preciso que ele vai.',
        correct: 'É preciso que ele vá.',
        note: 'Ir no conjuntivo: vá.',
      },
    ],
    related: ['talvez', 'expressoes-desejo', 'subjuntivo-recomendacao'],
  },
  {
    slug: 'expressoes-desejo',
    title: 'Expressões de desejo',
    level: 'B1',
    category: 'Conjuntivo',
    summary:
      'Usar o conjuntivo após expressões de desejo como espero que, quero que, oxalá.',
    explanation: `O conjuntivo é obrigatório após desejo:\n- *Espero que venhas. / Quero que sejas feliz. / Oxalá chova.*\n- *Tomara que ela passe.* / *Deus queira que não chova.*`,
    rules: [
      'Conjuntivo obrigatório após expressões de desejo.',
      'Querer que, esperar que, desejar que + conjuntivo.',
      'Oxalá e tomara que + conjuntivo.',
      'Mudança de sujeito ativa o conjuntivo.',
    ],
    examples: [
      {
        english: 'Espero que tenhas uma boa viagem.',
        translation: 'I hope you have a good trip.',
      },
      {
        english: 'Quero que vocês sejam felizes.',
        translation: 'I want you to be happy.',
      },
      {
        english: 'Oxalá não chova amanhã.',
        translation: "Let's hope it doesn't rain tomorrow.",
      },
      {
        english: 'Tomara que ela consiga o emprego.',
        translation: 'I hope she gets the job.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Espero que tens sucesso.',
        correct: 'Espero que tenhas sucesso.',
        note: 'Conjuntivo após espero que.',
      },
      {
        wrong: 'Quero que ele é pontual.',
        correct: 'Quero que ele seja pontual.',
        note: 'Ser no conjuntivo: seja.',
      },
    ],
    related: ['presente-conjuntivo', 'talvez', 'subjuntivo-recomendacao'],
  },
  {
    slug: 'talvez',
    title: 'Talvez',
    level: 'B1',
    category: 'Conjuntivo',
    summary: 'Usar talvez com conjuntivo para expressar possibilidade.',
    explanation: `**Talvez** + conjuntivo (padrão): *Talvez ele venha amanhã.*\nTalvez + indicativo (coloquial, mais certeza): *Talvez ele vem amanhã.*`,
    rules: [
      'Talvez + conjuntivo é a forma padrão.',
      'Talvez + indicativo é coloquial.',
      'Talvez pode ir antes ou depois do verbo.',
    ],
    examples: [
      {
        english: 'Talvez vá à festa.',
        translation: "Maybe I'll go to the party.",
      },
      {
        english: 'Talvez ela saiba a resposta.',
        translation: 'Maybe she knows the answer.',
      },
      {
        english: 'Vamos talvez ao cinema.',
        translation: "Maybe we'll go to the cinema.",
      },
      {
        english: 'Talvez seja melhor esperar.',
        translation: "Maybe it's better to wait.",
      },
    ],
    common_mistakes: [
      {
        wrong: 'Talvez ele vai.',
        correct: 'Talvez ele vá.',
        note: 'O padrão com talvez é o conjuntivo.',
      },
    ],
    related: ['presente-conjuntivo', 'expressoes-desejo', 'subjuntivo-duvida'],
  },
  {
    slug: 'subjuntivo-recomendacao',
    title: 'Conjuntivo com recomendações',
    level: 'B1',
    category: 'Conjuntivo',
    summary:
      'Conjuntivo após expressões impessoais de recomendação e necessidade.',
    explanation: `Usa-se conjuntivo após:\n- *É preciso que... / É necessário que... / É importante que...*\n- *Convém que... / É melhor que...*`,
    rules: [
      'É preciso/necessário/importante que + conjuntivo.',
      'Convém que + conjuntivo.',
      'É melhor que + conjuntivo.',
    ],
    examples: [
      {
        english: 'É preciso que acabes o trabalho.',
        translation: 'You need to finish the work.',
      },
      {
        english: 'É importante que todos participem.',
        translation: "It's important that everyone participates.",
      },
      {
        english: 'Convém que tragas o passaporte.',
        translation: 'You should bring your passport.',
      },
      {
        english: 'É melhor que vás ao médico.',
        translation: "You'd better go to the doctor.",
      },
    ],
    common_mistakes: [
      {
        wrong: 'É preciso que tu acabas.',
        correct: 'É preciso que tu acabes.',
        note: 'É preciso que exige conjuntivo.',
      },
      {
        wrong: 'É importante ele vai.',
        correct: 'É importante que ele vá.',
        note: 'Ir no conjuntivo: vá.',
      },
    ],
    related: [
      'presente-conjuntivo',
      'expressoes-desejo',
      'subjuntivo-avaliacao',
    ],
  },
  {
    slug: 'subjuntivo-duvida',
    title: 'Conjuntivo com dúvida',
    level: 'B1',
    category: 'Conjuntivo',
    summary:
      'Usar o conjuntivo para expressar dúvida, incerteza e probabilidade.',
    explanation: `Dúvida → conjuntivo:\n- *Duvido que ele venha. / Não acho que seja boa ideia.*\n- *É possível que chova. / Pode ser que ainda dê tempo.*`,
    rules: [
      'Duvido que, não acho que + conjuntivo.',
      'É possível/provável que + conjuntivo.',
      'Pode ser que + conjuntivo.',
      'Negação do verbo de opinião ativa o conjuntivo.',
    ],
    examples: [
      {
        english: 'Duvido que ela saiba a resposta.',
        translation: 'I doubt she knows the answer.',
      },
      {
        english: 'Não acho que seja uma boa ideia.',
        translation: "I don't think it's a good idea.",
      },
      {
        english: 'É possível que cheguemos atrasados.',
        translation: "It's possible we'll arrive late.",
      },
    ],
    common_mistakes: [
      {
        wrong: 'Não acho que ele tem razão.',
        correct: 'Não acho que ele tenha razão.',
        note: 'Negação + que → conjuntivo.',
      },
      {
        wrong: 'É possível que ela sabe.',
        correct: 'É possível que ela saiba.',
        note: 'É possível que exige conjuntivo.',
      },
    ],
    related: ['presente-conjuntivo', 'talvez', 'subjuntivo-recomendacao'],
  },
  {
    slug: 'subjuntivo-avaliacao',
    title: 'Conjuntivo com avaliações',
    level: 'B1',
    category: 'Conjuntivo',
    summary: 'Usar o conjuntivo após expressões de avaliação emocional.',
    explanation: `Avaliação → conjuntivo:\n- *É bom que tenhas vindo. / É uma pena que vás embora.*\n- *Que bom que estejas aqui! / Que pena que não possas vir.*`,
    rules: [
      'É bom/mau/triste/pena que + conjuntivo.',
      'Expressões emocionais ativam o conjuntivo.',
      'Que bom que/Que pena que + conjuntivo.',
    ],
    examples: [
      {
        english: 'É bom que estejas aqui.',
        translation: "It's good that you're here.",
      },
      {
        english: 'É uma pena que não possas vir.',
        translation: "It's a shame you can't come.",
      },
      {
        english: 'Que bom que tenhas gostado!',
        translation: "I'm so glad you liked it!",
      },
    ],
    common_mistakes: [
      {
        wrong: 'É bom que estás aqui.',
        correct: 'É bom que estejas aqui.',
        note: 'É bom que exige conjuntivo.',
      },
    ],
    related: [
      'presente-conjuntivo',
      'subjuntivo-recomendacao',
      'subjuntivo-duvida',
    ],
  },
  {
    slug: 'preterito-perfeito-composto',
    title: 'Pretérito perfeito composto',
    level: 'B1',
    category: 'Tempos verbais',
    summary:
      'Expressar ações repetidas ou contínuas que se prolongam até ao presente.',
    explanation: `Presente de **ter** + particípio passado.\n\n- *Tenho estudado muito.* (= I have been studying — ação repetida até agora)\n- *Ela tem trabalhado bastante.*\n\n**Diferenciação EP:** NÃO equivale ao present perfect inglês para ações únicas. *Comi ontem* (única), *Tenho comido bem* (repetida).`,
    rules: [
      'Ter (presente) + particípio.',
      'Ação repetida/contínua até ao presente.',
      'NÃO equivale ao present perfect para ações únicas.',
      'Ação única: pretérito perfeito simples.',
    ],
    examples: [
      {
        english: 'Tenho ido ao ginásio todas as semanas.',
        translation: 'I have been going to the gym every week.',
        note: 'repetida',
      },
      {
        english: 'Ela tem andado muito cansada.',
        translation: 'She has been very tired lately.',
      },
      {
        english: 'Ultimamente tenho pensado em ti.',
        translation: "Lately I've been thinking about you.",
      },
    ],
    common_mistakes: [
      {
        wrong: 'Tenho comido bacalhau ontem.',
        correct: 'Comi bacalhau ontem.',
        note: 'Ação única passada: pretérito simples, não composto.',
      },
    ],
    related: [
      'marcadores-composto',
      'mais-que-perfeito',
      'preterito-perfeito-regular',
    ],
  },
  {
    slug: 'mais-que-perfeito',
    title: 'Pretérito mais-que-perfeito simples',
    level: 'B1',
    category: 'Tempos verbais',
    summary: 'Expressar uma ação passada anterior a outra ação passada.',
    explanation: `Forma-se da 3.ª pl. do pretérito perfeito (-ram):\n\n*Falaram → falara, falaras, falara, faláramos, falaram.*\n\nUso literário/formal. Na fala, prefere-se o composto: *tinha falado*.`,
    rules: [
      'Forma-se a partir da 3.ª pl. do pretérito perfeito.',
      'Uso literário/formal.',
      'Na fala: ter (imperf.) + particípio.',
    ],
    examples: [
      {
        english: 'Quando cheguei, ela já saíra.',
        translation: 'When I arrived, she had already left.',
        note: 'literário',
      },
      {
        english: 'Quando cheguei, ela já tinha saído.',
        translation: 'When I arrived, she had already left.',
        note: 'composto, comum',
      },
    ],
    common_mistakes: [{ wrong: 'A', correct: 'm', note: 'b' }],
    related: [
      'preterito-perfeito-composto',
      'marcadores-composto',
      'preterito-mais-que-perfeito',
    ],
  },
  {
    slug: 'marcadores-composto',
    title: 'Marcadores do pretérito perfeito composto',
    level: 'B1',
    category: 'Adjetivos e adverbios',
    summary: 'Expressões que indicam ação contínua/repetida até ao presente.',
    explanation: `Marcadores típicos:\n\n- Ultimamente: *Ultimamente tenho dormido mal.*\n- Nos últimos tempos/meses/anos: *Tenho andado ocupado.*\n- Até agora: *Até agora tenho conseguido.*\n- Desde + data: *Desde janeiro que tenho ido.*`,
    rules: [
      'Ultimamente, nos últimos tempos → composto.',
      'Até agora + composto = ação contínua.',
      'Desde + data + que + composto.',
    ],
    examples: [
      {
        english: 'Ultimamente tenho pensado muito nisso.',
        translation: "Lately I've been thinking a lot about that.",
      },
      {
        english: 'Nos últimos meses tenho trabalhado muito.',
        translation: "In recent months I've been working a lot.",
      },
      {
        english: 'Até agora tudo tem corrido bem.',
        translation: 'So far everything has been going well.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Ultimamente estudei muito.',
        correct: 'Ultimamente tenho estudado muito.',
        note: 'Ultimamente pede composto.',
      },
    ],
    related: ['preterito-perfeito-composto', 'marcadores-temporais'],
  },
  {
    slug: 'voz-passiva',
    title: 'Voz passiva',
    level: 'B1',
    category: 'Voz passiva',
    summary: 'Formação e uso da voz passiva com ser + particípio passado.',
    explanation: `**Ser** + particípio passado (concordante com sujeito):\n\n- Ativa: *O chef preparou o jantar.*\n- Passiva: *O jantar foi preparado pelo chef.*\n\nO agente é introduzido por *por*. O particípio concorda em género e número.`,
    rules: [
      'Ser + particípio passado (concordante).',
      'Agente = por + substantivo.',
      'Particípio concorda.',
      'Mais comum na escrita formal.',
    ],
    examples: [
      {
        english: 'O bolo foi feito pela minha avó.',
        translation: 'The cake was made by my grandmother.',
      },
      {
        english: 'As cartas são entregues de manhã.',
        translation: 'The letters are delivered in the morning.',
      },
      {
        english: 'A ponte foi construída em 1900.',
        translation: 'The bridge was built in 1900.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'O bolo foi feito por minha avó.',
        correct: 'O bolo foi feito pela minha avó.',
        note: 'Pela = por+a, contração obrigatória.',
      },
    ],
    related: ['se-impessoal', 'se-passivo', 'passiva-reflexa'],
  },
  {
    slug: 'se-impessoal',
    title: 'Se impessoal',
    level: 'B1',
    category: 'Voz passiva',
    summary: 'Usar a partícula se para expressar sujeito indeterminado.',
    explanation: `**Se** como índice de indeterminação do sujeito:\n- Verbo sempre na 3.ª singular: *Vive-se bem em Portugal.*\n- *Precisa-se de empregados.* (singular, mesmo com objeto plural)\n\nNÃO confundir com se passivo (verbo concorda com sujeito).`,
    rules: [
      'Se impessoal: verbo sempre na 3.ª singular.',
      'Usa-se com verbos intransitivos ou transitivos indiretos.',
    ],
    examples: [
      {
        english: 'Vive-se bem nesta cidade.',
        translation: 'One lives well in this city.',
      },
      {
        english: 'Precisa-se de voluntários.',
        translation: 'Volunteers are needed.',
        note: 'singular',
      },
      { english: 'Aqui come-se bem.', translation: 'One eats well here.' },
    ],
    common_mistakes: [
      {
        wrong: 'Precisam-se de voluntários.',
        correct: 'Precisa-se de voluntários.',
        note: 'Se impessoal: verbo fica no singular.',
      },
    ],
    related: ['se-passivo', 'voz-passiva'],
  },
  {
    slug: 'se-passivo',
    title: 'Se passivo',
    level: 'B1',
    category: 'Voz passiva',
    summary: 'Usar a partícula se para formar a voz passiva sintética.',
    explanation: `**Se passivo**: verbo concorda com o sujeito paciente.\n- *Vende-se uma casa. / Vendem-se casas.*\n\nEquivale a: *Uma casa é vendida. / Casas são vendidas.*\n\nMuito comum em anúncios.`,
    rules: [
      'Se passivo: verbo concorda com sujeito.',
      'Equivale à passiva com ser.',
      'Comum em anúncios e linguagem formal.',
    ],
    examples: [
      {
        english: 'Vende-se este apartamento.',
        translation: 'This apartment is for sale.',
      },
      {
        english: 'Vendem-se carros usados.',
        translation: 'Used cars are sold.',
      },
      { english: 'Alugam-se quartos.', translation: 'Rooms for rent.' },
    ],
    common_mistakes: [
      {
        wrong: 'Vende-se carros.',
        correct: 'Vendem-se carros.',
        note: 'Se passivo: verbo concorda com carros (plural).',
      },
    ],
    related: ['se-impessoal', 'voz-passiva', 'passiva-reflexa'],
  },
  {
    slug: 'que-relativo',
    title: 'Pronome relativo que',
    level: 'B1',
    category: 'Oracoes',
    summary: 'Usar que como pronome relativo para orações subordinadas.',
    explanation: `**Que** refere-se a pessoas e coisas, pode ser sujeito ou objeto:\n\n- *O livro que li é interessante.*\n- *A pessoa que chegou é o diretor.*\n\nCom preposição: *de que, a que, em que, por que* (formal).`,
    rules: [
      'Que refere-se a pessoas e coisas.',
      'Pode ser sujeito ou objeto.',
      'Com preposição: de que, a que, em que.',
    ],
    examples: [
      {
        english: 'O livro que estou a ler é fascinante.',
        translation: "The book I'm reading is fascinating.",
      },
      {
        english: 'A pessoa que telefonou não deixou nome.',
        translation: "The person who called didn't leave a name.",
      },
      {
        english: 'O filme de que te falei ganhou um prémio.',
        translation: 'The film I told you about won a prize.',
        note: 'formal',
      },
    ],
    common_mistakes: [
      {
        wrong: 'O livro que eu gosto.',
        correct: 'O livro de que eu gosto.',
        note: 'Gostar exige de: de que.',
      },
    ],
    related: ['onde-quando-relativo', 'cujo'],
  },
  {
    slug: 'onde-quando-relativo',
    title: 'Pronomes relativos onde e quando',
    level: 'B1',
    category: 'Oracoes',
    summary: 'Usar onde (lugar) e quando (tempo) como pronomes relativos.',
    explanation: `**Onde** (= where): lugar físico. **Nota EP:** NÃO usar onde para situações abstratas; usar *em que* ou *no qual*.\n**Quando** (= when): tempo.`,
    rules: [
      'Onde = lugar físico. Não usar para situações abstratas.',
      'Quando = tempo.',
      'Para situações abstratas: em que / no qual.',
    ],
    examples: [
      {
        english: 'A casa onde cresci era no campo.',
        translation: 'The house where I grew up was in the countryside.',
      },
      {
        english: 'O país de onde venho é frio.',
        translation: 'The country I come from is cold.',
      },
      {
        english: 'Lembro-me do dia quando nos conhecemos.',
        translation: 'I remember the day when we met.',
      },
      {
        english: 'Esta é a razão pela qual não fui.',
        translation: "This is the reason why I didn't go.",
        note: 'razão → pela qual',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Uma situação onde todos ganham.',
        correct: 'Uma situação em que todos ganham.',
        note: 'Onde é só para lugar físico.',
      },
    ],
    related: ['que-relativo', 'cujo'],
  },
  {
    slug: 'cujo',
    title: 'Pronome relativo cujo',
    level: 'B1',
    category: 'Oracoes',
    summary: 'Usar cujo/a/os/as para expressar posse em orações relativas.',
    explanation: `**Cujo** (= whose) concorda em género e número com a **coisa possuída** (não com o possuidor).\n\n- *O homem cujo filho é médico.* (filho = masc. sing.)\n- *A mulher cuja casa visitei.* (casa = fem. sing.)\n\nCujo NUNCA é seguido de artigo.`,
    rules: [
      'Cujo concorda com a coisa possuída.',
      'NUNCA se usa artigo depois de cujo.',
    ],
    examples: [
      {
        english: 'O escritor cujo livro ganhou o prémio.',
        translation: 'The writer whose book won the prize.',
      },
      {
        english: 'A rapariga cuja mãe conheces.',
        translation: 'The girl whose mother you know.',
      },
      {
        english: 'As empresas cujos funcionários estão em greve.',
        translation: 'The companies whose employees are on strike.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'O homem cujo o filho é médico.',
        correct: 'O homem cujo filho é médico.',
        note: 'Cujo nunca leva artigo.',
      },
    ],
    related: ['que-relativo', 'onde-quando-relativo'],
  },
  {
    slug: 'condicional-composto',
    title: 'Condicional composto',
    level: 'B1',
    category: 'Condicionais',
    summary: 'Expressar condições não realizadas no passado.',
    explanation: `Ter (condicional) + particípio passado.\n\n- *Se tivesse estudado, teria passado.*\n- *Ela teria vindo se soubesse.*`,
    rules: [
      'Ter (condicional) + particípio.',
      'Condição não realizada no passado.',
      'Usa-se com se + MQP conjuntivo.',
    ],
    examples: [
      {
        english: 'Se tivesse estudado, teria passado no exame.',
        translation: 'If I had studied, I would have passed the exam.',
      },
      {
        english: 'Ela teria vindo se soubesse.',
        translation: 'She would have come if she had known.',
      },
      {
        english: 'Sem a tua ajuda, não teríamos conseguido.',
        translation: "Without your help, we wouldn't have managed.",
      },
    ],
    common_mistakes: [
      {
        wrong: 'Se tinha estudado, teria passado.',
        correct: 'Se tivesse estudado, teria passado.',
        note: 'Se + condição passada: MQP conjuntivo.',
      },
    ],
    related: ['condicional', 'se-imperfeito-subjuntivo'],
  },
  {
    slug: 'se-imperfeito-subjuntivo',
    title: 'Se + imperfeito do conjuntivo',
    level: 'B1',
    category: 'Condicionais',
    summary:
      'Construir orações condicionais com se + imperfeito do conjuntivo.',
    explanation: `**Estrutura:** *Se + imperfeito conjuntivo + condicional*\n- *Se tivesse dinheiro, viajaria pelo mundo.*\n- Coloquial EP: *Se tivesse dinheiro, viajava.* (imperfeito em vez de condicional)\n\nFormação: da 3.ª pl. do pretérito perfeito: falaram → falasse.`,
    rules: [
      'Se + imperfeito conj. → condição hipotética.',
      'Principal usa condicional ou imperfeito (coloquial).',
      'Forma-se da 3.ª pl. do pretérito perfeito.',
    ],
    examples: [
      {
        english: 'Se eu tivesse tempo, ia contigo.',
        translation: "If I had time, I'd go with you.",
        note: 'coloquial',
      },
      {
        english: 'Se ela estudasse mais, passaria.',
        translation: 'If she studied more, she would pass.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Se eu tinha dinheiro, viajava.',
        correct: 'Se eu tivesse dinheiro, viajava.',
        note: 'Condição hipotética: se + conjuntivo.',
      },
    ],
    related: ['condicional', 'condicional-composto', 'futuro-do-conjuntivo'],
  },
  {
    slug: 'futuro-do-conjuntivo',
    title: 'Futuro do conjuntivo',
    level: 'B1',
    category: 'Conjuntivo',
    summary:
      'O futuro do conjuntivo — tempo exclusivo do português, essencial em EP.',
    explanation: `Forma-se a partir da 3.ª pl. do pretérito perfeito (sem -am):\n*falaram → falar, falares, falar, falarmos, falarem*\n\nUsa-se com **quando, se, assim que, logo que, enquanto** para ações futuras hipotéticas.\n\nTempo quase exclusivo do português!`,
    rules: [
      'Da 3.ª pl. do pretérito perfeito sem -am.',
      'Com quando, se, assim que, logo que, enquanto.',
      'Ação futura hipotética ou condicionada.',
      'Essencial no EP.',
    ],
    examples: [
      {
        english: 'Quando chegares, avisa-me.',
        translation: 'When you arrive, let me know.',
      },
      {
        english: 'Se puderem, venham cedo.',
        translation: 'If you can, come early.',
      },
      {
        english: 'Assim que souber, digo-te.',
        translation: "As soon as I know, I'll tell you.",
      },
      {
        english: 'Enquanto houver esperança, continuaremos.',
        translation: "As long as there is hope, we'll continue.",
      },
    ],
    common_mistakes: [
      {
        wrong: 'Quando chegas, avisa-me.',
        correct: 'Quando chegares, avisa-me.',
        note: 'Ação futura: quando + futuro conjuntivo.',
      },
    ],
    related: [
      'presente-conjuntivo',
      'se-imperfeito-subjuntivo',
      'imperfeito-conjuntivo',
    ],
  },
  {
    slug: 'discurso-indireto-passado',
    title: 'Discurso indireto no passado',
    level: 'B1',
    category: 'Discurso indireto',
    summary: 'Relatar discurso quando o verbo introdutor está no passado.',
    explanation: `Quando o verbo introdutor está no passado, os tempos recuam:\n\n| Direto | Indireto |\n|--------|----------|\n| Presente | Imperfeito |\n| Perfeito | Mais-que-perfeito |\n| Futuro | Condicional |\n| Imperativo | Imperfeito conj. |`,
    rules: [
      'Verbo no passado → tempos recuam.',
      'Presente→imperfeito; perfeito→MQP; futuro→condicional.',
      'Imperativo→imperfeito conjuntivo.',
    ],
    examples: [
      {
        english: 'Ela disse: Estou cansada. → Ela disse que estava cansada.',
        translation: 'She said she was tired.',
      },
      {
        english:
          'Ele perguntou: Já comeste? → Ele perguntou se eu já tinha comido.',
        translation: 'He asked if I had already eaten.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Ela disse que está cansada. (com disse)',
        correct: 'Ela disse que estava cansada.',
        note: 'Disse está no passado → tempo recua.',
      },
    ],
    related: ['discurso-indireto', 'mudancas-temporais', 'discurso-reportado'],
  },
  {
    slug: 'conectores-argumentativos',
    title: 'Conectores argumentativos',
    level: 'B1',
    category: 'Oracoes',
    summary:
      'Conectores para estruturar argumentos: causa, consequência, oposição, concessão.',
    explanation: `**Causa:** porque, visto que, já que. **Consequência:** por isso, portanto, assim. **Oposição:** mas, porém, contudo. **Concessão:** embora, mesmo que, ainda que. **Adição:** além disso, também, não só... como também.`,
    rules: [
      'Porque/visto que/já que → causa.',
      'Por isso/portanto → consequência.',
      'Mas/porém/contudo → oposição.',
      'Embora/ainda que → concessão (+ conjuntivo).',
    ],
    examples: [
      {
        english: 'Fiquei em casa porque estava a chover.',
        translation: 'I stayed home because it was raining.',
        note: 'causa',
      },
      {
        english: 'Estava a chover, por isso fiquei em casa.',
        translation: 'It was raining, so I stayed home.',
        note: 'consequência',
      },
      {
        english: 'Embora estivesse a chover, fui passear.',
        translation: 'Although it was raining, I went for a walk.',
        note: 'concessão + conjuntivo',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Embora está a chover, vou sair.',
        correct: 'Embora esteja a chover, vou sair.',
        note: 'Embora exige conjuntivo.',
      },
    ],
    related: ['conectores-narrativos', 'conectores-avancados'],
  },
  {
    slug: 'por-para',
    title: 'Por e para: usos e diferenças',
    level: 'B1',
    category: 'Preposicoes',
    summary:
      'Distinção entre as preposições por e para conforme expressem causa, finalidade, destinatário, meio, direção e outros contextos.',
    structure:
      'POR: causa/motivo · meio · duração · troca · agente da passiva · opinião\nPARA: finalidade · destinatário · direção · prazo · opinião · comparação',
    explanation:
      '**Por** e **para** são duas preposições que causam confusão porque em muitas línguas traduzem-se por uma só palavra.\n\n### Usos principais de POR\n\n- **Causa ou motivo:** *Cheguei tarde por causa do trânsito.*\n- **Meio:** *Falo contigo por telefone.*\n- **Duração:** *Estudei por três horas.*\n- **Troca ou preço:** *Comprei o livro por dez euros.*\n- **Agente da passiva:** *Os Lusíadas foi escrito por Camões.*\n- **Frequência:** *Vou ao ginásio duas vezes por semana.*\n- **Substituição:** *Veio o meu irmão por mim.*\n\n### Usos principais de PARA\n\n- **Finalidade:** *Estudo para aprender.*\n- **Destinatário:** *O presente é para ti.*\n- **Direção:** *Parto para Lisboa amanhã.*\n- **Prazo:** *Preciso disto para segunda-feira.*\n- **Opinião:** *Para mim, é a melhor opção.*\n- **Comparação:** *Para principiante, fala muito bem.*\n\n### Expressões fixas com POR\n\n- *por isso* (therefore), *por favor* (please), *por acaso* (by chance), *por enquanto* (for now), *por exemplo* (for example)\n\n### Expressões fixas com PARA\n\n- *para já* (for now), *para sempre* (forever), *para além de* (beyond)',
    rules: [
      '"Por" exprime a causa ou motivo de uma ação.',
      '"Para" exprime a finalidade ou o propósito.',
      '"Por" indica o meio ou canal: por correio, por telefone.',
      '"Para" indica o destinatário: para ti, para o João.',
      'Na voz passiva, o agente é introduzido por "por".',
    ],
    examples: [
      {
        english: 'Estudo português para viajar por Portugal.',
        translation: 'I study Portuguese (in order) to travel around Portugal.',
        note: 'para = finalidade; por = lugar aproximado',
      },
      {
        english: 'Obrigado por tudo. O presente é para ti.',
        translation: 'Thanks for everything. The gift is for you.',
        note: 'por = causa do agradecimento; para = destinatário',
      },
      {
        english: 'Passei por tua casa mas não estavas.',
        translation: "I passed by your house but you weren't there.",
        note: 'lugar',
      },
      {
        english: 'Este relatório é para sexta-feira.',
        translation: 'This report is for Friday.',
        note: 'prazo',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Obrigado para a ajuda.',
        correct: 'Obrigado pela ajuda.',
        note: 'Com "obrigado" usa-se "por".',
      },
      {
        wrong: 'Estudo por ser médico.',
        correct: 'Estudo para ser médico.',
        note: '"Para" + infinitivo indica o propósito.',
      },
      {
        wrong: 'A ponte foi construída para os romanos.',
        correct: 'A ponte foi construída pelos romanos.',
        note: 'O agente da passiva introduz-se com "por".',
      },
    ],
    related: ['preposicoes-lugar', 'voz-passiva', 'conectores-argumentativos'],
  },
  {
    slug: 'imperfeito-conjuntivo',
    title: 'Imperfeito do conjuntivo',
    level: 'B2',
    category: 'Conjuntivo',
    summary: 'Formação e uso do imperfeito do conjuntivo.',
    explanation: `Da 3a pl. do pretérito perfeito: falaram -> falasse, falasses... Usos: condicoes hipoteticas, desejos, apos embora/como se.`,
    rules: ['Da 3a pl. do pret. perfeito.', 'Com se, embora, como se.'],
    examples: [
      {
        english: 'Se eu tivesse mais tempo, viajava mais.',
        translation: 'If I had more time, I would travel more.',
      },
      {
        english: 'Embora chovesse, fomos a praia.',
        translation: 'Although it was raining, we went to the beach.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Se eu tinha tempo, ia.',
        correct: 'Se eu tivesse tempo, ia.',
        note: 'Condicao hipotetica: imperfeito conjuntivo.',
      },
    ],
    related: [
      'presente-conjuntivo',
      'se-imperfeito-subjuntivo',
      'mais-que-perfeito-conjuntivo',
    ],
  },
  {
    slug: 'mais-que-perfeito-conjuntivo',
    title: 'Mais-que-perfeito do conjuntivo',
    level: 'B2',
    category: 'Conjuntivo',
    summary: 'Expressar condicoes passadas nao realizadas.',
    explanation: `Forma composta: tivesse + participio passado. Se tivesse estudado, teria passado.`,
    rules: [
      'Forma composta: tivesse + participio.',
      'Condicao NAO realizada no passado.',
    ],
    examples: [
      {
        english: 'Se tivesse estudado, teria passado.',
        translation: 'If I had studied, I would have passed.',
      },
      {
        english: 'Se ela tivesse vindo, teria sido melhor.',
        translation: 'If she had come, it would have been better.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Se eu tinha estudado, passava.',
        correct: 'Se eu tivesse estudado, passava.',
        note: 'Condicao passada: tivesse + participio.',
      },
    ],
    related: ['imperfeito-conjuntivo', 'condicional-composto'],
  },
  {
    slug: 'concordancia-temporal',
    title: 'Concordancia temporal',
    level: 'B2',
    category: 'Tempos verbais',
    summary: 'Regras de correspondencia entre tempos verbais.',
    explanation: `Presente/futuro -> presente conjuntivo. Preterito/condicional -> imperfeito conjuntivo.`,
    rules: [
      'Presente/futuro -> presente conj.',
      'Preterito/condicional -> imperfeito conj.',
    ],
    examples: [
      {
        english: 'Queria que viesses.',
        translation: 'I wanted you to come.',
        note: 'preterito -> imperfeito conj.',
      },
      {
        english: 'Espero que chegues.',
        translation: 'I hope you arrive.',
        note: 'presente -> presente conj.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Queria que venhas.',
        correct: 'Queria que viesses.',
        note: 'Preterito -> imperfeito conjuntivo.',
      },
    ],
    related: [
      'presente-conjuntivo',
      'imperfeito-conjuntivo',
      'futuro-do-conjuntivo',
    ],
  },
  {
    slug: 'perifrases-aspetuais',
    title: 'Perifrases aspetuais',
    level: 'B2',
    category: 'Verbos',
    summary: 'Construcoes verbais que expressam aspetos da acao.',
    explanation: `Comecar a + inf., estar a + inf., continuar a + inf., acabar de + inf., voltar a + inf.`,
    rules: [
      'Comecar a = inicio.',
      'Estar a = curso (EP).',
      'Acabar de = recem-concluida.',
      'Voltar a = repeticao.',
    ],
    examples: [
      {
        english: 'Comecei a aprender portugues ha um ano.',
        translation: 'I started learning Portuguese a year ago.',
      },
      {
        english: 'Acabei de comer.',
        translation: 'I have just finished eating.',
      },
    ],
    common_mistakes: [],
    related: ['estar-a-infinitivo', 'andar-a-estar-a', 'costumava'],
  },
  {
    slug: 'perifrases-modais',
    title: 'Perifrases modais',
    level: 'B2',
    category: 'Verbos',
    summary: 'Construcoes verbais para obrigacao, possibilidade e intencao.',
    explanation: `Ter de/que + inf. (obrigacao), precisar de + inf. (necessidade), poder + inf. (possibilidade), haver de + inf. (determinacao, tipico EP).`,
    rules: [
      'Ter de/que = obrigacao.',
      'Precisar de = necessidade.',
      'Haver de = determinacao (EP).',
    ],
    examples: [
      {
        english: 'Tenho de terminar este relatorio.',
        translation: 'I have to finish this report.',
      },
      {
        english: 'Hei de visitar os Acores um dia!',
        translation: 'I will visit the Azores one day!',
        note: 'determinacao EP',
      },
    ],
    common_mistakes: [],
    related: ['perifrases-aspetuais', 'querer-poder', 'andar-a-estar-a'],
  },
  {
    slug: 'andar-a-estar-a',
    title: 'Andar a vs estar a',
    level: 'B2',
    category: 'Verbos',
    summary: 'Diferenca entre andar a + infinitivo e estar a + infinitivo.',
    explanation: `Estar a = agora. Andar a = repetido/persistente ao longo do tempo.`,
    rules: ['Estar a = agora.', 'Andar a = repetido/persistente.'],
    examples: [
      {
        english: 'Estou a ler um livro.',
        translation: 'I am reading a book.',
        note: 'agora',
      },
      {
        english: 'Ando a ler um livro.',
        translation: 'I have been reading a book.',
        note: 'dias',
      },
      {
        english: 'Ela anda a trabalhar demais.',
        translation: 'She has been working too much.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Ando a comer agora.',
        correct: 'Estou a comer agora.',
        note: 'Acao no momento: estar a.',
      },
    ],
    related: ['estar-a-infinitivo', 'perifrases-aspetuais'],
  },
  {
    slug: 'infinitivo-pessoal',
    title: 'Infinitivo pessoal',
    level: 'B2',
    category: 'Verbos',
    summary: 'O infinitivo pessoal.',
    explanation: `Infinitivo conjugado: falar, falares, falar, falarmos, falarem. Sujeito diferente.`,
    rules: [
      'Infinitivo com terminacoes.',
      'Sujeito diferente da oracao principal.',
    ],
    examples: [
      {
        english: 'E importante estudares mais.',
        translation: 'It is important for you to study more.',
      },
      {
        english: 'Para chegarmos a tempo, temos de sair.',
        translation: 'In order for us to arrive on time.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'E importante tu estudar.',
        correct: 'E importante tu estudares.',
        note: 'Sujeito diferente -> infinitivo pessoal.',
      },
    ],
    related: ['presente-conjuntivo', 'colocacao-pronominal'],
  },
  {
    slug: 'conectores-avancados',
    title: 'Conectores avancados',
    level: 'B2',
    category: 'Oracoes',
    summary: 'Conectores sofisticados para argumentacao.',
    explanation: `Desde que/a menos que/caso + conj. Para que/a fim de que + conj. Ainda que/mesmo que + conj.`,
    rules: [
      'Desde que, a menos que + conj.',
      'Para que, a fim de que + conj.',
      'Ainda que, mesmo que + conj.',
    ],
    examples: [
      {
        english: 'Vou a festa desde que tu tambem vas.',
        translation: 'I will go as long as you go.',
      },
      {
        english: 'Sairei mais cedo, a menos que haja reuniao.',
        translation: 'I will leave earlier, unless there is a meeting.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Desde que tu tambem vais.',
        correct: 'Desde que tu tambem vas.',
        note: 'Desde que condicional + conjuntivo.',
      },
    ],
    related: ['conectores-argumentativos', 'coesao-textual'],
  },
  {
    slug: 'coesao-textual',
    title: 'Coesao textual',
    level: 'B2',
    category: 'Avancado',
    summary: 'Mecanismos para textos coesos.',
    explanation: `Referencia, substituicao, elipse, conjuncao, coesao lexical.`,
    rules: ['Pronomes, sinonimos, conectores.', 'Elipse quando possivel.'],
    examples: [
      {
        english: 'O Joao comprou um carro. Ele esta contente com o veiculo.',
        translation: 'Joao bought a car. He is happy with the vehicle.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'O Joao comprou um carro. O Joao esta contente.',
        correct: 'O Joao comprou um carro. Ele esta contente.',
        note: 'Evitar repeticao excessiva.',
      },
    ],
    related: ['conectores-avancados', 'conectores-argumentativos'],
  },
  {
    slug: 'registo-formal',
    title: 'Registo formal',
    level: 'B2',
    category: 'Avancado',
    summary: 'Caracteristicas do registo formal em EP.',
    explanation: `Vocabulario cuidado, passiva, mesoclise, condicional de cortesia, tratamento o senhor/a senhora.`,
    rules: [
      'Vocabulario cuidado.',
      'Passiva, mesoclise.',
      'Tratamento formal.',
    ],
    examples: [
      {
        english: 'Poder-me-ia informar sobre o horario?',
        translation: 'Could you inform me about the schedule?',
        note: 'cortesia + mesoclise',
      },
      {
        english: 'O senhor deseja mais alguma coisa?',
        translation: 'Would you like anything else, sir?',
      },
    ],
    common_mistakes: [],
    related: [
      'expressoes-idiomaticas',
      'expressoes-coloquiais',
      'linguagem-jornalistica',
    ],
  },
  {
    slug: 'expressoes-idiomaticas',
    title: 'Expressoes idiomaticas',
    level: 'B2',
    category: 'Avancado',
    summary: 'Expressoes idiomaticas portuguesas.',
    explanation: `Andar com a pulga atras da orelha, dar o braco a torcer, estar com os azeites, custar os olhos da cara.`,
    rules: ['Expressoes fixas.', 'Sentido literal diferente do figurado.'],
    examples: [
      {
        english: 'Ando com a pulga atras da orelha.',
        translation: 'I have been suspicious.',
      },
      {
        english: 'Ela esta com os azeites hoje.',
        translation: 'She is in a bad mood today.',
      },
    ],
    common_mistakes: [],
    related: ['expressoes-coloquiais', 'proverbios', 'registo-formal'],
  },
  {
    slug: 'expressoes-coloquiais',
    title: 'Expressoes coloquiais',
    level: 'B2',
    category: 'Avancado',
    summary: 'Linguagem coloquial e giria do portugues europeu.',
    explanation: `Bue/altamente/fixe, ta-se bem, bora, ya, pa, giro/gira, desenrascar.`,
    rules: ['Coloquialismos informais.', 'Variacao regional.'],
    examples: [
      { english: 'Que filme tao fixe!', translation: 'What a cool movie!' },
      {
        english: 'Bora tomar um cafe?',
        translation: 'Let us go grab a coffee?',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Que filme fixe! (registo formal)',
        correct: 'Que filme interessante!',
        note: 'Evitar fixe em registo formal.',
      },
    ],
    related: ['expressoes-idiomaticas', 'proverbios', 'registo-formal'],
  },
  {
    slug: 'proverbios',
    title: 'Proverbios portugueses',
    level: 'B2',
    category: 'Avancado',
    summary: 'Proverbios tradicionais portugueses.',
    explanation: `Agua mole em pedra dura..., Quem ve caras nao ve coracoes, Mais vale um passaro na mao..., Depois da tempestade vem a bonanca.`,
    rules: ['Proverbios fixos.', 'Sabedoria popular.'],
    examples: [
      {
        english: 'Agua mole em pedra dura, tanto bate ate que fura.',
        translation: 'Constant dripping wears away the stone.',
      },
      {
        english: 'Mais vale um passaro na mao do que dois a voar.',
        translation: 'A bird in the hand is worth two in the bush.',
      },
    ],
    common_mistakes: [],
    related: ['expressoes-idiomaticas', 'expressoes-coloquiais'],
  },
  {
    slug: 'estrutura-argumentativa',
    title: 'Estrutura argumentativa',
    level: 'B2',
    category: 'Avancado',
    summary: 'Construir textos argumentativos.',
    explanation: `Introducao (tese), desenvolvimento (argumentos), conclusao (retoma).`,
    rules: [
      'Introducao, desenvolvimento, conclusao.',
      'Conectores especificos.',
    ],
    examples: [
      {
        english: 'Em primeiro lugar, a educacao e fundamental.',
        translation: 'Firstly, education is fundamental.',
      },
      {
        english: 'Concluindo, os beneficios superam os riscos.',
        translation: 'In conclusion, the benefits outweigh the risks.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Eu acho que... (texto formal)',
        correct: 'Considera-se que...',
        note: 'Evitar 1a pessoa em textos argumentativos.',
      },
    ],
    related: [
      'contra-argumentacao',
      'conectores-argumentativos',
      'coesao-textual',
    ],
  },
  {
    slug: 'contra-argumentacao',
    title: 'Contra-Argumentacao',
    level: 'B2',
    category: 'Avancado',
    summary: 'Tecnicas para refutar argumentos.',
    explanation: `Concessao + refutacao, questionamento, evidencia contraria.`,
    rules: ['Concessao + refutacao.', 'Questionamento.', 'Evidencia.'],
    examples: [
      {
        english:
          'Embora alguns defendam o contrario, os estudos mostram que...',
        translation: 'Although some argue the opposite, studies show that...',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Isso e mentira. (agressivo)',
        correct: 'Essa perspetiva parece ignorar alguns factos.',
        note: 'Contra-argumentacao respeitosa.',
      },
    ],
    related: [
      'estrutura-argumentativa',
      'matizadores',
      'conectores-argumentativos',
    ],
  },
  {
    slug: 'matizadores',
    title: 'Matizadores',
    level: 'B2',
    category: 'Avancado',
    summary: 'Palavras que suavizam ou relativizam afirmacoes.',
    explanation: `Provavelmente, talvez, de certa forma, ate certo ponto, um pouco, apenas.`,
    rules: ['Suavizar afirmacoes.', 'Evitar categoricas.'],
    examples: [
      {
        english: 'Provavelmente, esta e a melhor abordagem.',
        translation: 'This is probably the best approach.',
      },
      {
        english: 'De certa forma, concordo.',
        translation: 'In a way, I agree.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Possivelmente talvez seja melhor.',
        correct: 'Provavelmente e melhor.',
        note: 'Evitar acumular matizadores.',
      },
    ],
    related: ['estrutura-argumentativa', 'contra-argumentacao'],
  },
  {
    slug: 'tempos-narrativos',
    title: 'Tempos narrativos',
    level: 'B2',
    category: 'Tempos verbais',
    summary: 'Articulacao dos tempos verbais na narrativa.',
    explanation: `Imperfeito (cenario), perfeito (acao principal), mais-que-perfeito (flashback).`,
    rules: ['Imperfeito = cenario.', 'Perfeito = acao.', 'MQP = flashback.'],
    examples: [
      {
        english: 'Era uma noite de tempestade. De repente, a porta abriu-se.',
        translation: 'It was a stormy night. Suddenly, the door opened.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'De repente, estava a chover.',
        correct: 'De repente, comecou a chover.',
        note: 'De repente pede acao pontual (perfeito).',
      },
    ],
    related: [
      'preterito-imperfeito',
      'perfeito-vs-imperfeito',
      'descricao-literaria',
    ],
  },
  {
    slug: 'descricao-literaria',
    title: 'Descricao literaria',
    level: 'B2',
    category: 'Avancado',
    summary: 'Recursos para descricoes vividas.',
    explanation: `Adjetivacao rica, sensacoes, metaforas, personificacao, imperfeito descritivo.`,
    rules: [
      'Adjetivos sensoriais.',
      'Imperfeito descritivo.',
      'Metaforas, personificacao.',
    ],
    examples: [
      {
        english:
          'O sol punha-se no horizonte, tingindo o ceu de tons alaranjados.',
        translation: 'The sun was setting, dyeing the sky orange.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'A casa era bonita. (pobre)',
        correct: 'A casa exibia uma beleza melancolica.',
        note: 'Vocabulario rico.',
      },
    ],
    related: [
      'tempos-narrativos',
      'recursos-estilisticos',
      'figuras-literarias',
    ],
  },
  {
    slug: 'preterito-mais-que-perfeito',
    title: 'Preterito mais-que-perfeito composto',
    level: 'B2',
    category: 'Tempos verbais',
    summary: 'Revisao do MQP composto.',
    explanation: `Ter (imperfeito) + participio. Muito mais comum que a forma simples.`,
    rules: [
      'Ter (imperfeito) + participio.',
      'Mais comum que a forma simples.',
    ],
    examples: [
      {
        english: 'Quando cheguei, ela ja tinha saido.',
        translation: 'When I arrived, she had already left.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Quando cheguei, ela ja tinha saiu.',
        correct: 'Quando cheguei, ela ja tinha saido.',
        note: 'Ter + participio (saido).',
      },
    ],
    related: [
      'mais-que-perfeito',
      'preterito-imperfeito',
      'discurso-indireto-passado',
    ],
  },
  {
    slug: 'linguagem-jornalistica',
    title: 'Linguagem jornalistica',
    level: 'B2',
    category: 'Avancado',
    summary: 'Caracteristicas da linguagem jornalistica em EP.',
    explanation: `Titulo conciso, lead 5W, objetividade (3a pessoa), passiva, nominalizacoes, presente historico.`,
    rules: [
      'Titulo conciso.',
      'Lead 5W.',
      '3a pessoa, passiva.',
      'Presente historico.',
    ],
    examples: [
      {
        english: 'O Governo anunciou ontem um novo pacote de medidas.',
        translation:
          'The Government announced a new measures package yesterday.',
        note: 'lead',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Eu entrevistei o presidente.',
        correct: 'O presidente afirmou que...',
        note: 'Jornalismo evita 1a pessoa.',
      },
    ],
    related: ['titulos', 'discurso-reportado', 'registo-formal'],
  },
  {
    slug: 'titulos',
    title: 'Titulos jornalisticos',
    level: 'B2',
    category: 'Avancado',
    summary: 'Estrutura e estilo dos titulos na imprensa portuguesa.',
    explanation: `Concisao, omissao de artigos, presente historico, virgula em vez de conjuncao.`,
    rules: ['Omitir artigos.', 'Presente historico.', 'Virgula = e/mas.'],
    examples: [
      {
        english: 'Incendio devasta milhares de hectares no Algarve.',
        translation: 'Fire devastates thousands of hectares in the Algarve.',
      },
      {
        english: 'Benfica vence, Porto empata.',
        translation: 'Benfica wins, Porto draws.',
      },
    ],
    common_mistakes: [],
    related: ['linguagem-jornalistica', 'discurso-reportado'],
  },
  {
    slug: 'discurso-reportado',
    title: 'Discurso reportado',
    level: 'B2',
    category: 'Discurso indireto',
    summary: 'Tecnicas avancadas de citacao e reportagem.',
    explanation: `Citacao direta, indireta, mista. Verbos introdutores variados: afirmar, salientar, admitir, garantir, anunciar.`,
    rules: ['Variar verbos introdutores.', 'Direta, indireta, mista.'],
    examples: [
      {
        english: 'O ministro salientou que os resultados sao animadores.',
        translation: 'The minister stressed that the results are encouraging.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Ele disse que estou cansado.',
        correct: 'Ele disse que estava cansado.',
        note: 'Citacao indireta adapta tempos.',
      },
    ],
    related: [
      'discurso-indireto',
      'discurso-indireto-passado',
      'linguagem-jornalistica',
    ],
  },
  {
    slug: 'subjuntivo-concessivo',
    title: 'Conjuntivo em oracoes concessivas',
    level: 'C1',
    category: 'Conjuntivo',
    summary: 'Uso avancado do conjuntivo em oracoes concessivas.',
    explanation: `Por mais que, por muito que, ainda que, mesmo que, nem que + conjuntivo.`,
    rules: [
      'Por mais/muito que + conjuntivo.',
      'Ainda que/mesmo que + conjuntivo.',
    ],
    examples: [
      {
        english: 'Por mais que tentes, nem sempre vais conseguir.',
        translation: 'No matter how hard you try, you will not always succeed.',
      },
      {
        english: 'Mesmo que me pagassem, nao faria esse trabalho.',
        translation: 'Even if they paid me, I would not do that job.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Por mais que tentas.',
        correct: 'Por mais que tentes.',
        note: 'Por mais que exige conjuntivo.',
      },
    ],
    related: [
      'conectores-avancados',
      'imperfeito-conjuntivo',
      'contra-argumentacao',
    ],
  },
  {
    slug: 'subjuntivo-final',
    title: 'Conjuntivo em oracoes finais',
    level: 'C1',
    category: 'Conjuntivo',
    summary: 'Conjuntivo apos conectores finais.',
    explanation: `Para que/a fim de que/de modo a que + conjuntivo (sujeito diferente). Mesmo sujeito: para + infinitivo.`,
    rules: [
      'Para que + conj. (sujeito diferente).',
      'Mesmo sujeito: para + inf.',
    ],
    examples: [
      {
        english: 'Enviei o email para que todos fiquem informados.',
        translation: 'I sent the email so that everyone is informed.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Estudo para que eu passe.',
        correct: 'Estudo para passar.',
        note: 'Mesmo sujeito: para + inf.',
      },
    ],
    related: [
      'presente-conjuntivo',
      'conectores-avancados',
      'infinitivo-pessoal',
    ],
  },
  {
    slug: 'subjuntivo-relativo',
    title: 'Conjuntivo em oracoes relativas',
    level: 'C1',
    category: 'Conjuntivo',
    summary: 'Conjuntivo com antecedente indeterminado.',
    explanation: `Conjuntivo para antecedente desconhecido. Indicativo para especifico. Ha quem / Nao ha quem + conjuntivo.`,
    rules: ['Conjuntivo: hipotetico.', 'Indicativo: especifico.'],
    examples: [
      {
        english: 'Procuro alguem que fale chines.',
        translation: 'I am looking for someone who speaks Chinese.',
        note: 'indeterminado',
      },
      {
        english: 'Conheco alguem que fala chines.',
        translation: 'I know someone who speaks Chinese.',
        note: 'especifico',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Procuro alguem que fala chines.',
        correct: 'Procuro alguem que fale chines.',
        note: 'Indeterminado -> conjuntivo.',
      },
    ],
    related: ['presente-conjuntivo', 'que-relativo'],
  },
  {
    slug: 'passiva-reflexa',
    title: 'Voz passiva reflexa',
    level: 'C1',
    category: 'Voz passiva',
    summary: 'Usos avancados da voz passiva com o pronome se.',
    explanation: `Aprecia-se, comenta-se, realizar-se-a (mesoclise), observa-se. Uso academico e jornalistico.`,
    rules: [
      'Aprecia-se/comenta-se = passiva reflexa.',
      'Realizar-se-a = sera realizado.',
    ],
    examples: [
      {
        english: 'Comenta-se que o acordo sera assinado amanha.',
        translation: 'It is said that the agreement will be signed tomorrow.',
      },
      {
        english: 'Observa-se uma melhoria significativa.',
        translation: 'A significant improvement is observed.',
      },
    ],
    common_mistakes: [],
    related: ['voz-passiva', 'se-impessoal', 'se-passivo'],
  },
  {
    slug: 'nominalizacao',
    title: 'Nominalizacao',
    level: 'C1',
    category: 'Avancado',
    summary: 'Transformar verbos e adjetivos em substantivos.',
    explanation: `Implementar -> implementacao. Melhorar -> melhoria. Construir -> construcao. Evitar cadeias.`,
    rules: ['Verbo -> substantivo.', 'Evitar cadeias de nominalizacoes.'],
    examples: [
      {
        english: 'A implementacao do programa foi bem-sucedida.',
        translation: 'The implementation of the program was successful.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'A realizacao da implementacao da verificacao.',
        correct: 'A verificacao dos dados.',
        note: 'Evitar cadeias.',
      },
    ],
    related: ['impessoalidade', 'registo-formal', 'coesao-textual'],
  },
  {
    slug: 'impessoalidade',
    title: 'Impessoalidade',
    level: 'C1',
    category: 'Avancado',
    summary: 'Tecnicas de impessoalidade no discurso formal.',
    explanation: `Voz passiva, se impessoal, nominalizacao, expressoes impessoais (Convem salientar que...).`,
    rules: [
      'Voz passiva, se impessoal.',
      'Nominalizacoes.',
      'Convem/importa + infinitivo.',
    ],
    examples: [
      {
        english: 'Foi observado um aumento significativo.',
        translation: 'A significant increase was observed.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Eu observei um aumento. (academico)',
        correct: 'Foi observado um aumento.',
        note: 'Evitar 1a pessoa.',
      },
    ],
    related: ['nominalizacao', 'voz-passiva', 'registo-formal'],
  },
  {
    slug: 'campos-semanticos',
    title: 'Campos semanticos',
    level: 'C1',
    category: 'Avancado',
    summary: 'Agrupamentos lexicais por dominios.',
    explanation: `Exemplo: justica -> tribunal, juiz, advogado, reu, sentenca, julgar, condenar, absolver.`,
    rules: ['Agrupar vocabulario por areas.'],
    examples: [
      {
        english: 'O juiz condenou o reu com base nas provas. (campo: justica)',
        translation: 'The judge sentenced the defendant based on the evidence.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Usar lexico de campo errado.',
        correct: 'Verificar o campo semantico adequado.',
        note: '',
      },
    ],
    related: ['derivacao', 'precisao-lexica'],
  },
  {
    slug: 'derivacao',
    title: 'Derivacao',
    level: 'C1',
    category: 'Avancado',
    summary: 'Mecanismos de formacao de palavras.',
    explanation: `Prefixos: re-, in-/im-, des-. Sufixos: -cao, -mento, -dade, -vel, -izar.`,
    rules: ['Prefixos e sufixos formam palavras.'],
    examples: [
      {
        english: 'feliz -> infeliz -> felicidade',
        translation: 'happy -> unhappy -> happiness',
      },
      {
        english: 'construir -> construcao -> reconstrutivo',
        translation: 'to build -> construction -> reconstructive',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Infelicidade: verificar se e atestada.',
        correct: 'Infelicidade: ver em dicionario.',
        note: 'Nem todas as derivacoes sao validas.',
      },
    ],
    related: ['campos-semanticos', 'precisao-lexica'],
  },
  {
    slug: 'precisao-lexica',
    title: 'Precisao lexica',
    level: 'C1',
    category: 'Avancado',
    summary: 'Escolher a palavra exata.',
    explanation: `Dizer vs falar, Ver vs olhar, Ouvir vs escutar, Saber vs conhecer.`,
    rules: [
      'Dizer (informacao) vs falar (comunicacao).',
      'Saber (facto) vs conhecer (familiaridade).',
    ],
    examples: [
      {
        english: 'Sei a resposta. / Conheco bem essa pessoa.',
        translation: 'I know the answer. / I know that person well.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Conheco a resposta.',
        correct: 'Sei a resposta.',
        note: 'Conhecer = familiaridade.',
      },
    ],
    related: ['derivacao', 'campos-semanticos', 'falsos-amigos'],
  },
  {
    slug: 'ironia',
    title: 'Ironia',
    level: 'C1',
    category: 'Avancado',
    summary: 'A ironia como recurso retorico.',
    explanation: `Dizer o contrario do que se pensa. Traco cultural portugues.`,
    rules: ['Ironia = dizer o contrario.', 'Traco cultural portugues.'],
    examples: [
      {
        english: 'Pois sim, acredito muito nisso.',
        translation: 'Yeah, right, I totally believe that.',
        note: 'ironico',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Interpretar ironia literalmente.',
        correct: 'Prestar atencao a entoacao e contexto.',
        note: '',
      },
    ],
    related: ['humor-portugues', 'duplo-sentido', 'recursos-retoricos'],
  },
  {
    slug: 'humor-portugues',
    title: 'Humor a portuguesa',
    level: 'C1',
    category: 'Avancado',
    summary: 'Caracteristicas do humor portugues.',
    explanation: `Autoironia, sarcasmo afavel, resignacao comica, understatement, desenrascanco.`,
    rules: ['Autoironia, sarcasmo.', 'Resignacao comica.', 'Desenrascanco.'],
    examples: [
      {
        english: 'Como estas? -- Vai-se andando.',
        translation: 'How are you? -- Getting by.',
      },
      {
        english: 'Isto so acontece em Portugal.',
        translation: 'This only happens in Portugal.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Confundir sarcasmo portugues com grosseria.',
        correct: 'O sarcasmo portugues e frequentemente afavel.',
        note: '',
      },
    ],
    related: ['ironia', 'duplo-sentido', 'expressoes-idiomaticas'],
  },
  {
    slug: 'duplo-sentido',
    title: 'Duplo sentido',
    level: 'C1',
    category: 'Avancado',
    summary: 'Jogos de palavras e ambiguidade.',
    explanation: `Ambiguidade lexical e sintatica. Usado em humor, publicidade e literatura.`,
    rules: ['Ambiguidade lexical e sintatica.'],
    examples: [
      {
        english: 'Ele e um genio. (pode ser ironico)',
        translation: 'He is a genius.',
        note: 'duplo sentido',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Duplo sentido nao intencional em textos formais.',
        correct: 'Rever para evitar ambiguidades.',
        note: '',
      },
    ],
    related: ['ironia', 'humor-portugues', 'recursos-retoricos'],
  },
  {
    slug: 'recursos-retoricos',
    title: 'Recursos retoricos',
    level: 'C1',
    category: 'Avancado',
    summary: 'Catalogo de figuras de retorica.',
    explanation: `Pergunta retorica, anafora, gradacao, paradoxo, antitese.`,
    rules: ['Pergunta retorica, anafora.', 'Paradoxo, antitese.'],
    examples: [
      {
        english: 'Quem nunca errou? (pergunta retorica)',
        translation: 'Who has never made a mistake?',
      },
      {
        english: 'O silencio ensurdecedor da noite. (paradoxo)',
        translation: 'The deafening silence of the night.',
      },
    ],
    common_mistakes: [
      { wrong: 'Uso excessivo.', correct: 'Dosear as figuras.', note: '' },
    ],
    related: ['persuasao', 'figuras-literarias'],
  },
  {
    slug: 'persuasao',
    title: 'Persuasao',
    level: 'C1',
    category: 'Avancado',
    summary: 'Tecnicas de persuasao no discurso.',
    explanation: `Ethos (credibilidade), Pathos (emocao), Logos (logica). Adaptar ao publico.`,
    rules: ['Ethos, Pathos, Logos.'],
    examples: [
      {
        english:
          'Enquanto profissional com 20 anos de experiencia, recomendo... (ethos)',
        translation:
          'As a professional with 20 years of experience, I recommend...',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Apelos emocionais sem fundamentacao.',
        correct: 'Combinar pathos com logos.',
        note: '',
      },
    ],
    related: ['recursos-retoricos', 'estrutura-argumentativa'],
  },
  {
    slug: 'figuras-literarias',
    title: 'Figuras literarias',
    level: 'C1',
    category: 'Avancado',
    summary: 'Metafora, metonimia, sine doque e outras figuras.',
    explanation: `Metafora, comparacao, metonimia, sine doque, personificacao, hiperbole.`,
    rules: ['Metafora, metonimia.', 'Personificacao, hiperbole.'],
    examples: [
      {
        english: 'O tempo e dinheiro. (metafora)',
        translation: 'Time is money.',
      },
      {
        english: 'Portugal venceu o jogo. (metonimia)',
        translation: 'Portugal won the match.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Confundir metafora com comparacao.',
        correct: 'Metafora = identificacao. Comparacao = como.',
        note: '',
      },
    ],
    related: ['descricao-literaria', 'recursos-retoricos', 'estilo-literario'],
  },
  {
    slug: 'portugues-brasileiro',
    title: 'Portugues brasileiro vs europeu',
    level: 'C1',
    category: 'Avancado',
    summary: 'Principais diferencas entre PB e PE.',
    explanation: `PB: gerundio, proclise. PE: a + infinitivo, enclise. Lexico diferente.`,
    rules: ['PB: gerundio. PE: a + inf.', 'PB: proclise. PE: enclise.'],
    examples: [
      {
        english: 'PE: pequeno-almoco. / PB: cafe da manha.',
        translation: 'PE vs PB: breakfast',
      },
      {
        english: 'PE: Da-me um cafe. / PB: Me da um cafe.',
        translation: 'PE vs PB: give me a coffee',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Misturar PE e PB.',
        correct: 'Escolher uma variante e ser consistente.',
        note: '',
      },
    ],
    related: ['portugues-europeu', 'diferencas-regionais'],
  },
  {
    slug: 'portugues-europeu',
    title: 'Particularidades do portugues europeu',
    level: 'C1',
    category: 'Avancado',
    summary: 'Caracteristicas distintivas do PE.',
    explanation: `Estar a + inf., enclise/mesoclise, artigo + possessivo, artigo + nome proprio, tu + 2a pessoa, infinitivo pessoal.`,
    rules: [
      'Estar a + inf.',
      'Enclise e mesoclise.',
      'Artigo + possessivo + nome proprio.',
    ],
    examples: [
      {
        english: 'O Pedro esta a estudar para o exame.',
        translation: 'Pedro is studying for the exam.',
      },
      {
        english: 'Dar-te-ei o livro amanha.',
        translation: 'I will give you the book tomorrow.',
        note: 'mesoclise',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Me apetece sair.',
        correct: 'Apetece-me sair.',
        note: 'EP nao comeca frase com pronome atono.',
      },
    ],
    related: [
      'portugues-brasileiro',
      'diferencas-regionais',
      'estar-a-infinitivo',
    ],
  },
  {
    slug: 'diferencas-regionais',
    title: 'Diferencas regionais em portugal',
    level: 'C1',
    category: 'Avancado',
    summary: 'Variacao dialetal dentro de Portugal.',
    explanation: `Norte: vos residual, fino, cimbalino. Sul: gerundio. Ilhas: lexico proprio. Padrao: Coimbra-Lisboa.`,
    rules: [
      'Norte: lexico proprio.',
      'Sul: gerundio.',
      'Padrao: Coimbra-Lisboa.',
    ],
    examples: [
      {
        english: 'Quereis um fino? (Porto)',
        translation: 'Do you want a draft beer?',
        note: 'norte',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Assumir que todo o pais fala igual.',
        correct: 'Respeitar a variacao regional.',
        note: '',
      },
    ],
    related: ['portugues-europeu', 'portugues-brasileiro'],
  },
  {
    slug: 'sintese-textual',
    title: 'Sintese textual',
    level: 'C1',
    category: 'Avancado',
    summary: 'Tecnicas para resumir textos.',
    explanation: `Identificar ideia principal, eliminar redundancias, nominalizar, parafrasear. Sintese = 20-30% do original.`,
    rules: [
      'Ideia principal.',
      'Eliminar redundancias.',
      '20-30% do original.',
    ],
    examples: [
      {
        english:
          'Em suma, o autor defende que a globalizacao trouxe mais beneficios.',
        translation:
          'In summary, the author argues that globalization brought more benefits.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Sintese demasiado longa.',
        correct: 'Sintese concisa.',
        note: '',
      },
    ],
    related: ['coesao-textual', 'critica-construtiva', 'reformulacao'],
  },
  {
    slug: 'critica-construtiva',
    title: 'Critica construtiva',
    level: 'C1',
    category: 'Avancado',
    summary: 'Formular criticas de forma elegante.',
    explanation: `Comecar pelo positivo, usar condicional, perguntar em vez de afirmar, focar na solucao.`,
    rules: ['Positivo primeiro.', 'Condicional: seria, poderia.'],
    examples: [
      {
        english:
          'O relatorio esta muito completo. Talvez fosse util incluir mais dados.',
        translation:
          'The report is comprehensive. It might be useful to include more data.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Isto esta errado.',
        correct: 'Esta seccao poderia beneficiar de uma revisao.',
        note: '',
      },
    ],
    related: ['reformulacao', 'matizadores', 'registo-formal'],
  },
  {
    slug: 'reformulacao',
    title: 'Reformulacao',
    level: 'C1',
    category: 'Avancado',
    summary: 'Tecnicas para reformular ideias.',
    explanation: `Isto e, ou seja, dito de outra forma. Parafrasear, mudar registo, alterar voz.`,
    rules: ['Isto e / ou seja.', 'Adaptar registo.'],
    examples: [
      {
        english: 'O evento foi cancelado. Ou seja, nao havera concerto.',
        translation:
          'The event was canceled. In other words, there will be no concert.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Ou seja, tipo, quer dizer...',
        correct: 'Ou seja,...',
        note: 'Um reformulador e suficiente.',
      },
    ],
    related: ['sintese-textual', 'critica-construtiva', 'registo-formal'],
  },
  {
    slug: 'revisao-conjuntivo',
    title: 'Revisao geral do conjuntivo',
    level: 'C2',
    category: 'Conjuntivo',
    summary: 'Dominio completo do conjuntivo.',
    explanation: `Presente (que, talvez), Imperfeito (se), Futuro (quando), MQP Composto (se + tivesse + part.).`,
    rules: ['Presente, Imperfeito, Futuro, MQP Composto.'],
    examples: [
      {
        english: 'Qualquer que seja a decisao, estou de acordo.',
        translation: 'Whatever the decision may be, I agree.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Qualquer que e a decisao.',
        correct: 'Qualquer que seja a decisao.',
        note: 'Qualquer que + conjuntivo.',
      },
    ],
    related: [
      'presente-conjuntivo',
      'imperfeito-conjuntivo',
      'futuro-do-conjuntivo',
    ],
  },
  {
    slug: 'revisao-condicional',
    title: 'Revisao geral dos condicionais',
    level: 'C2',
    category: 'Condicionais',
    summary: 'Dominio de todas as estruturas condicionais.',
    explanation: `Tipo 1: Se estudares, passas. Tipo 2: Se estudasses, passavas. Tipo 3: Se tivesses estudado, tinhas passado.`,
    rules: ['Tipo 1, 2, 3.', 'Coloquial EP: imperfeito em vez de condicional.'],
    examples: [
      {
        english: 'Se estudares, passas.',
        translation: 'If you study, you will pass.',
      },
      {
        english: 'Se estudasses, passavas.',
        translation: 'If you studied, you would pass.',
        note: 'coloquial EP',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Se estudavas, passavas.',
        correct: 'Se estudasses, passavas.',
        note: 'Hipotetica: imperfeito conjuntivo.',
      },
    ],
    related: [
      'condicional',
      'se-imperfeito-subjuntivo',
      'condicional-composto',
    ],
  },
  {
    slug: 'mesoclise',
    title: 'Mesoclise',
    level: 'C2',
    category: 'Pronomes',
    summary: 'Dominio da mesoclise no futuro e condicional.',
    explanation: `Dar-te-ei, Dar-te-ia. Formal. Na fala: ir + infinitivo.`,
    rules: ['Pronome no meio do verbo.', 'Futuro e condicional.'],
    examples: [
      {
        english: 'Enviar-lhe-ei os documentos amanha.',
        translation: 'I will send you the documents tomorrow.',
        note: 'formal',
      },
      {
        english: 'Poder-se-ia argumentar que...',
        translation: 'One could argue that...',
        note: 'academico',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Enviar-lhe-ei (conversa informal)',
        correct: 'Vou enviar-lhe os documentos.',
        note: 'Mesoclise e formal.',
      },
    ],
    related: ['colocacao-pronominal', 'futuro-do-presente', 'condicional'],
  },
  {
    slug: 'estilo-literario',
    title: 'Estilo literario',
    level: 'C2',
    category: 'Avancado',
    summary: 'Desenvolver uma voz literaria autentica.',
    explanation: `Variedade sintatica, lexico preciso, figuras de estilo com moderacao, mostrar em vez de dizer.`,
    rules: ['Variar estruturas.', 'Lexico preciso.', 'Mostrar, nao dizer.'],
    examples: [
      {
        english: 'O sol morria no horizonte, tingindo o Tejo de ouro liquido.',
        translation:
          'The sun was dying on the horizon, dyeing the Tagus with liquid gold.',
      },
    ],
    common_mistakes: [
      { wrong: 'Abusar de adjetivos.', correct: 'Menos e mais.', note: '' },
    ],
    related: ['descricao-literaria', 'recursos-estilisticos', 'voz-narrativa'],
  },
  {
    slug: 'voz-narrativa',
    title: 'Voz narrativa',
    level: 'C2',
    category: 'Avancado',
    summary: 'Tipos de narrador e construcao da voz narrativa.',
    explanation: `1a pessoa, 3a omnisciente, 3a objetiva, discurso indireto livre.`,
    rules: [
      '1a pessoa = personagem.',
      '3a omnisciente = pensamentos.',
      'Discurso indireto livre.',
    ],
    examples: [
      {
        english:
          'Maria abriu a porta devagar, sem saber que o destino a esperava. (omnisciente)',
        translation:
          'Maria slowly opened the door, not knowing that fate awaited her.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Alternar voz sem necessidade.',
        correct: 'Manter consistencia.',
        note: '',
      },
    ],
    related: ['estilo-literario', 'descricao-literaria'],
  },
  {
    slug: 'recursos-estilisticos',
    title: 'Recursos estilisticos avancados',
    level: 'C2',
    category: 'Avancado',
    summary: 'Sinestesia, aliteracao, assonancia, quiasmo.',
    explanation: `Sinestesia (cheiro doce), aliteracao (vento varria vielas), quiasmo (Nao vivemos para comer, comemos para viver).`,
    rules: ['Sinestesia, aliteracao, assonancia, quiasmo.'],
    examples: [
      {
        english: 'O cheiro doce da manha. (sinestesia)',
        translation: 'The sweet smell of the morning.',
      },
      {
        english: 'O vento varria as velhas vielas. (aliteracao)',
        translation: 'The wind swept the old alleys.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Aliteracao forcada.',
        correct: 'Usar com naturalidade.',
        note: '',
      },
    ],
    related: ['figuras-literarias', 'estilo-literario'],
  },
  {
    slug: 'equivalencia',
    title: 'Equivalencia na traducao',
    level: 'C2',
    category: 'Avancado',
    summary: 'Principios de equivalencia tradutoria.',
    explanation: `Equivalencia funcional: desenrascanco -> knack for improvising. Evitar calques. Expressoes: equivalentes culturais.`,
    rules: ['Equivalencia funcional.', 'Evitar calques.'],
    examples: [
      {
        english: 'Custou os olhos da cara. -> It cost an arm and a leg.',
        translation: 'equivalencia funcional',
      },
    ],
    common_mistakes: [
      {
        wrong:
          'Estar com a pulga atras da orelha. -> To be with the flea behind the ear.',
        correct: 'To be suspicious.',
        note: 'Expressoes NAO se traduzem literalmente.',
      },
    ],
    related: ['falsos-amigos', 'matizes-traducao'],
  },
  {
    slug: 'matizes-traducao',
    title: 'Matizes de traducao',
    level: 'C2',
    category: 'Avancado',
    summary: 'Nuances que distinguem uma boa traducao.',
    explanation: `Registo, tempos verbais, conotacoes culturais (saudade sem equivalente exato).`,
    rules: [
      'Registo e formalidade.',
      'Tempos: composto PT != present perfect EN.',
      'Conotacoes culturais.',
    ],
    examples: [
      {
        english:
          'Tenho andado a pensar nisso. -> I have been thinking about that.',
        translation: 'composto -> continuous',
      },
      {
        english: 'Que saudades! -> I miss you so much!',
        translation: 'conceito cultural',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Tenho comido ontem. -> I have eaten yesterday.',
        correct: 'Comi ontem. -> I ate yesterday.',
        note: 'Acao unica: preterito simples.',
      },
    ],
    related: ['equivalencia', 'falsos-amigos'],
  },
  {
    slug: 'falsos-amigos',
    title: 'Falsos amigos',
    level: 'C2',
    category: 'Avancado',
    summary: 'Palavras portuguesas que parecem inglesas.',
    explanation: `Atualmente = currently (nao actually). Compromisso = appointment (nao compromise). Pretender = to intend (nao to pretend).`,
    rules: [
      'Atualmente = currently.',
      'Compromisso = appointment.',
      'Pretender = to intend.',
    ],
    examples: [
      {
        english: 'Atualmente moro em Lisboa. -> I currently live in Lisbon.',
        translation: 'NOT: Actually',
      },
      {
        english:
          'Tenho um compromisso as tres. -> I have an appointment at three.',
        translation: 'NOT: compromise',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Actually -> atualmente.',
        correct: 'Actually = na verdade. Atualmente = currently.',
        note: '',
      },
    ],
    related: ['equivalencia', 'matizes-traducao'],
  },
  {
    slug: 'evolucao-linguistica',
    title: 'Evolucao linguistica',
    level: 'C2',
    category: 'Avancado',
    summary: 'Como a lingua portuguesa evoluiu do latim.',
    explanation: `Latim vulgar -> Galego-portugues (XII-XIV) -> Portugues antigo -> Classico -> Moderno. Mudancas: populu > povo, plenu > cheio, manu > mao.`,
    rules: [
      'Latim vulgar > Galego-portugues > Moderno.',
      'Queda de consoantes, palatalizacao, nasalizacao.',
    ],
    examples: [
      {
        english: 'Latim: populu -> Portugues: povo',
        translation: 'queda inter vocalica',
      },
      {
        english: 'Latim: plenu -> Portugues: cheio',
        translation: 'palatalizacao',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Confundir evolucao com corrupcao.',
        correct: 'Mudanca linguistica e natural.',
        note: '',
      },
    ],
    related: ['latinismos', 'arabismos-portugueses'],
  },
  {
    slug: 'latinismos',
    title: 'Latinismos',
    level: 'C2',
    category: 'Avancado',
    summary: 'Expressoes e palavras latinas no portugues.',
    explanation: `a priori, ad hoc, ipso facto, per capita, sine qua non, grosso modo, curriculum vitae, lato sensu.`,
    rules: ['Comuns no registo formal.', 'Usar com precisao.'],
    examples: [
      {
        english: 'A seguranca e uma condicao sine qua non.',
        translation: 'Security is a sine qua non condition.',
      },
      {
        english: 'Grosso modo, a proposta e aceitavel.',
        translation: 'Roughly speaking, the proposal is acceptable.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'A posteriori. (com crase)',
        correct: 'A posteriori. (sem crase).',
        note: 'A e preposicao latina, nao leva crase.',
      },
    ],
    related: [
      'evolucao-linguistica',
      'arabismos-portugueses',
      'registo-formal',
    ],
  },
  {
    slug: 'arabismos-portugueses',
    title: 'Arabismos portugueses',
    level: 'C2',
    category: 'Avancado',
    summary: 'A heranca arabe no lexico portugues.',
    explanation: `~1000 palavras: arroz, azeite, acucar, algebra, algoritmo, zero, aldeia. Muitas com al- (artigo arabe).`,
    rules: [
      '~1000 palavras.',
      'al- = artigo arabe.',
      'Alimentos, ciencia, arquitetura.',
    ],
    examples: [
      { english: 'azeite (az-zayt)', translation: 'olive oil' },
      { english: 'arroz (ar-ruzz)', translation: 'rice' },
      { english: 'algebra (al-jabr)', translation: 'algebra' },
    ],
    common_mistakes: [
      {
        wrong: 'Ignorar a origem arabe.',
        correct: 'O portugues e uma lingua de encontros culturais.',
        note: '',
      },
    ],
    related: ['evolucao-linguistica', 'latinismos'],
  },
  {
    slug: 'generos-textuais',
    title: 'Generos textuais',
    level: 'C2',
    category: 'Avancado',
    summary: 'Dominio de todos os generos textuais.',
    explanation: `Ensaio, academico, relatorio, editorial, carta formal, discurso. Cada um com convencoes especificas.`,
    rules: [
      'Cada genero tem convencoes.',
      'Conhecer o genero orienta escolhas.',
    ],
    examples: [
      {
        english: 'O presente relatorio apresenta os resultados do inquerito.',
        translation: 'This report presents the survey results.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Misturar convencoes de generos.',
        correct: 'Cada genero tem registo e estrutura proprios.',
        note: '',
      },
    ],
    related: ['registo-formal', 'estrutura-argumentativa'],
  },
  {
    slug: 'criatividade-linguistica',
    title: 'Criatividade linguistica',
    level: 'C2',
    category: 'Avancado',
    summary: 'Brincar com a lingua: neologismos, trocadilhos.',
    explanation: `Neologismos (googlar), amalgamas (portunhol), trocadilhos (Nao e so ver, e prever), estrangeirismos adaptados (futebol).`,
    rules: ['Neologismos, amalgamas, trocadilhos.'],
    examples: [
      {
        english: 'Vou googlar esse termo. (neologismo)',
        translation: 'I am going to Google that term.',
      },
      {
        english: 'Nao e so ver, e prever! (trocadilho)',
        translation: 'It is not just seeing, it is foreseeing!',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Neologismos incompreensiveis.',
        correct: 'Devem ser intuitivos.',
        note: '',
      },
    ],
    related: ['derivacao', 'expressoes-coloquiais', 'expressao-matizada'],
  },
  {
    slug: 'edicao',
    title: 'Edicao e revisao de textos',
    level: 'C2',
    category: 'Avancado',
    summary: 'Tecnicas de edicao para clareza e elegancia.',
    explanation: `Conteudo, estilo, gramatica, tipografia. Ler em voz alta. Distancia temporal.`,
    rules: ['Conteudo, estilo, gramatica, tipografia.'],
    examples: [
      {
        english: 'Rever: Os aluno terminou -> Os alunos terminaram.',
        translation: 'concordancia',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Rever apenas gramatica.',
        correct: 'Edicao eficaz reve tudo.',
        note: '',
      },
    ],
    related: ['reformulacao', 'coesao-textual', 'expressao-matizada'],
  },
  {
    slug: 'expressao-matizada',
    title: 'Expressao matizada',
    level: 'C2',
    category: 'Avancado',
    summary: 'Arte de matizar o discurso.',
    explanation: `Certeza (e indubitavel), probabilidade (tudo indica), incerteza (diria que), cortesia (permita-me, gostaria de).`,
    rules: ['Certeza, probabilidade, incerteza, cortesia.'],
    examples: [
      {
        english: 'E indubitavel que a medida trouxe beneficios.',
        translation: 'It is unquestionable.',
      },
      {
        english: 'Diria que a situacao e complexa.',
        translation: 'I would say the situation is complex.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Afirmacoes demasiado categoricas.',
        correct: 'Matizar quando nao ha certeza.',
        note: '',
      },
    ],
    related: ['matizadores', 'recursos-retoricos', 'critica-construtiva'],
  },
  {
    slug: 'integracao-gramatical',
    title: 'Integracao gramatical',
    level: 'C2',
    category: 'Avancado',
    summary: 'Sintese de todos os conhecimentos gramaticais.',
    explanation: `Conjuntivo/indicativo natural. Enclise/proclise/mesoclise. Concordancia temporal. Escolha contextual de registo.`,
    rules: [
      'Conjuntivo/indicativo.',
      'Enclise/proclise/mesoclise.',
      'Concordancia.',
      'Registo contextualizado.',
    ],
    examples: [
      {
        english:
          'Se eu tivesse sabido que seria tao dificil, ter-me-ia preparado melhor.',
        translation:
          'If I had known it would be so difficult, I would have prepared better.',
        note: 'integracao completa',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Hesitacao conjuntivo/indicativo.',
        correct: 'Com pratica, torna-se intuitivo.',
        note: '',
      },
    ],
    related: [
      'revisao-conjuntivo',
      'revisao-condicional',
      'expressao-matizada',
    ],
  },
  {
    slug: 'fluencia-nativa',
    title: 'Fluencia nativa',
    level: 'C2',
    category: 'Avancado',
    summary: 'Alcancar proficiencia indistinguivel de nativo.',
    explanation: `Expressao espontanea, dominio cultural, entoacao natural PE, registos flexiveis, intuicao gramatical. C2: autonomia.`,
    rules: [
      'Expressao espontanea.',
      'Dominio cultural.',
      'Entoacao PE.',
      'Flexibilidade de registos.',
    ],
    examples: [
      {
        english:
          'A fluencia nao e so falar corretamente -- e pensar, sentir e sonhar em portugues.',
        translation:
          'Fluency is not just speaking correctly -- it is thinking, feeling, and dreaming in Portuguese.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Achar que C2 e o fim.',
        correct: 'A aprendizagem nunca termina.',
        note: '',
      },
    ],
    related: ['integracao-gramatical', 'expressao-matizada'],
  },
  {
    slug: 'tupinismos',
    title: 'Tupinismos — palavras de origem tupi-guarani',
    level: 'C2',
    category: 'Avancado',
    summary:
      'Reconhecer e compreender os tupinismos integrados no português brasileiro.',
    explanation: `Os **tupinismos** são palavras de origem tupi-guarani incorporadas ao português, principalmente através do contato colonial no Brasil.\n\nMuitas designam elementos da fauna e flora brasileiras, mas também alimentos, utensílios e topónimos:\n\n- **Fauna**: jaguar, tatu, piranha, capivara, arara, tucano, sucuri, jabuti\n- **Flora**: abacaxi, mandioca, caju, capim, açaí, buriti, ipê, jacarandá\n- **Alimentação**: pipoca, tapioca, paçoca, mingau, moqueca\n- **Topónimos**: Ipanema, Copacabana, Tijuca, Curitiba, Paraná, Iguaçu\n\nEstas palavras são usadas quotidianamente no Brasil e enriquecem o léxico português com uma herança indígena viva.`,
    rules: [
      'Tupinismos designam maioritariamente fauna, flora e topónimos brasileiros.',
      'Muitos tupinismos não têm equivalente em português europeu (ex: abacaxi vs ananás).',
      'São parte integrante do vocabulário ativo brasileiro.',
      'Reconhecer a origem tupi demonstra conhecimento avançado da cultura e história da língua.',
    ],
    examples: [
      {
        english: 'Vou comer um abacaxi com tapioca.',
        translation: 'I am going to eat a pineapple with tapioca.',
      },
      {
        english: 'O tucano e a arara são aves típicas do Brasil.',
        translation: 'The toucan and the macaw are typical Brazilian birds.',
      },
      {
        english: 'A capivara é o maior roedor do mundo.',
        translation: 'The capybara is the largest rodent in the world.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Achar que abacaxi e ananás são sempre sinónimos.',
        correct:
          'Em Portugal usa-se ananás; no Brasil, abacaxi. Designam variedades diferentes.',
        note: 'Distinção regional.',
      },
      {
        wrong: 'Confundir mandioca com batata-doce.',
        correct:
          'Mandioca (ou aipim/macaxeira) é uma raiz diferente, da qual se faz farinha e tapioca.',
        note: 'Distinção botânica.',
      },
    ],
    related: [
      'arabismos-portugueses',
      'evolucao-linguistica',
      'portugues-brasileiro',
    ],
  },
]
