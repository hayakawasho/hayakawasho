import { Image } from "../../model/work/image";
import type { WorkDTO } from "../../../_models/work/dto";

export function WorkScreenshots({ post }: { post: WorkDTO }) {
  return (
    <ul className="overflow-hidden size-full">
      <li className="absolute top-0 left-0 size-full">
        <Image className="w-full pc:min-h-[--100vh] pc:object-cover" metadata={post.thumb} />
      </li>
      {post.screenshots.map((i, index) => (
        <li key={index} className="absolute top-0 left-0 size-full">
          <Image
            className="w-full aspect-[4/5] object-contain bg-black px-[--gap] | pc:aspect-auto pc:min-h-[--100vh] pc:px-[--grid]"
            metadata={i}
          />
        </li>
      ))}
      <li className="absolute top-0 left-0 size-full">
        <Image className="w-full pc:min-h-[--100vh] pc:object-cover" metadata={post.thumb} />
      </li>
    </ul>
  );
}
