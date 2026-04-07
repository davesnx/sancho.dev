"use client";

import { css } from "@linaria/core";
import React from "react";

import { TextLink } from "../../../components/ui";
import font from "../../../theme/fonts";
import { colors } from "../../../theme/theme";
import useDeviceOrientation from "../../../utils/device-orientation";
import { useIsMobile } from "../../../utils/media-query";
import useMousePosition from "../../../utils/mouse-position";

const overlapClass = css`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  & > *:not(:first-of-type) {
    position: absolute;
  }
`;

const layerClass = css`
  mix-blend-mode: screen;
`;

const nameClass = css`
  font-size: var(--name-size);
  font-family: ${font.sans};
  font-weight: bold;
  margin: 0;
  letter-spacing: 10px;
`;

const containerClass = css`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex: 1;
  cursor: crosshair;
`;

const isTouchDevice =
  typeof window !== "undefined" &&
  ("ontouchstart" in window || "msMaxTouchPoints" in window.navigator);

function ChromaticText({
  children,
  mouse,
  orientation,
}: {
  children: React.ReactNode;
  mouse: { x: number | null; y: number | null };
  orientation: { beta: number | null; gamma: number | null };
}) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const positionElLeft = ref.current?.offsetLeft ?? 0;
  const positionElTop = ref.current?.offsetTop ?? 0;
  const halfWidth = ref.current ? ref.current.offsetWidth / 2 : 0;
  const halfHeight = ref.current ? ref.current.offsetHeight / 2 : 0;

  const distanceX = (mouse.x ?? 0) - positionElLeft - halfWidth;
  const distanceY = (mouse.y ?? 0) - positionElTop - halfHeight;

  let translateX: number;
  let translateY: number;
  let pita: number;

  if (isTouchDevice) {
    translateX = (orientation.gamma ?? 0) / 6;
    translateY = ((orientation.beta ?? 30) - 30) / 6;
    const x = Math.abs(translateX ** 2);
    const y = Math.abs(translateY ** 2);
    pita = Math.sqrt(x + y) / 10;
  } else {
    translateX = distanceX / 100;
    translateY = distanceY / 100;
    pita = Math.sqrt(translateX ** 2 + translateY ** 2) / 10;
  }

  if (!ref.current) {
    translateX = 0.22;
    translateY = 4.25;
    pita = 0.4;
  }

  return (
    <div ref={ref} className={overlapClass}>
      <div className={layerClass} style={{ filter: `blur(${pita / 2}px)`, color: colors.g }}>
        {children}
      </div>
      <div className={layerClass} style={{ transform: `translate(${translateX}px, ${translateY}px)`, filter: `blur(${pita}px)`, color: colors.r }}>
        {children}
      </div>
      <div className={layerClass} style={{ transform: `translate(${-translateX}px, ${-translateY}px)`, filter: `blur(${pita}px)`, color: colors.b }}>
        {children}
      </div>
    </div>
  );
}

export function ChromaticDemo() {
  const mouse = useMousePosition();
  const orientation = useDeviceOrientation();
  const isMobile = useIsMobile();

  return (
    <div style={{ marginTop: "8rem" }}>
      <div className={containerClass}>
        <ChromaticText mouse={mouse} orientation={orientation}>
          <h1 className={nameClass} style={{ ["--name-size" as string]: isMobile ? font.fontSize3 : font.fontSize5 }}>
            DAVID SANCHO
          </h1>
        </ChromaticText>
        <div style={{ marginTop: "32px" }}>
          <p style={{ margin: 0, color: colors.textPrimary, textAlign: "center" }}>
            {isMobile ? "Incline the phone to see the " : "Move the mouse across the screen to see the "}
            <TextLink href="https://en.wikipedia.org/wiki/Chromatic_aberration">Chromatic Distortion effect</TextLink>
          </p>
        </div>
      </div>
    </div>
  );
}
