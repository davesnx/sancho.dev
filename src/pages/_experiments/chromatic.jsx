import styled from "@emotion/styled";
import { window } from "browser-monads-ts";
import React from "react";

import Layout from "../../components/layout";
import { TextLink } from "../../components/link";
import Overlap from "../../components/overlap";
import Spacer from "../../components/spacer";
import { RelativeSpacer } from "../../components/spacer";
import Text from "../../components/text";
import font from "../../theme/fonts";
import { colors } from "../../theme/theme";
import useDeviceOrientation from "../../utils/device-orientation";
import { useIsMobile } from "../../utils/media-query";
import useMousePosition from "../../utils/mouse-position";

const Layer = styled.div((props) => ({
  style: {
    transform: `
          translate(
            ${props.translateX}px,
            ${props.translateY}px
          )`,
    filter: `blur(${(props) => props.blur}px)`,
    color: props.color,
    mixBlendMode: "screen",
  },
}));

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
    const x = Math.abs(translateX ** 2);
    const y = Math.abs(translateY ** 2);
    pita = Math.sqrt(x + y) / 10;
  } else {
    translateX = distanceX / 100;
    translateY = distanceY / 100;
    pita = Math.sqrt(translateX ** 2 + translateY ** 2) / 10;
  }

  if (!ref.current) {
    translateX = 0.22;
    translateY = 4.25;
    pita = 0.4;
  }

  return (
    <Overlap ref={ref}>
      <Layer blur={pita / 2} color={colors.g}>
        {children}
      </Layer>
      <Layer
        translateY={translateY}
        translateX={translateX}
        blur={pita}
        color={colors.r}
      >
        {children}
      </Layer>
      <Layer
        translateY={-translateY}
        translateX={-translateX}
        blur={pita}
        color={colors.b}
      >
        {children}
      </Layer>
    </Overlap>
  );
};

const Name = styled.h1`
  font-size: ${(props) => (props.isMobile ? font.fontSize3 : font.fontSize5)};
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

const Chromatic = () => {
  const mouse = useMousePosition();
  const orientation = useDeviceOrientation();
  const isMobile = useIsMobile();

  return (
    <Layout>
      <RelativeSpacer top={8}>
        <Container>
          <ChromaticText mouse={mouse} orientation={orientation}>
            <Name as="h1" isMobile={isMobile}>
              DAVID SANCHO
            </Name>
          </ChromaticText>
          <Spacer top={4}>
            <Text align="center" color={colors.body}>
              {isMobile
                ? "Incline the phone to see the "
                : "Move the mouse across the screen to see the "}
              <TextLink href="https://en.wikipedia.org/wiki/Chromatic_aberration">
                Chromatic Distortion effect
              </TextLink>
            </Text>
          </Spacer>
        </Container>
      </RelativeSpacer>
    </Layout>
  );
};

export default Chromatic;
