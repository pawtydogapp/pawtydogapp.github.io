/* Français : contenu hors compétences et guides de comportement (voir cmds.js, behav.js). */
import cmds from "./cmds";
import behav from "./behav";

const tier = { 1: "Facile", 2: "Intermédiaire", 3: "Avancé" };
const quest = { new: "Nouvelle compétence", cont: "Continue", prac: "Révision" };
const levels = [{ n: "Débutant" }, { n: "Étudiant" }, { n: "Diplômé" }, { n: "Pro" }, { n: "Champion" }, { n: "Maître" }, { n: "Légende" }];
const ranks = [{ n: "Nouveau" }, { n: "Apprenti" }, { n: "Conducteur" }, { n: "Éducateur" }, { n: "Expert" }, { n: "Spécialiste" }, { n: "Complet" }];

const stucks = {
  cmd: "Bloqué ? Simplifie, ne parle pas plus fort. Recule d'une étape, obtiens 2 réussites faciles, arrête là. Remontre avec un leurre au lieu de répéter le signal. Si le chien se lève d'une position, récompense plus vite à la répétition suivante.",
  trick: "Bloqué ? Découpe le tour en morceaux plus petits et paie le plus petit. Filme une séance, la plupart des problèmes de tours se cachent dans la main humaine, pas dans le chien.",
  agi: "Il refuse l'obstacle ? Plus bas, plus court, ou reviens à payer les simples tentatives. Ne pousse ni ne soulève jamais le chien sur le matériel, une répétition effrayante coûte des semaines.",
  life: "Dépassé plutôt que bloqué ? Ajoute de la distance, raccourcis la sortie, termine dans le calme et réessaie un autre jour. Le travail d'exposition échoue bruyamment mais se rattrape vite.",
};

const ladders = {
  cmd: [
    ["Séance 1 · Montre, ne teste pas", "Guide chaque répétition avec une friandise en main, récompense en 1 seconde. Réussite = le comportement a eu lieu, avec toute ton aide."],
    ["Séances 2 à 4 · Guide et nomme", "Continue à guider, dis le signal une fois juste avant le comportement. Réussite = 3 à 5 répétitions assistées d'affilée."],
    ["Séances 5 à 7 · Retire le leurre", "Main vide, même mouvement, récompense depuis la pochette. Les positions méritent 1 à 3 secondes d'attente avant paiement."],
    ["Séance 8 et plus · Le signal d'abord", "Un signal, pas de leurre. Augmente une difficulté à la fois : durée au-delà de 5 secondes, nouvelles pièces, distraction légère."],
  ],
  trick: [
    ["Séance 1 · Suis le leurre", "Leurre grand et évident, paiement immédiat pour tout mouvement dans la bonne direction. Réussite = une version grossière a eu lieu une fois."],
    ["Séances 2 à 4 · Façonne", "Paie les 3 meilleurs essais sur 5, ignore le reste. Dis le signal une fois par répétition. Séries de 3 à 5 répétitions, les tours fatiguent le cerveau."],
    ["Séances 5 à 7 · Réduis l'aide", "Le leurre devient un petit geste de la main. La précision monte : les répétitions les plus propres gagnent une double friandise."],
    ["Séance 8 et plus · En scène", "Le signal d'abord, le geste seulement en secours. Nouvelles pièces, puis devant du monde. Les applaudissements comptent comme distraction."],
  ],
  agi: [
    ["Séance 1 · Tout petit", "Barre au sol, tunnel court, table basse. Réussite = 1 tentative joyeuse, payée comme un jackpot."],
    ["Séances 2 à 4 · Construis l'amour, pas la hauteur", "Répète la version facile jusqu'à ce que le chien te tire vers l'obstacle. La confiance d'abord, les critères ensuite."],
    ["Séances 5 à 7 · Monte une seule chose", "Hauteur, longueur ou angle, jamais deux dans une séance. Dis le signal de l'obstacle quand le chien s'engage."],
    ["Séance 8 et plus · Vitesse et enchaînement", "Envoie depuis quelques pas, enchaîne 2 obstacles, séances de moins de 10 minutes. La joie est le moteur de l'agility."],
  ],
  life: [
    ["Sortie 1 · Explore, ne force pas", "Version courte et facile, sous le seuil de stress. Réussite = des moments calmes dans la situation, puis repartir content."],
    ["Sorties 2 à 4 · La distance est ton réglage", "Répète à une distance ou une durée où le chien peut encore manger, renifler et te regarder. Paie le calme en continu."],
    ["Sorties 5 à 7 · Réduis l'écart", "Plus près, plus long ou plus fréquenté, un réglage par sortie. Se retirer est une stratégie, pas un échec."],
    ["Sortie 8 et plus · Fais-en une routine", "Varie les jours, les lieux et les heures pour que le calme se généralise. Un 5 signifie détendu de l'arrivée au départ."],
  ],
};

