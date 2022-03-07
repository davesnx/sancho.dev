import React from "react";
import styled from "styled-components";

import { colors } from "../theme";
import { TextLink, NavigateText } from "../components/link";
import Spacer from "../components/spacer";
import { Row } from "../components/taco";
import Text from "../components/text";
import fonts from "../fonts";
import constants from "../constants";
import { useIsMobile } from "../utils/media-query";

const Minimal = styled.div`
  min-height: 100vh;
  background-color: ${colors.contrast};
`;

const Body = styled.main`
  width: 100%;
  max-width: ${constants.desktop.width};
  padding-left: 32px;
  padding-right: 32px;
  padding-top: 6rem;
  margin-left: 32px;

  @media (max-width: ${constants.mobile.width}) {
    margin-left: 0px;
    padding-top: 3rem;
    padding-left: 16px;
    padding-right: 16px;
  }
`;

let Pages = () => {
  let isMobile = useIsMobile();
  return (
    <Minimal>
      <Body>
        <Text size={fonts.fontSize2} weight={400} align="left">
          David Sancho
        </Text>
        <Spacer top={isMobile ? 2 : 4} />
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
          and Half Ironman distances, maintain a bunch of Open Source projects,
          and write my thoughts on my{" "}
          <NavigateText underline to="/blog">
            blog{". "}
          </NavigateText>
        </Text>
        <Spacer top={2} />
        <Text size={fonts.fontSize1}>
          You can read more about me in the{" "}
          <NavigateText underline to="/about">
            about
          </NavigateText>{" "}
          page.
        </Text>
        <Spacer top={3} />
        <Row gap={2} distribute="left">
          <TextLink
            underlined
            href={"https://twitter.com/davesnx"}
            color={colors.twitter}
          >
            {"Twitter"}
          </TextLink>
          <TextLink
            underlined
            href="https://github.com/davesnx"
            color={colors.github}
          >
            {"Github"}
          </TextLink>
          <TextLink
            underlined
            href="https://t.me/davesnx"
            color={colors.telegram}
          >
            {"Telegram"}
          </TextLink>
          <TextLink
            underlined
            href="https://www.strava.com/athletes/davesnx"
            color={colors.strava}
          >
            {"Strava"}
          </TextLink>
        </Row>
      </Body>
    </Minimal>
  );
};

export default Pages
