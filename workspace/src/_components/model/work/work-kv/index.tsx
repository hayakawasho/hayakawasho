import type { WorkMetadata } from "~/(work)/model";

export const WorkKv: React.FC<{
  img: WorkMetadata["mv"];
}> = ({ img }) => {
  return (
    <div
      className={`relative overflow-hidden backface-hidden
      | before:content-[""] before:block before:aspect-[16/9]
      | pc:before:aspect-[16/8]`}
    >
      <img
        alt=""
        className={"w-full h-full absolute top-0 object-cover pointer-events-none invisible"}
        data-height={img.height}
        data-ref="kv"
        data-src={img.src}
        data-width={img.width}
        height={img.height}
        width={img.width}
      />
    </div>
  );
};
