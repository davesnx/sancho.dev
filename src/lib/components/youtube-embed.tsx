'use client';

import { css } from '@linaria/core';
import { useEffect, useRef, useState } from 'react';
import { colors } from '@/theme/theme';

const frameClass = css`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border: 1px solid ${colors.borderStrong};
  border-radius: 8px;
  background: ${colors.backgroundSecondary};
`;

const playButtonClass = css`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0;
  border: 0;
  background: ${colors.backgroundSecondary};
  cursor: pointer;

  &:hover .youtube-play-icon {
    transform: translate(-50%, -50%) scale(1.08);
  }

  &:focus-visible {
    outline: 2px solid ${colors.textAccent};
    outline-offset: -4px;
  }

  @media (prefers-reduced-motion: reduce) {
    &:hover .youtube-play-icon {
      transform: translate(-50%, -50%);
    }
  }
`;

const thumbnailClass = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const playIconClass = css`
  position: absolute;
  inset: 50% auto auto 50%;
  width: 64px;
  height: 48px;
  transform: translate(-50%, -50%);
  border-radius: 12px;
  background: ${colors.textAccent};
  transition: transform 150ms ease-out;

  &::after {
    content: '';
    position: absolute;
    left: 26px;
    top: 14px;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-left: 16px solid ${colors.backgroundPrimary};
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const iframeClass = css`
  width: 100%;
  height: 100%;
  border: 0;
`;

export function YouTubeEmbed({ videoId, title, thumbnail }: { videoId: string; title: string; thumbnail: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (isPlaying) iframeRef.current?.focus();
  }, [isPlaying]);

  return (
    <div className={frameClass}>
      {isPlaying ? (
        <iframe
          ref={iframeRef}
          className={iframeClass}
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          className={playButtonClass}
          aria-label={`Play ${title}`}
          onClick={() => setIsPlaying(true)}
        >
          {/* biome-ignore lint/performance/noImgElement: The local preview avoids loading the YouTube iframe before consent. */}
          <img className={thumbnailClass} src={thumbnail} alt="" loading="lazy" referrerPolicy="no-referrer" />
          <span className={`youtube-play-icon ${playIconClass}`} aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
