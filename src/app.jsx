import React from "react";
import styled from "styled-components";

import GlobalStyles from "./global-styles.jsx";
import Spacer from "./spacer.jsx";
import reasonLogo from "./images/reason.png";
import { Text as ChromaticText, Button as ChromaticButton } from "./chromatic";
import colors from "./colors";
import font from "./fonts";
import useMousePosition from "./mouse-position";
import useDeviceOrientation from "./device-orientation";

const H1 = styled.h1`
  font-size: ${font.fontSize3};
  font-weight: bold;
  margin: 0;
`;

const Main = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${colors.black};

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
  max-width: 50rem
  margin-top: -10vh;
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
  color: ${colors.grey};
  font-weight: 400;
  font-size: ${font.fontSize0};
  border: 1px solid white;
  border-radius: 4px;
  margin-top: 0.5rem;
  padding: 0.5rem 1.5rem;
  text-decoration: none;
  display: flex;

  transition: background-color 0.15s ease;
  &:hover {
    background-color: ${colors.white};
    color: ${colors.black};
  }
`;

const Footer = styled.div`
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const Content = styled.p`
  font-weight: 200;
  font-size: ${font.fontSize1};
  line-height: 1.7;
  color: ${colors.white};
  text-align: center;
  margin: 0;
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

const App = () => {
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
    <>
      <GlobalStyles />
      <Main cursor={chromaticAberration ? "crosshair" : "auto"}>
        <Container>
          {React.cloneElement(Title)}
          <Spacer top={4}>
            <Content>
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
            </Content>
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
    </>
  );
};

export default App;
