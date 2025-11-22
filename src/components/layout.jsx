import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import React from "react";
import dynamic from "next/dynamic";
import { createPortal } from "react-dom";
import { useTheme } from "next-themes";
import { animated, useSpring } from "react-spring";

import { TextLink } from "../components/link";
import Text from "../components/text";
import Spacer from "../components/spacer";
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
  user-select: none;
  font-size: ${font.fontSize0};
  font-family: ${font.sans};
  font-weight: 800;
  text-transform: uppercase;
  display: inline-flex;
  letter-spacing: 2px;
  color: ${colors.body90};

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

const Svg = styled.svg`
  width: 100%;
  height: 100%;
  fill: ${(props) => (props.isDark ? colors.primary80 : colors.body80)};
  transition: transform 200ms ease-in-out;
  position: relative;
`;

const IconWrapper = styled(animated.div)`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
`;

const ThemeTogglerButton = styled.button`
  color: ${(props) => (props.floating ? colors.body : "transparent")};
  background: ${(props) => (props.floating ? colors.body10 : "transparent")};
  border: none;
  padding: 0;
  cursor: pointer;
  border-radius: ${(props) => (props.floating ? "24px" : "50%")};

  width: ${(props) => (props.floating ? "48px" : "24px")};
  height: ${(props) => (props.floating ? "24px" : "24px")};

  backdrop-filter: ${(props) => (props.floating ? "blur(5px)" : "none")};
  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;
  transition: all 0.2s ease;

  &:hover {
    background: ${(props) => (props.floating ? colors.body20 : "transparent")};
  }
`;

const HeaderOuter = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  position: relative;
  margin-top: 32px;
`;

const HeaderInner = styled.div`
  width: 100%;
  max-width: ${constants.desktop.width}px;
  margin: 0 auto;
  padding: 0 32px;
  display: flex;
  align-items: center;

  @media screen and (max-width: ${constants.mobile.width}px) {
    padding: 0 24px;
  }
`;

const DesktopSwitcherWrapper = styled.div`
  position: absolute;
  right: 16px;
  display: none;

  @media screen and (min-width: ${constants.desktop.width + 120}px) {
    display: block;
  }
`;

const ThemeTogglerComponent = ({ isDark, onClick, floating }) => {
  const { cx, cy } = useSpring({
    from: {
      cx: isDark ? 10 : 30,
      cy: isDark ? 2 : -10,
    },
    cx: isDark ? 10 : 30,
    cy: isDark ? 2 : -10,
    config: { tension: 400, friction: 30 },
  });

  const { x } = useSpring({
    from: {
      x: floating ? (isDark ? 28 : 4) : 0,
    },
    x: floating ? (isDark ? 28 : 4) : 0,
    config: { tension: 300, friction: 20, clamp: true },
  });

  const content = (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      isDark={isDark}
      viewBox="0 0 32 32"
    >
      <mask id="theme-toggle-mask">
        <rect x="0" y="0" width="32" height="32" fill="white" />
        <animated.circle cx={cx} cy={cy} r="11" fill="black" />
      </mask>
      <circle cx="16" cy="16" r="14" mask="url(#theme-toggle-mask)" />
    </Svg>
  );

  return (
    <ThemeTogglerButton
      onClick={onClick}
      aria-label="Toggle theme"
      floating={floating}
    >
      {floating ? (
        <IconWrapper style={{ left: x, width: 16, height: 16 }}>
          {content}
        </IconWrapper>
      ) : (
        content
      )}
    </ThemeTogglerButton>
  );
};

const ThemeToggler = dynamic(() => Promise.resolve(ThemeTogglerComponent), {
  ssr: false,
});

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
  display: flex;
  align-items: center;
  justify-content: center;

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
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");
  const isDark = theme === "dark";
  let open = () => setIsOpen(true);
  let close = () => setIsOpen(false);

  const { scale, opacity } = useSpring({
    scale: isOpen ? 1 : 0.8,
    opacity: isOpen ? 1 : 0.5,
    config: { tension: 30, friction: 10, duration: 100 },
  });

  return (
    <Root>
      <HeaderOuter>
        <HeaderInner>
          <Row distribute="between" fullWidth>
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
                      <MobileMenuItem onClick={toggleTheme} href="#">
                        toggle theme
                        <Spacer left={2} />
                        <ThemeToggler isDark={isDark} onClick={toggleTheme} />
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
        </HeaderInner>
        <DesktopSwitcherWrapper>
          <ThemeToggler isDark={isDark} onClick={toggleTheme} floating />
        </DesktopSwitcherWrapper>
      </HeaderOuter>
      <Spacer bottom={6} />
      <Children>
        <ResponsiveSpacer mobileTop={2} desktopTop={6}>
          {children}
        </ResponsiveSpacer>
      </Children>
      <Main>
        <Spacer top={4} bottom={6}>
          <Footer>
            <div>
              <Text color={colors.body30} weight={600} size={font.fontSizeN2}>
                David Sancho (
                <TextLink
                  weight={600}
                  color={colors.body30}
                  hoverColor={colors.body50}
                  href="https://x.com/davesnx"
                >{`@davesnx`}</TextLink>
                )
              </Text>
            </div>
            <div>


<Text weight={600} size={font.fontSizeN2}>
                <TextLink
                  weight={600}
                  color={colors.body30}
                  hoverColor={colors.body50}
                  href="https://github.com/davesnx/sancho.dev"
                >{`Source`}</TextLink>
              </Text>
            </div>
          </Footer>
        </Spacer>
      </Main>

    </Root>
  );
}
