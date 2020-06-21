import React from "react";
import styled from "styled-components";
import SiteMetadata from "./site-metadata";
import colors from "./colors";
import font from "./fonts";
import Main from "./../components/main";
import Spacer from "./../components/spacer";
import { Link as Navigate } from "gatsby";
import { isMobile } from "react-device-detect";

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

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  flex-direction: ${isMobile ? "column" : "row"};
`;

const MenuWrapper = styled.div``;

const Menu = styled.ul`
  padding: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  list-style: none;
`;

const MenuItem = styled.li`
  margin-left: 24px;

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
        <Spacer top={4}>
          <Header>
            <Logo to="/">@davesnx</Logo>
            <MenuWrapper>
              <Menu>
                <MenuItem color={color}>
                  <NavigateStyled to="/blog">blog</NavigateStyled>
                </MenuItem>
                <MenuItem color={color}>
                  <NavigateStyled to="/experiments">experiments</NavigateStyled>
                </MenuItem>
                <MenuItem color={color}>
                  <NavigateStyled to="/">about</NavigateStyled>
                </MenuItem>
              </Menu>
            </MenuWrapper>
          </Header>
        </Spacer>
      </Main>
      {children}
    </Root>
  );
};
