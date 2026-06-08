"""Spanish phrasebook — A2 categories."""

from app.data._types import PhrasebookCategory, PhrasebookEntry

A2_CATEGORIES: list[PhrasebookCategory] = [
    PhrasebookCategory(
        id="restaurant_a2",
        level="A2",
        situation="En el restaurante",
        icon="\U0001f37d\ufe0f",
        phrases=[
            PhrasebookEntry(
                text="Una mesa para [n\u00famero] personas, por favor.",
                context="Pedir mesa al llegar",
                register="neutral",
            ),
            PhrasebookEntry(
                text="\u00bfTienen mesa libre?",
                context="Preguntar si hay sitio",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Tenemos reserva a nombre de [nombre].",
                context="Al llegar con reserva",
                register="formal",
            ),
            PhrasebookEntry(
                text="\u00bfCu\u00e1l es el plato del d\u00eda?",
                context="Preguntar por el men\u00fa del d\u00eda",
                register="neutral",
            ),
            PhrasebookEntry(
                text="De primero quiero [plato].",
                context="Pedir el primer plato",
                register="neutral",
            ),
            PhrasebookEntry(
                text="De segundo voy a tomar [plato].",
                context="Pedir el segundo plato",
                register="neutral",
            ),
            PhrasebookEntry(
                text="La cuenta, por favor.", context="Pedir la cuenta", register="neutral"
            ),
            PhrasebookEntry(
                text="\u00bfTienen opciones vegetarianas?",
                context="Preguntar por comida vegetariana",
                register="neutral",
            ),
            PhrasebookEntry(
                text="\u00bfQu\u00e9 me recomienda?",
                context="Pedir recomendaci\u00f3n al camarero",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Est\u00e1 muy bueno.", context="Elogiar la comida", register="neutral"
            ),
            PhrasebookEntry(
                text="Sin cebolla, por favor.",
                context="Pedir que quiten un ingrediente",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Para beber, agua con gas.", context="Pedir una bebida", register="neutral"
            ),
            PhrasebookEntry(
                text="\u00bfEst\u00e1 incluida la propina?",
                context="Preguntar por el servicio",
                register="neutral",
            ),
            PhrasebookEntry(
                text="\u00bfCu\u00e1l es la especialidad de la casa?",
                context="Preguntar por el plato t\u00edpico del restaurante",
                register="neutral",
            ),
        ],
    ),
    PhrasebookCategory(
        id="transport_booking_a2",
        level="A2",
        situation="Viajes y transporte",
        icon="\U0001f68c",
        phrases=[
            PhrasebookEntry(
                text="Quiero un billete para [destino].",
                context="Comprar un billete",
                register="neutral",
            ),
            PhrasebookEntry(
                text="\u00bfA qu\u00e9 hora sale el tren/avi\u00f3n?",
                context="Preguntar la hora de salida",
                register="neutral",
            ),
            PhrasebookEntry(
                text="\u00bfCu\u00e1nto tarda en llegar?",
                context="Preguntar por la duraci\u00f3n",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ida y vuelta, por favor.",
                context="Comprar billete de ida y vuelta",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Solo ida.", context="Comprar billete solo de ida", register="neutral"
            ),
            PhrasebookEntry(
                text="\u00bfDe qu\u00e9 and\u00e9n sale?",
                context="Preguntar el and\u00e9n del tren",
                register="neutral",
            ),
            PhrasebookEntry(
                text="\u00bfD\u00f3nde est\u00e1 la parada del autob\u00fas?",
                context="Preguntar por la parada",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Querr\u00eda reservar un hotel.",
                context="Reservar alojamiento",
                register="formal",
            ),
            PhrasebookEntry(
                text="\u00bfTienen habitaciones libres para esta noche?",
                context="Buscar alojamiento de \u00faltima hora",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Quer\u00eda alquilar un coche.",
                context="Alquilar un veh\u00edculo",
                register="formal",
            ),
            PhrasebookEntry(
                text="\u00bfA qu\u00e9 hora es el check-in?",
                context="Preguntar el horario de entrada",
                register="neutral",
            ),
            PhrasebookEntry(
                text="\u00bfEst\u00e1 incluido el desayuno?",
                context="Preguntar por servicios incluidos",
                register="neutral",
            ),
        ],
    ),
    PhrasebookCategory(
        id="weather_talk_a2",
        level="A2",
        situation="Hablar del tiempo",
        icon="\U0001f324\ufe0f",
        phrases=[
            PhrasebookEntry(
                text="Hace buen tiempo.",
                context="Comentar que el tiempo es bueno",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Hace mal tiempo.",
                context="Comentar que el tiempo es malo",
                register="neutral",
            ),
            PhrasebookEntry(text="Hace sol.", context="Decir que hay sol", register="neutral"),
            PhrasebookEntry(
                text="Est\u00e1 nublado.",
                context="Decir que est\u00e1 el cielo cubierto",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Hace mucho calor.", context="Quejarse del calor", register="neutral"
            ),
            PhrasebookEntry(
                text="Hace bastante fr\u00edo.", context="Comentar el fr\u00edo", register="neutral"
            ),
            PhrasebookEntry(
                text="Est\u00e1 lloviendo.", context="Decir que llueve", register="neutral"
            ),
            PhrasebookEntry(
                text="Hace viento.", context="Decir que hay viento", register="neutral"
            ),
            PhrasebookEntry(text="Va a llover.", context="Predecir lluvia", register="neutral"),
            PhrasebookEntry(
                text="\u00bfQu\u00e9 tiempo hace?",
                context="Preguntar por el tiempo",
                register="neutral",
            ),
            PhrasebookEntry(
                text="La temperatura es de [n\u00famero] grados.",
                context="Dar la temperatura",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Est\u00e1 nevando.", context="Decir que nieva", register="neutral"
            ),
            PhrasebookEntry(
                text="Ma\u00f1ana har\u00e1 sol.",
                context="Hablar de la previsi\u00f3n del tiempo",
                register="neutral",
            ),
        ],
    ),
    PhrasebookCategory(
        id="making_plans_a2",
        level="A2",
        situation="Hacer planes y quedar",
        icon="\U0001f4c5",
        phrases=[
            PhrasebookEntry(
                text="\u00bfQuedamos el [d\u00eda]?",
                context="Proponer un encuentro",
                register="neutral",
            ),
            PhrasebookEntry(
                text="\u00bfTe apetece tomar algo?",
                context="Invitar a tomar algo",
                register="informal",
            ),
            PhrasebookEntry(
                text="\u00bfQu\u00e9 te parece el s\u00e1bado?",
                context="Sugerir un d\u00eda",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Me viene bien a las [hora].",
                context="Confirmar disponibilidad",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Lo siento, no puedo.",
                context="Rechazar una invitaci\u00f3n",
                register="neutral",
            ),
            PhrasebookEntry(
                text="\u00bfA qu\u00e9 hora quedamos?",
                context="Preguntar la hora de encuentro",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Quedamos en [lugar].",
                context="Acordar un punto de encuentro",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Me encantar\u00eda ir.", context="Aceptar con entusiasmo", register="neutral"
            ),
            PhrasebookEntry(
                text="\u00bfTe recojo o quedamos all\u00ed?",
                context="Coordinar la log\u00edstica",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Otro d\u00eda, \u00bfvale?", context="Posponer una cita", register="informal"
            ),
            PhrasebookEntry(
                text="He quedado con [persona] a las [hora].",
                context="Explicar un plan ya acordado",
                register="neutral",
            ),
            PhrasebookEntry(
                text="\u00bfEl viernes te va bien?",
                context="Preguntar por disponibilidad",
                register="neutral",
            ),
            PhrasebookEntry(
                text="\u00bfTe viene bien quedar para cenar?",
                context="Proponer un plan concreto para cenar",
                register="informal",
            ),
        ],
    ),
    PhrasebookCategory(
        id="feelings_a2",
        level="A2",
        situation="Expresar sentimientos",
        icon="\U0001f60a",
        phrases=[
            PhrasebookEntry(
                text="Estoy contento/a.", context="Expresar alegr\u00eda", register="neutral"
            ),
            PhrasebookEntry(text="Estoy triste.", context="Expresar tristeza", register="neutral"),
            PhrasebookEntry(
                text="Estoy cansado/a.",
                context="Decir que tienes sue\u00f1o o fatiga",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Tengo hambre.", context="Decir que tienes hambre", register="neutral"
            ),
            PhrasebookEntry(text="Tengo sed.", context="Decir que tienes sed", register="neutral"),
            PhrasebookEntry(
                text="Tengo sue\u00f1o.", context="Decir que tienes sue\u00f1o", register="neutral"
            ),
            PhrasebookEntry(
                text="Estoy un poco preocupado/a.",
                context="Expresar preocupaci\u00f3n",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Me da igual.", context="Expresar indiferencia", register="neutral"
            ),
            PhrasebookEntry(
                text="\u00a1Qu\u00e9 alegr\u00eda!",
                context="Expresar alegr\u00eda intensa",
                register="neutral",
            ),
            PhrasebookEntry(
                text="\u00a1Qu\u00e9 pena!",
                context="Expresar decepci\u00f3n o l\u00e1stima",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Me da mucha verg\u00fcenza.",
                context="Expresar verg\u00fcenza",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Estoy aburrido/a.", context="Expresar aburrimiento", register="neutral"
            ),
            PhrasebookEntry(
                text="Estoy nervioso/a.", context="Expresar nerviosismo", register="neutral"
            ),
            PhrasebookEntry(
                text="\u00a1Estoy ilusionado/a!",
                context="Expresar ilusi\u00f3n",
                register="neutral",
            ),
        ],
    ),
]
