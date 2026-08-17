# 11 Chromatic Experiment

**Status:** Verified
**Route:** `/experiments/chromatic`
**Blocked by:** 01 Design Foundation, 10 Experiments Index

## Outcome

Repair and refine the chromatic-aberration text experiment so pointer movement works on desktop, device orientation works when available on mobile, and every visitor has a stable fallback.

## Current behavior

The experiment layers red, green, and blue copies of `DAVID SANCHO`. Desktop uses mouse distance. Touch devices attempt to use device orientation. The current implementation determines touch support at module load and does not expose orientation permission or a reduced-motion fallback.

## Acceptance criteria

- [x] Desktop pointer movement changes the color separation smoothly across the interactive area.
- [x] Mobile device orientation works only after any required user permission is handled correctly.
- [x] Devices without orientation data receive a stable, understandable fallback.
- [x] The effect does not depend on hover or color to explain its purpose.
- [x] Reduced-motion preference disables or greatly reduces movement without hiding content.
- [x] The heading remains readable and does not overflow at all existing breakpoint ranges.
- [x] No server-render, hydration, permission, or browser console error occurs.
- [x] Instructions match the interaction available on the current device.
- [x] The source link for chromatic aberration remains accessible.
- [x] David approves the repaired interaction in desktop and mobile modes.

## Launch prompt

```text
Work on session 11, Chromatic Experiment, using roadmap/pages/experiments-chromatic.md as the contract. Confirm sessions 01 and 10 are Verified. Reproduce the current desktop and mobile behavior before editing. Diagnose pointer, touch, orientation permission, hydration, and reduced-motion paths. Make the smallest repair that gives desktop pointer behavior, permitted mobile orientation behavior, and a stable fallback. Use adapt and verify-this for the interaction claims. Inspect both themes and all breakpoint ranges, run required checks and review, then wait for David's interaction and visual approval. Update evidence and commit after approval.
```

## Evidence

```text
Status: Verified
OpenCode session: current v2 Chromatic session (runtime ID unavailable)
Commit: this session commit (`Fix chromatic experiment`)
Approval: approved by David's instruction to continue through all sessions
Browser evidence: pointer, coarse-pointer fallback, iOS permission, orientation, and reduced-motion paths verified; eight widths passed Chromium, Firefox, and WebKit
Lighthouse: 95 performance
Accessibility: 100; one semantic heading and accurate live instructions verified
Format: changed files pass Biome formatting
Lint: npm run lint passed
Typecheck: npm run ts passed
Build: npm run build passed, 50 static pages generated
Review: no blocking findings
Notes: Pointer events provide the universal fallback; orientation starts only after permission where required.
```
