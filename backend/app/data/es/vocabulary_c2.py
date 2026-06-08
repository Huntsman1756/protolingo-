"""C2 vocabulary sets."""

from app.data._types import VocabularyEntry, VocabularySet

C2_SETS: list[VocabularySet] = [
    VocabularySet(
        id="excelencia_es_c2",
        level="C2",
        topic="Excelencia lingüística",
        unit_ref="c2-unit-1",
        words=[
            VocabularyEntry(word="pulcritud", pos="noun", definition="Esmero y cuidado extremo", example="Escribe con una pulcritud admirable.", ipa="/pulkɾiˈtuð/"),
            VocabularyEntry(word="prolijidad", pos="noun", definition="Minuciosidad y detalle exhaustivo", example="La prolijidad de su informe es impresionante.", ipa="/pɾolixiˈðað/"),
            VocabularyEntry(word="virtuosismo", pos="noun", definition="Dominio técnico excepcional", example="Su virtuosismo lingüístico es innegable.", ipa="/biɾtwosˈismo/"),
            VocabularyEntry(word="magistral", pos="adjective", definition="Digno de un maestro", example="Hizo una exposición magistral.", ipa="/maxisˈtɾal/"),
            VocabularyEntry(word="impecable", pos="adjective", definition="Sin ningún error o defecto", example="Su gramática es impecable.", ipa="/impeˈkaβle/"),
            VocabularyEntry(word="depurado", pos="adjective", definition="Refinado y perfeccionado", example="Tiene un estilo muy depurado.", ipa="/depuˈɾaðo/"),
            VocabularyEntry(word="exquisito", pos="adjective", definition="De calidad y gusto excelentes", example="Su prosa es exquisita.", ipa="/ekskiˈsito/"),
            VocabularyEntry(word="consumado", pos="adjective", definition="Que ha alcanzado la perfección", example="Es un orador consumado.", ipa="/konsuˈmaðo/"),
            VocabularyEntry(word="insuperable", pos="adjective", definition="Que no puede ser superado", example="Su dominio del subjuntivo es insuperable.", ipa="/insupeˈɾaβle/"),
            VocabularyEntry(word="portentoso", pos="adjective", definition="Extraordinario por su magnitud", example="Tiene una memoria portentosa.", ipa="/poɾtenˈtoso/")
        ],
    ),

    VocabularySet(
        id="literatura_es_c2",
        level="C2",
        topic="Literatura avanzada",
        unit_ref="c2-unit-2",
        words=[
            VocabularyEntry(word="prosopopeya", pos="noun", definition="Atribución de cualidades humanas a lo inanimado", example="La prosopopeya es frecuente en la poesía.", ipa="/pɾosopoˈpeʝa/"),
            VocabularyEntry(word="sinécdoque", pos="noun", definition="Designar una parte por el todo o viceversa", example="Usa una sinécdoque al decir \"velas\" por \"barcos\".", ipa="/siˈnekðoke/"),
            VocabularyEntry(word="pleonasmo", pos="noun", definition="Redundancia expresiva con fines estilísticos", example="Lo vi con mis propios ojos es un pleonasmo.", ipa="/pleoˈnasmo/"),
            VocabularyEntry(word="hipérbaton", pos="noun", definition="Alteración del orden lógico de las palabras", example="El hipérbaton es característico del barroco.", ipa="/iˈpeɾβaton/"),
            VocabularyEntry(word="onomatopeya", pos="noun", definition="Palabra que imita un sonido", example="El zumbido es una onomatopeya.", ipa="/onomatoˈpeʝa/"),
            VocabularyEntry(word="estrofa", pos="noun", definition="Conjunto de versos de un poema", example="El poema tiene cuatro estrofas.", ipa="/esˈtɾofa/"),
            VocabularyEntry(word="prosaico", pos="adjective", definition="Falto de poesía o elevación", example="Su estilo es demasiado prosaico.", ipa="/pɾoˈsajko/"),
            VocabularyEntry(word="lírica", pos="noun", definition="Género poético que expresa sentimientos", example="La lírica medieval está en galaicoportugués.", ipa="/ˈliɾika/"),
            VocabularyEntry(word="elegía", pos="noun", definition="Poema de lamento por una pérdida", example="Escribió una elegía a su padre fallecido.", ipa="/eleˈxia/"),
            VocabularyEntry(word="égloga", pos="noun", definition="Poema pastoril idealizado", example="Las églogas de Garcilaso son muy célebres.", ipa="/ˈeɣloɣa/")
        ],
    ),

    VocabularySet(
        id="estilo_es_c2",
        level="C2",
        topic="Estilística",
        unit_ref="c2-unit-2",
        words=[
            VocabularyEntry(word="preceptiva", pos="noun", definition="Conjunto de normas de composición literaria", example="La preceptiva clásica exigía las tres unidades.", ipa="/pɾeθepˈtiβa/"),
            VocabularyEntry(word="solecismo", pos="noun", definition="Error gramatical o sintáctico", example="Cometió un solecismo en la redacción.", ipa="/soleˈθismo/"),
            VocabularyEntry(word="barbarismo", pos="noun", definition="Uso incorrecto de una palabra extranjera", example="Ese anglicismo es un barbarismo.", ipa="/baɾβaˈɾismo/"),
            VocabularyEntry(word="cacofonía", pos="noun", definition="Combinación desagradable de sonidos", example="Esa frase produce cacofonía al leerla.", ipa="/kakofoˈnia/"),
            VocabularyEntry(word="eufonía", pos="noun", definition="Combinación agradable de sonidos", example="El verso destaca por su eufonía.", ipa="/ewfoˈnia/"),
            VocabularyEntry(word="ampuloso", pos="adjective", definition="Exageradamente adornado", example="Su estilo es demasiado ampuloso.", ipa="/ampuˈloso/"),
            VocabularyEntry(word="lacónico", pos="adjective", definition="Breve y conciso al extremo", example="Fue una respuesta lacónica.", ipa="/laˈkoniko/"),
            VocabularyEntry(word="grandilocuente", pos="adjective", definition="Que habla con excesiva solemnidad", example="Su discurso resultó grandilocuente.", ipa="/ɡɾandiloˈkwente/"),
            VocabularyEntry(word="sublime", pos="adjective", definition="De extraordinaria elevación estética", example="La prosa de Cervantes es sublime.", ipa="/suˈβlime/"),
            VocabularyEntry(word="preciosista", pos="adjective", definition="Que busca excesivo refinamiento formal", example="Tiene un lenguaje muy preciosista.", ipa="/pɾeθjoˈsista/")
        ],
    ),

    VocabularySet(
        id="traducción_es_c2",
        level="C2",
        topic="Traducción",
        unit_ref="c2-unit-3",
        words=[
            VocabularyEntry(word="equivalencia", pos="noun", definition="Correspondencia de significado entre lenguas", example="Busca la equivalencia más precisa.", ipa="/ekiβaˈlenθja/"),
            VocabularyEntry(word="intraducible", pos="adjective", definition="Que no puede traducirse exactamente", example="Saudade es prácticamente intraducible.", ipa="/intɾaðuˈθiβle/"),
            VocabularyEntry(word="calco", pos="noun", definition="Traducción literal que resulta forzada", example="Eso es un calco del inglés.", ipa="/ˈkalko/"),
            VocabularyEntry(word="matiz", pos="noun", definition="Detalle sutil de significado", example="La traducción pierde muchos matices.", ipa="/maˈtiθ/"),
            VocabularyEntry(word="transliterar", pos="verb", definition="Representar los caracteres de un sistema en otro", example="Transliteraron el texto del cirílico.", ipa="/tɾansliteˈɾaɾ/"),
            VocabularyEntry(word="vertir", pos="verb", definition="Traducir a otra lengua", example="Vertió el poema al español.", ipa="/beɾˈtiɾ/"),
            VocabularyEntry(word="fidelidad", pos="noun", definition="Exactitud respecto al original", example="La traducción respeta la fidelidad al texto.", ipa="/fiðeliˈðað/"),
            VocabularyEntry(word="adaptación", pos="noun", definition="Ajuste cultural de una traducción", example="Hicieron una adaptación para el público hispano.", ipa="/aðaptaˈθjon/"),
            VocabularyEntry(word="giro", pos="noun", definition="Estructura idiomática propia de una lengua", example="Es un giro típico del español.", ipa="/ˈxiɾo/"),
            VocabularyEntry(word="traslación", pos="noun", definition="Acción de trasladar un texto a otra lengua", example="La traslación de poesía es especialmente compleja.", ipa="/tɾaslaˈθjon/")
        ],
    ),

    VocabularySet(
        id="mediación_es_c2",
        level="C2",
        topic="Mediación lingüística",
        unit_ref="c2-unit-3",
        words=[
            VocabularyEntry(word="intermediar", pos="verb", definition="Actuar de puente entre dos partes", example="Intermedió entre el orador y el público.", ipa="/inteɾmeˈðjaɾ/"),
            VocabularyEntry(word="transigir", pos="verb", definition="Ceder en parte para llegar a un acuerdo", example="Ambas partes tuvieron que transigir.", ipa="/tɾansiˈxiɾ/"),
            VocabularyEntry(word="conciliador", pos="adjective", definition="Que busca poner de acuerdo", example="Adoptó un tono conciliador.", ipa="/konθiljaˈðoɾ/"),
            VocabularyEntry(word="terciar", pos="verb", definition="Intervenir para mediar en una discusión", example="Terció en la disputa para calmarlos.", ipa="/teɾˈθjaɾ/"),
            VocabularyEntry(word="zanjarse", pos="verb", definition="Darse por resuelto un asunto", example="La cuestión se zanjó por consenso.", ipa="/θanˈxaɾse/"),
            VocabularyEntry(word="consensuar", pos="verb", definition="Acordar por consenso", example="Consensuaron los términos del acuerdo.", ipa="/konsenˈswaɾ/"),
            VocabularyEntry(word="saldar", pos="verb", definition="Resolver definitivamente", example="Saldaron sus diferencias.", ipa="/salˈdaɾ/"),
            VocabularyEntry(word="disenso", pos="noun", definition="Desacuerdo o discrepancia", example="Hubo disenso en varios puntos.", ipa="/diˈsenso/"),
            VocabularyEntry(word="avenencia", pos="noun", definition="Acuerdo alcanzado tras negociación", example="Llegaron a una avenencia.", ipa="/aβeˈnenθja/"),
            VocabularyEntry(word="mediador", pos="noun", definition="Persona que facilita el entendimiento entre partes", example="Actuó como mediador en el conflicto.", ipa="/meðjaˈðoɾ/")
        ],
    ),

    VocabularySet(
        id="historia_es_c2",
        level="C2",
        topic="Historia de la lengua",
        unit_ref="c2-unit-4",
        words=[
            VocabularyEntry(word="diacronía", pos="noun", definition="Evolución de un fenómeno a lo largo del tiempo", example="La diacronía explica los cambios lingüísticos.", ipa="/djakɾoˈnia/"),
            VocabularyEntry(word="sincronía", pos="noun", definition="Estudio de una lengua en un momento dado", example="El análisis sincrónico se centra en el presente.", ipa="/sinkɾoˈnia/"),
            VocabularyEntry(word="etimología", pos="noun", definition="Origen y evolución de una palabra", example="La etimología de \"almohada\" es árabe.", ipa="/etimoloˈxia/"),
            VocabularyEntry(word="latín vulgar", pos="phrase", definition="Variedad hablada del latín de donde derivan las lenguas romances", example="El español proviene del latín vulgar.", ipa="/laˈtim bulˈɣaɾ/"),
            VocabularyEntry(word="mozárabe", pos="noun", definition="Lengua romance hablada en Al-Ándalus", example="Las jarchas están escritas en mozárabe.", ipa="/moˈθaɾaβe/"),
            VocabularyEntry(word="Alfonso X", pos="noun", definition="Rey que impulsó la normalización del castellano", example="Alfonso X el Sabio fijó la prosa castellana.", ipa="/alˈfonso ˈðjeθ/"),
            VocabularyEntry(word="Nebrija", pos="noun", definition="Autor de la primera gramática castellana (1492)", example="Nebrija escribió la primera gramática.", ipa="/neˈβɾixa/"),
            VocabularyEntry(word="rae", pos="noun", definition="Real Academia Española", example="La RAE fundó en 1713.", ipa="/ˈrae/"),
            VocabularyEntry(word="americanismo", pos="noun", definition="Vocablo propio del español de América", example="Popote es un americanismo.", ipa="/ameɾikaˈnismo/"),
            VocabularyEntry(word="arcaísmo", pos="noun", definition="Palabra o expresión anticuada", example="Fierro es un arcaísmo de hierro.", ipa="/aɾkaˈismo/")
        ],
    ),

    VocabularySet(
        id="cultura_es_c2",
        level="C2",
        topic="Cultura hispánica",
        unit_ref="c2-unit-4",
        words=[
            VocabularyEntry(word="hispanidad", pos="noun", definition="Comunidad de pueblos de cultura hispánica", example="La hispanidad abarca dos continentes.", ipa="/ispaniˈðað/"),
            VocabularyEntry(word="mestizaje", pos="noun", definition="Mezcla de culturas", example="El mestizaje define la cultura hispanoamericana.", ipa="/mestiˈθaxe/"),
            VocabularyEntry(word="casticismo", pos="noun", definition="Defensa de lo genuinamente español", example="El casticismo es un concepto del siglo XVIII.", ipa="/kastiˈθismo/"),
            VocabularyEntry(word="Generación del 98", pos="phrase", definition="Grupo de escritores tras el desastre de 1898", example="Unamuno pertenece a la Generación del 98.", ipa="/xeneɾaˈθjon del noˈβenta i ˈoʧo/"),
            VocabularyEntry(word="Siglo de Oro", pos="phrase", definition="Período de máximo esplendor cultural español", example="El Siglo de Oro abarca los siglos XVI y XVII.", ipa="/ˈsiɣlo de ˈoɾo/"),
            VocabularyEntry(word="vanguardia", pos="noun", definition="Movimientos artísticos de ruptura", example="Las vanguardias transformaron el arte del siglo XX.", ipa="/banˈɡwaɾðja/"),
            VocabularyEntry(word="Quijote", pos="noun", definition="Obra maestra de Cervantes", example="El Quijote es la obra cumbre de la literatura.", ipa="/kiˈxote/"),
            VocabularyEntry(word="flamenco", pos="noun", definition="Expresión artística andaluza", example="El flamenco es patrimonio inmaterial.", ipa="/flaˈmenko/"),
            VocabularyEntry(word="iberoamérica", pos="noun", definition="Conjunto de países americanos de habla hispana y portuguesa", example="Iberoamérica comparte lazos históricos y culturales.", ipa="/iβeɾoaˈmeɾika/"),
            VocabularyEntry(word="cervantino", pos="adjective", definition="Relativo a Cervantes o a su obra", example="El humor cervantino es inconfundible.", ipa="/θeɾβanˈtino/")
        ],
    ),

    VocabularySet(
        id="creación_es_c2",
        level="C2",
        topic="Creación de contenido",
        unit_ref="c2-unit-5",
        words=[
            VocabularyEntry(word="acuñar", pos="verb", definition="Crear una expresión o término nuevo", example="Acuñó el término para describir el fenómeno.", ipa="/akuˈɲaɾ/"),
            VocabularyEntry(word="pergeñar", pos="verb", definition="Bosquejar o idear un texto", example="Pergeñó el borrador en una noche.", ipa="/peɾxeˈɲaɾ/"),
            VocabularyEntry(word="hilvanar", pos="verb", definition="Enlazar ideas de forma coherente", example="Hilvanó los argumentos con maestría.", ipa="/ilβaˈnaɾ/"),
            VocabularyEntry(word="engarzar", pos="verb", definition="Encadenar elementos de forma armoniosa", example="Engarzó las citas con elegancia.", ipa="/enɡaɾˈθaɾ/"),
            VocabularyEntry(word="pulir", pos="verb", definition="Perfeccionar un texto", example="Pulió cada párrafo antes de publicar.", ipa="/puˈliɾ/"),
            VocabularyEntry(word="esbozo", pos="noun", definition="Versión preliminar de una obra", example="Presentó un esbozo del capítulo.", ipa="/esˈβoθo/"),
            VocabularyEntry(word="artificio", pos="noun", definition="Recurso elaborado y no natural", example="Abusa de artificios retóricos.", ipa="/aɾtiˈfiθjo/"),
            VocabularyEntry(word="inusitado", pos="adjective", definition="Poco habitual, extraordinario", example="Usó un giro inusitado.", ipa="/inusiˈtaðo/"),
            VocabularyEntry(word="genuino", pos="adjective", definition="Auténtico, no copiado ni falso", example="Su estilo es genuino.", ipa="/xeˈnwino/"),
            VocabularyEntry(word="plagiar", pos="verb", definition="Copiar una obra ajena", example="Le acusaron de plagiar el artículo.", ipa="/plaˈxjaɾ/")
        ],
    ),

    VocabularySet(
        id="publicación_es_c2",
        level="C2",
        topic="Publicación",
        unit_ref="c2-unit-5",
        words=[
            VocabularyEntry(word="edición", pos="noun", definition="Proceso de preparar un texto para publicar", example="La edición estuvo a cargo de un especialista.", ipa="/eðiˈθjon/"),
            VocabularyEntry(word="imprenta", pos="noun", definition="Técnica de reproducción de textos", example="La imprenta revolucionó la difusión cultural.", ipa="/imˈpɾenta/"),
            VocabularyEntry(word="manuscrito", pos="noun", definition="Texto escrito a mano", example="El manuscrito original se conserva en la biblioteca.", ipa="/manusˈkɾito/"),
            VocabularyEntry(word="compilar", pos="verb", definition="Reunir textos dispersos en una sola obra", example="Compiló sus artículos en un libro.", ipa="/kompiˈlaɾ/"),
            VocabularyEntry(word="reeditar", pos="verb", definition="Volver a publicar con cambios", example="Reeditaron la novela con un nuevo prólogo.", ipa="/reeðiˈtaɾ/"),
            VocabularyEntry(word="difusión", pos="noun", definition="Alcance de la distribución de una obra", example="La difusión del libro fue masiva.", ipa="/difuˈsjon/"),
            VocabularyEntry(word="tiraje", pos="noun", definition="Número de ejemplares impresos", example="El primer tiraje fue de diez mil copias.", ipa="/tiˈɾaxe/"),
            VocabularyEntry(word="prólogo", pos="noun", definition="Texto introductorio de una obra", example="El prólogo lo escribió un autor consagrado.", ipa="/ˈpɾoloɣo/"),
            VocabularyEntry(word="epílogo", pos="noun", definition="Texto final que cierra una obra", example="El epílogo revela el destino de los personajes.", ipa="/eˈpiloɣo/"),
            VocabularyEntry(word="autoedición", pos="noun", definition="Publicación hecha por el propio autor", example="Optó por la autoedición al no encontrar editorial.", ipa="/awtoeðiˈθjon/")
        ],
    ),

    VocabularySet(
        id="maestría_es_c2",
        level="C2",
        topic="Maestría",
        unit_ref="c2-unit-6",
        words=[
            VocabularyEntry(word="culmen", pos="noun", definition="Punto más alto de perfección", example="Esta obra representa el culmen de su carrera.", ipa="/ˈkulmen/"),
            VocabularyEntry(word="cenit", pos="noun", definition="Momento de máximo esplendor", example="Alcanzó el cenit de su producción literaria.", ipa="/θeˈnit/"),
            VocabularyEntry(word="paradigmático", pos="adjective", definition="Que sirve de modelo o ejemplo", example="Es un caso paradigmático.", ipa="/paɾaðiɣˈmatiko/"),
            VocabularyEntry(word="cúspide", pos="noun", definition="Parte más alta, cumbre", example="Está en la cúspide de su carrera.", ipa="/ˈkuspide/"),
            VocabularyEntry(word="plenitud", pos="noun", definition="Estado de desarrollo completo", example="Escribe con la plenitud de quien domina la lengua.", ipa="/pleniˈtuð/"),
            VocabularyEntry(word="hito", pos="noun", definition="Acontecimiento muy importante", example="Este libro marcó un hito en la literatura.", ipa="/ˈito/"),
            VocabularyEntry(word="consagrarse", pos="verb", definition="Alcanzar reconocimiento definitivo", example="Se consagró como escritor con su tercera novela.", ipa="/konsaˈɣɾaɾse/"),
            VocabularyEntry(word="trascendencia", pos="noun", definition="Importancia que va más allá de lo inmediato", example="Su obra tiene una trascendencia universal.", ipa="/tɾasθenˈdenθja/"),
            VocabularyEntry(word="sapiencia", pos="noun", definition="Sabiduría profunda", example="Escribe con la sapiencia de los años.", ipa="/saˈpjenθja/"),
            VocabularyEntry(word="erudición", pos="noun", definition="Conocimiento amplio y profundo", example="Su erudición abarca múltiples disciplinas.", ipa="/eɾuðiˈθjon/")
        ],
    ),
]
