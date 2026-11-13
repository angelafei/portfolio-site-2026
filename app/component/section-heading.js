/** Shared typography; the caller controls the surrounding layout. */
export function SectionEyebrow({ children, centered = false }) {
  return <p className={`text-sky font-semibold text-[12px] tracking-[0.14em] mb-[12px] uppercase${centered ? ' text-center' : ''}`}>{children}</p>;
}

export default function SectionHeading({ eyebrow, children }) {
  return <>
    <SectionEyebrow centered>{eyebrow}</SectionEyebrow>
    <h2 className="font-display text-[clamp(24px,3.5vw,38px)] text-ink font-normal text-center mb-[44px]">{children}</h2>
  </>;
}
