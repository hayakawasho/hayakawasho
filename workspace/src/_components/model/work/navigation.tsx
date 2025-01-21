import type { WorkDTO } from "../../../_models/work/dto";

export function WorkNavigation({ posts, current }: { posts: WorkDTO[]; current: string }) {
  return (
    <ul className="sp:hidden | text-[1.2rem] tracking-[.04em] text-right grid gap-[.8rem]">
      {posts.map((i, index) => (
        <li key={index} className={`${current === i.id ? "font-medium" : "opacity-30 font-light"}`}>
          {i.name}
        </li>
      ))}
    </ul>
  );
}
