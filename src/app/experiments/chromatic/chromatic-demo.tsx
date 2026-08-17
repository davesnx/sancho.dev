'use client';

import { css } from '@linaria/core';
import { useRef } from 'react';
import { TextLink } from '@/components/ui';
import useDeviceOrientation from '@/device-orientation';
import useMedia, { useIsMobile } from '@/media-query';
import usePointerPosition from '@/mouse-position';
import fonts from '@/theme/fonts';
import { colors } from '@/theme/theme';

const overlapClass = css`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  & > *:not(:first-child) { position: absolute; }
`;
const layerClass = css`mix-blend-mode: screen;`;
const nameClass = css`
  margin: 0;
  color: var(--layer-color);
  font-family: ${fonts.sans};
  font-size: var(--name-size);
  font-weight: 700;
  letter-spacing: 0.08em;
  text-align: center;
`;
const containerClass = css`
  min-height: 55vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  cursor: crosshair;
`;
const instructionClass = css`
  max-width: 36rem;
  margin: 2rem 0 0;
  color: ${colors.textPrimary};
  text-align: center;
`;
const permissionButtonClass = css`
  margin-top: 1rem;
  padding: 0.65rem 1rem;
  border: 1px solid ${colors.borderStrong};
  border-radius: 6px;
  background: ${colors.backgroundSecondary};
  color: ${colors.textPrimary};
  font-weight: 700;
  cursor: pointer;

  &:hover { background: ${colors.backgroundTertiary}; }
`;

type Position = { x: number | null; y: number | null };
type Orientation = { beta: number | null; gamma: number | null };

function ChromaticText({
  text,
  size,
  pointer,
  orientation,
  useOrientation,
  reducedMotion,
}: {
  text: string;
  size: string;
  pointer: Position;
  orientation: Orientation;
  useOrientation: boolean;
  reducedMotion: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  let x = 2;
  let y = 2;

  if (!reducedMotion && useOrientation && orientation.beta !== null && orientation.gamma !== null) {
    x = orientation.gamma / 6;
    y = (orientation.beta - 30) / 6;
  } else if (!reducedMotion && pointer.x !== null && pointer.y !== null && ref.current) {
    const bounds = ref.current.getBoundingClientRect();
    x = (pointer.x - bounds.left - bounds.width / 2) / 100;
    y = (pointer.y - bounds.top - bounds.height / 2) / 100;
  }

  const blur = Math.min(1.5, Math.sqrt(x ** 2 + y ** 2) / 10);
  const baseStyle = { ['--name-size' as string]: size };

  return (
    <div ref={ref} className={overlapClass}>
      <h1
        className={`${layerClass} ${nameClass}`}
        style={{ ...baseStyle, ['--layer-color' as string]: colors.g, filter: `blur(${blur / 2}px)` }}
      >
        {text}
      </h1>
      <div
        aria-hidden="true"
        className={`${layerClass} ${nameClass}`}
        style={{
          ...baseStyle,
          ['--layer-color' as string]: colors.r,
          transform: `translate(${x}px, ${y}px)`,
          filter: `blur(${blur}px)`,
        }}
      >
        {text}
      </div>
      <div
        aria-hidden="true"
        className={`${layerClass} ${nameClass}`}
        style={{
          ...baseStyle,
          ['--layer-color' as string]: colors.b,
          transform: `translate(${-x}px, ${-y}px)`,
          filter: `blur(${blur}px)`,
        }}
      >
        {text}
      </div>
    </div>
  );
}

export function ChromaticDemo() {
  const pointer = usePointerPosition();
  const orientation = useDeviceOrientation();
  const isMobile = useIsMobile();
  const coarsePointer = useMedia('(pointer: coarse)');
  const reducedMotion = useMedia('(prefers-reduced-motion: reduce)');
  const hasOrientation = orientation.beta !== null && orientation.gamma !== null;
  const canRequestPermission = coarsePointer && orientation.permission === 'prompt';

  const instruction = reducedMotion
    ? 'Reduced motion is enabled, so the chromatic layers stay still.'
    : hasOrientation
      ? 'Tilt the device to move the chromatic layers.'
      : coarsePointer
        ? 'Drag across the screen to move the chromatic layers.'
        : 'Move the pointer across the screen to move the chromatic layers.';

  return (
    <div className={containerClass}>
      <ChromaticText
        text="DAVID SANCHO"
        size={isMobile ? fonts.fontSize3 : fonts.fontSize5}
        pointer={pointer}
        orientation={orientation}
        useOrientation={hasOrientation}
        reducedMotion={reducedMotion}
      />
      <p className={instructionClass} aria-live="polite">
        {instruction} This demonstrates{' '}
        <TextLink href="https://en.wikipedia.org/wiki/Chromatic_aberration">chromatic aberration</TextLink>.
      </p>
      {canRequestPermission ? (
        <button type="button" className={permissionButtonClass} onClick={orientation.requestPermission}>
          Enable device motion
        </button>
      ) : null}
    </div>
  );
}
