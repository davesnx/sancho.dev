/* This file can't have any dependency, we inject it outside of the app and react. During SSR. */

const commonValues = {
  r: "#FF211B",
  g: "#17E620",
  b: "#003AEC",
  twitter: "29,161,242", // #1DA1F2
  github: "164,173,187", // #181717
  discord: "114,137,218", // #7289DA
  strava: "252,76,2", // #FC4C02
};

const lightValues = {
  body: "35,48,68", // #233044
  contrast: "250,250,250", // #FAFAFA
  overlay: "255,255,255", // #FFFFFF
  codeBackground: "38,38,41", // #262629
  contrastCodeBackground: "238,238,238", // #EEEEEE
  subtle: "174,178,185", // #AEB2B9
  primary: "66,153,232", // #4299E8
};

const darkValues = {
  body: "206,208,210", // #CED0D2
  contrast: "29,29,29", // #1D1D1D
  overlay: "17,17,17", // #111111
  codeBackground: "38,38,41", // #262629
  contrastCodeBackground: "38,38,41", // #262629
  subtle: "84,88,93", // #54585D
  primary: "58,128,191", // #3A80BF
};

const lightTheme = Object.assign({}, lightValues, commonValues);
const darkTheme = Object.assign({}, darkValues, commonValues);

let declaration = (theme, key, value) => `--c-${theme}-${key}: ${value};`;
let variable = (str) => `var(${str})`;
let variableName = (key) => `--c-${key}`;

let objectToCSSVariable = (prefix, obj) => {
  return Object.entries(obj)
    .map(([key, value]) => declaration(prefix, key, value))
    .join(" ");
};

export let lightRoot = objectToCSSVariable("light", lightTheme);
export let darkRoot = objectToCSSVariable("dark", darkTheme);

export let make = (theme) => {
  let makeRoot = (str) => `:root { ${str} }`;
  const mappings = Object.keys(lightTheme).map((key) => [
    `--c-${key}`,
    `var(--c-${theme}-${key})`,
  ]);

  return makeRoot(
    mappings
      .map(([colorName, themeName]) => `${colorName}: ${themeName};`)
      .join(" ")
  );
};

export let colors = Object.fromEntries(
  Object.entries(lightTheme).map(([key, _value]) => [
    key,
    variable(variableName(key)),
  ])
);
