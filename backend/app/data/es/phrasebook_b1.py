"""Spanish phrasebook — B1 categories."""

from app.data._types import PhrasebookCategory, PhrasebookEntry

B1_CATEGORIES: list[PhrasebookCategory] = [
    PhrasebookCategory(
        id="phone_calls_b1",
        level="B1",
        situation="Llamadas telef\u00f3nicas",
        icon="\U0001f4de",
        phrases=[
            PhrasebookEntry(
                text="\u00bfDiga? / \u00bfS\u00ed?",
                context="Contestar el tel\u00e9fono",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Buenos d\u00edas, le llamo para...",
                context="Iniciar una llamada formal",
                register="formal",
            ),
            PhrasebookEntry(
                text="\u00bfEst\u00e1 [nombre]?",
                context="Preguntar por una persona",
                register="neutral",
            ),
            PhrasebookEntry(text="Soy [nombre].", context="Identificarse", register="neutral"),
            PhrasebookEntry(
                text="Le paso con \u00e9l/ella.",
                context="Transferir una llamada",
                register="neutral",
            ),
            PhrasebookEntry(
                text="No se oye bien.", context="Decir que hay mala cobertura", register="neutral"
            ),
            PhrasebookEntry(
                text="\u00bfPuede llamar m\u00e1s tarde?",
                context="Sugerir llamar despu\u00e9s",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Le devuelvo la llamada enseguida.",
                context="Prometer devolver la llamada",
                register="formal",
            ),
            PhrasebookEntry(
                text="\u00bfDe parte de qui\u00e9n?",
                context="Preguntar qui\u00e9n llama",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Un momento, ahora se pone.", context="Pedir que espere", register="neutral"
            ),
        ],
    ),
    PhrasebookCategory(
        id="job_interview_b1",
        level="B1",
        situation="Entrevistas de trabajo",
        icon="\U0001f4bc",
        phrases=[
            PhrasebookEntry(
                text="Estoy muy interesado/a en el puesto.",
                context="Mostrar inter\u00e9s en la oferta",
                register="formal",
            ),
            PhrasebookEntry(
                text="Tengo experiencia en [campo].",
                context="Hablar de experiencia previa",
                register="formal",
            ),
            PhrasebookEntry(
                text="Trabaj\u00e9 en [empresa] durante [tiempo].",
                context="Mencionar un trabajo anterior",
                register="formal",
            ),
            PhrasebookEntry(
                text="\u00bfC\u00f3mo describir\u00eda la cultura de la empresa?",
                context="Preguntar sobre el ambiente laboral",
                register="formal",
            ),
            PhrasebookEntry(
                text="Domino [idiomas/programas].",
                context="Mencionar habilidades",
                register="formal",
            ),
            PhrasebookEntry(
                text="Me gusta trabajar en equipo.",
                context="Describir tu forma de trabajar",
                register="neutral",
            ),
            PhrasebookEntry(
                text="\u00bfCu\u00e1ndo sabr\u00e9 algo de la selecci\u00f3n?",
                context="Preguntar sobre siguientes pasos",
                register="formal",
            ),
            PhrasebookEntry(
                text="Gracias por la oportunidad.",
                context="Agradecer la entrevista",
                register="formal",
            ),
            PhrasebookEntry(
                text="Estoy buscando nuevos retos profesionales.",
                context="Explicar motivo de cambio",
                register="formal",
            ),
            PhrasebookEntry(
                text="\u00bfQu\u00e9 formaci\u00f3n ofrecen?",
                context="Preguntar sobre formaci\u00f3n",
                register="formal",
            ),
            PhrasebookEntry(
                text="\u00bfCu\u00e1l ser\u00eda mi d\u00eda a d\u00eda en este puesto?",
                context="Preguntar sobre las tareas diarias del puesto",
                register="formal",
            ),
        ],
    ),
    PhrasebookCategory(
        id="giving_opinions_b1",
        level="B1",
        situation="Dar opiniones y debatir",
        icon="\U0001f4ac",
        phrases=[
            PhrasebookEntry(
                text="En mi opini\u00f3n...",
                context="Introducir una opini\u00f3n personal",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Yo creo que...", context="Expresar una creencia", register="neutral"
            ),
            PhrasebookEntry(
                text="A m\u00ed me parece que...",
                context="Dar una impresi\u00f3n personal",
                register="neutral",
            ),
            PhrasebookEntry(
                text="No estoy de acuerdo.", context="Expresar desacuerdo", register="neutral"
            ),
            PhrasebookEntry(
                text="Tienes toda la raz\u00f3n.",
                context="Mostrar acuerdo total",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Desde mi punto de vista...",
                context="Introducir una perspectiva",
                register="formal",
            ),
            PhrasebookEntry(
                text="No lo hab\u00eda pensado as\u00ed.",
                context="Reconocer otro punto de vista",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Entiendo lo que dices, pero...",
                context="Mostrar acuerdo parcial y contraargumentar",
                register="neutral",
            ),
            PhrasebookEntry(
                text="En eso coincido contigo.",
                context="Mostrar acuerdo en un punto",
                register="neutral",
            ),
            PhrasebookEntry(
                text="A mi juicio, lo mejor ser\u00eda...",
                context="Dar una opini\u00f3n razonada",
                register="formal",
            ),
            PhrasebookEntry(
                text="Creo que tienes parte de raz\u00f3n.",
                context="Reconocer m\u00e9rito en el argumento ajeno",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Personalmente, opino que...",
                context="Expresar opini\u00f3n dejando claro que es subjetiva",
                register="neutral",
            ),
        ],
    ),
    PhrasebookCategory(
        id="health_appointments_b1",
        level="B1",
        situation="Salud y citas m\u00e9dicas",
        icon="\U0001f3e5",
        phrases=[
            PhrasebookEntry(
                text="Quer\u00eda pedir cita con el m\u00e9dico.",
                context="Solicitar una cita",
                register="formal",
            ),
            PhrasebookEntry(
                text="Me duele [parte del cuerpo].",
                context="Describir un dolor",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Tengo fiebre.", context="Decir que tienes fiebre", register="neutral"
            ),
            PhrasebookEntry(
                text="No me encuentro bien.",
                context="Decir que est\u00e1s enfermo",
                register="neutral",
            ),
            PhrasebookEntry(
                text="\u00bfTiene cita?", context="Preguntar si hay cita previa", register="neutral"
            ),
            PhrasebookEntry(
                text="\u00bfEs grave?", context="Preguntar por la gravedad", register="neutral"
            ),
            PhrasebookEntry(
                text="Tengo que hacerme un an\u00e1lisis de sangre.",
                context="Hablar de una prueba m\u00e9dica",
                register="neutral",
            ),
            PhrasebookEntry(
                text="\u00bfCada cu\u00e1nto tengo que tomar la medicina?",
                context="Preguntar por la posolog\u00eda",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Soy al\u00e9rgico/a a [medicamento/sustancia].",
                context="Informar de alergias",
                register="formal",
            ),
            PhrasebookEntry(
                text="\u00bfMe puede recetar algo?", context="Pedir una receta", register="neutral"
            ),
            PhrasebookEntry(
                text="Necesito un volante para el especialista.",
                context="Pedir derivaci\u00f3n a especialista",
                register="neutral",
            ),
        ],
    ),
]
