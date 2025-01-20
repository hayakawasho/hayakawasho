import type { WorkDTO } from "../../../_models/work/dto";

export function WorkNavigation({ posts, current }: { posts: WorkDTO[]; current: string }) {
  return (
    <ul className="sp:invisible | text-[1.2rem] leading-[2] tracking-[.04em] text-right">
      {posts.map((i, index) => (
        <li key={index} className={`${current === i.id ? "font-bold" : "opacity-20"}`}>
          {i.name}
        </li>
      ))}
    </ul>
  );
}
