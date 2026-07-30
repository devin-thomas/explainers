# Explainers Repository Consistency Audit

- **Audit date:** July 24, 2026
- **Repository:** `devin-thomas/explainers`
- **Default branch:** `main`
- **Audited baseline:** commit `d09cadc3edc0cc0091c703e621dde453d66e2fae`
- **Production hostname:** `explainers.uppercut-labs.workers.dev`
- **Cloudflare Worker:** `explainers`
- **Package version:** `1.4.0`
- **Build system:** Astro 5, React 19, Cloudflare Workers static deployment

## Executive assessment

The repository has a strong publishing foundation but does not yet have a complete explainer platform.

The route and catalog contract is substantially stronger than the visual, content, and authoring contracts. The repository already prevents duplicate route ownership, requires every route to appear in the catalog, normalizes selected legacy pages, and runs the production build in GitHub Actions. It does not yet provide one canonical metadata registry, one reusable page layout, one shared design-token layer, one content-completeness standard, or a clear boundary between active source, generated output, and retained reference files.

The main risk is no longer failure to publish. The main risk is that every new explainer can reinvent the shell, visual system, metadata, JavaScript strategy, and editorial structure.

## Existing strengths

### Publishing and route integrity

- Astro is the single build project.
- `main` is the production branch.
- `public/index.html` is the sole homepage and catalog source.
- A route is owned either by `public/<route>/index.html` or `src/pages/<route>.astro`, never both.
- `scripts/check-route-ownership.mjs` validates collisions, catalog omissions, duplicate catalog links, and links without route owners.
- GitHub Actions runs route validation and the Astro production build.

### Product-contract decisions

ADR 0001 already establishes several important rules:

- one canonical title across catalog, visible `h1`, document title, and `og:title`;
- meaningful server-rendered HTML for interactive Astro pages;
- no full-page `client:only` without a documented exception and complete fallback;
- branded return navigation in normal document flow;
- selectable catalog title and description text;
- explicit open controls instead of full-card links;
- reverse chronological default ordering;
- no undefined featured, recommended, promoted, or sponsored-style ranking language.

### Stronger recent editorial work

Several newer explainers include:

- practical use cases;
- explicit limitations;
- source lists;
- research cutoff dates;
- distinctions between official facts and informed recommendations;
- and interactive decision aids.

The Markdown explainer also demonstrates a useful content-first Astro implementation with static data arrays and article markup, although it still repeats the document head and contains an internal expressive `h1` beneath the shared canonical intro.

These are useful foundations for the content standard.

## Current route inventory

The catalog baseline contains eleven published explainers.

| Route | Canonical title | Owner form | Main implementation style | Initial consistency note |
|---|---|---|---|---|
| `/markdown` | Markdown (.md) | Astro | Static Astro markup with page-scoped CSS | Strong content-first direction and sourcing; repeats the full document head and includes an expressive internal `h1` hidden by the shared-intro CSS contract |
| `/free-zapier-alternatives` | Free Zapier Alternatives | Static | HTML, CSS, vanilla JS, fetched fragments | Core article is assembled after client-side fetch; visible hero heading does not use the canonical title verbatim |
| `/obsidian-on-servers` | Obsidian on Servers | Astro | React/MUI full-page component | Strong sourcing and current research; independent local theme and full-page shell remain |
| `/npm-and-npx` | npm & npx | Astro | React/MUI full-page component | Useful reference candidate; repeated metadata, duplicate internal shell, missing-import compatibility wrapper |
| `/publish-a-website` | The Smallest Ways to Publish a Website | Static | Self-contained HTML/CSS/JS | Strong visual content; title and navigation depend partly on postbuild normalization |
| `/figma-basics` | Figma Basics | Static | Self-contained generated page | Requires inspection for source ownership, metadata, accessibility, and generated-code maintainability |
| `/async-python` | Async in Python | Astro | React/MUI full-page component | Strong mental model; independent theme, duplicate generated JavaScript copies, full-page hydration |
| `/ai-gamedev-compatibility-claude` | AI Game-Development Compatibility — Claude | Astro | React component | Comparative artifact; needs explicit archival/reference positioning and shared shell alignment |
| `/astro` | What is Astro? | Astro | React with page-scoped CSS | Strong subject-specific visual language; independent font import, tokens, layout, and controls |
| `/ai-gamedev-compatibility-gemini` | AI Game-Development Compatibility — Gemini | Static | Generated static artifact | Requires source/reference classification and shared contract review |
| `/ai-gamedev-compatibility` | AI Game-Development Compatibility | Static | Large self-contained interactive index | High-value flagship; migration should preserve its comparison identity rather than flatten it |

