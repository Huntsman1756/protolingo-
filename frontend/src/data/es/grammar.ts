export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'

export type GrammarCategory =
  | 'Tiempos Verbales'
  | 'Sustantivos'
  | 'Pronombres'
  | 'Adjetivos y Adverbios'
  | 'Verbos'
  | 'Condicionales'
  | 'Voz Pasiva'
  | 'Estilo Indirecto'
  | 'Oraciones'
  | 'Artículos'
  | 'Preposiciones'
  | 'Subjuntivo'
  | 'Avanzado'

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
  /* ═══ A1 ═══ */

  {
    slug: 'ser',
    title: 'El verbo ser',
    level: 'A1',
    category: 'Tiempos Verbales',
    summary:
      'Usos básicos del verbo ser: identidad, origen, características permanentes.',
    structure:
      'yo soy · tú eres · él/ella/usted es · nosotros/as somos · vosotros/as sois · ellos/ellas/ustedes son',
    explanation:
      'El verbo **ser** es uno de los dos verbos copulativos principales del español. Se usa para expresar:\n\n- **Identidad**: *Yo soy Ana.*\n- **Origen o nacionalidad**: *Él es de México. / Somos españoles.*\n- **Características permanentes**: *La casa es grande. / Mi hermana es alta.*\n- **Profesión**: *Ella es médica.*\n- **Posesión**: *El libro es de Juan.*\n- **Hora y fecha**: *Son las tres. / Hoy es lunes.*\n- **Material**: *La mesa es de madera.*\n\nA diferencia del inglés, el español **no** usa el pronombre obligatoriamente: *Soy profesor* es más natural que *Yo soy profesor*.',
    rules: [
      'El pronombre sujeto se omite con frecuencia porque la terminación del verbo indica la persona.',
      '"Ser" expresa características esenciales, permanentes o inherentes.',
      'La forma "es" cubre él, ella y usted indistintamente.',
      '"Ser de + lugar" indica origen o procedencia.',
      'En preguntas no se usa auxiliar: "¿Eres tú?".',
    ],
    examples: [
      {
        english: 'Soy estudiante de español.',
        translation: 'I am a Spanish student.',
      },
      {
        english: '¿Eres de Argentina?',
        translation: 'Are you from Argentina?',
      },
      { english: 'Somos hermanos.', translation: 'We are siblings.' },
      {
        english: 'Son las dos y media.',
        translation: "It's two thirty.",
        note: 'hora',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Estoy de Madrid.',
        correct: 'Soy de Madrid.',
        note: '"Ser de" indica origen. "Estar" no se usa para procedencia.',
      },
      {
        wrong: 'Soy un profesor.',
        correct: 'Soy profesor.',
        note: 'Con profesiones no se usa artículo indefinido salvo que haya adjetivo.',
      },
    ],
    related: ['estar', 'ser-nacionalidad', 'pronombres-sujeto', 'horas'],
  },

  {
    slug: 'pronombres-sujeto',
    title: 'Pronombres de sujeto',
    level: 'A1',
    category: 'Pronombres',
    summary: 'Los pronombres personales que realizan la acción del verbo.',
    structure:
      'yo · tú · él/ella/usted · nosotros/as · vosotros/as · ellos/ellas/ustedes',
    explanation:
      'Los **pronombres de sujeto** indican quién realiza la acción. En español es muy frecuente **omitirlos** porque la conjugación verbal ya identifica a la persona.\n\n| Singular | Plural |\n|----------|--------|\n| yo | nosotros / nosotras |\n| tú (informal) · usted (formal) | vosotros/as (España) · ustedes (América / formal) |\n| él · ella | ellos · ellas |\n\nEn América Latina **ustedes** sustituye completamente a **vosotros/as** tanto en contextos formales como informales. En España, vosotros/as es informal y ustedes es formal. El pronombre **ello** es neutro y se usa raramente para ideas abstractas.',
    rules: [
      'Los pronombres de sujeto se omiten normalmente. Solo se usan para énfasis, contraste o ambigüedad.',
      '"Usted" es formal; "tú" es informal. En Argentina/Uruguay se usa "vos" en lugar de "tú".',
      '"Nosotros/as" y "vosotros/as" tienen forma femenina cuando todo el grupo es femenino.',
      'En América Latina "ustedes" reemplaza a "vosotros/as" en todos los contextos.',
      '"Ello" es el pronombre neutro y casi no se usa en español coloquial.',
    ],
    examples: [
      {
        english: 'Yo vivo en Barcelona.',
        translation: 'I live in Barcelona.',
        note: 'énfasis',
      },
      {
        english: '¿Tú qué opinas?',
        translation: 'What do you think?',
        note: 'contraste',
      },
      {
        english: 'Ustedes son muy amables.',
        translation: 'You are very kind.',
        note: 'América Latina',
      },
      {
        english: 'Vosotros tenéis razón.',
        translation: 'You are right.',
        note: 'España',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Es de México.',
        correct: 'Él es de México. / Es de México.',
        note: 'Sin tilde, "es" es verbo. Con tilde, "él" es pronombre. En contexto suele estar claro.',
      },
      {
        wrong: 'Tú eres de España?',
        correct: '¿Tú eres de España?',
        note: 'No olvidar el signo de apertura de interrogación (¿).',
      },
    ],
    related: ['ser', 'adjetivos-posesivos', 'verbos-reflexivos'],
  },

  {
    slug: 'articulos-definidos',
    title: 'Artículos definidos',
    level: 'A1',
    category: 'Artículos',
    summary: 'el, la, los, las — cómo y cuándo usar el artículo determinado.',
    structure:
      'el (masc. sing.) · la (fem. sing.) · los (masc. pl.) · las (fem. pl.)',
    explanation:
      'Los **artículos definidos** (el, la, los, las) acompañan a un sustantivo conocido por el hablante y el oyente, o que ha sido mencionado antes.\n\nSe usan para:\n- **Referirse a algo específico**: *El coche de Juan es rojo.*\n- **Generalizaciones**: *Los perros son leales.*\n- **Sustantivar otras palabras**: *Lo importante es participar.*\n\nEl artículo neutro **lo** se usa con adjetivos o adverbios para formar sustantivos abstractos: *lo bueno, lo malo, lo hecho*.\n\nContracciones obligatorias: **a + el → al** (*Voy al parque*) y **de + el → del** (*La casa del profesor*).',
    rules: [
      'Concuerdan en género y número con el sustantivo que acompañan.',
      '"El" se usa ante sustantivos femeninos que empiezan con "a" o "ha" tónica: *el agua, el hacha, el águila*.',
      'Las contracciones "al" y "del" son obligatorias.',
      'El artículo neutro "lo" no acompaña sustantivos, solo adjetivos o adverbios.',
      'Se omite el artículo con nombres propios de persona, salvo en registros coloquiales.',
    ],
    examples: [
      {
        english: 'El libro está en la mesa.',
        translation: 'The book is on the table.',
      },
      {
        english: 'Los niños juegan en el parque.',
        translation: 'The children play in the park.',
      },
      {
        english: 'Voy al cine los sábados.',
        translation: 'I go to the cinema on Saturdays.',
        note: 'contracción al',
      },
      {
        english: 'Lo difícil es empezar.',
        translation: 'The hard part is starting.',
        note: 'artículo neutro lo',
      },
    ],
    common_mistakes: [
      {
        wrong: 'El agua está fría.',
        correct: 'El agua está fría.',
        note: 'Correcto. "Agua" es femenino pero usa "el" por la a tónica. El adjetivo va en femenino.',
      },
      {
        wrong: 'Voy a el colegio.',
        correct: 'Voy al colegio.',
        note: 'La contracción "al" es obligatoria.',
      },
    ],
    related: [
      'articulos-indefinidos',
      'genero-sustantivos',
      'preposiciones-lugar',
    ],
  },

  {
    slug: 'ser-nacionalidad',
    title: 'Ser + nacionalidad y origen',
    level: 'A1',
    category: 'Tiempos Verbales',
    summary: 'Expresar procedencia, nacionalidad y origen con el verbo ser.',
    structure: 'ser + de + lugar · ser + adjetivo de nacionalidad',
    explanation:
      'Para expresar el **origen** y la **nacionalidad** se usa el verbo **ser** con dos estructuras:\n\n1. **Ser + de + lugar** (ciudad, país, región): *Soy de Colombia. / Somos de Barcelona.*\n2. **Ser + adjetivo de nacionalidad**: *Es mexicana. / Son franceses.*\n\nLos adjetivos de nacionalidad **concuerdan en género y número** con el sujeto:\n- *Juan es español. / María es española.*\n- *Ellos son italianos. / Ellas son italianas.*\n\n**No** se usa artículo con la profesión ni con la nacionalidad, salvo que el sustantivo esté modificado: *Es un español muy simpático.*',
    rules: [
      '"Ser de + lugar" para origen geográfico. No se usa "estar" para este sentido.',
      'Los adjetivos de nacionalidad llevan minúscula en español.',
      'Concordancia de género: -o/-a, consonante + a, -és/-esa.',
      'En plural se añade -s o -es según corresponda.',
    ],
    examples: [
      { english: 'Soy de Perú.', translation: 'I am from Peru.' },
      { english: 'Ella es inglesa.', translation: 'She is English.' },
      { english: 'Nosotros somos alemanes.', translation: 'We are German.' },
      { english: '¿De dónde eres?', translation: 'Where are you from?' },
    ],
    common_mistakes: [
      {
        wrong: 'Estoy de Francia.',
        correct: 'Soy de Francia.',
        note: '"Estar de" no indica origen. "Soy de" es la fórmula correcta.',
      },
      {
        wrong: 'Soy Española.',
        correct: 'Soy española.',
        note: 'Los adjetivos de nacionalidad van en minúscula.',
      },
    ],
    related: ['ser', 'genero-sustantivos', 'articulos-indefinidos'],
  },

  {
    slug: 'genero-sustantivos',
    title: 'Género de los sustantivos',
    level: 'A1',
    category: 'Sustantivos',
    summary:
      'Reglas básicas para saber si un sustantivo es masculino o femenino.',
    structure:
      'sustantivo masculino (-o, -or, -aje...) · sustantivo femenino (-a, -ción, -dad...)',
    explanation:
      'En español todos los sustantivos tienen **género gramatical**: masculino o femenino. No existe el género neutro para sustantivos.\n\n**Generalmente son masculinos**:\n- Palabras terminadas en **-o**: *el libro, el perro*.\n- Palabras terminadas en **-or**: *el amor, el dolor* (excepción: *la flor*).\n- Palabras terminadas en **-aje**: *el viaje, el coraje*.\n- Días de la semana, colores usados como sustantivos, ríos, mares.\n\n**Generalmente son femeninos**:\n- Palabras terminadas en **-a**: *la casa, la mesa*.\n- Palabras terminadas en **-ción, -sión, -dad, -tad, -tud**: *la canción, la actitud*.\n- Letras del alfabeto: *la a, la be*.\n\nExisten muchas excepciones: *el día, el mapa, la mano, la radio*. Conviene aprender el artículo junto con el sustantivo.',
    rules: [
      'Todo sustantivo tiene género; no hay neutro para objetos.',
      '-o suele ser masculino; -a suele ser femenino, pero hay excepciones notables.',
      'Las palabras de origen griego terminadas en -ma, -pa, -ta son masculinas: el problema, el planeta, el sistema.',
      'Los sustantivos terminados en -ista son invariables en género: el/la artista, el/la dentista.',
      'El artículo determina el género en casos ambiguos: "el mar" / "la mar" (poético).',
    ],
    examples: [
      { english: 'El coche rojo.', translation: 'The red car.' },
      { english: 'La canción es bonita.', translation: 'The song is pretty.' },
      {
        english: 'El problema es grave.',
        translation: 'The problem is serious.',
        note: 'masculino de origen griego',
      },
      {
        english: 'La mano izquierda.',
        translation: 'The left hand.',
        note: 'excepción: femenino terminado en -o',
      },
    ],
    common_mistakes: [
      {
        wrong: 'La problema.',
        correct: 'El problema.',
        note: 'Las palabras de origen griego en -ma son masculinas.',
      },
      {
        wrong: 'El día es bonita.',
        correct: 'El día es bonito.',
        note: '"Día" es masculino aunque termine en -a. El adjetivo debe concordar.',
      },
    ],
    related: [
      'articulos-definidos',
      'articulos-indefinidos',
      'adjetivos-descriptivos',
    ],
  },

  {
    slug: 'articulos-indefinidos',
    title: 'Artículos indefinidos',
    level: 'A1',
    category: 'Artículos',
    summary: 'un, una, unos, unas — el artículo indeterminado en español.',
    structure:
      'un (masc. sing.) · una (fem. sing.) · unos (masc. pl.) · unas (fem. pl.)',
    explanation:
      'Los **artículos indefinidos** acompañan a sustantivos no identificados, que se mencionan por primera vez o que son uno entre muchos.\n\n| | Singular | Plural |\n|---|----------|--------|\n| Masculino | un libro | unos libros |\n| Femenino | una casa | unas casas |\n\nSe usan para:\n- **Primera mención**: *Hay un gato en el jardín.*\n- **Cantidad aproximada**: *Tiene unos treinta años.*\n- **Sustantivo no específico**: *Busco un trabajo.*\n\n**No** se usan con profesiones, nacionalidades o religiones cuando no hay adjetivo modificador: *Es profesor.*',
    rules: [
      '"Un" se usa también ante sustantivos femeninos con a tónica: *un águila, un arma*.',
      'En plural funciona como "algunos/as" o cantidad aproximada.',
      'Se omite con profesiones, nacionalidades y religiones sin adjetivo modificador.',
      'No existe artículo indefinido neutro como el definido "lo".',
    ],
    examples: [
      { english: 'Necesito un bolígrafo.', translation: 'I need a pen.' },
      {
        english: 'Hay una farmacia cerca.',
        translation: "There's a pharmacy nearby.",
      },
      {
        english: 'Tiene unas ideas muy buenas.',
        translation: 'She has some very good ideas.',
      },
      {
        english: 'Es una arquitecta famosa.',
        translation: 'She is a famous architect.',
        note: 'con adjetivo, sí lleva artículo',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Es un profesor.',
        correct: 'Es profesor.',
        note: 'Sin adjetivo, no se usa artículo con profesiones.',
      },
      {
        wrong: 'Una agua fría.',
        correct: 'Un agua fría.',
        note: '"Agua" es femenino pero usa "un" por la a tónica. El adjetivo va en femenino.',
      },
    ],
    related: ['articulos-definidos', 'genero-sustantivos', 'hay'],
  },

  {
    slug: 'tener',
    title: 'El verbo tener',
    level: 'A1',
    category: 'Tiempos Verbales',
    summary: 'Expresar posesión, edad y sensaciones con el verbo tener.',
    structure:
      'yo tengo · tú tienes · él tiene · nosotros tenemos · vosotros tenéis · ellos tienen',
    explanation:
      'El verbo **tener** es irregular (cambio vocálico e → ie) y es uno de los más usados en español. Además de la posesión, expresa:\n\n- **Posesión**: *Tengo un coche nuevo.*\n- **Edad**: *Tengo 25 años.* (NO ~~Soy 25 años~~)\n- **Sensaciones físicas**: *Tengo hambre / sed / frío / calor / sueño.*\n- **Estados**: *Tengo miedo / prisa / suerte / razón.*\n\nEl español usa **tener + sustantivo** donde el inglés usa *to be + adjective*: *I am hungry → Tengo hambre. I am cold → Tengo frío.*',
    rules: [
      'Es verbo irregular con diptongación e→ie en las formas tónicas (tú tienes, ellos tienen).',
      'La primera persona es irregular: "yo tengo" (no ~~tieno~~).',
      'Para la edad se usa "tener", nunca "ser": "Tengo 30 años".',
      '"Tener que + infinitivo" expresa obligación: "Tengo que estudiar".',
    ],
    examples: [
      { english: 'Tengo dos hermanos.', translation: 'I have two siblings.' },
      { english: '¿Cuántos años tienes?', translation: 'How old are you?' },
      { english: 'Tenemos hambre.', translation: 'We are hungry.' },
      { english: 'Tienes razón.', translation: 'You are right.' },
    ],
    common_mistakes: [
      {
        wrong: 'Soy 20 años.',
        correct: 'Tengo 20 años.',
        note: 'En español la edad se expresa con "tener", no con "ser".',
      },
      {
        wrong: 'Soy hambre.',
        correct: 'Tengo hambre.',
        note: 'Las sensaciones físicas usan "tener + sustantivo", no "ser".',
      },
    ],
    related: ['ser', 'estar', 'adjetivos-posesivos'],
  },

  {
    slug: 'adjetivos-posesivos',
    title: 'Adjetivos posesivos',
    level: 'A1',
    category: 'Pronombres',
    summary:
      'mi, tu, su, nuestro, vuestro — indicar posesión antes del sustantivo.',
    structure: 'mi(s) · tu(s) · su(s) · nuestro/a(s) · vuestro/a(s)',
    explanation:
      'Los **adjetivos posesivos** se colocan **delante del sustantivo** y concuerdan en **número** con la cosa poseída. Solo *nuestro* y *vuestro* concuerdan también en **género**.\n\n| Poseedor | Singular | Plural |\n|----------|----------|--------|\n| yo | mi | mis |\n| tú | tu | tus |\n| él/ella/usted | su | sus |\n| nosotros/as | nuestro/a | nuestros/as |\n| vosotros/as | vuestro/a | vuestros/as |\n| ellos/ellas/ustedes | su | sus |\n\nAtención: **su/sus** puede significar *de él, de ella, de usted, de ellos, de ellas, de ustedes*. En contextos ambiguos se usa **de + pronombre**: *su libro → el libro de él/ella*.',
    rules: [
      'Concuerdan en número (singular/plural) con el objeto poseído, no con el poseedor.',
      '"Nuestro" y "vuestro" también concuerdan en género (nuestro/nuestra).',
      'No se usan artículos con los posesivos: "mi libro" (no ~~el mi libro~~).',
      '"Su/sus" es ambiguo; cuando sea necesario, aclarar con "de + pronombre".',
    ],
    examples: [
      { english: 'Mi casa es pequeña.', translation: 'My house is small.' },
      {
        english: '¿Dónde están tus llaves?',
        translation: 'Where are your keys?',
      },
      {
        english: 'Nuestra profesora es de Chile.',
        translation: 'Our teacher is from Chile.',
      },
      {
        english: 'Sus hijos son muy educados.',
        translation: 'Her/His/Their children are very polite.',
        note: 'ambiguo',
      },
    ],
    common_mistakes: [
      {
        wrong: 'La mi mochila.',
        correct: 'Mi mochila.',
        note: 'En español no se usa artículo con el posesivo antepuesto.',
      },
      {
        wrong: 'Sus libro.',
        correct: 'Su libro. / Sus libros.',
        note: 'El posesivo concuerda en número con el sustantivo al que acompaña.',
      },
    ],
    related: ['pronombres-sujeto', 'tener', 'genero-sustantivos'],
  },

  {
    slug: 'adjetivos-descriptivos',
    title: 'Adjetivos descriptivos',
    level: 'A1',
    category: 'Adjetivos y Adverbios',
    summary:
      'Cómo describir personas, objetos y lugares con adjetivos que concuerdan en género y número.',
    structure:
      'sustantivo + adjetivo (normalmente) — adjetivo concuerda en género y número',
    explanation:
      'En español los adjetivos **concuerdan en género y número** con el sustantivo al que modifican. Normalmente van **después del sustantivo**, aunque algunos pueden ir antes por énfasis o estilo.\n\n- **Masculino singular**: *el libro interesante*\n- **Femenino singular**: *la película interesante*\n- **Masculino plural**: *los libros interesantes*\n- **Femenino plural**: *las películas interesantes*\n\nLos adjetivos terminados en **-o** cambian a **-a** para el femenino: *alto → alta*. Los terminados en **-e** o consonante suelen ser invariables en género: *inteligente, feliz*. Para el plural se añade **-s** (o **-es** tras consonante).\n\nAlgunos adjetivos se apocopan delante de un sustantivo masculino singular: *bueno → buen, malo → mal, grande → gran*.',
    rules: [
      'El adjetivo concuerda en género y número con el sustantivo.',
      'Normalmente va detrás del sustantivo, especialmente en descripciones objetivas.',
      'Algunos adjetivos se acortan delante de un sustantivo masculino singular: bueno → buen, malo → mal, grande → gran.',
      'Varios adjetivos seguidos concuerdan todos: "una casa grande y luminosa".',
    ],
    examples: [
      { english: 'Un perro negro.', translation: 'A black dog.' },
      {
        english: 'Una chica inteligente.',
        translation: 'An intelligent girl.',
      },
      { english: 'Los edificios altos.', translation: 'The tall buildings.' },
      {
        english: 'Es un buen amigo.',
        translation: "He's a good friend.",
        note: 'apócope de bueno',
      },
    ],
    common_mistakes: [
      {
        wrong: 'La casa blanco.',
        correct: 'La casa blanca.',
        note: 'El adjetivo debe concordar en género: casa (fem.) → blanca (fem.).',
      },
      {
        wrong: 'Un grande problema.',
        correct: 'Un gran problema.',
        note: '"Grande" se apocopa a "gran" delante de sustantivo singular, masculino o femenino.',
      },
    ],
    related: ['genero-sustantivos', 'comparativos', 'superlativos'],
  },

  {
    slug: 'presente-regular',
    title: 'Presente de indicativo regular',
    level: 'A1',
    category: 'Tiempos Verbales',
    summary: 'Conjugación de los verbos regulares en presente: -ar, -er, -ir.',
    structure:
      'raíz + -o/-as/-a/-amos/-áis/-an (AR) · -o/-es/-e/-emos/-éis/-en (ER) · -o/-es/-e/-imos/-ís/-en (IR)',
    explanation:
      'En español hay tres conjugaciones regulares según la terminación del infinitivo: **-ar**, **-er**, **-ir**. El presente de indicativo se usa para acciones habituales, hechos generales y descripciones.\n\n| Persona | -ar (hablar) | -er (comer) | -ir (vivir) |\n|--------|-------------|------------|-------------|\n| yo | hablo | como | vivo |\n| tú | hablas | comes | vives |\n| él/ella/usted | habla | come | vive |\n| nosotros/as | hablamos | comemos | vivimos |\n| vosotros/as | habláis | coméis | vivís |\n| ellos/ellas/ustedes | hablan | comen | viven |\n\nSe usa también para pedir cosas en presente: *¿Me pasas la sal?* y para hablar del futuro cercano: *Mañana te llamo.*',
    rules: [
      'Las terminaciones son distintas para cada conjugación, salvo "yo" y "él/ella/usted" en -er e -ir que coinciden (-o/-e).',
      'La "o" de la primera persona singular es idéntica en las tres conjugaciones.',
      'Nosotros de -ar y -ir comparten vocal temática: hablamos / vivimos; nosotros de -er es distinta: comemos.',
      'No se usa auxiliar para negativas ni preguntas: "No hablo francés", "¿Comes carne?".',
    ],
    examples: [
      {
        english: 'Hablo español e inglés.',
        translation: 'I speak Spanish and English.',
      },
      {
        english: '¿Comes en casa hoy?',
        translation: 'Are you eating at home today?',
      },
      { english: 'Vivimos en el centro.', translation: 'We live downtown.' },
      {
        english: 'Mis padres no trabajan los fines de semana.',
        translation: "My parents don't work on weekends.",
      },
    ],
    common_mistakes: [
      {
        wrong: 'Yo habla español.',
        correct: 'Yo hablo español.',
        note: 'La primera persona singular termina en -o para las tres conjugaciones.',
      },
      {
        wrong: 'Nosotros comemos juntos?',
        correct: '¿Nosotros comemos juntos?',
        note: 'No olvidar el signo ¿ en las preguntas.',
      },
    ],
    related: ['ser', 'tener', 'estar', 'querer-poder', 'verbos-reflexivos'],
  },

  {
    slug: 'verbos-reflexivos',
    title: 'Verbos reflexivos',
    level: 'A1',
    category: 'Verbos',
    summary:
      'Acciones que el sujeto realiza sobre sí mismo: levantarse, ducharse, vestirse.',
    structure: 'pronombre reflexivo (me/te/se/nos/os/se) + verbo conjugado',
    explanation:
      'Un verbo reflexivo indica que el sujeto realiza y recibe la acción. Se conjugan con los **pronombres reflexivos** que se colocan **delante del verbo** conjugado.\n\n| Pronombre | Ejemplo con *levantarse* |\n|-----------|--------------------------|\n| me | (yo) me levanto |\n| te | (tú) te levantas |\n| se | (él/ella/usted) se levanta |\n| nos | (nosotros) nos levantamos |\n| os | (vosotros) os levantáis |\n| se | (ellos/ellas/ustedes) se levantan |\n\nMuchos verbos cambian de significado al usarse como reflexivos: *llamar* (to call) vs. *llamarse* (to be named); *ir* (to go) vs. *irse* (to leave).',
    rules: [
      'El pronombre reflexivo concuerda con el sujeto: me, te, se, nos, os, se.',
      'El pronombre va antes del verbo conjugado, salvo en imperativo afirmativo e infinitivo.',
      'En infinitivo y gerundio, el pronombre puede ir al final soldado a la palabra: "levantarme", "levantándose".',
      'No todos los verbos con "se" son reflexivos; algunos son pronominales (quejarse, arrepentirse) sin valor reflexivo real.',
    ],
    examples: [
      { english: 'Me levanto a las siete.', translation: 'I get up at seven.' },
      {
        english: '¿A qué hora te acuestas?',
        translation: 'What time do you go to bed?',
      },
      {
        english: 'Nos duchamos por la mañana.',
        translation: 'We shower in the morning.',
      },
      { english: 'Ella se llama Carmen.', translation: 'Her name is Carmen.' },
    ],
    common_mistakes: [
      {
        wrong: 'Levanto a las siete.',
        correct: 'Me levanto a las siete.',
        note: 'No olvidar el pronombre reflexivo.',
      },
      {
        wrong: 'Se llamo Juan.',
        correct: 'Me llamo Juan.',
        note: 'El pronombre debe concordar con el sujeto: yo → me.',
      },
    ],
    related: ['presente-regular', 'horas', 'pronombres-sujeto'],
  },

  {
    slug: 'horas',
    title: 'La hora',
    level: 'A1',
    category: 'Sustantivos',
    summary: 'Preguntar y decir la hora en español.',
    structure: '¿Qué hora es? · Es la una / Son las dos, tres... · a las + hora',
    explanation:
      'Para preguntar la hora se usa: **¿Qué hora es?** (más frecuente) o **¿Qué horas son?** (Latinoamérica).\n\nPara responder:\n- **Es la una** (singular, solo para la 1:00).\n- **Son las dos/tres/cuatro...** (plural).\n\nPara los minutos:\n- *y cinco, y diez, y cuarto, y veinte, y veinticinco, y media*\n- *menos cinco, menos diez, menos cuarto, menos veinte, menos veinticinco*\n\nEn muchos países de América y en usos formales se prefiere el formato digital: *Son las tres y quince / Son las tres quince.*',
    rules: [
      'Usar "es" solo para la una; "son" para el resto.',
      '"A la una" (singular), "a las dos" (plural) para indicar a qué hora ocurre algo.',
      'Mediodía y medianoche: "Es mediodía / Es medianoche", no llevan artículo.',
      'El formato de 24 horas es frecuente en horarios: "Son las quince horas / catorce treinta".',
    ],
    examples: [
      {
        english: '¿Qué hora es? — Son las tres y media.',
        translation: "What time is it? — It's half past three.",
      },
      {
        english: 'La clase empieza a las nueve.',
        translation: 'The class starts at nine.',
      },
      {
        english: 'Son las dos menos cuarto.',
        translation: "It's a quarter to two.",
      },
      {
        english: 'Es la una en punto.',
        translation: "It's one o'clock sharp.",
      },
    ],
    common_mistakes: [
      {
        wrong: 'Son la una y media.',
        correct: 'Es la una y media.',
        note: 'Con la una se usa "es", no "son".',
      },
      {
        wrong: 'A las una.',
        correct: 'A la una.',
        note: 'La una es singular: "a la una", no "a las una".',
      },
    ],
    related: ['ser', 'dias-semana', 'verbos-reflexivos'],
  },

  {
    slug: 'gustar',
    title: 'El verbo gustar',
    level: 'A1',
    category: 'Verbos',
    summary:
      'Expresar gustos y preferencias con la estructura me gusta / me gustan.',
    structure: 'pronombre de OI (me/te/le/nos/os/les) + gusta/gustan + sujeto',
    explanation:
      'El verbo **gustar** tiene una estructura diferente a la del inglés. Literalmente significa "ser agradable para alguien". El sujeto gramatical es la cosa que gusta, no la persona.\n\n| Pronombre OI | Significado |\n|-------------|-------------|\n| me | a mí |\n| te | a ti |\n| le | a él / a ella / a usted |\n| nos | a nosotros/as |\n| os | a vosotros/as |\n| les | a ellos / a ellas / a ustedes |\n\n**Gusta** (singular): cuando lo que gusta es un sustantivo singular o un infinitivo.\n- *Me gusta el chocolate. / Me gusta bailar.*\n\n**Gustan** (plural): cuando lo que gusta es un sustantivo plural.\n- *Me gustan los perros.*\n\nPara enfatizar o aclarar: **a + pronombre tónico**: *A mí me gusta, a ti te gusta.*',
    rules: [
      'El verbo concuerda con la cosa que gusta (sujeto real), no con la persona.',
      'Nunca se dice "~~yo gusto~~" con el significado de "me gusta".',
      'Otros verbos con la misma estructura: encantar, interesar, doler, parecer, importar.',
      '"A + pronombre" es opcional y se usa para énfasis o contraste.',
    ],
    examples: [
      { english: 'Me gusta el café.', translation: 'I like coffee.' },
      {
        english: '¿Te gustan las películas de terror?',
        translation: 'Do you like horror movies?',
      },
      {
        english: 'A ella le gusta viajar.',
        translation: 'She likes to travel.',
      },
      {
        english: 'Nos encanta la música latina.',
        translation: 'We love Latin music.',
        note: 'misma estructura que gustar',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Yo gusto el café.',
        correct: 'Me gusta el café. / A mí me gusta el café.',
        note: '"Gustar" no se conjuga como "to like". El sujeto es "el café".',
      },
      {
        wrong: 'Me gustan bailar.',
        correct: 'Me gusta bailar.',
        note: 'Con infinitivo, el verbo gustar va en singular.',
      },
    ],
    related: ['tambien-tampoco', 'pronombres-objeto-indirecto', 'muy-mucho'],
  },

  {
    slug: 'tambien-tampoco',
    title: 'También y tampoco',
    level: 'A1',
    category: 'Adjetivos y Adverbios',
    summary: 'Expresar acuerdo o coincidencia con también y tampoco.',
    structure: 'también (afirmativo) · tampoco (negativo)',
    explanation:
      '**También** y **tampoco** expresan coincidencia o acuerdo con lo dicho anteriormente.\n\n- **También**: se usa en contextos **afirmativos** para añadir un elemento o expresar acuerdo.\n  *— Me gusta el fútbol. — A mí también.*\n\n- **Tampoco**: se usa en contextos **negativos** para expresar coincidencia en la negación.\n  *— No me gusta el frío. — A mí tampoco.*\n\nEn español, a diferencia del inglés, **no existe doble negación** con "tampoco": *Yo tampoco lo sé* (no ~~Yo no tampoco lo sé~~). Tampoco ya contiene la negación.',
    rules: [
      '"También" para añadir información afirmativa o mostrar acuerdo positivo.',
      '"Tampoco" para mostrar acuerdo negativo o añadir un elemento más en una negación.',
      'No se usa "no" delante de "tampoco": "Yo tampoco voy".',
      'Se pueden reforzar con "a mí también/tampoco".',
    ],
    examples: [
      {
        english: '— Me gusta leer. — A mí también.',
        translation: '"I like reading." "Me too."',
      },
      {
        english: '— No he ido al cine. — Yo tampoco.',
        translation: '"I haven\'t been to the cinema." "Me neither."',
      },
      {
        english: 'Ella también habla francés.',
        translation: 'She also speaks French.',
      },
      {
        english: 'Él tampoco sabe la respuesta.',
        translation: "He doesn't know the answer either.",
      },
    ],
    common_mistakes: [
      {
        wrong: 'Yo no tampoco.',
        correct: 'Yo tampoco.',
        note: '"Tampoco" ya incluye la negación; no se necesita "no".',
      },
      {
        wrong: '— No me gusta. — Yo también.',
        correct: '— No me gusta. — A mí tampoco.',
        note: 'Para coincidir en una negación se usa "tampoco", no "también".',
      },
    ],
    related: ['gustar', 'muy-mucho', 'presente-regular'],
  },

  {
    slug: 'muy-mucho',
    title: 'Muy y mucho',
    level: 'A1',
    category: 'Adjetivos y Adverbios',
    summary:
      'Diferenciar el uso de muy (con adjetivos y adverbios) y mucho (con sustantivos y verbos).',
    structure:
      'muy + adjetivo/adverbio · mucho/a/os/as + sustantivo · verbo + mucho',
    explanation:
      'En español distinguimos **muy** y **mucho** según a qué modifican:\n\n- **Muy** (invariable): modifica **adjetivos** y **adverbios**.\n  *Es muy alto. / Habla muy rápido.*\n\n- **Mucho/a/os/as**: modifica **sustantivos** (concuerda en género y número) o acompaña a **verbos** (invariable: mucho).\n  *Tiene mucho dinero. / Tengo muchas ganas. / Trabaja mucho.*\n\nLa diferencia fundamental: **muy** nunca acompaña a un sustantivo ni a un verbo directamente; **mucho** nunca acompaña a un adjetivo directamente. Excepciones con adjetivos comparativos: *mucho mejor, mucho peor, mucho mayor, mucho menor*.',
    rules: [
      '"Muy" siempre va con adjetivos o adverbios: muy bien, muy bonito, muy lejos.',
      '"Mucho" concuerda con el sustantivo al que acompaña: mucho trabajo, mucha gente, muchos libros, muchas horas.',
      'Con verbos, "mucho" es invariable: comer mucho, dormir mucho.',
      'Excepciones con adjetivos comparativos: mucho mejor, mucho peor, mucho mayor, mucho menor.',
    ],
    examples: [
      {
        english: 'La película es muy interesante.',
        translation: 'The film is very interesting.',
      },
      { english: 'Tengo mucha hambre.', translation: 'I am very hungry.' },
      {
        english: 'Estudia mucho todos los días.',
        translation: 'He studies a lot every day.',
      },
      {
        english: 'Este diccionario es mucho mejor.',
        translation: 'This dictionary is much better.',
        note: 'comparativo',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Estoy mucho cansado.',
        correct: 'Estoy muy cansado.',
        note: 'Con adjetivos se usa "muy", no "mucho".',
      },
      {
        wrong: 'Tengo muy dinero.',
        correct: 'Tengo mucho dinero.',
        note: 'Con sustantivos se usa "mucho", no "muy".',
      },
    ],
    related: ['adjetivos-descriptivos', 'comparativos', 'superlativos'],
  },

  {
    slug: 'estar',
    title: 'El verbo estar',
    level: 'A1',
    category: 'Tiempos Verbales',
    summary:
      'Usos de estar: ubicación, estados temporales, el presente continuo.',
    structure:
      'yo estoy · tú estás · él/ella/usted está · nosotros estamos · vosotros estáis · ellos/ellas/ustedes están',
    explanation:
      'El verbo **estar** es el segundo verbo copulativo del español y se usa para:\n\n- **Ubicación espacial** de personas y cosas: *Estoy en casa. / El banco está en la plaza.*\n- **Estados temporales o cambiantes**: *Estoy cansado. / La sopa está fría.*\n- **Presente continuo**: *estar + gerundio* → *Estoy estudiando. / Está lloviendo.*\n- **Estado civil temporal**: *Estoy soltero/casado.* (aunque también se admite *soy soltero* como estado civil permanente).\n\nNo se usa **estar** para el origen (→ *ser*) ni para eventos (→ *ser*). La elección entre ser y estar depende de si la cualidad se percibe como permanente o temporal.',
    rules: [
      'Estar para ubicación: "Estoy en casa", "Madrid está en España".',
      'Estar para estados temporales: "Estoy enfermo", "Está nublado".',
      '"Estar + gerundio" forma el presente continuo.',
      'Nunca usar estar para origen o nacionalidad.',
    ],
    examples: [
      {
        english: '¿Dónde está el supermercado?',
        translation: 'Where is the supermarket?',
      },
      {
        english: 'Estoy muy contento hoy.',
        translation: 'I am very happy today.',
      },
      {
        english: 'Estamos aprendiendo español.',
        translation: 'We are learning Spanish.',
      },
      { english: 'La puerta está abierta.', translation: 'The door is open.' },
    ],
    common_mistakes: [
      {
        wrong: 'Soy en la oficina.',
        correct: 'Estoy en la oficina.',
        note: 'Para ubicación se usa "estar", no "ser".',
      },
      {
        wrong: 'La fiesta está en el salón.',
        correct: 'La fiesta es en el salón.',
        note: 'Para eventos se usa "ser", no "estar".',
      },
    ],
    related: ['ser', 'hay', 'preposiciones-lugar', 'presente-regular'],
  },

  {
    slug: 'hay',
    title: 'Hay (haber impersonal)',
    level: 'A1',
    category: 'Tiempos Verbales',
    summary: 'Expresar existencia con la forma impersonal "hay".',
    structure: 'hay + sustantivo (singular o plural) — es invariable',
    explanation:
      '**Hay** es la forma impersonal del verbo **haber** en presente. Significa "existe/n" y es **invariable**: se usa la misma forma para singular y plural.\n\n- *Hay un gato en el jardín.* (There is a cat in the garden.)\n- *Hay tres libros en la mesa.* (There are three books on the table.)\n\nNunca se dice ~~"Hayn"~~ ni se pluraliza. Equivale a "there is / there are" del inglés, pero con una sola forma.\n\nEn negativo: *No hay leche. / No hay problemas.*\nEn preguntas: *¿Hay un banco cerca? / ¿Hay preguntas?*\n\nPara el pasado se usa **había/hubo** y para el futuro **habrá**.\n\nNo confundir "hay" (haber impersonal) con "ahí" (adverbio de lugar) ni con "ay" (interjección).',
    rules: [
      '"Hay" es invariable; no cambia con el número del sustantivo.',
      'No confundir "hay" (haber impersonal) con "ahí" (adverbio de lugar) ni con "ay" (interjección).',
      'Se usa con artículos indefinidos, numerales o sin artículo: "Hay gente".',
      'Con artículo definido no se usa "hay" sino "estar": "El libro está en la mesa".',
    ],
    examples: [
      {
        english: 'Hay una farmacia en la esquina.',
        translation: "There's a pharmacy on the corner.",
      },
      {
        english: '¿Hay leche en la nevera?',
        translation: 'Is there milk in the fridge?',
      },
      {
        english: 'No hay muchas opciones.',
        translation: "There aren't many options.",
      },
      {
        english: 'En el parque hay niños jugando.',
        translation: 'There are children playing in the park.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Hayn muchos coches.',
        correct: 'Hay muchos coches.',
        note: '"Hay" es invariable; no existe la forma "hayn".',
      },
      {
        wrong: 'Ahí un problema.',
        correct: 'Hay un problema.',
        note: '"Ahí" es adverbio de lugar; "hay" es la forma impersonal de haber.',
      },
    ],
    related: ['estar', 'articulos-indefinidos', 'preposiciones-lugar'],
  },

  {
    slug: 'preposiciones-lugar',
    title: 'Preposiciones de lugar',
    level: 'A1',
    category: 'Preposiciones',
    summary:
      'en, sobre, debajo de, al lado de, delante de, detrás de, entre y otras.',
    structure: 'preposición + (artículo) + sustantivo',
    explanation:
      'Las **preposiciones de lugar** indican la ubicación de algo o alguien respecto a un punto de referencia.\n\n| Preposición | Significado | Ejemplo |\n|------------|-------------|----------|\n| en | dentro de, sobre | *en la caja, en la mesa* |\n| sobre / encima de | encima | *sobre la mesa* |\n| debajo de | bajo | *debajo de la cama* |\n| al lado de | junto a | *al lado del banco* |\n| delante de | en la parte frontal | *delante del edificio* |\n| detrás de | en la parte trasera | *detrás de la puerta* |\n| entre | en medio de dos o más | *entre la farmacia y el bar* |\n| dentro de | en el interior | *dentro del armario* |\n| fuera de | en el exterior | *fuera de la ciudad* |\n| cerca de | próximo | *cerca de mi casa* |\n| lejos de | distante | *lejos del centro* |\n\nA diferencia del inglés, el español no distingue "in/on/at" con tres preposiciones: **en** cubre "in" y "on" y en algunos casos "at".',
    rules: [
      '"En" es la preposición más versátil para lugar: cubre interior, superficie y ubicación general.',
      'Las preposiciones compuestas llevan "de": debajo de, encima de, al lado de, etc.',
      '"Entre" no lleva "de": "entre la mesa y la silla".',
      'Con "de + el" se usa la contracción "del": "al lado del banco".',
    ],
    examples: [
      {
        english: 'El gato está debajo de la mesa.',
        translation: 'The cat is under the table.',
      },
      {
        english: 'Hay un parque detrás del colegio.',
        translation: 'There is a park behind the school.',
      },
      {
        english: 'Mi casa está entre la farmacia y el banco.',
        translation: 'My house is between the pharmacy and the bank.',
      },
      {
        english: 'Las llaves están dentro del bolso.',
        translation: 'The keys are inside the bag.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Está al lado la puerta.',
        correct: 'Está al lado de la puerta.',
        note: 'Las preposiciones compuestas necesitan "de": al lado de, encima de, debajo de.',
      },
    ],
    related: ['hay', 'estar', 'articulos-definidos'],
  },

  {
    slug: 'ir-a-futuro',
    title: 'Ir a + infinitivo (futuro próximo)',
    level: 'A1',
    category: 'Tiempos Verbales',
    summary:
      'Expresar planes e intenciones futuras con la perífrasis ir a + infinitivo.',
    structure: 'ir (conjugado) + a + infinitivo',
    explanation:
      'La perífrasis **ir a + infinitivo** es la forma más común para hablar del **futuro cercano** o expresar **planes e intenciones**.\n\n| Persona | Ir a + infinitivo (viajar) |\n|---------|----------------------------|\n| yo | voy a viajar |\n| tú | vas a viajar |\n| él/ella/usted | va a viajar |\n| nosotros/as | vamos a viajar |\n| vosotros/as | vais a viajar |\n| ellos/ellas/ustedes | van a viajar |\n\nSe diferencia del futuro simple (*viajaré*) en que "ir a + infinitivo" es más coloquial y expresa una intención más inmediata o un plan ya decidido. Es equivalente a "going to" en inglés.',
    rules: [
      'El verbo "ir" se conjuga en presente, seguido de "a" + infinitivo.',
      'Se usa para planes, intenciones y predicciones con evidencia presente: "Va a llover".',
      'No se usa "a + infinitivo" sin "ir": "~~A comer~~" no es futuro sino una expresión.',
      'En la lengua hablada es mucho más frecuente que el futuro simple.',
    ],
    examples: [
      {
        english: 'Voy a estudiar medicina.',
        translation: 'I am going to study medicine.',
      },
      {
        english: '¿Vas a venir a la fiesta?',
        translation: 'Are you going to come to the party?',
      },
      {
        english: 'Ellos van a viajar a México este verano.',
        translation: 'They are going to travel to Mexico this summer.',
      },
      {
        english: 'Va a llover, mira las nubes.',
        translation: "It's going to rain, look at the clouds.",
      },
    ],
    common_mistakes: [
      {
        wrong: 'Voy estudiar.',
        correct: 'Voy a estudiar.',
        note: 'Entre "ir" y el infinitivo se necesita la preposición "a".',
      },
      {
        wrong: 'Vamos a la playa mañana.',
        correct: 'Vamos a ir a la playa mañana.',
        note: 'Para planes futuros se necesita "ir a + infinitivo".',
      },
    ],
    related: ['presente-regular', 'querer-poder', 'futuro-simple'],
  },

  {
    slug: 'querer-poder',
    title: 'Verbos querer y poder',
    level: 'A1',
    category: 'Verbos',
    summary: 'Expresar deseos (querer) y capacidad o permiso (poder).',
    structure: 'querer/poder (conjugado) + infinitivo',
    explanation:
      '**Querer** (cambio e→ie) y **poder** (cambio o→ue) son verbos irregulares con diptongación que se usan frecuentemente seguidos de **infinitivo**.\n\n**Querer**:\n- yo quiero · tú quieres · él quiere · nosotros queremos · vosotros queréis · ellos quieren\n- Significa deseo o intención: *Quiero aprender español. / ¿Quieres un café?*\n\n**Poder**:\n- yo puedo · tú puedes · él puede · nosotros podemos · vosotros podéis · ellos pueden\n- Significa capacidad o permiso: *Puedo nadar. / ¿Puedo entrar?*\n\nAmbos funcionan como verbos modales: van seguidos directamente de infinitivo, **sin preposición**.',
    rules: [
      'Querer: diptongación e→ie en formas tónicas (tú quieres, ellos quieren). "Nosotros" y "vosotros" no diptongan.',
      'Poder: diptongación o→ue en formas tónicas (tú puedes, ellos pueden). "Nosotros" y "vosotros" no diptongan.',
      'Ambos rigen infinitivo sin preposición: "Quiero salir", "Puedo ayudarte".',
      '"Querer" también puede ir con sustantivo: "Quiero agua".',
    ],
    examples: [
      {
        english: 'Quiero viajar a Argentina.',
        translation: 'I want to travel to Argentina.',
      },
      { english: '¿Puedes ayudarme?', translation: 'Can you help me?' },
      {
        english: 'No podemos salir esta noche.',
        translation: "We can't go out tonight.",
      },
      {
        english: 'Ella quiere ser profesora.',
        translation: 'She wants to be a teacher.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Quiero a comer.',
        correct: 'Quiero comer.',
        note: 'Los verbos modales en español NO llevan preposición antes del infinitivo.',
      },
      {
        wrong: '¿Puedo de entrar?',
        correct: '¿Puedo entrar?',
        note: '"Poder" rige infinitivo directamente, sin "de" ni "a".',
      },
    ],
    related: ['presente-regular', 'ir-a-futuro', 'imperativo-afirmativo'],
  },

  {
    slug: 'dias-semana',
    title: 'Días de la semana y expresiones temporales',
    level: 'A1',
    category: 'Sustantivos',
    summary: 'Los días de la semana, meses y expresiones temporales básicas.',
    structure:
      'el + día · los + día en plural (días de la semana) · en + mes/estación',
    explanation:
      'Los **días de la semana** en español son masculinos:\n\n*lunes, martes, miércoles, jueves, viernes, sábado, domingo.*\n\n- Se escriben con **minúscula**.\n- Llevan artículo definido: *El lunes tengo clase.*\n- El plural de lunes a viernes es invariable: *los lunes* (no ~~los luneses~~).\n- *Los lunes* significa "todos los lunes".\n\nLos **meses** también van en minúscula: *enero, febrero, marzo...*\n\nExpresiones temporales:\n- *Por la mañana / la tarde / la noche.*\n- *Hoy, ayer, mañana, pasado mañana.*\n- *Esta semana / el mes que viene / el año pasado.*',
    rules: [
      'Días de la semana y meses en minúscula en español.',
      '"El + día" para un día concreto: "El lunes voy al médico".',
      '"Los + día" para rutinas: "Los sábados juego al tenis".',
      'Los días de lunes a viernes no cambian en plural: el lunes → los lunes.',
    ],
    examples: [
      {
        english: 'El martes tengo una reunión.',
        translation: 'On Tuesday I have a meeting.',
      },
      {
        english: 'Los domingos descansamos.',
        translation: 'On Sundays we rest.',
      },
      {
        english: 'Mi cumpleaños es en abril.',
        translation: 'My birthday is in April.',
      },
      {
        english: 'Estudio español por las mañanas.',
        translation: 'I study Spanish in the mornings.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'En Lunes voy al gimnasio.',
        correct: 'El lunes voy al gimnasio.',
        note: 'Con días de la semana se usa "el", no "en".',
      },
      {
        wrong: 'Trabajo los Martes.',
        correct: 'Trabajo los martes.',
        note: 'Los días de la semana se escriben con minúscula.',
      },
    ],
    related: ['horas', 'presente-regular', 'preposiciones-lugar'],
  },

  /* ═══ A2 ═══ */

  {
    slug: 'preterito-indefinido-regular',
    title: 'Pretérito indefinido regular',
    level: 'A2',
    category: 'Tiempos Verbales',
    summary:
      'El pasado simple para acciones terminadas: conjugación regular de -ar, -er, -ir.',
    structure:
      'raíz + -é/-aste/-ó/-amos/-asteis/-aron (AR) · -í/-iste/-ió/-imos/-isteis/-ieron (ER/IR)',
    explanation:
      'El **pretérito indefinido** (o pretérito perfecto simple) expresa **acciones pasadas y terminadas**, sin conexión con el presente. Es equivalente al past simple inglés.\n\n| Persona | -ar (hablar) | -er (comer) | -ir (vivir) |\n|--------|-------------|-------------|------------|\n| yo | hablé | comí | viví |\n| tú | hablaste | comiste | viviste |\n| él/ella/usted | habló | comió | vivió |\n| nosotros | hablamos | comimos | vivimos |\n| vosotros | hablasteis | comisteis | vivisteis |\n| ellos/ellas/ustedes | hablaron | comieron | vivieron |\n\nNota: las terminaciones de -er e -ir son **idénticas** en el indefinido. La primera persona de -ar y la de nosotros de -ar y -ir coinciden con el presente; el contexto aclara el tiempo.',
    rules: [
      '-er e -ir comparten las mismas terminaciones en indefinido.',
      'La primera persona del singular (yo) siempre lleva tilde: hablé, comí, viví.',
      'La tercera persona del singular lleva tilde: habló, comió, vivió.',
      'Se usa para acciones completadas en un momento concreto del pasado.',
      'Con marcadores como ayer, la semana pasada, el año pasado, en 2020.',
    ],
    examples: [
      {
        english: 'Ayer hablé con mi madre por teléfono.',
        translation: 'Yesterday I spoke with my mother on the phone.',
      },
      {
        english: 'Comimos paella el domingo pasado.',
        translation: 'We ate paella last Sunday.',
      },
      {
        english: '¿Viviste en Barcelona el año pasado?',
        translation: 'Did you live in Barcelona last year?',
      },
      {
        english: 'Ellos llegaron a las ocho.',
        translation: 'They arrived at eight.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Ayer hablo con Juan.',
        correct: 'Ayer hablé con Juan.',
        note: '"Hablo" es presente; para el pasado se necesita "hablé" con tilde.',
      },
      {
        wrong: 'Ayer comí la paella.',
        correct: 'Ayer comí paella.',
        note: 'En general no se usa artículo definido con comidas cuando se habla de consumirlas.',
      },
    ],
    related: [
      'preterito-irregular',
      'marcadores-temporales',
      'preterito-vs-imperfecto',
    ],
  },
  {
    slug: 'marcadores-temporales',
    title: 'Marcadores temporales del pasado',
    level: 'A2',
    category: 'Adjetivos y Adverbios',
    summary:
      'Ayer, la semana pasada, hace dos días, en 2020... palabras que señalan cuándo ocurrió algo.',
    structure:
      'ayer · anoche · la semana pasada · el mes/año pasado · hace + tiempo · en + año',
    explanation:
      'Los **marcadores temporales** son palabras o expresiones que sitúan una acción en el tiempo. Son fundamentales para elegir entre pretérito indefinido e imperfecto.\n\n**Con pretérito indefinido** (acciones puntuales terminadas):\n- *ayer, anoche, anteayer*\n- *el lunes/mes/año pasado*\n- *la semana pasada*\n- *hace dos días / tres meses / un año*\n- *en 2019, en julio*\n- *de repente, de pronto*\n\n**Con pretérito imperfecto** (descripciones, hábitos):\n- *antes, de pequeño/a, cuando era joven*\n- *todos los días, siempre, cada verano*\n- *mientras*\n\nEl marcador temporal ayuda a identificar qué tiempo usar.',
    rules: [
      '"Hace + cantidad de tiempo" indica cuánto tiempo ha pasado desde la acción.',
      '"En + año/mes" se usa con indefinido para localizar una acción concreta.',
      '"Desde hace" indica duración que continúa en el presente.',
      'No confundir "hace" (marcador) con "desde hace" (duración continua).',
    ],
    examples: [
      {
        english: 'Ayer fui al cine.',
        translation: 'Yesterday I went to the cinema.',
      },
      {
        english: 'La semana pasada visité a mis abuelos.',
        translation: 'Last week I visited my grandparents.',
      },
      {
        english: 'Hace tres años empecé a estudiar español.',
        translation: 'Three years ago I started studying Spanish.',
      },
      {
        english: 'En 2015 nos mudamos a Madrid.',
        translation: 'In 2015 we moved to Madrid.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Hace dos años he viajado a Chile.',
        correct: 'Hace dos años viajé a Chile.',
        note: '"Hace + tiempo" pide pretérito indefinido, no pretérito perfecto.',
      },
      {
        wrong: 'Desde dos años vivo aquí.',
        correct: 'Vivo aquí desde hace dos años.',
        note: '"Desde hace" expresa duración desde el pasado hasta ahora.',
      },
    ],
    related: [
      'preterito-indefinido-regular',
      'preterito-irregular',
      'preterito-perfecto',
    ],
  },
  {
    slug: 'preterito-irregular',
    title: 'Pretérito indefinido irregular',
    level: 'A2',
    category: 'Tiempos Verbales',
    summary: 'Los principales verbos irregulares en pretérito indefinido.',
    structure: 'raíz irregular + -e/-iste/-o/-imos/-isteis/-ieron (sin tilde)',
    explanation:
      'Muchos de los verbos más frecuentes tienen un **pretérito indefinido irregular** con raíces especiales y terminaciones sin tilde.\n\n**Verbos con raíz irregular (pretéritos fuertes)**:\n\n| Infinitivo | Raíz | yo | tú | él |\n|-----------|------|----|----|-----|\n| tener | tuv- | tuve | tuviste | tuvo |\n| estar | estuv- | estuve | estuviste | estuvo |\n| hacer | hic- (hiz-) | hice | hiciste | hizo |\n| poner | pus- | puse | pusiste | puso |\n| poder | pud- | pude | pudiste | pudo |\n| saber | sup- | supe | supiste | supo |\n| querer | quis- | quise | quisiste | quiso |\n| venir | vin- | vine | viniste | vino |\n| decir | dij- | dije | dijiste | dijo |\n| traer | traj- | traje | trajiste | trajo |\n| conducir | conduj- | conduje | condujiste | condujo |\n| andar | anduv- | anduve | anduviste | anduvo |\n\n**Ir y ser comparten la misma conjugación**: *fui, fuiste, fue, fuimos, fuisteis, fueron*.\n**Dar** es como un verbo -er/-ir: *di, diste, dio, dimos, disteis, dieron*.\n**Ver**: *vi, viste, vio, vimos, visteis, vieron* (sin tilde).',
    rules: [
      'Las terminaciones de los pretéritos fuertes NO llevan tilde.',
      '"Hacer" cambia c→z en la tercera persona: hizo (no ~~hico~~).',
      '"Decir" y verbos en -ducir tienen j en toda la conjugación: dijo, condujo.',
      'Ir y ser son idénticos en indefinido; el contexto indica el significado.',
    ],
    examples: [
      {
        english: 'Ayer no tuve tiempo para llamarte.',
        translation: "Yesterday I didn't have time to call you.",
      },
      {
        english: '¿Qué hiciste el fin de semana?',
        translation: 'What did you do on the weekend?',
      },
      {
        english: 'Fui al médico y luego fui muy feliz.',
        translation: 'I went to the doctor and then I was very happy.',
        note: 'ir y ser',
      },
      {
        english: 'Ellos no quisieron venir a la cena.',
        translation: "They didn't want to come to the dinner.",
      },
    ],
    common_mistakes: [
      {
        wrong: 'Ayer hice la comida.',
        correct: 'Ayer hice la comida.',
        note: 'Correcto. "Hice" es la forma correcta de hacer en indefinido para yo.',
      },
      {
        wrong: 'Él hico la maleta.',
        correct: 'Él hizo la maleta.',
        note: 'La tercera persona de hacer es "hizo", con z, no con c.',
      },
    ],
    related: [
      'preterito-indefinido-regular',
      'marcadores-temporales',
      'preterito-vs-imperfecto',
    ],
  },
  {
    slug: 'imperfecto',
    title: 'Pretérito imperfecto',
    level: 'A2',
    category: 'Tiempos Verbales',
    summary:
      'Describir hábitos pasados, escenas y acciones en desarrollo en el pasado.',
    structure:
      'raíz + -aba/-abas/-aba/-ábamos/-abais/-aban (AR) · -ía/-ías/-ía/-íamos/-íais/-ían (ER/IR)',
    explanation:
      'El **pretérito imperfecto** describe acciones pasadas **no terminadas**, habituales o que servían de trasfondo a otros eventos. Solo hay **tres verbos irregulares**: *ir, ser, ver*.\n\n| Persona | -ar (hablar) | -er (comer) | -ir (vivir) |\n|--------|-------------|-------------|-------------|\n| yo | hablaba | comía | vivía |\n| tú | hablabas | comías | vivías |\n| él/ella/ud. | hablaba | comía | vivía |\n| nosotros | hablábamos | comíamos | vivíamos |\n| vosotros | hablabais | comíais | vivíais |\n| ellos/ellas/uds. | hablaban | comían | vivían |\n\nIrregulares: *ir → iba, ser → era, ver → veía*.\n\nUsos:\n- **Hábitos pasados**: *De pequeño jugaba al fútbol cada día.*\n- **Descripciones en el pasado**: *Era una noche oscura. Llovía.*\n- **Acciones en desarrollo**: *Mientras cocinaba, sonó el teléfono.*',
    rules: [
      'El imperfecto de -er e -ir es idéntico.',
      'Indica acciones no terminadas, habituales o de fondo en el pasado.',
      'Solo tres verbos irregulares: ir, ser y ver.',
      'Se usa para describir circunstancias que rodean una acción puntual (en indefinido).',
    ],
    examples: [
      {
        english: 'Cuando era pequeño, vivía en un pueblo.',
        translation: 'When I was little, I lived in a village.',
      },
      {
        english: 'Antes íbamos a la playa todos los veranos.',
        translation: 'Before, we used to go to the beach every summer.',
      },
      {
        english: 'Ella leía mientras yo cocinaba.',
        translation: 'She was reading while I was cooking.',
      },
      {
        english: 'Hacía frío y llovía sin parar.',
        translation: 'It was cold and it was raining nonstop.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Cuando era pequeño, jugué al fútbol cada día.',
        correct: 'Cuando era pequeño, jugaba al fútbol cada día.',
        note: 'Los hábitos pasados requieren imperfecto, no indefinido.',
      },
      {
        wrong: 'Ayer iba al cine.',
        correct: 'Ayer fui al cine.',
        note: 'Con "ayer" y una acción concreta se usa indefinido, no imperfecto.',
      },
    ],
    related: ['preterito-vs-imperfecto', 'solia', 'marcadores-temporales'],
  },
  {
    slug: 'preterito-vs-imperfecto',
    title: 'Contraste: pretérito indefinido vs. imperfecto',
    level: 'A2',
    category: 'Tiempos Verbales',
    summary:
      'Cuándo usar cada pasado: acción puntual vs. descripción o hábito.',
    explanation:
      'La elección entre **pretérito indefinido** e **imperfecto** es uno de los mayores desafíos del español. La clave está en **cómo se presenta la acción**:\n\n**Pretérito indefinido**: acción completa, puntual, que "avanza la historia".\n- *A las ocho llegué a casa, cené y me acosté.*\n\n**Pretérito imperfecto**: contexto, descripción, hábito o acción en desarrollo.\n- *Eran las ocho. Llovía. Estaba cansado.*\n\n**Combinados**: el imperfecto describe la escena (fondo) y el indefinido cuenta lo que pasó (acción principal):\n- *Mientras **paseaba** (imperfecto), **vi** (indefinido) a un amigo.*\n\nCon verbos de estado (saber, creer, querer) el indefinido implica cambio: *Supe la verdad* (me enteré) vs. *Sabía la verdad* (ya la sabía).',
    rules: [
      'Imperfecto = descripción, hábito, acción de fondo, "escenario".',
      'Indefinido = acción concreta, terminada, que hace avanzar la narración.',
      'Imperfecto con "mientras" cuando dos acciones son simultáneas y durativas.',
      'Con verbos de estado el indefinido implica cambio de estado: supe = me enteré.',
    ],
    examples: [
      {
        english: 'Estudiaba cuando me llamaste.',
        translation: 'I was studying when you called me.',
      },
      {
        english: 'De joven, salía todos los viernes.',
        translation: 'When young, I used to go out every Friday.',
      },
      {
        english: 'El verano pasado fui a Italia y visité Roma.',
        translation: 'Last summer I went to Italy and visited Rome.',
      },
      {
        english:
          'Hacía sol y los pájaros cantaban. De repente, empezó a llover.',
        translation:
          'It was sunny and the birds were singing. Suddenly, it started to rain.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Mientras cociné, sonó el teléfono.',
        correct: 'Mientras cocinaba, sonó el teléfono.',
        note: '"Mientras + acción de fondo" pide imperfecto.',
      },
      {
        wrong: 'Ayer estaba en casa todo el día.',
        correct: 'Ayer estuve en casa todo el día.',
        note: 'Con "ayer" y periodo definido se usa indefinido.',
      },
    ],
    related: [
      'imperfecto',
      'preterito-indefinido-regular',
      'solia',
      'marcadores-temporales',
    ],
  },
  {
    slug: 'solia',
    title: 'Soler + infinitivo',
    level: 'A2',
    category: 'Tiempos Verbales',
    summary:
      'Expresar acciones habituales en pasado y presente con el verbo soler.',
    structure: 'soler (conjugado) + infinitivo',
    explanation:
      'El verbo **soler** (cambio o→ue) significa "tener la costumbre de" y se usa para expresar **acciones habituales** tanto en presente como en pasado.\n\nEn **presente**: *Suelo desayunar a las ocho.* (I usually have breakfast at eight.)\nEn **imperfecto**: *Solía jugar al tenis.* (I used to play tennis.)\n\n**Solía + infinitivo** es equivalente a *used to* en inglés. Es una alternativa al imperfecto simple para enfatizar hábitos pasados.\n\nEl verbo soler **no existe en indefinido** (~~solí~~) ni en otros tiempos más que presente e imperfecto de indicativo.',
    rules: [
      'Soler solo se usa en presente e imperfecto de indicativo.',
      'Siempre va seguido de infinitivo: "Suelo comer a las dos".',
      '"Soler + infinitivo" expresa frecuencia habitual, no capacidad.',
      'No confundir "solía" (hábito) con "solo/a" (alone).',
    ],
    examples: [
      {
        english: 'Suelo leer antes de dormir.',
        translation: 'I usually read before sleeping.',
      },
      {
        english: 'De niño, solía pasar los veranos en el pueblo.',
        translation: 'As a child, I used to spend summers in the village.',
      },
      {
        english: '¿Sueles hacer ejercicio?',
        translation: 'Do you usually exercise?',
      },
      {
        english: 'Antes no solíamos viajar tanto.',
        translation: "Before we didn't use to travel so much.",
      },
    ],
    common_mistakes: [
      {
        wrong: 'Solí ir al parque.',
        correct: 'Solía ir al parque.',
        note: '"Soler" no tiene forma de indefinido. Se usa el imperfecto "solía".',
      },
      {
        wrong: 'Suelo a comer a las dos.',
        correct: 'Suelo comer a las dos.',
        note: 'Soler rige infinitivo sin preposición.',
      },
    ],
    related: ['imperfecto', 'preterito-vs-imperfecto', 'marcadores-temporales'],
  },
  {
    slug: 'pronombres-objeto-directo',
    title: 'Pronombres de objeto directo',
    level: 'A2',
    category: 'Pronombres',
    summary:
      'me, te, lo, la, nos, os, los, las — sustituir el complemento directo.',
    structure:
      'pronombre OD + verbo conjugado · infinitivo/gerundio + pronombre OD',
    explanation:
      'Los **pronombres de objeto directo** sustituyen al complemento que recibe directamente la acción del verbo. Responden a *¿qué?* o *¿a quién?*.\n\n| Persona | Pronombre OD |\n|---------|-------------|\n| yo | me |\n| tú | te |\n| él/usted (masc.) | lo |\n| ella/usted (fem.) | la |\n| nosotros/as | nos |\n| vosotros/as | os |\n| ellos/ustedes (masc.) | los |\n| ellas/ustedes (fem.) | las |\n\nSe colocan **delante del verbo conjugado**: *Lo compré ayer.*\nCon **infinitivo o gerundio** pueden ir detrás soldados a la palabra: *Voy a comprarlo. / Estoy comprándolo.*',
    rules: [
      'Concuerdan en género y número con el sustantivo que sustituyen.',
      'Delante del verbo conjugado; detrás soldados al infinitivo o gerundio.',
      '"Lo" se usa también para ideas o frases enteras: "No lo sé".',
      'En España hay tendencia al leísmo de persona, pero lo normativo es "lo" para OD masculino.',
    ],
    examples: [
      {
        english: '¿El libro? Lo leí ayer.',
        translation: 'The book? I read it yesterday.',
      },
      {
        english: 'A María la vi en el supermercado.',
        translation: 'María? I saw her at the supermarket.',
      },
      { english: 'No puedo encontrarlo.', translation: "I can't find it." },
      {
        english: 'Estamos preparándola para la fiesta.',
        translation: 'We are preparing it for the party.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Lo vi a María.',
        correct: 'La vi. / Vi a María.',
        note: 'Si el OD es femenino, el pronombre debe ser "la".',
      },
      {
        wrong: '¿Las flores? Le compré ayer.',
        correct: '¿Las flores? Las compré ayer.',
        note: 'OD femenino plural → "las", no "le".',
      },
    ],
    related: [
      'pronombres-objeto-indirecto',
      'doble-objeto',
      'imperativo-afirmativo',
    ],
  },
  {
    slug: 'pronombres-objeto-indirecto',
    title: 'Pronombres de objeto indirecto',
    level: 'A2',
    category: 'Pronombres',
    summary:
      'me, te, le, nos, os, les — sustituir el complemento indirecto (a quién).',
    structure: 'pronombre OI + verbo conjugado',
    explanation:
      'Los **pronombres de objeto indirecto** sustituyen a la persona o entidad que recibe el beneficio o daño de la acción. Responden a *¿a quién?* o *¿para quién?*.\n\n| Persona | Pronombre OI |\n|---------|-------------|\n| yo | me |\n| tú | te |\n| él/ella/usted | le |\n| nosotros/as | nos |\n| vosotros/as | os |\n| ellos/ellas/ustedes | les |\n\nA diferencia del OD, el OI **no distingue género**: *le* sirve para masculino y femenino singular; *les* para plural.\n\nSe colocan igual que los OD: delante del verbo conjugado o detrás del infinitivo/gerundio. La duplicación del OI es frecuente: *Le di el libro a Juan.*',
    rules: [
      'No distinguen género: le/les para masculino y femenino.',
      'Se suele duplicar el OI con "a + persona" para aclarar: "Le dije a María".',
      'Colocación: delante del verbo conjugado o soldado al infinitivo/gerundio.',
      'Con verbos como gustar, encantar, doler, el sujeto va después y el OI va delante.',
    ],
    examples: [
      {
        english: 'Le escribí una carta a mi abuela.',
        translation: 'I wrote a letter to my grandmother.',
      },
      {
        english: '¿Me puedes prestar tu boli?',
        translation: 'Can you lend me your pen?',
      },
      {
        english: 'Les explicamos la situación a los clientes.',
        translation: 'We explained the situation to the clients.',
      },
      {
        english: 'Voy a darle el regalo mañana.',
        translation: 'I am going to give him/her the present tomorrow.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'La di el libro a María.',
        correct: 'Le di el libro a María.',
        note: 'El OI es "le" (invariable en género), no "la".',
      },
      {
        wrong: 'Dí a Juan la noticia.',
        correct: 'Le di la noticia a Juan.',
        note: 'El OI debe aparecer con el pronombre, especialmente si se menciona la persona.',
      },
    ],
    related: ['pronombres-objeto-directo', 'doble-objeto', 'gustar'],
  },
  {
    slug: 'doble-objeto',
    title: 'Combinación de pronombres OD y OI',
    level: 'A2',
    category: 'Pronombres',
    summary: 'Usar juntos los pronombres de OD y OI: se lo, me lo, te la...',
    structure: 'OI + OD + verbo · se + lo/la/los/las (cuando OI es le/les)',
    explanation:
      'Cuando en una misma oración aparecen pronombres de **objeto indirecto y objeto directo**, el OI va **siempre antes** del OD.\n\nLa regla más importante: cuando el OI es **le o les** y va seguido de un OD de tercera persona (**lo, la, los, las**), el OI se transforma en **se**:\n- *Le di el libro.* → *Se lo di.* (NO ~~Le lo di~~)\n- *Les mandé las cartas.* → *Se las mandé.*\n\nOrden: **OI + OD + verbo**.\n\nCon infinitivo o gerundio, ambos se colocan detrás: *Voy a decírtelo. / Estoy explicándoselo.*\n\nLa duplicación del OI es posible y frecuente: "Se lo di a ella".',
    rules: [
      'El OI siempre precede al OD.',
      'le/les + lo/la/los/las → se + lo/la/los/las.',
      'Con ambos pronombres al final del infinitivo/gerundio, se acentúa la palabra.',
      'La duplicación del OI es posible: "Se lo di a ella".',
    ],
    examples: [
      {
        english: '¿El informe? Te lo envío ahora.',
        translation: "The report? I'll send it to you now.",
      },
      {
        english: 'Se lo expliqué a mis padres.',
        translation: 'I explained it to my parents.',
      },
      {
        english: '¿Me lo puedes repetir?',
        translation: 'Can you repeat it to me?',
      },
      {
        english: 'No quiero contárselo todavía.',
        translation: "I don't want to tell it to him/her/them yet.",
      },
    ],
    common_mistakes: [
      {
        wrong: 'Le lo dije.',
        correct: 'Se lo dije.',
        note: 'La combinación "le lo" no existe; se convierte en "se lo".',
      },
      {
        wrong: 'Lo se di.',
        correct: 'Se lo di.',
        note: 'El OI (se) debe ir antes del OD (lo).',
      },
    ],
    related: [
      'pronombres-objeto-directo',
      'pronombres-objeto-indirecto',
      'imperativo-afirmativo',
    ],
  },
  {
    slug: 'comparativos',
    title: 'Comparativos',
    level: 'A2',
    category: 'Adjetivos y Adverbios',
    summary:
      'Comparar personas, objetos y acciones: más... que, menos... que, tan... como.',
    structure:
      'más + adjetivo/sustantivo/adverbio + que · menos + ... + que · tan + adjetivo + como',
    explanation:
      'En español hay tres tipos de **comparación**:\n\n**Comparativo de superioridad**: *más + adjetivo/sustantivo/adverbio + que*\n- *Ella es más alta que yo. / Tengo más trabajo que antes.*\n\n**Comparativo de inferioridad**: *menos + adjetivo/sustantivo/adverbio + que*\n- *Este coche es menos caro que aquel.*\n\n**Comparativo de igualdad**: *tan + adjetivo/adverbio + como* / *tanto/a/os/as + sustantivo + como*\n- *Es tan inteligente como su hermano. / Tengo tantos libros como tú.*\n\n**Comparativos irregulares**:\n- bueno → mejor · malo → peor · grande → mayor · pequeño → menor\n- *Mejor/peor que*, nunca ~~más mejor~~.',
    rules: [
      '"Más/menos + adjetivo + que" para superioridad e inferioridad.',
      '"Tan + adjetivo + como" para igualdad con adjetivos; "tanto/a/os/as + sustantivo + como" con sustantivos.',
      'Los comparativos irregulares no usan "más": mejor, peor, mayor, menor.',
      'Con números se usa "más de": "Más de cien personas".',
    ],
    examples: [
      {
        english: 'Madrid es más grande que Barcelona.',
        translation: 'Madrid is bigger than Barcelona.',
      },
      {
        english: 'Este ejercicio es menos difícil que el anterior.',
        translation: 'This exercise is less difficult than the previous one.',
      },
      {
        english: 'Ella es tan simpática como su hermana.',
        translation: 'She is as nice as her sister.',
      },
      {
        english: 'Esta película es mejor que la otra.',
        translation: 'This film is better than the other one.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Es más mejor que el otro.',
        correct: 'Es mejor que el otro.',
        note: '"Mejor" ya es comparativo; no necesita "más".',
      },
      {
        wrong: 'Es tan alto que su padre.',
        correct: 'Es tan alto como su padre.',
        note: 'Las comparaciones de igualdad usan "tan... como", no "tan... que".',
      },
    ],
    related: ['superlativos', 'tan-como', 'adjetivos-descriptivos'],
  },
  {
    slug: 'superlativos',
    title: 'Superlativos',
    level: 'A2',
    category: 'Adjetivos y Adverbios',
    summary:
      'Expresar el grado máximo de una cualidad: el más..., el mejor, -ísimo.',
    structure:
      'el/la/los/las + más/menos + adjetivo + de · adjetivo + -ísimo/a/os/as',
    explanation:
      'El **superlativo** expresa el grado máximo de una cualidad. Hay dos formas:\n\n**Superlativo relativo**: destaca un elemento dentro de un grupo.\n- *el/la/los/las + más/menos + adjetivo + de*: *Es la más inteligente de la clase.*\n\n**Superlativo absoluto**: expresa un grado muy alto sin comparar.\n- *muy + adjetivo*: *Es muy bueno.*\n- *adjetivo + -ísimo/a*: *Es buenísimo. / Es facilísimo.*\n\nIrregulares:\n- bueno → óptimo / buenísimo\n- malo → pésimo / malísimo\n- grande → máximo / grandísimo\n- pequeño → mínimo / pequeñísimo\n\nCambios ortográficos al añadir -ísimo: largo → larguísimo, feliz → felicísimo, rico → riquísimo.',
    rules: [
      'Superlativo relativo: "el más + adjetivo + de".',
      'Superlativo absoluto: "-ísimo/a/os/as" o "muy + adjetivo".',
      'Los adjetivos en -ble forman -bilísimo: amable → amabilísimo.',
      'Los terminados en -co/-go cambian a -qu/-gu: rico → riquísimo, largo → larguísimo.',
    ],
    examples: [
      {
        english: 'Es el edificio más alto del mundo.',
        translation: "It's the tallest building in the world.",
      },
      {
        english: 'La paella está buenísima.',
        translation: 'The paella is absolutely delicious.',
      },
      {
        english: 'Es la persona menos puntual de la oficina.',
        translation: 'He/she is the least punctual person in the office.',
      },
      {
        english: 'El examen fue facilísimo.',
        translation: 'The exam was extremely easy.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Es el más mejor de todos.',
        correct: 'Es el mejor de todos.',
        note: '"Mejor" ya es la forma superlativa de "bueno" para el relativo.',
      },
      {
        wrong: 'Es el más bueno.',
        correct: 'Es el mejor.',
        note: '"Bueno" tiene comparativo/superlativo irregular: mejor, el mejor.',
      },
    ],
    related: ['comparativos', 'tan-como', 'adjetivos-descriptivos'],
  },
  {
    slug: 'tan-como',
    title: 'Tan y tanto... como',
    level: 'A2',
    category: 'Adjetivos y Adverbios',
    summary:
      'Expresar igualdad: tan + adjetivo + como; tanto/a/os/as + sustantivo + como.',
    structure:
      'tan + adjetivo/adverbio + como · tanto/a/os/as + sustantivo + como · verbo + tanto como',
    explanation:
      '**Tan** y **tanto** expresan **igualdad** en la comparación. La forma correcta depende de qué se compara:\n\n- **Tan + adjetivo + como**: *Eres tan alto como tu hermano.*\n- **Tan + adverbio + como**: *Corre tan rápido como un profesional.*\n- **Tanto/a/os/as + sustantivo + como**: concuerda en género y número. *Tengo tanto dinero como tú. / Hay tantas chicas como chicos.*\n- **Verbo + tanto como**: *Estudio tanto como puedo.*\n\nEn oraciones consecutivas se usa **tan/tanto... que**: *Es tan gracioso que todos se ríen. / Habla tanto que me cansa.*',
    rules: [
      '"Tan" es invariable: siempre igual, con adjetivos y adverbios.',
      '"Tanto" concuerda en género y número con el sustantivo.',
      '"Tanto como" con verbos (invariable).',
      '"Tan... que" y "tanto... que" para consecuencias, no comparación.',
    ],
    examples: [
      {
        english: 'No soy tan paciente como tú.',
        translation: "I'm not as patient as you.",
      },
      {
        english:
          'En esta ciudad hay tanta contaminación como en otras capitales.',
        translation:
          'In this city there is as much pollution as in other capitals.',
      },
      {
        english: 'No hablo español tan bien como me gustaría.',
        translation: "I don't speak Spanish as well as I'd like.",
      },
      {
        english: 'Estaba tan cansado que me dormí en el sofá.',
        translation: 'I was so tired that I fell asleep on the sofa.',
        note: 'consecutivo',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Tengo tan dinero como tú.',
        correct: 'Tengo tanto dinero como tú.',
        note: 'Con sustantivos se usa "tanto/a/os/as", no "tan".',
      },
      {
        wrong: 'Es tanto amable como su madre.',
        correct: 'Es tan amable como su madre.',
        note: 'Con adjetivos se usa "tan", no "tanto".',
      },
    ],
    related: ['comparativos', 'superlativos', 'muy-mucho'],
  },
  {
    slug: 'imperativo-afirmativo',
    title: 'Imperativo afirmativo',
    level: 'A2',
    category: 'Verbos',
    summary:
      'Dar órdenes, instrucciones y consejos con el imperativo afirmativo.',
    structure:
      'tú: 3ª pers. sing. presente · usted: 3ª pers. sing. subjuntivo · vosotros: infinitivo -r + d',
    explanation:
      'El **imperativo afirmativo** se usa para dar órdenes, instrucciones, consejos o hacer invitaciones. Tiene formas propias para **tú** y **vosotros**; las formas de **usted** y **ustedes** se toman del **presente de subjuntivo**.\n\n**Formación regular**:\n\n| | -ar (hablar) | -er (comer) | -ir (escribir) |\n|---|-------------|-------------|---------------|\n| tú | habla | come | escribe |\n| usted | hable | coma | escriba |\n| vosotros | hablad | comed | escribid |\n| ustedes | hablen | coman | escriban |\n\nEl imperativo de **tú** afirmativo coincide con la tercera persona singular del presente de indicativo: *él habla → ¡habla tú!*\nEl de **vosotros** se forma sustituyendo la -r del infinitivo por -d: *hablar → hablad*.\n\nLos pronombres van **detrás y soldados**: *cómpralo, siéntate, dime, dáselo*.\nEl imperativo de vosotros pierde la -d ante "os": *sentad + os → sentaos*.',
    rules: [
      'Tú afirmativo: como la 3ª persona singular del presente (habla, come, escribe).',
      'Vosotros afirmativo: cambiar -r del infinitivo por -d (hablad, comed, escribid).',
      'Usted/ustedes: igual que el presente de subjuntivo.',
      'Los pronombres van detrás: "dime", "cómpralo", "siéntate".',
    ],
    examples: [
      { english: '¡Come más despacio!', translation: 'Eat more slowly!' },
      {
        english: 'Hablad más bajo, por favor.',
        translation: 'Speak more quietly, please.',
        note: 'vosotros',
      },
      { english: 'Dime la verdad.', translation: 'Tell me the truth.' },
      {
        english: 'Siéntese, por favor.',
        translation: 'Sit down, please.',
        note: 'usted',
      },
    ],
    common_mistakes: [
      {
        wrong: '¡Comes más despacio!',
        correct: '¡Come más despacio!',
        note: 'El imperativo de tú es "come", no "comes".',
      },
      {
        wrong: 'Sentaros aquí.',
        correct: 'Sentaos aquí.',
        note: 'El imperativo de vosotros pierde la -d delante de "os": sentad + os → sentaos.',
      },
    ],
    related: [
      'imperativo-negativo',
      'imperativo-irregular',
      'pronombres-objeto-directo',
    ],
  },
  {
    slug: 'imperativo-negativo',
    title: 'Imperativo negativo',
    level: 'A2',
    category: 'Verbos',
    summary: 'Prohibir o desaconsejar con el imperativo negativo.',
    structure: 'no + presente de subjuntivo',
    explanation:
      'El **imperativo negativo** usa siempre las formas del **presente de subjuntivo**, para todas las personas, incluido tú y vosotros.\n\n| Persona | -ar (hablar) | -er (comer) | -ir (escribir) |\n|--------|-------------|-------------|---------------|\n| tú | no hables | no comas | no escribas |\n| usted | no hable | no coma | no escriba |\n| vosotros | no habléis | no comáis | no escribáis |\n| ustedes | no hablen | no coman | no escriban |\n\nLos pronombres en el imperativo negativo van **delante del verbo** (a diferencia del afirmativo):\n- *Cómpralo. → No lo compres.*\n- *Siéntate. → No te sientes.*',
    rules: [
      'El imperativo negativo usa siempre el presente de subjuntivo.',
      'Los pronombres van delante del verbo en el negativo: "No lo hagas".',
      '"No + subjuntivo" reemplaza completamente al imperativo afirmativo para prohibiciones.',
      'La forma de vosotros negativo termina en -éis (AR) o -áis (ER/IR): no habléis, no comáis.',
    ],
    examples: [
      { english: 'No hables tan alto.', translation: "Don't speak so loudly." },
      {
        english: 'No comáis tantos dulces.',
        translation: "Don't eat so many sweets.",
        note: 'vosotros',
      },
      {
        english: 'Por favor, no se preocupe.',
        translation: "Please, don't worry.",
        note: 'usted',
      },
      {
        english: 'No lo toques, está caliente.',
        translation: "Don't touch it, it's hot.",
      },
    ],
    common_mistakes: [
      {
        wrong: 'No habla tan alto.',
        correct: 'No hables tan alto.',
        note: 'El imperativo negativo de tú es "no hables", no "no habla".',
      },
      {
        wrong: 'No sentaros aquí.',
        correct: 'No os sentéis aquí.',
        note: 'En el negativo los pronombres van delante: "no os sentéis".',
      },
    ],
    related: [
      'imperativo-afirmativo',
      'imperativo-irregular',
      'subjuntivo-presente',
    ],
  },
  {
    slug: 'imperativo-irregular',
    title: 'Imperativo irregular',
    level: 'A2',
    category: 'Verbos',
    summary:
      'Los imperativos irregulares de tú: ven, di, sal, haz, ten, ve, pon, sé.',
    structure: 'ocho formas irregulares de tú',
    explanation:
      'El imperativo afirmativo de **tú** tiene **ocho formas irregulares** muy frecuentes:\n\n| Infinitivo | Imperativo tú |\n|-----------|--------------|\n| decir | **di** |\n| hacer | **haz** |\n| ir | **ve** |\n| poner | **pon** |\n| salir | **sal** |\n| ser | **sé** |\n| tener | **ten** |\n| venir | **ven** |\n\nEstas formas irregulares mantienen los pronombres soldados detrás: *dime, hazlo, ponte, vete, tenlo, ven aquí*.\n\nPara **vosotros**, el imperativo es siempre regular (salvo ir → id).\n\nEl imperativo negativo usa el subjuntivo y sigue las irregularidades del presente de subjuntivo: *no digas, no hagas, no vayas, no pongas...*',
    rules: [
      'Solo ocho verbos tienen imperativo de tú irregular.',
      'Las formas de vosotros son siempre regulares (infinitivo -r + d).',
      'Los imperativos irregulares de tú se memorizan: "di, haz, ve, pon, sal, sé, ten, ven".',
      'El imperativo negativo irregular sigue el subjuntivo.',
    ],
    examples: [
      { english: 'Di la verdad.', translation: 'Tell the truth.' },
      {
        english: 'Haz los deberes ahora.',
        translation: 'Do your homework now.',
      },
      { english: 'Ten paciencia.', translation: 'Be patient.' },
      {
        english: 'Pon la mesa, por favor.',
        translation: 'Set the table, please.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Hace los deberes.',
        correct: 'Haz los deberes.',
        note: 'El imperativo de hacer es "haz". "Hace" es presente de indicativo.',
      },
      {
        wrong: 'Pone la mesa.',
        correct: 'Pon la mesa.',
        note: 'El imperativo de poner es "pon". "Pone" es presente de indicativo.',
      },
    ],
    related: [
      'imperativo-afirmativo',
      'imperativo-negativo',
      'presente-regular',
    ],
  },
  {
    slug: 'futuro-simple',
    title: 'Futuro simple',
    level: 'A2',
    category: 'Tiempos Verbales',
    summary: 'Hablar de acciones futuras: hablaré, comerás, vivirán.',
    structure: 'infinitivo completo + -é/-ás/-á/-emos/-éis/-án',
    explanation:
      'El **futuro simple** se forma añadiendo las terminaciones al **infinitivo completo** (sin quitar -ar/-er/-ir). Es igual para las tres conjugaciones.\n\n| Persona | -ar (hablar) | -er (comer) | -ir (vivir) |\n|--------|-------------|-------------|------------|\n| yo | hablaré | comeré | viviré |\n| tú | hablarás | comerás | vivirás |\n| él/ella/usted | hablará | comerá | vivirá |\n| nosotros | hablaremos | comeremos | viviremos |\n| vosotros | hablaréis | comeréis | viviréis |\n| ellos/ellas/uds. | hablarán | comerán | vivirán |\n\n**Irregulares**: modifican la raíz pero mantienen las mismas terminaciones:\n- decir → dir- · hacer → har- · querer → querr- · poder → podr- · saber → sabr- · salir → saldr- · tener → tendr- · venir → vendr- · poner → pondr- · valer → valdr- · haber → habr- · caber → cabr-\n\nSe usa también para expresar **probabilidad o conjetura** en el presente: *Serán las tres* (probablemente son las tres).',
    rules: [
      'Las terminaciones se añaden al infinitivo completo; igual para -ar, -er, -ir.',
      'Todas las formas llevan tilde menos "nosotros" (no lleva tilde: hablaremos).',
      'Los irregulares cambian la raíz pero mantienen las mismas terminaciones.',
      'También expresa conjetura: "Estará enfermo" = probablemente está enfermo.',
    ],
    examples: [
      {
        english: 'El año que viene estudiaré en Granada.',
        translation: 'Next year I will study in Granada.',
      },
      {
        english: '¿Vendrás a la boda?',
        translation: 'Will you come to the wedding?',
      },
      {
        english: 'No podremos llegar a tiempo.',
        translation: "We won't be able to arrive on time.",
      },
      {
        english: '¿Dónde estará Juan? — Estará en casa.',
        translation: "Where could Juan be? — He's probably at home.",
        note: 'conjetura',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Mañana voy a viajaré.',
        correct: 'Mañana viajaré. / Mañana voy a viajar.',
        note: 'No mezclar "ir a" con el futuro simple; se usa uno u otro.',
      },
    ],
    related: ['ir-a-futuro', 'condicional-simple', 'si-presente-futuro'],
  },
  {
    slug: 'condicional-simple',
    title: 'Condicional simple',
    level: 'A2',
    category: 'Condicionales',
    summary:
      'Expresar deseos, cortesía, probabilidad en el pasado y situaciones hipotéticas.',
    structure: 'infinitivo completo + -ía/-ías/-ía/-íamos/-íais/-ían',
    explanation:
      'El **condicional simple** se forma añadiendo terminaciones al **infinitivo completo**. Los mismos verbos que son irregulares en futuro lo son en condicional.\n\n| Persona | -ar (hablar) | -er (comer) | -ir (vivir) |\n|--------|-------------|-------------|------------|\n| yo | hablaría | comería | viviría |\n| tú | hablarías | comerías | vivirías |\n| él/ella/ud. | hablaría | comería | viviría |\n| nosotros | hablaríamos | comeríamos | viviríamos |\n| vosotros | hablaríais | comeríais | viviríais |\n| ellos/ellas/uds. | hablarían | comerían | vivirían |\n\nUsos:\n- **Deseo**: *Me gustaría viajar a Japón.*\n- **Cortesía**: *¿Podría ayudarme?*\n- **Consejo**: *Deberías estudiar más.*\n- **Probabilidad en el pasado**: *Serían las tres cuando llegó.*\n- **Futuro del pasado**: *Dijo que vendría.*',
    rules: [
      'Terminaciones sobre el infinitivo completo. Siempre llevan tilde.',
      'Mismos irregulares que el futuro: diría, haría, querría, podría, sabría, saldría, tendría, vendría, pondría, valdría, habría, cabría.',
      '"Debería" + infinitivo para consejos; "me gustaría" para deseos corteses.',
      'No se usa "si" con condicional simple en la prótasis.',
    ],
    examples: [
      {
        english: 'Me gustaría aprender a tocar la guitarra.',
        translation: 'I would like to learn to play the guitar.',
      },
      {
        english: '¿Podrías pasarme la sal?',
        translation: 'Could you pass me the salt?',
      },
      {
        english: 'Deberías dormir más horas.',
        translation: 'You should sleep more hours.',
      },
      {
        english: 'Dijo que llegaría a las ocho.',
        translation: 'He said he would arrive at eight.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Si tendría dinero, viajaría.',
        correct: 'Si tuviera dinero, viajaría.',
        note: 'En las oraciones condicionales con "si", el condicional no va en la prótasis.',
      },
      {
        wrong: '¿Puederías ayudarme?',
        correct: '¿Podrías ayudarme?',
        note: 'El condicional de poder es "podrías", con -dr-.',
      },
    ],
    related: ['futuro-simple', 'si-presente-futuro', 'subjuntivo-presente'],
  },
  {
    slug: 'si-presente-futuro',
    title: 'Oraciones condicionales: si + presente + futuro',
    level: 'A2',
    category: 'Condicionales',
    summary:
      'Condiciones reales o probables con si + presente de indicativo + futuro.',
    structure:
      'si + presente de indicativo + futuro simple / presente / imperativo',
    explanation:
      'Las **condicionales de primer tipo** expresan condiciones **posibles o probables**. La estructura es:\n\n**Si + presente de indicativo, + futuro / presente / imperativo.**\n\n- *Si **estudias**, **aprobarás** el examen.* (condición probable → resultado futuro)\n- *Si **quieres**, te **ayudo**.* (presente en ambas partes)\n- *Si **tienes** hambre, **come** algo.* (imperativo en la principal)\n\nLa prótasis (la parte con "si") NUNCA lleva futuro ni condicional en español. Esto es diferente del inglés:\n- *If it rains → Si llueve* (NO ~~Si lloverá~~).',
    rules: [
      'En la subordinada con "si" se usa presente de indicativo, nunca futuro ni condicional.',
      'La oración principal puede ir en futuro, presente o imperativo.',
      'El orden puede invertirse: "Te ayudo si quieres". En ese caso no hay coma.',
      'Se usa para condiciones realistas, no hipotéticas ni irreales.',
    ],
    examples: [
      {
        english: 'Si llueve, no saldremos.',
        translation: "If it rains, we won't go out.",
      },
      {
        english: 'Si tienes tiempo, llámame.',
        translation: 'If you have time, call me.',
      },
      {
        english: 'Te lo compro si no es muy caro.',
        translation: "I'll buy it for you if it isn't very expensive.",
      },
      {
        english: 'Si quieres, vamos al cine.',
        translation: "If you want, let's go to the cinema.",
      },
    ],
    common_mistakes: [
      {
        wrong: 'Si lloverá, no salgo.',
        correct: 'Si llueve, no saldré.',
        note: 'Después de "si" condicional nunca se usa futuro.',
      },
      {
        wrong: 'Si tendrás tiempo, llámame.',
        correct: 'Si tienes tiempo, llámame.',
        note: '"Si" no admite futuro ni condicional en la prótasis.',
      },
    ],
    related: [
      'futuro-simple',
      'condicional-simple',
      'si-imperfecto-subjuntivo',
    ],
  },
  {
    slug: 'conectores-narrativos',
    title: 'Conectores narrativos',
    level: 'A2',
    category: 'Oraciones',
    summary:
      'Palabras para organizar un relato: primero, luego, entonces, después, al final.',
    explanation:
      'Los **conectores narrativos** ayudan a ordenar cronológicamente los hechos de un relato o una secuencia de acciones en el pasado.\n\n**Secuencia temporal**:\n- *Primero / En primer lugar / Para empezar* → inicio.\n- *Luego / Después / Más tarde / A continuación* → continuación.\n- *Entonces / En ese momento / De repente* → acontecimiento puntual.\n- *Finalmente / Por último / Al final* → conclusión.\n\nEn narraciones en pasado, estos conectores frecuentemente van con **pretérito indefinido** porque introducen acciones que hacen avanzar la historia:\n- *Primero desayuné; después salí de casa; entonces vi a Marta; finalmente llegué al trabajo.*',
    rules: [
      '"Entonces" introduce un acontecimiento puntual o una consecuencia lógica.',
      '"De repente" marca una acción inesperada; suele ir con indefinido.',
      '"Al final" ≠ "finalmente": al final indica un desenlace que puede ser sorprendente; finalmente es neutro.',
      'Los conectores pueden ir al inicio, en medio o precedidos de "y": "y entonces...".',
    ],
    examples: [
      {
        english:
          'Primero fui al banco, luego pasé por el supermercado y finalmente volví a casa.',
        translation:
          'First I went to the bank, then I stopped by the supermarket, and finally I went back home.',
      },
      {
        english: 'Estaba leyendo cuando de repente se apagó la luz.',
        translation: 'I was reading when suddenly the lights went out.',
      },
      {
        english: 'Entonces decidí llamar a la policía.',
        translation: 'Then I decided to call the police.',
      },
      {
        english: 'Al final todo salió bien.',
        translation: 'In the end everything turned out fine.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Después fui a su casa.',
        correct: 'Después fui a su casa.',
        note: 'Correcto. "Después" puede ir seguido del verbo directamente o con "de" + infinitivo.',
      },
    ],
    related: [
      'secuencia-temporal',
      'preterito-indefinido-regular',
      'preterito-vs-imperfecto',
    ],
  },
  {
    slug: 'secuencia-temporal',
    title: 'Secuencia temporal en la narración',
    level: 'A2',
    category: 'Oraciones',
    summary:
      'Coordinar tiempos verbales en una historia: imperfecto de fondo, indefinido de avance.',
    explanation:
      'En una narración en pasado, los tiempos verbales no se eligen al azar. Siguen una **secuencia temporal** que distingue:\n\n**Imperfecto** → descripción del contexto, circunstancias, acciones de fondo:\n  *Era un día soleado. Los pájaros cantaban. Ana paseaba por el parque.*\n\n**Indefinido** → acciones que hacen avanzar la historia:\n  *De repente, vio a un amigo. Se acercó y lo saludó.*\n\n**Pluscuamperfecto** → acción anterior a otra pasada:\n  *Cuando llegué, ya habían cerrado.*\n\nCombinarlos correctamente da fluidez al relato y guía al oyente sobre qué es esencial y qué es contexto.',
    rules: [
      'Imperfecto para el "telón de fondo" (descripciones, circunstancias).',
      'Indefinido para las acciones principales que mueven la trama.',
      'Pluscuamperfecto para lo que ya había ocurrido antes del momento narrado.',
      'Los conectores temporales ayudan a marcar la secuencia.',
    ],
    examples: [
      {
        english:
          'Eran las diez de la noche. Llovía con fuerza. De repente, alguien llamó a la puerta.',
        translation:
          'It was ten at night. It was raining heavily. Suddenly, someone knocked on the door.',
      },
      {
        english: 'Mientras desayunaba, leí el periódico.',
        translation: 'While I was having breakfast, I read the newspaper.',
      },
      {
        english: 'Cuando llegamos al cine, ya había empezado la película.',
        translation:
          'When we arrived at the cinema, the film had already started.',
      },
      {
        english: 'Paseaba por la calle cuando me encontré con un viejo amigo.',
        translation:
          'I was walking down the street when I ran into an old friend.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Era un día soleado. De repente, alguien llamaba a la puerta.',
        correct: 'Era un día soleado. De repente, alguien llamó a la puerta.',
        note: '"De repente" introduce una acción puntual; pide indefinido.',
      },
      {
        wrong: 'Cuando llegué, ya cerraron.',
        correct: 'Cuando llegué, ya habían cerrado.',
        note: 'Acción anterior a otra pasada → pluscuamperfecto.',
      },
    ],
    related: [
      'conectores-narrativos',
      'preterito-vs-imperfecto',
      'pluscuamperfecto',
    ],
  },
  {
    slug: 'estilo-indirecto',
    title: 'Estilo indirecto (presente → pasado)',
    level: 'A2',
    category: 'Estilo Indirecto',
    summary: 'Contar lo que alguien dijo adaptando los tiempos verbales.',
    explanation:
      'El **estilo indirecto** consiste en reproducir lo que alguien ha dicho sin usar una cita textual. Cuando el verbo introductor está en **pasado** (dijo que, comentó que), los tiempos verbales y otras referencias se desplazan hacia el pasado:\n\n| Estilo directo | Estilo indirecto |\n|---------------|-----------------|\n| Presente: "Estoy cansado" | Imperfecto: Dijo que **estaba** cansado |\n| Pret. perfecto: "He comido" | Pluscuamperfecto: Dijo que **había comido** |\n| Indefinido: "Llegué ayer" | Pluscuamperfecto: Dijo que **había llegado** el día anterior |\n| Futuro: "Iré mañana" | Condicional: Dijo que **iría** al día siguiente |\n\nTambién cambian:\n- *hoy → aquel día*\n- *ayer → el día anterior*\n- *mañana → el día siguiente*\n- *aquí → allí*',
    rules: [
      'Con verbo introductor en presente ("dice que"), no hay cambio de tiempos.',
      'Con verbo introductor en pasado ("dijo que"), todos los tiempos retroceden un paso.',
      'Los pronombres y referencias espaciales también se adaptan.',
      '"Que" es obligatorio para introducir la subordinada: "Dijo que vendría".',
    ],
    examples: [
      {
        english: 'Dijo que estaba cansado.',
        translation: 'He said he was tired.',
        note: 'directo: "Estoy cansado"',
      },
      {
        english: 'Me contó que había vivido en París.',
        translation: 'She told me she had lived in Paris.',
        note: 'directo: "He vivido en París"',
      },
      {
        english: 'Aseguró que llegaría al día siguiente.',
        translation: 'He assured me he would arrive the next day.',
        note: 'directo: "Llegaré mañana"',
      },
      {
        english: 'Nos explicaron que no podían ayudarnos.',
        translation: "They explained they couldn't help us.",
      },
    ],
    common_mistakes: [
      {
        wrong: 'Dijo que está cansado.',
        correct: 'Dijo que estaba cansado.',
        note: 'Con "dijo" (pasado), el verbo subordinado debe concordar en pasado.',
      },
      {
        wrong: 'Dijo que vendrá mañana.',
        correct: 'Dijo que vendría al día siguiente.',
        note: 'Futuro → condicional, y "mañana" → "al día siguiente".',
      },
    ],
    related: ['cambios-temporales', 'imperfecto', 'condicional-simple'],
  },
  {
    slug: 'conectores-argumentativos',
    title: 'Conectores argumentativos',
    level: 'A2',
    category: 'Oraciones',
    summary:
      'Conectores para causa, consecuencia y contraste: porque, así que, sin embargo.',
    explanation:
      'Los **conectores argumentativos** unen ideas y permiten expresar relaciones lógicas: causa, consecuencia, oposición.\n\n**Causa**: *porque, ya que, puesto que, debido a que*\n- *No fui a la fiesta **porque** estaba enfermo.*\n- *Ya que has terminado, puedes salir.*\n\n**Consecuencia**: *así que, por eso, por lo tanto, en consecuencia*\n- *Tenía hambre, **así que** me preparé un bocadillo.*\n- *No estudió nada; **por eso** suspendió.*\n\n**Contraste**: *pero, sin embargo, no obstante, aunque, en cambio*\n- *Es caro, **pero** merece la pena.*\n- *Hace frío; **sin embargo**, saldré a correr.*',
    rules: [
      '"Porque" (causa) junto, sin tilde. "Por qué" (interrogativo) separado y con tilde.',
      '"Así que" introduce una consecuencia y se escribe separado.',
      '"Pero" une dos elementos de la misma categoría; "sino" corrige una negación.',
      '"Aunque" puede ir con indicativo (hecho real) o subjuntivo (hipótesis).',
    ],
    examples: [
      {
        english: 'No salí porque llovía mucho.',
        translation: "I didn't go out because it was raining a lot.",
      },
      {
        english: 'Estaba agotado, así que me fui a dormir temprano.',
        translation: 'I was exhausted, so I went to bed early.',
      },
      {
        english: 'Me gusta el chocolate, pero no debo comer tanto.',
        translation: "I like chocolate, but I shouldn't eat so much.",
      },
      {
        english: 'Hizo mucho esfuerzo; sin embargo, no consiguió el puesto.',
        translation:
          "He made a lot of effort; however, he didn't get the position.",
      },
    ],
    common_mistakes: [
      {
        wrong: 'No es caro, pero barato.',
        correct: 'No es caro, sino barato.',
        note: 'Tras una negación, para corregir se usa "sino", no "pero".',
      },
      {
        wrong: 'No vine por que estaba enfermo.',
        correct: 'No vine porque estaba enfermo.',
        note: '"Porque" (causa) se escribe junto y sin tilde.',
      },
    ],
    related: [
      'conectores-narrativos',
      'conectores-avanzados',
      'si-presente-futuro',
    ],
  },
  {
    slug: 'cambios-temporales',
    title: 'Cambios temporales en el estilo indirecto',
    level: 'A2',
    category: 'Estilo Indirecto',
    summary:
      'Cómo cambian las referencias de tiempo y lugar al pasar al estilo indirecto.',
    explanation:
      'Cuando se pasa del **estilo directo al indirecto** con verbo introductor en pasado, no solo cambian los verbos. Las **referencias temporales y espaciales** también se adaptan:\n\n| Referencia directa | Indirecta (pasado) |\n|-------------------|-------------------|\n| hoy | aquel día / ese día |\n| ayer | el día anterior |\n| mañana | el día siguiente / al día siguiente |\n| esta semana | aquella semana |\n| la semana pasada | la semana anterior |\n| la semana que viene | la semana siguiente |\n| ahora | entonces / en aquel momento |\n| aquí / acá | allí / allá |\n| este / esta | aquel / aquella / ese / esa |\n| hace + tiempo | hacía + tiempo |\n\nEjemplo:\n- Directo: *"Mañana voy al médico."*\n- Indirecto (pasado): *Dijo que **al día siguiente** iba al médico.*',
    rules: [
      '"Hoy" → "aquel día" o "ese día".',
      '"Ahora" → "entonces" o "en aquel momento".',
      '"Aquí" → "allí".',
      '"Hace un año" → "hacía un año".',
    ],
    examples: [
      {
        english: 'Me dijo que aquel día no podía quedar.',
        translation: "He told me he couldn't meet that day.",
        note: 'directo: "Hoy no puedo quedar"',
      },
      {
        english: 'Aseguró que la semana anterior había estado de vacaciones.',
        translation: 'He assured me he had been on holiday the previous week.',
      },
      {
        english: 'Comentó que entonces vivía en Barcelona.',
        translation:
          'He commented that he was living in Barcelona at that time.',
      },
      {
        english: 'Explicaron que hacía dos años que no se veían.',
        translation:
          "They explained they hadn't seen each other for two years.",
      },
    ],
    common_mistakes: [
      {
        wrong: 'Dijo que ayer no había podido ir.',
        correct: 'Dijo que el día anterior no había podido ir.',
        note: '"Ayer" se transforma en "el día anterior" al pasar al pasado.',
      },
      {
        wrong: 'Me contó que hoy estaba cansado.',
        correct: 'Me contó que aquel día estaba cansado.',
        note: 'Referencia temporal debe desplazarse al pasado.',
      },
    ],
    related: [
      'estilo-indirecto',
      'estilo-indirecto-pasado',
      'conectores-narrativos',
    ],
  },

  /* ═══ B1 ═══ */

  {
    slug: 'subjuntivo-presente',
    title: 'Presente de subjuntivo',
    level: 'B1',
    category: 'Subjuntivo',
    summary:
      'Formación y usos básicos del presente de subjuntivo: deseo, duda, emoción, negación.',
    structure:
      'raíz de 1ª pers. sing. presente indicativo + vocal opuesta (-ar → -e; -er/-ir → -a)',
    explanation:
      'El **presente de subjuntivo** expresa acciones no factuales: deseos, dudas, emociones, mandatos negativos, opiniones negadas y finalidad. Se forma a partir de la primera persona singular del presente de indicativo, cambiando la **vocal temática**:\n\n| | -ar (hablar) | -er (comer) | -ir (vivir) |\n|---|-------------|-------------|-------------|\n| yo | hable | coma | viva |\n| tú | hables | comas | vivas |\n| él/ella/usted | hable | coma | viva |\n| nosotros | hablemos | comamos | vivamos |\n| vosotros | habléis | comáis | viváis |\n| ellos/ellas/uds. | hablen | coman | vivan |\n\n**Irregulares**: los verbos que son irregulares en la primera persona del presente de indicativo mantienen la irregularidad en el subjuntivo:\n- tener → tengo → tenga, tengas...\n- hacer → hago → haga, hagas...\n- decir → digo → diga, digas...\n- conocer → conozco → conozca, conozcas...\n- salir → salgo → salga, salgas...\n\nLos verbos con cambio vocálico (e→ie, o→ue) tienen el mismo cambio en las formas tónicas, y además en -ir cambian también e→i o o→u en nosotros/vosotros: *dormir → durmamos, pedir → pidamos*.',
    rules: [
      '-ar toma vocal -e; -er/-ir toman vocal -a (principio de "vocal opuesta").',
      'La raíz se toma de la 1ª persona singular del presente de indicativo.',
      'Se usa tras expresiones de deseo, emoción, duda, finalidad y en imperativos negativos.',
      'No se usa subjuntivo tras "creer que / pensar que" en afirmativo, pero sí en negativo.',
    ],
    examples: [
      {
        english: 'Quiero que vengas a mi fiesta.',
        translation: 'I want you to come to my party.',
      },
      {
        english: 'Espero que tengas un buen viaje.',
        translation: 'I hope you have a good trip.',
      },
      {
        english: 'No creo que sea buena idea.',
        translation: "I don't think it's a good idea.",
      },
      {
        english: 'Dudo que llueva hoy.',
        translation: 'I doubt it will rain today.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Quiero que vienes.',
        correct: 'Quiero que vengas.',
        note: 'Con "querer que" se usa subjuntivo, no indicativo.',
      },
      {
        wrong: 'Espero que tienes un buen día.',
        correct: 'Espero que tengas un buen día.',
        note: '"Esperar que" rige subjuntivo.',
      },
    ],
    related: [
      'expresiones-deseo',
      'ojala',
      'subjuntivo-recomendacion',
      'subjuntivo-duda',
      'subjuntivo-valoracion',
    ],
  },
  {
    slug: 'expresiones-deseo',
    title: 'Subjuntivo con expresiones de deseo',
    level: 'B1',
    category: 'Subjuntivo',
    summary:
      'Usar el subjuntivo para expresar deseos: espero que, quiero que, deseo que, necesito que.',
    explanation:
      'Las **expresiones de deseo o voluntad** que proyectan una acción hacia el futuro o expresan un deseo sobre otra persona llevan el verbo subordinado en **subjuntivo**.\n\n**Verbo de voluntad + que + subjuntivo**\n\nVerbos de voluntad más comunes:\n- *querer que, desear que, esperar que, necesitar que, preferir que, exigir que, pedir que, rogar que, recomendar que, sugerir que, prohibir que, permitir que*\n\nCuando el sujeto del verbo de voluntad y del verbo subordinado es **el mismo**, se usa el **infinitivo** (no el subjuntivo):\n- *Quiero ir.* (yo quiero + yo voy) → NO ~~Quiero que yo vaya~~.\n- *Quiero que vayas.* (yo quiero + tú vas) → correcto con subjuntivo.\n\n*Esperar que* en español NO significa "to expect" (que lleva indicativo en su uso de previsión), sino "to hope" y rige subjuntivo.',
    rules: [
      'Verbo de voluntad + que + subjuntivo cuando los sujetos son distintos.',
      'Si el sujeto es el mismo, se usa infinitivo: "Quiero descansar".',
      '"Ojalá" es una expresión de deseo que siempre rige subjuntivo.',
      '"Esperar que" + subjuntivo = "to hope that".',
    ],
    examples: [
      {
        english: 'Espero que te guste el regalo.',
        translation: 'I hope you like the present.',
      },
      {
        english: 'Mis padres quieren que estudie medicina.',
        translation: 'My parents want me to study medicine.',
      },
      {
        english: 'Necesito que me ayudes con esto.',
        translation: 'I need you to help me with this.',
      },
      {
        english: 'Prefiero que vengáis mañana.',
        translation: 'I prefer you to come tomorrow.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Espero que te gusta.',
        correct: 'Espero que te guste.',
        note: '"Esperar que" rige subjuntivo, no indicativo.',
      },
      {
        wrong: 'Quiero que yo vaya.',
        correct: 'Quiero ir.',
        note: 'Cuando el sujeto es el mismo, se usa infinitivo.',
      },
    ],
    related: ['subjuntivo-presente', 'ojala', 'subjuntivo-recomendacion'],
  },
  {
    slug: 'ojala',
    title: 'Ojalá + subjuntivo',
    level: 'B1',
    category: 'Subjuntivo',
    summary: 'La expresión de deseo más intensa del español, de origen árabe.',
    structure:
      'ojalá (que) + presente de subjuntivo (posible) · imperfecto/pluscuamperfecto de subjuntivo (difícil/imposible)',
    explanation:
      '**Ojalá** es una de las expresiones más características del español. Procede del árabe hispánico *law šáʼ Alláh* ("si Dios quisiera"). Se usa para expresar un **deseo intenso**.\n\n**Ojalá + presente de subjuntivo**: deseo sobre el presente o futuro que se considera **posible**.\n- *Ojalá llueva mañana.*\n- *Ojalá (que) lleguen a tiempo.*\n\n**Ojalá + imperfecto de subjuntivo**: deseo sobre el presente considerado **difícil o improbable**.\n- *Ojalá tuviera más tiempo.* (I wish I had more time.)\n\n**Ojalá + pluscuamperfecto de subjuntivo**: deseo sobre el pasado que **no se cumplió** (irreal).\n- *Ojalá hubiera estudiado más.* (I wish I had studied more.)\n\nLa conjunción "que" es opcional: *Ojalá que venga* = *Ojalá venga*.',
    rules: [
      '"Ojalá" rige siempre subjuntivo. Nunca lleva indicativo.',
      'Con presente de subjuntivo: deseo realizable en el presente/futuro.',
      'Con imperfecto de subjuntivo: deseo difícil o contrario a la realidad presente.',
      'Con pluscuamperfecto de subjuntivo: deseo sobre un pasado que no se cumplió.',
    ],
    examples: [
      {
        english: 'Ojalá pueda ir a tu boda.',
        translation: 'I hope I can go to your wedding.',
      },
      {
        english: 'Ojalá no llueva durante las vacaciones.',
        translation: "Let's hope it doesn't rain during the holidays.",
      },
      {
        english: 'Ojalá tuviera más dinero.',
        translation: 'I wish I had more money.',
        note: 'deseo difícil',
      },
      {
        english: 'Ojalá hubiera aprendido español de niño.',
        translation: 'I wish I had learned Spanish as a child.',
        note: 'deseo irreal sobre el pasado',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Ojalá tengo tiempo.',
        correct: 'Ojalá tenga tiempo.',
        note: '"Ojalá" siempre rige subjuntivo.',
      },
      {
        wrong: 'Ojalá que vendrá.',
        correct: 'Ojalá que venga.',
        note: 'No se usa futuro con "ojalá".',
      },
    ],
    related: [
      'expresiones-deseo',
      'subjuntivo-presente',
      'subjuntivo-imperfecto',
      'pluscuamperfecto',
    ],
  },
  {
    slug: 'subjuntivo-recomendacion',
    title: 'Subjuntivo con recomendaciones y consejos',
    level: 'B1',
    category: 'Subjuntivo',
    summary: 'Aconsejar y recomendar usando el subjuntivo.',
    structure: 'recomendar/sugerir/aconsejar + que + subjuntivo',
    explanation:
      'Las **recomendaciones, consejos y sugerencias** que se dirigen a otra persona llevan el verbo subordinado en **subjuntivo**.\n\n**Verbo de influencia + que + subjuntivo**\n\nVerbos de influencia más comunes:\n- *recomendar que, sugerir que, aconsejar que, proponer que, insistir en que, rogar que, suplicar que, pedir que*\n\nTambién funcionan con esta estructura las expresiones impersonales:\n- *Es recomendable que, Es aconsejable que, Es importante que, Es necesario que, Conviene que, Más vale que*\n\nEjemplos:\n- *Te recomiendo que **leas** este libro.*\n- *Es importante que **lleguéis** puntuales.*',
    rules: [
      'Verbos de influencia + que + subjuntivo cuando el sujeto de la influencia es distinto.',
      'Cuando el sujeto es el mismo, se usa infinitivo.',
      '"Decir que" pidiendo acción rige subjuntivo; informando rige indicativo.',
      '"Insistir en que" + subjuntivo significa presionar; + indicativo significa repetir afirmación.',
    ],
    examples: [
      {
        english: 'Te recomiendo que visites Granada.',
        translation: 'I recommend you visit Granada.',
      },
      {
        english: 'Es importante que bebas mucha agua en verano.',
        translation: "It's important that you drink a lot of water in summer.",
      },
      {
        english: 'Sugiero que lleguéis media hora antes.',
        translation: 'I suggest you arrive half an hour early.',
      },
      {
        english: 'Conviene que reserves con antelación.',
        translation: "It's advisable that you book in advance.",
      },
    ],
    common_mistakes: [
      {
        wrong: 'Recomiendo que visitas Granada.',
        correct: 'Recomiendo que visites Granada.',
        note: '"Recomendar que" rige subjuntivo.',
      },
      {
        wrong: 'Es importante que llegas puntual.',
        correct: 'Es importante que llegues puntual.',
        note: 'Las expresiones impersonales de influencia rigen subjuntivo.',
      },
    ],
    related: [
      'subjuntivo-presente',
      'expresiones-deseo',
      'imperativo-afirmativo',
    ],
  },
  {
    slug: 'subjuntivo-duda',
    title: 'Subjuntivo con expresiones de duda',
    level: 'B1',
    category: 'Subjuntivo',
    summary:
      'Usar el subjuntivo para expresar duda, probabilidad baja o negación.',
    structure: 'dudar que / no creer que / es posible que + subjuntivo',
    explanation:
      'Las **expresiones de duda o incertidumbre** llevan el verbo subordinado en **subjuntivo**. La regla fundamental es:\n\n**Afirmación** (certeza) → **indicativo**\n**Negación de la afirmación** (duda) → **subjuntivo**\n\n| Certeza (indicativo) | Duda (subjuntivo) |\n|---------------------|-------------------|\n| Creo que viene | No creo que venga |\n| Pienso que es cierto | No pienso que sea cierto |\n| Estoy seguro de que sabe | No estoy seguro de que sepa |\n| Es verdad que llueve | No es verdad que llueva |\n\nExpresiones que siempre llevan subjuntivo:\n- *Dudo que..., Es posible que..., Puede (ser) que..., Quizá(s)..., Tal vez...* (cuando el hablante expresa verdadera duda).',
    rules: [
      'Con verbos de opinión en negativo rigen subjuntivo: "No creo que venga".',
      'Los verbos de duda siempre rigen subjuntivo: "Dudo que sepas".',
      '"Quizá(s)" y "tal vez" pueden llevar indicativo o subjuntivo según el grado de certeza.',
      '"Es posible/probable que" siempre rige subjuntivo.',
    ],
    examples: [
      {
        english: 'No creo que él tenga razón.',
        translation: "I don't think he's right.",
      },
      {
        english: 'Dudo que puedan terminar a tiempo.',
        translation: 'I doubt they can finish on time.',
      },
      {
        english: 'Es posible que llueva mañana.',
        translation: "It's possible that it will rain tomorrow.",
      },
      {
        english: 'Quizás vayamos a la playa este fin de semana.',
        translation: "Maybe we'll go to the beach this weekend.",
      },
    ],
    common_mistakes: [
      {
        wrong: 'No creo que tiene razón.',
        correct: 'No creo que tenga razón.',
        note: '"No creer que" rige subjuntivo, no indicativo.',
      },
      {
        wrong: 'Dudo que viene.',
        correct: 'Dudo que venga.',
        note: '"Dudar que" siempre rige subjuntivo.',
      },
    ],
    related: [
      'subjuntivo-presente',
      'subjuntivo-valoracion',
      'expresiones-deseo',
    ],
  },
  {
    slug: 'subjuntivo-valoracion',
    title: 'Subjuntivo con expresiones de valoración',
    level: 'B1',
    category: 'Subjuntivo',
    summary:
      'Emitir juicios y valoraciones con el subjuntivo: es bueno que, me alegra que, me sorprende que.',
    structure:
      'ser/estar + adjetivo + que + subjuntivo · me alegra/molesta/sorprende + que + subjuntivo',
    explanation:
      'Las **expresiones de valoración o reacción emocional** rigen **subjuntivo** cuando el verbo subordinado tiene un sujeto diferente. La estructura es:\n\n**ser/estar + adjetivo + que + subjuntivo**:\n- *Es bueno que **hayas** venido.*\n- *Es injusto que **tengan** que pagar tanto.*\n- *Está mal que **digas** eso.*\n\n**Verbos de emoción + que + subjuntivo**:\n- *Me alegra que **estés** aquí.*\n- *Me molesta que **llegues** tarde.*\n- *Me sorprende que no lo **sepas**.*\n- *Siento que no **puedas** venir.*\n- *Temo que **haya** problemas.*\n\nAdjetivos comunes con esta estructura: *bueno, malo, lógico, normal, raro, extraño, increíble, estupendo, maravilloso, horrible, terrible, injusto, justo, importante, necesario*.',
    rules: [
      'Expresiones impersonales de valoración + que + subjuntivo.',
      'Verbos de emoción (alegrar, molestar, sorprender, gustar, temer, sentir) + que + subjuntivo.',
      'Cuando el sujeto es el mismo, se usa infinitivo: "Me alegra estar aquí".',
      '"Es cierto/evidente/obvio que" NO rigen subjuntivo (expresan certeza).',
    ],
    examples: [
      {
        english: 'Me alegra que hayas encontrado trabajo.',
        translation: "I'm glad you've found a job.",
      },
      {
        english: 'Es increíble que no lo sepas.',
        translation: "It's incredible that you don't know it.",
      },
      {
        english: 'Siento que no puedas venir a la boda.',
        translation: "I'm sorry you can't come to the wedding.",
      },
      {
        english: 'Es normal que estés cansado después del viaje.',
        translation: "It's normal that you're tired after the trip.",
      },
    ],
    common_mistakes: [
      {
        wrong: 'Me alegra que estás aquí.',
        correct: 'Me alegra que estés aquí.',
        note: 'Las expresiones de emoción rigen subjuntivo.',
      },
      {
        wrong: 'Es bueno que haces ejercicio.',
        correct: 'Es bueno que hagas ejercicio.',
        note: '"Es bueno que" rige subjuntivo.',
      },
    ],
    related: ['subjuntivo-presente', 'subjuntivo-duda', 'expresiones-deseo'],
  },
  {
    slug: 'preterito-perfecto',
    title: 'Pretérito perfecto compuesto',
    level: 'B1',
    category: 'Tiempos Verbales',
    summary:
      'He hablado, has comido, han vivido — acciones pasadas conectadas con el presente.',
    structure:
      'haber (presente: he/has/ha/hemos/habéis/han) + participio (-ado/-ido)',
    explanation:
      'El **pretérito perfecto compuesto** se forma con el presente del verbo **haber** + **participio**. El participio es **invariable** en esta construcción: *he comido* (no ~~he comida~~).\n\n| Persona | Haber | + Participio |\n|---------|-------|--------------|\n| yo | he | hablado/comido/vivido |\n| tú | has | hablado/comido/vivido |\n| él/ella/usted | ha | hablado/comido/vivido |\n| nosotros | hemos | hablado/comido/vivido |\n| vosotros | habéis | hablado/comido/vivido |\n| ellos/ellas/uds. | han | hablado/comido/vivido |\n\nSe usa para:\n- **Acciones pasadas en un periodo de tiempo no terminado**: *Hoy he ido al médico. / Esta semana hemos trabajado mucho.*\n- **Experiencias sin marcador temporal concreto**: *He visitado Japón tres veces.*\n- **Acciones con resultados en el presente**: *He perdido las llaves.* (y aún no las encuentro)\n\nEn algunas zonas de España se prefiere este tiempo para cualquier pasado reciente; en gran parte de América Latina se usa el indefinido.',
    rules: [
      'Se forma con haber (presente) + participio invariable.',
      'Participios regulares: -ar → -ado (hablar → hablado); -er/-ir → -ido (comer → comido, vivir → vivido).',
      'Participios irregulares: hacer → hecho, decir → dicho, ver → visto, escribir → escrito, poner → puesto, volver → vuelto, romper → roto, morir → muerto, abrir → abierto, cubrir → cubierto.',
      'Se usa con marcadores como hoy, esta semana, este año, ya, todavía no, nunca, alguna vez.',
    ],
    examples: [
      {
        english: 'Hoy he comido paella.',
        translation: "Today I've eaten paella.",
      },
      {
        english: '¿Has estado alguna vez en México?',
        translation: 'Have you ever been to Mexico?',
      },
      {
        english: 'Todavía no hemos terminado el proyecto.',
        translation: "We haven't finished the project yet.",
      },
      {
        english: 'Ya he visto esa película.',
        translation: "I've already seen that film.",
      },
    ],
    common_mistakes: [
      {
        wrong: 'He visto la película ayer.',
        correct: 'Ayer vi la película.',
        note: 'Con "ayer" (periodo terminado) se usa indefinido, no perfecto.',
      },
      {
        wrong: 'Han rompido la ventana.',
        correct: 'Han roto la ventana.',
        note: 'El participio de romper es "roto", irregular.',
      },
    ],
    related: [
      'pluscuamperfecto',
      'marcadores-perfecto',
      'preterito-indefinido-regular',
    ],
  },
  {
    slug: 'pluscuamperfecto',
    title: 'Pretérito pluscuamperfecto',
    level: 'B1',
    category: 'Tiempos Verbales',
    summary:
      'Había hablado, habías comido... — acción pasada anterior a otra pasada.',
    structure:
      'haber (imperfecto: había/habías/había/habíamos/habíais/habían) + participio',
    explanation:
      'El **pretérito pluscuamperfecto** expresa una acción pasada **anterior a otra acción también pasada**. Se forma con el **imperfecto de haber + participio**.\n\n| Persona | Haber (imperfecto) | + Participio |\n|---------|-------------------|--------------|\n| yo | había | hablado/comido/vivido |\n| tú | habías | hablado/comido/vivido |\n| él/ella/usted | había | hablado/comido/vivido |\n| nosotros | habíamos | hablado/comido/vivido |\n| vosotros | habíais | hablado/comido/vivido |\n| ellos/ellas/uds. | habían | hablado/comido/vivido |\n\nEs el equivalente al *past perfect* inglés: *When I arrived, she had already left → Cuando llegué, ella ya se había ido.*\n\nEs muy frecuente en narraciones para marcar que algo ocurrió antes que el punto de referencia pasado.',
    rules: [
      'Acción pasada anterior a otra acción pasada.',
      'Se forma con el imperfecto de haber + participio invariable.',
      'Frecuente en narraciones para establecer orden cronológico.',
      'Con "ya" y "todavía no" en pasado: "Ya había salido cuando llamé".',
    ],
    examples: [
      {
        english: 'Cuando llegué al cine, la película ya había empezado.',
        translation:
          'When I arrived at the cinema, the film had already started.',
      },
      {
        english: 'Nunca había visto algo tan bonito.',
        translation: 'I had never seen something so beautiful.',
      },
      {
        english: 'No habían terminado los deberes cuando llegó su madre.',
        translation:
          "They hadn't finished their homework when their mother arrived.",
      },
      {
        english: 'Me dijo que ya había estado en ese restaurante.',
        translation: 'He told me he had already been to that restaurant.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Cuando llegué, ya empezó la película.',
        correct: 'Cuando llegué, ya había empezado la película.',
        note: 'Acción anterior a otra pasada requiere pluscuamperfecto.',
      },
      {
        wrong: 'Nunca he visto algo tan bonito hasta ese día.',
        correct: 'Nunca había visto algo tan bonito hasta ese día.',
        note: 'Hasta un momento pasado se usa pluscuamperfecto, no perfecto.',
      },
    ],
    related: [
      'preterito-perfecto',
      'marcadores-perfecto',
      'secuencia-temporal',
    ],
  },
  {
    slug: 'marcadores-perfecto',
    title: 'Marcadores temporales del perfecto',
    level: 'B1',
    category: 'Adjetivos y Adverbios',
    summary:
      'Hoy, esta semana, ya, todavía no, nunca, alguna vez — marcadores del pretérito perfecto.',
    explanation:
      'Los **marcadores temporales** ayudan a decidir entre pretérito perfecto e indefinido. Cada tiempo tiene sus marcadores característicos:\n\n**Pretérito perfecto** (periodo no terminado o experiencia):\n- *hoy, esta mañana/tarde/noche, esta semana, este mes, este año, este verano...*\n- *ya, todavía no / aún no*\n- *alguna vez, nunca, siempre*\n- *últimamente, en los últimos días*\n- *hace un rato, hace poco*\n\n**Pretérito indefinido** (periodo terminado):\n- *ayer, anoche, anteayer*\n- *la semana pasada, el mes pasado, el año pasado*\n- *hace dos días / tres meses / mucho tiempo*\n- *en 2015, en julio*\n- *aquel día, entonces*\n\nLa clave es si el periodo de tiempo **incluye o no el presente**.',
    rules: [
      'Periodo no terminado (hoy, esta semana) → pretérito perfecto.',
      'Periodo terminado (ayer, la semana pasada) → pretérito indefinido.',
      '"Ya" y "todavía no" van frecuentemente con perfecto para expresar acciones completadas o pendientes.',
      '"Nunca" y "alguna vez" con perfecto para experiencias vitales.',
    ],
    examples: [
      {
        english: 'Esta semana he ido al gimnasio tres veces.',
        translation: "This week I've gone to the gym three times.",
      },
      {
        english: '¿Alguna vez has probado el ceviche?',
        translation: 'Have you ever tried ceviche?',
      },
      {
        english: 'Todavía no he encontrado las llaves.',
        translation: "I still haven't found the keys.",
      },
      {
        english: 'Últimamente no hemos tenido mucho trabajo.',
        translation: "Lately we haven't had much work.",
      },
    ],
    common_mistakes: [
      {
        wrong: 'Hoy fui al médico.',
        correct: 'Hoy he ido al médico.',
        note: 'Con "hoy" (periodo no terminado) en España se prefiere el perfecto. En América se usa también el indefinido.',
      },
    ],
    related: [
      'preterito-perfecto',
      'pluscuamperfecto',
      'marcadores-temporales',
    ],
  },
  {
    slug: 'voz-pasiva',
    title: 'Voz pasiva con ser + participio',
    level: 'B1',
    category: 'Voz Pasiva',
    summary: 'Construir oraciones pasivas: ser + participio (+ por + agente).',
    structure:
      'sujeto paciente + ser (conjugado) + participio (concuerda) + (por + agente)',
    explanation:
      'La **voz pasiva** en español se forma con el verbo **ser + participio**. A diferencia del perfecto, aquí el participio **sí concuerda en género y número** con el sujeto paciente.\n\n| Voz activa | Voz pasiva |\n|-----------|-----------|\n| El chef preparó la cena. | La cena **fue preparada** por el chef. |\n| Los alumnos entregaron los trabajos. | Los trabajos **fueron entregados** por los alumnos. |\n| Cervantes escribió el Quijote. | El Quijote **fue escrito** por Cervantes. |\n\nLa voz pasiva es mucho menos frecuente en español que en inglés. Se prefiere:\n- La **pasiva refleja** con "se": *Se venden pisos.*\n- La **voz activa** con cambio de orden: *El Quijote lo escribió Cervantes.*\n\nLa pasiva con "ser" es más propia de registros formales, periodísticos y académicos.',
    rules: [
      'El verbo "ser" se conjuga en el tiempo que corresponda.',
      'El participio concuerda en género y número con el sujeto paciente.',
      'El agente se introduce con "por" (a veces "de" para estados mentales).',
      'No confundir pasiva de proceso (ser + participio) con pasiva de resultado (estar + participio).',
    ],
    examples: [
      {
        english: 'El edificio fue diseñado por un arquitecto famoso.',
        translation: 'The building was designed by a famous architect.',
      },
      {
        english: 'Las cartas serán enviadas mañana.',
        translation: 'The letters will be sent tomorrow.',
      },
      {
        english: 'La decisión ha sido tomada por el comité.',
        translation: 'The decision has been made by the committee.',
      },
      {
        english: 'Los ladrones fueron detenidos por la policía.',
        translation: 'The thieves were arrested by the police.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'La cena fue preparado por el chef.',
        correct: 'La cena fue preparada por el chef.',
        note: 'El participio debe concordar con el sujeto paciente (cena, femenino).',
      },
      {
        wrong: 'El libro está escrito por Cervantes.',
        correct: 'El libro fue escrito por Cervantes.',
        note: '"Estar + participio" indica resultado; "ser + participio" indica proceso/agente.',
      },
    ],
    related: ['se-impersonal', 'se-pasivo', 'pasiva-refleja'],
  },
  {
    slug: 'se-impersonal',
    title: 'Se impersonal',
    level: 'B1',
    category: 'Voz Pasiva',
    summary:
      'Construcciones impersonales con "se": Se habla español. Se vive bien aquí.',
    structure: 'se + verbo en 3ª persona singular',
    explanation:
      'El **se impersonal** se usa para expresar acciones sin mencionar quién las realiza. Equivale a "one", "you" o "people" en inglés, o a la voz pasiva sin agente.\n\n**Características**:\n- El verbo va siempre en **tercera persona del singular**.\n- No hay sujeto gramatical explícito.\n- La acción se presenta como general, sin responsable concreto.\n\nEjemplos:\n- *Se vive bien en esta ciudad.* (One lives well in this city.)\n- *Se habla español aquí.* (Spanish is spoken here.)\n- *Se necesita personal.* (Staff is needed.)\n\nCuando el complemento es de persona, se usa la preposición "a":\n- *Se busca a los responsables.*\n- *Se recibió a los invitados.*',
    rules: [
      'El verbo va en 3ª persona singular, nunca en plural.',
      'La construcción es impersonal: no hay sujeto.',
      'Con complementos de persona se usa "a": "Se busca a los testigos".',
      'No confundir con la pasiva refleja, donde el verbo concuerda con el objeto.',
    ],
    examples: [
      {
        english: 'Se habla inglés en la recepción.',
        translation: 'English is spoken at the reception.',
      },
      {
        english: 'Se come muy bien en este restaurante.',
        translation: 'One eats very well in this restaurant.',
      },
      { english: 'Se necesita camarero.', translation: 'Waiter needed.' },
      {
        english: 'Se busca a los criminales.',
        translation: 'The criminals are being searched for.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Se venden coches aquí.',
        correct: 'Se venden coches aquí.',
        note: 'Esta es pasiva refleja (concordancia). La impersonal sería "Se vende coches" (menos frecuente).',
      },
      {
        wrong: 'Se busca los documentos.',
        correct: 'Se buscan los documentos.',
        note: 'Con cosa se suele usar pasiva refleja con concordancia: se buscan.',
      },
    ],
    related: ['se-pasivo', 'voz-pasiva', 'pasiva-refleja'],
  },
  {
    slug: 'se-pasivo',
    title: 'Pasiva refleja (se + verbo)',
    level: 'B1',
    category: 'Voz Pasiva',
    summary:
      'Se venden pisos, se alquilan coches — la pasiva con "se" más natural del español.',
    structure: 'se + verbo en 3ª persona (concuerda con el sujeto paciente)',
    explanation:
      'La **pasiva refleja** es la forma pasiva más común en español. Se construye con **se + verbo en tercera persona** y el verbo **concuerda en número** con el sujeto paciente (el objeto de la acción).\n\n- *Se vende piso.* (singular: un piso)\n- *Se venden pisos.* (plural: varios pisos)\n\nA diferencia del se impersonal (siempre singular), en la pasiva refleja el verbo puede ir en plural:\n- *Se alquila apartamento.* → un apartamento\n- *Se alquilan apartamentos.* → varios apartamentos\n\n**Diferencias con la voz pasiva con ser**:\n- Ser + participio → más formal, menos frecuente, suele mencionar agente.\n- Se + verbo → más natural y frecuente, no menciona agente.',
    rules: [
      'El verbo concuerda con el sujeto paciente en número: se vende / se venden.',
      'No se menciona el agente.',
      'Es la forma pasiva preferida en español coloquial.',
      'Solo funciona en 3ª persona; no existe "me vendo" como pasiva refleja.',
    ],
    examples: [
      {
        english: 'Se venden flores frescas.',
        translation: 'Fresh flowers are sold.',
      },
      { english: 'Se alquila habitación.', translation: 'Room for rent.' },
      {
        english: 'Se necesitan voluntarios.',
        translation: 'Volunteers are needed.',
      },
      {
        english: 'Aquí se hablan varios idiomas.',
        translation: 'Several languages are spoken here.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Se vende flores.',
        correct: 'Se venden flores.',
        note: 'El verbo debe concordar en número con el sujeto (flores, plural).',
      },
      {
        wrong: 'Se alquila apartamentos.',
        correct: 'Se alquilan apartamentos.',
        note: 'En la pasiva refleja hay concordancia de número.',
      },
    ],
    related: ['se-impersonal', 'voz-pasiva', 'pasiva-refleja'],
  },
  {
    slug: 'que-relativo',
    title: 'Pronombres relativos: que',
    level: 'B1',
    category: 'Oraciones',
    summary: 'El pronombre relativo más versátil: que para unir oraciones.',
    structure: 'antecedente + que + oración subordinada',
    explanation:
      'El pronombre relativo **que** es el más usado en español. Puede referirse a **personas, cosas o ideas** y funciona como sujeto o complemento directo de la oración subordinada.\n\nUsos:\n- **Con antecedente explícito**: *El libro **que** leí es fascinante.*\n- **Sin antecedente (sustantivado)**: *El **que** quiera participar, que levante la mano.*\n- **Con artículo**: *el que, la que, los que, las que, lo que*: *Lo que dijiste no es cierto.*\n\n**Que vs. quien/cual**:\n- **Que** es el más versátil y se usa en la mayoría de los casos.\n- **Quien** solo para personas y principalmente en explicativas o sin antecedente.\n- **El/la cual** es más formal y se usa con preposiciones o para evitar ambigüedad.',
    rules: [
      '"Que" es invariable: no cambia de género ni número.',
      'Puede referirse a personas o cosas.',
      'Con preposición: "en que", "con que", "a que", "de que".',
      '"Lo que" se usa para ideas abstractas: "No entiendo lo que dices".',
    ],
    examples: [
      {
        english: 'La chica que conocí ayer es italiana.',
        translation: 'The girl I met yesterday is Italian.',
      },
      {
        english: 'El coche que compré es eléctrico.',
        translation: 'The car I bought is electric.',
      },
      {
        english: 'Lo que me contaste es increíble.',
        translation: 'What you told me is incredible.',
      },
      {
        english: 'La ciudad en que vivo es muy tranquila.',
        translation: 'The city where I live is very quiet.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'La ciudad que vivo es tranquila.',
        correct:
          'La ciudad en que vivo es tranquila. / La ciudad donde vivo es tranquila.',
        note: 'Con complemento de lugar se necesita preposición o usar "donde".',
      },
      {
        wrong: 'El chico cual vino ayer.',
        correct: 'El chico que vino ayer.',
        note: '"El cual" no se usa como sujeto de oraciones especificativas.',
      },
    ],
    related: ['donde-cuando-relativo', 'cuyo', 'se-impersonal'],
  },
  {
    slug: 'donde-cuando-relativo',
    title: 'Pronombres relativos: donde y cuando',
    level: 'B1',
    category: 'Oraciones',
    summary: 'Usar donde (lugar) y cuando (tiempo) como relativos.',
    structure: 'antecedente + donde/cuando + oración subordinada',
    explanation:
      '**Donde** y **cuando** funcionan como adverbios relativos que introducen oraciones subordinadas de lugar y tiempo respectivamente.\n\n**Donde**:\n- Se refiere a un lugar mencionado antes.\n- *Esta es la casa **donde** nací.*\n- Puede llevar preposición: *adonde, en donde, de donde, por donde*.\n- *El pueblo **de donde** vengo es muy pequeño.*\n\n**Cuando**:\n- Se refiere a un momento temporal.\n- *Recuerdo el día **cuando** nos conocimos.*\n- Con subjuntivo expresa futuro: *Cuando **llegues**, llámame.*\n\nTambién pueden usarse sin antecedente explícito:\n- *Ponlo **donde** quieras.*\n- *Ven **cuando** puedas.*',
    rules: [
      '"Donde" para lugar; con preposición según el verbo: ir a → adonde / a donde.',
      '"Cuando" para tiempo; con subjuntivo para acciones futuras.',
      '"Donde" y "cuando" pueden sustituirse por "en que": "la casa en que nací".',
      'Sin antecedente funcionan como conjunciones subordinantes.',
    ],
    examples: [
      {
        english: 'El bar donde quedamos está en el centro.',
        translation: "The bar where we're meeting is downtown.",
      },
      {
        english: 'Volveré a la ciudad donde crecí.',
        translation: "I'll return to the city where I grew up.",
      },
      {
        english: 'Llegó justo cuando empezábamos a comer.',
        translation: 'He arrived just when we were starting to eat.',
      },
      {
        english: 'Cuando termines, avísame.',
        translation: 'When you finish, let me know.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'La ciudad adonde vivo.',
        correct: 'La ciudad donde vivo. / La ciudad en la que vivo.',
        note: '"Adonde" implica dirección (ir a); para ubicación se usa "donde" o "en donde".',
      },
    ],
    related: ['que-relativo', 'cuyo', 'conectores-narrativos'],
  },
  {
    slug: 'cuyo',
    title: 'El relativo posesivo cuyo',
    level: 'B1',
    category: 'Oraciones',
    summary: 'El pronombre relativo de posesión: cuyo, cuya, cuyos, cuyas.',
    structure: 'antecedente + cuyo/a/os/as + sustantivo + oración',
    explanation:
      '**Cuyo** es el único pronombre relativo que expresa **posesión**. Tiene cuatro formas que **concuerdan en género y número con el sustantivo que sigue** (la cosa poseída), no con el antecedente.\n\n- *cuyo* (masc. sing.) · *cuya* (fem. sing.) · *cuyos* (masc. pl.) · *cuyas* (fem. pl.)\n\nEjemplos:\n- *El escritor **cuya** novela ganó el premio es colombiano.* → La novela (fem. sing.) del escritor.\n- *La empresa **cuyos** empleados están en huelga.* → Los empleados (masc. pl.) de la empresa.\n\nCuyo equivale a "whose" en inglés, pero concuerda con lo poseído, no con el poseedor. Es propio del registro formal; en lenguaje coloquial se evita con construcciones como "que su": *El escritor que su novela ganó...* (coloquial pero frecuente).',
    rules: [
      'Concuerda en género y número con el sustantivo que lo sigue (la cosa poseída).',
      'No concuerda con el antecedente (el poseedor).',
      'Nunca lleva artículo: "el cuyo libro" es incorrecto.',
      'En registro coloquial se sustituye a menudo por "que su".',
    ],
    examples: [
      {
        english: 'El autor cuyo libro leí ayer es argentino.',
        translation: 'The author whose book I read yesterday is Argentine.',
      },
      {
        english: 'La ciudad cuyas calles son tan estrechas es Toledo.',
        translation: 'The city whose streets are so narrow is Toledo.',
      },
      {
        english: 'Es una persona de cuya honestidad no dudo.',
        translation: "He is a person whose honesty I don't doubt.",
      },
      {
        english:
          'Los estudiantes cuyos trabajos fueron seleccionados recibirán un premio.',
        translation:
          'The students whose works were selected will receive a prize.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'El escritor cuyo su libro es famoso.',
        correct: 'El escritor cuyo libro es famoso.',
        note: '"Cuyo" ya incluye el valor posesivo; "su" es redundante.',
      },
      {
        wrong: 'La chica cuya el padre es médico.',
        correct: 'La chica cuyo padre es médico.',
        note: '"Cuyo" concuerda con "padre" (masc.), no con "chica". No lleva artículo.',
      },
    ],
    related: ['que-relativo', 'donde-cuando-relativo', 'adjetivos-posesivos'],
  },
  {
    slug: 'condicional-compuesto',
    title: 'Condicional compuesto',
    level: 'B1',
    category: 'Condicionales',
    summary:
      'Habría hablado, habrías comido — hipótesis sobre el pasado, consejos no seguidos.',
    structure:
      'haber (condicional simple: habría/habrías/habría/habríamos/habríais/habrían) + participio',
    explanation:
      'El **condicional compuesto** se forma con el condicional simple de **haber + participio**. Expresa:\n\n- **Consecuencia no realizada de una condición irreal pasada**:\n  *Si hubiera estudiado, **habría aprobado**.*\n\n- **Conjetura o probabilidad sobre el pasado**:\n  *No sé qué pasó. Se **habría enfadado**.* (Probablemente se enfadó.)\n\n- **Consejo o reproche sobre algo que ya no se puede cambiar**:\n  *Deberías haberme avisado. / **Habrías debido** llamar antes.*\n\n- **Futuro del pasado en estilo indirecto sobre acciones anteriores**:\n  *Dijo que cuando llegáramos ya **habría terminado**.*',
    rules: [
      'Condicional simple de haber + participio invariable.',
      'Expresa la apódosis de condicionales irreales de pasado.',
      'También conjetura sobre el pasado: "Habrían sido las tres".',
      'En registro coloquial se sustituye a menudo por pluscuamperfecto de subjuntivo: "Si hubiera estudiado, hubiera aprobado".',
    ],
    examples: [
      {
        english: 'Si me lo hubieras dicho, te habría ayudado.',
        translation: 'If you had told me, I would have helped you.',
      },
      {
        english: 'No contestan. Se habrían ido ya.',
        translation: "They don't answer. They must have left already.",
        note: 'conjetura',
      },
      {
        english: 'Habrías disfrutado mucho en la fiesta.',
        translation: 'You would have enjoyed the party a lot.',
      },
      {
        english: 'Dijo que para entonces ya habría llegado.',
        translation: 'He said that by then he would have already arrived.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Si habrías estudiado, habrías aprobado.',
        correct: 'Si hubieras estudiado, habrías aprobado.',
        note: 'En la prótasis con "si" nunca se usa condicional.',
      },
      {
        wrong: 'Habría ido si tenía tiempo.',
        correct: 'Habría ido si hubiera tenido tiempo.',
        note: 'Condición irreal pasada pide pluscuamperfecto de subjuntivo.',
      },
    ],
    related: [
      'condicional-simple',
      'si-imperfecto-subjuntivo',
      'pluscuamperfecto',
    ],
  },
  {
    slug: 'si-imperfecto-subjuntivo',
    title: 'Condicionales irreales: si + imperfecto de subjuntivo',
    level: 'B1',
    category: 'Condicionales',
    summary: 'Condiciones hipotéticas o contrarias a la realidad presente.',
    structure: 'si + imperfecto de subjuntivo + condicional simple',
    explanation:
      'Las **condicionales de segundo tipo** expresan condiciones **hipotéticas, improbables o contrarias a la realidad presente**. La estructura es:\n\n**Si + imperfecto de subjuntivo, + condicional simple**\n\n- *Si **tuviera** dinero, **viajaría** por el mundo.* (No tengo dinero ahora.)\n- *Si **fueras** más organizado, **terminarías** a tiempo.* (No eres organizado.)\n- *Si **viviera** en la playa, **estaría** feliz.* (No vivo en la playa.)\n\nTambién se puede invertir el orden: *Viajaría por el mundo si tuviera dinero.*\n\nLa prótasis con "si" NUNCA lleva condicional. El imperfecto de subjuntivo tiene dos formas: -ra (hablara) y -se (hablase). Ambas son correctas, aunque -ra es más frecuente.',
    rules: [
      'Si + imperfecto de subjuntivo + condicional simple.',
      'Expresa condición contraria a la realidad presente o improbable.',
      'Nunca usar condicional en la prótasis: "~~Si tendría~~" es incorrecto.',
      'El imperfecto de subjuntivo tiene dos terminaciones: -ra y -se; ambas válidas.',
    ],
    examples: [
      {
        english: 'Si tuviera más tiempo, aprendería francés.',
        translation: 'If I had more time, I would learn French.',
      },
      {
        english: 'Si fueras más alto, podrías jugar al baloncesto.',
        translation: 'If you were taller, you could play basketball.',
      },
      {
        english: 'Me compraría esa casa si no fuera tan cara.',
        translation: "I would buy that house if it weren't so expensive.",
      },
      {
        english: 'Si vivieras aquí, nos veríamos más a menudo.',
        translation: 'If you lived here, we would see each other more often.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Si tendría dinero, viajaría.',
        correct: 'Si tuviera/tuviese dinero, viajaría.',
        note: 'En la prótasis se usa subjuntivo, no condicional.',
      },
      {
        wrong: 'Si yo sería tú, estudiaría más.',
        correct: 'Si yo fuera tú, estudiaba más. / Yo que tú, estudiaría más.',
        note: '"Si yo fuera" es la forma correcta, con imperfecto de subjuntivo de ser.',
      },
    ],
    related: [
      'subjuntivo-imperfecto',
      'condicional-simple',
      'condicional-compuesto',
    ],
  },
  {
    slug: 'suposiciones-futuro',
    title: 'Expresar suposiciones sobre el futuro',
    level: 'B1',
    category: 'Condicionales',
    summary: 'Futuro simple, condicional e indicativo para hacer hipótesis.',
    explanation:
      'El español usa varios mecanismos para expresar **suposiciones, probabilidad y conjetura**, según el marco temporal:\n\n**Sobre el presente**: *futuro simple*\n- *¿Dónde está Juan? — Estará en casa.* (Probablemente está en casa.)\n- *Serán las ocho.* (Probablemente son las ocho.)\n\n**Sobre el pasado**: *condicional simple*\n- *¿Por qué no vino? — Estaría cansado.* (Probablemente estaba cansado.)\n- *Serían las tres cuando llegó.*\n\n**Sobre el futuro**: *futuro simple* o *ir a + infinitivo*\n- *¿Vendrá a la fiesta? — No sé, supongo que sí.*\n- También con adverbios: *quizás, tal vez, a lo mejor* + indicativo/subjuntivo.',
    rules: [
      'Futuro simple para conjetura presente: "Estará en casa" = probablemente está.',
      'Condicional simple para conjetura pasada: "Estaría cansado" = probablemente estaba.',
      '"A lo mejor" + indicativo; "quizás/tal vez" pueden llevar indicativo o subjuntivo.',
      'Las expresiones de probabilidad (es probable/posible que) rigen subjuntivo.',
    ],
    examples: [
      {
        english: 'Estará en el trabajo, no contesta el móvil.',
        translation: "He's probably at work, he doesn't answer his phone.",
      },
      {
        english: 'No sé qué le pasaba; tendría un mal día.',
        translation:
          "I don't know what was wrong with him; he was probably having a bad day.",
      },
      {
        english: 'A lo mejor llueve mañana.',
        translation: 'Maybe it will rain tomorrow.',
      },
      {
        english: 'Es probable que lleguen tarde.',
        translation: 'They will probably arrive late.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Es probable que llegan tarde.',
        correct: 'Es probable que lleguen tarde.',
        note: '"Es probable que" rige subjuntivo.',
      },
      {
        wrong: 'A lo mejor venga.',
        correct: 'A lo mejor viene.',
        note: '"A lo mejor" siempre rige indicativo.',
      },
    ],
    related: ['futuro-simple', 'condicional-simple', 'subjuntivo-duda'],
  },
  {
    slug: 'estilo-indirecto-pasado',
    title: 'Estilo indirecto en pasado',
    level: 'B1',
    category: 'Estilo Indirecto',
    summary:
      'Transformaciones avanzadas del estilo indirecto con verbos en pretérito.',
    explanation:
      'Cuando el verbo introductor del estilo indirecto está en **pasado** (dijo, comentó, explicó, preguntó), se produce una **correlación de tiempos verbales** que afecta a toda la oración subordinada:\n\n| Estilo directo | Estilo indirecto (pasado) |\n|---------------|--------------------------|\n| Presente: "Voy" | Imperfecto: Dijo que **iba** |\n| Pret. perfecto: "He ido" | Pluscuamperfecto: Dijo que **había ido** |\n| Pret. indefinido: "Fui" | Pluscuamperfecto: Dijo que **había ido** |\n| Imperfecto: "Iba" | Imperfecto: Dijo que **iba** (no cambia) |\n| Pluscuamperfecto: "Había ido" | Pluscuamperfecto: Dijo que **había ido** (no cambia) |\n| Futuro simple: "Iré" | Condicional simple: Dijo que **iría** |\n| Futuro perfecto: "Habré ido" | Condicional compuesto: Dijo que **habría ido** |\n| Condicional: "Iría" | Condicional: Dijo que **iría** (no cambia) |\n\nLas órdenes y peticiones en imperativo pasan a subjuntivo:\n- *"Ven" → Dijo que **vinieras**.*\n- *"No salgas" → Dijo que no **salieras**.*',
    rules: [
      'Presente → imperfecto; perfecto/indefinido → pluscuamperfecto.',
      'Imperfecto, pluscuamperfecto y condicional no cambian.',
      'Futuro → condicional; imperativo → imperfecto de subjuntivo.',
      'Las preguntas indirectas no llevan signos de interrogación: "Preguntó qué quería".',
    ],
    examples: [
      {
        english: 'Me dijo que había estado en Madrid el verano anterior.',
        translation: 'He told me he had been in Madrid the previous summer.',
      },
      {
        english: 'Preguntó si íbamos a venir a la cena.',
        translation: 'He asked if we were going to come to the dinner.',
      },
      {
        english: 'Me pidió que le ayudara con la mudanza.',
        translation: 'He asked me to help him with the move.',
        note: 'imperativo → subjuntivo',
      },
      {
        english: 'Explicó que para entonces ya habrían terminado.',
        translation:
          'He explained that by then they would have already finished.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Dijo que ha ido al médico ayer.',
        correct: 'Dijo que había ido al médico el día anterior.',
        note: 'Con verbo introductor en pasado, el perfecto pasa a pluscuamperfecto.',
      },
      {
        wrong: 'Me pidió que le ayudo.',
        correct: 'Me pidió que le ayudara/ayudase.',
        note: 'Petición en pasado → imperfecto de subjuntivo.',
      },
    ],
    related: [
      'estilo-indirecto',
      'cambios-temporales',
      'subjuntivo-imperfecto',
    ],
  },

  /* ═══ B2 ═══ */

  {
    slug: 'subjuntivo-imperfecto',
    title: 'Imperfecto de subjuntivo',
    level: 'B2',
    category: 'Subjuntivo',
    summary: 'Formación y usos del imperfecto de subjuntivo: -ra y -se.',
    structure:
      '3ª pers. pl. del indefinido -ron + -ra/-ras/-ra/-ramos/-rais/-ran (o -se/-ses/-se/-semos/-seis/-sen)',
    explanation:
      'El **imperfecto de subjuntivo** tiene **dos formas** igualmente correctas: terminadas en **-ra** y en **-se**. Ambas se forman a partir de la tercera persona del plural del pretérito indefinido, quitando **-ron** y añadiendo las terminaciones.\n\n| Persona | -ra (hablar) | -se (comer) | -ra (vivir) |\n|--------|-------------|-------------|-------------|\n| yo | hablara | comiese | viviera |\n| tú | hablaras | comieses | vivieras |\n| él/ella/ud. | hablara | comiese | viviera |\n| nosotros | habláramos | comiésemos | viviéramos |\n| vosotros | hablarais | comieseis | vivierais |\n| ellos/ellas/uds. | hablaran | comiesen | vivieran |\n\n**Irregulares**: parten del indefinido irregular en tercera persona plural:\n- tener → tuvieron → tuviera/tuviese\n- hacer → hicieron → hiciera/hiciese\n- decir → dijeron → dijera/dijese\n- pedir → pidieron → pidiera/pidiese\n- dormir → durmieron → durmiera/durmiese\n\nLa forma en -ra es más frecuente en el habla; la forma en -se es más literaria. Se usa en condicionales irreales, tras "ojalá", y en estilo indirecto pasado.',
    rules: [
      'Dos formas: -ra y -se, ambas correctas e intercambiables.',
      'Se forma a partir de la 3ª persona plural del indefinido (sin -ron).',
      'Los verbos irregulares en indefinido mantienen la irregularidad.',
      'La forma en -ra también puede funcionar como pluscuamperfecto de indicativo en registro culto.',
    ],
    examples: [
      {
        english: 'Si tuviera/tuviese más tiempo, viajaría más.',
        translation: 'If I had more time, I would travel more.',
      },
      {
        english: 'Me pidió que hablara/hablase más despacio.',
        translation: 'He asked me to speak more slowly.',
      },
      {
        english: 'Ojalá lloviera/lloviese mañana.',
        translation: 'I wish it would rain tomorrow.',
      },
      {
        english: 'Era importante que llegáramos/llegásemos a tiempo.',
        translation: 'It was important that we arrived on time.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Si tendría tiempo, viajaría.',
        correct: 'Si tuviera/tuviese tiempo, viajaría.',
        note: 'Después de "si" condicional se usa imperfecto de subjuntivo, no condicional.',
      },
      {
        wrong: 'Me pidió que hable más despacio.',
        correct: 'Me pidió que hablara/hablase más despacio.',
        note: 'Con verbo introductor en pasado se usa imperfecto de subjuntivo.',
      },
    ],
    related: [
      'subjuntivo-presente',
      'si-imperfecto-subjuntivo',
      'subjuntivo-pluscuamperfecto',
    ],
  },
  {
    slug: 'subjuntivo-pluscuamperfecto',
    title: 'Pluscuamperfecto de subjuntivo',
    level: 'B2',
    category: 'Subjuntivo',
    summary:
      'Hubiera/hubiese + participio: condiciones irreales de pasado, reproches, deseos incumplidos.',
    structure: 'hubiera/hubiese + participio',
    explanation:
      'El **pluscuamperfecto de subjuntivo** se forma con el imperfecto de subjuntivo de **haber** (*hubiera* o *hubiese*) + **participio**. Expresa acciones irreales referidas al pasado.\n\nUsos:\n- **Condiciones irreales de pasado**: *Si **hubiera estudiado**, habría aprobado.*\n- **Deseos sobre un pasado incumplido**: *Ojalá **hubiera ido** al concierto.*\n- **Reproches y lamentos**: *¡Ojalá me **hubieras avisado**!*\n- **Estilo indirecto con anterioridad al verbo en pasado**: *Dijo que cuando llegó ya **hubieran terminado**.* (menos frecuente, se prefiere pluscuamperfecto de indicativo).\n\nEn oraciones condicionales irreales de pasado, la apódosis puede ir en condicional compuesto o también en pluscuamperfecto de subjuntivo:\n- *Si hubiera estudiado, habría aprobado. / ... hubiera aprobado.*',
    rules: [
      'Hubiera/hubiese + participio invariable.',
      'Expresa acción anterior a un punto pasado, con matiz irreal o hipotético.',
      'En condicionales irreales de pasado: prótasis con pluscuamperfecto de subjuntivo.',
      'Las formas hubiera y hubiese son intercambiables.',
    ],
    examples: [
      {
        english: 'Si hubiera sabido que venías, te habría esperado.',
        translation:
          'If I had known you were coming, I would have waited for you.',
      },
      {
        english: 'Ojalá hubiera estudiado español de niño.',
        translation: 'I wish I had studied Spanish as a child.',
      },
      {
        english: 'Me habría gustado que hubieras venido a la boda.',
        translation: 'I would have liked you to have come to the wedding.',
      },
      {
        english: 'Si no hubiese llovido, habríamos ido a la playa.',
        translation: "If it hadn't rained, we would have gone to the beach.",
      },
    ],
    common_mistakes: [
      {
        wrong: 'Si habría sabido, habría ido.',
        correct: 'Si hubiera/hubiese sabido, habría ido.',
        note: 'En la prótasis con "si" se usa pluscuamperfecto de subjuntivo, no condicional.',
      },
      {
        wrong: 'Ojalá he ido al concierto.',
        correct: 'Ojalá hubiera/hubiese ido al concierto.',
        note: 'Deseo sobre pasado incumplido requiere pluscuamperfecto de subjuntivo.',
      },
    ],
    related: [
      'subjuntivo-imperfecto',
      'condicional-compuesto',
      'si-imperfecto-subjuntivo',
    ],
  },
  {
    slug: 'concordancia-temporal',
    title: 'Concordancia temporal del subjuntivo',
    level: 'B2',
    category: 'Subjuntivo',
    summary:
      'Correlación de tiempos entre la oración principal y la subordinada en subjuntivo.',
    explanation:
      'La **concordancia temporal** (o *consecutio temporum*) es la relación obligatoria entre el tiempo de la oración principal y el de la subordinada cuando esta va en subjuntivo.\n\n**Principal en presente o futuro** → subordinada en **presente de subjuntivo** o **pretérito perfecto de subjuntivo**:\n- *Quiero que **vengas**.* (presente → presente subj.)\n- *No creo que **haya venido**.* (presente → perfecto subj.)\n\n**Principal en pasado o condicional** → subordinada en **imperfecto de subjuntivo** o **pluscuamperfecto de subjuntivo**:\n- *Quería que **vinieras**.* (imperfecto → imperfecto subj.)\n- *No creía que **hubiera venido**.* (imperfecto → pluscuamperfecto subj.)\n\nEl tiempo de la subordinada indica **anterioridad, simultaneidad o posterioridad** respecto al verbo principal.',
    rules: [
      'Verbo principal en presente/futuro → subjuntivo presente o perfecto.',
      'Verbo principal en pasado/condicional → subjuntivo imperfecto o pluscuamperfecto.',
      'La elección entre presente/imperfecto o perfecto/pluscuamperfecto depende de la relación temporal.',
      'El condicional cuenta como pasado para la concordancia.',
    ],
    examples: [
      {
        english: 'Quiero que termines el trabajo hoy.',
        translation: 'I want you to finish the work today.',
        note: 'presente → presente subj.',
      },
      {
        english: 'Quería que terminaras el trabajo aquel día.',
        translation: 'I wanted you to finish the work that day.',
        note: 'pasado → imperfecto subj.',
      },
      {
        english: 'No creo que haya llegado todavía.',
        translation: "I don't think he has arrived yet.",
        note: 'presente → perfecto subj.',
      },
      {
        english: 'No creía que hubiera llegado todavía.',
        translation: "I didn't think he had arrived yet.",
        note: 'pasado → pluscuamperfecto subj.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Quería que vengas.',
        correct: 'Quería que vinieras.',
        note: 'Con verbo principal en pasado, la subordinada debe ir en imperfecto de subjuntivo.',
      },
      {
        wrong: 'Espero que vinieras ayer.',
        correct: 'Espero que hayas venido ayer. / Esperaba que vinieras ayer.',
        note: 'Si el principal está en presente, la acción pasada inmediata va en perfecto de subjuntivo.',
      },
    ],
    related: [
      'subjuntivo-presente',
      'subjuntivo-imperfecto',
      'subjuntivo-pluscuamperfecto',
    ],
  },
  {
    slug: 'perifrasis-aspectuales',
    title: 'Perífrasis aspectuales',
    level: 'B2',
    category: 'Verbos',
    summary:
      'Expresar matices de la acción: empezar a, acabar de, volver a, estar a punto de, seguir + gerundio.',
    structure:
      'verbo auxiliar + (preposición/conjunción) + verbo principal (infinitivo/gerundio/participio)',
    explanation:
      'Las **perífrasis aspectuales** modifican el aspecto de la acción verbal: indican si está empezando, en curso, terminando, repitiéndose, etc.\n\n**Inicio de la acción**:\n- *Empezar a / Comenzar a / Ponerse a + infinitivo*: *Empezó a llover. / Se puso a llorar.*\n- *Echarse a + infinitivo* (con verbos de movimiento o emoción): *Se echó a reír.*\n\n**Acción en curso**:\n- *Estar + gerundio*: *Estoy leyendo.*\n- *Seguir / Continuar + gerundio*: *Sigue lloviendo.*\n- *Llevar + gerundio* (duración): *Llevo tres horas estudiando.*\n- *Andar + gerundio* (coloquial, acción intermitente): *Anda diciendo mentiras.*\n\n**Acción terminada o inminente**:\n- *Acabar de + infinitivo*: *Acabo de llegar.* (Recién terminada.)\n- *Dejar de + infinitivo*: *Dejé de fumar.* (Cesar.)\n- *Estar a punto de + infinitivo*: *Está a punto de salir.* (Inminente.)\n- *Tener + participio*: *Tengo leídos tres libros.* (Acumulación.)',
    rules: [
      'Cada perífrasis tiene una preposición o nexo fijo: empezar a, acabar de, volver a, etc.',
      '"Estar + gerundio" es la más frecuente y expresa acción en desarrollo.',
      '"Acabar de" + infinitivo = acción recién terminada (presente) o que acababa de ocurrir (imperfecto).',
      '"Volver a" + infinitivo = repetición: "Volví a llamar".',
    ],
    examples: [
      {
        english: 'Acabo de enterarme de la noticia.',
        translation: 'I just found out the news.',
      },
      {
        english: 'Llevamos dos horas esperando.',
        translation: "We've been waiting for two hours.",
      },
      {
        english: 'Sigue trabajando en el mismo sitio.',
        translation: 'He keeps working at the same place.',
      },
      {
        english: 'Está a punto de empezar la película.',
        translation: 'The film is about to start.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Acabo llegar.',
        correct: 'Acabo de llegar.',
        note: '"Acabar" en perífrasis lleva "de".',
      },
      {
        wrong: 'Empecé estudiar.',
        correct: 'Empecé a estudiar.',
        note: '"Empezar" en perífrasis lleva "a".',
      },
      {
        wrong: 'Anda diciendo mentiras.',
        correct: 'Anda diciendo mentiras.',
        note: 'Correcto. "Andar + gerundio" es coloquial para acciones intermitentes.',
      },
    ],
    related: ['dejar-de-seguir', 'perifrasis-modales', 'presente-regular'],
  },
  {
    slug: 'perifrasis-modales',
    title: 'Perífrasis modales',
    level: 'B2',
    category: 'Verbos',
    summary:
      'Expresar obligación, necesidad o posibilidad: tener que, deber, hay que, poder, deber de.',
    structure: 'verbo modal + (preposición) + infinitivo',
    explanation:
      'Las **perífrasis modales** expresan la actitud del hablante ante la acción: obligación, probabilidad, capacidad, permiso.\n\n**Obligación y necesidad**:\n- *Tener que + infinitivo*: obligación personal, la más común. *Tengo que terminar esto.*\n- *Deber + infinitivo*: obligación moral o consejo. *Debes respetar las normas.*\n- *Hay que + infinitivo*: obligación impersonal. *Hay que estudiar para aprobar.*\n- *Hacer falta + infinitivo*: necesidad. *Hace falta comprar pan.*\n\n**Probabilidad**:\n- *Deber de + infinitivo*: conjetura. *Deben de ser las diez.* (Probablemente son las diez.)\n\n**Capacidad y permiso**:\n- *Poder + infinitivo*: capacidad o permiso. *Puedo nadar. / ¿Puedo salir?*\n\nLa diferencia entre *deber + infinitivo* (obligación) y *deber de + infinitivo* (probabilidad) se mantiene en el registro culto, aunque en el habla coloquial se usa indistintamente.',
    rules: [
      '"Tener que" = obligación personal.',
      '"Hay que" = obligación impersonal, general.',
      '"Deber" + infinitivo = obligación; "deber de" + infinitivo = conjetura.',
      '"Poder" expresa capacidad y permiso; va sin preposición.',
    ],
    examples: [
      {
        english: 'Tienes que ver esta película, es genial.',
        translation: "You have to see this film, it's great.",
      },
      {
        english: 'Hay que reciclar para proteger el medio ambiente.',
        translation: 'One must recycle to protect the environment.',
      },
      {
        english: 'Deben de estar dormidos, no contestan.',
        translation: "They must be asleep, they don't answer.",
        note: 'conjetura',
      },
      {
        english: 'No hace falta que vengas tan temprano.',
        translation: "You don't need to come so early.",
      },
    ],
    common_mistakes: [
      {
        wrong: 'Hay que reciclar.',
        correct: 'Hay que reciclar.',
        note: 'Correcto. "Hay que" es impersonal; no se conjuga para personas específicas.',
      },
      {
        wrong: 'Deben de llegar temprano mañana.',
        correct: 'Deben llegar temprano mañana.',
        note: 'Para obligación: "deber + infinitivo". "Deber de" es conjetura.',
      },
    ],
    related: [
      'perifrasis-aspectuales',
      'querer-poder',
      'imperativo-afirmativo',
    ],
  },
  {
    slug: 'dejar-de-seguir',
    title: 'Dejar de y seguir + gerundio',
    level: 'B2',
    category: 'Verbos',
    summary:
      'Dejar de + infinitivo (cesar) vs. seguir/continuar + gerundio (continuar).',
    structure:
      'dejar de + infinitivo (cesar) · seguir/continuar + gerundio (continuar)',
    explanation:
      '**Dejar de** y **seguir** expresan el cese y la continuación de una acción:\n\n**Dejar de + infinitivo**: interrumpir definitivamente una acción habitual.\n- *Dejé de fumar hace dos años.*\n- *No dejes de llamarme.* (imperativo negativo: no ceses de llamar.)\n\n**Seguir / Continuar + gerundio**: acción que no se ha interrumpido.\n- *Sigo viviendo en el mismo barrio.*\n- *A pesar de la lluvia, continuaron jugando.*\n\nContraste:\n- *Dejé de trabajar a las seis.* → Cesé de trabajar.\n- *Seguí trabajando hasta las diez.* → Continué trabajando.\n\n**Dejar sin de + infinitivo** significa "permitir": *Déjame hablar.* (permitir, no cesar.)',
    rules: [
      '"Dejar de + infinitivo" = cesar una acción.',
      '"Seguir/Continuar + gerundio" = mantener una acción en curso.',
      '"No dejar de" en imperativo = instar a no cesar: "No dejes de escribirme".',
      '"Dejar + infinitivo" (sin de) = permitir: "Déjame explicarte".',
    ],
    examples: [
      {
        english: 'Dejé de comer carne hace un año.',
        translation: 'I stopped eating meat a year ago.',
      },
      {
        english: 'Sigo pensando que tienes razón.',
        translation: "I still think you're right.",
      },
      {
        english: 'No dejes de practicar español todos los días.',
        translation: "Don't stop practicing Spanish every day.",
      },
      {
        english: 'Continuaron hablando hasta muy tarde.',
        translation: 'They kept talking until very late.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Dejé fumar.',
        correct: 'Dejé de fumar.',
        note: '"Dejar" con sentido de cesar necesita "de".',
      },
      {
        wrong: 'Sigo a trabajar aquí.',
        correct: 'Sigo trabajando aquí.',
        note: '"Seguir" con sentido de continuar rige gerundio sin preposición.',
      },
    ],
    related: [
      'perifrasis-aspectuales',
      'perifrasis-modales',
      'presente-regular',
    ],
  },
  {
    slug: 'conectores-avanzados',
    title: 'Conectores avanzados',
    level: 'B2',
    category: 'Oraciones',
    summary:
      'Conectores para la cohesión textual: no obstante, en cambio, por consiguiente, en efecto, asimismo.',
    explanation:
      'Los **conectores avanzados** elevan la formalidad y la precisión del discurso. Se usan en textos académicos, argumentativos y profesionales.\n\n**Adición**: *asimismo, igualmente, del mismo modo, por añadidura, es más*\n- *Es inteligente; es más, es brillante.*\n\n**Contraste y oposición**: *no obstante, en cambio, por el contrario, ahora bien, con todo, aun así*\n- *Hizo frío; no obstante, salimos.*\n\n**Consecuencia**: *por consiguiente, en consecuencia, de modo que, de manera que, así pues*\n- *No estudió; por consiguiente, suspendió.*\n\n**Reafirmación y explicación**: *en efecto, efectivamente, es decir, o sea, esto es, a saber*\n- *La situación, en efecto, era grave.*\n\n**Orden del discurso**: *en primer lugar, por último, para terminar, en resumen, en conclusión*',
    rules: [
      '"No obstante" = "sin embargo", formal.',
      '"En cambio" para contrastar dos realidades diferentes.',
      '"Por consiguiente" = consecuencia lógica, formal.',
      '"En efecto" confirma o reafirma lo dicho anteriormente.',
      'Los conectores suelen ir entre comas cuando se insertan en la oración.',
    ],
    examples: [
      {
        english:
          'El proyecto es ambicioso; no obstante, confiamos en su éxito.',
        translation:
          'The project is ambitious; nevertheless, we trust in its success.',
      },
      {
        english:
          'A mí me encanta el campo. Mi hermana, en cambio, prefiere la ciudad.',
        translation:
          'I love the countryside. My sister, on the other hand, prefers the city.',
      },
      {
        english:
          'No se presentaron pruebas; por consiguiente, el caso fue desestimado.',
        translation:
          'No evidence was presented; consequently, the case was dismissed.',
      },
      {
        english:
          'Los resultados han sido positivos. En efecto, hemos superado las expectativas.',
        translation:
          'The results have been positive. Indeed, we have exceeded expectations.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'No obstante, de la lluvia, salimos.',
        correct:
          'A pesar de la lluvia, salimos. / Llovía; no obstante, salimos.',
        note: '"No obstante" es conector oracional, no preposición.',
      },
    ],
    related: [
      'cohesion-textual',
      'conectores-argumentativos',
      'estructura-argumentativa',
    ],
  },
  {
    slug: 'cohesion-textual',
    title: 'Cohesión textual',
    level: 'B2',
    category: 'Oraciones',
    summary:
      'Mecanismos para unir ideas en un texto: anáfora, catáfora, elipsis, sustitución léxica.',
    explanation:
      'La **cohesión textual** es la propiedad que permite que las ideas de un texto estén conectadas de forma fluida. Se logra mediante varios mecanismos:\n\n**Referencia (anáfora y catáfora)**:\n- *Anáfora*: pronombre que remite a algo ya mencionado. *María llegó tarde. **Ella** siempre lo hace.*\n- *Catáfora*: pronombre que anticipa lo que se va a decir. *Te lo digo: **esto no funciona**.*\n\n**Sustitución léxica (sinónimos, hiperónimos)**:\n- *El **presidente** anunció medidas. El **mandatario** comparecerá mañana.*\n\n**Elipsis**:\n- Omitir elementos que se sobreentienden. *— ¿Quieres café? — Sí, quiero.* (elipsis de "café").\n\n**Conectores y marcadores discursivos**:\n- Unen párrafos y oraciones creando relaciones lógicas.',
    rules: [
      'La anáfora usa pronombres para evitar repeticiones.',
      'Los sinónimos e hiperónimos evitan la repetición y enriquecen el texto.',
      'La elipsis es frecuente en respuestas y diálogos.',
      'Los conectores discursivos guían al lector entre ideas.',
    ],
    examples: [
      {
        english: 'Compré un libro. Lo estoy leyendo ahora.',
        translation: "I bought a book. I'm reading it now.",
        note: 'anáfora: lo → libro',
      },
      {
        english: 'Te lo repito: no voy a ir.',
        translation: "I repeat it to you: I'm not going.",
        note: 'catáfora: lo anticipa "no voy a ir"',
      },
      {
        english: 'El león es un felino. Este animal vive en la sabana.',
        translation: 'The lion is a feline. This animal lives in the savannah.',
        note: 'sustitución léxica',
      },
      {
        english: '— ¿Vas a venir? — Sí.',
        translation: '"Are you coming?" "Yes."',
        note: 'elipsis: se omite "voy a venir"',
      },
    ],
    common_mistakes: [
      {
        wrong: 'María y Ana fueron. Ella llegó tarde.',
        correct: 'María y Ana fueron. María/Ana llegó tarde.',
        note: 'Cuando hay ambigüedad, es mejor repetir el nombre que usar un pronombre poco claro.',
      },
    ],
    related: [
      'conectores-avanzados',
      'estructura-argumentativa',
      'que-relativo',
    ],
  },
  {
    slug: 'registro-formal',
    title: 'Registro formal y coloquial',
    level: 'B2',
    category: 'Avanzado',
    summary:
      'Diferencias entre el español formal e informal: vocabulario, tratamiento, estructuras.',
    explanation:
      "El **registro** es la adaptación del lenguaje a la situación comunicativa. En español se distinguen varios niveles:\n\n**Registro formal**:\n- Uso de *usted/ustedes* en lugar de *tú/vosotros*.\n- Evitar contracciones coloquiales (*pa'* en lugar de *para*).\n- Vocabulario preciso y técnico.\n- Oraciones más largas y complejas.\n- Uso de pasiva refleja y estructuras impersonales.\n- Conectores formales (*no obstante, por consiguiente*).\n- *¿Podría decirme la hora?* en lugar de *¿Qué hora es?*\n\n**Registro coloquial**:\n- Uso de *tú/vos* y *vosotros/ustedes*.\n- Muletillas: *bueno, pues, o sea, ¿vale?, en plan, tipo...*\n- Frases hechas y expresiones idiomáticas.\n- Elipsis y frases inacabadas.\n- Diminutivos: *cafecito, momentito*.\n\nLa elección del registro depende del contexto, la relación entre interlocutores y la situación.",
    rules: [
      '"Usted" marca formalidad; "tú" marca cercanía. El uso varía por país.',
      'El registro formal evita muletillas y coloquialismos.',
      'En textos escritos formales se prefieren estructuras impersonales y pasivas.',
      'En situaciones informales se usan más las perífrasis que los tiempos compuestos.',
    ],
    examples: [
      {
        english: '¿Podría indicarme dónde está la estación?',
        translation: 'Could you tell me where the station is?',
        note: 'formal',
      },
      {
        english: 'Oye, ¿sabes dónde está la estación?',
        translation: 'Hey, do you know where the station is?',
        note: 'coloquial',
      },
      {
        english: 'Le agradecería que me enviara la documentación.',
        translation: 'I would appreciate it if you sent me the documentation.',
        note: 'formal',
      },
      {
        english: 'Mándame los papeles cuando puedas.',
        translation: 'Send me the papers when you can.',
        note: 'coloquial',
      },
    ],
    common_mistakes: [
      {
        wrong: '¿Puedes decirme la hora, señor director?',
        correct: '¿Podría decirme la hora, señor director?',
        note: 'Con un superior o en contexto formal, se usa "usted" y formas de cortesía.',
      },
    ],
    related: [
      'modismos-comunes',
      'expresiones-coloquiales',
      'estructura-argumentativa',
    ],
  },
  {
    slug: 'modismos-comunes',
    title: 'Modismos comunes del español',
    level: 'B2',
    category: 'Avanzado',
    summary:
      'Expresiones idiomáticas frecuentes: estar en las nubes, meter la pata, ser pan comido.',
    explanation:
      'Los **modismos** son expresiones fijas cuyo significado no se deduce de las palabras que las componen. Son fundamentales para sonar natural.\n\n**Modismos con partes del cuerpo**:\n- *Costar un ojo de la cara* → ser muy caro.\n- *No tener pelos en la lengua* → ser muy directo.\n- *Echar una mano* → ayudar.\n- *Meter la pata* → equivocarse.\n- *Estar hasta las narices* → estar harto.\n\n**Modismos con animales**:\n- *Ser un gallina* → ser cobarde.\n- *Estar como una cabra* → estar loco.\n- *Pagar el pato* → cargar con la culpa.\n\n**Modismos con comida**:\n- *Ser pan comido* → ser muy fácil.\n- *Dar calabazas* → rechazar a alguien.\n- *Ponerse como un tomate* → sonrojarse.\n\nLos modismos varían enormemente entre países. Un mismo significado puede expresarse con modismos distintos en España y Latinoamérica.',
    rules: [
      'Los modismos son expresiones fijas; no se pueden modificar sus elementos.',
      'Muchos modismos no son literales y deben aprenderse de memoria.',
      'Varían mucho entre regiones; un modismo español puede no entenderse en México.',
      'En registros formales se evitan los modismos.',
    ],
    examples: [
      {
        english: 'Ese coche cuesta un ojo de la cara.',
        translation: 'That car costs an arm and a leg.',
      },
      {
        english: 'Metí la pata al decirle su edad.',
        translation: 'I put my foot in it by telling him his age.',
      },
      {
        english: 'El examen fue pan comido.',
        translation: 'The exam was a piece of cake.',
      },
      {
        english: '¿Me echas una mano con las cajas?',
        translation: 'Can you give me a hand with the boxes?',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Esa casa cuesta un ojo.',
        correct: 'Esa casa cuesta un ojo de la cara.',
        note: 'El modismo completo es "costar un ojo de la cara".',
      },
      {
        wrong: 'Puse la pata.',
        correct: 'Metí la pata.',
        note: 'El modismo es "meter la pata", no "poner la pata".',
      },
    ],
    related: ['expresiones-coloquiales', 'refranes', 'registro-formal'],
  },
  {
    slug: 'expresiones-coloquiales',
    title: 'Expresiones coloquiales',
    level: 'B2',
    category: 'Avanzado',
    summary:
      'Muletillas, coletillas y expresiones del español cotidiano: pues, o sea, en plan, vale, venga.',
    explanation:
      'Las **expresiones coloquiales** son palabras y frases propias de la conversación informal. Dan fluidez, cercanía y naturalidad al discurso.\n\n**Muletillas conversacionales**:\n- *Pues... / Bueno...* → para ganar tiempo o suavizar.\n- *O sea... / Es decir...* → reformular.\n- *¿Vale? / ¿Sabes? / ¿No?* → buscar confirmación.\n- *En plan...* → introducir explicación (muy coloquial, especialmente en España).\n- *Venga / Vamos* → ánimo o cierre de conversación.\n\n**Coletillas y expresiones de reacción**:\n- *¡Qué fuerte! / ¡Qué barbaridad!* → sorpresa.\n- *¡Anda! / ¡Vaya!* → sorpresa o decepción.\n- *¡Qué guay! / ¡Qué chulo!* → aprobación (España).\n- *¡Qué padre! / ¡Qué chévere!* → aprobación (México / varios países).\n- *¡Qué rollo!* → aburrimiento o fastidio (España).',
    rules: [
      'Las muletillas son propias del registro oral e informal.',
      'Varían mucho entre países; "guay" es típico de España, "chévere" de Latinoamérica.',
      '"En plan" es muy coloquial y juvenil; evitar en contextos formales.',
      '"Vale" como afirmación es típico de España; en América se usa "OK", "dale", "listo", "ya".',
    ],
    examples: [
      {
        english: 'Pues... no sé qué decirte.',
        translation: "Well... I don't know what to tell you.",
      },
      {
        english: 'O sea, que al final no vienes.',
        translation: "So, in the end you're not coming.",
      },
      {
        english: '¡Qué guay! Me encanta tu casa nueva.',
        translation: 'How cool! I love your new house.',
        note: 'España',
      },
      {
        english: 'Estaba en plan "no me hables" y yo en plan "pues vale".',
        translation:
          'He was like "don\'t talk to me" and I was like "whatever".',
        note: 'muy coloquial',
      },
    ],
    common_mistakes: [
      {
        wrong: '¡Qué guay! Me encanta tu casa.',
        correct: '¡Qué guay! / ¡Qué chévere! / ¡Qué padre!',
        note: 'Correcto en España. En Latinoamérica usar expresiones locales equivalentes.',
      },
    ],
    related: ['modismos-comunes', 'registro-formal', 'espanol-latinoamerica'],
  },
  {
    slug: 'refranes',
    title: 'Refranes en español',
    level: 'B2',
    category: 'Avanzado',
    summary:
      'Proverbios populares que reflejan la sabiduría tradicional hispana.',
    explanation:
      'Los **refranes** son frases sentenciosas de origen popular que expresan una enseñanza o consejo. Forman parte importante de la cultura hispana.\n\n**Refranes sobre el tiempo**:\n- *A quien madruga, Dios le ayuda.* → El esfuerzo temprano tiene recompensa.\n- *No por mucho madrugar amanece más temprano.* → La impaciencia no acelera los procesos.\n- *Al mal tiempo, buena cara.* → Mantener el ánimo en la adversidad.\n\n**Refranes sobre prudencia**:\n- *Más vale pájaro en mano que ciento volando.* → Es mejor asegurar lo seguro.\n- *A caballo regalado no le mires el diente.* → No critiques los regalos.\n- *El que mucho abarca, poco aprieta.* → No intentes hacer demasiado a la vez.\n\n**Refranes sobre relaciones**:\n- *Dime con quién andas y te diré quién eres.* → Las compañías reflejan la persona.\n- *En boca cerrada no entran moscas.* → A veces es mejor callar.',
    rules: [
      'Los refranes son expresiones fijas; no se modifican.',
      'A menudo usan metáforas y rimas para ser memorables.',
      'Son propios del registro informal y conversacional.',
      'Muchos refranes tienen equivalentes en otras lenguas pero con imágenes diferentes.',
    ],
    examples: [
      {
        english: 'A quien madruga, Dios le ayuda.',
        translation: 'The early bird catches the worm.',
      },
      {
        english: 'Más vale tarde que nunca.',
        translation: 'Better late than never.',
      },
      {
        english: 'No hay mal que por bien no venga.',
        translation: 'Every cloud has a silver lining.',
      },
      {
        english: 'En boca cerrada no entran moscas.',
        translation: 'Silence is golden.',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Más vale pájaro que cien volando.',
        correct: 'Más vale pájaro en mano que ciento volando.',
        note: 'La forma correcta incluye "en mano" para contrastar lo seguro con lo incierto.',
      },
    ],
    related: ['modismos-comunes', 'expresiones-coloquiales', 'metaforas'],
  },
  {
    slug: 'estructura-argumentativa',
    title: 'Estructura argumentativa',
    level: 'B2',
    category: 'Oraciones',
    summary:
      'Construir argumentos sólidos: tesis, argumentos, contraargumentos y conclusión.',
    explanation:
      'Un **texto argumentativo** bien estructurado sigue una organización lógica:\n\n**1. Introducción – Tesis**:\n  Presenta el tema y la postura del autor de forma clara.\n  *En mi opinión, el teletrabajo debería ser una opción permanente.*\n\n**2. Desarrollo – Argumentos**:\n  Cada párrafo desarrolla una idea a favor con datos, ejemplos o razonamientos.\n  *En primer lugar, el teletrabajo reduce los desplazamientos...*\n  *Además, permite una mayor conciliación familiar...*\n\n**3. Contraargumentación**:\n  Se anticipan y refutan objeciones.\n  *Algunos sostienen que afecta a la productividad; sin embargo, los estudios demuestran...*\n\n**4. Conclusión**:\n  Resume la postura y refuerza la tesis.\n  *En conclusión, los beneficios del teletrabajo superan sus inconvenientes.*\n\nConectores: *en primer lugar, asimismo, por otra parte, sin embargo, en conclusión*.',
    rules: [
      'Toda argumentación parte de una tesis clara.',
      'Los argumentos deben estar respaldados por evidencia o razonamiento lógico.',
      'La contraargumentación fortalece el texto al anticipar objeciones.',
      'La conclusión no introduce ideas nuevas; sintetiza lo expuesto.',
    ],
    examples: [
      {
        english:
          'En mi opinión, estudiar idiomas desde pequeños es fundamental. En primer lugar, los niños tienen mayor plasticidad cerebral. Además, adquirir una segunda lengua favorece el desarrollo cognitivo.',
        translation:
          'In my opinion, learning languages from an early age is essential. First, children have greater brain plasticity. Moreover, acquiring a second language favors cognitive development.',
      },
      {
        english:
          'Hay quienes opinan que la tecnología aísla a las personas. No obstante, bien utilizada, facilita la comunicación y acerca a quienes están lejos.',
        translation:
          'Some people think that technology isolates people. However, when used well, it facilitates communication and brings closer those who are far away.',
      },
    ],
    common_mistakes: [],
    related: ['contraargumentacion', 'matizadores', 'conectores-avanzados'],
  },
  {
    slug: 'contraargumentacion',
    title: 'Contraargumentación',
    level: 'B2',
    category: 'Oraciones',
    summary: 'Técnicas para refutar ideas: concesión, objeción y refutación.',
    explanation:
      'La **contraargumentación** anticipa y responde a objeciones a la tesis defendida. Fortalece la argumentación al demostrar que se han considerado otros puntos de vista.\n\n**Estructura de la contraargumentación**:\n\n1. **Concesión** (reconocer parte de razón):\n   - *Es cierto que... / Admito que... / Reconozco que...*\n   - *Es cierto que el cambio climático tiene causas naturales, pero...*\n\n2. **Objeción** (presentar el argumento contrario):\n   - *Sin embargo, hay que tener en cuenta que...*\n   - *No obstante, esta visión olvida que...*\n\n3. **Refutación** (desmontar el argumento contrario):\n   - *Pero la evidencia demuestra que...*\n   - *Con todo, los datos indican lo contrario.*\n\nConectores útiles: *si bien, a pesar de que, aunque, con todo, aun así, pese a que, por más que, ahora bien*.',
    rules: [
      'La concesión muestra respeto por la opinión contraria.',
      'La refutación debe basarse en hechos, no en descalificaciones.',
      'Estructura típica: "Aunque + objeción, + tesis" o "tesis + a pesar de que + objeción".',
      'Usar conectores concesivos para introducir la voz contraria.',
    ],
    examples: [
      {
        english:
          'Aunque es cierto que las redes sociales pueden ser adictivas, su uso responsable ofrece grandes beneficios educativos y sociales.',
        translation:
          "Although it's true that social media can be addictive, its responsible use offers great educational and social benefits.",
      },
      {
        english:
          'Reconozco que la medida es costosa. Sin embargo, los beneficios a largo plazo justifican la inversión.',
        translation:
          'I acknowledge that the measure is expensive. However, the long-term benefits justify the investment.',
      },
    ],
    common_mistakes: [],
    related: [
      'estructura-argumentativa',
      'matizadores',
      'conectores-avanzados',
    ],
  },
  {
    slug: 'matizadores',
    title: 'Matizadores discursivos',
    level: 'B2',
    category: 'Oraciones',
    summary:
      'Atenuar o reforzar afirmaciones: quizás, en cierto modo, sin duda, indudablemente.',
    explanation:
      'Los **matizadores** son elementos lingüísticos que permiten modular la fuerza de una afirmación:\n\n**Atenuadores** (suavizan la afirmación):\n- *Quizás, tal vez, a lo mejor, probablemente, posiblemente*\n- *En cierto modo, hasta cierto punto, en cierta medida*\n- *Me parece que, creo que, diría que, tengo la impresión de que*\n- *Un poco, algo, más bien, como que*\n\n**Intensificadores** (refuerzan la afirmación):\n- *Sin duda, indudablemente, sin lugar a dudas*\n- *Es evidente que, está claro que, es obvio que*\n- *Totalmente, absolutamente, completamente*\n- *Desde luego, por supuesto, ni que decir tiene*\n\nEl uso de matizadores refleja la postura del hablante y su grado de certeza. En español es frecuente atenuar para ser cortés o evitar imponerse, mientras que en inglés se tiende a ser más directo.',
    rules: [
      'Los atenuadores suavizan la fuerza de lo dicho; útiles para ser cortés o cauteloso.',
      'Los intensificadores muestran seguridad y convicción.',
      'En contextos académicos se prefiere atenuar con "parece que" en lugar de afirmar categóricamente.',
      '"Sin duda" y equivalentes solo se usan cuando hay certeza total.',
    ],
    examples: [
      {
        english: 'Quizás deberíamos considerar otras opciones.',
        translation: 'Perhaps we should consider other options.',
        note: 'atenuador',
      },
      {
        english: 'Sin duda, este es el mejor restaurante de la ciudad.',
        translation:
          'Without a doubt, this is the best restaurant in the city.',
        note: 'intensificador',
      },
      {
        english: 'Me parece que no es la mejor solución.',
        translation: "I think it's not the best solution.",
        note: 'atenuador',
      },
      {
        english: 'Está claro que tenemos que actuar ya.',
        translation: "It's clear that we have to act now.",
        note: 'intensificador',
      },
    ],
    common_mistakes: [],
    related: [
      'estructura-argumentativa',
      'contraargumentacion',
      'conectores-avanzados',
    ],
  },
  {
    slug: 'tiempos-narrativos',
    title: 'Tiempos narrativos',
    level: 'B2',
    category: 'Tiempos Verbales',
    summary:
      'Dominar la narración: alternancia de imperfecto, indefinido y pluscuamperfecto.',
    explanation:
      'Una **narración** bien construida combina varios tiempos para crear profundidad temporal:\n\n**Presente narrativo o histórico**:\n- Da inmediatez a hechos pasados: *Colón **llega** a las costas de Guanahaní en 1492.*\n\n**Imperfecto**: trasfondo, descripción, circunstancias:\n- *Era una noche lluviosa. Los relámpagos iluminaban el cielo.*\n\n**Indefinido**: eventos principales que hacen avanzar la acción:\n- *De pronto, la puerta **chirrió** y una sombra **apareció** en el umbral.*\n\n**Pluscuamperfecto**: lo ya ocurrido antes del momento narrado:\n- *Nunca **había sentido** tanto miedo como aquella noche.*\n\n**Pretérito perfecto**: valoración o comentario desde el presente:\n- *Y esa es la historia más aterradora que **he vivido**.*',
    rules: [
      'El presente narrativo da viveza al relato pero debe usarse de forma consistente.',
      'Imperfecto = fondo; indefinido = acción. Combinarlos crea ritmo narrativo.',
      'Pluscuamperfecto para flashbacks dentro de un relato en pasado.',
      'Los diálogos en una narración usan los tiempos normales del habla.',
    ],
    examples: [
      {
        english:
          'Era una noche oscura. El viento soplaba con fuerza. De repente, escuché un ruido. Alguien había entrado en la casa.',
        translation:
          'It was a dark night. The wind was blowing hard. Suddenly, I heard a noise. Someone had entered the house.',
      },
      {
        english:
          'Napoleón nace en Córcega en 1769. A los dieciséis años ingresa en la academia militar.',
        translation:
          'Napoleon is born in Corsica in 1769. At sixteen he enters the military academy.',
        note: 'presente histórico',
      },
    ],
    common_mistakes: [],
    related: [
      'secuencia-temporal',
      'imperfecto',
      'preterito-vs-imperfecto',
      'pluscuamperfecto',
    ],
  },
  {
    slug: 'descripcion-literaria',
    title: 'Descripción literaria',
    level: 'B2',
    category: 'Avanzado',
    summary:
      'Técnicas para describir ambientes y personajes con riqueza expresiva.',
    explanation:
      'La **descripción literaria** va más allá de enumerar rasgos: busca crear una impresión sensorial y emocional en el lector.\n\n**Técnicas descriptivas**:\n\n1. **Adjetivación**: uso de adjetivos antepuestos (valorativos) y pospuestos (especificativos).\n   - *La **blanca** nieve cubría las **calles empedradas**.*\n\n2. **Imágenes sensoriales**: apelar a los cinco sentidos.\n   - *El aroma **dulzón** de las rosas se mezclaba con el **tintineo** lejano de una guitarra.*\n\n3. **Símil y metáfora**: comparaciones que enriquecen la imagen.\n   - *Sus ojos **eran como dos luceros**. / El mar **era un espejo**.*\n\n4. **Enumeración y gradación**: acumular detalles en orden creciente o decreciente.\n   - *Era un pueblo pequeño, tranquilo, casi deshabitado.*\n\nVerbos descriptivos en imperfecto: *era, estaba, había, parecía, se alzaba, se extendía*.',
    rules: [
      'Usar imperfecto para descripciones estáticas de fondo.',
      'La adjetivación antepuesta suele ser valorativa; la pospuesta, objetiva.',
      'Combinar sensaciones (vista, oído, olfato, tacto, gusto) para mayor inmersión.',
      'Evitar la acumulación excesiva de adjetivos que ralentice la narración.',
    ],
    examples: [
      {
        english:
          'El sol se ocultaba tras las montañas, tiñendo el cielo de tonos anaranjados y violetas. Una brisa cálida mecía las hojas de las palmeras.',
        translation:
          'The sun was setting behind the mountains, dyeing the sky with orange and violet tones. A warm breeze swayed the palm leaves.',
      },
      {
        english:
          'Era una mujer alta, de andar pausado y mirada serena. Su voz, grave y melodiosa, inspiraba confianza.',
        translation:
          'She was a tall woman, with a slow walk and a serene gaze. Her voice, deep and melodious, inspired trust.',
      },
    ],
    common_mistakes: [],
    related: ['metaforas', 'tiempos-narrativos', 'figuras-literarias'],
  },
  {
    slug: 'metaforas',
    title: 'Metáforas y símiles en español',
    level: 'B2',
    category: 'Avanzado',
    summary:
      'Recursos literarios para embellecer el discurso: metáfora, símil, personificación, hipérbole.',
    explanation:
      'Las **figuras retóricas** enriquecen el discurso cotidiano y literario:\n\n**Símil o comparación**: compara dos elementos con "como" o "parece".\n- *Eres **como** un sol. / Duerme **como** un lirón.*\n\n**Metáfora**: identifica dos elementos sin nexo comparativo.\n- *Tus ojos **son** dos estrellas.* (metáfora impura, con "ser")\n- *Las perlas de tu boca.* (metáfora pura: dientes = perlas)\n\n**Personificación**: atribuir cualidades humanas a objetos o animales.\n- *El viento **susurraba** entre los árboles.*\n\n**Hipérbole**: exageración.\n- *Te lo he dicho **un millón de veces**.*\n- *Me muero de hambre.*\n\n**Metonimia**: designar una cosa con el nombre de otra por relación.\n- *Se bebió **una botella**.* (el contenido por el continente)\n\nEn el español cotidiano abundan las metáforas fosilizadas: *romper el hielo, lluvia de ideas, estar en una nube, el tiempo vuela*.',
    rules: [
      'El símil usa "como" o "parece"; la metáfora identifica sin nexo.',
      'La personificación es muy frecuente en la lengua coloquial.',
      'Las metáforas fosilizadas se usan sin conciencia de su origen literario.',
      'En registros formales se prefiere la metáfora original a la frase hecha.',
    ],
    examples: [
      {
        english: 'Está que echa chispas.',
        translation: "He's fuming.",
        note: 'metáfora coloquial',
      },
      {
        english: 'El tiempo es oro.',
        translation: 'Time is gold/money.',
        note: 'metáfora',
      },
      {
        english: 'Eres más lento que una tortuga.',
        translation: "You're slower than a turtle.",
        note: 'símil',
      },
      {
        english: 'Las estrellas nos miraban desde el cielo.',
        translation: 'The stars were watching us from the sky.',
        note: 'personificación',
      },
    ],
    common_mistakes: [],
    related: [
      'descripcion-literaria',
      'figuras-literarias',
      'modismos-comunes',
    ],
  },
  {
    slug: 'lenguaje-periodistico',
    title: 'Lenguaje periodístico',
    level: 'B2',
    category: 'Avanzado',
    summary:
      'Características del español de los medios: objetividad, concisión, titulares, voz pasiva.',
    explanation:
      'El **lenguaje periodístico** tiene rasgos propios que lo distinguen:\n\n**Características**:\n- **Concisión y claridad**: frases cortas, una idea por párrafo.\n- **Objetividad aparente**: uso de tercera persona, voz pasiva, se impersonal.\n- **Estructura de pirámide invertida**: lo más importante al principio.\n\n**Titulares**:\n- Suprimen artículos y verbos auxiliares: *Detenido el presunto ladrón.*\n- Uso frecuente de participios y nominalizaciones.\n- Prefieren el presente para dar inmediatez: *El presidente **viaja** hoy a Bruselas.*\n\n**Fórmulas periodísticas**:\n- *Según fuentes... / De acuerdo con... / Al parecer...*\n- *Se ha producido un... / Ha tenido lugar...*\n- *En declaraciones a este medio...*\n\n**Géneros**: noticia, reportaje, crónica, entrevista, editorial, columna de opinión. Cada uno tiene convenciones propias.',
    rules: [
      'Los titulares omiten artículos y usan presente por pasado.',
      'La voz pasiva y el "se" impersonal son frecuentes para mantener objetividad.',
      '"Según" y "de acuerdo con" para citar fuentes sin comprometerse.',
      'Las noticias no incluyen opiniones del periodista; los editoriales sí.',
    ],
    examples: [
      {
        english:
          'Aprobada la nueva ley de educación tras un intenso debate parlamentario.',
        translation:
          'New education law approved after intense parliamentary debate.',
        note: 'titular: participio + sujeto',
      },
      {
        english:
          'Según fuentes cercanas al gobierno, la medida se anunciará la próxima semana.',
        translation:
          'According to sources close to the government, the measure will be announced next week.',
      },
    ],
    common_mistakes: [],
    related: ['titulares', 'discurso-reportado', 'voz-pasiva', 'se-impersonal'],
  },
  {
    slug: 'titulares',
    title: 'Titulares periodísticos',
    level: 'B2',
    category: 'Avanzado',
    summary: 'Cómo leer y entender los titulares de prensa en español.',
    explanation:
      'Los **titulares** en español tienen una gramática peculiar, diseñada para la brevedad y el impacto:\n\n**Omisión de artículos**:\n- *Gobierno anuncia nuevas medidas.* (no "El gobierno...")\n- *Policía detiene a tres sospechosos.*\n\n**Participio sin auxiliar**:\n- *Hallado el cuerpo de un montañero desaparecido.* (= Ha sido hallado)\n- *Heridas dos personas en un accidente de tráfico.*\n\n**Presente por pasado o futuro**:\n- *Fallece el actor a los 85 años.* (por falleció)\n- *La ONU debate hoy la crisis climática.*\n\n**Infinitivo para acciones futuras**:\n- *Abrir un nuevo hospital en la zona norte.* (= Se abrirá / Van a abrir)\n\n**Estilo nominal**:\n- *Protestas masivas en el centro de la capital.* (sin verbo)\n\n**Dos puntos** para separar tema y comentario:\n- *Crisis energética: el gobierno busca soluciones urgentes.*',
    rules: [
      'En titulares se omiten artículos y auxiliares.',
      'El participio suelto equivale a pasiva.',
      'El presente da inmediatez a hechos pasados.',
      'El infinitivo anuncia acciones futuras con tono neutro.',
      'Los dos puntos sustituyen al verbo "ser" o introducen explicación.',
    ],
    examples: [
      {
        english: 'Rescatados diez inmigrantes en la costa de Almería.',
        translation: 'Ten immigrants rescued off the coast of Almería.',
        note: 'participio suelto',
      },
      {
        english: 'Sanidad: la espera media para una operación baja a 90 días.',
        translation:
          'Healthcare: the average wait for an operation drops to 90 days.',
        note: 'dos puntos',
      },
      {
        english: 'Aumentar el salario mínimo un 5% el próximo año.',
        translation: 'Minimum wage to increase by 5% next year.',
        note: 'infinitivo de futuro',
      },
    ],
    common_mistakes: [],
    related: ['lenguaje-periodistico', 'discurso-reportado', 'voz-pasiva'],
  },
  {
    slug: 'discurso-reportado',
    title: 'Discurso reportado en prensa',
    level: 'B2',
    category: 'Estilo Indirecto',
    summary:
      'Cómo la prensa cita a las fuentes: verbos de habla, citas textuales e indirectas.',
    explanation:
      'El **discurso reportado en prensa** combina verbos de habla con citas directas e indirectas para atribuir información a fuentes.\n\n**Verbos de habla periodísticos**:\n- Neutros: *decir, declarar, manifestar, señalar, indicar, afirmar*\n- De énfasis: *recalcar, subrayar, insistir en, hacer hincapié en*\n- De matiz: *apuntar, sugerir, insinuar, dar a entender*\n- De contraste: *replicar, rebatir, objetar, contradecir*\n\n**Citas textuales**:\n- Con verbo antepuesto: *El presidente afirmó: "La economía crecerá".*\n- Con verbo pospuesto o interpolado: *"La economía crecerá", afirmó el presidente.*\n\n**Citas indirectas**:\n- *El presidente afirmó que la economía crecería.* (estilo indirecto con cambio de tiempos.)\n- *Según el presidente, la economía crecerá.* (estructura con "según".)',
    rules: [
      'Variar los verbos de habla evita la monotonía de "dijo que... dijo que...".',
      'Citas textuales van entre comillas con verbo en pasado o presente.',
      'Citas indirectas requieren correlación de tiempos.',
      '"Según + fuente" es fórmula estándar para atribución.',
    ],
    examples: [
      {
        english:
          'El ministro aseguró que las medidas "darán resultados en el corto plazo".',
        translation:
          'The minister assured that the measures "will yield results in the short term".',
      },
      {
        english:
          'Según testigos presenciales, el incendio comenzó sobre las tres de la madrugada.',
        translation:
          'According to eyewitnesses, the fire started around three in the morning.',
      },
      {
        english: '"No vamos a tolerar la violencia", recalcó el alcalde.',
        translation: '"We will not tolerate violence," the mayor emphasized.',
      },
    ],
    common_mistakes: [],
    related: [
      'lenguaje-periodistico',
      'titulares',
      'estilo-indirecto',
      'estilo-indirecto-pasado',
    ],
  },

  /* ═══ C1 ═══ */

  {
    slug: 'subjuntivo-concesivo',
    title: 'Subjuntivo concesivo',
    level: 'C1',
    category: 'Subjuntivo',
    summary:
      'Expresar objeción o contraste con aunque, a pesar de que, por más que + subjuntivo.',
    structure:
      'aunque / a pesar de que / por más que / por mucho que + subjuntivo',
    explanation:
      'Las **oraciones concesivas** expresan una objeción o contraste que no impide el cumplimiento de la acción principal. Pueden llevar indicativo o subjuntivo según el matiz:\n\n**Indicativo**: la objeción es un hecho real, conocido.\n- *Aunque **llueve**, saldré a correr.* (Sé que llueve.)\n\n**Subjuntivo**: la objeción es hipotética, desconocida o irrelevante.\n- *Aunque **llueva**, saldré.* (No sé si lloverá o no; da igual.)\n- *Aunque **lloviera**, saldría.* (Hipótesis improbable.)\n\n**Conectores concesivos**:\n- *aunque, a pesar de que, pese a que, si bien, aun cuando*\n- *por más que, por mucho que, por muy + adjetivo + que*\n- *por poco que, por + adjetivo + que*\n\n*Por más que lo intento, no lo consigo.* (indicativo: es un hecho.)\n*Por más que lo intente, no lo conseguiré.* (subjuntivo: hipótesis.)',
    rules: [
      'Concesivas con indicativo: hecho real. Con subjuntivo: hipotético o irrelevante.',
      '"Aunque" + presente de subjuntivo = no sé si ocurre; "aunque" + imperfecto de subjuntivo = improbable.',
      '"Por más que" + subjuntivo refuerza la idea de que el obstáculo no importa.',
      '"Por muy + adjetivo + que" siempre con subjuntivo: "Por muy difícil que sea".',
    ],
    examples: [
      {
        english: 'Aunque no estés de acuerdo, respeto tu opinión.',
        translation: "Even if you don't agree, I respect your opinion.",
        note: 'subjuntivo: hipotético',
      },
      {
        english: 'Por más que se lo explico, no lo entiende.',
        translation:
          "No matter how much I explain it to him, he doesn't understand.",
        note: 'indicativo: hecho real',
      },
      {
        english: 'Por muy cansado que esté, siempre ayuda a los demás.',
        translation: 'No matter how tired he is, he always helps others.',
      },
      {
        english: 'Aunque me lo hubieras dicho antes, no habría podido ir.',
        translation:
          "Even if you had told me earlier, I wouldn't have been able to go.",
      },
    ],
    common_mistakes: [
      {
        wrong: 'Aunque llueva, sé que está lloviendo.',
        correct:
          'Aunque llueve, sé que está lloviendo. / Aunque llueva, saldré.',
        note: 'Si el hecho es conocido, se usa indicativo. El subjuntivo implica incertidumbre.',
      },
    ],
    related: [
      'subjuntivo-final',
      'subjuntivo-relativo',
      'subjuntivo-presente',
      'contraargumentacion',
    ],
  },
  {
    slug: 'subjuntivo-final',
    title: 'Subjuntivo final',
    level: 'C1',
    category: 'Subjuntivo',
    summary:
      'Expresar finalidad con para que, a fin de que, con el objeto de que + subjuntivo.',
    structure:
      'para que / a fin de que / con el objeto de que / con tal de que + subjuntivo',
    explanation:
      'Las **oraciones finales** expresan la finalidad o propósito de una acción. En español, cuando el sujeto de la principal y de la final es **distinto**, se usa **subjuntivo**:\n\n- *Te llamo para que **vengas**.* (yo llamo ≠ tú vienes)\n- *Cerré la puerta para que no **entrara** el frío.* (yo cerré ≠ el frío entraba)\n\nCuando el sujeto es el **mismo**, se usa **infinitivo**:\n- *Voy al gimnasio para estar en forma.* (yo voy + yo estoy)\n\n**Conectores finales**:\n- *para que, a fin de que, con el objeto de que, con el propósito de que*\n- *con tal de que* (condición mínima suficiente).\n- *no sea que / no vaya a ser que* (finalidad negativa, precaución).\n\n*Lleva el paraguas, no sea que llueva.*',
    rules: [
      'Finales con sujeto distinto: para que + subjuntivo.',
      'Finales con mismo sujeto: para + infinitivo.',
      '"No sea que" + subjuntivo expresa cautela o temor.',
      'Con verbo principal en pasado, la final va en imperfecto de subjuntivo: "Fui para que me vieras".',
    ],
    examples: [
      {
        english: 'Te lo explico para que lo entiendas mejor.',
        translation: 'I explain it to you so that you understand it better.',
      },
      {
        english: 'Habla más alto para que todos te oigan.',
        translation: 'Speak louder so that everyone can hear you.',
      },
      {
        english: 'Salí temprano a fin de que no me pillara el tráfico.',
        translation: "I left early so that I wouldn't get caught in traffic.",
      },
      {
        english: 'Lleva el abrigo, no sea que haga frío.',
        translation: "Take your coat, in case it's cold.",
      },
    ],
    common_mistakes: [
      {
        wrong: 'Te llamo para que vienes.',
        correct: 'Te llamo para que vengas.',
        note: '"Para que" siempre rige subjuntivo.',
      },
      {
        wrong: 'Fui para que me veas.',
        correct: 'Fui para que me vieras.',
        note: 'Con verbo principal en pasado, la final va en imperfecto de subjuntivo.',
      },
    ],
    related: [
      'subjuntivo-concesivo',
      'subjuntivo-relativo',
      'concordancia-temporal',
    ],
  },
  {
    slug: 'subjuntivo-relativo',
    title: 'Subjuntivo en oraciones de relativo',
    level: 'C1',
    category: 'Subjuntivo',
    summary:
      'Uso del subjuntivo en oraciones de relativo para expresar antecedente desconocido o inexistente.',
    structure: 'antecedente (desconocido/negado) + que + subjuntivo',
    explanation:
      'En las **oraciones de relativo**, la elección entre indicativo y subjuntivo depende del conocimiento o la existencia del antecedente:\n\n**Indicativo**: antecedente conocido, específico, que existe.\n- *Busco al profesor **que habla** japonés.* (Sé que hay uno; lo busco.)\n\n**Subjuntivo**: antecedente desconocido, inespecífico, que quizá no existe.\n- *Busco un profesor **que hable** japonés.* (No sé si existe; lo necesito.)\n\n**Negación del antecedente**:\n- *No hay nadie **que sepa** la respuesta.* (No existe tal persona.)\n- *No encontré ningún libro **que me gustara**.*\n\n**Superlativo o expresiones de unicidad**:\n- *Es el mejor libro **que haya leído** nunca.*\n- *La única persona **que pueda** ayudarte es ella.*',
    rules: [
      'Indicativo en la relativa: antecedente específico y conocido.',
      'Subjuntivo en la relativa: antecedente inespecífico, hipotético o negado.',
      'Con "el/la/los/las + que" en oraciones explicativas se usa indicativo.',
      'Tras superlativo o palabras como "único/primero/último" es frecuente el subjuntivo.',
    ],
    examples: [
      {
        english: 'Busco una casa que tenga jardín.',
        translation: "I'm looking for a house that has a garden.",
        note: 'subjuntivo: no sé si existe',
      },
      {
        english: 'Busco la casa que tiene la puerta azul.',
        translation: "I'm looking for the house that has the blue door.",
        note: 'indicativo: sé que existe',
      },
      {
        english: 'No hay nadie que sepa tocar el piano aquí.',
        translation: 'There is no one who knows how to play the piano here.',
      },
      {
        english: 'Es lo mejor que me haya pasado en la vida.',
        translation: "It's the best thing that has ever happened to me.",
      },
    ],
    common_mistakes: [
      {
        wrong: 'Busco alguien que habla inglés.',
        correct: 'Busco a alguien que hable inglés.',
        note: 'Antecedente inespecífico → subjuntivo.',
      },
      {
        wrong: 'No hay nadie que sabe la respuesta.',
        correct: 'No hay nadie que sepa la respuesta.',
        note: 'Antecedente negado → subjuntivo.',
      },
    ],
    related: [
      'subjuntivo-concesivo',
      'subjuntivo-final',
      'que-relativo',
      'superlativos',
    ],
  },
  {
    slug: 'pasiva-refleja',
    title: 'Pasiva refleja avanzada',
    level: 'C1',
    category: 'Voz Pasiva',
    summary:
      'Usos avanzados de la pasiva refleja en registros formales y académicos.',
    explanation:
      'La **pasiva refleja** con "se" es la forma pasiva predominante en español. En niveles avanzados se dominan sus matices:\n\n**Pasiva refleja vs. impersonal con se**:\n- *Se vende piso.* → pasiva refleja (sujeto: piso; concuerda).\n- *Se vende pisos.* → impersonal (verbo en singular; menos frecuente).\n\n**Con verbos de percepción y comunicación**:\n- *Se oyeron disparos.* / *Se comenta que dimitirá.*\n\n**En textos académicos y científicos**:\n- *Se analizaron los datos. / Se observó un aumento.*\n\n**Diferencias dialectales**:\n- En algunas zonas de América se prefiere la impersonal con "se" + verbo en singular incluso con complemento plural: *Se vende casas* (frecuente en carteles, aunque la norma culta prefiere *Se venden casas*).\n\n**Pasiva refleja con verbos pronominales**:\n- No se puede usar si el verbo ya lleva "se" pronominal: *~~Se se arrepintió~~* → Impersonal con "uno": *Uno se arrepiente*.',
    rules: [
      'En la pasiva refleja el verbo concuerda con el sujeto paciente.',
      'En textos académicos se prefiere la pasiva refleja a la pasiva con "ser".',
      'Con verbos ya pronominales no se puede usar pasiva refleja.',
      'La impersonal con "se" + verbo singular es frecuente pero menos normativa con objetos plurales.',
    ],
    examples: [
      {
        english: 'Se analizaron más de mil muestras en el laboratorio.',
        translation: 'More than a thousand samples were analyzed in the lab.',
      },
      {
        english: 'Se espera que las temperaturas bajen en los próximos días.',
        translation: 'Temperatures are expected to drop in the coming days.',
      },
      {
        english:
          'En esta revista se publican artículos de divulgación científica.',
        translation:
          'In this magazine, science communication articles are published.',
      },
    ],
    common_mistakes: [],
    related: ['se-pasivo', 'se-impersonal', 'voz-pasiva'],
  },
  {
    slug: 'nominalizacion',
    title: 'Nominalización',
    level: 'C1',
    category: 'Avanzado',
    summary:
      'Transformar verbos y adjetivos en sustantivos para crear textos más densos y formales.',
    structure:
      'verbo/adjetivo → sustantivo abstracto (-ción, -miento, -dad, -eza, -ancia...)',
    explanation:
      'La **nominalización** consiste en convertir verbos o adjetivos en sustantivos, lo que permite condensar información y dar un tono más formal y abstracto al discurso.\n\n**Sufijos de nominalización**:\n- *-ción/-sión*: construir → construcción, decidir → decisión\n- *-miento*: pensar → pensamiento, conocer → conocimiento\n- *-dad/-tad*: libre → libertad, bueno → bondad\n- *-eza*: triste → tristeza, rico → riqueza\n- *-ancia/-encia*: tolerar → tolerancia, creer → creencia\n- *-ismo*: optimista → optimismo\n\n**Ventajas de la nominalización**:\n- Economía lingüística: *La construcción del puente se retrasó* (en lugar de *Construir el puente se retrasó*).\n- Impersonalidad: *Se procedió a la revisión de los documentos.*\n\n**Abuso de la nominalización**: en exceso produce textos farragosos. *Proceder a la realización de un estudio* en lugar de *Estudiar*.',
    rules: [
      'Las nominalizaciones son propias de registros formales, académicos y administrativos.',
      'Abusar de ellas genera textos pesados y difíciles de leer.',
      'En textos claros se prefiere el verbo a la nominalización innecesaria.',
      'La nominalización permite tematizar la acción como objeto de análisis.',
    ],
    examples: [
      {
        english: 'La destrucción del hábitat natural es una amenaza grave.',
        translation:
          'The destruction of the natural habitat is a serious threat.',
      },
      {
        english: 'Se ha producido un aumento significativo de la demanda.',
        translation: 'There has been a significant increase in demand.',
      },
      {
        english: 'La falta de comunicación fue la causa del conflicto.',
        translation: 'The lack of communication was the cause of the conflict.',
      },
    ],
    common_mistakes: [],
    related: ['impersonalidad', 'registro-formal', 'cohesion-textual'],
  },
  {
    slug: 'impersonalidad',
    title: 'Impersonalidad en el discurso formal',
    level: 'C1',
    category: 'Avanzado',
    summary:
      'Mecanismos para ocultar el agente o generalizar: se, uno, pasiva, nominalización.',
    explanation:
      'La **impersonalidad** es un rasgo del discurso formal, académico y científico. Se logra por varios medios:\n\n**Construcciones con "se"**:\n- *Se recomienda reservar con antelación.*\n- *Se puede observar una tendencia al alza.*\n\n**El pronombre "uno"**:\n- *Uno no sabe qué hacer en estas situaciones.*\n- *Cuando uno viaja, se da cuenta de otras realidades.*\n\n**Voz pasiva**:\n- *Los resultados fueron analizados por un equipo de expertos.*\n\n**Nominalización**:\n- *La implementación de la medida se llevará a cabo en enero.*\n\n**Tercera persona plural indeterminada**:\n- *Llaman a la puerta. / Dicen que va a nevar.*\n\n**Infinitivo con valor impersonal**:\n- *Prohibido fumar. / Conviene madrugar.*',
    rules: [
      '"Se" es el recurso más versátil para impersonalizar.',
      '"Uno" personaliza ligeramente pero mantiene generalidad.',
      'La tercera persona plural indeterminada es común en la lengua oral.',
      'El abuso de la impersonalidad puede hacer el texto frío y distante.',
    ],
    examples: [
      {
        english:
          'Se ha demostrado que el ejercicio regular mejora la salud mental.',
        translation:
          'It has been shown that regular exercise improves mental health.',
      },
      {
        english: 'Cuando uno aprende un idioma, descubre otra cultura.',
        translation:
          'When one learns a language, one discovers another culture.',
      },
      {
        english: 'Dicen que el precio de la vivienda va a bajar.',
        translation: 'They say that the price of housing is going to go down.',
      },
    ],
    common_mistakes: [],
    related: ['nominalizacion', 'se-impersonal', 'voz-pasiva'],
  },
  {
    slug: 'campos-semanticos',
    title: 'Campos semánticos y precisión léxica',
    level: 'C1',
    category: 'Avanzado',
    summary:
      'Agrupar palabras por significado para ampliar vocabulario con precisión.',
    explanation:
      'Un **campo semántico** es un conjunto de palabras relacionadas por su significado. Dominar los matices entre palabras de un mismo campo permite una comunicación más precisa.\n\n**Ejemplos de campos semánticos**:\n\n**Movimiento**: *andar, caminar, deambular, pasear, vagar, errar, marchar, desfilar, corretear, trotar*\n- No es lo mismo *caminar* (neutro) que *deambular* (sin rumbo) o *desfilar* (en formación).\n\n**Habla**: *decir, hablar, pronunciar, declarar, afirmar, susurrar, murmurar, gritar, vociferar, balbucear, tartamudear*\n- *Susurrar* es hablar bajito; *vociferar* es gritar con furia.\n\n**Mirada**: *ver, mirar, observar, contemplar, examinar, ojear, atisbar, vislumbrar, escrutar, divisar*\n- *Contemplar* implica admiración; *escrutar* implica análisis minucioso.\n\n**Temperatura**: *caliente, cálido, templado, tibio, fresco, frío, gélido, helado*\n- *Tibio* es menos que caliente; *gélido* es extremadamente frío.',
    rules: [
      'Los sinónimos dentro de un campo semántico rara vez son intercambiables al 100%.',
      'Cada palabra tiene matices de intensidad, formalidad o contexto.',
      'Consultar diccionarios de uso y de sinónimos para afinar la precisión.',
      'En contextos formales se prefiere la palabra más precisa ("manifestar" en lugar de "decir").',
    ],
    examples: [
      {
        english:
          'No es lo mismo decir "hace frío" que "hace un frío gélido". La segunda opción intensifica.',
        translation:
          'It\'s not the same to say "it\'s cold" as "it\'s freezing cold". The second option intensifies.',
      },
      {
        english:
          'En el artículo el periodista no "dice", sino que "sostiene" o "argumenta".',
        translation:
          'In the article, the journalist doesn\'t just "say", but rather "maintains" or "argues".',
      },
    ],
    common_mistakes: [],
    related: ['precision-lexica', 'derivacion', 'registro-formal'],
  },
  {
    slug: 'derivacion',
    title: 'Derivación y familias de palabras',
    level: 'C1',
    category: 'Avanzado',
    summary:
      'Formar nuevas palabras con prefijos y sufijos: aumentar, disminuir o matizar el significado.',
    explanation:
      'La **derivación** es el mecanismo por el cual se forman nuevas palabras añadiendo prefijos y sufijos a una raíz.\n\n**Prefijos productivos**:\n- *re-* (repetición): rehacer, releer, reescribir\n- *des-* (negación, inversión): deshacer, desconectar, desconfiar\n- *in-/im-/i-* (negación): incapaz, imposible, ilegal\n- *pre-* (anterioridad): predecir, prejuzgar, precocinar\n- *sobre-* (exceso): sobrevalorar, sobrecargar, sobrevolar\n- *sub-* (debajo, inferior): subestimar, subterráneo, subtítulo\n- *inter-* (entre): internacional, intercambiar, interconectar\n- *multi-/pluri-* (muchos): multinacional, pluriempleo\n- *anti-* (oposición): antinatural, antivirus, antirrobo\n\n**Sufijos productivos**:\n- *-ble* (capacidad): comible, lavable, creíble\n- *-dor/-dora* (agente): trabajador, escritora, conductor\n- *-ería* (lugar, actividad): panadería, carnicería\n- *-azo* (golpe, aumentativo): portazo, golazo, cochazo\n- *-ito/-illo* (diminutivo): poquito, chiquillo, mesita',
    rules: [
      'Un mismo prefijo puede tener varios significados: "re-" puede ser repetición o intensificación.',
      'La derivación permite crear palabras que no están en el diccionario pero son comprensibles.',
      'No todos los prefijos se pueden aplicar a todas las palabras; hay restricciones léxicas.',
      'Los sufijos apreciativos (-ito, -azo, -ón) son muy productivos en el habla coloquial.',
    ],
    examples: [
      {
        english: 'Es imposible predecir el resultado con exactitud.',
        translation: "It's impossible to predict the result accurately.",
      },
      {
        english: 'Tendrás que reescribir el informe porque está incompleto.',
        translation:
          "You'll have to rewrite the report because it's incomplete.",
      },
      {
        english: '¡Menudo golazo marcó en el último minuto!',
        translation: 'What an amazing goal he scored in the last minute!',
      },
    ],
    common_mistakes: [],
    related: ['campos-semanticos', 'precision-lexica', 'nominalizacion'],
  },
  {
    slug: 'precision-lexica',
    title: 'Precisión léxica',
    level: 'C1',
    category: 'Avanzado',
    summary:
      'Elegir la palabra exacta: diferencias entre sinónimos parciales y cómo evitar la vaguedad.',
    explanation:
      'La **precisión léxica** consiste en seleccionar la palabra que expresa exactamente lo que se quiere decir, evitando términos comodín como *cosa, hacer, tener, poner, decir*.\n\n**Palabras comodín y alternativas**:\n- *Cosa* → elemento, aspecto, factor, cuestión, asunto, objeto, fenómeno\n- *Hacer* → realizar, elaborar, fabricar, ejecutar, confeccionar, emprender\n- *Tener* → poseer, disponer de, contar con, albergar, presentar, sufrir\n- *Decir* → afirmar, manifestar, declarar, expresar, sostener, apuntar\n- *Poner* → colocar, situar, depositar, instalar, aplicar, introducir\n\n**Distinción de falsos sinónimos**:\n- *Escuchar* (prestar atención) ≠ *oír* (percibir sonido)\n- *Mirar* (dirigir la vista) ≠ *ver* (percibir con la vista)\n- *Pedir* (solicitar algo) ≠ *preguntar* (formular una pregunta)\n- *Conocer* (a personas, lugares, hechos) ≠ *saber* (información, habilidades)\n\nEn niveles C1 se espera el uso de un léxico variado y preciso.',
    rules: [
      'Evitar palabras comodín; buscar el término más específico.',
      'Distinguir entre sinónimos parciales: no son intercambiables en todos los contextos.',
      'Consultar diccionarios combinatorios para saber qué verbo acompaña a cada sustantivo.',
      'El contexto determina la elección: no es lo mismo "oler" que "apestar" o "perfumar".',
    ],
    examples: [
      {
        english: 'El gobierno implementó nuevas medidas para paliar la crisis.',
        translation:
          'The government implemented new measures to mitigate the crisis.',
        note: 'no "hizo" medidas ni "arreglar" la crisis',
      },
      {
        english:
          'Escucho música mientras trabajo, pero oigo el ruido del tráfico de fondo.',
        translation:
          'I listen to music while I work, but I hear the traffic noise in the background.',
      },
    ],
    common_mistakes: [],
    related: ['campos-semanticos', 'derivacion', 'falsos-amigos'],
  },
  {
    slug: 'ironia',
    title: 'Ironía',
    level: 'C1',
    category: 'Avanzado',
    summary:
      'Expresar lo contrario de lo que se piensa con intención humorística o crítica.',
    explanation:
      'La **ironía** consiste en decir lo contrario de lo que se quiere comunicar, esperando que el receptor lo interprete correctamente por el contexto o la entonación.\n\n**Marcas de ironía en español**:\n- Entonación particular (en oral).\n- Uso de cuantificadores exagerados: *¡Qué listo eres!* (cuando ha hecho algo torpe).\n- Adjetivos elogiosos en contexto negativo: *¡Menudo negocio has montado!*\n- Diminutivos irónicos: *¡Vaya problemita tenemos!*\n- Combinación de formalidad excesiva con crítica: *Su excelentísima majestad ha decidido no fregar los platos.*\n\n**Tipos de ironía**:\n- **Ironía verbal**: lo dicho es lo contrario de lo significado.\n- **Ironía situacional**: el resultado contradice lo esperado.\n- **Sarcasmo**: ironía con intención hiriente.\n\nEn español, la ironía es muy frecuente en la conversación cotidiana y en el humor.',
    rules: [
      'La ironía depende del contraste entre lo dicho y el contexto.',
      'En la escritura, la ironía se marca con comillas, signos de exclamación o elección léxica.',
      'El sarcasmo es ironía más agresiva.',
      'En contextos formales se evita la ironía para no generar malentendidos.',
    ],
    examples: [
      {
        english: '¡Qué bien! Justo lo que necesitaba.',
        translation: 'Great! Just what I needed.',
        note: 'dicho al recibir una mala noticia',
      },
      {
        english: 'Menudo amigo estás hecho.',
        translation: 'Some friend you are.',
        note: 'ironía: no es buen amigo',
      },
      {
        english: 'Claro, tú siempre tienes razón.',
        translation: "Of course, you're always right.",
        note: 'dicho con tono irónico',
      },
    ],
    common_mistakes: [],
    related: ['sarcasmo', 'doble-sentido', 'expresiones-coloquiales'],
  },
  {
    slug: 'sarcasmo',
    title: 'Sarcasmo',
    level: 'C1',
    category: 'Avanzado',
    summary:
      'Ironía mordaz con intención de herir, burlarse o criticar duramente.',
    explanation:
      'El **sarcasmo** es una forma de ironía más agresiva y directa que busca ridiculizar, humillar o criticar de forma mordaz.\n\n**Características del sarcasmo**:\n- Intención manifiesta de herir o burlarse.\n- Tono de voz más cortante que la ironía.\n- Suele incluir hipérboles o comparaciones hirientes.\n\n**Ejemplos**:\n- *"Eres un genio"* (después de que alguien cometa un error evidente).\n- *"No te esfuerces demasiado"* (cuando alguien no está haciendo nada).\n- *"Qué sorpresa, has llegado tarde otra vez"* (falso asombro).\n\n**Diferencia con la ironía**:\n- La ironía puede ser humorística o incluso afectuosa.\n- El sarcasmo siempre tiene una carga negativa y busca provocar.\n\nEn el ámbito hispanohablante el sarcasmo varía culturalmente: es muy frecuente en España, mientras que en algunos países latinoamericanos puede considerarse más agresivo.',
    rules: [
      'El sarcasmo se apoya en la exageración y el falso elogio.',
      'La entonación es crucial para distinguir sarcasmo de elogio sincero.',
      'En la escritura, el sarcasmo puede marcarse con comillas o cursiva.',
      'Culturalmente, el sarcasmo no se percibe igual en todos los países hispanohablantes.',
    ],
    examples: [
      {
        english: 'No, si tú eres muy listo.',
        translation: "Oh sure, you're so clever.",
        note: 'sarcasmo: ha sido imprudente',
      },
      {
        english: 'Sí, claro, ahora mismo lo hago.',
        translation: "Yeah, right, I'll do it right now.",
        note: 'dicho cuando no hay intención de hacerlo',
      },
    ],
    common_mistakes: [],
    related: ['ironia', 'doble-sentido', 'expresiones-coloquiales'],
  },
  {
    slug: 'doble-sentido',
    title: 'Doble sentido',
    level: 'C1',
    category: 'Avanzado',
    summary:
      'Ambigüedad intencionada: palabras o frases con más de una interpretación.',
    explanation:
      'El **doble sentido** consiste en usar palabras o expresiones que admiten dos interpretaciones, generalmente una inocente y otra maliciosa, humorística o crítica.\n\n**Mecanismos del doble sentido**:\n\n**Homonimia y polisemia**:\n- *Banco* (asiento / entidad financiera): *Me senté en el banco a esperar.*\n- *Gato* (animal / herramienta para elevar coches).\n\n**Ambigüedad sintáctica**:\n- *Vi a tu hermano con prismáticos.* (¿Quién llevaba los prismáticos?)\n\n**Juegos de palabras (calambur)**:\n- *Entre el clavel y la rosa, su majestad escoja.* (es coja / escoja)\n\n**Contextos marcados**:\n- El doble sentido es habitual en chistes, publicidad y humor.\n- En literatura (Cervantes, Quevedo) el doble sentido es recurso erudito.\n\nEn niveles C1 se espera comprender y, con cuidado, usar el doble sentido respetando el contexto y la relación con el interlocutor.',
    rules: [
      'El doble sentido depende del contexto y de la complicidad entre hablantes.',
      'La ambigüedad puede ser léxica (una palabra) o sintáctica (estructura de la oración).',
      'En contextos formales se evita el doble sentido para no generar malentendidos.',
      'Muchos refranes y frases hechas admiten juegos de doble sentido.',
    ],
    examples: [
      {
        english: 'Como siempre, llega a la hora.',
        translation:
          'As always, he arrives on time. / As always, he arrives late.',
        note: 'depende de la entonación y el contexto',
      },
      {
        english: 'Se venden calcetines para caballeros de lana.',
        translation:
          'Wool socks for men for sale. / Socks for wool gentlemen for sale.',
        note: 'ambigüedad sintáctica',
      },
    ],
    common_mistakes: [],
    related: ['ironia', 'sarcasmo', 'metaforas'],
  },
  {
    slug: 'recursos-retoricos',
    title: 'Recursos retóricos',
    level: 'C1',
    category: 'Avanzado',
    summary:
      'Herramientas clásicas de la retórica aplicadas al discurso argumentativo.',
    explanation:
      'Los **recursos retóricos** son técnicas persuasivas heredadas de la tradición clásica que organizan y embellecen el discurso.\n\n**Operaciones retóricas**:\n1. *Intellectio*: comprender el tema.\n2. *Inventio*: encontrar argumentos.\n3. *Dispositio*: ordenar el discurso (introducción, desarrollo, conclusión).\n4. *Elocutio*: elegir las palabras y figuras adecuadas.\n5. *Memoria* y *actio*: memorizar y pronunciar.\n\n**Figuras retóricas argumentativas**:\n- **Pregunta retórica**: pregunta que no espera respuesta. *¿Acaso no merecemos un futuro mejor?*\n- **Anáfora**: repetición al inicio. *Queremos justicia, queremos paz, queremos futuro.*\n- **Paralelismo**: estructuras sintácticas similares. *Sin esfuerzo no hay éxito; sin riesgo no hay gloria.*\n- **Antítesis**: contraposición. *Es pequeño en estatura pero grande en corazón.*\n- **Tríada o regla de tres**: enumerar tres elementos para dar fuerza.\n\nEstos recursos son frecuentes en discursos políticos, publicidad y ensayos.',
    rules: [
      'Las preguntas retóricas involucran al receptor sin esperar respuesta literal.',
      'La anáfora y el paralelismo crean ritmo y énfasis.',
      'La antítesis resalta contrastes para reforzar un argumento.',
      'La regla de tres es un patrón persuasivo muy efectivo.',
    ],
    examples: [
      {
        english: '¿Cuántas veces tenemos que repetir lo mismo?',
        translation: 'How many times do we have to repeat the same thing?',
        note: 'pregunta retórica',
      },
      {
        english:
          'Trabajamos sin descanso, luchamos sin tregua, soñamos sin límites.',
        translation:
          'We work tirelessly, we fight relentlessly, we dream boundlessly.',
        note: 'paralelismo y tríada',
      },
      {
        english: 'Es la peor de las soluciones, pero es la única que tenemos.',
        translation:
          "It's the worst of solutions, but it's the only one we have.",
        note: 'antítesis',
      },
    ],
    common_mistakes: [],
    related: ['persuasion', 'estructura-argumentativa', 'figuras-literarias'],
  },
  {
    slug: 'persuasion',
    title: 'Persuasión y estrategias discursivas',
    level: 'C1',
    category: 'Avanzado',
    summary:
      'Técnicas para convencer: apelación a la razón (logos), a la emoción (pathos) y a la credibilidad (ethos).',
    explanation:
      'La **persuasión** es el arte de convencer. Según la retórica clásica (Aristóteles), se apoya en tres pilares:\n\n**Logos (razón)**:\n- Argumentos lógicos, datos, estadísticas, hechos comprobables.\n- *Según un estudio de la OMS, el 80% de los casos...*\n\n**Pathos (emoción)**:\n- Apelar a sentimientos: empatía, miedo, esperanza, indignación.\n- *Imagina que fueras tú el que necesita ayuda...*\n\n**Ethos (credibilidad del emisor)**:\n- Construir confianza mostrando conocimiento, experiencia o valores.\n- *Como médico con veinte años de experiencia, puedo afirmar que...*\n\n**Estrategias lingüísticas persuasivas**:\n- Primera persona plural inclusiva: *Todos sabemos que... / Nos afecta a todos.*\n- Verbos de opinión atenuados o reforzados.\n- Uso de ejemplos concretos y cercanos.\n- Anticipar y refutar objeciones.',
    rules: [
      'Combinar logos, pathos y ethos para una argumentación completa.',
      'El pathos solo es efectivo si se equilibra con argumentos sólidos.',
      'La credibilidad (ethos) se construye desde el inicio.',
      'En español, el uso del plural inclusivo es muy persuasivo: "Tenemos que actuar".',
    ],
    examples: [
      {
        english:
          'Todos sabemos que el cambio climático es real. Como sociedad, tenemos la responsabilidad de actuar. No podemos mirar hacia otro lado.',
        translation:
          "We all know climate change is real. As a society, we have the responsibility to act. We can't look the other way.",
      },
      {
        english:
          'Según los últimos datos del INE, la pobreza infantil ha aumentado un 12%. Detrás de cada cifra hay un niño que no tiene para comer.',
        translation:
          "According to the latest INE data, child poverty has increased by 12%. Behind every figure, there is a child who doesn't have enough to eat.",
      },
    ],
    common_mistakes: [],
    related: [
      'recursos-retoricos',
      'estructura-argumentativa',
      'figuras-literarias',
    ],
  },
  {
    slug: 'figuras-literarias',
    title: 'Figuras literarias',
    level: 'C1',
    category: 'Avanzado',
    summary:
      'Principales figuras retóricas: metáfora, metonimia, sinécdoque, hipérbaton, asíndeton, polisíndeton.',
    explanation:
      'Las **figuras literarias** o **tropos** enriquecen el lenguaje más allá de su uso literal.\n\n**Figuras de significado (tropos)**:\n- **Metáfora**: identificación de dos realidades. *La vida es un río.*\n- **Metonimia**: sustitución por relación. *Bebió una copa.* (continente por contenido).\n- **Sinécdoque**: la parte por el todo o viceversa. *Quedan tres almas en el pueblo.* (alma por persona).\n- **Sinestesia**: mezcla de sensaciones. *Un silencio amargo.*\n\n**Figuras de orden**:\n- **Hipérbaton**: alterar el orden lógico. *Del salón en el ángulo oscuro...* (Bécquer).\n- **Anáfora**: repetición al inicio de versos o frases.\n\n**Figuras de repetición**:\n- **Aliteración**: repetición de sonidos. *El ruido con que rueda la ronca tempestad.*\n- **Polisíndeton**: multiplicación de conjunciones. *Y llegó, y miró, y venció.*\n- **Asíndeton**: omisión de conjunciones. *Llegué, vi, vencí.*\n\nEn niveles C1 se espera reconocer estas figuras y usarlas puntualmente.',
    rules: [
      'La metáfora es la figura más común y versátil.',
      'Metonimia y sinécdoque son frecuentes incluso en la lengua coloquial.',
      'El hipérbaton es más literario; en prosa se usa con moderación.',
      'Polisíndeton ralentiza; asíndeton acelera el ritmo.',
    ],
    examples: [
      {
        english:
          'Y los niños corren, y los perros ladran, y los coches pitan, y el mundo sigue girando.',
        translation:
          'And the children run, and the dogs bark, and the cars honk, and the world keeps turning.',
        note: 'polisíndeton',
      },
      {
        english: 'Llegué, vi, vencí.',
        translation: 'I came, I saw, I conquered.',
        note: 'asíndeton',
      },
      {
        english: 'El dulce sonido del silencio.',
        translation: 'The sweet sound of silence.',
        note: 'sinestesia',
      },
    ],
    common_mistakes: [],
    related: ['metaforas', 'recursos-retoricos', 'descripcion-literaria'],
  },
  {
    slug: 'espanol-latinoamerica',
    title: 'Español de América Latina',
    level: 'C1',
    category: 'Avanzado',
    summary:
      'Principales rasgos del español hablado en Latinoamérica frente al español peninsular.',
    explanation:
      'El **español de América Latina** presenta variaciones respecto al español peninsular que no son errores, sino rasgos dialectales legítimos.\n\n**Rasgos fonéticos generales**:\n- **Seseo**: c/z y s suenan igual (/s/). *casa* y *caza* son homófonos.\n- **Yeísmo**: ll y y suenan igual (/ʝ/). Generalizado en casi toda América.\n- Aspiración o elisión de -s al final de sílaba: *ehtá* por *está*.\n\n**Rasgos gramaticales**:\n- **Ustedes** como único pronombre de segunda persona plural (no se usa vosotros).\n- **Voseo** en Argentina, Uruguay, Paraguay, partes de Centroamérica: *vos tenés*.\n- Mayor uso de diminutivos: *ahorita, cafecito, pancito*.\n- Pretérito indefinido preferido sobre el perfecto: *Ya lo hice* vs. *Ya lo he hecho*.\n\n**Rasgos léxicos**:\n- Vocabulario diferente según el país: *carro* (México) / *coche* (España); *computadora* / *ordenador*; *celular* / *móvil*.\n- Influencia de lenguas indígenas y africanas en el léxico.',
    rules: [
      'El seseo no es un error; es la norma culta en América Latina.',
      '"Ustedes" sustituye a "vosotros" en toda América; la conjugación es la de 3ª persona plural.',
      'El voseo modifica la conjugación: vos tenés, vos querés, vos sos.',
      'El léxico varía enormemente por país; una palabra inocente en uno puede ser ofensiva en otro.',
    ],
    examples: [
      {
        english: 'Ustedes tienen razón.',
        translation: 'You are right.',
        note: 'única forma plural en América Latina',
      },
      {
        english: 'Vos sabés lo que hiciste.',
        translation: 'You know what you did.',
        note: 'voseo rioplatense',
      },
      {
        english: 'Ahorita te llamo.',
        translation: "I'll call you shortly/right now.",
        note: 'dimitutivo; en México "ahorita" puede significar "en un rato"',
      },
    ],
    common_mistakes: [],
    related: ['diferencias-regionales', 'voseo', 'falsos-amigos'],
  },
  {
    slug: 'diferencias-regionales',
    title: 'Diferencias regionales en el español',
    level: 'C1',
    category: 'Avanzado',
    summary: 'Variación léxica y gramatical entre los países hispanohablantes.',
    explanation:
      'El español es una lengua pluricéntrica: no hay una sola norma correcta. Cada región tiene sus particularidades.\n\n**Variación léxica** (mismo concepto, distinta palabra):\n| Concepto | España | México | Argentina |\n|----------|--------|--------|-----------|\n| coche | coche | carro | auto |\n| ordenador | ordenador | computadora | computadora |\n| móvil | móvil | celular | celular |\n| zumo | zumo | jugo | jugo |\n| patata | patata | papa | papa |\n| conducir | conducir | manejar | manejar |\n| coger | coger (tomar) | NO usar (obsceno) | NO usar (obsceno) |\n\n**Variación gramatical**:\n- *Leísmo* en España: *Le vi* por *Lo vi*.\n- *Voseo* en Argentina/Uruguay/Centroamérica.\n- Perfecto vs. indefinido: *Hoy he ido* (España) vs. *Hoy fui* (América).\n\n**Variación pragmática**:\n- *Tú* vs. *usted*: en Colombia se usa *usted* incluso entre amigos.\n- Tratamiento informal: *güey* (México), *tío/tía* (España), *che* (Argentina), *pana* (Venezuela).',
    rules: [
      'No existe una variedad "correcta" del español; cada norma culta es válida.',
      'Al aprender español conviene elegir una variedad meta y ser consciente de las demás.',
      'El contexto determina qué variedad usar: en entornos internacionales se tiende a un español neutro.',
      'Muchas palabras son comprensibles en todos los países aunque no sean las locales.',
    ],
    examples: [
      {
        english: 'Voy a coger el autobús.',
        translation: "I'm going to take the bus.",
        note: 'normal en España; evitar en Latinoamérica',
      },
      {
        english: 'Manejo hasta tu casa en media hora.',
        translation: "I'll drive to your house in half an hour.",
        note: 'Argentina/México',
      },
      {
        english: '¿Me pasas la papa, por favor?',
        translation: 'Can you pass me the potato, please?',
        note: 'Latinoamérica; en España sería "patata"',
      },
    ],
    common_mistakes: [],
    related: ['espanol-latinoamerica', 'voseo', 'falsos-amigos'],
  },
  {
    slug: 'voseo',
    title: 'Voseo',
    level: 'C1',
    category: 'Avanzado',
    summary:
      'El uso de "vos" como pronombre de segunda persona singular en el español rioplatense y centroamericano.',
    structure:
      'vos + verbo con acento en la última sílaba (vos tenés, vos querés, vos sos)',
    explanation:
      'El **voseo** es el uso del pronombre **vos** en lugar de **tú** para la segunda persona del singular. Es normativo y culto en Argentina, Uruguay y Paraguay, y frecuente en partes de Centroamérica.\n\n**Conjugación del voseo (rioplatense)**:\n\n| Verbo | Presente | Imperativo |\n|-------|----------|------------|\n| tener | vos tenés | tené |\n| querer | vos querés | queré |\n| poder | vos podés | podé |\n| ser | vos sos | sé |\n| ir | vos vas | andá (irregular) |\n| haber | vos has | — |\n\n**Patrón**: se acentúa la última sílaba; se pierde la -d final del imperativo.\n\n**Variantes regionales**:\n- *Voseo pronominal y verbal* (Argentina): *vos tenés*.\n- *Voseo solo verbal* (Chile, zonas de Colombia): *tú tenís*.\n\nEl voseo se combina con el pronombre *te* y el posesivo *tu/tuyo*: *Vos te llamás... y tu casa...*',
    rules: [
      'El voseo es normativo y culto en las regiones donde se usa.',
      'La conjugación difiere de la de tú: se pierde el diptongo (tú tienes → vos tenés).',
      'El imperativo voseante pierde la -d: hablá, comé, escribí.',
      'El verbo "ser" tiene forma propia: vos sos (no ~~vos erés~~).',
    ],
    examples: [
      {
        english: 'Vos tenés que venir a conocer Buenos Aires.',
        translation: 'You have to come visit Buenos Aires.',
        note: 'voseo rioplatense',
      },
      { english: '¿De dónde sos?', translation: 'Where are you from?' },
      {
        english: 'Hablá más fuerte que no te escucho.',
        translation: "Speak louder, I can't hear you.",
        note: 'imperativo voseante',
      },
    ],
    common_mistakes: [],
    related: [
      'espanol-latinoamerica',
      'diferencias-regionales',
      'pronombres-sujeto',
    ],
  },
  {
    slug: 'sintesis-textual',
    title: 'Síntesis textual',
    level: 'C1',
    category: 'Avanzado',
    summary:
      'Resumir, parafrasear y sintetizar información de forma precisa y concisa.',
    explanation:
      'La **síntesis textual** es la habilidad de condensar información manteniendo las ideas esenciales. Es fundamental en el ámbito académico y profesional.\n\n**Técnicas de síntesis**:\n\n1. **Identificar la idea principal** y las ideas secundarias.\n2. **Eliminar**: ejemplos, repeticiones, digresiones.\n3. **Generalizar**: agrupar detalles bajo un concepto común.\n4. **Parafrasear**: expresar con palabras propias sin cambiar el significado.\n\n**Paráfrasis vs. resumen**:\n- *Paráfrasis*: misma extensión aproximadamente, distintas palabras.\n- *Resumen*: reducción significativa manteniendo lo esencial.\n\n**Verbos útiles para sintetizar**:\n- *resumir, sintetizar, condensar, recapitular*\n- *El autor sostiene / argumenta / cuestiona / analiza / propone*\n\n**Conectores de síntesis**: *en resumen, en síntesis, en conclusión, en pocas palabras, en definitiva*.',
    rules: [
      'Un buen resumen no aporta opiniones personales.',
      'La paráfrasis no debe modificar el sentido original.',
      'Identificar la tesis del autor es el primer paso para sintetizar.',
      'En síntesis académicas se debe citar la fuente original.',
    ],
    examples: [
      {
        english:
          'En resumen, el artículo plantea que el bilingüismo aporta beneficios cognitivos medibles, aunque advierte de la necesidad de más estudios longitudinales.',
        translation:
          'In summary, the article argues that bilingualism brings measurable cognitive benefits, although it warns of the need for more longitudinal studies.',
      },
    ],
    common_mistakes: [],
    related: [
      'critica-constructiva',
      'reformulacion',
      'estructura-argumentativa',
    ],
  },
  {
    slug: 'critica-constructiva',
    title: 'Crítica constructiva',
    level: 'C1',
    category: 'Avanzado',
    summary:
      'Expresar desacuerdo u objeciones de forma respetuosa y productiva.',
    explanation:
      'La **crítica constructiva** señala aspectos mejorables de una idea o trabajo sin descalificar, ofreciendo alternativas y manteniendo un tono respetuoso.\n\n**Estrategias lingüísticas**:\n\n**Atenuar la crítica**:\n- *Quizás se podría considerar...*\n- *Me pregunto si no sería mejor...*\n- *Entiendo tu punto, pero...*\n\n**Enfocar en el problema, no en la persona**:\n- *El informe contiene algunos errores.* (no *Eres descuidado.*)\n- *La propuesta necesita más desarrollo.* (no *Es una mala propuesta.*)\n\n**Ofrecer alternativas o soluciones**:\n- *Tal vez podríamos probar con...*\n- *¿Has considerado la posibilidad de...?*\n- *Una alternativa sería...*\n\n**Usar condicional y subjuntivo para atenuar**:\n- *Convendría revisar esta sección.*\n- *Sería recomendable que incluyeras datos más recientes.*\n\nEn español la crítica suele ser más indirecta que en inglés por razones culturales de cortesía.',
    rules: [
      'Atenuar con condicional y subjuntivo.',
      'Separar a la persona del problema.',
      'Siempre ofrecer una alternativa o solución.',
      'Empezar con un aspecto positivo antes de señalar lo mejorable.',
    ],
    examples: [
      {
        english:
          'Me ha gustado mucho tu presentación. Quizás podrías añadir más ejemplos para hacerla aún más clara.',
        translation:
          'I really liked your presentation. Perhaps you could add more examples to make it even clearer.',
      },
      {
        english:
          'Entiendo tu enfoque, pero me pregunto si no sería mejor considerar otras opciones.',
        translation:
          "I understand your approach, but I wonder if it wouldn't be better to consider other options.",
      },
    ],
    common_mistakes: [],
    related: [
      'reformulacion',
      'sintesis-textual',
      'condicional-simple',
      'matizadores',
    ],
  },
  {
    slug: 'reformulacion',
    title: 'Reformulación',
    level: 'C1',
    category: 'Avanzado',
    summary:
      'Parafrasear y reformular para aclarar, corregir o matizar lo dicho.',
    explanation:
      'La **reformulación** es una estrategia discursiva que permite volver a expresar una idea de forma más clara, precisa o matizada.\n\n**Tipos de reformulación**:\n\n**Explicativa** (aclarar):\n- *es decir, o sea, esto es, a saber, en otras palabras*\n- *La situación es insostenible, es decir, no podemos seguir así.*\n\n**Rectificativa** (corregir):\n- *mejor dicho, más bien, digo, quiero decir*\n- *Es caro, mejor dicho, es carísimo.*\n\n**Recapitulativa** (resumir):\n- *en resumen, en conclusión, en definitiva, total, al fin y al cabo*\n- *Total, que no vamos a la playa.*\n\n**De distanciamiento** (matizar):\n- *en cualquier caso, de todas formas, en todo caso*\n- *No sé si es la mejor opción; en cualquier caso, es la que tenemos.*\n\nLa reformulación es una habilidad clave en el nivel C1 para negociar significado, aclarar malentendidos y demostrar dominio léxico.',
    rules: [
      '"Es decir" introduce una aclaración de lo dicho.',
      '"Mejor dicho" corrige o matiza lo anterior.',
      '"Total" en registro coloquial introduce un resumen o conclusión.',
      'La reformulación demuestra control activo del discurso.',
    ],
    examples: [
      {
        english:
          'El proyecto es viable, es decir, contamos con los recursos necesarios para llevarlo a cabo.',
        translation:
          'The project is viable; that is, we have the resources needed to carry it out.',
      },
      {
        english: 'No me gusta la idea. Mejor dicho, me parece terrible.',
        translation:
          "I don't like the idea. Or rather, it seems terrible to me.",
      },
      {
        english:
          'No estudié nada, llovió todo el día y encima perdí el tren. Total, un desastre de día.',
        translation:
          "I didn't study at all, it rained all day, and on top of that I missed the train. All in all, a disastrous day.",
      },
    ],
    common_mistakes: [],
    related: [
      'sintesis-textual',
      'critica-constructiva',
      'conectores-avanzados',
    ],
  },

  /* ═══ C2 ═══ */

  {
    slug: 'repaso-subjuntivo',
    title: 'Repaso avanzado del subjuntivo',
    level: 'C2',
    category: 'Subjuntivo',
    summary:
      'Integración de todos los usos del subjuntivo en contextos complejos.',
    explanation:
      'En nivel C2 se domina la alternancia indicativo/subjuntivo en todos los contextos, incluidos aquellos en los que la elección refleja un **matiz significativo sutil**.\n\n**Casos de alternancia con cambio de significado**:\n\n- *No creo que **venga*** (subjuntivo: duda real). vs. *No creo que **viene*** (indicativo: se niega una creencia ajena).\n- *Aunque **llueve**, saldré* (sé que llueve). vs. *Aunque **llueva**, saldré* (no sé si lloverá).\n- *Quizás **tiene** razón* (probabilidad alta). vs. *Quizás **tenga** razón* (probabilidad baja).\n\n**Dominio de la concordancia temporal en discursos complejos**:\n- *No pensé que **fuera a llover**.* (Imperfecto subj. con valor de futuro del pasado.)\n- *Me molestó que no me **hubieras avisado**.* (Pluscuamperfecto subj. para anterioridad.)\n\n**Subjuntivo en contextos formales y literarios**:\n- *Quien **osare** desafiar la ley...* (subjuntivo arcaizante con valor eventual).\n- *Sea como fuere...* (fórmula concesiva lexicalizada).',
    rules: [
      'La alternancia indicativo/subjuntivo puede reflejar matices semánticos muy sutiles.',
      'El dominio C2 implica usar el subjuntivo de forma natural, sin pensarlo.',
      'En registros cultos se usan construcciones subjuntivas arcaizantes o lexicalizadas.',
      'El subjuntivo puede aparecer en oraciones independientes con valor desiderativo o dubitativo.',
    ],
    examples: [
      {
        english: 'Sea como fuere, debemos tomar una decisión.',
        translation: 'Be that as it may, we must make a decision.',
        note: 'fórmula concesiva lexicalizada',
      },
      {
        english: 'No es que no quisiera ir, es que no pude.',
        translation: "It's not that I didn't want to go, it's that I couldn't.",
        note: 'subjuntivo en estructura contrastiva',
      },
      {
        english: 'Quien bien te quiere te hará llorar.',
        translation: 'Whoever loves you well will make you cry.',
        note: 'indicativo en relativa con valor genérico',
      },
    ],
    common_mistakes: [],
    related: [
      'subjuntivo-concesivo',
      'subjuntivo-final',
      'subjuntivo-relativo',
      'concordancia-temporal',
    ],
  },
  {
    slug: 'repaso-condicional',
    title: 'Repaso avanzado de condicionales',
    level: 'C2',
    category: 'Condicionales',
    summary:
      'Dominio de todas las estructuras condicionales, incluidas las mixtas y las de registro culto.',
    explanation:
      'En C2 se dominan las **condicionales mixtas**, las variantes cultas y las estructuras alternativas.\n\n**Condicionales mixtas**: combinan prótasis y apódosis de distintos tipos.\n- *Si **hubieras estudiado** (tipo 3), ahora **tendrías** (tipo 2) trabajo.*\n- *Si **fueras** (tipo 2) más responsable, **habrías terminado** (tipo 3) ayer.*\n\n**Variantes de la prótasis sin "si"**:\n- *De + infinitivo*: *De haberlo sabido, no habría venido.*\n- *A no ser que / a menos que / salvo que + subjuntivo*: *Iré a no ser que llueva.*\n- *Siempre que / con tal (de) que / a condición de que + subjuntivo*: *Te ayudo siempre que me escuches.*\n\n**Condicionales con imperativo en la apódosis**:\n- *Si necesitas ayuda, llámame.*\n\n**Condicionales de registro culto**:\n- *Hubiera + participio* en lugar de *habría + participio*: *Si lo hubiera sabido, no hubiera ido.*',
    rules: [
      'Las condicionales mixtas rompen la correspondencia tipo a tipo para expresar matices temporales.',
      '"De + infinitivo" es una alternativa formal a "si + pluscuamperfecto de subjuntivo".',
      '"Siempre que" + subjuntivo = condición necesaria.',
      '"Con tal de que" expresa condición mínima suficiente.',
    ],
    examples: [
      {
        english: 'De haberlo sabido, te habría avisado antes.',
        translation: 'Had I known, I would have told you earlier.',
        note: 'alternativa formal a "si hubiera sabido"',
      },
      {
        english: 'Iré a la playa el sábado, a no ser que llueva.',
        translation: "I'll go to the beach on Saturday, unless it rains.",
      },
      {
        english: 'Si hubieras ahorrado más, ahora no estarías preocupado.',
        translation: "If you had saved more, you wouldn't be worried now.",
        note: 'condicional mixta',
      },
    ],
    common_mistakes: [],
    related: [
      'si-presente-futuro',
      'si-imperfecto-subjuntivo',
      'condicional-compuesto',
      'subjuntivo-imperfecto',
    ],
  },
  {
    slug: 'concordancia-de-tiempos',
    title: 'Concordancia de tiempos en discursos complejos',
    level: 'C2',
    category: 'Tiempos Verbales',
    summary:
      'Dominio de la consecutio temporum en narraciones y discursos con múltiples niveles temporales.',
    explanation:
      'En textos con múltiples planos temporales (narraciones con flashbacks y flashforwards, discursos hipotéticos, estilo indirecto encadenado), la **concordancia temporal** es compleja.\n\n**Narración con tres planos temporales**:\n- Plano base: imperfecto (*Era 1995*).\n- Flashback: pluscuamperfecto (*Ya había terminado la guerra*).\n- Anterior al flashback: pluscuamperfecto con valor de anterioridad reforzada (*Para entonces ya la habían declarado varias veces*).\n\n**Estilo indirecto encadenado (dos niveles de pasado)**:\n- *Dijo que le habían contado que andaban buscando a alguien que hubiera vivido en el extranjero.*\n\n**Uso de formas en -ra con valor de indicativo**:\n- En registro culto/literario: *El que fuera presidente...* (= El que fue presidente).\n\n**Dominio de la correlación subjuntivo-indicativo**:\n- *Espero que cuando **llegues** (pres. subj.) todavía **esté** (pres. subj.) despierto.*\n- *Esperaba que cuando **llegaras** (imp. subj.) todavía **estuviera** (imp. subj.) despierto.*',
    rules: [
      'Cada salto temporal hacia atrás requiere pluscuamperfecto.',
      'En estilo indirecto encadenado se aplican las reglas en cascada.',
      'La forma -ra puede funcionar como indicativo en registros cultos.',
      'La concordancia subjuntivo mantiene coherencia con el verbo principal.',
    ],
    examples: [
      {
        english:
          'Dijo que le habían asegurado que el problema ya se habría resuelto para cuando él llegara.',
        translation:
          'He said that they had assured him that the problem would have already been solved by the time he arrived.',
      },
      {
        english: 'El que fuera ministro de Economía ha publicado sus memorias.',
        translation:
          'The former Minister of Economy has published his memoirs.',
        note: '-ra con valor de indicativo',
      },
    ],
    common_mistakes: [],
    related: [
      'concordancia-temporal',
      'estilo-indirecto-pasado',
      'pluscuamperfecto',
      'subjuntivo-imperfecto',
    ],
  },
  {
    slug: 'estilo-literario',
    title: 'Estilo literario',
    level: 'C2',
    category: 'Avanzado',
    summary:
      'Rasgos del español literario: lenguaje figurado, hipérbaton, arcaísmos, cultismos.',
    explanation:
      'El **estilo literario** se caracteriza por una elaboración consciente del lenguaje que persigue la belleza expresiva.\n\n**Rasgos del español literario**:\n\n**Léxico culto y preciso**:\n- Uso de cultismos: *ígneo, álgido, lóbrego, efímero, falaz*.\n- Evitar palabras comodín.\n\n**Sintaxis elaborada**:\n- Hipérbaton: *Del monte en la ladera, por mi mano plantado tengo un huerto.*\n- Subordinación compleja.\n- Uso de gerundios, participios absolutos y construcciones de infinitivo.\n\n**Figuras retóricas**:\n- Metáfora, símil, personificación, sinestesia, aliteración.\n\n**Registro y tono**:\n- Puede alternar entre lo sublime y lo coloquial con intención estilística.\n- Uso de arcaísmos con fines evocadores.\n\nEn C2 se espera leer literatura en español y reconocer estos rasgos, así como incorporar algunos en la escritura creativa.',
    rules: [
      'El hipérbaton es más libre en poesía que en prosa.',
      'Los cultismos enriquecen pero no deben sobrecargar el texto.',
      'La literatura contemporánea hispanoamericana ha flexibilizado el uso de registros.',
      'El gerundio de anterioridad es propio de registros literarios: "Habiendo terminado, se fue".',
    ],
    examples: [
      {
        english:
          'Del salón en el ángulo oscuro, de su dueño tal vez olvidada, silenciosa y cubierta de polvo veíase el arpa.',
        translation:
          'In the dark corner of the room, perhaps forgotten by its owner, silent and covered in dust, the harp could be seen.',
        note: 'Bécquer, hipérbaton',
      },
      {
        english:
          'Macondo era entonces una aldea de veinte casas de barro y cañabrava construidas a la orilla de un río de aguas diáfanas.',
        translation:
          'Macondo was then a village of twenty adobe and cane houses built on the bank of a river of diaphanous waters.',
        note: 'García Márquez, adjetivación',
      },
    ],
    common_mistakes: [],
    related: [
      'voz-narrativa',
      'recursos-estilisticos',
      'descripcion-literaria',
      'figuras-literarias',
    ],
  },
  {
    slug: 'voz-narrativa',
    title: 'Voz narrativa',
    level: 'C2',
    category: 'Avanzado',
    summary:
      'Tipos de narrador y su efecto en el texto: primera, segunda y tercera persona, focalización.',
    explanation:
      'La **voz narrativa** es la instancia que cuenta la historia. Su elección determina la perspectiva, el tono y la información disponible para el lector.\n\n**Tipos de narrador**:\n\n**Primera persona** (yo):\n- Narrador protagonista o testigo.\n- Crea intimidad y subjetividad.\n- *Nunca olvidaré el día en que conocí a María.*\n\n**Segunda persona** (tú/usted/vos):\n- Poco frecuente; interpela al lector o al propio narrador.\n- *Llegas a casa, enciendes la luz y te das cuenta de que no estás solo.*\n\n**Tercera persona** (él/ella):\n- **Omnisciente**: lo sabe todo de todos los personajes.\n- **Equisciente o de focalización interna**: solo sabe lo que piensa/siente un personaje.\n- **Objetivista o de focalización externa**: solo narra lo observable, como una cámara.\n\nEn español literario, el cambio de voz narrativa dentro de una obra es un recurso de alta elaboración (Cortázar, Vargas Llosa).',
    rules: [
      'La primera persona crea subjetividad y cercanía.',
      'La tercera persona omnisciente da control total de la información.',
      'La segunda persona es un recurso arriesgado pero impactante.',
      'La focalización puede cambiar dentro de una misma obra.',
    ],
    examples: [
      {
        english:
          'Cierras los ojos y respiras hondo. Sabes que no hay vuelta atrás.',
        translation:
          "You close your eyes and take a deep breath. You know there's no turning back.",
        note: 'segunda persona',
      },
      {
        english:
          'Nadie lo vio llegar, pero todos supieron que algo había cambiado en el pueblo.',
        translation:
          'No one saw him arrive, but everyone knew something had changed in the town.',
        note: 'tercera persona omnisciente',
      },
    ],
    common_mistakes: [],
    related: [
      'estilo-literario',
      'recursos-estilisticos',
      'tiempos-narrativos',
    ],
  },
  {
    slug: 'recursos-estilisticos',
    title: 'Recursos estilísticos avanzados',
    level: 'C2',
    category: 'Avanzado',
    summary:
      'Elipsis, asíndeton, polisíndeton, paralelismo y otros recursos de la prosa elaborada.',
    explanation:
      'Los **recursos estilísticos** son elecciones conscientes del autor para crear efectos de ritmo, énfasis o ambigüedad.\n\n**Recursos de omisión**:\n- **Elipsis**: omitir elementos recuperables por el contexto. *Él pidió vino; yo, cerveza.*\n- **Asíndeton**: omitir conjunciones para dar ritmo rápido. *Acude, corre, vuela.*\n\n**Recursos de adición**:\n- **Polisíndeton**: multiplicar conjunciones. *Y sueña, y espera, y calla, y muere.*\n- **Enumeración**: acumular elementos. *Miedos, dudas, esperanzas, todo cabe en un segundo.*\n\n**Recursos de repetición**:\n- **Anáfora**: repetir al inicio. *Todo lo intenté, todo lo perdí.*\n- **Epífora**: repetir al final. *De ti depende. De ti espera. De ti confía.*\n- **Paralelismo**: estructuras sintácticas simétricas.\n- **Quiasmo**: cruce de estructuras. *Ni son todos los que están, ni están todos los que son.*\n\n**Recursos de orden**:\n- **Hipérbaton**: alterar el orden lógico.\n\nEn C2 se espera usar algunos de estos recursos de forma deliberada en la escritura.',
    rules: [
      'La elipsis y el asíndeton aceleran el ritmo.',
      'El polisíndeton y la enumeración ralentizan y enfatizan.',
      'El paralelismo crea equilibrio; el quiasmo crea contraste elegante.',
      'Estos recursos deben usarse con moderación; su abuso puede resultar artificioso.',
    ],
    examples: [
      {
        english: 'Llegué, vi, vencí.',
        translation: 'I came, I saw, I conquered.',
        note: 'asíndeton',
      },
      {
        english:
          'Y los días pasan, y las horas vuelan, y el silencio crece, y el eco de tu voz se apaga.',
        translation:
          'And the days go by, and the hours fly, and the silence grows, and the echo of your voice fades.',
        note: 'polisíndeton',
      },
      {
        english: 'Cuando tú vas, yo vengo. Cuando tú ríes, yo lloro.',
        translation: 'When you go, I come. When you laugh, I cry.',
        note: 'paralelismo antitético',
      },
    ],
    common_mistakes: [],
    related: ['figuras-literarias', 'estilo-literario', 'voz-narrativa'],
  },
  {
    slug: 'equivalencia',
    title: 'Equivalencia y traducción',
    level: 'C2',
    category: 'Avanzado',
    summary:
      'Principios de equivalencia entre el español y otras lenguas; el arte de traducir matices.',
    explanation:
      "La **equivalencia** es el principio fundamental de la traducción: encontrar en la lengua meta una expresión que transmita el mismo significado, registro y efecto que el original.\n\n**Tipos de equivalencia**:\n- **Equivalencia formal**: mantener estructura y palabras (traducción literal).\n  *It's raining → Está lloviendo.*\n- **Equivalencia dinámica o funcional**: mismo efecto comunicativo, distinta forma.\n  *It's a piece of cake → Es pan comido.*\n- **Equivalencia pragmática**: adaptar al contexto cultural.\n  *How are you? → ¿Qué tal?* (más natural que *¿Cómo estás?* en muchos contextos).\n\n**Desafíos de la traducción español-inglés**:\n- **Ser/estar** no tiene equivalente directo en inglés.\n- **Subjuntivo** tiene usos sin equivalente en inglés (*Quiero que vengas → I want you to come*).\n- **Diminutivos** con carga afectiva no siempre traducibles.\n- **Falsos amigos y calcos**.",
    rules: [
      'La equivalencia dinámica suele ser más natural que la literal.',
      'No todo es traducible palabra por palabra; a veces hay que cambiar la estructura.',
      'Los referentes culturales (refranes, chistes, costumbres) requieren adaptación.',
      'Un buen traductor conoce profundamente ambas lenguas y culturas.',
    ],
    examples: [
      {
        english: 'Tengo 25 años.',
        translation: 'I am 25 years old.',
        note: 'equivalencia funcional: tener = to be',
      },
      {
        english: 'Me gusta bailar.',
        translation: 'I like dancing.',
        note: 'cambio de estructura: el sujeto pasa a ser la persona',
      },
      {
        english: 'Es pan comido.',
        translation: "It's a piece of cake.",
        note: 'modismo con equivalente diferente',
      },
    ],
    common_mistakes: [],
    related: ['matices-traduccion', 'falsos-amigos', 'precision-lexica'],
  },
  {
    slug: 'matices-traduccion',
    title: 'Matices de traducción',
    level: 'C2',
    category: 'Avanzado',
    summary:
      'Traducir no es solo cambiar palabras: capturar el tono, el registro y la intención.',
    explanation:
      'La traducción de calidad va más allá de la equivalencia semántica. Captura:\n\n**Registro**:\n- *¿Me puede decir la hora?* → formal. *Could you tell me the time?*\n- *Oye, ¿qué hora es?* → informal. *Hey, what time is it?*\n\n**Tono e intención**:\n- *¡Vaya, qué sorpresa!* puede expresar alegría o ironía según el contexto.\n- En inglés el tono a menudo se marca con *tag questions* que no tienen equivalente exacto en español.\n\n**Carga cultural**:\n- *Sobremesa* no tiene equivalente en inglés.\n- *Estrenar* (usar algo por primera vez) no tiene un verbo equivalente.\n\n**Juegos de palabras y humor**:\n- Los juegos de palabras son notoriamente difíciles de traducir y a menudo requieren recreación.\n\n**Estrategias**:\n- Préstamo (dejar la palabra original).\n- Calco (traducción literal de la expresión).\n- Adaptación (cambiar el referente cultural).\n- Compensación (perder un matiz en un lugar y ganarlo en otro).',
    rules: [
      'La buena traducción captura el registro, no solo el significado.',
      'Los referentes culturales se adaptan o se explican.',
      'El humor y los juegos de palabras suelen requerir recreación, no traducción literal.',
      'Traducir también es interpretar: el traductor toma decisiones.',
    ],
    examples: [
      {
        english: 'Después de comer nos quedamos de sobremesa un buen rato.',
        translation: 'After lunch we stayed at the table chatting for a while.',
        note: 'concepto cultural sin equivalente exacto',
      },
      {
        english: 'Hoy estreno zapatos.',
        translation: "I'm wearing new shoes for the first time today.",
        note: '"estrenar" requiere una paráfrasis',
      },
    ],
    common_mistakes: [],
    related: ['equivalencia', 'falsos-amigos', 'precision-lexica'],
  },
  {
    slug: 'falsos-amigos',
    title: 'Falsos amigos',
    level: 'C2',
    category: 'Avanzado',
    summary:
      'Palabras que se parecen entre español e inglés pero significan cosas distintas.',
    explanation:
      'Los **falsos amigos** son palabras que tienen forma similar en dos idiomas pero significado diferente. Pueden causar errores graves de comunicación.\n\n**Falsos amigos frecuentes español-inglés**:\n\n| Español | Significa | No significa |\n|---------|-----------|-------------|\n| *actualmente* | currently | actually (en realidad) |\n| *asistir* | to attend | to assist (ayudar) |\n| *carpeta* | folder | carpet (alfombra) |\n| *compromiso* | commitment | compromise (acuerdo mutuo) |\n| *constipado* | cold (illness) | constipated (estreñido) |\n| *embarazada* | pregnant | embarrassed (avergonzada) |\n| *éxito* | success | exit (salida) |\n| *fábrica* | factory | fabric (tela) |\n| *largo* | long | large (grande) |\n| *recordar* | to remember | to record (grabar) |\n| *ropa* | clothes | rope (cuerda) |\n| *sensible* | sensitive | sensible (sensato) |\n| *simpático* | nice, likeable | sympathetic (compasivo) |\n| *suceso* | event | success (éxito) |\n\nEn nivel C2 se espera el dominio de estos pares y la capacidad de usarlos correctamente en ambos idiomas.',
    rules: [
      'Memorizar los falsos amigos más comunes para evitar malentendidos.',
      'El contexto ayuda a distinguir el significado correcto.',
      'Algunos falsos amigos también existen entre variedades del español.',
      'En traducción, verificar los falsos amigos es parte de la revisión.',
    ],
    examples: [
      {
        english: 'Actualmente vivo en Madrid.',
        translation: 'I currently live in Madrid.',
        note: 'NO: "Actually I live in Madrid" (que significa "en realidad")',
      },
      {
        english: 'Estoy constipado, no puedo ir.',
        translation: "I have a cold, I can't go.",
        note: 'NO: "I\'m constipated" (que significa "estoy estreñido")',
      },
      {
        english: 'La conferencia fue un éxito.',
        translation: 'The conference was a success.',
        note: 'NO: "... was an exit" (salida)',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Estoy embarazada de la situación.',
        correct: 'Estoy avergonzada de la situación.',
        note: '"Embarazada" solo significa "pregnant", no "embarrassed".',
      },
      {
        wrong: 'Asistí a mi amigo con la mudanza.',
        correct: 'Ayudé a mi amigo con la mudanza.',
        note: '"Asistir" = to attend. Para "to assist" se usa "ayudar".',
      },
    ],
    related: ['equivalencia', 'matices-traduccion', 'precision-lexica'],
  },
  {
    slug: 'lexicon-historico',
    title: 'Léxico histórico del español',
    level: 'C2',
    category: 'Avanzado',
    summary:
      'Evolución del léxico español: del latín al español moderno. Cultismos, semicultismos y patrimoniales.',
    explanation:
      'El léxico español procede principalmente del **latín**, pero las palabras han seguido distintas vías evolutivas:\n\n**Palabras patrimoniales**:\n- Evolucionaron fonéticamente desde el latín por transmisión oral.\n- Lat. *oculum* → esp. *ojo*.\n- Lat. *fabulare* → esp. *hablar*.\n\n**Cultismos**:\n- Incorporadas tardíamente del latín, sin apenas evolución fonética.\n- Lat. *oculista* → esp. *oculista* (no *ojista*).\n- Lat. *fábula* → esp. *fábula* (no *habla* con ese significado).\n\n**Semicultismos**:\n- Evolución incompleta: lat. *saeculum* → esp. *siglo* (no *sejo* ni *século*).\n\n**Dobletes**:\n- Una misma palabra latina da dos palabras españolas: una patrimonial y otra culta.\n- Lat. *collocare* → *colgar* (patrimonial) y *colocar* (cultismo).\n- Lat. *plenum* → *lleno* (patrimonial) y *pleno* (cultismo).\n\nReconocer el origen de las palabras ayuda a entender ortografías irregulares y relaciones semánticas.',
    rules: [
      'Las palabras patrimoniales sufren más cambios fonéticos que los cultismos.',
      'Los dobletes muestran una misma raíz con dos evoluciones distintas.',
      'Muchos tecnicismos y palabras abstractas son cultismos.',
      'Conocer la etimología ayuda a deducir significados de palabras desconocidas.',
    ],
    examples: [
      {
        english:
          'Tengo el vaso lleno. / Tengo pleno conocimiento de los hechos.',
        translation: 'My glass is full. / I have full knowledge of the facts.',
        note: 'doblete: lleno (patrimonial) / pleno (cultismo)',
      },
      {
        english: 'La fábula enseña una moraleja. / Habla más alto, por favor.',
        translation: 'The fable teaches a moral. / Speak louder, please.',
        note: 'doblete: fábula (cultismo) / habla (patrimonial)',
      },
    ],
    common_mistakes: [],
    related: ['arabismos', 'indigenismos', 'derivacion'],
  },
  {
    slug: 'arabismos',
    title: 'Arabismos en el español',
    level: 'C2',
    category: 'Avanzado',
    summary:
      'Palabras de origen árabe en el léxico español y su importancia cultural.',
    explanation:
      'Los **arabismos** constituyen el segundo mayor componente léxico del español tras el latín (unas 4.000 palabras). Reflejan ocho siglos de presencia árabe en la península ibérica.\n\n**Campos semánticos con abundancia de arabismos**:\n\n**Agricultura y agua**:\n- *acequia, alberca, noria, azud, aljibe*\n- *aceite, aceituna, azúcar, algodón, arroz, naranja, limón, sandía, zanahoria, berenjena, alcachofa*\n\n**Arquitectura y vivienda**:\n- *alcoba, azotea, alféizar, tabique, zaguán, azulejo, alcantarilla*\n\n**Administración y comercio**:\n- *aduana, alcalde, albacea, álgebra, algoritmo, cifra, tarifa, almacén, almoneda*\n\n**Vida cotidiana**:\n- *almohada, alfombra, taza, jarra, guitarra, laúd, ajedrez*\n\n**Característica formal**: la mayoría empiezan por **al-** (artículo árabe fusionado) o **a-**: *alcohol, aldea, algodón, azúcar, acequia*.',
    rules: [
      'Muchos arabismos comienzan con al- o a- (artículo incorporado).',
      'Son más frecuentes en el sur de España y se extendieron a América.',
      'Algunos arabismos solo se usan en ciertas regiones.',
      'Conocer arabismos enriquece el vocabulario y la comprensión cultural.',
    ],
    examples: [
      {
        english: 'El aceite de oliva es fundamental en la dieta mediterránea.',
        translation: 'Olive oil is fundamental in the Mediterranean diet.',
        note: 'aceite < ár. az-zayt',
      },
      {
        english: 'Se sentó en la alcoba a leer un rato.',
        translation: 'He sat in the bedroom to read for a while.',
        note: 'alcoba < ár. al-qubba',
      },
      {
        english: 'El alcalde inauguró el nuevo mercado.',
        translation: 'The mayor inaugurated the new market.',
        note: 'alcalde < ár. al-qāḍī (juez)',
      },
    ],
    common_mistakes: [],
    related: ['indigenismos', 'lexicon-historico', 'diferencias-regionales'],
  },
  {
    slug: 'indigenismos',
    title: 'Indigenismos en el español',
    level: 'C2',
    category: 'Avanzado',
    summary:
      'Palabras de origen indígena americano incorporadas al español general.',
    explanation:
      'Los **indigenismos** son palabras procedentes de lenguas indígenas americanas que se han incorporado al español. Muchas han trascendido a otras lenguas.\n\n**Principales fuentes**:\n\n**Taíno** (Caribe):\n- *canoa, hamaca, huracán, maíz, tabaco, yuca, iguana, manatí, caimán*\n\n**Náhuatl** (México):\n- *chocolate, tomate, aguacate, cacao, coyote, ocelote, guacamole, petate, tiza, mecate*\n\n**Quechua** (Andes):\n- *cóndor, llama, puma, papa, cancha, carpa, mate, pampa, quinina, caucho*\n\n**Guaraní** (Paraguay/Río de la Plata):\n- *anaconda, jaguar, mandioca, tapir, petunia, tucán*\n\n**Características**:\n- Muchos son nombres de flora y fauna americana sin equivalente en el Viejo Mundo.\n- Algunos tienen diferente significado o frecuencia según el país.\n- *Papa* (tubérculo) en Latinoamérica; *patata* en España (del cruce papa + batata).',
    rules: [
      'Los indigenismos suelen ser sustantivos de realidades americanas.',
      'Muchos se han internacionalizado: chocolate, tomate, huracán, tabaco.',
      'La pronunciación y escritura se adaptaron al español.',
      'Algunos indigenismos solo se usan en sus países de origen.',
    ],
    examples: [
      {
        english: 'El huracán arrasó la costa caribeña.',
        translation: 'The hurricane devastated the Caribbean coast.',
        note: 'huracán < taíno',
      },
      {
        english: 'Me encanta el chocolate con churros.',
        translation: 'I love chocolate with churros.',
        note: 'chocolate < náhuatl xocolātl',
      },
      {
        english: 'En los Andes cultivan muchas variedades de papa.',
        translation: 'In the Andes they grow many varieties of potato.',
        note: 'papa < quechua',
      },
    ],
    common_mistakes: [],
    related: ['arabismos', 'lexicon-historico', 'espanol-latinoamerica'],
  },
  {
    slug: 'generos-textuales',
    title: 'Géneros textuales',
    level: 'C2',
    category: 'Avanzado',
    summary:
      'Dominio de diversos tipos de texto: ensayo, artículo académico, informe, reseña, crónica.',
    explanation:
      'En C2 se dominan las convenciones de distintos **géneros textuales** en español.\n\n**Ensayo**:\n- Texto argumentativo de extensión media.\n- Estilo personal y reflexivo.\n- Tesis, argumentación, ejemplos, conclusión.\n- Ej: Octavio Paz, *El laberinto de la soledad*.\n\n**Artículo académico**:\n- Estructura IMRyD (Introducción, Método, Resultados y Discusión).\n- Impersonalidad, nominalización, pasiva refleja.\n- Citación de fuentes.\n\n**Informe**:\n- Exposición objetiva de hechos o resultados.\n- Estructura clara con epígrafes.\n- Lenguaje denotativo, sin valoraciones personales.\n\n**Reseña**:\n- Resumen y valoración crítica de una obra.\n- Combina exposición (resumen) y argumentación (crítica).\n\n**Crónica**:\n- Relato periodístico que combina información y valoración.\n- Estilo más literario que la noticia.\n- Cronología y presencia del cronista.\n\n**Columna de opinión**:\n- Texto breve y periódico de opinión personal.\n- Estilo característico del autor.',
    rules: [
      'Cada género tiene convenciones de estructura, registro y estilo.',
      'El artículo académico prioriza la objetividad y la impersonalidad.',
      'La reseña combina exposición y crítica.',
      'La crónica admite un estilo más personal que la noticia.',
    ],
    examples: [
      {
        english:
          'El presente estudio analiza la relación entre el bilingüismo y el desarrollo cognitivo en niños de 3 a 6 años.',
        translation:
          'The present study analyzes the relationship between bilingualism and cognitive development in children aged 3 to 6.',
        note: 'artículo académico',
      },
      {
        english:
          'La obra, aunque irregular en su ritmo, ofrece una mirada conmovedora sobre la condición humana.',
        translation:
          'The work, although uneven in its pace, offers a moving look at the human condition.',
        note: 'reseña',
      },
    ],
    common_mistakes: [],
    related: [
      'estructura-argumentativa',
      'lenguaje-periodistico',
      'sintesis-textual',
    ],
  },
  {
    slug: 'creatividad-linguistica',
    title: 'Creatividad lingüística',
    level: 'C2',
    category: 'Avanzado',
    summary:
      'Jugar con el idioma: neologismos, juegos de palabras, calambures, usos lúdicos del español.',
    explanation:
      'La **creatividad lingüística** es la capacidad de usar el idioma de forma original, lúdica o innovadora, respetando (o transgrediendo con intención) sus normas.\n\n**Formas de creatividad lingüística**:\n\n**Neologismos**:\n- Por derivación: *tuitear, wasapear, googlear, likeador*.\n- Por composición: *ciberactivista, teletrabajo, videollamada*.\n- Por préstamo adaptado: *fútbol, eslogan, bluyín*.\n\n**Juegos de palabras**:\n- **Calambur**: agrupación distinta de sílabas: *Si el rey no muere, el reino muere.*\n- **Palíndromos**: *Dábale arroz a la zorra el abad.*\n- **Paronomasia**: semejanza fonética con diferente significado: *Tarde, pero sin sueño.*\n\n**Humor lingüístico**:\n- Equívocos, ambigüedades, dobles sentidos.\n- Exageración de rasgos dialectales.\n\n**Escritura creativa**:\n- Prosa poética, microrrelato, greguerías (Ramón Gómez de la Serna).\n- Mezcla de registros con intención estilística.',
    rules: [
      'Los neologismos deben ser comprensibles en contexto.',
      'La creatividad no justifica la incorrección involuntaria.',
      'Los juegos de palabras requieren dominio de la fonética y la polisemia.',
      'La greguería es un género inventado en español: humor + metáfora.',
    ],
    examples: [
      {
        english: '¿Te wasapeo luego y quedamos?',
        translation: "Shall I WhatsApp you later and we'll meet up?",
        note: 'neologismo: wasapear',
      },
      {
        english: 'El amor es un intento de desayunar dos veces.',
        translation: 'Love is an attempt to have breakfast twice.',
        note: 'greguería de Ramón Gómez de la Serna',
      },
      {
        english: 'Y todo es una broma, y todo es una broma que va en serio.',
        translation:
          'And everything is a joke, and everything is a joke that is serious.',
        note: 'juego de palabras y paradoja',
      },
    ],
    common_mistakes: [],
    related: ['doble-sentido', 'ironia', 'derivacion'],
  },
  {
    slug: 'edicion',
    title: 'Edición y corrección de textos',
    level: 'C2',
    category: 'Avanzado',
    summary:
      'Revisar y corregir textos propios y ajenos con criterio profesional.',
    explanation:
      'La **edición y corrección de textos** requiere aplicar criterios de corrección ortotipográfica, gramatical y de estilo.\n\n**Niveles de corrección**:\n\n**Corrección ortotipográfica**:\n- Ortografía: tildes, puntuación, uso de mayúsculas.\n- Abreviaturas, siglas, símbolos.\n- Comillas (españolas « », inglesas " ", simples \' \').\n\n**Corrección gramatical**:\n- Concordancia, régimen preposicional, orden de palabras.\n- Queísmo/Dequeísmo: *Me alegro de que vengas* (deque correcto) vs. *~~Pienso de que...~~* (dequeísmo).\n- Leísmo/Laísmo/Loísmo.\n\n**Corrección de estilo**:\n- Claridad: frases excesivamente largas, ambigüedades.\n- Precisión léxica: evitar palabras comodín.\n- Cohesión: conectores, referencias.\n- Adecuación al registro y al género textual.\n\n**Corrección de contenido**:\n- Verificar datos, fechas, nombres, citas.\n\nLos signos de corrección tipográfica son estándar (aunque con variantes).',
    rules: [
      'Revisar primero la estructura general, luego párrafos, luego frases, luego palabras.',
      'La corrección ortotipográfica incluye el uso correcto de los signos de puntuación españoles.',
      'El dequeísmo y el queísmo son errores frecuentes incluso entre hablantes nativos.',
      'Una buena corrección respeta el estilo del autor; no lo reescribe.',
    ],
    examples: [
      {
        english: '«No estoy de acuerdo», replicó el ministro.',
        translation: '"I don\'t agree," the minister replied.',
        note: 'uso de comillas españolas',
      },
      {
        english: 'Me alegro de que hayas venido.',
        translation: "I'm glad you've come.",
        note: 'deque correcto: alegrarse de que',
      },
    ],
    common_mistakes: [
      {
        wrong: 'Pienso de que tienes razón.',
        correct: 'Pienso que tienes razón.',
        note: 'Dequeísmo: "pensar" no rige "de".',
      },
      {
        wrong: 'Me alegro que hayas venido.',
        correct: 'Me alegro de que hayas venido.',
        note: 'Queísmo: "alegrarse" rige "de": alegrarse de algo.',
      },
    ],
    related: ['precision-lexica', 'cohesion-textual', 'registro-formal'],
  },
  {
    slug: 'expresion-matizada',
    title: 'Expresión matizada',
    level: 'C2',
    category: 'Avanzado',
    summary:
      'Expresar ideas con matices de certeza, duda, probabilidad y compromiso.',
    explanation:
      'En C2 se espera la capacidad de modular el grado de compromiso con lo dicho mediante **mecanismos de atenuación e intensificación**.\n\n**Escala de certeza (de menor a mayor)**:\n- *Es improbable que... / Dudo mucho que...*\n- *No estoy seguro de que...*\n- *Puede que... / Cabe la posibilidad de que...*\n- *Es posible que... / Quizás...*\n- *Probablemente / Seguramente...* (+ indicativo).\n- *Sin duda / Desde luego que / Está claro que...* (+ indicativo).\n\n**Recursos de atenuación pragmática**:\n- Futuro de conjetura: *Serán las tres.*\n- Condicional de modestia: *Yo diría que no es buena idea.*\n- Imperfecto de cortesía: *Quería pedirle un favor.*\n- Preguntas negativas: *¿No crees que deberíamos esperar?*\n\n**Recursos de refuerzo**:\n- Adverbios: *indudablemente, rotundamente, categóricamente*.\n- Estructuras enfáticas: *Lo que está claro es que... / De lo que no cabe duda es de que...*',
    rules: [
      'La escala de certeza se expresa con indicativo (certeza) o subjuntivo (duda).',
      'El futuro de conjetura y el condicional de modestia son marcas de habla culta coloquial.',
      'El imperfecto de cortesía atenúa peticiones.',
      'Matizar no es ser impreciso; es adecuar el discurso a lo que realmente se sabe.',
    ],
    examples: [
      {
        english:
          'Cabe la posibilidad de que la reunión se aplace hasta el lunes.',
        translation:
          'There is a possibility that the meeting will be postponed until Monday.',
        note: 'probabilidad baja',
      },
      {
        english: 'Yo diría que lo mejor es esperar unos días antes de decidir.',
        translation:
          'I would say that the best thing is to wait a few days before deciding.',
        note: 'condicional de modestia',
      },
      {
        english: 'Lo que está claro es que tenemos que actuar ya.',
        translation: 'What is clear is that we have to act now.',
        note: 'estructura enfática',
      },
    ],
    common_mistakes: [],
    related: ['matizadores', 'subjuntivo-duda', 'condicional-simple'],
  },
  {
    slug: 'integracion-gramatical',
    title: 'Integración gramatical completa',
    level: 'C2',
    category: 'Avanzado',
    summary:
      'Uso integrado y sin errores de todos los recursos gramaticales del español en la producción espontánea.',
    explanation:
      'El nivel C2 se caracteriza por la **automatización completa** de la gramática: el hablante no piensa en reglas, simplemente produce.\n\n**Indicadores de integración gramatical**:\n\n- **Alternancia ser/estar sin vacilación** incluso con adjetivos que cambian de significado (*ser listo* ≠ *estar listo*).\n- **Selección automática de indicativo/subjuntivo** en todos los contextos.\n- **Concordancia temporal** en discursos con múltiples planos sin errores.\n- **Uso natural de pronombres de OD/OI combinados** (se lo, me lo, etc.).\n- **Perífrasis verbales** usadas con precisión de matiz (*acabar de, volver a, andar + gerundio, venir a + infinitivo*).\n- **Dominio de los matices entre tiempos del pasado** (indefinido, imperfecto, perfecto, pluscuamperfecto).\n- **Uso de conectores y marcadores discursivos** de forma variada y precisa.\n- **Voz pasiva, impersonal y pasiva refleja** según el contexto y el registro.\n\nEn C2 el error gramatical es prácticamente inexistente. La diferencia con un nativo es solo de frecuencia de uso de ciertas estructuras.',
    rules: [
      'Producción fluida sin errores gramaticales sistemáticos.',
      'Capacidad de autocorrección inmediata cuando se comete un lapsus.',
      'Uso apropiado del registro en todas las situaciones.',
      'Comprensión de todas las estructuras gramaticales, incluso las de baja frecuencia.',
    ],
    examples: [
      {
        english:
          'De haberlo sabido, no habría venido; pero, ya que estoy aquí, lo mejor será que me quede y eche una mano, a no ser que prefieras que me vaya.',
        translation:
          "Had I known, I wouldn't have come; but since I'm here, the best thing will be for me to stay and lend a hand, unless you prefer me to leave.",
        note: 'integración de múltiples estructuras',
      },
    ],
    common_mistakes: [],
    related: ['fluidez-nativa', 'concordancia-de-tiempos', 'repaso-subjuntivo'],
  },
  {
    slug: 'fluidez-nativa',
    title: 'Fluidez nativa',
    level: 'C2',
    category: 'Avanzado',
    summary:
      'Características del habla de nivel nativo: muletillas, sobreentendidos, humor, referencias culturales.',
    explanation:
      'La **fluidez nativa** va más allá de la corrección gramatical. Implica:\n\n**Rasgos de la fluidez nativa**:\n\n**Velocidad y ritmo**:\n- Pausas mínimas, titubeos solo para planificar contenido, no forma.\n- Entonación natural adaptada a la intención comunicativa.\n\n**Dominio de los sobreentendidos**:\n- Capacidad de inferir lo no dicho por contexto y conocimiento compartido.\n- Comprensión de la ironía y el sarcasmo sin necesidad de marcas explícitas.\n\n**Referencias culturales compartidas**:\n- Refranes, frases de películas, memes, canciones, expresiones generacionales.\n- *¡Qué fuerte!*, *Me sabe mal*, *No me da la vida*, *Estoy de bajón*.\n\n**Humor**:\n- Capacidad de hacer y entender chistes, juegos de palabras, bromas situacionales.\n\n**Gestión de la conversación**:\n- Turnos de palabra fluidos, interrupciones naturales, cambios de tema suaves.\n\nLa fluidez nativa no significa hablar sin parar, sino comunicar con la misma naturalidad que un hablante nativo culto.',
    rules: [
      'La fluidez nativa incluye dominio de la pragmática y la cultura.',
      'Los sobreentendidos y el humor son las áreas más difíciles de dominar.',
      'Las referencias culturales requieren inmersión y exposición constante.',
      'La fluidez no es ausencia de errores, sino naturalidad en la comunicación.',
    ],
    examples: [
      {
        english:
          'O sea, que al final no vienes... pues nada, otro día será, no pasa nada.',
        translation:
          "So, in the end you're not coming... well, another time then, no worries.",
        note: 'muletillas y gestión de turno',
      },
      {
        english:
          '— Qué, ¿nos tomamos algo? — Me sabe mal, pero es que no me da la vida. — Venga, va, un ratito nada más.',
        translation:
          '"Hey, shall we grab a drink?" "I feel bad, but I\'m just too busy." "Come on, just for a little while."',
        note: 'diálogo natural coloquial',
      },
    ],
    common_mistakes: [],
    related: [
      'integracion-gramatical',
      'expresiones-coloquiales',
      'modismos-comunes',
      'expresion-matizada',
    ],
  },
]
