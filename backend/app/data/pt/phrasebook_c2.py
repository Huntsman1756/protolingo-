"""Portuguese phrasebook — C2 categories."""

from app.data._types import PhrasebookCategory, PhrasebookEntry

C2_CATEGORIES: list[PhrasebookCategory] = [
    PhrasebookCategory(
        id="rhetoric_c2",
        level="C2",
        situation="Ret\u00f3rica e persuas\u00e3o",
        icon="\u2696\ufe0f",
        phrases=[
            PhrasebookEntry(
                text="N\u00e3o h\u00e1 sombra de d\u00favida de que as evid\u00eancias falam por si.",
                context="Refor\u00e7ar uma afirma\u00e7\u00e3o com for\u00e7a ret\u00f3rica",
                register="formal",
            ),
            PhrasebookEntry(
                text="Quem ousaria afirmar o contr\u00e1rio?",
                context="Pergunta ret\u00f3rica para refor\u00e7ar a tese",
                register="formal",
            ),
            PhrasebookEntry(
                text="Chegou o momento de enfrentar a verdade, por mais inc\u00f3moda que seja.",
                context="Apelo emotivo \u00e0 verdade",
                register="formal",
            ),
            PhrasebookEntry(
                text="N\u00e3o podemos ficar inertes perante uma t\u00e3o grande injusti\u00e7a.",
                context="Apelo \u00e0 a\u00e7\u00e3o",
                register="formal",
            ),
            PhrasebookEntry(
                text="As consequ\u00eancias de uma falta de a\u00e7\u00e3o seriam catastr\u00f3ficas.",
                context="Aviso sobre as consequ\u00eancias",
                register="formal",
            ),
            PhrasebookEntry(
                text="Invoco o vosso sentido de responsabilidade para com as gera\u00e7\u00f5es futuras.",
                context="Apelo \u00e0s gera\u00e7\u00f5es futuras",
                register="formal",
            ),
            PhrasebookEntry(
                text="Isto n\u00e3o \u00e9 uma quest\u00e3o de direita ou de esquerda, mas de bom senso.",
                context="Ultrapassar divis\u00f5es pol\u00edticas",
                register="formal",
            ),
            PhrasebookEntry(
                text="Deixem-me contar-vos uma hist\u00f3ria que ilustra melhor do que mil palavras o que pretendo dizer.",
                context="Usar uma narrativa persuasiva",
                register="formal",
            ),
            PhrasebookEntry(
                text="Estamos numa encruzilhada hist\u00f3rica, e a escolha que fizermos hoje definir\u00e1 o nosso futuro.",
                context="Criar urg\u00eancia hist\u00f3rica",
                register="formal",
            ),
            PhrasebookEntry(
                text="N\u00e3o nos iludamos: a estrada \u00e9 \u00edngreme, mas \u00e9 transit\u00e1vel.",
                context="Reconhecer dificuldades mas infundir esperan\u00e7a",
                register="formal",
            ),
            PhrasebookEntry(
                text="Quem n\u00e3o faz parte da solu\u00e7\u00e3o faz parte do problema.",
                context="Dicotomia ret\u00f3rica",
                register="formal",
            ),
            PhrasebookEntry(
                text="Permitam-me sonhar por um instante com um mundo em que...",
                context="Abertura vision\u00e1ria",
                register="formal",
            ),
        ],
    ),
    PhrasebookCategory(
        id="nuanced_discourse_c2",
        level="C2",
        situation="Discurso matizado e atenuacao",
        icon="\U0001f52c",
        phrases=[
            PhrasebookEntry(
                text="Na minha modesta opini\u00e3o, a quest\u00e3o \u00e9 bem mais complexa do que parece \u00e0 primeira vista.",
                context="Minimizar a pr\u00f3pria opini\u00e3o por diplomacia",
                register="formal",
            ),
            PhrasebookEntry(
                text="N\u00e3o se pode excluir \u00e0 partida que tenha havido mal-entendidos.",
                context="Abrir a possibilidades alternativas",
                register="formal",
            ),
            PhrasebookEntry(
                text="Tenderia a crer que as coisas s\u00e3o diferentes, mas estou pronto/a a mudar de ideias.",
                context="Exprimir opini\u00e3o com abertura \u00e0 mudan\u00e7a",
                register="formal",
            ),
            PhrasebookEntry(
                text="Seria arriscado tirar conclus\u00f5es definitivas com base nos dados atuais.",
                context="Alertar contra conclus\u00f5es precipitadas",
                register="formal",
            ),
            PhrasebookEntry(
                text="No que me diz respeito, n\u00e3o haveria obje\u00e7\u00f5es de princ\u00edpio, mas haveria que avaliar os detalhes operacionais.",
                context="Acordo condicionado",
                register="formal",
            ),
            PhrasebookEntry(
                text="Admitindo, sem conceder, que a premissa seja correta, a conclus\u00e3o n\u00e3o \u00e9 evidente.",
                context="Aceitar hipoteticamente uma premissa",
                register="formal",
            ),
            PhrasebookEntry(
                text="N\u00e3o gostaria que as minhas palavras fossem interpretadas como uma cr\u00edtica, mas antes como uma sugest\u00e3o de reflex\u00e3o.",
                context="Atenuar uma potencial cr\u00edtica",
                register="formal",
            ),
            PhrasebookEntry(
                text="\u00c9 veros\u00edmil que a situa\u00e7\u00e3o evolua numa dire\u00e7\u00e3o diferente da prevista.",
                context="Exprimir probabilidade com cautela",
                register="formal",
            ),
            PhrasebookEntry(
                text="Longe de mim a ideia de querer impor a minha vis\u00e3o.",
                context="Prevenir acusa\u00e7\u00f5es de arrog\u00e2ncia",
                register="formal",
            ),
            PhrasebookEntry(
                text="Poder-se-ia talvez arriscar a hip\u00f3tese de as causas serem mais profundas.",
                context="Propor hip\u00f3tese com cautela",
                register="formal",
            ),
            PhrasebookEntry(
                text="\u00c9 inegavelmente um passo em frente, embora subsistam algumas dificuldades.",
                context="Equilibrar elogio e cr\u00edtica",
                register="formal",
            ),
            PhrasebookEntry(
                text="Seria cauteloso/a em atribuir pura e simplesmente a responsabilidade a um \u00fanico fator.",
                context="Alertar contra atribui\u00e7\u00f5es simplistas",
                register="formal",
            ),
        ],
    ),
    PhrasebookCategory(
        id="legal_contractual_c2",
        level="C2",
        situation="Linguagem jur\u00eddica e contratual",
        icon="\U0001f4dc",
        phrases=[
            PhrasebookEntry(
                text="Nos termos do artigo 3.\u00ba do presente contrato, as partes acordam no seguinte.",
                context="Refer\u00eancia a uma cl\u00e1usula contratual",
                register="formal",
            ),
            PhrasebookEntry(
                text="O presente acordo \u00e9 regido pela lei portuguesa.",
                context="Especificar a jurisdi\u00e7\u00e3o",
                register="formal",
            ),
            PhrasebookEntry(
                text="Sem preju\u00edzo do disposto no n\u00famero anterior.",
                context="Fazer uma reserva legal",
                register="formal",
            ),
            PhrasebookEntry(
                text="O presente documento constitui a totalidade do acordo entre as partes.",
                context="Cl\u00e1usula de integralidade contratual",
                register="formal",
            ),
            PhrasebookEntry(
                text="Qualquer altera\u00e7\u00e3o dever\u00e1 ser feita por escrito e assinada por ambas as partes.",
                context="Cl\u00e1usula de altera\u00e7\u00e3o",
                register="formal",
            ),
            PhrasebookEntry(
                text="A parte incumpridora ser\u00e1 respons\u00e1vel pelo pagamento de perdas e danos.",
                context="Cl\u00e1usula de incumprimento",
                register="formal",
            ),
            PhrasebookEntry(
                text="As partes elegem domic\u00edlio nas respetivas sedes sociais.",
                context="Elei\u00e7\u00e3o de domic\u00edlio",
                register="formal",
            ),
            PhrasebookEntry(
                text="O contrato \u00e9 nulo quando contr\u00e1rio a normas imperativas.",
                context="Cl\u00e1usula de nulidade",
                register="formal",
            ),
            PhrasebookEntry(
                text="Por ser verdade, as partes assinam o presente documento.",
                context="F\u00f3rmula de fecho legal",
                register="formal",
            ),
            PhrasebookEntry(
                text="O presente ato est\u00e1 sujeito a registo na Autoridade Tribut\u00e1ria.",
                context="Obriga\u00e7\u00e3o de registo",
                register="formal",
            ),
            PhrasebookEntry(
                text="Os lit\u00edgios ser\u00e3o dirimidos no foro competente de Lisboa.",
                context="Cl\u00e1usula do foro competente",
                register="formal",
            ),
        ],
    ),
    PhrasebookCategory(
        id="social_commentary_c2",
        level="C2",
        situation="Coment\u00e1rio social e debate",
        icon="\U0001f5de\ufe0f",
        phrases=[
            PhrasebookEntry(
                text="A sociedade contempor\u00e2nea enfrenta desafios sem precedentes.",
                context="Abertura de um coment\u00e1rio social",
                register="formal",
            ),
            PhrasebookEntry(
                text="O fosso entre ricos e pobres est\u00e1 a aumentar de forma alarmante.",
                context="Den\u00fancia de desigualdade",
                register="formal",
            ),
            PhrasebookEntry(
                text="\u00c9 indispens\u00e1vel uma mudan\u00e7a de paradigma se quisermos garantir um futuro sustent\u00e1vel.",
                context="Apelo \u00e0 mudan\u00e7a",
                register="formal",
            ),
            PhrasebookEntry(
                text="J\u00e1 n\u00e3o podemos dar-nos ao luxo de ignorar as consequ\u00eancias das nossas a\u00e7\u00f5es no planeta.",
                context="Apelo ecol\u00f3gico",
                register="formal",
            ),
            PhrasebookEntry(
                text="A crise que atravessamos n\u00e3o \u00e9 apenas econ\u00f3mica, mas tamb\u00e9m de valores.",
                context="An\u00e1lise multidimensional",
                register="formal",
            ),
            PhrasebookEntry(
                text="As novas tecnologias oferecem oportunidades extraordin\u00e1rias, mas tamb\u00e9m levantam interroga\u00e7\u00f5es \u00e9ticas inquietantes.",
                context="Equilibrar progresso e riscos",
                register="formal",
            ),
            PhrasebookEntry(
                text="Assistimos a uma progressiva eros\u00e3o da confian\u00e7a nas institui\u00e7\u00f5es democr\u00e1ticas.",
                context="An\u00e1lise pol\u00edtica",
                register="formal",
            ),
            PhrasebookEntry(
                text="\u00c9 nosso dever moral empenharmo-nos por uma sociedade mais justa e inclusiva.",
                context="Apelo moral",
                register="formal",
            ),
            PhrasebookEntry(
                text="O debate p\u00fablico foi contaminado por uma onda de desinforma\u00e7\u00e3o sem precedentes.",
                context="Cr\u00edtica dos media",
                register="formal",
            ),
            PhrasebookEntry(
                text="A cultura, entendida no seu sentido mais amplo, \u00e9 o \u00fanico verdadeiro ant\u00eddoto contra a intoler\u00e2ncia.",
                context="Elogio da cultura",
                register="formal",
            ),
            PhrasebookEntry(
                text="Sem uma educa\u00e7\u00e3o de qualidade, qualquer discurso sobre progresso social est\u00e1 condenado a ser letra morta.",
                context="Defesa da educa\u00e7\u00e3o",
                register="formal",
            ),
        ],
    ),
]
