import React from "react";
import styled from "@emotion/styled";

import { H2 } from "../components/heading";
import { TextLink, NavigateText } from "../components/link";
import Page from "../components/page";
import MetaData from "../components/site-metadata";
import Spacer from "../components/spacer";
import Text from "../components/text";
import fonts from "../theme/fonts";
import { Row } from "../components/taco";
import { colors } from "../theme/theme";

const Dimmed = styled.div`
  opacity: 0.5;
`;

const Home = () => {
  return (
    <>
      <MetaData title="Home" />
      <Page title={<H2>David Sancho</H2>}>
        <Spacer bottom={10}>
          <Text size={fonts.fontSize1} align="left">
            <span>{`I'm a Software Engineer based in Barcelona, making cute software
        with `}</span>
            <TextLink href="http://reasonml.github.io/">Reason</TextLink>
            <span>{` and `}</span>
            <TextLink href="https://ocaml.org/">OCaml</TextLink>
            <span>{`. I co-host `}</span>
            <TextLink href="https://www.twitch.tv/emelletv">emelle.tv</TextLink>
            <span>{` a talk show about these languages.`}</span>
          </Text>
          <Spacer top={2} />
          <Text size={fonts.fontSize1}>
            {`I am currently working at `}
            <TextLink href="https://ahrefs.com/">Ahrefs</TextLink>
            {`, building user interfaces and tools.`}
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
        </Dimmed>
      </Page>
    </>
  );
};

export default Home;
