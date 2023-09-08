type Props = {
  pcSrc: string;
  spSrc: string;
  pcW: number | string;
  pcH: number | string;
  spW: number | string;
  spH: number | string;
  className?: string;
  alt: string;
};

export function ResponsiveImage(props: Props) {
  return (
    <picture>
      <source
        height={props.pcH}
        media="(min-width: 640px)"
        srcSet={props.pcSrc}
        width={props.pcW}
      />
      <source
        height={props.spH}
        media="not screen and (min-width: 640px)"
        srcSet={props.spSrc}
        width={props.spW}
      />
      <img
        alt={props.alt}
        className={props.className}
        decoding="async"
        src={props.spSrc}
      />
    </picture>
  );
}
