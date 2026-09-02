'use client';

import type { KeyboardEvent, ReactNode } from 'react';
import { useEffect, useId, useRef, useState } from 'react';

import { css } from '@linaria/core';

import { ButtonLink, ResponsiveSpacer, Row, Spacer, Stack, Text, TextLink } from '@/components/ui';
import { ThemeToggle } from '@/components/theme-toggle';
import breakpoints from '@/theme/constants';
import fonts from '@/theme/fonts';
import { colors } from '@/theme/theme';

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
  font-weight: 600;
  text-transform: uppercase;
  display: inline-flex;
  letter-spacing: 2px;
  color: ${colors.textProse};
  min-height: 32px;
  align-items: center;

  &:hover {
    color: ${colors.textAccent};
  }

  &:active {
    transform: scale(0.98);
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
  padding: 0;
  border: 0;
  background-color: ${colors.backgroundSecondary};
  opacity: 0.86;
  display: flex;
  justify-content: center;
  height: 100%;
  width: 100%;
  z-index: 10;
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
  z-index: 11;
  top: 0;
  left: 0;
  right: 0;
  margin: 10%;
  margin-top: 20%;
  background-color: ${colors.backgroundPrimary};
  border-radius: 12px;
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
  width: 32px;
  height: 32px;
  display: grid;
  align-items: center;
  gap: 8px;
  padding: 0;
  border: 0;
  background: transparent;
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

const homeLinkClass = css`
  justify-content: center;
  align-items: center;
  display: inline-flex;
  padding: 8px;
  margin-left: -8px;

  &:active {
    transform: scale(0.98);
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

const visuallyHiddenClass = css`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

const navItems = [
  { href: '/blog', label: 'blog' },
  { href: '/work', label: 'work' },
  { href: '/talks', label: 'talks' },
  { href: '/about', label: 'about' },
];

const House = () => (
  <div className={logoClass}>
    <svg viewBox="0 0 24 24" aria-hidden="true" style={{ fill: 'currentColor', width: 18, height: 18 }}>
      <path d="M21.591 7.146L12.52 1.157c-.316-.21-.724-.21-1.04 0l-9.071 5.99c-.26.173-.409.456-.409.757v13.183c0 .502.418.913.929.913H9.14c.51 0 .929-.41.929-.913v-7.075h3.909v7.075c0 .502.417.913.928.913h6.165c.511 0 .929-.41.929-.913V7.904c0-.301-.158-.584-.408-.758z" />
    </svg>
  </div>
);

const Hamburger = ({ isOpen, menuId, onClick }: { isOpen: boolean; menuId: string; onClick: () => void }) => (
  <button
    type="button"
    className={iconClass}
    aria-label={isOpen ? 'Close menu' : 'Open menu'}
    aria-controls={menuId}
    aria-haspopup="menu"
    aria-expanded={isOpen}
    onClick={onClick}
  >
    <span className={barClass} />
    <span className={barClass} />
  </button>
);

export function SiteShell({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuId = useId();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previousActiveElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';
    menuRef.current?.querySelector<HTMLElement>('a, button')?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      previousActiveElement?.focus();
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  const handleMenuKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      closeMenu();
      return;
    }

    if (event.key !== 'Tab' || !menuRef.current) return;

    const focusableItems = Array.from(menuRef.current.querySelectorAll<HTMLElement>('a, button')).filter(
      (item) => !item.hasAttribute('disabled'),
    );
    if (focusableItems.length === 0) return;

    const firstItem = focusableItems[0]!;
    const lastItem = focusableItems[focusableItems.length - 1]!;

    if (event.shiftKey && document.activeElement === firstItem) {
      event.preventDefault();
      lastItem.focus();
    } else if (!event.shiftKey && document.activeElement === lastItem) {
      event.preventDefault();
      firstItem.focus();
    }
  };

  return (
    <div className={rootClass}>
      <div className={headerOuterClass}>
        <div className={headerInnerClass}>
          <Row justify="between" fullWidth>
            <ButtonLink href="/" aria-label="Home" className={homeLinkClass}>
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
                  <button
                    type="button"
                    className={mobileMenuOverlayClass}
                    aria-label="Close menu"
                    onClick={closeMenu}
                  />
                  <div
                    id={menuId}
                    className={mobileMenuPopupClass}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby={`${menuId}-title`}
                    ref={menuRef}
                    onKeyDown={handleMenuKeyDown}
                  >
                    <div id={`${menuId}-title`} className={visuallyHiddenClass}>
                      Navigation menu
                    </div>
                    <Stack gap={0}>
                      <ButtonLink href="/" className={`${menuItemClass} ${mobileMenuItemClass}`} onClick={closeMenu}>
                        home
                      </ButtonLink>
                      {navItems.map((item) => (
                        <ButtonLink
                          key={item.href}
                          href={item.href}
                          className={`${menuItemClass} ${mobileMenuItemClass}`}
                          onClick={closeMenu}
                        >
                          {item.label}
                        </ButtonLink>
                      ))}
                      <div className={`${menuItemClass} ${mobileMenuItemClass}`}>
                        toggle theme
                        <Spacer left={2} />
                        <ThemeToggle onToggle={closeMenu} />
                      </div>
                    </Stack>
                  </div>
                  <Hamburger isOpen menuId={menuId} onClick={closeMenu} />
                </>
              ) : (
                <Hamburger isOpen={false} menuId={menuId} onClick={() => setIsOpen(true)} />
              )}
            </div>
          </Row>
        </div>
        <div className={desktopSwitcherClass}>
          <ThemeToggle floating />
        </div>
      </div>
      <Spacer bottom={6} />
      <main className={childrenClass} id="main-content">
        <ResponsiveSpacer mobileTop={2} desktopTop={6}>
          {children}
        </ResponsiveSpacer>
      </main>
      <footer className={footerMainClass}>
        <Spacer top={4} bottom={6}>
          <div className={footerClass}>
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
          </div>
        </Spacer>
      </footer>
    </div>
  );
}
