import type { WorkDTO } from "../../../_models/work/dto";
import { Image } from "./image";

export function WorkHero({ posts }: { posts: WorkDTO[] }) {
  return (
    <ul className="">
      {posts.map((i) => (
        <li className="h-[var(--100vh)] overflow-hidden" key={i.id}>
          <a href={`/work/${i.id}/`}>
            <Image className="h-full pc:h-fit pc:min-h-[var(--100vh)] w-full object-cover" metadata={i.thumb} />
          </a>
        </li>
      ))}
    </ul>
  );
}
