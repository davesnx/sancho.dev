import React from "react";
import styled from "styled-components";

import colors from "../colors";

const Logo = styled.div`
  display: flex;
  padding: ${props => (props.padded ? "8px" : "0px")};
  border-radius: 6px;
  cursor: pointer;
  transition: all 100ms ease-in;

  &:hover {
    background: ${props => props.padded && props.color};
  }
`;

const Icon = ({ svg: Svg, size, color = colors.black, bg, padded }) => (
  <Logo padded={padded} color={bg}>
    <Svg size={size} fill={color}></Svg>
  </Logo>
);

export default Icon;
