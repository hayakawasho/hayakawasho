import type { WorkDTO } from "../../../_models/work/dto";

export function WorkNavigation({ posts, current }: { posts: WorkDTO[]; current: string }) {
  return (
    <ul className="relative z-10 text-[1.2rem] tracking-[.04em] text-right leading-[1.3] flex flex-col gap-[1.6rem]">
      {posts.map((i, index) => (
        <li
          key={index}
          className={`h-[1.3em] my-[--leading-trim] ${current === i.id ? "font-semibold" : "opacity-30"}`}
        >
          <span>{i.name}</span>
        </li>
      ))}
    </ul>
  );
}
