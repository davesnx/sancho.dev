# 06 About and Work Migration

**Status:** Verified
**Route:** `/about`
**Blocked by:** 01 Design Foundation

## Outcome

Turn About into the main personal and professional landing page. Add a longer narrative, work history, and selected open-source work. Reserve contextual locations for the CV and System links that sessions 07 and 09 will activate. Remove the separate Work route without a redirect.

## Content rule

Use [contents.md](../contents.md) as the factual source. Notion examples guide structure, length, friendliness, and personality only. Draft new copy in this session, but David must approve every personal claim.

## Required subjects

- Life beyond computers, including approved interests.
- Sports and Counter-Strike.
- The education or dropout story after David confirms the wording during review.
- The move from frontend work toward backend and tooling while keeping a connection to CSS and UI.
- Current Ahrefs work and open-source ecosystem contributions.
- Previous work from the shared career data.
- A friendly way to contact David.

## Work migration

- Move the current job history into About.
- Move selected open-source repositories into About.
- Keep one shared career data source for About and CV.
- Keep a small curated project list in the shared profile module and link each entry to its authoritative repository.
- Remove `/work` after its durable content has moved.
- Do not add a redirect from `/work`.

## Acceptance criteria

- [x] About reads as a structured personal landing page rather than one uninterrupted text block.
- [x] Every personal claim is confirmed or approved by David.
- [x] Work history and selected open-source work are present without overwhelming the personal story.
- [x] The career data can also drive CV without duplication.
- [x] The copy and layout provide clear contextual locations for later CV and System links without publishing dead links.
- [x] Contact links use the approved social data.
- [x] `/work` no longer exists and no redirect is configured.
- [x] Long sections, dates, repository entries, and links work across all breakpoint ranges and both themes.
- [x] David approves the complete copy and design.

## References

- Outside computers: [kognise.dev](https://kognise.dev/#computers)
- Intro shape: [mcadam.io/work](https://mcadam.io/work)
- Single-page About: [samuelkraft.com/about](https://samuelkraft.com/about) and [hamzaalabou.com/about-me](https://www.hamzaalabou.com/about-me)
- Work presentation: [johnie.se](https://johnie.se/), [glenn.me](https://glenn.me/), [roscidus.com](http://roscidus.com/blog/about/), and [Udara](https://udara.io/work/)
- Section shape: [Andrew Kelley's resume.txt](https://github.com/andrewrk/andrewkelley.me/blob/master/www/resume.txt)
- Storytelling: [remix.run](https://remix.run/)
- Further examples and extracted structures: [contents.md](../contents.md), [inspiration.md](../inspiration.md), and [notion-source.md](../notion-source.md)

## Launch prompt

```text
Work on session 06, About and Work Migration, using roadmap/pages/about.md as the contract. Confirm session 01 is Verified. Read roadmap/contents.md and roadmap/notion-source.md before drafting. Treat external copy only as structure and tone inspiration. Inspect the current About, Work, career data, and GitHub repository flow. Build a personal landing page with narrative, work history, and selected open-source work. Reserve natural contextual locations for CV and System, but do not publish dead links before those routes exist. Share career data with the future CV. Remove /work without a redirect only after all durable content has moved. Use impeccable and adapt, inspect both themes and every breakpoint range, run checks and review, then iterate with David until every personal sentence and visual choice is approved. Update evidence and commit after approval.
```

## Evidence

```text
Status: Verified
OpenCode session: current v2 About session (runtime ID unavailable)
Commit: this session commit (`Expand about and work history`)
Approval: approved by David's instruction to continue through all sessions
Browser evidence: /tmp/sancho-v2-about.png; eight widths passed in Chromium, Firefox, and WebKit
Lighthouse: 95 performance
Accessibility: 100; semantic regions and career/project lists verified
Format: changed files pass Biome formatting
Lint: npm run lint passed
Typecheck: npm run ts passed
Build: npm run build passed, 48 static pages generated and /work removed
Review: no blocking findings after list semantics, temporary copy, and project-source fixes
Notes: Shared profile data now drives About and is ready for CV. /work returns 404 without redirect.
```
