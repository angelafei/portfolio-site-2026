"use client"
import Image from "next/image";
// // import Image from "next/image";

// export default function Home() {
//   const skills = [
//     'HTML5',
//     'CSS / SCSS',
//     'JavaScript',
//     'React',
//     'WordPress',
//     'UI / UX',
//   ]

//   const portfolioItems = [
//     {
//       title: 'Marketing Website Redesign',
//       category: 'Web Design',
//       description:
//         'A modern responsive website redesign focused on storytelling, clean layouts, and user engagement.',
//     },
//     {
//       title: 'Digital Product Landing Page',
//       category: 'Frontend Development',
//       description:
//         'A landing page built with reusable components, smooth interactions, and flexible content blocks.',
//     },
//     {
//       title: 'Creative Event Visual Design',
//       category: 'Design',
//       description:
//         'Visual concepts and promotional materials created for events and cultural experiences.',
//     },
//   ]

//   return (
//     <div className="bg-[#c8e4f2] text-white overflow-hidden min-h-screen font-sans">
//       {/* Background Decoration */}
//       <div className="fixed inset-0 pointer-events-none overflow-hidden">
//         <div className="absolute -top-20 -left-20 w-[320px] h-[260px] bg-[#f6edb4] rounded-[45%_55%_60%_40%/50%_40%_60%_50%] opacity-90" />
//         <div className="absolute top-[-60px] left-1/2 -translate-x-1/2 w-[280px] h-[180px] bg-[#f6edb4] rounded-[45%_55%_50%_50%/60%_40%_60%_40%] opacity-90" />
//         <div className="absolute bottom-[35%] -left-10 w-[220px] h-[160px] bg-[#f6edb4] rounded-[50%_50%_60%_40%/60%_40%_60%_40%] opacity-90" />
//         <div className="absolute bottom-[18%] -right-16 w-[320px] h-[280px] bg-[#f6edb4] rounded-[50%_50%_60%_40%/60%_40%_60%_40%] opacity-90" />

//         <div className="absolute top-[28%] left-[28%] w-16 h-16 rounded-full border-[10px] border-[#72b9e2] opacity-70" />
//         <div className="absolute top-[42%] right-[28%] w-20 h-20 rounded-full border-[10px] border-[#f6edb4] opacity-80" />
//         <div className="absolute top-[32%] right-[38%] w-4 h-4 rounded-full bg-[#72b9e2] opacity-70" />
//         <div className="absolute top-[36%] left-[38%] w-5 h-5 rounded-full bg-[#f6edb4] opacity-80" />
//         <div className="absolute top-[30%] right-[46%] text-[#f6edb4] text-3xl">✦</div>
//         <div className="absolute top-[39%] left-[47%] text-[#72b9e2] text-3xl">✦</div>
//       </div>

//       {/* Navbar */}
//       <header className="relative z-10 flex items-center justify-between px-8 md:px-16 py-8">
//         <div>
//           <div className="text-[#5aa9db] text-4xl font-semibold leading-none">∞</div>
//           <div className="text-[#3e5f8a] text-sm tracking-[0.3em] uppercase ml-1">
//             Fei
//           </div>
//         </div>

//         <nav className="hidden md:flex gap-10 text-white/90 text-lg font-light">
//           <a href="#about" className="hover:opacity-70 transition-opacity">
//             About
//           </a>
//           <a href="#skills" className="hover:opacity-70 transition-opacity">
//             Skills
//           </a>
//           <a href="#portfolio" className="hover:opacity-70 transition-opacity">
//             Portfolio
//           </a>
//           <a href="#contact" className="hover:opacity-70 transition-opacity">
//             Contact
//           </a>
//         </nav>
//       </header>

//       {/* Hero Section */}
//       <section
//         id="about"
//         className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-6 pb-24"
//       >
//         <div className="max-w-5xl">
//           <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-8 text-white">
//             Hello, I’m Angela Fei
//           </h1>

//           <p className="max-w-3xl mx-auto text-lg md:text-2xl leading-relaxed text-white/90 font-light">
//             Front-end developer who loves crafting thoughtful digital
//             experiences with a balance of creativity, simplicity, and warmth.
//           </p>

//           <p className="max-w-2xl mx-auto mt-8 text-base md:text-lg text-white/80 leading-relaxed">
//             Shaped by years of working across cultures and countries. Now
//             exploring new creative directions beyond code.
//           </p>

