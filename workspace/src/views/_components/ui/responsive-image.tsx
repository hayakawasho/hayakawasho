import { mq } from "@/_foundation/mq";

type Props = {
  pcSrc: string;
  spSrc: string;
  pcSize: [number | string, number | string];
  spSize: [number | string, number | string];
  className?: string;
  alt: string;
};

export function ResponsiveImage(props: Props) {
  return (
    <picture>
      <source
        height={props.pcSize[1]}
        media={mq.pc}
        srcSet={props.pcSrc}
        width={props.pcSize[0]}
      />
      <source
        height={props.spSize[1]}
        media={mq.sp}
        srcSet={props.spSrc}
        width={props.spSize[0]}
      />
      <img
        alt={props.alt}
        className={props.className}
        decoding="auto"
        height={props.spSize[1]}
        src={props.spSrc}
        width={props.spSize[0]}
      />
    </picture>
  );
}
