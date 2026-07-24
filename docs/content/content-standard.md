# Explainers Content Standard

## Status

- **Status:** Initial standard
- **Date:** July 24, 2026
- **Applies to:** New explainers and substantial revisions

## Purpose

A complete Explainer should give the reader more than a definition or feature list.

The reader should leave able to answer:

1. What is this?
2. Why does it exist?
3. What problem does it solve?
4. How does it work at a useful mental-model level?
5. What is its main use case?
6. What are practical examples?
7. What came before it?
8. What alternatives or competitors matter?
9. What are its limitations?
10. When should I choose or avoid it?

Not every subject has a formal mission, direct competitors, or a meaningful historical predecessor. The page should state that honestly rather than inventing certainty.

## 1. Default explainer anatomy

The following order is a strong default, not an inflexible template.

A page may reorder sections when the narrative becomes clearer, provided it still answers the required questions.

### Canonical identity

Include:

- the canonical catalog title;
- one supporting hook;
- an optional audience level;
- and a research cutoff when the page includes current claims.

The hook should sharpen the angle without replacing the canonical title.

### One-sentence mental model

Give the reader a compact organizing idea.

It should:

- remain accurate when remembered by itself;
- clarify the main distinction;
- and help the reader predict later examples.

### Mission, purpose, or intended direction

Use the most accurate label:

- **Official mission** — directly supported by an official statement.
- **Product purpose** — the concrete job the product is designed to perform.
- **Category direction** — the broad outcome a category of tools pursues.
- **Inferred direction** — a synthesis based on behavior and evidence when no official mission applies.

Do not label an inference as an official mission.

### Problem and prior landscape

Explain:

- what was difficult before;
- what users were trying to achieve;
- which tools or workflows previously dominated;
- what tradeoff the subject changed;
- and why the change mattered.

Avoid a shallow “before this, nothing existed” story when predecessors or alternatives did exist.

### How it works

Explain the subject at the level required to use or evaluate it.

Prefer:

- flows;
- layers;
- lifecycle steps;
- state changes;
- cause and effect;
- system boundaries;
- and comparison diagrams.

Do not merely rewrite marketing feature bullets.

### Main use case

Identify the most representative use case.

Explain:

- who has the problem;
- what they are trying to accomplish;
- why this subject fits;
- and what the expected outcome is.

### Practical examples

Use concrete material such as:

- commands;
- workflows;
- scenarios;
- decisions;
- before-and-after states;
- representative data;
- or sample outputs.

Examples should reinforce the mental model rather than introduce unrelated novelty.

### Alternatives and competition

Cover the relevant decision set:

- direct competitors;
- adjacent substitutes;
- historical alternatives;
- manual workflows;
- open-source or self-hosted options;
- and simpler tools.

The correct alternative may be “do nothing,” “use a spreadsheet,” “write a small script,” or “keep the current workflow.”

### Limitations and tradeoffs

Include meaningful constraints such as:

- cost;
- lock-in;
- complexity;
- maintenance;
- performance;
- platform support;
- security boundaries;
- privacy;
- licensing;
- maturity;
- reliability;
- ecosystem dependence;
- accessibility;
- and poor-fit use cases.

A reader should be able to decide against the subject using the page.

### Decision guidance

End the explanatory arc with usable guidance:

- choose this when;
- avoid this when;
- start here if;
- use the simpler option when;
- and verify this before committing.

Recommendations should name the audience and constraints that make the advice reasonable.

### Sources and research notes

Include:

- research cutoff for time-sensitive facts;
- primary sources;
- important secondary sources;
- notes where a conclusion is an inference;
- and an update date after material revision.

## 2. Claim types

### Fact

A verifiable claim supported by a source or stable technical behavior.

Examples:

- a documented command;
- a published plan limit;
- a release date;
- a licensing term;
- a supported platform.

### Interpretation

An explanation or synthesis derived from facts.

Example:

> These tools reduce subscription cost by moving more operational responsibility to the user.

### Inference

A conclusion drawn when no source states the answer directly.

Example:

> Inferred category direction: make disconnected software behave like one system without requiring every user to build custom integrations.

### Recommendation

Advice based on an audience, constraint, or value judgment.

Example:

> Start with the hosted option when zero maintenance matters more than execution limits.

Pages do not need to badge every sentence. High-impact recommendations, inferred missions, and subjective “best for” labels should be clearly identified.

