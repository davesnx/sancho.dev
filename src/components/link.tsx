import React from "react";

import { css } from "@emotion/react";
import styled from "@emotion/styled";
import NextLink from "next/link";

import fonts from "../theme/fonts";
import { colors } from "../theme/theme";

type AnchorProps = {
  color: string;
  hoverColor: string;
  decorationColor: string;
};

const Anchor = (props: AnchorProps) => css`
  color: ${props.color};
  font-family: ${fonts.sans};
  font-weight: 500;
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

const StyledA = styled.a`
  ${(props: AnchorProps) => Anchor(props)}
`;

export const TextLink = ({ href, ...rest }: AnchorProps & { href: string }) => {
  let color = rest.color || colors.primary;
  let hoverColor = rest.hoverColor || color;
  let decorationColor = rest.decorationColor || color;

  return (
    <NextLink href={href} shallow legacyBehavior>
      <StyledA
        {...rest}
        href={href}
        color={color}
        hoverColor={hoverColor}
        decorationColor={decorationColor}
      />
    </NextLink>
  );
};

const UnstyledA = styled.a`
  color: currentColor;
  text-decoration: none;
  cursor: pointer;
`;

export const ButtonLink = ({
  href,
  ...rest
}: AnchorProps & { href: string }) => {
  return (
    <NextLink href={href} shallow legacyBehavior>
      <UnstyledA href={href} {...rest} />
    </NextLink>
  );
};

export const NavigateButton = ButtonLink;
export const NavigateText = TextLink;
