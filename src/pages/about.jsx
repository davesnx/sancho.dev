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
    <Page title="About">
      <Text>
        Hi <Emoji name="hand">👋</Emoji>,
        I'm David Sancho, a Software engineer from Barcelona coding in{" "}
        <Link to="http://reasonml.github.io/">Reason</Link> and{" "}
        <Link to="https://ocaml.org/">OCaml</Link>.
      </Text>
      <Spacer top={2} />
      <Text>
        Working on{" "}
        <Link to="https://github.com/davesnx/styled-ppx">
          davesnx/styled-ppx
        </Link>
        .
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
        <strong>people</strong> and <strong>startups</strong>. Even with my
        limited english, I'm trying to write about those in this{" "}
        <Navigate underline to="/blog">blog</Navigate>.
      </Text>
      <Spacer top={2} />
      <Text>
        Aside from the computer, I love endurance sports and I'm doing Olympic
        and Half (70.3) triathlon distances since a few years ago.
      </Text>
      <Spacer top={2} />
      <Text>
        You can reach on{" "}
        <Link to="https://twitter.com/davesnx">twitter.com/davesnx</Link> or
        email me at <strong>"dsnxmoreno at gmail dot com"</strong>.
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
