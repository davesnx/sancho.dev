import { css } from "@emotion/react";
import styled from "@emotion/styled";

import fonts from "../theme/fonts";
import { colors } from "../theme/theme";

const Heading = css`
  margin: 0;
  padding: 0;
  font-family: ${fonts.sans};
  font-weight: 600;
  line-height: 1.6;
`;

export const H1 = styled.h1`
  ${Heading};

  font-size: ${fonts.fontSize5};
  letter-spacing: 1.6px;
  color: ${colors.primary};
`;

export const H2 = styled.h2`
  ${Heading};

  font-size: ${fonts.fontSize4};
  letter-spacing: 1px;
  color: ${colors.primary90};
`;

export const H3 = styled.h3`
  ${Heading};

  font-size: ${fonts.fontSize3};
  letter-spacing: 0.8px;
  color: ${colors.primary90};
`;

export const H4 = styled.h4`
  ${Heading};

  font-size: ${fonts.fontSize2};
  letter-spacing: 0.6px;
  color: ${colors.primary90};
`;

export const H5 = styled.h5`
  ${Heading};

  font-size: ${fonts.fontSize1};
  letter-spacing: 0.4px;
  color: ${colors.primary90};
`;

export const H6 = styled.h6`
  ${Heading};

  font-size: ${fonts.fontSize0};
  letter-spacing: 0.2px;
  color: ${colors.primary90};
`;
