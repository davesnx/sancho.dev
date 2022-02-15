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
        My name is David Sancho and I'm a developer based on Barcelona currently working remotely at <Link to="http://ahrefs.com">ahrefs</Link> as a Software engineer, building <Link to="https://styled-ppx.vercel.app">styled-ppx</Link> (styled components for Reason/OCaml and ReScript with typed CSS).
      </Text>
      <Spacer top={2} />
      <Text>
        Previously worked at <Link to="https://draftbit.com">Draftbit</Link>{" "}
        helping people create React Native apps visually, and at{" "}
        <Link to="https://www.typeform.com">Typeform</Link> as Frontend engineer
        on the Renderer Team <i>(also known as "form experience")</i>.
      </Text>
      <Spacer top={2} />
      <Text>
        Passionate in functional programming,
        design, scalability,
        people and startups, but lately about compilers. Even with my
        limited english, I'm trying to write about those in this{" "}
        <Navigate underline to="/blog">blog</Navigate>.
      </Text>
      <Spacer top={2} />
      <Text>
        I love endurance sports, specifically triathlon and ski. I'm focused on Olympic
        and Half-Ironman distances.
      </Text>
      <Spacer top={2} />
      <Text>
      I'm grateful for what Open Source gave me and that's why most of my code is open as well, hosted at <Link to="https://github.com/davesnx">github.com/davesnx</Link>.
      </Text>
      <Spacer top={2} />
      <Text>
      If you want to know more, follow my fast thoughts on <Link to="https://github.com/davesnx">Twitter</Link>.
      </Text>
      <Spacer bottom={16} />
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
