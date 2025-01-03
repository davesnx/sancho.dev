import styled from "@emotion/styled";
import React from "react";

import { rgb } from "../theme/color";
import { colors } from "../theme/theme";

type LogoProps = {
  padded: boolean;
  color: string;
};

const Logo = styled.div`
  display: flex;
  padding: ${(props: LogoProps) => (props.padded ? "8px" : "0px")};
  border-radius: 6px;
  cursor: pointer;
  transition: all 100ms ease-in;

  &:hover {
    background: ${(props: LogoProps) => props.padded && rgb(props.color)};
  }
`;

const Icon = ({
  svg: Svg,
  size,
  color,
  bg,
  padded,
}: {
  svg: React.FC;
  size: number;
  color: string;
  bg: string;
  padded: boolean;
}) => {
  let fill = color || colors.body;
  return (
    <Logo padded={padded} color={bg}>
      <Svg size={size} fill={fill} />
    </Logo>
  );
};

export default Icon;
