import React from "react";
import styled from "@emotion/styled";

import Layout from "../../components/layout";
import { colors } from "../../theme/theme";
import Spacer from "../../components/spacer";
import { TextLink } from "../../components/link";
import Text from "../../components/text";
import { Character } from "../../components/character";
import useMousePosition from "../../utils/mouse-position";
import { useIsMobile } from "../../utils/media-query";

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const charSize = 75;
const middle = charSize / 2;

const Squared = ({ isMobile, text, x: mousePosition }) => {
  const ref = React.useRef(null);
  const firstElementPosition =
    ref.current && ref.current.getBoundingClientRect().left + middle;
  const letters = text.split("");

  return (
    <Row ref={ref}>
      {letters.map((char, idx) => {
        let weight =
          1000 - Math.abs(mousePosition - firstElementPosition - 75 * idx);
        return (
          <Character key={idx} wght={weight} isMobile={isMobile}>
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

let Variable = () => {
  const mouse = useMousePosition();
  const isMobile = useIsMobile();
  return (
    <Layout>
      <Container>
        <Squared x={mouse.x} text="David Sancho" />
        <Spacer top={4}>
          <Text align="center" color={colors.body}>
            {isMobile
              ? "Tap into the name to see the "
              : "Move the mouse in the y axis to see the "}
            <TextLink href="https://v-fonts.com">Variable font weight</TextLink>{" "}
            effect
          </Text>
        </Spacer>
      </Container>
    </Layout>
  );
};

export default Variable;
