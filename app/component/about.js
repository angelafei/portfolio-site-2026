import { SectionEyebrow } from './section-heading';
import styles from "./about.module.css";
export default function About() {
  return <section id="about" className="p-[90px_5%_72px] max-w-[1100px] mx-auto my-0">
        <div className={`${styles["about-grid"]} grid [grid-template-columns:1fr_1fr] gap-[64px] items-center`}>

          {/* Text side */}
          <div>
            <SectionEyebrow>About Me</SectionEyebrow>
            <h2 className="font-display text-[clamp(26px,4vw,42px)] text-ink font-normal leading-[1.25] mb-[22px]">
              Bridging design, code, <br /> and user experience.
            </h2>
            <p className="text-[15px] text-muted leading-[1.85] mb-[14px]">
              Hi there! I&#39;m a front-end / software and digital experience professional based in Taipei, with experience in website development, interactive design, SEO improvement, and user experience optimization.
            </p>
            <p className="text-[15px] text-muted leading-[1.85]">
              I enjoy creating user-friendly websites and digital experiences that are visually polished, easy to use, and aligned with both business goals and user needs.
            </p>
            <div className="flex gap-[28px] mt-[32px] flex-wrap">
              {[["10+", "Years Exp."], ["20+", "Projects"], ["40+", "Countries Visited"]].map(([num, label]) => <div key={label}>
                  <div className="font-display text-[34px] text-sky leading-none">{num}</div>
                  <div className="text-[12px] text-subtle mt-[4px] font-medium">{label}</div>
                </div>)}
            </div>
          </div>

          {/* Avatar side — fixed square so it stays circular on mobile */}
          <div className={`${styles["about-avatar"]} relative w-full max-w-[360px]`}>
            {/* Square container → blob-shaped via borderRadius */}
            <div className="w-full [padding-bottom:100%] relative rounded-[42%_58%_55%_45%/45%_50%_50%_55%] [background:linear-gradient(135deg,#a8e4f5_0%,#c8f0ea_100%)] [animation:blobMove_8s_ease-in-out_infinite]">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[62%] h-[62%] rounded-full [background:rgba(255,255,255,0.55)] flex items-center justify-center">
                  <span className="font-display text-[clamp(32px,6vw,52px)] text-sky">AF</span>
                </div>
              </div>
            </div>

            {/* Decorative rings — vw-based size so they don't disappear on mobile */}
            <div className="absolute [top:-6%] [right:-6%] w-[clamp(40px,8vw,60px)] h-[clamp(40px,8vw,60px)] rounded-full [border:clamp(4px,1vw,7px)_solid_#f9e784] [opacity:0.85] [animation:float0_3s_ease-in-out_infinite]" />
            <div className="absolute [bottom:8%] [left:-6%] w-[clamp(24px,5vw,38px)] h-[clamp(24px,5vw,38px)] rounded-full bg-butter [opacity:0.75] [animation:float1_4s_ease-in-out_infinite]" />
            <div className="absolute [top:38%] [right:-8%] w-[clamp(14px,3vw,22px)] h-[clamp(14px,3vw,22px)] rounded-full bg-sky [opacity:0.6] [animation:float2_5s_ease-in-out_infinite_1s]" />
          </div>
        </div>
      </section>;
}
