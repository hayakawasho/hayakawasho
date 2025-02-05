import type { WorkDTO } from "../../../_models/work/dto";
import { Image } from "../../model/work/image";

export function WorkScreenshots({ post }: { post: WorkDTO }) {
  return (
    <ul className="relative size-full">
      <li className="absolute top-0 left-0 size-full overflow-hidden">
        <Image className="pc:h-[var(--100vh)] w-full object-cover object-top" metadata={post.thumb} />
      </li>
      {post.screenshots.map((i, index) => (
        <li key={index} className="absolute top-0 left-0 size-full overflow-hidden">
          <Image
            className="aspect-4/5 pc:aspect-auto pc:h-[var(--100vh)] w-full bg-[#000] object-contain pc:px-[var(--gap)] px-[var(--grid)]"
            metadata={i}
          />
        </li>
      ))}
      <li className="absolute top-0 left-0 size-full overflow-hidden">
        <Image className="pc:h-[var(--100vh)] w-full object-cover object-top" metadata={post.thumb} />
      </li>
    </ul>
  );
}
