import { css } from '@linaria/core';

import { Row, TextLink } from '@/components/ui';
import { colors } from '@/theme/theme';

const iconClass = css`
  width: 1em;
  height: 1em;
  flex-shrink: 0;
  object-fit: cover;
  border-radius: 4px;
  padding: 1px;
`;

const socialLinkClass = css`
  && {
    display: inline-flex;
    align-items: center;
    gap: 3px;
    white-space: nowrap;
  }

  & > span {
    text-decoration: inherit;
    text-underline-offset: inherit;
  }
`;

const links = {
  github: {
    href: 'https://github.com/davesnx',
    label: 'Github',
    icon: '/logos/github-icon.svg',
    color: colors.textProse,
    hoverColor: colors.textAccent,
    decorationColor: colors.borderSubtle,
  },
  x: {
    href: 'https://x.com/davesnx',
    label: 'X (Twitter)',
    icon: '/logos/x-icon.svg',
    color: colors.textProse,
    hoverColor: colors.textAccent,
    decorationColor: colors.borderSubtle,
  },
  bluesky: {
    href: 'https://bsky.app/profile/david.sancho.dev',
    label: 'Bluesky',
    icon: '/logos/bluesky-icon.svg',
    color: colors.bluesky60,
    hoverColor: colors.bluesky,
    decorationColor: colors.bluesky20,
  },
  discord: {
    href: 'https://discordapp.com/users/122441959414431745',
    label: 'Discord',
    icon: '/logos/discord-icon.svg',
    color: colors.discord60,
    hoverColor: colors.discord,
    decorationColor: colors.discord20,
  },
  strava: {
    href: 'https://www.strava.com/athletes/davesnx',
    label: 'Strava',
    icon: '/logos/strava-icon.svg',
    color: colors.strava60,
    hoverColor: colors.strava,
    decorationColor: colors.strava20,
  },
} as const;

type SocialPlatform = keyof typeof links;

const allPlatforms: SocialPlatform[] = ['github', 'x', 'bluesky', 'discord', 'strava'];

export function SocialLinks({ platforms = allPlatforms }: { platforms?: SocialPlatform[] }) {
  return (
    <Row gap={2} justify="flex-start" wrap>
      {platforms.map((platform) => {
        const link = links[platform];

        return (
          <TextLink
            key={platform}
            className={socialLinkClass}
            href={link.href}
            color={link.color}
            hoverColor={link.hoverColor}
            decorationColor={link.decorationColor}
          >
            <img className={iconClass} src={link.icon} alt="" width={40} height={40} decoding="async" />
            <span>{link.label}</span>
          </TextLink>
        );
      })}
    </Row>
  );
}
