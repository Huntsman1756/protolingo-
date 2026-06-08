"""B1 vocabulary sets."""

from app.data._types import VocabularyEntry, VocabularySet

B1_SETS: list[VocabularySet] = [
    VocabularySet(
        id="emociones_es_b1",
        level="B1",
        topic="Emociones y sentimientos",
        unit_ref="b1-unit-1",
        words=[
            VocabularyEntry(word="alegría", pos="noun", definition="Sentimiento de felicidad o contento", example="Sintió una gran alegría al ver a su familia.", ipa="/aleˈɣɾia/"),
            VocabularyEntry(word="tristeza", pos="noun", definition="Estado anímico de pena o aflicción", example="La tristeza se reflejaba en su mirada.", ipa="/tɾisˈteθa/"),
            VocabularyEntry(word="miedo", pos="noun", definition="Sensación de temor ante un peligro", example="Tengo miedo a las alturas.", ipa="/ˈmjeðo/"),
            VocabularyEntry(word="rabia", pos="noun", definition="Enfado intenso o ira", example="Le dio mucha rabia la injusticia del resultado.", ipa="/ˈraβja/"),
            VocabularyEntry(word="sorpresa", pos="noun", definition="Reacción ante algo inesperado", example="¡Qué sorpresa verte por aquí!", ipa="/soɾˈpɾesa/"),
            VocabularyEntry(word="vergüenza", pos="noun", definition="Sentimiento de incomodidad o pudor", example="Me da vergüenza hablar en público.", ipa="/beɾˈɣwenθa/"),
            VocabularyEntry(word="ilusión", pos="noun", definition="Esperanza o emoción positiva", example="Tengo mucha ilusión por el viaje.", ipa="/iluˈsjon/"),
            VocabularyEntry(word="ansiedad", pos="noun", definition="Estado de inquietud o nerviosismo", example="La ansiedad le impide dormir bien.", ipa="/ansjeˈðað/"),
            VocabularyEntry(word="alivio", pos="noun", definition="Sensación de tranquilidad tras un problema", example="Sintió alivio al aprobar el examen.", ipa="/aˈliβjo/"),
            VocabularyEntry(word="envidia", pos="noun", definition="Pesar por el bien ajeno", example="No sientas envidia de los éxitos de otros.", ipa="/emˈbiðja/")
        ],
    ),

    VocabularySet(
        id="deseos_es_b1",
        level="B1",
        topic="Deseos y aspiraciones",
        unit_ref="b1-unit-1",
        words=[
            VocabularyEntry(word="desear", pos="verb", definition="Anhelar o querer algo con intensidad", example="Deseo viajar por todo el mundo.", ipa="/deˈseaɾ/"),
            VocabularyEntry(word="esperar", pos="verb", definition="Tener esperanza o aguardar algo", example="Espero que te vaya bien en la entrevista.", ipa="/espeˈɾaɾ/"),
            VocabularyEntry(word="anhelar", pos="verb", definition="Desear con vehemencia", example="Anhela encontrar la felicidad.", ipa="/aneˈlaɾ/"),
            VocabularyEntry(word="sueño", pos="noun", definition="Aspiración o meta deseada", example="Mi sueño es ser médico.", ipa="/ˈsweɲo/"),
            VocabularyEntry(word="meta", pos="noun", definition="Objetivo que se quiere alcanzar", example="Me he fijado una meta para este año.", ipa="/ˈmeta/"),
            VocabularyEntry(word="propósito", pos="noun", definition="Intención firme de hacer algo", example="Mi propósito es aprender español este año.", ipa="/pɾoˈposito/"),
            VocabularyEntry(word="ambición", pos="noun", definition="Deseo intenso de lograr éxito", example="Tiene la ambición de montar su propia empresa.", ipa="/ambiˈθjon/"),
            VocabularyEntry(word="ojalá", pos="phrase", definition="Expresión de deseo intenso", example="¡Ojalá llueva mañana!", ipa="/oxaˈla/"),
            VocabularyEntry(word="confiar", pos="verb", definition="Tener fe o seguridad en algo", example="Confío en que todo saldrá bien.", ipa="/komˈfjaɾ/"),
            VocabularyEntry(word="lograr", pos="verb", definition="Conseguir lo que se pretende", example="Logró cumplir todos sus objetivos.", ipa="/loˈɣɾaɾ/")
        ],
    ),

    VocabularySet(
        id="trabajo_es_b1",
        level="B1",
        topic="Entorno laboral",
        unit_ref="b1-unit-2",
        words=[
            VocabularyEntry(word="empresa", pos="noun", definition="Organización dedicada a una actividad económica", example="Trabajo en una empresa de tecnología.", ipa="/emˈpɾesa/"),
            VocabularyEntry(word="reunión", pos="noun", definition="Encuentro para tratar un asunto", example="Tengo una reunión a las diez.", ipa="/reuˈnjon/"),
            VocabularyEntry(word="jornada", pos="noun", definition="Tiempo de trabajo diario", example="Mi jornada laboral es de ocho horas.", ipa="/xoɾˈnaða/"),
            VocabularyEntry(word="contrato", pos="noun", definition="Acuerdo laboral por escrito", example="Firmé un contrato indefinido.", ipa="/konˈtɾato/"),
            VocabularyEntry(word="sueldo", pos="noun", definition="Dinero que se cobra por trabajar", example="Me han subido el sueldo este mes.", ipa="/ˈsweldo/"),
            VocabularyEntry(word="jefe", pos="noun", definition="Persona que dirige a otros en el trabajo", example="Mi jefe es muy comprensivo.", ipa="/ˈxefe/"),
            VocabularyEntry(word="compañero", pos="noun", definition="Persona con la que se comparte el trabajo", example="Mis compañeros de trabajo son muy amables.", ipa="/kompaˈɲeɾo/"),
            VocabularyEntry(word="solicitar", pos="verb", definition="Pedir formalmente algo", example="He solicitado un aumento de sueldo.", ipa="/soliθiˈtaɾ/"),
            VocabularyEntry(word="ascenso", pos="noun", definition="Subida de categoría profesional", example="Me han dado un ascenso.", ipa="/asˈθenso/"),
            VocabularyEntry(word="renunciar", pos="verb", definition="Dejar voluntariamente un puesto", example="Renunció a su cargo por motivos personales.", ipa="/renunˈθjaɾ/")
        ],
    ),

    VocabularySet(
        id="estudios_es_b1",
        level="B1",
        topic="Estudios y formación",
        unit_ref="b1-unit-2",
        words=[
            VocabularyEntry(word="carrera", pos="noun", definition="Estudios universitarios", example="Estudio la carrera de Derecho.", ipa="/kaˈreɾa/"),
            VocabularyEntry(word="asignatura", pos="noun", definition="Materia de estudio", example="Mi asignatura favorita es Historia.", ipa="/asiɣnaˈtuɾa/"),
            VocabularyEntry(word="matricularse", pos="verb", definition="Inscribirse en un curso", example="Me he matriculado en un curso de inglés.", ipa="/matɾikuˈlaɾse/"),
            VocabularyEntry(word="beca", pos="noun", definition="Ayuda económica para estudiar", example="Consiguió una beca para estudiar en el extranjero.", ipa="/ˈbeka/"),
            VocabularyEntry(word="examen", pos="noun", definition="Prueba para evaluar conocimientos", example="El examen final es la semana que viene.", ipa="/ekˈsamen/"),
            VocabularyEntry(word="aprobar", pos="verb", definition="Superar un examen con éxito", example="Aprobé todas las asignaturas.", ipa="/apɾoˈβaɾ/"),
            VocabularyEntry(word="suspender", pos="verb", definition="No superar un examen", example="Suspendí matemáticas y tengo que repetir.", ipa="/suspenˈdeɾ/"),
            VocabularyEntry(word="apuntes", pos="noun", definition="Notas escritas durante el estudio", example="¿Me dejas tus apuntes de clase?", ipa="/aˈpuntes/"),
            VocabularyEntry(word="formación", pos="noun", definition="Proceso de adquirir conocimientos", example="La formación continua es fundamental.", ipa="/foɾmaˈθjon/"),
            VocabularyEntry(word="investigar", pos="verb", definition="Buscar información de forma sistemática", example="Estoy investigando para mi proyecto final.", ipa="/imbestiˈɣaɾ/")
        ],
    ),

    VocabularySet(
        id="experiencias_es_b1",
        level="B1",
        topic="Experiencias de vida",
        unit_ref="b1-unit-3",
        words=[
            VocabularyEntry(word="vivencia", pos="noun", definition="Experiencia personal significativa", example="Aquella vivencia me marcó para siempre.", ipa="/biˈβenθja/"),
            VocabularyEntry(word="recuerdo", pos="noun", definition="Memoria de algo vivido", example="Tengo muy buenos recuerdos de la infancia.", ipa="/reˈkweɾðo/"),
            VocabularyEntry(word="etapa", pos="noun", definition="Período de la vida", example="La adolescencia es una etapa difícil.", ipa="/eˈtapa/"),
            VocabularyEntry(word="anecdota", pos="noun", definition="Relato breve de un suceso curioso", example="Me contó una anécdota muy graciosa.", ipa="/aˈnekðota/"),
            VocabularyEntry(word="superar", pos="verb", definition="Vencer un obstáculo o dificultad", example="Superó todos los retos que se le presentaron.", ipa="/supeˈɾaɾ/"),
            VocabularyEntry(word="fracasar", pos="verb", definition="No conseguir el resultado esperado", example="Fracasó en su primer intento, pero no se rindió.", ipa="/fɾakaˈsaɾ/"),
            VocabularyEntry(word="arrepentirse", pos="verb", definition="Lamentar haber hecho algo", example="No me arrepiento de mis decisiones.", ipa="/arepenˈtiɾse/"),
            VocabularyEntry(word="acontecimiento", pos="noun", definition="Suceso importante", example="Fue un acontecimiento histórico.", ipa="/akon̪teθiˈmjento/"),
            VocabularyEntry(word="aprendizaje", pos="noun", definition="Proceso de adquirir conocimiento", example="El viaje fue un gran aprendizaje.", ipa="/apɾendiˈθaxe/"),
            VocabularyEntry(word="cambio", pos="noun", definition="Transformación o modificación", example="Hizo un cambio radical en su vida.", ipa="/ˈkambjo/")
        ],
    ),

    VocabularySet(
        id="logros_es_b1",
        level="B1",
        topic="Logros y realizaciones",
        unit_ref="b1-unit-3",
        words=[
            VocabularyEntry(word="éxito", pos="noun", definition="Resultado positivo de una acción", example="El proyecto fue un éxito rotundo.", ipa="/ˈeɡsito/"),
            VocabularyEntry(word="triunfar", pos="verb", definition="Alcanzar el éxito", example="Triunfó en el mundo de los negocios.", ipa="/tɾjumˈfaɾ/"),
            VocabularyEntry(word="mérito", pos="noun", definition="Reconocimiento por un esfuerzo", example="El premio es mérito de todo el equipo.", ipa="/ˈmeɾito/"),
            VocabularyEntry(word="esfuerzo", pos="noun", definition="Empleo de energía para lograr algo", example="Con esfuerzo y dedicación lo conseguirás.", ipa="/esˈfweɾθo/"),
            VocabularyEntry(word="orgullo", pos="noun", definition="Satisfacción por un logro propio o ajeno", example="Siente orgullo de lo que ha conseguido.", ipa="/oɾˈɣuʎo/"),
            VocabularyEntry(word="reconocimiento", pos="noun", definition="Aprecio público de un mérito", example="Recibió un reconocimiento por su labor.", ipa="/rekonoθiˈmjento/"),
            VocabularyEntry(word="destacar", pos="verb", definition="Sobresalir entre los demás", example="Destaca por su creatividad.", ipa="/destaˈkaɾ/"),
            VocabularyEntry(word="superación", pos="noun", definition="Acción de vencer dificultades", example="Su historia es un ejemplo de superación.", ipa="/supeɾaˈθjon/"),
            VocabularyEntry(word="alcanzar", pos="verb", definition="Llegar a conseguir algo", example="Alcanzó todas las metas que se propuso.", ipa="/alkanˈθaɾ/"),
            VocabularyEntry(word="progresar", pos="verb", definition="Avanzar o mejorar", example="He progresado mucho en español.", ipa="/pɾoɣɾeˈsaɾ/")
        ],
    ),

    VocabularySet(
        id="noticias_es_b1",
        level="B1",
        topic="Noticias y actualidad",
        unit_ref="b1-unit-4",
        words=[
            VocabularyEntry(word="periódico", pos="noun", definition="Publicación diaria con noticias", example="Leo el periódico todas las mañanas.", ipa="/peˈɾjoðiko/"),
            VocabularyEntry(word="reportaje", pos="noun", definition="Trabajo periodístico extenso", example="El reportaje sobre el cambio climático fue excelente.", ipa="/repoɾˈtaxe/"),
            VocabularyEntry(word="titular", pos="noun", definition="Título de una noticia", example="El titular de portada era impactante.", ipa="/tituˈlaɾ/"),
            VocabularyEntry(word="entrevista", pos="noun", definition="Conversación con preguntas a una persona", example="La entrevista al presidente fue muy reveladora.", ipa="/entɾeˈβista/"),
            VocabularyEntry(word="informar", pos="verb", definition="Comunicar una noticia", example="Nos informaron de los cambios.", ipa="/imfoɾˈmaɾ/"),
            VocabularyEntry(word="publicar", pos="verb", definition="Difundir una información", example="Publicaron la noticia en todos los medios.", ipa="/puβliˈkaɾ/"),
            VocabularyEntry(word="difundir", pos="verb", definition="Propagar una información", example="La noticia se difundió rápidamente.", ipa="/difunˈdiɾ/"),
            VocabularyEntry(word="acontecimiento", pos="noun", definition="Suceso de relevancia", example="El terremoto fue un acontecimiento devastador.", ipa="/akon̪teθiˈmjento/"),
            VocabularyEntry(word="rumor", pos="noun", definition="Información no confirmada", example="Corre el rumor de que van a cerrar la empresa.", ipa="/ruˈmoɾ/"),
            VocabularyEntry(word="portada", pos="noun", definition="Primera página de una publicación", example="Su foto apareció en la portada del periódico.", ipa="/poɾˈtaða/")
        ],
    ),

    VocabularySet(
        id="sociedad_es_b1",
        level="B1",
        topic="Sociedad y ciudadanía",
        unit_ref="b1-unit-4",
        words=[
            VocabularyEntry(word="ciudadanía", pos="noun", definition="Conjunto de ciudadanos de un país", example="La ciudadanía exige más transparencia.", ipa="/θjudaðaˈnia/"),
            VocabularyEntry(word="derecho", pos="noun", definition="Facultad reconocida por la ley", example="La educación es un derecho fundamental.", ipa="/deˈɾeʧo/"),
            VocabularyEntry(word="deber", pos="noun", definition="Obligación moral o legal", example="Votar es un deber ciudadano.", ipa="/deˈβeɾ/"),
            VocabularyEntry(word="convivencia", pos="noun", definition="Vida en común con otros", example="La convivencia en el barrio es excelente.", ipa="/kombiˈβenθja/"),
            VocabularyEntry(word="desigualdad", pos="noun", definition="Falta de igualdad entre personas", example="La desigualdad social es un problema grave.", ipa="/desiɣwalˈdað/"),
            VocabularyEntry(word="solidaridad", pos="noun", definition="Apoyo a causas o personas necesitadas", example="Mostraron mucha solidaridad tras el desastre.", ipa="/solidaɾiˈðað/"),
            VocabularyEntry(word="manifestación", pos="noun", definition="Protesta colectiva en la calle", example="Hubo una manifestación por el clima.", ipa="/manifestaˈθjon/"),
            VocabularyEntry(word="gobierno", pos="noun", definition="Órgano que dirige un país", example="El gobierno aprobó la nueva ley.", ipa="/ɡoˈβjeɾno/"),
            VocabularyEntry(word="impuesto", pos="noun", definition="Tributo que se paga al Estado", example="Los impuestos financian los servicios públicos.", ipa="/imˈpwesto/"),
            VocabularyEntry(word="inmigrante", pos="noun", definition="Persona que llega a otro país para vivir", example="Muchos inmigrantes contribuyen a la economía.", ipa="/immiˈɣɾante/")
        ],
    ),

    VocabularySet(
        id="descripciones_es_b1",
        level="B1",
        topic="Descripciones detalladas",
        unit_ref="b1-unit-5",
        words=[
            VocabularyEntry(word="aspecto", pos="noun", definition="Apariencia exterior de algo o alguien", example="Tiene un aspecto saludable.", ipa="/asˈpekto/"),
            VocabularyEntry(word="rasgo", pos="noun", definition="Característica distintiva", example="Sus rasgos faciales son muy definidos.", ipa="/ˈrasɣo/"),
            VocabularyEntry(word="semejante", pos="adjective", definition="Parecido o similar", example="Es muy semejante a su hermano.", ipa="/semeˈxante/"),
            VocabularyEntry(word="complexión", pos="noun", definition="Constitución física de una persona", example="Es de complexión delgada.", ipa="/kompleˈksjon/"),
            VocabularyEntry(word="estatura", pos="noun", definition="Altura de una persona", example="Es de estatura media.", ipa="/estaˈtuɾa/"),
            VocabularyEntry(word="personalidad", pos="noun", definition="Conjunto de rasgos psicológicos", example="Tiene una personalidad arrolladora.", ipa="/peɾsonaliˈðað/"),
            VocabularyEntry(word="carácter", pos="noun", definition="Forma de ser de una persona", example="Es una persona de carácter fuerte.", ipa="/kaˈɾakteɾ/"),
            VocabularyEntry(word="cualidad", pos="noun", definition="Rasgo positivo de una persona", example="La honestidad es su mejor cualidad.", ipa="/kwaliˈðað/"),
            VocabularyEntry(word="defecto", pos="noun", definition="Imperfección o carencia", example="Su único defecto es la impaciencia.", ipa="/deˈfekto/"),
            VocabularyEntry(word="parecerse", pos="verb", definition="Tener semejanza con alguien", example="Te pareces mucho a tu madre.", ipa="/paɾeˈθeɾse/")
        ],
    ),

    VocabularySet(
        id="gente_es_b1",
        level="B1",
        topic="Gente y relaciones",
        unit_ref="b1-unit-5",
        words=[
            VocabularyEntry(word="conocido", pos="noun", definition="Persona de trato superficial", example="Es solo un conocido del trabajo.", ipa="/konoˈθiðo/"),
            VocabularyEntry(word="colega", pos="noun", definition="Compañero de profesión", example="Salí a cenar con unos colegas.", ipa="/koˈleɣa/"),
            VocabularyEntry(word="pareja", pos="noun", definition="Persona con la que se mantiene una relación", example="Vive con su pareja desde hace años.", ipa="/paˈɾexa/"),
            VocabularyEntry(word="vecino", pos="noun", definition="Persona que vive cerca", example="Mis vecinos son muy silenciosos.", ipa="/beˈθino/"),
            VocabularyEntry(word="amistad", pos="noun", definition="Relación de afecto entre amigos", example="Nuestra amistad dura más de veinte años.", ipa="/amisˈtað/"),
            VocabularyEntry(word="confianza", pos="noun", definition="Seguridad en una persona", example="Tengo plena confianza en ella.", ipa="/komˈfjanθa/"),
            VocabularyEntry(word="discutir", pos="verb", definition="Debatir o pelear verbalmente", example="Discutimos por una tontería.", ipa="/diskuˈtiɾ/"),
            VocabularyEntry(word="reconciliarse", pos="verb", definition="Restablecer una relación tras un conflicto", example="Se reconciliaron después de meses sin hablarse.", ipa="/rekonθiˈljaɾse/"),
            VocabularyEntry(word="apoyar", pos="verb", definition="Brindar ayuda o respaldo", example="Siempre me ha apoyado en los momentos difíciles.", ipa="/apoˈʝaɾ/"),
            VocabularyEntry(word="mudarse", pos="verb", definition="Cambiar de vivienda", example="Se mudaron a otra ciudad.", ipa="/muˈðaɾse/")
        ],
    ),

    VocabularySet(
        id="viajes_es_b1",
        level="B1",
        topic="Viajes y aventuras",
        unit_ref="b1-unit-6",
        words=[
            VocabularyEntry(word="destino", pos="noun", definition="Lugar al que se viaja", example="Nuestro destino es Cancún.", ipa="/desˈtino/"),
            VocabularyEntry(word="itinerario", pos="noun", definition="Ruta o recorrido planificado", example="El itinerario incluye cuatro ciudades.", ipa="/itineˈɾaɾjo/"),
            VocabularyEntry(word="alojamiento", pos="noun", definition="Lugar donde hospedarse", example="Buscamos alojamiento cerca del centro.", ipa="/aloxaˈmjento/"),
            VocabularyEntry(word="equipaje", pos="noun", definition="Maletas y bultos de viaje", example="Facturé el equipaje en el mostrador.", ipa="/ekiˈpaxe/"),
            VocabularyEntry(word="aduanas", pos="noun", definition="Control fronterizo", example="Pasamos por aduanas sin problema.", ipa="/aˈðwanas/"),
            VocabularyEntry(word="retraso", pos="noun", definition="Demora en la salida o llegada", example="El vuelo sufrió un retraso de dos horas.", ipa="/reˈtɾaso/"),
            VocabularyEntry(word="cancelar", pos="verb", definition="Anular una reserva", example="Tuvimos que cancelar el viaje.", ipa="/kanθeˈlaɾ/"),
            VocabularyEntry(word="turista", pos="noun", definition="Persona que viaja por placer", example="La ciudad está llena de turistas en verano.", ipa="/tuˈɾista/"),
            VocabularyEntry(word="guía", pos="noun", definition="Persona que orienta a los viajeros", example="El guía nos explicó la historia del lugar.", ipa="/ˈɡia/"),
            VocabularyEntry(word="aventura", pos="noun", definition="Experiencia emocionante o arriesgada", example="Este viaje ha sido toda una aventura.", ipa="/aβenˈtuɾa/")
        ],
    ),

    VocabularySet(
        id="situaciones_es_b1",
        level="B1",
        topic="Situaciones cotidianas",
        unit_ref="b1-unit-6",
        words=[
            VocabularyEntry(word="casualidad", pos="noun", definition="Hecho fortuito o coincidencia", example="¡Qué casualidad encontrarte aquí!", ipa="/kaswaliˈðað/"),
            VocabularyEntry(word="imprescindible", pos="adjective", definition="Absolutamente necesario", example="El pasaporte es imprescindible para viajar.", ipa="/impɾesθinˈdiβle/"),
            VocabularyEntry(word="disponible", pos="adjective", definition="Que se puede usar o está libre", example="¿Estás disponible el viernes?", ipa="/dispoˈniβle/"),
            VocabularyEntry(word="próximo", pos="adjective", definition="Cercano en el tiempo", example="El próximo mes empiezo un curso.", ipa="/ˈpɾoksimi/"),
            VocabularyEntry(word="previo", pos="adjective", definition="Anterior en el tiempo", example="Es necesario un aviso previo de dos semanas.", ipa="/ˈpɾeβjo/"),
            VocabularyEntry(word="urgente", pos="adjective", definition="Que requiere atención inmediata", example="Necesito hablar contigo, es urgente.", ipa="/uɾˈxente/"),
            VocabularyEntry(word="cotidiano", pos="adjective", definition="De cada día, habitual", example="Son problemas cotidianos sin importancia.", ipa="/kotiˈðjano/"),
            VocabularyEntry(word="imprevisto", pos="noun", definition="Suceso no planeado", example="Surgió un imprevisto y no pude asistir.", ipa="/impɾeˈβisto/"),
            VocabularyEntry(word="aprovechar", pos="verb", definition="Sacar beneficio de algo", example="Aprovechamos el buen tiempo para ir a la playa.", ipa="/apɾoβeˈʧaɾ/"),
            VocabularyEntry(word="enfrentarse", pos="verb", definition="Hacer frente a una situación", example="Se enfrentó a muchos obstáculos.", ipa="/emfɾenˈtaɾse/")
        ],
    ),

    VocabularySet(
        id="opiniones_es_b1",
        level="B1",
        topic="Opiniones y puntos de vista",
        unit_ref="b1-unit-7",
        words=[
            VocabularyEntry(word="opinar", pos="verb", definition="Expresar una opinión", example="¿Tú qué opinas sobre este tema?", ipa="/opiˈnaɾ/"),
            VocabularyEntry(word="parecer", pos="verb", definition="Tener una opinión o impresión", example="Me parece una buena idea.", ipa="/paɾeˈθeɾ/"),
            VocabularyEntry(word="criterio", pos="noun", definition="Juicio para formarse una opinión", example="Tiene buen criterio para elegir personal.", ipa="/kɾiˈteɾjo/"),
            VocabularyEntry(word="punto de vista", pos="phrase", definition="Perspectiva desde la que se analiza algo", example="Desde mi punto de vista, es la mejor opción.", ipa="/ˈpunto ðe ˈβista/"),
            VocabularyEntry(word="coincidir", pos="verb", definition="Estar de acuerdo", example="Coincido contigo en ese punto.", ipa="/koinθiˈðiɾ/"),
            VocabularyEntry(word="discrepar", pos="verb", definition="Tener una opinión diferente", example="Discrepo de tu análisis de la situación.", ipa="/diskɾeˈpaɾ/"),
            VocabularyEntry(word="postura", pos="noun", definition="Actitud o posición ante un tema", example="Defendió su postura con argumentos sólidos.", ipa="/posˈtuɾa/"),
            VocabularyEntry(word="convencer", pos="verb", definition="Persuadir con razones", example="Me convenció con sus argumentos.", ipa="/kombenˈθeɾ/"),
            VocabularyEntry(word="rechazar", pos="verb", definition="No aceptar una propuesta u opinión", example="Rechazó la oferta amablemente.", ipa="/reʧaˈθaɾ/"),
            VocabularyEntry(word="debatir", pos="verb", definition="Discutir sobre un tema", example="Debatimos durante horas sobre política.", ipa="/deβaˈtiɾ/")
        ],
    ),

    VocabularySet(
        id="debates_es_b1",
        level="B1",
        topic="Debates y argumentación",
        unit_ref="b1-unit-7",
        words=[
            VocabularyEntry(word="argumento", pos="noun", definition="Razón que apoya una opinión", example="Sus argumentos eran muy convincentes.", ipa="/aɾɣuˈmento/"),
            VocabularyEntry(word="evidencia", pos="noun", definition="Prueba que demuestra algo", example="No hay evidencia que respalde esa teoría.", ipa="/eβiˈðenθja/"),
            VocabularyEntry(word="réplica", pos="noun", definition="Respuesta que contradice un argumento", example="Su réplica dejó sin palabras al oponente.", ipa="/ˈɾeplika/"),
            VocabularyEntry(word="turno", pos="noun", definition="Momento asignado para hablar", example="Espera tu turno para intervenir.", ipa="/ˈtuɾno/"),
            VocabularyEntry(word="intervenir", pos="verb", definition="Tomar parte en una conversación", example="Me gustaría intervenir en este debate.", ipa="/inteɾβeˈniɾ/"),
            VocabularyEntry(word="refutar", pos="verb", definition="Rebatir un argumento con razones", example="Refutó todas las objeciones planteadas.", ipa="/refuˈtaɾ/"),
            VocabularyEntry(word="conclusión", pos="noun", definition="Resolución final de un razonamiento", example="Llegamos a la conclusión de que era inviable.", ipa="/konkluˈsjon/"),
            VocabularyEntry(word="objetar", pos="verb", definition="Oponer una razón a lo dicho", example="Nadie objetó nada a la propuesta.", ipa="/oβxeˈtaɾ/"),
            VocabularyEntry(word="moderar", pos="verb", definition="Dirigir un debate", example="El profesor moderó el debate.", ipa="/moðeˈɾaɾ/"),
            VocabularyEntry(word="consenso", pos="noun", definition="Acuerdo entre varias partes", example="Se alcanzó un consenso tras largas negociaciones.", ipa="/konˈsenso/")
        ],
    ),

    VocabularySet(
        id="repaso_es_b1",
        level="B1",
        topic="Repaso B1",
        unit_ref="b1-unit-8",
        words=[
            VocabularyEntry(word="vocabulario", pos="noun", definition="Conjunto de palabras de una lengua", example="He ampliado mucho mi vocabulario.", ipa="/bokabuˈlaɾjo/"),
            VocabularyEntry(word="expresión", pos="noun", definition="Forma de manifestar ideas", example="Esa expresión es muy coloquial.", ipa="/ekspɾeˈsjon/"),
            VocabularyEntry(word="fluidez", pos="noun", definition="Capacidad de hablar con soltura", example="He ganado fluidez hablando español.", ipa="/flwiˈðeθ/"),
            VocabularyEntry(word="comprensión", pos="noun", definition="Capacidad de entender", example="Mi comprensión lectora ha mejorado.", ipa="/kompɾenˈsjon/"),
            VocabularyEntry(word="comunicar", pos="verb", definition="Transmitir información", example="Ya me comunico bastante bien en español.", ipa="/komuniˈkaɾ/"),
            VocabularyEntry(word="redactar", pos="verb", definition="Escribir un texto", example="Redacté un informe para el trabajo.", ipa="/reðakˈtaɾ/"),
            VocabularyEntry(word="corregir", pos="verb", definition="Señalar y enmendar errores", example="Corrígeme si me equivoco.", ipa="/koreˈxiɾ/"),
            VocabularyEntry(word="intermedio", pos="adjective", definition="Nivel medio de conocimiento", example="Tengo un nivel intermedio de español.", ipa="/inteɾˈmeðjo/"),
            VocabularyEntry(word="dominar", pos="verb", definition="Tener un control completo de algo", example="Quiero dominar el español en dos años.", ipa="/domiˈnaɾ/"),
            VocabularyEntry(word="meta", pos="noun", definition="Objetivo que se pretende alcanzar", example="Mi meta es el nivel B2.", ipa="/ˈmeta/")
        ],
    ),
]
