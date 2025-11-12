import React from "react";

import styled from "@emotion/styled";

import font from "../theme/fonts";
import { colors } from "../theme/theme";
import Github from "./../components/svgs/github";
import Web from "./../components/svgs/web";
import YouTube from "./../components/svgs/youtube";
import { H4 } from "./heading";
import Icon from "./icon";
import { ButtonLink } from "./link";
import { Row, Stack } from "./taco";
import Text from "./text";

const GithubIcon = ({
  href,
  color,
  size,
}: {
  href: string;
  color: string;
  size: number;
}) => (
  <Icon
    padded
    size={size}
    href={href}
    svg={Github}
    bg={colors.grey}
    color={color}
  />
);

const WebIcon = ({
  href,
  color,
  size,
}: {
  href: string;
  color: string;
  size: number;
}) => (
  <Icon
    padded
    size={size}
    href={href}
    svg={Web}
    bg={colors.grey}
    color={color}
  />
);

const YouTubeIcon = ({
  href,
  color,
  size,
}: {
  href: string;
  color: string;
  size: number;
}) => (
  <Icon
    padded
    size={size}
    href={href}
    svg={YouTube}
    bg={colors.grey}
    color={color}
  />
);

export const Kind = {
  Web: "Web",
  Github: "Github",
  YouTube: "YouTube",
} as const;

type Icon = ({
  href,
  color,
  size,
}: {
  href: string;
  color: string;
  size: number;
}) => JSX.Element;

const KindToIcon: Record<keyof typeof Kind, Icon> = {
  Web: WebIcon,
  Github: GithubIcon,
  YouTube: YouTubeIcon,
};

let Box = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  width: 100%;
  cursor: pointer;

  text-decoration: none;

  padding: 3rem;
  border-radius: 0.5rem;
  border: 2px solid ${colors.contrastCodeBackground};
  background-color: ${colors.contrastCodeBackground30};

  &:hover {
    background-color: ${colors.contrastCodeBackground80};
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
  let Icon: Icon = KindToIcon[kind as keyof typeof Kind] || KindToIcon["Web"];

  return (
    <Row fullWidth align="center" distribute="between" gap={2}>
      <Box>
        <ButtonLink href={link}>
          <Row distribute="left" align="center" gap={0}>
            <Text color={colors.body30} size={font.fontSize1} weight={700}>
              {meta}
            </Text>
            <Icon href={link} color={colors.body30} size={16} />
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
