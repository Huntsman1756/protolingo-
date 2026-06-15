"""Portuguese phrasebook — B2 categories."""

from app.data._types import PhrasebookCategory, PhrasebookEntry

B2_CATEGORIES: list[PhrasebookCategory] = [
    PhrasebookCategory(
        id="formal_emails_b2",
        level="B2",
        situation="Emails formais e correspond\u00eancia",
        icon="\U0001f4e7",
        phrases=[
            PhrasebookEntry(
                text="Exmo. Sr. Dr. Silva,",
                context="Abertura de correio eletrónico formal (homem)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Exma. Sra. Professora Sousa,",
                context="Abertura de correio eletrónico formal (mulher)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Em anexo envio o documento solicitado.",
                context="Enviar um anexo",
                register="formal",
            ),
            PhrasebookEntry(
                text="Agrade\u00e7o a sua disponibilidade.",
                context="Agradecer a disponibilidade",
                register="formal",
            ),
            PhrasebookEntry(
                text="Fico a aguardar a sua resposta.",
                context="Pedir uma resposta educadamente",
                register="formal",
            ),
            PhrasebookEntry(
                text="Na sequ\u00eancia do seu correio eletr\u00f3nico de...",
                context="Referir uma comunica\u00e7\u00e3o anterior",
                register="formal",
            ),
            PhrasebookEntry(
                text="Escrevo para solicitar informa\u00e7\u00f5es sobre...",
                context="Introduzir o objetivo do correio eletr\u00f3nico",
                register="formal",
            ),
            PhrasebookEntry(
                text="Com os melhores cumprimentos,",
                context="Fecho formal padr\u00e3o",
                register="formal",
            ),
            PhrasebookEntry(
                text="Atenciosamente,", context="Fecho muito formal", register="formal"
            ),
            PhrasebookEntry(
                text="Pe\u00e7o desculpa pela demora na resposta.",
                context="Desculpar-se pela demora",
                register="formal",
            ),
            PhrasebookEntry(
                text="Permito-me solicitar uma resposta.",
                context="Solicitar uma resposta",
                register="formal",
            ),
        ],
    ),
    PhrasebookCategory(
        id="negotiations_b2",
        level="B2",
        situation="Discuss\u00f5es e negocia\u00e7\u00f5es",
        icon="\U0001f91d",
        phrases=[
            PhrasebookEntry(
                text="Proponho um compromisso.", context="Propor um compromisso", register="formal"
            ),
            PhrasebookEntry(
                text="Vamos tentar chegar a um acordo.",
                context="Convidar a negociar",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Qual \u00e9 a vossa proposta?",
                context="Pedir uma proposta",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Parece-me uma oferta razo\u00e1vel.",
                context="Avaliar positivamente",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Infelizmente n\u00e3o podemos aceitar estas condi\u00e7\u00f5es.",
                context="Recusar educadamente",
                register="formal",
            ),
            PhrasebookEntry(
                text="Poder\u00edamos rever os termos do contrato?",
                context="Pedir para renegociar",
                register="formal",
            ),
            PhrasebookEntry(
                text="Estamos dispostos a negociar o pre\u00e7o.",
                context="Mostrar flexibilidade no pre\u00e7o",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Gostaria de ter tempo para avaliar.",
                context="Ganhar tempo para decidir",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Podemos encontrar uma solu\u00e7\u00e3o vantajosa para ambos.",
                context="Propor solu\u00e7\u00e3o vantajosa para ambas as partes",
                register="formal",
            ),
            PhrasebookEntry(
                text="Vamos p\u00f4r por escrito.",
                context="Pedir confirma\u00e7\u00e3o escrita",
                register="neutral",
            ),
        ],
    ),
    PhrasebookCategory(
        id="academic_discussion_b2",
        level="B2",
        situation="Discuss\u00f5es acad\u00e9micas",
        icon="\U0001f393",
        phrases=[
            PhrasebookEntry(
                text="Segundo a minha investiga\u00e7\u00e3o...",
                context="Introduzir os pr\u00f3prios resultados",
                register="formal",
            ),
            PhrasebookEntry(
                text="Este dado apoia a hip\u00f3tese inicial.",
                context="Relacionar dados e hip\u00f3tese",
                register="formal",
            ),
            PhrasebookEntry(
                text="Pelo contr\u00e1rio, os estudos de Silva sugerem que...",
                context="Contrapor investiga\u00e7\u00f5es diferentes",
                register="formal",
            ),
            PhrasebookEntry(
                text="\u00c9 importante sublinhar que...",
                context="Enfatizar um ponto",
                register="formal",
            ),
            PhrasebookEntry(
                text="A metodologia utilizada apresenta algumas limita\u00e7\u00f5es.",
                context="Reconhecer limites da investiga\u00e7\u00e3o",
                register="formal",
            ),
            PhrasebookEntry(
                text="Esta conclus\u00e3o \u00e9 apoiada por evid\u00eancias emp\u00edricas.",
                context="Refor\u00e7ar uma afirma\u00e7\u00e3o",
                register="formal",
            ),
            PhrasebookEntry(
                text="Poderia esclarecer melhor este ponto?",
                context="Pedir esclarecimentos acad\u00e9micos",
                register="formal",
            ),
            PhrasebookEntry(
                text="O tema foi amplamente debatido na literatura.",
                context="Referir literatura existente",
                register="formal",
            ),
            PhrasebookEntry(
                text="Considero que esta interpreta\u00e7\u00e3o \u00e9 discut\u00edvel.",
                context="Exprimir desacordo acad\u00e9mico",
                register="formal",
            ),
            PhrasebookEntry(
                text="Em s\u00edntese, os resultados indicam que...",
                context="Resumir conclus\u00f5es",
                register="formal",
            ),
            PhrasebookEntry(
                text="Quais são as implicações deste estudo?",
                context="Discutir as consequências de uma investigação",
                register="formal",
            ),
        ],
    ),
    PhrasebookCategory(
        id="argumentacao_b2",
        level="B2",
        situation="Argumentação e debate",
        icon="🗣️",
        phrases=[
            PhrasebookEntry(
                text="Discordo frontalmente dessa perspetiva.",
                context="Exprimir desacordo de forma direta e firme",
                register="semi-formal",
                unit_ref="b2-unit-5",
            ),
            PhrasebookEntry(
                text="Permita-me que apresente um ponto de vista divergente.",
                context="Introduzir uma opinião contrária com educação",
                register="formal",
                unit_ref="b2-unit-5",
            ),
            PhrasebookEntry(
                text="A meu ver, a questão é mais complexa do que se possa imaginar.",
                context="Matizar um debate simplificado",
                register="semi-formal",
                unit_ref="b2-unit-5",
            ),
            PhrasebookEntry(
                text="Com a devida vénia, essa afirmação merece ser revista.",
                context="Contradizer respeitosamente",
                register="formal",
                unit_ref="b2-unit-5",
            ),
            PhrasebookEntry(
                text="Sustento que os factos apontam noutra direção.",
                context="Afirmar que os dados contradizem o interlocutor",
                register="formal",
                unit_ref="b2-unit-5",
            ),
            PhrasebookEntry(
                text="Esta discussão seria mais produtiva se nos centrássemos nos dados objetivos.",
                context="Reconduzir o debate a factos",
                register="semi-formal",
                unit_ref="b2-unit-5",
            ),
            PhrasebookEntry(
                text="Compreendo o argumento, mas não posso deixar de assinalar uma contradição.",
                context="Reconhecer o argumento alheio antes de o refutar",
                register="formal",
                unit_ref="b2-unit-5",
            ),
            PhrasebookEntry(
                text="Vejamos a questão por outro prisma.",
                context="Convidar a mudar de perspetiva",
                register="semi-formal",
                unit_ref="b2-unit-5",
            ),
            PhrasebookEntry(
                text="Respeitosamente, creio que está a confundir causa com consequência.",
                context="Apontar um erro lógico com cortesia",
                register="formal",
                unit_ref="b2-unit-5",
            ),
            PhrasebookEntry(
                text="É legítimo questionar se os fins justificam os meios.",
                context="Levantar uma questão ética no debate",
                register="formal",
                unit_ref="b2-unit-5",
            ),
        ],
    ),
    PhrasebookCategory(
        id="cultura_portuguesa_b2",
        level="B2",
        situation="Cultura e tradições portuguesas",
        icon="🇵🇹",
        phrases=[
            PhrasebookEntry(
                text="O fado, enquanto expressão da alma portuguesa, foi reconhecido como Património Imaterial da Humanidade.",
                context="Falar sobre o fado como símbolo cultural português",
                register="formal",
                unit_ref="b2-unit-3",
            ),
            PhrasebookEntry(
                text="A gastronomia portuguesa distingue-se pelo uso generoso do azeite, do alho e das ervas aromáticas.",
                context="Descrever a base da cozinha portuguesa",
                register="formal",
                unit_ref="b2-unit-3",
            ),
            PhrasebookEntry(
                text="Os pastéis de nata são provavelmente o doce português mais conhecido além-fronteiras.",
                context="Mencionar um ícone da doçaria nacional",
                register="semi-formal",
                unit_ref="b2-unit-3",
            ),
            PhrasebookEntry(
                text="O artesanato português, da filigrana aos bordados da Madeira, reflete séculos de tradição.",
                context="Referir o artesanato tradicional",
                register="formal",
                unit_ref="b2-unit-3",
            ),
            PhrasebookEntry(
                text="As festas dos Santos Populares animam as ruas de Lisboa durante todo o mês de junho.",
                context="Descrever as festas populares lisboetas",
                register="semi-formal",
                unit_ref="b2-unit-3",
            ),
            PhrasebookEntry(
                text="O vinho do Porto e o vinho da Madeira são justamente célebres em todo o mundo.",
                context="Mencionar os vinhos generosos portugueses",
                register="semi-formal",
                unit_ref="b2-unit-3",
            ),
            PhrasebookEntry(
                text="A arquitetura manuelina é um estilo único, que combina o gótico tardio com motivos marítimos.",
                context="Falar sobre o estilo manuelino",
                register="formal",
                unit_ref="b2-unit-3",
            ),
            PhrasebookEntry(
                text="O azulejo português conta histórias nas fachadas de igrejas, palácios e estações de comboio.",
                context="Descrever a tradição azulejar",
                register="semi-formal",
                unit_ref="b2-unit-3",
            ),
            PhrasebookEntry(
                text="A literatura portuguesa oferece vozes tão distintas como Fernando Pessoa, Eça de Queirós e Sophia de Mello Breyner.",
                context="Referir grandes nomes da literatura",
                register="formal",
                unit_ref="b2-unit-3",
            ),
            PhrasebookEntry(
                text="Com mais de oito séculos de história, Portugal tem um riquíssimo património cultural que importa preservar.",
                context="Falar da importância do património",
                register="formal",
                unit_ref="b2-unit-3",
            ),
        ],
    ),
]
