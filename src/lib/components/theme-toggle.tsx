'use client';

import { css } from '@linaria/core';
import { useTheme } from 'next-themes';
import type { CSSProperties } from 'react';
import { useEffect, useId, useState } from 'react';

import { colors } from '@/theme/theme';

const buttonClass = css`
  color: var(--toggle-color, transparent);
  background: var(--toggle-background, transparent);
  border: none;
  padding: 0;
  cursor: pointer;
  border-radius: var(--toggle-radius, 50%);
  width: var(--toggle-width, 24px);
  height: var(--toggle-height, 24px);
  backdrop-filter: var(--toggle-backdrop, none);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: background-color 150ms ease, transform 120ms ease-out;

  &:hover {
    background: var(--toggle-hover-background, transparent);
  }

  &:active {
    transform: scale(0.96);
  }
`;

const svgClass = css`
  width: 100%;
  height: 100%;
  fill: ${colors.textProse};
  transition: transform 200ms ease-in-out;
  position: relative;
`;

const floatingIconClass = css`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 0;
  transition: transform 200ms ease;
`;

const iconSlotClass = css`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export function ThemeToggle({ floating = false, onToggle }: { floating?: boolean; onToggle?: () => void }) {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const maskId = useId();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === 'dark';
  const handleToggle = () => {
    setTheme(isDark ? 'light' : 'dark');
    onToggle?.();
  };

  const moonCx = isDark ? 10 : 30;
  const moonCy = isDark ? 2 : -10;
  const floatingLeft = isDark ? 28 : 4;

  const content = (
    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" viewBox="0 0 32 32" className={svgClass}>
      <mask id={maskId}>
        <rect x="0" y="0" width="32" height="32" fill="white" />
        <circle cx={moonCx} cy={moonCy} r="11" fill="black" />
      </mask>
      <circle cx="16" cy="16" r="14" mask={`url(#${maskId})`} />
    </svg>
  );

  return (
    <button
      type="button"
      className={buttonClass}
      aria-label={mounted ? `Switch to ${isDark ? 'light' : 'dark'} theme` : 'Toggle theme'}
      onClick={handleToggle}
      style={
        {
          '--toggle-color': floating ? colors.textPrimary : 'transparent',
          '--toggle-background': floating ? colors.backgroundTertiary : 'transparent',
          '--toggle-radius': floating ? '24px' : '50%',
          '--toggle-width': floating ? '48px' : '24px',
          '--toggle-height': '24px',
          '--toggle-backdrop': floating ? 'blur(5px)' : 'none',
          '--toggle-hover-background': floating ? colors.borderSubtle : colors.backgroundTertiary,
        } as CSSProperties
      }
    >
      {floating ? (
        <span
          className={floatingIconClass}
          style={{
            transform: `translateX(${floatingLeft}px)`,
            width: 16,
            height: 16,
            visibility: mounted ? 'visible' : 'hidden',
          }}
        >
          {content}
        </span>
      ) : (
        <span className={iconSlotClass} style={{ visibility: mounted ? 'visible' : 'hidden' }}>
          {content}
        </span>
      )}
    </button>
  );
}
