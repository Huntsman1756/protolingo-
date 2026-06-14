"""French grammar topics — C2."""

from app.data._types import GrammarExample, GrammarMistake, GrammarTopic

C2_GRAMMAR_TOPICS: list[GrammarTopic] = [
    GrammarTopic(
        slug="revision-subjonctif",
        title="Maîtrise complète du subjonctif",
        level="C2",
        category="Verbes",
        summary="Synthèse de tous les cas d'usage du subjonctif, y compris les nuances avancées.",
        explanation="Au niveau C2, le subjonctif doit être maîtrisé dans toutes ses dimensions :\n\n**Formes** : présent, passé, imparfait (reconnaissance passive), plus-que-parfait (reconnaissance passive).\n\n**Contextes** :\n- Volonté, nécessité, émotion, doute, jugement impersonnel.\n- Conjonctions : bien que, pour que, avant que, à condition que...\n- Relatives restrictives : le seul qui, le meilleur que...\n- Concessives : quoi que, où que, qui que, quel que...\n\n**Pièges** :\n- *Après que* + indicatif (pas subjonctif).\n- *Espérer que* + indicatif (pas subjonctif).\n- *Il est probable que* + indicatif.",
        structure="tous les contextes d'activation du subjonctif",
        rules=[
            "Connaître tous les contextes d'activation.",
            "Identifier les exceptions (après que, espérer que...).",
            "Utiliser le subjonctif imparfait en reconnaissance passive (littérature).",
        ],
        examples=[
            GrammarExample(
                text="Je ne pense pas qu'il ait pu terminer à temps.",
                translation=None,
                note="subjonctif passé",
            ),
            GrammarExample(
                text="Bien qu'il fût tard, il continua. (littéraire)",
                translation=None,
                note="subjonctif imparfait",
            ),
            GrammarExample(
                text="Après qu'il est parti, tout le monde s'est regardé.",
                translation=None,
                note="indicatif après 'après que'",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Après qu'il soit parti.",
                correct="Après qu'il est parti.",
                note="'Après que' est suivi de l'indicatif.",
            ),
        ],
        related=["revision-conditionnel", "concordance-avancee"],
    ),
    GrammarTopic(
        slug="revision-conditionnel",
        title="Maîtrise complète du conditionnel",
        level="C2",
        category="Verbes",
        summary="Tous les usages du conditionnel : hypothèses, conditionnel journalistique, regret, politesse.",
        explanation="Au niveau C2, le conditionnel doit être utilisé avec aisance dans tous ses emplois :\n\n**1. Conditionnel présent** :\n- Politesse : *Je voudrais...*\n- Hypothèse présente : *Si j'avais le temps, je lirais.*\n- Futur dans le passé : *Il a dit qu'il viendrait.*\n\n**2. Conditionnel passé** :\n- Regret : *J'aurais dû...*\n- Hypothèse passée : *Si j'avais su...*\n- Information non confirmée (journalistique) : *Le président aurait démissionné.*\n\n**3. Conditionnel + subjonctif** (concordance) : *Si j'avais su qu'il viendrait, je serais venu.*",
        structure="conditionnel présent/passé + toutes les nuances",
        rules=[
            "Maîtrise de toutes les valeurs modales.",
            "Concordance avec 'si' impeccable.",
            "Conditionnel journalistique = information non confirmée.",
        ],
        examples=[
            GrammarExample(text="J'aurais aimé que tu sois là.", translation=None, note="regret"),
            GrammarExample(
                text="Le suspect se serait enfui par la fenêtre.",
                translation=None,
                note="conditionnel journalistique",
            ),
            GrammarExample(
                text="Si j'avais su que tu serais en retard, je serais venu plus tard.",
                translation=None,
                note="concordance complexe",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Si j'aurais su que tu viendrais...",
                correct="Si j'avais su que tu viendrais...",
                note="Jamais de conditionnel après 'si' dans la subordonnée conditionnelle.",
            ),
        ],
        related=["revision-subjonctif", "concordance-avancee"],
    ),
    GrammarTopic(
        slug="concordance-avancee",
        title="La concordance des temps avancée",
        level="C2",
        category="Verbes",
        summary="Maîtrise de la concordance dans des phrases complexes à plusieurs subordonnées.",
        explanation="La **concordance des temps avancée** implique de gérer plusieurs niveaux de subordination :\n\n*Il m'a dit qu'il **avait pensé** que je **viendrais** si je **pouvais**, mais que je **devais** savoir qu'il **serait** là.*\n\n**Règles** :\n- Verbe principal → temps de l'énonciation.\n- Chaque subordonnée → décalage selon le verbe qui la régit.\n- 'Si' bloque le conditionnel (sauf si 'si' n'est pas conditionnel).\n\n**Piège** : *si* peut introduire une interrogation indirecte (donc + conditionnel possible).\n- *Je ne savais pas si tu **viendrais**.* (interrogation indirecte, conditionnel OK).",
        structure="chaîne de concordance sur plusieurs niveaux",
        rules=[
            "Chaque verbe subordonné se décale selon son verbe recteur.",
            "Distinguer 'si' conditionnel (pas de conditionnel) de 'si' interrogatif (conditionnel OK).",
            "Maîtriser les 4 combinaisons de la condition (réel, irréel présent, irréel passé, mixte).",
        ],
        examples=[
            GrammarExample(
                text="Il a avoué qu'il avait menti en prétendant qu'il serait à l'heure.",
                translation=None,
            ),
            GrammarExample(
                text="Je me demandais si elle viendrait malgré la pluie.",
                translation=None,
                note="si interrogatif",
            ),
            GrammarExample(
                text="Si j'avais écouté ce qu'il m'avait conseillé, je ne serais pas dans cette situation.",
                translation=None,
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Je ne savais pas si tu viendrais → conditionnel correct ici car interrogation indirecte.",
                correct="(Cette phrase est correcte.)",
                note="Ne pas confondre 'si' conditionnel et 'si' interrogatif.",
            ),
        ],
        related=["revision-subjonctif", "revision-conditionnel"],
    ),
    GrammarTopic(
        slug="style-litteraire",
        title="Le style littéraire",
        level="C2",
        category="Expression",
        summary="Techniques avancées de style littéraire : rythme, sonorités, images.",
        explanation="Le **style littéraire** maîtrise :\n\n**Rythme** :\n- Phrases amples (périodes) ou brèves selon l'effet.\n- Binaire : *Ni vu ni connu.* / Ternaire : *Je suis venu, j'ai vu, j'ai vaincu.*\n\n**Sonorités** :\n- Allitérations (répétition de consonnes) : *Pour qui sont ces serpents qui sifflent sur vos têtes ?*\n- Assonances (répétition de voyelles).\n\n**Images** :\n- Métaphores filées, comparaisons développées.\n\n**Variété syntaxique** : alterner propositions longues et courtes, subordination et juxtaposition.",
        structure="rythme + sonorités + images + variété syntaxique",
        rules=[
            "Le rythme se contrôle par la longueur des phrases.",
            "Les sonorités créent une musicalité.",
            "Les métaphores filées unifient un texte.",
        ],
        examples=[
            GrammarExample(
                text="Longtemps, je me suis couché de bonne heure. (Proust, incipit)",
                translation=None,
            ),
            GrammarExample(
                text="Dans le silence de la nuit, seul le vent murmurait son chant glacé.",
                translation=None,
                note="allitération en s",
            ),
        ],
        common_mistakes=[],
        related=["voix-narrative", "ressources-stylistiques"],
    ),
    GrammarTopic(
        slug="voix-narrative",
        title="La voix narrative",
        level="C2",
        category="Expression",
        summary="Maîtrise des points de vue narratifs : interne, externe, omniscient.",
        explanation="Le **point de vue narratif** détermine la perspective du récit :\n\n**Point de vue interne** (je/témoin) :\n- Le narrateur est un personnage, sait ce qu'il pense/ressent.\n- *Je sentais mon cœur battre à tout rompre.*\n\n**Point de vue externe** (caméra) :\n- Le narrateur ne sait que ce qu'il voit/entend.\n- *Un homme entra, regarda autour de lui, et ressortit.*\n\n**Point de vue omniscient** :\n- Le narrateur sait tout : pensées des personnages, passé, futur.\n- *Pierre ignorait que cette décision scellerait son destin.*\n\n**Discours indirect libre** : pensées du personnage intégrées au récit sans verbe introducteur.\n- *Qu'allait-il faire maintenant ? La nuit tombait, il avait faim.*",
        structure="interne · externe · omniscient · indirect libre",
        rules=[
            "Interne : le lecteur voit à travers un personnage.",
            "Externe : comportementaliste, le lecteur observe.",
            "Omniscient : le narrateur sait tout.",
            "Indirect libre : fusion narration/pensées du personnage.",
        ],
        examples=[
            GrammarExample(
                text="Elle regarda par la fenêtre. Dehors, la pluie redoublait. Quelle journée ! (indirect libre)",
                translation=None,
            ),
            GrammarExample(
                text="Il ignorait encore que sa vie allait basculer ce soir-là. (omniscient)",
                translation=None,
            ),
        ],
        common_mistakes=[],
        related=["style-litteraire", "ressources-stylistiques"],
    ),
    GrammarTopic(
        slug="ressources-stylistiques",
        title="Les ressources stylistiques",
        level="C2",
        category="Expression",
        summary="Panorama des figures de style avancées : chiasme, oxymore, parataxe, hypotaxe.",
        explanation="Au niveau C2, l'écrivain maîtrise les **figures de style** subtiles :\n\n**Chiasme** (structure en miroir AB-BA) :\n- *Il faut manger pour vivre, et non vivre pour manger.*\n\n**Oxymore** (alliance de mots contradictoires) :\n- *Une obscure clarté, un silence assourdissant.*\n\n**Parataxe** (juxtaposition sans connecteur) :\n- *Il entra, s'assit, ne dit rien.*\n\n**Hypotaxe** (subordination multiple) :\n- *Bien qu'il sût que la tâche serait ardue, il entreprit ce projet dont personne ne voulait, parce qu'il croyait fermement en son utilité.*\n\n**Hypallage** (déplacement d'épithète) :\n- *Verser des larmes amères* (les larmes ne sont pas amères, la tristesse l'est).",
        structure="chiasme · oxymore · parataxe · hypotaxe · hypallage",
        rules=[
            "Chiasme = symétrie croisée AB-BA.",
            "Oxymore = opposition dans un même syntagme.",
            "Parataxe = phrases courtes juxtaposées (effet de rapidité).",
            "Hypotaxe = phrases longues subordonnées (effet de complexité).",
        ],
        examples=[
            GrammarExample(text="Les dés pipés du destin. (hypallage)", translation=None),
            GrammarExample(
                text="Un affreux plaisir, une douce violence. (oxymores)", translation=None
            ),
            GrammarExample(
                text="Il marchait. Le vent soufflait. La nuit tombait. (parataxe)", translation=None
            ),
        ],
        common_mistakes=[],
        related=["style-litteraire", "voix-narrative"],
    ),
    GrammarTopic(
        slug="equivalence",
        title="L'équivalence en traduction",
        level="C2",
        category="Traduction",
        summary="Principes de traduction : équivalence fonctionnelle plutôt que littérale.",
        explanation="Traduire, ce n'est pas transposer mot à mot, c'est trouver l'**équivalent fonctionnel** dans la langue cible.\n\n**Équivalence lexicale** :\n- *to miss someone* → *manquer à quelqu'un* (et non l'inverse).\n\n**Équivalence idiomatique** :\n- *It's raining cats and dogs* → *Il pleut des cordes.* (pas *des chats et des chiens*)\n\n**Équivalence culturelle** :\n- *Thanksgiving* → *Action de grâce* (ou on garde le terme avec explication).\n\n**Équivalence pragmatique** :\n- *You should...* → *Tu devrais...* (pas *Vous devez...*)",
        structure="sens + registre + culture → équivalent fonctionnel",
        rules=[
            "Traduire le sens, pas les mots.",
            "Adapter les expressions idiomatiques.",
            "Tenir compte du registre et de la culture.",
        ],
        examples=[
            GrammarExample(
                text="Je suis allé au marché. → I went to the market. (pas I am gone to the market)",
                translation=None,
            ),
            GrammarExample(
                text="Tu me manques. → I miss you. (pas You are missing to me)", translation=None
            ),
            GrammarExample(
                text="It's a piece of cake. → C'est un jeu d'enfant. (pas c'est un morceau de gâteau)",
                translation=None,
            ),
        ],
        common_mistakes=[],
        related=["nuances-traduction", "faux-amis"],
    ),
    GrammarTopic(
        slug="nuances-traduction",
        title="Les nuances de la traduction",
        level="C2",
        category="Traduction",
        summary="Traduire les implicites, les registres et les connotations.",
        explanation="Une bonne traduction capture les **implicites** :\n\n**Registre** :\n- *Je m'en fous.* → *I don't give a damn.* (pas *I don't care.*)\n- *Veuillez agréer...* → *Yours faithfully...* (pas *Please accept...*)\n\n**Connotation** :\n- *Mince* (France) ≠ *mince* (anglais) — faux ami.\n- *Propagande* (français neutre) ≠ *propaganda* (anglais péjoratif).\n\n**Implicites culturels** :\n- *La rentrée* → *back to school/work season* (pas de concept équivalent unique en anglais).\n- *La laïcité* → *secularism* (mais concept différent).",
        structure="traduire registre + connotation + implicite culturel",
        rules=[
            "Le registre doit correspondre entre source et cible.",
            "Attention aux connotations différentes.",
            "Les intraduisibles peuvent nécessiter une note.",
        ],
        examples=[
            GrammarExample(
                text="Bonne rentrée ! → Enjoy going back to work/school! (pas de traduction littérale)",
                translation=None,
            ),
            GrammarExample(
                text="C'est la galère. → It's a real nightmare. (pas It's the galley)",
                translation=None,
            ),
        ],
        common_mistakes=[],
        related=["equivalence", "faux-amis"],
    ),
    GrammarTopic(
        slug="faux-amis",
        title="Les faux amis français-anglais",
        level="C2",
        category="Traduction",
        summary="Principaux faux amis entre le français et l'anglais.",
        explanation="Les **faux amis** sont des mots similaires avec des sens différents :\n\n| Français | Sens | Anglais similaire | Sens du faux ami |\n|----------|------|-------------------|------------------|\n| actuellement | currently | actually | en réalité |\n| librairie | bookstore | library | bibliothèque |\n| sensible | sensitive | sensible | sensé, raisonnable |\n| passer un examen | take an exam | pass an exam | réussir un examen |\n| décevoir | disappoint | deceive | tromper |\n| éventuellement | possibly | eventually | finalement |\n| sympathique | nice, friendly | sympathetic | compatissant |\n| un car | a coach/bus | a car | une voiture |\n| le pain | bread | pain | la douleur |",
        structure="faux amis = similitude formelle + différence sémantique",
        rules=[
            "Mémoriser les faux amis les plus fréquents.",
            "Vérifier le sens en cas de doute.",
            "En traduction, le contexte lève l'ambiguïté.",
        ],
        examples=[
            GrammarExample(
                text="Actually, I don't know. → En réalité, je ne sais pas. (pas Actuellement)",
                translation=None,
            ),
            GrammarExample(
                text="I'll go eventually. → J'irai finalement. (pas Éventuellement)",
                translation=None,
            ),
            GrammarExample(
                text="She's very sympathetic. → Elle est très compatissante. (pas sympathique)",
                translation=None,
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Il est sensible. → He is sensible.",
                correct="He is sensitive.",
                note="Sensible (FR) = sensitive (EN). Sensé/raisonnable = sensible (EN).",
            ),
        ],
        related=["equivalence", "nuances-traduction"],
    ),
    GrammarTopic(
        slug="lexique-historique",
        title="L'évolution du lexique français",
        level="C2",
        category="Expression",
        summary="Les grandes étapes de l'évolution lexicale du français.",
        explanation="Le lexique français s'est enrichi au fil des siècles :\n\n**Fonds latin** (90% du vocabulaire) : du latin vulgaire.\n**Francique** (Ve siècle) : mots germaniques (*guerre, jardin, hache, blanc*).\n**Arabe** (Moyen Âge) : *sucre, zéro, alcool, chiffre, algebra, alcali.*\n**Italien** (Renaissance, XVIe) : *balcon, banque, concert, costume, artisan.*\n**Espagnol** : *sieste, guérilla, camarade, embarcation.*\n**Anglais** (XXe-XXIe) : *week-end, parking, stress, manager, cloud.*\n\nLe français a toujours emprunté aux autres langues, tout en développant des mécanismes de francisation.",
        structure="substrat gaulois + latin + superstrat francique + emprunts successifs",
        rules=[
            "Le français n'est pas 'pur' — il est le résultat de siècles d'emprunts.",
            "L'Académie française propose des équivalents pour les anglicismes.",
            "Les emprunts sont naturels dans toutes les langues.",
        ],
        examples=[
            GrammarExample(
                text="alcool, sucre, zéro, chiffre — emprunts à l'arabe médiéval", translation=None
            ),
            GrammarExample(
                text="balcon, concert, banque — emprunts à l'italien de la Renaissance",
                translation=None,
            ),
            GrammarExample(
                text="week-end, parking, cloud — emprunts contemporains à l'anglais",
                translation=None,
            ),
        ],
        common_mistakes=[],
        related=["etymologie", "evolution-francais"],
    ),
    GrammarTopic(
        slug="etymologie",
        title="L'étymologie",
        level="C2",
        category="Expression",
        summary="Introduction à l'étymologie des mots français.",
        explanation="L'**étymologie** étudie l'origine des mots. Connaître l'étymologie aide à comprendre l'orthographe et le sens.\n\n**Doublets** : mots issus du même étymon latin, l'un par voie populaire (évolution phonétique), l'autre par emprunt savant.\n\n| Origine latine | Voie populaire | Voie savante |\n|---------------|---------------|-------------|\n| fragilis | frêle | fragile |\n| auscultare | écouter | ausculter |\n| recuperare | recouvrer | récupérer |\n| hospitalis | hôtel | hôpital |\n\nLa voie populaire a subi l'érosion phonétique ; la voie savante est plus proche du latin.",
        structure="mot latin → doublet populaire / savant",
        rules=[
            "Voie populaire = évolution phonétique continue.",
            "Voie savante = emprunt tardif au latin, plus proche de l'original.",
            "Connaître les racines latines facilite l'orthographe.",
        ],
        examples=[
            GrammarExample(text="frêle / fragile (du latin fragilis)", translation=None),
            GrammarExample(text="écouter / ausculter (du latin auscultare)", translation=None),
            GrammarExample(text="hôtel / hôpital (du latin hospitalis)", translation=None),
        ],
        common_mistakes=[],
        related=["lexique-historique", "evolution-francais"],
    ),
    GrammarTopic(
        slug="evolution-francais",
        title="L'évolution du français",
        level="C2",
        category="Expression",
        summary="De l'ancien français au français contemporain : les grandes mutations.",
        explanation="**Ancien français (IXe-XIIIe siècles)** : déclinaison à deux cas, syntaxe plus libre.\n- *Li rois / le roi* (cas sujet / cas régime).\n\n**Moyen français (XIVe-XVe siècles)** : disparition des déclinaisons, ordre SVO fixé.\n\n**Français classique (XVIIe-XVIIIe siècles)** : normalisation, Vaugelas, l'Académie.\n- *Je vais à Paris → Je vas à Paris* (le 's' ne s'était pas encore généralisé).\n\n**Français contemporain** : simplification continue à l'oral (*il faut* → *faut*, *ne* disparaît).\n\n**Dernière réforme orthographique** : 1990 (oignon → ognon, nénuphar → nénufar).",
        structure="ancien français → moyen français → français classique → français contemporain",
        rules=[
            "L'ancien français avait des déclinaisons.",
            "Le XVIIe siècle a fixé la norme.",
            "La langue continue d'évoluer.",
        ],
        examples=[
            GrammarExample(
                text="Ancien français : 'Rollant sent que la mort le tresprent' → Français moderne : 'Roland sent que la mort s'empare de lui'",
                translation=None,
            ),
            GrammarExample(
                text="XVIIe : 'Je vas' → Aujourd'hui : 'Je vais' (le 's' s'est généralisé par analogie)",
                translation=None,
            ),
        ],
        common_mistakes=[],
        related=["lexique-historique", "etymologie"],
    ),
    GrammarTopic(
        slug="genres-textuels",
        title="Les genres textuels",
        level="C2",
        category="Expression",
        summary="Maîtrise des différents genres d'écrits : essai, chronique, rapport, nouvelle.",
        explanation="Chaque **genre textuel** a ses propres conventions :\n\n**Essai** : thèse argumentée, registre soutenu, citations.\n**Chronique** : style personnel, ton engagé ou humoristique, brièveté.\n**Rapport** : objectivité, structure numérique, synthèse des faits.\n**Nouvelle** : brièveté, chute finale, économie de moyens.\n**Synthèse** : confrontation de sources, neutralité.\n\nAdapter son écriture au genre est une compétence de niveau C2.",
        structure="genre → conventions + style + structure",
        rules=[
            "Chaque genre a ses conventions.",
            "L'essai développe une pensée personnelle.",
            "Le rapport vise l'objectivité.",
            "La nouvelle privilégie la tension narrative.",
        ],
        examples=[
            GrammarExample(
                text="Essai : 'Il convient de s'interroger sur la place du numérique dans nos vies.'",
                translation=None,
            ),
            GrammarExample(
                text="Nouvelle : 'Ce matin-là, en ouvrant sa porte, il comprit que rien ne serait plus comme avant.'",
                translation=None,
            ),
        ],
        common_mistakes=[],
        related=["creativite-linguistique", "edition"],
    ),
    GrammarTopic(
        slug="creativite-linguistique",
        title="La créativité linguistique",
        level="C2",
        category="Expression",
        summary="Néologismes, jeux de mots, détournements : créer avec la langue.",
        explanation="La **créativité linguistique** consiste à jouer avec la langue de façon originale :\n\n**Néologismes** : créer des mots nouveaux.\n- *un covoitureur, une infox, un mooc, ubériser.*\n- Par composition : *porte-bonheur, lave-vaisselle.*\n- Par dérivation : *dégoogliser, reforestation.*\n\n**Détournements** : subvertir des expressions connues.\n- *Un tiens vaut mieux que deux tu l'auras → Un chien vaut mieux que deux tu l'auras.*\n\n**Mots-valises** : *franglais, clavardage (clavier + bavardage), courriel (courrier + électronique).*",
        structure="néologisme · détournement · mot-valise",
        rules=[
            "La créativité doit rester compréhensible.",
            "Les néologismes respectent la morphologie du français.",
            "L'humour et l'ironie sont des terrains de créativité.",
        ],
        examples=[
            GrammarExample(
                text="Pourquoi faire simple quand on peut faire compliqué ? → Pourquoi faire compliqué quand on peut faire simple ? (détournement)",
                translation=None,
            ),
            GrammarExample(
                text="clavardage = clavier + bavardage (proposé au Québec pour 'chat')",
                translation=None,
            ),
        ],
        common_mistakes=[],
        related=["genres-textuels", "edition"],
    ),
    GrammarTopic(
        slug="edition",
        title="L'édition et la révision",
        level="C2",
        category="Expression",
        summary="Techniques de révision et de correction pour un texte professionnel.",
        explanation="**Réviser un texte** va au-delà de la correction orthographique :\n\n**1. Structure** : le plan est-il logique ? Les transitions sont-elles fluides ?\n\n**2. Style** : éliminer les répétitions, varier le vocabulaire, contrôler le registre.\n\n**3. Précision** : chaque mot est-il le bon ? Les ambiguïtés sont-elles levées ?\n\n**4. Orthographe/grammaire** : accords, conjugaisons, homophones.\n\n**5. Typographie** : guillemets, espaces insécables, majuscules accentuées.\n\n**Méthode** : relire en se concentrant sur un aspect à la fois.",
        structure="structure → style → précision → orthographe → typographie",
        rules=[
            "Relire en plusieurs passes, chaque passe pour un aspect.",
            "Lire à voix haute pour repérer les lourdeurs.",
            "Laisser reposer le texte entre l'écriture et la révision.",
        ],
        examples=[
            GrammarExample(
                text="Avant : 'Il y a beaucoup de gens qui pensent que...' → Après : 'Nombreux sont ceux qui estiment que...'",
                translation=None,
            ),
        ],
        common_mistakes=[],
        related=["genres-textuels", "creativite-linguistique"],
    ),
    GrammarTopic(
        slug="expression-nuancee",
        title="L'expression nuancée",
        level="C2",
        category="Expression",
        summary="Maîtrise des nuances : degrés de certitude, implicites, sous-entendus.",
        explanation="Au niveau C2, on exprime des **nuances fines** sans recourir à des circonlocutions :\n\n**Degrés de certitude** :\n- *Il se peut que...* (faible probabilité) / *Il est probable que...* (forte) / *Il est certain que...* (certitude).\n\n**Implicites** : dire sans dire explicitement.\n- *Ce serait bien si...* (demande indirecte).\n- *Je ne dis pas que... mais...* (critique déguisée).\n\n**Atténuation et emphase** :\n- *Ce n'est pas inintéressant.* (litote = c'est assez intéressant).\n- *C'est absolument remarquable.* (emphase).",
        structure="nuance = degré + implicite + registre",
        rules=[
            "Choisir le modalisateur qui correspond au degré de certitude voulu.",
            "Maîtriser l'art de la litote et de l'euphémisme.",
            "Adapter le degré de directivité selon la situation.",
        ],
        examples=[
            GrammarExample(
                text="Il ne serait pas déraisonnable d'envisager... (litote pour dire que c'est raisonnable)",
                translation=None,
            ),
            GrammarExample(
                text="Je me permets de vous signaler que... (atténuation polie)", translation=None
            ),
            GrammarExample(
                text="Autant le dire tout de suite : ce projet est voué à l'échec. (emphase)",
                translation=None,
            ),
        ],
        common_mistakes=[],
        related=["integration-grammaticale", "fluidite-native"],
    ),
    GrammarTopic(
        slug="integration-grammaticale",
        title="L'intégration grammaticale",
        level="C2",
        category="Expression",
        summary="Maîtrise de toutes les structures grammaticales dans un discours fluide.",
        explanation="L'**intégration grammaticale** au niveau C2 signifie pouvoir mobiliser toutes les structures sans hésitation :\n\n- Alterner hypotaxe et parataxe.\n- Maîtriser la voix passive, factitive, pronominale.\n- Gérer les chaînes de pronoms complexes.\n- Utiliser tous les temps et modes avec naturel.\n- Construire des phrases de 30+ mots sans erreur de syntaxe.\n\n**Test** : improviser un discours de 5 minutes sur un sujet complexe sans erreur grammaticale.",
        structure="toutes les structures grammaticales mobilisables sans effort",
        rules=[
            "Aucune structure grammaticale n'est hors de portée.",
            "Les erreurs résiduelles sont des lapsus, pas des ignorances.",
            "La syntaxe complexe est sous contrôle.",
        ],
        examples=[
            GrammarExample(
                text="Si j'avais su, lorsque tu m'as appelé hier, que la situation se serait détériorée à ce point, je n'aurais pas hésité à intervenir.",
                translation=None,
            ),
        ],
        common_mistakes=[],
        related=["expression-nuancee", "fluidite-native"],
    ),
    GrammarTopic(
        slug="fluidite-native",
        title="La fluidité quasi-native",
        level="C2",
        category="Expression",
        summary="Objectif C2 : s'exprimer avec une aisance et une précision proches de celles d'un locuteur natif cultivé.",
        explanation="La **fluidité native** au niveau C2 se caractérise par :\n\n- Absence quasi totale d'hésitation.\n- Correction grammaticale proche de 100%.\n- Richesse lexicale spontanée.\n- Adaptation automatique du registre.\n- Compréhension fine des implicites culturels.\n- Capacité à produire un discours long, structuré, nuancé.\n\n**Autocorrection** : le locuteur C2 repère et corrige ses propres erreurs instantanément.",
        structure="correction + fluidité + richesse + registre + culture",
        rules=[
            "Le C2 est le couronnement du parcours d'apprentissage.",
            "L'objectif n'est pas la perfection absolue mais l'aisance maximale.",
            "Même les natifs font des erreurs occasionnelles.",
        ],
        examples=[],
        common_mistakes=[],
        related=["expression-nuancee", "integration-grammaticale"],
    ),
]
