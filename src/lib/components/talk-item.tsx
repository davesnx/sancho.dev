import { css } from "@linaria/core";

import { H4, Row, Stack, Text } from "@/components/ui";
import breakpoints from "@/theme/constants";
import font from "@/theme/fonts";
import { colors } from "@/theme/theme";

const iconWrapperClass = css`
  line-height: 0;

  svg {
    filter: grayscale(1);
    transition: filter 0.2s ease;
  }
`;

const boxClass = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  width: 100%;
  cursor: pointer;
  text-decoration: none;
  padding: 3rem;
  border-radius: 0.5rem;
  border: 1px solid ${colors.borderStrong};
  background-color: ${colors.backgroundSecondary};
  transition: all 0.2s ease;

  @media (max-width: ${breakpoints.mobile.width}px) {
    padding: 2rem;
  }

  &:hover {
    background-color: ${colors.backgroundTertiary};
  }

  &:hover .talk-meta {
    color: ${colors.textSecondary};
  }

  &:hover .talk-icon svg {
    filter: grayscale(0.3);
  }

  &:hover .talk-title {
    color: ${colors.textAccent};
  }
`;

const metaClass = css`
  color: ${colors.textTertiary};
  transition: color 0.2s ease;
`;

const titleClass = css`
  transition: color 0.2s ease;
`;

const youtubeIconClass = css`
  width: 16px;
  height: 16px;
  fill: ${colors.r};
`;

const YouTubeIcon = () => (
  <svg viewBox="0 0 512 512" className={youtubeIconClass}>
    <path d="M490.24,113.92c-13.888-24.704-28.96-29.248-59.648-30.976C399.936,80.864,322.848,80,256.064,80 c-66.912,0-144.032,0.864-174.656,2.912c-30.624,1.76-45.728,6.272-59.744,31.008C7.36,138.592,0,181.088,0,255.904 C0,255.968,0,256,0,256c0,0.064,0,0.096,0,0.096v0.064c0,74.496,7.36,117.312,21.664,141.728 c14.016,24.704,29.088,29.184,59.712,31.264C112.032,430.944,189.152,432,256.064,432c66.784,0,143.872-1.056,174.56-2.816 c30.688-2.08,45.76-6.56,59.648-31.264C504.704,373.504,512,330.688,512,256.192c0,0,0-0.096,0-0.16c0,0,0-0.064,0-0.096 C512,181.088,504.704,138.592,490.24,113.92z M192,352V160l160,96L192,352z" />
  </svg>
);

export function TalkItem({
  meta,
  title,
  description,
  link,
}: {
  meta: string;
  title: string;
  description: string;
  link: string;
}) {
  return (
    <Row fullWidth align="center" justify="between" gap={2}>
      <a className={boxClass} href={link} target="_blank" rel="noopener noreferrer">
        <div>
          <Row justify="left" align="center" gap={1}>
            <Text className={`talk-meta ${metaClass}`} size={font.fontSize1} weight={700}>
              {meta}
            </Text>
            <div className={`talk-icon ${iconWrapperClass}`}>
              <YouTubeIcon />
            </div>
          </Row>
          <Stack align="left" gap={1}>
            <H4 className={`talk-title ${titleClass}`}>{title}</H4>
            <Text color={colors.textSecondary} size={font.fontSize0}>
              {description}
            </Text>
          </Stack>
        </div>
      </a>
    </Row>
  );
}
