# Explainer Authoring Guide

## Status

- **Status:** Initial guide
- **Date:** July 24, 2026
- **Applies to:** New routes, substantial revisions, generated-code imports, and shared component work

## Purpose

This guide describes the preferred workflow for adding an explainer without reinventing the repository architecture.

The target architecture is:

```text
Astro route
└── shared Explainer layout
    ├── canonical structured metadata
    ├── static explanatory content
    ├── optional interactive islands
    ├── shared design tokens and primitives
    └── sources and research notes
```

The shared layout and metadata registry are planned work. Until they are implemented, new work should still follow the decisions in ADR 0001 and ADR 0002 and avoid creating new patterns that conflict with the target.

## 1. Read before building

Before creating a page, read:

1. `docs/product/explainer-principles.md`
2. `docs/adr/0001-explainer-route-and-catalog-contract.md`
3. `docs/adr/0002-preferred-explainer-architecture.md`
4. `docs/content/content-standard.md`
5. `docs/design/design-system.md`
6. `docs/checklists/new-explainer-checklist.md`

Do not treat the newest explainer as the sole template. It may contain page-specific decisions or legacy workarounds.

## 2. Choose the route owner

Every route has exactly one owner.

### Preferred: Astro route

Use:

```text
src/pages/<slug>.astro
```

Astro is the default when:

- the page is primarily explanatory content;
- static HTML can carry the article;
- interactive regions can be isolated;
- the page benefits from shared metadata and layout;
- or shared design primitives are appropriate.

### Static route exception

Use:

```text
public/<slug>/index.html
```

only when a documented reason makes the preferred Astro path a poor fit.

Possible reasons include:

- an intentionally dependency-free artifact;
- a maintained external generator that produces complete HTML;
- a preservation or comparison artifact;
- or a special publishing constraint.

Record the reason in metadata or an ADR.

Never create both owner forms for the same route.

## 3. Plan the content before the interface

Define:

- audience and assumed knowledge;
- canonical title;
- supporting hook;
- one-sentence mental model;
- problem and prior landscape;
- main use case;
- practical examples;
- alternatives;
- limitations;
- decision takeaway;
- research cutoff;
- and source list.

Identify which parts need interaction and why.

A page should not become a full React application merely because an agent can generate one quickly.

## 4. Use static HTML for static meaning

Headings, prose, lists, callouts, source notes, and non-interactive diagrams should normally render as Astro or semantic HTML.

The built page must remain meaningful before browser JavaScript runs.

At minimum, generated HTML should contain:

- canonical title;
- hook or introduction;
- core mental model;
- primary explanatory content;
- limitations or boundaries;
- and sources where required.

A generic loading message is not sufficient.

Do not fetch local HTML fragments in the browser merely to assemble a static article. Compose them at build time.

## 5. Add interactive islands intentionally

React is appropriate for:

- calculators;
- simulations;
- stateful diagrams;
- decision helpers;
- coordinated filters;
- complex tabs;
- and reusable stateful controls.

Choose hydration based on need:

- `client:visible` for below-the-fold interaction;
- `client:idle` for non-critical enhancement;
- `client:load` when immediate interaction is necessary;
- media-specific hydration when justified.

A full-page React component may remain appropriate for an application-like explainer, but it must:

- render meaningful server HTML;
- avoid duplicating the page shell;
- expose only one canonical `h1`;
- and use shared tokens where possible.

`client:only` for a complete explainer requires a separate ADR and complete non-JavaScript fallback.

## 6. File placement

Target structure:

```text
src/
├── components/
│   ├── shared/
│   └── explainers/
│       └── <slug>/
├── data/
│   └── explainers.ts
├── layouts/
│   └── ExplainerLayout.astro
├── pages/
└── styles/
    ├── tokens.css
    └── explainer-base.css

public/
├── brand/
├── icons/
├── shared/
└── explainers/
    └── <slug>/
```

Until the target structure is implemented, keep route-specific source close to its route or component and avoid introducing new generic root-level route folders.

## 7. Source categories

Every committed file should have one clear role.

### Editable source

Human- or agent-maintained source that should be changed directly.

Examples:

- `.astro` routes;
- TypeScript components;
- CSS source;
- metadata;
- Markdown documentation.

### Generated output

Files produced from editable source.

Do not commit generated output unless deployment, archival, or tooling requirements demand it.

### Static production asset

Files intentionally served directly.

Examples:

- optimized images;
- favicons;
- downloadable datasets;
- page-specific static assets.

### Retained reference material

Historical exports, original generated versions, research input, or visual references retained for comparison.

Reference material should be clearly quarantined from production paths and documented.

