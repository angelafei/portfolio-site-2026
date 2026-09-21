'use client';

import { useEffect, useRef } from 'react';
import styles from './case-studies.module.css';

const CASES = {
  'now-tv': {
    company: 'NOW TV',
    scope: 'Seamless Web · Web & desktop apps',
    problem: 'The Seamless Web work focused on improving the overall user journey and experience. I worked on product features alongside shared components used across devices, including Apple TV, LG and Samsung.',
    actions: [
      'I helped develop Seamless Web and new product features. When shared components needed an update or a fix, we branched the shared code to make those changes. Sky and NOW TV also shared token mechanisms.',
      'My work included unit tests, integration tests using WebDriver, CI/CD, and releasing updates to the web and desktop apps.',
    ],
    impact: 'I helped improve the flow and experience of Seamless Web and bring product features through testing to release on web and desktop.',
  },
  'trend-micro': {
    company: 'Trend Micro',
    scope: 'U.S. corporate website · AEM, SEO & analytics',
    problem: 'Marketing regularly requested updates to the U.S. website. Before implementation, we needed to understand what the existing AEM platform could support and where new components would be needed.',
    actions: [
      'I met with marketing and designers to discuss the requirements and AEM’s capabilities. Once the designs were ready, I updated the pages. For work that needed new AEM components, I documented the requirements for the U.S. developer team to build.',
      'Before launch, I added the tracking marketing needed in Google Analytics / GA4 and GTM, and updated SEO details such as page titles and descriptions. After launch, I built dashboards and tables in Google Sheets to keep tracking the data.',
    ],
    impact: 'Marketing’s requirements went live on the U.S. website with the requested tracking and SEO metadata in place. The Google Sheets dashboards supported continued monitoring after launch.',
  },
};

export default function CaseStudyDialog({ studyId, onClose }) {
  const dialogRef = useRef(null);
  const backdropPress = useRef(false);
  const study = CASES[studyId];

  useEffect(() => {
    if (!study) return;
    const dialog = dialogRef.current;
    const trigger = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    dialog.scrollTop = 0;
    document.body.style.overflow = 'hidden';
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      if (trigger?.isConnected) trigger.focus({ preventScroll: true });
    };
  }, [study]);

  return <dialog ref={dialogRef} className={styles.dialog} aria-labelledby="case-study-title" aria-describedby="case-study-scope" onClose={onClose}
    onPointerDown={event => { backdropPress.current = event.target === event.currentTarget; }}
    onClick={event => { if (backdropPress.current && event.target === event.currentTarget) dialogRef.current.close(); }}>
    {study && <article className={styles.paper}>
      <div className={styles.toolbar}>
        <span>Mini case study</span>
        <button type="button" onClick={() => dialogRef.current.close()} aria-label="Close case study">Close <span aria-hidden="true">×</span></button>
      </div>
      <header className={styles.header}>
        <h2 id="case-study-title">{study.company}</h2>
        <p id="case-study-scope">{study.scope}</p>
      </header>
      <div className={styles.story}>
        <section><h3>Problem</h3><p>{study.problem}</p></section>
        <section><h3>What I did</h3><div>{study.actions.map(action => <p key={action}>{action}</p>)}</div></section>
        <section><h3>Impact</h3><p>{study.impact}</p></section>
      </div>
    </article>}
  </dialog>;
}