const badges = {
  b_first: { n: "Première séance", d: "Ta toute première séance d'entraînement enregistrée." },
  b_five: { n: "Premières 5 pattes", d: "Un ordre noté 5 sur 5 pour la première fois." },
  b_master1: { n: "Première maîtrise", d: "Premier ordre maîtrisé : 3 cinq nets d'affilée." },
  b_master5: { n: "Tape m'en cinq, fois cinq", d: "5 ordres maîtrisés." },
  b_master10: { n: "Deux chiffres", d: "10 ordres maîtrisés." },
  b_streak3: { n: "Série de 3 jours", d: "Entraîné 3 jours d'affilée." },
  b_streak7: { n: "Série de 7 jours", d: "Une semaine entière d'entraînement quotidien." },
  b_streak14: { n: "Série de 14 jours", d: "Deux semaines d'affilée. La routine est réelle." },
  b_streak30: { n: "Série de 30 jours", d: "Un mois de régularité. Territoire d'élite." },
  b_streak60: { n: "Série de 60 jours", d: "Deux mois sans manquer un jour. Équipe remarquable." },
  b_streak100: { n: "Série de 100 jours", d: "Cent jours d'affilée. Statut de légende." },
  b_gear: { n: "Équipement complet", d: "Tous les indispensables cochés." },
  b_scholar: { n: "Érudit canin", d: "10 guides lus dans la bibliothèque Apprendre." },
  b_fixer: { n: "Lecteur de comportement", d: "5 guides de comportement lus. Comprendre bat corriger." },
  b_life1: { n: "Dans le monde", d: "Ta première séance de compétence de vie enregistrée." },
  b_travel: { n: "Billet, s'il vous plaît", d: "Une compétence de voyage maîtrisée : bus, bateau ou avion." },
  b_social: { n: "Papillon social", d: "Une rencontre calme avec un chien ou un chat maîtrisée." },
  b_spa: { n: "Habitué du spa", d: "Toilettage, griffes ou oreilles maîtrisés." },
  b_vet: { n: "Chouchou du véto", d: "Les visites joyeuses chez le vétérinaire maîtrisées." },
  b_hotel: { n: "Champion de la nuit dehors", d: "Un séjour en pension canine maîtrisé." },
  b_trick1: { n: "En scène", d: "Premier tour maîtrisé." },
  b_agi1: { n: "Novice en agility", d: "Premier obstacle d'agility maîtrisé." },
  b_sess50: { n: "50 séances", d: "50 séances d'entraînement enregistrées." },
  b_sess100: { n: "Club des cent", d: "100 séances d'entraînement enregistrées." },
  b_xp500: { n: "500 XP", d: "500 XP atteints." },
  b_xp1000: { n: "1 000 XP", d: "1 000 XP atteints." },
  b_read25: { n: "Carte de bibliothèque", d: "25 guides lus." },
  b_school: { n: "Premier de la classe", d: "Les 3 étapes de l'école canine maîtrisées : première leçon, semestre, examen." },
  b_quest7: { n: "Merveille hebdomadaire", d: "7 quêtes quotidiennes terminées. L'habitude se forme." },
  b_quest21: { n: "Héros de l'habitude", d: "21 quêtes quotidiennes terminées. C'est un mode de vie maintenant." },
  b_master25: { n: "Quart de siècle", d: "25 compétences maîtrisées." },
  b_master50: { n: "À mi-chemin", d: "50 compétences maîtrisées. La moitié de la bibliothèque." },
  b_master99: { n: "Jusqu'à la dernière", d: "Les 99 compétences maîtrisées. Plus rien à apprendre." },
  b_xp3000: { n: "3 000 XP", d: "Niveau Champion atteint." },
  b_xp10000: { n: "10 000 XP", d: "Dix mille XP de régularité." },
  b_sess250: { n: "250 séances", d: "250 séances d'entraînement enregistrées." },
};

