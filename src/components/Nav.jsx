import { useState, useEffect } from "react";
import useScrollSpy from "../hooks/useScrollSpy";
import { accent } from "../data/portfolio";
import { useLanguage } from "../i18n/LanguageContext";

const LINK_IDS = ["home", "about", "projects", "skills", "contact"];

export default function Nav({ dark, setDark }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const active = useScrollSpy(LINK_IDS);
  const ac = accent(dark);
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    const h = () => {
      setScrolled(window.scrollY > 40);
      const total = document.body.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "0 2rem",
        height: "64px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: scrolled
          ? dark
            ? "rgba(10,10,14,0.92)"
            : "rgba(255,255,255,0.92)"
          : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled
          ? `1px solid ${dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`
          : "none",
        transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
      }}
    >
      {/* Logo */}
      <button
        onClick={() => scrollTo("home")}
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "1.25rem",
          fontWeight: 700,
          letterSpacing: "-0.02em",
          color: ac,
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 110 110" width="48" height="48" style={{ display: "block" }}>
          <rect x="0" y="0" width="110" height="110" rx="18" fill="rgba(0,0,0,0.06)"/>
          <rect x="1" y="1" width="108" height="108" rx="17" fill="none"
                stroke="#a39e85" strokeWidth="1.5" opacity="0.5"/>
          <path d="M30,18 L30,92 M30,18 A17,17 0 0 1 30,52
                   M30,52 A20,20 0 0 1 30,92 M30,92 L80,92"
                stroke="#7b7450" strokeWidth="8"
                strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        </svg>
      </button>

      {/* Desktop links */}
      <ul
        className="nav-desktop"
        style={{ display: "flex", gap: "2rem", listStyle: "none", margin: 0, padding: 0 }}
      >
        {LINK_IDS.map((id) => (
          <li key={id}>
            <button
              onClick={() => scrollTo(id)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.75rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color:
                  active === id
                    ? ac
                    : dark
                    ? "rgba(255,255,255,0.5)"
                    : "rgba(0,0,0,0.5)",
                transition: "color 0.2s",
                padding: "4px 0",
                borderBottom:
                  active === id ? `1px solid ${ac}` : "1px solid transparent",
              }}
            >
              {t(`nav.${id}`)}
            </button>
          </li>
        ))}
      </ul>

      {/* Right controls */}
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        {/* Language toggle */}
        <div
          role="group"
          aria-label={t("langToggle.ariaLabel")}
          style={{
            display: "flex",
            borderRadius: "50px",
            overflow: "hidden",
            border: `1px solid ${dark ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.14)"}`,
          }}
        >
          {["en", "es"].map((code) => (
            <button
              key={code}
              onClick={() => setLang(code)}
              lang={code}
              aria-pressed={lang === code}
              style={{
                background:
                  lang === code
                    ? ac
                    : dark
                    ? "rgba(255,255,255,0.06)"
                    : "rgba(0,0,0,0.04)",
                border: "none",
                padding: "5px 11px",
                cursor: lang === code ? "default" : "pointer",
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.65rem",
                letterSpacing: "0.1em",
                fontWeight: lang === code ? 700 : 400,
                color:
                  lang === code
                    ? dark ? "#0A0A0E" : "#fff"
                    : dark
                    ? "rgba(255,255,255,0.5)"
                    : "rgba(0,0,0,0.5)",
                transition: "all 0.2s",
              }}
            >
              {t(`langToggle.${code}`)}
            </button>
          ))}
        </div>

        <button
          onClick={() => setDark(!dark)}
          style={{
            background: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
            border: "none",
            borderRadius: "50px",
            padding: "6px 14px",
            cursor: "pointer",
            fontSize: "0.9rem",
            color: dark ? "#fff" : "#000",
            transition: "all 0.2s",
          }}
        >
          {dark ? "☀️" : "🌙"}
        </button>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="nav-mobile-btn"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: dark ? "#fff" : "#000",
            fontSize: "1.4rem",
            lineHeight: 1,
          }}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Scroll progress */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: "2px",
          width: `${progress}%`,
          background: `linear-gradient(90deg, ${ac}, ${ac}66)`,
          boxShadow: `0 0 6px ${ac}55`,
          transition: "width 0.08s linear",
          borderRadius: "0 1px 1px 0",
        }}
      />

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            top: 64,
            left: 0,
            right: 0,
            background: dark ? "#0A0A0E" : "#FAFAF9",
            borderBottom: `1px solid ${dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
            padding: "1.5rem 2rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
          }}
        >
          {LINK_IDS.map((id) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.85rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color:
                  active === id
                    ? ac
                    : dark
                    ? "rgba(255,255,255,0.7)"
                    : "rgba(0,0,0,0.7)",
              }}
            >
              {t(`nav.${id}`)}
            </button>
          ))}

          {/* Language switcher in mobile menu */}
          <div
            role="group"
            aria-label={t("langToggle.ariaLabel")}
            style={{ display: "flex", gap: "0.5rem", paddingTop: "0.5rem" }}
          >
            {["en", "es"].map((code) => (
              <button
                key={code}
                onClick={() => setLang(code)}
                lang={code}
                aria-pressed={lang === code}
                style={{
                  background:
                    lang === code
                      ? ac
                      : dark
                      ? "rgba(255,255,255,0.08)"
                      : "rgba(0,0,0,0.06)",
                  border: "none",
                  borderRadius: "4px",
                  padding: "6px 14px",
                  cursor: lang === code ? "default" : "pointer",
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.72rem",
                  letterSpacing: "0.1em",
                  fontWeight: lang === code ? 700 : 400,
                  color:
                    lang === code
                      ? dark ? "#0A0A0E" : "#fff"
                      : dark
                      ? "rgba(255,255,255,0.6)"
                      : "rgba(0,0,0,0.6)",
                  transition: "all 0.2s",
                }}
              >
                {t(`langToggle.${code}`)}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
