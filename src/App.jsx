import { useState, useEffect } from "react";
import Nav     from "./components/Nav";
import Hero    from "./components/Hero";
import About   from "./components/About";
import Projects from "./components/Projects";
import Skills  from "./components/Skills";
import Contact from "./components/Contact";
import { ME }  from "./data/portfolio";
import { LanguageProvider, useLanguage } from "./i18n/LanguageContext";
import { useGoogleAnalytics } from "./hooks/useGoogleAnalytics";

function CursorGlow({ dark }) {
  const [pos, setPos] = useState({ x: -1000, y: -1000 });
  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return (
    <div
      style={{
        position: "fixed",
        pointerEvents: "none",
        zIndex: 0,
        top: -350,
        left: -350,
        width: 700,
        height: 700,
        borderRadius: "50%",
        background: dark
          ? "radial-gradient(circle, rgba(123,116,80,0.07) 0%, transparent 60%)"
          : "radial-gradient(circle, rgba(107,101,96,0.06) 0%, transparent 60%)",
        transform: `translate(${pos.x}px, ${pos.y}px)`,
        transition: "transform 0.28s ease",
        willChange: "transform",
      }}
    />
  );
}

function Footer({ dark }) {
  const { t } = useLanguage();
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
        © {new Date().getFullYear()} {ME.name}
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
          color: dark ? "#7b7450" : "#a39e85",
        }}
      >
        {t("footer.backToTop")}
      </button>
    </footer>
  );
}

function AppInner() {
  const [dark, setDark] = useState(true);
  useGoogleAnalytics();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: dark ? "#0A0A0E" : "#FAFAF9",
        color: dark ? "#FAFAF9" : "#0A0A0E",
        transition: "background 0.4s, color 0.4s",
      }}
    >
      <CursorGlow dark={dark} />
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

export default function App() {
  return (
    <LanguageProvider>
      <AppInner />
    </LanguageProvider>
  );
}
