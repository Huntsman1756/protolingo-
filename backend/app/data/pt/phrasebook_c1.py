"""Portuguese phrasebook — C1 categories."""

from app.data._types import PhrasebookCategory, PhrasebookEntry

C1_CATEGORIES: list[PhrasebookCategory] = [
    PhrasebookCategory(
        id="presentations_c1",
        level="C1",
        situation="Apresenta\u00e7\u00f5es e orat\u00f3ria",
        icon="\U0001f3a4",
        phrases=[
            PhrasebookEntry(
                text="Senhoras e senhores, bom dia.",
                context="Abertura formal de uma apresenta\u00e7\u00e3o",
                register="formal",
            ),
            PhrasebookEntry(
                text="Hoje gostaria de vos falar de um tema que me \u00e9 muito caro.",
                context="Introduzir o tema com envolvimento emotivo",
                register="formal",
            ),
            PhrasebookEntry(
                text="A minha apresenta\u00e7\u00e3o est\u00e1 dividida em tr\u00eas partes.",
                context="Ilustrar a estrutura",
                register="formal",
            ),
            PhrasebookEntry(
                text="Como podem ver neste diapositivo...",
                context="Comentar um slide",
                register="formal",
            ),
            PhrasebookEntry(
                text="Para aprofundar este aspeto...",
                context="Aprofundar um ponto",
                register="formal",
            ),
            PhrasebookEntry(
                text="Gostaria de chamar a vossa aten\u00e7\u00e3o para este gr\u00e1fico.",
                context="Atrair a aten\u00e7\u00e3o para um dado visual",
                register="formal",
            ),
            PhrasebookEntry(
                text="Permitam-me abrir um breve par\u00eantesis.",
                context="Fazer uma digress\u00e3o",
                register="formal",
            ),
            PhrasebookEntry(
                text="Em conclus\u00e3o, considero fundamental sublinhar que...",
                context="Concluir com \u00eanfase",
                register="formal",
            ),
            PhrasebookEntry(
                text="Agrade\u00e7o a vossa aten\u00e7\u00e3o.",
                context="Agradecer no final",
                register="formal",
            ),
            PhrasebookEntry(
                text="Se houver perguntas, estou \u00e0 vossa disposi\u00e7\u00e3o.",
                context="Abrir \u00e0s perguntas",
                register="formal",
            ),
            PhrasebookEntry(
                text="Para resumir o que foi dito at\u00e9 agora...",
                context="Resumir a meio da apresenta\u00e7\u00e3o",
                register="formal",
            ),
            PhrasebookEntry(
                text="Gostaria de concluir com uma cita\u00e7\u00e3o de...",
                context="Fechar com uma cita\u00e7\u00e3o",
                register="formal",
            ),
            PhrasebookEntry(
                text="Passo agora \u00e0 segunda parte.",
                context="Transi\u00e7\u00e3o entre sec\u00e7\u00f5es",
                register="formal",
            ),
        ],
    ),
    PhrasebookCategory(
        id="complex_arguments_c1",
        level="C1",
        situation="Argumenta\u00e7\u00f5es complexas",
        icon="\U0001f9e0",
        phrases=[
            PhrasebookEntry(
                text="Reconhecendo embora a validade das suas observa\u00e7\u00f5es, discordaria.",
                context="Concess\u00e3o seguida de obje\u00e7\u00e3o",
                register="formal",
            ),
            PhrasebookEntry(
                text="\u00c9 ineg\u00e1vel que os dados mostram uma tend\u00eancia preocupante.",
                context="Afirmar um facto indiscut\u00edvel",
                register="formal",
            ),
            PhrasebookEntry(
                text="Contudo, h\u00e1 que considerar tamb\u00e9m o contexto em que estes eventos ocorreram.",
                context="Introduzir um contra-argumento",
                register="formal",
            ),
            PhrasebookEntry(
                text="A meu ver, o ponto crucial da quest\u00e3o reside no facto de...",
                context="Identificar o ponto central",
                register="formal",
            ),
            PhrasebookEntry(
                text="N\u00e3o se pode prescindir das implica\u00e7\u00f5es \u00e9ticas desta escolha.",
                context="Levantar quest\u00f5es \u00e9ticas",
                register="formal",
            ),
            PhrasebookEntry(
                text="Embora a proposta seja aliciante, comporta riscos n\u00e3o negligenci\u00e1veis.",
                context="Usar concessiva com conjuntivo",
                register="formal",
            ),
            PhrasebookEntry(
                text="Poder-se-ia objetar que os custos s\u00e3o excessivos.",
                context="Apresentar uma poss\u00edvel obje\u00e7\u00e3o",
                register="formal",
            ),
            PhrasebookEntry(
                text="Seria redutor limitarmo-nos a uma s\u00f3 interpreta\u00e7\u00e3o do fen\u00f3meno.",
                context="Criticar uma vis\u00e3o limitada",
                register="formal",
            ),
            PhrasebookEntry(
                text="A quest\u00e3o merece ser examinada de uma perspetiva mais ampla.",
                context="Pedir uma vis\u00e3o mais ampla",
                register="formal",
            ),
            PhrasebookEntry(
                text="\u00c9 uma tese fascinante, mas a meu ver n\u00e3o resiste a uma an\u00e1lise aprofundada.",
                context="Refutar com eleg\u00e2ncia",
                register="formal",
            ),
            PhrasebookEntry(
                text="Se \u00e9 verdade que X, da\u00ed n\u00e3o decorre necessariamente Y.",
                context="Desmontar uma fal\u00e1cia l\u00f3gica",
                register="formal",
            ),
            PhrasebookEntry(
                text="Considero que se trata de uma simplifica\u00e7\u00e3o excessiva.",
                context="Criticar uma simplifica\u00e7\u00e3o",
                register="formal",
            ),
        ],
    ),
    PhrasebookCategory(
        id="professional_networking_c1",
        level="C1",
        situation="Networking profissional",
        icon="\U0001f91d",
        phrases=[
            PhrasebookEntry(
                text="Muito prazer em conhec\u00ea-lo. Tenho acompanhado com interesse o seu trabalho.",
                context="Apresentar-se com um elogio profissional",
                register="formal",
            ),
            PhrasebookEntry(
                text="Teria muito gosto em aprofundar uma poss\u00edvel colabora\u00e7\u00e3o.",
                context="Propor uma colabora\u00e7\u00e3o",
                register="formal",
            ),
            PhrasebookEntry(
                text="Trabalho no setor h\u00e1 mais de dez anos.",
                context="Descrever a experi\u00eancia profissional",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Ocupo-me sobretudo de desenvolvimento internacional.",
                context="Descrever o pr\u00f3prio cargo",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Posso deixar-lhe o meu cart\u00e3o de visita?",
                context="Oferecer o cart\u00e3o de visita",
                register="formal",
            ),
            PhrasebookEntry(
                text="Seria um prazer manter o contacto.",
                context="Exprimir desejo de manter contacto",
                register="formal",
            ),
            PhrasebookEntry(
                text="A nossa empresa est\u00e1 interessada em explorar novas parcerias.",
                context="Aludir a oportunidades de neg\u00f3cio",
                register="formal",
            ),
            PhrasebookEntry(
                text="Apreciei muito a sua interven\u00e7\u00e3o no congresso.",
                context="Fazer um elogio espec\u00edfico",
                register="formal",
            ),
            PhrasebookEntry(
                text="Poder\u00edamos marcar uma reuni\u00e3o para discutir mais a fundo.",
                context="Propor um encontro futuro",
                register="formal",
            ),
            PhrasebookEntry(
                text="Se me permite, sugerir-lhe-ia que contactasse o nosso escrit\u00f3rio.",
                context="Dar uma sugest\u00e3o profissional",
                register="formal",
            ),
        ],
    ),
    PhrasebookCategory(
        id="conflict_resolution_c1",
        level="C1",
        situation="Resolu\u00e7\u00e3o de conflitos",
        icon="\U0001f54a\ufe0f",
        phrases=[
            PhrasebookEntry(
                text="Compreendo o seu ponto de vista, mas gostaria de esclarecer melhor a nossa posi\u00e7\u00e3o.",
                context="Mostrar compreens\u00e3o antes de discordar",
                register="formal",
            ),
            PhrasebookEntry(
                text="\u00c9 poss\u00edvel que tenha havido um mal-entendido.",
                context="Colocar a hip\u00f3tese de um equ\u00edvoco",
                register="neutral",
            ),
            PhrasebookEntry(
                text="O objetivo comum deveria ser encontrar uma solu\u00e7\u00e3o que satisfa\u00e7a ambos.",
                context="Recordar o objetivo comum",
                register="formal",
            ),
            PhrasebookEntry(
                text="Estou disposto/a a reconsiderar a minha posi\u00e7\u00e3o se...",
                context="Mostrar flexibilidade condicionada",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Considero que a transpar\u00eancia \u00e9 fundamental para resolver a quest\u00e3o.",
                context="Invocar transpar\u00eancia",
                register="formal",
            ),
            PhrasebookEntry(
                text="N\u00e3o era minha inten\u00e7\u00e3o faltar ao respeito.",
                context="Desculpar-se por uma ofensa involunt\u00e1ria",
                register="formal",
            ),
            PhrasebookEntry(
                text="Proponho darmos um passo atr\u00e1s e recome\u00e7armos pelos pontos em que concordamos.",
                context="Propor um reset da discuss\u00e3o",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Estou certo/a de que conseguiremos chegar a um entendimento.",
                context="Exprimir otimismo construtivo",
                register="formal",
            ),
            PhrasebookEntry(
                text="Pe\u00e7o desculpa se as minhas palavras foram mal interpretadas.",
                context="Desculpar-se por um mal-entendido",
                register="formal",
            ),
            PhrasebookEntry(
                text="Envolvamos um mediador se acharmos que não conseguimos resolver sozinhos.",
                context="Propor mediação externa",
                register="formal",
            ),
        ],
    ),
    PhrasebookCategory(
        id="academica_profissional_c1",
        level="C1",
        situation="Linguagem académica e profissional",
        icon="📊",
        phrases=[
            PhrasebookEntry(
                text="O presente artigo propõe-se analisar as implicações do fenómeno em três vertentes distintas.",
                context="Introduzir o objetivo de um artigo académico",
                register="formal",
                unit_ref="c1-unit-5",
            ),
            PhrasebookEntry(
                text="Cumpre desde já assinalar que a literatura existente sobre o tema é escassa.",
                context="Reconhecer limitações da bibliografia disponível",
                register="formal",
                unit_ref="c1-unit-5",
            ),
            PhrasebookEntry(
                text="Por correio eletrónico, venho submeter à vossa consideração a proposta em anexo.",
                context="Abertura de correio eletrónico profissional com anexo",
                register="formal",
                unit_ref="c1-unit-5",
            ),
            PhrasebookEntry(
                text="Sem prejuízo de uma análise mais aprofundada, adianto desde já as principais conclusões.",
                context="Resumir conclusões preliminares em contexto profissional",
                register="formal",
                unit_ref="c1-unit-5",
            ),
            PhrasebookEntry(
                text="A presente comunicação destina-se a um público especializado na matéria.",
                context="Especificar o público-alvo de uma apresentação",
                register="formal",
                unit_ref="c1-unit-5",
            ),
            PhrasebookEntry(
                text="Resta-me agradecer a atenção dispensada e ficar ao dispor para quaisquer esclarecimentos adicionais.",
                context="Fecho de correio eletrónico profissional",
                register="formal",
                unit_ref="c1-unit-5",
            ),
            PhrasebookEntry(
                text="A fundamentação teórica que subjaz a esta investigação assenta em três eixos principais.",
                context="Apresentar o quadro teórico de uma investigação",
                register="formal",
                unit_ref="c1-unit-5",
            ),
            PhrasebookEntry(
                text="Solicito a Vossa Excelência que se digne apreciar o requerimento junto.",
                context="Fórmula de requerimento formal à administração",
                register="formal",
                unit_ref="c1-unit-5",
            ),
        ],
    ),
]
