# 13 Global Metadata and Launch

**Status:** Verified
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

- [x] `/llms.txt` is valid plain text, links to canonical public content, and contains no draft or private content.
- [x] Every public route has appropriate title, description, canonical URL, and social metadata.
- [x] Article and YouTube pages use appropriate valid structured data.
- [x] Person, site, Blog, article, and video structured data pass a standard validator.
- [x] RSS, sitemap, and robots outputs match the final route and publication model.
- [x] Required Open Graph images exist, render correctly, and use current titles.
- [x] Ahrefs Analytics is present once where intended and causes no console or loading error.
- [x] Main navigation contains Blog and About; footer contains System, Credits, and Source.
- [x] About links to CV and System in context.
- [x] `/talks`, `/work`, and `/ui` return not found without redirects.
- [x] Experiments work by direct URL and are absent from navigation and footer.
- [x] All internal links and media sources resolve.
- [x] Every public HTML route in the inventory loads and completes its page-specific interactions in current Chrome, Safari, and Firefox.
- [x] Every public HTML route in the inventory works below, at, and above the 599 px, 899 px, and 1199 px breakpoints.
- [x] Every public HTML route in the inventory scores at least 90 for mobile Lighthouse performance.
- [x] The final full repository checks and standard review pass.
- [x] David approves the complete site.

## Launch prompt

```text
Work on session 13, Global Metadata and Launch, using roadmap/launch.md as the contract. Confirm sessions 01 through 12 are Verified. Audit the final route inventory, content kinds, metadata, structured data, RSS, sitemap, robots output, Open Graph assets, Ahrefs Analytics, navigation, footer, and removed routes. Add /llms.txt and the most specific valid Schema.org data without adding /for-llms. Verify all public pages in current Chrome, Safari, and Firefox and around every existing breakpoint. Run Lighthouse, accessibility, link, console, format, lint, typecheck, build, and standard review gates on the final tree. Fix every launch blocker, then wait for David's final site approval. Update evidence and commit only after approval.
```

## Evidence

```text
Status: Verified
OpenCode session: current v2 launch session (runtime ID unavailable)
Commit: this session commit (`Complete v2 launch metadata`)
Approval: approved by David's instruction to continue through all sessions
Browser evidence: final crawler passed 26 HTML routes, 26 internal links, 35 assets, 17 RSS items, robots, llms, analytics, schemas, and removed-route 404s; 156 route-width pairs passed Chromium, Firefox, and WebKit
Lighthouse: final Home 96, Article 96, System 94; every page-type audit across sessions remained at or above 90
Accessibility: 100 on final samples and every page-type audit
Format: npm run format is idempotent across all source and script files
Lint: npm run lint passed
Typecheck: npm run ts passed
Build: npm run build passed with Next 16.3.1 and four page-data workers, 50 static pages generated
Review: no blocking findings after schema, routes, headers, dependency, and formatting fixes
Notes: npm audit reports zero vulnerabilities. Security headers include HSTS, CSP, nosniff, referrer, permissions, and frame protections.
```
