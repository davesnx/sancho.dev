import styled from "@emotion/styled";
import type React from "react";

import { colors } from "../theme/theme";

type LogoProps = {
  padded: boolean;
  color: string;
};

const Logo = styled.div`
  display: flex;
  padding-left: ${(props: LogoProps) => (props.padded ? "8px" : "0px")};
  border-radius: 6px;
  cursor: pointer;
  transition: all 100ms ease-in;
`;

type SvgIconProps = {
  fill?: string;
  size?: number;
  color?: string;
};

const Icon = ({
  svg: Svg,
  size,
  color,
  bg,
  padded,
}: {
  svg: React.FC<SvgIconProps>;
  size: number;
  color: string;
  bg: string;
  padded: boolean;
}) => {
  const fill = color || colors.body;
  return (
    <Logo padded={padded} color={bg}>
      <Svg size={size} fill={fill} color={fill} />
    </Logo>
  );
};

export default Icon;
