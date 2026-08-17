import { css } from '@linaria/core';
import type { ReactNode } from 'react';
import { Text, TextLink } from '@/components/ui';
import fonts from '@/theme/fonts';
import { colors } from '@/theme/theme';

export const profileListClass = css`
  width: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
  border-top: 1px solid ${colors.borderSubtle};
`;
const itemClass = css`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid ${colors.borderSubtle};
  break-inside: avoid;
  @media (max-width: 599px) { grid-template-columns: 1fr; gap: 0.25rem; }
`;
const contentClass = css`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;
const metaClass = css`
  white-space: nowrap;
  color: ${colors.textMuted};
  font-family: ${fonts.mono};
  font-size: ${fonts.fontSizeN2};
  font-weight: 600;
`;
const detailListClass = css`
  margin: 0.5rem 0 0;
  padding-left: 1.25rem;
  color: ${colors.textProse};
`;

export function ProfileEntry({
  title,
  href,
  description,
  meta,
  details = [],
}: {
  title: string;
  href?: string;
  description: ReactNode;
  meta: string;
  details?: string[];
}) {
  return (
    <li className={itemClass}>
      <div className={contentClass}>
        {href ? (
          <TextLink href={href} weight={700} color={colors.textAccent}>
            {title}
          </TextLink>
        ) : (
          <Text weight={700} color={colors.textAccent}>
            {title}
          </Text>
        )}
        <Text size={fonts.fontSizeN1} color={colors.textProse}>
          {description}
        </Text>
        {details.length ? (
          <ul className={detailListClass}>
            {details.map((detail) => (
              <li key={detail}>{detail}</li>
            ))}
          </ul>
        ) : null}
      </div>
      <span className={metaClass}>{meta}</span>
    </li>
  );
}
