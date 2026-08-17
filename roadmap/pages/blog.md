# 04 Blog Index and Talks Migration

**Status:** Ready
**Route:** `/blog`
**Blocked by:** 02 Article Post, 03 YouTube Post

## Outcome

Present articles and YouTube recordings in one chronological Blog index, then remove the old Talks route without a redirect.

## Fixed decisions

- Group entries by year.
- Show only the Markdown or MDX title in each row.
- Give YouTube rows an accessible YouTube icon next to the title.
- Do not show descriptions, thumbnails, or embedded players on the index.
- Mix articles and videos in date order.
- Keep RSS access.

## Work

- Adapt the Blog grouping and row UI to the article/YouTube content union.
- Migrate all five current Talks records into local Blog content.
- Recover accurate recording dates from durable source metadata rather than inventing dates.
- Keep each short description for its YouTube slug page, not the index.
- Remove `/talks` and its Talks-only component when no caller remains.
- Do not add a redirect from `/talks`.

## Acceptance criteria

- [ ] Articles and videos appear in one newest-first list grouped by year.
- [ ] Every row displays only its title; video rows also display an accessible YouTube icon.
- [ ] Every row links to its local `/blog/[slug]` page.
- [ ] All five current Talks entries exist as validated local content.
- [ ] No index row loads YouTube assets or an iframe.
- [ ] `/talks` no longer exists and no redirect is configured.
- [ ] RSS and other content consumers include video entries in a sensible form or explicitly document why they do not.
- [ ] Empty, single-year, and multi-year data shapes do not break the page.
- [ ] Both themes and all existing breakpoints pass required checks.
- [ ] David approves the list density and video marker.

## References

- Index grouping: [gustavofior.com/blog](https://www.gustavofior.com/blog)
- Talk inventory: [contents.md](../contents.md)

## Launch prompt

```text
Work on session 04, Blog Index and Talks Migration, using roadmap/pages/blog.md as the contract. Confirm sessions 02 and 03 are Verified. Read the roadmap inputs and inspect the current Blog, Talks, RSS, and content-loading code. Migrate the five talks to validated local YouTube content, then redesign the index as title-only year groups with an accessible YouTube icon. Do not load video media on the index. Remove /talks without a redirect only after all content has migrated. Inspect both themes and all existing breakpoint ranges. Run required checks and review, wait for David's approval, then update evidence and commit.
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
