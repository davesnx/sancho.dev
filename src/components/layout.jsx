import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import React from "react";
import { animated, useSpring } from "react-spring";

import { TextLink } from "../components/link";
import Text from "../components/text";
import constants from "../theme/constants";
import font from "../theme/fonts";
import { colors } from "../theme/theme";
import { NavigateButton } from "./../components/link";
import Main from "./../components/main";
import { ResponsiveSpacer } from "./../components/spacer";
import { Row, Stack } from "./../components/taco";

const Root = styled.div`
  min-height: 100vh;
  background-color: ${colors.contrast};
  display: flex;
  flex-direction: column;
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

const Logo = styled.div`
  color: ${colors.body};
  transition: color 0.15s ease;

  &:hover {
    color: ${colors.primary};
  }
`;

const House = () => {
  return (
    <Logo>
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        style={{ fill: "currentColor", width: "18px", height: "18px" }}
      >
        <g>
          <path d="M21.591 7.146L12.52 1.157c-.316-.21-.724-.21-1.04 0l-9.071 5.99c-.26.173-.409.456-.409.757v13.183c0 .502.418.913.929.913H9.14c.51 0 .929-.41.929-.913v-7.075h3.909v7.075c0 .502.417.913.928.913h6.165c.511 0 .929-.41.929-.913V7.904c0-.301-.158-.584-.408-.758z"></path>
        </g>
      </svg>
    </Logo>
  );
};

const Footer = styled.footer`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const Children = styled.div`
  flex: 1;
`;

export default function Layout({ children }) {
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
      <Main>
        <Header>
          <Row distribute="between">
            <NavigateButton href="/">
              <House />
            </NavigateButton>
            <DesktopMenu key="desktop">
              <Row gap={4}>
                <MenuItem href="/blog">blog</MenuItem>
                <MenuItem href="/work">work</MenuItem>
                <MenuItem href="/talks">talks</MenuItem>
                <MenuItem href="/about">about</MenuItem>
              </Row>
            </DesktopMenu>
            <MobileMenu key="mobile">
              {isOpen ? (
                <>
                  <MobileMenuOverlay onClick={close} />
                  <MobileMenuPopup
                    style={{
                      transform: scale.interpolate((s) => `scale(${s})`),
                      opacity: opacity.interpolate((o) => o),
                    }}
                  >
                    <Stack gap={0}>
                      <MobileMenuItem onClick={close} href="/">
                        home
                      </MobileMenuItem>
                      <MobileMenuItem onClick={close} href="/blog">
                        blog
                      </MobileMenuItem>
                      <MobileMenuItem onClick={close} href="/work">
                        work
                      </MobileMenuItem>
                      <MobileMenuItem onClick={close} href="/talks">
                        talks
                      </MobileMenuItem>
                      <MobileMenuItem onClick={close} href="/about">
                        about
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
      <Children>
        <ResponsiveSpacer mobileTop={2} desktopTop={6}>
          {children}
        </ResponsiveSpacer>
      </Children>
      <Main>
        <Footer>
          <Text weight={400} size={font.fontSizeN1}>
            <TextLink
              color={colors.subtle}
              href="https://x.com/davesnx"
            >{`@davesnx`}</TextLink>
          </Text>
          <Text weight={400} size={font.fontSizeN1}>
            <TextLink
              color={colors.subtle}
              href="https://github.com/davesnx/sancho.dev"
            >{`Source`}</TextLink>
          </Text>
        </Footer>
      </Main>
    </Root>
  );
}
