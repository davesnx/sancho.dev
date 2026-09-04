const calc = (str) => `calc(${str})`;

const increment = '1.2';
const lineHeightFixed = '0.85rem';
const lineHeightRelative = '1rem';

const fontSizeN2 = `0.8rem`;
const fontSizeN1 = `1rem`;
const fontSize0 = `0.8rem + 0.13vw`;
const fontSize1 = `(${fontSize0}) * ${increment}`;
const fontSize2 = `(${fontSize1}) * ${increment}`;
const fontSize3 = `(${fontSize2}) * ${increment}`;
const fontSize4 = `(${fontSize3}) * ${increment}`;
const fontSize5 = `(${fontSize4}) * ${increment}`;
const fontSize6 = `(${fontSize5}) * ${increment}`;

const globalFontSize = calc(fontSize1);
const globalLineHeight = `calc(${lineHeightFixed} + ${lineHeightRelative})`;

const fonts = {
  fontSizeN2: fontSizeN2,
  fontSizeN1: fontSizeN1,
  fontSize0: calc(fontSize0),
  fontSize1: calc(fontSize1),
  fontSize2: calc(fontSize2),
  fontSize3: calc(fontSize3),
  fontSize4: calc(fontSize4),
  fontSize5: calc(fontSize5),
  fontSize6: calc(fontSize6),
  globalFontSize,
  globalLineHeight,
  mono: 'var(--font-mono), "JetBrains Mono", monospace',
  sans: 'var(--font-sans), system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", Oxygen, Cantarell, sans-serif',
  display: 'var(--font-display), "Inter", sans-serif',
};

export default fonts;
