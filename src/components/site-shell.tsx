"use client";

import type { ReactNode } from "react";
import { useState } from "react";

import { css } from "@linaria/core";

import breakpoints from "../theme/constants";
import fonts from "../theme/fonts";
import { colors } from "../theme/theme";
import { ButtonLink, ResponsiveSpacer, Row, Spacer, Stack, Text, TextLink } from "./ui";
import { ThemeToggle } from "./theme-toggle";

const rootClass = css`
  min-height: 100vh;
  background-color: ${colors.backgroundPrimary};
  display: flex;
  flex-direction: column;
`;

const headerOuterClass = css`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  margin-top: 32px;
`;

const headerInnerClass = css`
  width: 100%;
  max-width: ${breakpoints.desktop.width}px;
  margin: 0 auto;
  padding: 0 32px;
  display: flex;
  align-items: center;

  @media screen and (max-width: ${breakpoints.mobile.width}px) {
    padding: 0 24px;
  }
`;

const menuItemClass = css`
  user-select: none;
  font-size: ${fonts.fontSize0};
  font-family: ${fonts.sans};
  font-weight: 800;
  text-transform: uppercase;
  display: inline-flex;
  letter-spacing: 2px;
  color: ${colors.textProse};

  &:hover {
    color: ${colors.textAccent};
  }
`;

const desktopMenuClass = css`
  display: none;

  @media screen and (min-width: ${breakpoints.mobile.width}px) {
    display: block;
  }
`;

const mobileMenuRootClass = css`
  display: none;

  @media screen and (max-width: ${breakpoints.mobile.width}px) {
    display: block;
  }
`;

const desktopSwitcherClass = css`
  position: absolute;
  right: 16px;
  display: none;

  @media screen and (min-width: ${breakpoints.desktop.width + 120}px) {
    display: flex;
  }
`;

const mobileMenuOverlayClass = css`
  position: fixed;
  inset: 0;
  background-color: ${colors.backgroundSecondary};
  filter: blur(4px);
  opacity: 0.9;
  display: flex;
  justify-content: center;
  height: 100%;
  width: 100%;
  animation: fadeIn 250ms ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }

    to {
      opacity: 0.9;
    }
  }
`;

const mobileMenuPopupClass = css`
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  margin: 10%;
  margin-top: 20%;
  background-color: ${colors.backgroundPrimary};
  border-radius: 12px;
  transition: ease 300ms;
  padding: 1rem 0;
`;

const mobileMenuItemClass = css`
  padding: 20px 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const iconClass = css`
  width: 30px;
  height: 30px;
  display: grid;
  align-items: center;
  cursor: pointer;
`;

const barClass = css`
  width: 100%;
  height: 3px;
  background-color: ${colors.textAccent};
  display: block;
`;

const logoClass = css`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.textPrimary};
  transition: color 0.15s ease;

  &:hover {
    color: ${colors.textAccent};
  }
`;

const childrenClass = css`
  flex: 1;
`;

const footerClass = css`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const footerMainClass = css`
  width: 100%;
  max-width: ${breakpoints.desktop.width}px;
  padding: 0 32px;
  margin: 0 auto;

  @media (max-width: ${breakpoints.mobile.width}px) {
    padding: 0 24px;
  }
`;

const navItems = [
  { href: "/blog", label: "blog" },
  { href: "/work", label: "work" },
  { href: "/talks", label: "talks" },
  { href: "/about", label: "about" },
];

const House = () => (
  <div className={logoClass}>
    <svg viewBox="0 0 24 24" aria-hidden="true" style={{ fill: "currentColor", width: 18, height: 18 }}>
      <path d="M21.591 7.146L12.52 1.157c-.316-.21-.724-.21-1.04 0l-9.071 5.99c-.26.173-.409.456-.409.757v13.183c0 .502.418.913.929.913H9.14c.51 0 .929-.41.929-.913v-7.075h3.909v7.075c0 .502.417.913.928.913h6.165c.511 0 .929-.41.929-.913V7.904c0-.301-.158-.584-.408-.758z" />
    </svg>
  </div>
);

const Hamburger = ({ onClick }: { onClick: () => void }) => (
  <span
    className={iconClass}
    aria-label="menu"
    role="button"
    tabIndex={0}
    aria-haspopup="menu"
    aria-expanded="true"
    onClick={onClick}
    onKeyDown={(event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        onClick();
      }
    }}
  >
    <span className={barClass} />
    <span className={barClass} />
  </span>
);

export function SiteShell({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={rootClass}>
      <div className={headerOuterClass}>
        <div className={headerInnerClass}>
          <Row justify="between" fullWidth>
            <ButtonLink href="/">
              <House />
            </ButtonLink>
            <div className={desktopMenuClass}>
              <Row gap={4}>
                {navItems.map((item) => (
                  <ButtonLink key={item.href} href={item.href} className={menuItemClass}>
                    {item.label}
                  </ButtonLink>
                ))}
              </Row>
            </div>
            <div className={mobileMenuRootClass}>
              {isOpen ? (
                <>
                  <div className={mobileMenuOverlayClass} onClick={() => setIsOpen(false)} />
                  <div className={mobileMenuPopupClass} style={{ transform: "scale(1)", opacity: 1 }}>
                    <Stack gap={0}>
                      <ButtonLink href="/" className={`${menuItemClass} ${mobileMenuItemClass}`} onClick={() => setIsOpen(false)}>
                        home
                      </ButtonLink>
                      {navItems.map((item) => (
                        <ButtonLink key={item.href} href={item.href} className={`${menuItemClass} ${mobileMenuItemClass}`} onClick={() => setIsOpen(false)}>
                          {item.label}
                        </ButtonLink>
                      ))}
                      <button
                        type="button"
                        className={`${menuItemClass} ${mobileMenuItemClass}`}
                        style={{ background: "transparent", border: "none" }}
                      >
                        toggle theme
                        <Spacer left={2} />
                        <ThemeToggle />
                      </button>
                    </Stack>
                  </div>
                  <Hamburger onClick={() => setIsOpen(false)} />
                </>
              ) : (
                <Hamburger onClick={() => setIsOpen(true)} />
              )}
            </div>
          </Row>
        </div>
        <div className={desktopSwitcherClass}>
          <ThemeToggle floating />
        </div>
      </div>
      <Spacer bottom={6} />
      <div className={childrenClass}>
        <ResponsiveSpacer mobileTop={2} desktopTop={6}>
          {children}
        </ResponsiveSpacer>
      </div>
      <main className={footerMainClass}>
        <Spacer top={4} bottom={6}>
          <footer className={footerClass}>
            <div>
              <Text color={colors.textTertiary} weight={600} size={fonts.fontSizeN2} monospace>
                David Sancho (
                <TextLink
                  href="https://x.com/davesnx"
                  weight={600}
                  color={colors.textTertiary}
                  hoverColor={colors.textSecondary}
                  monospace
                >
                  @davesnx
                </TextLink>
                )
              </Text>
            </div>
            <div>
              <Text weight={600} size={fonts.fontSizeN2} monospace color={colors.textTertiary}>
                <TextLink
                  href="https://github.com/davesnx/sancho.dev"
                  weight={600}
                  color={colors.textTertiary}
                  hoverColor={colors.textSecondary}
                  monospace
                >
                  Source
                </TextLink>
              </Text>
            </div>
          </footer>
        </Spacer>
      </main>
    </div>
  );
}
