const calc = str => `calc(${str})`;

const increment = "1.3";
const lineHeightFixed = "0.45rem";
const lineHeightRelative = "1rem";

const fontSize_0 = `0.8rem + 0.15vw`;
const fontSize_1 = `(${fontSize_0}) * ${increment}`;
const fontSize_2 = `(${fontSize_1}) * ${increment}`;
const fontSize_3 = `(${fontSize_2}) * ${increment}`;
const fontSize_4 = `(${fontSize_3}) * ${increment}`;
const fontSize_5 = `(${fontSize_4}) * ${increment}`;

const globalFontSize = calc(fontSize_0);
const globalLineHeight = `calc(${lineHeightFixed} + ${lineHeightRelative})`;

export default {
  fontSize0: calc(fontSize_0),
  fontSize1: calc(fontSize_1),
  fontSize2: calc(fontSize_2),
  fontSize3: calc(fontSize_3),
  fontSize4: calc(fontSize_4),
  fontSize5: calc(fontSize_5),
  globalFontSize,
  globalLineHeight
};
