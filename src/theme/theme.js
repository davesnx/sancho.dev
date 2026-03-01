/* This file can't have any dependency, we inject it outside of the app during SSR */

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
 * @property {string} backgroundSecondary - Code block background color
 * @property {string} contrastCodeBackground - Contrasting code background color
 * @property {string} contrastCodeBackground80 - Contrasting code background color
 * @property {string} primary - Primary accent color
 * @property {string} inverted - Inverted text color
 * @property {string} primary90 - Primary accent color
 * @property {string} primary80 - Primary accent color
 * @property {string} body - Body text color
 * @property {string} body90 - Body text color
 * @property {string} body50 - Body text color
 * @property {string} body30 - Body text color
 * @property {string} body10 - Body text color
 */

const navyScale = {
  navy100: "#CFD2D6",
  navy200: "#B9BDC3",
  navy300: "#999FA8",
  navy400: "#78818C",
  navy500: "#4C586A",
  navy600: "#384456",
  navy700: "#233044",
  navy800: "#293039",
  navy900: "#121A24"
};

const greyScale = {
  grey100: "#FAFAFA",
  grey200: "#F5F5F5",
  grey300: "#F0F0F0",
  grey400: "#E3E3E3",
  grey500: "#CCCCCC",
  grey600: "#848686",
  grey700: "#4C4D4D",
  grey800: "#272727",
  grey900: "#171717",
  grey1000: "#141414"
};

/**
 * Light theme specific color values
 * @type {ThemeValues}
 */
const lightValues = {
  inverted: greyScale.grey900,
  primary: navyScale.navy900,
  primary90: navyScale.navy800,
  primary80: navyScale.navy500,
  body: navyScale.navy700,
  body90: navyScale.navy600,
  body50: navyScale.navy400,
  body30: navyScale.navy200,
  body10: navyScale.navy100,
  backgroundPrimary: greyScale.grey100,
  backgroundSecondary: greyScale.grey200,
  contrastCodeBackground: greyScale.grey400,
  contrastCodeBackground80: greyScale.grey300,
};

/**
 * Dark theme specific color values
 * @type {ThemeValues}
 */
const darkValues = {
  backgroundPrimary: greyScale.grey1000,
  backgroundSecondary: greyScale.grey900,
  inverted: greyScale.grey900,
  primary: greyScale.grey100,
  primary90: greyScale.grey300,
  primary80: greyScale.grey500,
  body: navyScale.navy100,
  body90: navyScale.navy300,
  body50: greyScale.grey600,
  body30: greyScale.grey700,
  body10: greyScale.grey800,
  contrastCodeBackground: greyScale.grey800,
  contrastCodeBackground80: greyScale.grey800,
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
    .join(" ");
};

/** @type {string} */
export const lightCSSVariables = objectToCSSVariable("light", lightTheme);
/** @type {string} */
export const darkCSSVariables = objectToCSSVariable("dark", darkTheme);

/**
 * Creates a CSS root rule
 * @param {string} str - CSS variable declarations
 * @returns {string} CSS root rule
 */
const makeRoot = (str) => `:root { ${str} }`;

/**
 * Creates a complete theme CSS root rule
 * @param {'light' | 'dark'} theme - Theme name
 * @returns {string} CSS root rule with theme variables
 */
export const make = (theme) => {
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
export const colors = Object.fromEntries(
  Object.entries(lightTheme).map(([key, _value]) => [
    key,
    variable(variableName(key)),
  ]),
);
