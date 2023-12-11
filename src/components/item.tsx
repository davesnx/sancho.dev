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
import { Stack, Row } from "./taco";
import Text from "./text";

const GithubIcon = ({ href }: { href: string }) => (
  <Icon padded size={38} href={href} svg={Github} bg="rgba(24, 23, 23, 0.1)" />
);

const WebIcon = ({ href }: { href: string }) => (
  <Icon padded size={38} href={href} svg={Web} bg="rgba(24, 23, 23, 0.1)" />
);

const YouTubeIcon = ({ href }: { href: string }) => (
  <Icon padded size={38} href={href} svg={YouTube} bg="rgba(24, 23, 23, 0.1)" />
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
  flex-shrink: 0;
`;

export const Item = ({ meta, title, description, kind, link }) => {
  let Icon = KindToIcon[kind] || KindToIcon["Web"];

  return (
    <Row fullWidth align="center" distribute="between" gap={2}>
      <ButtonLink href={link}>
        <div>
          <Text color={colors.subtle} size={font.fontSizeN1} weight={400}>
            {meta}
          </Text>
          <Stack align="left" gap={0}>
            <H3>{title}</H3>
            <Text>{description}</Text>
          </Stack>
        </div>
      </ButtonLink>
      <NotShrink>
        <Icon href={link} />
      </NotShrink>
    </Row>
  );
};
