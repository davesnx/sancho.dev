import React from "react";
import styled from "styled-components";

import Layout from "../../components/layout";
import colors from "../../components/colors";
import Main from "../../components/main";
import { RelativeSpacer } from "../../components/spacer";
import useMousePosition from "../../components/mouse-position";
import useDeviceOrientation from "../../components/device-orientation";

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

  width: 80vw;
  max-width: 50rem;
  height: 100%;

  cursor: ew-resize;
`;

export default () => {
  const mouse = useMousePosition();

  return (
    <Layout backgroundColor={colors.black}>
      <Main>
        <RelativeSpacer top={24}>
          <Container>
            <Squared x={mouse.x} text="DavidSancho" />
          </Container>
        </RelativeSpacer>
      </Main>
    </Layout>
  );
};
