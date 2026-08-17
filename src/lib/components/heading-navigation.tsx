import { css } from '@linaria/core';
import { TextLink } from '@/components/ui';
import type { BlogHeading } from '@/posts';
import breakpoints from '@/theme/constants';
import fonts from '@/theme/fonts';
import { colors } from '@/theme/theme';

const rootClass = css`
  max-width: 72ch;
  margin: 0 0 4rem;
  padding: 1rem 0;
  border-top: 1px solid ${colors.borderSubtle};
  border-bottom: 1px solid ${colors.borderSubtle};

  @media screen and (max-width: ${breakpoints.mobile.width}px) { display: none; }
`;
const titleClass = css`
  display: block;
  margin-bottom: 0.75rem;
  color: ${colors.textMuted};
  font-family: ${fonts.mono};
  font-size: ${fonts.fontSizeN2};
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
`;
const listClass = css`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin: 0;
  padding: 0;
  list-style: none;
`;
const nestedListClass = css`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin: 0.4rem 0 0;
  padding-left: 1.5rem;
  list-style: none;
`;
const linkClass = css`
  display: inline;
  color: ${colors.textProse};
  font-size: ${fonts.fontSizeN1};
`;

type HeadingItem = { heading: BlogHeading; children: BlogHeading[] };
const groupHeadings = (headings: BlogHeading[]) => {
  const items: HeadingItem[] = [];
  for (const heading of headings) {
    const previous = items.at(-1);
    if (heading.level === 3 && previous?.heading.level === 2) previous.children.push(heading);
    else items.push({ heading, children: [] });
  }
  return items;
};

export function HeadingNavigation({ headings }: { headings: BlogHeading[] }) {
  if (headings.length < 3) return null;
  return (
    <nav className={rootClass} aria-label="On this page">
      <span className={titleClass}>On this page</span>
      <ol className={listClass}>
        {groupHeadings(headings).map(({ heading, children }) => (
          <li key={heading.id}>
            <TextLink href={`#${heading.id}`} className={linkClass}>
              {heading.text}
            </TextLink>
            {children.length ? (
              <ol className={nestedListClass}>
                {children.map((child) => (
                  <li key={child.id}>
                    <TextLink href={`#${child.id}`} className={linkClass}>
                      {child.text}
                    </TextLink>
                  </li>
                ))}
              </ol>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
