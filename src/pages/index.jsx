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
    <Page title="David Sancho">
      <Text align="left">
        Hey! I'm a Software engineer, trying to make cute software with{" "}
        <Link to="http://reasonml.github.io/">Reason</Link> and{" "}
        <Link to="https://ocaml.org/">OCaml</Link>. </Text>
      <Text>and a streamer, I co-host a show about ML languages called <Link to="https://www.twitch.tv/emelletv">EmelleTV</Link></Text>.
      <Spacer top={2} />
      <Text>Amateur triathlete mostly doing Olympic and Half (70.3) distances.</Text>
      <Spacer top={2} />
      <Text>You can read more about me in my <Navigate to="/about">/about</Navigate> page, or contact me on any social media</Text>
      <Spacer top={2} />
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
