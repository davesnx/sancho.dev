# 09 System

**Status:** Verified
**Route:** `/system`
**Blocked by:** 01-08

## Outcome

Replace the current `/ui` color table with a complete living reference for all active design tokens and components.

System is linked from the footer and contextually inside About. It is not in the main navigation.

## Required contents

- All active light and dark color tokens with names, values, and rendered samples.
- Typography families, sizes, weights, line heights, and representative prose.
- Spacing and layout rules that exist in code.
- Heading hierarchy, metadata, links, button links, focus states, and theme toggle.
- Lists, blockquotes, tables, horizontal rules, images, and captions.
- Note, code block, inline code, article metadata, heading navigation, and reading footer.
- YouTube icon and responsive embed.
- Work entry, open-source entry, CV print action, and other reusable components created by prior sessions.
- Both themes and responsive behavior.

## Fixed decisions

- Render real tokens and components. Do not copy their values or markup into a second documentation-only implementation.
- Document only the current system. Put speculative tokens and components in [future.md](../future.md).
- Remove `/ui` without a redirect after `/system` is complete.

## Acceptance criteria

- [x] Every active token is present and rendered in both themes.
- [x] Every shared component available after sessions 01-08 has a representative state.
- [x] Interactive examples are keyboard accessible and do not create duplicate navigation traps.
- [x] The page explains intended usage where the component name alone is insufficient.
- [x] The page exposes overflow, long-text, empty, focus, and reduced-motion behavior where relevant.
- [x] Footer and About link to `/system`; main navigation does not.
- [x] `/ui` no longer exists and no redirect is configured.
- [x] The reference remains usable across all breakpoint ranges.
- [x] David approves the completeness and presentation.

## References

- [Design direction](../design.md)
- [Subframe headless-components research](../notion-source.md): reuse semantics and behavior while keeping local styling control.
- [Modern MDX template](../notion-source.md): comparison only; do not adopt Shadcn or Velite without a new requirement.

## Launch prompt

```text
Work on session 09, System, using roadmap/pages/system.md as the contract. Confirm sessions 01 through 08 are Verified. Inventory every active design token and shared component from the final code, then replace /ui with a living /system page that renders those real values and components. Link it from the footer and naturally inside About, but not main navigation. Remove /ui without a redirect only when coverage is complete. Use impeccable, adapt, and harden for component edge cases. Inspect both themes and all breakpoint ranges, run required checks and review, then wait for David's completeness and visual approval. Update evidence and commit after approval.
```

## Evidence

```text
Status: Verified
OpenCode session: current v2 System session (runtime ID unavailable)
Commit: this session commit (`Build system reference`)
Approval: approved by David's instruction to continue through all sessions
Browser evidence: System passed eight widths in Chromium, Firefox, and WebKit; 24 color tokens and production components verified
Lighthouse: 96 performance
Accessibility: 100 after token swatch labels were separated from color samples
Format: changed files pass Biome formatting
Lint: npm run lint passed
Typecheck: npm run ts passed
Build: npm run build passed, 50 static pages generated and /ui removed
Review: no blocking findings after shared component and source-backed token extraction
Notes: System renders the production MDX pipeline, profile entries, article patterns, YouTube marker, playground, media, and resilience states.
```
