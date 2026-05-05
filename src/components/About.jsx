import useInView from "../hooks/useInView";
import { ME, SectionLabel, bodyStyle, accent } from "../data/portfolio";
import { useLanguage } from "../i18n/LanguageContext";

export default function About({ dark }) {
  const [ref, vis] = useInView();
  const ac = accent(dark);
  const { t } = useLanguage();

  return (
    <section
      id="about"
      ref={ref}
      style={{
        padding: "8rem 2rem",
        background: dark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)",
      }}
    >
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-12px); }
        }
        @keyframes accentPulse {
          0%, 100% { opacity: 0.45; transform: translate(12px, 12px); }
          50%       { opacity: 0.75; transform: translate(15px, 15px); }
        }
      `}</style>

      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <SectionLabel dark={dark} label={t("about.sectionLabel")} />

        <div
          className="about-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "5rem",
            marginTop: "3rem",
            alignItems: "start",
          }}
        >
          {/* Left — headline + photo */}
          <div
            style={{
              opacity: vis ? 1 : 0,
              transform: vis ? "translateX(0)" : "translateX(-40px)",
              transition: "all 0.9s cubic-bezier(0.4,0,0.2,1)",
            }}
          >
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                fontWeight: 900,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                color: dark ? "#FAFAF9" : "#0A0A0E",
                marginBottom: "2rem",
              }}
            >
              {t("about.headline.0")}
              <br />
              {t("about.headline.1")}
              <br />
              <span style={{ color: ac }}>{t("about.headline.2")}</span>
            </h2>

            {/* Photo with floating animation + accent frame */}
            <div style={{ position: "relative", width: "240px", height: "300px" }}>
              {/* Offset accent border */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "16px",
                  border: `2px solid ${ac}`,
                  animation: "accentPulse 4s ease-in-out infinite",
                  zIndex: 0,
                }}
              />

              {/* Image card */}
              <div
                style={{
                  position: "relative",
                  zIndex: 1,
                  borderRadius: "16px",
                  overflow: "hidden",
                  width: "240px",
                  height: "300px",
                  animation: "float 5s ease-in-out infinite",
                  boxShadow: dark
                    ? `0 24px 64px rgba(245,158,11,0.25), 0 8px 24px rgba(0,0,0,0.55)`
                    : `0 24px 64px rgba(180,83,9,0.2), 0 8px 24px rgba(0,0,0,0.14)`,
                }}
              >
                <img
                  src={ME.img}
                  alt="Botaina Lharrak"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    transition: "transform 0.5s cubic-bezier(0.4,0,0.2,1)",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.07)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                />
                {/* Gradient vignette */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: `linear-gradient(160deg, transparent 55%, ${
                      dark ? "rgba(5,5,10,0.5)" : "rgba(0,0,0,0.18)"
                    } 100%)`,
                    pointerEvents: "none",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Right — bio + links */}
          <div
            style={{
              opacity: vis ? 1 : 0,
              transform: vis ? "translateX(0)" : "translateX(40px)",
              transition: "all 0.9s cubic-bezier(0.4,0,0.2,1) 0.15s",
            }}
          >
            <p style={bodyStyle(dark)}>{t("about.bio")}</p>

            {/* Philosophy quote */}
            <div
              style={{
                margin: "2rem 0",
                padding: "1.5rem",
                borderLeft: `3px solid ${ac}`,
                background: dark ? "rgba(245,158,11,0.05)" : "rgba(180,83,9,0.04)",
                borderRadius: "0 6px 6px 0",
              }}
            >
              <p style={{ ...bodyStyle(dark), margin: 0, fontStyle: "italic" }}>
                "{t("about.philosophy")}"
              </p>
            </div>

            {/* Social links */}
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              {[
                { icon: "🐙", label: "GitHub",   href: ME.github },
                { icon: "💼", label: "LinkedIn",  href: ME.linkedin },
                { icon: "📧", label: ME.email,    href: `mailto:${ME.email}` },
              ].map(({ icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "10px 18px",
                    borderRadius: "4px",
                    border: `1px solid ${dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
                    color: dark ? "rgba(250,250,249,0.8)" : "rgba(10,10,14,0.8)",
                    textDecoration: "none",
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "0.72rem",
                    letterSpacing: "0.06em",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = ac;
                    e.currentTarget.style.color = ac;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = dark
                      ? "rgba(255,255,255,0.1)"
                      : "rgba(0,0,0,0.1)";
                    e.currentTarget.style.color = dark
                      ? "rgba(250,250,249,0.8)"
                      : "rgba(10,10,14,0.8)";
                  }}
                >
                  {icon} {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
