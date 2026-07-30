# ADR 0002: Preferred explainer architecture

- **Status:** Accepted
- **Date:** 2026-07-24
- **Decision owners:** Uppercut Labs
- **Supersedes:** No prior ADR
- **Related:** ADR 0001, Explainer route, catalog, and page-identity contract

## Context

The repository supports two published route-owner forms:

1. self-contained static routes under `public/<route>/index.html`;
2. Astro routes under `src/pages/<route>.astro`.

That flexibility allowed the collection to grow quickly, but new pages now repeat or independently define:

- document metadata;
- PWA links;
- branded navigation;
- canonical title and hook treatment;
- page widths;
- typography;
- dark-mode palettes;
- focus behavior;
- source presentation;
- and JavaScript loading strategy.

Several pages are implemented as full-page React components even when much of the content is static. Some static pages assemble the article by fetching local HTML fragments in the browser. Generated or historical JavaScript copies also coexist with active Astro source, making ownership less obvious outside the route validator.

ADR 0001 establishes the route and page-identity contract. A second decision is needed to establish the preferred architecture for new work without invalidating stable legacy pages.

## Decision

### 1. Astro is the preferred source form for new explainers

New explainers should normally be published as Astro routes under:

```text
src/pages/<route>.astro
```

Astro is preferred because the collection is content-first and benefits from:

- generated HTML by default;
- shared layouts;
- file-based routing;
- build-time composition;
- reusable static components;
- and selective client-side hydration.

This is a preferred path, not an immediate migration mandate for every legacy route.

### 2. New Astro routes use a shared explainer layout

A shared `ExplainerLayout.astro` will own the product shell, including:

- document language and viewport metadata;
- canonical title and description;
- canonical URL;
- Open Graph metadata;
- PWA and icon links;
- theme color;
- skip link;
- branded in-flow return navigation;
- one canonical visible `h1`;
- supporting hook;
- optional research-cutoff presentation;
- main content landmark;
- and shared footer or source slots.

Page components should not rebuild this shell locally.

The layout must remain subject-neutral. It owns the Explainers product frame, not each page’s visual story.

### 3. Published metadata comes from one structured registry

The repository will maintain a typed explainer metadata registry.

At minimum, each published explainer records:

- slug;
- canonical title;
- hook;
- catalog description;
- publication date;
- owner type;
- and publication status.

Additional supported fields may include:

- update date;
- research cutoff;
- audience level;
- topics;
- page accent;
- preview image;
- and documented exceptions.

The catalog, page metadata, and validation pipeline should consume this registry so one title change does not require editing several disconnected sources.

### 4. The core explanation must exist in generated HTML

A published page must contain meaningful explanatory content before client-side JavaScript runs.

At minimum, generated HTML should contain:

- the canonical title;
- the supporting hook or introduction;
- the core mental model;
- primary explanatory content;
- meaningful limitations or boundaries;
- and sources when the page makes current or consequential claims.

A loading message, skeleton, or empty application root is not sufficient.

Static article content should be composed at build time rather than fetched from local fragments in the browser.

### 5. React is used for justified interactive regions

React should normally power interactive islands rather than automatically owning the complete article.

Appropriate React use includes:

- calculators;
- simulations;
- stateful diagrams;
- coordinated filters;
- comparison tools;
- decision helpers;
- complex tabs;
- and reusable stateful controls.

Static headings, prose, lists, source notes, and non-interactive explanatory diagrams should normally remain in Astro or semantic HTML.

Hydration should be chosen intentionally:

- `client:visible` for below-the-fold interaction;
- `client:idle` for non-critical enhancement;
- `client:load` when immediate interaction is necessary;
- media-specific hydration when justified.

A full-page React component remains allowed when the explainer is genuinely application-like, provided it renders meaningful server HTML and does not duplicate the shared shell.

### 6. `client:only` remains exceptional

ADR 0001 already prohibits `client:only` for an entire explainer unless a separate ADR explains why server rendering is impossible and the page provides a complete non-JavaScript fallback.

This decision remains unchanged.

### 7. Static routes remain supported as explicit exceptions

Existing self-contained routes may remain under `public/` when they are stable and useful.

A new static route should document why the preferred Astro path does not fit. Acceptable reasons may include:

- an intentional dependency-free artifact;
- a complete external generator whose output is the maintained source;
- a preservation or comparison artifact;
- or a publishing constraint not served well by Astro.

“Faster to paste the generated page into `public/`” is not by itself a durable reason.

Static routes remain subject to the route, catalog, canonical identity, navigation, accessibility, and generated-HTML contracts.

