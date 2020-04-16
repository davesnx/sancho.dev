import fonts from "./fonts";
import styled, { css } from "styled-components";

const reset = css`
  margin: 0;
  padding: 0;
`;

export const H1 = styled.h1`
  ${reset};
  font-family: '${fonts.title}';
  font-size: ${fonts.fontSize5};
`;

export const H2 = styled.h2`
  ${reset};
  font-family: '${fonts.title}';
  font-size: ${fonts.fontSize4};
`;

export const H3 = styled.h3`
  ${reset};
  font-family: '${fonts.title}';
  font-size: ${fonts.fontSize3};
`;

export const H4 = styled.h4`
  ${reset};
  font-family: '${fonts.title}';
  font-size: ${fonts.fontSize2};
`;

export const H5 = styled.h5`
  ${reset};
  font-family: '${fonts.title}';
  font-size: ${fonts.fontSize1};
`;

export const H6 = styled.h6`
  ${reset};
  font-family: '${fonts.title}';
  font-size: ${fonts.fontSize0};
`;
