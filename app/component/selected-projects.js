import SectionHeading from './section-heading';
import { PROJECTS } from '../content/portfolio';
import ProjectsCarousel from './projects-carousel';
export default function SelectedProjects() {
  return <section id="portfolio" className="p-[72px_0_80px] bg-panel">
        <div className="max-w-[1100px] mx-auto my-0 p-[0_5%]">
          <SectionHeading eyebrow="My Work">Selected Projects</SectionHeading>

          <ProjectsCarousel projects={PROJECTS} />
        </div>
      </section>;
}
