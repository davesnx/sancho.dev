# VISUAL.md — sancho.dev design system

Reference for agents and contributors who add UI to this site. Use the tokens
here instead of new literal values.

## Sources

- Extraction: `npx extract-design-system https://sancho.dev/about --extract-only`
  (dembrandt, chromium, 2026-09-03). The crawler rendered the dark theme and
  could not resolve CSS custom properties, so its palette was empty. Its
  typography, spacing, link and button findings are recorded below.
- Source of truth for colors: `src/lib/theme/theme.js`. Fonts and sizes:
  `src/lib/theme/fonts.js`. Primitives: `src/lib/components/ui.tsx`.
- One page was crawled. Treat this as a description of the site, not proof of
  every screen.

## Color

Colors are CSS variables (`var(--c-<name>)`) exposed as `colors.<name>` from
`@/theme/theme`. Each name resolves per theme.

| Token | Light | Dark | Use |
|---|---|---|---|
| backgroundPrimary | #FFFFFF | #141414 | Page background |
| backgroundSecondary | #F7F7F7 | #171717 | Cards, code blocks |
| backgroundTertiary | #F0F0F0 | #272727 | Hover background for cards and buttons |
| backgroundGrey900 | #171717 | #171717 | Fixed dark tile behind logos (same in both themes) |
| borderSubtle | #E3E3E3 | #4C4D4D | Rules, dividers, subtle borders |
| borderStrong | #CFD2D6 | #272727 | Card borders, interactive outlines |
| textAccent | #393F48 | #DCDCDC | Strongest text, hover states, emphasis |
| textPrimary | #233044 | #CFD2D6 | Default text |
| textProse | #4C586A | #CCCCCC | Long-form paragraphs |
| textSecondary | #78818C | #848686 | Dates, metadata |
| textTertiary | #B9BDC3 | #4C4D4D | Footer, separators, link underlines |

Brand colors (same in both themes): bluesky `rgb(18 133 254)`, discord
`rgb(88 101 242)`, strava `rgb(250 89 1)`, each with 60% and 20% alpha
variants (`bluesky60`, `bluesky20`, ...). Raw accents: r `#FF211B`,
g `#17E620`, b `#003AEC`.

Extraction confirmed the dark values in use on /about: text `#cfd2d6`
(90 occurrences), underline and tertiary `#4c4d4d`, hover text `#dcdcdc`.

## Typography

- Sans: self-hosted `sansFont` via `var(--font-sans)`, fallback system-ui
  stack. Mono: `var(--font-mono)`, fallback JetBrains Mono. Display:
  `var(--font-display)`, fallback Inter.
- Fluid scale from `fonts.js`, base `0.8rem + 0.13vw`, ratio 1.2:
  `fontSizeN2` 0.8rem, `fontSizeN1` 1rem, `fontSize0` base, `fontSize1`
  base×1.2 (body, ≈18.4px on desktop), `fontSize2` … `fontSize6`.
- Body text (`Text`): weight 400, line-height 1.7, letter-spacing 0.02em,
  `text-wrap: pretty`, `display: inline-block`.
- Extraction on /about: h1 38px / 600 / 1.30. Body and links 18.4px
  (1.15rem) / 400–500 / 1.61–1.70. Nav links 15.3px / 600 / uppercase /
  2px tracking. Captions and mono labels 12.8px / 400–500.

## Links (`TextLink`)

- Color `textPrimary`, weight 500, underline 1.5px, underline offset 2px,
  decoration color `textTertiary`.
- Hover: color and decoration color become `textAccent`.
- Transition: `color 150ms ease, text-decoration-color 150ms ease`.
- External links open in a new tab with `rel="noopener noreferrer"`.
- Social links use brand color at 60% alpha, full brand color on hover,
  20% alpha underline.

## Spacing

8px base. `space(n)` = n × 8px. Extraction saw 8, 16, 32, 40, 48, 96px.
Paragraph gap on /about is `Spacer top={2}` (16px). Section gaps 3–10 units.

## Shape

- Cards (work page open source items): radius 0.5rem, 1px `borderStrong`
  border, `backgroundSecondary`, hover `backgroundTertiary`.
- Company logo tile (work page): 80×80, `backgroundGrey900`, 1px
  `borderStrong`, radius 6px, logo centered at 30–55px.
- Repo owner avatar (work page): 15×15, `border-radius: 50%`.
- Theme toggle: radius 24px (pill).
- No box shadows on the site.

## Motion

- Color and filter transitions: 150ms ease.
- Press feedback: `transform: scale(0.96)` on the theme toggle,
  `scale(0.99)` on cards, 120ms ease-out.
- Pill links (`IconTextLink`): background transition 150ms ease from the
  translucent rest color to `colors.borderStrong` on hover and focus. The
  icon sits at `filter: grayscale(1)` and goes to full color on the same
  hover and focus, 150ms ease.

## Icons and logos

- Assets live in `public/logos/<name>-icon.svg`, 40×40 intrinsic size.
  Logos with white glyphs sit on a baked `#171717` (backgroundGrey900)
  square so they read in both themes, like `ahrefs-icon.svg`.
- GitHub org avatars come from `avatars.githubusercontent.com` with
  `s=80` for 2× density at 40px.
- Inline icon links in prose use `IconTextLink`
  (`src/lib/components/icon-text-link.tsx`): an inline pill built on
  `ButtonLink`, radius 4px, padding 0 4px, no underline, `white-space:
  nowrap` so icon and text never split across lines, background
  `#27272752` at rest and `colors.borderStrong` on hover and
  `:focus-visible` (theme-resolved: #CFD2D6 light, #272727 dark). The icon
  is a 1em square with 4px radius and 1px padding, `vertical-align: middle`
  nudged up 3px, 3px gap before the text, grayscale until the link is
  hovered or focused, with `alt=""` because the link text carries the
  meaning.
- Links without a distinctive logo (Melange) use `github-icon.svg`, the
  GitHub mark on the dark tile.
- Icon-only variant: a link with `iconOnly: true` in `about/content.ts`
  renders no text and gets `aria-label` set to the link's name.

## Breakpoints

- Mobile: `max-width: 600px` (`constants.mobile.width`).
- Content max width around 1020px.

## Do

- Reuse `Text`, `TextLink`, `Row`, `Stack`, `Spacer` from `@/components/ui`.
- Use `colors.*` and `fonts.*` tokens. Never hardcode a hex outside
  `theme.js` or an SVG asset. The one documented exception is the fixed
  translucent pill background in `IconTextLink`.
- Never reference a theme variable directly (`var(--c-dark-...)`,
  `var(--c-light-...)`, `var(--c-...)`). Always import `colors` from
  `@/theme/theme`.
- Keep every interactive state visible in both themes.
