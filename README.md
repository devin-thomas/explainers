# Uppercut Labs Explainers

A single Astro project deployed to the existing Cloudflare Worker:

- Worker: `explainers`
- Public hostname: `explainers.uppercut-labs.workers.dev`
- Production branch: `main`

## Catalog routes

- `/`
- `/free-zapier-alternatives`
- `/obsidian-on-servers`
- `/npm-and-npx`
- `/publish-a-website`
- `/figma-basics`
- `/async-python`
- `/ai-gamedev-compatibility-claude`
- `/astro`
- `/ai-gamedev-compatibility-gemini`
- `/ai-gamedev-compatibility`

The homepage defaults to **Newest first**, using each card's explicit `data-published` timestamp. It also supports oldest-first and alphabetical sorting.

## Project structure

- `public/index.html` is the sole homepage and catalog source.
- `public/` contains self-contained static explainers and shared assets. Astro copies them into the build.
- `src/pages/` contains Astro-owned routes.
- `src/components/` contains Astro and React components used by Astro-owned routes.
- `scripts/check-route-ownership.mjs` rejects duplicate route ownership, owned routes missing from the catalog, catalog links without owners, and duplicate catalog links.
- `scripts/normalize-explainer-pages.mjs` applies the title and navigation contract to older self-contained pages after Astro builds.
- `docs/adr/0001-explainer-route-and-catalog-contract.md` is the authoritative explainer publishing contract.
- `wrangler.jsonc` deploys Astro's `dist/` output to the existing `explainers` Worker.

There is intentionally no root-level `index.html`; keeping the homepage only in `public/index.html` prevents two catalog copies from drifting apart.

## Route ownership rule

A route must use exactly one source form:

- Static: `public/example/index.html`
- Astro: `src/pages/example.astro`

Never create both. `npm run build` fails before Astro starts when ownership collides.

Every owned explainer route must also appear exactly once in the homepage catalog, and every catalog link must resolve to an owned route.

## Page identity rule

The catalog title, visible page `h1`, document title, and `og:title` use the same canonical title. Expressive lines belong underneath as subtitles.

Catalog cards use normal selectable text. Only the explicit **Open explainer** control is a link.

Return navigation is branded, top-left, and part of normal document flow. It must not be fixed or sticky.

## Interactive Astro pages

Full-page React explainers render meaningful HTML during the Astro build and then hydrate with `client:load`:

```astro
---
import ExampleExplainer from "../components/ExampleExplainer";
import ExplainerPageIntro from "../components/ExplainerPageIntro.astro";
---

<body class="explainer-page-with-intro">
  <ExplainerPageIntro
    title="Canonical Catalog Title"
    hook="A supporting line that explains the page's angle."
  />
  <ExampleExplainer client:load />
</body>
```

Do not use `client:only` for an entire explainer unless a separate ADR explains why server rendering is impossible and the page provides a complete non-JavaScript fallback.

## Build lifecycle

```bash
npm install
npm run build
```

`npm run build` automatically runs:

1. `prebuild` — route ownership and catalog completeness validation
2. `build` — Astro/Vite production build
3. `postbuild` — normalization of legacy static pages

GitHub Actions runs the same production build for pull requests and pushes to `main`.

## Local development

```bash
npm install
npm run dev
```

## Cloudflare Workers Builds settings

Connect `devin-thomas/explainers` from the existing Worker's **Settings → Builds** screen.

Use:

- Production branch: `main`
- Root directory: `/`
- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Preview deploy command: `npx wrangler versions upload`

The Worker name in Cloudflare and the `name` in `wrangler.jsonc` must both remain `explainers`.

## Manual deployment

```bash
npm run build
npx wrangler deploy
```

Manual deployment is optional after GitHub is connected to Workers Builds.

## Adding an explainer

1. Choose one route owner: `public/` or `src/pages/`.
2. Use the same canonical title in the catalog and destination `h1`.
3. Add a selectable `<article class="card">` to `public/index.html` with a separate link and an ISO `data-published` timestamp.
4. Use in-flow branded return navigation.
5. For React, prefer server-rendered output plus `client:load`.
6. Run `npm run build`; the route/catalog validator must report the new route exactly once.

## Branding and PWA

- `design/branding/explainers-icon-v1.png` — source branding asset
- `public/brand/` — optimized homepage branding
- `public/icons/` — favicon, Apple touch icon, PWA icons, and maskable icon
- `public/site.webmanifest` — app identity, colors, scope, and shortcuts
- `public/pwa.js` — non-blocking install-prompt and service-worker registration
- `public/sw.js` — minimal service-worker lifecycle setup

The service worker intentionally has no `fetch` handler. It does not proxy, cache, delay requests, or serve stale explainer builds.
