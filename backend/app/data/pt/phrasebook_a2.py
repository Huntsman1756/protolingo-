"""Portuguese phrasebook — A2 categories."""

from app.data._types import PhrasebookCategory, PhrasebookEntry

A2_CATEGORIES: list[PhrasebookCategory] = [
    PhrasebookCategory(
        id="restaurant_a2",
        level="A2",
        situation="No restaurante",
        icon="\U0001f37d\ufe0f",
        phrases=[
            PhrasebookEntry(
                text="Tem uma mesa para dois?", context="Pedir uma mesa", register="neutral"
            ),
            PhrasebookEntry(
                text="Reservei em nome Silva.", context="Dizer que se reservou", register="neutral"
            ),
            PhrasebookEntry(
                text="Posso ver a ementa?", context="Pedir a ementa", register="neutral"
            ),
            PhrasebookEntry(
                text="O que me recomenda?",
                context="Pedir um conselho ao empregado",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Quero o bacalhau \u00e0 Br\u00e1s.",
                context="Pedir um prato",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Para beber quero uma \u00e1gua sem g\u00e1s.",
                context="Pedir uma bebida",
                register="neutral",
            ),
            PhrasebookEntry(
                text="A conta, por favor.", context="Pedir a conta", register="neutral"
            ),
            PhrasebookEntry(
                text="Est\u00e1 tudo \u00f3timo!",
                context="Fazer um elogio ao cozinheiro",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Sou al\u00e9rgico/a a...", context="Avisar de uma alergia", register="neutral"
            ),
            PhrasebookEntry(
                text="Pode trazer-me mais p\u00e3o?", context="Pedir algo mais", register="formal"
            ),
            PhrasebookEntry(
                text="T\u00eam pratos vegetarianos?",
                context="Perguntar por op\u00e7\u00f5es vegetarianas",
                register="neutral",
            ),
            PhrasebookEntry(
                text="O couvert est\u00e1 inclu\u00eddo?",
                context="Perguntar sobre o couvert",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Podemos dividir a conta?",
                context="Pedir para dividir a conta",
                register="neutral",
            ),
        ],
    ),
    PhrasebookCategory(
        id="transport_booking_a2",
        level="A2",
        situation="Viagens e transportes",
        icon="\U0001f686",
        phrases=[
            PhrasebookEntry(
                text="Um bilhete para Lisboa, por favor.",
                context="Comprar um bilhete de comboio",
                register="neutral",
            ),
            PhrasebookEntry(
                text="S\u00f3 ida ou ida e volta?",
                context="Perguntar o tipo de bilhete",
                register="neutral",
            ),
            PhrasebookEntry(
                text="De que linha parte?", context="Perguntar a linha", register="neutral"
            ),
            PhrasebookEntry(
                text="O comboio est\u00e1 atrasado.",
                context="Informar de um atraso",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Onde fica a paragem do autocarro?",
                context="Perguntar pela paragem",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Quanto tempo demora?",
                context="Perguntar a dura\u00e7\u00e3o da viagem",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Gostaria de alugar um carro.", context="Alugar um carro", register="formal"
            ),
            PhrasebookEntry(
                text="H\u00e1 um autocarro para o aeroporto?",
                context="Perguntar transporte para o aeroporto",
                register="neutral",
            ),
            PhrasebookEntry(
                text="A que horas parte o pr\u00f3ximo comboio?",
                context="Perguntar hor\u00e1rio do pr\u00f3ximo comboio",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Tenho de fazer transbordo?",
                context="Perguntar por transbordos",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Onde posso comprar os bilhetes?",
                context="Perguntar onde comprar bilhetes",
                register="neutral",
            ),
        ],
    ),
    PhrasebookCategory(
        id="weather_talk_a2",
        level="A2",
        situation="Falar do tempo",
        icon="\U0001f324\ufe0f",
        phrases=[
            PhrasebookEntry(
                text="Como est\u00e1 o tempo hoje?",
                context="Perguntar sobre o tempo",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Est\u00e1 sol.", context="Dizer que est\u00e1 sol", register="neutral"
            ),
            PhrasebookEntry(
                text="Est\u00e1 a chover.",
                context="Dizer que est\u00e1 a chover",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Est\u00e1 muito calor hoje.", context="Comentar o calor", register="neutral"
            ),
            PhrasebookEntry(
                text="Que frio que est\u00e1!", context="Comentar o frio", register="neutral"
            ),
            PhrasebookEntry(
                text="Est\u00e1 nublado.", context="Descrever c\u00e9u nublado", register="neutral"
            ),
            PhrasebookEntry(
                text="Que dia t\u00e3o bonito!",
                context="Comentar um dia bonito",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Amanh\u00e3 deve nevar.", context="Previs\u00e3o de neve", register="neutral"
            ),
            PhrasebookEntry(
                text="Est\u00e1 vento hoje.",
                context="Dizer que est\u00e1 vento",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Como vai estar o tempo amanh\u00e3?",
                context="Perguntar a previs\u00e3o do tempo",
                register="neutral",
            ),
        ],
    ),
    PhrasebookCategory(
        id="making_plans_a2",
        level="A2",
        situation="Fazer planos",
        icon="\U0001f4c5",
        phrases=[
            PhrasebookEntry(
                text="Est\u00e1s livre esta noite?",
                context="Perguntar disponibilidade (informal)",
                register="informal",
            ),
            PhrasebookEntry(
                text="Apetece-te ir ao cinema?",
                context="Convidar algu\u00e9m (informal)",
                register="informal",
            ),
            PhrasebookEntry(
                text="A que horas nos encontramos?", context="Combinar a hora", register="neutral"
            ),
            PhrasebookEntry(
                text="Encontramo-nos na pra\u00e7a \u00e0s oito.",
                context="Combinar lugar e hora",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Lamento, n\u00e3o posso.", context="Recusar um convite", register="neutral"
            ),
            PhrasebookEntry(
                text="Com certeza! / Com muito gosto!",
                context="Aceitar um convite",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Que tal irmos tomar um caf\u00e9?",
                context="Propor uma atividade",
                register="informal",
            ),
            PhrasebookEntry(
                text="Podemos adiar para amanh\u00e3?",
                context="Pedir para adiar",
                register="neutral",
            ),
            PhrasebookEntry(
                text="At\u00e9 logo!", context="Despedir-se marcando encontro", register="informal"
            ),
            PhrasebookEntry(
                text="Passo por ti \u00e0s sete.", context="Oferecer boleia", register="informal"
            ),
            PhrasebookEntry(
                text="Onde nos encontramos?",
                context="Perguntar o lugar do encontro",
                register="neutral",
            ),
        ],
    ),
    PhrasebookCategory(
        id="feelings_a2",
        level="A2",
        situation="Exprimir emo\u00e7\u00f5es",
        icon="\U0001f60a",
        phrases=[
            PhrasebookEntry(text="Estou feliz.", context="Exprimir felicidade", register="neutral"),
            PhrasebookEntry(text="Estou triste.", context="Exprimir tristeza", register="neutral"),
            PhrasebookEntry(
                text="Estou cansado / cansada.", context="Exprimir cansa\u00e7o", register="neutral"
            ),
            PhrasebookEntry(text="Tenho fome.", context="Exprimir fome", register="neutral"),
            PhrasebookEntry(text="Tenho sede.", context="Exprimir sede", register="neutral"),
            PhrasebookEntry(text="Tenho medo.", context="Exprimir medo", register="neutral"),
            PhrasebookEntry(
                text="Estou zangado / zangada.", context="Exprimir raiva", register="neutral"
            ),
            PhrasebookEntry(
                text="Estou preocupado / preocupada.",
                context="Exprimir preocupa\u00e7\u00e3o",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Estou entusiasmado / entusiasmada!",
                context="Exprimir entusiasmo",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Estou aborrecido / aborrecida.",
                context="Exprimir aborrecimento",
                register="neutral",
            ),
            PhrasebookEntry(text="Que stress!", context="Exprimir stress", register="informal"),
        ],
    ),
]
