'use client';

import { css } from '@linaria/core';
import { usePathname } from 'next/navigation';
import type { KeyboardEvent, ReactNode, RefObject } from 'react';
import { useEffect, useId, useRef, useState } from 'react';
import { ThemeToggle } from '@/components/theme-toggle';
import { ButtonLink, ResponsiveSpacer, Row, Spacer, Stack, Text, TextLink } from '@/components/ui';
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
  font-weight: 700;
  text-transform: uppercase;
  display: inline-flex;
  letter-spacing: 2px;
  color: ${colors.textProse};
  min-height: 44px;
  align-items: center;

  &:hover {
    color: ${colors.textAccent};
  }

  &:active {
    transform: scale(0.98);
  }
`;

const currentMenuItemClass = css`
  color: ${colors.textAccent};
`;

const desktopMenuClass = css`
  display: none;

  @media screen and (min-width: ${breakpoints.mobile.width + 1}px) {
    display: block;
  }
`;

const mobileMenuRootClass = css`
  display: none;

  @media screen and (max-width: ${breakpoints.mobile.width}px) {
    display: block;
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
  width: 44px;
  height: 44px;
  display: grid;
  align-items: center;
  gap: 8px;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
`;

const barClass = css`
  width: 32px;
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
  width: 44px;
  height: 44px;
  margin-left: -13px;

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
  { href: '/about', label: 'about' },
];

const House = () => (
  <div className={logoClass}>
    <svg viewBox="0 0 24 24" aria-hidden="true" style={{ fill: 'currentColor', width: 18, height: 18 }}>
      <path d="M21.591 7.146L12.52 1.157c-.316-.21-.724-.21-1.04 0l-9.071 5.99c-.26.173-.409.456-.409.757v13.183c0 .502.418.913.929.913H9.14c.51 0 .929-.41.929-.913v-7.075h3.909v7.075c0 .502.417.913.928.913h6.165c.511 0 .929-.41.929-.913V7.904c0-.301-.158-.584-.408-.758z" />
    </svg>
  </div>
);

const Hamburger = ({
  isOpen,
  menuId,
  buttonRef,
  onClick,
}: {
  isOpen: boolean;
  menuId: string;
  buttonRef: RefObject<HTMLButtonElement | null>;
  onClick: () => void;
}) => (
  <button
    ref={buttonRef}
    type="button"
    className={iconClass}
    aria-label={isOpen ? 'Close menu' : 'Open menu'}
    aria-controls={menuId}
    aria-haspopup="dialog"
    aria-expanded={isOpen}
    onClick={onClick}
  >
    <span className={barClass} />
    <span className={barClass} />
  </button>
);

export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const menuId = useId();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';
    menuRef.current?.querySelector<HTMLElement>('a, button')?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      menuButtonRef.current?.focus();
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);
  const isCurrent = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

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

    const firstItem = focusableItems[0];
    const lastItem = focusableItems.at(-1);
    if (!firstItem || !lastItem) return;

    if (event.shiftKey && document.activeElement === firstItem) {
      event.preventDefault();
      lastItem.focus();
    } else if (!event.shiftKey && document.activeElement === lastItem) {
      event.preventDefault();
      firstItem.focus();
    }
  };

  return (
    <div className={rootClass} data-site-root>
      <div className={headerOuterClass} data-site-header>
        <div className={headerInnerClass}>
          <Row justify="between" fullWidth>
            <ButtonLink
              href="/"
              aria-label="Home"
              aria-hidden={isOpen ? true : undefined}
              tabIndex={isOpen ? -1 : undefined}
              className={homeLinkClass}
            >
              <House />
            </ButtonLink>
            <div className={desktopMenuClass}>
              <Row gap={4}>
                {navItems.map((item) => (
                  <ButtonLink
                    key={item.href}
                    href={item.href}
                    className={`${menuItemClass} ${isCurrent(item.href) ? currentMenuItemClass : ''}`}
                    aria-current={isCurrent(item.href) ? 'page' : undefined}
                  >
                    {item.label}
                  </ButtonLink>
                ))}
                <ThemeToggle />
              </Row>
            </div>
            <div className={mobileMenuRootClass}>
              {isOpen ? (
                <>
                  <button
                    type="button"
                    className={mobileMenuOverlayClass}
                    aria-hidden="true"
                    tabIndex={-1}
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
                          className={`${menuItemClass} ${mobileMenuItemClass} ${isCurrent(item.href) ? currentMenuItemClass : ''}`}
                          aria-current={isCurrent(item.href) ? 'page' : undefined}
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
                </>
              ) : null}
              <Hamburger
                isOpen={isOpen}
                menuId={menuId}
                buttonRef={menuButtonRef}
                onClick={isOpen ? closeMenu : () => setIsOpen(true)}
              />
            </div>
          </Row>
        </div>
      </div>
      <Spacer bottom={6} />
      <main className={childrenClass} id="main-content" inert={isOpen ? true : undefined}>
        <ResponsiveSpacer mobileTop={2} desktopTop={6}>
          {children}
        </ResponsiveSpacer>
      </main>
      <footer className={footerMainClass} data-site-footer inert={isOpen ? true : undefined}>
        <Spacer top={4} bottom={6}>
          <div className={footerClass}>
            <div>
              <Text color={colors.textMuted} weight={600} size={fonts.fontSizeN2} monospace>
                David Sancho (
                <TextLink
                  href="https://x.com/davesnx"
                  weight={600}
                  color={colors.textMuted}
                  hoverColor={colors.textPrimary}
                  monospace
                >
                  @davesnx
                </TextLink>
                )
              </Text>
            </div>
            <Row gap={2}>
              <Text weight={600} size={fonts.fontSizeN2} monospace color={colors.textMuted}>
                <TextLink
                  href="/credits"
                  weight={600}
                  color={colors.textMuted}
                  hoverColor={colors.textPrimary}
                  monospace
                >
                  Credits
                </TextLink>
              </Text>
              <Text weight={600} size={fonts.fontSizeN2} monospace color={colors.textMuted}>
                <TextLink
                  href="https://github.com/davesnx/sancho.dev"
                  weight={600}
                  color={colors.textMuted}
                  hoverColor={colors.textPrimary}
                  monospace
                >
                  Source
                </TextLink>
              </Text>
            </Row>
          </div>
        </Spacer>
      </footer>
    </div>
  );
}
