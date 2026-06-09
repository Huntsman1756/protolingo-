"""Portuguese phrasebook — B1 categories."""

from app.data._types import PhrasebookCategory, PhrasebookEntry

B1_CATEGORIES: list[PhrasebookCategory] = [
    PhrasebookCategory(
        id="phone_calls_b1",
        level="B1",
        situation="Chamadas telef\u00f3nicas",
        icon="\U0001f4de",
        phrases=[
            PhrasebookEntry(
                text="Estou? / Est\u00e1 l\u00e1?", context="Atender o telefone", register="neutral"
            ),
            PhrasebookEntry(
                text="Posso falar com o senhor Silva?",
                context="Pedir para falar com algu\u00e9m (formal)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Est\u00e1 a Maria?",
                context="Perguntar por algu\u00e9m (informal)",
                register="informal",
            ),
            PhrasebookEntry(
                text="Um momento, vou cham\u00e1-la.",
                context="Passar a chamada (informal)",
                register="informal",
            ),
            PhrasebookEntry(
                text="Pode ligar mais tarde?",
                context="Pedir para ligar mais tarde",
                register="formal",
            ),
            PhrasebookEntry(
                text="N\u00e3o se ouve bem.",
                context="Indicar problemas de linha",
                register="informal",
            ),
            PhrasebookEntry(
                text="Est\u00e1 a ouvir-me?",
                context="Verificar se o interlocutor ouve",
                register="neutral",
            ),
            PhrasebookEntry(
                text="\u00c9 engano.",
                context="Informar que \u00e9 um n\u00famero errado",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Posso deixar uma mensagem?",
                context="Oferecer para deixar mensagem",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ligo-lhe assim que puder.",
                context="Prometer voltar a ligar",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Quem fala?", context="Perguntar quem est\u00e1 a ligar", register="neutral"
            ),
        ],
    ),
    PhrasebookCategory(
        id="job_interview_b1",
        level="B1",
        situation="Entrevistas de emprego",
        icon="\U0001f4bc",
        phrases=[
            PhrasebookEntry(
                text="Bom dia, tenho uma entrevista \u00e0s dez.",
                context="Apresentar-se na rece\u00e7\u00e3o",
                register="formal",
            ),
            PhrasebookEntry(
                text="Estudei economia na universidade.",
                context="Falar do percurso acad\u00e9mico",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Tenho experi\u00eancia no setor.",
                context="Falar da experi\u00eancia profissional",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Falo tr\u00eas l\u00ednguas: portugu\u00eas, ingl\u00eas e espanhol.",
                context="Listar as compet\u00eancias lingu\u00edsticas",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Sou uma pessoa organizada e respons\u00e1vel.",
                context="Descrever as pr\u00f3prias qualidades",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Gosto de trabalhar em equipa.",
                context="Falar do trabalho em equipa",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Quais s\u00e3o os hor\u00e1rios de trabalho?",
                context="Perguntar sobre o hor\u00e1rio",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Que tipo de contrato oferecem?",
                context="Perguntar sobre o contrato",
                register="formal",
            ),
            PhrasebookEntry(
                text="Quando saberei o resultado da entrevista?",
                context="Perguntar prazos de resposta",
                register="formal",
            ),
            PhrasebookEntry(
                text="Obrigado pela oportunidade.",
                context="Agradecer no final da entrevista",
                register="formal",
            ),
            PhrasebookEntry(
                text="Como \u00e9 o ambiente de trabalho aqui?",
                context="Perguntar sobre a cultura da empresa",
                register="neutral",
            ),
        ],
    ),
    PhrasebookCategory(
        id="giving_opinions_b1",
        level="B1",
        situation="Dar opini\u00f5es",
        icon="\U0001f4ac",
        phrases=[
            PhrasebookEntry(
                text="Na minha opini\u00e3o \u00e9 uma boa ideia.",
                context="Exprimir a pr\u00f3pria opini\u00e3o",
                register="neutral",
            ),
            PhrasebookEntry(
                text="N\u00e3o concordo.", context="Exprimir desacordo", register="neutral"
            ),
            PhrasebookEntry(
                text="Tens raz\u00e3o.", context="Dar raz\u00e3o a algu\u00e9m", register="neutral"
            ),
            PhrasebookEntry(
                text="Talvez estejas enganado.",
                context="Exprimir desacordo suave",
                register="neutral",
            ),
            PhrasebookEntry(
                text="N\u00e3o tenho a certeza.", context="Exprimir incerteza", register="neutral"
            ),
            PhrasebookEntry(
                text="Depende.", context="Evitar uma resposta categ\u00f3rica", register="neutral"
            ),
            PhrasebookEntry(
                text="Do meu ponto de vista...",
                context="Introduzir a pr\u00f3pria perspetiva",
                register="neutral",
            ),
            PhrasebookEntry(
                text="O que achas?",
                context="Pedir uma opini\u00e3o (informal)",
                register="informal",
            ),
            PhrasebookEntry(
                text="O que acha?", context="Pedir uma opini\u00e3o (formal)", register="formal"
            ),
            PhrasebookEntry(
                text="Discordo completamente.",
                context="Exprimir forte desacordo",
                register="formal",
            ),
            PhrasebookEntry(
                text="De facto, tens toda a raz\u00e3o.",
                context="Admitir que o outro tem raz\u00e3o",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Permita-me discordar.",
                context="Introduzir educadamente um desacordo",
                register="formal",
            ),
        ],
    ),
    PhrasebookCategory(
        id="health_appointments_b1",
        level="B1",
        situation="Sa\u00fade e consultas m\u00e9dicas",
        icon="\U0001f3e5",
        phrases=[
            PhrasebookEntry(
                text="Gostaria de marcar uma consulta.",
                context="Marcar uma consulta",
                register="formal",
            ),
            PhrasebookEntry(
                text="Tenho dores de cabe\u00e7a h\u00e1 dois dias.",
                context="Descrever um sintoma",
                register="neutral",
            ),
            PhrasebookEntry(
                text="D\u00f3i-me aqui.", context="Indicar onde se sente dor", register="neutral"
            ),
            PhrasebookEntry(
                text="Tenho febre.", context="Dizer que se tem febre", register="neutral"
            ),
            PhrasebookEntry(
                text="Sou al\u00e9rgico/a \u00e0 penicilina.",
                context="Declarar uma alergia",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Preciso de uma receita?",
                context="Perguntar sobre a prescri\u00e7\u00e3o",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Tome este medicamento duas vezes ao dia.",
                context="Receber instru\u00e7\u00f5es sobre o medicamento",
                register="formal",
            ),
            PhrasebookEntry(
                text="Quando posso vir?",
                context="Perguntar por disponibilidade",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Preciso de um atestado m\u00e9dico.",
                context="Pedir um atestado",
                register="formal",
            ),
            PhrasebookEntry(
                text="\u00c9 urgente.", context="Indicar urg\u00eancia", register="neutral"
            ),
        ],
    ),
]
