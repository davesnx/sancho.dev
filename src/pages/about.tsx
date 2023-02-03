import React from "react";

import { Emoji } from "../components/emoji";
import { H1 } from "../components/heading";
import { TextLink, NavigateText } from "../components/link";
import Page from "../components/page";
import MetaData from "../components/site-metadata";
import Spacer from "../components/spacer";
import Text from "../components/text";

/*import font from "../theme/fonts";
const Heading = ({ children }: string) => (
  <Spacer top={2} bottom={1}>
    <Text size={font.fontSize2} weight="500">
      {children}
    </Text>
  </Spacer>
); */

let About = () => {
  return (
    <>
      <MetaData title="About me" />
      <Page title={<H1>About me</H1>}>
        <Text>
          Hi <Emoji name="hand">👋</Emoji>
          {`, My name is David Sancho and I'm a
        developer based on Barcelona currently working remotely at `}
          <TextLink href="http://ahrefs.com">Ahrefs</TextLink>
          {` as a Software
        engineer, building `}
          <TextLink href="https://styled-ppx.vercel.app">styled-ppx</TextLink>
          {` (styled components for Reason/OCaml and ReScript with typed CSS).`}
        </Text>
        <Spacer top={2} />
        <Text>
          {`Previously worked at `}
          <TextLink href="https://draftbit.com">Draftbit</TextLink>
          {` helping people
        create React Native apps visually, and at `}
          <TextLink href="https://www.typeform.com">Typeform</TextLink>
          {` as Frontend engineer on the Renderer Team `}
          <i>{`(also known as "form experience")`}</i>.
        </Text>
        <Spacer top={2} />
        <Text>
          {`Passionate in functional programming, design, scalability, people and
        startups, but lately about compilers. Even with my limited english, I'm
        trying to write about those in this `}
          <NavigateText underline href="/blog">
            blog
          </NavigateText>
          .
        </Text>
        <Spacer top={2} />
        <Text>
          {`I love endurance sports, specifically triathlon and ski. I'm focused on
        Olympic and Half-Ironman distances.`}
        </Text>
        <Spacer top={2} />
        <Text>
          {`I'm grateful for what Open Source gave me and that's why most of my code
        is open as well, hosted at `}
          <TextLink href="https://github.com/davesnx">
            github.com/davesnx
          </TextLink>
          .
        </Text>
        <Spacer top={2} />
        <Text>
          {`If you want to know more, follow my fast thoughts on `}
          <TextLink href="https://github.com/davesnx">Twitter</TextLink>.
        </Text>
      </Page>
    </>
  );
};

export default About;
