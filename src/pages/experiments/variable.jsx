import React from "react";
import styled from "styled-components";
import { window } from "browser-monads";

import Layout from "../../components/layout";
import Overlap from "../../components/overlap";
import colors from "../../components/colors";
import Main from "../../components/main";
import Text from "../../components/text";
import { RelativeSpacer } from "../../components/spacer";
import useMousePosition from "../../components/mouse-position";
import useDeviceOrientation from "../../components/device-orientation";

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
  color: ${colors.white};

  & + & {
    border-left: none;
  }
`;

const Row = styled.div`
  flex-direction: row;
`;

const Letter = ({ children, weight }) => (
  <Character wght={weight}>{children}</Character>
);

const charSize = 75;
const middle = charSize / 2;
const Squared = ({ text, x: mousePosition }) => {
  const ref = React.useRef(null);
  const firstElementPosition =
    ref.current && ref.current.getBoundingClientRect().left + middle;
  const letters = text.split("");

  const steps = Math.floor(1000 / letters.length);
  const charPosition = steps * letters.length + firstElementPosition;

  console.log("---");
  console.log("---");
  console.log("---");
  console.log(firstElementPosition);

  letters.forEach((l, index) => {
    console.log(
      l,
      mousePosition,
      Math.abs(1000 - (mousePosition - firstElementPosition + 75 * index))
    );
  });

  return (
    <Row ref={ref}>
      {letters.map((char, idx) => {
        return (
          <Letter
            key={idx}
            weight={Math.abs(mousePosition - firstElementPosition + 75 * idx)}
          >
            {char}
          </Letter>
        );
      })}
    </Row>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  width: 80vw;
  max-width: 50rem;
  height: 100%;
`;

export default () => {
  const mouse = useMousePosition();
  const orientation = useDeviceOrientation();

  return (
    <Layout backgroundColor={colors.black}>
      <Main>
        <RelativeSpacer top={24}>
          <Container>
            <Text mouse={mouse} orientation={orientation.absolute}>
              <Squared x={mouse.x} text="David Sancho" />;
            </Text>
          </Container>
        </RelativeSpacer>
      </Main>
    </Layout>
  );
};
