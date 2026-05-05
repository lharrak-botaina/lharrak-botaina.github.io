import { useState } from "react";
import emailjs from "@emailjs/browser";
import useInView from "../hooks/useInView";
import { ME, SectionLabel, bodyStyle, inputStyle, accent } from "../data/portfolio";
import { useLanguage } from "../i18n/LanguageContext";

const EMAILJS_SERVICE  = "service_j9wizu4";
const EMAILJS_TEMPLATE = "template_kduozwo";
const EMAILJS_KEY      = "rqCUNpmbyUZWCjQEF";

export default function Contact({ dark }) {
  const [ref, vis] = useInView();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState("");
  const ac = accent(dark);
  const { t } = useLanguage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError("");
    try {
      await emailjs.send(
        EMAILJS_SERVICE,
        EMAILJS_TEMPLATE,
        { from_name: form.name, from_email: form.email, message: form.message },
        EMAILJS_KEY
      );
      setSubmittedEmail(form.email);
      setSent(true);
      setForm({ name: "", email: "", message: "" });
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const socialLinks = [
    { icon: "📧", label: ME.email,                    href: `mailto:${ME.email}` },
    { icon: "🐙", label: ME.github,     href: ME.github },
    { icon: "💼", label: ME.linkedin, href: ME.linkedin },
  ];

  return (
    <section id="contact" ref={ref} style={{ padding: "8rem 2rem 6rem" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <SectionLabel dark={dark} label={t("contact.sectionLabel")} />

        <div
          className="contact-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "5rem",
            marginTop: "3rem",
          }}
        >
          {/* Left — copy + social links */}
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
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 900,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                color: dark ? "#FAFAF9" : "#0A0A0E",
                marginBottom: "1.5rem",
              }}
            >
              {t("contact.headline.0")}
              <br />
              {t("contact.headline.1")}
              <br />
              <span style={{ color: ac }}>{t("contact.headline.2")}</span>
            </h2>

            <p style={bodyStyle(dark)}>{t("contact.subtext")}</p>

            <div
              style={{
                marginTop: "2.5rem",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              {socialLinks.map(({ icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    textDecoration: "none",
                    transition: "all 0.2s",
                    width: "fit-content",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "translateX(4px)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "translateX(0)")}
                >
                  <span style={{ fontSize: "1.1rem" }}>{icon}</span>
                  <span
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "0.8rem",
                      letterSpacing: "0.04em",
                      color: dark ? "rgba(250,250,249,0.7)" : "rgba(10,10,14,0.7)",
                    }}
                  >
                    {label}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div
            style={{
              opacity: vis ? 1 : 0,
              transform: vis ? "translateX(0)" : "translateX(40px)",
              transition: "all 0.9s cubic-bezier(0.4,0,0.2,1) 0.15s",
            }}
          >
            {sent ? (
              <div
                style={{
                  padding: "3rem",
                  borderRadius: "8px",
                  textAlign: "center",
                  border: `1px solid ${dark ? "rgba(245,158,11,0.3)" : "rgba(180,83,9,0.2)"}`,
                  background: dark ? "rgba(245,158,11,0.06)" : "rgba(180,83,9,0.04)",
                }}
              >
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✉️</div>
                <p
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.3rem",
                    color: ac,
                    fontWeight: 700,
                  }}
                >
                  {t("contact.successTitle")}
                </p>
                <p style={bodyStyle(dark)}>{t("contact.successBody")}</p>
                <p
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "0.8rem",
                    letterSpacing: "0.04em",
                    color: dark ? "rgba(250,250,249,0.55)" : "rgba(10,10,14,0.55)",
                    marginTop: "0.5rem",
                  }}
                >
                  {t("contact.successReply")}{" "}
                  <span style={{ color: ac }}>{submittedEmail}</span>
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
              >
                {[
                  { name: "name",  placeholder: t("contact.namePlaceholder"),   type: "text" },
                  { name: "email", placeholder: t("contact.emailPlaceholder"),  type: "email" },
                ].map((f) => (
                  <input
                    key={f.name}
                    type={f.type}
                    placeholder={f.placeholder}
                    required
                    value={form[f.name]}
                    onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                    style={inputStyle(dark)}
                  />
                ))}

                <textarea
                  placeholder={t("contact.messagePlaceholder")}
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  style={{ ...inputStyle(dark), resize: "vertical" }}
                />

                {error && (
                  <p style={{ color: "#ef4444", fontFamily: "'DM Mono', monospace", fontSize: "0.8rem" }}>
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={sending}
                  style={{
                    padding: "14px 32px",
                    borderRadius: "4px",
                    background: sending ? (dark ? "rgba(245,158,11,0.4)" : "rgba(180,83,9,0.4)") : ac,
                    color: dark ? "#0A0A0E" : "#fff",
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "0.8rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    border: "none",
                    cursor: sending ? "not-allowed" : "pointer",
                    fontWeight: 600,
                    transition: "all 0.2s",
                    alignSelf: "flex-start",
                  }}
                  onMouseEnter={(e) => !sending && (e.target.style.transform = "translateY(-2px)")}
                  onMouseLeave={(e) => (e.target.style.transform = "translateY(0)")}
                >
                  {sending ? "Sending…" : t("contact.sendButton")}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
