# Notion source record

## Main source

- Title: `sancho 2.0 - sancho.dev 2`
- URL: [Notion project page](https://app.notion.com/p/ac9ef4499f3d466ea4d3f99bbb4c94a2)
- Notion project: `sancho.dev`
- Notion status at import: `Todo`
- Created: 2021-07-07
- Imported into this roadmap: 2026-08-16

The main page contains design links, screenshots, draft copy, route ideas, technical research, and experiments. Signed Notion attachment URLs expire, so this repository records durable links and takeaways rather than temporary attachment URLs. Consult the source page when a brief refers to a Notion screenshot.

## Interpretation rule

Examples copied from other personal sites are inspiration. They can guide information order, length, tone, and interaction. They are not facts about David. [contents.md](./contents.md) is the factual source.

## Child pages

- [Font size/readability on mobile](https://app.notion.com/p/12ecd0a50f8b81b3a1e6c2fade82a219): clipped Subframe article about headless component libraries. Relevant takeaways are accessible behavior, reusable semantics, and styling control. It is not evidence for changing the current component stack.
- [Basil Yusuf](https://app.notion.com/p/12dcd0a50f8b8112bccdf6f77c35eb80): passion-first About structure, then previous work, independent publishing, education, and other interests.
- [Toby Brown](https://app.notion.com/p/12dcd0a50f8b8131ba68dbea549ff9b8): narrative origin story, selected work with images, friendly sign-off, and source link.
- [Modern MDX Template with Next.js 15](https://app.notion.com/p/169cd0a50f8b81569df7f2c7714f28a7): Next.js, MDX, Velite, and Shadcn reference. The current repository already has a newer Next.js and MDX pipeline; use this only for comparison.
- [Udara's work](https://app.notion.com/p/23fcd0a50f8b81a6bba7db871ea2da7b): work-page reference at [udara.io/work](https://udara.io/work/).
- [Next/Image canvas blur reference](https://app.notion.com/p/2b8cd0a50f8b804ebadbcc3ad80f8b63): an iPariola utility using canvas and raw PNG data URLs. Deferred to [future.md](./future.md).
- [Working with MDX in Next.js](https://app.notion.com/p/120cd0a50f8b818386ceefe0ab3b5aaf): catch-all routes, `generateStaticParams`, local MDX, custom MDX components, frontmatter, plugins, and explicit navigation ordering. The current implementation already uses these main ideas.
- [Eugene Fedorenko](https://app.notion.com/p/28ccd0a50f8b814583ace4d59b27c413): contains an unresolved Notion bookmark. Recover it manually only if later design work needs it.

## Source artifacts

- The CV section includes an existing `Resume.pdf` attachment with Notion block ID `153139b4-b503-47aa-a33b-19209cbe4721`. It is a content reference, not the new delivery format. The new CV is HTML with print CSS.
- The main page contains an unidentified internal bookmark near the MDX research and an empty embed in the inspiration collection. They have no recoverable title in the export.
- The source contains screenshots for general inspiration, selected link and button states, About and work layouts, color and theme studies, typography, article metadata and headings, breadcrumbs, background effects, and CV layouts. Use the original page as the visual record.

## Technical research outcome

Keep the current local MDX pipeline, catch-all Blog route, static params, custom MDX components, and Git-managed content. Do not replace them with Velite, Shadcn, `next-mdx-remote`, or a CMS without a new measured requirement.
