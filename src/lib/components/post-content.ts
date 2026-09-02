import { css } from '@linaria/core';

import breakpoints from '@/theme/constants';
import fonts from '@/theme/fonts';
import { colors } from '@/theme/theme';

export const postContentClass = css`
  color: ${colors.textProse};
  font-family: ${fonts.sans};
  width: 100%;

  & p {
    margin: 0 0 1.35rem;
    line-height: 1.75;
    text-wrap: pretty;
  }

  & h2,
  & h3,
  & h4 {
    color: ${colors.textAccent};
    line-height: 1.25;
    text-wrap: balance;
    scroll-margin-top: 2rem;
  }

  & h2 {
    margin: 3rem 0 1rem;
    font-size: ${fonts.fontSize4};
  }

  & h3 {
    margin: 2.25rem 0 0.75rem;
    font-size: ${fonts.fontSize3};
  }

  & h4 {
    margin: 2rem 0 0.5rem;
    font-size: ${fonts.fontSize2};
  }

  & ul,
  & ol {
    margin: 0 0 1.5rem;
    padding-left: 1.5rem;
  }

  & li {
    margin: 0.45rem 0;
    line-height: 1.7;
  }

  & li::marker {
    color: ${colors.textSecondary};
  }

  & blockquote {
    margin: 2rem 0;
    padding: 0.25rem 0 0.25rem 1.25rem;
    border-left: 3px solid ${colors.borderStrong};
    color: ${colors.textSecondary};
  }

  & blockquote p:last-child,
  & li p:last-child {
    margin-bottom: 0;
  }

  & img {
    display: block;
    height: auto;
    border-radius: 8px;
  }

  & a {
    text-underline-offset: 3px;
  }

  & code:not(pre code) {
    font-family: ${fonts.mono};
    white-space: normal;
    border-radius: 4px;
    padding: 3px 6px;
    margin: 0 2px;
    color: ${colors.textPrimary};
    background: ${colors.backgroundSecondary};
    font-size: 0.9em;
  }

  & p > code:first-of-type {
    margin-left: 0;
  }

  & code[data-theme*=" "] span {
    color: var(--shiki-dark);
    font-style: var(--shiki-dark-font-style);
    font-weight: var(--shiki-dark-font-weight);
    text-decoration: var(--shiki-dark-text-decoration);
  }

  html[data-theme="light"] & code[data-theme*=" "] span {
    color: var(--shiki-light);
    font-style: var(--shiki-light-font-style);
    font-weight: var(--shiki-light-font-weight);
    text-decoration: var(--shiki-light-text-decoration);
  }

  & [data-rehype-pretty-code-figure] {
    margin: 0.75rem 0 1.75rem;
  }

  & [data-rehype-pretty-code-figure] pre {
    display: grid;
    overflow: auto;
    padding: 2rem;
    margin: 0;
    border-radius: 6px;
    background: ${colors.backgroundSecondary};
    font-family: ${fonts.mono};
    line-height: 1.6;
    font-size: 0.92rem;
  }

  & [data-rehype-pretty-code-figure] code {
    display: grid;
  }

  & [data-line] {
    padding-left: 0.25rem;
    padding-right: 0.25rem;
  }

  & [data-highlighted-line] {
    background: ${colors.backgroundTertiary};
    margin-left: -0.75rem;
    margin-right: -0.75rem;
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    border-radius: 4px;
  }

  & [data-highlighted-chars] {
    background: ${colors.backgroundTertiary};
    border-radius: 4px;
    padding: 0.1rem 0.25rem;
  }

  & blockquote > code {
    background-color: ${colors.textAccent} !important;
  }

  @media (max-width: ${breakpoints.mobile.width}px) {
    & [data-rehype-pretty-code-figure] pre {
      padding: 1.25rem;
      font-size: 0.85rem;
    }
  }
`;
