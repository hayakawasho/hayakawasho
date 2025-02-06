import type { WorkDTO } from "../../../_models/work/dto";

export function WorkNavigation({
  posts,
  current,
  className = "",
}: { posts: WorkDTO[]; current: string; className?: string }) {
  return (
    <ul
      className={`relative z-10 my-[var(--leading-trim)] pc:grid pc:gap-[1rem] font-[400] pc:text-[1.2rem] text-[1.3rem] pc:leading-[1.4] tracking-[.04em] pc:tracking-[.02em] ${className}`}
    >
      {posts.map((i, index) => (
        <li key={index} className={`${current === i.id ? "font-[450] pc:font-[550]" : "opacity-25"}`}>
          <span>{i.name}</span>
        </li>
      ))}
    </ul>
  );
}
