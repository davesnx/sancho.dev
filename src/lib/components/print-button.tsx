'use client';

import { css } from '@linaria/core';
import fonts from '@/theme/fonts';
import { colors } from '@/theme/theme';

const buttonClass = css`
  padding: 0.65rem 1rem;
  border: 1px solid ${colors.borderStrong};
  border-radius: 6px;
  background: ${colors.backgroundSecondary};
  color: ${colors.textPrimary};
  font-family: ${fonts.sans};
  font-weight: 700;
  cursor: pointer;
  transition: background-color 150ms ease, transform 120ms ease-out;

  &:hover {
    background: ${colors.backgroundTertiary};
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
    transform: none;
  }

  @media print {
    display: none;
  }
`;

export function PrintButton({ disabled = false }: { disabled?: boolean }) {
  return (
    <button type="button" className={buttonClass} disabled={disabled} onClick={() => window.print()}>
      Print or save as PDF
    </button>
  );
}
