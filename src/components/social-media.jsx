import React from "react";
import styled from "styled-components";

import { Link } from "gatsby";
import Spacer from "./spacer";
import Twitter from "./../svgs/twitter";
import Github from "./../svgs/github";
import Strava from "./../svgs/strava";
import Discord from "./../svgs/discord";
import colors from "./colors";

const InlineLogoWrapper = styled.span`
  display: flex;
  justify-content: start;
  align-items: center;
`;

const Icon = ({ svg: Svg, color, bg, href }) => (
  <Link target="_blank" rel="noreferrer noopener" href={href}>
    <Logo color={bg}>
      <Svg fill={colors.black}></Svg>
    </Logo>
  </Link>
);

const Logo = styled.div`
  width: 40px;
  height: 40px;
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 100ms ease-in;

  &:hover {
    background: ${props => props.color};
  }
`;

export default () => (
  <InlineLogoWrapper>
    <Icon
      svg={Twitter}
      href="https://github.com/davesnx"
      color="rgb(29, 161, 242)"
      bg="rgba(29, 161, 242, 0.2)"
    />
    <Spacer left={2} />
    <Icon
      svg={Github}
      href="https://github.com/davesnx"
      color="rgb(24, 23, 23)"
      bg="rgba(24, 23, 23, 0.2)"
    />
    <Spacer left={2} />
    <Icon
      svg={Strava}
      href="https://www.strava.com/athletes/davesnx"
      color="rgb(252, 76, 2)"
      bg="rgba(252, 76, 2, 0.2)"
    />
    <Spacer left={2} />
    <Icon
      svg={Discord}
      href="https://discord.gg/xFHUBgx"
      color="rgb(114, 137, 218)"
      bg="rgba(114, 137, 218, 0.2)"
    />
  </InlineLogoWrapper>
);
