---
name: sancho.dev
description: A quiet personal publishing system for technical writing and work.
colors:
  light-background-primary: "#FFFFFF"
  light-background-secondary: "#F7F7F7"
  light-background-tertiary: "#F0F0F0"
  light-text-accent: "#393F48"
  light-text-primary: "#233044"
  light-text-secondary: "#78818C"
  light-text-prose: "#4C586A"
  light-text-tertiary: "#B9BDC3"
  light-border-strong: "#CFD2D6"
  light-border-subtle: "#E3E3E3"
  dark-background-primary: "#141414"
  dark-background-secondary: "#171717"
  dark-background-tertiary: "#272727"
  dark-text-accent: "#DCDCDC"
  dark-text-primary: "#CFD2D6"
  dark-text-secondary: "#848686"
  dark-text-prose: "#CCCCCC"
  dark-text-tertiary: "#4C4D4D"
  dark-border-strong: "#272727"
  dark-border-subtle: "#4C4D4D"
  brand-red: "#FF211B"
  brand-green: "#17E620"
  brand-blue: "#003AEC"
typography:
  display:
    fontFamily: "Inter, sans-serif"
    fontSize: "calc((((((0.8rem + 0.13vw) * 1.25) * 1.25) * 1.25) * 1.25) * 1.25)"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "1.6px"
  headline:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "calc((((0.8rem + 0.13vw) * 1.25) * 1.25) * 1.25)"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "1px"
  body:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "calc((0.8rem + 0.13vw) * 1.25)"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "0.02em"
  label:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "0.8rem"
    fontWeight: 600
    lineHeight: 1.7
    letterSpacing: "0.05em"
rounded:
  sm: "4px"
  md: "6px"
  lg: "8px"
  xl: "12px"
  pill: "999px"
spacing:
  1: "8px"
  2: "16px"
  3: "24px"
  4: "32px"
  5: "40px"
  6: "48px"
components:
  text-link:
    textColor: "{colors.light-text-primary}"
    typography: "{typography.body}"
  navigation-item:
    textColor: "{colors.light-text-prose}"
    typography: "{typography.label}"
    height: "32px"
  content-container:
    width: "899px"
    padding: "0 32px"
  mobile-menu:
    backgroundColor: "{colors.light-background-primary}"
    rounded: "{rounded.xl}"
    padding: "16px 0"
---

# Design System: sancho.dev

## 1. Overview

### Creative North Star

"Personal README"

The site should feel like a carefully maintained README that grew into a
personal home. Writing is the main material. Navigation, metadata, links, and
code support the reading path without turning the site into a documentation
tool or a generic developer portfolio.

The current system is quiet, technical, and personal. It uses a narrow neutral
palette, a 1.25 type scale, eight-pixel spacing increments, light borders, and
short state transitions. Keep its feel while making hierarchy, accessibility,
and responsive behavior more explicit. Reject generic card grids, SaaS
landing-page cliches, decorative magazine styling, terminal cosplay, and motion
that competes with content.

**Key Characteristics:**

- Text-first layouts with a maximum content width of 899px.
- DM Sans for reading, JetBrains Mono for compact metadata, and Inter only for
  the variable-font experiment.
- Light and dark neutral themes with rare functional brand color.
- Flat surfaces separated by tone and restrained one-pixel borders.
- Clear links and small, direct interaction feedback.

## 2. Colors

The current palette is graphite and ink. Session 01 does not replace its light
or dark values. It audits how components use them and restricts low-contrast
tokens to decoration.

### Primary

- **Graphite Ink:** The primary and prose tokens carry long-form reading,
  navigation, and default interface text.
- **Clear Paper and Carbon:** The primary backgrounds define the light and dark
  reading canvases.

### Secondary

- **Signal RGB:** Red, green, and blue are reserved for the Chromatic
  Experiment. They are not general interface accents.
- **Service Colors:** Bluesky, Discord, and Strava keep their real brand roles
  on Home rather than becoming design-system colors.

### Neutral

- **Soft Surfaces:** Secondary and tertiary backgrounds separate code,
  containers, menus, and hover states without shadow.
- **Quiet Rules:** Border tokens define separators and interactive outlines.
- **Muted Text:** Secondary text is for metadata only when contrast permits.
  Tertiary text is decorative and must not carry normal-size information.

### Color Rules