### 8. Progressive enhancement is the default interaction model

JavaScript may improve the experience through:

- filtering;
- sorting;
- simulation;
- animation;
- calculations;
- copy controls;
- responsive navigation;
- and optional detail disclosure.

The underlying explanation should remain understandable without those enhancements.

When an interaction produces dynamic output that cannot be pre-rendered, the static document should still explain:

- what the tool does;
- its default state;
- how to operate it;
- and at least one representative result.

### 9. Shared design foundations must be framework-neutral

Shared visual decisions will be expressed through semantic CSS tokens and reusable primitives that can be consumed by:

- Astro;
- plain CSS;
- vanilla JavaScript;
- and MUI themes.

The design system must not require every explainer to use MUI or React.

Subject pages may override documented accent variables while retaining shared neutral surfaces, typography foundations, focus behavior, responsive widths, and accessibility rules.

### 10. Generated code must be normalized before acceptance

AI- or tool-generated code is welcome as an implementation input, but it must meet repository standards before merge.

Generated source must not rely on:

- missing imports patched through globals;
- duplicate page shells;
- hidden duplicate canonical headings;
- unnecessary runtime fragment fetches;
- unexplained copied bundles;
- or page-wide local design systems where shared tokens suffice.

Temporary compatibility wrappers must explain:

- why they exist;
- which route depends on them;
- and the condition for removal.

### 11. Source categories must be explicit

Committed files should be identifiable as one of:

1. editable source;
2. generated output;
3. static production asset;
4. retained reference material.

Reference or historical exports should be quarantined from production paths and documented.

Generated output should not be committed unless deployment, archival, or tooling requirements make that necessary.

### 12. The preferred architecture is proven before broad migration

The repository will refactor one suitable Astro explainer as the reference implementation before migrating many routes.

`/npm-and-npx` is the initial candidate because it is:

- Astro-owned;
- beginner-focused;
- interactive;
- close to the intended design direction;
- and currently exposes repeated shell, local theme, full-page hydration, and generated-import issues.

The reference implementation should preserve its teaching value and subject identity while proving:

- structured metadata;
- shared layout;
- static explanatory content;
- selective interactive islands;
- shared tokens;
- shared primitives;
- accessibility behavior;
- and build validation.

## Consequences

### Positive

- New pages have one clear implementation path.
- Page metadata and catalog identity stop drifting independently.
- Static article content becomes more resilient and indexable.
- React is used where it adds value rather than by default.
- The design foundation can serve MUI and non-MUI pages.
- Generated-code errors are repaired before becoming architecture.
- Legacy pages may remain stable while active pages improve gradually.
- Future contributors and agents can follow a documented system rather than copying the newest page wholesale.

### Tradeoffs

- Some page creation becomes more structured up front.
- The metadata registry introduces another build input that must be validated.
- Existing full-page React explainers may need careful extraction rather than mechanical conversion.
- Static pages require a bridge to shared metadata or build-time validation.
- A shared layout and token system require maintenance.
- Supporting both legacy static and preferred Astro forms remains more complex than enforcing one framework immediately.

## Rejected alternatives

### Convert every route to Astro immediately

Rejected because stable legacy pages would incur large migration cost and regression risk without equal user benefit.

### Require React for every explainer

Rejected because the collection is primarily explanatory content and many pages do not need application-level client state.

### Require static HTML for every explainer

Rejected because complex filters, simulations, comparison tools, and stateful visualizations benefit from component state and selective hydration.

### Keep architecture entirely page-specific

Rejected because repeated shell code, metadata drift, generated-code workarounds, and inconsistent accessibility behavior are already creating repository-level maintenance problems.

### Standardize one identical page template

Rejected because subject-specific visual storytelling is a product strength. The system should standardize the shell and quality contract, not flatten every narrative.

## Implementation sequence

1. Add the documentation foundation.
2. Define and validate structured metadata.
3. Generate the catalog from metadata.
4. Create the shared layout.
5. Add semantic design tokens and first shared primitives.
6. Commit a lockfile and strengthen CI.
7. Refactor `/npm-and-npx` as the reference implementation.
8. Score remaining routes by fragility, contract drift, maintenance cost, strategic value, and migration effort.
9. Migrate in small batches.

## Compliance

A new explainer that does not follow the preferred architecture must record the exception in metadata or an ADR.

A pull request is not compliant merely because it renders successfully. It must also preserve:

- route ownership;
- catalog completeness;
- canonical identity;
- meaningful generated HTML;
- branded in-flow navigation;
- accessible interaction;
- and the relevant content and design standards.
