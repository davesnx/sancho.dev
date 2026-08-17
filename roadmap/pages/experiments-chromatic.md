# 11 Chromatic Experiment

**Status:** Blocked
**Route:** `/experiments/chromatic`
**Blocked by:** 01 Design Foundation, 10 Experiments Index

## Outcome

Repair and refine the chromatic-aberration text experiment so pointer movement works on desktop, device orientation works when available on mobile, and every visitor has a stable fallback.

## Current behavior

The experiment layers red, green, and blue copies of `DAVID SANCHO`. Desktop uses mouse distance. Touch devices attempt to use device orientation. The current implementation determines touch support at module load and does not expose orientation permission or a reduced-motion fallback.

## Acceptance criteria

- [ ] Desktop pointer movement changes the color separation smoothly across the interactive area.
- [ ] Mobile device orientation works only after any required user permission is handled correctly.
- [ ] Devices without orientation data receive a stable, understandable fallback.
- [ ] The effect does not depend on hover or color to explain its purpose.
- [ ] Reduced-motion preference disables or greatly reduces movement without hiding content.
- [ ] The heading remains readable and does not overflow at all existing breakpoint ranges.
- [ ] No server-render, hydration, permission, or browser console error occurs.
- [ ] Instructions match the interaction available on the current device.
- [ ] The source link for chromatic aberration remains accessible.
- [ ] David approves the repaired interaction in desktop and mobile modes.

## Launch prompt

```text
Work on session 11, Chromatic Experiment, using roadmap/pages/experiments-chromatic.md as the contract. Confirm sessions 01 and 10 are Verified. Reproduce the current desktop and mobile behavior before editing. Diagnose pointer, touch, orientation permission, hydration, and reduced-motion paths. Make the smallest repair that gives desktop pointer behavior, permitted mobile orientation behavior, and a stable fallback. Use adapt and verify-this for the interaction claims. Inspect both themes and all breakpoint ranges, run required checks and review, then wait for David's interaction and visual approval. Update evidence and commit after approval.
```

## Evidence

```text
Status: Blocked
OpenCode session: pending
Commit: pending
Approval: pending
Browser evidence: pending
Lighthouse: pending
Accessibility: pending
Format: pending
Lint: pending
Typecheck: pending
Build: pending
Review: pending
Notes: none
```
