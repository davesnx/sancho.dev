"use client";

import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { css } from "@linaria/core";

const buildZoomCursor = (iconPath: string, fallback: "zoom-in" | "zoom-out") => {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32' fill='none'><circle cx='16' cy='16' r='12' fill='rgba(10,10,10,0.9)'/><circle cx='16' cy='16' r='11.5' stroke='rgba(255,255,255,0.9)'/><path d='${iconPath}' stroke='white' stroke-width='2.25' stroke-linecap='round'/></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}") 16 16, ${fallback}`;
};

const zoomInCursor = buildZoomCursor("M16 11v10M11 16h10", "zoom-in");
const zoomOutCursor = buildZoomCursor("M11 16h10", "zoom-out");

const imageClass = css`
  width: 100%;
  border-radius: 6px;
  margin: 0;
  cursor: ${zoomInCursor};
`;

const overlayClass = css`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.9);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${zoomOutCursor};
`;

const zoomedImageClass = css`
  max-width: 90vw;
  max-height: 90vh;
  object-fit: contain;
  cursor: ${zoomOutCursor};
  border-radius: 6px;
  user-select: none;
`;

type ZoomableImageProps = {
  src: string;
  alt?: string;
  className?: string;
} & Record<string, unknown>;

export const ZoomableImage: React.FC<ZoomableImageProps> = ({ src, alt, className, ...props }) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const isClosingRef = useRef(false);
  const mergedClassName = className ? `${imageClass} ${className}` : imageClass;

  const handleImageClick = useCallback(() => {
    if (!isZoomed && !isClosingRef.current) {
      setIsZoomed(true);
    }
  }, [isZoomed]);

  const handleClose = useCallback(() => {
    if (isClosingRef.current) return;

    isClosingRef.current = true;
    setIsZoomed(false);

    setTimeout(() => {
      isClosingRef.current = false;
    }, 100);
  }, []);

  const handleOverlayClick = useCallback(
    (event: React.MouseEvent) => {
      if (event.target === event.currentTarget || (event.target as HTMLElement).tagName === "IMG") {
        event.stopPropagation();
        handleClose();
      }
    },
    [handleClose],
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isZoomed) {
        handleClose();
      }
    };

    if (isZoomed) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isZoomed, handleClose]);

  return (
    <>
      <img className={mergedClassName} src={src} alt={alt} loading="lazy" decoding="async" onClick={handleImageClick} {...props} />
      {isZoomed
        ? createPortal(
            <div className={overlayClass} onClick={handleOverlayClick}>
              <img className={zoomedImageClass} src={src} alt={alt} />
            </div>,
            document.body,
          )
        : null}
    </>
  );
};
