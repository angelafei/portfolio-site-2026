"use client"
import { NAV_ITEMS, SKILLS, PROJECTS } from "../content/portfolio";
import Journey from "./journey";
import ProjectsCarousel from "./projects-carousel";
import { useState, useRef, useCallback } from "react";

// ── useSwipe ──────────────────────────────────────────────────────────────────
// Attach to any container ref. onLeft / onRight fire after a swipe ≥ threshold px.
function useSwipe(onLeft, onRight, threshold = 50) {
  const startX = useRef(null);

  const onTouchStart = useCallback((e) => {
    startX.current = e.touches[0].clientX;
  }, []);

  const onTouchEnd = useCallback((e) => {
    if (startX.current === null) return;
    const diff = startX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) >= threshold) {
      diff > 0 ? onLeft() : onRight();
    }
    startX.current = null;
  }, [onLeft, onRight, threshold]);

  return { onTouchStart, onTouchEnd };
}

// ── SHAPES data ────────────────────────────────────────────────────────────
const SHAPES = [
  { type: "ring",     x: 27, y: 38, size: 44, color: "#7ec8e3", delay: 0   },
  { type: "ring",     x: 58, y: 28, size: 34, color: "#7ec8e3", delay: 0.4 },
  { type: "ring",     x: 73, y: 62, size: 52, color: "#f9e784", delay: 0.2 },
  { type: "ring",     x: 36, y: 65, size: 28, color: "#f9e784", delay: 0.6 },
  { type: "ring",     x: 82, y: 42, size: 22, color: "#7ec8e3", delay: 0.8 },
  { type: "dot",      x: 42, y: 30, size: 9,  color: "#7ec8e3", delay: 0.3 },
  { type: "dot",      x: 65, y: 70, size: 12, color: "#f9e784", delay: 0.5 },
  { type: "dot",      x: 55, y: 45, size: 7,  color: "#f9e784", delay: 0.1 },
  { type: "dot",      x: 80, y: 30, size: 9,  color: "#f9e784", delay: 0.7 },
  { type: "dot",      x: 22, y: 58, size: 7,  color: "#7ec8e3", delay: 0.9 },
  { type: "star",     x: 46, y: 22, size: 13, color: "#f9e784", delay: 0.2 },
  { type: "star",     x: 76, y: 55, size: 9,  color: "#f9e784", delay: 0.6 },
  { type: "triangle", x: 30, y: 70, size: 13, color: "#f9e784", delay: 0.4 },
  { type: "triangle", x: 62, y: 55, size: 9,  color: "#7ec8e3", delay: 0.8 },
  { type: "triangle", x: 85, y: 68, size: 11, color: "#7ec8e3", delay: 0.3 },
  { type: "diamond",  x: 25, y: 42, size: 11, color: "#7ec8e3", delay: 0.5 },
  { type: "diamond",  x: 68, y: 35, size: 9,  color: "#f9e784", delay: 0.1 },
];

// ── BLOB CONFIGS ─────────────────────────────────────────────────────────────
// id 0 = giant hero blob (top-left), id 1 = mid (top-right),
// id 2 = small accent (bottom-left), id 3 = medium (bottom-right)
// Each blob gets its own named keyframe (blob0–blob3) so they morph
// independently. borderRadius values are kept in 44–62% range — no corner
// dips below ~42%, which is what eliminates the pointy/jagged look.
const BLOBS = [
  { id: 0, anchorX: -12, anchorY: -14, vwSize: 52, anim: "blob0", dur: 9,  delay: 0,   opacity: 0.88 },
  { id: 1, anchorX: 74,  anchorY: -8,  vwSize: 30, anim: "blob1", dur: 11, delay: 0.5, opacity: 0.78 },
  { id: 2, anchorX: 2,   anchorY: 68,  vwSize: 20, anim: "blob2", dur: 10, delay: 1.5, opacity: 0.72 },
  { id: 3, anchorX: 66,  anchorY: 58,  vwSize: 32, anim: "blob3", dur: 12, delay: 0.8, opacity: 0.80 },
];

