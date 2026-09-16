# Angela Fei — Portfolio 2026

This working copy belongs to `angelafei/portfolio-2026-revamp`. The original `angelafei/portfolio-site-2026` repository is unchanged.

## Design

Restores the original portfolio design from `8a7641b`, then adds a My Journey section directly after the hero. The new section follows Angela's supplied image with a responsive timeline, line icons, paper plane, soft wave, and backgrounds that blend into the hero and About section.

Timeline dates, locations, and descriptions follow the supplied reference image. The View Experience link opens the original portfolio section.

## Development and preview

```sh
npm ci
npm run dev
npm run lint
npm run build
```

The static export is written to `dist/`. To preview the built site locally:

```sh
python3 -m http.server 4173 --bind 127.0.0.1 --directory dist
```

Open `http://127.0.0.1:4173/#journey`.

## Files

- `app/component/home.js`: original homepage with the journey inserted after the hero.
- `app/component/journey.js`: reference-image timeline content and SVG illustrations.
- `app/component/journey.module.css`: isolated responsive styles and background transitions.

Analytics stays opt-in via `NEXT_PUBLIC_GA_ID` to avoid adding local preview traffic to the original site's analytics. Updated dependency fixes from the previous revamp are retained.
