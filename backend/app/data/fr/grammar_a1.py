"""French grammar topics — A1."""

from app.data._types import GrammarExample, GrammarMistake, GrammarTopic

A1_GRAMMAR_TOPICS: list[GrammarTopic] = [
    GrammarTopic(
        slug="verbe-etre",
        title="Le verbe être",
        level="A1",
        category="Verbes",
        summary="Le verbe être : identité, nationalité, profession, description.",
        explanation="Le verbe **être** (= to be) est l'un des deux auxiliaires fondamentaux du français. Il sert à exprimer :\n\n- **L'identité** (identity) : *Je suis Marie.* (I am Marie)\n- **La nationalité** (nationality) : *Il est français.* (He is French)\n- **La profession** (profession) : *Elle est médecin.* (She is a doctor — sans article, without an article)\n- **La description** (description) : *La maison est grande.* (The house is big)\n- **La localisation** (location) : *Paris est en France.* (Paris is in France)\n\nLe pronom sujet (subject pronoun) est **obligatoire** en français.",
        structure="je suis · tu es · il/elle/on est · nous sommes · vous êtes · ils/elles sont",
        rules=[
            "Le pronom sujet est obligatoire en français. (The subject pronoun is mandatory in French.)",
            "'On' remplace souvent 'nous' à l'oral : On est français (familier). ('On' often replaces 'nous' in spoken French.)",
            'Pas d\'article après être avec les professions : "Je suis professeur" (pas *je suis un professeur). (No article after être with professions.)',
            '"Être de + lieu" indique l\'origine : "Je suis de Paris". ("Être de + place" indicates origin.)',
        ],
        examples=[
            GrammarExample(text="Je suis étudiant.", translation="I am a student."),
            GrammarExample(text="Tu es français ?", translation="Are you French?"),
            GrammarExample(text="Nous sommes fatigués.", translation="We are tired."),
            GrammarExample(
                text="Elles sont espagnoles.",
                translation="They (f.) are Spanish.",
                note="accord féminin pluriel",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Je suis un médecin.",
                correct="Je suis médecin.",
                note="Avec les professions, on n'utilise pas d'article indéfini après être.",
            ),
            GrammarMistake(
                wrong="Il est de France.",
                correct="Il est français. / Il vient de France.",
                note='"Être de + pays" est possible mais moins naturel que l\'adjectif de nationalité.',
            ),
        ],
        related=["verbe-avoir", "pronoms-sujets", "cest-il-est", "accord-adjectifs"],
    ),
    GrammarTopic(
        slug="verbe-avoir",
        title="Le verbe avoir",
        level="A1",
        category="Verbes",
        summary="Le verbe avoir : possession, âge, expressions courantes.",
        explanation="Le verbe **avoir** (= to have) est le deuxième auxiliaire fondamental du français. Il exprime :\n\n- **La possession** (possession) : *J'ai une voiture.* (I have a car)\n- **L'âge** (age) : *J'ai 25 ans.* (I am 25 years old — literally 'I have 25 years')\n- **Des sensations et états** (feelings/states) : *J'ai faim / soif / chaud / froid / peur / sommeil.* (I'm hungry / thirsty / hot / cold / scared / sleepy)\n- **L'auxiliaire du passé composé** (auxiliary for past tense) pour la plupart des verbes.",
        structure="j'ai · tu as · il/elle/on a · nous avons · vous avez · ils/elles ont",
        rules=[
            "Le pronom sujet est obligatoire. (The subject pronoun is mandatory.)",
            "Pour l'âge on utilise 'avoir', jamais 'être' : 'J'ai 30 ans'. (For age, use 'avoir', never 'être'.)",
            "Les sensations s'expriment avec 'avoir + nom' : 'avoir faim, avoir soif, avoir chaud...' (Physical sensations use 'avoir + noun'.)",
            "'Il y a' (forme impersonnelle de avoir) exprime l'existence. ('Il y a' = there is/there are.)",
        ],
        examples=[
            GrammarExample(text="J'ai deux frères.", translation="I have two brothers."),
            GrammarExample(text="Quel âge as-tu ?", translation="How old are you?"),
            GrammarExample(text="Nous avons faim.", translation="We are hungry."),
            GrammarExample(
                text="Elle a une belle maison.", translation="She has a beautiful house."
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Je suis 20 ans.",
                correct="J'ai 20 ans.",
                note="En français, l'âge s'exprime avec 'avoir', jamais avec 'être'.",
            ),
            GrammarMistake(
                wrong="Je suis faim.",
                correct="J'ai faim.",
                note="Les sensations physiques utilisent 'avoir + nom', pas 'être'.",
            ),
        ],
        related=["verbe-etre", "il-y-a", "pronoms-sujets"],
    ),
    GrammarTopic(
        slug="pronoms-sujets",
        title="Les pronoms sujets",
        level="A1",
        category="Pronoms",
        summary="Les pronoms personnels sujets : je, tu, il, elle, on, nous, vous, ils, elles.",
        explanation="Les **pronoms sujets** (subject pronouns) sont obligatoires en français, contrairement à l'espagnol ou à l'italien. Ils indiquent qui fait l'action.\n\n| Singulier | Pluriel |\n|-----------|--------|\n| je (I) | nous (we) |\n| tu (you, informal) | vous (you, formal / plural) |\n| il · elle · on (he/she/one) | ils · elles (they m./f.) |\n\n- **Tu** = informel (amis, famille). **Vous** = formel (inconnus, supérieurs) ou pluriel.\n- **On** = 'nous' à l'oral informel : *On va au cinéma ?* (Shall we go to the cinema?)\n- **Ils** = masculin ou mixte. **Elles** = exclusivement féminin.",
        structure="je · tu · il/elle/on · nous · vous · ils/elles",
        rules=[
            "Le pronom sujet est toujours présent (sauf à l'impératif). (Always present, except in commands.)",
            "'Tu' et 'vous' : toujours respecter le registre (tu = informel, vous = formel/pluriel).",
            "'On' conjugué comme 'il/elle' (3e personne du singulier). (Conjugated like il/elle.)",
            "L'élision : je → j' devant voyelle ou h muet (j'habite, j'aime). (je becomes j' before a vowel.)",
        ],
        examples=[
            GrammarExample(text="Je parle français.", translation="I speak French."),
            GrammarExample(text="Tu habites où ?", translation="Where do you live? (informal)"),
            GrammarExample(
                text="Vous êtes très aimable.", translation="You are very kind. (formal)"
            ),
            GrammarExample(
                text="On va au restaurant ce soir.",
                translation="We're going to the restaurant tonight. (informal 'we')",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Parle français.",
                correct="Je parle français.",
                note="Le pronom sujet est obligatoire en français (sauf à l'impératif).",
            ),
            GrammarMistake(
                wrong="Tu est français ?",
                correct="Tu es français ?",
                note="'Tu' se conjugue avec la forme 'es', pas 'est' (qui est pour il/elle).",
            ),
        ],
        related=["verbe-etre", "verbe-avoir", "verbes-er-present"],
    ),
    GrammarTopic(
        slug="articles-definis",
        title="Les articles définis",
        level="A1",
        category="Articles",
        summary="Les articles définis : le, la, l’, les.",
        explanation="Les **articles définis** (**definite articles** = the) accompagnent un nom connu ou déjà mentionné.\n\n| | Singulier | Pluriel |\n|---|----------|--------|\n| Masculin | le livre (the book) | les livres (the books) |\n| Féminin | la maison (the house) | les maisons (the houses) |\n| Devant voyelle/h muet | l'ami, l'école | les amis |\n\nUsages principaux :\n- **Chose spécifique** (specific thing) : *Le livre de Pierre est intéressant.*\n- **Généralisation** (general statement) : *Les chiens sont fidèles.* (Dogs are loyal.)\n- **Aimer/détester + le/la/l'/les** : *J'aime le chocolat.* (I like chocolate.)\n\n⚠️ Contractions obligatoires : **à + le → au**, **à + les → aux**, **de + le → du**, **de + les → des**.",
        structure="le (masc. sing.) · la (fém. sing.) · l' (voyelle/h muet) · les (pluriel)",
        rules=[
            "Accord en genre et en nombre avec le nom. (Agrees in gender and number with the noun.)",
            "L' devant une voyelle ou un h muet : l'arbre, l'homme. (l' before vowel or silent h.)",
            "Contractions obligatoires avec à et de : au, aux, du, des.",
            "On utilise l'article défini pour les généralisations et avec aimer/détester.",
        ],
        examples=[
            GrammarExample(
                text="Le livre est sur la table.", translation="The book is on the table."
            ),
            GrammarExample(
                text="Les enfants jouent dans le jardin.",
                translation="The children are playing in the garden.",
            ),
            GrammarExample(text="Je vais au cinéma.", translation="I'm going to the cinema."),
            GrammarExample(
                text="C'est la maison du professeur.", translation="It's the teacher's house."
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Je vais à le parc.",
                correct="Je vais au parc.",
                note="La contraction 'au' est obligatoire pour à + le. ('au' is mandatory for à + le.)",
            ),
            GrammarMistake(
                wrong="J'aime chocolat.",
                correct="J'aime le chocolat.",
                note="Avec aimer/détester, l'article défini est obligatoire devant le nom. (With aimer/détester, you need the definite article.)",
            ),
        ],
        related=["articles-indefinis", "articles-partitifs", "genre-noms", "prepositions-lieu"],
    ),
    GrammarTopic(
        slug="genre-noms",
        title="Le genre des noms",
        level="A1",
        category="Noms",
        summary="Règles générales pour savoir si un nom est masculin ou féminin.",
        explanation="En français, tous les noms ont un **genre grammatical** : masculin ou féminin. Il n'y a pas de neutre.\n\n**Généralement masculins** :\n- Noms terminés par une consonne : *le livre, le jardin*\n- Noms en **-eau, -ment, -age, -isme** : *le bateau, le fromage*\n\n**Généralement féminins** :\n- Noms en **-tion, -sion, -té, -ée, -ure, -ade** : *la nation, la beauté, la voiture*\n- La plupart des noms en **-e muet** : *la table, la chaise*\n\nNombreuses exceptions : *le musée, le lycée, le problème* (masc.) ; *la mer, la main* (fém.).\n\n**Astuce** : apprenez toujours le nom avec son article !",
        structure="le + nom masculin · la + nom féminin",
        rules=[
            "Chaque nom a un genre fixe, masculin ou féminin.",
            "Les noms en -tion/-sion sont féminins à 99%.",
            "Les noms en -age sont généralement masculins.",
            "-ée final est presque toujours féminin : la journée, l'arrivée.",
            "Apprendre l'article avec le nom pour mémoriser le genre.",
        ],
        examples=[
            GrammarExample(text="Le garçon est gentil.", translation="The boy is kind."),
            GrammarExample(text="La fille est intelligente.", translation="The girl is smart."),
            GrammarExample(
                text="Le musée est fermé le mardi.",
                translation="The museum is closed on Tuesdays.",
                note="exception : -ée mais masculin",
            ),
            GrammarExample(
                text="La liberté est un droit fondamental.",
                translation="Freedom is a fundamental right.",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="La problème est difficile.",
                correct="Le problème est difficile.",
                note="Les mots en -ème d'origine grecque sont généralement masculins.",
            ),
            GrammarMistake(
                wrong="Le table est petit.",
                correct="La table est petite.",
                note="Les noms en -e sont majoritairement féminins, mais pas toujours.",
            ),
        ],
        related=["articles-definis", "articles-indefinis", "accord-adjectifs"],
    ),
    GrammarTopic(
        slug="articles-indefinis",
        title="Les articles indéfinis",
        level="A1",
        category="Articles",
        summary="Les articles indéfinis : un, une, des.",
        explanation="Les **articles indéfinis** (**indefinite articles** = a/an/some) accompagnent un nom non identifié, mentionné pour la première fois.\n\n| | Singulier | Pluriel |\n|---|----------|--------|\n| Masculin | un livre (a book) | des livres (some books) |\n| Féminin | une maison (a house) | des maisons (some houses) |\n\nUsages :\n- **Première mention** (first mention) : *Il y a un chat dans le jardin.*\n- **Objet non spécifique** (non-specific) : *Je cherche un travail.*\n\n⚠️ Après la négation, un/une/des → de : *Je n'ai pas de voiture.* (I don't have a car.)",
        structure="un (masc. sing.) · une (fém. sing.) · des (pluriel)",
        rules=[
            "Un/une pour une chose non précisée, mentionnée pour la première fois. (for something unspecified/new)",
            "Des est le pluriel de un/une.",
            "Après une négation, un/une/des → de/d' : 'Je n'ai pas de frère.' (after negation → de)",
            "Pas d'article indéfini après 'être' + profession : 'Je suis professeur.' (no article with professions)",
        ],
        examples=[
            GrammarExample(text="J'ai un chien.", translation="I have a dog."),
            GrammarExample(
                text="Il y a une pharmacie au coin.",
                translation="There is a pharmacy on the corner.",
            ),
            GrammarExample(
                text="Elle a des amis à Paris.", translation="She has (some) friends in Paris."
            ),
            GrammarExample(text="Je n'ai pas de voiture.", translation="I don't have a car."),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Je n'ai pas une voiture.",
                correct="Je n'ai pas de voiture.",
                note="Après la négation, l'article indéfini devient 'de'.",
            ),
            GrammarMistake(
                wrong="C'est une professeur.",
                correct="C'est un professeur. / C'est une professeure.",
                note="Le mot 'professeur' est traditionnellement masculin, mais 'professeure' se féminise de plus en plus.",
            ),
        ],
        related=["articles-definis", "articles-partitifs", "negation-simple"],
    ),
    GrammarTopic(
        slug="cest-il-est",
        title="C’est / Il est",
        level="A1",
        category="Phrase",
        summary="Distinction entre c'est (présentation/identification) et il/elle est (description). (c'est = identification, il/elle est = description)",
        explanation="**C'est** et **il/elle est** ont des usages différents :\n\n**C'est + déterminant + nom** (for presenting/identifying) :\n- *C'est mon ami.* (This/He is my friend.)\n\n**Il/Elle est + adjectif** (sans nom — for describing with an adjective) :\n- *Il est français.* (He is French.) / *Elle est très gentille.* (She is very kind.)\n\n**Il/Elle est + profession** (sans article — for professions) :\n- *Il est médecin.* (He is a doctor.)\n\nRésumé : **c'est** pour présenter/identifier, **il/elle est** pour décrire. (c'est = presentation, il/elle est = description)",
        structure="c'est + déterminant + nom · il/elle est + adjectif · il/elle est + profession (sans article)",
        rules=[
            "C'est + article + nom pour présenter : C'est un ami. (for presenting)",
            "Il/Elle est + adjectif seul pour décrire : Il est grand. (for describing)",
            "Il/Elle est + profession sans article : Elle est médecin. (profession, no article)",
            "Ce sont + pluriel : Ce sont mes amis. (These are my friends.)",
        ],
        examples=[
            GrammarExample(text="C'est mon frère.", translation="This is my brother."),
            GrammarExample(text="Il est très sympa.", translation="He is very nice."),
            GrammarExample(text="C'est une belle ville.", translation="It's a beautiful city."),
            GrammarExample(text="Elle est avocate.", translation="She is a lawyer."),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Il est mon ami.",
                correct="C'est mon ami.",
                note="Pour présenter avec un déterminant, on utilise 'c'est', pas 'il est'.",
            ),
            GrammarMistake(
                wrong="C'est français.",
                correct="Il est français.",
                note="Pour décrire avec un adjectif seul (sans nom), on utilise 'il/elle est'.",
            ),
        ],
        related=["verbe-etre", "adjectifs-qualificatifs"],
    ),
    GrammarTopic(
        slug="adjectifs-possessifs",
        title="Les adjectifs possessifs",
        level="A1",
        category="Adjectifs",
        summary="mon, ton, son, notre, votre, leur — exprimer la possession.",
        explanation="Les **adjectifs possessifs** se placent **devant le nom** et s'accordent en genre et en nombre avec l'objet possédé, non avec le possesseur.\n\n| Possesseur | Masc. sing. | Fém. sing. | Pluriel |\n|------------|-------------|------------|--------|\n| je | mon | ma (mon*) | mes |\n| tu | ton | ta (ton*) | tes |\n| il/elle | son | sa (son*) | ses |\n| nous | notre | notre | nos |\n| vous | votre | votre | vos |\n| ils/elles | leur | leur | leurs |\n\n*Devant une voyelle ou un h muet, ma/ta/sa → mon/ton/son : *mon amie, son histoire*.",
        structure="mon/ma/mes · ton/ta/tes · son/sa/ses · notre/nos · votre/vos · leur/leurs",
        rules=[
            "Accord avec l'objet possédé, non avec le possesseur.",
            "Mon, ton, son devant un nom féminin commençant par une voyelle ou un h muet.",
            "Notre, votre, leur sont identiques au masculin et au féminin.",
        ],
        examples=[
            GrammarExample(
                text="Mon frère habite à Lyon.", translation="My brother lives in Lyon."
            ),
            GrammarExample(text="Ma sœur est avocate.", translation="My sister is a lawyer."),
            GrammarExample(
                text="Mon amie Sophie vient ce soir.",
                translation="My friend Sophie is coming tonight.",
                note="fém. avec voyelle → mon",
            ),
            GrammarExample(
                text="Leurs enfants sont adorables.", translation="Their children are adorable."
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Ma amie est gentille.",
                correct="Mon amie est gentille.",
                note="Devant une voyelle, 'ma' devient 'mon'.",
            ),
            GrammarMistake(
                wrong="Son amie.",
                correct="Son amie.",
                note="Ici c'est correct : 'son' devant un nom féminin à voyelle. L'erreur serait : 'sa amie'.",
            ),
        ],
        related=["verbe-avoir", "pronoms-sujets", "genre-noms"],
    ),
    GrammarTopic(
        slug="adjectifs-qualificatifs",
        title="Les adjectifs qualificatifs",
        level="A1",
        category="Adjectifs",
        summary="Décrire avec des adjectifs : position et accord de base.",
        explanation="En français, l'adjectif s'accorde en **genre** (masculin/féminin) et en **nombre** (singulier/pluriel) avec le nom qu'il qualifie.\n\n**Formation du féminin** :\n- Ajouter **-e** au masculin : *grand → grande*\n- Masculin en -e → féminin identique : *triste → triste*\n- Masculin en -er → -ère : *premier → première*\n- Masculin en -eux → -euse : *heureux → heureuse*\n\n**Position** : la plupart des adjectifs se placent **après** le nom, sauf les plus courts et fréquents qui se placent **avant** : *beau, bon, grand, petit, jeune, vieux, joli, mauvais, nouveau*.",
        structure="nom + adjectif (position normale) · adjectif court + nom (exceptions)",
        rules=[
            "L'adjectif s'accorde en genre et en nombre avec le nom.",
            "Règle générale : ajouter -e pour le féminin, -s pour le pluriel.",
            "La plupart des adjectifs se placent après le nom.",
            "Beau, bon, grand, petit, jeune, vieux, joli, mauvais, nouveau → avant le nom.",
        ],
        examples=[
            GrammarExample(text="Une maison blanche.", translation="A white house."),
            GrammarExample(
                text="Un petit chien.", translation="A small dog.", note="petit avant le nom"
            ),
            GrammarExample(text="Des livres intéressants.", translation="Interesting books."),
            GrammarExample(
                text="Une belle voiture rouge.",
                translation="A beautiful red car.",
                note="deux adjectifs",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Une maison blanc.",
                correct="Une maison blanche.",
                note="L'adjectif doit s'accorder au féminin : blanc → blanche.",
            ),
            GrammarMistake(
                wrong="Un chien petit.",
                correct="Un petit chien.",
                note="'Petit' fait partie des adjectifs qui se placent avant le nom.",
            ),
        ],
        related=["accord-adjectifs", "genre-noms", "cest-il-est"],
    ),
    GrammarTopic(
        slug="accord-adjectifs",
        title="L'accord des adjectifs",
        level="A1",
        category="Adjectifs",
        summary="Règles d'accord en genre et en nombre des adjectifs.",
        explanation="L'**accord de l'adjectif** est une règle fondamentale du français écrit. L'adjectif prend le genre et le nombre du nom (ou pronom) auquel il se rapporte.\n\n**Féminin** : règle générale → ajouter **-e** : *grand → grande*\n- -er → -ère : *léger → légère*\n- -eux → -euse : *sérieux → sérieuse*\n- -eur → -euse : *travailleur → travailleuse*\n\n**Pluriel** : règle générale → ajouter **-s** : *grand → grands*\n- -al → -aux : *loyal → loyaux* (sauf : bancals, fatals)\n\n**Féminin pluriel** : ajouter **-es** : *grande → grandes*.",
        structure="masc. sing. → fém. sing. (+e) → masc. pl. (+s) → fém. pl. (+es)",
        rules=[
            "L'adjectif s'accorde toujours avec le nom ou le pronom qu'il qualifie.",
            "Féminin : ajouter -e (sauf exceptions en -er, -eux, -eur, etc.).",
            "Pluriel : ajouter -s (sauf -al → -aux).",
            "Les adjectifs en -e au masculin ne changent pas au féminin.",
        ],
        examples=[
            GrammarExample(
                text="Il est grand. → Elle est grande.", translation="He is tall. → She is tall."
            ),
            GrammarExample(
                text="Ils sont heureux. → Elles sont heureuses.",
                translation="They (m.) are happy. → They (f.) are happy.",
            ),
            GrammarExample(
                text="Des problèmes généraux.",
                translation="General problems.",
                note="général → généraux",
            ),
            GrammarExample(
                text="Des robes élégantes.", translation="Elegant dresses.", note="fém. pluriel"
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Elle est intelligent.",
                correct="Elle est intelligente.",
                note="Avec un sujet féminin, l'adjectif doit être au féminin.",
            ),
            GrammarMistake(
                wrong="Ils sont beaus.",
                correct="Ils sont beaux.",
                note="Beau fait son pluriel en -x : beau → beaux.",
            ),
        ],
        related=["adjectifs-qualificatifs", "genre-noms", "adjectifs-possessifs"],
    ),
    GrammarTopic(
        slug="verbes-er-present",
        title="Les verbes en -ER au présent",
        level="A1",
        category="Verbes",
        summary="Conjugaison des verbes réguliers en -ER au présent de l'indicatif.",
        explanation="Les verbes en **-ER** représentent environ 90% des verbes français. Leur conjugaison est régulière.\n\n**Parler** :\n- je parle · tu parles · il/elle/on parle\n- nous parlons · vous parlez · ils/elles parlent\n\nLes terminaisons sont : **-e, -es, -e, -ons, -ez, -ent**.\n\nLes trois premières personnes se prononcent de la même façon.\n\nQuelques verbes en **-ER** ont des particularités orthographiques :\n- **-ger** (manger) : nous mangeons (le e se maintient devant -ons)\n- **-cer** (commencer) : nous commençons (ç devant -ons)\n- **-eler/-eter** : redoublement (je jette, j'appelle).",
        structure="radical + -e/-es/-e/-ons/-ez/-ent",
        rules=[
            "Terminaisons régulières pour tous les verbes en -ER (sauf 'aller').",
            "Les 3 premières personnes (je, tu, il) ont la même prononciation.",
            "Verbes en -ger : nous mangeons (pas *mangons).",
            "Verbes en -cer : nous commençons (pas *commencons).",
        ],
        examples=[
            GrammarExample(
                text="Je parle français et anglais.", translation="I speak French and English."
            ),
            GrammarExample(text="Tu habites à Paris ?", translation="Do you live in Paris?"),
            GrammarExample(text="Nous travaillons ensemble.", translation="We work together."),
            GrammarExample(text="Ils aiment le cinéma.", translation="They like the cinema."),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Je parle pas français.",
                correct="Je ne parle pas français.",
                note="La négation complète est 'ne...pas'.",
            ),
            GrammarMistake(
                wrong="Nous mangons à midi.",
                correct="Nous mangeons à midi.",
                note="Les verbes en -ger gardent le 'e' devant -ons.",
            ),
        ],
        related=["verbe-etre", "verbe-avoir", "verbes-pronominaux", "negation-simple"],
    ),
    GrammarTopic(
        slug="verbes-pronominaux",
        title="Les verbes pronominaux",
        level="A1",
        category="Verbes",
        summary="Les verbes pronominaux : se lever, s'habiller, se coucher...",
        explanation="Les **verbes pronominaux** se conjuguent avec un pronom réfléchi (me, te, se, nous, vous, se) qui renvoie au sujet.\n\n**Se laver** :\n- je me lave · tu te laves · il/elle/on se lave\n- nous nous lavons · vous vous lavez · ils/elles se lavent\n\nLes verbes pronominaux expriment :\n- **Action sur soi-même** : se laver, s'habiller, se réveiller\n- **Action réciproque** : se parler, se voir, s'aimer\n\nÀ la négation : *Je ne me lève pas tôt.*",
        structure="me/te/se/nous/vous/se + verbe",
        rules=[
            "Le pronom réfléchi change selon la personne.",
            "À l'infinitif, le pronom s'accorde : se laver, me laver, te laver...",
            "À la négation : ne + pronom + verbe + pas.",
            "Se devant une voyelle → s' : s'habiller, s'appeler.",
        ],
        examples=[
            GrammarExample(
                text="Je me lève à sept heures.", translation="I get up at seven o'clock."
            ),
            GrammarExample(
                text="Tu te douches le matin ?", translation="Do you shower in the morning?"
            ),
            GrammarExample(
                text="Nous nous rencontrons au café.",
                translation="We meet at the café.",
                note="réciproque",
            ),
            GrammarExample(
                text="Il ne se couche pas tôt.",
                translation="He doesn't go to bed early.",
                note="négation",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Je lève à sept heures.",
                correct="Je me lève à sept heures.",
                note="Le verbe 'se lever' a besoin du pronom réfléchi.",
            ),
            GrammarMistake(
                wrong="Je ne me pas lève.",
                correct="Je ne me lève pas.",
                note="La négation entoure le bloc pronom+verbe : ne me lève pas.",
            ),
        ],
        related=["verbes-er-present", "negation-simple", "heures", "futur-proche"],
    ),
    GrammarTopic(
        slug="heures",
        title="L'heure",
        level="A1",
        category="Expressions",
        summary="Comment dire l'heure en français.",
        explanation="Pour demander et dire l'heure en français :\n\n- *Quelle heure est-il ?* / *Il est quelle heure ?*\n\n**Heures piles** :\n- Il est deux heures. / Il est midi. / Il est minuit.\n\n**Minutes** :\n- Il est trois heures **cinq** (3h05).\n- Il est trois heures **dix** (3h10).\n- Il est trois heures **et quart** (3h15).\n- Il est trois heures **vingt** (3h20).\n- Il est trois heures **vingt-cinq** (3h25).\n- Il est trois heures **et demie** (3h30).\n- Il est quatre heures **moins vingt-cinq** (3h35).\n- Il est quatre heures **moins le quart** (3h45).\n- Il est quatre heures **moins dix** (3h50).",
        structure="Il est + [heure] + heure(s) + [minutes]",
        rules=[
            "Toujours utiliser 'Il est' (impersonnel) pour l'heure.",
            "Demie s'accorde seulement après 'heure' : trois heures et demie, mais midi et demi.",
            "Moins le quart pour 45 minutes.",
            "Système de 24h (quinze heures) utilisé pour les horaires officiels.",
        ],
        examples=[
            GrammarExample(text="Quelle heure est-il ?", translation="What time is it?"),
            GrammarExample(text="Il est huit heures.", translation="It's eight o'clock."),
            GrammarExample(text="Il est deux heures et demie.", translation="It's half past two."),
            GrammarExample(
                text="Le cours commence à neuf heures.",
                translation="The class starts at nine o'clock.",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="C'est huit heures.",
                correct="Il est huit heures.",
                note="On utilise toujours 'Il est' pour dire l'heure.",
            ),
            GrammarMistake(
                wrong="Il est trois heures et demi.",
                correct="Il est trois heures et demie.",
                note="'Demie' s'accorde au féminin après 'heure'.",
            ),
        ],
        related=["verbes-pronominaux", "jours-semaine", "verbes-er-present"],
    ),
    GrammarTopic(
        slug="aimer-detester",
        title="Exprimer ses goûts",
        level="A1",
        category="Verbes",
        summary="Aimer, adorer, détester, préférer + nom ou infinitif.",
        explanation="Pour exprimer ses goûts en français, on utilise :\n\n- **Aimer** : *J'aime le chocolat.*\n- **Adorer** : *J'adore la musique.*\n- **Détester** : *Je déteste le froid.*\n- **Préférer** : *Je préfère le thé.*\n\nCes verbes sont suivis :\n- D'un **nom avec article défini** : *J'aime **le** cinéma.*\n- D'un **infinitif** : *J'aime **danser**.*\n\nPour nuancer :\n- *J'aime **beaucoup**...* (beaucoup)\n- *J'aime **bien**...* (assez)\n- *Je n'aime **pas**...* (négation)\n- *Je déteste...* (fort)\n\nAccord/désaccord : *Moi aussi / Moi non plus / Moi si / Moi non.*",
        structure="aimer/adorer/détester/préférer + article défini + nom · aimer + infinitif",
        rules=[
            "Avec les verbes de goût, on utilise l'article défini devant le nom.",
            "Aimer + infinitif pour exprimer un goût pour une activité.",
            "Moi aussi (accord affirmatif), moi non plus (accord négatif).",
            "Moi si (contredire une négation), moi non (contredire une affirmation).",
        ],
        examples=[
            GrammarExample(text="J'aime le chocolat.", translation="I like chocolate."),
            GrammarExample(
                text="Je déteste faire la vaisselle.", translation="I hate doing the dishes."
            ),
            GrammarExample(
                text="Tu aimes danser ? — Oui, j'adore !",
                translation="Do you like dancing? — Yes, I love it!",
            ),
            GrammarExample(
                text="Je n'aime pas le café. — Moi non plus.",
                translation="I don't like coffee. — Me neither.",
                note="accord négatif",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="J'aime chocolat.",
                correct="J'aime le chocolat.",
                note="Avec aimer, l'article défini est obligatoire devant le nom.",
            ),
            GrammarMistake(
                wrong="Je n'aime pas le café. — Moi aussi.",
                correct="Je n'aime pas le café. — Moi non plus.",
                note="Pour exprimer l'accord avec une phrase négative, on dit 'moi non plus'.",
            ),
        ],
        related=["articles-definis", "negation-simple", "articles-partitifs"],
    ),
    GrammarTopic(
        slug="articles-partitifs",
        title="Les articles partitifs",
        level="A1",
        category="Articles",
        summary="du, de la, de l', des — pour exprimer une quantité indéterminée.",
        explanation="Les **articles partitifs** s'utilisent pour parler d'une quantité indéterminée de quelque chose (qu'on ne peut pas compter, ou une partie d'un tout).\n\n| | Masculin | Féminin |\n|---|----------|--------|\n| Singulier | du pain | de la confiture |\n| Devant voyelle | de l'eau | de l'huile |\n| Pluriel | des épinards | des pâtes |\n\n- *Je mange **du** pain.* (une partie du pain, pas tout le pain)\n- *Je bois **de l'eau**.* (une quantité d'eau)\n\n**Après une négation** : du/de la/de l'/des → **de** : *Je ne mange pas **de** viande.*\n\n**Après une expression de quantité** : *un kilo **de** pommes, beaucoup **de** sucre.*",
        structure="du (masc.) · de la (fém.) · de l' (voyelle) · des (pluriel)",
        rules=[
            "Le partitif exprime une partie d'un tout ou une quantité indéterminée.",
            "Après une négation, le partitif devient 'de'.",
            "Après une expression de quantité, toujours 'de'.",
            "Avec aimer/détester, on utilise l'article défini (pas le partitif) : J'aime le pain.",
        ],
        examples=[
            GrammarExample(
                text="Je mange du pain et de la confiture.", translation="I eat bread and jam."
            ),
            GrammarExample(text="Tu veux de l'eau ?", translation="Do you want some water?"),
            GrammarExample(
                text="Je ne bois pas de café.",
                translation="I don't drink coffee.",
                note="négation → de",
            ),
            GrammarExample(
                text="Un verre de vin, s'il vous plaît.",
                translation="A glass of wine, please.",
                note="quantité → de",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Je mange le pain.",
                correct="Je mange du pain.",
                note="Pour une quantité indéterminée, on utilise le partitif 'du', pas l'article défini 'le'.",
            ),
            GrammarMistake(
                wrong="J'aime du fromage.",
                correct="J'aime le fromage.",
                note="Avec 'aimer', on utilise l'article défini pour les généralités.",
            ),
        ],
        related=["articles-definis", "articles-indefinis", "negation-simple", "aimer-detester"],
    ),
    GrammarTopic(
        slug="negation-simple",
        title="La négation simple : ne…pas",
        level="A1",
        category="Phrase",
        summary="La structure de base de la négation en français.",
        explanation="La négation de base en français s'exprime avec **ne...pas** qui encadre le verbe conjugué. (The basic negation wraps the verb with 'ne...pas'.)\n\n- *Je **ne** parle **pas** anglais.* (I don't speak English)\n- *Il **n'** aime **pas** le café.* (He doesn't like coffee)\n\nPlace des mots :\n- **ne** avant le verbe (n' devant voyelle) — before the verb\n- **pas** après le verbe — after the verb\n\nAvec un verbe pronominal :\n- *Je **ne** me lève **pas** tôt.* (I don't get up early)\n\n⚠️ Après la négation, un/une/des et du/de la/des → **de** :\n- *J'ai une voiture → Je n'ai **pas de** voiture.* (I have a car → I don't have a car)",
        structure="ne + verbe + pas",
        rules=[
            "ne...pas encadre le verbe conjugué. (wraps around the conjugated verb)",
            "Ne devient n' devant une voyelle ou un h muet. (n' before vowel or silent h)",
            "Après la négation, les articles indéfinis et partitifs deviennent 'de'. (un/une/des → de after negation)",
            "À l'oral, le 'ne' est souvent omis (registre familier) : 'J'aime pas'. (In speech, 'ne' is often dropped.)",
        ],
        examples=[
            GrammarExample(text="Je ne parle pas chinois.", translation="I don't speak Chinese."),
            GrammarExample(
                text="Il n'aime pas les légumes.", translation="He doesn't like vegetables."
            ),
            GrammarExample(
                text="Nous n'avons pas d'enfants.", translation="We don't have children."
            ),
            GrammarExample(text="Je ne me souviens pas.", translation="I don't remember."),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Je pas parle français.",
                correct="Je ne parle pas français.",
                note="La négation complète utilise les deux mots : 'ne' et 'pas'.",
            ),
            GrammarMistake(
                wrong="Je n'ai pas des amis.",
                correct="Je n'ai pas d'amis.",
                note="Après la négation, 'des' devient 'de' ou 'd''.",
            ),
        ],
        related=["articles-partitifs", "articles-indefinis", "verbes-pronominaux"],
    ),
    GrammarTopic(
        slug="il-y-a",
        title="Il y a",
        level="A1",
        category="Phrase",
        summary="Il y a pour exprimer l'existence (there is/there are).",
        explanation="**Il y a** est une expression impersonnelle invariable qui sert à exprimer l'existence de quelque chose. (There is / There are.)\n\n- *Il y a **un** parc près d'ici.* (There is a park near here.)\n- *Il y a **des** magasins dans la rue.* (There are shops on the street.)\n\n**Formes** :\n- Affirmatif : *Il y a...*\n- Négatif : *Il n'y a **pas de**...* (There isn't/aren't any...)\n- Interrogatif : *Est-ce qu'il y a... ?* (Is/Are there...?)\n\n⚠️ Différence avec 'c'est' :\n- *Il y a un cinéma.* (existence — There is a cinema)\n- *C'est le cinéma.* (identification — That's the cinema)",
        structure="Il y a + article + nom",
        rules=[
            "Il y a est toujours invariable (jamais 'ils y ont'). (Always invariable.)",
            "Après 'il n'y a pas', l'article indéfini devient 'de'. (After negative: des → de.)",
            "'Il y a' peut aussi exprimer le temps écoulé : 'Il y a trois jours'. (Also means 'ago': three days ago.)",
        ],
        examples=[
            GrammarExample(
                text="Il y a une boulangerie au coin de la rue.",
                translation="There is a bakery on the street corner.",
            ),
            GrammarExample(
                text="Il y a beaucoup de touristes à Paris.",
                translation="There are many tourists in Paris.",
            ),
            GrammarExample(text="Il n'y a pas de problème.", translation="There is no problem."),
            GrammarExample(
                text="Est-ce qu'il y a un médecin ici ?", translation="Is there a doctor here?"
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Il a un parc.",
                correct="Il y a un parc.",
                note="Ne pas confondre 'il a' (possession) avec 'il y a' (existence).",
            ),
            GrammarMistake(
                wrong="Il y a des pommes. → Il n'y a pas des pommes.",
                correct="Il n'y a pas de pommes.",
                note="Après la négation, 'des' devient 'de'.",
            ),
        ],
        related=["articles-indefinis", "prepositions-lieu", "negation-simple"],
    ),
    GrammarTopic(
        slug="prepositions-lieu",
        title="Les prépositions de lieu",
        level="A1",
        category="Prépositions",
        summary="Prépositions pour indiquer la localisation : à côté de, près de, devant, derrière, etc.",
        explanation="Les **prépositions de lieu** servent à situer des personnes ou des objets dans l'espace.\n\n| Préposition | Usage | Exemple |\n|------------|-------|--------|\n| à côté de | proximité | à côté de la poste |\n| près de | pas loin | près d'ici |\n| loin de | distance | loin de la ville |\n| en face de | vis-à-vis | en face du cinéma |\n| devant | à l'avant | devant la porte |\n| derrière | à l'arrière | derrière la maison |\n| dans | à l'intérieur | dans le sac |\n| sur | au-dessus, contact | sur la table |\n| sous | au-dessous | sous le lit |\n| entre | au milieu de deux | entre la banque et la pharmacie |",
        structure="préposition + (de +) lieu",
        rules=[
            "De + le → du : à côté du parc ; de + les → des : près des magasins.",
            "Près de + lieu : près de l'école, près d'ici.",
            "De devient d' devant une voyelle : loin d'ici.",
        ],
        examples=[
            GrammarExample(
                text="La boulangerie est à côté de la pharmacie.",
                translation="The bakery is next to the pharmacy.",
            ),
            GrammarExample(
                text="Le chat est sous la table.", translation="The cat is under the table."
            ),
            GrammarExample(
                text="Il y a un jardin derrière la maison.",
                translation="There is a garden behind the house.",
            ),
            GrammarExample(
                text="La gare est loin d'ici.", translation="The train station is far from here."
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Le livre est sur le table.",
                correct="Le livre est sur la table.",
                note="'Table' est féminin, donc 'la table'.",
            ),
            GrammarMistake(
                wrong="à côté du école",
                correct="à côté de l'école",
                note="'De + le' → 'du', mais devant une voyelle → 'de l''.",
            ),
        ],
        related=["aller-a-chez", "il-y-a", "articles-definis"],
    ),
    GrammarTopic(
        slug="aller-a-chez",
        title="Aller à / chez",
        level="A1",
        category="Verbes",
        summary="Le verbe aller : conjugaison et prépositions à et chez.",
        explanation="Le verbe **aller** est irrégulier et très fréquent. Il exprime le déplacement.\n\n**Conjugaison** :\n- je vais · tu vas · il/elle/on va\n- nous allons · vous allez · ils/elles vont\n\n**Prépositions** :\n- **à + lieu** : *Je vais **au** cinéma. / **à la** poste. / **à l'** école. / **aux** toilettes.*\n- **chez + personne/commerce** : *Je vais **chez** le médecin. / **chez** mon ami. / **chez** le boulanger.*\n\nContractions avec **à** :\n- à + le → au : Je vais au supermarché.\n- à + les → aux : Je vais aux États-Unis.",
        structure="aller + à/au/à la/à l'/aux + lieu · aller + chez + personne",
        rules=[
            "Le verbe aller est irrégulier, à apprendre par cœur.",
            "Aller à + lieu (contraction obligatoire avec le et les).",
            "Aller chez + personne (le médecin, le coiffeur) ou + prénom.",
            "Aller + infinitif = futur proche : Je vais manger.",
        ],
        examples=[
            GrammarExample(
                text="Je vais au cinéma ce soir.",
                translation="I'm going to the cinema tonight.",
                note="à + le → au",
            ),
            GrammarExample(
                text="Tu vas chez le dentiste ?", translation="Are you going to the dentist?"
            ),
            GrammarExample(text="Nous allons à la plage.", translation="We're going to the beach."),
            GrammarExample(
                text="Elle va aux Pays-Bas.",
                translation="She's going to the Netherlands.",
                note="à + les → aux",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Je vais à le supermarché.",
                correct="Je vais au supermarché.",
                note="La contraction 'à + le = au' est obligatoire.",
            ),
            GrammarMistake(
                wrong="Je vais au dentiste.",
                correct="Je vais chez le dentiste.",
                note="Avec les personnes, on utilise 'chez'.",
            ),
        ],
        related=["prepositions-lieu", "futur-proche", "articles-definis"],
    ),
    GrammarTopic(
        slug="futur-proche",
        title="Le futur proche",
        level="A1",
        category="Verbes",
        summary="Aller + infinitif pour exprimer le futur proche.",
        explanation="Le **futur proche** se forme avec le verbe **aller** au présent + **infinitif**. Il exprime une action qui va se produire bientôt ou un projet.\n\n- *Je **vais** manger.* / *Tu **vas** étudier.*\n- *Il **va** pleuvoir.* / *Nous **allons** partir.*\n\nC'est le moyen le plus naturel d'exprimer le futur en français à l'oral, bien plus fréquent que le futur simple.",
        structure="aller (conjugué) + infinitif",
        rules=[
            "Aller est conjugué au présent, suivi directement de l'infinitif.",
            "Pas de préposition entre aller et l'infinitif.",
            "Usage très fréquent à l'oral pour tout type de futur rapproché.",
            "Ne pas confondre avec le futur simple (je mangerai).",
        ],
        examples=[
            GrammarExample(
                text="Je vais téléphoner à Marie.", translation="I'm going to call Marie."
            ),
            GrammarExample(
                text="Qu'est-ce que tu vas faire ce week-end ?",
                translation="What are you going to do this weekend?",
            ),
            GrammarExample(text="Il va neiger demain.", translation="It's going to snow tomorrow."),
            GrammarExample(
                text="Nous allons visiter le musée.", translation="We're going to visit the museum."
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Je vais à manger.",
                correct="Je vais manger.",
                note="Pas de préposition entre 'aller' et l'infinitif.",
            ),
            GrammarMistake(
                wrong="Il va va pleuvoir.",
                correct="Il va pleuvoir.",
                note="Un seul 'va' suffit : aller au présent + infinitif.",
            ),
        ],
        related=["aller-a-chez", "vouloir-pouvoir-devoir", "jours-semaine"],
    ),
    GrammarTopic(
        slug="vouloir-pouvoir-devoir",
        title="Vouloir, pouvoir, devoir",
        level="A1",
        category="Verbes",
        summary="Les trois verbes modaux : vouloir, pouvoir, devoir.",
        explanation="**Vouloir**, **pouvoir** et **devoir** sont des verbes irréguliers très fréquents, souvent suivis d'un infinitif.\n\n**Vouloir** (désir) :\n- je veux · tu veux · il veut · nous voulons · vous voulez · ils veulent\n\n**Pouvoir** (capacité, permission) :\n- je peux · tu peux · il peut · nous pouvons · vous pouvez · ils peuvent\n\n**Devoir** (obligation) :\n- je dois · tu dois · il doit · nous devons · vous devez · ils doivent\n\nCes verbes sont suivis directement de l'**infinitif**, sans préposition.",
        structure="vouloir/pouvoir/devoir + infinitif",
        rules=[
            "Vouloir exprime un désir ou une volonté.",
            "Pouvoir exprime la capacité ou la permission.",
            "Devoir exprime l'obligation ou la probabilité.",
            "Toujours suivis de l'infinitif sans préposition.",
        ],
        examples=[
            GrammarExample(
                text="Je veux apprendre le français.", translation="I want to learn French."
            ),
            GrammarExample(
                text="Tu peux m'aider ?", translation="Can you help me?", note="permission/capacité"
            ),
            GrammarExample(
                text="Nous devons partir à huit heures.",
                translation="We have to leave at eight o'clock.",
                note="obligation",
            ),
            GrammarExample(
                text="Elle ne peut pas venir ce soir.", translation="She can't come tonight."
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Je veux de partir.",
                correct="Je veux partir.",
                note="Pas de préposition entre le verbe modal et l'infinitif.",
            ),
            GrammarMistake(
                wrong="Je peu parler français.",
                correct="Je peux parler français.",
                note="'Pouvoir' : je peux (pas *je peu).",
            ),
        ],
        related=["futur-proche", "verbes-er-present", "imperatif-affirmatif"],
    ),
    GrammarTopic(
        slug="jours-semaine",
        title="Les jours, les mois et les expressions temporelles",
        level="A1",
        category="Expressions",
        summary="Les jours de la semaine, les mois et les expressions de temps.",
        explanation="Les **jours de la semaine** et les **mois** s'écrivent **sans majuscule** en français.\n\n**Jours** : *lundi, mardi, mercredi, jeudi, vendredi, samedi, dimanche.*\n\n- Jour précis : *Le lundi, je vais au sport.* (ce lundi précis ou habitude)\n- Habitude : *Le lundi, je vais au sport. / Tous les lundis...*\n- Pas d'article pour une date : *On se voit lundi.*\n\n**Mois** : *janvier, février, mars, avril, mai, juin, juillet, août, septembre, octobre, novembre, décembre.*\n\n**Expressions** :\n- *Aujourd'hui, demain, hier, après-demain, avant-hier*\n- *Ce matin, cet après-midi, ce soir, cette nuit*\n- *Le matin, l'après-midi, le soir (habitude)*",
        structure="le + jour (habitude) · jour seul (date précise) · en + mois",
        rules=[
            "Jours et mois sans majuscule.",
            "Le + jour = habitude ou jour précis dans un contexte.",
            "En + mois pour situer un événement : en janvier, en été.",
            "Pas de préposition pour un jour précis : Je pars lundi.",
        ],
        examples=[
            GrammarExample(
                text="Le lundi, j'ai cours de français.",
                translation="On Mondays, I have French class.",
            ),
            GrammarExample(text="On se voit mardi prochain.", translation="See you next Tuesday."),
            GrammarExample(
                text="Mon anniversaire est en avril.", translation="My birthday is in April."
            ),
            GrammarExample(
                text="Je travaille le matin et j'étudie l'après-midi.",
                translation="I work in the morning and study in the afternoon.",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="En lundi, je vais à la piscine.",
                correct="Le lundi, je vais à la piscine.",
                note="Avec les jours, on utilise 'le', pas 'en'.",
            ),
            GrammarMistake(
                wrong="Je pars en Mars.",
                correct="Je pars en mars.",
                note="Les mois s'écrivent sans majuscule en français.",
            ),
        ],
        related=["heures", "futur-proche", "verbes-pronominaux"],
    ),
]
