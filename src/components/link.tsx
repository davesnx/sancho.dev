import type React from "react";

import { css } from "@emotion/react";
import styled from "@emotion/styled";
import NextLink from "next/link";

import fonts from "../theme/fonts";
import { colors } from "../theme/theme";

type AnchorProps = {
  color?: string;
  hoverColor?: string;
  decorationColor?: string;
  weight?: number;
  monospace?: boolean;
  underline?: boolean;
  underlined?: boolean;
};

const Anchor = (props: AnchorProps) => css`
  color: ${props.color};
  font-family: ${props.monospace ? fonts.mono : fonts.sans};
  font-weight: ${props.weight ? props.weight : 500};
  font-size: inherit;
  line-height: inherit;

  cursor: pointer;
  overflow-wrap: break-word;
  word-wrap: break-word;
  display: inherit;

  transition: all 0.15s ease;
  text-decoration-thickness: 1.5px;
  text-underline-offset: 2px;
  text-decoration: underline;

  text-decoration-color: ${props.decorationColor};

  &:hover {
    color: ${props.hoverColor};
    text-decoration-color: ${props.hoverColor};
  }
`;

// Prevent custom styling props from being passed to DOM (avoids React warnings)
const shouldForwardProp = (prop: string) =>
  ![
    "color",
    "hoverColor",
    "decorationColor",
    "weight",
    "monospace",
    "underline",
    "underlined",
  ].includes(prop);

const StyledNextLink = styled(NextLink, { shouldForwardProp })`
  ${(props: AnchorProps) => Anchor(props)};
`;

const isExternalLink = (href: string) =>
  href.startsWith("http://") || href.startsWith("https://");

export const TextLink = ({
  href,
  ...rest
}: AnchorProps & {
  href: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const color = rest.color || colors.body;
  const hoverColor = rest.hoverColor || colors.primary;
  const decorationColor = rest.decorationColor || color;

  const externalProps = isExternalLink(href)
    ? { target: "_blank" as const, rel: "noopener noreferrer" }
    : {};

  return (
    <StyledNextLink
      {...rest}
      {...externalProps}
      href={href}
      shallow
      color={color}
      hoverColor={hoverColor}
      decorationColor={decorationColor}
    />
  );
};

const UnstyledNextLink = styled(NextLink, { shouldForwardProp })`
  color: currentColor;
  text-decoration: none;
  cursor: pointer;
`;

export const ButtonLink = ({
  href,
  ...rest
}: AnchorProps & {
  href: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  return (
    <UnstyledNextLink href={href} shallow {...rest} />
  );
};

export const NavigateButton = ButtonLink;
export const NavigateText = TextLink;
