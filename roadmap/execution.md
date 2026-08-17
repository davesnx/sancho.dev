# Execution protocol

## Branch model

Use one integration branch for the complete redesign. Run sessions in the order in [README.md](./README.md). Commit one session only after its final tree passes all checks and David approves its design and personal copy.

Do not run page sessions in parallel. Later pages depend on shared decisions and components from earlier sessions.

## Session state

Each brief uses one of these states:

- `Ready`: all blockers are verified; a fresh OpenCode session can start.
- `Blocked`: at least one listed dependency is incomplete.
- `Active`: implementation or iteration is in progress.
- `Approval`: technical gates pass and David is reviewing the result.
- `Verified`: all gates and approval pass; evidence and commit are recorded.

Only the next unblocked row in the roadmap is on the execution frontier.

## Start a session

1. Open a fresh OpenCode session in the integration branch.
2. Paste the launch prompt from the brief.
3. Record the OpenCode session ID in the brief.
4. Set the brief status to `Active`.
5. Read the complete brief and every linked input before editing.
6. Capture the current page at representative widths below, at, and above the existing 599 px, 899 px, and 1199 px breakpoints.

## Work loop

1. State the smallest falsifiable page outcome.
2. Make the smallest coherent change.
3. Inspect the real page in the browser.
4. Check browser logs and keyboard behavior.
5. Compare the result with the brief.
6. Keep changes that advance the outcome and revise changes that do not.
7. Repeat until every acceptance criterion passes.

Use `impeccable` for page work, `adapt` for responsive behavior, and `verify-this` for measurable claims. Use `architect` only for a one-way shared design or content-model decision. Use `batch` only after a stable repetitive pattern exists. Use `review` before approval. Use `blast-radius` for shared changes whose effects extend beyond the active page.

## Required checks

- Current Chrome, Safari, and Firefox behavior.
- Widths below, at, and above 599 px, 899 px, and 1199 px. Store mobile and desktop screenshots.
- Keyboard navigation and visible focus.
- Semantic landmarks, heading order, accessible names, and AA text contrast.
- Reduced-motion behavior for non-essential motion.
- Mobile Lighthouse performance score of at least 90.
- No unexpected browser console errors.
- `npm run format`
- `npm run lint`
- `npm run ts`
- `npm run build`

The repository has no automated browser test suite, and this project does not add one. Browser verification is still required.

## Approval and completion

When technical checks pass, set status to `Approval` and show David the mobile and desktop result. The same OpenCode session applies feedback until David approves it.

After approval:

1. Run the full required checks again if any file changed after the previous run.
2. Run a standard code review and resolve all critical and warning findings.
3. Record evidence in the active brief.
4. Commit the session as one focused commit.
5. Record the commit hash.
6. Set the brief to `Verified` and the next session to `Ready`.

## Evidence record

Every brief ends with:

```text
Status: Ready | Blocked | Active | Approval | Verified
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

Keep large screenshots outside Git. Record stable local paths or attached artifact names and the result in the brief.
