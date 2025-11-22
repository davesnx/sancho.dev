import type React from "react";
import { useEffect, useState, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const backdropFadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const imageZoomIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const StyledImg = styled.img<{ isZoomed: boolean }>`
  width: 100%;
  border-radius: 6px;
  margin: 0;
  cursor: ${(props) => (props.isZoomed ? "default" : "zoom-in")};
  transition: opacity 0.2s ease-in-out;

  &:hover {
    opacity: ${(props) => (props.isZoomed ? 1 : 0.9)};
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: zoom-out;
  animation: ${backdropFadeIn} 0.25s ease-out;
`;

const ZoomedImg = styled.img`
  max-width: 90vw;
  max-height: 90vh;
  object-fit: contain;
  cursor: zoom-out;
  border-radius: 6px;
  user-select: none;
  animation: ${imageZoomIn} 0.25s ease-out;
`;

interface ZoomableImageProps {
  src: string;
  alt?: string;
  [key: string]: any;
}

export const ZoomableImage: React.FC<ZoomableImageProps> = ({
  src,
  alt,
  ...props
}) => {
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
    (e: React.MouseEvent) => {
      if (
        e.target === e.currentTarget ||
        (e.target as HTMLElement).tagName === "IMG"
      ) {
        e.stopPropagation();
        handleClose();
      }
    },
    [handleClose]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isZoomed) {
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
      <StyledImg
        src={src}
        alt={alt}
        isZoomed={isZoomed}
        onClick={handleImageClick}
        {...props}
      />
      {isZoomed &&
        createPortal(
          <Overlay onClick={handleOverlayClick}>
            <ZoomedImg src={src} alt={alt} />
          </Overlay>,
          document.body
        )}
    </>
  );
};
