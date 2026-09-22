import { css } from '@linaria/core';
import type { AnchorHTMLAttributes, ReactNode } from 'react';

import { ButtonLink, cx } from '@/components/ui';
import { colors } from '@/theme/theme';

const iconClass = css`
  object-fit: cover;
  border-radius: 4px;
  width: 1em;
  height: 1em;
  vertical-align: middle;
  margin-top: -3px;
  margin-left: 5px;
  padding: 1px;
  filter: grayscale(1);
  transition: filter 150ms ease;
`;

const iconTextLinkClass = css`
  display: inline;
  white-space: nowrap;
  padding: 1px 5px 1px 6px;
  margin: 0 -2px;
  text-decoration-line: none;
  background: ${colors.backgroundPrimary};
  transition: background 150ms ease;

  &:hover,
  &:focus-visible {
    background: ${colors.backgroundPill};
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
      {children}
      <img className={iconClass} src={icon} alt="" width={20} height={20} decoding="async" />
    </ButtonLink>
  );
}
