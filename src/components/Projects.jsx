import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import useInView from "../hooks/useInView";
import { PROJECTS, ALL_TECH, SectionLabel, iconLinkStyle, accent } from "../data/portfolio";
import { useLanguage } from "../i18n/LanguageContext";

// ─── LIGHTBOX ────────────────────────────────────────────────────────────────

const lbBtn = {
  padding: "6px 13px",
  borderRadius: "4px",
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.12)",
  color: "rgba(255,255,255,0.72)",
  fontFamily: "'DM Mono', monospace",
  fontSize: "0.68rem",
  letterSpacing: "0.06em",
  cursor: "pointer",
  textDecoration: "none",
  display: "inline-flex",
  alignItems: "center",
  transition: "all 0.18s",
};

function MediaLightbox({ project, startIndex = 0, onClose, t }) {
  const [index, setIndex] = useState(startIndex);
  const media    = project.media || [];
  const cur      = media[index];
  const videoRef = useRef(null);

  const prev = useCallback(
    () => setIndex((i) => (i - 1 + media.length) % media.length),
    [media.length]
  );
  const next = useCallback(
    () => setIndex((i) => (i + 1) % media.length),
    [media.length]
  );

  useEffect(() => {
    const h = (e) => {
      if (e.key === "Escape")     onClose();
      if (e.key === "ArrowLeft")  prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose, prev, next]);

  useEffect(() => { videoRef.current?.pause(); }, [index]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  if (!cur) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(0,0,0,0.93)",
        backdropFilter: "blur(14px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        animation: "lbFadeIn 0.22s ease",
      }}
    >
      {/* Top bar */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: "960px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "0.85rem",
          padding: "0 2px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ fontSize: "1.5rem" }}>{project.emoji}</span>
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem", fontWeight: 700, color: "#FAFAF9" }}>
              {project.name}
            </div>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginTop: "2px" }}>
              {index + 1} / {media.length} &nbsp;·&nbsp;
              {cur.type === "youtube" ? "YouTube" : cur.type === "video" ? "Video" : "Image"}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <a href={project.demo} target="_blank" rel="noopener noreferrer" style={lbBtn}>↗ Demo</a>
          <a href={project.repo} target="_blank" rel="noopener noreferrer" style={lbBtn}>⌥ Repo</a>
          <button onClick={onClose} style={{ ...lbBtn, background: "rgba(255,255,255,0.1)" }}>✕</button>
        </div>
      </div>

      {/* Main viewer */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "960px",
          borderRadius: "10px",
          overflow: "hidden",
          background: "#000",
          border: `1px solid ${project.color}35`,
          boxShadow: `0 0 80px ${project.color}28`,
          aspectRatio: cur.type !== "image" ? "16/9" : undefined,
          maxHeight: "62vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {cur.type === "image" && (
          <img
            src={cur.url}
            alt={cur.caption || ""}
            style={{ width: "100%", maxHeight: "62vh", objectFit: "contain", display: "block" }}
          />
        )}

        {cur.type === "video" && (
          <video
            ref={videoRef}
            src={cur.url}
            controls
            autoPlay
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        )}

        {cur.type === "youtube" && (
          <iframe
            src={`https://www.youtube.com/embed/${cur.id}?autoplay=1&rel=0`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ width: "100%", height: "100%", border: "none", display: "block" }}
          />
        )}

        {/* Arrows */}
        {media.length > 1 && (
          <>
            {[
              { side: "left",  symbol: "‹", fn: prev },
              { side: "right", symbol: "›", fn: next },
            ].map(({ side, symbol, fn }) => (
              <button
                key={side}
                onClick={fn}
                style={{
                  position: "absolute",
                  [side]: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  background: "rgba(0,0,0,0.6)",
                  border: "1px solid rgba(255,255,255,0.18)",
                  color: "#fff",
                  fontSize: "1.4rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backdropFilter: "blur(6px)",
                  transition: "background 0.2s",
                  zIndex: 5,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = project.color + "bb")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.6)")}
              >
                {symbol}
              </button>
            ))}
          </>
        )}
      </div>

      {/* Caption */}
      {cur.caption && (
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            marginTop: "0.65rem",
            maxWidth: "960px",
            width: "100%",
            textAlign: "center",
            fontFamily: "'Crimson Pro', Georgia, serif",
            fontSize: "0.95rem",
            color: "rgba(255,255,255,0.45)",
            fontStyle: "italic",
          }}
        >
          {cur.caption}
        </div>
      )}

      {/* Thumbnail strip */}
      {media.length > 1 && (
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            display: "flex",
            gap: "8px",
            marginTop: "0.9rem",
            maxWidth: "960px",
            width: "100%",
            overflowX: "auto",
            padding: "4px 2px",
          }}
        >
          {media.map((m, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              style={{
                flexShrink: 0,
                width: "76px",
                height: "52px",
                borderRadius: "6px",
                overflow: "hidden",
                padding: 0,
                cursor: "pointer",
                border: `2px solid ${i === index ? project.color : "rgba(255,255,255,0.1)"}`,
                background: "#111",
                transition: "all 0.2s",
                opacity: i === index ? 1 : 0.5,
                position: "relative",
              }}
              onMouseEnter={(e) => { if (i !== index) e.currentTarget.style.opacity = "0.85"; }}
              onMouseLeave={(e) => { if (i !== index) e.currentTarget.style.opacity = "0.5"; }}
            >
              {m.type === "image" && (
                <img src={m.url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              )}
              {m.type === "video" && (
                <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg,#1a1a2e,#16213e)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.7)", fontSize: "1.1rem" }}>▶</div>
              )}
              {m.type === "youtube" && (
                <div style={{ width: "100%", height: "100%", background: `url(https://img.youtube.com/vi/${m.id}/mqdefault.jpg) center/cover`, position: "relative" }}>
                  <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.35)", fontSize: "0.9rem" }}>▶</div>
                </div>
              )}
            </button>
          ))}
        </div>
      )}

      {media.length > 1 && (
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            marginTop: "0.75rem",
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.6rem",
            letterSpacing: "0.1em",
            color: "rgba(255,255,255,0.2)",
          }}
        >
          {t("projects.lightboxHint")}
        </div>
      )}
    </div>
  );
}

