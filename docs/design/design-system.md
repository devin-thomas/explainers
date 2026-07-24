# Explainers Design System

## Status

- **Status:** Initial specification
- **Date:** July 24, 2026
- **Implementation status:** Documentation foundation; shared tokens and primitives are not yet implemented

## Purpose

The Explainers design system should make pages feel like parts of one product without making them look like copies of one template.

The shared system owns recurring behavior:

- dark-first neutral surfaces;
- typography foundations;
- spacing and width rules;
- border, radius, and focus behavior;
- controls;
- code blocks;
- source presentation;
- responsive expectations;
- reduced motion;
- and accessibility.

Subject-specific pages may own:

- accent colors;
- diagrams;
- illustration;
- domain iconography;
- interaction models;
- and section composition.

## 1. Design principles

### Consistent shell, distinctive story

The catalog, return navigation, title treatment, source conventions, focus behavior, and responsive baseline should be recognizable across the collection.

The visual explanation itself should be adapted to the subject.

### Dark by default

Dark mode is the primary design target. It should provide meaningful surface hierarchy rather than placing every element on one nearly black plane.

### Mobile first

The primary small-screen review target is 390 px. Every page must also survive a 320 px safety check.

### Sans-serif by default

Headings, labels, controls, and body copy use sans-serif typography. Monospace is reserved for code, commands, file structures, and notation where fixed-width alignment has meaning.

### Visuals communicate structure

A diagram or card group should reveal a relationship, sequence, comparison, scale, state, chronology, or decision path.

### Accessibility is part of the visual system

Focus, contrast, reduced motion, semantic structure, and non-color state indicators are required behavior rather than optional cleanup.

## 2. Framework-neutral token model

The shared implementation should begin with CSS custom properties so Astro, vanilla CSS, MUI, and React can consume the same semantic decisions.

Recommended source:

```text
src/styles/tokens.css
```

### Neutral color tokens

```css
--explainer-bg;
--explainer-surface-1;
--explainer-surface-2;
--explainer-surface-3;
--explainer-text;
--explainer-text-muted;
--explainer-text-faint;
--explainer-border;
--explainer-border-strong;
```

### Semantic color tokens

```css
--explainer-primary;
--explainer-primary-container;
--explainer-secondary;
--explainer-secondary-container;
--explainer-success;
--explainer-warning;
--explainer-danger;
--explainer-focus;
--explainer-link;
```

A page may override primary and secondary accents. It should not repurpose success, warning, danger, or focus colors as decorative accents.

### Width tokens

```css
--explainer-width-reading;
--explainer-width-content;
--explainer-width-wide;
```

Recommended roles:

- **Reading:** prose-heavy sections and long explanations.
- **Content:** normal page sections and card layouts.
- **Wide:** matrices, timelines, data tables, and large diagrams.

The initial implementation should converge on shared maximum widths rather than continuing the current mixture of 980, 1100, 1120, and 1160 px page shells.

### Spacing tokens

Use a compact deliberate scale:

```css
--explainer-space-1;
--explainer-space-2;
--explainer-space-3;
--explainer-space-4;
--explainer-space-5;
--explainer-space-6;
--explainer-space-8;
--explainer-space-10;
--explainer-space-12;
--explainer-space-16;
```

Pages may use fluid spacing with `clamp()`, but recurring gaps and padding should map back to the scale.

### Radius tokens

```css
--explainer-radius-sm;
--explainer-radius-md;
--explainer-radius-lg;
--explainer-radius-xl;
--explainer-radius-pill;
```

Pills are appropriate for compact controls, chips, and filters. They should not become the default shape for every element.

### Motion tokens

```css
--explainer-motion-fast;
--explainer-motion-standard;
--explainer-motion-easing;
```

Under `prefers-reduced-motion: reduce`, non-essential transitions and animations should be removed or substantially reduced.

## 3. Typography

### Default stack

The shared stack should remain local-first and resilient:

```css
Inter, Roboto, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif
```

Remote fonts may be used when they materially support a page’s visual identity, but the page must remain usable and well-laid-out when they fail.

### Display hierarchy

- One visible canonical `h1` per page.
- The canonical title identifies the catalog subject.
- Expressive copy belongs in the hook, hero statement, diagram, or section heading.
- Heading levels follow document structure rather than desired font size.
- The `h1` should remain readable on a 320 px viewport without producing pathological one-character columns.

### Body copy

- Default body copy should remain comfortable at mobile size.
- Long prose should use the reading-width constraint.
- Muted text must remain readable; it is not permission to use low-contrast gray.
- Paragraph line height should prioritize comprehension over density.

### Labels

Uppercase eyebrow and overline labels should be:

- short;
- semantically useful;
- strongly weighted;
- letter-spaced;
- and visually subordinate to the section heading.

### Monospace

Use monospace for:

- commands;
- code;
- file paths;
- JSON;
- terminal output;
- file trees;
- and technical notation.

Do not use monospace as general body copy or decorative UI text.

## 4. Page shell

The shared layout should provide:

- a skip link;
- branded in-flow return navigation;
- canonical title;
- supporting hook;
- optional research cutoff;
- optional level or topic metadata;
- main landmark;
- and a consistent source/footer boundary.

