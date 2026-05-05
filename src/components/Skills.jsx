import useInView from "../hooks/useInView";
import { SKILLS, SectionLabel, accent } from "../data/portfolio";
import { useLanguage } from "../i18n/LanguageContext";

export default function Skills({ dark }) {
  const [ref, vis] = useInView();
  const ac = accent(dark);
  const { t } = useLanguage();

  return (
    <section
      id="skills"
      ref={ref}
      style={{
        padding: "8rem 2rem",
        background: dark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <SectionLabel dark={dark} label={t("skills.sectionLabel")} />

        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
            fontWeight: 900,
            letterSpacing: "-0.02em",
            color: dark ? "#FAFAF9" : "#0A0A0E",
            margin: "1rem 0 3rem",
          }}
        >
          {t("skills.headline")}
        </h2>

        <style>{`
          .skill-chip {
            transition: all 0.18s ease;
            cursor: default;
          }
          .skill-chip:hover {
            transform: translateY(-2px);
            border-color: ${ac}66 !important;
            color: ${ac} !important;
            background: ${dark ? "rgba(123,116,80,0.14)" : "rgba(163,158,133,0.14)"} !important;
            box-shadow: 0 4px 14px ${ac}18;
          }
        `}</style>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {Object.entries(SKILLS).map(([cat, items], i) => (
            <div
              key={cat}
              style={{
                padding: "1.75rem",
                borderRadius: "8px",
                border: `1px solid ${dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)"}`,
                background: dark ? "rgba(255,255,255,0.025)" : "rgba(0,0,0,0.015)",
                opacity: vis ? 1 : 0,
                transform: vis ? "translateY(0)" : "translateY(30px)",
                transition: `all 0.7s cubic-bezier(0.4,0,0.2,1) ${i * 80}ms`,
              }}
            >
              {/* Category header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  marginBottom: "1.25rem",
                }}
              >
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: ac,
                    flexShrink: 0,
                  }}
                />
                <h3
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "0.75rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: ac,
                    margin: 0,
                  }}
                >
                  {t(`skills.categories.${cat}`) || cat}
                </h3>
              </div>

              {/* Skill chips */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {items.map((s) => (
                  <span
                    key={s}
                    className="skill-chip"
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "0.72rem",
                      letterSpacing: "0.04em",
                      padding: "5px 12px",
                      borderRadius: "4px",
                      background: dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
                      color: dark ? "rgba(250,250,249,0.8)" : "rgba(10,10,14,0.8)",
                      border: `1px solid ${dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