//           <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
//             <button className="px-8 py-4 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 transition-all text-white text-lg">
//               View Portfolio
//             </button>
//             <button className="px-8 py-4 rounded-full border border-white/40 hover:bg-white/10 transition-all text-white text-lg">
//               Contact Me
//             </button>
//           </div>
//         </div>

//         <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center text-white/60 text-sm tracking-[0.25em] uppercase">
//           <span>Scroll</span>
//           <div className="w-px h-10 bg-white/40 mt-3" />
//         </div>
//       </section>

//       {/* Divider */}
//       <div className="relative z-10 -mt-16">
//         <div className="h-32 bg-[#f8f6f1] rounded-t-[80px]" />
//       </div>

//       {/* Skills Section */}
//       <section
//         id="skills"
//         className="relative z-10 bg-[#f8f6f1] text-[#3e5f8a] px-6 md:px-12 py-24"
//       >
//         <div className="max-w-6xl mx-auto text-center">
//           <h2 className="text-4xl md:text-5xl font-semibold mb-6">Skills</h2>
//           <p className="max-w-2xl mx-auto text-lg text-[#5f7391] leading-relaxed mb-16">
//             A blend of front-end development, digital design, and content
//             experience — with enough flexibility to expand this section later
//             into tools, experience levels, or categories.
//           </p>

//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
//             {skills.map((skill) => (
//               <div
//                 key={skill}
//                 className="bg-white rounded-[28px] px-6 py-8 shadow-sm border border-[#e9eef4] hover:-translate-y-1 transition-all"
//               >
//                 <div className="w-14 h-14 rounded-2xl bg-[#c8e4f2] mx-auto mb-5" />
//                 <p className="text-base font-medium">{skill}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Soft Divider */}
//       <div className="bg-[#f8f6f1] overflow-hidden">
//         <div className="h-28 bg-[#d8edf7] rounded-t-[100px]" />
//       </div>

//       {/* Portfolio Section */}
//       <section
//         id="portfolio"
//         className="relative bg-[#d8edf7] text-[#3e5f8a] px-6 md:px-12 py-24"
//       >
//         <div className="max-w-6xl mx-auto">
//           <div className="text-center mb-14">
//             <h2 className="text-4xl md:text-5xl font-semibold mb-6">
//               Portfolio
//             </h2>
//             <p className="max-w-2xl mx-auto text-lg text-[#5f7391] leading-relaxed">
//               A flexible portfolio section ready for a future carousel, project
//               filters, case studies, or image thumbnails.
//             </p>
//           </div>

//           <div className="flex gap-4 justify-center mb-12 flex-wrap">
//             {['All', 'Web', 'Design', 'Illustration'].map((filter) => (
//               <button
//                 key={filter}
//                 className={`px-6 py-2 rounded-full border transition-all ${
//                   filter === 'All'
//                     ? 'bg-[#f6edb4] border-[#f6edb4] text-[#3e5f8a]'
//                     : 'bg-white/50 border-white/40 text-[#5f7391] hover:bg-white/70'
//                 }`}
//               >
//                 {filter}
//               </button>
//             ))}
//           </div>

//           <div className="grid lg:grid-cols-3 gap-8">
//             {portfolioItems.map((item, index) => (
//               <div
//                 key={index}
//                 className="bg-white/80 backdrop-blur-sm rounded-[32px] p-6 border border-white/50 shadow-sm"
//               >
//                 <div className="h-52 rounded-[24px] bg-[#c8e4f2] mb-6 relative overflow-hidden">
//                   <div className="absolute top-5 left-5 w-20 h-14 rounded-2xl bg-white/50" />
//                   <div className="absolute bottom-5 right-5 w-24 h-16 rounded-2xl bg-[#f6edb4]/70" />
//                 </div>

//                 <span className="inline-block px-4 py-2 rounded-full text-sm bg-[#f6edb4] text-[#3e5f8a] mb-4">
//                   {item.category}
//                 </span>

//                 <h3 className="text-2xl font-semibold mb-3">{item.title}</h3>
//                 <p className="text-[#5f7391] leading-relaxed mb-6">
//                   {item.description}
//                 </p>

//                 <button className="text-[#5aa9db] font-medium hover:underline">
//                   View Project →
//                 </button>
//               </div>
//             ))}
//           </div>

//           <div className="flex justify-end mt-10 text-5xl opacity-60">
//             🐈
//           </div>
//         </div>
//       </section>

