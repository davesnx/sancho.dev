import React from "react";
import styled from "styled-components";

import font from "../fonts";
import Icon from "./icon";
import Github from "./../svgs/github";
import Web from "./../svgs/web";
import YouTube from "./../svgs/youtube";
import { Stack, Row } from "./taco";
import { ButtonLink } from "./link";
import Text from "./text";
import { H3 } from "./heading";
import { colors } from "../theme";

const GithubIcon = ({ href }) => (
  <Icon padded size={38} href={href} svg={Github} bg="rgba(24, 23, 23, 0.1)" />
);

const WebIcon = ({ href }) => (
  <Icon padded size={38} href={href} svg={Web} bg="rgba(24, 23, 23, 0.1)" />
);

const YouTubeIcon = ({ href }) => (
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
  const Icon = KindToIcon[kind] || KindToIcon["Web"];

  return (
    <Row fullWidth align="center" distribute="between" gap={2}>
      <ButtonLink to={link}>
        <div>
          <Text weight={500} color={colors.subtle} size={font.fontSizeN1}>{meta.toUpperCase()}</Text>
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
