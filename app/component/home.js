"use client"
import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";

const imageLoader = ({ src, quality }) => {
  return `https://angelaf-portfolio.onrender.com/${src}?q=${quality || 75}`
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

const NAV_ITEMS  = ["About", "Portfolio", "Skills", "Contact"];
const SKILLS = [
  { category: "Frontend", color: "#7ec8e3", bg: "#e8f7ff", items: ["HTML5","CSS3","JavaScript","TypeScript","ReactJS","VueJS","AngularJS","Bootstrap","Tailwind","Sass","GraphQL","Responsive Design","Cross-browser Compatibility","Accessibility","Map Libraries","Chart Libraries","D3","FabricJS"], icon: "◇" },
  { category: "Backend", color: "#6abfa8", bg: "#e2f5f0", items: ["NodeJS","PHP","Python","REST API","Apps Script"], icon: "◈" },
  { category: "Testing", color: "#e8a87c", bg: "#fef3eb", items: ["Mocha","Chai","Sinon","Cypress","Selenium","Robot Framework"], icon: "○" },
  { category: "Build Tools", color: "#9b8fd4", bg: "#f0eeff", items: ["Git","Gulp","Webpack","Turbopack","Babel","NPM","Yarn"], icon: "◇" },
  { category: "Analytics Marketing", color: "#72b896", bg: "#e8f6ee", items: ["Google Analytics","GA4","GTM","SEO","A/B Testing","Data Tracking"], icon: "◈" },
  { category: "CMS Tools", color: "#e07d8a", bg: "#fdeef0", items: ["Adobe Experience Manager","CMS","Dreamweaver","Microsoft Office Suite","Notion","Jira","Asana","Figma"], icon: "◈" },
  { category: "Design", color: "#f0a868", bg: "#fff4e8", items: ["Photoshop","Illustrator","Figma","UX Design","Wireframing","Prototyping","Design Systems"], icon: "◈" },
  { category: "OS", color: "#3B5467", bg: "#E4ECF1", items: ["Mac","Windows","Linux"], icon: "○" },
  { category: "Soft Skills", color: "#7ab8cc", bg: "#e5f4f9", items: ["Cross-functional Collaboration","Stakeholder Communication","Project Coordination","Problem Solving","Detail-oriented","Time Management","Remote Collaboration","Multicultural Communication"], icon: "◈" },
  { category: "Interests", color: "#c49ed4", bg: "#f5eeff", items: ["Handmade Crafts","Reading","Baking","Cooking","Travel","Tarot","Nature Walks","Pet Friendly","Slow Living","Inner Peace","Meditation","Mindfulness","Simplicity","Sustainability"], icon: "◈" },
];
const PROJECTS = [
  { title: "Trend Micro",
    src: "/images/trendmicro-homepage.png",
    desc: "Closely collaborated with PMs, HIE, and marketing teams from different countries to jointly design and develop web pages that meet diverse market requirements while ensuring high usability and an excellent user experience.",
    // tag: "Web",
    color: "#7ec8e3",
    isPhoto: false
  },
  { title: "NowTV",
    src: "/images/nowtv.png",
    desc: "NowTV is a brand under the UK-based Sky Group. During my tenure, I was responsible for developing the official website and the NowTV Player, and closely collaborated with over a hundred engineers from various disciplines to maintain and enhance a large-scale codebase.",
    // tag: "UI/UX",
    color: "#f9e784",
    isPhoto: false
  },
  { title: "Cameo",
    src: "/images/cameo-case-ai-02-content-01.jpg",
    desc: "Collaborated with the Environmental Protection Administration (EPA) of the Executive Yuan to leverage large-scale IoT environmental sensing data across multiple counties and cities, develop an easy-to-use user interface, analyze potential pollution hotspots, and detect sudden pollution incidents in real time.",
    // tag: "UI/UX",
    color: "#f9e784",
    isPhoto: false
  },
  { title: "Dudoo",
    src: "/images/dudoo.png",
    desc: "Dudoo is an internal startup brand under the Foxconn Group. It initially focused on providing restaurant recommendation services and later expanded into POS system development, collaborating with numerous restaurants. During my tenure, I was responsible for assisting in the development of the official website and the POS system interface.",
    // tag: "Illustration",
    color: "#f9c4d2",
    isPhoto: false
  },
  { title: "Stackla",
    src: "/images/stackla.webp",
    desc: "Stackla is a user-generated content (UGC) platform dedicated to helping brands and businesses collect, manage, curate, moderate, and showcase user-generated content from social media and other channels to enhance marketing effectiveness and improve conversion rates. During my tenure, I was involved in the development and optimization of the platform.",
    // tag: "Web",
    color: "#b5e5c8",
    isPhoto: false
  },
  { title: "Handcrafted bags",
    src: "/images/S__242098181.jpg",
    desc: "From selecting the fabric to every single stitch, each step is done by hand with great care to craft every detail meticulously.",
    // tag: "Illustration",
    color: "#f9e784",
    isPhoto: true
  },
  { title: "Camouflage mini backpack",
    src: "/images/S__242098182.jpg",
    desc: "Every stitch is infused with passion and crafted by hand with care, creating heartfelt pieces for a beautiful life.",
    // tag: "Illustration",
    color: "#f9e784",
    isPhoto: true
  },
  { title: "Handcrafted long wallet",
    src: "/images/S__242098183.jpg",
    desc: "Fox-patterned fabric blended with soft padding is patiently quilted, each tender stitch weaving a plush, dimensional surface that wraps the long wallet in the timeless elegance of handcrafted artistry.",
    // tag: "Illustration",
    color: "#f9e784",
    isPhoto: true
  },
  { title: "Striped Skirt",
    src: "/images/S__242098180.jpg",
    desc: "Clean tailoring and a contoured waistband, adorned with a delicate side zipper, softly trace the graceful simplicity of muted stripes.",
    // tag: "Illustration",
    color: "#f9e784",
    isPhoto: true
  },
];
const photoStyle = { objectPosition: "center", objectFit: "contain" };

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
function FloatingShape({ shape, animated }) {
  const floatIdx = Math.floor(shape.delay * 10) % 3;
  const base = {
    position: "absolute",
    left: `${shape.x}%`,
    top:  `${shape.y}%`,
    opacity:   animated ? 0.75 : 0,
    transform: animated ? "translateY(0px)" : "translateY(20px)",
    transition: `opacity 0.8s ease ${shape.delay}s, transform 0.8s ease ${shape.delay}s`,
    animation: animated ? `float${floatIdx} ${3.5 + shape.delay}s ease-in-out infinite` : "none",
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
    return <div style={{ ...base, width: shape.size, height: shape.size, background: shape.color, transform: animated ? "rotate(45deg)" : "rotate(45deg) translateY(20px)" }} />;
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
  const [mounted,       setMounted]       = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [skillIndex,    setSkillIndex]    = useState(0);
  const [mousePos,      setMousePos]      = useState({ x: 0, y: 0 });
  const [hoveredBlob,   setHoveredBlob]   = useState(null);
  const [menuOpen,      setMenuOpen]      = useState(false);

  const heroRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Track mouse position relative to hero section
  const handleMouseMove = useCallback((e) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = e.clientX - rect.left - rect.width  / 2;
    const cy = e.clientY - rect.top  - rect.height / 2;
    setMousePos({ x: cx, y: cy });
  }, []);

  const scrollTo  = (id) => {
    // if (id === 'contact') {
    //     window.location.href = "mailto:future2931@gmail.com";
    //     setMenuOpen(false);
    //     return;
    // }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); 
  };
  const nextSlide = ()    => setCarouselIndex((i) => (i + 1) % PROJECTS.length);
  const prevSlide = ()    => setCarouselIndex((i) => (i - 1 + PROJECTS.length) % PROJECTS.length);

  return (
    <div style={{ fontFamily: "'DM Sans','Nunito',sans-serif", background: "#f8fcff", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Serif+Display&display=swap');

        /* float animations */
        @keyframes float0 { 0%,100%{transform:translateY(0)}  50%{transform:translateY(-12px)} }
        @keyframes float1 { 0%,100%{transform:translateY(0)}  50%{transform:translateY(-8px)}  }
        @keyframes float2 { 0%,100%{transform:translateY(0)}  50%{transform:translateY(-16px)} }
        @keyframes blobMove { 0%,100%{border-radius:60% 40% 30% 70%/60% 30% 70% 40%} 50%{border-radius:30% 60% 70% 40%/50% 60% 30% 60%} }
        @keyframes blob0 {
          0%   { border-radius: 58% 42% 52% 48% / 54% 46% 54% 46%; }
          25%  { border-radius: 48% 52% 44% 56% / 58% 42% 56% 44%; }
          50%  { border-radius: 54% 46% 58% 42% / 46% 54% 44% 56%; }
          75%  { border-radius: 44% 56% 50% 50% / 52% 48% 58% 42%; }
          100% { border-radius: 58% 42% 52% 48% / 54% 46% 54% 46%; }
        }
        @keyframes blob1 {
          0%   { border-radius: 52% 48% 56% 44% / 46% 54% 48% 52%; }
          33%  { border-radius: 44% 56% 48% 52% / 56% 44% 54% 46%; }
          66%  { border-radius: 56% 44% 44% 56% / 50% 50% 46% 54%; }
          100% { border-radius: 52% 48% 56% 44% / 46% 54% 48% 52%; }
        }
        @keyframes blob2 {
          0%   { border-radius: 50% 50% 54% 46% / 52% 48% 50% 50%; }
          40%  { border-radius: 46% 54% 50% 50% / 44% 56% 56% 44%; }
          70%  { border-radius: 56% 44% 46% 54% / 54% 46% 44% 56%; }
          100% { border-radius: 50% 50% 54% 46% / 52% 48% 50% 50%; }
        }
        @keyframes blob3 {
          0%   { border-radius: 54% 46% 48% 52% / 50% 50% 52% 48%; }
          30%  { border-radius: 48% 52% 56% 44% / 56% 44% 46% 54%; }
          60%  { border-radius: 44% 56% 52% 48% / 46% 54% 54% 46%; }
          100% { border-radius: 54% 46% 48% 52% / 50% 50% 52% 48%; }
        }
        @keyframes scrollBounce { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(8px)} }

        *   { box-sizing:border-box; margin:0; padding:0; }
        html{ scroll-behavior:smooth; }

        /* NAV */
        .nav-link       { cursor:pointer; color:rgba(255,255,255,0.85); font-size:14px; font-weight:500; letter-spacing:0.02em; transition:color 0.2s; padding:6px 2px; white-space:nowrap; }
        .nav-link:hover { color:#fff; }

        /* HAMBURGER */
        .hamburger      { display:none; flex-direction:column; gap:5px; cursor:pointer; padding:6px; }
        .hamburger span { display:block; width:22px; height:2px; background:white; border-radius:2px; transition:all 0.3s; }

        /* SKILL TAGS */
        .skill-tag       { background:rgba(126,200,227,0.15); color:#3a8fa8; border:1px solid rgba(126,200,227,0.35); border-radius:20px; padding:5px 14px; font-size:13px; display:inline-block; margin:4px; transition:all 0.2s; }
        .skill-tag:hover { background:rgba(126,200,227,0.3); transform:translateY(-2px); }

        /* CAROUSEL */
        .carousel-btn       { background:white; border:1.5px solid #e0f0f8; border-radius:50%; width:42px; height:42px; cursor:pointer; display:flex; align-items:center; justify-content:center; font-size:18px; color:#3a8fa8; transition:all 0.2s; flex-shrink:0; }
        .carousel-btn:hover { background:#e8f7ff; border-color:#7ec8e3; }
        .dot-indicator       { width:8px; height:8px; border-radius:50%; background:#c8e8f4; cursor:pointer; transition:all 0.2s; }
        .dot-indicator.active{ background:#7ec8e3; width:22px; border-radius:4px; }

        /* CONTACT */
        .contact-input      { width:100%; padding:12px 16px; border:1.5px solid #d5eef8; border-radius:12px; font-family:inherit; font-size:15px; background:white; color:#333; outline:none; transition:border-color 0.2s; }
        .contact-input:focus{ border-color:#7ec8e3; }
        .send-btn           { background:#7ec8e3; color:white; border:none; border-radius:14px; padding:13px 32px; font-family:inherit; font-size:15px; font-weight:600; cursor:pointer; transition:all 0.2s; letter-spacing:0.02em; }
        .send-btn:hover     { transform:translateY(-2px); box-shadow:0 8px 24px rgba(126,200,227,0.4); }

        /* FOOTER LINKS */
        .social-link       { cursor:pointer; color:rgba(255,255,255,0.7); transition:color 0.2s; }
        .social-link:hover { color:#f9e784; }

        /* ── RESPONSIVE ─────────────────────────────────────────── */
        @media (max-width: 768px) {
          .hamburger    { display:flex !important; }
          .nav-desktop  { display:none !important; }
          .nav-mobile-menu {
            display:flex;
            flex-direction:column;
            gap:0;
            position:absolute;
            top:100%;
            left:0; right:0;
            background:rgba(80,175,210,0.97);
            backdrop-filter:blur(14px);
            padding:8px 0 16px;
            border-top:1px solid rgba(255,255,255,0.15);
          }
          .nav-mobile-menu .nav-link {
            padding: 13px 24px;
            font-size:16px;
            border-bottom:1px solid rgba(255,255,255,0.08);
          }
          .about-grid    { grid-template-columns:1fr !important; gap:48px !important; }
          .about-avatar  { order:-1; max-width:280px !important; margin:0 auto !important; }
          .skills-grid   { grid-template-columns:1fr !important; }
          .hero-btns     { flex-direction:column !important; align-items:center !important; }
          .hero-btns button { width:200px; }
          .footer-links  { flex-wrap:wrap !important; gap:16px !important; }
        }

        @media (max-width: 480px) {
          .about-avatar  { max-width:220px !important; }
        }
      `}</style>

      {/* ── NAV ───────────────────────────────────────────────────────── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        padding: "14px 24px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        background: "rgba(100,196,228,0.18)", backdropFilter: "blur(14px)",
      }}>
        <span style={{ fontFamily: "'DM Serif Display',serif", fontSize: 20, color: "white", letterSpacing: "0.01em", flexShrink: 0 }}>
          Angela Fei
        </span>

        {/* Desktop nav */}
        <div className="nav-desktop" style={{ display: "flex", gap: 28 }}>
          {NAV_ITEMS.map((item) => (
            item.toLowerCase() === 'contact' ?
            <a key={item} className="nav-link" href="mailto:future2931@gmail.com">{item}</a> :
            <span key={item} className="nav-link" onClick={() => scrollTo(item.toLowerCase())}>{item}</span>
          ))}
        </div>

        {/* Hamburger (mobile) */}
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span style={{ transform: menuOpen ? "rotate(45deg) translate(5px,5px)" : "none" }} />
          <span style={{ opacity: menuOpen ? 0 : 1 }} />
          <span style={{ transform: menuOpen ? "rotate(-45deg) translate(5px,-5px)" : "none" }} />
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="nav-mobile-menu">
            {NAV_ITEMS.map((item) => (
              item.toLowerCase() === 'contact' ?
              <a key={item} className="nav-link" href="mailto:future2931@gmail.com">{item}</a> :
              <span key={item} className="nav-link" onClick={() => scrollTo(item.toLowerCase())}>{item}</span>
            ))}
          </div>
        )}
      </nav>

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
        {SHAPES.map((s, i) => <FloatingShape key={i} shape={s} animated={mounted} />)}

        {/* Hero text */}
        <div style={{ textAlign: "center", position: "relative", zIndex: 10, padding: "0 24px" }}>
          <h1 style={{
            fontFamily: "'DM Serif Display',serif",
            fontSize: "clamp(36px,7vw,72px)",
            color: "white", fontWeight: 400, letterSpacing: "-0.01em",
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 1s ease 0.3s, transform 1s ease 0.3s",
          }}>
            Hello, I&#39;m Angela Fei
          </h1>
          <p style={{
            marginTop: 16,
            fontSize: "clamp(15px,2vw,20px)",
            color: "rgba(255,255,255,0.9)", fontWeight: 300, letterSpacing: "0.04em",
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 1s ease 0.55s, transform 1s ease 0.55s",
          }}>
            Front-end Developer & Digital Experience Specialist
          </p>
          <div className="hero-btns" style={{
            marginTop: 32, display: "flex", gap: 14, justifyContent: "center",
            opacity: mounted ? 1 : 0,
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

        {/* Scroll indicator */}
        <div style={{
          position: "absolute", bottom: 32, left: "50%",
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

      {/* ── ABOUT ─────────────────────────────────────────────────────── */}
      <section id="about" style={{ padding: "90px 5% 72px", maxWidth: 1100, margin: "0 auto" }}>
        <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>

          {/* Text side */}
          <div>
            <p style={{ color: "#7ec8e3", fontWeight: 600, fontSize: 12, letterSpacing: "0.14em", marginBottom: 12, textTransform: "uppercase" }}>About Me</p>
            <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: "clamp(26px,4vw,42px)", color: "#2a5a70", fontWeight: 400, lineHeight: 1.25, marginBottom: 22 }}>
              Turning ideas into<br />delightful experiences
            </h2>
            <p style={{ fontSize: 15, color: "#5a7a8a", lineHeight: 1.85, marginBottom: 14 }}>
              Hi there! I&#39;m a front-end and digital experience professional based in Taipei, with experience in website development, interactive design, SEO improvement, and user experience optimization.
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
      <section id="portfolio" style={{ padding: "72px 5%" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <p style={{ color: "#7ec8e3", fontWeight: 600, fontSize: 12, letterSpacing: "0.14em", marginBottom: 12, textTransform: "uppercase", textAlign: "center" }}>My Work</p>
          <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: "clamp(24px,3.5vw,38px)", color: "#2a5a70", fontWeight: 400, textAlign: "center", marginBottom: 44 }}>Selected Projects</h2>

          <div style={{ position: "relative" }}>
            <div style={{ overflow: "hidden", borderRadius: 22 }}>
              <div style={{ display: "flex", transition: "transform 0.5s cubic-bezier(0.4,0,0.2,1)", transform: `translateX(-${carouselIndex * 100}%)` }}>
                {PROJECTS.map((proj, i) => (
                 <div key={i} style={{ minWidth: "100%", background: "white", borderRadius: 24, border: "1.5px solid #d8f0f8" }}>
                    <div style={{ height: 360, background: `linear-gradient(135deg, ${proj.color}55, ${proj.color}22)`, 
                        display: "flex", alignItems: "center", justifyContent: "center",
                        objectFit: "cover", position: "relative", borderRadius: "22px 22px 0 0" }}>
                    <Image
                        loader={imageLoader}
                        src={proj.src}
                        fill
                        style={{ objectFit: 'cover', objectPosition: "left top", borderRadius: "22px 22px 0 0", ...(proj.isPhoto && photoStyle) }}
                        alt="Trend Micro U.S. Official Site" />
                    {/* <div style={{ width: 80, height: 80, borderRadius: "50%", border: `6px solid ${proj.color}`, opacity: 0.5 }} /> */}
                    {/* <div style={{ position: "absolute", top: 20, right: 24, background: `${proj.color}33`, color: "#4a8fa8", border: `1px solid ${proj.color}88`, borderRadius: 999, padding: "4px 14px", fontSize: 12, fontWeight: 600 }}>{proj.tag}</div> */}
                    </div>
                    <div style={{ padding: "28px 32px 36px" }}>
                    <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 26, color: "#2a5a70", marginBottom: 10, fontWeight: 400 }}>{proj.title}</h3>
                    <p style={{ fontSize: 16, color: "#7a9aaa", lineHeight: 1.6 }}>{proj.desc}</p>
                    {/* <button style={{ marginTop: 24, background: "transparent", border: `1.5px solid ${proj.color}`, color: "#4a8fa8", borderRadius: 999, padding: "9px 24px", fontFamily: "inherit", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>View Case Study →</button> */}
                    </div>
                </div>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 14, marginTop: 24 }}>
              <button className="carousel-btn" onClick={prevSlide}>‹</button>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                {PROJECTS.map((_, i) => (
                  <div key={i} className={`dot-indicator${i === carouselIndex ? " active" : ""}`} onClick={() => setCarouselIndex(i)} />
                ))}
              </div>
              <button className="carousel-btn" onClick={nextSlide}>›</button>
            </div>
          </div>
        </div>
      </section>

      {/* ── SKILLS ────────────────────────────────────────────────────── */}
      <section id="skills" style={{ padding: "72px 0 80px", background: "linear-gradient(180deg,#f8fcff 0%,#e8f7ff 100%)", overflow: "hidden" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 5%" }}>
          <p style={{ color: "#7ec8e3", fontWeight: 600, fontSize: 12, letterSpacing: "0.14em", marginBottom: 12, textTransform: "uppercase", textAlign: "center" }}>What I Do</p>
          <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: "clamp(24px,3.5vw,38px)", color: "#2a5a70", fontWeight: 400, textAlign: "center", marginBottom: 44 }}>Skills</h2>
        </div>

        {/* Carousel track — shows 3 cards on desktop, 1 on mobile */}
        <div style={{ position: "relative" }}>

          {/* Prev button */}
          <button
            className="carousel-btn"
            onClick={() => setSkillIndex(i => (i - 1 + SKILLS.length) % SKILLS.length)}
            style={{ position: "absolute", left: "clamp(8px,3vw,32px)", top: "50%", transform: "translateY(-50%)", zIndex: 10 }}
          >‹</button>

          {/* Sliding window */}
          <div style={{ overflow: "hidden", padding: "8px 0 16px" }}>
            <div style={{
              display: "flex",
              gap: 20,
              transition: "transform 0.45s cubic-bezier(0.4,0,0.2,1)",
              transform: `translateX(calc(-${skillIndex} * (min(320px, 80vw) + 20px) + clamp(48px, 8vw, 120px)))`,
              willChange: "transform",
            }}>
              {SKILLS.map((cat, i) => {
                const dist = Math.abs(((i - skillIndex) % SKILLS.length + SKILLS.length) % SKILLS.length);
                const isCurrent = dist === 0;
                const isAdj = dist === 1 || dist === SKILLS.length - 1;
                return (
                  <div
                    key={cat.category}
                    onClick={() => setSkillIndex(i)}
                    style={{
                      flexShrink: 0,
                      width: "min(320px, 80vw)",
                      background: "white",
                      borderRadius: 20,
                      padding: "28px 24px 32px",
                      border: isCurrent ? `2px solid ${cat.color}` : "1.5px solid #d8f0f8",
                      boxShadow: isCurrent ? `0 8px 32px ${cat.color}33` : "0 2px 12px rgba(126,200,227,0.06)",
                      opacity: isCurrent ? 1 : isAdj ? 0.7 : 0.35,
                      transform: isCurrent ? "scale(1.02)" : "scale(0.97)",
                      transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
                      cursor: isCurrent ? "default" : "pointer",
                      userSelect: "none",
                    }}
                  >
                    {/* Header row */}
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
                      {/* <div style={{
                        width: 40, height: 40, borderRadius: 12,
                        background: cat.bg,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 18, color: cat.color, flexShrink: 0,
                      }}>{cat.icon}</div> */}
                      <h3 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 18, color: "#2a5a70", fontWeight: 400, lineHeight: 1.2 }}>{cat.category}</h3>
                    </div>
                    {/* Tags */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                      {cat.items.map(item => (
                        <span key={item} style={{
                          fontSize: 12.5, padding: "4px 12px",
                          borderRadius: 20,
                          background: cat.bg,
                          color: cat.color,
                          border: `1px solid ${cat.color}55`,
                          fontWeight: 500,
                          lineHeight: 1.4,
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
            className="carousel-btn"
            onClick={() => setSkillIndex(i => (i + 1) % SKILLS.length)}
            style={{ position: "absolute", right: "clamp(8px,3vw,32px)", top: "50%", transform: "translateY(-50%)", zIndex: 10 }}
          >›</button>
        </div>

        {/* Dot indicators */}
        <div style={{ display: "flex", justifyContent: "center", gap: 7, marginTop: 24 }}>
          {SKILLS.map((cat, i) => (
            <div
              key={i}
              onClick={() => setSkillIndex(i)}
              style={{
                width: skillIndex === i ? 22 : 7,
                height: 7,
                borderRadius: 4,
                background: skillIndex === i ? SKILLS[skillIndex].color : "#c8e8f4",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>
      </section>

      {/* ── CONTACT ───────────────────────────────────────────────────── */}
      {/* <section id="contact" style={{ padding: "72px 5% 100px", background: "linear-gradient(180deg,#f8fcff 0%,#d8f0fa 100%)" }}>
        <div style={{ maxWidth: 560, margin: "0 auto", textAlign: "center" }}>
          <p style={{ color: "#7ec8e3", fontWeight: 600, fontSize: 12, letterSpacing: "0.14em", marginBottom: 12, textTransform: "uppercase" }}>Say Hello</p>
          <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: "clamp(24px,3.5vw,38px)", color: "#2a5a70", fontWeight: 400, marginBottom: 14 }}>Let's work together</h2>
          <p style={{ fontSize: 15, color: "#7a9aaa", lineHeight: 1.75, marginBottom: 40 }}>Have a project in mind or want to chat? Feel free to reach out — I'm always open to new opportunities.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, textAlign: "left" }}>
            <input  className="contact-input" placeholder="Your name" />
            <input  className="contact-input" placeholder="Email address" type="email" />
            <textarea className="contact-input" placeholder="Tell me about your project..." rows={5} style={{ resize: "vertical" }} />
            <button className="send-btn" style={{ alignSelf: "center", marginTop: 8 }}>Send Message ✦</button>
          </div>
        </div>
      </section> */}

      {/* ── FOOTER ────────────────────────────────────────────────────── */}
      <footer style={{ background: "#2a5a70", color: "rgba(255,255,255,0.6)", textAlign: "center", padding: "26px 24px", fontSize: 13 }}>
        {/* <div className="footer-links" style={{ display: "flex", justifyContent: "center", gap: 28, marginBottom: 14, flexWrap: "wrap" }}>
          {["LinkedIn", "GitHub", "Dribbble", "Behance"].map((link) => (
            <span key={link} className="social-link">{link}</span>
          ))}
        </div> */}
        <div>© 2026 Angela Fei · Crafted with care ✦</div>
      </footer>
    </div>
  );
}
