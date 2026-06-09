"""Portuguese grammar topics — B2."""

from app.data._types import GrammarExample, GrammarMistake, GrammarTopic

B2_GRAMMAR_TOPICS: list[GrammarTopic] = [
    GrammarTopic(
        slug="imperfeito-conjuntivo",
        title="Imperfeito do conjuntivo",
        level="B2",
        category="Conjuntivo",
        summary="Formação e uso do imperfeito do conjuntivo.",
        explanation="Da 3a pl. do pretérito perfeito: falaram -> falasse, falasses... Usos: condicoes hipoteticas, desejos, apos embora/como se.",
        rules=[
            "Da 3a pl. do pret. perfeito.",
            "Com se, embora, como se.",
        ],
        examples=[
            GrammarExample(
                text="Se eu tivesse mais tempo, viajava mais.",
                translation="If I had more time, I would travel more.",
            ),
            GrammarExample(
                text="Embora chovesse, fomos a praia.",
                translation="Although it was raining, we went to the beach.",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Se eu tinha tempo, ia.",
                correct="Se eu tivesse tempo, ia.",
                note="Condicao hipotetica: imperfeito conjuntivo.",
            ),
        ],
        related=["presente-conjuntivo", "se-imperfeito-subjuntivo", "mais-que-perfeito-conjuntivo"],
    ),
    GrammarTopic(
        slug="mais-que-perfeito-conjuntivo",
        title="Mais-que-perfeito do conjuntivo",
        level="B2",
        category="Conjuntivo",
        summary="Expressar condicoes passadas nao realizadas.",
        explanation="Forma composta: tivesse + participio passado. Se tivesse estudado, teria passado.",
        rules=[
            "Forma composta: tivesse + participio.",
            "Condicao NAO realizada no passado.",
        ],
        examples=[
            GrammarExample(
                text="Se tivesse estudado, teria passado.",
                translation="If I had studied, I would have passed.",
            ),
            GrammarExample(
                text="Se ela tivesse vindo, teria sido melhor.",
                translation="If she had come, it would have been better.",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Se eu tinha estudado, passava.",
                correct="Se eu tivesse estudado, passava.",
                note="Condicao passada: tivesse + participio.",
            ),
        ],
        related=["imperfeito-conjuntivo", "condicional-composto"],
    ),
    GrammarTopic(
        slug="concordancia-temporal",
        title="Concordancia temporal",
        level="B2",
        category="Tempos verbais",
        summary="Regras de correspondencia entre tempos verbais.",
        explanation="Presente/futuro -> presente conjuntivo. Preterito/condicional -> imperfeito conjuntivo.",
        rules=[
            "Presente/futuro -> presente conj.",
            "Preterito/condicional -> imperfeito conj.",
        ],
        examples=[
            GrammarExample(
                text="Queria que viesses.",
                translation="I wanted you to come.",
                note="preterito -> imperfeito conj.",
            ),
            GrammarExample(
                text="Espero que chegues.",
                translation="I hope you arrive.",
                note="presente -> presente conj.",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Queria que venhas.",
                correct="Queria que viesses.",
                note="Preterito -> imperfeito conjuntivo.",
            ),
        ],
        related=["presente-conjuntivo", "imperfeito-conjuntivo", "futuro-do-conjuntivo"],
    ),
    GrammarTopic(
        slug="perifrases-aspetuais",
        title="Perifrases aspetuais",
        level="B2",
        category="Verbos",
        summary="Construcoes verbais que expressam aspetos da acao.",
        explanation="Comecar a + inf., estar a + inf., continuar a + inf., acabar de + inf., voltar a + inf.",
        rules=[
            "Comecar a = inicio.",
            "Estar a = curso (EP).",
            "Acabar de = recem-concluida.",
            "Voltar a = repeticao.",
        ],
        examples=[
            GrammarExample(
                text="Comecei a aprender portugues ha um ano.",
                translation="I started learning Portuguese a year ago.",
            ),
            GrammarExample(text="Acabei de comer.", translation="I have just finished eating."),
        ],
        common_mistakes=[],
        related=["estar-a-infinitivo", "andar-a-estar-a", "costumava"],
    ),
    GrammarTopic(
        slug="perifrases-modais",
        title="Perifrases modais",
        level="B2",
        category="Verbos",
        summary="Construcoes verbais para obrigacao, possibilidade e intencao.",
        explanation="Ter de/que + inf. (obrigacao), precisar de + inf. (necessidade), poder + inf. (possibilidade), haver de + inf. (determinacao, tipico EP).",
        rules=[
            "Ter de/que = obrigacao.",
            "Precisar de = necessidade.",
            "Haver de = determinacao (EP).",
        ],
        examples=[
            GrammarExample(
                text="Tenho de terminar este relatorio.",
                translation="I have to finish this report.",
            ),
            GrammarExample(
                text="Hei de visitar os Acores um dia!",
                translation="I will visit the Azores one day!",
                note="determinacao EP",
            ),
        ],
        common_mistakes=[],
        related=["perifrases-aspetuais", "querer-poder", "andar-a-estar-a"],
    ),
    GrammarTopic(
        slug="andar-a-estar-a",
        title="Andar a vs estar a",
        level="B2",
        category="Verbos",
        summary="Diferenca entre andar a + infinitivo e estar a + infinitivo.",
        explanation="Estar a = agora. Andar a = repetido/persistente ao longo do tempo.",
        rules=[
            "Estar a = agora.",
            "Andar a = repetido/persistente.",
        ],
        examples=[
            GrammarExample(
                text="Estou a ler um livro.", translation="I am reading a book.", note="agora"
            ),
            GrammarExample(
                text="Ando a ler um livro.", translation="I have been reading a book.", note="dias"
            ),
            GrammarExample(
                text="Ela anda a trabalhar demais.", translation="She has been working too much."
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Ando a comer agora.",
                correct="Estou a comer agora.",
                note="Acao no momento: estar a.",
            ),
        ],
        related=["estar-a-infinitivo", "perifrases-aspetuais"],
    ),
    GrammarTopic(
        slug="infinitivo-pessoal",
        title="Infinitivo pessoal",
        level="B2",
        category="Verbos",
        summary="O infinitivo pessoal.",
        explanation="Infinitivo conjugado: falar, falares, falar, falarmos, falarem. Sujeito diferente.",
        rules=[
            "Infinitivo com terminacoes.",
            "Sujeito diferente da oracao principal.",
        ],
        examples=[
            GrammarExample(
                text="E importante estudares mais.",
                translation="It is important for you to study more.",
            ),
            GrammarExample(
                text="Para chegarmos a tempo, temos de sair.",
                translation="In order for us to arrive on time.",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="E importante tu estudar.",
                correct="E importante tu estudares.",
                note="Sujeito diferente -> infinitivo pessoal.",
            ),
        ],
        related=["presente-conjuntivo", "colocacao-pronominal"],
    ),
    GrammarTopic(
        slug="conectores-avancados",
        title="Conectores avancados",
        level="B2",
        category="Oracoes",
        summary="Conectores sofisticados para argumentacao.",
        explanation="Desde que/a menos que/caso + conj. Para que/a fim de que + conj. Ainda que/mesmo que + conj.",
        rules=[
            "Desde que, a menos que + conj.",
            "Para que, a fim de que + conj.",
            "Ainda que, mesmo que + conj.",
        ],
        examples=[
            GrammarExample(
                text="Vou a festa desde que tu tambem vas.",
                translation="I will go as long as you go.",
            ),
            GrammarExample(
                text="Sairei mais cedo, a menos que haja reuniao.",
                translation="I will leave earlier, unless there is a meeting.",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Desde que tu tambem vais.",
                correct="Desde que tu tambem vas.",
                note="Desde que condicional + conjuntivo.",
            ),
        ],
        related=["conectores-argumentativos", "coesao-textual"],
    ),
    GrammarTopic(
        slug="coesao-textual",
        title="Coesao textual",
        level="B2",
        category="Avancado",
        summary="Mecanismos para textos coesos.",
        explanation="Referencia, substituicao, elipse, conjuncao, coesao lexical.",
        rules=[
            "Pronomes, sinonimos, conectores.",
            "Elipse quando possivel.",
        ],
        examples=[
            GrammarExample(
                text="O Joao comprou um carro. Ele esta contente com o veiculo.",
                translation="Joao bought a car. He is happy with the vehicle.",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="O Joao comprou um carro. O Joao esta contente.",
                correct="O Joao comprou um carro. Ele esta contente.",
                note="Evitar repeticao excessiva.",
            ),
        ],
        related=["conectores-avancados", "conectores-argumentativos"],
    ),
    GrammarTopic(
        slug="registo-formal",
        title="Registo formal",
        level="B2",
        category="Avancado",
        summary="Caracteristicas do registo formal em EP.",
        explanation="Vocabulario cuidado, passiva, mesoclise, condicional de cortesia, tratamento o senhor/a senhora.",
        rules=[
            "Vocabulario cuidado.",
            "Passiva, mesoclise.",
            "Tratamento formal.",
        ],
        examples=[
            GrammarExample(
                text="Poder-me-ia informar sobre o horario?",
                translation="Could you inform me about the schedule?",
                note="cortesia + mesoclise",
            ),
            GrammarExample(
                text="O senhor deseja mais alguma coisa?",
                translation="Would you like anything else, sir?",
            ),
        ],
        common_mistakes=[],
        related=["expressoes-idiomaticas", "expressoes-coloquiais", "linguagem-jornalistica"],
    ),
    GrammarTopic(
        slug="expressoes-idiomaticas",
        title="Expressoes idiomaticas",
        level="B2",
        category="Avancado",
        summary="Expressoes idiomaticas portuguesas.",
        explanation="Andar com a pulga atras da orelha, dar o braco a torcer, estar com os azeites, custar os olhos da cara.",
        rules=[
            "Expressoes fixas.",
            "Sentido literal diferente do figurado.",
        ],
        examples=[
            GrammarExample(
                text="Ando com a pulga atras da orelha.", translation="I have been suspicious."
            ),
            GrammarExample(
                text="Ela esta com os azeites hoje.", translation="She is in a bad mood today."
            ),
        ],
        common_mistakes=[],
        related=["expressoes-coloquiais", "proverbios", "registo-formal"],
    ),
    GrammarTopic(
        slug="expressoes-coloquiais",
        title="Expressoes coloquiais",
        level="B2",
        category="Avancado",
        summary="Linguagem coloquial e giria do portugues europeu.",
        explanation="Bue/altamente/fixe, ta-se bem, bora, ya, pa, giro/gira, desenrascar.",
        rules=[
            "Coloquialismos informais.",
            "Variacao regional.",
        ],
        examples=[
            GrammarExample(text="Que filme tao fixe!", translation="What a cool movie!"),
            GrammarExample(text="Bora tomar um cafe?", translation="Let us go grab a coffee?"),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Que filme fixe! (registo formal)",
                correct="Que filme interessante!",
                note="Evitar fixe em registo formal.",
            ),
        ],
        related=["expressoes-idiomaticas", "proverbios", "registo-formal"],
    ),
    GrammarTopic(
        slug="proverbios",
        title="Proverbios portugueses",
        level="B2",
        category="Avancado",
        summary="Proverbios tradicionais portugueses.",
        explanation="Agua mole em pedra dura..., Quem ve caras nao ve coracoes, Mais vale um passaro na mao..., Depois da tempestade vem a bonanca.",
        rules=[
            "Proverbios fixos.",
            "Sabedoria popular.",
        ],
        examples=[
            GrammarExample(
                text="Agua mole em pedra dura, tanto bate ate que fura.",
                translation="Constant dripping wears away the stone.",
            ),
            GrammarExample(
                text="Mais vale um passaro na mao do que dois a voar.",
                translation="A bird in the hand is worth two in the bush.",
            ),
        ],
        common_mistakes=[],
        related=["expressoes-idiomaticas", "expressoes-coloquiais"],
    ),
    GrammarTopic(
        slug="estrutura-argumentativa",
        title="Estrutura argumentativa",
        level="B2",
        category="Avancado",
        summary="Construir textos argumentativos.",
        explanation="Introducao (tese), desenvolvimento (argumentos), conclusao (retoma).",
        rules=[
            "Introducao, desenvolvimento, conclusao.",
            "Conectores especificos.",
        ],
        examples=[
            GrammarExample(
                text="Em primeiro lugar, a educacao e fundamental.",
                translation="Firstly, education is fundamental.",
            ),
            GrammarExample(
                text="Concluindo, os beneficios superam os riscos.",
                translation="In conclusion, the benefits outweigh the risks.",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Eu acho que... (texto formal)",
                correct="Considera-se que...",
                note="Evitar 1a pessoa em textos argumentativos.",
            ),
        ],
        related=["contra-argumentacao", "conectores-argumentativos", "coesao-textual"],
    ),
    GrammarTopic(
        slug="contra-argumentacao",
        title="Contra-Argumentacao",
        level="B2",
        category="Avancado",
        summary="Tecnicas para refutar argumentos.",
        explanation="Concessao + refutacao, questionamento, evidencia contraria.",
        rules=[
            "Concessao + refutacao.",
            "Questionamento.",
            "Evidencia.",
        ],
        examples=[
            GrammarExample(
                text="Embora alguns defendam o contrario, os estudos mostram que...",
                translation="Although some argue the opposite, studies show that...",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Isso e mentira. (agressivo)",
                correct="Essa perspetiva parece ignorar alguns factos.",
                note="Contra-argumentacao respeitosa.",
            ),
        ],
        related=["estrutura-argumentativa", "matizadores", "conectores-argumentativos"],
    ),
    GrammarTopic(
        slug="matizadores",
        title="Matizadores",
        level="B2",
        category="Avancado",
        summary="Palavras que suavizam ou relativizam afirmacoes.",
        explanation="Provavelmente, talvez, de certa forma, ate certo ponto, um pouco, apenas.",
        rules=[
            "Suavizar afirmacoes.",
            "Evitar categoricas.",
        ],
        examples=[
            GrammarExample(
                text="Provavelmente, esta e a melhor abordagem.",
                translation="This is probably the best approach.",
            ),
            GrammarExample(text="De certa forma, concordo.", translation="In a way, I agree."),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Possivelmente talvez seja melhor.",
                correct="Provavelmente e melhor.",
                note="Evitar acumular matizadores.",
            ),
        ],
        related=["estrutura-argumentativa", "contra-argumentacao"],
    ),
    GrammarTopic(
        slug="tempos-narrativos",
        title="Tempos narrativos",
        level="B2",
        category="Tempos verbais",
        summary="Articulacao dos tempos verbais na narrativa.",
        explanation="Imperfeito (cenario), perfeito (acao principal), mais-que-perfeito (flashback).",
        rules=[
            "Imperfeito = cenario.",
            "Perfeito = acao.",
            "MQP = flashback.",
        ],
        examples=[
            GrammarExample(
                text="Era uma noite de tempestade. De repente, a porta abriu-se.",
                translation="It was a stormy night. Suddenly, the door opened.",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="De repente, estava a chover.",
                correct="De repente, comecou a chover.",
                note="De repente pede acao pontual (perfeito).",
            ),
        ],
        related=["preterito-imperfeito", "perfeito-vs-imperfeito", "descricao-literaria"],
    ),
    GrammarTopic(
        slug="descricao-literaria",
        title="Descricao literaria",
        level="B2",
        category="Avancado",
        summary="Recursos para descricoes vividas.",
        explanation="Adjetivacao rica, sensacoes, metaforas, personificacao, imperfeito descritivo.",
        rules=[
            "Adjetivos sensoriais.",
            "Imperfeito descritivo.",
            "Metaforas, personificacao.",
        ],
        examples=[
            GrammarExample(
                text="O sol punha-se no horizonte, tingindo o ceu de tons alaranjados.",
                translation="The sun was setting, dyeing the sky orange.",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="A casa era bonita. (pobre)",
                correct="A casa exibia uma beleza melancolica.",
                note="Vocabulario rico.",
            ),
        ],
        related=["tempos-narrativos", "recursos-estilisticos", "figuras-literarias"],
    ),
    GrammarTopic(
        slug="preterito-mais-que-perfeito",
        title="Preterito mais-que-perfeito composto",
        level="B2",
        category="Tempos verbais",
        summary="Revisao do MQP composto.",
        explanation="Ter (imperfeito) + participio. Muito mais comum que a forma simples.",
        rules=[
            "Ter (imperfeito) + participio.",
            "Mais comum que a forma simples.",
        ],
        examples=[
            GrammarExample(
                text="Quando cheguei, ela ja tinha saido.",
                translation="When I arrived, she had already left.",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Quando cheguei, ela ja tinha saiu.",
                correct="Quando cheguei, ela ja tinha saido.",
                note="Ter + participio (saido).",
            ),
        ],
        related=["mais-que-perfeito", "preterito-imperfeito", "discurso-indireto-passado"],
    ),
    GrammarTopic(
        slug="linguagem-jornalistica",
        title="Linguagem jornalistica",
        level="B2",
        category="Avancado",
        summary="Caracteristicas da linguagem jornalistica em EP.",
        explanation="Titulo conciso, lead 5W, objetividade (3a pessoa), passiva, nominalizacoes, presente historico.",
        rules=[
            "Titulo conciso.",
            "Lead 5W.",
            "3a pessoa, passiva.",
            "Presente historico.",
        ],
        examples=[
            GrammarExample(
                text="O Governo anunciou ontem um novo pacote de medidas.",
                translation="The Government announced a new measures package yesterday.",
                note="lead",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Eu entrevistei o presidente.",
                correct="O presidente afirmou que...",
                note="Jornalismo evita 1a pessoa.",
            ),
        ],
        related=["titulos", "discurso-reportado", "registo-formal"],
    ),
    GrammarTopic(
        slug="titulos",
        title="Titulos jornalisticos",
        level="B2",
        category="Avancado",
        summary="Estrutura e estilo dos titulos na imprensa portuguesa.",
        explanation="Concisao, omissao de artigos, presente historico, virgula em vez de conjuncao.",
        rules=[
            "Omitir artigos.",
            "Presente historico.",
            "Virgula = e/mas.",
        ],
        examples=[
            GrammarExample(
                text="Incendio devasta milhares de hectares no Algarve.",
                translation="Fire devastates thousands of hectares in the Algarve.",
            ),
            GrammarExample(
                text="Benfica vence, Porto empata.", translation="Benfica wins, Porto draws."
            ),
        ],
        common_mistakes=[],
        related=["linguagem-jornalistica", "discurso-reportado"],
    ),
    GrammarTopic(
        slug="discurso-reportado",
        title="Discurso reportado",
        level="B2",
        category="Discurso indireto",
        summary="Tecnicas avancadas de citacao e reportagem.",
        explanation="Citacao direta, indireta, mista. Verbos introdutores variados: afirmar, salientar, admitir, garantir, anunciar.",
        rules=[
            "Variar verbos introdutores.",
            "Direta, indireta, mista.",
        ],
        examples=[
            GrammarExample(
                text="O ministro salientou que os resultados sao animadores.",
                translation="The minister stressed that the results are encouraging.",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Ele disse que estou cansado.",
                correct="Ele disse que estava cansado.",
                note="Citacao indireta adapta tempos.",
            ),
        ],
        related=["discurso-indireto", "discurso-indireto-passado", "linguagem-jornalistica"],
    ),
]
