#### sancho.dev

## About prose exports

Edit About prose in `src/app/about/page.tsx`. Its JSX is the source for both the page and `aboutMarkdown` in `src/app/about/content.ts`, used by `/llms.txt`, `/llms-full.txt`, and `/blog/llms-full.txt`.

The export reads the explicit child tree returned by `AboutPage()` and includes only `Text` paragraphs, in order. It preserves string whitespace and visible link text, with Markdown escaping and a blank line between paragraphs. It does not render HTML or call nested components. Headings, job and date rows, the gallery, navigation, and icons are outside this prose boundary.

Inside a paragraph, the reader supports strings, numbers, empty values, arrays, fragments, `IconTextLink`, and `TextLink`. Other inline markup causes an error. Before adding a new inline element, add explicit support in `content.ts` and check the generated exports with `npm run ts` and `npm run build`. Keep the canonical JSX in `page.tsx`.

Run the focused reader checks with `node --experimental-strip-types --test scripts/about-content.test.mts`. These use component stubs. The build checks the real page imports and Next.js route bundling.
