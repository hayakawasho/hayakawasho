import { Image } from "./image";
import type { WorkDTO } from "../../../_models/work/dto";

export function WorkVisuals({ posts }: { posts: WorkDTO[] }) {
  return (
    <ul className="">
      {posts.map((i) => (
        <li className="h-[var(--100vh)] overflow-hidden" key={i.id}>
          <Image className="w-full h-full object-cover | pc:h-fit pc:min-h-[var(--100vh)]" metadata={i.thumb} />
        </li>
      ))}
    </ul>
  );
}
