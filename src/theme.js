import React from "react";
import styled, { css } from "styled-components";

const UnThemed = styled.span`
  @media (prefers-color-scheme: dark) {
    filter: invert(111%) hue-rotate(180deg);
  }
`

export const Emoji = ({ children, name }) => {
  return <UnThemed role="img" aria-label={name || ""}>{children}</UnThemed>
};

const darkTheme = css`
  html {
    filter: hue-rotate(180deg) invert(90%);

    img {
      filter: invert(111%) hue-rotate(180deg);
    }
  }
`;

export const theme = css`
  @media (prefers-color-scheme: dark) {
    ${darkTheme}
  }
`
