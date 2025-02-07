import type { WorkDTO } from "../../../_models/work/dto";

export function WorkNavigation({
  posts,
  current,
  className = "",
}: { posts: WorkDTO[]; current: string; className?: string }) {
  return (
    <ul
      className={`relative z-10 pc:mt-[var(--leading-trim)] pc:grid pc:gap-[.8rem] font-[450] pc:text-[1.2rem] text-[1.4rem] tracking-[.04em] ${className}`}
    >
      {posts.map((i, index) => (
        <li key={index} className={`${current === i.id ? "pc:font-[550]" : "opacity-25"}`}>
          <span>{i.name}</span>
        </li>
      ))}
    </ul>
  );
}
