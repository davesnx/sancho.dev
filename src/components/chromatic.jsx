import React from "react";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";
import { window } from "browser-monads";

import Spacer from "./spacer";
import colors from "./colors";
import font from "./fonts";

const Overlap = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  & > *:not(:first-child) {
    position: absolute;
  }
`;

const Swing = ({ color, translateX, translateY, children, blur = 0 }) => {
  const { xy } = useSpring({
    from: { xy: [0, 0] },
    xy: [translateX, translateY],
  });

  return (
    <animated.div
      style={{
        mixBlendMode: "screen",
        filter: `blur(${blur}px)`,
        color: `${color}`,
        transform: xy.interpolate((x, y) => `translate3d(${x}px, ${y}px, 0px)`),
      }}
    >
      {children}
    </animated.div>
  );
};

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

export const Text = ({ children, mouse, orientation }) => {
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

const Circle = styled.div`
  width: 30px;
  height: 30px;
  background-color: ${props => props.color};
  transition: all 150ms ease;
  border-radius: 50%;
`;

const ButtonWrapper = styled.div`
  cursor: pointer;
  flex-direction: row;

  border-width: 2px;
  border-style: solid;
  padding: 0.8rem 1.2rem;
  border-radius: 4px;
  background-color: ${colors.white};
  color: ${colors.black};
  font-family: '${font.sans}';

  user-select: none;

  @media only screen and (max-width: 600px) {
    justify-content: center;
  }
`;

const ButtonLabel = styled.p`
  color: inherit;
  margin: 0;
  width: min-content;
`;

const OverlapWrapper = styled.div`
  width: 60px;
  padding: 0 0.8rem;

  display: flex;
  justify-content: center;
  align-items: center;

  background: ${colors.black};
  border-radius: 4px;
`;

export const Button = ({ enabled, onClick }) => {
  const derivation = enabled ? 8 : 0;
  const toggleStatus = enabled ? "Disable" : "Enable";

  return (
    <ButtonWrapper onClick={onClick}>
      <OverlapWrapper>
        <Overlap>
          <Swing translateY={-1 * derivation} translateX={0}>
            <Circle color={colors.G} />
          </Swing>
          <Swing translateY={derivation} translateX={-1 * derivation}>
            <Circle color={colors.R} />
          </Swing>
          <Swing translateY={derivation} translateX={derivation}>
            <Circle color={colors.B} />
          </Swing>
        </Overlap>
      </OverlapWrapper>
      <Spacer left={2}>
        <ButtonLabel>
          <strong>{toggleStatus}</strong> Chromatic Aberration
        </ButtonLabel>
      </Spacer>
    </ButtonWrapper>
  );
};
