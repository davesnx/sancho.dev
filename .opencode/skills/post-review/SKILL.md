---
name: post-review
description: Review a blog post draft for sancho.dev with a fresh-eyes reader test, slop scan, voice check, structure check, and link verification, writing the result as an ASSESSMENT block. Use when davesnx says "review this post", "assess this draft", "is this ready to publish", or "reader test this".
---

# post-review: assessment and reader test

Review a post the way davesnx already reviews his own: a `{/* ASSESSMENT */}` comment block at the top of the file, plus a zero-context reader test he can't do himself. Verdicts are constructive: every weakness comes with a way to fix it. Never conclude "abandon this post"; conclude what it would take to make it work.

## The five checks

### 1. Zero-context reader test

Spawn a `general` subagent with ONLY the post's body (no frontmatter, no comment blocks, no conversation context) and these questions:

- What is the thesis of this post, in one sentence?
- Where did you get confused or have to re-read?
- What knowledge does the post assume you already have?
- Which passages feel like generic AI filler rather than a person talking?
- Did you want to finish reading it? Where did your attention drop?

The subagent must not be told who wrote it or what it's supposed to say. Compare its thesis statement against the intended one; a mismatch is the most important finding of the whole review.

### 2. Slop scan

Flag AI tells and filler: throat-clearing openers, "delve"/"it's worth noting"/"In conclusion", "not X, it's Y" contrasts, adverb crust, three-item lists by reflex, metronomic sentence rhythm, paragraphs ending in pull-quotes, em-dash chains, vague declaratives ("the implications are significant"). Quote each offending line; don't just say "some slop exists".

### 3. Voice check

Read one canon post (see writer agent prompt), then flag passages that sound like ChatGPT wearing his shirt: too formal, too balanced, too polished, hedging where he'd be blunt, missing the parenthetical asides and self-deprecation. Quote the off-voice passage and sketch how he'd say it.

### 4. Structure check

- Hook: does the first paragraph open with a concrete claim or personal moment, or does it warm up?
- Arc: problem, idea, implementation. Are sections in that order, and does any section run long without a code block or example?
- Anecdotes: claims that need a concrete story but don't have one (his most common gap, per his own assessments).
- Ending: does it land a quiet practical punch, or does it fizzle into summary?

### 5. Fact and link check

- Fetch every external URL in the post and confirm it resolves and says what the post claims it says.
- Flag technical claims that are checkable and wrong or outdated (API names, version numbers, benchmark figures).
- Flag frontmatter problems: `description: "TBD"`, empty description, missing tags.

## Output: the ASSESSMENT block

Write or update the `{/* ASSESSMENT */}` block at the top of the post body (after frontmatter), in his existing four-section format:

```
{/*
ASSESSMENT

1) Opinion on quality and voice
- Honest verdict on how close to publishable it is, what works, what the strongest parts are.
- Reader-test result: what a cold reader took as the thesis, where they got confused.

2) What's missing or weak
- Concrete, quoted findings from the slop scan, voice check, structure check, and link check.

3) How I would finish it
- An ordered, actionable plan: which sections need a mini-story, what to cut, what to verify.

4) Hero image and visual concepts
- 2-3 hero image options and any in-article visual ideas, in the style of his past assessment blocks.
*/}
```

If an ASSESSMENT block already exists, replace it; stale reviews are worse than none. After writing, summarize in chat: publishable-after-N-fixes verdict, the top 3 fixes, and whether the reader test matched the intended thesis.
