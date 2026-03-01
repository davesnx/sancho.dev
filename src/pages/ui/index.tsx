import styled from "@emotion/styled";

import Page from "../../components/page";
import MetaData from "../../components/site-metadata";
import fonts from "../../theme/fonts";
import { colors, darkCSSVariables, lightCSSVariables } from "../../theme/theme";

const Wrapper = styled.div`
  display: grid;
  gap: 1rem;
`;

const Intro = styled.p`
  margin: 0;
  color: ${colors.primary80};
  font-size: ${fonts.fontSizeN1};
  font-family: ${fonts.sans};
  line-height: 1.6;
`;

const TableWrap = styled.div`
  border: 1px solid ${colors.body10};
  border-radius: 12px;
  overflow: auto;
  background: ${colors.overlay};
`;

const TokenTable = styled.table`
  width: 100%;
  min-width: 720px;
  border-collapse: collapse;
  font-family: ${fonts.mono};
`;

const HeaderCell = styled.th`
  text-align: left;
  font-size: ${fonts.fontSizeN2};
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: ${colors.primary80};
  background: ${colors.contrastCodeBackground30};
  padding: 12px 14px;
  border-bottom: 1px solid ${colors.body10};
`;

const BodyCell = styled.td`
  padding: 10px 14px;
  border-bottom: 1px solid ${colors.body10};
  vertical-align: middle;
`;

const TokenName = styled.code`
  color: ${colors.body};
  font-size: ${fonts.fontSizeN2};
`;

const Value = styled.code`
  color: ${colors.primary80};
  font-size: ${fonts.fontSizeN2};
`;

const Swatch = styled.span<{ colorValue: string; textColor: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 116px;
  padding: 4px 10px;
  border-radius: 999px;
  border: 1px solid ${colors.body10};
  background: ${(props) => props.colorValue};
  color: ${(props) => props.textColor};
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
    return <Value>{value}</Value>;
  }

  return <Swatch colorValue={value} textColor={toContrastColor(value)}>{value}</Swatch>;
};

const lightTokens = parseThemeVariables(lightCSSVariables, "light");
const darkTokens = parseThemeVariables(darkCSSVariables, "dark");
const lightKeys = Array.from(lightTokens.keys());
const darkKeys = Array.from(darkTokens.keys());
const tokens = Array.from(new Set(lightKeys.concat(darkKeys))).sort();

export default function UIColors() {
  return (
    <>
      <MetaData title="UI Color Tokens" />
      <Page title={<h1 style={{ margin: 0, color: colors.primary }}>UI Color Tokens</h1>}>
        <Wrapper>
          <Intro>
            Theme tokens sourced from <code>src/theme/theme.js</code>, rendered side-by-side for light and dark modes.
          </Intro>
          <TableWrap>
            <TokenTable>
              <thead>
                <tr>
                  <HeaderCell>Token</HeaderCell>
                  <HeaderCell>Light</HeaderCell>
                  <HeaderCell>Dark</HeaderCell>
                </tr>
              </thead>
              <tbody>
                {tokens.map((token) => {
                  const lightValue = lightTokens.get(token) || "-";
                  const darkValue = darkTokens.get(token) || "-";

                  return (
                    <tr key={token}>
                      <BodyCell>
                        <TokenName>{token}</TokenName>
                      </BodyCell>
                      <BodyCell>{renderValue(lightValue)}</BodyCell>
                      <BodyCell>{renderValue(darkValue)}</BodyCell>
                    </tr>
                  );
                })}
              </tbody>
            </TokenTable>
          </TableWrap>
        </Wrapper>
      </Page>
    </>
  );
}
