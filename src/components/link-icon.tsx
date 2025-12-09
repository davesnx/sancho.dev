import styled from "@emotion/styled";
import type React from "react";

import Icon from "./icon";

type SvgIconProps = {
  fill?: string;
  size?: number;
  color?: string;
};

const A = styled.a`
  display: inline-block;
`;

type LinkIconProps = {
  href: string;
  svg: React.FC<SvgIconProps>;
  size: number;
  color: string;
  bg: string;
  padded?: boolean;
};

const LinkIcon = ({ href, svg, size, color, bg, padded = false }: LinkIconProps) => (
  <A target="_blank" rel="noreferrer noopener" href={href}>
    <Icon svg={svg} size={size} color={color} bg={bg} padded={padded} />
  </A>
);

export default LinkIcon;