Do not leave generated-looking copies in `public/` or route-like root folders without explaining which source is authoritative.

## 8. Generated code acceptance

AI- or tool-generated code must be normalized before merge.

Required checks:

- all imports are explicit;
- TypeScript passes;
- no global bindings patch missing imports;
- no duplicate page shell;
- no hidden duplicate canonical heading;
- no unexplained copied bundle;
- no unnecessary dependency;
- no static article assembled through runtime local fetches;
- no minified file used as the only maintainable source;
- and no page-wide local design system when shared tokens cover the need.

A temporary compatibility wrapper must state:

- why it exists;
- which route depends on it;
- and what condition allows removal.

## 9. Component boundaries

Create a component when it:

- owns state;
- is reused;
- has a distinct semantic role;
- has independent accessibility behavior;
- or materially improves testing and review.

Do not split every card into a separate file merely to reduce line count.

Avoid thousand-line full-page components when static article sections and interactive regions can be separated cleanly.

A useful decomposition is:

```text
page composition
├── static article sections
├── page-specific visual components
├── interactive islands
└── shared primitives
```

## 10. Styling rules

- Consume shared semantic tokens when available.
- Scope subject-specific CSS under a page root.
- Avoid global selectors that can hide or restyle arbitrary descendants.
- Avoid repeating raw neutral color values across the page.
- Page accents may override documented accent variables.
- MUI themes should derive from shared semantic decisions.
- Plain CSS and Astro remain first-class consumers of the design system.

Do not require MUI for every explainer.

## 11. Asset rules

For every asset:

- use a descriptive filename;
- optimize large raster images;
- provide width and height where helpful;
- write meaningful alternative text or mark the image decorative;
- document licensing or attribution when required;
- prefer local assets when a remote dependency adds fragility;
- and do not commit font files for redistribution unless licensing and policy clearly permit it.

Page-specific assets should eventually live under:

```text
public/explainers/<slug>/
```

## 12. Metadata workflow

The planned metadata registry will become the canonical source for:

- slug;
- title;
- hook;
- description;
- publication date;
- update date;
- research cutoff;
- owner type;
- publication status;
- topics;
- and page accent.

Until that registry lands, keep the existing catalog and page identity synchronized manually and run the route validator.

After the registry lands, do not add catalog cards by hand.

## 13. Source and research workflow

For current or comparative subjects:

1. define the research cutoff;
2. gather official and primary sources first;
3. record material limits and status;
4. identify where interpretation begins;
5. label recommendations and inferred claims;
6. include sources in the page;
7. revisit time-sensitive claims during material updates.

Do not present a current comparison without a date boundary.

## 14. Accessibility workflow

Review:

- one visible `h1`;
- logical heading order;
- skip link;
- landmarks;
- keyboard access;
- visible focus;
- accessible control names;
- form labels;
- non-color selected state;
- reduced motion;
- mobile zoom and reflow;
- diagram text alternatives;
- and announcements for important dynamic results.

An interaction that only works with a mouse is incomplete.

## 15. Responsive workflow

Test at:

- 320 px;
- 390 px;
- 768 px;
- 1024 px;
- 1440 px.

Verify:

- no page-level horizontal overflow;
- code scrolls within its own block;
- diagrams remain legible;
- controls remain tappable;
- source links remain usable;
- sticky UI does not cover content;
- and title wrapping remains intentional.

## 16. Validation workflow

Current required commands:

```bash
npm install
npm run check:routes
npm run build
```

Planned standard after the validation phase:

```bash
npm ci
npm run validate
```

The planned validation command should include:

- route checks;
- metadata checks;
- `astro check`;
- built-page identity checks;
- basic accessibility checks;
- and the production build.

## 17. Pull request evidence

A page PR should include:

- what the explainer teaches;
- why the chosen source form fits;
- what is static versus interactive;
- research cutoff and source notes;
- documented exceptions;
- validation output;
- mobile screenshot;
- representative interaction screenshot;
- and desktop overview screenshot.

## 18. Recommended authoring sequence

1. Define audience and mental model.
2. Gather sources and set the research cutoff.
3. Draft structured metadata.
4. Choose the route owner.
5. Write static explanatory content.
6. Add subject-specific visuals.
7. Add interactive islands only where they improve understanding.
8. Apply shared design foundations.
9. Review limitations and alternatives.
10. Test without JavaScript.
11. Test keyboard and mobile behavior.
12. Run validation.
13. Complete the new-explainer checklist.
14. Open a focused pull request.

## 19. Reference implementation

`/npm-and-npx` is the planned first reference implementation.

Future contributors should inspect its final refactored form for architecture and integration examples, but should not copy its exact composition, icons, or subject-specific interaction patterns.
