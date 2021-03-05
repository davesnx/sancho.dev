import React from "react";
import { graphql } from "gatsby";

import Page from "../components/page";
import Spacer from "../components/spacer";
import Text from "../components/text";
import { Link } from "../components/link";
import Navigate from "../components/navigate";

const About = () => {
  return (
    <Page title="About">
      <Text align="left">
        Hello, I'm David Sancho, a Software Engineer from Barcelona writing{" "}
        <Link to="http://reasonml.github.io/">Reason</Link> and{" "}
        <Link to="https://ocaml.org/">OCaml</Link>.
      </Text>
      <Spacer top={2} />
      <Text>
        Currently working remotely at{" "}
        <Link to="https://draftbit.com">Draftbit</Link> helping people create
        mobile apps visually. Previously worked as Frontend at{" "}
        <Link to="https://www.typeform.com">Typeform</Link> for 5 years on the
        Renderer (also known as Form Experience) with an amazing team,{" "}
        <Link to="https://stickbugs.dev">Stickbugs</Link> ♥️.
      </Text>
      <Spacer top={2} />
      <Text>
        Passionate in <strong>functional programming</strong>,{" "}
        <strong>design</strong>, <strong>scalability</strong>,{" "}
        <strong>people</strong> and <strong>business</strong>. Even with my
        limited english, I'm trying to write about those in this{" "}
        <Navigate to="/blog">blog</Navigate>.
      </Text>
      <Spacer top={2} />
      <Text>
        Aside from the computer, I love endurance sports and I'm doing Olympic
        and Half (70.3) triathlon distances since a few years ago.
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
