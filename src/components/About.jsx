import useInView from "../hooks/useInView";
import { ME, SectionLabel, bodyStyle, accent } from "../data/portfolio";

export default function About({ dark }) {
  const [ref, vis] = useInView();
  const ac = accent(dark);

  return (
    <section
      id="about"
      ref={ref}
      style={{
        padding: "8rem 2rem",
        background: dark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <SectionLabel dark={dark} label="01 — About Me" />

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
          {/* Left — headline + avatar */}
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
              Turning complex
              <br />
              problems into
              <br />
              <span style={{ color: ac }}>elegant systems.</span>
            </h2>

            {/* Avatar placeholder — swap src for a real photo */}
            <div
              style={{
                width: "220px",
                height: "260px",
                borderRadius: "8px",
                background: dark
                  ? "linear-gradient(135deg, rgba(245,158,11,0.15), rgba(245,158,11,0.05))"
                  : "linear-gradient(135deg, rgba(180,83,9,0.1), rgba(180,83,9,0.03))",
                border: `1px solid ${dark ? "rgba(245,158,11,0.2)" : "rgba(180,83,9,0.15)"}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "5rem",
              }}
            >
              👨‍💻
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
            <p style={bodyStyle(dark)}>{ME.bio}</p>

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
                "{ME.philosophy}"
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
