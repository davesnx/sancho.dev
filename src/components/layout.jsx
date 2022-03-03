import React from "react";
import styled from "styled-components";

import SiteMetadata from "./site-metadata";
import colors from "../colors";
/* import constants from "../constants"; */
import font from "../fonts";
import Main from "./../components/main";
import { NavigateButton } from "./../components/link";
import { ResponsiveSpacer } from "./../components/spacer";
import { Row, RowResponsive } from "./../components/taco";

const Root = styled.div`
  min-height: 100vh;
  background-color: ${props => props.backgroundColor};
`;

const MenuItem = styled.p`
  font-size: ${font.fontSize0};
  font-family: ${font.sans};
  font-weight: bold;
  text-transform: uppercase;
  display: inline-flex;
  letter-spacing: 1.5px;
  color: ${props => props.color};

  &:hover {
    color: ${colors.blue};
  }
`;

const Logo = styled.p`
  font-weight: bold;
  font-size: ${font.fontSize0};
  font-family: ${font.sans};
  line-height: 1.7;
  margin: 0;
  text-decoration: none;

  color: ${colors.blue};
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
          <RowResponsive>
            <NavigateButton to="/about">
              <Logo>@davesnx</Logo>
            </NavigateButton>
            <Row gap={3}>
              <NavigateButton to="/blog">
                <MenuItem color={color}>blog</MenuItem>
              </NavigateButton>

              <NavigateButton to="/talks">
                <MenuItem color={color}>talks</MenuItem>
              </NavigateButton>

              <NavigateButton to="/experiments">
                <MenuItem color={color}>experiments</MenuItem>
              </NavigateButton>
            </Row>
          </RowResponsive>
        </header>
      </Main>
      <ResponsiveSpacer mobileTop={3} desktopTop={6}>
        {children}
      </ResponsiveSpacer>
    </Root>
  );
};
