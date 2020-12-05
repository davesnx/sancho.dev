import React from "react";

import { Stack } from "./taco";
import Icon from "./link-icon";
import Twitter from "./../svgs/twitter";
import Github from "./../svgs/github";
import Strava from "./../svgs/strava";
import Discord from "./../svgs/discord";

const GithubIcon = ({ href }) => (
  <Icon svg={Github} href={href} bg="rgba(24, 23, 23, 0.1)" />
);

const TwitterIcon = ({ href, size }) => (
  <Icon svg={Twitter} href={href} size={size} bg="rgba(29, 161, 242, 0.2)" />
);

export default () => (
  <Stack gap={2} distribute="left">
    <TwitterIcon href="https://twitter.com/davesnx" />
    <GithubIcon href="https://github.com/davesnx" />
    <Icon
      svg={Strava}
      href="https://www.strava.com/athletes/davesnx"
      bg="rgba(252, 76, 2, 0.2)"
    />
    <Icon
      svg={Discord}
      href="https://discord.gg/xFHUBgx"
      bg="rgba(114, 137, 218, 0.2)"
    />
  </Stack>
);
