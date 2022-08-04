import React from "react";

import { colors } from "../theme";
import { TextLink, NavigateText } from "../components/link";
import Spacer from "../components/spacer";
import Page from "../components/page";
import { Row } from "../components/taco";
import Text from "../components/text";
import { H1 } from "../components/heading";
import fonts from "../fonts";

let Pages = () => {
  return (
    <Page title={<H1>David Sancho</H1>}>
      <Text size={fonts.fontSize1} align="left">
        I'm a Barcelona based software engineer. Trying to make cute software
        with <TextLink to="http://reasonml.github.io/">Reason</TextLink> and{" "}
        <TextLink to="https://ocaml.org/">OCaml</TextLink>. I co-host{" "}
        <TextLink to="https://www.twitch.tv/emelletv">EmelleTV</TextLink> a
        streaming show talking about these languages.
      </Text>
      <Spacer top={2} />
      <Text size={fonts.fontSize1}>
        I currently work at <TextLink to="https://ahrefs.com/">Ahrefs</TextLink>
        , building{" "}
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
    </Page>
  );
};

export default Pages;