//       {/* Contact */}
//       <section
//         id="contact"
//         className="bg-[#d8edf7] text-[#3e5f8a] px-6 md:px-12 pt-12 pb-20"
//       >
//         <div className="max-w-4xl mx-auto border-t border-white/40 pt-12 text-center">
//           <h2 className="text-3xl font-semibold mb-4">Let’s Connect</h2>
//           <p className="text-[#5f7391] mb-8">
//             Open to freelance opportunities, creative collaborations, and
//             full-time roles.
//           </p>

//           <div className="flex justify-center gap-6 text-lg">
//             <a href="#" className="hover:opacity-70">
//               Email
//             </a>
//             <a href="#" className="hover:opacity-70">
//               LinkedIn
//             </a>
//             <a href="#" className="hover:opacity-70">
//               Behance
//             </a>
//           </div>
//         </div>
//       </section>
//     </div>
//   )
// }

import { useState, useEffect } from "react";

const SHAPES = [
  { type: "ring", x: 27, y: 38, size: 52, color: "#7ec8e3", delay: 0 },
  { type: "ring", x: 58, y: 28, size: 40, color: "#7ec8e3", delay: 0.4 },
  { type: "ring", x: 73, y: 62, size: 64, color: "#f9e784", delay: 0.2 },
  { type: "ring", x: 36, y: 65, size: 32, color: "#f9e784", delay: 0.6 },
  { type: "ring", x: 82, y: 42, size: 26, color: "#7ec8e3", delay: 0.8 },
  { type: "dot", x: 42, y: 30, size: 10, color: "#7ec8e3", delay: 0.3 },
  { type: "dot", x: 65, y: 70, size: 14, color: "#f9e784", delay: 0.5 },
  { type: "dot", x: 55, y: 45, size: 8, color: "#f9e784", delay: 0.1 },
  { type: "dot", x: 80, y: 30, size: 10, color: "#f9e784", delay: 0.7 },
  { type: "dot", x: 22, y: 58, size: 8, color: "#7ec8e3", delay: 0.9 },
  { type: "star", x: 46, y: 22, size: 14, color: "#f9e784", delay: 0.2 },
  { type: "star", x: 76, y: 55, size: 10, color: "#f9e784", delay: 0.6 },
  { type: "triangle", x: 30, y: 70, size: 14, color: "#f9e784", delay: 0.4 },
  { type: "triangle", x: 62, y: 55, size: 10, color: "#7ec8e3", delay: 0.8 },
  { type: "triangle", x: 85, y: 68, size: 12, color: "#7ec8e3", delay: 0.3 },
  { type: "diamond", x: 25, y: 42, size: 12, color: "#7ec8e3", delay: 0.5 },
  { type: "diamond", x: 68, y: 35, size: 10, color: "#f9e784", delay: 0.1 },
];

const NAV_ITEMS = ["About", "Skills", "Portfolio", "Contact"];

const SKILLS = [
  { category: "Design", items: ["Figma", "Illustrator", "Photoshop", "Prototyping"], icon: "◈" },
  { category: "Frontend", items: ["ReactJS", "VueJS", "AngularJS", "HTML/CSS", "JavaScript", "TypeScript", "Map Libraries", "Charts Libraries", "D3", "FabricJS"], icon: "◇" },
  { category: "Backend", items: ["NodeJS", "PHP", "Python"], icon: "◈" },
  { category: "Tools", items: ["Git", "Notion", "Jira", "Asana", "Adobe Creative Suite", "CMS", "Microsoft Office Suite", "GTM", "GA"], icon: "○" },
  { category: "Testing", items: ["ReactJS", "VueJS", "AngularJS", "HTML/CSS", "JavaScript", "TypeScript", "Map Libraries", "Charts Libraries", "D3", "FabricJS"], icon: "◇" },
  { category: "OS", items: ["Git", "Notion", "Jira", "Asana", "Adobe Creative Suite", "CMS", "Microsoft Office Suite", "GTM", "GA"], icon: "○" },
];

