import type { AnchorHTMLAttributes, ReactNode } from 'react';

import { css } from '@linaria/core';

import { ButtonLink, cx } from '@/components/ui';
import { colors } from '@/theme/theme';

const iconClass = css`
  object-fit: cover;
  border-radius: 4px;
  width: 1em;
  height: 1em;
  vertical-align: middle;
  margin-top: -3px;
  margin-right: 3px;
  padding: 1px;
  filter: grayscale(1);
  transition: filter 150ms ease;
`;

const iconTextLinkClass = css`
  display: inline;
  white-space: nowrap;
  border-radius: 4px;
  padding: 0px 4px;
  text-decoration-line: none;
  background: ${colors.backgroundPill};
  transition: background 150ms ease;

  &:hover,
  &:focus-visible {
    background: ${colors.backgroundPillHover};
  }

  &:hover .${iconClass},
  &:focus-visible .${iconClass} {
    filter: grayscale(0);
  }
`;

export function IconTextLink({
  href,
  icon,
  children,
  className,
  ...props
}: Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'color'> & {
  href: string;
  icon: string;
  children?: ReactNode;
}) {
  return (
    <ButtonLink href={href} className={cx(iconTextLinkClass, className)} {...props}>
      <img className={iconClass} src={icon} alt="" width={20} height={20} decoding="async" />
      {children}
    </ButtonLink>
  );
}
