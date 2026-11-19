import { apiErrors } from "@/i18n/api-errors";
import type { Dictionary } from "@/i18n/types";

const fr: Dictionary = {
  common: {
    language: "Langue",
    signIn: "Se connecter",
    signOut: "Se déconnecter",
    create: "Créer",
    cancel: "Annuler",
    save: "Enregistrer",
    close: "Fermer",
    email: "E-mail",
    password: "Mot de passe",
    role: "Rôle",
    workspace: "Espace de travail",
    workspaces: "Espaces de travail",
    board: "Tableau",
    people: "Personnes",
    billing: "Facturation",
    guide: "Guide",
    sponsors: "Sponsors",
    privacyPolicy: "Politique de confidentialité",
    termsOfService: "Conditions d'utilisation",
    mitLicense: "MIT license",
    firstTimeGuide: "Guide de démarrage",
    sourceOnGitHub: "Code source sur GitHub",
    overview: "Aperçu",
    liveBoard: "Tableau en direct",
    openTheProduct: "Ouvrir le produit",
    publicNavigation: "Navigation publique",
    productLinks: "Liens du produit",
    projectLinks: "Liens du projet",
    product: "Produit",
    project: "Projet",
    copyright: "© 2026 Syed Ali. Code source publié sous la MIT License.",
    effectiveDate: "Date d'entrée en vigueur : 19 novembre 2026",
    ...apiErrors.fr,
  },
  footer: {
    tagline: "Un gestionnaire de tâches collaboratif conçu avec Next.js, Express et PostgreSQL.",
  },
  landing: {
    seedLists: [
      { id: "todo", name: "Prêtes" },
      { id: "in_progress", name: "En cours" },
      { id: "done", name: "Livrées" },
    ],
    seedTasks: [
      { id: "p1", title: "Rédiger les notes de lancement", label: "lancement" },
      { id: "p2", title: "Configurer les rôles des espaces de travail", label: "authentification" },
      { id: "p3", title: "Créer l'espace de travail de démonstration", label: "démo" },
      { id: "p4", title: "Peaufiner les menus débordants du tableau", label: "interface" },
    ],
    heroEyebrow: "SaaS collaboratif · projet de portfolio",
    heroTitle: "Faites avancer le travail, pas les réunions.",
    heroBody:
      "Un tableau de style production : Next.js App Router, Express, PostgreSQL, sessions par cookie et un espace de travail de style Jira d'où l'on peut réellement livrer.",
    heroPrimary: "Essayer en tant que Syed Ali",
    heroSecondary: "Faire glisser les cartes de la démo",
    statCards: "Cartes en aperçu",
    statShipped: "Livrées",
    statSession: "Session",
    statCookie: "Cookie",
    previewHint: "Tableau de lancement · faites glisser les cartes entre les colonnes",
    reset: "Réinitialiser",
    tabs: [
      {
        id: "boards",
        label: "Tableaux",
        title: "Des tableaux qui ressemblent au vrai travail",
        body: "Colonnes, priorités, indicateurs et un menu complet pour les cartes — faites glisser une carte dans l'aperçu en direct.",
      },
      {
        id: "session",
        label: "Session",
        title: "Une session qui survit au rechargement",
        body: "Cookies httpOnly via un BFF Next.js. Aucun jeton dans localStorage. Le SSR lit la même session.",
      },
      {
        id: "people",
        label: "Personnes",
        title: "Personnes et espaces",
        body: "Espaces de travail, noms uniques, invitations et rôles. Renommez une fois et le changement suit dans la barre latérale et le tableau.",
      },
    ],
    stackTitle: "Ce que cette réalisation démontre",
    stack: [
      {
        title: "Séparation en monorepo",
        body: "`apps/web` et `apps/api` partagent les types, afin que l'interface et l'API puissent évoluer indépendamment.",
      },
      {
        title: "Un vrai modèle de données",
        body: "Espaces de travail, rôles, tableaux, listes, commentaires et pièces jointes — pas une simple table de tâches.",
      },
      {
        title: "Des réflexes de production",
        body: "Helmet, Zod, cookies httpOnly, SSR avec no-store, noms d'espaces de travail uniques et un contrôle de santé.",
      },
    ],
    guideCtaTitle: "Nouveau ici ? Suivez une visite guidée.",
    guideCtaBody:
      "Suivez le guide de démarrage pour vous connecter, créer une tâche, la déplacer sur le tableau et inviter un collègue.",
    guideCtaButton: "Ouvrir le guide de 10 minutes",
  },
  login: {
    title: "Connexion",
    metaDescription: "Connectez-vous à votre espace de travail TaskFlow pour gérer les tableaux, les tâches et vos collègues.",
    heading: "Se connecter à TaskFlow",
    subheading: "Connectez-vous en tant que propriétaire de l'espace de travail, Syed Ali, pour découvrir le produit.",
    submitting: "Connexion…",
  },
  guide: {
    title: "Guide de démarrage",
    metaDescription:
      "Une visite guidée de TaskFlow en dix minutes : se connecter, ouvrir un espace de travail, créer et déplacer une tâche, inviter un collègue et se déconnecter.",
    eyebrow: "Commencez ici",
    pageTitle: "Vos 10 premières minutes dans TaskFlow",
    beforeTitle: "Avant de commencer",
    beforeBody:
      "La démo est gratuite et ne nécessite pas de carte de crédit. Utilisez-la uniquement à des fins d'évaluation ; ne saisissez pas d'informations sensibles dans une tâche, un commentaire ou une invitation.",
    openDemo: "Ouvrir la démo",
    tourTitle: "La visite guidée",
    stepPrefix: "Étape",
    steps: [
      {
        title: "Se connecter avec le compte de démonstration",
        body: "Ouvrez la page de connexion et utilisez le compte préconfiguré. TaskFlow enregistre la session dans un cookie httpOnly : aucun jeton n'est écrit dans le stockage du navigateur.",
        detail: "E-mail : syed.ali@taskflow.dev · Mot de passe : demo1234",
      },
      {
        title: "Ouvrir votre espace de travail",
        body: "Le tableau de bord liste les espaces de travail. Ouvrez TaskFlow Demo pour voir le tableau préconfiguré. Un espace de travail constitue la frontière de sécurité pour les tableaux, les membres et les invitations.",
        detail: "Facultatif : créez un autre espace de travail avec un nom unique, ou renommez une carte existante directement sur place.",
      },
      {
        title: "Explorer le tableau",
        body: "Le tableau comporte trois listes : Prêtes, En cours et Livrées. Utilisez la recherche du tableau pour filtrer les cartes par titre, et la barre latérale pour changer de tableau.",
        detail: "La page d'accueil propose un aperçu interactif si vous souhaitez essayer le glisser-déposer avant de vous connecter.",
      },
      {
        title: "Créer une tâche",
        body: "Choisissez + Créer dans l'en-tête du tableau, saisissez un titre court, puis appuyez sur Créer. Ouvrez la carte pour ajouter une description, une priorité, un responsable, des étiquettes ou un commentaire.",
        detail: "Chaque modification est enregistrée via l'API Express, et pas seulement dans l'état local du navigateur.",
      },
      {
        title: "Faire progresser le travail",
        body: "Faites glisser la carte vers En cours, ajoutez un commentaire avec la prochaine action, puis déplacez-la vers Livrées lorsqu'elle est terminée. Le glisser-déposer est accessible au clavier.",
        detail: "Les mises à jour des détails de tâche sont validées avec les mêmes schémas partagés que ceux utilisés par l'API.",
      },
      {
        title: "Inviter un collègue",
        body: "Ouvrez « Personnes » depuis la barre latérale, choisissez un espace de travail, saisissez une adresse e-mail et sélectionnez membre, admin ou lecteur. Envoyez l'invitation, puis copiez le lien d'invitation généré.",
        detail: "Les rôles et l'appartenance aux espaces de travail sont appliqués par l'API, et non par le proxy Next.js.",
      },
      {
        title: "Consulter les paramètres et se déconnecter",
        body: "Visitez Facturation/Paramètres pour voir l'interface des paramètres de la démo, puis déconnectez-vous depuis la barre latérale. Reconnectez-vous pour confirmer le fonctionnement de la session par cookie.",
        detail: "Ceci termine la visite. Vous connaissez maintenant le flux de travail essentiel de TaskFlow.",
      },
    ],
    troubleshootingTitle: "Si quelque chose ne va pas",
    troubleshooting: [
      {
        question: "Le mot de passe de la démo ne fonctionne pas",
        answer: "Utilisez exactement demo1234. La démo hébergée et le mode local en mémoire utilisent le même compte préconfiguré.",
      },
      {
        question: "Mes données locales ont disparu",
        answer: "Le mode en mémoire est réinitialisé lors du redémarrage de l'API. C'est normal pour un mode de démonstration local.",
      },
      {
        question: "Une requête a renvoyé 429",
        answer: "La limitation de débit est active. Attendez un moment et réessayez.",
      },
      {
        question: "Un nom d'espace de travail a été refusé",
        answer: "Les noms d'espaces de travail doivent être uniques. Renommez l'espace existant plutôt que d'en créer un doublon.",
      },
    ],
    exploreTitle: "Continuez à explorer",
    seeStack: "Découvrir la stack",
    readPrivacy: "Lire la politique de confidentialité",
    readTerms: "Lire les conditions d'utilisation",
    supportProject: "Soutenir le projet",
  },
  privacy: {
    title: "Politique de confidentialité",
    metaDescription:
      "Ce que TaskFlow stocke, pourquoi, où résident les données et comment demander la suppression d'un compte de démonstration hébergé.",
    eyebrow: "Mentions légales",
    pageDescription:
      "Date d'entrée en vigueur : 19 novembre 2026. TaskFlow est une démo de portfolio exploitée par Syed Ali. Cette politique explique ce que l'application stocke et pourquoi.",
    whatWeStore: "Ce que nous stockons",
    caption: "Catégories de données stockées par TaskFlow et raisons",
    tableCategory: "Catégorie",
    tableExamples: "Exemples",
    tableWhy: "Pourquoi",
    categories: [
      {
        name: "Informations du compte",
        examples: "Nom, adresse e-mail, hachage du mot de passe, rôle dans l'espace de travail",
        reason: "Vous connecter et déterminer ce à quoi vous avez accès.",
      },
      {
        name: "Contenu de l'espace de travail",
        examples: "Espaces de travail, tableaux, listes, tâches, commentaires, invitations",
        reason: "Fournir les fonctionnalités essentielles de gestion des tâches.",
      },
      {
        name: "Données de session",
        examples: "Un cookie httpOnly tf_access contenant un JWT signé",
        reason: "Vous maintenir connecté sans exposer le jeton à JavaScript.",
      },
      {
        name: "Données techniques",
        examples: "Adresse IP et métadonnées des requêtes",
        reason: "Appliquer les limites de débit, protéger l'API et diagnostiquer les erreurs.",
      },
    ],
    passwordsNote:
      "Les mots de passe sont hachés avant stockage. TaskFlow ne stocke pas de JWT bruts dans localStorage et ne définit pas de cookies publicitaires ou d'analytique tiers.",
    whereDataLives: "Où résident les données",
    localMode:
      "Mode démo local : l'API utilise un stockage en mémoire. Les données disparaissent lorsque le processus de l'API redémarre.",
    hostedMode:
      "Démo hébergée : les données de l'application sont stockées dans Neon Postgres. L'application Next.js et l'API s'exécutent sur Vercel, qui peut traiter les journaux d'infrastructure selon ses propres politiques.",
    howWeUseData: "Comment nous utilisons les données",
    howWeUseDataBody:
      "Nous n'utilisons ces informations que pour faire fonctionner l'application, assurer sa sécurité et répondre aux demandes d'assistance. Nous ne vendons pas de données personnelles et n'utilisons pas le contenu des espaces de travail à des fins publicitaires.",
    sharingRetention: "Partage et conservation",
    sharingRetentionBody:
      "TaskFlow ne partage pas intentionnellement le contenu des espaces de travail avec des tiers. Les fournisseurs d'hébergement traitent les données pour notre compte afin d'assurer le service. Les données locales en mémoire sont temporaires ; les données hébergées restent jusqu'à ce que vous les supprimiez ou qu'un espace de travail de démo inactif soit supprimé.",
    securityChoices: "Sécurité et vos choix",
    securityBody:
      "Les contrôles d'accès sont effectués dans l'API Express, y compris la vérification de l'appartenance à un espace de travail et des rôles. Les réponses relatives aux comptes utilisent Cache-Control: no-store. Vous pouvez vous déconnecter, supprimer le contenu que vous avez créé ou demander la suppression d'un compte de démo hébergé.",
    childrenBody:
      "TaskFlow ne s'adresse pas aux enfants de moins de 13 ans. Ne soumettez pas de données sensibles, confidentielles ou critiques pour la production à la démo.",
    changesContact: "Modifications et contact",
    changesBody:
      "Nous pouvons mettre à jour cette politique lorsque l'application évolue ; la date d'entrée en vigueur ci-dessus identifie la version actuelle. Questions ou demandes de suppression : syed.ali@taskflow.dev.",
    relatedBody:
      "Le code source du dépôt est publié sous la MIT License. Consultez les conditions d'utilisation et la MIT license.",
  },
  terms: {
    title: "Conditions d'utilisation",
    metaDescription:
      "Règles en langage clair pour utiliser la démo hébergée et le site public de TaskFlow, ainsi que l'application de la MIT license au code source.",
    eyebrow: "Mentions légales",
    pageDescription:
      "Date d'entrée en vigueur : 19 novembre 2026. Ces conditions régissent l'utilisation de la démo hébergée et du site public de TaskFlow. Le code source est soumis séparément à la MIT License.",
    onThisPage: "Sur cette page",
    sections: [
      {
        id: "who-runs-this",
        title: "Qui gère ce projet",
        body: "TaskFlow est un projet de portfolio exploité par Syed Ali. Il est fourni à des fins de démonstration, d'évaluation et d'apprentissage. Ce n'est pas un service commercial et il n'est pas destiné à des travaux critiques en production.",
      },
      {
        id: "using-the-demo",
        title: "Utiliser la démo",
        body: "Vous pouvez utiliser la démo uniquement si vous avez au moins 13 ans, si vous fournissez des informations de compte exactes, si vous respectez les autres utilisateurs et leurs espaces de travail, et si vous vous conformez à la loi applicable. Le compte de démo partagé et le contenu préconfiguré sont des exemples publics. N'y saisissez pas de mots de passe, de secrets, de données personnelles ou d'informations commerciales confidentielles.",
      },
      {
        id: "accounts",
        title: "Comptes et sécurité",
        body: "Gardez vos identifiants privés et déconnectez-vous lorsque vous avez terminé. TaskFlow stocke les sessions dans un cookie httpOnly et applique des contrôles d'appartenance et de rôles côté serveur. Vous êtes responsable des activités effectuées avec votre compte. Signalez toute suspicion d'accès non autorisé à syed.ali@taskflow.dev.",
      },
      {
        id: "your-content",
        title: "Votre contenu",
        body: "Vous conservez la propriété du contenu que vous créez dans TaskFlow. En soumettant du contenu, vous accordez à l'exploitant une licence limitée et non exclusive de le stocker et de l'afficher uniquement pour faire fonctionner la démo. Ne soumettez pas de contenu que vous n'avez pas le droit de partager. Le contenu peut être supprimé s'il est abusif, illégal ou s'il met la démo en danger.",
      },
      {
        id: "acceptable-use",
        title: "Usage acceptable",
        body: "Ne sondez, n'analysez ou n'attaquez pas l'application, l'API, la base de données ou les fournisseurs d'hébergement ; ne contournez pas l'authentification, les rôles, les limites de débit ou les contrôles d'espace de travail ; ne raclez pas les routes privées et ne saturez pas le service ; ne téléversez pas de logiciels malveillants, de courriers indésirables, de contenu de phishing ou de contenu contrefaisant ; n'usurpez pas l'identité d'une autre personne ; n'utilisez pas la démo pour des activités illégales.",
      },
      {
        id: "availability",
        title: "Disponibilité et modifications",
        body: "La démo peut être indisponible, réinitialisée, modifiée ou interrompue à tout moment. Les données locales en mémoire sont réinitialisées lors du redémarrage de l'API, et les données hébergées peuvent être supprimées lors de la maintenance. Nous pouvons mettre à jour ces conditions ; la date d'entrée en vigueur ci-dessus indique la version actuelle.",
      },
      {
        id: "open-source",
        title: "Licence open source",
        body: "Le code source du dépôt est sous licence MIT License. Cette licence vous permet de copier, modifier et distribuer le code, sous réserve de son avis de droits d'auteur. Elle n'accorde pas l'accès aux comptes hébergés, aux identifiants ou aux données privées.",
      },
      {
        id: "third-parties",
        title: "Services tiers",
        body: "L'application hébergée utilise Vercel pour l'hébergement et Neon pour la base de données. Votre utilisation de ces services est également soumise à leurs conditions et politiques de confidentialité. TaskFlow ne définit pas de cookies publicitaires.",
      },
      {
        id: "disclaimer",
        title: "Avertissement et responsabilité",
        body: "Le logiciel et la démo hébergée sont fournis « en l'état » et « tels que disponibles », sans garantie d'aucune sorte. Dans la mesure maximale permise par la loi, l'exploitant n'est pas responsable des dommages indirects, accessoires, spéciaux, consécutifs ou punitifs, ni de la perte de données, de profits ou d'usage résultant de la démo, même s'il a été informé de la possibilité de tels dommages.",
      },
      {
        id: "termination",
        title: "Résiliation et contact",
        body: "Nous pouvons suspendre ou résilier l'accès en cas de comportement violant ces conditions ou menaçant le service. Vous pouvez cesser d'utiliser la démo à tout moment et demander la suppression de votre compte hébergé. Questions : syed.ali@taskflow.dev.",
      },
    ],
    relatedPolicies: "Politiques associées",
  },
  license: {
    title: "MIT license",
    metaDescription:
      "Le code source de TaskFlow est publié sous la MIT License par Syed Ali. Lisez le texte intégral de la licence et les politiques associées.",
    eyebrow: "Open source",
    pageDescription:
      "Le code source peut être utilisé, copié, modifié et distribué librement selon les conditions ci-dessous. La démo hébergée est également soumise aux conditions d'utilisation et à la politique de confidentialité.",
    fullTextTitle: "Texte intégral de la licence",
    scopeTitle: "Ce que cela couvre",
    scopeBody:
      "La MIT License s'applique au code source du dépôt. Elle n'accorde pas l'accès aux comptes hébergés, aux identifiants ou aux données privées. La copie canonique se trouve à la racine du dépôt sous le nom LICENSE.",
  },
  sponsors: {
    title: "Sponsors et soutien",
    metaDescription:
      "TaskFlow est gratuit et open source sous la MIT License. Découvrez comment soutenir le projet via GitHub Sponsors, les issues, les revues et la documentation.",
    eyebrow: "Communauté",
    pageDescription:
      "TaskFlow est gratuit et open source sous la MIT License. La démo est autofinancée à des fins d'apprentissage et de portfolio.",
    whyTitle: "Pourquoi le soutien compte",
    whyBody:
      "Le parrainage aide à maintenir la démo en ligne et la documentation utile. Il est entièrement facultatif : le code, les guides, la politique de confidentialité et les conditions restent libres d'être lus, utilisés, forkés et améliorés.",
    sponsorButton: "Soutenir sur GitHub",
    waysTitle: "Façons d'aider",
    options: [
      {
        title: "Mettre une étoile et partager",
        body: "Ajoutez une étoile au dépôt et envoyez-le à quelqu'un qui apprend Next.js, Express ou l'architecture full-stack.",
      },
      {
        title: "Signaler un bug clairement",
        body: "Ouvrez une issue avec les étapes de reproduction, le comportement attendu et ce que vous avez observé.",
      },
      {
        title: "Relire ou améliorer",
        body: "Relisez une pull request, peaufinez un détail d'accessibilité, ajoutez un test ou clarifiez la documentation.",
      },
      {
        title: "Soutenir le mainteneur",
        body: "Utilisez GitHub Sponsors si vous souhaitez soutenir financièrement l'hébergement et la maintenance continus.",
      },
    ],
    currentTitle: "Sponsors actuels",
    currentBody:
      "Aucun sponsor n'est encore listé. Pour être mentionné ici, utilisez le lien GitHub Sponsors ci-dessus ou écrivez à syed.ali@taskflow.dev.",
    teamsTitle: "Pour les équipes",
    teamsBody:
      "TaskFlow est une démo, pas un service géré. Pour un usage en production, forkez le dépôt, déployez-le sur vos propres comptes Vercel et Neon, et assurez la gestion de vos données et de vos contrôles de sécurité.",
    followGuide: "Suivre le guide",
    deploymentGuide: "Guide de déploiement gratuit",
  },
  dashboard: {
    title: "Tableau de bord de l'espace de travail",
    spacesLabel: "Espaces",
    allWorkspaces: "Tous les espaces de travail",
    signOut: "Se déconnecter",
    workspacesTitle: "Espaces de travail",
    workspacesHint: "Chaque nom doit être unique. Utilisez « Renommer » sur une carte si deux espaces se ressemblent.",
    newWorkspacePlaceholder: "Nom du nouvel espace de travail",
    couldNotCreateWorkspace: "Impossible de créer l'espace de travail",
    couldNotRenameWorkspace: "Impossible de renommer l'espace de travail",
    rename: "Renommer",
    noDescription: "Aucune description pour l'instant",
    openBoard: "Ouvrir le tableau",
    noBoard: "Aucun tableau pour l'instant",
    peopleTitle: "Personnes",
    peopleHint: "Invitez des collègues dans l'espace de travail sélectionné. Ils rejoignent avec le lien (aucun fournisseur d'e-mail requis dans la démo).",
    workspaceLabel: "Espace de travail",
    sendInvitation: "Envoyer l'invitation",
    inviteLink: "Lien d'invitation :",
    currentMembers: "Membres actuels",
    pendingInvites: "Invitations en attente",
    openLink: "Ouvrir le lien",
    couldNotLoadPeople: "Impossible de charger les personnes",
    couldNotSendInvite: "Impossible d'envoyer l'invitation",
    billingTitle: "Facturation",
    billingHint: "Les offres sont présentées pour le récit du portfolio. Stripe en mode test peut être connecté sans modifier cette mise en page.",
    plans: [
      { name: "Gratuit", price: "$0", note: "Un espace de travail, tableau essentiel." },
      { name: "Pro", price: "$9", note: "Plus de places. Paiement Stripe à venir." },
      { name: "Enterprise", price: "$99", note: "SSO et journal d'audit à venir." },
    ],
    roles: {
      member: "membre",
      admin: "admin",
      viewer: "lecteur",
    },
    board: {
      breadcrumb: "Espaces /",
      fallbackWorkspace: "Espace de travail",
      create: "+ Créer",
      searchPlaceholder: "Rechercher dans le tableau",
      newTaskPlaceholder: "Que faut-il faire ?",
      couldNotAddTask: "Impossible d'ajouter la tâche",
      couldNotMoveTask: "Impossible de déplacer la tâche",
      couldNotUpdateTask: "Impossible de mettre à jour la tâche",
      defaultColumns: [
        { id: "todo", name: "À faire" },
        { id: "in_progress", name: "En cours" },
        { id: "done", name: "Terminé" },
      ],
    },
    task: {
      drag: "Glisser",
      unassigned: "Non attribué",
      create: "+ Créer",
      moveWorkItem: "Déplacer l'élément de travail",
      changeStatus: "Changer le statut",
      copyLink: "Copier le lien",
      copyKey: "Copier la clé",
      linkConfluencePage: "Lier une page Confluence",
      linkWorkItem: "Lier un élément de travail",
      changeParent: "Changer le parent",
      selectCover: "Choisir la couverture",
      editLabels: "Modifier les étiquettes",
      removeFlag: "Retirer l'indicateur",
      addFlag: "Ajouter un indicateur",
      noParent: "Aucun parent",
      confluenceHint: "Collez une URL Confluence pour l'associer à cet élément de travail.",
      copySamplePageLink: "Copier le lien de la page d'exemple",
      moreActions: "Plus d'actions",
      priorities: {
        low: "faible",
        medium: "moyenne",
        high: "élevée",
        urgent: "urgente",
      },
      labels: {
        bug: "bug",
        feature: "fonctionnalité",
        chatbot: "chatbot",
        qa: "qa",
      },
      loading: "Chargement…",
      close: "Fermer",
      priority: "Priorité",
      description: "Description",
      addDescription: "Ajouter une description…",
      saveDescription: "Enregistrer la description",
      attachments: "Pièces jointes",
      attachmentsHint: "Images, PDF, vidéos ou tout autre fichier de référence.",
      pdf: "(PDF)",
      comments: "Commentaires",
      commentPlaceholder: "Commenter cet élément de travail",
      comment: "Commenter",
      couldNotLoad: "Impossible de charger la tâche",
      couldNotSave: "Impossible d'enregistrer",
    },
    invite: {
      invalidInvitation: "Invitation invalide",
      couldNotJoin: "Impossible de rejoindre",
      joinPrefix: "Rejoindre",
      fallbackWorkspace: "l'espace de travail",
      invitedAsPrefix: "Invité en tant que",
      fallbackRole: "membre",
      yourName: "Votre nom",
      choosePassword: "Choisissez un mot de passe",
      joining: "Adhésion…",
      joinWorkspace: "Rejoindre l'espace de travail",
    },
  },
};

export default fr;