const equip = {
  must: {
    collar: { n: "Collier plat avec médaille", note: "Les mentions obligatoires sur la médaille varient, le numéro de téléphone y figure toujours." },
    harness: { n: "Harnais en Y", note: "Promenade quotidienne et entraînement, sans pression sur la gorge." },
    leash: { n: "Laisse fixe de 1,5 à 2 m", note: "La laisse standard pour l'entraînement et la ville." },
    pouch: { n: "Pochette à friandises", note: "Payer vite, c'est bien entraîner. Les poches sont trop lentes." },
    treats: { n: "Friandises molles de la taille d'un petit pois", note: "Petites et molles, 50 récompenses par séance doivent être possibles." },
    bags: { n: "Sacs à déjections avec distributeur", note: "Devoir civique non négociable." },
    bowls: { n: "Gamelles eau et nourriture", note: "Antidérapantes. Céramique ou acier battent le plastique." },
    bed: { n: "Panier ou tapis", note: "La cible de Au panier et le QG des siestes." },
    crate: { n: "Cage ou parc", note: "Tanière, aide à la propreté, sécurité en voyage." },
    chews: { n: "2 à 3 jouets à mâcher", note: "En rotation pour rester nouveaux. Assurance dentition." },
    brush: { n: "Brosse ou peigne adapté au poil", note: "Races à poil : tous les jours. Demande à un toiletteur quel outil." },
    vetkit: { n: "Trousse de soins de base", note: "Tire-tique, coupe-griffes pour chien, shampoing adapté." },
    dental: { n: "Brosse et dentifrice pour chien", note: "Uniquement du dentifrice enzymatique pour chien, jamais humain. Tous les jours c'est l'idéal, 3 fois par semaine c'est la vraie vie." },
  },
  nice: {
    clicker: { n: "Clicker", note: "Marqueur de précision. Voir le Coin chiot." },
    longline: { n: "Longe de 5 à 10 m", note: "Le pont entre le rappel et la promenade sans laisse." },
    kong: { n: "Jouet en caoutchouc à garnir", note: "Congèle-le garni, ça achète 20 minutes de calme." },
    snuffle: { n: "Tapis de fouille", note: "Renifler son dîner fatigue le cerveau." },
    lickmat: { n: "Tapis de léchage", note: "Distraction pour le toilettage et le bain." },
    carrest: { n: "Caisse ou harnais auto homologué", note: "Sécurité à chaque trajet." },
    whistle: { n: "Sifflet de rappel", note: "Son constant, porte plus loin que la voix." },
    raincoat: { n: "Imperméable pour chiens à poil fin", note: "Certains chiens en ont besoin, beaucoup non." },
    gps: { n: "Traceur GPS", note: "Tranquillité d'esprit pour les phases sans laisse." },
    puzzle: { n: "Jouets d'occupation", note: "Travail mental pour les jours de pluie." },
    agility: { n: "Mini kit d'agility", note: "Plaisir au jardin une fois le chien adulte." },
    gate: { n: "Barrière de sécurité", note: "Gestion de l'espace pas chère pendant l'entraînement." },
    basket: { n: "Panier ou remorque vélo", note: "Petits et moyens chiens. Entraîne d'abord comme un lit, accroche toujours le harnais." },
  },
};

