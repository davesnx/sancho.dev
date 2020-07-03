import React from "react";
import styled, { css } from "styled-components";
import font from "./fonts";
import colors from "./colors";

export const styles = css`
  font-weight: 200;
  font-size: ${font.fontSize1};
  font-family: ${font.sans};
  line-height: 1.7;
  color: ${props => props.color};
  margin: 0;
`;

const Text = styled.p`
  ${styles};

  text-align: ${props => props.align}};
  margin-bottom: ${props => (!props.raw ? "24px" : "")};
`;

export default ({ children, ...rest }) => {
  const color = rest.color || colors.black;
  return (
    <Text {...rest} color={color}>
      {children}
    </Text>
  );
};
