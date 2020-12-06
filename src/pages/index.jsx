import React from "react";
import { graphql } from "gatsby";

import Page from "../components/page";
import Spacer from "../components/spacer";
import Description from "../components/description";
import SocialMedia from "../components/social-media";

export default () => {
  return (
    <Page title="David Sancho">
      <>
        <Description />
        <Spacer top={8} />
        <SocialMedia />
      </>
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
