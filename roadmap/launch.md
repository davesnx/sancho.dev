# 13 Global Metadata and Launch

**Status:** Blocked
**Area:** All public routes and generated assets
**Blocked by:** 01-12

## Outcome

Verify the complete redesign as one site, add the agreed machine-readable outputs, and close cross-page metadata, analytics, social-image, navigation, and quality gaps.

## Current work

- Add `/llms.txt` following [llmstxt.org](https://llmstxt.org/) and the [bruv.md example](https://bruv.md/llms.txt).
- Validate and correct Schema.org data on every public page with the most specific useful type, including Person, Blog, BlogPosting, and VideoObject where appropriate.
- Verify existing metadata, canonical URLs, RSS, sitemap, robots behavior, and social images against final routes and content kinds.
- Verify Ahrefs Analytics loads once on intended public pages without blocking rendering.
- Validate navigation, footer, theme initialization, and direct access to unlinked Experiments.
- Confirm `/talks`, `/work`, and `/ui` return not found and do not redirect.
- Verify no production link still points at a removed route.
- Run the complete browser, accessibility, performance, repository, and review gates.

## Fixed decisions

- Ahrefs Analytics remains.
- `/for-llms`, Card, and the new logo are future work.
- Removed routes have no redirects.
- Experiments remain public but are not linked from main navigation or footer.
- No new Playwright test suite is added.

## Route inventory

Public HTML routes are `/`, `/about`, `/blog`, every published article and YouTube `/blog/[slug]`, `/cv`, `/credits`, `/system`, `/experiments`, `/experiments/chromatic`, and `/experiments/variable`.

Generated public outputs are `/llms.txt`, RSS, sitemap, and robots files. `/talks`, `/work`, and `/ui` must return not found without redirects.

Ahrefs Analytics must load once on every public HTML route. Route-specific Open Graph output is required for Home, About, Blog, CV, Credits, System, and every published Blog slug. Experiments may use the validated site default image.

## Acceptance criteria

- [ ] `/llms.txt` is valid plain text, links to canonical public content, and contains no draft or private content.
- [ ] Every public route has appropriate title, description, canonical URL, and social metadata.
- [ ] Article and YouTube pages use appropriate valid structured data.
- [ ] Person, site, Blog, article, and video structured data pass a standard validator.
- [ ] RSS, sitemap, and robots outputs match the final route and publication model.
- [ ] Required Open Graph images exist, render correctly, and use current titles.
- [ ] Ahrefs Analytics is present once where intended and causes no console or loading error.
- [ ] Main navigation contains Blog and About; footer contains System, Credits, and Source.
- [ ] About links to CV and System in context.
- [ ] `/talks`, `/work`, and `/ui` return not found without redirects.
- [ ] Experiments work by direct URL and are absent from navigation and footer.
- [ ] All internal links and media sources resolve.
- [ ] Every public HTML route in the inventory loads and completes its page-specific interactions in current Chrome, Safari, and Firefox.
- [ ] Every public HTML route in the inventory works below, at, and above the 599 px, 899 px, and 1199 px breakpoints.
- [ ] Every public HTML route in the inventory scores at least 90 for mobile Lighthouse performance.
- [ ] The final full repository checks and standard review pass.
- [ ] David approves the complete site.

## Launch prompt

```text
Work on session 13, Global Metadata and Launch, using roadmap/launch.md as the contract. Confirm sessions 01 through 12 are Verified. Audit the final route inventory, content kinds, metadata, structured data, RSS, sitemap, robots output, Open Graph assets, Ahrefs Analytics, navigation, footer, and removed routes. Add /llms.txt and the most specific valid Schema.org data without adding /for-llms. Verify all public pages in current Chrome, Safari, and Firefox and around every existing breakpoint. Run Lighthouse, accessibility, link, console, format, lint, typecheck, build, and standard review gates on the final tree. Fix every launch blocker, then wait for David's final site approval. Update evidence and commit only after approval.
```

## Evidence

```text
Status: Blocked
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