This table is a starting inventory. A later baseline pass should add screenshots, JavaScript-disabled status, source completeness, research date, and migration priority for each route.

## Confirmed consistency gaps

### 1. Independent design systems

Current explainers define their own combinations of:

- background and surface colors;
- primary and secondary accents;
- typography families;
- heading scales;
- widths;
- spacing;
- radii;
- card treatments;
- focus rings;
- button shapes;
- source lists;
- and responsive breakpoints.

The variation is sometimes useful, but recurring product behavior is being rebuilt locally rather than inherited from a shared foundation.

### 2. Repeated page wrappers and drifting metadata

Astro routes manually repeat the full document head, PWA metadata, favicon links, Open Graph fields, background reset, shared intro, and hydration wrapper. The copies are already incomplete in different ways.

A shared layout should own the document shell while page metadata comes from one structured registry.

### 3. Canonical identity is documented but not comprehensively enforced

The route validator checks ownership and catalog completeness. It does not currently validate built-page `h1`, document title, Open Graph title, description, canonical URL, or publication metadata.

Several pages keep an expressive internal `h1` and rely on global CSS to hide it after the shared canonical intro renders. This is fragile because the selector assumes the first descendant `h1` is always a duplicate.

The postbuild normalizer repairs a manually listed subset of static pages, which leaves correctness dependent on remembering to update another list.

### 4. Some core content depends on JavaScript assembly

`/free-zapier-alternatives` initially renders a loading state and fetches local HTML fragments in the browser. The content is static and should be assembled at build time.

Interactive filtering may remain client-side. The article itself should exist in the generated HTML.

### 5. Source-of-truth boundaries are unclear

The repository contains route-like root files, root route directories, `assets/`, `public/assets/`, Astro components, and compiled `App.js` copies. Some duplicate JavaScript files are byte-identical.

Every committed file should be classified as editable source, generated output, static production asset, or retained reference material.

### 6. Generated-code repairs have entered production source

`NpmNpxExplainerEntry.tsx` creates a global MUI `Toolbar` binding because the generated component references `Toolbar` without importing it.

This is an effective emergency repair, not a durable authoring pattern. Type checking and generated-code acceptance rules should prevent similar workarounds.

### 7. Build reproducibility is incomplete

The repository does not currently commit `package-lock.json`, and CI uses `npm install`.

A committed lockfile plus `npm ci` should make local and CI builds deterministic.

### 8. Validation is narrow

The current pipeline does not yet show dedicated checks for:

- `astro check` and TypeScript errors;
- canonical metadata consistency;
- multiple primary headings;
- meaningful content without JavaScript;
- duplicate IDs;
- basic accessibility regressions;
- mobile overflow;
- broken source links;
- or visual smoke tests.

## Preferred direction

New explainers should normally use:

```text
Astro route
└── shared Explainer layout
    ├── canonical metadata
    ├── PWA and social metadata
    ├── branded in-flow navigation
    ├── one canonical title and hook
    ├── static explanatory HTML
    ├── optional interactive islands
    ├── shared design tokens and primitives
    └── sources and research notes
```

Static pages remain supported for legacy and special-purpose cases, but should be explicit exceptions rather than the default authoring path.

## Ordered remediation

1. Accept product principles and preferred architecture.
2. Add structured metadata and a shared layout.
3. Generate the catalog from metadata.
4. Add shared semantic tokens and recurring primitives.
5. Adopt the content and sourcing standard.
6. Add type, metadata, accessibility, and static-content validation.
7. Commit a lockfile and switch CI to `npm ci`.
8. Resolve duplicate and ambiguous files.
9. Refactor `/npm-and-npx` as the reference implementation.
10. Migrate other pages gradually based on fragility and active use.

## Baseline work still required

The following evidence should be added before destructive cleanup begins:

- visual screenshots at 390 × 844, 768 × 1024, and 1440 × 1000;
- JavaScript-disabled review for each route;
- suspicious-file reference search;
- exact build output from a clean checkout;
- and a migration score for every route.

These items remain deliberately separate from the initial documentation commit so the audit does not pretend evidence was captured when it was not.
