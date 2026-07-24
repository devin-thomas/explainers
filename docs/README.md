# Explainers Documentation

This directory contains the product, design, content, engineering, and architecture guidance for the Explainers repository.

The goal is to make future explainers consistent where consistency protects quality—publishing, metadata, navigation, accessibility, responsive behavior, sourcing, and shared visual foundations—without forcing every subject into the same page composition.

## Reading order

1. [`product/explainer-principles.md`](product/explainer-principles.md) — the product-level experience Explainers should deliver.
2. [`adr/0001-explainer-route-and-catalog-contract.md`](adr/0001-explainer-route-and-catalog-contract.md) — accepted route ownership, catalog, page identity, navigation, hydration, and ordering rules.
3. [`adr/0002-preferred-explainer-architecture.md`](adr/0002-preferred-explainer-architecture.md) — preferred architecture for new explainers and the exception process.
4. [`content/content-standard.md`](content/content-standard.md) — what a complete explainer should teach and how claims should be sourced.
5. [`design/design-system.md`](design/design-system.md) — shared visual, responsive, interaction, and accessibility foundations.
6. [`engineering/authoring-guide.md`](engineering/authoring-guide.md) — implementation workflow and source-of-truth rules.
7. [`checklists/new-explainer-checklist.md`](checklists/new-explainer-checklist.md) — pre-merge completion checklist.

## Document authority

Different documents answer different kinds of questions:

- **ADRs** decide durable architecture and repository contracts.
- **Product principles** define the intended reader experience.
- **Content standards** define explanatory completeness and evidence quality.
- **Design standards** define the shared product shell and recurring interface behavior.
- **Engineering guides** define the preferred implementation workflow.
- **Checklists** verify that a specific page is ready to merge.
- **Audits** describe repository conditions at a point in time. They are evidence, not permanent architecture rules.

When documents appear to conflict, an accepted ADR takes precedence for architecture. Product principles still guide decisions not explicitly resolved by an ADR.

## Current accepted decisions

- A published route has exactly one owner: static under `public/<route>/index.html` or Astro under `src/pages/<route>.astro`.
- Every published route appears exactly once in the catalog.
- The catalog title, visible primary heading, document title, and Open Graph title use one canonical title.
- Catalog text remains selectable; only the explicit open control is a link.
- Return navigation is branded, top-left, in normal document flow, and not sticky or fixed.
- Interactive Astro pages render meaningful HTML before hydration.
- The catalog defaults to reverse chronological order, not a promotional or editorially ambiguous featured order.
- New explainers should normally use Astro, the shared page shell, structured metadata, static explanatory HTML, and interactive islands only where useful.

## Adding or changing an ADR

Use the next available four-digit number under `docs/adr/`.

Every ADR should include:

- status,
- date,
- decision owners,
- context,
- decision,
- consequences,
- tradeoffs,
- and implementation notes.

Do not silently overturn an accepted ADR through an implementation commit. Supersede it with a new ADR that identifies the old decision and explains the replacement.

## Audits and migrations

Repository assessments belong under:

```text
docs/audits/
```

Migration tracking belongs under:

```text
docs/migrations/
```

An audit should record the commit and date it describes. A migration ledger should point to the pull request that completed each route.

## Working principle

The repository should make this instruction possible:

> Build a distinctive explainer for this subject using the Explainers product principles, shared publishing shell, canonical metadata, design foundation, content standard, and validation pipeline. Preserve the subject’s own visual identity while keeping the product contract consistent.
