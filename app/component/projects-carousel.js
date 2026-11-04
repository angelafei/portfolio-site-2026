'use client';

import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import styles from './projects.module.css';
const CaseStudyDialog = dynamic(() => import('./case-studies'));

const imageLoader = ({ src, width }) => `/images/responsive/${src.split('/').pop().replace(/\.[^.]+$/, '')}-${width}.webp`;

function currentPage(element, count, total) {
  const lastPage = Math.ceil(total / count) - 1;
  const maximum = element.scrollWidth - element.clientWidth;
  // The final page can be shorter than a full stride for odd project counts.
  if (maximum > 0 && element.scrollLeft >= maximum - 2) return lastPage;
  const step = element.clientWidth + parseFloat(getComputedStyle(element).columnGap);
  return Math.max(0, Math.min(lastPage, Math.round(element.scrollLeft / step)));
}

export default function ProjectsCarousel({ projects }) {
  const track = useRef(null);
  const drag = useRef(null);
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(2);
  const [caseStudy, setCaseStudy] = useState(null);
  const pages = Math.ceil(projects.length / perPage);
  const firstVisible = Math.min(page * perPage, Math.max(0, projects.length - perPage));

  const stride = () => track.current.clientWidth + parseFloat(getComputedStyle(track.current).columnGap);
  const goTo = (next) => {
    const destination = Math.max(0, Math.min(pages - 1, next));
    track.current.scrollTo({ left: destination * stride(), behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  };

  useEffect(() => {
    const element = track.current;
    const observer = new ResizeObserver(() => {
      const count = window.matchMedia('(max-width: 700px)').matches ? 1 : 2;
      setPerPage(count);
      const step = element.clientWidth + parseFloat(getComputedStyle(element).columnGap);
      const current = currentPage(element, count, projects.length);
      element.scrollTo({ left: current * step, behavior: 'instant' });
      setPage(current);
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, [projects.length]);

  const endDrag = (event) => {
    if (!drag.current) return;
    const distance = track.current.scrollLeft - drag.current.scroll;
    const targetPage = drag.current.page + (Math.abs(distance) > 60 ? Math.sign(distance) : 0);
    drag.current = null;
    track.current.style.scrollSnapType = '';
    track.current.style.cursor = '';
    if (track.current.hasPointerCapture(event.pointerId)) track.current.releasePointerCapture(event.pointerId);
    goTo(targetPage);
  };

  return <div className={styles.carousel} role="region" aria-roledescription="carousel" aria-label="Selected projects">
    <div className={styles.grid} ref={track} tabIndex={0} aria-label="Swipe or use the arrow keys to explore projects"
      onScroll={() => setPage(currentPage(track.current, perPage, projects.length))}
      onKeyDown={event => {
        if (event.target !== event.currentTarget) return;
        if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); goTo(page + (event.key === 'ArrowRight' ? 1 : -1)); }
      }}
      onDragStart={event => event.preventDefault()}
      onPointerDown={event => {
        if (event.pointerType !== 'mouse' || event.button !== 0 || event.target.closest('a, button')) return;
        drag.current = { x: event.clientX, scroll: track.current.scrollLeft, page };
        track.current.style.scrollSnapType = 'none';
        track.current.style.cursor = 'grabbing';
        track.current.setPointerCapture(event.pointerId);
      }}
      onPointerMove={event => { if (drag.current) track.current.scrollLeft = drag.current.scroll - (event.clientX - drag.current.x); }}
      onPointerUp={endDrag} onPointerCancel={endDrag}>
      {projects.map((project, index) => <article key={project.title} className={styles.card} aria-roledescription="slide" aria-label={`${index + 1} of ${projects.length}: ${project.title}`}>
        <div className={styles.image} style={{ background: `linear-gradient(135deg,${project.color}55,${project.color}22)` }}>
          <Image loader={imageLoader} src={project.src} alt={project.alt} fill sizes="(max-width: 700px) 90vw, (max-width: 1100px) 44vw, 480px" loading="lazy" style={{ objectFit: project.isPhoto ? 'contain' : 'cover', objectPosition: 'left top' }} />
        </div>
        <div className={styles.copy}><h3>{project.title}</h3>
          <p className={styles.context}>{project.context}</p>
          <ul className={styles.tags} aria-label="Skills and technologies">
            {project.tags.map(tag => <li key={tag}>{tag}</li>)}
          </ul>
          <button className={styles.link} type="button" aria-haspopup="dialog" aria-label={`View Details: ${project.title}`} onClick={event => { event.currentTarget.focus(); setCaseStudy(project); }}>View Details <span aria-hidden="true">↗</span></button>
        </div>
      </article>)}
    </div>
    <div className={styles.controls}>
      <button className={styles.arrow} type="button" onClick={() => goTo(page - 1)} disabled={page === 0} aria-label="Previous projects">‹</button>
      <div className={styles.pagination}>
        <div className={styles.dots}>{Array.from({ length: pages }, (_, index) => <button type="button" key={index} className={styles.dot} aria-label={`Go to project page ${index + 1}`} aria-current={index === page ? 'true' : undefined} onClick={() => goTo(index)}><span /></button>)}</div>
        <p className={styles.counter} aria-live="polite">{perPage === 1 ? page + 1 : `${firstVisible + 1}–${Math.min(firstVisible + perPage, projects.length)}`} / {projects.length} projects</p>
      </div>
      <button className={styles.arrow} type="button" onClick={() => goTo(page + 1)} disabled={page === pages - 1} aria-label="Next projects">›</button>
    </div>
    {caseStudy && <CaseStudyDialog project={caseStudy} onClose={() => setCaseStudy(null)} />}
  </div>;
}
