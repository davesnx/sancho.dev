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
  font-size: ${font.fontSize4};
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

const SHOW_CASES = {
  chromatic: "CHROMATIC",
  font: "FONT"
};

const SquaredMain = styled.div`
  flex-direction: row;
`;

const Character = styled.span`
  width: 75px;
  font-size: 45px;
  text-transform: uppercase;
  font-family: "Inter";
  font-variation-settings: "wght" ${props => props.wght};

  display: flex;
  border: 1px dashed white;
  justify-content: center;
  align-items: center;

  & + & {
    border-left: none;
  }
`;

const Letter = ({ children }) => {
  return <Character wght="100">{children}</Character>;
};

const Squared = ({ text, x }) => {
  const ref = React.useRef(null);
  const firstElementPosition =
    ref.current && ref.current.getBoundingClientRect().x;
  const letters = text.split("");

  const steps = Math.floor(1000 / letters.length);
  const charPosition = steps * letters.length + firstElementPosition;
  return (
    <SquaredMain ref={ref}>
      {letters.map((char, idx) => {
        return (
          <Letter wght="100" key={idx}>
            {char}
          </Letter>
        );
      })}
    </SquaredMain>
  );
};

const App = () => {
  const [show, setShow] = React.useState(SHOW_CASES.font);

  const mouse = useMousePosition();
  const orientation = useDeviceOrientation();

  const isChromaticAberrationEnabled = SHOW_CASES.chromatic === show;

  let Title = <H1>David Sancho</H1>;

  switch (show) {
    case SHOW_CASES.chromatic:
      Title = (
        <ChromaticText mouse={mouse} orientation={orientation}>
          <H1>David Sancho</H1>
        </ChromaticText>
      );
      break;
    case SHOW_CASES.font:
      Title = <Squared x={mouse.x} text="David Sancho" />;
      break;
    default:
      Title = <H1>David Sancho</H1>;
  }

  return (
    <>
      <GlobalStyles />
      <Main cursor={isChromaticAberrationEnabled ? "crosshair" : "auto"}>
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
          <ChromaticButton
            enabled={isChromaticAberrationEnabled}
            onClick={() => setShow(SHOW_CASES.chromatic)}
          >
            Enable chromatic aberration
          </ChromaticButton>
        </FloatingBottom>
      </Main>
    </>
  );
};

export default App;
