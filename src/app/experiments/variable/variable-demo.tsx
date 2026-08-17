'use client';

import { css } from '@linaria/core';
import { useRef } from 'react';
import { TextLink } from '@/components/ui';
import useMedia from '@/media-query';
import usePointerPosition from '@/mouse-position';
import { colors } from '@/theme/theme';

const headingClass = css`
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 100%;
  margin: 0;
`;

const characterClass = css`
  width: clamp(24px, 6vw, 64px);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${colors.textPrimary};
  font-family: var(--font-display), Inter, sans-serif;
  font-size: clamp(1.5rem, 4vw, 3rem);
  line-height: 1;
  text-transform: uppercase;
  transition: font-variation-settings 160ms ease-out;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const containerClass = css`
  min-height: 55vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  cursor: ew-resize;
`;

const instructionClass = css`
  max-width: 36rem;
  margin: 2rem 0 0;
  color: ${colors.textPrimary};
  text-align: center;
`;

const clamp = (value: number, minimum: number, maximum: number) => Math.min(maximum, Math.max(minimum, value));

function VariableHeading({
  text,
  pointerX,
  reducedMotion,
}: {
  text: string;
  pointerX: number | null;
  reducedMotion: boolean;
}) {
  const characterRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const characters = [...text];

  return (
    <h1 className={headingClass}>
      {characters.map((character, index) => {
        const bounds = characterRefs.current[index]?.getBoundingClientRect();
        const center = bounds ? bounds.left + bounds.width / 2 : null;
        const distance = pointerX !== null && center !== null ? Math.abs(pointerX - center) : 100;
        const weight = reducedMotion ? 550 : clamp(700 - distance * 1.5, 400, 700);

        return (
          <span
            key={`${text.slice(0, index)}-${character}`}
            ref={(element) => {
              characterRefs.current[index] = element;
            }}
            className={characterClass}
            style={{ fontVariationSettings: `"wght" ${Math.round(weight)}` }}
          >
            {character === ' ' ? '\u00a0' : character}
          </span>
        );
      })}
    </h1>
  );
}

export function VariableDemo() {
  const pointer = usePointerPosition();
  const coarsePointer = useMedia('(pointer: coarse)');
  const reducedMotion = useMedia('(prefers-reduced-motion: reduce)');
  const instruction = reducedMotion
    ? 'Reduced motion is enabled, so the font weight stays still.'
    : coarsePointer
      ? 'Tap or drag horizontally across the name to change the font weight.'
      : 'Move the pointer horizontally across the name to change the font weight.';

  return (
    <div className={containerClass}>
      <VariableHeading text="David Sancho" pointerX={pointer.x} reducedMotion={reducedMotion} />
      <p className={instructionClass} aria-live="polite">
        {instruction} Explore more <TextLink href="https://v-fonts.com">variable fonts</TextLink>.
      </p>
    </div>
  );
}
