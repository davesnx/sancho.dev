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
  r: "#FF211B",
  g: "#17E620",
  b: "#003AEC",
  bluesky: "rgb(18 133 254)",
  bluesky60: "rgb(18 133 254 / 60%)",
  bluesky20: "rgb(18 133 254 / 20%)",
  discord: "rgb(88 101 242)",
  discord60: "rgb(88 101 242 / 60%)",
  discord20: "rgb(88 101 242 / 20%)",
  strava: "rgb(250 89 1)",
  strava60: "rgb(250 89 1 / 60%)",
  strava20: "rgb(250 89 1 / 20%)",
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
  backgroundGrey900: greyScale.grey900,
  backgroundPrimary: greyScale.grey100,
  backgroundSecondary: greyScale.grey200,
  backgroundTertiary: greyScale.grey300,
  borderStrong: navyScale.navy100,
  borderSubtle: greyScale.grey400,
  textAccent: navyScale.navy900,
  textPrimary: navyScale.navy700,
  textSecondary: navyScale.navy400,
  textProse: navyScale.navy500,
  textTertiary: navyScale.navy200,
};

/**
 * Dark theme specific color values
 * @type {ThemeValues}
 */
const darkValues = {
  backgroundGrey900: greyScale.grey900,
  backgroundPrimary: greyScale.grey1000,
  backgroundSecondary: greyScale.grey900,
  backgroundTertiary: greyScale.grey800,
  borderStrong: greyScale.grey800,
  borderSubtle: greyScale.grey700,
  /* borderSubtle: greyScale.grey800, */
  textAccent: greyScale.grey100,
  textPrimary: navyScale.navy100,
  textSecondary: greyScale.grey600,
  textProse: greyScale.grey500,
  textTertiary: greyScale.grey700,
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
