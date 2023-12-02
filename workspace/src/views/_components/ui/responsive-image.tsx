import { mq } from '@/_foundation/mq';

type Props = {
  alt: string;
  className?: string;
  pcSrc: string;
  pcSize: [number | string, number | string];
  spSrc: string;
  spSize: [number | string, number | string];
};

export function ResponsiveImage({ alt, className, pcSize, pcSrc, spSize, spSrc, ...props }: Props) {
  return (
    <picture {...props}>
      <source height={pcSize[1]} media={mq.pc} srcSet={pcSrc} width={pcSize[0]} />
      <source height={spSize[1]} media={mq.sp} srcSet={spSrc} width={spSize[0]} />
      <img
        alt={alt}
        className={className}
        decoding="auto"
        height={spSize[1]}
        src={spSrc}
        width={spSize[0]}
      />
    </picture>
  );
}
