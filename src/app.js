import React, { useEffect, useLayoutEffect, useRef, Fragment } from "react";
import styled from "@emotion/styled";
import { Global, css } from "@emotion/core";
import useMousePosition from "./mouse-position.js";
import useElementPosition from "./bounding-rect.js";

const Main = styled.div`
  width: 100vw;
  height: 100vh;
  background: #333739;
`;

const Text = styled.p`
  color: ${props => props.color};
  font-size: 45px;
  margin: 0;
  mix-blend-mode: screen;
  filter: blur(${props => props.blur}px);

  transform: translate(
    ${props => props.translateX}px,
    ${props => props.translateY}px
  );
`;

const Flex = styled.div`
  position: relative;
  width: 100%;
  margin: 0 auto;
`;

const Overlap = styled.div`
  width: 100%;

  & > * {
    position: absolute;
    text-align: center;
  }
`;

const Cromatic = ({ children, x, y }) => {
  const ref = useRef(null);

  const { width, height } = useElementPosition(ref);

  const w = window.innerWidth;
  const h = window.innerHeight;
  const translateX = ((x - w / 2) / w) * 7;
  const translateY = ((y - h / 2) / h) * 7;
  const pita = Math.sqrt(Math.pow(translateX, 2) + Math.pow(translateY, 2));

  return (
    <Overlap ref={ref}>
      <Text
        translateY={translateY}
        translateX={translateX}
        blur={pita / 5}
        color="rgb(255, 0, 0)"
      >
        {children}
      </Text>
      <Text blur={pita / 10} color="rgb(0, 255, 0)">
        {children}
      </Text>
      <Text
        translateY={-translateY}
        translateX={-translateX}
        blur={pita / 5}
        color="rgb(0, 0, 255)"
      >
        {children}
      </Text>
    </Overlap>
  );
};

const App = () => {
  const { x, y } = useMousePosition();
  return (
    <Fragment>
      <Global
        styles={css`
          html,
          body {
            margin: 0;
            padding: 0;
          }
        `}
      />
      <Main>
        <Flex>
          <Cromatic x={x} y={y}>
            David Sancho
          </Cromatic>
        </Flex>
      </Main>
    </Fragment>
  );
};

export default App;
