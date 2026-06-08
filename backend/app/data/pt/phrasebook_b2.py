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
                context="Abertura de email formal (homem)",
                register="formal",
            ),
            PhrasebookEntry(
                text="Exma. Sra. Professora Sousa,",
                context="Abertura de email formal (mulher)",
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
                text="Na sequ\u00eancia do seu email de...",
                context="Referir uma comunica\u00e7\u00e3o anterior",
                register="formal",
            ),
            PhrasebookEntry(
                text="Escrevo para solicitar informa\u00e7\u00f5es sobre...",
                context="Introduzir o objetivo do email",
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
                context="Propor solu\u00e7\u00e3o win-win",
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
                text="Quais s\u00e3o as implica\u00e7\u00f5es deste estudo?",
                context="Discutir as consequ\u00eancias de uma investiga\u00e7\u00e3o",
                register="formal",
            ),
        ],
    ),
]
