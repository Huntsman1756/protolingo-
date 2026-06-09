"""Italian phrasebook — A2 categories."""

from app.data._types import PhrasebookCategory, PhrasebookEntry

A2_CATEGORIES: list[PhrasebookCategory] = [
    PhrasebookCategory(
        id="restaurant_a2",
        level="A2",
        situation="Al ristorante",
        icon="\U0001f37d\ufe0f",
        phrases=[
            PhrasebookEntry(
                text="Avete un tavolo per due?", context="Chiedere un tavolo", register="neutral"
            ),
            PhrasebookEntry(
                text="Ho prenotato a nome Rossi.",
                context="Dire di aver prenotato",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Posso vedere il men\u00f9?",
                context="Chiedere il men\u00f9",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Cosa mi consiglia?",
                context="Chiedere un consiglio al cameriere",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Prendo gli spaghetti al pomodoro.",
                context="Ordinare un piatto",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Da bere prendo un'acqua naturale.",
                context="Ordinare da bere",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Il conto, per favore.", context="Chiedere il conto", register="neutral"
            ),
            PhrasebookEntry(
                text="\u00c8 tutto buonissimo!",
                context="Fare un complimento al cuoco",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Sono allergico/a a...", context="Avvisare di un'allergia", register="neutral"
            ),
            PhrasebookEntry(
                text="Potrebbe portarmi dell'altro pane?",
                context="Chiedere qualcosa in pi\u00f9",
                register="formal",
            ),
            PhrasebookEntry(
                text="Avete piatti vegetariani?",
                context="Chiedere opzioni vegetariane",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Il coperto \u00e8 incluso?",
                context="Chiedere informazioni sul coperto",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Possiamo dividere il conto?",
                context="Chiedere di dividere il conto",
                register="neutral",
            ),
        ],
    ),
    PhrasebookCategory(
        id="transport_booking_a2",
        level="A2",
        situation="Viaggi e trasporti",
        icon="\U0001f686",
        phrases=[
            PhrasebookEntry(
                text="Un biglietto per Milano, per favore.",
                context="Comprare un biglietto del treno",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Solo andata o andata e ritorno?",
                context="Chiedere tipo di biglietto",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Da quale binario parte?", context="Chiedere il binario", register="neutral"
            ),
            PhrasebookEntry(
                text="Il treno \u00e8 in ritardo.",
                context="Informare di un ritardo",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Dov'\u00e8 la fermata dell'autobus?",
                context="Chiedere della fermata",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Quanto tempo ci vuole?",
                context="Chiedere la durata del viaggio",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Vorrei noleggiare una macchina.",
                context="Noleggiare un'auto",
                register="formal",
            ),
            PhrasebookEntry(
                text="C'\u00e8 un autobus per l'aeroporto?",
                context="Chiedere trasporto per l'aeroporto",
                register="neutral",
            ),
            PhrasebookEntry(
                text="A che ora parte il prossimo treno?",
                context="Chiedere orario del prossimo treno",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Devo cambiare treno?", context="Chiedere coincidenze", register="neutral"
            ),
            PhrasebookEntry(
                text="Dove posso comprare i biglietti?",
                context="Chiedere dove comprare biglietti",
                register="neutral",
            ),
        ],
    ),
    PhrasebookCategory(
        id="weather_talk_a2",
        level="A2",
        situation="Parlare del tempo",
        icon="\U0001f324\ufe0f",
        phrases=[
            PhrasebookEntry(
                text="Che tempo fa oggi?", context="Chiedere del meteo", register="neutral"
            ),
            PhrasebookEntry(
                text="C'\u00e8 il sole.", context="Dire che \u00e8 soleggiato", register="neutral"
            ),
            PhrasebookEntry(text="Sta piovendo.", context="Dire che piove", register="neutral"),
            PhrasebookEntry(
                text="Fa molto caldo oggi.", context="Commentare il caldo", register="neutral"
            ),
            PhrasebookEntry(
                text="Che freddo fa!", context="Commentare il freddo", register="neutral"
            ),
            PhrasebookEntry(
                text="\u00c8 nuvoloso.", context="Descrivere cielo nuvoloso", register="neutral"
            ),
            PhrasebookEntry(
                text="Che bella giornata!",
                context="Commentare una bella giornata",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Domani dovrebbe nevicare.", context="Previsione neve", register="neutral"
            ),
            PhrasebookEntry(
                text="C'\u00e8 vento oggi.", context="Dire che c'\u00e8 vento", register="neutral"
            ),
            PhrasebookEntry(
                text="Che tempo fa domani?",
                context="Chiedere le previsioni del tempo",
                register="neutral",
            ),
        ],
    ),
    PhrasebookCategory(
        id="making_plans_a2",
        level="A2",
        situation="Fare programmi",
        icon="\U0001f4c5",
        phrases=[
            PhrasebookEntry(
                text="Sei libero stasera?",
                context="Chiedere disponibilit\u00e0 (informale)",
                register="informal",
            ),
            PhrasebookEntry(
                text="Ti va di andare al cinema?",
                context="Invitare qualcuno (informale)",
                register="informal",
            ),
            PhrasebookEntry(
                text="A che ora ci vediamo?", context="Accordarsi sull'orario", register="neutral"
            ),
            PhrasebookEntry(
                text="Ci vediamo in piazza alle otto.",
                context="Fissare luogo e ora",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Mi dispiace, non posso.", context="Rifiutare un invito", register="neutral"
            ),
            PhrasebookEntry(
                text="Volentieri! / Con piacere!", context="Accettare un invito", register="neutral"
            ),
            PhrasebookEntry(
                text="Che ne dici di prendere un caff\u00e8?",
                context="Proporre un'attivit\u00e0",
                register="informal",
            ),
            PhrasebookEntry(
                text="Possiamo rimandare a domani?",
                context="Chiedere di posticipare",
                register="neutral",
            ),
            PhrasebookEntry(
                text="A pi\u00f9 tardi!",
                context="Salutare dandosi appuntamento",
                register="informal",
            ),
            PhrasebookEntry(
                text="Ti passo a prendere alle sette.",
                context="Offrire un passaggio",
                register="informal",
            ),
            PhrasebookEntry(
                text="Dove ci incontriamo?",
                context="Chiedere il luogo dell'incontro",
                register="neutral",
            ),
        ],
    ),
    PhrasebookCategory(
        id="feelings_a2",
        level="A2",
        situation="Esprimere emozioni",
        icon="\U0001f60a",
        phrases=[
            PhrasebookEntry(
                text="Sono felice.", context="Esprimere felicit\u00e0", register="neutral"
            ),
            PhrasebookEntry(text="Sono triste.", context="Esprimere tristezza", register="neutral"),
            PhrasebookEntry(
                text="Sono stanco / stanca.", context="Esprimere stanchezza", register="neutral"
            ),
            PhrasebookEntry(text="Ho fame.", context="Esprimere fame", register="neutral"),
            PhrasebookEntry(text="Ho sete.", context="Esprimere sete", register="neutral"),
            PhrasebookEntry(text="Ho paura.", context="Esprimere paura", register="neutral"),
            PhrasebookEntry(
                text="Sono arrabbiato / arrabbiata.", context="Esprimere rabbia", register="neutral"
            ),
            PhrasebookEntry(
                text="Sono preoccupato / preoccupata.",
                context="Esprimere preoccupazione",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Sono emozionato / emozionata!",
                context="Esprimere emozione positiva",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Sono annoiato / annoiata.", context="Esprimere noia", register="neutral"
            ),
            PhrasebookEntry(text="Che stress!", context="Esprimere stress", register="informal"),
        ],
    ),
]