const PROJECTS = [
  { title: "Trend Micro",
    src: "/images/trendmicro-homepage.png",
    desc: "Closely collaborated with PMs, HIE, and marketing teams from different countries to jointly design and develop web pages that meet diverse market requirements while ensuring high usability and an excellent user experience.",
    tag: "Web",
    color: "#7ec8e3"
  },
  { title: "Mobile App UI",
    src: "/images/cameo-case-ai-02-content-01.jpg",
    desc: "Wellness tracking app for iOS & Android",
    tag: "UI/UX",
    color: "#f9e784"
  },
  { title: "Mobile App UI",
    src: "/images/nowtv.png",
    desc: "Wellness tracking app for iOS & Android",
    tag: "UI/UX",
    color: "#f9e784"
  },
  { title: "Web Dashboard",
    src: "/images/stackla.webp",
    desc: "Analytics dashboard for an e-commerce platform",
    tag: "Web",
    color: "#b5e5c8"
  },
  { title: "Illustration Set",
    src: "/images/dudoo.png",
    desc: "Custom icon pack for a fintech startup",
    tag: "Illustration",
    color: "#f9c4d2"
  },
  { title: "Illustration Set",
    src: "/images/S__242098181.jpg",
    desc: "Custom icon pack for a fintech startup",
    tag: "Illustration",
    color: "#f9c4d2"
  },
  { title: "Illustration Set",
    src: "/images/S__242098182.jpg",
    desc: "Custom icon pack for a fintech startup",
    tag: "Illustration",
    color: "#f9c4d2"
  },
  { title: "Illustration Set",
    src: "/images/S__242098183.jpg",
    desc: "Custom icon pack for a fintech startup",
    tag: "Illustration",
    color: "#f9c4d2"
  },
  { title: "Illustration Set",
    src: "/images/S__242098180.jpg",
    desc: "Custom icon pack for a fintech startup",
    tag: "Illustration",
    color: "#f9c4d2"
  },
];

