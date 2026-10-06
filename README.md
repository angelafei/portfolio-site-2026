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

Open http://127.0.0.1:4173. If an environment cannot run Turbopack's worker processes, `npm run build -- --webpack` uses the alternative Next.js build pipeline.

## Project structure

- `app/page.js` and `app/layout.js`: route, metadata, and optional analytics.
- `app/content/portfolio.js`: navigation labels, project details, and skills.
- `app/component/home.js`: homepage composition and interactive hero/navigation/skills.
- `app/component/journey.js`: career timeline and decorative SVG illustrations.
- `app/component/projects-carousel.js`: responsive project browsing with touch, mouse drag, and arrow keys.
- `app/component/case-studies.js`: native modal dialog with focus restoration and Escape dismissal.
- `app/globals.css`, `app/home.css`, and component CSS Modules: global defaults, homepage styling, and component-specific styles.
- `public/images/`: project screenshots used on the page.

## Implementation decisions

- **Static export:** the portfolio is content-driven and needs no backend. Contact links open an email client.
- **React state for interactions:** navigation, skills selection, and project dialogs run on the client; the initial content is still generated at build time.
- **Native browser primitives:** CSS scroll snapping and `<dialog>` provide carousel and modal behavior without a UI library.
- **Accessibility:** semantic navigation links, keyboard-operable controls, a skip link, visible focus indicators, and reduced-motion styles. These are implementation features, not a claim of a full accessibility audit.
- **Images:** `next/image` reserves space with a fixed aspect-ratio container. Server image optimization is disabled for static hosting; screenshots are served as committed.
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
