import { css } from '@linaria/core';
import { Row, Text } from '@/components/ui';
import { colors } from '@/theme/theme';

const rootClass = css`
  background: ${colors.backgroundSecondary};
  padding: 2rem;
  border-radius: 8px;
`;

const linkClass = css`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: ${colors.backgroundSecondary};
  color: ${colors.textPrimary};
  padding: 10px 16px;
  border-radius: 10px;
  text-decoration: none;
  font-weight: 600;
  transition: background-color 150ms ease;

  &:hover,
  &:active { background-color: ${colors.backgroundTertiary}; }
`;

export function ArticleFeedback() {
  return (
    <div className={rootClass}>
      <Row columnOnMobile justify="space-between" align="center" wrap gap={2}>
        <Text>
          <strong>Thanks for reading!</strong>
          <br />
          Any feedback is appreciated.
        </Text>
        <a className={linkClass} href="https://x.com/davesnx" target="_blank" rel="noopener noreferrer">
          <Text monospace>@davesnx</Text>
        </a>
      </Row>
    </div>
  );
}
