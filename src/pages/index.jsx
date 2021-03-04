import React from "react";
import { graphql } from "gatsby";

import Page from "../components/page";
import { Link } from "../components/link";
import Spacer from "../components/spacer";
import Text from "../components/text";
import SocialMedia from "../components/social-media";

export default () => {
  return (
    <Page title="David Sancho">
      <Text align="left">
        Making cute software with{" "}
        <Link to="http://reasonml.github.io/">Reason</Link> and{" "}
        <Link to="https://ocaml.org/">OCaml</Link>.
      </Text>
      <br />
      <Text>
        Software Engineer at <Link to="https://ocaml.org/">draftbit</Link>,
        previously Frontend at <Link to="https://ocaml.org/">Typeform</Link>.
      </Text>
      <br />
      <Text>Amateur triathlete doing Olympic and Half (70.3) distances.</Text>
      <Spacer top={3} />
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
