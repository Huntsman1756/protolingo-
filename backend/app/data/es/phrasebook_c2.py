"""Spanish phrasebook — C2 categories."""

from app.data._types import PhrasebookCategory, PhrasebookEntry

C2_CATEGORIES: list[PhrasebookCategory] = [
    PhrasebookCategory(
        id="rhetoric_c2",
        level="C2",
        situation="Ret\u00f3rica y persuasi\u00f3n",
        icon="\U0001f3db\ufe0f",
        phrases=[
            PhrasebookEntry(
                text="\u00bfAcaso no es evidente que...?",
                context="Lanzar una pregunta ret\u00f3rica contundente",
                register="formal",
            ),
            PhrasebookEntry(
                text="Perm\u00edtanme esbozar a grandes rasgos...",
                context="Anunciar un resumen preliminar",
                register="formal",
            ),
            PhrasebookEntry(
                text="No es balad\u00ed se\u00f1alar que...",
                context="Dar importancia a un punto",
                register="formal",
            ),
            PhrasebookEntry(
                text="A fuer de ser sincero, he de reconocer que...",
                context="Mostrar sinceridad estrat\u00e9gica",
                register="formal",
            ),
            PhrasebookEntry(
                text="Con ello no hago sino constatar lo que ya muchos advirtieron.",
                context="Reforzar un argumento con precedentes",
                register="formal",
            ),
            PhrasebookEntry(
                text="Este argumento, siendo s\u00f3lido, adolece de...",
                context="Conceder y matizar a la vez",
                register="formal",
            ),
            PhrasebookEntry(
                text="Conviene no perder de vista el trasfondo de la cuesti\u00f3n.",
                context="Recordar el contexto esencial",
                register="formal",
            ),
            PhrasebookEntry(
                text="Dicho de otro modo, estamos ante un callej\u00f3n sin salida.",
                context="Reformular concluyentemente",
                register="formal",
            ),
            PhrasebookEntry(
                text="La clave no reside tanto en... como en...",
                context="Redefinir el eje del debate",
                register="formal",
            ),
            PhrasebookEntry(
                text="En conciencia, no puedo sino disentir.",
                context="Expresar desacuerdo con solemnidad",
                register="formal",
            ),
            PhrasebookEntry(
                text="De seguir as\u00ed, las consecuencias ser\u00e1n irreversibles.",
                context="Advertir con contundencia",
                register="formal",
            ),
        ],
    ),
    PhrasebookCategory(
        id="nuanced_discourse_c2",
        level="C2",
        situation="Discurso matizado y diplomacia",
        icon="\U0001f3ad",
        phrases=[
            PhrasebookEntry(
                text="Sin querer restar m\u00e9rito a su propuesta...",
                context="Suavizar una cr\u00edtica",
                register="formal",
            ),
            PhrasebookEntry(
                text="Me atrever\u00eda a aventurar que...",
                context="Proponer una hip\u00f3tesis con cautela",
                register="formal",
            ),
            PhrasebookEntry(
                text="No me corresponde a m\u00ed juzgar, pero...",
                context="Opinar sorteando la responsabilidad",
                register="formal",
            ),
            PhrasebookEntry(
                text="Todo apunta a que, en efecto...",
                context="Confirmar con evidencia circunstancial",
                register="formal",
            ),
            PhrasebookEntry(
                text="Salvando las distancias, la situaci\u00f3n recuerda a...",
                context="Hacer una analog\u00eda con reservas",
                register="formal",
            ),
            PhrasebookEntry(
                text="Como bien ha apuntado el Sr. [apellido]...",
                context="Reconocer m\u00e9rito ajeno en un debate",
                register="formal",
            ),
            PhrasebookEntry(
                text="Soy consciente de que mi postura puede resultar controvertida.",
                context="Admitir el posible rechazo de tu postura",
                register="formal",
            ),
            PhrasebookEntry(
                text="Me limitar\u00e9 a se\u00f1alar que...",
                context="Restringir el alcance de la intervenci\u00f3n",
                register="formal",
            ),
            PhrasebookEntry(
                text="No ser\u00eda del todo exacto afirmar que...",
                context="Corregir con diplomacia",
                register="formal",
            ),
            PhrasebookEntry(
                text="En honor a la verdad, debo reconocer que...",
                context="Admitir algo que contradice tu postura",
                register="formal",
            ),
            PhrasebookEntry(
                text="Conviene ser cauto antes de extraer conclusiones precipitadas.",
                context="Pedir prudencia",
                register="formal",
            ),
        ],
    ),
    PhrasebookCategory(
        id="legal_contractual_c2",
        level="C2",
        situation="Lenguaje jur\u00eddico y contractual",
        icon="\u2696\ufe0f",
        phrases=[
            PhrasebookEntry(
                text="Las partes acuerdan lo dispuesto en las siguientes cl\u00e1usulas.",
                context="Inicio de un contrato",
                register="formal",
            ),
            PhrasebookEntry(
                text="En virtud de lo establecido en el art\u00edculo...",
                context="Referirse a legislaci\u00f3n",
                register="formal",
            ),
            PhrasebookEntry(
                text="El presente documento surtir\u00e1 efecto a partir de...",
                context="Indicar entrada en vigor",
                register="formal",
            ),
            PhrasebookEntry(
                text="Queda expresamente prohibido...",
                context="Establecer una prohibici\u00f3n formal",
                register="formal",
            ),
            PhrasebookEntry(
                text="A tenor de lo expuesto, se resuelve...",
                context="Emitir una resoluci\u00f3n",
                register="formal",
            ),
            PhrasebookEntry(
                text="En caso de litigio, las partes se someter\u00e1n a...",
                context="Cl\u00e1usula de resoluci\u00f3n de conflictos",
                register="formal",
            ),
            PhrasebookEntry(
                text="Se proceder\u00e1 conforme a derecho.",
                context="Indicar cumplimiento legal",
                register="formal",
            ),
            PhrasebookEntry(
                text="Sin perjuicio de lo anterior...",
                context="Salvaguardar derechos previos",
                register="formal",
            ),
            PhrasebookEntry(
                text="En cumplimiento de la normativa vigente...",
                context="Justificar una acci\u00f3n por ley",
                register="formal",
            ),
            PhrasebookEntry(
                text="El incumplimiento de lo aqu\u00ed estipulado dar\u00e1 lugar a...",
                context="Establecer consecuencias de incumplimiento",
                register="formal",
            ),
            PhrasebookEntry(
                text="A los efectos del presente acuerdo, se entender\u00e1 por...",
                context="Definir un t\u00e9rmino en un contrato",
                register="formal",
            ),
        ],
    ),
    PhrasebookCategory(
        id="social_commentary_c2",
        level="C2",
        situation="Comentario social y cultural",
        icon="\U0001f30d",
        phrases=[
            PhrasebookEntry(
                text="Asistimos a un cambio de paradigma sin precedentes.",
                context="Comentar una transformaci\u00f3n social",
                register="formal",
            ),
            PhrasebookEntry(
                text="Esta tendencia, lejos de ser coyuntural, refleja...",
                context="Analizar una tendencia social",
                register="formal",
            ),
            PhrasebookEntry(
                text="Con la debida cautela, podr\u00eda afirmarse que...",
                context="Hacer una afirmaci\u00f3n con reservas",
                register="formal",
            ),
            PhrasebookEntry(
                text="La ciudadan\u00eda demanda, cada vez con m\u00e1s fuerza...",
                context="Hablar de demandas sociales",
                register="formal",
            ),
            PhrasebookEntry(
                text="Se ha generado un debate en torno a la pertinencia de...",
                context="Introducir una pol\u00e9mica social",
                register="formal",
            ),
            PhrasebookEntry(
                text="Nos encontramos ante una encrucijada hist\u00f3rica.",
                context="Subrayar la importancia del momento",
                register="formal",
            ),
            PhrasebookEntry(
                text="Convendr\u00eda replantearse ciertas inercias arraigadas.",
                context="Sugerir un cambio cultural",
                register="formal",
            ),
            PhrasebookEntry(
                text="La sociedad espa\u00f1ola ha experimentado una evoluci\u00f3n notable en...",
                context="Contextualizar un cambio social",
                register="formal",
            ),
            PhrasebookEntry(
                text="Es menester que reflexionemos sobre...",
                context="Llamar a la reflexi\u00f3n colectiva",
                register="formal",
            ),
            PhrasebookEntry(
                text="No se trata de un fen\u00f3meno aislado, sino sist\u00e9mico.",
                context="Enmarcar un problema como estructural",
                register="formal",
            ),
            PhrasebookEntry(
                text="El tejido social se ha visto profundamente transformado por...",
                context="Describir cambios sociales profundos",
                register="formal",
            ),
        ],
    ),
]
