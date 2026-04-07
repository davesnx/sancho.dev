import { css } from "@linaria/core";

import { H1, Page } from "@/components/ui";
import { buildMetadata } from "@/site";
import fonts from "@/theme/fonts";
import { colors, darkCSSVariables, lightCSSVariables } from "@/theme/theme";

const wrapperClass = css`
  display: grid;
  gap: 1rem;
`;

const introClass = css`
  margin: 0;
  color: ${colors.textProse};
  font-size: ${fonts.fontSizeN1};
  font-family: ${fonts.sans};
  line-height: 1.6;
`;

const tableWrapClass = css`
  border: 1px solid ${colors.borderSubtle};
  border-radius: 12px;
  overflow: auto;
  background: ${colors.backgroundSecondary};
`;

const tableClass = css`
  width: 100%;
  min-width: 720px;
  border-collapse: collapse;
  font-family: ${fonts.mono};
`;

const headerCellClass = css`
  text-align: left;
  font-size: ${fonts.fontSizeN2};
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: ${colors.textProse};
  background: ${colors.backgroundSecondary};
  padding: 12px 14px;
  border-bottom: 1px solid ${colors.borderSubtle};
`;

const bodyCellClass = css`
  padding: 10px 14px;
  border-bottom: 1px solid ${colors.borderSubtle};
  vertical-align: middle;
`;

const tokenNameClass = css`
  color: ${colors.textPrimary};
  font-size: ${fonts.fontSizeN2};
`;

const valueClass = css`
  color: ${colors.textProse};
  font-size: ${fonts.fontSizeN2};
`;

const swatchClass = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 116px;
  padding: 4px 10px;
  border-radius: 999px;
  border: 1px solid ${colors.borderSubtle};
  font-size: ${fonts.fontSizeN2};
`;

const parseThemeVariables = (cssVars: string, prefix: "light" | "dark") => {
  const map = new Map<string, string>();
  const regex = new RegExp(`--c-${prefix}-([a-zA-Z0-9]+):\\s*([^;]+);`, "g");
  let match = regex.exec(cssVars);

  while (match) {
    const token = match[1];
    const rawValue = match[2];

    if (token && rawValue) {
      map.set(token, rawValue.trim());
    }

    match = regex.exec(cssVars);
  }

  return map;
};

const toContrastColor = (value: string) => {
  const hex = value.replace("#", "");

  if (!/^[0-9a-fA-F]{6}$/.test(hex)) {
    return "#111111";
  }

  const r = Number.parseInt(hex.slice(0, 2), 16);
  const g = Number.parseInt(hex.slice(2, 4), 16);
  const b = Number.parseInt(hex.slice(4, 6), 16);
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

  return luminance > 145 ? "#111111" : "#FAFAFA";
};

const renderValue = (value: string) => {
  const isHex = /^#[0-9a-fA-F]{6}$/.test(value);

  if (!isHex) {
    return <code className={valueClass}>{value}</code>;
  }

  return (
    <span className={swatchClass} style={{ background: value, color: toContrastColor(value) }}>
      {value}
    </span>
  );
};

const lightTokens = parseThemeVariables(lightCSSVariables, "light");
const darkTokens = parseThemeVariables(darkCSSVariables, "dark");
const lightKeys = Array.from(lightTokens.keys());
const darkKeys = Array.from(darkTokens.keys());
const tokens = Array.from(new Set(lightKeys.concat(darkKeys))).sort();

export const metadata = buildMetadata({
  title: "UI Color Tokens",
  description: "A reference table of the light and dark theme color tokens used on sancho.dev.",
  path: "/ui",
});

export default function UIColorsPage() {
  return (
    <Page title={<H1>UI Color Tokens</H1>}>
      <div className={wrapperClass}>
        <p className={introClass}>
          Theme tokens sourced from <code>src/lib/theme/theme.js</code>, rendered side-by-side for light and dark modes.
        </p>
        <div className={tableWrapClass}>
          <table className={tableClass}>
            <thead>
              <tr>
                <th className={headerCellClass}>Token</th>
                <th className={headerCellClass}>Light</th>
                <th className={headerCellClass}>Dark</th>
              </tr>
            </thead>
            <tbody>
              {tokens.map((token) => {
                const lightValue = lightTokens.get(token) || "-";
                const darkValue = darkTokens.get(token) || "-";

                return (
                  <tr key={token}>
                    <td className={bodyCellClass}>
                      <code className={tokenNameClass}>{token}</code>
                    </td>
                    <td className={bodyCellClass}>{renderValue(lightValue)}</td>
                    <td className={bodyCellClass}>{renderValue(darkValue)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Page>
  );
}
