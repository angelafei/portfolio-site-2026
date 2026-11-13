'use client';
import SectionHeading from './section-heading';

import { useState, useCallback, useEffect } from 'react';
import { SKILLS } from '../content/portfolio';
import useSwipe from '../hooks/use-swipe';
import styles from "./skills.module.css";
const LOOP_SKILLS = [...SKILLS, ...SKILLS, ...SKILLS];
export default function SkillsCarousel() {
  const [skillPosition, setSkillPosition] = useState(SKILLS.length);
  const [resettingSkills, setResettingSkills] = useState(false);
  const skillIndex = (skillPosition % SKILLS.length + SKILLS.length) % SKILLS.length;

  // Animate into an identical neighbouring copy, then reset without visible motion.
  useEffect(() => {
    if (skillPosition >= SKILLS.length && skillPosition < SKILLS.length * 2) return;
    const delay = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 470;
    const timer = setTimeout(() => {
      setResettingSkills(true);
      setSkillPosition(SKILLS.length + (skillPosition % SKILLS.length + SKILLS.length) % SKILLS.length);
    }, delay);
    return () => clearTimeout(timer);
  }, [skillPosition]);
  useEffect(() => {
    if (!resettingSkills) return;
    let secondFrame;
    const firstFrame = requestAnimationFrame(() => {
      secondFrame = requestAnimationFrame(() => setResettingSkills(false));
    });
    return () => {
      cancelAnimationFrame(firstFrame);
      cancelAnimationFrame(secondFrame);
    };
  }, [resettingSkills]);
  const skillNext = useCallback(() => setSkillPosition(i => i >= SKILLS.length && i < SKILLS.length * 2 ? i + 1 : i), []);
  const skillPrev = useCallback(() => setSkillPosition(i => i >= SKILLS.length && i < SKILLS.length * 2 ? i - 1 : i), []);
  const skillsSwipe = useSwipe(skillNext, skillPrev);
  return <section id="skills" className="p-[0_0_80px] bg-cream overflow-hidden">

        {/* Wave divider — blends portfolio's white/light-blue into skills' yellow */}
        <div className="[line-height:0] mb-[0]">
          <svg viewBox="0 0 1440 88" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="block w-full h-[clamp(48px,6vw,88px)]">
            <defs>
              <linearGradient id="waveGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#eaf6fb" />
                <stop offset="100%" stopColor="#f0f9ff" />
              </linearGradient>
            </defs>
            <path d="M0,0 C240,88 480,0 720,44 C960,88 1200,0 1440,44 L1440,0 L0,0 Z" fill="url(#waveGrad)" />
          </svg>
        </div>

        <div className="max-w-[1100px] [margin:60px_auto_0_auto] p-[0_5%]">
          <SectionHeading eyebrow="What I Do">Skills</SectionHeading>
        </div>

        {/* Carousel track — shows 3 cards on desktop, 1 on mobile */}
        <div className={`${styles["skills-carousel"]} relative`}>

          <button className={`${styles["skills-arrow"]} ${styles["skills-prev"]}`} type="button" aria-label="Previous skill category" onClick={skillPrev}>‹</button>
          {/* Sliding window */}
          <div {...skillsSwipe.handlers} className={`${styles["skills-window"]}`} data-dragging={skillsSwipe.dragging || undefined}>
            <div className="skills-track flex gap-[20px] will-change-transform" style={{
          transition: skillsSwipe.dragging || resettingSkills ? "none" : "transform 0.45s cubic-bezier(0.4,0,0.2,1)",
          transform: `translateX(calc(-${skillPosition} * (var(--skill-card-width) + 20px) + var(--skill-offset) + ${skillsSwipe.offset}px))`
        }}>
              {LOOP_SKILLS.map((cat, i) => {
            const dist = Math.abs(i - skillPosition);
            const isCurrent = dist === 0;
            const isAdj = dist === 1;
            return <div key={`${cat.category}-${i}`} aria-hidden={Math.floor(i / SKILLS.length) !== Math.floor(skillPosition / SKILLS.length) || undefined} className={`${styles["skills-card"]} shrink-0 w-[var(--skill-card-width)] bg-white rounded-[20px] select-none`} style={{
              border: isCurrent ? `2px solid ${cat.color}` : "1.5px solid #d8f0f8",
              boxShadow: isCurrent ? `0 8px 32px ${cat.color}33` : "0 2px 12px rgba(126,200,227,0.06)",
              opacity: isCurrent ? 1 : isAdj ? 0.7 : 0.35,
              transform: isCurrent ? "scale(1.02)" : "scale(0.97)",
              transition: resettingSkills ? "none" : "all 0.4s cubic-bezier(0.4,0,0.2,1)"
            }}>
                    {/* Header row */}
                    <div className="flex items-center gap-[12px] mb-[18px]">

                      <h3 className="font-display text-[18px] text-ink font-normal leading-[1.2]">{cat.category}</h3>
                    </div>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-[7px]">
                      {cat.items.map(item => <span key={item} style={{
                  background: cat.bg,
                  color: cat.color,
                  border: `1px solid ${cat.color}55`
                }} className="text-[13px] p-[5px_13px] rounded-[20px] font-medium leading-[1.4] tracking-[0.01em] max-w-full [overflow-wrap:anywhere] antialiased">{item}</span>)}
                    </div>
                  </div>;
          })}
            </div>
          </div>

          <button className={`${styles["skills-arrow"]} ${styles["skills-next"]}`} type="button" aria-label="Next skill category" onClick={skillNext}>›</button>
        </div>

        <div className={`${styles["skills-navigation"]}`}>
          <button className={`${styles["skills-mobile-arrow"]}`} type="button" aria-label="Previous skill category" onClick={skillPrev}>‹</button>
          <div className={`${styles["skills-dots"]}`}>
              {SKILLS.map((cat, i) => <button type="button" className={`${styles["skills-dot"]}`} aria-label={`Show ${cat.category} skills`} aria-current={skillIndex === i ? "true" : undefined} key={cat.category} onClick={() => setSkillPosition(SKILLS.length + i)}><span aria-hidden="true" style={{
            background: skillIndex === i ? SKILLS[skillIndex].color : undefined
          }} /></button>)}
          </div>
          <button className={`${styles["skills-mobile-arrow"]}`} type="button" aria-label="Next skill category" onClick={skillNext}>›</button>
        </div>
      </section>;
}
