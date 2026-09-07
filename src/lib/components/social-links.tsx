import { Row, TextLink } from '@/components/ui';
import { colors } from '@/theme/theme';

const links = {
  github: {
    href: 'https://github.com/davesnx',
    label: 'Github',
    decorationColor: colors.borderSubtle,
  },
  x: {
    href: 'https://x.com/davesnx',
    label: 'X (Twitter)',
    decorationColor: colors.borderSubtle,
  },
  bluesky: {
    href: 'https://bsky.app/profile/david.sancho.dev',
    label: 'Bluesky',
    decorationColor: colors.bluesky20,
  },
  discord: {
    href: 'https://discordapp.com/users/122441959414431745',
    label: 'Discord',
    decorationColor: colors.discord20,
  },
  strava: {
    href: 'https://www.strava.com/athletes/davesnx',
    label: 'Strava',
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
            href={link.href}
            color={colors.textProse}
            hoverColor={colors.textAccent}
            decorationColor={link.decorationColor}
          >
            {link.label}
          </TextLink>
        );
      })}
    </Row>
  );
}
