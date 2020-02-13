import React from "react";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";

import useMousePosition from "./mouse-position";
import useDeviceOrientation from "./device-orientation";
import Spacer from "./spacer";
import colors from "./colors";

const color = {
  R: "#FF211B",
  G: "#17E620",
  B: "#003AEC",
  raw: {
    R: "#FF0000",
    G: "#00FF00",
    B: "#0000FF"
  }
};

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
    xy: [translateX, translateY]
  });

  return (
    <animated.div
      style={{
        mixBlendMode: "screen",
        filter: `blur(${blur}px)`,
        color: `${color}`,
        transform: xy.interpolate((x, y) => `translate3d(${x}px, ${y}px, 0px)`)
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
    color: `${props.color}`
  }
}))`
  mix-blend-mode: screen;
`;

const isTouchDevice = "ontouchstart" in window || navigator.msMaxTouchPoints;

export const Text = ({
  children,
  mouse = useMousePosition(),
  orientation = useDeviceOrientation()
}) => {
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
      <Layer blur={pita / 2} color={color.G}>
        {children}
      </Layer>
      <Layer
        translateY={translateY}
        translateX={translateX}
        blur={pita}
        color={color.R}
      >
        {children}
      </Layer>
      <Layer
        translateY={-translateY}
        translateX={-translateX}
        blur={pita}
        color={color.B}
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
  padding: 10px 20px;
  border-radius: 4px;
  background-color: ${colors.white};
  color: ${colors.black};

  user-select: none;
`;

const ButtonLabel = styled.p`
  color: inherit;
  margin: 0;
  width: min-content;
`;

const OverlapWrapper = styled.div`
  width: 60px;
  padding: 0 10px;

  display: flex;
  justify-content: center;
  align-items: center;

  background: #222222;
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
            <Circle color={color.G} />
          </Swing>
          <Swing translateY={derivation} translateX={-1 * derivation}>
            <Circle color={color.R} />
          </Swing>
          <Swing translateY={derivation} translateX={derivation}>
            <Circle color={color.B} />
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
