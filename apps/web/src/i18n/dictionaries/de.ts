import { apiErrors } from "@/i18n/api-errors";
import type { Dictionary } from "@/i18n/types";

const de: Dictionary = {
  common: {
    language: "Sprache",
    signIn: "Anmelden",
    signOut: "Abmelden",
    create: "Erstellen",
    cancel: "Abbrechen",
    save: "Speichern",
    close: "Schließen",
    email: "E-Mail",
    password: "Passwort",
    role: "Rolle",
    workspace: "Arbeitsbereich",
    workspaces: "Arbeitsbereiche",
    board: "Tafel",
    people: "Personen",
    billing: "Abrechnung",
    guide: "Anleitung",
    sponsors: "Sponsoren",
    privacyPolicy: "Datenschutzerklärung",
    termsOfService: "Nutzungsbedingungen",
    mitLicense: "MIT license",
    firstTimeGuide: "Erste-Schritte-Anleitung",
    sourceOnGitHub: "Quellcode auf GitHub",
    overview: "Übersicht",
    liveBoard: "Live-Tafel",
    openTheProduct: "Produkt öffnen",
    publicNavigation: "Öffentliche Navigation",
    productLinks: "Produkt-Links",
    projectLinks: "Projekt-Links",
    product: "Produkt",
    project: "Projekt",
    copyright: "© 2026 Syed Ali. Quellcode veröffentlicht unter der MIT License.",
    effectiveDate: "Stichtag: 19. November 2026",
    ...apiErrors.de,
  },
  footer: {
    tagline: "Ein kollaborativer Aufgabenmanager, erstellt mit Next.js, Express und PostgreSQL.",
  },
  landing: {
    seedLists: [
      { id: "todo", name: "Bereit" },
      { id: "in_progress", name: "In Arbeit" },
      { id: "done", name: "Ausgeliefert" },
    ],
    seedTasks: [
      { id: "p1", title: "Einführungsnotizen schreiben", label: "Einführung" },
      { id: "p2", title: "Rollen für Arbeitsbereiche einrichten", label: "Authentifizierung" },
      { id: "p3", title: "Demo-Arbeitsbereich anlegen", label: "Demo" },
      { id: "p4", title: "Überlaufmenüs der Tafel verfeinern", label: "Oberfläche" },
    ],
    heroEyebrow: "Kollaboratives SaaS · Portfolio-Projekt",
    heroTitle: "Arbeit voranbringen, nicht Meetings.",
    heroBody:
      "Eine Tafel mit Produktionscharakter: Next.js App Router, Express, PostgreSQL, Cookie-Sessions und ein Arbeitsbereich im Jira-Stil, aus dem du tatsächlich ausliefern kannst.",
    heroPrimary: "Als Syed Ali testen",
    heroSecondary: "Karten in der Demo-Tafel ziehen",
    statCards: "Karten in der Vorschau",
    statShipped: "Ausgeliefert",
    statSession: "Sitzung",
    statCookie: "Cookie",
    previewHint: "Start-Tafel · Karten zwischen Spalten ziehen",
    reset: "Zurücksetzen",
    tabs: [
      {
        id: "boards",
        label: "Tafeln",
        title: "Tafeln, die sich wie echte Arbeit anfühlen",
        body: "Spalten, Prioritäten, Markierungen und ein vollständiges Kartenmenü – ziehe eine Karte in der Live-Vorschau.",
      },
      {
        id: "session",
        label: "Sitzung",
        title: "Eine Sitzung, die Aktualisierungen übersteht",
        body: "httpOnly-Cookies über ein Next.js-BFF. Keine Tokens in localStorage. SSR liest dieselbe Sitzung.",
      },
      {
        id: "people",
        label: "Personen",
        title: "Menschen und Arbeitsbereiche",
        body: "Arbeitsbereiche, eindeutige Namen, Einladungen und Rollen. Einmal umbenannt, gilt der neue Name in Seitenleiste und Tafel.",
      },
    ],
    stackTitle: "Was dieses Projekt beweist",
    stack: [
      {
        title: "Monorepo-Aufteilung",
        body: "`apps/web` und `apps/api` teilen Typen, damit UI und API unabhängig voneinander wachsen können.",
      },
      {
        title: "Echtes Datenmodell",
        body: "Arbeitsbereiche, Rollen, Tafeln, Listen, Kommentare und Anhänge – keine einzelne To-do-Tabelle.",
      },
      {
        title: "Produktionsreife Praktiken",
        body: "Helmet, Zod, httpOnly-Cookies, SSR mit no-store, eindeutige Arbeitsbereichsnamen und ein Health-Check.",
      },
    ],
    guideCtaTitle: "Neu hier? Mach eine geführte Tour.",
    guideCtaBody:
      "Folge der Erste-Schritte-Anleitung, um dich anzumelden, eine Aufgabe zu erstellen, sie über die Tafel zu bewegen und einen Kollegen einzuladen.",
    guideCtaButton: "10-Minuten-Anleitung öffnen",
  },
  login: {
    title: "Anmelden",
    metaDescription: "Melde dich bei deinem TaskFlow-Arbeitsbereich an, um Tafeln, Aufgaben und Teammitglieder zu verwalten.",
    heading: "Bei TaskFlow anmelden",
    subheading: "Melde dich als Inhaber des Arbeitsbereichs, Syed Ali, an, um das Produkt Schritt für Schritt kennenzulernen.",
    submitting: "Anmeldung läuft…",
  },
  guide: {
    title: "Erste-Schritte-Anleitung",
    metaDescription:
      "Eine zehnminütige Einführung in TaskFlow: anmelden, einen Arbeitsbereich öffnen, eine Aufgabe erstellen und verschieben, einen Kollegen einladen und sich abmelden.",
    eyebrow: "Hier starten",
    pageTitle: "Deine ersten 10 Minuten in TaskFlow",
    beforeTitle: "Bevor du beginnst",
    beforeBody:
      "Die Demo ist kostenlos und benötigt keine Kreditkarte. Nutze sie nur zur Evaluierung; gib keine sensiblen Informationen in Aufgaben, Kommentare oder Einladungen ein.",
    openDemo: "Demo öffnen",
    tourTitle: "Die geführte Tour",
    stepPrefix: "Schritt",
    steps: [
      {
        title: "Mit dem Demo-Konto anmelden",
        body: "Öffne die Anmeldeseite und nutze das bereitgestellte Konto. TaskFlow speichert die Sitzung in einem httpOnly-Cookie, sodass kein Token im Browserspeicher geschrieben wird.",
        detail: "E-Mail: syed.ali@taskflow.dev · Passwort: demo1234",
      },
      {
        title: "Arbeitsbereich öffnen",
        body: "Das Dashboard listet Arbeitsbereiche auf. Öffne TaskFlow Demo, um die vorbereitete Tafel zu sehen. Ein Arbeitsbereich ist die Sicherheitsgrenze für Tafeln, Mitglieder und Einladungen.",
        detail: "Optional: erstelle einen weiteren Arbeitsbereich mit einem eindeutigen Namen oder benenne eine vorhandene Karte direkt um.",
      },
      {
        title: "Die Tafel erkunden",
        body: "Die Tafel hat drei Listen: Bereit, In Arbeit und Ausgeliefert. Nutze „Tafel durchsuchen“, um Karten nach Titel zu filtern, und die Seitenleiste, um zwischen Tafeln zu wechseln.",
        detail: "Auf der Startseite gibt es eine interaktive Vorschau, wenn du das Ziehen vor der Anmeldung ausprobieren möchtest.",
      },
      {
        title: "Eine Aufgabe erstellen",
        body: "Wähle + Erstellen in der Kopfzeile der Tafel, gib einen kurzen Titel ein und drücke Erstellen. Öffne die Karte, um eine Beschreibung, Priorität, einen Zuständigen, Labels oder einen Kommentar hinzuzufügen.",
        detail: "Jede Änderung wird über die Express API gespeichert, nicht nur im lokalen Browserzustand.",
      },
      {
        title: "Arbeit voranbringen",
        body: "Ziehe die Karte nach In Arbeit, füge einen Kommentar mit der nächsten Aktion hinzu und verschiebe sie nach Ausgeliefert, wenn sie fertig ist. Drag-and-drop ist tastaturfreundlich.",
        detail: "Aktualisierungen der Aufgabendetails werden mit denselben gemeinsamen Schemas validiert, die auch die API verwendet.",
      },
      {
        title: "Einen Kollegen einladen",
        body: "Öffne Personen in der Seitenleiste, wähle einen Arbeitsbereich, gib eine E-Mail-Adresse ein und wähle Mitglied, Admin oder Betrachter. Sende die Einladung und kopiere anschließend den erzeugten Einladungslink.",
        detail: "Rollen und die Zugehörigkeit zum Arbeitsbereich werden von der API durchgesetzt, nicht vom Next.js-Proxy.",
      },
      {
        title: "Einstellungen prüfen und abmelden",
        body: "Besuche Abrechnung/Einstellungen, um die Demo-Einstellungen zu sehen, und melde dich dann über die Seitenleiste ab. Melde dich erneut an, um den cookiebasierten Sitzungsablauf zu bestätigen.",
        detail: "Damit ist die Tour abgeschlossen. Du kennst jetzt den grundlegenden TaskFlow-Workflow.",
      },
    ],
    troubleshootingTitle: "Wenn etwas nicht stimmt",
    troubleshooting: [
      {
        question: "Das Demo-Passwort funktioniert nicht",
        answer: "Verwende genau demo1234. Die gehostete Demo und der lokale In-Memory-Modus nutzen dasselbe bereitgestellte Konto.",
      },
      {
        question: "Meine lokalen Daten sind verschwunden",
        answer: "Der In-Memory-Modus wird beim Neustart der API zurückgesetzt. Das ist im lokalen Demonstrationsmodus erwartungsgemäß.",
      },
      {
        question: "Eine Anfrage gab 429 zurück",
        answer: "Die Ratenbegrenzung ist aktiv. Warte einen Moment und versuche es erneut.",
      },
      {
        question: "Ein Arbeitsbereichsname wurde abgelehnt",
        answer: "Arbeitsbereichsnamen müssen eindeutig sein. Benenne den vorhandenen Arbeitsbereich um, statt ein Duplikat zu erstellen.",
      },
    ],
    exploreTitle: "Weiter erkunden",
    seeStack: "Den Technologie-Stack ansehen",
    readPrivacy: "Datenschutzerklärung lesen",
    readTerms: "Nutzungsbedingungen lesen",
    supportProject: "Das Projekt unterstützen",
  },
  privacy: {
    title: "Datenschutzerklärung",
    metaDescription:
      "Was TaskFlow speichert, warum es das speichert, wo die Daten liegen und wie du die Löschung eines gehosteten Demo-Kontos beantragen kannst.",
    eyebrow: "Rechtliches",
    pageDescription:
      "Stichtag: 19. November 2026. TaskFlow ist eine von Syed Ali betriebene Portfolio-Demo. Diese Erklärung beschreibt, was die App speichert und warum.",
    whatWeStore: "Was wir speichern",
    caption: "Datenkategorien, die TaskFlow speichert, und die Gründe dafür",
    tableCategory: "Kategorie",
    tableExamples: "Beispiele",
    tableWhy: "Warum",
    categories: [
      {
        name: "Kontodaten",
        examples: "Name, E-Mail-Adresse, Passwort-Hash, Arbeitsbereichsrolle",
        reason: "Dich anmelden und festlegen, worauf du zugreifen darfst.",
      },
      {
        name: "Inhalte des Arbeitsbereichs",
        examples: "Arbeitsbereiche, Tafeln, Listen, Aufgaben, Kommentare, Einladungen",
        reason: "Die Kernfunktionen der Aufgabenverwaltung bereitstellen.",
      },
      {
        name: "Sitzungsdaten",
        examples: "Ein httpOnly-Cookie namens tf_access mit einem signierten JWT",
        reason: "Dich angemeldet halten, ohne das Token an JavaScript preiszugeben.",
      },
      {
        name: "Technische Daten",
        examples: "IP-Adresse und Metadaten der Anfragen",
        reason: "Ratenbegrenzungen anwenden, die API schützen und Fehler diagnostizieren.",
      },
    ],
    passwordsNote:
      "Passwörter werden vor der Speicherung gehasht. TaskFlow speichert keine rohen JWTs in localStorage und setzt keine Werbe- oder Analytics-Cookies von Drittanbietern.",
    whereDataLives: "Wo die Daten liegen",
    localMode:
      "Lokaler Demomodus: Die API nutzt einen In-Memory-Speicher. Die Daten verschwinden beim Neustart des API-Prozesses.",
    hostedMode:
      "Gehostete Demo: Anwendungsdaten werden in Neon Postgres gespeichert. Die Next.js-App und die API laufen auf Vercel, wo Infrastruktur-Logs nach eigenen Richtlinien verarbeitet werden können.",
    howWeUseData: "Wie wir Daten verwenden",
    howWeUseDataBody:
      "Wir verwenden diese Informationen nur, um die App zu betreiben, sicher zu halten und Support-Anfragen zu beantworten. Wir verkaufen keine personenbezogenen Daten und nutzen Inhalte aus Arbeitsbereichen nicht für Werbung.",
    sharingRetention: "Weitergabe und Aufbewahrung",
    sharingRetentionBody:
      "TaskFlow gibt Inhalte aus Arbeitsbereichen nicht absichtlich an Dritte weiter. Hosting-Anbieter verarbeiten Daten in unserem Auftrag, um den Dienst zu betreiben. Lokale In-Memory-Daten sind vorübergehend; gehostete Daten bleiben erhalten, bis du sie löschst oder ein inaktiver Demo-Arbeitsbereich entfernt wird.",
    securityChoices: "Sicherheit und deine Möglichkeiten",
    securityBody:
      "Zugriffsprüfungen erfolgen in der Express API, einschließlich der Prüfung der Zugehörigkeit zum Arbeitsbereich und der Rollen. Kontoantworten verwenden Cache-Control: no-store. Du kannst dich abmelden, von dir erstellte Inhalte löschen oder die Löschung eines gehosteten Demo-Kontos beantragen.",
    childrenBody:
      "TaskFlow richtet sich nicht an Kinder unter 13 Jahren. Gib keine sensiblen, vertraulichen oder produktionskritischen Daten in die Demo ein.",
    changesContact: "Änderungen und Kontakt",
    changesBody:
      "Wir können diese Erklärung aktualisieren, wenn sich die App ändert; das oben genannte Stichtagsdatum kennzeichnet die aktuelle Version. Fragen oder Löschungsanfragen: syed.ali@taskflow.dev.",
    relatedBody:
      "Der Quellcode des Repositories ist unter der MIT License lizenziert. Siehe die Nutzungsbedingungen und die MIT license.",
  },
  terms: {
    title: "Nutzungsbedingungen",
    metaDescription:
      "Verständliche Regeln für die Nutzung der gehosteten TaskFlow-Demo und der öffentlichen Website sowie Informationen zur MIT License für den Quellcode.",
    eyebrow: "Rechtliches",
    pageDescription:
      "Stichtag: 19. November 2026. Diese Bedingungen regeln die Nutzung der gehosteten TaskFlow-Demo und der öffentlichen Website. Der Quellcode ist separat unter der MIT License lizenziert.",
    onThisPage: "Auf dieser Seite",
    sections: [
      {
        id: "who-runs-this",
        title: "Wer dies betreibt",
        body: "TaskFlow ist ein von Syed Ali betriebenes Portfolio-Projekt. Es wird zu Demonstrations-, Evaluierungs- und Lernzwecken bereitgestellt. Es ist kein kommerzieller Dienst und nicht für produktionskritische Aufgaben gedacht.",
      },
      {
        id: "using-the-demo",
        title: "Nutzung der Demo",
        body: "Du darfst die Demo nur nutzen, wenn du mindestens 13 Jahre alt bist, korrekte Kontoangaben verwendest, andere Nutzer und deren Arbeitsbereiche respektierst und geltendes Recht beachtest. Das gemeinsame Demo-Konto und die vorbereiteten Inhalte sind öffentliche Beispiele. Gib keine Passwörter, Geheimnisse, personenbezogenen Daten oder vertraulichen Geschäftsinformationen ein.",
      },
      {
        id: "accounts",
        title: "Konten und Sicherheit",
        body: "Halte deine Zugangsdaten geheim und melde dich nach der Nutzung ab. TaskFlow speichert Sitzungen in einem httpOnly-Cookie und führt serverseitige Prüfungen der Zugehörigkeit und der Rollen durch. Du bist für Aktivitäten verantwortlich, die mit deinem Konto erfolgen. Melde vermutete unbefugte Zugriffe an syed.ali@taskflow.dev.",
      },
      {
        id: "your-content",
        title: "Deine Inhalte",
        body: "Du behältst das Eigentum an Inhalten, die du in TaskFlow erstellst. Mit dem Einreichen von Inhalten gewährst du dem Betreiber eine eingeschränkte, nicht exklusive Lizenz, diese ausschließlich zum Betrieb der Demo zu speichern und anzuzeigen. Reiche keine Inhalte ein, deren Weitergabe du nicht berechtigt bist. Inhalte können entfernt werden, wenn sie beleidigend, rechtswidrig sind oder die Demo gefährden.",
      },
      {
        id: "acceptable-use",
        title: "Zulässige Nutzung",
        body: "Teste, scanne oder greife die App, die API, die Datenbank oder die Hosting-Anbieter nicht an; umgehe keine Authentifizierung, Rollen, Ratenbegrenzungen oder Arbeitsbereichsprüfungen; lese keine privaten Routen aus und überlaste den Dienst nicht; lade keine Malware, Spam, Phishing-Material oder urheberrechtsverletzende Inhalte hoch; gib dich nicht als andere Person aus; nutze die Demo nicht für illegale Aktivitäten.",
      },
      {
        id: "availability",
        title: "Verfügbarkeit und Änderungen",
        body: "Die Demo kann jederzeit nicht erreichbar, zurückgesetzt, geändert oder eingestellt werden. Lokale In-Memory-Daten werden beim Neustart der API zurückgesetzt, und gehostete Daten können im Rahmen von Wartungsarbeiten gelöscht werden. Wir können diese Bedingungen aktualisieren; das oben genannte Stichtagsdatum zeigt die aktuelle Version.",
      },
      {
        id: "open-source",
        title: "Open-Source-Lizenz",
        body: "Der Quellcode des Repositories ist unter der MIT License lizenziert. Diese Lizenz erlaubt dir, den Code unter Beachtung ihres Urheberrechtsvermerks zu kopieren, zu ändern und zu verbreiten. Sie gewährt keinen Zugriff auf gehostete Konten, Zugangsdaten oder private Daten.",
      },
      {
        id: "third-parties",
        title: "Dienste von Drittanbietern",
        body: "Die gehostete App nutzt Vercel für das Hosting und Neon für die Datenbank. Deine Nutzung dieser Dienste unterliegt zusätzlich deren Nutzungs- und Datenschutzbestimmungen. TaskFlow setzt keine Werbecookies.",
      },
      {
        id: "disclaimer",
        title: "Haftungsausschluss und Haftung",
        body: "Die Software und die gehostete Demo werden „wie sie sind“ und „wie verfügbar“ bereitgestellt, ohne jegliche Gewährleistung. Soweit gesetzlich zulässig, haftet der Betreiber nicht für indirekte, zufällige, besondere, Folge- oder Strafschäden oder für Daten-, Gewinn- oder Nutzungsverluste aus der Demo, selbst wenn auf die Möglichkeit solcher Schäden hingewiesen wurde.",
      },
      {
        id: "termination",
        title: "Beendigung und Kontakt",
        body: "Wir können den Zugang bei Verhalten, das gegen diese Bedingungen verstößt oder den Dienst gefährdet, aussetzen oder beenden. Du kannst die Demo jederzeit nicht mehr nutzen und die Löschung deines gehosteten Kontos beantragen. Fragen: syed.ali@taskflow.dev.",
      },
    ],
    relatedPolicies: "Verwandte Richtlinien",
  },
  license: {
    title: "MIT license",
    metaDescription:
      "Der TaskFlow-Quellcode wird von Syed Ali unter der MIT License veröffentlicht. Lies den vollständigen Lizenztext und die verwandten Richtlinien.",
    eyebrow: "Open Source",
    pageDescription:
      "Der Quellcode darf nach den unten genannten Bedingungen frei genutzt, kopiert, geändert und verbreitet werden. Für die gehostete Demo gelten zudem die Nutzungsbedingungen und die Datenschutzerklärung.",
    fullTextTitle: "Vollständiger Lizenztext",
    scopeTitle: "Was dies umfasst",
    scopeBody:
      "Die MIT License gilt für den Quellcode des Repositories. Sie gewährt keinen Zugriff auf gehostete Konten, Zugangsdaten oder private Daten. Die maßgebliche Fassung befindet sich im Stammverzeichnis des Repositories als LICENSE.",
  },
  sponsors: {
    title: "Sponsoren und Unterstützung",
    metaDescription:
      "TaskFlow ist kostenlos und Open Source unter der MIT License. Erfahre, wie du das Projekt über GitHub Sponsors, Issues, Reviews und Dokumentation unterstützen kannst.",
    eyebrow: "Community",
    pageDescription:
      "TaskFlow ist kostenlos und Open Source unter der MIT License. Die Demo wird aus eigenen Mitteln für Lern- und Portfoliozwecke betrieben.",
    whyTitle: "Warum Unterstützung wichtig ist",
    whyBody:
      "Sponsoring hilft dabei, die Demo online und die Dokumentation nützlich zu halten. Es ist völlig freiwillig: Code, Anleitungen, Datenschutzerklärung und Nutzungsbedingungen bleiben frei lesbar, nutzbar, forkbar und verbesserbar.",
    sponsorButton: "Auf GitHub sponsern",
    waysTitle: "Möglichkeiten zu helfen",
    options: [
      {
        title: "Mit Stern versehen und teilen",
        body: "Vergib einen Stern für das Repository und schicke es jemandem, der Next.js, Express oder Full-Stack-Architektur lernt.",
      },
      {
        title: "Fehler klar melden",
        body: "Eröffne ein Issue mit Schritten zur Reproduktion, erwartetem Verhalten und dem, was tatsächlich passiert ist.",
      },
      {
        title: "Prüfen oder verbessern",
        body: "Prüfe einen Pull Request, verbessere ein Detail zur Barrierefreiheit, füge einen Test hinzu oder präzisiere die Dokumentation.",
      },
      {
        title: "Maintainer sponsern",
        body: "Nutze GitHub Sponsors, wenn du das laufende Hosting und die Wartung finanziell unterstützen möchtest.",
      },
    ],
    currentTitle: "Aktuelle Sponsoren",
    currentBody:
      "Es sind noch keine Sponsoren aufgeführt. Um hier erwähnt zu werden, nutze den obigen GitHub-Sponsors-Link oder schreibe eine E-Mail an syed.ali@taskflow.dev.",
    teamsTitle: "Für Teams",
    teamsBody:
      "TaskFlow ist eine Demo, kein verwalteter Dienst. Für den Produktionseinsatz forke das Repository, stelle es in deinen eigenen Vercel- und Neon-Konten bereit und verwalte eigene Daten- und Sicherheitskontrollen.",
    followGuide: "Der Anleitung folgen",
    deploymentGuide: "Kostenlose Deployment-Anleitung",
  },
  dashboard: {
    title: "Arbeitsbereich-Dashboard",
    spacesLabel: "Arbeitsbereiche",
    allWorkspaces: "Alle Arbeitsbereiche",
    signOut: "Abmelden",
    workspacesTitle: "Arbeitsbereiche",
    workspacesHint: "Jeder Name muss eindeutig sein. Nutze „Umbenennen“ auf einer Karte, wenn zwei Arbeitsbereiche gleich aussehen.",
    newWorkspacePlaceholder: "Name des neuen Arbeitsbereichs",
    couldNotCreateWorkspace: "Arbeitsbereich konnte nicht erstellt werden",
    couldNotRenameWorkspace: "Arbeitsbereich konnte nicht umbenannt werden",
    rename: "Umbenennen",
    noDescription: "Noch keine Beschreibung",
    openBoard: "Tafel öffnen",
    noBoard: "Noch keine Tafel",
    peopleTitle: "Personen",
    peopleHint: "Lade Teammitglieder in den ausgewählten Arbeitsbereich ein. Sie treten über den Link bei (in der Demo ist kein E-Mail-Anbieter nötig).",
    workspaceLabel: "Arbeitsbereich",
    sendInvitation: "Einladung senden",
    inviteLink: "Einladungslink:",
    currentMembers: "Aktuelle Mitglieder",
    pendingInvites: "Ausstehende Einladungen",
    openLink: "Link öffnen",
    couldNotLoadPeople: "Personen konnten nicht geladen werden",
    couldNotSendInvite: "Einladung konnte nicht gesendet werden",
    billingTitle: "Abrechnung",
    billingHint: "Die Tarife werden für die Portfolio-Geschichte gezeigt. Stripe im Testmodus lässt sich anbinden, ohne dieses Layout zu ändern.",
    plans: [
      { name: "Kostenlos", price: "$0", note: "Ein Arbeitsbereich, Basis-Tafel." },
      { name: "Pro", price: "$9", note: "Mehr Plätze. Stripe-Checkout folgt." },
      { name: "Enterprise", price: "$99", note: "SSO und Audit-Trail später." },
    ],
    roles: {
      member: "Mitglied",
      admin: "Admin",
      viewer: "Betrachter",
    },
    board: {
      breadcrumb: "Arbeitsbereiche /",
      fallbackWorkspace: "Arbeitsbereich",
      create: "+ Erstellen",
      searchPlaceholder: "Tafel durchsuchen",
      newTaskPlaceholder: "Was muss erledigt werden?",
      couldNotAddTask: "Aufgabe konnte nicht hinzugefügt werden",
      couldNotMoveTask: "Aufgabe konnte nicht verschoben werden",
      couldNotUpdateTask: "Aufgabe konnte nicht aktualisiert werden",
      defaultColumns: [
        { id: "todo", name: "Zu erledigen" },
        { id: "in_progress", name: "In Arbeit" },
        { id: "done", name: "Erledigt" },
      ],
    },
    task: {
      drag: "Ziehen",
      unassigned: "Nicht zugewiesen",
      create: "+ Erstellen",
      moveWorkItem: "Arbeitselement verschieben",
      changeStatus: "Status ändern",
      copyLink: "Link kopieren",
      copyKey: "Schlüssel kopieren",
      linkConfluencePage: "Confluence-Seite verlinken",
      linkWorkItem: "Arbeitselement verlinken",
      changeParent: "Übergeordnetes Element ändern",
      selectCover: "Titelbild auswählen",
      editLabels: "Labels bearbeiten",
      removeFlag: "Markierung entfernen",
      addFlag: "Markierung hinzufügen",
      noParent: "Kein übergeordnetes Element",
      confluenceHint: "Füge eine Confluence-URL ein, um sie an dieses Arbeitselement anzuhängen.",
      copySamplePageLink: "Beispielseiten-Link kopieren",
      moreActions: "Weitere Aktionen",
      priorities: {
        low: "niedrig",
        medium: "mittel",
        high: "hoch",
        urgent: "dringend",
      },
      labels: {
        bug: "Fehler",
        feature: "Funktion",
        chatbot: "Chatbot",
        qa: "QA",
      },
      loading: "Wird geladen…",
      close: "Schließen",
      priority: "Priorität",
      description: "Beschreibung",
      addDescription: "Beschreibung hinzufügen…",
      saveDescription: "Beschreibung speichern",
      attachments: "Anhänge",
      attachmentsHint: "Bilder, PDF, Videos oder beliebige Dateien als Referenz.",
      pdf: "(PDF)",
      comments: "Kommentare",
      commentPlaceholder: "Dieses Arbeitselement kommentieren",
      comment: "Kommentieren",
      couldNotLoad: "Aufgabe konnte nicht geladen werden",
      couldNotSave: "Konnte nicht gespeichert werden",
    },
    invite: {
      invalidInvitation: "Ungültige Einladung",
      couldNotJoin: "Beitritt fehlgeschlagen",
      joinPrefix: "Beitreten",
      fallbackWorkspace: "der Arbeitsbereich",
      invitedAsPrefix: "Eingeladen als",
      fallbackRole: "Mitglied",
      yourName: "Dein Name",
      choosePassword: "Passwort wählen",
      joining: "Beitritt läuft…",
      joinWorkspace: "Arbeitsbereich beitreten",
    },
  },
};

export default de;
