import type { WorkDTO } from "../../../../_models/work/dto";

const MAX_W = 1920;

export default function Component({ post }: { post: WorkDTO }) {
  return (
    <ul className="relative">
      <li className="overflow-hidden">
        <img
          className="h-full pc:h-[var(--100vh)] w-full object-cover"
          src={`${post.thumb.src}?auto=compress,format&fm=avif&w=${MAX_W > post.thumb.width ? post.thumb.width : MAX_W}`}
          width={post.thumb.width}
          height={post.thumb.height}
          alt=""
        />
      </li>
      {post.screenshots.map((i, index) => (
        <li key={index} className="flex size-full items-center overflow-hidden">
          <img
            className="flex size-full h-full pc:h-[var(--100vh)] bg-[#000] object-contain pc:px-[var(--gap)] px-[var(--grid)]"
            src={`${i.src}?auto=compress,format&fm=avif&w=${MAX_W > i.width ? i.width : MAX_W}`}
            width={i.width}
            height={i.height}
            alt=""
          />
        </li>
      ))}
      <li className="overflow-hidden">
        <img
          className="h-full pc:h-[var(--100vh)] w-full object-cover"
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
