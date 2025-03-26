const calc = (str) => `calc(${str})`;

const increment = "1.25";
const lineHeightFixed = "0.85rem";
const lineHeightRelative = "1rem";

const fontSize_N1 = `0.8rem`;
const fontSize_0 = `0.7rem + 0.13vw`;
const fontSize_1 = `(${fontSize_0}) * ${increment}`;
const fontSize_2 = `(${fontSize_1}) * ${increment}`;
const fontSize_3 = `(${fontSize_2}) * ${increment}`;
const fontSize_4 = `(${fontSize_3}) * ${increment}`;
const fontSize_5 = `(${fontSize_4}) * ${increment}`;
const fontSize_6 = `(${fontSize_5}) * ${increment}`;

const globalFontSize = calc(fontSize_1);
const globalLineHeight = `calc(${lineHeightFixed} + ${lineHeightRelative})`;

const fonts = {
  fontSizeN1: fontSize_N1,
  fontSize0: calc(fontSize_0),
  fontSize1: calc(fontSize_1),
  fontSize2: calc(fontSize_2),
  fontSize3: calc(fontSize_3),
  fontSize4: calc(fontSize_4),
  fontSize5: calc(fontSize_5),
  fontSize6: calc(fontSize_6),
  globalFontSize,
  globalLineHeight,
  mono: `SF Mono, Fira Code, monospace`,
  sans: "Silka",
};

export default fonts;
