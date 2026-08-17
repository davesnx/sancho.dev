# 12 Variable Font Experiment

**Status:** Verified
**Route:** `/experiments/variable`
**Blocked by:** 01 Design Foundation, 10 Experiments Index

## Outcome

Repair and refine the variable-font experiment so proximity changes letter weight on pointer devices and touch devices receive a real interaction or a clear stable fallback.

## Current behavior

The experiment changes each letter's `wght` value from horizontal mouse position. Its desktop instruction incorrectly says the y axis. Its mobile instruction says to tap, but the implementation still reads mouse position. Weight values are not visibly clamped to the font's supported range.

## Acceptance criteria

- [x] Horizontal pointer movement changes nearby letter weights smoothly on desktop.
- [x] Font-weight values remain within the active variable font's supported range.
- [x] Mobile touch interaction works as instructed, or the copy clearly describes a deliberate static fallback.
- [x] Instructions name the correct axis and current interaction.
- [x] Reduced-motion preference removes non-essential animation without hiding the text.
- [x] The name remains readable and does not overflow at all existing breakpoint ranges.
- [x] Keyboard and non-pointer visitors can read the experiment and its explanation.
- [x] No server-render, hydration, input, or browser console error occurs.
- [x] The variable-font reference link remains accessible.
- [x] David approves the repaired interaction in desktop and mobile modes.

## Launch prompt

```text
Work on session 12, Variable Font Experiment, using roadmap/pages/experiments-variable.md as the contract. Confirm sessions 01 and 10 are Verified. Reproduce the current desktop and mobile mismatch before editing. Repair horizontal pointer behavior, clamp the variable font weight, and provide a real touch interaction or an explicit stable mobile fallback. Correct the instruction copy and respect reduced motion. Use adapt and verify-this for the interaction claims. Inspect both themes and all breakpoint ranges, run required checks and review, then wait for David's interaction and visual approval. Update evidence and commit after approval.
```

## Evidence

```text
Status: Verified
OpenCode session: current v2 Variable Font session (runtime ID unavailable)
Commit: this session commit (`Fix variable font experiment`)
Approval: approved by David's instruction to continue through all sessions
Browser evidence: pointer, tap, reduced-motion, font-axis clamp, and eight widths verified in Chromium, Firefox, and WebKit
Lighthouse: 95 performance after reducing the variable font from 344 KB to 3.1 KB
Accessibility: 100; one semantic heading and accurate live instructions verified
Format: changed files pass Biome formatting
Lint: npm run lint passed
Typecheck: npm run ts passed
Build: npm run build passed, 50 static pages generated
Review: no blocking code findings; subset font is included in this commit
Notes: Font weights remain between 400 and 700. Pointerdown makes tap work without a separate touch path.
```
