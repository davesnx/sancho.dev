import React from "react";
import styled from "styled-components";

import Spacer from "./spacer";
import Twitter from "./../svgs/twitter";
import Github from "./../svgs/github";
import Strava from "./../svgs/strava";
import Discord from "./../svgs/discord";

const InlineLogoWrapper = styled.span`
  display: flex;
  align-items: center;
`;

const Icon = ({ svg: Svg, color, bg, href }) => (
  <a target="_blank" rel="noreferrer noopener" href={href}>
    <Logo color="rgba(51, 51, 62, 0.5)">
      <Svg fill="#000"></Svg>
    </Logo>
  </a>
);

const Logo = styled.div`
  width: 40px;
  height: 40px;
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;

  &:hover > svg {
    transition: all 100ms ease-in;
    fill: ${props => props.color};
  }
`;

export default () => (
  <InlineLogoWrapper>
    <Icon
      svg={Twitter}
      href="https://github.com/davesnx"
      color="rgb(29, 161, 242)"
      bg="rgba(29, 161, 242, 0.15)"
    />
    <Spacer left={2} />
    <Icon
      href="https://twitter.com/davesnx"
      svg={Github}
      color="rgb(24, 23, 23)"
      bg="rgba(24, 23, 23, 0.1)"
    />
    <Spacer left={2} />
    <Icon
      svg={Strava}
      href="https://www.strava.com/athletes/davesnx"
      color="rgb(252, 76, 2)"
      bg="rgba(252, 76, 2, 0.15)"
    />
    <Spacer left={2} />
    <Icon
      svg={Discord}
      href="https://discord.gg/byjdYFH"
      color="rgb(114, 137, 218)"
      bg="rgba(114, 137, 218, 0.15)"
    />
  </InlineLogoWrapper>
);
