"use client";

import { css } from "@linaria/core";
import React from "react";

import { TextLink } from "../../../components/ui";
import { colors } from "../../../theme/theme";
import { useIsMobile } from "../../../utils/media-query";
import useMousePosition from "../../../utils/mouse-position";

const rowClass = css`
  display: flex;
  flex-direction: row;
`;

const charClass = css`
  text-transform: uppercase;
  font-family: var(--font-display), "Inter", sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${colors.textPrimary};
  transition: all 200ms ease-out;
`;

const containerClass = css`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex: 1;
  cursor: ew-resize;
`;

const charSize = 75;
const middle = charSize / 2;

function Squared({
  isMobile,
  text,
  x: mousePosition,
}: {
  isMobile: boolean;
  text: string;
  x: number | null;
}) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const firstElementPosition = ref.current?.getBoundingClientRect().left
    ? ref.current.getBoundingClientRect().left + middle
    : 0;
  const letters = text.split("");

  return (
    <div ref={ref} className={rowClass}>
      {letters.map((char, idx) => {
        const weight = 1000 - Math.abs((mousePosition ?? 0) - firstElementPosition - 75 * idx);

        return (
          <span
            key={`${char}-${idx}`}
            className={charClass}
            style={{
              fontVariationSettings: `"wght" ${weight}`,
              width: isMobile ? "25px" : "75px",
              fontSize: isMobile ? "25px" : "50px",
            }}
          >
            {char}
          </span>
        );
      })}
    </div>
  );
}

export function VariableDemo() {
  const mouse = useMousePosition();
  const isMobile = useIsMobile();

  return (
    <div className={containerClass}>
      <Squared isMobile={isMobile} x={mouse.x} text="David Sancho" />
      <div style={{ marginTop: "32px" }}>
        <p style={{ margin: 0, color: colors.textPrimary, textAlign: "center" }}>
          {isMobile ? "Tap into the name to see the " : "Move the mouse in the y axis to see the "}
          <TextLink href="https://v-fonts.com">Variable font weight</TextLink> effect
        </p>
      </div>
    </div>
  );
}
