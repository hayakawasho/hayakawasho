import type { FC } from "react";

export const ImagePreloader: FC<{
  href: string;
  media?: string;
}> = (props) => (
  <link
    as="image"
    crossOrigin="anonymous"
    href={props.href}
    media={props.media}
    rel="preload"
  />
);
