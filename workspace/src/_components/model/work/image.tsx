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
  return <img className={className} src={metadata.src} width={metadata.width} height={metadata.height} alt="" />;
}
