// ─────────────────────────────────────────────────────────────────────────────
// src/data/portfolio.js
// All portfolio content lives here. Edit this file to personalise everything.
// ─────────────────────────────────────────────────────────────────────────────

export const ME = {
  name: "Alex Rivera",
  title: "Full-Stack Developer",
  tagline:
    "I craft digital experiences that live at the intersection of clean code and thoughtful design.",
  bio: `I'm a full-stack developer with 5+ years of experience building scalable web applications. I believe great software is built iteratively, tested rigorously, and designed with empathy. When I'm not pushing commits, I'm exploring generative art and contributing to open source.`,
  philosophy: `Code is communication. I write for the developer who comes after me, not just the machine that runs it. I favor pragmatic architecture over clever abstractions, and ship working software over perfect plans.`,
  email: "alex@example.com",
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  twitter: "https://twitter.com",
};

// ─── MEDIA TYPES ─────────────────────────────────────────────────────────────
// Each project's `media` array accepts any mix of:
//   { type: "image",   url: "https://…",         caption: "Dashboard view" }
//   { type: "video",   url: "https://…/clip.mp4", caption: "Demo walkthrough" }
//   { type: "youtube", id:  "dQw4w9WgXcQ",        caption: "Full demo on YouTube" }

export const PROJECTS = [
  {
    id: 1,
    name: "NeuralCart",
    description:
      "AI-powered e-commerce platform with real-time personalization, A/B testing engine, and sub-50ms recommendation latency.",
    tech: ["React", "Node.js", "PostgreSQL", "Redis", "Docker"],
    demo: "https://example.com",
    repo: "https://github.com",
    color: "#F59E0B",
    emoji: "🛒",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80",
        caption: "Homepage & product feed",
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&q=80",
        caption: "Checkout flow",
      },
      { type: "youtube", id: "dQw4w9WgXcQ", caption: "Full product demo on YouTube" },
    ],
  },
  {
    id: 2,
    name: "FlowBoard",
    description:
      "Collaborative project management tool with live cursors, rich-text docs, and Gantt chart visualization.",
    tech: ["Next.js", "WebSockets", "MongoDB", "Tailwind"],
    demo: "https://example.com",
    repo: "https://github.com",
    color: "#10B981",
    emoji: "📋",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1200&q=80",
        caption: "Kanban board view",
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1540350394557-8d14678e7f91?w=1200&q=80",
        caption: "Gantt chart timeline",
      },
    ],
  },
  {
    id: 3,
    name: "Strata CLI",
    description:
      "Developer CLI for scaffolding microservice architectures with opinionated defaults and Kubernetes manifests.",
    tech: ["Node.js", "Docker", "Kubernetes", "Go"],
    demo: "https://example.com",
    repo: "https://github.com",
    color: "#6366F1",
    emoji: "⚡",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=1200&q=80",
        caption: "Terminal scaffold output",
      },
      { type: "video", url: "https://www.w3schools.com/html/mov_bbb.mp4", caption: "Live CLI demo" },
    ],
  },
  {
    id: 4,
    name: "PulseMetrics",
    description:
      "Real-time analytics dashboard ingesting 1M+ events/day with drill-down filtering and custom alerting.",
    tech: ["Vue.js", "Python", "Kafka", "ClickHouse"],
    demo: "https://example.com",
    repo: "https://github.com",
    color: "#EC4899",
    emoji: "📊",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
        caption: "Main analytics dashboard",
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1543286386-713bdd548da4?w=1200&q=80",
        caption: "Drill-down report view",
      },
    ],
  },
  {
    id: 5,
    name: "AuthForge",
    description:
      "Open-source authentication microservice with OAuth 2.0, TOTP, passkeys, and audit logging out of the box.",
    tech: ["Node.js", "PostgreSQL", "Redis", "Docker"],
    demo: "https://example.com",
    repo: "https://github.com",
    color: "#14B8A6",
    emoji: "🔐",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=1200&q=80",
        caption: "Login & MFA screen",
      },
    ],
  },
  {
    id: 6,
    name: "Terrarium",
    description:
      "Browser-based WebGL ecosystem simulator where procedural creatures evolve using neural networks.",
    tech: ["React", "WebGL", "TensorFlow.js"],
    demo: "https://example.com",
    repo: "https://github.com",
    color: "#F97316",
    emoji: "🌿",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80",
        caption: "Simulation in progress",
      },
      { type: "youtube", id: "dQw4w9WgXcQ", caption: "Evolution timelapse demo" },
    ],
  },
];

export const SKILLS = {
  Frontend: ["React", "Next.js", "Vue.js", "TypeScript", "WebGL", "Tailwind CSS", "Framer Motion", "GraphQL"],
  Backend: ["Node.js", "Python", "Go", "REST APIs", "WebSockets", "OAuth 2.0", "gRPC"],
  Databases: ["PostgreSQL", "MongoDB", "Redis", "ClickHouse", "Elasticsearch", "Prisma"],
  DevOps: ["Docker", "Kubernetes", "CI/CD", "AWS", "Terraform", "Nginx", "GitHub Actions"],
  Tools: ["Git", "Vim", "Figma", "Postman", "DataDog", "Linear"],
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

export const accent = (dark) => (dark ? "#F59E0B" : "#B45309");

export function SectionLabel({ dark, label }) {
  return (
    <p
      style={{
        fontFamily: "'DM Mono', monospace",
        fontSize: "0.72rem",
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        color: dark ? "rgba(245,158,11,0.7)" : "rgba(180,83,9,0.7)",
        marginBottom: "0.5rem",
      }}
    >
      {label}
    </p>
  );
}
