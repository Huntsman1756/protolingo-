"""French grammar topics — B1."""

from app.data._types import GrammarExample, GrammarMistake, GrammarTopic

B1_GRAMMAR_TOPICS: list[GrammarTopic] = [
    GrammarTopic(
        slug="subjonctif-present",
        title="Le subjonctif présent",
        level="B1",
        category="Verbes",
        summary="Formation et usages de base du subjonctif présent.",
        explanation="Le **subjonctif** est un mode (pas un temps) qui exprime la subjectivité : volonté, nécessité, doute, émotion.\n\n**Formation** : radical de la 3e personne du pluriel du présent (ils parlent → parl-) + terminaisons :\n- **-e, -es, -e, -ions, -iez, -ent**\n\n*que je parle, que tu parles, qu'il parle, que nous parlions, que vous parliez, qu'ils parlent.*\n\n**Verbes irréguliers fréquents** :\n- être : que je sois, que tu sois, qu'il soit, que nous soyons, que vous soyez, qu'ils soient\n- avoir : que j'aie, que tu aies, qu'il ait, que nous ayons, que vous ayez, qu'ils aient\n- aller : que j'aille, que tu ailles, qu'il aille, que nous allions, que vous alliez, qu'ils aillent\n- faire : que je fasse\n- pouvoir : que je puisse\n- savoir : que je sache\n- vouloir : que je veuille",
        structure="que + sujet + subjonctif",
        rules=[
            "Le subjonctif s'utilise après 'que'.",
            "Formation sur le radical de 'ils' au présent.",
            "Terminaisons identiques pour tous les verbes sauf être et avoir.",
            "Plusieurs irréguliers à mémoriser.",
        ],
        examples=[
            GrammarExample(text="Il faut que tu viennes.", translation=None),
            GrammarExample(text="Je veux que vous soyez à l'heure.", translation=None),
            GrammarExample(text="Il est important que nous fassions attention.", translation=None),
            GrammarExample(text="J'aimerais qu'elle aille mieux.", translation=None),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Il faut que tu viens.",
                correct="Il faut que tu viennes.",
                note="Après 'il faut que', on utilise le subjonctif, pas l'indicatif.",
            ),
            GrammarMistake(
                wrong="Je veux que tu es là.",
                correct="Je veux que tu sois là.",
                note="'Être' au subjonctif : que tu sois.",
            ),
        ],
        related=[
            "subjonctif-necessite",
            "subjonctif-volonte",
            "subjonctif-emotion",
            "subjonctif-doute",
        ],
    ),
    GrammarTopic(
        slug="subjonctif-necessite",
        title="Le subjonctif après les expressions de nécessité",
        level="B1",
        category="Verbes",
        summary="Subjonctif après il faut que, il est nécessaire que, il est essentiel que...",
        explanation="Après les expressions impersonnelles de **nécessité**, on utilise le subjonctif (quand il y a un changement de sujet).\n\n- *Il faut **que** tu **viennes**.*\n- *Il est nécessaire **que** nous **partions**.*\n- *Il est essentiel **que** vous **compreniez**.*\n- *Il est indispensable **qu**'il **fasse** un effort.*\n\n**Sans changement de sujet** → infinitif :\n- *Il faut **partir**.* (pas de 'que')\n- *Je dois **partir**.* (devoir + infinitif)",
        structure="il faut que / il est nécessaire que + subjonctif",
        rules=[
            "Changement de sujet → subjonctif.",
            "Même sujet → infinitif.",
            "Ne pas confondre il faut + infinitif et il faut que + subjonctif.",
        ],
        examples=[
            GrammarExample(text="Il faut que tu finisses tes devoirs.", translation=None),
            GrammarExample(
                text="Il est nécessaire que nous réservions à l'avance.", translation=None
            ),
            GrammarExample(
                text="Il faut être patient. (pas de changement de sujet)",
                translation=None,
                note="infinitif",
            ),
            GrammarExample(
                text="Il est indispensable qu'elle prenne ce médicament.", translation=None
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Il faut que je pars.",
                correct="Il faut que je parte. / Il faut partir.",
                note="Avec 'il faut que', on utilise le subjonctif.",
            ),
            GrammarMistake(
                wrong="Il faut que nous être patients.",
                correct="Il faut que nous soyons patients.",
                note="Après 'que', on conjugue le verbe au subjonctif.",
            ),
        ],
        related=["subjonctif-present", "subjonctif-volonte", "subjonctif-emotion"],
    ),
    GrammarTopic(
        slug="subjonctif-volonte",
        title="Le subjonctif après les verbes de volonté",
        level="B1",
        category="Verbes",
        summary="Subjonctif après vouloir que, souhaiter que, désirer que, exiger que...",
        explanation="Après les verbes exprimant la **volonté**, le **souhait** ou l'**ordre**, on utilise le subjonctif avec changement de sujet.\n\n- *Je veux **que** tu **viennes**.*\n- *Je souhaite **qu**'il **réussisse**.*\n- *J'aimerais **que** vous **soyez** là.*\n- *Le professeur exige **que** nous **fassions** les exercices.*\n\n**Sans changement de sujet** → infinitif :\n- *Je veux **venir**.* (pas *Je veux que je vienne*)",
        structure="vouloir/souhaiter/désirer/exiger + que + subjonctif",
        rules=[
            "Verbes de volonté + que + subjonctif avec changement de sujet.",
            "Même sujet → infinitif (je veux partir).",
            "Attention : 'espérer que' s'utilise normalement avec l'indicatif.",
        ],
        examples=[
            GrammarExample(text="Je veux que tu m'accompagnes.", translation=None),
            GrammarExample(text="Elle souhaite que son fils fasse des études.", translation=None),
            GrammarExample(
                text="Le directeur exige que tout le monde soit présent.", translation=None
            ),
            GrammarExample(text="J'aimerais que vous m'expliquiez ce problème.", translation=None),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Je veux que je viens.",
                correct="Je veux venir.",
                note="Même sujet = infinitif, pas de subordonnée avec 'que'.",
            ),
            GrammarMistake(
                wrong="Je souhaite qu'il vient.",
                correct="Je souhaite qu'il vienne.",
                note="Après 'souhaiter que', on utilise le subjonctif.",
            ),
        ],
        related=["subjonctif-present", "subjonctif-necessite", "vouloir-pouvoir-devoir"],
    ),
    GrammarTopic(
        slug="subjonctif-emotion",
        title="Le subjonctif après les expressions d'émotion",
        level="B1",
        category="Verbes",
        summary="Subjonctif après les expressions de sentiment : être content que, regretter que...",
        explanation="Après les expressions de **sentiment** ou d'**émotion**, on utilise le subjonctif.\n\n- *Je suis content(e) **que** tu **sois** là.*\n- *Je regrette **qu**'il **ne puisse** pas venir.*\n- *J'ai peur **que** vous **arriviez** en retard.*\n- *C'est dommage **que** nous **devions** partir.*\n\nExpressions d'émotion + que + subjonctif :\n*être content/heureux/triste/désolé/surpris que, regretter que, avoir peur que, être étonné que, trouver dommage que...*\n\n**Attention** : 'espérer que' utilise l'indicatif, pas le subjonctif.",
        structure="expression d'émotion + que + subjonctif",
        rules=[
            "Exprimer un sentiment → subjonctif.",
            "Espérer que fait exception et utilise l'indicatif.",
            "Avoir peur que + subjonctif.",
            "Avec le même sujet, on peut utiliser 'de + infinitif' : Je suis content de venir.",
        ],
        examples=[
            GrammarExample(text="Je suis content que tu sois venu.", translation=None),
            GrammarExample(
                text="Elle regrette que nous ne puissions pas rester.", translation=None
            ),
            GrammarExample(text="J'ai peur qu'il ne comprenne pas.", translation=None),
            GrammarExample(text="C'est dommage que vous partiez déjà.", translation=None),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Je suis content que tu es là.",
                correct="Je suis content que tu sois là.",
                note="Après une expression de sentiment, on utilise le subjonctif.",
            ),
            GrammarMistake(
                wrong="Je regrette qu'il vient pas.",
                correct="Je regrette qu'il ne vienne pas.",
                note="Regretter que + subjonctif + négation complète.",
            ),
        ],
        related=["subjonctif-present", "subjonctif-doute", "subjonctif-opinion"],
    ),
    GrammarTopic(
        slug="subjonctif-doute",
        title="Le subjonctif après les expressions de doute",
        level="B1",
        category="Verbes",
        summary="Subjonctif après les expressions de doute et d'incertitude.",
        explanation="Après les expressions de **doute** et d'**incertitude**, on utilise le subjonctif.\n\n- *Je ne pense **pas qu**'il **vienne**.*\n- *Je doute **que** ce **soit** vrai.*\n- *Je ne suis **pas sûr(e) qu**'elle **puisse** venir.*\n- *Il est possible **que** nous **arrivions** demain.*\n\n**Contraste important** :\n- *Je pense qu'il **vient**.* (certitude → indicatif)\n- *Je ne pense pas qu'il **vienne**.* (doute → subjonctif)\n\nForme négative ou interrogative de penser/croire → subjonctif.",
        structure="douter que / ne pas penser que / ne pas croire que + subjonctif",
        rules=[
            "Doute, incertitude → subjonctif.",
            "Penser/croire que (affirmatif) → indicatif.",
            "Ne pas penser/croire que → subjonctif.",
            "Il est possible/impossible que → subjonctif.",
        ],
        examples=[
            GrammarExample(text="Je ne pense pas qu'il pleuve demain.", translation=None),
            GrammarExample(text="Je doute que ce soit la bonne solution.", translation=None),
            GrammarExample(text="Il est possible que nous partions plus tôt.", translation=None),
            GrammarExample(
                text="Penses-tu qu'elle vienne ?",
                translation=None,
                note="interrogatif → subjonctif",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Je ne pense pas qu'il vient.",
                correct="Je ne pense pas qu'il vienne.",
                note="À la forme négative, 'penser que' est suivi du subjonctif.",
            ),
            GrammarMistake(
                wrong="Je pense qu'il vienne.",
                correct="Je pense qu'il vient.",
                note="À la forme affirmative, 'penser que' est suivi de l'indicatif.",
            ),
        ],
        related=["subjonctif-present", "subjonctif-opinion", "subjonctif-emotion"],
    ),
    GrammarTopic(
        slug="subjonctif-opinion",
        title="Le subjonctif après les évaluations impersonnelles",
        level="B1",
        category="Verbes",
        summary="Subjonctif après c'est important que, il est normal que, c'est bizarre que...",
        explanation="Après les **évaluations impersonnelles** exprimant un jugement, on utilise le subjonctif.\n\n- *C'est important **que** tu **saches** la vérité.*\n- *Il est normal **qu**'on **ait** peur.*\n- *C'est bizarre **qu**'il ne **réponde** pas.*\n- *Il vaut mieux **que** vous **partiez** maintenant.*\n\n**Exceptions notables** (indicatif) :\n- *Il est probable que...* (probabilité → indicatif)\n- *Il paraît que...* (ouï-dire → indicatif)\n- *Il me semble que...* (opinion atténuée → indicatif)",
        structure="c'est + adjectif + que + subjonctif · il est + adjectif + que + subjonctif",
        rules=[
            "Jugement, appréciation → subjonctif.",
            "Il est probable/certain/vrai que → indicatif.",
            "C'est une honte/dommage/bizarre que → subjonctif.",
            "Il vaut mieux que → subjonctif.",
        ],
        examples=[
            GrammarExample(text="C'est important que tu sois à l'heure.", translation=None),
            GrammarExample(text="Il est normal que vous ayez des doutes.", translation=None),
            GrammarExample(text="C'est bizarre qu'il ne soit pas encore arrivé.", translation=None),
            GrammarExample(text="Il vaut mieux que nous partions avant la nuit.", translation=None),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="C'est important que tu es là.",
                correct="C'est important que tu sois là.",
                note="Après 'c'est important que', on utilise le subjonctif.",
            ),
            GrammarMistake(
                wrong="Il est probable qu'il vienne.",
                correct="Il est probable qu'il viendra.",
                note="Après 'il est probable que', on utilise l'indicatif (futur ou présent).",
            ),
        ],
        related=["subjonctif-present", "subjonctif-emotion", "subjonctif-doute"],
    ),
    GrammarTopic(
        slug="accord-participe-avoir",
        title="L'accord du participe passé avec avoir",
        level="B1",
        category="Verbes",
        summary="Accorder le participe passé avec avoir quand le COD est placé avant.",
        explanation="Avec l'auxiliaire **avoir**, le participe passé s'accorde avec le **complément d'objet direct (COD)** si celui-ci est placé **avant** le verbe.\n\n- *J'ai mangé **la pomme**.* (COD après → pas d'accord)\n- ***La pomme** que j'ai mangé**e**.* (COD avant → accord)\n- *Ces fleurs, je **les** ai cueilli**es**.* (pronom COD avant → accord)\n\n**Pas d'accord** :\n- Avec le COD placé après le verbe.\n- Avec les verbes impersonnels (il a plu).\n- Avec 'en' (quantité indéfinie) : Des pommes, j'en ai mangé.",
        structure="COD avant le verbe + avoir → participe passé accordé",
        rules=[
            "Le COD doit être avant le verbe pour qu'il y ait accord.",
            "Avec 'que' relatif, le COD est souvent avant → accord.",
            "Avec les pronoms COD (le, la, les), accord.",
            "Pas d'accord avec 'en'.",
        ],
        examples=[
            GrammarExample(
                text="Les pommes que j'ai mangées étaient délicieuses.",
                translation=None,
                note="que = COD avant → accord",
            ),
            GrammarExample(
                text="Cette lettre, je l'ai écrite hier.",
                translation=None,
                note="l' = la lettre → fém. sing.",
            ),
            GrammarExample(
                text="J'ai acheté des fleurs.", translation=None, note="COD après → pas d'accord"
            ),
            GrammarExample(text="Les filles que j'ai rencontrées sont sympas.", translation=None),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="La lettre que j'ai écris.",
                correct="La lettre que j'ai écrite.",
                note="'Que' remplace 'la lettre' (fém. sing.) → le participe s'accorde.",
            ),
            GrammarMistake(
                wrong="Les décisions que le directeur a prise.",
                correct="Les décisions que le directeur a prises.",
                note="'Que' = 'les décisions' (fém. plur.) → 'prises'.",
            ),
        ],
        related=["passe-compose-avoir", "accord-participe-etre", "pronoms-relatifs-simples"],
    ),
    GrammarTopic(
        slug="plus-que-parfait",
        title="Le plus-que-parfait",
        level="B1",
        category="Verbes",
        summary="Le plus-que-parfait pour exprimer l'antériorité dans le passé.",
        explanation="Le **plus-que-parfait** exprime une action passée qui s'est produite **avant** une autre action passée.\n\n**Formation** : être/avoir à l'imparfait + participe passé.\n\n- *J'**avais** déjà **mangé** quand il est arrivé.*\n- *Elle **était** déjà **partie** quand je suis rentré.*\n\n**Usages** :\n- Antériorité par rapport à une action au passé composé/imparfait.\n- Après 'si' pour exprimer le regret (conditionnel passé).\n- Dans le discours indirect pour exprimer l'antériorité.",
        structure="être/avoir (imparfait) + participe passé",
        rules=[
            "Action antérieure à une autre action passée.",
            "Mêmes règles d'accord que le passé composé.",
            "Avec 'si' → regret : Si j'avais su !",
            "Discours indirect : Il a dit qu'il avait fini.",
        ],
        examples=[
            GrammarExample(text="Quand je suis arrivé, il était déjà parti.", translation=None),
            GrammarExample(text="Elle avait réservé une table avant de venir.", translation=None),
            GrammarExample(
                text="Si j'avais su, je ne serais pas venu.", translation=None, note="regret"
            ),
            GrammarExample(
                text="Il m'a dit qu'il n'avait pas reçu mon message.",
                translation=None,
                note="discours indirect",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Quand je suis arrivé, il est déjà parti.",
                correct="Quand je suis arrivé, il était déjà parti.",
                note="L'action antérieure doit être au plus-que-parfait.",
            ),
            GrammarMistake(
                wrong="Si j'aurais su...",
                correct="Si j'avais su...",
                note="Après 'si' conditionnel, pas de conditionnel. On utilise le plus-que-parfait.",
            ),
        ],
        related=["passe-compose-avoir", "passe-compose-etre", "imparfait", "concordance-temps"],
    ),
    GrammarTopic(
        slug="passif",
        title="La voix passive",
        level="B1",
        category="Verbes",
        summary="La voix passive : être + participe passé, accord avec le sujet.",
        explanation="La **voix passive** met l'accent sur l'objet de l'action plutôt que sur l'agent.\n\n**Formation** : être (au temps voulu) + participe passé (accordé avec le sujet) + **par** (ou **de**) + complément d'agent.\n\n- Voix active : *Le chef **prépare** le repas.*\n- Voix passive : *Le repas **est préparé par** le chef.*\n\nLe participe passé s'accorde avec le sujet.\n\n**Par** vs **de** :\n- **Par** pour une action concrète : *Il a été attrapé **par** la police.*\n- **De** pour un sentiment ou un état : *Il est aimé **de** tous.*",
        structure="être (conjugué) + participe passé (accordé) + par/de + complément d'agent",
        rules=[
            "Le participe passé s'accorde avec le sujet.",
            "Par pour les actions, de pour les sentiments.",
            "Le complément d'agent est souvent omis quand il est inconnu ou évident.",
            "La voix passive est moins fréquente en français qu'en anglais.",
        ],
        examples=[
            GrammarExample(text="Ce livre a été écrit par un auteur français.", translation=None),
            GrammarExample(text="La décision sera annoncée demain.", translation=None),
            GrammarExample(
                text="Il est respecté de tous ses collègues.",
                translation=None,
                note="de pour un sentiment",
            ),
            GrammarExample(text="Le voleur a été arrêté par la police.", translation=None),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Le repas est préparé du chef.",
                correct="Le repas est préparé par le chef.",
                note="On utilise 'par' pour introduire le complément d'agent.",
            ),
            GrammarMistake(
                wrong="Ce livre a été écrite par un auteur célèbre.",
                correct="Ce livre a été écrit par un auteur célèbre.",
                note="Accord avec le sujet : 'livre' est masculin → 'écrit'.",
            ),
        ],
        related=["on-impersonnel", "forme-passive-pronominale"],
    ),
    GrammarTopic(
        slug="on-impersonnel",
        title="Le 'on' impersonnel",
        level="B1",
        category="Pronoms",
        summary="Le pronom 'on' pour exprimer une action à agent non spécifié.",
        explanation="Le pronom **on** a plusieurs valeurs en français :\n\n**1. 'Nous' à l'oral** (le plus fréquent) :\n- *On va au cinéma ?* (= nous allons)\n\n**2. Impersonnel / indéfini** (agent indéterminé) :\n- *On parle français ici.* (des gens, en général)\n- *On m'a volé mon vélo.* (quelqu'un, je ne sais pas qui)\n\n**3. Généralité** :\n- *On ne sait jamais.* (les gens en général)\n\nEn français, 'on' est le moyen le plus naturel d'exprimer une action à agent non spécifié, là où d'autres langues utilisent le passif.",
        structure="on + verbe (3e personne du singulier)",
        rules=[
            "On est toujours conjugué à la 3e personne du singulier.",
            "Plus naturel que le passif pour exprimer l'indétermination.",
            "Très fréquent à l'oral pour remplacer 'nous'.",
            "L'adjectif s'accorde avec le sens : On est contents (nous).",
        ],
        examples=[
            GrammarExample(text="On parle français au Québec.", translation=None, note="indéfini"),
            GrammarExample(text="On m'a dit que tu déménageais.", translation=None),
            GrammarExample(text="On va au restaurant ce soir ?", translation=None, note="nous"),
            GrammarExample(
                text="On ne peut pas toujours gagner.", translation=None, note="généralité"
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="On parlent français ici.",
                correct="On parle français ici.",
                note="'On' se conjugue toujours à la 3e personne du singulier.",
            ),
            GrammarMistake(
                wrong="Le français est parlé ici. (trop formel)",
                correct="On parle français ici. (plus naturel)",
                note="Le 'on' impersonnel est souvent préférable au passif.",
            ),
        ],
        related=["passif", "forme-passive-pronominale", "impersonalite"],
    ),
    GrammarTopic(
        slug="forme-passive-pronominale",
        title="La forme passive pronominale",
        level="B1",
        category="Verbes",
        summary="La forme passive avec 'se' pour exprimer une action générale.",
        explanation="En français, on utilise la construction **se + verbe** pour exprimer un sens passif, surtout pour des actions générales.\n\n- *Ce vin **se** boit frais.* (= ce vin doit être bu frais)\n- *Ce mot **s**'écrit avec un accent.* (= ce mot est écrit avec un accent)\n- *Les billets **se** vendent ici.* (= les billets sont vendus ici)\n\nCette forme est très utilisée pour :\n- Les instructions générales\n- Les propriétés des choses\n- Les actions habituelles",
        structure="se + verbe (3e personne) + complément",
        rules=[
            "Sens passif avec un sujet inanimé.",
            "Très naturel en français pour les actions générales.",
            "Évite la lourdeur du passif avec 'être'.",
        ],
        examples=[
            GrammarExample(text="Ce plat se mange froid.", translation=None),
            GrammarExample(text="Le français se parle sur tous les continents.", translation=None),
            GrammarExample(text="Cette chemise se lave à 30 degrés.", translation=None),
            GrammarExample(text="Les erreurs se corrigent facilement.", translation=None),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Ce vin est bu frais.",
                correct="Ce vin se boit frais.",
                note="La forme passive pronominale est plus naturelle pour les propriétés générales.",
            ),
            GrammarMistake(
                wrong="Ça se mange → Ça mange.",
                correct="Ça se mange.",
                note="Sans 'se', le sens devient actif (quelque chose qui mange).",
            ),
        ],
        related=["passif", "on-impersonnel"],
    ),
    GrammarTopic(
        slug="pronoms-relatifs-simples",
        title="Les pronoms relatifs simples : qui, que, où",
        level="B1",
        category="Pronoms",
        summary="Révision et approfondissement des pronoms relatifs simples.",
        explanation="**Qui**, **que** et **où** sont les trois pronoms relatifs de base.\n\n**Qui** = sujet du verbe de la relative.\n- *C'est la personne **qui** m'a aidé.* (la personne a aidé)\n\n**Que** = objet direct du verbe de la relative.\n- *C'est le livre **que** j'ai lu.* (j'ai lu le livre)\n\n**Où** = complément de lieu ou de temps.\n- *C'est le restaurant **où** on a mangé.* (lieu)\n- *C'est l'année **où** je suis né.* (temps)\n\n**Attention** : 'que' devient 'qu'' devant une voyelle.",
        structure="nom + qui/que/qu'/où + proposition relative",
        rules=[
            "Qui = sujet (suivi d'un verbe).",
            "Que = COD (suivi d'un sujet).",
            "Où = lieu ou temps.",
            "Ne pas confondre qui (sujet) et que (objet).",
        ],
        examples=[
            GrammarExample(
                text="Le monsieur qui porte un chapeau est mon voisin.", translation=None
            ),
            GrammarExample(text="La chanson que tu écoutes est très belle.", translation=None),
            GrammarExample(text="La ville où j'habite est très animée.", translation=None),
            GrammarExample(text="Le jour où on s'est rencontrés, il neigeait.", translation=None),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="La personne que parle.",
                correct="La personne qui parle.",
                note="Si le pronom est sujet du verbe de la relative → 'qui'.",
            ),
            GrammarMistake(
                wrong="C'est le moment qui je préfère.",
                correct="C'est le moment que je préfère.",
                note="Si le pronom est COD (je préfère le moment) → 'que'.",
            ),
        ],
        related=["pronoms-relatifs-composes", "dont", "relatifs-simples"],
    ),
    GrammarTopic(
        slug="pronoms-relatifs-composes",
        title="Les pronoms relatifs composés",
        level="B1",
        category="Pronoms",
        summary="Lequel, laquelle, lesquels, lesquelles — les pronoms relatifs après préposition.",
        explanation="Les **pronoms relatifs composés** s'utilisent après une préposition quand l'antécédent n'est pas une personne.\n\n| | Singulier | Pluriel |\n|---|----------|--------|\n| Masculin | **lequel** | **lesquels** |\n| Féminin | **laquelle** | **lesquelles** |\n\n- *C'est le pays **dans lequel** j'habite.*\n- *C'est la raison **pour laquelle** je suis venu.*\n\n**Contractions** :\n- à + lequel → auquel, à + lesquels → auxquels, à + lesquelles → auxquelles\n- de + lequel → duquel, de + lesquels → desquels, de + lesquelles → desquelles",
        structure="préposition + lequel/laquelle/lesquels/lesquelles",
        rules=[
            "Utilisé après une préposition (sauf avec une personne → qui).",
            "S'accorde en genre et en nombre avec l'antécédent.",
            "Contractions avec à (auquel, auxquels...) et de (duquel, desquels...).",
            "Avec une personne, on préfère 'préposition + qui' : l'ami avec qui je voyage.",
        ],
        examples=[
            GrammarExample(
                text="Le projet sur lequel je travaille est confidentiel.", translation=None
            ),
            GrammarExample(text="La table sous laquelle le chat s'est caché.", translation=None),
            GrammarExample(
                text="Les amis avec lesquels je voyage.",
                translation=None,
                note="personnes aussi possible",
            ),
            GrammarExample(
                text="Le problème auquel je pense.", translation=None, note="à + lequel → auquel"
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Le problème à lequel je pense. (correct mais lourd)",
                correct="Le problème auquel je pense.",
                note="La contraction 'auquel' est la forme correcte.",
            ),
            GrammarMistake(
                wrong="Le pays dans lequel je vis. → Le pays dans quoi je vis.",
                correct="Le pays dans lequel je vis.",
                note="'Quoi' n'est pas un pronom relatif pour un antécédent précis.",
            ),
        ],
        related=["pronoms-relatifs-simples", "dont", "relatifs-simples"],
    ),
    GrammarTopic(
        slug="dont",
        title="Le pronom relatif 'dont'",
        level="B1",
        category="Pronoms",
        summary="Le pronom 'dont' pour remplacer un complément introduit par 'de'.",
        explanation="Le pronom relatif **dont** remplace un complément introduit par **de** (complément du nom, du verbe ou de l'adjectif).\n\n**Avec un verbe + de** :\n- *Je parle **de** ce livre.* → *C'est le livre **dont** je parle.*\n\n**Avec un nom + de** :\n- *Je connais **l'auteur de** ce livre.* → *C'est le livre **dont** je connais l'auteur.*\n\n**Avec un adjectif + de** :\n- *Je suis fier **de** mon fils.* → *C'est mon fils **dont** je suis fier.*\n\n**Dont** ne peut pas être utilisé après une préposition → on utilise de + lequel (duquel).",
        structure="nom + dont + sujet + verbe",
        rules=[
            "Dont remplace 'de + nom'.",
            "Toujours placé en tête de la proposition relative.",
            "Ne peut pas suivre une préposition (on utilise duquel/desquels...).",
            "Le nom qui suit 'dont' prend l'article défini.",
        ],
        examples=[
            GrammarExample(
                text="Le film dont je t'ai parlé est en salle.", translation=None, note="parler de"
            ),
            GrammarExample(
                text="L'auteur dont j'admire l'œuvre.", translation=None, note="admirer l'œuvre de"
            ),
            GrammarExample(
                text="C'est un résultat dont je suis fier.", translation=None, note="fier de"
            ),
            GrammarExample(text="La ville dont je viens.", translation=None, note="venir de"),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Le film que je t'ai parlé.",
                correct="Le film dont je t'ai parlé.",
                note="'Parler de' → 'dont' (pas 'que').",
            ),
            GrammarMistake(
                wrong="C'est l'homme de qui je t'ai parlé.",
                correct="C'est l'homme dont je t'ai parlé.",
                note="'Dont' est la forme standard. 'De qui' est accepté pour les personnes mais moins élégant.",
            ),
        ],
        related=["pronoms-relatifs-simples", "pronoms-relatifs-composes"],
    ),
    GrammarTopic(
        slug="si-imparfait-conditionnel",
        title="L'hypothèse irréelle : si + imparfait + conditionnel",
        level="B1",
        category="Phrase",
        summary="La deuxième conditionnelle : si + imparfait + conditionnel présent.",
        explanation="Pour exprimer une **hypothèse irréelle ou peu probable** dans le présent, on utilise :\n\n**Si + imparfait + conditionnel présent.**\n\n- *Si j'**avais** de l'argent, je **voyagerais**.* (mais je n'ai pas d'argent)\n- *Si je **pouvais**, je **t'aiderais**.* (mais je ne peux pas)\n\nRappel : **jamais de conditionnel après 'si'**.\n\nCette structure exprime :\n- Un regret : *Si j'étais plus jeune...*\n- Une situation hypothétique : *Si on gagnait au loto...*\n- Un conseil poli : *Si j'étais toi, je...*",
        structure="si + imparfait + conditionnel présent",
        rules=[
            "Imparfait après 'si'.",
            "Conditionnel présent dans la principale.",
            "Jamais de conditionnel après 'si'.",
            "Exprime une situation contraire à la réalité présente.",
        ],
        examples=[
            GrammarExample(
                text="Si j'avais plus de temps, j'apprendrais le piano.", translation=None
            ),
            GrammarExample(
                text="Si tu habitais plus près, on se verrait plus souvent.", translation=None
            ),
            GrammarExample(
                text="Si j'étais toi, j'accepterais cette offre.", translation=None, note="conseil"
            ),
            GrammarExample(text="S'il faisait beau, on irait à la plage.", translation=None),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Si j'aurais de l'argent, je voyagerais.",
                correct="Si j'avais de l'argent, je voyagerais.",
                note="Après 'si', on n'utilise jamais le conditionnel.",
            ),
            GrammarMistake(
                wrong="Si je serais riche...",
                correct="Si j'étais riche...",
                note="'Si' + imparfait, pas 'si' + conditionnel.",
            ),
        ],
        related=["conditionnel-present", "imparfait", "conditionnel-passe", "si-present-futur"],
    ),
    GrammarTopic(
        slug="conditionnel-passe",
        title="Le conditionnel passé",
        level="B1",
        category="Verbes",
        summary="Le conditionnel passé pour exprimer le regret, le reproche ou une hypothèse passée.",
        explanation="Le **conditionnel passé** exprime :\n\n**1. Le regret / reproche** :\n- *J'**aurais dû** étudier plus.* (regret)\n- *Tu **aurais pu** me prévenir !* (reproche)\n\n**2. Hypothèse passée non réalisée** :\n- *Si j'avais su, je **serais venu**.*\n\n**Formation** : être/avoir au conditionnel présent + participe passé.\n- *J'aurais parlé, tu serais allé(e)...*\n\nMêmes règles d'accord que le passé composé.",
        structure="être/avoir (conditionnel présent) + participe passé",
        rules=[
            "Exprimer un regret : j'aurais dû, j'aurais voulu.",
            "Exprimer un reproche : tu aurais pu, il aurait fallu.",
            "Hypothèse passée : avec 'si + plus-que-parfait'.",
            "Mêmes règles d'accord que le passé composé.",
        ],
        examples=[
            GrammarExample(text="J'aurais dû t'écouter.", translation=None, note="regret"),
            GrammarExample(
                text="Tu aurais pu me le dire plus tôt !", translation=None, note="reproche"
            ),
            GrammarExample(
                text="Si j'avais su, je serais venu(e).", translation=None, note="hypothèse passée"
            ),
            GrammarExample(text="Elle aurait aimé être là.", translation=None),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="J'aurais dû de partir.",
                correct="J'aurais dû partir.",
                note="'Devoir' est suivi directement de l'infinitif, sans 'de'.",
            ),
            GrammarMistake(
                wrong="Si j'aurais su, je serais venu.",
                correct="Si j'avais su, je serais venu.",
                note="Après 'si', c'est le plus-que-parfait, pas le conditionnel.",
            ),
        ],
        related=["conditionnel-present", "si-imparfait-conditionnel", "plus-que-parfait"],
    ),
    GrammarTopic(
        slug="concordance-temps",
        title="La concordance des temps au discours indirect",
        level="B1",
        category="Phrase",
        summary="La concordance des temps quand le verbe introducteur est au passé.",
        explanation="Quand le verbe introducteur est au **passé**, les temps changent selon la règle de concordance :\n\n| Discours direct | Discours indirect (passé) |\n|----------------|--------------------------|\n| Présent | Imparfait |\n| Passé composé | Plus-que-parfait |\n| Futur simple | Conditionnel présent |\n| Futur proche | Aller (imparfait) + infinitif |\n| Imparfait | Imparfait (inchangé) |\n\n- Il a dit : « Je **suis** fatigué. » → Il a dit qu'il **était** fatigué.\n- Il a dit : « J'**ai fini**. » → Il a dit qu'il **avait fini**.\n- Il a dit : « Je **partirai** demain. » → Il a dit qu'il **partirait** le lendemain.",
        structure="verbe introducteur au passé + que + temps décalé",
        rules=[
            "Présent → imparfait.",
            "Passé composé → plus-que-parfait.",
            "Futur → conditionnel présent.",
            "Imparfait et plus-que-parfait ne changent pas.",
        ],
        examples=[
            GrammarExample(
                text="Il a dit qu'il était malade.", translation=None, note="présent → imparfait"
            ),
            GrammarExample(
                text="Elle m'a dit qu'elle avait fini son travail.",
                translation=None,
                note="passé composé → plus-que-parfait",
            ),
            GrammarExample(
                text="Ils ont annoncé qu'ils partiraient le lendemain.",
                translation=None,
                note="futur → conditionnel",
            ),
            GrammarExample(
                text="Il a expliqué qu'il allait déménager.",
                translation=None,
                note="futur proche → aller à l'imparfait",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Il a dit qu'il est malade.",
                correct="Il a dit qu'il était malade.",
                note="Quand le verbe introducteur est au passé, le présent devient imparfait.",
            ),
            GrammarMistake(
                wrong="Elle a dit qu'elle viendra.",
                correct="Elle a dit qu'elle viendrait.",
                note="Le futur devient conditionnel présent.",
            ),
        ],
        related=["discours-indirect-passe", "plus-que-parfait", "conditionnel-present"],
    ),
    GrammarTopic(
        slug="connecteurs-logiques",
        title="Les connecteurs logiques",
        level="B1",
        category="Expression",
        summary="Connecteurs pour exprimer la cause, la conséquence, l'opposition et la concession.",
        explanation="Les **connecteurs logiques** structurent l'argumentation en indiquant les relations entre les idées.\n\n**Cause** :\n- parce que / car / puisque / comme (+ indicatif)\n- grâce à / à cause de (+ nom)\n\n**Conséquence** :\n- donc / alors / par conséquent / c'est pourquoi\n- si bien que (+ indicatif) / de sorte que (+ subjonctif)\n\n**Opposition** :\n- mais / cependant / pourtant / en revanche / par contre\n\n**Concession** :\n- bien que / quoique (+ subjonctif)\n- même si (+ indicatif)\n- malgré (+ nom)",
        structure="connecteur + proposition",
        rules=[
            "Bien que + subjonctif pour la concession.",
            "Même si + indicatif pour l'hypothèse.",
            "Car et parce que sont interchangeables (car est plus formel).",
            "Donc ne peut pas commencer une phrase en français très formel.",
        ],
        examples=[
            GrammarExample(
                text="Je suis resté chez moi parce qu'il pleuvait.", translation=None, note="cause"
            ),
            GrammarExample(
                text="Il a beaucoup travaillé, donc il a réussi.",
                translation=None,
                note="conséquence",
            ),
            GrammarExample(
                text="Il est malade, pourtant il est venu travailler.",
                translation=None,
                note="opposition",
            ),
            GrammarExample(
                text="Bien qu'il soit timide, il a fait un discours.",
                translation=None,
                note="concession + subjonctif",
            ),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Bien qu'il est malade, il travaille.",
                correct="Bien qu'il soit malade, il travaille.",
                note="'Bien que' est suivi du subjonctif.",
            ),
            GrammarMistake(
                wrong="Même s'il pleuve, je sortirai.",
                correct="Même s'il pleut, je sortirai.",
                note="'Même si' est suivi de l'indicatif, pas du subjonctif.",
            ),
        ],
        related=["discours-indirect-passe", "concordance-temps", "connecteurs-avances"],
    ),
    GrammarTopic(
        slug="discours-indirect-passe",
        title="Le discours indirect au passé",
        level="B1",
        category="Phrase",
        summary="Rapporter des paroles quand le verbe introducteur est au passé.",
        explanation="Quand on rapporte des paroles et que le verbe introducteur est au **passé**, on applique la concordance des temps.\n\n- *Il a dit : « Je **suis** fatigué. »* → *Il a dit qu'il **était** fatigué.*\n\n**Questions** : \n- Totales : *Il a demandé **si** je voulais un café.*\n- Partielles : *Elle a demandé **où** j'habitais.*\n\n**Ordre/Conseil** :\n- *Il m'a dit **de** venir.* (dire de + infinitif)\n- *Elle m'a conseillé **de** partir.*",
        structure="verbe introducteur au passé + que/si/de + temps décalé",
        rules=[
            "Concordance des temps obligatoire.",
            "Questions totales → 'si'.",
            "Questions partielles → mot interrogatif.",
            "Ordre/conseil → 'de' + infinitif.",
        ],
        examples=[
            GrammarExample(text="Il a dit qu'il viendrait le lendemain.", translation=None),
            GrammarExample(text="Elle m'a demandé si j'avais faim.", translation=None),
            GrammarExample(text="Il voulait savoir où j'habitais.", translation=None),
            GrammarExample(text="Le professeur nous a dit de faire l'exercice.", translation=None),
        ],
        common_mistakes=[
            GrammarMistake(
                wrong="Il a dit qu'il viendra.",
                correct="Il a dit qu'il viendrait.",
                note="Avec un verbe introducteur au passé, le futur devient conditionnel.",
            ),
            GrammarMistake(
                wrong="Il m'a dit que de venir.",
                correct="Il m'a dit de venir.",
                note="Pour un ordre, on utilise 'dire de' + infinitif, pas 'dire que de'.",
            ),
        ],
        related=["concordance-temps", "style-indirect-present", "connecteurs-logiques"],
    ),
]
