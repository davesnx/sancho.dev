import styled from "@emotion/styled";
import React from "react";

import { H4 } from "../components/heading";
import { NavigateText, TextLink } from "../components/link";
import Page from "../components/page";
import MetaData from "../components/site-metadata";
import Spacer from "../components/spacer";
import { Row } from "../components/taco";
import Text from "../components/text";
import fonts from "../theme/fonts";
import { colors } from "../theme/theme";

const Dimmed = styled.div`
  opacity: 0.8;
`;

let Title = () => {
  return (
    <Row distribute="left" gap={2} align="baseline">
      <H4>{"David Sancho"}</H4>
    </Row>
  );
};

const Home = () => {
  return (
    <>
      <MetaData title="Home" />
      <Page title={<Title />}>
        <Spacer bottom={10}>
          <Text size={fonts.fontSize1} align="left">
            <span>{`A Software Engineer based in Barcelona, making software
        with `}</span>
            <TextLink href="http://reasonml.github.io/">Reason</TextLink>
            <span>{` and `}</span>
            <TextLink href="https://ocaml.org/">OCaml</TextLink>
          </Text>
          <Spacer top={2} />
          <Text size={fonts.fontSize1}>
            {`I am currently working at `}
            <TextLink href="https://ahrefs.com/">ahrefs</TextLink>
            {`, making tools that help developers to build great user interfaces.`}
          </Text>
          <Spacer top={2} />
          <Text size={fonts.fontSize1}>
            {`You can read more about me on the `}
            <NavigateText underline href="/about">
              about
            </NavigateText>{" "}
            {` page.`}
          </Text>
        </Spacer>
        <Dimmed>
          <Row gap={2} distribute="left">
            <TextLink
              underlined
              href={"https://bsky.app/profile/david.sancho.dev"}
              color={colors.bluesky}
            >
              {"Bluesky"}
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
              href={"https://x.com/davesnx"}
              color={colors.twitter}
            >
              {"X"}
            </TextLink>
            <TextLink
              underlined
              href="https://discordapp.com/users/122441959414431745"
              color={colors.discord}
            >
              {"Discord"}
            </TextLink>
            <TextLink
              underlined
              href="https://www.strava.com/athletes/davesnx"
              color={colors.strava}
            >
              {"Strava"}
            </TextLink>
          </Row>
        </Dimmed>
      </Page>
    </>
  );
};

export default Home;
