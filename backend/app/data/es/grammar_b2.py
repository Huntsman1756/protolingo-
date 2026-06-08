"""Spanish grammar topics — B2."""

from app.data._types import GrammarExample, GrammarMistake, GrammarTopic

B2_GRAMMAR_TOPICS: list[GrammarTopic] = [
    GrammarTopic(
        slug="subjuntivo-imperfecto",
        title="Imperfecto de subjuntivo",
        level="B2",
        category="Subjuntivo",
        summary="Formación y usos del imperfecto de subjuntivo: -ra y -se.",
        explanation='El **imperfecto de subjuntivo** tiene **dos formas** igualmente correctas: terminadas en **-ra** y en **-se**. Ambas se forman a partir de la tercera persona del plural del pretérito indefinido, quitando **-ron** y añadiendo las terminaciones.\n\n| Persona | -ra (hablar) | -se (comer) | -ra (vivir) |\n|--------|-------------|-------------|-------------|\n| yo | hablara | comiese | viviera |\n| tú | hablaras | comieses | vivieras |\n| él/ella/ud. | hablara | comiese | viviera |\n| nosotros | habláramos | comiésemos | viviéramos |\n| vosotros | hablarais | comieseis | vivierais |\n| ellos/ellas/uds. | hablaran | comiesen | vivieran |\n\n**Irregulares**: parten del indefinido irregular en tercera persona plural:\n- tener → tuvieron → tuviera/tuviese\n- hacer → hicieron → hiciera/hiciese\n- decir → dijeron → dijera/dijese\n- pedir → pidieron → pidiera/pidiese\n- dormir → durmieron → durmiera/durmiese\n\nLa forma en -ra es más frecuente en el habla; la forma en -se es más literaria. Se usa en condicionales irreales, tras "ojalá", y en estilo indirecto pasado.',
        structure="3ª pers. pl. del indefinido -ron + -ra/-ras/-ra/-ramos/-rais/-ran (o -se/-ses/-se/-semos/-seis/-sen)",
        rules=[
            "Dos formas: -ra y -se, ambas correctas e intercambiables.",
            "Se forma a partir de la 3ª persona plural del indefinido (sin -ron).",
            "Los verbos irregulares en indefinido mantienen la irregularidad.",
            "La forma en -ra también puede funcionar como pluscuamperfecto de indicativo en registro culto.",
        ],
        examples=[
            GrammarExample(
                text="Si tuviera/tuviese más tiempo, viajaría más.",
                translation="If I had more time, I would travel more.",
            ),
            GrammarExample(
                text="Me pidió que hablara/hablase más despacio.",
                translation="He asked me to speak more slowly.",
            ),
            GrammarExample(
                text="Ojalá lloviera/lloviese mañana.", translation="I wish it would rain tomorrow."
            ),
            GrammarExample(
                text="Era importante que llegáramos/llegásemos a tiempo.",
                translation="It was important that we arrived on time.",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Si tendría tiempo, viajaría.",
                correct="Si tuviera/tuviese tiempo, viajaría.",
                note='Después de "si" condicional se usa imperfecto de subjuntivo, no condicional.',
            ),
            GrammarMistake(
                wrong="Me pidió que hable más despacio.",
                correct="Me pidió que hablara/hablase más despacio.",
                note="Con verbo introductor en pasado se usa imperfecto de subjuntivo.",
            ),
        ],
        related=["subjuntivo-presente", "si-imperfecto-subjuntivo", "subjuntivo-pluscuamperfecto"],
    ),
    GrammarTopic(
        slug="subjuntivo-pluscuamperfecto",
        title="Pluscuamperfecto de subjuntivo",
        level="B2",
        category="Subjuntivo",
        summary="Hubiera/hubiese + participio: condiciones irreales de pasado, reproches, deseos incumplidos.",
        explanation="El **pluscuamperfecto de subjuntivo** se forma con el imperfecto de subjuntivo de **haber** (*hubiera* o *hubiese*) + **participio**. Expresa acciones irreales referidas al pasado.\n\nUsos:\n- **Condiciones irreales de pasado**: *Si **hubiera estudiado**, habría aprobado.*\n- **Deseos sobre un pasado incumplido**: *Ojalá **hubiera ido** al concierto.*\n- **Reproches y lamentos**: *¡Ojalá me **hubieras avisado**!*\n- **Estilo indirecto con anterioridad al verbo en pasado**: *Dijo que cuando llegó ya **hubieran terminado**.* (menos frecuente, se prefiere pluscuamperfecto de indicativo).\n\nEn oraciones condicionales irreales de pasado, la apódosis puede ir en condicional compuesto o también en pluscuamperfecto de subjuntivo:\n- *Si hubiera estudiado, habría aprobado. / ... hubiera aprobado.*",
        structure="hubiera/hubiese + participio",
        rules=[
            "Hubiera/hubiese + participio invariable.",
            "Expresa acción anterior a un punto pasado, con matiz irreal o hipotético.",
            "En condicionales irreales de pasado: prótasis con pluscuamperfecto de subjuntivo.",
            "Las formas hubiera y hubiese son intercambiables.",
        ],
        examples=[
            GrammarExample(
                text="Si hubiera sabido que venías, te habría esperado.",
                translation="If I had known you were coming, I would have waited for you.",
            ),
            GrammarExample(
                text="Ojalá hubiera estudiado español de niño.",
                translation="I wish I had studied Spanish as a child.",
            ),
            GrammarExample(
                text="Me habría gustado que hubieras venido a la boda.",
                translation="I would have liked you to have come to the wedding.",
            ),
            GrammarExample(
                text="Si no hubiese llovido, habríamos ido a la playa.",
                translation="If it hadn't rained, we would have gone to the beach.",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Si habría sabido, habría ido.",
                correct="Si hubiera/hubiese sabido, habría ido.",
                note='En la prótasis con "si" se usa pluscuamperfecto de subjuntivo, no condicional.',
            ),
            GrammarMistake(
                wrong="Ojalá he ido al concierto.",
                correct="Ojalá hubiera/hubiese ido al concierto.",
                note="Deseo sobre pasado incumplido requiere pluscuamperfecto de subjuntivo.",
            ),
        ],
        related=["subjuntivo-imperfecto", "condicional-compuesto", "si-imperfecto-subjuntivo"],
    ),
    GrammarTopic(
        slug="concordancia-temporal",
        title="Concordancia temporal del subjuntivo",
        level="B2",
        category="Subjuntivo",
        summary="Correlación de tiempos entre la oración principal y la subordinada en subjuntivo.",
        explanation="La **concordancia temporal** (o *consecutio temporum*) es la relación obligatoria entre el tiempo de la oración principal y el de la subordinada cuando esta va en subjuntivo.\n\n**Principal en presente o futuro** → subordinada en **presente de subjuntivo** o **pretérito perfecto de subjuntivo**:\n- *Quiero que **vengas**.* (presente → presente subj.)\n- *No creo que **haya venido**.* (presente → perfecto subj.)\n\n**Principal en pasado o condicional** → subordinada en **imperfecto de subjuntivo** o **pluscuamperfecto de subjuntivo**:\n- *Quería que **vinieras**.* (imperfecto → imperfecto subj.)\n- *No creía que **hubiera venido**.* (imperfecto → pluscuamperfecto subj.)\n\nEl tiempo de la subordinada indica **anterioridad, simultaneidad o posterioridad** respecto al verbo principal.",
        rules=[
            "Verbo principal en presente/futuro → subjuntivo presente o perfecto.",
            "Verbo principal en pasado/condicional → subjuntivo imperfecto o pluscuamperfecto.",
            "La elección entre presente/imperfecto o perfecto/pluscuamperfecto depende de la relación temporal.",
            "El condicional cuenta como pasado para la concordancia.",
        ],
        examples=[
            GrammarExample(
                text="Quiero que termines el trabajo hoy.",
                translation="I want you to finish the work today.",
                note="presente → presente subj.",
            ),
            GrammarExample(
                text="Quería que terminaras el trabajo aquel día.",
                translation="I wanted you to finish the work that day.",
                note="pasado → imperfecto subj.",
            ),
            GrammarExample(
                text="No creo que haya llegado todavía.",
                translation="I don't think he has arrived yet.",
                note="presente → perfecto subj.",
            ),
            GrammarExample(
                text="No creía que hubiera llegado todavía.",
                translation="I didn't think he had arrived yet.",
                note="pasado → pluscuamperfecto subj.",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Quería que vengas.",
                correct="Quería que vinieras.",
                note="Con verbo principal en pasado, la subordinada debe ir en imperfecto de subjuntivo.",
            ),
            GrammarMistake(
                wrong="Espero que vinieras ayer.",
                correct="Espero que hayas venido ayer. / Esperaba que vinieras ayer.",
                note="Si el principal está en presente, la acción pasada inmediata va en perfecto de subjuntivo.",
            ),
        ],
        related=["subjuntivo-presente", "subjuntivo-imperfecto", "subjuntivo-pluscuamperfecto"],
    ),
    GrammarTopic(
        slug="perifrasis-aspectuales",
        title="Perífrasis aspectuales",
        level="B2",
        category="Verbos",
        summary="Expresar matices de la acción: empezar a, acabar de, volver a, estar a punto de, seguir + gerundio.",
        explanation="Las **perífrasis aspectuales** modifican el aspecto de la acción verbal: indican si está empezando, en curso, terminando, repitiéndose, etc.\n\n**Inicio de la acción**:\n- *Empezar a / Comenzar a / Ponerse a + infinitivo*: *Empezó a llover. / Se puso a llorar.*\n- *Echarse a + infinitivo* (con verbos de movimiento o emoción): *Se echó a reír.*\n\n**Acción en curso**:\n- *Estar + gerundio*: *Estoy leyendo.*\n- *Seguir / Continuar + gerundio*: *Sigue lloviendo.*\n- *Llevar + gerundio* (duración): *Llevo tres horas estudiando.*\n- *Andar + gerundio* (coloquial, acción intermitente): *Anda diciendo mentiras.*\n\n**Acción terminada o inminente**:\n- *Acabar de + infinitivo*: *Acabo de llegar.* (Recién terminada.)\n- *Dejar de + infinitivo*: *Dejé de fumar.* (Cesar.)\n- *Estar a punto de + infinitivo*: *Está a punto de salir.* (Inminente.)\n- *Tener + participio*: *Tengo leídos tres libros.* (Acumulación.)",
        structure="verbo auxiliar + (preposición/conjunción) + verbo principal (infinitivo/gerundio/participio)",
        rules=[
            "Cada perífrasis tiene una preposición o nexo fijo: empezar a, acabar de, volver a, etc.",
            '"Estar + gerundio" es la más frecuente y expresa acción en desarrollo.',
            '"Acabar de" + infinitivo = acción recién terminada (presente) o que acababa de ocurrir (imperfecto).',
            '"Volver a" + infinitivo = repetición: "Volví a llamar".',
        ],
        examples=[
            GrammarExample(
                text="Acabo de enterarme de la noticia.", translation="I just found out the news."
            ),
            GrammarExample(
                text="Llevamos dos horas esperando.",
                translation="We've been waiting for two hours.",
            ),
            GrammarExample(
                text="Sigue trabajando en el mismo sitio.",
                translation="He keeps working at the same place.",
            ),
            GrammarExample(
                text="Está a punto de empezar la película.",
                translation="The film is about to start.",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Acabo llegar.",
                correct="Acabo de llegar.",
                note='"Acabar" en perífrasis lleva "de".',
            ),
            GrammarMistake(
                wrong="Empecé estudiar.",
                correct="Empecé a estudiar.",
                note='"Empezar" en perífrasis lleva "a".',
            ),
            GrammarMistake(
                wrong="Anda diciendo mentiras.",
                correct="Anda diciendo mentiras.",
                note='Correcto. "Andar + gerundio" es coloquial para acciones intermitentes.',
            ),
        ],
        related=["dejar-de-seguir", "perifrasis-modales", "presente-regular"],
    ),
    GrammarTopic(
        slug="perifrasis-modales",
        title="Perífrasis modales",
        level="B2",
        category="Verbos",
        summary="Expresar obligación, necesidad o posibilidad: tener que, deber, hay que, poder, deber de.",
        explanation="Las **perífrasis modales** expresan la actitud del hablante ante la acción: obligación, probabilidad, capacidad, permiso.\n\n**Obligación y necesidad**:\n- *Tener que + infinitivo*: obligación personal, la más común. *Tengo que terminar esto.*\n- *Deber + infinitivo*: obligación moral o consejo. *Debes respetar las normas.*\n- *Hay que + infinitivo*: obligación impersonal. *Hay que estudiar para aprobar.*\n- *Hacer falta + infinitivo*: necesidad. *Hace falta comprar pan.*\n\n**Probabilidad**:\n- *Deber de + infinitivo*: conjetura. *Deben de ser las diez.* (Probablemente son las diez.)\n\n**Capacidad y permiso**:\n- *Poder + infinitivo*: capacidad o permiso. *Puedo nadar. / ¿Puedo salir?*\n\nLa diferencia entre *deber + infinitivo* (obligación) y *deber de + infinitivo* (probabilidad) se mantiene en el registro culto, aunque en el habla coloquial se usa indistintamente.",
        structure="verbo modal + (preposición) + infinitivo",
        rules=[
            '"Tener que" = obligación personal.',
            '"Hay que" = obligación impersonal, general.',
            '"Deber" + infinitivo = obligación; "deber de" + infinitivo = conjetura.',
            '"Poder" expresa capacidad y permiso; va sin preposición.',
        ],
        examples=[
            GrammarExample(
                text="Tienes que ver esta película, es genial.",
                translation="You have to see this film, it's great.",
            ),
            GrammarExample(
                text="Hay que reciclar para proteger el medio ambiente.",
                translation="One must recycle to protect the environment.",
            ),
            GrammarExample(
                text="Deben de estar dormidos, no contestan.",
                translation="They must be asleep, they don't answer.",
                note="conjetura",
            ),
            GrammarExample(
                text="No hace falta que vengas tan temprano.",
                translation="You don't need to come so early.",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Hay que reciclar.",
                correct="Hay que reciclar.",
                note='Correcto. "Hay que" es impersonal; no se conjuga para personas específicas.',
            ),
            GrammarMistake(
                wrong="Deben de llegar temprano mañana.",
                correct="Deben llegar temprano mañana.",
                note='Para obligación: "deber + infinitivo". "Deber de" es conjetura.',
            ),
        ],
        related=["perifrasis-aspectuales", "querer-poder", "imperativo-afirmativo"],
    ),
    GrammarTopic(
        slug="dejar-de-seguir",
        title="Dejar de y seguir + gerundio",
        level="B2",
        category="Verbos",
        summary="Dejar de + infinitivo (cesar) vs. seguir/continuar + gerundio (continuar).",
        explanation='**Dejar de** y **seguir** expresan el cese y la continuación de una acción:\n\n**Dejar de + infinitivo**: interrumpir definitivamente una acción habitual.\n- *Dejé de fumar hace dos años.*\n- *No dejes de llamarme.* (imperativo negativo: no ceses de llamar.)\n\n**Seguir / Continuar + gerundio**: acción que no se ha interrumpido.\n- *Sigo viviendo en el mismo barrio.*\n- *A pesar de la lluvia, continuaron jugando.*\n\nContraste:\n- *Dejé de trabajar a las seis.* → Cesé de trabajar.\n- *Seguí trabajando hasta las diez.* → Continué trabajando.\n\n**Dejar sin de + infinitivo** significa "permitir": *Déjame hablar.* (permitir, no cesar.)',
        structure="dejar de + infinitivo (cesar) · seguir/continuar + gerundio (continuar)",
        rules=[
            '"Dejar de + infinitivo" = cesar una acción.',
            '"Seguir/Continuar + gerundio" = mantener una acción en curso.',
            '"No dejar de" en imperativo = instar a no cesar: "No dejes de escribirme".',
            '"Dejar + infinitivo" (sin de) = permitir: "Déjame explicarte".',
        ],
        examples=[
            GrammarExample(
                text="Dejé de comer carne hace un año.",
                translation="I stopped eating meat a year ago.",
            ),
            GrammarExample(
                text="Sigo pensando que tienes razón.", translation="I still think you're right."
            ),
            GrammarExample(
                text="No dejes de practicar español todos los días.",
                translation="Don't stop practicing Spanish every day.",
            ),
            GrammarExample(
                text="Continuaron hablando hasta muy tarde.",
                translation="They kept talking until very late.",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Dejé fumar.",
                correct="Dejé de fumar.",
                note='"Dejar" con sentido de cesar necesita "de".',
            ),
            GrammarMistake(
                wrong="Sigo a trabajar aquí.",
                correct="Sigo trabajando aquí.",
                note='"Seguir" con sentido de continuar rige gerundio sin preposición.',
            ),
        ],
        related=["perifrasis-aspectuales", "perifrasis-modales", "presente-regular"],
    ),
    GrammarTopic(
        slug="conectores-avanzados",
        title="Conectores avanzados",
        level="B2",
        category="Oraciones",
        summary="Conectores para la cohesión textual: no obstante, en cambio, por consiguiente, en efecto, asimismo.",
        explanation="Los **conectores avanzados** elevan la formalidad y la precisión del discurso. Se usan en textos académicos, argumentativos y profesionales.\n\n**Adición**: *asimismo, igualmente, del mismo modo, por añadidura, es más*\n- *Es inteligente; es más, es brillante.*\n\n**Contraste y oposición**: *no obstante, en cambio, por el contrario, ahora bien, con todo, aun así*\n- *Hizo frío; no obstante, salimos.*\n\n**Consecuencia**: *por consiguiente, en consecuencia, de modo que, de manera que, así pues*\n- *No estudió; por consiguiente, suspendió.*\n\n**Reafirmación y explicación**: *en efecto, efectivamente, es decir, o sea, esto es, a saber*\n- *La situación, en efecto, era grave.*\n\n**Orden del discurso**: *en primer lugar, por último, para terminar, en resumen, en conclusión*",
        rules=[
            '"No obstante" = "sin embargo", formal.',
            '"En cambio" para contrastar dos realidades diferentes.',
            '"Por consiguiente" = consecuencia lógica, formal.',
            '"En efecto" confirma o reafirma lo dicho anteriormente.',
            "Los conectores suelen ir entre comas cuando se insertan en la oración.",
        ],
        examples=[
            GrammarExample(
                text="El proyecto es ambicioso; no obstante, confiamos en su éxito.",
                translation="The project is ambitious; nevertheless, we trust in its success.",
            ),
            GrammarExample(
                text="A mí me encanta el campo. Mi hermana, en cambio, prefiere la ciudad.",
                translation="I love the countryside. My sister, on the other hand, prefers the city.",
            ),
            GrammarExample(
                text="No se presentaron pruebas; por consiguiente, el caso fue desestimado.",
                translation="No evidence was presented; consequently, the case was dismissed.",
            ),
            GrammarExample(
                text="Los resultados han sido positivos. En efecto, hemos superado las expectativas.",
                translation="The results have been positive. Indeed, we have exceeded expectations.",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="No obstante, de la lluvia, salimos.",
                correct="A pesar de la lluvia, salimos. / Llovía; no obstante, salimos.",
                note='"No obstante" es conector oracional, no preposición.',
            ),
        ],
        related=["cohesion-textual", "conectores-argumentativos", "estructura-argumentativa"],
    ),
    GrammarTopic(
        slug="cohesion-textual",
        title="Cohesión textual",
        level="B2",
        category="Oraciones",
        summary="Mecanismos para unir ideas en un texto: anáfora, catáfora, elipsis, sustitución léxica.",
        explanation='La **cohesión textual** es la propiedad que permite que las ideas de un texto estén conectadas de forma fluida. Se logra mediante varios mecanismos:\n\n**Referencia (anáfora y catáfora)**:\n- *Anáfora*: pronombre que remite a algo ya mencionado. *María llegó tarde. **Ella** siempre lo hace.*\n- *Catáfora*: pronombre que anticipa lo que se va a decir. *Te lo digo: **esto no funciona**.*\n\n**Sustitución léxica (sinónimos, hiperónimos)**:\n- *El **presidente** anunció medidas. El **mandatario** comparecerá mañana.*\n\n**Elipsis**:\n- Omitir elementos que se sobreentienden. *— ¿Quieres café? — Sí, quiero.* (elipsis de "café").\n\n**Conectores y marcadores discursivos**:\n- Unen párrafos y oraciones creando relaciones lógicas.',
        rules=[
            "La anáfora usa pronombres para evitar repeticiones.",
            "Los sinónimos e hiperónimos evitan la repetición y enriquecen el texto.",
            "La elipsis es frecuente en respuestas y diálogos.",
            "Los conectores discursivos guían al lector entre ideas.",
        ],
        examples=[
            GrammarExample(
                text="Compré un libro. Lo estoy leyendo ahora.",
                translation="I bought a book. I'm reading it now.",
                note="anáfora: lo → libro",
            ),
            GrammarExample(
                text="Te lo repito: no voy a ir.",
                translation="I repeat it to you: I'm not going.",
                note='catáfora: lo anticipa "no voy a ir"',
            ),
            GrammarExample(
                text="El león es un felino. Este animal vive en la sabana.",
                translation="The lion is a feline. This animal lives in the savannah.",
                note="sustitución léxica",
            ),
            GrammarExample(
                text="— ¿Vas a venir? — Sí.",
                translation='"Are you coming?" "Yes."',
                note='elipsis: se omite "voy a venir"',
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="María y Ana fueron. Ella llegó tarde.",
                correct="María y Ana fueron. María/Ana llegó tarde.",
                note="Cuando hay ambigüedad, es mejor repetir el nombre que usar un pronombre poco claro.",
            ),
        ],
        related=["conectores-avanzados", "estructura-argumentativa", "que-relativo"],
    ),
    GrammarTopic(
        slug="registro-formal",
        title="Registro formal y coloquial",
        level="B2",
        category="Avanzado",
        summary="Diferencias entre el español formal e informal: vocabulario, tratamiento, estructuras.",
        explanation="El **registro** es la adaptación del lenguaje a la situación comunicativa. En español se distinguen varios niveles:\n\n**Registro formal**:\n- Uso de *usted/ustedes* en lugar de *tú/vosotros*.\n- Evitar contracciones coloquiales (*pa'* en lugar de *para*).\n- Vocabulario preciso y técnico.\n- Oraciones más largas y complejas.\n- Uso de pasiva refleja y estructuras impersonales.\n- Conectores formales (*no obstante, por consiguiente*).\n- *¿Podría decirme la hora?* en lugar de *¿Qué hora es?*\n\n**Registro coloquial**:\n- Uso de *tú/vos* y *vosotros/ustedes*.\n- Muletillas: *bueno, pues, o sea, ¿vale?, en plan, tipo...*\n- Frases hechas y expresiones idiomáticas.\n- Elipsis y frases inacabadas.\n- Diminutivos: *cafecito, momentito*.\n\nLa elección del registro depende del contexto, la relación entre interlocutores y la situación.",
        rules=[
            '"Usted" marca formalidad; "tú" marca cercanía. El uso varía por país.',
            "El registro formal evita muletillas y coloquialismos.",
            "En textos escritos formales se prefieren estructuras impersonales y pasivas.",
            "En situaciones informales se usan más las perífrasis que los tiempos compuestos.",
        ],
        examples=[
            GrammarExample(
                text="¿Podría indicarme dónde está la estación?",
                translation="Could you tell me where the station is?",
                note="formal",
            ),
            GrammarExample(
                text="Oye, ¿sabes dónde está la estación?",
                translation="Hey, do you know where the station is?",
                note="coloquial",
            ),
            GrammarExample(
                text="Le agradecería que me enviara la documentación.",
                translation="I would appreciate it if you sent me the documentation.",
                note="formal",
            ),
            GrammarExample(
                text="Mándame los papeles cuando puedas.",
                translation="Send me the papers when you can.",
                note="coloquial",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="¿Puedes decirme la hora, señor director?",
                correct="¿Podría decirme la hora, señor director?",
                note='Con un superior o en contexto formal, se usa "usted" y formas de cortesía.',
            ),
        ],
        related=["modismos-comunes", "expresiones-coloquiales", "estructura-argumentativa"],
    ),
    GrammarTopic(
        slug="modismos-comunes",
        title="Modismos comunes del español",
        level="B2",
        category="Avanzado",
        summary="Expresiones idiomáticas frecuentes: estar en las nubes, meter la pata, ser pan comido.",
        explanation="Los **modismos** son expresiones fijas cuyo significado no se deduce de las palabras que las componen. Son fundamentales para sonar natural.\n\n**Modismos con partes del cuerpo**:\n- *Costar un ojo de la cara* → ser muy caro.\n- *No tener pelos en la lengua* → ser muy directo.\n- *Echar una mano* → ayudar.\n- *Meter la pata* → equivocarse.\n- *Estar hasta las narices* → estar harto.\n\n**Modismos con animales**:\n- *Ser un gallina* → ser cobarde.\n- *Estar como una cabra* → estar loco.\n- *Pagar el pato* → cargar con la culpa.\n\n**Modismos con comida**:\n- *Ser pan comido* → ser muy fácil.\n- *Dar calabazas* → rechazar a alguien.\n- *Ponerse como un tomate* → sonrojarse.\n\nLos modismos varían enormemente entre países. Un mismo significado puede expresarse con modismos distintos en España y Latinoamérica.",
        rules=[
            "Los modismos son expresiones fijas; no se pueden modificar sus elementos.",
            "Muchos modismos no son literales y deben aprenderse de memoria.",
            "Varían mucho entre regiones; un modismo español puede no entenderse en México.",
            "En registros formales se evitan los modismos.",
        ],
        examples=[
            GrammarExample(
                text="Ese coche cuesta un ojo de la cara.",
                translation="That car costs an arm and a leg.",
            ),
            GrammarExample(
                text="Metí la pata al decirle su edad.",
                translation="I put my foot in it by telling him his age.",
            ),
            GrammarExample(
                text="El examen fue pan comido.", translation="The exam was a piece of cake."
            ),
            GrammarExample(
                text="¿Me echas una mano con las cajas?",
                translation="Can you give me a hand with the boxes?",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Esa casa cuesta un ojo.",
                correct="Esa casa cuesta un ojo de la cara.",
                note='El modismo completo es "costar un ojo de la cara".',
            ),
            GrammarMistake(
                wrong="Puse la pata.",
                correct="Metí la pata.",
                note='El modismo es "meter la pata", no "poner la pata".',
            ),
        ],
        related=["expresiones-coloquiales", "refranes", "registro-formal"],
    ),
    GrammarTopic(
        slug="expresiones-coloquiales",
        title="Expresiones coloquiales",
        level="B2",
        category="Avanzado",
        summary="Muletillas, coletillas y expresiones del español cotidiano: pues, o sea, en plan, vale, venga.",
        explanation="Las **expresiones coloquiales** son palabras y frases propias de la conversación informal. Dan fluidez, cercanía y naturalidad al discurso.\n\n**Muletillas conversacionales**:\n- *Pues... / Bueno...* → para ganar tiempo o suavizar.\n- *O sea... / Es decir...* → reformular.\n- *¿Vale? / ¿Sabes? / ¿No?* → buscar confirmación.\n- *En plan...* → introducir explicación (muy coloquial, especialmente en España).\n- *Venga / Vamos* → ánimo o cierre de conversación.\n\n**Coletillas y expresiones de reacción**:\n- *¡Qué fuerte! / ¡Qué barbaridad!* → sorpresa.\n- *¡Anda! / ¡Vaya!* → sorpresa o decepción.\n- *¡Qué guay! / ¡Qué chulo!* → aprobación (España).\n- *¡Qué padre! / ¡Qué chévere!* → aprobación (México / varios países).\n- *¡Qué rollo!* → aburrimiento o fastidio (España).",
        rules=[
            "Las muletillas son propias del registro oral e informal.",
            'Varían mucho entre países; "guay" es típico de España, "chévere" de Latinoamérica.',
            '"En plan" es muy coloquial y juvenil; evitar en contextos formales.',
            '"Vale" como afirmación es típico de España; en América se usa "OK", "dale", "listo", "ya".',
        ],
        examples=[
            GrammarExample(
                text="Pues... no sé qué decirte.",
                translation="Well... I don't know what to tell you.",
            ),
            GrammarExample(
                text="O sea, que al final no vienes.",
                translation="So, in the end you're not coming.",
            ),
            GrammarExample(
                text="¡Qué guay! Me encanta tu casa nueva.",
                translation="How cool! I love your new house.",
                note="España",
            ),
            GrammarExample(
                text='Estaba en plan "no me hables" y yo en plan "pues vale".',
                translation='He was like "don\'t talk to me" and I was like "whatever".',
                note="muy coloquial",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="¡Qué guay! Me encanta tu casa.",
                correct="¡Qué guay! / ¡Qué chévere! / ¡Qué padre!",
                note="Correcto en España. En Latinoamérica usar expresiones locales equivalentes.",
            ),
        ],
        related=["modismos-comunes", "registro-formal", "espanol-latinoamerica"],
    ),
    GrammarTopic(
        slug="refranes",
        title="Refranes en español",
        level="B2",
        category="Avanzado",
        summary="Proverbios populares que reflejan la sabiduría tradicional hispana.",
        explanation="Los **refranes** son frases sentenciosas de origen popular que expresan una enseñanza o consejo. Forman parte importante de la cultura hispana.\n\n**Refranes sobre el tiempo**:\n- *A quien madruga, Dios le ayuda.* → El esfuerzo temprano tiene recompensa.\n- *No por mucho madrugar amanece más temprano.* → La impaciencia no acelera los procesos.\n- *Al mal tiempo, buena cara.* → Mantener el ánimo en la adversidad.\n\n**Refranes sobre prudencia**:\n- *Más vale pájaro en mano que ciento volando.* → Es mejor asegurar lo seguro.\n- *A caballo regalado no le mires el diente.* → No critiques los regalos.\n- *El que mucho abarca, poco aprieta.* → No intentes hacer demasiado a la vez.\n\n**Refranes sobre relaciones**:\n- *Dime con quién andas y te diré quién eres.* → Las compañías reflejan la persona.\n- *En boca cerrada no entran moscas.* → A veces es mejor callar.",
        rules=[
            "Los refranes son expresiones fijas; no se modifican.",
            "A menudo usan metáforas y rimas para ser memorables.",
            "Son propios del registro informal y conversacional.",
            "Muchos refranes tienen equivalentes en otras lenguas pero con imágenes diferentes.",
        ],
        examples=[
            GrammarExample(
                text="A quien madruga, Dios le ayuda.",
                translation="The early bird catches the worm.",
            ),
            GrammarExample(text="Más vale tarde que nunca.", translation="Better late than never."),
            GrammarExample(
                text="No hay mal que por bien no venga.",
                translation="Every cloud has a silver lining.",
            ),
            GrammarExample(
                text="En boca cerrada no entran moscas.", translation="Silence is golden."
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Más vale pájaro que cien volando.",
                correct="Más vale pájaro en mano que ciento volando.",
                note='La forma correcta incluye "en mano" para contrastar lo seguro con lo incierto.',
            ),
        ],
        related=["modismos-comunes", "expresiones-coloquiales", "metaforas"],
    ),
    GrammarTopic(
        slug="estructura-argumentativa",
        title="Estructura argumentativa",
        level="B2",
        category="Oraciones",
        summary="Construir argumentos sólidos: tesis, argumentos, contraargumentos y conclusión.",
        explanation="Un **texto argumentativo** bien estructurado sigue una organización lógica:\n\n**1. Introducción – Tesis**:\n  Presenta el tema y la postura del autor de forma clara.\n  *En mi opinión, el teletrabajo debería ser una opción permanente.*\n\n**2. Desarrollo – Argumentos**:\n  Cada párrafo desarrolla una idea a favor con datos, ejemplos o razonamientos.\n  *En primer lugar, el teletrabajo reduce los desplazamientos...*\n  *Además, permite una mayor conciliación familiar...*\n\n**3. Contraargumentación**:\n  Se anticipan y refutan objeciones.\n  *Algunos sostienen que afecta a la productividad; sin embargo, los estudios demuestran...*\n\n**4. Conclusión**:\n  Resume la postura y refuerza la tesis.\n  *En conclusión, los beneficios del teletrabajo superan sus inconvenientes.*\n\nConectores: *en primer lugar, asimismo, por otra parte, sin embargo, en conclusión*.",
        rules=[
            "Toda argumentación parte de una tesis clara.",
            "Los argumentos deben estar respaldados por evidencia o razonamiento lógico.",
            "La contraargumentación fortalece el texto al anticipar objeciones.",
            "La conclusión no introduce ideas nuevas; sintetiza lo expuesto.",
        ],
        examples=[
            GrammarExample(
                text="En mi opinión, estudiar idiomas desde pequeños es fundamental. En primer lugar, los niños tienen mayor plasticidad cerebral. Además, adquirir una segunda lengua favorece el desarrollo cognitivo.",
                translation="In my opinion, learning languages from an early age is essential. First, children have greater brain plasticity. Moreover, acquiring a second language favors cognitive development.",
            ),
            GrammarExample(
                text="Hay quienes opinan que la tecnología aísla a las personas. No obstante, bien utilizada, facilita la comunicación y acerca a quienes están lejos.",
                translation="Some people think that technology isolates people. However, when used well, it facilitates communication and brings closer those who are far away.",
            ),
        ],
        common_mistakes=[],
        related=["contraargumentacion", "matizadores", "conectores-avanzados"],
    ),
    GrammarTopic(
        slug="contraargumentacion",
        title="Contraargumentación",
        level="B2",
        category="Oraciones",
        summary="Técnicas para refutar ideas: concesión, objeción y refutación.",
        explanation="La **contraargumentación** anticipa y responde a objeciones a la tesis defendida. Fortalece la argumentación al demostrar que se han considerado otros puntos de vista.\n\n**Estructura de la contraargumentación**:\n\n1. **Concesión** (reconocer parte de razón):\n   - *Es cierto que... / Admito que... / Reconozco que...*\n   - *Es cierto que el cambio climático tiene causas naturales, pero...*\n\n2. **Objeción** (presentar el argumento contrario):\n   - *Sin embargo, hay que tener en cuenta que...*\n   - *No obstante, esta visión olvida que...*\n\n3. **Refutación** (desmontar el argumento contrario):\n   - *Pero la evidencia demuestra que...*\n   - *Con todo, los datos indican lo contrario.*\n\nConectores útiles: *si bien, a pesar de que, aunque, con todo, aun así, pese a que, por más que, ahora bien*.",
        rules=[
            "La concesión muestra respeto por la opinión contraria.",
            "La refutación debe basarse en hechos, no en descalificaciones.",
            'Estructura típica: "Aunque + objeción, + tesis" o "tesis + a pesar de que + objeción".',
            "Usar conectores concesivos para introducir la voz contraria.",
        ],
        examples=[
            GrammarExample(
                text="Aunque es cierto que las redes sociales pueden ser adictivas, su uso responsable ofrece grandes beneficios educativos y sociales.",
                translation="Although it's true that social media can be addictive, its responsible use offers great educational and social benefits.",
            ),
            GrammarExample(
                text="Reconozco que la medida es costosa. Sin embargo, los beneficios a largo plazo justifican la inversión.",
                translation="I acknowledge that the measure is expensive. However, the long-term benefits justify the investment.",
            ),
        ],
        common_mistakes=[],
        related=["estructura-argumentativa", "matizadores", "conectores-avanzados"],
    ),
    GrammarTopic(
        slug="matizadores",
        title="Matizadores discursivos",
        level="B2",
        category="Oraciones",
        summary="Atenuar o reforzar afirmaciones: quizás, en cierto modo, sin duda, indudablemente.",
        explanation="Los **matizadores** son elementos lingüísticos que permiten modular la fuerza de una afirmación:\n\n**Atenuadores** (suavizan la afirmación):\n- *Quizás, tal vez, a lo mejor, probablemente, posiblemente*\n- *En cierto modo, hasta cierto punto, en cierta medida*\n- *Me parece que, creo que, diría que, tengo la impresión de que*\n- *Un poco, algo, más bien, como que*\n\n**Intensificadores** (refuerzan la afirmación):\n- *Sin duda, indudablemente, sin lugar a dudas*\n- *Es evidente que, está claro que, es obvio que*\n- *Totalmente, absolutamente, completamente*\n- *Desde luego, por supuesto, ni que decir tiene*\n\nEl uso de matizadores refleja la postura del hablante y su grado de certeza. En español es frecuente atenuar para ser cortés o evitar imponerse, mientras que en inglés se tiende a ser más directo.",
        rules=[
            "Los atenuadores suavizan la fuerza de lo dicho; útiles para ser cortés o cauteloso.",
            "Los intensificadores muestran seguridad y convicción.",
            'En contextos académicos se prefiere atenuar con "parece que" en lugar de afirmar categóricamente.',
            '"Sin duda" y equivalentes solo se usan cuando hay certeza total.',
        ],
        examples=[
            GrammarExample(
                text="Quizás deberíamos considerar otras opciones.",
                translation="Perhaps we should consider other options.",
                note="atenuador",
            ),
            GrammarExample(
                text="Sin duda, este es el mejor restaurante de la ciudad.",
                translation="Without a doubt, this is the best restaurant in the city.",
                note="intensificador",
            ),
            GrammarExample(
                text="Me parece que no es la mejor solución.",
                translation="I think it's not the best solution.",
                note="atenuador",
            ),
            GrammarExample(
                text="Está claro que tenemos que actuar ya.",
                translation="It's clear that we have to act now.",
                note="intensificador",
            ),
        ],
        common_mistakes=[],
        related=["estructura-argumentativa", "contraargumentacion", "conectores-avanzados"],
    ),
    GrammarTopic(
        slug="tiempos-narrativos",
        title="Tiempos narrativos",
        level="B2",
        category="Tiempos verbales",
        summary="Dominar la narración: alternancia de imperfecto, indefinido y pluscuamperfecto.",
        explanation="Una **narración** bien construida combina varios tiempos para crear profundidad temporal:\n\n**Presente narrativo o histórico**:\n- Da inmediatez a hechos pasados: *Colón **llega** a las costas de Guanahaní en 1492.*\n\n**Imperfecto**: trasfondo, descripción, circunstancias:\n- *Era una noche lluviosa. Los relámpagos iluminaban el cielo.*\n\n**Indefinido**: eventos principales que hacen avanzar la acción:\n- *De pronto, la puerta **chirrió** y una sombra **apareció** en el umbral.*\n\n**Pluscuamperfecto**: lo ya ocurrido antes del momento narrado:\n- *Nunca **había sentido** tanto miedo como aquella noche.*\n\n**Pretérito perfecto**: valoración o comentario desde el presente:\n- *Y esa es la historia más aterradora que **he vivido**.*",
        rules=[
            "El presente narrativo da viveza al relato pero debe usarse de forma consistente.",
            "Imperfecto = fondo; indefinido = acción. Combinarlos crea ritmo narrativo.",
            "Pluscuamperfecto para flashbacks dentro de un relato en pasado.",
            "Los diálogos en una narración usan los tiempos normales del habla.",
        ],
        examples=[
            GrammarExample(
                text="Era una noche oscura. El viento soplaba con fuerza. De repente, escuché un ruido. Alguien había entrado en la casa.",
                translation="It was a dark night. The wind was blowing hard. Suddenly, I heard a noise. Someone had entered the house.",
            ),
            GrammarExample(
                text="Napoleón nace en Córcega en 1769. A los dieciséis años ingresa en la academia militar.",
                translation="Napoleon is born in Corsica in 1769. At sixteen he enters the military academy.",
                note="presente histórico",
            ),
        ],
        common_mistakes=[],
        related=["secuencia-temporal", "imperfecto", "preterito-vs-imperfecto", "pluscuamperfecto"],
    ),
    GrammarTopic(
        slug="descripcion-literaria",
        title="Descripción literaria",
        level="B2",
        category="Avanzado",
        summary="Técnicas para describir ambientes y personajes con riqueza expresiva.",
        explanation="La **descripción literaria** va más allá de enumerar rasgos: busca crear una impresión sensorial y emocional en el lector.\n\n**Técnicas descriptivas**:\n\n1. **Adjetivación**: uso de adjetivos antepuestos (valorativos) y pospuestos (especificativos).\n   - *La **blanca** nieve cubría las **calles empedradas**.*\n\n2. **Imágenes sensoriales**: apelar a los cinco sentidos.\n   - *El aroma **dulzón** de las rosas se mezclaba con el **tintineo** lejano de una guitarra.*\n\n3. **Símil y metáfora**: comparaciones que enriquecen la imagen.\n   - *Sus ojos **eran como dos luceros**. / El mar **era un espejo**.*\n\n4. **Enumeración y gradación**: acumular detalles en orden creciente o decreciente.\n   - *Era un pueblo pequeño, tranquilo, casi deshabitado.*\n\nVerbos descriptivos en imperfecto: *era, estaba, había, parecía, se alzaba, se extendía*.",
        rules=[
            "Usar imperfecto para descripciones estáticas de fondo.",
            "La adjetivación antepuesta suele ser valorativa; la pospuesta, objetiva.",
            "Combinar sensaciones (vista, oído, olfato, tacto, gusto) para mayor inmersión.",
            "Evitar la acumulación excesiva de adjetivos que ralentice la narración.",
        ],
        examples=[
            GrammarExample(
                text="El sol se ocultaba tras las montañas, tiñendo el cielo de tonos anaranjados y violetas. Una brisa cálida mecía las hojas de las palmeras.",
                translation="The sun was setting behind the mountains, dyeing the sky with orange and violet tones. A warm breeze swayed the palm leaves.",
            ),
            GrammarExample(
                text="Era una mujer alta, de andar pausado y mirada serena. Su voz, grave y melodiosa, inspiraba confianza.",
                translation="She was a tall woman, with a slow walk and a serene gaze. Her voice, deep and melodious, inspired trust.",
            ),
        ],
        common_mistakes=[],
        related=["metaforas", "tiempos-narrativos", "figuras-literarias"],
    ),
    GrammarTopic(
        slug="metaforas",
        title="Metáforas y símiles en español",
        level="B2",
        category="Avanzado",
        summary="Recursos literarios para embellecer el discurso: metáfora, símil, personificación, hipérbole.",
        explanation='Las **figuras retóricas** enriquecen el discurso cotidiano y literario:\n\n**Símil o comparación**: compara dos elementos con "como" o "parece".\n- *Eres **como** un sol. / Duerme **como** un lirón.*\n\n**Metáfora**: identifica dos elementos sin nexo comparativo.\n- *Tus ojos **son** dos estrellas.* (metáfora impura, con "ser")\n- *Las perlas de tu boca.* (metáfora pura: dientes = perlas)\n\n**Personificación**: atribuir cualidades humanas a objetos o animales.\n- *El viento **susurraba** entre los árboles.*\n\n**Hipérbole**: exageración.\n- *Te lo he dicho **un millón de veces**.*\n- *Me muero de hambre.*\n\n**Metonimia**: designar una cosa con el nombre de otra por relación.\n- *Se bebió **una botella**.* (el contenido por el continente)\n\nEn el español cotidiano abundan las metáforas fosilizadas: *romper el hielo, lluvia de ideas, estar en una nube, el tiempo vuela*.',
        rules=[
            'El símil usa "como" o "parece"; la metáfora identifica sin nexo.',
            "La personificación es muy frecuente en la lengua coloquial.",
            "Las metáforas fosilizadas se usan sin conciencia de su origen literario.",
            "En registros formales se prefiere la metáfora original a la frase hecha.",
        ],
        examples=[
            GrammarExample(
                text="Está que echa chispas.", translation="He's fuming.", note="metáfora coloquial"
            ),
            GrammarExample(
                text="El tiempo es oro.", translation="Time is gold/money.", note="metáfora"
            ),
            GrammarExample(
                text="Eres más lento que una tortuga.",
                translation="You're slower than a turtle.",
                note="símil",
            ),
            GrammarExample(
                text="Las estrellas nos miraban desde el cielo.",
                translation="The stars were watching us from the sky.",
                note="personificación",
            ),
        ],
        common_mistakes=[],
        related=["descripcion-literaria", "figuras-literarias", "modismos-comunes"],
    ),
    GrammarTopic(
        slug="lenguaje-periodistico",
        title="Lenguaje periodístico",
        level="B2",
        category="Avanzado",
        summary="Características del español de los medios: objetividad, concisión, titulares, voz pasiva.",
        explanation="El **lenguaje periodístico** tiene rasgos propios que lo distinguen:\n\n**Características**:\n- **Concisión y claridad**: frases cortas, una idea por párrafo.\n- **Objetividad aparente**: uso de tercera persona, voz pasiva, se impersonal.\n- **Estructura de pirámide invertida**: lo más importante al principio.\n\n**Titulares**:\n- Suprimen artículos y verbos auxiliares: *Detenido el presunto ladrón.*\n- Uso frecuente de participios y nominalizaciones.\n- Prefieren el presente para dar inmediatez: *El presidente **viaja** hoy a Bruselas.*\n\n**Fórmulas periodísticas**:\n- *Según fuentes... / De acuerdo con... / Al parecer...*\n- *Se ha producido un... / Ha tenido lugar...*\n- *En declaraciones a este medio...*\n\n**Géneros**: noticia, reportaje, crónica, entrevista, editorial, columna de opinión. Cada uno tiene convenciones propias.",
        rules=[
            "Los titulares omiten artículos y usan presente por pasado.",
            'La voz pasiva y el "se" impersonal son frecuentes para mantener objetividad.',
            '"Según" y "de acuerdo con" para citar fuentes sin comprometerse.',
            "Las noticias no incluyen opiniones del periodista; los editoriales sí.",
        ],
        examples=[
            GrammarExample(
                text="Aprobada la nueva ley de educación tras un intenso debate parlamentario.",
                translation="New education law approved after intense parliamentary debate.",
                note="titular: participio + sujeto",
            ),
            GrammarExample(
                text="Según fuentes cercanas al gobierno, la medida se anunciará la próxima semana.",
                translation="According to sources close to the government, the measure will be announced next week.",
            ),
        ],
        common_mistakes=[],
        related=["titulares", "discurso-reportado", "voz-pasiva", "se-impersonal"],
    ),
    GrammarTopic(
        slug="titulares",
        title="Titulares periodísticos",
        level="B2",
        category="Avanzado",
        summary="Cómo leer y entender los titulares de prensa en español.",
        explanation='Los **titulares** en español tienen una gramática peculiar, diseñada para la brevedad y el impacto:\n\n**Omisión de artículos**:\n- *Gobierno anuncia nuevas medidas.* (no "El gobierno...")\n- *Policía detiene a tres sospechosos.*\n\n**Participio sin auxiliar**:\n- *Hallado el cuerpo de un montañero desaparecido.* (= Ha sido hallado)\n- *Heridas dos personas en un accidente de tráfico.*\n\n**Presente por pasado o futuro**:\n- *Fallece el actor a los 85 años.* (por falleció)\n- *La ONU debate hoy la crisis climática.*\n\n**Infinitivo para acciones futuras**:\n- *Abrir un nuevo hospital en la zona norte.* (= Se abrirá / Van a abrir)\n\n**Estilo nominal**:\n- *Protestas masivas en el centro de la capital.* (sin verbo)\n\n**Dos puntos** para separar tema y comentario:\n- *Crisis energética: el gobierno busca soluciones urgentes.*',
        rules=[
            "En titulares se omiten artículos y auxiliares.",
            "El participio suelto equivale a pasiva.",
            "El presente da inmediatez a hechos pasados.",
            "El infinitivo anuncia acciones futuras con tono neutro.",
            'Los dos puntos sustituyen al verbo "ser" o introducen explicación.',
        ],
        examples=[
            GrammarExample(
                text="Rescatados diez inmigrantes en la costa de Almería.",
                translation="Ten immigrants rescued off the coast of Almería.",
                note="participio suelto",
            ),
            GrammarExample(
                text="Sanidad: la espera media para una operación baja a 90 días.",
                translation="Healthcare: the average wait for an operation drops to 90 days.",
                note="dos puntos",
            ),
            GrammarExample(
                text="Aumentar el salario mínimo un 5% el próximo año.",
                translation="Minimum wage to increase by 5% next year.",
                note="infinitivo de futuro",
            ),
        ],
        common_mistakes=[],
        related=["lenguaje-periodistico", "discurso-reportado", "voz-pasiva"],
    ),
    GrammarTopic(
        slug="discurso-reportado",
        title="Discurso reportado en prensa",
        level="B2",
        category="Estilo indirecto",
        summary="Cómo la prensa cita a las fuentes: verbos de habla, citas textuales e indirectas.",
        explanation='El **discurso reportado en prensa** combina verbos de habla con citas directas e indirectas para atribuir información a fuentes.\n\n**Verbos de habla periodísticos**:\n- Neutros: *decir, declarar, manifestar, señalar, indicar, afirmar*\n- De énfasis: *recalcar, subrayar, insistir en, hacer hincapié en*\n- De matiz: *apuntar, sugerir, insinuar, dar a entender*\n- De contraste: *replicar, rebatir, objetar, contradecir*\n\n**Citas textuales**:\n- Con verbo antepuesto: *El presidente afirmó: "La economía crecerá".*\n- Con verbo pospuesto o interpolado: *"La economía crecerá", afirmó el presidente.*\n\n**Citas indirectas**:\n- *El presidente afirmó que la economía crecería.* (estilo indirecto con cambio de tiempos.)\n- *Según el presidente, la economía crecerá.* (estructura con "según".)',
        rules=[
            'Variar los verbos de habla evita la monotonía de "dijo que... dijo que...".',
            "Citas textuales van entre comillas con verbo en pasado o presente.",
            "Citas indirectas requieren correlación de tiempos.",
            '"Según + fuente" es fórmula estándar para atribución.',
        ],
        examples=[
            GrammarExample(
                text='El ministro aseguró que las medidas "darán resultados en el corto plazo".',
                translation='The minister assured that the measures "will yield results in the short term".',
            ),
            GrammarExample(
                text="Según testigos presenciales, el incendio comenzó sobre las tres de la madrugada.",
                translation="According to eyewitnesses, the fire started around three in the morning.",
            ),
            GrammarExample(
                text='"No vamos a tolerar la violencia", recalcó el alcalde.',
                translation='"We will not tolerate violence," the mayor emphasized.',
            ),
        ],
        common_mistakes=[],
        related=[
            "lenguaje-periodistico",
            "titulares",
            "estilo-indirecto",
            "estilo-indirecto-pasado",
        ],
    ),
]
