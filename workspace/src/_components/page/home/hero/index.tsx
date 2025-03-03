import type { WorkDTO } from "../../../../_models/work/dto";

const MAX_W = 1920;

export default function Component({ posts }: { posts: WorkDTO[] }) {
  return (
    <div className="relative h-full pc:w-fit w-full" data-ref="hero">
      <ul className="" data-ref="heroSlideItems">
        {posts.map((i) => (
          <li
            className="h-[var(--100vh)] overflow-hidden"
            key={i.id}
            data-ref="heroSlideItem"
          >
            <a href={`/work/${i.id}/`}>
              <img
                className="h-full pc:h-fit pc:min-h-[var(--100vh)] w-full object-cover"
                src={`${i.thumb.src}?auto=compress,format&fm=avif&w=${MAX_W > i.thumb.width ? i.thumb.width : MAX_W}`}
                width={i.thumb.width}
                height={i.thumb.height}
                alt={i.name}
                data-ref="heroImage"
              />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
