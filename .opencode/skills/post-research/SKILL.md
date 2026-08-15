---
name: post-research
description: Research a blog post topic for sancho.dev, gathering counter-arguments, community sentiment, supporting links, and data into a RESEARCH block inside the draft. Use when davesnx says "research this topic", "find sources for this post", "what's the discussion around X", or before drafting a post on an unfamiliar angle.
---

# post-research: gather material

Research a topic and store the findings inside the draft itself, so `post-draft` can consume them later. Output is raw material for inline links, not academic citations.

## What to gather

1. **Counter-arguments.** The strongest case *against* the post's thesis. Find who disagrees and their best argument, so the post can address it instead of getting ambushed in the comments. This is the highest-value item; never skip it.
2. **Community sentiment.** What HN, Reddit, and lobsters threads say about the topic. Capture the recurring opinions, the top criticisms, and any memorable framing, with thread links.
3. **Supporting links.** Docs, specs, repos, and posts worth linking inline. For each: URL plus one line on what it's useful for in this post.
4. **Data and benchmarks.** Numbers that back (or contradict) the post's claims, with the source. If sources disagree, record both numbers.

Use websearch and webfetch. Verify every URL resolves before recording it. Never invent a source, a number, or a quote; if something can't be confirmed, record it as "unverified" or leave it out.

## Where it goes

Write a `{/* RESEARCH */}` MDX comment block into the draft file, after the frontmatter (and after any ASSESSMENT block):

```
{/*
RESEARCH (YYYY-MM-DD)

Counter-arguments
- [strongest objection] — who makes it, link, and the one-line rebuttal angle if there is one.

Community sentiment
- [thread link] — what the room thinks, top criticism, notable quote.

Links worth using inline
- [url] — what it's for in this post.

Data
- [number/claim] — source link. Note disagreements between sources.
*/}
```

Rules:

- If a RESEARCH block already exists, merge into it and update the date; don't duplicate.
- If no draft file exists yet, ask whether to create the stub (`src/content/posts/<slug>.mdx`, `published: false`) or just report findings in chat.
- Keep it under ~60 lines. Research that nobody reads is decoration; record only what could change a sentence in the post.
- This block is consumed by `post-draft` and stripped before publishing.

## After gathering

Summarize in chat: the single strongest counter-argument, the overall community temperature in one line, and anything that contradicts what his dots currently claim. That last one matters most; flag it loudly.
