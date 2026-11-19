import { apiErrors } from "@/i18n/api-errors";
import type { Dictionary } from "@/i18n/types";

const es: Dictionary = {
  common: {
    language: "Idioma",
    signIn: "Iniciar sesión",
    signOut: "Cerrar sesión",
    create: "Crear",
    cancel: "Cancelar",
    save: "Guardar",
    close: "Cerrar",
    email: "Correo electrónico",
    password: "Contraseña",
    role: "Rol",
    workspace: "Espacio de trabajo",
    workspaces: "Espacios de trabajo",
    board: "Tablero",
    people: "Personas",
    billing: "Facturación",
    guide: "Guía",
    sponsors: "Patrocinadores",
    privacyPolicy: "Política de privacidad",
    termsOfService: "Términos del servicio",
    mitLicense: "Licencia MIT",
    firstTimeGuide: "Guía de primer uso",
    sourceOnGitHub: "Código fuente en GitHub",
    overview: "Resumen",
    liveBoard: "Tablero en vivo",
    openTheProduct: "Abrir el producto",
    publicNavigation: "Navegación pública",
    productLinks: "Enlaces del producto",
    projectLinks: "Enlaces del proyecto",
    product: "Producto",
    project: "Proyecto",
    copyright: "© 2026 Syed Ali. Código fuente publicado bajo la MIT License.",
    effectiveDate: "Fecha de vigencia: 19 de noviembre de 2026",
    ...apiErrors.es,
  },
  footer: {
    tagline: "Un gestor de tareas colaborativo creado con Next.js, Express y PostgreSQL.",
  },
  landing: {
    seedLists: [
      { id: "todo", name: "Listos" },
      { id: "in_progress", name: "En marcha" },
      { id: "done", name: "Entregado" },
    ],
    seedTasks: [
      { id: "p1", title: "Escribir notas de lanzamiento", label: "lanzamiento" },
      { id: "p2", title: "Configurar roles del espacio de trabajo", label: "autenticación" },
      { id: "p3", title: "Poblar el espacio de trabajo de demostración", label: "demo" },
      { id: "p4", title: "Pulir los menús desbordantes del tablero", label: "interfaz" },
    ],
    heroEyebrow: "SaaS colaborativo · proyecto de portafolio",
    heroTitle: "Que el trabajo avance, no las reuniones.",
    heroBody:
      "Un tablero con forma de producción: Next.js App Router, Express, PostgreSQL, sesiones con cookies y un espacio de trabajo estilo Jira del que realmente puedes publicar.",
    heroPrimary: "Probar como Syed Ali",
    heroSecondary: "Arrastra en el tablero de demostración",
    statCards: "Tarjetas en la vista previa",
    statShipped: "Entregado",
    statSession: "Sesión",
    statCookie: "Cookie",
    previewHint: "Tablero de lanzamiento · arrastra tarjetas entre columnas",
    reset: "Restablecer",
    tabs: [
      {
        id: "boards",
        label: "Tableros",
        title: "Tableros que se sienten como trabajo real",
        body: "Columnas, prioridades, indicadores y un menú completo de tarjetas: arrastra una tarjeta en la vista previa en vivo.",
      },
      {
        id: "session",
        label: "Sesión",
        title: "Una sesión que sobrevive a la actualización",
        body: "Cookies httpOnly a través de un BFF de Next.js. Sin tokens en localStorage. SSR lee la misma sesión.",
      },
      {
        id: "people",
        label: "Personas",
        title: "Personas y espacios",
        body: "Espacios de trabajo, nombres únicos, invitaciones y roles. Cambia el nombre una vez y se refleja en la barra lateral y en el tablero.",
      },
    ],
    stackTitle: "Lo que demuestra esta implementación",
    stack: [
      {
        title: "Separación en monorepo",
        body: "`apps/web` y `apps/api` comparten tipos, para que la interfaz y la API puedan crecer por separado.",
      },
      {
        title: "Modelo de datos real",
        body: "Espacios de trabajo, roles, tableros, listas, comentarios y archivos adjuntos, no una sola tabla de tareas.",
      },
      {
        title: "Hábitos de producción",
        body: "Helmet, Zod, cookies httpOnly, SSR con no-store, nombres de espacio de trabajo únicos y una comprobación de salud.",
      },
    ],
    guideCtaTitle: "¿Eres nuevo aquí? Haz un recorrido guiado.",
    guideCtaBody:
      "Sigue la guía de primer uso para iniciar sesión, crear una tarea, moverla por el tablero e invitar a un compañero.",
    guideCtaButton: "Abrir la guía de 10 minutos",
  },
  login: {
    title: "Iniciar sesión",
    metaDescription: "Inicia sesión en tu espacio de trabajo de TaskFlow para gestionar tableros, tareas y compañeros.",
    heading: "Inicia sesión en TaskFlow",
    subheading: "Inicia sesión como el propietario del espacio de trabajo, Syed Ali, para recorrer el producto.",
    submitting: "Iniciando sesión…",
  },
  guide: {
    title: "Guía de primer uso",
    metaDescription:
      "Un recorrido de diez minutos por TaskFlow: inicia sesión, abre un espacio de trabajo, crea y mueve una tarea, invita a un compañero y cierra sesión.",
    eyebrow: "Empieza aquí",
    pageTitle: "Tus primeros 10 minutos en TaskFlow",
    beforeTitle: "Antes de empezar",
    beforeBody:
      "La demostración es gratuita y no requiere tarjeta de crédito. Úsala solo para evaluación; no incluyas información sensible en una tarea, comentario o invitación.",
    openDemo: "Abrir la demostración",
    tourTitle: "El recorrido guiado",
    stepPrefix: "Paso",
    steps: [
      {
        title: "Inicia sesión con la cuenta de demostración",
        body: "Abre la página de inicio de sesión y usa la cuenta precargada. TaskFlow guarda la sesión en una cookie httpOnly, por lo que no se escribe ningún token en el almacenamiento del navegador.",
        detail: "Correo: syed.ali@taskflow.dev · Contraseña: demo1234",
      },
      {
        title: "Abre tu espacio de trabajo",
        body: "El panel de control muestra los espacios de trabajo. Abre TaskFlow Demo para ver el tablero precargado. Un espacio de trabajo es el límite de seguridad para tableros, miembros e invitaciones.",
        detail: "Opcional: crea otro espacio de trabajo con un nombre único o cambia el nombre de una tarjeta existente directamente.",
      },
      {
        title: "Explora el tablero",
        body: "El tablero tiene tres listas: Listos, En marcha y Entregado. Usa Buscar en el tablero para filtrar tarjetas por título y la barra lateral para cambiar de tablero.",
        detail: "La página de inicio tiene una vista previa interactiva si quieres probar a arrastrar antes de iniciar sesión.",
      },
      {
        title: "Crea una tarea",
        body: "Elige + Crear en la cabecera del tablero, escribe un título breve y pulsa Crear. Abre la tarjeta para añadir una descripción, prioridad, responsable, etiquetas o un comentario.",
        detail: "Cada cambio se guarda a través de la API de Express, no solo en el estado local del navegador.",
      },
      {
        title: "Haz avanzar el trabajo",
        body: "Arrastra la tarjeta a En marcha, añade un comentario con la siguiente acción y muévela a Entregado cuando termines. Arrastrar y soltar es compatible con el teclado.",
        detail: "Las actualizaciones de los detalles de la tarea se validan con los mismos esquemas compartidos que usa la API.",
      },
      {
        title: "Invita a un compañero",
        body: "Abre Personas en la barra lateral, elige un espacio de trabajo, introduce un correo y selecciona miembro, administrador o espectador. Envía la invitación y copia el enlace generado.",
        detail: "Los roles y la pertenencia al espacio de trabajo los aplica la API, no el proxy de Next.js.",
      },
      {
        title: "Revisa la configuración y cierra sesión",
        body: "Visita Facturación/Configuración para ver la interfaz de ajustes de demostración y luego cierra sesión desde la barra lateral. Vuelve a iniciar sesión para confirmar el flujo de sesión basado en cookies.",
        detail: "Con eso termina el recorrido. Ya conoces el flujo esencial de TaskFlow.",
      },
    ],
    troubleshootingTitle: "Si algo no va bien",
    troubleshooting: [
      {
        question: "La contraseña de la demostración no funciona",
        answer: "Usa exactamente demo1234. La demostración alojada y el modo local en memoria usan la misma cuenta precargada.",
      },
      {
        question: "Mis datos locales desaparecieron",
        answer: "El modo en memoria se reinicia cuando se reinicia la API. Esto es normal en el modo de demostración local.",
      },
      {
        question: "Una solicitud devolvió 429",
        answer: "La limitación de solicitudes está activa. Espera un momento e inténtalo de nuevo.",
      },
      {
        question: "Se rechazó el nombre de un espacio de trabajo",
        answer: "Los nombres de los espacios de trabajo deben ser únicos. Cambia el nombre del espacio existente en lugar de crear uno duplicado.",
      },
    ],
    exploreTitle: "Sigue explorando",
    seeStack: "Ver la pila tecnológica",
    readPrivacy: "Leer la política de privacidad",
    readTerms: "Leer los términos",
    supportProject: "Apoyar el proyecto",
  },
  privacy: {
    title: "Política de privacidad",
    metaDescription:
      "Qué almacena TaskFlow, por qué lo hace, dónde están los datos y cómo solicitar la eliminación de una cuenta de demostración alojada.",
    eyebrow: "Legal",
    pageDescription:
      "Fecha de vigencia: 19 de noviembre de 2026. TaskFlow es una demostración de portafolio operada por Syed Ali. Esta política explica qué datos almacena la aplicación y por qué.",
    whatWeStore: "Qué almacenamos",
    caption: "Categorías de datos que almacena TaskFlow y el motivo",
    tableCategory: "Categoría",
    tableExamples: "Ejemplos",
    tableWhy: "Por qué",
    categories: [
      {
        name: "Datos de la cuenta",
        examples: "Nombre, correo electrónico, hash de la contraseña, rol en el espacio de trabajo",
        reason: "Identificarte y determinar a qué puedes acceder.",
      },
      {
        name: "Contenido del espacio de trabajo",
        examples: "Espacios de trabajo, tableros, listas, tareas, comentarios, invitaciones",
        reason: "Ofrecer las funciones esenciales de gestión de tareas.",
      },
      {
        name: "Datos de sesión",
        examples: "Una cookie httpOnly tf_access que contiene un JWT firmado",
        reason: "Mantener tu sesión iniciada sin exponer el token a JavaScript.",
      },
      {
        name: "Datos técnicos",
        examples: "Dirección IP y metadatos de la solicitud",
        reason: "Aplicar límites de solicitudes, proteger la API y diagnosticar fallos.",
      },
    ],
    passwordsNote:
      "Las contraseñas se hashean antes de almacenarse. TaskFlow no guarda JWT sin procesar en localStorage y no instala cookies de publicidad ni de análisis de terceros.",
    whereDataLives: "Dónde están los datos",
    localMode:
      "Modo de demostración local: la API usa un almacenamiento en memoria. Los datos desaparecen cuando se reinicia el proceso de la API.",
    hostedMode:
      "Demostración alojada: los datos de la aplicación se almacenan en Neon Postgres. La aplicación Next.js y la API se ejecutan en Vercel, que puede procesar registros de infraestructura según sus propias políticas.",
    howWeUseData: "Cómo usamos los datos",
    howWeUseDataBody:
      "Usamos esta información solo para operar la aplicación, mantenerla segura y responder a solicitudes de soporte. No vendemos datos personales y no usamos el contenido de los espacios de trabajo para publicidad.",
    sharingRetention: "Compartición y conservación",
    sharingRetentionBody:
      "TaskFlow no comparte intencionadamente el contenido de los espacios de trabajo con terceros. Los proveedores de alojamiento procesan datos en nuestro nombre para operar el servicio. Los datos locales en memoria son temporales; los datos alojados permanecen hasta que los eliminas o se elimina un espacio de trabajo de demostración inactivo.",
    securityChoices: "Seguridad y tus opciones",
    securityBody:
      "Las comprobaciones de acceso se realizan en la API de Express, incluidas la pertenencia al espacio de trabajo y los roles. Las respuestas de la cuenta usan Cache-Control: no-store. Puedes cerrar sesión, eliminar el contenido que creaste o solicitar la eliminación de una cuenta de demostración alojada.",
    childrenBody:
      "TaskFlow no está dirigido a menores de 13 años. No envíes datos sensibles, confidenciales ni críticos para producción a la demostración.",
    changesContact: "Cambios y contacto",
    changesBody:
      "Podemos actualizar esta política cuando la aplicación cambie; la fecha de vigencia indicada arriba identifica la versión actual. Preguntas o solicitudes de eliminación: syed.ali@taskflow.dev.",
    relatedBody:
      "El código fuente del repositorio está licenciado bajo la MIT License. Consulta los términos del servicio y la licencia MIT.",
  },
  terms: {
    title: "Términos del servicio",
    metaDescription:
      "Reglas en lenguaje claro para usar la demostración alojada y el sitio web público de TaskFlow, además de cómo se aplica la licencia MIT al código fuente.",
    eyebrow: "Legal",
    pageDescription:
      "Fecha de vigencia: 19 de noviembre de 2026. Estos términos rigen el uso de la demostración alojada y el sitio web público de TaskFlow. El código fuente tiene una licencia independiente bajo la MIT License.",
    onThisPage: "En esta página",
    sections: [
      {
        id: "who-runs-this",
        title: "Quién administra esto",
        body: "TaskFlow es un proyecto de portafolio operado por Syed Ali. Se ofrece para demostración, evaluación y aprendizaje. No es un servicio comercial y no está pensado para trabajos críticos de producción.",
      },
      {
        id: "using-the-demo",
        title: "Uso de la demostración",
        body: "Puedes usar la demostración solo si tienes al menos 13 años, usas información de cuenta veraz, respetas a otros usuarios y sus espacios de trabajo y cumples la ley aplicable. La cuenta compartida de demostración y el contenido precargado son ejemplos públicos. No introduzcas contraseñas, secretos, datos personales ni información empresarial confidencial.",
      },
      {
        id: "accounts",
        title: "Cuentas y seguridad",
        body: "Mantén tus credenciales en privado y cierra sesión cuando termines. TaskFlow almacena las sesiones en una cookie httpOnly y aplica comprobaciones de pertenencia y roles en el servidor. Eres responsable de la actividad que ocurra con tu cuenta. Informa de cualquier acceso no autorizado sospechoso a syed.ali@taskflow.dev.",
      },
      {
        id: "your-content",
        title: "Tu contenido",
        body: "Conservas la propiedad del contenido que creas en TaskFlow. Al enviar contenido, otorgas al operador una licencia limitada y no exclusiva para almacenarlo y mostrarlo únicamente con el fin de operar la demostración. No envíes contenido que no tengas derecho a compartir. El contenido puede eliminarse si es abusivo, ilícito o pone en riesgo la demostración.",
      },
      {
        id: "acceptable-use",
        title: "Uso aceptable",
        body: "No sondees, escanees ni ataques la aplicación, la API, la base de datos ni los proveedores de alojamiento; no eludas la autenticación, los roles, los límites de solicitudes ni las comprobaciones de espacio de trabajo; no extraigas datos de rutas privadas ni satures el servicio; no subas malware, spam, material de phishing ni contenido que infrinja derechos; no te hagas pasar por otra persona; ni uses la demostración para actividades ilegales.",
      },
      {
        id: "availability",
        title: "Disponibilidad y cambios",
        body: "La demostración puede estar no disponible, reiniciarse, cambiar o descontinuarse en cualquier momento. Los datos locales en memoria se reinician cuando se reinicia la API y los datos alojados pueden eliminarse durante el mantenimiento. Podemos actualizar estos términos; la fecha de vigencia indicada arriba muestra la versión actual.",
      },
      {
        id: "open-source",
        title: "Licencia de código abierto",
        body: "El código fuente del repositorio está licenciado bajo la MIT License. Esa licencia te permite copiar, modificar y distribuir el código, sujeto a su aviso de copyright. No otorga acceso a cuentas alojadas, credenciales ni datos privados.",
      },
      {
        id: "third-parties",
        title: "Servicios de terceros",
        body: "La aplicación alojada usa Vercel para el alojamiento y Neon para la base de datos. Tu uso de esos servicios también está sujeto a sus términos y políticas de privacidad. TaskFlow no instala cookies publicitarias.",
      },
      {
        id: "disclaimer",
        title: "Descargo de responsabilidad y limitación de responsabilidad",
        body: "El software y la demostración alojada se proporcionan «tal cual» y «según disponibilidad», sin garantías de ningún tipo. En la máxima medida permitida por la ley, el operador no responde por daños indirectos, incidentales, especiales, consecuentes ni punitivos, ni por pérdida de datos, beneficios o uso derivados de la demostración, incluso si se le ha advertido de la posibilidad de dichos daños.",
      },
      {
        id: "termination",
        title: "Terminación y contacto",
        body: "Podemos suspender o terminar el acceso por conductas que infrinjan estos términos o pongan en riesgo el servicio. Puedes dejar de usar la demostración en cualquier momento y solicitar la eliminación de tu cuenta alojada. Preguntas: syed.ali@taskflow.dev.",
      },
    ],
    relatedPolicies: "Políticas relacionadas",
  },
  license: {
    title: "Licencia MIT",
    metaDescription:
      "El código fuente de TaskFlow es publicado por Syed Ali bajo la MIT License. Lee el texto completo de la licencia y las políticas relacionadas.",
    eyebrow: "Código abierto",
    pageDescription:
      "El código fuente puede usarse, copiarse, modificarse y distribuirse libremente según los términos siguientes. La demostración alojada también está sujeta a los términos y la política de privacidad.",
    fullTextTitle: "Texto completo de la licencia",
    scopeTitle: "Qué cubre",
    scopeBody:
      "La MIT License se aplica al código fuente del repositorio. No otorga acceso a cuentas alojadas, credenciales ni datos privados. La copia canónica se encuentra en la raíz del repositorio como LICENSE.",
  },
  sponsors: {
    title: "Patrocinadores y apoyo",
    metaDescription:
      "TaskFlow es gratuito y de código abierto bajo la MIT License. Descubre cómo apoyar el proyecto a través de GitHub Sponsors, incidencias, revisiones y documentación.",
    eyebrow: "Comunidad",
    pageDescription:
      "TaskFlow es gratuito y de código abierto bajo la MIT License. La demostración se autofinancia con fines de aprendizaje y portafolio.",
    whyTitle: "Por qué importa el apoyo",
    whyBody:
      "El patrocinio ayuda a mantener la demostración en línea y la documentación útil. Es totalmente opcional: el código, las guías, la política de privacidad y los términos siguen siendo gratuitos para leer, usar, bifurcar y mejorar.",
    sponsorButton: "Patrocinar en GitHub",
    waysTitle: "Formas de ayudar",
    options: [
      {
        title: "Dale una estrella y comparte",
        body: "Dale una estrella al repositorio y envíalo a alguien que esté aprendiendo Next.js, Express o arquitectura full-stack.",
      },
      {
        title: "Informa de un error claro",
        body: "Abre una incidencia con los pasos para reproducirlo, el comportamiento esperado y lo que viste en su lugar.",
      },
      {
        title: "Revisa o mejora",
        body: "Revisa una solicitud de cambio, mejora un detalle de accesibilidad, añade una prueba o aclara la documentación.",
      },
      {
        title: "Patrocina al mantenedor",
        body: "Usa GitHub Sponsors si quieres apoyar económicamente el alojamiento y el mantenimiento continuos.",
      },
    ],
    currentTitle: "Patrocinadores actuales",
    currentBody:
      "Aún no hay patrocinadores listados. Para aparecer aquí, usa el enlace de GitHub Sponsors de arriba o escribe a syed.ali@taskflow.dev.",
    teamsTitle: "Para equipos",
    teamsBody:
      "TaskFlow es una demostración, no un servicio administrado. Para trabajos de producción, bifurca el repositorio, despliégalo en tus propias cuentas de Vercel y Neon y mantén tus propios controles de datos y seguridad.",
    followGuide: "Sigue la guía",
    deploymentGuide: "Guía de despliegue gratuito",
  },
  dashboard: {
    title: "Panel del espacio de trabajo",
    spacesLabel: "Espacios",
    allWorkspaces: "Todos los espacios de trabajo",
    signOut: "Cerrar sesión",
    workspacesTitle: "Espacios de trabajo",
    workspacesHint: "Cada nombre debe ser único. Usa Cambiar nombre en una tarjeta si dos espacios parecen iguales.",
    newWorkspacePlaceholder: "Nombre del nuevo espacio de trabajo",
    couldNotCreateWorkspace: "No se pudo crear el espacio de trabajo",
    couldNotRenameWorkspace: "No se pudo cambiar el nombre del espacio de trabajo",
    rename: "Cambiar nombre",
    noDescription: "Aún no hay descripción",
    openBoard: "Abrir tablero",
    noBoard: "Aún no hay tablero",
    peopleTitle: "Personas",
    peopleHint: "Invita a compañeros al espacio de trabajo seleccionado. Se unen con el enlace (no se requiere proveedor de correo en la demostración).",
    workspaceLabel: "Espacio de trabajo",
    sendInvitation: "Enviar invitación",
    inviteLink: "Enlace de invitación:",
    currentMembers: "Miembros actuales",
    pendingInvites: "Invitaciones pendientes",
    openLink: "Abrir enlace",
    couldNotLoadPeople: "No se pudo cargar la lista de personas",
    couldNotSendInvite: "No se pudo enviar la invitación",
    billingTitle: "Facturación",
    billingHint: "Los planes se muestran para la historia del portafolio. Stripe en modo de prueba puede conectarse sin cambiar este diseño.",
    plans: [
      { name: "Gratis", price: "$0", note: "Un espacio de trabajo, tablero esencial." },
      { name: "Pro", price: "$9", note: "Más plazas. Próximamente pago con Stripe." },
      { name: "Enterprise", price: "$99", note: "SSO y registro de auditoría más adelante." },
    ],
    roles: {
      member: "miembro",
      admin: "administrador",
      viewer: "espectador",
    },
    board: {
      breadcrumb: "Espacios /",
      fallbackWorkspace: "Espacio de trabajo",
      create: "+ Crear",
      searchPlaceholder: "Buscar en el tablero",
      newTaskPlaceholder: "¿Qué hay que hacer?",
      couldNotAddTask: "No se pudo añadir la tarea",
      couldNotMoveTask: "No se pudo mover la tarea",
      couldNotUpdateTask: "No se pudo actualizar la tarea",
      defaultColumns: [
        { id: "todo", name: "Por hacer" },
        { id: "in_progress", name: "En curso" },
        { id: "done", name: "Hecho" },
      ],
    },
    task: {
      drag: "Arrastrar",
      unassigned: "Sin asignar",
      create: "+ Crear",
      moveWorkItem: "Mover elemento de trabajo",
      changeStatus: "Cambiar estado",
      copyLink: "Copiar enlace",
      copyKey: "Copiar clave",
      linkConfluencePage: "Vincular página de Confluence",
      linkWorkItem: "Vincular elemento de trabajo",
      changeParent: "Cambiar elemento principal",
      selectCover: "Seleccionar portada",
      editLabels: "Editar etiquetas",
      removeFlag: "Quitar marca",
      addFlag: "Añadir marca",
      noParent: "Sin elemento principal",
      confluenceHint: "Pega una URL de Confluence para adjuntarla a este elemento de trabajo.",
      copySamplePageLink: "Copiar enlace de página de ejemplo",
      moreActions: "Más acciones",
      priorities: {
        low: "baja",
        medium: "media",
        high: "alta",
        urgent: "urgente",
      },
      labels: {
        bug: "error",
        feature: "función",
        chatbot: "chatbot",
        qa: "qa",
      },
      loading: "Cargando…",
      close: "Cerrar",
      priority: "Prioridad",
      description: "Descripción",
      addDescription: "Añade una descripción…",
      saveDescription: "Guardar descripción",
      attachments: "Archivos adjuntos",
      attachmentsHint: "Imágenes, PDF, vídeo o cualquier archivo como referencia.",
      pdf: "(PDF)",
      comments: "Comentarios",
      commentPlaceholder: "Comenta este elemento de trabajo",
      comment: "Comentar",
      couldNotLoad: "No se pudo cargar la tarea",
      couldNotSave: "No se pudo guardar",
    },
    invite: {
      invalidInvitation: "Invitación no válida",
      couldNotJoin: "No se pudo unir",
      joinPrefix: "Unirse a",
      fallbackWorkspace: "el espacio de trabajo",
      invitedAsPrefix: "Invitado como",
      fallbackRole: "miembro",
      yourName: "Tu nombre",
      choosePassword: "Elige una contraseña",
      joining: "Uniéndose…",
      joinWorkspace: "Unirse al espacio de trabajo",
    },
  },
};

export default es;
