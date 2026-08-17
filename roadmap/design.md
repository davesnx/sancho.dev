# Design direction

This file contains design requirements for the current work. Deferred ideas live in [future.md](./future.md).

## Shared rule

The site is text-first, minimal, and markdown-like. Use strong typography, visible links, restrained borders, mono metadata, little decoration, and no card layout unless the content needs a container.

Page sessions may replace current visual structures. Keep working content, metadata, MDX, and component systems when useful. Shared components may improve during a page session when the page exposes a missing requirement; record the reason in that page brief.

## Color

- [ ] Keep the current light and dark palette values during session 01.
- [ ] Audit contrast and use stronger existing semantic text tokens where low-contrast tokens currently carry normal text.
- [ ] Preserve semantic tokens rather than page-specific color values.
- [ ] Give long-form prose, metadata, borders, and interactive states a clear hierarchy.
- [ ] Adjust syntax colors for both themes.
- [ ] Make code backgrounds visibly distinct but close to the page background. The Notion note describes this as "20% of the background"; interpret it as a restrained tonal step, not a literal opacity requirement.
- [ ] Use the visitor's system theme on first visit and persist manual selection.
- [ ] Validate AA contrast for normal text and interactive states without changing palette values. Escalate any issue that cannot be fixed through semantic token use.

### Source palette ideas

Profile colors:

`#c67f5b` `#231c1a` `#79452e` `#8a7062` `#4d2a1c` `#a14c24` `#55453a` `#26303d`

Banner colors:

`#544936` `#a29f8d` `#bcb3a1` `#311e10` `#918975` `#88775b`

Black candidates: `#100f0e` or `#101113`

### Color references

- [stephango.com/vanilla](https://stephango.com/vanilla)
- [stephango.com/flexoki](https://stephango.com/flexoki)
- [drigo.ro](https://drigo.ro/)
- [shayy.org — you can learn anything](https://shayy.org/posts/you-can-learn-anything)
- [Refactoring UI — building your color palette](https://www.refactoringui.com/previews/building-your-color-palette)
- Tool for colors: [tints.dev](https://www.tints.dev/blue/445064)
- [midday.ai](https://midday.ai/)
- [kepano tweet](https://twitter.com/kepano/status/1710791889807679899)
- Nice dark palette: [tryleap.ai](https://www.tryleap.ai/)
- Nice dark palette 2: [pierre.co](https://pierre.co/)
- [samuelkraft.com](https://samuelkraft.com/)
- Read: [anthonyhobday.com — safe rules](https://anthonyhobday.com/sideprojects/saferules/)
- Read: [danhollick tweet](https://twitter.com/danhollick/status/1620813742094286849)
- White scale: [jdsimcoe.com](https://jdsimcoe.com/)
- [alexadamov.com](https://www.alexadamov.com/about/)
- [pwign.com — generating OG images with Gatsby](https://pwign.com/blog/generating-open-graph-images-with-gatsby)
- [sli.dev demo](https://demo.sli.dev/composable-vue/1)
- White theme: [redd.one](https://redd.one/), [nkrkv.github.io/jzon](https://nkrkv.github.io/jzon/api/)

## Typography

- [ ] Define a coherent fluid type scale for display, headings, body, metadata, and code.
- [ ] Keep readable body size, line height, and measure below the 599 px mobile breakpoint.
- [ ] Verify long headings, code, links, and tables at the existing 599 px, 899 px, and 1199 px breakpoints.
- [ ] Keep the current sans, mono, and display roles unless the Foundation session proves a change improves the design.

### Tools

- Calculate type scale: [utopia.fyi/type/calculator](https://utopia.fyi/type/calculator/)
- [gridlover.net/try](https://gridlover.net/try)

### Typography references

- [benjaminmaurer.at](https://www.benjaminmaurer.at/2021/04/21/ghc-hacking-first-steps.html)
- [jakelazaroff.com — a local-first case study](https://jakelazaroff.com/words/a-local-first-case-study/)
- [stephango.com/vanilla](https://stephango.com/vanilla)
- [jonbarber.co](https://jonbarber.co/?ref=deadsimplesites)
- Nice font sizes: [risecalendar.com](https://risecalendar.com/)
- THE CHAOTIC NEUTRAL NATURE OF FONT-SIZE: [phloe.co/dev/font-size](https://phloe.co/dev/font-size)
- How to load fonts: [cramforce tweet](https://twitter.com/cramforce/status/1641189127273193472)
- The ULTIMATE GUIDE to UI FONT SIZES: [iamalexoyebade tweet](https://twitter.com/iamalexoyebade/status/1588117389551476741)
- Line height: [wooorm tweet](https://twitter.com/wooorm/status/1641154699389808642)
- [steveruiz.me — zoom UI](https://www.steveruiz.me/posts/zoom-ui) — font-sizes? hover on big elements?
- Typo size: [jakubantalik.com](http://jakubantalik.com/)
- [blog.maximeheckel.com](https://blog.maximeheckel.com/) — sidebar? font-sizes
- [tobiasahlin tweet](https://twitter.com/tobiasahlin/status/1706249373582037186)

Best proportions to copy:

- [rin.rocks](https://rin.rocks/kemurnian-fungsi) (best proportion)
- [ia.net](https://ia.net/)
- [giuseppegurgone.com](https://giuseppegurgone.com/twitter-html/)
- [matteing.com](https://matteing.com/)
- [paco.me](https://paco.me/)
- [danilowoz.com](https://danilowoz.com/)
- [rauno.me](https://rauno.me/)
- [tante.cc — the third web](https://tante.cc/2021/12/17/the-third-web/)

## Components and states

The current work must define and verify:

- Page shell, header, mobile popup navigation, footer, and theme toggle.
- Text links and button links with visible hover, active, focus-visible, and visited behavior where useful.
- Heading hierarchy, body prose, metadata, lists, blockquotes, tables, images, and horizontal rules.
- Article title block, Back link, desktop heading list, Note component, code block, and reading footer.
- YouTube icon, responsive privacy-enhanced embed, event metadata, description, and optional transcript.
- Work history and open-source entries without turning all content into generic cards.
- CV print controls and print styles.
- System examples that render real tokens and components.

### Footer

- Reference: [footer.design](https://www.footer.design/)
- Footer buttons: [nerdy.dev/ex-googler](https://nerdy.dev/ex-googler)
- Current links: System, Credits, and Source.

### Mobile navigation

Keep the current popup model and theme control. Improve focus management, spacing, motion, and responsive behavior as needed. Bottom navigation is deferred.

### Code snippet

- Visuals of: [css.master.co](https://css.master.co/)

## Accessibility and motion

- Use semantic landmarks and a valid heading order.
- Keep all actions keyboard accessible with visible focus.
- Give icons accessible names or hidden text.
- Respect `prefers-reduced-motion` for non-essential movement.
- Do not require pointer movement, hover, device orientation, or color alone to understand content.

## Performance

- Keep mobile Lighthouse performance at 90 or higher.
- Lazy-load heavy media and use `youtube-nocookie.com` for video embeds.
- Avoid layout shifts from images, embeds, fonts, and theme hydration.
- Keep decorative effects out of the current release.
