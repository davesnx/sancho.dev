import React from "react";

import { H1 } from "../components/heading";
import { TextLink, NavigateText } from "../components/link";
import Page from "../components/page";
import MetaData from "../components/site-metadata";
import Spacer from "../components/spacer";
import Text from "../components/text";

let About = () => {
  return (
    <>
      <MetaData title="About" />
      <Page title={<H1>About</H1>}>
        <Text>
          {`Hi! I'm a Software Engineer from Barcelona currently working remotely at `}
          <TextLink href="http://ahrefs.com">{"Ahrefs"}</TextLink>
          {`, on `}
          <TextLink href="https://melange.re">{"Melange"}</TextLink>
          {", "}
          <TextLink href="https://reasonml.github.io/">{"Reason"}</TextLink>
          {", "}
          <TextLink href="https://reasonml.github.io/reason-react/">
            {"reason-react"}
          </TextLink>
          {", "}
          <TextLink href="https://styled-ppx.vercel.app">
            {"styled-ppx"}
          </TextLink>
          {", and "}
          <TextLink href="https://github.com/ml-in-barcelona/server-reason-react">
            {"server-reason-react"}
          </TextLink>
          {`. Working remote gave me the possibility to live between Barcelona and La Cerdanya (Pyrenees) and enjoy the freedom and beauty of the mountains.`}
        </Text>
        <Spacer top={2} />
        <Text>
          {`My interests are very broad, from functional programming with OCaml to design systems. Scalability, people and
        startups. Lately got a passion for languages and compilers. Even with my limited english, I'm
        trying to share about those in my personal `}
          <NavigateText underline href="/blog">
            blog
          </NavigateText>
          .
        </Text>
        <Spacer top={2} />
        <Text>
          {`Previously worked at `}
          <TextLink href="https://draftbit.com">Draftbit</TextLink>
          {` and `}
          <TextLink href="https://www.typeform.com">Typeform</TextLink>.
        </Text>
        <Spacer top={2} />
        <Spacer top={2} />
        <Text>
          {`I'm grateful for what Open Source gave me and that's why most of my code
        is public and hosted in GitHub, you can find me `}
          <TextLink href="https://github.com/davesnx">
            github.com/davesnx
          </TextLink>
          .
        </Text>
        <Spacer top={2} />
        <Text>
          {`I love endurance sports, specifically triathlon and ski. I'm focused on
        Olympic and Half-Ironman distances.`}
        </Text>
        <Spacer top={2} />
      </Page>
    </>
  );
};

export default About;
