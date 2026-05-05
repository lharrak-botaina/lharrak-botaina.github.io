// ─────────────────────────────────────────────────────────────────────────────
// src/data/portfolio.js
// All portfolio content lives here. Edit this file to personalise everything.
// ─────────────────────────────────────────────────────────────────────────────

export const ME = {
  img :'/public/img/me.jpeg', // Swap this for your photo!
  name: "Botaina lharrak",
  title: "Full-Stack Developer",
  tagline:
    "I craft digital experiences that live at the intersection of clean code and thoughtful design.",
  bio: `I'm a full-stack developer with 3+ years of experience building scalable web applications. I believe great software is built iteratively, tested rigorously, and designed with empathy. When I'm not pushing commits, I'm exploring generative art and contributing to open source.`,
  philosophy: `Code is communication. I write for the developer who comes after me, not just the machine that runs it. I favor pragmatic architecture over clever abstractions, and ship working software over perfect plans.`,
  email: "lharrak.botaina@gmail.com",
  github: "https://github.com/lharrak-botaina",
  linkedin: "https://ma.linkedin.com/in/botaina-lharrak-09021723a",

};

// ─── MEDIA TYPES ─────────────────────────────────────────────────────────────
// Each project's `media` array accepts any mix of:
//   { type: "image",   url: "https://…",         caption: "Dashboard view" }
//   { type: "video",   url: "https://…/clip.mp4", caption: "Demo walkthrough" }
//   { type: "youtube", id:  "dQw4w9WgXcQ",        caption: "Full demo on YouTube" }

export const PROJECTS = [
  {
    id: 1,
    name: "Selectalent",
    description:
      "Developed a professional recruitment platform for a Spanish client focused on “Selección 2.0” — a modern hiring approach that combines advanced technology, data analysis, and human expertise to connect companies with top talent.",
    tech: ["symfony", "Node.js", "MySQL", "ApiPlatform ", "Tailwind CSS", "nuxt.js"],
    demo: "https://selectalent.es/",
    repo: "https://selectalent.es/",
    color: "#3ca6ec",
    
    media: [
      {
        type: "image",
        url: "img/selectalent.jpeg",
        caption: "Homepage & product feed",
      },
      {
        type: "image",
        url: "img/selectalent-app.jpeg",
        caption: "Checkout flow",
      },
    ],
  },
  {
    id: 2,
    name: "Collatask",
    description:
      "CollaTask is a conceptual SaaS designed to streamline iterative sprints for creative and agile teams. Built for small-to-medium teams who find enterprise tools over-engineered and confusing, it eliminates clutter to focus exclusively on visual, high-efficiency sprint management.",
    tech: ["angular", "symfony", "MongoDB", "Tailwind",],
    demo: "https://github.com/lharrak-botaina",
    repo: "https://github.com/lharrak-botaina",
    color: "#10B981",
    
    media: [
      {
        type: "image",
        url: "img/Collatask.jpeg",
        caption: "Kanban board view",
      },
      
    ],
  },
  {
    id: 3,
    name: "Cabinet ORL TANGER Dr Benyacine Haytem",
    description:
      "Developer CLI for scaffolding microservice architectures with opinionated defaults and Kubernetes manifests.",
    tech: ["Node.js", "Docker", "Kubernetes", "Go"],
    demo: "https://www.orltanger.com/",
    repo: "https://www.orltanger.com/",
    color: "#6366F1",
    emoji: "⚡",
    media: [
      {
        type: "image",
        url: "img/ORLTanger.png",
        caption: "Terminal scaffold output",
      },
    ],
  },
  {
    id: 4,
    name: "Rislec",
    description:
      "Developed a professional B2B website to showcase high-quality industrial components and automation systems from trusted international brands. The platform is designed to help industrial clients explore reliable solutions that ensure performance, efficiency, and long-term operational value.",
    tech: ["WordPress", "Google Business", "SEO", "Content Strategy", "UI/UX Design"],
    demo: "https://rislec.com/fr/accueil/",
    repo: "https://rislec.com/fr/accueil/",
    color: "#7cc038",
   
    media: [
      {
        type: "image",
        url: "img/rislec-website.jpeg",
        caption: "Main analytics dashboard",
      },
      {
        type: "image",
        url: "img/rislec.jpeg",
        caption: "Drill-down report view",
      },
    ],
  },
  {
    id: 5,
    name: "ARB HOME",
    description:
      "Open-source authentication microservice with OAuth 2.0, TOTP, passkeys, and audit logging out of the box.",
    tech: ["Node.js", "MySQL", "nuxt.js", "symfony", "Tailwind CSS","api platform","vue.js","figma"],
    demo: "https://arbhome.es/",
    repo: "https://arbhome.es/",
    color: "#0a2d55",
    emoji: "🔐",
    media: [
      {
        type: "image",
        url: "img/arbhome.png",
        caption: "homepage and services overview",
      },
      {
        type: "image",
        url: "img/arbhomeBackoffice.png",
        caption: "Backoffice dashboard",
      },
    ],
  },
  // {
  //   id: 6,
  //   name: "Terrarium",
  //   description:
  //     "Browser-based WebGL ecosystem simulator where procedural creatures evolve using neural networks.",
  //   tech: ["React", "WebGL", "TensorFlow.js"],
  //   demo: "https://example.com",
  //   repo: "https://github.com",
  //   color: "#F97316",
  //   emoji: "🌿",
  //   media: [
  //     {
  //       type: "image",
  //       url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80",
  //       caption: "Simulation in progress",
  //     },
  //     { type: "youtube", id: "dQw4w9WgXcQ", caption: "Evolution timelapse demo" },
  //   ],
  // },
];

