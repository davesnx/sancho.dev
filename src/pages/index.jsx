import React from "react";
import { graphql, Link as GatsbyLink } from "gatsby";
import styled from "styled-components";

import Layout from "../components/layout";
import Spacer from "../components/spacer";
import Link from "../components/link";
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

const Name = styled.h1`
  font-size: ${font.fontSize5};
  font-family: ${font.sans};
  font-weight: bold;
  margin: 0;
  letter-spacing: 2px;
`;

const Description = styled.h1`
  font-size: ${font.fontSize2};
  line-height: 38px;
  font-family: '${font.sans}';
  font-weight: 400;
  text-align: center;
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

const Button = styled.a`
  font-weight: 600;
  font-family: '${font.sans}';

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

export default () => {
  const [chromaticAberration, setChromaaticAberration] = React.useState(false);

  const clickHandler = () => {
    setChromaaticAberration(isEnabled => !isEnabled);
  };

  const mouse = useMousePosition();
  const orientation = useDeviceOrientation();

  const Title = chromaticAberration ? (
    <ChromaticText mouse={mouse} orientation={orientation}>
      <Name as="h1">David Sancho</Name>
    </ChromaticText>
  ) : (
    <Name as="h1">David Sancho</Name>
  );

  return (
    <Layout>
      <Main cursor={chromaticAberration ? "crosshair" : "auto"}>
        <Container>
          {React.cloneElement(Title)}
          <Spacer top={4}>
            <Description>
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
              Passionate about design, functional programming, scalability,
              people and business.{" "}
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
            </Description>
            {/*             <Spacer top={3}>
              <Footer>
                <GatsbyLink to="blog">
                  <Button inverted>Blog</Button>
                </GatsbyLink>
              </Footer>
            </Spacer>
 */}{" "}
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
