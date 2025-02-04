import { Image } from "../../model/work/image";
import type { WorkDTO } from "../../../_models/work/dto";

export function WorkScreenshots({ post }: { post: WorkDTO }) {
  return (
    <ul className="relative size-full">
      <li className="absolute top-0 left-0 size-full overflow-hidden">
        <Image className="w-full object-cover object-top | pc:h-[var(--100vh)]" metadata={post.thumb} />
      </li>
      {post.screenshots.map((i, index) => (
        <li key={index} className="absolute top-0 left-0 size-full overflow-hidden">
          <Image
            className="w-full aspect-4/5 object-contain bg-black px-[var(--grid)] | pc:aspect-auto pc:h-[var(--100vh)] pc:px-[var(--gap)]"
            metadata={i}
          />
        </li>
      ))}
      <li className="absolute top-0 left-0 size-full overflow-hidden">
        <Image className="w-full object-cover object-top | pc:h-[var(--100vh)]" metadata={post.thumb} />
      </li>
    </ul>
  );
}
