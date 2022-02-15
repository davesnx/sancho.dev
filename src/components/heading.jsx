import styled, { css } from "styled-components";

import fonts from "../fonts";
import colors from "../colors";

const Heading = css`
  margin: 0;
  padding: 0;

  display: ${props => (props.inline ? "inline-block" : "block")};
  font-family: '${fonts.sans}';
`;

export const H1 = styled.h1`
  ${Heading};

  font-size: ${fonts.fontSize5};
  letter-spacing: 0.8px;
  color: ${colors.black};
`;

export const H2 = styled.h2`
  ${Heading};

  font-size: ${fonts.fontSize4};
  letter-spacing: 0.7px;
  color: ${colors.black};
`;

export const H3 = styled.h3`
  ${Heading};

  font-size: ${fonts.fontSize3};
  letter-spacing: 0.6px;
  color: ${colors.black};
`;

export const H4 = styled.h4`
  ${Heading};

  font-size: ${fonts.fontSize2};
  letter-spacing: 0.5px;
  color: ${colors.black};
`;

export const H5 = styled.h5`
  ${Heading};

  font-size: ${fonts.fontSize1};
  letter-spacing: 0.5px;
  color: ${colors.black};
`;

export const H6 = styled.h6`
  ${Heading};

  font-size: ${fonts.fontSize0};
  letter-spacing: 0.4px;
  color: ${colors.black};
`;
