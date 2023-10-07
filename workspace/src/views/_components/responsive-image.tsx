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
        media="(min-width: 640px)"
        srcSet={props.pcSrc}
        width={props.pcSize[0]}
      />
      <source
        height={props.spSize[1]}
        media="not screen and (min-width: 640px)"
        srcSet={props.spSrc}
        width={props.spSize[0]}
      />
      <img
        alt={props.alt}
        className={props.className}
        decoding="async"
        height={props.spSize[1]}
        src={props.spSrc}
        width={props.spSize[0]}
      />
    </picture>
  );
}
