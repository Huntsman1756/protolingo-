"""Portuguese grammar topics — C2."""

from app.data._types import GrammarExample, GrammarMistake, GrammarTopic

C2_GRAMMAR_TOPICS: list[GrammarTopic] = [
    GrammarTopic(
        slug="revisao-conjuntivo",
        title="Revisao geral do conjuntivo",
        level="C2",
        category="Conjuntivo",
        summary="Dominio completo do conjuntivo.",
        explanation="Presente (que, talvez), Imperfeito (se), Futuro (quando), MQP Composto (se + tivesse + part.).",
        rules=[
            "Presente, Imperfeito, Futuro, MQP Composto.",
        ],
        examples=[
            GrammarExample(
                text="Qualquer que seja a decisao, estou de acordo.",
                translation=None,
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Qualquer que e a decisao.",
                correct="Qualquer que seja a decisao.",
                note="Qualquer que + conjuntivo.",
            ),
        ],
        related=["presente-conjuntivo", "imperfeito-conjuntivo", "futuro-do-conjuntivo"],
    ),
    GrammarTopic(
        slug="revisao-condicional",
        title="Revisao geral dos condicionais",
        level="C2",
        category="Condicionais",
        summary="Dominio de todas as estruturas condicionais.",
        explanation="Tipo 1: Se estudares, passas. Tipo 2: Se estudasses, passavas. Tipo 3: Se tivesses estudado, tinhas passado.",
        rules=[
            "Tipo 1, 2, 3.",
            "Coloquial EP: imperfeito em vez de condicional.",
        ],
        examples=[
            GrammarExample(
                text="Se estudares, passas.", translation=None
            ),
            GrammarExample(
                text="Se estudasses, passavas.",
                translation=None,
                note="coloquial EP",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Se estudavas, passavas.",
                correct="Se estudasses, passavas.",
                note="Hipotetica: imperfeito conjuntivo.",
            ),
        ],
        related=["condicional", "se-imperfeito-subjuntivo", "condicional-composto"],
    ),
    GrammarTopic(
        slug="mesoclise",
        title="Mesoclise",
        level="C2",
        category="Pronomes",
        summary="Dominio da mesoclise no futuro e condicional.",
        explanation="Dar-te-ei, Dar-te-ia. Formal. Na fala: ir + infinitivo.",
        rules=[
            "Pronome no meio do verbo.",
            "Futuro e condicional.",
        ],
        examples=[
            GrammarExample(
                text="Enviar-lhe-ei os documentos amanha.",
                translation=None,
                note="formal",
            ),
            GrammarExample(
                text="Poder-se-ia argumentar que...",
                translation=None,
                note="academico",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Enviar-lhe-ei (conversa informal)",
                correct="Vou enviar-lhe os documentos.",
                note="Mesoclise e formal.",
            ),
        ],
        related=["colocacao-pronominal", "futuro-do-presente", "condicional"],
    ),
    GrammarTopic(
        slug="estilo-literario",
        title="Estilo literario",
        level="C2",
        category="Avancado",
        summary="Desenvolver uma voz literaria autentica.",
        explanation="Variedade sintatica, lexico preciso, figuras de estilo com moderacao, mostrar em vez de dizer.",
        rules=[
            "Variar estruturas.",
            "Lexico preciso.",
            "Mostrar, nao dizer.",
        ],
        examples=[
            GrammarExample(
                text="O sol morria no horizonte, tingindo o Tejo de ouro liquido.",
                translation=None,
            ),
        ],
        common_mistakes=[
            GrammarMistake(wrong="Abusar de adjetivos.", correct="Menos e mais.", note=""),
        ],
        related=["descricao-literaria", "recursos-estilisticos", "voz-narrativa"],
    ),
    GrammarTopic(
        slug="voz-narrativa",
        title="Voz narrativa",
        level="C2",
        category="Avancado",
        summary="Tipos de narrador e construcao da voz narrativa.",
        explanation="1a pessoa, 3a omnisciente, 3a objetiva, discurso indireto livre.",
        rules=[
            "1a pessoa = personagem.",
            "3a omnisciente = pensamentos.",
            "Discurso indireto livre.",
        ],
        examples=[
            GrammarExample(
                text="Maria abriu a porta devagar, sem saber que o destino a esperava. (omnisciente)",
                translation=None,
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Alternar voz sem necessidade.", correct="Manter consistencia.", note=""
            ),
        ],
        related=["estilo-literario", "descricao-literaria"],
    ),
    GrammarTopic(
        slug="recursos-estilisticos",
        title="Recursos estilisticos avancados",
        level="C2",
        category="Avancado",
        summary="Sinestesia, aliteracao, assonancia, quiasmo.",
        explanation="Sinestesia (cheiro doce), aliteracao (vento varria vielas), quiasmo (Nao vivemos para comer, comemos para viver).",
        rules=[
            "Sinestesia, aliteracao, assonancia, quiasmo.",
        ],
        examples=[
            GrammarExample(
                text="O cheiro doce da manha. (sinestesia)",
                translation=None,
            ),
            GrammarExample(
                text="O vento varria as velhas vielas. (aliteracao)",
                translation=None,
            ),
        ],
        common_mistakes=[
            GrammarMistake(wrong="Aliteracao forcada.", correct="Usar com naturalidade.", note=""),
        ],
        related=["figuras-literarias", "estilo-literario"],
    ),
    GrammarTopic(
        slug="equivalencia",
        title="Equivalencia na traducao",
        level="C2",
        category="Avancado",
        summary="Principios de equivalencia tradutoria.",
        explanation="Equivalencia funcional: desenrascanco -> knack for improvising. Evitar calques. Expressoes: equivalentes culturais.",
        rules=[
            "Equivalencia funcional.",
            "Evitar calques.",
        ],
        examples=[
            GrammarExample(
                text="Custou os olhos da cara. -> It cost an arm and a leg.",
                translation=None,
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Estar com a pulga atras da orelha. -> To be with the flea behind the ear.",
                correct="To be suspicious.",
                note="Expressoes NAO se traduzem literalmente.",
            ),
        ],
        related=["falsos-amigos", "matizes-traducao"],
    ),
    GrammarTopic(
        slug="matizes-traducao",
        title="Matizes de traducao",
        level="C2",
        category="Avancado",
        summary="Nuances que distinguem uma boa traducao.",
        explanation="Registo, tempos verbais, conotacoes culturais (saudade sem equivalente exato).",
        rules=[
            "Registo e formalidade.",
            "Tempos: composto PT != present perfect EN.",
            "Conotacoes culturais.",
        ],
        examples=[
            GrammarExample(
                text="Tenho andado a pensar nisso. -> I have been thinking about that.",
                translation=None,
            ),
            GrammarExample(
                text="Que saudades! -> I miss you so much!", translation=None
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Tenho comido ontem. -> I have eaten yesterday.",
                correct="Comi ontem. -> I ate yesterday.",
                note="Acao unica: preterito simples.",
            ),
        ],
        related=["equivalencia", "falsos-amigos"],
    ),
    GrammarTopic(
        slug="falsos-amigos",
        title="Falsos amigos",
        level="C2",
        category="Avancado",
        summary="Palavras portuguesas que parecem inglesas.",
        explanation="Atualmente = currently (nao actually). Compromisso = appointment (nao compromise). Pretender = to intend (nao to pretend).",
        rules=[
            "Atualmente = currently.",
            "Compromisso = appointment.",
            "Pretender = to intend.",
        ],
        examples=[
            GrammarExample(
                text="Atualmente moro em Lisboa. -> I currently live in Lisbon.",
                translation=None,
            ),
            GrammarExample(
                text="Tenho um compromisso as tres. -> I have an appointment at three.",
                translation=None,
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Actually -> atualmente.",
                correct="Actually = na verdade. Atualmente = currently.",
                note="",
            ),
        ],
        related=["equivalencia", "matizes-traducao"],
    ),
    GrammarTopic(
        slug="evolucao-linguistica",
        title="Evolucao linguistica",
        level="C2",
        category="Avancado",
        summary="Como a lingua portuguesa evoluiu do latim.",
        explanation="Latim vulgar -> Galego-portugues (XII-XIV) -> Portugues antigo -> Classico -> Moderno. Mudancas: populu > povo, plenu > cheio, manu > mao.",
        rules=[
            "Latim vulgar > Galego-portugues > Moderno.",
            "Queda de consoantes, palatalizacao, nasalizacao.",
        ],
        examples=[
            GrammarExample(
                text="Latim: populu -> Portugues: povo", translation=None
            ),
            GrammarExample(text="Latim: plenu -> Portugues: cheio", translation=None),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Confundir evolucao com corrupcao.",
                correct="Mudanca linguistica e natural.",
                note="",
            ),
        ],
        related=["latinismos", "arabismos-portugueses"],
    ),
    GrammarTopic(
        slug="latinismos",
        title="Latinismos",
        level="C2",
        category="Avancado",
        summary="Expressoes e palavras latinas no portugues.",
        explanation="a priori, ad hoc, ipso facto, per capita, sine qua non, grosso modo, curriculum vitae, lato sensu.",
        rules=[
            "Comuns no registo formal.",
            "Usar com precisao.",
        ],
        examples=[
            GrammarExample(
                text="A seguranca e uma condicao sine qua non.",
                translation=None,
            ),
            GrammarExample(
                text="Grosso modo, a proposta e aceitavel.",
                translation=None,
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="A posteriori. (com crase)",
                correct="A posteriori. (sem crase).",
                note="A e preposicao latina, nao leva crase.",
            ),
        ],
        related=["evolucao-linguistica", "arabismos-portugueses", "registo-formal"],
    ),
    GrammarTopic(
        slug="arabismos-portugueses",
        title="Arabismos portugueses",
        level="C2",
        category="Avancado",
        summary="A heranca arabe no lexico portugues.",
        explanation="~1000 palavras: arroz, azeite, acucar, algebra, algoritmo, zero, aldeia. Muitas com al- (artigo arabe).",
        rules=[
            "~1000 palavras.",
            "al- = artigo arabe.",
            "Alimentos, ciencia, arquitetura.",
        ],
        examples=[
            GrammarExample(text="azeite (az-zayt)", translation=None),
            GrammarExample(text="arroz (ar-ruzz)", translation=None),
            GrammarExample(text="algebra (al-jabr)", translation=None),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Ignorar a origem arabe.",
                correct="O portugues e uma lingua de encontros culturais.",
                note="",
            ),
        ],
        related=["evolucao-linguistica", "latinismos"],
    ),
    GrammarTopic(
        slug="generos-textuais",
        title="Generos textuais",
        level="C2",
        category="Avancado",
        summary="Dominio de todos os generos textuais.",
        explanation="Ensaio, academico, relatorio, editorial, carta formal, discurso. Cada um com convencoes especificas.",
        rules=[
            "Cada genero tem convencoes.",
            "Conhecer o genero orienta escolhas.",
        ],
        examples=[
            GrammarExample(
                text="O presente relatorio apresenta os resultados do inquerito.",
                translation=None,
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Misturar convencoes de generos.",
                correct="Cada genero tem registo e estrutura proprios.",
                note="",
            ),
        ],
        related=["registo-formal", "estrutura-argumentativa"],
    ),
    GrammarTopic(
        slug="criatividade-linguistica",
        title="Criatividade linguistica",
        level="C2",
        category="Avancado",
        summary="Brincar com a lingua: neologismos, trocadilhos.",
        explanation="Neologismos (googlar), amalgamas (portunhol), trocadilhos (Nao e so ver, e prever), estrangeirismos adaptados (futebol).",
        rules=[
            "Neologismos, amalgamas, trocadilhos.",
        ],
        examples=[
            GrammarExample(
                text="Vou googlar esse termo. (neologismo)",
                translation=None,
            ),
            GrammarExample(
                text="Nao e so ver, e prever! (trocadilho)",
                translation=None,
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Neologismos incompreensiveis.", correct="Devem ser intuitivos.", note=""
            ),
        ],
        related=["derivacao", "expressoes-coloquiais", "expressao-matizada"],
    ),
    GrammarTopic(
        slug="edicao",
        title="Edicao e revisao de textos",
        level="C2",
        category="Avancado",
        summary="Tecnicas de edicao para clareza e elegancia.",
        explanation="Conteudo, estilo, gramatica, tipografia. Ler em voz alta. Distancia temporal.",
        rules=[
            "Conteudo, estilo, gramatica, tipografia.",
        ],
        examples=[
            GrammarExample(
                text="Rever: Os aluno terminou -> Os alunos terminaram.", translation=None
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Rever apenas gramatica.", correct="Edicao eficaz reve tudo.", note=""
            ),
        ],
        related=["reformulacao", "coesao-textual", "expressao-matizada"],
    ),
    GrammarTopic(
        slug="expressao-matizada",
        title="Expressao matizada",
        level="C2",
        category="Avancado",
        summary="Arte de matizar o discurso.",
        explanation="Certeza (e indubitavel), probabilidade (tudo indica), incerteza (diria que), cortesia (permita-me, gostaria de).",
        rules=[
            "Certeza, probabilidade, incerteza, cortesia.",
        ],
        examples=[
            GrammarExample(
                text="E indubitavel que a medida trouxe beneficios.",
                translation=None,
            ),
            GrammarExample(
                text="Diria que a situacao e complexa.",
                translation=None,
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Afirmacoes demasiado categoricas.",
                correct="Matizar quando nao ha certeza.",
                note="",
            ),
        ],
        related=["matizadores", "recursos-retoricos", "critica-construtiva"],
    ),
    GrammarTopic(
        slug="integracao-gramatical",
        title="Integracao gramatical",
        level="C2",
        category="Avancado",
        summary="Sintese de todos os conhecimentos gramaticais.",
        explanation="Conjuntivo/indicativo natural. Enclise/proclise/mesoclise. Concordancia temporal. Escolha contextual de registo.",
        rules=[
            "Conjuntivo/indicativo.",
            "Enclise/proclise/mesoclise.",
            "Concordancia.",
            "Registo contextualizado.",
        ],
        examples=[
            GrammarExample(
                text="Se eu tivesse sabido que seria tao dificil, ter-me-ia preparado melhor.",
                translation=None,
                note="integracao completa",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Hesitacao conjuntivo/indicativo.",
                correct="Com pratica, torna-se intuitivo.",
                note="",
            ),
        ],
        related=["revisao-conjuntivo", "revisao-condicional", "expressao-matizada"],
    ),
    GrammarTopic(
        slug="fluencia-nativa",
        title="Fluencia nativa",
        level="C2",
        category="Avancado",
        summary="Alcancar proficiencia indistinguivel de nativo.",
        explanation="Expressao espontanea, dominio cultural, entoacao natural PE, registos flexiveis, intuicao gramatical. C2: autonomia.",
        rules=[
            "Expressao espontanea.",
            "Dominio cultural.",
            "Entoacao PE.",
            "Flexibilidade de registos.",
        ],
        examples=[
            GrammarExample(
                text="A fluencia nao e so falar corretamente -- e pensar, sentir e sonhar em portugues.",
                translation=None,
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Achar que C2 e o fim.", correct="A aprendizagem nunca termina.", note=""
            ),
        ],
        related=["integracao-gramatical", "expressao-matizada"],
    ),
    GrammarTopic(
        slug="tupinismos",
        title="Tupinismos — palavras de origem tupi-guarani",
        level="C2",
        category="Avancado",
        summary="Reconhecer e compreender os tupinismos integrados no português brasileiro.",
        explanation="Os **tupinismos** são palavras de origem tupi-guarani incorporadas ao português, principalmente através do contato colonial no Brasil.\\n\\nMuitas designam elementos da fauna e flora brasileiras, mas também alimentos, utensílios e topónimos:\\n\\n- **Fauna**: jaguar, tatu, piranha, capivara, arara, tucano, sucuri, jabuti\\n- **Flora**: abacaxi, mandioca, caju, capim, açaí, buriti, ipê, jacarandá\\n- **Alimentação**: pipoca, tapioca, paçoca, mingau, moqueca\\n- **Topónimos**: Ipanema, Copacabana, Tijuca, Curitiba, Paraná, Iguaçu\\n\\nEstas palavras são usadas quotidianamente no Brasil e enriquecem o léxico português com uma herança indígena viva.",
        rules=[
            "Tupinismos designam maioritariamente fauna, flora e topónimos brasileiros.",
            "Muitos tupinismos não têm equivalente em português europeu (ex: abacaxi vs ananás).",
            "São parte integrante do vocabulário ativo brasileiro.",
            "Reconhecer a origem tupi demonstra conhecimento avançado da cultura e história da língua.",
        ],
        examples=[
            GrammarExample(
                text="Vou comer um abacaxi com tapioca.",
                translation=None,
            ),
            GrammarExample(
                text="O tucano e a arara são aves típicas do Brasil.",
                translation=None,
            ),
            GrammarExample(
                text="A capivara é o maior roedor do mundo.",
                translation=None,
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Achar que abacaxi e ananás são sempre sinónimos.",
                correct="Em Portugal usa-se ananás; no Brasil, abacaxi. Designam variedades diferentes.",
                note="Distinção regional.",
            ),
            GrammarMistake(
                wrong="Confundir mandioca com batata-doce.",
                correct="Mandioca (ou aipim/macaxeira) é uma raiz diferente, da qual se faz farinha e tapioca.",
                note="Distinção botânica.",
            ),
        ],
        related=["arabismos-portugueses", "evolucao-linguistica", "portugues-brasileiro"],
    ),
]
