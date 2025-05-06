/* This file can't have any dependency, we inject it outside of the app and react. During SSR. */

/**
 * @typedef {Object} CommonValues
 * @property {string} r - Red color value
 * @property {string} g - Green color value
 * @property {string} b - Blue color value
 * @property {string} bluesky - Bluesky brand color
 * @property {string} bluesky50 - Bluesky brand color
 * @property {string} bluesky30 - Bluesky brand color
 * @property {string} discord - Discord brand color
 * @property {string} discord50 - Discord brand color
 * @property {string} discord30 - Discord brand color
 * @property {string} strava - Strava brand color
 * @property {string} strava50 - Strava brand color
 * @property {string} strava30 - Strava brand color
 */

/**
 * Common color values shared between themes
 * @type {CommonValues}
 */
const commonValues = {
  r: "#FF211B",
  g: "#17E620",
  b: "#003AEC",
  bluesky: "#1085FD",
  bluesky50: "#124D88",
  bluesky30: "#132537",
  discord: "#7289DA",
  discord50: "#434F77",
  discord30: "#222632",
  strava: "#FC4C02",
  strava50: "#88300B",
  strava30: "#411b0b",
};

/**
 * @typedef {Object} ThemeValues
 * @property {string} body - Body text color
 * @property {string} contrast - Contrast background color
 * @property {string} overlay - Overlay background color
 * @property {string} codeBackground - Code block background color
 * @property {string} contrastCodeBackground - Contrasting code background color
 * @property {string} contrastCodeBackground30 - Contrasting code background color
 * @property {string} contrastCodeBackground80 - Contrasting code background color
 * @property {string} primary - Primary accent color
 * @property {string} inverted - Inverted text color
 * @property {string} primary90 - Primary accent color
 * @property {string} primary80 - Primary accent color
 * @property {string} body - Body text color
 * @property {string} body90 - Body text color
 * @property {string} body80 - Body text color
 * @property {string} body50 - Body text color
 * @property {string} body30 - Body text color
 * @property {string} body10 - Body text color
 * @property {string} grey - Grey color
 */

/**
 * Light theme specific color values
 * @type {ThemeValues}
 */
const lightValues = {
  grey: "#E5E5E5",
  primary: "#121A24",
  inverted: "#1A1A1A",
  primary90: "#293039",
  primary80: "#40474F",
  body: "#233044",
  body90: "#384456",
  body80: "#4C586A",
  body50: "#78818C",
  body30: "#B9BDC3",
  body10: "#CFD2D6",
  contrast: "#FAFAFA",
  overlay: "#FFFFFF",
  codeBackground: "#F5F5F5",
  contrastCodeBackground: "#EEEEEE",
  contrastCodeBackground30: "#F6F6F6",
  contrastCodeBackground80: "#F0F0F0",
};

/**
 * Dark theme specific color values
 * @type {ThemeValues}
 */
const darkValues = {
  grey: "#E5E5E5",
  primary: "#FAFAFA",
  primary90: "#E3E3E3",
  primary80: "#CCCCCC",
  body: "#CED0D2",
  body90: "#BCBEBF",
  body80: "#A9ABAD",
  body50: "#848686",
  body30: "#4C4D4D",
  body10: "#272727",
  contrast: "#141414",
  overlay: "#111111",
  codeBackground: "#171717",
  contrastCodeBackground: "#262626",
  contrastCodeBackground80: "#222222",
  contrastCodeBackground30: "#191919",
  inverted: "#1A1A1A",
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
let declaration = (theme, key, value) => `--c-${theme}-${key}: ${value};`;

/**
 * Creates a CSS variable reference
 * @param {string} str - CSS variable name
 * @returns {string} CSS variable reference
 */
let variable = (str) => `var(${str})`;

/**
 * Creates a CSS variable name
 * @param {string} key - Color key
 * @returns {string} CSS variable name
 */
let variableName = (key) => `--c-${key}`;

/**
 * Converts a theme object to CSS variables
 * @param {string} prefix - Theme prefix ('light' or 'dark')
 * @param {Record<string, string>} obj - Theme object
 * @returns {string} CSS variable declarations
 */
let objectToCSSVariable = (prefix, obj) => {
  return Object.entries(obj)
    .map(([key, value]) => declaration(prefix, key, value))
    .join(" ");
};

/** @type {string} */
export let lightCSSVariables = objectToCSSVariable("light", lightTheme);
/** @type {string} */
export let darkCSSVariables = objectToCSSVariable("dark", darkTheme);

/**
 * Creates a CSS root rule
 * @param {string} str - CSS variable declarations
 * @returns {string} CSS root rule
 */
let makeRoot = (str) => `:root { ${str} }`;

/**
 * Creates a complete theme CSS root rule
 * @param {'light' | 'dark'} theme - Theme name
 * @returns {string} CSS root rule with theme variables
 */
export let make = (theme) => {
  return makeRoot(
    Object.keys(lightTheme)
      .map((key) => [`--c-${key}`, `var(--c-${theme}-${key})`])
      .map(([colorName, themeName]) => `${colorName}: ${themeName};`)
      .join(" "),
  );
};

/**
 * Object containing CSS variable references for all theme colors
 * @type {Record<keyof (CommonValues & ThemeValues), string>}
 */
export let colors = Object.fromEntries(
  Object.entries(lightTheme).map(([key, _value]) => [
    key,
    variable(variableName(key)),
  ]),
);