function FloatingShape({ shape, animated }) {
  const style = {
    position: "absolute",
    left: `${shape.x}%`,
    top: `${shape.y}%`,
    opacity: animated ? 0.75 : 0,
    transform: animated ? "translateY(0px)" : "translateY(20px)",
    transition: `opacity 0.8s ease ${shape.delay}s, transform 0.8s ease ${shape.delay}s`,
    animation: animated ? `float${Math.floor(shape.delay * 10) % 3} ${3.5 + shape.delay}s ease-in-out infinite` : "none",
  };
  if (shape.type === "ring") return <div style={{ ...style, width: shape.size, height: shape.size, borderRadius: "50%", border: `${shape.size * 0.18}px solid ${shape.color}` }} />;
  if (shape.type === "dot") return <div style={{ ...style, width: shape.size, height: shape.size, borderRadius: "50%", background: shape.color }} />;
  if (shape.type === "star") return <div style={{ ...style, fontSize: shape.size + 4, color: shape.color, lineHeight: 1 }}>✦</div>;
  if (shape.type === "triangle") return <div style={{ ...style, width: 0, height: 0, borderLeft: `${shape.size * 0.6}px solid transparent`, borderRight: `${shape.size * 0.6}px solid transparent`, borderBottom: `${shape.size}px solid ${shape.color}` }} />;
  if (shape.type === "diamond") return <div style={{ ...style, width: shape.size, height: shape.size, background: shape.color, transform: "rotate(45deg)" }} />;
  return null;
}

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const nextSlide = () => setCarouselIndex((i) => (i + 1) % PROJECTS.length);
  const prevSlide = () => setCarouselIndex((i) => (i - 1 + PROJECTS.length) % PROJECTS.length);

  return (
    <div style={{ fontFamily: "'DM Sans', 'Nunito', sans-serif", background: "#f8fcff", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Serif+Display&display=swap');
        @keyframes float0 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes float1 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes float2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-16px)} }
        @keyframes blobMove { 0%,100%{border-radius:60% 40% 30% 70%/60% 30% 70% 40%} 50%{border-radius:30% 60% 70% 40%/50% 60% 30% 60%} }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        .nav-link { cursor:pointer; color:rgba(255,255,255,0.85); font-size:14px; font-weight:500; letter-spacing:0.02em; transition:color 0.2s; padding:6px 0; }
        .nav-link:hover { color:#fff; }
        .skill-tag { background:rgba(126,200,227,0.15); color:#3a8fa8; border:1px solid rgba(126,200,227,0.35); border-radius:20px; padding:5px 14px; font-size:13px; display:inline-block; margin:4px; transition:all 0.2s; }
        .skill-tag:hover { background:rgba(126,200,227,0.3); transform:translateY(-2px); }
        .carousel-btn { background:white; border:1.5px solid #e0f0f8; border-radius:50%; width:42px; height:42px; cursor:pointer; display:flex; align-items:center; justify-content:center; font-size:18px; color:#3a8fa8; transition:all 0.2s; }
        .carousel-btn:hover { background:#e8f7ff; border-color:#7ec8e3; }
        .contact-input { width:100%; padding:12px 16px; border:1.5px solid #d5eef8; border-radius:12px; font-family:inherit; font-size:15px; background:white; color:#333; outline:none; transition:border-color 0.2s; }
        .contact-input:focus { border-color:#7ec8e3; }
        .send-btn { background:#7ec8e3; color:white; border:none; border-radius:14px; padding:13px 32px; font-family:inherit; font-size:15px; font-weight:600; cursor:pointer; transition:all 0.2s; letter-spacing:0.02em; }
        .send-btn:hover { transform:translateY(-2px); box-shadow:0 8px 24px rgba(126,200,227,0.4); }
        .dot-indicator { width:8px; height:8px; border-radius:50%; background:#c8e8f4; cursor:pointer; transition:all 0.2s; }
        .dot-indicator.active { background:#7ec8e3; width:22px; border-radius:4px; }
        .social-link { cursor:pointer; color:rgba(255,255,255,0.7); transition:color 0.2s; }
        .social-link:hover { color:#f9e784; }
      `}</style>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "18px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(100,196,228,0.15)", backdropFilter: "blur(12px)" }}>
        <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 20, color: "white", letterSpacing: "0.01em" }}>Angela Fei</span>
        <div style={{ display: "flex", gap: 32 }}>
          {NAV_ITEMS.map((item) => (
            <span key={item} className="nav-link" onClick={() => scrollTo(item.toLowerCase())}>{item}</span>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <section id="hero" style={{ minHeight: "100vh", position: "relative", background: "linear-gradient(160deg, #8dd9ee 0%, #a8e4f5 45%, #b2e8ea 100%)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-10%", left: "-8%", width: "40%", height: "45%", background: "#f9e784", borderRadius: "60% 40% 30% 70%/60% 30% 70% 40%", animation: "blobMove 8s ease-in-out infinite", opacity: 0.85 }} />
        <div style={{ position: "absolute", top: "-5%", right: "-5%", width: "30%", height: "38%", background: "#f9e784", borderRadius: "40% 60% 70% 30%/40% 70% 30% 60%", animation: "blobMove 10s ease-in-out infinite reverse", opacity: 0.8 }} />
        <div style={{ position: "absolute", bottom: "-8%", left: "5%", width: "28%", height: "35%", background: "#f9e784", borderRadius: "50% 50% 30% 70%/50% 30% 70% 50%", animation: "blobMove 9s ease-in-out infinite 2s", opacity: 0.8 }} />
        <div style={{ position: "absolute", bottom: "-6%", right: "0%", width: "32%", height: "40%", background: "#f9e784", borderRadius: "40% 60% 50% 50%/60% 40% 60% 40%", animation: "blobMove 11s ease-in-out infinite 1s reverse", opacity: 0.75 }} />

        {SHAPES.map((s, i) => <FloatingShape key={i} shape={s} animated={mounted} />)}

        <div style={{ textAlign: "center", position: "relative", zIndex: 10 }}>
          <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(40px, 7vw, 72px)", color: "white", fontWeight: 400, letterSpacing: "-0.01em", opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(24px)", transition: "opacity 1s ease 0.3s, transform 1s ease 0.3s" }}>
            Hello, I'm Angela Fei
          </h1>
          <p style={{ marginTop: 18, fontSize: "clamp(16px, 2vw, 20px)", color: "rgba(255,255,255,0.9)", fontWeight: 300, letterSpacing: "0.04em", opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(20px)", transition: "opacity 1s ease 0.55s, transform 1s ease 0.55s" }}>
            UI/UX Designer & Frontend Developer
          </p>
          <div style={{ marginTop: 36, display: "flex", gap: 16, justifyContent: "center", opacity: mounted ? 1 : 0, transition: "opacity 1s ease 0.75s" }}>
            <button onClick={() => scrollTo("portfolio")} style={{ background: "white", color: "#5ab3d4", border: "none", borderRadius: 999, padding: "12px 30px", fontFamily: "inherit", fontSize: 15, fontWeight: 600, cursor: "pointer", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>View Work</button>
            <button onClick={() => scrollTo("contact")} style={{ background: "transparent", color: "white", border: "2px solid rgba(255,255,255,0.7)", borderRadius: 999, padding: "12px 30px", fontFamily: "inherit", fontSize: 15, fontWeight: 600, cursor: "pointer" }}>Get in Touch</button>
          </div>
        </div>

        <div style={{ position: "absolute", bottom: 36, left: "50%", transform: "translateX(-50%)", textAlign: "center", color: "rgba(255,255,255,0.7)", fontSize: 11, letterSpacing: "0.18em", fontWeight: 500 }}>
          <div>SCROLL</div>
          <div style={{ margin: "8px auto 0", width: 1, height: 48, background: "rgba(255,255,255,0.4)" }} />
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding: "100px 5% 80px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center" }}>
          <div>
            <p style={{ color: "#7ec8e3", fontWeight: 600, fontSize: 13, letterSpacing: "0.14em", marginBottom: 12, textTransform: "uppercase" }}>About Me</p>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(28px, 4vw, 44px)", color: "#2a5a70", fontWeight: 400, lineHeight: 1.2, marginBottom: 24 }}>Turning ideas into delightful experiences</h2>
            <p style={{ fontSize: 16, color: "#5a7a8a", lineHeight: 1.8, marginBottom: 16 }}>Hi there! I'm a designer & developer based in Taipei, passionate about creating interfaces that are both beautiful and intuitive.</p>
            <p style={{ fontSize: 16, color: "#5a7a8a", lineHeight: 1.8 }}>With experience across branding, product design, and frontend development, I bridge the gap between creative vision and technical execution.</p>
            <div style={{ display: "flex", gap: 32, marginTop: 36 }}>
              {[["3+", "Years Exp."], ["20+", "Projects"], ["15+", "Clients"]].map(([num, label]) => (
                <div key={label}>
                  <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 36, color: "#7ec8e3", lineHeight: 1 }}>{num}</div>
                  <div style={{ fontSize: 13, color: "#8aacba", marginTop: 4, fontWeight: 500 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ position: "relative" }}>
            <div style={{ width: "100%", paddingBottom: "100%", borderRadius: "40% 60% 55% 45%/45% 50% 50% 55%", background: "linear-gradient(135deg, #a8e4f5 0%, #c8f0ea 100%)", animation: "blobMove 8s ease-in-out infinite", position: "relative" }}>
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: "72%", height: "72%", borderRadius: "50%", background: "rgba(255,255,255,0.5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 48, color: "#7ec8e3" }}>AF</span>
                </div>
              </div>
            </div>
            <div style={{ position: "absolute", top: -16, right: -16, width: 52, height: 52, borderRadius: "50%", border: "6px solid #f9e784", opacity: 0.8, animation: "float0 3s ease-in-out infinite" }} />
            <div style={{ position: "absolute", bottom: 24, left: -20, width: 32, height: 32, borderRadius: "50%", background: "#f9e784", opacity: 0.7, animation: "float1 4s ease-in-out infinite" }} />
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" style={{ padding: "80px 5%", background: "linear-gradient(180deg, #f8fcff 0%, #e8f7ff 100%)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ color: "#7ec8e3", fontWeight: 600, fontSize: 13, letterSpacing: "0.14em", marginBottom: 12, textTransform: "uppercase", textAlign: "center" }}>What I Do</p>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(26px, 3.5vw, 40px)", color: "#2a5a70", fontWeight: 400, textAlign: "center", marginBottom: 56 }}>Skills</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
            {SKILLS.map((cat) => (
              <div key={cat.category} style={{ background: "white", borderRadius: 20, padding: "28px 24px", border: "1.5px solid #d8f0f8", boxShadow: "0 4px 20px rgba(126,200,227,0.08)" }}>
                <div style={{ fontSize: 28, marginBottom: 12, color: "#7ec8e3" }}>{cat.icon}</div>
                <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 20, color: "#2a5a70", marginBottom: 16, fontWeight: 400 }}>{cat.category}</h3>
                <div>{cat.items.map((item) => <span key={item} className="skill-tag">{item}</span>)}</div>
              </div>
            ))}
          </div>
          {/* 🔧 延伸區塊: 可在此加入 skill bars、progress rings、proficiency levels 等 */}
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" style={{ padding: "80px 5%" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <p style={{ color: "#7ec8e3", fontWeight: 600, fontSize: 13, letterSpacing: "0.14em", marginBottom: 12, textTransform: "uppercase", textAlign: "center" }}>My Work</p>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(26px, 3.5vw, 40px)", color: "#2a5a70", fontWeight: 400, textAlign: "center", marginBottom: 52 }}>Selected Projects</h2>

          <div style={{ position: "relative" }}>
            <div style={{ overflow: "hidden", borderRadius: 24 }}>
              <div style={{ display: "flex", transition: "transform 0.5s cubic-bezier(0.4,0,0.2,1)", transform: `translateX(-${carouselIndex * 100}%)` }}>
                {PROJECTS.map((proj, i) => (
                  <div key={i} style={{ minWidth: "100%", background: "white", borderRadius: 24, border: "1.5px solid #d8f0f8" }}>
                    <div style={{ height: 360, background: `linear-gradient(135deg, ${proj.color}55, ${proj.color}22)`, 
                        display: "flex", alignItems: "center", justifyContent: "center",
                        objectFit: "cover", position: "relative", borderRadius: "22px 22px 0 0" }}>
                      <Image src={proj.src} fill style={{ objectFit: 'cover', objectPosition: "left top", borderRadius: "22px 22px 0 0" }} alt="Trend Micro U.S. Official Site" />
                      {/* <div style={{ width: 80, height: 80, borderRadius: "50%", border: `6px solid ${proj.color}`, opacity: 0.5 }} /> */}
                      <div style={{ position: "absolute", top: 20, right: 24, background: `${proj.color}33`, color: "#4a8fa8", border: `1px solid ${proj.color}88`, borderRadius: 999, padding: "4px 14px", fontSize: 12, fontWeight: 600 }}>{proj.tag}</div>
                    </div>
                    <div style={{ padding: "28px 32px 36px" }}>
                      <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 26, color: "#2a5a70", marginBottom: 10, fontWeight: 400 }}>{proj.title}</h3>
                      <p style={{ fontSize: 16, color: "#7a9aaa", lineHeight: 1.6 }}>{proj.desc}</p>
                      <button style={{ marginTop: 24, background: "transparent", border: `1.5px solid ${proj.color}`, color: "#4a8fa8", borderRadius: 999, padding: "9px 24px", fontFamily: "inherit", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>View Case Study →</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 16, marginTop: 28 }}>
              <button className="carousel-btn" onClick={prevSlide}>‹</button>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                {PROJECTS.map((_, i) => (
                  <div key={i} className={`dot-indicator ${i === carouselIndex ? "active" : ""}`} onClick={() => setCarouselIndex(i)} />
                ))}
              </div>
              <button className="carousel-btn" onClick={nextSlide}>›</button>
            </div>
          </div>
          {/* 🔧 延伸區塊: 可替換為 Masonry grid、filter tabs、lightbox、或從 API 載入資料 */}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "80px 5% 100px", background: "linear-gradient(180deg, #f8fcff 0%, #d8f0fa 100%)" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
          <p style={{ color: "#7ec8e3", fontWeight: 600, fontSize: 13, letterSpacing: "0.14em", marginBottom: 12, textTransform: "uppercase" }}>Say Hello</p>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(26px, 3.5vw, 40px)", color: "#2a5a70", fontWeight: 400, marginBottom: 14 }}>Let's work together</h2>
          <p style={{ fontSize: 16, color: "#7a9aaa", lineHeight: 1.7, marginBottom: 44 }}>Have a project in mind or want to chat? Feel free to reach out — I'm always open to new opportunities.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, textAlign: "left" }}>
            <input className="contact-input" placeholder="Your name" />
            <input className="contact-input" placeholder="Email address" type="email" />
            <textarea className="contact-input" placeholder="Tell me about your project..." rows={5} style={{ resize: "vertical" }} />
            <button className="send-btn" style={{ alignSelf: "center", marginTop: 8 }}>Send Message ✦</button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#2a5a70", color: "rgba(255,255,255,0.6)", textAlign: "center", padding: "28px 24px", fontSize: 13 }}>
        <div style={{ display: "flex", justifyContent: "center", gap: 32, marginBottom: 16 }}>
          {["LinkedIn", "GitHub", "Dribbble", "Behance"].map((link) => (
            <span key={link} className="social-link">{link}</span>
          ))}
        </div>
        <div>© 2025 Angela Fei · Crafted with care ✦</div>
      </footer>
    </div>
  );
}