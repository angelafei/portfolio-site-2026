# Angela Fei — Portfolio

A responsive personal portfolio presenting my career journey, selected projects, and technical skills. Built with Next.js App Router and React, and exported as a static website.

## Run locally

Requires Node.js 20.9 or newer and npm. The lockfile records the dependency versions used by the project.

```sh
npm ci
npm run dev
```

Open http://localhost:3000.

## Validate and build

```sh
npm run lint
npm run build
```

ESLint checks source files with Next.js Core Web Vitals rules and treats warnings as failures. Generated output is excluded. The build exports the website to `dist/`; deploy that directory to a static host at the domain root. This project does not use `next start`, API routes, or a running application server.

To preview the export (requires Python 3):

```sh
python3 -m http.server 4173 --bind 127.0.0.1 --directory dist
```

Open http://127.0.0.1:4173. Production builds explicitly use webpack: with the current Next.js/Tailwind setup, the Turbopack export omitted custom theme utilities even though the build succeeded. `npm run build` also checks the CSS linked by the exported HTML for the portfolio's theme utilities and decorative keyframes. Keep Render's build command as `npm ci && npm run build` and publish directory as `dist`.

## Project structure

- `app/page.js` and `app/layout.js`: route, metadata, and optional analytics.
- `app/content/portfolio.js`: navigation labels, project details, and skills.
- `app/component/home.js`: server-rendered homepage composition.
- `app/component/site-navigation.js`, `hero.js`, and `skills-carousel.js`: isolated interactive sections.
- `app/component/about.js`, `selected-projects.js`, `site-footer.js`, and `section-heading.js`: content sections and shared typography.
- `app/component/navigation-state.js`: shared mobile menu state, preserving dismissal when View Work is activated.
- `app/hooks/use-swipe.js`: pointer gesture handling for the skills carousel.
- `app/component/journey.js`: career timeline and decorative SVG illustrations.
- `app/component/projects-carousel.js`: responsive project browsing with touch, mouse drag, and arrow keys.
- `app/component/case-studies.js`: native modal dialog with focus restoration and Escape dismissal.
- `app/globals.css`: Tailwind v4, shared palette/font tokens, and global accessibility defaults.
- `app/home.css`: existing decorative keyframes and base reset.
- Component CSS Modules: scoped hover states, responsive exceptions, timeline illustrations, and carousel/dialog behavior.
- `public/images/`: project screenshots used on the page.

## Implementation decisions

- **Static export:** the portfolio is content-driven and needs no backend. Contact links open an email client.
- **React state for interactions:** navigation, skills selection, and project dialogs run on the client; the initial content is still generated at build time.
- **Native browser primitives:** CSS scroll snapping and `<dialog>` provide carousel and modal behavior without a UI library.
- **Accessibility:** semantic navigation links, keyboard-operable controls, a skip link, visible focus indicators, and reduced-motion styles. These are implementation features, not a claim of a full accessibility audit.
- **Images:** `next/image` reserves space with a fixed aspect-ratio container and selects pre-generated WebP sizes through a custom loader, without a server image API. `predev` and `prebuild` generate 360/480/640/960/1440px variants in the ignored `public/images/responsive/` directory using Sharp. Keep originals in `public/images/`; use `npm run dev` or `npm run build` so variants are generated first.
- **Case studies:** dialog code and styles load when a case-study button is first activated, keeping them out of the initial page bundle.
- **Server/client boundaries:** homepage composition, About, selected-work framing, footer, and timeline stay server-rendered. Client components own pointer motion, navigation, carousels, and dialogs; server-rendered children pass through the navigation provider.
- **Styling:** Tailwind utilities handle static layout and typography, using the existing values rather than approximating them to a new spacing scale. CSS Modules retain specialized responsive and interaction rules. Inline styles are limited to data-driven category colors, gesture offsets, and animation state; dynamic Tailwind class names are not assembled at runtime.
- **Visual preservation:** the styling refactor was compared against the previous source at 390×844, 768×1024, 1280×900, and 1920×1080. Static computed styles and animation timing were compared separately from continuously changing animation frames.
- **Fonts:** Google Fonts loads in the browser with local fallback fonts, so the build does not depend on fetching fonts.

## Optional analytics

Analytics is disabled by default. To enable it, set `NEXT_PUBLIC_GA_ID=G-YOUR_MEASUREMENT_ID` in `.env.local` before building. This is a public measurement ID, not a secret. Environment files are ignored by Git; changing the ID requires a rebuild.

## Review checklist

- Check navigation and project layouts at desktop and mobile widths.
- Use Tab/Enter for navigation, skills controls, and case-study buttons.
- Use arrow keys on the project track and test touch scrolling on mobile.
- Open a case study, dismiss with Escape, and confirm focus returns to its trigger.
- Enable reduced motion and check that decorative animations stop.
- Confirm that project descriptions, employment dates, and links accurately represent your work.

Project screenshots and company names illustrate previous work; they are not an open-source license for the depicted products. This repository contains the portfolio implementation, not employer source code.
