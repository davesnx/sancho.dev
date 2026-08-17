import { css } from '@linaria/core';
import { format } from 'date-fns/format';
import { parseISO } from 'date-fns/parseISO';
import { Row, Text, TextLink } from '@/components/ui';
import fonts, { typography } from '@/theme/fonts';
import { colors } from '@/theme/theme';

const rowClass = css`
  justify-content: flex-start;
  flex-wrap: wrap;
`;

export function ArticleMeta({ publishedAt, readingMinutes }: { publishedAt: string; readingMinutes: number }) {
  return (
    <Row className={rowClass} gap={2}>
      <Text
        kerning="0.05rem"
        color={colors.textMuted}
        size={typography.metadata.fontSize}
        weight={typography.metadata.fontWeight}
        monospace
      >
        {format(parseISO(publishedAt), 'MMM d, yyyy').toUpperCase()}
      </Text>
      <Text color={colors.textTertiary} size={fonts.fontSize0} monospace>
        •
      </Text>
      <Text size={typography.metadata.fontSize} monospace>
        <TextLink href="/about" weight={600} color={colors.textMuted} hoverColor={colors.textPrimary} monospace>
          DAVESNX
        </TextLink>
      </Text>
      <Text color={colors.textTertiary} size={fonts.fontSize0} monospace>
        •
      </Text>
      <Text
        kerning="0.05rem"
        color={colors.textMuted}
        size={typography.metadata.fontSize}
        weight={typography.metadata.fontWeight}
        monospace
      >
        {`${Math.max(1, Math.ceil(readingMinutes))} MINUTES`}
      </Text>
    </Row>
  );
}
