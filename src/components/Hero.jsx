import { useState, useEffect } from "react";
import { ME, accent } from "../data/portfolio";

export default function Hero({ dark }) {
  const [vis, setVis] = useState(false);
  useEffect(() => { setTimeout(() => setVis(true), 100); }, []);
  const ac = accent(dark);

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="home"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: "0 2rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Grid background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          backgroundImage: `
            linear-gradient(${dark ? "rgba(245,158,11,0.04)" : "rgba(180,83,9,0.04)"} 1px, transparent 1px),
            linear-gradient(90deg, ${dark ? "rgba(245,158,11,0.04)" : "rgba(180,83,9,0.04)"} 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 50%, black 40%, transparent 100%)",
        }}
      />

      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          right: "10%",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: dark
            ? "radial-gradient(circle, rgba(245,158,11,0.12) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(180,83,9,0.08) 0%, transparent 70%)",
          zIndex: 0,
        }}
      />

      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          width: "100%",
          position: "relative",
          zIndex: 1,
          paddingTop: "80px",
        }}
      >
        {/* Available badge */}
        <p
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.75rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: ac,
            marginBottom: "1.5rem",
            opacity: vis ? 1 : 0,
            transform: vis ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.7s cubic-bezier(0.4,0,0.2,1) 0.1s",
          }}
        >
          Available for work
        </p>

        {/* Name + title */}
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(3rem, 8vw, 7rem)",
            fontWeight: 900,
            lineHeight: 1.0,
            letterSpacing: "-0.03em",
            color: dark ? "#FAFAF9" : "#0A0A0E",
            margin: "0 0 1.5rem",
            opacity: vis ? 1 : 0,
            transform: vis ? "translateY(0)" : "translateY(40px)",
            transition: "all 0.8s cubic-bezier(0.4,0,0.2,1) 0.2s",
          }}
        >
          {ME.name}
          <br />
          <span style={{ color: ac }}>{ME.title}</span>
        </h1>

        {/* Tagline */}
        <p
          style={{
            fontFamily: "'Crimson Pro', Georgia, serif",
            fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
            lineHeight: 1.7,
            maxWidth: "600px",
            color: dark ? "rgba(250,250,249,0.65)" : "rgba(10,10,14,0.65)",
            marginBottom: "3rem",
            opacity: vis ? 1 : 0,
            transform: vis ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s cubic-bezier(0.4,0,0.2,1) 0.4s",
          }}
        >
          {ME.tagline}
        </p>

        {/* CTAs */}
        <div
          style={{
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
            opacity: vis ? 1 : 0,
            transition: "opacity 0.8s 0.55s",
          }}
        >
          <button
            onClick={() => scrollTo("projects")}
            style={{
              padding: "14px 32px",
              borderRadius: "4px",
              background: ac,
              color: dark ? "#0A0A0E" : "#FFF",
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.8rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              border: "none",
              cursor: "pointer",
              fontWeight: 600,
              transition: "all 0.2s",
              boxShadow: dark
                ? "0 0 30px rgba(245,158,11,0.25)"
                : "0 4px 20px rgba(180,83,9,0.3)",
            }}
            onMouseEnter={(e) => (e.target.style.transform = "translateY(-2px)")}
            onMouseLeave={(e) => (e.target.style.transform = "translateY(0)")}
          >
            View Projects →
          </button>

          <a
            href={ME.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: "14px 32px",
              borderRadius: "4px",
              background: "transparent",
              color: dark ? "rgba(250,250,249,0.8)" : "rgba(10,10,14,0.8)",
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.8rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              border: `1px solid ${dark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)"}`,
              cursor: "pointer",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              transition: "all 0.2s",
            }}
          >
            GitHub ↗
          </a>
        </div>

        {/* Stats */}
        <div
          style={{
            display: "flex",
            gap: "3rem",
            marginTop: "5rem",
            flexWrap: "wrap",
            opacity: vis ? 1 : 0,
            transition: "opacity 0.8s 0.8s",
          }}
        >
          {[
            ["5+", "Years of Experience"],
            ["30+", "Projects Shipped"],
            ["12", "Open Source Repos"],
          ].map(([n, l]) => (
            <div key={l}>
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "2.5rem",
                  fontWeight: 900,
                  color: ac,
                  lineHeight: 1,
                }}
              >
                {n}
              </div>
              <div
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.7rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: dark ? "rgba(250,250,249,0.4)" : "rgba(10,10,14,0.4)",
                  marginTop: "4px",
                }}
              >
                {l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
