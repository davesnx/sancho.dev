import React from "react";
import styled from "styled-components";

import colors from "../colors";
import { TextLink, NavigateText } from "../components/link";
import Spacer from "../components/spacer";
import { Row } from "../components/taco";
import Text from "../components/text";
import fonts from "../fonts";

const Minimal = styled.div`
  min-height: 100vh;
  background-color: ${colors.contrast};
`;

const Body = styled.main`
  max-width: 736px;
  padding-top: 6rem;
  padding-left: 4rem;
  padding-right: 4rem;
`;

export default () => {
  return (
    <Minimal>
      <Body>
        <Text size={fonts.fontSize2} weight={400} align="left">
          David Sancho
        </Text>
        <Spacer top={4} />
        <Text size={fonts.fontSize1} align="left">
          I'm a Barcelona based software engineer. Trying to make cute software
          with <TextLink to="http://reasonml.github.io/">Reason</TextLink> and{" "}
          <TextLink to="https://ocaml.org/">OCaml</TextLink>. I co-host{" "}
          <TextLink to="https://www.twitch.tv/emelletv">EmelleTV</TextLink> a
          streaming show talking about these languages.
        </Text>
        <Spacer top={2} />
        <Text size={fonts.fontSize1}>
          I currently work at{" "}
          <TextLink to="https://ahrefs.com/">Ahrefs</TextLink>, building{" "}
          <TextLink to="https://styled-ppx.vercel.app">styled-ppx</TextLink>.
        </Text>
        <Spacer top={2} />
        <Text size={fonts.fontSize1}>
          In my spare time, I train as an amateur triathlete focusing on Olympic
          and Half Ironman distances, maintain a bunch of Open Source
          projects, and write my thoughts on my <NavigateText underline to="/blog">
            blog
          </NavigateText>{". "}
        </Text>
        <Spacer top={2} />
        <Text size={fonts.fontSize1}>
          You can read more about me in the{" "}
          <NavigateText underline to="/about">
            about
          </NavigateText>{" "}
          page.</Text>
        <Spacer top={3} />
        <Row gap={2} distribute="left">
          <TextLink
            underlined
            href={"https://twitter.com/davesnx"}
            color="rgba(29, 161, 242, 0.6)"
          >
            {"Twitter"}
          </TextLink>
          <TextLink
            underlined
            href="https://github.com/davesnx"
            color="rgba(24, 23, 23, 0.6)"
          >
            {"Github"}
          </TextLink>
          <TextLink
            underlined
            href="https://t.me/davesnx"
            color="rgba(114, 137, 218, 0.6)"
          >
            {"Telegram"}
          </TextLink>
          <TextLink
            underlined
            href="https://www.strava.com/athletes/davesnx"
            color="rgba(252, 76, 2, 0.6)"
          >
            {"Strava"}
          </TextLink>
        </Row>
      </Body>
    </Minimal>
  );
};
