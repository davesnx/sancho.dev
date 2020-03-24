import React from "react";
import { graphql, Link as GatsbyLink } from "gatsby";
import styled from "styled-components";

import Layout from "../components/layout";
import Spacer from "../components/spacer";
import reasonLogo from "../../static/media/reason.png";
import {
  Text as ChromaticText,
  Button as ChromaticButton,
} from "../components/chromatic";
import colors from "../components/colors";
import font from "../components/fonts";
import useMousePosition from "../components/mouse-position";
import useDeviceOrientation from "../components/device-orientation";
import Text from "../components/text";

const H1 = styled.h1`
  font-size: ${font.fontSize4};
  font-weight: bold;
  margin: 0;
`;

const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  cursor: ${props => props.cursor};
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  width: 80vw;
  max-width: 50rem;
  margin-top: 25vh;
`;

const Link = styled.a`
  color: ${colors.grey};
  font-weight: 600;
  font-size: inherit;
  transition: color 0.15s ease;
  &:hover {
    color: ${colors.white};
  }
`;

const Button = styled.a`
  font-weight: 600;
  border: 1px solid white;
  border-radius: 4px;
  padding: 0.5rem 1.5rem;
  text-decoration: none;
  display: flex;

  transition: background-color 0.15s ease;
  font-size: ${font.fontSize0};

  ${props =>
    props.inverted
      ? `
    background-color: ${colors.white};
    color: ${colors.black};

    &:hover {
      background-color: ${colors.grey};
    }
  }
  `
      : `
    color: ${colors.grey};
    &:hover {
      background-color: ${colors.white};
      color: ${colors.black};
    }
  }
`}
`;

const Footer = styled.div`
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const ReasonML = styled.span`
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

const FloatingBottom = styled.div`
  position: absolute;
  bottom: 10vh;

  @media only screen and (max-width: 600px) {
    bottom: 8px;
  }
`;

export default ({ data }) => {
  const [chromaticAberration, setChromaaticAberration] = React.useState(true);

  const clickHandler = () => {
    setChromaaticAberration(isEnabled => !isEnabled);
  };

  const mouse = useMousePosition();
  const orientation = useDeviceOrientation();

  const Title = chromaticAberration ? (
    <ChromaticText mouse={mouse} orientation={orientation}>
      <H1>David Sancho</H1>
    </ChromaticText>
  ) : (
    <H1>David Sancho</H1>
  );

  return (
    <Layout>
      <Main cursor={chromaticAberration ? "crosshair" : "auto"}>
        <Container>
          {React.cloneElement(Title)}
          <Spacer top={4}>
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
                Typeform
              </Link>{" "}
              on core experience. Passionate about design, functional
              programming, scalability, people and business.{" "}
              <ReasonML>
                ReasonML
                <Logo src={reasonLogo} />
              </ReasonML>
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
            <Spacer top={3}>
              <Footer>
                <Button href="https://davesnx.typeform.com/to/TPD31G">
                  Ask me anything
                  <Spacer left={1} right={-1}>
                    <span role="img" aria-label="hello">
                      👋
                    </span>
                  </Spacer>
                </Button>
                <Spacer left={2}>
                  <Button as={GatsbyLink} inverted to="blog">
                    Blog
                  </Button>
                </Spacer>
              </Footer>
            </Spacer>
          </Spacer>
        </Container>
        <FloatingBottom>
          <ChromaticButton enabled={chromaticAberration} onClick={clickHandler}>
            Enable chromatic aberration
          </ChromaticButton>
        </FloatingBottom>
      </Main>
    </Layout>
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
