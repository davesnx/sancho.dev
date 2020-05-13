import React from "react";
import { Helmet } from "react-helmet";
import { Link as Navigate } from "gatsby";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";

import Page from "../components/page";
import Spacer from "../components/spacer";
/* import Text from "../components/text"; */
import Overlap from "../components/overlap";
import { H1 } from "../components/heading";
import colors from "../components/colors";
import font from "../components/fonts";

function useHover() {
  const [value, setValue] = React.useState(false);

  const ref = React.useRef(null);

  const handleMouseOver = () => setValue(true);
  const handleMouseOut = () => setValue(false);

  React.useEffect(
    () => {
      const node = ref.current;
      if (node) {
        node.addEventListener("mouseover", handleMouseOver);
        node.addEventListener("mouseout", handleMouseOut);

        return () => {
          node.removeEventListener("mouseover", handleMouseOver);
          node.removeEventListener("mouseout", handleMouseOut);
        };
      }
    },
    [ref] // Recall only if ref changes
  );

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
  background-color: ${props => props.color};
  transition: all 150ms ease;
  border-radius: 50%;
`;

const ButtonWrapper = styled(Navigate)`
  display: flex;
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
  text-decoration: none;

  @media only screen and (max-width: 600px) {
    justify-content: center;
  }
`;

const ButtonLabel = styled.p`
  font-weight: 500;
  color: inherit;
  margin: 0;
  width: min-content;
`;

const OverlapWrapper = styled.div`
  width: 60px;
  height: 60px;
  padding: 0 0.8rem;

  display: flex;
  justify-content: center;
  align-items: center;

  background: ${colors.black};
  border-radius: 4px;
`;

const Align = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Button = ({ to, enabled }) => {
  const [hoverRef, isHovered] = useHover();
  const derivation = isHovered ? 0 : 8;

  return (
    <ButtonWrapper ref={hoverRef} to={to}>
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
        <Align>
          <ButtonLabel>Chromatic Aberration</ButtonLabel>
        </Align>
      </Spacer>
    </ButtonWrapper>
  );
};

const Grid = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
`;

export default ({ data }) => {
  const {
    site: {
      siteMetadata: { siteUrl, description, title },
    },
  } = data;

  return (
    <>
      <Helmet defaultTitle={title} titleTemplate={`%s | ${title}`}>
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:type" content="website" />
      </Helmet>

      <Page title={<H1 raw>Experiments</H1>}>
        <Grid>
          <Button to="experiments/chromatic" />
          <Button to="experiments/variable" />
        </Grid>
      </Page>
    </>
  );
};

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
