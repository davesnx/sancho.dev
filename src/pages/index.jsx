import React from "react";
import { graphql } from "gatsby";

import Page from "../components/page";
import { Link } from "../components/link";
import Navigate from "../components/navigate";
import Spacer from "../components/spacer";
import Text from "../components/text";
import SocialMedia from "../components/social-media";

export default () => {
  return (
    <Page title="Hey! I'm David Sancho">
      <Text align="left">
        Software engineer based in Barcelona. Trying to make cute software with{" "}
        <Link to="http://reasonml.github.io/">Reason</Link> and{" "}
        <Link to="https://ocaml.org/">OCaml</Link>. I co-host <Link to="https://www.twitch.tv/emelletv">EmelleTV</Link> a stream show about those languages. </Text>
      <Spacer top={2} />
      <Text>In my spare time, I train as an amateur triathlete focused in Olympic and Half Ironman distances and creating/maintaing a bunch of Open Source projects</Text>
      <Spacer top={2} />
      <Text>You can read more about me in the <Navigate to="/about">/about</Navigate> page.</Text>
      <Spacer top={4} />
      <SocialMedia />
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
