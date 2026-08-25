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
 * @property {string} backgroundGrey900 - Fixed dark surface background
 * @property {string} textAccent - Strongest foreground: hover states, emphasis, bold text
 * @property {string} textProse - Long-form content text (paragraphs, nav items, code)
 * @property {string} textPrimary - Default/fallback text color across components
 * @property {string} textSecondary - Secondary info: dates, metadata, descriptions
 * @property {string} textTertiary - Tertiary text: footer, separators, decorations
 * @property {string} borderSubtle - Borders, rules, dividers, subtle backgrounds
 * @property {string} borderStrong - Card borders, interactive element outlines
 * @property {string} backgroundTertiary - Hover state backgrounds for cards and buttons
 */

const uchu = {
  yang: 'oklch(0.994 0 0)',
  gray1: 'oklch(0.9557 0.003 286.35)',
  gray2: 'oklch(0.9204 0.002 197.12)',
  gray3: 'oklch(0.8828 0.003 286.34)',
  gray4: 'oklch(0.8468 0.002 197.12)',
  gray5: 'oklch(0.8073 0.002 247.84)',
  yin2: 'oklch(0.8461 0.004 286.31)',
  yin5: 'oklch(0.6101 0.005 271.34)',
  yin6: 'oklch(0.5279 0.005 271.32)',
  yin7: 'oklch(0.4387 0.005 271.3)',
  yin8: 'oklch(0.3502 0.005 236.66)',
  yin9: 'oklch(0.2511 0.006 258.36)',
  yin: 'oklch(0.1438 0.007 256.88)',
};

/**
 * Light theme specific color values
 * @type {ThemeValues}
 */
const lightValues = {
  backgroundGrey900: uchu.yin,
  backgroundPrimary: uchu.yang,
  backgroundSecondary: uchu.gray1,
  backgroundTertiary: uchu.gray2,
  borderStrong: uchu.gray4,
  borderSubtle: uchu.gray3,
  textAccent: uchu.yin8,
  textPrimary: uchu.yin9,
  textSecondary: uchu.yin6,
  textProse: uchu.yin7,
  textTertiary: uchu.gray5,
};

/**
 * Dark theme specific color values
 * @type {ThemeValues}
 */
const darkValues = {
  backgroundGrey900: uchu.yin,
  backgroundPrimary: uchu.yin,
  backgroundSecondary: uchu.yin9,
  backgroundTertiary: uchu.yin8,
  borderStrong: uchu.yin8,
  borderSubtle: uchu.yin7,
  textAccent: uchu.gray3,
  textPrimary: uchu.yin2,
  textSecondary: uchu.yin5,
  textProse: uchu.gray4,
  textTertiary: uchu.yin7,
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
