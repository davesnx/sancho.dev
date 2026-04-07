"use client";

import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { css } from "@linaria/core";

const imageClass = css`
  width: 100%;
  border-radius: 6px;
  margin: 0;
  cursor: zoom-in;
`;

const overlayClass = css`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.9);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: zoom-out;
`;

const zoomedImageClass = css`
  max-width: 90vw;
  max-height: 90vh;
  object-fit: contain;
  cursor: zoom-out;
  border-radius: 6px;
  user-select: none;
`;

type ZoomableImageProps = {
  src: string;
  alt?: string;
} & Record<string, unknown>;

export const ZoomableImage: React.FC<ZoomableImageProps> = ({ src, alt, ...props }) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const isClosingRef = useRef(false);

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
      <img className={imageClass} src={src} alt={alt} onClick={handleImageClick} {...props} />
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
