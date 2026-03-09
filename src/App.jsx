import { useState } from "react";
import Nav     from "./components/Nav";
import Hero    from "./components/Hero";
import About   from "./components/About";
import Projects from "./components/Projects";
import Skills  from "./components/Skills";
import Contact from "./components/Contact";
import { ME }  from "./data/portfolio";

function Footer({ dark }) {
  return (
    <footer
      style={{
        borderTop: `1px solid ${dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
        padding: "2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "1rem",
      }}
    >
      <span
        style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: "0.7rem",
          letterSpacing: "0.1em",
          color: dark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)",
        }}
      >
        © {new Date().getFullYear()} {ME.name} — Built with React + Vite
      </span>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: "0.7rem",
          letterSpacing: "0.1em",
          background: "none",
          border: "none",
          cursor: "pointer",
          color: dark ? "#F59E0B" : "#B45309",
        }}
      >
        ↑ Back to top
      </button>
    </footer>
  );
}

export default function App() {
  const [dark, setDark] = useState(true);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: dark ? "#0A0A0E" : "#FAFAF9",
        color: dark ? "#FAFAF9" : "#0A0A0E",
        transition: "background 0.4s, color 0.4s",
      }}
    >
      <Nav dark={dark} setDark={setDark} />
      <Hero    dark={dark} />
      <About   dark={dark} />
      <Projects dark={dark} />
      <Skills  dark={dark} />
      <Contact dark={dark} />
      <Footer  dark={dark} />
    </div>
  );
}
