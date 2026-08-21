#### sancho.dev

The site is statically exported with Next.js and deployed to Cloudflare Pages.

Agent-facing resources:

- `/llms.txt` gives topic and usage guidance with focused Markdown links.
- `/llms-full.txt` contains the complete published article corpus.
- Requests for `/`, `/about`, and `/blog/<slug>` with `Accept: text/markdown` receive Markdown at the canonical URL.
- Unknown canonical paths keep status `404` and return recovery Markdown when requested.
