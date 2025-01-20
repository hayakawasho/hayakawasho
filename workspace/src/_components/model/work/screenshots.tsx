import { Image } from "../../model/work/image";
import type { WorkDTO } from "../../../_models/work/dto";

export function WorkScreenshots({ post }: { post: WorkDTO }) {
  return (
    <ul className="overflow-hidden h-full grid gap-[2rem]">
      <li className="">
        <Image className="w-full pc:min-h-[--100vh] pc:object-cover" metadata={post.thumb} />
      </li>
      {post.screenshots.map((i, index) => (
        <li key={index}>
          <Image
            className="w-full aspect-[4/5] object-contain bg-black px-[--grid] | pc:aspect-auto pc:min-h-[--100vh]"
            metadata={i}
          />
        </li>
      ))}
      <li className="h-[--100vh] overflow-hidden">
        <Image className="w-full pc:min-h-[--100vh] pc:object-cover" metadata={post.thumb} />
      </li>
    </ul>
  );
}
