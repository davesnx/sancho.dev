import React from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

import font from "../theme/fonts";
import { colors } from "../theme/theme";
import { rgb } from "../theme/color";

export const styles = (props) => css`
  font-weight: ${props.weight ? props.weight : 200};
  font-size: ${props.size ? props.size : font.fontSize1};
  font-family: ${font.sans};
  line-height: 1.7;
  color: ${rgb(props.color)};
  display: inline-block;
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
