/* This file can't have any dependency, we inject it outside of the app during SSR */

/**
 * @typedef {Object} CommonValues
 * @property {string} r - Red color value
 * @property {string} g - Green color value
 * @property {string} b - Blue color value
 * @property {string} bluesky - Bluesky brand color
 * @property {string} bluesky60 - Bluesky brand color
 * @property {string} bluesky20 - Bluesky brand color
 * @property {string} discord - Discord brand color
 * @property {string} discord60 - Discord brand color
 * @property {string} discord20 - Discord brand color
 * @property {string} strava - Strava brand color
 * @property {string} strava60 - Strava brand color
 * @property {string} strava20 - Strava brand color
 */

/**
 * Common color values shared between themes
 * @type {CommonValues}
 */
const commonValues = {
  r: '#FF211B',
  g: '#17E620',
  b: '#003AEC',
  bluesky: 'rgb(18 133 254)',
  bluesky60: 'rgb(18 133 254 / 60%)',
  bluesky20: 'rgb(18 133 254 / 20%)',
  discord: 'rgb(88 101 242)',
  discord60: 'rgb(88 101 242 / 60%)',
  discord20: 'rgb(88 101 242 / 20%)',
  strava: 'rgb(250 89 1)',
  strava60: 'rgb(250 89 1 / 60%)',
  strava20: 'rgb(250 89 1 / 20%)',
};

/**
 * @typedef {Object} ThemeValues
 * @property {string} backgroundPrimary - Main page background color
 * @property {string} backgroundSecondary - Secondary surface background (cards, code blocks)
 * @property {string} backgroundLogoTile - Tile behind company logos: dark in light mode, transparent in dark mode
 * @property {string} textAccent - Strongest foreground: hover states, emphasis, bold text
 * @property {string} textProse - Long-form content text (paragraphs, nav items, code)
 * @property {string} textPrimary - Default/fallback text color across components
 * @property {string} textSecondary - Secondary info: dates, metadata, descriptions
 * @property {string} textTertiary - Tertiary text: footer, separators, decorations
 * @property {string} borderSubtle - Borders, rules, dividers, subtle backgrounds
 * @property {string} borderStrong - Card borders, interactive element outlines
 * @property {string} backgroundTertiary - Hover state backgrounds for cards and buttons
 * @property {string} backgroundPill - Rest background of the floating theme toggle pill, hover background of inline icon links
 * @property {string} backgroundPillHover - Hover background of the floating theme toggle pill
 */

/**
 * Neutral scale extracted from https://luma.com/barcelona (public Luma event discovery page).
 * Extraction date: 2026-09-05, via `extract-design-system` (dembrandt).
 * The page renders a single fixed light scheme (no CSS reacts to `prefers-color-scheme`), so
 * every value below is a real color reported by the tool for that rendering, ordered lightest
 * to darkest:
 * grey100 `--secondary-bg-color-translucent` / logo tile background (both #F8F8F8), grey200-400
 * hover-state background colors, grey500 `--primary-border-color`, grey600
 * `--secondary-button-bg-color`, grey700 `--table-header-color`, grey800
 * `--primary-button-link-color`, grey900 `--primary-button-hover-link-color`, grey1000 the
 * page's dominant ink color (#151515, used on 942 elements).
 */
const lumaGreyScale = {
  grey100: '#F8F8F8',
  grey200: '#F6F6F6',
  grey300: '#EEEEEE',
  grey400: '#E3E3E3',
  grey500: '#D4D4D4',
  grey600: '#959595',
  grey700: '#757575',
  grey800: '#555555',
  grey900: '#353535',
  grey1000: '#151515',
};

/**
 * Light theme specific color values.
 * Extracted directly from https://luma.com/barcelona's default (real) rendering.
 * @type {ThemeValues}
 */
const lightValues = {
  backgroundLogoTile: lumaGreyScale.grey1000,
  backgroundPrimary: '#FFFFFF',
  backgroundSecondary: lumaGreyScale.grey100,
  backgroundTertiary: lumaGreyScale.grey300,
  backgroundPill: lumaGreyScale.grey200,
  backgroundPillHover: lumaGreyScale.grey400,
  borderStrong: 'rgb(21 21 21 / 36%)',
  borderSubtle: 'rgb(21 21 21 / 4%)',
  textAccent: lumaGreyScale.grey1000,
  textPrimary: 'rgb(21 21 21 / 64%)',
  textSecondary: lumaGreyScale.grey700,
  textProse: lumaGreyScale.grey800,
  textTertiary: lumaGreyScale.grey500,
};

