"""Spanish phrasebook — C1 categories."""

from app.data._types import PhrasebookCategory, PhrasebookEntry

C1_CATEGORIES: list[PhrasebookCategory] = [
    PhrasebookCategory(
        id="presentations_c1",
        level="C1",
        situation="Presentaciones y oratoria",
        icon="\U0001f3a4",
        phrases=[
            PhrasebookEntry(
                text="Se\u00f1oras y se\u00f1ores, gracias por su asistencia.",
                context="Abrir una presentaci\u00f3n formal",
                register="formal",
            ),
            PhrasebookEntry(
                text="El objetivo de esta presentaci\u00f3n es...",
                context="Exponer el prop\u00f3sito de la charla",
                register="formal",
            ),
            PhrasebookEntry(
                text="A continuaci\u00f3n, pasar\u00e9 a analizar...",
                context="Transici\u00f3n entre secciones",
                register="formal",
            ),
            PhrasebookEntry(
                text="Como pueden observar en esta diapositiva...",
                context="Referirse a un soporte visual",
                register="formal",
            ),
            PhrasebookEntry(
                text="Me gustar\u00eda hacer hincapi\u00e9 en...",
                context="Enfatizar un punto",
                register="formal",
            ),
            PhrasebookEntry(
                text="No quisiera extenderme demasiado en este punto.",
                context="Gestionar el tiempo",
                register="formal",
            ),
            PhrasebookEntry(
                text="A modo de conclusi\u00f3n...", context="Empezar el cierre", register="formal"
            ),
            PhrasebookEntry(
                text="Estoy a su disposici\u00f3n para cualquier pregunta.",
                context="Abrir turno de preguntas",
                register="formal",
            ),
            PhrasebookEntry(
                text="Si me permiten, quisiera a\u00f1adir que...",
                context="A\u00f1adir informaci\u00f3n",
                register="formal",
            ),
            PhrasebookEntry(
                text="Para resumir lo expuesto...",
                context="Resumir antes de concluir",
                register="formal",
            ),
            PhrasebookEntry(
                text="Ante todo, quisiera agradecer la oportunidad de estar aqu\u00ed.",
                context="Agradecer al inicio",
                register="formal",
            ),
        ],
    ),
    PhrasebookCategory(
        id="complex_arguments_c1",
        level="C1",
        situation="Argumentaci\u00f3n compleja",
        icon="\U0001f9e0",
        phrases=[
            PhrasebookEntry(
                text="Cabr\u00eda preguntarse si realmente...",
                context="Plantear una duda ret\u00f3rica",
                register="formal",
            ),
            PhrasebookEntry(
                text="Sin \u00e1nimo de polemizar, considero que...",
                context="Suavizar una opini\u00f3n controvertida",
                register="formal",
            ),
            PhrasebookEntry(
                text="Por m\u00e1s que se intente justificar, no cabe duda de que...",
                context="Argumentar concesivamente",
                register="formal",
            ),
            PhrasebookEntry(
                text="Resulta cuanto menos sorprendente que...",
                context="Expresar escepticismo educado",
                register="formal",
            ),
            PhrasebookEntry(
                text="A este respecto, conviene matizar que...",
                context="Introducir un matiz importante",
                register="formal",
            ),
            PhrasebookEntry(
                text="No se trata tanto de... como de...",
                context="Reformular el enfoque",
                register="formal",
            ),
            PhrasebookEntry(
                text="Aunque pueda parecer lo contrario, los datos avalan...",
                context="Contraargumentar con datos",
                register="formal",
            ),
            PhrasebookEntry(
                text="Subyace a este planteamiento la idea de que...",
                context="Identificar una premisa impl\u00edcita",
                register="formal",
            ),
            PhrasebookEntry(
                text="Con ello no pretendo insinuar que...",
                context="Prevenir un malentendido",
                register="formal",
            ),
            PhrasebookEntry(
                text="En \u00faltima instancia, lo que est\u00e1 en juego es...",
                context="Se\u00f1alar lo fundamental del debate",
                register="formal",
            ),
            PhrasebookEntry(
                text="Cabe se\u00f1alar, sin embargo, que...",
                context="Introducir una objeci\u00f3n con matiz",
                register="formal",
            ),
        ],
    ),
    PhrasebookCategory(
        id="professional_networking_c1",
        level="C1",
        situation="Networking profesional",
        icon="\U0001f517",
        phrases=[
            PhrasebookEntry(
                text="\u00bfPuedo presentarme? Soy [nombre], de [empresa].",
                context="Presentarse en un evento",
                register="formal",
            ),
            PhrasebookEntry(
                text="He o\u00eddo hablar muy bien de su empresa.",
                context="Romper el hielo con un cumplido",
                register="formal",
            ),
            PhrasebookEntry(
                text="Me dedico a [sector/especialidad].",
                context="Explicar la actividad profesional",
                register="neutral",
            ),
            PhrasebookEntry(
                text="\u00bfMe permite que le d\u00e9 mi tarjeta?",
                context="Ofrecer la tarjeta de visita",
                register="formal",
            ),
            PhrasebookEntry(
                text="Creo que podr\u00edamos colaborar en el futuro.",
                context="Sugerir una futura colaboraci\u00f3n",
                register="formal",
            ),
            PhrasebookEntry(
                text="\u00bfLe importar\u00eda ponerme en contacto con [persona]?",
                context="Pedir una presentaci\u00f3n",
                register="formal",
            ),
            PhrasebookEntry(
                text="Ha sido un placer conocerte.",
                context="Despedirse cordialmente (informal)",
                register="informal",
            ),
            PhrasebookEntry(
                text="Estaremos en contacto.", context="Prometer seguimiento", register="neutral"
            ),
            PhrasebookEntry(
                text="\u00bfEst\u00e1is en LinkedIn?",
                context="Preguntar por la presencia en redes",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Me interesa mucho lo que est\u00e1is haciendo en [\u00e1rea].",
                context="Mostrar inter\u00e9s genuino",
                register="neutral",
            ),
            PhrasebookEntry(
                text="\u00bfOs importar\u00eda si os env\u00edo un correo para seguir en contacto?",
                context="Proponer mantener el contacto",
                register="formal",
            ),
        ],
    ),
    PhrasebookCategory(
        id="conflict_resolution_c1",
        level="C1",
        situation="Resoluci\u00f3n de conflictos",
        icon="\U0001f54a\ufe0f",
        phrases=[
            PhrasebookEntry(
                text="Creo que ha habido un malentendido.",
                context="Detectar un malentendido",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Lamento si mis palabras han podido ofender.",
                context="Disculparse sin admitir culpa necesariamente",
                register="formal",
            ),
            PhrasebookEntry(
                text="Entiendo perfectamente su postura.",
                context="Validar la posici\u00f3n del otro",
                register="formal",
            ),
            PhrasebookEntry(
                text="Quiz\u00e1 podamos buscar una soluci\u00f3n intermedia.",
                context="Proponer buscar un compromiso",
                register="neutral",
            ),
            PhrasebookEntry(
                text="No era esa mi intenci\u00f3n.",
                context="Aclarar intenciones",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ambas partes tenemos parte de raz\u00f3n.",
                context="Reconocer legitimidad en ambas posturas",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Le propongo que aparquemos este asunto por ahora.",
                context="Sugerir posponer la discusi\u00f3n",
                register="formal",
            ),
            PhrasebookEntry(
                text="Para resolverlo, necesito que me aclare...",
                context="Pedir informaci\u00f3n para resolver",
                register="neutral",
            ),
            PhrasebookEntry(
                text="No quisiera que esto afectara nuestra relaci\u00f3n profesional.",
                context="Expresar inter\u00e9s en mantener la relaci\u00f3n",
                register="formal",
            ),
            PhrasebookEntry(
                text="Cuente con mi disposici\u00f3n para solucionarlo.",
                context="Ofrecer colaboraci\u00f3n",
                register="formal",
            ),
        ],
    ),
]
