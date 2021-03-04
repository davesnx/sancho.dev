import React from "react";
import styled from "styled-components";

import LinkIcon from "./link-icon";
import Github from "./../svgs/github";
import Web from "./../svgs/web";
import YouTube from "./../svgs/youtube";
import { Stack, Row } from "./taco";
import { UnstyledLink } from "./link";
import Text from "./text";
import { H4 } from "./heading";

const GithubIcon = ({ href }) => (
  <LinkIcon size={38} href={href} svg={Github} bg="rgba(24, 23, 23, 0.1)" />
);

const WebIcon = ({ href }) => (
  <LinkIcon size={38} href={href} svg={Web} bg="rgba(24, 23, 23, 0.1)" />
);

const YouTubeIcon = ({ href }) => (
  <LinkIcon size={38} href={href} svg={YouTube} bg="rgba(24, 23, 23, 0.1)" />
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

export const Item = ({ title, description, kind, link }) => {
  const Icon = KindToIcon[kind] || KindToIcon["Web"];

  return (
    <Row fullWidth align="center" distribute="between" gap={2}>
      <UnstyledLink to={link}>
        <div>
          <Stack align="left" gap={2}>
            <H4>{title}</H4>
            <Text>{description}</Text>
          </Stack>
        </div>
      </UnstyledLink>
      <NotShrink>
        <Icon href={link} />
      </NotShrink>
    </Row>
  );
};
