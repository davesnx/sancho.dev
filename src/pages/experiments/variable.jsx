import React from "react";
import styled from "styled-components";

import Layout from "../../components/layout";
import colors from "../../components/colors";
import useMousePosition from "../../components/mouse-position";
import { RelativeSpacer } from "../../components/spacer";
import Spacer from "../../components/spacer";
import Link from "../../components/link";
import Text from "../../components/text";

export const Character = styled.span.attrs(props => ({
  style: {
    fontVariationSettings: `"wght" ${props.wght}`,
  },
}))`
  width: 75px;
  font-size: 50px;
  text-transform: uppercase;
  font-family: "Inter";
  display: flex;
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

const charSize = 75;
const middle = charSize / 2;

const Squared = ({ text, x: mousePosition }) => {
  const ref = React.useRef(null);
  const firstElementPosition =
    ref.current && ref.current.getBoundingClientRect().left + middle;
  const letters = text.split("");

  return (
    <Row ref={ref}>
      {letters.map((char, idx) => {
        return (
          <Character
            key={idx}
            wght={
              1000 - Math.abs(mousePosition - firstElementPosition - 75 * idx)
            }
          >
            {char}
          </Character>
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

  flex: 1;
  cursor: ew-resize;
`;

export default () => {
  const mouse = useMousePosition();

  return (
    <Layout kind={colors.black}>
      <Container>
        <Squared x={mouse.x} text="David Sancho" />
      </Container>
      <Spacer bottom={4}>
        <Text raw align="center" color={colors.white}>
          Move the mouse in the y axis to see the{" "}
          <Link
            target="_blank"
            rel="noopener noreferer"
            href="https://en.wikipedia.org/wiki/Chromatic_aberration"
          >
            Variable font weight effect
          </Link>
        </Text>
      </Spacer>
    </Layout>
  );
};