## 3. Sourcing rules

Sources are required for claims involving:

- current prices and plan limits;
- product availability;
- beta, preview, or release status;
- compatibility;
- security or privacy behavior;
- licensing;
- official mission statements;
- historical milestones;
- market share or popularity;
- current competitor capability;
- legal or policy constraints;
- and consequential technical limitations.

### Preferred source order

1. official product documentation;
2. official pricing, policy, security, and support pages;
3. official source repositories and release notes;
4. standards and primary research;
5. reputable technical reporting;
6. community evidence when primary sources are unavailable.

Community sources may reveal real-world behavior, but should not be presented as official product policy.

### Link quality

Source labels should tell the reader what the source is.

Prefer:

- `Obsidian Headless documentation`
- `Astro islands documentation`
- `n8n pricing`

Avoid lists of raw URLs with no descriptive context.

## 4. Research cutoff

Show a research cutoff when:

- prices or allowances may change;
- the subject is in beta or active development;
- competitors are compared;
- current availability matters;
- a current release or policy affects the conclusion;
- or the page makes time-sensitive recommendations.

Recommended display:

```text
Research checked: July 24, 2026
```

An update date and a research cutoff are different:

- **Updated** says when the page changed.
- **Research checked** says how current the external claims are.

## 5. Writing style

### Beginner-accessible, not condescending

Define jargon on first use and explain acronyms. Do not assume prior expertise that the page has not established.

### Concrete before abstract

Lead with a task, flow, example, or contrast before expanding into theory.

### Short labels, complete explanation

Cards and diagrams benefit from short labels. Supporting prose should still explain the implications.

### No fake certainty

Use exact language when sources disagree, information is incomplete, or a conclusion is inferred.

### No padded marketing prose

Avoid vague claims such as:

- revolutionary;
- seamless;
- game-changing;
- best-in-class;
- or powerful;

unless the page defines the concrete behavior behind them.

### Show, then explain

A good sequence is:

1. show the structure;
2. name the pattern;
3. explain the implication;
4. give a practical example.

## 6. Visual information standards

A visual should answer a question.

Examples:

- **Flow:** What happens next?
- **Layer diagram:** Which system owns which responsibility?
- **Timeline:** How did the landscape change?
- **Matrix:** How do alternatives differ on the same dimensions?
- **Decision path:** Which choice fits this constraint?
- **State visualization:** What changes when the user acts?
- **Scale:** How large, fast, expensive, or frequent is something?

Every complex visual should have:

- a visible purpose;
- understandable labels;
- a mobile strategy;
- and an accessible text explanation.

Decorative art may give the page identity, but it does not satisfy the requirement for explanatory visuals by itself.

## 7. Interaction standards for content

Interaction should improve understanding rather than hide the explanation.

An interactive region should include:

- a clear question or purpose;
- a useful default state;
- understandable controls;
- visible output;
- and a static explanation of the underlying idea.

Do not require the reader to click every option merely to discover essential facts.

When a result changes, explain why it changed.

## 8. Content completeness review

Before merge, review the page against these questions:

- Is the main mental model accurate?
- Does the page explain why the subject exists?
- Is the prior landscape represented honestly?
- Does the reader see a main use case?
- Are practical examples concrete?
- Are alternatives evaluated on meaningful dimensions?
- Are limitations substantial rather than ceremonial?
- Are current claims sourced?
- Are recommendations tied to an audience or constraint?
- Are official claims distinguished from inference?
- Is important information available without completing every interaction?
- Does the conclusion help the reader choose or avoid the subject?

## 9. Acceptable variation

Not every page needs equal-length sections or the same visual sequence.

Examples:

- a programming concept may emphasize mental models, code, and mistakes rather than company competition;
- a product comparison may emphasize pricing models, deployment boundaries, and decision filters;
- a file-format explainer may emphasize history, syntax, rendering, compatibility, overhead, and security;
- a historical comparison artifact may preserve the voice or visual identity of the generating model while clearly labeling its role.

The standard defines questions the page should answer, not one compulsory arrangement of cards.

## 10. Minimum completion bar

A page is not complete merely because it is polished or interactive.

It must provide:

- a correct mental model;
- problem context;
- practical use;
- meaningful limitations;
- evidence for current claims;
- and a usable decision takeaway.
