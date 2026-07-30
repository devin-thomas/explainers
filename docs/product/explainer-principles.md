# Explainer Product Principles

## Status

- **Status:** Active product guidance
- **Date:** July 24, 2026
- **Applies to:** New explainers, substantial redesigns, shared components, catalog behavior, and repository standards

## Purpose

Explainers is a collection of visual, interactive, one-page research and learning artifacts from Uppercut Labs.

The product should feel coherent without forcing every subject into the same template. Consistency belongs in the publishing shell, metadata, navigation, typography foundation, accessibility behavior, evidence standards, and recurring interaction patterns. Subject-specific diagrams, accents, metaphors, and visual storytelling should remain flexible.

## 1. Start with one strong mental model

Every explainer should give the reader a memorable organizing idea.

A strong mental model:

- compresses the core distinction;
- remains accurate after the catchy line is remembered;
- helps the reader predict behavior;
- and gives the rest of the page a narrative spine.

Examples of the pattern include:

- “npm manages the toolbox; npx runs a tool.”
- “Async is smart waiting.”
- “Free software often moves the bill from subscription fees to infrastructure, labor, or limits.”

A slogan that sounds good but does not help the reader reason about the subject is not enough.

## 2. Explain why the subject exists

Do not begin and end with feature description.

A complete explainer should identify:

- the problem people were trying to solve;
- the landscape or workflow that existed before;
- the tradeoff the subject changed;
- and the main reason someone would use it today.

This context should be concrete enough that the reader can understand why the subject mattered, not just what its interface contains.

## 3. Show structure, not decoration alone

Visuals should reveal at least one of:

- sequence,
- hierarchy,
- relationship,
- flow,
- comparison,
- scale,
- state,
- chronology,
- tradeoff,
- or decision path.

Decorative illustration is welcome when it gives the page identity, but it does not replace explanatory visuals.

A card grid is not automatically a visualization. It must help the reader compare, group, decide, or understand.

## 4. Make practical use visible

Readers should leave knowing what they would actually do with the subject.

Use concrete examples such as:

- commands;
- workflows;
- decisions;
- before-and-after states;
- common tasks;
- scenarios;
- or representative outputs.

Practical examples should connect the mental model to real behavior.

## 5. Cover alternatives and the simpler option

Competition is broader than a list of companies.

When relevant, explain:

- direct competitors;
- adjacent substitutes;
- historical alternatives;
- manual workflows;
- and the case for using a smaller or simpler tool.

The honest alternative may be “do nothing,” “use a text file,” “write a small script,” or “stay with the current process.”

## 6. Treat limitations as core content

Limitations are not a disclaimer appended after the persuasive part of the page.

Cover meaningful constraints such as:

- cost;
- maintenance;
- lock-in;
- maturity;
- performance;
- complexity;
- platform support;
- security boundaries;
- licensing;
- ecosystem dependence;
- accessibility;
- and poor-fit use cases.

A reader should be able to decide against the subject using the page.

## 7. Distinguish fact, interpretation, inference, and recommendation

Current or comparative explainers often mix several kinds of claims.

- **Fact:** a verifiable claim supported by a source or stable technical behavior.
- **Interpretation:** an explanation or synthesis derived from facts.
- **Inference:** a conclusion drawn when no official statement directly answers the question.
- **Recommendation:** advice based on a stated audience, constraint, or value judgment.

Do not present an inferred category mission as an official company mission. Do not present a “best for” judgment as an objective product fact.

## 8. Source current and consequential claims

Sources are expected for claims that may change or materially affect a decision, including:

- pricing and plan limits;
- product availability and release status;
- compatibility;
- security claims;
- licensing;
- historical milestones;
- official mission statements;
- market comparisons;
- and competitor capabilities.

Prefer official documentation, pricing pages, release notes, source repositories, standards, and primary research.

When facts may change, show a clear research cutoff.

## 9. Static meaning comes before interactive enhancement

The core article must exist in generated HTML.

JavaScript may:

- filter;
- compare;
- simulate;
- animate;
- calculate;
- copy;
- or progressively reveal supporting detail.

JavaScript should not be required to assemble the entire static article from local fragments. A generic loading message is not a complete fallback.

Interactive tools should still explain their purpose, default state, and at least one representative result in static content.

## 10. Dark by default

Explainers should be designed for dark mode from the beginning.

Dark mode is not merely black backgrounds. It requires:

- readable contrast;
- visible surface hierarchy;
- non-glaring code blocks;
- clear focus states;
- legible muted text;
- and accents that remain distinguishable.

A light mode is optional. If offered, it must be complete rather than a partially inverted afterthought.

## 11. Mobile first

The mobile layout is a primary design, not the collapsed residue of the desktop layout.

At small widths:

- the mental model should remain immediate;
- diagrams should reflow or provide an alternative;
- controls should remain tappable;
- code should scroll inside its own container;
- headings should wrap deliberately;
- and no page-level horizontal overflow should occur.

The primary mobile review target is approximately 390 px wide, with a 320 px safety check.

## 12. Sans-serif by default

Interface, heading, and explanatory text use sans-serif typography unless the subject provides a strong reason otherwise.

Monospace is reserved for:

- code;
- commands;
- terminal output;
- file trees;
- technical notation;
- and labels where fixed-width alignment carries meaning.

The site should remain usable if a remote font does not load.

## 13. Keep the product shell consistent

Readers should recognize the collection even when page-specific visuals differ.

Shared behavior should include:

- canonical metadata;
- branded in-flow navigation;
- one visible primary heading;
- typographic foundations;
- focus treatment;
- responsive width rules;
- source presentation;
- research labels;
- reduced-motion behavior;
- and accessible controls.

Subject-specific identity may include:

- accent colors;
- diagrams;
- iconography;
- illustrations;
- interaction models;
- and section composition.

## 14. Prefer the least machinery that comfortably works

A visual explainer does not automatically need a full React application.

Prefer:

- Astro and static HTML for article structure;
- CSS for layout and visual treatment;
- vanilla JavaScript for modest enhancement;
- and React islands for genuinely stateful interaction.

Move up the stack when the lower level becomes a real constraint, not because a larger toolchain is fashionable.

## 15. Preserve selectable, accessible information

Readers should be able to:

- select and copy titles and descriptions;
- use the page with a keyboard;
- see focus clearly;
- understand state without color alone;
- reduce motion;
- and receive a text explanation of complex visuals.

Do not make entire content cards clickable when an explicit link is clearer and preserves text selection.

## 16. Treat every page as a maintained artifact

A published explainer should have:

- a canonical owner;
- structured metadata;
- a known publication date;
- an update path;
- source code that can be understood;
- and validation that runs before deployment.

Generated code must be normalized before it becomes permanent source. Emergency compatibility wrappers should explain why they exist and how they will be removed.

## Product test

A successful explainer should allow a reader to say:

> I understand what this is, why it exists, how it works at the right level, what I would use it for, what else I could choose, and where it breaks down.

A successful repository should allow a contributor to say:

> I can build a distinctive new page without reinventing the publishing shell or guessing which quality rules matter.
