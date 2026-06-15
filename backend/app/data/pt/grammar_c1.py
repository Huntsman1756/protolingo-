"""Portuguese grammar topics — C1."""

from app.data._types import GrammarExample, GrammarMistake, GrammarTopic

C1_GRAMMAR_TOPICS: list[GrammarTopic] = [
    GrammarTopic(
        slug="subjuntivo-concessivo",
        title="Conjuntivo em oracoes concessivas",
        level="C1",
        category="Conjuntivo",
        summary="Uso avancado do conjuntivo em oracoes concessivas.",
        explanation="Por mais que, por muito que, ainda que, mesmo que, nem que + conjuntivo.",
        rules=[
            "Por mais/muito que + conjuntivo.",
            "Ainda que/mesmo que + conjuntivo.",
        ],
        examples=[
            GrammarExample(
                text="Por mais que tentes, nem sempre vais conseguir.",
                translation=None,
            ),
            GrammarExample(
                text="Mesmo que me pagassem, nao faria esse trabalho.",
                translation=None,
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Por mais que tentas.",
                correct="Por mais que tentes.",
                note="Por mais que exige conjuntivo.",
            ),
        ],
        related=["conectores-avancados", "imperfeito-conjuntivo", "contra-argumentacao"],
    ),
    GrammarTopic(
        slug="subjuntivo-final",
        title="Conjuntivo em oracoes finais",
        level="C1",
        category="Conjuntivo",
        summary="Conjuntivo apos conectores finais.",
        explanation="Para que/a fim de que/de modo a que + conjuntivo (sujeito diferente). Mesmo sujeito: para + infinitivo.",
        rules=[
            "Para que + conj. (sujeito diferente).",
            "Mesmo sujeito: para + inf.",
        ],
        examples=[
            GrammarExample(
                text="Enviei o email para que todos fiquem informados.",
                translation=None,
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Estudo para que eu passe.",
                correct="Estudo para passar.",
                note="Mesmo sujeito: para + inf.",
            ),
        ],
        related=["presente-conjuntivo", "conectores-avancados", "infinitivo-pessoal"],
    ),
    GrammarTopic(
        slug="subjuntivo-relativo",
        title="Conjuntivo em oracoes relativas",
        level="C1",
        category="Conjuntivo",
        summary="Conjuntivo com antecedente indeterminado.",
        explanation="Conjuntivo para antecedente desconhecido. Indicativo para especifico. Ha quem / Nao ha quem + conjuntivo.",
        rules=[
            "Conjuntivo: hipotetico.",
            "Indicativo: especifico.",
        ],
        examples=[
            GrammarExample(
                text="Procuro alguem que fale chines.",
                translation=None,
                note="indeterminado",
            ),
            GrammarExample(
                text="Conheco alguem que fala chines.",
                translation=None,
                note="especifico",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Procuro alguem que fala chines.",
                correct="Procuro alguem que fale chines.",
                note="Indeterminado -> conjuntivo.",
            ),
        ],
        related=["presente-conjuntivo", "que-relativo"],
    ),
    GrammarTopic(
        slug="passiva-reflexa",
        title="Voz passiva reflexa",
        level="C1",
        category="Voz passiva",
        summary="Usos avancados da voz passiva com o pronome se.",
        explanation="Aprecia-se, comenta-se, realizar-se-a (mesoclise), observa-se. Uso academico e jornalistico.",
        rules=[
            "Aprecia-se/comenta-se = passiva reflexa.",
            "Realizar-se-a = sera realizado.",
        ],
        examples=[
            GrammarExample(
                text="Comenta-se que o acordo sera assinado amanha.",
                translation=None,
            ),
            GrammarExample(
                text="Observa-se uma melhoria significativa.",
                translation=None,
            ),
        ],
        common_mistakes=[],
        related=["voz-passiva", "se-impessoal", "se-passivo"],
    ),
    GrammarTopic(
        slug="nominalizacao",
        title="Nominalizacao",
        level="C1",
        category="Avancado",
        summary="Transformar verbos e adjetivos em substantivos.",
        explanation="Implementar -> implementacao. Melhorar -> melhoria. Construir -> construcao. Evitar cadeias.",
        rules=[
            "Verbo -> substantivo.",
            "Evitar cadeias de nominalizacoes.",
        ],
        examples=[
            GrammarExample(
                text="A implementacao do programa foi bem-sucedida.",
                translation=None,
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="A realizacao da implementacao da verificacao.",
                correct="A verificacao dos dados.",
                note="Evitar cadeias.",
            ),
        ],
        related=["impessoalidade", "registo-formal", "coesao-textual"],
    ),
    GrammarTopic(
        slug="impessoalidade",
        title="Impessoalidade",
        level="C1",
        category="Avancado",
        summary="Tecnicas de impessoalidade no discurso formal.",
        explanation="Voz passiva, se impessoal, nominalizacao, expressoes impessoais (Convem salientar que...).",
        rules=[
            "Voz passiva, se impessoal.",
            "Nominalizacoes.",
            "Convem/importa + infinitivo.",
        ],
        examples=[
            GrammarExample(
                text="Foi observado um aumento significativo.",
                translation=None,
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Eu observei um aumento. (academico)",
                correct="Foi observado um aumento.",
                note="Evitar 1a pessoa.",
            ),
        ],
        related=["nominalizacao", "voz-passiva", "registo-formal"],
    ),
    GrammarTopic(
        slug="campos-semanticos",
        title="Campos semanticos",
        level="C1",
        category="Avancado",
        summary="Agrupamentos lexicais por dominios.",
        explanation="Exemplo: justica -> tribunal, juiz, advogado, reu, sentenca, julgar, condenar, absolver.",
        rules=[
            "Agrupar vocabulario por areas.",
        ],
        examples=[
            GrammarExample(
                text="O juiz condenou o reu com base nas provas. (campo: justica)",
                translation=None,
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Usar lexico de campo errado.",
                correct="Verificar o campo semantico adequado.",
                note="",
            ),
        ],
        related=["derivacao", "precisao-lexica"],
    ),
    GrammarTopic(
        slug="derivacao",
        title="Derivacao",
        level="C1",
        category="Avancado",
        summary="Mecanismos de formacao de palavras.",
        explanation="Prefixos: re-, in-/im-, des-. Sufixos: -cao, -mento, -dade, -vel, -izar.",
        rules=[
            "Prefixos e sufixos formam palavras.",
        ],
        examples=[
            GrammarExample(
                text="feliz -> infeliz -> felicidade", translation=None
            ),
            GrammarExample(
                text="construir -> construcao -> reconstrutivo",
                translation=None,
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Infelicidade: verificar se e atestada.",
                correct="Infelicidade: ver em dicionario.",
                note="Nem todas as derivacoes sao validas.",
            ),
        ],
        related=["campos-semanticos", "precisao-lexica"],
    ),
    GrammarTopic(
        slug="precisao-lexica",
        title="Precisao lexica",
        level="C1",
        category="Avancado",
        summary="Escolher a palavra exata.",
        explanation="Dizer vs falar, Ver vs olhar, Ouvir vs escutar, Saber vs conhecer.",
        rules=[
            "Dizer (informacao) vs falar (comunicacao).",
            "Saber (facto) vs conhecer (familiaridade).",
        ],
        examples=[
            GrammarExample(
                text="Sei a resposta. / Conheco bem essa pessoa.",
                translation=None,
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Conheco a resposta.",
                correct="Sei a resposta.",
                note="Conhecer = familiaridade.",
            ),
        ],
        related=["derivacao", "campos-semanticos", "falsos-amigos"],
    ),
    GrammarTopic(
        slug="ironia",
        title="Ironia",
        level="C1",
        category="Avancado",
        summary="A ironia como recurso retorico.",
        explanation="Dizer o contrario do que se pensa. Traco cultural portugues.",
        rules=[
            "Ironia = dizer o contrario.",
            "Traco cultural portugues.",
        ],
        examples=[
            GrammarExample(
                text="Pois sim, acredito muito nisso.",
                translation=None,
                note="ironico",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Interpretar ironia literalmente.",
                correct="Prestar atencao a entoacao e contexto.",
                note="",
            ),
        ],
        related=["humor-portugues", "duplo-sentido", "recursos-retoricos"],
    ),
    GrammarTopic(
        slug="humor-portugues",
        title="Humor a portuguesa",
        level="C1",
        category="Avancado",
        summary="Caracteristicas do humor portugues.",
        explanation="Autoironia, sarcasmo afavel, resignacao comica, subentendido, desenrascanco.",
        rules=[
            "Autoironia, sarcasmo.",
            "Resignacao comica.",
            "Desenrascanco.",
        ],
        examples=[
            GrammarExample(
                text="Como estas? -- Vai-se andando.", translation=None
            ),
            GrammarExample(
                text="Isto so acontece em Portugal.", translation=None
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Confundir sarcasmo portugues com grosseria.",
                correct="O sarcasmo portugues e frequentemente afavel.",
                note="",
            ),
        ],
        related=["ironia", "duplo-sentido", "expressoes-idiomaticas"],
    ),
    GrammarTopic(
        slug="duplo-sentido",
        title="Duplo sentido",
        level="C1",
        category="Avancado",
        summary="Jogos de palavras e ambiguidade.",
        explanation="Ambiguidade lexical e sintatica. Usado em humor, publicidade e literatura.",
        rules=[
            "Ambiguidade lexical e sintatica.",
        ],
        examples=[
            GrammarExample(
                text="Ele e um genio. (pode ser ironico)",
                translation=None,
                note="duplo sentido",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Duplo sentido nao intencional em textos formais.",
                correct="Rever para evitar ambiguidades.",
                note="",
            ),
        ],
        related=["ironia", "humor-portugues", "recursos-retoricos"],
    ),
    GrammarTopic(
        slug="recursos-retoricos",
        title="Recursos retoricos",
        level="C1",
        category="Avancado",
        summary="Catalogo de figuras de retorica.",
        explanation="Pergunta retorica, anafora, gradacao, paradoxo, antitese.",
        rules=[
            "Pergunta retorica, anafora.",
            "Paradoxo, antitese.",
        ],
        examples=[
            GrammarExample(
                text="Quem nunca errou? (pergunta retorica)",
                translation=None,
            ),
            GrammarExample(
                text="O silencio ensurdecedor da noite. (paradoxo)",
                translation=None,
            ),
        ],
        common_mistakes=[
            GrammarMistake(wrong="Uso excessivo.", correct="Dosear as figuras.", note=""),
        ],
        related=["persuasao", "figuras-literarias"],
    ),
    GrammarTopic(
        slug="persuasao",
        title="Persuasao",
        level="C1",
        category="Avancado",
        summary="Tecnicas de persuasao no discurso.",
        explanation="Ethos (credibilidade), Pathos (emocao), Logos (logica). Adaptar ao publico.",
        rules=[
            "Ethos, Pathos, Logos.",
        ],
        examples=[
            GrammarExample(
                text="Enquanto profissional com 20 anos de experiencia, recomendo... (ethos)",
                translation=None,
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Apelos emocionais sem fundamentacao.",
                correct="Combinar pathos com logos.",
                note="",
            ),
        ],
        related=["recursos-retoricos", "estrutura-argumentativa"],
    ),
    GrammarTopic(
        slug="figuras-literarias",
        title="Figuras literarias",
        level="C1",
        category="Avancado",
        summary="Metafora, metonimia, sine doque e outras figuras.",
        explanation="Metafora, comparacao, metonimia, sine doque, personificacao, hiperbole.",
        rules=[
            "Metafora, metonimia.",
            "Personificacao, hiperbole.",
        ],
        examples=[
            GrammarExample(text="O tempo e dinheiro. (metafora)", translation=None),
            GrammarExample(
                text="Portugal venceu o jogo. (metonimia)", translation=None
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Confundir metafora com comparacao.",
                correct="Metafora = identificacao. Comparacao = como.",
                note="",
            ),
        ],
        related=["descricao-literaria", "recursos-retoricos", "estilo-literario"],
    ),
    GrammarTopic(
        slug="portugues-brasileiro",
        title="Portugues brasileiro vs europeu",
        level="C1",
        category="Avancado",
        summary="Principais diferencas entre PB e PE.",
        explanation="PB: gerundio, proclise. PE: a + infinitivo, enclise. Lexico diferente.",
        rules=[
            "PB: gerundio. PE: a + inf.",
            "PB: proclise. PE: enclise.",
        ],
        examples=[
            GrammarExample(
                text="PE: pequeno-almoco. / PB: cafe da manha.", translation=None
            ),
            GrammarExample(
                text="PE: Da-me um cafe. / PB: Me da um cafe.",
                translation=None,
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Misturar PE e PB.",
                correct="Escolher uma variante e ser consistente.",
                note="",
            ),
        ],
        related=["portugues-europeu", "diferencas-regionais"],
    ),
    GrammarTopic(
        slug="portugues-europeu",
        title="Particularidades do portugues europeu",
        level="C1",
        category="Avancado",
        summary="Caracteristicas distintivas do PE.",
        explanation="Estar a + inf., enclise/mesoclise, artigo + possessivo, artigo + nome proprio, tu + 2a pessoa, infinitivo pessoal.",
        rules=[
            "Estar a + inf.",
            "Enclise e mesoclise.",
            "Artigo + possessivo + nome proprio.",
        ],
        examples=[
            GrammarExample(
                text="O Pedro esta a estudar para o exame.",
                translation=None,
            ),
            GrammarExample(
                text="Dar-te-ei o livro amanha.",
                translation=None,
                note="mesoclise",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Me apetece sair.",
                correct="Apetece-me sair.",
                note="EP nao comeca frase com pronome atono.",
            ),
        ],
        related=["portugues-brasileiro", "diferencas-regionais", "estar-a-infinitivo"],
    ),
    GrammarTopic(
        slug="diferencas-regionais",
        title="Diferencas regionais em portugal",
        level="C1",
        category="Avancado",
        summary="Variacao dialetal dentro de Portugal.",
        explanation="Norte: vos residual, fino, cimbalino. Sul: gerundio. Ilhas: lexico proprio. Padrao: Coimbra-Lisboa.",
        rules=[
            "Norte: lexico proprio.",
            "Sul: gerundio.",
            "Padrao: Coimbra-Lisboa.",
        ],
        examples=[
            GrammarExample(
                text="Quereis um fino? (Porto)",
                translation=None,
                note="norte",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Assumir que todo o pais fala igual.",
                correct="Respeitar a variacao regional.",
                note="",
            ),
        ],
        related=["portugues-europeu", "portugues-brasileiro"],
    ),
    GrammarTopic(
        slug="sintese-textual",
        title="Sintese textual",
        level="C1",
        category="Avancado",
        summary="Tecnicas para resumir textos.",
        explanation="Identificar ideia principal, eliminar redundancias, nominalizar, parafrasear. Sintese = 20-30% do original.",
        rules=[
            "Ideia principal.",
            "Eliminar redundancias.",
            "20-30% do original.",
        ],
        examples=[
            GrammarExample(
                text="Em suma, o autor defende que a globalizacao trouxe mais beneficios.",
                translation=None,
            ),
        ],
        common_mistakes=[
            GrammarMistake(wrong="Sintese demasiado longa.", correct="Sintese concisa.", note=""),
        ],
        related=["coesao-textual", "critica-construtiva", "reformulacao"],
    ),
    GrammarTopic(
        slug="critica-construtiva",
        title="Critica construtiva",
        level="C1",
        category="Avancado",
        summary="Formular criticas de forma elegante.",
        explanation="Comecar pelo positivo, usar condicional, perguntar em vez de afirmar, focar na solucao.",
        rules=[
            "Positivo primeiro.",
            "Condicional: seria, poderia.",
        ],
        examples=[
            GrammarExample(
                text="O relatorio esta muito completo. Talvez fosse util incluir mais dados.",
                translation=None,
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Isto esta errado.",
                correct="Esta seccao poderia beneficiar de uma revisao.",
                note="",
            ),
        ],
        related=["reformulacao", "matizadores", "registo-formal"],
    ),
    GrammarTopic(
        slug="reformulacao",
        title="Reformulacao",
        level="C1",
        category="Avancado",
        summary="Tecnicas para reformular ideias.",
        explanation="Isto e, ou seja, dito de outra forma. Parafrasear, mudar registo, alterar voz.",
        rules=[
            "Isto e / ou seja.",
            "Adaptar registo.",
        ],
        examples=[
            GrammarExample(
                text="O evento foi cancelado. Ou seja, nao havera concerto.",
                translation=None,
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Ou seja, tipo, quer dizer...",
                correct="Ou seja,...",
                note="Um reformulador e suficiente.",
            ),
        ],
        related=["sintese-textual", "critica-construtiva", "registo-formal"],
    ),
]
