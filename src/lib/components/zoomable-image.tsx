'use client';

import { css } from '@linaria/core';
import type React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const buildZoomCursor = (iconPath: string, fallback: 'zoom-in' | 'zoom-out') => {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32' fill='none'><circle cx='16' cy='16' r='12' fill='rgba(10,10,10,0.9)'/><circle cx='16' cy='16' r='11.5' stroke='rgba(255,255,255,0.9)'/><path d='${iconPath}' stroke='white' stroke-width='2.25' stroke-linecap='round'/></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}") 16 16, ${fallback}`;
};

const zoomInCursor = buildZoomCursor('M16 11v10M11 16h10', 'zoom-in');
const zoomOutCursor = buildZoomCursor('M11 16h10', 'zoom-out');

const imageClass = css`
  width: 100%;
  border-radius: 6px;
  margin: 0;
`;

const zoomableImageClass = css`
  cursor: ${zoomInCursor};
`;

const imageButtonClass = css`
  display: block;
  width: 100%;
  padding: 0;
  border: 0;
  background: transparent;
  line-height: 0;
  cursor: ${zoomInCursor};
`;

const dialogClass = css`
  width: 100vw;
  max-width: none;
  height: 100vh;
  max-height: none;
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;

  &::backdrop {
    background: rgba(0, 0, 0, 0.9);
  }
`;

const closeButtonClass = css`
  width: 100%;
  height: 100%;
  padding: 0;
  border: 0;
  background: transparent;
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
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const baseClassName = alt ? `${imageClass} ${zoomableImageClass}` : imageClass;
  const mergedClassName = className ? `${baseClassName} ${className}` : baseClassName;

  const handleImageClick = useCallback(() => {
    setIsZoomed(true);
  }, []);

  const handleClose = useCallback(() => {
    dialogRef.current?.close();
  }, []);

  const handleDialogClose = useCallback(() => {
    setIsZoomed(false);
    triggerRef.current?.focus();
  }, []);

  const handleDialogKeyDown = useCallback((event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.key !== 'Tab') return;

    event.preventDefault();
    dialogRef.current?.querySelector<HTMLButtonElement>('button')?.focus();
  }, []);

  useEffect(() => {
    if (!isZoomed || !dialogRef.current) return;

    dialogRef.current.showModal();
  }, [isZoomed]);

  useEffect(() => {
    if (!isZoomed) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isZoomed]);

  if (!alt) {
    return (
      // biome-ignore lint/performance/noImgElement: Decorative MDX images have author-defined static-exported sources.
      <img className={mergedClassName} src={src} alt="" loading="lazy" decoding="async" {...props} />
    );
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={imageButtonClass}
        aria-label={`Zoom image: ${alt}`}
        onClick={handleImageClick}
      >
        {/* biome-ignore lint/performance/noImgElement: MDX images have author-defined dimensions and static-exported sources. */}
        <img className={mergedClassName} src={src} alt={alt} loading="lazy" decoding="async" {...props} />
      </button>
      {isZoomed
        ? createPortal(
            <dialog
              ref={dialogRef}
              className={dialogClass}
              aria-label="Zoomed image"
              onClose={handleDialogClose}
              onKeyDown={handleDialogKeyDown}
            >
              <button type="button" className={closeButtonClass} aria-label="Close zoomed image" onClick={handleClose}>
                {/* biome-ignore lint/performance/noImgElement: The zoom view reuses the already-loaded MDX source. */}
                <img className={zoomedImageClass} src={src} alt={alt} />
              </button>
            </dialog>,
            document.body,
          )
        : null}
    </>
  );
};
