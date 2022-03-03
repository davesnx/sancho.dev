import React from "react";
import styled, { css } from "styled-components";

import font from "../fonts";
import colors from "../colors";

export const styles = css`
  font-weight: ${props => (props.weight ? props.weight : 200)};
  font-size: ${props => (props.size ? props.size : font.fontSize1)};
  font-family: ${font.sans};
  line-height: 1.7;
  color: ${props => props.color};
  margin: 0;
  display: inline-block;
`;

const Text = styled.p`
  ${styles};
  text-align: ${props => props.align}};
`;

export default ({ children, ...rest }) => {
  const color = rest.color || colors.base;
  return (
    <Text {...rest} color={color}>
      {children}
    </Text>
  );
};
