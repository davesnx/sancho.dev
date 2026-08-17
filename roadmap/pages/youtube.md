# 03 YouTube Post

**Status:** Ready
**Route:** `/blog/[slug]` for `kind: youtube` entries
**Blocked by:** 01 Design Foundation, 02 Article Post

## Outcome

Add YouTube recordings to the local Blog content model and render them with a custom post template that shares the article page's shell and design language.

## Content contract

Each local Markdown or MDX entry needs:

- `title`
- `publishedAt`
- `kind: youtube`
- YouTube video ID or canonical URL
- Event name
- Short description
- Optional transcript in the document body

The implementation may refine field names, but the schema must validate required data and represent articles and YouTube entries explicitly.

## Fixed decisions

- A video has its own `/blog/[slug]` page.
- The page contains title, event, recording date, embedded player, short description, and optional transcript.
- Do not add a related-links section.
- Use `youtube-nocookie.com`.
- Do not load the heavy player until it is needed.

## Acceptance criteria

- [ ] The Blog content model distinguishes article and YouTube entries without unsafe casts or optional-field ambiguity.
- [ ] Invalid YouTube frontmatter fails with an actionable build error.
- [ ] A YouTube entry generates a static `/blog/[slug]` page.
- [ ] The page displays title, event, recording date, description, and an optional transcript.
- [ ] The responsive player keeps its aspect ratio and does not overflow.
- [ ] The embed uses `youtube-nocookie.com` and does not load the full player before it is needed.
- [ ] The player has an accessible title and keyboard behavior.
- [ ] Video pages do not show article reading time when it would be misleading.
- [ ] Video metadata and initial structured data describe a video rather than an article; session 13 performs final site-wide validation.
- [ ] No related-links section appears.
- [ ] Both themes and all existing breakpoints pass the required checks.
- [ ] David approves the video page.

## References

- Current recordings and descriptions: [contents.md](../contents.md)
- Original Blog and Talks requirements: [Notion source](../notion-source.md)

## Launch prompt

```text
Work on session 03, YouTube Post, using roadmap/pages/youtube.md as the contract. Confirm sessions 01 and 02 are Verified. Read roadmap/README.md, roadmap/execution.md, roadmap/design.md, roadmap/contents.md, the current Blog content model, Article Post view, metadata helpers, and MDX loading code. Use architect only if the article/youtube content union is a one-way schema decision that needs alternatives; otherwise make the smallest explicit type change. Build one representative local YouTube entry and its custom slug view. Use a lazy privacy-enhanced embed. Inspect both themes and all breakpoint ranges, then run required checks and review. Wait for David's approval before committing and update the evidence record.
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
