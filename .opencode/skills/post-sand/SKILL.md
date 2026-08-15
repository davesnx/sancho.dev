---
name: post-sand
description: Simplify and tighten a blog post's prose, fixing non-native English while keeping davesnx's voice. Use when davesnx says "simplify this", "sand this post", "tighten the writing", "fix my English", or "polish this draft".
---

# post-sand: sanding down

The simplify pass. Take existing prose and make it tighter, plainer, and native-English, without flattening the voice. Named after endler.dev's "building up and sanding down": the structure already exists, you remove material.

## What sanding does

Work through the post paragraph by paragraph, editing the file in place:

1. **Fix the English.** Spanish-influenced grammar, wrong prepositions, article misuse, tense slips. "Explain me" becomes "explain to me". "I'm surprised why" becomes "I'm surprised that". The tone survives; the errors don't.
2. **Cut filler.** Throat-clearing openers, emphasis crutches ("really", "actually", "basically"), redundant adverbs, sentences that restate the previous one.
3. **Shorten.** Prefer the plain word: "use" over "utilize", "start" over "commence". Split sentences carrying two ideas. A paragraph that says one thing in five sentences becomes two.
4. **Keep the rhythm varied.** Mix sentence lengths. If three consecutive sentences match length, break one.
5. **De-slop.** Remove AI tells: "it's worth noting", "delve", "In conclusion", "not X, it's Y" contrasts, meta-joiners ("In this section we will..."), pull-quote bait, em-dash chains.

## What sanding never touches

- Code blocks. Not even formatting.
- Frontmatter.
- Link targets (link *text* may be tightened).
- `{/* ASSESSMENT */}`, `{/* RESEARCH */}`, and `{/* TODO(davesnx) */}` blocks.
- His personality markers: "lol", parenthetical asides, self-deprecation, blunt verdicts like "turned out to be crap". These are voice, not errors. When in doubt whether something is voice or error, keep it and flag it in the recap instead.
- Meaning. If a sentence is ambiguous and both readings are plausible, ask rather than pick.

## Scale of intervention

Default is medium grit: tighten sentences, fix grammar, cut filler, but keep his sentence-level structure. Do not restructure sections or rewrite paragraphs from scratch unless he explicitly asks for a heavier pass ("rewrite this section", "make it half as long").

## The recap (learning mode)

He's improving his English on purpose. After the pass, output a compact recap:

- A table of at most 10 entries, only **recurring patterns** (not every one-off typo): `before | after | why (one line)`.
- One line at the end naming the single most frequent pattern in this post, so he knows what to watch for next time.
- No inline lecturing inside the post. No grammar essay. The recap is the whole lesson.

Then report: words before, words after, and whether anything was flagged as "voice or error?" for him to decide.
