# New Explainer Checklist

Use this checklist before merging a new explainer or a substantial rebuild.

A checked box means the requirement was verified, not merely intended.

## Planning

- [ ] The intended audience and assumed knowledge are defined.
- [ ] The page has one accurate, memorable mental model.
- [ ] The problem and prior landscape are identified.
- [ ] The main use case is concrete.
- [ ] Practical examples are planned.
- [ ] Relevant alternatives, competitors, or simpler substitutes are identified.
- [ ] Meaningful limitations and poor-fit cases are identified.
- [ ] Current claims have a research plan and cutoff date.

## Route and ownership

- [ ] The route slug is unique.
- [ ] Exactly one source owner exists.
- [ ] The owner is `src/pages/<slug>.astro` unless a static exception is documented.
- [ ] No duplicate route exists under `public/` and `src/pages/`.
- [ ] The route appears exactly once in the catalog or generated metadata source.
- [ ] Any static-route exception records why Astro is not the preferred fit.

## Canonical metadata

- [ ] The canonical title is final.
- [ ] The hook supports rather than replaces the canonical title.
- [ ] The catalog description is concise and informative.
- [ ] The publication timestamp is valid.
- [ ] The update date is recorded after a material revision.
- [ ] A research cutoff is shown when facts may change.
- [ ] The visible `h1` exactly matches the canonical title.
- [ ] The document title begins with the canonical title.
- [ ] `og:title` matches the canonical title.
- [ ] The canonical URL matches the route.
- [ ] The page description is present.
- [ ] The preview image is valid when one is specified.

## Architecture

- [ ] The shared explainer layout is used when available.
- [ ] The product shell is not rebuilt inside a page component.
- [ ] There is one visible canonical `h1`.
- [ ] Core explanatory content exists in generated HTML.
- [ ] The page remains meaningful before client-side JavaScript runs.
- [ ] Static article content is composed at build time.
- [ ] React is limited to justified interactive regions.
- [ ] Hydration timing is chosen intentionally.
- [ ] A full-page React implementation renders meaningful server HTML.
- [ ] `client:only` is not used for the complete page without a separate ADR and complete fallback.
- [ ] No loading shell is the sole initial article content.

## Generated code and source quality

- [ ] All imports are explicit.
- [ ] TypeScript and Astro checks pass.
- [ ] No global binding patches a missing import.
- [ ] No duplicate generated implementation exists in another production path.
- [ ] No minified file is the only maintainable source.
- [ ] No unexplained runtime fetch assembles local static article fragments.
- [ ] Temporary compatibility wrappers explain why they exist and how they will be removed.
- [ ] Every committed file is clearly editable source, generated output, static production asset, or retained reference material.

## Content completeness

- [ ] The page explains what the subject is.
- [ ] The page explains why the subject exists.
- [ ] The prior landscape is represented honestly.
- [ ] The “how it works” explanation matches the audience level.
- [ ] The main use case is explicit.
- [ ] Practical examples reinforce the mental model.
- [ ] Alternatives are compared on meaningful dimensions.
- [ ] The simpler option is acknowledged where relevant.
- [ ] Limitations are substantial rather than ceremonial.
- [ ] The page gives usable choose/avoid guidance.
- [ ] Official claims are distinguished from inference.
- [ ] Recommendations name the audience or constraint behind them.
- [ ] Important facts are not hidden behind interaction alone.

## Research and sources

- [ ] Current pricing and limits use current sources.
- [ ] Product status and availability use official sources.
- [ ] Security, privacy, licensing, and compatibility claims are sourced.
- [ ] Historical milestones are sourced.
- [ ] Official mission language links to an official statement.
- [ ] Community evidence is not presented as official policy.
- [ ] Source labels describe the source rather than showing raw URLs alone.
- [ ] The research cutoff matches the evidence used.
- [ ] “Best for” and similar labels are presented as informed judgments.

## Visual design

- [ ] Dark mode is the default.
- [ ] Sans-serif typography is used by default.
- [ ] Monospace is reserved for code, commands, paths, or notation.
- [ ] Shared semantic tokens are used when available.
- [ ] Subject accents preserve contrast and semantic status colors.
- [ ] The product shell remains recognizable.
- [ ] Subject-specific visuals retain their own identity.
- [ ] Cards have a clear semantic role.
- [ ] The page does not become an undifferentiated wall of cards.
- [ ] Visuals explain sequence, hierarchy, relationship, flow, comparison, scale, state, chronology, tradeoff, or decisions.
- [ ] Decorative art does not substitute for explanatory visuals.

