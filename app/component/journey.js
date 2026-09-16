import styles from './journey.module.css';

// Timeline copy follows the reference image supplied by Angela.
const milestones = [
  { year: '2010', place: 'UK', description: 'Study', icon: 'london' },
  { year: '2014', place: 'Taiwan', description: 'Dudoo POS', icon: 'plant' },
  { year: '2016', place: 'UK', description: 'Sky / NowTV', icon: 'cloud' },
  { year: '2019', place: 'Australia', description: 'Stackla', icon: 'australia' },
  { year: '2020', place: 'Taiwan', description: 'Trend Micro', icon: 'laptop' },
];

function JourneyIcon({ type }) {
  const icons = {
    london: <><path d="M22 52V25h20v27M20 25h24M24 20h16l-8-11-8 11ZM28 12V7h8v5M32 7V3M24 47h16M27 52v-5m10 5v-5M24 20v5m16-5v5" /><circle cx="32" cy="34" r="6" /><path d="M32 30v4l3 2M27 43h10" /></>,
    australia: <><path d="m8 42 10-3 9-12 9 1 5-6 2-10 3 5 4-1 4 5-6 2-2 9-7 6-3 7 7 4-8 1-6-7 3-8-8 6-9 4-12-1Z" fill="#b3e0ec" /><path d="m39 32 6 2 4-2m-7-18 1-5m3 12h1M29 43l-3 8h8" /></>,
    cloud: <><path d="M15 46h33a10 10 0 0 0 0-20 14 14 0 0 0-27-5 12 12 0 0 0-6 25Z" fill="#f8fcf2" /><path d="M16 43h29" opacity=".3" /></>,
    laptop: <><path d="M12 16h40v29H12z" fill="#d5f1f8" /><path d="M16 20h32v21H16z" fill="#ecfaff" /><path d="m32 20-16 21h11l21-21" stroke="none" fill="#bde8f4" opacity=".7" /><path d="m12 45-5 6h50l-5-6M26 46h12" /></>,
    plant: <><path d="M31 53V27M31 39l-7-9M32 34l9-12" /><path d="M30 34C16 35 11 22 12 14c12 0 19 7 18 20Z" fill="#f4e9a1" /><path d="M32 32c-1-15 10-20 20-18-1 12-8 20-20 18Z" fill="#d9e8b0" /><path d="m15 18 13 13m7-3 13-11" /></>,
  };
  return <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{icons[type]}</svg>;
}

export default function Journey() {
  return (
    <section id="journey" className={styles.journey} aria-labelledby="journey-title">
      <svg className={styles.topWave} viewBox="0 0 1440 100" preserveAspectRatio="none" aria-hidden="true">
        <defs><linearGradient id="journey-sky" x1="0" y1="0" x2="1" y2="0"><stop stopColor="#b2e8ea" /><stop offset="1" stopColor="#b2e8ea" /></linearGradient></defs>
        <path d="M0 0H1440V38C1250-25 1130 14 930 55S550 100 340 42 90 18 0 65Z" fill="url(#journey-sky)" />
      </svg>
      <span className={`${styles.dot} ${styles.sun}`} aria-hidden="true" />
      <span className={`${styles.dot} ${styles.dotOne}`} aria-hidden="true" />
      <span className={`${styles.dot} ${styles.dotTwo}`} aria-hidden="true" />
      <span className={`${styles.dot} ${styles.dotThree}`} aria-hidden="true" />
      <div className={styles.inner}>
        <div className={styles.intro}>
          <p className={styles.eyebrow}>MY JOURNEY</p>
          <h2 id="journey-title">From Code<br />to Greater Impact</h2>
          <p className={styles.description}>Across different roles and industries, I’ve always been passionate about using technology to solve real problems and create positive impact.</p>
          <a className={styles.experienceLink} href="#portfolio">View Experience <span aria-hidden="true">→</span></a>
        </div>
        <div className={styles.timelineArea}>
          <ol className={styles.timeline} aria-label="My career journey">
            {milestones.map(item => <li key={item.year} className={styles.milestone}>
              <span className={styles.icon}><JourneyIcon type={item.icon} /></span>
              <span className={styles.marker} aria-hidden="true" />
              <div className={styles.milestoneCopy}><p className={styles.year}>{item.year}</p><h3>{item.place}</h3><p className={styles.role}>{item.description}</p></div>
            </li>)}
          </ol>
          <svg className={styles.flight} viewBox="0 0 180 110" fill="none" aria-hidden="true">
            <path d="M1 91C43 91 62 110 93 85S128 46 111 48c-20 3 3 45 30 6" stroke="#87cae2" strokeWidth="1.6" strokeDasharray="6 7" strokeLinecap="round" />
            <g stroke="#4e98bb" strokeWidth="1.7" strokeLinejoin="round"><path d="m117 31 57-24-24 47-12-16-11 10 2-18-12 1Z" fill="#e9f7f8" /><path d="m129 30 45-23-36 31m-11 10 11-10" /><path d="m138 38 36-31-24 47" fill="#d9eff5" fillOpacity=".55" /></g>
          </svg>
          <p className={styles.handwritten}>Different places<br /><span>A more open me</span><svg viewBox="0 0 50 16" aria-hidden="true"><path d="m3 11 36-8M13 14 34 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg></p>
        </div>
      </div>
      <svg className={styles.leaves} viewBox="0 0 120 130" aria-hidden="true"><g strokeLinecap="round"><path d="M17 115C3 79 26 45 35 21c14 8 7 56-18 94Z" fill="#bce7f5" /><path d="M16 119 36 37" stroke="#85c9e6" fill="none" strokeWidth="1.6" /><path d="M18 96 9 82m14 0 12-11M28 62l-3-11" stroke="#85c9e6" fill="none" /><path d="M40 114C29 92 49 64 63 62c10 12-5 39-23 52Z" fill="#f5efb2" /><path d="m37 123 23-54" stroke="#dcd38c" strokeWidth="1.5" /><path d="M91 125c-1-21-17-39-28-42-2 19 12 37 28 42Z" fill="#d6e8cc" /><path d="m92 128-22-36" stroke="#96c8c6" strokeWidth="1.5" /></g></svg>
    </section>
  );
}
