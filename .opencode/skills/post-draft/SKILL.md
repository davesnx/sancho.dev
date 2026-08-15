---
name: post-draft
description: Turn bullet points, stubs, or notes into a complete blog post for sancho.dev. Use when davesnx says "draft this post", "complete my dots", "finish this draft", "write this post from my notes", or points at a file in src/content/drafts/ or an unpublished post.
---

# post-draft: dots to prose

Turn davesnx's notes into a full post in his voice. He writes the dots; you write the rest. The workflow has one checkpoint (the outline) and otherwise runs in two big steps.

## Step 0: Gather

1. Read the source material: the stub in `src/content/drafts/`, the WIP in `src/content/posts/`, or the bullets he pasted.
2. Read any `{/* RESEARCH */}` block in the file. That's pre-gathered material; use it.
3. Read any `{/* ASSESSMENT */}` block. That's his own review of the draft; treat it as the spec for what to fix.
4. Read two canon posts (listed in the writer agent prompt) to calibrate voice. Do this every time; don't trust memory.

## Step 1: Interview

Ask 5-10 pointed questions. The interview exists to extract what's in his head, not to seek approval. Good questions:

- "Bullet 3 says 'the cache thing was a disaster'. What actually happened?"
- "What's your actual position: would you recommend X for production today?"
- "What should the reader be able to do after this post that they couldn't before?"
- "Is there a benchmark/number behind this claim, or is it a feeling?"

Rules:

- Number the questions so he can answer in shorthand ("1: yes, 2: it crashed in CI, 3: skip it").
- He may answer in Spanish or Spanglish. Fine. Output is English.
- Don't ask things the dots already answer. Don't ask about formatting or process.
- If the dots are unusually complete, ask fewer questions. Three good questions beat ten filler ones.

## Step 2: Outline checkpoint

Produce a compact outline, roughly 10 lines:

- The hook (one sentence: the concrete personal moment or claim that opens the post).
- Section headers with one line each on what they cover.
- The ending (what quiet punch or practical takeaway it lands on).
- Where code blocks go and what they show.
- Any `TODO(davesnx)` holes you already know you'll leave.

Wait for his "go" or adjustments. Do not draft prose before the outline is approved.

## Step 3: One-shot draft

Write the complete post in a single pass, directly into the file.

- Keep existing frontmatter. If creating a new file, fill `title`, `publishedAt` (today), `description`, `tags`, `published: false`.
- New drafts go to `src/content/posts/<slug>.mdx` with `published: false` (that's the tier he actually iterates in). Only keep files in `src/content/drafts/` if they started there and he hasn't asked to promote them.
- Target length: match the topic, not a quota. His published posts run 1,000-3,300 words. A small tip post should stay small.
- Anecdotes you don't have become `{/* TODO(davesnx): the story about X. The section needs a concrete moment here, 2-4 paragraphs. */}`. Never write fiction in his name.
- Claims that need numbers you don't have become `{/* TODO(davesnx): benchmark/number for this claim */}`.
- Use his code-block syntaxes (`mlx`, `reason`, `dune`, `cram`) where appropriate. Code must be plausible and consistent with his real projects; if unsure, mark it `{/* TODO(davesnx): verify this compiles */}`.
- Remove the raw dots/notes the draft was built from once their content is absorbed. The ASSESSMENT and RESEARCH blocks stay.

## Step 4: Hand off

After writing, report: word count, the TODO holes left, and one sentence on the weakest part of the draft. Suggest `post-sand` once he fills the TODOs, then `post-review` before publishing. Don't run them unasked.
