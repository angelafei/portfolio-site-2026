'use client';

import { useState, useRef, useCallback } from 'react';
import { useNavigation } from './navigation-state';
import styles from "./hero.module.css";
import HeroDecorations from "./hero-decorations";
export default function Hero() {
  const { setMenuOpen } = useNavigation();
  const [mousePos, setMousePos] = useState({
    x: 0,
    y: 0
  });
  const [hoveredBlob, setHoveredBlob] = useState(null);
  const heroRef = useRef(null);
  const handleMouseMove = useCallback(e => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cx = e.clientX - rect.left - rect.width / 2;
    const cy = e.clientY - rect.top - rect.height / 2;
    setMousePos({
      x: cx,
      y: cy
    });
  }, []);
  const scrollTo = id => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth"
    });
  };
  return <section id="hero" ref={heroRef} onMouseMove={handleMouseMove} onMouseLeave={() => setMousePos({
    x: 0,
    y: 0
  })} className="min-h-screen relative [background:linear-gradient(160deg,#8dd9ee_0%,#a8e4f5_45%,#b2e8ea_100%)] flex items-center justify-center overflow-hidden">
        <HeroDecorations mousePos={mousePos} hoveredBlob={hoveredBlob} onHover={setHoveredBlob} />

{/* Hero text */}
        <div className="text-center relative [z-index:10] p-[0_24px]">
          <h1 className="font-display text-[clamp(36px,7vw,72px)] text-white font-normal tracking-[-0.01em] [text-shadow:0_2px_12px_rgba(34,86,107,0.18)] [transition:opacity_1s_ease_0.3s,_transform_1s_ease_0.3s]">
            Hello, I&#39;m Angela Fei
          </h1>
          <p className="mt-[16px] text-[clamp(17px,2.2vw,22px)] text-white font-medium tracking-[0.02em] [text-shadow:0_1px_3px_rgba(34,86,107,0.3),_0_2px_10px_rgba(34,86,107,0.15)] [transition:opacity_1s_ease_0.55s,_transform_1s_ease_0.55s]">
            Front-end / Software Engineer
          </p>
          <p className="max-w-[640px] [margin:20px_auto_0] text-[clamp(16px,1.9vw,19px)] leading-[1.8] text-white [text-wrap:pretty] [text-shadow:0_1px_3px_rgba(34,86,107,0.3),_0_2px_10px_rgba(34,86,107,0.15)]">
            Professional experience in Taiwan, Australia, and the UK,
            spanning web applications, streaming products, and enterprise websites.
          </p>
          <div className={`${styles["hero-btns"]} mt-[32px] flex gap-[14px] justify-center [transition:opacity_1s_ease_0.75s]`}>
            <button onClick={() => scrollTo("portfolio")} onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"} onMouseLeave={e => e.currentTarget.style.transform = "none"} className="bg-white text-action border-0 rounded-[999px] p-[12px_28px] [font-family:inherit] text-[15px] font-semibold cursor-pointer [box-shadow:0_4px_20px_rgba(0,0,0,0.08)] [transition:transform_0.2s,_box-shadow_0.2s]">View Work</button>
            <a className={`${styles["hero-contact"]}`} href="mailto:future2931@gmail.com">Get in Touch</a>
          </div>
        </div>

        {/* Blend the original hero into the journey section without a hard edge. */}
        <div aria-hidden="true" className="absolute [inset:auto_0_0] h-[85px] [z-index:3] [background:linear-gradient(to_bottom,_transparent,_#b2e8ea)] pointer-events-none" />

        {/* Scroll indicator */}
        <div className="absolute [bottom:32px] [left:50%] [z-index:4] [transform:translateX(-50%)] text-center [color:rgba(255,255,255,0.7)] text-[10px] tracking-[0.2em] font-medium [animation:scrollBounce_2s_ease-in-out_infinite] pointer-events-none">
          <div>SCROLL</div>
          <div className="[margin:8px_auto_0] w-[1px] h-[40px] [background:rgba(255,255,255,0.4)]" />
        </div>
      </section>;
}
