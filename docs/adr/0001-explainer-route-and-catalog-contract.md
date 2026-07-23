# ADR 0001: Explainer route, catalog, and page-identity contract

- **Status:** Accepted
- **Date:** 2026-07-23
- **Decision owners:** Uppercut Labs

## Context

The repository grew from a mixture of self-contained HTML explainers and Astro/React explainers. That flexibility created several visible regressions:

- A route could exist in both `public/<route>/index.html` and `src/pages/<route>.astro`. Astro copies `public/` and also generates page output, so duplicate ownership made the final route depend on build behavior and file-copy order.
- Some interactive pages used `client:only`, which left the production HTML as an empty shell. If the JavaScript island failed to load or hydrate, visitors saw a blank page with only separately rendered navigation.
- Most pages used a fixed bottom-left return button, while the publishing explainer used a branded control in the normal page flow.
- Catalog cards were full-card links. This made the title and description difficult to select and copy.
- Catalog titles and the page's primary `h1` could disagree. The catalog promised one title while the destination led with unrelated oversized text.
- The default `Featured order` implied editorial promotion, recommendation, sponsorship, or hidden ranking logic even though no such system had been defined.

These are product-contract problems rather than one-off styling problems, so they need repository-level rules.

## Decision

### 1. One route has exactly one source owner

Every published route must be owned by one—and only one—of these forms:

1. **Static/self-contained owner:** `public/<route>/index.html`
2. **Astro owner:** `src/pages/<route>.astro`

A route must never exist in both places. `scripts/check-route-ownership.mjs` runs before every build and fails when a collision is found.

### 2. Interactive pages must render meaningful HTML before hydration

Astro React pages use server-rendered output with an appropriate hydration directive such as `client:load`.

`client:only` is prohibited for a full explainer page unless an ADR documents why server rendering is impossible and the route supplies a complete, meaningful non-JavaScript fallback. A loading message alone is not a complete fallback.

### 3. The catalog title is the page title

Each explainer has one canonical title. That exact text must be used for:

- the catalog card heading,
- the page's primary visible `h1`,
- the document `<title>` before the `— Explainers` suffix,
- `og:title`.

Expressive hooks such as “From one file to a real website” or “Async is smart waiting” remain valuable, but they are subtitles or supporting copy—not replacements for the canonical title.

### 4. Page navigation stays in document flow

The return-to-catalog control:

- appears near the top-left of the page,
- uses the Explainers icon and label,
- is part of normal document flow,
- is not `fixed` or `sticky`,
- does not follow the reader while scrolling.

Astro pages use `src/components/ExplainerPageIntro.astro`. Older self-contained pages are normalized after build by `scripts/normalize-explainer-pages.mjs`.

### 5. Catalog text is selectable

Catalog entries are semantic `<article>` elements containing normal text. Only the explicit “Open explainer” control is a link.

Do not wrap the entire title, description, or card in an anchor or click handler. Visitors must be able to select and copy titles and descriptions normally.

### 6. Default ordering is reverse chronological

The default catalog order is **Newest first**, based on each card's explicit `data-published` timestamp.

Supported ordering modes are:

- Newest first
- Oldest first
- Title A–Z
- Title Z–A

Do not add `Featured`, `Recommended`, `Promoted`, or similar ranking language unless a future decision defines who curates it, what it means, and how it is disclosed. Chronological ordering is data-driven and auditable.

### 7. Static output receives a final contract pass

`npm run build` performs three stages:

1. `prebuild`: fail on duplicate route ownership.
2. `build`: generate Astro's `dist/` output.
3. `postbuild`: normalize canonical titles and in-flow navigation for legacy self-contained pages.

The postbuild step must not be used to disguise a route collision. Ownership is resolved before the build begins.

### 8. Every pull request must build

GitHub Actions runs the production build for pull requests and pushes to `main`. A page is not considered complete because its source transpiles; the complete Astro build, route checks, and output normalization must pass.

## Consequences

### Positive

- Route output no longer depends on ambiguous copy order.
- Interactive pages retain meaningful content if hydration fails.
- Catalog ordering has a clear, non-promotional meaning.
- Page identity remains consistent from catalog to destination.
- Titles and descriptions can be copied.
- Navigation behaves consistently and does not cover content.
- Future regressions fail during build instead of appearing first in production.

### Tradeoffs

- Self-contained HTML pages receive a small postbuild transformation.
- New explainers must record a publication timestamp in the catalog.
- Full-page client-only React experiments require either conversion to server-rendered output or a separate ADR with a real fallback.

## Implementation notes

When adding an explainer:

1. Choose either `public/<route>/index.html` or `src/pages/<route>.astro`.
2. Add the canonical title, description, route, and `data-published` timestamp to `public/index.html`.
3. Keep the card as selectable text plus a separate link.
4. Make the destination `h1` exactly match the catalog title.
5. Use in-flow branded navigation.
6. Run `npm run build` before merging.