const leash = {
  gear: {
    collar: { n: "Collier", pros: ["Léger et simple, porte la médaille", "Rapide à mettre et à enlever", "Bien pour les chiens éduqués qui ne tirent pas"], cons: ["Toute la pression tombe sur la gorge", "Risqué pour ceux qui tirent : trachée, thyroïde et cou sont sollicités", "Certains chiens s'échappent des colliers lâches"], verdict: "Garde-le pour la médaille. Promène avec seulement si la laisse reste détendue." },
    yharness: { n: "Harnais en Y", pros: ["Pression sur le poitrail et les épaules, pas la gorge", "Anti-fuite s'il est bien ajusté", "Meilleur choix par défaut pour chiots et entraînement"], cons: ["L'ajustement compte, les sangles ne doivent pas gêner l'épaule", "Un peu plus long à mettre", "Un harnais mal conçu peut frotter sous les aisselles"], verdict: "Avis : le bon choix par défaut pour la plupart des chiens. Forme en Y sur le poitrail, 2 doigts de jeu partout." },
    frontclip: { n: "Harnais à attache frontale", pros: ["Tourne le chien vers toi quand il tire, la mécanique aide à la rééducation", "Sans douleur"], cons: ["Un outil, pas un remède, l'entraînement reste nécessaire", "Marcher toujours en attache frontale peut affecter la démarche, à utiliser pendant la rééducation"], verdict: "Bonne aide temporaire pour les gros tireurs, en parallèle du travail de laisse détendue." },
  },
  leashes: {
    fixed: { n: "Laisse fixe de 1,5 à 2 m", pros: ["Longueur prévisible, communication claire", "Standard pour l'entraînement et la ville"], cons: ["Rayon court pour renifler en promenade rurale"], verdict: "Le choix par défaut. Achète de la qualité une fois." },
    longline: { n: "Longe de 5 à 10 m", pros: ["Liberté avec filet de sécurité", "L'outil pour le rappel et le travail sans laisse"], cons: ["Risque de brûlure de corde, les gants aident", "Demande de l'espace ouvert et un peu de technique"], verdict: "Meilleur investissement en entraînement après les friandises." },
    flexi: { n: "Enrouleur (flexi)", pros: ["Rayon pratique pour chiens éduqués et calmes en zone ouverte"], cons: ["Apprend à tirer, la tension étend la portée", "Blessures par le cordon documentées chez l'humain et le chien", "Aucun contrôle en situation de circulation soudaine", "Interdit ou mal vu dans beaucoup d'écoles canines"], verdict: "Avis : à écarter complètement pendant l'entraînement. Si vraiment, uniquement en sangle, uniquement en zone ouverte." },
    slip: { n: "Laisse lasso (slip)", pros: ["Rapide pour les transferts courts, courante chez les vétérinaires et en refuge"], cons: ["Se resserre sur le cou sans limite", "Mauvais outil pour les tireurs et les promenades quotidiennes"], verdict: "Outil de pro pour transferts courts, pas une laisse de tous les jours." },
  },
};

const planAdult = [
  { n: "Bilan des bases", items: ["Teste honnêtement les bases : assis, couché, pas bouger, rappel, chacun dans le salon et au jardin", "Réentraîne ce qui vacille par séances de 3 minutes, sans honte, la rouille est normale", "Choisis ta monnaie de récompense : quelle friandise fait briller les yeux de ton chien"], note: "Ne suppose rien de solide. Tester honnêtement cette semaine épargne 6 semaines de frustration ensuite." },
  { n: "Remise à zéro de la laisse détendue", items: ["Marche en laisse détendue, 10 minutes par jour sur un parcours calme", "La règle stop-quand-ça-tend, absolument chaque fois", "Pauses reniflage sur signal comme salaire de la promenade"], note: "La laisse détendue est une habitude, pas un tour. La régularité bat l'intensité, à chaque fois." },
  { n: "Contrôle des impulsions", items: ["Laisse, de la nourriture au sol à celle qui tombe", "Attends aux portes et devant la gamelle", "Pas bouger : allonge la durée à 30 secondes pendant que tu t'éloignes"], note: "Le rappel est une compétence de vie. N'appelle jamais ton chien pour arrêter quelque chose d'agréable, sinon le signal finit par signifier fin de la fête." },
  { n: "Calme sur signal", items: ["Se poser sur un tapis pendant le dîner et les soirées télé", "Le comportement calme est payé discrètement, le chaos ne rapporte rien", "Première répétition café à la maison : tapis, mâchouille, 20 minutes"], note: "Le travail du calme ressemble à ne rien faire. C'est la chose la plus utile qu'un chien adulte puisse apprendre." },
  { n: "Blinder le rappel", items: ["Rappel en longe au parc, payé comme un gain au loto", "Ajoute les distractions progressivement : à distance des autres chiens, puis plus près", "Arrêt d'urgence comme compétence à part"], note: "Le contrôle des impulsions se construit en secondes, pas en minutes. Répétitions courtes, forte valeur, arrête en gagnant." },
  { n: "Manipulation et soins", items: ["Repos du menton pour la manipulation : oreilles, yeux, pattes", "Brossage des dents 3 fois cette semaine", "Séance griffes au coupe-griffes ou à la lime, 1 patte à la fois"], note: "La distraction est le vrai test. Baisse tes critères dans un nouveau lieu, ce n'est pas régresser, c'est entraîner." },
  { n: "Bonnes manières en public", items: ["Vraie visite de café ou restaurant, courte et réussie", "Saluts polis : assis pour dire bonjour, pas de sauts", "Attente calme pendant que tu discutes avec quelqu'un dans la rue"], note: "Les chiens adultes apprennent les tours plus vite que les chiots. Utilise-les pour reconstruire la confiance après une semaine difficile." },
  { n: "Enrichissement et diplôme", items: ["Jeux de flair : chasse aux friandises dans l'appartement et le jardin", "Apprends 1 tour purement amusant comme récompense pour vous deux", "Semaine de révision : refais le test de la semaine 1, fête la différence, planifie la suite"], note: "L'entretien bat la perfection. 5 minutes 5 jours par semaine préservent tout ce que tu as construit." },
];

