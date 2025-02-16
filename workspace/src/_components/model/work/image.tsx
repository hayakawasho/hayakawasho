const MAX_W = 1675;

export function Image({
  className = "",
  metadata,
  width,
}: {
  className?: string;
  metadata: {
    src: string;
    width: number;
    height: number;
  };
  width?: number;
}) {
  const maxWidth = MAX_W > metadata.width ? metadata.width : MAX_W;

  return (
    <img
      className={className}
      src={`${metadata.src}?auto=compress,format&fm=avif&w=${width || maxWidth}`}
      width={metadata.width}
      height={metadata.height}
      alt=""
    />
  );
}
