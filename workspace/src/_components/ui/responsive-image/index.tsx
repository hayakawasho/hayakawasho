import { BREAK_POINTS } from "~/_foundation/const";

type Props = {
  src: string;
  size: [number, number];
  mob: string;
  mobSize: [number, number];
  className?: string;
  alt: string;
};

export function ResponsiveImage({ size, src, mob, mobSize, alt, ...props }: Props) {
  return (
    <picture>
      <source height={size[1]} media={BREAK_POINTS["pc"]} srcSet={src} width={size[0]} />
      <source height={mobSize[1]} media={BREAK_POINTS["sp"]} srcSet={mob} width={mobSize[0]} />
      <img {...props} alt={alt} decoding="async" height={mobSize[1]} src={mob} width={mobSize[0]} />
    </picture>
  );
}
