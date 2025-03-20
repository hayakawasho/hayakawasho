import type { WorkDTO } from "../../../_models/work/dto";

const MAX_W = 2400;

export default function Component({ posts }: { posts: WorkDTO[] }) {
  return (
    <div className="relative h-full pc:w-fit w-full" data-ref="hero">
      <ul className="" data-ref="heroItems">
        {posts.map((i) => (
          <li className="h-[var(--100vh)] overflow-hidden" key={i.id}>
            <a href={`/work/${i.id}/`} data-ref="heroItem">
              <img
                className="h-full pc:h-fit pc:min-h-[var(--100vh)] w-full object-cover"
                src={`${i.thumb.src}?auto=compress,format&fm=avif&w=${MAX_W > i.thumb.width ? i.thumb.width : MAX_W}`}
                data-src={`${i.thumb.src}?auto=compress,format&fm=avif&w=${MAX_W > i.thumb.width ? i.thumb.width : MAX_W}`}
                width={i.thumb.width}
                height={i.thumb.height}
                alt={i.name}
                data-ref="heroVisual"
              />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
