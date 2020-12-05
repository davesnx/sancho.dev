import React from "react";
import { graphql } from "gatsby";

import Page from "../components/page";
import Spacer from "../components/spacer";
import Link from "../components/link";
import Text from "../components/text";
import SocialMedia from "../components/social-media";

export default () => {
  return (
    <Page title="Projects">
      <>
        <Text align="left">
          I'm a Software Engineer working at{" "}
          <Link
            target="_blank"
            rel="noreferrer noopener"
            href="https://draftbit.com"
          >
            Draftbit
          </Link>
          , previously at{" "}
          <Link
            target="_blank"
            rel="noreferrer noopener"
            href="https://www.typeform.com"
          >
            Typeform.
          </Link>{" "}
          <Spacer top={2} />
          Passionate about functional programming, design, scalability, people
          and business. Amateur triathlete.
        </Text>
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
