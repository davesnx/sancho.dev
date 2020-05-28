import React from "react";
import styled from "styled-components";
import { window } from "browser-monads";

import Layout from "../../components/layout";
import Overlap from "../../components/overlap";
import colors from "../../components/colors";
import font from "../../components/fonts";
import useMousePosition from "../../components/mouse-position";
import useDeviceOrientation from "../../components/device-orientation";

const Layer = styled.div.attrs(props => ({
  style: {
    transform: `
          translate(
            ${props.translateX}px,
            ${props.translateY}px
          )`,
    filter: `blur(${props => props.blur}px)`,
    color: `${props.color}`,
  },
}))`
  mix-blend-mode: screen;
`;

const isTouchDevice =
  "ontouchstart" in window || window.navigator.msMaxTouchPoints;

const Text = ({ children, mouse, orientation }) => {
  const ref = React.useRef(null);
  const positionElLeft = ref.current && ref.current.offsetLeft;
  const positionElTop = ref.current && ref.current.offsetTop;
  const halfWidth = ref.current && ref.current.offsetWidth / 2;
  const halfHeight = ref.current && ref.current.offsetHeight / 2;

  const distanceX = mouse.x - positionElLeft - halfWidth;
  const distanceY = mouse.y - positionElTop - halfHeight;

  let translateX;
  let translateY;
  let pita;

  if (isTouchDevice) {
    translateX = orientation.gamma / 6;
    translateY = (orientation.beta - 30) / 6;
    const x = Math.abs(Math.pow(translateX, 2));
    const y = Math.abs(Math.pow(translateY, 2));
    pita = Math.sqrt(x + y) / 10;
  } else {
    translateX = distanceX / 100;
    translateY = distanceY / 100;
    pita = Math.sqrt(Math.pow(translateX, 2) + Math.pow(translateY, 2)) / 10;
  }

  if (!ref.current) {
    translateX = 0.22;
    translateY = 4.25;
    pita = 0.4;
  }

  return (
    <Overlap ref={ref}>
      <Layer blur={pita / 2} color={colors.G}>
        {children}
      </Layer>
      <Layer
        translateY={translateY}
        translateX={translateX}
        blur={pita}
        color={colors.R}
      >
        {children}
      </Layer>
      <Layer
        translateY={-translateY}
        translateX={-translateX}
        blur={pita}
        color={colors.B}
      >
        {children}
      </Layer>
    </Overlap>
  );
};

const Name = styled.h1`
  font-size: ${font.fontSize5};
  font-family: ${font.sans};
  font-weight: bold;
  margin: 0;
  letter-spacing: 10px;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  height: 100%;
`;

export default () => {
  const mouse = useMousePosition();
  const orientation = useDeviceOrientation();

  return (
    <Layout backgroundColor={colors.black}>
      <Container>
        <Text mouse={mouse} orientation={orientation}>
          <Name as="h1">DAVID SANCHO</Name>
        </Text>
      </Container>
    </Layout>
  );
};