const planPup = [
  { n: "Arrivée et lien", items: ["Reconnaissance du nom", "Charge ton mot marqueur ou ton clicker", "Rythme de propreté, dehors toutes les 1 à 2 heures"], note: "Aucune pression d'ordres cette semaine. Lien, sommeil et horaires pipi sont le programme." },
  { n: "Première compétence : Assis", items: ["Assis, 3 courtes séances par jour", "Continue à payer la reconnaissance du nom", "Jeux de cage porte ouverte"], note: "3 minutes comptent comme une séance. Court et joyeux bat long et tendu." },
  { n: "Couché s'ajoute", items: ["Couché", "Révise Assis dans de nouvelles pièces", "Manipulation : touche pattes et oreilles, paie chaque contact"], note: "Si Couché n'est pas fluide dimanche, ce n'est pas grave. Reporte-le à la semaine suivante." },
  { n: "Viens, la fondation", items: ["Viens en intérieur, ping-pong dans le couloir", "Semaine de révision : Assis et Couché avant les repas", "Attends devant la gamelle, 2 secondes"], note: "Le rappel est une compétence marathon. En intérieur seulement pour l'instant." },
  { n: "Contrôle des impulsions", items: ["Laisse, jeu de base du poing", "Donne pendant le jeu", "Continue à payer le rappel en intérieur"], note: "La moitié de l'éducation consiste à apprendre au chien que lâcher rapporte plus qu'attraper." },
  { n: "Sortir dans le monde", items: ["Laisse détendue, les 100 premiers mètres détendus", "Regarde-moi dans la rue", "Assis à 1 bordure de trottoir par promenade"], note: "Tirer est normal à cet âge. Stop and go, pas de secousses, distances minuscules." },
  { n: "Pas bouger commence", items: ["Pas bouger, seulement 1 à 5 secondes de durée", "Au tapis", "Révise le rappel, avec distractions légères maintenant"], note: "Des secondes, pas des minutes. Rompre un pas bouger deux fois de suite veut dire simplifier." },
  { n: "Semaine de consolidation", items: ["Aucune nouvelle compétence", "Révisions mixtes de 5 minutes de tout", "1 tour amusant de ton choix en dessert"], note: "Les semaines de révision sont du progrès. Une compétence n'est réelle que si elle survit à une semaine de pratique mixte." },
  { n: "En balade", items: ["Attends au trottoir, à chaque traversée", "Laisse détendue dans des rues plus fréquentées", "Routine calme avec visiteurs, premières mises en place"], note: "Le monde est maintenant la salle de classe. Des parcours plus courts de meilleure qualité battent les longues marches." },
  { n: "Distance et durée", items: ["Pas bouger à 2 à 5 pas de distance", "Rappel en extérieur à la longe", "Couché sur le tapis pendant que tu cuisines"], note: "Si une compétence vacille, reviens une semaine en arrière. Le calendrier te sert, pas l'inverse." },
  { n: "Compétences de vie", items: ["Se poser sous la table, première visite de café", "Premiers trajets calmes en voiture", "Manipulation façon véto : pattes, oreilles, contrôle des dents"], note: "Ce sont les compétences qui rendent les 10 prochaines années faciles. Chaque répétition en vaut la peine." },
  { n: "Semaine du diplôme", items: ["Aucune nouvelle compétence", "Révisions mixtes de 5 minutes de toute la boîte à outils", "1 tour préféré, peaufiné pour le montrer"], note: "12 semaines plus tard : tu as un jeune chien éduqué et une habitude quotidienne. L'habitude est le vrai cadeau de fin d'études." },
];

