import type { WorkDTO } from "../../../_models/work/dto";

export function WorkNavigation({ posts, current }: { posts: WorkDTO[]; current: string }) {
  return (
    <ul
      className={
        "relative z-10 my-[var(--leading-trim)] grid gap-[1rem] font-[400] pc:text-[var(--color-text)] text-[1.2rem] text-[var(--color-dark)] leading-[1.4] pc:tracking-[.02em] tracking-[.04em]"
      }
    >
      {posts.map((i, index) => (
        <li key={index} className={`${current === i.id ? "font-[550]" : "opacity-25"}`}>
          <span>{i.name}</span>
        </li>
      ))}
    </ul>
  );
}