/**
 * Dark theme specific color values.
 * The extraction tool was also run with its `--dark-mode` flag (emulating
 * `prefers-color-scheme: dark`), but the page does not implement a reactive dark theme: almost
 * every scraped color was identical between the two runs. The one exception is the page's root
 * background/foreground pair, which did flip (`rgb(255, 255, 255)` foreground over
 * `rgba(255, 255, 255, 0.08)`, the inverse of the light run's
 * `rgb(21, 21, 21)` / `rgba(21, 21, 21, 0.04)` pair) — that inverted pair is used below for
 * backgroundPrimary/borderSubtle/textAccent. Every other key here is a best-effort mapping,
 * reusing the same extracted lumaGreyScale values rather than the (unextracted) real Luma
 * dark palette.
 * @type {ThemeValues}
 */
const darkValues = {
  backgroundLogoTile: 'transparent',
  backgroundPrimary: lumaGreyScale.grey1000,
  backgroundSecondary: lumaGreyScale.grey900,
  backgroundTertiary: lumaGreyScale.grey800,
  backgroundPill: lumaGreyScale.grey900,
  backgroundPillHover: lumaGreyScale.grey800,
  borderStrong: lumaGreyScale.grey600,
  borderSubtle: 'rgb(255 255 255 / 8%)',
  textAccent: '#FFFFFF',
  textPrimary: 'rgb(255 255 255 / 50%)',
  textSecondary: lumaGreyScale.grey600,
  textProse: lumaGreyScale.grey400,
  textTertiary: lumaGreyScale.grey700,
};

/** @type {CommonValues & ThemeValues} */
const lightTheme = Object.assign({}, lightValues, commonValues);

/** @type {CommonValues & ThemeValues} */
const darkTheme = Object.assign({}, darkValues, commonValues);

/**
 * Creates a CSS variable declaration
 * @param {string} theme - Theme name ('light' or 'dark')
 * @param {string} key - Color key
 * @param {string} value - Color value
 * @returns {string} CSS variable declaration
 */
const declaration = (theme, key, value) => `--c-${theme}-${key}: ${value};`;

/**
 * Creates a CSS variable reference
 * @param {string} str - CSS variable name
 * @returns {string} CSS variable reference
 */
const variable = (str) => `var(${str})`;

/**
 * Creates a CSS variable name
 * @param {string} key - Color key
 * @returns {string} CSS variable name
 */
const variableName = (key) => `--c-${key}`;

/**
 * Converts a theme object to CSS variables
 * @param {string} prefix - Theme prefix ('light' or 'dark')
 * @param {Record<string, string>} obj - Theme object
 * @returns {string} CSS variable declarations
 */
const objectToCSSVariable = (prefix, obj) => {
  return Object.entries(obj)
    .map(([key, value]) => declaration(prefix, key, value))
    .join(' ');
};

/** @type {string} */
export const lightCSSVariables = objectToCSSVariable('light', lightTheme);
/** @type {string} */
export const darkCSSVariables = objectToCSSVariable('dark', darkTheme);

/**
 * Creates a CSS root rule
 * @param {string} str - CSS variable declarations
 * @returns {string} CSS root rule
 */
const makeRoot = (str) => `:root { ${str} }`;

/**
 * Creates theme variable declarations without wrapping them in :root.
 * This is useful for CSS-in-JS systems that already scope the selector.
 * @param {'light' | 'dark'} theme - Theme name
 * @returns {string} CSS variable declarations
 */
export const assignThemeVariables = (theme) => {
  return Object.keys(lightTheme)
    .map((key) => [`--c-${key}`, `var(--c-${theme}-${key})`])
    .map(([colorName, themeName]) => `${colorName}: ${themeName};`)
    .join(' ');
};

/**
 * Creates a complete theme CSS root rule
 * @param {'light' | 'dark'} theme - Theme name
 * @returns {string} CSS root rule with theme variables
 */
export const make = (theme) => {
  return makeRoot(assignThemeVariables(theme));
};

/**
 * Object containing CSS variable references for all theme colors
 * @type {Record<keyof (CommonValues & ThemeValues), string>}
 */
export const colors = Object.fromEntries(
  Object.entries(lightTheme).map(([key, _value]) => [key, variable(variableName(key))]),
);
