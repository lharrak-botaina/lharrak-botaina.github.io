import { useState, useEffect } from "react";
import useScrollSpy from "../hooks/useScrollSpy";
import { accent } from "../data/portfolio";

const LINKS = ["home", "about", "projects", "skills", "contact"];

export default function Nav({ dark, setDark }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useScrollSpy(LINKS);
  const ac = accent(dark);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
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
        AR
      </button>

      {/* Desktop links */}
      <ul
        className="nav-desktop"
        style={{ display: "flex", gap: "2rem", listStyle: "none", margin: 0, padding: 0 }}
      >
        {LINKS.map((l) => (
          <li key={l}>
            <button
              onClick={() => scrollTo(l)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.75rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color:
                  active === l
                    ? ac
                    : dark
                    ? "rgba(255,255,255,0.5)"
                    : "rgba(0,0,0,0.5)",
                transition: "color 0.2s",
                padding: "4px 0",
                borderBottom:
                  active === l ? `1px solid ${ac}` : "1px solid transparent",
              }}
            >
              {l}
            </button>
          </li>
        ))}
      </ul>

      {/* Right controls */}
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
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
          {LINKS.map((l) => (
            <button
              key={l}
              onClick={() => scrollTo(l)}
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
                  active === l
                    ? ac
                    : dark
                    ? "rgba(255,255,255,0.7)"
                    : "rgba(0,0,0,0.7)",
              }}
            >
              {l}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
