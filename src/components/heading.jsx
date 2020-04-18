import fonts from "./fonts";
import styled, { css } from "styled-components";

const reset = css`
  margin: 0;
  padding: 0;
`;

const padded = `margin-top: 2rem; margin-bottom: 1.5rem`;

export const H1 = styled.h1`
  ${reset};
  ${props => (!props.raw ? padded : ``)};

  font-family: '${fonts.sans}';
  font-size: ${fonts.fontSize5};
  letter-spacing: 0.8px;
`;

export const H2 = styled.h2`
  ${reset};
  ${props => (!props.raw ? padded : ``)};

  font-family: '${fonts.sans}';
  font-size: ${fonts.fontSize4};
  letter-spacing: 0.7px;
  margin-top: 16px;
  margin-bottom: 8px;
`;

export const H3 = styled.h3`
  ${reset};
  ${props => (!props.raw ? padded : ``)};

  font-family: '${fonts.sans}';
  font-size: ${fonts.fontSize3};
  letter-spacing: 0.6px;
  margin-top: 16px;
  margin-bottom: 8px;
`;

export const H4 = styled.h4`
  ${reset};
  ${props => (!props.raw ? padded : ``)};

  font-family: '${fonts.sans}';
  font-size: ${fonts.fontSize2};
  letter-spacing: 0.5px;
  margin-bottom: 16px;
  margin-top: 8px;
`;

export const H5 = styled.h5`
  ${reset};
  ${props => (!props.raw ? padded : ``)};

  font-family: '${fonts.sans}';
  font-size: ${fonts.fontSize1};
  letter-spacing: 0.5px;
  margin-bottom: 16px;
  margin-top: 8px;
`;

export const H6 = styled.h6`
  ${reset};
  ${props => (!props.raw ? padded : ``)};

  font-family: '${fonts.sans}';
  font-size: ${fonts.fontSize0};
  letter-spacing: 0.4px;
  margin-bottom: 16px;
  margin-top: 8px;
`;
