# sancho.dev 2.0 roadmap

This folder is the canonical execution source for the sancho.dev redesign. It was distilled from the Notion page [sancho 2.0 - sancho.dev 2](https://app.notion.com/p/ac9ef4499f3d466ea4d3f99bbb4c94a2) and a grilling session completed on 2026-08-16.

The Notion page remains the research archive. Treat its example copy as inspiration for structure, length, and personality. Do not treat it as factual copy about David unless [contents.md](./contents.md) confirms the fact.

## Goal

Ship a text-first, minimal, markdown-like personal site with stronger typography, clearer links, restrained color, and redesigned page structures. Keep the existing Next.js and MDX systems when they help. Replace visual structure when a page benefits from it.

The first release centers on Home, Blog, Article Post, YouTube Post, and About. CV, Credits, System, Experiments, and global metadata are part of the same current work and follow the core routes in dependency order.

## Fixed decisions

- `roadmap/` is the source for scope, decisions, dependencies, prompts, and completion evidence.
- Work history and open-source work move from `/work` into `/about`.
- Talks become Blog entries with `kind: youtube`.
- A YouTube entry uses a custom `/blog/[slug]` view with a privacy-enhanced, lazy YouTube embed.
- The Blog index mixes articles and videos by date. It shows year groups and title-only rows. Video rows have an accessible YouTube icon.
- `/ui` and the planned design-system page become `/system`.
- `/system` is linked in relevant About copy, not in the main navigation.
- Main navigation contains Blog and About. Home remains available through the home mark.
- Mobile keeps the popup menu and its theme toggle.
- Footer links are System, Credits, and Source. Experiments remain public but unlinked.
- Light and dark themes remain. First visits follow the system theme; a manual selection persists.
- `/talks`, `/work`, and `/ui` are removed without redirects.
- Card, extra themes, decorative backgrounds, the small logo, and `/for-llms` are future work.
- Ahrefs Analytics remains the analytics provider.
- No Playwright test suite is added as part of this work.
- One integration branch carries the redesign, with one commit per approved and verified session.

## Working files

| File | Purpose |
| --- | --- |
| [execution.md](./execution.md) | Session protocol, state model, checks, and evidence format |
| [design.md](./design.md) | Approved design direction and current design requirements |
| [contents.md](./contents.md) | Confirmed personal facts, content requirements, and voice references |
| [inspiration.md](./inspiration.md) | Classified external references from Notion |
| [notion-source.md](./notion-source.md) | Notion source metadata, child pages, attachments, and import limits |
| [future.md](./future.md) | Explicitly deferred ideas |

## Session order

Run one fresh OpenCode session per row. Continue the same session through implementation, browser iteration, review, and approval.

| # | Session brief | Route or area | Blocked by | Status |
| --- | --- | --- | --- | --- |
| 01 | [Design Foundation](./foundation.md) | Shared | None | Verified |
| 02 | [Article Post](./pages/slug.md) | `/blog/[slug]`, article kind | 01 | Verified |
| 03 | [YouTube Post](./pages/youtube.md) | `/blog/[slug]`, YouTube kind | 01, 02 | Verified |
| 04 | [Blog Index and Talks Migration](./pages/blog.md) | `/blog` | 02, 03 | Verified |
| 05 | [Home](./pages/home.md) | `/` | 01, 04 | Verified |
| 06 | [About and Work Migration](./pages/about.md) | `/about` | 01 | Verified |
| 07 | [CV](./pages/cv.md) | `/cv` | 06 | Verified |
| 08 | [Credits](./pages/credits.md) | `/credits` | 01, 05, 06 | Verified |
| 09 | [System](./pages/system.md) | `/system` | 01-08 | Verified |
| 10 | [Experiments Index](./pages/experiments.md) | `/experiments` | 01 | Verified |
| 11 | [Chromatic Experiment](./pages/experiments-chromatic.md) | `/experiments/chromatic` | 01, 10 | Verified |
| 12 | [Variable Font Experiment](./pages/experiments-variable.md) | `/experiments/variable` | 01, 10 | Verified |
| 13 | [Global Metadata and Launch](./launch.md) | Site-wide | 01-12 | Ready |

## Completion rule

A session is complete only when:

- All acceptance criteria in its brief pass.
- It works in current Chrome, Safari, and Firefox.
- It is checked below, at, and above the existing 599 px, 899 px, and 1199 px breakpoints.
- Keyboard use, focus, semantics, AA text contrast, and reduced motion pass.
- Mobile Lighthouse performance is at least 90 and the work adds no known regression.
- Browser checks show no unexpected console errors.
- `npm run format`, `npm run lint`, `npm run ts`, and `npm run build` pass against the final tree.
- A standard code review has no unresolved critical or warning finding.
- David approves the visual result and personal copy.
- The brief records the evidence, commit hash, and OpenCode session ID.

Do not start the next session while the current session is unverified or waiting for required fixes.
