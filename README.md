# Uppercut Labs Explainers

A single Astro project deployed to the existing Cloudflare Worker:

- Worker: `explainers`
- Public hostname: `explainers.uppercut-labs.workers.dev`
- Production branch: `main`

## Current routes

- `/`
- `/ai-gamedev-compatibility`
- `/ai-gamedev-compatibility-claude`
- `/ai-gamedev-compatibility-gemini`
- `/async-python`
- `/astro`

## Project structure

- `public/` contains the existing, already-compiled explainers. Astro copies these files into the final build unchanged.
- `src/pages/` contains Astro routes.
- `src/components/` contains interactive React/TSX components used by Astro pages.
- `wrangler.jsonc` deploys Astro's `dist/` output to the existing `explainers` Worker.

## Cloudflare Workers Builds settings

Connect `devin-thomas/explainers` from the existing Worker's **Settings → Builds** screen.

Use:

- Production branch: `main`
- Root directory: `/`
- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Preview deploy command: `npx wrangler versions upload`

The Worker name in Cloudflare and the `name` in `wrangler.jsonc` must both remain `explainers`.

## Local development

```bash
npm install
npm run dev
```

## Manual deployment

```bash
npm run build
npx wrangler deploy
```

Manual deployment is optional after GitHub is connected to Workers Builds.

## Adding another Astro/React explainer

1. Place the React component in `src/components/ExampleExplainer.tsx`.
2. Add an Astro page such as `src/pages/example.astro`.
3. Render interactive components with a client directive, for example:

```astro
---
import ExampleExplainer from "../components/ExampleExplainer";
---

<ExampleExplainer client:load />
```

4. Add the route to `public/index.html`.
5. Commit and push to `main`; Cloudflare builds and deploys it automatically.

## Catalog controls and navigation

The catalog supports title search and featured/A–Z/Z–A sorting. Each explainer has a lightweight home link placed after its application root so it cannot interfere with app mounting. The control deliberately avoids `backdrop-filter` and other costly compositing effects.


## Branding and PWA

The supplied work-in-progress logo is versioned at:

- `design/branding/explainers-icon-v1.png`

Generated production assets live in:

- `public/brand/` — optimized homepage branding
- `public/icons/` — favicon, Apple touch icon, standard PWA icons, and a maskable icon
- `public/site.webmanifest` — app identity, colors, scope, and route shortcuts
- `public/pwa.js` — non-blocking install-prompt and service-worker registration
- `public/sw.js` — minimal service-worker lifecycle setup

The service worker intentionally has no `fetch` handler. It does not proxy, cache, or delay page requests, and it cannot serve stale explainer builds. Offline caching can be added later as a separate, deliberate feature.

The installed app identity is **Uppercut Labs Explainers**, with the short label **Explainers**.
