import React from "react";
import { graphql } from "gatsby";

import Page from "../components/page";
import Spacer from "../components/spacer";
import Text from "../components/text";
import { Link } from "../components/link";
import Navigate from "../components/navigate";
import { Emoji } from "../theme";

const About = () => {
  return (
    <Page title="About me">
      <Text>
        Hi <Emoji name="hand">👋</Emoji>,
        I'm David Sancho, a developer based on Barcelona currently working at <Link to="http://ahrefs.com">ahrefs</Link> as a Software Engineer. Building <Link to="https://styled-ppx.vercel.app">styled-ppx</Link>, fully typed styled components for Reason/OCaml and ReScript.
      </Text>
      <Spacer top={2} />
      <Text>
        Previously worked at <Link to="https://draftbit.com">Draftbit</Link>{" "}
        helping people create React Native apps visually, and at{" "}
        <Link to="https://www.typeform.com">Typeform</Link> as Frontend engineer
        on the Renderer Team <i>(aka the form experience)</i>.
      </Text>
      <Spacer top={2} />
      <Text>
        Passionate in <strong>functional programming</strong>,{" "}
        <strong>design</strong>, <strong>scalability</strong>,{" "}
        <strong>people</strong> and <strong>startups</strong>, but lately about <strong>compilers</strong>. Even with my
        limited english, I'm trying to write about those in this{" "}
        <Navigate underline to="/blog">blog</Navigate>.
      </Text>
      <Spacer top={2} />
      <Text>
        I love endurance sports, specifically triathlon. I'm focused in Olympic
        and Half-Ironman distances.
      </Text>
      <Spacer top={2} />
      <Text>
      I'm grateful for what Open Source gave me and most of my code open as well, hosted on <Link to="https://github.com/davesnx">github.com/davesnx</Link>, hope you can find it useful too.
      </Text>
      <Spacer top={2} />
      <Text>
      Follow my fast thoughts on <Link to="https://github.com/davesnx">Twitter</Link>.
      </Text>
      <Spacer top={2} />
      <Text>
      Feel free to contact me, Bye!
      </Text>
    </Page>
  );
};

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;

export default About;
