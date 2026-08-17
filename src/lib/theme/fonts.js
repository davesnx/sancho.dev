const calc = (str) => `calc(${str})`;

const increment = '1.25';
const lineHeightFixed = '0.85rem';
const lineHeightRelative = '1rem';

const fontSize_N2 = `0.8rem`;
const fontSize_N1 = `1rem`;
const fontSize_0 = `0.8rem + 0.13vw`;
const fontSize_1 = `(${fontSize_0}) * ${increment}`;
const fontSize_2 = `(${fontSize_1}) * ${increment}`;
const fontSize_3 = `(${fontSize_2}) * ${increment}`;
const fontSize_4 = `(${fontSize_3}) * ${increment}`;
const fontSize_5 = `(${fontSize_4}) * ${increment}`;
const fontSize_6 = `(${fontSize_5}) * ${increment}`;

const globalFontSize = calc(fontSize_1);
const globalLineHeight = `calc(${lineHeightFixed} + ${lineHeightRelative})`;

const fonts = {
  fontSizeN2: fontSize_N2,
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
  mono: 'var(--font-mono), "JetBrains Mono", monospace',
  sans: 'var(--font-sans), system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", Oxygen, Cantarell, sans-serif',
  display: 'var(--font-display), "Inter", sans-serif',
};

export const typography = {
  h1: { fontFamily: fonts.sans, fontSize: fonts.fontSize5, fontWeight: 700, lineHeight: 1.3 },
  h2: { fontFamily: fonts.sans, fontSize: fonts.fontSize4, fontWeight: 700, lineHeight: 1.3 },
  h3: { fontFamily: fonts.sans, fontSize: fonts.fontSize3, fontWeight: 700, lineHeight: 1.3 },
  h4: { fontFamily: fonts.sans, fontSize: fonts.fontSize2, fontWeight: 700, lineHeight: 1.3 },
  h5: { fontFamily: fonts.sans, fontSize: fonts.fontSize1, fontWeight: 700, lineHeight: 1.3 },
  h6: { fontFamily: fonts.sans, fontSize: fonts.fontSize0, fontWeight: 700, lineHeight: 1.3 },
  body: { fontFamily: fonts.sans, fontSize: fonts.fontSize1, fontWeight: 400, lineHeight: 1.7 },
  metadata: { fontFamily: fonts.mono, fontSize: fonts.fontSizeN2, fontWeight: 600, lineHeight: 1.7 },
};

export default fonts;