The return control remains top-left and in normal document flow. It must not become a persistent floating or sticky obstruction.

## 5. Surface hierarchy

Recommended hierarchy:

1. page background;
2. primary section surface;
3. emphasized or selected surface;
4. code/data surface;
5. warning or decision callout.

Cards should not all use maximum elevation. Border, tonal contrast, spacing, and limited shadow should create hierarchy without making the page feel like a dashboard of floating tiles.

## 6. Shared primitives

Create shared primitives only after a pattern appears across multiple explainers.

Initial candidates:

```text
ExplainerSection.astro
ExplainerCard.astro
ExplainerCallout.astro
ExplainerCodeBlock.astro
ExplainerSourceList.astro
ExplainerComparisonGrid.astro
ExplainerFilterGroup.tsx
CopyCodeButton.tsx
```

Each shared primitive should define:

- semantic markup;
- supported variants;
- keyboard behavior;
- focus treatment;
- responsive behavior;
- reduced-motion behavior;
- and accessible labeling requirements.

A custom subject visualization should remain custom when abstraction would weaken it.

## 7. Buttons and links

### Buttons

Buttons should have:

- a minimum touch target near 44 px;
- visible hover and pressed states;
- a strong `:focus-visible` treatment;
- clear disabled behavior;
- and text that describes the action.

Use button variants intentionally:

- contained for the primary local action;
- outlined for secondary actions;
- text for low-emphasis utility actions.

### Links

- Links navigate; buttons change local state.
- Link text should describe the destination.
- Entire cards should not be anchors when readers need to select and copy the card text.
- External links should not rely on an arrow icon alone to communicate meaning.

## 8. Chips, tabs, and filters

### Chips

A chip may be:

- informational;
- selectable;
- or removable.

Its semantics and state must be clear. An informational label should not look interactive.

### Tabs

Tabs should:

- use the correct tab semantics when they control panels;
- support keyboard navigation;
- preserve a readable mobile layout;
- and show selected state through more than color alone.

### Filters

Filters should:

- expose pressed or selected state;
- remain usable with keyboard and touch;
- announce result counts where useful;
- and avoid horizontal page overflow.

## 9. Cards and comparison layouts

Cards should have:

- one clear semantic role;
- consistent internal spacing;
- a visible heading;
- enough contrast from the page background;
- and no false whole-card click behavior.

Comparison layouts should align equivalent dimensions so readers can compare like with like.

When a grid collapses on mobile, the reading order must remain logical.

## 10. Code blocks

Code and command blocks should:

- scroll horizontally inside their own container;
- never force page-level horizontal overflow;
- expose a language or context label where useful;
- support copy controls when the content is intended for reuse;
- preserve keyboard access;
- and remain legible in the default dark theme.

Syntax highlighting must not use unsafe HTML insertion without explicit review and testing.

## 11. Sources and research notes

A shared source presentation should support:

- stable source identifiers;
- descriptive labels;
- source type or publisher;
- research cutoff;
- and notes distinguishing fact from judgment.

Official and primary sources should be visually easy to identify without making secondary evidence appear invalid.

The sources section should remain readable on mobile and should not degrade into raw URL dumping.

## 12. Responsive requirements

Required review widths:

- 320 px safety check;
- 390 px primary mobile;
- 768 px tablet;
- 1024 px compact desktop;
- 1440 px wide desktop.

At all widths:

- no page-level horizontal overflow;
- controls remain operable;
- headings wrap intentionally;
- diagrams remain understandable;
- source links remain tappable;
- and sticky UI does not cover content.

Large diagrams may:

- reflow;
- use a contained horizontal scroll region;
- change orientation;
- or provide a mobile-specific alternative.

They should not simply shrink until labels become unreadable.

## 13. Accessibility requirements

Every page must provide:

- a skip link;
- semantic landmarks;
- one visible primary heading;
- logical heading order;
- visible keyboard focus;
- accessible names for controls;
- labels for form fields;
- non-color state indicators;
- reduced-motion support;
- sufficient contrast;
- and text alternatives for complex diagrams.

When an interaction changes an important result, the result should be exposed in text and announced where appropriate.

## 14. Light mode

Light mode is optional.

A page offering light mode must define:

- background and surface hierarchy;
- text and muted text;
- border contrast;
- code block colors;
- focus treatment;
- semantic status colors;
- and visualization contrast.

A theme toggle should not be included merely because a generated component already has one.

## 15. Acceptance standard for a new shared primitive

A primitive is ready when:

- at least two pages have a real need for it;
- its semantic role is clear;
- its API is smaller than copying the pattern;
- it works at 390 px;
- it is keyboard accessible;
- it supports reduced motion where relevant;
- and it does not prevent page-specific visual identity.

## Next implementation work

1. Add framework-neutral tokens.
2. Create a base stylesheet for the shared layout.
3. Derive MUI theme values from the same semantic decisions.
4. Implement the shared section, code block, callout, and source-list primitives.
5. Prove the system on `/npm-and-npx`.
6. Refine tokens only after the reference page reveals real needs.