**The Existing Palette Rule.** Keep the current light and dark values until a
separate palette decision approves changes.

**The Readability Rule.** A token name does not make a color suitable for text.
Normal text must meet WCAG AA against its actual background. Use stronger
existing text tokens when muted values fail.

**The Rare Color Rule.** Brand color identifies a service or powers an
experiment. It does not decorate ordinary sections.

## 3. Typography

**Display Font:** Inter, used only by the variable-font experiment.
**Body Font:** DM Sans with system sans-serif fallbacks.
**Label/Mono Font:** JetBrains Mono with monospace fallback.

The pairing is direct and familiar. DM Sans carries prose and headings without
making the site feel like a publication template. JetBrains Mono marks dates,
reading time, small technical values, and code. It must not become a costume
for every label.

### Hierarchy

- **Display:** Weight 700 at the top of the 1.25 scale, for the name or a rare
  page-level statement.
- **Headline:** Weight 700 with 1.3 line height, for `h1` through `h3`.
- **Title:** Weight 700 at intermediate scale steps, for subsections and list
  titles.
- **Body:** Weight 400 with 1.7 line height and `text-wrap: pretty`, constrained
  to a readable measure inside the content container.
- **Label:** Weight 600 at 0.8rem with tabular numerals, for dates and compact
  metadata.

### Typography Rules

**The Reading Rule.** Body copy keeps at least a 1.7 line height and a readable
65-75ch measure. Wide screens create margin, not longer lines.

**The Mono Rule.** Use mono for code and compact technical metadata. Do not use
it as a general visual shorthand for engineering.

## 4. Elevation

The system is flat by default. It creates depth with adjacent neutral tones,
one-pixel borders, and state changes rather than shadows. The mobile menu uses
an overlay and top-layer position because it changes interaction context, not
because the surface needs decorative depth.

### Elevation Rules

**The Flat Surface Rule.** Do not add shadows to ordinary content, links, code,
or cards. Use the existing surface and border tokens.

## 5. Components

### Buttons

- **Shape:** Most actions are semantic text or button links, not filled CTA
  blocks. Radius follows the containing component when one exists.
- **Primary:** Clear text, direct label, and a 44px touch target when the action
  is isolated.
- **Hover / Focus:** Short 120-200ms color or scale feedback. Global
  `focus-visible` uses a two-pixel text-accent outline with four-pixel offset.
- **Secondary / Ghost:** Button links remain visually quiet but keep a visible
  focus state and meaningful active feedback.

### Cards / Containers

- **Corner Style:** Small to medium curves from 4px to 12px.
- **Background:** Secondary neutral surface only when grouping improves meaning.
- **Shadow Strategy:** None at rest.
- **Border:** One-pixel semantic border.
- **Internal Padding:** Multiples of the eight-pixel spacing unit.

### Navigation

- Desktop uses compact Blog and About links plus the Home mark.
- Mobile keeps the accessible popup menu and theme control.
- Labels are short, high-contrast, and keyboard reachable. Motion respects
  reduced-motion preference.

### Text Links

- Links use a visible underline with 1.5px thickness and 2px offset.
- Hover changes both text and underline color.
- External links open a new tab with safe `rel` values.
- Long URLs can wrap without breaking the content width.

### Theme Toggle

- The control switches only between light and dark.
- The first visit follows the system theme. Manual choice persists.
- Icon state has an accessible label and no required motion.

## 6. Do's and Don'ts

### Do

- **Do** let writing determine layout and spacing.
- **Do** use the eight-pixel spacing system and the existing 599px, 899px, and
  1199px breakpoints.
- **Do** use semantic tokens and verify their contrast in context.
- **Do** keep links visibly interactive before hover.
- **Do** use containers only when they clarify grouping or interaction.
- **Do** preserve the current palette until a separate decision changes it.

### Don't

- **Don't** build a generic developer portfolio from repeated cards and
  technology logos.
- **Don't** use SaaS landing-page cliches, gradients, glass panels, or inflated
  claims.
- **Don't** use editorial-magazine styling as decoration rather than to improve
  reading.
- **Don't** use terminal cosplay or monospace as a substitute for design.
- **Don't** add decorative motion or color that competes with long-form content.
- **Don't** use identical card grids, tracked eyebrows, numbered section labels,
  oversized generic hero statements, gradient text, or colored side stripes.
- **Don't** place normal text in tertiary colors that fail AA contrast.
