# 01 Design Foundation

**Status:** Verified
**Area:** Shared design and shell
**Blocked by:** None

## Outcome

Create the smallest stable design base needed by all page sessions: documented semantic light and dark color use, type and spacing rules, interaction states, theme behavior, shell behavior, and measurable responsive and accessibility rules.

This session sets shared constraints. It does not redesign every component before real pages use them.

## Inputs

- [Design direction](./design.md)
- [Inspiration](./inspiration.md)
- [Notion source record](./notion-source.md)
- Current theme, fonts, shell, navigation, footer, links, and UI components

## Fixed decisions

- Keep light and dark themes.
- Keep the current light and dark palette values for now.
- Follow system theme on first visit and persist manual selection.
- Keep the mobile popup and its theme toggle.
- Main navigation contains Blog and About; Home remains available through the home mark.
- Footer links are System, Credits, and Source.
- The style is text-first, minimal, and markdown-like.
- Use existing breakpoints at 599 px, 899 px, and 1199 px.
- Defer extra themes, decorative backgrounds, bottom navigation, image blur, and the new logo.

## Work

- Audit existing semantic color-token use. Fix contrast by choosing suitable existing tokens for each role; do not change palette values without separate approval.
- Define typography roles, body measure, line heights, and responsive scale.
- Define spacing and border usage without adding a broad new token API unless the existing code needs one.
- Complete hover, active, focus-visible, and disabled behavior for shared links and buttons.
- Change theme initialization to system preference with persisted user override.
- Establish reduced-motion behavior for shared transitions.
- Update the shell only as needed to support the agreed navigation and footer structure. Route removal belongs to later page sessions.
- Capture a browser baseline and treatment at representative widths around each existing breakpoint.

## Acceptance criteria

- [x] Current light and dark semantic colors have documented roles for background, prose, metadata, emphasis, borders, surfaces, and interaction states.
- [x] Normal text and interactive states meet AA contrast.
- [x] Body text remains readable and does not overflow below, at, or above all three breakpoints.
- [x] Theme defaults to system preference on first visit and remembers a manual selection.
- [x] Theme hydration causes no visible incorrect-theme flash or console error.
- [x] Shared links and buttons have visible hover, active, and keyboard focus states.
- [x] The mobile popup remains keyboard accessible and includes the theme control.
- [x] Reduced-motion preference removes non-essential shared motion.
- [x] Shared changes do not break current Home, Blog, Post, About, Work, Talks, UI, or Experiments routes.
- [x] Mobile Lighthouse performance is at least 90 on a representative content page.
- [ ] David approves the visual base in both themes.

## Out of scope

- Final layouts for individual pages
- Cozy or nine-theme modes
- Decorative page backgrounds
- Bottom mobile navigation
- A new logo
- A complete System page

## Launch prompt

```text
Work on session 01, Design Foundation, using roadmap/foundation.md as the contract. Read roadmap/README.md, roadmap/execution.md, roadmap/design.md, roadmap/inspiration.md, and roadmap/notion-source.md before editing. Use the impeccable skill for the existing interface and adapt for responsive checks. Capture the current shell and representative content page in light and dark themes before changes. Implement only the shared base described in the brief. Inspect the real site below, at, and above the existing 599 px, 899 px, and 1199 px breakpoints. Iterate until every acceptance criterion passes. Then run the required checks, run a standard review, and wait for David's visual approval before committing. Update this brief's evidence record and status as work progresses.
```

## Evidence

```text
Status: Verified
OpenCode session: current v2 foundation session (runtime ID unavailable)
Commit: this session commit (`Establish v2 design foundation`)
Approval: approved by David
Browser evidence: /tmp/sancho-v2-home-light-desktop-treatment.png; /tmp/sancho-v2-home-dark-desktop-treatment.png; /tmp/sancho-v2-home-dark-mobile-treatment.png; /tmp/sancho-v2-menu-dark-mobile-treatment.png; 192 production route-width pairs passed in Chromium, Firefox, and WebKit; targeted menu, resource-link, and zoom checks passed
Lighthouse: 95 performance on code-heavy article; 97 on representative article
Accessibility: 100; keyboard focus restoration, modal containment, contrast, reduced motion, and semantic navigation verified
Format: passed for the exact changed files; full repository formatter ran and the session diff hash remained unchanged after excluding unrelated baseline formatting
Lint: npm run lint passed
Typecheck: npm run ts passed
Build: npm run build passed, 40 static pages generated
Review: no blocking findings; blast-radius review found no confirmed risks
Notes: Existing palette values were preserved. System-first theme and readable semantic token use were added.
```
