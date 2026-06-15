"""Spanish phrasebook — B2 categories."""

from app.data._types import PhrasebookCategory, PhrasebookEntry

B2_CATEGORIES: list[PhrasebookCategory] = [
    PhrasebookCategory(
        id="formal_emails_b2",
        level="B2",
        situation="Correos electr\u00f3nicos formales",
        icon="\u2709\ufe0f",
        phrases=[
            PhrasebookEntry(
                text="Estimado/a Sr./Sra. [apellido]:",
                context="Saludo formal de un correo",
                register="formal",
            ),
            PhrasebookEntry(
                text="Me pongo en contacto con usted para...",
                context="Iniciar un correo formal",
                register="formal",
            ),
            PhrasebookEntry(
                text="En relaci\u00f3n con su correo del [fecha]...",
                context="Hacer referencia a una comunicaci\u00f3n anterior",
                register="formal",
            ),
            PhrasebookEntry(
                text="Le escribo para solicitar informaci\u00f3n sobre...",
                context="Pedir informaci\u00f3n formalmente",
                register="formal",
            ),
            PhrasebookEntry(
                text="Adjunto le env\u00edo [documento].",
                context="Indicar que se env\u00eda un archivo adjunto",
                register="formal",
            ),
            PhrasebookEntry(
                text="Quedo a la espera de su respuesta.",
                context="Cerrar un correo formal",
                register="formal",
            ),
            PhrasebookEntry(text="Atentamente,", context="Despedida formal", register="formal"),
            PhrasebookEntry(
                text="Le agradezco de antemano su atenci\u00f3n.",
                context="Agradecer por adelantado",
                register="formal",
            ),
            PhrasebookEntry(
                text="Lamento las molestias ocasionadas.",
                context="Disculparse formalmente",
                register="formal",
            ),
            PhrasebookEntry(
                text="Aprovecho la ocasi\u00f3n para enviarle un cordial saludo.",
                context="Despedida muy formal",
                register="formal",
            ),
            PhrasebookEntry(
                text="Le ruego que me confirme la recepci\u00f3n.",
                context="Pedir confirmaci\u00f3n de recepci\u00f3n",
                register="formal",
            ),
        ],
    ),
    PhrasebookCategory(
        id="negotiations_b2",
        level="B2",
        situation="Negociaciones y reuniones",
        icon="\U0001f91d",
        phrases=[
            PhrasebookEntry(
                text="Vamos a tratar de llegar a un acuerdo.",
                context="Proponer buscar un entendimiento",
                register="formal",
            ),
            PhrasebookEntry(
                text="Nuestra propuesta es la siguiente...",
                context="Presentar una propuesta",
                register="formal",
            ),
            PhrasebookEntry(
                text="Entendemos su postura, pero nos gustar\u00eda...",
                context="Reconocer la posici\u00f3n ajena y contraargumentar",
                register="formal",
            ),
            PhrasebookEntry(
                text="\u00bfQu\u00e9 margen de negociaci\u00f3n tienen?",
                context="Preguntar por flexibilidad",
                register="formal",
            ),
            PhrasebookEntry(
                text="Creo que podemos llegar a un punto intermedio.",
                context="Sugerir un compromiso",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Me temo que eso no es viable.",
                context="Rechazar una propuesta educadamente",
                register="formal",
            ),
            PhrasebookEntry(
                text="D\u00e9jeme consultarlo con el equipo.",
                context="Posponer una decisi\u00f3n",
                register="formal",
            ),
            PhrasebookEntry(
                text="\u00bfLe parece bien si lo cerramos as\u00ed?",
                context="Confirmar un acuerdo",
                register="formal",
            ),
            PhrasebookEntry(
                text="Ambas partes salimos ganando.",
                context="Destacar el beneficio mutuo",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Le damos una semana para estudiarlo.",
                context="Dar un plazo",
                register="formal",
            ),
        ],
    ),
    PhrasebookCategory(
        id="academic_discussion_b2",
        level="B2",
        situation="Discusiones acad\u00e9micas",
        icon="\U0001f4da",
        phrases=[
            PhrasebookEntry(
                text="En este trabajo se analiza [tema].",
                context="Introducir el tema de un trabajo",
                register="formal",
            ),
            PhrasebookEntry(
                text="Seg\u00fan el estudio de [autor]...",
                context="Citar una fuente",
                register="formal",
            ),
            PhrasebookEntry(
                text="Cabe destacar que...",
                context="Se\u00f1alar algo importante",
                register="formal",
            ),
            PhrasebookEntry(
                text="Por un lado... por otro lado...",
                context="Presentar dos perspectivas",
                register="neutral",
            ),
            PhrasebookEntry(
                text="No obstante, los datos sugieren que...",
                context="Introducir una objeci\u00f3n",
                register="formal",
            ),
            PhrasebookEntry(
                text="En conclusi\u00f3n, se puede afirmar que...",
                context="Empezar la conclusi\u00f3n",
                register="formal",
            ),
            PhrasebookEntry(
                text="Se trata de un tema complejo.",
                context="Reconocer la complejidad",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Este aspecto merece un an\u00e1lisis m\u00e1s profundo.",
                context="Sugerir m\u00e1s investigaci\u00f3n",
                register="formal",
            ),
            PhrasebookEntry(
                text="Hay que tener en cuenta el contexto.",
                context="Pedir que se considere el contexto",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Desde una perspectiva acad\u00e9mica...",
                context="Enmarcar el argumento",
                register="formal",
            ),
            PhrasebookEntry(
                text="\u00bfHay alg\u00fan estudio que respalde esa afirmaci\u00f3n?",
                context="Pedir evidencia o fuentes",
                register="neutral",
            ),
        ],
    ),
    PhrasebookCategory(
        id="presentations_b2",
        level="B2",
        situation="Presentaciones y hablar en p\u00fablico",
        icon="\U0001f399\ufe0f",
        phrases=[
            PhrasebookEntry(
                text="Buenos d\u00edas a todos y gracias por asistir.",
                context="Iniciar una presentaci\u00f3n formal",
                register="formal",
            ),
            PhrasebookEntry(
                text="El objetivo de esta presentaci\u00f3n es...",
                context="Exponer el prop\u00f3sito de la charla",
                register="formal",
            ),
            PhrasebookEntry(
                text="Como pueden ver en esta diapositiva...",
                context="Referirse a material visual",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Me gustar\u00eda profundizar en este punto.",
                context="Indicar que se va a desarrollar una idea",
                register="formal",
            ),
            PhrasebookEntry(
                text="Cabe preguntarse si...",
                context="Plantear una cuesti\u00f3n ret\u00f3rica",
                register="formal",
            ),
            PhrasebookEntry(
                text="Perm\u00edtanme ilustrarlo con un ejemplo.",
                context="Introducir un ejemplo",
                register="formal",
            ),
            PhrasebookEntry(
                text="En resumidas cuentas...",
                context="Resumir lo expuesto",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Estoy a su disposici\u00f3n para cualquier pregunta.",
                context="Abrir turno de preguntas",
                register="formal",
            ),
            PhrasebookEntry(
                text="Si me permiten a\u00f1adir algo m\u00e1s...",
                context="A\u00f1adir informaci\u00f3n adicional",
                register="formal",
            ),
            PhrasebookEntry(
                text="Para terminar, quiero agradecerles su atenci\u00f3n.",
                context="Cerrar la presentaci\u00f3n",
                register="formal",
            ),
            PhrasebookEntry(
                text="\u00bfAlguna duda hasta ahora?",
                context="Verificar comprensi\u00f3n durante la charla",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Me remito a los datos expuestos anteriormente.",
                context="Referirse a informaci\u00f3n ya presentada",
                register="formal",
            ),
        ],
    ),
    PhrasebookCategory(
        id="job_interviews_b2",
        level="B2",
        situation="Entrevistas de trabajo",
        icon="\U0001f4bc",
        phrases=[
            PhrasebookEntry(
                text="Me considero una persona proactiva y orientada a resultados.",
                context="Describir cualidades personales en una entrevista",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Tengo experiencia en el sector de...",
                context="Hablar de la experiencia profesional",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Uno de mis mayores logros fue...",
                context="Destacar un logro profesional",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Me gustar\u00eda formar parte de un equipo como este porque...",
                context="Explicar motivaci\u00f3n para el puesto",
                register="formal",
            ),
            PhrasebookEntry(
                text="Me considero capaz de asumir nuevos retos.",
                context="Mostrar disposici\u00f3n y ambici\u00f3n",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Entre mis puntos fuertes destacar\u00eda...",
                context="Hablar de fortalezas",
                register="formal",
            ),
            PhrasebookEntry(
                text="Un \u00e1rea en la que estoy trabajando es...",
                context="Hablar de una debilidad de forma profesional",
                register="neutral",
            ),
            PhrasebookEntry(
                text="\u00bfPodr\u00eda darme m\u00e1s detalles sobre las responsabilidades del puesto?",
                context="Pedir m\u00e1s informaci\u00f3n sobre el cargo",
                register="formal",
            ),
            PhrasebookEntry(
                text="Estoy buscando un entorno donde pueda crecer profesionalmente.",
                context="Expresar objetivos de carrera",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Agradezco la oportunidad de haber podido conversar con ustedes.",
                context="Despedirse al final de la entrevista",
                register="formal",
            ),
            PhrasebookEntry(
                text="\u00bfCu\u00e1l ser\u00eda el siguiente paso en el proceso?",
                context="Preguntar por el seguimiento",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Tengo un nivel avanzado de ingl\u00e9s y conocimientos de...",
                context="Mencionar idiomas y habilidades t\u00e9cnicas",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Me adapto con facilidad a nuevos entornos de trabajo.",
                context="Destacar adaptabilidad",
                register="neutral",
            ),
            PhrasebookEntry(
                text="En mi anterior puesto me encargaba de...",
                context="Describir responsabilidades anteriores",
                register="neutral",
            ),
        ],
    ),
]
