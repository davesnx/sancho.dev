'use client';

import { useState } from 'react';

import { css } from '@linaria/core';

import { cx, Spacer, Text } from '@/components/ui';
import type { GitHubRepo } from '@/github';
import { getLanguageColor } from '@/github';
import constants from '@/theme/constants';
import fonts from '@/theme/fonts';
import { colors } from '@/theme/theme';

const galleryClass = css`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  @media screen and (max-width: ${constants.mobile.width}px) {
    grid-template-columns: 1fr;
  }
`;

const orgAvatarClass = css`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  flex-shrink: 0;
  filter: grayscale(1);
  transition: filter 150ms ease;
`;

const openSourceItemClass = css`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  width: 100%;
  cursor: pointer;
  text-decoration: none;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid ${colors.borderStrong};
  background-color: ${colors.backgroundSecondary};
  transition: background-color 150ms ease, transform 120ms ease-out;

  &:hover {
    background-color: ${colors.backgroundTertiary};
  }

  &:active {
    transform: scale(0.99);
  }

  &:hover .repo-avatar {
    filter: grayscale(0);
  }

  &:hover .repo-accent {
    filter: grayscale(0) !important;
  }
`;

const repoHeaderClass = css`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const repoFooterClass = css`
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: space-between;
  margin-top: auto;
`;

const statItemClass = css`
  display: inline-grid;
  grid-auto-flow: column;
  align-items: baseline;
  gap: 0.375rem;

  & > svg {
    position: relative;
    top: 1px;
  }
`;

const peekWrapperClass = css`
  position: relative;
  margin-top: 1rem; /* matches the grid gap so the two grids read as one */
`;

const peekClass = css`
  pointer-events: none;
`;

const peekFadeClass = css`
  position: absolute;
  /* Starts above the peek row so the last visible row already begins to fade. */
  top: -3rem;
  right: 0;
  bottom: 0;
  left: 0;
  pointer-events: none;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    color-mix(in srgb, ${colors.backgroundPrimary} 35%, transparent) 30%,
    color-mix(in srgb, ${colors.backgroundPrimary} 75%, transparent) 60%,
    ${colors.backgroundPrimary} 100%
  );
`;

const showMoreButtonClass = css`
  display: block;
  margin: 1.5rem auto 0;
  padding: 0.25rem 0.5rem;
  border: 0;
  background: none;
  cursor: pointer;
  font-family: ${fonts.mono};
  font-size: ${fonts.fontSize0};
  color: ${colors.textPrimary};
  transition: color 150ms ease;

  &:hover {
    color: ${colors.textAccent};
  }
`;

const peekButtonClass = css`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
  padding: 0.375rem 0.875rem;
`;

const LanguageDot = ({ color }: { color: string }) => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    className="repo-accent"
    style={{ filter: 'grayscale(1)', transition: 'filter 150ms ease' }}
  >
    <circle cx="6" cy="6" r="6" fill={color} />
  </svg>
);

const StarIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="#f1c40f"
    className="repo-accent"
    style={{ filter: 'grayscale(1)', transition: 'filter 150ms ease' }}
  >
    <path d="M12 1.75C12.311 1.75 12.5898 1.94201 12.7007 2.23263L15.0587 8.41234L21.5366 8.72913C21.8418 8.74406 22.1074 8.94263 22.2081 9.23111C22.3088 9.5196 22.2244 9.84032 21.9947 10.0419L17.0648 14.3695L18.8767 21.3106C18.9558 21.6135 18.8383 21.9338 18.5821 22.1137C18.3258 22.2937 17.9848 22.2956 17.7266 22.1183L12 18.1875L6.27335 22.1183C6.01519 22.2956 5.67409 22.2937 5.41785 22.1137C5.1616 21.9338 5.04413 21.6135 5.12323 21.3106L6.93517 14.3695L2.0052 10.0419C1.77557 9.84032 1.69118 9.5196 1.79186 9.23111C1.89253 8.94263 2.15815 8.74406 2.46334 8.72913L8.94127 8.41234L11.2992 2.23263C11.4101 1.94201 11.6889 1.75 12 1.75Z" />
  </svg>
);

const OpenSource = ({ repo, isPeek = false }: { repo: GitHubRepo; isPeek?: boolean }) => {
  const content = (
    <>
      <div className={repoHeaderClass}>
        <img className={`repo-avatar ${orgAvatarClass}`} src={repo.ownerAvatar} alt={repo.owner} />
        <Text weight={600} size={fonts.fontSize1} color={colors.textAccent}>
          {repo.name}
        </Text>
      </div>
      <Text size={fonts.fontSizeN1} color={colors.textPrimary}>
        {repo.description}
      </Text>
      <Spacer top={1} />
      <div className={repoFooterClass}>
        {repo.language ? (
          <div className={statItemClass}>
            <LanguageDot color={getLanguageColor(repo.language)} />
            <Text monospace weight={600} size={fonts.fontSize0} color={colors.textSecondary}>
              {repo.language}
            </Text>
          </div>
        ) : null}
        <div className={statItemClass}>
          <StarIcon />
          <Text monospace weight={600} size={fonts.fontSize0} color={colors.textSecondary}>
            {repo.stars.toLocaleString()}
          </Text>
        </div>
      </div>
    </>
  );

  // Peek cards preview hidden rows; they are decorative, so they are not links.
  if (isPeek) {
    return <div className={cx(openSourceItemClass, peekClass)}>{content}</div>;
  }

  return (
    <a className={openSourceItemClass} href={repo.url} target="_blank" rel="noopener noreferrer">
      {content}
    </a>
  );
};

export function RepoGallery({
  repos,
  initialCount = 6,
  peekCount = 2,
}: {
  repos: GitHubRepo[];
  initialCount?: number;
  peekCount?: number;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hiddenCount = repos.length - initialCount;
  const visibleRepos = isExpanded ? repos : repos.slice(0, initialCount);
  const peekRepos = isExpanded ? [] : repos.slice(initialCount, initialCount + peekCount);

  const button =
    hiddenCount > 0 ? (
      <button
        type="button"
        className={cx(showMoreButtonClass, !isExpanded && peekRepos.length > 0 && peekButtonClass)}
        aria-expanded={isExpanded}
        onClick={() => setIsExpanded((v) => !v)}
      >
        {isExpanded ? 'Show less' : `Show ${hiddenCount} more`}
      </button>
    ) : null;

  return (
    <div>
      <div className={galleryClass}>
        {visibleRepos.map((repo) => (
          <OpenSource key={repo.fullName} repo={repo} />
        ))}
      </div>
      {peekRepos.length > 0 ? (
        <div className={peekWrapperClass}>
          <div className={galleryClass} aria-hidden="true">
            {peekRepos.map((repo) => (
              <OpenSource key={repo.fullName} repo={repo} isPeek />
            ))}
          </div>
          <div className={peekFadeClass} aria-hidden="true" />
          {button}
        </div>
      ) : (
        button
      )}
    </div>
  );
}
