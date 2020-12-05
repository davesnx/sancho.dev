import React from "react";
import styled from "styled-components";
import { Link as Navigate } from "gatsby";

import SiteMetadata from "./site-metadata";
import colors from "./colors";
import font from "./fonts";
import Main from "./../components/main";
import { RelativeSpacer } from "./../components/spacer";
import { isMobile } from "./../utils/helpers";
import { Distribute, Stack } from "./../components/taco";

const NavigateStyled = styled(Navigate)`
  text-decoration: none;
  font-size: ${font.fontSizeN1};
  color: currentColor;
`;

const Root = styled.div`
  min-width: 100vw;
  min-height: 100vh;
  background-color: ${props => props.backgroundColor};
`;

const Menu = styled.ul`
  padding: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  list-style: none;
`;

const MenuItem = styled.li`
  font-size: ${font.fontSize0};
  font-family: ${font.sans};
  font-weight: bold;
  text-transform: uppercase;
  display: inline-flex;
  letter-spacing: 1.5px;

  color: ${props => props.color};
`;

const Logo = styled(Navigate)`
  font-weight: bold;
  font-size: ${font.fontSize0};
  font-family: ${font.sans};
  line-height: 1.7;
  margin: 0;
  text-decoration: none;

  color: ${colors.paleBlue};
  transition: color 0.15s ease;

  &:hover {
    color: ${colors.blue};
  }
`;

const COLOR_TYPE = {
  [colors.white]: {
    backgroundColor: colors.white,
    color: colors.black,
  },
  [colors.black]: {
    backgroundColor: colors.black,
    color: colors.white,
  },
};

export default ({ children, pathname, kind = colors.white }) => {
  const { backgroundColor, color } = COLOR_TYPE[kind];

  return (
    <Root backgroundColor={backgroundColor}>
      <SiteMetadata pathname={pathname} />
      <Main>
        <header>
          <Distribute
            gap={2}
            direction={isMobile() ? "vertical" : "horitzontal"}
            distribute="between"
          >
            <Logo to="/">@davesnx</Logo>
            <Stack gap={3}>
              <MenuItem color={color}>
                <NavigateStyled to="/blog">blog</NavigateStyled>
              </MenuItem>
              <MenuItem color={color}>
                <NavigateStyled to="/experiments">experiments</NavigateStyled>
              </MenuItem>
              <MenuItem color={color}>
                <NavigateStyled to="/about">about</NavigateStyled>
              </MenuItem>
            </Stack>
          </Distribute>
        </header>
      </Main>
      <RelativeSpacer top={isMobile() ? 6 : 12}>{children}</RelativeSpacer>
    </Root>
  );
};
