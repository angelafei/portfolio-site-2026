'use client';

import { useNavigation } from './navigation-state';
import { NAV_ITEMS } from '../content/portfolio';
import styles from "./site-navigation.module.css";
export default function SiteNavigation() {
  const { menuOpen, setMenuOpen } = useNavigation();
  return <nav aria-label="Main navigation" className="fixed top-0 left-0 right-0 [z-index:200] p-[14px_24px] flex justify-between items-center [background:rgba(100,196,228,0.30)] [backdrop-filter:blur(14px)]">
        <span className="font-display text-[20px] text-white tracking-[0.01em] shrink-0">
          Angela Fei
        </span>

        {/* Desktop nav */}
        <div className={`${styles["nav-desktop"]} flex gap-[28px]`}>
          {NAV_ITEMS.map(item => item.toLowerCase() === 'contact' ? <a key={item} className={`${styles["nav-link"]}`} href="mailto:future2931@gmail.com">{item}</a> : <a key={item} className={`${styles["nav-link"]}`} href={`#${item === "About" ? "journey" : item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{item}</a>)}
        </div>

        {/* Hamburger (mobile) */}
        <button type="button" className={`${styles["hamburger"]}`} aria-label="Toggle navigation" aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(!menuOpen)}>
          <span style={{
        transform: menuOpen ? "rotate(45deg) translate(5px,5px)" : "none"
      }} />
          <span style={{
        opacity: menuOpen ? 0 : 1
      }} />
          <span style={{
        transform: menuOpen ? "rotate(-45deg) translate(5px,-5px)" : "none"
      }} />
        </button>

        {/* Mobile dropdown */}
        {menuOpen && <div id="mobile-navigation" className={`${styles["nav-mobile-menu"]}`} onKeyDown={event => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        event.currentTarget.previousElementSibling.focus();
      }
    }}>
            {NAV_ITEMS.map(item => item.toLowerCase() === 'contact' ? <a key={item} className={`${styles["nav-link"]}`} href="mailto:future2931@gmail.com">{item}</a> : <a key={item} className={`${styles["nav-link"]}`} href={`#${item === "About" ? "journey" : item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{item}</a>)}
          </div>}
      </nav>;
}
