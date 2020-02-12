import React, { Fragment, useState } from "react";
import styled from "styled-components";

import GlobalStyles from "./global-styles.jsx";
import Spacer from "./spacer.jsx";
import reasonLogo from "./images/reason.png";
import { Text as ChromaticText, Button as ChromaticButton } from "./chromatic";
import colors from "./colors";

const H1 = styled.h1`
  font-size: 3rem;
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
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  margin-top: -15vh;
  max-width: 50rem;
  padding: 0 5rem;
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
  font-size: 1rem;
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
  font-size: 1.45rem;
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
`;

const App = () => {
  const [chromaticAberration, setChromaaticAberration] = useState(true);

  const clickHandler = () => {
    setChromaaticAberration(isEnabled => !isEnabled);
  };

  return (
    <Fragment>
      <GlobalStyles />
      <Main>
        <Container>
          <ChromaticText enabled={chromaticAberration}>
            <H1>David Sancho</H1>
          </ChromaticText>
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
              , previously{" "}
              <Link
                target="_blank"
                rel="noreferrer noopener"
                href="https://www.typeform.com"
              >
                Typeform
              </Link>{" "}
              at core experience. Passionate about design, functional
              programming, scalability, people and business.
              <ReasonML>
                ReasonML
                <Logo src={reasonLogo} />
              </ReasonML>
              . Amateur triathlete{" "}
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
    </Fragment>
  );
};

export default App;