// ─── PROJECT CARD ────────────────────────────────────────────────────────────

function ProjectCard({ project: p, dark, delay, visible, onOpenMedia, t }) {
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const dx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const dy = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    setTilt({ x: dy * -5, y: dx * 5 });
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setTilt({ x: 0, y: 0 });
  };
  const hasMedia = p.media?.length > 0;
  const first    = hasMedia ? p.media[0] : null;
  const hasVideo = hasMedia && p.media.some((m) => m.type !== "image");

  const thumbBg = first
    ? first.type === "image"
      ? `url(${first.url}) center/cover`
      : first.type === "youtube"
      ? `url(https://img.youtube.com/vi/${first.id}/mqdefault.jpg) center/cover`
      : `linear-gradient(135deg, ${p.color}30, #0a0a0e)`
    : dark
    ? "rgba(255,255,255,0.04)"
    : "rgba(0,0,0,0.04)";

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        borderRadius: "8px",
        overflow: "hidden",
        border: `1px solid ${hovered ? p.color + "55" : dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)"}`,
        background: dark
          ? hovered
            ? `linear-gradient(160deg, ${p.color}10, rgba(255,255,255,0.02))`
            : "rgba(255,255,255,0.025)"
          : hovered
          ? `linear-gradient(160deg, ${p.color}09, rgba(0,0,0,0.01))`
          : "rgba(0,0,0,0.015)",
        transition: hovered
          ? "border-color 0.3s, background 0.3s, box-shadow 0.3s, opacity 0.5s"
          : "all 0.5s cubic-bezier(0.4,0,0.2,1)",
        transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(${hovered ? -4 : 0}px)`,
        boxShadow: hovered ? `0 20px 40px ${p.color}22` : "none",
        opacity: visible ? 1 : 0,
        transitionDelay: visible ? `${delay}ms` : "0ms",
        willChange: "transform",
      }}
    >
      {/* Media preview */}
      {hasMedia && (
        <div
          onClick={() => onOpenMedia(0)}
          style={{
            height: "170px",
            cursor: "pointer",
            background: thumbBg,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {first.type === "video" && (
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "3.5rem" }}>
              {p.emoji}
            </div>
          )}

          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 35%, rgba(0,0,0,0.65) 100%)" }} />

          {hasVideo && (
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "46px", height: "46px", borderRadius: "50%", background: "rgba(0,0,0,0.6)", border: "2px solid rgba(255,255,255,0.65)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "1.1rem", zIndex: 2, backdropFilter: "blur(4px)" }}>▶</div>
          )}

          {p.media.length > 1 && (
            <div style={{ position: "absolute", bottom: "10px", right: "10px", zIndex: 3, fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.06em", background: "rgba(0,0,0,0.65)", color: "rgba(255,255,255,0.85)", padding: "3px 9px", borderRadius: "100px", backdropFilter: "blur(4px)" }}>
              {hasVideo ? "▶" : "⊞"} {p.media.length}
            </div>
          )}

          <div style={{ position: "absolute", inset: 0, zIndex: 2, display: "flex", alignItems: "center", justifyContent: "center", background: hovered ? `${p.color}22` : "transparent", transition: "background 0.3s" }}>
            {hovered && !hasVideo && (
              <div style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: "6px", padding: "7px 16px", color: "#fff", fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.1em" }}>
                {t("projects.viewGallery")}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Card body */}
      <div style={{ padding: "1.4rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.8rem" }}>
          <span style={{ fontSize: "1.7rem", lineHeight: 1 }}>{p.emoji}</span>
          <div style={{ display: "flex", gap: "0.4rem", alignItems: "center" }}>
            {hasMedia && (
              <button
                onClick={() => onOpenMedia(0)}
                style={{
                  padding: "4px 10px",
                  borderRadius: "4px",
                  background: dark ? `${p.color}20` : `${p.color}15`,
                  border: `1px solid ${p.color}45`,
                  color: p.color,
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.6rem",
                  letterSpacing: "0.06em",
                  cursor: "pointer",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = `${p.color}38`)}
                onMouseLeave={(e) => (e.currentTarget.style.background = dark ? `${p.color}20` : `${p.color}15`)}
              >
                {hasVideo ? "▶ Preview" : "⊞ Gallery"}
              </button>
            )}
            <a href={p.demo} target="_blank" rel="noopener noreferrer" style={iconLinkStyle(dark)}>↗</a>
            <a href={p.repo} target="_blank" rel="noopener noreferrer" style={iconLinkStyle(dark)}>⌥</a>
          </div>
        </div>

        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", fontWeight: 700, letterSpacing: "-0.01em", color: dark ? "#FAFAF9" : "#0A0A0E", marginBottom: "0.6rem" }}>
          {p.name}
        </h3>

        <p style={{ fontFamily: "'Crimson Pro', Georgia, serif", fontSize: "0.96rem", lineHeight: 1.65, color: dark ? "rgba(250,250,249,0.6)" : "rgba(10,10,14,0.6)", marginBottom: "1rem", minHeight: "3.2em" }}>
          {t(`projects.descriptions.${p.id}`) || p.description}
        </p>

        {/* Mini thumbnail strip */}
        {hasMedia && p.media.length > 1 && (
          <div style={{ display: "flex", gap: "5px", marginBottom: "1rem" }}>
            {p.media.slice(0, 5).map((m, i) => (
              <button
                key={i}
                onClick={() => onOpenMedia(i)}
                title={m.caption || ""}
                style={{
                  width: "36px",
                  height: "26px",
                  borderRadius: "3px",
                  border: `1px solid ${dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
                  overflow: "hidden",
                  padding: 0,
                  cursor: "pointer",
                  flexShrink: 0,
                  position: "relative",
                  transition: "transform 0.15s",
                  background:
                    m.type === "image"
                      ? `url(${m.url}) center/cover`
                      : m.type === "youtube"
                      ? `url(https://img.youtube.com/vi/${m.id}/mqdefault.jpg) center/cover`
                      : dark
                      ? "#1a1a2e"
                      : "#ddd",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.12)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                {(m.type === "video" || m.type === "youtube") && (
                  <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.45)", color: "#fff", fontSize: "0.55rem" }}>▶</div>
                )}
                {i === 4 && p.media.length > 5 && (
                  <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.6)", color: "#fff", fontFamily: "'DM Mono', monospace", fontSize: "0.55rem" }}>
                    +{p.media.length - 5}
                  </div>
                )}
              </button>
            ))}
          </div>
        )}

        {/* Tech chips */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
          {p.tech.map((t) => (
            <span
              key={t}
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.62rem",
                letterSpacing: "0.06em",
                padding: "3px 9px",
                borderRadius: "3px",
                background: dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
                color: dark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.55)",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── PROJECTS SECTION ────────────────────────────────────────────────────────

export default function Projects({ dark }) {
  const [filter,   setFilter]   = useState("All");
  const [search,   setSearch]   = useState("");
  const [lightbox, setLightbox] = useState(null);
  const [ref, vis] = useInView(0.05);
  const ac = accent(dark);
  const { t } = useLanguage();

  const filtered = PROJECTS.filter((p) => {
    const okTech   = filter === "All" || p.tech.includes(filter);
    const q        = search.toLowerCase();
    const okSearch =
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tech.some((t) => t.toLowerCase().includes(q));
    return okTech && okSearch;
  });

  return (
    <section id="projects" ref={ref} style={{ padding: "8rem 2rem" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <SectionLabel dark={dark} label={t("projects.sectionLabel")} />

        {/* Filter + search bar */}
        <div
          style={{
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "2.5rem",
            marginBottom: "2.5rem",
          }}
        >
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {["All", ...ALL_TECH].map((tech) => (
              <button
                key={tech}
                onClick={() => setFilter(tech)}
                style={{
                  padding: "6px 14px",
                  borderRadius: "100px",
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.68rem",
                  letterSpacing: "0.08em",
                  background: filter === tech ? ac : dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
                  color: filter === tech ? (dark ? "#0A0A0E" : "#fff") : dark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.18s",
                }}
              >
                {tech === "All" ? t("projects.all") : tech}
              </button>
            ))}
          </div>

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("projects.searchPlaceholder")}
            style={{
              padding: "8px 16px",
              borderRadius: "4px",
              background: dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
              border: `1px solid ${dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
              color: dark ? "#FAFAF9" : "#0A0A0E",
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.78rem",
              outline: "none",
              width: "220px",
            }}
          />
        </div>

        {/* Card grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {filtered.map((p, i) => (
            <ProjectCard
              key={p.id}
              project={p}
              dark={dark}
              delay={i * 60}
              visible={vis}
              onOpenMedia={(idx) => setLightbox({ project: p, index: idx })}
              t={t}
            />
          ))}
          {filtered.length === 0 && (
            <p
              style={{
                color: dark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)",
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.85rem",
              }}
            >
              {t("projects.noResults")}
            </p>
          )}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <MediaLightbox
          project={lightbox.project}
          startIndex={lightbox.index}
          onClose={() => setLightbox(null)}
          dark={dark}
          t={t}
        />
      )}
    </section>
  );
}
