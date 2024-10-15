import styled from "@emotion/styled";
import React from "react";
import { animated, useSpring } from "react-spring";

import { Character } from "../../components/character";
import { H1 } from "../../components/heading";
import Overlap from "../../components/overlap";
import Page from "../../components/page";
import Spacer from "../../components/spacer";
import { rgb } from "../../theme/color";
import font from "../../theme/fonts";
import { colors } from "../../theme/theme";
function useHover() {
  const [value, setValue] = React.useState(false);

  const ref = React.useRef(null);

  const handleMouseOver = () => setValue(true);
  const handleMouseOut = () => setValue(false);

  React.useEffect(() => {
    const node = ref.current;
    if (node) {
      node.addEventListener("mouseover", handleMouseOver);
      node.addEventListener("mouseout", handleMouseOut);

      return () => {
        node.removeEventListener("mouseover", handleMouseOver);
        node.removeEventListener("mouseout", handleMouseOut);
      };
    }
  }, [ref]);

  return [ref, value];
}

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

const Circle = styled.div`
  width: 30px;
  height: 30px;
  background-color: ${(props) => props.color};
  transition: all 150ms ease;
  border-radius: 50%;
`;

const ButtonWrapper = styled.a`
  cursor: pointer;

  display: flex;
  align-items: center;
  flex-direction: row;

  border-width: 2px;
  border-style: solid;
  padding: 1rem 1.5rem;
  justify-content: space-evenly;
  border-radius: 4px;
  background-color: ${rgb(colors.contrast)};
  color: ${rgb(colors.body)};
  font-family: "${font.sans}";

  user-select: none;
  text-decoration: none;
`;

const ButtonLabel = styled.p`
  font-weight: 500;
  color: inherit;
  margin: 0;
  width: min-content;
  min-width: 100px;
`;

const OverlapWrapper = styled.div`
  width: 60px;
  height: 60px;
  padding: 0 0.8rem;

  display: flex;
  justify-content: center;
  align-items: center;

  background: ${rgb(colors.contrast)};
  border-radius: 4px;
`;

const Align = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const ChromaticButton = ({ href }) => {
  const [hoverRef, isHovered] = useHover();
  const derivation = isHovered ? 0 : 8;

  return (
    <ButtonWrapper ref={hoverRef} href={href}>
      <OverlapWrapper>
        <Overlap>
          <Swing translateY={-1 * derivation} translateX={0}>
            <Circle color={colors.g} />
          </Swing>
          <Swing translateY={derivation} translateX={-1 * derivation}>
            <Circle color={colors.r} />
          </Swing>
          <Swing translateY={derivation} translateX={derivation}>
            <Circle color={colors.b} />
          </Swing>
        </Overlap>
      </OverlapWrapper>
      <Spacer left={2}>
        <Align>
          <ButtonLabel>Chromatic Aberration</ButtonLabel>
        </Align>
      </Spacer>
    </ButtonWrapper>
  );
};

const VariableButton = ({ href }) => {
  const [hoverRef, isHovered] = useHover();
  const derivation = isHovered ? 500 : 200;

  return (
    <ButtonWrapper ref={hoverRef} href={href}>
      <OverlapWrapper>
        <Character wght={derivation}>A</Character>
      </OverlapWrapper>
      <Spacer left={2}>
        <Align>
          <ButtonLabel>Dynamic font weight</ButtonLabel>
        </Align>
      </Spacer>
    </ButtonWrapper>
  );
};

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 16px;
`;

let Experiments = () => {
  return (
    <>
      <Page title={<H1>Experiments</H1>}>
        <Grid>
          <ChromaticButton href="/experiments/chromatic" />
          <VariableButton href="/experiments/variable" />
        </Grid>
      </Page>
    </>
  );
};

export default Experiments;
