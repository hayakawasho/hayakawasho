const MAX_W = 1675;

export function Image({
  className = "",
  metadata,
}: {
  className?: string;
  metadata: {
    src: string;
    width: number;
    height: number;
  };
}) {
  const maxWidth = MAX_W > metadata.width ? metadata.width : MAX_W;

  return (
    <img
      className={className}
      src={metadata.src + `?auto=compress,format&fm=avif&w=${maxWidth}`}
      width={metadata.width}
      height={metadata.height}
      alt=""
    />
  );
}
