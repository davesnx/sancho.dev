import React from "react";
import { graphql, Link as GatsbyLink } from "gatsby";
import styled from "styled-components";

import Page from "../components/page";
import Spacer from "../components/spacer";
import Link from "../components/link";
import Text from "../components/text";
import reasonLogo from "../../static/media/reason.png";
import colors from "../components/colors";
import font from "../components/fonts";

const Name = styled.h1`
  font-size: ${font.fontSize5};
  font-family: ${font.sans};
  font-weight: bold;
  margin: 0;
  letter-spacing: 2px;
  text-align: center;
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
  font-size: ${font.fontSize0};

  background-color: ${colors.black};
  color: ${colors.white};

  letter-spacing: 1.5px;

  &:hover {
    color: ${colors.white};
    background-color: ${colors.grey};
  }
`;

const Footer = styled.div`
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const NotVisible = styled.div`
  display: none;
`;

const InlineLogoWrapper = styled.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.img`
  width: 22px;
  heigth: 22px;
  padding: 0;
  padding-left: 8px;
`;

export default () => {
  return (
    <Page title={<Name as="h1">David Sancho</Name>}>
      <>
        <Text align="center">
          Software Engineer working at{" "}
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
          Passionate about design, functional programming, scalability, people
          and business.{" "}
          <InlineLogoWrapper>
            Reason
            <Logo src={reasonLogo} />
          </InlineLogoWrapper>
          .
          <br />
          Amateur triathlete{" "}
          <Link
            target="_blank"
            rel="noreferrer noopener"
            href="https://www.strava.com/athletes/davesnx"
          >
            strava/davesnx
          </Link>
          .
        </Text>
        <NotVisible>
          <Spacer top={3}>
            <Footer>
              <ButtonLink to="thoughts">
                <Button>THOUGHTS</Button>
              </ButtonLink>
              <Spacer left={1}>
                <ButtonLink to="labs">
                  <Button>LABS</Button>
                </ButtonLink>
              </Spacer>
            </Footer>
          </Spacer>
        </NotVisible>
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
