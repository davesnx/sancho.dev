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
| backgroundPill | #F0F0F0 | #1A1A1A | Rest background of the floating theme toggle pill, hover and keyboard focus background of text and icon links |
| backgroundPillHover | #E3E3E3 | #272727 | Hover background of the floating theme toggle pill |
| backgroundLogoTile | #171717 | transparent | Tile behind company logos on /about |
| borderSubtle | #E3E3E3 | #4C4D4D | Rules, dividers, subtle borders |
| borderStrong | #ECEEF1 | #272727 | Card borders, interactive outlines |
| textAccent | #393F48 | #DCDCDC | Strongest text, hover states, emphasis |
| textPrimary | #233044 | #ECEEF1 | Default text |
| textProse | #4C586A | #B1B0B0 | Long-form paragraphs, footer text, image captions, talk metadata and descriptions, GitHub and X social links |
| textSecondary | #4C586A | #909292 | Dates, metadata |
| textTertiary | #B9BDC3 | #4C4D4D | Separators, link underlines |

Ayu Light code foregrounds meet 4.5:1 on normal (`#F7F7F7`, minimum 4.848:1)
and highlighted (`#F0F0F0`, minimum 4.558:1) backgrounds, verified across 21 Shiki languages.

Brand colors (same in both themes): bluesky `rgb(18 133 254)`, discord
`rgb(88 101 242)`, strava `rgb(250 89 1)`, each with 60% and 20% alpha
variants (`bluesky60`, `bluesky20`, ...). Raw accents: r `#FF211B`,
g `#17E620`, b `#003AEC`.

The 2026-09-03 extraction recorded these dark values on /about: text `#cfd2d6`
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
- Talk metadata is text, not a heading: `fontSize1`, weight 600, line-height 1.3.
- Blog year headings use `textSecondary` without reduced opacity.
- Blockquotes have no reduced opacity; their paragraphs use `textProse`.
- Extraction on /about: h1 38px / 600 / 1.30. Body and links 18.4px
  (1.15rem) / 400–500 / 1.61–1.70. Nav links 15.3px / 600 / uppercase /
  2px tracking. Captions and mono labels 12.8px / 400–500.

## Links (`TextLink`)

- Color `textPrimary`, weight 500, underline 1px, underline offset 3px,
  decoration color `textTertiary`.
- Radius 2px, margin `0 -2px`, padding `1px 5px`; transparent background at rest.
- Hover and keyboard focus: background becomes `backgroundPill`; color and decoration color become `textAccent` unless overridden.
- Footer links use `textProse` at rest and `textAccent` on hover and keyboard focus.
- Transition: `color 150ms ease, text-decoration-color 150ms ease, background-color 150ms ease`; the global reduced-motion rule limits duration to 1ms.
- External links open in a new tab with `rel="noopener noreferrer"`.
- Bluesky, Discord, and Strava social links use 60% alpha brand foregrounds and
  20% alpha brand underlines at rest. On hover and keyboard focus, both foregrounds
  and underlines use the full brand color.
- GitHub and X social links use `textProse` foregrounds and `borderSubtle` underlines
  at rest. On hover and keyboard focus, both foregrounds and underlines use `textAccent`.

## Spacing

8px base. `space(n)` = n × 8px. Extraction saw 8, 16, 32, 40, 48, 96px.
Paragraph gap on /about is `Spacer top={2}` (16px). Section gaps 3–10 units.
H2 headings on /about use `Spacer top={6} bottom={2}` (48px above, 16px
below), matching the rendered h2 margins in blog posts.

## Shape

- `ButtonLink` defaults to `variant="plain"`; use `variant="filled"` for padded, rounded links with a background and visible keyboard focus outline (`src/lib/components/ui.tsx`).
- Cards (about page open source items): radius 0.5rem, 1px `borderStrong`
  border, `backgroundSecondary`, hover and keyboard focus `backgroundTertiary`.
- Company logo tile (about page): 40x40, `backgroundLogoTile` (#171717
  light, transparent dark), no border, radius 6px, right margin 1rem;
  centered logos are clipped to the tile.
- Repo owner avatar (about page): 15×15, `border-radius: 50%`.
- Blog author avatar: 18x18, circular crop, after the author name with an 8px gap.
- Blog unordered list markers: 10x2px rounded dashes via `::before`, 4px radius, `textSecondary`.
- Theme toggle: radius 24px (pill). When floating it uses `backgroundPill`
  at rest and `backgroundPillHover` on hover. `IconTextLink` uses
  `backgroundPrimary` at rest and `backgroundPill` on hover and keyboard focus.
- No box shadows on the site.
- Repo gallery (about page): shows 6 cards by default, sorted by GitHub
  stars (highest first), plus a 2-card peek row, non-interactive, that
  fades into the page background with a gradient starting 3rem above the
  row. The monospace "Show N more" text button sits centered over it with
  no background, border or radius, `textPrimary` at rest and `textAccent`
  on hover. Expanded state shows the full list, sorted the same way, with
  "Show less" below in normal flow.

## Motion

- Other color and filter transitions: 150ms ease.
- Talk and open-source card backgrounds: 300ms ease from `backgroundSecondary` to `backgroundTertiary` on hover and keyboard focus; the global reduced-motion rule caps duration at 1ms.
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
- Social links keep `TextLink` colors and underlines, unlike prose icon links.
  Each decorative logo (`alt=""`) is a non-shrinking 1em square with 4px radius
  and 1px padding. The link uses inline flex, centered alignment, a 3px gap,
  and `white-space: nowrap` to keep the logo and label together as the row wraps.
  Logos stay full color at rest, on hover, and on keyboard focus, with no
  grayscale transition.
  Discord and Strava glyphs come from `https://cdn.simpleicons.org/discord`
  and `https://cdn.simpleicons.org/strava`, on matching 40x40 brand-color tiles.
- Inline icon links in prose use `IconTextLink`
  (`src/lib/components/icon-text-link.tsx`): an inline pill built on
  `ButtonLink`, radius 2px, `1px 5px` padding and `0 -2px` margin,
  no underline, `white-space:
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
- Use `colors.*` and `fonts.*` tokens. Never hardcode a hex outside
  `theme.js` or an SVG asset.
- Never reference a theme variable directly (`var(--c-dark-...)`,
  `var(--c-light-...)`, `var(--c-...)`). Always import `colors` from
  `@/theme/theme`.
- Keep every interactive state visible in both themes.
