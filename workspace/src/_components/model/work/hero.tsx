import type { WorkDTO } from "../../../_models/work/dto";
import { Image } from "./image";

export function WorkHero({ posts }: { posts: WorkDTO[] }) {
  return (
    <div className="relative size-full">
      <ul className="">
        {posts.map((i) => (
          <li className="h-[var(--100vh)] overflow-hidden" key={i.id}>
            <a href={`/work/${i.id}/`}>
              <Image className="h-full pc:h-fit pc:min-h-[var(--100vh)] w-full object-cover" metadata={i.thumb} />
            </a>
          </li>
        ))}
      </ul>
      <div className="fixed pc:top-1/2 bottom-[3.2rem] pc:bottom-auto left-1/2 pc:left-3/4">
        <ul
          className={`-ml-[2.4rem] pc:-translate-x-1/2 pc:-translate-y-1/2 pc:ml-0 flex pc:grid pc:aspect-[4/5] pc:w-[var(--grid)] w-full pc:min-w-[12rem] gap-[.6rem]`}
        >
          {posts.map((i, index) => (
            <li
              key={i.id}
              className={`pc:absolute aspect-[4/5] pc:w-fit w-[4.8rem] overflow-hidden rounded-[.2rem] ${index === 0 ? "pc:z-10" : ""}`}
            >
              <Image className="h-full pc:h-fit w-full object-cover" metadata={i.thumb} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
