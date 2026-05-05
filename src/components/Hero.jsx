import { useState, useEffect } from "react";
import { ME, accent } from "../data/portfolio";
import { useLanguage } from "../i18n/LanguageContext";

const PARTICLES = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  x: ((i * 6.18) % 95) + 2,
  y: ((i * 9.71) % 90) + 2,
  size: (i % 3) * 1.4 + 1.2,
  duration: 14 + (i % 6) * 3.5,
  delay: -(i * 2.3),
  opacity: 0.2 + (i % 4) * 0.12,
}));

function CountUp({ to, suffix = "", start = false, duration = 1400 }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf;
    const t0 = performance.now();
    const animate = (now) => {
      const p = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * to));
      if (p < 1) raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [to, start, duration]);
  return <>{val}{suffix}</>;
}

export default function Hero({ dark }) {
  const [vis, setVis] = useState(false);
  useEffect(() => { setTimeout(() => setVis(true), 100); }, []);
  const ac = accent(dark);
  const { t } = useLanguage();

  const tagline = t("hero.tagline");
  const [typed, setTyped] = useState("");
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    if (!vis) return;
    setTyped("");
    setShowCursor(false);
    const startDelay = setTimeout(() => {
      setShowCursor(true);
      let i = 0;
      const iv = setInterval(() => {
        i++;
        setTyped(tagline.slice(0, i));
        if (i >= tagline.length) {
          clearInterval(iv);
          setTimeout(() => setShowCursor(false), 2000);
        }
      }, 22);
      return () => clearInterval(iv);
    }, 750);
    return () => clearTimeout(startDelay);
  }, [vis, tagline]);

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
      {/* Floating particles */}
      <style>{`
        @keyframes floatParticle {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          33%       { transform: translateY(-28px) translateX(14px); }
          66%       { transform: translateY(18px) translateX(-10px); }
        }
      `}</style>
      {PARTICLES.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: "50%",
            background: ac,
            opacity: p.opacity,
            animation: `floatParticle ${p.duration}s ease-in-out ${p.delay}s infinite`,
            zIndex: 0,
            pointerEvents: "none",
          }}
        />
      ))}

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
            ? "radial-gradient(circle, rgba(204, 199, 175,0.3) 0%, transparent 70%)"
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
          }}
        >
          {ME.name.split("").map((char, i) => (
            <span
              key={i}
              style={{
                display: "inline-block",
                whiteSpace: char === " " ? "pre" : undefined,
                opacity: vis ? 1 : 0,
                transform: vis ? "translateY(0)" : "translateY(55px)",
                transition: `opacity 0.5s ${0.15 + i * 0.042}s, transform 0.65s cubic-bezier(0.4,0,0.2,1) ${0.15 + i * 0.042}s`,
              }}
            >
              {char}
            </span>
          ))}
          <br />
          <span
            style={{
              background: dark
                ? "linear-gradient(90deg, #7b7450, #ccc7a0, #a39e85, #7b7450)"
                : "linear-gradient(90deg, #6b6560, #a39e85, #7b7450, #6b6560)",
              backgroundSize: "250% 100%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              display: "inline-block",
              opacity: vis ? 1 : 0,
              transition: "opacity 0.7s 0.85s",
              animationName: vis ? "gradientShift" : "none",
              animationDuration: "5s",
              animationTimingFunction: "linear",
              animationIterationCount: "infinite",
            }}
          >
            {t("hero.title")}
          </span>
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
            transition: "opacity 0.5s 0.3s, transform 0.8s cubic-bezier(0.4,0,0.2,1) 0.3s",
            minHeight: "2.4em",
          }}
        >
          {typed}
          {showCursor && (
            <span
              style={{
                display: "inline-block",
                width: "2px",
                height: "0.9em",
                background: ac,
                marginLeft: "2px",
                verticalAlign: "text-bottom",
                animation: "blink 0.75s step-start infinite",
              }}
            />
          )}
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
              position: "relative",
              overflow: "hidden",
              boxShadow: dark
                ? "0 0 30px rgba(245,158,11,0.25)"
                : "0 4px 20px rgba(180,83,9,0.3)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
          >
            <span
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "55px",
                height: "100%",
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                transform: "skewX(-18deg)",
                animation: "shimmerBtn 3.5s ease-in-out 1.5s infinite",
                pointerEvents: "none",
              }}
            />
            {t("hero.viewProjects")}
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
            {t("hero.github")}
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
            [3, "+", t("hero.yearsExp")],
            [10, "+", t("hero.projectsShipped")],
          ].map(([n, suffix, l]) => (
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
                <CountUp to={n} suffix={suffix} start={vis} duration={1600} />
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
