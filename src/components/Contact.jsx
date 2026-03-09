import { useState } from "react";
import useInView from "../hooks/useInView";
import { ME, SectionLabel, bodyStyle, inputStyle, accent } from "../data/portfolio";

export default function Contact({ dark }) {
  const [ref, vis] = useInView();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const ac = accent(dark);

  const handleSubmit = (e) => {
    e.preventDefault();
    // ── Wire up a real email service here ──────────────────────────────────
    // Option A – Formspree:   fetch("https://formspree.io/f/YOUR_ID", { method:"POST", body: JSON.stringify(form) })
    // Option B – EmailJS:     emailjs.send("SERVICE_ID","TEMPLATE_ID", form, "PUBLIC_KEY")
    // Option C – Your own API endpoint
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: "", email: "", message: "" });
  };

  const socialLinks = [
    { icon: "📧", label: ME.email,                    href: `mailto:${ME.email}` },
    { icon: "🐙", label: "github.com/alexrivera",     href: ME.github },
    { icon: "💼", label: "linkedin.com/in/alexrivera", href: ME.linkedin },
  ];

  return (
    <section id="contact" ref={ref} style={{ padding: "8rem 2rem 6rem" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <SectionLabel dark={dark} label="04 — Contact" />

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
              Let's build
              <br />
              something
              <br />
              <span style={{ color: ac }}>remarkable.</span>
            </h2>

            <p style={bodyStyle(dark)}>
              Whether it's a product idea, collaboration, or just saying hello —
              my inbox is always open.
            </p>

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
                  Message sent!
                </p>
                <p style={bodyStyle(dark)}>I'll get back to you soon.</p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
              >
                {[
                  { name: "name",  placeholder: "Your Name",      type: "text" },
                  { name: "email", placeholder: "your@email.com", type: "email" },
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
                  placeholder="Your message…"
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  style={{ ...inputStyle(dark), resize: "vertical" }}
                />

                <button
                  type="submit"
                  style={{
                    padding: "14px 32px",
                    borderRadius: "4px",
                    background: ac,
                    color: dark ? "#0A0A0E" : "#fff",
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "0.8rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    border: "none",
                    cursor: "pointer",
                    fontWeight: 600,
                    transition: "all 0.2s",
                    alignSelf: "flex-start",
                  }}
                  onMouseEnter={(e) => (e.target.style.transform = "translateY(-2px)")}
                  onMouseLeave={(e) => (e.target.style.transform = "translateY(0)")}
                >
                  Send Message →
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