## Controls and interaction

- [ ] Links navigate and buttons change local state.
- [ ] Card text remains selectable.
- [ ] Interactive state is not communicated by color alone.
- [ ] Buttons have clear action labels.
- [ ] Touch targets are approximately 44 px or larger.
- [ ] Filters expose selected or pressed state.
- [ ] Result counts are announced where useful.
- [ ] Tabs support keyboard operation.
- [ ] Dynamic results are exposed in text.
- [ ] Every interaction has a useful default state.
- [ ] Essential information does not require clicking every option.

## Code blocks and technical content

- [ ] Code blocks scroll inside their own container.
- [ ] Code does not cause page-level horizontal overflow.
- [ ] Language or context labels are shown where useful.
- [ ] Copy controls are keyboard accessible.
- [ ] Syntax highlighting remains legible in dark mode.
- [ ] Unsafe HTML insertion is avoided or explicitly reviewed and tested.
- [ ] Commands and examples are technically correct.

## Accessibility

- [ ] A skip link is present.
- [ ] Main, navigation, header, section, and footer landmarks are meaningful.
- [ ] Heading order is logical.
- [ ] Keyboard focus is visible.
- [ ] All controls have accessible names.
- [ ] Form fields have labels.
- [ ] Images have useful alternative text or are correctly marked decorative.
- [ ] Complex diagrams have a text explanation.
- [ ] Reduced motion is supported.
- [ ] Text and controls have sufficient contrast.
- [ ] Important status changes are announced where appropriate.
- [ ] The page remains usable at browser zoom.

## Responsive review

- [ ] The page survives a 320 px safety check.
- [ ] The 390 px primary mobile layout is intentional.
- [ ] The 768 px tablet layout is usable.
- [ ] The 1024 px compact desktop layout is usable.
- [ ] The 1440 px wide layout does not become excessively sparse or stretched.
- [ ] No page-level horizontal overflow exists.
- [ ] Diagrams reflow, scroll within a contained region, or provide a mobile alternative.
- [ ] Heading wrapping remains readable.
- [ ] Sticky elements do not cover content or consume excessive mobile height.
- [ ] Source links remain tappable.

## Validation

Current repository commands:

- [ ] `npm run check:routes` passes.
- [ ] `npm run build` passes.

Planned validation commands after the CI phase:

- [ ] `npm ci` succeeds from a clean checkout.
- [ ] `npm run validate` passes.
- [ ] `astro check` passes.
- [ ] Metadata validation passes.
- [ ] Built-page canonical identity validation passes.
- [ ] Basic accessibility validation passes.
- [ ] JavaScript-independent content validation passes.
- [ ] Mobile browser smoke checks pass.

## Manual final review

- [ ] The page was reviewed with JavaScript disabled.
- [ ] The page was reviewed with keyboard only.
- [ ] The page was reviewed with reduced motion enabled.
- [ ] The page was reviewed in the default dark theme.
- [ ] The page was reviewed at 390 px.
- [ ] The page was reviewed on desktop.
- [ ] All source links were opened and checked.
- [ ] Catalog search still finds the page.
- [ ] Catalog sorting still places the page correctly.
- [ ] The explicit open link works.
- [ ] Screenshots were added to the pull request.

## Pull request evidence

- [ ] The PR explains what the page teaches.
- [ ] The PR explains why the chosen architecture fits.
- [ ] The PR identifies static content and interactive islands.
- [ ] The PR states the research cutoff.
- [ ] The PR identifies important informed judgments.
- [ ] The PR documents exceptions.
- [ ] The PR includes validation output.
- [ ] The PR includes a mobile screenshot.
- [ ] The PR includes a representative interaction screenshot.
- [ ] The PR includes a desktop overview screenshot.

## Completion test

The page is ready when a reader can say:

> I understand what this is, why it exists, how it works at the right level, what I would use it for, what else I could choose, and where it breaks down.

The implementation is ready when a maintainer can say:

> This page follows one known publishing path, has one source of truth, remains meaningful without client JavaScript, passes validation, and can be maintained without reverse-engineering generated artifacts.
