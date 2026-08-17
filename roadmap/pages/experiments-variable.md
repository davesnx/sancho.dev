# 12 Variable Font Experiment

**Status:** Ready
**Route:** `/experiments/variable`
**Blocked by:** 01 Design Foundation, 10 Experiments Index

## Outcome

Repair and refine the variable-font experiment so proximity changes letter weight on pointer devices and touch devices receive a real interaction or a clear stable fallback.

## Current behavior

The experiment changes each letter's `wght` value from horizontal mouse position. Its desktop instruction incorrectly says the y axis. Its mobile instruction says to tap, but the implementation still reads mouse position. Weight values are not visibly clamped to the font's supported range.

## Acceptance criteria

- [ ] Horizontal pointer movement changes nearby letter weights smoothly on desktop.
- [ ] Font-weight values remain within the active variable font's supported range.
- [ ] Mobile touch interaction works as instructed, or the copy clearly describes a deliberate static fallback.
- [ ] Instructions name the correct axis and current interaction.
- [ ] Reduced-motion preference removes non-essential animation without hiding the text.
- [ ] The name remains readable and does not overflow at all existing breakpoint ranges.
- [ ] Keyboard and non-pointer visitors can read the experiment and its explanation.
- [ ] No server-render, hydration, input, or browser console error occurs.
- [ ] The variable-font reference link remains accessible.
- [ ] David approves the repaired interaction in desktop and mobile modes.

## Launch prompt

```text
Work on session 12, Variable Font Experiment, using roadmap/pages/experiments-variable.md as the contract. Confirm sessions 01 and 10 are Verified. Reproduce the current desktop and mobile mismatch before editing. Repair horizontal pointer behavior, clamp the variable font weight, and provide a real touch interaction or an explicit stable mobile fallback. Correct the instruction copy and respect reduced motion. Use adapt and verify-this for the interaction claims. Inspect both themes and all breakpoint ranges, run required checks and review, then wait for David's interaction and visual approval. Update evidence and commit after approval.
```

## Evidence

```text
Status: Ready
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
