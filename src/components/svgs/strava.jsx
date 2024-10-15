import { css } from "@emotion/react";
import React from "react";

export default function Strava({ fill, size = 24 }) {
  return (
    <svg
      role="img"
      fill={fill}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      css={css`
        width: ${size}px;
        height: ${size}px;
      `}
    >
      <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169" />
    </svg>
  );
}
