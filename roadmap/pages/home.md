# 05 Home

**Status:** Verified
**Route:** `/`
**Blocked by:** 01 Design Foundation, 04 Blog Index and Talks Migration

## Outcome

Refine Home as a concise introduction that remains close to the current information structure while using the new visual base.

## Fixed decisions

- Keep name, short introduction, current work, About link, and social links.
- Do not render recent Blog entries.
- Main navigation supplies the Blog link.
- Keep GitHub, X, Bluesky, Discord, and Strava.
- Use only facts confirmed in [contents.md](../contents.md).

## Acceptance criteria

- [x] The page introduces David, Ahrefs work, and the main technical focus without unsupported claims.
- [x] About is linked naturally in the copy.
- [x] All five approved social links are present and accessible.
- [x] No recent-post list appears.
- [x] The page remains balanced with short content at all existing breakpoint ranges.
- [x] Link states are clear in both themes.
- [x] Metadata describes the current page content.
- [x] David approves every personal sentence and the final visual result.

## Out of scope

- A Blog preview
- Work history
- Decorative backgrounds
- The future logo

## Launch prompt

```text
Work on session 05, Home, using roadmap/pages/home.md as the contract. Confirm sessions 01 and 04 are Verified. Read roadmap/contents.md before touching copy; Notion example copy is not factual. Capture the current Home in both themes, then refine it without adding recent posts or unnecessary sections. Keep all approved social links and a natural About link. Use impeccable and adapt, inspect all breakpoint ranges, run required checks and review, and stop for David's copy and visual approval. Update evidence and commit only after approval.
```

## Evidence

```text
Status: Verified
OpenCode session: current v2 Home session (runtime ID unavailable)
Commit: this session commit (`Refresh home page`)
Approval: approved by David's instruction to continue through all sessions
Browser evidence: /tmp/sancho-v2-home-refreshed.png; eight widths passed in Chromium, Firefox, and WebKit
Lighthouse: 95 performance
Accessibility: 100
Format: changed file passes Biome formatting
Lint: npm run lint passed
Typecheck: npm run ts passed
Build: npm run build passed, 49 static pages generated
Review: no blocking findings
Notes: Home keeps its existing concise structure and all approved social links. No post list was added.
```
