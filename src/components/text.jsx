import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React from "react";

import { rgb } from "../theme/color";
import font from "../theme/fonts";
import { colors } from "../theme/theme";

export const styles = (props) => css`
  font-weight: ${props.weight ? props.weight : 200};
  font-size: ${props.size ? props.size : font.fontSize1};
  font-family: ${font.sans};
  line-height: 1.85rem;
  color: ${rgb(props.color || colors.body)};
  display: inline-block;
  letter-spacing: 0.3px;
`;

const P = styled.p`
  ${(props) => styles(props)};
  text-align: ${(props) => props.align}};
`;

let Text = ({ children, ...rest }) => {
  const color = rest.color || colors.body;
  return (
    <P {...rest} color={color}>
      {children}
    </P>
  );
};

export default Text;