export const SKILLS = {
  Frontend: ["React", "Next.js", "Vue.js", "TypeScript", "Tailwind CSS",  "UI/UX Design"],
  Backend: ["Node.js",  "Nuxt.js", "Symfony","laravel", "REST APIs", "API Platform", "OAuth 2.0"],
  Databases: ["PostgreSQL", "MongoDB", "Redis", "MySQL"],
  DevOps: ["Docker", "CI/CD", "Nginx", "GitHub Actions"],
  Tools: ["Git/GitHub","Gitlab" ,"bitbucket", "Figma", "Postman", "Jira"],
};

export const ALL_TECH = [...new Set(PROJECTS.flatMap((p) => p.tech))].sort();

// ─── SHARED STYLE HELPERS ────────────────────────────────────────────────────

export const bodyStyle = (dark) => ({
  fontFamily: "'Crimson Pro', Georgia, serif",
  fontSize: "1.1rem",
  lineHeight: 1.75,
  color: dark ? "rgba(250,250,249,0.65)" : "rgba(10,10,14,0.65)",
  margin: "0 0 1rem",
});

export const inputStyle = (dark) => ({
  padding: "12px 16px",
  borderRadius: "4px",
  background: dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
  border: `1px solid ${dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
  color: dark ? "#FAFAF9" : "#0A0A0E",
  fontFamily: "'Crimson Pro', Georgia, serif",
  fontSize: "1rem",
  outline: "none",
  width: "100%",
  boxSizing: "border-box",
  transition: "border-color 0.2s",
});

export const iconLinkStyle = (dark) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "30px",
  height: "30px",
  borderRadius: "4px",
  border: `1px solid ${dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
  color: dark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)",
  textDecoration: "none",
  fontSize: "0.9rem",
  transition: "all 0.2s",
});

export const accent = (dark) => (dark ? "#7b7450" : "#6b6560");

export function SectionLabel({ dark, label }) {
  return (
    <p
      style={{
        fontFamily: "'DM Mono', monospace",
        fontSize: "0.72rem",
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        color: dark ? "rgba(245,158,11,0.7)" : "rgba(10,10,14,0.38)",
        marginBottom: "0.5rem",
      }}
    >
      {label}
    </p>
  );
}
