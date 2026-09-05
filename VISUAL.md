# VISUAL.md — sancho.dev design system

Reference for agents and contributors who add UI to this site. Use the tokens
here instead of new literal values.

## Sources

- Extraction: `npx extract-design-system https://sancho.dev/about --extract-only`
  (dembrandt, chromium, 2026-09-03). The crawler rendered the dark theme and
  could not resolve CSS custom properties, so its palette was empty. Its
  typography, spacing, link and button findings are recorded below.
- Source of truth for colors: `src/lib/theme/theme.js`, which re-exports the
  active palette. Palettes: `src/lib/theme/luma.js` (active, extracted from
  `https://luma.com/barcelona` with dembrandt on 2026-09-05) and
  `src/lib/theme/navy.js` (the previous sancho.dev palette). Fonts and sizes:
  `src/lib/theme/fonts.js`. Primitives: `src/lib/components/ui.tsx`.
- One page was crawled. Treat this as a description of the site, not proof of
  every screen.

## Color

Colors are CSS variables (`var(--c-<name>)`) exposed as `colors.<name>` from
`@/theme/theme`. Each name resolves per theme.

| Token | Light | Dark | Use |
|---|---|---|---|
| backgroundPrimary | #FFFFFF | #151515 | Page background |
| backgroundSecondary | #F8F8F8 | #353535 | Cards, code blocks |
| backgroundTertiary | #EEEEEE | #555555 | Hover background for cards and buttons |
| backgroundPill | #F6F6F6 | #353535 | Rest background of the floating theme toggle pill, hover background of inline icon links |
| backgroundPillHover | #E3E3E3 | #555555 | Hover background of the floating theme toggle pill |
| backgroundLogoTile | #151515 | transparent | Tile behind company logos on /about |
| borderSubtle | rgb(21 21 21 / 4%) | rgb(255 255 255 / 8%) | Rules, dividers, subtle borders |
| borderStrong | rgb(21 21 21 / 36%) | #959595 | Card borders, interactive outlines |
| textAccent | #151515 | #FFFFFF | Strongest text, hover states, emphasis |
| textPrimary | rgb(21 21 21 / 64%) | rgb(255 255 255 / 50%) | Default text |
| textProse | #555555 | #E3E3E3 | Long-form paragraphs |
| textSecondary | #757575 | #959595 | Dates, metadata |
| textTertiary | #D4D4D4 | #757575 | Footer, separators, link underlines |

Brand colors (same in both themes): bluesky `rgb(18 133 254)`, discord
`rgb(88 101 242)`, strava `rgb(250 89 1)`, each with 60% and 20% alpha
variants (`bluesky60`, `bluesky20`, ...). Raw accents: r `#FF211B`,
g `#17E620`, b `#003AEC`.

The Luma page renders one fixed light scheme, so the light column is
extracted data (ink `#151515` on 942 elements, translucent ink borders and
text) and the dark column is a best-effort inversion built from the same
extracted greys. Luma accents seen but not adopted: pink `#F31A7C`, link blue
`#167ACF`, green `#3CBD2C`, amber `#D69712`, red `#ED2B32`.

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
H2 headings on /about use `Spacer top={6} bottom={2}` (48px above, 16px
below), matching the rendered h2 margins in blog posts.

## Shape

- Cards (about page open source items): radius 0.5rem, 1px `borderStrong`
  border, `backgroundSecondary`, hover `backgroundTertiary`.
- Company logo tile (about page): 80×80, `backgroundLogoTile` (#171717
  light, transparent dark), 1px `borderStrong`, radius 6px, logo centered
  at 30–55px.
- Repo owner avatar (about page): 15×15, `border-radius: 50%`.
- Theme toggle: radius 24px (pill). When floating it uses `backgroundPill`
  at rest and `backgroundPillHover` on hover. `IconTextLink` uses
  `backgroundPrimary` at rest and `backgroundPill` on hover.
- No box shadows on the site.
- Repo gallery (about page): shows 6 cards by default, sorted by GitHub
  stars (highest first), plus a 2-card peek row, non-interactive, that
  fades into the page background with a gradient starting 3rem above the
  row. The monospace "Show N more" text button sits centered over it with
  no background, border or radius, `textPrimary` at rest and `textAccent`
  on hover. Expanded state shows the full list, sorted the same way, with
  "Show less" below in normal flow.

## Motion

- Color and filter transitions: 150ms ease.
- Press feedback: `transform: scale(0.96)` on the theme toggle,
  `scale(0.99)` on cards, 120ms ease-out.
- Pill links (`IconTextLink`): background transition 150ms ease from
  `colors.backgroundPrimary` to `colors.backgroundPill` on hover and
  focus, the toggle's rest color. The
  icon sits at `filter: grayscale(1)` and goes to full color on the same
  hover and focus, 150ms ease.

## Icons and logos

- Assets live in `public/logos/<name>-icon.svg`, 40×40 intrinsic size.
  Logos with white glyphs sit on a baked `#171717` (grey900)
  square so they read in both themes, like `ahrefs-icon.svg`.
- GitHub org avatars come from `avatars.githubusercontent.com` with
  `s=80` for 2× density at 40px.
- Inline icon links in prose use `IconTextLink`
  (`src/lib/components/icon-text-link.tsx`): an inline pill built on
  `ButtonLink`, radius 4px, 0 3px padding cancelled by a 0 -3px margin
  so the hover background extends past the text without moving the
  surrounding prose, no underline, `white-space:
  nowrap` so icon and text never split across lines, background
  `colors.backgroundPrimary` at rest (#FFFFFF light, #141414 dark)
  and `colors.backgroundPill` on hover and `:focus-visible` (#F0F0F0
  light, #1A1A1A dark). The icon
  is a 1em square with 4px radius and 1px padding, `vertical-align: middle`
  nudged up 3px, 3px gap before the text, grayscale until the link is
  hovered or focused, with `alt=""` because the link text carries the
  meaning.
- Links without a distinctive logo (Melange) use `github-icon.svg`, the
  GitHub mark on the dark tile.
- Icon-only use: render `IconTextLink` with no children and pass
  `aria-label` with the link's name, since no text carries the meaning.

## Breakpoints

- Mobile: `max-width: 600px` (`constants.mobile.width`).
- Content max width around 1020px.

## Do

- Reuse `Text`, `TextLink`, `Row`, `Stack`, `Spacer` from `@/components/ui`.
- Use `colors.*` and `fonts.*` tokens. Never hardcode a hex outside a
  palette file in `src/lib/theme/` or an SVG asset.
- Never reference a theme variable directly (`var(--c-dark-...)`,
  `var(--c-light-...)`, `var(--c-...)`). Always import `colors` from
  `@/theme/theme`.
- Keep every interactive state visible in both themes.
