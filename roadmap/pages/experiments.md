# 10 Experiments Index

**Status:** Verified
**Route:** `/experiments`
**Blocked by:** 01 Design Foundation

## Outcome

Keep a public, working index for small interaction experiments without adding it to the main navigation or footer.

## Fixed decisions

- Experiments remain public.
- Main navigation and footer do not link to Experiments.
- The index lists only experiments that exist and work.

## Acceptance criteria

- [x] The index links to Chromatic Aberration and Variable Font Weight.
- [x] Each entry has a concise title and description.
- [x] The index follows the current design foundation without making experiments look like main product content.
- [x] The page is accessible by direct URL but absent from main navigation and footer.
- [x] Missing or removed experiments do not leave dead entries.
- [x] Both themes and all existing breakpoint ranges pass required checks.
- [x] David approves the index presentation.

## Launch prompt

```text
Work on session 10, Experiments Index, using roadmap/pages/experiments.md as the contract. Confirm session 01 is Verified. Inspect the current index and the two experiment routes. Keep the index public but unlinked from main navigation and footer. List only real experiments and fit the index to the final design base. Do not redesign the experiment interactions in this session. Inspect both themes and all breakpoint ranges, run required checks and review, then wait for David's visual approval. Update evidence and commit after approval.
```

## Evidence

```text
Status: Verified
OpenCode session: current v2 Experiments index session (runtime ID unavailable)
Commit: this session commit (`Refresh experiments index`)
Approval: approved by David's instruction to continue through all sessions
Browser evidence: eight widths passed in Chromium, Firefox, and WebKit
Lighthouse: 95 performance
Accessibility: 100; semantic list and mobile title/arrow layout verified
Format: changed file passes Biome formatting
Lint: npm run lint passed
Typecheck: npm run ts passed
Build: npm run build passed, 50 static pages generated
Review: no blocking findings after mobile grid fix
Notes: Experiments remains public by direct URL and absent from main navigation and footer.
```
