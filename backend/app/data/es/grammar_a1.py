"""Spanish grammar topics — A1."""

from app.data._types import GrammarExample, GrammarMistake, GrammarTopic

A1_GRAMMAR_TOPICS: list[GrammarTopic] = [
    GrammarTopic(
        slug="ser",
        title="El verbo ser",
        level="A1",
        category="Tiempos verbales",
        summary="Usos básicos del verbo ser: identidad, origen, características permanentes.",
        explanation="El verbo **ser** es uno de los dos verbos copulativos principales del español. Se usa para expresar:\n\n- **Identidad**: *Yo soy Ana.*\n- **Origen o nacionalidad**: *Él es de México. / Somos españoles.*\n- **Características permanentes**: *La casa es grande. / Mi hermana es alta.*\n- **Profesión**: *Ella es médica.*\n- **Posesión**: *El libro es de Juan.*\n- **Hora y fecha**: *Son las tres. / Hoy es lunes.*\n- **Material**: *La mesa es de madera.*\n\nA diferencia del inglés, el español **no** usa el pronombre obligatoriamente: *Soy profesor* es más natural que *Yo soy profesor*.",
        structure="yo soy · tú eres · él/ella/usted es · nosotros/as somos · vosotros/as sois · ellos/ellas/ustedes son",
        rules=[
            "El pronombre sujeto se omite con frecuencia porque la terminación del verbo indica la persona.",
            '"Ser" expresa características esenciales, permanentes o inherentes.',
            'La forma "es" cubre él, ella y usted indistintamente.',
            '"Ser de + lugar" indica origen o procedencia.',
            'En preguntas no se usa auxiliar: "¿Eres tú?".',
        ],
        examples=[
            GrammarExample(
                text="Soy estudiante de español.", translation="I am a Spanish student."
            ),
            GrammarExample(text="¿Eres de Argentina?", translation="Are you from Argentina?"),
            GrammarExample(text="Somos hermanos.", translation="We are siblings."),
            GrammarExample(
                text="Son las dos y media.", translation="It's two thirty.", note="hora"
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Estoy de Madrid.",
                correct="Soy de Madrid.",
                note='"Ser de" indica origen. "Estar" no se usa para procedencia.',
            ),
            GrammarMistake(
                wrong="Soy un profesor.",
                correct="Soy profesor.",
                note="Con profesiones no se usa artículo indefinido salvo que haya adjetivo.",
            ),
        ],
        related=["estar", "ser-nacionalidad", "pronombres-sujeto", "horas"],
    ),
    GrammarTopic(
        slug="pronombres-sujeto",
        title="Pronombres de sujeto",
        level="A1",
        category="Pronombres",
        summary="Los pronombres personales que realizan la acción del verbo.",
        explanation="Los **pronombres de sujeto** indican quién realiza la acción. En español es muy frecuente **omitirlos** porque la conjugación verbal ya identifica a la persona.\n\n| Singular | Plural |\n|----------|--------|\n| yo | nosotros / nosotras |\n| tú (informal) · usted (formal) | vosotros/as (España) · ustedes (América / formal) |\n| él · ella | ellos · ellas |\n\nEn América Latina **ustedes** sustituye completamente a **vosotros/as** tanto en contextos formales como informales. En España, vosotros/as es informal y ustedes es formal. El pronombre **ello** es neutro y se usa raramente para ideas abstractas.",
        structure="yo · tú · él/ella/usted · nosotros/as · vosotros/as · ellos/ellas/ustedes",
        rules=[
            "Los pronombres de sujeto se omiten normalmente. Solo se usan para énfasis, contraste o ambigüedad.",
            '"Usted" es formal; "tú" es informal. En Argentina/Uruguay se usa "vos" en lugar de "tú".',
            '"Nosotros/as" y "vosotros/as" tienen forma femenina cuando todo el grupo es femenino.',
            'En América Latina "ustedes" reemplaza a "vosotros/as" en todos los contextos.',
            '"Ello" es el pronombre neutro y casi no se usa en español coloquial.',
        ],
        examples=[
            GrammarExample(
                text="Yo vivo en Barcelona.", translation="I live in Barcelona.", note="énfasis"
            ),
            GrammarExample(
                text="¿Tú qué opinas?", translation="What do you think?", note="contraste"
            ),
            GrammarExample(
                text="Ustedes son muy amables.",
                translation="You are very kind.",
                note="América Latina",
            ),
            GrammarExample(
                text="Vosotros tenéis razón.", translation="You are right.", note="España"
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Es de México.",
                correct="Él es de México. / Es de México.",
                note='Sin tilde, "es" es verbo. Con tilde, "él" es pronombre. En contexto suele estar claro.',
            ),
            GrammarMistake(
                wrong="Tú eres de España?",
                correct="¿Tú eres de España?",
                note="No olvidar el signo de apertura de interrogación (¿).",
            ),
        ],
        related=["ser", "adjetivos-posesivos", "verbos-reflexivos"],
    ),
    GrammarTopic(
        slug="articulos-definidos",
        title="Artículos definidos",
        level="A1",
        category="Artículos",
        summary="el, la, los, las — cómo y cuándo usar el artículo determinado.",
        explanation="Los **artículos definidos** (el, la, los, las) acompañan a un sustantivo conocido por el hablante y el oyente, o que ha sido mencionado antes.\n\nSe usan para:\n- **Referirse a algo específico**: *El coche de Juan es rojo.*\n- **Generalizaciones**: *Los perros son leales.*\n- **Sustantivar otras palabras**: *Lo importante es participar.*\n\nEl artículo neutro **lo** se usa con adjetivos o adverbios para formar sustantivos abstractos: *lo bueno, lo malo, lo hecho*.\n\nContracciones obligatorias: **a + el → al** (*Voy al parque*) y **de + el → del** (*La casa del profesor*).",
        structure="el (masc. sing.) · la (fem. sing.) · los (masc. pl.) · las (fem. pl.)",
        rules=[
            "Concuerdan en género y número con el sustantivo que acompañan.",
            '"El" se usa ante sustantivos femeninos que empiezan con "a" o "ha" tónica: *el agua, el hacha, el águila*.',
            'Las contracciones "al" y "del" son obligatorias.',
            'El artículo neutro "lo" no acompaña sustantivos, solo adjetivos o adverbios.',
            "Se omite el artículo con nombres propios de persona, salvo en registros coloquiales.",
        ],
        examples=[
            GrammarExample(
                text="El libro está en la mesa.", translation="The book is on the table."
            ),
            GrammarExample(
                text="Los niños juegan en el parque.", translation="The children play in the park."
            ),
            GrammarExample(
                text="Voy al cine los sábados.",
                translation="I go to the cinema on Saturdays.",
                note="contracción al",
            ),
            GrammarExample(
                text="Lo difícil es empezar.",
                translation="The hard part is starting.",
                note="artículo neutro lo",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="El agua está fría.",
                correct="El agua está fría.",
                note='Correcto. "Agua" es femenino pero usa "el" por la a tónica. El adjetivo va en femenino.',
            ),
            GrammarMistake(
                wrong="Voy a el colegio.",
                correct="Voy al colegio.",
                note='La contracción "al" es obligatoria.',
            ),
        ],
        related=["articulos-indefinidos", "genero-sustantivos", "preposiciones-lugar"],
    ),
    GrammarTopic(
        slug="ser-nacionalidad",
        title="Ser + nacionalidad y origen",
        level="A1",
        category="Tiempos verbales",
        summary="Expresar procedencia, nacionalidad y origen con el verbo ser.",
        explanation="Para expresar el **origen** y la **nacionalidad** se usa el verbo **ser** con dos estructuras:\n\n1. **Ser + de + lugar** (ciudad, país, región): *Soy de Colombia. / Somos de Barcelona.*\n2. **Ser + adjetivo de nacionalidad**: *Es mexicana. / Son franceses.*\n\nLos adjetivos de nacionalidad **concuerdan en género y número** con el sujeto:\n- *Juan es español. / María es española.*\n- *Ellos son italianos. / Ellas son italianas.*\n\n**No** se usa artículo con la profesión ni con la nacionalidad, salvo que el sustantivo esté modificado: *Es un español muy simpático.*",
        structure="ser + de + lugar · ser + adjetivo de nacionalidad",
        rules=[
            '"Ser de + lugar" para origen geográfico. No se usa "estar" para este sentido.',
            "Los adjetivos de nacionalidad llevan minúscula en español.",
            "Concordancia de género: -o/-a, consonante + a, -és/-esa.",
            "En plural se añade -s o -es según corresponda.",
        ],
        examples=[
            GrammarExample(text="Soy de Perú.", translation="I am from Peru."),
            GrammarExample(text="Ella es inglesa.", translation="She is English."),
            GrammarExample(text="Nosotros somos alemanes.", translation="We are German."),
            GrammarExample(text="¿De dónde eres?", translation="Where are you from?"),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Estoy de Francia.",
                correct="Soy de Francia.",
                note='"Estar de" no indica origen. "Soy de" es la fórmula correcta.',
            ),
            GrammarMistake(
                wrong="Soy Española.",
                correct="Soy española.",
                note="Los adjetivos de nacionalidad van en minúscula.",
            ),
        ],
        related=["ser", "genero-sustantivos", "articulos-indefinidos"],
    ),
    GrammarTopic(
        slug="genero-sustantivos",
        title="Género de los sustantivos",
        level="A1",
        category="Sustantivos",
        summary="Reglas básicas para saber si un sustantivo es masculino o femenino.",
        explanation="En español todos los sustantivos tienen **género gramatical**: masculino o femenino. No existe el género neutro para sustantivos.\n\n**Generalmente son masculinos**:\n- Palabras terminadas en **-o**: *el libro, el perro*.\n- Palabras terminadas en **-or**: *el amor, el dolor* (excepción: *la flor*).\n- Palabras terminadas en **-aje**: *el viaje, el coraje*.\n- Días de la semana, colores usados como sustantivos, ríos, mares.\n\n**Generalmente son femeninos**:\n- Palabras terminadas en **-a**: *la casa, la mesa*.\n- Palabras terminadas en **-ción, -sión, -dad, -tad, -tud**: *la canción, la actitud*.\n- Letras del alfabeto: *la a, la be*.\n\nExisten muchas excepciones: *el día, el mapa, la mano, la radio*. Conviene aprender el artículo junto con el sustantivo.",
        structure="sustantivo masculino (-o, -or, -aje...) · sustantivo femenino (-a, -ción, -dad...)",
        rules=[
            "Todo sustantivo tiene género; no hay neutro para objetos.",
            "-o suele ser masculino; -a suele ser femenino, pero hay excepciones notables.",
            "Las palabras de origen griego terminadas en -ma, -pa, -ta son masculinas: el problema, el planeta, el sistema.",
            "Los sustantivos terminados en -ista son invariables en género: el/la artista, el/la dentista.",
            'El artículo determina el género en casos ambiguos: "el mar" / "la mar" (poético).',
        ],
        examples=[
            GrammarExample(text="El coche rojo.", translation="The red car."),
            GrammarExample(text="La canción es bonita.", translation="The song is pretty."),
            GrammarExample(
                text="El problema es grave.",
                translation="The problem is serious.",
                note="masculino de origen griego",
            ),
            GrammarExample(
                text="La mano izquierda.",
                translation="The left hand.",
                note="excepción: femenino terminado en -o",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="La problema.",
                correct="El problema.",
                note="Las palabras de origen griego en -ma son masculinas.",
            ),
            GrammarMistake(
                wrong="El día es bonita.",
                correct="El día es bonito.",
                note='"Día" es masculino aunque termine en -a. El adjetivo debe concordar.',
            ),
        ],
        related=["articulos-definidos", "articulos-indefinidos", "adjetivos-descriptivos"],
    ),
    GrammarTopic(
        slug="articulos-indefinidos",
        title="Artículos indefinidos",
        level="A1",
        category="Artículos",
        summary="un, una, unos, unas — el artículo indeterminado en español.",
        explanation="Los **artículos indefinidos** acompañan a sustantivos no identificados, que se mencionan por primera vez o que son uno entre muchos.\n\n| | Singular | Plural |\n|---|----------|--------|\n| Masculino | un libro | unos libros |\n| Femenino | una casa | unas casas |\n\nSe usan para:\n- **Primera mención**: *Hay un gato en el jardín.*\n- **Cantidad aproximada**: *Tiene unos treinta años.*\n- **Sustantivo no específico**: *Busco un trabajo.*\n\n**No** se usan con profesiones, nacionalidades o religiones cuando no hay adjetivo modificador: *Es profesor.*",
        structure="un (masc. sing.) · una (fem. sing.) · unos (masc. pl.) · unas (fem. pl.)",
        rules=[
            '"Un" se usa también ante sustantivos femeninos con a tónica: *un águila, un arma*.',
            'En plural funciona como "algunos/as" o cantidad aproximada.',
            "Se omite con profesiones, nacionalidades y religiones sin adjetivo modificador.",
            'No existe artículo indefinido neutro como el definido "lo".',
        ],
        examples=[
            GrammarExample(text="Necesito un bolígrafo.", translation="I need a pen."),
            GrammarExample(
                text="Hay una farmacia cerca.", translation="There's a pharmacy nearby."
            ),
            GrammarExample(
                text="Tiene unas ideas muy buenas.", translation="She has some very good ideas."
            ),
            GrammarExample(
                text="Es una arquitecta famosa.",
                translation="She is a famous architect.",
                note="con adjetivo, sí lleva artículo",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Es un profesor.",
                correct="Es profesor.",
                note="Sin adjetivo, no se usa artículo con profesiones.",
            ),
            GrammarMistake(
                wrong="Una agua fría.",
                correct="Un agua fría.",
                note='"Agua" es femenino pero usa "un" por la a tónica. El adjetivo va en femenino.',
            ),
        ],
        related=["articulos-definidos", "genero-sustantivos", "hay"],
    ),
    GrammarTopic(
        slug="tener",
        title="El verbo tener",
        level="A1",
        category="Tiempos verbales",
        summary="Expresar posesión, edad y sensaciones con el verbo tener.",
        explanation="El verbo **tener** es irregular (cambio vocálico e → ie) y es uno de los más usados en español. Además de la posesión, expresa:\n\n- **Posesión**: *Tengo un coche nuevo.*\n- **Edad**: *Tengo 25 años.* (NO ~~Soy 25 años~~)\n- **Sensaciones físicas**: *Tengo hambre / sed / frío / calor / sueño.*\n- **Estados**: *Tengo miedo / prisa / suerte / razón.*\n\nEl español usa **tener + sustantivo** donde el inglés usa *to be + adjective*: *I am hungry → Tengo hambre. I am cold → Tengo frío.*",
        structure="yo tengo · tú tienes · él tiene · nosotros tenemos · vosotros tenéis · ellos tienen",
        rules=[
            "Es verbo irregular con diptongación e→ie en las formas tónicas (tú tienes, ellos tienen).",
            'La primera persona es irregular: "yo tengo" (no ~~tieno~~).',
            'Para la edad se usa "tener", nunca "ser": "Tengo 30 años".',
            '"Tener que + infinitivo" expresa obligación: "Tengo que estudiar".',
        ],
        examples=[
            GrammarExample(text="Tengo dos hermanos.", translation="I have two siblings."),
            GrammarExample(text="¿Cuántos años tienes?", translation="How old are you?"),
            GrammarExample(text="Tenemos hambre.", translation="We are hungry."),
            GrammarExample(text="Tienes razón.", translation="You are right."),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Soy 20 años.",
                correct="Tengo 20 años.",
                note='En español la edad se expresa con "tener", no con "ser".',
            ),
            GrammarMistake(
                wrong="Soy hambre.",
                correct="Tengo hambre.",
                note='Las sensaciones físicas usan "tener + sustantivo", no "ser".',
            ),
        ],
        related=["ser", "estar", "adjetivos-posesivos"],
    ),
    GrammarTopic(
        slug="adjetivos-posesivos",
        title="Adjetivos posesivos",
        level="A1",
        category="Pronombres",
        summary="mi, tu, su, nuestro, vuestro — indicar posesión antes del sustantivo.",
        explanation="Los **adjetivos posesivos** se colocan **delante del sustantivo** y concuerdan en **número** con la cosa poseída. Solo *nuestro* y *vuestro* concuerdan también en **género**.\n\n| Poseedor | Singular | Plural |\n|----------|----------|--------|\n| yo | mi | mis |\n| tú | tu | tus |\n| él/ella/usted | su | sus |\n| nosotros/as | nuestro/a | nuestros/as |\n| vosotros/as | vuestro/a | vuestros/as |\n| ellos/ellas/ustedes | su | sus |\n\nAtención: **su/sus** puede significar *de él, de ella, de usted, de ellos, de ellas, de ustedes*. En contextos ambiguos se usa **de + pronombre**: *su libro → el libro de él/ella*.",
        structure="mi(s) · tu(s) · su(s) · nuestro/a(s) · vuestro/a(s)",
        rules=[
            "Concuerdan en número (singular/plural) con el objeto poseído, no con el poseedor.",
            '"Nuestro" y "vuestro" también concuerdan en género (nuestro/nuestra).',
            'No se usan artículos con los posesivos: "mi libro" (no ~~el mi libro~~).',
            '"Su/sus" es ambiguo; cuando sea necesario, aclarar con "de + pronombre".',
        ],
        examples=[
            GrammarExample(text="Mi casa es pequeña.", translation="My house is small."),
            GrammarExample(text="¿Dónde están tus llaves?", translation="Where are your keys?"),
            GrammarExample(
                text="Nuestra profesora es de Chile.", translation="Our teacher is from Chile."
            ),
            GrammarExample(
                text="Sus hijos son muy educados.",
                translation="Her/His/Their children are very polite.",
                note="ambiguo",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="La mi mochila.",
                correct="Mi mochila.",
                note="En español no se usa artículo con el posesivo antepuesto.",
            ),
            GrammarMistake(
                wrong="Sus libro.",
                correct="Su libro. / Sus libros.",
                note="El posesivo concuerda en número con el sustantivo al que acompaña.",
            ),
        ],
        related=["pronombres-sujeto", "tener", "genero-sustantivos"],
    ),
    GrammarTopic(
        slug="adjetivos-descriptivos",
        title="Adjetivos descriptivos",
        level="A1",
        category="Adjetivos y adverbios",
        summary="Cómo describir personas, objetos y lugares con adjetivos que concuerdan en género y número.",
        explanation="En español los adjetivos **concuerdan en género y número** con el sustantivo al que modifican. Normalmente van **después del sustantivo**, aunque algunos pueden ir antes por énfasis o estilo.\n\n- **Masculino singular**: *el libro interesante*\n- **Femenino singular**: *la película interesante*\n- **Masculino plural**: *los libros interesantes*\n- **Femenino plural**: *las películas interesantes*\n\nLos adjetivos terminados en **-o** cambian a **-a** para el femenino: *alto → alta*. Los terminados en **-e** o consonante suelen ser invariables en género: *inteligente, feliz*. Para el plural se añade **-s** (o **-es** tras consonante).\n\nAlgunos adjetivos se apocopan delante de un sustantivo masculino singular: *bueno → buen, malo → mal, grande → gran*.",
        structure="sustantivo + adjetivo (normalmente) — adjetivo concuerda en género y número",
        rules=[
            "El adjetivo concuerda en género y número con el sustantivo.",
            "Normalmente va detrás del sustantivo, especialmente en descripciones objetivas.",
            "Algunos adjetivos se acortan delante de un sustantivo masculino singular: bueno → buen, malo → mal, grande → gran.",
            'Varios adjetivos seguidos concuerdan todos: "una casa grande y luminosa".',
        ],
        examples=[
            GrammarExample(text="Un perro negro.", translation="A black dog."),
            GrammarExample(text="Una chica inteligente.", translation="An intelligent girl."),
            GrammarExample(text="Los edificios altos.", translation="The tall buildings."),
            GrammarExample(
                text="Es un buen amigo.", translation="He's a good friend.", note="apócope de bueno"
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="La casa blanco.",
                correct="La casa blanca.",
                note="El adjetivo debe concordar en género: casa (fem.) → blanca (fem.).",
            ),
            GrammarMistake(
                wrong="Un grande problema.",
                correct="Un gran problema.",
                note='"Grande" se apocopa a "gran" delante de sustantivo singular, masculino o femenino.',
            ),
        ],
        related=["genero-sustantivos", "comparativos", "superlativos"],
    ),
    GrammarTopic(
        slug="presente-regular",
        title="Presente de indicativo regular",
        level="A1",
        category="Tiempos verbales",
        summary="Conjugación de los verbos regulares en presente: -ar, -er, -ir.",
        explanation="En español hay tres conjugaciones regulares según la terminación del infinitivo: **-ar**, **-er**, **-ir**. El presente de indicativo se usa para acciones habituales, hechos generales y descripciones.\n\n| Persona | -ar (hablar) | -er (comer) | -ir (vivir) |\n|--------|-------------|------------|-------------|\n| yo | hablo | como | vivo |\n| tú | hablas | comes | vives |\n| él/ella/usted | habla | come | vive |\n| nosotros/as | hablamos | comemos | vivimos |\n| vosotros/as | habláis | coméis | vivís |\n| ellos/ellas/ustedes | hablan | comen | viven |\n\nSe usa también para pedir cosas en presente: *¿Me pasas la sal?* y para hablar del futuro cercano: *Mañana te llamo.*",
        structure="raíz + -o/-as/-a/-amos/-áis/-an (AR) · -o/-es/-e/-emos/-éis/-en (ER) · -o/-es/-e/-imos/-ís/-en (IR)",
        rules=[
            'Las terminaciones son distintas para cada conjugación, salvo "yo" y "él/ella/usted" en -er e -ir que coinciden (-o/-e).',
            'La "o" de la primera persona singular es idéntica en las tres conjugaciones.',
            "Nosotros de -ar y -ir comparten vocal temática: hablamos / vivimos; nosotros de -er es distinta: comemos.",
            'No se usa auxiliar para negativas ni preguntas: "No hablo francés", "¿Comes carne?".',
        ],
        examples=[
            GrammarExample(
                text="Hablo español e inglés.", translation="I speak Spanish and English."
            ),
            GrammarExample(text="¿Comes en casa hoy?", translation="Are you eating at home today?"),
            GrammarExample(text="Vivimos en el centro.", translation="We live downtown."),
            GrammarExample(
                text="Mis padres no trabajan los fines de semana.",
                translation="My parents don't work on weekends.",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Yo habla español.",
                correct="Yo hablo español.",
                note="La primera persona singular termina en -o para las tres conjugaciones.",
            ),
            GrammarMistake(
                wrong="Nosotros comemos juntos?",
                correct="¿Nosotros comemos juntos?",
                note="No olvidar el signo ¿ en las preguntas.",
            ),
        ],
        related=["ser", "tener", "estar", "querer-poder", "verbos-reflexivos"],
    ),
    GrammarTopic(
        slug="verbos-reflexivos",
        title="Verbos reflexivos",
        level="A1",
        category="Verbos",
        summary="Acciones que el sujeto realiza sobre sí mismo: levantarse, ducharse, vestirse.",
        explanation="Un verbo reflexivo indica que el sujeto realiza y recibe la acción. Se conjugan con los **pronombres reflexivos** que se colocan **delante del verbo** conjugado.\n\n| Pronombre | Ejemplo con *levantarse* |\n|-----------|--------------------------|\n| me | (yo) me levanto |\n| te | (tú) te levantas |\n| se | (él/ella/usted) se levanta |\n| nos | (nosotros) nos levantamos |\n| os | (vosotros) os levantáis |\n| se | (ellos/ellas/ustedes) se levantan |\n\nMuchos verbos cambian de significado al usarse como reflexivos: *llamar* (to call) vs. *llamarse* (to be named); *ir* (to go) vs. *irse* (to leave).",
        structure="pronombre reflexivo (me/te/se/nos/os/se) + verbo conjugado",
        rules=[
            "El pronombre reflexivo concuerda con el sujeto: me, te, se, nos, os, se.",
            "El pronombre va antes del verbo conjugado, salvo en imperativo afirmativo e infinitivo.",
            'En infinitivo y gerundio, el pronombre puede ir al final soldado a la palabra: "levantarme", "levantándose".',
            'No todos los verbos con "se" son reflexivos; algunos son pronominales (quejarse, arrepentirse) sin valor reflexivo real.',
        ],
        examples=[
            GrammarExample(text="Me levanto a las siete.", translation="I get up at seven."),
            GrammarExample(
                text="¿A qué hora te acuestas?", translation="What time do you go to bed?"
            ),
            GrammarExample(
                text="Nos duchamos por la mañana.", translation="We shower in the morning."
            ),
            GrammarExample(text="Ella se llama Carmen.", translation="Her name is Carmen."),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Levanto a las siete.",
                correct="Me levanto a las siete.",
                note="No olvidar el pronombre reflexivo.",
            ),
            GrammarMistake(
                wrong="Se llamo Juan.",
                correct="Me llamo Juan.",
                note="El pronombre debe concordar con el sujeto: yo → me.",
            ),
        ],
        related=["presente-regular", "horas", "pronombres-sujeto"],
    ),
    GrammarTopic(
        slug="horas",
        title="La hora",
        level="A1",
        category="Sustantivos",
        summary="Preguntar y decir la hora en español.",
        explanation="Para preguntar la hora se usa: **¿Qué hora es?** (más frecuente) o **¿Qué horas son?** (Latinoamérica).\n\nPara responder:\n- **Es la una** (singular, solo para la 1:00).\n- **Son las dos/tres/cuatro...** (plural).\n\nPara los minutos:\n- *y cinco, y diez, y cuarto, y veinte, y veinticinco, y media*\n- *menos cinco, menos diez, menos cuarto, menos veinte, menos veinticinco*\n\nEn muchos países de América y en usos formales se prefiere el formato digital: *Son las tres y quince / Son las tres quince.*",
        structure="¿Qué hora es? · Es la una / Son las dos, tres... · a las + hora",
        rules=[
            'Usar "es" solo para la una; "son" para el resto.',
            '"A la una" (singular), "a las dos" (plural) para indicar a qué hora ocurre algo.',
            'Mediodía y medianoche: "Es mediodía / Es medianoche", no llevan artículo.',
            'El formato de 24 horas es frecuente en horarios: "Son las quince horas / catorce treinta".',
        ],
        examples=[
            GrammarExample(
                text="¿Qué hora es? — Son las tres y media.",
                translation="What time is it? — It's half past three.",
            ),
            GrammarExample(
                text="La clase empieza a las nueve.", translation="The class starts at nine."
            ),
            GrammarExample(text="Son las dos menos cuarto.", translation="It's a quarter to two."),
            GrammarExample(text="Es la una en punto.", translation="It's one o'clock sharp."),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Son la una y media.",
                correct="Es la una y media.",
                note='Con la una se usa "es", no "son".',
            ),
            GrammarMistake(
                wrong="A las una.",
                correct="A la una.",
                note='La una es singular: "a la una", no "a las una".',
            ),
        ],
        related=["ser", "dias-semana", "verbos-reflexivos"],
    ),
    GrammarTopic(
        slug="gustar",
        title="El verbo gustar",
        level="A1",
        category="Verbos",
        summary="Expresar gustos y preferencias con la estructura me gusta / me gustan.",
        explanation='El verbo **gustar** tiene una estructura diferente a la del inglés. Literalmente significa "ser agradable para alguien". El sujeto gramatical es la cosa que gusta, no la persona.\n\n| Pronombre OI | Significado |\n|-------------|-------------|\n| me | a mí |\n| te | a ti |\n| le | a él / a ella / a usted |\n| nos | a nosotros/as |\n| os | a vosotros/as |\n| les | a ellos / a ellas / a ustedes |\n\n**Gusta** (singular): cuando lo que gusta es un sustantivo singular o un infinitivo.\n- *Me gusta el chocolate. / Me gusta bailar.*\n\n**Gustan** (plural): cuando lo que gusta es un sustantivo plural.\n- *Me gustan los perros.*\n\nPara enfatizar o aclarar: **a + pronombre tónico**: *A mí me gusta, a ti te gusta.*',
        structure="pronombre de OI (me/te/le/nos/os/les) + gusta/gustan + sujeto",
        rules=[
            "El verbo concuerda con la cosa que gusta (sujeto real), no con la persona.",
            'Nunca se dice "~~yo gusto~~" con el significado de "me gusta".',
            "Otros verbos con la misma estructura: encantar, interesar, doler, parecer, importar.",
            '"A + pronombre" es opcional y se usa para énfasis o contraste.',
        ],
        examples=[
            GrammarExample(text="Me gusta el café.", translation="I like coffee."),
            GrammarExample(
                text="¿Te gustan las películas de terror?", translation="Do you like horror movies?"
            ),
            GrammarExample(text="A ella le gusta viajar.", translation="She likes to travel."),
            GrammarExample(
                text="Nos encanta la música latina.",
                translation="We love Latin music.",
                note="misma estructura que gustar",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Yo gusto el café.",
                correct="Me gusta el café. / A mí me gusta el café.",
                note='"Gustar" no se conjuga como "to like". El sujeto es "el café".',
            ),
            GrammarMistake(
                wrong="Me gustan bailar.",
                correct="Me gusta bailar.",
                note="Con infinitivo, el verbo gustar va en singular.",
            ),
        ],
        related=["tambien-tampoco", "pronombres-objeto-indirecto", "muy-mucho"],
    ),
    GrammarTopic(
        slug="tambien-tampoco",
        title="También y tampoco",
        level="A1",
        category="Adjetivos y adverbios",
        summary="Expresar acuerdo o coincidencia con también y tampoco.",
        explanation='**También** y **tampoco** expresan coincidencia o acuerdo con lo dicho anteriormente.\n\n- **También**: se usa en contextos **afirmativos** para añadir un elemento o expresar acuerdo.\n  *— Me gusta el fútbol. — A mí también.*\n\n- **Tampoco**: se usa en contextos **negativos** para expresar coincidencia en la negación.\n  *— No me gusta el frío. — A mí tampoco.*\n\nEn español, a diferencia del inglés, **no existe doble negación** con "tampoco": *Yo tampoco lo sé* (no ~~Yo no tampoco lo sé~~). Tampoco ya contiene la negación.',
        structure="también (afirmativo) · tampoco (negativo)",
        rules=[
            '"También" para añadir información afirmativa o mostrar acuerdo positivo.',
            '"Tampoco" para mostrar acuerdo negativo o añadir un elemento más en una negación.',
            'No se usa "no" delante de "tampoco": "Yo tampoco voy".',
            'Se pueden reforzar con "a mí también/tampoco".',
        ],
        examples=[
            GrammarExample(
                text="— Me gusta leer. — A mí también.", translation='"I like reading." "Me too."'
            ),
            GrammarExample(
                text="— No he ido al cine. — Yo tampoco.",
                translation='"I haven\'t been to the cinema." "Me neither."',
            ),
            GrammarExample(
                text="Ella también habla francés.", translation="She also speaks French."
            ),
            GrammarExample(
                text="Él tampoco sabe la respuesta.",
                translation="He doesn't know the answer either.",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Yo no tampoco.",
                correct="Yo tampoco.",
                note='"Tampoco" ya incluye la negación; no se necesita "no".',
            ),
            GrammarMistake(
                wrong="— No me gusta. — Yo también.",
                correct="— No me gusta. — A mí tampoco.",
                note='Para coincidir en una negación se usa "tampoco", no "también".',
            ),
        ],
        related=["gustar", "muy-mucho", "presente-regular"],
    ),
    GrammarTopic(
        slug="muy-mucho",
        title="Muy y mucho",
        level="A1",
        category="Adjetivos y adverbios",
        summary="Diferenciar el uso de muy (con adjetivos y adverbios) y mucho (con sustantivos y verbos).",
        explanation="En español distinguimos **muy** y **mucho** según a qué modifican:\n\n- **Muy** (invariable): modifica **adjetivos** y **adverbios**.\n  *Es muy alto. / Habla muy rápido.*\n\n- **Mucho/a/os/as**: modifica **sustantivos** (concuerda en género y número) o acompaña a **verbos** (invariable: mucho).\n  *Tiene mucho dinero. / Tengo muchas ganas. / Trabaja mucho.*\n\nLa diferencia fundamental: **muy** nunca acompaña a un sustantivo ni a un verbo directamente; **mucho** nunca acompaña a un adjetivo directamente. Excepciones con adjetivos comparativos: *mucho mejor, mucho peor, mucho mayor, mucho menor*.",
        structure="muy + adjetivo/adverbio · mucho/a/os/as + sustantivo · verbo + mucho",
        rules=[
            '"Muy" siempre va con adjetivos o adverbios: muy bien, muy bonito, muy lejos.',
            '"Mucho" concuerda con el sustantivo al que acompaña: mucho trabajo, mucha gente, muchos libros, muchas horas.',
            'Con verbos, "mucho" es invariable: comer mucho, dormir mucho.',
            "Excepciones con adjetivos comparativos: mucho mejor, mucho peor, mucho mayor, mucho menor.",
        ],
        examples=[
            GrammarExample(
                text="La película es muy interesante.", translation="The film is very interesting."
            ),
            GrammarExample(text="Tengo mucha hambre.", translation="I am very hungry."),
            GrammarExample(
                text="Estudia mucho todos los días.", translation="He studies a lot every day."
            ),
            GrammarExample(
                text="Este diccionario es mucho mejor.",
                translation="This dictionary is much better.",
                note="comparativo",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Estoy mucho cansado.",
                correct="Estoy muy cansado.",
                note='Con adjetivos se usa "muy", no "mucho".',
            ),
            GrammarMistake(
                wrong="Tengo muy dinero.",
                correct="Tengo mucho dinero.",
                note='Con sustantivos se usa "mucho", no "muy".',
            ),
        ],
        related=["adjetivos-descriptivos", "comparativos", "superlativos"],
    ),
    GrammarTopic(
        slug="estar",
        title="El verbo estar",
        level="A1",
        category="Tiempos verbales",
        summary="Usos de estar: ubicación, estados temporales, el presente continuo.",
        explanation="El verbo **estar** es el segundo verbo copulativo del español y se usa para:\n\n- **Ubicación espacial** de personas y cosas: *Estoy en casa. / El banco está en la plaza.*\n- **Estados temporales o cambiantes**: *Estoy cansado. / La sopa está fría.*\n- **Presente continuo**: *estar + gerundio* → *Estoy estudiando. / Está lloviendo.*\n- **Estado civil temporal**: *Estoy soltero/casado.* (aunque también se admite *soy soltero* como estado civil permanente).\n\nNo se usa **estar** para el origen (→ *ser*) ni para eventos (→ *ser*). La elección entre ser y estar depende de si la cualidad se percibe como permanente o temporal.",
        structure="yo estoy · tú estás · él/ella/usted está · nosotros estamos · vosotros estáis · ellos/ellas/ustedes están",
        rules=[
            'Estar para ubicación: "Estoy en casa", "Madrid está en España".',
            'Estar para estados temporales: "Estoy enfermo", "Está nublado".',
            '"Estar + gerundio" forma el presente continuo.',
            "Nunca usar estar para origen o nacionalidad.",
        ],
        examples=[
            GrammarExample(
                text="¿Dónde está el supermercado?", translation="Where is the supermarket?"
            ),
            GrammarExample(text="Estoy muy contento hoy.", translation="I am very happy today."),
            GrammarExample(
                text="Estamos aprendiendo español.", translation="We are learning Spanish."
            ),
            GrammarExample(text="La puerta está abierta.", translation="The door is open."),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Soy en la oficina.",
                correct="Estoy en la oficina.",
                note='Para ubicación se usa "estar", no "ser".',
            ),
            GrammarMistake(
                wrong="La fiesta está en el salón.",
                correct="La fiesta es en el salón.",
                note='Para eventos se usa "ser", no "estar".',
            ),
        ],
        related=["ser", "hay", "preposiciones-lugar", "presente-regular"],
    ),
    GrammarTopic(
        slug="hay",
        title="Hay (haber impersonal)",
        level="A1",
        category="Tiempos verbales",
        summary='Expresar existencia con la forma impersonal "hay".',
        explanation='**Hay** es la forma impersonal del verbo **haber** en presente. Significa "existe/n" y es **invariable**: se usa la misma forma para singular y plural.\n\n- *Hay un gato en el jardín.* (There is a cat in the garden.)\n- *Hay tres libros en la mesa.* (There are three books on the table.)\n\nNunca se dice ~~"Hayn"~~ ni se pluraliza. Equivale a "there is / there are" del inglés, pero con una sola forma.\n\nEn negativo: *No hay leche. / No hay problemas.*\nEn preguntas: *¿Hay un banco cerca? / ¿Hay preguntas?*\n\nPara el pasado se usa **había/hubo** y para el futuro **habrá**.\n\nNo confundir "hay" (haber impersonal) con "ahí" (adverbio de lugar) ni con "ay" (interjección).',
        structure="hay + sustantivo (singular o plural) — es invariable",
        rules=[
            '"Hay" es invariable; no cambia con el número del sustantivo.',
            'No confundir "hay" (haber impersonal) con "ahí" (adverbio de lugar) ni con "ay" (interjección).',
            'Se usa con artículos indefinidos, numerales o sin artículo: "Hay gente".',
            'Con artículo definido no se usa "hay" sino "estar": "El libro está en la mesa".',
        ],
        examples=[
            GrammarExample(
                text="Hay una farmacia en la esquina.",
                translation="There's a pharmacy on the corner.",
            ),
            GrammarExample(
                text="¿Hay leche en la nevera?", translation="Is there milk in the fridge?"
            ),
            GrammarExample(
                text="No hay muchas opciones.", translation="There aren't many options."
            ),
            GrammarExample(
                text="En el parque hay niños jugando.",
                translation="There are children playing in the park.",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Hayn muchos coches.",
                correct="Hay muchos coches.",
                note='"Hay" es invariable; no existe la forma "hayn".',
            ),
            GrammarMistake(
                wrong="Ahí un problema.",
                correct="Hay un problema.",
                note='"Ahí" es adverbio de lugar; "hay" es la forma impersonal de haber.',
            ),
        ],
        related=["estar", "articulos-indefinidos", "preposiciones-lugar"],
    ),
    GrammarTopic(
        slug="preposiciones-lugar",
        title="Preposiciones de lugar",
        level="A1",
        category="Preposiciones",
        summary="en, sobre, debajo de, al lado de, delante de, detrás de, entre y otras.",
        explanation='Las **preposiciones de lugar** indican la ubicación de algo o alguien respecto a un punto de referencia.\n\n| Preposición | Significado | Ejemplo |\n|------------|-------------|----------|\n| en | dentro de, sobre | *en la caja, en la mesa* |\n| sobre / encima de | encima | *sobre la mesa* |\n| debajo de | bajo | *debajo de la cama* |\n| al lado de | junto a | *al lado del banco* |\n| delante de | en la parte frontal | *delante del edificio* |\n| detrás de | en la parte trasera | *detrás de la puerta* |\n| entre | en medio de dos o más | *entre la farmacia y el bar* |\n| dentro de | en el interior | *dentro del armario* |\n| fuera de | en el exterior | *fuera de la ciudad* |\n| cerca de | próximo | *cerca de mi casa* |\n| lejos de | distante | *lejos del centro* |\n\nA diferencia del inglés, el español no distingue "in/on/at" con tres preposiciones: **en** cubre "in" y "on" y en algunos casos "at".',
        structure="preposición + (artículo) + sustantivo",
        rules=[
            '"En" es la preposición más versátil para lugar: cubre interior, superficie y ubicación general.',
            'Las preposiciones compuestas llevan "de": debajo de, encima de, al lado de, etc.',
            '"Entre" no lleva "de": "entre la mesa y la silla".',
            'Con "de + el" se usa la contracción "del": "al lado del banco".',
        ],
        examples=[
            GrammarExample(
                text="El gato está debajo de la mesa.", translation="The cat is under the table."
            ),
            GrammarExample(
                text="Hay un parque detrás del colegio.",
                translation="There is a park behind the school.",
            ),
            GrammarExample(
                text="Mi casa está entre la farmacia y el banco.",
                translation="My house is between the pharmacy and the bank.",
            ),
            GrammarExample(
                text="Las llaves están dentro del bolso.",
                translation="The keys are inside the bag.",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Está al lado la puerta.",
                correct="Está al lado de la puerta.",
                note='Las preposiciones compuestas necesitan "de": al lado de, encima de, debajo de.',
            ),
        ],
        related=["hay", "estar", "articulos-definidos"],
    ),
    GrammarTopic(
        slug="ir-a-futuro",
        title="Ir a + infinitivo (futuro próximo)",
        level="A1",
        category="Tiempos verbales",
        summary="Expresar planes e intenciones futuras con la perífrasis ir a + infinitivo.",
        explanation='La perífrasis **ir a + infinitivo** es la forma más común para hablar del **futuro cercano** o expresar **planes e intenciones**.\n\n| Persona | Ir a + infinitivo (viajar) |\n|---------|----------------------------|\n| yo | voy a viajar |\n| tú | vas a viajar |\n| él/ella/usted | va a viajar |\n| nosotros/as | vamos a viajar |\n| vosotros/as | vais a viajar |\n| ellos/ellas/ustedes | van a viajar |\n\nSe diferencia del futuro simple (*viajaré*) en que "ir a + infinitivo" es más coloquial y expresa una intención más inmediata o un plan ya decidido. Es equivalente a "going to" en inglés.',
        structure="ir (conjugado) + a + infinitivo",
        rules=[
            'El verbo "ir" se conjuga en presente, seguido de "a" + infinitivo.',
            'Se usa para planes, intenciones y predicciones con evidencia presente: "Va a llover".',
            'No se usa "a + infinitivo" sin "ir": "~~A comer~~" no es futuro sino una expresión.',
            "En la lengua hablada es mucho más frecuente que el futuro simple.",
        ],
        examples=[
            GrammarExample(
                text="Voy a estudiar medicina.", translation="I am going to study medicine."
            ),
            GrammarExample(
                text="¿Vas a venir a la fiesta?", translation="Are you going to come to the party?"
            ),
            GrammarExample(
                text="Ellos van a viajar a México este verano.",
                translation="They are going to travel to Mexico this summer.",
            ),
            GrammarExample(
                text="Va a llover, mira las nubes.",
                translation="It's going to rain, look at the clouds.",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Voy estudiar.",
                correct="Voy a estudiar.",
                note='Entre "ir" y el infinitivo se necesita la preposición "a".',
            ),
            GrammarMistake(
                wrong="Vamos a la playa mañana.",
                correct="Vamos a ir a la playa mañana.",
                note='Para planes futuros se necesita "ir a + infinitivo".',
            ),
        ],
        related=["presente-regular", "querer-poder", "futuro-simple"],
    ),
    GrammarTopic(
        slug="querer-poder",
        title="Verbos querer y poder",
        level="A1",
        category="Verbos",
        summary="Expresar deseos (querer) y capacidad o permiso (poder).",
        explanation="**Querer** (cambio e→ie) y **poder** (cambio o→ue) son verbos irregulares con diptongación que se usan frecuentemente seguidos de **infinitivo**.\n\n**Querer**:\n- yo quiero · tú quieres · él quiere · nosotros queremos · vosotros queréis · ellos quieren\n- Significa deseo o intención: *Quiero aprender español. / ¿Quieres un café?*\n\n**Poder**:\n- yo puedo · tú puedes · él puede · nosotros podemos · vosotros podéis · ellos pueden\n- Significa capacidad o permiso: *Puedo nadar. / ¿Puedo entrar?*\n\nAmbos funcionan como verbos modales: van seguidos directamente de infinitivo, **sin preposición**.",
        structure="querer/poder (conjugado) + infinitivo",
        rules=[
            'Querer: diptongación e→ie en formas tónicas (tú quieres, ellos quieren). "Nosotros" y "vosotros" no diptongan.',
            'Poder: diptongación o→ue en formas tónicas (tú puedes, ellos pueden). "Nosotros" y "vosotros" no diptongan.',
            'Ambos rigen infinitivo sin preposición: "Quiero salir", "Puedo ayudarte".',
            '"Querer" también puede ir con sustantivo: "Quiero agua".',
        ],
        examples=[
            GrammarExample(
                text="Quiero viajar a Argentina.", translation="I want to travel to Argentina."
            ),
            GrammarExample(text="¿Puedes ayudarme?", translation="Can you help me?"),
            GrammarExample(
                text="No podemos salir esta noche.", translation="We can't go out tonight."
            ),
            GrammarExample(
                text="Ella quiere ser profesora.", translation="She wants to be a teacher."
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Quiero a comer.",
                correct="Quiero comer.",
                note="Los verbos modales en español NO llevan preposición antes del infinitivo.",
            ),
            GrammarMistake(
                wrong="¿Puedo de entrar?",
                correct="¿Puedo entrar?",
                note='"Poder" rige infinitivo directamente, sin "de" ni "a".',
            ),
        ],
        related=["presente-regular", "ir-a-futuro", "imperativo-afirmativo"],
    ),
    GrammarTopic(
        slug="dias-semana",
        title="Días de la semana y expresiones temporales",
        level="A1",
        category="Sustantivos",
        summary="Los días de la semana, meses y expresiones temporales básicas.",
        explanation='Los **días de la semana** en español son masculinos:\n\n*lunes, martes, miércoles, jueves, viernes, sábado, domingo.*\n\n- Se escriben con **minúscula**.\n- Llevan artículo definido: *El lunes tengo clase.*\n- El plural de lunes a viernes es invariable: *los lunes* (no ~~los luneses~~).\n- *Los lunes* significa "todos los lunes".\n\nLos **meses** también van en minúscula: *enero, febrero, marzo...*\n\nExpresiones temporales:\n- *Por la mañana / la tarde / la noche.*\n- *Hoy, ayer, mañana, pasado mañana.*\n- *Esta semana / el mes que viene / el año pasado.*',
        structure="el + día · los + día en plural (días de la semana) · en + mes/estación",
        rules=[
            "Días de la semana y meses en minúscula en español.",
            '"El + día" para un día concreto: "El lunes voy al médico".',
            '"Los + día" para rutinas: "Los sábados juego al tenis".',
            "Los días de lunes a viernes no cambian en plural: el lunes → los lunes.",
        ],
        examples=[
            GrammarExample(
                text="El martes tengo una reunión.", translation="On Tuesday I have a meeting."
            ),
            GrammarExample(text="Los domingos descansamos.", translation="On Sundays we rest."),
            GrammarExample(
                text="Mi cumpleaños es en abril.", translation="My birthday is in April."
            ),
            GrammarExample(
                text="Estudio español por las mañanas.",
                translation="I study Spanish in the mornings.",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="En Lunes voy al gimnasio.",
                correct="El lunes voy al gimnasio.",
                note='Con días de la semana se usa "el", no "en".',
            ),
            GrammarMistake(
                wrong="Trabajo los Martes.",
                correct="Trabajo los martes.",
                note="Los días de la semana se escriben con minúscula.",
            ),
        ],
        related=["horas", "presente-regular", "preposiciones-lugar"],
    ),
    GrammarTopic(
        slug="demostrativos",
        title="Los demostrativos: este, ese, aquel",
        level="A1",
        category="Adjetivos y adverbios",
        summary="Uso de adjetivos y pronombres demostrativos para señalar objetos según su distancia respecto al hablante.",
        explanation="Los **demostrativos** sirven para indicar la distancia entre el hablante y aquello que señala.\n\n- **Este/esta/estos/estas** → algo cercano al hablante: *Este bolígrafo es mío.*\n- **Ese/esa/esos/esas** → algo cercano al oyente o a distancia media: *Esa silla de ahí está rota.*\n- **Aquel/aquella/aquellos/aquellas** → algo lejano para ambos: *Aquel edificio de allí es el museo.*\n\nLas formas **neutras** (esto, eso, aquello) se usan cuando no se menciona el objeto concreto o para referirse a ideas:\n- *¿Qué es esto?*\n- *Eso que dices no es cierto.*\n\n**Como adjetivos**, van delante del sustantivo y **concuerdan en género y número**: *este coche, esta casa, estos libros, estas flores.*\n\n**Como pronombres**, sustituyen al sustantivo: *—¿Qué camiseta quieres? —Esta.*\n\nDesde la reforma de la RAE de 2010, los pronombres demostrativos **no llevan tilde**, incluso en casos de ambigüedad.",
        structure="este/esta/estos/estas (cerca) · ese/esa/esos/esas (distancia media) · aquel/aquella/aquellos/aquellas (lejos) · esto/eso/aquello (neutro)",
        rules=[
            '"Este/esta" señala lo que está cerca del hablante (aquí).',
            '"Ese/esa" señala lo que está a distancia media o cerca del oyente (ahí).',
            '"Aquel/aquella" señala lo que está lejos de ambos (allí).',
            "Las formas neutras (esto, eso, aquello) se usan para ideas o cuando no se nombra el objeto.",
            "Concuerdan en género y número con el sustantivo al que acompañan.",
        ],
        examples=[
            GrammarExample(
                text="Este libro es muy interesante.",
                translation="This book is very interesting.",
                note="cerca del hablante",
            ),
            GrammarExample(
                text="Esa casa de ahí es de mi tía.",
                translation="That house over there is my aunt's.",
                note="distancia media",
            ),
            GrammarExample(
                text="Aquel edificio es el más alto de la ciudad.",
                translation="That building over there is the tallest in the city.",
                note="lejos de ambos",
            ),
            GrammarExample(text="¿Qué es esto?", translation="What is this?", note="forma neutra"),
            GrammarExample(
                text="Eso que me cuentas es increíble.",
                translation="What you're telling me is incredible.",
                note="neutro para referirse a una idea",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="La este calle es muy ancha.",
                correct="Esta calle es muy ancha.",
                note="El demostrativo no lleva artículo delante.",
            ),
            GrammarMistake(
                wrong="No me gusta este.",
                correct="No me gusta esto.",
                note='Usa la forma neutra "esto" para referirse a una situación o idea, no "este".',
            ),
            GrammarMistake(
                wrong="Éste es mi coche.",
                correct="Este es mi coche.",
                note="Desde 2010, la RAE recomienda no tildar los pronombres demostrativos.",
            ),
        ],
        related=["adjetivos-descriptivos", "adjetivos-posesivos", "articulos-definidos"],
    ),
]
