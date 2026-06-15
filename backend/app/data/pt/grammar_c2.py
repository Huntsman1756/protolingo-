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
            GrammarExample(text="Se estudares, passas.", translation=None),
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
            GrammarExample(text="Que saudades! -> I miss you so much!", translation=None),
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
            GrammarExample(text="Latim: populu -> Portugues: povo", translation=None),
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
    GrammarTopic(
        slug="lusofonia-contemporanea",
        title="A Lusofonia contemporânea",
        level="C2",
        category="Expressão",
        summary="Instituições, diversidade e desafios da comunidade lusófona no século XXI.",
        explanation="A **Lusofonia** é uma comunidade de mais de 280 milhões de falantes distribuídos por todos os continentes. Ultrapassa a simples partilha linguística: é um espaço político, económico e cultural organizado em torno da CPLP (Comunidade dos Países de Língua Portuguesa).\n\n**Instituições principais**:\n- **CPLP** (9 Estados-membros) : promoção da língua, cooperação política, educação.\n- **IILP** (Instituto Internacional da Língua Portuguesa) : gestão da política linguística comum.\n- **RTP-África** : difusão televisiva internacional em português.\n\n**Dinâmicas regionais**:\n- África concentra a maioria dos falantes (Angola, Moçambique, Cabo Verde, Guiné-Bissau, São Tomé e Príncipe).\n- O português avança demograficamente graças ao crescimento populacional africano.\n- O Brasil mantém uma política linguística própria, com norma distinta da europeia.\n\n**Debates**: norma europeia vs. norma brasileira vs. variedades africanas, insegurança linguística, o papel do inglês como língua de ciência nos países lusófonos.",
        rules=[
            "A Lusofonia não é um bloco monolítico — cada país tem a sua variedade e política linguística.",
            "O centro de gravidade demográfico do português está a deslocar-se para África.",
            "A CPLP promove o plurilinguismo e a diversidade cultural, não o monolinguismo português.",
        ],
        examples=[
            GrammarExample(
                text="Em Angola, expressões como 'maka' (conflito, confusão) ou 'bué' (muito) enriquecem o português local com influências das línguas bantu.",
                translation=None,
                note="português angolano",
            ),
            GrammarExample(
                text="O Brasil criou o VOLP (Vocabulário Ortográfico da Língua Portuguesa) para gerir a norma brasileira no quadro do Acordo Ortográfico.",
                translation=None,
            ),
            GrammarExample(
                text="Segundo projeções da ONU, o português poderá ser falado por mais de 380 milhões de pessoas em 2050, sobretudo em África.",
                translation=None,
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="A Lusofonia são só os países onde se fala português.",
                correct="A Lusofonia é uma organização política e cultural — nem todos os países membros da CPLP têm o português como língua maioritária (ex.: Guiné Equatorial).",
                note="Confusão frequente entre lusofonia (facto linguístico) e Lusofonia (instituição, CPLP).",
            ),
        ],
        related=["politica-linguistica-pt", "evolucao-linguistica"],
    ),
    GrammarTopic(
        slug="politica-linguistica-pt",
        title="Política linguística no mundo lusófono",
        level="C2",
        category="Expressão",
        summary="Do Acordo Ortográfico à difusão do português: políticas e tensões linguísticas nos países de língua portuguesa.",
        explanation="Os países lusófonos gerem as suas políticas linguísticas de forma descentralizada, mas com alguns instrumentos comuns:\n\n**Instituições de regulação**:\n- **Academia das Ciências de Lisboa** : regula a norma europeia (PE).\n- **Academia Brasileira de Letras** : gere a norma brasileira (PB).\n- **IILP** : coordena a política linguística comum entre os Estados-membros da CPLP.\n\n**Instrumentos principais**:\n- **Acordo Ortográfico de 1990** : visa unificar a ortografia entre as variedades. Ratificado por todos os países, mas aplicado de forma desigual e contestado sobretudo em Portugal.\n\n**Debates contemporâneos**:\n- **Diferenças PE-PB** : próclise generalizada no Brasil (me dá), gerúndio (estou falando vs. estou a falar), colocação pronominal (traga-me vs. me traga).\n- **Norma única vs. pluricentrismo** : deve haver uma norma comum ou deve reconhecer-se o português como língua pluricêntrica com múltiplas normas de igual dignidade?\n- **Ensino do português** : difusão do PE ou do PB como língua estrangeira — competição entre Portugal e Brasil.\n- **Línguas nacionais** : em África, o português coexiste com línguas bantu e crioulas, levantando questões de política educativa.",
        rules=[
            "O Acordo Ortográfico é um tratado internacional, não uma imposição — cada país decide a sua aplicação.",
            "O português é uma língua pluricêntrica: PE e PB são normas de igual legitimidade.",
            "As variedades africanas estão a afirmar-se como normas emergentes com traços próprios.",
        ],
        examples=[
            GrammarExample(
                text="Portugal europeu: 'Dá-me o livro.' — Brasil: 'Me dá o livro.' — A colocação pronominal é uma das diferenças mais visíveis entre as normas.",
                translation=None,
                note="PE vs. PB — próclise",
            ),
            GrammarExample(
                text="O Acordo Ortográfico eliminou as consoantes mudas em Portugal: 'acção' passou a 'ação', 'óptimo' passou a 'ótimo'.",
                translation=None,
                note="AO90",
            ),
            GrammarExample(
                text="Em Moçambique, palavras como 'machimbombo' (autocarro) e 'candongueiro' (minibus) mostram a criatividade lexical do português africano.",
                translation=None,
                note="português moçambicano",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="A Academia das Ciências de Lisboa dita as regras do português em todos os países lusófonos.",
                correct="A ACL regula apenas a norma europeia. Cada país tem as suas instituições de regulação (ABL no Brasil, etc.).",
                note="Distinguir norma europeia de norma internacional.",
            ),
        ],
        related=["lusofonia-contemporanea", "evolucao-linguistica"],
    ),
    GrammarTopic(
        slug="evolucao-digital-pt",
        title="O português na era digital",
        level="C2",
        category="Expressão",
        summary="Como o português evolui com o digital: redes sociais, IA, anglicismos e novos usos linguísticos.",
        explanation="O **digital transforma o português** a um ritmo acelerado:\n\n**Redes sociais e mensagens**:\n- Abreviaturas: *tb* (também), *msg* (mensagem), *bjs* (beijos), *cmg* (comigo), *sff* (se faz favor), *obg* (obrigado/a).\n- Emojis como pontuação emocional e reforço pragmático.\n- Hashtags e a sua sintaxe: *#Portugal, #Lusofonia*.\n\n**Neologismos e anglicismos digitais**:\n- Neologismos: *googlar*, *tuitar*, *postar*, *clicar*, *descarregar*, *carregar*.\n- Anglicismos: *download*, *upload*, *site*, *link*, *chat*, *streaming*, *podcast*.\n- Adaptações: *clicar* (de *click*), *resetear* (de *reset*), *forwardear* (de *forward*).\n\n**IA e processamento de língua natural**:\n- ChatGPT, DeepL, tradução automática: desafios para a aprendizagem do português.\n- Assistentes virtuais em português (PE e PB).\n- Modelos de IA treinados maioritariamente em inglês — viés linguístico.\n\n**Socioletos digitais**:\n- Gíria da internet: *lol*, *troll*, *fail*, *crush*, *cringe*.\n- Mistura de registos: escrita informal digital aproxima-se da oralidade.",
        rules=[
            "O português digital não é uma versão 'degradada' da língua — é um registo adaptado ao meio e ao contexto.",
            "Os anglicismos na tecnologia são frequentes, mas o português também cria alternativas (descarregar, carregar, correio eletrónico).",
            "A IA e a tradução automática levantam questões de soberania linguística e representatividade das variedades do português.",
        ],
        examples=[
            GrammarExample(
                text="obg pela msg, depois falamos cmg :) bjs!",
                translation=None,
                note="linguagem SMS em português europeu",
            ),
            GrammarExample(
                text="Vou googlar esse termo e depois faço o download do ficheiro.",
                translation=None,
                note="mistura de neologismo e anglicismo",
            ),
            GrammarExample(
                text="Os modelos de IA generativa ainda produzem um português com forte viés brasileiro, o que levanta questões sobre a representatividade das variedades europeia e africanas.",
                translation=None,
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="A linguagem das redes sociais é 'mau português'.",
                correct="Cada contexto comunicativo exige um registo adequado — a linguagem digital é funcional e criativa no seu meio, não sendo inferior ao registo formal.",
                note="Evitar preconceitos linguísticos sobre variedades e registos.",
            ),
        ],
        related=["lusofonia-contemporanea", "criatividade-linguistica"],
    ),
]
