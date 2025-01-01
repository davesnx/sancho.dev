import React from "react";

import styled from "@emotion/styled";

import font from "../theme/fonts";
import { colors } from "../theme/theme";
import Github from "./../components/svgs/github";
import Web from "./../components/svgs/web";
import YouTube from "./../components/svgs/youtube";
import { H3 } from "./heading";
import Icon from "./icon";
import { ButtonLink } from "./link";
import { Row, Stack } from "./taco";
import Text from "./text";
import { rgba, rgb } from "src/theme/color";

const GithubIcon = ({ href, color, size }: { href: string; color: string; size: number }) => (
  <Icon padded size={size} href={href} svg={Github} bg="rgba(24, 23, 23, 0.1)" color={color} />
);

const WebIcon = ({ href, color, size }: { href: string; color: string; size: number }) => (
  <Icon padded size={size} href={href} svg={Web} bg="rgba(24, 23, 23, 0.1)" color={color} />
);

const YouTubeIcon = ({ href, color, size }: { href: string; color: string; size: number }) => (
  <Icon padded size={size} href={href} svg={YouTube} bg="rgba(24, 23, 23, 0.1)" color={color} />
);

export const Kind = {
  Web: "Web",
  GitHub: "Github",
  YouTube: "YouTube",
};

const KindToIcon = {
  Web: WebIcon,
  Github: GithubIcon,
  YouTube: YouTubeIcon,
};

const NotShrink = styled.div`
  flex: 0;
`;

const FillSpace = styled.div`
  flex: 1;
`;

let Box = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  width: 100%;
  cursor: pointer;

  text-decoration: none;

  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid ${rgba(colors.contrastCodeBackground, 1)};

  &:hover {
    background-color: ${rgba(colors.contrastCodeBackground, 0.2)};
  }
`;

export const Item = ({ meta, title, description, kind, link }) => {
  let Icon = KindToIcon[kind] || KindToIcon["Web"];

  return (
    <Row fullWidth align="center" distribute="between" gap={2}>
      <Box>
        <ButtonLink href={link}>
          <Row distribute="left" align="center" gap={0}>
            <Text color={colors.subtle} size={font.fontSizeN1} weight={400}>
              {meta}
            </Text>
            <Icon href={link} color={rgb(colors.subtle)} size={16} />
          </Row>
          <Stack align="left" gap={0}>
            <H3>{title}</H3>
            <Text>{description}</Text>
          </Stack>
        </ButtonLink>
      </Box>
    </Row>
  );
};
