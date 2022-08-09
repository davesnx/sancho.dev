import React from "react";
import styled, { keyframes } from "styled-components";
import { useSpring, animated } from "react-spring";

import SiteMetadata from "./site-metadata";
import { colors } from "../theme";
import constants from "../constants";
import font from "../fonts";
import Main from "./../components/main";
import { NavigateButton } from "./../components/link";
import { ResponsiveSpacer } from "./../components/spacer";
import { Row, Stack } from "./../components/taco";

const Root = styled.div`
  min-height: 100vh;
  background-color: ${colors.contrast};
  padding-bottom: 3rem;
`;

const MenuItem = styled(NavigateButton)`
  font-size: ${font.fontSize0};
  font-family: ${font.sans};
  font-weight: 500;
  text-transform: uppercase;
  display: inline-flex;
  letter-spacing: 1.5px;
  color: ${colors.body};

  &:hover {
    color: ${colors.primary};
  }
`;

const Logo = styled.p`
  font-weight: 500;
  font-size: ${font.fontSize1};
  font-family: ${font.sans};
  margin: 0;
  text-decoration: none;

  color: ${colors.primary};
  transition: color 0.15s ease;

  &:hover {
    color: ${colors.primary};
  }
`;

const DesktopMenu = styled.div`
  display: none;

  @media screen and (min-width: ${constants.mobile.width}px) {
    display: block;
  }
`;

const MobileMenu = styled.div`
  display: none;

  @media screen and (max-width: ${constants.mobile.width}px) {
    display: block;
  }
`;

let fadeIn = keyframes`{
  from { opacity: 0; }
  to { opacity: 1; }
}`;

const MobileMenuOverlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${colors.overlay};
  filter: blur(4px);
  opacity: 0.9;
  display: flex;
  justify-content: center;
  height: 100%;
  width: 100%;
  animation: ${fadeIn} 250ms ease;
`;

const MobileMenuPopup = styled(animated.div)`
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  padding: 0;
  margin: 10%;
  margin-top: 20%;
  background-color: ${colors.contrast};
  border-radius: 12px;
  transition: ease 300ms;
  padding: 1rem 0;
`;

const Icon = styled.span`
  width: 30px;
  height: 30px;
  display: grid;
  align-items: center;
`;

const Bar = styled.span`
  width: 100%;
  height: 3px;
  background-color: ${colors.primary};
  display: block;
`;

const Header = styled.header`
  padding-top: 24px;
`;

const Hambuger = ({ onClick }) => {
  return (
    <Icon
      aria-label="menu"
      role="button"
      tabindex="0"
      aria-controls="w-nav-overlay-0"
      aria-haspopup="menu"
      aria-expanded="true"
      onClick={onClick}
    >
      <Bar />
      <Bar />
    </Icon>
  );
};

const MobileMenuItem = styled(MenuItem)`
  padding: 20px 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default ({ children, pathname }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  let open = () => setIsOpen(true);
  let close = () => setIsOpen(false);

  const { scale, opacity } = useSpring({
    scale: isOpen ? 1 : 0.8,
    opacity: isOpen ? 1 : 0.5,
    config: { tension: 30, friction: 10, duration: 100 },
  });

  return (
    <Root>
      <SiteMetadata pathname={pathname} />
      <Main>
        <Header>
          <Row distribute="between">
            <NavigateButton to="/">
              <Logo>@davesnx</Logo>
            </NavigateButton>
            <DesktopMenu key="desktop">
              <Row gap={4}>
                <MenuItem to="/blog">blog</MenuItem>
                <MenuItem to="/talks">talks</MenuItem>
                <MenuItem to="/about">about</MenuItem>
                <MenuItem to="/experiments">experiments</MenuItem>
              </Row>
            </DesktopMenu>
            <MobileMenu key="mobile">
              {isOpen ? (
                <>
                  <MobileMenuOverlay onClick={close} />
                  <MobileMenuPopup
                    style={{
                      transform: scale.interpolate(s => `scale(${s})`),
                      opacity: opacity.interpolate(o => o),
                    }}
                  >
                    <Stack gap={0}>
                      <MobileMenuItem onClick={close} to="/">
                        home
                      </MobileMenuItem>
                      <MobileMenuItem onClick={close} to="/blog">
                        blog
                      </MobileMenuItem>
                      <MobileMenuItem onClick={close} to="/talks">
                        talks
                      </MobileMenuItem>
                      <MobileMenuItem onClick={close} to="/about">
                        about
                      </MobileMenuItem>
                      <MobileMenuItem onClick={close} to="/experiments">
                        experiments
                      </MobileMenuItem>
                    </Stack>
                  </MobileMenuPopup>
                  <Hambuger onClick={open} />
                </>
              ) : (
                <Hambuger onClick={open} />
              )}
            </MobileMenu>
          </Row>
        </Header>
      </Main>
      <ResponsiveSpacer mobileTop={2} desktopTop={6}>
        {children}
      </ResponsiveSpacer>
    </Root>
  );
};
