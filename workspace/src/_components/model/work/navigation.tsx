import type { WorkDTO } from "../../../_models/work/dto";

export function WorkNavigation({ posts, current }: { posts: WorkDTO[]; current: string }) {
  return (
    <ul
      className={`
        text-[--color-dark] relative z-10 text-[1.2rem] tracking-[.02em] font-[350] text-right grid gap-[1rem] leading-[1.4] my-[--leading-trim]
        | pc:text-[--color-text]`}
    >
      {posts.map((i, index) => (
        <li key={index} className={`${current === i.id ? "font-[550]" : "opacity-25"}`}>
          <span>{i.name}</span>
        </li>
      ))}
    </ul>
  );
}
