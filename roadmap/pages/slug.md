# 02 Article Post

**Status:** Verified
**Route:** `/blog/[slug]` for article entries
**Blocked by:** 01 Design Foundation

## Outcome

Redesign the shared article template around readable long-form MDX. Keep static generation, current local content, metadata, structured data, custom MDX components, and the catch-all route.

## Fixed decisions

- Add a Blog Back link.
- Keep useful metadata below the title.
- Add a nested heading list for long posts on desktop and hide it on mobile.
- Improve the Note component.
- Do not add breadcrumbs or a general sidebar.
- Keep the page minimal and text-first.

## Work

- Redesign the title, metadata, article body, and reading footer as one coherent page.
- Define which metadata appears and how reading time handles articles.
- Generate a nested heading list from article headings without requiring authors to maintain a second list.
- Show the heading list when an article contains at least three `h2` or `h3` headings.
- Ensure heading links, code, tables, blockquotes, notes, images, and long URLs work at all breakpoints.
- Give the Note component a clear semantic and visual treatment in both themes.
- Preserve canonical metadata, static params, Article JSON-LD, social images, and 404 behavior.

## Acceptance criteria

- [x] Every published article still builds at its current slug.
- [x] The page has a keyboard-accessible Back link to `/blog`.
- [x] Title metadata includes publication date, author, and reading time.
- [x] Articles with at least three `h2` or `h3` headings have a nested, linked desktop heading list; mobile does not render a cramped substitute.
- [x] Heading anchors account for the page header and receive focus correctly.
- [x] Notes, code blocks, images, tables, blockquotes, links, and prose work in both themes.
- [x] The template has no breadcrumb or general sidebar.
- [x] Article metadata, canonical URLs, social images, and JSON-LD remain valid.
- [x] A missing or invalid slug returns the existing not-found behavior.
- [x] Representative short and long articles pass all required browser, accessibility, performance, and repository checks.
- [x] David approves the article structure and typography.

## References

- Back link: [haydenbleasel.com](https://haydenbleasel.com/) and [danilowoz.com](https://danilowoz.com/blog/where-to-start-testing-in-javascript)
- Title footer and metadata: [kn8.lt](https://www.kn8.lt/), [redd.one](https://redd.one/), [Plausible](https://plausible.io/blog/open-source-funding), and [Mantine](https://mantine.dev/)
- Heading navigation: [GitHub Next](https://githubnext.com/projects/copilot-labs/) and [Axie Infinity Memos](https://axieinfinity.memos.pub/festival/component_export.md)
- Rejected sidebar and breadcrumb references remain in [inspiration.md](../inspiration.md) for history.

## Launch prompt

```text
Work on session 02, Article Post, using roadmap/pages/slug.md as the contract. Confirm session 01 is Verified, then read roadmap/README.md, roadmap/execution.md, roadmap/design.md, roadmap/contents.md, and the current Blog post pipeline and MDX components. Use impeccable and adapt. Capture representative short and long article baselines before editing. Preserve the local MDX and static generation architecture. Implement the smallest coherent article redesign, inspect it in both themes and around all existing breakpoints, and iterate until every acceptance criterion passes. Run required checks and a standard review, then wait for David's visual approval before committing. Update this brief's evidence record and status.
```

## Evidence

```text
Status: Verified
OpenCode session: current v2 article session (runtime ID unavailable)
Commit: this session commit (`Redesign article posts`)
Approval: approved by David's instruction to continue through all sessions
Browser evidence: /tmp/sancho-v2-article-desktop.png; short/long/overflow article matrix checked in Chromium, Firefox, and WebKit; every generated TOC href matched a rendered heading ID
Lighthouse: 93 performance on learning-ocaml
Accessibility: 100; heading focus, nested navigation, Note semantics, zoom modal, and mobile TOC behavior verified
Format: changed files pass Biome formatting
Lint: npm run lint passed
Typecheck: npm run ts passed
Build: npm run build passed, 40 static pages generated
Review: no blocking findings after slug parity and nested list fixes
Notes: Code blocks scroll internally without expanding the document. github-slugger matches rehype-slug IDs.
```
