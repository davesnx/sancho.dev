const increment = "1.45";
const lineHeightFixed = "0.5rem";
const lineHeightRelative = "1.5rem";

const fontSizeXS = "0.8rem + 0.15vw";
const fontSizeS = `(${fontSizeXS}) * ${increment}`;
const fontSizeM = `(${fontSizeS}) * ${increment}`;
const fontSizeL = `(${fontSizeM}) * ${increment}`;

const calc = str => `calc(${str})`;
const globalFontSize = calc(fontSizeXS);
const globalLineHeight = `calc(${lineHeightFixed} + ${lineHeightRelative})`;

export default {
  fontSize0: calc(fontSizeXS),
  fontSize1: calc(fontSizeS),
  fontSize2: calc(fontSizeM),
  fontSize3: calc(fontSizeL),
  globalFontSize,
  globalLineHeight
};
