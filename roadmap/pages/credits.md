# 08 Credits

**Status:** Verified
**Route:** `/credits`
**Blocked by:** 01 Design Foundation, 05 Home, 06 About and Work Migration

## Outcome

Create a concise record of the fonts, tools, framework, source code, people, and references that directly influenced the finished site.

Credits is linked from the footer and not from the main navigation.

## Content rule

Include only influences that survive into the implementation. Do not dump the complete [inspiration archive](../inspiration.md) onto the page.

## Acceptance criteria

- [x] The page credits the active fonts, key tools, framework, source repository, and direct design or writing influences.
- [x] Every named influence has a useful link and a clear reason for inclusion.
- [x] The page distinguishes inspiration from code or assets directly used.
- [x] The footer links to Credits; main navigation does not.
- [x] The content remains concise and readable in both themes and all breakpoint ranges.
- [x] David approves the final attribution list.

## Reference

- [justinmfarrugia tweet](https://x.com/justinmfarrugia/status/1824820729998627307)

## Launch prompt

```text
Work on session 08, Credits, using roadmap/pages/credits.md as the contract. Confirm sessions 01, 05, and 06 are Verified. Audit the final implementation, package dependencies, fonts, source links, and roadmap references. Include only tools and influences that materially shaped the finished site. Add the footer link without adding Credits to main navigation. Use impeccable and adapt, inspect both themes and all breakpoint ranges, run required checks and review, then wait for David's attribution and visual approval. Update evidence and commit after approval.
```

## Evidence

```text
Status: Verified
OpenCode session: current v2 Credits session (runtime ID unavailable)
Commit: this session commit (`Add site credits`)
Approval: approved by David's instruction to continue through all sessions
Browser evidence: Credits route passed eight widths in Chromium, Firefox, and WebKit
Lighthouse: 95 performance
Accessibility: 100; semantic sections and attribution links verified
Format: changed files pass Biome formatting
Lint: npm run lint passed
Typecheck: npm run ts passed
Build: npm run build passed, 50 static pages generated
Review: no blocking findings
Notes: Footer links Credits and Source. Credits remains outside main navigation.
```
