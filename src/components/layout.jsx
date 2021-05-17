import React from "react";
import styled from "styled-components";

import SiteMetadata from "./site-metadata";
import colors from "../colors";
import constants from "../constants";
import font from "../fonts";
import Main from "./../components/main";
import NavigateLink from "./../components/navigate";
import { ResponsiveSpacer } from "./../components/spacer";
import { Row } from "./../components/taco";

const Navigate = styled(NavigateLink)`
  color: currentColor;
  font-size: ${font.fontSizeN1};
  font-weight: bold;
`;

const Root = styled.div`
  min-width: 100vw;
  min-height: 100vh;
  background-color: ${props => props.backgroundColor};
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

const DistributeResponsive = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-between;

  @media (max-width: ${constants.width}) {
    flex-direction: column;
    height: auto;
    align-items: center;
    justify-content: space-between;

    & > :not(:last-child) {
      margin-bottom: 16px;
    }
  }
`;

const ThemeToggle = () => {
  return <div/>
}

export default ({ children, pathname, kind = colors.white }) => {
  const { backgroundColor, color } = COLOR_TYPE[kind];

  return (
    <Root backgroundColor={backgroundColor}>
      <SiteMetadata pathname={pathname} />
      <Main>
        <header>
          <DistributeResponsive>
            <Logo to="/">@davesnx</Logo>
            <Row gap={3}>
              <MenuItem color={color}>
                <Navigate to="/about">about</Navigate>
              </MenuItem>
              <MenuItem color={color}>
                <Navigate to="/blog">blog</Navigate>
              </MenuItem>
              <MenuItem color={color}>
                <Navigate to="/talks">talks</Navigate>
              </MenuItem>
              <MenuItem color={color}>
                <Navigate to="/experiments">experiments</Navigate>
              </MenuItem>
              {/* <MenuItem color={color}>
                <Navigate to="/projects">projects</Navigate>
              </MenuItem>
              <MenuItem color={color}>
                <Navigate to="/experiments">experiments</Navigate>
              </MenuItem> */}
            </Row>
          </DistributeResponsive>
        </header>
      </Main>
      <ResponsiveSpacer mobileTop={3} desktopTop={6}>
        {children}
      </ResponsiveSpacer>
      <ThemeToggle />
    </Root>
  );
};
