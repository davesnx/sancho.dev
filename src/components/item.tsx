import React from "react";

import styled from "@emotion/styled";

import font from "../theme/fonts";
import { colors } from "../theme/theme";
import constants from "../theme/constants";
import Github from "./../components/svgs/github";
import Web from "./../components/svgs/web";
import YouTube from "./../components/svgs/youtube";
import { H4 } from "./heading";
import Icon from "./icon";
import { ButtonLink } from "./link";
import { Row, Stack } from "./taco";
import Text from "./text";

const GithubIcon = ({
  size,
}: {
  href: string;
  size: number;
}) => (
  <Icon
    padded
    size={size}
    svg={Github}
    bg={colors.grey}
    color="#181717"
  />
);

const WebIcon = ({
  size,
}: {
  href: string;
  size: number;
}) => (
  <Icon
    padded
    size={size}
    svg={Web}
    bg={colors.grey}
    color={colors.primary}
  />
);

const YouTubeIcon = ({
  size,
}: {
  href: string;
  size: number;
}) => (
  <Icon
    padded
    size={size}
    svg={YouTube}
    bg={colors.grey}
    color={colors.r}
  />
);

export const Kind = {
  Web: "Web",
  Github: "Github",
  YouTube: "YouTube",
} as const;

type IconComponent = ({
  href,
  size,
}: {
  href: string;
  size: number;
}) => React.ReactElement;

const KindToIcon: Record<keyof typeof Kind, IconComponent> = {
  Web: WebIcon,
  Github: GithubIcon,
  YouTube: YouTubeIcon,
};

const Box = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  width: 100%;
  cursor: pointer;

  text-decoration: none;
  padding: 3rem;

  @media (max-width: ${constants.mobile.width}px) {
    padding: 2rem;
  }

  border-radius: 0.5rem;
  border: 2px solid ${colors.contrastCodeBackground};
  background-color: ${colors.contrastCodeBackground30};

  svg {
    filter: grayscale(1);
    transition: filter 0.2s ease;
  }

  &:hover {
    background-color: ${colors.contrastCodeBackground80};

    svg {
      filter: grayscale(0);
    }
  }
`;

export const Item = ({
  meta,
  title,
  description,
  kind,
  link,
}: {
  meta: string;
  title: string;
  description: string;
  kind: string;
  link: string;
}) => {
  const IconEl: IconComponent = KindToIcon[kind as keyof typeof Kind] || KindToIcon["Web"];

  return (
    <Row fullWidth align="center" distribute="between" gap={2}>
      <Box>
        <ButtonLink href={link}>
          <Row distribute="left" align="center" gap={0}>
            <Text color={colors.body30} size={font.fontSize1} weight={700}>
              {meta}
            </Text>
            <IconEl href={link} size={16} />
          </Row>
          <Stack align="left" gap={1}>
            <H4>{title}</H4>
            <Text size={font.fontSize0}>{description}</Text>
          </Stack>
        </ButtonLink>
      </Box>
    </Row>
  );
};
