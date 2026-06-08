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
]
