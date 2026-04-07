import { css } from "@linaria/core";

import { ZoomableImage } from "@/components/zoomable-image";

const imageClass = css`
  border-radius: 6px;
`;

type MdxImageProps = {
  src: string;
  alt?: string;
};

export function MdxImage({ src, alt = "", ...props }: MdxImageProps & Record<string, unknown>) {
  return <ZoomableImage className={imageClass} src={src} alt={alt} {...props} />;
}
