import React from "react";
import styled from "styled-components";
import { window } from "browser-monads";

import colors from "../../colors";
import font from "../../fonts";
import Layout from "../../components/layout";
import Overlap from "../../components/overlap";
import Text from "../../components/text";
import Spacer from "../../components/spacer";
import { Link } from "../../components/link";
import { RelativeSpacer } from "../../components/spacer";
import useDeviceOrientation from "../../utils/device-orientation";
import useMousePosition from "../../utils/mouse-position";
import { useIsMobile } from "../../utils/media-query";

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

const ChromaticText = ({ children, mouse, orientation }) => {
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
  font-size: ${props => (props.isMobile ? font.fontSize3 : font.fontSize5)};
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

  flex: 1;
  cursor: crosshair;
`;

export default () => {
  const mouse = useMousePosition();
  const orientation = useDeviceOrientation();
  const isMobile = useIsMobile();

  return (
    <Layout kind={colors.black}>
      <RelativeSpacer top={8}>
        <Container>
          <ChromaticText mouse={mouse} orientation={orientation}>
            <Name as="h1" isMobile={isMobile}>
              DAVID SANCHO
            </Name>
          </ChromaticText>
          <Spacer top={4}>
            <Text align="center" color={colors.white}>
              {isMobile
                ? "Incline the phone to see the "
                : "Move the mouse across the screen to see the "}
              <Link
                target="_blank"
                rel="noopener noreferer"
                href="https://en.wikipedia.org/wiki/Chromatic_aberration"
              >
                Chromatic Distortion effect
              </Link>
            </Text>
          </Spacer>
        </Container>
      </RelativeSpacer>
    </Layout>
  );
};
