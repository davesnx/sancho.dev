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
        Software engineer. Making (not always) cute software with{" "}
        <Link to="http://reasonml.github.io/">Reason</Link> and{" "}
        <Link to="https://ocaml.org/">OCaml</Link>.
      </Text>
      <Text>Previously working at <Link to="https://draftbit.com">@draftbit</Link>, <Link to="https://www.typeform.com">@Typeform</Link>.</Text>
      <Text>Amateur triathlete mostly doing Olympic and Half (70.3) distances.</Text>
      <Spacer top={3} />
      <Text>You can read more about me <Navigate to="/about">here</Navigate>, or contact me on</Text>
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
