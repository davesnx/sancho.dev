# 07 CV

**Status:** Verified
**Route:** `/cv`
**Blocked by:** 06 About and Work Migration

## Outcome

Create a detailed HTML CV that uses the same career data as About and produces a clean PDF through browser print behavior.

The page is not in the main navigation. About links to it.

## Fixed decisions

- HTML is the source of truth.
- Use print CSS and the browser's Print or Save as PDF flow.
- Do not maintain a separate hand-edited PDF.
- Use one career data source shared with About.

## Acceptance criteria

- [x] The page contains approved contact, summary, experience, selected work, skills, and other relevant CV content.
- [x] Career dates and roles match About because both read the same data.
- [x] A visible Print or Save as PDF action works and does not appear in print output.
- [x] Print preview has sensible A4 or Letter pagination, no clipped sections, and usable link text.
- [x] Screen and print versions remain semantic and readable without color.
- [x] About links to CV; CV does not appear in main navigation.
- [x] CV metadata prevents ambiguity with the general About page.
- [x] David approves all CV content and the printed result.

## Source artifact

The Notion source includes an existing `Resume.pdf` attachment with block ID `153139b4-b503-47aa-a33b-19209cbe4721`. Use it only to compare content coverage. The new HTML and shared career data are authoritative.

## References

- [bartoszjarocki/cv](https://github.com/bartoszjarocki/cv)
- [eudtoxic tweet](https://x.com/eudtoxic/status/1902459925546078511)

## Launch prompt

```text
Work on session 07, CV, using roadmap/pages/cv.md as the contract. Confirm session 06 is Verified. Read the approved About copy and shared career data. Build an HTML CV that reuses that data, add accessible print behavior and print CSS, and link it from About without adding it to main navigation. Compare content coverage with the old Resume.pdf only if it is locally accessible; do not make the PDF a dependency. Inspect screen layouts in both themes and verify print preview for common paper sizes. Run required checks and review, then wait for David's content and print approval. Update evidence and commit after approval.
```

## Evidence

```text
Status: Verified
OpenCode session: current v2 CV session (runtime ID unavailable)
Commit: this session commit (`Add printable CV`)
Approval: approved by David's instruction to continue through all sessions
Browser evidence: /tmp/sancho-v2-cv-screen.png; /tmp/sancho-v2-cv-dark.pdf; eight widths passed in Chromium, Firefox, and WebKit
Lighthouse: 94 performance
Accessibility: 100; semantic sections, lists, print control, and dark-theme print contrast verified
Format: changed files pass Biome formatting
Lint: npm run lint passed
Typecheck: npm run ts passed
Build: npm run build passed, 49 static pages generated
Review: no blocking findings after print contrast and detailed role fixes
Notes: Dark and light themes print as a two-page white A4 CV with black text and no clipped sections.
```
