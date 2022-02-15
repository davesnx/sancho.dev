import React from "react";

import { Row } from "./taco";
import LinkIcon from "./link-icon";
import Twitter from "./../svgs/twitter";
import Github from "./../svgs/github";
import Strava from "./../svgs/strava";
import Telegram from "./../svgs/telegram";

export default () => (
  <Row gap={2} distribute="left">
    <LinkIcon
      svg={Twitter}
      size={20}
      href={"https://twitter.com/davesnx"}
      bg="rgba(29, 161, 242, 0.2)"
    />
    <LinkIcon
      svg={Github}
      size={20}
      href="https://github.com/davesnx"
      bg="rgba(24, 23, 23, 0.1)"
    />
    <LinkIcon
      svg={Telegram}
      size={20}
      href="https://t.me/davesnx"
      bg="rgba(114, 137, 218, 0.2)"
    />
    <LinkIcon
      size={20}
      svg={Strava}
      href="https://www.strava.com/athletes/davesnx"
      bg="rgba(252, 76, 2, 0.2)"
    />
  </Row>
);