// Parallax strength per blob
const PARALLAX = [0.016, 0.026, 0.022, 0.014];

// ── FloatingShape ───────────────────────────────────────────────────────────
function FloatingShape({ shape }) {
  const floatIdx = Math.floor(shape.delay * 10) % 3;
  const base = {
    position: "absolute",
    left: `${shape.x}%`,
    top:  `${shape.y}%`,
    opacity: 0.75,
    transform: "translateY(0px)",
    transition: `opacity 0.8s ease ${shape.delay}s, transform 0.8s ease ${shape.delay}s`,
    animation: `float${floatIdx} ${3.5 + shape.delay}s ease-in-out infinite`,
  };
  if (shape.type === "ring")
    return <div style={{ ...base, width: shape.size, height: shape.size, borderRadius: "50%", border: `${Math.max(2, shape.size * 0.16)}px solid ${shape.color}` }} />;
  if (shape.type === "dot")
    return <div style={{ ...base, width: shape.size, height: shape.size, borderRadius: "50%", background: shape.color }} />;
  if (shape.type === "star")
    return <div style={{ ...base, fontSize: shape.size + 3, color: shape.color, lineHeight: 1 }}>✦</div>;
  if (shape.type === "triangle")
    return <div style={{ ...base, width: 0, height: 0, borderLeft: `${shape.size * 0.6}px solid transparent`, borderRight: `${shape.size * 0.6}px solid transparent`, borderBottom: `${shape.size}px solid ${shape.color}` }} />;
  if (shape.type === "diamond")
    return <div style={{ ...base, width: shape.size, height: shape.size, background: shape.color, transform: "rotate(45deg)" }} />;
  return null;
}

// ── InteractiveBlob ─────────────────────────────────────────────────────────
// Renders ONE yellow blob. Position is driven by props so the parent can
// update all blobs from a single mousemove handler.
function InteractiveBlob({ blob, offsetX, offsetY, hovered, onEnter, onLeave }) {
  const scale     = hovered ? 1.06 : 1;
  const brightness= hovered ? 1.08 : 1;

  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        position: "absolute",
        // Convert anchorX/Y (% of viewport width) to actual pixels via vw units
        left:   `calc(${blob.anchorX}vw + ${offsetX}px)`,
        top:    `calc(${blob.anchorY}vh + ${offsetY}px)`,
        width:  `${blob.vwSize}vw`,
        height: `${blob.vwSize}vw`,   // square → perfect circle after border-radius
        maxWidth:  "min(60vw, 600px)",
        maxHeight: "min(60vw, 600px)",
        minWidth:  "120px",
        minHeight: "120px",
        background: "#f9e784",
        borderRadius: "50%",  // starting shape — keyframe takes over immediately
        opacity:  blob.opacity,
        animation: `${blob.anim} ${blob.dur}s ease-in-out ${blob.delay}s infinite`,
        transform: `scale(${scale})`,
        filter:    `brightness(${brightness})`,
        transition: "transform 0.55s cubic-bezier(0.34,1.56,0.64,1), filter 0.4s ease, background 0.4s ease",
        cursor: "pointer",
        willChange: "transform",
        zIndex: hovered ? 2 : 1,
      }}
    />
  );
}

