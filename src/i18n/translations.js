// ─── Translation strings — add new locales here without touching components ───

export const translations = {
  en: {
    nav: {
      home: "home",
      about: "about",
      projects: "projects",
      skills: "skills",
      contact: "contact",
    },

    langToggle: {
      ariaLabel: "Switch language",
      en: "EN",
      es: "ES",
    },

    hero: {
      title: "Full-Stack Developer",
      tagline:
        "I craft digital experiences that live at the intersection of clean code and thoughtful design.",
      viewProjects: "View Projects →",
      github: "GitHub ↗",
      yearsExp: "Years of Experience",
      projectsShipped: "Projects Shipped",
    },

    about: {
      sectionLabel: "01 — About Me",
      headline: ["Turning complex", "problems into", "elegant systems."],
      bio: "I'm a full-stack developer with 3+ years of experience building scalable web applications. I believe great software is built iteratively, tested rigorously, and designed with empathy. When I'm not pushing commits, I'm exploring generative art and contributing to open source.",
      philosophy:
        "Code is communication. I write for the developer who comes after me, not just the machine that runs it. I favor pragmatic architecture over clever abstractions, and ship working software over perfect plans.",
    },

    projects: {
      sectionLabel: "02 — Projects",
      searchPlaceholder: "Search projects…",
      noResults: "No projects match your search.",
      viewGallery: "View Gallery →",
      all: "All",
      lightboxHint: "← → arrow keys · ESC to close",
      descriptions: {
        1: 'Developed a professional recruitment platform for a Spanish client focused on “Selección 2.0” — a modern hiring approach that combines advanced technology, data analysis, and human expertise to connect companies with top talent.',
        2: "CollaTask is a conceptual SaaS designed to streamline iterative sprints for creative and agile teams. Built for small-to-medium teams who find enterprise tools over-engineered and confusing, it eliminates clutter to focus exclusively on visual, high-efficiency sprint management.",
        3: "Developer CLI for scaffolding microservice architectures with opinionated defaults and Kubernetes manifests.",
        4: "Developed a professional B2B website to showcase high-quality industrial components and automation systems from trusted international brands. The platform is designed to help industrial clients explore reliable solutions that ensure performance, efficiency, and long-term operational value.",
        5: "Open-source authentication microservice with OAuth 2.0, TOTP, passkeys, and audit logging out of the box.",
      },
    },

    skills: {
      sectionLabel: "03 — Skills",
      headline: "The tools of my craft.",
      categories: {
        Frontend: "Frontend",
        Backend: "Backend",
        Databases: "Databases",
        DevOps: "DevOps",
        Tools: "Tools",
      },
    },

    contact: {
      sectionLabel: "04 — Contact",
      headline: ["Let's build", "something", "remarkable."],
      subtext:
        "Whether it's a product idea, collaboration, or just saying hello — my inbox is always open.",
      namePlaceholder: "Your Name",
      emailPlaceholder: "your@email.com",
      messagePlaceholder: "Your message…",
      sendButton: "Send Message →",
      successTitle: "Message sent!",
      successBody: "I'll get back to you soon.",
      successReply: "Reply will be sent to",
    },

    footer: {
      backToTop: "↑ Back to top",
    },
  },

  // ─── Spanish ─────────────────────────────────────────────────────────────────
  es: {
    nav: {
      home: "inicio",
      about: "sobre mí",
      projects: "proyectos",
      skills: "habilidades",
      contact: "contacto",
    },

    langToggle: {
      ariaLabel: "Cambiar idioma",
      en: "EN",
      es: "ES",
    },

    hero: {
      title: "Desarrolladora Full-Stack",
      tagline:
        "Creo experiencias digitales que viven en la intersección del código limpio y el diseño reflexivo.",
      viewProjects: "Ver Proyectos →",
      github: "GitHub ↗",
      yearsExp: "Años de Experiencia",
      projectsShipped: "Proyectos Entregados",
    },

    about: {
      sectionLabel: "01 — Sobre Mí",
      headline: ["Convirtiendo problemas", "complejos en", "sistemas elegantes."],
      bio: "Soy una desarrolladora full-stack con más de 3 años de experiencia construyendo aplicaciones web escalables. Creo que el gran software se construye de forma iterativa, se prueba rigurosamente y se diseña con empatía. Cuando no estoy haciendo commits, exploro el arte generativo y contribuyo al código abierto.",
      philosophy:
        "El código es comunicación. Escribo para el desarrollador que viene después de mí, no solo para la máquina que lo ejecuta. Prefiero la arquitectura pragmática sobre las abstracciones ingeniosas, y el software funcional sobre los planes perfectos.",
    },

    projects: {
      sectionLabel: "02 — Proyectos",
      searchPlaceholder: "Buscar proyectos…",
      noResults: "Ningún proyecto coincide con tu búsqueda.",
      viewGallery: "Ver Galería →",
      all: "Todos",
      lightboxHint: "← → teclas de flecha · ESC para cerrar",
      descriptions: {
        1: "Desarrollé una plataforma de reclutamiento profesional para un cliente español enfocada en «Selección 2.0»: un enfoque moderno de contratación que combina tecnología avanzada, análisis de datos y experiencia humana para conectar empresas con el mejor talento.",
        2: "CollaTask es un SaaS conceptual diseñado para agilizar los sprints iterativos de equipos creativos y ágiles. Creado para equipos pequeños y medianos que encuentran las herramientas empresariales sobreingenieriadas y confusas, elimina el desorden para centrarse exclusivamente en la gestión visual de sprints de alta eficiencia.",
        3: "CLI para desarrolladores que genera arquitecturas de microservicios con configuraciones predeterminadas y manifiestos de Kubernetes.",
        4: "Desarrollé un sitio web B2B profesional para presentar componentes industriales y sistemas de automatización de alta calidad de marcas internacionales de confianza. La plataforma está diseñada para ayudar a clientes industriales a explorar soluciones fiables que garantizan rendimiento, eficiencia y valor operativo a largo plazo.",
        5: "Microservicio de autenticación de código abierto con OAuth 2.0, TOTP, passkeys y registro de auditoría incluidos.",
      },
    },

    skills: {
      sectionLabel: "03 — Habilidades",
      headline: "Las herramientas de mi oficio.",
      categories: {
        Frontend: "Frontend",
        Backend: "Backend",
        Databases: "Bases de Datos",
        DevOps: "DevOps",
        Tools: "Herramientas",
      },
    },

    contact: {
      sectionLabel: "04 — Contacto",
      headline: ["Construyamos", "algo", "notable."],
      subtext:
        "Ya sea una idea de producto, una colaboración o simplemente un saludo — mi bandeja de entrada siempre está abierta.",
      namePlaceholder: "Tu Nombre",
      emailPlaceholder: "tu@email.com",
      messagePlaceholder: "Tu mensaje…",
      sendButton: "Enviar Mensaje →",
      successTitle: "¡Mensaje enviado!",
      successBody: "Te responderé pronto.",
      successReply: "La respuesta será enviada a",
    },

    footer: {
      backToTop: "↑ Volver arriba",
    },
  },
};
