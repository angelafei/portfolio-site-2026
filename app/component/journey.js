import styles from './journey.module.css';

// Timeline copy follows the reference image supplied by Angela.
const milestones = [
  { year: '2010', place: 'UK', description: 'Study', icon: 'london' },
  { year: '2014', place: 'Taiwan', description: 'Dudoo POS', icon: 'taipei' },
  { year: '2016', place: 'UK', description: 'Sky / NowTV', icon: 'eye' },
  { year: '2019', place: 'Australia', description: 'Stackla', icon: 'australia' },
  { year: '2020', place: 'Taiwan', description: 'Trend Micro', icon: 'taipei' },
];

function JourneyIcon({ type }) {
  const clockTower = <g><path d="M29 80V32h18v48M27 32h22l-3-7H30ZM32 25V18h12v7l-6-12-6 12ZM38 13V6" /><circle cx="38" cy="42" r="6" /><path d="M38 38v4l3 2M33 53v22m5-22v22m5-22v22M29 58h18" /></g>;
  const icons = {
    london: <>{clockTower}<path d="M47 80V60h39v20M48 63h38M52 60v-8l4 8m8 0v-9l4 9m10 0v-8l4 8M51 70h31M54 66v14m8-14v14m8-14v14m8-14v14M24 80V65h-5v15" /></>,
    taipei: <><path d="M49 80h22l-3-12H52ZM52 68l-3-12h22l-3 12M52 56l-3-12h22l-3 12M53 44l-3-12h20l-3 12M55 32l-3-10h16l-3 10M57 22V14h6v8M60 14V4M57 14h6M54 75h12M55 63h10M55 51h10M56 39h8M57 28h6" /></>,
    eye: <><circle cx="48" cy="45" r="29" /><circle cx="48" cy="45" r="25" /><circle cx="48" cy="45" r="3" fill="#fffcf5" />{Array.from({length:12},(_,i)=>{const angle=i*Math.PI/6;const x=48+29*Math.cos(angle),y=45+29*Math.sin(angle);return <g key={i}><path d={`M48 45L${x} ${y}`} /><circle cx={x} cy={y} r="2.4" fill="#fffcf5" /></g>;})}<path d="M34 80 48 45l14 35M87 80V50h12v30M85 50h16l-8-12-8 12ZM93 38v-8M90 60h6m-6 6h6m-6 6h6" /></>,
    australia: <><path d="M14 78h92v5H12ZM22 75Q23 57 17 50q24 3 35 25ZM38 75Q42 49 29 31q31 7 43 44ZM58 75Q65 46 53 20q29 12 37 55ZM76 75Q91 53 103 53q1 14-8 22ZM17 50l35 25M29 31l43 44M53 20l37 55M86 59l17-6" fill="#fffcf5" /></>,
  };
  return <svg viewBox="0 0 120 92" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="58" cy="46" r="32" fill="#fff0a8" stroke="none" opacity=".8" />
    <path d="M8 80q0-10 8-9-2-12 8-12 8 0 7 12 10-5 13 8h37q3-11 10-7-1-13 8-13 9 0 8 12 8-2 8 9Z" fill="#a8cdb7" stroke="none" />
    <path d="M17 80V68m-4 3 4 3 4-4M100 80V68m-4 3 4 4 4-3" stroke="#6b9e8e" />
    {icons[type]}
    <path d="M10 33H27q3-5-3-6-2-8-8-3-6-2-6 4-6 0-5 5Z" fill="#f8fcff" />
    <path d="M7 83h108" stroke="#90b8b6" />
  </svg>;
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
