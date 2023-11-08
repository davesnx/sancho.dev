import React from "react";
import styled from "@emotion/styled";

import { H2 } from "../components/heading";
import { TextLink, NavigateText } from "../components/link";
import Page from "../components/page";
import MetaData from "../components/site-metadata";
import Spacer from "../components/spacer";
import { Row } from "../components/taco";
import Text from "../components/text";
import fonts from "../theme/fonts";
import { colors } from "../theme/theme";
import constants from "../theme/constants";
import { unit, px } from "../utils/unit";

const Avatar = styled.img`
  width: 160px;
  height: auto;
  border-radius: ${unit(1)}px;
`;

const ColumnReverse = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: flex-start;
  justify-content: space-between;

  gap: ${(props: { gap: number }) => px(unit(props.gap / 2 || 2))};

  @media (max-width: ${constants.mobile.width}px) {
    flex-direction: column-reverse;
    height: auto;
  }
`;

const Home = () => {
  return (
    <>
      <MetaData title="Home" />
      <Page>
        <Spacer bottom={3}>
          <H2>David Sancho</H2>
        </Spacer>
        <ColumnReverse gap={8}>
          <div>
            <Text size={fonts.fontSize1} align="left">
              <span>{`I'm a Software Engineer based in Barcelona, making cute software
        with `}</span>
              <TextLink href="http://reasonml.github.io/">Reason</TextLink>
              <span>{` and `}</span>
              <TextLink href="https://ocaml.org/">OCaml</TextLink>
              <span>{`. I co-host `}</span>
              <TextLink href="https://www.twitch.tv/emelletv">
                emelle.tv
              </TextLink>
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
          </div>
          <Avatar src={"/images/face.jpeg"} />
        </ColumnReverse>
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
    </>
  );
};

export default Home;
