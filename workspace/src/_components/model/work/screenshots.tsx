import type { WorkDTO } from "../../../_models/work/dto";

const MAX_W = 1675;

export function WorkScreenshots({ post }: { post: WorkDTO }) {
  return (
    <ul className="relative size-full">
      <li className="absolute top-0 left-0 size-full overflow-hidden">
        <img
          className="pc:h-[var(--100vh)] w-full object-cover object-top"
          src={`${post.thumb.src}?auto=compress,format&fm=avif&w=${MAX_W > post.thumb.width ? post.thumb.width : MAX_W}`}
          width={post.thumb.width}
          height={post.thumb.height}
          alt=""
          fetchPriority="high"
        />
      </li>
      {post.screenshots.map((i, index) => (
        <li key={index} className="absolute top-0 left-0 size-full overflow-hidden">
          <img
            className="aspect-4/5 pc:aspect-auto pc:h-[var(--100vh)] w-full bg-[#000] object-contain pc:px-[var(--gap)] px-[var(--grid)]"
            src={`${i.src}?auto=compress,format&fm=avif&w=${MAX_W > i.width ? i.width : MAX_W}`}
            width={i.width}
            height={i.height}
            alt=""
          />
        </li>
      ))}
      <li className="absolute top-0 left-0 size-full overflow-hidden">
        <img
          className="pc:h-[var(--100vh)] w-full object-cover object-top"
          src={`${post.thumb.src}?auto=compress,format&fm=avif&w=${MAX_W > post.thumb.width ? post.thumb.width : MAX_W}`}
          width={post.thumb.width}
          height={post.thumb.height}
          alt=""
          loading="lazy"
        />
      </li>
    </ul>
  );
}