const puppy = {
  treatsguide: { n: "Friandises : ta monnaie d'entraînement", body: ["Taille : un petit pois ou moins. Une séance de 5 minutes peut consommer 30 friandises, petites elles gardent le compte de calories raisonnable.", "Mou bat croquant, les pauses de mastication cassent le rythme d'entraînement.", "Construis une échelle de valeur : croquettes pour les tâches faciles à la maison, fromage, poulet ou saucisse pour le rappel et le travail difficile dehors.", "Déduis les friandises de la ration quotidienne, les calories d'entraînement comptent. Règle : friandises dans les 10 % de l'apport quotidien.", "Toxique et interdit : chocolat, raisins et raisins secs, oignon, ail, édulcorant xylitol, alcool, os cuits."] },
  clickerguide: { n: "Bases du clicker", body: ["Un clicker est un instrument de précision : le clic marque l'instant exact où le chien a gagné sa récompense.", "Charger : clic, puis friandise, 10 à 15 fois, jusqu'à ce que le clic dresse les oreilles. C'est toute la mise en place.", "Le contrat : chaque clic est toujours payé. Aucune exception, sinon l'instrument perd sa valeur.", "Le timing du clic bat le timing de la friandise, la friandise peut arriver 2 secondes après, le clic non.", "Pas de clicker sous la main : un mot marqueur court comme Oui, dit toujours pareil, fait le même travail un peu moins précisément."] },
  teethguide: { n: "Calendrier de la dentition", body: ["Semaines 3 à 6 : 28 dents de lait arrivent.", "Mois 3 à 7 : les dents de lait tombent, 42 dents définitives percent. Pic de pression à mâcher, gencives douloureuses, taches de sang occasionnelles sur les jouets, tout est normal.", "Menu de soulagement : mâchouilles en caoutchouc, un gant de toilette mouillé congelé, des morceaux de carotte congelés sous surveillance, et des bois de caféier ou d'olivier qui s'effritent au lieu de se fendre comme les bâtons du jardin.", "Vérifie de temps en temps les dents de lait persistantes, une double rangée de canines mérite un coup d'œil du vétérinaire, fréquent chez les petites races.", "Vers le mois 7, la tempête est passée en grande partie. Protège câbles et chaussures jusque-là, pas pour toujours."] },
  sleepguide: { n: "Sommeil et siestes", body: ["Les chiots ont besoin de 16 à 20 heures de sommeil par jour. La plupart des crises de morsures, de folie et de pleurs sont simplement un chiot épuisé qui aurait déjà dû dormir.", "Construis un rythme de siestes : chez les jeunes chiots, environ 1 heure d'éveil puis sieste. Jeu, pipi, puis dans l'espace sûr pour dormir.", "Impose les siestes dans un lieu calme et tamisé, une cage couverte ou un parc fonctionne. Un chiot épuisé n'arrive souvent pas à s'endormir seul au milieu de l'agitation de la maison.", "Protège le sommeil de nuit : dernier pipi tard le soir, puis obscurité ennuyeuse. Les jeunes chiots peuvent avoir besoin d'1 sortie nocturne, garde-la silencieuse et sans façon.", "Si le chiot se transforme en requin de terre, n'entraîne pas à travers. C'est l'heure de la sieste, pas de la discipline."] },
  homeguide: { n: "Premiers jours à la maison", body: ["Réduis le monde : 1 pièce plus l'espace sûr les premiers jours. Tout l'appartement se gagne progressivement, pièce par pièce, ça garde la propreté et la mastication sous contrôle.", "Installe une base : panier ou cage, eau, une mâchouille, dans un coin d'où le chiot te voit mais se repose sans être dérangé. C'est le refuge, jamais le coin punition.", "Première nuit : la distance de sommeil compte. Beaucoup de chiots se calment plus vite juste à côté du lit les premières nuits, tu pourras déplacer le panier plus tard.", "Garde la première semaine volontairement ennuyeuse : pas de défilé de visiteurs, pas de fête pour le chiot. Il digère la perte de sa portée, la maison est déjà assez d'excitation.", "Commence les routines dès le jour 1 : mêmes heures de repas, même porte pour le pipi, mêmes mots. La prévisibilité est la façon dont un chiot apprend que le monde est sûr."] },
  socialguide: { n: "La fenêtre de socialisation", body: ["De 3 à 14 semaines environ, les chiots enregistrent les expériences comme normales. Ce qui est vécu calmement maintenant reste banal à vie, ce qui est manqué peut demander un vrai travail plus tard.", "Socialiser signifie exposition calme, pas contact maximal. Regarder un bus à 30 mètres en mangeant des friandises est une socialisation parfaite, se faire encercler par 5 chiens ne l'est pas.", "Travaille avec une liste : surfaces (herbe, grilles métalliques, escaliers), sons (circulation, aspirateur, enregistrements d'orage à bas volume), personnes (chapeaux, barbes, fauteuils roulants, enfants à distance), manipulation (pattes, oreilles, gueule).", "Avant la fin des vaccins : porte le chiot dans les lieux fréquentés, rends visite à des chiens amis vaccinés chez eux, assieds-toi sur un banc près de la vie. L'exposition n'exige pas de toucher le trottoir.", "Une règle au-dessus de toutes : le chiot fixe le rythme. Les saluts forcés enseignent la peur, l'approche volontaire enseigne la confiance."] },
  aloneguide: { n: "Rester seul dès le jour 1", body: ["Rester seul est une compétence, pas un réglage d'usine. Les chiots qui ne le pratiquent jamais deviennent des chiens qui paniquent, commence par des secondes, pas des heures.", "Jour 1 : sors de la pièce 10 secondes pendant que le chiot mange dans un jouet distributeur, reviens avant toute agitation. C'est une répétition.", "Allonge doucement : secondes, minutes, puis un café calme derrière la porte. Laisse une mâchouille garnie, garde départs et retours totalement ennuyeux, pas d'adieux dramatiques.", "Vise un chiot capable de faire la sieste seul 30 à 60 minutes dans les premières semaines, toujours après de l'exercice, un pipi et avec quelque chose à mâcher.", "Si le chiot panique au lieu de protester, ne force pas à travers les pleurs, réduis l'étape. Une vraie détresse de séparation mérite un plan professionnel tôt, elle ne se règle pas seule."] },
  walksguide: { n: "Promenades du chiot : combien de temps, à quelle fréquence", body: ["Règle : environ 5 minutes de marche structurée par mois d'âge, 1 à 2 fois par jour. Un chiot de 4 mois : environ 20 minutes par promenade.", "Cela limite la marche forcée, pas le mouvement. Jeu libre, reniflage et temps sur sol souple se régulent seuls.", "Renifler EST la promenade. Une balade reniflette lente de 20 minutes fatigue plus un chiot que 40 minutes d'un bon pas.", "Les articulations en croissance n'aiment pas les longues randonnées, les marathons d'escaliers, les sauts en hauteur et la course sur asphalte. Garde le jogging et le vélo pour 12 à 18 mois.", "Regarde le chiot, pas la montre : traîner, se coucher ou mordre frénétiquement en pleine promenade signifie que c'était trop. Porte un petit chiot jusqu'à la maison plutôt que de le tirer.", "3 à 4 courtes sorties battent 1 longue, et chaque sortie est aussi de l'apprentissage de la propreté."] },
  heatguide: { n: "Guide des premières chaleurs", body: ["Moment : premières chaleurs entre 6 et 15 mois, petites races plus tôt, grandes races plus tard. Elles reviennent tous les 6 à 8 mois environ.", "Durée : environ 2 à 4 semaines. Signes : vulve gonflée, pertes sanguines, pipis plus fréquents, sautes d'humeur, attraction magnétique pour tous les mâles du quartier.", "Gestion : en laisse uniquement pendant toute la durée, pas de parc à chiens, pas de jardin sans surveillance, culotte de protection à la maison si besoin.", "Elle peut être collante, fatiguée ou difficile sur la nourriture. Tout est normal, garde des routines calmes.", "Après les premières chaleurs, discute avec ton vétérinaire des avantages, inconvénients et du moment de la stérilisation. Il y a de vrais arguments des deux côtés et la taille de la race compte, c'est une décision personnelle, pas un automatisme.", "Note les dates dans ton calendrier. La prévisibilité rend le deuxième tour facile."] },
};

export default { cmds, behav, equip, leash, puppy, planAdult, planPup, badges, levels, ranks, ladders, stucks, tier, quest };
