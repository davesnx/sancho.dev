import React from "react";

import Github from "./../svgs/github";
import Strava from "./../svgs/strava";
import Telegram from "./../svgs/telegram";
import Twitter from "./../svgs/twitter";
import { colors } from "./../theme";
import LinkIcon from "./link-icon";
import { Row } from "./taco";

const SocialMedia = () => (
  <Row gap={2} distribute="left">
    <LinkIcon
      svg={Twitter}
      size={20}
      href={"https://twitter.com/davesnx"}
      bg={colors.twitter}
    />
    <LinkIcon
      svg={Github}
      size={20}
      href="https://github.com/davesnx"
      bg={colors.github}
    />
    <LinkIcon
      svg={Telegram}
      size={20}
      href="https://t.me/davesnx"
      bg={colors.telegram}
    />
    <LinkIcon
      size={20}
      svg={Strava}
      href="https://www.strava.com/athletes/davesnx"
      bg={colors.strava}
    />
  </Row>
);

export default SocialMedia;
