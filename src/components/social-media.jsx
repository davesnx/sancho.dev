import React from "react";
import styled from "styled-components";

import Spacer from "./spacer";
import Twitter from "./../svgs/twitter";
import Github from "./../svgs/github";
import Strava from "./../svgs/strava";
import Discord from "./../svgs/discord";
import colors from "./colors";

const InlineLogoWrapper = styled.span`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
`;

const Icon = ({ svg: Svg, size, bg, href }) => (
  <a target="_blank" rel="noreferrer noopener" href={href}>
    <Logo size={size} color={bg}>
      <Svg size={size} fill={colors.black}></Svg>
    </Logo>
  </a>
);

const Logo = styled.div`
  width: ${props => (props.size ? `${props.size}px` : "40px")};
  height: ${props => (props.size ? `${props.size}px` : "40px")};
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 100ms ease-in;

  &:hover {
    background: ${props => props.color};
  }
`;

const Square = styled.div`
  width: 20px;
  height: 20px;
  background: #db4d3f;
  position: relative;
`;

const RE = styled.span`
  color: white;
  position: absolute;
  font-size: 10px;
  font-weight: 500;
  line-height: 1;
  right: 1.5px;
  bottom: 1px;
  -webkit-font-smoothing: subpixel-antialiased;
`;

export const ReasonLogo = () => (
  <Square>
    <RE>RE</RE>
  </Square>
);

export const GithubIcon = ({ href }) => (
  <Icon href={href} svg={Github} bg="rgba(24, 23, 23, 0.1)" />
);

export const TwitterIcon = ({ href, size, inline = false }) => (
  <Icon svg={Twitter} href={href} bg="rgba(29, 161, 242, 0.2)" size={size} />
);

export default () => (
  <InlineLogoWrapper>
    <TwitterIcon href="https://github.com/davesnx" />
    <Spacer left={2} />
    <GithubIcon href="https://github.com/davesnx" />
    <Spacer left={2} />
    <Icon
      svg={Strava}
      href="https://www.strava.com/athletes/davesnx"
      bg="rgba(252, 76, 2, 0.2)"
    />
    <Spacer left={2} />
    <Icon
      svg={Discord}
      href="https://discord.gg/xFHUBgx"
      bg="rgba(114, 137, 218, 0.2)"
    />
  </InlineLogoWrapper>
);
