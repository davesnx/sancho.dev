import React from "react";
import { graphql, Link as GatsbyLink } from "gatsby";
import styled from "styled-components";

import Page from "../components/page";
import Spacer from "../components/spacer";
import Link from "../components/link";
import Text from "../components/text";
import colors from "../components/colors";
import font from "../components/fonts";
import SocialMedia, { ReasonLogo } from "../components/social-media";

const Name = styled.h1`
  font-size: ${font.fontSize6};
  font-family: ${font.sans};
  font-weight: bold;
  margin: 0;
  letter-spacing: 2px;
  text-align: left;
  color: ${colors.black};
`;

const ButtonLink = styled(GatsbyLink)`
  text-decoration: none;
`;

const Button = styled.span`
  font-weight: 500;
  font-family: '${font.sans}';

  border-radius: 4px;
  padding: 0.5rem 0.8rem;

  display: flex;

  transition: background-color 0.15s ease;
  font-size: ${font.fontSizeN1};

  background-color: ${colors.black};
  color: ${colors.white};

  letter-spacing: 1.5px;

  &:hover {
    color: ${colors.white};
    background-color: ${colors.grey};
  }
`;

const Footer = styled.div`
  justify-content: left;
  align-items: center;
  flex-direction: row;
`;

const FlexWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: ${props => props.position};
  align-items: center;
  flex-direction: row;
`;

const InlineLogoWrapper = styled.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;
`;

export default () => {
  return (
    <Page title={<Name as="h1">David Sancho</Name>}>
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
          <br />
          Passionate about functional programming, design, scalability, people
          and business. Lately into{" "}
          <InlineLogoWrapper>
            Reason{" "}
            <Spacer left={1}>
              <ReasonLogo />
            </Spacer>
          </InlineLogoWrapper>
          . Amateur triathlete.
        </Text>
        <Spacer top={3}>
          <Footer>
            <FlexWrapper position="left">
              <ButtonLink to="blog">
                <Button>BLOG</Button>
              </ButtonLink>
              <Spacer left={2}>
                <ButtonLink to="experiments">
                  <Button>EXPERIMENTS</Button>
                </ButtonLink>
              </Spacer>
            </FlexWrapper>
            <FlexWrapper position="flex-end">
              <SocialMedia />
            </FlexWrapper>
          </Footer>
        </Spacer>
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