// ── Main Page ────────────────────────────────────────────────────────────────
export default function Home() {
  const [skillIndex,    setSkillIndex]    = useState(0);
  const [mousePos,      setMousePos]      = useState({ x: 0, y: 0 });
  const [hoveredBlob,   setHoveredBlob]   = useState(null);
  const [menuOpen,      setMenuOpen]      = useState(false);

  const heroRef = useRef(null);


  const handleMouseMove = useCallback((e) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cx = e.clientX - rect.left - rect.width  / 2;
    const cy = e.clientY - rect.top  - rect.height / 2;
    setMousePos({ x: cx, y: cy });
  }, []);

  const scrollTo  = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" }); setMenuOpen(false);
  };
  const skillNext = useCallback(() => setSkillIndex(i => (i + 1) % SKILLS.length), []);
  const skillPrev = useCallback(() => setSkillIndex(i => (i - 1 + SKILLS.length) % SKILLS.length), []);
  const skillsSwipe = useSwipe(skillNext, skillPrev);

  return (
    <div style={{ fontFamily: "'DM Sans','Nunito',sans-serif", background: "#f8fcff", overflowX: "hidden" }}>


      {/* ── NAV ───────────────────────────────────────────────────────── */}
      <a className="skip-link" href="#main-content">Skip to content</a>
      <nav aria-label="Main navigation" style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        padding: "14px 24px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        background: "rgba(100,196,228,0.30)", backdropFilter: "blur(14px)",
      }}>
        <span style={{ fontFamily: "'DM Serif Display',serif", fontSize: 20, color: "white", letterSpacing: "0.01em", flexShrink: 0 }}>
          Angela Fei
        </span>

        {/* Desktop nav */}
        <div className="nav-desktop" style={{ display: "flex", gap: 28 }}>
          {NAV_ITEMS.map((item) => (
            item.toLowerCase() === 'contact' ?
            <a key={item} className="nav-link" href="mailto:future2931@gmail.com">{item}</a> :
            <a key={item} className="nav-link" href={`#${item === "About" ? "journey" : item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{item}</a>
          ))}
        </div>

        {/* Hamburger (mobile) */}
        <button type="button" className="hamburger" aria-label="Toggle navigation" aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(!menuOpen)}>
          <span style={{ transform: menuOpen ? "rotate(45deg) translate(5px,5px)" : "none" }} />
          <span style={{ opacity: menuOpen ? 0 : 1 }} />
          <span style={{ transform: menuOpen ? "rotate(-45deg) translate(5px,-5px)" : "none" }} />
        </button>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div id="mobile-navigation" className="nav-mobile-menu" onKeyDown={event => { if (event.key === "Escape") { setMenuOpen(false); event.currentTarget.previousElementSibling.focus(); } }}>
            {NAV_ITEMS.map((item) => (
              item.toLowerCase() === 'contact' ?
              <a key={item} className="nav-link" href="mailto:future2931@gmail.com">{item}</a> :
              <a key={item} className="nav-link" href={`#${item === "About" ? "journey" : item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{item}</a>
            ))}
          </div>
        )}
      </nav>

      <main id="main-content">
      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section
        id="hero"
        ref={heroRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
        style={{
          minHeight: "100vh",
          position: "relative",
          background: "linear-gradient(160deg,#8dd9ee 0%,#a8e4f5 45%,#b2e8ea 100%)",
          display: "flex", alignItems: "center", justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* Interactive yellow blobs */}
        {BLOBS.map((blob) => {
          const strength = PARALLAX[blob.id];
          return (
            <InteractiveBlob
              key={blob.id}
              blob={blob}
              offsetX={mousePos.x * strength}
              offsetY={mousePos.y * strength}
              hovered={hoveredBlob === blob.id}
              onEnter={() => setHoveredBlob(blob.id)}
              onLeave={() => setHoveredBlob(null)}
            />
          );
        })}

        {/* Floating geometric shapes */}
        {SHAPES.map((s, i) => <FloatingShape key={i} shape={s} />)}

        {/* Hero text */}
        <div style={{ textAlign: "center", position: "relative", zIndex: 10, padding: "0 24px" }}>
          <h1 style={{
            fontFamily: "'DM Serif Display',serif",
            fontSize: "clamp(36px,7vw,72px)",
            color: "white", fontWeight: 400, letterSpacing: "-0.01em",

            transition: "opacity 1s ease 0.3s, transform 1s ease 0.3s",
          }}>
            Hello, I&#39;m Angela Fei
          </h1>
          <p style={{
            marginTop: 16,
            fontSize: "clamp(15px,2vw,20px)",
            color: "rgba(255,255,255,0.9)", fontWeight: 300, letterSpacing: "0.04em",

            transition: "opacity 1s ease 0.55s, transform 1s ease 0.55s",
          }}>
            Front-end / Software Developer & Digital Experience Specialist
          </p>
          <div className="hero-btns" style={{
            marginTop: 32, display: "flex", gap: 14, justifyContent: "center",

            transition: "opacity 1s ease 0.75s",
          }}>
            <button onClick={() => scrollTo("portfolio")} style={{
              background: "white", color: "#5ab3d4", border: "none",
              borderRadius: 999, padding: "12px 28px",
              fontFamily: "inherit", fontSize: 15, fontWeight: 600, cursor: "pointer",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "none"}
            >View Work</button>
            <a href="mailto:future2931@gmail.com" style={{
              background: "transparent", color: "white",
              border: "2px solid rgba(255,255,255,0.7)",
              borderRadius: 999, padding: "12px 28px",
              fontFamily: "inherit", fontSize: 15, fontWeight: 600, cursor: "pointer",
              transition: "background 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.12)"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            >Get in Touch</a>
          </div>
        </div>

        {/* Blend the original hero into the journey section without a hard edge. */}
        <div aria-hidden="true" style={{
          position: "absolute", inset: "auto 0 0", height: 85, zIndex: 3,
          background: "linear-gradient(to bottom, transparent, #b2e8ea)",
          pointerEvents: "none",
        }} />

        {/* Scroll indicator */}
        <div style={{
          position: "absolute", bottom: 32, left: "50%", zIndex: 4,
          transform: "translateX(-50%)",
          textAlign: "center", color: "rgba(255,255,255,0.7)",
          fontSize: 10, letterSpacing: "0.2em", fontWeight: 500,
          animation: "scrollBounce 2s ease-in-out infinite",
          pointerEvents: "none",
        }}>
          <div>SCROLL</div>
          <div style={{ margin: "8px auto 0", width: 1, height: 40, background: "rgba(255,255,255,0.4)" }} />
        </div>
      </section>

      <Journey />

      {/* ── ABOUT ─────────────────────────────────────────────────────── */}
      <section id="about" style={{ padding: "90px 5% 72px", maxWidth: 1100, margin: "0 auto" }}>
        <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>

          {/* Text side */}
          <div>
            <p style={{ color: "#7ec8e3", fontWeight: 600, fontSize: 12, letterSpacing: "0.14em", marginBottom: 12, textTransform: "uppercase" }}>About Me</p>
            <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: "clamp(26px,4vw,42px)", color: "#2a5a70", fontWeight: 400, lineHeight: 1.25, marginBottom: 22 }}>
              Bridging design, code, <br /> and user experience.
            </h2>
            <p style={{ fontSize: 15, color: "#5a7a8a", lineHeight: 1.85, marginBottom: 14 }}>
              Hi there! I&#39;m a front-end / software and digital experience professional based in Taipei, with experience in website development, interactive design, SEO improvement, and user experience optimization.
            </p>
            <p style={{ fontSize: 15, color: "#5a7a8a", lineHeight: 1.85 }}>
              I enjoy creating user-friendly websites and digital experiences that are visually polished, easy to use, and aligned with both business goals and user needs.
            </p>
            <div style={{ display: "flex", gap: 28, marginTop: 32, flexWrap: "wrap" }}>
              {[["10+", "Years Exp."], ["20+", "Projects"], ["40+", "Countries Visited"]].map(([num, label]) => (
                <div key={label}>
                  <div style={{ fontFamily: "'DM Serif Display',serif", fontSize: 34, color: "#7ec8e3", lineHeight: 1 }}>{num}</div>
                  <div style={{ fontSize: 12, color: "#8aacba", marginTop: 4, fontWeight: 500 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Avatar side — fixed square so it stays circular on mobile */}
          <div
            className="about-avatar"
            style={{ position: "relative", width: "100%", maxWidth: 360 }}
          >
            {/* Square container → blob-shaped via borderRadius */}
            <div style={{
              width: "100%",
              paddingBottom: "100%",
              position: "relative",
              borderRadius: "42% 58% 55% 45%/45% 50% 50% 55%",
              background: "linear-gradient(135deg,#a8e4f5 0%,#c8f0ea 100%)",
              animation: "blobMove 8s ease-in-out infinite",
            }}>
              <div style={{
                position: "absolute", inset: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <div style={{
                  width: "62%", height: "62%",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.55)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <span style={{ fontFamily: "'DM Serif Display',serif", fontSize: "clamp(32px,6vw,52px)", color: "#7ec8e3" }}>AF</span>
                </div>
              </div>
            </div>

            {/* Decorative rings — vw-based size so they don't disappear on mobile */}
            <div style={{
              position: "absolute", top: "-6%", right: "-6%",
              width: "clamp(40px,8vw,60px)", height: "clamp(40px,8vw,60px)",
              borderRadius: "50%",
              border: "clamp(4px,1vw,7px) solid #f9e784",
              opacity: 0.85,
              animation: "float0 3s ease-in-out infinite",
            }} />
            <div style={{
              position: "absolute", bottom: "8%", left: "-6%",
              width: "clamp(24px,5vw,38px)", height: "clamp(24px,5vw,38px)",
              borderRadius: "50%",
              background: "#f9e784",
              opacity: 0.75,
              animation: "float1 4s ease-in-out infinite",
            }} />
            <div style={{
              position: "absolute", top: "38%", right: "-8%",
              width: "clamp(14px,3vw,22px)", height: "clamp(14px,3vw,22px)",
              borderRadius: "50%",
              background: "#7ec8e3",
              opacity: 0.6,
              animation: "float2 5s ease-in-out infinite 1s",
            }} />
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO ─────────────────────────────────────────────────── */}
      <section id="portfolio" style={{ padding: "72px 0 80px", background: "#eaf6fb" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 5%" }}>
          <p style={{ color: "#7ec8e3", fontWeight: 600, fontSize: 12, letterSpacing: "0.14em", marginBottom: 12, textTransform: "uppercase", textAlign: "center" }}>My Work</p>
          <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: "clamp(24px,3.5vw,38px)", color: "#2a5a70", fontWeight: 400, textAlign: "center", marginBottom: 44 }}>Selected Projects</h2>

          <ProjectsCarousel projects={PROJECTS} />
        </div>
      </section>

      {/* ── GRADIENT ────────────────────────────────────────────────────── */}


      {/* ── SKILLS ────────────────────────────────────────────────────── */}
      <section id="skills" style={{ padding: "0 0 80px", background: "#faf6d8", overflow: "hidden" }}>

        {/* Wave divider — blends portfolio's white/light-blue into skills' yellow */}
        <div style={{ lineHeight: 0, marginBottom: 0 }}>
          <svg viewBox="0 0 1440 88" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"
            style={{ display: "block", width: "100%", height: "clamp(48px,6vw,88px)" }}>
            <defs>
              <linearGradient id="waveGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#eaf6fb" />
                <stop offset="100%" stopColor="#f0f9ff" />
              </linearGradient>
            </defs>
            <path
              d="M0,0 C240,88 480,0 720,44 C960,88 1200,0 1440,44 L1440,0 L0,0 Z"
              fill="url(#waveGrad)"
            />
          </svg>
        </div>

        <div style={{ maxWidth: 1100, margin: "60px auto 0 auto", padding: "0 5%" }}>
          <p style={{ color: "#7ec8e3", fontWeight: 600, fontSize: 12, letterSpacing: "0.14em", marginBottom: 12, textTransform: "uppercase", textAlign: "center" }}>What I Do</p>
          <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: "clamp(24px,3.5vw,38px)", color: "#2a5a70", fontWeight: 400, textAlign: "center", marginBottom: 44 }}>Skills</h2>
        </div>

        {/* Carousel track — shows 3 cards on desktop, 1 on mobile */}
        <div className="skills-carousel" style={{ position: "relative" }}>

          {/* Prev button */}
          <button
            className="carousel-btn skills-prev"
            aria-label="Previous skill category"
            onClick={() => setSkillIndex(i => (i - 1 + SKILLS.length) % SKILLS.length)}
            style={{ position: "absolute", left: "clamp(8px,3vw,32px)", top: "50%", transform: "translateY(-50%)", zIndex: 10 }}
          >‹</button>

          {/* Sliding window */}
          <div {...skillsSwipe} className="skills-window">
            <div style={{
              display: "flex",
              gap: 20,
              transition: "transform 0.45s cubic-bezier(0.4,0,0.2,1)",
              transform: `translateX(calc(-${skillIndex} * (var(--skill-card-width) + 20px) + var(--skill-offset)))`,
              willChange: "transform",
            }}>
              {SKILLS.map((cat, i) => {
                const dist = Math.abs(((i - skillIndex) % SKILLS.length + SKILLS.length) % SKILLS.length);
                const isCurrent = dist === 0;
                const isAdj = dist === 1 || dist === SKILLS.length - 1;
                return (
                  <div
                    key={cat.category}
                    className="skills-card"
                    style={{
                      flexShrink: 0,
                      width: "var(--skill-card-width)",
                      background: "white",
                      borderRadius: 20,
                      border: isCurrent ? `2px solid ${cat.color}` : "1.5px solid #d8f0f8",
                      boxShadow: isCurrent ? `0 8px 32px ${cat.color}33` : "0 2px 12px rgba(126,200,227,0.06)",
                      opacity: isCurrent ? 1 : isAdj ? 0.7 : 0.35,
                      transform: isCurrent ? "scale(1.02)" : "scale(0.97)",
                      transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
                      userSelect: "none",
                    }}
                  >
                    {/* Header row */}
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>

                      <h3 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 18, color: "#2a5a70", fontWeight: 400, lineHeight: 1.2 }}>{cat.category}</h3>
                    </div>
                    {/* Tags */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                      {cat.items.map(item => (
                        <span key={item} style={{
                          fontSize: 13,
                          padding: "5px 13px",
                          borderRadius: 20,
                          background: cat.bg,
                          color: cat.color,
                          border: `1px solid ${cat.color}55`,
                          fontWeight: 500,
                          lineHeight: 1.4,
                          letterSpacing: "0.01em",
                          maxWidth: "100%",
                          overflowWrap: "anywhere",
                          WebkitFontSmoothing: "antialiased",
                        }}>{item}</span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Next button */}
          <button
            className="carousel-btn skills-next"
            aria-label="Next skill category"
            onClick={() => setSkillIndex(i => (i + 1) % SKILLS.length)}
            style={{ position: "absolute", right: "clamp(8px,3vw,32px)", top: "50%", transform: "translateY(-50%)", zIndex: 10 }}
          >›</button>
        </div>

        {/* Dot indicators */}
        <div style={{ display: "flex", justifyContent: "center", gap: 1, marginTop: 24 }}>
          {SKILLS.map((cat, i) => (
            <button
              type="button"
              aria-label={`Show ${cat.category} skills`}
              aria-current={skillIndex === i ? "true" : undefined}
              key={cat.category}
              onClick={() => setSkillIndex(i)}
              style={{
                width: 24,
                height: 24,
                padding: 0,
                border: 0,
                display: "grid",
                placeItems: "center",
                background: "transparent",
                cursor: "pointer",
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  display: "block",
                  width: skillIndex === i ? 22 : 7,
                  height: 7,
                  borderRadius: 4,
                  background: skillIndex === i ? SKILLS[skillIndex].color : "#c8e8f4",
                  transition: "width 0.3s ease, background 0.3s ease",
                }}
              />
            </button>
          ))}
        </div>
      </section>

      {/* ── CONTACT ───────────────────────────────────────────────────── */}


      </main>
      {/* ── FOOTER ────────────────────────────────────────────────────── */}
      <footer style={{ background: "#2a5a70", color: "rgba(255,255,255,0.6)", textAlign: "center", padding: "26px 24px", fontSize: 13 }}>

        <div>© 2026 Angela Fei · Crafted with care ✦</div>
      </footer>
    </div>
  );
}
