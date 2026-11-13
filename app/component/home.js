import { NavigationProvider } from './navigation-state';
import SiteNavigation from './site-navigation';
import Hero from './hero';
import About from './about';
import SelectedProjects from './selected-projects';
import SkillsCarousel from './skills-carousel';
import SiteFooter from './site-footer';

export default function Home({ journey }) {
 return <NavigationProvider><div className="font-body bg-page overflow-x-hidden">
   <a className="skip-link" href="#main-content">Skip to content</a>
   <SiteNavigation />
   <main id="main-content">
     <Hero />
     {journey}
     <About />
     <SelectedProjects />
     <SkillsCarousel />
   </main>
   <SiteFooter />
 </div></NavigationProvider>;
}
