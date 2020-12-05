import React from "react";
import styled from "styled-components";

import Spacer from "./spacer";
import Icon from "./LinkIcon";
import Twitter from "./../svgs/twitter";
import Github from "./../svgs/github";
import Strava from "./../svgs/strava";
import Discord from "./../svgs/discord";

const InlineLogoWrapper = styled.span`
  display: flex;
  align-items: center;
  width: 100%;
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

export const TwitterIcon = ({ href, size }) => (
  <Icon svg={Twitter} href={href} bg="rgba(29, 161, 242, 0.2)" size={size} />
);

export default () => (
  <InlineLogoWrapper>
    <TwitterIcon href="https://twitter.com/davesnx" />
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
